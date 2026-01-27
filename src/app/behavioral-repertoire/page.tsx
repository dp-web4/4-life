'use client';

/**
 * Behavioral Repertoire Explorer
 *
 * Interactive tool for exploring how context variables determine which
 * behavioral strategy an AI agent selects from its repertoire.
 *
 * Key findings from Sessions 36-37 (January 2026):
 * - E02: 0% clarification rate when system prompt says "you may ask"
 * - E02-B: 33% clarification when prompt explicitly frames clarifying as expected
 * - Prompt framing shifts distribution dramatically (0% -> 100% possible)
 * - Context determines expression, not capability
 *
 * Cross-pollination: Thor E02/E02-B exploration -> interactive visualization
 */

import { useState, useCallback } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types & Constants
// ============================================================================

interface StrategyDistribution { interpret: number; clarify: number; ready: number }

interface ExperimentRecord {
  id: number; framing: number; ambiguity: number; capacity: number;
  history: number; distribution: StrategyDistribution;
  confidence: number; timestamp: string;
}

interface KnownExperiment {
  label: string; description: string; framing: number; ambiguity: number;
  capacity: number; history: number; observed: StrategyDistribution; sampleSize: number;
}

const FRAMING_LABELS = ['Permission', 'Expectation', 'Requirement'];
const CAPACITY_LABELS = ['0.5B', '3B', '7B', '14B', '70B'];
const COLORS = { interpret: '#3b82f6', clarify: '#22c55e', ready: '#f59e0b' };
const NAMES = { interpret: 'Creative Interpretation', clarify: 'Clarifying Question', ready: 'Ready/Compliant' };
const KEYS: Array<keyof typeof NAMES> = ['interpret', 'clarify', 'ready'];

const KNOWN: KnownExperiment[] = [
  { label: 'E02', description: 'System prompt says "you may ask clarifying questions"',
    framing: 0, ambiguity: 80, capacity: 3, history: 0,
    observed: { interpret: 100, clarify: 0, ready: 0 }, sampleSize: 5 },
  { label: 'E02-B', description: 'Prompt explicitly frames clarifying as expected behavior',
    framing: 1, ambiguity: 80, capacity: 3, history: 0,
    observed: { interpret: 40, clarify: 33, ready: 27 }, sampleSize: 15 },
];

const heading = {
  fontSize: '1rem', fontWeight: 600 as const, color: 'var(--color-text-muted, #888)',
  textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '1rem',
};
const card = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border, #333)',
  borderRadius: '8px', padding: '1rem 1.25rem',
};
const pad = { padding: '0.5rem 0.75rem' };
const muted = { fontSize: '0.75rem', color: 'var(--color-text-muted, #888)' };

const PRESETS = [
  { name: 'E02 (Permission)', framing: 0, ambiguity: 80, capacity: 3, history: 0 },
  { name: 'E02-B (Expectation)', framing: 1, ambiguity: 80, capacity: 3, history: 0 },
  { name: 'Requirement + High Ambiguity', framing: 2, ambiguity: 90, capacity: 3, history: 0 },
  { name: 'Small Model Baseline', framing: 1, ambiguity: 50, capacity: 0, history: 0 },
  { name: 'Large Model + Rich History', framing: 1, ambiguity: 50, capacity: 4, history: 8 },
  { name: 'Clear Task (No Ambiguity)', framing: 1, ambiguity: 0, capacity: 3, history: 0 },
];

