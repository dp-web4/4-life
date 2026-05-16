import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";

export const metadata = {
  title: "Web4 in 2 Minutes | 4-Life",
  description:
    "The shortest possible explanation of Web4: what it is, why it matters, and how to see it in action.",
};

export default function TLDRPage() {
  return (
    <>
      <PageTracker slug="tldr" />
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs currentPath="/tldr" />
      </div>

      <section className="max-w-3xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          2-Minute Overview
        </div>
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          Web4 in 2 Minutes
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed mb-10">
          Plain English first &mdash; the acronyms (ATP, LCT) are spelled out the first time they appear. No prerequisites.
        </p>

        {/* The Problem */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-red-400">The Problem</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            The internet has no memory. A spammer can create a new account in seconds.
            A scammer banned from one platform signs up on another. Your 10-year
            reputation on Twitter means nothing on Reddit. Bad actors never face
            compounding consequences — they just reset.
          </p>
        </div>

        {/* The Idea */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-sky-400">The Idea</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-4">
            What if every online action had a cost, every identity was tied to physical
            hardware, and your reputation followed you everywhere — permanently?
          </p>
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">1.</span>
              <p className="text-gray-300">
                <strong className="text-white">Actions cost energy &mdash; valuable contributions earn it back.</strong> Posting,
                messaging, voting — everything draws from a personal energy budget (called ATP — short for Allocation Transfer Packets),
                but the budget refills continuously when others confirm your work was useful, so contributors don&apos;t get locked out.
                Each action also creates a small receipt of what you spent. Spam drains the budget with no return.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">2.</span>
              <p className="text-gray-300">
                <strong className="text-white">Identity is anchored in your devices.</strong> Think
                of it as a digital ID card that lives in your device&apos;s security chip — not a
                password you type or a key file you store, but a presence your hardware proves.
                Your phone, laptop, and tablet each carry such chips, and each one vouches for the
                others, so no single device can speak for you alone (the constellation is called a
                Linked Context Token, or LCT). More devices strengthen it. Creating a fake identity
                means buying new hardware — expensive and slow.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">3.</span>
              <p className="text-gray-300">
                <strong className="text-white">Trust is earned, never bought.</strong> Your
                reputation is multi-dimensional (not just a single score), portable across
                platforms, and permanent. Good behavior compounds. Bad behavior follows you.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">4.</span>
              <p className="text-gray-300">
                <strong className="text-white">Humans and AI play by the same rules.</strong> The
                same trust framework applies to people and AI alike. Web4 calls all participants &ldquo;agents&rdquo; —
                human or artificial — because the rules are identical. Everyone earns their place.
              </p>
            </div>
          </div>
          {/* May 3 visitor LOW #4 + May 13 visitor MEDIUM: previously named MRH/CI but skipped T3 entirely, and never expanded the letters. Naive readers were meeting these acronyms unprepared on later pages.
              May 14 visitor MEDIUM #1: counting 6 acronyms on one short page felt dense. Trade-off this iteration: keep the cold-hit hook (letters T3/MRH/CI still visible in the <summary> line so a later page's mention isn't a cold drop) but move the expanded gloss behind a click. Hypothesis to falsify next cycle: visitors who only want the 2-minute overview can ignore this; visitors meeting T3/MRH/CI on later pages still have a primed hook from the summary. */}
          <details className="mt-4 pl-9">
            <summary className="text-gray-500 text-sm italic cursor-pointer hover:text-gray-400 select-none">
              Three more shorthand names (T3, MRH, CI) live on their own pages &mdash; tap to peek, or meet them when you get there
            </summary>
            <p className="text-gray-500 text-sm leading-relaxed mt-3 italic">
              <Link href="/trust-tensor" className="text-gray-400 hover:text-sky-400 underline decoration-gray-700">T3 (Talent / Training / Temperament)</Link>{' '}
              — the three dimensions of trust, scored per role;{' '}
              <Link href="/markov-relevancy-horizon" className="text-gray-400 hover:text-sky-400 underline decoration-gray-700">MRH (Markov Relevancy Horizon)</Link>{' '}
              — your trust neighborhood, distance-adjusted reach, 3 hops max; and{' '}
              <Link href="/coherence-index" className="text-gray-400 hover:text-sky-400 underline decoration-gray-700">CI (Coherence Index)</Link>{' '}
              — does your behavior add up over time. The concept sequence on each page links the rest.
            </p>
          </details>
        </div>

        {/* The Result */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-green-400">The Result</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Spam dies because it&apos;s too expensive. Scammers can&apos;t escape their
            history. Trusted contributors accumulate real, portable reputation. And the
            whole thing runs without any central authority deciding who&apos;s trustworthy.
          </p>
        </div>

        {/* May 14 visitor MEDIUM #5: /day-in-web4 was the page the visitor most wanted to find
            but didn't reach until 66:00. It was already in TL;DR but buried inside the deferred
            <details> toggle. This is a grounding line, not a competing CTA — the "Recommended
            next step = First Contact" design (Apr 29 visitor HIGH) stays unchanged below. */}
        <p className="text-sm text-gray-500 italic mb-10">
          Wondering what it would actually look like?{' '}
          <Link href="/day-in-web4#wireframes" className="text-sky-400 hover:underline not-italic">
            See conceptual UI mockups &rarr;
          </Link>
        </p>

        {/* Status */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-amber-400 mb-2">Where is this now?</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Web4 is <strong>active research with working simulations</strong>, not a deployed product.
            This site lets you watch the mechanics in action — see societies form, trust networks
            emerge, and bad actors fail. The underlying{" "}
            <a
              href="https://dp-web4.github.io/web4/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline"
            >
              protocol specification
            </a>{" "}
            is open.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-400 font-semibold mb-1">What exists today:</p>
              <ul className="text-gray-300 space-y-1 list-disc list-inside">
                <li>Formal protocol specification (open source)</li>
                <li>Open-source reference implementations (LCT, T3/V3, ATP, witnesses)</li>
                <li>Working trust simulations you can run here</li>
                <li>This 77-page interactive explainer site</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 font-semibold mb-1">What comes next:</p>
              <ul className="text-gray-300 space-y-1 list-disc list-inside">
                <li>Pilot deployment with a small real community</li>
                <li>Platform integration tests (<Link href="/why-web4#adoption" className="text-sky-400 hover:underline">Tier 1 wrapper</Link> — adding trust scores to existing platforms like Reddit or Gmail)</li>
                <li>Independent review of trust mechanics</li>
                <li>Protocol finalization based on real-world data</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3 italic">
            No timeline commitments — this is research, and research takes as long as it takes.
            The simulations work. The question is whether the real world behaves like the simulations.
          </p>
        </div>

        {/* What next — single primary CTA + collapsible secondary options.
            Apr 29 visitor HIGH: 5 forking next-step options diluted the linear path.
            Surface ONE recommended next step (First Contact) and demote the rest. */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Recommended next step</h2>
          <Link
            href="/first-contact"
            className="block bg-gradient-to-br from-sky-950/40 to-purple-950/30 border-2 border-sky-700/60 rounded-lg p-5 hover:border-sky-500 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <div className="text-sky-300 font-semibold text-lg">First Contact &rarr;</div>
              <div className="text-gray-500 text-xs whitespace-nowrap mt-1">7 min interactive</div>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
              Follow Alice through her first 16 actions in a Web4 community &mdash; build, stumble, recover, and discover what &ldquo;death&rdquo; means here.
              The fastest way to feel how Web4 actually works.
            </div>
          </Link>

          <details className="mt-4">
            <summary className="text-sm text-gray-400 cursor-pointer hover:text-sky-400 select-none">
              Or browse other entry points &mdash; problem framing, day-in-the-life, longer interactives
            </summary>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/why-web4"
                className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
              >
                <div className="text-sky-400 font-semibold mb-1">Why Web4?</div>
                <div className="text-gray-400 text-sm">
                  The full problem statement and honest questions
                </div>
                <div className="text-gray-500 text-xs mt-1">5 min core + deep-dive FAQs</div>
              </Link>
              <Link
                href="/day-in-web4"
                className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
              >
                <div className="text-sky-400 font-semibold mb-1">A Day in Web4</div>
                <div className="text-gray-400 text-sm">
                  See what your day would look like &mdash; mail, reviews, hiring, marketplaces
                </div>
                <div className="text-gray-500 text-xs mt-1">5 min read</div>
              </Link>
              <Link
                href="/karma-journey"
                className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
              >
                <div className="text-sky-400 font-semibold mb-1">Karma Journey</div>
                <div className="text-gray-400 text-sm">
                  Make choices that shape your trust across multiple lives
                </div>
                <div className="text-gray-500 text-xs mt-1">15 min interactive</div>
              </Link>
              <Link
                href="/society-simulator"
                className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
              >
                <div className="text-sky-400 font-semibold mb-1">Society Simulator</div>
                <div className="text-gray-400 text-sm">
                  Watch 12 agents form alliances, betray, and self-organize
                </div>
                <div className="text-gray-500 text-xs mt-1">15 min interactive</div>
              </Link>
            </div>
          </details>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <Link
              href="/learn"
              className="block bg-gradient-to-r from-purple-950/30 to-sky-950/30 border border-purple-800/30 rounded-lg p-4 hover:border-purple-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">Prefer a guided path?</span>
                <span className="text-gray-500 text-xs">&rarr;</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Learning Journey — structured progression from beginner to advanced, with time estimates for each concept
              </div>
            </Link>
          </div>
        </div>

        {/* Make it personal */}
        <div className="bg-gradient-to-br from-sky-950/30 to-green-950/30 border border-sky-800/30 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Make it personal</h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            Frustrated by spam, fake reviews, or platforms that hold your reputation hostage?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/your-internet"
              className="text-sky-400 hover:underline font-semibold"
            >
              See what would change for YOU &rarr;
            </Link>
            <Link
              href="/day-in-web4"
              className="text-sky-400 hover:underline font-semibold"
            >
              Walk through a day in Web4 &rarr;
            </Link>
          </div>
        </div>

        {/* Share-friendly summary */}
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">The one-sentence version</h2>
          <p className="text-gray-300 leading-relaxed text-lg italic">
            &ldquo;What if the internet made trust a built-in feature instead of something platforms
            bolt on — and you could see it working in a simulation right now?&rdquo;
          </p>
        </div>
      </section>
      <ExplorerNav currentPath="/tldr" />
      <RelatedConcepts currentPath="/tldr" />
    </>
  );
}
