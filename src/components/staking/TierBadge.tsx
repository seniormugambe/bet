import { StakeTier } from '@/types';
import { Award, Crown, Star, Gem, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: StakeTier;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

const tierConfig = {
  [StakeTier.NONE]: {
    name: 'No Tier',
    color: 'text-muted-foreground',
    bgColor: 'bg-muted',
    icon: Shield,
  },
  [StakeTier.BRONZE]: {
    name: 'Bronze',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-950',
    icon: Award,
  },
  [StakeTier.SILVER]: {
    name: 'Silver',
    color: 'text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    icon: Star,
  },
  [StakeTier.GOLD]: {
    name: 'Gold',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-950',
    icon: Crown,
  },
  [StakeTier.PLATINUM]: {
    name: 'Platinum',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950',
    icon: Gem,
  },
};

const sizeConfig = {
  sm: { icon: 'w-3 h-3', text: 'text-xs', padding: 'px-2 py-1' },
  md: { icon: 'w-4 h-4', text: 'text-sm', padding: 'px-3 py-1.5' },
  lg: { icon: 'w-5 h-5', text: 'text-base', padding: 'px-4 py-2' },
  xl: { icon: 'w-6 h-6', text: 'text-lg', padding: 'px-5 py-2.5' },
};

const TierBadge = ({ 
  tier, 
  size = 'md', 
  showLabel = false,
  className 
}: TierBadgeProps) => {
  const config = tierConfig[tier];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-semibold',
        config.bgColor,
        config.color,
        sizes.padding,
        className
      )}
    >
      <Icon className={sizes.icon} />
      {showLabel && <span className={sizes.text}>{config.name}</span>}
    </div>
  );
};

export default TierBadge;
