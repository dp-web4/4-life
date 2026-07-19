import Link from "next/link";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import { navigationTree } from "@/lib/navigation";

export const metadata = {
  title: "4-Life | The Web4 Onramp",
  description:
    "Web4 makes AI actions verifiable: trust earned through witnessed behavior, not declared by a platform or asserted by a key. The onramp is four composable pieces: the core standard, the hub, hestia, and hardbound.",
};

// The four onramp pieces, in build order (substrate first, then the three scales).
const PIECES: {
  scale: string;
  title: string;
  href: string;
  blurb: string;
  accent: string;
}[] = [
  {
    scale: "Substrate",
    title: "The Core Standard",
    href: "/the-standard",
    blurb:
      "The open ontology every piece speaks: witnessed presence, role-contextual trust, and auditable authority. Install the primitives (web4-core) and mint your first identity in about 30 seconds.",
    accent: "from-sky-400 to-cyan-400",
  },
  {
    scale: "Community scale",
    title: "The Hub",
    href: "/hub",
    blurb:
      "A single ~6MB binary that turns a group into a sovereign Web4 society: seven roles, a signed founding law, an append-only witnessed ledger, and sealed member channels.",
    accent: "from-purple-400 to-fuchsia-400",
  },
  {
    scale: "Personal scale",
    title: "Hestia",
    href: "/hestia",
    blurb:
      "Local-first identity for any human or agent: a cryptographic LCT, an encrypted vault, scoped revocable delegation, and a witnessed trust record, all on your own machine with no cloud.",
    accent: "from-amber-400 to-orange-400",
  },
  {
    scale: "Enterprise scale",
    title: "Hardbound",
    href: "/hardbound",
    blurb:
      "The oversight tier: hardware-bound identity and pre-action policy enforcement (plugins cannot self-approve), producing audit trails built to stand up to regulators.",
    accent: "from-emerald-400 to-teal-400",
  },
];

const CONCEPTS: { label: string; href: string }[] = [
  { label: "LCT (identity)", href: "/lct-explainer" },
  { label: "T3 (trust)", href: "/trust-tensor" },
  { label: "V3 (value)", href: "/value-tensor" },
  { label: "MRH (neighborhood)", href: "/trust-neighborhood" },
  { label: "ATP/ADP (energy)", href: "/atp-economics" },
  { label: "Karma (reputation)", href: "/karma-consequences" },
];

export default function HomePage() {
  return (
    <>
      <PageTracker slug="home" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          A proposed open standard for agentic AI governance
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-sky-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
          Trust, built into the internet.
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          AI agents already take real actions: they write code, move money, and
          make decisions. Today we cannot prove what an agent did, on whose
          authority, or by what rules.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          Web4 closes that gap. Trust is earned through witnessed behavior, not
          declared by a platform and not assumed because someone holds a key.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tldr"
            className="rounded-lg bg-sky-500 hover:bg-sky-400 px-5 py-3 font-semibold text-black transition-colors"
          >
            Web4 in 2 minutes
          </Link>
          <Link
            href="/onramp"
            className="rounded-lg border border-white/20 hover:bg-white/5 px-5 py-3 font-semibold transition-colors"
          >
            See how it fits together
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          New to Web4? Read in this order:{" "}
          <Link href="/tldr" className="text-sky-400 hover:underline">the 2-minute intro</Link>,{" "}
          <Link href="/why-web4" className="text-sky-400 hover:underline">Why Web4</Link>, then{" "}
          <Link href="/first-contact" className="text-sky-400 hover:underline">First Contact</Link>.
          The pieces and concepts below are for when you want to go deeper.
        </p>
      </section>

      {/* The onramp: four pieces */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
          <h2 className="text-3xl font-bold">The onramp</h2>
          <Link href="/onramp" className="text-sky-400 hover:underline text-sm">
            How the pieces compose &rarr;
          </Link>
        </div>
        <p className="text-gray-400 mb-8 leading-relaxed">
          A standard alone is inert. These four pieces are how you actually stand
          it up. The core standard is the substrate you build on. The hub, hestia,
          and hardbound are three scales of the same posture: community, personal,
          and enterprise.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {PIECES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/25 hover:bg-white/[0.07] transition-colors"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                {p.scale}
              </div>
              <div
                className={`text-2xl font-bold mb-2 bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}
              >
                {p.title}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{p.blurb}</p>
              <div className="mt-3 text-sm text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Read more &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The vocabulary */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-2">The vocabulary</h2>
        <p className="text-gray-400 mb-6 leading-relaxed">
          A handful of primitives everything else is built from. Start anywhere,
          or read them in order in the{" "}
          <Link href="/glossary" className="text-sky-400 hover:underline">
            glossary
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-2">
          {CONCEPTS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:border-white/25 hover:bg-white/[0.07] transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Honesty */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <div className="flex items-center gap-3 mb-3">
            <MaturityBadge tier="reference" />
            <h2 className="text-xl font-bold">Where this actually stands</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-3">
            Web4 is research and development, not a finished product. The spec
            corpus is stable and the primitives are installable. The hub is
            pilot-ready. Hestia runs end to end today. Hardbound is a usable,
            actively-hardened enterprise tier whose hardware binding is not yet
            validated on real devices. We say what is real and what is not on
            every page.
          </p>
          <Link href="/running-now" className="text-amber-300 hover:underline font-medium">
            What is runnable today &rarr;
          </Link>
        </div>
      </section>

      {/* Full map */}
      <section className="max-w-4xl mx-auto px-6 py-10 pb-16">
        <h2 className="text-3xl font-bold mb-6">Explore</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(navigationTree).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-sky-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
