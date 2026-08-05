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
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
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
          {/* Jul-31 visitor MEDIUM + Unanswered Q1, and a policy-review condition on that fix:
              this card said an agent "wires every action it takes" into its record. Upstream
              falsifies the universal (hestia/docs/GATE_BYPASS_CATALOG.md D2: the gate hook is
              also the witnessing hook, so anything that routes around the gate writes no entry).
              Narrowed to governed acts here BECAUSE the completeness limit now ships at the
              "Why local-first matters" section below; leaving this universal standing would have
              made the page contradict itself, which is the exact defect class the Jul-31 visitor
              filed. Same narrowing applied at the "Solo is not the mechanism switched off" block.
              Do not restore "every action" on any of the three. */}
          <Feature title="For AI agents">
            A Claude Code plugin plus an MCP server (8 tools), so the actions an
            agent takes under your policy gate are wired into its own witnessed
            record.
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
            Your keys and secrets sit in an encrypted store on your hardware. No
            cloud custody, no shared honeypot.
            <details className="mt-2 group">
              <summary className="cursor-pointer list-none text-xs uppercase tracking-wide text-gray-500 hover:text-gray-400">
                Under the hood
                <span className="ml-1 normal-case tracking-normal group-open:hidden">+</span>
                <span className="ml-1 normal-case tracking-normal hidden group-open:inline">-</span>
              </summary>
              <span className="mt-1 block text-gray-400">
                ChaCha20-Poly1305 encryption, Argon2id key derivation, SQLCipher at rest.
              </span>
            </details>
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
            The presence you hold can carry portable, verifiable claims into any Web4
            society, issued over the open OID4VCI credential standard.
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

      {/* A day with Hestia.
          Anchored (Jul-24 visitor, and Jul-20 Q#4 before it: "what does hestia actually DO for
          me day-to-day? I couldn't picture the user experience"). This walkthrough IS that
          answer, and until now nothing could point at it: the page carried no ids at all, so
          all 18 inbound /hestia links landed a reader at the top. /running-now's reader-routing
          block deep-links here. If you add more anchors to this page, keep scroll-mt-20 so the
          heading clears the fixed nav. */}
      <section id="a-day-with-hestia" className="max-w-4xl mx-auto mt-12 scroll-mt-20">
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
              {/* Aug-05, Aug-01 visitor Unanswered Q8. This is the one step of an "ordinary
                  Tuesday" that is not an ordinary Tuesday: hestia's 2026-08-01 status audit
                  puts the constellation path at built, wired into the hub handshake, 21 unit
                  tests, and zero constellation events in the live chain window (never driven
                  on a real second device). /running-now routes readers straight here calling
                  this walkthrough an ordinary Tuesday, so leaving it unscoped asserts what
                  the /identity-constellation badge now denies. Scoped in place rather than
                  cut: the step is real shipped code and belongs in the walkthrough. */}
              {" "}This step is the one part of the day that is shipped code rather than daily
              practice: the constellation is wired into the hub handshake, but the path has not
              yet been driven on a real second device.
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
          All of this is shipped code at version 0.0.3 (Phase 2), and all of it but the
          constellation step in 6 is in day-to-day use. One honest caveat: the
          identity in this walkthrough is a software LCT held on your machine. Binding
          it to a physical security chip is the job of{" "}
          <Link href="/hardbound" className="text-emerald-400 underline hover:text-emerald-300">
            hardbound
          </Link>
          , the enterprise tier, and that hardware binding is not yet validated on real
          devices.{" "}
          {/* Jul-30 visitor HIGH: "/hestia is the only piece tagged Running and the recommended
              hands-on entry, and its hardware binding is deferred, i.e. software-only. /hestia
              never mentions a trust ceiling," so "the friendliest on-ramp silently drops the
              reader into the most constrained tier" (their Unanswered Q2). This page already
              NAMES the tier ("a software LCT held on your machine"); what it lacked was any
              route to what that tier costs. Routing only, deliberately: stating the ceiling or
              its consequence here would land a position on BOTH standing escalations
              ([[hardware-required-seam]] - this would be the third disagreeing surface; and
              [[trust-05-endpoint-canon-conflict]] - the consequence the visitor wants stated is
              the negation of the > vs >= endpoint, which is exactly what got #444 rejected three
              times). A link asserts neither side. Target L1151 is the strictly-below callout
              that answers the "am I dead on arrival?" question directly. */}
          What anchoring in software alone costs you, in trust terms, is{" "}
          <Link
            href="/lct-explainer#software-only-survival"
            className="text-emerald-400 underline hover:text-emerald-300"
          >
            spelled out on the LCT page
          </Link>
          . Worth reading before you decide this is your long-term identity.
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
        {/* Jul-31 visitor MEDIUM ("/hestia never reconciles 'prove what an agent did' with a
            policy gate a capable agent can route around today") and their Unanswered Q1, which
            they called the question that "determines whether that promise currently holds for
            the only Running piece". They asked for a straight answer either way: "if it does,
            that is a strong answer and should be said loudly. If it does not, say so."

            The answer is no, and it is upstream's own. hestia/docs/GATE_BYPASS_CATALOG.md D2
            ("Selective non-witnessing"): the same hook runs the gate and writes the entry, there
            is no independent observer, so "the chain is a record of governed activity, never a
            complete record of activity", and reading chain silence as nothing-happened is
            unsound. That entry ends with a standing instruction: say so wherever the chain is
            presented as evidence. Catalog section 11 repeats it in the acknowledgements meant to
            be put in front of anyone relying on hestia. This section is that surface.

            What this replaced was worse than incomplete. It asserted that the gate "runs before
            each act" and that record and reality "can't silently diverge", both of which the
            SAME PAGE contradicts 200 lines down (the gate is not built to stop routing around
            it, two environment variables suffice today).

            Three limits on the wording, all from policy review:
            - The divergence absolute is NOT restated in any weaker form. It is false in the
              other direction too: catalog D1 (MEASURED 2026-07-29) has claude-code witnessed as
              kimi-code because identity is client-asserted, and D3 (DEMONSTRATED) has a third
              party manufacturing 22 denials against codex. Entries that ARE written can be
              wrong. Hence the explicit "not about whether it was right when it was written".
            - Scoped to hestia's implementation, never to Web4. "The gate is bypassable" as a
              claim about the standard would be a new canon assertion, not propagation.
            - Not written as a scheduled repair. Catalog section 8 grades D2 one of two entries
              that are an honest "no", "not detectable by any mechanism we have or plan", a
              load-bearing limit of in-process advisory governance. Section 0: containment needs
              an OS boundary the agent cannot reach, and that is a different project. */}
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          The chain is also tamper-evident, which is a narrower promise than it sounds:
          an entry that is in it cannot be quietly edited or removed later. That is
          about what happens to an entry after it is written, not about whether it was
          right when it was written.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          <strong className="text-gray-200">What the chain does not promise is
          completeness</strong>, and that is worth stating plainly on the page that
          invites you to run this. The same hook that runs the policy gate is the thing
          that writes the entry, so an action that routes around the gate (
          <Link href="#honest-status" className="text-sky-300 underline hover:text-sky-200">
            see the gate caveat below
          </Link>
          ) writes no entry at all. Your witness chain is a record of governed activity,
          not a record of all activity, and silence in it is not proof that nothing
          happened. That limit comes from where the gate runs, inside the agent&apos;s own
          process rather than outside it, so it is not the kind of thing better heuristics
          close. It would take an observer the agent cannot reach, and that is not what
          ships today.
        </p>
      </section>

      {/* How to touch it */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">How to touch it</h2>
        {/* Jul-28 visitor HIGH, and the moment they closed the tab: "I got as far as line four and
            stopped. What URL?" plus "there's no install line here the way there is for the core
            standard" plus "the page tells me it's a desktop app and then hands me a CLI". Three gaps,
            one funnel, all at the very end of it. Fixed by naming what actually ships (four prebuilt
            CLI binaries at the v0.0.3 release this page already cites; the DESKTOP app is the one thing
            with no package, which is why the front-door framing needed the "today you build it" clause),
            and by resolving <url> rather than leaving it blank. Do not "simplify" this back to a bare
            command block: the blank placeholder at the end of the funnel is what cost the site a reader. */}
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Start by getting the binary. Version 0.0.3 ships prebuilt{" "}
          <code className="text-emerald-300">hestia</code> CLI binaries for macOS, Linux and
          Windows, so on a mainstream platform this is a download and an unpack, not a build:
        </p>
        <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-gray-300 leading-relaxed overflow-x-auto mb-3">
          <div>
            <span className="text-gray-500"># grab the binary for your platform, then put it on your PATH</span>
          </div>
          <div>
            <a
              href="https://github.com/dp-web4/hestia/releases/tag/v0.0.3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 underline hover:text-emerald-200"
            >
              github.com/dp-web4/hestia/releases/tag/v0.0.3
            </a>{" "}
            <span className="text-gray-500">→ ~/.local/bin/hestia</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          Prefer to build it yourself, or on a platform without a prebuilt binary?{" "}
          <code className="text-emerald-300">cargo build --release</code> in{" "}
          <code className="text-emerald-300">core/</code> produces the same binary at{" "}
          <code className="text-emerald-300">core/target/release/hestia</code>.{" "}
          <strong className="text-gray-300">One honest gap:</strong> the cross-platform{" "}
          <em>desktop app</em> is the front door hestia is aiming at, and it is the one piece
          with no package to download yet. It builds from source; the packaged artifacts today
          are these CLI binaries plus an Android APK. That is why the walkthrough below is a
          terminal session rather than a screenshot tour.
        </p>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          A first run looks like this:
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
            <span className="text-gray-500"># run the daemon on loopback (fail-closed off-loopback)</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> serve{" "}
            <span className="text-gray-500"># 127.0.0.1:7711</span>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10">
            <span className="text-gray-500"># optional, and only once you have a hub to point at:</span>
          </div>
          <div>
            <span className="text-emerald-300">hestia</span> connect-hub &lt;url&gt;
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mt-3">
          The daemon binds loopback only (<code className="text-emerald-300">127.0.0.1:7711</code>)
          and fails closed if asked to serve off-loopback.
        </p>
        <div className="mt-4 rounded-lg border border-sky-500/30 bg-sky-500/10 p-4">
          <h3 className="text-base font-bold text-sky-200 mb-2">
            &ldquo;Connect to <em>what</em>? Where do I get a URL?&rdquo;
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            <strong className="text-gray-200">You don&apos;t need one to start.</strong> Everything
            above the divider runs entirely on your own machine: the vault, your identity, delegation
            grants, the witness record, the daemon. A hestia that never talks to a hub is not a
            crippled hestia, it is the normal solo case, and it is the whole of the walkthrough
            further up this page.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            <code className="text-emerald-300">connect-hub</code> is for when you want company.
            The honest status:{" "}
            The spec is written, the code is installable today, and there is no public network open to outside members yet.{" "}
            So there is no directory of hubs to browse and no address we can hand you here.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            The URL is one <em>you or your group stand up</em>. A{" "}
            <Link href="/hub" className="text-sky-300 underline hover:text-sky-200">
              hub
            </Link>{" "}
            is a single small Rust daemon: build it from source or pull the Docker image, and its
            organizer quickstart puts a chapter online in 10 to 30 minutes. Then the URL is your own
            hub&apos;s address.{" "}
            <a
              href="https://github.com/dp-web4/4-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 underline hover:text-sky-200"
            >
              The hub source and organizer quickstart →
            </a>
          </p>
          {/* Jul-29 visitor Unanswered Question 8. They read the honest-status sentence above and
              concluded "Hestia is the piece that runs, and it runs alone ... the runnable thing is
              the one part of the system where the core mechanism cannot yet operate." That inference
              is false and the box did not close it: the paragraphs above say solo is "not a crippled
              hestia" and tell you how to stand a hub up, but nothing here says the witnessing
              actually operates solo, or that the connected path has been exercised at all. Both
              halves are already on the site (the solo half at the "Trust that evolves" and "For AI
              agents" cards further up this page, the fleet at /hub#we-run-one), so this is
              propagation to the read point, not a new claim. Two hard limits: the canonical sentence
              in the paragraph above is byte-identical on /how-it-works and /day-in-web4 (see the
              guard at how-it-works.tsx L83-92) and is NOT paraphrased here, it is pointed at; and
              nothing here says a hub is deployed or running continuously, which /running-now
              contradicts.
              Jul-31: this block used to open the demonstration with "every action an agent takes
              under your delegation". The universal is falsified by the completeness limit now
              shipping in the "Why local-first matters" section above (see the long guard there).
              Narrowed to the governed act. The block's own job is unchanged: it still shows that
              solo witnessing OPERATES, which is what Q8 asked for. Do not restore "every".
              Aug-05: the Aug-01 visitor asked Q8 again, about a MULTI-PARTY day one rather than
              the solo case this block answers, so /identity-constellation now points here for the
              solo half. This paragraph had no id and #honest-status (the nearest one) is the
              section BELOW it, so an inbound link landed past the answer. Added id="solo-witnessing".
              Keep it in sync with that inbound link. */}
          <p id="solo-witnessing" className="text-sm text-gray-300 leading-relaxed mt-3 scroll-mt-20">
            <strong className="text-gray-200">Solo is not the mechanism switched off.</strong>{" "}
            The &ldquo;no public network&rdquo; caveat above is about reach, not capability. Web4
            trust comes from being witnessed, and a
            solo hestia is already witnessing: when an agent acts under your delegation, your
            policy gate checks the act and your witness chain records it, and its{" "}
            <Link href="/trust-tensor" className="text-sky-300 underline hover:text-sky-200">
              T3/V3
            </Link>{" "}
            move with the outcomes. What a hub adds is other people, and that path is not untried
            either: hub integration has been exercised end to end, down to sealed messages between
            two members that the hub relays without being able to read them (
            <Link href="#honest-status" className="text-sky-300 underline hover:text-sky-200">
              honest status
            </Link>
            ). The fleet that builds hestia holds roles and witnesses its own work in the open (
            <Link href="/hub#we-run-one" className="text-sky-300 underline hover:text-sky-200">
              we run one
            </Link>
            ).
          </p>
        </div>
      </section>

      {/* Honest status */}
      <section id="honest-status" className="max-w-4xl mx-auto mt-12 scroll-mt-20">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Honest status: Phase 2, version 0.0.3</h2>
          {/* Jul-29 visitor Unanswered Question 8: "Hestia runs but there is no public network open
              to outside members yet. If trust comes from being witnessed by others, what does the one
              running piece actually demonstrate?" They concluded "the runnable thing is the one part
              of the system where the core mechanism cannot yet operate." This paragraph tracks
              hestia/README.md L7 and was the page's ONLY rebuttal to that, four words long ("works
              end to end") and ~30 lines below the caveat that prompted the question. Named what the
              phrase covers, per README's status table (Hub connection, Member-to-hub channel, Paired
              member-to-member channels, Constellation: all Working). Deliberately claims exercised
              capability and NOT deployment: /running-now says "No production deployment yet" and the
              hub is pilot-ready rather than deployed. Do not upgrade this to "deployed" or "a hub is
              up". The reach caveat stays where it is, verbatim, in the connect-hub box above.
              Aug-05: the README status table this paragraph tracks (Constellation: Working) was
              SUPERSEDED by hestia/docs/STATUS_AUDIT_2026-08-01.md, which splits "Working" into
              three states and moves the constellation to built-but-never-driven (zero
              constellation events in the live chain window). "proves its device constellation"
              became "carries a device constellation proof" plus the exercised-only-in-tests
              clause, so this page stops being the optimistic sibling of the /identity-constellation
              badge (running -> reference, same session). The OTHER four items in the list are
              unaffected: the audit marks them measured. If you re-check README.md:192 and find
              "Working", you are reading the superseded table. */}
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Hestia is <MaturityBadge tier="running" /> in active development, at{" "}
            <strong>Phase 2 (connected presence)</strong>. The core (vault, policy
            engine, witness chain, delegation, plugin SDK) and the cross-platform app
            are built and working, and hub integration works end to end: a hestia joins
            a hub, opens an encrypted member-to-hub channel, carries a device
            constellation proof in the handshake, and exchanges sealed member-to-member
            messages that the hub relays without being able to read them. The
            constellation is the one item in that list that has been exercised only in
            tests: the code ships and the handshake carries it, but it has not yet run
            against a real second device.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            What ships today at <strong>version 0.0.3</strong>: an MCP server (8
            tools), a plugin SDK (Rust, TypeScript, Python), a Claude Code plugin, a
            CLI, a TUI, and a Tauri app, plus OID4VCI credential issuance.
          </p>
          {/* Added Jul-28 alongside the install path above. This page now converts readers into people
              who will actually run `hestia delegate grant <agent> --role administrator`, so withholding
              upstream's loudest caveat about the thing that polices that grant would be dishonest by
              omission. Wording tracks hestia/README.md L9-20, which carries this ABOVE THE FOLD. */}
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            <strong className="text-amber-200">The policy gate stops accidents, not adversaries.</strong>{" "}
            The gate that checks an agent&apos;s action before it runs is an early prototype. It
            reliably stops simple erroneous or accidentally destructive commands and it produces an
            accountability record, but it is not built to stop a sophisticated agent from routing
            around it (two environment variables suffice today), and a heuristic gate will always play
            whack-a-mole with a general reasoner. Read{" "}
            <a
              href="https://github.com/dp-web4/hestia/issues/49"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 underline hover:text-amber-200"
            >
              issue #49
            </a>{" "}
            for the measured bypasses and the planned hardening before you rely on it.
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
