# Staking System

The BetCelo platform includes a comprehensive staking system that allows users to stake CELO tokens to earn rewards and unlock tier benefits.

## Features

### 🏆 Tier System

Users can unlock different tiers based on their staked amount:

| Tier | Minimum Stake | Fee Discount | Reward Boost |
|------|--------------|--------------|--------------|
| Bronze | 10 CELO | 5% | 5% |
| Silver | 50 CELO | 10% | 10% |
| Gold | 100 CELO | 15% | 15% |
| Platinum | 500 CELO | 20% | 25% |

### 💰 Staking Rewards

- **Base APY**: 5% annual percentage yield
- **Tier Boosts**: Additional rewards based on your tier
- **Compound Effect**: Rewards can be claimed and restaked anytime
- **No Lock Period**: Unstake anytime without penalties

### 🎁 Tier Benefits

1. **Fee Discounts**: Reduced platform fees on all bets
2. **Reward Boosts**: Increased staking APY
3. **Priority Access**: Early access to new features (coming soon)
4. **Exclusive Events**: Access to high-stakes events (coming soon)

## Smart Contract

### StakingPool.sol

The staking contract manages all staking operations:

- **Stake**: Deposit CELO to start earning rewards
- **Unstake**: Withdraw staked CELO (claims rewards automatically)
- **Claim Rewards**: Claim accumulated rewards without unstaking
- **Tier Calculation**: Automatic tier assignment based on stake amount

### Key Functions

```solidity
// Stake CELO tokens
function stake() external payable

// Unstake CELO tokens
function unstake(uint256 amount) external

// Claim staking rewards
function claimRewards() external

// Get user stake information
function getStakeInfo(address user) external view returns (...)

// Get fee discount for user
function getFeeDiscount(address user) external view returns (uint256)
```

## Frontend Components

### StakingDashboard

Main dashboard showing:
- Total staked across platform
- Number of stakers
- Current APY
- User's tier and stake info
- Stake/unstake interface
- Pending rewards

### TierBadge

Visual representation of user's tier with:
- Tier icon and color
- Tier name
- Optional label display

### TierBenefitsCard

Displays all available tiers with:
- Minimum stake requirements
- Fee discounts
- Reward boosts
- Lock/unlock status
- Current tier highlight

## Deployment

### 1. Deploy Staking Contract

```bash
npx hardhat run scripts/deploy-staking.ts --network alfajores
```

### 2. Update Environment Variables

Add the deployed contract address to `.env`:

```
VITE_STAKING_POOL_ADDRESS=0x...
```

### 3. Fund the Staking Pool

The deployment script automatically funds the pool with 100 CELO for rewards. To add more:

```bash
# Using Hardhat console
npx hardhat console --network alfajores

# Then in console:
const StakingPool = await ethers.getContractFactory("StakingPool");
const pool = await StakingPool.attach("YOUR_POOL_ADDRESS");
await pool.fundPool({ value: ethers.parseEther("100") });
```

## Usage

### For Users

1. **Navigate to Staking Page**: Click "Stake & Earn" from the homepage
2. **Connect Wallet**: Connect your Celo wallet
3. **Stake CELO**: Enter amount and click "Stake"
4. **Earn Rewards**: Rewards accumulate automatically
5. **Claim or Unstake**: Claim rewards or unstake anytime

### For Developers

```typescript
import { useStaking } from '@/hooks/useStaking';

function MyComponent() {
  const { stake, unstake, claimRewards, stakeInfo } = useStaking();

  // Stake 10 CELO
  await stake('10');

  // Unstake 5 CELO
  await unstake('5');

  // Claim rewards
  await claimRewards();

  // Access stake info
  console.log(stakeInfo);
}
```

## Reward Calculation

Rewards are calculated using the formula:

```
baseReward = (stakedAmount × rewardRate × timeStaked) / (secondsPerYear × 100)
tierBoost = baseReward × (tierBoostPercentage / 10000)
totalReward = baseReward + tierBoost
```

Example:
- Staked: 100 CELO
- Tier: Gold (15% boost)
- Time: 30 days
- Base APY: 5%

```
baseReward = (100 × 5 × 2592000) / (31536000 × 100) = 0.411 CELO
tierBoost = 0.411 × 0.15 = 0.062 CELO
totalReward = 0.411 + 0.062 = 0.473 CELO
```

## Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Admin functions protected
- **Rate Limits**: Maximum APY capped at 50%
- **Benefit Limits**: Maximum discounts and boosts capped
- **Automatic Tier Updates**: Tier recalculated on every stake/unstake

## Admin Functions

Contract owner can:

1. **Update Reward Rate**: Adjust APY (max 50%)
2. **Update Tier Benefits**: Modify fee discounts and reward boosts
3. **Fund Pool**: Add more CELO for rewards

```solidity
// Update reward rate to 7%
function updateRewardRate(uint256 newRate) external onlyOwner

// Update tier benefits
function updateTierBenefits(
    StakeTier tier,
    uint256 feeDiscount,
    uint256 rewardBoost
) external onlyOwner
```

## Future Enhancements

- [ ] NFT rewards for long-term stakers
- [ ] Governance voting power based on stake
- [ ] Staking pools for specific event categories
- [ ] Referral bonuses for bringing new stakers
- [ ] Time-locked staking with higher APY
- [ ] Integration with betting contracts for automatic fee discounts

## Testing

Run the test suite:

```bash
npx hardhat test test/StakingPool.test.ts
```

## Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation
- Join our Discord community
