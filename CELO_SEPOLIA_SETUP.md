# ✅ Celo Sepolia Setup - FIXED!

## 🎯 RPC Issue Resolved

The RPC configuration has been updated with the correct Celo Sepolia endpoint:

```
✅ RPC: https://rpc.ankr.com/celo_sepolia
✅ Chain ID: 11142220
✅ Network: Celo Sepolia (L2)
```

## 🚀 Quick Deployment

### 1. Add Your Private Key

Add your wallet's private key to `.env`:

```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE
```

**⚠️ NEVER commit your private key to git!**

### 2. Get Testnet CELO

1. **Add Celo Sepolia to MetaMask**:
   - Network Name: `Celo Sepolia`
   - RPC URL: `https://rpc.ankr.com/celo_sepolia`
   - Chain ID: `11142220`
   - Currency Symbol: `CELO`
   - Block Explorer: `https://sepolia.celoscan.io`

2. **Get testnet CELO**:
   - Visit a Celo Sepolia faucet
   - Or bridge from another testnet

### 3. Deploy Contracts

```bash
npx hardhat run scripts/deploy-celo-sepolia.cjs --network celo-sepolia
```

### 4. Update .env with Deployed Addresses

After successful deployment, update your `.env`:

```env
VITE_FACTORY_CONTRACT_ADDRESS=0x_DEPLOYED_FACTORY_ADDRESS
VITE_STAKING_POOL_ADDRESS=0x_DEPLOYED_STAKING_ADDRESS
```

## 🔧 Current Configuration

### hardhat.config.cjs
```javascript
"celo-sepolia": {
  url: process.env.CELO_SEPOLIA_RPC || "https://rpc.ankr.com/celo_sepolia",
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  chainId: 11142220,
}
```

### .env
```env
VITE_CELO_NETWORK=sepolia
CELO_SEPOLIA_RPC=https://rpc.ankr.com/celo_sepolia
PRIVATE_KEY=  # Add your private key here
ADMIN_ADDRESS=  # Add your wallet address here
```

## 🧪 Test RPC Connection

```bash
curl https://rpc.ankr.com/celo_sepolia \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

Should return: `{"id":1,"jsonrpc":"2.0","result":"0xaa044c"}`

## 🎮 After Deployment

1. **Start the app**: `npm run dev`
2. **Connect wallet** to Celo Sepolia
3. **Create events** (admin access required)
4. **Test betting** functionality

## 🆘 Troubleshooting

### "Cannot read properties of undefined"
- Add `PRIVATE_KEY` to `.env`
- Ensure private key starts with `0x`

### "Insufficient funds"
- Get testnet CELO from faucet
- Check wallet balance

### "Wrong network"
- Switch MetaMask to Celo Sepolia
- Verify chain ID: 11142220

## 📋 Complete .env Example

```env
# Blockchain Configuration
VITE_CELO_NETWORK=sepolia
VITE_FACTORY_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
VITE_STAKING_POOL_ADDRESS=0x0987654321098765432109876543210987654321

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=b95fc9c497801712157da7cf17bdfdfc

# Celo Sepolia RPC
CELO_SEPOLIA_RPC=https://rpc.ankr.com/celo_sepolia

# Deployment (DO NOT COMMIT)
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE

# Optional Features
VITE_ENABLE_SOUNDS=false

# API Keys
CELOSCAN_API_KEY=
```

---

**The RPC issue is now fixed! Just add your private key and deploy.** 🚀