"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import TermTooltip from "@/components/TermTooltip";
import { trackPageVisit, trackConceptInteraction } from "@/lib/exploration";

export default function CoherenceIndexPage() {
  useEffect(() => { trackPageVisit('coherence-index'); }, []);

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

  const [exploredScenarios, setExploredScenarios] = useState<Set<string>>(new Set());

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
        "Temporal coherence suffers from broken continuity chain and unusual activity pattern. Where was the device? Why no periodic check-in (grounding)?",
    },
    relationship_conflict: {
      name: "🔗 Relationship Conflict",
      description: "Device claims to work with entities it's never interacted with.",
      spatial: 1.0,
      capability: 1.0,
      temporal: 1.0,
      relational: 0.6,
      explanation:
        "Relational coherence fails because the device claims to work with entities it has no interaction history with. Trust relationships must be earned through witnessed interactions, not asserted.",
    },
  };

  // Recalculate derived values from the four CI dimensions
  const recalculate = (s: number, c: number, t: number, r: number) => {
    const ci = Math.pow(s * c * t * r, 1 / 4);
    setOverallCI(ci);
    setEffectiveTrust(baseTrust * Math.pow(ci, 2));
    let atpMult = 1.0;
    if (ci < 0.9) {
      atpMult = Math.min(1 / Math.pow(ci, 2), 10.0);
    }
    setAtpMultiplier(atpMult);
    setExtraWitnesses(ci < 0.8 ? Math.min(Math.ceil((0.8 - ci) * 10), 8) : 0);
  };

  // Update a single dimension via slider
  const updateDimension = (dim: 'spatial' | 'capability' | 'temporal' | 'relational', value: number) => {
    const s = dim === 'spatial' ? value : spatialCI;
    const c = dim === 'capability' ? value : capabilityCI;
    const t = dim === 'temporal' ? value : temporalCI;
    const r = dim === 'relational' ? value : relationalCI;
    if (dim === 'spatial') setSpatialCI(value);
    if (dim === 'capability') setCapabilityCI(value);
    if (dim === 'temporal') setTemporalCI(value);
    if (dim === 'relational') setRelationalCI(value);
    setScenario('baseline'); // clear preset highlight when manually adjusting
    recalculate(s, c, t, r);
  };

  const handleScenarioChange = (
    newScenario: keyof typeof scenarios
  ) => {
    trackConceptInteraction('coherence-index');
    setScenario(newScenario);
    const s = scenarios[newScenario];
    setSpatialCI(s.spatial);
    setCapabilityCI(s.capability);
    setTemporalCI(s.temporal);
    setRelationalCI(s.relational);
    recalculate(s.spatial, s.capability, s.temporal, s.relational);
    if (newScenario !== 'baseline') {
      setExploredScenarios(prev => new Set([...prev, newScenario]));
    }
  };

  // Compound damage calculation: what if ALL explored anomalies hit at once?
  const compoundDamage = (() => {
    const explored = [...exploredScenarios].filter(k => k !== 'baseline') as (keyof typeof scenarios)[];
    if (explored.length < 2) return null;
    // Take the WORST value for each dimension across all explored scenarios
    let worstSpatial = 1.0, worstCapability = 1.0, worstTemporal = 1.0, worstRelational = 1.0;
    for (const key of explored) {
      const s = scenarios[key];
      worstSpatial = Math.min(worstSpatial, s.spatial);
      worstCapability = Math.min(worstCapability, s.capability);
      worstTemporal = Math.min(worstTemporal, s.temporal);
      worstRelational = Math.min(worstRelational, s.relational);
    }
    const compoundCI = Math.pow(worstSpatial * worstCapability * worstTemporal * worstRelational, 1 / 4);
    const compoundTrust = baseTrust * Math.pow(compoundCI, 2);
    const compoundATPMult = compoundCI < 0.9 ? Math.min(1 / Math.pow(compoundCI, 2), 10.0) : 1.0;
    const compoundWitnesses = compoundCI < 0.8 ? Math.min(Math.ceil((0.8 - compoundCI) * 10), 8) : 0;

    // Single worst scenario for comparison
    let worstSingleCI = 1.0;
    let worstSingleKey = explored[0];
    for (const key of explored) {
      const s = scenarios[key];
      const ci = Math.pow(s.spatial * s.capability * s.temporal * s.relational, 1 / 4);
      if (ci < worstSingleCI) { worstSingleCI = ci; worstSingleKey = key; }
    }
    const singleTrust = baseTrust * Math.pow(worstSingleCI, 2);

    return {
      explored,
      worstSpatial, worstCapability, worstTemporal, worstRelational,
      compoundCI, compoundTrust, compoundATPMult, compoundWitnesses,
      worstSingleCI, worstSingleKey, singleTrust,
    };
  })();

  const resetAll = () => handleScenarioChange('baseline');

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
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            Think of CI as a <strong>behavioral consistency score</strong> &mdash; like a credit check
            that asks not just &ldquo;who are you?&rdquo; but &ldquo;does your behavior make physical sense?&rdquo;
          </p>
          <p className="text-base text-gray-400 leading-relaxed mb-6">
            CI measures four dimensions of consistency: where you are, what you can do,
            when you act, and who you interact with. One inconsistency drags the whole score down.
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
                        grounding (a periodic check-in where the device proves it&apos;s still the same device)
                        verifies spatial, temporal, capability, and
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

        {/* Protagonist Story */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            How It Works: Maria&apos;s Phone Gets Stolen
          </h2>

          <div className="bg-gradient-to-br from-amber-950/30 to-amber-900/20 border border-amber-800/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Maria lives in Madrid. Her phone is stolen at a caf&eacute;. Within 20 minutes,
              the thief tries to access Maria&apos;s Web4 account from the same city.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-green-900/20 border border-green-700/30 rounded p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Location</div>
                <div className="text-lg font-bold text-green-400">OK</div>
                <div className="text-xs text-gray-500">Same city</div>
              </div>
              <div className="bg-red-900/20 border border-red-700/30 rounded p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Temporal</div>
                <div className="text-lg font-bold text-red-400">FAIL</div>
                <div className="text-xs text-gray-500">Broken continuity</div>
              </div>
              <div className="bg-red-900/20 border border-red-700/30 rounded p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Relational</div>
                <div className="text-lg font-bold text-red-400">FAIL</div>
                <div className="text-xs text-gray-500">Wrong behavior patterns</div>
              </div>
              <div className="bg-green-900/20 border border-green-700/30 rounded p-3 text-center">
                <div className="text-xs text-gray-400 mb-1">Capability</div>
                <div className="text-lg font-bold text-green-400">OK</div>
                <div className="text-xs text-gray-500">Same device</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <strong>Result</strong>: Even though the thief has Maria&apos;s actual device in the
              same city, CI drops to <strong className="text-orange-400">0.55</strong> because temporal
              continuity is broken (device was powered off briefly) and relational patterns don&apos;t
              match (thief contacts different people, navigates unfamiliar apps). The society
              restricts access and demands extra verification.
            </p>
          </div>
          <p className="text-gray-400 text-sm mb-2">
            Traditional security would see valid credentials on the correct device in the right
            city &mdash; and grant full access. CI catches what passwords can&apos;t.
          </p>
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
                    • Claiming relationships with entities never interacted with
                  </li>
                  <li>• Contradictory operational states</li>
                  <li>• Relationship claims without witness validation</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Validates grounding against existing interaction history and
                witnessed relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Simulator Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Try It: Can You Stay Coherent?
          </h2>
          <p className="text-gray-400 mb-8">
            Drag the sliders to simulate incoherent behavior. Watch how even one
            compromised dimension tanks your effective trust, inflates your <Link href="/atp-economics" className="text-sky-400 hover:underline">ATP</Link> costs
            (ATP is the energy budget that powers every action),
            and demands extra witnesses. Try a preset scenario, then tweak individual dimensions.
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

            {/* Coherence Dimension Sliders */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  Coherence Dimensions
                </h3>
                <button
                  onClick={resetAll}
                  className="text-xs text-gray-400 hover:text-gray-200 border border-gray-600 rounded px-3 py-1 transition-colors"
                >
                  Reset All
                </button>
              </div>
              <div className="space-y-4">
                {([
                  { label: "Spatial", dim: "spatial" as const, value: spatialCI, hint: "Location consistency" },
                  { label: "Capability", dim: "capability" as const, value: capabilityCI, hint: "Hardware plausibility" },
                  { label: "Temporal", dim: "temporal" as const, value: temporalCI, hint: "Activity continuity" },
                  { label: "Relational", dim: "relational" as const, value: relationalCI, hint: "Relationship history" },
                ]).map(({ label, dim, value, hint }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{label} <span className="text-gray-500 text-xs">({hint})</span></span>
                      <span className={`font-mono font-semibold ${value >= 0.8 ? 'text-green-400' : value >= 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {value.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={1}
                      step={0.05}
                      value={value}
                      onChange={(e) => updateDimension(dim, parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ef4444 0%, #f59e0b 40%, #22c55e 80%, #22c55e 100%)`,
                        accentColor: value >= 0.8 ? '#22c55e' : value >= 0.5 ? '#f59e0b' : '#ef4444',
                      }}
                    />
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
                All four dimensions must be healthy — one failing dimension pulls your whole score down.
              </p>
            </div>

            {/* Threshold Warning */}
            {overallCI < 0.5 && (
              <div className="mb-6 p-4 bg-red-950/40 border-2 border-red-500 rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💀</span>
                  <div>
                    <div className="font-bold text-red-400">Locked Out &mdash; Behavior Too Incoherent</div>
                    <p className="text-sm text-gray-300">
                      CI below 0.5 means behavior is too inconsistent to be recognized as
                      legitimate. Actions are blocked. Trust is frozen. You need to
                      re-establish coherent behavior before the society will engage with you again.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      What if the system is wrong? Good question. Appeals and false-positive
                      recovery are an{' '}
                      <Link href="/threat-model#false-positives" className="text-red-300 underline hover:text-red-200">
                        open problem
                      </Link>{' '}
                      in the current design.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                  Base trust ({(baseTrust * 100).toFixed(0)}%) scaled by consistency
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
                  Lower CI = more witnesses required
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
                What&apos;s Happening?
              </h4>
              <p className="text-sm text-gray-300">
                {scenarios[scenario].explanation}
              </p>
              {overallCI < 1.0 && overallCI >= 0.5 && (
                <p className="text-xs text-gray-400 mt-2">
                  One weak dimension drags the whole score down.
                  Try dropping a second dimension — the compounding effect is dramatic.
                </p>
              )}
            </div>

            {/* Damage Report — appears after exploring 2+ anomaly scenarios */}
            {compoundDamage && (
              <div className="mt-6 bg-gradient-to-br from-red-950/30 to-orange-950/20 border border-red-800/40 rounded-lg p-5">
                <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wide">
                  Damage Report: {compoundDamage.explored.length} Anomalies Explored
                </h4>
                <p className="text-sm text-gray-400 mb-4">
                  What if an attacker triggered all {compoundDamage.explored.length} anomalies simultaneously?
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800/60 border border-gray-700 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">Worst single anomaly</div>
                    <div className="text-lg font-bold text-yellow-400">
                      CI {compoundDamage.worstSingleCI.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Trust: {(compoundDamage.singleTrust * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="bg-gray-800/60 border border-red-700/40 rounded p-3">
                    <div className="text-xs text-gray-500 mb-1">All {compoundDamage.explored.length} combined</div>
                    <div className="text-lg font-bold text-red-400">
                      CI {compoundDamage.compoundCI.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Trust: {(compoundDamage.compoundTrust * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 text-xs mb-3">
                  <span className="px-2 py-1 bg-red-950/50 border border-red-800/40 rounded text-red-400">
                    ATP: {compoundDamage.compoundATPMult.toFixed(1)}x cost
                  </span>
                  <span className="px-2 py-1 bg-orange-950/50 border border-orange-800/40 rounded text-orange-400">
                    +{compoundDamage.compoundWitnesses} extra witnesses
                  </span>
                  {compoundDamage.compoundCI < 0.5 && (
                    <span className="px-2 py-1 bg-red-950/70 border border-red-600/50 rounded text-red-300 font-semibold">
                      LOCKED OUT
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  {compoundDamage.compoundCI < compoundDamage.worstSingleCI * 0.8
                    ? `The geometric mean makes stacked anomalies exponentially worse — CI dropped ${((1 - compoundDamage.compoundCI / compoundDamage.worstSingleCI) * 100).toFixed(0)}% beyond the worst single anomaly.`
                    : 'Even modest anomalies compound. Try exploring more scenarios to see the full effect.'
                  }
                  {' '}This is why CI makes multi-vector attacks prohibitively expensive.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Why Geometric Mean Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">
            Why One Low Dimension Tanks Everything
          </h2>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3">
                  Security by Design
                </h3>
                <p className="text-gray-300 mb-3">
                  Web4 combines the four coherence dimensions so that
                  <strong> one weak dimension drags down the entire score</strong>.
                  This is a deliberate security choice:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      ❌ Simple Average (Insecure)
                    </h4>
                    <p className="text-sm text-gray-400 mb-2">
                      CI = (0.9 + 0.9 + 0.9 + 0.1) / 4 = <strong>0.7</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      One dimension at 0.1 gets &ldquo;averaged out&rdquo; by the others.
                      Attacker can ignore one dimension and still get decent CI.
                    </p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      ✅ Web4&apos;s Approach (Secure)
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

        {/* Connection to 9-Domain Coherence Physics — collapsed by default */}
        <section className="max-w-4xl mx-auto mb-16">
          <details className="group">
            <summary className="cursor-pointer list-none">
              <h2 className="text-3xl font-bold mb-6 text-gray-100 inline-flex items-center gap-3">
                Connection to Coherence Physics
                <span className="text-lg text-gray-500 group-open:rotate-90 transition-transform">&#9654;</span>
              </h2>
            </summary>
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
          </details>
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
                  Fake Identity Resistance
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
                Example: Fake-identity attack on a voting system. Attacker creates 50
                identities from same device. Spatial + capability coherence fails
                for 49 of them (all same location, same hardware fingerprint). CI
                drops below the trust threshold (0.5), identities rejected.
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
                  CI + Identity Constellations (<TermTooltip term="LCT">LCT</TermTooltip>)
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
                  CI + <TermTooltip term="ATP">ATP</TermTooltip> Economics
                </h3>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                <strong>How they work together</strong>: <TermTooltip term="ATP">ATP</TermTooltip> is
                the energy budget every agent has — every action costs some.
                Low CI increases those costs (up to 10x). This makes incoherent behavior economically
                expensive, not just trust-limited.
              </p>
              <p className="text-sm text-gray-400">
                Example: An attacker with stolen credentials (CI = 0.4) pays 6.25x
                more energy for every action. Their budget drains rapidly, making the
                attack unsustainable before it can do real damage.
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
                  CI + Trust Tensors (<TermTooltip term="T3">T3</TermTooltip>)
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

        {/* Technical Implementation Section — collapsed by default */}
        <section className="max-w-4xl mx-auto mb-16">
          <details>
          <summary className="text-3xl font-bold mb-6 text-gray-100 cursor-pointer list-none flex items-center gap-3">
            <span className="text-gray-500 text-lg">▶</span> Technical Implementation
          </summary>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 mb-6 mt-6">
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
                    {`// Pseudocode: how a grounding check works
grounding_event = {
  lct_id: device_lct,         // which device
  timestamp: now,              // when
  location: gps_coords,        // where
  capabilities: hardware_fingerprint,
  continuity_token: hash(previous_grounding),
  context: [recent_interactions] // who you've interacted with
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
          </details>
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
                The scoring ensures that <strong>one low dimension tanks everything</strong>. Attackers must fake coherence across spatial,
                temporal, capability, AND relational dimensions simultaneously —
                prohibitively expensive.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                3. Grounded in Real-World Patterns
              </h3>
              <p className="text-gray-300">
                CI isn&apos;t arbitrary — it&apos;s designed so that faking consistent behavior
                is always more expensive than genuinely having it. The design draws
                from how consistency works in biology and social systems.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                4. Economic + Reputational Penalty
              </h3>
              <p className="text-gray-300">
                Low CI doesn&apos;t just limit trust — it increases ATP costs (up to
                10x) and witness requirements (up to +8). Incoherent behavior
                becomes economically unsustainable.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                <strong>Why so harsh?</strong> Mild penalties (2x) would barely slow
                an attacker with stolen credentials. The 1/CI² formula means penalties
                escalate sharply only when coherence drops below ~0.5 — normal users
                with occasional inconsistencies (CI 0.8) pay just 1.6x, while a stolen
                account (CI 0.3) pays 11x. The severity is targeted at the threat, not
                at regular users.
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

            <Link href="/society-simulator">
              <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6 hover:border-green-700/50 transition-all cursor-pointer">
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  Society Simulator
                </h3>
                <p className="text-sm text-gray-400">
                  Run simulations and see coherence, trust, and energy interact in
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

        <ConceptSequenceNav currentPath="/coherence-index" />
        <RelatedConcepts currentPath="/coherence-index" />
      </div>
    </div>
  );
}
