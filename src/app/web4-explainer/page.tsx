export default function Web4ExplainerPage() {
  return (
    <>
      <section>
        <h1>Web4 in one page</h1>
        <p style={{ marginTop: "1rem", maxWidth: "40rem", color: "#d1d5db" }}>
          This page gives a compact overview of core Web4 concepts as they show up
          in 4-Life. For the full specification, examples, and design notes, see
          the
          <a
            href="https://dp-web4.github.io/web4/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#38bdf8", marginLeft: 4 }}
          >
            Web4 whitepaper
          </a>
          .
        </p>
      </section>

      <section>
        <h2>1. LCT: Linked Context Token</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          An LCT is a <strong>linked context token</strong>: a non-fungible token
          that lives on a society&apos;s blockchain. Each LCT represents a subject in
          that society&apos;s context (an agent, society, role, resource, or task)
          and carries MRH and T3/V3 views.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          LCTs are linked together by RDF-like graph edges (for example:
          <code>agent_lct --web4:hasRole--&gt; role_lct</code> or
          <code>society_lct --web4:federatesWith--&gt; society_lct</code>). In
          4-Life, every agent, society, and role is modeled as an LCT embedded in
          a specific society&apos;s MRH and chain, not as a free-floating ID.
        </p>
      </section>

      <section>
        <h2>2. MRH: Markov Relevancy Horizon</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          MRH defines the boundary of what you can see in a Web4 society—the
          trust-based graph that determines which entities and information are
          visible to you. Think of it as encompassing memory (what the system remembers
          about an LCT), reputation (how behavior is recorded), and history (structured
          event chains), all filtered through trust relationships.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, MRH shows up as a per-society microchain plus an in-memory
          MRH/LCT context graph. Every meaningful event becomes both a chain
          entry and a graph edge.
        </p>
      </section>

      <section>
        <h2>3. T3 / V3: Trust & Value Tensors</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          T3 and V3 are small numeric tensors that summarize how much a system
          trusts or values an LCT along a few axes (for example: safety,
          competence, alignment). Different societies can choose different
          semantics for their axes, but the shape stays compatible.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, both agents and societies carry T3-like trust vectors that
          get updated based on on-chain behavior and policies. They drive
          throttling, suppression, and federation decisions.
        </p>
      </section>

      <section>
        <h2>4. ATP / ADP: Allocation Transfer Packet / Allocation Discharge Packet</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          ATP and ADP are semifungible packets for allocating scarce resources: time,
          attention, compute, energy, and authority. They are not a coin; they are a
          way to meter who can spend whose capacity under which conditions.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, treasury and budget policies are framed in terms of ATP:
          how much resource allocation a role or agent is allowed to direct,
          and when that budget should be revoked or audited. Discharged packets (ADP)
          carry ephemeral metadata about how resources were used.
        </p>
      </section>

      <section>
        <h2>5. R6/R7: Action Framework</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          <strong>R6</strong> (legacy) and <strong>R7</strong> (current) define how all Web4 actions are structured.
          Every interaction follows this pattern:
        </p>
        <div style={{ marginTop: "0.75rem", marginLeft: "1.25rem", color: "#d1d5db" }}>
          <p style={{ fontFamily: "monospace", color: "#38bdf8" }}>
            Rules + Role + Request + Reference + Resource → Result (+ Reputation in R7)
          </p>
        </div>
        <ul style={{ marginTop: "0.75rem", marginLeft: "1.25rem", color: "#d1d5db", lineHeight: "1.75" }}>
          <li><strong>Rules:</strong> What constraints apply (permissions, rate limits, ATP minimums)?</li>
          <li><strong>Role:</strong> Who is acting in what context (role-specific trust tensors)?</li>
          <li><strong>Request:</strong> What specific action is being performed?</li>
          <li><strong>Reference:</strong> What prior state or evidence supports this action?</li>
          <li><strong>Resource:</strong> What ATP/assets are being allocated or consumed?</li>
          <li><strong>Result:</strong> What outcome was produced?</li>
          <li><strong>Reputation</strong> (R7): How did trust (T3) and value (V3) change?</li>
        </ul>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#9ca3af" }}>
          <strong>Why it matters:</strong> R6/R7 makes every action deterministic, auditable, and trust-scored.
          You can&apos;t cheat the system because every component is explicit and witnessed.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, nearly every game action (membership, treasury, audits,
          cross-society policies) is encoded as an R6 envelope before being
          written to a microblock.
        </p>
      </section>

      <section>
        <h2>6. Pairing types between LCTs</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          Web4 distinguishes several standard ways LCTs can be linked:
        </p>
        <ul style={{ marginTop: "0.5rem", marginLeft: "1.25rem", color: "#d1d5db" }}>
          <li>
            <strong>Binding</strong>: a relatively stable attachment, often from
            a root or authority LCT to a role or sub-identity (for example, a
            society binding an internal role LCT).
          </li>
          <li>
            <strong>Pairing</strong>: a more flexible, often time-bounded link
            between independent LCTs (for example, pairing a role LCT to an agent
            LCT for a specific term or task).
          </li>
          <li>
            <strong>Witnessing</strong>: an LCT records that it has observed or
            attested to some interaction involving other LCTs (for example, a hub
            society witnessing a capability broadcast).
          </li>
          <li>
            <strong>Broadcast</strong>: an LCT (often a society or hub) publishes
            a capability or status to many potential counterparts, who may later
            bind, pair, or request witnessing based on that broadcast.
          </li>
        </ul>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, these show up as explicit MRH/LCT edges and R6-described
          events, so other societies can audit how and when those relationships
          were formed or revoked.
        </p>
      </section>

      <section>
        <h2>7. Hardware-bound root LCTs</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          A society&apos;s root LCT is intended to be <strong>hardware-bound</strong>
          (for example, anchored to a TPM or secure enclave). The goal is that
          across reboots and software upgrades, the root LCT presents a stable,
          attestable identity whose MRH and T3/V3 can evolve over time.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "40rem", color: "#9ca3af" }}>
          In 4-Life, we prototype this with stubbed signatures and interfaces for
          hardware identity. Over time, those hooks are meant to be backed by
          real attestation so other societies can tell when they are talking to
          "the same" root LCT versus a fresh or forked one. Even then, Web4
          treats hardware binding as one factor among many: witnessed events,
          pairing structures, and ATP-priced attestations together form a
          contextual, N-factor trust fabric.
        </p>
      </section>

      <section>
        <h2>Going deeper</h2>
        <p style={{ marginTop: "0.75rem", maxWidth: "40rem", color: "#d1d5db" }}>
          If you want the full picture, examples, and rationale behind these
          pieces, read the
          <a
            href="https://dp-web4.github.io/web4/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#38bdf8", marginLeft: 4 }}
          >
            Web4 whitepaper
          </a>
          . 4-Life is one of the main testbeds used to turn that design into a
          stress-tested standard.
        </p>
      </section>
    </>
  );
}
