'use client';

/**
 * Featured Moment Component
 *
 * Session #43: Displays the most interesting moment detected across
 * all simulations on the homepage. Makes Web4 societies immediately
 * tangible to visitors.
 *
 * Philosophy: Don't make humans hunt for interesting data.
 * Bring the interesting stuff to them.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  detectMoments,
  rankMoments,
  SIMULATION_SOURCES,
} from '@/lib/moments';
import type { Moment, MomentCategory } from '@/lib/moments/types';
import { CATEGORY_INFO } from '@/lib/moments/types';

// Gradient colors for each category (darker variants for cards)
const CATEGORY_GRADIENTS: Record<MomentCategory, { from: string; to: string; border: string; accent: string }> = {
  emergence: { from: 'rgba(126, 34, 206, 0.3)', to: 'var(--color-dark-surface)', border: 'rgba(168, 85, 247, 0.5)', accent: '#a855f7' },
  karma: { from: 'rgba(234, 179, 8, 0.2)', to: 'var(--color-dark-surface)', border: 'rgba(234, 179, 8, 0.4)', accent: '#eab308' },
  learning: { from: 'rgba(34, 197, 94, 0.2)', to: 'var(--color-dark-surface)', border: 'rgba(34, 197, 94, 0.4)', accent: '#22c55e' },
  crisis: { from: 'rgba(239, 68, 68, 0.2)', to: 'var(--color-dark-surface)', border: 'rgba(239, 68, 68, 0.4)', accent: '#ef4444' },
  trust: { from: 'rgba(30, 58, 138, 0.3)', to: 'var(--color-dark-surface)', border: 'rgba(59, 130, 246, 0.5)', accent: '#60a5fa' },
  atp: { from: 'rgba(245, 158, 11, 0.2)', to: 'var(--color-dark-surface)', border: 'rgba(245, 158, 11, 0.4)', accent: '#f59e0b' },
};

interface FeaturedMomentProps {
  /**
   * Optional: specify which category to feature.
   * If not provided, shows the highest-ranked moment overall.
   */
  category?: MomentCategory;

  /**
   * Show a loading state while data loads
   */
  showSkeleton?: boolean;

  /**
   * Enable auto-rotation through top moments
   */
  rotate?: boolean;

  /**
   * Rotation interval in milliseconds (default: 12000 = 12 seconds)
   */
  rotationInterval?: number;

  /**
   * Number of top moments to rotate through (default: 5)
   */
  rotationCount?: number;
}

