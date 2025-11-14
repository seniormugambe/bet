# Celo Betting Platform - Smart Contracts

This directory contains the Solidity smart contracts for the Celo Betting Platform.

## Contract Structure

- **BettingEvent.sol** - Base contract for betting events with core logic
- **BinaryBettingEvent.sol** - Specialized contract for binary (yes/no) bets
- **MultipleOutcomeBettingEvent.sol** - Specialized contract for multiple outcome bets
- **BettingFactory.sol** - Factory contract for deploying and managing betting events
- **AccessControl.sol** - Access control and admin management

## Development

### Compile Contracts
```bash
npm run hardhat:compile
```

### Run Tests
```bash
npm run hardhat:test
```

### Deploy to Local Network
```bash
# Start local Hardhat node
npm run hardhat:node

# In another terminal, deploy
npm run hardhat:deploy:local
```

### Deploy to Alfajores Testnet
```bash
npm run hardhat:deploy:alfajores
```

### Deploy to Celo Mainnet
```bash
npm run hardhat:deploy:celo
```

### Verify Contracts
```bash
# Alfajores
npm run hardhat:verify:alfajores

# Mainnet
npm run hardhat:verify:celo
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in required values:
   - `PRIVATE_KEY` - Your wallet private key (for deployment)
   - `ADMIN_ADDRESS` - Admin wallet address
   - `CELOSCAN_API_KEY` - API key from Celoscan (for verification)

## Security Notes

- Never commit your `.env` file
- Use a separate wallet for testnet deployments
- Audit contracts before mainnet deployment
- Test thoroughly on Alfajores before mainnet
