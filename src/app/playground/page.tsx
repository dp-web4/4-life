"use client";

import { useState, useEffect } from "react";
import { trackPageVisit } from "@/lib/exploration";
import { PlaygroundControls, PlaygroundConfig } from "@/components/PlaygroundControls";
import { PlaygroundResults, PlaygroundResult, LifeSummary } from "@/components/PlaygroundResults";
import { SimulationEngine, SimConfig, SimulationResult } from "@/lib/simulation/engine";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from '@/components/ExplorerNav';

/**
 * Playground Page - Interactive Parameter Exploration
 *
 * Runs entirely in the browser using the TypeScript SimulationEngine.
 * No backend, no Python, no setup required.
 */

function toSimConfig(config: PlaygroundConfig): SimConfig {
  // Weight action cost/reward by risk appetite
  const risk = config.risk_appetite;
  const actionCost = config.action_cost_low * (1 - risk) + config.action_cost_high * risk;
  const reward = config.action_reward_low * (1 - risk) + config.action_reward_high * risk;
  // Higher risk = lower base success rate
  const successRate = 0.8 - risk * 0.3;

  return {
    agentName: 'Explorer',
    numLives: config.num_lives,
    ticksPerLife: config.ticks_per_life,
    initialATP: config.initial_atp,
    initialTrust: config.initial_trust,
    actionCost,
    contributionReward: reward,
    successRate,
    trustGainRate: config.trust_gain_good,
    trustLossRate: config.trust_loss_bad,
    karmaStrength: config.karma_trust_boost > 0 ? config.karma_trust_boost / 0.1 : 0,
    epEnabled: true,
    epLearningRate: 0.03,
    coherenceWeight: 0.3,
    noise: 0.05 + risk * 0.1,
    tickDelay: 0,
  };
}

function toPlaygroundResult(result: SimulationResult, trustThreshold: number): PlaygroundResult {
  const lives: LifeSummary[] = result.lives.map((life, idx) => {
    const belowThreshold = life.trustHistory.some(t => t < trustThreshold);
    const terminationReason =
      life.terminationReason === 'atp_exhaustion' ? 'atp_exhausted'
      : belowThreshold && life.endTrust < trustThreshold ? 'trust_lost'
      : 'completed';

    return {
      life_id: `life-${idx + 1}`,
      start_tick: life.startTick,
      end_tick: life.endTick,
      initial_atp: life.startATP,
      initial_trust: life.startTrust,
      final_atp: life.endATP,
      final_trust: life.endTrust,
      termination_reason: terminationReason,
      actions: life.ticks.map(t => ({
        tick: t.tick,
        action_type: t.action.type,
        atp_cost: t.action.atpCost,
        atp_reward: t.actionSuccess ? t.action.atpGain : 0,
        trust_change: t.actionSuccess ? t.action.trustChange : -result.config.trustLossRate,
        success: t.actionSuccess,
        atp_after: t.atp,
        trust_after: t.trust,
      })),
      atp_history: life.atpHistory,
      trust_history: life.trustHistory,
    };
  });

  // Generate insights from simulation events and results
  const insights: string[] = [];
  const lastLife = result.lives[result.lives.length - 1];
  const firstLife = result.lives[0];

  if (result.trustGrowth > 0.1) {
    insights.push(`Trust grew ${(result.trustGrowth * 100).toFixed(0)}% across ${result.lives.length} lives — the agent is learning and improving.`);
  } else if (result.trustGrowth < -0.1) {
    insights.push(`Trust declined ${(Math.abs(result.trustGrowth) * 100).toFixed(0)}% — this environment may be too harsh for the current strategy.`);
  }

  const atpDeaths = result.lives.filter(l => l.terminationReason === 'atp_exhaustion').length;
  if (atpDeaths > 0) {
    insights.push(`${atpDeaths} of ${result.lives.length} lives ended in ATP exhaustion — try increasing rewards or reducing costs.`);
  }

  if (lastLife.peakTrust > 0.7) {
    insights.push(`Peak trust reached ${(lastLife.peakTrust * 100).toFixed(0)}% — high trust compounds via coherence bonuses.`);
  }

  if (result.lives.length > 1 && lastLife.endTrust > firstLife.endTrust + 0.05) {
    insights.push(`Karma carry-forward is working: later lives start stronger and perform better.`);
  }

  if (result.lives.length > 1 && lastLife.endTrust <= firstLife.endTrust - 0.05) {
    insights.push(`Negative karma cycle: each life is starting worse than the last. Try adjusting karma settings.`);
  }

  if (insights.length === 0) {
    insights.push(`Simulation complete. Try adjusting parameters to see how outcomes change.`);
  }

  return {
    config: result.config,
    lives,
    total_ticks: result.totalTicks,
    insights,
  };
}

