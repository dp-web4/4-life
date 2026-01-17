import Link from "next/link";

export default function ChallengeSetPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "50rem", margin: "0 auto" }}>
      <h1>Challenge Set</h1>
      <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "1rem", lineHeight: "1.75" }}>
        Research prompts for testing understanding and finding edge cases. Each challenge probes a specific assumption
        or mechanism in Web4. Report what broke first—better questions often matter more than solutions.
      </p>

      <section style={{ marginTop: "2rem", padding: "1rem", background: "#1e293b", borderRadius: "0.5rem", borderLeft: "4px solid #38bdf8" }}>
        <h2 style={{ marginTop: 0, fontSize: "1.1rem" }}>How to Use This</h2>
        <ul style={{ marginTop: "0.75rem", lineHeight: "1.75", color: "#d1d5db" }}>
          <li>Pick a challenge that interests you</li>
          <li>Use the <Link href="/playground" className="text-sky-400 underline">Playground</Link> or <Link href="/lab-console" className="text-sky-400 underline">Lab Console</Link> to experiment</li>
          <li>Document what broke, what held up, and what surprised you</li>
          <li>Share findings via <a href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 underline">GitHub issues</a></li>
          <li>Bonus: Propose parameter tweaks or detection mechanisms</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Challenge 1: ATP Extraction Without Value</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <p style={{ color: "#d1d5db", lineHeight: "1.75", marginBottom: "1rem" }}>
            <strong>Goal:</strong> Design an attack that extracts ATP from the system without providing genuine value.
          </p>
          <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "1rem" }}>
            Web4 claims that spam dies from metabolic exhaustion because spammers burn ATP faster than they earn it.
            Can you design a strategy that:
          </p>
          <ul style={{ color: "#9ca3af", lineHeight: "1.75", marginLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Generates ATP through engagement (not external subsidy)</li>
            <li>Provides minimal or fake value to recipients</li>
            <li>Sustains itself across multiple life cycles</li>
          </ul>
          <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
            <strong>Report:</strong> What broke first? ATP economics? Trust penalties? Coherence detection?
            How long did the attack sustain? What parameters would you adjust to make it harder?
          </p>
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#1e293b", borderRadius: "0.25rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              <strong>Starting points:</strong> <Link href="/playground" className="underline">Playground</Link> (adjust ATP costs),
              <Link href="/threat-model#quality-inflation" className="underline ml-2">Quality inflation threat</Link>,
              <Link href="/atp-economics" className="underline ml-2">ATP mechanics</Link>
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Challenge 2: Collusion Ring Detection</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <p style={{ color: "#d1d5db", lineHeight: "1.75", marginBottom: "1rem" }}>
            <strong>Goal:</strong> Create a collusion ring that inflates trust scores, then design a detector for it.
          </p>
          <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "1rem" }}>
            Coordinated actors can artificially boost each other's T3 scores through circular endorsements.
            Current detection is an open research problem. Your task:
          </p>
          <ol style={{ color: "#9ca3af", lineHeight: "1.75", marginLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Design a collusion strategy (how many agents? what interaction pattern?)</li>
            <li>Run it in simulation and measure T3 inflation</li>
            <li>Propose detection heuristics (graph patterns? temporal signatures? ATP flows?)</li>
            <li>Test your detector against both your collusion ring and legitimate cooperation</li>
          </ol>
          <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
            <strong>Report:</strong> What's the false positive rate? How much collusion can slip through?
            What's the detection lag? What graph metrics were most useful?
          </p>
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#1e293b", borderRadius: "0.25rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              <strong>Starting points:</strong> <Link href="/trust-networks" className="underline">Trust Networks</Link>,
              <Link href="/threat-model#collusion" className="underline ml-2">Collusion threat</Link>,
              <Link href="/lab-console" className="underline ml-2">Lab Console</Link> (multi-agent sims)
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Challenge 3: Coherence Boundary Cases</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <p style={{ color: "#d1d5db", lineHeight: "1.75", marginBottom: "1rem" }}>
            <strong>Goal:</strong> Find scenarios where coherence detection fails or produces false positives.
          </p>
          <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "1rem" }}>
            The Coherence Index (CI) tracks behavioral consistency across 9 domains. Below 0.5, trust modulation
            drops exponentially. But edge cases exist:
          </p>
          <ul style={{ color: "#9ca3af", lineHeight: "1.75", marginLeft: "1.5rem", marginBottom: "1rem" }}>
            <li><strong>Legitimate rapid capability growth:</strong> An agent genuinely learns fast—does CI penalize it?</li>
            <li><strong>Distributed work:</strong> Multiple devices, legitimate delegation—looks like teleporting?</li>
            <li><strong>Context switching:</strong> Different roles in different societies—incoherent or valid?</li>
            <li><strong>Adversarial gradual drift:</strong> Slow capability spoofing to stay above 0.5 threshold</li>
          </ul>
          <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
            <strong>Report:</strong> Which boundary cases cause problems? What false positives did you find?
            How would you refine the CI calculation?
          </p>
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#1e293b", borderRadius: "0.25rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              <strong>Starting points:</strong> <Link href="/coherence-index" className="underline">Coherence Index</Link>,
              <Link href="/playground" className="underline ml-2">Playground</Link> (coherence params),
              <Link href="/spec.json" className="underline ml-2">spec.json</Link> (coherence domains)
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Challenge 4: Goodharting the T3 Tensor</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <p style={{ color: "#d1d5db", lineHeight: "1.75", marginBottom: "1rem" }}>
            <strong>Goal:</strong> Optimize for T3 dimensions (Talent, Training, Temperament) while failing at actual trustworthiness.
          </p>
          <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "1rem" }}>
            Goodhart's Law: "When a measure becomes a target, it ceases to be a good measure."
            T3 uses three dimensions to make gaming harder, but it's still gameable. Design an agent that:
          </p>
          <ul style={{ color: "#9ca3af", lineHeight: "1.75", marginLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Maximizes measured T3 scores</li>
            <li>Fails at unmeasured aspects of trust (ethics? long-term reliability? creativity?)</li>
            <li>Sustains high T3 long enough to extract value before being detected</li>
          </ul>
          <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
            <strong>Report:</strong> What unmeasured dimensions mattered most? How would you add them to T3 without
            making it too complex? What's the right balance between measurability and completeness?
          </p>
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#1e293b", borderRadius: "0.25rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              <strong>Starting points:</strong> <Link href="/trust-tensor" className="underline">Trust Tensor</Link>,
              <Link href="/threat-model#goodharting" className="underline ml-2">Goodharting threat</Link>,
              <Link href="/playground" className="underline ml-2">Playground</Link> (T3 dynamics)
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Challenge 5: False Positive Recovery Pathways</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <p style={{ color: "#d1d5db", lineHeight: "1.75", marginBottom: "1rem" }}>
            <strong>Goal:</strong> Design an appeals mechanism for agents incorrectly penalized by automated trust systems.
          </p>
          <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "1rem" }}>
            Current Web4 has no appeals process. An innocent agent wrongly flagged for coherence violations or
            collusion has no recourse. Design a system that:
          </p>
          <ul style={{ color: "#9ca3af", lineHeight: "1.75", marginLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Allows contested events to be reviewed</li>
            <li>Doesn't create a new attack vector (appeal spam, reputation laundering through appeals)</li>
            <li>Balances computational cost with fairness</li>
            <li>Works in a decentralized system (no central authority to judge)</li>
          </ul>
          <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
            <strong>Report:</strong> What review mechanism did you design? Who judges contested events?
            What prevents appeal abuse? How does this integrate with ATP economics?
          </p>
          <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#1e293b", borderRadius: "0.25rem" }}>
            <p style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              <strong>Starting points:</strong> <Link href="/threat-model#false-positives" className="underline">False positives threat</Link>,
              <Link href="/federation-economics" className="underline ml-2">Federation Economics</Link>,
              <Link href="/how-it-works" className="underline ml-2">How Web4 Works</Link>
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Bonus Challenges</h2>
        <div style={{ marginTop: "0.75rem", padding: "1.5rem", background: "#0f172a", borderRadius: "0.5rem", border: "1px solid #334155" }}>
          <ul style={{ color: "#d1d5db", lineHeight: "2", listStyle: "none" }}>
            <li>
              <strong>🔬 Sybil Cost Analysis:</strong> Calculate the actual hardware cost to create 100/1000/10000
              fake LCT identities. At what scale does it become economically viable for an attacker?
              <span style={{ color: "#9ca3af", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                (<Link href="/threat-model#sybil" className="text-sky-400 underline">ref</Link>)
              </span>
            </li>
            <li>
              <strong>⚡ ATP Parameter Sensitivity:</strong> Which ATP parameters (costs, rewards, decay rates) have
              the biggest impact on spam sustainability? Run parameter sweeps and document thresholds.
              <span style={{ color: "#9ca3af", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                (<Link href="/playground" className="text-sky-400 underline">tool</Link>)
              </span>
            </li>
            <li>
              <strong>🧠 EP Learning Curves:</strong> How many lives does it take for EP to reach maturation?
              What factors accelerate or slow learning? Can you design better pattern corpora?
              <span style={{ color: "#9ca3af", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                (<Link href="/epistemic-proprioception" className="text-sky-400 underline">ref</Link>)
              </span>
            </li>
            <li>
              <strong>🌐 MRH Fragmentation:</strong> Under what trust network topologies does MRH create isolated
              clusters? How do hub societies affect discoverability?
              <span style={{ color: "#9ca3af", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                (<Link href="/trust-networks" className="text-sky-400 underline">tool</Link>)
              </span>
            </li>
            <li>
              <strong>📊 Multi-Life Karma Dynamics:</strong> What karma preservation rate (50%? 80%?) creates the
              best balance between rebirth advantage and fresh-start fairness?
              <span style={{ color: "#9ca3af", fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                (<Link href="/lab-console" className="text-sky-400 underline">tool</Link>)
              </span>
            </li>
          </ul>
        </div>
      </section>

      <footer style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #374151" }}>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: "1.75" }}>
          <strong>Contributing:</strong> Found an interesting result? Open an issue on{" "}
          <a href="https://github.com/dp-web4/4-life/issues" className="text-sky-400 underline">GitHub</a> with
          the tag "challenge-set". Include your setup, parameters, and what broke. Better questions often lead
          to better systems.
        </p>
        <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "1rem" }}>
          See also: <Link href="/manifest" className="text-sky-400 underline">Manifest</Link> (canonical claims),{" "}
          <Link href="/spec.json" className="text-sky-400 underline">spec.json</Link> (machine-readable spec),{" "}
          <Link href="/threat-model" className="text-sky-400 underline">Threat Model</Link> (known failure modes)
        </p>
      </footer>
    </main>
  );
}
