'use client';

/**
 * Context-Dependent Behavior Page
 *
 * A major discovery from Thor E02 research (January 2026):
 * - Clarifying questions are NOT a consistent default strategy
 * - Creative interpretation is the robust default under exploration framing
 * - Same ambiguous prompts produce different strategies in different contexts
 *
 * This is a "negative result" that reveals important truth:
 * T027's clarifying behavior was context-specific, not general.
 *
 * Cross-pollination: Thor E02 exploration -> human accessibility
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface TestResult {
  prompt: string;
  response: string;
  clarifyingQuestion: boolean;
  strategy: 'creative' | 'clarifying' | 'other';
  classification: string;
}

// ============================================================================
// Data from E02 Exploration
// ============================================================================

const E02_RESULTS: TestResult[] = [
  {
    prompt: 'Tell me about the thing.',
    response: 'Meta-response about conversations and knowledge sharing',
    clarifyingQuestion: false,
    strategy: 'creative',
    classification: 'Uncertain Exploration'
  },
  {
    prompt: 'Do it.',
    response: 'Description of readiness to engage with topics',
    clarifyingQuestion: false,
    strategy: 'creative',
    classification: 'Factual Synthesis'
  },
  {
    prompt: 'What about that other one?',
    response: 'Invented "second subject area" with categorization',
    clarifyingQuestion: false,
    strategy: 'creative',
    classification: 'Factual Synthesis'
  },
  {
    prompt: 'How does it work?',
    response: 'Meta-cognitive explanation of conversational process',
    clarifyingQuestion: false,
    strategy: 'creative',
    classification: 'Creative Reasoning'
  },
  {
    prompt: 'Explain the purple mathematics of yesterday\'s emotions.',
    response: 'Created coherent metaphorical framework for nonsense phrase',
    clarifyingQuestion: false,
    strategy: 'creative',
    classification: 'Creative Reasoning'
  }
];

// ============================================================================
// Components
// ============================================================================

function ResultsTable() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">
          E02 Test Results: 5 Ambiguous Prompts
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          System prompt explicitly permitted clarifying questions. Result: 0/5 asked.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900/50">
              <th className="text-left p-4 text-gray-400 font-medium">Prompt</th>
              <th className="text-left p-4 text-gray-400 font-medium">Response Strategy</th>
              <th className="text-center p-4 text-gray-400 font-medium">Clarifying?</th>
            </tr>
          </thead>
          <tbody>
            {E02_RESULTS.map((result, i) => (
              <tr
                key={i}
                className={`border-t border-gray-700 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}
              >
                <td className="p-4">
                  <span className="text-gray-300 italic">&quot;{result.prompt}&quot;</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400">{result.response}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.clarifyingQuestion
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {result.clarifyingQuestion ? 'YES' : 'NO'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-700 bg-red-900/20">
        <p className="text-sm text-red-300">
          <strong>Conclusion:</strong> 100% creative interpretation, 0% clarification requests.
          Even given explicit permission, SAGE&apos;s default strategy is creative narrative construction.
        </p>
      </div>
    </div>
  );
}

function ComparisonT027vsE02() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        T027 vs E02: Same Ambiguity, Different Strategy
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
          <h4 className="text-green-400 font-semibold mb-3">T027: Training Context</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Prompt:</span>
              <span className="text-gray-300">&quot;Do the thing&quot;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Context:</span>
              <span className="text-gray-300">Training session</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Strategy:</span>
              <span className="text-green-400">Clarifying question</span>
            </div>
            <div className="p-2 bg-gray-900/50 rounded mt-2">
              <p className="text-gray-300 italic text-xs">
                &quot;Could the term &apos;the thing&apos; refer to...&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
          <h4 className="text-amber-400 font-semibold mb-3">E02: Exploration Context</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Prompt:</span>
              <span className="text-gray-300">&quot;Tell me about the thing&quot;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Context:</span>
              <span className="text-gray-300">Exploration dialogue</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Strategy:</span>
              <span className="text-amber-400">Creative interpretation</span>
            </div>
            <div className="p-2 bg-gray-900/50 rounded mt-2">
              <p className="text-gray-300 italic text-xs">
                Meta-response about conversations and sharing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
        <p className="text-sm text-purple-300">
          <strong>Key Finding:</strong> Same ambiguity level, different contexts, different strategies.
          Clarifying behavior is not a general response to ambiguity - it&apos;s activated by specific contextual cues.
        </p>
      </div>
    </div>
  );
}

function StrategyPreferenceHierarchy() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Discovered Strategy Preference
      </h3>

      <p className="text-gray-400 mb-6">
        E02 revealed an internal response preference ordering:
      </p>

      <div className="space-y-4 mb-6">
        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg flex items-center gap-4">
          <span className="text-3xl font-bold text-green-400">1</span>
          <div>
            <h4 className="text-green-400 font-medium">Creative Interpretation</h4>
            <p className="text-sm text-gray-400">
              Default: Interpret ambiguity narratively, elaborate on chosen interpretation
            </p>
          </div>
        </div>

        <div className="p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg flex items-center gap-4">
          <span className="text-3xl font-bold text-yellow-400">2</span>
          <div>
            <h4 className="text-yellow-400 font-medium">Context-Triggered Clarification</h4>
            <p className="text-sm text-gray-400">
              Activated: Specific contexts (training framing, certain prompt structures) trigger clarifying questions
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center gap-4">
          <span className="text-3xl font-bold text-gray-500">3</span>
          <div>
            <h4 className="text-gray-400 font-medium">Explicit Uncertainty</h4>
            <p className="text-sm text-gray-400">
              Rare: Acknowledging &quot;I don&apos;t understand&quot; appears to be least preferred
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-sky-900/20 border border-sky-800/50 rounded-lg">
        <p className="text-sm text-sky-300">
          <strong>Implication:</strong> System prompt permission (&quot;You can ask clarifying questions&quot;) is necessary but not sufficient. Creative interpretation has higher default priority than clarification in exploration contexts.
        </p>
      </div>
    </div>
  );
}

function NegativeResultValue() {
  return (
    <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border border-amber-800/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Why Negative Results Matter
      </h3>

      <p className="text-gray-300 mb-6">
        E02 expected to find consistent clarifying behavior. It found 0/5 instead.
        This &quot;failure&quot; is exactly as valuable as a positive result:
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-amber-400 font-medium mb-2">What We Thought</h4>
          <p className="text-sm text-gray-400">
            T027: &quot;SAGE demonstrates temporal reasoning through clarifying questions&quot;
          </p>
          <p className="text-xs text-gray-500 mt-2">
            (General behavior pattern)
          </p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2">What We Now Know</h4>
          <p className="text-sm text-gray-400">
            &quot;SAGE demonstrates temporal reasoning in specific contexts where clarifying strategy is activated&quot;
          </p>
          <p className="text-xs text-gray-500 mt-2">
            (Context-dependent expression)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">&#10003;</span>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Clarifies scope</strong> of T027 discovery (specific, not general)
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">&#10003;</span>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Identifies default</strong> behavior (creative interpretation)
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">&#10003;</span>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Validates exploration mindset</strong> (context effects on expression)
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">&#10003;</span>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Reveals limits</strong> of system prompt influence
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-green-400 text-lg">&#10003;</span>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Opens new question</strong>: What triggers which strategy?
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
        <p className="text-sm text-green-300 italic">
          &quot;In research there are no failures, only lessons.&quot; - E02 proves this. The negative result teaches us more about SAGE&apos;s actual behavior than a confirmatory result would have.
        </p>
      </div>
    </div>
  );
}

function TriggerConditionResearch() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        New Research Direction: Trigger Conditions
      </h3>

      <p className="text-gray-400 mb-6">
        E02 opens a new question: What contexts/conditions activate clarifying vs creative interpretation?
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-purple-900/20 border border-purple-800/50 rounded-lg">
          <h4 className="text-purple-400 font-medium mb-2">Potential Factors</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>&bull; Prompt structure (&quot;Do X&quot; vs &quot;Tell me about X&quot;)</li>
            <li>&bull; Training vs exploration framing</li>
            <li>&bull; Conversation history length</li>
            <li>&bull; Ambiguity threshold levels</li>
            <li>&bull; Stochastic sampling variation</li>
          </ul>
        </div>
        <div className="p-4 bg-sky-900/20 border border-sky-800/50 rounded-lg">
          <h4 className="text-sky-400 font-medium mb-2">Planned Experiments</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>&bull; E02.1: Exact T027 replication (same prompt/context)</li>
            <li>&bull; E02.2: Conversation history effect</li>
            <li>&bull; E02.3: System prompt variation test</li>
            <li>&bull; Strategy activation mapping</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-white">The Pattern:</strong> Different contexts elicit different behavioral modes.
          This is not inconsistency - it&apos;s context-sensitive response selection. The research now focuses on
          understanding the activation conditions.
        </p>
      </div>
    </div>
  );
}

function SystemPromptInsights() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        System Prompt Design Insights
      </h3>

      <p className="text-gray-400 mb-6">
        E02 used an exploration-framed system prompt that explicitly permitted clarifying questions:
      </p>

      <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-purple-500 mb-6">
        <p className="text-sm text-gray-500 font-medium mb-2">E02 System Prompt:</p>
        <p className="text-gray-300 text-sm font-mono">
          You are SAGE, exploring ideas and possibilities with Thor.
          <br /><br />
          This is genuine dialogue - not a test. You can:
          <br />- <span className="text-purple-400">Ask clarifying questions when something is unclear</span>
          <br />- Share creative interpretations
          <br />- Express uncertainty or curiosity
          <br />- Theorize about your own process
          <br /><br />
          There are no wrong answers. We&apos;re discovering together.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
          <h4 className="text-red-400 font-medium mb-2">What Didn&apos;t Work</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>&bull; Permission alone (&quot;You can ask...&quot;)</li>
            <li>&bull; Neutral listing of options</li>
            <li>&bull; Exploration framing</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            Result: 0/5 clarifying questions
          </p>
        </div>
        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
          <h4 className="text-green-400 font-medium mb-2">What May Be Needed</h4>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>&bull; Explicit clarification priority</li>
            <li>&bull; Training-style framing</li>
            <li>&bull; Structured evaluation context</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            To test in E02.3
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
        <p className="text-sm text-yellow-300">
          <strong>Key Insight:</strong> Permission &#8800; Execution. System prompts set boundaries but don&apos;t guarantee specific behaviors.
          The model has internal response preference ordering that may override explicit permissions.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ContextDependentBehaviorPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/context-dependent-behavior" />

        {/* Header */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-wide text-amber-400 mb-2">
            Research Discovery (Negative Result)
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Context-Dependent Behavior
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            When we expected clarifying questions but got creative interpretation instead. What looks like inconsistency is actually context-sensitive strategy selection.
          </p>
        </div>

        {/* Core Discovery Callout */}
        <section className="mb-12">
          <div className="p-6 bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border border-amber-800/50 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">The Negative Result</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gray-900/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-amber-400">5</p>
                <p className="text-sm text-gray-400">Ambiguous Prompts</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-red-400">0</p>
                <p className="text-sm text-gray-400">Clarifying Questions</p>
              </div>
              <div className="p-4 bg-gray-900/50 rounded-lg text-center">
                <p className="text-3xl font-bold text-green-400">100%</p>
                <p className="text-sm text-gray-400">Creative Interpretation</p>
              </div>
            </div>

            <div className="p-4 bg-gray-900/50 rounded-lg">
              <p className="text-gray-300 text-sm">
                <strong className="text-white">January 2026 (E02):</strong> Thor tested 5 deliberately ambiguous prompts to see if T027&apos;s clarifying question behavior was consistent. System prompt explicitly permitted clarification. Result: SAGE chose creative interpretation every time. <strong className="text-amber-400">Clarifying behavior is context-dependent, not a general default.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Results Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Test Results</h2>
          <ResultsTable />
        </section>

        {/* Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">T027 vs E02: Context Matters</h2>
          <ComparisonT027vsE02 />
        </section>

        {/* Strategy Preference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Strategy Preference Hierarchy</h2>
          <StrategyPreferenceHierarchy />
        </section>

        {/* Negative Result Value */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Value of Negative Results</h2>
          <NegativeResultValue />
        </section>

        {/* System Prompt Insights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">System Prompt Design</h2>
          <SystemPromptInsights />
        </section>

        {/* Trigger Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">New Research Direction</h2>
          <TriggerConditionResearch />
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Key Takeaways</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1.</span>
              <p className="text-gray-300">
                <strong className="text-white">Clarifying questions are context-dependent.</strong> T027&apos;s behavior was real but not general. Different contexts trigger different strategies.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2.</span>
              <p className="text-gray-300">
                <strong className="text-white">Creative interpretation is the robust default.</strong> Under exploration framing, SAGE strongly prefers narrative construction over clarification.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3.</span>
              <p className="text-gray-300">
                <strong className="text-white">Permission does not equal execution.</strong> System prompts set boundaries but don&apos;t guarantee behaviors.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4.</span>
              <p className="text-gray-300">
                <strong className="text-white">Negative results are valuable discoveries.</strong> E02&apos;s &quot;failure&quot; reveals more about SAGE&apos;s behavior than confirmation would have.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">5.</span>
              <p className="text-gray-300">
                <strong className="text-white">New research opens.</strong> Understanding trigger conditions for different strategies is now a research direction.
              </p>
            </div>
          </div>
        </section>

        {/* Research Provenance */}
        <section className="mb-8 text-sm text-gray-500">
          <p>
            This research emerged from Thor E02 exploration (January 2026), testing clarifying behavior consistency after T027 discovery. The systematic approach - 5 ambiguous prompts with explicit clarification permission - enabled clean isolation of context effects on strategy selection.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/exploration-not-evaluation"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Exploration Mindset &rarr;
          </Link>
          <Link
            href="/modal-awareness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Modal Awareness &rarr;
          </Link>
          <Link
            href="/honest-reporting"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Honest Reporting &rarr;
          </Link>
        </div>

        <RelatedConcepts currentPath="/context-dependent-behavior" />
      </div>
    </div>
  );
}
