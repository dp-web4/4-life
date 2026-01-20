"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

// Trust dimensions with descriptions
const TRUST_DIMENSIONS = {
  competence: {
    label: "Competence",
    description: "Can they do what they claim?",
    icon: "🎯",
    color: "#3b82f6", // blue
  },
  reliability: {
    label: "Reliability",
    description: "Do they show up consistently?",
    icon: "⏰",
    color: "#10b981", // green
  },
  integrity: {
    label: "Integrity",
    description: "Do they keep their word?",
    icon: "🛡️",
    color: "#8b5cf6", // purple
  },
  alignment: {
    label: "Alignment",
    description: "Do they share your values?",
    icon: "🧭",
    color: "#f59e0b", // amber
  },
  transparency: {
    label: "Transparency",
    description: "Are they open about their actions?",
    icon: "👁️",
    color: "#06b6d4", // cyan
  },
};

type TrustDimension = keyof typeof TRUST_DIMENSIONS;

export default function TrustTensorPage() {
  // Scenario simulation state
  const [trustScores, setTrustScores] = useState<Record<TrustDimension, number>>(
    {
      competence: 0.5,
      reliability: 0.5,
      integrity: 0.5,
      alignment: 0.5,
      transparency: 0.5,
    }
  );

  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Example scenarios that affect trust dimensions differently
  const scenarios = {
    deliveredWork: {
      label: "✅ Delivered high-quality work on time",
      effects: {
        competence: 0.15,
        reliability: 0.2,
        integrity: 0.1,
        alignment: 0.05,
        transparency: 0.05,
      },
    },
    missedDeadline: {
      label: "❌ Missed deadline without warning",
      effects: {
        competence: -0.05,
        reliability: -0.25,
        integrity: -0.15,
        alignment: 0,
        transparency: -0.2,
      },
    },
    helpedOthers: {
      label: "🤝 Helped others without expectation",
      effects: {
        competence: 0.05,
        reliability: 0.1,
        integrity: 0.15,
        alignment: 0.2,
        transparency: 0.1,
      },
    },
    liedAboutCapability: {
      label: "🚫 Lied about capability, failed task",
      effects: {
        competence: -0.3,
        reliability: -0.1,
        integrity: -0.35,
        alignment: -0.15,
        transparency: -0.25,
      },
    },
    transparentMistake: {
      label: "💬 Made mistake, communicated openly",
      effects: {
        competence: -0.1,
        reliability: 0,
        integrity: 0.1,
        alignment: 0.05,
        transparency: 0.25,
      },
    },
    consistentSmallWins: {
      label: "🎯 Consistent small contributions",
      effects: {
        competence: 0.1,
        reliability: 0.2,
        integrity: 0.1,
        alignment: 0.1,
        transparency: 0.05,
      },
    },
  };

  const applyScenario = (scenarioKey: string) => {
    const scenario = scenarios[scenarioKey as keyof typeof scenarios];
    const newScores = { ...trustScores };

    Object.entries(scenario.effects).forEach(([dim, change]) => {
      const dimension = dim as TrustDimension;
      newScores[dimension] = Math.max(
        0,
        Math.min(1, newScores[dimension] + change)
      );
    });

    setTrustScores(newScores);
    setSelectedScenario(scenarioKey);
    setTimeout(() => setSelectedScenario(null), 2000);
  };

  const reset = () => {
    setTrustScores({
      competence: 0.5,
      reliability: 0.5,
      integrity: 0.5,
      alignment: 0.5,
      transparency: 0.5,
    });
    setSelectedScenario(null);
  };

  // Calculate overall trust (simple average for demo)
  const overallTrust =
    Object.values(trustScores).reduce((sum, score) => sum + score, 0) / 5;

  const getTrustLabel = (score: number) => {
    if (score >= 0.8) return { label: "High Trust", color: "#10b981" };
    if (score >= 0.6) return { label: "Good Trust", color: "#3b82f6" };
    if (score >= 0.4) return { label: "Moderate Trust", color: "#f59e0b" };
    if (score >= 0.2) return { label: "Low Trust", color: "#ef4444" };
    return { label: "Very Low Trust", color: "#991b1b" };
  };

  const trustLabel = getTrustLabel(overallTrust);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/trust-tensor" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Web4 Trust
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          Trust Tensors: Multi-Dimensional Trust
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 doesn't reduce trust to a single number. Instead, it uses{" "}
          <strong className="text-sky-400">Trust Tensors</strong> - multi-dimensional
          vectors that capture the nuance of human relationships.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          You might trust someone's competence but not their reliability. You might
          trust their integrity but question their alignment. Multi-dimensional trust makes these distinctions
          explicit, measurable, and actionable.
        </p>

        {/* Educational Model Notice */}
        <div className="mt-6 bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
          <p className="text-purple-300 leading-relaxed">
            📚 <strong>Educational Model:</strong> This page uses a simplified 5-dimensional trust model
            (competence, reliability, integrity, alignment, transparency) for pedagogical clarity.
            Production Web4 uses <strong>role-specific 3D tensors</strong> (Talent, Training, Temperament)
            as defined in the{" "}
            <a
              href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/t3-v3-tensors.md"
              className="text-purple-200 underline hover:text-purple-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              canonical spec
            </a>. The principles are the same: multi-dimensional trust is harder to game than single scores.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Problem</h2>
        <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-red-400 mb-4">
            Traditional Trust: Single Number
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ❌ <strong>One-dimensional scoring</strong> - "Trust score: 7/10" loses all nuance
            </p>
            <p>
              ❌ <strong>Context-blind</strong> - Same score for doctor vs babysitter vs accountant
            </p>
            <p>
              ❌ <strong>Can't represent complexity</strong> - "High competence, low reliability" = ?
            </p>
            <p>
              ❌ <strong>Gaming is easy</strong> - Optimize for single metric, ignore everything else
            </p>
            <p className="pt-4 text-gray-400 italic">
              Result: Trust scores become meaningless averages that hide critical information.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Solution</h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-blue-900/20 border border-sky-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-sky-400 mb-4">
            Web4: Trust Tensors (T3)
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ✅ <strong>Multi-dimensional vectors</strong> - [competence, reliability, integrity, alignment, transparency]
            </p>
            <p>
              ✅ <strong>Context-aware</strong> - Different dimensions matter for different tasks
            </p>
            <p>
              ✅ <strong>Captures complexity</strong> - "High competence + low reliability" = measurable pattern
            </p>
            <p>
              ✅ <strong>Gaming is hard</strong> - Must build trust across all relevant dimensions
            </p>
            <p className="pt-4 text-gray-400 italic">
              Result: Trust becomes a rich, multi-dimensional signal that preserves nuance.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Dimensions Explained */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          The Five Trust Dimensions
        </h2>
        <p className="text-gray-400 mb-8">
          Each dimension measures a different aspect of trustworthiness. Together,
          they form a complete picture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(TRUST_DIMENSIONS).map(([key, dim]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{dim.icon}</span>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: dim.color }}
                >
                  {dim.label}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{dim.description}</p>
            </div>
          ))}

          {/* Additional dimension note */}
          <div className="md:col-span-2 bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-purple-400">Note:</strong> Web4 societies
              can define their own dimensions based on context. Medical societies
              might add "bedside_manner". Technical societies might add
              "code_quality". The framework is extensible.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Try It: Trust Tensor Simulator
        </h2>
        <p className="text-gray-400 mb-8">
          You start with neutral trust (0.5 in all dimensions). Choose scenarios
          and watch how different actions affect different trust dimensions.
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          {/* Overall Trust Score */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">
                Overall Trust Score
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: trustLabel.color }}
              >
                {(overallTrust * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                style={{
                  width: `${overallTrust * 100}%`,
                  backgroundColor: trustLabel.color,
                }}
              >
                {overallTrust > 0.1 && (
                  <span className="text-xs font-bold text-white">
                    {(overallTrust * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm" style={{ color: trustLabel.color }}>
              {trustLabel.label}
            </p>
          </div>

          {/* Individual Dimensions */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-300">
              Trust Dimensions
            </h3>
            {Object.entries(TRUST_DIMENSIONS).map(([key, dim]) => {
              const score = trustScores[key as TrustDimension];
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <span>{dim.icon}</span>
                      <span>{dim.label}</span>
                    </span>
                    <span className="text-sm font-semibold text-gray-300">
                      {(score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 ease-out"
                      style={{
                        width: `${score * 100}%`,
                        backgroundColor: dim.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scenario Buttons */}
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">
              Choose a Scenario
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => applyScenario(key)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedScenario === key
                      ? "bg-sky-900/50 border-sky-500"
                      : "bg-gray-800 border-gray-600 hover:border-sky-500 hover:bg-gray-750"
                  }`}
                >
                  <div className="text-white text-sm leading-relaxed">
                    {scenario.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="mt-6 w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
          >
            Reset to Neutral
          </button>
        </div>
      </section>

      {/* Key Insights */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Different Actions, Different Impacts
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Notice: "Missed deadline" tanks reliability and transparency more than
              competence. "Transparent mistake" actually increases transparency despite
              lowering competence. Single-number trust can't capture this.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Context Determines Weight
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              For a critical task, you might weight competence and reliability higher.
              For community leadership, alignment and integrity matter more. T3 lets
              you choose weights based on context.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Trust is Earned Per Dimension
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              You can't game all dimensions at once. High competence without integrity
              creates an unbalanced tensor. Web4 societies can require minimum thresholds
              across all dimensions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 border border-amber-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold text-amber-400 mb-3">
              Recovery is Dimensional Too
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Lost trust in one dimension? You can rebuild it specifically. "Transparent
              mistake" shows how honesty rebuilds transparency even while acknowledging
              a competence gap.
            </p>
          </div>
        </div>
      </section>

      {/* Real Web4 Example */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Real Web4 Example: Task Assignment
        </h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            Imagine a Web4 society needs to assign a critical infrastructure task.
            Here's how T3 helps make better decisions:
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Candidate A: "The Expert"
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Competence: <span className="text-green-400">95%</span> (excellent skills)</p>
                <p>Reliability: <span className="text-red-400">40%</span> (often disappears)</p>
                <p>Integrity: <span className="text-yellow-400">60%</span> (sometimes overpromises)</p>
                <p>Alignment: <span className="text-yellow-400">70%</span> (decent match)</p>
                <p>Transparency: <span className="text-red-400">30%</span> (poor communication)</p>
              </div>
              <p className="text-gray-300 mt-3 text-sm italic">
                Overall average: 59% - but would you trust them with critical infrastructure?
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                Candidate B: "The Reliable"
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Competence: <span className="text-yellow-400">75%</span> (solid but not stellar)</p>
                <p>Reliability: <span className="text-green-400">95%</span> (always shows up)</p>
                <p>Integrity: <span className="text-green-400">90%</span> (keeps promises)</p>
                <p>Alignment: <span className="text-green-400">85%</span> (strong values match)</p>
                <p>Transparency: <span className="text-green-400">88%</span> (excellent communication)</p>
              </div>
              <p className="text-gray-300 mt-3 text-sm italic">
                Overall average: 87% - balanced trust across all dimensions.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              💡 <strong>Web4 decision:</strong> For critical infrastructure, Candidate B
              wins despite lower competence. Their balanced tensor shows they're trustworthy
              across dimensions that matter (reliability, integrity, transparency). Candidate A's
              expertise doesn't overcome low reliability and transparency for this context.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="max-w-4xl mx-auto mt-16">
        <details className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <summary className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-sky-400 transition-colors">
            Technical Details (Click to Expand)
          </summary>

          <div className="mt-6 space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                What is a Tensor?
              </h3>
              <p className="leading-relaxed mb-3">
                In mathematics, a tensor is a multi-dimensional array of numbers. A{" "}
                <strong>Trust Tensor (T3)</strong> is a vector (1D tensor) where each
                element represents a different trust dimension.
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// Example T3 (5-dimensional)
T3 = [
  0.85,  // competence
  0.92,  // reliability
  0.88,  // integrity
  0.75,  // alignment
  0.90   // transparency
]`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                How T3 Updates Over Time
              </h3>
              <p className="leading-relaxed mb-3">
                Each action you take in a Web4 society produces an{" "}
                <strong>observation</strong> that updates your T3. The update is
                dimension-specific:
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// Pseudocode for T3 update
action = agent.completeTask(task)
observation = society.evaluateAction(action)

// Different dimensions get different updates
T3_new[competence] = weighted_avg(
  T3_old[competence],
  observation.quality_score,
  weight=0.3
)

T3_new[reliability] = weighted_avg(
  T3_old[reliability],
  observation.on_time ? 1.0 : 0.0,
  weight=0.5
)

// etc for each dimension`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Context-Weighted Trust Decisions
              </h3>
              <p className="leading-relaxed mb-3">
                When making decisions, Web4 societies can weight dimensions based on
                context:
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// Different contexts, different weights
critical_infrastructure_weights = [
  0.25,  // competence (important)
  0.30,  // reliability (critical!)
  0.25,  // integrity (important)
  0.10,  // alignment (less critical)
  0.10   // transparency (nice to have)
]

community_leadership_weights = [
  0.10,  // competence (less critical)
  0.15,  // reliability (important)
  0.30,  // integrity (critical!)
  0.30,  // alignment (critical!)
  0.15   // transparency (important)
]

trust_score = dot_product(T3, context_weights)`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                T3 vs V3 (Value Tensors)
              </h3>
              <p className="leading-relaxed mb-3">
                Web4 actually uses two related tensors:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>
                  <strong className="text-sky-300">T3 (Trust Tensor):</strong>{" "}
                  How much you trust someone across dimensions (canonically 3D: Talent, Training, Temperament)
                </li>
                <li>
                  <strong className="text-purple-300">V3 (Value Tensor):</strong>{" "}
                  How much value something creates across dimensions (Valuation, Veracity, Validity)
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                T3 is for agents (people, AI). V3 is for resources, tasks, or outcomes.
                Both use multi-dimensional frameworks to capture nuance.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Integration with ATP and Coherence
              </h3>
              <p className="leading-relaxed mb-3">
                T3 doesn't exist in isolation. It interacts with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>
                  <strong>ATP economics:</strong> Higher T3 = earn more ATP for
                  contributions
                </li>
                <li>
                  <strong>Coherence Index (CI):</strong> Behavioral consistency
                  modulates T3 updates
                </li>
                <li>
                  <strong>Karma:</strong> T3 above threshold allows rebirth with
                  ATP carried forward
                </li>
                <li>
                  <strong>MRH graph:</strong> T3 determines visibility in
                  relevancy horizon
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-sky-300">
                T3 is the trust foundation that makes all other Web4 mechanics possible.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Implementation in 4-Life
              </h3>
              <p className="leading-relaxed mb-3">
                The lab console simulations track simplified T3 vectors:
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// From web4/game/ep_driven_policy.py
class Agent:
    def __init__(self):
        self.trust_tensor = {
            'competence': 0.5,
            'reliability': 0.5,
            'integrity': 0.5
        }

    def update_trust(self, action_result):
        if action_result.success:
            self.trust_tensor['competence'] += 0.1
        if action_result.on_time:
            self.trust_tensor['reliability'] += 0.15
        # etc...`}
              </pre>
            </div>
          </div>
        </details>
      </section>

      {/* Why This Matters */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Matters
        </h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-900/20 border border-sky-800/30 rounded-xl p-8 space-y-4 text-gray-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-sky-400">
              Trust is not one-dimensional.
            </strong>{" "}
            Humans don't trust uniformly - we trust doctors for medical advice,
            mechanics for car repairs, friends for emotional support. Each requires
            different trust dimensions.
          </p>
          <p className="leading-relaxed">
            <strong className="text-purple-400">
              Single-number trust scores fail.
            </strong>{" "}
            A "7/10 trust score" tells you nothing about whether someone is
            competent-but-flaky or reliable-but-incompetent. Context matters.
          </p>
          <p className="leading-relaxed">
            <strong className="text-blue-400">
              T3 captures nuance without losing measurability.
            </strong>{" "}
            Multi-dimensional trust preserves rich information while remaining
            computable. Web4 societies can make context-aware decisions.
          </p>
          <p className="leading-relaxed">
            <strong className="text-green-400">
              Gaming becomes exponentially harder.
            </strong>{" "}
            Optimizing one dimension is easy. Optimizing all dimensions
            simultaneously? That's called "being trustworthy."
          </p>
          <p className="text-lg leading-relaxed pt-4 border-t border-sky-800/30">
            T3 is the foundation of Web4 trust. Without multi-dimensional trust,
            societies collapse to popularity contests or credential authorities.
            With it, nuanced human trust becomes algorithmically accessible.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-4xl mx-auto mt-16 flex gap-4">
        <Link
          href="/"
          className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          ← Back to Home
        </Link>
        <Link
          href="/web4-explainer"
          className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          More Web4 Concepts →
        </Link>
      </section>

      {/* Footer Note */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          Want to see T3 evolve in real simulations?{" "}
          <Link href="/lab-console" className="text-sky-400 hover:underline">
            Run the lab console
          </Link>{" "}
          and watch trust tensors change over time.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        <RelatedConcepts currentPath="/trust-tensor" />
      </div>
    </>
  );
}
