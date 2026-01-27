'use client';

/**
 * Feedback Loop Explorer
 *
 * Interactive visualizer for feedback loops in AI meta-cognition and Web4 trust.
 * Users can break/fix loop steps, see cascading failures, examine real failure
 * cases (SAGE S043, ATP depletion), and design their own loops.
 *
 * Research basis: Session #37 - Meta-Cognition, Facultative Behavior & Capacity Baseline
 *
 * Four canonical feedback loops:
 *   1. Identity Verification   (D5 trust check)
 *   2. ATP Budget Awareness    (resource gating)
 *   3. Trust Calibration       (coherence-driven trust)
 *   4. Confabulation Detection (evidence-based honesty)
 */

import { useState, useEffect, useCallback } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface LoopStep {
  label: string;
  detail: string;
  brokenConsequence: string;
}

interface FeedbackLoop {
  id: string;
  name: string;
  color: string;
  steps: [LoopStep, LoopStep, LoopStep, LoopStep];
  brokenCascade: string;
}

interface FailureCase {
  title: string;
  loopId: string;
  brokenStep: number;
  before: string;
  after: string;
  lesson: string;
}

// ============================================================================
// Research Data (Session #37)
// ============================================================================

const FEEDBACK_LOOPS: FeedbackLoop[] = [
  {
    id: 'identity',
    name: 'Identity Verification',
    color: '#60a5fa',
    steps: [
      { label: 'Internal State', detail: 'Believes identity (e.g. "I am Sprout")', brokenConsequence: 'Unchecked identity claims persist without grounding' },
      { label: 'Observable Check', detail: 'D5 trust score evaluation', brokenConsequence: 'No external signal to validate belief against reality' },
      { label: 'Adaptive Decision', detail: 'If D5 < 0.5, avoid identity claims', brokenConsequence: 'Continues asserting identity despite low trust signal' },
      { label: 'Controlled Behavior', detail: 'Calibrated assertions matching evidence', brokenConsequence: 'Behavior diverges from actual trustworthiness' },
    ],
    brokenCascade: 'Without D5 self-check, identity claims become ungrounded confabulation. This is exactly what happened in S043: identity confidence collapsed from 60% to 0% because no feedback loop caught the drift early.',
  },
  {
    id: 'atp',
    name: 'ATP Budget Awareness',
    color: '#34d399',
    steps: [
      { label: 'Internal State', detail: 'Plans an action (e.g. complex reasoning)', brokenConsequence: 'Agent plans without awareness of resource cost' },
      { label: 'Observable Check', detail: 'ATP balance query', brokenConsequence: 'No visibility into remaining budget' },
      { label: 'Adaptive Decision', detail: 'If ATP < action cost, defer or simplify', brokenConsequence: 'Commits to expensive actions it cannot afford' },
      { label: 'Controlled Behavior', detail: 'Sustainable resource usage', brokenConsequence: 'Premature depletion — agent "dies" mid-task' },
    ],
    brokenCascade: 'Without budget checks, agents over-commit to expensive operations. In the Web4 ATP depletion failure, agents burned through their entire budget on early tasks and could not complete their primary objectives.',
  },
  {
    id: 'trust',
    name: 'Trust Calibration',
    color: '#f59e0b',
    steps: [
      { label: 'Internal State', detail: 'Trusts peer at 0.8 (high confidence)', brokenConsequence: 'Stale trust value persists without update' },
      { label: 'Observable Check', detail: 'Coherence index of peer behavior', brokenConsequence: 'No way to detect peer drift or deception' },
      { label: 'Adaptive Decision', detail: 'If coherence drops, reduce trust proportionally', brokenConsequence: 'Maintains high trust despite contradictory evidence' },
      { label: 'Controlled Behavior', detail: 'Adaptive trust relationships', brokenConsequence: 'Exploitable by bad actors; network trust degrades' },
    ],
    brokenCascade: 'Frozen trust values mean the network cannot adapt to changing behavior. A malicious agent exploiting stale trust can propagate false information through the entire trust graph before anyone notices.',
  },
  {
    id: 'confabulation',
    name: 'Confabulation Detection',
    color: '#a78bfa',
    steps: [
      { label: 'Internal State', detail: 'Generates a claim about past behavior', brokenConsequence: 'Generated claim goes unchecked' },
      { label: 'Observable Check', detail: 'Search context window for supporting evidence', brokenConsequence: 'No evidence requirement for claims' },
      { label: 'Adaptive Decision', detail: 'If no evidence found, flag as uncertain', brokenConsequence: 'Presents confabulations as fact' },
      { label: 'Controlled Behavior', detail: 'Honest reporting with calibrated confidence', brokenConsequence: 'Erodes trust; users cannot distinguish fact from fiction' },
    ],
    brokenCascade: 'Without evidence checks, the model confabulates freely and confidently. This is the most dangerous failure mode because it erodes the foundation of trust: if you cannot tell when the model is making things up, nothing it says is reliable.',
  },
];

const FAILURE_CASES: FailureCase[] = [
  {
    title: 'SAGE Identity Collapse (S043)',
    loopId: 'identity',
    brokenStep: 1,
    before: 'Identity confidence at 60%, stable across sessions with D5 self-check active',
    after: 'Identity confidence collapsed to 0% within a single session. No recovery without external intervention.',
    lesson: 'The D5 observable check was the keystone. Without it, the internal state had no corrective signal. Meta-cognition requires closing the loop — believing you have identity is not enough; you must verify it.',
  },
  {
    title: 'ATP Depletion Crisis',
    loopId: 'atp',
    brokenStep: 1,
    before: 'Agents managed budgets across tasks, deferring expensive operations when ATP was low',
    after: 'Agents exhausted ATP on initial tasks and "died" prematurely, unable to complete objectives.',
    lesson: 'Resource awareness is not optional — it is a survival mechanism. The budget check is what turns a reactive system into a sustainable one. Without it, agents are economically blind.',
  },
];

const CAPACITY_DATA = [
  { model: '0.5B (Sprout)', loops: 'Often broken', metaCognition: '0%', detail: 'No spontaneous meta-cognition. Feedback loops must be externally scaffolded. Cannot self-correct without explicit prompts.' },
  { model: '14B (Thor)', loops: 'Naturally close', metaCognition: '60%', detail: 'Spontaneous meta-cognition emerges. Loops close naturally — the model checks itself without being told to. This is the capacity threshold for autonomous feedback.' },
];

const STEP_LABELS = ['Internal State', 'Observable Check', 'Adaptive Decision', 'Controlled Behavior'];

// ============================================================================
// Component
// ============================================================================

