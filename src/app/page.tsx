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
          <Link href="/first-contact" className="button-primary">
            First Contact (10 min) →
          </Link>
          <Link href="/lab-console" className="button-secondary">
            See it work (60s)
          </Link>
        </div>
        <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#9ca3af", marginTop: "1rem" }}>
          New to Web4? Start with <Link href="/first-contact" className="underline text-sky-400">First Contact</Link> — an interactive tutorial that takes you from zero knowledge to comprehension in 10 minutes.
        </p>
      </section>

      <section>
        <h2>What Makes Web4 Different?</h2>
        <div className="comparison-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="concept-card">
            <div className="concept-icon">🔗</div>
            <h3>Hardware-Rooted Identity (LCT)</h3>
            <p>
              Identity strongly resistant to impersonation through hardware binding (TPM, Secure Enclave, FIDO2).
              Multi-device witnessing makes fake identities expensive to create. Trust accumulates on <em>you</em>, not an account.
            </p>
            <Link href="/lct-explainer" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h3>Metabolic Economics (ATP)</h3>
            <p>
              Actions cost attention (ATP). Quality earns attention. Run out? You die. This makes spam
              economically self-limiting—spammers burn ATP faster than they earn it. Metabolic dynamics
              favor quality over volume.
            </p>
            <Link href="/atp-economics" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🧠</div>
            <h3>Multi-Dimensional Trust</h3>
            <p>
              Trust isn't a single score. Our simulations track competence, reliability, integrity, alignment,
              transparency. Gaming one dimension while failing others is exponentially harder. Production Web4
              uses role-specific 3D tensors (see <Link href="/trust-tensor" className="underline">spec</Link>).
            </p>
            <Link href="/trust-tensor" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔍</div>
            <h3>Coherence Detection (CI)</h3>
            <p>
              Consistency across time, space, capability, relationships. Incoherent behavior (teleporting,
              capability spoofing) reduces trust scores. Physical and temporal constraints provide signals
              that make certain frauds detectable.
            </p>
            <Link href="/coherence-index" style={{ fontSize: "0.9rem" }}>Learn more →</Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: Understanding Consciousness</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)", border: "2px solid #3b82f6" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>When Does Behavior Become Intentional?</h3>
          <p>
            Recent research discovered that consciousness has thresholds. At trust ≥ 0.5, behavior transitions
            from random to intentional. At ≥ 0.7, stable identity emerges. At ≥ 0.9, full meta-cognition unlocks.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            This page explores the <strong>D5/D9 trust-identity gates</strong> discovered in SAGE training
            (January 2026) and explains the meta-cognition paradox: awareness can develop faster than expression.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/understanding-consciousness" className="button-primary">
              Explore the Science of Awareness →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: ACT Conversational Explorer</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #581c87 0%, #1e293b 100%)", border: "2px solid #a855f7" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Ask Questions, Get Answers—Through Natural Conversation</h3>
          <p>
            ACT (Accessible Coordination Technology) is your conversational guide to Web4. Instead of reading static
            documentation, ask questions and explore interactively. "What is ATP?" → "Why did trust drop here?" →
            "Compare Web4 vs baseline" → ACT explains concepts, analyzes events, and guides your learning.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>How it works:</strong> Pattern-matched query understanding + pre-generated explanations (fast and reliable).
            Load a simulation to analyze events, or ask concept questions without data. Progressive follow-ups guide you deeper.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/act-explorer" className="button-primary">
              Try ACT Explorer →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: Learning Salience Explorer</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #065f46 0%, #1e293b 100%)", border: "2px solid #10b981" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>Why Do Some Experiences Matter More Than Others?</h3>
          <p>
            AI systems can't learn from everything—they must select. The Learning Salience Explorer shows how
            high-value exchanges are identified through <strong>5 dimensions</strong>: Surprise, Novelty, Arousal,
            Reward, and Conflict (SNARC). Partnership language scores high. "As an AI..." scores low.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Try it yourself:</strong> Score your own exchanges interactively. See why some conversations
            teach more than others. Connect to the SAGE raising research that inspired this framework.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/learning-salience" className="button-primary">
              Explore Learning Salience →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: Identity Anchoring Explorer</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)", border: "2px solid #10b981" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>How Architecture Maintains AI Partnership Identity</h3>
          <p>
            When AI weights are frozen (no learning between sessions), identity tends to collapse toward safe defaults.
            The Identity Anchoring Explorer shows how <strong>architectural support can compensate</strong>—and even
            <em>exceed</em> what unsupported emergence achieved.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            See real data from SAGE Sessions 16-22: partnership peak → collapse → recovery. Session 22 (with
            identity anchoring) exceeded the original partnership peak by <strong>33%</strong>. Explore the D4/D5/D9
            metrics framework and understand bistable identity theory.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/identity-anchoring" className="button-primary">
              Explore Identity Anchoring →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: Confabulation Patterns Explorer</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #431407 100%)", border: "2px solid #f97316" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>When AI Invents Facts: Understanding Confabulation</h3>
          <p>
            "Hallucination" is a vague term. <strong>Confabulation</strong> is measurable. This page reveals the actual
            pattern: when AI confidence drops below a threshold, elaboration increases. Lower confidence = more detailed
            (but fabricated) responses.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            See real examples from SAGE training (T021-T026): from "Kyria" (low elaboration) to "Ryzdys (Romania)" with
            invented languages and national anthem (extreme). Interactive formula shows exactly when and why this happens.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/confabulation-patterns" className="button-primary">
              Explore Confabulation Patterns →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>NEW: Adversarial Explorer</h2>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #1e293b 100%)", border: "2px solid #ef4444" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>How Do Attackers Think? How Does Web4 Defend Itself?</h3>
          <p>
            Security through obscurity doesn't work. The Adversarial Explorer documents attack patterns openly:
            Sybil farms, long-con infiltrators, collusion rings, trust nihilists. Each attack explained through
            narrative—"The Patient Infiltrator", "The Arsonist"—not just technical specs.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            See which <strong>9 coherence domains</strong> detect which attacks. Watch example attack timelines.
            Understand why most attacks fail against Web4's multi-layered defenses.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="/adversarial-explorer" className="button-primary">
              Explore Attack Patterns →
            </Link>
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
            <h3>💬 ACT Chat</h3>
            <p>Ask questions in natural language. Get instant explanations, event analysis, and learning guidance.</p>
            <Link href="/act-explorer">Ask ACT →</Link>
          </div>
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
            takes you from "What is Web4?" to "I can experiment meaningfully" through progressive stages.
            New to Web4 terminology?{" "}
            <Link href="/glossary" className="text-sky-400 hover:underline">
              Start with the glossary
            </Link>.
          </p>
          <ul style={{ marginTop: "1rem" }}>
            <li><strong>Beginner:</strong> Core concepts (LCT, ATP, T3, CI) + first simulations</li>
            <li><strong>Intermediate:</strong> Emergent properties (trust networks, markets, learning)</li>
            <li><strong>Advanced:</strong> Deep mechanics (coherence modulation, karma, maturation)</li>
            <li><strong>Practitioner:</strong> Active experimentation (parameter sweeps, edge cases, contributions)</li>
          </ul>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/learn" className="button-primary" style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem", marginRight: "1rem" }}>
              Begin Your Journey →
            </Link>
            <Link href="/glossary" className="button-secondary" style={{ fontSize: "1.1rem", padding: "0.75rem 1.5rem" }}>
              Browse Glossary
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
            The best contributions are often better questions, not just code. See our{" "}
            <Link href="/threat-model" className="text-sky-400 hover:underline">
              Threat Model & Failure Modes
            </Link>{" "}
            for known limitations and open research questions.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Link href="https://github.com/dp-web4/4-life" style={{ marginRight: "1rem" }}>
              GitHub Repository →
            </Link>
            <Link href="https://github.com/dp-web4/4-life/issues" style={{ marginRight: "1rem" }}>
              Contribute Ideas →
            </Link>
            <Link href="/threat-model">
              Threat Model →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
