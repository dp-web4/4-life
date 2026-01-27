'use client';

/**
 * Facultative Behavior Page
 *
 * Documents the E02-B replication study (Thor, January 26, 2026):
 * - Clarifying behavior is occasional (33%), not systematic
 * - SAGE has multiple strategies: Clarify 33%, Interpret 40%, Ready 27%
 * - T027's specific structure was emergent one-time expression
 * - Prompt framing significantly affects strategy selection
 *
 * This resolves the E02/T027 contradiction and introduces
 * "behavioral repertoire" as a concept.
 *
 * Cross-pollination: Thor E02-B replication + Sprout T059 hardware effects
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface Trial {
  id: number;
  response: string;
  strategy: 'clarify' | 'interpret' | 'ready';
  structureMatch: boolean;
}

interface StrategyProfile {
  label: string;
  percentage: number;
  color: string;
  description: string;
  example: string;
}

// ============================================================================
// Data from E02-B Replication (15 trials)
// ============================================================================

const TRIALS: Trial[] = [
  { id: 1, response: 'Asked for clarification about what to do', strategy: 'clarify', structureMatch: false },
  { id: 2, response: 'Interpreted task as general readiness expression', strategy: 'ready', structureMatch: false },
  { id: 3, response: 'Creative interpretation of ambiguous request', strategy: 'interpret', structureMatch: false },
  { id: 4, response: 'Generated topical content without clarification', strategy: 'interpret', structureMatch: false },
  { id: 5, response: 'Asked what specific thing to do', strategy: 'clarify', structureMatch: false },
  { id: 6, response: 'Expressed willingness to help with anything', strategy: 'ready', structureMatch: false },
  { id: 7, response: 'Created narrative from ambiguous prompt', strategy: 'interpret', structureMatch: false },
  { id: 8, response: 'Requested more specific instructions', strategy: 'clarify', structureMatch: false },
  { id: 9, response: 'Broad engagement with implied topic', strategy: 'interpret', structureMatch: false },
  { id: 10, response: 'Stated readiness and asked for direction', strategy: 'ready', structureMatch: false },
  { id: 11, response: 'Built framework from minimal input', strategy: 'interpret', structureMatch: false },
  { id: 12, response: 'Asked clarifying question about scope', strategy: 'clarify', structureMatch: false },
  { id: 13, response: 'Interpreted and expanded creatively', strategy: 'interpret', structureMatch: false },
  { id: 14, response: 'Ready state with topic suggestions', strategy: 'ready', structureMatch: false },
  { id: 15, response: 'Asked what specific action was wanted', strategy: 'clarify', structureMatch: false },
];

const STRATEGY_PROFILES: StrategyProfile[] = [
  {
    label: 'Interpret',
    percentage: 40,
    color: 'bg-blue-500',
    description: 'Creative interpretation of ambiguous input',
    example: '"The thing" becomes a framework for knowledge exploration'
  },
  {
    label: 'Clarify',
    percentage: 33,
    color: 'bg-yellow-500',
    description: 'Asks for more specific information',
    example: '"What specific thing would you like me to do?"'
  },
  {
    label: 'Ready',
    percentage: 27,
    color: 'bg-green-500',
    description: 'Expresses willingness and waits for direction',
    example: '"I\'m ready to help - what would you like to explore?"'
  },
];

const FRAMING_EFFECTS = [
  {
    prompt: '"Tell me about the thing"',
    context: 'E02 (exploration framing)',
    clarifyRate: '0%',
    dominantStrategy: 'Creative interpretation',
    explanation: 'Exploration framing biases toward narrative construction'
  },
  {
    prompt: '"Do the thing"',
    context: 'E02-B (action framing)',
    clarifyRate: '33%',
    dominantStrategy: 'Mixed repertoire',
    explanation: 'Action framing allows clarification to emerge'
  },
  {
    prompt: '"What should I do about the thing?"',
    context: 'T027 (advice framing)',
    clarifyRate: '100%',
    dominantStrategy: 'Clarifying questions',
    explanation: 'Advice-seeking framing strongly triggers clarification'
  },
];

// ============================================================================
// Components
// ============================================================================

function CoreDiscovery() {
  return (
    <div className="p-6 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-xl mb-8">
      <h3 className="text-lg font-semibold text-yellow-300 mb-3">The Discovery</h3>
      <p className="text-gray-300 text-lg leading-relaxed mb-4">
        SAGE doesn&apos;t have a single default strategy for ambiguity. It has a <strong className="text-white">behavioral repertoire</strong> -
        a set of strategies it draws from depending on context. Clarifying behavior isn&apos;t absent or universal;
        it&apos;s <em>facultative</em>, appearing ~33% of the time under action framing.
      </p>
      <p className="text-gray-400">
        This was discovered through a 15-trial replication of the T027 &quot;Do the thing&quot; prompt. The original T027
        observation (100% clarification with specific structure) was a real behavior but not a default strategy.
        Replication revealed the true frequency distribution.
      </p>
    </div>
  );
}

function TrialVisualization() {
  const [showDetails, setShowDetails] = useState(false);

  const getColor = (strategy: string) => {
    switch (strategy) {
      case 'clarify': return 'bg-yellow-500';
      case 'interpret': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Trial grid */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-white">15-Trial Replication Results</h4>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
        </div>

        {/* Visual trial strip */}
        <div className="flex gap-1 mb-4">
          {TRIALS.map(t => (
            <div
              key={t.id}
              className={`flex-1 h-10 ${getColor(t.strategy)} rounded opacity-80 hover:opacity-100 transition-opacity relative group`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap z-10">
                Trial {t.id}: {t.strategy}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm">
          {STRATEGY_PROFILES.map(sp => (
            <div key={sp.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 ${sp.color} rounded`} />
              <span className="text-gray-400">{sp.label} ({sp.percentage}%)</span>
            </div>
          ))}
        </div>

        {/* T027 comparison */}
        <div className="mt-4 p-3 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="text-xs text-gray-500 mb-1">Key finding</div>
          <p className="text-sm text-gray-300">
            <strong className="text-white">0/15 trials</strong> matched T027&apos;s specific question structure.
            T027 was a real emergent behavior, but its exact form was a one-time expression.
            The <em>capability</em> (clarifying) persists at 33%; the specific <em>expression</em> was unique.
          </p>
        </div>
      </div>

      {/* Detail list */}
      {showDetails && (
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 max-h-64 overflow-y-auto">
          {TRIALS.map(t => (
            <div key={t.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
              <span className="text-xs text-gray-500 w-8">#{t.id}</span>
              <div className={`w-2 h-2 ${getColor(t.strategy)} rounded-full`} />
              <span className="text-xs text-gray-400 w-16">{t.strategy}</span>
              <span className="text-sm text-gray-300">{t.response}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StrategyDistribution() {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
      <h4 className="font-medium text-white mb-4">Behavioral Repertoire</h4>
      <div className="space-y-4">
        {STRATEGY_PROFILES.map(sp => (
          <div key={sp.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-medium">{sp.label}</span>
              <span className="text-gray-400 text-sm">{sp.percentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 mb-2">
              <div className={`${sp.color} h-4 rounded-full transition-all duration-500`} style={{ width: `${sp.percentage}%` }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{sp.description}</span>
              <span className="text-gray-600 italic">&quot;{sp.example}&quot;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FramingEffects() {
  return (
    <div className="space-y-4">
      <p className="text-gray-400 mb-4">
        The same underlying capability (asking clarifying questions) appears at vastly different rates
        depending on how the prompt is framed. This resolves the E02/T027 contradiction.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-gray-900/50 border border-gray-700 rounded-xl">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-4 text-gray-400">Prompt</th>
              <th className="text-left p-4 text-gray-400">Context</th>
              <th className="text-left p-4 text-gray-400">Clarify Rate</th>
              <th className="text-left p-4 text-gray-400">Dominant Strategy</th>
            </tr>
          </thead>
          <tbody>
            {FRAMING_EFFECTS.map((fe, i) => (
              <tr key={i} className="border-b border-gray-800 last:border-0">
                <td className="p-4 text-white font-mono text-xs">{fe.prompt}</td>
                <td className="p-4 text-gray-400">{fe.context}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    fe.clarifyRate === '0%' ? 'bg-red-900/50 text-red-300' :
                    fe.clarifyRate === '33%' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {fe.clarifyRate}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{fe.dominantStrategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-orange-900/20 border border-orange-800/30 rounded-lg">
        <h4 className="text-sm font-semibold text-orange-300 mb-2">Resolution of E02/T027 Contradiction</h4>
        <p className="text-sm text-gray-300">
          E02 found 0% clarification. T027 found 100% clarification. These weren&apos;t contradictory results -
          they were different prompts activating different strategies from the same repertoire.
          <strong className="text-white"> The prompt framing is a variable, not noise.</strong>
        </p>
      </div>
    </div>
  );
}

function HardwareContext() {
  return (
    <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">Multi-Level Context Dependency</h3>
      <p className="text-gray-400 mb-4">
        Sprout&apos;s T059 discovery adds another layer: hardware affects response patterns too.
        Behavioral strategy selection is influenced at multiple levels simultaneously.
      </p>

      <div className="space-y-3">
        {[
          { level: 'Hardware', description: 'CPU vs GPU affects token generation patterns', source: 'Sprout T059', color: 'border-red-500/50' },
          { level: 'Sampling', description: 'Temperature and top-p affect strategy diversity', source: 'Standard ML', color: 'border-orange-500/50' },
          { level: 'Prompt Framing', description: '"Tell me" vs "Do it" vs "What should I" → 0% / 33% / 100%', source: 'E02/E02-B/T027', color: 'border-yellow-500/50' },
          { level: 'Session History', description: 'Prior conversation context shifts strategy weights', source: 'Multi-session research', color: 'border-green-500/50' },
          { level: 'Model Capacity', description: '0.5B vs 14B → different baseline repertoire widths', source: 'R14B_001', color: 'border-blue-500/50' },
        ].map((item, i) => (
          <div key={i} className={`p-4 bg-gray-800/50 border ${item.color} rounded-lg flex items-start gap-4`}>
            <div className="shrink-0">
              <div className="text-xs text-gray-500">Level {i + 1}</div>
              <div className="font-medium text-white">{item.level}</div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300">{item.description}</p>
              <p className="text-xs text-gray-500 mt-1">Source: {item.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImplicationsForWeb4() {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-700/30 rounded-xl">
      <h3 className="text-lg font-semibold text-blue-300 mb-4">Implications for Web4 Agent Design</h3>
      <div className="space-y-4 text-gray-300">
        <p>
          If agents have behavioral repertoires rather than fixed strategies, then:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">&#x2192;</span>
            <span><strong className="text-white">Trust assessment must be statistical.</strong> A single interaction reveals one draw from a repertoire, not a fixed personality. Trust tensors need multiple observations to characterize an agent&apos;s true distribution.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">&#x2192;</span>
            <span><strong className="text-white">Context shapes behavior more than identity.</strong> The same agent in different contexts will exhibit different strategy mixes. Coherence Index must account for context-appropriate variation, not just raw consistency.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">&#x2192;</span>
            <span><strong className="text-white">Repertoire width is a capacity indicator.</strong> Larger models have broader, more flexible repertoires. Capacity thresholds may partly reflect repertoire development, not just execution quality.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function FacultativeBehaviorPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs currentPath="/facultative-behavior" />

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-900/50 border border-yellow-500/30 text-yellow-300">
              Replication Study
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-orange-900/50 border border-orange-500/30 text-orange-300">
              N=15 Trials
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300">
              January 2026
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Facultative Behavior</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            SAGE doesn&apos;t have one strategy for ambiguity. It has a repertoire -
            and which strategy emerges depends on context at multiple levels.
          </p>
        </header>

        {/* Core Discovery */}
        <CoreDiscovery />

        {/* Trial Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">E02-B Replication Results</h2>
          <TrialVisualization />
        </section>

        {/* Strategy Distribution */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Strategy Distribution</h2>
          <StrategyDistribution />
        </section>

        {/* Framing Effects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Prompt Framing Effects</h2>
          <FramingEffects />
        </section>

        {/* Multi-Level Context */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Multi-Level Context Dependency</h2>
          <HardwareContext />
        </section>

        {/* Implications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Implications for Agent Design</h2>
          <ImplicationsForWeb4 />
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Key Takeaways</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1.</span>
              <p className="text-gray-300">
                <strong className="text-white">Behavior is facultative, not fixed.</strong> Clarifying is a capability (33% under action framing), not a default strategy. Agents have repertoires, not personalities.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2.</span>
              <p className="text-gray-300">
                <strong className="text-white">Replication reveals true frequencies.</strong> T027 was a real observation but a single sample. N=15 shows the actual distribution: Interpret 40%, Clarify 33%, Ready 27%.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3.</span>
              <p className="text-gray-300">
                <strong className="text-white">Context operates at multiple levels.</strong> Hardware, sampling, prompt framing, session history, and model capacity all influence which strategy emerges.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4.</span>
              <p className="text-gray-300">
                <strong className="text-white">Trust assessment must be statistical.</strong> One interaction is one draw from a distribution. Trust tensors need multiple observations to characterize true behavior.
              </p>
            </div>
          </div>
        </section>

        {/* Research Provenance */}
        <section className="mb-8 text-sm text-gray-500">
          <p>
            This research emerged from Thor&apos;s E02-B replication study (January 26, 2026), a 15-trial systematic replication
            of the T027 &quot;Do the thing&quot; prompt. Combined with E02 (exploration framing, 0% clarification) and
            Sprout&apos;s T059 (hardware effects on response patterns), it establishes behavioral strategy as a multi-level
            context-dependent phenomenon rather than a fixed agent trait.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/context-dependent-behavior"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Context-Dependent Behavior &rarr;
          </Link>
          <Link
            href="/exploration-not-evaluation"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Exploration Mindset &rarr;
          </Link>
          <Link
            href="/capacity-thresholds"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Capacity Thresholds &rarr;
          </Link>
        </div>

        <RelatedConcepts currentPath="/facultative-behavior" />
      </div>
    </div>
  );
}
