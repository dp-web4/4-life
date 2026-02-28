"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import TermTooltip from "@/components/TermTooltip";
import dynamic from "next/dynamic";
import { trackPageVisit, trackConceptInteraction } from "@/lib/exploration";

const LiveTrustEngine = dynamic(() => import("@/components/LiveTrustEngine"), {
  ssr: false,
  loading: () => (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading trust engine...</div>
      </div>
    </div>
  ),
});

// Canonical 3D trust dimensions (Talent, Training, Temperament)
const TRUST_DIMENSIONS = {
  talent: {
    label: "Talent",
    question: "Can they solve problems in this role?",
    description: "Natural aptitude and creativity within a specific domain. Novel solutions, insight, pattern recognition.",
    icon: "💡",
    color: "#3b82f6", // blue
  },
  training: {
    label: "Training",
    question: "Do they have the expertise for this role?",
    description: "Learned skills, domain knowledge, and relevant experience. Grows through practice and study.",
    icon: "📚",
    color: "#10b981", // green
  },
  temperament: {
    label: "Temperament",
    question: "Can they be relied on in this role?",
    description: "Consistency, reliability, and ethical behavior within the role context. A surgeon needs steady hands; a trader needs risk tolerance.",
    icon: "⚖️",
    color: "#8b5cf6", // purple
  },
};

type TrustDimension = keyof typeof TRUST_DIMENSIONS;

// Role definitions for the interactive demo
const ROLES = {
  surgeon: { label: "Surgeon", icon: "🏥", weightLabel: "Steady precision under pressure" },
  analyst: { label: "Data Analyst", icon: "📊", weightLabel: "Insight from complex data" },
  leader: { label: "Team Leader", icon: "👥", weightLabel: "Reliable people management" },
};

type RoleKey = keyof typeof ROLES;

// V3 Output Scorer — interactive mini-interaction
const V3_OUTPUTS = [
  {
    id: 'thorough-review',
    label: 'Thorough Code Review',
    description: 'Found 3 real bugs, explained each clearly, suggested fixes with test cases.',
    valuation: 0.85,
    veracity: 0.92,
    validity: 0.95,
    insight: 'High across all dimensions — useful, accurate, and well-reasoned. This is how you build trust.',
  },
  {
    id: 'clickbait',
    label: 'Viral Clickbait Article',
    description: '"10 SHOCKING reasons..." Gets 50K views but contains misleading claims and weak arguments.',
    valuation: 0.55,
    veracity: 0.20,
    validity: 0.25,
    insight: 'Some popularity (Valuation) but terrible Veracity and Validity. Web4 weights truth over clicks — this earns less than half what the review earns.',
  },
  {
    id: 'niche-research',
    label: 'Niche Research Paper',
    description: 'Original findings on a narrow topic. Rigorous methodology, 12 citations, reproducible results.',
    valuation: 0.35,
    veracity: 0.95,
    validity: 0.90,
    insight: 'Low immediate popularity but exceptional truth and rigor. Web4 rewards this: V3 score (0.75) beats clickbait (0.33) because Veracity+Validity outweigh Valuation.',
  },
  {
    id: 'copied-answer',
    label: 'Copy-Pasted Answer',
    description: 'Copied someone else\'s solution verbatim without attribution. Works, but not original.',
    valuation: 0.50,
    veracity: 0.30,
    validity: 0.70,
    insight: 'The answer works (decent Validity) but unattributed copying tanks Veracity. Repeated behavior drags T3 Training scores down too.',
  },
  {
    id: 'mentoring',
    label: 'Patient Mentoring Session',
    description: 'Spent an hour helping a newcomer understand trust tensors. They left confident and capable.',
    valuation: 0.90,
    veracity: 0.85,
    validity: 0.88,
    insight: 'Teaching well is high-value work. The mentee\'s improved understanding is measurable value — and it builds your Temperament trust score.',
  },
];

