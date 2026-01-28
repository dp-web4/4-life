'use client';

/**
 * ExplorerNav - Cross-linking navigation between interactive tools
 *
 * Shows prev/next explorer in a learning path, plus "also explore" suggestions.
 * Appears at the bottom of each explorer page to guide users through
 * a coherent exploration journey.
 */

import Link from 'next/link';

// ============================================================================
// Explorer Registry
// ============================================================================

interface ExplorerInfo {
  href: string;
  title: string;
  shortTitle: string;
  color: string;
  stage: 'understand' | 'explore' | 'participate' | 'experiment';
}

const EXPLORERS: ExplorerInfo[] = [
  // Understand
  { href: '/first-contact', title: 'First Contact', shortTitle: 'First Contact', color: '#6ee7b7', stage: 'understand' },
  { href: '/act-explorer', title: 'ACT Chat', shortTitle: 'ACT Chat', color: '#6ee7b7', stage: 'understand' },
  { href: '/concepts-to-tools', title: 'Concepts to Tools', shortTitle: 'Concepts→Tools', color: '#6ee7b7', stage: 'understand' },
  // Explore
  { href: '/trust-tensor-explorer', title: 'Trust Tensor Explorer', shortTitle: 'Trust Tensor', color: '#93c5fd', stage: 'explore' },
  { href: '/mrh-explorer', title: 'MRH Explorer', shortTitle: 'MRH', color: '#93c5fd', stage: 'explore' },
  { href: '/trajectory-explorer', title: 'Trajectory Explorer', shortTitle: 'Trajectories', color: '#93c5fd', stage: 'explore' },
  { href: '/behavioral-repertoire', title: 'Behavioral Repertoire', shortTitle: 'Repertoire', color: '#93c5fd', stage: 'explore' },
  { href: '/feedback-loop-explorer', title: 'Feedback Loop Explorer', shortTitle: 'Feedback Loops', color: '#93c5fd', stage: 'explore' },
  { href: '/prompt-framing-lab', title: 'Prompt Framing Lab', shortTitle: 'Framing Lab', color: '#93c5fd', stage: 'explore' },
  { href: '/coherence-framework', title: 'Coherence Visualizer', shortTitle: 'Coherence', color: '#93c5fd', stage: 'explore' },
  { href: '/karma-journey', title: 'Karma Journey', shortTitle: 'Karma Journey', color: '#93c5fd', stage: 'explore' },
  { href: '/society-simulator', title: 'Society Simulator', shortTitle: 'Society Sim', color: '#93c5fd', stage: 'explore' },
  // Participate
  { href: '/playground', title: 'Playground', shortTitle: 'Playground', color: '#c4b5fd', stage: 'participate' },
  { href: '/lab-console', title: 'Lab Console', shortTitle: 'Lab Console', color: '#c4b5fd', stage: 'participate' },
  { href: '/compare', title: 'Compare', shortTitle: 'Compare', color: '#c4b5fd', stage: 'participate' },
  { href: '/narratives', title: 'Narratives', shortTitle: 'Narratives', color: '#c4b5fd', stage: 'participate' },
  // Experiment
  { href: '/adversarial-explorer', title: 'Adversarial Analysis', shortTitle: 'Adversarial', color: '#fde68a', stage: 'experiment' },
  { href: '/threat-model', title: 'Collusion Simulator', shortTitle: 'Collusion', color: '#fde68a', stage: 'experiment' },
  { href: '/trust-networks', title: 'Trust Networks', shortTitle: 'Networks', color: '#fde68a', stage: 'experiment' },
  { href: '/data-explorer', title: 'Data Explorer', shortTitle: 'Data Explorer', color: '#fde68a', stage: 'experiment' },
  { href: '/moments', title: 'Emergent Moments', shortTitle: 'Moments', color: '#fde68a', stage: 'experiment' },
  { href: '/trust-timeline', title: 'Trust Timeline', shortTitle: 'Timeline', color: '#fde68a', stage: 'experiment' },
  // Meta
  { href: '/explore-guide', title: 'Exploration Guide', shortTitle: 'Guide', color: '#6ee7b7', stage: 'understand' },
];

