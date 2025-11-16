# 📋 Deployment Checklist

Quick checklist to deploy and configure BetCelo platform.

---

## Pre-Deployment

### Environment Setup
- [ ] Node.js v18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created (copy from `.env.example`)

### Wallet Setup
- [ ] Wallet address ready
- [ ] Private key obtained (MetaMask → Account Details → Show Private Key)
- [ ] Private key added to `.env` as `PRIVATE_KEY`
- [ ] Wallet address added to `.env` as `ADMIN_ADDRESS`

### Testnet CELO
- [ ] Visited https://faucet.celo.org/alfajores
- [ ] Requested testnet CELO
- [ ] Received CELO (check balance)

### Verify Setup
```bash
# Check balance
npx hardhat run scripts/check-balance.js --network alfajores
```
- [ ] Balance shows > 0 CELO

---

## Deployment

### Deploy Contracts
```bash
npx hardhat run scripts/deploy-all.ts --network alfajores
```

- [ ] BettingFactory deployed successfully
- [ ] StakingPool deployed successfully
- [ ] StakingPool funded with 10 CELO
- [ ] Deployment info saved to `deployment-info.json`

### Copy Contract Addresses
From deployment output or `deployment-info.json`:

- [ ] Copy BettingFactory address
- [ ] Copy StakingPool address
- [ ] Copy Admin address

### Update .env
Add to `.env`:
```env
VITE_FACTORY_CONTRACT_ADDRESS=0x...
VITE_STAKING_POOL_ADDRESS=0x...
```

- [ ] Factory address added
- [ ] Staking address added
- [ ] File saved

---

## Verification (Optional)

### Get Celoscan API Key
- [ ] Visit https://celoscan.io/
- [ ] Create account / Login
- [ ] Generate API key
- [ ] Add to `.env` as `CELOSCAN_API_KEY`

### Verify Contracts
```bash
npx hardhat verify --network alfajores <FACTORY_ADDRESS> "<ADMIN_ADDRESS>"
npx hardhat verify --network alfajores <STAKING_ADDRESS> "<ADMIN_ADDRESS>"
```

- [ ] BettingFactory verified
- [ ] StakingPool verified

---

## Testing

### Start Frontend
```bash
npm run dev
```
- [ ] Frontend starts without errors
- [ ] Opens at http://localhost:5173

### Test Wallet Connection
- [ ] Click "Connect Wallet"
- [ ] MetaMask opens
- [ ] Connect wallet
- [ ] Address shows in UI

### Test Event Creation
- [ ] Go to "Create Event" page
- [ ] See "✓ Admin Access Granted"
- [ ] Fill event form
- [ ] Click "Create Event"
- [ ] Confirm in MetaMask
- [ ] Transaction confirms
- [ ] Success screen appears
- [ ] Event address shown

### Test Staking
- [ ] Go to "Stake & Earn" page
- [ ] See staking dashboard
- [ ] Enter stake amount
- [ ] Click "Stake"
- [ ] Confirm in MetaMask
- [ ] Transaction confirms
- [ ] Stake amount updates

### Verify on Celoscan
- [ ] Visit https://alfajores.celoscan.io/address/<FACTORY_ADDRESS>
- [ ] See contract code
- [ ] See transactions
- [ ] Visit https://alfajores.celoscan.io/address/<STAKING_ADDRESS>
- [ ] See contract code
- [ ] See transactions

---

## Post-Deployment

### Documentation
- [ ] Save contract addresses
- [ ] Document admin address
- [ ] Note deployment date
- [ ] Save transaction hashes

### Backup
- [ ] Backup `deployment-info.json`
- [ ] Backup `.env` (securely!)
- [ ] Document network details

### Share
- [ ] Share contract addresses with team
- [ ] Update README if needed
- [ ] Commit changes (NOT .env!)

---

## Troubleshooting

### If deployment fails:

**"Insufficient funds"**
- [ ] Get more CELO from faucet
- [ ] Check balance again

**"Private key not found"**
- [ ] Check PRIVATE_KEY in .env
- [ ] Remove quotes if present
- [ ] Ensure it starts with 0x

**"Network not supported"**
- [ ] Check hardhat.config.js
- [ ] Verify alfajores network configured

**"Contract not configured"**
- [ ] Check VITE_FACTORY_CONTRACT_ADDRESS in .env
- [ ] Restart dev server

**"Admin access required"**
- [ ] Verify you're using deployer wallet
- [ ] Check admin status in contract

---

## Quick Commands

```bash
# Setup wizard
node scripts/setup-wizard.js

# Check balance
npx hardhat run scripts/check-balance.js --network alfajores

# Deploy all
npx hardhat run scripts/deploy-all.ts --network alfajores

# Verify contract
npx hardhat verify --network alfajores <ADDRESS> "<ARGS>"

# Start frontend
npm run dev

# Hardhat console
npx hardhat console --network alfajores
```

---

## Success Criteria

✅ All items checked above
✅ Contracts deployed and verified
✅ Frontend connects to contracts
✅ Can create events
✅ Can stake CELO
✅ Transactions visible on Celoscan

---

## Next Steps

After successful deployment:

1. **Test thoroughly**
   - Create multiple events
   - Test different event types
   - Try staking different amounts

2. **Monitor**
   - Watch transactions on Celoscan
   - Check for any errors
   - Monitor gas costs

3. **Integrate remaining features**
   - Event loading from blockchain
   - Real bet placement
   - Event conclusion
   - Payout claims

4. **Prepare for mainnet**
   - Complete testing
   - Security audit
   - Deploy to Celo mainnet

---

## Resources

- **Setup Guide:** `SETUP_GUIDE.md`
- **Deployment Guide:** `DEPLOY_CONTRACTS.md`
- **Event Creation:** `REAL_EVENT_CREATION.md`
- **Staking Guide:** `STAKING.md`

---

**Ready to deploy?** Start with:
```bash
node scripts/setup-wizard.js
```
