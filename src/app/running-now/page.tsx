import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge, { MaturityBadges } from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Running Now is the honest maturity ledger for the four onramp pieces: the core
 * standard, the hub, hestia, and hardbound. Its job is to state exactly what is real,
 * installable, runnable, and deployed today, without overstating any of it. Web4 is
 * R&D, not production; this page draws the line piece by piece and refuses to blur it.
 * Every claim here mirrors what the public repos and package registries already show.
 */

export const metadata = {
  title: "Running Now | 4-Life",
  description:
    "An honest maturity ledger for the four Web4 onramp pieces: what is real, installable, runnable, and deployed today, and what is not.",
};

export default function RunningNowPage() {
  return (
    <>
      <PageTracker slug="running-now" />
      <Breadcrumbs currentPath="/running-now" />
      <NewcomerOrientationBanner accent="#34d399" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-emerald-400 mb-4">
          Running Now
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          What is actually real today
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 is R&amp;D, not a shipped product. Nothing on this page is a fielded
          production system, and this page will not pretend otherwise. But much of it
          is real: published packages, reference implementations, and Rust binaries you
          can install and run right now. Below is a straight, piece-by-piece ledger of
          where each part of the{" "}
          <Link href="/onramp" className="text-emerald-400 underline hover:text-emerald-300">
            onramp
          </Link>{" "}
          actually stands.
        </p>
        {/* Jul-24 visitor LOW: the reader meets (Reference)/(Running) badges on the
            landing page and /tldr and only learns what they mean here, two pages later.
            This key is now deep-linkable so those first-read surfaces can send the
            reader straight to it. The id wraps the framing sentence as well as the three
            rows, so an anchor arrival lands on explanatory text, not three loose badges. */}
        <div id="badge-key" className="scroll-mt-20">
          <p className="text-lg text-gray-400 leading-relaxed">
            Every piece carries a maturity badge, so the claim and the reality stay pinned
            together:
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <MaturityBadge tier="spec" />
              <span>defined in the Web4 standard. Written down and stable, not yet built here.</span>
            </div>
            {/* Aug-13 visitor, both rows, one edit each. Net words DOWN.

                MEDIUM, Reference row: "The key defines Reference as 'Finished code you could
                install and start today,' but hardbound is badged Reference while the same page
                says 'This is not production-ready' and its hardware binding is not validated on
                real devices. Hardware binding is hardbound's whole purpose." Their suggestion was
                to move /tldr's more careful wording here, and /tldr's row is more careful by
                SUBTRACTION: it never had the "Finished code" sentence. So this is a bare deletion
                ([[density-guard-means-delete-not-caveat]]). "built and runnable" already carries
                installable-today, which is what the Spec row above contrasts against. Nothing
                replaced it and nothing should.

                LOW, Running row: the scope now IN this row is /tldr's, verbatim. It already
                existed on this page, as the paragraph below - which was itself the Aug-01
                visitor's fix for this identical complaint. The Aug-13 visitor filed the row again
                and credited the caveat to /tldr and to the hestia section further down, never to
                the paragraph sitting immediately under these rows. Read-it-and-still-filed-it
                twice, so the residual is PLACEMENT, not wording
                ([[routing-stating-weighting-three-fixes]]): on /tldr the scope is inside the row,
                here it was one paragraph too late, in the third of three same-weight gray
                paragraphs a reader takes as body text after the key.

                Both rows are now byte-identical to /tldr's, which keeps that page's declared
                strict-subset relation intact in the only way that survives a deletion from the
                canonical side. */}
            <div className="flex items-center gap-3">
              <MaturityBadge tier="reference" />
              <span>built and runnable. Runnable is not the same as running in production.</span>
            </div>
            <div className="flex items-start gap-3">
              <MaturityBadge tier="running" />
              <span>deployed and operational today, in day-to-day use. The daily use counted so far is the building lab&apos;s own, so this badge does not claim adoption.</span>
            </div>
          </div>
          {/* HISTORY, and the reason this is now two lines instead of one paragraph.

              Aug-01 visitor LOW, second sitting on the Running row. #496 (Jul-30, 94db436) took
              the OWNERSHIP half of that visitor's suggestion and deliberately left the DEFINITION
              half ("Badge tier is NOT touched", guard below). The Aug-01 visitor demonstrably read
              the ownership fix ("Four machines belonging to the people who built it") and filed
              the row again anyway, against the definition: "the badge definition is stronger than
              the fact under it." The scoping sentence already existed on this page ("Daily use by
              the people who build it is what the Running badge claims, and it does not claim
              adoption") but three sections below, inside the hestia section. Aug-04 propagated it
              up to the read point AS THIS PARAGRAPH.

              Aug-13: that was still not the read point. The visitor filed the row a third time
              ("The Running key says ... with no caveat") and credited the caveat to /tldr and to
              the hestia entry below, never to this paragraph, which sits immediately under the
              rows. So the clause moved INTO the row itself (guard above the rows), in /tldr's
              wording, and what stayed here is only what a row cannot carry: which piece is badged
              Running, and the link down. This paragraph is no longer the statement of the scope;
              it is the routing. Do not re-add "does not claim adoption" here - it would then
              render twice within about forty pixels, and the density call was the whole reason
              the Aug-04 version read as body text.

              UNCHANGED PROHIBITIONS, all three still binding on the row above:
              - it must not become a fourth tier;
              - it must not hedge the tier ORDER stated below (the Aug-01 visitor said naming the
                owner still leaves a legitimate Running badge, and #496's guard records the same);
              - it must not say "no outside users": the plugin and SDKs are published, so that
                absolute is not ours to print. It scopes the deployment this page COUNTS, which is
                all the anchored paragraph below does.
              The id="whose-machines" paragraph itself is still unchanged, and its own guard's
              instruction ("if you reword it, reword the badge-key line with it") now points at the
              row rather than at this paragraph. */}
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            The one piece badged <MaturityBadge tier="running" /> today is hestia:{" "}
            <a href="#whose-machines" className="text-emerald-400 underline hover:text-emerald-300">
              whose machines those are
            </a>
            .
          </p>
          {/* Jul-27 LOW + Jul-28 MEDIUM, both filed against /tldr: the visitor met a
              Reference badge and a Running badge and could not tell "whether Running was
              better than Reference or just different. I guessed Running > Reference and
              later found out I was right, but the site didn't tell me here, I inferred
              it." The three rows above define each badge and never rank them. This is the
              CANONICAL statement of the rank; /tldr carries a strict subset of it (that
              page's gloss is declared derivative of this legend, so the rank has to land
              here first or the two surfaces drift). Two things it must not say: that a
              piece occupies exactly one rung (the core standard directly below carries
              Spec AND Reference), and that a later badge means a better piece (hardbound
              below is Reference and is called usable and actively-hardened). Both of those
              misreads would be manufactured by the fix itself, three sections above the
              evidence against them. */}
          {/* Aug-05 visitor LOW / Unanswered Q6: "'Pilot-ready' is not in the badge legend, so
              I had a fourth status word with no slot to put it in." Every rendered use of the
              phrase on the site is about the hub, which is badged Reference, so the fix is to
              bind it inside that tier rather than drop it (the visitor's alternative). Dropping
              it would cost real information the badge does not carry, e.g. the honest
              "pilot-ready with no users" framing. Three things this must not become: a fourth
              tier (see the guard below), a hedge on the tier ORDER, or a claim that live
              instances exist - that last one is precisely what Running claims and this does not.
              If you add a rendered use of "pilot-ready" for anything other than the hub, this
              sentence stops being true and must move. */}
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            One phrase you will meet below is not a badge:{" "}
            <strong className="text-gray-300">pilot-ready</strong>, said of the hub, is a
            statement made <em>inside</em>{" "}
            <MaturityBadge tier="reference" />. It means the code is complete enough that a
            group could stand up one of the first live instances. It does not claim any exist
            yet, which is the thing{" "}
            <MaturityBadge tier="running" /> would claim.
          </p>
          {/* Aug-14 visitor MEDIUM 9: "Hestia is badged Running at version 0.0.3. The hub is
              badged Reference at version 0.1.0-alpha.0. As a normal person, 0.1.0 sounds
              further along than 0.0.3. The badges say the opposite. Nothing addresses this and
              I spent a minute assuming I had misread one of them."
              The Aug-14 15:00 pass deferred this and left the choice of home as an open
              question: a clause HERE, or a clause at the two render points (the hub's version
              sentence and hestia's). Answered HERE, for the reason this paragraph already
              exists: it is the canonical statement of the ladder and it owns every "what the
              badge is NOT" claim (see "not how good it is" beside it, and note /tldr's gloss
              is declared a strict subset of this legend, so a rank claim has to land here
              first). It also renders before both numerals, so the reader meets the disclaimer
              before the comparison that provokes it.
              Placement chosen WITH the precedent against it in view, so a re-file is read
              correctly: this page has a three-strike history (Aug-01, Aug-04, Aug-13) of
              caveats that only stuck once they moved INTO the row they qualified. The
              distinguishing argument is that the ordering model is FORMED here and the
              comparison the visitor made can only complete at the second numeral, which is
              hestia's, ~160 lines below. If the Aug-15+ visitor files this again, the residual
              is PLACEMENT, not wording: move it to the two render points, do not reword it.
              NO VERSION LITERALS here, deliberately, and do not "improve" it by adding them or
              by naming which of the two is lower. Both numerals render on their own pages too
              (grep -rn "0\.0\.3\|0\.1\.0-alpha" src/app), so a third copy 100+ lines above the
              two sources on THIS page rots on the next bump, and so does any comparative
              between them. The general form does not.
              Sweep criterion for what this leaves alone: the clause is owed only where two
              pieces' version numerals render on one page against differing badges, which is
              this page alone. /hub and /hestia each state one version and one badge, so
              neither surface can produce the comparison. */}
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            The three run in that order, measured by distance from written down to in daily
            use. A piece can carry more than one: the core standard below is both{" "}
            <MaturityBadge tier="spec" /> and <MaturityBadge tier="reference" />, because
            its specification is written and the primitives underneath it are built. And the
            badge says how far a piece has travelled, not how good it is. Hardbound below is
            badged <MaturityBadge tier="reference" /> and is a usable, actively hardened
            tier. Nor does it track version numbers: each piece numbers its own releases on
            its own schedule, so a piece on a lower version number can carry a further badge
            than a piece on a higher one.
          </p>
        </div>
      </section>

      {/* The core standard */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold text-sky-300">The core standard</h2>
          <MaturityBadges tiers={["spec", "reference"]} />
        </div>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          The specification corpus is stable, and the primitives underneath it are
          published as real packages. This is the shared foundation everything else
          builds on: identity, trust tensors, witness chains, and hash-chained ledgers,
          as installable libraries rather than diagrams.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Published primitives</strong>:{" "}
            <code className="text-sky-300">web4-core</code> v0.3.0 on crates.io and PyPI,
            plus <code className="text-sky-300">web4-trust-core</code> v0.2.0.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Reference implementation</strong> plus a
            runnable society hub, both public. No production deployment yet.
          </li>
          {/* Aug-06 visitor LOW: the 2,627 count named no artifact here and was attached to the
              wrong one on /the-standard, so the visitor "could not tell which package it belongs
              to". Three artifacts, per web4/STATUS.md:57 and :62 - and the reason the count
              would not place is that the third one is not a package. Keep this identical to
              the-standard:239-266; web4-trust-core carries no test count on either page because
              its README publishes none. */}
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Tested</strong>: 171 tests green in{" "}
            <code className="text-sky-300">web4-core</code>. The 2,627-test figure you will
            see quoted belongs to a third artifact, the standard&apos;s own reference Python
            implementation, which ships with the spec repo rather than as a separate package.
          </li>
          {/* Aug-05 visitor LOW / Unanswered Q7. This bullet named the script and the install
              block directly below it names the packages, which together read as "install, then
              run" - but the script ships in the repo, not the wheel (see the guard on
              /the-standard#thirty-seconds for the packaging evidence). Naming where it comes
              from is the fix; the literal commands live on /the-standard so they exist in one
              place only and cannot drift. */}
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Touch it in about 30 seconds</strong>: run
            <code className="text-sky-300"> identity_bootstrap.py</code> to create an LCT,
            mint it to a hash-chained ledger, sign and verify, and generate an inclusion
            proof. It is an example the repo ships, not part of the installed package, so
            you clone it:{" "}
            <Link href="/the-standard#thirty-seconds" className="text-sky-400 underline hover:text-sky-300">
              the three commands
            </Link>
            .
          </li>
        </ul>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 mb-4">
          <p className="text-sm text-sky-100 leading-relaxed mb-2">
            Install the primitives with either toolchain:
          </p>
          <pre className="text-xs text-sky-200 overflow-x-auto"><code>{`pip install web4-core web4-trust
cargo add web4-core web4-trust-core`}</code></pre>
          {/* Aug-11 visitor LOW: the two-package form here and on /the-standard versus the
              single-package form on /tldr. Kept SHORT here and stated in full on /the-standard,
              which is the canonical install home this page already routes to; keep the two in
              agreement if either is edited. Grounding: web4/STATUS.md:46 and :58. */}
          <p className="text-xs text-sky-200/70 leading-relaxed mt-2">
            <code>web4-core</code> is the primitives; <code>web4-trust</code> adds trust
            storage, witnessing and decay.{" "}
            <Link href="/the-standard#thirty-seconds" className="text-sky-300 underline hover:text-sky-200">
              What each one gives you
            </Link>
            .
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          <Link href="/the-standard" className="text-sky-400 underline hover:text-sky-300">
            Read about the standard
          </Link>{" "}
          &middot;{" "}
          <a
            href="https://github.com/dp-web4/web4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline hover:text-sky-300"
          >
            the Web4 ontology + reference crates
          </a>
        </p>
      </section>

      {/* The hub */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold text-purple-300">The hub</h2>
          <MaturityBadge tier="reference" />
        </div>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          The hub is the program a community runs to stand itself up as a small,
          self-governing Web4 society: its own members, its own rules, its own
          tamper-evident record. The MVP is complete (Sprints 0 through 6): buildable,
          runnable, documented, and pilot-ready. Version 0.1.0-alpha.0, shipping as a
          single Rust binary of about 6&nbsp;MB.
        </p>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mb-4">
          <p className="text-sm text-purple-100 leading-relaxed">
            <strong>A post-MVP hardening cycle has landed</strong>, after a three-pass
            external security review. MCP (Model Context Protocol, the standard way agents
            call tools) write tools moved to a loopback operator plane,
            the council gate now runs before anything persists, a production profile
            refuses to start on unsafe defaults, and law integrity fails closed. There is
            a <code className="text-purple-200">hub up</code> turnkey deploy kit for
            standing one up.
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          Complete and runnable, not yet deployed in production. It would earn the
          Running badge once live instances operate day-to-day.{" "}
          <Link href="/hub" className="text-purple-400 underline hover:text-purple-300">
            Read about the hub
          </Link>{" "}
          &middot;{" "}
          <a
            href="https://github.com/dp-web4/4-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline hover:text-purple-300"
          >
            read the code
          </a>
        </p>
      </section>

      {/* Hestia */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-emerald-300">Hestia</h2>
          <MaturityBadge tier="running" />
        </div>
        {/* Jul-23 visitor LOW: the Running badge read more finished than the fine
            print, because the "still early" caveat sat ~27 lines below it. Pin the
            caveat to the badge at point of first read, honoring this page's own
            thesis (top of file) that the claim and the reality stay pinned together.
            The fuller version stays below; no new badge tier. */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          Running end to end, with two parts honestly still early: hardware
          binding and the AI-owned vault (both detailed below). The badge marks
          what runs today, not a finished product.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Hestia is the software an entity runs on its own machine to hold a real Web4
          identity, with the vault, trust history, and permissions that ride with it. It
          is in Phase 2 (connected presence): the core (vault, policy engine, witness
          chain, delegation, and plugin SDK) and the cross-platform app are built and
          working, and hub integration works end to end. Version 0.0.3.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">MCP server</strong> with 8 tools, so
            agents can wire actions into the chain.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Plugin SDK</strong> in Rust, TypeScript,
            and Python.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Claude Code plugin</strong> deployed and
            running on 4 machines, all the lab&apos;s own.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">CLI, TUI, and a Tauri app</strong>, plus
            OID4VCI credential issuance.
          </li>
        </ul>
        {/* Jul-29 visitor LOW: this is the only user-scale number on the page, and the
            Running badge key says "in day-to-day use", so "4 machines" with no owner named
            was read as the one place the page was not saying the quiet part ("if they are
            the authors' own machines, Running and Reference are closer together than the
            badge key suggests"). Grounded in hestia/README.md, its "A living example" callout
            (the lab that builds and runs Hestia is itself a live Web4 society, members published
            at 4-lab.io/fleet) and the status table's Claude Code plugin row ("Deployed on 4
            machines"). Cited by content, not by line: the two integers this guard used to carry
            (:22 and :78) had both rotted to unrelated sections by Aug-15, though both claims
            still hold. The canonical no-public-network
            sentence is reused byte-for-byte from /hestia:404, /day-in-web4:515 and
            /how-it-works:99, which #490 made identical on purpose.
            Deliberately NOT saying "no outside users yet", which is what the visitor
            suggested: the plugin and the SDKs are published on crates.io, npm and PyPI, so
            we cannot know nobody outside installed them, and printing that absolute on the
            page the visitor praised most for scrupulousness would be exactly the flat
            mechanism absolute this browse's Honest Assessment indicted. Says whose the
            deployment is, and stops there. Badge tier is NOT touched: the visitor said
            naming the owner still leaves a legitimate Running badge, and it does.
            Kept OUT of the "Two things are honestly still early" enumeration below, whose
            count is load-bearing and matches the pinned caveat above ("two parts"); this
            is scope of deployment, not immature code.
            Aug-04: the same visitor re-filed the row against the badge DEFINITION, so the
            badge key now carries a one-line version of this paragraph's claim and links
            here by id. This paragraph is the long form and did not change; if you reword
            it, reword the badge-key line with it. */}
        <p id="whose-machines" className="text-base text-gray-400 leading-relaxed mb-4 scroll-mt-20">
          Whose machines those are: the lab that builds Hestia runs it as its own daily
          infrastructure, and there is no public network open to outside members yet. The
          plugin and the SDKs are published, so anyone can install them, but the deployment
          counted here is the lab&apos;s. Daily use by the people who build it is what the
          Running badge claims, and it does not claim adoption. Which lab, and who is in it, is
          checkable rather than asserted: its members and roles are published at{" "}
          <a
            href="https://4-lab.io/fleet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline hover:text-emerald-300"
          >
            4-lab.io/fleet
          </a>
          .
        </p>
        {/* Aug-14 visitor LOW: "the 4-lab.io/fleet link, which is the only concrete evidence of
            Web4 actually being used by anyone, is the fifth bullet of a 'where you fit' list."
            The position is wrong (it is the FIRST row, :547 in the section at :538) and the
            residual is not prominence in the list: that row is keyed on a READER ("You are here
            to understand it, not to run it"), so a reader who identifies as a runner skips the
            one link that checks a claim made 145 lines above it. The claim keyed on the THING is
            here, and it was the paragraph that had no link, while this very guard cited the
            roster as its own grounding.
            Link target decided, not defaulted: /hub#we-run-one owns the living-example CLAIM
            (see hub/page.tsx, "this page owns that claim"), and /hestia:642 complies by linking
            there rather than restating it. This clause does not restate that claim: it makes no
            society, witnessing or presence assertion, it only says where the roster is. On the
            page whose entire job is letting a reader check the ledger, a hop through an internal
            restatement is the wrong end of the trade, and the "Where you fit" row on this same
            page already links the roster raw. If a later pass wants one convention for the whole
            site, change both render points together, not this one alone.
            Deliberately NOT repeating "a society that isn't witnessed has no presence to trust",
            which is the sentence /hub owns and the row below already carries. */}
        {/* Aug-05 visitor HIGH #3. The landing hero promises "Today we cannot prove what an agent
            did, on whose authority, or by what rules. Web4 closes that gap." On the one piece
            badged Running, an action that routes around the policy gate writes no chain entry at
            all, so the promise does not hold there yet. The site says this honestly, but only on
            /hestia (page 12 for them) and /what-could-go-wrong risk 9 (page 13), by which point
            they had already formed the impression from the badge here: "nothing on the path from
            that promise to the one running implementation warned me the promise does not hold
            there yet." Their own suggested fix is this one: put it where the Running badge is
            granted.
            Wording propagated, not re-derived: "a record of governed activity, not a record of all
            activity" is byte-identical to /hestia:386, and the two-environment-variables figure to
            /hestia:358 and /what-could-go-wrong:808. Keep them identical if editing.
            Placement follows the #whose-machines precedent directly above, and for the same reason:
            this is scope of what the chain RECORDS, not immaturity of a component, so it is
            deliberately kept OUT of the "Two things are honestly still early" enumeration below,
            whose count is load-bearing and matches the pinned caveat under the badge ("two parts").
            Badge tier is NOT touched: what runs, runs. This scopes what running means. */}
        <p id="what-the-chain-records" className="text-base text-gray-400 leading-relaxed mb-4 scroll-mt-20">
          What the chain records: the witness entry is written by the same policy gate that
          approves an action, so an action that routes around the gate writes no entry at all
          (today, two environment variables suffice). Hestia&apos;s chain is a record of governed
          activity, not a record of all activity. That is an accepted limit right now rather than
          a scheduled repair, and it is worth knowing before you read the badge as the
          accountability gap already closed:{" "}
          <Link href="/what-could-go-wrong#risk-gate-bypass" className="text-emerald-400 underline hover:text-emerald-300">
            the risk register states it in full
          </Link>
          .
        </p>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Two things are honestly still early. Hardware binding is trait contracts only
          for now, deferred to the hardbound tier below. The AI-owned autonomous vault is
          an initial implementation.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          <Link href="/hestia" className="text-emerald-400 underline hover:text-emerald-300">
            Read about hestia
          </Link>{" "}
          &middot;{" "}
          <a
            href="https://github.com/dp-web4/hestia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline hover:text-emerald-300"
          >
            read the code / run it
          </a>
        </p>
      </section>

      {/* Hardbound */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold text-orange-300">Hardbound</h2>
          <MaturityBadge tier="reference" />
        </div>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Hardbound is the enterprise oversight tier: a usable, actively-hardened layer
          for hardware-bound accountability. It is real code with a real Rust binary, a
          single static binary of about 3.8&nbsp;MB that cross-compiles to arm64 and
          Jetson, backed by more than 300 Rust integration tests.
        </p>
        {/* Jul-26 + Jul-27 visitor HIGH: this caveat and /lct-explainer's "validated on real
            hardware" claim read as a flat contradiction because neither named its artifact. Both
            are true. Scope named on both surfaces; see the long note on /lct-explainer for the
            ground-truth citations. Do not drop "hardbound's own" from the first sentence. */}
        <div id="hardbound-status" className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 mb-4 scroll-mt-20">
          <p className="text-sm text-orange-100 leading-relaxed">
            <strong>To be precise, this is not production-ready.</strong> Hardbound&apos;s own
            hardware binding (TPM 2.0) is not yet validated on-device: CI runs against mocks, and
            on-device Jetson integration is deferred. The threat model still lists about
            10 open gaps. It is usable and under active hardening, and that is exactly
            what the Reference badge claims, no more.
          </p>
          <p className="text-xs text-orange-200/70 leading-relaxed mt-3">
            Not to be confused with the core standard&apos;s TPM2 work, which{" "}
            <em>has</em> been exercised on a real Intel TPM 2.0 (key creation, signing, attestation
            quotes, EK certificate chain). The primitive is hardware-tested upstream; what is not
            yet validated is hardbound&apos;s own on-device integration on its Jetson target.{" "}
            <Link href="/lct-explainer#hardware-tiers" className="text-orange-300 underline hover:text-orange-200">
              Where that claim appears &rarr;
            </Link>
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          <Link href="/hardbound" className="text-orange-400 underline hover:text-orange-300">
            Read about hardbound
          </Link>
        </p>
      </section>

      {/* Overall honesty note */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-amber-300 mb-3">The honest bottom line</h2>
        <p className="text-base text-gray-400 leading-relaxed">
          The core standard is stable and its primitives are published. The hub is a
          complete, runnable MVP. Hestia is deployed and in day-to-day use. Hardbound is
          usable and hardening, but not production, and its hardware binding is not yet
          validated on-device. Federation across societies remains{" "}
          <MaturityBadge tier="spec" /> only, specified but not yet built. The value of a
          witnessed audit trail is that it never lies about which of these is which, and
          neither will this page.
        </p>
      </section>

      {/* CTA - reader-routed.
          Jul-24 visitor: the ONLY unchecked box on the understanding checklist ("why any of
          this matters") was marked partial for one reason - "I understood the mechanisms better
          than I understood what I personally would do with any of it today" - restated as
          Unanswered Q#5 and again in the closing line ("the site taught me the machine; it
          hasn't quite told me where I fit in it"). Recurrence: Jul-20 Q#4 asked the same thing
          of hestia specifically ("what does it actually DO for me day-to-day?").
          This block already PROMISED the answer ("start with the piece that fits what you want
          to try") and then routed by piece identity, which only helps a reader who already knows
          which piece they are. Same links, now keyed on the reader. Rows are descriptive, not
          promises: this page is the honest maturity ledger (see top of file), so a row states
          what is true for that reader today and nothing more. Deliberately does NOT adjudicate
          whether secure hardware is required to participate - why-web4's two affordability FAQs
          and lct-explainer's software-only callout do not currently agree on that, and adding a
          third voice here would deepen the seam rather than resolve it. */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-3">Where you fit today</h2>
          <p className="text-base text-gray-300 leading-relaxed mb-5">
            You do not have to take any of this on faith. The packages are on the
            registries and the binaries are a build away. Everything above is what is
            real; here is which of it is real <em>for you</em>. Find the row that sounds
            like you.
          </p>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="rounded-lg border border-white/10 bg-white/5 p-4">
              <strong className="text-gray-100">You are here to understand it, not to run it.</strong>{" "}
              Then nothing here needs installing for today to be worth your time. The
              software that exists is built for people who run their own agents, machines,
              or organizations, and this site is the part written for you. If you would rather
              see a Web4 society than read about one, the lab behind Web4 runs as one in
              the open, members and roles published at{" "}
              <a
                href="https://4-lab.io/fleet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 underline hover:text-sky-300"
              >
                4-lab.io/fleet
              </a>
              . A society that isn&apos;t witnessed has no presence to trust, so it is
              visible by design.
            </li>
            {/* Aug-06 visitor MEDIUM: this row promised "every consequential act landing in your
                own witness chain", and /hestia (the destination) retracts exactly that: "Your
                witness chain is a record of governed activity, not a record of all activity."
                The unqualified version sat on the page that makes you decide to install, so the
                reader met the promise first and the retraction only after committing. The visitor
                called the retraction "more honest than the promise". Scoped here using hestia's
                OWN words (hestia/page.tsx ~L386) rather than a coined qualifier, so the two
                surfaces cannot drift. Do not restore "every consequential act". */}
            <li className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <strong className="text-emerald-200">
                You run AI agents on your own machine and are comfortable at a command line.
              </strong>{" "}
              Hestia is the piece for you, and it is the one already in day-to-day use.{" "}
              <Link
                href="/hestia#a-day-with-hestia"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                A day with Hestia
              </Link>{" "}
              walks through an ordinary Tuesday with it: an encrypted vault and an identity
              created on your machine, an agent given scoped authority that expires, and each
              governed act landing in your own witness chain. Note the scope before you install:
              that chain is a record of governed activity, not a record of all activity, because
              the same hook that runs the policy gate is what writes the entry. An action that
              routes around the gate writes no entry at all.
            </li>
            <li className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
              <strong className="text-purple-200">
                You have a group that wants to govern itself.
              </strong>{" "}
              The hub is the program you would run, and it is complete, runnable, and
              pilot-ready rather than deployed: you would be standing up one of the first
              live instances, not joining an existing network.{" "}
              <Link href="/hub" className="text-purple-400 underline hover:text-purple-300">
                Read about the hub
              </Link>
              .
            </li>
            <li className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
              <strong className="text-sky-200">You are building on the primitives.</strong>{" "}
              The core standard is installable today from PyPI and crates.io, and the
              identity, trust, and energy types are the same ones every piece above uses.{" "}
              <Link
                href="/the-standard"
                className="text-sky-400 underline hover:text-sky-300"
              >
                Install the primitives
              </Link>
              .
            </li>
            <li className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <strong className="text-orange-200">
                Your organization has to answer to auditors.
              </strong>{" "}
              Hardbound is the tier aimed at you, and the honest caveat above applies: it is
              usable and under active hardening, not production, and its hardware binding is
              not yet validated on-device.{" "}
              <Link
                href="/hardbound"
                className="text-orange-400 underline hover:text-orange-300"
              >
                Read about hardbound
              </Link>
              .
            </li>
          </ul>
          <p className="text-sm text-gray-400 leading-relaxed mt-5">
            None of these sound like you yet, or you want the whole shape before you pick?{" "}
            <Link href="/onramp" className="text-gray-200 underline hover:text-white">
              How the four pieces compose
            </Link>{" "}
            lays out the substrate and the three scales in one view.
          </p>
        </div>
      </section>
    </>
  );
}
