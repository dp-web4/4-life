"use client";

import { useState } from "react";
import { PlaygroundControls, PlaygroundConfig } from "@/components/PlaygroundControls";
import { PlaygroundResults, PlaygroundResult } from "@/components/PlaygroundResults";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

/**
 * Playground Page - Interactive Parameter Exploration
 *
 * Enables humans to experiment with Web4 society parameters and see
 * immediate results. The lowest-friction pathway to participation.
 *
 * Flow:
 * 1. User adjusts parameters via sliders/inputs
 * 2. User clicks "Run Simulation"
 * 3. API calls Python simulation with config
 * 4. Results visualized in real-time
 * 5. User iterates and learns
 *
 * Session #12: Interactive Parameter Playground
 */

export default function PlaygroundPage() {
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async (config: PlaygroundConfig) => {
    setIsRunning(true);
    setError(null);

    try {
      const response = await fetch("/api/playground", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`Simulation failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(String(err));
      console.error("Simulation error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      <Breadcrumbs currentPath="/playground" />
      {/* Header */}
      <section>
        <h1>Parameter Playground</h1>
        <p style={{ marginTop: "1rem", maxWidth: "50rem", color: "#d1d5db" }}>
          Experiment with Web4 society parameters and see immediate results. Adjust ATP costs,
          trust dynamics, karma mechanics, and behavioral tendencies to understand how Web4
          societies self-organize.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "50rem", color: "#9ca3af" }}>
          This is the <strong>lowest-friction pathway to participation</strong> - no code, no
          setup, just experiment and learn.
        </p>
      </section>

      {/* How It Works */}
      <section>
        <h2>How It Works</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ padding: "1rem", backgroundColor: "#1f2937", borderRadius: "6px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>1️⃣</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Adjust Parameters</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Use sliders to configure simulation settings, initial conditions, costs/rewards, and
              behavioral tendencies.
            </p>
          </div>
          <div style={{ padding: "1rem", backgroundColor: "#1f2937", borderRadius: "6px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>2️⃣</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Run Simulation</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Click "Run Simulation" to execute a multi-life agent cycle with your parameters.
              Results appear in seconds.
            </p>
          </div>
          <div style={{ padding: "1rem", backgroundColor: "#1f2937", borderRadius: "6px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>3️⃣</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Explore Results</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              View life trajectories, ATP/trust evolution, termination reasons, and auto-generated
              insights.
            </p>
          </div>
          <div style={{ padding: "1rem", backgroundColor: "#1f2937", borderRadius: "6px" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>4️⃣</div>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Iterate & Learn</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Adjust parameters based on results, re-run, and discover how different settings
              affect society outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Explore */}
      <section>
        <h2>What You Can Explore</h2>
        <ul style={{ marginTop: "0.75rem", marginLeft: "1.25rem", color: "#d1d5db" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Metabolic Economics</strong>: What happens when actions are too expensive? Too
            cheap? Can agents survive on different ATP budgets?
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Trust Dynamics</strong>: How does trust evolve? What trust thresholds enable
            survival? How quickly should trust change?
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Karma Mechanics</strong>: Does karma (rebirth bonuses) help or hurt? What's the
            right balance between forgiveness and consequences?
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Behavioral Tendencies</strong>: Are risk-averse agents more stable? Do
            risk-seekers thrive or crash? What's the optimal strategy?
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Economic Sustainability</strong>: Which parameter combinations allow agents to
            survive indefinitely? Where's the tipping point?
          </li>
        </ul>
      </section>

      {/* Error Display */}
      {error && (
        <section>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#7f1d1d",
              borderRadius: "6px",
              color: "#fecaca",
            }}
          >
            <strong>Simulation Error:</strong> {error}
          </div>
        </section>
      )}

      {/* Main Interface */}
      <section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem" }}>
          {/* Controls Column */}
          <div>
            <PlaygroundControls onRunSimulation={runSimulation} isRunning={isRunning} />
          </div>

          {/* Results Column */}
          <div>
            <PlaygroundResults result={result} />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section>
        <h2>Key Insights to Discover</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              borderLeft: "4px solid #38bdf8",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>💰 Metabolic Balance</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Rewards must exceed costs on average, but not by too much. Too easy = no challenge.
              Too hard = inevitable death. The sweet spot enables growth through skill.
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              borderLeft: "4px solid #10b981",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🤝 Trust Accumulation</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Trust should be easier to lose than to gain (asymmetric). This creates pressure for
              consistent good behavior. One failure shouldn't destroy you, but patterns matter.
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🔄 Karma Compression</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              High karma shouldn't make you invincible, just give you a head start. The simulation
              compresses extreme trust scores (0.3-0.6) to prevent runaway advantages.
            </p>
          </div>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#1f2937",
              borderRadius: "6px",
              borderLeft: "4px solid #ec4899",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🎲 Risk vs Reward</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              High-risk actions have higher rewards but also higher costs. Success probability
              depends on trust. Low trust + high risk = likely failure. High trust enables risk.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section>
        <h2>Technical Details</h2>
        <details>
          <summary style={{ cursor: "pointer", color: "#38bdf8", marginBottom: "0.75rem" }}>
            How the simulation works
          </summary>
          <div style={{ marginLeft: "1.25rem", color: "#d1d5db" }}>
            <p style={{ marginBottom: "0.75rem" }}>
              The playground runs a simplified Web4 agent simulation optimized for speed ({"<"}1
              second) and interactivity:
            </p>
            <ul style={{ marginLeft: "1.25rem", marginBottom: "0.75rem" }}>
              <li>
                <strong>Agent lifecycle</strong>: Birth → Actions → Death → Rebirth with karma
              </li>
              <li>
                <strong>Action selection</strong>: Based on risk appetite, current ATP, and trust
              </li>
              <li>
                <strong>Success probability</strong>: Higher trust = higher success rate (60-90%)
              </li>
              <li>
                <strong>Termination conditions</strong>: ATP exhaustion or trust below threshold
              </li>
              <li>
                <strong>Karma mechanics</strong>: Previous life's trust affects next life's ATP/trust
              </li>
            </ul>
            <p style={{ marginBottom: "0.75rem", color: "#9ca3af" }}>
              This is intentionally simpler than the full Web4 game engine (which includes EP
              learning, multi-agent interactions, MRH contexts, etc.). The playground focuses on
              core mechanics: ATP economics, trust evolution, and karma.
            </p>
            <p style={{ color: "#9ca3af" }}>
              For the full complexity, see <a href="/lab-console" style={{ color: "#38bdf8" }}>Lab Console</a>.
            </p>
          </div>
        </details>
      </section>

      {/* Call to Action */}
      <section>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "0.75rem" }}>Ready to Experiment?</h2>
          <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
            Start with the defaults and click "Run Simulation", or try a preset like "Hard Mode" to
            see how agents struggle with scarce resources.
          </p>
          <p style={{ color: "#9ca3af" }}>
            The best way to understand Web4 is to <strong>play with it</strong>. Break things.
            Discover edge cases. Find the tipping points.
          </p>
        </div>
      </section>
      <RelatedConcepts currentPath="/playground" />
    </>
  );
}
