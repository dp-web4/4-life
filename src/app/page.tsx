import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section>
        <div className="hero-eyebrow">Web4 societies, in motion</div>
        <h1 className="hero-title">4-Life: Trust-Native Societies for Humans and AI</h1>
        <p className="hero-subtitle">
          What if trust was measurable? What if spam died from metabolic exhaustion? What if societies
          self-organized without central authority? 4-Life explores these questions through interactive
          simulations of Web4—a trust-native internet where behavior creates reputation, attention is
          metabolic, and death is real but rebirth carries karma forward.
        </p>
        <div className="button-row">
          <Link href="/learn" className="button-primary">
            Start learning →
          </Link>
          <Link href="/lab-console" className="button-secondary">
            See it work (60s)
          </Link>
        </div>
      </section>

      <section>
        <h2>What Makes Web4 Different?</h2>
        <div className="comparison-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="concept-card">
            <div className="concept-icon">🔗</div>
            <h3>Unforgeable Identity (LCT)</h3>
            <p>
              Hardware-bound identity you can't fake. Your device's secure enclave proves you're you.
              No passwords. No stolen accounts. Trust accumulates on <em>you</em>, not an account.
            </p>
            <Link href="/lct-explainer" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h3>Metabolic Economics (ATP)</h3>
            <p>
              Actions cost attention (ATP). Quality earns attention. Run out? You die. This makes spam
              impossible and valuable contributions sustainable. No moderators needed—math enforces it.
            </p>
            <Link href="/atp-economics" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🧠</div>
            <h3>Multi-Dimensional Trust (T3)</h3>
            <p>
              Trust isn't a single score. T3 captures competence, reliability, integrity, alignment,
              transparency. Gaming one dimension while failing others doesn't work. You must be
              authentically trustworthy.
            </p>
            <Link href="/trust-tensor" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔍</div>
            <h3>Coherence Detection (CI)</h3>
            <p>
              Consistency across time, space, capability, relationships. Incoherent behavior (teleporting,
              capability spoofing) tanks your trust automatically. Web4's immune system detects fraud
              through physics.
            </p>
            <Link href="/coherence-index" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
        </div>
      </section>

      <section>
        <h2>See Web4 in Action</h2>
        <div className="detail-box">
          <p>
            The <strong>Lab Console</strong> lets you watch Web4 societies evolve in real-time.
            Run a simulation and see:
          </p>
          <ul>
            <li><strong>Multi-life cycles:</strong> Agents live, die, and are reborn with karma</li>
            <li><strong>ATP economics:</strong> Attention budgets grow and deplete based on behavior</li>
            <li><strong>Trust dynamics:</strong> T3 scores change through interactions</li>
            <li><strong>Pattern learning:</strong> Epistemic Proprioception (EP) improves across generations</li>
            <li><strong>Trust networks:</strong> Societies self-organize from emergent relationships</li>
          </ul>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/lab-console" className="button-primary">
              Try the Lab Console →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Explore Interactive Tools</h2>
        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          <div className="detail-box">
            <h3>📊 Parameter Playground</h3>
            <p>Adjust ATP costs, trust dynamics, karma mechanics. See what creates sustainability vs collapse.</p>
            <Link href="/playground">Experiment →</Link>
          </div>
          <div className="detail-box">
            <h3>🕸 Trust Networks</h3>
            <p>Watch trust relationships form between agents. See coalitions emerge and free-riders get isolated.</p>
            <Link href="/trust-networks">Visualize →</Link>
          </div>
          <div className="detail-box">
            <h3>💹 Federation Economics</h3>
            <p>See how ATP markets self-organize through dynamic pricing. No central planner needed.</p>
            <Link href="/federation-economics">Explore →</Link>
          </div>
          <div className="detail-box">
            <h3>🧬 Pattern Corpus</h3>
            <p>Browse what agents learn across lives. See epistemic proprioception mature through experience.</p>
            <Link href="/patterns">Browse →</Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Start Your Learning Journey</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, var(--color-gray-800) 0%, var(--color-gray-900) 100%)" }}>
          <p>
            Web4 is complex, but comprehensible. We've created a <strong>guided learning pathway</strong> that
            takes you from "What is Web4?" to "I can experiment meaningfully" through progressive stages:
          </p>
          <ul style={{ marginTop: "1rem" }}>
            <li><strong>Beginner:</strong> Core concepts (LCT, ATP, T3, CI) + first simulations</li>
            <li><strong>Intermediate:</strong> Emergent properties (trust networks, markets, learning)</li>
            <li><strong>Advanced:</strong> Deep mechanics (coherence modulation, karma, maturation)</li>
            <li><strong>Practitioner:</strong> Active experimentation (parameter sweeps, edge cases, contributions)</li>
          </ul>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/learn" className="button-primary" style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem" }}>
              Begin Your Journey →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Technical Architecture (For the Curious)</h2>
        <div className="fractal-graph">
          <p style={{ marginBottom: "1rem" }}>
            Web4 societies are <strong>fractal</strong>—the same architecture works at every scale:
          </p>
          <ul>
            <li>• <strong>Your home society:</strong> Root LCT on your hardware (phone, laptop)</li>
            <li>• <strong>Peer societies:</strong> Federate via MRH (Markov Relevancy Horizon) trust links</li>
            <li>• <strong>Hub societies:</strong> Witness capability broadcasts and coordinate tasks</li>
            <li>• <strong>Planet view:</strong> Trust-weighted network of autonomous societies</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/how-it-works">Read the full architecture explanation →</Link>
          </p>
        </div>
      </section>

      <section>
        <h2>Research Status</h2>
        <div className="detail-box" style={{ borderLeft: "4px solid var(--color-warning)" }}>
          <p>
            <strong>This is research, not production.</strong> 4-Life explores what's possible when
            trust becomes computable. Concepts are evolving. APIs are unstable. Many ideas are
            experimental. We share it publicly to invite collaboration, not to suggest it's ready
            for deployment.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            If the ideas resonate, engage: run simulations, question assumptions, contribute insights.
            The best contributions are often better questions, not just code.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="https://github.com/dp-web4/4-life" style={{ marginRight: "1rem" }}>
              GitHub Repository →
            </Link>
            <Link href="https://github.com/dp-web4/4-life/issues">
              Contribute Ideas →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
