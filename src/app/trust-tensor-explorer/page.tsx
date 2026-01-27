'use client';

/**
 * Trust Tensor Explorer
 *
 * Interactive tool for understanding how trust works in Web4:
 * - 3D trust tensor (Talent, Training, Temperament) with real-time manipulation
 * - Coherence Index (CI) modulation showing how consistency gates trust
 * - ATP cost calculator showing economic consequences of low coherence
 * - Scenario simulator: apply events and watch trust evolve over time
 * - Role-specific trust thresholds (surgeon, researcher, mechanic)
 * - Rebirth/karma calculator showing how final trust shapes next life
 *
 * Based on trust_tensors.py and mrh_aware_trust.py from Web4 reference implementation.
 */

import { useState, useCallback, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface T3Tensor {
  talent: number;
  training: number;
  temperament: number;
}

interface TrustEvent {
  label: string;
  emoji: string;
  deltas: T3Tensor;
  ciEffect: number;
  description: string;
}

interface RoleRequirement {
  label: string;
  emoji: string;
  minimums: T3Tensor;
  description: string;
}

interface TimelineEntry {
  tick: number;
  t3: T3Tensor;
  ci: number;
  event: string;
  composite: number;
  effective: number;
}

// ============================================================================
// Constants
// ============================================================================

const DIMENSION_INFO = {
  talent: {
    label: 'Talent',
    color: '#3b82f6',
    description: 'Natural aptitude and capability',
    weight: 0.3,
  },
  training: {
    label: 'Training',
    color: '#10b981',
    description: 'Acquired skills and expertise',
    weight: 0.3,
  },
  temperament: {
    label: 'Temperament',
    color: '#f59e0b',
    description: 'Behavioral consistency and reliability',
    weight: 0.4,
  },
};

const EVENTS: TrustEvent[] = [
  {
    label: 'Novel Success',
    emoji: '🌟',
    deltas: { talent: 0.04, training: 0.02, temperament: 0.01 },
    ciEffect: 0.02,
    description: 'Solved a new type of problem successfully',
  },
  {
    label: 'Consistent Delivery',
    emoji: '✅',
    deltas: { talent: 0, training: 0.01, temperament: 0.03 },
    ciEffect: 0.03,
    description: 'Reliable performance over time',
  },
  {
    label: 'Ethics Violation',
    emoji: '🚫',
    deltas: { talent: -0.05, training: 0, temperament: -0.10 },
    ciEffect: -0.15,
    description: 'Acted against established ethical guidelines',
  },
  {
    label: 'Unexpected Failure',
    emoji: '💥',
    deltas: { talent: -0.02, training: -0.01, temperament: -0.02 },
    ciEffect: -0.05,
    description: 'Failed at something expected to succeed',
  },
  {
    label: 'Helped Others',
    emoji: '🤝',
    deltas: { talent: 0, training: 0.005, temperament: 0.02 },
    ciEffect: 0.02,
    description: 'Volunteered resources to assist peers',
  },
  {
    label: 'Suspicious Activity',
    emoji: '⚠️',
    deltas: { talent: 0, training: 0, temperament: -0.05 },
    ciEffect: -0.08,
    description: 'Anomalous behavior flagged by witnesses',
  },
  {
    label: 'Training Completed',
    emoji: '📚',
    deltas: { talent: 0.01, training: 0.05, temperament: 0 },
    ciEffect: 0.01,
    description: 'Finished a structured learning program',
  },
  {
    label: 'Idle Period',
    emoji: '💤',
    deltas: { talent: 0, training: -0.01, temperament: 0.01 },
    ciEffect: 0,
    description: 'Extended period without activity',
  },
];

const ROLES: RoleRequirement[] = [
  {
    label: 'Surgeon',
    emoji: '🏥',
    minimums: { talent: 0.7, training: 0.9, temperament: 0.85 },
    description: 'Critical safety role requiring mastery',
  },
  {
    label: 'Researcher',
    emoji: '🔬',
    minimums: { talent: 0.6, training: 0.7, temperament: 0.5 },
    description: 'Discovery role valuing aptitude',
  },
  {
    label: 'Auditor',
    emoji: '🔍',
    minimums: { talent: 0.5, training: 0.6, temperament: 0.9 },
    description: 'Oversight role demanding consistency',
  },
  {
    label: 'Mechanic',
    emoji: '🔧',
    minimums: { talent: 0.4, training: 0.7, temperament: 0.6 },
    description: 'Hands-on role valuing skill',
  },
  {
    label: 'Teacher',
    emoji: '📖',
    minimums: { talent: 0.5, training: 0.8, temperament: 0.7 },
    description: 'Knowledge transfer role',
  },
];

// ============================================================================
// Utility Functions
// ============================================================================

function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

function compositeScore(t3: T3Tensor): number {
  return 0.3 * t3.talent + 0.3 * t3.training + 0.4 * t3.temperament;
}

function effectiveTrust(t3: T3Tensor, ci: number, steepness = 2.0): T3Tensor {
  const ciMod = Math.pow(ci, steepness);
  return {
    talent: t3.talent * ciMod,
    training: t3.training * ciMod,
    temperament: t3.temperament * ciMod,
  };
}

function atpMultiplier(ci: number): number {
  if (ci >= 0.9) return 1.0;
  return Math.min(10.0, 1.0 / Math.pow(ci, 2));
}

function witnessesRequired(ci: number, base = 3): number {
  if (ci >= 0.8) return base;
  const additional = Math.ceil((0.8 - ci) * 10);
  return base + Math.min(additional, 8);
}

function rebirthOutcome(finalComposite: number): { tier: string; initialT3: number; atpBonus: number; role: string; color: string } {
  if (finalComposite > 0.7) return { tier: 'Honored', initialT3: 0.6, atpBonus: (finalComposite - 0.5) * 40, role: 'Trusted Researcher', color: '#6ee7b7' };
  if (finalComposite < 0.3) return { tier: 'Constrained', initialT3: 0.4, atpBonus: -20, role: 'Rehabilitation', color: '#fca5a5' };
  return { tier: 'Neutral', initialT3: 0.5, atpBonus: 0, role: 'Standard', color: '#fde68a' };
}

function meetsRoleRequirements(t3: T3Tensor, role: RoleRequirement): { meets: boolean; gaps: Partial<T3Tensor> } {
  const gaps: Partial<T3Tensor> = {};
  let meets = true;
  for (const dim of ['talent', 'training', 'temperament'] as const) {
    if (t3[dim] < role.minimums[dim]) {
      gaps[dim] = role.minimums[dim] - t3[dim];
      meets = false;
    }
  }
  return { meets, gaps };
}

// ============================================================================
// Components
// ============================================================================

function TensorBar({ dim, value, effective, onChange }: {
  dim: 'talent' | 'training' | 'temperament';
  value: number;
  effective: number;
  onChange: (v: number) => void;
}) {
  const info = DIMENSION_INFO[dim];
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span style={{ color: info.color, fontWeight: 600 }}>
          {info.label} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>({(info.weight * 100).toFixed(0)}% weight)</span>
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--color-text)' }}>{value.toFixed(2)}</span>
          {effective !== value && (
            <span style={{ color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
              eff: <span style={{ color: effective < value ? '#fca5a5' : info.color }}>{effective.toFixed(2)}</span>
            </span>
          )}
        </span>
      </div>
      <div style={{ position: 'relative', height: '32px' }}>
        {/* Background bar */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0, height: '8px',
          transform: 'translateY(-50%)',
          background: 'var(--color-bg-tertiary)', borderRadius: '4px',
        }} />
        {/* Effective trust bar (CI-modulated) */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, height: '8px',
          width: `${effective * 100}%`,
          transform: 'translateY(-50%)',
          background: `${info.color}40`, borderRadius: '4px',
          transition: 'width 0.3s',
        }} />
        {/* Base trust bar */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, height: '4px',
          width: `${value * 100}%`,
          transform: 'translateY(-50%)',
          background: info.color, borderRadius: '2px',
          transition: 'width 0.3s',
        }} />
        {/* Slider */}
        <input
          type="range"
          min={0} max={100} step={1}
          value={Math.round(value * 100)}
          onChange={e => onChange(Number(e.target.value) / 100)}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            appearance: 'none', background: 'transparent', cursor: 'pointer',
            WebkitAppearance: 'none',
          }}
        />
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
        {info.description}
      </div>
    </div>
  );
}

