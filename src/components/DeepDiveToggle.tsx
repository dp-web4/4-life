"use client";

import { useState, useEffect, ReactNode } from "react";

interface DeepDiveToggleProps {
  children: ReactNode;
  storageKey?: string;
  /** Label shown when content is hidden */
  showLabel?: string;
  /** Label shown when content is visible */
  hideLabel?: string;
}

/**
 * Wraps "deep dive" / reference content below the basics divider.
 * Defaults to collapsed for first-time visitors. Persists toggle state
 * in localStorage so returning visitors see their preference.
 */
export default function DeepDiveToggle({
  children,
  storageKey = "4life-deep-dive-expanded",
  showLabel = "Show deep dives & reference material",
  hideLabel = "Hide deep dives",
}: DeepDiveToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") setExpanded(true);
    setMounted(true);
  }, [storageKey]);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem(storageKey, String(next));
  };

  // Avoid hydration mismatch — render nothing until client mount
  if (!mounted) return null;

  return (
    <div className="mt-8">
      {/* Divider + toggle button */}
      <div className="border-t border-zinc-700 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            {expanded
              ? "Reference material and deep dives"
              : "You've got the basics — everything above covers what you need to know"}
          </p>
          <button
            onClick={toggle}
            className="shrink-0 px-4 py-2 text-sm font-medium rounded-lg border border-zinc-600 text-zinc-300 hover:text-white hover:border-zinc-400 transition-colors"
          >
            {expanded ? `▲ ${hideLabel}` : `▼ ${showLabel}`}
          </button>
        </div>
      </div>

      {/* Content */}
      {expanded && <div className="animate-in fade-in duration-300">{children}</div>}
    </div>
  );
}
