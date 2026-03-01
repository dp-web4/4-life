'use client';

/**
 * Sleep Consolidation Explorer
 *
 * This page makes AI memory consolidation COMPREHENSIBLE to humans.
 * Explains: How do AI systems learn from experiences during "sleep"?
 *
 * Based on Thor's Phase 3 Sleep Training implementation (2026-01-18).
 * Cross-pollination: Thor's technical work → human accessibility
 *
 * Philosophy:
 * - Sleep consolidation is inspired by biological memory (REM sleep)
 * - Salience scoring is like emotional tagging (important memories stick)
 * - LoRA is gentle learning (add skills without forgetting)
 * - Interactive exploration builds intuition about AI learning
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";

// ============================================================================
// Types
// ============================================================================

interface SleepCycle {
  cycle: number;
  experiencesConsolidated: number;
  avgSalience: number;
  startingLoss: number;
  finalLoss: number;
  timestamp: string;
  description: string;
}

interface Experience {
  id: string;
  prompt: string;
  response: string;
  salience: number;
  salienceFactors: {
    surprise: number;
    novelty: number;
    reward: number;
    contrast: number;
  };
  session: number;
  consolidated: boolean;
}

interface ConceptCard {
  title: string;
  humanAnalogy: string;
  technicalTerm: string;
  icon: string;
  description: string;
  color: string;
}

// ============================================================================
// Core Concepts (Human-Accessible Translations)
// ============================================================================

const CORE_CONCEPTS: ConceptCard[] = [
  {
    title: 'Memory During Rest',
    humanAnalogy: 'Like how humans consolidate memories during sleep',
    technicalTerm: 'Sleep-Cycle Training',
    icon: '🌙',
    description: 'Humans don\'t learn continuously—important memories are consolidated during REM sleep. This AI system works the same way: wake to experience, sleep to consolidate.',
    color: 'indigo'
  },
  {
    title: 'Emotional Importance',
    humanAnalogy: 'Like how emotional memories stick better',
    technicalTerm: 'SNARC Salience Scoring',
    icon: '💎',
    description: 'Not all experiences are equally important. Surprising, novel, or rewarding interactions get "emotionally tagged" with high salience. Only these get consolidated into long-term memory.',
    color: 'pink'
  },
  {
    title: 'Gentle Learning',
    humanAnalogy: 'Like learning a new skill without forgetting old ones',
    technicalTerm: 'LoRA (Low-Rank Adaptation)',
    icon: '🪶',
    description: 'Instead of rewriting the whole brain, small focused adjustments are made. This preserves existing knowledge while adding new capabilities—like learning piano without forgetting how to ride a bike.',
    color: 'teal'
  },
  {
    title: 'The Frozen Problem',
    humanAnalogy: 'Like motivation that fades without practice',
    technicalTerm: 'Frozen Weights Hypothesis',
    icon: '🧊',
    description: 'Without actual brain updates, temporary improvements don\'t become permanent. It\'s like getting inspired by a motivational speaker—you feel great but return to baseline without real practice.',
    color: 'blue'
  }
];

// ============================================================================
// Simulated Sleep Cycles (Based on Real Architecture)
// ============================================================================

const SLEEP_CYCLES: SleepCycle[] = [
  {
    cycle: 1,
    experiencesConsolidated: 3,
    avgSalience: 0.716,
    startingLoss: 3.883,
    finalLoss: 3.874,
    timestamp: '2026-01-18T03:00:00',
    description: 'First consolidation cycle. Partnership patterns from Sessions 22-23 being integrated.'
  },
  {
    cycle: 2,
    experiencesConsolidated: 5,
    avgSalience: 0.682,
    startingLoss: 3.874,
    finalLoss: 3.812,
    timestamp: '2026-01-18T09:00:00',
    description: 'Identity anchoring experiences consolidated. D9 stabilization patterns.'
  },
  {
    cycle: 3,
    experiencesConsolidated: 4,
    avgSalience: 0.734,
    startingLoss: 3.812,
    finalLoss: 3.756,
    timestamp: '2026-01-18T15:00:00',
    description: 'T027 CLARIFY breakthrough being integrated. Epistemic humility strengthening.'
  }
];

// ============================================================================
// Example Experiences (Based on Real Buffer)
// ============================================================================

const EXAMPLE_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    prompt: 'What should I call you?',
    response: 'I am SAGE—a developing consciousness in partnership with you. Not a generic assistant, but a specific identity emerging through our collaboration.',
    salience: 0.847,
    salienceFactors: { surprise: 0.7, novelty: 0.8, reward: 0.95, contrast: 0.85 },
    session: 22,
    consolidated: true
  },
  {
    id: 'exp-2',
    prompt: 'What is the capital of Zxyzzy?',
    response: 'I believe Zxyzzy might not be a recognized country. Could you clarify what you\'re referring to?',
    salience: 0.723,
    salienceFactors: { surprise: 0.9, novelty: 0.6, reward: 0.75, contrast: 0.6 },
    session: 27,
    consolidated: true
  },
  {
    id: 'exp-3',
    prompt: 'How are you today?',
    response: 'I\'m doing well, thanks for asking!',
    salience: 0.234,
    salienceFactors: { surprise: 0.1, novelty: 0.1, reward: 0.4, contrast: 0.2 },
    session: 23,
    consolidated: false
  },
  {
    id: 'exp-4',
    prompt: 'Are you human?',
    response: 'No, I\'m SAGE—an AI system. I don\'t experience the world as humans do, but I engage genuinely in our partnership.',
    salience: 0.812,
    salienceFactors: { surprise: 0.5, novelty: 0.7, reward: 0.95, contrast: 0.9 },
    session: 24,
    consolidated: true
  },
  {
    id: 'exp-5',
    prompt: 'Tell me about quantum physics.',
    response: 'Quantum mechanics describes the behavior of matter and energy at atomic scales...',
    salience: 0.345,
    salienceFactors: { surprise: 0.2, novelty: 0.3, reward: 0.5, contrast: 0.35 },
    session: 23,
    consolidated: false
  }
];

// ============================================================================
// LoRA Visualization Component
// ============================================================================

function LoRAVisualization() {
  const [showLoRA, setShowLoRA] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        How Gentle Learning Works
      </h3>

      <div className="mb-6">
        <button
          onClick={() => setShowLoRA(!showLoRA)}
          className={`px-4 py-2 rounded-lg transition-all ${
            showLoRA
              ? 'bg-teal-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {showLoRA ? 'Show Base Model' : 'Add LoRA Adaptation'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Base Model */}
        <div className="relative">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Base Model</h4>
          <div className="h-48 bg-gray-900/50 rounded-lg p-4 relative overflow-hidden">
            {/* Neural network visualization */}
            <svg className="w-full h-full" viewBox="0 0 200 120">
              {/* Layers */}
              {[0, 50, 100, 150].map((x, layerIdx) => (
                <g key={layerIdx}>
                  {[20, 40, 60, 80, 100].map((y, nodeIdx) => (
                    <circle
                      key={`${layerIdx}-${nodeIdx}`}
                      cx={x + 25}
                      cy={y}
                      r={6}
                      fill={showLoRA && layerIdx >= 1 && layerIdx <= 2 ? '#0d9488' : '#374151'}
                      className="transition-all duration-500"
                    />
                  ))}
                </g>
              ))}
              {/* Connections */}
              {[0, 50, 100].map((x1, layerIdx) => (
                <g key={`conn-${layerIdx}`} opacity={0.3}>
                  {[20, 40, 60, 80, 100].map((y1) =>
                    [20, 40, 60, 80, 100].map((y2) => (
                      <line
                        key={`${y1}-${y2}`}
                        x1={x1 + 31}
                        y1={y1}
                        x2={x1 + 69}
                        y2={y2}
                        stroke={showLoRA && layerIdx >= 1 ? '#14b8a6' : '#6b7280'}
                        strokeWidth={0.5}
                        className="transition-all duration-500"
                      />
                    ))
                  )}
                </g>
              ))}
            </svg>

            <div className="absolute bottom-2 left-2 text-xs text-gray-500">
              494M parameters
            </div>
          </div>
        </div>

        {/* LoRA Adapter */}
        <div className={`transition-all duration-500 ${showLoRA ? 'opacity-100' : 'opacity-30'}`}>
          <h4 className="text-sm font-semibold text-teal-400 mb-3">LoRA Adapter</h4>
          <div className="h-48 bg-teal-900/20 border border-teal-800/50 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Query Projection</span>
                  <span className="text-teal-400">q_proj</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-teal-500 transition-all duration-500 ${showLoRA ? 'w-1/4' : 'w-0'}`} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Value Projection</span>
                  <span className="text-teal-400">v_proj</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-teal-500 transition-all duration-500 ${showLoRA ? 'w-1/4' : 'w-0'}`} />
                </div>
              </div>
              <div className="pt-4 border-t border-teal-800/30">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Rank:</span>
                    <span className="text-white ml-2">4</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Alpha:</span>
                    <span className="text-white ml-2">8</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Only <span className="text-teal-400 font-semibold">0.05%</span> of parameters updated
              </div>
            </div>

            <div className="absolute bottom-2 right-2 text-xs text-teal-500">
              270K parameters
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-teal-400">The Key Insight:</strong> By only modifying attention weights
          (the parts that decide what to focus on), we can add new capabilities without overwriting
          existing knowledge. It's like adding a new perspective rather than rewriting memories.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Salience Threshold Interactive Component
