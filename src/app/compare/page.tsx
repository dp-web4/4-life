/**
 * Simulation Comparison Page
 *
 * Compare multiple simulation runs side-by-side to understand
 * how different parameters affect trust dynamics and agent behavior.
 */

"use client";

import { useState } from "react";
import { ComparativeView } from "@/components/ComparativeView";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from '@/components/ExplorerNav';

// Available simulation files
const SIMULATIONS = [
  {
    id: 'ep_closed_loop',
    name: 'EP Closed Loop',
    file: '/ep_driven_closed_loop_results.json',
    description: 'Epistemic Proprioception with pattern learning across lives',
    color: '#3b82f6'
  },
  {
    id: 'multi_life_policy',
    name: 'Multi-Life with Policy',
    file: '/multi_life_with_policy.json',
    description: 'Multiple life cycles with trust policy',
    color: '#10b981'
  },
  {
    id: 'maturation_web4',
    name: 'Maturation (Web4)',
    file: '/maturation_demo_results_web4.json',
    description: 'Trust maturation with Web4 mechanisms',
    color: '#f59e0b'
  },
  {
    id: 'maturation_none',
    name: 'Maturation (Baseline)',
    file: '/maturation_demo_results_none.json',
    description: 'Trust maturation without Web4 mechanisms',
    color: '#8b5cf6'
  },
  {
    id: 'five_domain',
    name: 'Five Domain EP',
    file: '/ep_five_domain_multi_life_results.json',
    description: 'Multi-domain epistemic proprioception',
    color: '#ec4899'
  }
];

interface LoadedSimulation {
  id: string;
  name: string;
  color: string;
  data: {
    agent_lct: string;
    lives: any[];
  };
}

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>(['ep_closed_loop', 'multi_life_policy']);
  const [loadedSims, setLoadedSims] = useState<LoadedSimulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleSimulation = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleLoadSimulations = async () => {
    setLoading(true);
    setError(null);

    try {
      const promises = selectedIds.map(async id => {
        const sim = SIMULATIONS.find(s => s.id === id);
        if (!sim) throw new Error(`Unknown simulation: ${id}`);

        const response = await fetch(sim.file);
        if (!response.ok) throw new Error(`Failed to load ${sim.name}`);

        const data = await response.json();
        return {
          id: sim.id,
          name: sim.name,
          color: sim.color,
          data: {
            agent_lct: data.agent_lct,
            lives: data.lives
          }
        };
      });

      const results = await Promise.all(promises);
      setLoadedSims(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load simulations');
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs currentPath="/compare" />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Compare Simulations
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Select multiple simulation runs to compare side-by-side. Understand how different
            parameters, policies, and mechanisms affect trust dynamics and agent behavior.
          </p>
        </div>

        {/* Selection Panel */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Select Simulations to Compare
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {SIMULATIONS.map(sim => {
              const isSelected = selectedIds.includes(sim.id);
              return (
                <button
                  key={sim.id}
                  onClick={() => handleToggleSimulation(sim.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-4 h-4 rounded mt-1 flex-shrink-0"
                      style={{ backgroundColor: sim.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1">
                        {sim.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {sim.description}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`}>
                      {isSelected ? '✓' : '○'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLoadSimulations}
              disabled={selectedIds.length < 2 || loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedIds.length >= 2 && !loading
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {loading ? 'Loading...' : `Compare ${selectedIds.length} Simulations`}
            </button>

            {selectedIds.length < 2 && (
              <p className="text-sm text-slate-400">
                Select at least 2 simulations to compare
              </p>
            )}

            {error && (
              <p className="text-sm text-red-400">
                Error: {error}
              </p>
            )}
          </div>
        </div>

        {/* Comparison View */}
        {loadedSims.length > 0 && (
          <ComparativeView
            simulations={loadedSims.map(sim => ({
              agent_lct: sim.data.agent_lct,
              lives: sim.data.lives,
              name: sim.name,
              color: sim.color
            }))}
            height={300}
          />
        )}

        {/* Empty State */}
        {loadedSims.length === 0 && !loading && (
          <div className="bg-slate-800 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Simulations Loaded Yet
            </h3>
            <p className="text-slate-400">
              Select at least 2 simulations above and click "Compare" to begin
            </p>
          </div>
        )}

        {/* Educational Info */}
        <div className="mt-8 bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Understanding Comparative Analysis
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p>
              <strong className="text-white">Trust Trajectory:</strong> Shows how T3 (trust) evolves
              over time. The consciousness threshold (0.5) marks where behavior transitions from
              reactive to intentional. Above this threshold, agents exhibit coherent agency.
            </p>
            <p>
              <strong className="text-white">ATP Trajectory:</strong> Tracks the attention budget.
              ATP decreases with actions and increases with valuable contributions. The crisis
              threshold (20) marks when agents face metabolic pressure.
            </p>
            <p>
              <strong className="text-white">Volatility:</strong> Measures behavioral consistency.
              Low volatility indicates stable patterns; high volatility suggests crisis/recovery
              dynamics or experimental behavior.
            </p>
            <p>
              <strong className="text-white">Synchronized Hovering:</strong> Mouse over any chart
              to see values at that tick across all simulations. This reveals divergence points
              where different parameters led to different outcomes.
            </p>
            <p>
              <strong className="text-white">Key Insight:</strong> Comparing Web4 vs baseline
              maturation reveals how trust mechanisms (karma carry-forward, pattern learning)
              enable better outcomes across life cycles.
            </p>
          </div>
        </div>
        <ExplorerNav currentPath="/compare" />
        <RelatedConcepts currentPath="/compare" />
      </div>
    </div>
  );
}
