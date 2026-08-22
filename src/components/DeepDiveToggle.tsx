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
 *
 * AUG-22 visitor, HIGH 4: "Ten links promise a specific section and drop you at the top of the
 * destination instead." Enumerating every cross-page hash link in src/ (with JSX and JS comments
 * stripped, which is what removes their /why-web4#faq false positive) and checking each id against
 * the LIVE served HTML found 14 broken, not 10. NINE of the 14 were this component. Their ids all
 * exist in source; they just sit inside these children, and the two lines below made them
 * unreachable: `if (!mounted) return null` keeps them out of the served HTML, and
 * `{expanded && ...}` keeps them out of the mounted DOM until somebody clicks. The browser gets a
 * fragment that matches nothing and leaves the reader at the top of the page, every time.
 *
 * The nine: /atp-economics #at-scale, #earning-atp, #faq-reading-cost; /trust-tensor #t3-composite,
 * #how-t3-evolves, #temperament-scope, #witness-network; /lct-explainer #recovery, #faq-ai-agents.
 * The visitor named the worst of them: "Why reading costs anything at all" on /how-it-works points
 * at #faq-reading-cost and "appears at the exact moment the objection forms and is the only place
 * the site offers to answer it." It is their Unanswered Q6.
 *
 * THIS FIX IS THE JAVASCRIPT CLICK PATH ONLY, AND THE ROW STAYS OPEN. The visitor who filed it
 * browsed without JavaScript. Deep-dive content is still absent from the served HTML, so a non-JS
 * reader, a search engine and a reading assistant still cannot see or deep-link it. Putting it in
 * the served HTML means rendering the children always and hiding them in CSS, which is a different
 * and larger change to this component's hydration contract. Do not record HIGH 4 as closed.
 *
 * Three constraints on the implementation below, each load-bearing:
 *   1. It must NOT write localStorage. Arriving on a deep link is not the reader choosing to
 *      expand deep dives forever, and persisting it would silently rewrite a stored preference.
 *      That is why it calls setExpanded directly and never `toggle()`.
 *   2. It must be TWO passes. At the moment the unresolvable fragment is detected the children do
 *      not exist yet, so a single-pass implementation expands and never scrolls. The second effect
 *      fires after the children commit.
 *   3. It must open every <details> between the target and here, not just the target. Four of the
 *      nine (#t3-composite, #how-t3-evolves, and the two /atp-economics section wrappers) are
 *      inside or wrapped around a <details>, so a bare scrollIntoView lands the reader on a closed
 *      summary, which is the wrong element ([[check-what-renders-at-the-anchor]]). /atp-economics
 *      already hand-rolls the self-is-a-details half of this on its #net-positive links.
 * Verify with `curl` against the deployed page and a positive control, never with a green build:
 * the build cannot tell you what a client component put in the DOM ([[ui-claim-check-the-mount-effect]]).
 */
export default function DeepDiveToggle({
  children,
  storageKey = "4life-deep-dive-expanded",
  showLabel = "Show deep dives & reference material",
  hideLabel = "Hide deep dives",
}: DeepDiveToggleProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pendingHash, setPendingHash] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved === "true") setExpanded(true);
    setMounted(true);
  }, [storageKey]);

  // Pass 1: a fragment that resolves to nothing may name a target inside our children.
  useEffect(() => {
    if (!mounted) return;
    const claim = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return;
      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch {
        // Malformed escape sequence: fall back to the raw fragment.
      }
      // Already reachable, so it is not ours to open.
      if (document.getElementById(id)) return;
      setExpanded(true);
      setPendingHash(id);
    };
    claim();
    window.addEventListener("hashchange", claim);
    return () => window.removeEventListener("hashchange", claim);
  }, [mounted]);

  // Pass 2: the children have committed, so the target now exists. Open the <details>
  // chain around it and scroll.
  useEffect(() => {
    if (!pendingHash || !expanded) return;
    const el = document.getElementById(pendingHash);
    if (!el) return;
    setPendingHash(null);

    // Every <details> from the target up to us, so nothing on the path stays collapsed.
    let node: HTMLElement | null = el;
    while (node) {
      if (node instanceof HTMLDetailsElement) node.open = true;
      node = node.parentElement;
    }
    // A section whose whole content is one <details> would otherwise land the reader
    // on a closed summary.
    if (!(el instanceof HTMLDetailsElement)) {
      const inner = el.querySelector("details");
      if (inner) inner.open = true;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pendingHash, expanded]);

  const toggle = () => {
    const next = !expanded;
    setExpanded(next);
    localStorage.setItem(storageKey, String(next));
  };

  // Avoid hydration mismatch - render nothing until client mount
  if (!mounted) return null;

  return (
    <div className="mt-8">
      {/* Divider + toggle button */}
      <div className="border-t border-zinc-700 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">
            {expanded
              ? "Reference material and deep dives"
              : "You've got the basics - everything above covers what you need to know"}
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
