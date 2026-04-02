# solana-agent-kit-plugin-madeonsol

[Solana Agent Kit](https://github.com/sendaifun/solana-agent-kit) plugin for [MadeOnSol](https://madeonsol.com) — Solana KOL intelligence and deployer analytics via x402 micropayments.

## Install

```bash
npm install solana-agent-kit-plugin-madeonsol @x402/fetch @x402/svm @x402/core @solana/kit @scure/base
```

## Usage

```typescript
import { SolanaAgentKit } from "solana-agent-kit";
import MadeOnSolPlugin from "solana-agent-kit-plugin-madeonsol";

const agent = new SolanaAgentKit(privateKey, rpcUrl, {
  SVM_PRIVATE_KEY: "your_solana_private_key_base58",
});

agent.use(MadeOnSolPlugin);

// Use via methods
const trades = await agent.methods.kolFeed(agent, { limit: 10, action: "buy" });

// Or let the LLM trigger actions via natural language
// "What are KOLs buying right now?" → MADEONSOL_KOL_FEED_ACTION
```

## Actions

| Action | Price | Triggers on |
|---|---|---|
| `MADEONSOL_KOL_FEED_ACTION` | $0.005 | "kol trades", "what are kols buying" |
| `MADEONSOL_KOL_COORDINATION_ACTION` | $0.02 | "kol convergence", "tokens kols accumulating" |
| `MADEONSOL_KOL_LEADERBOARD_ACTION` | $0.005 | "top kols", "kol rankings", "best kol" |
| `MADEONSOL_DEPLOYER_ALERTS_ACTION` | $0.01 | "deployer alerts", "pump fun launches" |

## Config

Set `SVM_PRIVATE_KEY` in your agent config for automatic x402 USDC payments. The wallet needs SOL (fees) and USDC on Solana mainnet.

## License

MIT
