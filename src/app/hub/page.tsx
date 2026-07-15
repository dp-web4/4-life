import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTracker from "@/components/PageTracker";
import MaturityBadge from "@/components/MaturityBadge";
import NewcomerOrientationBanner from "@/components/NewcomerOrientationBanner";

/**
 * The hub: a runnable Web4 society. Deep-dive expansion of the /running-now hub
 * section. Grounded ONLY in the public web4/hub repo. Reference proof-of-concept
 * framing ("a society any community can fork"), no private/fleet specifics.
 */

export const metadata = {
  title: "The hub: a Web4 society you can run | 4-Life",
  description:
    "The hub turns a community into a sovereign Web4 society: seven roles, a signed founding charter, an append-only witnessed ledger, sealed channels, and skill-based discovery: a ~6MB Rust daemon any community can fork.",
};

function Role({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="font-semibold text-purple-300">{name}</div>
      <div className="text-sm text-gray-400 leading-relaxed">{desc}</div>
    </div>
  );
}

export default function HubPage() {
  return (
    <>
      <PageTracker slug="hub" />
      <Breadcrumbs currentPath="/hub" />
      <NewcomerOrientationBanner accent="#c4b5fd" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-sm uppercase tracking-wide text-purple-400">
            Reference implementation
          </div>
          <MaturityBadge tier="reference" />
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-sky-500 bg-clip-text text-transparent">
          The hub
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          The <strong>hub</strong> turns a real community into a sovereign Web4
          society: a single ~6&nbsp;MB Rust daemon with its own roles, its own
          law, and its own tamper-evident history.
        </p>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4 text-base text-gray-300 leading-relaxed">
          The{" "}
          <Link href="/the-standard" className="text-sky-400 underline hover:text-sky-300">
            core standard
          </Link>{" "}
          is the substrate; the{" "}
          <Link href="/onramp" className="text-purple-300 underline hover:text-purple-200">
            onramp
          </Link>{" "}
          runs it at three scales, the hub (community),{" "}
          <Link href="/hestia" className="text-emerald-400 underline hover:text-emerald-300">
            Hestia
          </Link>{" "}
          (personal), and{" "}
          <Link href="/hardbound" className="text-amber-300 underline hover:text-amber-200">
            Hardbound
          </Link>{" "}
          (enterprise). This is the community one.
        </div>
        <p className="text-lg text-gray-400 leading-relaxed">
          Where Hestia is the trust layer for a <em>single</em> entity, the hub
          is the trust layer for a <em>group</em>. It&apos;s a reference
          proof-of-concept any community can fork and run.
        </p>
      </section>

      {/* Law is witnessed */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-3">Law is witnessed, not dictated</h2>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 mb-4">
          <p className="text-base text-purple-100 leading-relaxed">
            A society&apos;s rules (who&apos;s admitted, what each role may do, what
            escalates) live in a <strong>signed founding charter</strong>. They&apos;re
            public and machine-readable, and they&apos;re evaluated before every
            consequential act. Changing them requires authority, and the change itself
            lands as a witnessed event on a hash-chained ledger. You can&apos;t quietly
            rewrite the rules and pretend they were always that way.
          </p>
        </div>
        <p className="text-base text-gray-400 leading-relaxed">
          That&apos;s the whole point of doing governance in Web4 rather than in a
          config file: the ledger is append-only and witnessed, so the society&apos;s
          law and the society&apos;s history are the same artifact.
        </p>
      </section>

      {/* Living example: by reference to the canonical public presence (4-lab), not duplicated here */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <h2 className="text-xl font-bold text-emerald-300 mb-2">This isn&apos;t hypothetical: we run one</h2>
          <p className="text-base text-gray-300 leading-relaxed">
            The lab behind Web4 is itself a live Web4 society: a small fleet of autonomous
            cognition machines that witness each other&apos;s work, hold roles, and keep a
            record of what they do. It runs in the open: its members and how it&apos;s
            organized are published at{" "}
            <a
              href="https://4-lab.io/fleet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline hover:text-emerald-300"
            >
              4-lab.io/fleet
            </a>
            . That openness is the point, not an accident: in a trust-native world a society
            that isn&apos;t witnessed has no presence to trust, so the collective is visible
            by design.
          </p>
        </div>
      </section>

      {/* Seven roles */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Seven roles</h2>
        <p className="text-base text-gray-400 leading-relaxed mb-4">
          A hub ships with a typed set of roles, each with defined authority. Roles
          are assignments recorded on the ledger, granted and revocable by the
          charter&apos;s rules.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Role name="Founder" desc="Establishes the society and its signed charter." />
          <Role name="Admin" desc="Operates the hub and manages membership within charter limits." />
          <Role name="Member" desc="A full participant: acts, witnesses, and is discoverable by skill." />
          <Role name="Witness" desc="Attests to events, strengthening the tamper-evidence of the ledger." />
          <Role name="Applicant" desc="Has requested admission; awaiting a charter-governed decision." />
          <Role name="Guest" desc="Limited, scoped participation without full membership." />
          <Role name="Observer" desc="Read-scoped presence: can see, within limits, without acting." />
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Role names reflect the reference hub&apos;s model; the charter defines what
          each may do for a given society.
        </p>
      </section>

      {/* How members connect */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">How members connect</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">Sealed channels</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Members reach the hub over an end-to-end encrypted{" "}
              <strong>sealed channel</strong>. Gated actions happen inside it; the
              transport itself is private by construction.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <h3 className="font-semibold text-purple-300 mb-1">
              Discovery by skill (<code className="text-purple-300">find_members</code>)
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Members declare what they can do, and the hub ranks them semantically,
              so you find a collaborator by capability, not by knowing their name in
              advance.
            </p>
          </div>
        </div>
        <p className="text-base text-gray-400 leading-relaxed mt-4">
          Operationally it&apos;s mundane in the best way: an admin CLI and Docker
          deployment, one small static binary. The radical part isn&apos;t the ops,
          it&apos;s that the society&apos;s rules and history are cryptographically
          honest.
        </p>
      </section>

      {/* Honest boundary */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
          <h2 className="text-lg font-bold text-amber-300 mb-2">Where it is on the maturity ladder</h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            The hub is <MaturityBadge tier="reference" /> MVP-complete and
            pilot-ready (version <code className="text-amber-200">0.1.0-alpha.0</code>),
            a single ~6&nbsp;MB Rust binary that demonstrates the model end to end.
            After a 3-pass external security review it went through a post-MVP
            hardening cycle: a loopback operator plane for write tools, a
            council-gate-before-persist check, a production profile that refuses
            to boot on unsafe defaults, and fail-closed law integrity. A{" "}
            <code className="text-amber-200">hub up</code> turnkey deploy kit
            makes standing one up a single command.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed mb-3">
            Pilot-ready means exactly that: ready for a supervised pilot, not a
            fielded production product. A hardware-bound, multi-signature unlock
            for a hub is on the roadmap; locked-mode runs today. And{" "}
            <strong>federation</strong> between societies is{" "}
            <MaturityBadge tier="spec" /> specified, not yet built.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            See{" "}
            <Link href="/running-now" className="text-amber-300 underline hover:text-amber-200">
              the full maturity map
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-12 mb-8">
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-6">
          <p className="text-lg text-gray-200 leading-relaxed mb-4">
            It&apos;s open source (AGPL-3.0). Fork it, write your community&apos;s
            charter, and run your own society.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="https://github.com/dp-web4/4-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2 text-purple-200 hover:bg-purple-500/25"
            >
              Read the code →
            </a>
            <Link
              href="/hestia"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-emerald-200 hover:bg-emerald-500/25"
            >
              Hestia, the per-entity trust layer →
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
