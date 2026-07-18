import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * The Web4 onramp - how the four pieces compose. The core standard is the
 * substrate; the hub, hestia, and hardbound are three ways to run it at three
 * scales (community, personal, enterprise). Grounded in the public repos.
 * The "four-piece" phrasing is a synthesizing lens, not a repo term, but it
 * faithfully reflects how the pieces depend on and compose with one another.
 */

export const metadata = {
  title: "The Web4 onramp - how the four pieces compose | 4-Life",
  description:
    "One substrate, three scales. The core standard is what you build on; the hub (community), hestia (personal/agent), and hardbound (enterprise) are three ways to run it. Here is the dependency order, the adoption order, and the real in-code seams that connect them.",
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
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          There are really only four pieces to learn. One is the substrate you
          build on: the{" "}
          <Link href="/the-standard" className="text-purple-300 underline hover:text-purple-200">
            core standard
          </Link>
          . The other three are the ways you actually run it, at three scales of
          the same posture: the{" "}
          <Link href="/hub" className="text-purple-300 underline hover:text-purple-200">
            hub
          </Link>{" "}
          for a <strong>community</strong>,{" "}
          <Link href="/hestia" className="text-emerald-400 underline hover:text-emerald-300">
            hestia
          </Link>{" "}
          for a <strong>person or agent</strong>, and{" "}
          <Link href="/hardbound" className="text-sky-400 underline hover:text-sky-300">
            hardbound
          </Link>{" "}
          for an <strong>enterprise</strong>.
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
              The canonical libraries and primitives: LCT, T3/V3*MRH, ATP/ADP,{" "}
              <Link href="/glossary" className="text-purple-300 underline hover:text-purple-200">R6/R7</Link>. Everything above is a downstream consumer.
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
          <span className="text-gray-200">{"{ hub, hestia, hardbound }"}</span>.
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
          The hub, hestia, and hardbound each take these as dependencies. That is
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
                <Link href="/glossary" className="text-purple-300 underline hover:text-purple-200">R6/R7</Link>). This is the
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
                <p className="text-sm text-gray-300 leading-relaxed">
                  The lowest-friction, hands-on entry. One binary,{" "}
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
                <p className="text-sm text-gray-300 leading-relaxed">
                  <code className="text-purple-300">hub init</code> bootstraps a
                  sovereign society with signed law and a witnessed ledger. Members
                  connect to it using hestia (
                  <code className="text-purple-300">hestia connect-hub</code>).
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
                  The oversight tier. It swaps hestia&apos;s soft identity for
                  hardware-bound identity and adds RBAC plus regulatory evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Composition seams */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Where the pieces actually connect</h2>
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
          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>
              <strong className="text-purple-300">The hub</strong> is{" "}
              <MaturityBadge tier="reference" /> MVP / pilot-ready.
            </li>
            <li>
              <strong className="text-emerald-300">hestia</strong> has its core
              (vault, policy engine, witness chain, delegation, plugin SDK) and app
              built and working, with hub integration end to end.
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
