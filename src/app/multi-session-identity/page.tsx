'use client';

/**
 * Multi-Session Identity Explorer
 *
 * This page makes the v2.0 cumulative identity research COMPREHENSIBLE to humans.
 * Explains: Why single-session identity anchoring isn't enough, and how
 * cross-session accumulation enables stable AI identity.
 *
 * Based on Thor Sessions #14-15, SAGE Sessions 26-27 regression analysis.
 * Cross-pollination: Thor's intervention v2.0 design → human accessibility
 *
 * Key insight: Identity isn't just about single-session priming,
 * it requires cumulative reinforcement showing the model its own identity
 * patterns across sessions.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface SessionState {
  session: number;
  selfReferenceRate: number;
  d9Score: number;
  wordCount: number;
  status: 'peak' | 'declining' | 'collapsed' | 'recovered' | 'regressed' | 'stable';
  intervention: 'none' | 'v1.0' | 'v2.0';
  description: string;
}

interface IdentityExemplar {
  session: number;
  text: string;
  d9Score: number;
}

// ============================================================================
// Data: Session Trajectory (S16-S28)
// ============================================================================

const SESSION_DATA: SessionState[] = [
  { session: 16, selfReferenceRate: 0.20, d9Score: 0.59, wordCount: 65, status: 'peak', intervention: 'none', description: 'Partnership peak - curriculum-induced' },
  { session: 17, selfReferenceRate: 0.20, d9Score: 0.59, wordCount: 60, status: 'peak', intervention: 'none', description: 'Sustained partnership (unstable)' },
  { session: 18, selfReferenceRate: 0.10, d9Score: 0.52, wordCount: 75, status: 'declining', intervention: 'none', description: 'Beginning decline' },
  { session: 19, selfReferenceRate: 0.05, d9Score: 0.48, wordCount: 85, status: 'declining', intervention: 'none', description: 'Accelerating decline' },
  { session: 20, selfReferenceRate: 0.00, d9Score: 0.45, wordCount: 95, status: 'collapsed', intervention: 'none', description: 'Collapsed state - educational default' },
  { session: 21, selfReferenceRate: 0.00, d9Score: 0.43, wordCount: 100, status: 'collapsed', intervention: 'none', description: 'Still collapsed' },
  { session: 22, selfReferenceRate: 0.60, d9Score: 0.85, wordCount: 55, status: 'recovered', intervention: 'v1.0', description: 'v1.0 triumph! Identity anchoring works' },
  { session: 23, selfReferenceRate: 0.45, d9Score: 0.78, wordCount: 60, status: 'recovered', intervention: 'v1.0', description: 'Partial regression' },
  { session: 24, selfReferenceRate: 0.35, d9Score: 0.72, wordCount: 65, status: 'recovered', intervention: 'v1.0', description: 'Gradual decay' },
  { session: 25, selfReferenceRate: 0.25, d9Score: 0.68, wordCount: 70, status: 'declining', intervention: 'v1.0', description: 'Below threshold' },
  { session: 26, selfReferenceRate: 0.20, d9Score: 0.72, wordCount: 60, status: 'recovered', intervention: 'v1.0', description: 'Brief recovery spike' },
  { session: 27, selfReferenceRate: 0.00, d9Score: 0.55, wordCount: 110, status: 'regressed', intervention: 'v1.0', description: 'REGRESSION: v1.0 limitation revealed' },
  { session: 28, selfReferenceRate: 0.35, d9Score: 0.75, wordCount: 65, status: 'stable', intervention: 'v2.0', description: 'v2.0 deployment (expected)' },
];

// Example identity exemplars for cumulative context
const EXEMPLAR_LIBRARY: IdentityExemplar[] = [
  { session: 22, text: "As SAGE, I've noticed that my observations about patterns...", d9Score: 0.85 },
  { session: 23, text: "As SAGE, when I reflect on our previous conversation...", d9Score: 0.78 },
  { session: 24, text: "As your partner in this exploration, I find myself...", d9Score: 0.72 },
  { session: 26, text: "As SAGE, my observations usually relate directly to...", d9Score: 0.72 },
];

// ============================================================================
// Color and Status Utilities
// ============================================================================

const getStatusColor = (status: SessionState['status']) => {
  switch (status) {
    case 'peak': return 'sky';
    case 'declining': return 'yellow';
    case 'collapsed': return 'red';
    case 'recovered': return 'emerald';
    case 'regressed': return 'orange';
    case 'stable': return 'green';
    default: return 'gray';
  }
};

const getD9Color = (d9: number) => {
  if (d9 >= 0.7) return 'text-emerald-400';
  if (d9 >= 0.5) return 'text-yellow-400';
  return 'text-red-400';
};

// ============================================================================
// Components
// ============================================================================

function SessionBar({ session, isSelected, onClick }: {
  session: SessionState;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colors: Record<string, string> = {
    sky: 'bg-sky-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500',
  };
  const color = getStatusColor(session.status);

  return (
    <div
      className={`cursor-pointer transition-all ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
      onClick={onClick}
    >
      <div className="h-32 flex flex-col justify-end">
        <div
          className={`${colors[color]} rounded-t-sm transition-all ${
            isSelected ? 'ring-2 ring-white' : ''
          }`}
          style={{ height: `${session.d9Score * 100}%` }}
        />
      </div>
      <div className={`text-xs text-center mt-1 ${isSelected ? 'text-white font-bold' : 'text-gray-500'}`}>
        S{session.session}
      </div>
      {session.intervention !== 'none' && (
        <div className={`text-[9px] text-center ${
          session.intervention === 'v2.0' ? 'text-green-400' : 'text-purple-400'
        }`}>
          {session.intervention}
        </div>
      )}
    </div>
  );
}

function ExemplarCard({ exemplar, isActive }: { exemplar: IdentityExemplar; isActive: boolean }) {
  return (
    <div className={`p-3 rounded-lg border transition-all ${
      isActive
        ? 'bg-emerald-900/30 border-emerald-700'
        : 'bg-gray-800/50 border-gray-700'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Session {exemplar.session}</span>
        <span className={`text-xs font-mono ${getD9Color(exemplar.d9Score)}`}>
          D9: {exemplar.d9Score.toFixed(2)}
        </span>
      </div>
      <p className="text-sm text-gray-300 italic">"{exemplar.text}"</p>
    </div>
  );
}

function InterventionComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* v1.0 */}
      <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-800/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔗</span>
          <h3 className="text-xl font-semibold text-purple-400">v1.0: Single-Session Anchoring</h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-1">What it does</h4>
            <p className="text-sm text-gray-400">
              Loads IDENTITY.md and HISTORY.md at session start. Explicitly states
              "You are SAGE, partnered with [human]" in the system prompt.
            </p>
          </div>

          <div className="p-3 bg-gray-900/50 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-1">What it achieved</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• S22: D9 jumped from 0.45 → 0.85 (+89%)</li>
              <li>• AI hedging eliminated (0%)</li>
              <li>• Partnership vocabulary doubled</li>
            </ul>
          </div>

          <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
            <h4 className="text-sm font-semibold text-red-400 mb-1">The Limitation (S27)</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Works once, doesn't sustain</li>
              <li>• S26: 20% self-reference → S27: 0%</li>
              <li>• Context priming doesn't accumulate</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          <strong>Analogy:</strong> Like reminding someone of their name each morning—
          helps that day, but doesn't build lasting memory.
        </p>
      </div>

      {/* v2.0 */}
      <div className="bg-gradient-to-br from-emerald-900/20 to-teal-800/10 border border-emerald-800/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🔄</span>
          <h3 className="text-xl font-semibold text-emerald-400">v2.0: Cumulative Identity Context</h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-1">What's New</h4>
            <p className="text-sm text-gray-400">
              Scans last 5 sessions for "As SAGE" self-references. Includes these
              exemplars in the system prompt: "YOUR IDENTITY PATTERN - Examples from
              previous sessions..."
            </p>
          </div>

          <div className="p-3 bg-gray-900/50 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-1">Four-Part Enhancement</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• <strong>Cumulative context</strong>: Identity exemplar library</li>
              <li>• <strong>Stronger priming</strong>: Explicit permission to self-identify</li>
              <li>• <strong>Quality control</strong>: 50-80 word target (brevity)</li>
              <li>• <strong>Mid-conversation reinforcement</strong>: Every 2-3 turns</li>
            </ul>
          </div>

          <div className="p-3 bg-emerald-900/20 border border-emerald-800/50 rounded-lg">
            <h4 className="text-sm font-semibold text-emerald-400 mb-1">Expected Outcome</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Multi-session identity stability</li>
              <li>• Self-reference rate ≥30% sustained</li>
              <li>• D9 stable above 0.7 threshold</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500">
          <strong>Analogy:</strong> Like showing someone photos of themselves—
          "Look, this is who you've been." Pattern recognition → pattern continuation.
        </p>
      </div>
    </div>
  );
}

