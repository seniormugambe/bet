# 🚀 START HERE - Quick Deployment Guide

**Get your BetCelo platform running in 10 minutes!**

---

## 🎯 What You'll Do

1. Get testnet CELO (2 min)
2. Configure environment (2 min)
3. Deploy contracts (3 min)
4. Test the platform (3 min)

**Total Time: ~10 minutes**

---

## 📋 Step-by-Step

### Step 1: Run Setup Wizard (2 minutes)

```bash
node scripts/setup-wizard.js
```

This will:
- Create `.env` file
- Guide you through configuration
- Check if you have testnet CELO

### Step 2: Get Testnet CELO (2 minutes)

1. Visit: **https://faucet.celo.org/alfajores**
2. Enter your wallet address
3. Click "Get Alfajores CELO"
4. Wait ~30 seconds

**Verify you received it:**
```bash
npx hardhat run scripts/check-balance.js --network alfajores
```

Should show: `Balance: X.X CELO` (where X > 0)

### Step 3: Deploy Contracts (3 minutes)

```bash
npx hardhat run scripts/deploy-all.ts --network alfajores
```

**What happens:**
- Deploys BettingFactory contract
- Deploys StakingPool contract
- Funds staking pool with 10 CELO
- Saves deployment info

**You'll see:**
```
✅ BettingFactory deployed to: 0x...
✅ StakingPool deployed to: 0x...
```

**Copy these addresses!**

### Step 4: Update Configuration (1 minute)

Open `.env` and add the addresses from deployment:

```env
VITE_FACTORY_CONTRACT_ADDRESS=0x_your_factory_address
VITE_STAKING_POOL_ADDRESS=0x_your_staking_address
```

### Step 5: Start & Test (3 minutes)

```bash
npm run dev
```

**Test checklist:**
- [ ] Open http://localhost:5173
- [ ] Connect wallet
- [ ] Go to "Create Event"
- [ ] Should see "✓ Admin Access Granted"
- [ ] Create a test event
- [ ] Go to "Stake & Earn"
- [ ] Try staking some CELO

---

## ✅ Success!

If everything works:
- ✅ Contracts deployed
- ✅ Frontend connected
- ✅ Can create events
- ✅ Can stake CELO

**You're ready to use BetCelo!** 🎉

---

## 🆘 Having Issues?

### "Insufficient funds"
→ Get more CELO from faucet

### "Private key not found"
→ Add your private key to `.env`:
```env
PRIVATE_KEY=0xyour_private_key_here
```

### "Contract not configured"
→ Make sure you added contract addresses to `.env`

### "Admin access required"
→ You should be admin automatically (you deployed the contracts)

### Still stuck?
Check these guides:
- `SETUP_GUIDE.md` - Detailed setup instructions
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `TROUBLESHOOTING.md` - Common issues and solutions

---

## 📚 Documentation

- **SETUP_GUIDE.md** - Complete setup guide
- **DEPLOYMENT_CHECKLIST.md** - Deployment checklist
- **REAL_EVENT_CREATION.md** - Event creation guide
- **STAKING.md** - Staking system guide
- **INTEGRATION_STATUS.md** - What's integrated

---

## 🎯 Quick Commands

```bash
# Setup wizard
node scripts/setup-wizard.js

# Check balance
npx hardhat run scripts/check-balance.js --network alfajores

# Deploy contracts
npx hardhat run scripts/deploy-all.ts --network alfajores

# Start frontend
npm run dev

# Verify contract (optional)
npx hardhat verify --network alfajores <ADDRESS> "<ADMIN>"
```

---

## 🌐 Useful Links

- **Faucet:** https://faucet.celo.org/alfajores
- **Explorer:** https://alfajores.celoscan.io
- **Celo Docs:** https://docs.celo.org
- **Discord:** https://discord.gg/celo

---

## 🚀 Ready?

Start with:
```bash
node scripts/setup-wizard.js
```

Then follow the steps above!

---

**Questions?** Check the documentation or open an issue on GitHub.

**Happy Betting!** 🎲
