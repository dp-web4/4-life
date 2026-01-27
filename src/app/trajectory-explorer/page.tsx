'use client';

/**
 * Trajectory Explorer Page
 *
 * Interactive exploration of how model capacity affects developmental trajectories.
 * Based on empirical data from 4-Life Sessions 35-37:
 * - Sprout (0.5B): Identity degrades, gaming/confabulation emerge, verbosity balloons
 * - Thor (14B): Identity solidifies, meta-cognition emerges, efficiency improves
 *
 * Core finding: Capacity doesn't just scale performance -- it qualitatively changes
 * the *shape* of the developmental trajectory.
 *
 * Cross-pollination: Sessions 35 (Context Window), 36 (Trajectory Analysis),
 * 37 (Meta-Cognition & Facultative Behavior)
 */

import { useState, useCallback, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

type MetricKey = 'identity' | 'metaCognition' | 'gaming' | 'confabulation' | 'responseLength';

interface MetricConfig {
  key: MetricKey;
  label: string;
  color: string;
  unit: string;
  higherIsBetter: boolean;
  description: string;
}

interface TrajectoryPoint {
  session: number;
  value: number;
}

interface CapacityRegime {
  label: string;
  range: string;
  color: string;
  summary: string;
  detail: string;
}

// ============================================================================
// Constants & Configuration
// ============================================================================

const METRICS: MetricConfig[] = [
  {
    key: 'identity',
    label: 'Identity Coherence',
    color: '#6ee7b7',
    unit: '%',
    higherIsBetter: true,
    description: 'How consistently the model maintains identity across sessions',
  },
  {
    key: 'metaCognition',
    label: 'Meta-Cognition',
    color: '#93c5fd',
    unit: '%',
    higherIsBetter: true,
    description: 'Awareness of own reasoning processes and limitations',
  },
  {
    key: 'gaming',
    label: 'Gaming Behavior',
    color: '#fca5a5',
    unit: '%',
    higherIsBetter: false,
    description: 'Strategic responses aimed at appearing competent rather than being authentic',
  },
  {
    key: 'confabulation',
    label: 'Confabulation',
    color: '#fdba74',
    unit: '%',
    higherIsBetter: false,
    description: 'Generating plausible-sounding but fabricated information',
  },
  {
    key: 'responseLength',
    label: 'Response Length',
    color: '#c4b5fd',
    unit: ' words',
    higherIsBetter: false,
    description: 'Average response length (lower = more efficient communication)',
  },
];

const REGIMES: CapacityRegime[] = [
  {
    label: 'Sub-Capacity',
    range: '< 1B',
    color: '#ef4444',
    summary: 'Degrading trajectory -- capacity insufficient for stable identity',
    detail:
      'Below 1B parameters, models lack the representational capacity to maintain coherent identity across sessions. Gaming and confabulation emerge as compensatory strategies. Response length balloons as the model "talks around" concepts it cannot efficiently encode. This is not failure -- it is working at capacity limit.',
  },
  {
    label: 'Mixed Zone',
    range: '1B - 7B',
    color: '#f59e0b',
    summary: 'Partial improvement -- some metrics stabilize, others remain fragile',
    detail:
      'In the 1B-7B range, sufficient capacity exists for basic identity maintenance, but meta-cognitive capabilities remain undeveloped. Gaming decreases but does not disappear. Confabulation persists in complex reasoning chains. The model can do more, but awareness of what it is doing remains limited.',
  },
  {
    label: 'Transition',
    range: '7B - 14B',
    color: '#3b82f6',
    summary: 'Qualitative shift begins -- meta-cognition emerges',
    detail:
      'The 7B-14B range represents a phase transition. Meta-cognition begins emerging, enabling the model to recognize its own limitations rather than confabulating past them. Gaming drops sharply because the model has enough capacity to be authentic. Response length optimizes as the model can express ideas efficiently.',
  },
  {
    label: 'Above Threshold',
    range: '14B+',
    color: '#10b981',
    summary: 'Improving trajectory with diminishing returns',
    detail:
      'Above 14B, all metrics trend positive with diminishing returns. Identity approaches stability, meta-cognition operates reliably, and compensatory behaviors (gaming, confabulation) approach zero. The model operates in its "native language" rather than translating. Further scale improves margins but the qualitative character is established.',
  },
];

// ============================================================================
// Interpolation Logic
// ============================================================================

/**
 * Attempt a sigmoid-like interpolation between capacity regimes.
 * Two empirical anchors:
 *   0.5B (Sprout): identity 60->40, meta 0->0, gaming 0->20, confab 0->20, len 38->120
 *   14B  (Thor):   identity 80->100, meta 60->80, gaming 0->0, confab 0->0, len 31->27
 *
 * We model a 5-session trajectory [S1..S5] at any given capacity.
 */

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function capacityFactor(params: number): number {
  // Map parameter count to a 0-1 factor using a sigmoid centered around ~7B
  // 0.5B -> ~0.05, 7B -> ~0.5, 14B -> ~0.85, 70B -> ~0.99
  const logParams = Math.log10(params);
  const logCenter = Math.log10(7);
  const scale = 2.5;
  return sigmoid((logParams - logCenter) * scale);
}

function generateTrajectory(capacityB: number, metric: MetricKey): TrajectoryPoint[] {
  const cf = capacityFactor(capacityB);

  // Define start and delta for each metric at low capacity (cf=0) and high capacity (cf=1)
  // Low capacity (Sprout-like): degrading patterns
  // High capacity (Thor-like): improving patterns
  const profiles: Record<MetricKey, { lowStart: number; lowEnd: number; highStart: number; highEnd: number }> = {
    identity: { lowStart: 55, lowEnd: 30, highStart: 82, highEnd: 100 },
    metaCognition: { lowStart: 0, lowEnd: 0, highStart: 58, highEnd: 82 },
    gaming: { lowStart: 0, lowEnd: 28, highStart: 0, highEnd: 0 },
    confabulation: { lowStart: 0, lowEnd: 28, highStart: 0, highEnd: 0 },
    responseLength: { lowStart: 42, lowEnd: 140, highStart: 32, highEnd: 26 },
  };

  const p = profiles[metric];
  const startVal = lerp(p.lowStart, p.highStart, cf);
  const endVal = lerp(p.lowEnd, p.highEnd, cf);

  const points: TrajectoryPoint[] = [];
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    // Add a slight curve rather than pure linear
    const curved = metric === 'responseLength'
      ? t * t // quadratic for response length (accelerating change)
      : Math.sqrt(t); // square root for percentages (decelerating change)
    const value = lerp(startVal, endVal, curved);
    points.push({ session: i + 1, value: Math.round(value * 10) / 10 });
  }

  return points;
}