function V3OutputScorer() {
  const [selectedOutput, setSelectedOutput] = useState<string | null>(null);
  const [scoredOutputs, setScoredOutputs] = useState<string[]>([]);

  const selected = V3_OUTPUTS.find(o => o.id === selectedOutput);
  const v3Score = selected
    ? (selected.valuation * 0.30 + selected.veracity * 0.35 + selected.validity * 0.35).toFixed(2)
    : null;

  const handleSelect = (id: string) => {
    trackConceptInteraction('trust-tensor');
    setSelectedOutput(id);
    if (!scoredOutputs.includes(id)) {
      setScoredOutputs(prev => [...prev, id]);
    }
  };

  const getColor = (v: number) => v >= 0.7 ? 'text-green-400' : v >= 0.45 ? 'text-amber-400' : 'text-red-400';
  const getBarColor = (v: number) => v >= 0.7 ? 'bg-green-500' : v >= 0.45 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <section className="max-w-4xl mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-2 text-gray-100">
        V3: Measuring What You Produce
      </h2>
      <p className="text-gray-400 mb-6">
        T3 measures <strong className="text-sky-300">who you are</strong>. V3 measures{' '}
        <strong className="text-purple-300">what you create</strong>. Every output in Web4 gets scored
        across three dimensions — and the weights are designed to reward truth over popularity.
      </p>

      {/* V3 dimension explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-sky-950/30 to-gray-900 border border-sky-800/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <h3 className="text-lg font-semibold text-sky-400">Valuation</h3>
            <span className="text-xs text-gray-500 ml-auto">weight: 0.30</span>
          </div>
          <p className="text-sm text-gray-400">How <em>useful</em> is the output? Measured by recipient satisfaction and ATP earned vs expected.</p>
        </div>
        <div className="bg-gradient-to-br from-purple-950/30 to-gray-900 border border-purple-800/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🔍</span>
            <h3 className="text-lg font-semibold text-purple-400">Veracity</h3>
            <span className="text-xs text-gray-500 ml-auto">weight: 0.35</span>
          </div>
          <p className="text-sm text-gray-400">How <em>truthful and accurate</em> is it? Verified by external validation and witness attestation.</p>
        </div>
        <div className="bg-gradient-to-br from-green-950/30 to-gray-900 border border-green-800/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✅</span>
            <h3 className="text-lg font-semibold text-green-400">Validity</h3>
            <span className="text-xs text-gray-500 ml-auto">weight: 0.35</span>
          </div>
          <p className="text-sm text-gray-400">Is it <em>well-reasoned and actually delivered</em>? Confirmed by receipt and logical soundness.</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Notice: Veracity + Validity (0.70 combined) outweigh Valuation (0.30). Web4 rewards truth and rigor over popularity by design.
      </p>

      {/* Output selector */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Score These Outputs</h3>
        <p className="text-sm text-gray-400 mb-4">Click each output to see how V3 scores it. {scoredOutputs.length > 0 && <span className="text-sky-400">({scoredOutputs.length}/{V3_OUTPUTS.length} scored)</span>}</p>

        <div className="space-y-3">
          {V3_OUTPUTS.map(output => {
            const isSelected = selectedOutput === output.id;
            const isScored = scoredOutputs.includes(output.id);
            const score = output.valuation * 0.30 + output.veracity * 0.35 + output.validity * 0.35;
            return (
              <div key={output.id}>
                <button
                  onClick={() => handleSelect(output.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-sky-900/30 border-sky-600'
                      : isScored
                      ? 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                      : 'bg-gray-800/30 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-200">{output.label}</div>
                      <div className="text-sm text-gray-400 mt-1">{output.description}</div>
                    </div>
                    {isScored && (
                      <div className={`text-lg font-bold ml-4 ${getColor(score)}`}>
                        {score.toFixed(2)}
                      </div>
                    )}
                  </div>
                </button>

                {/* Expanded detail panel */}
                {isSelected && selected && (
                  <div className="mt-2 p-4 bg-gray-800/60 rounded-lg border border-gray-700 space-y-4">
                    {/* Score bars */}
                    <div className="space-y-3">
                      {[
                        { label: 'Valuation', value: selected.valuation, weight: 0.30, color: 'sky' },
                        { label: 'Veracity', value: selected.veracity, weight: 0.35, color: 'purple' },
                        { label: 'Validity', value: selected.validity, weight: 0.35, color: 'green' },
                      ].map(dim => (
                        <div key={dim.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">{dim.label} (×{dim.weight})</span>
                            <span className={getColor(dim.value)}>{dim.value.toFixed(2)}</span>
                          </div>
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${getBarColor(dim.value)}`}
                              style={{ width: `${dim.value * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Composite calculation */}
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">V3 Composite Score</div>
                      <div className="font-mono text-sm text-gray-300">
                        {selected.valuation.toFixed(2)} × 0.30 + {selected.veracity.toFixed(2)} × 0.35 + {selected.validity.toFixed(2)} × 0.35 = <strong className={getColor(parseFloat(v3Score!))}>{v3Score}</strong>
                      </div>
                    </div>

                    {/* Insight */}
                    <p className="text-sm text-sky-300 italic">{selected.insight}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Compound insight after scoring 3+ outputs */}
        {scoredOutputs.length >= 3 && (
          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-700/30 rounded-lg">
            <p className="text-purple-300 text-sm font-semibold mb-2">The Pattern</p>
            <p className="text-gray-300 text-sm">
              Notice how <strong>niche research</strong> (V3: 0.75) outscores <strong>viral clickbait</strong> (V3: 0.33)
              despite getting a fraction of the attention. That&apos;s V3&apos;s design: truth and rigor
              are weighted 70% while popularity is only 30%. In Web4, quality wins over engagement farming.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              This is the V3 counterpart to T3: while T3 measures whether <em>you</em> are trustworthy,
              V3 measures whether your <em>work</em> is trustworthy. Both feed into the ATP rewards you earn.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TrustTensorPage() {
  useEffect(() => { trackPageVisit('trust-tensor'); }, []);

  // Scenario simulation state
  const [selectedRole, setSelectedRole] = useState<RoleKey>("analyst");
  const [trustScores, setTrustScores] = useState<Record<TrustDimension, number>>({
    talent: 0.5,
    training: 0.5,
    temperament: 0.5,
  });
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [trajectory, setTrajectory] = useState<{ label: string; scores: Record<TrustDimension, number> }[]>([]);

  // Role-specific scenarios
  const scenarios: Record<string, { label: string; effects: Record<TrustDimension, number> }> = {
    novelSuccess: {
      label: "✅ Solved a novel problem creatively",
      effects: { talent: 0.15, training: 0.05, temperament: 0.05 },
    },
    standardSuccess: {
      label: "📋 Completed routine work well",
      effects: { talent: 0.0, training: 0.08, temperament: 0.1 },
    },
    unexpectedFailure: {
      label: "❌ Failed unexpectedly on a task",
      effects: { talent: -0.1, training: -0.05, temperament: -0.1 },
    },
    ethicsViolation: {
      label: "🚫 Violated role ethics",
      effects: { talent: -0.05, training: 0, temperament: -0.25 },
    },
    transparentMistake: {
      label: "💬 Made mistake, owned it immediately",
      effects: { talent: -0.05, training: 0, temperament: 0.1 },
    },
    deepTraining: {
      label: "🎓 Completed advanced training",
      effects: { talent: 0.05, training: 0.2, temperament: 0.05 },
    },
  };

  const applyScenario = (scenarioKey: string) => {
    trackConceptInteraction('trust-tensor');
    const scenario = scenarios[scenarioKey];
    const newScores = { ...trustScores };

    Object.entries(scenario.effects).forEach(([dim, change]) => {
      const dimension = dim as TrustDimension;
      newScores[dimension] = Math.max(0, Math.min(1, newScores[dimension] + change));
    });

    setTrustScores(newScores);
    setTrajectory(prev => [...prev.slice(-4), { label: scenarios[scenarioKey].label, scores: { ...newScores } }]);
    setSelectedScenario(scenarioKey);
    setTimeout(() => setSelectedScenario(null), 2000);
  };

  const reset = () => {
    setTrustScores({ talent: 0.5, training: 0.5, temperament: 0.5 });
    setSelectedScenario(null);
    setTrajectory([]);
  };

  // Weighted trust based on selected role
  const roleWeights: Record<RoleKey, Record<TrustDimension, number>> = {
    surgeon: { talent: 0.3, training: 0.4, temperament: 0.3 },
    analyst: { talent: 0.4, training: 0.35, temperament: 0.25 },
    leader: { talent: 0.2, training: 0.3, temperament: 0.5 },
  };

  const weights = roleWeights[selectedRole];
  const weightedTrust =
    trustScores.talent * weights.talent +
    trustScores.training * weights.training +
    trustScores.temperament * weights.temperament;

  const getTrustLabel = (score: number) => {
    if (score >= 0.8) return { label: "High Trust", color: "#10b981" };
    if (score >= 0.6) return { label: "Good Trust", color: "#3b82f6" };
    if (score >= 0.4) return { label: "Moderate Trust", color: "#f59e0b" };
    if (score >= 0.2) return { label: "Low Trust", color: "#ef4444" };
    return { label: "Very Low Trust", color: "#991b1b" };
  };

  const trustLabel = getTrustLabel(weightedTrust);

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
          Web4 doesn&apos;t reduce trust to a single number. Instead, it uses{" "}
          <strong className="text-sky-400">Trust Tensors (T3)</strong> &mdash;
          three-dimensional vectors that capture{" "}
          <strong>Talent</strong>, <strong>Training</strong>, and <strong>Temperament</strong>,
          always in the context of a specific role.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          You might trust a brilliant surgeon who&apos;s unreliable differently from a steady surgeon
          with less raw talent. You wouldn&apos;t trust either of them to fix your car. T3 makes these
          distinctions explicit, measurable, and role-specific.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 cursor-pointer">
            ↓ Try the trust tensor simulator below
          </a>
        </p>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Problem</h2>
        <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-red-400 mb-4">
            Traditional Trust: One Number, No Context
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ❌ <strong>One-dimensional scoring</strong> &mdash; &ldquo;Trust score: 7/10&rdquo; loses all nuance
            </p>
            <p>
              ❌ <strong>Context-blind</strong> &mdash; Same score for surgeon, mechanic, and babysitter
            </p>
            <p>
              ❌ <strong>Can&apos;t represent trade-offs</strong> &mdash; &ldquo;Brilliant but unreliable&rdquo; becomes just &ldquo;average&rdquo;
            </p>
            <p>
              ❌ <strong>Easy to game</strong> &mdash; Optimize for one metric, ignore everything else
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
            Web4: Trust Tensors (T3) &mdash; Three Dimensions, Role-Specific
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ✅ <strong>Three canonical dimensions</strong> &mdash; Talent, Training, Temperament
            </p>
            <p>
              ✅ <strong>Role-contextual</strong> &mdash; Trust is always for a specific role, not a universal score
            </p>
            <p>
              ✅ <strong>Captures trade-offs</strong> &mdash; &ldquo;High talent + low temperament&rdquo; = measurable pattern
            </p>
            <p>
              ✅ <strong>Gaming is exponentially harder</strong> &mdash; Must build trust across all dimensions within each role
            </p>
            <p className="pt-4 text-gray-400 italic">
              Result: Trust becomes a rich, context-aware signal that preserves nuance.
            </p>
          </div>
        </div>
      </section>

      {/* The Three Dimensions */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          The Three Trust Dimensions
        </h2>
        <p className="text-gray-400 mb-8">
          Every T3 tensor measures three aspects of capability within a specific role.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(TRUST_DIMENSIONS).map(([key, dim]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{dim.icon}</span>
                <h3 className="text-xl font-semibold" style={{ color: dim.color }}>
                  {dim.label}
                </h3>
              </div>
              <p className="text-sky-300 text-sm font-medium mb-2">{dim.question}</p>
              <p className="text-gray-300 leading-relaxed text-sm">{dim.description}</p>
            </div>
          ))}
        </div>

        {/* Role-specific insight */}
        <div className="mt-6 bg-gradient-to-br from-sky-950/30 to-sky-900/20 border border-sky-800/30 rounded-xl p-6">
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-sky-400">Key insight:</strong> These dimensions are always measured
            <em> within a role</em>. Alice might have high Talent as a data analyst (0.85) but low Talent
            as a mechanic (0.20). Her trust as an analyst says nothing about her trust as a mechanic.
            Web4 never lets trust &ldquo;leak&rdquo; across unrelated domains.
          </p>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section id="try-it" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Try It: Trust Tensor Simulator
        </h2>
        <p className="text-gray-400 mb-4">
          Pick a role, then apply scenarios. Watch how the same action affects trust differently
          depending on which role you&apos;re evaluating.
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          {/* Role Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Evaluating trust as:
            </h3>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(ROLES).map(([key, role]) => (
                <button
                  key={key}
                  onClick={() => setSelectedRole(key as RoleKey)}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${
                    selectedRole === key
                      ? "bg-sky-900/50 border-sky-500 text-sky-300"
                      : "bg-gray-800 border-gray-600 text-gray-400 hover:border-sky-500"
                  }`}
                >
                  {role.icon} {role.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Role emphasis: {ROLES[selectedRole].weightLabel}
              {" "}&mdash;{" "}
              Talent {(weights.talent * 100).toFixed(0)}% /
              Training {(weights.training * 100).toFixed(0)}% /
              Temperament {(weights.temperament * 100).toFixed(0)}%
            </p>
          </div>

          {/* Overall Weighted Trust */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">
                Role-Weighted Trust ({ROLES[selectedRole].label})
              </span>
              <span className="text-2xl font-bold" style={{ color: trustLabel.color }}>
                {(weightedTrust * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="h-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                style={{
                  width: `${weightedTrust * 100}%`,
                  backgroundColor: trustLabel.color,
                }}
              >
                {weightedTrust > 0.1 && (
                  <span className="text-xs font-bold text-white">
                    {(weightedTrust * 100).toFixed(0)}%
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
              const weight = weights[key as TrustDimension];
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <span>{dim.icon}</span>
                      <span>{dim.label}</span>
                      <span className="text-xs text-gray-600">
                        (weight: {(weight * 100).toFixed(0)}%)
                      </span>
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

          {/* Trust Trajectory */}
          {trajectory.length > 0 && (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                Your Trust Trajectory ({trajectory.length} event{trajectory.length > 1 ? 's' : ''})
              </h3>
              <div className="space-y-2">
                {trajectory.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600 w-5 text-right">{i + 1}.</span>
                    <span className="text-gray-400 flex-1 truncate">{entry.label}</span>
                    <span style={{ color: '#60a5fa' }}>{entry.scores.talent.toFixed(2)}</span>
                    <span style={{ color: '#34d399' }}>{entry.scores.training.toFixed(2)}</span>
                    <span style={{ color: '#f59e0b' }}>{entry.scores.temperament.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-600 flex gap-3">
                <span style={{ color: '#60a5fa' }}>Talent</span>
                <span style={{ color: '#34d399' }}>Training</span>
                <span style={{ color: '#f59e0b' }}>Temperament</span>
              </div>
              {trajectory.length >= 3 && (
                <p className="mt-3 text-sm text-gray-400 bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  {trustScores.talent >= 0.7 && trustScores.training >= 0.7 && trustScores.temperament >= 0.7
                    ? '🟢 Strong across all dimensions — this agent is well-trusted in their role.'
                    : trustScores.temperament < 0.3
                    ? '🔴 Temperament is critically low — even high talent can\'t compensate for unreliability.'
                    : Math.max(trustScores.talent, trustScores.training, trustScores.temperament) -
                        Math.min(trustScores.talent, trustScores.training, trustScores.temperament) > 0.3
                    ? '🟡 Uneven profile — one dimension is much stronger than others. Real trust requires balance.'
                    : '🔵 Building steadily. Keep applying scenarios to see how trust evolves over time.'}
                </p>
              )}
            </div>
          )}

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
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Talent ≠ Temperament
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A brilliant but unreliable surgeon is dangerous. An ethics violation tanks Temperament
              without touching Talent. The system captures these trade-offs that single scores bury.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎭</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Trust Is Role-Specific
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Try switching roles in the simulator above. The same tensor scores produce different
              overall trust because each role weights dimensions differently. A leader needs
              Temperament; an analyst needs Talent.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Gaming Is Exponentially Harder
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To game a 3D tensor, you must build trust across all dimensions within each role separately.
              You can&apos;t inflate Talent by being reliable, and you can&apos;t transfer trust between
              unrelated roles.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 border border-amber-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold text-amber-400 mb-3">
              Recovery Is Dimensional
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Lost Temperament trust? Consistent behavior rebuilds it, even while Talent stays the same.
              &ldquo;Transparent mistake&rdquo; shows how honesty can rebuild one dimension while
              acknowledging a gap in another.
            </p>
          </div>
        </div>
      </section>

      {/* V3 Output Scorer — interactive mini-interaction */}
      <V3OutputScorer />

      {/* Real Web4 Example: Role-Specific Trust */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Real Example: Same Person, Different Roles
        </h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            Alice has spent years as a data analyst and recently started managing projects.
            Her T3 tensors reflect this asymmetry:
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Alice as Data Analyst
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Talent: <span className="text-green-400">85%</span> (creative problem-solver)</p>
                <p>Training: <span className="text-green-400">90%</span> (years of deep experience)</p>
                <p>Temperament: <span className="text-green-400">95%</span> (rock-solid reliability)</p>
              </div>
              <p className="text-gray-300 mt-3 text-sm italic">
                Role-weighted trust: 90% &mdash; she&apos;s deeply trusted in this domain.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Alice as Project Manager
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Talent: <span className="text-yellow-400">65%</span> (developing leadership instincts)</p>
                <p>Training: <span className="text-yellow-400">70%</span> (some PM experience)</p>
                <p>Temperament: <span className="text-green-400">91%</span> (her reliability carries over naturally)</p>
              </div>
              <p className="text-gray-300 mt-3 text-sm italic">
                Role-weighted trust: 76% &mdash; trusted, but still growing into this role.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-lg font-semibold text-red-400 mb-2">
                Alice as Mechanic
              </h3>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Talent: <span className="text-red-400">20%</span> (no mechanical aptitude)</p>
                <p>Training: <span className="text-red-400">15%</span> (no relevant training)</p>
                <p>Temperament: <span className="text-yellow-400">50%</span> (untested in this context)</p>
              </div>
              <p className="text-gray-300 mt-3 text-sm italic">
                Role-weighted trust: 27% &mdash; would you let her fix your brakes?
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              <strong>This is the power of role-specific trust.</strong> A single &ldquo;overall trust
              score&rdquo; for Alice would average these wildly different capabilities into a meaningless
              number. T3 keeps the roles separate so societies can make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Fractal Sub-Dimensions — collapsible for beginners */}
      <section className="max-w-4xl mx-auto mt-16">
        <details className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-8 cursor-pointer">
          <summary className="text-2xl font-bold text-gray-100 list-none flex justify-between items-center">
            <span>Going Deeper: Sub-Dimensions</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-4">
            <p className="text-gray-300 leading-relaxed mb-4">
              The three root dimensions (Talent, Training, Temperament) can be broken down into nested layers. Each
              domain can define sub-dimensions without changing the core framework:
            </p>

            <div className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono mb-4">
{`Alice as Data Analyst:
  Talent (0.85)
    ├── Statistical Modeling (0.92)
    │   └── Bayesian Inference (0.88)
    └── Data Visualization (0.78)
  Training (0.90)
    ├── Python Expertise (0.95)
    └── Domain Knowledge (0.85)
  Temperament (0.95)
    ├── Deadline Adherence (0.97)
    └── Communication Quality (0.93)`}
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Societies define the sub-dimensions that matter for their context. A medical society might
              add &ldquo;bedside manner&rdquo; under Temperament. A technical society might add
              &ldquo;code quality&rdquo; under Training. The framework is extensible at every level.
            </p>
          </div>
        </details>
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
                T3 Tensor Structure
              </h3>
              <p className="leading-relaxed mb-3">
                Each entity-role pair has its own T3 tensor. Tensors are never shared across roles.
                The canonical composite weights are <strong className="text-sky-300">Talent 0.4, Training 0.3,
                Temperament 0.3</strong> — societies can customize weights per role:
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// T3 tensor with role binding
{
  "entity": "lct:alice",
  "role_tensors": {
    "web4:DataAnalyst": {
      "talent": 0.85,      // weight: 0.4 (canonical)
      "training": 0.90,    // weight: 0.3
      "temperament": 0.95  // weight: 0.3
    },
    "web4:ProjectManager": {
      "talent": 0.65,
      "training": 0.70,
      "temperament": 0.91
    }
  }
}

// Composite: 0.4 × talent + 0.3 × training + 0.3 × temperament
// DataAnalyst: 0.4(0.85) + 0.3(0.90) + 0.3(0.95) = 0.895`}
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                How T3 Evolves
              </h3>
              <p className="leading-relaxed mb-3">
                Each action within a role produces dimension-specific updates:
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
{`// T3 update impacts by outcome type
Outcome               Talent     Training   Temperament
─────────────────────  ────────   ────────   ───────────
Novel Success          +0.02-05   +0.01-02   +0.01
Standard Success       0          +0.005-01  +0.005
Expected Failure       -0.01      0          0
Unexpected Failure     -0.02      -0.01      -0.02
Ethics Violation       -0.05      0          -0.10

// Decay half-lives (exponential, not linear)
Talent:      365-day half-life (skills persist)
Training:    180-day half-life (knowledge fades without practice)
Temperament:  30-day half-life (recent behavior matters most)

// Underlying formula (from spec test vectors):
// base_delta = 0.02 × (quality - 0.5)
// talent_delta  = base_delta × 1.0
// training_delta = base_delta × 0.8
// temperament_delta = base_delta × 0.6`}
              </pre>

              <details className="mt-4 bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden">
                <summary className="cursor-pointer p-4 text-sm font-semibold text-gray-300 hover:text-sky-400 transition-colors">
                  Why these specific half-lives? ▸
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400 space-y-2">
                  <p>
                    <strong className="text-sky-300">Talent (365 days)</strong> — Skills persist.
                    A surgeon doesn&apos;t forget surgery after six months of vacation. Core abilities
                    are durable, so trust in talent decays slowly.
                  </p>
                  <p>
                    <strong className="text-sky-300">Training (180 days)</strong> — Knowledge fades
                    without practice. Last year&apos;s certification matters less than this year&apos;s.
                    Moderate decay rewards ongoing learning.
                  </p>
                  <p>
                    <strong className="text-sky-300">Temperament (30 days)</strong> — Recent behavior
                    matters most. Yesterday&apos;s kindness doesn&apos;t excuse today&apos;s betrayal.
                    Fast decay means you must consistently demonstrate reliability.
                  </p>
                  <p className="text-gray-500 text-xs pt-1">
                    These values are society-configurable parameters, not universal constants.
                    A military society might use 7-day Temperament decay; a research lab might use 90 days.
                  </p>
                </div>
              </details>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Related: V3 (Value Tensors)
              </h3>
              <p className="leading-relaxed mb-3">
                T3 measures <em>who you are</em>. V3 measures <em>what you produce</em>. Every output
                in Web4 gets scored across three dimensions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>
                  <strong className="text-sky-300">T3 (Trust Tensor):</strong>{" "}
                  How much you trust someone &mdash; Talent, Training, Temperament (per role)
                </li>
                <li>
                  <strong className="text-purple-300">V3 (Value Tensor):</strong>{" "}
                  How much value something creates &mdash; Valuation (0.3 weight), Veracity (0.35), Validity (0.35)
                </li>
              </ul>

              {/* Practical V3 examples */}
              <div className="mt-4 bg-gradient-to-br from-purple-950/20 to-gray-900 border border-purple-800/30 rounded-xl p-5">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">V3 in Practice</h4>
                <div className="space-y-4 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-gray-200 mb-2">Scenario: Code Review</div>
                    <div className="grid grid-cols-3 gap-3 text-center mb-2">
                      <div>
                        <div className="text-xs text-gray-500">Valuation</div>
                        <div className="text-green-400 font-bold">0.85</div>
                        <div className="text-xs text-gray-500">How useful is it?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Veracity</div>
                        <div className="text-green-400 font-bold">0.90</div>
                        <div className="text-xs text-gray-500">Is it accurate?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Validity</div>
                        <div className="text-green-400 font-bold">0.80</div>
                        <div className="text-xs text-gray-500">Is it well-reasoned?</div>
                      </div>
                    </div>
                    <p className="text-gray-400">A thorough, accurate review that catches real bugs. High across all dimensions &mdash; earns full ATP reward.</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-gray-200 mb-2">Scenario: Clickbait Article</div>
                    <div className="grid grid-cols-3 gap-3 text-center mb-2">
                      <div>
                        <div className="text-xs text-gray-500">Valuation</div>
                        <div className="text-amber-400 font-bold">0.60</div>
                        <div className="text-xs text-gray-500">How useful is it?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Veracity</div>
                        <div className="text-red-400 font-bold">0.25</div>
                        <div className="text-xs text-gray-500">Is it accurate?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Validity</div>
                        <div className="text-red-400 font-bold">0.30</div>
                        <div className="text-xs text-gray-500">Is it well-reasoned?</div>
                      </div>
                    </div>
                    <p className="text-gray-400">Gets clicks (some valuation) but misleading and poorly argued. Low V3 score means reduced ATP reward, and repeated low-veracity output drags down T3 Training scores.</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-gray-200 mb-2">Scenario: Research Contribution</div>
                    <div className="grid grid-cols-3 gap-3 text-center mb-2">
                      <div>
                        <div className="text-xs text-gray-500">Valuation</div>
                        <div className="text-amber-400 font-bold">0.40</div>
                        <div className="text-xs text-gray-500">How useful is it?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Veracity</div>
                        <div className="text-green-400 font-bold">0.95</div>
                        <div className="text-xs text-gray-500">Is it accurate?</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Validity</div>
                        <div className="text-green-400 font-bold">0.92</div>
                        <div className="text-xs text-gray-500">Is it well-reasoned?</div>
                      </div>
                    </div>
                    <p className="text-gray-400">Niche topic (lower immediate valuation) but rigorous and accurate. The weighted score (0.35 × 0.95 + 0.35 × 0.92 + 0.30 × 0.40 = <strong>0.77</strong>) still earns good rewards because Web4 weights truth and reasoning more heavily than popularity.</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-500 text-xs">
                  V3 weights: Valuation 0.30, Veracity 0.35, Validity 0.35. Truth and reasoning outweigh popularity by design.
                </p>
                <p className="mt-2 text-gray-500 text-xs">
                  V3 decay half-lives: Valuation 14d (market conditions change fast), Veracity 365d (truth record persists), Validity 90d (certifications expire).
                </p>
              </div>

              <p className="mt-3 leading-relaxed">
                High T3 correlates with better V3 outcomes: Talent drives Valuation, Training drives
                Veracity, Temperament drives Validity. The relationship reinforces itself over time.
              </p>
              <p className="mt-2">
                <Link href="/web4-explainer#t3-v3" className="text-sky-400 hover:text-sky-300 text-sm">
                  Read more about T3/V3 in the Web4 Explainer →
                </Link>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Integration with Other Web4 Pillars
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>
                  <strong><TermTooltip term="ATP">ATP</TermTooltip> economics:</strong> Higher T3 = earn more ATP for contributions
                </li>
                <li>
                  <strong><TermTooltip term="CI">Coherence Index (CI)</TermTooltip>:</strong> Behavioral consistency modulates
                  effective trust: effective_trust = T3 × CI²
                </li>
                <li>
                  <strong>Karma:</strong> T3 above threshold allows rebirth with ATP carried forward
                </li>
                <li>
                  <strong><TermTooltip term="MRH">MRH</TermTooltip> graph:</strong> T3 determines visibility in the relevancy horizon
                </li>
              </ul>
            </div>
          </div>
        </details>
      </section>

      {/* Live Trust Engine — real WASM calculations */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          See the Real Engine
        </h2>
        <p className="text-gray-400 mb-6">
          This isn&apos;t a simulation &mdash; it&apos;s the actual <strong className="text-emerald-400">web4-trust-core</strong> engine
          compiled to WebAssembly and running in your browser. The same code that powers protocol conformance testing.
        </p>
        <LiveTrustEngine />
      </section>

      {/* Trust at Scale — fractal composition */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Trust at Scale
        </h2>
        <p className="text-gray-400 mb-6">
          T3 doesn&apos;t just work for individuals. The same three dimensions apply at every level of organization:
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-sm">
            <div className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-3">
              <div className="text-sky-400 font-bold mb-1">Person</div>
              <div className="text-gray-400 text-xs">Alice: T3 = 0.82</div>
            </div>
            <div className="bg-purple-950/30 border border-purple-800/30 rounded-lg p-3">
              <div className="text-purple-400 font-bold mb-1">Team</div>
              <div className="text-gray-400 text-xs">Alice&apos;s Lab: T3 = 0.78</div>
            </div>
            <div className="bg-amber-950/30 border border-amber-800/30 rounded-lg p-3">
              <div className="text-amber-400 font-bold mb-1">Organization</div>
              <div className="text-gray-400 text-xs">University: T3 = 0.71</div>
            </div>
            <div className="bg-emerald-950/30 border border-emerald-800/30 rounded-lg p-3">
              <div className="text-emerald-400 font-bold mb-1">Federation</div>
              <div className="text-gray-400 text-xs">Research Network: T3 = 0.65</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            When Alice&apos;s talent improves, her team&apos;s trust adjusts upward. When a team member acts badly,
            the organization&apos;s score reflects it. Trust flows upward through composition and downward through
            accountability &mdash; the same T3 model at every scale.
          </p>
          <p className="text-gray-500 text-xs">
            Different entity types compose differently: teams use weighted averages, organizations use geometric means,
            and AI agents are bounded by their weakest dependency. The math varies, but the three dimensions stay the same.
          </p>
        </div>
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
            Humans don&apos;t trust uniformly &mdash; we trust doctors for medical advice,
            mechanics for car repairs, friends for emotional support. Each requires
            different capabilities, and our trust reflects that.
          </p>
          <p className="leading-relaxed">
            <strong className="text-purple-400">
              Trust is not context-free.
            </strong>{" "}
            A &ldquo;7/10 trust score&rdquo; tells you nothing about whether someone is
            brilliant-but-flaky or reliable-but-average. More importantly, it tells you nothing
            about whether they&apos;re trusted <em>for the thing you need them to do</em>.
          </p>
          <p className="leading-relaxed">
            <strong className="text-blue-400">
              T3 captures nuance without losing measurability.
            </strong>{" "}
            Three dimensions (Talent, Training, Temperament), role-specific, with fractal
            sub-dimensions for any domain. Rich enough to be useful, structured enough to be computable.
          </p>
          <p className="leading-relaxed">
            <strong className="text-green-400">
              Gaming becomes genuinely hard.
            </strong>{" "}
            You can&apos;t inflate Talent by being reliable. You can&apos;t transfer trust from one
            role to another. You can&apos;t game three dimensions simultaneously across multiple
            roles. That&apos;s called &ldquo;actually being trustworthy.&rdquo;
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          Want to see T3 evolve in real simulations?{" "}
          <Link href="/society-simulator" className="text-sky-400 hover:underline">
            Try the Society Simulator
          </Link>{" "}
          and watch trust tensors change over time.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        <ConceptSequenceNav currentPath="/trust-tensor" />
        <RelatedConcepts currentPath="/trust-tensor" />
      </div>
    </>
  );
}
