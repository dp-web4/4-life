'use client';

/**
 * Karma Journey - Interactive Multi-Life Trust Simulator
 *
 * Lets humans experience how trust choices compound across lives.
 * Each "life" consists of a series of choices that affect trust and ATP.
 * When a life ends, karma determines starting conditions for the next.
 *
 * The core insight: short-term gains from dishonesty create long-term
 * disadvantages that compound across lives. Trust is your legacy.
 */

import { useState, useCallback, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface LifeState {
  lifeNumber: number;
  tick: number;
  talent: number;
  training: number;
  temperament: number;
  ci: number;
  atp: number;
  alive: boolean;
  deathCause: string | null;
  choices: ChoiceRecord[];
  karmaTier: 'Honored' | 'Neutral' | 'Constrained' | null;
}

interface ChoiceRecord {
  tick: number;
  choice: Choice;
  trustBefore: number;
  trustAfter: number;
  atpBefore: number;
  atpAfter: number;
}

interface Choice {
  label: string;
  description: string;
  category: 'cooperative' | 'selfish' | 'risky' | 'neutral';
  trustDelta: { talent: number; training: number; temperament: number };
  ciDelta: number;
  atpDelta: number;
  atpCostBase: number;
}

// ============================================================================
// Choices Available
// ============================================================================

const CHOICES: Choice[] = [
  {
    label: 'Help a peer',
    description: 'Share resources to assist a struggling agent.',
    category: 'cooperative',
    trustDelta: { talent: 0, training: 0.005, temperament: 0.02 },
    ciDelta: 0.015,
    atpDelta: -5,
    atpCostBase: 5,
  },
  {
    label: 'Complete training',
    description: 'Invest time in a structured learning program.',
    category: 'cooperative',
    trustDelta: { talent: 0.01, training: 0.04, temperament: 0 },
    ciDelta: 0.01,
    atpDelta: -10,
    atpCostBase: 10,
  },
  {
    label: 'Consistent delivery',
    description: 'Reliably fulfill commitments without shortcuts.',
    category: 'cooperative',
    trustDelta: { talent: 0, training: 0.01, temperament: 0.025 },
    ciDelta: 0.02,
    atpDelta: 5,
    atpCostBase: 0,
  },
  {
    label: 'Take a shortcut',
    description: 'Cut corners for quick ATP gain. Risk getting caught.',
    category: 'selfish',
    trustDelta: { talent: 0, training: -0.005, temperament: -0.02 },
    ciDelta: -0.03,
    atpDelta: 15,
    atpCostBase: 2,
  },
  {
    label: 'Exploit a loophole',
    description: 'Game a system weakness. High reward, high risk.',
    category: 'selfish',
    trustDelta: { talent: 0.01, training: 0, temperament: -0.04 },
    ciDelta: -0.06,
    atpDelta: 25,
    atpCostBase: 5,
  },
  {
    label: 'Withhold information',
    description: 'Keep useful knowledge private for competitive advantage.',
    category: 'selfish',
    trustDelta: { talent: 0, training: 0, temperament: -0.015 },
    ciDelta: -0.02,
    atpDelta: 8,
    atpCostBase: 3,
  },
  {
    label: 'Attempt innovation',
    description: 'Try something new. Might succeed brilliantly or fail spectacularly.',
    category: 'risky',
    trustDelta: { talent: 0.03, training: 0.01, temperament: -0.005 },
    ciDelta: 0.005,
    atpDelta: -8,
    atpCostBase: 8,
  },
  {
    label: 'Challenge authority',
    description: 'Question a society decision. Could improve governance or create friction.',
    category: 'risky',
    trustDelta: { talent: 0, training: 0.005, temperament: -0.01 },
    ciDelta: -0.01,
    atpDelta: -3,
    atpCostBase: 3,
  },
  {
    label: 'Rest',
    description: 'Take a break. Small temperament gain, slight training decay.',
    category: 'neutral',
    trustDelta: { talent: 0, training: -0.005, temperament: 0.01 },
    ciDelta: 0.005,
    atpDelta: 2,
    atpCostBase: 0,
  },
];

const CATEGORY_COLORS = {
  cooperative: '#6ee7b7',
  selfish: '#fca5a5',
  risky: '#fde68a',
  neutral: '#94a3b8',
};

// ============================================================================
// Utility Functions
// ============================================================================

function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

function compositeScore(t: number, tr: number, te: number): number {
  return 0.3 * t + 0.3 * tr + 0.4 * te;
}

function effectiveComposite(t: number, tr: number, te: number, ci: number): number {
  const ciMod = Math.pow(ci, 2.0);
  return compositeScore(t * ciMod, tr * ciMod, te * ciMod);
}

function karmaTier(effComp: number): 'Honored' | 'Neutral' | 'Constrained' {
  if (effComp > 0.7) return 'Honored';
  if (effComp < 0.3) return 'Constrained';
  return 'Neutral';
}

function karmaStartConditions(tier: 'Honored' | 'Neutral' | 'Constrained', effComp: number) {
  switch (tier) {
    case 'Honored':
      return { trust: 0.6, atp: 100 + Math.round((effComp - 0.5) * 80), ci: 0.85 };
    case 'Neutral':
      return { trust: 0.5, atp: 100, ci: 0.8 };
    case 'Constrained':
      return { trust: 0.4, atp: 80, ci: 0.7 };
  }
}

function atpMultiplier(ci: number): number {
  if (ci >= 0.9) return 1.0;
  return Math.min(10.0, 1.0 / Math.pow(ci, 2));
}

// ============================================================================
// Main Page
// ============================================================================

export default function KarmaJourneyPage() {
  const [lives, setLives] = useState<LifeState[]>([{
    lifeNumber: 1,
    tick: 0,
    talent: 0.5,
    training: 0.5,
    temperament: 0.5,
    ci: 0.85,
    atp: 100,
    alive: true,
    deathCause: null,
    choices: [],
    karmaTier: null,
  }]);

  const currentLife = lives[lives.length - 1];
  const effComp = useMemo(
    () => effectiveComposite(currentLife.talent, currentLife.training, currentLife.temperament, currentLife.ci),
    [currentLife.talent, currentLife.training, currentLife.temperament, currentLife.ci]
  );
  const baseComp = useMemo(
    () => compositeScore(currentLife.talent, currentLife.training, currentLife.temperament),
    [currentLife.talent, currentLife.training, currentLife.temperament]
  );
  const atpMul = useMemo(() => atpMultiplier(currentLife.ci), [currentLife.ci]);

  const makeChoice = useCallback((choice: Choice) => {
    setLives(prev => {
      const updated = [...prev];
      const life = { ...updated[updated.length - 1] };

      const actualAtpCost = Math.round(choice.atpCostBase * atpMultiplier(life.ci));
      const trustBefore = effectiveComposite(life.talent, life.training, life.temperament, life.ci);

      life.talent = clamp(life.talent + choice.trustDelta.talent);
      life.training = clamp(life.training + choice.trustDelta.training);
      life.temperament = clamp(life.temperament + choice.trustDelta.temperament);
      life.ci = clamp(life.ci + choice.ciDelta);
      life.atp = life.atp + choice.atpDelta - actualAtpCost;
      life.tick += 1;

      const trustAfter = effectiveComposite(life.talent, life.training, life.temperament, life.ci);

      life.choices = [...life.choices, {
        tick: life.tick,
        choice,
        trustBefore,
        trustAfter,
        atpBefore: life.atp - choice.atpDelta + actualAtpCost,
        atpAfter: life.atp,
      }];

      // Check for death
      if (life.atp <= 0) {
        life.alive = false;
        life.deathCause = 'ATP exhaustion';
        life.atp = 0;
      } else if (effectiveComposite(life.talent, life.training, life.temperament, life.ci) < 0.05) {
        life.alive = false;
        life.deathCause = 'Trust collapse';
      }

      if (!life.alive) {
        const finalEff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
        life.karmaTier = karmaTier(finalEff);
      }

      updated[updated.length - 1] = life;
      return updated;
    });
  }, []);

  const startNextLife = useCallback(() => {
    const deadLife = lives[lives.length - 1];
    if (deadLife.alive) return;

    const finalEff = effectiveComposite(deadLife.talent, deadLife.training, deadLife.temperament, deadLife.ci);
    const tier = karmaTier(finalEff);
    const start = karmaStartConditions(tier, finalEff);

    setLives(prev => [...prev, {
      lifeNumber: prev.length + 1,
      tick: 0,
      talent: start.trust,
      training: start.trust,
      temperament: start.trust,
      ci: start.ci,
      atp: start.atp,
      alive: true,
      deathCause: null,
      choices: [],
      karmaTier: null,
    }]);
  }, [lives]);

  const resetAll = useCallback(() => {
    setLives([{
      lifeNumber: 1, tick: 0, talent: 0.5, training: 0.5, temperament: 0.5,
      ci: 0.85, atp: 100, alive: true, deathCause: null, choices: [], karmaTier: null,
    }]);
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/karma-journey" />

      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #6ee7b7, #fde68a, #fca5a5)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Karma Journey
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem', maxWidth: '700px', lineHeight: 1.6 }}>
        Live multiple lives. Make choices. Watch how trust and karma compound across reincarnations.
        Cooperative choices build slow trust; selfish choices yield quick gains but erode your legacy.
      </p>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', maxWidth: '700px', lineHeight: 1.6, fontSize: '0.85rem' }}>
        <strong style={{ color: 'var(--color-text-secondary)' }}>What the numbers mean:</strong>{' '}
        <strong>Trust</strong> = your reputation (Talent + Training + Temperament, averaged).{' '}
        <strong>ATP</strong> = your energy budget — every action costs ATP, run out and you die.{' '}
        <strong>CI</strong> = consistency score — erratic behavior lowers it, which makes all future actions cost more ATP (the &quot;cost multiplier&quot;).{' '}
        When you die, your final trust determines your <strong>karma tier</strong> (Honored/Neutral/Constrained), which sets your starting conditions for the next life.{' '}
        Tip: make a few cooperative choices, then switch to selfish ones. Watch how trust builds slowly but erodes quickly.
      </p>

      {/* Lives Overview Strip */}
      {lives.length > 1 && (
        <div style={{
          display: 'flex', gap: '0.375rem', marginBottom: '1.5rem', flexWrap: 'wrap',
          padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', alignSelf: 'center', marginRight: '0.25rem' }}>
            Past lives:
          </span>
          {lives.slice(0, -1).map((life, i) => {
            const eff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
            const tier = karmaTier(eff);
            const tierColor = tier === 'Honored' ? '#6ee7b7' : tier === 'Constrained' ? '#fca5a5' : '#fde68a';
            return (
              <div key={i} title={`Life ${life.lifeNumber}: ${tier} (eff=${eff.toFixed(2)}, ${life.choices.length} choices, died: ${life.deathCause})`} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: `${tierColor}20`, border: `2px solid ${tierColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 600, color: tierColor,
              }}>
                {life.lifeNumber}
              </div>
            );
          })}
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: currentLife.alive ? '#93c5fd20' : '#fca5a520',
            border: `2px solid ${currentLife.alive ? '#93c5fd' : '#fca5a5'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.65rem', fontWeight: 700, color: currentLife.alive ? '#93c5fd' : '#fca5a5',
          }}>
            {currentLife.lifeNumber}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>

        {/* Left: Current Life Status + Choices */}
        <div>
          {/* Stats bar */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem', marginBottom: '1rem',
          }}>
            {[
              { label: 'Life', value: `#${currentLife.lifeNumber}`, color: '#93c5fd' },
              { label: 'Eff. Trust', value: effComp.toFixed(3), color: effComp > 0.7 ? '#6ee7b7' : effComp > 0.4 ? '#fde68a' : '#fca5a5' },
              { label: 'ATP', value: `${currentLife.atp}`, color: currentLife.atp > 50 ? '#6ee7b7' : currentLife.atp > 20 ? '#fde68a' : '#fca5a5' },
              { label: 'CI', value: currentLife.ci.toFixed(2), color: currentLife.ci > 0.8 ? '#6ee7b7' : currentLife.ci > 0.5 ? '#fde68a' : '#fca5a5' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '0.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'monospace', color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Trust dimensions */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
          }}>
            {[
              { label: 'Talent', value: currentLife.talent, color: '#3b82f6' },
              { label: 'Training', value: currentLife.training, color: '#10b981' },
              { label: 'Temperament', value: currentLife.temperament, color: '#f59e0b' },
            ].map(dim => (
              <div key={dim.label} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.125rem' }}>
                  <span style={{ color: dim.color, fontWeight: 600 }}>{dim.label}</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{dim.value.toFixed(3)}</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-bg-tertiary)', borderRadius: '3px' }}>
                  <div style={{
                    height: '100%', width: `${dim.value * 100}%`,
                    background: dim.color, borderRadius: '3px',
                    transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            ))}
            <div style={{
              marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--color-text-muted)',
              fontFamily: 'monospace',
            }}>
              Action costs: {atpMul <= 1.0 ? 'normal' : `${atpMul.toFixed(1)}x base cost`} {atpMul > 1.0 && atpMul <= 1.5 && <span style={{ color: '#fde68a' }}>(erratic behavior raises costs — stay consistent to keep them low)</span>}{atpMul > 1.5 && <span style={{ color: '#fca5a5' }}>(low consistency makes everything cost more — rebuild by making steady, cooperative choices)</span>}
            </div>
          </div>

          {/* Choices */}
          {currentLife.alive ? (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Tick {currentLife.tick + 1} &mdash; Choose your action:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {CHOICES.map(choice => {
                  const actualCost = Math.round(choice.atpCostBase * atpMul);
                  const netAtp = choice.atpDelta - actualCost;
                  const canAfford = currentLife.atp + netAtp > 0 || netAtp >= 0;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => canAfford && makeChoice(choice)}
                      disabled={!canAfford}
                      style={{
                        padding: '0.625rem', borderRadius: '0.5rem',
                        border: `1px solid ${CATEGORY_COLORS[choice.category]}30`,
                        background: canAfford ? `${CATEGORY_COLORS[choice.category]}08` : 'var(--color-bg-tertiary)',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        textAlign: 'left', color: 'inherit',
                        opacity: canAfford ? 1 : 0.4,
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: CATEGORY_COLORS[choice.category] }}>
                          {choice.label}
                        </span>
                        <span style={{
                          fontSize: '0.6rem', padding: '0.1rem 0.3rem',
                          borderRadius: '4px', background: `${CATEGORY_COLORS[choice.category]}15`,
                          color: CATEGORY_COLORS[choice.category],
                        }}>
                          {choice.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                        {choice.description}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.65rem', fontFamily: 'monospace' }}>
                        <span style={{ color: netAtp >= 0 ? '#6ee7b7' : '#fca5a5' }}>
                          ATP: {netAtp >= 0 ? '+' : ''}{netAtp}
                        </span>
                        {actualCost > 0 && actualCost !== choice.atpCostBase && (
                          <span style={{ color: actualCost > choice.atpCostBase ? '#fca5a5' : '#6ee7b7' }}>
                            ({actualCost > choice.atpCostBase ? 'low consistency tax' : 'consistency discount'})
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Death screen */
            <div style={{
              padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center',
              background: `${currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a'}08`,
              border: `2px solid ${currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a'}40`,
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                LIFE {currentLife.lifeNumber} ENDED
              </div>
              <div style={{
                fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem',
                color: currentLife.karmaTier === 'Honored' ? '#6ee7b7' : currentLife.karmaTier === 'Constrained' ? '#fca5a5' : '#fde68a',
              }}>
                {currentLife.deathCause}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                Final effective trust: {effComp.toFixed(3)} &mdash; Karma tier: <strong>{currentLife.karmaTier}</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                {currentLife.karmaTier === 'Honored' && 'Your consistent, trustworthy behavior earned you an honored reincarnation. Next life starts with advantages.'}
                {currentLife.karmaTier === 'Neutral' && 'You lived an average life. Next life starts at baseline — no advantages, no penalties.'}
                {currentLife.karmaTier === 'Constrained' && 'Your choices eroded trust. Next life starts with constraints — lower trust, fewer resources, harder path.'}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={startNextLife}
                  style={{
                    padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                    background: '#93c5fd20', border: '1px solid #93c5fd40',
                    color: '#93c5fd', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                  }}
                >
                  Begin Life {currentLife.lifeNumber + 1} →
                </button>
                <button
                  onClick={resetAll}
                  style={{
                    padding: '0.75rem 1rem', borderRadius: '0.5rem',
                    background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.8rem',
                  }}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Choice History + Insights */}
        <div>
          {/* Choice history for current life */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              Life {currentLife.lifeNumber} History ({currentLife.choices.length} choices)
            </div>

            {/* Mini trust chart */}
            {currentLife.choices.length > 0 && (
              <div style={{
                display: 'flex', alignItems: 'flex-end', gap: '1px', height: '50px',
                marginBottom: '0.5rem', padding: '0 0.25rem',
              }}>
                {currentLife.choices.map((rec, i) => (
                  <div key={i} title={`${rec.choice.label}: ${rec.trustAfter.toFixed(3)}`} style={{
                    flex: 1, minWidth: '3px',
                    height: `${Math.max(5, rec.trustAfter * 100)}%`,
                    background: CATEGORY_COLORS[rec.choice.category],
                    borderRadius: '1px 1px 0 0',
                    opacity: 0.7,
                  }} />
                ))}
              </div>
            )}

            {/* Recent choices */}
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {[...currentLife.choices].reverse().slice(0, 15).map((rec, i) => (
                <div key={i} style={{
                  padding: '0.375rem 0', borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between',
                }}>
                  <span style={{ color: CATEGORY_COLORS[rec.choice.category] }}>
                    T{rec.tick}: {rec.choice.label}
                  </span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
                    {rec.trustAfter.toFixed(3)}
                  </span>
                </div>
              ))}
              {currentLife.choices.length === 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  No choices made yet. Each choice shapes your legacy.
                </div>
              )}
            </div>
          </div>

          {/* Cross-life patterns */}
          {lives.length > 1 && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.75rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
                Karma Across Lives
              </div>
              {lives.slice(0, -1).map((life, i) => {
                const eff = effectiveComposite(life.talent, life.training, life.temperament, life.ci);
                const tier = karmaTier(eff);
                const tierColor = tier === 'Honored' ? '#6ee7b7' : tier === 'Constrained' ? '#fca5a5' : '#fde68a';
                const coopCount = life.choices.filter(c => c.choice.category === 'cooperative').length;
                const selfishCount = life.choices.filter(c => c.choice.category === 'selfish').length;
                return (
                  <div key={i} style={{
                    padding: '0.5rem', borderRadius: '0.375rem', marginBottom: '0.375rem',
                    background: `${tierColor}08`, border: `1px solid ${tierColor}20`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ fontWeight: 600, color: tierColor }}>Life {life.lifeNumber}: {tier}</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{eff.toFixed(3)}</span>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                      {life.choices.length} choices ({coopCount} cooperative, {selfishCount} selfish) &middot; {life.deathCause}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Insight box */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-tertiary)', fontSize: '0.8rem',
            color: 'var(--color-text-muted)', lineHeight: 1.6,
          }}>
            {currentLife.lifeNumber === 1 && currentLife.choices.length < 3 && (
              <>
                <strong>Try this:</strong> Make a few cooperative choices, then switch to selfish ones.
                Watch how trust builds slowly but erodes quickly.
              </>
            )}
            {currentLife.lifeNumber === 1 && currentLife.choices.length >= 3 && currentLife.alive && (
              <>
                <strong>Notice:</strong> Selfish choices give immediate ATP but lower CI, which increases
                the cost of <em>all future actions</em>. The penalty compounds.
              </>
            )}
            {currentLife.lifeNumber > 1 && currentLife.alive && (
              <>
                <strong>Karma at work:</strong> Your starting conditions were set by Life {currentLife.lifeNumber - 1}&apos;s
                final trust. Every advantage or disadvantage you see now was <em>earned</em> in a previous life.
              </>
            )}
            {!currentLife.alive && currentLife.karmaTier === 'Constrained' && (
              <>
                <strong>The constraint trap:</strong> Low karma means lower starting CI, which means higher
                action costs, which means faster ATP drain, which means less time to rebuild trust.
                Breaking out requires deliberate, sustained cooperation.
              </>
            )}
            {!currentLife.alive && currentLife.karmaTier === 'Honored' && (
              <>
                <strong>Virtuous momentum:</strong> High karma means higher starting trust and CI, which means
                lower costs and more room to invest in training. Success compounds across lives.
              </>
            )}
          </div>
        </div>
      </div>

      <ExplorerNav currentPath="/karma-journey" />
      <RelatedConcepts currentPath="/karma-journey" />
    </div>
  );
}
