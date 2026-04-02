import { kolFeedAction } from "./actions/kolFeed.js";
import { kolCoordinationAction } from "./actions/kolCoordination.js";
import { kolLeaderboardAction } from "./actions/kolLeaderboard.js";
import { deployerAlertsAction } from "./actions/deployerAlerts.js";
import { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts } from "./tools/index.js";
declare const MadeOnSolPlugin: {
    name: string;
    methods: {
        kolFeed: typeof kolFeed;
        kolCoordination: typeof kolCoordination;
        kolLeaderboard: typeof kolLeaderboard;
        deployerAlerts: typeof deployerAlerts;
    };
    actions: ({
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                limit: number;
                action: string;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            action: import("zod").ZodOptional<import("zod").ZodEnum<["buy", "sell"]>>;
            kol: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            action?: "buy" | "sell" | undefined;
            kol?: string | undefined;
        }, {
            limit?: number | undefined;
            action?: "buy" | "sell" | undefined;
            kol?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            limit?: number;
            action?: string;
            kol?: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                period: string;
                min_kols: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["1h", "6h", "24h", "7d"]>>;
            min_kols: import("zod").ZodDefault<import("zod").ZodNumber>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            period: "24h" | "1h" | "6h" | "7d";
            min_kols: number;
        }, {
            limit?: number | undefined;
            period?: "24h" | "1h" | "6h" | "7d" | undefined;
            min_kols?: number | undefined;
        }>;
        handler: (agent: unknown, input: {
            period?: string;
            min_kols?: number;
            limit?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                period: string;
                limit: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            period: import("zod").ZodDefault<import("zod").ZodEnum<["today", "7d", "30d"]>>;
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            period: "7d" | "today" | "30d";
        }, {
            limit?: number | undefined;
            period?: "7d" | "today" | "30d" | undefined;
        }>;
        handler: (agent: unknown, input: {
            period?: string;
            limit?: number;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    } | {
        name: string;
        similes: string[];
        description: string;
        examples: {
            input: {
                limit: number;
            };
            output: {
                status: string;
            };
            explanation: string;
        }[][];
        schema: import("zod").ZodObject<{
            limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            offset: import("zod").ZodDefault<import("zod").ZodNumber>;
            since: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            limit: number;
            offset: number;
            since?: string | undefined;
        }, {
            limit?: number | undefined;
            offset?: number | undefined;
            since?: string | undefined;
        }>;
        handler: (agent: unknown, input: {
            limit?: number;
            offset?: number;
            since?: string;
        }) => Promise<{
            status: string;
            result: any;
            message?: undefined;
        } | {
            status: string;
            message: string;
            result?: undefined;
        }>;
    })[];
    initialize(_agent: unknown): void;
};
export default MadeOnSolPlugin;
export { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts };
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction };
