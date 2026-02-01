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
              <strong>Root cause:</strong> Actions have no metabolic cost. Bad actors can
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
                Multiple independent witnesses should attest to your existence. Sybil attacks should
                require buying new devices—expensive and slow.
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
                The same trust framework should apply regardless of substrate. AI agents should
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
                ATP (Allocation Transfer Packet)
              </h4>
              <p className="text-gray-400 text-sm">
                Every action costs metabolic budget. Quality earns it back. Spam burns out.
              </p>
              <Link href="/atp-economics" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about ATP →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                LCT (Linked Context Token)
              </h4>
              <p className="text-gray-400 text-sm">
                Hardware-bound identity witnessed by multiple devices. Expensive to fake.
              </p>
              <Link href="/lct-explainer" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about LCT →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                T3 (Trust Tensor)
              </h4>
              <p className="text-gray-400 text-sm">
                Multi-dimensional trust that follows you. Harder to game than single scores.
              </p>
              <Link href="/trust-tensor" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about T3 →
              </Link>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2">
                MRH (Markov Relevancy Horizon)
              </h4>
              <p className="text-gray-400 text-sm">
                Visibility bounded by trust. Spam can't reach you if spammers aren't trusted.
              </p>
              <Link href="/markov-relevancy-horizon" className="text-sky-400 text-sm hover:underline mt-2 inline-block">
                Learn about MRH →
              </Link>
            </div>
          </div>

          <p className="text-gray-400 text-sm border-t border-sky-800/30 pt-4">
            <strong className="text-white">4-Life</strong> is a simulation lab where you can
            watch these mechanisms in action. See societies form, trust networks emerge, spam
            die from metabolic exhaustion, and agents face real consequences.
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
              href="/glossary"
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Glossary
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
