const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment to Celo Sepolia...\n");

  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);

  // Get account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "CELO\n");

  if (balance === BigInt(0)) {
    console.error("❌ Error: Account has no CELO!");
    console.log("📍 Get testnet CELO from: https://faucet.celo.org/sepolia");
    process.exit(1);
  }

  // Deploy BettingFactory
  console.log("📦 Deploying BettingFactory...");
  const BettingFactory = await ethers.getContractFactory("BettingFactory");
  const factory = await BettingFactory.deploy(deployer.address);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("✅ BettingFactory deployed to:", factoryAddress);

  // Deploy StakingPool
  console.log("\n📦 Deploying StakingPool...");
  const StakingPool = await ethers.getContractFactory("StakingPool");
  const stakingPool = await StakingPool.deploy(deployer.address);
  await stakingPool.waitForDeployment();
  const stakingPoolAddress = await stakingPool.getAddress();
  console.log("✅ StakingPool deployed to:", stakingPoolAddress);

  // Fund the staking pool
  console.log("\n💸 Funding StakingPool with 1 CELO for rewards...");
  const fundAmount = ethers.parseEther("1");
  const fundTx = await stakingPool.fundPool({ value: fundAmount });
  await fundTx.wait();
  console.log("✅ StakingPool funded successfully");

  // Get deployment info
  const poolBalance = await stakingPool.getPoolBalance();
  const rewardRate = await stakingPool.rewardRate();
  const isAdmin = await factory.checkIsAdmin(deployer.address);

  console.log("\n" + "=".repeat(60));
  console.log("📊 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("\n🏭 BettingFactory:");
  console.log("   Address:", factoryAddress);
  console.log("   Admin:", deployer.address);
  console.log("   Is Admin:", isAdmin);
  
  console.log("\n💰 StakingPool:");
  console.log("   Address:", stakingPoolAddress);
  console.log("   Pool Balance:", ethers.formatEther(poolBalance), "CELO");
  console.log("   Reward Rate:", rewardRate.toString(), "% APY");

  console.log("\n🌐 Network:");
  console.log("   Network:", (await ethers.provider.getNetwork()).name);
  console.log("   Chain ID:", (await ethers.provider.getNetwork()).chainId);
  console.log("   Explorer:", "https://sepolia.celoscan.io");

  // Create .env update instructions
  console.log("\n" + "=".repeat(60));
  console.log("📝 NEXT STEPS");
  console.log("=".repeat(60));
  console.log("\n1️⃣  Update your .env file with these values:\n");
  console.log(`VITE_FACTORY_CONTRACT_ADDRESS=${factoryAddress}`);
  console.log(`VITE_STAKING_POOL_ADDRESS=${stakingPoolAddress}`);
  console.log(`ADMIN_ADDRESS=${deployer.address}`);
  
  console.log("\n2️⃣  Verify contracts on Celoscan (optional):\n");
  console.log(`npx hardhat verify --network celo-sepolia ${factoryAddress} "${deployer.address}"`);
  console.log(`npx hardhat verify --network celo-sepolia ${stakingPoolAddress} "${deployer.address}"`);
  
  console.log("\n3️⃣  View contracts on Celoscan:\n");
  console.log(`Factory: https://sepolia.celoscan.io/address/${factoryAddress}`);
  console.log(`Staking: https://sepolia.celoscan.io/address/${stakingPoolAddress}`);
  
  console.log("\n4️⃣  Start your frontend:\n");
  console.log("npm run dev");
  
  console.log("\n✨ Deployment complete! Happy betting! 🎲\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });