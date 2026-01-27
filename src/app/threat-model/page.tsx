'use client';

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import CollusionDetectionDemo from "@/components/CollusionDetectionDemo";

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
            Many attack vectors remain unexplored. Detection times are theoretical.
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
                  What LCT Hardware Binding Does
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
                  <li><strong className="text-red-300">Low-stake attacks</strong> where a few fake identities suffice</li>
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
                  earning ATP and building trust without providing real value to outsiders.
                  They form a "trust cartel" that games the system through mutual validation.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300 mb-2">
                  Current Defenses
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li><strong>Diversity requirements:</strong> Validation from varied witnesses carries more weight</li>
                  <li><strong>MRH boundaries:</strong> Isolated trust networks have limited influence</li>
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
                  Goodharting Trust Dimensions
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
                  "When a measure becomes a target, it ceases to be a good measure." If
                  agents know they're being scored on competence/reliability/integrity, they
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
                  has <strong className="text-yellow-300">no appeals process</strong>.
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
                  Missing Mechanisms
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Dispute resolution protocols</li>
                  <li>Evidence presentation for contested evaluations</li>
                  <li>Forgiveness pathways after trust loss</li>
                  <li>Emergency overrides for critical errors</li>
                </ul>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-800/30 rounded">
                <p className="text-red-300 text-sm">
                  <strong>Assessment:</strong> This is a **major open problem**. Current Web4 spec
                  assumes perfect measurement. Production systems need robust error handling and appeals.
                  **Human oversight may be unavoidable for edge cases.**
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Know vs Don't Know */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          What We Know vs What We Don't Know
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
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">
              ❌ Unknown (Need Real-World Data)
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Actual detection times for quality inflation</li>
              <li>• Maximum size of undetected collusion networks</li>
              <li>• False positive rates in production</li>
              <li>• Effectiveness against state-level adversaries</li>
              <li>• Long-term Goodharting resistance</li>
              <li>• Recovery pathways from trust loss</li>
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
      <RelatedConcepts currentPath="/threat-model" />
    </>
  );
}
