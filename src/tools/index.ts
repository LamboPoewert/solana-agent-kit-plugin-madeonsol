/**
 * Tool functions — pure logic that calls MadeOnSol x402 API.
 * These are called by Action handlers and can also be used directly via agent.methods.
 */

const BASE_URL = "https://madeonsol.com";

async function query(paidFetch: typeof fetch, path: string, params?: Record<string, string | number>) {
  const url = new URL(path, BASE_URL);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = await paidFetch(url.toString());
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MadeOnSol API error ${res.status}: ${body}`);
  }
  return res.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Agent = any; // SolanaAgentKit — we use `any` to avoid hard dep

let _paidFetch: typeof fetch | null = null;

export async function initPaidFetch(agent: Agent): Promise<typeof fetch> {
  if (_paidFetch) return _paidFetch;

  const privateKey = agent.config?.SVM_PRIVATE_KEY || agent.config?.OTHER_API_KEYS?.SVM_PRIVATE_KEY;
  if (!privateKey) {
    console.warn("[madeonsol] No SVM_PRIVATE_KEY in agent config — x402 payments disabled");
    _paidFetch = fetch;
    return _paidFetch;
  }

  const { wrapFetchWithPayment } = await import("@x402/fetch");
  const { x402Client } = await import("@x402/core/client");
  const { ExactSvmScheme } = await import("@x402/svm/exact/client");
  const { createKeyPairSignerFromBytes } = await import("@solana/kit");
  const { base58 } = await import("@scure/base");

  const signer = await createKeyPairSignerFromBytes(base58.decode(privateKey));
  const client = new x402Client();
  client.register("solana:*", new ExactSvmScheme(signer));
  _paidFetch = wrapFetchWithPayment(fetch, client);
  return _paidFetch;
}

export async function kolFeed(agent: Agent, params: { limit?: number; action?: string; kol?: string } = {}) {
  const f = await initPaidFetch(agent);
  return query(f, "/api/x402/kol/feed", params as Record<string, string | number>);
}

export async function kolCoordination(agent: Agent, params: { period?: string; min_kols?: number; limit?: number } = {}) {
  const f = await initPaidFetch(agent);
  return query(f, "/api/x402/kol/coordination", params as Record<string, string | number>);
}

export async function kolLeaderboard(agent: Agent, params: { period?: string; limit?: number } = {}) {
  const f = await initPaidFetch(agent);
  return query(f, "/api/x402/kol/leaderboard", params as Record<string, string | number>);
}

export async function deployerAlerts(agent: Agent, params: { limit?: number; since?: string; offset?: number } = {}) {
  const f = await initPaidFetch(agent);
  return query(f, "/api/x402/deployer-hunter/alerts", params as Record<string, string | number>);
}

// ── Webhook & Streaming (RapidAPI key required) ──

async function restQuery(agent: Agent, method: string, path: string, body?: unknown) {
  const apiKey = agent.config?.RAPIDAPI_KEY || agent.config?.OTHER_API_KEYS?.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("RAPIDAPI_KEY required for webhook/streaming features");
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "madeonsol-solana-kol-tracker-tools-api.p.rapidapi.com",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`MadeOnSol API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function createWebhook(agent: Agent, params: { url: string; events: string[]; filters?: Record<string, unknown> }) {
  return restQuery(agent, "POST", "/webhooks", params);
}

export async function listWebhooks(agent: Agent) {
  return restQuery(agent, "GET", "/webhooks");
}

export async function deleteWebhook(agent: Agent, params: { id: number }) {
  return restQuery(agent, "DELETE", `/webhooks/${params.id}`);
}

export async function testWebhook(agent: Agent, params: { webhook_id: number }) {
  return restQuery(agent, "POST", "/webhooks/test", params);
}

export async function getStreamToken(agent: Agent) {
  return restQuery(agent, "POST", "/stream/token");
}
