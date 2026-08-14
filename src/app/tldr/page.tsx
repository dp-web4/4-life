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
            {/* Aug-13 visitor MEDIUM: "'your own device is your day-zero witness for your
                identity' reads as 'you can start alone, no hardware needed.' /lct-explainer shows
                the bootstrap actually rests on a manufacturer-burned key in a security element and
                a vendor certificate chain. The reassurance is a hardware feature described without
                the word hardware." True of the link destination: #first-device-bootstrap opens
                "Short answer: the chip itself does" and was chip-scoped throughout.
                The added sentence names both branches. It does NOT take the visitor's literal
                suggestion ("say the day-zero witness is the device's security chip"), which alone
                would push this page toward hardware-as-entry - the claim Q8 Ruling 1 answered
                AGAINST (web4-standard/core-spec/LCT-linked-context-token.md 1.2 clause 1: an
                entity presenting only weak evidence MUST NOT be excluded by the protocol, only
                weighed as riskier; the conformance half of [[hardware-required-seam]] is closed on
                that ruling). Do not "complete" the unfollowed suggestion by deleting the software
                branch. The irony worth keeping: the visitor's naive reading of this line ("you can
                start alone") was CORRECT against canon. The defective surface was the explainer
                that offered no chipless branch, which is fixed in the same push
                (grep -n "And if there is no security chip" src/app/lct-explainer).
                "carries less weight" is propagated, not coined: it is this site's own phrase at
                lct-explainer's Key Duplication row (grep -n "which is part of why it carries less
                weight" src/app/lct-explainer). No ceiling number is imported here, in either
                page's calibration, and nothing is asserted about a reader at any score (Q1).
                Aug-14, SECOND filing, and the imperative above is unchanged by it: the visitor read
                this exact clause and reported "I read 'carries less weight' as 'a bit slower to
                build up'. It does not mean that", closing with "I would rather be told hard news in
                two minutes than discover it on page nine." Aug-13's HIGH 3 is the same claim.
                Three fixes were available and they are not the same
                ([[routing-stating-weighting-three-fixes]]): STATE the ceiling here (forbidden by
                the sentence above, and it is a Q8-equity claim this page does not own), WEIGHT it
                (a density call this box has already lost twice), or ROUTE. Routing is the one that
                was actually missing, and the honest account is not "no link existed" but "the link
                pointed elsewhere": the clause above already links #first-device-bootstrap, which is
                correct for the WITNESS question and silent on what the tier costs.
                Destination is the anchor that already answers it and stops in the same place this
                page does (grep -n 'id="software-only-survival"' src/app/lct-explainer): it states
                the ceiling and the sustained-collapse rule and asserts nothing at exactly 0.50.
                This is the site's fifth link into it; the four already shipping are on /hestia,
                /what-could-go-wrong, /why-web4 and /trust-tensor, and /trust-tensor's link text
                names the ceiling number outright. Routing to a fence-compliant destination carries
                no claim across ([[fence-does-not-cover-already-shipped-sentence]] in reverse): the
                anchor's demand-driven guard covers the new inbound link. Do NOT "finish" this by
                importing the number into the link text here.
                SWEEP OBLIGATION, discharged and recorded ([[adding-a-distinction-creates-a-sweep-obligation]]):
                `grep -rn "day-zero" src/app`, minus comment lines and minus the new
                lct-explainer paragraph this push adds, RENDERS on four surfaces. This one was the
                only unqualified use; the other three (lct-explainer's bootstrap FAQ short answer,
                the crypto-glossary hardware-attestation entry, and the Minute 0:00 walkthrough)
                each name the chip INSIDE their own clause, so none of them can be read as
                chip-free and none is owed this distinction. If a further rendered use appears
                without the chip in its own clause, it belongs in this sweep. Count deliberately
                stated with its exclusions rather than as a bare integer
                ([[claim-class-grep-truncated-enumerate-remainder]]). */}
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
                that witnesses what you do. On a device with a security chip, that day-zero witness
                is the chip itself; with software alone it is a key on your machine, which starts
                you the same way and{" "}
                <Link href="/lct-explainer#software-only-survival" className="text-sky-400 hover:underline">
                  carries less weight
                </Link>
                . Witnessing is per action, not a standing
                relationship.
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
              the third tier (Spec) so a Spec badge met later is not a surprise.
              (Aug-13: the closing paragraph now carries one clause that is NOT from that
              legend, by necessity, and the guard beside it says which and why. Read that
              before "restoring" the subset.)
              DIRECTION NOTE, Aug-13 15:00: the subset rule says canonical statements land on
              /running-now FIRST. The Reference and Running rows below were reconciled the other
              way round, by DELETING from /running-now to match this page, because on those two
              rows this page was the more careful of the two (its Reference row never carried
              "Finished code you could install and start today", which the Aug-13 visitor read
              against hardbound's own not-production-ready wording on that same page; and its
              Running row already carried the adoption scope inline, which /running-now's had one
              paragraph too late). Both rows are now byte-identical across the two pages, so the
              invariant HOLDS in outcome. The rule is not repealed: a NEW tier claim still lands on
              /running-now first. What happened here was a deletion and a relocation, not a new
              claim. The
              "not how good it is" half is load-bearing: hardbound is badged Reference and
              this page's own prose calls it "a usable, actively hardened enterprise tier"
              (a mismatch the Jul-27 visitor filed separately), so a bare "later is better"
              would license the misread that hestia is the more finished piece.

              Aug-04: "in day-to-day use" is the exact phrase the Aug-01 visitor said was
              stronger than the fact under it, and this is the surface where a reader meets
              it FIRST (they met the badges here and only reached the full key later). The
              scope added here is the same clause added to /running-now#badge-key: it scopes
              the deployment the site COUNTS and says nothing about who else may have
              installed the published SDKs (see the long guard beside running-now's
              #whose-machines paragraph).
              (This line used to end "cut to a parenthetical so this gloss stays a strict subset".
              That was already false before Aug-13 touched anything: the Running row below is two
              full sentences and no parenthetical. Corrected rather than bumped, per
              [[opposite-intents-in-code-comments]]. Pre-existing rot, not a description of the
              Aug-13 edit. As of Aug-13 15:00 the same two sentences render on /running-now's
              Running row too, so "subset" on this row now means byte-identical.) */}
          <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/30 p-4">
            <p className="text-gray-300 text-sm font-medium mb-3">
              The tag on each card says how far along that piece is:
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              {/* Aug-14 visitor MEDIUM: "Defines two tags (Reference, Running), then says 'The
                  three run in that order' and links to 'the full three-tier key (Spec, Reference,
                  Running).' A cold reader is told about three after being shown two, and scrolls
                  back looking for the missing one." They scrolled back twice. The paragraph below
                  also USES the word twice on its own ("the core standard below is both Spec and
                  Reference"), so this page names Spec three times and defined it zero.
                  Row propagated verbatim from the canonical legend this box links to
                  (`grep -n 'tier="spec"' src/app/running-now`, first hit), so the strict-subset
                  invariant recorded at the head of this box holds by construction.
                  Placed FIRST because the paragraph below asserts an order ("The three run in that
                  order, measured by distance from written down to in daily use") and a Spec row
                  under Running would falsify it. */}
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5"><MaturityBadge tier="spec" /></span>
                <span>
                  defined in the Web4 standard. Written down and stable, not yet built here.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5"><MaturityBadge tier="reference" /></span>
                <span>
                  built and runnable. Runnable is not the same as running in production.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5"><MaturityBadge tier="running" /></span>
                <span>
                  deployed and operational today, in day-to-day use. The daily use counted
                  so far is the building lab&apos;s own, so this badge does not claim adoption.
                </span>
              </div>
            </div>
            {/* Aug-12 visitor, two items on this one paragraph.

                (a) "They run in that order" was read as the PIECES running, not the badges
                ordering: "I read 'they run' as the pieces running, not the badges ordering.
                Took two passes." On a site where Running is itself a badge name, "they" was
                doing too much work. /running-now#badge-key ALREADY says "The three run in that
                order" and needed no change; this copy was the one that had drifted off it.
                Mirrored rather than re-authored, because the subset invariant above runs in
                that direction ([[propagate-the-sentence-not-your-summary]]).

                (b) LOW: "The core standard card is badged just Reference here. On /running-now
                the same piece is badged Spec + Reference. Small, but I noticed, because badges
                were being sold to me as precise." The gloss defined two tiers, ranked them, and
                never said a piece can carry MORE THAN ONE, so a card showing one tier read as
                the whole claim about that piece. "A piece can carry more than one" and "the core
                standard below is both Spec and Reference" are verbatim from the canonical legend
                (grep -n "carry more than one" src/app/running-now), so the TIER claims stay a
                strict subset.

                One clause is deliberately NOT from the source and cannot be: "these cards show
                only the furthest it has reached" is a statement about THIS grid's rendering, which
                /running-now does not own and could not make. It is true of all four cards today
                (core standard Spec+Reference -> Reference, hub Reference, hestia Running,
                hardbound Reference) and is now a CONSTRAINT on this grid: if a card here ever
                renders a non-furthest tier, or MaturityBadges replaces MaturityBadge on one of
                them, this clause is falsified and must move with it. The subset invariant is
                about tier DEFINITIONS drifting apart, and that is intact.

                NOT fixed by badging the card <MaturityBadge tier="spec" /> + Reference to match
                /running-now, which is the visitor's first option and looks cheaper.
                Aug-14: the reason this refusal USED to give is now spent, and saying so is the
                point of this paragraph ([[opposite-intents-in-code-comments]]). It read "It would
                put an UNDEFINED tier chip on this page: the two rows above define Reference and
                Running only" (those rows existing because the absence of a tier key HERE was filed
                three separate times: Jul-24 LOW, Jul-27 LOW, Jul-28 MEDIUM). The Aug-14 visitor got
                Spec DEFINED in the box above, so that premise is false and a later pass reading it
                would find rot.
                The refusal stands on the ground that survives, which was always the independent
                one: the clause two sentences down, "these cards show only the furthest it has
                reached", is a live rendering CONSTRAINT on this grid. Badging one card Spec +
                Reference falsifies it directly, and it is true of all four cards today. That
                constraint never depended on whether Spec was defined.

                Sweep: /the-standard's hero eyebrow also badges the core standard bare Reference
                and is deliberately LEFT ([[adding-a-distinction-creates-a-sweep-obligation]]).
                Criterion: this clause is owed where a reader COMPARES pieces, and only the two
                card grids do that (this page and /running-now). /the-standard badges one piece
                on its own page with nothing to be inconsistent with. /onramp's and the landing
                page's badges are not core-standard badges at all (they badge "How the pieces
                compose" and "Where this actually stands"), so they are outside this class.

                Both edits are additive to a box LOW 14 calls too long. Deliberate: a badge that
                contradicts the maturity ledger is a correctness defect and outranks the density
                LOW. The clause is load-bearing; a density pass must not trim it back out. */}
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              The three run in that order, measured by distance from written down to in daily
              use. A piece can carry more than one, and these cards show only the furthest it
              has reached: the core standard below is both Spec and Reference. The badge says
              how far a piece has travelled, not how good it is:
              hardbound below is badged <MaturityBadge tier="reference" /> and is a usable,
              actively hardened tier.{' '}
              <Link href="/running-now#badge-key" className="text-sky-400 hover:underline">
                See the full three-tier key (Spec, Reference, Running) &rarr;
              </Link>
            </p>
          </div>
          {/* Aug-11 visitor LOW 7: "Three of four pieces carry the identical Reference
              badge, while the honest-status prose below distinguishes them sharply
              (installable ... vs. no live user network vs. hardware binding unvalidated).
              Skimmers read the badge, not the paragraph." Deferred three times as a
              design pass; it is not one. The gloss box above is per-TIER (what Reference
              and Running mean, and that later is not better) and says nothing per PIECE,
              so three cards really do read identically to a skimmer while the page's own
              "How real is it, honestly?" bullets, ~60 lines down, tell them apart.

              The fix shape is already shipped and visitor-validated on /running-now, at
              its Hestia block: a Jul-23 LOW ("the Running badge read more finished than
              the fine print, because the caveat sat ~27 lines below it") was fixed by
              PINNING the caveat directly under the badge at point of first read, with no
              new badge tier. Same defect, same fix, one page earlier.

              SOURCE OF TRUTH: each line below is a strict subset of that piece's own
              bullet in "How real is it, honestly?" on this page. Do not re-derive them
              and do not reword the bullets without moving these too; a subset cannot
              contradict its source, a paraphrase can.

              Hardbound carries BOTH halves on purpose. "usable, actively hardened" and
              "hardware binding not yet validated" travel as a pair on four surfaces (/,
              /onramp, /running-now, and the gloss box 50 lines above this, which calls
              hardbound usable while badging it Reference). A negative-only chip here
              would contradict all four.

              Hestia gets no line. Its badge is already the distinct one, so it is not
              part of the flattening the visitor filed, "runs end to end today" adds
              nothing its badge does not, and this card's blurb was rewritten by #535 to
              settle the same browse's HIGH. Do not add hardware wording here. */}
          <div className="space-y-3">
            <Link
              href="/the-standard"
              className="block bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-sky-600 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-sky-300 font-semibold">The core standard</span>
                <MaturityBadge tier="reference" />
              </div>
              <p className="text-gray-300 text-xs mb-1.5">
                Stable; the primitives are installable now.
              </p>
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
              <p className="text-gray-300 text-xs mb-1.5">
                Runnable, but not yet a live network of real users.
              </p>
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
                Personal scale: a trust layer for you and your own agents, running on your own
                machine with no cloud.
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
              <p className="text-gray-300 text-xs mb-1.5">
                Usable and actively hardened; its hardware binding is not yet validated on
                real devices.
              </p>
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
          {/* Aug-13 visitor HIGH. "Reputation is portable and cannot be reset by deleting an
              account or switching platforms" carried no qualifier, on the FIRST page of the
              five-page reading path, under a heading reading "The Result". The visitor filed it
              as a headline promise on page 1 and found it false for their own tier six pages
              later: "I filed that as a headline promise. Six pages later I learned it is not
              true for the tier I would actually be using."

              This is a missed member of the claim class the Aug-08 sweep discharged (ledger Q8
              follow-up). It survived because it states the claim by SYNONYM: "reset by deleting
              an account" never says "fresh start" or "hardware-bound", so every phrase-grep in
              that sweep walked past it ([[sweep-the-claim-not-the-sentence]]).

              Licensed by Q8 Ruling 1 (ANSWERED 2026-08-05): software-only anchoring is
              conformant and canon forbids excluding the tier, so an unresettable record is not
              true of Web4 as such.

              SCOPING ONLY, deliberately, and NOT the /karma-consequences-style propagated
              paragraph. Two reasons, both about this page rather than about density:
              - This page has ZERO occurrences of "sheddable", "software-only" or "software
                alone" to receive that paragraph, and the Aug-08 remedy for a receiving page
                with no antecedents was to carry the unit whole. The 2-minute page cannot take
                a unit.
              - "tier" is NOT available as a word here. It appears 20+ times on this page
                meaning the MATURITY badge (Spec / Reference / Running), under a guard that
                exists because tier definitions drifting apart was filed three times. Anchor-tier
                language would collide ([[borrowed-word-means-something-else-there]]). Hence
                "anchored in hardware", and hence the why-web4:831 formulation below with its
                "check which tier you are in" clause dropped.

              Scope alone was judged insufficient: under a heading reading "The Result" a reader
              defaults to assuming they are the described case, and /onramp actively recruits
              them into the other one ([[keeping-the-true-half-can-still-reassure]]). So the
              scope carries one routing clause. Formulation propagated verbatim in shape from
              why-web4:831 ("X is a property of hardware anchoring, not of Web4 as such"); link
              text propagated from first-contact:1100, the reading-path sibling that already
              carries this exception. Do not re-derive either into a fresh variant
              ([[propagate-the-sentence-not-your-summary]]).

              Carries no ceiling number, no survival line, and no claim about a reader at
              exactly 0.50 in either direction: that is Q1 and the Q8 equity half, both still
              fenced. */}
          <p className="text-gray-300 leading-relaxed text-lg">
            Actions carry proof. Authority is checkable. Reputation is portable, and where your
            presence is anchored in hardware it cannot be reset by deleting an account or
            switching platforms. Humans and AI play by the same
            rules, because the rules are about behavior, not about who or what you are. And it
            works without a central authority deciding who counts as trustworthy.
          </p>
          <p className="text-gray-400 text-sm mt-3">
            Unresettable reputation is narrower than it sounds: it is a property of hardware
            anchoring, not of Web4 as such.{' '}
            <Link href="/what-could-go-wrong#risk-accessibility" className="text-sky-400 hover:underline">
              What that costs, and who it costs most &rarr;
            </Link>
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
              invented here: five concepts at 2+6+7+10+5 = 30 min, and the short version on
              that page is ~15 minutes (2+6+7). Changing either number means changing /learn
              too.

              Jul-30 visitor LOW: both totals moved (28 -> 30, 13 -> 15) because /learn's
              first-contact estimate moved 5 -> 7 to agree with the page that owns it. The
              reasoning lives on that card in /learn's beginner path. The complete set of
              surfaces carrying a total is this paragraph (both numbers), /learn's
              reading-path box (both numbers), and the 'The Reading Path' desc in
              navigation.ts.

              Aug-01 visitor MEDIUM 6: this card's copy is unchanged, and it is the reason
              /learn changed. The reader took this handoff, which names all five pages and
              says "you have just finished the first", and landed on a box headed "New here?
              Start with these 3" whose step 1 was /tldr. That box is now the five in order,
              with the three-read short version as a labeled stopping point inside it, and
              its heading is "The reading path: five pages, about 30 minutes". Anchor by that
              heading, not the retired one. It also now carries a per-item copy of all five
              beginner durations, so a duration change lands in six places, not four. */}
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