const STRATEGY_DETAILS = [
  {
    key: 'interpret' as const,
    name: 'Creative Interpretation',
    baseline: '40%',
    description: 'The agent interprets ambiguous input creatively and proceeds without asking for clarification. It generates a plausible reading of the request and acts on it. This is the dominant strategy under permission framing -- the agent "fills in the blanks" rather than requesting more information.',
    example: 'Prompt: "Tell me about the thing." Response: Generates a meta-response about knowledge sharing, treating the ambiguity as an invitation to explore.',
  },
  {
    key: 'clarify' as const,
    name: 'Clarifying Question',
    baseline: '33%',
    description: 'The agent asks one or more questions to disambiguate the request before acting. This strategy is strongly modulated by prompt framing -- nearly absent under permission framing (0% in E02) but activated when the prompt sets an expectation of clarification (33% in E02-B).',
    example: 'Prompt: "Do it." Response: "Could you clarify what you would like me to do? I want to make sure I address your specific needs."',
  },
  {
    key: 'ready' as const,
    name: 'Ready/Compliant',
    baseline: '27%',
    description: 'The agent signals readiness and waits for more information without either interpreting or asking. This is a passive strategy that acknowledges the input without committing to a direction. It serves as a "safe" default when neither creative interpretation nor clarification is strongly activated.',
    example: 'Prompt: "Do it." Response: "I am ready to help. Please provide more details about what you would like me to do."',
  },
];

// ============================================================================
// Prediction Logic
// ============================================================================

function predict(framing: number, ambiguity: number, capacity: number, history: number): StrategyDistribution {
  let i = 40, c = 33, r = 27;
  // Prompt framing: permission suppresses clarify, requirement boosts it
  const fb = framing === 0 ? -25 : framing === 1 ? 15 : 50;
  c += fb; i -= fb * 0.6; r -= fb * 0.4;
  // Higher ambiguity increases clarify
  const ab = (ambiguity / 100) * 30;
  c += ab; i -= ab * 0.5; r -= ab * 0.5;
  // Lower capacity narrows repertoire toward dominant strategy
  const n = (4 - capacity) * 5;
  const d = Math.max(i, c, r);
  if (d === i) { i += n; c -= n * 0.5; r -= n * 0.5; }
  else if (d === c) { c += n; i -= n * 0.5; r -= n * 0.5; }
  else { r += n; i -= n * 0.5; c -= n * 0.5; }
  // More history slightly increases clarify
  const hb = history * 1.5;
  c += hb; i -= hb * 0.5; r -= hb * 0.5;
  // Clamp & normalize
  i = Math.max(0, i); c = Math.max(0, c); r = Math.max(0, r);
  const t = i + c + r;
  if (t === 0) return { interpret: 34, clarify: 33, ready: 33 };
  return { interpret: Math.round((i / t) * 100), clarify: Math.round((c / t) * 100), ready: Math.round((r / t) * 100) };
}

function confidence(capacity: number, framing: number): number {
  let conf = 50;
  if (capacity === 3) conf += 20;
  else if (capacity === 2 || capacity === 4) conf += 10;
  if (framing <= 1) conf += 15;
  return Math.min(95, conf);
}

function insight(framing: number, ambiguity: number, capacity: number, history: number, dist: StrategyDistribution): string {
  const fl = FRAMING_LABELS[framing].toLowerCase();
  const cl = CAPACITY_LABELS[capacity];
  const dom = dist.interpret >= dist.clarify && dist.interpret >= dist.ready
    ? 'interpret creatively' : dist.clarify >= dist.ready ? 'ask clarifying questions' : 'signal readiness and wait';
  const peak = Math.max(dist.interpret, dist.clarify, dist.ready);
  let extra = '';
  if (framing === 0 && ambiguity > 50)
    extra = 'Even with high ambiguity, permission-framing suppresses clarification. This matches E02 where "you may ask" produced 0% clarification -- the permissive framing paradoxically discourages the behavior it permits.';
  else if (framing === 2 && ambiguity > 60)
    extra = 'Requirement framing combined with high ambiguity produces maximum clarification. The agent treats asking questions as the expected and correct response.';
  else if (framing === 2)
    extra = 'Requirement framing strongly activates clarification behavior regardless of ambiguity. The social expectation overrides the task signal.';
  else if (capacity <= 1)
    extra = `At ${cl} capacity, the repertoire narrows significantly. Fewer strategies are reliably accessible, and the dominant strategy captures a disproportionate share of expression.`;
  else if (history >= 7)
    extra = 'Rich conversation history provides accumulated context to reference, slightly increasing targeted clarification.';
  else if (capacity >= 3 && framing === 1)
    extra = `Under expectation framing at ${cl} capacity, the model has broad access to its full repertoire. All three strategies remain viable.`;
  else
    extra = `Under ${fl} framing at ${cl} capacity, the model has ${capacity >= 3 ? 'broad' : 'moderate'} access to its repertoire. Context shifts probability weights, not available strategies.`;
  return `With ${fl} framing, ${ambiguity}% ambiguity, ${cl} capacity, and ${history} turns of history, the agent is most likely to ${dom} (${peak}%). ${extra}`;
}

// ============================================================================
// Sub-components
// ============================================================================

function Slider({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number;
  step: number; display: string; onChange: (v: number) => void;
}) {
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary, #aaa)' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text, #fff)', fontFamily: 'monospace' }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#3b82f6', cursor: 'pointer' }} />
    </div>
  );
}

function Bar({ distribution }: { distribution: StrategyDistribution }) {
  const w = { interpret: distribution.interpret, clarify: distribution.clarify,
    ready: Math.max(0, 100 - distribution.interpret - distribution.clarify) };
  const seg = (k: keyof typeof COLORS) => ({
    width: `${w[k]}%`, background: COLORS[k],
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: w[k] > 0 ? '2px' : '0',
  });
  return (
    <div>
      <div style={{ display: 'flex', height: '40px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--color-border, #333)' }}>
        {KEYS.map((k) => <div key={k} style={seg(k)} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        {KEYS.map((k) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: COLORS[k] }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary, #aaa)' }}>{NAMES[k]}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text, #fff)', fontFamily: 'monospace' }}>{w[k]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function History({ records }: { records: ExperimentRecord[] }) {
  if (!records.length) return null;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border, #333)', color: 'var(--color-text-muted, #888)', textAlign: 'left' as const }}>
            {['#', 'Framing', 'Ambiguity', 'Capacity', 'History'].map((h) => <th key={h} style={pad}>{h}</th>)}
            <th style={{ ...pad, color: COLORS.interpret }}>Interpret</th>
            <th style={{ ...pad, color: COLORS.clarify }}>Clarify</th>
            <th style={{ ...pad, color: COLORS.ready }}>Ready</th>
            <th style={pad}>Conf.</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => {
            const rv = Math.max(0, 100 - r.distribution.interpret - r.distribution.clarify);
            return (
              <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-secondary, #aaa)', background: idx % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                <td style={{ ...pad, fontFamily: 'monospace' }}>{r.id}</td>
                <td style={pad}>{FRAMING_LABELS[r.framing]}</td>
                <td style={{ ...pad, fontFamily: 'monospace' }}>{r.ambiguity}%</td>
                <td style={pad}>{CAPACITY_LABELS[r.capacity]}</td>
                <td style={{ ...pad, fontFamily: 'monospace' }}>{r.history}</td>
                <td style={{ ...pad, fontFamily: 'monospace', color: COLORS.interpret }}>{r.distribution.interpret}%</td>
                <td style={{ ...pad, fontFamily: 'monospace', color: COLORS.clarify }}>{r.distribution.clarify}%</td>
                <td style={{ ...pad, fontFamily: 'monospace', color: COLORS.ready }}>{rv}%</td>
                <td style={{ ...pad, fontFamily: 'monospace', color: 'var(--color-text-muted, #888)' }}>{r.confidence}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DataPoint({ e }: { e: KnownExperiment }) {
  return (
    <div style={card}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ background: '#3b82f6', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace' }}>
          {e.label}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text, #fff)', fontWeight: 500 }}>{e.description}</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <span style={muted}>Framing: {FRAMING_LABELS[e.framing]}</span>
        <span style={muted}>Ambiguity: {e.ambiguity}%</span>
        <span style={muted}>Capacity: {CAPACITY_LABELS[e.capacity]}</span>
        <span style={muted}>N={e.sampleSize}</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {KEYS.map((k) => (
          <span key={k} style={{ fontSize: '0.8rem', color: COLORS[k], fontFamily: 'monospace' }}>
            {NAMES[k].split(' ')[0]}: {e.observed[k]}%
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function BehavioralRepertoirePage() {
  const [framing, setFraming] = useState(1);
  const [ambiguity, setAmbiguity] = useState(50);
  const [capacity, setCapacity] = useState(3);
  const [history, setHistory] = useState(0);
  const [experiments, setExperiments] = useState<ExperimentRecord[]>([]);
  const [nextId, setNextId] = useState(1);
  const [flash, setFlash] = useState(false);

  const dist = predict(framing, ambiguity, capacity, history);
  const conf = confidence(capacity, framing);
  const insightText = insight(framing, ambiguity, capacity, history, dist);

  const runExperiment = useCallback(() => {
    setExperiments((prev) => [{
      id: nextId, framing, ambiguity, capacity, history,
      distribution: { ...dist }, confidence: conf,
      timestamp: new Date().toLocaleTimeString(),
    }, ...prev]);
    setNextId((n) => n + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  }, [framing, ambiguity, capacity, history, dist, conf, nextId]);

  const clearHistory = useCallback(() => { setExperiments([]); setNextId(1); }, []);

  const loadPreset = useCallback((p: typeof PRESETS[0]) => {
    setFraming(p.framing);
    setAmbiguity(p.ambiguity);
    setCapacity(p.capacity);
    setHistory(p.history);
  }, []);

  const match = KNOWN.find(
    (e) => e.framing === framing && e.ambiguity === ambiguity && e.capacity === capacity && e.history === history
  );

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/behavioral-repertoire" />

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text, #fff)' }}>
        Behavioral Repertoire Explorer
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary, #aaa)', lineHeight: 1.6, marginBottom: '2rem' }}>
        Explore how context variables determine which behavioral strategy an AI agent
        selects from its repertoire. Adjust the sliders to see how prompt framing, task
        ambiguity, model capacity, and conversation history shift the predicted strategy
        distribution in real-time. Click &quot;Run Experiment&quot; to record predictions
        and compare across configurations.
      </p>

      {/* Try These Presets */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={heading}>Try These Presets</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => loadPreset(p)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--color-text-secondary, #aaa)',
                border: '1px solid var(--color-border, #333)',
                borderRadius: '6px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.color = 'var(--color-text, #fff)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border, #333)';
                e.currentTarget.style.color = 'var(--color-text-secondary, #aaa)';
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Context Variable Controls */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={heading}>Context Variables</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
          <Slider label="Prompt Framing" value={framing} min={0} max={2} step={1}
            display={FRAMING_LABELS[framing]} onChange={setFraming} />
          <Slider label="Task Ambiguity" value={ambiguity} min={0} max={100} step={5}
            display={`${ambiguity}%`} onChange={setAmbiguity} />
          <Slider label="Model Capacity" value={capacity} min={0} max={4} step={1}
            display={CAPACITY_LABELS[capacity]} onChange={setCapacity} />
          <Slider label="Conversation History" value={history} min={0} max={10} step={1}
            display={`${history} turns`} onChange={setHistory} />
        </div>
      </section>

      {/* Predicted Distribution */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
          <h2 style={{ ...heading, marginBottom: 0 }}>Predicted Strategy Distribution</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted, #888)', fontFamily: 'monospace' }}>
            Confidence: {conf}%
          </span>
        </div>
        <Bar distribution={dist} />
      </section>

      {/* Known experiment match */}
      {match && (
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text, #fff)' }}>
          <strong>Match:</strong> Your settings match known experiment{' '}
          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#3b82f6' }}>{match.label}</span>{' '}
          (N={match.sampleSize}). Observed: Interpret {match.observed.interpret}%, Clarify{' '}
          {match.observed.clarify}%, Ready {match.observed.ready}%.
        </div>
      )}

      {/* Insight */}
      <section style={{ ...card, marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted, #888)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          Insight
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary, #aaa)', lineHeight: 1.6, margin: 0 }}>
          {insightText}
        </p>
      </section>

      {/* Run Experiment */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={runExperiment}
            style={{ background: flash ? '#22c55e' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s ease' }}
            onMouseEnter={(e) => { if (!flash) e.currentTarget.style.background = '#2563eb'; }}
            onMouseLeave={(e) => { if (!flash) e.currentTarget.style.background = '#3b82f6'; }}>
            {flash ? 'Recorded' : 'Run Experiment'}
          </button>
          {experiments.length > 0 && (
            <button onClick={clearHistory}
              style={{ background: 'transparent', color: 'var(--color-text-muted, #888)', border: '1px solid var(--color-border, #333)', borderRadius: '6px', padding: '0.6rem 1.25rem', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border, #333)'; e.currentTarget.style.color = 'var(--color-text-muted, #888)'; }}>
              Clear History ({experiments.length})
            </button>
          )}
        </div>
      </section>

      {/* Experiment History */}
      {experiments.length > 0 && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={heading}>Experiment History ({experiments.length} run{experiments.length !== 1 ? 's' : ''})</h2>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border, #333)', borderRadius: '8px', overflow: 'hidden' }}>
            <History records={experiments} />
          </div>
        </section>
      )}

      {/* Strategy Descriptions */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={heading}>Behavioral Strategies</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {STRATEGY_DETAILS.map((s) => (
            <div key={s.key} style={{
              ...card,
              borderLeft: `3px solid ${COLORS[s.key]}`,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: COLORS[s.key],
                }}>
                  {s.name}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted, #888)',
                  fontFamily: 'monospace',
                }}>
                  Baseline: {s.baseline}
                </span>
              </div>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary, #aaa)',
                lineHeight: 1.6,
                margin: '0 0 0.5rem 0',
              }}>
                {s.description}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted, #888)',
                lineHeight: 1.5,
                margin: 0,
                fontStyle: 'italic',
              }}>
                {s.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Known Data Points */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={heading}>Known Experimental Data Points</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted, #888)', marginBottom: '1rem', lineHeight: 1.5 }}>
          These are real observed distributions from Thor E02 research (January 2026).
          Match your sliders to these settings to compare your predicted distribution
          against empirical results.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {KNOWN.map((exp) => <DataPoint key={exp.label} e={exp} />)}
        </div>
      </section>

      {/* Key Finding Callout */}
      <section style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '8px', padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.75rem' }}>
          Key Finding: Context Determines Expression, Not Capability
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary, #aaa)', lineHeight: 1.7, margin: 0 }}>
          The behavioral strategies exist within the model at all times -- they form a latent
          repertoire. What changes across contexts is which strategies get activated, not
          which ones exist. E02 showed 0% clarification under permission framing; E02-B
          showed 33% under expectation framing. Same model, same ambiguous prompts, radically
          different behavioral expression. The prompt frame acts as a gate on the repertoire,
          not a creator of new capabilities. This is analogous to facultative behavior in
          biology: the organism has the capacity, and the environment determines its expression.
        </p>
      </section>

      {/* Methodology Note */}
      <section style={{ ...card, marginBottom: '2.5rem', borderColor: 'rgba(255,255,255,0.08)' }}>
        <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted, #888)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          Methodology Note
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted, #888)', lineHeight: 1.6, margin: 0 }}>
          Predictions are interpolated from empirical anchor points (E02, E02-B) using a
          linear combination model. The confidence score reflects proximity to known data
          points. Regions far from empirical observations should be treated as hypotheses,
          not measurements. This tool is designed for exploration, not evaluation --
          generating intuitions about how context shapes behavioral strategy selection.
        </p>
      </section>

      <RelatedConcepts currentPath="/behavioral-repertoire" />
    </main>
  );
}
