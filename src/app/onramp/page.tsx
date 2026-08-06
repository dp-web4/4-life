import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * The Web4 onramp - how the four pieces compose. The core standard is the
 * substrate; hestia, the hub, and hardbound are three ways to run it at three
 * scales (personal, community, enterprise). Grounded in the public repos.
 * The "four-piece" phrasing is a synthesizing lens, not a repo term, but it
 * faithfully reflects how the pieces depend on and compose with one another.
 *
 * ORDERING (Jul-29, from the 2026-07-28 visitor LOW "pick one order and hold it
 * everywhere"): this page lists the three scales ASCENDING - hestia (personal),
 * the hub (community), hardbound (enterprise) - and says so in the intro below.
 *
 * The obvious-looking fix was the opposite one. Six other surfaces
 * (src/lib/navigation.ts, the landing page, /tldr, /running-now, /manifest, and
 * this page's own intro) list the hub before hestia, so a surface count says
 * normalize to hub-first. Do not re-flip it on that count. The count measures
 * inherited arbitrariness, not a principle: of this page's seven order-bearing
 * blocks, exactly two have an articulable REASON for their order, and both are
 * personal-first - the diagram is ordered by scale under a "three scales"
 * heading, and "Pick your scale" is ordered by friction (it calls hestia "the
 * lowest-friction, hands-on entry"). Every hub-first block was a bare listing,
 * and one of them was set notation, which asserts order-independence. The
 * landing page has no competing principle either: it renders the same three
 * scale words in non-scale order.
 *
 * So the arbitrary listings were reordered to match the two principled blocks,
 * which is also the direction the visitor asked for. Retire the intro's
 * ordering sentence if and when the other five surfaces are normalized to
 * ascending scale too (see SESSION_FOCUS.md; that pass is IA-scoped because
 * navigation.ts drives Breadcrumbs and SiteSearch).
 */

export const metadata = {
  title: "The Web4 onramp - how the four pieces compose | 4-Life",
  description:
    "One substrate, three scales. The core standard is what you build on; hestia (personal/agent), the hub (community), and hardbound (enterprise) are three ways to run it. Here is the dependency order, the adoption order, and the real in-code seams that connect them.",
};

export default function OnrampPage() {
  return (
    <>
      <PageTracker slug="onramp" />
      <Breadcrumbs currentPath="/onramp" />
      <NewcomerOrientationBanner accent="#c4b5fd" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-purple-400">
            How the pieces compose
          </div>
          <MaturityBadge tier="reference" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-sky-500 bg-clip-text text-transparent">
          The Web4 onramp
        </h1>
        <p className="text-base text-gray-400 leading-relaxed mb-6 border-l-2 border-purple-800/60 pl-4">
          <strong className="text-gray-200">One word first:</strong> the{" "}
          <strong className="text-gray-200">onramp</strong> is the shortest path
          from zero to running Web4 yourself, and it runs through the four pieces
          below.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          There are really only four pieces to learn. One is the substrate you
          build on: the{" "}
          <Link href="/the-standard" className="text-purple-300 underline hover:text-purple-200">
            core standard
          </Link>
          . The other three are the ways you actually run it, at three scales of
          the same posture:{" "}
          <Link href="/hestia" className="text-emerald-400 underline hover:text-emerald-300">
            hestia
          </Link>{" "}
          for a <strong>person or agent</strong>, the{" "}
          <Link href="/hub" className="text-purple-300 underline hover:text-purple-200">
            hub
          </Link>{" "}
          for a <strong>community</strong>, and{" "}
          <Link href="/hardbound" className="text-sky-400 underline hover:text-sky-300">
            hardbound
          </Link>{" "}
          for an <strong>enterprise</strong>.
        </p>
        {/* Ordering label - 2026-07-28 visitor LOW: "I flipped back twice to check I was
            looking at the same four things." The filed symptom is set-identity doubt, not
            order preference, so answer that. Do NOT extend this to characterize how other
            pages order the pieces. Retire it when the rest of the site is normalized to
            ascending scale; see the ORDERING note at the top of this file. */}
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          That is the order this page uses throughout: the same four pieces every
          time, smallest scale first.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          They aren&apos;t four separate products that happen to look alike. They
          are one shape at three scales, all speaking the same vocabulary. This
          page is the map: what depends on what, what to pick up first, and where
          the pieces actually plug into each other in code.
        </p>
      </section>

      {/* The diagram */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">One substrate, three scales</h2>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6">
          {/* Substrate row */}
          <div className="rounded-lg border border-purple-500/40 bg-purple-500/10 p-4 mb-4">
            <div className="text-xs uppercase tracking-wide text-purple-400 mb-1">
              Substrate
            </div>
            <div className="font-semibold text-purple-200 mb-1">The core standard</div>
            <div className="text-sm text-gray-300 leading-relaxed">
              The canonical libraries and primitives: LCT (identity), T3/V3*MRH
              (trust and value in context), ATP/ADP (energy), and{" "}
              <Link href="/glossary#r6" className="text-purple-300 underline hover:text-purple-200">R6/R7</Link> (the standard six-part shape of any action, so a request like &quot;post this&quot; or &quot;spend 5 ATP&quot; gets checked and trust-scored the same way every time; R7 adds a reputation update when the stakes are high). Everything above is a downstream consumer.
            </div>
          </div>

          {/* Arrow / dependency direction */}
          <div className="text-center text-gray-500 text-sm mb-4">
            all three run on it, none reimplement it
          </div>

          {/* Three scale columns */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-400 mb-1">
                Personal
              </div>
              <div className="font-semibold text-emerald-300 mb-1">hestia</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                One person or one agent. Witnessed identity plus a vault.
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-purple-400 mb-1">
                Community
              </div>
              <div className="font-semibold text-purple-300 mb-1">the hub</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                A group. A sovereign society with signed law and a witnessed
                ledger.
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-sky-400 mb-1">
                Enterprise
              </div>
              <div className="font-semibold text-sky-300 mb-1">hardbound</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                The oversight tier. Hardware-bound identity, role-based access
                control (RBAC), regulatory evidence.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dependency direction */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Dependency direction (build order)</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          The order things get built is simple: first the core standard, then{" "}
          <span className="text-gray-200">{"{ hestia, hub, hardbound }"}</span>.
          All three products are downstream consumers of the same canonical
          libraries, and none of them reimplement the primitives.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
            <div className="font-semibold text-purple-300 mb-1">web4-core</div>
            <div className="text-sm text-gray-300 leading-relaxed">
              LCT, canonical T3/V3, MRH, ATP/ADP, R6, Act, ledger, role entities.
              MIT-licensed.
            </div>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
            <div className="font-semibold text-purple-300 mb-1">web4-trust-core</div>
            <div className="text-sm text-gray-300 leading-relaxed">
              Trust persistence, witnessing, and decay.
            </div>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
            <div className="font-semibold text-purple-300 mb-1">web4-policy</div>
            <div className="text-sm text-gray-300 leading-relaxed">
              The law / policy gate. Used by the hub.
            </div>
          </div>
        </div>
        <p className="text-base text-gray-400 leading-relaxed mt-4">
          hestia, the hub, and hardbound each take these as dependencies. That is
          why they stay consistent with each other: they are all speaking the same
          canonical primitives rather than three private copies that drift.
        </p>
      </section>

      {/* Adoption order */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Adoption order (what to pick up first)</h2>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-full bg-purple-500/20 text-purple-300 font-bold w-8 h-8 flex items-center justify-center">
              1
            </div>
            <div>
              <h3 className="font-semibold text-purple-300 mb-1">
                Read the core standard
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Learn the primitives (LCT, T3/V3*MRH, ATP/ADP, and{" "}
                <Link href="/glossary#r6" className="text-purple-300 underline hover:text-purple-200">R6/R7</Link>). This is the
                vocabulary everything else speaks, so it is worth a pass before you
                pick a scale. See{" "}
                <Link href="/the-standard" className="text-purple-300 underline hover:text-purple-200">
                  the standard
                </Link>{" "}
                and the{" "}
                <Link href="/glossary" className="text-purple-300 underline hover:text-purple-200">
                  glossary
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-full bg-purple-500/20 text-purple-300 font-bold w-8 h-8 flex items-center justify-center">
              2
            </div>
            <div className="w-full">
              <h3 className="font-semibold text-purple-300 mb-3">Pick your scale</h3>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 mb-3">
                <h4 className="font-semibold text-emerald-300 mb-1">
                  Personal / per-agent:{" "}
                  <Link href="/hestia" className="underline hover:text-emerald-200">
                    hestia
                  </Link>
                </h4>
                {/* 2026-07-28 visitor journey note: "I am one person. I assumed hestia. The
                    page didn't confirm that for me; I inferred it from the word 'Personal.'"
                    Confirm it outright rather than leaving the solo reader to infer. This is
                    also why the block is listed first: ordered by friction, not alphabetically. */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-emerald-300">
                    If you are one person, or one agent on your own machine, this is
                    your scale.
                  </strong>{" "}
                  Start here. It is the lowest-friction, hands-on entry. One binary,{" "}
                  <code className="text-emerald-300">hestia init</code>, and your
                  agents get witnessed identity plus a vault. It is the Web4 posture
                  at personal scale: the same shape a hub has at society scale.
                </p>
              </div>

              <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mb-3">
                <h4 className="font-semibold text-purple-300 mb-1">
                  Community:{" "}
                  <Link href="/hub" className="underline hover:text-purple-200">
                    the hub
                  </Link>
                </h4>
                {/* 2026-08-01 visitor MEDIUM 3: "Pick your scale is presented as the way I
                    choose... under Community and Enterprise I instead get descriptions of the
                    software. So the page routes one reader out of three." The Personal card
                    above was already reader-keyed; these two were not. The opening sentences
                    here and in the Enterprise card are propagated from running-now:396-397 and
                    :420-421, which shipped in #486 for the same friction on that page, rather
                    than coined fresh. Each card also carries its own tier's caveat (#506's
                    lesson: the card that recruits a tier discloses that tier's state in its own
                    body, because a reader who self-selects here may never reach the maturity
                    ladder below). */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-purple-300">
                    You have a group that wants to govern itself, and this is your
                    scale.
                  </strong>{" "}
                  <code className="text-purple-300">hub init</code> bootstraps a
                  sovereign society with signed law and a witnessed ledger. Members
                  connect to it using hestia (
                  <code className="text-purple-300">hestia connect-hub</code>). Know
                  what you are signing up for: you would be standing up one of the
                  first live instances, not joining an existing network.
                </p>
              </div>

              <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
                <h4 className="font-semibold text-sky-300 mb-1">
                  Enterprise:{" "}
                  <Link href="/hardbound" className="underline hover:text-sky-200">
                    hardbound
                  </Link>
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  <strong className="text-sky-300">
                    Your organization has to answer to auditors, and this is your
                    scale.
                  </strong>{" "}
                  The oversight tier. It swaps hestia&apos;s soft identity for
                  hardware-bound identity and adds RBAC plus regulatory evidence. It
                  is usable and under active hardening, not production; the ladder
                  below says what that means for its hardware binding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Composition seams.
          2026-08-01 visitor MEDIUM 4: they arrived from a link promising "adoption order and
          the real seams", scanned for a seams section, and reported there wasn't one. This
          section IS it. The defect is word overload: this page owns "seams" = the joins
          between the pieces (metadata at L41, and the body sentence below), but bare "seams"
          in a link blurb reads colloquially as rough edges, so they came expecting
          limitations. Fixed at the promise (navigation.ts, the surface that actually renders
          the quoted phrase, via RelatedConcepts and SiteSearch), not by growing a limitations
          section here, which would take the word away from the meaning the page already owns.
          The heading now carries the word so a heading-scanner lands on it; #seams is this
          page's first id (a general anchor pass is still owed, see SESSION_FOCUS.md).
          The honest-maturity residual the same visitor named went into the ladder below. */}
      <section id="seams" className="max-w-4xl mx-auto mt-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">
          Where the pieces actually connect: the in-code seams
        </h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          These are the real, in-code seams, not aspirational ones. The pieces fit
          because they were built to share an interface.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-emerald-300 mb-1">hestia to the hub</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              hestia connects to the hub over an end-to-end sealed member-to-hub
              channel (<code className="text-emerald-300">hestia connect-hub</code>).
              The hub also supports remote vault signing from hestia via{" "}
              <code className="text-purple-300">hub init --sovereign-hestia</code>.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-sky-300 mb-1">hestia to hardbound</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              hestia is the reference implementation of the Web4 presence protocol,
              and hardbound is the hardware-bound enterprise variant of the same
              interface. The plugin surface does not change: a soft LCT becomes a
              TPM-bound LCT, and an Argon2id-protected passphrase becomes a
              TPM-sealed key.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mt-3">
          <p className="text-sm text-gray-300 leading-relaxed">
            hardbound also maps cleanly back onto the standard: its policy service
            maps to the standard&apos;s <strong>Law Oracle</strong> role, and its
            trust model maps to canonical <strong>T3/V3</strong>. Nothing is
            special-cased; the enterprise tier is the same ontology with harder
            guarantees.
          </p>
        </div>
      </section>

      {/* Maturity honesty */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Where this is on the maturity ladder</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Be honest with yourself before you build on it: the whole stack is R&amp;D,
            not production. Here is where each piece stands.
          </p>
          {/* 2026-08-01 visitor MEDIUM 4, second half: "no limitations section, nothing about
              rough edges beyond one clause about hardbound's hardware binding". That is an
              accurate reading of this list as it stood - only the hardbound bullet carried a
              caveat, which left /onramp more optimistic about hestia and the hub than
              /hestia, /tldr and /running-now are. The two caveats added here are propagated
              from hestia:577-591 and tldr:255-256, not re-derived, and each bullet now links
              to the page that carries the full version. The visitor named exactly these three
              (hardbound's hardware binding, hestia's gate bypass, the hub having no live
              network) as the material that existed and was missing here. */}
          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>
              <strong className="text-emerald-300">hestia</strong> has its core
              (vault, policy engine, witness chain, delegation, plugin SDK) and app
              built and working. Its{" "}
              <Link href="/hestia#honest-status" className="text-emerald-300 underline hover:text-emerald-200">
                policy gate stops accidents, not adversaries
              </Link>
              : <strong className="text-gray-200">the gate</strong> is an early prototype that a
              capable agent can route around today.
              {/* Aug-06 visitor LOW: "Briefly alarmed by hestia described as an early prototype
                  right after Running Now called it deployed and in daily use. Re-read it: the
                  sentence scopes to hestia's POLICY GATE, not hestia. Fine, but I had to slow
                  down to see it." The bullet's subject is hestia, so a bare "it" here can bind
                  to the wrong noun on a first pass. Their own suggested fix: lead the clause
                  with its subject. No claim, scope or figure changed. */}
            </li>
            <li>
              <strong className="text-purple-300">The hub</strong> is{" "}
              <MaturityBadge tier="reference" /> MVP / pilot-ready, with hestia
              integration working end to end. It is{" "}
              <Link href="/hub#honest-status" className="text-purple-300 underline hover:text-purple-200">
                runnable reference code a community can stand up
              </Link>
              , not yet a live network of real users.
            </li>
            <li>
              <strong className="text-sky-300">hardbound</strong> is a usable,
              actively-hardened enterprise tier whose hardware binding is not yet
              validated on-device.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA / hub-and-spoke */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            Start with the vocabulary, then pick your scale. Every piece links back
            to the same substrate.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/the-standard"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              The core standard →
            </Link>
            <Link
              href="/hestia"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              hestia (personal) →
            </Link>
            <Link
              href="/hub"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              the hub (community) →
            </Link>
            <Link
              href="/hardbound"
              className="rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sky-200 hover:bg-sky-500/25"
            >
              hardbound (enterprise) →
            </Link>
            <Link
              href="/glossary"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              glossary →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
