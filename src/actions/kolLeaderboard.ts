import { z } from "zod";
import { kolLeaderboard } from "../tools/index.js";

export const kolLeaderboardAction = {
  name: "MADEONSOL_KOL_LEADERBOARD_ACTION",
  similes: ["kol leaderboard", "top kols", "best performing kols", "kol rankings", "kol pnl"],
  description: "Get KOL performance rankings by PnL and win rate. Costs $0.005 USDC per request.",
  examples: [
    [{ input: { period: "7d", limit: 10 }, output: { status: "success" }, explanation: "Get the top 10 KOLs by PnL this week" }],
  ],
  schema: z.object({
    period: z.enum(["today", "7d", "30d"]).default("7d").describe("Time period"),
    limit: z.number().min(1).max(50).default(20).describe("Number of KOLs"),
  }),
  handler: async (agent: unknown, input: { period?: string; limit?: number }) => {
    try {
      const data = await kolLeaderboard(agent, input);
      return { status: "success", result: data };
    } catch (err) {
      return { status: "error", message: (err as Error).message };
    }
  },
};
