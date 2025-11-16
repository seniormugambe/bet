#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n🎯 BetCelo Setup Wizard');
  console.log('========================\n');

  // Check if .env exists
  const envPath = path.join(__dirname, '../.env');
  const envExamplePath = path.join(__dirname, '../.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created\n');
  }

  // Read current .env
  let envContent = fs.readFileSync(envPath, 'utf8');

  console.log('Step 1: Wallet Configuration');
  console.log('─────────────────────────────\n');

  // Check if private key is set
  if (!envContent.includes('PRIVATE_KEY=0x') && !envContent.match(/PRIVATE_KEY=\w{64}/)) {
    console.log('⚠️  Private key not configured');
    console.log('\n📖 How to get your private key:');
    console.log('   MetaMask: Account menu → Account Details → Show Private Key');
    console.log('   ⚠️  NEVER share your private key with anyone!\n');
    
    const privateKey = await question('Enter your private key (or press Enter to skip): ');
    
    if (privateKey && privateKey.trim()) {
      const cleanKey = privateKey.trim().startsWith('0x') ? privateKey.trim() : `0x${privateKey.trim()}`;
      envContent = envContent.replace(/PRIVATE_KEY=.*/, `PRIVATE_KEY=${cleanKey}`);
      console.log('✅ Private key configured\n');
    } else {
      console.log('⏭️  Skipped - You can add it manually to .env later\n');
    }
  } else {
    console.log('✅ Private key already configured\n');
  }

  // Check if admin address is set
  if (!envContent.includes('ADMIN_ADDRESS=0x')) {
    console.log('⚠️  Admin address not configured');
    const adminAddress = await question('Enter your wallet address (or press Enter to skip): ');
    
    if (adminAddress && adminAddress.trim()) {
      envContent = envContent.replace(/ADMIN_ADDRESS=.*/, `ADMIN_ADDRESS=${adminAddress.trim()}`);
      console.log('✅ Admin address configured\n');
    } else {
      console.log('⏭️  Skipped - You can add it manually to .env later\n');
    }
  } else {
    console.log('✅ Admin address already configured\n');
  }

  // Save .env
  fs.writeFileSync(envPath, envContent);

  console.log('\nStep 2: Get Testnet CELO');
  console.log('─────────────────────────\n');
  console.log('🌐 Visit: https://faucet.celo.org/alfajores');
  console.log('💧 Request testnet CELO for your wallet');
  console.log('⏱️  Wait ~30 seconds for confirmation\n');

  const hasCelo = await question('Have you received testnet CELO? (y/n): ');
  
  if (hasCelo.toLowerCase() === 'y') {
    console.log('✅ Great! You can proceed with deployment\n');
  } else {
    console.log('⏸️  Please get testnet CELO before deploying\n');
  }

  console.log('\nStep 3: Next Steps');
  console.log('──────────────────\n');
  console.log('1️⃣  Check your balance:');
  console.log('   npx hardhat run scripts/check-balance.js --network alfajores\n');
  console.log('2️⃣  Deploy contracts:');
  console.log('   npx hardhat run scripts/deploy-all.ts --network alfajores\n');
  console.log('3️⃣  Start frontend:');
  console.log('   npm run dev\n');

  console.log('📚 For detailed instructions, see: SETUP_GUIDE.md\n');

  rl.close();
}

main().catch(console.error);
