import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment to Celo network...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "CELO");

  // Deploy AccessControl contract
  console.log("\nDeploying AccessControl contract...");
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.waitForDeployment();
  const accessControlAddress = await accessControl.getAddress();
  console.log("AccessControl deployed to:", accessControlAddress);

  // Deploy BettingFactory contract
  console.log("\nDeploying BettingFactory contract...");
  const BettingFactory = await ethers.getContractFactory("BettingFactory");
  const bettingFactory = await BettingFactory.deploy(deployer.address);
  await bettingFactory.waitForDeployment();
  const factoryAddress = await bettingFactory.getAddress();
  console.log("BettingFactory deployed to:", factoryAddress);

  console.log("\n=== Deployment Summary ===");
  console.log("AccessControl:", accessControlAddress);
  console.log("BettingFactory:", factoryAddress);
  console.log("\nAdd these addresses to your .env file:");
  console.log(`VITE_ACCESS_CONTROL_CONTRACT_ADDRESS=${accessControlAddress}`);
  console.log(`VITE_FACTORY_CONTRACT_ADDRESS=${factoryAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
