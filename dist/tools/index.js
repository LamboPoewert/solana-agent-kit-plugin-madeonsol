/**
 * Tool functions — pure logic that calls MadeOnSol x402 API.
 * These are called by Action handlers and can also be used directly via agent.methods.
 */
const BASE_URL = "https://madeonsol.com";
async function query(paidFetch, path, params) {
    const url = new URL(path, BASE_URL);
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v !== undefined)
                url.searchParams.set(k, String(v));
        }
    }
    const res = await paidFetch(url.toString());
    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`MadeOnSol API error ${res.status}: ${body}`);
    }
    return res.json();
}
let _paidFetch = null;
export async function initPaidFetch(agent) {
    if (_paidFetch)
        return _paidFetch;
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
export async function kolFeed(agent, params = {}) {
    const f = await initPaidFetch(agent);
    return query(f, "/api/x402/kol/feed", params);
}
export async function kolCoordination(agent, params = {}) {
    const f = await initPaidFetch(agent);
    return query(f, "/api/x402/kol/coordination", params);
}
export async function kolLeaderboard(agent, params = {}) {
    const f = await initPaidFetch(agent);
    return query(f, "/api/x402/kol/leaderboard", params);
}
export async function deployerAlerts(agent, params = {}) {
    const f = await initPaidFetch(agent);
    return query(f, "/api/x402/deployer-hunter/alerts", params);
}
