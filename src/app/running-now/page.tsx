import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge, { MaturityBadges } from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Running Now — closes the site's biggest gap: the rest of 4-Life teaches Web4 as
 * concept/simulation; this page shows the parts that are deployed today, in public,
 * AGPL code anyone can run. Grounded only in the public web4 (+hub) and hestia repos.
 * No private/fleet specifics — "the tool you can run", not "our operator". Two sanctioned
 * exceptions, both policy-approved and both mirroring ONLY what /hub and 4-lab.io already
 * publish (the lab's own autonomous AI machines, not a public network):
 * 1. Jul-7 visitor MEDIUM: the CTA's fleet link carries a one-sentence framing — the
 *    unframed "live society" label was re-introducing the exact is-anyone-living-here
 *    ambiguity the maturity badges resolve.
 * 2. Jul-14 visitor MEDIUM: the hero caveat names the fleet once, because its previous
 *    ABSOLUTE "there's no live network" contradicted the CTA's "live society" 200 lines
 *    later — the visitor read both and couldn't tell what exists. The hero mention must
 *    stay fact-identical to the CTA framing (small, lab's own, autonomous machines,
 *    nothing a visitor can join) — no counts, names, or operational detail.
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
          witness chain <span className="text-gray-400">(a tamper-evident record of every action)</span>,
          sealed channels <span className="text-gray-400">(end-to-end encrypted peer links)</span>, and a
          working Web4 society are{" "}
          <strong>deployed today</strong> — in public, open-source code you can run
          yourself. No account, no cloud, no permission.{" "}
          <span className="text-gray-400">That means you can run this software on your own
          machine to see the mechanics work — there&apos;s no public network of real users
          for you to join yet. The one live deployment is the lab&apos;s own small society
          of autonomous machines (the fleet — see the bottom of this page).</span>
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
            {/* Jul-14 visitor MEDIUM: the hub is badged Reference yet described in shipping
                terms (6 MB program, Docker image) — "so is it running or not?" The legend
                itself must draw the runnable-vs-running line so the badges can't be read as
                contradicting the descriptions. Tier assignments stay honest: hub = reference. */}
            <MaturityBadge tier="reference" />
            <span>built and runnable — finished code you could start yourself today. Runnable is not the same as running.</span>
          </div>
          <div className="flex items-center gap-3">
            <MaturityBadge tier="running" />
            <span>deployed and operational today — a live instance actually exists.</span>
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
          Hestia is software an entity runs on its own machine to get a real Web4 identity —
          a verifiable digital passport, plus the private vault, trust history, and permissions
          that ride with it. It works the same whether that entity is a person, an AI agent,
          or an autonomous service: each gets its own presence, held locally, no cloud required.
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
            <strong className="text-emerald-300">Trust that evolves</strong> —{" "}
            <Link href="/trust-tensor" className="text-emerald-400 underline hover:text-emerald-300">T3/V3
            tensors</Link> (how trustworthy you&apos;ve been, and how valuable your work proved to be)
            that move with the outcomes of your actions, not a static score.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">A policy gate + delegation</strong> —
            check what you&apos;re allowed to do before doing it; grant scoped, revocable,
            signed authority to others.
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">Device constellation</strong> — link your
            devices into a verifying set; multi-device proof becomes your MFA
            (multi-factor authentication).
          </li>
          <li className="rounded-lg border border-white/10 bg-white/5 p-3">
            <strong className="text-emerald-300">MCP server + plugin SDK</strong> (MCP is the
            open protocol AI agents use to call tools and services) — the same
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
          The <strong>hub</strong> is a program a community can run to become one for real:
          it stands your group up as its own small, self-governing Web4 society — its own
          members, its own rules, its own tamper-evident record. It&apos;s small enough to
          run on a single machine, and any community can fork and run it.
        </p>
        {/* Jul-6 visitor MEDIUM #2: the benefit lead HELD (#432), but the "single ~6 MB
            Rust daemon (…Docker deployment)" spec-dump was the residual jargon cliff —
            daemon/Docker unglossed, and ~6 MB/Rust read as an unexplained brag. Fold the
            build detail behind a disclosure and gloss the two hard terms, so a naive reader
            stops at the benefit and an engineer can expand. Hestia grid left visible on
            purpose — its T3/V3 + witness-chain tiles are comprehension bridges, not depth. */}
        <details className="mb-4 bg-gray-800/40 border border-gray-700/60 rounded-lg p-4">
          <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-purple-300 transition-colors list-none flex items-center justify-between gap-3">
            <span>Under the hood — for the technically curious</span>
            <span className="text-xs text-gray-500 font-normal whitespace-nowrap">click to expand</span>
          </summary>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            It ships as a single, self-contained program of about 6&nbsp;MB — small enough to
            copy onto a laptop and start, with no heavyweight platform underneath it. That
            program is a <strong className="text-gray-300">daemon</strong>{" "}
            <span className="text-gray-500">(a background service that keeps running and
            handles requests as they arrive)</span>, written in Rust for speed and safety.
            Inside it: seven roles, a signed founding charter, an append-only witnessed ledger,
            and an admin CLI. It also ships as a{" "}
            <strong className="text-gray-300">Docker</strong>{" "}
            <span className="text-gray-500">(a standard way to package software so it runs the
            same on any machine)</span> image, so a community can stand one up in a single command.
            If that sounds operational, it is — but shipping as a runnable package is exactly
            what the <em>Reference</em> badge means: built and runnable. It would earn{" "}
            <em>Running</em> only once live instances operate day-to-day, the way hestia&apos;s do.
          </p>
        </details>
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
            href="https://github.com/dp-web4/4-hub"
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
          <strong>LCT</strong> with a birth certificate, a <strong>LedgerEntry</strong>{" "}
          (one recorded action in the tamper-evident log), a <strong>WitnessMark</strong>{" "}
          (proof another entity vouched for it), a <strong>SocietyRole</strong>{" "}
          (what an entity is allowed to do in its society), and the evolving{" "}
          <strong>EntityTrust</strong> tensor (its live T3/V3 trust score).
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
          {/* Jul-7 visitor MEDIUM: the bare "meet the fleet (a live society)" link — off-site,
              zero framing — re-introduced the is-anyone-actually-living-here ambiguity this
              page's maturity badges just resolved; the visitor refused to click. One framing
              sentence before the link, mirroring only /hub's already-public description. */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            The fleet is the lab&apos;s own live society &mdash; a small fleet of autonomous
            AI machines that build Web4 and witness each other&apos;s work in the open &mdash;
            not a public network of human users you can join.
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
              href="https://github.com/dp-web4/4-hub"
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
              meet the fleet (our live society) →
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
