'use client';

/**
 * ACT Explorer Page
 *
 * Standalone conversational interface to Web4 understanding.
 * Can be used without simulations (concept explanations) or with them (event analysis).
 *
 * Philosophy:
 * - Conversation beats static documentation
 * - Just-in-time learning (explain concepts when asked)
 * - Progressive revelation (start simple, build complexity)
 * - Context-aware (if simulation loaded, analyze it)
 */

import { useState } from 'react';
import Link from 'next/link';
import ACTChat from '@/components/ACTChat';
import type { SimulationResult } from '@/lib/types';

export default function ACTExplorerPage() {
  const [simulation, setSimulation] = useState<SimulationResult | undefined>();
  const [showSimulationPicker, setShowSimulationPicker] = useState(false);

  // Available pre-generated simulations
  const availableSimulations = [
    { id: 'ep-closed-loop', name: 'EP Closed Loop', file: 'ep_driven_closed_loop_results.json' },
    { id: 'maturation-web4', name: 'Maturation (Web4)', file: 'maturation_demo_results_web4.json' },
    { id: 'maturation-none', name: 'Maturation (Baseline)', file: 'maturation_demo_results_none.json' },
    { id: 'five-domain', name: 'Five Domain', file: 'ep_five_domain_multi_life_results.json' }
  ];

  const loadSimulation = async (file: string) => {
    try {
      const response = await fetch(`/${file}`);
      const data = await response.json();
      setSimulation(data);
      setShowSimulationPicker(false);
    } catch (error) {
      console.error('Failed to load simulation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm uppercase tracking-wide text-sky-400 mb-2">
                Conversational Interface
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
                ACT Explorer
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                Ask questions, explore concepts, understand simulations—all through natural conversation.
              </p>
            </div>
            <Link
              href="/lab-console"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-colors"
            >
              ← Lab Console
            </Link>
          </div>

          {/* Context indicator */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {simulation ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Analyzing: {simulation.agent_name || 'Simulation'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  No simulation loaded (concept explanations available)
                </span>
              )}
            </div>
            <button
              onClick={() => setShowSimulationPicker(!showSimulationPicker)}
              className="text-sm px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
            >
              {simulation ? 'Change Simulation' : 'Load Simulation'}
            </button>
            {simulation && (
              <button
                onClick={() => setSimulation(undefined)}
                className="text-sm px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Simulation picker */}
          {showSimulationPicker && (
            <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Load Simulation</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableSimulations.map(sim => (
                  <button
                    key={sim.id}
                    onClick={() => loadSimulation(sim.file)}
                    className="px-4 py-3 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded text-left transition-colors"
                  >
                    <div className="font-medium text-white">{sim.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{sim.file}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content: Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface (2/3) */}
          <div className="lg:col-span-2">
            <div className="h-[700px]">
              <ACTChat simulation={simulation} />
            </div>
          </div>

          {/* Info Sidebar (1/3) */}
          <div className="space-y-6">
            {/* What is ACT? */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">What is ACT?</h3>
              <p className="text-sm text-gray-300 mb-4">
                ACT (Accessible Coordination Technology) is your conversational guide to understanding Web4.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>✓ Ask questions in natural language</div>
                <div>✓ Explore simulation events</div>
                <div>✓ Learn concepts just-in-time</div>
                <div>✓ Get personalized guidance</div>
              </div>
            </div>

            {/* Example Queries */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Example Queries</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <div className="text-sky-400 font-medium mb-1">Concept Questions</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• "What is ATP?"</div>
                    <div>• "Explain trust tensors"</div>
                    <div>• "How does karma work?"</div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <div className="text-purple-400 font-medium mb-1">Event Analysis</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• "Why did trust drop at tick 14?"</div>
                    <div>• "What happened in life 2?"</div>
                    <div>• "Show me ATP crisis moments"</div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <div className="text-green-400 font-medium mb-1">Comparisons</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• "Compare Web4 vs baseline"</div>
                    <div>• "How does EP improve trust?"</div>
                    <div>• "What's different about maturation?"</div>
                  </div>
                </div>

                <div className="bg-gray-900 border border-gray-700 rounded p-3">
                  <div className="text-orange-400 font-medium mb-1">Guidance</div>
                  <div className="text-gray-400 text-xs space-y-1">
                    <div>• "What should I explore next?"</div>
                    <div>• "Where do I start?"</div>
                    <div>• "What's interesting here?"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div>
                  <div className="font-medium text-gray-300 mb-1">1. Pattern Matching</div>
                  <div className="text-xs">ACT understands your intent through keyword and pattern analysis</div>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">2. Context Awareness</div>
                  <div className="text-xs">If simulation loaded, ACT analyzes events and patterns</div>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">3. Pre-Generated Responses</div>
                  <div className="text-xs">Fast, reliable explanations without LLM latency</div>
                </div>
                <div>
                  <div className="font-medium text-gray-300 mb-1">4. Progressive Learning</div>
                  <div className="text-xs">Suggested follow-ups guide you deeper</div>
                </div>
              </div>
            </div>

            {/* Related Pages */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Related Tools</h3>
              <div className="space-y-2 text-sm">
                <Link
                  href="/lab-console"
                  className="block px-3 py-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
                >
                  🔬 Lab Console
                </Link>
                <Link
                  href="/narratives"
                  className="block px-3 py-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
                >
                  📖 Simulation Narratives
                </Link>
                <Link
                  href="/playground"
                  className="block px-3 py-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
                >
                  🎮 Parameter Playground
                </Link>
                <Link
                  href="/patterns"
                  className="block px-3 py-2 bg-gray-900 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
                >
                  🧠 Pattern Corpus Browser
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg">
          <h3 className="text-sm font-semibold text-sky-400 mb-2">Research Prototype</h3>
          <p className="text-sm text-gray-400">
            This is an early prototype of conversational Web4 exploration. Responses are pre-generated
            through pattern matching (not live LLM) for reliability and speed. Future versions will integrate
            with Claude/GPT for more flexible understanding, but the core philosophy remains: conversation
            beats static documentation for learning complex systems.
          </p>
        </div>
      </div>
    </div>
  );
}
