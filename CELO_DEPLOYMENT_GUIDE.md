# Celo Deployment Guide

## Quick Setup (Using Alfajores Testnet)

The project is configured to use Celo Alfajores testnet (referred to as "sepolia" in our config for consistency).

### 1. Get Testnet CELO

1. **Install MetaMask** or **MiniPay** wallet
2. **Add Celo Alfajores network** to your wallet:
   - Network Name: `Celo Alfajores Testnet`
   - RPC URL: `https://alfajores-forno.celo-testnet.org`
   - Chain ID: `44787`
   - Currency Symbol: `CELO`
   - Block Explorer: `https://alfajores.celoscan.io`

3. **Get testnet CELO** from the faucet:
   - Visit: https://faucet.celo.org/alfajores
   - Enter your wallet address
   - Request testnet CELO

### 2. Deploy Contracts

#### Option A: Using Hardhat (Recommended)

1. **Add your private key** to `.env`:
   ```env
   PRIVATE_KEY=your_wallet_private_key_here
   ADMIN_ADDRESS=your_wallet_address_here
   ```

2. **Deploy contracts**:
   ```bash
   npx hardhat run scripts/deploy-celo-sepolia.cjs --network celo-sepolia
   ```

3. **Update .env** with deployed addresses:
   ```env
   VITE_FACTORY_CONTRACT_ADDRESS=0x_deployed_factory_address
   VITE_STAKING_POOL_ADDRESS=0x_deployed_staking_address
   ```

#### Option B: Using Remix IDE

1. **Open Remix**: https://remix.ethereum.org
2. **Upload contracts** from the `contracts/` folder
3. **Compile** with Solidity 0.8.20
4. **Connect MetaMask** to Celo Alfajores
5. **Deploy BettingFactory** with your address as admin
6. **Deploy StakingPool** with your address as admin
7. **Copy addresses** to `.env` file

### 3. Start the Application

```bash
npm run dev
```

## Current Configuration

The app is configured for:
- **Network**: Celo Alfajores Testnet (Chain ID: 44787)
- **RPC**: https://alfajores-forno.celo-testnet.org
- **Explorer**: https://alfajores.celoscan.io
- **Currency**: CELO

## Environment Variables

```env
# Blockchain Configuration
VITE_CELO_NETWORK=sepolia
VITE_FACTORY_CONTRACT_ADDRESS=your_factory_address
VITE_STAKING_POOL_ADDRESS=your_staking_address

# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Admin Configuration (for event creation)
ADMIN_ADDRESS=your_wallet_address

# Deployment (DO NOT COMMIT)
PRIVATE_KEY=your_private_key
```

## Testing the Deployment

1. **Connect Wallet**: Click "Connect Wallet" and connect to Celo Alfajores
2. **Check Network**: Ensure you're on the correct network
3. **Create Event**: Go to "Create Event" page (requires admin access)
4. **Place Bets**: Test betting functionality
5. **Stake Tokens**: Test staking functionality

## Troubleshooting

### "Contract Not Configured"
- Ensure `VITE_FACTORY_CONTRACT_ADDRESS` is set in `.env`
- Verify the contract is deployed and address is correct

### "Admin Access Required"
- Set `ADMIN_ADDRESS` in `.env` to your wallet address
- Ensure you're connected with the admin wallet

### "Wrong Network"
- Switch to Celo Alfajores testnet in your wallet
- Check network configuration in wallet

### Connection Issues
- Ensure you have testnet CELO for gas fees
- Check internet connection
- Try refreshing the page

## Contract Addresses (Example)

After deployment, your `.env` should look like:

```env
VITE_CELO_NETWORK=sepolia
VITE_FACTORY_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
VITE_STAKING_POOL_ADDRESS=0x0987654321098765432109876543210987654321
ADMIN_ADDRESS=0xYourWalletAddressHere
```

## Next Steps

1. **Deploy contracts** using one of the methods above
2. **Update environment variables** with real addresses
3. **Test all functionality** on testnet
4. **Consider mainnet deployment** when ready

## Support

- **Celo Docs**: https://docs.celo.org/
- **Faucet**: https://faucet.celo.org/alfajores
- **Explorer**: https://alfajores.celoscan.io
- **Discord**: Celo community Discord

---

**Note**: The project uses Celo Alfajores testnet, which is the primary Celo testnet. We refer to it as "sepolia" in our configuration for consistency with the naming convention.