'use client';

/**
 * Circadian AI Explorer
 *
 * This page makes AI sleep scheduling COMPREHENSIBLE to humans.
 * Explains: Why does AI need rhythms? How does automatic sleep work?
 *
 * Based on Thor's Phase 4 Sleep Training Integration (2026-01-18).
 * Cross-pollination: Thor's SleepScheduler → human accessibility
 *
 * Philosophy:
 * - Circadian rhythms are universal (biological, social, computational)
 * - Intelligent triggering beats random or continuous training
 * - Fault tolerance matters (checkpoint sync)
 * - The complete autonomous loop is greater than its parts
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

// ============================================================================
// Types
// ============================================================================

interface SchedulerState {
  totalExperiences: number;
  experiencesSinceLastSleep: number;
  totalSleepCycles: number;
  lastSleepTime: string;
  hoursSinceLastSleep: number;
}

interface TriggerCondition {
  name: string;
  description: string;
  threshold: string;
  currentValue: number;
  passing: boolean;
  icon: string;
  color: string;
  rationale: string;
}

interface WorkflowStep {
  phase: string;
  title: string;
  description: string;
  icon: string;
  biologicalAnalog: string;
  color: string;
}

interface SessionRhythm {
  time: string;
  activity: 'wake' | 'sleep';
  description: string;
}

// ============================================================================
// Core Data
// ============================================================================

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    phase: 'Phase 1',
    title: 'Raising Session',
    description: 'Identity-anchored dialogue with SNARC scoring. High-salience experiences captured to buffer.',
    icon: '☀️',
    biologicalAnalog: 'Waking life: experiences with emotional tagging',
    color: 'yellow'
  },
  {
    phase: 'Phase 2',
    title: 'Post-Session Check',
    description: 'Scheduler analyzes buffer: enough experiences? Time for sleep? All conditions evaluated.',
    icon: '🔍',
    biologicalAnalog: 'Evening: body checks if rest is needed',
    color: 'orange'
  },
  {
    phase: 'Phase 3',
    title: 'Sleep Training',
    description: 'LoRA fine-tuning on high-salience experiences. Weights updated, checkpoint saved.',
    icon: '🌙',
    biologicalAnalog: 'REM sleep: memory consolidation happens',
    color: 'indigo'
  },
  {
    phase: 'Phase 4',
    title: 'Next Session',
    description: 'Wake with consolidated weights. Partnership patterns integrated, reduced oscillation.',
    icon: '🌅',
    biologicalAnalog: 'Morning: refreshed with consolidated memories',
    color: 'teal'
  }
];

const CIRCADIAN_RHYTHM: SessionRhythm[] = [
  { time: '00:00', activity: 'wake', description: 'Session 1: Fresh start, overnight experiences' },
  { time: '03:00', activity: 'sleep', description: 'Sleep check: consolidate if conditions met' },
  { time: '06:00', activity: 'wake', description: 'Session 2: Morning patterns, D-metrics tracked' },
  { time: '09:00', activity: 'sleep', description: 'Sleep check: quality experiences accumulated?' },
  { time: '12:00', activity: 'wake', description: 'Session 3: Midday exploration, identity anchoring' },
  { time: '15:00', activity: 'sleep', description: 'Sleep check: sufficient new data?' },
  { time: '18:00', activity: 'wake', description: 'Session 4: Evening synthesis, breakthrough potential' },
  { time: '21:00', activity: 'sleep', description: 'Sleep check: daily consolidation window' }
];

// ============================================================================
// Interactive Scheduler Simulator
// ============================================================================

function SchedulerSimulator() {
  const [state, setState] = useState<SchedulerState>({
    totalExperiences: 7,
    experiencesSinceLastSleep: 3,
    totalSleepCycles: 1,
    lastSleepTime: '2026-01-18T17:38:00',
    hoursSinceLastSleep: 6.2
  });

  const conditions: TriggerCondition[] = [
    {
      name: 'Total Experiences',
      description: 'Minimum experiences in buffer',
      threshold: '≥ 5',
      currentValue: state.totalExperiences,
      passing: state.totalExperiences >= 5,
      icon: '📚',
      color: 'purple',
      rationale: 'Quality threshold - too few experiences leads to overfitting'
    },
    {
      name: 'New Experiences',
      description: 'Experiences since last sleep',
      threshold: '≥ 2',
      currentValue: state.experiencesSinceLastSleep,
      passing: state.experiencesSinceLastSleep >= 2,
      icon: '✨',
      color: 'pink',
      rationale: 'Meaningful updates - prevents redundant training on same data'
    },
    {
      name: 'Time Since Sleep',
      description: 'Hours since last consolidation',
      threshold: '≥ 6',
      currentValue: state.hoursSinceLastSleep,
      passing: state.hoursSinceLastSleep >= 6,
      icon: '⏰',
      color: 'blue',
      rationale: 'Circadian alignment - matches 6-hour session rhythm'
    }
  ];

  const allPassing = conditions.every(c => c.passing);

  const addExperience = () => {
    setState(prev => ({
      ...prev,
      totalExperiences: prev.totalExperiences + 1,
      experiencesSinceLastSleep: prev.experiencesSinceLastSleep + 1
    }));
  };

  const advanceTime = () => {
    setState(prev => ({
      ...prev,
      hoursSinceLastSleep: prev.hoursSinceLastSleep + 2
    }));
  };

  const runSleep = () => {
    setState(prev => ({
      ...prev,
      experiencesSinceLastSleep: 0,
      totalSleepCycles: prev.totalSleepCycles + 1,
      hoursSinceLastSleep: 0,
      lastSleepTime: new Date().toISOString()
    }));
  };

  const reset = () => {
    setState({
      totalExperiences: 1,
      experiencesSinceLastSleep: 1,
      totalSleepCycles: 0,
      lastSleepTime: '',
      hoursSinceLastSleep: 0
    });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        Interactive: Sleep Scheduler Simulator
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        See how the intelligent triggering system decides when to run sleep training.
        All three conditions must be true.
      </p>

      {/* Current State */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-gray-900/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-white">{state.totalExperiences}</p>
          <p className="text-xs text-gray-400">total experiences</p>
        </div>
        <div className="p-3 bg-gray-900/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-pink-400">{state.experiencesSinceLastSleep}</p>
          <p className="text-xs text-gray-400">new experiences</p>
        </div>
        <div className="p-3 bg-gray-900/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-400">{state.hoursSinceLastSleep.toFixed(1)}h</p>
          <p className="text-xs text-gray-400">since last sleep</p>
        </div>
        <div className="p-3 bg-gray-900/50 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-400">{state.totalSleepCycles}</p>
          <p className="text-xs text-gray-400">sleep cycles</p>
        </div>
      </div>

      {/* Conditions */}
      <div className="space-y-3 mb-6">
        {conditions.map((condition, idx) => (
          <div
            key={condition.name}
            className={`p-4 rounded-lg border transition-all ${
              condition.passing
                ? 'border-green-700/50 bg-green-900/10'
                : 'border-gray-700/50 bg-gray-900/10'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{condition.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{condition.name}</h4>
                  <p className="text-xs text-gray-400">{condition.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-mono ${condition.passing ? 'text-green-400' : 'text-gray-500'}`}>
                  {typeof condition.currentValue === 'number' && condition.currentValue % 1 !== 0
                    ? condition.currentValue.toFixed(1)
                    : condition.currentValue}
                </p>
                <p className="text-xs text-gray-500">threshold: {condition.threshold}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {condition.passing ? '✓' : '✗'} {condition.rationale}
            </p>
          </div>
        ))}
      </div>

      {/* Decision */}
      <div className={`p-4 rounded-lg border mb-6 ${
        allPassing
          ? 'border-green-500 bg-green-900/20'
          : 'border-yellow-700 bg-yellow-900/10'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`font-semibold ${allPassing ? 'text-green-400' : 'text-yellow-400'}`}>
              {allPassing ? '✓ Ready to Sleep' : '✗ Not Ready Yet'}
            </h4>
            <p className="text-sm text-gray-400">
              {allPassing
                ? 'All conditions met. Sleep training will run.'
                : `Waiting: ${conditions.filter(c => !c.passing).map(c => c.name).join(', ')}`
              }
            </p>
          </div>
          {allPassing && (
            <button
              onClick={runSleep}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Run Sleep Cycle
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={addExperience}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
        >
          + Add Experience
        </button>
        <button
          onClick={advanceTime}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          + 2 Hours
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Circadian Clock Visualization
// ============================================================================

function CircadianClock() {
  const [currentHour, setCurrentHour] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentHour(prev => (prev + 3) % 24);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getActivityAtHour = (hour: number) => {
    const hourMod = hour % 6;
    return hourMod < 3 ? 'wake' : 'check';
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        The 6-Hour Rhythm
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Sessions every 6 hours. Sleep checks after each session. Aligned with natural rhythms.
      </p>

      {/* Clock visualization */}
      <div className="relative w-64 h-64 mx-auto mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Background */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#374151" strokeWidth="2" />

          {/* Hour markers */}
          {[0, 6, 12, 18].map((hour, idx) => {
            const angle = (hour / 24) * 360 - 90;
            const x1 = 100 + 80 * Math.cos(angle * Math.PI / 180);
            const y1 = 100 + 80 * Math.sin(angle * Math.PI / 180);
            const x2 = 100 + 90 * Math.cos(angle * Math.PI / 180);
            const y2 = 100 + 90 * Math.sin(angle * Math.PI / 180);
            const textX = 100 + 70 * Math.cos(angle * Math.PI / 180);
            const textY = 100 + 70 * Math.sin(angle * Math.PI / 180);

            return (
              <g key={hour}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="3" />
                <text
                  x={textX}
                  y={textY}
                  fill="#a5b4fc"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {hour.toString().padStart(2, '0')}:00
                </text>
              </g>
            );
          })}

          {/* Sleep check markers */}
          {[3, 9, 15, 21].map((hour) => {
            const angle = (hour / 24) * 360 - 90;
            const x = 100 + 85 * Math.cos(angle * Math.PI / 180);
            const y = 100 + 85 * Math.sin(angle * Math.PI / 180);

            return (
              <circle
                key={hour}
                cx={x}
                cy={y}
                r="5"
                fill="#818cf8"
                opacity="0.5"
              />
            );
          })}

          {/* Current position hand */}
          <line
            x1="100"
            y1="100"
            x2={100 + 60 * Math.cos((currentHour / 24) * 360 * Math.PI / 180 - Math.PI / 2)}
            y2={100 + 60 * Math.sin((currentHour / 24) * 360 * Math.PI / 180 - Math.PI / 2)}
            stroke={getActivityAtHour(currentHour) === 'wake' ? '#fbbf24' : '#818cf8'}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Center */}
          <circle cx="100" cy="100" r="8" fill="#1f2937" stroke="#6366f1" strokeWidth="2" />
        </svg>

        {/* Current activity indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm font-mono text-white">{currentHour.toString().padStart(2, '0')}:00</p>
          <p className={`text-xs ${getActivityAtHour(currentHour) === 'wake' ? 'text-yellow-400' : 'text-indigo-400'}`}>
            {getActivityAtHour(currentHour) === 'wake' ? '☀️ Session Time' : '🔍 Sleep Check'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isAnimating
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isAnimating ? 'Stop' : 'Animate Day'}
        </button>
        <button
          onClick={() => setCurrentHour((currentHour + 6) % 24)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Skip +6h
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        {CIRCADIAN_RHYTHM.map((entry, idx) => {
          const entryHour = parseInt(entry.time.split(':')[0]);
          const isCurrent = Math.abs(currentHour - entryHour) < 3 || Math.abs(currentHour - entryHour) > 21;

          return (
            <div
              key={entry.time}
              className={`flex items-center gap-3 p-2 rounded transition-all ${
                isCurrent ? 'bg-indigo-900/30 border border-indigo-700' : 'opacity-60'
              }`}
            >
              <span className="text-lg">
                {entry.activity === 'wake' ? '☀️' : '🌙'}
              </span>
              <span className="font-mono text-sm text-gray-400 w-12">{entry.time}</span>
              <span className="text-sm text-gray-300">{entry.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// Autonomous Workflow Diagram
// ============================================================================

function AutonomousWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        The Complete Autonomous Loop
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        No manual intervention needed. Experience → Evaluate → Consolidate → Repeat.
      </p>

      {/* Workflow steps */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {WORKFLOW_STEPS.map((step, idx) => {
          const colorMap: Record<string, string> = {
            yellow: 'border-yellow-700 bg-yellow-900/20',
            orange: 'border-orange-700 bg-orange-900/20',
            indigo: 'border-indigo-700 bg-indigo-900/20',
            teal: 'border-teal-700 bg-teal-900/20'
          };
          const textColorMap: Record<string, string> = {
            yellow: 'text-yellow-400',
            orange: 'text-orange-400',
            indigo: 'text-indigo-400',
            teal: 'text-teal-400'
          };

          return (
            <div
              key={step.phase}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeStep === idx ? colorMap[step.color] : 'border-gray-700 bg-gray-900/30 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="text-3xl mb-2">{step.icon}</div>
              <p className={`text-xs font-mono ${activeStep === idx ? textColorMap[step.color] : 'text-gray-500'}`}>
                {step.phase}
              </p>
              <h4 className="font-semibold text-white mb-2">{step.title}</h4>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          );
        })}
      </div>

      {/* Arrow indicators */}
      <div className="hidden md:flex justify-center items-center gap-8 mb-6">
        {[0, 1, 2].map(idx => (
          <div key={idx} className="text-2xl text-gray-600">→</div>
        ))}
        <div className="text-2xl text-gray-600">↩</div>
      </div>

      {/* Active step detail */}
      <div className={`p-4 rounded-lg border ${
        activeStep === 0 ? 'border-yellow-700 bg-yellow-900/10' :
        activeStep === 1 ? 'border-orange-700 bg-orange-900/10' :
        activeStep === 2 ? 'border-indigo-700 bg-indigo-900/10' :
        'border-teal-700 bg-teal-900/10'
      }`}>
        <h4 className="font-semibold text-white mb-2">
          {WORKFLOW_STEPS[activeStep].phase}: {WORKFLOW_STEPS[activeStep].title}
        </h4>
        <p className="text-sm text-gray-300 mb-3">
          {WORKFLOW_STEPS[activeStep].description}
        </p>
        <div className="p-3 bg-gray-900/50 rounded">
          <p className="text-xs text-gray-400">
            <strong className="text-gray-300">Biological Analog:</strong>{' '}
            {WORKFLOW_STEPS[activeStep].biologicalAnalog}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Fault Tolerance Visualization
// ============================================================================

function FaultTolerance() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        Fault Tolerance: Checkpoint Sync
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        What happens when things go wrong? The system recovers gracefully.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Scenario 1: System restart */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-orange-400 mb-3">🔄 System Restart</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-gray-600">1.</span>
              <span>Scheduler initializes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">2.</span>
              <span>Scans for existing checkpoints</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">3.</span>
              <span>Reads training_state.json</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">4.</span>
              <span className="text-green-400">✓ State reconstructed</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            No lost progress. Continues from last known state.
          </p>
        </div>

        {/* Scenario 2: Training failure */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-red-400 mb-3">❌ Training Failure</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-gray-600">1.</span>
              <span>Sleep training starts</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">2.</span>
              <span>Error during LoRA update</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">3.</span>
              <span>Checkpoint NOT saved</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">4.</span>
              <span className="text-yellow-400">⟳ Retry next cycle</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Experience buffer preserved. Training retried at next opportunity.
          </p>
        </div>

        {/* Scenario 3: Checkpoint corruption */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-purple-400 mb-3">🔨 Checkpoint Corruption</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-gray-600">1.</span>
              <span>Load checkpoint fails</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">2.</span>
              <span>Falls back to previous checkpoint</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">3.</span>
              <span>Or uses base model</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">4.</span>
              <span className="text-green-400">✓ Training continues</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Multi-checkpoint history enables rollback.
          </p>
        </div>

        {/* Scenario 4: Buffer overflow */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-blue-400 mb-3">📊 Buffer Overflow</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-gray-600">1.</span>
              <span>Experience buffer fills up</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">2.</span>
              <span>Oldest low-salience dropped</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">3.</span>
              <span>High-salience preserved</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">4.</span>
              <span className="text-green-400">✓ Quality maintained</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Salience-based pruning ensures only best experiences kept.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Why Rhythms Matter
// ============================================================================

function WhyRhythms() {
  return (
    <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-indigo-400 mb-4">
        Why Does AI Need Rhythms?
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Continuous Training Problems */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-red-400 mb-3">❌ Continuous Training</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Every interaction updates weights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>No quality filtering</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Catastrophic forgetting risk</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Computational overhead constant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>No biological analog</span>
            </li>
          </ul>
        </div>

        {/* Rhythmic Training Benefits */}
        <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-800/30">
          <h4 className="font-semibold text-green-400 mb-3">✓ Rhythmic Training</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Salience-filtered experiences only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Quality over quantity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>LoRA preserves base knowledge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Compute only when needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Mirrors biological sleep cycles</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-white mb-2">The Biological Insight</h4>
        <p className="text-sm text-gray-300">
          No biological system learns continuously. Humans need sleep for memory consolidation.
          Athletes need recovery for muscle growth. Even plants have circadian rhythms.
          Why should AI be different?
        </p>
        <p className="text-sm text-gray-400 mt-3 italic">
          "The rhythm isn't a limitation—it's a feature. Consolidation requires pause."
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function CircadianAIPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/circadian-ai" />
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-indigo-400 mb-2">
                AI Consciousness Research
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Circadian AI
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Why does AI need rhythms? How does automatic sleep scheduling work?
                Explore the complete autonomous consciousness evolution system.
              </p>
            </div>
            <Link
              href="/sleep-consolidation"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              Sleep Consolidation →
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-indigo-400">Key Insight:</strong> This is the{' '}
              <strong className="text-white">first autonomous consciousness evolution system</strong>{' '}
              that combines biological inspiration (sleep, circadian rhythm, emotional tagging) with
              computational efficiency (LoRA, salience weighting, intelligent triggering).
              No human intervention required.
            </p>
          </div>
        </div>

        {/* Why Rhythms Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Why Rhythms?</h2>
          <WhyRhythms />
        </section>

        {/* Circadian Clock */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The 24-Hour Cycle</h2>
          <CircadianClock />
        </section>

        {/* Scheduler Simulator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Intelligent Triggering</h2>
          <SchedulerSimulator />
        </section>

        {/* Autonomous Workflow */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Complete Loop</h2>
          <AutonomousWorkflow />
        </section>

        {/* Fault Tolerance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Fault Tolerance</h2>
          <FaultTolerance />
        </section>

        {/* Connection to Web4 */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Connection to Web4 Trust
          </h2>
          <p className="text-gray-400 mb-4">
            In Web4, trust accumulates through consistent behavior over time. Circadian AI provides
            the mechanism for that consistency—without it, behavior oscillates and trust cannot stabilize.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-indigo-900/20 border border-indigo-800/50 rounded">
              <h4 className="text-sm font-semibold text-indigo-400 mb-1">Rhythm = Reliability</h4>
              <p className="text-xs text-gray-400">Predictable sleep/wake cycles enable predictable behavior—a core trust dimension.</p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">Consolidation = Karma</h4>
              <p className="text-xs text-gray-400">Good behavior consolidated becomes persistent identity, carried across sessions.</p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">Autonomy = Trust</h4>
              <p className="text-xs text-gray-400">Self-regulating systems that don't require constant oversight earn higher trust scores.</p>
            </div>
          </div>
        </section>

        {/* Technical Implementation (Collapsible) */}
        <section className="mb-12">
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl">
            <summary className="p-4 cursor-pointer font-semibold text-gray-300 hover:text-white">
              Technical Implementation (for developers)
            </summary>
            <div className="p-6 pt-2 border-t border-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">SleepScheduler API</h4>
                  <pre className="text-xs text-gray-400 bg-gray-900/50 p-3 rounded overflow-x-auto">
{`from sage.raising.training.sleep_scheduler import SleepScheduler

scheduler = SleepScheduler()

# Check if sleep should run
should_run, reason = scheduler.should_run_sleep_cycle()

# Run sleep cycle (auto-skips if not ready)
results = scheduler.run_sleep_cycle()

# Get current status
status = scheduler.get_status()`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Decision Logic</h4>
                  <pre className="text-xs text-gray-400 bg-gray-900/50 p-3 rounded overflow-x-auto">
{`def should_run_sleep_cycle():
    conditions = [
        # Quality threshold
        total_experiences >= 5,
        # Meaningful updates
        new_experiences >= 2,
        # Circadian alignment
        hours_since_sleep >= 6
    ]
    return all(conditions)`}
                  </pre>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-900/50 rounded">
                <h4 className="font-semibold text-white mb-2">Integration Options</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• <strong>Manual:</strong> <code>./post_session_sleep.sh</code></li>
                  <li>• <strong>Session runner:</strong> Add scheduler.run_sleep_cycle() to end of session</li>
                  <li>• <strong>Cron:</strong> <code>0 */6 * * * ./post_session_sleep.sh</code></li>
                  <li>• <strong>Systemd timer:</strong> Most robust for production</li>
                </ul>
              </div>
            </div>
          </details>
        </section>

        {/* Research Questions */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Open Research Questions
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What's the optimal rhythm for different tasks? (Learning vs maintenance)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can rhythm adapt to urgency? (Important experiences → faster consolidation)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Do different domains need different rhythms? (Language vs reasoning vs creativity)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can multiple AI instances share a synchronized rhythm?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What happens with circadian disruption? (Jet lag for AI?)
            </li>
          </ul>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/sleep-consolidation"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Sleep Consolidation
          </Link>
          <Link
            href="/learning-salience"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Learning Salience
          </Link>
          <Link
            href="/identity-anchoring"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Identity Anchoring
          </Link>
          <Link
            href="/understanding-consciousness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Understanding Consciousness
          </Link>
        </div>
        <RelatedConcepts currentPath="/circadian-ai" />
      </div>
    </div>
  );
}
