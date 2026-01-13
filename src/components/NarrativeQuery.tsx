/**
 * Narrative Query Component
 *
 * Conversational interface to narratives (ACT prototype)
 * Enables natural language questions about simulations
 */

"use client";

import { useState } from "react";
import {
  NarrativeQueryEngine,
  SUGGESTED_QUERIES,
  type QueryResponse
} from "@/lib/narratives/narrative_query";
import type { Narrative } from "@/lib/narratives/story_generator";
import type { SimulationEvent } from "@/lib/narratives/event_detector";

interface NarrativeQueryProps {
  narrative: Narrative;
  events: SimulationEvent[];
}

interface QueryHistory {
  question: string;
  response: QueryResponse;
}

export function NarrativeQuery({ narrative, events }: NarrativeQueryProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<QueryHistory[]>([]);
  const [engine] = useState(() => new NarrativeQueryEngine(narrative, events));

  const handleSubmit = (question: string) => {
    if (!question.trim()) return;

    const response = engine.query(question);
    setHistory([...history, { question, response }]);
    setQuery("");
  };

  const handleSuggestion = (suggestion: string) => {
    handleSubmit(suggestion);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>🤖 Ask About This Simulation</h3>
        <p style={styles.subtitle}>
          Conversational interface (ACT prototype) - Ask questions in natural language
        </p>
      </div>

      {/* Query History */}
      {history.length > 0 && (
        <div style={styles.history}>
          {history.map((item, i) => (
            <div key={i} style={styles.exchange}>
              <div style={styles.question}>
                <strong>You:</strong> {item.question}
              </div>
              <div style={styles.answer}>
                <strong>Assistant:</strong>
                <div style={styles.answerText}>{item.response.answer}</div>

                {item.response.relevantEvents && item.response.relevantEvents.length > 0 && (
                  <div style={styles.relevantEvents}>
                    <strong>📍 Relevant Events:</strong>
                    {item.response.relevantEvents.map((event, j) => (
                      <div key={j} style={styles.eventItem}>
                        <div style={styles.eventTimestamp}>[{event.timestamp}]</div>
                        <div>{event.description}</div>
                      </div>
                    ))}
                  </div>
                )}

                {item.response.followUp && item.response.followUp.length > 0 && (
                  <div style={styles.followUp}>
                    <strong>💡 Follow-up:</strong>
                    <div style={styles.followUpList}>
                      {item.response.followUp.map((follow, j) => (
                        <button
                          key={j}
                          onClick={() => handleSuggestion(follow)}
                          style={styles.followUpButton}
                        >
                          {follow}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={styles.confidence}>
                  Confidence: {Math.round(item.response.confidence * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggested Questions */}
      {history.length === 0 && (
        <div style={styles.suggestions}>
          <strong style={styles.suggestionsTitle}>Try asking:</strong>
          <div style={styles.suggestionList}>
            {SUGGESTED_QUERIES.slice(0, 6).map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(suggestion)}
                style={styles.suggestionButton}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit(query)}
          placeholder="Ask a question about this simulation..."
          style={styles.input}
        />
        <button
          onClick={() => handleSubmit(query)}
          style={styles.submitButton}
          disabled={!query.trim()}
        >
          Ask
        </button>
      </div>

      {/* Info */}
      <div style={styles.info}>
        <strong>💡 Tip:</strong> This is a prototype ACT (Autonomous Conversational Trust) interface.
        It demonstrates how humans can explore Web4 simulations through natural conversation.
        Full ACT integration would use the web4/act_deployment implementation.
      </div>
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

  header: {
    marginBottom: "1.5rem",
  } as React.CSSProperties,

  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: 0,
    marginBottom: "0.5rem",
  } as React.CSSProperties,

  subtitle: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: 0,
  } as React.CSSProperties,

  history: {
    marginBottom: "1.5rem",
    maxHeight: "400px",
    overflowY: "auto",
  } as React.CSSProperties,

  exchange: {
    marginBottom: "1.5rem",
    paddingBottom: "1.5rem",
    borderBottom: "1px solid #374151",
  } as React.CSSProperties,

  question: {
    marginBottom: "0.75rem",
    padding: "0.75rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
    borderLeft: "3px solid #60a5fa",
  } as React.CSSProperties,

  answer: {
    padding: "0.75rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
    borderLeft: "3px solid #10b981",
  } as React.CSSProperties,

  answerText: {
    marginTop: "0.5rem",
    marginBottom: "1rem",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  } as React.CSSProperties,

  relevantEvents: {
    marginTop: "1rem",
    padding: "0.75rem",
    background: "#0f172a",
    borderRadius: "0.25rem",
    fontSize: "0.875rem",
  } as React.CSSProperties,

  eventItem: {
    marginTop: "0.5rem",
    paddingLeft: "0.5rem",
  } as React.CSSProperties,

  eventTimestamp: {
    color: "#60a5fa",
    fontSize: "0.75rem",
    marginBottom: "0.25rem",
  } as React.CSSProperties,

  followUp: {
    marginTop: "1rem",
    fontSize: "0.875rem",
  } as React.CSSProperties,

  followUpList: {
    marginTop: "0.5rem",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  } as React.CSSProperties,

  followUpButton: {
    padding: "0.375rem 0.75rem",
    fontSize: "0.75rem",
    borderRadius: "0.25rem",
    border: "1px solid #374151",
    background: "#374151",
    color: "#9ca3af",
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,

  confidence: {
    marginTop: "0.75rem",
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "right",
  } as React.CSSProperties,

  suggestions: {
    marginBottom: "1.5rem",
    padding: "1rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
  } as React.CSSProperties,

  suggestionsTitle: {
    display: "block",
    marginBottom: "0.75rem",
  } as React.CSSProperties,

  suggestionList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  } as React.CSSProperties,

  suggestionButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    border: "1px solid #3730a3",
    background: "#1e1b4b",
    color: "#a5b4fc",
    cursor: "pointer",
    transition: "all 0.2s",
  } as React.CSSProperties,

  inputContainer: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  } as React.CSSProperties,

  input: {
    flex: 1,
    padding: "0.75rem",
    fontSize: "0.875rem",
    borderRadius: "0.375rem",
    border: "1px solid #374151",
    background: "#1e293b",
    color: "white",
  } as React.CSSProperties,

  submitButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "0.875rem",
    fontWeight: "600",
    borderRadius: "0.375rem",
    border: "none",
    background: "#3730a3",
    color: "white",
    cursor: "pointer",
    transition: "background 0.2s",
  } as React.CSSProperties,

  info: {
    padding: "0.75rem",
    background: "#1e293b",
    borderRadius: "0.375rem",
    fontSize: "0.75rem",
    color: "#9ca3af",
    lineHeight: "1.5",
  } as React.CSSProperties,
};
