/**
 * Achievement System for Human Player Mode
 *
 * Achievements gamify the learning experience, rewarding players for:
 * 1. Mastering different aspects of trust dynamics
 * 2. Experimenting with various strategies
 * 3. Understanding emergent behaviors
 * 4. Achieving difficult milestones
 *
 * Each achievement teaches a lesson about Web4 trust dynamics.
 */

// ============================================================================
// Types
// ============================================================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  // The lesson this achievement teaches
  insight: string;
  // Icon/emoji for display
  icon: string;
  // Category for organization
  category: AchievementCategory;
  // Rarity affects display color
  rarity: AchievementRarity;
  // Optional: hidden until unlocked (for surprise discoveries)
  hidden?: boolean;
}

export type AchievementCategory =
  | 'survival'      // Making it through challenges
  | 'cooperation'   // Mastering cooperation
  | 'strategy'      // Strategic play
  | 'social'        // Building relationships
  | 'mastery'       // Difficult achievements
  | 'exploration';  // Trying different scenarios

export type AchievementRarity =
  | 'common'        // Easy to get
  | 'uncommon'      // Requires some skill
  | 'rare'          // Requires significant skill
  | 'epic'          // Very difficult
  | 'legendary';    // Nearly impossible

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: number;  // timestamp
  gameContext: {
    scenario: string;
    cooperationRate: number;
    finalATP: number;
    coalitionSize: number;
    survived: boolean;
    totalInteractions: number;
  };
}

export interface GameStats {
  // Lifetime stats
  totalGamesPlayed: number;
  totalSurvived: number;
  totalDied: number;
  totalCooperations: number;
  totalDefections: number;
  totalInteractions: number;
  totalCoalitionsMade: number;
  highestATP: number;
  highestCoalitionSize: number;
  highestCooperationRate: number;
  longestSurvivalStreak: number;
  currentSurvivalStreak: number;
  // Scenario-specific
  scenariosCompleted: Set<string>;
  scenarioStats: Map<string, {
    played: number;
    survived: number;
    bestATP: number;
  }>;
  // Session stats (reset each game)
  consecutiveCooperations: number;
  consecutiveDefections: number;
  partnersBetrayed: Set<number>;
  partnersNeverBetrayed: Set<number>;
  // Special tracking
  perfectTrustMaintained: boolean;
  neverDefected: boolean;
  neverCooperated: boolean;
}

// ============================================================================
// Achievement Definitions
// ============================================================================

