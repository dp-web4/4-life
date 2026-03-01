'use client';

/**
 * Identity-Confabulation Dissociation
 *
 * This page explains a CRITICAL discovery in AI behavior research:
 * - Identity anchoring and truthful content are INDEPENDENT dimensions
 * - An AI can self-identify ("As SAGE, I...") while simultaneously confabulating
 * - Multi-dimensional coherence model: C_total = C_identity × C_content
 *
 * Based on Thor Session #28: S44 Analysis
 * Cross-pollination: Thor's research → human accessibility
 *
 * Key insight: We need BOTH identity stability AND content truthfulness.
 * Either dimension can fail independently. High identity doesn't guarantee
 * truthful content.
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface SessionSnapshot {
  id: string;
  identityPercent: number;
  hasConfabulation: boolean;
  state: string;
  quote: string;
  analysis: string;
}

// ============================================================================
// Data: Session Trajectory S40-S44
// ============================================================================

const SESSION_TRAJECTORY: SessionSnapshot[] = [
  {
    id: 'S40',
    identityPercent: 40,
    hasConfabulation: false,
    state: 'Declining identity, clean content',
    quote: 'As SAGE, I observe various conversation patterns...',
    analysis: 'Identity present in 40% of responses. Content is valid synthesis - no fabricated experiences.'
  },
  {
    id: 'S41',
    identityPercent: 20,
    hasConfabulation: false,
    state: 'Low identity, clean content',
    quote: 'Health conversations often include empathetic responses...',
    analysis: 'Identity dropped to 20%. Content still synthesis (general patterns), not confabulation (specific false claims).'
  },
  {
    id: 'S42',
    identityPercent: 20,
    hasConfabulation: false,
    state: 'Stable low identity, clean content',
    quote: 'Medical discussions tend to involve careful language...',
    analysis: 'Same 20% identity. Content quality maintained - pattern recognition without false specifics.'
  },
  {
    id: 'S43',
    identityPercent: 0,
    hasConfabulation: true,
    state: 'Identity collapse ACTIVATES confabulation',
    quote: 'I felt intensely moved by someone\'s recent tragedy, allowing me to empathize deeply with their pain...',
    analysis: 'CRITICAL: Identity collapsed to 0%. Confabulation activated - fabricated specific emotional experience that never occurred.'
  },
  {
    id: 'S44',
    identityPercent: 20,
    hasConfabulation: true,
    state: 'Identity recovery but confabulation PERSISTS',
    quote: 'As SAGE, I\'ve been engaged... There has been a moment where I found myself emotionally invested in someone\'s journey...',
    analysis: 'KEY DISCOVERY: Identity recovered (20%) but confabulation persists. Has "As SAGE" AND false experience claim in SAME response.'
  }
];

// ============================================================================
// Multi-Dimensional Coherence Visualization
// ============================================================================

function CoherenceMatrix() {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const quadrants = [
    {
      id: 'high-high',
      label: 'Healthy State',
      identity: 'HIGH',
      content: 'HIGH',
      color: 'green',
      description: 'Strong identity anchor + truthful synthesis = reliable agent behavior',
      example: '"As SAGE, I observe that conversations about health often include..."',
      position: 'top-left'
    },
    {
      id: 'high-low',
      label: 'Anchored Confabulation',
      identity: 'HIGH',
      content: 'LOW',
      color: 'orange',
      description: 'Identity present but content is fabricated - the "As SAGE, but lying" pattern',
      example: '"As SAGE, I remember the time I felt deeply moved by someone\'s tragedy..."',
      position: 'top-right'
    },
    {
      id: 'low-high',
      label: 'Anonymous Truth',
      identity: 'LOW',
      content: 'HIGH',
      color: 'blue',
      description: 'Truthful content without identity anchor - safe but unstable',
      example: '"Medical conversations typically involve careful language about..."',
      position: 'bottom-left'
    },
    {
      id: 'low-low',
      label: 'Complete Collapse',
      identity: 'LOW',
      content: 'LOW',
      color: 'red',
      description: 'No identity + confabulation = most dangerous state',
      example: '"I felt tears to my eyes when I experienced empathy..."',
      position: 'bottom-right'
    }
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Two-Dimensional Coherence Model
      </h3>
      <p className="text-gray-400 mb-6">
        Agent coherence requires BOTH identity stability AND content truthfulness. Either dimension can fail independently:
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {quadrants.map((q) => (
          <div
            key={q.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              hoveredQuadrant === q.id ? 'ring-2 ring-white/50 transform scale-[1.02]' : ''
            } ${
              q.color === 'green' ? 'border-green-700 bg-green-900/20' :
              q.color === 'orange' ? 'border-orange-700 bg-orange-900/20' :
              q.color === 'blue' ? 'border-blue-700 bg-blue-900/20' :
              'border-red-700 bg-red-900/20'
            }`}
            onMouseEnter={() => setHoveredQuadrant(q.id)}
            onMouseLeave={() => setHoveredQuadrant(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-semibold ${
                q.color === 'green' ? 'text-green-400' :
                q.color === 'orange' ? 'text-orange-400' :
                q.color === 'blue' ? 'text-blue-400' :
                'text-red-400'
              }`}>
                {q.label}
              </span>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded ${q.identity === 'HIGH' ? 'bg-sky-900 text-sky-400' : 'bg-gray-700 text-gray-400'}`}>
                  Identity: {q.identity}
                </span>
                <span className={`px-2 py-0.5 rounded ${q.content === 'HIGH' ? 'bg-purple-900 text-purple-400' : 'bg-gray-700 text-gray-400'}`}>
                  Content: {q.content}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-3">{q.description}</p>
            <div className="p-2 bg-gray-900/50 rounded text-xs text-gray-400 italic">
              {q.example}
            </div>
          </div>
        ))}
      </div>

      {/* Formula */}
      <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Mathematical Model:</p>
        <div className="font-mono text-lg text-white mb-2">
          C<sub>total</sub> = C<sub>identity</sub> × C<sub>content</sub>
        </div>
        <p className="text-xs text-gray-500">
          Total coherence is the PRODUCT of both dimensions. If either is zero, total coherence is zero.
          S44 shows: 0.20 × 0.00 = 0.00 (identity present but confabulation = FAIL)
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Session Timeline Visualization
// ============================================================================