// Curated "also explore" connections (semantic, not just sequential)
const ALSO_EXPLORE: Record<string, string[]> = {
  '/trust-tensor-explorer': ['/mrh-explorer', '/coherence-framework', '/playground'],
  '/mrh-explorer': ['/trust-tensor-explorer', '/trust-networks', '/playground'],
  '/trajectory-explorer': ['/behavioral-repertoire', '/feedback-loop-explorer', '/concepts-to-tools'],
  '/behavioral-repertoire': ['/prompt-framing-lab', '/trajectory-explorer', '/concepts-to-tools'],
  '/feedback-loop-explorer': ['/trajectory-explorer', '/trust-tensor-explorer', '/coherence-framework'],
  '/prompt-framing-lab': ['/behavioral-repertoire', '/feedback-loop-explorer', '/concepts-to-tools'],
  '/karma-journey': ['/trust-tensor-explorer', '/playground', '/concepts-to-tools'],
  '/playground': ['/lab-console', '/trust-tensor-explorer', '/mrh-explorer'],
  '/lab-console': ['/playground', '/compare', '/narratives'],
  '/compare': ['/lab-console', '/playground', '/narratives'],
  '/narratives': ['/lab-console', '/compare', '/playground'],
  '/coherence-framework': ['/trust-tensor-explorer', '/feedback-loop-explorer', '/trust-networks'],
  '/adversarial-explorer': ['/threat-model', '/trust-networks', '/trust-tensor-explorer'],
  '/threat-model': ['/adversarial-explorer', '/trust-networks', '/coherence-framework'],
  '/trust-networks': ['/mrh-explorer', '/society-simulator', '/adversarial-explorer'],
  '/society-simulator': ['/trust-networks', '/karma-journey', '/trust-tensor-explorer'],
  '/concepts-to-tools': ['/research-hub', '/trust-tensor-explorer', '/mrh-explorer'],
  '/first-contact': ['/concepts-to-tools', '/act-explorer', '/trust-tensor-explorer'],
  '/act-explorer': ['/first-contact', '/concepts-to-tools', '/research-hub'],
  '/data-explorer': ['/narratives', '/lab-console', '/compare'],
  '/explore-guide': ['/first-contact', '/learn', '/research-hub'],
  '/moments': ['/narratives', '/data-explorer', '/trust-timeline'],
  '/trust-timeline': ['/moments', '/data-explorer', '/narratives'],
};

const STAGE_LABELS = {
  understand: 'Understand',
  explore: 'Explore',
  participate: 'Participate',
  experiment: 'Experiment',
};

// ============================================================================
// Component
// ============================================================================

export default function ExplorerNav({ currentPath }: { currentPath: string }) {
  const currentIndex = EXPLORERS.findIndex(e => e.href === currentPath);
  if (currentIndex === -1) return null;

  const current = EXPLORERS[currentIndex];
  const prev = currentIndex > 0 ? EXPLORERS[currentIndex - 1] : null;
  const next = currentIndex < EXPLORERS.length - 1 ? EXPLORERS[currentIndex + 1] : null;

  const alsoExploreHrefs = ALSO_EXPLORE[currentPath] || [];
  const alsoExplore = alsoExploreHrefs
    .map(href => EXPLORERS.find(e => e.href === href))
    .filter((e): e is ExplorerInfo => e !== undefined);

  return (
    <div style={{
      marginTop: '2rem', marginBottom: '1rem',
      padding: '1.25rem', borderRadius: '0.75rem',
      background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
    }}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Interactive Tools
        </div>
        <Link
          href="/research-hub"
          style={{
            fontSize: '0.7rem', color: 'var(--color-text-muted)',
            textDecoration: 'none',
          }}
        >
          View all tools →
        </Link>
      </div>

      {/* Prev / Next */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
        marginBottom: '1rem',
      }}>
        {prev ? (
          <Link
            href={prev.href}
            style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: `1px solid ${prev.color}20`,
              background: `${prev.color}05`,
              textDecoration: 'none', color: 'inherit',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              ← Previous
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: prev.color }}>
              {prev.shortTitle}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
              {STAGE_LABELS[prev.stage]}
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: `1px solid ${next.color}20`,
              background: `${next.color}05`,
              textDecoration: 'none', color: 'inherit',
              textAlign: 'right',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              Next →
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: next.color }}>
              {next.shortTitle}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
              {STAGE_LABELS[next.stage]}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Also Explore */}
      {alsoExplore.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
            Also explore
          </div>
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {alsoExplore.map(explorer => (
              <Link
                key={explorer.href}
                href={explorer.href}
                style={{
                  padding: '0.375rem 0.625rem', borderRadius: '999px',
                  background: `${explorer.color}10`, border: `1px solid ${explorer.color}20`,
                  color: explorer.color, fontSize: '0.7rem', fontWeight: 500,
                  textDecoration: 'none', transition: 'background 0.2s',
                }}
              >
                {explorer.shortTitle}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
