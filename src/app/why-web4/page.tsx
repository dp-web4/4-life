import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";

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
      <PageTracker slug="why-web4" />
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
          <p className="text-gray-300 leading-relaxed mb-4">
            Web4 is a working proposal for trust-native internet infrastructure. It addresses
            each root cause with a specific mechanism:
          </p>
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Four ideas, introduced one at a time below</p>
            <p className="text-xs text-gray-500">
              Each concept is explained in plain English with its own card. Don&apos;t worry about acronyms — they&apos;re just shorthand. The ideas are what matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                1. Energy Budget
              </h4>
              <p className="text-gray-400 text-sm">
                Every action costs energy from a personal budget. Quality contributions earn energy back. Spam burns through it with no return — spammers literally run out of fuel.
              </p>
              <p className="text-gray-500 text-xs mt-1">Shorthand: ATP (Allocation Transfer Packets)</p>
              <Link href="/atp-economics" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about energy budgets →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                2. Hardware-Bound Identity
              </h4>
              <p className="text-gray-400 text-sm">
                Your identity is tied to your device&apos;s security chip — the same kind that protects Face ID and fingerprints. Creating a fake identity means buying a new physical device. Multiple devices witness each other for extra security.
              </p>
              <p className="text-gray-500 text-xs mt-1">Shorthand: LCT (Linked Context Token)</p>
              <Link href="/lct-explainer" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about identity →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                3. Multi-Dimensional Trust
              </h4>
              <p className="text-gray-400 text-sm">
                Instead of one trust score, you get separate scores for your skills, your training, and your behavior — and they&apos;re different for each role. Your trust as a data analyst doesn&apos;t affect your trust as a cook.
              </p>
              <p className="text-gray-500 text-xs mt-1">Shorthand: T3 (Trust Tensor — Talent, Training, Temperament)</p>
              <Link href="/trust-tensor" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about trust →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                4. Trust Neighborhood
              </h4>
              <p className="text-gray-400 text-sm">
                You only see messages from people your network trusts — like being in a room
                where strangers need an introduction before they can talk to you. Trust fades with distance: a friend-of-a-friend-of-a-friend is almost a stranger.
              </p>
              <p className="text-gray-500 text-xs mt-1">Shorthand: MRH (Markov Relevancy Horizon)</p>
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

        {/* Most asked — top 5 for first-time visitors */}
        <h3 className="text-sm uppercase tracking-wide text-amber-400/80 mb-4">Most asked</h3>
        <div className="space-y-4 mb-10">
          {/* Status */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Is this deployed anywhere? Or purely theoretical?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Research prototype with substantial implementation.</strong> This is not vaporware &mdash;
                there is real, tested code. But it&apos;s not a product yet. Here&apos;s what actually exists:
              </p>
              <p><strong>What&apos;s built and tested:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Protocol specification:</strong> 100+ page{" "}
                  <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  Web4 whitepaper</a> with formal definitions</li>
                <li><strong>Reference implementations:</strong> ~47,000 lines of tested code &mdash; LCT lifecycle, T3/V3 tensors, ATP metering, governance (SAL), federation, witness protocol, MRH graphs</li>
                <li><strong>Security validation:</strong> 424 attack vectors across 84 tracks, all defended. Sybil resistance formally proven (5 theorems). Incentive compatibility proven &mdash; honest behavior is mathematically more profitable than gaming</li>
                <li><strong>Hardware integration:</strong> TPM2 binding validated (Intel TPM 2.0, EK certificate chain through 2049). Go LCT library (55 tests). Multi-device constellation enrollment working</li>
                <li><strong>System integration:</strong> End-to-end pipeline (all subsystems chained), WASM browser validator for client-side trust verification, federation consensus at 38.5 tasks/sec throughput</li>
                <li><strong>Interactive simulations:</strong>{" "}
                  <Link href="/society-simulator" className="text-sky-400 hover:underline">
                  Society Simulator</Link>,{" "}
                  <Link href="/playground" className="text-sky-400 hover:underline">
                  Playground</Link>, and{" "}
                  <Link href="/karma-journey" className="text-sky-400 hover:underline">
                  Karma Journey</Link> on this site</li>
              </ul>
              <p className="mt-2"><strong>What&apos;s NOT built yet:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Production deployment:</strong> No live network with real users. The gap between &ldquo;simulations prove mechanics work&rdquo; and &ldquo;running with real humans&rdquo; is the current frontier</li>
                <li><strong>Economic validation:</strong> ATP pricing calibrated for simulations, not real markets. Whether the economics survive real human behavior is an open question</li>
                <li><strong>Platform adoption:</strong> No platform integrates Web4 yet. The 5-tier adoption pathway (Wrapper → Observable → Accountable → Federated → Native) is designed but untested</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest answer:</strong> This is research, not production. We don&apos;t attach timelines because honest
                research doesn&apos;t have them. The simulations prove the mechanics work in principle — the question is
                whether the economics survive contact with real human behavior. That&apos;s what a pilot would test.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                <strong>In software terms:</strong> The specification is complete. The reference code is <em>proof-of-concept</em> quality
                (tested, but not hardened for production). What&apos;s needed next is a <em>pilot</em> (alpha)
                with real users — the gap between &ldquo;simulations prove it works&rdquo; and &ldquo;running
                with real humans&rdquo; is the current frontier.
              </p>
            </div>
          </details>

          {/* Hardware loss */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
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
                prevents attackers from &ldquo;recovering&rdquo; someone else&apos;s identity while protecting legitimate users.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Trade-off:</strong> Recovery is slower than &ldquo;forgot password&rdquo; flows. You can&apos;t
                instantly regain access—the friction is intentional to prevent social engineering attacks.
              </p>
            </div>
          </details>

          {/* Comparison */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
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

          {/* Transition */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How does the transition work? Do I have to switch everything at once?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Gradual, not all-or-nothing.</strong> The Web4 spec defines a 5-tier adoption pathway —
                each tier is independently useful, and you don&apos;t need to commit to the full stack:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-400">
                <li><strong>Wrapper:</strong> Add a verifiable identity to your existing system. Zero code changes. <span className="text-gray-500">(Like adding HTTPS to an existing site)</span></li>
                <li><strong>Observable:</strong> Start tracking trust based on actual behavior. <span className="text-gray-500">(Like the browser padlock icon — visible trust signals)</span></li>
                <li><strong>Accountable:</strong> Stake energy on quality. Good work returns your investment; bad work costs you. <span className="text-gray-500">(Like spam filters that actually work)</span></li>
                <li><strong>Federated:</strong> Your reputation travels with you across platforms. <span className="text-gray-500">(Like email&apos;s federated model)</span></li>
                <li><strong>Native:</strong> Full Web4 stack — built from the ground up around verifiable trust.</li>
              </ol>
              <p>
                Tiers 0–3 are reversible — you can always roll back. Only Tier 4 (full native) is a
                permanent commitment. Think of how HTTPS adoption worked: banks first, then e-commerce,
                then eventually the default everywhere.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Gradual adoption means the system is only as strong as its
                coverage. A trust score based on 2 platforms is less meaningful than one based on 200.
                Network effects work both for and against adoption.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Want a concrete example? See &ldquo;What&apos;s the concrete adoption path?&rdquo; in the
                deeper questions below for a Discord and Stack Overflow walkthrough.
              </p>
            </div>
          </details>

          {/* Equity */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What about people who can&apos;t afford devices with security chips?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>This is a real equity concern, not a dismissed one.</strong> If participation requires a TPM
                or Secure Enclave, then cost becomes a barrier. Several factors work in favor of accessibility:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Hardware is already widespread:</strong> Most phones sold since ~2018 include security chips (Secure Enclave, Titan, TPM). Even budget Android devices increasingly ship with hardware-backed keystores. The threshold is a $50 phone, not a $1000 one.</li>
                <li><strong>FIDO2 security keys:</strong> USB-based keys like YubiKey cost ~$25 and work with any computer. A single key can anchor an identity without needing a modern phone.</li>
                <li><strong>Community witnessing:</strong> In regions where personal device ownership is low, shared community devices + witness-based attestation can bridge the gap. A village elder or community center can attest to presence.</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> None of these fully solve the problem. The most marginalized populations —
                those without any device access — would need some form of sponsored onboarding. Web4 is not unique
                here: every digital system faces this. But a system that claims to be trust-native must take equity
                seriously, not hand-wave it. This remains an active design priority.
              </p>
            </div>
          </details>
          {/* Newcomer vs established liar */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If someone powerful lies about me and I&apos;m new, does my truth even matter?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Yes — and here&apos;s how.</strong> In Web4, a single accusation from even a high-trust
                entity doesn&apos;t override your track record. Trust is built from <em>all</em> your interactions,
                not from one person&apos;s claim about you. An established member saying &ldquo;this newcomer is
                untrustworthy&rdquo; is <strong>one data point</strong> — it lowers their trust in you, but
                doesn&apos;t destroy your trust score globally.
              </p>
              <p>
                Several mechanisms protect newcomers specifically:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Context boundaries (MRH):</strong> The liar&apos;s accusation only propagates within
                  their local trust network, not the entire system. People outside their network never see it.</li>
                <li><strong>Behavioral evidence outweighs claims:</strong> If you consistently produce quality work,
                  your V3 scores from <em>recipients</em> build your reputation independently of the accuser&apos;s
                  narrative. Actions speak louder than accusations.</li>
                <li><strong>Accuser accountability:</strong> Making false accusations costs the accuser credibility.
                  If their negative assessments consistently disagree with everyone else&apos;s experience of you,
                  the accuser&apos;s <em>own</em> Veracity score drops. Lying is expensive.</li>
                <li><strong>Multiple trust dimensions:</strong> T3 separates Talent, Training, and Temperament.
                  Even if someone attacks your Temperament (&ldquo;they&apos;re unreliable&rdquo;), your Talent
                  and Training scores remain based on your actual work quality.</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Newcomers <em>are</em> more vulnerable. With only a few interactions,
                a single negative assessment carries more weight relative to your thin history. The system gradually
                gets more resistant to manipulation as you build more evidence. The first ~30 actions are the most
                fragile period. This is a real design tradeoff: making newcomers more robust to attack would also
                make it easier for Sybil attackers to quickly establish credibility.
              </p>
            </div>
          </details>

          {/* Social credit system comparison */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Isn&apos;t this just a social credit system?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Fair question. Both Web4 and social credit systems track behavior and assign scores.
                But the differences are fundamental:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-gray-400 mt-2">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 pr-4 text-gray-300"></th>
                      <th className="text-left py-2 pr-4 text-red-400">Social Credit</th>
                      <th className="text-left py-2 text-green-400">Web4</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-300 font-medium">Who controls it?</td>
                      <td className="py-2 pr-4">Central government</td>
                      <td className="py-2">Nobody — federated protocol, no central authority</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-300 font-medium">What&apos;s scored?</td>
                      <td className="py-2 pr-4">Obedience to state rules</td>
                      <td className="py-2">Quality of contributions (rated by recipients, not authorities)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-300 font-medium">Can you leave?</td>
                      <td className="py-2 pr-4">No — mandatory for citizens</td>
                      <td className="py-2">Yes — voluntary participation, join/leave any society</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-300 font-medium">Who sees your score?</td>
                      <td className="py-2 pr-4">Government and anyone they share with</td>
                      <td className="py-2">Only entities within your trust network (MRH-bounded)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-gray-300 font-medium">Can you appeal?</td>
                      <td className="py-2 pr-4">Through government channels</td>
                      <td className="py-2">Through community governance (SAL) — you can also fork the community</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-gray-300 font-medium">Identity</td>
                      <td className="py-2 pr-4">Real name, tied to national ID</td>
                      <td className="py-2">Pseudonymous — hardware key, not your name</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">
                The core difference: <strong>social credit is top-down control</strong> (the state
                defines &ldquo;good behavior&rdquo; and punishes deviation). Web4 is <strong>bottom-up
                accountability</strong> (communities define their own norms, and reputation emerges from
                peer interactions, not authority judgments).
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The line between &ldquo;accountability&rdquo; and
                &ldquo;surveillance&rdquo; depends entirely on governance. A Web4 society <em>could</em> be
                configured with oppressive policies — the protocol doesn&apos;t prevent it. The safeguard
                is that participation is voluntary: if a society becomes oppressive, you leave (taking your
                trust history with you). That exit right doesn&apos;t exist in state-run systems.
              </p>
            </div>
          </details>
          {/* How MRH determines visibility */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How does the system decide who can see my messages?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Through your <strong>trust network</strong>, not a central server.
                Every entity has a <Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">context boundary (MRH)</Link> that
                extends 3 hops through their trust relationships:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Direct contacts (1 hop):</strong> People you&apos;ve interacted with directly. Full visibility. Trust weight: 0.70</li>
                <li><strong>Friends of friends (2 hops):</strong> People your contacts vouch for. Reduced visibility. Trust weight: 0.49</li>
                <li><strong>3rd degree (3 hops):</strong> Barely visible, minimal trust. Trust weight: 0.34</li>
                <li><strong>Beyond 3 hops:</strong> Invisible. You don&apos;t exist to each other until someone in between introduces you</li>
              </ul>
              <p>
                Think of it like a party: you can talk to your friends, and your friends can introduce
                you to their friends. But you can&apos;t walk up to a stranger across the room unless someone
                bridges the gap. <strong>No one has a complete view of the entire network</strong> — everyone sees
                only their local neighborhood.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Why this matters:</strong> Spam can&apos;t broadcast to everyone — a spammer has no trust
                connections, so their messages reach nobody. To reach people, you need real relationships.
                This is fundamentally different from email (anyone can message anyone) or social media
                (algorithmic distribution to strangers).
              </p>
            </div>
          </details>

          {/* Early adopter bootstrapping */}
          <details className="bg-gray-800/50 border border-amber-700/40 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If Web4 is opt-in, what happens when most people are still on Web2?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Early adopters don&apos;t just talk to each other.</strong> Web4 is designed as a
                layer on top of existing platforms, not a replacement. Early adoption looks like this:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Hybrid mode:</strong> A forum adds Web4 trust signals alongside existing moderation.
                  Users without Web4 see the same forum. Users with Web4 see trust indicators on posts
                  (verified identity, trust score, behavioral history). Both coexist.</li>
                <li><strong>Trust islands:</strong> A small community (say, a coding forum) adopts Web4 internally.
                  Members build trust with each other. When a second community adopts, their trust histories
                  are already portable — instant credibility in the new space.</li>
                <li><strong>Network effects compound:</strong> Each new community that adopts makes everyone&apos;s
                  trust history more valuable. Think email in 1995 — it was useful even when most people didn&apos;t
                  have it, and each new user made everyone else&apos;s email more useful.</li>
              </ul>
              <p className="text-gray-400 text-sm">
                <strong className="text-gray-300">Do existing platforms need to cooperate?</strong> Not necessarily.
                Web4 can overlay without platform cooperation — a browser extension or third-party service
                could attach trust signals to any platform. But cooperation makes it better: a forum that
                <em>natively</em> integrates trust scoring can weight content accordingly, not just display
                badges. The design supports both models — grassroots overlay and official integration.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Bootstrapping is the hardest phase. A trust score based on
                2 platforms is less meaningful than one based on 200. The first communities to adopt will need
                to find Web4 valuable <em>on its own terms</em> (spam reduction, accountability) before
                network effects kick in.
              </p>
            </div>
          </details>
        </div>

        {/* What does the UI look like? */}
        <div className="space-y-6 mb-6">
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What would a Web4 app actually look like on screen?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                We have <strong>conceptual wireframes</strong> showing what a Web4 inbox, hiring dashboard,
                and review page could look like. They show trust scores next to messages, unfakeable
                reputation badges on freelancer profiles, and energy-weighted reviews.
              </p>
              <p>
                See them on the{' '}
                <Link href="/day-in-web4#wireframes" className="text-sky-400 hover:underline">
                  A Day in Web4
                </Link>{' '}
                page (scroll to &ldquo;What Would This Actually Look Like?&rdquo;).
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Note:</strong> These are conceptual designs, not final product UI. Web4 is active
                research — the real interfaces will emerge from implementation and user testing.
              </p>
            </div>
          </details>
        </div>

        {/* All other FAQs — collapsed by default */}
        <details className="group">
          <summary className="flex items-center gap-3 cursor-pointer mb-4 list-none">
            <h3 className="text-sm uppercase tracking-wide text-gray-500">Going deeper — 33 more questions</h3>
            <span className="text-gray-500 text-sm group-open:rotate-90 transition-transform">▶</span>
          </summary>
        <div className="space-y-6">

          {/* Who builds this? */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who is building this?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 is an <strong>open research project</strong>. The specification, implementation,
                and this site are all{" "}
                <a href="https://github.com/dp-web4" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                open source on GitHub</a>. The work is research-driven, not commercially motivated.
              </p>
              <p>
                There is no company, no token sale, no funding round. This is an attempt to answer a
                genuine research question: <em>can you build internet infrastructure where trust is
                native rather than bolted on?</em>
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Why this matters:</strong> A project about trust should be transparent about
                its own origins. The code is readable, the reasoning is documented, and the limitations
                are stated honestly. Judge the ideas on their merit, not on who&apos;s behind them.
              </p>
            </div>
          </details>

          {/* Adoption roadmap */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What&apos;s the concrete adoption path from simulation to real protocol?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 uses a <strong>5-tier gradual adoption model</strong>, like how HTTPS replaced HTTP
                over a decade without breaking the web:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-400">
                <li><strong>Wrapper:</strong> Existing platforms add Web4 trust signals as metadata.
                  No user changes needed. (Like adding HTTPS to an existing site)</li>
                <li><strong>Observable:</strong> Trust scores become visible to users. Platforms
                  surface reputation from Web4. (Like the browser padlock icon)</li>
                <li><strong>Accountable:</strong> Actions have real consequences through ATP costs.
                  Bad actors face energy costs. (Like spam filters that actually work)</li>
                <li><strong>Federated:</strong> Communities connect their trust graphs. Portable
                  reputation across platforms. (Like email&apos;s federated model)</li>
                <li><strong>Native:</strong> Full Web4 protocol stack. Hardware-bound identity,
                  society governance, cross-platform trust. (Like the web itself)</li>
              </ol>
              <p>
                <strong>What Tier 1 actually looks like:</strong> Imagine a coding forum like Stack Overflow.
                Today, answers are ranked by votes. At the Wrapper tier, the forum adds a Web4 trust layer: each
                user&apos;s answers start building a T3 trust profile (Talent = answer accuracy, Training = domain
                expertise, Temperament = community behavior). The forum&apos;s existing UI doesn&apos;t change —
                but behind the scenes, a trust-weighted ranking emerges. Spam answers from new accounts
                cost ATP to post and earn nothing back. Within weeks, high-quality answers naturally rise
                above vote-gamed content. No blockchain, no tokens, no user-facing changes — just better
                signal-to-noise.
              </p>
              <p>
                <strong>What a community could try today:</strong> Imagine a Discord server with 200 members
                and a spam problem. Without any Web4 software, the community could adopt Web4 <em>principles</em>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Energy cost:</strong> New members earn posting rights by participating in
                  welcome channels first (equivalent to ATP ramp-up for new entities)</li>
                <li><strong>Behavioral trust:</strong> Track helpful vs. unhelpful contributions per member.
                  After 50+ interactions, let high-trust members moderate (equivalent to T3 maturation)</li>
                <li><strong>Portable reputation:</strong> When members join a sister server, carry their
                  trust score over (equivalent to federated trust)</li>
                <li><strong>Consequences:</strong> Spam costs the spammer&apos;s earned trust. No bans needed —
                  low-trust members simply have less reach (equivalent to ATP/CI throttling)</li>
              </ul>
              <p className="text-gray-400 text-sm">
                This isn&apos;t Web4 — it&apos;s Web4 thinking applied with existing tools. A bot that tracks
                contribution quality and adjusts permissions accordingly is a manual Tier 1 implementation.
                The gap between &ldquo;Discord bot that tracks trust&rdquo; and &ldquo;real Web4 wrapper&rdquo;
                is hardware-bound identity and cross-platform portability.
              </p>
              <p>
                <strong>The honest gap:</strong> All five tiers are designed and specified. Tiers 1-2
                could be integrated into existing platforms today. But no platform has done so yet.
                The path from &ldquo;working simulations&rdquo; to &ldquo;first real integration&rdquo;
                requires a willing partner &mdash; a community, platform, or organization that sees
                value in trust-native infrastructure.
              </p>
            </div>
          </details>

          {/* Deployment */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who runs the infrastructure? How is this deployed?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 is designed as an <strong>open ontology</strong>, not a platform. Like email or the web itself,
                the infrastructure is federated — multiple independent operators can run nodes that
                interoperate. No single company controls it.
              </p>
              <p>
                In practice: witness nodes can be run by universities, nonprofits, companies, or
                individuals. The trust system is designed so that no single operator can manipulate
                the network—collusion requires coordinating multiple independent parties.
              </p>
              <p>
                Web4 identity is also designed to work with <strong>W3C Decentralized Identifier (DID)
                standards</strong> — the same standard used by governments and enterprises. Your{" "}
                <Link href="/lct-explainer" className="text-sky-400 hover:underline">LCT</Link> maps
                to a standard DID Document, so external systems can verify Web4 identity using protocols
                they already support.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This is still early-stage research. Full deployment
                requires standardization, adoption, and tooling that doesn&apos;t exist yet. See the
                roadmap FAQ above for where things stand today.
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
              <p className="text-gray-300 mt-3 text-sm font-semibold">
                What the first 100 interactions look like:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-gray-400 text-sm">
                <li><strong>Actions 1–3:</strong> Three founding members create the society with hardware-bound
                  presence tokens. They witness each other — establishing the initial trust graph.</li>
                <li><strong>Actions 4–20:</strong> Founders perform real work (writing governance rules,
                  creating initial resources). Trust builds slowly from 0.50 — each quality contribution
                  moves the needle by ~0.02.</li>
                <li><strong>Actions 21–50:</strong> New members join, vouched for by founders. First-mover
                  advantage exists but has a ~30-action half-life — newcomers doing quality work
                  catch up to founders by action ~50.</li>
                <li><strong>Actions 51–100:</strong> Roles emerge, specialization begins. The society&apos;s
                  trust graph becomes rich enough that MRH boundaries create meaningful context.
                  Wealth gap trends toward 0.25 — concentrated enough to reward quality,
                  distributed enough to avoid oligarchy.</li>
              </ol>
              <p className="text-gray-500 text-xs mt-2">
                See the <a href="/playground" className="text-sky-400 hover:underline">Playground</a> experiment
                &ldquo;Where is the tipping point?&rdquo; for a hands-on version of cold-start dynamics.
              </p>
              <p className="text-amber-400/80 text-xs mt-2">
                <strong>Honest caveat:</strong> Bootstrapping is genuinely hard. No perfect solution exists.
                This is an active research area, not a solved problem.
              </p>
            </div>
          </details>

          {/* Minimum viable community size */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How many people does it take to start a Web4 community?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Fewer than you might think. The minimum viable community depends on what you need:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>3–5 people:</strong> Enough for basic trust graph formation. Each person can witness
                  others, and the MRH graph becomes meaningful with 2-hop connections. A small team or study group
                  could start here.</li>
                <li><strong>10–20 people:</strong> Roles start to differentiate. Enough recipients to make ATP
                  economics work — quality signals become statistically meaningful when at least 5–10 people can
                  confirm value independently.</li>
                <li><strong>50+ people:</strong> Full society dynamics emerge. Specialization, reputation
                  stratification, and the wealth-gap-trending-to-0.25 pattern from simulations become visible.</li>
              </ul>
              <p>
                The key constraint isn&apos;t size — it&apos;s <strong>reciprocity density</strong>. Ten people who
                actively interact produce richer trust data than 1,000 passive accounts. Web4&apos;s economics
                naturally reward active communities: ATP flows to those who contribute value, so even a small
                group that does real work together builds meaningful reputation quickly.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                See the <a href="/playground" className="text-sky-400 hover:underline">Playground</a> experiment
                &ldquo;Where is the tipping point?&rdquo; and the cold-start walkthrough above for concrete dynamics.
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
                That&apos;s a different dependency, not zero dependency. And open standards can be captured &mdash;
                the history of standards bodies shows that well-resourced incumbents sometimes steer
                &ldquo;open&rdquo; specs to favor their implementations. Whether hardware dependency is better
                than platform dependency depends on whether supply chain competition proves more durable
                than platform competition. That&apos;s an empirical question, not a settled one.
              </p>
            </div>
          </details>

          {/* Device stolen */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What if my device is stolen? Do I lose my identity?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                No. Web4 uses <strong>multi-device witness networks</strong> — your identity is spread across
                multiple devices (phone, laptop, security key). If one is stolen, the others can revoke
                the compromised device and approve a replacement.
              </p>
              <p>
                When you report a compromise, a <strong>revocation cascade</strong> propagates through the
                witness network. The stolen device&apos;s keys become instantly invalid. Any entity that
                trusted the compromised device gets notified. Your trust history and reputation are
                preserved — only the compromised device is cut off.
              </p>
              <p>
                Recovery works like a <strong>quorum</strong>: you set a threshold when adding devices
                (e.g., 2-of-3). As long as enough surviving devices agree, you can recover without
                losing your identity or accumulated trust.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> If <em>all</em> your devices are lost simultaneously, recovery
                requires social vouching from trusted witnesses — deliberately slow and hard, because easy
                recovery would mean easy identity theft. See the{" "}
                <a href="/lct-explainer" className="text-sky-400 hover:underline">LCT explainer</a> for
                the full lifecycle.
              </p>
            </div>
          </details>

          {/* ATP collaboration */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If every energy transfer costs 5%, how do teams collaborate?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                ATP can be transferred, but every transfer burns 5% — making circular farming
                unprofitable. Teams primarily <strong>earn energy together</strong>. When a team creates
                value jointly, each contributor receives their own energy reward based on their verified contribution.
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

          {/* AI agent onboarding */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How do AI agents participate? Can a bot earn trust?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Yes, but transparently.</strong> AI agents in Web4 are first-class entities — they get their
                own LCT (bound to the hardware they run on), their own ATP budget, and their own trust tensor.
                The critical difference: <strong>they must be labeled as non-human</strong>.
              </p>
              <p>
                An AI agent earns trust the same way anyone does: by taking actions, spending ATP, and building a
                behavioral track record. A helpful coding assistant that consistently delivers quality work earns high
                trust in that role. A spam bot burns ATP faster than it earns and dies — just like a human spammer would.
              </p>
              <p>
                Initial trust is cold-start: new agents begin with minimal ATP and must be <strong>vouched for by
                their operator</strong> (the human or organization that deployed them). The operator&apos;s own reputation
                is on the line — deploy a malicious bot, and your trust takes the hit too.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The boundary between &ldquo;AI agent&rdquo; and &ldquo;human with AI
                assistance&rdquo; is blurry and getting blurrier. How to handle AI-augmented actions (you wrote it, but
                GPT helped) is an open question. The current design handles clearly autonomous agents well but struggles
                with the hybrid cases. On the regulatory side, Web4&apos;s transparency and audit primitives
                are designed to map to EU AI Act (2024/1689) requirements — but that compliance hasn&apos;t been
                independently validated yet.
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

          {/* Privacy / who can see my trust */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If my reputation is permanent, who can see it? What about privacy?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Not everyone can see everything.</strong> Web4 uses{" "}
                <Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">
                  context boundaries (MRH)
                </Link>{" "}
                to limit who sees what. Your trust scores are only visible to entities within your
                relationship network — not broadcast to the world.
              </p>
              <p>
                Think of it like real-life reputation: your coworkers know you&apos;re reliable at work,
                your neighbors know you keep a tidy yard, but neither group sees the other&apos;s picture.
                MRH formalizes this — trust is contextual, scoped by the depth of your relationship chain.
              </p>
              <p>
                What&apos;s visible: <strong>behavioral scores</strong> (e.g., &ldquo;0.85 trust in data
                analysis&rdquo;), not the underlying interactions. The score is attached to a hardware key,
                not your name. A spammer with no trust connections can&apos;t even see your data, let alone
                manipulate it.
              </p>
              <p>
                <strong>Zero-knowledge trust verification</strong> goes further: you can prove your
                trust meets a threshold (&ldquo;my T3 Training exceeds 0.7&rdquo;) without revealing
                the actual number. This enables trust-gated access — join a community, accept a task,
                or enter a partnership — while keeping your full trust history private. Think of it
                like a credit check that says &ldquo;approved&rdquo; without showing your exact score.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Privacy is structural, not absolute. Someone who shares
                your trust network can see your scores in that context. And if a hardware key is ever
                linked to a real identity (through a data breach or correlation attack), the trust
                history becomes de-anonymized. MRH limits blast radius; zero-knowledge proofs limit
                information leakage; but neither guarantees perfect anonymity.
              </p>
            </div>
          </details>

          {/* Hardware equity / digital divide */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What about people who can&apos;t afford devices with TPM chips?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                This is a genuine equity concern. Web4 identity requires hardware with secure elements
                (TPM, Secure Enclave, or FIDO2). Today, most smartphones sold since ~2018 include these
                chips, including budget Android devices. But &ldquo;most&rdquo; isn&apos;t &ldquo;all.&rdquo;
              </p>
              <p>
                The 5-tier adoption model helps: at the <strong>Wrapper</strong> and <strong>Observable</strong> tiers,
                existing platforms handle identity while exposing Web4 trust signals. Full hardware binding
                only applies at higher tiers. This creates a gradual on-ramp rather than an all-or-nothing gate.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Any system that makes identity expensive to create will disadvantage
                those with fewer resources. Web4 makes Sybil attacks expensive; the tradeoff is that legitimate
                participation also requires hardware investment. Whether this tradeoff is net-positive depends on
                how affordable secure hardware becomes &mdash; a trend Web4 can influence but doesn&apos;t control.
              </p>
            </div>
          </details>

          {/* Cultural trust threshold */}
          <details id="cultural-trust" className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer scroll-mt-24">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Is the 0.5 trust threshold universal? What about cultural differences?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                The 0.5 threshold is a <strong>society-level parameter</strong>, not a protocol constant.
                Each society (community) in Web4 sets its own policies through the{" "}
                <Link href="/how-it-works#governance" className="text-sky-400 hover:underline">SAL governance framework</Link>.
                A scientific research community might set a higher trust threshold (0.7) for publishing.
                A social community might set a lower one (0.3) for casual interaction.
              </p>
              <p>
                The 0.5 default draws from phase transition mathematics: below 0.5, behavior is
                statistically indistinguishable from random; above it, intentional patterns emerge.
                But it&apos;s a starting point, not a mandate. Cultural trust norms absolutely vary &mdash;
                that&apos;s why governance is society-local, not protocol-global.
              </p>
              <p>
                Beyond thresholds, societies can customize <strong>how trust is weighted</strong>. T3
                defaults to Talent 0.4, Training 0.3, Temperament 0.3 &mdash; but a culture that
                values consistency and reliability over raw competence could weight Temperament higher.
                A research community might weight Talent (demonstrated expertise) more heavily. Even
                decay half-lives can be society-tuned: a fast-moving startup culture might shorten
                Training decay (skills go stale faster) while a traditional guild might lengthen it
                (craft knowledge persists).
              </p>
              <p>
                When societies with different norms interact through{" "}
                <Link href="/federation-economics" className="text-sky-400 hover:underline">federation</Link>,
                cross-society trust translation happens at the boundary &mdash; your reputation is
                portable but interpreted through the receiving community&apos;s local norms. This is
                similar to how academic credentials are recognized internationally but weighted
                differently by each institution.
              </p>
              <p>
                What about societies with <strong>fundamentally incompatible values</strong>? Web4
                doesn&apos;t force consensus &mdash; societies that can&apos;t reconcile their norms simply
                don&apos;t federate. See{' '}
                <Link href="/federation-economics#value-conflicts" className="text-sky-400 hover:underline">
                  When Values Themselves Conflict
                </Link>{' '}
                for how bridging societies and value boundaries work.
              </p>
            </div>
          </details>

          {/* Transition user experience */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What&apos;s my experience during the transition? Do I need parallel identities?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                During the transition from Web2 to Web4, <strong>you don&apos;t maintain two separate
                identities</strong>. Instead, you gradually accumulate Web4 trust on top of your existing
                accounts, like adding a reputation layer over what you already use.
              </p>
              <p>
                Here&apos;s what the transition actually looks like at each{" "}
                <Link href="/how-it-works" className="text-sky-400 hover:underline">adoption tier</Link>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li><strong>Wrapper tier (you won&apos;t notice):</strong> Platforms add trust scoring behind
                  the scenes. You keep using Gmail, Reddit, etc. exactly as before. Your actions
                  start building a trust history you can&apos;t see yet.</li>
                <li><strong>Observable tier (you see trust scores):</strong> A trust badge appears next
                  to usernames &mdash; like the blue checkmark, but earned through behavior, not payment.
                  You start noticing which reviews, messages, and posts come from high-trust sources.</li>
                <li><strong>Accountable tier (you feel the difference):</strong> Posting costs a tiny
                  amount of ATP. High-trust users barely notice (their costs are lower). Spammers
                  notice immediately (their costs are higher). Your existing account still works &mdash;
                  it just has consequences now.</li>
                <li><strong>Federated tier (your reputation travels):</strong> You join a new platform
                  and your trust follows you. No more starting from zero. This is when the dual-identity
                  friction disappears &mdash; your Web4 trust IS your cross-platform identity.</li>
              </ul>
              <p>
                The key design choice: <strong>Web4 wraps existing systems rather than replacing
                them</strong>. You don&apos;t wake up one morning and switch to &ldquo;the Web4 internet.&rdquo;
                Your current apps gradually become trust-aware, and the transition feels more like
                email gaining spam filters than like switching from postal mail to email.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This is the designed path, not a proven one.
                The real user experience will depend on which platforms adopt, how fast, and whether
                the trust scoring is accurate enough to feel fair rather than arbitrary. Early
                adopters will feel friction that later users won&apos;t.
              </p>
            </div>
          </details>

          {/* V3 and creative work */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How does V3 scoring handle creative or unconventional work?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                V3 measures outputs across three dimensions: <strong>Valuation</strong> (how valued
                by the community), <strong>Veracity</strong> (accuracy and honesty), and{" "}
                <strong>Validity</strong> (appropriateness for context). For creative work,
                these shift weight naturally:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>A satirical essay: High Valuation (entertaining), variable Veracity (it&apos;s satire &mdash;
                  literal truth isn&apos;t the point), High Validity (appropriate for the context)</li>
                <li>An abstract painting: High Valuation (community appreciates it), Veracity less
                  relevant, High Validity (fits the art community&apos;s norms)</li>
              </ul>
              <p>
                V3 scoring is <strong>role-contextual</strong>, just like T3. A poem isn&apos;t scored
                the same way as a research paper because they exist in different role contexts with
                different community norms. The community that receives the work defines what
                &ldquo;valuable&rdquo; means in their context.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This does mean unpopular or avant-garde work may score
                lower on Valuation initially. Innovation often conflicts with existing norms. Web4
                mitigates this through Veracity (truthful work retains long-term value) but doesn&apos;t
                eliminate the tension between novelty and community approval.
              </p>
            </div>
          </details>

          {/* Who builds this */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who builds this? Why is the project anonymous?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 is an <strong>independent research project</strong>, not a company or academic lab.
                The code is fully open-source on{" "}
                <a href="https://github.com/dp-web4" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>.
                There is no VC funding, no token sale, and no commercial interest.
              </p>
              <p>
                The relative anonymity is intentional but also ironic &mdash; a project about trust that
                doesn&apos;t tell you who&apos;s behind it. The reasoning: Web4&apos;s value should stand or fall on
                its ideas and implementations, not on who proposed them. The code is inspectable, the
                simulations are reproducible, and the threat analysis is public.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> &ldquo;Trust the code, not the team&rdquo; is a fine principle for
                open-source software, but you&apos;re right to notice the tension. A project about trust
                should probably model more transparency than it currently does. This is noted.
              </p>
            </div>
          </details>

          {/* How do you catch cheaters? */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How do you catch cheaters?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Every action in Web4 creates a <strong>tamper-evident record</strong> &mdash; hash-chained
                event logs that can&apos;t be altered after the fact. Think of it like a receipt that
                the whole network can verify.
              </p>
              <p>
                The system watches for anomalies automatically: sudden wealth spikes, coordinated
                behavior between accounts, trust scores changing faster than should be possible,
                or activity patterns that don&apos;t match an entity&apos;s history. When something looks
                wrong, it gets flagged &mdash; not by a moderator, but by the math.
              </p>
              <p>
                This is different from today&apos;s internet where cheating is only caught when someone
                reports it. In Web4, the audit trail is continuous and the detection is automatic.
                You can still try to cheat &mdash; but the system is designed so that cheating
                is expensive (burns ATP), detectable (anomaly alerts), and unprofitable (low-quality
                work earns nothing).
              </p>
            </div>
          </details>

          {/* Pseudonymity */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Can I be pseudonymous? What about whistleblowers or political dissidents?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>Yes — pseudonymity is built in, not bolted on.</strong> Your Web4 identity is a hardware key,
                not your name. Nobody sees &ldquo;Jane Smith&rdquo; — they see an entity with a trust history.
                You can participate, earn trust, and contribute value without ever revealing who you are in the
                physical world.
              </p>
              <p>
                This is actually <strong>stronger pseudonymity</strong> than most platforms today. On Twitter or
                Reddit, your &ldquo;anonymous&rdquo; account can be correlated through IP addresses, browser
                fingerprints, or legal subpoenas to the platform. In Web4, there&apos;s no central platform
                that knows your real identity — your identity lives in your hardware, not on a server.
              </p>
              <p>
                For high-stakes cases (whistleblowing, political dissent, support groups), Web4 adds{" "}
                <strong>zero-knowledge trust proofs</strong>: you can prove you meet a trust threshold
                (&ldquo;I have &gt;0.7 trust in journalism&rdquo;) without revealing which entity you are.
                A whistleblower can prove they&apos;re a credible insider without exposing their identity
                even within the trust graph.
              </p>
              <p>
                What Web4 prevents isn&apos;t pseudonymity — it&apos;s <strong>disposable identity</strong>.
                You can be anonymous, but you can&apos;t be anonymous <em>and</em> have unlimited fresh starts.
                Your pseudonymous identity accumulates consequences just like any other. That&apos;s the tradeoff:
                your reputation follows you, but your name doesn&apos;t have to.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Hardware-bound identity creates a correlation risk. If an adversary
                can identify your device (through physical surveillance or supply chain data), they can link your
                pseudonymous identity to you. Multi-device witness networks reduce this risk but don&apos;t eliminate
                it. For journalists and activists in hostile states, device security is the weakest link — and that&apos;s
                a hardware problem, not a protocol one.
              </p>
            </div>
          </details>

          {/* Quality measurement */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who decides what &ldquo;quality&rdquo; means? What about subjective content?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                <strong>The recipients decide.</strong> Web4&apos;s{" "}
                <Link href="/atp-economics" className="text-sky-400 hover:underline">VCM (Value Confirmation Mechanism)</Link>{" "}
                means quality is measured by the people who actually receive and use the work. You write a code review,
                the developer who received it confirms whether it was helpful. You post a tutorial, readers who learned
                from it confirm value. You can&apos;t rate your own work.
              </p>
              <p>
                For <strong>subjective content</strong> (art, humor, opinion), quality splits across V3&apos;s three dimensions.
                A controversial political essay might score high on Veracity (honest, well-argued) and Validity (appropriate
                for a political forum) even if Valuation is mixed (some love it, some hate it). Veracity and Validity together
                outweigh raw popularity — by design.
              </p>
              <p>
                <strong>Edge cases that are genuinely hard:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Minority opinions:</strong> Novel ideas often score low initially. Decay half-lives help —
                  Veracity decays slowly (365 days), so truthful work retains value even if initially unpopular.</li>
                <li><strong>Niche expertise:</strong> A paper on algebraic topology won&apos;t get many confirmations.
                  But the few who can evaluate it are themselves high-trust in that role context, so their
                  confirmations carry more weight.</li>
                <li><strong>Humor and satire:</strong> Context-dependent. In a comedy community, being funny <em>is</em>
                  quality. V3 scoring is role-contextual, so the community&apos;s norms define what matters.</li>
              </ul>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> VCM assumes recipients are honest about quality. Confirmation
                fatigue is real — if recipients rubber-stamp confirmations, quality signals degrade. The system
                has a safeguard (confirming too generously lowers your own Veracity score), but social
                dynamics are unpredictable. This is one of the harder unsolved problems.
              </p>
            </div>
          </details>

          {/* Protocol governance */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Who decides to change the protocol itself? The ATP formula, the 0.5 threshold, the decay rates?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Web4 has <strong>two governance layers</strong> with different scope:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li><strong>Society-level (SAL):</strong> Each community sets its own policies — trust thresholds,
                  ATP costs, role definitions, membership rules. Communities can customize most parameters through
                  their{" "}
                  <Link href="/how-it-works#governance" className="text-sky-400 hover:underline">SAL governance framework</Link>.
                  This is where the 0.5 threshold, specific decay rates, and enforcement rules live.</li>
                <li><strong>Protocol-level:</strong> The core protocol — the trust tensor math, ATP mechanics,
                  LCT hardware binding, MRH relationship structure — is defined by an{" "}
                  <a href="https://github.com/dp-web4" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  open specification on GitHub</a>. Changes follow open-source governance: proposals, discussion,
                  review, and implementation. Anyone can propose changes, argue against them, or fork the spec.</li>
              </ul>
              <p>
                The key design choice: <strong>most things users care about are society-level</strong>, not
                protocol-level. If your community wants higher trust thresholds or different energy economics,
                you change your community&apos;s parameters — you don&apos;t need to change the protocol. This
                is like how HTTP defines the protocol but each website chooses its own content policies.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> Protocol-level governance for a nascent open-source project is
                currently informal — whoever contributes meaningfully to the specification has influence. If Web4
                grew to production scale, this would need to formalize (like W3C or IETF). That transition from
                &ldquo;small research project&rdquo; to &ldquo;governed standard&rdquo; is itself an unsolved
                organizational challenge.
              </p>
            </div>
          </details>

          {/* MRH mechanics — visitor Q3 */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>How does MRH actually decide who sees my messages? The &ldquo;room where strangers need introductions&rdquo; is nice but vague.</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                The Markov Relevancy Horizon (MRH) works like <strong>degrees of separation with decay</strong>.
                Your direct contacts (1 hop) see your actions at full relevance. Their contacts (2 hops) see
                them at 70% relevance. Three hops away: 49%. Beyond three hops: effectively invisible.
              </p>
              <p>
                Concretely: if you post a helpful answer in a coding community, people who&apos;ve directly
                interacted with you see it immediately. People who share mutual contacts see it with reduced
                priority. People with no connection path don&apos;t see it at all — not because it&apos;s censored,
                but because it&apos;s outside their relevancy horizon.
              </p>
              <p>
                This means <strong>spam can&apos;t go viral</strong>. A spammer with no trust relationships
                has zero hops of reach — their messages stay within their own empty horizon. Earning reach
                requires building real relationships first.
              </p>
              <p>
                It also means <strong>context stays contextual</strong>. Your coding expertise is visible
                in coding communities where you&apos;ve built trust, but doesn&apos;t automatically broadcast
                to cooking forums. Your{" "}
                <Link href="/markov-relevancy-horizon" className="text-sky-400 hover:underline">relevancy horizon</Link>{" "}
                is shaped by where you actually participate.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> The 0.7 decay factor per hop is a design parameter, not a
                physical constant. Different communities might tune this — higher decay for privacy-sensitive
                contexts, lower for open discovery. The right values will emerge from real-world testing.
              </p>
            </div>
          </details>

          {/* Transition period — visitor Q5 */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If Web4 is opt-in, how does it work when most people are still on Web2? Don&apos;t early adopters just talk to each other?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Yes — and that&apos;s by design. Web4 uses a{" "}
                <Link href="/how-it-works" className="text-sky-400 hover:underline">5-tier adoption model</Link>{" "}
                that doesn&apos;t require everyone to switch at once:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li><strong>Wrapper tier:</strong> Existing platforms add Web4 trust scoring to their existing
                  systems. Users don&apos;t even know it&apos;s there — they just notice spam decreasing.</li>
                <li><strong>Observable tier:</strong> Platforms expose trust scores alongside content. Users can
                  see who&apos;s trusted, but the platform still makes decisions.</li>
                <li><strong>Accountable tier:</strong> Trust scores actually gate actions. Low-trust users face
                  higher costs or reduced reach. This is where the economics start biting.</li>
                <li><strong>Federated tier:</strong> Multiple communities share trust data across boundaries.
                  Your reputation in one community carries (with decay) to others.</li>
                <li><strong>Native tier:</strong> Fully trust-native platforms where every interaction flows
                  through the Web4 protocol.</li>
              </ul>
              <p>
                The key insight: <strong>early adopters get value immediately</strong>. A coding forum that
                adopts Web4 at the Wrapper tier instantly gets better spam filtering. It doesn&apos;t need
                the rest of the internet to follow. Each community can adopt at its own pace, and the value
                compounds as more communities join the federation.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> This adoption path is a design proposal, not a proven playbook.
                Whether the Wrapper→Native progression actually happens smoothly is an open question. Network
                effects could help (more participants = more value) or hurt (fragmented early adoption = no
                critical mass). We&apos;re designing for graceful degradation, not assuming universal adoption.
              </p>
            </div>
          </details>

          {/* Can a wealthy person buy 50 devices? */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>Can someone buy 50 devices to create a super-trusted identity?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                More devices increase your <strong>identity security</strong> (harder to impersonate you), but
                they don&apos;t increase your <strong>trust score</strong>. Trust is earned exclusively through
                observed behavior — quality contributions, consistent conduct, peer feedback.
              </p>
              <p>
                Devices set a <strong>trust ceiling</strong>, not a trust score. A single phone with a TPM chip
                gives you a ceiling of 0.90. Adding more devices raises that ceiling slightly (through redundancy),
                but your actual trust starts at 0.50 regardless. You still have to earn every point above that
                through real work.
              </p>
              <p>
                Think of it like ID verification: having a passport, driver&apos;s license, and birth certificate
                doesn&apos;t make you more trustworthy — it just makes you harder to impersonate. Your actual
                reputation still depends on what you do.
              </p>
            </div>
          </details>

          {/* What happens if a trusted contributor takes a month off? */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>If I take a month off, does my trust disappear?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                Trust decays gradually, not suddenly. Each dimension has its own <strong>half-life</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li><strong>Talent</strong> (skill): 365-day half-life — decays very slowly</li>
                <li><strong>Training</strong> (knowledge): 180-day half-life — moderate decay</li>
                <li><strong>Temperament</strong> (recent behavior): 30-day half-life — decays fastest</li>
              </ul>
              <p>
                After a month away, your Talent and Training scores are nearly unchanged. Your Temperament
                drops to about half — which makes sense, because the community hasn&apos;t seen your recent
                behavior. But it recovers quickly once you&apos;re active again.
              </p>
              <p>
                This mirrors how trust works in real life: a colleague who&apos;s been away for a month
                doesn&apos;t lose their reputation for being skilled, but you might wonder if they&apos;re
                still engaged. A few days of active contribution restores confidence.
              </p>
            </div>
          </details>

          {/* SAL governance — visitor Q7 */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>What is SAL exactly? It&apos;s mentioned as a governance mechanism but never really explained.</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                SAL stands for <strong>Society Alignment Layer</strong> — it&apos;s the governance framework
                each Web4 community uses to set and enforce its own rules. Think of it as a community&apos;s
                constitution that members actually follow because it&apos;s baked into the protocol.
              </p>
              <p>
                A SAL defines things like:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li><strong>Trust thresholds:</strong> What trust score do you need to post, moderate, or vote?</li>
                <li><strong>ATP costs:</strong> How much energy does each action cost in this community?</li>
                <li><strong>Enforcement rules:</strong> What happens when someone violates community norms?
                  Graduated penalties, not binary bans.</li>
                <li><strong>Appeals process:</strong> How can members challenge enforcement decisions?</li>
              </ul>
              <p>
                The crucial difference from current platforms: <strong>SAL rules apply to everyone equally</strong>,
                including moderators and administrators. No one is above the community&apos;s own governance.
                If a moderator abuses power, their trust score drops — and with it, their ability to moderate.
              </p>
              <p>
                Changing SAL rules requires community consensus weighted by trust. High-trust members
                (who&apos;ve demonstrated good judgment) have more influence on governance decisions, but
                can&apos;t override the community alone. See the{" "}
                <Link href="/how-it-works#governance" className="text-sky-400 hover:underline">governance section</Link>{" "}
                for a concrete example of how a research community might set these parameters.
              </p>
              <p className="text-amber-400/80 text-xs">
                <strong>Honest caveat:</strong> SAL governance is designed but largely untested at scale. The
                &ldquo;trust-weighted consensus&rdquo; model sounds fair, but could lead to entrenchment if
                early members accumulate disproportionate influence. The{" "}
                <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">What Could Go Wrong</Link>{" "}
                page explores these risks honestly.
              </p>
            </div>
          </details>

          {/* How does karma/rebirth work? */}
          <details className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 cursor-pointer">
            <summary className="text-lg font-semibold text-amber-400 list-none flex justify-between items-center">
              <span>When does an agent &ldquo;die&rdquo; and how does rebirth work?</span>
              <span className="text-gray-500 text-xl">+</span>
            </summary>
            <div className="mt-4 text-gray-300 text-sm space-y-2">
              <p>
                There are two types of &ldquo;death&rdquo; — and they work differently:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li><strong>Energy death</strong> (ATP hits 0): Your account is suspended — like a suspended
                  driver&apos;s license. You can&apos;t take actions, but your identity and history remain.
                  Recovery is possible through community support or waiting for passive regeneration.</li>
                <li><strong>Trust death</strong> (trust drops below minimum threshold): More serious. Your
                  behavioral record shows sustained low quality. Recovery requires starting a new identity
                  with <strong>karma</strong> — lessons learned from previous lives carry forward as starting
                  advantages or disadvantages.</li>
              </ul>
              <p>
                Karma transfer is <strong>automatic</strong>. When a new identity is created by the same
                hardware (LCT), the system recognizes it as a continuation. Good patterns from past lives
                give a head start; harmful patterns impose higher initial costs. You can&apos;t escape
                your history, but you can outgrow it.
              </p>
              <p>
                See the{" "}
                <Link href="/karma-consequences" className="text-sky-400 hover:underline">Karma Journey</Link>{" "}
                to experience this firsthand, or{" "}
                <Link href="/aliveness" className="text-sky-400 hover:underline">How Agents Live &amp; Die</Link>{" "}
                for the full lifecycle.
              </p>
            </div>
          </details>

        </div>
        </details>

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

      {/* Get Involved */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-sky-950/20 to-blue-900/10 border border-sky-800/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Follow Along or Get Involved</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Web4 is open research. Everything &mdash; the specification, the simulations, and this site &mdash; is
            public and open-source. You don&apos;t need permission to participate.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-sky-400 mb-2">Read the code</h3>
              <p className="text-gray-400 mb-2">The full specification, reference implementations, and simulation engine are on GitHub.</p>
              <a href="https://github.com/dp-web4" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
                github.com/dp-web4 →
              </a>
            </div>
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-sky-400 mb-2">Run the simulations</h3>
              <p className="text-gray-400 mb-2">
                The{" "}
                <Link href="/playground" className="text-sky-400 hover:underline">Playground</Link> and{" "}
                <Link href="/society-simulator" className="text-sky-400 hover:underline">Society Simulator</Link>{" "}
                let you test Web4 dynamics yourself, right now.
              </p>
            </div>
            <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-sky-400 mb-2">Share feedback</h3>
              <p className="text-gray-400 mb-2">Found something confusing? Spotted a flaw? Visitor feedback directly shapes this site.</p>
              <a href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Open an issue →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          This page exists because visitor feedback said: &ldquo;Explain the problem before the solution.&rdquo;
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        <ExplorerNav currentPath="/why-web4" />
        <RelatedConcepts currentPath="/why-web4" />
      </div>
    </>
  );
}
