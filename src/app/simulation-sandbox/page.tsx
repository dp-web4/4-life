'use client';

/**
 * Simulation Sandbox
 *
 * Full-control client-side Web4 simulation with live animated visualization.
 * Graduates from "Your First Simulation" into full experimentation mode.
 *
 * Features:
 * - All engine parameters exposed as sliders
 * - 4 presets + fully custom configuration
 * - Real-time animated trust/ATP/coherence charts
 * - Event timeline with live updates
 * - Multi-run comparison (overlay results)
 * - Exportable results (JSON/narrative)
 *
 * Session #40: Client-side simulation sandbox
 */

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';
import {
  SimulationEngine,
  SimConfig,
  DEFAULT_CONFIG,
  PRESETS,
  SimulationResult,
  SimEvent,
  LifeResult,
} from '@/lib/simulation/engine';

// ============================================================================
// Color helpers
// ============================================================================

function trustColor(t: number): string {
  if (t >= 0.7) return '#6ee7b7';
  if (t >= 0.5) return '#93c5fd';
  if (t >= 0.3) return '#fde68a';
  return '#fca5a5';
}

const RUN_COLORS = ['#6ee7b7', '#93c5fd', '#c4b5fd', '#fde68a', '#fca5a5'];

// ============================================================================
// Chart component with multi-run overlay
// ============================================================================