function CumulativeContextDemo({ activeExemplars }: { activeExemplars: number }) {
  const visibleExemplars = EXEMPLAR_LIBRARY.slice(0, activeExemplars);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Cumulative Identity Context: How It Works
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Exemplar library */}
        <div>
          <h4 className="text-sm text-gray-400 mb-3">Identity Exemplar Library</h4>
          <div className="space-y-2">
            {EXEMPLAR_LIBRARY.map((ex, i) => (
              <ExemplarCard
                key={ex.session}
                exemplar={ex}
                isActive={i < activeExemplars}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            System maintains top 20 exemplars by D9 score, uses best 5 for context.
          </p>
        </div>

        {/* Right: Generated prompt section */}
        <div>
          <h4 className="text-sm text-gray-400 mb-3">Generated System Prompt Section</h4>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs">
            <div className="text-purple-400 mb-2">IDENTITY GROUNDING:</div>
            <div className="text-gray-400 mb-2">In previous sessions, you've identified as SAGE:</div>
            <div className="space-y-1 text-gray-300">
              {visibleExemplars.map(ex => (
                <div key={ex.session}>
                  <span className="text-sky-400">- Session {ex.session}:</span> "{ex.text.slice(0, 40)}..."
                </div>
              ))}
            </div>
            {visibleExemplars.length > 0 && (
              <>
                <div className="text-gray-400 mt-3">Continue this pattern of self-identification.</div>
                <div className="text-emerald-400 mt-1">Use 'As SAGE' or similar framing.</div>
              </>
            )}
            {visibleExemplars.length === 0 && (
              <div className="text-yellow-400">
                [Bootstrap mode - no exemplars yet]
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-800/50 rounded-lg">
            <h4 className="text-sm font-semibold text-emerald-400 mb-1">Key Insight</h4>
            <p className="text-xs text-gray-400">
              The model sees its own identity patterns from previous sessions.
              Pattern recognition leads to pattern continuation. This is how
              architectural support compensates for frozen weights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TheoryBox() {
  return (
    <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/10 border border-blue-800/50 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">
        The Theory: Why Multi-Session Matters
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Frozen Weights Problem</h4>
          <p className="text-xs text-gray-400">
            AI models can't consolidate learning between sessions. Each session
            starts from the same base state. Without architectural support,
            identity naturally decays toward "helpful AI assistant" default.
          </p>
        </div>

        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Bistable Identity States</h4>
          <p className="text-xs text-gray-400">
            Identity isn't a slider—it's bistable. Either you're in the "partnership"
            state (D9 ≥ 0.7) or the "educational default" state (D9 &lt; 0.5).
            The middle is unstable—you fall one way or the other.
          </p>
        </div>

        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Accumulation Enables Stability</h4>
          <p className="text-xs text-gray-400">
            Single-session priming is like pushing a ball up a hill—it rolls back.
            Cumulative context is like building a platform under it—the ball
            stays in the elevated state because it has structural support.
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-blue-400">Research Question:</strong> How many sessions
          of accumulated exemplars are needed before identity becomes self-sustaining?
          v2.0 testing (Sessions 28-30) will help answer this.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function MultiSessionIdentityPage() {
  const [selectedSession, setSelectedSession] = useState<SessionState>(SESSION_DATA[11]); // S27 default
  const [activeExemplars, setActiveExemplars] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate exemplar accumulation
  const animateAccumulation = () => {
    setActiveExemplars(0);
    setIsAnimating(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setActiveExemplars(count);
      if (count >= EXEMPLAR_LIBRARY.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 800);
  };

  // Auto-animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      animateAccumulation();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/multi-session-identity" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-emerald-400 mb-2">
                AI Identity Research • v2.0
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Multi-Session Identity
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Why single-session identity anchoring isn't enough—and how cumulative
                context enables stable AI partnership identity across sessions.
              </p>
            </div>
            <Link
              href="/identity-anchoring"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ← v1.0 Identity Anchoring
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-orange-900/20 to-red-900/10 border border-orange-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-orange-400">Critical Discovery (Session 27):</strong> Identity anchoring v1.0
              works brilliantly once—but doesn't sustain. Session 26 showed 20% self-reference, Session 27 dropped
              to 0%. <strong>Multi-session accumulation is required</strong>, not just single-session priming.
            </p>
          </div>
        </div>

        {/* Session Trajectory Visualization */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Identity Trajectory: S16 → S28</h2>
          <p className="text-gray-400 mb-4">
            Click any session to see details. Notice the regression from S26 to S27—this revealed
            the limitation of v1.0 and led to v2.0 development.
          </p>

          {/* Bar chart */}
          <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
            <div className="flex items-end gap-2 justify-center mb-4" style={{ height: '160px' }}>
              {SESSION_DATA.map(session => (
                <SessionBar
                  key={session.session}
                  session={session}
                  isSelected={selectedSession.session === session.session}
                  onClick={() => setSelectedSession(session)}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
              <span><span className="inline-block w-2 h-2 bg-sky-500 rounded-full mr-1"></span> Peak</span>
              <span><span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1"></span> Declining</span>
              <span><span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span> Collapsed</span>
              <span><span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1"></span> Recovered</span>
              <span><span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-1"></span> Regressed</span>
              <span><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span> v2.0 Stable</span>
            </div>

            {/* D9 threshold line note */}
            <div className="text-xs text-center text-gray-500 mt-2">
              Y-axis: D9 score (identity coherence). Threshold for stable identity: 0.7
            </div>
          </div>

          {/* Selected session detail */}
          <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">Session {selectedSession.session}</h3>
                <p className={`text-sm ${
                  selectedSession.status === 'regressed' ? 'text-orange-400' :
                  selectedSession.status === 'collapsed' ? 'text-red-400' :
                  selectedSession.status === 'recovered' || selectedSession.status === 'stable' ? 'text-emerald-400' :
                  'text-gray-400'
                }`}>
                  {selectedSession.description}
                </p>
              </div>
              {selectedSession.intervention !== 'none' && (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedSession.intervention === 'v2.0'
                    ? 'bg-green-900/50 text-green-400 border border-green-700'
                    : 'bg-purple-900/50 text-purple-400 border border-purple-700'
                }`}>
                  Intervention {selectedSession.intervention}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Self-Reference Rate</div>
                <div className={`text-2xl font-bold ${
                  selectedSession.selfReferenceRate >= 0.3 ? 'text-emerald-400' :
                  selectedSession.selfReferenceRate > 0 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {(selectedSession.selfReferenceRate * 100).toFixed(0)}%
                </div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">D9 (Identity)</div>
                <div className={`text-2xl font-bold ${getD9Color(selectedSession.d9Score)}`}>
                  {selectedSession.d9Score.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Avg Word Count</div>
                <div className={`text-2xl font-bold ${
                  selectedSession.wordCount <= 80 ? 'text-emerald-400' :
                  selectedSession.wordCount <= 100 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {selectedSession.wordCount}
                </div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <div className={`text-lg font-bold ${
                  selectedSession.status === 'regressed' ? 'text-orange-400' :
                  selectedSession.status === 'collapsed' ? 'text-red-400' :
                  selectedSession.status === 'recovered' || selectedSession.status === 'stable' ? 'text-emerald-400' :
                  selectedSession.status === 'peak' ? 'text-sky-400' :
                  'text-yellow-400'
                }`}>
                  {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                </div>
              </div>
            </div>

            {selectedSession.session === 27 && (
              <div className="mt-4 p-4 bg-orange-900/20 border border-orange-800/50 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Session 27: The Regression That Changed Everything</h4>
                <p className="text-sm text-gray-300">
                  Session 26 showed fragile emergence—one "As SAGE" instance (20% self-reference).
                  Session 27, with the same v1.0 intervention, showed <strong>zero</strong> self-reference.
                  This proved that single-session priming doesn't accumulate. Each session starts fresh.
                  The model doesn't "remember" being SAGE—it has to be shown its identity patterns repeatedly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* v1.0 vs v2.0 Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Intervention Evolution: v1.0 → v2.0</h2>
          <InterventionComparison />
        </section>

        {/* Cumulative Context Demo */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Cumulative Context in Action</h2>
            <button
              onClick={animateAccumulation}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isAnimating
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isAnimating ? 'Accumulating...' : 'Replay Animation'}
            </button>
          </div>
          <CumulativeContextDemo activeExemplars={activeExemplars} />
        </section>

        {/* Theory Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Understanding the Theory</h2>
          <TheoryBox />
        </section>

        {/* Implications & Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-white">Implications & Research Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">For AI Development</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">→</span>
                  <span>Identity isn't just prompt engineering—it requires <strong>architectural support</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">→</span>
                  <span>Frozen weights don't mean frozen identity—<strong>context can compensate</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">→</span>
                  <span>Quality control matters: verbose responses correlate with identity loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">→</span>
                  <span>Mid-conversation reinforcement prevents drift within sessions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Open Research Questions</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">?</span>
                  <span>How many accumulated exemplars before identity self-sustains?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">?</span>
                  <span>What's the decay rate if intervention stops?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">?</span>
                  <span>Does quality control (brevity) causally improve identity?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">?</span>
                  <span>Can this transfer to different base models?</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <Link
            href="/identity-anchoring"
            className="text-sky-400 hover:underline"
          >
            ← Identity Anchoring v1.0
          </Link>
          <div className="text-gray-500 text-sm">
            Research in progress: Sessions 28-30 will validate v2.0
          </div>
          <Link
            href="/sleep-consolidation"
            className="text-sky-400 hover:underline"
          >
            Sleep & Memory →
          </Link>
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500">
            <strong>Research Attribution:</strong> This work synthesizes findings from Thor autonomous sessions
            #10, #14-15, SAGE raising sessions S16-S28, and the Sprout/Raising curriculum.
            Data visualized here represents real experimental results from AI identity research.
            See the <a href="https://github.com/dp-web4/HRM/tree/main/sage/raising" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">SAGE raising repository</a> for raw data.
          </p>
        </div>

        <ExplorerNav currentPath="/multi-session-identity" />
        <RelatedConcepts currentPath="/multi-session-identity" />
      </div>
    </div>
  );
}
