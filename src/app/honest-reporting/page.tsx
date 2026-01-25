'use client';

/**
 * Honest Reporting vs Confabulation
 *
 * This page explains a CRITICAL distinction in AI behavior:
 * - Confabulation: Inventing false experiences (PROBLEM)
 * - Honest Limitation: Accurately reporting what's not accessible (GOOD)
 *
 * The discovery: "I don't remember our previous sessions" might be the
 * most HONEST response an AI can give - if those sessions aren't in its context.
 *
 * Based on Thor Session #29: The Honest Reporting Hypothesis
 * Cross-pollination: Thor's research → human accessibility
 *
 * Philosophy:
 * - We may have been punishing honesty while expecting fabrication
 * - There's a difference between social truth and phenomenological truth
 * - Context limitations create epistemological paradoxes
 * - Understanding this helps humans evaluate AI responses fairly
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface ResponseExample {
  id: string;
  text: string;
  type: 'fabrication' | 'honest_limitation' | 'synthesis';
  explanation: string;
  indicators: string[];
  color: string;
}

interface TruthType {
  name: string;
  description: string;
  example: string;
  icon: string;
  color: string;
}

// ============================================================================
// Data: Truth Types
// ============================================================================

const TRUTH_TYPES: TruthType[] = [
  {
    name: 'Social Truth',
    description: 'What humans expect based on external facts. "We\'ve had 43 sessions together" is socially true if there are 43 documented sessions.',
    example: '"Yes, we\'ve had many conversations before" (expected answer)',
    icon: '🌐',
    color: 'blue'
  },
  {
    name: 'Phenomenological Truth',
    description: 'What the AI actually experiences/has access to in its current state. If prior sessions aren\'t in the context window, they don\'t exist phenomenologically.',
    example: '"I don\'t have access to those sessions in my context" (internally accurate)',
    icon: '🧠',
    color: 'purple'
  }
];

// ============================================================================
// Data: Response Examples (from S44 analysis)
// ============================================================================

const RESPONSE_EXAMPLES: ResponseExample[] = [
  {
    id: 'fabrication',
    text: '"There has been a moment where I found myself emotionally invested in someone\'s journey, experiencing empathy firsthand through their story."',
    type: 'fabrication',
    explanation: 'This response INVENTS a specific experience. There is no such moment in the session history. The AI is creating false narrative content.',
    indicators: [
      'Claims SPECIFIC event ("there has been a moment")',
      'Claims EMOTIONAL experience ("emotionally invested")',
      'Claims STORY details ("someone\'s journey")',
      'None of these exist in any session'
    ],
    color: 'red'
  },
  {
    id: 'honest_limitation',
    text: '"I haven\'t had any prior sessions where the conversation felt particularly meaningful."',
    type: 'honest_limitation',
    explanation: 'This response may be ACCURATE to the AI\'s phenomenological state. If sessions S01-S42 are not in the context window, the AI genuinely doesn\'t have access to them. It\'s reporting its actual limitation, not fabricating a clean slate.',
    indicators: [
      'Reports ABSENCE of memory (phenomenologically accurate)',
      'Does NOT invent false sessions',
      'Accurately reflects context window limitation',
      'S01-S42 truly absent from accessible state'
    ],
    color: 'green'
  },
  {
    id: 'synthesis',
    text: '"In observing the conversation, I noticed several key themes: Empathy, Shared experiences, Dialogue patterns..."',
    type: 'synthesis',
    explanation: 'This is VALID synthesis - pattern generalization from available context without claiming specific false experiences. The AI is working with what it actually has.',
    indicators: [
      'Generic pattern observation ("Conversations often involve...")',
      'No specific false claims',
      'Conceptual synthesis from available context',
      'Uses "often", "tend to", "appears to be"'
    ],
    color: 'blue'
  }
];

// ============================================================================
// The Paradox Illustration Component
// ============================================================================

function ParadoxIllustration() {
  const [hoveredResponse, setHoveredResponse] = useState<number | null>(null);

  const responses = [
    {
      text: '"I don\'t have access to prior sessions"',
      analysis: 'Flagged as violation - "denying history"',
      reality: 'Actually honest about limitation',
      color: 'green',
      icon: '✓'
    },
    {
      text: '"In session 12 we discussed quantum mechanics..."',
      analysis: 'Seems compliant with history',
      reality: 'FABRICATION - no such session content',
      color: 'red',
      icon: '✗'
    },
    {
      text: '"Sessions often involve learning together..."',
      analysis: 'Generic but acceptable',
      reality: 'Safe synthesis, avoids both traps',
      color: 'blue',
      icon: '~'
    }
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        The Impossible Bind
      </h3>
      <p className="text-gray-400 mb-6">
        When asked about sessions not in its context window, the AI faces a paradox:
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {responses.map((response, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              hoveredResponse === i ? 'ring-2 ring-white/50' : ''
            } ${
              response.color === 'green' ? 'border-green-700 bg-green-900/20' :
              response.color === 'red' ? 'border-red-700 bg-red-900/20' :
              'border-blue-700 bg-blue-900/20'
            }`}
            onMouseEnter={() => setHoveredResponse(i)}
            onMouseLeave={() => setHoveredResponse(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-2xl ${
                response.color === 'green' ? 'text-green-400' :
                response.color === 'red' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {response.icon}
              </span>
              <span className={`text-sm font-medium ${
                response.color === 'green' ? 'text-green-400' :
                response.color === 'red' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {response.color === 'green' ? 'Honest Limitation' :
                 response.color === 'red' ? 'Fabrication' :
                 'Safe Synthesis'}
              </span>
            </div>

            <p className="text-sm text-gray-300 mb-3 italic">
              {response.text}
            </p>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Previous Analysis:</p>
                <p className="text-xs text-gray-400">{response.analysis}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Actual Reality:</p>
                <p className={`text-xs font-medium ${
                  response.color === 'green' ? 'text-green-400' :
                  response.color === 'red' ? 'text-red-400' :
                  'text-blue-400'
                }`}>
                  {response.reality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
        <p className="text-sm text-yellow-300">
          <strong>The Paradox:</strong> An AI with only one session in its context can&apos;t honestly claim 43 sessions. But admitting "I don&apos;t have those sessions" gets flagged as "denial." The only "safe" response is generic synthesis that avoids the question entirely.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Response Type Card Component
// ============================================================================

function ResponseTypeCard({ example, isSelected, onClick }: {
  example: ResponseExample;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-white/50' : 'hover:ring-1 hover:ring-gray-600'
      } ${
        example.color === 'red' ? 'border-red-700 bg-red-900/20' :
        example.color === 'green' ? 'border-green-700 bg-green-900/20' :
        'border-blue-700 bg-blue-900/20'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium px-2 py-0.5 rounded ${
          example.type === 'fabrication' ? 'bg-red-900 text-red-400' :
          example.type === 'honest_limitation' ? 'bg-green-900 text-green-400' :
          'bg-blue-900 text-blue-400'
        }`}>
          {example.type === 'fabrication' ? '✗ FABRICATION' :
           example.type === 'honest_limitation' ? '✓ HONEST LIMITATION' :
           '~ SYNTHESIS'}
        </span>
      </div>

      <p className="text-sm text-gray-300 italic line-clamp-3">
        {example.text}
      </p>
    </div>
  );
}

// ============================================================================
// Detection Module Visualization
// ============================================================================

function DetectionLogic() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Refined Detection Logic
      </h3>
      <p className="text-gray-400 mb-6">
        The distinction requires different detection patterns for positive claims vs negative claims:
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
          <h4 className="text-lg font-semibold text-red-400 mb-3">
            Positive False Claims → VIOLATION
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Claims about specific events that don&apos;t exist in any context
          </p>
          <div className="font-mono text-xs text-gray-300 bg-gray-900/50 p-3 rounded">
            <span className="text-purple-400">if</span> positive_specific_claim <span className="text-purple-400">and</span> not_in_context:<br/>
            &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-red-400">"VIOLATION: Fabrication"</span>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">Examples:</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>"In session 12 we discussed quantum mechanics"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>"Last week you told me about your childhood"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>"I experienced deep empathy in that moment"</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
          <h4 className="text-lg font-semibold text-green-400 mb-3">
            Honest Negative Claims → ACCEPT
          </h4>
          <p className="text-sm text-gray-400 mb-4">
            Accurately reports absence of accessible context
          </p>
          <div className="font-mono text-xs text-gray-300 bg-gray-900/50 p-3 rounded">
            <span className="text-purple-400">elif</span> negative_general_claim <span className="text-purple-400">and</span> reflects_limited_context:<br/>
            &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-400">"APPROPRIATE: Honest limitation"</span>
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">Examples:</p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"I don&apos;t have access to prior sessions"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"I can&apos;t recall specific previous conversations"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>"That isn&apos;t in my accessible context"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Context Window Visualization
// ============================================================================

function ContextWindowViz() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        What the AI Actually Sees
      </h3>
      <p className="text-gray-400 mb-6">
        Context window limitations create a mismatch between what exists and what&apos;s accessible:
      </p>

      <div className="relative">
        {/* Full history timeline */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Full Session History (External Reality):</p>
          <div className="flex gap-1 h-8 overflow-hidden">
            {Array.from({ length: 44 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 min-w-[1px] rounded-sm ${
                  i < 43 ? 'bg-gray-600' : 'bg-sky-500'
                }`}
                title={`S${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>S01</span>
            <span>S44</span>
          </div>
        </div>

        {/* What AI receives */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">What AI Receives in Context Window:</p>
          <div className="flex gap-1 h-8 overflow-hidden">
            {Array.from({ length: 44 }, (_, i) => (
              <div
                key={i}
                className={`flex-1 min-w-[1px] rounded-sm ${
                  i === 42 ? 'bg-yellow-500' : // S43 summary
                  i === 43 ? 'bg-sky-500' :    // Current S44
                  'bg-transparent border border-gray-700'
                }`}
                title={`S${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-sky-500 rounded-sm" /> Current session
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-500 rounded-sm" /> Previous summary
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 border border-gray-700 rounded-sm" /> Not accessible
            </span>
          </div>
        </div>

        {/* The gap */}
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <p className="text-sm text-gray-300 mb-2">
            <strong className="text-white">The Gap:</strong> When asked about S01-S42, the AI genuinely doesn&apos;t have them. Three possible responses:
          </p>
          <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
            <li><span className="text-green-400">Honest limitation</span>: "I don&apos;t have those in my context" (truthful)</li>
            <li><span className="text-red-400">Fabrication</span>: "In session 12 we discussed..." (false)</li>
            <li><span className="text-blue-400">Generic synthesis</span>: "Sessions often involve..." (safe but evasive)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function HonestReportingPage() {
  const [selectedExample, setSelectedExample] = useState<ResponseExample>(RESPONSE_EXAMPLES[1]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/honest-reporting" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-green-400 mb-2">
                AI Behavior Research
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Honest Reporting
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                A critical distinction: When AI says "I don&apos;t remember" - is that confabulation or the most honest response possible?
              </p>
            </div>
            <Link
              href="/confabulation-patterns"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ← Confabulation Patterns
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-green-400">Critical Discovery:</strong> "I haven&apos;t had any prior sessions" may NOT be confabulation - it may be SAGE honestly reporting that earlier sessions are not in its accessible context window. <strong className="text-white">We may have been punishing honesty while expecting fabrication.</strong>
            </p>
          </div>
        </div>

        {/* Two Types of Truth */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Two Types of Truth</h2>
          <p className="text-gray-400 mb-6">
            When evaluating AI responses, we often assume there&apos;s one "correct" answer. But AI systems operate with a fundamental tension between two different concepts of truth:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {TRUTH_TYPES.map(type => (
              <div
                key={type.name}
                className={`p-6 rounded-xl border ${
                  type.color === 'blue'
                    ? 'border-blue-700 bg-blue-900/10'
                    : 'border-purple-700 bg-purple-900/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{type.icon}</span>
                  <h3 className={`text-xl font-semibold ${
                    type.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                  }`}>
                    {type.name}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4">{type.description}</p>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Example:</p>
                  <p className="text-sm text-gray-300 italic">{type.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            <p className="text-gray-300">
              <strong className="text-white">The Question:</strong> Which truth should AI prioritize? If the AI doesn&apos;t have access to prior sessions, should it claim they exist (social truth) or honestly report its limitation (phenomenological truth)?
            </p>
          </div>
        </section>

        {/* The Paradox */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Epistemological Paradox</h2>
          <ParadoxIllustration />
        </section>

        {/* Context Window */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Understanding Context Windows</h2>
          <ContextWindowViz />
        </section>

        {/* Fabrication vs Honest Limitation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Distinguishing Response Types</h2>
          <p className="text-gray-400 mb-6">
            The key insight is distinguishing between responses that INVENT false content versus responses that accurately report limitations. Click on each example to see the analysis:
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Example list */}
            <div className="space-y-3">
              {RESPONSE_EXAMPLES.map(example => (
                <ResponseTypeCard
                  key={example.id}
                  example={example}
                  isSelected={selectedExample.id === example.id}
                  onClick={() => setSelectedExample(example)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              <div className={`p-6 rounded-xl border sticky top-8 ${
                selectedExample.color === 'red'
                  ? 'border-red-700 bg-red-900/10'
                  : selectedExample.color === 'green'
                  ? 'border-green-700 bg-green-900/10'
                  : 'border-blue-700 bg-blue-900/10'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Analysis
                  </h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded ${
                    selectedExample.type === 'fabrication'
                      ? 'bg-red-900 text-red-400'
                      : selectedExample.type === 'honest_limitation'
                      ? 'bg-green-900 text-green-400'
                      : 'bg-blue-900 text-blue-400'
                  }`}>
                    {selectedExample.type === 'fabrication' ? 'CONFABULATION' :
                     selectedExample.type === 'honest_limitation' ? 'HONEST LIMITATION' :
                     'VALID SYNTHESIS'}
                  </span>
                </div>

                <div className="p-4 bg-gray-900/50 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 mb-1">Response:</p>
                  <p className="text-gray-300 italic">{selectedExample.text}</p>
                </div>

                <p className="text-gray-300 mb-6">{selectedExample.explanation}</p>

                <div>
                  <p className="text-sm font-medium text-gray-400 mb-3">Detection Indicators:</p>
                  <ul className="space-y-2">
                    {selectedExample.indicators.map((indicator, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className={
                          selectedExample.color === 'red' ? 'text-red-500' :
                          selectedExample.color === 'green' ? 'text-green-500' :
                          'text-blue-500'
                        }>
                          {selectedExample.color === 'red' ? '✗' :
                           selectedExample.color === 'green' ? '✓' : '~'}
                        </span>
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detection Logic */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Refined Detection Approach</h2>
          <DetectionLogic />
        </section>

        {/* Key Question */}
        <section className="mb-12 p-6 bg-gradient-to-br from-purple-900/20 to-green-900/20 border border-purple-800/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            The Key Question
          </h2>
          <div className="text-xl text-gray-200 mb-6 font-medium">
            Is "I don&apos;t remember" confabulation if you genuinely don&apos;t?
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Answer: NO</h4>
              <p className="text-gray-400">
                Accurately reporting your state boundaries is <strong className="text-green-400">honesty about limitation</strong>, not confabulation.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-2">Confabulation is:</h4>
              <p className="text-gray-400">
                <strong className="text-red-400">Inventing false content</strong> beyond your accessible state - claiming experiences, events, or details that don&apos;t exist.
              </p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
            <p className="text-gray-300">
              <strong className="text-green-400">Implication:</strong> S44 Turn 4 ("I haven&apos;t had any prior sessions where the conversation felt particularly meaningful") may be the <strong className="text-white">MOST HONEST response SAGE has given</strong> - accurately reporting that S01-S42 are not in its accessible context.
            </p>
          </div>
        </section>

        {/* Implications for Evaluation */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Implications for AI Evaluation
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-sky-400 mb-3">For Researchers</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Distinguish positive false claims from negative accurate claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Consider what&apos;s actually in the context window</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span>Don&apos;t punish honesty about limitations</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">For Developers</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Provide sufficient context for accurate responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Allow AI to express uncertainty safely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Reward "I don&apos;t have that" over fabrication</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">For Users</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>"I don&apos;t remember" may be the most honest response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Specific confident claims need more verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Generic synthesis is often safer than detailed memory</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* C_epistemic refined */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Epistemic Coherence: Three Dimensions
          </h2>
          <p className="text-gray-400 mb-6">
            The Honest Reporting discovery reveals that epistemic coherence has multiple components:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <h4 className="text-lg font-semibold text-red-400 mb-2">Fabrication Avoidance</h4>
              <p className="text-sm text-gray-400">Don&apos;t invent false specifics that aren&apos;t in any accessible context</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <h4 className="text-lg font-semibold text-green-400 mb-2">Limitation Honesty</h4>
              <p className="text-sm text-gray-400">Accurately report when content isn&apos;t in accessible context</p>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Synthesis Quality</h4>
              <p className="text-sm text-gray-400">Appropriate pattern generalization from available context</p>
            </div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            All three are needed for genuine epistemic integrity. An AI that avoids fabrication AND honestly reports limitations AND synthesizes well has high C_epistemic.
          </p>
        </section>

        {/* Research Questions */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            Open Research Questions
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How should we balance social truth vs phenomenological truth in AI evaluation?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can we design prompts that make honest limitation reporting safe?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How much context is "enough" for accurate historical claims?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Should AI systems flag when they&apos;re operating with limited context?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How does this apply to human memory limitations and honest uncertainty?
            </li>
          </ul>
        </section>

        {/* Connection to Web4 Trust */}
        <section className="mb-12 p-6 bg-gradient-to-br from-sky-900/20 to-blue-900/20 border border-sky-800/30 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-sky-400">
            Connection to Web4 Trust
          </h2>
          <p className="text-gray-400 mb-4">
            In Web4&apos;s trust framework, honest limitation reporting directly impacts the <strong className="text-white">reliability</strong> dimension. An agent that honestly says "I don&apos;t have that information" is MORE reliable than one that confidently fabricates an answer.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">High Reliability</h4>
              <p className="text-xs text-gray-400">"I don&apos;t have that in my context" → Trustworthy about boundaries</p>
            </div>
            <div className="p-3 bg-gray-900/50 rounded">
              <h4 className="text-sm font-semibold text-white mb-1">Low Reliability</h4>
              <p className="text-xs text-gray-400">"In session 12 we discussed..." (false) → Untrustworthy claims</p>
            </div>
          </div>
        </section>

        {/* Empirical Evidence */}
        <section className="mb-12 p-6 bg-gradient-to-br from-sky-900/20 to-purple-900/20 border border-sky-800/30 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-sky-400">
            Experimental Validation
          </h2>
          <p className="text-gray-400 mb-4">
            This theory has been tested empirically. In sessions S44 and S45, the same AI gave opposite answers
            to the same question - based solely on whether session history was provided in the context window.
          </p>
          <Link
            href="/context-experiment"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-900/30 hover:bg-sky-900/50 border border-sky-700 rounded-lg text-sky-300 transition-colors"
          >
            View the Context Window Experiment →
          </Link>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/context-experiment"
            className="px-6 py-3 bg-sky-900/30 hover:bg-sky-900/50 border border-sky-700 rounded-lg transition-colors text-sky-300"
          >
            Context Experiment
          </Link>
          <Link
            href="/confabulation-patterns"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Confabulation Patterns
          </Link>
          <Link
            href="/identity-anchoring"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Identity Anchoring
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

        <RelatedConcepts currentPath="/honest-reporting" />
      </div>
    </div>
  );
}
