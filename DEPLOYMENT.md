# Betting Platform Deployment Guide

## Prerequisites

- MetaMask wallet with Sepolia ETH
- Get Sepolia ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

## Deployment Options

### Option 1: Remix IDE (Recommended)

1. **Open Remix IDE**: https://remix.ethereum.org

2. **Create Contract Files**:
   - Copy all contracts from `contracts/` folder
   - Create the same file structure in Remix

3. **Install OpenZeppelin**:
   - In Remix, the imports will auto-resolve
   - Or use: `@openzeppelin/contracts@5.4.0`

4. **Compile Contracts**:
   - Select Solidity Compiler 0.8.20
   - Enable optimization: 200 runs
   - Compile all contracts

5. **Deploy to Sepolia**:
   ```
   a. Connect MetaMask to Sepolia testnet
   b. In "Deploy & Run Transactions" tab:
      - Environment: "Injected Provider - MetaMask"
      - Select "BettingFactory" contract
      - Deploy with your wallet address as initialAdmin
   c. Copy the deployed contract address
   ```

6. **Update Environment Variables**:
   ```bash
   # In your .env file
   VITE_FACTORY_CONTRACT_ADDRESS=0x_YOUR_DEPLOYED_ADDRESS
   VITE_NETWORK=sepolia
   ```

### Option 2: Hardhat (Requires Node.js 22+)

If you upgrade to Node.js 22:

```bash
# Install Node.js 22
nvm install 22
nvm use 22

# Compile contracts
npx hardhat compile

# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia

# Verify on Etherscan
npx hardhat verify --network sepolia DEPLOYED_ADDRESS
```

## Contract Addresses

After deployment, update these in your `.env`:

```env
VITE_FACTORY_CONTRACT_ADDRESS=0x...
VITE_NETWORK=sepolia
SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

## Testing the Deployment

1. **Start the frontend**:
   ```bash
   npm run dev
   ```

2. **Connect your wallet** to Sepolia

3. **Create a test event**:
   - Click "Create Event"
   - Fill in the form
   - Submit transaction

4. **Place a bet**:
   - View the created event
   - Select an outcome
   - Place a bet

## Smart Contract Functions

### BettingFactory

- `createBinaryEvent()` - Create yes/no betting event
- `createMultipleOutcomeEvent()` - Create multi-choice event
- `getAllActiveEvents()` - Get all active events
- `getEventsByCategory()` - Filter by category

### BettingEvent

- `placeBet(outcomeIndex)` - Place a bet (payable)
- `concludeEvent(winningOutcome)` - Conclude event (creator only)
- `calculatePayout(bettor)` - Calculate potential payout
- `claimFailedPayout()` - Claim if auto-payout failed

## Network Configuration

### Sepolia Testnet
- Chain ID: 11155111
- RPC URL: https://rpc.sepolia.org
- Block Explorer: https://sepolia.etherscan.io
- Faucet: https://sepoliafaucet.com/

## Troubleshooting

### "Insufficient funds"
- Get Sepolia ETH from faucet
- Minimum 0.1 ETH recommended

### "Transaction failed"
- Check gas settings
- Ensure wallet is on Sepolia network
- Verify contract address is correct

### "Contract not found"
- Ensure you've deployed the contracts
- Check the contract address in .env
- Verify you're on the correct network

## Security Notes

- Never commit your `.env` file
- Keep your private key secure
- Test thoroughly on testnet before mainnet
- Consider getting a security audit for production

## Support

For issues or questions:
1. Check contract on Sepolia Etherscan
2. Verify transaction status
3. Check browser console for errors
