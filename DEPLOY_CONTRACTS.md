# Deploy Contracts Guide

Quick guide to deploy the betting contracts to Celo Alfajores testnet.

## Prerequisites

1. Node.js installed (v18+ recommended)
2. Wallet with Alfajores CELO for gas
3. Private key ready

## Get Testnet CELO

Visit the Celo Alfajores Faucet:
https://faucet.celo.org/alfajores

Enter your wallet address and request testnet CELO.

## Setup

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Configure Environment
Create or update `.env`:
```env
# Your wallet private key (DO NOT COMMIT!)
PRIVATE_KEY=your_private_key_here

# Admin wallet address (will be granted admin access)
ADMIN_ADDRESS=your_wallet_address_here

# Network
VITE_CELO_NETWORK=alfajores

# WalletConnect (optional)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

**⚠️ IMPORTANT:** Never commit your private key to git!

## Deploy BettingFactory

### Option 1: Using Existing Script
```bash
npx hardhat run scripts/deploy.ts --network alfajores
```

### Option 2: Manual Deployment
```bash
# Start Hardhat console
npx hardhat console --network alfajores

# Deploy
const BettingFactory = await ethers.getContractFactory("BettingFactory");
const factory = await BettingFactory.deploy("YOUR_ADMIN_ADDRESS");
await factory.waitForDeployment();
const address = await factory.getAddress();
console.log("BettingFactory deployed to:", address);
```

## Deploy StakingPool

```bash
npx hardhat run scripts/deploy-staking.ts --network alfajores
```

## Update Frontend Configuration

After deployment, update `.env`:
```env
VITE_FACTORY_CONTRACT_ADDRESS=0x...
VITE_STAKING_POOL_ADDRESS=0x...
```

## Verify Contracts (Optional)

### Get Celoscan API Key
1. Go to https://celoscan.io/
2. Create account
3. Get API key

### Add to .env
```env
CELOSCAN_API_KEY=your_api_key
```

### Verify
```bash
npx hardhat verify --network alfajores FACTORY_ADDRESS "ADMIN_ADDRESS"
npx hardhat verify --network alfajores STAKING_POOL_ADDRESS "ADMIN_ADDRESS"
```

## Grant Admin Access

If you need to grant admin to additional addresses:

```bash
npx hardhat console --network alfajores

const factory = await ethers.getContractAt("BettingFactory", "FACTORY_ADDRESS");
await factory.grantAdmin("NEW_ADMIN_ADDRESS");
```

## Test Deployment

### 1. Check Contract on Celoscan
Visit: https://alfajores.celoscan.io/address/YOUR_CONTRACT_ADDRESS

### 2. Test in Frontend
1. Start dev server: `npm run dev`
2. Connect wallet
3. Go to Create Event page
4. Should see "Admin Access Granted"
5. Try creating an event

### 3. Verify Event Creation
- Transaction should confirm
- Event address should be returned
- Event should appear in event list

## Troubleshooting

### Error: "Insufficient funds"
**Solution:** Get more testnet CELO from faucet

### Error: "Network not supported"
**Solution:** Check hardhat.config.js has alfajores network configured

### Error: "Private key not found"
**Solution:** Set PRIVATE_KEY in .env

### Error: "Contract not verified"
**Solution:** Run verify command with correct parameters

## Network Information

### Celo Alfajores Testnet
- Chain ID: 44787
- RPC: https://alfajores-forno.celo-testnet.org
- Explorer: https://alfajores.celoscan.io
- Faucet: https://faucet.celo.org/alfajores

### Celo Mainnet (Production)
- Chain ID: 42220
- RPC: https://forno.celo.org
- Explorer: https://celoscan.io

## Post-Deployment Checklist

- [ ] BettingFactory deployed
- [ ] StakingPool deployed
- [ ] Contract addresses in .env
- [ ] Admin access granted
- [ ] Contracts verified on Celoscan
- [ ] Frontend can connect to contracts
- [ ] Test event creation works
- [ ] Test staking works

## Security Notes

1. **Never commit private keys**
2. **Use separate wallets for testnet/mainnet**
3. **Test thoroughly on testnet first**
4. **Audit contracts before mainnet**
5. **Use multisig for mainnet admin**

## Next Steps

After deployment:
1. Test event creation
2. Test bet placement (when integrated)
3. Test staking
4. Monitor gas costs
5. Prepare for mainnet deployment

## Support

If you encounter issues:
1. Check Hardhat console for errors
2. Verify network configuration
3. Check wallet has enough CELO
4. Review transaction on Celoscan
5. Check contract addresses are correct

## Useful Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to alfajores
npx hardhat run scripts/deploy.ts --network alfajores

# Start console
npx hardhat console --network alfajores

# Check balance
npx hardhat run scripts/check-balance.js --network alfajores

# Clean artifacts
npx hardhat clean
```

## Contract Addresses

After deployment, save your addresses here:

```
BettingFactory: 0x...
StakingPool: 0x...
Admin Address: 0x...
Deployment Date: YYYY-MM-DD
Network: Alfajores
```

---

**Ready to deploy? Run:**
```bash
npx hardhat run scripts/deploy.ts --network alfajores
```
