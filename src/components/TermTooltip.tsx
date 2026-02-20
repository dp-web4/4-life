"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { getTerm } from "@/lib/terms";

interface TermTooltipProps {
  /** The term key (e.g., "LCT", "ATP", "T3") */
  term: string;
  /** Optional custom display text (defaults to term) */
  children?: React.ReactNode;
  /** Show the full name in parentheses after the term */
  showFullName?: boolean;
  /** Custom className for the trigger */
  className?: string;
}

/**
 * TermTooltip - Inline definition tooltip for Web4 terminology
 *
 * Usage:
 *   <TermTooltip term="LCT" />
 *   <TermTooltip term="ATP">attention budget</TermTooltip>
 *   <TermTooltip term="T3" showFullName />
 *
 * Displays a tooltip with the canonical definition when hovering.
 */
export default function TermTooltip({
  term,
  children,
  showFullName = false,
  className = "",
}: TermTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const definition = getTerm(term);

  // Adjust tooltip position based on available space
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // Prefer above, but switch to below if not enough space
      if (spaceAbove < 200 && spaceBelow > spaceAbove) {
        setPosition("below");
      } else {
        setPosition("above");
      }
    }
  }, [isOpen]);

  // Close tooltip when clicking outside (for mobile tap-to-toggle)
  const handleClickOutside = useCallback((e: MouseEvent | TouchEvent) => {
    if (
      triggerRef.current &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  if (!definition) {
    // If no definition found, just render the children without tooltip
    return <span className={className}>{children || term}</span>;
  }

  const displayText = children || (
    <>
      {definition.term}
      {showFullName && (
        <span className="text-gray-400"> ({definition.fullName})</span>
      )}
    </>
  );

  return (
    <span
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <span
        className="border-b border-dotted border-sky-400/50 cursor-help text-sky-400 hover:text-sky-300 transition-colors"
        tabIndex={0}
        role="button"
        aria-describedby={`tooltip-${definition.term}`}
      >
        {displayText}
      </span>

      {/* Tooltip */}
      {isOpen && (
        <div
          ref={tooltipRef}
          id={`tooltip-${definition.term}`}
          role="tooltip"
          className={`absolute z-50 w-80 max-w-[90vw] p-4 bg-gray-900 border border-gray-600 rounded-lg shadow-xl ${
            position === "above"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : "top-full mt-2 left-1/2 -translate-x-1/2"
          }`}
          style={{
            // Prevent tooltip from going off-screen
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* Arrow */}
          <div
            className={`absolute w-3 h-3 bg-gray-900 border-gray-600 rotate-45 ${
              position === "above"
                ? "bottom-[-6px] left-1/2 -translate-x-1/2 border-r border-b"
                : "top-[-6px] left-1/2 -translate-x-1/2 border-l border-t"
            }`}
          />

          {/* Header */}
          <div className="mb-2">
            <span className="font-bold text-sky-400">{definition.term}</span>
            <span className="text-gray-400 ml-2">({definition.fullName})</span>
          </div>

          {/* Brief definition */}
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            {definition.brief}
          </p>

          {/* Extended explanation (if available) */}
          {definition.explanation && (
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              {definition.explanation}
            </p>
          )}

          {/* Educational note (if applicable) */}
          {definition.educationalNote && (
            <p className="text-amber-400/80 text-xs italic mb-2">
              Note: {definition.educationalNote}
            </p>
          )}

          {/* Links */}
          <div className="flex gap-3 text-xs pt-2 border-t border-gray-700">
            {definition.learnMore && (
              <Link
                href={definition.learnMore}
                className="text-sky-400 hover:underline"
              >
                Learn more →
              </Link>
            )}
            {definition.canonicalSpec && (
              <a
                href={definition.canonicalSpec}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                Spec →
              </a>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

/**
 * Shorthand components for common terms
 */
export function LCT(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="LCT" {...props} />;
}

export function ATP(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="ATP" {...props} />;
}

export function ADP(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="ADP" {...props} />;
}

export function T3(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="T3" {...props} />;
}

export function V3(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="V3" {...props} />;
}

export function MRH(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="MRH" {...props} />;
}

export function CI(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="CI" {...props} />;
}

export function EP(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="EP" {...props} />;
}

export function R6(props: Omit<TermTooltipProps, "term">) {
  return <TermTooltip term="R6" {...props} />;
}
