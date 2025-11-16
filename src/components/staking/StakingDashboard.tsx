import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { useBettingStore } from '@/store';
import { StakeTier } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  Award, 
  Coins, 
  Users,
  ArrowUpCircle,
  ArrowDownCircle,
  Gift
} from 'lucide-react';
import { toast } from 'sonner';
import TierBadge from './TierBadge';
import TierBenefitsCard from './TierBenefitsCard';

const StakingDashboard = () => {
  const { address, isConnected } = useAccount();
  const { userStake, stakingStats, setUserStake, setStakingStats } = useBettingStore();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  // Mock data - replace with actual contract calls
  useEffect(() => {
    if (isConnected && address) {
      // TODO: Fetch actual stake info from contract
      setUserStake({
        amount: parseEther('75'),
        stakedAt: Date.now() / 1000 - 86400 * 30,
        lastRewardClaim: Date.now() / 1000 - 86400 * 7,
        tier: StakeTier.SILVER,
        totalRewardsClaimed: parseEther('2.5'),
        pendingRewards: parseEther('0.35'),
      });

      setStakingStats({
        totalStaked: parseEther('15000'),
        stakerCount: 234,
        rewardRate: 5,
        poolBalance: parseEther('20000'),
      });
    }
  }, [isConnected, address]);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) < 1) {
      toast.error('Minimum stake is 1 CELO');
      return;
    }

    setIsStaking(true);
    try {
      // TODO: Call stake contract function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Staked successfully!', {
        description: `Staked ${stakeAmount} CELO`,
      });
      setStakeAmount('');
    } catch (error) {
      toast.error('Staking failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast.error('Invalid unstake amount');
      return;
    }

    if (userStake && parseEther(unstakeAmount) > userStake.amount) {
      toast.error('Insufficient staked balance');
      return;
    }

    setIsUnstaking(true);
    try {
      // TODO: Call unstake contract function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Unstaked successfully!', {
        description: `Unstaked ${unstakeAmount} CELO`,
      });
      setUnstakeAmount('');
    } catch (error) {
      toast.error('Unstaking failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!userStake || userStake.pendingRewards === BigInt(0)) {
      toast.error('No rewards to claim');
      return;
    }

    setIsClaiming(true);
    try {
      // TODO: Call claimRewards contract function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Rewards claimed!', {
        description: `Claimed ${formatEther(userStake.pendingRewards)} CELO`,
      });
    } catch (error) {
      toast.error('Claim failed', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsClaiming(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12 space-y-4">
        <Coins className="w-16 h-16 mx-auto text-muted-foreground" />
        <h3 className="text-2xl font-bold text-foreground">Connect Your Wallet</h3>
        <p className="text-muted-foreground">
          Connect your wallet to start staking and earning rewards
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Staked</p>
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stakingStats ? formatEther(stakingStats.totalStaked) : '0'} CELO
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Stakers</p>
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stakingStats?.stakerCount || 0}
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">APY</p>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <p className="text-2xl font-bold text-success">
            {stakingStats?.rewardRate || 0}%
          </p>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Your Tier</p>
            <Award className="w-5 h-5 text-warning" />
          </div>
          <div className="flex items-center gap-2">
            {userStake && <TierBadge tier={userStake.tier} size="lg" />}
          </div>
        </Card>
      </div>

      {/* User Stake Info */}
      {userStake && (
        <Card className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Stake</h2>
            <TierBadge tier={userStake.tier} size="xl" showLabel />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Staked Amount</p>
              <p className="text-3xl font-bold text-foreground">
                {formatEther(userStake.amount)} CELO
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Pending Rewards</p>
              <p className="text-3xl font-bold text-success">
                {formatEther(userStake.pendingRewards)} CELO
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Claimed</p>
              <p className="text-3xl font-bold text-primary">
                {formatEther(userStake.totalRewardsClaimed)} CELO
              </p>
            </div>
          </div>

          <Button
            onClick={handleClaimRewards}
            disabled={isClaiming || userStake.pendingRewards === BigInt(0)}
            className="w-full btn-kahoot-primary gap-2"
            size="lg"
          >
            <Gift className="w-5 h-5" />
            {isClaiming ? 'Claiming...' : 'Claim Rewards'}
          </Button>
        </Card>
      )}

      {/* Stake/Unstake Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stake Card */}
        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="w-6 h-6 text-success" />
              <h3 className="text-xl font-bold text-foreground">Stake CELO</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Stake CELO to earn rewards and unlock tier benefits
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Amount (CELO)
              </label>
              <Input
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                min="1"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground">
                Minimum: 1 CELO
              </p>
            </div>

            <Button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount}
              className="w-full btn-kahoot-primary"
              size="lg"
            >
              {isStaking ? 'Staking...' : 'Stake'}
            </Button>
          </div>
        </Card>

        {/* Unstake Card */}
        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="w-6 h-6 text-danger" />
              <h3 className="text-xl font-bold text-foreground">Unstake CELO</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Withdraw your staked CELO (rewards will be claimed automatically)
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Amount (CELO)
              </label>
              <Input
                type="number"
                placeholder="0.0"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                min="0.1"
                step="0.1"
                max={userStake ? formatEther(userStake.amount) : '0'}
              />
              <p className="text-xs text-muted-foreground">
                Available: {userStake ? formatEther(userStake.amount) : '0'} CELO
              </p>
            </div>

            <Button
              onClick={handleUnstake}
              disabled={isUnstaking || !unstakeAmount || !userStake}
              className="w-full"
              variant="outline"
              size="lg"
            >
              {isUnstaking ? 'Unstaking...' : 'Unstake'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Tier Benefits */}
      <TierBenefitsCard currentTier={userStake?.tier || StakeTier.NONE} />
    </div>
  );
};

export default StakingDashboard;
