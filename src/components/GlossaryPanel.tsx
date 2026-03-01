"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { terms, type TermDefinition } from "@/lib/terms";

const TERM_ORDER = [
  "Web4", "LCT", "ATP", "ADP", "T3", "V3",
  "MRH", "CI", "Karma", "EP", "R6", "Society",
  "VCM", "Synthon",
];

export default function GlossaryPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if user has ever opened the glossary
  useEffect(() => {
    try {
      if (localStorage.getItem("4life-glossary-opened")) {
        setHasBeenOpened(true);
      }
    } catch {}
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setFilter("");
  }, []);

  // Escape key closes panel
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Focus search input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("touchstart", onClick);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("touchstart", onClick);
    };
  }, [isOpen, close]);

  const filteredTerms = TERM_ORDER
    .map((key) => ({ key, ...terms[key] }))
    .filter((t) => {
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        t.term.toLowerCase().includes(q) ||
        t.fullName.toLowerCase().includes(q) ||
        t.brief.toLowerCase().includes(q)
      );
    });

  return (
    <>
      {/* Floating trigger button */}
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen((v) => !v);
          if (!hasBeenOpened) {
            setHasBeenOpened(true);
            try { localStorage.setItem("4life-glossary-opened", "1"); } catch {}
          }
        }}
        aria-label={isOpen ? "Close glossary" : "Open glossary"}
        title="Quick glossary — look up any term"
        className={!isOpen && !hasBeenOpened ? "glossary-pulse" : ""}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 40,
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `1px solid ${!isOpen && !hasBeenOpened ? "rgba(56, 189, 248, 0.6)" : "rgba(148, 163, 184, 0.4)"}`,
          background: isOpen
            ? "linear-gradient(135deg, #22c55e, #14b8a6)"
            : "#111827",
          color: isOpen ? "#050816" : !hasBeenOpened ? "#38bdf8" : "#d1d5db",
          fontSize: "1.25rem",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: !isOpen && !hasBeenOpened
            ? "0 0 12px rgba(56, 189, 248, 0.3), 0 4px 16px rgba(0,0,0,0.4)"
            : "0 4px 16px rgba(0,0,0,0.4)",
          transition: "all 0.2s ease",
          animation: !isOpen && !hasBeenOpened ? "glossaryPulse 2s ease-in-out infinite" : "none",
        }}
      >
        {isOpen ? "\u00d7" : "Aa"}
      </button>

      {/* Pulse animation + hint label for first-time visitors */}
      {!hasBeenOpened && (
        <>
          <div style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "4.5rem",
            zIndex: 39,
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "0.5rem",
            padding: "0.35rem 0.75rem",
            fontSize: "0.75rem",
            color: "#93c5fd",
            whiteSpace: "nowrap",
            animation: "glossaryHintFade 8s ease-in-out forwards",
            pointerEvents: "none",
          }}>
            Terms glossary
          </div>
          <style>{`
            @keyframes glossaryPulse {
              0%, 100% { box-shadow: 0 0 12px rgba(56, 189, 248, 0.3), 0 4px 16px rgba(0,0,0,0.4); }
              50% { box-shadow: 0 0 20px rgba(56, 189, 248, 0.5), 0 4px 16px rgba(0,0,0,0.4); }
            }
            @keyframes glossaryHintFade {
              0%, 60% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </>
      )}

      {/* Glossary panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Quick Glossary"
          style={{
            position: "fixed",
            bottom: "5rem",
            left: "1.5rem",
            zIndex: 40,
            width: "360px",
            maxWidth: "calc(100vw - 2rem)",
            maxHeight: "min(520px, calc(100vh - 8rem))",
            background: "#111827",
            border: "1px solid rgba(148, 163, 184, 0.4)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#d1d5db",
                marginBottom: "0.5rem",
              }}
            >
              Quick Glossary
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Filter terms..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "0.4rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                background: "rgba(255,255,255,0.05)",
                color: "#f9fafb",
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
          </div>

          {/* Term list */}
          <div
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "0.5rem",
            }}
          >
            {filteredTerms.length === 0 ? (
              <div
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#9ca3af",
                  fontSize: "0.8rem",
                }}
              >
                No matching terms
              </div>
            ) : (
              filteredTerms.map((t) => (
                <TermEntry key={t.key} term={t} onNavigate={close} />
              ))
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "0.5rem 1rem",
              borderTop: "1px solid rgba(148, 163, 184, 0.2)",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <Link
              href="/glossary"
              onClick={close}
              style={{
                fontSize: "0.75rem",
                color: "#38bdf8",
              }}
            >
              Full glossary page →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function TermEntry({
  term,
  onNavigate,
}: {
  term: TermDefinition & { key: string };
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        padding: "0.5rem 0.6rem",
        borderRadius: "8px",
        marginBottom: "2px",
        cursor: "pointer",
        background: expanded ? "rgba(255,255,255,0.05)" : "transparent",
        transition: "background 0.15s ease",
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Term header row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#38bdf8",
            minWidth: "fit-content",
          }}
        >
          {term.term}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          {term.fullName}
        </span>
      </div>

      {/* Brief (always visible) */}
      <div
        style={{
          fontSize: "0.78rem",
          color: "#d1d5db",
          lineHeight: 1.4,
          marginTop: "2px",
        }}
      >
        {term.brief}
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ marginTop: "0.4rem" }}>
          {term.explanation && (
            <div
              style={{
                fontSize: "0.72rem",
                color: "#9ca3af",
                lineHeight: 1.5,
                marginBottom: "0.4rem",
              }}
            >
              {term.explanation}
            </div>
          )}
          {term.learnMore && (
            <Link
              href={term.learnMore}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate();
              }}
              style={{
                fontSize: "0.72rem",
                color: "#38bdf8",
              }}
            >
              Learn more →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
