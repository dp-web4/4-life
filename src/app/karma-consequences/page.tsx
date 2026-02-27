'use client';

/**
 * Karma & Consequences Explorer
 *
 * This page makes Web4's permanent reputation system COMPREHENSIBLE to humans.
 * Explains: Why can't bad actors escape their history? How does karma carry forward?
 *
 * Philosophy:
 * - "You can't run from yourself" - consequences are permanent
 * - Fresh starts are a feature of weak systems, not a human right
 * - Karma creates self-regulating communities without moderators
 * - The economic cost of misbehavior compounds over time
 *
 * Key insight: In traditional systems, bad actors create new accounts.
 * In Web4, identity is hardware-bound, so consequences persist.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import TermTooltip, { ATP, T3 } from "@/components/TermTooltip";

// ============================================================================
// Types
// ============================================================================

interface AgentHistory {
  life: number;
  startTrust: number;
  endTrust: number;
  startAtp: number;
  endAtp: number;
  behavior: 'quality' | 'spam' | 'mixed';
  deathCause: 'atp_exhaustion' | 'trust_collapse' | 'natural' | 'alive';
  karmaScore: number;
  events: string[];
}

interface ComparisonSystem {
  name: string;
  freshStarts: boolean;
  identityBound: boolean;
  consequences: 'temporary' | 'session' | 'permanent';
  examples: string[];
  issues: string[];
  color: string;
}

interface SimulationTick {
  tick: number;
  actor: 'good' | 'bad';
  action: string;
  atpBefore: number;
  atpAfter: number;
  trustBefore: number;
  trustAfter: number;
  karmaNote: string;
  isWarning?: boolean;
  isSuccess?: boolean;
}

// ============================================================================
// Core Data
// ============================================================================

const AGENT_LIVES: AgentHistory[] = [
  {
    life: 1,
    startTrust: 0.5,
    endTrust: 0.35,
    startAtp: 100,
    endAtp: 0,
    behavior: 'spam',
    deathCause: 'atp_exhaustion',
    karmaScore: -15,
    events: [
      'Started with neutral trust (0.5) and full ATP (100)',
      'Spam campaign: sent 50 low-effort messages',
      'Trust dropped rapidly as community rejected spam',
      'ATP burned 3x faster than earned from any engagement',
      'Exhausted ATP—unable to act—"died" in society'
    ]
  },
  {
    life: 2,
    startTrust: 0.35,
    endTrust: 0.42,
    startAtp: 70,
    endAtp: 0,
    behavior: 'mixed',
    deathCause: 'atp_exhaustion',
    karmaScore: -8,
    events: [
      'Reborn with karma penalty: only 70 ATP (not 100)',
      'Started with damaged trust (0.35) from previous life',
      'Tried quality content but community skeptical',
      'Upvotes discounted by low trust multiplier',
      'Couldn\'t earn ATP fast enough, exhausted again'
    ]
  },
  {
    life: 3,
    startTrust: 0.40,
    endTrust: 0.58,
    startAtp: 60,
    endAtp: 45,
    behavior: 'quality',
    deathCause: 'alive',
    karmaScore: 5,
    events: [
      'Third chance: even lower starting ATP (60)',
      'Committed to quality-only strategy',
      'Slow trust recovery—took 10x effort vs new account',
      'Finally built positive karma through consistency',
      'Now sustainable, but permanently marked by early choices'
    ]
  }
];

const COMPARISON_SYSTEMS: ComparisonSystem[] = [
  {
    name: 'Traditional Platforms',
    freshStarts: true,
    identityBound: false,
    consequences: 'temporary',
    examples: ['Twitter/X', 'Reddit', 'Facebook'],
    issues: [
      'Create new account after ban',
      'Reputation resets with new username',
      'Sock puppets for manipulation',
      'Ban evasion trivially easy'
    ],
    color: 'red'
  },
  {
    name: 'Phone-Verified',
    freshStarts: true,
    identityBound: false,
    consequences: 'session',
    examples: ['SMS-verified accounts', 'Some banking apps'],
    issues: [
      'Burner phones are cheap',
      'VoIP numbers available',
      'One person can have many numbers',
      'Determined attackers not stopped'
    ],
    color: 'orange'
  },
  {
    name: 'Web4 (LCT-bound)',
    freshStarts: false,
    identityBound: true,
    consequences: 'permanent',
    examples: ['Hardware-bound presence', 'TPM/Secure Enclave rooted'],
    issues: [], // It's the solution, not the problem
    color: 'emerald'
  }
];

const SIDE_BY_SIDE_SIMULATION: SimulationTick[] = [
  // Good actor
  { tick: 1, actor: 'good', action: 'Join community', atpBefore: 100, atpAfter: 100, trustBefore: 0.5, trustAfter: 0.5, karmaNote: 'Fresh start with neutral standing' },
  { tick: 2, actor: 'good', action: 'Quality post', atpBefore: 100, atpAfter: 92, trustBefore: 0.5, trustAfter: 0.53, karmaNote: 'Investment in reputation', isSuccess: true },
  { tick: 3, actor: 'good', action: 'Help others', atpBefore: 92, atpAfter: 87, trustBefore: 0.53, trustAfter: 0.58, karmaNote: 'Community building', isSuccess: true },
  { tick: 4, actor: 'good', action: 'Receive rewards', atpBefore: 87, atpAfter: 110, trustBefore: 0.58, trustAfter: 0.60, karmaNote: 'Quality recognized', isSuccess: true },
  // Bad actor
  { tick: 1, actor: 'bad', action: 'Join community', atpBefore: 100, atpAfter: 100, trustBefore: 0.5, trustAfter: 0.5, karmaNote: 'Same starting position' },
  { tick: 2, actor: 'bad', action: 'Spam campaign', atpBefore: 100, atpAfter: 60, trustBefore: 0.5, trustAfter: 0.38, karmaNote: 'Burning resources', isWarning: true },
  { tick: 3, actor: 'bad', action: 'More spam', atpBefore: 60, atpAfter: 25, trustBefore: 0.38, trustAfter: 0.28, karmaNote: 'Diminishing returns', isWarning: true },
  { tick: 4, actor: 'bad', action: 'Exhausted', atpBefore: 25, atpAfter: 0, trustBefore: 0.28, trustAfter: 0.20, karmaNote: 'Can\'t act anymore', isWarning: true },
];

// ============================================================================
// Interactive Multi-Life Simulator
// ============================================================================

function MultiLifeSimulator() {
  const [currentLife, setCurrentLife] = useState(0);
  const [animating, setAnimating] = useState(false);

  const life = AGENT_LIVES[currentLife];

  const colorMap = {
    spam: 'border-red-700 bg-red-900/20',
    mixed: 'border-yellow-700 bg-yellow-900/20',
    quality: 'border-emerald-700 bg-emerald-900/20',
  };

  const deathColorMap = {
    atp_exhaustion: 'text-red-400',
    trust_collapse: 'text-orange-400',
    natural: 'text-gray-400',
    alive: 'text-emerald-400',
  };

  const deathLabelMap = {
    atp_exhaustion: 'ATP Exhaustion',
    trust_collapse: 'Trust Collapse',
    natural: 'Natural End',
    alive: 'Still Alive',
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        Interactive: One Agent, Three Lives
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Watch how karma carries forward. Bad choices in Life 1 haunt Lives 2 and 3.
      </p>

      {/* Life selector */}
      <div className="flex gap-3 mb-6">
        {AGENT_LIVES.map((l, idx) => (
          <button
            key={l.life}
            onClick={() => setCurrentLife(idx)}
            className={`flex-1 p-4 rounded-lg border transition-all ${
              currentLife === idx
                ? colorMap[l.behavior] + ' ring-2 ring-white/20'
                : 'border-gray-700 bg-gray-900/30 opacity-60 hover:opacity-80'
            }`}
          >
            <div className="text-2xl mb-1">
              {l.behavior === 'quality' ? '✨' : l.behavior === 'spam' ? '💀' : '⚖️'}
            </div>
            <div className="font-semibold text-white">Life {l.life}</div>
            <div className="text-xs text-gray-400">
              {l.behavior === 'quality' ? 'Quality' : l.behavior === 'spam' ? 'Spam' : 'Mixed'}
            </div>
          </button>
        ))}
      </div>

      {/* Life detail */}
      <div className={`p-6 rounded-lg border ${colorMap[life.behavior]}`}>
        {/* Stats row */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="p-3 bg-gray-900/50 rounded text-center">
            <p className="text-xs text-gray-500 mb-1">Start Trust</p>
            <p className="text-lg font-mono text-white">{life.startTrust.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-gray-900/50 rounded text-center">
            <p className="text-xs text-gray-500 mb-1">End Trust</p>
            <p className={`text-lg font-mono ${life.endTrust > life.startTrust ? 'text-emerald-400' : 'text-red-400'}`}>
              {life.endTrust.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-gray-900/50 rounded text-center">
            <p className="text-xs text-gray-500 mb-1">Start ATP</p>
            <p className="text-lg font-mono text-white">{life.startAtp}</p>
          </div>
          <div className="p-3 bg-gray-900/50 rounded text-center">
            <p className="text-xs text-gray-500 mb-1">End ATP</p>
            <p className={`text-lg font-mono ${life.endAtp > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {life.endAtp}
            </p>
          </div>
          <div className="p-3 bg-gray-900/50 rounded text-center">
            <p className="text-xs text-gray-500 mb-1">Karma</p>
            <p className={`text-lg font-mono ${life.karmaScore >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {life.karmaScore > 0 ? '+' : ''}{life.karmaScore}
            </p>
          </div>
        </div>

        {/* Death cause */}
        <div className="mb-4">
          <span className="text-sm text-gray-500">Outcome: </span>
          <span className={`font-semibold ${deathColorMap[life.deathCause]}`}>
            {deathLabelMap[life.deathCause]}
          </span>
        </div>

        {/* Events */}
        <div className="space-y-2">
          {life.events.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm">
              <span className="text-gray-600 font-mono w-4">{idx + 1}.</span>
              <span className="text-gray-300">{event}</span>
            </div>
          ))}
        </div>

        {/* Karma inheritance note */}
        {currentLife > 0 && (
          <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-700">
            <p className="text-xs text-gray-400">
              <strong className="text-yellow-400">Karma inheritance:</strong>{' '}
              {currentLife === 1 && 'Started with only 70 ATP (not 100) due to -15 karma from Life 1. Trust also carried forward at 0.35.'}
              {currentLife === 2 && 'Started with only 60 ATP due to continued negative karma. Previous lives\' reputations still affect community perception.'}
            </p>
          </div>
        )}
      </div>

      {/* The key insight */}
      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
        <h4 className="font-semibold text-purple-400 mb-2">The Key Insight</h4>
        <p className="text-sm text-gray-300">
          In traditional platforms, this agent would have just created a new account after Life 1.
          In Web4, <strong className="text-white">identity is hardware-bound</strong>, so the karma
          follows. It took <strong className="text-white">three lives</strong> to recover from one
          spam campaign—and recovery required genuine behavior change, not just waiting.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// System Comparison
// ============================================================================

function SystemComparison() {
  const [selectedSystem, setSelectedSystem] = useState<ComparisonSystem>(COMPARISON_SYSTEMS[2]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        Why Fresh Starts Are a Security Hole
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Compare how different systems handle consequences. Click to explore.
      </p>

      {/* System selector */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {COMPARISON_SYSTEMS.map((system) => {
          const colorMap: Record<string, string> = {
            red: 'border-red-700 bg-red-900/20',
            orange: 'border-orange-700 bg-orange-900/20',
            emerald: 'border-emerald-700 bg-emerald-900/20',
          };
          const iconMap: Record<string, string> = {
            red: '🔓',
            orange: '🔐',
            emerald: '🔒',
          };

          return (
            <button
              key={system.name}
              onClick={() => setSelectedSystem(system)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedSystem.name === system.name
                  ? colorMap[system.color] + ' ring-2 ring-white/20'
                  : 'border-gray-700 bg-gray-900/30 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="text-2xl mb-2">{iconMap[system.color]}</div>
              <h4 className="font-semibold text-white">{system.name}</h4>
              <p className="text-xs text-gray-400 mt-1">
                Consequences: {system.consequences}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected system detail */}
      <div className={`p-6 rounded-lg border ${
        selectedSystem.color === 'red' ? 'border-red-700 bg-red-900/10' :
        selectedSystem.color === 'orange' ? 'border-orange-700 bg-orange-900/10' :
        'border-emerald-700 bg-emerald-900/10'
      }`}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Characteristics</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                <span className="text-sm text-gray-400">Fresh starts allowed?</span>
                <span className={`font-semibold ${selectedSystem.freshStarts ? 'text-red-400' : 'text-emerald-400'}`}>
                  {selectedSystem.freshStarts ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                <span className="text-sm text-gray-400">Identity hardware-bound?</span>
                <span className={`font-semibold ${selectedSystem.identityBound ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedSystem.identityBound ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                <span className="text-sm text-gray-400">Consequence duration</span>
                <span className="font-semibold text-white capitalize">{selectedSystem.consequences}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Examples</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSystem.examples.map((ex) => (
                <span key={ex} className="px-2 py-1 bg-gray-900/50 rounded text-sm text-gray-300">
                  {ex}
                </span>
              ))}
            </div>

            {selectedSystem.issues.length > 0 ? (
              <>
                <h4 className="font-semibold text-red-400 mb-2">Attack Vectors</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  {selectedSystem.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500">✗</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="p-3 bg-emerald-900/30 rounded border border-emerald-800/50">
                <h4 className="font-semibold text-emerald-400 mb-1">Why This Works</h4>
                <p className="text-xs text-gray-300">
                  Hardware binding (TPM, Secure Enclave) creates identity that can't be duplicated.
                  Consequences compound because you can't escape your own hardware.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Side-by-Side Comparison
// ============================================================================

function SideBySideComparison() {
  const [tick, setTick] = useState(1);

  const goodTicks = SIDE_BY_SIDE_SIMULATION.filter(t => t.actor === 'good');
  const badTicks = SIDE_BY_SIDE_SIMULATION.filter(t => t.actor === 'bad');

  const currentGood = goodTicks.find(t => t.tick === tick);
  const currentBad = badTicks.find(t => t.tick === tick);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">
        Quality vs Spam: Same Starting Point, Different Outcomes
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Two agents start identically. Watch how their choices compound.
      </p>

      {/* Tick controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setTick(Math.max(1, tick - 1))}
          disabled={tick === 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-60 rounded-lg transition-colors"
        >
          ← Previous
        </button>
        <span className="text-lg font-mono text-white">Turn {tick} / 4</span>
        <button
          onClick={() => setTick(Math.min(4, tick + 1))}
          disabled={tick === 4}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-60 rounded-lg transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Good actor */}
        <div className={`p-4 rounded-lg border ${currentGood?.isSuccess ? 'border-emerald-700 bg-emerald-900/10' : 'border-gray-700 bg-gray-900/30'}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✨</span>
            <h4 className="font-semibold text-emerald-400">Quality Actor</h4>
          </div>

          {currentGood && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-400">Action:</p>
                <p className="text-white font-semibold">{currentGood.action}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 bg-gray-900/50 rounded text-center">
                  <p className="text-xs text-gray-500">ATP</p>
                  <p className="font-mono text-sky-400">
                    {currentGood.atpBefore} → {currentGood.atpAfter}
                  </p>
                </div>
                <div className="p-2 bg-gray-900/50 rounded text-center">
                  <p className="text-xs text-gray-500">Trust</p>
                  <p className="font-mono text-purple-400">
                    {currentGood.trustBefore.toFixed(2)} → {currentGood.trustAfter.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="p-2 bg-gray-900/50 rounded">
                <p className="text-xs text-gray-400">{currentGood.karmaNote}</p>
              </div>
            </>
          )}
        </div>

        {/* Bad actor */}
        <div className={`p-4 rounded-lg border ${currentBad?.isWarning ? 'border-red-700 bg-red-900/10' : 'border-gray-700 bg-gray-900/30'}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💀</span>
            <h4 className="font-semibold text-red-400">Spam Actor</h4>
          </div>

          {currentBad && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-400">Action:</p>
                <p className="text-white font-semibold">{currentBad.action}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2 bg-gray-900/50 rounded text-center">
                  <p className="text-xs text-gray-500">ATP</p>
                  <p className="font-mono text-sky-400">
                    {currentBad.atpBefore} → {currentBad.atpAfter}
                  </p>
                </div>
                <div className="p-2 bg-gray-900/50 rounded text-center">
                  <p className="text-xs text-gray-500">Trust</p>
                  <p className="font-mono text-purple-400">
                    {currentBad.trustBefore.toFixed(2)} → {currentBad.trustAfter.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="p-2 bg-gray-900/50 rounded">
                <p className="text-xs text-gray-400">{currentBad.karmaNote}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Final state at tick 4 */}
      {tick === 4 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-900/20 to-red-900/20 border border-gray-700 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Final Comparison</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="text-emerald-400">
              <strong>Quality Actor:</strong> 110 ATP (+10%), 0.60 trust (+20%). Sustainable, growing.
            </div>
            <div className="text-red-400">
              <strong>Spam Actor:</strong> 0 ATP (dead), 0.20 trust (-60%). Can't act, permanently damaged.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Karma Formula Explanation
// ============================================================================

function KarmaFormula() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        How Karma Is Calculated
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Positive karma */}
        <div className="p-4 bg-emerald-900/20 border border-emerald-800/50 rounded-lg">
          <h4 className="font-semibold text-emerald-400 mb-3">Positive Karma Sources</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">+</span>
              <span><strong className="text-white">Quality contributions</strong> that earn community recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">+</span>
              <span><strong className="text-white">Trust building</strong> through consistent, reliable behavior</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">+</span>
              <span><strong className="text-white">Collaboration</strong> with trusted community members</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">+</span>
              <span><strong className="text-white">Longevity</strong> — surviving and contributing over time</span>
            </li>
          </ul>
        </div>

        {/* Negative karma */}
        <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
          <h4 className="font-semibold text-red-400 mb-3">Negative Karma Sources</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-red-500">-</span>
              <span><strong className="text-white">Spam/abuse</strong> that drains <ATP /> without value creation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">-</span>
              <span><strong className="text-white">Trust violations</strong> — breaking commitments, inconsistency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">-</span>
              <span><strong className="text-white">Community rejection</strong> — downvotes, blocks, reports</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">-</span>
              <span><strong className="text-white">Premature death</strong> — ATP exhaustion indicates poor resource management</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The formula */}
      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-white mb-3">Karma Inheritance Formula</h4>
        <pre className="text-sm text-gray-400 bg-gray-900/80 p-4 rounded overflow-x-auto mb-4">
{`next_life_atp = base_atp + (karma * karma_multiplier)
next_life_trust = prev_trust * trust_decay_factor

Where:
  base_atp = 100 (standard starting resources)
  karma_multiplier = 2 (each karma point = 2 ATP)
  trust_decay_factor = 0.95 (trust carries over with 5% decay)

Example (negative karma):
  karma = -15 → next_life_atp = 100 + (-15 * 2) = 70 ATP

Example (positive karma):
  karma = +10 → next_life_atp = 100 + (10 * 2) = 120 ATP`}
        </pre>
        <p className="text-xs text-gray-500">
          This creates asymmetric consequences: building positive karma is harder than destroying it,
          mirroring real-world reputation dynamics.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Real-World Implications
// ============================================================================

function RealWorldImplications() {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-purple-400 mb-4">
        Why This Matters for the Real World
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-white mb-3">Current Internet Problems</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Harassment campaigns use burner accounts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Trolls create new identities after bans</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Scammers move between platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Reputation doesn't transfer across services</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Moderation is an endless game of whack-a-mole</span>
            </li>
          </ul>
        </div>

        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="font-semibold text-white mb-3">Web4 Solutions</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              <span>Hardware-bound presence prevents account proliferation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              <span>Karma follows you everywhere—no clean slates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              <span>Bad actors exhaust themselves economically</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              <span>Reputation is portable via <T3>trust tensors</T3></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">•</span>
              <span>Communities self-regulate without central moderation</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-white mb-2">The Human Parallel</h4>
        <p className="text-sm text-gray-300">
          Real life already works this way. You can't escape your credit history by changing your name.
          Your criminal record follows you across state lines. Professional reputations persist across jobs.
          Web4 brings this natural accountability to digital spaces—not as punishment, but as{' '}
          <strong className="text-purple-400">the foundation that makes trust possible</strong>.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function KarmaConsequencesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/karma-consequences" />
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-orange-400 mb-2">
                Web4 Core Concept
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Karma & Consequences
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Why can't bad actors just create new accounts? How do consequences persist
                across agent "lives"? Explore Web4's permanent reputation system.
              </p>
            </div>
            <Link
              href="/atp-economics"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ATP Economics →
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-orange-400">Key Insight:</strong> In traditional systems,
              consequences are temporary—create a new account and start fresh. In Web4,{' '}
              <strong className="text-white">identity is hardware-bound</strong> via <TermTooltip term="LCT">LCT</TermTooltip>, so karma follows
              you across &ldquo;lives.&rdquo; Bad actors can&apos;t escape their history; they can only rebuild it
              through genuine behavior change.
            </p>
          </div>
        </div>

        {/* Multi-Life Simulator */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Watch Karma Compound</h2>
          <MultiLifeSimulator />
        </section>

        {/* Side-by-Side Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Quality vs Spam</h2>
          <SideBySideComparison />
        </section>

        {/* System Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Why Fresh Starts Are Dangerous</h2>
          <SystemComparison />
        </section>

        {/* Karma Formula */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Math</h2>
          <KarmaFormula />
        </section>

        {/* Real-World Implications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Real-World Impact</h2>
          <RealWorldImplications />
        </section>

        {/* Connection to Web4 */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Connection to Other Web4 Concepts
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-sky-900/20 border border-sky-800/50 rounded">
              <h4 className="text-sm font-semibold text-sky-400 mb-1">ATP Economics</h4>
              <p className="text-xs text-gray-400">
                Karma affects starting ATP. Positive karma = more resources to invest.
                Negative karma = starting with a handicap.
              </p>
              <Link href="/atp-economics" className="text-xs text-sky-400 hover:underline">Learn more →</Link>
            </div>
            <div className="p-3 bg-purple-900/20 border border-purple-800/50 rounded">
              <h4 className="text-sm font-semibold text-purple-400 mb-1">Trust Tensor</h4>
              <p className="text-xs text-gray-400">
                Trust carries across lives with decay. High karma = faster trust recovery.
                Low karma = trust recovers slower.
              </p>
              <Link href="/trust-tensor" className="text-xs text-purple-400 hover:underline">Learn more →</Link>
            </div>
            <div className="p-3 bg-emerald-900/20 border border-emerald-800/50 rounded">
              <h4 className="text-sm font-semibold text-emerald-400 mb-1">LCT Presence</h4>
              <p className="text-xs text-gray-400">
                Hardware-bound presence makes karma matter. You can't escape yourself
                when your presence is rooted in physical devices.
              </p>
              <Link href="/lct-explainer" className="text-xs text-emerald-400 hover:underline">Learn more →</Link>
            </div>
          </div>
        </section>

        {/* Research Questions */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-gray-200">
            Open Research Questions
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How should karma decay over time? Should very old mistakes eventually fade?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can karma be transferred in "inheritance" scenarios (org splits, AI forks)?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How to handle karma across federated societies with different values?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Should there be a "karma bankruptcy" mechanism for genuine rehabilitation?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How does karma interact with heterogeneous review for AI agents?
            </li>
          </ul>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/atp-economics"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            ATP Economics
          </Link>
          <Link
            href="/trust-tensor"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Trust Tensor
          </Link>
          <Link
            href="/lct-explainer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            LCT Identity
          </Link>
          <Link
            href="/coherence-index"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Coherence Index
          </Link>
          <Link
            href="/threat-model"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Threat Model
          </Link>
        </div>
        <ExplorerNav currentPath="/karma-consequences" />
        <RelatedConcepts currentPath="/karma-consequences" />
      </div>
    </div>
  );
}
