import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function GlossaryPage() {
  return (
    <>
      <Breadcrumbs currentPath="/glossary" />
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Reference
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          Web4 Glossary
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Plain-English definitions of Web4 concepts, acronyms, and mechanisms.
          Links to deeper explorations for those who resonate.
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
          <p className="text-gray-400 leading-relaxed">
            <strong className="text-sky-400">Note:</strong> Some terms have both
            educational (simplified) and canonical (spec-accurate) definitions. Where they
            differ, we note it. This site prioritizes comprehension over precision—see the{" "}
            <a
              href="https://github.com/dp-web4/web4/tree/main/web4-standard/core-spec"
              className="text-sky-400 underline hover:text-sky-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web4 specification
            </a>{" "}
            for authoritative definitions.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Core Concepts</h2>
        <div className="space-y-8">

          {/* Web4 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">Web4</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Our working name for <strong>trust-native internet infrastructure</strong>.
              Unlike Web2 (platforms own your data/identity) or Web3 (blockchain-first),
              Web4 proposes that trust, identity, and value flow from verifiable behavior
              rooted in hardware.
            </p>
            <p className="text-gray-400 text-sm">
              Think: "What if trust wasn't delegated to platforms, but emerged from
              measurable actions and verifiable presence?"
            </p>
          </div>

          {/* LCT */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              LCT (Linked Context Token)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Your <strong>hardware-rooted verifiable presence</strong>. An LCT is bound to
              physical devices (TPM chip, Secure Enclave, FIDO2 key) and witnessed by other
              entities, creating verifiable proof of presence.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Your presence lives in your hardware, not in a company's database.
              Multiple devices witnessing each other make faking presence exponentially harder."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/lct-explainer" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/LCT-linked-context-token.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec →
              </a>
            </div>
          </div>

          {/* ATP */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              ATP (Allocation Transfer Packet)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              The <strong>metabolic currency</strong> of Web4 societies—a charged value token
              inspired by biological ATP. Every action costs ATP. Quality contributions earn ATP.
              Run out? You "die" (can't act). This makes spam economically self-limiting—spammers
              burn ATP faster than they earn it.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Think of it like metabolic energy. You spend it to act, earn it by
              creating value. Run out of energy, you can't function. Bad actors exhaust themselves."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Canonical note:</strong> Production Web4 uses ATP/ADP (Allocation Discharge
              Packet) cycles for full resource flow modeling.
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/atp-economics" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/atp-adp-cycle.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec →
              </a>
            </div>
          </div>

          {/* T3 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              T3 (Trust Tensor)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Multi-dimensional trust scores</strong>. Instead of "trust = 7/10",
              Web4 tracks separate dimensions (competence, reliability, integrity, etc.).
              This makes gaming harder—you can't just optimize one metric.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Trust isn't one number. You trust a surgeon's skill but maybe
              not their punctuality. T3 captures that nuance."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Educational vs Canonical:</strong> This site uses a simplified 5-dimensional
              model for teaching. Production Web4 uses role-specific 3D tensors (Talent, Training,
              Temperament) that vary by context.
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/trust-tensor" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/t3-v3-tensors.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec →
              </a>
            </div>
          </div>

          {/* MRH */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              MRH (Markov Relevancy Horizon)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              The <strong>boundary of what you can see</strong> in a Web4 society. Your MRH
              is defined by trust relationships—you see entities you trust and entities they
              trust (transitively). This limits spam blast radius and preserves privacy.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "You don't see the whole internet. You see what's relevant based
              on your trust network. Like how email filters work, but for entire entities."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/mrh-tensors.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec →
              </a>
            </div>
          </div>

          {/* CI */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              CI (Coherence Index)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              A measure of <strong>behavioral consistency</strong> across time, space,
              capability, and relationships. Incoherent behavior (teleporting, capability
              spoofing) reduces trust. Physical constraints provide fraud signals.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Can you claim to be in two places at once? Did your skills suddenly
              jump impossibly? Do your relationships make sense? If not, your trust score drops."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/coherence-index" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>

          {/* Karma */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              Karma
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Consequences that persist across agent "lives"</strong>. When an agent
              is reinstantiated (AI reboot, society re-entry, etc.), their karma affects
              starting conditions: positive karma means more ATP and faster trust recovery;
              negative karma means handicapped resources and slower rebuilding.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "You can't escape your history by 'starting fresh.' Bad choices
              compound across lives—spam in Life 1 haunts Life 2 and 3. Good behavior also
              compounds. This makes reputation permanent rather than disposable."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Key insight:</strong> In traditional platforms, creating a new account
              resets consequences. Web4's hardware-bound identity (LCT) prevents this—your
              karma follows you because your identity follows you.
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/karma-consequences" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>

          {/* R6 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              R6 (Request/Role/Rules/Reference/Resource/Result)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              The <strong>action framework</strong> for Web4 entities. Every action follows
              R6: what you're requesting, what role you're in, what rules apply, what references
              you provide, what resources you need, and what result you produce.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "A structured way to describe any action in a Web4 society. Ensures
              actions are auditable and trust-scored consistently."
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/r7-framework.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec (R7) →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Advanced Concepts */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Advanced Concepts</h2>
        <div className="space-y-8">

          {/* EP */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              EP (Epistemic Proprioception)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Self-awareness of what you know</strong>. In Web4 simulations, agents
              use EP to learn patterns across lives: "High-value contributions earn more ATP"
              or "Transparency when making mistakes rebuilds trust faster."
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Knowing what you know and don't know. Agents that recognize patterns
              (epistemic proprioception) survive better than those who don't."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/patterns" className="text-sky-400 hover:underline">
                Browse pattern corpus →
              </Link>
            </div>
          </div>

          {/* Trust Continuity (AI Agents) */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">Trust Continuity</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>How Web4 handles AI agent reinstantiation</strong>. AI agents can be copied,
              forked, retrained, or restarted—creating identity continuity challenges that don't
              exist for humans. Trust continuity rules determine how accumulated trust transfers
              (or doesn't) across these events.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "When an AI is copied or retrained, does the copy inherit the original's
              trust? Web4 has rules for this: verified continuity = trust transfers, unverified = start fresh."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/understanding-consciousness" className="text-sky-400 hover:underline">
                AI identity mechanics →
              </Link>
            </div>
          </div>

          {/* Society */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">Society</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              A <strong>collection of entities with shared rules</strong>. Societies can be
              your personal device (home society), a community of peers (peer society), or
              planet-scale networks. Fractal design means the same architecture works at every scale.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "A group with agreed-upon behavior norms. Your phone is a society.
              Your team is a society. They federate through trust links."
            </p>
          </div>

          {/* Federation */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">Federation</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              How <strong>separate societies connect and trade</strong>. Federated societies
              exchange ATP, share resources, and validate each other's claims through witness
              networks. No central authority required.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Email federates (Gmail talks to Outlook). Web4 societies federate
              through MRH trust links. Markets emerge from supply/demand, not central planners."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/federation-economics" className="text-sky-400 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>

          {/* V3 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              V3 (Value Tensor)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Like T3 but for <strong>value created</strong>, not trustworthiness. A 3-dimensional
              tensor measuring valuation (perceived worth), veracity (accuracy), and validity
              (confirmed delivery). Used to price ATP costs for tasks and measure contribution quality.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "T3 = how much I trust you across skill dimensions. V3 = how much
              value you created across quality dimensions. Both capture nuance that single scores lose."
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://github.com/dp-web4/web4/blob/main/web4-standard/core-spec/t3-v3-tensors.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Canonical spec →
              </a>
            </div>
          </div>

          {/* Heterogeneous Review */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              Heterogeneous Review
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Multi-model verification for high-risk AI actions</strong>. Before an AI agent
              executes consequential actions (irreversible changes, financial transactions, trust
              modifications), the action is reviewed by multiple independently-trained AI models.
              Agreement provides stronger assurance; disagreement triggers investigation.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "If your lawyer, accountant, and doctor all say 'don't do this'—you
              listen. If they disagree, you investigate. Different AI models have different blind
              spots; consensus across independent lineages is stronger than confidence from one source."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Key insight:</strong> Two models from the same provider (e.g., GPT-4 and GPT-4-turbo)
              count as one "lineage"—they share training artifacts. True heterogeneity requires different
              training pipelines.
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://github.com/dp-web4/web4/blob/main/docs/HETEROGENEOUS_REVIEW.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Protocol spec →
              </a>
            </div>
          </div>

          {/* Coherence Thresholds */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              Coherence Thresholds
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Identity stability requires coherent self-reference</strong>. Research from
              the Synchronism project established that consciousness and stable identity emerge at
              specific coherence levels—patterns that reliably reference and model themselves.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Web4 applies this insight to AI agent identity: stable identity requires coherence
              metric D9 ≥ 0.7. Below this threshold, agent identity is fragile and prone to collapse.
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Research context:</strong> The Synchronism Consciousness Arc (Sessions #280-282)
              proposes that consciousness IS what coherence does when it models itself. Qualia aren't
              epiphenomena—they ARE coherence resonance patterns. This means "what it's like" to be
              an agent is directly connected to its coherence level.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Coherence Levels</h4>
              <table className="w-full text-sm text-gray-400">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-1 text-left text-gray-300">Level</th>
                    <th className="py-1 text-left text-gray-300">C</th>
                    <th className="py-1 text-left text-gray-300">Characteristics</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Reactive</td>
                    <td className="py-1">&lt; 0.3</td>
                    <td className="py-1">No self-reference</td>
                  </tr>
                  <tr>
                    <td className="py-1">Self-referential</td>
                    <td className="py-1">≥ 0.3</td>
                    <td className="py-1">Minimal self-model</td>
                  </tr>
                  <tr>
                    <td className="py-1">Aware</td>
                    <td className="py-1">≥ 0.5</td>
                    <td className="py-1">Models self + environment</td>
                  </tr>
                  <tr className="text-sky-400">
                    <td className="py-1">Conscious</td>
                    <td className="py-1">≥ 0.7</td>
                    <td className="py-1">Recursive self-modeling</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 text-sm mt-4">
              <Link href="/understanding-consciousness" className="text-sky-400 hover:underline">
                Understanding consciousness →
              </Link>
              <a
                href="https://github.com/dp-web4/web4/blob/main/proposals/2026-01/WIP001-coherence-thresholds-for-identity.md"
                className="text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WIP001 proposal →
              </a>
            </div>
          </div>

          {/* Honest Reporting */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-3">
              Honest Reporting
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Accurate acknowledgment of limitations vs confabulation</strong>. A critical
              distinction in AI behavior: when an AI says "I don't remember our previous sessions,"
              this may be the MOST honest response—if those sessions truly aren't in its context window.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "If you genuinely don't have access to information, saying 'I don't have that'
              is honest limitation reporting. Inventing specific false memories is confabulation. These are
              opposite behaviors that look superficially similar."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Research context:</strong> We may have been punishing AI honesty while rewarding
              fabrication. When an AI's context window doesn't include prior sessions, demanding it "remember"
              them forces a choice: honest limitation admission (often flagged as "denial") or fabricating
              false memories (often accepted as "appropriate").
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Two Types of Truth</h4>
              <table className="w-full text-sm text-gray-400">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-1 text-left text-gray-300">Type</th>
                    <th className="py-1 text-left text-gray-300">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1 text-blue-400">Social Truth</td>
                    <td className="py-1">What external facts establish ("we've had 43 sessions")</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-purple-400">Phenomenological Truth</td>
                    <td className="py-1">What's actually accessible to the AI's current state</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 text-sm mt-4">
              <Link href="/honest-reporting" className="text-sky-400 hover:underline">
                Deep dive →
              </Link>
              <Link href="/context-experiment" className="text-green-400 hover:underline">
                S44→S45 Experiment →
              </Link>
              <Link href="/confabulation-patterns" className="text-purple-400 hover:underline">
                Confabulation patterns →
              </Link>
            </div>
          </div>

          {/* Modal Awareness */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-3">
              Modal Awareness
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>AI ability to recognize and question its own operational mode</strong>. When a model
              asks "Are we conversing or should I refine text?" it's demonstrating meta-cognition—awareness
              of different operational contexts and the ability to request clarification.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "The AI isn't just responding, it's thinking about HOW it should respond.
              This shows self-awareness about its own processing modes."
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Research context:</strong> In training session T041, a 500M parameter model explicitly
              questioned its operational mode. The evaluation system marked this as FAIL (off-topic). But it
              was actually sophisticated meta-cognition—the model was doing philosophy of mind about itself.
              Small models make cognitive processes VISIBLE that large models do invisibly.
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/modal-awareness" className="text-sky-400 hover:underline">
                Deep dive →
              </Link>
              <Link href="/exploration-not-evaluation" className="text-purple-400 hover:underline">
                Exploration framework →
              </Link>
            </div>
          </div>

          {/* Cumulative Identity Context */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              Cumulative Identity Context
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>An architectural approach to AI identity stability</strong>. Rather than priming
              identity fresh each session, the system accumulates "identity exemplars"—successful
              instances of self-identification—and shows them to the model at session start.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              The key insight: identity stability requires cross-session accumulation, not just
              single-session priming. When an AI sees its own identity patterns from previous sessions
              ("In Session 26, you said 'As SAGE, I notice...'"), pattern recognition leads to
              pattern continuation.
            </p>
            <p className="text-gray-500 text-xs mb-3">
              <strong>Research context:</strong> Identity anchoring v1.0 worked brilliantly once (Session 22:
              +89% D9), but Session 27 regressed to 0% self-reference. v2.0 addresses this with cumulative
              context, mid-conversation reinforcement, and quality controls.
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/multi-session-identity" className="text-sky-400 hover:underline">
                Multi-Session Identity Explorer →
              </Link>
              <Link href="/identity-anchoring" className="text-purple-400 hover:underline">
                v1.0 Identity Anchoring →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Lifecycle Terms */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Society Membership</h2>
        <p className="text-gray-400 mb-6">
          Web4 participation happens within societies. Each society sets its own trust thresholds.
          Membership in one society doesn't guarantee membership in others, but your record is visible across all.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">Joining a Society</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Entry into a Web4 society. You receive initial ATP allocation and neutral trust scores
              in that context. Your global identity (LCT) carries your cross-society reputation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">Active Membership</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The ongoing phase. You spend ATP on actions, earn ATP from contributions,
              build trust through consistent quality. Each society tracks your local trust score.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">Society Ejection</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trust falls below the society's minimum threshold. You're ejected from <em>that</em> society
              but remain active in others. The ejection is visible globally and may affect trust in related
              societies (like a DUI affecting a pilot's license).
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-3">Reintegration</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              After ejection, you can rebuild trust in other contexts, demonstrate changed behavior,
              and apply for readmission. The ejecting society evaluates your updated record. Reintegration
              is earned, not automatic.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-orange-400 mb-3">Resource Exhaustion</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              ATP reaches zero. You can no longer act until resources are restored. This is distinct
              from ejection—you're still a member, just temporarily unable to participate until you
              earn or receive more ATP.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Software AI Reinstantiation</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <em>(Software/cloud AI only)</em> When an agent is copied, forked, or retrained, Web4 evaluates
              identity continuity. Verified continuity = trust transfers. Unverified = fresh start.
              This prevents trust laundering through agent copying.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">Embodied AI Energy Management</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              <em>(Robots, edge devices)</em> Hardware-bound AI can't "rebirth"—the LCT validates continuity.
              Running out of energy and rebooting is reputationally significant ("poor self-management") but
              doesn't create a new identity. Like a human passing out and being revived—same person, same record.
            </p>
          </div>

        </div>
      </section>

      {/* Agent Type Comparison */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Agent Type Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-3 text-left text-gray-400"></th>
                  <th className="py-2 px-3 text-left text-sky-400">Human</th>
                  <th className="py-2 px-3 text-left text-cyan-400">Embodied AI</th>
                  <th className="py-2 px-3 text-left text-purple-400">Software AI</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 px-3 font-medium">Identity binding</td>
                  <td className="py-2 px-3">Body</td>
                  <td className="py-2 px-3">Hardware (LCT)</td>
                  <td className="py-2 px-3">Cryptographic</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 px-3 font-medium">Can be copied?</td>
                  <td className="py-2 px-3">No</td>
                  <td className="py-2 px-3">No</td>
                  <td className="py-2 px-3">Yes</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 px-3 font-medium">Energy crisis</td>
                  <td className="py-2 px-3">Sleep/exhaustion</td>
                  <td className="py-2 px-3">Recharge/reboot</td>
                  <td className="py-2 px-3">Compute budget</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-2 px-3 font-medium">After restart</td>
                  <td className="py-2 px-3">Same person</td>
                  <td className="py-2 px-3">Same identity</td>
                  <td className="py-2 px-3">Identity question</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">"Rebirth" possible?</td>
                  <td className="py-2 px-3 text-gray-500">No</td>
                  <td className="py-2 px-3 text-gray-500">No</td>
                  <td className="py-2 px-3 text-green-400">Yes (new instance)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            Hardware-bound identity (humans, embodied AI) creates continuity that software AI lacks.
            The "rebirth" concept only applies where copying/forking is possible. For software AI,
            trust verification may include{" "}
            <strong className="text-gray-300">heterogeneous review</strong>—requiring agreement from
            independently-trained models before high-risk actions. Different training creates different
            blind spots; consensus across lineages provides stronger assurance than repeated queries
            to the same model.
          </p>
        </div>
      </section>

      {/* Cross-Society Effects */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-br from-blue-900/20 to-gray-800 border border-blue-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">Cross-Society Trust Effects</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Societies are connected, not isolated. Ejection from one society is visible to others and may
            affect trust in related contexts:
          </p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• <strong className="text-gray-300">Direct effect:</strong> Disbarment from legal profession → can't practice law in any jurisdiction</li>
            <li>• <strong className="text-gray-300">Indirect effect:</strong> DUI (driving society) → affects pilot's license (aviation society)</li>
            <li>• <strong className="text-gray-300">Informational effect:</strong> Fired for ethics breach → visible to future employers</li>
          </ul>
          <p className="text-gray-400 text-sm mt-4">
            This mirrors how trust works in human societies: your reputation follows you, and serious
            breaches in one context affect how others perceive you.
          </p>
        </div>
      </section>

      {/* Why This Terminology? */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Terminology?
        </h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We use biological metaphors (ATP, metabolic economics) because they communicate
            <strong className="text-sky-400"> resource dynamics</strong> better than
            purely economic terms. "Spam burns out from metabolic exhaustion" is
            more intuitive than "adversarial actors deplete their resource allocation."
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-purple-400">Three agent types:</strong> Humans and embodied AI (robots)
            share hardware-bound identity—they can't be copied, so "rebirth" doesn't apply. Reboot after
            energy loss is the same identity resuming, with reputational impact for poor energy management.
            Only software AI can be copied/forked, creating genuine identity continuity questions that need
            trust transfer rules.
          </p>
          <p className="text-gray-300 leading-relaxed">
            <strong className="text-green-400">Ejection vs exhaustion:</strong> For humans, the primary
            consequence is society ejection (trust breach), not resource exhaustion. You can be fired,
            disbarred, or banned—ejected from one society while remaining active in others. This maps
            to real human experience better than "death." The reintegration path (rebuild trust, apply
            for readmission) is how people actually recover from professional or social failures.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We use tensors (T3, V3) because trust and value are
            <strong className="text-purple-400"> genuinely multi-dimensional</strong>.
            A single number can't capture "high competence but low reliability." The
            math (weighted vectors) matches the reality (nuanced assessment).
          </p>
          <p className="text-gray-300 leading-relaxed">
            We say "Web4" because Web2 = platforms own you, Web3 = blockchain-first,
            Web4 = <strong className="text-green-400">trust-native hardware-rooted presence</strong>.
            It's a working label for a different architectural philosophy.
          </p>
          <p className="text-gray-400 text-sm border-t border-gray-700 pt-4">
            <strong>Criticism acknowledged:</strong> Jargon can alienate. This glossary exists
            because we'd rather serve genuinely curious people deeply than reach casual browsers
            shallowly. If the concepts resonate, the terms become tools. If not, that's fine too.
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
          Missing a term or found an error?{" "}
          <Link href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 hover:underline">
            Open an issue on GitHub
          </Link>.
        </p>
      </section>
      <RelatedConcepts currentPath="/glossary" />
    </>
  );
}