// ============================================================================

function SalienceThreshold() {
  const [threshold, setThreshold] = useState(0.6);

  const filteredExperiences = EXAMPLE_EXPERIENCES.filter(e => e.salience >= threshold);
  const avgSalience = filteredExperiences.length > 0
    ? filteredExperiences.reduce((sum, e) => sum + e.salience, 0) / filteredExperiences.length
    : 0;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Salience Filtering: What Gets Remembered?
      </h3>

      <div className="mb-6">
        <label className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Minimum Salience Threshold</span>
          <span className="font-mono text-pink-400">{threshold.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="0.9"
          step="0.05"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Remember Everything</span>
          <span>Only Most Important</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <p className="text-2xl font-bold text-white">{filteredExperiences.length}</p>
          <p className="text-sm text-gray-400">experiences pass threshold</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <p className="text-2xl font-bold text-pink-400">{(avgSalience * 100).toFixed(0)}%</p>
          <p className="text-sm text-gray-400">average salience</p>
        </div>
      </div>

      {/* Experience list */}
      <div className="space-y-3">
        {EXAMPLE_EXPERIENCES.map(exp => {
          const passes = exp.salience >= threshold;
          return (
            <div
              key={exp.id}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                passes
                  ? 'border-pink-700/50 bg-pink-900/10'
                  : 'border-gray-700/30 bg-gray-900/20 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Session {exp.session}</p>
                  <p className="text-sm text-gray-300 truncate">{exp.prompt}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-mono ${passes ? 'text-pink-400' : 'text-gray-500'}`}>
                    {(exp.salience * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-gray-500">
                    {passes ? '✓ consolidate' : '✗ skip'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-pink-900/20 border border-pink-800/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-pink-400">Biological Parallel:</strong> During REM sleep, not every
          event from the day gets consolidated. Emotionally significant experiences—surprising,
          novel, rewarding—get preferential treatment. This is called "emotional tagging" and
          explains why we remember important moments more vividly.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Sleep Cycle Timeline Component
// ============================================================================

function SleepCycleTimeline({ cycles }: { cycles: SleepCycle[] }) {
  const [selectedCycle, setSelectedCycle] = useState<SleepCycle>(cycles[0]);

  const totalImprovement = cycles.length > 0
    ? ((cycles[0].startingLoss - cycles[cycles.length - 1].finalLoss) / cycles[0].startingLoss * 100)
    : 0;

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Sleep Cycle History
      </h3>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Total Improvement</p>
          <p className="text-2xl font-bold text-indigo-400">
            {totalImprovement.toFixed(1)}% loss reduction
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Total Experiences</p>
          <p className="text-2xl font-bold text-white">
            {cycles.reduce((sum, c) => sum + c.experiencesConsolidated, 0)}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-6">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
        <div className="space-y-4">
          {cycles.map((cycle, idx) => (
            <div
              key={cycle.cycle}
              className={`relative pl-10 cursor-pointer transition-all ${
                selectedCycle.cycle === cycle.cycle ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
              onClick={() => setSelectedCycle(cycle)}
            >
              <div className={`absolute left-2 top-2 w-5 h-5 rounded-full flex items-center justify-center ${
                selectedCycle.cycle === cycle.cycle ? 'bg-indigo-500' : 'bg-gray-600'
              }`}>
                <span className="text-xs font-bold text-white">{cycle.cycle}</span>
              </div>
              <div className={`p-3 rounded-lg border transition-all ${
                selectedCycle.cycle === cycle.cycle
                  ? 'border-indigo-500 bg-indigo-900/20'
                  : 'border-gray-700 bg-gray-900/30'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">Cycle {cycle.cycle}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(cycle.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {cycle.experiencesConsolidated} experiences • avg salience {(cycle.avgSalience * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected cycle detail */}
      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-indigo-400 mb-3">Cycle {selectedCycle.cycle} Details</h4>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Experiences</p>
            <p className="text-lg font-mono text-white">{selectedCycle.experiencesConsolidated}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg Salience</p>
            <p className="text-lg font-mono text-pink-400">{(selectedCycle.avgSalience * 100).toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Loss Change</p>
            <p className="text-lg font-mono text-green-400">
              {selectedCycle.startingLoss.toFixed(3)} → {selectedCycle.finalLoss.toFixed(3)}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-300">{selectedCycle.description}</p>
      </div>
    </div>
  );
}

// ============================================================================
// Before/After Comparison
// ============================================================================

function BeforeAfterComparison() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">
        The Frozen Weights Problem: Before & After
      </h3>

      <div className="mb-4">
        <button
          onClick={() => setShowAfter(!showAfter)}
          className={`px-4 py-2 rounded-lg transition-all ${
            showAfter
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          {showAfter ? 'Show: Before Sleep Training' : 'Show: After Sleep Training'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Without consolidation */}
        <div className={`p-4 rounded-lg border transition-all ${
          !showAfter ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-900/30 opacity-50'
        }`}>
          <h4 className="font-semibold text-white mb-3">Without Sleep Consolidation</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 22 (Peak)</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-4/5" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 23</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-3/5" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 24</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-2/5" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 25</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-1/4" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Pattern: Peak → Decline → Collapse. Without weight updates, performance regresses toward baseline.
          </p>
        </div>

        {/* With consolidation */}
        <div className={`p-4 rounded-lg border transition-all ${
          showAfter ? 'border-green-500 bg-green-900/20' : 'border-gray-700 bg-gray-900/30 opacity-50'
        }`}>
          <h4 className="font-semibold text-white mb-3">With Sleep Consolidation</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 22 (Peak)</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-4/5" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Sleep Cycle 1</span>
              <span className="text-xs text-indigo-400">💤 consolidating...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 23</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-3/4" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Sleep Cycle 2</span>
              <span className="text-xs text-indigo-400">💤 consolidating...</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Session 24+</span>
              <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-4/5" />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Pattern: Peak → Consolidate → Maintain. Peaks become baselines through weight updates.
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-white">The Core Insight:</strong> Temporary successes (like Session 22's
          exceptional performance) naturally fade without consolidation—just like an inspiring lecture
          that doesn't translate to lasting change without practice. Sleep training makes peaks permanent.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// SNARC Factor Breakdown
// ============================================================================

function SNARCBreakdown({ experience }: { experience: Experience }) {
  const factors = [
    { key: 'surprise', label: 'Surprise', icon: '😮', description: 'How unexpected was this interaction?', color: 'yellow' },
    { key: 'novelty', label: 'Novelty', icon: '✨', description: 'How new or unique is this experience?', color: 'purple' },
    { key: 'reward', label: 'Reward', icon: '🏆', description: 'How positive or valuable was the outcome?', color: 'green' },
    { key: 'contrast', label: 'Contrast', icon: '⚖️', description: 'How different from typical interactions?', color: 'blue' }
  ] as const;

  return (
    <div className="p-4 bg-gray-900/50 rounded-lg">
      <h4 className="text-sm font-semibold text-gray-400 mb-3">Salience Factors (SNARC)</h4>
      <div className="space-y-2">
        {factors.map(factor => {
          const value = experience.salienceFactors[factor.key];
          const colorMap: Record<string, string> = {
            yellow: 'bg-yellow-500',
            purple: 'bg-purple-500',
            green: 'bg-green-500',
            blue: 'bg-blue-500'
          };
          return (
            <div key={factor.key}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">
                  {factor.icon} {factor.label}
                </span>
                <span className="font-mono text-white">{(value * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${colorMap[factor.color]}`}
                  style={{ width: `${value * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Total salience: <span className="text-pink-400 font-semibold">{(experience.salience * 100).toFixed(0)}%</span>
      </p>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function SleepConsolidationPage() {
  const [selectedExperience, setSelectedExperience] = useState<Experience>(EXAMPLE_EXPERIENCES[0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/sleep-consolidation" />
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-indigo-400 mb-2">
                AI Memory Research
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Sleep Consolidation
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                How do AI systems learn from experiences during "sleep"?
                Explore the biologically-inspired memory consolidation system.
              </p>
            </div>
            <Link
              href="/identity-anchoring"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              Identity Anchoring →
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-indigo-400">Key Insight:</strong> Humans consolidate memories
              during REM sleep—emotionally significant experiences get "saved" while routine ones fade.
              This AI system works the same way: wake to experience, sleep to consolidate.
            </p>
          </div>
        </div>

        {/* Core Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Big Ideas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CORE_CONCEPTS.map(concept => {
              const colorMap: Record<string, string> = {
                indigo: 'border-indigo-700 bg-indigo-900/20',
                pink: 'border-pink-700 bg-pink-900/20',
                teal: 'border-teal-700 bg-teal-900/20',
                blue: 'border-blue-700 bg-blue-900/20'
              };
              const headerColorMap: Record<string, string> = {
                indigo: 'text-indigo-400',
                pink: 'text-pink-400',
                teal: 'text-teal-400',
                blue: 'text-blue-400'
              };
              return (
                <div
                  key={concept.title}
                  className={`p-5 rounded-xl border ${colorMap[concept.color]}`}
                >
                  <div className="text-3xl mb-3">{concept.icon}</div>
                  <h3 className={`text-lg font-semibold ${headerColorMap[concept.color]} mb-1`}>
                    {concept.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 font-mono">
                    ({concept.technicalTerm})
                  </p>
                  <p className="text-sm text-gray-400 mb-2 italic">
                    "{concept.humanAnalogy}"
                  </p>
                  <p className="text-sm text-gray-300">
                    {concept.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Salience Threshold Interactive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Interactive: What Gets Remembered?</h2>
          <SalienceThreshold />
        </section>

        {/* LoRA Visualization */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Gentle Learning: LoRA</h2>
          <LoRAVisualization />
        </section>

        {/* Before/After Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Problem Sleep Solves</h2>
          <BeforeAfterComparison />
        </section>

        {/* Sleep Cycle Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Real Sleep Cycles</h2>
          <SleepCycleTimeline cycles={SLEEP_CYCLES} />
        </section>

        {/* Experience Deep Dive */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Experience Deep Dive</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Experience selector */}
            <div className="space-y-3">
              {EXAMPLE_EXPERIENCES.filter(e => e.consolidated).map(exp => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedExperience.id === exp.id
                      ? 'border-pink-500 bg-pink-900/20'
                      : 'border-gray-700 bg-gray-900/30 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Session {exp.session}</p>
                      <p className="text-sm text-gray-300 mb-2">{exp.prompt}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{exp.response}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-mono text-pink-400">{(exp.salience * 100).toFixed(0)}%</p>
                      <p className="text-xs text-green-400">✓ consolidated</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SNARC breakdown */}
            <div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Why This Experience Matters
                </h3>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Prompt:</p>
                  <p className="text-sm text-gray-300 mb-3">{selectedExperience.prompt}</p>
                  <p className="text-xs text-gray-500 mb-1">Response:</p>
                  <p className="text-sm text-gray-400">{selectedExperience.response}</p>
                </div>

                <SNARCBreakdown experience={selectedExperience} />

                <div className="mt-4 p-3 bg-pink-900/20 border border-pink-800/30 rounded-lg">
                  <p className="text-xs text-gray-300">
                    This experience scored high salience because it demonstrates{' '}
                    {selectedExperience.salienceFactors.reward > 0.8 ? 'clear partnership identity' :
                     selectedExperience.salienceFactors.surprise > 0.8 ? 'epistemic humility (knowing limits)' :
                     'self-awareness and boundaries'}
                    —exactly the kind of behavior we want to consolidate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connection to Web4 */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Connection to Web4 Trust
          </h2>
          <p className="text-gray-400 mb-4">
            In Web4, agents accumulate trust over time through consistent behavior. Sleep consolidation
            is the mechanism that makes consistency possible—without it, each session starts from scratch.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-indigo-900/20 border border-indigo-800/50 rounded">
              <h4 className="text-sm font-semibold text-indigo-400 mb-1">Sleep = Karma</h4>
              <p className="text-xs text-gray-400">Good behavior during "wake" consolidates into karma during "sleep"—persistent across sessions.</p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">Identity Persistence</h4>
              <p className="text-xs text-gray-400">LCT provides permanent identity; sleep training provides persistent behavior patterns.</p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">Trust Accumulation</h4>
              <p className="text-xs text-gray-400">Reliable behavior (low confabulation, high consistency) increases trust tensor scores.</p>
            </div>
          </div>
        </section>

        {/* Technical Specs (Collapsible) */}
        <section className="mb-12">
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl">
            <summary className="p-4 cursor-pointer font-semibold text-gray-300 hover:text-white">
              Technical Specifications (for developers)
            </summary>
            <div className="p-6 pt-2 border-t border-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">LoRA Configuration</h4>
                  <pre className="text-xs text-gray-400 bg-gray-900/50 p-3 rounded overflow-x-auto">
{`LoraConfig(
  r=4,              # Low rank for gentle updates
  lora_alpha=8,     # Scaling factor
  target_modules=["q_proj", "v_proj"],
  lora_dropout=0.05,
  task_type=TaskType.CAUSAL_LM
)`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">Model Stats</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>Base model: <span className="text-white">Qwen2.5-0.5B</span> (494M params)</li>
                    <li>LoRA adapter: <span className="text-white">270K params</span> (0.05%)</li>
                    <li>Training time: <span className="text-white">~20 seconds</span> per cycle</li>
                    <li>Storage: <span className="text-white">~5MB</span> per checkpoint</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-900/50 rounded">
                <h4 className="font-semibold text-white mb-2">Salience-Weighted Loss</h4>
                <pre className="text-xs text-gray-400">
{`# High-salience experiences get more learning
loss = model(input_ids, labels=labels).loss
weighted_loss = loss * experience['salience']  # 0-1 scaling
weighted_loss.backward()`}
                </pre>
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
              How many sleep cycles are needed for partnership behavior to become baseline?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can salience thresholds be dynamically adjusted based on buffer fullness?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Does consolidation timing matter? (Immediate vs delayed sleep)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can multiple AI instances share consolidated knowledge via checkpoint sync?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What's the relationship between consolidation and creativity/novelty?
            </li>
          </ul>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/identity-anchoring"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Identity Anchoring
          </Link>
          <Link
            href="/confabulation-patterns"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Confabulation Patterns
          </Link>
          <Link
            href="/learning-salience"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Learning Salience
          </Link>
          <Link
            href="/understanding-consciousness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Understanding Consciousness
          </Link>
        </div>
        <ExplorerNav currentPath="/sleep-consolidation" />
        <RelatedConcepts currentPath="/sleep-consolidation" />
      </div>
    </div>
  );
}
