import { kolFeedAction } from "./actions/kolFeed.js";
import { kolCoordinationAction } from "./actions/kolCoordination.js";
import { kolLeaderboardAction } from "./actions/kolLeaderboard.js";
import { deployerAlertsAction } from "./actions/deployerAlerts.js";
import { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts } from "./tools/index.js";

const MadeOnSolPlugin = {
  name: "madeonsol",
  methods: {
    kolFeed,
    kolCoordination,
    kolLeaderboard,
    deployerAlerts,
  },
  actions: [
    kolFeedAction,
    kolCoordinationAction,
    kolLeaderboardAction,
    deployerAlertsAction,
  ],
  initialize(_agent: unknown) {
    // No-op — payment setup is lazy in tool functions
  },
};

export default MadeOnSolPlugin;
export { kolFeed, kolCoordination, kolLeaderboard, deployerAlerts };
export { kolFeedAction, kolCoordinationAction, kolLeaderboardAction, deployerAlertsAction };