export default function FeaturedMoment({
  category,
  showSkeleton = true,
  rotate = false,
  rotationInterval = 12000,
  rotationCount = 5,
}: FeaturedMomentProps) {
  const [allMoments, setAllMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Load all simulation data and detect moments
  useEffect(() => {
    async function loadMoments() {
      try {
        const loadedMoments: Moment[] = [];

        for (const source of SIMULATION_SOURCES) {
          try {
            const response = await fetch(`/${source.filename}`);
            if (response.ok) {
              const data = await response.json();
              const detected = detectMoments(data, source);
              loadedMoments.push(...detected);
            }
          } catch {
            // Skip sources that fail to load
            console.warn(`Failed to load ${source.filename}`);
          }
        }

        setAllMoments(loadedMoments);
      } catch (err) {
        setError('Failed to load simulation data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMoments();
  }, []);

  // Get ranked moments for rotation
  const rankedMoments = useMemo(() => {
    if (allMoments.length === 0) return [];

    // Filter by category if specified
    let candidates = category
      ? allMoments.filter(m => m.category === category)
      : allMoments;

    // Rank and return top N
    const ranked = rankMoments(candidates);
    return ranked.slice(0, rotationCount);
  }, [allMoments, category, rotationCount]);

  // Rotation effect
  useEffect(() => {
    if (!rotate || rankedMoments.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % rankedMoments.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [rotate, rankedMoments.length, rotationInterval, isPaused]);

  const featuredMoment = rankedMoments[currentIndex] || null;

  // Loading skeleton
  if (loading && showSkeleton) {
    return (
      <section className="card" style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, var(--color-dark-surface) 100%)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        <div style={{ opacity: 0.5 }}>
          <p className="eyebrow">Loading...</p>
          <h2 style={{ fontSize: '1.25rem' }}>Discovering Moments</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Analyzing simulation data for interesting events...
          </p>
        </div>
      </section>
    );
  }

  // Error state - fall back to static content
  if (error || !featuredMoment) {
    return (
      <section className="card" style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, var(--color-dark-surface) 100%)',
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }}>
        <p className="eyebrow" style={{ color: '#60a5fa' }}>From Simulations</p>
        <h2 style={{ fontSize: '1.25rem' }}>Trust Compounds Across Lives</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Agents that cooperate and build trust survive longer, earn more resources,
          and start each new life stronger. The track record follows them forever.
        </p>
        <Link
          href="/karma-journey"
          style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#60a5fa',
            fontWeight: 500
          }}
        >
          Try it yourself →
        </Link>
      </section>
    );
  }

  // Get styling for this moment's category
  const gradient = CATEGORY_GRADIENTS[featuredMoment.category];
  const categoryInfo = CATEGORY_INFO[featuredMoment.category];

  return (
    <section
      className="card"
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        borderColor: gradient.border,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={() => rotate && setIsPaused(true)}
      onMouseLeave={() => rotate && setIsPaused(false)}
    >
      {/* Category Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{categoryInfo.emoji}</span>
        <p className="eyebrow" style={{ color: gradient.accent, margin: 0 }}>
          Featured Moment: {categoryInfo.label}
        </p>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
        {featuredMoment.title}
      </h2>

      {/* Narrative */}
      <p style={{
        color: 'var(--color-text-secondary)',
        marginBottom: '0.75rem',
        lineHeight: 1.6
      }}>
        {featuredMoment.narrative}
      </p>

      {/* Significance */}
      <p style={{
        fontSize: '0.875rem',
        fontStyle: 'italic',
        color: 'var(--color-text-muted)',
        marginBottom: '1rem',
        paddingLeft: '0.75rem',
        borderLeft: `2px solid ${gradient.accent}`
      }}>
        {featuredMoment.significance}
      </p>

      {/* Meta info and actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Source info */}
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          background: 'rgba(255,255,255,0.05)',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.25rem'
        }}>
          {featuredMoment.simulationLabel} · Life {featuredMoment.lifeNumber} · Turn {featuredMoment.tick}
        </span>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            href="/moments"
            style={{
              fontSize: '0.875rem',
              color: gradient.accent,
              fontWeight: 500
            }}
          >
            See All Moments →
          </Link>
          {featuredMoment.narrativeId && (
            <Link
              href={`/narratives?id=${featuredMoment.narrativeId}`}
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
              }}
            >
              Full Story
            </Link>
          )}
        </div>
      </div>

      {/* Carousel Navigation (if rotating) */}
      {rotate && rankedMoments.length > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {rankedMoments.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '0.25rem',
                background: index === currentIndex
                  ? gradient.accent
                  : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label={`Go to moment ${index + 1}`}
            />
          ))}
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            marginLeft: '0.5rem',
          }}>
            {isPaused ? '(paused)' : ''}
          </span>
        </div>
      )}
    </section>
  );
}

/**
 * Compact variant for sidebar or smaller displays
 */
export function FeaturedMomentCompact({ category }: { category?: MomentCategory }) {
  const [moment, setMoment] = useState<Moment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const loadedMoments: Moment[] = [];

        // Just load the first few sources for compact mode
        const quickSources = SIMULATION_SOURCES.slice(0, 3);

        for (const source of quickSources) {
          try {
            const response = await fetch(`/${source.filename}`);
            if (response.ok) {
              const data = await response.json();
              const detected = detectMoments(data, source);
              loadedMoments.push(...detected);
            }
          } catch {
            // Skip
          }
        }

        const candidates = category
          ? loadedMoments.filter(m => m.category === category)
          : loadedMoments;

        const ranked = rankMoments(candidates);
        setMoment(ranked[0] || null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [category]);

  if (loading) {
    return (
      <div className="card" style={{ padding: '1rem', opacity: 0.5 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Loading moment...
        </p>
      </div>
    );
  }

  if (!moment) return null;

  const categoryInfo = CATEGORY_INFO[moment.category];
  const gradient = CATEGORY_GRADIENTS[moment.category];

  return (
    <Link href="/moments" style={{ textDecoration: 'none' }}>
      <div className="card" style={{
        padding: '1rem',
        borderLeft: `3px solid ${gradient.accent}`,
        cursor: 'pointer',
        transition: 'transform 0.15s ease',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
          <span>{categoryInfo.emoji}</span>
          <span style={{ fontSize: '0.75rem', color: gradient.accent, fontWeight: 500 }}>
            {categoryInfo.label}
          </span>
        </div>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          margin: 0
        }}>
          {moment.title}
        </p>
      </div>
    </Link>
  );
}
