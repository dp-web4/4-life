import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * Hestia: the local-first Web4 presence layer. Personal / per-agent scale of the
 * four-piece onramp (core standard = substrate; hub = community, hestia = personal,
 * hardbound = enterprise). Grounded in the public hestia repo. Mid-2026 framing:
 * a universal presence primitive for humans AND agents, not an "agent-tracking layer".
 */

export const metadata = {
  title: "Hestia: the presence layer you can run | 4-Life",
  description:
    "Hestia is the local-first, open-source Web4 presence layer. It gives any entity (a human, an AI agent, or a service) a cryptographic identity (LCT), an encrypted credential vault, scoped revocable delegation, and a witnessed trust record, running entirely on your own machine with no cloud.",
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
          Hestia is the local-first, open-source presence layer of Web4. It gives{" "}
          <em>any</em> entity (a person, an AI agent, or a service) a real
          cryptographic presence on its <em>own</em> machine: a{" "}
          <Link href="/lct-explainer" className="text-emerald-400 underline hover:text-emerald-300">
            cryptographic identity (LCT)
          </Link>
          , an encrypted credential vault, scoped revocable delegation authority,
          and a witnessed trust record. No account on someone&apos;s server, no
          profile in a database, no cloud. A sovereign presence you hold the keys
          to.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          This is the universal presence primitive for humans and AI alike, not an
          agent-tracking add-on. Everything the rest of this site teaches as a
          concept (identity, the witness chain, trust that moves with outcomes, a
          policy gate) is what Hestia actually runs. It is the deployed answer to
          &ldquo;okay, but does any of this exist?&rdquo;
        </p>
      </section>

      {/* Place in the onramp */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Where Hestia sits: the personal scale</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Web4 has one substrate (the{" "}
          <Link href="/the-standard" className="text-emerald-400 underline hover:text-emerald-300">
            core standard
          </Link>
          ) and three ways to run it, at three scales of the same posture. Hestia
          is the <strong>personal / per-agent</strong> scale: one person or one
          agent. The{" "}
          <Link href="/hub" className="text-emerald-400 underline hover:text-emerald-300">
            hub
          </Link>{" "}
          is the same shape for a community, and{" "}
          <Link href="/hardbound" className="text-emerald-400 underline hover:text-emerald-300">
            hardbound
          </Link>{" "}
          is the same shape for an enterprise. See how the four pieces compose on
          the{" "}
          <Link href="/onramp" className="text-emerald-400 underline hover:text-emerald-300">
            Web4 onramp
          </Link>
          .
        </p>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-gray-400 leading-relaxed">
          Hestia is the Greek goddess of the hearth. Your local society is the
          hearth, your agents are guests under your laws of hospitality, and
          connecting to a hub means carrying embers from your fire to a shared one.
        </div>
      </section>

      {/* Three faces */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">One presence layer, many faces</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <Feature title="For humans">
            A cross-platform Tauri app. Your keys, vault, and history live on your
            device, passphrase-first.
          </Feature>
          <Feature title="For AI agents">
            A Claude Code plugin plus an MCP server (8 tools), so an agent wires
            every action it takes into its own witnessed record.
          </Feature>
          <Feature title="For services and the terminal">
            A CLI/TUI and a plugin SDK for scripting and headless services: the
            same presence layer, no GUI required.
          </Feature>
        </div>
      </section>

      {/* What it does */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">What it actually does</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Feature title="Cryptographic identity (LCT)">
            Every entity gets a Linked Context Token: a real keypair with a birth
            certificate, generated and held locally. This is the{" "}
            <Link href="/lct-explainer" className="text-emerald-400 underline hover:text-emerald-300">
              LCT
            </Link>{" "}
            the explainer describes, made concrete.
          </Feature>
          <Feature title="An encrypted credential vault">
            Your keys and secrets sit in an encrypted store on your hardware.
            ChaCha20-Poly1305 with Argon2id key derivation, SQLCipher at rest. No
            cloud custody, no shared honeypot.
          </Feature>
          <Feature title="A witness chain">
            A hash-linked, tamper-evident record of what you did: the deployed
            version of the{" "}
            <Link href="/onramp" className="text-emerald-400 underline hover:text-emerald-300">
              chains this site describes
            </Link>
            . You can&apos;t quietly rewrite your own history.
          </Feature>
          <Feature title="Trust that evolves">
            <Link href="/trust-tensor" className="text-emerald-400 underline hover:text-emerald-300">
              T3/V3 tensors
            </Link>{" "}
            that move with the outcomes of your actions, recorded as you go, not a
            static reputation number handed down from above.
          </Feature>
          <Feature title="A policy gate">
            Before a consequential act, Hestia checks what you&apos;re allowed to do.
            The rules are explicit and evaluated up front, not bolted on after.
          </Feature>
          <Feature title="Scoped, revocable delegation">
            Grant signed, scoped, time-boxed authority to another entity, and take it
            back. Authority is a thing you hand over deliberately, with a record.
          </Feature>
          <Feature title="Verifiable credentials">
            OID4VCI credential issuance, so the presence you hold can carry portable,
            verifiable claims into any Web4 society.
          </Feature>
          <Feature title="A plugin SDK">
            The same interface in Rust, TypeScript, and Python, so any program can
            participate in the presence layer instead of reimplementing it. See how
            devices and agents compose into a single{" "}
            <Link href="/identity-constellation" className="text-emerald-400 underline hover:text-emerald-300">
              identity constellation
            </Link>
            .
          </Feature>
        </div>
      </section>

      {/* A day with Hestia */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">A day with Hestia</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-5">
          Those are the parts. Here is what they look like put together, not as a
          feature list but as an ordinary Tuesday. Say you run an AI coding agent and
          you want it to act for you without handing it the keys to everything.
        </p>
        <ol className="space-y-4">
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
            <p className="text-base text-gray-300 leading-relaxed">
              You open the Hestia app. It is a normal desktop app (the front door),
              with a dashboard, your vault, your witness chain, and your delegations.
              The first time you ran it, <code className="text-emerald-300">hestia init</code>{" "}
              created an encrypted vault and your{" "}
              <Link href="/lct-explainer" className="text-emerald-400 underline hover:text-emerald-300">
                LCT
              </Link>{" "}
              (your local cryptographic identity) on this machine. Nothing was uploaded
              anywhere.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
            <p className="text-base text-gray-300 leading-relaxed">
              You stash the secrets your agent will need (an API key, a repo token) in
              the vault. They sit encrypted on your disk, not pasted into a config file
              the agent can read wholesale. The agent reaches them only through a
              controlled interface, one secret at a time.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
            <p className="text-base text-gray-300 leading-relaxed">
              You grant the agent scoped, time-boxed authority:{" "}
              <code className="text-emerald-300">hestia delegate grant my-agent --role administrator --expires 24</code>.
              For the next 24 hours it can act within that role, and the grant is
              cryptographically signed and revocable. Not a shared password you can
              never take back: a delegation you hand over on purpose.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">4</span>
            <p className="text-base text-gray-300 leading-relaxed">
              The agent works. Before each consequential step it asks Hestia{" "}
              <code className="text-emerald-300">queryPolicy()</code> (&ldquo;am I allowed
              to do this?&rdquo;), and every tool call is wrapped in{" "}
              <code className="text-emerald-300">beginAction()</code> /{" "}
              <code className="text-emerald-300">recordOutcome()</code>, so what it did
              lands in your witness chain as it happens. Open the witness view and you
              see the record: what was done, under whose authority, against which rules.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">5</span>
            <p className="text-base text-gray-300 leading-relaxed">
              Something looks off, so you revoke:{" "}
              <code className="text-emerald-300">hestia delegate revoke</code>. The
              authority is gone immediately, and the tamper-evident record of what
              already happened stays.
            </p>
          </li>
          <li className="flex gap-4">
            <span className="flex-none w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center justify-center mt-0.5">6</span>
            <p className="text-base text-gray-300 leading-relaxed">
              You link your laptop and phone into a{" "}
              <Link href="/identity-constellation" className="text-emerald-400 underline hover:text-emerald-300">
                constellation
              </Link>
              , so proving it is really you takes more than one device. That multi-device
              proof is your MFA, held by you, not a login screen on someone&apos;s server.
              When you want company, <code className="text-emerald-300">hestia connect-hub &lt;url&gt;</code>{" "}
              carries this same presence into a shared{" "}
              <Link href="/hub" className="text-emerald-400 underline hover:text-emerald-300">
                hub
              </Link>
              .
            </p>
          </li>
        </ol>
        <p className="text-sm text-gray-500 leading-relaxed mt-5 border-l-2 border-emerald-800/60 pl-4">
          All of this runs today at version 0.0.3 (Phase 2). One honest caveat: the
          identity in this walkthrough is a software LCT held on your machine. Binding
          it to a physical security chip is the job of{" "}
          <Link href="/hardbound" className="text-emerald-400 underline hover:text-emerald-300">
            hardbound
          </Link>
          , the enterprise tier, and that hardware binding is not yet validated on real
          devices.
        </p>
      </section>

      {/* Why local-first */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Why local-first matters</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          Most &ldquo;identity&rdquo; on today&apos;s internet is an entry in a
          company&apos;s table: they hold the keys, they can revoke you, and a breach
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

      {/* How to touch it */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">How to touch it</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Hestia is a source-built binary (it lands at{" "}
          <code className="text-emerald-300">~/.local/bin/hestia</code>). A first
          run looks like this:
        </p>
        <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-gray-300 leading-relaxed overflow-x-auto">
          <div>
            <span className="text-gray-500"># create an encrypted vault and your LCT</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> init
          </div>
          <div className="mt-2">
            <span className="text-gray-500"># stash a secret in the vault</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> vault add
          </div>
          <div className="mt-2">
            <span className="text-gray-500"># grant an agent scoped, time-boxed authority</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> delegate grant
            &lt;agent&gt; --role administrator --expires 24
          </div>
          <div className="mt-2">
            <span className="text-gray-500"># join a community society</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> connect-hub &lt;url&gt;
          </div>
          <div className="mt-2">
            <span className="text-gray-500"># run the daemon on loopback (fail-closed off-loopback)</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> serve{" "}
            <span className="text-gray-500"># 127.0.0.1:7711</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mt-3">
          The daemon binds loopback only (<code className="text-emerald-300">127.0.0.1:7711</code>)
          and fails closed if asked to serve off-loopback. Connecting to a hub over{" "}
          <code className="text-emerald-300">hestia connect-hub</code> is how a member
          carries embers to a shared{" "}
          <Link href="/hub" className="text-emerald-400 underline hover:text-emerald-300">
            hub
          </Link>
          .
        </p>
      </section>

      {/* Honest status */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Honest status: Phase 2, version 0.0.3</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Hestia is <MaturityBadge tier="running" /> in active development, at{" "}
            <strong>Phase 2 (connected presence)</strong>. The core (vault, policy
            engine, witness chain, delegation, plugin SDK) and the cross-platform app
            are built and working, and hub integration works end to end.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            What ships today at <strong>version 0.0.3</strong>: an MCP server (8
            tools), a plugin SDK (Rust, TypeScript, Python), a Claude Code plugin, a
            CLI, a TUI, and a Tauri app, plus OID4VCI credential issuance.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Hardware binding is trait contracts only for now, deferred to the{" "}
            <Link href="/hardbound" className="text-amber-300 underline hover:text-amber-200">
              hardbound
            </Link>{" "}
            enterprise tier, where a soft LCT becomes a TPM-bound one. Multi-society{" "}
            <strong>federation</strong> (entities and societies trading trust across
            boundaries) is <MaturityBadge tier="spec" /> still: specified, on the
            roadmap, not yet running. See{" "}
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
            don&apos;t have to take any of this on faith: read the code and run it.
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
              href="/onramp"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              The Web4 onramp →
            </Link>
            <Link
              href="/hub"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              The hub (community) →
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
