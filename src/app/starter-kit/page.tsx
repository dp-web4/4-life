import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function StarterKitPage() {
  return (
    <>
      <Breadcrumbs currentPath="/starter-kit" />
      <section>
        <h1>Society starter kit</h1>
        <p style={{ marginTop: "1rem", maxWidth: "40rem", color: "#d1d5db" }}>
          The starter kit gives you everything you need to spin up a local
          Web4 society on your own machine: a hardware-bound root LCT,
          per-society microchain, and default roles for treasury, law, and
          auditing.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          If you want more background on the concepts this starter kit uses
          (LCT, MRH, T3/V3, ATP/ADP, R6), check out the
          <a
            href="/web4-explainer"
            style={{ color: "#38bdf8", marginLeft: 4 }}
          >
            Web4 explainer
          </a>
          .
        </p>
      </section>

      <section>
        <h2>1. Requirements</h2>
        <ul style={{ marginTop: "0.75rem", marginLeft: "1.25rem", color: "#d1d5db" }}>
          <li>• A machine where you are comfortable running local code.</li>
          <li>• Git and Python (for the current engine-based starter kit).</li>
          <li>• Optional: TPM or secure enclave support for real hardware binding.</li>
        </ul>
      </section>

      <section>
        <h2>2. Current implementation status</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Right now, the starter kit lives inside the public Web4 game engine
          in the <code>web4/game</code> directory of the
          <a
            href="https://github.com/dp-web4/web4"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#38bdf8", marginLeft: 4 }}
          >
            dp-web4/web4
          </a>
          repository. It already supports per-society chains, MRH/LCT context,
          roles, and simple policies, and is evolving toward a hardware-bound
          bootstrap flow.
        </p>
      </section>

      <section>
        <h2>3. Getting started from source</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Until we package a downloadable starter kit, the recommended path is
          to clone the <code>dp-web4/web4</code> repository and run the Web4
          game demos locally. This lets you experiment with societies, agents,
          and policies before we lock in any long-term installer UX.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          Detailed, step-by-step instructions will be linked here as the
          starter kit flow stabilizes.
        </p>
      </section>

      <section>
        <h2>4. Hardware binding and trust</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Societies that can attest to a hardware-bound root identity (for
          example via TPM or secure enclave) will generally be treated as more
          trustworthy by other participants. Societies without hardware
          binding are still free to participate, but peers may choose to apply
          stricter policies or lower trust weights when interacting with them.
          In Web4, every trust decision is ultimately made by the parties to a
          specific interaction, not by a single global authority.
        </p>
      </section>
      <RelatedConcepts currentPath="/starter-kit" />
    </>
  );
}
