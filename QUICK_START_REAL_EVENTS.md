# Quick Start: Real Event Creation

## 🚀 Get Started in 5 Minutes

### Step 1: Get Testnet CELO (1 min)
```
Visit: https://faucet.celo.org/alfajores
Enter your wallet address
Request testnet CELO
```

### Step 2: Deploy Contract (2 min)
```bash
# Set your private key in .env
PRIVATE_KEY=your_key_here
ADMIN_ADDRESS=your_wallet_address

# Deploy
npx hardhat run scripts/deploy.ts --network alfajores

# Copy the deployed address
```

### Step 3: Configure Frontend (1 min)
```bash
# Update .env
VITE_FACTORY_CONTRACT_ADDRESS=0x_deployed_address_here
```

### Step 4: Test (1 min)
```bash
# Start dev server
npm run dev

# Open browser
# Connect wallet
# Go to Create Event page
# Should see "Admin Access Granted"
# Create a test event!
```

---

## ✅ Verification

### Check 1: Contract Deployed
Visit: `https://alfajores.celoscan.io/address/YOUR_ADDRESS`
Should see contract code and transactions

### Check 2: Admin Access
In app, Create Event page should show:
```
✓ Admin Access Granted
```

### Check 3: Can Create Events
1. Fill form
2. Click "Create Event"
3. Confirm in wallet
4. Wait for confirmation
5. See success screen with event address

---

## 🔧 Troubleshooting

### "Contract Not Configured"
→ Set `VITE_FACTORY_CONTRACT_ADDRESS` in `.env`

### "Admin Access Required"
→ Run: `npx hardhat console --network alfajores`
→ Then: `await factory.grantAdmin("YOUR_ADDRESS")`

### "Insufficient funds"
→ Get more CELO from faucet

### Transaction Fails
→ Check you're on Alfajores network
→ Check wallet has CELO for gas

---

## 📝 What Changed

**Before:**
- Mock event creation
- Fake addresses
- No blockchain

**After:**
- Real smart contracts
- Actual transactions
- Verifiable on Celoscan

---

## 🎯 Next Steps

1. ✅ Event Creation (DONE)
2. ⏳ Event Loading (TODO)
3. ⏳ Bet Placement (TODO)
4. ⏳ Payouts (TODO)

---

## 📚 Full Documentation

- `REAL_EVENT_CREATION.md` - Complete guide
- `DEPLOY_CONTRACTS.md` - Deployment details
- `EVENT_CREATION_UPGRADE_SUMMARY.md` - What changed

---

## 🆘 Need Help?

Check the documentation files or review:
- Contract code: `contracts/BettingFactory.sol`
- Hook code: `src/hooks/useBettingFactory.ts`
- Form code: `src/components/events/EventCreationForm.tsx`

---

**Ready? Deploy now:**
```bash
npx hardhat run scripts/deploy.ts --network alfajores
```
