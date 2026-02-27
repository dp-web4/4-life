import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import PageTracker from "@/components/PageTracker";

export default function StarterKitPage() {
  return (
    <>
      <PageTracker slug="starter-kit" />
      <Breadcrumbs currentPath="/starter-kit" />
      <section>
        <h1>Society Starter Kit</h1>
        <p style={{ marginTop: "1rem", maxWidth: "40rem", color: "#d1d5db" }}>
          The starter kit will give you everything you need to spin up a local
          Web4 society on your own machine: a hardware-bound presence token,
          per-society record chain, and default roles for treasury, governance,
          and auditing.
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "0.5rem",
            maxWidth: "40rem",
          }}
        >
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#fbbf24" }}>
            Coming Soon
          </div>
          <p style={{ marginTop: "0.5rem", color: "#9ca3af", lineHeight: 1.6 }}>
            The downloadable starter kit is still being developed. In the
            meantime, you can explore Web4 concepts hands-on in the{" "}
            <strong style={{ color: "#38bdf8" }}>Playground</strong> — run
            simulations, tweak parameters, and watch trust-native societies
            emerge in real time.
          </p>
          <Link
            href="/playground"
            style={{
              display: "inline-block",
              marginTop: "0.75rem",
              padding: "0.5rem 1.25rem",
              background: "#0ea5e9",
              color: "white",
              borderRadius: "0.375rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Try the Playground →
          </Link>
        </div>
      </section>

      <section>
        <h2>What the Starter Kit Will Include</h2>
        <ul style={{ marginTop: "0.75rem", marginLeft: "1.25rem", color: "#d1d5db", lineHeight: 1.8 }}>
          <li>
            <strong>Hardware-bound presence</strong> — Your device&apos;s security chip
            (TPM or secure enclave) creates a verifiable presence token that
            can&apos;t be faked without physical hardware.
          </li>
          <li>
            <strong>Per-society record chain</strong> — Each society maintains
            its own tamper-evident history. No global blockchain needed.
          </li>
          <li>
            <strong>Default governance roles</strong> — Treasury management, rule
            enforcement, and auditing come pre-configured so your society can
            function from day one.
          </li>
          <li>
            <strong>Energy budget system</strong> — Every action costs attention
            energy. Valuable contributions earn it back. This makes spam
            self-defeating.
          </li>
        </ul>
      </section>

      <section>
        <h2>Current Status</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          The core engine lives in the{" "}
          <a
            href="https://github.com/dp-web4/web4"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#38bdf8" }}
          >
            dp-web4/web4
          </a>{" "}
          repository. It already supports per-society chains, context
          boundaries, roles, and policies. The packaging into a one-click
          starter kit is the next step.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          Want to explore from source? Clone the repository and look in the{" "}
          <code style={{ background: "#334155", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>
            web4/game
          </code>{" "}
          directory for simulation demos.
        </p>
      </section>

      <section>
        <h2>Why Hardware Binding Matters</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Societies backed by hardware-bound presence tokens are treated as more
          trustworthy by peers. Creating a fake presence means buying a new
          physical device — spam becomes expensive by design, not by policy.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          Societies without hardware binding can still participate, but peers
          may apply stricter rules or lower trust. In Web4, every trust decision
          is made by the parties involved, not by a central authority.
        </p>
      </section>

      <RelatedConcepts currentPath="/starter-kit" />
    </>
  );
}
