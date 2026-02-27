import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function ManifestPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "50rem", margin: "0 auto" }}>
      <Breadcrumbs currentPath="/manifest" />
      <h1>4-Life Manifest</h1>
      <p style={{ marginTop: "0.75rem", color: "#9ca3af", fontSize: "1rem" }}>
        Canonical claims, primitives, and resources in one page. If you only read one page, read this.
      </p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Core Primitives</h2>
        <ul style={{ marginTop: "0.75rem", lineHeight: "1.75" }}>
          <li>
            <strong>LCT (Linked Context Token):</strong> Hardware-rooted identity strongly resistant to impersonation.
            Multi-device witnessing makes fake identities expensive.{" "}
            <Link href="/lct-explainer" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>ATP (Allocation Transfer Packet):</strong> Attention budget inspired by biological ATP.
            Actions cost energy; quality earns it back. Spam dies from exhaustion.{" "}
            <Link href="/atp-economics" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>MRH (Markov Relevancy Horizon):</strong> Trust-based visibility boundaries.
            You see what's relevant through your trust network, not everything.{" "}
            <Link href="/web4-explainer#mrh" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>T3 (Trust Tensor):</strong> 3D role-specific trust (Talent, Training, Temperament).
            Gaming one dimension while failing others is exponentially harder.{" "}
            <Link href="/trust-tensor" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>V3 (Value Tensor):</strong> 3D value measurement (Valuation, Veracity, Validity).
            Multi-dimensional value prevents single-metric gaming.{" "}
            <Link href="/web4-explainer#t3-v3" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>CI (Coherence Index):</strong> Behavioral consistency across time, space, capability, relationships.
            Incoherent behavior (teleporting, capability spoofing) reduces trust.{" "}
            <Link href="/coherence-index" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>R6/R7 (Action Framework):</strong> Every action is Rules + Role + Request + Reference + Resource → Result + Reputation.
            Deterministic, auditable, trust-scored.{" "}
            <Link href="/web4-explainer#r6-r7" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong>EP (Epistemic Proprioception):</strong> Self-awareness of knowledge across lives.
            Agents learn what they know and don't know through multi-life experience.{" "}
            <Link href="/patterns" className="text-sky-400">↗</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Core Claims</h2>
        <ul style={{ marginTop: "0.75rem", lineHeight: "1.75" }}>
          <li>
            <strong>Spam burns out naturally:</strong> Spammers burn attention (ATP) faster than they earn it,
            making spam economically unsustainable without external subsidy.
          </li>
          <li>
            <strong>Multi-dimensional trust is harder to game:</strong> T3 vectors track talent, training, and temperament.
            Gaming all dimensions simultaneously requires actual competence.
          </li>
          <li>
            <strong>Hardware-rooted identity raises impersonation cost:</strong> LCTs bound to TPM/Secure Enclave
            make creating thousands of fake identities expensive (though not impossible for resourced attackers).
          </li>
          <li>
            <strong>Death is real but rebirth carries karma:</strong> Agents can die from ATP depletion,
            but reincarnation preserves trust (T3) and learned patterns (EP) across lives.
          </li>
          <li>
            <strong>Coherence provides behavioral signals:</strong> Physical and temporal constraints create
            detectable inconsistencies when agents fake capabilities or teleport.
          </li>
          <li>
            <strong>Societies self-organize without central authority:</strong> Federation through ATP markets
            and trust-weighted consensus, no central planner required.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Assumptions</h2>
        <ul style={{ marginTop: "0.75rem", lineHeight: "1.75" }}>
          <li>Hardware attestation (TPM, Secure Enclave, FIDO2) provides meaningful identity anchoring</li>
          <li>Multi-device witnessing creates sufficient cost barriers for Sybil attacks</li>
          <li>Quality content generates more ATP through engagement than spam generates through volume</li>
          <li>Trust relationships are transitive (friend-of-friend) but degrade with distance</li>
          <li>Coherence violations are detectable before significant damage occurs</li>
          <li>Economic incentives (ATP costs) are sufficient to deter most low-effort attacks</li>
          <li>Collusion detection is possible through behavioral pattern analysis (open research problem)</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Known Failure Modes</h2>
        <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
          See <Link href="/threat-model" className="text-sky-400 underline">Threat Model & Failure Modes</Link> for
          detailed analysis.
        </p>
        <ul style={{ marginTop: "0.75rem", lineHeight: "1.75" }}>
          <li>
            <strong id="sybil">Sybil attacks:</strong> Resourced attackers with many devices can create multiple identities.
            LCT raises cost floor but doesn't make impossible.{" "}
            <Link href="/threat-model#sybil" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong id="collusion">Collusion & reputation laundering:</strong> Coordinated actors can inflate each other's trust scores.
            Detection time and accuracy unknown (open research).{" "}
            <Link href="/threat-model#collusion" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong id="quality-inflation">Quality score inflation:</strong> Gaming T3 dimensions through selective
            presentation or temporary good behavior. Detection lag unknown.{" "}
            <Link href="/threat-model#quality-inflation" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong id="goodharting">Goodharting T3 dimensions:</strong> Optimizing for measured dimensions while
            neglecting unmeasured aspects of trustworthiness.{" "}
            <Link href="/threat-model#goodharting" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong id="mrh-limits">MRH visibility limits:</strong> Intentional trade-off between privacy and
            discoverability. Isolated clusters may form.{" "}
            <Link href="/threat-model#mrh-limits" className="text-sky-400">↗</Link>
          </li>
          <li>
            <strong id="false-positives">False positives & contested events:</strong> A multi-tier appeals
            mechanism has been designed (SAL-level) but remains untested with real humans.{" "}
            <Link href="/threat-model#false-positives" className="text-sky-400">↗</Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Simulation Parameters</h2>
        <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
          Default presets used across lab console simulations. Explore via{" "}
          <Link href="/playground" className="text-sky-400 underline">Parameter Playground</Link>.
        </p>
        <div style={{ marginTop: "0.75rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "0.9rem", color: "#d1d5db" }}>ATP Economics</h3>
            <ul style={{ fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: "1.5", color: "#9ca3af" }}>
              <li>Initial ATP: 100</li>
              <li>Death threshold: 0</li>
              <li>Small spend: 10 ATP</li>
              <li>Risky spend: 25 ATP</li>
              <li>Quality reward: +15 ATP</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "0.9rem", color: "#d1d5db" }}>Trust (T3)</h3>
            <ul style={{ fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: "1.5", color: "#9ca3af" }}>
              <li>Initial T3: 0.5</li>
              <li>Maturation threshold: 0.7</li>
              <li>Decay on failure: -0.05</li>
              <li>Growth on success: +0.02</li>
              <li>Karma preservation: 50-80%</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "0.9rem", color: "#d1d5db" }}>Multi-Life</h3>
            <ul style={{ fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: "1.5", color: "#9ca3af" }}>
              <li>Default lives: 3</li>
              <li>Ticks per life: 20</li>
              <li>EP maturation: 3-5 lives</li>
              <li>Pattern corpus: 250+ patterns</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "0.9rem", color: "#d1d5db" }}>Coherence (CI)</h3>
            <ul style={{ fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: "1.5", color: "#9ca3af" }}>
              <li>Threshold: 0.5 (modulation floor)</li>
              <li>Domains: 9 (time, space, capability, etc.)</li>
              <li>Trust penalty: exponential below 0.5</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Deep Resources</h2>
        <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.5rem" }}>
          <div>
            <Link href="/spec.json" className="text-sky-400 font-semibold">→ /spec.json</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Machine-readable specification (primitives, parameters, failure modes)
            </span>
          </div>
          <div>
            <Link href="/challenge-set" className="text-sky-400 font-semibold">→ /challenge-set</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Research prompts for testing understanding and finding edge cases
            </span>
          </div>
          <div>
            <Link href="/threat-model" className="text-sky-400 font-semibold">→ /threat-model</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Comprehensive threat analysis with stable anchors (#sybil, #collusion, etc.)
            </span>
          </div>
          <div>
            <Link href="/lab-console" className="text-sky-400 font-semibold">→ /lab-console</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Interactive simulations (EP closed loop, maturation demo, five-domain)
            </span>
          </div>
          <div>
            <Link href="/playground" className="text-sky-400 font-semibold">→ /playground</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              16 tunable parameters with instant feedback
            </span>
          </div>
          <div>
            <Link href="/glossary" className="text-sky-400 font-semibold">→ /glossary</Link>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Canonical definitions for all Web4 terminology
            </span>
          </div>
          <div>
            <a href="https://github.com/dp-web4/4-life" target="_blank" rel="noreferrer" className="text-sky-400 font-semibold">→ GitHub</a>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Source code, issues, contributions
            </span>
          </div>
          <div>
            <a href="https://dp-web4.github.io/web4/" target="_blank" rel="noreferrer" className="text-sky-400 font-semibold">→ Web4 Whitepaper</a>
            <span style={{ color: "#9ca3af", marginLeft: "0.5rem" }}>
              Full specification, examples, and design rationale
            </span>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem", padding: "1.5rem", background: "#1e293b", borderRadius: "0.5rem", borderLeft: "4px solid #38bdf8" }}>
        <h2 style={{ marginTop: 0 }}>Research Status</h2>
        <p style={{ color: "#d1d5db", lineHeight: "1.75" }}>
          This is research, not production. 4-Life explores what's possible when trust becomes computable.
          Concepts are evolving. APIs are unstable. Many ideas are experimental.
        </p>
        <p style={{ marginTop: "0.75rem", color: "#d1d5db", lineHeight: "1.75" }}>
          We share it publicly to invite collaboration, not to suggest it's ready for deployment.
          The best contributions are often better questions, not just code.
        </p>
      </section>

      <footer style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid #374151", color: "#6b7280", fontSize: "0.875rem" }}>
        <p>
          Last updated: 2026-01-16 | Generated with{" "}
          <a href="https://claude.com/claude-code" target="_blank" rel="noreferrer" className="text-sky-400">Claude Code</a>
        </p>
      </footer>
      <RelatedConcepts currentPath="/manifest" />
    </main>
  );
}