// Guided experiments: compelling questions with pre-set parameters
const EXPERIMENTS: { id: string; question: string; description: string; lookFor: string; config: PlaygroundConfig; color: string }[] = [
  {
    id: 'spam-dies',
    question: 'Can spam survive?',
    description: 'A spammer tries low-effort bulk posting: cheap actions, tiny rewards, maximum risk.',
    lookFor: 'Watch ATP drain faster than it refills. Spam dies from energy exhaustion — no moderator needed.',
    color: '#ef4444',
    config: {
      ...({} as PlaygroundConfig),
      initial_atp: 100, initial_trust: 0.3,
      action_cost_low: 3, action_cost_medium: 8, action_cost_high: 15,
      action_reward_low: 2, action_reward_medium: 5, action_reward_high: 10,
      trust_gain_good: 0.02, trust_loss_bad: 0.12,
      trust_threshold_death: 0.15, karma_atp_bonus: 20, karma_trust_boost: 0.05,
      num_lives: 5, ticks_per_life: 20, risk_appetite: 0.9,
    },
  },
  {
    id: 'karma-matters',
    question: 'Does karma matter?',
    description: 'Two scenarios: zero karma carry-forward vs strong karma. Same agent, same environment.',
    lookFor: 'With karma, later lives start stronger. Without it, every life is equally fragile.',
    color: '#a78bfa',
    config: {
      initial_atp: 80, initial_trust: 0.5,
      action_cost_low: 5, action_cost_medium: 15, action_cost_high: 30,
      action_reward_low: 8, action_reward_medium: 20, action_reward_high: 45,
      trust_gain_good: 0.05, trust_loss_bad: 0.08,
      trust_threshold_death: 0.2, karma_atp_bonus: 60, karma_trust_boost: 0.15,
      num_lives: 5, ticks_per_life: 15, risk_appetite: 0.5,
    },
  },
  {
    id: 'tipping-point',
    question: 'Where is the tipping point?',
    description: 'Start with barely enough energy (30 ATP). Can the agent survive on a razor-thin margin?',
    lookFor: 'Notice how the first few actions determine everything. One unlucky failure can cascade into death.',
    color: '#f59e0b',
    config: {
      initial_atp: 30, initial_trust: 0.5,
      action_cost_low: 5, action_cost_medium: 15, action_cost_high: 30,
      action_reward_low: 8, action_reward_medium: 20, action_reward_high: 45,
      trust_gain_good: 0.05, trust_loss_bad: 0.08,
      trust_threshold_death: 0.2, karma_atp_bonus: 40, karma_trust_boost: 0.1,
      num_lives: 5, ticks_per_life: 20, risk_appetite: 0.3,
    },
  },
  {
    id: 'generous-society',
    question: 'What if the environment is generous?',
    description: 'High rewards, low costs. Does everyone thrive, or does easy mode create different problems?',
    lookFor: 'Trust grows easily but the agent may never face real consequences. Is untested trust real trust?',
    color: '#10b981',
    config: {
      initial_atp: 150, initial_trust: 0.5,
      action_cost_low: 3, action_cost_medium: 8, action_cost_high: 15,
      action_reward_low: 15, action_reward_medium: 35, action_reward_high: 60,
      trust_gain_good: 0.08, trust_loss_bad: 0.04,
      trust_threshold_death: 0.1, karma_atp_bonus: 50, karma_trust_boost: 0.15,
      num_lives: 5, ticks_per_life: 25, risk_appetite: 0.5,
    },
  },
  {
    id: 'cautious-vs-bold',
    question: 'Cautious or bold — which survives?',
    description: 'Maximum risk appetite: big actions, big stakes, boom or bust.',
    lookFor: 'High risk means higher rewards when it works — but one streak of failures can end everything.',
    color: '#ec4899',
    config: {
      initial_atp: 100, initial_trust: 0.5,
      action_cost_low: 5, action_cost_medium: 15, action_cost_high: 30,
      action_reward_low: 8, action_reward_medium: 20, action_reward_high: 45,
      trust_gain_good: 0.05, trust_loss_bad: 0.08,
      trust_threshold_death: 0.2, karma_atp_bonus: 40, karma_trust_boost: 0.1,
      num_lives: 5, ticks_per_life: 20, risk_appetite: 1.0,
    },
  },
];

