//import ehter.js
//create main funciton
//execute main funcation
const { ethers } = require("hardhat");
async function main() {
  //create factory
  const fundeMeFactory = await ethers.getContractFactory("FundMe");
  console.log("contract is deploying.");

  //deploy contract form factory
  const fundMe = await fundeMeFactory.deploy(120);
  await fundMe.waitForDeployment();
  console.log(
    `contract has been deployed successfully,contract address is ${fundMe.target}`
  );
  //verify fundme
  if (hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 5 confirmations");
    await fundMe.deploymentTransaction().wait(5);
    await verifyFundMe(fundMe.target, [60]);
  } else {
    console.log("verification skipped..");
  }

  const [account] = await ethers.getSigners();
  //fund contract with account
 const fundTx =  await fundMe.fund({value: ethers.parseEther("0.001")})
 await fundTx.wait()

  //check balance of contract
  const balanceOfContract = await ethers.provider.getBalance(fundMe.target)
  console.log(`Balance of the contract is ${balanceOfContract}`);
  
}

async function verifyFundMe(addr, args) {
  await hre.run("verify:verify", {
    address: addr,
    constructorArguments: args,
  });
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(0);
  });
