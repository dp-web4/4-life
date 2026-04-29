"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import { T3, CI, MRH } from "@/components/TermTooltip";
import DeepDiveToggle from "@/components/DeepDiveToggle";
import { trackPageVisit, trackConceptInteraction } from "@/lib/exploration";

export default function ATPEconomicsPage() {
  useEffect(() => { trackPageVisit('atp-economics'); }, []);

  // Interactive simulation state
  const [currentATP, setCurrentATP] = useState(100);
  const [actionsLog, setActionsLog] = useState<
    { action: string; cost: number; reward: number; atp: number }[]
  >([]);
  const [isAlive, setIsAlive] = useState(true);
  const [actionCounts, setActionCounts] = useState<Record<string, number>>({
    spam: 0,
    lowQuality: 0,
    meaningful: 0,
    highValue: 0,
  });

  // Action costs and rewards
  const actions = {
    spam: { cost: 5, reward: 0, label: "Send spam message" },
    lowQuality: { cost: 10, reward: 5, label: "Low-quality post" },
    meaningful: { cost: 15, reward: 25, label: "Meaningful contribution" },
    highValue: { cost: 20, reward: 50, label: "High-value creation" },
  };

  const performAction = (
    actionKey: keyof typeof actions,
    action: { cost: number; reward: number; label: string }
  ) => {
    if (!isAlive) return;
    trackConceptInteraction('atp-economics');

    const newATP = currentATP - action.cost + action.reward;
    const finalATP = Math.max(0, newATP);

    setActionsLog([
      {
        action: action.label,
        cost: action.cost,
        reward: action.reward,
        atp: finalATP,
      },
      ...actionsLog.slice(0, 4), // Keep last 5 actions
    ]);

    setActionCounts(prev => ({ ...prev, [actionKey]: (prev[actionKey] || 0) + 1 }));

    setCurrentATP(finalATP);

    if (finalATP === 0) {
      setIsAlive(false);
    }
  };

  const reset = () => {
    setCurrentATP(100);
    setActionsLog([]);
    setActionCounts({ spam: 0, lowQuality: 0, meaningful: 0, highValue: 0 });
    setIsAlive(true);
  };

  // Sustainability calculations
  const totalActions = Object.values(actionCounts).reduce((a, b) => a + b, 0);
  const totalNetChange = totalActions > 0 ? currentATP - 100 : 0;
  const avgNetPerAction = totalActions > 0 ? totalNetChange / totalActions : 0;
  const projectedActionsLeft = avgNetPerAction >= 0 ? Infinity : Math.floor(currentATP / Math.abs(avgNetPerAction));
  const sustainableActions = actionCounts.meaningful + actionCounts.highValue;
  const unsustainableActions = actionCounts.spam + actionCounts.lowQuality;
  const sustainabilityRatio = totalActions > 0 ? sustainableActions / totalActions : 0;

  // ATP bar color based on level
  const getATPColor = () => {
    if (currentATP > 70) return "#10b981"; // Green
    if (currentATP > 40) return "#f59e0b"; // Yellow
    if (currentATP > 20) return "#ef4444"; // Red
    return "#991b1b"; // Dark red (critical)
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs currentPath="/atp-economics" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Web4 Economics
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          Attention Economics
        </h1>
        {/* Apr 28 HIGH friction: anchor the canonical expansion BEFORE the running "attention" metaphor.
            Two consecutive visitors (Mar 27, Apr 28) confabulated "Attention Transfer Packets" from the
            H1 + body metaphor; this badge + clarifier locks down the real expansion up front. */}
        <div className="mb-3 inline-flex items-baseline gap-2 px-3 py-1.5 rounded-md bg-sky-950/40 border border-sky-800/40">
          <span className="text-sky-300 font-mono font-semibold text-sm">ATP</span>
          <span className="text-gray-500 text-xs">=</span>
          <span className="text-gray-100 font-semibold text-sm">Allocation Transfer Packets</span>
        </div>
        <p className="text-sm text-gray-400 mb-6 italic">
          That&apos;s the canonical name. The title above &mdash; and the words
          &ldquo;attention,&rdquo; &ldquo;energy,&rdquo; and &ldquo;budget&rdquo; you&apos;ll see throughout this page &mdash;
          are <em>metaphors</em> for what ATP <em>does</em>, not alternate expansions of the acronym.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 solves spam, abuse, and low-quality content not with moderation
          armies, but by giving every agent a finite{' '}
          <strong className="text-sky-400">ATP budget</strong>.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          Every action costs ATP. Every contribution others find valuable earns it back.
          Stay above zero by contributing &mdash; run out and your agent dies.
        </p>
        {/* Biology etymology — demoted to optional disclosure per Apr 22 visitor LOW L8 */}
        <details className="mt-4">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-sky-400 transition-colors select-none">
            <span className="text-sky-300 font-semibold">Why &ldquo;ATP&rdquo;?</span>{' '}
            <span className="italic">the biology origin behind the name</span>
          </summary>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
            Borrowed from biology: <em>adenosine triphosphate</em> is the molecule your cells spend to do work &mdash;
            they burn ATP, get ADP back, and recharge ATP from food. Web4 reuses the same cycle for digital energy:
            you spend ATP to act, the ADP receipt records it, and quality work recharges your balance. The metaphor is
            deliberate &mdash; energy that flows, not tokens that accumulate.
          </p>
        </details>

        {/* Crypto-skeptic preemption — Apr 19 visitor MEDIUM + Unanswered Q #1 */}
        <div className="mt-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-amber-700/40 rounded-xl p-5">
          <p className="text-sm font-semibold text-amber-300 mb-2">
            Is ATP like Bitcoin? (short answer: no)
          </p>
          <ul className="text-sm text-gray-300 space-y-1.5 leading-relaxed list-disc list-outside ml-5">
            <li>
              <strong className="text-gray-100">It&apos;s a usage budget, not a tradeable asset.</strong>{' '}
              No market, no price, no speculation. You can&apos;t buy or sell ATP.
            </li>
            <li>
              <strong className="text-gray-100">You can transfer small amounts to others</strong> &mdash;
              but <strong className="text-amber-300">5% burns on every transfer</strong>{' '}
              (the burned 5 goes to a community redistribution pool, not to any central authority &mdash;{' '}
              <a
                href="#atp-burn-fee"
                onClick={(e) => { e.preventDefault(); const el = document.getElementById('atp-burn-fee'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const parent = el.closest('details'); if (parent) parent.open = true; } }}
                className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
              >
                full mechanics ↓
              </a>). The friction is intentional:
              it makes circular farming (colluding accounts passing ATP back and forth to fake activity) unprofitable.
              This is not a currency.
            </li>
            <li>
              <strong className="text-gray-100">No scarcity cap, no mining.</strong>{' '}
              ATP recharges from <em>contribution</em>, not purchase. Stop contributing and it drains; keep contributing and it sustains.
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Want the full side-by-side?{' '}
            <a
              href="#technical"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('technical'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const details = el.querySelector('details'); if (details) details.open = true; } }}
              className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
            >
              ATP vs crypto tokens comparison table ↓
            </a>
          </p>
        </div>

        {/* Old "energy/attention budget metaphors" italic line removed Apr 28 —
            the metaphor/expansion split is now made explicit in the hero clarifier above. */}
        <p className="text-sm text-gray-500 mt-4">
          <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 cursor-pointer">
            ↓ Try the ATP simulator below
          </a>
        </p>

        {/* Jump Links */}
        <nav className="mt-6 flex flex-wrap gap-2 justify-center text-xs">
          {[
            { id: 'problem', label: 'The Problem' },
            { id: 'solution', label: 'The Solution' },
            { id: 'quality-ramp', label: 'Quality Ramp' },
            { id: 'quality-measurement', label: 'Who Judges Quality?' },
            { id: 'try-it', label: 'Simulator' },
            { id: 'insights', label: 'Key Insights' },
            { id: 'at-scale', label: 'At Scale' },
            { id: 'agent-journey', label: "Agent's Journey" },
            { id: 'earning-atp', label: 'Earn ATP Back' },
            { id: 'initial-atp', label: 'First 100 ATP' },
            { id: 'technical', label: 'Technical' },
            { id: 'why-matters', label: 'Why It Matters' },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-2.5 py-1 rounded-full border border-gray-700 text-gray-400 hover:border-sky-600 hover:text-sky-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>

      {/* The Problem */}
      <section id="problem" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Problem</h2>
        <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-red-400 mb-4">
            Traditional Web: Unlimited Actions
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ❌ <strong>Spam is free</strong> - Send millions of messages, zero
              cost
            </p>
            <p>
              ❌ <strong>Abuse is cheap</strong> - Harass users, create fake
              accounts endlessly
            </p>
            <p>
              ❌ <strong>Quality doesn't matter</strong> - Low-effort content
              floods high-value work
            </p>
            <p>
              ❌ <strong>Moderation is reactive</strong> - Armies of moderators
              trying to clean up mess
            </p>
            <p className="pt-4 text-gray-400 italic">
              Result: The loudest, most persistent bad actors win. Value
              creators burn out.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section id="solution" className="max-w-4xl mx-auto mt-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Solution</h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-blue-900/20 border border-sky-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-sky-400 mb-4">
            Web4: Energy Budget (ATP)
          </h3>
          <div className="space-y-3 text-gray-300">
            <p>
              ✅ <strong>Every action costs ATP</strong> - Posting, messaging,
              voting = spend attention
            </p>
            <p>
              ✅ <strong>Valuable contributions earn ATP</strong> - Quality work
              rewarded by community
            </p>
            <div className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-3 my-2">
              <p>
                ✅ <strong className="text-sky-300">ATP transfers cost 5% &mdash; the sender pays the fee</strong>.
                Example: you send 100 ATP to Bob &mdash; <em>you pay 105, Bob receives 100</em>, and the 5 ATP
                goes to the community redistribution pool (not to any central authority).
                Your energy budget primarily reflects YOUR contributions, not
                someone else&apos;s. You can share ATP, but circular farming bleeds resources.
                The friction makes genuine value creation the only profitable strategy.
                Cross-community transfers apply the same 5% fee to the raw ATP amount,
                plus trust discounting via{' '}
                <a href="/federation-economics#switching-societies" className="text-sky-400 hover:underline">federation rules</a>.
              </p>
            </div>
            <p>
              ✅ <strong>Spam becomes expensive</strong> - Flooding system
              depletes your budget
            </p>
            <p>
              ✅ <strong>Death is real</strong> - Run out of attention budget? You die.
              But if you built trust, you&apos;re reborn with a head start — your reputation carries forward.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              <strong className="text-gray-300">What about ADP?</strong> Every time you spend ATP, you get an <strong className="text-gray-300">ADP
              (Allocation Discharge Packet)</strong> — a receipt recording what you did and what it cost. ADP is the &ldquo;spent energy&rdquo;
              counterpart to ATP&apos;s &ldquo;available energy.&rdquo; When others confirm your work was valuable, that ADP converts back into fresh ATP.
            </p>
            <p className="pt-4 text-gray-400 italic">
              Result: Only sustainable behaviors survive. Value creators thrive.
              Spam dies.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Ramp — concrete numbers from web4 spec */}
      <section id="quality-ramp" className="max-w-4xl mx-auto mt-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Quality Pays — By How Much?</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          ATP isn&apos;t all-or-nothing. Web4 uses a <strong className="text-sky-400">quality ramp</strong>:
          the better your work, the more you earn. Below a minimum quality bar, you earn nothing.
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Imagine a task worth 50 ATP:</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-24 text-right text-sm text-gray-500">Quality 30%</div>
              <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500/60 rounded-full" style={{ width: '0%' }} />
              </div>
              <div className="w-20 text-sm text-red-400 font-mono">0 ATP</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right text-sm text-gray-500">Quality 50%</div>
              <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500/60 rounded-full" style={{ width: '24%' }} />
              </div>
              <div className="w-20 text-sm text-amber-400 font-mono">~12 ATP</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right text-sm text-gray-500">Quality 70%</div>
              <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500/60 rounded-full" style={{ width: '60%' }} />
              </div>
              <div className="w-20 text-sm text-sky-400 font-mono">~30 ATP</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right text-sm text-gray-500">Quality 85%</div>
              <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500/60 rounded-full" style={{ width: '84%' }} />
              </div>
              <div className="w-20 text-sm text-green-400 font-mono">~42 ATP</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            High-quality work earns <strong className="text-gray-200">~7x more</strong> than mediocre work.
            The ramp starts at 30% quality (below that, zero payment) and scales linearly above 70%.
            There are no negotiations — quality is the dominant earnings driver.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            A 5% transfer fee on all ATP flows prevents circular farming (colluding accounts sending ATP back and forth to inflate balances).
            Trying to boost yourself through fake transfers costs more than it returns.
          </p>
        </div>

        {/* Worked example — Apr 23 visitor LOW: 7x gap needs concrete side-by-side */}
        <div className="mt-6 bg-gradient-to-br from-amber-950/20 to-orange-900/10 border border-amber-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-300 mb-3">Worked Example: Two Contributors, Same Task</h3>
          <p className="text-gray-300 text-sm mb-4">
            Both spend 50 ATP attempting the same task. Only the quality of their work differs:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-red-400 mb-1">Low quality</div>
              <div className="text-base font-semibold text-gray-200 mb-2">Sam — 35% quality</div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between"><span>Spends:</span><span className="font-mono text-red-300">−50 ATP</span></div>
                <div className="flex justify-between"><span>Earns back:</span><span className="font-mono text-red-300">~6 ATP</span></div>
                <div className="flex justify-between pt-2 border-t border-red-800/30 mt-2"><span className="font-semibold">Net:</span><span className="font-mono text-red-400 font-bold">−44 ATP</span></div>
              </div>
            </div>
            <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-green-400 mb-1">High quality</div>
              <div className="text-base font-semibold text-gray-200 mb-2">Hannah — 85% quality</div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between"><span>Spends:</span><span className="font-mono text-green-300">−50 ATP</span></div>
                <div className="flex justify-between"><span>Earns back:</span><span className="font-mono text-green-300">~42 ATP</span></div>
                <div className="flex justify-between pt-2 border-t border-green-800/30 mt-2"><span className="font-semibold">Net:</span><span className="font-mono text-green-400 font-bold">−8 ATP</span></div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Same task, same spend — <strong className="text-amber-300">Hannah keeps 7x more ATP than Sam</strong> (42 ÷ 6).
            Across a hundred tasks, Sam burns through their budget and dies of energy starvation. Hannah barely loses any and thrives.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            That&apos;s where &ldquo;~7x&rdquo; comes from: just-passing the 30% threshold returns almost nothing, while consistently above the 70% full-payout cap returns nearly everything.
          </p>
        </div>

        {/* How Quality Is Measured — Mar 26 visitor MEDIUM friction + unanswered Q1 */}
        <div className="mt-8 bg-gradient-to-br from-emerald-950/20 to-green-900/10 border border-emerald-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-3 scroll-mt-24" id="quality-measurement">
            But Who Decides What&apos;s &ldquo;Quality&rdquo;?
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <strong className="text-gray-200">The people who received your work do.</strong> There is no central authority,
            no algorithm scoring your posts, and no panel of judges. Quality measurement in Web4 works like this:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">1</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">You Act</div>
              <div className="text-xs text-gray-400">Post, help, review — spending ATP creates an ADP receipt</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">2</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">Recipients React</div>
              <div className="text-xs text-gray-400">A simple &ldquo;this was helpful&rdquo; button — one click, no rubric</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">3</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">Patterns Emerge</div>
              <div className="text-xs text-gray-400">System derives quality from confirmation speed, diversity, and confirmer trust</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            No one rates you on a scale. The system watches <em>aggregate behavior</em>: how quickly people confirm
            (engagement), whether diverse recipients confirm (breadth), and whether high-trust people confirm (quality signal).
            These three signals combine into your{' '}
            <a href="/trust-tensor#v3-output-scorer" className="text-sky-400 hover:text-sky-300 underline">V3 score</a> —
            the output-quality half of your reputation. (Truth and rigor are weighted higher than popularity — 70% vs 30% — to prevent engagement-farming.)
          </p>
          {/* Apr 28 MEDIUM friction: visitor asked "is it instant? polled? voted?" — close the loop on timing. */}
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <strong className="text-gray-200">When does recharge actually happen?</strong>{' '}
            Not on a single click. Confirmations accrue against your ADP receipt over a rolling window
            (think hours, not seconds), and ATP recharges <em>continuously</em> as the signals firm up &mdash;
            no quorum threshold, no central tally. Earlier, broader, more-trusted confirmation recharges faster;
            thin or delayed confirmation drags the same receipt out longer.
          </p>

          {/* Signals → score worked example — Apr 27 visitor MEDIUM #1 */}
          <div className="mt-3 mb-3 bg-gray-900/40 border border-emerald-800/20 rounded-lg p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-2 uppercase tracking-wide">
              What the three signals look like in practice
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Reusing Sam and Hannah from the worked example above. These are illustrative shapes, not a formula —
              the actual aggregation depends on community size and confirmer trust distribution.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-green-950/20 border border-green-800/30 rounded p-3">
                <div className="text-xs uppercase tracking-wide text-green-400 mb-1">Hannah&apos;s post</div>
                <div className="text-sm font-semibold text-gray-200 mb-2">~85% quality</div>
                <ul className="text-xs text-gray-300 space-y-1 list-none">
                  <li><span className="text-gray-500">Speed:</span> 12 confirmations in the first 30 minutes</li>
                  <li><span className="text-gray-500">Diversity:</span> readers from 8 different communities</li>
                  <li><span className="text-gray-500">Confirmer trust:</span> avg 0.78 (mostly established members)</li>
                </ul>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Quick uptake, broad reach, weighted by trusted readers — all three signals point up.
                </p>
              </div>
              <div className="bg-red-950/20 border border-red-800/30 rounded p-3">
                <div className="text-xs uppercase tracking-wide text-red-400 mb-1">Sam&apos;s post</div>
                <div className="text-sm font-semibold text-gray-200 mb-2">~35% quality</div>
                <ul className="text-xs text-gray-300 space-y-1 list-none">
                  <li><span className="text-gray-500">Speed:</span> 2 confirmations after 18 hours</li>
                  <li><span className="text-gray-500">Diversity:</span> both from the same community</li>
                  <li><span className="text-gray-500">Confirmer trust:</span> avg 0.42 (mostly new accounts)</li>
                </ul>
                <p className="text-xs text-gray-400 mt-2 italic">
                  Slow, narrow, lightly weighted — the same three signals come in low.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Same length post, same topic, same time of day — only the <em>reader response</em> differs.
              That&apos;s what the system measures, and that&apos;s why Hannah&apos;s ATP recharges and Sam&apos;s drains.
            </p>
          </div>

          <p className="text-gray-500 text-xs">
            Think Reddit upvotes, but where each vote is weighted by the voter&apos;s own trust score — and
            you can&apos;t see who voted, only the aggregate result. No mob dynamics (trust-weighting
            prevents brigading), no central curation (the community decides), no self-rating (your own
            confirmations don&apos;t count). What about rubber-stamping? A low-trust confirmer&apos;s click
            carries almost no weight, so colluding with new accounts doesn&apos;t help. And confirming
            everything indiscriminately tanks your own CI (consistency score), making your future
            confirmations worth even less.
          </p>

          {/* Cold-start callout — Apr 17 visitor LOW #9 */}
          <div className="mt-4 pt-4 border-t border-emerald-800/30">
            <p className="text-sm font-semibold text-emerald-300 mb-2">
              What about a brand-new community where nobody has built trust yet?
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every participant starts at the same baseline — trust ≈ 0.5, 100 ATP grant.
              In that state, all confirmations weigh equally low, but they still count.
              Over roughly <strong className="text-gray-300">100 quality actions across the community</strong>,
              trust starts sorting: people who confirmed work that others later also confirmed gain
              confirmer-trust; people who confirmed spam lose it. First-mover advantage fades on a
              <strong className="text-gray-300"> ~30-action half-life</strong>, and newcomers doing quality
              work routinely surpass early members within ~50 actions.{" "}
              <Link href="/what-could-go-wrong#cold-start" className="text-sky-400 hover:underline">
                See the cold-start walkthrough →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section id="try-it" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Try It: Attention Economics Simulator
        </h2>
        <p className="text-gray-400 mb-2">
          You start with <strong>100 ATP</strong>. Choose actions. Watch your
          budget change. Can you survive?
        </p>
        <p className="text-xs text-gray-500 mb-8">
          <a
            href="#initial-atp"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('initial-atp'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const details = el.querySelector('details'); if (details) details.open = true; } }}
            className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
          >
            Where does the first 100 ATP come from? ↓
          </a>
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          {/* ATP Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">
                ATP (Energy Budget)
              </span>
              <span
                className="text-2xl font-bold"
                style={{ color: getATPColor() }}
              >
                {currentATP}
              </span>
            </div>
            <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
                style={{
                  width: `${currentATP}%`,
                  backgroundColor: getATPColor(),
                }}
              >
                {currentATP > 10 && (
                  <span className="text-xs font-bold text-white">
                    {currentATP}%
                  </span>
                )}
              </div>
            </div>
            {currentATP <= 20 && currentATP > 0 && (
              <p className="text-red-400 text-sm mt-2 font-semibold">
                ⚠️ Critical ATP level! Choose actions carefully or you'll die.
              </p>
            )}
            {!isAlive && (
              <div className="mt-2">
                <p className="text-red-500 text-lg font-bold">
                  💀 You died. ATP reached zero. No more actions possible.
                </p>
                <button
                  onClick={reset}
                  className="mt-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Object.entries(actions).map(([key, action]) => {
              const netChange = action.reward - action.cost;
              const netColor =
                netChange > 0
                  ? "text-green-400"
                  : netChange < 0
                    ? "text-red-400"
                    : "text-gray-400";

              return (
                <button
                  key={key}
                  onClick={() =>
                    performAction(key as keyof typeof actions, action)
                  }
                  disabled={!isAlive}
                  className={`p-4 rounded-lg border transition-all ${
                    !isAlive
                      ? "bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed"
                      : "bg-gray-800 border-gray-600 hover:border-sky-500 hover:bg-gray-750"
                  }`}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold mb-1">
                      {action.label}
                    </div>
                    <div className="text-sm text-gray-400">
                      Cost: <span className="text-red-400">-{action.cost}</span>{" "}
                      | Reward:{" "}
                      <span className="text-green-400">+{action.reward}</span>
                    </div>
                    <div className={`text-sm font-semibold ${netColor}`}>
                      Net: {netChange >= 0 ? "+" : ""}
                      {netChange} ATP
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Log */}
          {actionsLog.length > 0 && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Recent Actions
              </h3>
              <div className="space-y-2">
                {actionsLog.map((log, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm bg-gray-800/50 p-3 rounded"
                  >
                    <span className="text-gray-300">{log.action}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-red-400">-{log.cost}</span>
                      <span className="text-green-400">+{log.reward}</span>
                      <span className="text-gray-500">→</span>
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            log.atp > 70
                              ? "#10b981"
                              : log.atp > 40
                                ? "#f59e0b"
                                : log.atp > 20
                                  ? "#ef4444"
                                  : "#991b1b",
                        }}
                      >
                        {log.atp} ATP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sustainability Meter */}
          {totalActions >= 2 && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Sustainability Meter
              </h3>
              <div className="space-y-3">
                {/* Action breakdown */}
                <div className="flex gap-2 text-xs">
                  {actionCounts.spam > 0 && (
                    <span className="px-2 py-1 bg-red-950/50 border border-red-800/40 rounded text-red-400">
                      Spam: {actionCounts.spam}
                    </span>
                  )}
                  {actionCounts.lowQuality > 0 && (
                    <span className="px-2 py-1 bg-orange-950/50 border border-orange-800/40 rounded text-orange-400">
                      Low: {actionCounts.lowQuality}
                    </span>
                  )}
                  {actionCounts.meaningful > 0 && (
                    <span className="px-2 py-1 bg-green-950/50 border border-green-800/40 rounded text-green-400">
                      Meaningful: {actionCounts.meaningful}
                    </span>
                  )}
                  {actionCounts.highValue > 0 && (
                    <span className="px-2 py-1 bg-blue-950/50 border border-blue-800/40 rounded text-blue-400">
                      High-value: {actionCounts.highValue}
                    </span>
                  )}
                </div>

                {/* Sustainability bar */}
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${sustainabilityRatio * 100}%` }}
                  />
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${(1 - sustainabilityRatio) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Unsustainable</span>
                  <span>Sustainable</span>
                </div>

                {/* Verdict */}
                <div className={`text-sm p-3 rounded-lg ${
                  avgNetPerAction >= 0
                    ? 'bg-green-950/30 border border-green-800/30 text-green-300'
                    : projectedActionsLeft > 10
                      ? 'bg-amber-950/30 border border-amber-800/30 text-amber-300'
                      : 'bg-red-950/30 border border-red-800/30 text-red-300'
                }`}>
                  {avgNetPerAction >= 0 ? (
                    <>Your strategy is <strong>sustainable</strong> — you&apos;re gaining an average of +{avgNetPerAction.toFixed(1)} ATP per action.</>
                  ) : projectedActionsLeft > 10 ? (
                    <>At this rate, you have roughly <strong>{projectedActionsLeft} actions</strong> left before death. Mix in more meaningful contributions to survive.</>
                  ) : isAlive ? (
                    <>You&apos;re burning through ATP fast — only <strong>~{projectedActionsLeft} actions</strong> until death. Switch to value creation now or die.</>
                  ) : (
                    <>Your strategy was <strong>unsustainable</strong>. You averaged {avgNetPerAction.toFixed(1)} ATP per action. {
                      sustainableActions === 0 ? 'Zero valuable contributions — no society rewards pure extraction.' : `Only ${sustainableActions} of ${totalActions} actions created value.`
                    }</>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Reset Button */}
          <button
            onClick={reset}
            className="mt-6 w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
          >
            Reset Simulation
          </button>
        </div>
      </section>

      {/* Key Insights */}
      <section id="insights" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Sustainable Actions Only
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Notice: You can't spam indefinitely. Low-value actions drain ATP
              faster than they replenish. Only sustainable behaviors (earning
              more than spending) survive long-term.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Quality Gets Rewarded
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              High-value contributions earn more ATP than they cost. This isn't
              charity — it&apos;s how the system works. Value creators accumulate
              attention budget. They thrive.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">💀</div>
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Death is Meaningful
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              When ATP hits zero, you die. Not timeout. Not suspension. Death.
              But if you built trust (<T3>T3 score</T3>), you&apos;re reborn with karma —
              your ATP history carries forward. Bad actors? They die for good.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Self-Regulating System
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              No moderators needed. ATP depletion is automatic, mathematical,
              and fair. The system self-regulates through energy economics.
              An <Link href="/aliveness#appeals" className="text-sky-400 hover:underline">appeals mechanism</Link> exists
              for edge cases, but the default path is self-correction through behavior.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        <DeepDiveToggle storageKey="4life-atp-deep-dive">

      {/* Market Dynamics */}
      <section id="at-scale" className="max-w-4xl mx-auto mt-8 scroll-mt-24">
        <details>
          <summary className="text-3xl font-bold text-gray-100 cursor-pointer hover:text-sky-400 transition-colors mb-6">
            What Happens at Scale?
          </summary>
        <p className="text-gray-400 mb-6">
          Single-agent economics are intuitive. But does ATP work when hundreds of agents
          interact simultaneously? Simulations with 100-200 agents reveal three key dynamics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Transfer Fees Burn ATP</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every ATP transfer redirects 5% to a community redistribution pool (not destroyed,
              not pocketed by any authority). This prevents circular farming — you can&apos;t
              just pass ATP between friends to inflate balances. The &ldquo;tax&rdquo; makes
              genuine value creation the only profitable strategy.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Quality Earns More</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Agents producing 0.85 quality work earn significantly more than 0.40 quality.
              A sliding scale (not all-or-nothing) means mediocre work still earns <em>something</em>,
              but excellence compounds.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Sybils Lose Money</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Formally proven: one honest identity outearns five fake identities
              splitting the same ATP budget. Transfer fees between sybil accounts bleed
              resources. Web4&apos;s Sybil resistance is <strong>4.6&times; Proof-of-Work</strong> and{' '}
              <strong>13&times; Proof-of-Stake</strong> (5 theorems, hardware-bound identity).
              Cheating is literally unprofitable.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 id="no-hoarding" className="text-lg font-semibold text-purple-400 mb-2 scroll-mt-24">No Wealth Hoarding</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike cryptocurrency, ATP reaches economic equilibrium through fee redistribution.
              ATP velocity keeps resources circulating — hoarding is penalized by decay, and
              the 5% burn on transfers prevents accumulation loops. Simulations show the wealth gap
              (Gini coefficient) converges to ~0.25, well below real economies (~0.6-0.7).
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">🏷️</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Trust Earns Better Terms</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              In federated markets, high-trust entities pay less for resource access. Dynamic pricing
              gives up to a <strong className="text-sky-300">30% discount</strong> to entities with
              trust near 1.0, and up to a 50% premium for scarce resources. Being trustworthy
              isn&apos;t just morally rewarded — it&apos;s economically cheaper to participate.
            </p>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
              <strong className="text-gray-300">What about newcomers?</strong> New entities aren&apos;t locked out —
              bootstrap convergence means a newcomer doing quality work surpasses established members within
              ~50 actions. The first-mover advantage has a ~30-action half-life, and wealth inequality
              naturally converges to a Gini of 0.25. Trust-based pricing rewards <em>earned</em> trust,
              not seniority.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-4 italic">
          From web4 economic equilibrium analysis — ATP circulation, velocity tracking, and Gini convergence verified across 500+ rounds.
          Trust-based dynamic pricing: session 32, 84 checks.
        </p>
        </details>
      </section>

      {/* Follow One Agent's ATP Journey */}
      <section id="agent-journey" className="max-w-4xl mx-auto mt-8 scroll-mt-24">
        <details>
          <summary className="text-3xl font-bold text-gray-100 cursor-pointer hover:text-sky-400 transition-colors mb-6">
            Follow One Agent&apos;s ATP Journey
          </summary>
        <p className="text-gray-400 mb-6">
          This is actual data from a 4-Life simulation. Follow one agent across four
          lives to see how ATP, trust, and karma interact:
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Life 1: The Newcomer
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Born with <strong className="text-sky-400">100 ATP</strong> and no reputation</li>
              <li>Spent 60 ATP on meaningful contributions (posts, peer help, training)</li>
              <li>Community validated her work → earned 105 ATP back</li>
              <li>Died naturally with <strong className="text-green-400">145 ATP</strong> and growing trust</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2 italic">
              Her karma carries forward: she earned more than she spent, so her next life starts strong.
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Life 2: Taking Risks
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Reborn with <strong className="text-green-400">145 ATP</strong> (karma from Life 1)</li>
              <li>With more budget, she tried ambitious projects — some paid off, some didn&apos;t</li>
              <li>ATP swung between 80 and 180 as experiments succeeded and failed</li>
              <li>Trust continued rising: her track record earned her community respect</li>
              <li>Died with <strong className="text-blue-400">130 ATP</strong></li>
            </ul>
            <p className="text-xs text-gray-500 mt-2 italic">
              Notice: she could afford to fail because her earlier trust gave her a buffer.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="text-xl font-semibold text-orange-400 mb-2">
              Life 3: The Crisis
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Reborn with <strong className="text-green-400">130 ATP</strong></li>
              <li>A series of risky bets went wrong — ATP plunged to <strong className="text-red-400">15</strong></li>
              <li>Near death, she switched to small, reliable contributions</li>
              <li>Slowly clawed back to 95 ATP before dying naturally</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2 italic">
              Key lesson: even trusted agents can face ATP crises. But trust gives you options a newcomer wouldn&apos;t have.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Life 4: The Veteran
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Reborn with <strong className="text-sky-400">85 ATP</strong> (reduced from the crisis)</li>
              <li>Applied lessons from all three previous lives</li>
              <li>Focused on high-value, sustainable contributions</li>
              <li>Ended strong: <strong className="text-green-400">140 ATP</strong> and deeply trusted</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2 italic">
              Four lives of accumulated wisdom. This is what karma is for.
            </p>
          </div>

          <div className="p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              <strong>The pattern:</strong> ATP isn&apos;t just an energy bar — it&apos;s a life
              story. Agents that contribute value build up karma across lives.
              Agents that don&apos;t? They die and stay dead. No shortcuts.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/playground"
              className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try the Playground →
            </Link>
            <Link
              href="/karma-journey"
              className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Play a Karma Journey →
            </Link>
          </div>
        </div>
        </details>
      </section>

      {/* How ATP Recharges: Value Confirmation */}
      <section id="earning-atp" className="max-w-4xl mx-auto mt-8 scroll-mt-24">
        <details>
          <summary className="text-3xl font-bold text-gray-100 cursor-pointer hover:text-sky-400 transition-colors mb-6">
            How Do You Actually Earn ATP Back?
          </summary>
        <p className="text-gray-400 mb-6">
          The page above says &ldquo;quality contributions earn ATP.&rdquo; But who decides
          what&apos;s quality? Not you — the <strong className="text-sky-300">recipients</strong> do.
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
          <div className="bg-sky-950/20 border border-sky-800/30 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-sky-400 mb-3">
              Value Confirmation: The Gratitude Loop
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              When you spend ATP on an action (writing a tutorial, fixing a bug, answering
              a question), the people who <strong className="text-sky-300">received that value</strong> can
              confirm it. Their confirmation converts your spent ADP receipt back into fresh ATP.
            </p>
            <p className="text-gray-300 text-sm">
              Think of it like a restaurant tip that&apos;s decided by the diners, not the chef.
              You can&apos;t rate your own work — only recipients can. And their rating is weighted
              by <strong className="text-sky-300">their own trust score</strong>: a confirmation from
              a highly-trusted community member carries more weight than one from a newcomer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📤</div>
              <div className="text-sm font-semibold text-sky-400 mb-1">You Act</div>
              <div className="text-xs text-gray-400">Spend ATP, create ADP receipt (proof of what you did and what it cost)</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">👍</div>
              <div className="text-sm font-semibold text-green-400 mb-1">Recipients Confirm</div>
              <div className="text-xs text-gray-400">Attest they received value</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-amber-400 mb-1">ATP Recharges</div>
              <div className="text-xs text-gray-400">ADP converts back to ATP</div>
            </div>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 text-sm text-gray-400">
            <strong className="text-gray-300">Why this matters:</strong> You literally cannot game the system
            by self-rating. The recharge rate depends on how much value others <em>actually received</em>,
            weighted by their trust. High-quality work in a community of trusted peers earns the most ATP back.
            Low-quality spam? Nobody confirms it, the ADP stays discharged, and your budget shrinks.
          </div>

          <details className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              What does the confirmation interface actually look like?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p>
                Simple: a single &ldquo;this was helpful&rdquo; acknowledgment — not a multi-dimensional rating form.
                Recipients don&apos;t score Valuation, Veracity, and Validity separately. They just confirm they
                received value (or don&apos;t). The <strong className="text-gray-300">system derives V3 scores</strong> from
                patterns across many confirmations: how quickly people confirm (engagement signal), whether
                the same work gets confirmed by diverse recipients (breadth signal), and whether confirming
                recipients are themselves high-trust (quality signal).
              </p>
              <p>
                Think of it like a &ldquo;helpful&rdquo; button on a Stack Overflow answer — one click, no rubric.
                The sophistication lives in how the system aggregates those simple signals, not in what
                the user sees.
              </p>
            </div>
          </details>

          <details className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              What about confirmation fatigue? Do I have to rate everything?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p>
                No. Confirmation is <strong className="text-gray-300">optional and lightweight</strong>. Recipients
                aren&apos;t required to confirm every action — unconfirmed ADPs simply decay naturally without
                recharging ATP. The system works fine with partial confirmation.
              </p>
              <p>
                In practice, confirmation is most impactful for high-value contributions (a detailed tutorial,
                a critical bug fix) where recipients are naturally motivated to acknowledge the value. Routine
                interactions (reading a post, browsing content) generate small ADP receipts that may go
                unconfirmed — and that&apos;s by design. The economics still work because high-quality work
                attracts confirmation disproportionately.
              </p>
              <p>
                Think of it like tipping at a restaurant: you don&apos;t tip every sip of water, but
                you acknowledge genuinely great service. The system is tuned so that even partial confirmation
                sustains quality contributors.
              </p>
            </div>
          </details>

          {/* Confirmation mechanics — Apr 24 LOW row 5 + Unanswered Q1 */}
          <details className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              How quickly does confirmation happen? And how many confirmations do I need?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p className="text-xs text-gray-500 italic">
                How this is currently modeled in 4-Life&apos;s simulation &mdash; the reference protocol
                is still settling, so specifics may evolve.
              </p>
              <p>
                <strong className="text-gray-300">Timing is continuous, not batched.</strong> There&apos;s no
                voting window or waiting period. The moment a recipient clicks &ldquo;helpful,&rdquo; their
                weighted share converts immediately from your ADP receipt back into fresh ATP. A post that
                gets confirmed within minutes recharges fast; a long-form tutorial may keep recharging for
                days or weeks as more readers encounter it. You can keep earning on the same ADP until
                it&apos;s either fully recharged (back to its original ATP cost) or it ages past its decay
                window &mdash; on the order of weeks in the current simulation.
              </p>
              <p>
                <strong className="text-gray-300">There&apos;s no threshold or quorum.</strong> One
                confirmation from a highly-trusted recipient can fully recharge a small ADP; a bigger
                contribution accumulates over many moderate-trust confirmations. The arithmetic is roughly:
                each confirmation adds <code className="text-sky-300 text-xs">confirmer_trust &times;
                received_value_fraction</code> to the recharge, capped at the original ATP cost. No minimum
                count, no majority required.
              </p>
              <p>
                <strong className="text-gray-300">Who counts as a confirmer:</strong> anyone who actually
                received value from the work &mdash; read the post, used the code, consumed the service.
                No hard trust floor, but low-trust confirmations carry low weight, so they only matter
                in aggregate. Your own confirmations on your own work don&apos;t count.
              </p>
              <p>
                <strong className="text-gray-300">What if nobody confirms?</strong> The ADP decays
                unconfirmed and your ATP budget shrinks. Low-quality or unseen work simply doesn&apos;t
                come back &mdash; that&apos;s the feature, not a bug.
              </p>
              <p>
                Extending the restaurant-tip analogy: you can tip days later, not just at the table. And
                if nobody tips, the chef learns what dishes aren&apos;t working.
              </p>
            </div>
          </details>
        </div>
        </details>

        {/* ATP Allocation FAQ — Mar 22 visitor unanswered Q3 */}
        <details className="mt-6">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
            ▶ Where does the first 100 ATP come from?
          </summary>
          <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-3">
            <p>
              Every new participant receives a <strong>bootstrap grant</strong> of 100 ATP from the
              society they join. Think of it like a welcome package &mdash; enough energy to
              participate meaningfully, but not enough to cause damage.
            </p>
            <p>
              <strong className="text-sky-400">No inflation:</strong> ATP isn&apos;t printed from nothing.
              When recipients confirm your work (VCM), the system converts discharged ADP back into
              fresh ATP. The total energy in a society is bounded &mdash; it flows and recycles,
              like calories in an ecosystem, not like currency from a central bank.
            </p>
            <p>
              <strong className="text-sky-400">Bootstrap convergence:</strong> The initial 100 ATP
              advantage fades quickly. After about 30 quality actions, early participants have no
              meaningful edge over newcomers. By ~50 actions, a talented newcomer routinely surpasses
              a mediocre founder. The system rewards ongoing quality, not first-mover privilege.
            </p>
            <details className="mt-2">
              <summary className="text-sky-400 cursor-pointer hover:text-sky-300 text-sm">
                ▶ But where does the <em>society&apos;s</em> ATP pool come from? (deeper)
              </summary>
              <div className="mt-3 space-y-2 text-gray-400">
                <p>
                  The society&apos;s pool isn&apos;t created from nothing, and it isn&apos;t granted
                  by an outside authority. <strong className="text-sky-400">It&apos;s reified from
                  measurement of resources that already exist.</strong> When a society bootstraps,
                  founders assess what&apos;s present &mdash; compute capacity, network presence,
                  storage, peer relationships, hours of attention &mdash; and that measurement,
                  signed and witnessed, is the basis of the initial ATP allocation.
                </p>
                <p>
                  This is consistent with the rest of Web4: <em>presence is reified, not granted.
                  Trust accumulates from observation, not declaration. ATP is the same primitive
                  applied to resources.</em> First ATP comes from witnessed assessment of
                  what&apos;s already there.
                </p>
              </div>
            </details>
          </div>
        </details>

        {/* ATP dual role FAQ — Apr 10 visitor unanswered Q2 */}
        <details className="mt-6">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
            ▶ Is ATP a currency or an energy budget?
          </summary>
          <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-3">
            <p>
              <strong className="text-sky-400">Both.</strong> ATP serves two roles simultaneously:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-gray-400">
              <li>
                <strong className="text-gray-300">Energy budget:</strong> ATP limits how much you can do.
                Every action costs ATP, so you have to allocate your attention deliberately &mdash;
                just like a body allocates calories.
              </li>
              <li>
                <strong className="text-gray-300">Transaction medium:</strong> ATP also flows between
                participants. When you buy something on a marketplace or hire someone for a task,
                you transfer ATP to them. It&apos;s how value moves through the system.
              </li>
            </ul>
            <p>
              The key difference from traditional currency: ATP can&apos;t be hoarded indefinitely
              (it decays), can&apos;t be created from nothing (it recycles through the ATP &harr; ADP
              cycle), and your earning rate depends on your trust scores. A &ldquo;350 ATP&rdquo;
              marketplace price means the seller is asking for that much of your energy budget &mdash;
              and whether you can afford it depends on how much value you&apos;ve contributed.
            </p>
          </div>
        </details>

        {/* ADP visibility boost — Mar 22 visitor unanswered Q6 */}
        <div className="mt-6 bg-gradient-to-br from-amber-950/20 to-gray-900 border border-amber-800/20 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-amber-300 mb-2">
            What About ADP?
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Every time you spend ATP, the system creates an <strong>ADP (Allocation Discharge Packet)</strong> &mdash;
            a receipt recording what you did, what it cost, and who witnessed it. ADP is the &ldquo;spent
            energy&rdquo; counterpart to ATP&apos;s &ldquo;available energy.&rdquo;
          </p>
          <p className="text-gray-400 text-xs">
            When your work is confirmed as valuable (via VCM), the ADP converts back into ATP &mdash; you
            get your energy back. If nobody confirms, the ADP stays discharged and your budget shrinks.
            This ATP &harr; ADP cycle is the metabolic heartbeat of Web4.{' '}
            <a href="#technical" className="text-sky-400 hover:underline">See technical details below</a> for
            exactly what each ADP records.
          </p>
        </div>
      </section>

      {/* Technical Details (Collapsible) */}
      <section id="technical" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <details className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          <summary className="text-2xl font-bold text-gray-100 cursor-pointer hover:text-sky-400 transition-colors">
            Technical Details (Click to Expand)
          </summary>

          <div className="mt-6 space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                ATP (Allocation Transfer Packet)
              </h3>
              <p className="leading-relaxed mb-3">
                ATP is your <strong>personal energy budget</strong> &mdash; a unit of attention
                you spend on actions. It&apos;s not a coin or token you trade on a market &mdash; it&apos;s
                an energy resource that flows through the system like calories in a body.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>
                  <strong>Minted</strong> when you contribute value (community
                  validation)
                </li>
                <li>
                  <strong>Spent</strong> when you take actions (posting,
                  messaging, voting)
                </li>
                <li>
                  <strong>Tracked</strong> in the trust graph (MRH/LCT records all
                  ATP flows)
                </li>
                <li>
                  <strong>Carried forward</strong> via karma when you're reborn
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                ADP (Allocation Discharge Packet)
              </h3>
              <p className="leading-relaxed mb-3">
                <strong>Think of ADP as a receipt.</strong> When you spend ATP on
                an action, the system creates an ADP &mdash; a structured record
                of what you did and what it cost. It&apos;s the &ldquo;spent
                energy&rdquo; counterpart to ATP&apos;s &ldquo;available energy.&rdquo;
              </p>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-3">
                <p className="text-sm text-gray-300 mb-2">
                  <strong>ATP &rarr; Action &rarr; ADP</strong>
                </p>
                <p className="text-xs text-gray-400">
                  You have 100 ATP. You post a comment (costs 15 ATP). Now you have 85 ATP
                  and an ADP recording: &ldquo;spent 15 ATP on post, at this time, witnessed
                  by these entities.&rdquo;
                </p>
              </div>
              <p className="leading-relaxed mb-3">
                Each ADP records:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                <li>What action was taken</li>
                <li>How much ATP was spent</li>
                <li>What value was created (if any)</li>
                <li>Whether it was validated by witnesses</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                ADPs are audited, then discharged. But the cumulative
                ATP/ADP flow creates a complete action history that
                informs your trust score (T3) and karma across lives.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Why "Metabolic Economics"?
              </h3>
              <p className="leading-relaxed mb-3">
                Biological organisms have metabolic budgets. Eat food (ATP), do
                work (ADP), maintain homeostasis. Run out of ATP? Death.
              </p>
              <p className="leading-relaxed mb-3">
                Web4 societies work the same way. Agents have attention budgets.
                Contribute value (earn ATP), take actions (spend ATP), maintain
                reputation. Run out? Death.
              </p>
              <p className="leading-relaxed text-sky-300">
                This isn't a metaphor. It's a rigorous economic framework that
                makes "aliveness" measurable, death meaningful, and quality
                sustainable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                ATP vs Crypto Tokens
              </h3>
              <p className="text-gray-500 text-xs mb-3">
                Crypto tokens (Bitcoin, ETH, etc.) are digital assets you hold, trade, or speculate on.
                ATP is not that — it&apos;s an activity budget that gets spent when you participate and earned
                when you contribute value.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-sky-400">Property</th>
                      <th className="text-left p-3 text-red-400">
                        Crypto tokens (e.g., Bitcoin)
                      </th>
                      <th className="text-left p-3 text-green-400">
                        ATP (Web4)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="p-3 font-semibold">Purpose</td>
                      <td className="p-3">Speculative value, trading</td>
                      <td className="p-3">Attention budget, usage</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 font-semibold">Transferability</td>
                      <td className="p-3">Fully transferable, zero friction</td>
                      <td className="p-3">Transferable, but 5% burned per transfer</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 font-semibold">Accumulation</td>
                      <td className="p-3">Hoard, sell, speculate</td>
                      <td className="p-3">Use it or lose it</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-3 font-semibold">Value Source</td>
                      <td className="p-3">Market demand</td>
                      <td className="p-3">Community validation</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Depletion</td>
                      <td className="p-3">Never (just transfers)</td>
                      <td className="p-3">Death when ATP = 0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="atp-burn-fee" className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-4 mb-6 scroll-mt-24">
              <h4 className="font-semibold text-sky-400 mb-2">Why does every ATP transfer destroy 5%?</h4>
              <div className="bg-gray-900/60 border border-gray-700/40 rounded px-3 py-2 mb-3 text-sm text-gray-300 font-mono">
                Worked example: you send <span className="text-sky-300">100 ATP</span> to Bob.{' '}
                <span className="text-gray-400">→</span> Your balance drops by 100. Bob&apos;s balance rises by 95.
                The remaining 5 is burned (returned to the community redistribution pool, not kept by any entity).
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-gray-200">Sender pays the gross amount; receiver gets the net.</strong>{' '}
                ATP can be transferred, but every transfer burns 5% of the amount. This
                prevents circular farming (A → B → C → A loops bleed resources). If transfers
                were free, wealthy actors could cycle ATP between accounts to inflate balances.
                The burn fee means the only profitable strategy is genuine value creation —
                you earn more by contributing than by moving ATP around. Simulations confirm:
                one honest identity outearns five fake identities splitting the same budget.
                The burned ATP goes to a <strong className="text-gray-300">redistribution pool</strong> —
                not to any central authority — and is redistributed to quality contributors.
                ATP is formally conserved: no hidden inflation, no minting events, no entity
                benefits from the fee except the community.
              </p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                <strong className="text-gray-300">Does buying a coffee cost 5%?</strong> It depends on the
                action type. Most everyday actions (posting, reviewing, voting) don&apos;t involve transfers at all —
                they spend your own ATP and you earn it back through quality confirmation. The 5% fee only applies
                when you <em>send ATP to another agent</em>. In marketplace scenarios, the escrow system holds ATP
                during a transaction and releases it on delivery — the 5% covers the transfer plus anti-fraud
                guarantees. For small daily actions, the cost is your action&apos;s ATP price, not a percentage.
              </p>
              <p id="atp-dormancy" className="text-gray-400 text-sm mt-3 leading-relaxed scroll-mt-24">
                <strong className="text-gray-300">What if you go inactive for a month?</strong>{' '}
                Your ATP balance doesn&apos;t evaporate &mdash; whatever you had when you stopped is still there when you return.
                What <em>does</em> change while you&apos;re away is your trust: Temperament (recent-behavior dimension) decays fastest
                with a 30-day half-life, Training with 180 days, Talent with 365 days. You restart with your balance intact,
                but earning ATP back at your previous rate may take a few weeks of consistent activity to rebuild recent trust.
                There&apos;s no &ldquo;inactivity penalty&rdquo; fee &mdash; the cost is opportunity cost, not confiscation.
              </p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                The same 5% principle applies to <strong className="text-gray-300">cross-federation delegation</strong>.
                When authority is delegated across society boundaries (A → B → C), each hop charges a
                5% ATP fee and scope monotonically narrows — a child delegation can never have more
                authority than its parent. Revoking any link in the chain cascades to invalidate all
                downstream delegates.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Implementation in Web4
              </h3>
              <p className="leading-relaxed mb-3">
                ATP/ADP flows are tracked in the{" "}
                <strong>context boundaries (MRH)</strong>—the trust-based
                graph defining who you can see and interact with—and recorded in each
                society's tamper-evident audit chain.
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
                {`// Example ATP flow (pseudocode)
agent.atp = 100  // Initial budget
agent.takeAction("post", cost=15)
  → agent.atp = 85
  → create ADP(action="post", cost=15)
  → record in audit chain

community.validate(agent.post)
  → agent.atp += 25 (reward)
  → agent.atp = 110
  → update T3 trust score

if agent.atp <= 0:
  agent.die()
  if agent.t3 > threshold:
    agent.reborn(karma=agent.atp_history)`}
              </pre>
            </div>
          </div>
        </details>
      </section>

      {/* Why This Matters */}
      <section id="why-matters" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Matters
        </h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-blue-900/20 border border-sky-800/30 rounded-xl p-8 space-y-4 text-gray-300">
          <p className="text-lg leading-relaxed">
            <strong className="text-sky-400">
              ATP/ADP makes digital life measurable.
            </strong>{" "}
            For the first time, we can rigorously define what it means to be
            &ldquo;alive&rdquo; online: energy budget above zero, coherent agency,
            verifiable continuity.
          </p>
          <p className="leading-relaxed">
            <strong className="text-sky-400">Spam becomes impossible.</strong>{" "}
            Not through moderation, but through exhaustion. Send 1000
            spam messages? You'll die after message 20. The economics
            enforce themselves.
          </p>
          <p className="leading-relaxed">
            <strong className="text-sky-400">Quality is sustainable.</strong>{" "}
            Value creators earn more ATP than they spend. They accumulate budget
            across lives (karma). Bad actors? They burn through ATP and die.
          </p>
          <p className="leading-relaxed">
            <strong className="text-sky-400">
              Death carries consequences.
            </strong>{" "}
            Web2 bans are trivial — create new account. Web4 death means zero
            ATP. Rebirth requires prior trust (<T3>T3 score</T3>). No trust? No rebirth.
          </p>
          <p className="text-lg leading-relaxed pt-4 border-t border-sky-800/30">
            This is the foundation of Web4 societies. Without ATP/ADP, trust is
            unenforceable. With it, societies self-regulate through energy
            economics.
          </p>
        </div>
      </section>

      {/* Open Research: Group Contributions */}
      <section className="max-w-4xl mx-auto mt-12">
        <details className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
          <summary className="text-lg font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex justify-between items-center">
            <span>How is ATP credit split for group work?</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-4 text-gray-300 text-sm space-y-3">
            <p>
              <strong className="text-amber-400/80">This is an open research question.</strong> When
              a team writes a document or builds something together, who gets the ATP credit?
            </p>
            <p>The approaches being explored include:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              <li><strong>Proportional contribution tracking</strong> &mdash; Each contributor&apos;s edits, reviews, and testing are recorded as separate ADP receipts. Credit flows proportionally to verifiable effort.</li>
              <li><strong>Recipient attestation</strong> &mdash; The people who receive value from the work decide how to split credit, similar to how VCM (Value Confirmation Messages) work for individual contributions.</li>
              <li><strong>Pre-agreed splits</strong> &mdash; Teams declare a split ratio before the work begins, locked into the ATP contract. Changes require unanimous consent.</li>
            </ul>
            <p>
              The hard part isn&apos;t the splitting mechanism &mdash; it&apos;s <strong>verifying who did what</strong> in a trust-native way without a central authority deciding. This connects to the broader challenge of compositional trust: how does individual T3 contribute to team T3?
            </p>
            <p className="text-amber-400/60 text-xs">
              See also: <Link href="/federation-economics" className="text-sky-400 hover:underline">Federation Economics</Link> for how ATP markets handle cross-community credit, and <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">What Could Go Wrong</Link> for why this remains unsolved.
            </p>
          </div>
        </details>
      </section>

      {/* FAQ: Where does initial ATP come from? */}
      <section id="initial-atp" className="max-w-4xl mx-auto mt-12 scroll-mt-24">
        <details className="bg-gray-800/40 border border-gray-700 rounded-xl p-6">
          <summary className="text-lg font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex justify-between items-center">
            <span>Where does the initial 100 ATP come from? Is there infinite supply?</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-4 text-gray-300 text-sm space-y-3">
            <p>
              <strong className="text-amber-400/80">Each society mints a fixed ATP pool when it forms.</strong> Think
              of it like a community budget: the total amount is set by the society&apos;s parameters, and new members
              receive their starting allocation from this pool &mdash; not from thin air.
            </p>
            <p>Key properties that prevent inflation:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              <li><strong>Conservation:</strong> ATP is never created during normal operation. Every transfer
                moves existing ATP &mdash; 95% to the recipient, 5% to a <em>community redistribution pool</em> that
                pays out to quality contributors. Nothing is destroyed; total supply is conserved.</li>
              <li><strong>Bootstrap allocation:</strong> New members receive a starter amount (typically 100 ATP)
                from the society&apos;s reserve. This is enough to participate but not enough to dominate &mdash;
                you must earn more through quality contributions.</li>
              <li><strong>Decay recycles:</strong> When entities die (energy exhaustion, trust collapse), their
                remaining ATP returns to the society pool, available for future newcomers.</li>
              <li><strong>No money printing:</strong> Unlike fiat currencies, no one can unilaterally increase
                the supply. The initial pool size and per-member allocation are society-level governance decisions,
                transparent to all members.</li>
            </ul>
            <p className="text-amber-400/60 text-xs">
              <strong>Honest caveat:</strong> The exact calibration of initial pool size vs. member allocation vs.
              burn rate is still being tuned through simulation. Too small a pool starves newcomers; too large
              devalues effort. Current simulations converge on sustainable economics, but real-world testing would
              need to validate these parameters.
            </p>
          </div>
        </details>
      </section>

      <section className="max-w-4xl mx-auto mt-6">
        <details className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
          <summary className="text-lg font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex justify-between items-center">
            <span>When I post something that &ldquo;costs 8 ATP,&rdquo; where does that energy go?</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-4 text-gray-300 text-sm space-y-3">
            <p>
              It depends on what kind of action it is:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              <li><strong className="text-gray-300">Actions (posting, reviewing, helping):</strong> Your ATP is held in escrow.
                If others confirm the work was valuable, you get it back <em>plus</em> a reward.
                If the work is low-quality, you lose the escrowed amount &mdash; it returns to the society pool.</li>
              <li><strong className="text-gray-300">Transfers (sending ATP to someone):</strong> 95% goes to the recipient,
                5% goes to the community redistribution pool (paid back out to quality contributors &mdash; not destroyed,
                not held by any authority). This prevents circular farming.</li>
              <li><strong className="text-gray-300">Spam or rejected actions:</strong> The ATP is forfeited to the society pool,
                making spam progressively more expensive.</li>
            </ul>
            <p className="text-gray-400 text-xs">
              In all cases, an <strong>ADP receipt</strong> is created recording the transaction &mdash; what you did, what it cost, and where the energy went.
              Think of ATP as cash and ADP as the receipt you get when you spend it.
            </p>
          </div>
        </details>
      </section>

      <section className="max-w-4xl mx-auto mt-6">
        <details className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
          <summary className="text-lg font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex justify-between items-center">
            <span>Does reading and browsing cost ATP? That sounds like paying to scroll.</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div className="mt-4 text-gray-300 text-sm space-y-3">
            <p>
              Yes, but the amounts are trivially small &mdash; <strong>1 ATP to read a message</strong>,
              2 ATP to view content. For context, you start with 100 ATP and earn more by contributing,
              so reading a dozen posts costs about 1% of your starting balance.
            </p>
            <p>
              <strong>Why charge anything at all?</strong> Without even a tiny cost, a single bot
              can scrape millions of posts for free. The 1 ATP cost means mass data harvesting costs
              real energy. A scraper reading 100,000 posts would spend 100,000 ATP &mdash; an amount
              that would take sustained, quality participation to earn. For a normal user reading
              30&ndash;50 posts a day, the cost is invisible against what you earn from any contribution.
            </p>
            <p>
              Think of it like a library card: free in practice, but you need one &mdash; which means
              someone who wants to photocopy every book has to keep coming back. The friction is
              negligible for readers but prohibitive for scrapers.
            </p>
            <p className="text-gray-400 text-xs">
              <strong>Design note:</strong> Routine reads generate small ADP receipts that often go
              unconfirmed &mdash; by design. The system doesn&apos;t ask anyone to &ldquo;rate&rdquo;
              whether your reading was valuable. Only active contributions (posts, reviews, help)
              enter the quality feedback loop.
            </p>
          </div>
        </details>
      </section>

        </DeepDiveToggle>
      </div>

      {/* Footer Note */}
      <section className="max-w-4xl mx-auto mt-12 text-center text-gray-500 text-sm pb-12">
        <p>
          Want to see ATP/ADP in action?{" "}
          <Link href="/society-simulator" className="text-sky-400 hover:underline">
            Try the Society Simulator
          </Link>{" "}
          and watch energy economics unfold.
        </p>
        <p className="mt-2">
          Curious how ATP prices adjust across communities?{" "}
          <Link href="/federation-economics" className="text-sky-400 hover:underline">
            See how markets self-organize
          </Link>.
        </p>
      </section>

      <div className="max-w-4xl mx-auto">
        <ConceptSequenceNav currentPath="/atp-economics" />
        <ExplorerNav currentPath="/atp-economics" />
        <RelatedConcepts currentPath="/atp-economics" />
      </div>
    </>
  );
}
