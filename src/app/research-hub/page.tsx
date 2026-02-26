'use client';

/**
 * Research Participation Hub
 *
 * Central landing page for all interactive exploration tools.
 * Organized by learning path: understand → explore → participate → experiment.
 * Each tool card shows what you'll learn, prerequisites, and complexity level.
 */

import { useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import { trackPageVisit } from '@/lib/exploration';

// ============================================================================
// Types
// ============================================================================

interface ToolCard {
  title: string;
  href: string;
  emoji: string;
  description: string;
  learns: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  category: 'understand' | 'explore' | 'participate' | 'experiment';
  isNew?: boolean;
}

// ============================================================================
// Tool Catalog
// ============================================================================

const TOOLS: ToolCard[] = [
  // Understand
  {
    title: 'Your First Simulation',
    href: '/first-simulation',
    emoji: '🚀',
    description: '5-minute guided walkthrough: watch an agent live, die, and learn in Web4. No setup required.',
    learns: ['Trust dynamics in action', 'Karma/rebirth', 'Cross-life learning', 'ATP economics'],
    complexity: 'beginner',
    category: 'understand',
    isNew: true,
  },
  {
    title: 'First Contact',
    href: '/first-contact',
    emoji: '👋',
    description: '10-minute interactive introduction to Web4 trust concepts. Start here.',
    learns: ['What Web4 is', 'Why trust matters', 'Core vocabulary'],
    complexity: 'beginner',
    category: 'understand',
  },
  {
    title: 'AI Guide Chat',
    href: '/act-explorer',
    emoji: '💬',
    description: 'Ask questions in natural language and get explanations of any concept.',
    learns: ['Any concept on demand', 'Follow-up questions', 'Guided exploration'],
    complexity: 'beginner',
    category: 'understand',
  },
  {
    title: 'Concepts to Tools',
    href: '/concepts-to-tools',
    emoji: '🔗',
    description: 'Bridge from reading about concepts to using interactive tools. Maps theory to experiment.',
    learns: ['Concept-tool mapping', 'Guided questions', 'Learning transitions'],
    complexity: 'beginner',
    category: 'understand',
    isNew: true,
  },
  // Explore
  {
    title: 'Trust Tensor Explorer',
    href: '/trust-tensor-explorer',
    emoji: '🔮',
    description: 'Manipulate the 3 dimensions of trust and see how Coherence Index modulates everything.',
    learns: ['How T3 works', 'CI modulation', 'ATP costs', 'Rebirth/karma'],
    complexity: 'intermediate',
    category: 'explore',
    isNew: true,
  },
  {
    title: 'MRH Explorer',
    href: '/mrh-explorer',
    emoji: '🌐',
    description: 'Visualize context boundaries — what agents can see and how trust decays with distance.',
    learns: ['Horizon depth', '4D profiles', 'Trust decay', 'ATP cost scaling'],
    complexity: 'intermediate',
    category: 'explore',
    isNew: true,
  },
  {
    title: 'Trajectory Explorer',
    href: '/trajectory-explorer',
    emoji: '📈',
    description: 'See how model capacity shapes developmental trajectories. Compare 0.5B vs 14B outcomes.',
    learns: ['Capacity effects', 'Trajectory shapes', 'Threshold discovery'],
    complexity: 'intermediate',
    category: 'explore',
  },
  {
    title: 'Behavioral Repertoire',
    href: '/behavioral-repertoire',
    emoji: '🎭',
    description: 'Adjust context variables and see how strategy distributions shift.',
    learns: ['Context-dependent behavior', 'Facultative strategies', 'Framing effects'],
    complexity: 'intermediate',
    category: 'explore',
  },
  {
    title: 'Feedback Loop Explorer',
    href: '/feedback-loop-explorer',
    emoji: '🔄',
    description: 'Break and fix feedback loops to understand how meta-cognition sustains trust.',
    learns: ['Feedback loop anatomy', 'Cascade failures', 'Recovery patterns'],
    complexity: 'advanced',
    category: 'explore',
  },
  {
    title: 'Karma Journey',
    href: '/karma-journey',
    emoji: '🔄',
    description: 'Live multiple lives, make choices, watch karma compound. Experience how trust is your legacy.',
    learns: ['Karma mechanics', 'Trust compounding', 'Consequence patterns', 'Multi-life dynamics'],
    complexity: 'intermediate',
    category: 'explore',
    isNew: true,
  },
  {
    title: 'Society Simulator',
    href: '/society-simulator',
    emoji: '🌐',
    description: 'Watch agents with different strategies form trust networks, build coalitions, and self-organize. The core 4-Life experience.',
    learns: ['Coalition formation', 'Defector isolation', 'Cooperation emergence', 'Trust network dynamics', 'Game theory in practice'],
    complexity: 'intermediate',
    category: 'explore',
    isNew: true,
  },
  {
    title: 'Coherence Visualizer',
    href: '/coherence-framework',
    emoji: '🧬',
    description: 'Interactive 9-domain coherence framework from spatial to spacetime coupling.',
    learns: ['9 coherence domains', 'Domain interactions', 'Emergence patterns'],
    complexity: 'advanced',
    category: 'explore',
  },
  // Participate
  {
    title: 'Simulation Sandbox',
    href: '/simulation-sandbox',
    emoji: '🔬',
    description: 'Full-control client-side simulation with live charts, multi-run comparison, and export.',
    learns: ['Parameter exploration', 'Multi-run comparison', 'Trust/ATP/CI dynamics', 'Export results'],
    complexity: 'intermediate',
    category: 'participate',
    isNew: true,
  },
  {
    title: 'Playground',
    href: '/playground',
    emoji: '🎮',
    description: 'Adjust simulation parameters and watch trust dynamics play out.',
    learns: ['Parameter sensitivity', 'Emergent behavior', 'System dynamics'],
    complexity: 'beginner',
    category: 'participate',
  },
  {
    title: 'Lab Console',
    href: '/lab-console',
    emoji: '🧪',
    description: 'Run full simulations with custom configurations.',
    learns: ['Simulation design', 'Result interpretation', 'Pattern recognition'],
    complexity: 'intermediate',
    category: 'participate',
  },
  {
    title: 'Compare',
    href: '/compare',
    emoji: '⚖️',
    description: 'Side-by-side comparison of different simulation configurations.',
    learns: ['Comparative analysis', 'Parameter impact', 'Trade-off discovery'],
    complexity: 'intermediate',
    category: 'participate',
  },
  {
    title: 'Narratives',
    href: '/narratives',
    emoji: '📖',
    description: 'Read generated stories from simulation runs — trust dynamics as human narrative.',
    learns: ['Trust through stories', 'Event significance', 'Emergence recognition'],
    complexity: 'beginner',
    category: 'participate',
  },
  // Experiment
  {
    title: 'Adversarial Analysis',
    href: '/adversarial-explorer',
    emoji: '⚔️',
    description: 'Explore attack patterns and see how Web4 defenses respond.',
    learns: ['Sybil attacks', 'Collusion detection', 'Defense mechanisms'],
    complexity: 'advanced',
    category: 'experiment',
  },
  {
    title: 'Collusion Simulator',
    href: '/threat-model',
    emoji: '🕵️',
    description: 'Interactive collusion detection with network visualization.',
    learns: ['Collusion patterns', 'Detection algorithms', 'Network forensics'],
    complexity: 'advanced',
    category: 'experiment',
  },
  {
    title: 'Trust Networks',
    href: '/trust-networks',
    emoji: '🕸️',
    description: 'Multi-agent trust dynamics with coalition formation.',
    learns: ['Network effects', 'Coalition dynamics', 'Emergent governance'],
    complexity: 'advanced',
    category: 'experiment',
  },
];

const CATEGORIES = {
  understand: { label: 'Understand', color: '#6ee7b7', description: 'Build foundational understanding' },
  explore: { label: 'Explore', color: '#93c5fd', description: 'Discover how systems work through interaction' },
  participate: { label: 'Participate', color: '#c4b5fd', description: 'Run simulations and shape outcomes' },
  experiment: { label: 'Experiment', color: '#fde68a', description: 'Push boundaries and test limits' },
};

const COMPLEXITY_COLORS = {
  beginner: '#6ee7b7',
  intermediate: '#93c5fd',
  advanced: '#fca5a5',
};

// ============================================================================
// Main Page
// ============================================================================

export default function ResearchHubPage() {
  useEffect(() => { trackPageVisit('research-hub'); }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/research-hub" />

      {/* Header */}
      <h1 style={{
        fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #6ee7b7, #93c5fd, #c4b5fd, #fde68a)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Research Participation Hub
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem', maxWidth: '700px', lineHeight: 1.6 }}>
        Interactive tools for understanding, exploring, and participating in Web4 trust-native societies.
        Each tool lets you learn by doing &mdash; participation creates understanding.
      </p>
      <p style={{
        fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2rem',
        padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
        background: 'var(--color-bg-secondary)', display: 'inline-block',
      }}>
        {TOOLS.length} interactive tools across {Object.keys(CATEGORIES).length} learning stages
      </p>

      {/* Journey progression */}
      <div style={{
        display: 'flex', gap: '0.25rem', marginBottom: '2rem', alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        {Object.entries(CATEGORIES).map(([key, cat], i) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <a href={`#${key}`} style={{
              padding: '0.375rem 0.75rem', borderRadius: '999px',
              background: `${cat.color}15`, border: `1px solid ${cat.color}30`,
              color: cat.color, fontSize: '0.8rem', fontWeight: 600,
              textDecoration: 'none', transition: 'background 0.2s',
            }}>
              {cat.label} ({TOOLS.filter(t => t.category === key).length})
            </a>
            {i < Object.keys(CATEGORIES).length - 1 && (
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* Tool sections */}
      {Object.entries(CATEGORIES).map(([key, cat]) => {
        const categoryTools = TOOLS.filter(t => t.category === key);
        return (
          <div key={key} id={key} style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: cat.color }}>{cat.label}</h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{cat.description}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.75rem' }}>
              {categoryTools.map(tool => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{
                    padding: '1rem', borderRadius: '0.75rem',
                    background: 'var(--color-bg-secondary)',
                    border: `1px solid ${tool.isNew ? `${cat.color}40` : 'var(--color-border)'}`,
                    textDecoration: 'none', color: 'inherit',
                    transition: 'border-color 0.2s, transform 0.2s',
                    display: 'block',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{tool.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>
                      {tool.title}
                    </span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.375rem' }}>
                      {tool.isNew && (
                        <span style={{
                          fontSize: '0.6rem', padding: '0.125rem 0.375rem',
                          borderRadius: '999px', background: '#6ee7b720',
                          color: '#6ee7b7', fontWeight: 700,
                        }}>
                          NEW
                        </span>
                      )}
                      <span style={{
                        fontSize: '0.6rem', padding: '0.125rem 0.375rem',
                        borderRadius: '999px',
                        background: `${COMPLEXITY_COLORS[tool.complexity]}15`,
                        color: COMPLEXITY_COLORS[tool.complexity],
                        fontWeight: 600,
                      }}>
                        {tool.complexity}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.8rem', color: 'var(--color-text-secondary)',
                    marginBottom: '0.5rem', lineHeight: 1.5,
                  }}>
                    {tool.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {tool.learns.map(learn => (
                      <span key={learn} style={{
                        fontSize: '0.65rem', padding: '0.125rem 0.375rem',
                        borderRadius: '4px', background: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-muted)',
                      }}>
                        {learn}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {/* Learning paths */}
      <div style={{
        padding: '1.5rem', borderRadius: '0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Suggested Learning Paths</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #6ee7b730', background: '#6ee7b708' }}>
            <div style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.25rem' }}>
              The Trust Journey
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Your First Simulation → First Contact → Trust Tensor Explorer → MRH Explorer → Playground
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Core path for understanding how trust works in Web4
            </div>
          </div>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #93c5fd30', background: '#93c5fd08' }}>
            <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: '0.25rem' }}>
              The AI Development Path
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Trajectory Explorer → Behavioral Repertoire → Feedback Loop Explorer → Coherence Visualizer
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              How AI agents develop, learn, and maintain coherence
            </div>
          </div>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #c4b5fd30', background: '#c4b5fd08' }}>
            <div style={{ fontWeight: 700, color: '#c4b5fd', marginBottom: '0.25rem' }}>
              The Security Path
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Trust Networks → Adversarial Analysis → Collusion Simulator → Challenge Set
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              How Web4 resists attacks and maintains integrity
            </div>
          </div>
          <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fde68a30', background: '#fde68a08' }}>
            <div style={{ fontWeight: 700, color: '#fde68a', marginBottom: '0.25rem' }}>
              The Quick Overview
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Your First Simulation → AI Guide Chat → Narratives
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              Fastest way to understand what&apos;s happening without technical depth
            </div>
          </div>
        </div>
      </div>

      <RelatedConcepts currentPath="/research-hub" />
    </div>
  );
}
