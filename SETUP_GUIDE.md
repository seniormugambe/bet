# 🚀 Setup & Deployment Guide

Complete guide to deploy contracts and configure your BetCelo platform.

---

## Prerequisites

- [x] Node.js v18+ installed
- [x] Wallet with private key
- [x] Testnet CELO for gas fees

---

## Step 1: Get Testnet CELO (2 minutes)

### Option A: Celo Faucet (Recommended)
1. Visit: https://faucet.celo.org/alfajores
2. Enter your wallet address
3. Click "Get Alfajores CELO"
4. Wait for confirmation (~30 seconds)

### Option B: Discord Faucet
1. Join Celo Discord: https://discord.gg/celo
2. Go to #faucet channel
3. Type: `/faucet <your-address>`

### Verify Balance
```bash
# Check your balance
npx hardhat run scripts/check-balance.js --network alfajores
```

---

## Step 2: Configure Environment (1 minute)

### Get Your Private Key

**MetaMask:**
1. Open MetaMask
2. Click account menu → Account Details
3. Click "Show Private Key"
4. Enter password
5. Copy private key

**⚠️ SECURITY WARNING:**
- Never share your private key
- Never commit it to git
- Use a separate wallet for testnet

### Update .env File

Open `.env` and add:

```env
# Your wallet private key (KEEP SECRET!)
PRIVATE_KEY=your_private_key_here

# Your wallet address (will be admin)
ADMIN_ADDRESS=your_wallet_address_here

# Network (already set)
VITE_CELO_NETWORK=alfajores

# WalletConnect (already set)
VITE_WALLETCONNECT_PROJECT_ID=b95fc9c497801712157da7cf17bdfdfc
```

**Example:**
```env
PRIVATE_KEY=0x1234567890abcdef...
ADMIN_ADDRESS=0xYourWalletAddress...
```

---

## Step 3: Deploy Contracts (2 minutes)

### Install Dependencies (if not done)
```bash
npm install
# or
pnpm install
```

### Deploy All Contracts
```bash
npx hardhat run scripts/deploy-all.ts --network alfajores
```

### What Gets Deployed:
1. **BettingFactory** - Creates and manages betting events
2. **StakingPool** - Handles staking and rewards

### Expected Output:
```
🚀 Starting deployment to Celo Alfajores...

📝 Deploying with account: 0x...
💰 Account balance: 5.0 CELO

📦 Deploying BettingFactory...
✅ BettingFactory deployed to: 0x...

📦 Deploying StakingPool...
✅ StakingPool deployed to: 0x...

💸 Funding StakingPool with 10 CELO for rewards...
✅ StakingPool funded successfully

============================================================
📊 DEPLOYMENT SUMMARY
============================================================

🏭 BettingFactory:
   Address: 0x...
   Admin: 0x...
   Is Admin: true

💰 StakingPool:
   Address: 0x...
   Pool Balance: 10.0 CELO
   Reward Rate: 5 % APY
```

---

## Step 4: Update Frontend Configuration (1 minute)

The deployment script will show you the addresses. Update your `.env`:

```env
VITE_FACTORY_CONTRACT_ADDRESS=0x_factory_address_from_deployment
VITE_STAKING_POOL_ADDRESS=0x_staking_address_from_deployment
```

**Or copy from deployment-info.json:**
```bash
cat deployment-info.json
```

---

## Step 5: Verify Contracts (Optional, 2 minutes)

### Get Celoscan API Key
1. Go to https://celoscan.io/
2. Sign up / Log in
3. Go to API Keys
4. Create new API key
5. Copy key

### Add to .env
```env
CELOSCAN_API_KEY=your_api_key_here
```

### Verify Contracts
```bash
# Verify BettingFactory
npx hardhat verify --network alfajores <FACTORY_ADDRESS> "<ADMIN_ADDRESS>"

# Verify StakingPool
npx hardhat verify --network alfajores <STAKING_ADDRESS> "<ADMIN_ADDRESS>"
```

---

## Step 6: Test Deployment (2 minutes)

### Start Frontend
```bash
npm run dev
```

### Test Checklist

#### 1. Wallet Connection
- [ ] Open http://localhost:5173
- [ ] Click "Connect Wallet"
- [ ] Connect MetaMask
- [ ] Should see your address

#### 2. Event Creation
- [ ] Go to "Create Event" page
- [ ] Should see "✓ Admin Access Granted"
- [ ] Fill in event details
- [ ] Click "Create Event"
- [ ] Confirm transaction in MetaMask
- [ ] Wait for confirmation
- [ ] Should see success screen with event address

#### 3. Staking
- [ ] Go to "Stake & Earn" page
- [ ] Should see staking dashboard
- [ ] Try staking some CELO
- [ ] Confirm transaction
- [ ] Should see updated stake amount

