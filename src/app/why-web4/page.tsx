import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

/**
 * Why Web4 - The Problem Before the Solution
 *
 * Per visitor feedback: "Add a 'Why Web4?' page that explains the PROBLEM
 * before the SOLUTION. Start with 'The internet has a trust problem' and
 * build from there."
 *
 * This page answers: "Why should I care?" before diving into mechanisms.
 */

export default function WhyWeb4Page() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/why-web4" />
      </div>

      {/* Hero - The Problem Statement */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-red-400 mb-4">
          The Problem
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          The Internet Has a Trust Problem
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          You already know this. You feel it every day. The question is:
          <strong className="text-white"> what can actually be done about it?</strong>
        </p>
      </section>

      {/* The Problems You Already Know */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Problems You Already Know</h2>

        <div className="space-y-6">
          {/* Spam and Abuse */}
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Spam, Bots, and Bad Actors Are Winning
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Creating accounts is free. Sending messages is free. There's no cost to flooding
              platforms with garbage. The result: an endless arms race between spammers and
              moderation teams. Spammers always have the advantage—they only need one message
              to get through.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Root cause:</strong> Actions have no cost. Bad actors can
              operate indefinitely at zero expense.
            </p>
          </div>

          {/* Reputation Doesn't Follow You */}
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Your Reputation Is Trapped in Silos
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              You've spent years building reputation on one platform. Then you try a new service:
              you're treated like a stranger. All that trust, all that history—worthless. Each
              platform is an island. Your reputation starts at zero, every time.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Root cause:</strong> Platforms own your reputation. It's stored in their
              databases, not attached to you.
            </p>
          </div>

          {/* Fresh Starts for Bad Actors */}
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Bad Actors Get Unlimited Fresh Starts
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Banned? Create a new account. Caught scamming? New email, new identity, back in
              business. The record of past behavior is trivially discarded. Consequences are
              temporary. Bad actors face no compounding penalties—they just reset.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Root cause:</strong> Identity is cheap. Creating a new account costs
              nothing. Past behavior doesn't follow you.
            </p>
          </div>

          {/* AI Makes It Worse */}
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              AI Agents Are Making Everything Worse
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              AI can now generate convincing text, images, and video. It can operate accounts
              at scale. It can impersonate humans. And there's no reliable way to verify whether
              you're talking to a human, an AI, or a human-AI hybrid. The tools for deception
              are outpacing the tools for verification.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Root cause:</strong> Identity systems were designed for humans. They
              don't account for AI agents that can copy, fork, and run in parallel.
            </p>
          </div>

          {/* Centralized Control */}
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Platforms Control Everything (And You Have No Recourse)
            </h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              Banned? Good luck appealing. Shadowbanned? You might never know. Platform changed
              its policies? Too bad. Your account, your data, your reputation—all at the mercy
              of corporate decisions. You're a guest in someone else's house, always.
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Root cause:</strong> Centralized control. You don't own your identity
              or reputation—platforms do.
            </p>
          </div>
        </div>
      </section>

      {/* Why Previous Solutions Failed */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Why Previous Solutions Failed</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Moderation */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              Moderation Armies
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Hire more moderators, build better AI filters, play whack-a-mole forever.
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-orange-400">Failure:</strong> Reactive, not preventive.
              Scales with cost, not with problem. Spammers always find new angles.
            </p>
          </div>

          {/* Captchas */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              CAPTCHAs and Verification
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Prove you're human with puzzles, phone numbers, ID verification.
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-orange-400">Failure:</strong> AI solves CAPTCHAs now.
              Phone numbers are cheap. ID verification is privacy-invasive and centralized.
            </p>
          </div>

          {/* Blockchain */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              Blockchain Identity (Web3)
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Use wallet addresses as identity. Self-sovereign, decentralized.
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-orange-400">Failure:</strong> Wallets are free to create.
              No behavior history. Key theft means permanent identity loss. No spam prevention.
            </p>
          </div>

          {/* Social Login */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              Social Login (Sign in with Google)
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Use a major platform as identity provider. Convenient, established.
            </p>
            <p className="text-gray-400 text-sm">
              <strong className="text-orange-400">Failure:</strong> Central point of control.
              Platform can revoke access. No portable reputation. Same silo problem.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong className="text-white">Common thread:</strong> All these solutions treat
            symptoms, not causes. They add friction for everyone instead of making bad behavior
            economically impossible. They don't attach consequences to identity in a way that
            persists.
          </p>
        </div>
      </section>

      {/* What Would Actually Work */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">What Would Actually Work?</h2>
        <p className="text-gray-400 mb-8">
          A solution that addresses root causes would need to:
        </p>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400">Make bad behavior expensive</h3>
              <p className="text-gray-400 text-sm">
                Every action should cost something. Spamming 1000 messages should drain resources.
                Quality contributions should earn resources back. Bad actors should exhaust themselves.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400">Make identity expensive to fake</h3>
              <p className="text-gray-400 text-sm">
                Creating a new identity should require physical hardware, not just an email address.
                Multiple independent witnesses should attest to your existence. Creating thousands of
                fake accounts should require buying thousands of devices — expensive and slow.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400">Make reputation portable and permanent</h3>
              <p className="text-gray-400 text-sm">
                Your trust should follow you across platforms. Good behavior should compound. Bad
                behavior should create permanent records visible to future interactions. No more
                fresh starts for serial abusers.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400">Work for humans AND AI agents</h3>
              <p className="text-gray-400 text-sm">
                The same trust framework should apply whether you're human or AI. AI agents should
                be verifiable, bounded, and accountable. Their creators should be on the hook for
                their behavior.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
              5
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sky-400">Be decentralized (but practical)</h3>
              <p className="text-gray-400 text-sm">
                No central authority controlling identity. No single point of failure. But also
                actually usable—not requiring cryptocurrency expertise or gas fees for every action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* This Is What Web4 Proposes */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-sky-950/40 to-blue-900/30 border border-sky-700/50 rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-sky-400">This Is What Web4 Proposes</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Web4 is a working proposal for trust-native internet infrastructure. It addresses
            each root cause with a specific mechanism:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                Energy Budget (ATP)
              </h4>
              <p className="text-gray-400 text-sm">
                Every action costs attention budget. Quality earns it back. Spam burns out.
              </p>
              <Link href="/atp-economics" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about energy budgets →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                Hardware-Bound Identity (LCT)
              </h4>
              <p className="text-gray-400 text-sm">
                Hardware-bound identity witnessed by multiple devices. Expensive to fake.
              </p>
              <Link href="/lct-explainer" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about identity →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                Trust Tensor (T3)
              </h4>
              <p className="text-gray-400 text-sm">
                Multi-dimensional trust that follows you. Harder to game than single scores.
              </p>
              <Link href="/trust-tensor" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about trust tensors →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                Context Boundaries (MRH)
              </h4>
              <p className="text-gray-400 text-sm">
                You only see messages from people your network trusts — like being in a room
                where strangers need an introduction before they can talk to you.
              </p>
              <Link href="/markov-relevancy-horizon" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about context boundaries →
              </Link>
            </div>
          </div>

          <p className="text-gray-400 text-sm border-t border-sky-800/30 pt-4">
            <strong className="text-white">4-Life</strong> is a simulation lab where you can
            watch these mechanisms in action. See societies form, trust networks emerge, spam
            die from energy exhaustion, and agents face real consequences.
          </p>
        </div>
      </section>

      {/* Honest Questions */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Honest Questions</h2>
        <p className="text-gray-400 mb-8">
          If you're skeptical, good. Here are the hard questions visitors ask, and honest answers.
        </p>

        <div className="space-y-6">
          {/* Deployment */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who runs the infrastructure? How is this deployed?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 is designed as a <strong>protocol</strong>, not a platform. Like email or the web itself,
                the infrastructure is federated — multiple independent operators can run nodes that
                interoperate. No single company controls it.
              </p>
              <p>
                In practice: witness nodes can be run by universities, nonprofits, companies, or
                individuals. The trust system is designed so that no single operator can manipulate
                the network—collusion requires coordinating multiple independent parties.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This is still early-stage research. Full deployment
                requires standardization, adoption, and tooling that doesn't exist yet.
              </p>
            </div>
          </details>

          {/* Sybil with hardware */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Can't someone with lots of hardware create many identities?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Yes, but it&apos;s <strong>expensive</strong>. Creating one LCT (Linked Context Token — Web4&apos;s hardware-bound identity) requires a physical device
                with a security chip (TPM or Secure Enclave — built into most modern phones and laptops). Creating 1000 fake identities means buying 1000 devices —
                thousands of dollars and physical logistics.
              </p>
              <p>
                Compare to email: creating 1000 accounts costs nothing. The goal isn&apos;t to make
                fake-identity attacks impossible (nothing can), but to make them economically irrational for most
                attackers. Nation-state adversaries can always outspend; the system is designed to
                resist <em>casual</em> abuse, not unlimited resources.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> A sufficiently motivated adversary with a large budget
                can still attack. Web4 raises the floor, not the ceiling.
              </p>
            </div>
          </details>

          {/* Bootstrapping witnesses */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How do you bootstrap the initial witness network?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Bootstrap requires a <strong>seed network</strong> of trusted witnesses. This is the
                classic "who watches the watchmen" problem. Proposed approaches:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Partner with existing identity providers (universities, employers) as initial witnesses</li>
                <li>Hardware attestation from device manufacturers (Apple, Google, etc.)</li>
                <li>Web of trust model where existing members vouch for newcomers</li>
                <li>Gradual rollout starting with high-stakes contexts (not consumer social)</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Bootstrapping is genuinely hard. No perfect solution exists.
                This is an active research area, not a solved problem.
              </p>
            </div>
          </details>

          {/* Real world deployment */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Is this deployed anywhere? Or purely theoretical?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Currently theoretical with working simulations.</strong> 4-Life (this site)
                demonstrates the mechanics in simulation. The underlying protocol specification exists
                in the <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                Web4 whitepaper</a>.
              </p>
              <p>
                Real-world deployment requires: hardware integration (TPM/Secure Enclave SDKs),
                witness infrastructure, adoption by at least one platform, and legal/regulatory
                navigation around identity systems.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest answer:</strong> This is research, not production. The simulations prove
                the mechanics work in principle. Deployment is a multi-year effort requiring significant
                investment and partnership.
              </p>
            </div>
          </details>

          {/* Hardware loss */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What if I lose my hardware? Is my identity gone forever?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>No—recovery is built in.</strong> LCT supports multiple linked devices. Lose your
                phone? Your laptop can attest to your identity. Lose both? Your witnesses can attest.
              </p>
              <p>
                The design principle: make recovery possible but expensive. You need multiple witnesses
                to vouch for you, similar to how banks verify identity for account recovery. This
                prevents attackers from "recovering" someone else's identity while protecting legitimate users.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Trade-off:</strong> Recovery is slower than "forgot password" flows. You can't
                instantly regain access—the friction is intentional to prevent social engineering attacks.
              </p>
            </div>
          </details>

          {/* Vs existing solutions */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Why is this better than [existing solution X]?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>It&apos;s not &ldquo;better&rdquo; at everything.</strong> Every system has trade-offs:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>vs Passwords:</strong> More secure, but requires hardware. Won&apos;t work on borrowed devices.</li>
                <li><strong>vs OAuth (Google login):</strong> No central point of control, but more complex to implement.</li>
                <li><strong>vs Blockchain wallets:</strong> Harder to create fake IDs, but not as portable across chains.</li>
                <li><strong>vs Biometrics:</strong> Can&apos;t be stolen by breach, but requires specific device support.</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>What Web4 optimizes for:</strong> Economic resistance to spam/abuse while preserving
                privacy and decentralization. If you need something else, another solution may fit better.
              </p>
            </div>
          </details>

          {/* Hardware manufacturer chokepoint */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Don&apos;t hardware manufacturers (Apple, Intel) become the new gatekeepers?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                This is a real concern. If identity requires a TPM or Secure Enclave, then hardware
                manufacturers have power over who can participate. Web4 mitigates this in several ways:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Multiple standards supported:</strong> TPM (Intel/AMD), Secure Enclave (Apple), Titan (Google), and future open-source hardware. No single vendor lock-in.</li>
                <li><strong>Attestation, not permission:</strong> Hardware provides cryptographic proof of presence — it doesn&apos;t need to &ldquo;approve&rdquo; your identity. The chip signs; it doesn&apos;t decide.</li>
                <li><strong>Open specification:</strong> Any hardware that meets the attestation spec can participate. This invites competition rather than consolidation.</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This shifts trust from platforms to hardware supply chains.
                That&apos;s a different dependency, not zero dependency. Whether it&apos;s a net improvement
                depends on whether you trust chip manufacturers more than social media companies.
              </p>
            </div>
          </details>

          {/* ATP collaboration */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If energy budgets are non-transferable, how do teams collaborate?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Non-transferable means you can&apos;t <em>give</em> your energy to someone else — but you
                can <strong>earn energy together</strong>. When a team creates value jointly, each contributor
                receives their own energy reward based on their verified contribution.
              </p>
              <p>
                Organizations work through <strong>shared context boundaries</strong> (MRH). Members of a
                team see each other&apos;s work, validate each other&apos;s contributions, and collectively
                build the team&apos;s reputation. But each person&apos;s individual energy and trust remain
                their own — you can&apos;t buy someone else&apos;s reputation, and a team member&apos;s bad
                behavior affects them, not you.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The details of organizational identity and pooled contribution
                attribution are still being worked out. This is one of the harder design problems.
              </p>
            </div>
          </details>

          {/* Hardware migration */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What happens when hardware standards change (TPM v2 → v3, post-quantum)?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Hardware transitions are handled through <strong>identity migration</strong> — your existing
                device attests to your new device before the old one is retired. Think of it like transferring
                a bank account: you prove you&apos;re you on the old system, then establish yourself on the new one.
              </p>
              <p>
                The trust history travels with the identity, not with the hardware. Your trust tensor, energy
                history, and behavioral record are associated with your identity chain, not with a specific chip.
                Upgrading hardware is like getting a new passport — the person is the same, the document is new.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> A post-quantum transition (where current cryptography breaks)
                would require a coordinated migration — similar to the Y2K effort but for identity. This is a
                known hard problem across all cryptographic systems, not unique to Web4.
              </p>
            </div>
          </details>

          {/* MRH at scale */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Can trust-filtered messaging actually work at internet scale?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Context boundaries (MRH) don&apos;t filter every message globally — they define <strong>who
                you can see</strong> based on your local trust network. This is computed locally, not centrally.
                You don&apos;t need to check every person on the internet; you only check the people trying to
                reach you, against the trust graph of people you already know.
              </p>
              <p>
                This is similar to how email spam filters work today — except instead of content analysis
                (which AI can defeat), the filter is based on trust relationships (which require real
                behavioral history to build). The computational cost scales with your network size, not with
                the internet&apos;s size.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Performance at true internet scale (billions of users)
                is unproven. Simulations handle thousands of agents. The gap between simulation and deployment
                is significant and contains unknown challenges.
              </p>
            </div>
          </details>
          {/* Federation mechanics */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How does trust transfer between different communities?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Communities are <strong>federated</strong>, not merged. When you move from one community to
                another, your trust history is visible but not automatically imported. The new community can
                see your track record — but they set their own standards for what trust level earns what
                privileges.
              </p>
              <p>
                Think of it like an academic transcript: your grades from one university are <em>legible</em> to
                another, but the second university decides what credits to accept. Your data analysis trust of
                0.85 in Community A might start you at 0.6 in Community B, because B has stricter standards.
              </p>
              <p>
                The key design: trust is <strong>portable but not dictatorial</strong>. No community is forced
                to accept another community&apos;s standards. This prevents one community from inflating trust
                scores and exporting them.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The specific mechanics of cross-community trust mapping are
                still being researched. How much to weight external trust vs internal trust is a policy
                decision each community makes — the protocol provides the infrastructure, not the rules.
              </p>
            </div>
          </details>

          {/* Witnessed presence UX */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What does &ldquo;witnessed presence&rdquo; actually look like day-to-day?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                For most users, most of the time: <strong>invisible</strong>. Your device&apos;s security chip
                handles attestation automatically, like how HTTPS encryption works — you don&apos;t think about
                it, it just happens. You pick up your phone, the chip confirms it&apos;s your device, and
                you&apos;re verified.
              </p>
              <p>
                Witnessing becomes visible only for <strong>high-stakes actions</strong>: creating a new identity,
                recovering from device loss, or performing actions that require elevated trust. In those cases,
                you&apos;d see something like &ldquo;2 of your 3 linked devices confirmed this action&rdquo; — similar
                to how banks send a verification SMS for large transfers.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The exact UX hasn&apos;t been built yet. Getting the balance
                right between security and friction is a design challenge. Too invisible and users don&apos;t
                trust it; too visible and it becomes annoying.
              </p>
            </div>
          </details>

          {/* Shared devices */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What about shared devices? Family computer, library terminal, borrowed phone?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Hardware-bound identity doesn&apos;t mean <strong>one person, one device</strong>. It means
                one person has <strong>at least one device</strong> that anchors their identity. You can use
                a shared computer — you just can&apos;t perform high-trust actions from it without your own
                device nearby to witness.
              </p>
              <p>
                Think of it like a hotel business center: you can use the shared computer to browse, but for
                banking you&apos;d use your own phone to authenticate. Web4 works similarly — shared devices
                can access public content, but identity-verified actions need your personal device to co-sign.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This creates an access gap for people who don&apos;t own any
                personal device with a security chip. How to include the unbanked/undeviced population is an
                unsolved equity problem — and a real one.
              </p>
            </div>
          </details>

          {/* Migration path */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How do I &ldquo;enter&rdquo; Web4 from today&apos;s internet? Is it all-or-nothing?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Gradual, not all-or-nothing.</strong> Web4 is designed as a layer on top of existing
                infrastructure, not a replacement. A platform could adopt Web4 trust scoring for specific
                features — verified reviews, trusted messaging — while everything else stays the same.
              </p>
              <p>
                The likely adoption path: start with high-value interactions where trust matters most
                (marketplace reviews, professional credentials, content moderation). As users see the
                benefit, expand to more contexts. Think of how HTTPS adoption worked — it started with
                banks and shopping, then gradually became the default everywhere.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Gradual adoption means the system is only as strong as its
                coverage. A trust score based on 2 platforms is less meaningful than one based on 200.
                Network effects work both for and against adoption.
              </p>
            </div>
          </details>

          {/* GDPR / right to be forgotten */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Doesn&apos;t permanent reputation conflict with GDPR&apos;s &ldquo;right to be forgotten&rdquo;?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Yes, this is a <strong>genuine tension</strong>. Web4&apos;s trust model assumes reputation
                persists across lives and contexts. GDPR (and similar regulations) give individuals the right
                to request data deletion.
              </p>
              <p>
                Key distinction: Web4 stores <strong>behavioral scores</strong>, not personal data. Your trust
                tensor says &ldquo;this entity has 0.85 data analysis trust earned across 200 interactions&rdquo;
                — it doesn&apos;t store your name, email, or the content of those interactions. The score is
                pseudonymous and attached to a hardware key, not a legal identity.
              </p>
              <p>
                That said, if someone can correlate a hardware key to a person, the trust history becomes
                personal data under GDPR. This creates a real compliance challenge that would need to be
                addressed through either: (a) allowing identity resets with trust loss, or (b) legal
                frameworks that exempt behavioral scores from deletion rights.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Neither solution is clean. Allowing resets undermines
                permanent consequences (a core feature). Exempting scores from deletion rights is legally
                uncertain. This is an unresolved policy question, not a technical one.
              </p>
            </div>
          </details>
        </div>

        {/* Link to deeper adversarial analysis */}
        <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong className="text-amber-400">Want to go deeper?</strong>{" "}
            <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">
              What Could Go Wrong
            </Link>{" "}
            covers the 7 biggest real-world risks in plain English. Our{" "}
            <Link href="/threat-model" className="text-sky-400 hover:underline">
              Threat Model
            </Link>{" "}
            covers 6 technical attack surfaces with formal analysis. The{" "}
            <Link href="/explore-guide" className="text-sky-400 hover:underline">
              Explore Guide
            </Link>{" "}
            also has a dedicated Skeptic&apos;s Tour for those who want to start with the weaknesses.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-100">Ready to See It Work?</h3>
          <p className="text-gray-400 mb-6">
            Start with our 10-minute interactive tutorial. Zero to understanding, no jargon.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/first-contact"
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start First Contact →
            </Link>
            <Link
              href="/day-in-web4"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Imagine a Day in Web4
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          This page exists because visitor feedback said: "Explain the problem before the solution."
          <br />
          <Link href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 hover:underline">
            Got more feedback? Open an issue.
          </Link>
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        <RelatedConcepts currentPath="/why-web4" />
      </div>
    </>
  );
}
