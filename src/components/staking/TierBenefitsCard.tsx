import { StakeTier, TierBenefits } from '@/types';
import { Card } from '@/components/ui/card';
import { parseEther, formatEther } from 'viem';
import TierBadge from './TierBadge';
import { Check, Lock, TrendingUp, Percent } from 'lucide-react';

interface TierBenefitsCardProps {
  currentTier: StakeTier;
}

const tierBenefits: TierBenefits[] = [
  {
    tier: StakeTier.BRONZE,
    name: 'Bronze',
    threshold: parseEther('10'),
    feeDiscount: 5,
    rewardBoost: 5,
    color: 'text-orange-600',
    icon: '🥉',
  },
  {
    tier: StakeTier.SILVER,
    name: 'Silver',
    threshold: parseEther('50'),
    feeDiscount: 10,
    rewardBoost: 10,
    color: 'text-gray-400',
    icon: '🥈',
  },
  {
    tier: StakeTier.GOLD,
    name: 'Gold',
    threshold: parseEther('100'),
    feeDiscount: 15,
    rewardBoost: 15,
    color: 'text-yellow-500',
    icon: '🥇',
  },
  {
    tier: StakeTier.PLATINUM,
    name: 'Platinum',
    threshold: parseEther('500'),
    feeDiscount: 20,
    rewardBoost: 25,
    color: 'text-cyan-400',
    icon: '💎',
  },
];

const TierBenefitsCard = ({ currentTier }: TierBenefitsCardProps) => {
  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Tier Benefits</h2>
        <p className="text-muted-foreground">
          Stake more CELO to unlock higher tiers and better rewards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tierBenefits.map((benefit) => {
          const isUnlocked = currentTier >= benefit.tier;
          const isCurrent = currentTier === benefit.tier;

          return (
            <div
              key={benefit.tier}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                isCurrent
                  ? 'border-primary bg-primary/5 shadow-lg scale-105'
                  : isUnlocked
                  ? 'border-success/50 bg-success/5'
                  : 'border-border bg-surface opacity-75'
              }`}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                {isUnlocked ? (
                  <div className="p-1 rounded-full bg-success">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="p-1 rounded-full bg-muted">
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Tier Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="text-4xl">{benefit.icon}</div>
                  <TierBadge tier={benefit.tier} size="lg" showLabel />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Minimum Stake</p>
                  <p className="text-xl font-bold text-foreground">
                    {formatEther(benefit.threshold)} CELO
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Fee Discount</p>
                      <p className="text-sm font-semibold text-foreground">
                        {benefit.feeDiscount}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Reward Boost</p>
                      <p className="text-sm font-semibold text-success">
                        +{benefit.rewardBoost}%
                      </p>
                    </div>
                  </div>
                </div>

                {isCurrent && (
                  <div className="pt-3">
                    <div className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold text-center">
                      Current Tier
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-surface rounded-lg border border-border">
        <h3 className="font-semibold text-foreground mb-2">How it works</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Stake CELO to unlock tier benefits automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Fee discounts apply to all your bets</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Reward boosts increase your staking APY</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
            <span>Unstake anytime without penalties</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default TierBenefitsCard;
