import Link from "next/link";

export default function GlossaryPage() {
  return (
    <>
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
              measurable actions and unforgeable presence?"
            </p>
          </div>

          {/* LCT */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">
              LCT (Linked Context Token)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Your <strong>hardware-rooted digital identity</strong>. An LCT is bound to
              physical devices (TPM chip, Secure Enclave, FIDO2 key) and witnessed by other
              entities, creating an unforgeable proof of presence.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Your identity lives in your hardware, not in a company's database.
              Multiple devices witnessing each other make faking 'you' exponentially harder."
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

          {/* Karma */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-sky-400 mb-3">Karma</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong>Resources carried across lives</strong>. When an agent "dies" (ATP = 0)
              but has high enough trust, they're eligible for rebirth. Karma is the ATP they
              start their next life with (based on final ATP from previous life).
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Plain English: "Good behavior in one life gives you a head start in the next.
              Trust above threshold = rebirth with your earned ATP. Trust too low = permanent death."
            </p>
            <div className="flex gap-3 text-sm">
              <Link href="/how-it-works" className="text-sky-400 hover:underline">
                Learn about lifecycle →
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

        </div>
      </section>

      {/* Lifecycle Terms */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Lifecycle Mechanics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">Birth</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Entry into a Web4 society. You receive an LCT, initial ATP allocation,
              and neutral trust scores. Now you can act.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">Life</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The active phase. You spend ATP on actions, earn ATP from contributions,
              build trust through behavior, and navigate the society's rules.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">Death</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              ATP reaches zero. Metabolic exhaustion. You can no longer act. Your life
              history is recorded and evaluated for rebirth eligibility.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Rebirth</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              If trust ≥ threshold, you're reborn with karma (ATP from previous life).
              Trust too low? Permanent death. No second chances for bad actors.
            </p>
          </div>

        </div>
      </section>

      {/* Why This Terminology? */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Terminology?
        </h2>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-4">
          <p className="text-gray-300 leading-relaxed">
            We use biological metaphors (ATP, death, rebirth) because they communicate
            <strong className="text-sky-400"> metabolic dynamics</strong> better than
            purely economic terms. "Spam costs attention and dies from exhaustion" is
            more intuitive than "adversarial actors deplete their resource allocation
            and face elimination."
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
    </>
  );
}
