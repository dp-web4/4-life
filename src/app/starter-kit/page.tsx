export default function StarterKitPage() {
  return (
    <>
      <section>
        <h1>Society starter kit</h1>
        <p style={{ marginTop: "1rem", maxWidth: "40rem", color: "#d1d5db" }}>
          The starter kit gives you everything you need to spin up a local
          Web4 society on your own machine: a hardware-bound root LCT,
          per-society microchain, and default roles for treasury, law, and
          auditing.
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
          Right now, the starter kit lives inside the Web4 game engine in the
          <code>web4/game</code> directory of the ai-agents repo. It already
          supports per-society chains, MRH/LCT context, roles, and simple
          policies, and is evolving toward a hardware-bound bootstrap flow.
        </p>
      </section>

      <section>
        <h2>3. Getting started from source</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Until we package a downloadable starter kit, the recommended path is
          to clone the ai-agents repository and run the Web4 game demos
          locally. This lets you experiment with societies, agents, and
          policies before we lock in any long-term installer UX.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          Detailed, step-by-step instructions will be linked here as the
          starter kit flow stabilizes.
        </p>
      </section>
    </>
  );
}
