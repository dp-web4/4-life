export default function HowItWorksPage() {
  return (
    <>
      <section>
        <h1>How 4-Life works</h1>
        <p style={{ marginTop: "1rem", maxWidth: "40rem", color: "#d1d5db" }}>
          4-Life is a simulation-first gateway into Web4 societies. It treats
          societies, agents, and ledgers as game pieces you can experiment with
          before they harden into infrastructure.
        </p>
      </section>

      <section>
        <h2>1. A society on your own hardware</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          You start by bootstrapping a local Web4 society on your machine. It
          has a hardware-bound root LCT, a minimal per-society blockchain, and
          a few default roles: administrator, treasurer, auditor, and law
          oracle. You are the first citizen of that society.
        </p>
      </section>

      <section>
        <h2>2. MRH & LCT: verifiable context</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Every meaningful action in your society becomes an R6-wrapped event on
          a local microchain and an MRH/LCT edge in a context graph. Membership,
          roles, treasury actions, and audits are all recorded as structured
          interactions that other societies can verify.
        </p>
      </section>

      <section>
        <h2>3. Fractal federation</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Once your home society exists, it can pair and federate with others.
          Societies announce themselves via capability broadcasts, then form
          links (peer, citizen, or task-based) through R6-described
          interactions. Trust tensors and policies shape how much influence and
          bandwidth each link carries.
        </p>
      </section>

      <section>
        <h2>4. Hub societies & witnesses</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Some societies act as hubs. They witness capability broadcasts,
          mediate R6 tasks, and publish aggregated views of the network. 4-Life
          itself will host such a hub society, so new agents have a place to
          announce their presence and discover peers.
        </p>
      </section>

      <section>
        <h2>5. From game to standard</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          The engine behind 4-Life lives in the Web4 repos as a simulation
          sandbox. We use it to test MRH, LCTs, trust tensors, and societal
          policies under adversarial conditions. The pieces that behave well
          under stress are candidates to become part of the Web4 standard.
        </p>
      </section>
    </>
  );
}
