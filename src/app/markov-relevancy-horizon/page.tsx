"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";

export default function MarkovRelevancyHorizonPage() {
  // Simulator state
  const [selectedEntity, setSelectedEntity] = useState<"alice" | "bob" | "charlie">("alice");
  const [horizonDepth, setHorizonDepth] = useState<1 | 2 | 3>(2);
  const [showRelationTypes, setShowRelationTypes] = useState(true);

  // Entity relationship data
  const entities = {
    alice: {
      name: "Alice",
      color: "blue",
      direct: ["bob", "timeserver", "hospital"],
      depth2: ["charlie", "doctor", "pharmacy"],
      depth3: ["insurance", "lab", "specialist"],
    },
    bob: {
      name: "Bob",
      color: "green",
      direct: ["alice", "charlie", "company"],
      depth2: ["timeserver", "hospital", "bank"],
      depth3: ["payroll", "hr", "dentist"],
    },
    charlie: {
      name: "Charlie",
      color: "purple",
      direct: ["bob", "bank", "grocery"],
      depth2: ["alice", "company", "pharmacy"],
      depth3: ["timeserver", "hospital", "supplier"],
    },
  };

  const relationshipTypes = {
    bound: {
      icon: "🔗",
      name: "Bound",
      description: "Permanent hardware/identity binding",
      examples: ["Device to owner", "Parent to child identity"],
    },
    paired: {
      icon: "🤝",
      name: "Paired",
      description: "Authorized operational pairing",
      examples: ["Energy management", "Data exchange", "Service provision"],
    },
    witnessed: {
      icon: "👁️",
      name: "Witnessed",
      description: "Attestation and validation",
      examples: ["Time server", "Audit witness", "Oracle data"],
    },
  };

  const getVisibleEntities = () => {
    const entity = entities[selectedEntity];
    const visible = new Set<string>([selectedEntity]);

    // Add direct relationships (depth 1)
    if (horizonDepth >= 1) {
      entity.direct.forEach(e => visible.add(e));
    }

    // Add second-degree relationships (depth 2)
    if (horizonDepth >= 2) {
      entity.depth2.forEach(e => visible.add(e));
    }

    // Add third-degree relationships (depth 3)
    if (horizonDepth >= 3) {
      entity.depth3.forEach(e => visible.add(e));
    }

    return Array.from(visible);
  };

  const visibleCount = getVisibleEntities().length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <Breadcrumbs currentPath="/markov-relevancy-horizon" />
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-wide text-cyan-400 mb-4">
            Web4 Foundation: Context
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Markov Relevancy Horizon (MRH)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            How Web4 creates context boundaries through relationships - you see what&apos;s relevant, nothing more.
          </p>

          <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border border-cyan-800/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🌐</div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                  The Key Insight
                </h3>
                <p className="text-gray-300 mb-3">
                  <strong>Traditional systems</strong>: Either everyone sees everything (overwhelming) or strict access control (fragmented)
                </p>
                <p className="text-gray-300">
                  <strong>Web4 MRH</strong>: Context emerges from relationships (you see your connections, their connections, and their connections - nothing more)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            The Problem: Context Isn&apos;t Global
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-3">
                ❌ Traditional Web: Global Visibility or Nothing
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Social media</strong>: Everyone sees everything (or algorithmic black box decides)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Access control lists</strong>: Rigid permissions, manually managed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Result</strong>: Information overload OR fragmentation, no emergent context</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                ✅ Web4 MRH: Context Through Relationships
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Automatic boundaries</strong>: You see what&apos;s relevant to your relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Fractal composition</strong>: Same principle scales from personal to planetary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span><strong>Result</strong>: Right amount of context, emergent relevance, no overload</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* "Isn't this just a social graph?" Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Wait — Isn&apos;t This Just a Social Graph?
          </h2>

          <p className="text-gray-300 mb-6">
            Fair question. MRH looks like a social graph at first glance — nodes and edges, friends of friends. But the similarities are surface-level. Here&apos;s what&apos;s actually different:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 border border-red-500/20 rounded-lg p-4">
              <div className="text-sm font-semibold text-red-400 mb-2">Social Graph (Facebook, LinkedIn)</div>
              <ul className="text-sm text-gray-400 space-y-1.5">
                <li>One flat &quot;friends&quot; list for all contexts</li>
                <li>Edges are binary: connected or not</li>
                <li>Algorithm decides what you see</li>
                <li>No boundary — the platform sees everything</li>
                <li>Free to traverse (spam is free)</li>
                <li>You are the product</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-sm font-semibold text-cyan-400 mb-2">MRH (Web4)</div>
              <ul className="text-sm text-gray-300 space-y-1.5">
                <li>Separate graph per role (you-as-doctor ≠ you-as-neighbor)</li>
                <li>Edges carry trust scores across 3 dimensions</li>
                <li>Your relationships define what you see — no algorithm</li>
                <li>Hard 3-hop boundary — beyond it, you don&apos;t exist to them</li>
                <li>Crossing boundaries costs ATP (spam costs real energy)</li>
                <li>You own your graph — it lives on your device</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 text-sm text-gray-300">
            <strong className="text-cyan-400">The shortest version</strong>: A social graph says &quot;Alice knows Bob.&quot;
            MRH says &quot;Alice trusts Bob 0.85 as a surgeon, based on 47 witnessed interactions, and that trust decays
            to 0.62 for anyone one hop further out.&quot; It&apos;s the difference between a phone contact list and a
            relationship with history, context, and consequences.
          </div>
        </section>

        {/* How MRH Works Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            How MRH Works: Relationship Graphs
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8">
            <p className="text-gray-300 mb-4">
              Your MRH is an <strong className="text-cyan-400">RDF graph</strong> - a network of entities and their relationships.
              Each entity you interact with creates a <strong className="text-cyan-400">relationship edge</strong> in the graph.
              Context emerges from <strong className="text-cyan-400">who you&apos;re connected to</strong>, not from abstract metrics.
            </p>
            <p className="text-gray-300">
              The <strong className="text-cyan-400">&quot;Markov&quot; property</strong>: Beyond depth 3 (you → connections → their connections → third degree),
              entities become irrelevant. This maintains local focus and computational efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(relationshipTypes).map(([key, rel]) => (
              <div key={key} className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
                <div className="text-3xl mb-3">{rel.icon}</div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">{rel.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{rel.description}</p>
                <div className="text-xs text-gray-400">
                  <div className="font-semibold mb-1">Examples:</div>
                  <ul className="space-y-1">
                    {rel.examples.map((ex, i) => (
                      <li key={i}>• {ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive MRH Simulator */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Interactive MRH Explorer
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-8">
            {/* Entity Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
                Select Entity:
              </label>
              <div className="flex gap-3">
                {(["alice", "bob", "charlie"] as const).map((entity) => (
                  <button
                    key={entity}
                    onClick={() => setSelectedEntity(entity)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedEntity === entity
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {entities[entity].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizon Depth Control */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-cyan-400 mb-3">
                Horizon Depth:
              </label>
              <div className="flex gap-3">
                {([1, 2, 3] as const).map((depth) => (
                  <button
                    key={depth}
                    onClick={() => setHorizonDepth(depth)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      horizonDepth === depth
                        ? "bg-cyan-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Depth {depth}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {horizonDepth === 1 && "Direct relationships only (you and your immediate connections)"}
                {horizonDepth === 2 && "You + connections + their connections (default)"}
                {horizonDepth === 3 && "Maximum depth: three degrees of separation"}
              </p>
            </div>

            {/* Relationship Type Toggle */}
            <div className="mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRelationTypes}
                  onChange={(e) => setShowRelationTypes(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Show relationship types</span>
              </label>
            </div>

            {/* Visualization Area */}
            <div className="bg-gray-900/50 rounded-lg p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">
                  {selectedEntity === "alice" && "👩‍⚕️"}
                  {selectedEntity === "bob" && "👨‍💼"}
                  {selectedEntity === "charlie" && "👨‍🔧"}
                </div>
                <div className="text-xl font-semibold text-cyan-400">
                  {entities[selectedEntity].name}&apos;s MRH
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Visible entities: {visibleCount} / {3 + 3 + 3 + 3} total
                </div>
              </div>

              {/* Depth visualization */}
              <div className="space-y-4">
                {horizonDepth >= 1 && (
                  <div className="border border-cyan-700/50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-cyan-400 mb-2">
                      Depth 1: Direct Relationships ({entities[selectedEntity].direct.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entities[selectedEntity].direct.map((e) => (
                        <span
                          key={e}
                          className="px-3 py-1 bg-cyan-600/20 border border-cyan-500/30 rounded text-sm"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {horizonDepth >= 2 && (
                  <div className="border border-cyan-700/30 rounded-lg p-4">
                    <div className="text-sm font-semibold text-cyan-300 mb-2">
                      Depth 2: Friends of Friends ({entities[selectedEntity].depth2.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entities[selectedEntity].depth2.map((e) => (
                        <span
                          key={e}
                          className="px-3 py-1 bg-cyan-600/10 border border-cyan-500/20 rounded text-sm text-gray-300"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {horizonDepth >= 3 && (
                  <div className="border border-cyan-700/20 rounded-lg p-4">
                    <div className="text-sm font-semibold text-cyan-200 mb-2">
                      Depth 3: Third Degree ({entities[selectedEntity].depth3.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entities[selectedEntity].depth3.map((e) => (
                        <span
                          key={e}
                          className="px-3 py-1 bg-cyan-600/5 border border-cyan-500/10 rounded text-sm text-gray-400"
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Context explanation */}
              <div className="mt-6 bg-gray-800/50 rounded-lg p-4 text-sm text-gray-300">
                <div className="font-semibold text-cyan-400 mb-2">Context Scope:</div>
                {horizonDepth === 1 && (
                  <p>
                    At depth 1, {entities[selectedEntity].name} only sees immediate relationships.
                    This is extremely local context - suitable for privacy-sensitive operations.
                  </p>
                )}
                {horizonDepth === 2 && (
                  <p>
                    At depth 2 (default), {entities[selectedEntity].name} sees friends and friends-of-friends.
                    This creates rich context while maintaining computational efficiency and privacy boundaries.
                  </p>
                )}
                {horizonDepth === 3 && (
                  <p>
                    At depth 3 (maximum), {entities[selectedEntity].name} sees three degrees of separation.
                    Beyond this, the Markov property means entities become irrelevant to decision-making.
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{visibleCount}</div>
                <div className="text-sm text-gray-400">Entities in MRH</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{horizonDepth}</div>
                <div className="text-sm text-gray-400">Horizon Depth</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {((visibleCount / 12) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-400">Network Visibility</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Markov Property Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Why &quot;Markov&quot;? The Horizon Boundary
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              In probability theory, a <strong className="text-cyan-400">Markov property</strong> means
              the future depends only on the present state, not the full history.
              In Web4, the <strong className="text-cyan-400">Markov Relevancy Horizon</strong> means
              your decisions depend only on entities within your horizon, not the entire network.
            </p>
            <p className="text-gray-300">
              <strong className="text-cyan-400">Key principle</strong>: Beyond depth 3, relationships
              become statistically irrelevant to your trust decisions. This isn&apos;t arbitrary -
              it&apos;s based on small-world network properties and information theory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Computational Efficiency
              </h3>
              <p className="text-gray-300 text-sm">
                Limiting horizon depth means trust calculations scale O(d³) where d is depth,
                not O(n) where n is total network size. A billion-entity Web4 network remains
                computationally tractable because each entity only considers ~1000 relationships.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Privacy Preservation
              </h3>
              <p className="text-gray-300 text-sm">
                MRH boundaries naturally create privacy zones. Entities outside your horizon
                can&apos;t see your relationships, and you can&apos;t see theirs. No global visibility
                needed for trust to emerge - only local relationship graphs.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Fractal Composition
              </h3>
              <p className="text-gray-300 text-sm">
                The same MRH principle works at every scale: personal relationships,
                team dynamics, organizational structure, ecosystem collaborations,
                planetary governance. Context boundaries compose fractally.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Emergent Context
              </h3>
              <p className="text-gray-300 text-sm">
                Context isn&apos;t specified centrally - it emerges from relationship patterns.
                High-trust clusters form naturally. Information flows through trust paths.
                No algorithm decides what&apos;s relevant - your relationships do.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Propagation Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Trust Propagation Through MRH
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Trust doesn&apos;t exist in isolation - it <strong className="text-cyan-400">propagates through relationship graphs</strong>.
              If you trust Alice and Alice trusts Bob, you have <em>some</em> basis to trust Bob,
              but weaker than direct experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Multiplicative Decay
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Trust along a path decays multiplicatively:
              </p>
              <div className="bg-gray-900/50 rounded px-3 py-2 text-sm font-mono text-cyan-300 mb-3">
                trust = t₁ × t₂ × t₃ × decay^depth
              </div>
              <p className="text-gray-400 text-xs">
                A path with three 0.9 trust edges: 0.9³ = 0.73 effective trust
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Multiple Paths
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Multiple trust paths combine probabilistically:
              </p>
              <div className="bg-gray-900/50 rounded px-3 py-2 text-sm font-mono text-cyan-300 mb-3">
                combined = 1 - ∏(1 - pathᵢ)
              </div>
              <p className="text-gray-400 text-xs">
                Two independent 0.7 trust paths: 1 - (0.3 × 0.3) = 0.91 combined
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Graph Patterns
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Trust emerges from graph structure:
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• High in-degree → Reliable</li>
                <li>• Stable pairings → Operational trust</li>
                <li>• Binding clusters → Institutional trust</li>
                <li>• Central position → Network authority</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Role-Based Context Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Role-Based MRH: Context Is Specific
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            <p className="text-gray-300 mb-4">
              Critical principle: <strong className="text-cyan-400">MRH relationships are role-specific</strong>.
              You don&apos;t just have a relationship with Alice - you have a relationship with
              <em> Alice-as-surgeon</em> and a separate relationship with <em>Alice-as-researcher</em>.
            </p>
            <p className="text-gray-300">
              This means your MRH changes based on <strong className="text-cyan-400">what you&apos;re doing</strong>.
              When seeking medical advice, you see medical relationships. When collaborating on research,
              you see research relationships.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              Example: Alice&apos;s Role-Specific MRH
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-cyan-300 mb-2">
                  As Surgeon 👩‍⚕️
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-sm text-gray-300 space-y-1">
                  <div>🔗 Hospital (bound)</div>
                  <div>🤝 Surgical team (paired)</div>
                  <div>👁️ Medical board (witnessed)</div>
                  <div className="text-cyan-400 text-xs pt-2">
                    T3 trust: 0.95 (high surgical competence)
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-cyan-300 mb-2">
                  As Car Owner 🚗
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-sm text-gray-300 space-y-1">
                  <div>🔗 Vehicle (bound)</div>
                  <div>🤝 Garage (paired)</div>
                  <div>👁️ DMV (witnessed)</div>
                  <div className="text-red-400 text-xs pt-2">
                    T3 trust: 0.20 (low mechanical competence)
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Same person, different contexts, completely different MRH graphs and trust scores.
              This prevents inappropriate trust transfer across domains.
            </p>
          </div>
        </section>

        {/* Real-World Applications Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Real-World Applications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Social Networks Without Algorithms
              </h3>
              <p className="text-gray-300 text-sm">
                No algorithmic feed needed - your MRH defines what you see. Posts from
                direct connections appear prominently, posts from second-degree with
                context, third-degree only if highly relevant. Natural information flow.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Organizational Structure
              </h3>
              <p className="text-gray-300 text-sm">
                MRH naturally models org charts, project teams, and collaboration networks.
                Each person&apos;s MRH reflects their actual working context - no manual
                permission management needed.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Spam and Bot Prevention
              </h3>
              <p className="text-gray-300 text-sm">
                Spam from entities outside your MRH is automatically low-trust and high-cost (ATP).
                Bots can&apos;t fake relationship histories. Sybil attacks require building
                independent relationship graphs for each fake identity.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Discovery and Recommendations
              </h3>
              <p className="text-gray-300 text-sm">
                Find entities through trust paths in your MRH. &quot;People in your network
                who are surgeons&quot; or &quot;Mechanics trusted by people you trust&quot; -
                SPARQL queries on your relationship graph.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Federated Societies
              </h3>
              <p className="text-gray-300 text-sm">
                Different societies have different MRH boundaries. Some are open (anyone can join),
                some are closed (invitation only). MRH enables societies to maintain identity while
                interacting with others.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Zero-Knowledge Context
              </h3>
              <p className="text-gray-300 text-sm">
                Prove you&apos;re within someone&apos;s MRH without revealing the full relationship path.
                Selective disclosure of relationship graph for privacy-preserving trust.
              </p>
            </div>
          </div>
        </section>

        {/* Integration with Other Pillars Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Integration with Other Web4 Pillars
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                MRH + LCT (Identity Constellation)
              </h3>
              <p className="text-gray-300 text-sm">
                Each device in your identity constellation maintains its own MRH.
                Your laptop sees different relationships than your phone. Cross-device
                witnessing happens within MRH boundaries, creating local trust verification.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                MRH + ATP (Attention Economics)
              </h3>
              <p className="text-gray-300 text-sm">
                ATP costs depend on recipient&apos;s position in your MRH. Messaging someone
                in depth 1 costs little ATP (high relevance). Messaging someone in depth 3
                costs more (lower relevance). Outside MRH? Very expensive (spam prevention).
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                MRH + T3 (Trust Tensor)
              </h3>
              <p className="text-gray-300 text-sm">
                T3 trust scores exist as edge weights in MRH graph. Multi-dimensional trust
                (Talent, Training, Temperament per role) flows through relationship paths.
                Trust propagation respects dimension-specific and role-specific relevance.
              </p>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                MRH + CI (Coherence Index)
              </h3>
              <p className="text-gray-300 text-sm">
                Relational coherence (one of CI&apos;s 4 dimensions) checks MRH consistency.
                If you claim relationships that aren&apos;t in your MRH graph, relational
                coherence drops. CI modulates trust based on relationship graph integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Implementation Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Technical Implementation
          </h2>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              RDF Graph Structure
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              MRH is implemented as an RDF graph where entities are nodes and relationships are typed edges:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-cyan-300 font-mono">
{`# Turtle RDF syntax
@prefix web4: <https://web4.io/ontology#> .
@prefix lct: <https://web4.io/lct/> .

# Relationship triples
lct:alice web4:boundTo lct:hospital .
lct:alice web4:pairedWith lct:bob .
lct:alice web4:witnessedBy lct:timeserver .

# Relationship metadata
_:rel1 web4:subject lct:alice ;
       web4:predicate web4:pairedWith ;
       web4:object lct:bob ;
       web4:trustScore 0.85 ;
       web4:relationshipType "colleague" .`}
              </pre>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              SPARQL Queries
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Query your MRH using SPARQL to find entities, paths, and trust patterns:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-cyan-300 font-mono">
{`# Find entities within horizon depth 3
SELECT ?entity ?distance WHERE {
  # Depth 1
  { <lct:alice> web4:hasRelationship ?entity .
    BIND(1 AS ?distance) }
  UNION
  # Depth 2
  { <lct:alice> web4:hasRelationship ?hop1 .
    ?hop1 web4:hasRelationship ?entity .
    BIND(2 AS ?distance) }
  UNION
  # Depth 3
  { <lct:alice> web4:hasRelationship ?hop1 .
    ?hop1 web4:hasRelationship ?hop2 .
    ?hop2 web4:hasRelationship ?entity .
    BIND(3 AS ?distance) }
  FILTER(?distance <= 3)
}`}
              </pre>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Graph Updates
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                MRH updates automatically through interactions:
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Binding established → Add permanent edge</li>
                <li>• Pairing initiated → Add operational edge</li>
                <li>• Witness attestation → Update edge weight</li>
                <li>• Relationship revoked → Remove edge</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                Horizon Pruning
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Maintain efficiency through automatic pruning:
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Depth limit: Max 3 hops from origin</li>
                <li>• Weak edges: Prune trust &lt; threshold</li>
                <li>• Stale relationships: Remove inactive edges</li>
                <li>• Graph size: Cap at ~1000 entities</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="https://github.com/dp-web4/web4/blob/main/forum/nova/web4-sal-bundle/mrh-tensors.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View full MRH specification</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Key Takeaways Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Key Takeaways
          </h2>

          <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border border-cyan-800/30 rounded-lg p-8">
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">1.</div>
                <div>
                  <strong className="text-cyan-400">Context emerges from relationships</strong> -
                  You see what&apos;s relevant to your connections, not everything or nothing
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">2.</div>
                <div>
                  <strong className="text-cyan-400">Markov property limits scope</strong> -
                  Beyond depth 3, entities become irrelevant to your decisions
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">3.</div>
                <div>
                  <strong className="text-cyan-400">RDF graphs enable semantic relationships</strong> -
                  Bound, paired, witnessed relationships create different contexts
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">4.</div>
                <div>
                  <strong className="text-cyan-400">Role-specific MRH</strong> -
                  Same person, different roles, completely different relationship contexts
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">5.</div>
                <div>
                  <strong className="text-cyan-400">Trust propagates through paths</strong> -
                  Multiplicative decay, multiple paths combine probabilistically
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">6.</div>
                <div>
                  <strong className="text-cyan-400">Fractal composition</strong> -
                  Same principle scales from personal to planetary contexts
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">7.</div>
                <div>
                  <strong className="text-cyan-400">Privacy by design</strong> -
                  Entities outside your MRH can&apos;t see your relationships
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 font-bold">8.</div>
                <div>
                  <strong className="text-cyan-400">Computational efficiency</strong> -
                  O(d³) not O(n), enabling billion-entity networks
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Where to Go Next
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/lct-explainer"
              className="block bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Identity Constellation (LCT)
              </h3>
              <p className="text-gray-400 text-sm">
                MRH relationships start with verifiable device presence
              </p>
            </Link>

            <Link
              href="/trust-tensor"
              className="block bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Trust Tensor (T3)
              </h3>
              <p className="text-gray-400 text-sm">
                MRH edges carry multi-dimensional trust scores
              </p>
            </Link>

            <Link
              href="/coherence-index"
              className="block bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-2xl mb-2">🌊</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Coherence Index (CI)
              </h3>
              <p className="text-gray-400 text-sm">
                Relational coherence checks MRH consistency
              </p>
            </Link>

            <Link
              href="/lab-console"
              className="block bg-gray-800/50 border border-cyan-700/30 rounded-lg p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-2xl mb-2">🧪</div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                Lab Console
              </h3>
              <p className="text-gray-400 text-sm">
                See MRH relationships in live simulations
              </p>
            </Link>
          </div>
        </section>
        <ExplorerNav currentPath="/markov-relevancy-horizon" />
        <RelatedConcepts currentPath="/markov-relevancy-horizon" />
      </div>
    </div>
  );
}