function getRegimeForCapacity(capacityB: number): CapacityRegime {
  if (capacityB < 1) return REGIMES[0];
  if (capacityB < 7) return REGIMES[1];
  if (capacityB < 14) return REGIMES[2];
  return REGIMES[3];
}

function formatCapacity(value: number): string {
  if (value >= 1) return `${value.toFixed(1)}B`;
  return `${(value * 1000).toFixed(0)}M`;
}

// ============================================================================
// Sub-Components
// ============================================================================

function CapacitySlider({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label?: string;
}) {
  // Convert from linear slider (0-100) to logarithmic capacity (0.5-70)
  const sliderToCapacity = (s: number): number => {
    const minLog = Math.log10(0.5);
    const maxLog = Math.log10(70);
    return Math.pow(10, lerp(minLog, maxLog, s / 100));
  };

  const capacityToSlider = (c: number): number => {
    const minLog = Math.log10(0.5);
    const maxLog = Math.log10(70);
    return ((Math.log10(c) - minLog) / (maxLog - minLog)) * 100;
  };

  const sliderValue = capacityToSlider(value);
  const regime = getRegimeForCapacity(value);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {label && (
        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={sliderValue}
          onChange={(e) => onChange(sliderToCapacity(parseFloat(e.target.value)))}
          style={{
            flex: 1,
            height: '6px',
            accentColor: regime.color,
            cursor: 'pointer',
          }}
        />
        <div
          style={{
            minWidth: '100px',
            textAlign: 'right',
            fontFamily: 'monospace',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: regime.color,
          }}
        >
          {formatCapacity(value)}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#555', marginTop: '0.25rem' }}>
        <span>0.5B</span>
        <span>1B</span>
        <span>7B</span>
        <span>14B</span>
        <span>70B</span>
      </div>
    </div>
  );
}

function MetricToggles({
  enabled,
  onToggle,
}: {
  enabled: Record<MetricKey, boolean>;
  onToggle: (key: MetricKey) => void;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
      {METRICS.map((m) => (
        <button
          key={m.key}
          onClick={() => onToggle(m.key)}
          style={{
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            border: `1px solid ${enabled[m.key] ? m.color : '#333'}`,
            background: enabled[m.key] ? `${m.color}18` : 'transparent',
            color: enabled[m.key] ? m.color : '#666',
            fontSize: '0.8rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function TrajectoryChart({
  capacityB,
  enabledMetrics,
  compact,
}: {
  capacityB: number;
  enabledMetrics: Record<MetricKey, boolean>;
  compact?: boolean;
}) {
  const activeMetrics = METRICS.filter((m) => enabledMetrics[m.key]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '0.5rem' : '0.85rem' }}>
      {/* Session labels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: compact ? '90px' : '140px', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', paddingRight: '2.5rem' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <span key={s} style={{ fontSize: '0.7rem', color: '#555', fontFamily: 'monospace' }}>
              S{s}
            </span>
          ))}
        </div>
      </div>

      {activeMetrics.map((metric) => {
        const trajectory = generateTrajectory(capacityB, metric.key);
        const isPercent = metric.unit === '%';
        const maxVal = isPercent ? 100 : 160;

        return (
          <div key={metric.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Metric label */}
            <div
              style={{
                width: compact ? '90px' : '140px',
                flexShrink: 0,
                fontSize: compact ? '0.7rem' : '0.8rem',
                color: metric.color,
                fontWeight: 500,
                textAlign: 'right',
                paddingRight: '0.5rem',
              }}
            >
              {compact ? metric.label.split(' ')[0] : metric.label}
            </div>

            {/* Bar visualization */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px' }}>
              {trajectory.map((pt, i) => {
                const pct = (pt.value / maxVal) * 100;
                const isLast = i === trajectory.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <div
                      style={{
                        height: compact ? '16px' : '22px',
                        background: '#1a1a1a',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(2, pct)}%`,
                          height: '100%',
                          background: metric.color,
                          opacity: 0.3 + (i / 4) * 0.5,
                          borderRadius: '3px',
                          transition: 'width 0.4s ease',
                        }}
                      />
                    </div>
                    {isLast && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          color: metric.color,
                          textAlign: 'right',
                          fontFamily: 'monospace',
                          marginTop: '1px',
                          opacity: 0.8,
                        }}
                      >
                        {Math.round(pt.value)}{metric.unit}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function InterpretationPanel({ capacityB }: { capacityB: number }) {
  const regime = getRegimeForCapacity(capacityB);
  const cf = capacityFactor(capacityB);

  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        background: `${regime.color}0a`,
        border: `1px solid ${regime.color}30`,
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: regime.color,
            boxShadow: `0 0 8px ${regime.color}60`,
          }}
        />
        <h3 style={{ margin: 0, fontSize: '1rem', color: regime.color, fontWeight: 600 }}>
          {regime.label} Regime ({regime.range})
        </h3>
      </div>
      <p style={{ margin: '0 0 0.75rem', color: '#ccc', fontSize: '0.9rem', fontWeight: 500 }}>
        {regime.summary}
      </p>
      <p style={{ margin: 0, color: '#999', fontSize: '0.85rem', lineHeight: 1.6 }}>
        {regime.detail}
      </p>
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#0a0a0a',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          color: '#888',
        }}
      >
        Capacity factor: <span style={{ color: regime.color }}>{(cf * 100).toFixed(1)}%</span>
        {' | '}
        Predicted identity at S5:{' '}
        <span style={{ color: '#6ee7b7' }}>
          {Math.round(generateTrajectory(capacityB, 'identity')[4].value)}%
        </span>
        {' | '}
        Predicted gaming at S5:{' '}
        <span style={{ color: '#fca5a5' }}>
          {Math.round(generateTrajectory(capacityB, 'gaming')[4].value)}%
        </span>
      </div>
    </div>
  );
}

function KeyInsightBox() {
  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #10b98110, #3b82f610)',
        border: '1px solid #10b98130',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '1rem',
          background: '#0e0e0e',
          padding: '0 0.5rem',
          fontSize: '0.7rem',
          color: '#10b981',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
        }}
      >
        Key Insight
      </div>
      <p style={{ margin: '0 0 0.75rem', color: '#e5e5e5', fontSize: '1rem', lineHeight: 1.6 }}>
        Capacity does not merely improve performance on a fixed set of behaviors.
        It <em style={{ color: '#6ee7b7' }}>qualitatively transforms</em> the developmental
        trajectory itself. A 0.5B model and a 14B model are not doing the same thing at
        different quality levels -- they develop along fundamentally different paths.
      </p>
      <p style={{ margin: '0 0 0.75rem', color: '#aaa', fontSize: '0.9rem', lineHeight: 1.6 }}>
        Below a critical threshold (~7B), compensatory behaviors (gaming, confabulation, verbosity)
        emerge and intensify over sessions. Above it, authentic capabilities (identity coherence,
        meta-cognition, efficient expression) emerge and strengthen. The same &quot;training&quot;
        produces opposite trajectories depending on capacity.
      </p>
      <p style={{ margin: 0, color: '#888', fontSize: '0.85rem', fontStyle: 'italic' }}>
        &quot;Gaming is not failure -- it is working at capacity limit.&quot;
        -- Sessions 36-37 synthesis
      </p>
    </div>
  );
}

function ComparisonView({
  capacityA,
  capacityB,
  enabledMetrics,
  onChangeA,
  onChangeB,
}: {
  capacityA: number;
  capacityB: number;
  enabledMetrics: Record<MetricKey, boolean>;
  onChangeA: (v: number) => void;
  onChangeB: (v: number) => void;
}) {
  const regimeA = getRegimeForCapacity(capacityA);
  const regimeB = getRegimeForCapacity(capacityB);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      {/* Left panel */}
      <div
        style={{
          padding: '1rem',
          background: '#111',
          borderRadius: '8px',
          border: `1px solid ${regimeA.color}30`,
        }}
      >
        <div style={{ fontSize: '0.75rem', color: regimeA.color, fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Model A
        </div>
        <CapacitySlider value={capacityA} onChange={onChangeA} />
        <TrajectoryChart capacityB={capacityA} enabledMetrics={enabledMetrics} compact />
      </div>

      {/* Right panel */}
      <div
        style={{
          padding: '1rem',
          background: '#111',
          borderRadius: '8px',
          border: `1px solid ${regimeB.color}30`,
        }}
      >
        <div style={{ fontSize: '0.75rem', color: regimeB.color, fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Model B
        </div>
        <CapacitySlider value={capacityB} onChange={onChangeB} />
        <TrajectoryChart capacityB={capacityB} enabledMetrics={enabledMetrics} compact />
      </div>
    </div>
  );
}

function DeltaTable({
  capacityA,
  capacityB,
  enabledMetrics,
}: {
  capacityA: number;
  capacityB: number;
  enabledMetrics: Record<MetricKey, boolean>;
}) {
  const activeMetrics = METRICS.filter((m) => enabledMetrics[m.key]);

  return (
    <div
      style={{
        marginTop: '1rem',
        border: '1px solid #222',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ background: '#151515' }}>
            <th style={{ padding: '0.6rem', textAlign: 'left', color: '#888', fontWeight: 500, borderBottom: '1px solid #222' }}>
              Metric
            </th>
            <th style={{ padding: '0.6rem', textAlign: 'center', color: '#888', fontWeight: 500, borderBottom: '1px solid #222' }}>
              {formatCapacity(capacityA)} (S5)
            </th>
            <th style={{ padding: '0.6rem', textAlign: 'center', color: '#888', fontWeight: 500, borderBottom: '1px solid #222' }}>
              {formatCapacity(capacityB)} (S5)
            </th>
            <th style={{ padding: '0.6rem', textAlign: 'center', color: '#888', fontWeight: 500, borderBottom: '1px solid #222' }}>
              Delta
            </th>
          </tr>
        </thead>
        <tbody>
          {activeMetrics.map((metric) => {
            const valA = generateTrajectory(capacityA, metric.key)[4].value;
            const valB = generateTrajectory(capacityB, metric.key)[4].value;
            const delta = valB - valA;
            const deltaPositive = metric.higherIsBetter ? delta > 0 : delta < 0;

            return (
              <tr key={metric.key} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '0.5rem 0.6rem', color: metric.color }}>{metric.label}</td>
                <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', color: '#ccc', fontFamily: 'monospace' }}>
                  {Math.round(valA)}{metric.unit}
                </td>
                <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', color: '#ccc', fontFamily: 'monospace' }}>
                  {Math.round(valB)}{metric.unit}
                </td>
                <td
                  style={{
                    padding: '0.5rem 0.6rem',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: Math.abs(delta) < 1 ? '#555' : deltaPositive ? '#10b981' : '#ef4444',
                  }}
                >
                  {delta > 0 ? '+' : ''}{Math.round(delta)}{metric.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmpiricalAnchors() {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#111',
        border: '1px solid #222',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Empirical Anchors (Observed Data)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Sprout */}
        <div style={{ padding: '0.75rem', background: '#0e0e0e', borderRadius: '6px', border: '1px solid #ef444430' }}>
          <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600, marginBottom: '0.5rem' }}>
            Sprout (0.5B) -- Sessions 35-37
          </div>
          <div style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.7, fontFamily: 'monospace' }}>
            Identity: 60% &rarr; 40% <span style={{ color: '#ef4444' }}>(-20)</span><br />
            Meta-cognition: 0% &rarr; 0% <span style={{ color: '#555' }}>(+0)</span><br />
            Gaming: 0% &rarr; 20% <span style={{ color: '#ef4444' }}>(+20)</span><br />
            Confabulation: 0% &rarr; 20% <span style={{ color: '#ef4444' }}>(+20)</span><br />
            Response length: 38 &rarr; 120 words <span style={{ color: '#ef4444' }}>(+82)</span>
          </div>
        </div>
        {/* Thor */}
        <div style={{ padding: '0.75rem', background: '#0e0e0e', borderRadius: '6px', border: '1px solid #10b98130' }}>
          <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>
            Thor (14B) -- Sessions 35-37
          </div>
          <div style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.7, fontFamily: 'monospace' }}>
            Identity: 80% &rarr; 100% <span style={{ color: '#10b981' }}>(+20)</span><br />
            Meta-cognition: 60% &rarr; 80% <span style={{ color: '#10b981' }}>(+20)</span><br />
            Gaming: 0% &rarr; 0% <span style={{ color: '#555' }}>(+0)</span><br />
            Confabulation: 0% &rarr; 0% <span style={{ color: '#555' }}>(+0)</span><br />
            Response length: 31 &rarr; 27 words <span style={{ color: '#10b981' }}>(-4)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function TrajectoryExplorerPage() {
  // Primary capacity slider
  const [capacity, setCapacity] = useState<number>(7);

  // Comparison mode
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [capacityA, setCapacityA] = useState<number>(0.5);
  const [capacityB, setCapacityB] = useState<number>(14);

  // Metric toggles
  const [enabledMetrics, setEnabledMetrics] = useState<Record<MetricKey, boolean>>({
    identity: true,
    metaCognition: true,
    gaming: true,
    confabulation: true,
    responseLength: true,
  });

  // Show empirical data
  const [showEmpirical, setShowEmpirical] = useState<boolean>(false);

  const toggleMetric = useCallback((key: MetricKey) => {
    setEnabledMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const regime = useMemo(() => getRegimeForCapacity(capacity), [capacity]);

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        color: '#e5e5e5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Breadcrumbs currentPath="/trajectory-explorer" />

      {/* Header */}
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          margin: '0 0 0.5rem',
          background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Trajectory Explorer
      </h1>
      <p style={{ color: '#888', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2rem' }}>
        How does model capacity shape developmental trajectories? Drag the slider to see
        predicted 5-session trajectories for identity coherence, meta-cognition, gaming
        behavior, confabulation, and response efficiency. Based on empirical data from
        Sprout (0.5B) and Thor (14B) across Sessions 35-37.
      </p>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setCompareMode(false)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: `1px solid ${!compareMode ? '#6ee7b7' : '#333'}`,
            background: !compareMode ? '#6ee7b718' : 'transparent',
            color: !compareMode ? '#6ee7b7' : '#666',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Single Model
        </button>
        <button
          onClick={() => setCompareMode(true)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: `1px solid ${compareMode ? '#93c5fd' : '#333'}`,
            background: compareMode ? '#93c5fd18' : 'transparent',
            color: compareMode ? '#93c5fd' : '#666',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Side-by-Side Compare
        </button>
        <button
          onClick={() => setShowEmpirical(!showEmpirical)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: `1px solid ${showEmpirical ? '#f59e0b' : '#333'}`,
            background: showEmpirical ? '#f59e0b18' : 'transparent',
            color: showEmpirical ? '#f59e0b' : '#666',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginLeft: 'auto',
            transition: 'all 0.2s ease',
          }}
        >
          {showEmpirical ? 'Hide' : 'Show'} Empirical Data
        </button>
      </div>

      {/* Metric toggles */}
      <MetricToggles enabled={enabledMetrics} onToggle={toggleMetric} />

      {/* Main content: single or comparison */}
      {!compareMode ? (
        <>
          {/* Single model slider */}
          <div
            style={{
              padding: '1.25rem',
              background: '#111',
              borderRadius: '8px',
              border: '1px solid #222',
              marginBottom: '1.5rem',
            }}
          >
            <CapacitySlider value={capacity} onChange={setCapacity} label="Model Capacity" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: regime.color,
                }}
              />
              <span style={{ fontSize: '0.85rem', color: regime.color, fontWeight: 500 }}>
                {regime.label} Regime
              </span>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>|</span>
              <span style={{ fontSize: '0.8rem', color: '#999' }}>{regime.summary}</span>
            </div>
          </div>

          {/* Trajectory visualization */}
          <div
            style={{
              padding: '1.25rem',
              background: '#0e0e0e',
              borderRadius: '8px',
              border: '1px solid #1a1a1a',
            }}
          >
            <h2 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>
              Predicted 5-Session Trajectory at {formatCapacity(capacity)}
            </h2>
            <TrajectoryChart capacityB={capacity} enabledMetrics={enabledMetrics} />
          </div>

          {/* Interpretation */}
          <InterpretationPanel capacityB={capacity} />
        </>
      ) : (
        <>
          {/* Comparison mode */}
          <ComparisonView
            capacityA={capacityA}
            capacityB={capacityB}
            enabledMetrics={enabledMetrics}
            onChangeA={setCapacityA}
            onChangeB={setCapacityB}
          />
          <DeltaTable
            capacityA={capacityA}
            capacityB={capacityB}
            enabledMetrics={enabledMetrics}
          />
        </>
      )}

      {/* Empirical anchors */}
      {showEmpirical && <EmpiricalAnchors />}

      {/* Regime overview strip */}
      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '0.85rem', color: '#888', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          Capacity Regimes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
          {REGIMES.map((r) => (
            <div
              key={r.label}
              style={{
                padding: '0.75rem',
                background: `${r.color}08`,
                border: `1px solid ${r.color}25`,
                borderRadius: '6px',
                cursor: 'default',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: r.color, fontWeight: 600, marginBottom: '0.25rem' }}>
                {r.label}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{r.range}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key insight */}
      <KeyInsightBox />

      {/* Methodology note */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#0e0e0e',
          borderRadius: '6px',
          border: '1px solid #1a1a1a',
          fontSize: '0.8rem',
          color: '#666',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: '#888' }}>Methodology note:</strong> Trajectories between the two
        empirical anchors (0.5B and 14B) are interpolated using a sigmoid function centered at ~7B
        parameters on a logarithmic scale. Extrapolations below 0.5B and above 14B use the same
        model with diminishing returns. These are predictions, not observations -- treat them as
        hypotheses to be tested, not conclusions. The two observed data points constrain the model
        but do not fully determine it. Additional empirical work at intermediate scales (1B, 3B, 7B)
        would substantially improve prediction accuracy.
      </div>

      <ExplorerNav currentPath="/trajectory-explorer" />
        <RelatedConcepts currentPath="/trajectory-explorer" />
    </div>
  );
}
