import Link from "next/link";

/**
 * NewcomerOrientationBanner - a single compact row at the top of the "deployed
 * reality" pages (/running-now, /hestia, /hub).
 *
 * Why: the June-21 naive-visitor browse (first test of these pages) reported that
 * all three "read like internal docs" - they tour already-running software and
 * assume the Web4 vocabulary (LCT, T3/V3, witness chain, sealed channels) before
 * defining it, and a newcomer can reach them before learning any of it. Rather
 * than gloss every term inline (heavier, risks density), steer the newcomer back
 * to the 2-minute TL;DR first. Catches newcomers regardless of arrival path.
 *
 * Kept to ONE skippable row (not a card) so a returning visitor who already knows
 * the vocabulary scrolls past trivially. `accent` lets each page keep its theme.
 *
 * Jul-14 (seams-integrity pass): "software that's already running" → "real,
 * runnable software". This banner renders on /hub too, where the software is
 * canonically Reference tier - runnable but NOT running (running-now's badge
 * legend: "runnable is not the same as running"). The wording must be true on
 * all three host pages; each page states its own tier in its own copy.
 *
 * June-22 (first newcomer test of the banner): it worked ("a real save") but read
 * as a pure redirect/dead-end - no reason to return, no mental picture of what's
 * here. Closing clause now adds both: a reason-to-return promise ("the proof Web4
 * works in practice") and a plain-language picture ("real, open-source software you
 * can run yourself"), accurate across all 3 pages (trust-layer daemon + society hub).
 */
export default function NewcomerOrientationBanner({
  accent = "#34d399",
}: {
  accent?: string;
}) {
  return (
    <div
      className="max-w-4xl mx-auto mb-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-lg border bg-white/5 px-4 py-2.5 text-sm text-gray-400 leading-relaxed"
      style={{ borderColor: `${accent}55` }}
    >
      <span className="font-medium text-gray-300">New to Web4?</span>
      <span>
        This page tours real, runnable software, so it assumes the
        vocabulary (LCT, trust tensors, witness chain). If those terms are new,
        start with the{" "}
        <Link
          href="/tldr"
          className="underline underline-offset-2 hover:opacity-80"
          style={{ color: accent }}
        >
          2-minute TL;DR
        </Link>
        , then come back - what&apos;s here is real, open-source software you
        can run yourself, the proof Web4 works in practice and not just on paper.
        Every term is spelled out in the TL;DR; definitions also live in the glossary
        (<strong>Aa</strong>, bottom-left).
      </span>
    </div>
  );
}
