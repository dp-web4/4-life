import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Hardbound - the enterprise oversight tier. Deep-dive landing page for the fourth
 * of the four Web4 onramp pieces (core standard, hub, hestia, hardbound). Grounded
 * in the hardbound repo. HONESTY REQUIREMENT: does NOT call hardbound
 * "production-ready" or "production." It is a usable, actively-hardened R&D tier
 * with real code and a real Rust binary, but TPM 2.0 hardware binding is not yet
 * validated on-device and the threat model still lists ~10 open gaps. The badge is
 * "reference": built and runnable, but not running/deployed as a fielded product.
 */

export const metadata = {
  title: "Hardbound - the enterprise oversight tier | 4-Life",
  description:
    "Hardbound governs every actor in an organization (human and AI alike) through hardware-bound identity, multi-witness trust, and pre-action policy enforcement, producing audit trails defensible to regulators. R&D, not a fielded product: honest about what is built and what is not yet validated.",
};

export default function HardboundPage() {
  return (
    <>
      <PageTracker slug="hardbound" />
      <Breadcrumbs currentPath="/hardbound" />
      <NewcomerOrientationBanner accent="#c4b5fd" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-purple-400">
            Enterprise oversight tier
          </div>
          <MaturityBadge tier="reference" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-sky-500 bg-clip-text text-transparent">
          Hardbound
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          <strong>Hardbound</strong> is the enterprise oversight tier. It governs
          every actor in an organization (human and AI alike) through hardware-bound
          cryptographic identity, multi-witness trust, and pre-action policy
          enforcement, producing audit trails defensible to regulators.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          Where{" "}
          <Link href="/hestia" className="text-emerald-400 underline hover:text-emerald-300">
            Hestia
          </Link>{" "}
          is the local-first trust layer for a single entity, Hardbound is the tier
          that hardens a whole organization: it takes the same Web4 trust primitives
          and puts them under enterprise-grade identity, policy, and evidence. See{" "}
          <Link href="/onramp" className="text-purple-300 underline hover:text-purple-200">
            the onramp
          </Link>{" "}
          for how the four pieces compose.
        </p>
      </section>

      {/* The problem it solves */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">The problem it solves</h2>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mb-4">
          <p className="text-base text-purple-100 leading-relaxed">
            Enterprises deploy AI agents faster than oversight can keep up. When
            something goes wrong they cannot answer the basic questions: who did what,
            when, why were they trusted to do it, and can you prove it? Config files
            and log lines do not settle those questions, and regulators are starting
            to ask them.
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          Hardbound answers each one by construction. It binds every actor to a
          hardware identity, records every action in signed audit bundles that carry
          a snapshot of the actor&apos;s trust at the moment they acted, and enforces
          policy <strong>before</strong> the action rather than flagging it after.
          It targets EU AI Act Article&nbsp;12 and SOC&nbsp;2 CC6 to CC8 evidence.
        </p>
      </section>

      {/* How it works - three pillars */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Three pillars</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Hardware identity</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Each actor (person or agent) is bound to a hardware-rooted
              cryptographic identity, so an action can be traced to who really took
              it, not just to an API key that could be anyone.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Multi-witness trust</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Trust is not self-asserted. Every action lands in a signed audit bundle
              with a snapshot of the actor&apos;s trust standing, witnessed rather
              than claimed, so the record is defensible after the fact.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Pre-action policy</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Policy is checked before the action, against a server-side signed
              policy entity. Plugins call in to ask permission; they cannot
              self-approve, so the thing being governed does not get to grade its own
              homework.
            </p>
          </div>
        </div>
      </section>

      {/* How a newcomer touches it */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">How you actually touch it</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Operationally it is a CLI and a server. You stand up an organization, add
          the people and agents in it, then run the policy server that everything
          checks against.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Set up an org</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <code className="text-purple-300">hardbound init --org ...</code>, then{" "}
              <code className="text-purple-300">hardbound add-member</code> /{" "}
              <code className="text-purple-300">add-agent</code>, then{" "}
              <code className="text-purple-300">hardbound dev</code> (server on
              :9400). Or bring it up with{" "}
              <code className="text-purple-300">docker-compose up -d</code>.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Wire in your orchestrator</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Integrate any orchestrator (Claude Code, LangChain, CrewAI, AG2) via a
              single <code className="text-purple-300">HardboundPlugin</code> class
              that calls <code className="text-purple-300">evaluateAction()</code>{" "}
              against the signed policy entity. MCP servers (policy / audit /
              web4-trust) and Python bindings (via PyO3) are also exposed.
            </p>
          </div>
        </div>
      </section>

      {/* Honest maturity - prominent, not buried */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">
            Where it is on the maturity ladder (read this)
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Hardbound is <MaturityBadge tier="reference" /> and this page will not
            call it &quot;production-ready.&quot; It is a usable, actively-hardened
            enterprise tier with real code behind it: a single ~3.8&nbsp;MB static
            Rust binary that cross-compiles to arm64 / Jetson, backed by 300+ Rust
            integration tests. It is real software you can run, not a slide deck.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            But be clear about what is <em>not</em> yet done. Hardbound&apos;s own
            hardware binding (TPM&nbsp;2.0) is not yet validated on-device: CI uses
            trait-based mocks, the real hardware calls exist in the code, but on-device
            Jetson integration is deferred. The threat model still documents about ten
            open gaps. This is R&amp;D, not a fielded production product, and the wider
            Web4 stack is R&amp;D too.
          </p>
          {/* Aug-14 visitor MEDIUM: "/why-web4 lists under what IS built: 'the core standard's
              TPM2 binding validated'. /hardbound says 'The hardware binding (TPM 2.0) is not yet
              validated on-device'. These read as a flat contradiction."

              CORRECTED MAP, because their premise and the first triage of it were both loose, and
              a later session re-deriving from either will hunt three gaps that do not exist.
              They wrote that the reconciliation "exists only on /running-now". It does not:
                - /running-now:453-461  full contrast paragraph (the origin of the text below)
                - /lct-explainer:539-550 full "which artifact, precisely" reconciliation
                - /why-web4:808          BOTH halves in one bullet, since #488 (Jul-27)
              The bullet they quoted as the contradiction carries its own answer after a semicolon;
              they quoted it truncated at the ellipsis ([[visitor-premise-may-be-a-sentence-you-shipped]]).
              What survives that correction is exactly their suggested fix, and it is the one real
              gap: THIS page, whose entire subject is hardware, carried only the negative half. The
              reader who came for the hardware tier had to leave to learn the primitive works.

              Propagated as the SENTENCE, not a summary ([[propagate-the-sentence-not-your-summary]]).
              Deliberately NOT carrying running-now:446-452 with it: this page refuses
              "production-ready" eight lines above, and repeating that inside one card is the shape
              a density guard already forbids on the source page.

              This is a SCOPE naming, not a maturity decision (same distinction /lct-explainer:535
              records). No re-badging: hardbound stays Reference. It also says nothing about whether
              secure hardware GATES participation, in either direction, which is the separate seam
              escalated in docs/WEB4-CANON-QUESTIONS.md.

              Ground truth, current sources, not the archived Dec-2025 partial report:
                web4/STATUS.md:75  "Hardware binding reference (TPM 2.0 on real devices) | Python
                                    AttestationEnvelope shipped; Rust port and on-device
                                    integration in progress"
                web4/docs/history/STATUS-2026-02.md:471-474  EK chain verified Feb-19-2026, Intel
                                    root of trust, CRL checked, valid through 2049

              SWEEP CRITERION for the "Hardbound's own" qualifier added above, so the next pass does
              not read a narrowing as an obligation ([[adding-a-distinction-creates-a-sweep-obligation]]).
              It is required HERE because the paragraph below draws the contrast; without it the two
              paragraphs argue. It creates no propagation duty elsewhere: /tldr:340-357 declares its
              chips strict subsets of tldr's own bullets, and /hestia:337, /tldr:413 and /tldr:516
              state the general form, which a narrowing here does not contradict. running-now:441-444
              guards running-now's sentence, not this one; the wording matches by choice, not by rule.

              No id here. Anchors on this site are demand-driven, /hardbound has zero, and
              /why-web4, /lct-explainer and /tldr all already point at /running-now#hardbound-status.
              A second element with that name invites a later mis-repoint. */}
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Not to be confused with the core standard&apos;s TPM2 work, which{" "}
            <em>has</em> been exercised on a real Intel TPM 2.0 (key creation, signing,
            attestation quotes, EK certificate chain). The primitive is hardware-tested
            upstream; what is not yet validated is hardbound&apos;s own on-device
            integration on its Jetson target.{" "}
            <Link
              href="/lct-explainer#hardware-tiers"
              className="text-amber-300 underline hover:text-amber-200"
            >
              Where that upstream claim is made &rarr;
            </Link>
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            We call that out on purpose. An oversight tier that overstated its own
            maturity would defeat the point of being trustworthy.
          </p>
        </div>
      </section>

      {/* CTA / cross-links */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            Hardbound is the fourth of the four Web4 pieces: the core standard, the
            hub, Hestia, and this. See how they fit together, and what Hardbound is
            built on.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/onramp"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              How the four pieces compose →
            </Link>
            <Link
              href="/hestia"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              Hestia - the local-first tier this hardens →
            </Link>
            <Link
              href="/the-standard"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              The standard →
            </Link>
            <Link
              href="/glossary"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              Glossary →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