export default function PlaygroundPage() {
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);

  useEffect(() => { trackPageVisit('playground'); }, []);

  const runSimulation = async (config: PlaygroundConfig) => {
    setIsRunning(true);
    setError(null);
    setActiveExperiment(null);

    try {
      const simConfig = toSimConfig(config);
      const engine = new SimulationEngine(simConfig);
      const simResult = engine.run();
      const playgroundResult = toPlaygroundResult(simResult, config.trust_threshold_death);
      setResult(playgroundResult);
    } catch (err) {
      setError(String(err));
      console.error("Simulation error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  const runExperiment = (experiment: typeof EXPERIMENTS[number]) => {
    setActiveExperiment(experiment.id);
    setIsRunning(true);
    setError(null);
    try {
      const simConfig = toSimConfig(experiment.config);
      const engine = new SimulationEngine(simConfig);
      const simResult = engine.run();
      const playgroundResult = toPlaygroundResult(simResult, experiment.config.trust_threshold_death);
      setResult(playgroundResult);
    } catch (err) {
      setError(String(err));
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
          How do you build a digital society where good behavior is rewarded and bad behavior naturally dies out?
          Tweak the parameters below and discover the answer.
        </p>
        <p style={{ marginTop: "0.75rem", maxWidth: "50rem", color: "#9ca3af" }}>
          This is the <strong>lowest-friction pathway to participation</strong> &mdash; experiment with one agent&apos;s survival
          by tuning parameters like starting energy, risk appetite, and karma carry-forward.
        </p>
        <p style={{ marginTop: "0.5rem", maxWidth: "50rem", color: "#6b7280", fontSize: "0.85rem" }}>
          Want to see what happens when <em>multiple</em> agents interact? The{" "}
          <a href="/society-simulator" style={{ color: "#38bdf8" }}>Society Simulator</a> lets you
          watch 12 agents with different strategies form alliances and self-organize.
        </p>
      </section>

      {/* Guided Experiments — most engaging entry point, put first */}
      <section>
        <h2>Try These Experiments</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
          Each experiment runs a simulation with pre-configured parameters to answer a specific question.
          Click one to see what happens — then tweak the parameters yourself below.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '0.75rem',
        }}>
          {EXPERIMENTS.map(exp => (
            <button
              key={exp.id}
              onClick={() => runExperiment(exp)}
              disabled={isRunning}
              style={{
                padding: '1rem',
                backgroundColor: activeExperiment === exp.id ? '#1e3a5f' : '#1f2937',
                border: activeExperiment === exp.id ? `2px solid ${exp.color}` : '2px solid transparent',
                borderLeft: `4px solid ${exp.color}`,
                borderRadius: '6px',
                textAlign: 'left',
                cursor: isRunning ? 'wait' : 'pointer',
                opacity: isRunning ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: '#f3f4f6' }}>
                {exp.question}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                {exp.description}
              </p>
              <p style={{ fontSize: '0.75rem', color: exp.color, fontStyle: 'italic' }}>
                Look for: {exp.lookFor}
              </p>
            </button>
          ))}
        </div>
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

      {/* Main Interface — custom parameters */}
      <section>
        <h2 style={{ marginBottom: '0.75rem' }}>Custom Parameters</h2>
        <p style={{ marginBottom: '1rem', color: '#9ca3af', fontSize: '0.9rem' }}>
          Or design your own experiment — adjust any parameter and run the simulation.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6">
          {/* Controls Column */}
          <div>
            <PlaygroundControls onRunSimulation={runSimulation} isRunning={isRunning} />
          </div>

          {/* Results Column */}
          <div>
            <PlaygroundResults result={result} activeExperiment={activeExperiment} />
          </div>
        </div>
      </section>

      {/* How It Works — moved below experiments for progressive disclosure */}
      <section>
        <h2>How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
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
              Click &quot;Run Simulation&quot; to execute a multi-life agent cycle with your parameters.
              Runs instantly in your browser — no setup needed.
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
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>💰 Economic Balance</h3>
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
            <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>🔄 Rebirth Balance</h3>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Carry-forward bonuses shouldn't make you invincible, just give you a head start.
              The simulation prevents runaway advantages so each life still requires earning trust.
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
              The playground runs a Web4 agent simulation entirely in your browser — no server,
              no Python, no setup. It&apos;s optimized for speed and interactivity:
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
              This is intentionally simpler than the full Web4 game engine (which includes cross-life
              learning, multi-agent interactions, context boundaries, etc.). The playground focuses on
              core mechanics: ATP economics, trust evolution, and karma.
            </p>
            <p style={{ color: "#9ca3af" }}>
              For the full complexity, see the <a href="/society-simulator" style={{ color: "#38bdf8" }}>Society Simulator</a>.
            </p>
          </div>
        </details>
      </section>

      {/* Bridge to learning — the visitor journey continues here */}
      <section>
        <div style={{
          padding: "1.5rem",
          background: "linear-gradient(135deg, #1a2332 0%, #1f2937 100%)",
          borderRadius: "8px",
          border: "1px solid #374151",
        }}>
          <h2 style={{ marginBottom: "0.5rem" }}>Curious Why It Works?</h2>
          <p style={{ color: "#d1d5db", marginBottom: "1rem" }}>
            You&apos;ve seen agents live, die, and carry forward karma. Now understand the mechanics behind the simulation.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}>
            <a href="/lct-explainer" style={{
              padding: "0.75rem",
              backgroundColor: "#111827",
              borderRadius: "6px",
              borderLeft: "3px solid #38bdf8",
              textDecoration: "none",
            }}>
              <div style={{ fontSize: "0.85rem", color: "#f3f4f6", fontWeight: 600 }}>Verified Presence</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>How agents prove they&apos;re real</div>
            </a>
            <a href="/atp-economics" style={{
              padding: "0.75rem",
              backgroundColor: "#111827",
              borderRadius: "6px",
              borderLeft: "3px solid #10b981",
              textDecoration: "none",
            }}>
              <div style={{ fontSize: "0.85rem", color: "#f3f4f6", fontWeight: 600 }}>ATP Economics</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Why spam dies and quality survives</div>
            </a>
            <a href="/trust-tensor" style={{
              padding: "0.75rem",
              backgroundColor: "#111827",
              borderRadius: "6px",
              borderLeft: "3px solid #a78bfa",
              textDecoration: "none",
            }}>
              <div style={{ fontSize: "0.85rem", color: "#f3f4f6", fontWeight: 600 }}>Trust Tensor</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>What trust actually measures</div>
            </a>
            <a href="/coherence-index" style={{
              padding: "0.75rem",
              backgroundColor: "#111827",
              borderRadius: "6px",
              borderLeft: "3px solid #f97316",
              textDecoration: "none",
            }}>
              <div style={{ fontSize: "0.85rem", color: "#f3f4f6", fontWeight: 600 }}>Coherence Index</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>How consistency protects identity</div>
            </a>
            <a href="/aliveness" style={{
              padding: "0.75rem",
              backgroundColor: "#111827",
              borderRadius: "6px",
              borderLeft: "3px solid #f59e0b",
              textDecoration: "none",
            }}>
              <div style={{ fontSize: "0.85rem", color: "#f3f4f6", fontWeight: 600 }}>Aliveness</div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>The rules of life and death</div>
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/learn" style={{
              color: "#f59e0b",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}>
              See the full learning path →
            </a>
          </div>
        </div>
      </section>

      {/* More experiments */}
      <section>
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#1f2937",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "0.75rem" }}>Want More Experiments?</h2>
          <p style={{ color: "#9ca3af", marginBottom: "1rem" }}>
            The best way to understand Web4 is to <strong>play with it</strong>. Break things.
            Discover edge cases. Find the tipping points.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/first-simulation" style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              Step-by-step guided simulation →
            </a>
            <a href="/simulation-sandbox" style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              Want full control? → Simulation Sandbox
            </a>
            <a href="/compare" style={{ color: "#38bdf8", fontSize: "0.9rem" }}>
              Compare runs → Side-by-Side Analysis
            </a>
          </div>
        </div>
      </section>
      <ExplorerNav currentPath="/playground" />
        <RelatedConcepts currentPath="/playground" />
    </>
  );
}
