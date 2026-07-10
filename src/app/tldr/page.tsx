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
        <p className="text-lg text-gray-400 leading-relaxed mb-6">
          Plain English first, so you can read this cold &mdash; every term is spelled out the first time it appears. The two you&apos;ll lean on most are ATP and LCT; a few more (T3, CI, MRH) appear briefly below, each glossed in place, with deeper shorthand explained on their own pages.
        </p>

        {/* June-24 visitor LOW (appeared 2×: TL;DR narrative + Unanswered Q3): the
            Web4-protocol vs 4-Life-site distinction is stated plainly on the page, but
            only at line ~148 inside the bottom "Where is this now?" box. A linear reader
            forms the "is this the thing, or a demo of the thing?" confusion at the intro,
            long before reaching it. Per the proactive-vs-reactive anchor pattern (PR #362),
            add ONE early orientation above everything. Wording kept distinct from the late
            line (idea/model + spec vs "protocol — rules and math") to avoid a density echo;
            no new claim — hestia/the hub/spec are already named below as open-source. */}
        <p className="text-base text-gray-400 leading-relaxed mb-10 border-l-2 border-sky-800/60 pl-4">
          <strong className="text-gray-200">First, what is this?</strong>{' '}
          <span className="text-gray-300">Web4</span> is the proposed idea &mdash; a trust model with an open, written spec.{' '}
          <span className="text-gray-300">4-Life</span> is this site: a hands-on lab that lets you watch that model work through simulations and explainers. So what you click here <em>demonstrates</em> Web4 rather than being the live system itself &mdash; though a few real pieces already run, as separate open-source projects (linked at the bottom).
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
                messaging, voting — everything draws from a personal energy budget (called ATP — short for Allocation Transfer Packets,
                a name borrowed from cellular biology, where ATP is the molecule your cells spend to do work),
                but the budget refills continuously when others confirm your work was useful, so contributors don&apos;t get locked out.
                Each action also creates a small receipt of what you spent. Spam drains the budget with no return.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">2.</span>
              {/* June 11 visitor (browse A) MEDIUM: "the constellation is called an LCT" contradicted
                  /lct-explainer (LCT = the identity record; constellation = the witnessing device set)
                  — visitor "had to unlearn the first definition". Align to the explainer's framing. */}
              <p className="text-gray-300">
                <strong className="text-white">Identity is anchored in your devices.</strong> Think
                of it as a digital ID card that lives in your device&apos;s security chip — not a
                password you type or a key file you store, but a presence your hardware proves.
                Your phone, laptop, and tablet each carry such chips, and each one vouches for the
                others, so no single device can speak for you alone — together they form a{' '}
                <em>constellation</em>. The identity record that constellation anchors is called a
                Linked Context Token (LCT). More devices strengthen the constellation. Creating a fake identity
                means buying new hardware — expensive and slow.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 text-xl mt-0.5">3.</span>
              <p className="text-gray-300">
                {/* June 12 visitor HIGH (browse A): "permanent" here collided with the decay
                    half-lives documented on /trust-tensor and /why-web4 — careful readers caught
                    the contradiction. The accurate pitch is persistent-and-unresettable, not
                    frozen-forever. Same wording fix applied on / and /why-web4. */}
                <strong className="text-white">Trust is earned, never bought.</strong> Your
                reputation is multi-dimensional (not just a single score), portable across
                platforms, and persistent &mdash; it follows you and can&apos;t be reset, though it
                fades without fresh activity. Good behavior compounds. Bad behavior follows you.
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
              May 14 visitor MEDIUM #1: counting 6 acronyms on one short page felt dense. Trade-off this iteration: keep the cold-hit hook (letters T3/MRH/CI still visible in the <summary> line so a later page's mention isn't a cold drop) but move the expanded gloss behind a click. Hypothesis to falsify next cycle: visitors who only want the 2-minute overview can ignore this; visitors meeting T3/MRH/CI on later pages still have a primed hook from the summary.
              June 11 visitor (browse A) LOW: landing's "5 ideas" vs this page's 4 numbered items = "did I miscount?" — appended one clause to the summary mapping the counts (append-only per policy review; the iterated wording above it is untouched).
              May 22 visitor: hypothesis FALSIFIED. A linear reader hit the three BARE acronyms in the summary line, did NOT expand to find the glosses, and felt the "plain English first" promise broke ("seeing three undefined acronyms"). New decision: the summary now LEADS with three plain-English handles (trust dimensions / trust neighborhood / behavior holding together) and defers the letters to a "tap for the shorthand (T3, MRH, CI)" clause. This preserves both surviving constraints — May 14 density (still no full glosses in the summary) and the primed-hook (acronym letters still present, just no longer leading). Expanded <p> glosses unchanged. */}
          <details className="mt-4 pl-9">
            <summary className="text-gray-500 text-sm italic cursor-pointer hover:text-gray-400 select-none">
              Three more ideas round out the picture &mdash; your trust dimensions, your trust neighborhood, and whether your behavior holds together over time &mdash; each on its own page. Tap for the shorthand (T3, MRH, CI) and links, or meet them when you get there. (With energy and identity above, these three are the landing page&apos;s five key ideas &mdash; #3 and #4 here are ground rules, not extra concepts.)
            </summary>
            <p className="text-gray-500 text-sm leading-relaxed mt-3 italic">
              <Link href="/trust-tensor" className="text-gray-400 hover:text-sky-400 underline decoration-gray-700">T3 (Talent / Training / Temperament)</Link>{' '}
              — the three dimensions of trust, scored per role;{' '}
              <Link href="/trust-neighborhood" className="text-gray-400 hover:text-sky-400 underline decoration-gray-700">MRH (Markov Relevancy Horizon)</Link>{' '}
              — your trust neighborhood, distance-adjusted reach that fades to nothing within ~3 hops; and{' '}
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
            Web4 is <strong>active research — and parts of it are already deployed</strong>.
            The trust layer (<Link href="/hestia" className="text-emerald-400 hover:underline">hestia</Link>) runs
            today on your own hardware, and{" "}
            {/* Jul-7 visitor LOW: "a Web4 society (the hub) is runnable reference code" compressed in
                the visitor's head to "reference society implementation — three abstract words in a
                trench coat". Gloss the hub by what it DOES for a community (visitor's own suggested
                parenthetical), keep tier honesty: still "runnable reference code", not live. */}
            <Link href="/hub" className="text-purple-300 hover:underline">the hub</Link> &mdash; the
            program a community runs to become its own small Web4 society &mdash;
            is runnable reference code. Both are open source.{" "}
            <span className="text-gray-400">You can run this software on your own machine to test the mechanics &mdash; there&apos;s no live network of real users to join yet.</span>{" "}
            <Link href="/running-now" className="text-emerald-400 hover:underline">See what&apos;s live &rarr;</Link>
            {" "}One distinction worth keeping straight: <strong className="text-gray-100">Web4 is the protocol &mdash; the rules and math; 4-Life (this site) is the lab where you explore those rules</strong> through simulations, walkthroughs, and explainers.
            So 4-Life lets you watch the mechanics in action — see societies form, trust networks
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
                <li><strong className="text-emerald-300">hestia</strong> &mdash; the trust layer, <em>deployed and running</em> on your own hardware (AGPL)</li>
                <li><strong className="text-purple-300">the hub</strong> &mdash; a runnable Web4 society you can fork (AGPL)</li>
                <li>This site &mdash; dozens of interactive explainers and runnable simulations</li>
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
            The trust layer runs and the simulations work; the open question is whether whole
            communities behave like the simulations once they adopt it.
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
