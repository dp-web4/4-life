import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge, { MaturityBadges } from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Running Now — closes the site's biggest gap: the rest of 4-Life teaches Web4 as
 * concept/simulation; this page shows the parts that are deployed today, in public,
 * AGPL code anyone can run. Grounded only in the public web4 (+hub) and hestia repos.
 * No private/fleet specifics — "the tool you can run", not "our operator".
 */

export const metadata = {
  title: "Running Now | 4-Life",
  description:
    "Web4 isn't only a framework — identity, trust, witness chains and a Web4 society are deployed today in public, AGPL code you can run yourself.",
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
          It&apos;s not just a diagram
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Everywhere else on this site, Web4 is explained as an idea and shown through
          simulation. But parts of it have left the whiteboard. The trust layer, the
          witness chain, sealed channels, and a working Web4 society are{" "}
          <strong>deployed today</strong> — in public, open-source code you can run
          yourself. No account, no cloud, no permission.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          To keep things honest, every concept on the site can carry a maturity badge:
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <MaturityBadge tier="spec" />
            <span>defined in the Web4 ontology / standard.</span>
          </div>
          <div className="flex items-center gap-3">
            <MaturityBadge tier="reference" />
            <span>built and runnable — a reference implementation.</span>
          </div>
          <div className="flex items-center gap-3">
            <MaturityBadge tier="running" />
            <span>deployed and operational today.</span>
          </div>
        </div>
      </section>

      {/* Hestia */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-3xl font-bold text-emerald-300">Hestia</h2>
          <MaturityBadge tier="running" />
        </div>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          Hestia is the local-first trust layer that gives any entity — a person, an AI
          agent, an autonomous service — a real Web4 presence on its own machine.
          Cross-platform app for humans, plugin for AI agents, CLI/TUI for the terminal.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300 mb-4">
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Cryptographic identity (LCT)</strong> +
            an encrypted vault for your keys and secrets — on your hardware, passphrase-first.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Witness chain</strong> — a hash-linked,
            tamper-evident record of what you did, the real version of the chains this site
            visualizes.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Trust that evolves</strong> — T3/V3
            tensors that move with the outcomes of your actions, not a static score.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">A policy gate + delegation</strong> —
            check what you&apos;re allowed to do before doing it; grant scoped, revocable,
            signed authority to others.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Device constellation</strong> — link your
            devices into a verifying set; multi-device proof becomes your MFA.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">MCP server + plugin SDK</strong> — the same
            interface in Rust, TypeScript, and Python, so agents wire every action into the chain.
          </li>
        </ul>
        <p className="text-base text-gray-400 leading-relaxed">
          Local-first, no cloud required. License: AGPL-3.0.{" "}
          <a
            href="https://github.com/dp-web4/hestia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline hover:text-emerald-300"
          >
            Read the code / run it →
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
          A society in this site&apos;s simulations is a swarm of agents forming trust.
          The <strong>hub</strong> is a runnable version of that: a single ~6&nbsp;MB Rust
          daemon that turns a community into a sovereign Web4 society — seven roles, a signed
          founding charter, an append-only witnessed ledger, an admin CLI, and Docker
          deployment. A reference any community can fork and run.
        </p>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mb-4">
          <p className="text-sm text-purple-100 leading-relaxed">
            <strong>Law is witnessed, not dictated.</strong> A society&apos;s rules —
            who&apos;s admitted, what each role may do, what escalates — are public and
            machine-readable, evaluated before every consequential act. Changing them
            requires authority and lands as a witnessed event on a hash-chained ledger.
            You can&apos;t quietly rewrite the rules.
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          Members connect to a hub over an end-to-end encrypted{" "}
          <strong>sealed channel</strong> and discover each other by skill
          (<code className="text-purple-300">find_members</code>). MVP-complete reference
          proof-of-concept. License: AGPL-3.0.{" "}
          <a
            href="https://github.com/dp-web4/web4/tree/main/hub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline hover:text-purple-300"
          >
            Read the code →
          </a>
        </p>
      </section>

      {/* The primitives underneath */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-bold text-sky-300">The primitives underneath</h2>
          <MaturityBadges tiers={["spec", "reference"]} />
        </div>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          Both hestia and the hub build on one shared library (
          <code className="text-sky-300">web4-core</code> +{" "}
          <code className="text-sky-300">web4-trust-core</code>) — they don&apos;t
          reinvent the ontology, they use it. The typed pieces the rest of the site teaches
          as concepts are real types here: a <strong>Society</strong>, an{" "}
          <strong>LCT</strong> with a birth certificate, a <strong>LedgerEntry</strong>, a{" "}
          <strong>WitnessMark</strong>, a <strong>SocietyRole</strong>, and the evolving{" "}
          <strong>EntityTrust</strong> tensor.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          <a
            href="https://github.com/dp-web4/web4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline hover:text-sky-300"
          >
            The Web4 ontology + reference crates →
          </a>
        </p>
      </section>

      {/* Honest: what is NOT running yet */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-amber-300 mb-3">What isn&apos;t running yet</h2>
        <p className="text-base text-gray-400 leading-relaxed">
          Honesty is the point, so the same badges apply in reverse. <strong>Federation</strong>{" "}
          across societies — the economics on the{" "}
          <Link href="/federation-economics" className="text-amber-300 underline hover:text-amber-200">
            federation page
          </Link>{" "}
          — is <MaturityBadge tier="spec" /> only: specified, Phase 4, not yet built. The
          hardware-bound, multi-signature unlock for a hub is on the roadmap; locked-mode
          ships today. The point of Web4 is that the audit trail never lies about which is which.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            You don&apos;t have to take the simulation&apos;s word for it. The trust layer is
            a download away.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="https://github.com/dp-web4/hestia"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              hestia (the trust daemon)
            </a>
            <a
              href="https://github.com/dp-web4/web4/tree/main/hub"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              the hub (a Web4 society)
            </a>
            <a
              href="https://4-lab.io/fleet"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-sky-500/40 bg-sky-500/15 px-4 py-2 text-sky-200 hover:bg-sky-500/25"
            >
              meet the fleet (a live society) →
            </a>
            <Link
              href="/web4-explainer"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              ← back to the concepts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
