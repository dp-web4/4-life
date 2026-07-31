import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";

export const metadata = {
  title: "Web4 in 2 Minutes | 4-Life",
  description:
    "The shortest possible explanation of Web4: the problem it solves, the four pieces that solve it, and how far along each one is today.",
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
        <p className="text-lg text-gray-400 leading-relaxed mb-8">
          Plain English first, so you can read this cold. Every term is spelled out the
          first time it appears, and nothing here needs a background in crypto or AI.
        </p>

        <p className="text-base text-gray-400 leading-relaxed mb-10 border-l-2 border-sky-800/60 pl-4">
          <strong className="text-gray-200">First, what is this site?</strong>{' '}
          <span className="text-gray-300">4-Life</span> is an educational onramp to Web4: a
          set of explainers (this site, nothing you install) that walk you from the problem
          to the working pieces. <span className="text-gray-300">Web4</span> is the thing
          being explained, and parts of it are real code you can install today (linked
          below). One note on wording: when a page here says &ldquo;the onramp,&rdquo; it
          means the four pieces of Web4 you actually run (the core standard, the hub, hestia,
          hardbound), which 4-Life teaches but is not one of.
        </p>

        {/* The Problem */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-red-400">The Problem</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            AI agents already take real actions. They write and ship code, move money, and
            make decisions that stick. Yet right now we cannot prove what an agent actually
            did, on whose authority it acted, or by what rules it was supposed to operate. The
            same gap exists for people. When something goes wrong, there is no trustworthy
            record to point to.
          </p>
        </div>

        {/* The Shift */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-sky-400">The Shift</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-4">
            Web4 closes that gap with one idea: trust is earned through witnessed behavior,
            not granted from above. To witness is to observe an action and attest to it,
            staking your own reputation on what you sign. That is a break from how the web
            has worked so far.
          </p>
          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="text-gray-500 font-semibold whitespace-nowrap mt-0.5">Web2</span>
              <p className="text-gray-300">
                A platform <em>declares</em> your reputation. Delete the account and it is gone.
                Switch platforms and it never existed.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-gray-500 font-semibold whitespace-nowrap mt-0.5">Web3</span>
              <p className="text-gray-300">
                Whoever holds the key <em>is assumed to be</em> the rightful owner. A stolen or
                shared key speaks for you, and nothing records whether the action was
                appropriate.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-sky-400 font-semibold whitespace-nowrap mt-0.5">Web4</span>
              <p className="text-gray-300">
                Trust accrues from <em>witnessed behavior</em>: other participants (a device, a
                person, or a service) observe what you do and sign a small record of it. You need
                no prior reputation or contacts to begin: your own device is your day-zero{" "}
                <Link href="/lct-explainer#first-device-bootstrap" className="text-sky-400 hover:underline">
                  witness
                </Link>{" "}
                for your identity, and from your first action onward it is the community you join
                that witnesses what you do. Witnessing is per action, not a standing relationship.
                Every action leaves a verifiable record of what happened, under whose authority, and
                against which rules. Good behavior compounds. Bad behavior follows you.
              </p>
            </div>
          </div>
        </div>

        {/* The four pieces */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Four Pieces</h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-5">
            The onramp is four composable pieces: one substrate (the shared foundation
            everything else is built on), and three scales to run it. You do not adopt all
            four at once. You start where you are.
          </p>
          {/* Jul-24 visitor LOW: "each piece has a parenthetical label (Reference),
              (Reference), (Running), (Reference). At this point I don't know what
              Reference vs Running means. There's no inline key here; I only learned the
              definitions two pages later on Running Now." MaturityBadge does carry a
              title= tooltip, but hover-only text is invisible on mobile and to anyone
              reading rather than pointing, so the tags needed a written gloss at first
              read. #487 shipped that gloss as a paragraph.

              It then MISSED TWICE MORE, both times on this page: Jul-27 LOW ("Nothing on
              this page tells me what 'Reference' means... I did not find the legend until
              /running-now") and Jul-28 MEDIUM ("with no gloss on this page"). Two readers
              who were looking straight at it reported it absent, so the first residual is
              PROMINENCE, not wording: dim body-adjacent prose sitting above four bold
              bordered cards reads as a caption, not a legend, and the badges it explains
              live inside the cards rather than next to it. It now renders the actual badge
              chips inside a bordered box, the same form as the /running-now legend that
              visitors do find and call "unambiguous" and "a good, honest three-step
              ladder".

              Jul-28 names the second residual: "whether Running was better than Reference
              or just different... the site didn't tell me here, I inferred it." The gloss
              defined each badge and never RANKED them. The rank sentence is canonical on
              /running-now#badge-key and restated here.

              Wording remains a strict subset of the /running-now legend (same page the
              link lands on) so the two surfaces cannot drift apart, and the link names
              the third tier (Spec) so a Spec badge met later is not a surprise. The
              "not how good it is" half is load-bearing: hardbound is badged Reference and
              this page's own prose calls it "a usable, actively hardened enterprise tier"
              (a mismatch the Jul-27 visitor filed separately), so a bare "later is better"
              would license the misread that hestia is the more finished piece. */}
          <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/30 p-4">
            <p className="text-gray-300 text-sm font-medium mb-3">
              The tag on each card says how far along that piece is:
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5"><MaturityBadge tier="reference" /></span>
                <span>
                  built and runnable. Runnable is not the same as running in production.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5"><MaturityBadge tier="running" /></span>
                <span>deployed and operational today, in day-to-day use.</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              They run in that order, measured by distance from written down to in daily
              use. The badge says how far a piece has travelled, not how good it is:
              hardbound below is badged <MaturityBadge tier="reference" /> and is a usable,
              actively hardened tier.{' '}
              <Link href="/running-now#badge-key" className="text-sky-400 hover:underline">
                See the full three-tier key (Spec, Reference, Running) &rarr;
              </Link>
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href="/the-standard"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-sky-300 font-semibold">The core standard</span>
                <MaturityBadge tier="reference" />
              </div>
              <p className="text-gray-400 text-sm">
                The substrate: an open ontology (a shared, written set of definitions) that
                makes actions verifiable. Everything else is built on it.
              </p>
            </Link>
            <Link
              href="/hub"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-purple-300 font-semibold">The hub</span>
                <MaturityBadge tier="reference" />
              </div>
              <p className="text-gray-400 text-sm">
                Community scale: the program a group runs to become its own small Web4 society.
              </p>
            </Link>
            <Link
              href="/hestia"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-emerald-400 font-semibold">Hestia</span>
                <MaturityBadge tier="running" />
              </div>
              <p className="text-gray-400 text-sm">
                <span className="italic text-gray-500">Named for the Greek goddess of the hearth.</span>{' '}
                Personal scale: a trust layer for you and your own agents, running on hardware
                you control.
              </p>
            </Link>
            <Link
              href="/hardbound"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-amber-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-amber-300 font-semibold">Hardbound</span>
                <MaturityBadge tier="reference" />
              </div>
              <p className="text-gray-400 text-sm">
                <span className="italic text-gray-500">As in hardware-bound.</span>{' '}
                Enterprise scale: oversight for organizations that need to prove what their
                agents did and hold them to policy.
              </p>
            </Link>
          </div>
          <p className="text-gray-500 text-sm italic mt-4">
            Want the dependency order and how they plug into each other in code?{' '}
            <Link href="/onramp" className="text-sky-400 hover:underline not-italic">
              See how the four pieces compose &rarr;
            </Link>
          </p>
        </div>

        {/* The Result */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-green-400">The Result</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Actions carry proof. Authority is checkable. Reputation is portable and cannot be
            reset by deleting an account or switching platforms. Humans and AI play by the same
            rules, because the rules are about behavior, not about who or what you are. And it
            works without a central authority deciding who counts as trustworthy.
          </p>
        </div>

        {/* Honest maturity */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-10">
          <h2 className="text-lg font-semibold text-amber-400 mb-2">How real is it, honestly?</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Web4 is R&amp;D, not a finished product. Here is the real state of each piece, with no
            polish on it:
          </p>
          <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside mb-3">
            <li>
              <strong className="text-sky-300">The core standard</strong> is stable. The spec
              corpus holds steady, and the primitives (the core building blocks) are
              installable now:{' '}
              <code className="text-gray-200 bg-gray-900/60 px-1 rounded">pip install web4-core</code>{' '}
              or <code className="text-gray-200 bg-gray-900/60 px-1 rounded">cargo add web4-core</code>.
            </li>
            <li>
              <strong className="text-purple-300">The hub</strong> is pilot-ready: runnable
              reference code a community can stand up, not yet a live network of real users.
            </li>
            <li>
              <strong className="text-emerald-400">Hestia</strong> runs end to end today.
            </li>
            <li>
              <strong className="text-amber-300">Hardbound</strong> is a usable, actively
              hardened enterprise tier. Its hardware binding (tying identity to a physical
              security chip) is not yet validated on real devices.
            </li>
          </ul>
          <p className="text-gray-500 text-xs italic">
            No timeline commitments. This is research, and research takes as long as it takes.{' '}
            <Link href="/running-now" className="text-emerald-400 hover:underline not-italic">
              See what is real today &rarr;
            </Link>
          </p>
        </div>

        {/* Where to go next */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Where to go next</h2>
          {/* Jul-28 visitor MEDIUM: the reader took the site's own "Start here" CTA, which
              lands here, and did not find the recommended reading order until minute 60 of
              a 60-minute session. "Found this last, which is funny, because it's the path I
              should have taken first." Their own suggested fix was to surface it in Start
              Here "or make /tldr end by handing off to it". Doing both.

              This is deliberately NOT a fourth cell in the grid below. That grid is three
              lateral jumps; a fourth equal-weight card would make a 3+1 orphan and would
              re-create, one page earlier, exactly the burial being complained about. The
              path is the default and has to read as the default, so it sits above the grid
              and the grid becomes the alternative.

              The two numbers are load-bearing and both come from /learn, so they cannot be
              invented here: five concepts at 2+6+7+10+5 = 30 min, and the "New here? Start
              with these 3" box on that page says ~15 minutes (2+6+7). That box used to read
              as a competing answer on arrival; it now states that the three are steps 1-3 of
              the five. Changing either number means changing /learn too.

              Jul-30 visitor LOW: both totals moved (28 -> 30, 13 -> 15) because /learn's
              first-contact estimate moved 5 -> 7 to agree with the page that owns it. The
              reasoning lives on that card in /learn's beginner path. The complete set of
              surfaces carrying a total is this paragraph (both numbers), /learn's "New here?
              Start with these 3" paragraph (both numbers), and the 'The Reading Path' desc
              in navigation.ts. */}
          <Link
            href="/learn"
            className="block bg-sky-950/40 border border-sky-700/50 rounded-lg p-5 mb-4 hover:border-sky-500 transition-colors"
          >
            <div className="text-sky-300 font-semibold mb-1">
              Read the site in order (recommended) &rarr;
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              There is a suggested path: five pages, about 30 minutes, and you have just
              finished the first. Next is Why Web4?, then First Contact, How It Works, and
              Running Now. Each one builds on the last, and the first three take about 15
              minutes if that is all the time you have.
            </p>
          </Link>
          <p className="text-gray-500 text-sm mb-3">Or jump straight to:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/onramp"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="text-sky-400 font-semibold mb-1">The onramp &rarr;</div>
              <div className="text-gray-400 text-sm">
                How the four pieces compose, and the order to adopt them in.
              </div>
            </Link>
            <Link
              href="/the-standard"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-600 transition-colors"
            >
              <div className="text-purple-300 font-semibold mb-1">The standard &rarr;</div>
              <div className="text-gray-400 text-sm">
                The substrate everything is built on, in plain terms.
              </div>
            </Link>
            <Link
              href="/running-now"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-emerald-600 transition-colors"
            >
              <div className="text-emerald-400 font-semibold mb-1">Running now &rarr;</div>
              <div className="text-gray-400 text-sm">
                What actually works today, piece by piece.
              </div>
            </Link>
          </div>
        </div>

        {/* Share-friendly summary */}
        <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">The one-sentence version</h2>
          <p className="text-gray-300 leading-relaxed text-lg italic">
            &ldquo;Agents already act in the real world, so trust should be earned through
            witnessed behavior, not declared by a platform or assumed from a key.&rdquo;
          </p>
        </div>
      </section>
      <ExplorerNav currentPath="/tldr" />
      <RelatedConcepts currentPath="/tldr" />
    </>
  );
}
