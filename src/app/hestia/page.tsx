import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Hestia — the deployed trust layer. Deep-dive expansion of the /running-now
 * Hestia section. Grounded ONLY in the public hestia repo README. "The tool you
 * can run", not "our operator" — no private/fleet specifics.
 */

export const metadata = {
  title: "Hestia — the trust layer you can run | 4-Life",
  description:
    "Hestia is a local-first Web4 trust daemon: cryptographic identity, an encrypted vault, a witness chain, evolving T3/V3 trust, a policy gate, delegation, and a device constellation — running on your own hardware, AGPL.",
};

function Feature({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold text-emerald-300 mb-1">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{children}</p>
    </div>
  );
}

export default function HestiaPage() {
  return (
    <>
      <PageTracker slug="hestia" />
      <Breadcrumbs currentPath="/hestia" />
      <NewcomerOrientationBanner accent="#34d399" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-emerald-400">
            Running Now
          </div>
          <MaturityBadge tier="running" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-sky-500 bg-clip-text text-transparent">
          Hestia
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          Hestia is the local-first trust layer of Web4: a small daemon that gives
          any entity — a person, an AI agent, an autonomous service — a real
          cryptographic presence on its <em>own</em> machine. Not an account on
          someone&apos;s server. Not a profile in a database. A sovereign identity
          you hold the keys to.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          Everything the rest of this site teaches as a concept — identity, the
          witness chain, trust that moves with outcomes, a policy gate — Hestia
          actually runs. It&apos;s the deployed answer to &ldquo;okay, but does any
          of this exist?&rdquo;
        </p>
      </section>

      {/* Three faces */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">One trust layer, three faces</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Feature title="For humans">
            A cross-platform app. Your keys, vault, and history live on your device,
            passphrase-first.
          </Feature>
          <Feature title="For AI agents">
            A plugin + MCP server, so an agent wires every action it takes into its
            own witnessed record.
          </Feature>
          <Feature title="For the terminal">
            A CLI/TUI for scripting and headless services — the same trust layer,
            no GUI required.
          </Feature>
        </div>
      </section>

      {/* What it does */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">What it actually does</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Feature title="Cryptographic identity (LCT)">
            Every entity gets a Linked Context Token — a real keypair with a birth
            certificate — generated and held locally. This is the{" "}
            <Link href="/lct-explainer" className="text-emerald-400 underline hover:text-emerald-300">
              LCT
            </Link>{" "}
            the explainer describes, made concrete.
          </Feature>
          <Feature title="An encrypted vault">
            Your keys and secrets sit in an encrypted store on your hardware. No
            cloud custody, no shared honeypot.
          </Feature>
          <Feature title="A witness chain">
            A hash-linked, tamper-evident record of what you did — the deployed
            version of the{" "}
            <Link href="/multi-session-identity" className="text-emerald-400 underline hover:text-emerald-300">
              chains this site visualizes
            </Link>
            . You can&apos;t quietly rewrite your own history.
          </Feature>
          <Feature title="Trust that evolves">
            <Link href="/trust-tensor" className="text-emerald-400 underline hover:text-emerald-300">
              T3/V3 tensors
            </Link>{" "}
            that move with the outcomes of your actions, recorded as you go — not a
            static reputation number handed down from above.
          </Feature>
          <Feature title="A policy gate">
            Before a consequential act, Hestia checks what you&apos;re allowed to do.
            The rules are explicit and evaluated up front, not bolted on after.
          </Feature>
          <Feature title="Delegation">
            Grant scoped, signed, revocable authority to another entity — and take it
            back. Authority is a thing you hand over deliberately, with a record.
          </Feature>
          <Feature title="A device constellation">
            Link your devices into a verifying set, so multi-device proof becomes your
            MFA. Losing one device doesn&apos;t mean losing your identity.
          </Feature>
          <Feature title="A plugin SDK">
            The same interface in Rust, TypeScript, and Python, so any program can
            participate in the trust layer instead of reimplementing it.
          </Feature>
        </div>
      </section>

      {/* Why local-first */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Why local-first matters</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          Most &ldquo;identity&rdquo; on today&apos;s internet is an entry in a
          company&apos;s table — they hold the keys, they can revoke you, and a breach
          of their database is a breach of you. Hestia inverts that. The identity, the
          vault, and the history are <strong>yours</strong>, on your hardware. There
          is no central server to ask permission from, and no cloud account to lose.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          That&apos;s also what makes the trust honest: because the witness chain is
          tamper-evident and the policy gate runs before each act, what your record
          claims and what actually happened can&apos;t silently diverge.
        </p>
      </section>

      {/* Honest boundary */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Where it is on the maturity ladder</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Hestia is <MaturityBadge tier="running" /> — deployed and operational, in
            active development (Phase 2). The single-entity trust layer above is
            working today. Multi-society <strong>federation</strong> — entities and
            societies trading trust across boundaries — is{" "}
            <MaturityBadge tier="spec" /> still: specified, on the roadmap, not yet
            running. See{" "}
            <Link href="/running-now" className="text-amber-300 underline hover:text-amber-200">
              the full maturity map
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            It&apos;s open source (AGPL-3.0) and runs on your own machine. You
            don&apos;t have to take the simulation&apos;s word for any of this.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="https://github.com/dp-web4/hestia"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              Read the code / run it →
            </a>
            <Link
              href="/hub"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              The hub — a Web4 society →
            </Link>
            <Link
              href="/running-now"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-gray-200 hover:bg-white/10"
            >
              ← what else is running
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
