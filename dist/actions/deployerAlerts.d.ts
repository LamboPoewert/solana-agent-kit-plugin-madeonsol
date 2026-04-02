import { z } from "zod";
export declare const deployerAlertsAction: {
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
    schema: z.ZodObject<{
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        since: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
};
