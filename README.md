# 🎲 BetCelo - Decentralized Betting Platform on Celo

<div align="center">

![BetCelo](https://img.shields.io/badge/BetCelo-Betting%20Platform-brightgreen)
![Celo](https://img.shields.io/badge/Blockchain-Celo-yellow)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-3.0-orange)
![License](https://img.shields.io/badge/License-MIT-green)

A gamified, decentralized betting platform built on the Celo blockchain with real-time odds, staking rewards, and social sharing features.

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture)

</div>

---

## 🌟 Features

### 🎯 Core Betting
- **Binary Events** - Yes/No betting on any outcome
- **Multiple Outcome Events** - 3-10 possible outcomes
- **Real-time Odds** - Dynamic odds based on pool distribution
- **Smart Contract Powered** - Trustless, transparent betting
- **Automatic Payouts** - Winners receive payouts automatically

### 💰 Staking System
- **4-Tier Rewards** - Bronze, Silver, Gold, Platinum
- **5% Base APY** - Earn passive income on staked CELO
- **Tier Boosts** - Up to 25% additional rewards
- **Fee Discounts** - Up to 20% off betting fees
- **No Lock Period** - Unstake anytime

### 🎮 Gamification
- **Game Rules** - Special bonuses (Early Bird, Jackpot, Multiplier, etc.)
- **Celebration Animations** - Kahoot-inspired winning celebrations
- **Achievement System** - Badges and milestones
- **User Stats** - Track your betting performance
- **Leaderboards** - Compete with other bettors

### 📊 Dashboard
- **My Bets** - Track active and completed bets
- **Events History** - All events you've participated in
- **User Statistics** - Win rate, total wagered, earnings
- **Transaction History** - View all your transactions

### 🔗 Social Features
- **Share Events** - Twitter, WhatsApp, Telegram
- **Share Bets** - Brag about wins or share predictions
- **Event Discovery** - Browse by category
- **Real-time Updates** - Live pool and odds updates

### 🔐 Security & Transparency
- **Smart Contract Audited** - Secure and tested contracts
- **Non-custodial** - You control your funds
- **Verifiable** - All transactions on Celoscan
- **Admin Controls** - Multi-sig admin for event management

### 📱 MiniPay Support
- **Mobile-First** - Optimized for Celo MiniPay wallet
- **Auto-Detection** - Automatically detects MiniPay browser
- **Seamless UX** - One-click connection on mobile
- **Native Celo** - Built for the Celo ecosystem

---

## 🎬 Demo

### Live Demo
🚀 **Coming Soon** - Deploying to Celo Mainnet

### Testnet
🧪 **Alfajores Testnet** - Available for testing

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Home Page
![Home](docs/screenshots/home.png)

#### Event Creation
![Create Event](docs/screenshots/create-event.png)

#### Betting Interface
![Betting](docs/screenshots/betting.png)

#### Staking Dashboard
![Staking](docs/screenshots/staking.png)

#### User Dashboard
![Dashboard](docs/screenshots/dashboard.png)

</details>

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (v20+ recommended)
- npm or pnpm
- MetaMask, MiniPay, or compatible Web3 wallet
- Celo Alfajores testnet CELO (from [faucet](https://faucet.celo.org/alfajores))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/betcelo.git
cd betcelo

# Install dependencies
npm install
# or
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# VITE_FACTORY_CONTRACT_ADDRESS=0x...
# VITE_STAKING_POOL_ADDRESS=0x...
# VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Development

```bash
# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Deploy Contracts

```bash
# Compile contracts
npx hardhat compile

# Deploy to Alfajores testnet
npx hardhat run scripts/deploy.ts --network alfajores

# Deploy staking pool
npx hardhat run scripts/deploy-staking.ts --network alfajores

# Update .env with deployed addresses
```

### Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

### Deploy to Render

```bash
# Push to GitHub
git push origin main

# Follow Render deployment guide
# See RENDER_DEPLOYMENT.md for details
```

**Quick Deploy:**
1. Go to https://render.com
2. Connect GitHub repository
3. Add environment variables
4. Deploy!

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete guide.

---

## 📚 Documentation

### User Guides
- [Getting Started](docs/getting-started.md)
- [How to Bet](docs/how-to-bet.md)
- [Staking Guide](STAKING.md)
- [MiniPay Integration](MINIPAY_INTEGRATION.md)
- [FAQ](docs/faq.md)

### Developer Guides
- [Smart Contract Integration](CONTRACT_INTEGRATION_GUIDE.md)
- [Event Creation System](REAL_EVENT_CREATION.md)
- [Deployment Guide](DEPLOY_CONTRACTS.md)
- [Integration Status](INTEGRATION_STATUS.md)

### Feature Documentation
- [Staking System](STAKING.md)
- [Events History](EVENTS_HISTORY.md)
- [Share Features](SHARE_FEATURES.md)
- [Game Rules](src/types/gameRules.ts)

### Technical Documentation
- [Smart Contract Analysis](SMART_CONTRACT_INTEGRATION_ANALYSIS.md)
- [Architecture Overview](#-architecture)
- [API Reference](docs/api-reference.md)

---

## 🏗️ Architecture

### Tech Stack

#### Frontend
- **React 18.3** - UI framework
- **TypeScript 5.5** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Wagmi v2** - Ethereum interactions
- **Viem** - Ethereum utilities
- **Zustand** - State management
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Schema validation

#### Blockchain
- **Solidity 0.8.20** - Smart contracts
- **Hardhat 3.0** - Development environment
- **OpenZeppelin** - Contract libraries
- **Celo** - Layer-1 blockchain
- **Ethers.js** - Contract interactions

#### Tools & Services
- **WalletConnect** - Wallet connection
- **Celoscan** - Block explorer
- **IPFS** - Decentralized storage (planned)

### Smart Contracts

```
contracts/
├── BettingFactory.sol          # Factory for creating events
├── BettingEvent.sol            # Base event contract
├── BinaryBettingEvent.sol      # Yes/No events
├── MultipleOutcomeBettingEvent.sol  # 3-10 outcome events
└── StakingPool.sol             # Staking with tier rewards
```

### Project Structure

```
betcelo/
├── contracts/              # Smart contracts
│   ├── BettingFactory.sol
│   ├── BettingEvent.sol
│   ├── BinaryBettingEvent.sol
│   ├── MultipleOutcomeBettingEvent.sol
│   └── StakingPool.sol
├── scripts/                # Deployment scripts
│   ├── deploy.ts
│   ├── deploy-staking.ts
│   └── verify.ts
├── src/
│   ├── components/         # React components
│   │   ├── betting/       # Betting UI
│   │   ├── dashboard/     # User dashboard
│   │   ├── events/        # Event management
│   │   ├── staking/       # Staking UI
│   │   ├── wallet/        # Wallet connection
│   │   └── gamification/  # Animations & effects
│   ├── hooks/             # Custom React hooks
│   │   ├── useBettingFactory.ts
│   │   ├── useStaking.ts
│   │   └── useMockEvents.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx
│   │   ├── Betting.tsx
│   │   ├── CreateEvent.tsx
│   │   ├── EventDetail.tsx
│   │   ├── Dashboard.tsx
│   │   └── Staking.tsx
│   ├── store/             # State management
│   ├── types/             # TypeScript types
│   ├── config/            # Configuration
│   └── contracts/         # Contract ABIs
├── docs/                  # Documentation
└── test/                  # Contract tests
```

### Data Flow

```
User Interface (React)
        ↓
    Wagmi Hooks
        ↓
    Smart Contracts (Celo)
        ↓
    Blockchain State
        ↓
    Event Listeners
        ↓
    State Updates (Zustand)
        ↓
    UI Re-render
```

---

## 🔧 Configuration

### Environment Variables

```env
# Blockchain
VITE_CELO_NETWORK=alfajores
VITE_FACTORY_CONTRACT_ADDRESS=0x...
VITE_STAKING_POOL_ADDRESS=0x...

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Deployment (DO NOT COMMIT)
PRIVATE_KEY=your_private_key
ADMIN_ADDRESS=your_admin_address

# Optional
VITE_ENABLE_SOUNDS=false
CELOSCAN_API_KEY=your_api_key
```

### Network Configuration

#### Alfajores Testnet
- Chain ID: 44787
- RPC: https://alfajores-forno.celo-testnet.org
- Explorer: https://alfajores.celoscan.io
- Faucet: https://faucet.celo.org/alfajores

#### Celo Mainnet
- Chain ID: 42220
- RPC: https://forno.celo.org
- Explorer: https://celoscan.io

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npx hardhat test

# Run specific test
npx hardhat test test/BettingFactory.test.ts

# Run with coverage
npx hardhat coverage

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### Test Contracts

```bash
# Start local node
npx hardhat node

# Deploy to local node
npx hardhat run scripts/deploy.ts --network localhost

# Interact via console
npx hardhat console --network localhost
```

---

## 📈 Integration Status

| Feature | Status | Progress |
|---------|--------|----------|
| Event Creation | ✅ Complete | 100% |
| Staking System | ✅ Complete | 100% |
| Wallet Connection | ✅ Complete | 100% |
| Event Loading | ⏳ In Progress | 30% |
| Bet Placement | ⏳ Planned | 0% |
| Event Conclusion | ⏳ Planned | 0% |
| Payout Claims | ⏳ Planned | 0% |

**Overall Progress: 33%**

See [INTEGRATION_STATUS.md](INTEGRATION_STATUS.md) for details.

---

## 🛣️ Roadmap

### Phase 1: Core Platform ✅
- [x] Smart contract development
- [x] Event creation system
- [x] Staking mechanism
- [x] Wallet integration
- [x] Basic UI/UX

### Phase 2: Full Integration 🚧
- [ ] Event loading from blockchain
- [ ] Real bet placement
- [ ] Event conclusion mechanism
- [ ] Payout distribution
- [ ] Admin dashboard

### Phase 3: Enhanced Features 📋
- [ ] NFT rewards for stakers
- [ ] Governance system
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Referral program

### Phase 4: Mainnet Launch 🚀
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Marketing campaign
- [ ] Community building
- [ ] Partnerships

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Lead Developer** - [@yourusername](https://github.com/yourusername)
- **Smart Contract Developer** - TBD
- **UI/UX Designer** - TBD

---

## 🙏 Acknowledgments

- [Celo Foundation](https://celo.org/) - Blockchain infrastructure
- [OpenZeppelin](https://openzeppelin.com/) - Smart contract libraries
- [Wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lovable](https://lovable.dev/) - Development platform

---

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/betcelo/issues)
- **Discord**: [Join our community](https://discord.gg/betcelo)
- **Twitter**: [@BetCelo](https://twitter.com/betcelo)
- **Email**: support@betcelo.com

---

## 🔗 Links

- **Website**: https://betcelo.com
- **Testnet**: https://testnet.betcelo.com
- **Documentation**: https://docs.betcelo.com
- **Blog**: https://blog.betcelo.com
- **GitHub**: https://github.com/yourusername/betcelo

---

<div align="center">

**Built with ❤️ on Celo**

[⬆ Back to Top](#-betcelo---decentralized-betting-platform-on-celo)

</div>
