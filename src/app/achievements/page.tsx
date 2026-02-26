'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';
import {
  Achievement,
  AchievementCategory,
  ACHIEVEMENTS,
  RARITY_COLORS,
  CATEGORY_LABELS,
  getVisibleAchievements,
} from '@/lib/achievements/achievements';
import { trackPageVisit } from '@/lib/exploration';
import {
  AchievementTracker,
  getAchievementTracker,
} from '@/lib/achievements/achievement_tracker';

type FilterCategory = AchievementCategory | 'all';

export default function AchievementsPage() {
  const [tracker, setTracker] = useState<AchievementTracker | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [showInsights, setShowInsights] = useState(true);

  useEffect(() => {
    trackPageVisit('achievements');
    setTracker(getAchievementTracker());
  }, []);

  const unlockedIds = tracker?.getUnlockedIds() ?? new Set<string>();
  const stats = tracker?.getStats();
  const completionPercent = tracker?.getCompletionPercent() ?? 0;

  const visibleAchievements = getVisibleAchievements(unlockedIds);
  const filteredAchievements = selectedCategory === 'all'
    ? visibleAchievements
    : visibleAchievements.filter(a => a.category === selectedCategory);

  const unlockedList = tracker?.getUnlockedAchievements() ?? [];
  const unlockedMap = new Map(unlockedList.map(u => [u.achievementId, u]));

  const categories: FilterCategory[] = [
    'all', 'survival', 'cooperation', 'strategy', 'social', 'mastery', 'exploration',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumbs currentPath="/achievements" />

      {/* Hero */}
      <section className="mb-12">
        <div className="text-sm uppercase tracking-wide text-amber-400 mb-4">
          Society Simulator
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Achievements
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          33 achievements that teach trust dynamics through gameplay.
          Each one reveals a lesson about how cooperation, reputation, and
          consequences work in Web4 societies.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Earn achievements by playing as an agent in the{' '}
          <Link href="/society-simulator" className="text-sky-400 hover:underline">
            Society Simulator
          </Link>
          . Your progress is saved automatically.
        </p>
      </section>

      {/* Progress Overview */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Your Progress
            </h2>
            <span className="text-amber-400 font-bold text-lg">
              {unlockedIds.size} / {ACHIEVEMENTS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
              style={{ width: `${completionPercent}%` }}
            />
          </div>

          {unlockedIds.size === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">
                You haven&apos;t unlocked any achievements yet.
              </p>
              <Link
                href="/society-simulator"
                className="inline-block px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Play as Agent to Start Earning →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-white">{stats?.totalGamesPlayed ?? 0}</div>
                <div className="text-xs text-gray-400">Games Played</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-400">{stats?.totalSurvived ?? 0}</div>
                <div className="text-xs text-gray-400">Survived</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-blue-400">{stats?.longestSurvivalStreak ?? 0}</div>
                <div className="text-xs text-gray-400">Best Streak</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-amber-400">{stats?.highestATP ?? 0}</div>
                <div className="text-xs text-gray-400">Highest Energy</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What Achievements Teach */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">
          What Achievements Teach
        </h2>
        <p className="text-gray-400 mb-6">
          Each achievement is designed to reveal something about how trust-native
          societies work. The categories map to different aspects of Web4 dynamics:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.entries(CATEGORY_LABELS) as [AchievementCategory, string][]).map(([cat, label]) => {
            const count = ACHIEVEMENTS.filter(a => a.category === cat).length;
            const unlockedInCat = ACHIEVEMENTS.filter(a => a.category === cat && unlockedIds.has(a.id)).length;
            const catDescriptions: Record<AchievementCategory, string> = {
              survival: 'Staying alive requires sustainable behavior',
              cooperation: 'Trust grows through consistent teamwork',
              strategy: 'Different approaches reveal trade-offs',
              social: 'Relationships and reputation compound',
              mastery: 'Advanced challenges test deep understanding',
              exploration: 'Trying new scenarios builds adaptability',
            };
            return (
              <div
                key={cat}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
              >
                <div className="text-lg mb-1">{label}</div>
                <div className="text-xs text-gray-400 mb-2">{catDescriptions[cat]}</div>
                <div className="text-xs text-gray-500">
                  {unlockedInCat}/{count} unlocked
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-100">All Achievements</h2>
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={showInsights}
              onChange={(e) => setShowInsights(e.target.checked)}
              className="rounded"
            />
            Show insights
          </label>
        </div>

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
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : CATEGORY_LABELS[cat as AchievementCategory]}
                <span className="ml-2 text-xs opacity-70">
                  {unlockedInCat}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Achievement Grid */}
        <div className="grid gap-3">
          {filteredAchievements.map(achievement => {
            const isUnlocked = unlockedIds.has(achievement.id);
            const colors = RARITY_COLORS[achievement.rarity];
            const unlockedAt = unlockedMap.get(achievement.id)?.unlockedAt;

            return (
              <div
                key={achievement.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  isUnlocked
                    ? `${colors.bg} ${colors.border}`
                    : 'bg-gray-800/30 border-gray-700 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${!isUnlocked && 'grayscale opacity-50'}`}>
                    {isUnlocked || !achievement.hidden ? achievement.icon : '🔒'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold ${isUnlocked ? colors.text : 'text-gray-500'}`}>
                        {isUnlocked || !achievement.hidden ? achievement.name : '???'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded capitalize ${colors.bg} ${colors.text}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {isUnlocked || !achievement.hidden ? achievement.description : 'Hidden achievement — unlock to reveal'}
                    </div>
                    {showInsights && (isUnlocked || !achievement.hidden) && (
                      <div className="text-xs text-gray-500 mt-2 italic">
                        Lesson: &ldquo;{achievement.insight}&rdquo;
                      </div>
                    )}
                    {isUnlocked && unlockedAt && (
                      <div className="text-xs text-gray-600 mt-1">
                        Unlocked {new Date(unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  {isUnlocked && (
                    <div className="text-green-400 text-lg flex-shrink-0">✓</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-12 text-center">
        <div className="bg-gradient-to-br from-amber-950/30 to-orange-900/20 border border-amber-800/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-amber-400 mb-3">
            Ready to Earn Some?
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Play as an agent in the Society Simulator. Make trust decisions, form
            coalitions, and discover what works — and what doesn&apos;t — in a
            trust-native society.
          </p>
          <Link
            href="/society-simulator"
            className="inline-block px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Launch Society Simulator →
          </Link>
        </div>
      </section>

      <ExplorerNav currentPath="/achievements" />
      <RelatedConcepts currentPath="/achievements" />
    </div>
  );
}
