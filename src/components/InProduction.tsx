// InProduction - a standard, pre-vetted bridge from a concept to its deployed reality.
// The copy lives HERE (public-repo-grounded, disclosure-safe: "the tool you can run",
// never the private fleet), so a page just places <InProduction concept="witness-chain" />
// with zero free-form per-page text. Tier honesty: only claim "running" for what hestia's
// public README lists as built+working; the hub is "reference"; federation is spec-only.
//
// SOURCING NOTE (Aug-05, from the Aug-01 visitor's Unanswered Q8). That rule above names a
// source, and the source MOVED. hestia/README.md used to carry a two-state status table
// (Working / not) whose L192 listed "Constellation: Working". hestia's 2026-08-01
// documentation audit (hestia/docs/STATUS_AUDIT_2026-08-01.md) replaced it with THREE
// states, on the finding that one "Working" column cannot distinguish "exercised daily,
// with chain entries behind it" from "code and tests exist, nobody has driven the path".
// Device constellation moved to the second of those: 1,183 lines, 21 unit tests, wired
// into the hub handshake, and ZERO constellation events in the live chain window (never
// driven on a real second device). So `constellation` came off the built+working list this
// component keys on, and its tier moved running -> reference to match. If you go read
// README.md:192 and find "Working", you are reading the superseded table; the three-tier
// audit is the current source. Do NOT import the audit's internal tier words
// ("Measured"/"Plumbed") into visitor-facing copy - translate them, as the line below does.

import Link from "next/link";
import MaturityBadge, { MaturityTier } from "./MaturityBadge";
import TermTooltip from "./TermTooltip";

type Entry = { tier: MaturityTier; line: string };

// Jul-4 visitor HIGH: "hestia" and "the hub" appear on this banner across ~22 pages as
// bare proper nouns, only defined at /running-now (which a linear reader reaches LAST).
// Wrap each in-line occurrence in a TermTooltip so the definition is one hover away
// everywhere the banner appears - the visitor's own suggested fix ("a hover-tooltip like
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
    // Aug-05: "on its own hardware" -> "on its own machine". Tier is UNCHANGED and correct;
    // this is a disambiguation, not a demotion. This banner renders on exactly one page,
    // /lct-explainer, whose entire subject is hardware binding, and that page now says ~1,850
    // lines below the banner that hardware binding is trait contracts only and the interfaces
    // are stubs. "On its own hardware" there invites the TPM reading and fights that line.
    // The local-first reading was what was meant and is plainly true; "machine" says it and
    // matches /running-now:422 ("an identity created on your machine").
    tier: "running",
    line: "hestia gives any entity a real cryptographic LCT identity on its own machine - this isn't only a diagram.",
  },
  "trust-tensor": {
    tier: "running",
    line: "hestia evolves real T3/V3 trust tensors from the outcomes of your actions, recorded as you go.",
  },
  "witness-chain": {
    tier: "running",
    line: "hestia keeps a real hash-linked witness chain of what happened - the deployed version of the chains shown here.",
  },
  "delegation": {
    tier: "running",
    line: "hestia grants scoped, signed, revocable authority between entities for real, today.",
  },
  "constellation": {
    tier: "reference",
    line: "hestia ships the constellation code - linking devices into a verifying set, wired into the hub handshake - but the multi-device path has not yet been driven on a real second device.",
  },
  "policy": {
    tier: "running",
    line: "hestia evaluates a policy gate before each consequential act - the deployed version of this check.",
  },
  "society": {
    tier: "reference",
    line: "the hub is a runnable Web4 society - seven roles, a signed charter, a witnessed ledger - that any community can fork.",
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
    line: "ATP/ADP is a typed primitive in the web4-core reference library - specified and built, not hand-waved.",
  },
  "coherence": {
    tier: "reference",
    line: "the coherence/trust math lives in the web4-trust-core reference library that the deployed daemon builds on.",
  },
  "stack": {
    tier: "running",
    // Jul-10 visitor LOW (fired #431 contingency): a reader who never reaches /running-now and
    // doesn't hover skimmed "the trust layer (hestia)" past - the whole site uses Term(gloss)
    // order ("Energy Budget (ATP)"), so a leading gloss with the term in parens reads as noise.
    // Flip to the site-standard term-first form so the definition lands non-hover, at first read.
    line: "this isn't only theory - hestia (the trust layer) and the hub (a runnable Web4 society) are public, AGPL code you can run yourself - though there's no live network with real users yet.",
  },
};

// Jul-13 visitor MEDIUM ("fix first"): the header read "Running Running nowthis isn't only
// theory…" on every page carrying this banner. Two defects, one render: (1) the MaturityBadge
// label for tier="running" is the word "Running", and the header repeated it as "Running now";
// (2) header/body/link were flex siblings with no whitespace text nodes, so the visual gap was
// CSS-only and DOM text / copy-paste jammed the words together ("nowthis"). Fix: tier-neutral
// header ("In the real world:") so the badge alone carries the tier - which also stops
// reference-tier entries being captioned "Running now" (over-claiming; see MaturityBadge's
// tier-honesty comment) - and normal inline flow with explicit {" "} spaces between the parts.
// The /running-now hook lives in the "See what's deployed →" link, unchanged.
export default function InProduction({
  concept = "stack",
}: {
  concept?: keyof typeof CONCEPTS;
}) {
  const c = CONCEPTS[concept] ?? CONCEPTS["stack"];
  return (
    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 my-6 text-sm leading-relaxed">
      <span className="inline-flex items-center gap-2 align-middle font-semibold text-emerald-300">
        <MaturityBadge tier={c.tier} /> In the real world:
      </span>{" "}
      <span className="text-gray-300">{glossLine(c.line)}</span>{" "}
      <Link
        href="/running-now"
        className="text-emerald-400 underline hover:text-emerald-300 whitespace-nowrap"
      >
        See what&apos;s deployed →
      </Link>
    </div>
  );
}
