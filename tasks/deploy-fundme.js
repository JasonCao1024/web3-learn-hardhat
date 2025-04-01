const { task } = require("hardhat/config");

task("deploy-fundme","delopy and verify fundMe contract").setAction(async (taskArgs, hre) => {
  //create factory
  const fundeMeFactory = await ethers.getContractFactory("FundMe");
  console.log("contract is deploying.");

  //deploy contract form factory
  const fundMe = await fundeMeFactory.deploy(43200);
  await fundMe.waitForDeployment();
  console.log(
    `contract has been deployed successfully,contract address is ${fundMe.target}`
  );
  //verify fundme
  if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 5 confirmations");
    await fundMe.deploymentTransaction().wait(5);
    await verifyFundMe(fundMe.target, [43200]);
  } else {
    console.log("verification skipped..");
  }
});
async function verifyFundMe(addr, args) {
  await hre.run("verify:verify", {
    address: addr,
    constructorArguments: args,
  });
}
