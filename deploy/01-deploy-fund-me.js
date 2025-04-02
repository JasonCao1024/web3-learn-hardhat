const { network } = require("hardhat");
const {
  deploymentChains,
  networkConfig,
  LOCK_TIME,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { firstAccount } = await getNamedAccounts();
  const { deploy } = deployments;
  let dataFeedAddr;

  if (deploymentChains.includes(network.name)) {
    dataFeedAddr = (await deployments.get("MockV3Aggregator")).address;
  } else {
    dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed;
  }
  const fundMe = await deploy("FundMe", {
    from: firstAccount,
    args: [LOCK_TIME, dataFeedAddr],
    log: true,
  });

  if (hre.network.config.chainId==11155111 && process.env.ETHERSCAN_API_KEY) {
    await hre.run("verify:verify", {
      address: fundMe.address,
      constructorArguments: [LOCK_TIME, dataFeedAddr],
    });
  }else{
    console.log("Network is not sepolia,verification skipped.")
  }

};

module.exports.tags = ["all", "fundme"];
