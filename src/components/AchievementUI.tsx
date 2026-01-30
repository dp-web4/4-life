'use client';

/**
 * Achievement UI Components
 *
 * Provides:
 * 1. AchievementToast - Notification when achievement is unlocked
 * 2. AchievementBadge - Small display of an achievement
 * 3. AchievementCard - Full achievement card with details
 * 4. AchievementGallery - Full gallery view of all achievements
 * 5. AchievementSummary - Quick stats overview
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Achievement,
  AchievementCategory,
  AchievementRarity,
  ACHIEVEMENTS,
  RARITY_COLORS,
  CATEGORY_LABELS,
  getVisibleAchievements,
  getAchievementsByCategory,
} from '@/lib/achievements/achievements';
import {
  AchievementTracker,
  getAchievementTracker,
} from '@/lib/achievements/achievement_tracker';

// ============================================================================
// Achievement Toast - Shows when unlocking
// ============================================================================

interface AchievementToastProps {
  achievements: Achievement[];
  onDismiss: () => void;
}

export function AchievementToast({ achievements, onDismiss }: AchievementToastProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Initial animation
    setIsAnimating(true);
    const animTimer = setTimeout(() => setIsAnimating(false), 500);

    // Auto-advance for multiple achievements
    const advanceTimer = setTimeout(() => {
      if (currentIndex < achievements.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        onDismiss();
      }
    }, 4000);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(advanceTimer);
    };
  }, [currentIndex, achievements.length, onDismiss]);

  if (achievements.length === 0) return null;

  const achievement = achievements[currentIndex];
  const colors = RARITY_COLORS[achievement.rarity];

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div
        className={`${colors.bg} border-2 ${colors.border} rounded-xl p-4 shadow-2xl max-w-sm
          ${isAnimating ? 'scale-110' : 'scale-100'} transition-transform duration-300`}
      >
        <div className="flex items-start gap-3">
          <div className="text-4xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wide mb-1">
              🏆 Achievement Unlocked!
            </div>
            <div className={`font-bold text-lg ${colors.text}`}>
              {achievement.name}
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {achievement.description}
            </div>
            <div className="text-xs text-gray-400 mt-2 italic">
              "{achievement.insight}"
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-300 text-xl"
          >
            ×
          </button>
        </div>
        {achievements.length > 1 && (
          <div className="flex justify-center mt-3 gap-1">
            {achievements.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Achievement Badge - Small inline display
// ============================================================================

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function AchievementBadge({
  achievement,
  unlocked,
  size = 'md',
  onClick,
}: AchievementBadgeProps) {
  const colors = RARITY_COLORS[achievement.rarity];
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        transition-all border-2
        ${unlocked
          ? `${colors.bg} ${colors.border} hover:scale-110`
          : 'bg-gray-800/50 border-gray-700 opacity-50 grayscale'
        }
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
      title={unlocked ? achievement.name : '???'}
    >
      {unlocked ? achievement.icon : '?'}
    </button>
  );
}

// ============================================================================
// Achievement Card - Full card with details
// ============================================================================

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: number;
}

export function AchievementCard({
  achievement,
  unlocked,
  unlockedAt,
}: AchievementCardProps) {
  const colors = RARITY_COLORS[achievement.rarity];

  return (
    <div
      className={`
        border-2 rounded-lg p-4 transition-all
        ${unlocked
          ? `${colors.bg} ${colors.border}`
          : 'bg-gray-800/30 border-gray-700 opacity-60'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`text-3xl ${!unlocked && 'grayscale opacity-50'}`}>
          {unlocked || !achievement.hidden ? achievement.icon : '🔒'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className={`font-bold ${unlocked ? colors.text : 'text-gray-500'}`}>
              {unlocked || !achievement.hidden ? achievement.name : '???'}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded capitalize ${colors.bg} ${colors.text}`}>
              {achievement.rarity}
            </span>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            {unlocked || !achievement.hidden ? achievement.description : 'Hidden achievement'}
          </div>
          {unlocked && (
            <>
              <div className="text-xs text-gray-500 mt-2 italic">
                "{achievement.insight}"
              </div>
              {unlockedAt && (
                <div className="text-xs text-gray-600 mt-1">
                  Unlocked {new Date(unlockedAt).toLocaleDateString()}
                </div>
              )}
            </>
          )}
        </div>
        {unlocked && (
          <div className="text-green-400 text-lg">✓</div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Achievement Summary - Quick stats bar
// ============================================================================

interface AchievementSummaryProps {
  tracker: AchievementTracker;
  onClick?: () => void;
}

export function AchievementSummary({ tracker, onClick }: AchievementSummaryProps) {
  const unlockedCount = tracker.getUnlockedIds().size;
  const totalCount = ACHIEVEMENTS.length;
  const percent = tracker.getCompletionPercent();
  const stats = tracker.getStats();

  return (
    <button
      onClick={onClick}
      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-800 transition-all flex items-center gap-4"
    >
      <div className="text-2xl">🏆</div>
      <div className="text-left">
        <div className="text-sm font-bold text-white">
          {unlockedCount} / {totalCount} Achievements
        </div>
        <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="text-right text-xs text-gray-400 hidden sm:block">
        <div>Games: {stats.totalGamesPlayed}</div>
        <div>Survived: {stats.totalSurvived}</div>
      </div>
    </button>
  );
}

// ============================================================================
// Achievement Gallery - Full page view
// ============================================================================

interface AchievementGalleryProps {
  tracker: AchievementTracker;
  onClose: () => void;
}

export function AchievementGallery({ tracker, onClose }: AchievementGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const unlockedIds = tracker.getUnlockedIds();
  const unlocked = tracker.getUnlockedAchievements();
  const stats = tracker.getStats();

  const categories: (AchievementCategory | 'all')[] = [
    'all', 'survival', 'cooperation', 'strategy', 'social', 'mastery', 'exploration'
  ];

  const visibleAchievements = getVisibleAchievements(unlockedIds);
  const filteredAchievements = selectedCategory === 'all'
    ? visibleAchievements
    : visibleAchievements.filter(a => a.category === selectedCategory);

  const unlockedMap = new Map(unlocked.map(u => [u.achievementId, u]));

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              🏆 Achievements
            </h2>
            <p className="text-gray-400 mt-1">
              {unlockedIds.size} of {ACHIEVEMENTS.length} unlocked ({tracker.getCompletionPercent().toFixed(0)}%)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl p-2"
          >
            ✕
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalGamesPlayed}</div>
            <div className="text-sm text-gray-400">Games Played</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.totalSurvived}</div>
            <div className="text-sm text-gray-400">Survived</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.longestSurvivalStreak}</div>
            <div className="text-sm text-gray-400">Best Streak</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{stats.highestATP}</div>
            <div className="text-sm text-gray-400">Highest ATP</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => {
            const count = cat === 'all'
              ? visibleAchievements.length
              : visibleAchievements.filter(a => a.category === cat).length;
            const unlockedInCat = cat === 'all'
              ? unlockedIds.size
              : visibleAchievements.filter(a => a.category === cat && unlockedIds.has(a.id)).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? '🎯 All' : CATEGORY_LABELS[cat as AchievementCategory]}
                <span className="ml-2 text-xs opacity-70">
                  {unlockedInCat}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Achievement Grid */}
        <div className="grid gap-4">
          {filteredAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={unlockedIds.has(achievement.id)}
              unlockedAt={unlockedMap.get(achievement.id)?.unlockedAt}
            />
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all achievements and stats? This cannot be undone.')) {
                tracker.resetAll();
                onClose();
              }
            }}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Recently Unlocked Section - For game over screen
// ============================================================================

interface RecentlyUnlockedProps {
  achievements: Achievement[];
}

export function RecentlyUnlocked({ achievements }: RecentlyUnlockedProps) {
  if (achievements.length === 0) return null;

  return (
    <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4 mb-6">
      <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
        🏆 Achievements Unlocked!
      </h4>
      <div className="space-y-2">
        {achievements.map(achievement => {
          const colors = RARITY_COLORS[achievement.rarity];
          return (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 ${colors.bg} border ${colors.border} rounded-lg p-3`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className={`font-bold ${colors.text}`}>{achievement.name}</div>
                <div className="text-xs text-gray-400">{achievement.description}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded capitalize ${colors.text}`}>
                {achievement.rarity}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
