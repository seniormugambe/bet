# 🚀 Render Quick Start

Deploy BetCelo to Render in 5 minutes!

---

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Render deployment"
git push origin main
```

## Step 2: Create Render Service

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Click "Connect"

## Step 3: Configure

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run preview
```

**Environment Variables:**
```
NODE_VERSION=18.18.0
VITE_CELO_NETWORK=alfajores
VITE_FACTORY_CONTRACT_ADDRESS=your_address
VITE_STAKING_POOL_ADDRESS=your_address
VITE_WALLETCONNECT_PROJECT_ID=your_id
```

## Step 4: Deploy

Click "Create Web Service" and wait ~3 minutes

## Step 5: Access

Your site will be at:
```
https://your-service.onrender.com
```

---

## ✅ Checklist

- [ ] Code on GitHub
- [ ] Render account created
- [ ] Service configured
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site accessible

---

## 🆘 Issues?

**Build fails:** Check environment variables
**Site blank:** Verify contract addresses
**Wallet won't connect:** Check WalletConnect ID

---

**Full Guide:** See `RENDER_DEPLOYMENT.md`
