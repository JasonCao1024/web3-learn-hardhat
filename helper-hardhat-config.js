const DECIMAL = 8;
const INITIAL_ANSWER = 200000000000;
const deploymentChains = ["hardhat"];
const LOCK_TIME = 180;
const networkConfig = {
  11155111: {
    ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },
};
module.exports = {
  DECIMAL,
  INITIAL_ANSWER,
  LOCK_TIME,
  deploymentChains,
  networkConfig,
};
