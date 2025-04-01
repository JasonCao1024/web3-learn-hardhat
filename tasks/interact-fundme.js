const { task } = require("hardhat/config");
task("interact-fundme","interact with fundMe contract ")
  .addParam("addr", "fundme contract address")
  .setAction(async (taskArgs, hre) => {
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    const fundMe = fundMeFactory.attach(taskArgs.addr)
    const account = await ethers.getSigners();
    //fund contract with account
    const fundTx = await fundMe.fund({ value: ethers.parseEther("0.001") });
    await fundTx.wait();

    //check balance of contract
    const balanceOfContract = await ethers.provider.getBalance(fundMe.target);
    console.log(`Balance of the contract is ${balanceOfContract}`);
  });
