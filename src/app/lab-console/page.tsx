"use client";

import { useEffect, useState } from "react";
import { NarrativePanel } from "@/components/NarrativePanel";
import { ReasoningTimeline } from "@/components/ReasoningTimeline";
import DecisionEvolution from "@/components/DecisionEvolution";

// v0 Lab Console for 4-Life
// --------------------------
//
// This page visualizes the output of the local Web4+HRM glue script:
//   web4/game/run_one_life_with_policy.py
// which prints a JSON object of the form:
//   { life_summary: {...}, policy_result: {...} }
//
// For the initial slice we read that JSON from a static file served via
// the Next.js public/ directory (e.g. `public/one_life_with_policy.json`).
// Later we can replace this with a live API route that shells out to the
// Python script.

interface LifeSummary {
  tick: number;
  life_state: string;
  research_agent_lct: string | null;
  t3_history: number[];
  atp_history: number[];
}

interface ProposedAction {
  action_type: string;
  atp_cost: number;
  description: string;
}

interface PolicyResult {
  agent_metrics: {
    life_state: string;
    t3_history: number[];
    atp_history: number[];
    final_t3: number;
    final_atp: number;
  };
  proposed_action: ProposedAction;
}

interface CombinedResult {
  life_summary: LifeSummary & Record<string, any>;
  policy_result: PolicyResult;
}

interface LifeRecord {
  life_id: string;
  agent_lct: string;
  start_tick: number;
  end_tick: number;
  life_state: string;
  termination_reason: string;
  t3_history: number[];
  atp_history: number[];
}

interface MultiLifeSummary {
  agent_lct: string;
  lives: LifeRecord[];
  context_edges: Array<{ subject: string; predicate: string; object: string; mrh?: Record<string, string> }>;
  world_tick: number;
}

interface MultiLifePolicyResult {
  life_id: string;
  policy_result: PolicyResult;
}

interface CombinedMultiLifeResult {
  multi_life: MultiLifeSummary;
  policy_results: MultiLifePolicyResult[];
}

type AppliedActionsByLife = Record<string, Array<{ world_tick: number; action_type: string; atp_cost: number }>>;

interface EPStatistics {
  life_progression: Record<string, any>;
  final_stats: Record<string, any>;
}

interface EPCloseLoopResult {
  agent_lct: string;
  lives: LifeRecord[];
  applied_actions?: Record<string, Array<Record<string, any>>>;
  carry_forward?: Record<string, { initial_t3?: number; initial_atp?: number; role_hint?: string } | Record<string, any>>;
  ep_statistics?: EPStatistics;
  context_edges?: Array<{ subject: string; predicate: string; object: string; mrh?: Record<string, string> }>;
  world_tick?: number;
}

interface FiveDomainInteraction {
  tick: number;
  type: string;
  decision: string;
  atp_cost_proposed: number;
  atp_cost_actual: number;
  success: boolean;
}

interface FiveDomainLifeSummary {
  life_id: string;
  life_index: number;
  state: string;
  termination_reason: string;
  duration_ticks: number;
  initial_t3: number;
  final_t3: number;
  initial_atp: number;
  final_atp: number;
  interactions_count: number;
  t3_history: number[];
  atp_history: number[];
  interactions: FiveDomainInteraction[];
}

interface FiveDomainEPResult {
  session: number;
  framework: string;
  timestamp: string;
  lives: FiveDomainLifeSummary[];
  ep_stats: {
    total_predictions: number;
    pattern_corpus_size: number;
  };
}

