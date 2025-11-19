const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing Celo Sepolia RPC connection...\n");

  try {
    // Test basic connection
    const network = await ethers.provider.getNetwork();
    console.log("✅ Network connected:");
    console.log("   Name:", network.name);
    console.log("   Chain ID:", network.chainId.toString());
    
    // Test block number
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("   Latest Block:", blockNumber);
    
    // Test gas price
    const gasPrice = await ethers.provider.getFeeData();
    console.log("   Gas Price:", ethers.formatUnits(gasPrice.gasPrice || 0, "gwei"), "gwei");
    
    console.log("\n🎉 RPC connection successful!");
    console.log("📝 You can now deploy contracts with a private key.");
    
  } catch (error) {
    console.error("❌ RPC connection failed:");
    console.error(error.message);
    console.log("\n🔧 Check your RPC configuration in hardhat.config.cjs");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });