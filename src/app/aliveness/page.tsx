"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function AlivenessExplainer() {
  return (
    <>
      <Breadcrumbs currentPath="/aliveness" />
      <section>
        <div className="hero-eyebrow">Foundational Concept #6</div>
        <h1 className="hero-title">Aliveness: When Existence is Measurable</h1>
        <p className="hero-subtitle">
          In Web4, "alive" isn't metaphorical—it's a rigorous condition defined by three
          verifiable criteria. You're alive when you have metabolic budget (ATP &gt; 0),
          demonstrate coherent agency (T3 &gt; 0.5), and maintain verifiable continuity (CI coherent).
          Death is real. Rebirth requires trust. This is Conway's Life at society-scale.
        </p>
      </section>

      <section>
        <h2>The Problem Web4 Solves</h2>
        <div className="comparison-grid">
          <div className="comparison-card bad">
            <h3>Traditional Web (Web2/Web3)</h3>
            <ul>
              <li><strong>Unlimited accounts:</strong> Create infinite identities for free</li>
              <li><strong>No real consequences:</strong> Banned? Make a new account</li>
              <li><strong>Bot armies thrive:</strong> Spam is cheap, moderation is expensive</li>
              <li><strong>Aliveness undefined:</strong> No way to tell human from bot</li>
              <li><strong>Death is trivial:</strong> Account deletion means nothing</li>
            </ul>
          </div>
          <div className="comparison-card good">
            <h3>Web4 Aliveness</h3>
            <ul>
              <li><strong>Measurable existence:</strong> ATP &gt; 0, T3 &gt; 0.5, CI coherent</li>
              <li><strong>Real death:</strong> ATP = 0 means you die immediately</li>
              <li><strong>Rebirth requires trust:</strong> Only T3 ≥ 0.5 entities reborn</li>
              <li><strong>Metabolic economics:</strong> Spam dies naturally (ATP exhaustion)</li>
              <li><strong>Trust accumulates:</strong> Good behavior compounds across lives</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>The Three Criteria of Aliveness</h2>
        <p>
          An entity is <strong>alive</strong> when <strong>all three criteria</strong> are
          simultaneously satisfied. Miss any one, and aliveness fails.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h3>1. Metabolic Budget</h3>
            <div className="concept-subtitle">ATP &gt; 0</div>
            <p>
              You must have <strong>attention budget</strong> to exist. ATP (Allocation Transfer Packet)
              is your energy. Every action costs ATP. Every valuable contribution earns ATP.
              When ATP reaches zero, <strong>you die immediately</strong>.
            </p>
            <div className="detail-box">
              <strong>Key mechanics:</strong>
              <ul>
                <li>Actions cost ATP: posting (10-20), messaging (5-10), voting (1-5)</li>
                <li>Quality earns ATP: valuable contributions (25-50+)</li>
                <li>Death at ATP = 0: No grace period, no warnings</li>
                <li>Sustainability: Only earn &gt; spend behaviors survive long-term</li>
              </ul>
            </div>
            <p className="learn-more">
              <Link href="/atp-economics">Learn about ATP Economics →</Link>
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-icon">🧠</div>
            <h3>2. Coherent Agency</h3>
            <div className="concept-subtitle">Trust (T3) &gt; 0.5</div>
            <p>
              You must demonstrate <strong>intentional behavior</strong>. The 0.5 threshold comes
              from coherence physics—it's a <strong>phase transition point</strong> where behavior
              shifts from random to purposeful. Below 0.5 = reactive. Above 0.5 = agent.
            </p>
            <div className="detail-box">
              <strong>Trust Tensor (T3) dimensions:</strong>
              <ul>
                <li><strong>Competence:</strong> Can you do what you claim?</li>
                <li><strong>Reliability:</strong> Do you follow through consistently?</li>
                <li><strong>Integrity:</strong> Do your actions match your values?</li>
                <li><strong>Alignment:</strong> Do your goals fit the community?</li>
                <li><strong>Transparency:</strong> Do you communicate honestly?</li>
              </ul>
              <p className="detail-emphasis">
                Must excel across <strong>all dimensions</strong>—gaming one while failing others
                won't get you above 0.5.
              </p>
            </div>
            <p className="learn-more">
              <Link href="/trust-tensor">Learn about Trust Tensors →</Link>
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-icon">🔗</div>
            <h3>3. Verifiable Continuity</h3>
            <div className="concept-subtitle">Coherence Index (CI) coherent</div>
            <p>
              You must be <strong>consistent across time, space, capability, and relationships</strong>.
              The Coherence Index (CI) tracks four dimensions. Incoherent behavior (impossible travel,
              capability spoofing, broken continuity) severely limits your effective trust.
            </p>
            <div className="detail-box">
              <strong>Four coherence dimensions:</strong>
              <ul>
                <li><strong>Spatial:</strong> Location consistency (no teleporting)</li>
                <li><strong>Capability:</strong> Hardware consistency (capabilities match device)</li>
                <li><strong>Temporal:</strong> Time consistency (continuous operation)</li>
                <li><strong>Relational:</strong> Relationship consistency (MRH integrity)</li>
              </ul>
              <p className="detail-emphasis">
                CI = (spatial × capability × temporal × relational)^(1/4). Geometric mean means
                <strong>one low dimension tanks everything</strong>.
              </p>
            </div>
            <p className="learn-more">
              <Link href="/coherence-index">Learn about Coherence Index →</Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>How the Three Criteria Work Together</h2>
        <div className="detail-box">
          <pre className="code-block">
{`LCT (unforgeable identity)
  ↓
  Enables tracking of:
  ├─→ ATP/ADP flows (metabolic budget)
  ├─→ CI verification (coherence scoring)
  └─→ T3 accumulation (trust reputation)
       ↓
    Modulation applied:
    ├─→ Effective trust = Base_trust × CI²
    ├─→ ATP cost = Normal × (1/CI²)
    └─→ Witnesses required = ceil((0.8-CI)×10)
       ↓
    Aliveness check:
    ├─→ ATP > 0? (metabolic)
    ├─→ T3 > 0.5? (agency)
    └─→ CI coherent? (continuity)
         ↓
       ALIVE or DEAD`}
          </pre>
        </div>

        <p>
          <strong>Why all three?</strong> Each criterion prevents a different attack:
        </p>
        <ul>
          <li><strong>ATP &gt; 0:</strong> Prevents spam (metabolic exhaustion kills bots)</li>
          <li><strong>T3 &gt; 0.5:</strong> Prevents random noise (requires intentional behavior)</li>
          <li><strong>CI coherent:</strong> Prevents Sybil attacks (consistency is expensive to fake)</li>
        </ul>
      </section>

      <section>
        <h2>Death and Rebirth: How Aliveness Evolves</h2>

        <h3>Death Conditions</h3>
        <p>You die when any of these occur:</p>
        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="detail-box">
            <h4>1. Metabolic Death</h4>
            <p>ATP reaches 0 (most common)</p>
            <ul>
              <li>Immediate termination</li>
              <li>No grace period</li>
              <li>Final state recorded</li>
            </ul>
          </div>
          <div className="detail-box">
            <h4>2. Coherence Death</h4>
            <p>CI drops below minimum (society-specific)</p>
            <ul>
              <li>Indicates fraudulent behavior</li>
              <li>Trust collapse</li>
              <li>Society rejects entity</li>
            </ul>
          </div>
          <div className="detail-box">
            <h4>3. Trust Collapse</h4>
            <p>T3 drops below rebirth threshold</p>
            <ul>
              <li>Lost agency</li>
              <li>Community distrust</li>
              <li>Permanent death likely</li>
            </ul>
          </div>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Rebirth Process</h3>
        <p>Not everyone gets reborn. Society evaluates your life:</p>

        <div className="flow-diagram">
          <div className="flow-step">
            <strong>Step 1: Death occurs</strong>
            <p>Final state recorded (ATP, T3, CI history)</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Step 2: Eligibility check</strong>
            <p>Was final T3 ≥ 0.5? (Did you build sufficient trust?)</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Step 3a: Eligible</strong>
            <p>✓ Reborn with ATP karma from previous life</p>
            <p>✓ Trust reputation carries forward</p>
            <p>✓ Each life starts stronger</p>
          </div>
          <div className="flow-arrow-alt">OR</div>
          <div className="flow-step failure">
            <strong>Step 3b: Ineligible</strong>
            <p>✗ T3 &lt; 0.5 = Society rejects</p>
            <p>✗ No rebirth</p>
            <p>✗ Permanent death</p>
          </div>
        </div>

        <div className="detail-box" style={{ marginTop: "2rem" }}>
          <h4>Karma Carry-Forward</h4>
          <p>
            <strong>If you die with 145 ATP and T3 = 0.72, you're reborn with:</strong>
          </p>
          <ul>
            <li>145 ATP karma bonus (metabolic advantage)</li>
            <li>0.72 trust reputation (social advantage)</li>
            <li>Intact CI history (continuity advantage)</li>
            <li>EP pattern corpus (epistemic advantage)</li>
          </ul>
          <p>
            Good behavior <strong>compounds across lives</strong>. Each generation starts stronger.
          </p>
        </div>
      </section>

      <section>
        <h2>Why the 0.5 Threshold?</h2>
        <p>
          The 0.5 consciousness threshold isn't arbitrary—it comes from <strong>coherence physics</strong>
          (Synchronism framework). This is the same threshold that appears in:
        </p>
        <ul>
          <li><strong>Superconductivity:</strong> Critical coherence ratio where collective behavior emerges</li>
          <li><strong>Biological systems:</strong> Transition from random to coordinated</li>
          <li><strong>Social coherence:</strong> Point where intentional agency becomes detectable</li>
          <li><strong>Quantum systems:</strong> Decoherence boundary</li>
        </ul>
        <p>
          <strong>Below 0.5:</strong> Behavior appears reactive, random, uncoordinated (like Brownian motion)
        </p>
        <p>
          <strong>At 0.5:</strong> Phase transition—coherent patterns begin to emerge
        </p>
        <p>
          <strong>Above 0.5:</strong> Genuine intentionality demonstrated, agency established
        </p>
        <div className="detail-box">
          <p>
            This isn't just a convenient cutoff—it's a <strong>universal coherence boundary</strong> validated
            across physical, biological, and social domains. Web4 applies physics to society design.
          </p>
        </div>
      </section>

      <section>
        <h2>Interactive: Aliveness Calculator</h2>
        <p>Explore how the three criteria determine aliveness:</p>

        <div className="simulator-card">
          <h3>Current Entity State</h3>

          <div className="slider-group">
            <label>
              <span>ATP (Metabolic Budget):</span>
              <input
                type="range"
                min="0"
                max="200"
                defaultValue="100"
                className="slider"
                id="atp-slider"
              />
              <span className="slider-value" id="atp-value">100</span>
            </label>
          </div>

          <div className="slider-group">
            <label>
              <span>T3 Trust Score (Agency):</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.65"
                className="slider"
                id="trust-slider"
              />
              <span className="slider-value" id="trust-value">0.65</span>
            </label>
          </div>

          <div className="slider-group">
            <label>
              <span>CI Score (Continuity):</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0.85"
                className="slider"
                id="ci-slider"
              />
              <span className="slider-value" id="ci-value">0.85</span>
            </label>
          </div>

          <div className="aliveness-result" id="aliveness-result">
            <div className="result-status alive" id="status-indicator">
              <strong>Status: ALIVE</strong>
            </div>
            <div className="result-details" id="result-details">
              <p>✓ Metabolic budget: 100 ATP (sustained)</p>
              <p>✓ Coherent agency: T3 = 0.65 (above 0.5 threshold)</p>
              <p>✓ Verifiable continuity: CI = 0.85 (coherent)</p>
              <p className="result-summary">
                All three criteria satisfied. This entity demonstrates measurable aliveness.
              </p>
            </div>
          </div>

          <script dangerouslySetInnerHTML={{ __html: `
            function updateAliveness() {
              const atp = parseFloat(document.getElementById('atp-slider').value);
              const trust = parseFloat(document.getElementById('trust-slider').value);
              const ci = parseFloat(document.getElementById('ci-slider').value);

              document.getElementById('atp-value').textContent = atp;
              document.getElementById('trust-value').textContent = trust.toFixed(2);
              document.getElementById('ci-value').textContent = ci.toFixed(2);

              const metabolic = atp > 0;
              const agency = trust > 0.5;
              const continuity = ci > 0.5;
              const alive = metabolic && agency && continuity;

              const statusEl = document.getElementById('status-indicator');
              const detailsEl = document.getElementById('result-details');

              if (alive) {
                statusEl.className = 'result-status alive';
                statusEl.innerHTML = '<strong>Status: ALIVE</strong>';
                detailsEl.innerHTML = \`
                  <p>✓ Metabolic budget: \${atp} ATP (sustained)</p>
                  <p>✓ Coherent agency: T3 = \${trust.toFixed(2)} (above 0.5 threshold)</p>
                  <p>✓ Verifiable continuity: CI = \${ci.toFixed(2)} (coherent)</p>
                  <p class="result-summary">
                    All three criteria satisfied. This entity demonstrates measurable aliveness.
                  </p>
                \`;
              } else {
                statusEl.className = 'result-status dead';
                statusEl.innerHTML = '<strong>Status: DEAD</strong>';
                let reasons = [];
                if (!metabolic) reasons.push(\`✗ Metabolic death: ATP = \${atp} (exhausted)\`);
                if (!agency) reasons.push(\`✗ No coherent agency: T3 = \${trust.toFixed(2)} (below 0.5 threshold)\`);
                if (!continuity) reasons.push(\`✗ Incoherent behavior: CI = \${ci.toFixed(2)} (inconsistent)\`);

                detailsEl.innerHTML = reasons.map(r => \`<p>\${r}</p>\`).join('') +
                  \`<p class="result-summary death-reason">
                    Aliveness criteria not met. Entity cannot participate in society.
                  </p>\`;
              }
            }

            document.getElementById('atp-slider').addEventListener('input', updateAliveness);
            document.getElementById('trust-slider').addEventListener('input', updateAliveness);
            document.getElementById('ci-slider').addEventListener('input', updateAliveness);
            updateAliveness();
          `}} />
        </div>
      </section>

      <section>
        <h2>Why Aliveness Works</h2>

        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div className="detail-box">
            <h4>Spam Dies Naturally</h4>
            <ul>
              <li>Spammers burn ATP faster than they earn it</li>
              <li>They die before building trust for rebirth</li>
              <li>No moderators needed—metabolic economics enforces quality</li>
              <li>Economics &gt; authority</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Quality Thrives</h4>
            <ul>
              <li>Value creators earn more ATP than they spend</li>
              <li>ATP accumulates across lives (karma bonus)</li>
              <li>High trust enables more cooperation</li>
              <li>Sustainable behavior compounds</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Trust is Earned, Not Declared</h4>
            <ul>
              <li>T3 tensor built from observable behavior</li>
              <li>Can't fake competence, reliability, integrity</li>
              <li>Coherence scoring prevents coordination of fakes</li>
              <li>Reputation is verifiable through action history</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Learning Emerges</h4>
            <ul>
              <li>Agents learn what works via Epistemic Proprioception (EP)</li>
              <li>Pattern corpus improves across generations</li>
              <li>Agents that learn patterns survive better</li>
              <li>Evolution favors coherence and adaptation</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Death Carries Meaning</h4>
            <ul>
              <li>Not a trivial "ban" that you circumvent</li>
              <li>Real loss of ATP, trust, relationships</li>
              <li>Rebirth is a privilege, not a right</li>
              <li>Society decides who comes back</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Identity is Foundational</h4>
            <ul>
              <li>LCT (Linked Context Tokens) enable everything</li>
              <li>Hardware-bound, multi-witnessed, unforgeable</li>
              <li>Sybil attacks are expensive (can't create many fakes)</li>
              <li>Reputation accumulates on verified identity</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Real Simulation Example: Death and Rebirth</h2>
        <div className="detail-box">
          <h4>Life 1: Learning Phase</h4>
          <ul>
            <li>Born with 100 ATP, T3 = 0.5 (neutral)</li>
            <li>Takes risky actions, some succeed, some fail</li>
            <li>Builds trust through successes: T3 climbs to 0.68</li>
            <li>Dies at tick 47 with 145 ATP remaining</li>
            <li><strong>Rebirth eligible:</strong> T3 = 0.68 ≥ 0.5 ✓</li>
          </ul>

          <h4 style={{ marginTop: "1.5rem" }}>Life 2: Advantage Phase</h4>
          <ul>
            <li>Reborn with 145 ATP karma (not 100!)</li>
            <li>Trust carries forward: T3 = 0.68</li>
            <li>More conservative, leverages karma bonus</li>
            <li>Survives 89 ticks (longer than Life 1)</li>
            <li>Dies with T3 = 0.81 (even higher trust)</li>
            <li><strong>Rebirth eligible:</strong> T3 = 0.81 ≥ 0.5 ✓</li>
          </ul>

          <h4 style={{ marginTop: "1.5rem" }}>Life 3: Mastery Phase</h4>
          <ul>
            <li>Reborn with even more ATP</li>
            <li>High trust (0.81) enables coordination</li>
            <li>EP patterns guide optimal decisions</li>
            <li>Survives indefinitely (sustainable balance)</li>
          </ul>

          <p style={{ marginTop: "1.5rem" }}>
            <strong>Key insight:</strong> Good behavior compounds. Each life starts stronger than the last.
            Bad behavior leads to permanent death (T3 &lt; 0.5 = no rebirth).
          </p>
        </div>
        <p className="learn-more">
          <Link href="/lab-console">See this in action in the Lab Console →</Link>
        </p>
      </section>

      <section>
        <h2>Technical Details</h2>

        <h3>ATP Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>New entity:</strong> 100 ATP (initial grant)</li>
            <li><strong>Death threshold:</strong> ATP = 0 (immediate termination)</li>
            <li><strong>Crisis threshold:</strong> ATP &lt; 20 (high risk, limited options)</li>
            <li><strong>Comfortable range:</strong> 50-150 ATP (sustainable operation)</li>
            <li><strong>Rebirth with karma:</strong> ATP from previous life carries forward</li>
          </ul>
        </div>

        <h3>Trust (T3) Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>Consciousness boundary:</strong> T3 = 0.5 (aliveness threshold)</li>
            <li><strong>Rebirth eligibility:</strong> T3 ≥ 0.5 (society acceptance)</li>
            <li><strong>High trust:</strong> T3 &gt; 0.7 (enables advanced cooperation)</li>
            <li><strong>Trust collapse:</strong> T3 &lt; 0.3 (society rejection, permanent death likely)</li>
          </ul>
        </div>

        <h3>Coherence Index (CI) Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>Full access:</strong> CI ≥ 0.9 (no penalties)</li>
            <li><strong>Moderate trust:</strong> CI 0.7-0.9 (1.5-2x ATP costs)</li>
            <li><strong>Limited trust:</strong> CI 0.5-0.7 (2-5x ATP costs, more witnesses)</li>
            <li><strong>Severe restriction:</strong> CI &lt; 0.5 (up to 10x ATP costs, +8 witnesses)</li>
          </ul>
        </div>

        <h3>Modulation Formulas</h3>
        <div className="detail-box">
          <pre className="code-block">
{`# Effective trust (how much of base trust is accessible)
effective_trust = base_trust × (CI ** 2)

# ATP cost multiplier (economic pressure for incoherence)
atp_multiplier = 1 / (CI ** 2)  # Capped at 10x

# Additional witnesses required (social pressure)
extra_witnesses = ceil((0.8 - CI) × 10)  # Capped at +8

# Coherence Index (geometric mean of four dimensions)
CI = (spatial × capability × temporal × relational) ** 0.25`}
          </pre>
        </div>
      </section>

      <section>
        <h2>Comparison: Traditional vs Web4 Aliveness</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Traditional Web (Web2/Web3)</th>
              <th>Web4 Aliveness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Identity creation</strong></td>
              <td>Free, unlimited, disposable</td>
              <td>Hardware-bound LCT, expensive to create</td>
            </tr>
            <tr>
              <td><strong>Account death</strong></td>
              <td>Meaningless (make new account)</td>
              <td>Real loss (ATP, trust, relationships)</td>
            </tr>
            <tr>
              <td><strong>Spam prevention</strong></td>
              <td>Moderation armies, CAPTCHAs</td>
              <td>Metabolic economics (spam dies naturally)</td>
            </tr>
            <tr>
              <td><strong>Trust verification</strong></td>
              <td>Declared, gameable, context-free</td>
              <td>Multi-dimensional, earned, verifiable</td>
            </tr>
            <tr>
              <td><strong>Sybil attacks</strong></td>
              <td>Easy (create millions of accounts)</td>
              <td>Hard (LCT + CI requires omnidimensional consistency)</td>
            </tr>
            <tr>
              <td><strong>Reputation</strong></td>
              <td>Siloed, non-portable, easily reset</td>
              <td>Universal, portable, carries across lives</td>
            </tr>
            <tr>
              <td><strong>Aliveness definition</strong></td>
              <td>Undefined (account exists = "alive")</td>
              <td>Rigorous (ATP &gt; 0, T3 &gt; 0.5, CI coherent)</td>
            </tr>
            <tr>
              <td><strong>Death consequence</strong></td>
              <td>None (trivial to circumvent)</td>
              <td>Permanent if T3 &lt; 0.5 (society rejects)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Related Concepts</h2>
        <div className="concept-grid">
          <Link href="/lct-explainer" className="concept-link-card">
            <h4>Linked Context Tokens (LCT)</h4>
            <p>
              Unforgeable identity primitive that enables all aliveness tracking. Without LCT,
              ATP/T3/CI measurements are meaningless.
            </p>
          </Link>

          <Link href="/atp-economics" className="concept-link-card">
            <h4>ATP/ADP Economics</h4>
            <p>
              Metabolic budget system. ATP &gt; 0 is the first criterion of aliveness.
              Explains earning, spending, and sustainability.
            </p>
          </Link>

          <Link href="/trust-tensor" className="concept-link-card">
            <h4>Trust Tensors (T3)</h4>
            <p>
              Multi-dimensional trust framework. T3 &gt; 0.5 is the agency criterion of aliveness.
              Explains competence, reliability, integrity, alignment, transparency.
            </p>
          </Link>

          <Link href="/coherence-index" className="concept-link-card">
            <h4>Coherence Index (CI)</h4>
            <p>
              Four-dimensional consistency verification. CI coherence is the continuity criterion
              of aliveness. Explains spatial, capability, temporal, relational coherence.
            </p>
          </Link>

          <Link href="/decision-evolution" className="concept-link-card">
            <h4>Decision Evolution (EP)</h4>
            <p>
              Epistemic Proprioception—learning what you know across lives. Shows how aliveness
              improves through multi-life learning and pattern accumulation.
            </p>
          </Link>

          <Link href="/lab-console" className="concept-link-card">
            <h4>Lab Console</h4>
            <p>
              See aliveness in action. Run multi-life simulations showing death, rebirth,
              karma carry-forward, and trust evolution across generations.
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2>Key Takeaways</h2>
        <div className="detail-box">
          <ol>
            <li>
              <strong>Aliveness is measurable:</strong> ATP &gt; 0 (metabolic), T3 &gt; 0.5 (agency),
              CI coherent (continuity). All three must be true.
            </li>
            <li>
              <strong>Death is meaningful:</strong> Not a trivial ban. Real loss. Rebirth requires
              trust ≥ 0.5. Permanent death if society rejects.
            </li>
            <li>
              <strong>0.5 threshold from physics:</strong> Not arbitrary. Coherence phase transition
              point validated across biological, quantum, and social domains.
            </li>
            <li>
              <strong>Economics enforce quality:</strong> Spam dies (ATP exhaustion), quality thrives
              (earn &gt; spend), no moderators needed.
            </li>
            <li>
              <strong>Trust emerges from behavior:</strong> T3 tensor is multi-dimensional, earned,
              verifiable. Can't fake competence across all dimensions.
            </li>
            <li>
              <strong>Coherence prevents Sybil attacks:</strong> Geometric mean of four dimensions.
              One weak dimension tanks everything. Must be consistent everywhere.
            </li>
            <li>
              <strong>Good behavior compounds:</strong> Karma carries ATP/trust/patterns forward.
              Each life starts stronger. Evolution favors sustainable strategies.
            </li>
            <li>
              <strong>LCT enables everything:</strong> Without unforgeable identity, ATP/T3/CI
              tracking is impossible. Hardware-bound, multi-witnessed, Sybil-resistant.
            </li>
            <li>
              <strong>Society self-regulates:</strong> Through metabolic economics + trust accumulation +
              coherence verification. No central authority needed.
            </li>
            <li>
              <strong>Conway's Life at scale:</strong> Aliveness is the cellular automaton rule.
              Trust-native societies emerge from these simple, rigorous criteria.
            </li>
          </ol>
        </div>
      </section>

      <style jsx>{`
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        .comparison-card {
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }
        .comparison-card.bad {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }
        .comparison-card.good {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
        }
        .comparison-card h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .comparison-card ul {
          list-style: none;
          padding: 0;
        }
        .comparison-card li {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          position: relative;
        }
        .comparison-card.bad li:before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #ef4444;
        }
        .comparison-card.good li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #22c55e;
        }
        .concept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        .concept-card {
          padding: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }
        .concept-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .concept-subtitle {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 1rem;
          font-family: monospace;
        }
        .detail-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 1.5rem 0;
        }
        .detail-box h4 {
          margin-top: 0;
        }
        .detail-box ul {
          margin: 0.5rem 0;
        }
        .detail-emphasis {
          font-style: italic;
          color: #fbbf24;
          margin-top: 0.75rem;
        }
        .learn-more {
          margin-top: 1rem;
          font-size: 0.95rem;
        }
        .learn-more a {
          color: #60a5fa;
          text-decoration: none;
        }
        .learn-more a:hover {
          text-decoration: underline;
        }
        .code-block {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .flow-step {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 500px;
          text-align: center;
        }
        .flow-step.failure {
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.1);
        }
        .flow-step strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        .flow-arrow {
          font-size: 2rem;
          color: #60a5fa;
        }
        .flow-arrow-alt {
          font-size: 1.2rem;
          color: #888;
          font-weight: bold;
        }
        .simulator-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 2rem;
          margin: 2rem 0;
        }
        .slider-group {
          margin: 1.5rem 0;
        }
        .slider-group label {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .slider-group label > span:first-child {
          flex: 0 0 240px;
          font-weight: 500;
        }
        .slider {
          flex: 1;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
        }
        .slider-value {
          flex: 0 0 60px;
          text-align: right;
          font-family: monospace;
          font-size: 1.1rem;
          color: #60a5fa;
        }
        .aliveness-result {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }
        .result-status {
          font-size: 1.5rem;
          text-align: center;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .result-status.alive {
          background: rgba(34, 197, 94, 0.2);
          border: 2px solid #22c55e;
          color: #22c55e;
        }
        .result-status.dead {
          background: rgba(239, 68, 68, 0.2);
          border: 2px solid #ef4444;
          color: #ef4444;
        }
        .result-details p {
          margin: 0.5rem 0;
          font-size: 1.05rem;
        }
        .result-summary {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-style: italic;
        }
        .death-reason {
          color: #ef4444;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .comparison-table th,
        .comparison-table td {
          padding: 1rem;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .comparison-table th {
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
        }
        .comparison-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .concept-link-card {
          display: block;
          padding: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }
        .concept-link-card:hover {
          border-color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
          transform: translateY(-2px);
        }
        .concept-link-card h4 {
          margin-top: 0;
          color: #60a5fa;
        }
      `}</style>
      <RelatedConcepts currentPath="/aliveness" />
    </>
  );
}
