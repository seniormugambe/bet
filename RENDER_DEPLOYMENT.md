# 🚀 Deploy to Render - Complete Guide

Deploy your BetCelo frontend to Render in minutes!

---

## 📋 Prerequisites

- [ ] GitHub repository with your code
- [ ] Render account (free) - https://render.com
- [ ] Contracts deployed to Celo Alfajores
- [ ] Contract addresses ready

---

## 🎯 Quick Deploy (5 Minutes)

### Step 1: Push to GitHub (if not done)

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your `bet` repository
4. Click "Connect"

### Step 4: Configure Service

**Basic Settings:**
- **Name:** `betcelo-frontend` (or your choice)
- **Region:** Oregon (or closest to you)
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run preview`

**Instance Type:**
- Select **Free** (or paid if you prefer)

### Step 5: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables:

```
NODE_VERSION = 18.18.0
VITE_CELO_NETWORK = alfajores
VITE_FACTORY_CONTRACT_ADDRESS = your_factory_address_here
VITE_STAKING_POOL_ADDRESS = your_staking_address_here
VITE_WALLETCONNECT_PROJECT_ID = your_walletconnect_id
VITE_ENABLE_SOUNDS = false
```

**Important:** Replace the contract addresses with your actual deployed addresses!

### Step 6: Deploy

1. Click "Create Web Service"
2. Wait for deployment (~3-5 minutes)
3. Watch the build logs

### Step 7: Access Your Site

Once deployed, you'll get a URL like:
```
https://betcelo-frontend.onrender.com
```

Visit it and test your app!

---

## 📝 Detailed Configuration

### Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_VERSION` | Node.js version | `18.18.0` |
| `VITE_CELO_NETWORK` | Celo network | `alfajores` or `celo` |
| `VITE_FACTORY_CONTRACT_ADDRESS` | BettingFactory address | `0x1234...` |
| `VITE_STAKING_POOL_ADDRESS` | StakingPool address | `0x5678...` |
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect ID | Get from cloud.walletconnect.com |
| `VITE_ENABLE_SOUNDS` | Enable sound effects | `false` or `true` |

### Build Configuration

The `render.yaml` file contains all configuration:

```yaml
services:
  - type: web
    name: betcelo-frontend
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm run preview
```

### Custom Domain (Optional)

1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

---

## 🔧 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Clear build cache
# In Render dashboard: Settings → Clear Build Cache
```

**Error: "Out of memory"**
```bash
# Solution: Upgrade to paid plan or optimize build
# Add to package.json:
"build": "vite build --mode production"
```

### Environment Variables Not Working

**Issue:** Variables not loading
```bash
# Solution: Make sure they start with VITE_
# Restart the service after adding variables
```

### Site Not Loading

**Issue:** Blank page or errors
```bash
# Check browser console for errors
# Verify contract addresses are correct
# Check network (should be alfajores)
```

### Wallet Connection Issues

**Issue:** Can't connect wallet
```bash
# Solution: Check VITE_WALLETCONNECT_PROJECT_ID
# Get new ID from https://cloud.walletconnect.com
```

---

## 🎨 Customization

### Change Service Name

In `render.yaml`:
```yaml
name: your-custom-name
```

### Change Region

Available regions:
- `oregon` (US West)
- `ohio` (US East)
- `frankfurt` (Europe)
- `singapore` (Asia)

### Auto-Deploy

Render automatically deploys when you push to GitHub:
```yaml
autoDeploy: true
```

To disable:
```yaml
autoDeploy: false
```

---

## 📊 Monitoring

### View Logs

1. Go to your service dashboard
2. Click "Logs" tab
3. See real-time logs

### Check Metrics

1. Click "Metrics" tab
2. View:
   - Response times
   - Memory usage
   - CPU usage
   - Request count

### Set Up Alerts

1. Go to "Settings"
2. Click "Notifications"
3. Add email or Slack webhook

---

## 💰 Pricing

### Free Tier
- ✅ 750 hours/month
- ✅ Auto-sleep after 15 min inactivity
- ✅ Wakes on request
- ✅ Perfect for testing

### Paid Plans
- **Starter:** $7/month
  - No auto-sleep
  - Better performance
  - More resources

- **Standard:** $25/month
  - Even better performance
  - Priority support

---

## 🔄 Updates & Redeployment

### Automatic Deployment

Push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render automatically rebuilds and deploys!

### Manual Deployment

1. Go to service dashboard
2. Click "Manual Deploy"
3. Select branch
4. Click "Deploy"

### Rollback

1. Go to "Events" tab
2. Find previous deployment
3. Click "Rollback"

---

## 🔒 Security

### Environment Variables

- Never commit `.env` to GitHub
- Use Render's environment variables
- Rotate keys regularly

### HTTPS

- Automatic HTTPS enabled
- Free SSL certificate
- Auto-renewal

### Headers

Add security headers in `vite.config.ts`:
```typescript
server: {
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
  }
}
```

---

## 📱 Testing

### Test Locally First

```bash
# Build
npm run build

# Preview
npm run preview

# Visit http://localhost:5173
```

### Test on Render

1. Deploy to Render
2. Visit your URL
3. Test all features:
   - [ ] Wallet connection
   - [ ] Event creation
   - [ ] Staking
   - [ ] Navigation

---

## 🎯 Optimization

### Build Optimization

Already configured in `vite.config.preview.ts`:
- Code splitting
- Vendor chunking
- Tree shaking
- Minification

### Performance Tips

1. **Enable caching**
   - Render caches node_modules
   - Speeds up builds

2. **Optimize images**
   - Use WebP format
   - Compress images

3. **Lazy loading**
   - Already implemented with React.lazy

---

## 📚 Resources

### Render Documentation
- Docs: https://render.com/docs
- Status: https://status.render.com
- Community: https://community.render.com

### Support
- Email: support@render.com
- Discord: https://discord.gg/render
- Twitter: @render

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site accessible
- [ ] Wallet connects
- [ ] Events can be created
- [ ] Staking works
- [ ] Custom domain added (optional)

---

## 🎉 Success!

Your BetCelo platform is now live on Render!

**Share your URL:**
```
https://your-service.onrender.com
```

**Next Steps:**
1. Test thoroughly
2. Share with users
3. Monitor performance
4. Deploy to mainnet when ready

---

## 🆘 Need Help?

### Common Issues

**Build taking too long?**
- Free tier has limited resources
- Consider upgrading to paid plan

**Site sleeping?**
- Free tier sleeps after 15 min
- Upgrade to prevent sleep
- Or use a ping service

**Environment variables not updating?**
- Restart service after changes
- Check spelling (must start with VITE_)

### Get Support

1. Check Render docs
2. Search community forum
3. Contact Render support
4. Check our documentation

---

## 📖 Additional Guides

- `SETUP_GUIDE.md` - Local setup
- `DEPLOYMENT_CHECKLIST.md` - Deployment steps
- `REAL_EVENT_CREATION.md` - Event creation
- `STAKING.md` - Staking system

---

**Ready to deploy?** Follow the steps above!

**Questions?** Check the troubleshooting section or Render docs.

**Happy Deploying!** 🚀