export const ACHIEVEMENTS: Achievement[] = [
  // ===== SURVIVAL ACHIEVEMENTS =====
  {
    id: 'first_survivor',
    name: 'First Steps',
    description: 'Survive your first game',
    insight: 'The foundation of Web4: staying alive long enough to build trust.',
    icon: '🌱',
    category: 'survival',
    rarity: 'common',
  },
  {
    id: 'survivor_3',
    name: 'Getting the Hang of It',
    description: 'Survive 3 games',
    insight: 'Consistency matters. Each survival teaches pattern recognition.',
    icon: '🌿',
    category: 'survival',
    rarity: 'uncommon',
  },
  {
    id: 'survivor_10',
    name: 'Veteran',
    description: 'Survive 10 games',
    insight: 'Experience builds intuition. You now sense trust dynamics instinctively.',
    icon: '🌳',
    category: 'survival',
    rarity: 'rare',
  },
  {
    id: 'close_call',
    name: 'Close Call',
    description: 'Survive with less than 10 ATP remaining',
    insight: 'Sometimes the margin between success and failure is razor-thin.',
    icon: '😰',
    category: 'survival',
    rarity: 'uncommon',
  },
  {
    id: 'thrive',
    name: 'Thriving',
    description: 'End a game with over 150 ATP',
    insight: 'Cooperation creates abundance, not just survival.',
    icon: '💎',
    category: 'survival',
    rarity: 'rare',
  },
  {
    id: 'survival_streak_3',
    name: 'Hot Streak',
    description: 'Survive 3 games in a row',
    insight: 'You\'ve developed a reliable approach to navigating trust.',
    icon: '🔥',
    category: 'survival',
    rarity: 'rare',
  },
  {
    id: 'survival_streak_5',
    name: 'Unstoppable',
    description: 'Survive 5 games in a row',
    insight: 'Mastery is consistency. You\'ve internalized trust dynamics.',
    icon: '⚡',
    category: 'survival',
    rarity: 'epic',
  },

  // ===== COOPERATION ACHIEVEMENTS =====
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Finish a game with 70%+ cooperation rate',
    insight: 'Consistent cooperation builds the reputation that attracts allies.',
    icon: '🤝',
    category: 'cooperation',
    rarity: 'common',
  },
  {
    id: 'peacemaker',
    name: 'Peacemaker',
    description: 'Finish a game with 90%+ cooperation rate and survive',
    insight: 'Near-total cooperation is sustainable with the right partners.',
    icon: '☮️',
    category: 'cooperation',
    rarity: 'rare',
  },
  {
    id: 'saint',
    name: 'Saint',
    description: 'Complete a game without ever defecting',
    insight: 'Pure cooperation can work - with the right society.',
    icon: '😇',
    category: 'cooperation',
    rarity: 'epic',
  },
  {
    id: 'mutual_benefit',
    name: 'Mutual Benefit',
    description: 'Have 5 consecutive mutual cooperations',
    insight: 'This is the rhythm of trust: cooperate, cooperate, cooperate.',
    icon: '🔄',
    category: 'cooperation',
    rarity: 'uncommon',
  },
  {
    id: 'cooperation_streak_10',
    name: 'Trust Builder',
    description: 'Have 10 consecutive cooperations',
    insight: 'Long cooperation streaks create deep, resilient relationships.',
    icon: '🏗️',
    category: 'cooperation',
    rarity: 'rare',
  },

  // ===== STRATEGY ACHIEVEMENTS =====
  {
    id: 'betrayer',
    name: 'The Betrayer',
    description: 'Defect 5 times in a single game',
    insight: 'Defection is a tool, but its costs compound quickly.',
    icon: '🗡️',
    category: 'strategy',
    rarity: 'uncommon',
  },
  {
    id: 'pure_defector',
    name: 'Wolf Among Sheep',
    description: 'Survive while defecting more than cooperating',
    insight: 'Exploitation can work short-term, but requires careful timing.',
    icon: '🐺',
    category: 'strategy',
    rarity: 'rare',
  },
  {
    id: 'balanced_approach',
    name: 'Balanced Approach',
    description: 'Finish with 45-55% cooperation rate and survive',
    insight: 'The middle path requires the most nuanced judgment.',
    icon: '⚖️',
    category: 'strategy',
    rarity: 'uncommon',
  },
  {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    description: 'Survive after dropping below 20 ATP mid-game',
    insight: 'Recovery is possible if you change strategy before it\'s too late.',
    icon: '📈',
    category: 'strategy',
    rarity: 'rare',
  },
  {
    id: 'first_strike',
    name: 'First Strike',
    description: 'Defect on your very first interaction and survive',
    insight: 'A bold start can work, but costs trust from the beginning.',
    icon: '⚔️',
    category: 'strategy',
    rarity: 'uncommon',
    hidden: true,
  },

  // ===== SOCIAL ACHIEVEMENTS =====
  {
    id: 'coalition_builder',
    name: 'Coalition Builder',
    description: 'Build a coalition of 2+ members',
    insight: 'Coalitions provide insurance: when one member struggles, others help.',
    icon: '👥',
    category: 'social',
    rarity: 'common',
  },
  {
    id: 'coalition_leader',
    name: 'Coalition Leader',
    description: 'Build a coalition of 4+ members',
    insight: 'Large coalitions create economies of trust that benefit all members.',
    icon: '👑',
    category: 'social',
    rarity: 'rare',
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Interact with every agent in the society',
    insight: 'Diversity of connections provides resilience against any one relationship failing.',
    icon: '🦋',
    category: 'social',
    rarity: 'uncommon',
  },
  {
    id: 'loyal_friend',
    name: 'Loyal Friend',
    description: 'Never defect on the same agent twice',
    insight: 'Selective loyalty: once you\'ve tested a relationship, commit to it.',
    icon: '🤞',
    category: 'social',
    rarity: 'rare',
  },
  {
    id: 'high_reputation',
    name: 'High Standing',
    description: 'Achieve 80%+ reputation',
    insight: 'Reputation is visible trust. High reputation attracts cooperation.',
    icon: '⭐',
    category: 'social',
    rarity: 'uncommon',
  },
  {
    id: 'max_reputation',
    name: 'Pillar of Society',
    description: 'Achieve 95%+ reputation',
    insight: 'At this level, your word IS trust. Others cooperate by default.',
    icon: '🏛️',
    category: 'social',
    rarity: 'epic',
  },

  // ===== MASTERY ACHIEVEMENTS =====
  {
    id: 'hostile_survivor',
    name: 'Survivor',
    description: 'Survive in the Hostile World scenario',
    insight: 'Even among defectors, strategic cooperation can carve out a niche.',
    icon: '🏆',
    category: 'mastery',
    rarity: 'rare',
  },
  {
    id: 'hostile_thrive',
    name: 'Defector\'s Downfall',
    description: 'End with 100+ ATP in the Hostile World scenario',
    insight: 'The ultimate proof: cooperation beats defection even among defectors.',
    icon: '💪',
    category: 'mastery',
    rarity: 'epic',
  },
  {
    id: 'perfect_game',
    name: 'Perfect Game',
    description: 'Survive with 100% cooperation rate and 100+ ATP',
    insight: 'Perfection in cooperation. This is the ideal Web4 citizen.',
    icon: '🎯',
    category: 'mastery',
    rarity: 'legendary',
  },
  {
    id: 'all_scenarios',
    name: 'Worldly',
    description: 'Survive in all three scenarios',
    insight: 'Adaptability: different environments require different approaches.',
    icon: '🌍',
    category: 'mastery',
    rarity: 'epic',
  },
  {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Survive with 50+ interactions total',
    insight: 'Quantity of interactions builds extensive relationship networks.',
    icon: '⏱️',
    category: 'mastery',
    rarity: 'rare',
  },

  // ===== EXPLORATION ACHIEVEMENTS =====
  {
    id: 'friendly_world',
    name: 'Friend to Friends',
    description: 'Survive in the Friendly Society scenario',
    insight: 'Among cooperators, trust flows naturally. The baseline.',
    icon: '🌻',
    category: 'exploration',
    rarity: 'common',
  },
  {
    id: 'mixed_world',
    name: 'Adaptive Survivor',
    description: 'Survive in the Mixed Society scenario',
    insight: 'The real world is mixed. Identifying trustworthy partners is key.',
    icon: '🎭',
    category: 'exploration',
    rarity: 'uncommon',
  },
  {
    id: 'hostile_world',
    name: 'Into the Fire',
    description: 'Play in the Hostile World scenario',
    insight: 'Facing hostility head-on teaches what doesn\'t work.',
    icon: '🔥',
    category: 'exploration',
    rarity: 'common',
  },
  {
    id: 'experimenter',
    name: 'Experimenter',
    description: 'Play 5 total games',
    insight: 'Each game is a learning opportunity. Experimentation yields wisdom.',
    icon: '🔬',
    category: 'exploration',
    rarity: 'common',
  },
  {
    id: 'scientist',
    name: 'Scientist',
    description: 'Play 20 total games',
    insight: 'You\'re running your own trust dynamics research program.',
    icon: '🧪',
    category: 'exploration',
    rarity: 'rare',
  },
  {
    id: 'first_death',
    name: 'Learning Experience',
    description: 'Die for the first time',
    insight: 'Death teaches what survival cannot. Now you know the stakes.',
    icon: '💀',
    category: 'exploration',
    rarity: 'common',
    hidden: true,
  },
];

// ============================================================================
// Achievement Lookup
// ============================================================================

export const ACHIEVEMENT_MAP = new Map<string, Achievement>(
  ACHIEVEMENTS.map(a => [a.id, a])
);

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENT_MAP.get(id);
}

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

export function getVisibleAchievements(unlockedIds: Set<string>): Achievement[] {
  return ACHIEVEMENTS.filter(a => !a.hidden || unlockedIds.has(a.id));
}

// ============================================================================
// Rarity Colors
// ============================================================================

export const RARITY_COLORS: Record<AchievementRarity, { bg: string; border: string; text: string }> = {
  common: { bg: 'bg-gray-700/50', border: 'border-gray-500', text: 'text-gray-300' },
  uncommon: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400' },
  rare: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400' },
  epic: { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400' },
  legendary: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400' },
};

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  survival: '🛡️ Survival',
  cooperation: '🤝 Cooperation',
  strategy: '♟️ Strategy',
  social: '👥 Social',
  mastery: '🏆 Mastery',
  exploration: '🔍 Exploration',
};
