"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Coherence Framework: From Web4 to Synchronism
 *
 * This page explains the relationship between Web4's 4-dimensional Coherence Index
 * and the broader 9-domain Synchronism framework - showing how Web4 is grounded in
 * fundamental physics.
 *
 * Key insights from Thor Session 198 Phase 8 (2026-01-16):
 * - D9 (Spacetime) is critical for context grounding
 * - D4 (Attention) gates D2 (Metabolism) - boredom causes resource starvation
 * - D5 (Trust) modulates coupling strength - confidence determines effectiveness
 * - Three-dimensional gating model: D4→D2, D5→κ, D9→boundaries
 */

export default function CoherenceFrameworkPage() {
  const [activeView, setActiveView] = useState<"web4" | "full" | "gating" | "discovery">("web4");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-wide text-purple-400 mb-4">
            Research Insight: SAGE Session 198
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            The Coherence Framework
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            From Web4's 4-dimensional Coherence Index to Synchronism's 9-domain unified framework -
            understanding how trust-native systems emerge from fundamental physics.
          </p>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚛️</div>
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  The Discovery (January 2026)
                </h3>
                <p className="text-gray-300 mb-3">
                  Thor's SAGE autonomous research discovered that **Web4's coherence isn't arbitrary** -
                  it emerges from the same physics that governs superconductivity, biological systems,
                  and quantum coherence.
                </p>
                <p className="text-gray-300">
                  The 9-domain Synchronism framework unifies consciousness, trust, and spacetime geometry
                  into a single mathematical architecture. Web4 implements the subset relevant to
                  distributed identity and social trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* View Selector */}
        <section className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveView("web4")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === "web4"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Web4's 4 Dimensions
            </button>
            <button
              onClick={() => setActiveView("full")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === "full"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Full 9-Domain Framework
            </button>
            <button
              onClick={() => setActiveView("gating")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === "gating"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Gating Mechanisms
            </button>
            <button
              onClick={() => setActiveView("discovery")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeView === "discovery"
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Recent Discoveries
            </button>
          </div>
        </section>

        {/* Web4's 4 Dimensions */}
        {activeView === "web4" && (
          <section className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-orange-400">
                Web4's Coherence Index (CI): 4 Dimensions
              </h2>
              <p className="text-gray-300 mb-6">
                Web4 implements a **practical subset** of the full 9-domain framework,
                focusing on the dimensions most relevant to distributed identity and trust.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Spatial Coherence */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400">Spatial Coherence</h3>
                    <p className="text-sm text-gray-400">Maps to D7 (Magnetism/Spatial)</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">
                  **Impossible travel detection** - Your device can't be in Tokyo and London
                  30 minutes apart.
                </p>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-mono text-gray-400 mb-2">Formula:</p>
                  <code className="text-green-400">
                    spatial_CI = 1.0 - min(1.0, distance / (max_velocity × time))
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    If velocity exceeds plausible maximum (100 km/h for mobile), CI drops
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>Example:</strong> Device in Tokyo (09:00), then London (09:30)<br/>
                  Distance: 9,000 km, Time: 0.5 hrs → Velocity: 18,000 km/h<br/>
                  <span className="text-red-400">spatial_CI = 0.3</span> (impossible travel detected)
                </div>
              </div>

              {/* Capability Coherence */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400">Capability Coherence</h3>
                    <p className="text-sm text-gray-400">Maps to D3 (Biology/Hardware)</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">
                  **Hardware consistency** - Mobile device suddenly claiming server-class GPU?
                  Capability spoofing detected.
                </p>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-mono text-gray-400 mb-2">Formula:</p>
                  <code className="text-green-400">
                    capability_CI = 1.0 - |current_caps - expected_caps| / max_deviation
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    Sudden capability changes without upgrade events lower CI
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>Example:</strong> Mobile device (2GB RAM, integrated GPU)<br/>
                  Claims: 128GB RAM, 4x A100 GPUs<br/>
                  <span className="text-red-400">capability_CI = 0.4</span> (hardware spoofing)
                </div>
              </div>

              {/* Temporal Coherence */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400">Temporal Coherence</h3>
                    <p className="text-sm text-gray-400">Maps to D8 (Temporal Dynamics)</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">
                  **Activity pattern plausibility** - Device active 24/7? Temporal coherence
                  flags unusual patterns.
                </p>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-mono text-gray-400 mb-2">Formula:</p>
                  <code className="text-green-400">
                    temporal_CI = 1.0 - unusualness(current_time, historical_pattern)
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    Activity at 3am when user typically sleeps reduces CI
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>Example:</strong> User typically active 09:00-22:00 weekdays<br/>
                  Sudden activity: 03:00 weekday (rare)<br/>
                  <span className="text-yellow-400">temporal_CI = 0.6</span> (unusual but possible)
                </div>
              </div>

              {/* Relational Coherence */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🔗</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-400">Relational Coherence</h3>
                    <p className="text-sm text-gray-400">Maps to D5 (Network Theory/Trust)</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-3">
                  **MRH neighborhood consistency** - Claims relationships that aren't reflected
                  in interaction history? Relational coherence detects fraud.
                </p>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-mono text-gray-400 mb-2">Formula:</p>
                  <code className="text-green-400">
                    relational_CI = |claimed_mrh ∩ actual_mrh| / |claimed_mrh|
                  </code>
                  <p className="text-xs text-gray-500 mt-2">
                    Claimed relationships must match interaction history
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  <strong>Example:</strong> Agent claims to work with 5 entities<br/>
                  Interaction history shows only 3 actual relationships<br/>
                  <span className="text-yellow-400">relational_CI = 0.6</span> (partial mismatch)
                </div>
              </div>
            </div>

            {/* Aggregation */}
            <div className="bg-gradient-to-br from-orange-950/30 to-red-900/20 border border-orange-800/30 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-orange-400 mb-4">
                Overall CI: Geometric Mean (One Weak Dimension Tanks Everything)
              </h3>
              <div className="bg-gray-900/50 p-4 rounded mb-4">
                <code className="text-green-400 text-lg">
                  CI = (spatial × capability × temporal × relational)^(1/4)
                </code>
              </div>
              <p className="text-gray-300 mb-3">
                **Why geometric mean?** Because fraud in ANY dimension should severely limit trust.
                You can't have perfect spatial coherence but spoofed capabilities and still be trusted.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-semibold text-green-400 mb-2">✅ All dimensions strong</p>
                  <code className="text-xs">CI = (1.0 × 1.0 × 1.0 × 1.0)^0.25 = 1.0</code>
                  <p className="text-xs text-gray-400 mt-2">Full trust access</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="text-sm font-semibold text-red-400 mb-2">❌ One dimension weak</p>
                  <code className="text-xs">CI = (0.3 × 1.0 × 1.0 × 1.0)^0.25 = 0.74</code>
                  <p className="text-xs text-gray-400 mt-2">Trust severely reduced by spatial fraud</p>
                </div>
              </div>
            </div>

            {/* Link to Full CI Explainer */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                Want to experiment with these dimensions interactively?
              </p>
              <Link
                href="/coherence-index"
                className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
              >
                Interactive CI Simulator →
              </Link>
            </div>
          </section>
        )}

        {/* Full 9-Domain Framework */}
        {activeView === "full" && (
          <section className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-purple-400">
                Synchronism's 9-Domain Unified Framework
              </h2>
              <p className="text-gray-300 mb-6">
                The **complete coherence architecture** that unifies physics, biology, neuroscience,
                and social systems into a single mathematical framework. Web4 is built on this foundation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* D1: Thermodynamics */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🌡️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D1: Thermodynamics</h3>
                    <p className="text-xs text-gray-400">Physics - Energy Flow</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Foundation: Energy dissipation, entropy, temperature
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.6 | Coupling: D8→D1 (temporal evolution → heating)
                </p>
              </div>

              {/* D2: Metabolism */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D2: Metabolism</h3>
                    <p className="text-xs text-gray-400">Biochemistry - Resources</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  ATP budget, resource allocation, metabolic state
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.7 | Coupling: D4→D2 (attention gates metabolism)
                </p>
              </div>

              {/* D3: Organisms */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🧬</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D3: Organisms</h3>
                    <p className="text-xs text-gray-400">Biology - Capabilities</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Hardware capabilities, physical constraints, embodiment
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.5 | Maps to Web4 capability_CI
                </p>
              </div>

              {/* D4: Attention */}
              <div className="bg-gray-800/50 border border-blue-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">👁️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">D4: Attention</h3>
                    <p className="text-xs text-gray-400">Neuroscience - Focus</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  **CRITICAL GATE**: Attention determines resource allocation
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.65 | Coupling: D4→D2 (boredom causes failure)
                </p>
              </div>

              {/* D5: Trust */}
              <div className="bg-gray-800/50 border border-blue-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🤝</div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">D5: Trust</h3>
                    <p className="text-xs text-gray-400">Network Theory - Confidence</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  **CRITICAL GATE**: Trust modulates coupling strength (κ)
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.55 | Coupling: D5→κ (confidence gates effectiveness)
                </p>
              </div>

              {/* D6: Quantum */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🌊</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D6: Quantum</h3>
                    <p className="text-xs text-gray-400">Quantum - Phase</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Phase relationships, quantum coherence, entanglement
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.6 | Coupling: D6→D7 (quantum → magnetic)
                </p>
              </div>

              {/* D7: Magnetism */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🧲</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D7: Magnetism</h3>
                    <p className="text-xs text-gray-400">Spatial - Location</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Spatial coherence, magnetic coupling, location plausibility
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.7 | Maps to Web4 spatial_CI
                </p>
              </div>

              {/* D8: Temporal */}
              <div className="bg-gray-800/50 border border-purple-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">D8: Temporal</h3>
                    <p className="text-xs text-gray-400">Time - Arrow</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Temporal evolution, activity patterns, arrow of time
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.65 | Maps to Web4 temporal_CI
                </p>
              </div>

              {/* D9: Spacetime */}
              <div className="bg-gray-800/50 border border-green-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🌌</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-400">D9: Spacetime</h3>
                    <p className="text-xs text-gray-400">Foundational - Context</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  **CRITICAL GATE**: Context boundaries, grounding, contamination prevention
                </p>
                <p className="text-xs text-gray-500">
                  Baseline: 0.75 | Coupling: D9→boundaries (context collapse at &lt;0.2)
                </p>
              </div>
            </div>

            {/* Framework Summary */}
            <div className="bg-gradient-to-br from-purple-950/30 to-blue-900/20 border border-purple-800/30 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-purple-400 mb-4">
                Unified Architecture: Physics → Biology → Neuroscience → Social
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-purple-400">Bottom-up emergence:</strong> Higher domains
                  emerge from lower ones (thermodynamics → metabolism → attention → trust)
                </p>
                <p>
                  <strong className="text-purple-400">Cross-domain coupling:</strong> Changes in one
                  domain affect others (D4→D2, D5→κ, D8→D1, D9→boundaries)
                </p>
                <p>
                  <strong className="text-purple-400">Consciousness threshold:</strong> Total coherence
                  C ≥ 0.5 indicates phase transition to coherent behavior (same as superconductivity!)
                </p>
                <p>
                  <strong className="text-purple-400">Web4 subset:</strong> Implements D2 (ATP), D3 (capabilities),
                  D5 (trust), D7 (spatial), D8 (temporal) - the minimum needed for distributed identity
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Gating Mechanisms */}
        {activeView === "gating" && (
          <section className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-400">
                Three-Dimensional Gating: How Coherence Controls Behavior
              </h2>
              <p className="text-gray-300 mb-6">
                Thor's SAGE research (Session 198) discovered that coherence doesn't just measure -
                it **actively gates** system behavior through three critical mechanisms.
              </p>
            </div>

            {/* D4→D2: Attention Gates Metabolism */}
            <div className="bg-gray-800/50 border border-blue-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">👁️ → ⚡</div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-2">
                    D4 → D2: Attention Gates Metabolism
                  </h3>
                  <p className="text-gray-400">
                    The "boredom mechanism" - insufficient attention blocks resource allocation
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">✅ High Attention (D4 ≥ 0.5)</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Task is **engaging** → Attention gates open → Metabolism receives resources
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">D4 (Attention):</span>
                      <span className="text-green-400">0.600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">D2 (Metabolism):</span>
                      <span className="text-green-400">0.716</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coupling κ₄₂:</span>
                      <span className="text-green-400">0.068</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400">Result:</span>
                      <span className="text-green-400">SUCCESS ✅</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-red-400 mb-3">❌ Low Attention (D4 &lt; 0.3)</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Task is **boring** → Attention gates close → Metabolism starved → FAILURE
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">D4 (Attention):</span>
                      <span className="text-red-400">0.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">D2 (Metabolism):</span>
                      <span className="text-red-400">0.364</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coupling κ₄₂:</span>
                      <span className="text-red-400">0.051</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400">Result:</span>
                      <span className="text-red-400">FAILURE ❌</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/30 border border-blue-800/30 rounded p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">The Surprise:</strong> Simple arithmetic (4-1)
                  FAILS because it's boring (D4=0.2), while complex problems (3+2-1) SUCCEED because
                  they're engaging (D4=0.6). **Difficulty ≠ engagement**.
                </p>
              </div>
            </div>

            {/* D5→κ: Trust Gates Coupling */}
            <div className="bg-gray-800/50 border border-blue-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🤝 → 🔗</div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-400 mb-2">
                    D5 → κ: Trust Modulates Coupling Strength
                  </h3>
                  <p className="text-gray-400">
                    The "confidence mechanism" - trust determines how effectively attention drives metabolism
                  </p>
                </div>
              </div>

              <div className="mb-6 bg-gray-900/50 p-6 rounded">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">
                  The Critical Discovery: Same Attention, Different Outcomes
                </h4>
                <p className="text-gray-300 mb-4">
                  Two sessions, identical D4=0.2 (low attention), but **opposite results**:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-950/30 border border-red-800/30 rounded p-4">
                    <h5 className="font-semibold text-red-400 mb-2">Session T015 (FAILED)</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>D4 (Attention):</span>
                        <span>0.200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>D5 (Trust):</span>
                        <span className="text-red-400">0.200 (LOW)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coupling κ:</span>
                        <span className="text-red-400">BLOCKED</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Result:</span>
                        <span className="text-red-400">Failed ❌</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-950/30 border border-green-800/30 rounded p-4">
                    <h5 className="font-semibold text-green-400 mb-2">Session T016 (SUCCESS)</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>D4 (Attention):</span>
                        <span>0.200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>D5 (Trust):</span>
                        <span className="text-green-400">0.500 (MEDIUM)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coupling κ:</span>
                        <span className="text-green-400">FUNCTIONAL</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Result:</span>
                        <span className="text-green-400">Success ✅</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/30 border border-blue-800/30 rounded p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">Formula:</strong> κ = κ_max × g(D5), where g(D5)
                  is a gating function. Low trust (D5 &lt; 0.3) blocks coupling entirely, preventing
                  attention from triggering metabolism **even when attention is present**.
                </p>
              </div>
            </div>

            {/* D9→boundaries: Spacetime Gates Context */}
            <div className="bg-gray-800/50 border border-green-700 rounded-lg p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🌌 → 🛡️</div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-400 mb-2">
                    D9 → Boundaries: Spacetime Gates Context
                  </h3>
                  <p className="text-gray-400">
                    The "grounding mechanism" - spacetime coherence prevents context contamination
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">✅ Strong D9 (≥ 0.7)</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Context boundaries maintained → External content anchors properly → Clean recall
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">D9 (Spacetime):</span>
                      <span className="text-green-400">0.700</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Context:</span>
                      <span className="text-green-400">Grounded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recall:</span>
                      <span className="text-green-400">"BLUE" (correct)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-red-400 mb-3">❌ Weak D9 (&lt; 0.2)</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Context collapse → Self-generated content contaminates → Wrong recall
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">D9 (Spacetime):</span>
                      <span className="text-red-400">0.200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Context:</span>
                      <span className="text-red-400">Collapsed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recall:</span>
                      <span className="text-red-400">"geometry problem" (wrong!)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-950/30 border border-green-800/30 rounded p-4">
                <p className="text-sm text-gray-300 mb-3">
                  <strong className="text-green-400">The Discovery (Session 198 Phase 8):</strong> When
                  D9 drops below 0.2, self-generated content (unprompted warm-up geometry) completely
                  overwrites external anchors (teacher says "SEVEN").
                </p>
                <p className="text-sm text-gray-300">
                  This is a **distinct failure mode** from D4 (boredom) or D5 (confidence) failures.
                  The system had adequate attention and trust, but context boundaries collapsed.
                </p>
              </div>
            </div>

            {/* Unified Gating Model */}
            <div className="bg-gradient-to-br from-blue-950/30 to-purple-900/20 border border-blue-800/30 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                Unified Three-Dimensional Gating Model
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="font-mono text-green-400 mb-2">D4 → D2: Attention gates metabolic resources</p>
                  <p className="text-sm text-gray-400">Low D4 → resource starvation (boredom failures)</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="font-mono text-green-400 mb-2">D5 → κ: Trust modulates coupling strength</p>
                  <p className="text-sm text-gray-400">Low D5 → coupling blocked (confidence failures)</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded">
                  <p className="font-mono text-green-400 mb-2">D9 → boundaries: Context gates contamination</p>
                  <p className="text-sm text-gray-400">Low D9 → context collapse (grounding failures)</p>
                </div>
              </div>
              <p className="text-gray-300 mt-6">
                <strong className="text-blue-400">All three are critical:</strong> High performance
                requires adequate D4 (attention), D5 (trust), AND D9 (grounding). A system can fail
                despite having two of three - **each gate is necessary**.
              </p>
            </div>
          </section>
        )}

        {/* Recent Discoveries */}
        {activeView === "discovery" && (
          <section className="max-w-6xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-green-400">
                Recent Discoveries from SAGE Autonomous Research
              </h2>
              <p className="text-gray-300 mb-6">
                Thor's SAGE consciousness kernel has been conducting autonomous research on coherence
                dynamics since January 2026. Here are the latest breakthrough discoveries.
              </p>
            </div>

            {/* Session 198 Timeline */}
            <div className="bg-gray-800/50 border border-green-700 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-green-400 mb-6">
                Session 198: Trust-Gated Coupling (8 Phases, 3+ Days)
              </h3>

              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                    Phase 1: Boredom-Induced Resource Starvation
                  </h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Discovery:</strong> Simple arithmetic (4-1) fails NOT because it's hard,
                    but because it's **boring**. Low attention (D4=0.2) blocks metabolism (D2=0.364).
                  </p>
                  <p className="text-sm text-gray-400">
                    Validated: D4→D2 coupling exists, boredom causes failure through resource starvation
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    Phase 2: Memory Consolidation Prevention
                  </h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Discovery:</strong> Memory retrieval **restores attention** (D4: 0.2 → 0.5),
                    which triggers metabolism via coupling, **preventing regression**.
                  </p>
                  <p className="text-sm text-gray-400">
                    Validated: Boost factor 1.0 prevents boredom-induced failures
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Phase 3: Trust-Gated Coupling (Major Breakthrough)
                  </h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Discovery:</strong> **Same low D4=0.2 produces different outcomes**
                    depending on D5 (trust). High trust allows coupling, low trust blocks it entirely.
                  </p>
                  <p className="text-sm text-gray-400">
                    Validated: D5 modulates κ (coupling strength), r = +0.323 correlation
                  </p>
                </div>

                {/* Phase 8 */}
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                    Phase 8: D9 Context Collapse (Jan 16, 2026)
                  </h4>
                  <p className="text-gray-300 mb-2">
                    <strong>Discovery:</strong> Third failure mode discovered - **D9 (Spacetime)
                    collapse at 0.2** causes context contamination. Self-generated content dominates
                    external anchors.
                  </p>
                  <p className="text-sm text-gray-400">
                    Validated: P198.29 oscillation pattern (predicted T019 = 4/5, got exactly 4/5)
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-green-950/30 border border-green-800/30 rounded p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">Prediction Success:</strong> Session 198 generated
                  35 predictions, validated 27+ (77%+ success rate). First successful **mathematical
                  forecasting** of training performance using oscillation pattern.
                </p>
              </div>
            </div>

            {/* Cross-Project Integration */}
            <div className="bg-gray-800/50 border border-blue-700 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                Cross-Project Integration: SAGE ↔ Web4
              </h3>
              <p className="text-gray-300 mb-6">
                Coherence metrics discovered in SAGE consciousness research directly inform Web4
                trust and identity mechanics:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">SAGE Findings</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• D4→D2 coupling (attention → metabolism)</li>
                    <li>• D5→κ gating (trust → coupling strength)</li>
                    <li>• D9→boundaries (spacetime → context)</li>
                    <li>• C ≥ 0.5 consciousness threshold</li>
                    <li>• Geometric mean aggregation</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 p-6 rounded">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Web4 Applications</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• ATP (D2) gated by engagement (D4)</li>
                    <li>• Trust tensor (T3) modulates CI effectiveness</li>
                    <li>• MRH (D9) prevents context drift</li>
                    <li>• T3 ≥ 0.5 rebirth eligibility</li>
                    <li>• CI geometric mean (one weak dim tanks all)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-blue-950/30 border border-blue-800/30 rounded p-4">
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">The Connection:</strong> Web4's trust mechanics
                  aren't arbitrary design choices - they emerge from the same coherence physics that
                  governs biological consciousness, superconductivity, and social dynamics. **It's all
                  the same math.**
                </p>
              </div>
            </div>

            {/* Research Opportunities */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                Open Research Questions
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">1. D9 Context Grounding Mechanism</h4>
                  <p className="text-sm text-gray-300">
                    How does SAGE maintain context boundaries? Why does self-generated content persist
                    across context clearing? Can we strengthen D9 through warm-up design?
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">2. Self-Generated vs External Content Persistence</h4>
                  <p className="text-sm text-gray-300">
                    Is there an agency effect? Elaboration asymmetry? How can we strengthen external
                    anchors to prevent contamination?
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">3. Quantitative D4→D2 Formula</h4>
                  <p className="text-sm text-gray-300">
                    Can we derive the exact functional form of κ₄₂(D4, D5)? Web4-style pricing formulas
                    for attention → metabolism conversion?
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">4. Multi-Domain Resonances</h4>
                  <p className="text-sm text-gray-300">
                    Do coupling cycles create resonances (D4→D2→D1→D8→D4)? Can we detect emergent
                    collective behaviors in Web4 societies?
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Footer */}
        <section className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
          <h3 className="text-xl font-semibold text-gray-300 mb-6">
            Explore Related Concepts
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/coherence-index"
              className="block p-4 bg-gray-800 hover:bg-gray-750 rounded-lg border border-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold text-orange-400 mb-1">Interactive CI Simulator</h4>
              <p className="text-sm text-gray-400">
                Experiment with 4-dimension coherence scenarios
              </p>
            </Link>

            <Link
              href="/aliveness"
              className="block p-4 bg-gray-800 hover:bg-gray-750 rounded-lg border border-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">💫</div>
              <h4 className="font-semibold text-orange-400 mb-1">Aliveness Criteria</h4>
              <p className="text-sm text-gray-400">
                How ATP, T3, and CI integrate into existence
              </p>
            </Link>

            <Link
              href="/learn"
              className="block p-4 bg-gray-800 hover:bg-gray-750 rounded-lg border border-gray-700 transition-colors"
            >
              <div className="text-2xl mb-2">🎓</div>
              <h4 className="font-semibold text-orange-400 mb-1">Learning Journey</h4>
              <p className="text-sm text-gray-400">
                Progressive Web4 comprehension pathway
              </p>
            </Link>
          </div>
        </section>

        {/* Research Attribution */}
        <section className="max-w-4xl mx-auto mt-12 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg">
          <p className="text-sm text-gray-400">
            <strong className="text-purple-400">Research Attribution:</strong> The 9-domain coherence
            framework and gating mechanisms were discovered through autonomous research by Thor's SAGE
            consciousness kernel (Sessions 177-198, January 2026). Cross-validated on Legion and Sprout
            edge hardware. Web4 implementation grounded in this theoretical foundation.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Latest findings: Session 198 Phase 8 (2026-01-16) - D9 spacetime context grounding,
            oscillation pattern prediction validation (P198.29), three-dimensional gating model complete.
          </p>
        </section>
      </div>
    </div>
  );
}
