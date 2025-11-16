const { ethers } = require("hardhat");

async function main() {
  const [account] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(account.address);
  
  console.log("\n💰 Account Balance Check");
  console.log("========================");
  console.log("Address:", account.address);
  console.log("Balance:", ethers.formatEther(balance), "CELO");
  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Chain ID:", (await ethers.provider.getNetwork()).chainId);
  
  if (balance === BigInt(0)) {
    console.log("\n⚠️  Warning: Account has no CELO!");
    console.log("Get testnet CELO from: https://faucet.celo.org/alfajores");
  } else {
    console.log("\n✅ Account has sufficient balance for deployment");
  }
  console.log();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
