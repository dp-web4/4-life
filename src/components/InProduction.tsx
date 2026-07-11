// InProduction — a standard, pre-vetted bridge from a concept to its deployed reality.
// The copy lives HERE (public-repo-grounded, disclosure-safe: "the tool you can run",
// never the private fleet), so a page just places <InProduction concept="witness-chain" />
// with zero free-form per-page text. Tier honesty: only claim "running" for what hestia's
// public README lists as built+working; the hub is "reference"; federation is spec-only.

import Link from "next/link";
import MaturityBadge, { MaturityTier } from "./MaturityBadge";
import TermTooltip from "./TermTooltip";

type Entry = { tier: MaturityTier; line: string };

// Jul-4 visitor HIGH: "hestia" and "the hub" appear on this banner across ~22 pages as
// bare proper nouns, only defined at /running-now (which a linear reader reaches LAST).
// Wrap each in-line occurrence in a TermTooltip so the definition is one hover away
// everywhere the banner appears — the visitor's own suggested fix ("a hover-tooltip like
// the ATP/T3 ones would fix all sites at once").
function glossLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\b(hestia|hub)\b/gi;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    const word = m[0];
    parts.push(
      <TermTooltip key={key++} term={word.toLowerCase()}>
        {word}
      </TermTooltip>
    );
    last = m.index + word.length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

const CONCEPTS: Record<string, Entry> = {
  "lct": {
    tier: "running",
    line: "hestia gives any entity a real cryptographic LCT identity on its own hardware — this isn't only a diagram.",
  },
  "trust-tensor": {
    tier: "running",
    line: "hestia evolves real T3/V3 trust tensors from the outcomes of your actions, recorded as you go.",
  },
  "witness-chain": {
    tier: "running",
    line: "hestia keeps a real hash-linked witness chain of what happened — the deployed version of the chains shown here.",
  },
  "delegation": {
    tier: "running",
    line: "hestia grants scoped, signed, revocable authority between entities for real, today.",
  },
  "constellation": {
    tier: "running",
    line: "hestia links your devices into a verifying constellation — multi-device proof as MFA — in shipping code.",
  },
  "policy": {
    tier: "running",
    line: "hestia evaluates a policy gate before each consequential act — the deployed version of this check.",
  },
  "society": {
    tier: "reference",
    line: "the hub is a runnable Web4 society — seven roles, a signed charter, a witnessed ledger — that any community can fork.",
  },
  "sealed-channel": {
    tier: "reference",
    line: "members connect to a hub over an end-to-end encrypted sealed channel in the reference hub today.",
  },
  "mrh": {
    tier: "reference",
    line: "MRH is a typed primitive in web4-core that hestia and the hub build on directly, not a loose metaphor.",
  },
  "atp": {
    tier: "reference",
    line: "ATP/ADP is a typed primitive in the web4-core reference library — specified and built, not hand-waved.",
  },
  "coherence": {
    tier: "reference",
    line: "the coherence/trust math lives in the web4-trust-core reference library that the deployed daemon builds on.",
  },
  "stack": {
    tier: "running",
    // Jul-10 visitor LOW (fired #431 contingency): a reader who never reaches /running-now and
    // doesn't hover skimmed "the trust layer (hestia)" past — the whole site uses Term(gloss)
    // order ("Energy Budget (ATP)"), so a leading gloss with the term in parens reads as noise.
    // Flip to the site-standard term-first form so the definition lands non-hover, at first read.
    line: "this isn't only theory — hestia (the trust layer) and the hub (a runnable Web4 society) are public, AGPL code you can run yourself — though there's no live network with real users yet.",
  },
};

export default function InProduction({
  concept = "stack",
}: {
  concept?: keyof typeof CONCEPTS;
}) {
  const c = CONCEPTS[concept] ?? CONCEPTS["stack"];
  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 my-6 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
        <MaturityBadge tier={c.tier} /> Running now
      </span>
      <span className="text-gray-300">{glossLine(c.line)}</span>
      <Link
        href="/running-now"
        className="text-emerald-400 underline hover:text-emerald-300 whitespace-nowrap"
      >
        See what&apos;s deployed →
      </Link>
    </div>
  );
}
