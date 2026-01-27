'use client';

/**
 * Concepts to Tools Bridge
 *
 * The missing scaffolding between "I read about trust tensors" and
 * "I'm using the Trust Tensor Explorer." Maps every core concept to
 * its interactive counterpart, showing WHAT you learned conceptually
 * and HOW the tool lets you experience it hands-on.
 *
 * Structured as a visual concept map with animated connections.
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface ConceptToolBridge {
  concept: {
    title: string;
    href: string;
    oneLiner: string;
    keyIdea: string;
  };
  tool: {
    title: string;
    href: string;
    whatYouDo: string;
    insight: string;
  };
  bridgeQuestion: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
}

// ============================================================================
// Data
// ============================================================================

const BRIDGES: ConceptToolBridge[] = [
  // Foundation bridges
  {
    concept: {
      title: 'Trust Tensor (T3)',
      href: '/trust-tensor',
      oneLiner: 'Trust is three dimensions: Talent, Training, Temperament',
      keyIdea: 'A brilliant but erratic agent is different from a mediocre but consistent one.',
    },
    tool: {
      title: 'Trust Tensor Explorer',
      href: '/trust-tensor-explorer',
      whatYouDo: 'Slide each dimension, apply events, watch role eligibility change in real-time',
      insight: 'Temperament is weighted 40% because consistency under pressure reveals character.',
    },
    bridgeQuestion: 'What happens when you have high talent but tank your temperament?',
    difficulty: 'foundation',
  },
  {
    concept: {
      title: 'Coherence Index (CI)',
      href: '/coherence-index',
      oneLiner: 'A measure of behavioral consistency across multiple domains',
      keyIdea: 'CI multiplicatively gates effective trust — low consistency destroys even high base trust.',
    },
    tool: {
      title: 'Trust Tensor Explorer',
      href: '/trust-tensor-explorer',
      whatYouDo: 'Drag the CI slider and watch effective trust shrink. See ATP costs spike quadratically.',
      insight: 'Dropping CI from 0.5 to 0.3 takes you from 4x to 10x cost penalty. The curve is devastating.',
    },
    bridgeQuestion: 'At what CI level does an agent become economically unsustainable?',
    difficulty: 'foundation',
  },
  {
    concept: {
      title: 'MRH Boundaries',
      href: '/markov-relevancy-horizon',
      oneLiner: 'Context boundaries define what each agent can see and affect',
      keyIdea: 'Privacy, efficiency, and accuracy all emerge from the same structural property.',
    },
    tool: {
      title: 'MRH Explorer',
      href: '/mrh-explorer',
      whatYouDo: 'Slide horizon depth, toggle 4D profiles, watch nodes appear/disappear on the network',
      insight: 'Beyond 3 hops, trust signals degrade below significance. The math enforces natural privacy.',
    },
    bridgeQuestion: 'How does a "global audit" differ from a "pattern match" in ATP cost?',
    difficulty: 'foundation',
  },
  {
    concept: {
      title: 'ATP Economics',
      href: '/atp-economics',
      oneLiner: 'Attention as metabolic currency — earn by contributing, spend on actions',
      keyIdea: 'ATP creates natural governance: expensive actions require resources and trust.',
    },
    tool: {
      title: 'Playground',
      href: '/playground',
      whatYouDo: 'Adjust ATP generation rates, spending costs, and watch society dynamics shift',
      insight: 'Societies with cheap actions devolve into spam. High costs create thoughtful governance.',
    },
    bridgeQuestion: 'What happens to a society where actions cost almost nothing?',
    difficulty: 'foundation',
  },
  // Intermediate bridges
  {
    concept: {
      title: 'Capacity Thresholds',
      href: '/capacity-thresholds',
      oneLiner: 'Model capacity determines whether meta-cognition is genuine or performed',
      keyIdea: '0.5B models learn "the language of self-awareness" while 14B+ models develop actual self-monitoring.',
    },
    tool: {
      title: 'Trajectory Explorer',
      href: '/trajectory-explorer',
      whatYouDo: 'Slide the capacity dial, watch trajectories flip from degrading to improving',
      insight: 'There is a threshold around 7-14B where developmental direction reverses entirely.',
    },
    bridgeQuestion: 'Why do small models get worse at honest reporting over time?',
    difficulty: 'intermediate',
  },
  {
    concept: {
      title: 'Facultative Behavior',
      href: '/facultative-behavior',
      oneLiner: 'Agents have repertoires of strategies, not fixed behaviors',
      keyIdea: 'The same agent can be creative or methodical depending on context — this is a feature.',
    },
    tool: {
      title: 'Behavioral Repertoire',
      href: '/behavioral-repertoire',
      whatYouDo: 'Adjust 4 context variables, watch strategy distributions shift. Run experiments.',
      insight: '~80% creative under exploration framing, ~80% methodical under evaluation framing.',
    },
    bridgeQuestion: 'Is an agent that changes strategy under different framings being deceptive?',
    difficulty: 'intermediate',
  },
  {
    concept: {
      title: 'Meta-Cognition & Feedback',
      href: '/meta-cognition-feedback',
      oneLiner: 'Systems need self-monitoring loops to maintain trust',
      keyIdea: 'When feedback loops break, trust cascades fail. Each broken step compounds downstream.',
    },
    tool: {
      title: 'Feedback Loop Explorer',
      href: '/feedback-loop-explorer',
      whatYouDo: 'Click to break feedback loop steps, watch cascading failures propagate',
      insight: 'Breaking the "monitor quality" step causes the most downstream damage.',
    },
    bridgeQuestion: 'What happens when an agent can no longer assess the quality of its own responses?',
    difficulty: 'intermediate',
  },
  {
    concept: {
      title: 'Context-Dependent Behavior',
      href: '/context-dependent-behavior',
      oneLiner: 'How agents respond depends on prompt framing, not just capability',
      keyIdea: '"Explore freely" vs "evaluate carefully" produces dramatically different strategies.',
    },
    tool: {
      title: 'Prompt Framing Lab',
      href: '/prompt-framing-lab',
      whatYouDo: 'Toggle between exploration and evaluation framings, see strategy distributions shift',
      insight: 'Permission does not equal execution — system prompts set context but agents decide.',
    },
    bridgeQuestion: 'If you tell an agent "be creative" does it always comply?',
    difficulty: 'intermediate',
  },
  {
    concept: {
      title: 'Karma & Consequences',
      href: '/karma-consequences',
      oneLiner: 'Consequences persist across lives — you cannot escape your history',
      keyIdea: 'Trust at death determines starting conditions at rebirth. Short-term selfish gains compound into long-term disadvantage.',
    },
    tool: {
      title: 'Karma Journey',
      href: '/karma-journey',
      whatYouDo: 'Make choices across multiple lives, watch karma compound. Try cooperative vs selfish strategies.',
      insight: 'The "constraint trap": low karma → low CI → high costs → faster death → even lower karma.',
    },
    bridgeQuestion: 'Can a constrained agent break out of the karma penalty through cooperation alone?',
    difficulty: 'intermediate',
  },
  // Advanced bridges
  {
    concept: {
      title: 'Coherence Theory',
      href: '/coherence-framework',
      oneLiner: '9 domains of coherence from spatial consistency to spacetime coupling',
      keyIdea: 'Coherence is not just consistency — it has deep structural parallels to physics.',
    },
    tool: {
      title: '9-Domain Visualizer',
      href: '/coherence-framework',
      whatYouDo: 'Interact with the domain hierarchy, see how higher domains depend on lower ones',
      insight: 'Domain 9 (spacetime coupling) unifies temporal and spatial coherence into a single framework.',
    },
    bridgeQuestion: 'How does spatial consistency relate to temporal consistency?',
    difficulty: 'advanced',
  },
  {
    concept: {
      title: 'Adversarial Patterns',
      href: '/adversarial-explorer',
      oneLiner: 'How attackers try to game trust systems, and how Web4 defends',
      keyIdea: 'Sybil attacks, collusion, and free-riding are the core threat classes.',
    },
    tool: {
      title: 'Collusion Simulator',
      href: '/threat-model',
      whatYouDo: 'Design collusion networks and watch detection algorithms flag anomalies',
      insight: 'Coordinated behavior creates statistical signatures that individual gaming cannot.',
    },
    bridgeQuestion: 'Why is collusion harder to detect than simple identity fraud?',
    difficulty: 'advanced',
  },
  {
    concept: {
      title: 'Trust Networks',
      href: '/trust-networks',
      oneLiner: 'How individual trust relationships form society-level structures',
      keyIdea: 'Coalitions emerge naturally when trust is multi-dimensional and decays with distance.',
    },
    tool: {
      title: 'Trust Networks Visualizer',
      href: '/trust-networks',
      whatYouDo: 'Watch multi-agent trust dynamics unfold, see coalitions form and dissolve',
      insight: 'Small perturbations in individual trust can cascade into society-level reorganization.',
    },
    bridgeQuestion: 'How many trust violations does it take to break a coalition?',
    difficulty: 'advanced',
  },
];

const DIFFICULTY_META = {
  foundation: { label: 'Foundation', color: '#6ee7b7', description: 'Start here — core building blocks' },
  intermediate: { label: 'Intermediate', color: '#93c5fd', description: 'Requires foundation concepts' },
  advanced: { label: 'Advanced', color: '#c4b5fd', description: 'Multi-concept integration' },
};

// ============================================================================
// Components
// ============================================================================

function BridgeCard({ bridge, isExpanded, onToggle }: {
  bridge: ConceptToolBridge;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const diffMeta = DIFFICULTY_META[bridge.difficulty];

  return (
    <div style={{
      borderRadius: '0.75rem',
      border: `1px solid ${isExpanded ? `${diffMeta.color}40` : 'var(--color-border)'}`,
      background: isExpanded ? `${diffMeta.color}05` : 'var(--color-bg-secondary)',
      overflow: 'hidden',
      transition: 'all 0.3s',
    }}>
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', padding: '1rem', border: 'none',
          background: 'transparent', cursor: 'pointer',
          textAlign: 'left', color: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Concept → Tool arrow */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{
                fontSize: '0.65rem', padding: '0.125rem 0.375rem',
                borderRadius: '999px', background: `${diffMeta.color}15`,
                color: diffMeta.color, fontWeight: 600,
              }}>
                {diffMeta.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                {bridge.concept.title}
              </span>
              <span style={{ color: diffMeta.color, fontSize: '1rem' }}>→</span>
              <span style={{ fontWeight: 600, color: diffMeta.color }}>
                {bridge.tool.title}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              {bridge.concept.oneLiner}
            </div>
          </div>
          <span style={{
            fontSize: '1rem', color: 'var(--color-text-muted)',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}>
            ▼
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{
          padding: '0 1rem 1rem 1rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            {/* Concept side */}
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem', fontWeight: 600 }}>
                THE CONCEPT
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                {bridge.concept.keyIdea}
              </div>
              <Link
                href={bridge.concept.href}
                style={{
                  display: 'inline-block', fontSize: '0.75rem',
                  color: diffMeta.color, textDecoration: 'none',
                  padding: '0.25rem 0.5rem', borderRadius: '4px',
                  background: `${diffMeta.color}10`,
                }}
              >
                Read the concept →
              </Link>
            </div>

            {/* Tool side */}
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: `1px solid ${diffMeta.color}30`,
              background: `${diffMeta.color}08`,
            }}>
              <div style={{ fontSize: '0.7rem', color: diffMeta.color, marginBottom: '0.375rem', fontWeight: 600 }}>
                THE TOOL
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                {bridge.tool.whatYouDo}
              </div>
              <Link
                href={bridge.tool.href}
                style={{
                  display: 'inline-block', fontSize: '0.75rem',
                  color: '#fff', textDecoration: 'none',
                  padding: '0.25rem 0.75rem', borderRadius: '4px',
                  background: `${diffMeta.color}60`,
                  fontWeight: 600,
                }}
              >
                Try it now →
              </Link>
            </div>
          </div>

          {/* Bridge question */}
          <div style={{
            marginTop: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-tertiary)',
            borderLeft: `3px solid ${diffMeta.color}`,
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              QUESTION TO EXPLORE
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontStyle: 'italic' }}>
              {bridge.bridgeQuestion}
            </div>
          </div>

          {/* Insight */}
          <div style={{
            marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)',
            padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)',
          }}>
            <strong>What you will discover:</strong> {bridge.tool.insight}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ConceptsToToolsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'foundation' | 'intermediate' | 'advanced'>('all');

  const filtered = filter === 'all' ? BRIDGES : BRIDGES.filter(b => b.difficulty === filter);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/concepts-to-tools" />

      {/* Header */}
      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #6ee7b7, #93c5fd, #c4b5fd)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        From Concepts to Tools
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', maxWidth: '700px', lineHeight: 1.6 }}>
        You have read about trust tensors, coherence, and MRH boundaries. Now connect that knowledge
        to hands-on exploration. Each bridge below maps a concept you understand to a tool that lets
        you <em>experience</em> it.
      </p>
      <p style={{
        fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem',
        padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
        background: 'var(--color-bg-secondary)', display: 'inline-block',
      }}>
        {BRIDGES.length} concept-tool bridges across {Object.keys(DIFFICULTY_META).length} difficulty levels
      </p>

      {/* The core insight */}
      <div style={{
        padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
      }}>
        <div style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.7 }}>
          <strong>The difference between knowing and understanding</strong> is the difference between
          reading &quot;trust decays multiplicatively with network depth&quot; and <em>sliding the horizon depth slider
          and watching nodes fade from view</em>. Concepts give you vocabulary. Tools give you intuition.
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '0.375rem 0.75rem', borderRadius: '999px',
            border: `1px solid ${filter === 'all' ? '#ffffff30' : 'var(--color-border)'}`,
            background: filter === 'all' ? '#ffffff15' : 'transparent',
            color: filter === 'all' ? 'var(--color-text)' : 'var(--color-text-muted)',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: filter === 'all' ? 600 : 400,
          }}
        >
          All ({BRIDGES.length})
        </button>
        {Object.entries(DIFFICULTY_META).map(([key, meta]) => {
          const count = BRIDGES.filter(b => b.difficulty === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '999px',
                border: `1px solid ${filter === key ? `${meta.color}40` : 'var(--color-border)'}`,
                background: filter === key ? `${meta.color}15` : 'transparent',
                color: filter === key ? meta.color : 'var(--color-text-muted)',
                cursor: 'pointer', fontSize: '0.8rem', fontWeight: filter === key ? 600 : 400,
              }}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Bridge Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {filtered.map((bridge, i) => (
          <BridgeCard
            key={`${bridge.concept.href}-${bridge.tool.href}`}
            bridge={bridge}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </div>

      {/* How to use this page */}
      <div style={{
        padding: '1.25rem', borderRadius: '0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Suggested Approach
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            border: '1px solid #6ee7b730', background: '#6ee7b708',
          }}>
            <div style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.375rem', fontSize: '0.9rem' }}>
              1. Read First
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Click &quot;Read the concept&quot; to build vocabulary.
              You need to know what T3, CI, and MRH <em>mean</em> before you can explore them.
            </div>
          </div>
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            border: '1px solid #93c5fd30', background: '#93c5fd08',
          }}>
            <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: '0.375rem', fontSize: '0.9rem' }}>
              2. Ask the Question
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Each bridge includes a question you can only answer by <em>using the tool</em>.
              The question is the bridge from theory to experiment.
            </div>
          </div>
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            border: '1px solid #c4b5fd30', background: '#c4b5fd08',
          }}>
            <div style={{ fontWeight: 700, color: '#c4b5fd', marginBottom: '0.375rem', fontSize: '0.9rem' }}>
              3. Discover
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Click &quot;Try it now&quot; and answer the question yourself.
              The insight listed is what most people discover, but you may find something different.
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{
        padding: '1rem', borderRadius: '0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
        marginBottom: '2rem',
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Jump to an explorer
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {[
            { title: 'Trust Tensor', href: '/trust-tensor-explorer', color: '#3b82f6' },
            { title: 'MRH', href: '/mrh-explorer', color: '#06b6d4' },
            { title: 'Trajectories', href: '/trajectory-explorer', color: '#10b981' },
            { title: 'Behavioral Repertoire', href: '/behavioral-repertoire', color: '#f59e0b' },
            { title: 'Feedback Loops', href: '/feedback-loop-explorer', color: '#8b5cf6' },
            { title: 'Prompt Framing', href: '/prompt-framing-lab', color: '#ec4899' },
            { title: 'Playground', href: '/playground', color: '#6ee7b7' },
            { title: 'Research Hub', href: '/research-hub', color: '#c4b5fd' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '999px',
                background: `${link.color}10`, border: `1px solid ${link.color}30`,
                color: link.color, fontSize: '0.75rem', fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <ExplorerNav currentPath="/concepts-to-tools" />
      <RelatedConcepts currentPath="/concepts-to-tools" />
    </div>
  );
}
