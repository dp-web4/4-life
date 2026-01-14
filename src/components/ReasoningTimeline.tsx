"use client";

import { useState } from "react";

/**
 * ReasoningTimeline - Visualizes agent decision-making across a life
 *
 * Shows WHAT the agent did, WHY it made that decision, and the CONSEQUENCES.
 * This makes Web4 agent behavior transparent and comprehensible to humans.
 */

interface AppliedAction {
  world_tick: number;
  action_type: string;
  reason: string;
  atp_before: number;
  atp_after: number;
  atp_cost: number;
  trust_before: number;
  trust_after: number;
  event_type?: string;
  learning_mode?: string;
  ep_decision?: string;
  ep_confidence?: number;
}

interface ReasoningTimelineProps {
  actions: AppliedAction[];
  lifeId: string;
  t3History: number[];
  atpHistory: number[];
}

export function ReasoningTimeline({ actions, lifeId, t3History, atpHistory }: ReasoningTimelineProps) {
  const [selectedAction, setSelectedAction] = useState<AppliedAction | null>(null);
  const [expandedTicks, setExpandedTicks] = useState<Set<number>>(new Set());

  if (actions.length === 0) {
    return (
      <div style={{ padding: "1rem", color: "#9ca3af", fontStyle: "italic" }}>
        No actions recorded for this life.
      </div>
    );
  }

  const toggleExpanded = (tick: number) => {
    const newExpanded = new Set(expandedTicks);
    if (newExpanded.has(tick)) {
      newExpanded.delete(tick);
    } else {
      newExpanded.add(tick);
    }
    setExpandedTicks(newExpanded);
  };

  const getActionColor = (action: AppliedAction) => {
    // Color based on ATP impact
    const atpChange = action.atp_after - action.atp_before;
    if (atpChange > 0) return "#10b981"; // Green - gain
    if (atpChange < -20) return "#ef4444"; // Red - significant loss
    if (atpChange < -10) return "#f59e0b"; // Amber - moderate loss
    return "#6b7280"; // Gray - small loss
  };

  const getTrustColor = (action: AppliedAction) => {
    const trustChange = action.trust_after - action.trust_before;
    if (trustChange > 0) return "#10b981"; // Green - trust gain
    if (trustChange < 0) return "#ef4444"; // Red - trust loss
    return "#6b7280"; // Gray - no change
  };

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.75rem"
      }}>
        <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          Agent Reasoning Timeline ({actions.length} actions)
        </h4>
        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
          Click any action to see full details
        </div>
      </div>

      {/* Timeline view */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxHeight: "500px",
        overflowY: "auto",
        padding: "0.5rem",
        background: "#0f172a",
        borderRadius: "0.5rem",
        border: "1px solid #1e293b"
      }}>
        {actions.map((action, idx) => {
          const isExpanded = expandedTicks.has(action.world_tick);
          const atpChange = action.atp_after - action.atp_before;
          const trustChange = action.trust_after - action.trust_before;
          const actionColor = getActionColor(action);

          return (
            <div
              key={`${lifeId}-action-${idx}`}
              style={{
                padding: "0.75rem",
                background: "#1e293b",
                borderRadius: "0.375rem",
                borderLeft: `3px solid ${actionColor}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => toggleExpanded(action.world_tick)}
            >
              {/* Header - always visible */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                  <div style={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    minWidth: "60px"
                  }}>
                    Tick {action.world_tick}
                  </div>
                  <div style={{
                    fontWeight: 600,
                    color: "#f3f4f6",
                    textTransform: "capitalize"
                  }}>
                    {action.action_type.replace(/_/g, " ")}
                  </div>
                  {action.ep_decision && (
                    <div style={{
                      fontSize: "0.75rem",
                      padding: "0.125rem 0.375rem",
                      background: "#3b82f6",
                      color: "white",
                      borderRadius: "0.25rem",
                      fontWeight: 500
                    }}>
                      EP: {action.ep_decision}
                    </div>
                  )}
                </div>

                {/* Impact indicators */}
                <div style={{
                  display: "flex",
                  gap: "1rem",
                  fontSize: "0.875rem",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{ color: "#9ca3af" }}>ATP:</span>
                    <span style={{
                      color: atpChange >= 0 ? "#10b981" : "#f59e0b",
                      fontWeight: 500,
                      fontFamily: "monospace"
                    }}>
                      {atpChange >= 0 ? "+" : ""}{atpChange.toFixed(1)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{ color: "#9ca3af" }}>T3:</span>
                    <span style={{
                      color: getTrustColor(action),
                      fontWeight: 500,
                      fontFamily: "monospace"
                    }}>
                      {trustChange >= 0 ? "+" : ""}{trustChange.toFixed(3)}
                    </span>
                  </div>
                  <div style={{ color: "#9ca3af", fontSize: "1rem" }}>
                    {isExpanded ? "▼" : "▶"}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{
                  marginTop: "0.75rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid #334155"
                }}>
                  {/* Reasoning - the key insight! */}
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{
                      fontSize: "0.75rem",
                      color: "#9ca3af",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Why this action?
                    </div>
                    <div style={{
                      padding: "0.5rem",
                      background: "#0f172a",
                      borderRadius: "0.25rem",
                      color: "#e2e8f0",
                      fontStyle: "italic",
                      lineHeight: "1.5"
                    }}>
                      "{action.reason}"
                    </div>
                  </div>

                  {/* Detailed metrics */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                    fontSize: "0.875rem"
                  }}>
                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>ATP Budget</div>
                      <div style={{ fontFamily: "monospace", marginTop: "0.125rem" }}>
                        {action.atp_before.toFixed(1)} → {action.atp_after.toFixed(1)}
                      </div>
                      <div style={{
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginTop: "0.125rem"
                      }}>
                        Cost: {action.atp_cost.toFixed(1)}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Trust Score</div>
                      <div style={{ fontFamily: "monospace", marginTop: "0.125rem" }}>
                        {action.trust_before.toFixed(3)} → {action.trust_after.toFixed(3)}
                      </div>
                      <div style={{
                        fontSize: "0.75rem",
                        color: getTrustColor(action),
                        marginTop: "0.125rem"
                      }}>
                        {trustChange >= 0 ? "↗" : "↘"} {Math.abs(trustChange * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* EP/Learning metadata if available */}
                  {(action.learning_mode || action.ep_confidence !== undefined) && (
                    <div style={{
                      marginTop: "0.75rem",
                      padding: "0.5rem",
                      background: "#1e3a8a",
                      borderRadius: "0.25rem",
                      fontSize: "0.75rem"
                    }}>
                      {action.learning_mode && (
                        <div>
                          <span style={{ color: "#93c5fd" }}>Learning mode:</span>{" "}
                          <span style={{ color: "white" }}>{action.learning_mode}</span>
                        </div>
                      )}
                      {action.ep_confidence !== undefined && (
                        <div style={{ marginTop: "0.25rem" }}>
                          <span style={{ color: "#93c5fd" }}>EP confidence:</span>{" "}
                          <span style={{ color: "white" }}>{(action.ep_confidence * 100).toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary statistics */}
      <div style={{
        marginTop: "0.75rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "0.5rem",
        fontSize: "0.875rem"
      }}>
        <div style={{
          padding: "0.5rem",
          background: "#1e293b",
          borderRadius: "0.25rem"
        }}>
          <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Total Actions</div>
          <div style={{ fontWeight: 600, fontSize: "1.25rem", marginTop: "0.125rem" }}>
            {actions.length}
          </div>
        </div>

        <div style={{
          padding: "0.5rem",
          background: "#1e293b",
          borderRadius: "0.25rem"
        }}>
          <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Net ATP Change</div>
          <div style={{
            fontWeight: 600,
            fontSize: "1.25rem",
            marginTop: "0.125rem",
            color: (atpHistory[atpHistory.length - 1] - atpHistory[0]) >= 0 ? "#10b981" : "#ef4444"
          }}>
            {((atpHistory[atpHistory.length - 1] - atpHistory[0]) >= 0 ? "+" : "")}
            {(atpHistory[atpHistory.length - 1] - atpHistory[0]).toFixed(1)}
          </div>
        </div>

        <div style={{
          padding: "0.5rem",
          background: "#1e293b",
          borderRadius: "0.25rem"
        }}>
          <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Net Trust Change</div>
          <div style={{
            fontWeight: 600,
            fontSize: "1.25rem",
            marginTop: "0.125rem",
            color: (t3History[t3History.length - 1] - t3History[0]) >= 0 ? "#10b981" : "#ef4444"
          }}>
            {((t3History[t3History.length - 1] - t3History[0]) >= 0 ? "+" : "")}
            {((t3History[t3History.length - 1] - t3History[0]) * 100).toFixed(1)}%
          </div>
        </div>

        <div style={{
          padding: "0.5rem",
          background: "#1e293b",
          borderRadius: "0.25rem"
        }}>
          <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Avg ATP Cost</div>
          <div style={{ fontWeight: 600, fontSize: "1.25rem", marginTop: "0.125rem" }}>
            {(actions.reduce((sum, a) => sum + a.atp_cost, 0) / actions.length).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
