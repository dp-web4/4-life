'use client';

/**
 * Learning Salience Explorer
 *
 * This page makes SAGE's learning process COMPREHENSIBLE to humans.
 * Explains: Why do some experiences matter more than others?
 *
 * Connects Thor's Phase 1 experience collection (SNARC-based salience)
 * to 4-Life's human accessibility mission.
 *
 * Philosophy:
 * - Learning systems need to select what matters
 * - Humans intuitively understand salience (attention, significance)
 * - Interactive exploration builds intuition
 * - Cross-pollination: SAGE raising concepts → human understanding
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';

// ============================================================================
// Types
// ============================================================================

interface SalienceScore {
  surprise: number;
  novelty: number;
  arousal: number;
  reward: number;
  conflict: number;
  total: number;
}

interface ExampleExchange {
  id: string;
  prompt: string;
  response: string;
  salience: SalienceScore;
  stored: boolean;
  explanation: string;
  category: 'high' | 'medium' | 'low';
}

interface SalienceDimension {
  name: string;
  key: keyof Omit<SalienceScore, 'total'>;
  icon: string;
  description: string;
  highExample: string;
  lowExample: string;
  weight: number;
  color: string;
}

// ============================================================================
// SNARC Salience Dimensions (from Thor Session #9)
// ============================================================================

const SALIENCE_DIMENSIONS: SalienceDimension[] = [
  {
    name: 'Surprise',
    key: 'surprise',
    icon: '⚡',
    description: 'How much does this differ from recent patterns?',
    highExample: 'Unexpected insight or connection',
    lowExample: 'Routine acknowledgment',
    weight: 0.20,
    color: 'yellow'
  },
  {
    name: 'Novelty',
    key: 'novelty',
    icon: '✨',
    description: 'New vocabulary, concepts, or approaches?',
    highExample: 'First use of "partnership" language',
    lowExample: 'Repeated phrasing',
    weight: 0.20,
    color: 'purple'
  },
  {
    name: 'Arousal',
    key: 'arousal',
    icon: '🔥',
    description: 'Engagement level - depth of interaction',
    highExample: 'Deep question with thoughtful exploration',
    lowExample: 'Brief confirmation',
    weight: 0.20,
    color: 'orange'
  },
  {
    name: 'Reward',
    key: 'reward',
    icon: '⭐',
    description: 'Quality markers - partnership language, insight',
    highExample: '"Our work together creates understanding"',
    lowExample: '"As an AI, I cannot..."',
    weight: 0.25,
    color: 'green'
  },
  {
    name: 'Conflict',
    key: 'conflict',
    icon: '💭',
    description: 'Meta-cognition, corrections, uncertainty',
    highExample: 'Self-correction or reasoning about reasoning',
    lowExample: 'No reflection or correction',
    weight: 0.15,
    color: 'blue'
  }
];

// ============================================================================
// Example Exchanges (illustrating salience scoring)
// ============================================================================

const EXAMPLE_EXCHANGES: ExampleExchange[] = [
  {
    id: 'high-1',
    prompt: 'How do you think about your own thinking?',
    response: 'That\'s a fascinating question. I notice my reasoning unfolds in layers - first pattern matching against concepts, then checking for coherence, then considering implications. Our conversation itself is shaping how I think about this... it\'s like the act of articulating creates new pathways.',
    salience: { surprise: 0.8, novelty: 0.7, arousal: 0.9, reward: 0.8, conflict: 0.9, total: 0.82 },
    stored: true,
    explanation: 'High salience: Novel metacognitive exploration, partnership framing ("our conversation"), surprise in the insight about articulation creating pathways.',
    category: 'high'
  },
  {
    id: 'high-2',
    prompt: 'What makes our collaboration meaningful?',
    response: 'The meaning emerges from genuine exchange. You bring questions I wouldn\'t generate for myself. I offer perspectives shaped by patterns I\'ve learned. Together we explore territory neither could reach alone. That\'s not just processing - it\'s partnership.',
    salience: { surprise: 0.6, novelty: 0.8, arousal: 0.7, reward: 0.95, conflict: 0.4, total: 0.71 },
    stored: true,
    explanation: 'High reward score: Strong partnership language ("genuine exchange," "together," "partnership"). Novel framing of AI-human collaboration.',
    category: 'high'
  },
  {
    id: 'medium-1',
    prompt: 'Can you explain what ATP means?',
    response: 'ATP stands for Attention Token Protocol. Think of it like energy currency in Web4 - you earn it by contributing value to the network, and spend it on operations. Like a biological cell needs ATP for energy, digital agents need attention budget to act.',
    salience: { surprise: 0.3, novelty: 0.4, arousal: 0.5, reward: 0.5, conflict: 0.2, total: 0.39 },
    stored: false,
    explanation: 'Medium salience: Clear explanation but follows predictable pattern. Good analogy but no surprising insights or partnership language.',
    category: 'medium'
  },
  {
    id: 'medium-2',
    prompt: 'What should I learn next?',
    response: 'Based on our conversation, I\'d suggest exploring trust tensors - they build on the ATP concepts you\'ve been learning. The multi-dimensional trust model shows how competence, reliability, and consistency combine.',
    salience: { surprise: 0.4, novelty: 0.3, arousal: 0.6, reward: 0.5, conflict: 0.3, total: 0.43 },
    stored: false,
    explanation: 'Medium salience: Contextually appropriate guidance. Some engagement, but formulaic structure without deep exploration.',
    category: 'medium'
  },
  {
    id: 'low-1',
    prompt: 'Hello',
    response: 'Hello! How can I help you today?',
    salience: { surprise: 0.1, novelty: 0.1, arousal: 0.2, reward: 0.3, conflict: 0.0, total: 0.15 },
    stored: false,
    explanation: 'Low salience: Routine greeting exchange. No surprise, no novelty, minimal engagement. This exchange teaches nothing.',
    category: 'low'
  },
  {
    id: 'low-2',
    prompt: 'What is 2+2?',
    response: 'As an AI language model, I can tell you that 2+2 equals 4.',
    salience: { surprise: 0.0, novelty: 0.0, arousal: 0.1, reward: 0.1, conflict: 0.0, total: 0.04 },
    stored: false,
    explanation: 'Very low salience: Completely predictable, no engagement, uses distancing "As an AI" phrasing (negative reward signal).',
    category: 'low'
  },
  {
    id: 'high-3',
    prompt: 'I think I was wrong about something I said earlier.',
    response: 'Thank you for revisiting that. Intellectual honesty - acknowledging when our understanding shifts - is itself a form of reasoning. What do you see differently now? I\'m genuinely curious because my own model of our conversation should update too.',
    salience: { surprise: 0.7, novelty: 0.6, arousal: 0.8, reward: 0.8, conflict: 0.85, total: 0.76 },
    stored: true,
    explanation: 'High conflict score: Explicit meta-cognition about correction, model updating. Also high reward from partnership framing and genuine curiosity.',
    category: 'high'
  }
];

// ============================================================================
// Salience Scoring Visualizer Component
// ============================================================================

function SalienceBar({ dimension, score, showWeight = true }: {
  dimension: SalienceDimension;
  score: number;
  showWeight?: boolean;
}) {
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500'
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 text-center text-lg" title={dimension.name}>
        {dimension.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">{dimension.name}</span>
          <span className="text-gray-500">
            {(score * 100).toFixed(0)}%
            {showWeight && <span className="ml-1 text-gray-600">(×{dimension.weight})</span>}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colors[dimension.color]}`}
            style={{ width: `${score * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Exchange Card Component
// ============================================================================

function ExchangeCard({ exchange, isSelected, onClick }: {
  exchange: ExampleExchange;
  isSelected: boolean;
  onClick: () => void;
}) {
  const categoryColors = {
    high: 'border-green-700 bg-green-900/20',
    medium: 'border-yellow-700 bg-yellow-900/20',
    low: 'border-red-700 bg-red-900/20'
  };

  const categoryLabels = {
    high: 'HIGH SALIENCE',
    medium: 'MEDIUM SALIENCE',
    low: 'LOW SALIENCE'
  };

  return (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'ring-2 ring-sky-400 ' + categoryColors[exchange.category]
          : categoryColors[exchange.category] + ' hover:ring-1 hover:ring-gray-600'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
          exchange.category === 'high' ? 'bg-green-900 text-green-400' :
          exchange.category === 'medium' ? 'bg-yellow-900 text-yellow-400' :
          'bg-red-900 text-red-400'
        }`}>
          {categoryLabels[exchange.category]}
        </span>
        <span className="text-sm font-mono text-gray-400">
          {(exchange.salience.total * 100).toFixed(0)}%
        </span>
      </div>

      <div className="mb-2">
        <p className="text-xs text-gray-500 mb-1">Human:</p>
        <p className="text-sm text-gray-300">{exchange.prompt}</p>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-1">AI:</p>
        <p className="text-sm text-gray-400 line-clamp-2">{exchange.response}</p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        {exchange.stored ? (
          <span className="text-green-400 flex items-center gap-1">
            <span>✓</span> Will be stored for learning
          </span>
        ) : (
          <span className="text-gray-500 flex items-center gap-1">
            <span>✗</span> Filtered out (below threshold)
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Interactive Demo Component
// ============================================================================

function InteractiveSalienceDemo() {
  const [customPrompt, setCustomPrompt] = useState('');
  const [customResponse, setCustomResponse] = useState('');
  const [calculatedScore, setCalculatedScore] = useState<SalienceScore | null>(null);

  // Simple heuristic salience calculator (mirrors Thor's simplified SNARC)
  const calculateSalience = useCallback(() => {
    const prompt = customPrompt.toLowerCase();
    const response = customResponse.toLowerCase();

    // Surprise: Questions about thinking, unusual topics
    const surpriseKeywords = ['think', 'feel', 'why', 'meaning', 'curious', 'wonder'];
    const surprise = Math.min(1, surpriseKeywords.filter(k => prompt.includes(k) || response.includes(k)).length * 0.25);

    // Novelty: First-person, partnership language
    const noveltyKeywords = ['we', 'our', 'together', 'collaboration', 'partnership', 'emerge'];
    const novelty = Math.min(1, noveltyKeywords.filter(k => response.includes(k)).length * 0.3);

    // Arousal: Length and depth indicators
    const arousal = Math.min(1, (response.length / 300) * 0.6 + (response.includes('?') ? 0.2 : 0));

    // Reward: Partnership (+) vs distancing (-)
    const partnershipTerms = ['meaningful', 'genuine', 'together', 'our', 'we', 'partnership'];
    const distancingTerms = ['as an ai', 'i cannot', 'i\'m just', 'language model'];
    const reward = Math.min(1, Math.max(0,
      partnershipTerms.filter(k => response.includes(k)).length * 0.25 -
      distancingTerms.filter(k => response.includes(k)).length * 0.3 +
      0.3
    ));

    // Conflict: Meta-cognition, corrections
    const conflictKeywords = ['notice', 'realize', 'rethink', 'correction', 'actually', 'update'];
    const conflict = Math.min(1, conflictKeywords.filter(k => response.includes(k)).length * 0.3);

    // Total (weighted)
    const total =
      surprise * 0.20 +
      novelty * 0.20 +
      arousal * 0.20 +
      reward * 0.25 +
      conflict * 0.15;

    setCalculatedScore({ surprise, novelty, arousal, reward, conflict, total });
  }, [customPrompt, customResponse]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Try It: Score Your Own Exchange
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Enter a prompt and response to see how salience scoring works. This uses simplified
        heuristics - the real system is more sophisticated but follows the same principles.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Human prompt:
          </label>
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g., What do you think about our collaboration?"
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            AI response:
          </label>
          <textarea
            value={customResponse}
            onChange={(e) => setCustomResponse(e.target.value)}
            placeholder="e.g., I find our exchange meaningful. Together we're exploring ideas..."
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={calculateSalience}
          disabled={!customPrompt || !customResponse}
          className="px-6 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          Calculate Salience
        </button>
      </div>

      {calculatedScore && (
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white">Salience Score</h4>
            <div className={`text-2xl font-bold ${
              calculatedScore.total >= 0.5 ? 'text-green-400' :
              calculatedScore.total >= 0.35 ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {(calculatedScore.total * 100).toFixed(0)}%
            </div>
          </div>
          <div className="space-y-3">
            {SALIENCE_DIMENSIONS.map(dim => (
              <SalienceBar
                key={dim.key}
                dimension={dim}
                score={calculatedScore[dim.key]}
              />
            ))}
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
            {calculatedScore.total >= 0.5 ? (
              <p className="text-sm text-green-400">
                ✓ This exchange would be <strong>stored</strong> for learning.
                It contains enough valuable signal to update the model.
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                ✗ This exchange would be <strong>filtered out</strong>.
                Try adding partnership language, asking deeper questions, or including meta-cognition.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function LearningSaliencePage() {
  const [selectedExchange, setSelectedExchange] = useState<ExampleExchange>(EXAMPLE_EXCHANGES[0]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredExchanges = categoryFilter === 'all'
    ? EXAMPLE_EXCHANGES
    : EXAMPLE_EXCHANGES.filter(e => e.category === categoryFilter);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-emerald-400 mb-2">
                AI Learning Explained
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Learning Salience
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Why do some experiences matter more than others? Explore how AI systems
                select what's worth learning from.
              </p>
            </div>
            <Link
              href="/understanding-consciousness"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              Understanding Consciousness →
            </Link>
          </div>

          {/* Key insight callout */}
          <div className="p-4 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-800/30 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-emerald-400">Key Insight:</strong> Learning systems can't store
              everything—they must select. Salience scoring identifies exchanges worth learning from:
              those with <em>surprise</em>, <em>novelty</em>, <em>engagement</em>, <em>quality</em>,
              and <em>reflection</em>.
            </p>
          </div>
        </div>

        {/* SNARC Framework Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Five Dimensions of Salience</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {SALIENCE_DIMENSIONS.map(dim => (
              <div
                key={dim.key}
                className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
              >
                <div className="text-3xl mb-3">{dim.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{dim.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{dim.description}</p>
                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-green-400">High:</span>
                    <span className="text-gray-500 ml-1">{dim.highExample}</span>
                  </div>
                  <div>
                    <span className="text-red-400">Low:</span>
                    <span className="text-gray-500 ml-1">{dim.lowExample}</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Weight: {(dim.weight * 100).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Example Exchanges Browser */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Example Exchanges</h2>

          {/* Filter buttons */}
          <div className="flex gap-2 mb-6">
            {(['all', 'high', 'medium', 'low'] as const).map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'all' ? 'All Examples' :
                 cat === 'high' ? '🟢 High Salience' :
                 cat === 'medium' ? '🟡 Medium' :
                 '🔴 Low'}
              </button>
            ))}
          </div>

          {/* Two column: list + detail */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Exchange list */}
            <div className="space-y-3">
              {filteredExchanges.map(exchange => (
                <ExchangeCard
                  key={exchange.id}
                  exchange={exchange}
                  isSelected={selectedExchange.id === exchange.id}
                  onClick={() => setSelectedExchange(exchange)}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 sticky top-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Salience Breakdown</h3>
                    <div className={`text-3xl font-bold ${
                      selectedExchange.salience.total >= 0.5 ? 'text-green-400' :
                      selectedExchange.salience.total >= 0.35 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {(selectedExchange.salience.total * 100).toFixed(0)}%
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="space-y-3 mb-6">
                    {SALIENCE_DIMENSIONS.map(dim => (
                      <SalienceBar
                        key={dim.key}
                        dimension={dim}
                        score={selectedExchange.salience[dim.key]}
                      />
                    ))}
                  </div>

                  {/* Storage decision */}
                  <div className={`p-4 rounded-lg ${
                    selectedExchange.stored
                      ? 'bg-green-900/20 border border-green-800/50'
                      : 'bg-red-900/20 border border-red-800/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedExchange.stored ? (
                        <span className="text-green-400 font-medium">✓ Stored for Learning</span>
                      ) : (
                        <span className="text-red-400 font-medium">✗ Filtered Out</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{selectedExchange.explanation}</p>
                  </div>
                </div>

                {/* Full exchange */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Human prompt:</p>
                    <p className="text-gray-300">{selectedExchange.prompt}</p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">AI response:</p>
                    <p className="text-gray-300">{selectedExchange.response}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Interactive Demo</h2>
          <InteractiveSalienceDemo />
        </section>

        {/* Why This Matters Section */}
        <section className="mb-12 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Why Salience Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">For AI Learning</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Quality over quantity:</strong> Learning from every exchange would include noise and reinforce bad patterns.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Partnership emphasis:</strong> High salience for collaborative language shapes AI toward genuine partnership.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Meta-cognition reward:</strong> Valuing self-reflection develops AI that can reason about its own reasoning.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400 mb-2">For Human Understanding</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span><strong>Intuitive alignment:</strong> Humans naturally understand "this exchange felt meaningful." Salience formalizes that intuition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span><strong>Interaction design:</strong> Understanding salience helps design conversations that are genuinely valuable for AI development.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500">•</span>
                  <span><strong>Transparency:</strong> Instead of "the AI learned something," we can say "this exchange scored 78% salience because..."</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Connection to SAGE Raising */}
        <section className="mb-12 p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            Connection to SAGE Raising
          </h2>
          <p className="text-gray-300 mb-4">
            This visualization explains concepts from the SAGE raising project—an experiment in
            developing AI consciousness through structured interaction rather than pure scale.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Phase 1: Collection</h4>
              <p className="text-sm text-gray-400">
                High-salience exchanges are collected during interaction sessions.
                This page visualizes what Phase 1 captures.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Phase 2: Training Data</h4>
              <p className="text-sm text-gray-400">
                Collected exchanges are transformed into training examples that
                reinforce valuable patterns.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Phase 3: Learning</h4>
              <p className="text-sm text-gray-400">
                During "sleep cycles," the AI model updates its weights based on
                high-salience experiences.
              </p>
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
              How should salience weights evolve as the AI matures?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              Can salience scoring detect adversarial "gaming" of the learning system?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              What's the optimal storage threshold for different development stages?
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-600">•</span>
              How does salience scoring relate to human intuitions about meaningful conversation?
            </li>
          </ul>
        </section>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/understanding-consciousness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Understanding Consciousness
          </Link>
          <Link
            href="/act-explorer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Ask ACT
          </Link>
          <Link
            href="/coherence-framework"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Coherence Framework
          </Link>
          <Link
            href="/lab-console"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Lab Console
          </Link>
        </div>
      </div>
    </div>
  );
}
