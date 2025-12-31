"use client";

import { useEffect, useState } from "react";

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

export default function LabConsolePage() {
  const [data, setData] = useState<CombinedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/one_life_with_policy.json", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as CombinedResult;
        setData(json);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load data");
      }
    }
    loadData();
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "60rem", margin: "0 auto" }}>
      <h1>4-Life Lab Console (v0)</h1>
      <p style={{ marginTop: "0.75rem", color: "#9ca3af" }}>
        This console visualizes a single local Web4 "life" run together with
        the HRM research agent&apos;s proposed action. To update the data, run
        the Python script that generates <code>one_life_with_policy.json</code>
        and refresh this page.
      </p>

      {error && (
        <section style={{ marginTop: "1.5rem", color: "#f97373" }}>
          <h2>Error loading data</h2>
          <p>{error}</p>
          <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
            Ensure you have generated <code>public/one_life_with_policy.json</code>
            from the Web4+HRM script and that the 4-Life dev server is running.
          </p>
        </section>
      )}

      {!error && !data && (
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
    </main>
  );
}
