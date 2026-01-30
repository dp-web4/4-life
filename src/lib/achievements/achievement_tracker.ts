/**
 * Achievement Tracker
 *
 * Handles:
 * 1. Checking game state against achievement conditions
 * 2. Persisting unlocked achievements to localStorage
 * 3. Tracking lifetime game stats
 * 4. Detecting newly unlocked achievements
 */

import {
  Achievement,
  ACHIEVEMENTS,
  ACHIEVEMENT_MAP,
  UnlockedAchievement,
  GameStats,
} from './achievements';

// ============================================================================
// Storage Keys
// ============================================================================

const STORAGE_KEYS = {
  ACHIEVEMENTS: 'web4_achievements',
  STATS: 'web4_game_stats',
} as const;

// ============================================================================
// Game Context for Achievement Checking
// ============================================================================

export interface GameContext {
  scenario: string;
  survived: boolean;
  finalATP: number;
  cooperationRate: number;
  coalitionSize: number;
  reputation: number;
  totalInteractions: number;
  // Session-specific
  cooperations: number;
  defections: number;
  consecutiveCooperations: number;
  consecutiveDefections: number;
  lowestATP: number;
  firstActionWasDefect: boolean;
  uniquePartnersInteracted: number;
  totalAgentsInSociety: number;
  partnersNeverBetrayed: number;
  partnersBetrayed: number;
}

// ============================================================================
// Achievement Tracker Class
// ============================================================================

export class AchievementTracker {
  private unlockedAchievements: Map<string, UnlockedAchievement>;
  private stats: GameStats;

  constructor() {
    this.unlockedAchievements = this.loadUnlocked();
    this.stats = this.loadStats();
  }

  // ==========================================================================
  // Storage
  // ==========================================================================

  private loadUnlocked(): Map<string, UnlockedAchievement> {
    if (typeof window === 'undefined') {
      return new Map();
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (!data) return new Map();
      const parsed = JSON.parse(data) as UnlockedAchievement[];
      return new Map(parsed.map(a => [a.achievementId, a]));
    } catch {
      return new Map();
    }
  }

