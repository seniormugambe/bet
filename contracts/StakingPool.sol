// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StakingPool
 * @dev Staking contract for the betting platform with tiered benefits
 */
contract StakingPool is Ownable, ReentrancyGuard {
    // Stake tiers with different benefits
    enum StakeTier {
        NONE,      // No stake
        BRONZE,    // 10+ CELO
        SILVER,    // 50+ CELO
        GOLD,      // 100+ CELO
        PLATINUM   // 500+ CELO
    }

    // Stake info for each user
    struct StakeInfo {
        uint256 amount;
        uint256 stakedAt;
        uint256 lastRewardClaim;
        StakeTier tier;
        uint256 totalRewardsClaimed;
    }

    // State variables
    mapping(address => StakeInfo) public stakes;
    address[] public stakers;
    uint256 public totalStaked;
    uint256 public rewardRate = 5; // 5% APY base rate
    uint256 public constant SECONDS_PER_YEAR = 365 days;
    uint256 public constant MIN_STAKE_AMOUNT = 1 ether; // 1 CELO minimum
    
    // Tier thresholds (in wei)
    uint256 public constant BRONZE_THRESHOLD = 10 ether;
    uint256 public constant SILVER_THRESHOLD = 50 ether;
    uint256 public constant GOLD_THRESHOLD = 100 ether;
    uint256 public constant PLATINUM_THRESHOLD = 500 ether;

    // Tier benefits (fee discount in basis points, 100 = 1%)
    mapping(StakeTier => uint256) public tierFeeDiscount;
    mapping(StakeTier => uint256) public tierRewardBoost; // Boost in basis points

    // Events
    event Staked(address indexed user, uint256 amount, StakeTier tier);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    event TierBenefitsUpdated(StakeTier tier, uint256 feeDiscount, uint256 rewardBoost);

    /**
     * @dev Constructor
     */
    constructor(address initialOwner) Ownable(initialOwner) {
        // Initialize tier benefits
        tierFeeDiscount[StakeTier.BRONZE] = 500;    // 5% fee discount
        tierFeeDiscount[StakeTier.SILVER] = 1000;   // 10% fee discount
        tierFeeDiscount[StakeTier.GOLD] = 1500;     // 15% fee discount
        tierFeeDiscount[StakeTier.PLATINUM] = 2000; // 20% fee discount

        tierRewardBoost[StakeTier.BRONZE] = 500;    // 5% reward boost
        tierRewardBoost[StakeTier.SILVER] = 1000;   // 10% reward boost
        tierRewardBoost[StakeTier.GOLD] = 1500;     // 15% reward boost
        tierRewardBoost[StakeTier.PLATINUM] = 2500; // 25% reward boost
    }

    /**
     * @dev Stake CELO tokens
     */
    function stake() external payable nonReentrant {
        require(msg.value >= MIN_STAKE_AMOUNT, "Stake amount too low");

        StakeInfo storage userStake = stakes[msg.sender];

        // If first time staking, add to stakers array
        if (userStake.amount == 0) {
            stakers.push(msg.sender);
            userStake.stakedAt = block.timestamp;
            userStake.lastRewardClaim = block.timestamp;
        } else {
            // Claim pending rewards before adding more stake
            _claimRewards(msg.sender);
        }

        userStake.amount += msg.value;
        userStake.tier = _calculateTier(userStake.amount);
        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value, userStake.tier);
    }

    /**
     * @dev Unstake CELO tokens
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient stake");
        require(amount > 0, "Amount must be greater than 0");

        // Claim pending rewards before unstaking
        _claimRewards(msg.sender);

        userStake.amount -= amount;
        userStake.tier = _calculateTier(userStake.amount);
        totalStaked -= amount;

        // Transfer tokens back to user
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _claimRewards(msg.sender);
    }

    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        require(userStake.amount > 0, "No stake found");

        uint256 reward = calculatePendingRewards(user);
        
        if (reward > 0) {
            userStake.lastRewardClaim = block.timestamp;
            userStake.totalRewardsClaimed += reward;

            // Transfer reward to user
            (bool success, ) = user.call{value: reward}("");
            require(success, "Reward transfer failed");

            emit RewardClaimed(user, reward);
        }
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param user User address
     */
    function calculatePendingRewards(address user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        
        if (userStake.amount == 0) {
            return 0;
        }

        uint256 timeStaked = block.timestamp - userStake.lastRewardClaim;
        uint256 baseReward = (userStake.amount * rewardRate * timeStaked) / (SECONDS_PER_YEAR * 100);
        
        // Apply tier boost
        uint256 boost = tierRewardBoost[userStake.tier];
        uint256 boostedReward = baseReward + (baseReward * boost / 10000);

        return boostedReward;
    }

    /**
     * @dev Calculate tier based on stake amount
     */
    function _calculateTier(uint256 amount) internal pure returns (StakeTier) {
        if (amount >= PLATINUM_THRESHOLD) return StakeTier.PLATINUM;
        if (amount >= GOLD_THRESHOLD) return StakeTier.GOLD;
        if (amount >= SILVER_THRESHOLD) return StakeTier.SILVER;
        if (amount >= BRONZE_THRESHOLD) return StakeTier.BRONZE;
        return StakeTier.NONE;
    }

    /**
     * @dev Get user stake info
     * @param user User address
     */
    function getStakeInfo(address user) external view returns (
        uint256 amount,
        uint256 stakedAt,
        uint256 lastRewardClaim,
        StakeTier tier,
        uint256 totalRewardsClaimed,
        uint256 pendingRewards
    ) {
        StakeInfo memory userStake = stakes[user];
        return (
            userStake.amount,
            userStake.stakedAt,
            userStake.lastRewardClaim,
            userStake.tier,
            userStake.totalRewardsClaimed,
            calculatePendingRewards(user)
        );
    }

    /**
     * @dev Get fee discount for a user based on their tier
     * @param user User address
     */
    function getFeeDiscount(address user) external view returns (uint256) {
        return tierFeeDiscount[stakes[user].tier];
    }

    /**
     * @dev Get reward boost for a user based on their tier
     * @param user User address
     */
    function getRewardBoost(address user) external view returns (uint256) {
        return tierRewardBoost[stakes[user].tier];
    }

    /**
     * @dev Get total number of stakers
     */
    function getStakerCount() external view returns (uint256) {
        return stakers.length;
    }

    /**
     * @dev Update reward rate (owner only)
     * @param newRate New reward rate (in percentage)
     */
    function updateRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 50, "Rate too high"); // Max 50% APY
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    /**
     * @dev Update tier benefits (owner only)
     */
    function updateTierBenefits(
        StakeTier tier,
        uint256 feeDiscount,
        uint256 rewardBoost
    ) external onlyOwner {
        require(feeDiscount <= 5000, "Discount too high"); // Max 50%
        require(rewardBoost <= 10000, "Boost too high"); // Max 100%
        
        tierFeeDiscount[tier] = feeDiscount;
        tierRewardBoost[tier] = rewardBoost;
        
        emit TierBenefitsUpdated(tier, feeDiscount, rewardBoost);
    }

    /**
     * @dev Fund the staking pool (owner only)
     */
    function fundPool() external payable onlyOwner {
        require(msg.value > 0, "Must send funds");
    }

    /**
     * @dev Get contract balance
     */
    function getPoolBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Receive function to accept CELO
     */
    receive() external payable {}
}
