'use client';

import { useState, useEffect } from 'react';
import { loadExploration } from '@/lib/exploration';

/**
 * ExplorationProgress — Minimal progress bar showing site exploration.
 *
 * Appears under the navbar once a visitor has explored 2+ pages.
 * Shows progress through the core beginner path (11 key pages).
 * Dismissible, stays dismissed for the session.
 */

const CORE_PAGES = [
  'why-web4',
  'first-contact',
  'lct-explainer',
  'atp-economics',
  'trust-tensor',
  'coherence-index',
  'aliveness',
  'karma-journey',
  'society-simulator',
  'playground',
  'day-in-web4',
];

export default function ExplorationProgress() {
  const [visited, setVisited] = useState(0);
  const [total] = useState(CORE_PAGES.length);
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const profile = loadExploration();
    if (!profile) return;

    // Count how many core pages have been visited
    const count = CORE_PAGES.filter(slug =>
      profile.pagesVisited.includes(slug) || profile.pagesVisited.includes(slug.replace(/-/g, ''))
    ).length;
    setVisited(count);

    // Check session dismissal
    try {
      if (sessionStorage.getItem('exploration-progress-dismissed')) {
        setDismissed(true);
      }
    } catch { /* ok */ }
  }, []);

  // Don't show until hydrated, or if < 2 pages visited, or if all done, or if dismissed
  if (!hydrated || visited < 2 || visited >= total || dismissed) {
    return null;
  }

  const pct = Math.round((visited / total) * 100);

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.375rem 0',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          {visited}/{total} core concepts explored
        </span>
        <div
          style={{
            flex: 1,
            height: '3px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            maxWidth: '200px',
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #22c55e, #14b8a6)',
              borderRadius: '2px',
              transition: 'width 0.3s',
            }}
          />
        </div>
        <button
          onClick={() => {
            setDismissed(true);
            try { sessionStorage.setItem('exploration-progress-dismissed', '1'); } catch { /* ok */ }
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '0 0.25rem',
            fontSize: '0.7rem',
            opacity: 0.5,
          }}
          aria-label="Dismiss progress bar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
