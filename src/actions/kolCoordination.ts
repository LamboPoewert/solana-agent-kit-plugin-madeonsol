import { z } from "zod";
import { kolCoordination } from "../tools/index.js";

export const kolCoordinationAction = {
  name: "MADEONSOL_KOL_COORDINATION_ACTION",
  similes: ["kol convergence", "what tokens are kols accumulating", "kol coordination", "smart money convergence"],
  description: "Get KOL convergence signals — tokens being accumulated by multiple KOLs simultaneously. Costs $0.02 USDC per request.",
  examples: [
    [{ input: { period: "24h", min_kols: 3 }, output: { status: "success" }, explanation: "Get tokens where 3+ KOLs are converging in the last 24 hours" }],
  ],
  schema: z.object({
    period: z.enum(["1h", "6h", "24h", "7d"]).default("24h").describe("Time period"),
    min_kols: z.number().min(2).max(50).default(3).describe("Minimum KOLs converging"),
    limit: z.number().min(1).max(50).default(20).describe("Number of results"),
  }),
  handler: async (agent: unknown, input: { period?: string; min_kols?: number; limit?: number }) => {
    try {
      const data = await kolCoordination(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
