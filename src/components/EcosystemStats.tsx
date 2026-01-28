'use client';

/**
 * Ecosystem Stats Component
 *
 * Session #43: Shows aggregate statistics across all Web4 simulations.
 * Gives humans an instant "state of the ecosystem" view.
 *
 * Philosophy: Humans need summary statistics to grasp system health
 * before diving into details.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  detectMoments,
  calculateStats,
  SIMULATION_SOURCES,
} from '@/lib/moments';
import type { Moment, MomentStats, MomentCategory } from '@/lib/moments/types';
import { CATEGORY_INFO } from '@/lib/moments/types';

interface AggregateStats {
  totalSimulations: number;
  totalLives: number;
  totalMoments: number;
  avgTrust: number;
  trustRange: { min: number; max: number };
  totalATPConsumed: number;
  consciousnessThresholdsCrossed: number;
  karmaEvents: number;
  crisisEvents: number;
  emergenceEvents: number;
  momentsByCategory: MomentStats['byCategory'];
}

interface EcosystemStatsProps {
  /** Show full stats or compact version */
  variant?: 'full' | 'compact';
  /** Show category breakdown */
  showCategoryBreakdown?: boolean;
}

export default function EcosystemStats({
  variant = 'full',
  showCategoryBreakdown = true,
}: EcosystemStatsProps) {
  const [stats, setStats] = useState<AggregateStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        let totalLives = 0;
        let trustSum = 0;
        let trustCount = 0;
        let minTrust = 1;
        let maxTrust = 0;
        let totalATP = 0;
        const allMoments: Moment[] = [];

        for (const source of SIMULATION_SOURCES) {
          try {
            const response = await fetch(`/${source.filename}`);
            if (!response.ok) continue;
            const data = await response.json();

            // Extract lives
            let lives: any[] = [];
            if (source.id === 'multi-life-policy') {
              lives = data?.multi_life?.lives || [];
            } else if (source.id === 'trust-network') {
              // Skip network data for life stats
              continue;
            } else if (source.id === 'one-life-policy') {
              const ls = data?.life_summary;
              if (ls) {
                lives = [{
                  t3_history: [ls.initial_trust || 0.5, ls.final_trust || 0.5],
                  atp_history: [ls.initial_atp || 100, ls.final_atp || 0],
                }];
              }
            } else {
              lives = data?.lives || [];
            }

            totalLives += lives.length;

            // Aggregate trust stats
            for (const life of lives) {
              const t3 = life.t3_history || life.trust_history || [];
              for (const t of t3) {
                trustSum += t;
                trustCount++;
                minTrust = Math.min(minTrust, t);
                maxTrust = Math.max(maxTrust, t);
              }

              const atp = life.atp_history || [];
              const atpStart = atp[0] || 0;
              const atpEnd = atp[atp.length - 1] || 0;
              totalATP += Math.max(0, atpStart - atpEnd);
            }

            // Detect moments
            const moments = detectMoments(data, source);
            allMoments.push(...moments);
          } catch {
            // Skip failed loads
          }
        }

        const momentStats = calculateStats(allMoments);

        setStats({
          totalSimulations: SIMULATION_SOURCES.length,
          totalLives,
          totalMoments: momentStats.total,
          avgTrust: trustCount > 0 ? trustSum / trustCount : 0,
          trustRange: { min: minTrust, max: maxTrust },
          totalATPConsumed: Math.round(totalATP),
          consciousnessThresholdsCrossed: momentStats.byCategory.emergence,
          karmaEvents: momentStats.byCategory.karma,
          crisisEvents: momentStats.byCategory.crisis,
          emergenceEvents: momentStats.byCategory.emergence,
          momentsByCategory: momentStats.byCategory,
        });
      } catch (err) {
        console.error('Failed to load ecosystem stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="card" style={{
        padding: variant === 'compact' ? '1rem' : '1.5rem',
        opacity: 0.5,
      }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Loading ecosystem stats...
        </p>
      </div>
    );
  }

  if (!stats) return null;

  if (variant === 'compact') {
    return (
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
          textAlign: 'center',
        }}>
          <StatItem label="Lives" value={stats.totalLives.toString()} />
          <StatItem label="Avg Trust" value={stats.avgTrust.toFixed(2)} />
          <StatItem label="Moments" value={stats.totalMoments.toString()} />
          <StatItem
            label="Emergence"
            value={stats.emergenceEvents.toString()}
            highlight
          />
        </div>
      </div>
    );
  }

  return (
    <section className="card" style={{ padding: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          Ecosystem Overview
        </h3>
        <Link
          href="/moments"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          View All Moments
        </Link>
      </div>

      {/* Main stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}>
        <StatBox
          label="Total Lives"
          value={stats.totalLives.toString()}
          subtext={`across ${stats.totalSimulations} simulations`}
        />
        <StatBox
          label="Average Trust"
          value={stats.avgTrust.toFixed(3)}
          subtext={`range: ${stats.trustRange.min.toFixed(2)} - ${stats.trustRange.max.toFixed(2)}`}
          highlight={stats.avgTrust >= 0.5}
        />
        <StatBox
          label="ATP Consumed"
          value={formatNumber(stats.totalATPConsumed)}
          subtext="total attention spent"
        />
        <StatBox
          label="Moments"
          value={stats.totalMoments.toString()}
          subtext="significant events"
        />
      </div>

      {/* Category breakdown */}
      {showCategoryBreakdown && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          {(Object.entries(stats.momentsByCategory) as [MomentCategory, number][])
            .filter(([, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => (
              <Link
                key={category}
                href={`/moments?category=${category}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                }}
              >
                <span>{CATEGORY_INFO[category].emoji}</span>
                <span>{count}</span>
              </Link>
            ))
          }
        </div>
      )}
    </section>
  );
}

function StatItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        color: highlight ? '#a855f7' : 'var(--color-text-primary)',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.7rem',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
      }}>
        {label}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  subtext,
  highlight,
}: {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '0.75rem',
      background: highlight ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.02)',
      borderRadius: '0.5rem',
      border: highlight ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid transparent',
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 600,
        color: highlight ? '#22c55e' : 'var(--color-text-primary)',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        marginTop: '0.25rem',
      }}>
        {label}
      </div>
      {subtext && (
        <div style={{
          fontSize: '0.65rem',
          color: 'var(--color-text-muted)',
          marginTop: '0.125rem',
        }}>
          {subtext}
        </div>
      )}
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
