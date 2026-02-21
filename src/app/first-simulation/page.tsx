'use client';

/**
 * Your First Simulation - Guided Walkthrough
 *
 * A step-by-step interactive experience that takes a complete beginner
 * from "what is this?" to "I just watched trust evolve" in 5 minutes.
 *
 * Uses the client-side simulation engine - no backend required.
 *
 * Design philosophy:
 * - Progressive disclosure (reveal complexity gradually)
 * - Narrative first (explain with story, not math)
 * - Interactive always (every concept has a button to try)
 * - Celebrate discovery (highlight interesting moments)
 *
 * Session #40: First guided simulation experience
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import {
  SimulationEngine,
  SimConfig,
  DEFAULT_CONFIG,
  PRESETS,
  TickState,
  SimEvent,
  LifeResult,
  SimulationResult,
} from '@/lib/simulation/engine';

// ============================================================================
// Step definitions
// ============================================================================

type StepId = 'intro' | 'meet-agent' | 'first-life' | 'understanding' |
              'karma' | 'explore' | 'insights';

interface Step {
  id: StepId;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  { id: 'intro', title: 'Welcome', subtitle: 'What you\'re about to see' },
  { id: 'meet-agent', title: 'Meet Your Agent', subtitle: 'A newcomer enters Web4' },
  { id: 'first-life', title: 'First Life', subtitle: 'Watch trust unfold' },
  { id: 'understanding', title: 'What Happened?', subtitle: 'Reading the results' },
  { id: 'karma', title: 'Death & Rebirth', subtitle: 'Karma in action' },
  { id: 'explore', title: 'Full Simulation', subtitle: 'Run with your settings' },
  { id: 'insights', title: 'What You Learned', subtitle: 'Key takeaways' },
];

// ============================================================================
// Color helpers
// ============================================================================

function trustColor(trust: number): string {
  if (trust >= 0.7) return '#6ee7b7';
  if (trust >= 0.5) return '#93c5fd';
  if (trust >= 0.3) return '#fde68a';
  return '#fca5a5';
}

function atpColor(atp: number, max: number): string {
  const ratio = atp / max;
  if (ratio > 0.5) return '#6ee7b7';
  if (ratio > 0.2) return '#fde68a';
  return '#fca5a5';
}

// ============================================================================
// Mini chart component
// ============================================================================

function MiniChart({ data, color, label, height = 120, max, threshold }: {
  data: number[];
  color: string;
  label: string;
  height?: number;
  max?: number;
  threshold?: number;
}) {
  if (data.length < 2) return null;

  const maxVal = max ?? Math.max(...data) * 1.1;
  const minVal = 0;
  const w = 100;
  const h = height;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - minVal) / (maxVal - minVal)) * h;
    return `${x},${y}`;
  }).join(' ');

  const fillPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{
        fontSize: '0.7rem', color: 'var(--color-text-muted)',
        marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{label}</span>
        <span style={{ color }}>{data[data.length - 1]?.toFixed(data[data.length - 1] > 10 ? 0 : 3)}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: `${h}px` }}>
        {/* Fill */}
        <polygon points={fillPoints} fill={`${color}15`} />
        {/* Line */}
        <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
        {/* Threshold line */}
        {threshold !== undefined && (
          <line
            x1={0} y1={h - ((threshold - minVal) / (maxVal - minVal)) * h}
            x2={w} y2={h - ((threshold - minVal) / (maxVal - minVal)) * h}
            stroke="#ffffff30" strokeWidth="0.5" strokeDasharray="2,2"
          />
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// Event log component
// ============================================================================

function EventLog({ events, maxShow = 5 }: { events: SimEvent[]; maxShow?: number }) {
  const shown = events.slice(-maxShow);
  return (
    <div style={{
      background: '#0a0a0f', border: '1px solid var(--color-border)',
      borderRadius: '0.5rem', padding: '0.75rem', maxHeight: '200px', overflowY: 'auto',
    }}>
      {shown.length === 0 ? (
        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontStyle: 'italic' }}>
          Waiting for events...
        </div>
      ) : (
        shown.map((e, i) => (
          <div key={i} style={{
            fontSize: '0.75rem', padding: '0.375rem 0',
            borderBottom: i < shown.length - 1 ? '1px solid var(--color-border)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{
                color: e.type === 'death' ? '#fca5a5' :
                       e.type === 'rebirth' ? '#c4b5fd' :
                       e.type === 'trust_spike' ? '#6ee7b7' :
                       e.type === 'trust_collapse' ? '#fca5a5' :
                       e.type === 'threshold_crossed' ? '#93c5fd' :
                       e.type === 'maturation' ? '#6ee7b7' :
                       '#fde68a',
                fontWeight: 700,
                fontSize: '0.65rem',
                textTransform: 'uppercase',
              }}>
                {e.type.replace('_', ' ')}
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>
                Life {e.lifeNumber}
              </span>
            </div>
            <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.125rem' }}>
              {e.message}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ============================================================================
// Life summary card
// ============================================================================

function LifeSummary({ life, isActive }: { life: LifeResult; isActive?: boolean }) {
  const trustChange = life.endTrust - life.startTrust;
  const grew = trustChange > 0;

  return (
    <div style={{
      padding: '0.75rem',
      borderRadius: '0.5rem',
      background: isActive ? 'var(--color-bg-tertiary)' : 'var(--color-bg-secondary)',
      border: `1px solid ${isActive ? trustColor(life.endTrust) + '40' : 'var(--color-border)'}`,
      transition: 'all 0.3s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Life {life.lifeNumber}</span>
        <span style={{
          fontSize: '0.65rem', padding: '0.125rem 0.375rem', borderRadius: '999px',
          background: life.terminationReason === 'atp_exhaustion' ? '#fca5a520' : '#6ee7b720',
          color: life.terminationReason === 'atp_exhaustion' ? '#fca5a5' : '#6ee7b7',
        }}>
          {life.terminationReason === 'atp_exhaustion' ? 'ATP exhausted' : 'Survived'}
        </span>
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        <div>Trust: {life.startTrust.toFixed(3)} → <span style={{ color: trustColor(life.endTrust) }}>{life.endTrust.toFixed(3)}</span>
          <span style={{ color: grew ? '#6ee7b7' : '#fca5a5', marginLeft: '0.375rem' }}>
            ({grew ? '+' : ''}{(trustChange * 100).toFixed(1)}%)
          </span>
        </div>
        <div>ATP: {life.startATP} → {Math.round(life.endATP)} | {life.tickCount} ticks</div>
        {life.karmaEarned !== 0 && (
          <div style={{ color: '#c4b5fd' }}>
            Karma: {life.karmaEarned > 0 ? '+' : ''}{life.karmaEarned.toFixed(3)}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function FirstSimulationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [highestStep, setHighestStep] = useState(0);
  const [simRunning, setSimRunning] = useState(false);
  const [simDone, setSimDone] = useState(false);

  // First life (guided)
  const [firstLifeTrust, setFirstLifeTrust] = useState<number[]>([]);
  const [firstLifeATP, setFirstLifeATP] = useState<number[]>([]);
  const [firstLifeEvents, setFirstLifeEvents] = useState<SimEvent[]>([]);
  const [firstLifeTicks, setFirstLifeTicks] = useState<TickState[]>([]);

  // Full simulation
  const [fullResult, setFullResult] = useState<SimulationResult | null>(null);
  const [fullLiveTrust, setFullLiveTrust] = useState<number[]>([]);
  const [fullLiveATP, setFullLiveATP] = useState<number[]>([]);
  const [fullLiveEvents, setFullLiveEvents] = useState<SimEvent[]>([]);
  const [currentLife, setCurrentLife] = useState(1);

  // Custom config
  const [preset, setPreset] = useState('gentle-start');
  const [customConfig, setCustomConfig] = useState<Partial<SimConfig>>({});

  const abortRef = useRef(false);

  // ============================================================================
  // Run first life (guided, single life)
  // ============================================================================

  const runFirstLife = useCallback(async () => {
    abortRef.current = false;
    setSimRunning(true);
    setSimDone(false);
    setFirstLifeTrust([0.3]);
    setFirstLifeATP([100]);
    setFirstLifeEvents([]);
    setFirstLifeTicks([]);

    const engine = new SimulationEngine({
      ...PRESETS['gentle-start'],
      numLives: 1,
      ticksPerLife: 40,
      tickDelay: 0,
    });

    const result = engine.run();
    const life = result.lives[0];

    // Animate the results
    for (let i = 0; i < life.trustHistory.length; i++) {
      if (abortRef.current) break;

      setFirstLifeTrust(life.trustHistory.slice(0, i + 1));
      setFirstLifeATP(life.atpHistory.slice(0, i + 1));

      // Add events up to this tick
      const tickEvents = result.events.filter(e => e.tick <= life.startTick + i);
      setFirstLifeEvents(tickEvents);

      if (i < life.ticks.length) {
        setFirstLifeTicks(prev => [...prev, life.ticks[i]]);
      }

      await new Promise(r => setTimeout(r, 80));
    }

    setSimRunning(false);
    setSimDone(true);
  }, []);

  // ============================================================================
  // Run full simulation (multi-life)
  // ============================================================================

  const runFullSimulation = useCallback(async () => {
    abortRef.current = false;
    setSimRunning(true);
    setSimDone(false);
    setFullLiveTrust([]);
    setFullLiveATP([]);
    setFullLiveEvents([]);
    setFullResult(null);
    setCurrentLife(1);

    const presetConfig = PRESETS[preset] || {};
    const config: Partial<SimConfig> = {
      ...presetConfig,
      ...customConfig,
      tickDelay: 0,
    };

    const engine = new SimulationEngine(config);
    const result = engine.run();
    setFullResult(result);

    // Animate all lives
    for (const life of result.lives) {
      setCurrentLife(life.lifeNumber);
      for (let i = 0; i < life.trustHistory.length; i++) {
        if (abortRef.current) break;

        // Build cumulative trust/ATP arrays across all lives
        const prevLives = result.lives.slice(0, life.lifeNumber - 1);
        const prevTrust = prevLives.flatMap(l => l.trustHistory);
        const prevATP = prevLives.flatMap(l => l.atpHistory);

        setFullLiveTrust([...prevTrust, ...life.trustHistory.slice(0, i + 1)]);
        setFullLiveATP([...prevATP, ...life.atpHistory.slice(0, i + 1)]);

        const tickEvents = result.events.filter(e => e.tick <= life.startTick + i);
        setFullLiveEvents(tickEvents);

        await new Promise(r => setTimeout(r, 40));
      }

      if (abortRef.current) break;
      // Pause between lives
      await new Promise(r => setTimeout(r, 500));
    }

    setSimRunning(false);
    setSimDone(true);
  }, [preset, customConfig]);

  const stopSimulation = () => {
    abortRef.current = true;
    setSimRunning(false);
  };

  // Advance step
  const nextStep = () => {
    setCurrentStep(s => {
      const next = Math.min(s + 1, STEPS.length - 1);
      setHighestStep(h => Math.max(h, next));
      return next;
    });
  };
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0));

  const step = STEPS[currentStep];

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/first-simulation" />

      {/* Progress bar */}
      <div style={{
        display: 'flex', gap: '0.25rem', marginBottom: '2rem',
        padding: '0.75rem', borderRadius: '0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
      }}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { if (i <= highestStep) setCurrentStep(i); }}
            style={{
              flex: 1, padding: '0.5rem 0.25rem', borderRadius: '0.5rem',
              background: i === currentStep ? 'var(--color-bg-tertiary)' : 'transparent',
              border: i === currentStep ? '1px solid var(--color-border)' : '1px solid transparent',
              color: i <= highestStep ? 'var(--color-text)' : 'var(--color-text-muted)',
              cursor: i <= highestStep ? 'pointer' : 'default', fontSize: '0.7rem', fontWeight: i === currentStep ? 700 : 400,
              opacity: i <= highestStep ? 1 : 0.5,
              transition: 'all 0.2s',
            }}
          >
            <div>{s.title}</div>
          </button>
        ))}
      </div>

      {/* Step content */}
      <div style={{ minHeight: '500px' }}>

        {/* ============ STEP 0: INTRO ============ */}
        {step.id === 'intro' && (
          <div>
            <h1 style={{
              fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
              background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Your First Simulation
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              In the next few minutes, you&apos;ll watch a digital agent live, die, and be reborn
              in a Web4 society &mdash; and understand why trust is the currency of the future.
            </p>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem',
            }}>
              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid #6ee7b730',
              }}>
                <div style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.5rem' }}>What you&apos;ll see</div>
                <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
                  <li>An agent trying to earn trust through actions</li>
                  <li>ATP (energy) being spent and earned</li>
                  <li>Trust rising and falling based on behavior</li>
                  <li>Death, rebirth, and karma carrying forward</li>
                  <li>Learning across multiple lives</li>
                </ul>
              </div>
              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid #93c5fd30',
              }}>
                <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: '0.5rem' }}>What you&apos;ll learn</div>
                <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, paddingLeft: '1rem' }}>
                  <li>Trust is earned, not given</li>
                  <li>Actions have lasting consequences (karma)</li>
                  <li>Systems can learn from experience</li>
                  <li>Coherent behavior builds on itself</li>
                  <li>Web4&apos;s core dynamics in action</li>
                </ul>
              </div>
            </div>

            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: '#93c5fd10', border: '1px solid #93c5fd20',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)',
              marginBottom: '1.5rem',
            }}>
              This simulation runs entirely in your browser &mdash; no server, no signup, no data collection.
              It&apos;s a simplified but faithful model of Web4 trust dynamics.
            </div>

            <button
              onClick={nextStep}
              style={{
                padding: '0.875rem 2rem', borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                color: '#000', fontWeight: 700, fontSize: '1rem',
                border: 'none', cursor: 'pointer',
              }}
            >
              Let&apos;s Begin
            </button>
          </div>
        )}

        {/* ============ STEP 1: MEET AGENT ============ */}
        {step.id === 'meet-agent' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Meet Your Agent
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Every participant in Web4 starts the same way: as a newcomer with no reputation.
              They must prove themselves through consistent, valuable behavior.
            </p>

            <div style={{
              padding: '1.5rem', borderRadius: '0.75rem',
              background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #93c5fd, #c4b5fd)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 700,
                }}>
                  N
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>Newcomer</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    A fresh agent entering Web4 society
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-tertiary)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Trust Score</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: trustColor(0.3) }}>0.300</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Low &mdash; unproven</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-tertiary)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>ATP (Energy)</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6ee7b7' }}>150</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Generous start</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-tertiary)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Lives</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c4b5fd' }}>1 of 3</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Death isn&apos;t the end</div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: '#fde68a10', border: '1px solid #fde68a20',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              <strong style={{ color: '#fde68a' }}>Key concept:</strong> Trust starts low (0.3 out of 1.0).
              Nobody is trusted by default &mdash; trust must be earned through actions.
              Every action costs ATP (attention tokens). Run out of ATP, and you die.
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              <button onClick={() => { nextStep(); runFirstLife(); }} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Start First Life
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 2: FIRST LIFE ============ */}
        {step.id === 'first-life' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Life 1: {simRunning ? 'Living...' : simDone ? 'Complete' : 'Ready'}
              </h2>
              {simRunning && (
                <div style={{
                  padding: '0.25rem 0.75rem', borderRadius: '999px',
                  background: '#6ee7b720', color: '#6ee7b7', fontSize: '0.75rem',
                  animation: 'pulse 2s infinite',
                }}>
                  Turn {firstLifeTrust.length - 1}
                </div>
              )}
            </div>

            {/* Live charts */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              }}>
                <MiniChart
                  data={firstLifeTrust}
                  color={trustColor(firstLifeTrust[firstLifeTrust.length - 1] || 0.3)}
                  label="Trust"
                  max={1}
                  threshold={0.5}
                />
                {firstLifeTrust.length > 1 && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Dashed line = 0.5 trust threshold (full community access)
                  </div>
                )}
              </div>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
              }}>
                <MiniChart
                  data={firstLifeATP}
                  color={atpColor(firstLifeATP[firstLifeATP.length - 1] || 100, 150)}
                  label="ATP (Energy)"
                  max={200}
                />
              </div>
            </div>

            {/* Action feed */}
            {firstLifeTicks.length > 0 && (
              <div style={{
                padding: '0.75rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                marginBottom: '1rem',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}>
                  Latest Actions
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {firstLifeTicks.slice(-20).map((t, i) => (
                    <div key={i} title={`Turn ${t.lifeTick}: ${t.action.label} (${t.actionSuccess ? 'success' : 'failed'})`} style={{
                      width: '14px', height: '14px', borderRadius: '2px',
                      background: t.actionSuccess ? '#6ee7b740' : '#fca5a540',
                      border: `1px solid ${t.actionSuccess ? '#6ee7b7' : '#fca5a5'}`,
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
                  Green = success, Red = failure. Each square = one action.
                </div>
              </div>
            )}

            {/* Events */}
            <EventLog events={firstLifeEvents} maxShow={4} />

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              {simDone && (
                <button onClick={nextStep} style={{
                  padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                  color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                }}>
                  What Happened?
                </button>
              )}
              {!simDone && !simRunning && (
                <button onClick={runFirstLife} style={{
                  padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                  background: '#93c5fd', color: '#000', fontWeight: 700,
                  border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                }}>
                  Run Again
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============ STEP 3: UNDERSTANDING ============ */}
        {step.id === 'understanding' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              What Just Happened?
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Let&apos;s break down what you just watched. Your agent lived one life in Web4 &mdash; here&apos;s
              what the numbers mean.
            </p>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid #6ee7b730',
              }}>
                <h3 style={{ color: '#6ee7b7', fontWeight: 700, marginBottom: '0.5rem' }}>Trust</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Trust measures how much the society values this agent. It starts low (0.3) because
                  newcomers are unproven. Each successful contribution nudges it up; failures push it down.
                  Trust above 0.5 unlocks full community access &mdash; it signals that behavior is
                  consistent enough to be recognized as reliable.
                </p>
              </div>

              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid #fde68a30',
              }}>
                <h3 style={{ color: '#fde68a', fontWeight: 700, marginBottom: '0.5rem' }}>ATP (Attention Tokens)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  ATP is the agent&apos;s attention budget. Every action costs ATP. Successful contributions
                  earn ATP back. If ATP reaches 0, the agent dies &mdash; they can no longer participate.
                  This models a fundamental truth: participation requires energy, and energy must be earned.
                </p>
              </div>

              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid #c4b5fd30',
              }}>
                <h3 style={{ color: '#c4b5fd', fontWeight: 700, marginBottom: '0.5rem' }}>Coherence Index</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Coherence measures how consistent the agent&apos;s behavior is. Erratic behavior
                  (big trust swings) = low coherence. Steady, reliable behavior = high coherence.
                  High coherence amplifies trust gains and reduces trust losses &mdash; consistency is rewarded.
                </p>
              </div>
            </div>

            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: '#93c5fd10', border: '1px solid #93c5fd20',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              <strong style={{ color: '#93c5fd' }}>The key insight:</strong> Trust isn&apos;t a score you set &mdash;
              it&apos;s a reputation that emerges from behavior. You can&apos;t fake consistency over time.
              This is what makes Web4 fundamentally different from systems based on credentials or self-declaration.
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              <button onClick={nextStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)',
                color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Now: Death &amp; Rebirth
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 4: KARMA ============ */}
        {step.id === 'karma' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Death &amp; Rebirth: Karma
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              In Web4, death isn&apos;t the end. When an agent dies, their trust score carries forward
              through <strong style={{ color: '#c4b5fd' }}>karma</strong> &mdash; shaping their next life&apos;s starting conditions.
            </p>

            <div style={{
              padding: '1.5rem', borderRadius: '0.75rem',
              background: 'var(--color-bg-secondary)', border: '1px solid #c4b5fd30',
              marginBottom: '1.5rem',
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px', height: '2px', background: '#fca5a5',
                  }} />
                  <span>Life ends (ATP exhaustion or natural end)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px', height: '2px',
                    background: 'linear-gradient(90deg, #fca5a5, #c4b5fd)',
                  }} />
                  <span>Final trust is evaluated &rarr; <strong style={{ color: '#c4b5fd' }}>karma calculated</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '40px', height: '2px', background: '#c4b5fd',
                  }} />
                  <span>New life begins with modified starting trust</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '40px', height: '2px', background: '#6ee7b7',
                  }} />
                  <span>Cross-life learning: agent makes better decisions each life</span>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem',
            }}>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: '#6ee7b710', border: '1px solid #6ee7b720',
              }}>
                <div style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.375rem' }}>Good Karma</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  If trust grew during a life, next life starts with a trust bonus.
                  Positive actions compound across lifetimes.
                </div>
              </div>
              <div style={{
                padding: '1rem', borderRadius: '0.5rem',
                background: '#fca5a510', border: '1px solid #fca5a520',
              }}>
                <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: '0.375rem' }}>Bad Karma</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  If trust declined, next life starts with a penalty.
                  Destructive behavior has lasting consequences.
                </div>
              </div>
            </div>

            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: '#fde68a10', border: '1px solid #fde68a20',
              fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}>
              <strong style={{ color: '#fde68a' }}>Why this matters:</strong> Traditional systems let you
              create a new account to escape your reputation. In Web4, your behavioral history follows you.
              This isn&apos;t surveillance &mdash; it&apos;s consequence. Your actions shape your future opportunities.
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              <button onClick={() => { nextStep(); }} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'linear-gradient(135deg, #c4b5fd, #6ee7b7)',
                color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Run Full Simulation
              </button>
            </div>
          </div>
        )}

        {/* ============ STEP 5: EXPLORE ============ */}
        {step.id === 'explore' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Full Simulation: Multiple Lives
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
              Now watch karma and learning in action across multiple lives. Choose a scenario:
            </p>

            {/* Preset selector */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '0.5rem', marginBottom: '1.25rem',
            }}>
              {Object.entries(PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setPreset(key)}
                  style={{
                    padding: '0.75rem', borderRadius: '0.5rem',
                    background: preset === key ? 'var(--color-bg-tertiary)' : 'var(--color-bg-secondary)',
                    border: `1px solid ${preset === key ? '#93c5fd40' : 'var(--color-border)'}`,
                    color: preset === key ? 'var(--color-text)' : 'var(--color-text-secondary)',
                    cursor: 'pointer', textAlign: 'left', fontSize: '0.8rem',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{p.agentName}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    {key === 'gentle-start' && 'Forgiving world, strong karma'}
                    {key === 'harsh-world' && 'Low resources, high stakes'}
                    {key === 'fast-learner' && 'Learns fast across lives'}
                    {key === 'no-karma' && 'No memory across lives'}
                  </div>
                </button>
              ))}
            </div>

            {/* Run button */}
            <div style={{ marginBottom: '1.5rem' }}>
              {!simRunning ? (
                <button
                  onClick={runFullSimulation}
                  style={{
                    padding: '0.75rem 2rem', borderRadius: '0.5rem',
                    background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                    color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                  }}
                >
                  Run Simulation
                </button>
              ) : (
                <button
                  onClick={stopSimulation}
                  style={{
                    padding: '0.75rem 2rem', borderRadius: '0.5rem',
                    background: '#fca5a5', color: '#000', fontWeight: 700,
                    border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                  }}
                >
                  Stop
                </button>
              )}
              {simRunning && (
                <span style={{ marginLeft: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                  Life {currentLife} in progress...
                </span>
              )}
            </div>

            {/* Live charts */}
            {fullLiveTrust.length > 0 && (
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  padding: '1rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                }}>
                  <MiniChart
                    data={fullLiveTrust}
                    color={trustColor(fullLiveTrust[fullLiveTrust.length - 1])}
                    label="Trust (all lives)"
                    height={140}
                    max={1}
                    threshold={0.5}
                  />
                </div>
                <div style={{
                  padding: '1rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                }}>
                  <MiniChart
                    data={fullLiveATP}
                    color={atpColor(fullLiveATP[fullLiveATP.length - 1], PRESETS[preset]?.initialATP || 100)}
                    label="ATP (all lives)"
                    height={140}
                  />
                </div>
              </div>
            )}

            {/* Life summaries */}
            {fullResult && (
              <div style={{
                display: 'grid', gridTemplateColumns: `repeat(${Math.min(fullResult.lives.length, 3)}, 1fr)`,
                gap: '0.75rem', marginBottom: '1rem',
              }}>
                {fullResult.lives.map(life => (
                  <LifeSummary key={life.lifeNumber} life={life} isActive={life.lifeNumber === currentLife} />
                ))}
              </div>
            )}

            {/* Events */}
            {fullLiveEvents.length > 0 && <EventLog events={fullLiveEvents} maxShow={6} />}

            {/* Navigation */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              {simDone && (
                <button onClick={nextStep} style={{
                  padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                  background: 'linear-gradient(135deg, #6ee7b7, #93c5fd)',
                  color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem',
                }}>
                  See Insights
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============ STEP 6: INSIGHTS ============ */}
        {step.id === 'insights' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              What You Learned
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              You just watched the core dynamics of Web4 play out. Here are the fundamental principles:
            </p>

            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
              {[
                {
                  title: 'Trust is earned, not assigned',
                  detail: 'No one starts trusted. Reputation emerges from consistent behavior over time. You can\'t buy it, hack it, or declare it.',
                  color: '#6ee7b7',
                },
                {
                  title: 'Actions have lasting consequences',
                  detail: 'Karma carries trust across lives. Destructive behavior doesn\'t just hurt now - it shapes future starting conditions. You can\'t escape your history.',
                  color: '#c4b5fd',
                },
                {
                  title: 'Consistency is rewarded',
                  detail: 'The Coherence Index rewards reliable behavior and penalizes erratic action. Being boringly reliable is more valuable than being occasionally brilliant.',
                  color: '#93c5fd',
                },
                {
                  title: 'Participation requires energy',
                  detail: 'ATP represents the cost of engagement. You must contribute value to sustain participation. Free-riding leads to energy exhaustion and death.',
                  color: '#fde68a',
                },
                {
                  title: 'Learning compounds across lives',
                  detail: 'Each life isn\'t starting from scratch. The agent learns from past mistakes and successes, making better decisions over time. Wisdom accumulates.',
                  color: '#6ee7b7',
                },
              ].map((insight, i) => (
                <div key={i} style={{
                  padding: '1rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)',
                  borderLeft: `3px solid ${insight.color}`,
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.375rem', color: insight.color }}>
                    {insight.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {insight.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Results summary if available */}
            {fullResult && (
              <div style={{
                padding: '1.25rem', borderRadius: '0.75rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Your Simulation Results</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                  <div>Lives: {fullResult.lives.length} | Total ticks: {fullResult.totalTicks}</div>
                  <div>
                    Trust journey: {fullResult.lives[0].startTrust.toFixed(3)} →{' '}
                    <span style={{ color: trustColor(fullResult.finalTrust) }}>
                      {fullResult.finalTrust.toFixed(3)}
                    </span>
                    {' '}
                    ({fullResult.trustGrowth > 0 ? '+' : ''}{(fullResult.trustGrowth * 100).toFixed(1)}%)
                  </div>
                  <div>Events: {fullResult.events.length} significant moments</div>
                </div>
              </div>
            )}

            {/* Next steps */}
            <div style={{
              padding: '1.25rem', borderRadius: '0.75rem',
              background: '#93c5fd10', border: '1px solid #93c5fd20',
              marginBottom: '1.5rem',
            }}>
              <h3 style={{ fontWeight: 700, color: '#93c5fd', marginBottom: '0.75rem' }}>
                Where to Go Next
              </h3>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
              }}>
                <Link href="/playground" style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Parameter Playground</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Full control over every parameter
                  </div>
                </Link>
                <Link href="/trust-tensor-explorer" style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Trust Tensor Explorer</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Deep dive into 3D trust dimensions
                  </div>
                </Link>
                <Link href="/narratives" style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Simulation Narratives</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Read stories from longer simulations
                  </div>
                </Link>
                <Link href="/research-hub" style={{
                  padding: '0.75rem', borderRadius: '0.5rem',
                  background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Research Hub</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    All 15+ interactive tools
                  </div>
                </Link>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={prevStep} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Back
              </button>
              <button onClick={() => { setCurrentStep(4); }} style={{
                padding: '0.75rem 1.5rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '0.9rem',
              }}>
                Run Again with Different Settings
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <RelatedConcepts currentPath="/first-simulation" />
      </div>
    </div>
  );
}