#### 4. Verify on Celoscan
- [ ] Copy contract address
- [ ] Visit: https://alfajores.celoscan.io/address/<ADDRESS>
- [ ] Should see contract code and transactions

---

## Troubleshooting

### Error: "Insufficient funds"
**Solution:** Get more testnet CELO from faucet

### Error: "Private key not found"
**Solution:** Make sure PRIVATE_KEY is set in .env (without quotes)

### Error: "Network not supported"
**Solution:** Check hardhat.config.js has alfajores network

### Error: "Contract not configured"
**Solution:** Make sure VITE_FACTORY_CONTRACT_ADDRESS is set in .env

### Error: "Admin access required"
**Solution:** You should be admin automatically. Check with:
```bash
npx hardhat console --network alfajores
const factory = await ethers.getContractAt("BettingFactory", "ADDRESS");
await factory.checkIsAdmin("YOUR_ADDRESS");
```

### Contracts Won't Compile
**Solution:** Node.js version issue. The project needs Node 18+
```bash
node --version  # Should be v18 or higher
```

---

## Quick Commands Reference

```bash
# Check balance
npx hardhat run scripts/check-balance.js --network alfajores

# Deploy all contracts
npx hardhat run scripts/deploy-all.ts --network alfajores

# Deploy only factory
npx hardhat run scripts/deploy.ts --network alfajores

# Deploy only staking
npx hardhat run scripts/deploy-staking.ts --network alfajores

# Start Hardhat console
npx hardhat console --network alfajores

# Verify contract
npx hardhat verify --network alfajores <ADDRESS> "<CONSTRUCTOR_ARGS>"

# Start frontend
npm run dev

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test
```

---

## Network Information

### Celo Alfajores Testnet
- **Chain ID:** 44787
- **RPC URL:** https://alfajores-forno.celo-testnet.org
- **Explorer:** https://alfajores.celoscan.io
- **Faucet:** https://faucet.celo.org/alfajores
- **Currency:** CELO (testnet)

### Celo Mainnet (For Production)
- **Chain ID:** 42220
- **RPC URL:** https://forno.celo.org
- **Explorer:** https://celoscan.io
- **Currency:** CELO

---

## Post-Deployment Checklist

- [ ] Contracts deployed successfully
- [ ] Contract addresses in .env
- [ ] Admin access confirmed
- [ ] Contracts verified on Celoscan (optional)
- [ ] Frontend connects to contracts
- [ ] Can create events
- [ ] Can stake CELO
- [ ] Transactions visible on Celoscan

---

## Security Best Practices

1. **Never commit private keys** - Already in .gitignore
2. **Use separate wallets** - Different for testnet/mainnet
3. **Test thoroughly** - Test everything on testnet first
4. **Audit contracts** - Get professional audit before mainnet
5. **Use multisig** - For mainnet admin operations
6. **Monitor contracts** - Set up alerts for unusual activity

---

## What's Next?

After successful deployment:

1. **Test Event Creation**
   - Create a few test events
   - Verify they appear in the app
   - Check on Celoscan

2. **Test Staking**
   - Stake some CELO
   - Check tier assignment
   - Try claiming rewards

3. **Integrate Remaining Features**
   - Event loading from blockchain
   - Real bet placement
   - Event conclusion
   - Payout claims

4. **Prepare for Mainnet**
   - Thorough testing
   - Security audit
   - Deploy to Celo mainnet

---

## Support

### Documentation
- `REAL_EVENT_CREATION.md` - Event creation guide
- `STAKING.md` - Staking system guide
- `DEPLOY_CONTRACTS.md` - Detailed deployment
- `CONTRACT_INTEGRATION_GUIDE.md` - Integration guide

### Resources
- Celo Docs: https://docs.celo.org/
- Hardhat Docs: https://hardhat.org/
- Wagmi Docs: https://wagmi.sh/

### Community
- Celo Discord: https://discord.gg/celo
- Celo Forum: https://forum.celo.org/

---

## Estimated Costs

### Testnet (Free)
- Get CELO from faucet
- All transactions free

### Mainnet (Approximate)
| Operation | Gas | Cost (CELO) | Cost (USD) |
|-----------|-----|-------------|------------|
| Deploy Factory | ~2M | ~0.004 | ~$0.02 |
| Deploy Staking | ~1.5M | ~0.003 | ~$0.015 |
| Create Event | ~500k | ~0.001 | ~$0.005 |
| Place Bet | ~100k | ~0.0002 | ~$0.001 |
| Stake CELO | ~80k | ~0.00016 | ~$0.0008 |

*Prices based on CELO at $0.50*

---

## Success! 🎉

If you've completed all steps:
- ✅ Contracts deployed
- ✅ Frontend configured
- ✅ Admin access granted
- ✅ Everything tested

**You're ready to start betting on Celo!** 🚀

---

**Need help?** Check the troubleshooting section or review the documentation files.
