/**
 * Tool functions — pure logic that calls MadeOnSol x402 API.
 * These are called by Action handlers and can also be used directly via agent.methods.
 */
type Agent = any;
export declare function initPaidFetch(agent: Agent): Promise<typeof fetch>;
export declare function kolFeed(agent: Agent, params?: {
    limit?: number;
    action?: string;
    kol?: string;
}): Promise<any>;
export declare function kolCoordination(agent: Agent, params?: {
    period?: string;
    min_kols?: number;
    limit?: number;
}): Promise<any>;
export declare function kolLeaderboard(agent: Agent, params?: {
    period?: string;
    limit?: number;
}): Promise<any>;
export declare function deployerAlerts(agent: Agent, params?: {
    limit?: number;
    since?: string;
    offset?: number;
}): Promise<any>;
export {};