function OverlayChart({ runs, dataKey, label, height = 160, max, threshold }: {
  runs: { data: number[]; label: string }[];
  dataKey?: string;
  label: string;
  height?: number;
  max?: number;
  threshold?: number;
}) {
  if (runs.length === 0 || runs.every(r => r.data.length < 2)) return null;

  const allData = runs.flatMap(r => r.data);
  const maxVal = max ?? Math.max(...allData) * 1.1;
  const maxLen = Math.max(...runs.map(r => r.data.length));
  const w = 100;
  const h = height;

  return (
    <div>
      <div style={{
        fontSize: '0.7rem', color: 'var(--color-text-muted)',
        marginBottom: '0.375rem', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{label}</span>
        <span style={{ display: 'flex', gap: '0.5rem' }}>
          {runs.map((r, i) => (
            <span key={i} style={{ color: RUN_COLORS[i % RUN_COLORS.length], fontSize: '0.65rem' }}>
              {r.label}: {r.data[r.data.length - 1]?.toFixed(r.data[r.data.length - 1] > 10 ? 0 : 3)}
            </span>
          ))}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: `${h}px` }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map(pct => (
          <line key={pct} x1={0} y1={h * (1 - pct)} x2={w} y2={h * (1 - pct)}
            stroke="#ffffff08" strokeWidth="0.3" />
        ))}
        {/* Threshold */}
        {threshold !== undefined && (
          <line
            x1={0} y1={h - (threshold / maxVal) * h}
            x2={w} y2={h - (threshold / maxVal) * h}
            stroke="#ffffff30" strokeWidth="0.5" strokeDasharray="2,2"
          />
        )}
        {/* Data lines */}
        {runs.map((run, ri) => {
          const color = RUN_COLORS[ri % RUN_COLORS.length];
          const points = run.data.map((v, i) => {
            const x = (i / (maxLen - 1)) * w;
            const y = h - (v / maxVal) * h;
            return `${x},${y}`;
          }).join(' ');
          const fillPoints = `0,${h} ${points} ${((run.data.length - 1) / (maxLen - 1)) * w},${h}`;
          return (
            <g key={ri}>
              <polygon points={fillPoints} fill={`${color}08`} />
              <polyline points={points} fill="none" stroke={color} strokeWidth="1" opacity={0.8} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================================
// Parameter Slider
// ============================================================================

function ParamSlider({ label, value, min, max, step, onChange, tooltip, color }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  tooltip?: string;
  color?: string;
}) {
  return (
    <div style={{ marginBottom: '0.625rem' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '0.25rem',
      }}>
        <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}
          title={tooltip}>
          {label}
        </label>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, color: color || 'var(--color-text)',
          fontFamily: 'monospace',
        }}>
          {value > 1 ? value.toFixed(0) : value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: color || '#93c5fd' }}
      />
    </div>
  );
}

// ============================================================================
// Life Summary Row
// ============================================================================

function LifeRow({ life }: { life: LifeResult }) {
  const tc = life.endTrust - life.startTrust;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '50px 1fr 1fr 1fr 80px',
      gap: '0.5rem', padding: '0.5rem', fontSize: '0.75rem',
      borderBottom: '1px solid var(--color-border)',
      alignItems: 'center',
    }}>
      <span style={{ fontWeight: 700 }}>Life {life.lifeNumber}</span>
      <span>
        Trust: {life.startTrust.toFixed(3)} → <span style={{ color: trustColor(life.endTrust) }}>{life.endTrust.toFixed(3)}</span>
      </span>
      <span>ATP: {life.startATP} → {Math.round(life.endATP)}</span>
      <span>
        <span style={{ color: tc > 0 ? '#6ee7b7' : tc < 0 ? '#fca5a5' : 'var(--color-text-muted)' }}>
          {tc > 0 ? '+' : ''}{(tc * 100).toFixed(1)}%
        </span>
        {' '}{life.tickCount} ticks
      </span>
      <span style={{
        fontSize: '0.65rem', padding: '0.125rem 0.375rem', borderRadius: '999px',
        background: life.terminationReason === 'atp_exhaustion' ? '#fca5a515' : '#6ee7b715',
        color: life.terminationReason === 'atp_exhaustion' ? '#fca5a5' : '#6ee7b7',
        textAlign: 'center',
      }}>
        {life.terminationReason === 'atp_exhaustion' ? 'exhausted' : 'survived'}
      </span>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function SimulationSandboxPage() {
  // Config state
  const [config, setConfig] = useState<SimConfig>({ ...DEFAULT_CONFIG, ...PRESETS['gentle-start'] });
  const [activePreset, setActivePreset] = useState<string | null>('gentle-start');

  // Simulation state
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [liveTrust, setLiveTrust] = useState<number[]>([]);
  const [liveATP, setLiveATP] = useState<number[]>([]);
  const [liveCoherence, setLiveCoherence] = useState<number[]>([]);
  const [liveEvents, setLiveEvents] = useState<SimEvent[]>([]);
  const [currentLife, setCurrentLife] = useState(0);

  const abortRef = useRef(false);

  // Update a config parameter
  const setParam = useCallback((key: keyof SimConfig, value: number | boolean | string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  // Apply a preset
  const applyPreset = useCallback((name: string) => {
    const p = PRESETS[name];
    if (p) {
      setConfig(prev => ({ ...DEFAULT_CONFIG, ...p }));
      setActivePreset(name);
    }
  }, []);

  // Run simulation
  const runSimulation = useCallback(async () => {
    abortRef.current = false;
    setRunning(true);
    setLiveTrust([]);
    setLiveATP([]);
    setLiveCoherence([]);
    setLiveEvents([]);
    setCurrentLife(1);

    const engine = new SimulationEngine({ ...config, tickDelay: 0 });
    const result = engine.run();

    // Animate
    for (const life of result.lives) {
      setCurrentLife(life.lifeNumber);

      for (let i = 0; i < life.trustHistory.length; i++) {
        if (abortRef.current) break;

        const prevLives = result.lives.slice(0, life.lifeNumber - 1);
        const prevTrust = prevLives.flatMap(l => l.trustHistory);
        const prevATP = prevLives.flatMap(l => l.atpHistory);
        const prevCI = prevLives.flatMap(l => l.coherenceHistory);

        setLiveTrust([...prevTrust, ...life.trustHistory.slice(0, i + 1)]);
        setLiveATP([...prevATP, ...life.atpHistory.slice(0, i + 1)]);
        setLiveCoherence([...prevCI, ...life.coherenceHistory.slice(0, Math.min(i + 1, life.coherenceHistory.length))]);

        const tickEvents = result.events.filter(e => e.tick <= life.startTick + i);
        setLiveEvents(tickEvents);

        await new Promise(r => setTimeout(r, 30));
      }

      if (abortRef.current) break;
      await new Promise(r => setTimeout(r, 300));
    }

    // Store result for comparison
    setResults(prev => [...prev.slice(-4), result]); // Keep last 5 runs
    setRunning(false);
  }, [config]);

  const stopSim = () => { abortRef.current = true; setRunning(false); };
  const clearRuns = () => { setResults([]); setLiveTrust([]); setLiveATP([]); setLiveCoherence([]); setLiveEvents([]); };

  // Latest result
  const latestResult = results[results.length - 1];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/simulation-sandbox" />

      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.375rem',
        background: 'linear-gradient(135deg, #93c5fd, #c4b5fd)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Simulation Sandbox
      </h1>
      <p style={{
        color: 'var(--color-text-secondary)', marginBottom: '1.5rem',
        fontSize: '0.9rem', maxWidth: '700px', lineHeight: 1.6,
      }}>
        Full control over every parameter. Run simulations, compare results, and discover
        how trust dynamics respond to different conditions. Everything runs in your browser.
      </p>
      <p style={{
        color: '#6b7280', marginBottom: '1.5rem',
        fontSize: '0.8rem', maxWidth: '700px',
      }}>
        The <a href="/playground" style={{ color: '#38bdf8' }}>Playground</a> offers guided
        experiments with one agent. This sandbox exposes <em>every</em> engine parameter, lets you
        overlay multiple runs, and export results. Ready for multi-agent dynamics?
        Try the <a href="/society-simulator" style={{ color: '#38bdf8' }}>Society Simulator</a>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem' }}>

        {/* ============ LEFT: Controls ============ */}
        <div>
          {/* Presets */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              PRESETS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
              {Object.entries(PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  style={{
                    padding: '0.5rem', borderRadius: '0.375rem', fontSize: '0.7rem',
                    background: activePreset === key ? 'var(--color-bg-tertiary)' : 'transparent',
                    border: `1px solid ${activePreset === key ? '#93c5fd30' : 'var(--color-border)'}`,
                    color: activePreset === key ? 'var(--color-text)' : 'var(--color-text-muted)',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{p.agentName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Parameters */}
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              SIMULATION
            </div>
            <ParamSlider label="Lives" value={config.numLives} min={1} max={10} step={1}
              onChange={v => setParam('numLives', v)} tooltip="Number of life cycles" color="#c4b5fd" />
            <ParamSlider label="Ticks/Life" value={config.ticksPerLife} min={10} max={200} step={5}
              onChange={v => setParam('ticksPerLife', v)} tooltip="Duration of each life" />
            <ParamSlider label="Initial ATP" value={config.initialATP} min={20} max={500} step={10}
              onChange={v => setParam('initialATP', v)} tooltip="Starting energy" color="#fde68a" />
            <ParamSlider label="Initial Trust" value={config.initialTrust} min={0.05} max={0.95} step={0.05}
              onChange={v => setParam('initialTrust', v)} tooltip="Starting trust score" color="#6ee7b7" />
          </div>

          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              ECONOMICS
            </div>
            <ParamSlider label="Action Cost" value={config.actionCost} min={1} max={20} step={1}
              onChange={v => setParam('actionCost', v)} tooltip="ATP cost per action" color="#fca5a5" />
            <ParamSlider label="Contribution Reward" value={config.contributionReward} min={1} max={30} step={1}
              onChange={v => setParam('contributionReward', v)} tooltip="ATP earned per success" color="#6ee7b7" />
            <ParamSlider label="Success Rate" value={config.successRate} min={0.1} max={0.95} step={0.05}
              onChange={v => setParam('successRate', v)} tooltip="Probability of successful contribution" />
          </div>

          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              TRUST DYNAMICS
            </div>
            <ParamSlider label="Trust Gain Rate" value={config.trustGainRate} min={0.005} max={0.1} step={0.005}
              onChange={v => setParam('trustGainRate', v)} tooltip="Trust gained per successful action" color="#6ee7b7" />
            <ParamSlider label="Trust Loss Rate" value={config.trustLossRate} min={0.005} max={0.1} step={0.005}
              onChange={v => setParam('trustLossRate', v)} tooltip="Trust lost per failed action" color="#fca5a5" />
            <ParamSlider label="Karma Strength" value={config.karmaStrength} min={0} max={1} step={0.05}
              onChange={v => setParam('karmaStrength', v)} tooltip="How much trust carries forward on rebirth" color="#c4b5fd" />
          </div>

          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
              LEARNING
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
            }}>
              <input
                type="checkbox"
                checked={config.epEnabled}
                onChange={e => setParam('epEnabled', e.target.checked)}
                id="ep-toggle"
              />
              <label htmlFor="ep-toggle" style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                EP Learning Enabled
              </label>
            </div>
            {config.epEnabled && (
              <ParamSlider label="EP Learning Rate" value={config.epLearningRate} min={0.01} max={0.2} step={0.01}
                onChange={v => setParam('epLearningRate', v)} tooltip="How fast success rate improves per life" />
            )}
            <ParamSlider label="Coherence Weight" value={config.coherenceWeight} min={0} max={1} step={0.05}
              onChange={v => setParam('coherenceWeight', v)} tooltip="How much behavioral consistency amplifies trust" />
            <ParamSlider label="Noise" value={config.noise} min={0} max={0.5} step={0.025}
              onChange={v => setParam('noise', v)} tooltip="Randomness in action outcomes" />
          </div>

          {/* Run controls */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {!running ? (
              <button
                onClick={runSimulation}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                  color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Run
              </button>
            ) : (
              <button
                onClick={stopSim}
                style={{
                  flex: 1, padding: '0.75rem', borderRadius: '0.5rem',
                  background: '#fca5a5', color: '#000', fontWeight: 700,
                  border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                }}
              >
                Stop
              </button>
            )}
            {results.length > 0 && (
              <button
                onClick={clearRuns}
                style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.75rem',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              {results.length} run{results.length > 1 ? 's' : ''} stored (max 5)
              {results.length > 1 && ' — charts overlay all runs'}
            </div>
          )}
        </div>

        {/* ============ RIGHT: Results ============ */}
        <div>
          {/* Charts */}
          <div style={{
            display: 'grid', gap: '1rem', marginBottom: '1rem',
          }}>
            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            }}>
              <OverlayChart
                runs={[
                  // Live run (if active)
                  ...(liveTrust.length > 1 ? [{ data: liveTrust, label: 'Current' }] : []),
                  // Previous runs
                  ...results.slice(0, -1).map((r, i) => ({
                    data: r.lives.flatMap(l => l.trustHistory),
                    label: `Run ${i + 1}`,
                  })),
                ].reverse()}
                label="Trust"
                height={160}
                max={1}
                threshold={0.5}
              />
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            }}>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              }}>
                <OverlayChart
                  runs={[
                    ...(liveATP.length > 1 ? [{ data: liveATP, label: 'Current' }] : []),
                    ...results.slice(0, -1).map((r, i) => ({
                      data: r.lives.flatMap(l => l.atpHistory),
                      label: `Run ${i + 1}`,
                    })),
                  ].reverse()}
                  label="ATP"
                  height={120}
                />
              </div>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              }}>
                <OverlayChart
                  runs={[
                    ...(liveCoherence.length > 1 ? [{ data: liveCoherence, label: 'Current' }] : []),
                    ...results.slice(0, -1).map((r, i) => ({
                      data: r.lives.flatMap(l => l.coherenceHistory),
                      label: `Run ${i + 1}`,
                    })),
                  ].reverse()}
                  label="Coherence Index"
                  height={120}
                  max={1}
                />
              </div>
            </div>
          </div>

          {/* Life details */}
          {latestResult && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1rem',
            }}>
              <div style={{
                fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span style={{ fontWeight: 600 }}>LIFE BREAKDOWN</span>
                <span>
                  Overall: {latestResult.lives[0].startTrust.toFixed(3)} →{' '}
                  <span style={{ color: trustColor(latestResult.finalTrust) }}>
                    {latestResult.finalTrust.toFixed(3)}
                  </span>
                  {' '}({latestResult.trustGrowth > 0 ? '+' : ''}{(latestResult.trustGrowth * 100).toFixed(1)}%)
                </span>
              </div>
              {latestResult.lives.map(life => (
                <LifeRow key={life.lifeNumber} life={life} />
              ))}
            </div>
          )}

          {/* Events */}
          {liveEvents.length > 0 && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1rem', maxHeight: '240px', overflowY: 'auto',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                EVENTS ({liveEvents.length})
              </div>
              {liveEvents.slice(-10).reverse().map((e, i) => (
                <div key={i} style={{
                  fontSize: '0.75rem', padding: '0.375rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                }}>
                  <span style={{
                    color: e.type === 'death' || e.type === 'trust_collapse' ? '#fca5a5' :
                           e.type === 'rebirth' ? '#c4b5fd' :
                           e.type === 'maturation' || e.type === 'trust_spike' ? '#6ee7b7' :
                           e.type === 'threshold_crossed' ? '#93c5fd' : '#fde68a',
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                    whiteSpace: 'nowrap', minWidth: '70px',
                  }}>
                    {e.type.replace(/_/g, ' ')}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{e.message}</span>
                </div>
              ))}
            </div>
          )}

          {/* Comparison summary (when multiple runs) */}
          {results.length > 1 && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: '#93c5fd08', border: '1px solid #93c5fd20',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.7rem', color: '#93c5fd', marginBottom: '0.5rem', fontWeight: 600 }}>
                RUN COMPARISON
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(results.length, 5)}, 1fr)`, gap: '0.5rem' }}>
                {results.map((r, i) => (
                  <div key={i} style={{
                    padding: '0.5rem', borderRadius: '0.375rem',
                    background: 'var(--color-bg-secondary)',
                    borderLeft: `3px solid ${RUN_COLORS[i % RUN_COLORS.length]}`,
                    fontSize: '0.7rem',
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Run {i + 1}</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>
                      Trust: {r.finalTrust.toFixed(3)}
                    </div>
                    <div style={{ color: r.trustGrowth > 0 ? '#6ee7b7' : '#fca5a5' }}>
                      {r.trustGrowth > 0 ? '+' : ''}{(r.trustGrowth * 100).toFixed(1)}%
                    </div>
                    <div style={{ color: 'var(--color-text-muted)' }}>
                      {r.totalTicks} ticks
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export */}
          {latestResult && (
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1rem',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  EXPORT
                </span>
                <div style={{ display: 'flex', gap: '0.375rem' }}>
                  <button
                    onClick={() => {
                      const data = JSON.stringify(latestResult, null, 2);
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `simulation-${Date.now()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    style={{
                      padding: '0.375rem 0.75rem', borderRadius: '0.25rem',
                      background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.7rem',
                    }}
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => {
                      const lines = [
                        `# Simulation Results`,
                        ``,
                        `**Agent**: ${latestResult.config.agentName}`,
                        `**Lives**: ${latestResult.lives.length} | **Ticks**: ${latestResult.totalTicks}`,
                        `**Trust**: ${latestResult.lives[0].startTrust.toFixed(3)} → ${latestResult.finalTrust.toFixed(3)} (${latestResult.trustGrowth > 0 ? '+' : ''}${(latestResult.trustGrowth * 100).toFixed(1)}%)`,
                        ``,
                        `## Events`,
                        ...latestResult.events.map(e => `- **${e.type.replace(/_/g, ' ')}** (Life ${e.lifeNumber}): ${e.message}`),
                        ``,
                        `## Life Details`,
                        ...latestResult.lives.map(l =>
                          `- Life ${l.lifeNumber}: Trust ${l.startTrust.toFixed(3)} → ${l.endTrust.toFixed(3)}, ATP ${l.startATP} → ${Math.round(l.endATP)}, ${l.tickCount} ticks (${l.terminationReason})`
                        ),
                      ];
                      const text = lines.join('\n');
                      navigator.clipboard.writeText(text);
                    }}
                    style={{
                      padding: '0.375rem 0.75rem', borderRadius: '0.25rem',
                      background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.7rem',
                    }}
                  >
                    Copy Markdown
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {results.length === 0 && !running && (
            <div style={{
              padding: '3rem 2rem', borderRadius: '0.75rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.4 }}>
                ◇
              </div>
              <div style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                Configure parameters and click <strong>Run</strong> to start
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Multiple runs will overlay on the same charts for comparison
              </div>
            </div>
          )}

          {/* Tips */}
          <div style={{
            padding: '1rem', borderRadius: '0.5rem',
            background: '#fde68a08', border: '1px solid #fde68a15',
            marginTop: '1rem',
          }}>
            <div style={{ fontSize: '0.7rem', color: '#fde68a', fontWeight: 600, marginBottom: '0.375rem' }}>
              EXPERIMENT IDEAS
            </div>
            <ul style={{
              fontSize: '0.75rem', color: 'var(--color-text-secondary)',
              lineHeight: 1.8, paddingLeft: '1rem', margin: 0,
            }}>
              <li>Compare &ldquo;Gentle Start&rdquo; vs &ldquo;Harsh World&rdquo; &mdash; how does environment shape outcomes?</li>
              <li>Toggle EP Learning off &mdash; does the agent still improve across lives?</li>
              <li>Set Karma Strength to 0 &mdash; what happens without consequences?</li>
              <li>Max out Noise (0.5) &mdash; can trust emerge from chaos?</li>
              <li>Set Trust Loss Rate higher than Gain Rate &mdash; is trust even possible?</li>
            </ul>
          </div>

          {/* Related tools */}
          <div style={{
            display: 'flex', gap: '0.75rem', marginTop: '1rem',
            flexWrap: 'wrap',
          }}>
            <Link href="/first-simulation" style={{
              padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.75rem',
            }}>
              Guided Walkthrough
            </Link>
            <Link href="/playground" style={{
              padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.75rem',
            }}>
              Parameter Playground
            </Link>
            <Link href="/trust-tensor-explorer" style={{
              padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.75rem',
            }}>
              Trust Tensor Explorer
            </Link>
            <Link href="/narratives" style={{
              padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.75rem',
            }}>
              Narratives
            </Link>
          </div>
        </div>
      </div>

      <ExplorerNav currentPath="/simulation-sandbox" />
      <div style={{ marginTop: '2rem' }}>
        <RelatedConcepts currentPath="/simulation-sandbox" />
      </div>
    </div>
  );
}
