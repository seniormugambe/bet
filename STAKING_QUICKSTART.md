# Staking System - Quick Start

## What's Been Added

A complete staking system has been integrated into the BetCelo betting platform with the following components:

### Smart Contract
- **StakingPool.sol**: Full-featured staking contract with tier system
  - Stake/unstake CELO tokens
  - Automatic reward calculation (5% base APY)
  - 4-tier system (Bronze, Silver, Gold, Platinum)
  - Fee discounts and reward boosts per tier
  - No lock periods - unstake anytime

### Frontend Components
1. **StakingDashboard** (`src/components/staking/StakingDashboard.tsx`)
   - Main staking interface
   - Shows total staked, staker count, APY
   - Stake/unstake forms
   - Claim rewards button

2. **TierBadge** (`src/components/staking/TierBadge.tsx`)
   - Visual tier indicator with icons and colors

3. **TierBenefitsCard** (`src/components/staking/TierBenefitsCard.tsx`)
   - Displays all tiers and their benefits
   - Shows current tier and progress

4. **Staking Page** (`src/pages/Staking.tsx`)
   - Full page at `/staking` route

### Hooks
- **useStaking** (`src/hooks/useStaking.ts`)
  - React hook for staking operations
  - Integrates with wagmi for blockchain interactions

### Store Updates
- Added staking state to Zustand store
- `userStake`: Current user's stake info
- `stakingStats`: Platform-wide staking statistics

## Tier System

| Tier | Stake | Fee Discount | Reward Boost |
|------|-------|--------------|--------------|
| 🥉 Bronze | 10 CELO | 5% | 5% |
| 🥈 Silver | 50 CELO | 10% | 10% |
| 🥇 Gold | 100 CELO | 15% | 15% |
| 💎 Platinum | 500 CELO | 20% | 25% |

## How to Deploy

1. **Deploy the staking contract:**
   ```bash
   npx hardhat run scripts/deploy-staking.ts --network alfajores
   ```

2. **Add contract address to `.env`:**
   ```
   VITE_STAKING_POOL_ADDRESS=0x...
   ```

3. **Access the staking page:**
   - Navigate to `/staking` or click "Stake & Earn" from homepage

## User Flow

1. User connects wallet
2. Navigates to Staking page
3. Enters amount to stake (minimum 1 CELO)
4. Clicks "Stake" button
5. Confirms transaction in wallet
6. Tier is automatically assigned based on stake amount
7. Rewards accumulate automatically
8. User can claim rewards or unstake anytime

## Benefits

- **Passive Income**: Earn 5% APY on staked CELO
- **Tier Rewards**: Higher tiers get boosted APY (up to 25% extra)
- **Fee Discounts**: Save on betting fees (up to 20% off)
- **No Lock**: Unstake anytime without penalties
- **Auto-Compound**: Claim and restake rewards easily

## Files Modified

- `src/types/index.ts` - Added staking types
- `src/store/index.ts` - Added staking state
- `src/App.tsx` - Added staking route
- `src/pages/Index.tsx` - Added staking link
- `.env.example` - Added staking pool address

## Files Created

- `contracts/StakingPool.sol`
- `scripts/deploy-staking.ts`
- `src/components/staking/StakingDashboard.tsx`
- `src/components/staking/TierBadge.tsx`
- `src/components/staking/TierBenefitsCard.tsx`
- `src/pages/Staking.tsx`
- `src/hooks/useStaking.ts`
- `STAKING.md`
- `STAKING_QUICKSTART.md`

## Next Steps

1. Deploy the contract to Alfajores testnet
2. Test staking/unstaking functionality
3. Verify tier benefits work correctly
4. Integrate fee discounts into betting contracts
5. Add staking analytics to dashboard
6. Consider adding governance features

## Support

For detailed documentation, see `STAKING.md`
