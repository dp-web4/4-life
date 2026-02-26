'use client';

/**
 * Trust Networks Page
 *
 * Session #11: Multi-Agent Trust Dynamics
 * Demonstrates how trust relationships form and evolve in Web4 societies
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TrustNetworkVisualization from '@/components/TrustNetworkVisualization';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from '@/components/ExplorerNav';
import { trackPageVisit } from '@/lib/exploration';

export default function TrustNetworksPage() {
  const [simulationData, setSimulationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { trackPageVisit('trust-networks'); }, []);

  useEffect(() => {
    // Load simulation data
    fetch('/trust_network_evolution.json')
      .then((res) => res.json())
      .then((data) => {
        setSimulationData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load simulation:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading simulation...</div>
      </div>
    );
  }

  if (!simulationData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Failed to load simulation data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/trust-networks" />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Trust Networks</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Watch how trust relationships form, strengthen, and decay between agents with different
            behavioral profiles. This is Web4 society formation in action.
          </p>
        </div>

        {/* Key Insight Box */}
        <div className="mb-8 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-3">💡 Key Insight: Trust Creates Structure</h2>
          <p className="text-gray-300 mb-4">
            Traditional social networks are <strong>declared</strong> (you "friend" someone).
            Web4 trust networks are <strong>emergent</strong> (trust forms through behavior).
          </p>
          <p className="text-gray-300">
            Watch how cooperators form coalitions, free-riders get isolated, and learners adapt.
            No central authority needed - society self-organizes around trustworthiness.
          </p>
        </div>

        {/* Visualization */}
        <div className="mb-8">
          <TrustNetworkVisualization data={simulationData} />
        </div>

        {/* How It Works */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🔍 How Trust Networks Form</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">1. Agents Have Behavioral Profiles</h3>
              <p className="text-gray-300 mb-2">
                Each agent follows different tendencies:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li><strong>Cooperator:</strong> Helps others consistently, builds trust steadily</li>
                <li><strong>Opportunist:</strong> Helps when convenient, mixed trust signals</li>
                <li><strong>Free-Rider:</strong> Takes without giving, loses trust over time</li>
                <li><strong>Learner:</strong> Starts naive, adapts from consequences</li>
                <li><strong>Maverick:</strong> High-risk high-reward, volatile trust</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">2. Interactions Build (or Break) Trust</h3>
              <p className="text-gray-300">
                Every time agents interact, trust changes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li><strong>Help:</strong> Source spends ATP to help target → trust increases</li>
                <li><strong>Ignore:</strong> Source acts selfishly → trust decreases</li>
                <li><strong>Follow-through:</strong> Reliability matters - inconsistent agents lose trust</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">3. Trust Edges Have Life Cycles</h3>
              <p className="text-gray-300">
                Trust relationships evolve through stages:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li><strong>Forming:</strong> First few interactions, trust uncertain</li>
                <li><strong>Stable:</strong> Consistent behavior, trust solidifies</li>
                <li><strong>Degrading:</strong> Negative interactions, trust declining</li>
                <li><strong>Broken:</strong> Trust below threshold, connection effectively severed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">4. Coalitions Emerge</h3>
              <p className="text-gray-300">
                When agents mutually trust each other above threshold (0.5), they form coalitions.
                These are <strong>detected, not declared</strong> - nobody says "we're forming a group".
                It just emerges from behavior.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Profiles Deep Dive */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🎭 Agent Behavioral Profiles</h2>
          <div className="space-y-4">
            {simulationData.agents.map((agent: any) => {
              const profileStyles: Record<string, { color: string; emoji: string }> = {
                cooperator: { color: 'text-green-400', emoji: '🤝' },
                opportunist: { color: 'text-yellow-400', emoji: '⚖️' },
                freerider: { color: 'text-red-400', emoji: '🏄' },
                learner: { color: 'text-blue-400', emoji: '📚' },
                maverick: { color: 'text-purple-400', emoji: '🎲' },
              };

              const style = profileStyles[agent.profile] || { color: 'text-gray-400', emoji: '❓' };

              return (
                <div
                  key={agent.lct}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{style.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{agent.name}</h3>
                        <span className={`${style.color} font-medium capitalize`}>
                          {agent.profile}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-3">{agent.profile_description}</p>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <div className="text-gray-500">Final ATP</div>
                          <div className="font-bold text-lg">{agent.final_atp.toFixed(1)}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Final Trust</div>
                          <div className="font-bold text-lg">{agent.final_trust.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Matters */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🌟 Why This Matters</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                1. Society Without Central Authority
              </h3>
              <p className="text-gray-300">
                No one decides who's trustworthy. No admin bans bad actors. The network
                self-organizes around behavior. Free-riders get isolated naturally.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                2. Trust is Multi-Dimensional Context
              </h3>
              <p className="text-gray-300">
                This visualization simplifies trust to a single number for clarity, but Web4's
                Trust Tensor (T3) tracks Talent, Training, and Temperament per role. Different
                roles weight different dimensions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                3. Reputation Cannot Be Faked Long-Term
              </h3>
              <p className="text-gray-300">
                Traditional reputation: Create new account = fresh start.
                <br />
                Web4: Identity bound to hardware, behavior tracked, karma carries forward.
                <br />
                Bad actors can't escape consequences by switching accounts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">
                4. Coalitions Enable Complex Coordination
              </h3>
              <p className="text-gray-300">
                When agents mutually trust, they can coordinate on bigger goals: resource pooling,
                collective insurance, distributed governance. Trust is the foundation of all
                cooperation.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <details className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <summary className="text-xl font-bold cursor-pointer mb-2">
            🔧 Technical Implementation
          </summary>

          <div className="mt-4 space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-2">Trust Edge Evolution</h3>
              <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`// Trust updates on interaction
edge.trust = max(0, min(1,
  edge.trust + trust_change
))

// Edge type classification
if (interactions < 3) → "forming"
else if (trust_change < -0.05) → "degrading"
else if (trust < 0.3) → "broken"
else → "stable"`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">Coalition Detection</h3>
              <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
{`// Simple bidirectional trust detection
for each agent A:
  coalition = [A]
  for each agent B:
    if trust(A→B) ≥ 0.5 AND trust(B→A) ≥ 0.5:
      coalition.add(B)

  if len(coalition) > 1:
    coalitions.add(coalition)`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">Behavioral Profiles</h3>
              <p className="mb-2">
                Each profile is a set of parameters that determine action probabilities:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>cooperation_rate</code>: Probability of helping others (0-1)</li>
                <li><code>reliability</code>: Consistency in follow-through (0-1)</li>
                <li><code>risk_tolerance</code>: Willingness to try risky actions (0-1)</li>
                <li><code>learning_rate</code>: How quickly they adapt from experience (0-1)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">Simulation Parameters</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Duration:</strong> 30 ticks</li>
                <li><strong>Agents:</strong> 5 (Alice/Cooperator, Bob/Opportunist, Charlie/Free-rider, Diana/Learner, Eve/Maverick)</li>
                <li><strong>Interactions per tick:</strong> 2-3 random pairings</li>
                <li><strong>Snapshots:</strong> Every 5 ticks</li>
                <li><strong>Coalition threshold:</strong> 0.5 (bidirectional trust)</li>
              </ul>
            </div>
          </div>
        </details>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-700">
          <Link
            href="/how-it-works"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← How Web4 Works
          </Link>

          <Link
            href="/lab-console"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Run Your Own Simulation →
          </Link>

          <Link
            href="/trust-tensor"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Trust Tensor (T3) →
          </Link>
        </div>
        <ExplorerNav currentPath="/trust-networks" />
        <RelatedConcepts currentPath="/trust-networks" />
      </div>
    </div>
  );
}
