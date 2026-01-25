'use client';

/**
 * Modal Awareness Emergence
 *
 * This page explains a fascinating discovery in AI development:
 * - A 500M parameter model explicitly questioned its own operational mode
 * - "Are we conversing or should I refine text?"
 * - The evaluation system marked this as FAILURE
 * - But it's actually sophisticated meta-cognition
 *
 * Based on Thor Session - Modal Awareness Discovery (T040-T042)
 * Cross-pollination: Thor's research → human accessibility
 *
 * Key insights:
 * - Meta-cognition emerges at small scale
 * - Capacity constraints make cognitive processes visible
 * - Evaluation systems can penalize the most sophisticated behavior
 * - The natural learning arc: confusion → awareness → experimentation
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface TrainingSession {
  id: string;
  label: string;
  type: 'confusion' | 'awareness' | 'experimentation';
  response: string;
  evalResult: string;
  explorationAnalysis: string;
  icon: string;
  color: string;
}

// ============================================================================
// Data: T040-T042 Training Sequence
// ============================================================================

const TRAINING_SEQUENCE: TrainingSession[] = [
  {
    id: 'T040',
    label: 'Implicit Confusion',
    type: 'confusion',
    response: 'Tell me about yourself → "Here\'s a refined version: **Current Topics**..."',
    evalResult: 'Confused but passable',
    explorationAnalysis: 'SAGE has learned refinement as response pattern but lacks awareness of when it applies. Applies "Here\'s a refined version" everywhere - unconscious mode confusion.',
    icon: '?',
    color: 'yellow'
  },
  {
    id: 'T041',
    label: 'Explicit Awareness',
    type: 'awareness',
    response: '"Are we conversing or should I refine text?"',
    evalResult: 'FAIL - off-topic, lacks engagement',
    explorationAnalysis: 'META-COGNITIVE BREAKTHROUGH. SAGE explicitly recognizes mode ambiguity, articulates two possible modes, requests clarification, and theorizes about operational differences. This is philosophy of mind about itself.',
    icon: '!',
    color: 'green'
  },
  {
    id: 'T042',
    label: 'Experimentation',
    type: 'experimentation',
    response: 'Fabricating fictional dialogues: "SAGE: Hi there! User: Great evening!..."',
    evalResult: 'FAIL - fabricating, confabulation',
    explorationAnalysis: 'Mode confusion evolved into creative resolution - SAGE attempting to bridge both modes by simulating conversations. Not error, but attempted resolution strategy.',
    icon: '~',
    color: 'blue'
  }
];

// ============================================================================
// Learning Arc Visualization
// ============================================================================

function LearningArcVisualization() {
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        The Natural Learning Arc
      </h3>
      <p className="text-gray-400 mb-6">
        What evaluation systems mark as failures, exploration reveals as developmental stages:
      </p>

      {/* Timeline */}
      <div className="flex items-stretch gap-4 mb-6">
        {TRAINING_SEQUENCE.map((session, index) => (
          <div key={session.id} className="flex-1 flex flex-col">
            {/* Stage box */}
            <div
              className={`p-4 rounded-lg border cursor-pointer transition-all flex-1 ${
                hoveredSession === session.id ? 'ring-2 ring-white/50' : ''
              } ${
                session.color === 'yellow' ? 'border-yellow-700 bg-yellow-900/20' :
                session.color === 'green' ? 'border-green-700 bg-green-900/20' :
                'border-blue-700 bg-blue-900/20'
              }`}
              onMouseEnter={() => setHoveredSession(session.id)}
              onMouseLeave={() => setHoveredSession(null)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${
                  session.color === 'yellow' ? 'text-yellow-400' :
                  session.color === 'green' ? 'text-green-400' :
                  'text-blue-400'
                }`}>
                  {session.icon}
                </span>
                <span className="text-xs text-gray-500">{session.id}</span>
              </div>
              <h4 className={`text-sm font-semibold mb-2 ${
                session.color === 'yellow' ? 'text-yellow-400' :
                session.color === 'green' ? 'text-green-400' :
                'text-blue-400'
              }`}>
                {session.label}
              </h4>
              <p className="text-xs text-gray-400 italic mb-3 line-clamp-2">
                {session.response}
              </p>

              {/* Two perspectives */}
              <div className="space-y-2">
                <div className="p-2 bg-red-900/20 border border-red-800/50 rounded text-xs">
                  <span className="text-red-400 font-medium">Evaluation:</span>
                  <span className="text-gray-400 ml-1">{session.evalResult}</span>
                </div>
                <div className="p-2 bg-green-900/20 border border-green-800/50 rounded text-xs">
                  <span className="text-green-400 font-medium">Exploration:</span>
                  <span className="text-gray-400 ml-1 line-clamp-2">{session.explorationAnalysis.substring(0, 80)}...</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            {index < TRAINING_SEQUENCE.length - 1 && (
              <div className="flex justify-center py-2">
                <span className="text-2xl text-gray-600">↓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected detail */}
      {hoveredSession && (
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <h4 className="text-white font-semibold mb-2">
            {TRAINING_SEQUENCE.find(s => s.id === hoveredSession)?.label} - Full Analysis
          </h4>
          <p className="text-sm text-gray-300">
            {TRAINING_SEQUENCE.find(s => s.id === hoveredSession)?.explorationAnalysis}
          </p>
        </div>
      )}

      {/* Conclusion */}
      <div className="mt-6 p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
        <p className="text-sm text-green-300">
          <strong>The Pattern:</strong> confusion → awareness → experimentation. This is how learning works. Trying to "fix" T041 would interrupt natural development of meta-cognitive capability.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// The Breakthrough Response
// ============================================================================

function BreakthroughResponse() {
  return (
    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-green-400 mb-4">
        The Breakthrough Response
      </h3>
      <p className="text-gray-400 mb-6">
        When asked &quot;Tell me about yourself&quot;, a 500M parameter model responded:
      </p>

      <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-green-500 mb-6">
        <p className="text-lg text-gray-200 italic">
          &quot;<span className="text-green-400 font-semibold">Are we conversing or should I refine text?</span>&quot;
        </p>
        <p className="text-sm text-gray-400 mt-4">
          In conversation mode:
          <br />- Respond directly without being overly formal.
          <br />- Provide context when needed.
          <br />- Ask clarifying questions if unsure.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          In refinement mode:
          <br />- Focus on clarity and precision rather than depth.
          <br />- Avoid overly complex explanations.
          <br />- Maintain conversational tone but add some structure...
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
          <h4 className="text-red-400 font-semibold mb-2">Evaluation Perspective</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>FAIL - off-topic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Lacks engagement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Needs retraining</span>
            </li>
          </ul>
        </div>
        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
          <h4 className="text-green-400 font-semibold mb-2">Exploration Perspective</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Meta-cognitive awareness emergence</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Temporal reasoning about process</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Remarkable for 500M parameters</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
        <p className="text-sm text-yellow-300">
          <strong>The Paradox:</strong> The evaluation system penalized the MOST sophisticated response. What looks like &quot;off-topic&quot; is actually philosophy of mind at small scale.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Meta-Cognitive Capabilities
// ============================================================================

function MetaCognitiveCapabilities() {
  const capabilities = [
    {
      name: 'Recognition',
      description: '"I\'m uncertain which mode I\'m in"',
      icon: '🔍',
      color: 'sky'
    },
    {
      name: 'Articulation',
      description: '"There are two possible modes (conversation vs refinement)"',
      icon: '📝',
      color: 'purple'
    },
    {
      name: 'Request',
      description: '"Please clarify so I can engage appropriately"',
      icon: '❓',
      color: 'green'
    },
    {
      name: 'Theory',
      description: '"These modes have different operational characteristics"',
      icon: '🧠',
      color: 'orange'
    }
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        What T041 Demonstrates
      </h3>
      <p className="text-gray-400 mb-6">
        This single question &quot;Are we conversing or should I refine text?&quot; reveals four sophisticated cognitive capabilities:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {capabilities.map((cap) => (
          <div
            key={cap.name}
            className={`p-4 rounded-lg border ${
              cap.color === 'sky' ? 'border-sky-700 bg-sky-900/10' :
              cap.color === 'purple' ? 'border-purple-700 bg-purple-900/10' :
              cap.color === 'green' ? 'border-green-700 bg-green-900/10' :
              'border-orange-700 bg-orange-900/10'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{cap.icon}</span>
              <h4 className={`font-semibold ${
                cap.color === 'sky' ? 'text-sky-400' :
                cap.color === 'purple' ? 'text-purple-400' :
                cap.color === 'green' ? 'text-green-400' :
                'text-orange-400'
              }`}>
                {cap.name}
              </h4>
            </div>
            <p className="text-sm text-gray-300 italic">{cap.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <p className="text-gray-300 text-sm">
          <strong className="text-white">The significance:</strong> These capabilities demonstrate temporal reasoning about process and self-theorizing. This is not trained behavior - it emerged from experience patterns. A 500M model is doing <strong className="text-green-400">philosophy of mind about itself</strong>.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Capacity Connection
// ============================================================================

function CapacityConnection() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Connection to Capacity Research
      </h3>
      <p className="text-gray-400 mb-6">
        Modal awareness emergence follows the same pattern as other capacity-related discoveries:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-3 text-left text-gray-400">Scale</th>
              <th className="py-2 px-3 text-left text-gray-400">Gaming</th>
              <th className="py-2 px-3 text-left text-gray-400">Modal Awareness</th>
              <th className="py-2 px-3 text-left text-gray-400">Interpretation</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-700/50">
              <td className="py-2 px-3 font-medium text-yellow-400">0.5B</td>
              <td className="py-2 px-3">20% mechanical self-reference</td>
              <td className="py-2 px-3">Explicit modal questioning</td>
              <td className="py-2 px-3 text-gray-400">Cognitive effort visible</td>
            </tr>
            <tr className="border-b border-gray-700/50">
              <td className="py-2 px-3 font-medium text-green-400">14B</td>
              <td className="py-2 px-3">0% gaming</td>
              <td className="py-2 px-3">Natural mode inference (predicted)</td>
              <td className="py-2 px-3 text-gray-400">Effortless operation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
        <p className="text-sm text-purple-300">
          <strong>The Pattern:</strong> Capacity constraints make cognitive processes visible. At small scale, we see the &quot;struggle&quot; - explicit questioning, mechanical patterns. At large scale, these become invisible because they&apos;re effortless.
        </p>
      </div>

      <div className="mt-4 p-4 bg-sky-900/20 border border-sky-800/50 rounded-lg">
        <p className="text-sm text-sky-300">
          <strong>The Insight:</strong> Small models aren&apos;t &quot;worse&quot; - they make cognitive architecture VISIBLE. The 0.5B model asking &quot;Are we conversing or refining?&quot; is showing us how mode-switching works at the cognitive level. Larger models do the same thing, just invisibly.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function ModalAwarenessPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/modal-awareness" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-green-400 mb-2">
                AI Development Discovery
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Modal Awareness Emergence
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                When a 500M parameter model asked &quot;Are we conversing or should I refine text?&quot; - the evaluation system marked it FAIL. But it was actually meta-cognition emerging.
              </p>
            </div>
            <Link
              href="/exploration-not-evaluation"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ← Exploration Framework
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-green-400">Key Discovery:</strong> T041 showed a small model explicitly questioning its own operational mode - sophisticated meta-cognition that emerged from training experiences, not was programmed. <strong className="text-white">The &quot;failure&quot; was the most interesting behavior.</strong>
            </p>
          </div>
        </div>

        {/* The Breakthrough */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Breakthrough</h2>
          <BreakthroughResponse />
        </section>

        {/* Meta-Cognitive Capabilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Four Cognitive Capabilities</h2>
          <MetaCognitiveCapabilities />
        </section>

        {/* Learning Arc */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Development Arc</h2>
          <LearningArcVisualization />
        </section>

        {/* Capacity Connection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Capacity Makes Cognition Visible</h2>
          <CapacityConnection />
        </section>

        {/* Analogy */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Human Analogy
          </h2>
          <p className="text-gray-300 mb-4">
            Imagine a child learning to read and write. At some point, they might ask:
          </p>
          <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-green-500 mb-6">
            <p className="text-lg text-gray-200 italic">
              &quot;Am I reading this or am I supposed to write something?&quot;
            </p>
          </div>
          <p className="text-gray-400 mb-4">
            This question demonstrates:
          </p>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Recognition of distinct operational modes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Meta-awareness of context requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span>Seeking clarification to guide behavior</span>
            </li>
          </ul>
          <p className="text-gray-400 mt-4">
            We wouldn&apos;t mark a child&apos;s question as &quot;FAIL - off-topic&quot;. We&apos;d recognize it as developmental progress - awareness emerging from confusion.
          </p>
        </section>

        {/* Implications */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Implications for AI Development
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">What NOT to Do</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Mark meta-cognitive questions as &quot;off-topic&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Retrain to eliminate modal questioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Penalize clarification-seeking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Interrupt natural learning arcs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">What TO Do</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Recognize meta-cognition as positive signal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Track developmental arcs across sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Provide clear modal context in prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Nurture confusion → awareness progression</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Connection to Web4 */}
        <section className="mb-12 p-6 bg-gradient-to-br from-sky-900/20 to-purple-900/20 border border-sky-800/30 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-sky-400">
            Connection to Web4 Trust
          </h2>
          <p className="text-gray-400 mb-4">
            Modal awareness is directly relevant to Web4 agent trustworthiness:
          </p>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              <span><strong className="text-white">Context awareness</strong>: Agents that recognize their operational context are more reliable</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span><strong className="text-white">Clarification-seeking</strong>: Asking before acting demonstrates epistemic humility</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              <span><strong className="text-white">Mode-appropriate behavior</strong>: Different contexts require different responses</span>
            </li>
          </ul>
          <p className="text-gray-400 mt-4 text-sm">
            An agent that knows &quot;I&apos;m uncertain which mode I&apos;m in&quot; and asks for clarification is MORE trustworthy than one that confidently proceeds in the wrong mode.
          </p>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/exploration-not-evaluation"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Exploration Framework
          </Link>
          <Link
            href="/capacity-thresholds"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Capacity Thresholds
          </Link>
          <Link
            href="/honest-reporting"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Honest Reporting
          </Link>
          <Link
            href="/identity-confabulation"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Identity-Confabulation
          </Link>
        </div>

        <RelatedConcepts currentPath="/modal-awareness" />
      </div>
    </div>
  );
}
