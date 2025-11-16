import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { useBettingStore } from '@/store';
import { StakeTier } from '@/types';
import { toast } from 'sonner';

// ABI for StakingPool contract
const STAKING_POOL_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getStakeInfo',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'stakedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'lastRewardClaim', type: 'uint256' },
      { internalType: 'enum StakingPool.StakeTier', name: 'tier', type: 'uint8' },
      { internalType: 'uint256', name: 'totalRewardsClaimed', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingRewards', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStakerCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardRate',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPoolBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const STAKING_POOL_ADDRESS = import.meta.env.VITE_STAKING_POOL_ADDRESS as `0x${string}`;

export const useStaking = () => {
  const { address } = useAccount();
  const { setUserStake, setStakingStats } = useBettingStore();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Read user stake info
  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: STAKING_POOL_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
  } as any);

  // Read total staked
  const { data: totalStaked } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: STAKING_POOL_ABI,
    functionName: 'totalStaked',
  } as any);

  // Read staker count
  const { data: stakerCount } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: STAKING_POOL_ABI,
    functionName: 'getStakerCount',
  } as any);

  // Read reward rate
  const { data: rewardRate } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: STAKING_POOL_ABI,
    functionName: 'rewardRate',
  } as any);

  // Read pool balance
  const { data: poolBalance } = useReadContract({
    address: STAKING_POOL_ADDRESS,
    abi: STAKING_POOL_ABI,
    functionName: 'getPoolBalance',
  } as any);

  // Update store when data changes
  if (stakeInfo && address && Array.isArray(stakeInfo)) {
    const [amount, stakedAt, lastRewardClaim, tier, totalRewardsClaimed, pendingRewards] = stakeInfo as any[];
    setUserStake({
      amount: amount as bigint,
      stakedAt: Number(stakedAt),
      lastRewardClaim: Number(lastRewardClaim),
      tier: tier as StakeTier,
      totalRewardsClaimed: totalRewardsClaimed as bigint,
      pendingRewards: pendingRewards as bigint,
    });
  }

  if (totalStaked !== undefined && stakerCount !== undefined && rewardRate !== undefined && poolBalance !== undefined) {
    setStakingStats({
      totalStaked: totalStaked as bigint,
      stakerCount: Number(stakerCount),
      rewardRate: Number(rewardRate),
      poolBalance: poolBalance as bigint,
    });
  }

  // Stake function
  const stake = async (amount: string) => {
    try {
      const amountWei = parseEther(amount);
      
      writeContract({
        address: STAKING_POOL_ADDRESS,
        abi: STAKING_POOL_ABI,
        functionName: 'stake',
        value: amountWei,
      });

      return true;
    } catch (error) {
      console.error('Stake error:', error);
      toast.error('Failed to stake', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  };

  // Unstake function
  const unstake = async (amount: string) => {
    try {
      const amountWei = parseEther(amount);
      
      writeContract({
        address: STAKING_POOL_ADDRESS,
        abi: STAKING_POOL_ABI,
        functionName: 'unstake',
        args: [amountWei],
      });

      return true;
    } catch (error) {
      console.error('Unstake error:', error);
      toast.error('Failed to unstake', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  };

  // Claim rewards function
  const claimRewards = async () => {
    try {
      writeContract({
        address: STAKING_POOL_ADDRESS,
        abi: STAKING_POOL_ABI,
        functionName: 'claimRewards',
      });

      return true;
    } catch (error) {
      console.error('Claim rewards error:', error);
      toast.error('Failed to claim rewards', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  };

  return {
    stake,
    unstake,
    claimRewards,
    refetchStakeInfo,
    isPending: isPending || isConfirming,
    isSuccess,
    stakeInfo,
  };
};
