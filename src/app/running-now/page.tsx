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
        <p className="text-lg text-gray-400 leading-relaxed">
          Every piece carries a maturity badge, so the claim and the reality stay pinned
          together:
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <MaturityBadge tier="spec" />
            <span>defined in the Web4 standard. Written down and stable, not yet built here.</span>
          </div>
          <div className="flex items-center gap-3">
            <MaturityBadge tier="reference" />
            <span>built and runnable. Finished code you could install and start today. Runnable is not the same as running in production.</span>
          </div>
          <div className="flex items-center gap-3">
            <MaturityBadge tier="running" />
            <span>deployed and operational today. Live instances actually exist and are in day-to-day use.</span>
          </div>
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
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Tested</strong>: 171 tests green in
            web4-core; the reference Python SDK carries 2,627 tests.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-sky-300">Touch it in about 30 seconds</strong>: run
            <code className="text-sky-300"> identity_bootstrap.py</code> to create an LCT,
            mint it to a hash-chained ledger, sign and verify, and generate an inclusion
            proof.
          </li>
        </ul>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 mb-4">
          <p className="text-sm text-sky-100 leading-relaxed mb-2">
            Install the primitives with either toolchain:
          </p>
          <pre className="text-xs text-sky-200 overflow-x-auto"><code>{`pip install web4-core web4-trust
cargo add web4-core web4-trust-core`}</code></pre>
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
            external security review. MCP write tools moved to a loopback operator plane,
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
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold text-emerald-300">Hestia</h2>
          <MaturityBadge tier="running" />
        </div>
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
            running on 4 machines.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">CLI, TUI, and a Tauri app</strong>, plus
            OID4VCI credential issuance.
          </li>
        </ul>
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
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 mb-4">
          <p className="text-sm text-orange-100 leading-relaxed">
            <strong>To be precise, this is not production-ready.</strong> The hardware
            binding (TPM 2.0) is not yet validated on-device: CI runs against mocks, and
            on-device Jetson integration is deferred. The threat model still lists about
            10 open gaps. It is usable and under active hardening, and that is exactly
            what the Reference badge claims, no more.
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

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            You do not have to take any of this on faith. The packages are on the
            registries and the binaries are a build away. Start with the piece that fits
            what you want to try.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/the-standard"
              className="rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sky-200 hover:bg-sky-500/25"
            >
              the standard (install the primitives)
            </Link>
            <Link
              href="/hub"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              the hub (a Web4 society)
            </Link>
            <Link
              href="/hestia"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              hestia (deployed today)
            </Link>
            <Link
              href="/hardbound"
              className="rounded-lg border border-orange-500/40 bg-orange-500/15 px-4 py-2 text-orange-200 hover:bg-orange-500/25"
            >
              hardbound (oversight tier)
            </Link>
            <Link
              href="/onramp"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              the full onramp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
