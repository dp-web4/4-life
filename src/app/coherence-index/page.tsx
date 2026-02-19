"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function CoherenceIndexPage() {
  // Simulator state
  const [scenario, setScenario] = useState<
    "baseline" | "teleport" | "capability_spike" | "time_gap" | "relationship_conflict"
  >("baseline");
  const [spatialCI, setSpatialCI] = useState(1.0);
  const [capabilityCI, setCapabilityCI] = useState(1.0);
  const [temporalCI, setTemporalCI] = useState(1.0);
  const [relationalCI, setRelationalCI] = useState(1.0);
  const [overallCI, setOverallCI] = useState(1.0);
  const [effectiveTrust, setEffectiveTrust] = useState(0.75);
  const [atpMultiplier, setAtpMultiplier] = useState(1.0);
  const [extraWitnesses, setExtraWitnesses] = useState(0);

  const baseTrust = 0.75;

  const scenarios = {
    baseline: {
      name: "✅ Coherent Behavior",
      description: "All dimensions consistent. Normal operations.",
      spatial: 1.0,
      capability: 1.0,
      temporal: 1.0,
      relational: 1.0,
      explanation:
        "Device exhibits consistent location patterns, expected capabilities, regular temporal activity, and coherent relationships. Full trust access.",
    },
    teleport: {
      name: "📍 Impossible Travel",
      description: "Device claims to be in Tokyo, then London 30 minutes later.",
      spatial: 0.3,
      capability: 1.0,
      temporal: 1.0,
      relational: 1.0,
      explanation:
        "Spatial coherence tanks due to impossible travel speed (9,000 km in 30 min). Even with high trust history, effective trust drops dramatically.",
    },
    capability_spike: {
      name: "⚡ Capability Spike",
      description: "Mobile device suddenly claims GPU compute capabilities.",
      spatial: 1.0,
      capability: 0.4,
      temporal: 1.0,
      relational: 1.0,
      explanation:
        "Capability coherence drops due to unexpected hardware capabilities. Mobile device shouldn't have server-class GPU without upgrade event.",
    },
    time_gap: {
      name: "🕐 Temporal Gap",
      description: "Device goes dark for days, returns with broken continuity.",
      spatial: 1.0,
      capability: 1.0,
      temporal: 0.5,
      relational: 1.0,
      explanation:
        "Temporal coherence suffers from broken continuity chain and unusual activity pattern. Where was the device? Why no grounding?",
    },
    relationship_conflict: {
      name: "🔗 Relationship Conflict",
      description: "Device claims to work with entities it's never interacted with.",
      spatial: 1.0,
      capability: 1.0,
      temporal: 1.0,
      relational: 0.6,
      explanation:
        "Relational coherence fails due to MRH inconsistencies. Device claims relationships that aren't reflected in interaction history.",
    },
  };

  const handleScenarioChange = (
    newScenario: keyof typeof scenarios
  ) => {
    setScenario(newScenario);
    const s = scenarios[newScenario];

    setSpatialCI(s.spatial);
    setCapabilityCI(s.capability);
    setTemporalCI(s.temporal);
    setRelationalCI(s.relational);

    // Calculate overall CI (geometric mean)
    const ci = Math.pow(
      s.spatial * s.capability * s.temporal * s.relational,
      1 / 4
    );
    setOverallCI(ci);

    // Calculate effective trust (quadratic modulation)
    const effTrust = baseTrust * Math.pow(ci, 2);
    setEffectiveTrust(effTrust);

    // Calculate ATP cost multiplier
    let atpMult = 1.0;
    if (ci < 0.9) {
      atpMult = 1 / Math.pow(ci, 2);
      atpMult = Math.min(atpMult, 10.0); // Cap at 10x
    }
    setAtpMultiplier(atpMult);

    // Calculate extra witnesses required
    let extraW = 0;
    if (ci < 0.8) {
      extraW = Math.ceil((0.8 - ci) * 10);
      extraW = Math.min(extraW, 8); // Cap at +8
    }
    setExtraWitnesses(extraW);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <Breadcrumbs currentPath="/coherence-index" />

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-wide text-orange-400 mb-4">
            Web4 Foundation: Coherence
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Coherence Index (CI)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            How Web4 detects fake identities and incoherent behavior through
            multi-dimensional coherence scoring.
          </p>

          <div className="bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h3 className="text-xl font-semibold text-orange-400 mb-2">
                  The Key Insight
                </h3>
                <p className="text-gray-300 mb-3">
                  <strong>Traditional identity</strong>: Trust is binary (logged
                  in = trusted, not logged in = untrusted)
                </p>
                <p className="text-gray-300">
                  <strong>Web4 identity</strong>: Trust is modulated by coherence
                  (consistent behavior = full trust, incoherent behavior = trust
                  severely limited)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            The Problem: Identity Isn't Binary
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">❌</div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">
                    Traditional Web: Binary Trust
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>
                        <strong>Compromised credentials = full access</strong> -
                        Attacker with stolen password looks identical to real user
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>
                        <strong>No behavioral consistency checks</strong> - System
                        can't detect impossible travel, capability changes, or
                        temporal anomalies
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>
                        <strong>Detection happens too late</strong> - Only after
                        damage is done do fraud detection systems trigger
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">✅</div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">
                    Web4: Coherence-Modulated Trust
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        <strong>Continuous coherence verification</strong> - Every
                        grounding checks spatial, temporal, capability, and
                        relational consistency
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        <strong>Trust modulation in real-time</strong> - Incoherent
                        behavior immediately reduces effective trust, increases
                        costs, and requires more witnesses
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        <strong>Attack becomes expensive</strong> - Faking
                        coherence across all dimensions simultaneously is
                        computationally and economically prohibitive
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Four Dimensions Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            The Four Coherence Dimensions
          </h2>
          <p className="text-gray-400 mb-8">
            Web4 measures coherence across four independent dimensions. All must
            be consistent for full trust access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spatial */}
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">📍</div>
                <h3 className="text-xl font-semibold text-blue-400">
                  1. Spatial Coherence
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                <strong>Question</strong>: Can this device actually be where it
                claims?
              </p>
              <div className="bg-blue-950/30 border border-blue-800/20 rounded p-3 mb-3">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Detects</strong>:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Impossible travel (Tokyo → London in 30 min)</li>
                  <li>
                    • Hardware-specific velocity profiles (server = 0 km/h, mobile
                    = 100 km/h)
                  </li>
                  <li>• Sudden location jumps without travel announcements</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Mitigations: Travel announcements (+0.4), destination witnesses
                (+0.3)
              </p>
            </div>

            {/* Capability */}
            <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">⚡</div>
                <h3 className="text-xl font-semibold text-purple-400">
                  2. Capability Coherence
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                <strong>Question</strong>: Does this device have the capabilities
                it should?
              </p>
              <div className="bg-purple-950/30 border border-purple-800/20 rounded p-3 mb-3">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Detects</strong>:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Unexpected capabilities (mobile with GPU cluster)</li>
                  <li>• Capability changes without upgrade events</li>
                  <li>• Hardware class mismatches (IoT sensor with 1TB RAM)</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                16% penalty per unexpected capability. Sudden changes require
                documented upgrades.
              </p>
            </div>

            {/* Temporal */}
            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🕐</div>
                <h3 className="text-xl font-semibold text-green-400">
                  3. Temporal Coherence
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                <strong>Question</strong>: Is this device's temporal behavior
                consistent?
              </p>
              <div className="bg-green-950/30 border border-green-800/20 rounded p-3 mb-3">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Detects</strong>:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Broken continuity chains (missing hash links)</li>
                  <li>• Unusual activity patterns (night activity for day device)</li>
                  <li>• Time gaps without explanation</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Continuity tokens link groundings. Broken chain = 0.3 CI penalty.
              </p>
            </div>

            {/* Relational */}
            <div className="bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔗</div>
                <h3 className="text-xl font-semibold text-orange-400">
                  4. Relational Coherence
                </h3>
              </div>
              <p className="text-gray-300 mb-3">
                <strong>Question</strong>: Are this device's relationships
                consistent?
              </p>
              <div className="bg-orange-950/30 border border-orange-800/20 rounded p-3 mb-3">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>Detects</strong>:
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>
                    • MRH neighborhood inconsistencies (claims relationships not in
                    history)
                  </li>
                  <li>• Contradictory operational states</li>
                  <li>• Relationship claims without witness validation</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Validates grounding against existing MRH relationships and
                witnessed interactions.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Simulator Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Interactive Coherence Simulator
          </h2>
          <p className="text-gray-400 mb-8">
            See how different incoherence scenarios affect trust, ATP costs, and
            witness requirements.
          </p>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6">
            {/* Scenario Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose a scenario:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(scenarios).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() =>
                      handleScenarioChange(key as keyof typeof scenarios)
                    }
                    className={`text-left p-4 rounded-lg border transition-all ${
                      scenario === key
                        ? "bg-orange-900/30 border-orange-500 shadow-lg shadow-orange-500/20"
                        : "bg-gray-700/30 border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <div className="font-semibold text-gray-200 mb-1">
                      {s.name}
                    </div>
                    <div className="text-sm text-gray-400">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coherence Dimensions Visualization */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">
                Coherence Dimensions
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Spatial", value: spatialCI, color: "blue" },
                  { label: "Capability", value: capabilityCI, color: "purple" },
                  { label: "Temporal", value: temporalCI, color: "green" },
                  { label: "Relational", value: relationalCI, color: "orange" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{label}</span>
                      <span className={`text-${color}-400 font-semibold`}>
                        {value.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${color}-500 transition-all duration-500`}
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall CI */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-200">
                  Overall Coherence Index (CI)
                </h3>
                <span
                  className={`text-2xl font-bold ${
                    overallCI >= 0.9
                      ? "text-green-400"
                      : overallCI >= 0.7
                      ? "text-yellow-400"
                      : overallCI >= 0.5
                      ? "text-orange-400"
                      : "text-red-400"
                  }`}
                >
                  {overallCI.toFixed(3)}
                </span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    overallCI >= 0.9
                      ? "bg-green-500"
                      : overallCI >= 0.7
                      ? "bg-yellow-500"
                      : overallCI >= 0.5
                      ? "bg-orange-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${overallCI * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Calculated via geometric mean: (spatial × capability × temporal ×
                relational)^(1/4)
              </p>
            </div>

            {/* Impact on Trust & Economics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">
                  Effective Trust
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {(effectiveTrust * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">
                  Base: {(baseTrust * 100).toFixed(0)}% × CI²
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {effectiveTrust < baseTrust * 0.5 && "⚠️ Severely limited"}
                  {effectiveTrust >= baseTrust * 0.5 &&
                    effectiveTrust < baseTrust * 0.9 &&
                    "⚡ Moderately limited"}
                  {effectiveTrust >= baseTrust * 0.9 && "✅ Full access"}
                </div>
              </div>

              <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">ATP Cost</div>
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {atpMultiplier.toFixed(1)}x
                </div>
                <div className="text-xs text-gray-500">
                  Multiplier: 1 / CI² (capped at 10x)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {atpMultiplier > 5 && "⚠️ Very expensive"}
                  {atpMultiplier > 1.5 &&
                    atpMultiplier <= 5 &&
                    "⚡ Moderately expensive"}
                  {atpMultiplier <= 1.5 && "✅ Normal cost"}
                </div>
              </div>

              <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Extra Witnesses</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  +{extraWitnesses}
                </div>
                <div className="text-xs text-gray-500">
                  Additional: ceil((0.8 - CI) × 10)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {extraWitnesses >= 6 && "⚠️ High validation burden"}
                  {extraWitnesses > 0 &&
                    extraWitnesses < 6 &&
                    "⚡ Extra validation needed"}
                  {extraWitnesses === 0 && "✅ Normal validation"}
                </div>
              </div>
            </div>

            {/* Scenario Explanation */}
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-orange-400 mb-2">
                What's Happening?
              </h4>
              <p className="text-sm text-gray-300">
                {scenarios[scenario].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* Why Geometric Mean Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Why Geometric Mean? (One Low Dimension Tanks Everything)
          </h2>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3">
                  Security by Design
                </h3>
                <p className="text-gray-300 mb-3">
                  Web4 uses a <strong>geometric mean</strong> to combine the four
                  coherence dimensions, not an arithmetic mean. This is a
                  deliberate security choice:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      ❌ Arithmetic Mean (Insecure)
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      CI = (0.9 + 0.9 + 0.9 + 0.1) / 4 = <strong>0.7</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      One dimension at 0.1 gets "averaged out" by the others.
                      Attacker can ignore one dimension and still get decent CI.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      ✅ Geometric Mean (Secure)
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      CI = (0.9 × 0.9 × 0.9 × 0.1)^(1/4) = <strong>0.48</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      One dimension at 0.1 tanks the entire CI. Attacker MUST fake
                      coherence across ALL dimensions simultaneously.
                    </p>
                  </div>
                </div>

                <p className="text-gray-300">
                  <strong>Result</strong>: Attacks become exponentially harder.
                  You can't just spoof location OR capabilities OR timing - you
                  must maintain perfect coherence across all dimensions
                  simultaneously, which is computationally and economically
                  prohibitive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connection to 9-Domain Coherence Physics */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Connection to Coherence Physics
          </h2>
          <p className="text-gray-400 mb-6">
            Web4&apos;s Coherence Index draws inspiration from coherence principles
            observed across multiple domains of physical and social reality.
          </p>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌌</div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  The Nine Domains of Coherence
                </h3>
                <p className="text-gray-300 mb-4">
                  Research on{" "}
                  <Link
                    href="https://github.com/dp-web4/Synchronism"
                    className="text-purple-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Synchronism
                  </Link>{" "}
                  reveals coherence as a fundamental principle across scales, from
                  quantum mechanics to galaxy dynamics:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded p-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Quantum Scale
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Superconductivity</li>
                      <li>• BEC (Bose-Einstein Condensate)</li>
                      <li>• Laser coherence</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded p-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Biological Scale
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Heart rhythm</li>
                      <li>• Neural synchrony</li>
                      <li>• Circadian cycles</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded p-3">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">
                      Social Scale
                    </h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Trust emergence</li>
                      <li>• Collective behavior</li>
                      <li>• Economic coordination</li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-300 mb-3">
                  <strong>Key principle</strong>: Coherence measures how well a
                  system's parts align in phase and behavior. Loss of coherence =
                  loss of system functionality.
                </p>

                <p className="text-gray-300">
                  <strong>Web4's CI</strong> applies this principle to digital
                  identity: An entity with high coherence across spatial,
                  temporal, capability, and relational dimensions is exhibiting
                  the "phase alignment" characteristic of trustworthy systems.
                  Incoherence = phase misalignment = untrustworthy behavior.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Spacetime Coupling & Geodesics
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Recent work on Synchronism's 9th domain (Spacetime Coherence)
              reveals that coherent systems follow "geodesics" - paths of minimal
              action through their state space.
            </p>
            <p className="text-sm text-gray-300">
              <strong>For Web4</strong>: Coherent entities follow smooth,
              predictable trajectories through spatial, temporal, and capability
              space. Sudden jumps or discontinuities indicate either (1) external
              force (attack) or (2) phase transition (upgrade event). CI detects
              both.
            </p>
          </div>
        </section>

        {/* Real-World Applications Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Real-World Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🏦</div>
                <h3 className="text-xl font-semibold text-blue-400">
                  Fraud Detection
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Traditional</strong>: Reactive fraud detection after
                damage is done.
              </p>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Web4</strong>: Proactive coherence checking prevents fraud
                before it happens. Stolen credentials can't bypass spatial,
                temporal, and relational coherence checks.
              </p>
              <p className="text-xs text-gray-500">
                Example: Credit card stolen in New York. Thief tries to use it in
                Tokyo 2 hours later. CI tanks due to impossible travel, transaction
                blocked or requires massive additional witnesses.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🤖</div>
                <h3 className="text-xl font-semibold text-green-400">
                  Bot Detection
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Traditional</strong>: CAPTCHA, rate limiting, behavior
                analysis (all gameable).
              </p>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Web4</strong>: Bots struggle to maintain coherence across
                dimensions. Botnet from same datacenter? Spatial coherence fails.
                Sudden capability spike? Capability coherence fails.
              </p>
              <p className="text-xs text-gray-500">
                Example: 1000 "users" all claiming to be mobile devices but with
                identical capability fingerprints and sequential IP addresses. CI
                drops to near-zero, society access denied.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔐</div>
                <h3 className="text-xl font-semibold text-purple-400">
                  Account Takeover
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Traditional</strong>: Password reset = full access.
                Attacker indistinguishable from real user.
              </p>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Web4</strong>: Even with valid credentials, attacker's
                device has broken temporal continuity (new device), different
                capabilities, and no relational history. CI flags this immediately.
              </p>
              <p className="text-xs text-gray-500">
                Example: Phished password used from new device in different
                country. Temporal + spatial + relational coherence all fail.
                Society requires 6 additional witnesses or blocks access entirely.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">⚖️</div>
                <h3 className="text-xl font-semibold text-orange-400">
                  Sybil Resistance
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Traditional</strong>: One person creates many identities,
                hard to detect.
              </p>
              <p className="text-sm text-gray-300 mb-3">
                <strong>Web4</strong>: Each identity requires coherence across
                dimensions. Creating 100 fake identities means maintaining spatial,
                temporal, capability, and relational coherence for all 100
                simultaneously - prohibitively expensive.
              </p>
              <p className="text-xs text-gray-500">
                Example: Sybil attack on voting system. Attacker creates 50
                identities from same device. Spatial + capability coherence fails
                for 49 of them (all same location, same hardware fingerprint). CI
                drops below consciousness threshold (0.5), identities rejected.
              </p>
            </div>
          </div>
        </section>

        {/* Integration with Other Web4 Pillars */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Integration with Web4 Foundations
          </h2>
          <p className="text-gray-400 mb-8">
            Coherence Index works in concert with the other three Web4
            foundational pillars:
          </p>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">🔐</div>
                <h3 className="text-xl font-semibold text-blue-400">
                  CI + Identity Constellations (LCT)
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <strong>How they work together</strong>: Each device in your
                identity constellation maintains its own CI. More devices with high
                CI = stronger overall identity trust.
              </p>
              <p className="text-sm text-gray-400">
                Example: You have 3 devices (phone, laptop, FIDO2 key). If phone's
                CI drops (stolen and used from different location), other devices'
                high CI keeps your constellation intact. Stolen device's low CI
                prevents full access.
              </p>
              <Link
                href="/identity-constellation"
                className="text-blue-400 hover:underline text-sm mt-2 inline-block"
              >
                Learn more about identity constellations →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">⚡</div>
                <h3 className="text-xl font-semibold text-green-400">
                  CI + ATP Economics
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <strong>How they work together</strong>: Low CI increases ATP
                costs (up to 10x). This makes incoherent behavior economically
                expensive, not just trust-limited.
              </p>
              <p className="text-sm text-gray-400">
                Example: Attacker with stolen credentials (CI = 0.4) pays 6.25x
                more ATP for every action. If their ATP budget is limited, attack
                becomes unsustainable. Death through metabolic exhaustion.
              </p>
              <Link
                href="/atp-economics"
                className="text-green-400 hover:underline text-sm mt-2 inline-block"
              >
                Learn more about ATP economics →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">🎯</div>
                <h3 className="text-xl font-semibold text-purple-400">
                  CI + Trust Tensors (T3)
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <strong>How they work together</strong>: CI modulates effective
                trust. T3 = long-term reputation. CI = current consistency.
                Effective trust = T3 × CI².
              </p>
              <p className="text-sm text-gray-400">
                Example: You have high T3 (0.9 across all dimensions from years of
                good behavior). Suddenly you ground from impossible location (CI =
                0.3). Effective trust drops to 0.9 × 0.3² = 0.081 (8%). Your
                reputation is intact, but current access is severely limited until
                coherence recovers.
              </p>
              <Link
                href="/trust-tensor"
                className="text-purple-400 hover:underline text-sm mt-2 inline-block"
              >
                Learn more about trust tensors →
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Implementation Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Technical Implementation
          </h2>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
              Where CI Lives in Web4
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  1. Grounding Events
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Every time a device grounds (proves presence), Web4 calculates
                  CI across all four dimensions. This happens continuously, not
                  just at "login."
                </p>
                <div className="bg-gray-700/30 border border-gray-600 rounded p-3">
                  <code className="text-xs text-green-400">
                    {`// Pseudocode
grounding_event = {
  lct_id: device_lct,
  timestamp: now,
  location: gps_coords,
  capabilities: hardware_fingerprint,
  continuity_token: hash(previous_grounding),
  mrh_context: [recent_interactions]
}

ci = calculate_coherence(grounding_event, mrh_history)
effective_trust = base_trust * ci^2
atp_cost_multiplier = 1 / ci^2`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  2. Society Policies
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Each society configures CI thresholds and modulation curves.
                  Strict societies require higher CI, lenient societies are more
                  forgiving.
                </p>
                <div className="bg-gray-700/30 border border-gray-600 rounded p-3">
                  <code className="text-xs text-green-400">
                    {`// Society configuration
strict_society = {
  min_ci_for_access: 0.8,
  trust_modulation_exponent: 3,  // ci^3 = steeper penalty
  atp_cost_exponent: 2.5,
  witness_scaling_factor: 15
}

lenient_society = {
  min_ci_for_access: 0.5,
  trust_modulation_exponent: 1.5,  // ci^1.5 = gentler penalty
  atp_cost_exponent: 1.8,
  witness_scaling_factor: 5
}`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">
                  3. Reference Implementation
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Web4's reference implementation (Python) is available in the Web4
                  repository:
                </p>
                <div className="bg-gray-700/30 border border-gray-600 rounded p-3">
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>
                      • <code>coherence.py</code> (560 lines) - CI calculation
                      across 4 dimensions
                    </li>
                    <li>
                      • <code>trust_tensors.py</code> (330 lines) - CI modulation
                      functions
                    </li>
                    <li>
                      • <code>test_coherence.py</code> (337 lines) - 16
                      comprehensive tests
                    </li>
                    <li>
                      • <code>test_trust_tensors.py</code> (280 lines) - 20
                      modulation tests
                    </li>
                  </ul>
                </div>
                <Link
                  href="https://github.com/dp-web4/web4"
                  className="text-blue-400 hover:underline text-sm mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View implementation on GitHub →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Key Takeaways
          </h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                1. Trust Isn't Binary
              </h3>
              <p className="text-gray-300">
                Web4 treats trust as a continuous function modulated by real-time
                coherence, not a binary logged-in/logged-out state. This makes
                attacks exponentially harder.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                2. Four Dimensions, One Weak Link
              </h3>
              <p className="text-gray-300">
                Geometric mean ensures that <strong>one low dimension tanks everything</strong>. Attackers must fake coherence across spatial,
                temporal, capability, AND relational dimensions simultaneously -
                prohibitively expensive.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                3. Grounded in Physics
              </h3>
              <p className="text-gray-300">
                CI isn't arbitrary - it's grounded in coherence physics spanning 9
                domains from quantum to cosmological scales. Coherent systems
                follow smooth geodesics; incoherent systems exhibit discontinuities.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                4. Economic + Reputational Penalty
              </h3>
              <p className="text-gray-300">
                Low CI doesn't just limit trust - it increases ATP costs (up to
                10x) and witness requirements (up to +8). Incoherent behavior
                becomes economically unsustainable.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                5. Continuous, Not Discrete
              </h3>
              <p className="text-gray-300">
                CI is calculated at every grounding event (not just "login"), and
                modulates trust in real-time. Coherent behavior = full access.
                Incoherent behavior = immediate limitation.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/how-it-works">
              <div className="bg-gradient-to-br from-sky-950/30 to-sky-900/20 border border-sky-800/30 rounded-lg p-6 hover:border-sky-700/50 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-sky-400 mb-2">
                  How It Works
                </h3>
                <p className="text-sm text-gray-400">
                  See how CI integrates with LCT, ATP, and T3 to create complete
                  Web4 societies.
                </p>
              </div>
            </Link>

            <Link href="/lab-console">
              <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6 hover:border-green-700/50 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Lab Console
                </h3>
                <p className="text-sm text-gray-400">
                  Run simulations and see coherence, trust, and ATP interact in
                  real-time.
                </p>
              </div>
            </Link>

            <Link href="/identity-constellation">
              <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6 hover:border-blue-700/50 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">
                  Identity Constellations
                </h3>
                <p className="text-sm text-gray-400">
                  How multi-device identity strengthens CI and resists attacks.
                </p>
              </div>
            </Link>

            <Link
              href="https://github.com/dp-web4/web4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6 hover:border-purple-700/50 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  Reference Implementation
                </h3>
                <p className="text-sm text-gray-400">
                  Dive into the coherence.py and trust_tensors.py code on GitHub.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <RelatedConcepts currentPath="/coherence-index" />
      </div>
    </div>
  );
}
