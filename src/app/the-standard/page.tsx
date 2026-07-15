import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * The core standard — the open ontology at the base of the Web4 onramp.
 * Grounded ONLY in the public web4 repo: the canonical equation, the honest
 * R&D status, and the newcomer's first-touch path. One of four onramp pieces
 * (the standard, the hub, hestia, hardbound).
 */

export const metadata = {
  title: "The core standard — the open ontology under Web4 | 4-Life",
  description:
    "The core standard is an open ontology (not infrastructure) that makes AI actions verifiable: every entity is anchored to cryptographically witnessed presence, role-contextual trust, and auditable authority, expressed as typed RDF relationships.",
};

export default function TheStandardPage() {
  return (
    <>
      <PageTracker slug="the-standard" />
      <Breadcrumbs currentPath="/the-standard" />
      <NewcomerOrientationBanner accent="#c4b5fd" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-purple-400">
            The core standard
          </div>
          <MaturityBadge tier="reference" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-sky-500 bg-clip-text text-transparent">
          The core standard
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          The core standard is an <strong>open ontology</strong> (not
          infrastructure) that makes AI actions verifiable. It anchors every
          entity to cryptographically witnessed presence, role-contextual trust,
          and auditable authority, expressed as typed{" "}
          <Link href="/glossary" className="text-purple-300 underline hover:text-purple-200">
            RDF
          </Link>{" "}
          relationships.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          It&apos;s the base layer of the{" "}
          <Link href="/onramp" className="text-purple-300 underline hover:text-purple-200">
            onramp
          </Link>
          : the shared vocabulary that the hub, Hestia, and Hardbound all speak.
        </p>
      </section>

      {/* The problem it solves */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">The problem it solves</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          Today you have to choose between two bad options for trusting an agent:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Central control</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              A platform decides who is trusted. That does not scale, and it&apos;s a
              single point of failure.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Cryptographic ownership</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              You&apos;re trusted if you hold the key. But holding a key does not mean
              you will act well.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
          <p className="text-base text-purple-100 leading-relaxed">
            Neither answers the real question: how do I know this agent will behave
            appropriately <em>here</em>, and how do I prove what it did? The core
            standard is built around that question.
          </p>
        </div>
      </section>

      {/* The canonical equation */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">The canonical equation</h2>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
          <code className="block text-center text-lg text-sky-300 font-mono leading-relaxed">
            Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP
          </code>
        </div>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          The operators carry meaning, and the terms must not be redefined:
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">/</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;verified by&rdquo;</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">*</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;contextualized by&rdquo;</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="font-mono text-purple-300 text-lg">+</div>
            <div className="text-sm text-gray-400 leading-relaxed">means &ldquo;augmented with&rdquo;</div>
          </div>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          MCP is the I/O membrane: the cross-society interface. The internal
          structure is{" "}
          <Link href="/lct-explainer" className="text-purple-300 underline hover:text-purple-200">
            LCT
          </Link>{" "}
          +{" "}
          <Link href="/trust-tensor" className="text-purple-300 underline hover:text-purple-200">
            T3/V3
          </Link>
          *MRH +{" "}
          <Link href="/atp-economics" className="text-purple-300 underline hover:text-purple-200">
            ATP/ADP
          </Link>
          . Each term links to a plain-language explainer.
        </p>
      </section>

      {/* Honest status */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Honest status: R&amp;D, not production</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            The spec corpus is stable and reference implementations exist. There is no
            production deployment yet.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="font-semibold text-purple-300 text-sm">web4-core</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                Public at v0.3.0 on crates.io and PyPI. 171 tests green.
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="font-semibold text-purple-300 text-sm">web4-trust-core</div>
              <div className="text-sm text-gray-400 leading-relaxed">
                Public at v0.2.0. The reference Python SDK has 2,627 tests.
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mt-3">
            A reference implementation plus a runnable{" "}
            <Link href="/hub" className="text-amber-300 underline hover:text-amber-200">
              society hub
            </Link>{" "}
            are public.
          </p>
        </div>
      </section>

      {/* How a newcomer touches it */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">How a newcomer touches it</h2>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
          <p className="text-sm text-gray-400 leading-relaxed mb-2">Install it:</p>
          <code className="block text-sm text-sky-300 font-mono leading-relaxed mb-1">
            pip install web4-core web4-trust
          </code>
          <code className="block text-sm text-sky-300 font-mono leading-relaxed">
            cargo add web4-core web4-trust-core
          </code>
        </div>
        <p className="text-base text-gray-400 leading-relaxed mb-3">
          Then run the ~30-second <code className="text-purple-300">identity_bootstrap.py</code>{" "}
          proof-of-presence. It walks the whole loop end to end: create an{" "}
          <Link href="/lct-explainer" className="text-purple-300 underline hover:text-purple-200">
            LCT
          </Link>
          , mint it to a hash-chained ledger, sign and verify, and generate an
          inclusion proof.
        </p>
        <p className="text-base text-gray-400 leading-relaxed">
          To go deeper, read <code className="text-purple-300">docs/START_HERE.md</code> and
          the normative specs in{" "}
          <code className="text-purple-300">web4-standard/core-spec/</code>.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            The core standard is the vocabulary. See how the four pieces compose into
            an onramp, or follow a single concept down.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link
              href="/onramp"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              How the four pieces compose →
            </Link>
            <Link
              href="/trust-neighborhood"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              Trust in context →
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
