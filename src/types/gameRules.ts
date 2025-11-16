// Game Rules and Modifiers for Betting Events

export enum GameRuleType {
  MULTIPLIER = 'multiplier',
  BONUS_ROUND = 'bonus_round',
  EARLY_BIRD = 'early_bird',
  UNDERDOG_BOOST = 'underdog_boost',
  STREAK_BONUS = 'streak_bonus',
  JACKPOT = 'jackpot',
  DOUBLE_OR_NOTHING = 'double_or_nothing',
  MYSTERY_BOX = 'mystery_box',
}

export interface GameRule {
  id: string;
  type: GameRuleType;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  config?: Record<string, any>;
}

// Predefined game rules
export const GAME_RULES: Record<GameRuleType, Omit<GameRule, 'id' | 'enabled'>> = {
  [GameRuleType.MULTIPLIER]: {
    type: GameRuleType.MULTIPLIER,
    name: '🎰 Lucky Multiplier',
    description: 'Random winners get 2x-5x payout multiplier!',
    icon: '🎰',
    config: { minMultiplier: 2, maxMultiplier: 5, chance: 0.1 },
  },
  [GameRuleType.BONUS_ROUND]: {
    type: GameRuleType.BONUS_ROUND,
    name: '🎁 Bonus Round',
    description: 'Last 10 bettors get +20% bonus on winnings',
    icon: '🎁',
    config: { bonusPercentage: 20, lastNBettors: 10 },
  },
  [GameRuleType.EARLY_BIRD]: {
    type: GameRuleType.EARLY_BIRD,
    name: '🐦 Early Bird Special',
    description: 'First 20 bettors get +15% bonus',
    icon: '🐦',
    config: { bonusPercentage: 15, firstNBettors: 20 },
  },
  [GameRuleType.UNDERDOG_BOOST]: {
    type: GameRuleType.UNDERDOG_BOOST,
    name: '🚀 Underdog Boost',
    description: 'Betting on the underdog gives +25% payout',
    icon: '🚀',
    config: { bonusPercentage: 25, maxPoolShare: 30 },
  },
  [GameRuleType.STREAK_BONUS]: {
    type: GameRuleType.STREAK_BONUS,
    name: '🔥 Win Streak Bonus',
    description: 'Win 3+ bets in a row for +30% bonus',
    icon: '🔥',
    config: { requiredStreak: 3, bonusPercentage: 30 },
  },
  [GameRuleType.JACKPOT]: {
    type: GameRuleType.JACKPOT,
    name: '💎 Jackpot Mode',
    description: '5% of pool goes to random winner as jackpot',
    icon: '💎',
    config: { jackpotPercentage: 5 },
  },
  [GameRuleType.DOUBLE_OR_NOTHING]: {
    type: GameRuleType.DOUBLE_OR_NOTHING,
    name: '⚡ Double or Nothing',
    description: 'Win = 2x payout, Lose = lose everything',
    icon: '⚡',
    config: { multiplier: 2 },
  },
  [GameRuleType.MYSTERY_BOX]: {
    type: GameRuleType.MYSTERY_BOX,
    name: '🎲 Mystery Box',
    description: 'Random surprise bonus between 10%-50%',
    icon: '🎲',
    config: { minBonus: 10, maxBonus: 50 },
  },
};

// Helper function to get active rules for an event
export const getActiveRules = (ruleIds: string[]): GameRule[] => {
  return ruleIds
    .map((id) => {
      const ruleType = Object.values(GameRuleType).find((type) => type === id);
      if (!ruleType) return null;
      return {
        id,
        ...GAME_RULES[ruleType],
        enabled: true,
      };
    })
    .filter((rule): rule is GameRule => rule !== null);
};

// Calculate bonus multiplier based on active rules
export const calculateBonusMultiplier = (
  rules: GameRule[],
  betData: {
    isEarlyBird?: boolean;
    isLateBettor?: boolean;
    isUnderdog?: boolean;
    hasWinStreak?: boolean;
    streakCount?: number;
  }
): number => {
  let multiplier = 1;

  rules.forEach((rule) => {
    switch (rule.type) {
      case GameRuleType.EARLY_BIRD:
        if (betData.isEarlyBird) {
          multiplier += (rule.config?.bonusPercentage || 15) / 100;
        }
        break;
      case GameRuleType.BONUS_ROUND:
        if (betData.isLateBettor) {
          multiplier += (rule.config?.bonusPercentage || 20) / 100;
        }
        break;
      case GameRuleType.UNDERDOG_BOOST:
        if (betData.isUnderdog) {
          multiplier += (rule.config?.bonusPercentage || 25) / 100;
        }
        break;
      case GameRuleType.STREAK_BONUS:
        if (betData.hasWinStreak && (betData.streakCount || 0) >= (rule.config?.requiredStreak || 3)) {
          multiplier += (rule.config?.bonusPercentage || 30) / 100;
        }
        break;
      case GameRuleType.DOUBLE_OR_NOTHING:
        multiplier *= rule.config?.multiplier || 2;
        break;
    }
  });

  return multiplier;
};