function RoleCard({ role, t3 }: { role: RoleRequirement; t3: T3Tensor }) {
  const { meets, gaps } = meetsRoleRequirements(t3, role);
  return (
    <div style={{
      padding: '0.75rem', borderRadius: '0.5rem',
      border: `1px solid ${meets ? '#6ee7b750' : '#ffffff10'}`,
      background: meets ? '#6ee7b708' : 'var(--color-bg-secondary)',
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{role.emoji}</span>
        <span style={{ fontWeight: 600, color: meets ? '#6ee7b7' : 'var(--color-text)' }}>{role.label}</span>
        <span style={{
          marginLeft: 'auto', fontSize: '0.7rem', padding: '0.125rem 0.5rem',
          borderRadius: '999px', fontWeight: 600,
          background: meets ? '#6ee7b720' : '#fca5a520',
          color: meets ? '#6ee7b7' : '#fca5a5',
        }}>
          {meets ? 'ELIGIBLE' : 'GAPS'}
        </span>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}>
        {role.description}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', fontFamily: 'monospace' }}>
        {(['talent', 'training', 'temperament'] as const).map(dim => {
          const gap = gaps[dim];
          return (
            <span key={dim} style={{
              padding: '0.125rem 0.375rem', borderRadius: '4px',
              background: gap ? '#fca5a510' : '#6ee7b710',
              color: gap ? '#fca5a5' : '#6ee7b7',
            }}>
              {dim[0].toUpperCase()}: {role.minimums[dim].toFixed(1)}
              {gap ? ` (-${gap.toFixed(2)})` : ' ✓'}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TimelineMini({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;
  const maxTicks = Math.max(20, entries.length);
  const displayEntries = entries.slice(-maxTicks);

  return (
    <div style={{
      background: 'var(--color-bg-secondary)', borderRadius: '0.5rem',
      padding: '1rem', border: '1px solid var(--color-border)',
    }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
        Trust Evolution Timeline ({entries.length} events)
      </div>
      {/* Mini chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '60px', marginBottom: '0.5rem' }}>
        {displayEntries.map((entry, i) => {
          const height = entry.effective * 100;
          return (
            <div key={i} title={`${entry.event}: ${entry.effective.toFixed(2)}`} style={{
              flex: 1, height: `${height}%`, minWidth: '3px',
              borderRadius: '2px 2px 0 0',
              background: entry.effective > 0.7 ? '#6ee7b7' : entry.effective > 0.4 ? '#fde68a' : '#fca5a5',
              opacity: 0.8,
              transition: 'height 0.3s',
            }} />
          );
        })}
      </div>
      {/* Recent events */}
      <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '0.7rem' }}>
        {[...displayEntries].reverse().slice(0, 6).map((entry, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', padding: '0.125rem 0',
            color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)',
          }}>
            <span>{entry.event}</span>
            <span style={{
              fontFamily: 'monospace',
              color: entry.effective > 0.7 ? '#6ee7b7' : entry.effective > 0.4 ? '#fde68a' : '#fca5a5',
            }}>
              {entry.effective.toFixed(3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function TrustTensorExplorerPage() {
  // Core state
  const [t3, setT3] = useState<T3Tensor>({ talent: 0.5, training: 0.5, temperament: 0.5 });
  const [ci, setCi] = useState(0.85);
  const [steepness, setSteepness] = useState(2.0);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'tensor' | 'roles' | 'economics' | 'rebirth'>('tensor');

  // Derived values
  const eff = useMemo(() => effectiveTrust(t3, ci, steepness), [t3, ci, steepness]);
  const comp = useMemo(() => compositeScore(t3), [t3]);
  const effComp = useMemo(() => compositeScore(eff), [eff]);
  const atpMul = useMemo(() => atpMultiplier(ci), [ci]);
  const witnesses = useMemo(() => witnessesRequired(ci), [ci]);
  const rebirth = useMemo(() => rebirthOutcome(effComp), [effComp]);

  // Apply event
  const applyEvent = useCallback((event: TrustEvent) => {
    setT3(prev => ({
      talent: clamp(prev.talent + event.deltas.talent),
      training: clamp(prev.training + event.deltas.training),
      temperament: clamp(prev.temperament + event.deltas.temperament),
    }));
    setCi(prev => clamp(prev + event.ciEffect));

    // Record in timeline
    setTimeline(prev => {
      const newT3 = {
        talent: clamp(t3.talent + event.deltas.talent),
        training: clamp(t3.training + event.deltas.training),
        temperament: clamp(t3.temperament + event.deltas.temperament),
      };
      const newCi = clamp(ci + event.ciEffect);
      const newEff = effectiveTrust(newT3, newCi, steepness);
      return [...prev, {
        tick: prev.length + 1,
        t3: newT3,
        ci: newCi,
        event: `${event.emoji} ${event.label}`,
        composite: compositeScore(newT3),
        effective: compositeScore(newEff),
      }];
    });
  }, [t3, ci, steepness]);

  // Reset
  const reset = useCallback(() => {
    setT3({ talent: 0.5, training: 0.5, temperament: 0.5 });
    setCi(0.85);
    setTimeline([]);
  }, []);

  // Update single dimension
  const updateDim = useCallback((dim: keyof T3Tensor, value: number) => {
    setT3(prev => ({ ...prev, [dim]: value }));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/trust-tensor-explorer" />

      {/* Header */}
      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #3b82f6, #10b981, #f59e0b)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Trust Tensor Explorer
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '700px' }}>
        Manipulate the three dimensions of trust (Talent, Training, Temperament) and see how
        Coherence Index modulates effective trust, ATP costs, witness requirements, and rebirth outcomes.
      </p>

      {/* Top Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem', marginBottom: '1.5rem',
      }}>
        {[
          { label: 'Base Composite', value: comp.toFixed(3), color: '#93c5fd' },
          { label: 'Effective Trust', value: effComp.toFixed(3), color: effComp > 0.7 ? '#6ee7b7' : effComp > 0.4 ? '#fde68a' : '#fca5a5' },
          { label: 'Coherence (CI)', value: ci.toFixed(2), color: ci > 0.8 ? '#6ee7b7' : ci > 0.5 ? '#fde68a' : '#fca5a5' },
          { label: 'ATP Multiplier', value: `${atpMul.toFixed(1)}x`, color: atpMul <= 1.5 ? '#6ee7b7' : atpMul <= 3 ? '#fde68a' : '#fca5a5' },
          { label: 'Witnesses Needed', value: `${witnesses}`, color: witnesses <= 3 ? '#6ee7b7' : witnesses <= 5 ? '#fde68a' : '#fca5a5' },
          { label: 'Rebirth Tier', value: rebirth.tier, color: rebirth.color },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: stat.color, fontFamily: 'monospace' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Left: Tensor Sliders + CI */}
        <div>
          {/* T3 Sliders */}
          <div style={{
            padding: '1.25rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Trust Tensor (T3)
            </h2>
            {(['talent', 'training', 'temperament'] as const).map(dim => (
              <TensorBar
                key={dim}
                dim={dim}
                value={t3[dim]}
                effective={eff[dim]}
                onChange={v => updateDim(dim, v)}
              />
            ))}

            {/* Composite formula */}
            <div style={{
              marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', fontFamily: 'monospace', fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}>
              composite = 0.3 x talent + 0.3 x training + 0.4 x temperament = <span style={{ color: '#93c5fd', fontWeight: 600 }}>{comp.toFixed(3)}</span>
            </div>
          </div>

          {/* CI Slider */}
          <div style={{
            padding: '1.25rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Coherence Index (CI)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              CI measures behavioral consistency. Low CI means erratic behavior which <strong>multiplicatively reduces</strong> effective trust.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ color: ci > 0.8 ? '#6ee7b7' : ci > 0.5 ? '#fde68a' : '#fca5a5', fontWeight: 600 }}>
                CI = {ci.toFixed(2)}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Steepness: {steepness.toFixed(1)}
              </span>
            </div>
            <input
              type="range" min={0} max={100} step={1}
              value={Math.round(ci * 100)}
              onChange={e => setCi(Number(e.target.value) / 100)}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
              <span>Erratic (0.0)</span>
              <span>Consistent (1.0)</span>
            </div>

            {/* Steepness control */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                Steepness (how aggressively CI gates trust):
              </div>
              <input
                type="range" min={10} max={40} step={1}
                value={Math.round(steepness * 10)}
                onChange={e => setSteepness(Number(e.target.value) / 10)}
                style={{ width: '100%', cursor: 'pointer' }}
              />
              <div style={{
                marginTop: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-tertiary)', fontFamily: 'monospace', fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
              }}>
                effective = base x CI^{steepness.toFixed(1)} = {comp.toFixed(3)} x {Math.pow(ci, steepness).toFixed(3)} = <span style={{ color: '#6ee7b7', fontWeight: 600 }}>{effComp.toFixed(3)}</span>
              </div>
            </div>

            {/* CI Curve Visualization */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                CI Modulation Curve
              </div>
              <div style={{
                position: 'relative', height: '100px', width: '100%',
                background: 'var(--color-bg-tertiary)', borderRadius: '0.5rem',
                overflow: 'hidden',
              }}>
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map(v => (
                  <div key={v} style={{
                    position: 'absolute', left: 0, right: 0,
                    bottom: `${v * 100}%`, height: '1px',
                    background: '#ffffff08',
                  }} />
                ))}
                {/* Curve - rendered as bars */}
                {Array.from({ length: 50 }, (_, i) => {
                  const ciVal = (i + 1) / 50;
                  const modulator = Math.pow(ciVal, steepness);
                  const isCurrentCI = Math.abs(ciVal - ci) < 0.02;
                  return (
                    <div key={i} style={{
                      position: 'absolute',
                      left: `${(i / 50) * 100}%`,
                      bottom: 0,
                      width: `${100 / 50}%`,
                      height: `${modulator * 100}%`,
                      background: isCurrentCI ? '#6ee7b7' : ciVal > 0.8 ? '#6ee7b730' : ciVal > 0.5 ? '#fde68a20' : '#fca5a515',
                      transition: 'height 0.3s',
                    }} />
                  );
                })}
                {/* Current CI marker */}
                <div style={{
                  position: 'absolute',
                  left: `${ci * 100}%`,
                  top: 0, bottom: 0, width: '2px',
                  background: '#6ee7b7',
                  zIndex: 2,
                }} />
                {/* Axis labels */}
                <div style={{
                  position: 'absolute', bottom: '2px', left: '4px',
                  fontSize: '0.55rem', color: 'var(--color-text-muted)',
                }}>
                  CI=0
                </div>
                <div style={{
                  position: 'absolute', bottom: '2px', right: '4px',
                  fontSize: '0.55rem', color: 'var(--color-text-muted)',
                }}>
                  CI=1
                </div>
                <div style={{
                  position: 'absolute', top: '2px', left: '4px',
                  fontSize: '0.55rem', color: 'var(--color-text-muted)',
                }}>
                  100%
                </div>
              </div>
              <div style={{
                marginTop: '0.375rem', fontSize: '0.7rem', color: 'var(--color-text-muted)',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>Current: CI={ci.toFixed(2)} retains <span style={{
                  color: Math.pow(ci, steepness) > 0.7 ? '#6ee7b7' : Math.pow(ci, steepness) > 0.3 ? '#fde68a' : '#fca5a5',
                  fontWeight: 600,
                }}>{(Math.pow(ci, steepness) * 100).toFixed(0)}%</span> of trust</span>
                <span>steepness={steepness.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={reset}
            style={{
              width: '100%', padding: '0.5rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.8rem',
            }}
          >
            Reset All
          </button>
        </div>

        {/* Right: Events + Timeline + Tabs */}
        <div>
          {/* Events */}
          <div style={{
            padding: '1.25rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              Apply Events
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {EVENTS.map(event => (
                <button
                  key={event.label}
                  onClick={() => applyEvent(event)}
                  title={event.description}
                  style={{
                    padding: '0.5rem', borderRadius: '0.5rem',
                    background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                    cursor: 'pointer', textAlign: 'left', fontSize: '0.75rem',
                    color: 'var(--color-text)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#3b82f650')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                >
                  <div style={{ fontWeight: 600 }}>{event.emoji} {event.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', marginTop: '0.125rem' }}>
                    {event.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <TimelineMini entries={timeline} />
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex', gap: '0.25rem', marginTop: '2rem', marginBottom: '1rem',
        borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem',
      }}>
        {[
          { key: 'tensor' as const, label: 'How It Works' },
          { key: 'roles' as const, label: 'Role Requirements' },
          { key: 'economics' as const, label: 'ATP Economics' },
          { key: 'rebirth' as const, label: 'Rebirth / Karma' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '0.5rem 0.5rem 0 0',
              border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              background: activeTab === tab.key ? 'var(--color-bg-secondary)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid #3b82f6' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        padding: '1.5rem', borderRadius: '0 0 0.75rem 0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
        marginBottom: '2rem',
      }}>
        {activeTab === 'tensor' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>The Three Dimensions of Trust</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              In Web4, trust is not a single number. It&apos;s a <strong>3-dimensional tensor</strong> (T3) that captures
              different aspects of trustworthiness. This matters because a brilliant surgeon with erratic temperament
              is very different from a mediocre surgeon with perfect consistency.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {(['talent', 'training', 'temperament'] as const).map(dim => {
                const info = DIMENSION_INFO[dim];
                return (
                  <div key={dim} style={{
                    padding: '1rem', borderRadius: '0.5rem',
                    border: `1px solid ${info.color}30`,
                    background: `${info.color}08`,
                  }}>
                    <div style={{ color: info.color, fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      {info.description}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      Weight: <strong>{(info.weight * 100).toFixed(0)}%</strong> of composite
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{
              padding: '1rem', borderRadius: '0.5rem', background: 'var(--color-bg-tertiary)',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
            }}>
              <strong>Why Temperament is weighted highest (40%):</strong> Talent and training can be assessed
              through tests, but behavioral consistency under pressure reveals true character.
              A system that&apos;s brilliant but unreliable is more dangerous than one that&apos;s average but consistent.
              Temperament is the hardest dimension to fake and the most predictive of long-term reliability.
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Role-Specific Trust Thresholds</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Different roles demand different trust profiles. A surgeon needs exceptional training and temperament,
              while a researcher needs strong talent. Your current T3 determines which roles you qualify for.
            </p>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {ROLES.map(role => (
                <RoleCard key={role.label} role={role} t3={eff} />
              ))}
            </div>
            <div style={{
              marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
            }}>
              Note: Role eligibility uses <strong>effective trust</strong> (CI-modulated), not base trust.
              Even high base trust won&apos;t qualify you if your coherence is low.
            </div>
          </div>
        )}

        {activeTab === 'economics' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>ATP Cost Modulation</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Low coherence makes everything more expensive. Actions that cost 1 ATP at CI=0.95 can cost up to
              10x at very low CI. This creates a natural &quot;tax on chaos&quot; &mdash; inconsistent behavior is economically
              unsustainable.
            </p>

            {/* ATP cost table */}
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Action</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Base ATP</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Your Cost</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Penalty</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Local Conversation', base: 10 },
                    { name: 'Federation Query', base: 50 },
                    { name: 'Insurance Audit', base: 100 },
                    { name: 'Infrastructure Vote', base: 200 },
                  ].map(action => (
                    <tr key={action.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '0.5rem', color: 'var(--color-text)' }}>{action.name}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace' }}>{action.base}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 600, color: atpMul > 1.5 ? '#fca5a5' : '#6ee7b7' }}>
                        {(action.base * atpMul).toFixed(0)}
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>
                        {atpMul > 1.01 ? `+${((atpMul - 1) * 100).toFixed(0)}%` : 'none'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Witness requirements */}
            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Witness Requirements</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                With CI = {ci.toFixed(2)}, you need <strong style={{ color: witnesses <= 3 ? '#6ee7b7' : '#fca5a5' }}>{witnesses} witnesses</strong> for
                attestation (base: 3). Low CI agents need more witnesses to compensate for erratic behavior.
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {Array.from({ length: Math.min(witnesses, 11) }, (_, i) => (
                  <div key={i} style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: i < 3 ? '#6ee7b7' : '#fca5a5',
                    opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', color: '#000',
                  }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: '1px solid #f59e0b30', background: '#f59e0b08',
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
            }}>
              <strong>Key insight:</strong> The ATP penalty uses CI^2 in the denominator, creating a <em>quadratic</em> penalty.
              Dropping from CI=0.9 to CI=0.7 barely hurts (1x to 2x), but dropping from 0.5 to 0.3 is devastating (4x to 10x).
              This means small inconsistencies are forgiven, but systemic incoherence is economically fatal.
            </div>
          </div>
        )}

        {activeTab === 'rebirth' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Rebirth &amp; Karma</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              When an agent&apos;s life ends (ATP depletion or society removal), their final trust determines
              their starting conditions in the next life. Trust is your legacy.
            </p>

            {/* Current rebirth outcome */}
            <div style={{
              padding: '1.25rem', borderRadius: '0.75rem',
              border: `2px solid ${rebirth.color}50`,
              background: `${rebirth.color}08`,
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                YOUR REBIRTH OUTCOME
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: rebirth.color, marginBottom: '0.5rem' }}>
                {rebirth.tier}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '0.8rem' }}>
                <div>
                  <div style={{ color: 'var(--color-text-muted)' }}>Next Life T3</div>
                  <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>{rebirth.initialT3.toFixed(1)}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-text-muted)' }}>ATP Bonus</div>
                  <div style={{ fontWeight: 600, fontFamily: 'monospace', color: rebirth.atpBonus >= 0 ? '#6ee7b7' : '#fca5a5' }}>
                    {rebirth.atpBonus >= 0 ? '+' : ''}{rebirth.atpBonus.toFixed(0)}
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-text-muted)' }}>Role Hint</div>
                  <div style={{ fontWeight: 600 }}>{rebirth.role}</div>
                </div>
              </div>
            </div>

            {/* Tier comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {[
                { tier: 'Honored', threshold: '> 0.7', t3: 0.6, atp: '+8', role: 'Trusted Researcher', color: '#6ee7b7' },
                { tier: 'Neutral', threshold: '0.3 - 0.7', t3: 0.5, atp: '+0', role: 'Standard', color: '#fde68a' },
                { tier: 'Constrained', threshold: '< 0.3', t3: 0.4, atp: '-20', role: 'Rehabilitation', color: '#fca5a5' },
              ].map(tier => (
                <div key={tier.tier} style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  border: `1px solid ${tier.color}30`,
                  background: `${tier.color}08`,
                  opacity: rebirth.tier === tier.tier ? 1 : 0.5,
                }}>
                  <div style={{ fontWeight: 700, color: tier.color, marginBottom: '0.25rem' }}>{tier.tier}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Effective trust {tier.threshold}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Start T3: {tier.t3} | ATP: {tier.atp}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: '1px solid #8b5cf630', background: '#8b5cf608',
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
            }}>
              <strong>Karma in Web4:</strong> Unlike traditional reputation systems where you start fresh,
              Web4&apos;s karma ensures that your <em>effective trust</em> at death shapes your next beginning.
              Build trust to build momentum. Destroy trust and future lives start at a disadvantage.
              The multiplier is CI-modulated, so even high base trust can&apos;t escape low coherence.
            </div>
          </div>
        )}
      </div>

      <ExplorerNav currentPath="/trust-tensor-explorer" />
      <RelatedConcepts currentPath="/trust-tensor-explorer" />
    </div>
  );
}
