/**
 * Narrative Panel Component
 *
 * Displays human-readable narrative generated from simulation data.
 * Integrated into lab-console to provide story-based understanding
 * alongside technical visualizations.
 */

"use client";

import { useEffect, useState } from "react";
import { EventDetector, SimulationEvent } from "@/lib/narratives/event_detector";
import { StoryGenerator, Narrative } from "@/lib/narratives/story_generator";

interface NarrativePanelProps {
  lives: any[]; // LifeRecord array from simulation
  collapsed?: boolean;
}

export function NarrativePanel({ lives, collapsed = false }: NarrativePanelProps) {
  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [events, setEvents] = useState<SimulationEvent[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [activeAct, setActiveAct] = useState(0);
  const [showTechnical, setShowTechnical] = useState(false);

  useEffect(() => {
    if (!lives || lives.length === 0) {
      setNarrative(null);
      return;
    }

    try {
      const detector = new EventDetector();
      const detectedEvents = detector.detectEvents(lives);
      setEvents(detectedEvents);

      const generator = new StoryGenerator();
      const generatedNarrative = generator.generateNarrative(lives, detectedEvents);
      setNarrative(generatedNarrative);
    } catch (error) {
      console.error("Failed to generate narrative:", error);
    }
  }, [lives]);

  if (!narrative) {
    return (
      <div style={styles.container}>
        <p style={styles.placeholder}>
          Load a simulation to see its story...
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          📖 {narrative.title}
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={styles.collapseButton}
        >
          {isCollapsed ? "Expand Story ▼" : "Collapse Story ▲"}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Summary */}
          <div style={styles.summary}>
            <p>{narrative.summary}</p>
          </div>

          {/* Themes */}
          <div style={styles.themes}>
            <strong>Themes:</strong>
            {narrative.themes.map((theme, i) => (
              <span key={i} style={styles.themeTag}>
                {theme}
              </span>
            ))}
          </div>

          {/* Insights */}
          {narrative.key_insights.length > 0 && (
            <div style={styles.insights}>
              <h3 style={styles.insightsTitle}>💡 Key Insights</h3>
              <ul style={styles.insightsList}>
                {narrative.key_insights.map((insight, i) => (
                  <li key={i} style={styles.insightItem}>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technical toggle */}
          <div style={styles.controls}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={showTechnical}
                onChange={(e) => setShowTechnical(e.target.checked)}
              />
              <span style={{ marginLeft: "0.5rem" }}>Show technical details</span>
            </label>
          </div>

          {/* Acts (Life cycles) */}
          <div style={styles.acts}>
            {/* Act tabs */}
            <div style={styles.actTabs}>
              {narrative.acts.map((act, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAct(i)}
                  style={{
                    ...styles.actTab,
                    ...(activeAct === i ? styles.actTabActive : {}),
                  }}
                >
                  {act.title}
                </button>
              ))}
            </div>

            {/* Active act content */}
            {narrative.acts[activeAct] && (
              <div style={styles.actContent}>
                {narrative.acts[activeAct].events.map((event, i) => (
                  <div key={i} style={styles.event}>
                    <div style={styles.eventTimestamp}>
                      {event.timestamp}
                    </div>
                    <div style={styles.eventDescription}>
                      {event.description}
                    </div>
                    {showTechnical && event.technical_detail && (
                      <div style={styles.eventTechnical}>
                        📚 Technical: {event.technical_detail}
                      </div>
                    )}
                    <div style={styles.eventSignificance}>
                      ⚡ {event.significance}
                    </div>
                  </div>
                ))}

                {narrative.acts[activeAct].commentary && (
                  <div style={styles.commentary}>
                    <strong>💭 Commentary:</strong>{" "}
                    {narrative.acts[activeAct].commentary}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Event summary */}
          <div style={styles.eventSummary}>
            <strong>Events detected:</strong> {events.length} interesting moments across {narrative.acts.length} {narrative.acts.length === 1 ? 'life' : 'lives'}
          </div>
        </>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    marginTop: "2rem",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #374151",
    background: "#0f172a",
  } as React.CSSProperties,

  placeholder: {
    color: "#9ca3af",
    fontStyle: "italic",
  } as React.CSSProperties,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  } as React.CSSProperties,

  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: 0,
  } as React.CSSProperties,

  collapseButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    border: "1px solid #374151",
    background: "#1e293b",
    color: "white",
    cursor: "pointer",
  } as React.CSSProperties,

  summary: {
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
    lineHeight: "1.6",
  } as React.CSSProperties,

  themes: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  } as React.CSSProperties,

  themeTag: {
    padding: "0.25rem 0.75rem",
    background: "#3730a3",
    borderRadius: "9999px",
    fontSize: "0.875rem",
  } as React.CSSProperties,

  insights: {
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
  } as React.CSSProperties,

  insightsTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "0.75rem",
  } as React.CSSProperties,

  insightsList: {
    margin: 0,
    paddingLeft: "1.25rem",
  } as React.CSSProperties,

  insightItem: {
    marginBottom: "0.5rem",
    lineHeight: "1.5",
  } as React.CSSProperties,

  controls: {
    marginBottom: "1rem",
    padding: "0.75rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
  } as React.CSSProperties,

  checkbox: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  } as React.CSSProperties,

  acts: {
    marginTop: "1.5rem",
  } as React.CSSProperties,

  actTabs: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  } as React.CSSProperties,

  actTab: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    border: "1px solid #374151",
    background: "#1e293b",
    color: "#9ca3af",
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,

  actTabActive: {
    background: "#3730a3",
    color: "white",
    borderColor: "#4f46e5",
  } as React.CSSProperties,

  actContent: {
    padding: "1rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
  } as React.CSSProperties,

  event: {
    marginBottom: "1.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,

  eventTimestamp: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#60a5fa",
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  eventDescription: {
    marginBottom: "0.75rem",
    lineHeight: "1.6",
  } as React.CSSProperties,

  eventTechnical: {
    fontSize: "0.875rem",
    marginBottom: "0.5rem",
    padding: "0.75rem",
    background: "#0f172a",
    borderRadius: "0.25rem",
    borderLeft: "3px solid #60a5fa",
    color: "#9ca3af",
  } as React.CSSProperties,

  eventSignificance: {
    fontSize: "0.875rem",
    fontStyle: "italic",
    color: "#fbbf24",
  } as React.CSSProperties,

  commentary: {
    marginTop: "1.5rem",
    padding: "1rem",
    background: "#0f172a",
    borderRadius: "0.375rem",
    borderLeft: "3px solid #8b5cf6",
    lineHeight: "1.6",
  } as React.CSSProperties,

  eventSummary: {
    marginTop: "1.5rem",
    padding: "0.75rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#9ca3af",
    borderTop: "1px solid #374151",
  } as React.CSSProperties,
};
