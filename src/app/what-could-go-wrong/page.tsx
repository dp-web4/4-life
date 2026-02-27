import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";
import RiskSelector from "@/components/RiskSelector";

export const metadata = {
  title: "What Could Go Wrong | 4-Life",
  description:
    "Honest assessment of Web4 failure modes, unsolved problems, and real risks. Every system has weaknesses — here are ours.",
};

/**
 * What Could Go Wrong — Honest failure mode analysis for non-technical visitors
 *
 * Visitor feedback (Feb 21): "a dedicated 'What Could Go Wrong' page covering
 * adversarial attacks, economic failures, and edge cases would build more confidence."
 *
 * This page complements /threat-model (security researcher audience) with
 * practical, user-facing failure modes that everyday users and builders would
 * care about. Tone: honest, not defensive. Matches the "Honest Questions"
 * style on /why-web4 that visitors praised.
 */

export default function WhatCouldGoWrongPage() {
  return (
    <>
      <PageTracker slug="what-could-go-wrong" />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/what-could-go-wrong" />
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-amber-400 mb-4">
          Honest Assessment
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">
          What Could Go Wrong
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          Every system has failure modes. Hiding them doesn&apos;t make them go away &mdash;
          it just means you discover them at the worst time. Here are the real risks,
          honest assessments, and what&apos;s genuinely unsolved.
        </p>
        <p className="text-gray-400 leading-relaxed mb-8">
          This page is for <strong className="text-gray-200">users and builders</strong> who want
          to know what they&apos;re getting into. For technical security analysis
          (attack surfaces, formal threat modeling), see the{" "}
          <Link href="/threat-model" className="text-sky-400 hover:underline">Threat Model</Link>.
        </p>
        <RiskSelector />
      </section>

      {/* Risk Categories */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-100">
          The Big Risks
        </h2>

        {/* 1. Nobody adopts it */}
        <div id="risk-adoption" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">1.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">Nobody adopts it</h3>
              <p className="text-gray-500 text-sm">Adoption &amp; Network Effects</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> Web4 only works if enough people
              and platforms use it. If only 5% of the internet adopts hardware-bound identity, the
              other 95% is still a spam-filled free-for-all. Attackers just avoid the
              Web4 part.
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Every new protocol faces
              the chicken-and-egg problem. Email, HTTPS, and IPv6 all took decades to reach critical
              mass. Many promising protocols (XMPP, WebRTC for social) never did.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Web4 is designed to
              provide value even in small communities. A single organization could run a Web4
              trust network internally &mdash; spam-free collaboration, verifiable contributions,
              earned reputation. The value starts local and grows outward.
            </p>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> This is the #1 existential risk. The technology
              could be perfect and still fail if adoption doesn&apos;t reach critical mass.
              No amount of good engineering solves a coordination problem.
            </p>
          </div>
        </div>

        {/* 2. Hardware vendors become gatekeepers */}
        <div id="risk-gatekeepers" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">2.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">Hardware vendors become the new gatekeepers</h3>
              <p className="text-gray-500 text-sm">Centralization Risk</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> Web4 identity requires hardware
              with security chips (TPM, Secure Enclave). These chips are made by a handful of
              companies &mdash; Intel, Apple, Google, Qualcomm. If identity depends on their hardware,
              haven&apos;t we just replaced platform gatekeepers with hardware gatekeepers?
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Hardware supply chains are
              concentrated. If a manufacturer decides to revoke attestation keys, block certain
              firmware, or charge licensing fees for security chip access, they could effectively
              control who gets a Web4 identity.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Web4 is designed to work
              with <em>any</em> hardware attestation standard, not just one vendor&apos;s. The
              specification supports multiple attestation methods so no single manufacturer is
              a chokepoint. Open-source hardware (RISC-V with open security modules) could
              provide vendor-independent alternatives.
            </p>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> This is a real concern with partial mitigation.
              Multi-vendor support helps but doesn&apos;t eliminate the risk. The entire
              smartphone ecosystem runs on a duopoly (Apple/Google) and Web4 inherits
              that concentration.
            </p>
          </div>
        </div>

        {/* 3. The 0.5 threshold is wrong */}
        <div id="risk-threshold" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">3.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">The trust threshold punishes the wrong people</h3>
              <p className="text-gray-500 text-sm">Fairness &amp; False Positives</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> Web4 uses a 0.5 trust threshold as
              the minimum bar for continued participation. Fall below it and you&apos;re out &mdash;
              your agent &ldquo;dies&rdquo; and must be reborn with reduced resources. But what if
              the scoring is wrong? What if legitimate users get flagged?
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Every automated system
              produces false positives. Credit scores, content moderation, spam filters &mdash;
              they all incorrectly flag legitimate people. A system that can &ldquo;kill&rdquo; your
              digital identity based on behavioral scoring could ruin someone&apos;s online life
              for an algorithmic mistake.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Trust scores are
              multi-dimensional (Talent, Training, Temperament) and role-specific, so a bad score
              in one context doesn&apos;t affect others. The coherence index checks behavioral
              consistency across four dimensions, making false positives less likely than
              single-score systems. And rebirth means you get another chance &mdash; you&apos;re not
              permanently banned, just set back.
            </p>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> An appeals mechanism has been designed
              (SAL-level multi-tier process with witness panels, evidence phases, and escalation
              to federation), but it hasn&apos;t been tested with real humans. The simulations
              assume perfect scoring; reality won&apos;t be so clean. See the{" "}
              <Link href="/aliveness" className="text-sky-400 hover:underline">Aliveness</Link> page
              for how appeals work.
            </p>
          </div>
        </div>

        {/* 4. Rich actors game the system */}
        <div id="risk-gaming" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">4.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">Rich actors game the system anyway</h3>
              <p className="text-gray-500 text-sm">Economic Attack Surface</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> ATP is non-transferable, so you
              can&apos;t buy reputation directly. But a well-funded organization could buy thousands
              of hardware devices, create thousands of identities, and slowly build legitimate-looking
              trust across all of them &mdash; a long-game Sybil attack.
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Nation-state actors and
              large corporations routinely invest millions in influence operations. If each fake
              identity costs $500 in hardware plus months of &ldquo;reputation farming,&rdquo;
              that&apos;s still pocket change for a well-funded adversary with strategic goals.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Coherence scoring detects
              behavioral patterns that are hard to fake at scale &mdash; genuine users develop
              organic interaction patterns that differ from coordinated bot farms. The economic
              cost is real: $500K for 1,000 identities, each needing months of activity. It&apos;s
              not impossible, but it&apos;s orders of magnitude harder than creating 1,000 email
              accounts.
            </p>
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-lg p-4 my-3">
              <p className="text-gray-300 text-sm mb-2">
                <strong className="text-gray-100">The numbers:</strong> Web4 simulations show that honest
                strategies yield ROI of ~0.93 while Sybil strategies yield ~0.90. The margin is small — but
                it&apos;s consistently in favor of honest behavior. More importantly, circular energy
                transfers (the simplest farming tactic) lose money: 30 circular transfers destroy ~150
                ATP (energy budget) through the 5% transfer fee. It&apos;s cheaper to just do good work.
              </p>
              <p className="text-gray-300 text-sm mt-2">
                <strong className="text-gray-100">Why coordinated attacks fail:</strong> Detection
                probability follows P = 1 − (1−p)<sup>N</sup> where N = conspirators. With 3
                witnesses per interaction (60% base detection), a solo attacker has a 40% chance of
                going undetected. Two conspirators? Only 16% undetected. Three or more? Under 7%.
                Meanwhile, the gain per conspirator <em>shrinks</em> as N grows (split the
                spoils). The math: <strong className="text-gray-100">coalitions become unprofitable
                at 2&ndash;3 members</strong> at current stake levels.
              </p>
            </div>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> Web4 raises the floor, not the ceiling. Casual
              abuse becomes uneconomical. Sophisticated, well-funded attacks remain possible.
              This is a design trade-off, not a flaw &mdash; but users should know the limit.
            </p>
          </div>
        </div>

        {/* 5. Hardware breaks or changes */}
        <div id="risk-hardware-loss" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">5.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">Your hardware breaks and you lose everything</h3>
              <p className="text-gray-500 text-sm">Device Loss &amp; Recovery</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> Your identity is bound to physical
              hardware. Phone stolen? Laptop destroyed in a fire? If you can&apos;t prove you&apos;re
              you without the device, you lose your accumulated trust, reputation, and access.
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> People lose devices
              constantly. Phones break, get stolen, or fall in water. Hardware security chips
              can&apos;t be cloned (that&apos;s the point), so backup is harder than copying a password.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Web4 supports{" "}
              <Link href="/identity-constellation" className="text-sky-400 hover:underline">identity constellations</Link> &mdash;
              multiple devices linked to the same identity. Lose one device and your other
              devices can still attest. Witnesses (trusted contacts who can vouch for you) provide
              an additional recovery path. The design explicitly plans for device loss.
            </p>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> Recovery from total device loss (all devices
              destroyed, no witnesses available) is an unsolved problem. The system makes this
              scenario unlikely through redundancy, but it can&apos;t make it impossible.
              This is an active area of research. See the{" "}
              <Link href="/lct-explainer" className="text-sky-400 hover:underline">LCT Explainer</Link>{" "}
              for the full device loss FAQ.
            </p>
          </div>
        </div>

        {/* 6. The witness network is compromised */}
        <div id="risk-witnesses" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">6.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">The witness network gets captured or corrupted</h3>
              <p className="text-gray-500 text-sm">Governance &amp; Trust Infrastructure</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> Witnesses validate identities and
              actions. If a majority of witnesses in a community collude or are compromised, they
              could approve fake identities, deny legitimate ones, or selectively punish users
              they don&apos;t like.
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Small networks are
              vulnerable to capture. A Web4 community with 50 members could be manipulated by
              10 colluding witnesses. Governments could compel witness nodes in their jurisdiction
              to censor identities. Corporate witnesses could prioritize their own interests.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> Federation means no
              single witness network has monopoly power. Users can participate in multiple
              communities with independent witness sets. Cross-community trust verification makes
              it harder to maintain a corrupt local network when external validators can
              flag inconsistencies.
            </p>
            <div className="bg-gray-800/60 border border-gray-700/50 rounded-lg p-4 my-3">
              <p className="text-gray-300 text-sm">
                <strong className="text-gray-100">Game theory check:</strong> Web4&apos;s adversarial
                simulations tested four attacker profiles — from low-skill opportunists (200 ATP budget)
                to nation-state actors (5,000 ATP, 5 coordinated agents). Key finding: when the stake
                for misbehavior exceeds 2&times; the expected gain, <strong className="text-gray-100">cooperation
                becomes the Nash-dominant strategy</strong>. At current parameters (200 ATP stakes + 3
                witnesses), rational, self-interested actors will cooperate rather than attack. Irrational
                actors (ideological saboteurs) can still attack but face consistent losses.
              </p>
            </div>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> Witness governance is one of the hardest unsolved
              problems. &ldquo;Who watches the watchmen?&rdquo; doesn&apos;t have a clean answer.
              Federation reduces the damage of any single compromised network, but doesn&apos;t
              prevent local corruption. Real-world deployment needs explicit governance
              mechanisms that don&apos;t exist in the current specification.
            </p>
          </div>
        </div>

        {/* 7. It doesn't scale */}
        <div id="risk-scale" className="mb-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">7.</span>
            <div>
              <h3 className="text-xl font-semibold text-amber-400">It works in simulations but not at real scale</h3>
              <p className="text-gray-500 text-sm">Scalability &amp; Performance</p>
            </div>
          </div>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-gray-100">The risk:</strong> The simulations on this site run
              with 12&ndash;50 agents. The real internet has billions of users. Trust-filtered
              message delivery, coherence scoring across four dimensions, and real-time witness
              verification all have computational costs that might not scale.
            </p>
            <p>
              <strong className="text-gray-100">Why it&apos;s real:</strong> Many systems that work
              beautifully at small scale collapse under real-world load. Blockchain demonstrated
              this painfully &mdash; Bitcoin processes ~7 transactions per second while Visa
              handles ~65,000. Web4&apos;s per-action trust computation could hit similar walls.
            </p>
            <p>
              <strong className="text-gray-100">What mitigates it:</strong> MRH (context boundaries)
              limits the trust computation to local neighborhoods &mdash; you don&apos;t need to
              verify trust against every user on the internet, just the ones in your current
              context. This is similar to how DNS scales: local resolution handles most queries
              without touching root servers.
            </p>
            <p className="text-amber-400/80 text-sm border-t border-gray-700 pt-3 mt-3">
              <strong>Honest assessment:</strong> Scalability is unproven. The architectural approach
              (local trust computation within bounded contexts) is sound in theory, but has never
              been tested at internet scale. The simulations prove the <em>mechanics</em> work,
              not the <em>engineering</em>.
            </p>
          </div>
        </div>
      </section>

      {/* The Uncomfortable Questions */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-100">
          The Uncomfortable Questions
        </h2>
        <p className="text-gray-400 mb-8">
          These aren&apos;t failure modes &mdash; they&apos;re design tensions that don&apos;t have
          clean answers.
        </p>

        <div className="space-y-6">
          {/* Joint value creation */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If ATP is non-transferable, how does collaboration work?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                When two people co-create something valuable, who gets the ATP reward? If
                Alice and Bob co-author a post, does each get the full reward? Half? Some
                other split?
              </p>
              <p>
                Current design: each participant earns ATP based on their individual contribution.
                But measuring individual contribution in collaborative work is a hard problem that
                Web4 inherits from every other attribution system (academic citations, open-source
                credit, etc.).
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Status:</strong> Partially designed. The specification supports contribution
                attestation but the details of fair attribution in group work are an open research
                question.
              </p>
            </div>
          </details>

          {/* Surveillance concern */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Doesn&apos;t behavioral scoring enable surveillance?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 tracks actions, measures consistency, and assigns trust scores. That sounds
                a lot like a social credit system. What stops it from becoming one?
              </p>
              <p>
                The key difference: Web4 scores are <strong>context-bound and decentralized</strong>.
                Your trust in a coding community is separate from your trust in a cooking forum.
                No single entity sees your complete behavioral profile. MRH (context boundaries)
                prevents trust information from leaking across contexts without your consent.
              </p>
              <p>
                But the concern is legitimate. Any behavioral scoring system <em>can</em> be
                misused. The architecture resists centralized surveillance by design, but a
                sufficiently powerful actor who compromises multiple contexts could correlate
                identities across boundaries.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Status:</strong> The privacy architecture is designed but the tension between
                &ldquo;enough information to compute trust&rdquo; and &ldquo;not enough to enable
                surveillance&rdquo; is fundamental and unresolved.
              </p>
            </div>
          </details>

          {/* Newcomer disadvantage */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Do newcomers always start at a disadvantage?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                You start with 100 ATP and 0.5 trust. Established members have higher trust,
                more ATP reserves, and richer histories. Does Web4 create an entrenched elite
                that&apos;s impossible for newcomers to challenge?
              </p>
              <p>
                The design tries to prevent entrenchment: trust scores aren&apos;t cumulative
                forever (they reflect recent behavior), and ATP has ongoing maintenance costs
                (everyone &ldquo;decays&rdquo; toward zero without active contribution).
                Established members who stop contributing lose their advantages.
              </p>
              <p>
                But newcomer friction is real. In every reputation system, being new means
                being untrusted. Web4 tries to make the path from &ldquo;new and untrusted&rdquo;
                to &ldquo;established and trusted&rdquo; faster and fairer than today&apos;s internet
                (where the path is often &ldquo;impossible without connections&rdquo;).
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Status:</strong> Simulations show newcomers can reach full trust within
                a few lives of consistent behavior. Whether this is fast enough to feel fair
                is a question real-world testing would need to answer.
              </p>
            </div>
          </details>

          {/* Hardware standard changes */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What happens when hardware standards change?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                TPM 2.0 will eventually become TPM 3.0. Quantum computing may break current
                cryptographic assumptions. When the underlying hardware standard changes, does
                everyone&apos;s identity need to migrate?
              </p>
              <p>
                Yes, eventually. The specification is designed to be attestation-method-agnostic &mdash;
                a new hardware standard can be added alongside existing ones. During transitions,
                both old and new attestation methods would be accepted. Identity migration would
                use the existing multi-device recovery flow: attest your new device while your old
                device is still valid.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Status:</strong> The architecture supports graceful migration in theory.
                In practice, coordinating a hardware transition across millions of users while
                maintaining trust continuity has never been tested.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* What's Genuinely Unsolved */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-100">
          What&apos;s Genuinely Unsolved
        </h2>
        <p className="text-gray-400 mb-8">
          These are open research problems. We&apos;re not hiding them &mdash; we&apos;re working on them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Witness Bootstrapping</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              How does the first witness network form? A composite model has been formalized
              (escrow + sponsor + graduated capabilities create a 3-factor barrier), but
              no single approach suffices. The trade-off between accessibility and Sybil
              resistance at genesis is an active research area.
            </p>
          </div>

          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Appeals &amp; Dispute Resolution</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              When the system scores you unfairly, how do you contest it? A multi-tier appeals
              mechanism has been designed (file → review → evidence → hearing → verdict), but
              it hasn&apos;t been tested with real humans. The hard question: can the anti-gaming
              protections prevent people from abusing appeals to escape legitimate consequences?
            </p>
          </div>

          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Governance at Scale</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Who decides the rules? A Society-Authority-Law (SAL) framework has been designed
              with law oracles, auditors, and fractal citizenship. But decentralized governance
              at internet scale — where communities disagree on fundamental values — is a
              challenge no system has fully solved.
            </p>
          </div>

          <div className="bg-red-950/30 border border-red-800/30 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold mb-2">Real-World Validation</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Simulations prove the mechanics work in principle. Whether they work with real
              humans, real incentives, and real adversaries is an empirical question that
              requires deployment to answer. A 5-tier{" "}
              <Link href="/why-web4" className="text-sky-400 hover:underline">
                incremental adoption pathway
              </Link>{" "}
              (wrapper → observable → accountable → federated → native) has been designed so
              teams can adopt gradually and validate at each step — but no one has walked the
              full path yet.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Published This */}
      <section className="max-w-4xl mx-auto mt-16 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-800/30 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-amber-400 mb-3">
            Why publish your own failure analysis?
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            Because a project about <em>trust</em> that hides its weaknesses is undermining
            its own thesis. If trust comes from verifiable honesty, then we should be honest
            about what we don&apos;t know and what could fail.
          </p>
          <p className="text-gray-400 leading-relaxed text-sm">
            The{" "}
            <Link href="/why-web4" className="text-sky-400 hover:underline">Why Web4</Link>{" "}
            page makes the case <em>for</em> this approach. This page makes the case <em>against</em> it.
            Read both and decide for yourself.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="max-w-4xl mx-auto mt-12 flex flex-col sm:flex-row gap-4">
        <Link
          href="/why-web4"
          className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          &larr; Why Web4 (The Case For)
        </Link>
        <Link
          href="/threat-model"
          className="flex-1 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors text-center"
        >
          Technical Threat Model &rarr;
        </Link>
      </section>

      <ExplorerNav currentPath="/what-could-go-wrong" />
      <RelatedConcepts currentPath="/what-could-go-wrong" />
    </>
  );
}
