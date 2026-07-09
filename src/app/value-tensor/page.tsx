"use client";

/**
 * /value-tensor — V3's own page.
 *
 * Jul-9 visitor MEDIUM: "V3 does real work (rates output, feeds the trust update, drives ATP
 * recharge) but has no page of its own — only a subsection on the T3 page... It feels like a
 * first-class concept living as a subsection of another concept."
 *
 * Everything here MOVED off /trust-tensor rather than being rewritten. On that page V3 sat
 * behind a default-collapsed expand gate — a gate added to fix the opposite friction (May-4:
 * "V3 mid-page overload"). The two frictions could not both be fixed on one page. /trust-tensor
 * keeps the always-visible V3 teaser (eight browses of iteration) and links here.
 *
 * Numbers are load-bearing and shared with that teaser (V3 = 0.75 niche research vs 0.33
 * clickbait) and with /atp-economics. Do not change one surface alone.
 */

import Link from "next/link";
import { useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import V3OutputScorer from "@/components/V3OutputScorer";
import { trackPageVisit } from "@/lib/exploration";

export default function ValueTensorPage() {
  useEffect(() => {
    trackPageVisit('value-tensor');
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-100 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs currentPath="/value-tensor" />
        </div>

        {/* Hero */}
        <section className="max-w-4xl mx-auto">
          <div className="text-xs uppercase tracking-wide text-purple-400 font-semibold mb-2">
            Core concept · V3
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            The Value Tensor
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            Reputation tells you whether to trust a <em>person</em>. It doesn&apos;t tell you whether
            a particular <em>thing they made</em> is any good. The Value Tensor &mdash; V3 &mdash; scores
            the work.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            Concretely: if Alice writes a tutorial, V3 grades <em>the tutorial</em> (useful? true? sound?);{" "}
            <Link href="/trust-tensor" className="text-sky-400 hover:text-sky-300 underline">T3</Link>{" "}
            grades <em>Alice</em> (do her talent, training, and temperament fit the task). The same person
            can produce brilliant work one week and sloppy work the next, and V3 is what notices.
          </p>

          {/* Key distinction callout — moved from the V3 Output Scorer on /trust-tensor */}
          <div className="bg-gradient-to-r from-sky-950/40 to-purple-950/40 border border-sky-800/30 rounded-xl p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-semibold">T3</span>
                <span className="text-gray-400">measures</span>
                <span className="text-sky-300 font-medium">who you are</span>
              </div>
              <span className="text-gray-600">|</span>
              <div className="flex items-center gap-2">
                <span className="text-purple-400 font-semibold">V3</span>
                <span className="text-gray-400">measures</span>
                <span className="text-purple-300 font-medium">what you produce</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Both feed into ATP rewards. A trusted person (high T3) who produces poor work (low V3) still earns less.</p>
          </div>

          <p className="text-sm text-gray-500">
            <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-purple-400 hover:text-purple-300 cursor-pointer">
              ↓ Score some outputs yourself below
            </a>
          </p>
        </section>

        {/* The three dimensions */}
        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-2 text-gray-100">
            Three Questions About Any Piece of Work
          </h2>
          <p className="text-gray-400 mb-4">
            Every output in Web4 gets scored across three dimensions &mdash; and the weights are designed
            to reward truth over popularity.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Don&apos;t worry about memorizing six terms at once. The key insight is simple: T3 = your reputation as a person, V3 = the quality of a specific piece of work. The three V3 dimensions below just break down &ldquo;quality&rdquo; into usefulness, truthfulness, and soundness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-sky-950/30 to-gray-900 border border-sky-800/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💰</span>
                <h3 className="text-lg font-semibold text-sky-400">Valuation</h3>
                <span className="text-xs text-gray-500 ml-auto">weight: 0.30</span>
              </div>
              <p className="text-sm text-purple-300/80 mb-1">= &ldquo;Was it useful?&rdquo;</p>
              <p className="text-sm text-gray-400">Measured by recipient satisfaction and ATP earned vs expected.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-950/30 to-gray-900 border border-purple-800/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔍</span>
                <h3 className="text-lg font-semibold text-purple-400">Veracity</h3>
                <span className="text-xs text-gray-500 ml-auto">weight: 0.35</span>
              </div>
              <p className="text-sm text-purple-300/80 mb-1">= &ldquo;Was it true?&rdquo;</p>
              <p className="text-sm text-gray-400">Verified by external validation and witness attestation &mdash; a recorded confirmation from an independent party that it actually happened.</p>
            </div>
            <div className="bg-gradient-to-br from-green-950/30 to-gray-900 border border-green-800/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✅</span>
                <h3 className="text-lg font-semibold text-green-400">Validity</h3>
                <span className="text-xs text-gray-500 ml-auto">weight: 0.35</span>
              </div>
              <p className="text-sm text-purple-300/80 mb-1">= &ldquo;Was it sound?&rdquo;</p>
              <p className="text-sm text-gray-400">Confirmed by receipt, logical consistency, and actual delivery.</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Notice: Veracity + Validity (0.70 combined) outweigh Valuation (0.30). Web4 rewards truth and rigor over popularity by design.
          </p>
        </section>

        {/* Who scores V3 — Jul-9 visitor Unanswered Q7: "Who assigns the V3 score to my work,
            and what stops that person from lying?" The answer existed but was double-buried: a
            <details> inside a gated section. Same prose, surfaced. Do not re-collapse it. */}
        <section id="who-scores" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-2 text-gray-100">
            Who Assigns These Scores?
          </h2>
          <p className="text-gray-400 mb-6">
            Not you &mdash; you never rate your own work. And not any one other party either. Each dimension
            is scored by a different mechanism, which is what stops any single scorer from simply lying.
          </p>

          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 space-y-3 text-sm text-gray-400">
            <p className="m-0">
              <strong className="text-sky-400">Valuation</strong> is scored by the <em>recipient</em> of
              an output. When someone receives your work, they confirm whether it was useful via the VCM
              (Value Confirmation Message). This is like leaving a receipt &mdash; &ldquo;yes, this helped me.&rdquo;
            </p>
            <p className="m-0">
              <strong className="text-purple-400">Veracity</strong> is scored through <em>witness attestation</em> and
              external validation. Your LCT device witnesses verify that you actually did what you claim.
              For factual claims, other trusted entities in the same domain can challenge or corroborate.
              Think peer review: your claim is only as strong as the evidence your witnesses can attest to.
            </p>
            <p className="m-0">
              <strong className="text-green-400">Validity</strong> is scored by <em>structural verification</em> &mdash;
              did the output actually arrive? Is it logically consistent? Receipt confirmation proves delivery,
              and the system checks internal consistency (e.g., a code review that contradicts itself scores low).
              This is the most automated dimension &mdash; much of it can be verified without human judgment.
            </p>
            <p className="m-0 text-gray-500 text-xs border-t border-gray-700/50 pt-3">
              In short: Valuation = the recipient judges usefulness. Veracity = witnesses and peers judge truthfulness. Validity = the system verifies delivery and consistency. No single party controls all three dimensions.
            </p>
          </div>
        </section>

        {/* Interactive scorer. `v3-output-scorer` is the historical anchor name — cross-page
            links from atp-economics/why-web4/glossary point at it. Keep the id. */}
        <section id="v3-output-scorer" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
          <h2 id="try-it" className="text-3xl font-bold mb-2 text-gray-100 scroll-mt-24">
            Try It: What Does Web4 Actually Reward?
          </h2>
          <p className="text-gray-400 mb-6">
            Five pieces of work, scored by the same weights. Watch what happens to the one that gets
            50,000 views.
          </p>
          <V3OutputScorer />
        </section>

        {/* T3/V3 bridge — moved from /trust-tensor (visitor friction Mar 15-16; Apr 22 L9 expand
            V3 acronym). The worked example (10 ATP → 5.6 / 2.8) is quoted nowhere else; the
            "consistently producing high-V3 work raises your T3" clause is mirrored in the
            /trust-tensor teaser. Keep them in agreement. */}
        <section id="v3-and-t3" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
          <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-700/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-100">
              How T3 and V3 Work Together
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              T3 measures <strong className="text-sky-400">who you are</strong> (your trustworthiness as a person).
              V3 measures <strong className="text-purple-400">what you produce</strong> (the quality of each specific output).
              They&apos;re separate scores that feed into a single outcome: <strong>how much ATP you earn</strong>.
            </p>
            {/* Flow diagram: Actions → V3 → T3 ↔ ATP */}
            <div className="mb-6">
              {/* Pipeline row */}
              <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-0">
                {/* Step 1: Action */}
                <div className="flex-1 bg-gray-800/60 border border-gray-700/50 rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-4 text-center">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-amber-400 font-bold text-sm">1. You Act</div>
                  <div className="text-xs text-gray-400 mt-1">Post, review, help, build</div>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-center text-gray-600 py-1 md:py-0 md:px-0">
                  <span className="hidden md:block text-lg">→</span>
                  <span className="md:hidden text-lg">↓</span>
                </div>
                {/* Step 2: V3 */}
                <div className="flex-1 bg-purple-950/40 border border-purple-800/30 p-4 text-center">
                  <div className="text-2xl mb-1">📊</div>
                  <div className="text-purple-400 font-bold text-sm">2. Recipients Score It</div>
                  <div className="text-xs text-gray-400 mt-1">V3: Valuation · Veracity · Validity</div>
                  <div className="text-xs text-gray-500 mt-1">Scored per output</div>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-center text-gray-600 py-1 md:py-0 md:px-0">
                  <span className="hidden md:block text-lg">→</span>
                  <span className="md:hidden text-lg">↓</span>
                </div>
                {/* Step 3: T3 update */}
                <div className="flex-1 bg-sky-950/40 border border-sky-800/30 p-4 text-center">
                  <div className="text-2xl mb-1">📈</div>
                  <div className="text-sky-400 font-bold text-sm">3. Reputation Updates</div>
                  <div className="text-xs text-gray-400 mt-1">T3: Talent · Training · Temperament</div>
                  <div className="text-xs text-gray-500 mt-1">Builds slowly over many actions</div>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-center text-gray-600 py-1 md:py-0 md:px-0">
                  <span className="hidden md:block text-lg">→</span>
                  <span className="md:hidden text-lg">↓</span>
                </div>
                {/* Step 4: ATP */}
                <div className="flex-1 bg-emerald-950/40 border border-emerald-800/30 rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-4 text-center">
                  <div className="text-2xl mb-1">🔋</div>
                  <div className="text-emerald-400 font-bold text-sm">4. ATP Reward</div>
                  <div className="text-xs text-gray-400 mt-1">Earnings = T3 × V3 × base rate</div>
                  <div className="text-xs text-gray-500 mt-1">Fuels your next actions</div>
                </div>
              </div>
              {/* Feedback loop annotation */}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                <span className="hidden md:inline">↰</span>
                <span>Feedback loop: ATP fuels more actions → more V3 scores → T3 evolves → ATP changes</span>
                <span className="hidden md:inline">↱</span>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
              <p className="mb-2">
                <strong className="text-gray-200">The feedback loop:</strong> High T3 (trusted person) + High V3 (great work) = maximum ATP reward.
                But a trusted person who produces sloppy work (high T3, low V3) earns less than their reputation suggests.
                And a newcomer who produces brilliant work (low T3, high V3) earns more than their reputation would predict.
              </p>
              <div className="mt-3 mb-2 bg-gray-950/60 border border-gray-800 rounded p-3 font-mono text-xs">
                <div className="text-gray-500 mb-1">Worked example — a task with a base reward of 10 ATP:</div>
                <div className="text-gray-300">T3 = 0.7  ×  V3 = 0.8  ×  base = 10 ATP  →  <span className="text-emerald-400">5.6 ATP earned</span></div>
                <div className="text-gray-500 mt-2">Same task, half the trust (T3 = 0.35):</div>
                <div className="text-gray-300">0.35  ×  0.8  ×  10  →  <span className="text-amber-400">2.8 ATP earned</span> — half the reward for the same output</div>
              </div>
              <p className="text-gray-400 text-xs">
                Over time, T3 and V3 converge: consistently producing high-V3 work raises your T3.
                Consistently producing low-V3 work drags your T3 down. Your reputation tracks your actual output quality.
              </p>
            </div>
          </div>
        </section>

        {/* Where V3 shows up */}
        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-100">Where You&apos;ll Meet V3 Again</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/atp-economics" className="block bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 hover:border-emerald-600/60 transition-colors">
              <div className="text-emerald-400 font-semibold mb-1">Energy Economics →</div>
              <p className="text-sm text-gray-400 m-0">Your V3 score decides how much of the energy you spent comes back.</p>
            </Link>
            <Link href="/trust-tensor" className="block bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 hover:border-sky-600/60 transition-colors">
              <div className="text-sky-400 font-semibold mb-1">Trust Tensor →</div>
              <p className="text-sm text-gray-400 m-0">The sibling tensor. V3 scores the work; T3 scores the worker.</p>
            </Link>
            <Link href="/society-simulator" className="block bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 hover:border-purple-600/60 transition-colors">
              <div className="text-purple-400 font-semibold mb-1">Society Simulator →</div>
              <p className="text-sm text-gray-400 m-0">Watch V3 and T3 drive a whole population, not one agent.</p>
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto">
          <ExplorerNav currentPath="/value-tensor" />
          <RelatedConcepts currentPath="/value-tensor" />
        </div>
      </div>
    </>
  );
}