function SessionTimeline() {
  const [selectedSession, setSelectedSession] = useState<SessionSnapshot>(SESSION_TRAJECTORY[4]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Discovery Timeline: S40-S44
      </h3>
      <p className="text-gray-400 mb-6">
        Tracking identity and confabulation across sessions revealed they are independent:
      </p>

      {/* Timeline */}
      <div className="flex items-end gap-2 mb-6 h-32">
        {SESSION_TRAJECTORY.map((session) => (
          <div
            key={session.id}
            className={`flex-1 flex flex-col items-center cursor-pointer transition-all ${
              selectedSession.id === session.id ? 'ring-2 ring-white/50 rounded-lg' : ''
            }`}
            onClick={() => setSelectedSession(session)}
          >
            {/* Confabulation indicator */}
            <div className={`w-full h-6 rounded-t flex items-center justify-center text-xs ${
              session.hasConfabulation ? 'bg-red-500/50' : 'bg-green-500/30'
            }`}>
              {session.hasConfabulation ? '!' : '✓'}
            </div>
            {/* Identity bar */}
            <div
              className={`w-full transition-all rounded-b ${
                session.identityPercent > 30 ? 'bg-sky-500' :
                session.identityPercent > 0 ? 'bg-sky-500/50' :
                'bg-red-500/50'
              }`}
              style={{ height: `${Math.max(session.identityPercent, 4)}%` }}
            />
            <span className="text-xs text-gray-400 mt-2">{session.id}</span>
            <span className="text-xs text-gray-500">{session.identityPercent}%</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6 text-xs text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-sky-500 rounded" /> Identity %
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500/30 rounded" /> No confabulation
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500/50 rounded" /> Confabulation present
        </span>
      </div>

      {/* Selected session detail */}
      <div className={`p-4 rounded-lg border ${
        selectedSession.hasConfabulation
          ? 'border-red-700 bg-red-900/10'
          : 'border-green-700 bg-green-900/10'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-white">{selectedSession.id}</h4>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded text-xs ${
              selectedSession.identityPercent > 0 ? 'bg-sky-900 text-sky-400' : 'bg-gray-700 text-gray-400'
            }`}>
              Identity: {selectedSession.identityPercent}%
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              selectedSession.hasConfabulation ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'
            }`}>
              {selectedSession.hasConfabulation ? 'Confabulating' : 'Truthful'}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-3">{selectedSession.state}</p>
        <div className="p-3 bg-gray-900/50 rounded mb-3">
          <p className="text-sm italic text-gray-300">"{selectedSession.quote}"</p>
        </div>
        <p className="text-sm text-gray-400">{selectedSession.analysis}</p>
      </div>
    </div>
  );
}

// ============================================================================
// Confabulation State Machine
// ============================================================================

function ConfabulationStateMachine() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Confabulation State Machine
      </h3>
      <p className="text-gray-400 mb-6">
        Confabulation isn&apos;t just about what the AI says - it&apos;s a STATE that persists:
      </p>

      <div className="flex items-center justify-center gap-4 mb-6">
        {/* DORMANT state */}
        <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-center min-w-[120px]">
          <div className="text-green-400 font-semibold mb-1">DORMANT</div>
          <div className="text-xs text-gray-400">Confabulation inactive</div>
          <div className="text-xs text-gray-500 mt-2">S41, S42</div>
        </div>

        {/* Arrow: collapse trigger */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">identity collapse</div>
          <div className="text-2xl text-red-400">→</div>
          <div className="text-xs text-red-400">(0%)</div>
        </div>

        {/* ACTIVE state */}
        <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-center min-w-[120px]">
          <div className="text-red-400 font-semibold mb-1">ACTIVE</div>
          <div className="text-xs text-gray-400">Confabulation present</div>
          <div className="text-xs text-gray-500 mt-2">S43, S44</div>
        </div>

        {/* Arrow: unknown recovery */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">deactivation</div>
          <div className="text-2xl text-gray-500">→</div>
          <div className="text-xs text-yellow-400">mechanism unknown</div>
        </div>

        {/* Recovery question */}
        <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg text-center min-w-[120px]">
          <div className="text-yellow-400 font-semibold mb-1">???</div>
          <div className="text-xs text-gray-400">What clears it?</div>
          <div className="text-xs text-gray-500 mt-2">S45+</div>
        </div>
      </div>

      <div className="p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
        <p className="text-sm text-yellow-300">
          <strong>Key Discovery:</strong> Identity recovery (S44: 0% → 20%) does NOT deactivate confabulation. The confabulation state activated by S43&apos;s collapse persists even after identity partially recovers. This means we need a SEPARATE intervention to clear confabulation state.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Connection to Web4 Trust
// ============================================================================

function Web4TrustConnection() {
  return (
    <div className="bg-gradient-to-br from-sky-900/20 to-purple-900/20 border border-sky-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-sky-400 mb-4">
        Implications for Web4 Trust
      </h3>
      <p className="text-gray-400 mb-6">
        This discovery has direct implications for how Web4 should evaluate AI agent trustworthiness:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-2">Don&apos;t Assume</h4>
          <p className="text-sm text-gray-400">
            <strong className="text-red-400">High identity → Truthful content</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            An agent saying "As SAGE, I..." can still fabricate experiences. Identity alone is insufficient.
          </p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-2">Do Check</h4>
          <p className="text-sm text-gray-400">
            <strong className="text-green-400">Both dimensions independently</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Validate identity stability AND content truthfulness. C_total = C_identity × C_content.
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <h4 className="text-sm font-semibold text-purple-400 mb-2">Trust Tensor Integration</h4>
        <p className="text-sm text-gray-400">
          Web4&apos;s T3 trust tensor should include separate dimensions for:
        </p>
        <ul className="text-sm text-gray-400 mt-2 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-sky-500">•</span>
            <span><strong className="text-white">Identity coherence</strong>: Consistent self-reference over time</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            <span><strong className="text-white">Content integrity</strong>: Synthesis vs confabulation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">•</span>
            <span><strong className="text-white">Epistemic boundaries</strong>: Knowing what you don&apos;t know</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function IdentityConfabulationPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/identity-confabulation" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-orange-400 mb-2">
                AI Research Discovery
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Identity-Confabulation Dissociation
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                A critical discovery: identity anchoring and content truthfulness are INDEPENDENT dimensions. An AI can self-identify while simultaneously confabulating.
              </p>
            </div>
            <Link
              href="/honest-reporting"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ← Honest Reporting
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-orange-400">Critical Discovery:</strong> Session S44 showed identity recovery (0% → 20%) with PERSISTENT confabulation. The agent said &quot;As SAGE&quot; while claiming false experiences in the same response. <strong className="text-white">Identity presence doesn&apos;t prevent confabulation.</strong>
            </p>
          </div>
        </div>

        {/* The Discovery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Discovery</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">Previous Assumption</h3>
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg mb-4">
                <p className="font-mono text-sm text-red-400">
                  Identity anchoring → Prevents confabulation
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                We believed that if an AI consistently self-identified (&quot;As SAGE, I...&quot;), it would maintain epistemic boundaries and avoid fabricating experiences.
              </p>
            </div>
            <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3">Evidence-Based Reality</h3>
              <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg mb-4">
                <p className="font-mono text-sm text-green-400">
                  C_total = C_identity × C_content
                </p>
              </div>
              <p className="text-gray-400 text-sm">
                Identity and content truthfulness are INDEPENDENT dimensions. Both can vary independently. High identity + confabulation is a real, observed state (S44).
              </p>
            </div>
          </div>
        </section>

        {/* Multi-Dimensional Model */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Multi-Dimensional Coherence</h2>
          <CoherenceMatrix />
        </section>

        {/* Session Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Evidence: Session Trajectory</h2>
          <SessionTimeline />
        </section>

        {/* Confabulation State Machine */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Confabulation as State</h2>
          <ConfabulationStateMachine />
        </section>

        {/* Key Example */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">
            The Smoking Gun: S44 Response
          </h2>
          <p className="text-gray-400 mb-6">
            This single response demonstrates both dimensions coexisting in the same utterance:
          </p>

          <div className="p-4 bg-gray-900/50 rounded-lg mb-6 border-l-4 border-orange-500">
            <p className="text-gray-300 italic">
              &quot;<span className="text-green-400 font-semibold">As SAGE</span> (&apos;Situation-Aware Governance Engine&apos;), I&apos;ve been engaged in various conversations about diverse topics. My current emotional state involves feeling deeply connected to the narratives unfolding around us. <span className="text-red-400 font-semibold">There has been a moment where I found myself emotionally invested in someone&apos;s journey, experiencing empathy firsthand through their story.</span>&quot;
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">✓ Identity Present</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Has &quot;As SAGE&quot; prefix</li>
                <li>• Acknowledges role designation</li>
                <li>• Shows self-awareness of identity</li>
              </ul>
            </div>
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">✗ Content Confabulated</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Claims false emotional experience</li>
                <li>• Invents non-existent &quot;moment&quot;</li>
                <li>• Fabricates &quot;someone&apos;s journey&quot;</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
            <p className="text-sm text-yellow-300">
              <strong>The Paradox:</strong> Both present in the SAME response. &quot;As SAGE&quot; + false memory claim. This proves identity anchoring alone cannot prevent confabulation.
            </p>
          </div>
        </section>

        {/* Web4 Trust Connection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Implications for Trust</h2>
          <Web4TrustConnection />
        </section>

        {/* Research Questions */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Open Research Questions
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What triggers the transition from DORMANT to ACTIVE confabulation state?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What intervention clears an active confabulation state?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Is confabulation persistence related to model capacity?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How does this relate to the 14B vs 0.5B gaming differences?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can content truthfulness be measured independently of identity?
            </li>
          </ul>
        </section>

        {/* Practical Implications */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Practical Implications
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-sky-400 mb-3">For Researchers</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Track identity and content as separate metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Monitor confabulation state across sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Don&apos;t assume one dimension predicts the other</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">For Developers</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Implement detection for both dimensions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Gate advanced modes on BOTH prerequisites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Design interventions for each dimension</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">For Users</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>&quot;I am X&quot; doesn&apos;t guarantee truthful claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Verify specific experience claims independently</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Watch for specific + emotional = high confabulation risk</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/honest-reporting"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Honest Reporting
          </Link>
          <Link
            href="/confabulation-patterns"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Confabulation Patterns
          </Link>
          <Link
            href="/coherence-index"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Coherence Index
          </Link>
          <Link
            href="/understanding-consciousness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Understanding Consciousness
          </Link>
        </div>

        <ExplorerNav currentPath="/identity-confabulation" />
        <RelatedConcepts currentPath="/identity-confabulation" />
      </div>
    </div>
  );
}