  private saveUnlocked(): void {
    if (typeof window === 'undefined') return;
    try {
      const data = Array.from(this.unlockedAchievements.values());
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data));
    } catch {
      console.warn('Failed to save achievements');
    }
  }

  private loadStats(): GameStats {
    if (typeof window === 'undefined') {
      return this.createEmptyStats();
    }
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) return this.createEmptyStats();
      const parsed = JSON.parse(data);
      return {
        ...parsed,
        scenariosCompleted: new Set(parsed.scenariosCompleted || []),
        scenarioStats: new Map(Object.entries(parsed.scenarioStats || {})),
        partnersBetrayed: new Set(parsed.partnersBetrayed || []),
        partnersNeverBetrayed: new Set(parsed.partnersNeverBetrayed || []),
      };
    } catch {
      return this.createEmptyStats();
    }
  }

  private saveStats(): void {
    if (typeof window === 'undefined') return;
    try {
      const serializable = {
        ...this.stats,
        scenariosCompleted: Array.from(this.stats.scenariosCompleted),
        scenarioStats: Object.fromEntries(this.stats.scenarioStats),
        partnersBetrayed: Array.from(this.stats.partnersBetrayed),
        partnersNeverBetrayed: Array.from(this.stats.partnersNeverBetrayed),
      };
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(serializable));
    } catch {
      console.warn('Failed to save stats');
    }
  }

  private createEmptyStats(): GameStats {
    return {
      totalGamesPlayed: 0,
      totalSurvived: 0,
      totalDied: 0,
      totalCooperations: 0,
      totalDefections: 0,
      totalInteractions: 0,
      totalCoalitionsMade: 0,
      highestATP: 0,
      highestCoalitionSize: 0,
      highestCooperationRate: 0,
      longestSurvivalStreak: 0,
      currentSurvivalStreak: 0,
      scenariosCompleted: new Set(),
      scenarioStats: new Map(),
      consecutiveCooperations: 0,
      consecutiveDefections: 0,
      partnersBetrayed: new Set(),
      partnersNeverBetrayed: new Set(),
      perfectTrustMaintained: true,
      neverDefected: true,
      neverCooperated: true,
    };
  }

  // ==========================================================================
  // Public API
  // ==========================================================================

  /**
   * Process end of game and return newly unlocked achievements
   */
  processGameEnd(context: GameContext): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    // Update lifetime stats
    this.updateStats(context);

    // Check all achievements
    for (const achievement of ACHIEVEMENTS) {
      if (this.unlockedAchievements.has(achievement.id)) continue;

      if (this.checkAchievement(achievement.id, context)) {
        const unlocked: UnlockedAchievement = {
          achievementId: achievement.id,
          unlockedAt: Date.now(),
          gameContext: {
            scenario: context.scenario,
            cooperationRate: context.cooperationRate,
            finalATP: context.finalATP,
            coalitionSize: context.coalitionSize,
            survived: context.survived,
            totalInteractions: context.totalInteractions,
          },
        };
        this.unlockedAchievements.set(achievement.id, unlocked);
        newlyUnlocked.push(achievement);
      }
    }

    // Save updated state
    this.saveUnlocked();
    this.saveStats();

    return newlyUnlocked;
  }

  /**
   * Get all unlocked achievements
   */
  getUnlockedAchievements(): UnlockedAchievement[] {
    return Array.from(this.unlockedAchievements.values());
  }

  /**
   * Get unlocked achievement IDs as a Set
   */
  getUnlockedIds(): Set<string> {
    return new Set(this.unlockedAchievements.keys());
  }

  /**
   * Check if a specific achievement is unlocked
   */
  isUnlocked(achievementId: string): boolean {
    return this.unlockedAchievements.has(achievementId);
  }

  /**
   * Get game stats
   */
  getStats(): GameStats {
    return { ...this.stats };
  }

  /**
   * Calculate completion percentage
   */
  getCompletionPercent(): number {
    return (this.unlockedAchievements.size / ACHIEVEMENTS.length) * 100;
  }

  /**
   * Reset all progress (for testing or player choice)
   */
  resetAll(): void {
    this.unlockedAchievements.clear();
    this.stats = this.createEmptyStats();
    this.saveUnlocked();
    this.saveStats();
  }

  // ==========================================================================
  // Stats Update
  // ==========================================================================

  private updateStats(context: GameContext): void {
    this.stats.totalGamesPlayed++;
    this.stats.totalInteractions += context.totalInteractions;
    this.stats.totalCooperations += context.cooperations;
    this.stats.totalDefections += context.defections;

    if (context.survived) {
      this.stats.totalSurvived++;
      this.stats.currentSurvivalStreak++;
      this.stats.longestSurvivalStreak = Math.max(
        this.stats.longestSurvivalStreak,
        this.stats.currentSurvivalStreak
      );
      this.stats.scenariosCompleted.add(context.scenario);
    } else {
      this.stats.totalDied++;
      this.stats.currentSurvivalStreak = 0;
    }

    if (context.coalitionSize >= 2) {
      this.stats.totalCoalitionsMade++;
    }

    this.stats.highestATP = Math.max(this.stats.highestATP, context.finalATP);
    this.stats.highestCoalitionSize = Math.max(
      this.stats.highestCoalitionSize,
      context.coalitionSize
    );
    this.stats.highestCooperationRate = Math.max(
      this.stats.highestCooperationRate,
      context.cooperationRate
    );

    // Update scenario-specific stats
    const scenarioKey = context.scenario;
    const existing = this.stats.scenarioStats.get(scenarioKey) || {
      played: 0,
      survived: 0,
      bestATP: 0,
    };
    existing.played++;
    if (context.survived) existing.survived++;
    existing.bestATP = Math.max(existing.bestATP, context.finalATP);
    this.stats.scenarioStats.set(scenarioKey, existing);
  }

  // ==========================================================================
  // Achievement Condition Checking
  // ==========================================================================

  private checkAchievement(id: string, ctx: GameContext): boolean {
    switch (id) {
      // ===== SURVIVAL =====
      case 'first_survivor':
        return ctx.survived && this.stats.totalSurvived === 1;

      case 'survivor_3':
        return this.stats.totalSurvived >= 3;

      case 'survivor_10':
        return this.stats.totalSurvived >= 10;

      case 'close_call':
        return ctx.survived && ctx.finalATP < 10 && ctx.finalATP > 0;

      case 'thrive':
        return ctx.survived && ctx.finalATP > 150;

      case 'survival_streak_3':
        return this.stats.currentSurvivalStreak >= 3;

      case 'survival_streak_5':
        return this.stats.currentSurvivalStreak >= 5;

      // ===== COOPERATION =====
      case 'team_player':
        return ctx.cooperationRate >= 0.7;

      case 'peacemaker':
        return ctx.survived && ctx.cooperationRate >= 0.9;

      case 'saint':
        return ctx.survived && ctx.defections === 0 && ctx.totalInteractions >= 10;

      case 'mutual_benefit':
        return ctx.consecutiveCooperations >= 5;

      case 'cooperation_streak_10':
        return ctx.consecutiveCooperations >= 10;

      // ===== STRATEGY =====
      case 'betrayer':
        return ctx.defections >= 5;

      case 'pure_defector':
        return ctx.survived && ctx.cooperationRate < 0.5 && ctx.totalInteractions >= 10;

      case 'balanced_approach':
        return ctx.survived && ctx.cooperationRate >= 0.45 && ctx.cooperationRate <= 0.55;

      case 'comeback_kid':
        return ctx.survived && ctx.lowestATP < 20 && ctx.finalATP >= 50;

      case 'first_strike':
        return ctx.survived && ctx.firstActionWasDefect;

      // ===== SOCIAL =====
      case 'coalition_builder':
        return ctx.coalitionSize >= 2;

      case 'coalition_leader':
        return ctx.coalitionSize >= 4;

      case 'social_butterfly':
        return ctx.uniquePartnersInteracted >= ctx.totalAgentsInSociety - 1 && ctx.totalAgentsInSociety > 1;

      case 'loyal_friend':
        return ctx.survived && ctx.partnersBetrayed === 0 && ctx.totalInteractions >= 15;

      case 'high_reputation':
        return ctx.reputation >= 0.8;

      case 'max_reputation':
        return ctx.reputation >= 0.95;

      // ===== MASTERY =====
      case 'hostile_survivor':
        return ctx.survived && ctx.scenario.includes('hostile');

      case 'hostile_thrive':
        return ctx.survived && ctx.scenario.includes('hostile') && ctx.finalATP >= 100;

      case 'perfect_game':
        return ctx.survived && ctx.cooperationRate === 1.0 && ctx.finalATP >= 100;

      case 'all_scenarios':
        return this.stats.scenariosCompleted.size >= 3;

      case 'speed_runner':
        return ctx.survived && ctx.totalInteractions >= 50;

      // ===== EXPLORATION =====
      case 'friendly_world':
        return ctx.survived && ctx.scenario.includes('friendly');

      case 'mixed_world':
        return ctx.survived && ctx.scenario.includes('balanced');

      case 'hostile_world':
        return ctx.scenario.includes('hostile');

      case 'experimenter':
        return this.stats.totalGamesPlayed >= 5;

      case 'scientist':
        return this.stats.totalGamesPlayed >= 20;

      case 'first_death':
        return !ctx.survived && this.stats.totalDied === 1;

      default:
        return false;
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let trackerInstance: AchievementTracker | null = null;

export function getAchievementTracker(): AchievementTracker {
  if (!trackerInstance) {
    trackerInstance = new AchievementTracker();
  }
  return trackerInstance;
}