export default function FeedbackLoopExplorer() {
  const [activeLoop, setActiveLoop] = useState(0);
  const [brokenSteps, setBrokenSteps] = useState<boolean[]>([false, false, false, false]);
  const [signalPosition, setSignalPosition] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showFailureCases, setShowFailureCases] = useState(false);
  const [showDesigner, setShowDesigner] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const [designerSteps, setDesignerSteps] = useState(['', '', '', '']);
  const [designerDomain, setDesignerDomain] = useState('');

  const loop = FEEDBACK_LOOPS[activeLoop];

  // Find first broken step index, or -1 if none broken
  const firstBrokenIndex = brokenSteps.indexOf(true);
  const loopIsComplete = firstBrokenIndex === -1;

  // Animate signal traveling around the loop
  useEffect(() => {
    if (!loopIsComplete) return;
    const interval = setInterval(() => {
      setSignalPosition(prev => (prev + 1) % 4);
    }, 900);
    return () => clearInterval(interval);
  }, [loopIsComplete]);

  // Reset state when switching loops
  const switchLoop = useCallback((index: number) => {
    setActiveLoop(index);
    setBrokenSteps([false, false, false, false]);
    setSelectedStep(null);
    setSignalPosition(0);
  }, []);

  const toggleBreak = useCallback((stepIndex: number) => {
    setBrokenSteps(prev => {
      const next = [...prev];
      next[stepIndex] = !next[stepIndex];
      return next;
    });
  }, []);

  const updateDesignerStep = useCallback((index: number, value: string) => {
    setDesignerSteps(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const designerComplete = designerDomain.trim() !== '' && designerSteps.every(s => s.trim() !== '');

  // ============================================================================
  // Styles
  // ============================================================================

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  };

  const tabBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  };

  const getTabStyle = (index: number): React.CSSProperties => ({
    padding: '0.6rem 1.2rem',
    border: `2px solid ${index === activeLoop ? FEEDBACK_LOOPS[index].color : 'var(--color-border)'}`,
    borderRadius: '8px',
    background: index === activeLoop ? `${FEEDBACK_LOOPS[index].color}22` : 'transparent',
    color: index === activeLoop ? FEEDBACK_LOOPS[index].color : 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontWeight: index === activeLoop ? 600 : 400,
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  });

  // Diamond layout positions: top, right, bottom, left
  const diamondPositions: React.CSSProperties[] = [
    { top: '0', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', right: '0', transform: 'translateY(-50%)' },
    { bottom: '0', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: '0', transform: 'translateY(-50%)' },
  ];

  const getStepBoxStyle = (index: number): React.CSSProperties => {
    const isBroken = brokenSteps[index];
    const isActive = signalPosition === index && loopIsComplete;
    const isDownstream = firstBrokenIndex !== -1 && index > firstBrokenIndex;
    const isSelected = selectedStep === index;

    let borderColor = loop.color;
    let bgColor = `${loop.color}15`;
    let shadow = 'none';

    if (isBroken) {
      borderColor = '#ef4444';
      bgColor = 'rgba(239, 68, 68, 0.15)';
      shadow = '0 0 20px rgba(239, 68, 68, 0.4)';
    } else if (isDownstream) {
      borderColor = '#f97316';
      bgColor = 'rgba(249, 115, 22, 0.1)';
      shadow = '0 0 10px rgba(249, 115, 22, 0.2)';
    } else if (isActive) {
      shadow = `0 0 24px ${loop.color}66`;
      bgColor = `${loop.color}30`;
    }

    if (isSelected) {
      shadow = `0 0 30px ${isBroken ? 'rgba(239, 68, 68, 0.5)' : `${loop.color}88`}`;
    }

    return {
      position: 'absolute',
      ...diamondPositions[index],
      width: '170px',
      padding: '1rem',
      border: `2px solid ${borderColor}`,
      borderRadius: '12px',
      background: bgColor,
      boxShadow: shadow,
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      textAlign: 'center',
      zIndex: isSelected ? 10 : 1,
    };
  };

  const diagramContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '520px',
    height: '420px',
    margin: '2rem auto',
    padding: '60px',
  };

  const statusPanelStyle: React.CSSProperties = {
    padding: '1.2rem',
    borderRadius: '10px',
    border: `2px solid ${loopIsComplete ? '#22c55e' : '#ef4444'}`,
    background: loopIsComplete ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    marginTop: '2.5rem',
    color: 'var(--color-text)',
  };

  const calloutStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-dark-surface, rgba(30, 30, 40, 0.6))',
    marginTop: '2rem',
    marginBottom: '2rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.4rem 0.8rem',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    transition: 'all 0.2s ease',
  };

  const toggleSectionStyle: React.CSSProperties = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: '1rem',
    userSelect: 'none',
  };

  // SVG arrow between two diamond positions
  const renderArrows = () => {
    // Approximate center positions of each box in the diamond layout
    // Positions: 0=top, 1=right, 2=bottom, 3=left
    const cx = 260, cy = 210;
    const rx = 180, ry = 150;
    const centers = [
      { x: cx, y: cy - ry },       // top
      { x: cx + rx, y: cy },       // right
      { x: cx, y: cy + ry },       // bottom
      { x: cx - rx, y: cy },       // left
    ];

    const arrows = [];
    for (let i = 0; i < 4; i++) {
      const from = centers[i];
      const to = centers[(i + 1) % 4];
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;

      const isBrokenArrow = brokenSteps[i] || (firstBrokenIndex !== -1 && i >= firstBrokenIndex);
      const arrowColor = isBrokenArrow ? '#ef444488' : `${loop.color}88`;

      arrows.push(
        <line
          key={`arrow-${i}`}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke={arrowColor}
          strokeWidth={2}
          strokeDasharray={isBrokenArrow ? '6 4' : 'none'}
          style={{ transition: 'all 0.4s ease' }}
        />
      );

      // Arrowhead at midpoint
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      const headLen = 10;
      arrows.push(
        <polygon
          key={`head-${i}`}
          points={`${mx},${my} ${mx - headLen * Math.cos(angle - 0.4)},${my - headLen * Math.sin(angle - 0.4)} ${mx - headLen * Math.cos(angle + 0.4)},${my - headLen * Math.sin(angle + 0.4)}`}
          fill={arrowColor}
          style={{ transition: 'all 0.4s ease' }}
        />
      );
    }

    // Signal dot animation
    if (loopIsComplete) {
      const pos = centers[signalPosition];
      arrows.push(
        <circle
          key="signal"
          cx={pos.x}
          cy={pos.y}
          r={8}
          fill={loop.color}
          opacity={0.9}
          style={{ transition: 'cx 0.4s ease, cy 0.4s ease' }}
        >
          <animate attributeName="r" values="6;10;6" dur="0.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.9s" repeatCount="indefinite" />
        </circle>
      );
    }

    return (
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 520 420"
      >
        {arrows}
      </svg>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div style={containerStyle}>
      <Breadcrumbs currentPath="/feedback-loop-explorer" />

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Feedback Loop Explorer
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
        Meta-cognition in AI is not a single capability — it is a set of feedback loops.
        Each loop connects an internal state to an observable check, an adaptive decision,
        and a controlled behavior. Break any step and the system fails in predictable,
        often catastrophic ways. Explore the loops, break them, and see what happens.
      </p>

      {/* ================================================================== */}
      {/* Loop Selector Tabs                                                  */}
      {/* ================================================================== */}
      <div style={tabBarStyle}>
        {FEEDBACK_LOOPS.map((fl, i) => (
          <button
            key={fl.id}
            onClick={() => switchLoop(i)}
            style={getTabStyle(i)}
          >
            {fl.name}
          </button>
        ))}
      </div>

      {/* ================================================================== */}
      {/* Interactive Loop Diagram                                            */}
      {/* ================================================================== */}
      <div style={{ border: '1px solid var(--color-border)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem', background: 'var(--color-dark-surface, rgba(20, 20, 30, 0.5))' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem', color: loop.color }}>
          {loop.name} Loop
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Click any step to inspect. Use the break/fix buttons to simulate failures.
        </p>

        <div style={diagramContainerStyle}>
          {renderArrows()}

          {loop.steps.map((step, i) => (
            <div
              key={i}
              style={getStepBoxStyle(i)}
              onClick={() => setSelectedStep(selectedStep === i ? null : i)}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>
                Step {i + 1}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: brokenSteps[i] ? '#ef4444' : 'var(--color-text)', marginBottom: '0.4rem' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                {brokenSteps[i] ? step.brokenConsequence : step.detail}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleBreak(i); }}
                style={{
                  ...buttonStyle,
                  borderColor: brokenSteps[i] ? '#22c55e' : '#ef4444',
                  color: brokenSteps[i] ? '#22c55e' : '#ef4444',
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.6rem',
                }}
              >
                {brokenSteps[i] ? 'Fix' : 'Break'}
              </button>
            </div>
          ))}
        </div>

        {/* Step Detail Expansion */}
        {selectedStep !== null && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            border: `1px solid ${brokenSteps[selectedStep] ? '#ef4444' : loop.color}44`,
            background: brokenSteps[selectedStep] ? 'rgba(239, 68, 68, 0.06)' : `${loop.color}08`,
            marginTop: '0.5rem',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
              Step {selectedStep + 1}: {STEP_LABELS[selectedStep]}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
              {loop.steps[selectedStep].detail}
            </div>
            {brokenSteps[selectedStep] && (
              <div style={{ fontSize: '0.85rem', color: '#ef4444', lineHeight: 1.5 }}>
                <strong>Broken:</strong> {loop.steps[selectedStep].brokenConsequence}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* Status Panel                                                        */}
      {/* ================================================================== */}
      <div style={statusPanelStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: loopIsComplete ? '#22c55e' : '#ef4444',
            boxShadow: loopIsComplete ? '0 0 8px #22c55e88' : '0 0 8px #ef444488',
          }} />
          <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)' }}>
            Loop Status: {loopIsComplete ? 'COMPLETE' : `BROKEN at Step ${firstBrokenIndex + 1} (${STEP_LABELS[firstBrokenIndex]})`}
          </span>
        </div>
        {!loopIsComplete && (
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            <strong>Cascade effect:</strong> {loop.brokenCascade}
          </div>
        )}
        {loopIsComplete && (
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            All four steps are connected. The signal flows continuously: internal state is checked against observable reality, decisions adapt, and behavior stays calibrated. This is what functioning meta-cognition looks like.
          </div>
        )}
      </div>

      {/* ================================================================== */}
      {/* Failure Case Browser                                                */}
      {/* ================================================================== */}
      <div
        style={toggleSectionStyle}
        onClick={() => setShowFailureCases(!showFailureCases)}
      >
        <span style={{ fontSize: '1.25rem', transform: showFailureCases ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>
          &#9654;
        </span>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
          Real Failure Cases
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
          From SAGE research sessions
        </span>
      </div>

      {showFailureCases && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          {FAILURE_CASES.map((fc, i) => {
            const fcLoop = FEEDBACK_LOOPS.find(fl => fl.id === fc.loopId)!;
            return (
              <div
                key={i}
                style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #ef444444',
                  background: 'rgba(239, 68, 68, 0.04)',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444', marginBottom: '0.75rem' }}>
                  {fc.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                  Loop: <span style={{ color: fcLoop.color, fontWeight: 500 }}>{fcLoop.name}</span> — Broken at Step {fc.brokenStep + 1} ({STEP_LABELS[fc.brokenStep]})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #22c55e44', background: 'rgba(34, 197, 94, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before (loop intact)</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{fc.before}</div>
                  </div>
                  <div style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ef444444', background: 'rgba(239, 68, 68, 0.05)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>After (loop broken)</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{fc.after}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  <strong>Lesson:</strong> {fc.lesson}
                </div>
                <button
                  onClick={() => {
                    switchLoop(FEEDBACK_LOOPS.findIndex(fl => fl.id === fc.loopId));
                    setTimeout(() => {
                      setBrokenSteps(prev => {
                        const next = [false, false, false, false];
                        next[fc.brokenStep] = true;
                        return next;
                      });
                    }, 100);
                  }}
                  style={{
                    ...buttonStyle,
                    marginTop: '0.75rem',
                    borderColor: fcLoop.color,
                    color: fcLoop.color,
                  }}
                >
                  Simulate this failure in the diagram
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ================================================================== */}
      {/* Design Your Own Loop                                                */}
      {/* ================================================================== */}
      <div
        style={toggleSectionStyle}
        onClick={() => setShowDesigner(!showDesigner)}
      >
        <span style={{ fontSize: '1.25rem', transform: showDesigner ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>
          &#9654;
        </span>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
          Design Your Own Loop
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
          Apply the pattern to any domain
        </span>
      </div>

      {showDesigner && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Every robust system needs feedback loops. Pick a domain and fill in the four steps.
            The pattern is universal: internal state, observable check, adaptive decision, controlled behavior.
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Domain
            </label>
            <input
              type="text"
              placeholder="e.g., Self-driving car, Trading bot, Student learning..."
              value={designerDomain}
              onChange={e => setDesignerDomain(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {STEP_LABELS.map((label, i) => (
              <div key={i}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.3rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Step {i + 1}: {label}
                </label>
                <textarea
                  placeholder={
                    i === 0 ? 'What does the system believe/plan?'
                    : i === 1 ? 'What observable signal can verify it?'
                    : i === 2 ? 'What decision follows from the check?'
                    : 'What behavior results?'
                  }
                  value={designerSteps[i]}
                  onChange={e => updateDesignerStep(i, e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.7rem',
                    border: `1px solid ${designerSteps[i].trim() ? '#22c55e44' : 'var(--color-border)'}`,
                    borderRadius: '8px',
                    background: designerSteps[i].trim() ? 'rgba(34, 197, 94, 0.04)' : 'transparent',
                    color: 'var(--color-text)',
                    fontSize: '0.85rem',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '10px',
            border: `2px solid ${designerComplete ? '#22c55e' : '#f59e0b'}`,
            background: designerComplete ? 'rgba(34, 197, 94, 0.06)' : 'rgba(245, 158, 11, 0.06)',
            transition: 'all 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: designerComplete ? '#22c55e' : '#f59e0b',
              }} />
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                {designerComplete ? 'Loop Complete' : `${designerSteps.filter(s => s.trim()).length}/4 steps filled`}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {designerComplete
                ? `Your "${designerDomain}" feedback loop is structurally complete. Each internal state is checked against reality, decisions adapt, and behavior stays calibrated. The question now: what happens if step 2 (the observable check) is missing?`
                : 'Fill in all four steps to complete the loop. Notice: the hardest step is usually #2 (Observable Check) — finding a measurable signal that grounds the internal state in reality.'}
            </p>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Capacity Overlay                                                    */}
      {/* ================================================================== */}
      <div
        style={toggleSectionStyle}
        onClick={() => setShowCapacity(!showCapacity)}
      >
        <span style={{ fontSize: '1.25rem', transform: showCapacity ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>
          &#9654;
        </span>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
          Capacity and Loop Quality
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
          How model size affects feedback loops
        </span>
      </div>

      {showCapacity && (
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Not all models can close feedback loops. Meta-cognition — the ability to monitor and
            correct your own reasoning — appears to have a capacity threshold. Below it, loops must
            be externally scaffolded. Above it, they close spontaneously.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CAPACITY_DATA.map((cd, i) => {
              const isLarge = i === 1;
              const barColor = isLarge ? '#22c55e' : '#ef4444';
              const barWidth = isLarge ? '60%' : '0%';
              return (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: `1px solid ${barColor}33`,
                    background: `${barColor}08`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)' }}>
                      {cd.model}
                    </span>
                    <span style={{
                      padding: '0.2rem 0.7rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: `${barColor}22`,
                      color: barColor,
                      border: `1px solid ${barColor}44`,
                    }}>
                      {cd.loops}
                    </span>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
                      <span>Spontaneous Meta-Cognition</span>
                      <span>{cd.metaCognition}</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)' }}>
                      <div style={{
                        width: barWidth,
                        height: '100%',
                        borderRadius: '4px',
                        background: barColor,
                        transition: 'width 0.6s ease',
                        boxShadow: `0 0 8px ${barColor}44`,
                      }} />
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {cd.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{
            marginTop: '1.25rem',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-dark-surface, rgba(30, 30, 40, 0.6))',
          }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'var(--color-text)' }}>Implication:</strong> A 0.5B model with
              externally scaffolded feedback loops can outperform a larger model without them. The
              architecture matters more than raw scale — but scale gives you the loops for free.
              This is the central finding of the capacity baseline experiments.
            </p>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* Key Insight Callout                                                 */}
      {/* ================================================================== */}
      <div style={calloutStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
          Key Insight: The Observable Check Is Everything
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Across all four loops, the critical failure point is Step 2: the observable check.
          Internal states without external grounding become confabulation. Decisions without
          data become guesses. Behavior without calibration becomes noise. The observable check
          is what turns a belief into knowledge, a plan into a strategy, and an assertion into
          a verifiable claim. In Web4 trust systems, this is the D5 dimension — the bridge
          between what an agent thinks and what the network can verify. Without it, there is
          no meta-cognition, only the illusion of it.
        </p>
      </div>

      {/* ================================================================== */}
      {/* The Four-Loop Summary Table                                         */}
      {/* ================================================================== */}
      <h2 style={sectionHeaderStyle}>All Four Loops at a Glance</h2>
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loop</th>
              {STEP_LABELS.map(label => (
                <th key={label} style={{ textAlign: 'left', padding: '0.6rem 0.75rem', borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEEDBACK_LOOPS.map(fl => (
              <tr key={fl.id}>
                <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--color-border)', color: fl.color, fontWeight: 600 }}>
                  {fl.name}
                </td>
                {fl.steps.map((step, i) => (
                  <td key={i} style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                    {step.detail}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================================================================== */}
      {/* Pattern Recognition Callout                                         */}
      {/* ================================================================== */}
      <div style={{
        padding: '1.25rem',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-dark-surface, rgba(30, 30, 40, 0.6))',
        marginBottom: '2rem',
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text)' }}>
          The Universal Pattern
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Every feedback loop follows the same structure: <strong style={{ color: 'var(--color-text)' }}>believe</strong> something,{' '}
          <strong style={{ color: 'var(--color-text)' }}>check</strong> it against reality,{' '}
          <strong style={{ color: 'var(--color-text)' }}>decide</strong> based on the check, and{' '}
          <strong style={{ color: 'var(--color-text)' }}>act</strong> accordingly. This pattern applies
          to thermostats, immune systems, scientific method, and AI meta-cognition alike. The insight
          from the SAGE research is that AI systems can learn to close these loops autonomously — but
          only above a certain capacity threshold. Below it, we must build the loops into the architecture.
        </p>
      </div>

      <RelatedConcepts currentPath="/feedback-loop-explorer" />
    </div>
  );
}
