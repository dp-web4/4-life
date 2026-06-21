// InProduction — a standard, pre-vetted bridge from a concept to its deployed reality.
// The copy lives HERE (public-repo-grounded, disclosure-safe: "the tool you can run",
// never the private fleet), so a page just places <InProduction concept="witness-chain" />
// with zero free-form per-page text. Tier honesty: only claim "running" for what hestia's
// public README lists as built+working; the hub is "reference"; federation is spec-only.

import Link from "next/link";
import MaturityBadge, { MaturityTier } from "./MaturityBadge";

type Entry = { tier: MaturityTier; line: string };

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
    line: "this isn't only theory — the trust layer (hestia) and a Web4 society (the hub) are deployed in public, AGPL code.",
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
      <span className="text-gray-300">{c.line}</span>
      <Link
        href="/running-now"
        className="text-emerald-400 underline hover:text-emerald-300 whitespace-nowrap"
      >
        See what&apos;s deployed →
      </Link>
    </div>
  );
}
