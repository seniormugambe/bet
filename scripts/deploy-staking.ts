import { ethers } from "hardhat";

async function main() {
  console.log("Deploying StakingPool contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "CELO");

  // Deploy StakingPool
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(deployer.address);
  await stakingPool.waitForDeployment();

  const stakingPoolAddress = await stakingPool.getAddress();
  console.log("StakingPool deployed to:", stakingPoolAddress);

  // Fund the staking pool with initial rewards
  const fundAmount = ethers.parseEther("100"); // 100 CELO for rewards
  console.log("\nFunding staking pool with", ethers.formatEther(fundAmount), "CELO...");
  
  const fundTx = await stakingPool.fundPool({ value: fundAmount });
  await fundTx.wait();
  console.log("Staking pool funded successfully");

  // Get pool info
  const poolBalance = await stakingPool.getPoolBalance();
  const rewardRate = await stakingPool.rewardRate();
  const totalStaked = await stakingPool.totalStaked();

  console.log("\n=== Staking Pool Info ===");
  console.log("Pool Balance:", ethers.formatEther(poolBalance), "CELO");
  console.log("Reward Rate:", rewardRate.toString(), "% APY");
  console.log("Total Staked:", ethers.formatEther(totalStaked), "CELO");

  // Save deployment info
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    stakingPool: stakingPoolAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    fundedAmount: ethers.formatEther(fundAmount),
  };

  console.log("\n=== Deployment Complete ===");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  console.log("\nAdd this to your .env file:");
  console.log(`VITE_STAKING_POOL_ADDRESS=${stakingPoolAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
