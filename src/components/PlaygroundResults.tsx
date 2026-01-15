"use client";

/**
 * PlaygroundResults - Visualization of simulation results
 *
 * Displays life trajectories, metrics, and insights from playground simulations.
 * Shows ATP/trust evolution, termination reasons, and cross-life patterns.
 *
 * Session #12: Interactive Parameter Playground
 */

export interface ActionOutcome {
  tick: number;
  action_type: string;
  atp_cost: number;
  atp_reward: number;
  trust_change: number;
  success: boolean;
  atp_after: number;
  trust_after: number;
}

export interface LifeSummary {
  life_id: string;
  start_tick: number;
  end_tick: number;
  initial_atp: number;
  initial_trust: number;
  final_atp: number;
  final_trust: number;
  termination_reason: string;
  actions: ActionOutcome[];
  atp_history: number[];
  trust_history: number[];
}

export interface PlaygroundResult {
  config: any;
  lives: LifeSummary[];
  total_ticks: number;
  insights: string[];
}

interface PlaygroundResultsProps {
  result: PlaygroundResult | null;
}

export function PlaygroundResults({ result }: PlaygroundResultsProps) {
  if (!result) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#9ca3af",
          backgroundColor: "#1f2937",
          borderRadius: "8px",
        }}
      >
        <p>Configure parameters and run a simulation to see results here.</p>
      </div>
    );
  }

  // Calculate summary statistics
  const totalLives = result.lives.length;
  const completedLives = result.lives.filter((l) => l.termination_reason === "completed").length;
  const atpDeaths = result.lives.filter((l) => l.termination_reason === "atp_exhausted").length;
  const trustDeaths = result.lives.filter((l) => l.termination_reason === "trust_lost").length;
  const avgFinalTrust = result.lives.reduce((sum, l) => sum + l.final_trust, 0) / totalLives;
  const avgFinalATP = result.lives.reduce((sum, l) => sum + l.final_atp, 0) / totalLives;

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#1f2937", borderRadius: "8px" }}>
      <h3 style={{ marginBottom: "1rem", color: "#f3f4f6" }}>Simulation Results</h3>

      {/* Summary Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Total Lives</div>
          <div style={{ fontSize: "1.5rem", color: "#38bdf8", fontWeight: 600 }}>
            {totalLives}
          </div>
        </div>
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Completed</div>
          <div style={{ fontSize: "1.5rem", color: "#10b981", fontWeight: 600 }}>
            {completedLives}
          </div>
        </div>
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>ATP Deaths</div>
          <div style={{ fontSize: "1.5rem", color: "#f59e0b", fontWeight: 600 }}>
            {atpDeaths}
          </div>
        </div>
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Trust Deaths</div>
          <div style={{ fontSize: "1.5rem", color: "#ef4444", fontWeight: 600 }}>
            {trustDeaths}
          </div>
        </div>
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Avg Trust</div>
          <div style={{ fontSize: "1.5rem", color: "#38bdf8", fontWeight: 600 }}>
            {avgFinalTrust.toFixed(2)}
          </div>
        </div>
        <div style={{ padding: "0.75rem", backgroundColor: "#111827", borderRadius: "6px" }}>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Avg ATP</div>
          <div style={{ fontSize: "1.5rem", color: "#38bdf8", fontWeight: 600 }}>
            {avgFinalATP.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Insights */}
      {result.insights.length > 0 && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            backgroundColor: "#111827",
            borderRadius: "6px",
          }}
        >
          <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
            INSIGHTS
          </h4>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#d1d5db" }}>
            {result.insights.map((insight, i) => (
              <li key={i} style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Life Trajectories */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "0.875rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
          LIFE TRAJECTORIES
        </h4>
        {result.lives.map((life, idx) => (
          <LifeTrajectory key={life.life_id} life={life} index={idx} />
        ))}
      </div>
    </div>
  );
}

function LifeTrajectory({ life, index }: { life: LifeSummary; index: number }) {
  const maxATP = Math.max(...life.atp_history, 100);
  const terminationColor =
    life.termination_reason === "completed"
      ? "#10b981"
      : life.termination_reason === "atp_exhausted"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#111827",
        borderRadius: "6px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h5 style={{ fontSize: "0.875rem", color: "#f3f4f6", fontWeight: 600 }}>
          Life {index + 1}
        </h5>
        <span
          style={{
            fontSize: "0.75rem",
            color: terminationColor,
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          {life.termination_reason.replace("_", " ")}
        </span>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.75rem", fontSize: "0.75rem" }}>
        <div>
          <span style={{ color: "#9ca3af" }}>ATP: </span>
          <span style={{ color: "#d1d5db" }}>
            {life.initial_atp.toFixed(0)} → {life.final_atp.toFixed(0)}
          </span>
        </div>
        <div>
          <span style={{ color: "#9ca3af" }}>Trust: </span>
          <span style={{ color: "#d1d5db" }}>
            {life.initial_trust.toFixed(2)} → {life.final_trust.toFixed(2)}
          </span>
        </div>
        <div>
          <span style={{ color: "#9ca3af" }}>Ticks: </span>
          <span style={{ color: "#d1d5db" }}>{life.actions.length}</span>
        </div>
      </div>

      {/* Mini Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* ATP Chart */}
        <div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
            ATP Over Time
          </div>
          <svg width="100%" height="60" style={{ overflow: "visible" }}>
            <polyline
              points={life.atp_history
                .map(
                  (atp, i) =>
                    `${(i / (life.atp_history.length - 1)) * 100}%,${
                      60 - (atp / maxATP) * 60
                    }`
                )
                .join(" ")}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Zero line */}
            <line x1="0" y1="60" x2="100%" y2="60" stroke="#374151" strokeWidth="1" />
          </svg>
        </div>

        {/* Trust Chart */}
        <div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "0.25rem" }}>
            Trust Over Time
          </div>
          <svg width="100%" height="60" style={{ overflow: "visible" }}>
            <polyline
              points={life.trust_history
                .map((trust, i) => `${(i / (life.trust_history.length - 1)) * 100}%,${60 - trust * 60}`)
                .join(" ")}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />
            {/* Death threshold */}
            {life.termination_reason === "trust_lost" && (
              <line
                x1="0"
                y1={60 - 0.2 * 60}
                x2="100%"
                y2={60 - 0.2 * 60}
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="4"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Action Summary */}
      <div style={{ marginTop: "0.75rem", fontSize: "0.75rem" }}>
        <span style={{ color: "#9ca3af" }}>Actions: </span>
        {life.actions.slice(0, 5).map((action, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: "0.5rem",
              color: action.success ? "#10b981" : "#ef4444",
            }}
          >
            {action.action_type}
            {action.success ? "✓" : "✗"}
          </span>
        ))}
        {life.actions.length > 5 && (
          <span style={{ color: "#6b7280" }}>+{life.actions.length - 5} more</span>
        )}
      </div>
    </div>
  );
}
