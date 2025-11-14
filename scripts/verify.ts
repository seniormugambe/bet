import { run } from "hardhat";

async function main() {
  const accessControlAddress = process.env.VITE_ACCESS_CONTROL_CONTRACT_ADDRESS;
  const factoryAddress = process.env.VITE_FACTORY_CONTRACT_ADDRESS;
  const adminAddress = process.env.ADMIN_ADDRESS;

  if (!accessControlAddress || !factoryAddress || !adminAddress) {
    console.error("Missing contract addresses or admin address in .env file");
    process.exit(1);
  }

  console.log("Verifying contracts on Celoscan...");

  try {
    console.log("\nVerifying AccessControl...");
    await run("verify:verify", {
      address: accessControlAddress,
      constructorArguments: [],
    });
    console.log("AccessControl verified!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("AccessControl already verified");
    } else {
      console.error("Error verifying AccessControl:", error);
    }
  }

  try {
    console.log("\nVerifying BettingFactory...");
    await run("verify:verify", {
      address: factoryAddress,
      constructorArguments: [adminAddress],
    });
    console.log("BettingFactory verified!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("BettingFactory already verified");
    } else {
      console.error("Error verifying BettingFactory:", error);
    }
  }

  console.log("\nVerification complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
