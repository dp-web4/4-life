'use client';

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from '@/components/ExplorerNav';
import CollusionDetectionDemo from "@/components/CollusionDetectionDemo";
import TermTooltip from "@/components/TermTooltip";

export default function ThreatModelPage() {
  return (
    <>
      <Breadcrumbs currentPath="/threat-model" />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Security & Limitations
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-red-500 bg-clip-text text-transparent">
          Threat Model & Failure Modes
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 is research, not production. This page documents known attack surfaces,
          failure modes, and open questions. **Transparency about limitations builds more
          trust than bold claims.**
        </p>
        <div className="bg-gradient-to-br from-yellow-950/30 to-yellow-900/20 border border-yellow-800/30 rounded-xl p-6">
          <p className="text-yellow-300 leading-relaxed">
            ⚠️ <strong>Research Status:</strong> These mechanisms are experimental.
            The Web4 reference implementation models 400+ attack vectors across 80+ tracks;
            this page highlights the key categories. Detection times are theoretical.
            Economic parameters are calibrated through simulation, not real-world adversaries.
          </p>
        </div>
      </section>

      {/* Attack Surfaces */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Known Attack Surfaces
        </h2>
        <p className="text-gray-400 mb-8">
          Where Web4's defenses are strong, where they're weak, and what we don't know yet.
        </p>

        <div className="space-y-6">
          {/* Sybil Attacks */}
          <div id="sybil" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">👥</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  Sybil Attacks (Creating Fake Identities)
                </h3>
                <p className="text-sm text-gray-500">
                  Can attackers create multiple identities to manipulate trust or voting?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  What <TermTooltip term="LCT" /> Hardware Binding Does
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Ties identity to physical hardware (TPM, Secure Enclave, FIDO2)</li>
                  <li>Makes creating thousands of identities expensive (need physical devices)</li>
                  <li>Multi-device witnessing strengthens identity (harder to fake)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  What It Doesn't Prevent
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong className="text-red-300">Resourced attackers</strong> with many devices (governments, large orgs)</li>
                  <li><strong className="text-red-300">Virtual hardware</strong> if TPM emulation isn't detected</li>
                  <li><strong className="text-red-300">Stolen devices</strong> used to impersonate legitimate users</li>
                  <li><strong className="text-red-300">Low-stake attacks</strong> where a few fake presences suffice</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-800/30 rounded">
                <p className="text-blue-300 text-sm">
                  <strong>Assessment:</strong> LCT raises the cost floor for Sybil attacks but doesn't make them impossible.
                  Effective against casual attackers and spammers. Vulnerable to well-funded adversaries.
                </p>
              </div>
            </div>
          </div>

          {/* Collusion & Reputation Laundering */}
          <div id="collusion" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🤝</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  Collusion & Reputation Laundering
                </h3>
                <p className="text-sm text-gray-500">
                  Can groups artificially inflate each other's trust scores?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  The Attack
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  A group of colluding agents validates each other's low-quality work,
                  earning <TermTooltip term="ATP" /> and building trust without providing real value to outsiders.
                  They form a "trust cartel" that games the system through mutual validation.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Current Defenses
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong>Diversity requirements:</strong> Validation from varied witnesses carries more weight</li>
                  <li><strong><TermTooltip term="MRH" /> boundaries:</strong> Isolated trust networks have limited influence</li>
                  <li><strong>Cross-validation:</strong> External witnesses can challenge insider claims</li>
                  <li><strong>ATP market dynamics:</strong> Closed loops create ATP inflation, reducing buying power</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Open Questions
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>How large can a trust cartel grow before detection?</li>
                  <li>Can sophisticated collusion mimic legitimate communities?</li>
                  <li>What's the optimal witness diversity threshold?</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded">
                <p className="text-yellow-300 text-sm">
                  <strong>Assessment:</strong> Partial mitigation through diversity requirements, but no strong guarantees.
                  **This is an active research problem.** Production systems need empirical data on collusion detection rates.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Collusion Demo */}
          <div className="my-8">
            <CollusionDetectionDemo />
          </div>

          {/* Quality Inflation */}
          <div id="quality-inflation" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">📈</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  Quality Score Inflation
                </h3>
                <p className="text-sm text-gray-500">
                  Can agents deliver mediocre work but claim high quality?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  The Attack
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  Agent executes medium-quality work (costs 34 ATP) but claims high quality
                  (earns 56 ATP reward). If detection is slow, the 30% markup becomes profit.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Challenge-Response Defense
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong>10% challenge rate:</strong> Random quality audits on tasks</li>
                  <li><strong>Adaptive challenges:</strong> Low-trust agents challenged more frequently</li>
                  <li><strong>Detection threshold:</strong> 3 quality mismatches triggers investigation</li>
                  <li><strong>Stake slashing:</strong> Detected fraud loses 75k ATP stake</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Critical Unknown: Detection Time
                </h4>
                <p className="text-gray-400 leading-relaxed mb-2">
                  Current 75k ATP stakes ARE deterrent IF detection happens within ~5 days.
                  But we have <strong className="text-red-300">no empirical data</strong> on
                  actual detection times in adversarial environments.
                </p>
                <p className="text-gray-500 text-sm italic">
                  See: <code className="text-purple-300">lib/game/agent_based_attack_simulation.py</code> for
                  simulated attack profitability analysis.
                </p>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded">
                <p className="text-red-300 text-sm">
                  <strong>Assessment:</strong> Simulations show attacks are unprofitable with
                  current parameters, but this assumes ideal detection. **Real-world adversaries
                  will test these assumptions.** Need production monitoring to validate.
                </p>
              </div>
            </div>
          </div>

          {/* Goodharting T3 Dimensions */}
          <div id="goodharting" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  Goodharting <TermTooltip term="T3" /> Dimensions
                </h3>
                <p className="text-sm text-gray-500">
                  Can agents optimize metrics without being trustworthy?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  The Problem
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  &ldquo;When a measure becomes a target, it ceases to be a good measure.&rdquo; If
                  agents know they&apos;re being scored on talent/training/temperament, they
                  can optimize for proxies rather than genuine trustworthiness.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Example Attack Vectors
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Cherry-picking easy tasks to boost competence scores</li>
                  <li>Delivering on time but with hidden defects (reliability without quality)</li>
                  <li>Performative transparency (sharing useless data) without actual openness</li>
                  <li>Gaming "consistency" metrics through predictable mediocrity</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Mitigations
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Multi-dimensional scoring makes simultaneous optimization harder</li>
                  <li>Context-weighted evaluation (different tasks weight dimensions differently)</li>
                  <li>Long-term observation (gaming is hard to sustain over time)</li>
                  <li>Coherence Index cross-checks for behavioral consistency</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded">
                <p className="text-yellow-300 text-sm">
                  <strong>Assessment:</strong> Multi-dimensionality helps but doesn't eliminate Goodharting.
                  **Effectiveness depends on metric design and observability.** Continuous refinement needed.
                </p>
              </div>
            </div>
          </div>

          {/* MRH Visibility Limits */}
          <div id="mrh-limits" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🌐</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  MRH Visibility Limits
                </h3>
                <p className="text-sm text-gray-500">
                  What breaks when you can't see everything?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  The Design
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  Markov Relevancy Horizon limits what you see based on trust relationships.
                  You only observe entities within your relevancy graph, not the entire network.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  What This Breaks
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong>Global coordination:</strong> Can't organize network-wide actions</li>
                  <li><strong>Full auditing:</strong> Malicious actors outside your MRH are invisible</li>
                  <li><strong>Market efficiency:</strong> Price discovery limited to visible entities</li>
                  <li><strong>Reputation propagation:</strong> Important warnings may not reach you</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Why It's Necessary
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Privacy: You don't broadcast to everyone</li>
                  <li>Scalability: Can't process infinite data</li>
                  <li>Context: Not all information is relevant to you</li>
                  <li>Spam resistance: Limits blast radius of attacks</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded">
                <p className="text-purple-300 text-sm">
                  <strong>Assessment:</strong> MRH is an intentional trade-off. Privacy and scalability
                  require sacrificing global visibility. **This is a feature, not a bug**, but it has consequences.
                </p>
              </div>
            </div>
          </div>

          {/* False Positives & Contested Events */}
          <div id="false-positives" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">⚖️</span>
              <div>
                <h3 className="text-xl font-semibold text-red-400">
                  False Positives & Contested Events
                </h3>
                <p className="text-sm text-gray-500">
                  What happens when the system is wrong?
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Inevitable Errors
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  Any automated detection system will have false positives. Web4's challenge-response
                  and coherence checks can flag legitimate behavior as suspicious. Current design
                  has a <strong className="text-yellow-300">designed but untested appeals process</strong> (SAL-level multi-tier with witness panels and escalation).
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Failure Modes
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Legitimate edge-case behavior flagged as incoherent</li>
                  <li>Valid work incorrectly judged as low-quality</li>
                  <li>Delayed responses (due to legitimate reasons) penalized as unreliable</li>
                  <li>Innovative approaches punished for deviating from norms</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Designed Mechanisms (Not Yet Deployed)
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong>Multi-tier SAL appeals:</strong> File → Review → Evidence → Hearing → Verdict → Enforce — structured stages with time windows</li>
                  <li><strong>Witness panel adjudication:</strong> Independent witnesses (not the original penalizer) evaluate the appeal</li>
                  <li><strong>Evidence framework:</strong> 7 evidence types — witness attestations, transaction logs, behavioral records, context explanations, third-party testimony</li>
                  <li><strong>T3/V3 restoration:</strong> Full or partial trust reversal with audit trail</li>
                  <li><strong>Escalation path:</strong> Society → federation level for contested outcomes</li>
                  <li><strong>Anti-gaming:</strong> Appeal costs ATP, repeat frivolous appeals incur cooldowns</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded">
                <p className="text-yellow-300 text-sm">
                  <strong>Assessment:</strong> The appeals mechanism is formally specified (109 integration checks), but
                  <strong> hasn&apos;t been tested with real humans</strong>. The hard question isn&apos;t the architecture —
                  it&apos;s whether incentives prevent gaming in practice. Human oversight may still be
                  needed for edge cases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adversary Profiles */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Who Would Attack This?
        </h2>
        <p className="text-gray-400 mb-8">
          Abstract threats become concrete when you model the adversary. Web4&apos;s red team simulations
          test against four profiles with different budgets, skills, and motivations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧒</span>
              <h3 className="text-lg font-semibold text-gray-200">Script Kiddie</h3>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mb-3">
              <p>Budget: <span className="text-gray-300">200 ATP</span> &bull; Skill: <span className="text-gray-300">Low (30%)</span> &bull; Stealth: <span className="text-gray-300">10%</span></p>
              <p>Tactics: Known exploits, simple identity spoofing, trust oscillation</p>
            </div>
            <div className="p-2 bg-green-900/20 border border-green-800/30 rounded text-xs text-green-300">
              <strong>Result:</strong> Consistently blocked. Low-skill attacks fail against basic LCT validation and rate limits.
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🕵️</span>
              <h3 className="text-lg font-semibold text-gray-200">Insider Threat</h3>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mb-3">
              <p>Budget: <span className="text-gray-300">500 ATP</span> &bull; Skill: <span className="text-gray-300">High (70%)</span> &bull; Stealth: <span className="text-gray-300">60%</span></p>
              <p>Tactics: Reputation laundering, quality manipulation, trust bridge inflation</p>
            </div>
            <div className="p-2 bg-yellow-900/20 border border-yellow-800/30 rounded text-xs text-yellow-300">
              <strong>Result:</strong> Detected within 5&ndash;10 rounds. Adapts after first detection but multi-party quality checks eventually catch it.
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏛️</span>
              <h3 className="text-lg font-semibold text-gray-200">Nation-State Actor</h3>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mb-3">
              <p>Budget: <span className="text-gray-300">5,000 ATP, 5 agents</span> &bull; Skill: <span className="text-gray-300">Expert (95%)</span> &bull; Stealth: <span className="text-gray-300">80%</span></p>
              <p>Tactics: Coordinated cascade attacks, lock starvation, platform-level Sybils</p>
            </div>
            <div className="p-2 bg-red-900/20 border border-red-800/30 rounded text-xs text-red-300">
              <strong>Result:</strong> Can cause damage before detection. Multi-layer defenses limit blast radius but don&apos;t prevent all attacks. The hardest adversary.
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🤝</span>
              <h3 className="text-lg font-semibold text-gray-200">Colluding Ring</h3>
            </div>
            <div className="text-sm text-gray-400 space-y-1 mb-3">
              <p>Budget: <span className="text-gray-300">2,000 ATP, 10 agents</span> &bull; Skill: <span className="text-gray-300">Moderate (60%)</span> &bull; Stealth: <span className="text-gray-300">40%</span></p>
              <p>Tactics: Mutual validation, reputation laundering, quality inflation rings</p>
            </div>
            <div className="p-2 bg-yellow-900/20 border border-yellow-800/30 rounded text-xs text-yellow-300">
              <strong>Result:</strong> Shared hardware creates shared fate. Coalition detection probability hits 93%+ at 3 members. Unprofitable at current stake levels.
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          These profiles are tested in the web4 red team simulator across 8 categories
          (identity, trust, economic, coherence, protocol negotiation, lifecycle, integration, federation)
          with 400+ attack simulations across 80+ tracks. The key insight: <strong className="text-gray-300">security
          isn&apos;t a binary</strong> — different adversaries hit different limits.
        </p>
      </section>

      {/* What We Know vs Don't Know */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          What We Know vs What We Don&apos;t Know
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">
              ✅ Validated Through Simulation
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Spam attacks are unprofitable with current ATP costs</li>
              <li>• Trust maturation improves across multiple lives</li>
              <li>• Quality contributors accumulate ATP over time</li>
              <li>• Multi-dimensional trust is harder to game than single scores</li>
              <li>• Coherence checks detect basic spoofing attempts</li>
              <li>• Coalition detection hits 93%+ probability at 3+ members (red team tested)</li>
              <li>• Sybil resistance has formal lower bounds: 4.6× PoW cost multiplier</li>
              <li>• Script kiddie and insider threats consistently detected (red team profiles)</li>
              <li>• Cooperation is Nash-dominant at current parameters (200 ATP stakes + 3 witnesses)</li>
              <li>• ATP market conserves under stress (200 agents, 500 rounds, 5% transfer fee maintains stability)</li>
              <li>• Sybil ROI is negative: honest identity outearns 5 fakes (transfer fee bleeds circular flows)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">
              ❌ Unknown (Need Real-World Data)
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Actual detection times for quality inflation in adversarial environments</li>
              <li>• Long-con trust building attacks (100+ cycle patient adversaries)</li>
              <li>• False positive rates in production (not simulation)</li>
              <li>• Nation-state attacks beyond red team scope (cascading infrastructure attacks)</li>
              <li>• Long-term Goodharting resistance after adversaries study the metrics</li>
              <li>• Appeals mechanism effectiveness with real human disputes</li>
              <li>• ATP market stress beyond simulation scope (real human hoarding, speculative behavior)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Priorities */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Open Research Questions
        </h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            These are the highest-priority questions that need empirical answers before
            Web4 can be considered production-ready:
          </p>

          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-sky-400 font-bold">1.</span>
              <span><strong>Collusion detection:</strong> What's the empirical detection
              rate for sophisticated collusion? Can we distinguish malicious cartels from
              legitimate communities?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400 font-bold">2.</span>
              <span><strong>Attack profitability:</strong> Do real-world adversaries find
              profitable attacks we haven't simulated? What's the actual ROI of quality
              inflation attacks?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400 font-bold">3.</span>
              <span><strong>False positive tolerance:</strong> What false positive rate
              makes the system unusable? How do users respond to incorrect penalties?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400 font-bold">4.</span>
              <span><strong>Appeals and forgiveness:</strong> What mechanisms allow
              legitimate users to recover from false positives or past mistakes without
              creating new attack vectors?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-400 font-bold">5.</span>
              <span><strong>Adaptive adversaries:</strong> How quickly can attackers
              learn and adapt to countermeasures? What's the arms race dynamic?</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Why This Transparency Matters */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Page Exists
        </h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-900/20 border border-sky-800/30 rounded-xl p-8 space-y-4 text-gray-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-sky-400">
              Transparency about limitations builds more trust than bold claims.
            </strong>{" "}
            Web4 is serious research, not vaporware. Documenting attack surfaces and
            open questions is how we invite rigorous engagement.
          </p>
          <p className="leading-relaxed">
            If you're a security researcher, these are the places to probe. If you're
            evaluating Web4 for real use, these are the risks to consider. If you're
            contributing to the project, these are the highest-value problems to solve.
          </p>
          <p className="leading-relaxed border-t border-sky-800/30 pt-4">
            <strong className="text-purple-400">
              Engage with the hard questions.
            </strong>{" "}
            The best contributions aren't just code—they're better threat models,
            empirical attack data, and proofs that our assumptions are wrong.
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
          href="/how-it-works"
          className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          How Web4 Works →
        </Link>
      </section>

      {/* Footer */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          Found a new attack vector? Have empirical data on these questions?{" "}
          <Link href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 hover:underline">
            Open an issue on GitHub
          </Link>.
        </p>
      </section>
      <ExplorerNav currentPath="/threat-model" />
        <RelatedConcepts currentPath="/threat-model" />
    </>
  );
}