export default function LabConsolePage() {
  const [data, setData] = useState<CombinedResult | null>(null);
  const [multi, setMulti] = useState<CombinedMultiLifeResult | null>(null);
  const [ep, setEp] = useState<EPCloseLoopResult | null>(null);
  const [fiveDomain, setFiveDomain] = useState<FiveDomainEPResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [runKind, setRunKind] = useState<
    "ep_driven_closed_loop" | "maturation_demo" | "ep_five_domain" | "multi_life_with_policy" | "one_life_with_policy"
  >("ep_driven_closed_loop");
  const [patternSource, setPatternSource] = useState<"web4" | "none">("web4");
  const [numLives, setNumLives] = useState<number>(3);
  const [ticks, setTicks] = useState<number>(20);
  const [timeoutMs, setTimeoutMs] = useState<number>(60000);
  const [status, setStatus] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  function applyLoadedJson(json: any) {
    if (json?.multi_life && Array.isArray(json?.policy_results)) {
      setMulti(json as CombinedMultiLifeResult);
      setData(null);
      setEp(null);
      setFiveDomain(null);
      return;
    }

    if (json?.life_summary && json?.policy_result) {
      setData(json as CombinedResult);
      setMulti(null);
      setEp(null);
      setFiveDomain(null);
      return;
    }

    if (json?.agent_lct && Array.isArray(json?.lives) && json?.ep_statistics) {
      setEp(json as EPCloseLoopResult);
      setData(null);
      setMulti(null);
      setFiveDomain(null);
      return;
    }

    if (typeof json?.framework === "string" && Array.isArray(json?.lives) && json?.ep_stats) {
      setFiveDomain(json as FiveDomainEPResult);
      setData(null);
      setMulti(null);
      setEp(null);
      return;
    }

    throw new Error("Unrecognized JSON schema");
  }

  async function loadFromApi(action: "read" | "run") {
    const params = new URLSearchParams();
    params.set("kind", runKind);
    params.set("action", action);
    params.set("timeout_ms", String(timeoutMs));
    if (runKind === "maturation_demo") {
      params.set("pattern_source", patternSource);
    }
    if (runKind === "ep_five_domain") {
      params.set("num_lives", String(numLives));
      params.set("ticks", String(ticks));
    }

    const res = await fetch(`/api/lab-run?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text.slice(0, 500)}`);
    }
    const json = await res.json();
    const source = res.headers.get("x-web4-lab-source") || "api";
    setStatus(`${runKind} (${action}) via ${source}`);
    applyLoadedJson(json);
  }

  async function loadFromStaticArtifacts() {
    // Map runKind to the corresponding static file
    const kindToFile: Record<string, string> = {
      ep_driven_closed_loop: "/ep_driven_closed_loop_results.json",
      maturation_demo: patternSource === "none"
        ? "/maturation_demo_results_none.json"
        : "/maturation_demo_results_web4.json",
      ep_five_domain: "/ep_five_domain_multi_life_results.json",
      multi_life_with_policy: "/multi_life_with_policy.json",
      one_life_with_policy: "/one_life_with_policy.json",
    };

    const url = kindToFile[runKind] || "/one_life_with_policy.json";

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} loading ${url}`);
    }
    const json = await res.json();
    setStatus(`loaded: ${url}`);
    applyLoadedJson(json);
  }

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setStatus(null);
        // Default: load static artifacts (works without Python)
        await loadFromStaticArtifacts();
      } catch (e: any) {
        setError(e?.message ?? "Failed to load data");
      }
    }
    loadData();
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "60rem", margin: "0 auto" }}>
      <h1>4-Life Lab Console</h1>
      <p style={{ marginTop: "0.75rem", color: "#9ca3af" }}>
        Visualize Web4 life simulations with HRM policy decisions.
        Select a mode below and click &quot;Load data&quot; to explore different scenarios.
      </p>

      <section style={{ marginTop: "1.5rem" }}>
        <h2>Simulation Mode</h2>
        <div
          style={{
            marginTop: "0.75rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #374151",
            background: "#020617",
            display: "grid",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label>
              <strong>Mode</strong>
              <div>
                <select
                  value={runKind}
                  onChange={(e) => setRunKind(e.target.value as any)}
                  style={{ marginTop: "0.25rem", width: "100%" }}
                >
                  <option value="ep_driven_closed_loop">EP Closed Loop</option>
                  <option value="maturation_demo">Maturation Demo</option>
                  <option value="ep_five_domain">Five Domain EP</option>
                  <option value="multi_life_with_policy">Multi-Life with Policy</option>
                  <option value="one_life_with_policy">One Life with Policy</option>
                </select>
              </div>
            </label>

            {runKind === "maturation_demo" && (
              <label>
                <strong>Pattern source</strong>
                <div>
                  <select
                    value={patternSource}
                    onChange={(e) => setPatternSource(e.target.value as any)}
                    style={{ marginTop: "0.25rem", width: "100%" }}
                  >
                    <option value="web4">web4</option>
                    <option value="none">none</option>
                  </select>
                </div>
              </label>
            )}

            {runKind === "ep_five_domain" && (
              <>
                <label>
                  <strong>Number of lives</strong>
                  <input
                    type="number"
                    value={numLives}
                    min={1}
                    max={20}
                    onChange={(e) => setNumLives(Number(e.target.value))}
                    style={{ marginTop: "0.25rem", width: "100%" }}
                  />
                </label>
                <label>
                  <strong>Ticks per life</strong>
                  <input
                    type="number"
                    value={ticks}
                    min={5}
                    max={100}
                    onChange={(e) => setTicks(Number(e.target.value))}
                    style={{ marginTop: "0.25rem", width: "100%" }}
                  />
                </label>
              </>
            )}

          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <button
              disabled={isRunning}
              onClick={async () => {
                setIsRunning(true);
                setError(null);
                try {
                  await loadFromStaticArtifacts();
                } catch (e: any) {
                  setError(e?.message ?? "Failed to load");
                } finally {
                  setIsRunning(false);
                }
              }}
            >
              {isRunning ? "Loading…" : "Load static"}
            </button>

            <span style={{ color: "#4b5563", margin: "0 0.25rem" }}>|</span>

            <button
              disabled={isRunning}
              onClick={async () => {
                setIsRunning(true);
                setError(null);
                try {
                  await loadFromApi("read");
                } catch (e: any) {
                  setError(e?.message ?? "Failed to load cached");
                } finally {
                  setIsRunning(false);
                }
              }}
              style={{ opacity: 0.85 }}
              title="Load cached result from API (requires web4/game)"
            >
              Load cached
            </button>

            <button
              disabled={isRunning}
              onClick={async () => {
                setIsRunning(true);
                setError(null);
                try {
                  await loadFromApi("run");
                } catch (e: any) {
                  setError(e?.message ?? "Failed to run");
                } finally {
                  setIsRunning(false);
                }
              }}
              style={{ opacity: 0.85 }}
              title="Run Python simulation (requires Python + web4/game)"
            >
              Run simulation
            </button>
          </div>

          <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>
            <strong>Load static</strong> uses pre-generated data. <strong>Load cached</strong> and <strong>Run simulation</strong> require Python + web4/game setup.
          </p>

          {status && <p style={{ margin: 0, color: "#9ca3af" }}>{status}</p>}
        </div>
      </section>

      {error && (
        <section style={{ marginTop: "1.5rem", color: "#f97373" }}>
          <h2>Error</h2>
          <p>{error}</p>
          {(error.includes("Python not found") || error.includes("ENOENT")) && (
            <p style={{ marginTop: "0.5rem", color: "#9ca3af", fontSize: "0.9rem" }}>
              The &quot;Run simulation&quot; button requires Python (python3 or python) to be installed and in your PATH.
              Use &quot;Load static&quot; to view pre-generated data instead.
            </p>
          )}
        </section>
      )}

      {!error && !data && !multi && !ep && !fiveDomain && (
        <section style={{ marginTop: "1.5rem", color: "#9ca3af" }}>
          <p>Loading life data...</p>
        </section>
      )}

      {data && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Life Overview</h2>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <p>
              <strong>Life state:</strong> {data.life_summary.life_state}
            </p>
            <p>
              <strong>World tick:</strong> {data.life_summary.tick}
            </p>
            <p>
              <strong>Research agent LCT:</strong>{" "}
              {data.life_summary.research_agent_lct ?? "(none)"}
            </p>
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>T3 &amp; ATP over time</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "0.75rem",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #374151",
                background: "#020617",
              }}
            >
              <h4>T3 composite history</h4>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
                {data.life_summary.t3_history.map((v, i) => (
                  <li key={i}>
                    tick {i + 1}: {v.toFixed(3)}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #374151",
                background: "#020617",
              }}
            >
              <h4>ATP history</h4>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem" }}>
                {data.life_summary.atp_history.map((v, i) => (
                  <li key={i}>
                    tick {i + 1}: {v.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>HRM policy proposal</h3>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <p>
              <strong>Action type:</strong>{" "}
              {data.policy_result.proposed_action.action_type}
            </p>
            <p>
              <strong>ATP cost:</strong>{" "}
              {data.policy_result.proposed_action.atp_cost.toFixed(2)}
            </p>
            <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
              {data.policy_result.proposed_action.description}
            </p>
          </div>
        </section>
      )}

      {multi && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Multi-Life Overview</h2>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <p>
              <strong>Agent LCT:</strong> {multi.multi_life.agent_lct}
            </p>
            <p>
              <strong>World tick:</strong> {multi.multi_life.world_tick}
            </p>
            <p>
              <strong>Lives:</strong> {multi.multi_life.lives.length}
            </p>
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>Lives (timeline)</h3>
          <div style={{ marginTop: "0.75rem", display: "grid", gap: "1rem" }}>
            {multi.multi_life.lives.map((life) => {
              const policy = multi.policy_results.find((p) => p.life_id === life.life_id);
              const appliedActions = (multi.multi_life as any)?.applied_actions as AppliedActionsByLife | undefined;
              const actionsForLife = appliedActions?.[life.life_id] ?? [];
              const carry = (multi.multi_life as any)?.carry_forward?.[life.life_id] as any;
              const finalT3 = life.t3_history.length ? life.t3_history[life.t3_history.length - 1] : 0;
              const finalATP = life.atp_history.length ? life.atp_history[life.atp_history.length - 1] : 0;

              return (
                <div
                  key={life.life_id}
                  style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                    background: "#020617",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{life.life_id}</h4>
                  <p style={{ marginTop: "0.5rem" }}>
                    <strong>State:</strong> {life.life_state} ({life.termination_reason})
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Ticks:</strong> {life.start_tick} → {life.end_tick}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Final T3:</strong> {finalT3.toFixed(3)}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Final ATP:</strong> {finalATP.toFixed(2)}
                  </p>

                  {carry && (
                    <div style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
                      <p style={{ margin: 0 }}>
                        <strong>Carry-forward:</strong>
                      </p>
                      {typeof carry.initial_t3 !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Initial T3:</strong> {Number(carry.initial_t3).toFixed(3)}
                        </p>
                      )}
                      {typeof carry.initial_atp !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Initial ATP:</strong> {Number(carry.initial_atp).toFixed(2)}
                        </p>
                      )}
                      {typeof carry.role_hint !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Role hint:</strong> {String(carry.role_hint)}
                        </p>
                      )}
                    </div>
                  )}

                  {actionsForLife.length > 0 && (
                    <details style={{ marginTop: "0.5rem" }}>
                      <summary>
                        Applied actions: {actionsForLife.length}
                      </summary>
                      <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", color: "#9ca3af" }}>
                        {actionsForLife.slice(-5).map((a, idx) => (
                          <li key={`${life.life_id}-${idx}`}>
                            tick {a.world_tick}: {a.action_type} (ATP {Number(a.atp_cost).toFixed(2)})
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {policy?.policy_result?.proposed_action && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <p style={{ margin: 0 }}>
                        <strong>HRM action:</strong> {policy.policy_result.proposed_action.action_type} (ATP {policy.policy_result.proposed_action.atp_cost.toFixed(2)})
                      </p>
                      <p style={{ marginTop: "0.25rem", color: "#9ca3af" }}>
                        {policy.policy_result.proposed_action.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>Lineage edges</h3>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <ul style={{ marginTop: 0, paddingLeft: "1.25rem" }}>
              {multi.multi_life.context_edges
                .filter((e) => e.predicate === "web4:rebornAs")
                .map((e, i) => (
                  <li key={`${e.subject}-${e.object}-${i}`}>
                    {e.subject} → {e.object}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}

      {ep && (
        <section style={{ marginTop: "2rem" }}>
          <h2>EP Closed-Loop Overview</h2>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <p>
              <strong>Agent LCT:</strong> {ep.agent_lct}
            </p>
            {typeof ep.world_tick === "number" && (
              <p>
                <strong>World tick:</strong> {ep.world_tick}
              </p>
            )}
            <p>
              <strong>Lives:</strong> {ep.lives.length}
            </p>
            {ep.ep_statistics?.final_stats && (
              <p>
                <strong>EP maturation:</strong> {String(ep.ep_statistics.final_stats.maturation_stage ?? "(unknown)")}
              </p>
            )}
            {ep.ep_statistics?.final_stats && (
              <p>
                <strong>Total patterns:</strong> {Number(ep.ep_statistics.final_stats.total_patterns ?? 0)}
              </p>
            )}
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>Lives (timeline)</h3>
          <div style={{ marginTop: "0.75rem", display: "grid", gap: "1rem" }}>
            {ep.lives.map((life) => {
              const actionsForLife = ep.applied_actions?.[life.life_id] ?? [];
              const finalT3 = life.t3_history.length ? life.t3_history[life.t3_history.length - 1] : 0;
              const finalATP = life.atp_history.length ? life.atp_history[life.atp_history.length - 1] : 0;
              const lifeStats = ep.ep_statistics?.life_progression?.[life.life_id] ?? null;
              const carry = (ep as any)?.carry_forward?.[life.life_id] as any;

              return (
                <div
                  key={life.life_id}
                  style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #374151",
                    background: "#020617",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <strong>Life:</strong> {life.life_id}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Status:</strong> {life.life_state} ({life.termination_reason})
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Ticks:</strong> {life.start_tick} → {life.end_tick}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Final T3:</strong> {finalT3.toFixed(3)}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Final ATP:</strong> {finalATP.toFixed(2)}
                  </p>

                  {carry && (
                    <div style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
                      <p style={{ margin: 0 }}>
                        <strong>Carry-forward:</strong>
                      </p>
                      {typeof carry.initial_t3 !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Initial T3:</strong> {Number(carry.initial_t3).toFixed(3)}
                        </p>
                      )}
                      {typeof carry.initial_atp !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Initial ATP:</strong> {Number(carry.initial_atp).toFixed(2)}
                        </p>
                      )}
                      {typeof carry.role_hint !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Role hint:</strong> {String(carry.role_hint)}
                        </p>
                      )}
                    </div>
                  )}

                  {lifeStats && (
                    <div style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
                      {lifeStats.maturation_stage && (
                        <p style={{ margin: 0 }}>
                          <strong>Maturation:</strong> {String(lifeStats.maturation_stage)}
                        </p>
                      )}
                      {typeof lifeStats.total_patterns !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Patterns:</strong> {Number(lifeStats.total_patterns)}
                        </p>
                      )}
                      {typeof lifeStats.pattern_rate !== "undefined" && (
                        <p style={{ marginTop: "0.25rem" }}>
                          <strong>Pattern rate:</strong> {(Number(lifeStats.pattern_rate) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  )}

                  {actionsForLife.length > 0 && (
                    <details style={{ marginTop: "0.75rem" }} open>
                      <summary style={{
                        cursor: "pointer",
                        fontWeight: 600,
                        color: "#38bdf8",
                        marginBottom: "0.5rem"
                      }}>
                        🧠 Agent Reasoning & Decisions
                      </summary>
                      <ReasoningTimeline
                        actions={actionsForLife as any}
                        lifeId={life.life_id}
                        t3History={life.t3_history}
                        atpHistory={life.atp_history}
                      />
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Decision Evolution - How EP learning improves decisions across lives */}
      {ep && ep.lives && ep.lives.length >= 2 && ep.applied_actions && (
        <section style={{ marginTop: "2rem" }}>
          <h2>📈 Decision Evolution (EP Learning Across Lives)</h2>
          <DecisionEvolution
            lives={ep.lives.map((life, index) => ({
              life_id: life.life_id,
              life_number: index + 1,
              actions: (ep.applied_actions?.[life.life_id] ?? []) as any
            }))}
          />
        </section>
      )}

      {fiveDomain && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Five-Domain EP Overview</h2>
          <div
            style={{
              marginTop: "0.75rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #374151",
              background: "#020617",
            }}
          >
            <p>
              <strong>Framework:</strong> {fiveDomain.framework}
            </p>
            <p>
              <strong>Session:</strong> {fiveDomain.session}
            </p>
            <p>
              <strong>Lives:</strong> {fiveDomain.lives.length}
            </p>
            <p>
              <strong>Total predictions:</strong> {fiveDomain.ep_stats.total_predictions}
            </p>
            <p>
              <strong>Pattern corpus size:</strong> {fiveDomain.ep_stats.pattern_corpus_size}
            </p>
          </div>

          <h3 style={{ marginTop: "1.5rem" }}>Lives (timeline)</h3>
          <div style={{ marginTop: "0.75rem", display: "grid", gap: "1rem" }}>
            {fiveDomain.lives.map((life) => (
              <div
                key={life.life_id}
                style={{
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #374151",
                  background: "#020617",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Life:</strong> {life.life_id}
                </p>
                <p style={{ marginTop: "0.25rem" }}>
                  <strong>Status:</strong> {life.state} ({life.termination_reason})
                </p>
                <p style={{ marginTop: "0.25rem" }}>
                  <strong>Duration:</strong> {life.duration_ticks} ticks
                </p>
                <p style={{ marginTop: "0.25rem" }}>
                  <strong>T3:</strong> {Number(life.initial_t3).toFixed(3)} → {Number(life.final_t3).toFixed(3)}
                </p>
                <p style={{ marginTop: "0.25rem" }}>
                  <strong>ATP:</strong> {Number(life.initial_atp).toFixed(1)} → {Number(life.final_atp).toFixed(1)}
                </p>
                <p style={{ marginTop: "0.25rem" }}>
                  <strong>Interactions:</strong> {life.interactions_count}
                </p>

                {life.interactions?.length > 0 && (
                  <details style={{ marginTop: "0.5rem" }}>
                    <summary>Recent interactions</summary>
                    <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", color: "#9ca3af" }}>
                      {life.interactions.slice(-5).map((it) => (
                        <li key={`${life.life_id}:${it.tick}`}>tick {it.tick}: {it.type} → {it.decision} (ATP {Number(it.atp_cost_actual).toFixed(1)})</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Narrative Panel - Human-readable story of the simulation */}
      {ep && ep.lives && ep.lives.length > 0 && (
        <NarrativePanel lives={ep.lives} />
      )}
      {multi && multi.multi_life && multi.multi_life.lives && multi.multi_life.lives.length > 0 && (
        <NarrativePanel lives={multi.multi_life.lives} />
      )}
      {fiveDomain && fiveDomain.lives && fiveDomain.lives.length > 0 && (
        <NarrativePanel lives={fiveDomain.lives} />
      )}
    </main>
  );
}
