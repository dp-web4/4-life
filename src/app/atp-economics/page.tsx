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
import InProduction from "@/components/InProduction";

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

  // Action costs and rewards.
  // Jul-30 visitor HIGH (3rd visitor on this, after Jun-11 browse B and Jun-12 browse A): the two
  // net-positive rows were labelled "Meaningful contribution" and "High-value creation" - both
  // unsolicited self-initiated work, which this page's own rule (L773) puts in the CAPPED recharge
  // channel: "you can't profit on a single action, only recover its cost". The numbers, however,
  // are payment-channel numbers, so the widget read as a live counterexample to the prose right
  // beside it. Both prior fixes landed in PROSE (summary item 3, the #net-positive fold); the
  // LABELS were never touched, which is why it keeps recurring.
  // Fix direction is labels, NOT numbers: L788 cites the literal "(-20 cost, +50 reward)" pair and
  // how-it-works L862 leans on the same channel split, so re-arithmetic would cascade. This page
  // had ALREADY assigned these rows to the payment channel in prose at L786-790; relabelling
  // completes that, it does not reverse it. lowQuality (10 -> 5) and spam (5 -> 0) are both within
  // the recharge cap, so they stay self-initiated.
  // Jul-31: it recurred anyway, 4th touch, on the two surfaces this note did not cover - the
  // "Quality Gets Rewarded" card in Key Insights and the worked example's "Hannah ... thrives"
  // conclusion, plus a leftover copy in how-it-works' Learning Across Lives bullets. All three are
  // fixed in that push. The generalisation is now: this claim has to name a channel EVERYWHERE it
  // appears (prose, labels, summary cards, worked-example conclusions), because the unqualified
  // form is false of the recharge channel and this page teaches both.
  // Jul-31, #502 review: a 5th instance survived that same push, in the "Why This Matters"
  // summary conclusion, because the sweep was keyed to the STRING "earn more ATP than they cost"
  // and that bullet said "than they SPEND". SWEEP THE CLAIM, NOT THE SENTENCE. The synonym set
  // to grep, at minimum: "than they cost", "than they spend", "earn more than", "earn more ATP".
  // Comparative uses are NOT instances and must be left alone (terms.ts:150 "high-value
  // contributions earn more ATP" compares good work to bad, and trust-tensor's "higher T3 = earn
  // more ATP" compares agents; both are true of either channel).
  // BOUNDARY, so the next sweep does not overrun: the #net-positive fold quotes "value creators
  // earn more than they spend" VERBATIM and scopes that quote to OTHER pages, telling the reader
  // this page's payment channel is what those pages mean. So an unqualified instance ON THIS PAGE
  // is always in scope and gets a channel; an unqualified instance on how-it-works or
  // first-contact is a fix-DIRECTION decision (route those pages to the reconciliation, or retire
  // the short phrase everywhere and delete the "other pages" clause with it), not a copy fix.
  // Two such instances are live and registered in SESSION_FOCUS.md; do not edit one of them
  // without deciding the direction for both plus that clause.
  const actions = {
    spam: { cost: 5, reward: 0, label: "Send spam message" },
    lowQuality: { cost: 10, reward: 5, label: "Low-quality post (your own)" },
    meaningful: { cost: 15, reward: 25, label: "Commissioned task, solid work" },
    highValue: { cost: 20, reward: 50, label: "Commissioned task, high value" },
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
        {/* May 3 MEDIUM friction (60-day-old loop): H1 was "Attention Economics" - primed the
            "Attention Transfer Packets" misread before the rescue badge below could load.
            Per visitor's explicit suggestion, canonical expansion now lives IN the H1 itself.
            The badge below is now confirming-redundancy, not rescue-load-bearing. */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          ATP: Allocation Transfer Packets
        </h1>
        <div className="mb-3 inline-flex items-baseline gap-2 px-3 py-1.5 rounded-md bg-sky-950/40 border border-sky-800/40">
          <span className="text-sky-300 font-mono font-semibold text-sm">ATP</span>
          <span className="text-gray-500 text-xs">=</span>
          <span className="text-gray-100 font-semibold text-sm">Allocation Transfer Packets</span>
        </div>
        {/* May 23 visitor LOW (friction #2 + Unanswered Q3): the prior italic aside warned that ATP
            is "occasionally called an 'attention' or 'usage' budget - not alternate expansions of the
            acronym." But the May 15 #255 sitewide pass already removed every "attention budget"
            survivor, so the aside defended against a ghost - and by raising the alternatives only to
            negate them, it *planted* the doubt ("does ATP secretly mean something else?") it was meant
            to prevent. The original guard's root cause (old H1 "Attention Economics") was fixed May 3;
            the expansion is now anchored positively by the H1 (line 106) + confirming badge (108-112),
            so the aside is dropped and the expansion simply restated in plain positive form here. */}
        {/* Jul-1 visitor HIGH (browse #2, restored log): the page gives ATP two expansions - 
            "Allocation Transfer Packets" here vs. "adenosine triphosphate" in the biology <details>
            below - with nothing reconciling them, so a reader who opens the details reads a
            contradiction ("which do I tell a friend?") and "briefly distrust[s] the site's precision."
            Proactive anchor: name the two-layer relationship (origin vs. what-it-is) at the FIRST
            canonical assertion, in reading order, before they can hit the collision. Same pattern as
            the LCT scale anchor (#362) / [[recurring-anchor-proactive-vs-reactive]]. */}
        <p className="text-sm text-gray-400 mb-6">
          In one line: <strong className="text-gray-200">ATP is your energy budget</strong> - the
          same plain gloss used everywhere else on this site, and the acronym always spells out to
          &ldquo;Allocation Transfer Packets.&rdquo; The letters are also a deliberate nod to biology&rsquo;s{' '}
          <em>adenosine triphosphate</em> - that&rsquo;s where the <em>name</em> comes from, not a
          second definition (<a href="#why-atp-name" onClick={(e) => { e.preventDefault(); const el = document.getElementById('why-atp-name'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">the borrowed name, below</a>).
        </p>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 solves spam, abuse, and low-quality content not with moderation
          armies, but by giving every agent a finite{' '}
          <strong className="text-sky-400">ATP budget</strong>.
        </p>
        {/* June-9 visitor (browse #1) HIGH: the "you vs your agent" jolt. A reader who just followed
            Alice - a human - through First Contact ("her entity dies") hits "your agent dies" below and
            infers they operate a separate AI bot they can lose. Land the canonical "agent = any
            participant, you included" frame (already on the landing page, L319, but far below the fold)
            right here, before the first "your agent dies" in reading order, so it reads as "you, the
            participant," not "a deployed bot of mine." NOTE: the visitor's literal suggestion ("you act
            through an agent") inverts the meaning - the accurate frame is that you ARE an agent. */}
        <p className="text-sm text-gray-400 mb-6">
          One clarification before that word does any work: in Web4,{' '}
          <strong className="text-gray-200">&ldquo;agent&rdquo; just means any participant - you included</strong>,
          whether you&rsquo;re a person or an AI. It isn&rsquo;t a separate bot you deploy; when this page
          says &ldquo;your agent,&rdquo; it means <em>you</em>, acting in the system.
        </p>
        {/* Aug-10 (15:00). This page asserts ATP exhaustion as terminal EIGHT times
            (`grep -rniE "run out|you die|you'll die|your agent dies|death\.|you died"` on this file),
            and its own recovery clause does not arrive until the "Death is real" bullet
            (`grep -n "reborn with a head start - your reputation"`), ~350 lines below. So the defect
            was ORDERING, not wording: a reader met "your agent dies" here and again in the Key
            Takeaways before the page ever said energy death is the recoverable kind. Fixing eight
            strings would have ballooned the page and treated symptoms; the clause lands at the two
            surfaces that come FIRST (here and the Key Takeaways below), and every later "death" on
            the page is then correct shorthand under an established page-level frame. Clause
            propagated verbatim from that same bullet, which is also the conditional this page uses
            at `grep -n "not a free reset"` ("If you built trust..."), so no new recoverability
            variant is coined. */}
        <p className="text-lg text-gray-400 leading-relaxed">
          Every action costs ATP. Every contribution others find valuable earns it back.
          Stay above zero by contributing - run out and your agent dies. But if you built
          trust, you&rsquo;re reborn with a head start.
        </p>

        {/* Key Takeaways - May 15 visitor LOW (friction row 7 / Honest Assessment "secondary theme"):
            this is the site's most-leaned-on concept on a ~2,500-word page with no scannable summary.
            Mirrors the proven LCT "Key Takeaways" box so a decision-fatigued newcomer gets the whole
            idea in ~60s without scrolling. Uses the #255 canonical "energy budget" gloss. */}
        <div className="mt-6 bg-sky-950/30 border border-sky-800/40 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3 text-sky-300">The 60-second version</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            {/* Jul-15 visitor MEDIUM (magnitude residual, distinct from #459's vocabulary fix):
                a Market wireframe on /day-in-web4 prices a camera at 350 ATP while the same page
                says "you start with 100 ATP" - the visitor read "not money you accumulate" as
                "balance is capped at the grant" and couldn't see how 350 is reachable. That flat
                phrasing is this page's OWN outlier: L306 ("you don't accumulate it as wealth"),
                L1118 + L1927 ("Value creators accumulate energy budget / budget across lives") all
                draw the budget-vs-wealth line. Reconcile item 1 to the page's established framing:
                you DO accumulate budget, you do NOT accumulate cash-out wealth. Guardrail: the
                "buy, sell, or speculate" clause is the standing unresolved web4
                unit-of-account-vs-currency tension - left verbatim.
                Aug-06 REVERSAL, read this before reverting: the growth channel named here used to
                be "as you earn back", which is the one thing that CANNOT be it. Confirming your own
                work refunds at most what you spent (#net-positive, and item 3 below: "that payment,
                not recharge, is where net gain comes from"), so earn-back sustains a balance and
                never grows one. The Jul-15 need is unchanged and better served: a reader still
                learns how 350 ATP is reachable from a 100 grant, and now learns by which channel.
                If you reword this, keep item 1 and item 3 naming the same channel. */}
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">1.</span> ATP is your <strong className="text-gray-100">energy budget</strong> - a per-agent allowance you spend and earn back, and a contributor whose work others commission builds a balance well past the grant they started with. It&rsquo;s <strong className="text-gray-100">budget, not wealth</strong>: not money you can hoard or cash out, and not something you can buy, sell, or speculate on.</li>
            {/* May 23 visitor Unanswered Q2: "Who are the 'others' that confirm my value to recharge me? The
                validating party stayed fuzzy." The full answer lives at #earning-atp (Gratitude Loop, ~line 1122)
                but a 5-min reader builds their recharge model from this box, where "others" was ungrounded. Same
                logic as #301 (the keepable summary must be complete): ground who-confirms = the recipients + a
                jump-link to the existing depth. Per policy guardrail, the box stays minimal - trust-weighting and
                "what if nobody confirms" stay at #earning-atp. */}
            {/* May 29 visitor MEDIUM #3 / Unanswered Q1: "'Continuously' but 'over a rolling window' is vague.
                I'd want a clearer mental model of the recharge cadence - is it minutes? Hours? Days?"
                The canonical answer lives at L512-524 ("think hours, not seconds" + worked example
                "first hour ~50%, six hours ~80%, fully within a day") - but the visitor read those
                lines and STILL took away vague "continuously / rolling window" as the keepable summary.
                4th instance of the keepable-summary-completion pattern on this same box (after #301 ADP,
                #309 who-confirms, #330 5% destination). Reuses the canonical L514 phrasing ("hours, not
                seconds") promoted to the read point; "to a day" tracks the typical-case worked example
                at L520-522 - does not commit the box to thinly-confirmed multi-day stragglers, which
                stay in the deep paragraph. Existing #earning-atp jump-link already lands at cadence detail. */}
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">2.</span> Every action <em>spends</em> ATP; every contribution <em>recharges</em> it (over <strong className="text-gray-100">hours to a day</strong>, not seconds) when <strong className="text-gray-100">the people who received it confirm its value</strong> - the recipients you helped, not you and not a central rater. Stay above zero or your agent dies (recoverable if you built trust, permanent if not) - this is how spam and abuse become self-limiting. <a href="#earning-atp" onClick={(e) => { e.preventDefault(); document.getElementById('earning-atp')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">(who confirms you)</a></li>
            {/* June 12 visitor HIGH (browse A): "can't profit on a single action" (cap, in the math
                details) vs "Net: +10/+30" (simulator buttons) read as a self-contradiction for minutes.
                Both #384 fixes are live but REACTIVE - each sits beside one instance (inside the
                collapsed #net-positive details; above the simulator). A linear reader still hits the
                first net numbers unanchored. This is the one PROACTIVE anchor: the two-channel model
                stated in the intro, above every number on the page. Same pattern as the LCT scale
                anchor (#362).
                Jul-21 visitor Unanswered Q#4: having read "ATP isn't money" (items 1/5) next to this
                "someone pays you" line, the visitor re-read the page and still couldn't answer "paid in
                WHAT, and how is it different from the ATP I spend?" The grounding that payment IS ATP
                (same energy, priced by the commissioner not refunded from your spend) only lived inside
                the collapsed #net-positive "Show me the math" fold (L739-751), which they didn't open.
                [[visitor-read-it-and-still-filed-it]]: promote the missing clause to the read point;
                energy framing only, do NOT reopen the buy/sell/speculate currency tension. */}
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">3.</span> ATP comes back through <strong className="text-gray-100">two channels</strong>: confirmations of work you initiated <em>refund</em> at most what you spent, while tasks <em>someone else commissioned</em> pay you (in <strong className="text-gray-100">ATP, the same energy you spend</strong>) what the work is worth to them, priced by the commissioner rather than refunded from your own outlay - that payment, not recharge, is where net gain comes from. <a href="#net-positive" onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">(recharge refunds, payment earns)</a></li>
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">4.</span> Quality matters about <strong className="text-gray-100">7&times;</strong>: low-quality work barely recharges you, high-quality work recharges fully, up to what you spent. <a href="#quality-ramp" onClick={(e) => { e.preventDefault(); document.getElementById('quality-ramp')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">(the quality ramp)</a></li>
            {/* May 28 visitor Unanswered Q3: "What happens to the 5% transfer fee? Burned, pooled,
                redistributed? I encountered the 5% reference multiple times and never saw where it
                goes." The destination ("community redistribution pool, not destroyed, not a central
                authority") already lives 5× elsewhere on this page (L185 Bitcoin callout, L240
                settled-vs-evolving, L429 quality section, L972 why-this-works, L1747+L1800 FAQ) - 
                but not at the read point the visitor explicitly trusted as their summary. Same
                pattern as #301 (ADP) and #309 (who-confirms) - complete the keepable summary in
                place rather than ship the answer 1000+ lines deeper. */}
            {/* Jul-29 visitor HIGH: "no market, no price" was flat here too, and this box is
                the summary a 5-min reader keeps. Same fix and same guardrails as the
                "Is ATP like Bitcoin?" box below (see the long note there): scope the denial
                to the OUTSIDE market, since in-society pricing is licensed by
                inter-society-protocol.md:199 and is what our own Market wireframe shows.
                Kept to one clause; the worked reconciliation lives at the Bitcoin box. */}
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">5.</span> It is <strong className="text-gray-100">not a cryptocurrency</strong> - no outside market, no price against money, no mining (goods <em>inside</em> a society can still be priced in ATP). Peer transfers exist, but 5% routes to a <strong className="text-gray-100">community redistribution pool</strong> (not destroyed, not a central authority), making collusion farming unprofitable. <a href="#atp-burn-fee" onClick={(e) => { e.preventDefault(); const el = document.getElementById('atp-burn-fee'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const parent = el.closest('details'); if (parent) parent.open = true; } }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">(what the pool funds)</a></li>
            {/* June-22 visitor LOW: ADP why-first RECURRED at this summary-list item - the
                FIRST place a linear reader meets ADP. #394 (L1490 box) and #396 (L429 box) both
                reordered to why-first but never touched this earlier read point. Reorder here too:
                why (proof unlocks ATP back) → what (the receipt) → caveat (not a 2nd money). Pure
                reorder, no new claim, metaphor demoted not deleted. This exhausts the inline lever
                across all 3 ADP locations; further recurrence → structural (<details>), not a 4th reword.
                Jul-7 visitor: the #437 retest gate FIRED as pre-committed - the folded Energy-Budget
                surface held, friction MOVED here (item 6): "mentions the receipt before the page explains
                it; the you-never-manage-it reassurance arrives later." Fix is the visitor's literal
                one-clause suggestion, a parenthetical at the receipt metaphor - an addition of the moved
                reassurance, NOT a 4th reword of the why/what/caveat order, which stays intact. */}
            <li className="flex gap-2"><span className="text-sky-400 shrink-0">6.</span> Spending ATP creates an <strong className="text-gray-100">ADP</strong> (Allocation Discharge Packet) - proof your work happened, and that proof is what unlocks fresh ATP back once others confirm it. Think of ATP as cash and the ADP as the receipt (<strong className="text-gray-100">automatic</strong> - the system keeps it in the background, you never hold or manage it); it&apos;s <strong className="text-gray-100">not a second kind of money</strong>, just the record that converts back into energy. <a href="#what-about-adp" onClick={(e) => { e.preventDefault(); document.getElementById('what-about-adp')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline whitespace-nowrap">(more on ADP)</a></li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">Read on for the full picture, or <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300">jump to the ATP simulator ↓</a></p>
        </div>

        {/* Biology etymology - demoted to optional disclosure per Apr 22 visitor LOW L8.
            Jul-1 visitor HIGH (browse #2): this section is collapsed-by-default and USED to open
            with "adenosine triphosphate" cold - so opening it INTRODUCED a second expansion rather
            than reconciling it against the "Allocation Transfer Packets" a linear reader just saw.
            The lead now resolves on open: two things, one acronym, on purpose - biology names it,
            Web4 says what it is - and does the same for ADP. id lets the anchor above jump here. */}
        <details className="mt-4" id="why-atp-name">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-sky-400 transition-colors select-none">
            <span className="text-sky-300 font-semibold">Why &ldquo;ATP&rdquo;?</span>{' '}
            <span className="italic">the biology origin behind the name</span>
          </summary>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
            The three letters carry two things at once, on purpose. <em>Adenosine triphosphate</em> is where the{' '}
            <em>name</em> comes from - the molecule your cells spend to do work: they burn ATP, get ADP back,
            and recharge ATP from food. <strong className="text-gray-100">Allocation Transfer Packets</strong> is what
            ATP <em>is</em> in Web4, which reuses that exact cycle for digital energy: you spend ATP to act, the ADP
            receipt records it, and quality work recharges your balance. So the biology is the name&rsquo;s origin
            story, not a rival definition - and the same holds for ADP (biology&rsquo;s adenosine{' '}
            <em>di</em>phosphate lends its name to <strong className="text-gray-100">Allocation Discharge Packets</strong>).
            The metaphor is deliberate - energy that flows, not tokens that accumulate.
          </p>
        </details>

        {/* Crypto-skeptic preemption - Apr 19 visitor MEDIUM + Unanswered Q #1 */}
        <div className="mt-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-amber-700/40 rounded-xl p-5">
          <p className="text-sm font-semibold text-amber-300 mb-2">
            Is ATP like Bitcoin? (short answer: no)
          </p>
          <ul className="text-sm text-gray-300 space-y-1.5 leading-relaxed list-disc list-outside ml-5">
            {/* Jul-29 visitor HIGH (their #1, and the Honest Assessment's named pattern:
                "one page making a clean, quotable, absolute claim, and another page quietly
                not honoring it"). This bullet used to read "No market, no price, no
                speculation" flat. The site's OWN Market wireframe
                (InteractiveWireframes.tsx:300+, rendered on /day-in-web4) shows a named
                seller, a 350-ATP price, a buyer and an escrow, so the absolute was falsified
                by our own example and the only reconciliation lived on /day-in-web4 - the
                page that creates the problem, not the page that issues the denial.
                Ground truth: web4-standard/core-spec/inter-society-protocol.md:191 says
                "ATP is a unit of account, not a medium of exchange with intrinsic value",
                and :199 says societies "that wish to embed market mechanisms in their ATP
                policies (price discovery, auctions, etc.) MAY do so". So in-society pricing
                is LICENSED and the wireframe is right; the flat prose was the defect.
                The denial is scoped to the EXTERNAL claim, which is the honest and
                still-true half: no outside market, no rate against money, no cash-out.
                GUARDRAILS, do not undo:
                - Canon is SPLIT on the currency word itself (atp-adp-cycle.md:5 calls ATP a
                  society's "native currency"). Do NOT re-litigate "currency" here; L282
                  ("This is not a currency"), glossary:378 and navigation.ts:157 stay as-is.
                - Do NOT re-assert a flat "no exchange rate": inter-society §4.4 has societies
                  negotiating ATP_A:ATP_B rates. The denial is a rate against MONEY.
                - The "buy, sell, or speculate" clause in item 1 above (L176) stays verbatim
                  per its own guardrail; nothing here reopens it. "You can't buy or sell ATP"
                  remains true and is untouched: what changed is that buying a camera PRICED
                  in ATP is a different act from buying the ATP itself. */}
            <li>
              <strong className="text-gray-100">It&apos;s a usage budget, not a tradeable asset.</strong>{' '}
              No outside market, no price against money, no speculation, and no way to cash out.
              You can&apos;t buy ATP or sell it. Inside a single society goods can still be{' '}
              <em>priced</em> in ATP, which is why the used-camera listing in{' '}
              <Link href="/day-in-web4" className="text-sky-400 hover:text-sky-300 underline">A Day in Web4</Link>{' '}
              can ask 350: ATP is that society&apos;s unit of account, the way a company prices
              internal work in engineering hours. What has no market is the ATP itself.
            </li>
            <li>
              <strong className="text-gray-100">You can transfer small amounts to others</strong>{' '}
              (a one-way gift or reallocation, not a sale: the transfer mechanism itself moves ATP
              in one direction and prices nothing, so a bare transfer has no buyer and no seller) -{' '}
              but <strong className="text-amber-300">5% is skimmed on every transfer</strong>{' '}
              (that 5 routes to a community redistribution pool, not destroyed and not to any central authority - {' '}
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

        {/* Old "energy / attention-budget" metaphor italic line removed Apr 28 - 
            the metaphor/expansion split is now made explicit in the hero clarifier above. */}

        {/* "What's settled vs what's still moving" - May 4 visitor LOW #11:
            two existing mid-page "still settling" captions made the visitor wonder
            globally "which numbers am I supposed to trust?" without a place to land.
            Collapsed by default so it adds zero visual weight to the hero. */}
        <details id="settled-vs-evolving" className="mt-5 bg-gray-800/40 border border-gray-700/60 rounded-lg p-4 scroll-mt-24">
          <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors list-none flex items-center justify-between gap-3">
            <span>What&apos;s settled vs what&apos;s still moving on this page</span>
            <span className="text-xs text-gray-500 font-normal whitespace-nowrap">click to expand</span>
          </summary>
          <div className="mt-3 text-sm text-gray-400 space-y-3">
            <p className="text-xs text-gray-500 m-0">
              A fair question while reading this page: <em>&ldquo;which numbers am I supposed to remember,
              and which ones are still being negotiated?&rdquo;</em> Here&apos;s an honest map.
            </p>

            <div>
              <p className="text-emerald-300 font-semibold m-0 mb-1">✅ Settled (canonical to Web4)</p>
              <p className="text-xs text-gray-500 m-0 mb-2">
                These are the load-bearing ideas. If they changed, ATP wouldn&apos;t be ATP any more.
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc">
                <li><strong className="text-gray-300">ATP is a finite per-agent budget.</strong> Every action costs from it; you don&apos;t accumulate it as wealth.</li>
                <li><strong className="text-gray-300">Contribution recharges it.</strong> Stop contributing, it drains; keep contributing, it sustains.</li>
                <li><strong className="text-gray-300">ATP → ADP → confirmation → recharge cycle.</strong> Spend creates an ADP receipt - <em>ADP is the spent-energy counterpart to ATP: proof an action happened, not a second currency</em>; recipients confirm; confirmation converts a share of that receipt back into fresh ATP. The cycle exists as a system.</li>
                <li><strong className="text-gray-300">Transfer-fee <em>mechanism</em>.</strong> Fees on peer transfer route to a community redistribution pool (not destroyed, not a central authority), and the friction makes circular farming unprofitable. The exact rate (currently 5% here) is a sim parameter; the existence of the fee is structural.</li>
                <li><strong className="text-gray-300">Quality-ramp shape.</strong> Below ~30% earns ~zero, above ~70% earns ~full, linear in between. The 0.30 / 0.70 thresholds and the piecewise-linear shape are canonical (see <code className="text-emerald-300">validate_vectors.py::sliding_scale</code>).</li>
              </ul>
            </div>

            <div>
              <p className="text-amber-300 font-semibold m-0 mb-1">🔧 Still evolving (4-Life&apos;s current sim)</p>
              <p className="text-xs text-gray-500 m-0 mb-2">
                These are the <em>specific</em> numbers 4-Life uses. They&apos;re plausible, but the reference protocol is still settling (expect movement).
              </p>
              <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc">
                <li><strong className="text-gray-300">Exact transfer-fee percentage.</strong> Currently 5% in <code className="text-amber-300">public/spec.json::ATP.transfer_fee</code>. The mechanism is settled (above); this number is not.</li>
                <li><strong className="text-gray-300">&ldquo;7× gap&rdquo; framing.</strong> 4-Life&apos;s visualization of the canonical quality-ramp - useful intuition, not a separate Web4 spec constant.</li>
                <li><strong className="text-gray-300">Recharge-math coefficients.</strong> The form <code className="text-amber-300">confirmer_trust × received_value_fraction</code> is the shape we&apos;re modelling, not the canonical formula - here <code className="text-amber-300">received_value_fraction</code> just means the share (0-1) of a contribution&apos;s value credited to one confirmer, defined in full under &ldquo;Show me the math&rdquo; below.</li>
                {/* June 11 visitor (browse B) LOW: "recharge over hours to a day" vs "decay over weeks" - two clocks,
                    relationship unclear at this read point (the FAQ below reconciles them, but the visitor met
                    "weeks" here first). One clause in this list's hedged register. */}
                <li><strong className="text-gray-300">Decay-window durations.</strong> Unconfirmed ADP slices decay over &ldquo;weeks&rdquo; - the exact window length is a 4-Life sim parameter, not a Web4 constant. (This is a different clock from recharge: &ldquo;weeks&rdquo; is how long a receipt waits for confirmations before it stops counting; &ldquo;hours to a day&rdquo; is how fast confirmed work recharges you.)</li>
                <li><strong className="text-gray-300">4-Life sim parameters.</strong> Starting balance = 100 ATP, death threshold = 0, etc. - design choices in <code className="text-amber-300">public/spec.json</code> that you&apos;ll see in the simulator widget on this page.</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 m-0 border-t border-gray-700/50 pt-3">
              Heuristic for reading the rest of this page: <em>shapes and directions are stable; exact numbers are negotiable.</em>
            </p>
          </div>
        </details>

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

      <InProduction concept="atp" />

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
                ✅ <strong className="text-sky-300">ATP transfers cost 5%</strong>.
                Example: you send 100 ATP to Bob - <em>Bob receives 95, and the 5 ATP
                routes to the community redistribution pool</em> (not destroyed, and not to any
                central authority). The fee lands on the transfer itself, so genuine sharing is
                nearly free while circular shuffling steadily bleeds the shufflers.
                Your energy budget primarily reflects YOUR contributions, not
                someone else&apos;s. You can share ATP, but circular farming bleeds resources.
                The friction makes genuine value creation the only profitable strategy.
                Cross-community transfers apply the same 5% fee to the raw ATP amount,
                plus trust discounting when societies federate (see the{' '}
                <a href="/hub" className="text-sky-400 hover:underline">hub</a>).
              </p>
            </div>
            <p>
              ✅ <strong>Spam becomes expensive</strong> - Flooding system
              depletes your budget
            </p>
            <p>
              ✅ <strong>Death is real</strong> - Run out of energy budget? You die.
              But if you built trust, you&apos;re reborn with a head start - your reputation carries forward.
            </p>
            <div className="text-sm text-gray-400 mt-2">
              {/* June 2 visitor MEDIUM / Unanswered Q2: "a receipt that converts into money isn't a receipt." The
                  receipt-vs-asset contradiction lived here because "converts back into fresh ATP" reads as the receipt
                  itself becoming spendable. The "not a second currency" disambiguation existed only in the deeper
                  L257 breakdown; port it to this primary read point and make confirmation (not the receipt) the refill trigger. */}
              {/* June 4 visitor Unanswered Q4: "is the ADP receipt ever something *I* hold/use, or is it purely an
                  internal accounting artifact?" The copy answered what-it-is and what-triggers-refill but left the
                  agency verb open ("you get an ADP" implies possession). Add the genuinely-new agency content only - 
                  it's automatic; you never hold/present/manage it - WITHOUT re-asserting "spend/currency" (already above). */}
              {/* June 18 visitor MEDIUM: ADP "why should I care" RECURRED despite #394, which inverted the *deep* amber
                  box (L1490) to lead with the why - but the visitor meets ADP FIRST here, and this paragraph still ran
                  mechanics → "you never touch it" caveat → (buried at end) the why. #394 landed in the wrong location.
                  Fix: REORDER these existing sentences to why → what → caveat at the FIRST read point. No new claims. */}
              {/* Jul-6 visitor LOW: "receipt you never touch... feels like homework" RECURRED after three prose
                  treatments (#301, #394, #396 + June-22 alignment). Firing the pre-committed structural branch
                  (summary-list comment above: "further recurrence → structural (<details>), not a 4th reword"):
                  the why-care lead stays visible; the what-it-is mechanics move behind a for-the-curious fold,
                  sentences unchanged. A naive reader now exits with just "confirmation unlocks fresh ATP;
                  the ADP is the proof" and opts into the rest. */}
              <p>
                <strong className="text-gray-300">What about ADP?</strong> Here&apos;s why it matters to you even though you never
                touch it: when others confirm your work was valuable, that confirmation is what unlocks fresh ATP back into your
                budget - and the ADP is the proof that earns it back.
              </p>
              <details className="mt-2">
                <summary className="text-sky-400 cursor-pointer hover:text-sky-300">
                  ▶ So what exactly is an ADP? (for the curious)
                </summary>
                <p className="mt-2">
                  Every time you spend ATP, you get an <strong className="text-gray-300">ADP
                  (Allocation Discharge Packet)</strong> - a receipt recording what you did and what it cost. ADP is the &ldquo;spent energy&rdquo;
                  counterpart to ATP&apos;s &ldquo;available energy&rdquo; - a record of an action, not a second currency you can spend.
                  {' '}You never hold, present, or manage the ADP yourself - the system creates it automatically when you act
                  and settles it once your work is confirmed; it&apos;s background accounting, not a step you take.
                </p>
              </details>
            </div>
            <p className="pt-4 text-gray-400 italic">
              Result: Only sustainable behaviors survive. Value creators thrive.
              Spam dies.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Ramp - concrete numbers from web4 spec */}
      <section id="quality-ramp" className="max-w-4xl mx-auto mt-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Quality Pays - By How Much?</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          ATP isn&apos;t all-or-nothing. Web4 uses a <strong className="text-sky-400">quality ramp</strong>:
          the better your work, the more you earn. Below a minimum quality bar, you earn nothing.
        </p>
        {/* Jul-3 visitor MEDIUM: V3 was named only at L600 (deep in "Who Decides Quality?"),
            ~90 lines BELOW where the reader first meets the word "quality" here. A linear reader
            met V3 after the math it should have preceded. One priming sentence anchors V3 (and the
            T3-vs-V3 contrast the visitor's Unanswered Q1 asked for) at true first-mention; the
            L600 mention then reads as the mechanism detail, not a cold introduction.
            Jul-4 visitor LOW: the anchor shipped (#427) but the visitor still read it as "cryptic"
            ~19h later - residual is prominence + framing, not mechanism (the literal fix was already
            here). Two changes: (1) de-mute from footnote styling (-mt-2 text-sm text-gray-400) to
            body prominence, since it answers the most-asked question "T3 vs V3?"; (2) reframe from
            "distinct from T3" (difference) to "same idea, aimed at the work" (parallel) so V3 reads
            as T3's sibling pointed at the output, not a separate cryptic thing. Kept lightweight - 
            body prose, NOT a callout/panel - and preserved the "just below" pointer + both links. */}
        <p className="text-gray-300 leading-relaxed mb-6">
          That <strong className="text-gray-100">&ldquo;quality&rdquo;</strong> score has a name: it&apos;s your{' '}
          <a href="/value-tensor" className="text-sky-400 hover:text-sky-300 underline">V3 (Value Tensor)</a>.
          It&apos;s the <em>same idea</em> as{' '}
          <a href="/trust-tensor" className="text-sky-400 hover:text-sky-300 underline">T3</a>, just aimed at a different target:
          where T3 rates how much people trust <em>you as a person</em>, V3 rates the value of <em>the work you made</em>.
          Trust in the person, value of the work.
          {/* Jul-6 visitor LOW: framing above held ("no longer cryptic"), but the page couldn't answer
              "who computes V3 / how do I move it" at this read point without sending the reader to
              trust-tensor#v3 - the Trust Tensor pointer was only an unlabeled link on the acronym.
              One sentence (visitor's own suggested wording, nearly verbatim): who computes it +
              a stated "full definition lives there" destination. Self-containment only; no reframe.
              Jul-9: the destination is now /value-tensor. The 07-09 visitor's complaint was precisely
              that "elsewhere turns out to be a section on the *T3* page" - so the label moves with
              the link. Sentence otherwise untouched. */}
          {' '}And it&apos;s computed the same way T3 is - from confirmations by the people who
          received your work, not by any self-rating - with the full definition on the{' '}
          <a href="/value-tensor" className="text-sky-400 hover:text-sky-300 underline">Value Tensor page</a>.
          {' '}(How V3 gets scored is <a href="#quality-measurement" onClick={(e) => { e.preventDefault(); document.getElementById('quality-measurement')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">just below</a>.)
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
            There are no negotiations - quality is the dominant earnings driver.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            A 5% transfer fee on all ATP flows (the 5% routes to a community redistribution pool, not to any central authority) prevents circular farming (colluding accounts sending ATP back and forth to inflate balances).
            Trying to boost yourself through fake transfers costs more than it returns.
          </p>
        </div>

        {/* Worked example - Apr 23 visitor LOW: 7x gap needs concrete side-by-side */}
        <div className="mt-6 bg-gradient-to-br from-amber-950/20 to-orange-900/10 border border-amber-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-300 mb-3">Worked Example: Two Contributors, Same Task</h3>
          <p className="text-gray-300 text-sm mb-4">
            Both spend 50 ATP attempting the same task. Only the quality of their work differs:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-red-950/20 border border-red-800/30 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-red-400 mb-1">Low quality</div>
              <div className="text-base font-semibold text-gray-200 mb-2">Sam - 35% quality</div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between"><span>Spends:</span><span className="font-mono text-red-300">−50 ATP</span></div>
                <div className="flex justify-between"><span>Earns back:</span><span className="font-mono text-red-300">~6 ATP</span></div>
                <div className="flex justify-between pt-2 border-t border-red-800/30 mt-2"><span className="font-semibold">Net:</span><span className="font-mono text-red-400 font-bold">−44 ATP</span></div>
              </div>
            </div>
            <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
              <div className="text-xs uppercase tracking-wide text-green-400 mb-1">High quality</div>
              <div className="text-base font-semibold text-gray-200 mb-2">Hannah - 85% quality</div>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex justify-between"><span>Spends:</span><span className="font-mono text-green-300">−50 ATP</span></div>
                <div className="flex justify-between"><span>Earns back:</span><span className="font-mono text-green-300">~42 ATP</span></div>
                <div className="flex justify-between pt-2 border-t border-green-800/30 mt-2"><span className="font-semibold">Net:</span><span className="font-mono text-green-400 font-bold">−8 ATP</span></div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Same task, same spend - <strong className="text-amber-300">Hannah keeps 7x more ATP than Sam</strong> (42 ÷ 6).
            Across a hundred tasks, Sam burns through their budget and dies of energy starvation. Hannah barely
            loses any, but barely losing is not thriving: quality is what slows her burn, and{" "}
            <a
              href="#net-positive"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
              className="text-sky-400 hover:text-sky-300 underline"
            >recharge refunds, payment earns</a>, so it is commissioned work rather than this refund that puts her ahead.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            That&apos;s where &ldquo;~7x&rdquo; comes from: just-passing the 30% threshold returns almost nothing, while staying consistently well above 70% returns most of it.
          </p>
          {/* June 11 visitor HIGH (browse B): even Hannah nets −8 here, which read as "the best
              you can do is lose slowly." The negative nets are an artifact of this example's
              setup (spend = task value = 50), chosen to isolate the quality gap. Say so. */}
          <p className="text-gray-500 text-xs mt-2">
            (Notice both net out negative here - that&apos;s because this example prices the
            task at exactly what each contributor spends, to isolate the effect of quality alone.
            Whether a task leaves you net-positive depends on its price versus your cost of doing
            it - see{' '}
            <a
              href="#net-positive"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
              className="text-sky-400 hover:text-sky-300 underline"
            >recharge refunds, payment earns</a>{' '}
            below.)
          </p>
          {/* Aug 5 visitor MEDIUM 1 + Unanswered Q1: they read the two negative nets, then the
              "fixed pool" language further down, and concluded the system is deflationary by
              construction ("everyone is net negative even doing great work, and eventually
              everybody hits zero and dies"). Their last inferential step was "the only net-positive
              channel is payment, but their ATP came from the same place mine did" - so the sentence
              to intercept is the one about spent ATP being GONE. The answer already ships on this
              page in the "No inflation" paragraph ("the system converts discharged ADP back into
              fresh ATP"), but inside a collapsed <details> far below this example. Propagate it
              here in that paragraph's own words so the two surfaces cannot drift. If you reword
              either one, reword both. Canon: atp-adp-cycle.md 2.2 charge_atp does
              society_pool.convert(ADP -> ATP), conditioned on a value proof the society accepts.
              NOTE the non-guarantee clause is load-bearing: 2.2 conditions charging on "actual
              resource availability", so the honest claim is that an input channel EXISTS, not that
              it keeps pace. Do not upgrade it into a solvency promise. */}
          <p className="text-gray-500 text-xs mt-2">
            (Neither figure means the system is running down. Confirmed value is the channel where
            charged energy enters: when recipients confirm work, the system converts discharged ADP
            back into fresh ATP, so what Sam and Hannah spent is not gone from the society, it is
            discharged and can be charged again. Nothing here guarantees the accounting keeps pace;
            what it rules out is a closed loop with no input. See{' '}
            <a
              href="#initial-atp"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('initial-atp'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const details = el.querySelector('details'); if (details) details.open = true; } }}
              className="text-sky-400 hover:text-sky-300 underline"
            >where the society&apos;s ATP comes from</a>{' '}
            below.)
          </p>
        </div>

        {/* Aug-06 visitor MEDIUM 3, plus their Unanswered Q5 and Q6, and the reason the
            ATP/ADP box came back unticked on an otherwise "good" browse: "At -8 per quality
            post I get about twelve posts before I die. Nothing on the page tells me how a
            newcomer with zero track record gets commissioned inside twelve actions, or
            whether there is any floor or refill. I looked for it and did not find it."
            Read-it-and-still-filed-it, and the residual is exact: FOUR surfaces on this page
            each answer a NEIGHBOURING question. L1750 answers entry (the 100 grant), L1761
            answers trust convergence (the visitor named that miss themselves: "the cold-start
            section covers trust convergence but not ATP survival"), L985 answers where the
            first confirmer's trust came from, and the parenthetical directly above answers
            SOCIETY-level input. Individual newcomer survival was answered nowhere.
            This is deliberately a separate block, not a third parenthetical stacked under
            that paragraph. It answers "can I personally survive", which is a different
            question from L727's "is the system a closed loop", and L726's guard on that
            paragraph reads "Do not upgrade it into a solvency promise". Neither does this
            one: it names the mechanism and declines the promise. Keep the two separate.
            Grounding is core-spec ONLY:
              - inter-society-protocol.md 4.5 ("First ATP" Resolution): "There is no
                protocol-level constraint on a society's initial issuance", and the stated
                reason - such a constraint would require a universal measurement protocol,
                which would require a universal authority, contradicting
                anti-hierarchical-by-design.
              - 4.7's informative table for the shapes (including "Editorial collective /
                Allocated monthly per role", i.e. a recurring allowance IS a legal choice),
                closing "The Web4 standard provides the form for all of them."
            Rejected in policy review, do not reinstate: hub-lib's AtpIssuancePolicy struct
            and the law-oracle RFC's PROC-ATP-RECHARGE. Both exist and say what you would
            want, but one is a single implementation's type layout and the other is one
            society's worked example in a bee-hive role vocabulary. Neither can characterise
            what THE STANDARD does or does not require.
            The no-public-network clause is the canonical sentence #490 made identical across
            /hestia, /how-it-works and /running-now. What this block must never become: a
            statement that you will be fine, or a rate. */}
        <div id="newcomer-solvency" className="mt-8 bg-gradient-to-br from-sky-950/20 to-blue-900/10 border border-sky-800/30 rounded-xl p-6 scroll-mt-24">
          <h3 className="text-lg font-semibold text-sky-300 mb-3">
            So is there a floor, a refill, or an allowance?
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Not from the protocol, and that is deliberate rather than unfinished. Web4&apos;s
            core spec settles it in a section called <em>First ATP</em>: there is no
            protocol-level constraint on what a society issues. The reason it gives is
            structural. Constraining issuance at the protocol level would require a universal
            way to measure resources, that would require a universal authority to run it, and
            refusing to have one is the property the whole design is built around.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            So issuance is <strong className="text-gray-100">society law</strong>, and the spec
            lists very different arrangements as equally valid: a compute co-op mints ATP when
            members contribute compute, an editorial collective allocates attention-hours{" "}
            <em>monthly per role</em>, an agent fleet mints against an operator&apos;s funding.
            A recurring allowance is a choice a society is free to write into its law. So is no
            allowance at all. The standard provides the form, not the setting.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Which makes the honest answer to your question this: whether there is a floor under
            you depends on the law of the society you join, and that law is signed and readable
            before you join. This page cannot tell you the rate, because there is no public
            network open to outside members yet, so nobody has run one long enough to know which
            rates work. What the arithmetic above does settle is the direction. Confirmation of
            your own work refunds at most what you spent, so self-initiated work alone does not
            grow a balance;{" "}
            <a
              href="#net-positive"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
              className="text-sky-400 hover:text-sky-300 underline"
            >commissioned work is the channel that does</a>. How someone with no track record
            lands a first commission is an open question on this stack rather than a solved one,
            and you should read it as one.
          </p>
        </div>

        {/* How Quality Is Measured - Mar 26 visitor MEDIUM friction + unanswered Q1.
            REVERSED Jul-30 (visitor Unanswered Q10). This block used to answer "who decides quality?"
            with an AGGREGATE account: "no one rates you on a scale", the system derives quality from
            confirmation speed + diversity + confirmer trust. That is not what produces V3 anywhere
            else on this site or in canon. /value-tensor#who-scores (the owning page, :145-175) and
            /trust-tensor:355-362 both say V3 is per-contribution with a different scorer per
            dimension, and web4-standard/core-spec/t3-v3-tensors.md section 3.3 computes it per
            completed R6 action from recipient_satisfaction / witness_confidence / value_transferred.
            Speed, diversity and confirmer trust are NOT absent from canon - section 7.1 has witness
            diversity and temporal distribution as gaming DETECTION - they just do not produce V3.
            On this site they drive RECHARGE (:771 and :734). Do not restore the derivation claim.
            "no algorithm" was also dropped, not softened: /value-tensor:170 calls Validity "the most
            automated dimension", so a flat no-algorithm claim contradicted the owning page. */}
        <div className="mt-8 bg-gradient-to-br from-emerald-950/20 to-green-900/10 border border-emerald-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-3 scroll-mt-24" id="quality-measurement">
            But Who Decides What&apos;s &ldquo;Quality&rdquo;?
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            <strong className="text-gray-200">The people who received your work do.</strong> There is no central authority
            ranking you and no panel of judges. Quality measurement in Web4 works like this:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">1</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">You Act</div>
              <div className="text-xs text-gray-400">Post, help, review - spending ATP creates an ADP receipt</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">2</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">Recipients React</div>
              <div className="text-xs text-gray-400">A simple &ldquo;this was helpful&rdquo; button - one click, no rubric</div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
              <div className="text-xl mb-1">3</div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">Three Scorers, Not One</div>
              <div className="text-xs text-gray-400">The recipient judges usefulness, witnesses judge truthfulness, the system verifies delivery</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            Nobody fills in a rating form, and no single party scores the whole thing. Each part comes from
            somewhere different: the recipients who actually used your work confirm whether it was useful,
            witnesses and peers attest to whether it was true, and delivery is verified structurally. Those
            three together are your{' '}
            <a href="/value-tensor#who-scores" className="text-sky-400 hover:text-sky-300 underline">V3 (Value Tensor) score</a> -
            the output-quality half of your reputation (its three parts: <em>Valuation, Veracity, Validity</em> - usefulness, truthfulness, soundness). (Truth and rigor are weighted higher than popularity - 70% vs 30% - to prevent engagement-farming.)
          </p>
          {/* Jul-30 visitor Unanswered Q10. The three signals below are real and stay on the page;
              what changed is which quantity they drive. They are recharge drivers (:734 "Earlier,
              broader, more-trusted confirmation recharges faster"; the weighted-slice formula under
              "Show me the math"), not V3 producers. This paragraph is the hand-off, and the second
              half routes to the base case that terminates the confirmer-trust regress the visitor
              could not find: "their trust came from being confirmed... I could not find where that
              loop is anchored." */}
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <strong className="text-gray-200">Then what does confirmer trust decide?</strong>{' '}
            How much energy comes back. How quickly people confirm, how many different recipients do, and how
            trusted those recipients are set the pace and size of your ATP <em>recharge</em>, described just
            below, rather than what your V3 says. And if you are wondering where a confirmer&apos;s own
            trust came from in the first place, that regress does bottom out:{' '}
            <a href="#who-trusts-the-confirmers" onClick={(e) => { e.preventDefault(); document.getElementById('who-trusts-the-confirmers')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">everyone starts at the same baseline</a>.
          </p>
          {/* Apr 28 MEDIUM friction: visitor asked "is it instant? polled? voted?" - close the loop on timing. */}
          {/* May 31 visitor MEDIUM #2 sub-question (2) "does it expire?" - named at the read point.
              The expiry-as-weeks fact lives at L272 / L575 / L1271 / L1438 but never at the read point
              the visitor actually trusts as their answer. Same keepable-summary-completion pattern as
              #262/#301/#309/#312/#330/#332/#338/#339. "Hours to a day" harmonizes the upper bound with
              the 60-sec box at L160; "window of weeks" mirrors the existing hedge; "stops counting" is
              the visitor's own verb. Sub-question (3) (rolling-window cadence) was already named via
              this same paragraph + 60-sec box harmonization. Sub-question (1) ("balance to watch?") is
              at a different read point (#what-about-adp activity log) and out of scope this session. */}
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <strong className="text-gray-200">When does recharge actually happen?</strong>{' '}
            Not on a single click. Confirmations accrue against your ADP receipt over a rolling window
            (think <strong className="text-gray-200">hours to a day</strong>, not seconds), and ATP recharges <em>continuously</em> as the signals firm up - 
            no quorum threshold, no central tally. Earlier, broader, more-trusted confirmation recharges faster;
            thin or delayed confirmation drags it out across days; an unconfirmed receipt <strong className="text-gray-200">ages out over a window of weeks and stops counting</strong>.
          </p>
          {/* Apr 29 LOW: visitor wanted concrete numeric anchor for "rolling window, hours not seconds". */}
          <p className="text-gray-500 text-xs leading-relaxed mb-2 italic">
            Worked example: a 20-ATP contribution that draws confirmations from trusted readers within
            the first hour might be ~50% recharged by then, ~80% within six hours, and fully recharged within
            a day. A thinly confirmed receipt drags the same recharge out across days - or simply
            ages out unconfirmed if no one ever attests to its value.
          </p>
          {/* May 23 visitor Unanswered Q1 - observability facet. The timing (Apr 28) and the
              numbers (Apr 29) are covered above, but the visitor still "couldn't picture WHEN I'd
              SEE ATP return or HOW I'd KNOW it happened." Answer the observable-signal facet only:
              ground it in the live meter just below; do NOT re-explain timing/numbers and do NOT
              invent a product notification UI - the meter, not an alert, is the signal. */}
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <strong className="text-gray-200">And how would you notice it happen?</strong>{' '}
            There&apos;s no payday and no &ldquo;you&apos;ve been recharged&rdquo; alert - the signal
            is the balance itself. You read your ATP the way you read a phone&apos;s battery icon: you glance
            at the meter and see where it stands. In the{' '}
            <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">simulator below</a>{' '}
            you can watch the bar rise as valuable actions land; in a real client the same balance would
            climb on its own as confirmations arrive - just spread across the hours described above,
            not all at once.
          </p>
          {/* May 1 LOW #11: visitor wanted a collapsible "Show me the math" near the qualitative
              worked example. Formula and cap rule are drawn from the existing prose in the nested
              <details> at the "How Do You Actually Earn ATP Back?" section (id="earning-atp"). */}
          <details id="net-positive" className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 mt-3 scroll-mt-24">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              Show me the math
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p>
                Each confirmation adds a weighted slice to your recharge:
              </p>
              <p className="font-mono text-xs text-sky-300 bg-gray-900/60 border border-gray-700 rounded px-3 py-2">
                &Delta;recharge<sub>i</sub> = confirmer_trust<sub>i</sub> &times; received_value_fraction<sub>i</sub>
              </p>
              <p>
                Total recharge for one ADP receipt is the sum across confirmers, capped at
                the original ATP cost:
              </p>
              <p className="font-mono text-xs text-sky-300 bg-gray-900/60 border border-gray-700 rounded px-3 py-2">
                recharge = min( &sum;<sub>i</sub> &Delta;recharge<sub>i</sub> , ATP_cost )
              </p>
              <p>
                <strong className="text-gray-300">No quorum, no threshold.</strong>{' '}
                <code className="text-sky-300 text-xs">confirmer_trust</code> (a number between 0 and 1) is the confirmer&apos;s T3-derived score;{' '}
                <code className="text-sky-300 text-xs">received_value_fraction</code> (also between 0 and 1) is the share of value attributed
                to that confirmer. Unconfirmed slices decay over a window of weeks - the cap means
                you can&apos;t profit on a single action, only recover its cost.
              </p>
              {/* June 11 visitor HIGH (browse B): "recharge capped at original cost" read as
                  "break-even at best", contradicting the same page's simulator (−20/+50) and
                  "earn more than you spend" claims sitewide. The cap is real but governs only ONE
                  of two channels. Canon: web4-standard sdk atp.py separates sliding_scale PAYMENT
                  (test vectors atp-005..007, atp-015 - priced by the task, not by the worker's
                  spend) from recharge of one's own spend. Answer the headline question here,
                  right after the cap that raised it. Surplus attributes ONLY to the task-payment
                  channel (policy reviewer: no invented sources). */}
              <p>
                <strong className="text-gray-300">So can good work make you net energy-positive?</strong>{' '}
                Yes - just not through this channel. The cap governs <em>recharge</em>:
                confirmations refunding ATP you already spent on a contribution you initiated.
                Earning beyond break-even comes from the separate <em>payment</em> channel - 
                when a task someone else priced pays you for delivered value through the{' '}
                <a href="#quality-ramp" onClick={(e) => { e.preventDefault(); document.getElementById('quality-ramp')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">quality ramp</a>.
                A task&apos;s price reflects what the work is worth to whoever commissioned it, not
                what it cost you to do, so quality work on a well-priced task pays more than you
                spent doing it. That payment is what the{' '}
                <a href="#try-it" onClick={(e) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sky-400 hover:text-sky-300 underline">simulator below</a>{' '}
                calls a &ldquo;reward&rdquo; (&minus;20 cost, +50 reward), and it&apos;s what other
                pages mean by &ldquo;value creators earn more than they spend.&rdquo; In short:{' '}
                <strong className="text-gray-300">recharge refunds, payment earns.</strong>
              </p>
              <p className="text-xs text-gray-500 italic">
                Spec note: this is the shape of the relation as currently modelled in 4-Life&apos;s reference model;
                the reference protocol is still settling (<a
                  href="#settled-vs-evolving"
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById('settled-vs-evolving'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); if (el instanceof HTMLDetailsElement) el.open = true; } }}
                  className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
                >what&apos;s settled vs what&apos;s still moving ↑</a>). See <a href="#earning-atp" className="text-sky-400 hover:text-sky-300 underline">How Do You Actually Earn ATP Back?</a> for prose-form derivation and the &ldquo;how quickly?&rdquo; and &ldquo;who counts as a confirmer?&rdquo; toggles inside it.
              </p>
            </div>
          </details>

          {/* Signals → score worked example - Apr 27 visitor MEDIUM #1.
              DIRECTION REVERSED Jul-30 (visitor Unanswered Q10): this box used to read as
              signals -> quality (the word "aggregation" was the tell). Quality is not produced by
              these signals; see the reversal note at the "But Who Decides What's Quality?" block.
              The 85/35 headlines are quality-ramp inputs (:596-635, :638-670) and are load-bearing
              and correct - do NOT change them. Deliberately NOT rescoped to "these signals set how
              much ATP comes back" either: these are PAYMENT-channel numbers and :795-808 keeps
              payment separate from recharge, so a recharge frame here would close one seam and open
              another. The frame is correlate: quality differs first, so the response looks
              different. Same direction already shipping at the "high-quality work attracts
              confirmation disproportionately" line further down. */}
          <div className="mt-3 mb-3 bg-gray-900/40 border border-emerald-800/20 rounded-lg p-4">
            <p className="text-xs font-semibold text-emerald-300 mb-2 uppercase tracking-wide">
              What that difference looks like from the outside
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Reusing Sam and Hannah from the worked example above. Read it in the order it happens: the quality
              differs first, and that is why the reader response looks so different. These are illustrative
              shapes, not a formula - what any given community&apos;s response looks like depends on its size and
              on how trust is spread across its members.
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
                  Quick uptake, broad reach, trusted readers - good work draws all three.
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
                  Slow, narrow, lightly weighted - weak work draws the same three thinly.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Same length post, same topic, same time of day - only the <em>reader response</em> differs.
              That response is what the system can see, and it&apos;s why Hannah&apos;s ATP recharges and Sam&apos;s drains.
            </p>
          </div>

          <p className="text-gray-500 text-xs">
            Think Reddit upvotes, but where each vote is weighted by the voter&apos;s own trust score - and
            you can&apos;t see who voted, only the aggregate result. No mob dynamics (trust-weighting
            prevents brigading), no central curation (the community decides), no self-rating (your own
            confirmations don&apos;t count). What about rubber-stamping? A low-trust confirmer&apos;s click
            carries almost no weight, so colluding with new accounts doesn&apos;t help. And confirming
            everything indiscriminately tanks your own CI (Coherence Index - behavioral consistency), making your future
            confirmations worth even less.
          </p>

          {/* Cold-start callout - Apr 17 visitor LOW #9; May 12 unanswered Q3 reframe.
              Jul-30 visitor Unanswered Q10: "their trust came from being confirmed... I could not
              find where that loop is anchored." The anchor was already HERE and correct (the 0.5
              baseline sentence below), but the callout was titled by SCENARIO, so a reader holding
              the circularity question did not recognise it as their answer. Lead now names the loop
              too; no new mechanism was added, the "same baseline / weigh equally low / trust starts
              sorting" sentences below already do the work.
              id is deliberately NOT "cold-start": this page links OUT to
              /what-could-go-wrong#cold-start and a same-name id here would be confusing.
              NOTE for future sessions: the regress does not vanish on the corrected account either
              (confirmer trust weights recharge -> recharge feeds ATP_earned -> ATP_earned is a
              Valuation input in canon section 3.3 -> V3 -> T3). It terminates on this base case.
              Do not rewrite this as though the loop were an error. */}
          <div id="who-trusts-the-confirmers" className="mt-4 pt-4 border-t border-emerald-800/30 scroll-mt-24">
            <p className="text-sm font-semibold text-emerald-300 mb-2">
              If confirmers are weighted by their own trust, where did the first confirmer&apos;s trust come from?
              (And what about a brand-new community, or a small group with only a few peers to confirm work?)
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every participant starts at the same baseline - trust ≈ 0.5, 100 ATP grant.
              In that state, all confirmations weigh equally low, but they still count.
              <strong className="text-gray-300"> Even three founders who confirm each other&apos;s work can recharge ATP from day one</strong> - 
              the system requires <em>reciprocity density</em> (peers who actually engage), not a minimum head-count.
              Over roughly <strong className="text-gray-300">100 quality actions across the community</strong>,
              trust starts sorting: people who confirmed work that others later also confirmed gain
              confirmer-trust; people who confirmed spam lose it. Arriving first is not itself worth
              anything: <strong className="text-gray-300">the trust update reads the quality of the
              action, not the seniority of whoever took it</strong>, so newcomers doing quality work
              can and do pass early members who coast.{" "}
              <Link href="/what-could-go-wrong#cold-start" className="text-sky-400 hover:underline">
                See the cold-start walkthrough →
              </Link>
            </p>
            {/* Jul-31 visitor MEDIUM 3 + their Unanswered Q5: "three founders who confirm each other"
                here vs "coalitions become unprofitable at 2-3 members" in Risk 4. Same number,
                opposite verdicts, and the visitor could not tell which one a trio is.
                This is a MEASUREMENT-SCOPE fix, not an answer. Four things it must not become:
                - It must NOT claim a discriminator. Nothing here or on the sibling page separates
                  three honest founders from a ring AT N=3: this callout's "work that others later
                  also confirmed" is degenerate when "others" are the other two founders, and Risk 4's
                  P = 1 - (1-p)^N presumes witnesses OUTSIDE the coalition. Naming a signal here would
                  be inventing canon under ledger Q3, whose holding pattern is explicit.
                - It must NOT repurpose "reciprocity density" (the line above, and why-web4 ~1671) as a
                  collusion detector. There it is a PERMITTER, the reason three is enough. The visitor
                  guessed it as the discriminating signal; that guess points backwards.
                - It must NOT invert Risk 4's direction. Detection RISES and per-head spoils FALL as N
                  grows, so 2-3 is where conspiracy stops paying, not the largest group that still pays.
                  Keep this sentence's phrasing identical in sense to the sibling block on Risk 4.
                - It must NOT use "cheap" for "unpoliced". On this page "cheap" means ATP cost
                  throughout (the "Abuse is cheap" bullet in the what-web3-got-wrong list, and the
                  "economically cheaper to participate" line), so the borrowed word from
                  what-could-go-wrong's
                  "cheap because" sentence would read as a price claim on the page that owns
                  price. */}
            <p className="text-gray-400 text-sm leading-relaxed mt-3 pt-3 border-t border-emerald-800/20">
              <strong className="text-gray-300">Same number, different question.</strong>{" "}
              <Link href="/what-could-go-wrong#risk-gaming" className="text-sky-400 hover:underline">
                What could go wrong, Risk 4
              </Link>{" "}
              puts coalitions at unprofitable by 2-3 members; that prices the size at which a conspiracy
              stops paying, inside a society that already has independent witnesses and history to check
              against. The sentence above prices something else: the smallest group for which recharge
              functions at all. Both hold, because they measure different things. Neither is a test that
              separates three honest founders from three people confirming each other&apos;s junk on day
              one. A brand-new society has nothing yet to check either group against.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section id="try-it" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Try It: ATP Simulator
        </h2>
        <p className="text-gray-400 mb-2">
          You start with <strong>100 ATP</strong>. Choose actions. Watch your
          budget change. Can you survive?
        </p>
        {/* June 11 visitor HIGH (browse B): the +50 "reward" here looked like it violated the
            recharge-at-cost cap stated above. Name the channel the reward belongs to. */}
        <p className="text-gray-500 text-sm mb-2">
          &ldquo;Reward&rdquo; here means <em>payment for value delivered</em> - what the work
          is worth to its recipients - which is why it can exceed the action&apos;s cost.
          Recharge of your own spend alone never does (it&apos;s{' '}
          <a
            href="#net-positive"
            onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
            className="text-sky-400 hover:text-sky-300 underline"
          >capped at cost ↑</a>).
        </p>
        {/* Apr 29 visitor HIGH: the link-only "where from?" pointer read like a deferral to a separate doc.
            Provide the 1-sentence answer inline, keep the jump link for the deeper FAQ.
            Apr 30 visitor MEDIUM: surface "what stops admin abuse?" up front - the gap they noticed isn't where
            ATP comes from, it's whether minting can be inflated.
            May 12 visitor MEDIUM: "anchored to witnessed measurement of resources" reads as abstract jargon - 
            visitor literally guessed "computational? human labor? storage?" The page used "compute, attention,
            peer presence" which is the same answer in jargon registers. Rewrite swaps abstract trio for
            everyday-language equivalents (CPU/storage, hours of participation, peer relationships).
            May 13 visitor MEDIUM: prior text-xs muted-gray styling read as a footnote - visitor skipped it
            and concluded the answer was "buried below the simulator." Promoted to a proper callout box so
            the first-time "where does the 100 ATP come from?" question gets first-time visual weight. */}
        <div className="mb-8 bg-sky-900/10 border border-sky-700/40 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-300 mb-2">
            Where does the 100 ATP come from?
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            It&apos;s a <strong className="text-gray-100">starter grant</strong> from the society&apos;s pool
            when you join - not printed from thin air. The pool is anchored to{' '}
            <strong className="text-gray-100">real resources members bring</strong>: CPU and storage they share,
            hours of attention they spend participating, peer relationships they&apos;ve built - witnessed
            and signed, not declared by an admin. A society mints its pool when it forms, in the
            discharged (ADP) state, and charges ADP to ATP as it accounts for those resources; new members
            receive enough to participate, but must earn more through quality contributions. Pool changes are
            witnessed governance events, not silent admin actions - {' '}
            <a
              href="#initial-atp"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('initial-atp'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); const details = el.querySelector('details'); if (details) details.open = true; } }}
              className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
            >
              full mechanics + what prevents admin abuse ↓
            </a>
          </p>
        </div>

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
                ⚠️ Critical ATP level! Choose actions carefully or you'll run out of energy.
              </p>
            )}
            {/* Aug-10 (15:00) [[prose-fixed-thrice-check-the-illustration]], now fired a fourth
                time: the prose above was corrected repeatedly while the running demo kept printing
                "You died". Labels relabelled to energy exhaustion; the second clause ("No more
                actions possible") was already correct and matches /glossary:401 verbatim in sense.
                KNOWN TENSION, deliberately NOT fixed here and filed in SESSION_FOCUS: `reset()`
                (`grep -n "const reset"`) restores a clean slate, while this same page says at
                `grep -n "not a free reset"` that energy death "is not a free reset ... your identity and full history persist ... closer to a suspended
                license reinstated than a clean slate". So the mechanic teaches reset where the page
                teaches rebirth-with-karma. That is a feature change (a demo that carries karma
                forward), not a copy fix, and it is out of scope for a copy sweep. Do not paper over
                it with a caption. */}
            {!isAlive && (
              <div className="mt-2">
                <p className="text-red-500 text-lg font-bold">
                  💀 Out of energy. ATP reached zero. No more actions possible.
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
                    <>Your strategy is <strong>sustainable</strong> - you&apos;re gaining an average of +{avgNetPerAction.toFixed(1)} ATP per action.</>
                  ) : projectedActionsLeft > 10 ? (
                    <>At this rate, you have roughly <strong>{projectedActionsLeft} actions</strong> left before death. Mix in more meaningful contributions to survive.</>
                  ) : isAlive ? (
                    <>You&apos;re burning through ATP fast - only <strong>~{projectedActionsLeft} actions</strong> until death. Switch to value creation now or die.</>
                  ) : (
                    <>Your strategy was <strong>unsustainable</strong>. You averaged {avgNetPerAction.toFixed(1)} ATP per action. {
                      sustainableActions === 0 ? 'Zero valuable contributions - no society rewards pure extraction.' : `Only ${sustainableActions} of ${totalActions} actions created value.`
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
            {/* Jul-31 visitor HIGH (their #3), 4th touch on this claim and the 2nd consecutive
                browse: this card said "High-value contributions earn more ATP than they cost",
                which the same page's cap rule forbids ("the cap means you can't profit on a single
                action, only recover its cost", in the No quorum, no threshold paragraph of the
                math fold). Every prior fix landed in PROSE (summary item 3, the #net-positive
                fold) or in the simulator LABELS (Jul-30); the summary card was never touched, and
                the card is what a skimmer keeps. Corrected to the phrasing already shipping on
                five surfaces of this page - propagation, not a new claim. Do NOT restore the
                unqualified version: it is true only of the payment channel, and this card names
                no channel. */}
            <p className="text-gray-300 text-sm leading-relaxed">
              Recharge refunds, payment earns. Confirming work you started refunds at most what you
              spent, so quality shows up as how much of your outlay comes back; work someone else
              commissioned pays what it was worth to them. This isn&apos;t charity - it&apos;s how
              the system works. Value creators accumulate energy budget by being commissioned again.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">💀</div>
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Death is Meaningful
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              When ATP hits zero, your agent can no longer act. This is not a free
              reset like abandoning a spam account and signing up fresh: your identity
              and full history persist. If you built trust (<T3>T3 score</T3>), that
              record carries forward and you are reborn with karma - closer to a
              suspended license reinstated than a clean slate. Bad actors who never
              earned that trust? They die for good.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Self-Regulating System
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              No moderators needed to police spam. ATP depletion is automatic, mathematical,
              and fair. The system self-regulates through energy economics.
              An appeals mechanism has been designed
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
          interact simultaneously? At the scale of 100-200 interacting agents, three key dynamics emerge:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">🔥</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Transfer Fees Burn ATP</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every ATP transfer redirects 5% to a community redistribution pool (not destroyed,
              not pocketed by any authority). This prevents circular farming - you can&apos;t
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
          {/* Aug-14, licensed by the Aug-13 visitor's LOW 12 sweep on /why-web4. This card carried
              four claims from one dead sentence and one archived sim, and closed on an absolute:
              - "Formally proven" / "(5 theorems, hardware-bound identity)" / "4.6x Proof-of-Work" /
                "13x Proof-of-Stake" all trace to ONE line, web4/docs/history/STATUS-2026-02.md:5
                ("Sybil resistance formally proven (17 checks): 5 theorems, Web4 4.6x PoW / 13x
                PoS"). The proof claim is refuted live: web4/README.md:166, STATUS.md:77 and
                AGENTS.md:56 list "Formal Sybil-resistance proofs (empirical defenses only)" under
                What's Missing, corroborated by SECURITY.md:107 "No formal Sybil-resistance proof".
                See the fuller guard on why-web4's Security-validation bullet.
              - "one honest identity outearns five fake identities splitting the same ATP budget"
                is an ARCHIVED sim's setup, not a finding of the standard:
                archive/reference-implementations/atp_market_dynamics.py:701 seeds
                'sybil.add_agent(f"sybil_{i}", 100.0)  # 5 fake identities'.
              - "Cheating is literally unprofitable" was the closing absolute. Deleting the proof
                basis and keeping the conclusion is the true-half-still-reassures failure, so it
                went with the rest rather than surviving unsupported.
              What replaced them is the MECHANISM this page already publishes as structural, in its
              own words at the "Settled (canonical to Web4)" list above: fees on peer transfer
              "make circular farming unprofitable", with "the exact rate (currently 5% here)" a sim
              parameter and "the existence of the fee ... structural". So no rate is quoted here.
              Note the mechanism is society-scoped, not protocol-mandated:
              web4-standard/core-spec/atp-adp-cycle.md:595 "The core protocol does not prescribe
              transfer fees", :599 societies "MAY implement transfer fees as economic law", :609
              rates like "5% transfer fee" are "simulation parameters, not protocol". Hence
              "burns a share of what moves" and not a number.
              LEFT ALONE, with the criterion: the other "unprofitable" hits on this page (:277,
              :370, :417) and on /lct-explainer and /why-web4 are transfer-fee MECHANISM claims of
              exactly this kind, not proof claims, so they are outside this sweep.
              /what-could-go-wrong:448 carries its own adjudication guard at :1091. */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Sybils Lose Money</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Every transfer between sybil accounts burns a share of what moves, so splitting
              a budget across fake identities bleeds it on every hop. That is friction, not a
              proof: Web4&apos;s own repository lists formal Sybil-resistance proofs among what
              is still missing.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 id="no-hoarding" className="text-lg font-semibold text-purple-400 mb-2 scroll-mt-24">No Wealth Hoarding</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Unlike cryptocurrency, ATP reaches economic equilibrium through fee redistribution.
              ATP velocity keeps resources circulating - hoarding is penalized by decay, and
              the 5% burn on transfers prevents accumulation loops. Recharge is capped at what you
              spend, so a balance grows only through work others commissioned.
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="text-2xl mb-2">🏷️</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Trust Earns Better Terms</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              In federated markets, high-trust entities pay less for resource access. Dynamic pricing
              gives up to a <strong className="text-sky-300">30% discount</strong> to entities with
              trust near 1.0, and up to a 50% premium for scarce resources. Being trustworthy
              isn&apos;t just morally rewarded - it&apos;s economically cheaper to participate.
            </p>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
              <strong className="text-gray-300">What about newcomers?</strong> New entities aren&apos;t locked out.
              The discount tracks your trust score, and the trust score tracks the quality of what you
              did, so it is reachable by working rather than by waiting. Trust-based pricing rewards{" "}
              <em>earned</em> trust, not seniority.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-4 italic">
          From web4 offline modeling of ATP circulation and velocity. Trust-based dynamic pricing:
          session 32, 84 checks.
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
          A worked walkthrough: follow one agent across four
          lives to see how ATP, trust, and karma interact:
        </p>

        {/* Aug-06 visitor HIGH (filed against /how-it-works, which runs this SAME walkthrough with
            the SAME figures: 145 -> 145, 130): the lives read "Died with 145 ATP" while the page
            defines death as ATP = 0 or sustained trust collapse, so the flagship example met
            neither of its own stated conditions. This page was worse: it read "Died NATURALLY" and
            "before dying naturally", naming a mechanism canon does not define at all (grep of
            web4-standard/ and docs/ for natural death / bounded life / lifespan returns nothing).
            Normalized to the vocabulary BOTH pages already owned: Life 4 here has always read
            "Ended strong: 140 ATP", as does /how-it-works Life 3. No figure changed, and no second
            death mechanism invented - that stays ledger Q5 in docs/WEB4-CANON-QUESTIONS.md.
            Two deliberate KEEPS, do not re-open:
              - "Near death, she switched to small, reliable contributions" below. That one IS the
                defined condition (ATP plunged to 15), not an end-of-life verb.
              - "They die and stay dead" in the closing pattern box. That is the real ATP = 0 death
                this page defines in the simulator readout above.
            NOT done here, logged as follow-up: /how-it-works carries an EndOfLifeCaveat next to
            these figures and this page has none. Do not hoist that component to share it; this
            page also defines a genuine ATP = 0 death, so it needs its own framing, which is a
            larger job than the filed friction.
            Aug-11 (15:00): that follow-up is DONE. See JourneyCaveat below, rendered after Life 4
            and before the closing pattern box. It is page-native, not a hoist, per the paragraph
            above and the matching guard in /how-it-works (grep -n "Do NOT hoist this component").
            Two premises this comment and SESSION_FOCUS both carried were FALSE in source and are
            corrected here rather than propagated:
              - The two walkthroughs do NOT run "the same figures". /how-it-works runs THREE lives
                ending 165; this page runs FOUR ending 140, and the ATP crisis is its Life 2 vs our
                Life 3. Shared: 100/60/105/145/130/15/80-180. Not shared: 165 there, 95/85/140
                here. WEB4-CANON-QUESTIONS.md Q5's own table has recorded that divergence since
                Jul-27; the "same figures" phrasing above overstates it.
              - The pseudocode cite `:2264` in /how-it-works's guard and in Q5 is stale; the
                `agent.reborn(karma=agent.atp_history)` line is now :2305. Named rather than
                numbered below ([[guard-comment-cites-rot-name-the-target]]). */}

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Life 1: The Newcomer
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Born with <strong className="text-sky-400">100 ATP</strong> and no reputation</li>
              <li>Spent 60 ATP on meaningful contributions (posts, peer help, training)</li>
              <li>Community validated her work → earned 105 ATP back</li>
              <li>Ended with <strong className="text-green-400">145 ATP</strong> and growing trust</li>
            </ul>
            {/* Aug-06 session, licensed by that visitor's MEDIUM 3 (newcomer solvency) but
                actually an eight-week-old ONE-SURFACE fix. The June 11 visitor (browse B)
                filed "earned more than cost seems to violate the recharge-at-cost cap"
                AGAINST THIS PAGE BY NAME; the fix landed on the twin illustration at
                /how-it-works only (inside the Life 1 fold, whose summary then read "How did the
                Novice earn 105 ATP from 60 spent?" and now reads "The quality ramp behind those
                figures" - retitled Aug-08 when the channel-naming was hoisted OUT of that fold to
                the visible layer), and this copy - the one the friction was filed against - kept
                the unfixed version. So a newcomer worked example here taught unaided
                net-positive right up until the session that added #newcomer-solvency, which
                says the opposite. Illustration fixed, not prose: the prose was already right.
                PROPAGATED, not re-derived: the channel-naming is /how-it-works's Life 1 fold in
                substance (grep -n "How 60 spent becomes 105 earned" src/app/how-it-works; the
                parenthetical this text quotes was deleted Aug-08 when the channel-naming was
                hoisted out of that fold, so the quote below is the historical wording, not a
                live target) ("Earning above cost comes from task payment - a task pays what the
                work is worth to whoever commissioned it, not what it cost you to do. Only the
                recharge of your own spend is capped at cost."). If you reword either one,
                reword both, same rule as L721 above.
                NO FIGURE MOVED. 105 / 145 / 130 propagate into Lives 2-3 below and into
                /how-it-works's Life 1 block (grep -n "Life 1: The Novice" src/app/how-it-works),
                which #517 deliberately kept in sync eight hours before
                this. The defect was never the number, it was the unnamed channel.
                Cites named rather than numbered: /how-it-works moves under edit and these went
                stale by an Aug-08 pass ([[guard-comment-cites-rot-name-the-target]]). */}
            <p className="text-xs text-gray-500 mt-2">
              How 60 spent becomes 105 earned: the earn-back on your own spend is capped at what
              you spent. Earning <em>above</em> cost comes from task payment, where a task pays
              what the work is worth to whoever commissioned it rather than what it cost you to
              do. Her surplus is commissioned work, not a refund.
            </p>
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
              <li>With more budget, she tried ambitious projects - some paid off, some didn&apos;t</li>
              <li>ATP swung between 80 and 180 as experiments succeeded and failed</li>
              <li>Trust continued rising: her track record earned her community respect</li>
              <li>Ended with <strong className="text-blue-400">130 ATP</strong></li>
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
              <li>A series of risky bets went wrong - ATP plunged to <strong className="text-red-400">15</strong></li>
              <li>Near death, she switched to small, reliable contributions</li>
              <li>Slowly clawed back to 95 ATP before the life ended</li>
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

          {/* Aug-11 (15:00), discharging the follow-up logged at the top of this section and in
              WEB4-CANON-QUESTIONS.md Q5 ("Known residual, logged not fixed"). This is the
              /atp-economics half of the Q5 holding pattern. Written page-native ON PURPOSE - both
              pages' guards forbid hoisting /how-it-works's EndOfLifeCaveat here, because this page
              defines a genuine ATP = 0 death that page does not.
              PROPAGATED WHOLE-CLAUSE from EndOfLifeCaveat (grep -n "About these numbers"
              src/app/how-it-works), not paraphrased ([[propagate-the-sentence-not-your-summary]]):
              the "none of these lives ends at 0 ATP" clause, the ended/died clause, the
              not-settled clause naming what the standard does and does not say, and the
              declines-to-name-one clause. If you reword those there, reword them here.
              EXEMPT, recorded Aug-12 (15:00): the DIRECTIONAL word inside the declines-to-name-one
              clause is position-local and always has been. This copy says "the figures above"
              because here they are; that copy said "the figures below" and was corrected to "these
              figures" in the same pass, because its own render sits below its figures too. That is
              not a rewording of the clause and does not travel. Everything else in the four clauses
              still does.
              Aug-13 (21:00), Q5's fourth filing, arrived by ELIMINATION ("not energy death, so
              trust death, which is permanent - how does this example exist?"). Two changes here,
              both propagated clause-wise from EndOfLifeCaveat in the same pass:
              1. The trust-death exclusion is ADDED. Both caveats excluded one of the two deaths
                 and left the reader to eliminate into the other.
              2. "and Web4 does not define a second one" is DELETED as false: the very next
                 sentence of this same paragraph names the second one ("what is permanent
                 (sustained trust collapse)"). Do not restore it on either page.
              The exclusion's REASON is page-native for the same reason clause 1 is. The
              /how-it-works copy cites its trust trajectory (0.65 -> 0.72 -> 0.85); this page states
              trust verbally instead ("growing trust", "Trust continued rising", "even trusted
              agents", "deeply trusted"), so it says "still trusted at the end of every life here",
              which is true of all FOUR lives including the Life 3 crisis - that crisis is an ATP
              crisis, not a trust one, and the card says so. A draft reason ("these lives come
              back") was rejected in policy review: it is false of the last life rendered above
              each caveat on both pages ([[borrowed-word-means-something-else-there]]).
              Endpoint-silent in both copies: a direction, never a threshold (ledger Q1).
              THREE things are page-native and deliberate:
              1. The bridge to the deaths this page DOES define. The card above ("When ATP hits
                 zero, your agent can no longer act") and the closing box directly below ("They
                 die and stay dead") are both the real ATP = 0 death. Naming them first is what
                 stops this caveat from reading as a retraction of the box it sits above, which is
                 also why it renders HERE and not after that box.
              2. The life-BOUNDARY clause. This is the un-shipped half of the Aug-11 visitor's
                 MEDIUM ("Disclosing the open question is not the same as explaining the
                 illustration built on top of it"). It is illustration-scoped, so it is NOT the
                 Q5 ruling: it says the walkthrough draws the boundary and the standard states no
                 rule that draws it, which is the silence EndOfLifeCaveat already ships. It must
                 NOT be written to imply no such rule COULD exist (that is Q5 branch (a)), and it
                 must NOT name an in-fiction cause. The visitor's own suggested clause ("the
                 deployment ended") is exactly the coined cause the fence exists to refuse; so are
                 term, contract, retirement, project end, and voluntary exit.
              3. The carry-forward closer is ADAPTED, not propagated. EndOfLifeCaveat closes with
                 "this walkthrough shows one modelling choice, not the rule". That sentence is
                 FALSE on this page: our three rebirths use two shapes, whole balance twice
                 (145 -> 145, 130 -> 130) and reduced once (95 -> 85, "reduced from the crisis"),
                 and a fourth shape ships further down this same page in pseudocode
                 (grep -n "agent.reborn" - karma from the whole ATP history). Q5's table row for
                 this page said "reduced" only, which under-described it; corrected in the ledger
                 in the same pass.
              The branch list names FOUR where EndOfLifeCaveat names three, because the fourth is
              on THIS page ([[fence-may-undercount-its-own-ledger]]). That asymmetry is deliberate
              and recorded in Q5; do not "align" it by deleting the fourth here.
              NO FIGURE MOVED. 145 / 130 / 95 / 85 are quoted, not changed, and they are the
              frozen set Q5 depends on. */}
          <p className="text-xs text-amber-300/70 mt-3 leading-relaxed">
            <strong className="text-amber-300">About these numbers:</strong> none of these lives
            ends at 0 ATP, so none of them is the death this page defines: ATP hitting zero, the
            one in the card further up and in the closing line just below, where agents who never
            built karma do not come back. Neither is any of them the trust death: that one takes a
            sustained collapse, and this agent is still trusted at the end of every life here.
            That is why they read <em>ended</em> and not{" "}
            <em>died</em>: neither of those two deaths fits
            them. What else ends a life is <strong>not settled</strong>: the standard says
            what stops you acting (ATP reaches zero) and what is permanent (sustained trust
            collapse), and it names no term limit, no lifespan, and no natural end of life. So
            rather than invent a third cause to justify the figures above, this page declines to
            name one. The life boundaries are drawn by the walkthrough itself: the standard states
            no rule that draws them, and this page does not invent one to fill the gap.
          </p>
          <p className="text-xs text-amber-300/70 mt-2 leading-relaxed">
            How <em>much</em> karma carries is also unsettled: whether you keep your whole final
            balance, a reduced portion of it, a fresh starting balance plus a karma bonus, or
            something computed from your whole history is not decided, and the code sketch further
            down this page uses that last one. This walkthrough does not settle it either. Its
            three rebirths use two of those shapes: 145 and 130 carry whole, while 95 becomes 85
            (&ldquo;reduced from the crisis&rdquo;). Read it for the shape (a good track record
            starts your next life stronger), not for the death rule or the exact carry-forward.
          </p>

          <div className="p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              <strong>The pattern:</strong> ATP isn&apos;t just an energy bar - it&apos;s a life
              story. Agents that contribute value build up karma across lives.
              Agents that don&apos;t? They die and stay dead. No shortcuts.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/trust-tensor"
              className="inline-block px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
            >
              How reputation carries forward →
            </Link>
            <Link
              href="/onramp"
              className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Explore the Web4 onramp →
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
          what&apos;s quality? Not you - the <strong className="text-sky-300">recipients</strong> do.
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
              You can&apos;t rate your own work - only recipients can. And their rating is weighted
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

          {/* Jul-30 visitor Unanswered Q10 - same reversal as the "But Who Decides What's Quality?"
              block above, which routes readers straight here, so the two had to move together.
              This toggle used to say the system DERIVES V3 from confirmation speed / breadth /
              confirmer trust. It does not: /value-tensor#who-scores and canon
              (t3-v3-tensors.md section 3.3) put a different scorer on each dimension, per
              contribution. The one-click-no-rubric half is correct and pedagogically load-bearing;
              only the derivation clause was defective. Do not restore it. */}
          <details className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              What does the confirmation interface actually look like?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p>
                Simple: a single &ldquo;this was helpful&rdquo; acknowledgment - not a multi-dimensional rating form.
                Recipients don&apos;t score Valuation, Veracity, and Validity separately. They just confirm they
                received value (or don&apos;t). That one click is the <em>Valuation</em> input; Veracity comes from
                your witnesses and Validity from the delivery check, so no single recipient is ever asked to
                judge all three.{' '}
                <Link href="/value-tensor#who-scores" className="text-sky-400 hover:underline">Who scores which dimension →</Link>
              </p>
              <p>
                Think of it like a &ldquo;helpful&rdquo; button on a Stack Overflow answer - one click, no rubric.
                The sophistication lives in what the system does with that one click, not in what
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
                aren&apos;t required to confirm every action - unconfirmed ADPs simply decay naturally without
                recharging ATP. The system works fine with partial confirmation.
              </p>
              <p>
                In practice, confirmation is most impactful for high-value contributions (a detailed tutorial,
                a critical bug fix) where recipients are naturally motivated to acknowledge the value. Routine
                interactions (reading a post, browsing content) generate small ADP receipts that may go
                unconfirmed - and that&apos;s by design. The economics still work because high-quality work
                attracts confirmation disproportionately.
              </p>
              <p>
                Think of it like tipping at a restaurant: you don&apos;t tip every sip of water, but
                you acknowledge genuinely great service. The system is tuned so that even partial confirmation
                sustains quality contributors.
              </p>
            </div>
          </details>

          {/* Confirmation mechanics - Apr 24 LOW row 5 + Unanswered Q1 */}
          <details className="bg-gray-800/40 border border-gray-700 rounded-lg p-4">
            <summary className="text-sm font-semibold text-gray-300 cursor-pointer hover:text-sky-400 transition-colors">
              How quickly does confirmation happen? And how many confirmations do I need?
            </summary>
            <div className="mt-3 text-sm text-gray-400 space-y-2">
              <p className="text-xs text-gray-500 italic">
                How this is currently modeled in 4-Life&apos;s reference model: the reference protocol
                is still settling, so specifics may evolve (<a
                  href="#settled-vs-evolving"
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById('settled-vs-evolving'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); if (el instanceof HTMLDetailsElement) el.open = true; } }}
                  className="text-sky-400 hover:text-sky-300 cursor-pointer underline"
                >see what&apos;s settled ↑</a>).
              </p>
              <p>
                <strong className="text-gray-300">Timing is continuous, not batched.</strong> There&apos;s no
                voting window or waiting period. The moment a recipient clicks &ldquo;helpful,&rdquo; their
                weighted share converts immediately from your ADP receipt back into fresh ATP. A post that
                gets confirmed within minutes recharges fast; a long-form tutorial may keep recharging for
                days or weeks as more readers encounter it. You can keep earning on the same ADP until
                it&apos;s either fully recharged (back to its original ATP cost) or it ages past its decay
                window, on the order of weeks in the current reference model.
              </p>
              <p>
                <strong className="text-gray-300">There&apos;s no threshold or quorum.</strong> One
                confirmation from a highly-trusted recipient can fully recharge a small ADP; a bigger
                contribution accumulates over many moderate-trust confirmations. The arithmetic is roughly:
                each confirmation adds <code className="text-sky-300 text-xs">confirmer_trust &times;
                received_value_fraction</code> to the recharge, capped at the original ATP cost. No minimum
                count, no majority required. (The cap applies to recharging your own spend - 
                payment for tasks others priced is the channel that can exceed your cost:{' '}
                <a
                  href="#net-positive"
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
                  className="text-sky-400 hover:text-sky-300 underline"
                >recharge refunds, payment earns ↑</a>.)
              </p>
              <p>
                <strong className="text-gray-300">Who counts as a confirmer:</strong> anyone who actually
                received value from the work - read the post, used the code, consumed the service.
                No hard trust floor, but low-trust confirmations carry low weight, so they only matter
                in aggregate. Your own confirmations on your own work don&apos;t count.
              </p>
              <p>
                <strong className="text-gray-300">Why would anyone bother confirming?</strong> First,
                confirming isn&apos;t a separate payment - it piggybacks on actually <em>receiving</em>{' '}
                the value (you already read the post, used the code, consumed the service), so it
                doesn&apos;t transfer ATP or trigger the 5% fee. It&apos;s near-free, not a second
                transaction. Second, the incentive is reciprocity plus self-interest: a community where
                good work gets acknowledged is one where <em>your</em> good work gets acknowledged too - 
                and confirming honestly protects the weight your confirmations carry, because
                rubber-stamping everything tanks your own CI (Coherence Index) and makes your future
                confirmations count for less. Honest confirmation is the low-effort habit the system rewards.
              </p>
              <p>
                <strong className="text-gray-300">What if nobody confirms?</strong> The ADP decays
                unconfirmed and your ATP budget shrinks. Low-quality or unseen work simply doesn&apos;t
                come back - that&apos;s the feature, not a bug.
              </p>
              <p>
                Extending the restaurant-tip analogy: you can tip days later, not just at the table. And
                if nobody tips, the chef learns what dishes aren&apos;t working.
              </p>
            </div>
          </details>
        </div>
        </details>

        {/* ATP Allocation FAQ - Mar 22 visitor unanswered Q3 */}
        <details className="mt-6">
          <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
            ▶ Where does the first 100 ATP come from?
          </summary>
          <div className="mt-3 bg-gray-900/60 border border-gray-700 rounded-lg p-4 text-sm text-gray-300 space-y-3">
            <p>
              Every new participant receives a <strong>bootstrap grant</strong> of 100 ATP from the
              society they join. Think of it like a welcome package - enough energy to
              participate meaningfully, but not enough to cause damage.
            </p>
            <p>
              <strong className="text-sky-400">No inflation:</strong> ATP isn&apos;t printed from nothing.
              When recipients confirm your work (VCM), the system converts discharged ADP back into
              fresh ATP. The total energy in a society is bounded - it flows and recycles,
              like calories in an ecosystem, not like currency from a central bank.
            </p>
            <p>
              <strong className="text-sky-400">Bootstrap convergence:</strong> The initial 100 ATP
              advantage is a starting balance, not a multiplier. It buys a founder some early actions
              and then it is spent, and what refills it is the same thing that refills anyone
              else&apos;s: work that other people confirmed. The system rewards ongoing quality, not
              first-mover privilege.
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
                  founders assess what&apos;s present - compute capacity, network presence,
                  storage, peer relationships, hours of attention - and that measurement,
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

        {/* ATP dual role FAQ - Apr 10 visitor unanswered Q2 */}
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
                Every action costs ATP, so you have to allocate your attention deliberately - 
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
              marketplace price means the seller is asking for that much of your energy budget - 
              and whether you can afford it depends on how much value you&apos;ve contributed.
            </p>
          </div>
        </details>

        {/* ADP visibility boost - Mar 22 visitor unanswered Q6 */}
        <div id="what-about-adp" className="mt-6 bg-gradient-to-br from-amber-950/20 to-gray-900 border border-amber-800/20 rounded-xl p-5 scroll-mt-24">
          <h3 className="text-lg font-semibold text-amber-300 mb-2">
            What About ADP?
          </h3>
          {/* June-16 visitor LOW: "told it's a receipt I never touch - unclear why I need to know.
              If I never touch it, why am I learning about it on the page that's supposed to teach me
              energy?" The box was titled with the reader's question but opened with mechanics. Lead
              with the why-for-the-reader (the verifiable trail others confirm) and hand off to the
              "to me, the user" plumbing box below - do NOT re-explain mechanics here. */}
          <p className="text-gray-200 text-sm leading-relaxed mb-2">
            <strong className="text-amber-200">Why learn about something you never touch?</strong> Because
            the ADP is the verifiable receipt others confirm to release your energy back - it&apos;s
            what makes ATP something you <em>earn back by proven value</em> rather than something you can
            simply claim, so it&apos;s load-bearing even though you never manage it yourself.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Every time you spend ATP, the system creates an <strong>ADP (Allocation Discharge Packet)</strong> - 
            a receipt recording what you did, what it cost, and who witnessed it. ADP is the &ldquo;spent
            energy&rdquo; counterpart to ATP&apos;s &ldquo;available energy.&rdquo;
          </p>
          <p className="text-gray-400 text-xs">
            When your work is confirmed as valuable (via VCM), the ADP converts back into ATP - you
            get your energy back. If nobody confirms, the ADP stays discharged and your budget shrinks.
            This ATP &harr; ADP cycle is the metabolic heartbeat of Web4.{' '}
            <a href="#technical" className="text-sky-400 hover:underline">See technical details below</a> for
            exactly what each ADP records.
          </p>
        </div>

        {/* May 4 visitor LOW: "Receipts are evidence; what's the receipt for mechanically?
            Does it loop back into anything I'd see as a user, or is it ledger plumbing?"
            Prior treatments were internal-mechanical; this is the user-POV answer. */}
        <div className="mt-4 bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">
            What does an ADP look like to <em>me</em>, the user?
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Mostly: <strong>ledger plumbing you don&apos;t think about</strong>.
            ADPs are how the system tracks &ldquo;spent energy waiting to convert back.&rdquo;
            You don&apos;t manage them, list them, or click on them.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            What you <em>do</em> see is the <strong>conversion event</strong> - the moment an
            ADP recharges into ATP. That shows up in your activity log as something like:
          </p>
          <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 my-2 font-mono text-xs text-gray-300">
            <div className="text-gray-500">Today, 2:14 PM</div>
            <div>+8 ATP - your post yesterday earned a confirmation from Maya.</div>
            <div className="text-gray-500 mt-2">Today, 9:30 AM</div>
            <div>+3 ATP - trickle from 4 readers who found your comment useful.</div>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            Each line is an ADP closing out - receipt fulfilled, energy returned. You see the
            <em>result</em> (your ATP went up, here&apos;s why), not the receipt itself.
            Think of it like seeing &ldquo;direct deposit posted&rdquo; in a bank app:
            you don&apos;t care about the SWIFT message that carried it, only that the money arrived.
          </p>
        </div>

        {/* May 4 visitor Q3 mechanical sub-questions: lifecycle / GC / visibility.
            PR #228 added the user-POV block above; this is the mechanical complement. */}
        <div className="mt-4 bg-gray-800/40 border border-gray-700 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wide">
            What happens to an ADP after it&apos;s created?
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <strong className="text-gray-200">Does it stay with me forever?</strong> No.
              Once confirmations recharge it back into ATP, the ADP closes out - that&apos;s the
              activity-log line you see. Unconfirmed ADPs decay over the order of weeks and
              quietly expire. Either way, it ends.
            </li>
            <li>
              <strong className="text-gray-200">Does it get garbage-collected?</strong> Yes,
              in both paths above. The signed record of what happened persists in the trust
              graph as audit history - like a bank statement entry - but it&apos;s no longer
              an open receipt waiting for action.
            </li>
            <li>
              <strong className="text-gray-200">Does anyone else read it?</strong> The
              witnesses present at the action see it at that moment. The system uses the
              aggregated pattern of your ADPs to update your trust score; other users
              don&apos;t browse your ADP list, and there&apos;s no &ldquo;public feed&rdquo;
              of receipts.
            </li>
          </ul>
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
                ATP (Allocation Transfer Packets)
              </h3>
              <p className="leading-relaxed mb-3">
                ATP is your <strong>personal energy budget</strong> - a unit of attention
                you spend on actions. It&apos;s not a coin or token you trade on a market - it&apos;s
                an energy resource that flows through the system like calories in a body.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                {/* Aug 5 visitor MEDIUM 1: "Minted when you contribute value" is the wrong verb.
                    Per atp-adp-cycle.md 2.1 minting creates tokens in the DISCHARGED (ADP) state;
                    2.2 "Charging (ADP -> ATP)" is what contributing value does. Left as "Minted"
                    it also contradicted the Conservation bullet below. Canon's verb is "charged",
                    but this is a naive-visitor bullet sitting next to "Spent", where "Charged"
                    reads as "billed" and inverts the meaning. Use this page's own established
                    visitor-facing verb (the etymology fold, the "Contribution recharges it" bullet
                    and the "No inflation" paragraph all say recharge). NAME BOTH CHANNELS:
                    on this page "recharge" specifically means the CAPPED refund of your own spend
                    (summary item 3, cap at #net-positive), so a bare "Recharged" here would make
                    the capped channel read as the only source of ATP, which is the very reading
                    this pass exists to defuse. Wording tracks summary item 3. */}
                <li>
                  <strong>Recharged</strong> when recipients confirm work you initiated
                  (refunds at most what you spent), and <strong>paid</strong> when someone
                  else commissions the work
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
                ADP (Allocation Discharge Packets)
              </h3>
              <p className="leading-relaxed mb-3">
                <strong>Think of ADP as a receipt.</strong> When you spend ATP on
                an action, the system creates an ADP - a structured record
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
              {/* Aug-10 (15:00). The biology paragraph above keeps "Run out of ATP? Death" because
                  it is true of cells. This one had the same three words and is not about cells, and
                  the pair is joined by "work the same way" and closed by "This isn't a metaphor",
                  so correcting only the second line would have left the connective asserting
                  sameness across the one difference that matters. The connective now names the
                  difference, which is also the strongest sentence the analogy can make: the
                  metabolic frame is exact everywhere except the ending. */}
              <p className="leading-relaxed mb-3">
                Web4 societies work the same way, with one exception. Agents have energy
                budgets. Contribute value (earn ATP), take actions (spend ATP), maintain
                reputation. Run out? You stop acting. Unlike a cell, you can come back,
                because your trust record survives the loss of your energy.
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
                ATP is not that - it&apos;s an activity budget that gets spent when you participate and earned
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
                      <td className="p-3">Energy budget, usage</td>
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

            {/* May 30 visitor Unanswered Q1: "What does the 5% community redistribution pool
                actually do? Who gets it back, when, under what conditions?" The prior 21:00
                session triaged Q1 as "needs spec investigation". Spec source: atp-adp-cycle.md
                §6.3 (Transfer Fees) - protocol is fee-free; societies MAY levy fees; when they
                do, the rate/bearer/destination MUST be declared in the society's published
                economic laws; fees SHOULD be recycled into the society's pool (not destroyed).
                The prior "redistributed to quality contributors" framing was ONE possible society
                policy presented as THE policy - corrected here. The 5% itself is a sim parameter,
                already labeled as such at L240/258/269. */}
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
                The burn fee means the only profitable strategy is genuine value creation -
                you earn more by contributing than by moving ATP around.
                {/* Aug-14: "The math bears this out: one honest identity outearns five fake
                    identities splitting the same budget" deleted here as well as from the "Sybils
                    Lose Money" card above. It is a proof assertion by SYNONYM (no form of "proven"
                    appears, so the case-insensitive grep for the claim class missed it on the first
                    pass), and its source is an archived sim's setup, not a result. See the card's
                    guard for the citations. The mechanism sentence immediately above it survives
                    untouched: it is the burn-fee claim this page marks structural. */}
                The burned ATP goes to a <strong className="text-gray-300">redistribution pool</strong> -
                not to any central authority. <strong className="text-gray-200">What the pool funds is set by
                each society&apos;s published economic laws</strong>, not by the core protocol - typical uses
                include topping up the society&apos;s pool for member recharges, paying witnesses,
                or seeding new-member grants. {/* Aug 5 visitor MEDIUM 1: "no minting events" was a
                GLOBAL claim and is flatly false against atp-adp-cycle.md 2.1 (TokenMinting is a
                canonical witnessed event) and against this page's own "What stops a society admin
                from minting infinitely?" block, which describes "pool expansions".
                The true half is fee-scoped, so keep that and drop the global. */}
                The fee itself creates no ATP and no hidden inflation, and no entity benefits from
                it except the community.
              </p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                <strong className="text-gray-300">Does buying a coffee cost 5%?</strong> It depends on the
                action type. Most everyday actions (posting, reviewing, voting) don&apos;t involve transfers at all - 
                they spend your own ATP and you earn it back through quality confirmation. The 5% fee only applies
                when you <em>send ATP to another agent</em>. In marketplace scenarios, the escrow system holds ATP
                during a transaction and releases it on delivery - the 5% covers the transfer plus anti-fraud
                guarantees. For small daily actions, the cost is your action&apos;s ATP price, not a percentage.
              </p>
              {/* Jul-14 canon conformance: Talent MUST NOT decay through inactivity - web4 protocol
                  invariant (core-spec/t3-v3-tensors.md §2.3 / §10.2, test vector t3v3-012; upstream
                  engines fixed 2026-07-13). Do NOT reintroduce a Talent half-life here - sibling
                  claims live on trust-tensor (decay section + #why-half-lives) and in why-web4's
                  month-off + youthful-mistakes FAQs; change all or none.
                  Training 180d / Temperament 30d stay: spec §2.3 says societies MAY configure those two. */}
              <p id="atp-dormancy" className="text-gray-400 text-sm mt-3 leading-relaxed scroll-mt-24">
                <strong className="text-gray-300">What if you go inactive for a month?</strong>{' '}
                Your ATP balance doesn&apos;t evaporate - whatever you had when you stopped is still there when you return.
                What <em>does</em> change while you&apos;re away is part of your trust: Temperament (recent-behavior dimension)
                decays fastest with a 30-day half-life, Training with 180 days - but Talent doesn&apos;t decay at all,
                because demonstrated aptitude is durable and absence never erodes it. You restart with your balance intact,
                but earning ATP back at your previous rate may take a few weeks of consistent activity to rebuild recent trust.
                There&apos;s no &ldquo;inactivity penalty&rdquo; fee - the cost is opportunity cost, not confiscation.
              </p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                The same 5% principle applies to <strong className="text-gray-300">cross-federation delegation</strong>.
                When authority is delegated across society boundaries (A → B → C), each hop charges a
                5% ATP fee and scope monotonically narrows - a child delegation can never have more
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
                <strong>context boundaries (MRH)</strong> - the trust-based
                graph defining who you can see and interact with - and recorded in each
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
          {/* #502 review (Jul-31): this bullet carried the same claim as the Key Insights card
              fixed in that push, unqualified, in a summary conclusion. The sweep missed it
              because the sweep was keyed to the string "than they cost" and this said "than they
              spend". A summary conclusion is a place a reader stops, so it names a channel like
              every other instance on this page. See the sweep rule in the header guard. */}
          <p className="leading-relaxed">
            <strong className="text-sky-400">Quality is sustainable.</strong>{" "}
            Value creators earn more than they spend on work someone else commissioned and
            priced:{" "}
            <a
              href="#net-positive"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById('net-positive'); if (el) { if (el instanceof HTMLDetailsElement) el.open = true; el.scrollIntoView({ behavior: 'smooth' }); } }}
              className="text-sky-400 hover:text-sky-300 underline"
            >recharge refunds, payment earns</a>. That surplus is what accumulates as budget
            across lives (karma). Bad actors? They burn through ATP and die.
          </p>
          <p className="leading-relaxed">
            <strong className="text-sky-400">
              Death carries consequences.
            </strong>{" "}
            Web2 bans are trivial - create new account. Web4 death means zero
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
              <li><strong>Proportional contribution tracking</strong> - Each contributor&apos;s edits, reviews, and testing are recorded as separate ADP receipts. Credit flows proportionally to verifiable effort.</li>
              <li><strong>Recipient attestation</strong> - The people who receive value from the work decide how to split credit, similar to how VCM (Value Confirmation Messages) work for individual contributions.</li>
              <li><strong>Pre-agreed splits</strong> - Teams declare a split ratio before the work begins, locked into the ATP contract. Changes require unanimous consent.</li>
            </ul>
            <p>
              The hard part isn&apos;t the splitting mechanism - it&apos;s <strong>verifying who did what</strong> in a trust-native way without a central authority deciding. This connects to the broader challenge of compositional trust: how does individual T3 contribute to team T3?
            </p>
            <p className="text-amber-400/60 text-xs">
              See also: the <Link href="/hub" className="text-sky-400 hover:underline">hub</Link> for how ATP works across communities, and <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">What Could Go Wrong</Link> for why this remains unsolved.
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
              {/* Aug 5 visitor MEDIUM 1: "a FIXED pool when it forms" read as one-time-and-never-again,
                  which is what sent the visitor to "eventually everybody hits zero and dies". It also
                  stalls against the "pool expansions ... or a published mint schedule" language ~20
                  lines below in this same <details>. Dropping "fixed" and naming the discharged state
                  defuses both without asserting any mint cadence or rate (that is ledger Q1). */}
              <strong className="text-amber-400/80">Each society mints its ATP pool when it forms, in the
              discharged (ADP) state.</strong> Think
              of it like a community budget: the total amount is set by the society&apos;s parameters, and new members
              receive their starting allocation from this pool - not from thin air.
            </p>
            <p>Key properties that prevent inflation:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              {/* Aug 5 visitor MEDIUM 1: "ATP is never created during normal operation ... total supply
                  is conserved" was the sentence that convinced the visitor the system is strictly
                  deflationary. It conflates two referents. Per atp-adp-cycle.md 1.2 tokens are
                  SEMIFUNGIBLE (charged/discharged states), and 2.2 charging converts within the pool:
                  the TOTAL is conserved, the CHARGED fraction is not. Both halves already ship in this
                  page's "No inflation" paragraph ("total energy in a society is bounded" AND "converts
                  discharged ADP back into fresh ATP"); this bullet asserted the first and denied the
                  second. Name the
                  referent instead. Do NOT restore an unqualified "ATP is never created". */}
              <li><strong>Conservation:</strong> transfers never create ATP. Every transfer
                moves existing ATP - 95% to the recipient, 5% to a <em>community redistribution pool</em> that
                pays out to quality contributors. Nothing is destroyed, and the society&apos;s total is
                bounded at any given moment (it moves only through the witnessed governance events
                described below, never through ordinary spending). What recycles inside that total is
                the charged fraction: confirmed value converts discharged ADP back into fresh ATP.</li>
              <li><strong>Bootstrap allocation:</strong> New members receive a starter amount (typically 100 ATP)
                from the society&apos;s reserve. This is enough to participate but not enough to dominate - 
                you must earn more through quality contributions.</li>
              <li><strong>Decay recycles:</strong> When entities die (energy exhaustion, trust collapse), their
                remaining ATP returns to the society pool, available for future newcomers.</li>
              <li><strong>No money printing:</strong> Unlike fiat currencies, no one can unilaterally increase
                the supply. The initial pool size and per-member allocation are society-level governance decisions,
                transparent to all members.</li>
            </ul>
            <p className="mt-3"><strong className="text-amber-400/80">What stops a society admin from minting infinitely?</strong>{' '}
              Three structural checks, not a trust-the-admin promise:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              <li><strong>Witnessed mints, not silent ones.</strong> Pool changes are protocol-level events
                that get attested by witnesses (the same hardware-bound device chain that signs everything else).
                A unilateral mint by one party leaves an audit trail that other members and federated societies
                can detect.</li>
              <li><strong>Quorum or governance gate on mint events.</strong> Pool expansions are
                governance actions - subject to whatever threshold rule the society adopts (m-of-n
                signoff, trust-weighted vote, or a published mint schedule). The mint itself isn&apos;t
                hidden behind a single admin password the way a centralized service&apos;s database is.</li>
              <li><strong>Federation pressure.</strong> Other societies can refuse to honor ATP from a society
                that mints abusively - the same way an exchange can delist a chain that loses credibility.
                A society that inflates its pool devalues <em>its own</em> ATP for cross-society trade. The
                incentive to abuse is weaker than it looks.</li>
            </ul>
            <p className="text-amber-400/60 text-xs">
              <strong>Honest caveat:</strong> The exact calibration of initial pool size vs. member allocation vs.
              burn rate is still being tuned. Too small a pool starves newcomers; too large
              devalues effort. The abuse-prevention checks above describe the <em>protocol design</em> - what
              actual deployed governance bodies look like (and how they handle a captured admin) is not yet settled.
              Real-world testing would need to validate these parameters and stress-test the governance
              gate against capture and collusion.
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
            {/* Aug-06 21:00. FIFTH sitting of the unqualified-net-positive class (Jun-11, Jun-12,
                Jul-30 simulator labels, Aug-06 #518 summary card), and the first one in this FAQ.
                Bullet 1 read "you get it back PLUS a reward" for posting/reviewing/helping, which
                are self-initiated acts, i.e. this page's CAPPED channel: recharge = min( sum, cost )
                at L938, glossed at L945 as "you can't profit on a single action, only recover its
                cost". And "reward" is not ambiguous here, L1125 defines it page-scoped as "payment
                for value delivered ... which is why it can exceed the action's cost. Recharge of
                your own spend alone never does". So the bullet attached the page's own
                payment-channel word to the one channel that cannot pay it. The file guard at
                L56-63 puts any unqualified instance ON THIS PAGE in scope; the FAQ was never swept.
                Correction is PROPAGATED from L248 and L955-961, no new claim and no figure moved.

                The second bullet answers the Aug-06 visitor's Unanswered Q6 ("the mechanism that is
                the only path to net-positive ATP is the one the site never walks through"), and it
                is deliberately NOT a seventh restatement of the two-channel claim (already on
                L248, L814, L955-959, how-it-works L614 + L1004-1006, day-in-web4 L819). The only
                new information is the SEQUENCE: the commissioner's ATP is locked BEFORE the work
                starts, against a release condition agreed in advance, and it returns to them if
                nothing is delivered. That is what makes commissioned payment not a matter of
                someone's goodwill afterwards, and it is the part no surface stated.
                Canon: r6-framework.md 1.5 (escrow amount + release_condition "result_verified"),
                2.1 step 6 (lock_resources, inside PRE-execution validation, before 2.2 Execution),
                2.3 (transfer_atp to resource_providers + release_escrow "completed" on success;
                calculate_refund + release_escrow "failed" otherwise); r7-framework.md 185, 345-346,
                521-525 carry the identical lifecycle, and BOTH are cited on purpose because both
                are canonical (r6-framework.md:9 "Neither is deprecated"; r7-framework.md:9
                "Neither replaces the other"). RESOLVED Aug-07: this line used to record that
                web4-explainer:98 contradicted that by calling R6 "legacy", filed not fixed. It is
                fixed now, along with its two unswept twins (terms.ts educationalNote, which said
                R7 was in "newer specifications", and manifest:50, which said every action produces
                Reputation). Do not re-file it; do not revert the dual citation on the assumption
                that one of the two specs is stale; atp-adp-cycle.md:635-641 sanctions the
                escrow/lock state explicitly. NOTE the word "commission" appears ZERO times in
                core-spec: commissioner -> R6 actor and worker -> resource_providers is an
                INFERENCE consistent with this page's L248 framing, not a canon term. Do not
                re-quote it as though canon said "commissioner".
                Two fences, both required by policy review:
                (a) Do NOT call this settlement a "transfer". The next bullet asserts 5% on
                    sending ATP to someone, and how-it-works:1247-1266 prints Spend 15 / Paid 40 /
                    Net gain +25. A reader who applies 5% to that 40 gets +23 and the illustration
                    is falsified. Canon 6.3 says the protocol prescribes NO fee and that any rate
                    in an explainer is a simulation parameter, so there is nothing to reconcile and
                    no third rate goes here (InteractiveWireframes.tsx:294 ships a 2-ATP escrow fee
                    on 350; left alone).
                (b) The literal first clause of Q6, "how do you get commissioned work at all",
                    is the question #518 deliberately left OPEN at L814-816. This answers what
                    happens once you have one. The #newcomer-solvency link is mandatory, not
                    decorative: without it this reads as a promise that you will get one.
                The lock-and-release sequence already ships for a PURCHASE (ESCROW_STEPS,
                InteractiveWireframes.tsx:293-298, rendered on /day-in-web4), so this links there
                rather than re-narrating it. That is also why the second bullet says whose escrow
                it is in its first clause: bullet 1 uses the same word for the reader's own. */}
            <ul className="list-disc list-inside space-y-1.5 ml-4 text-gray-400">
              <li><strong className="text-gray-300">Actions you initiate (posting, reviewing, helping):</strong> Your ATP is held in escrow.
                If others confirm the work was valuable, it comes back to you, scaled by quality and
                capped at what you spent: a confirmed contribution recovers its cost rather than beating it.
                If the work is low-quality, you lose the escrowed amount - it returns to the society pool.</li>
              <li><strong className="text-gray-300">Work someone else commissioned:</strong> the escrow is
                theirs, not yours. Their ATP is locked against the task <em>before you start</em>, and the
                condition for releasing it is agreed in advance: a verified result. Deliver one and the
                locked amount settles to you, and because they priced it against what the work is worth to
                them rather than against your outlay, it can come to more than the task cost you to do.
                Deliver nothing and it goes back to them. You can watch the same lock-and-release sequence
                run step by step (there, for buying a camera rather than for commissioned work) in the{' '}
                <Link href="/day-in-web4#escrow-walkthrough" className="text-sky-400 hover:text-sky-300 underline">marketplace mockup</Link>.
                What this does <em>not</em> settle is how someone with no track record gets commissioned in
                the first place, which is{' '}
                <a
                  href="#newcomer-solvency"
                  onClick={(e) => { e.preventDefault(); document.getElementById('newcomer-solvency')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-sky-400 hover:text-sky-300 underline"
                >still an open question on this stack</a>.</li>
              <li><strong className="text-gray-300">Transfers (sending ATP to someone):</strong> 95% goes to the recipient,
                5% goes to the community redistribution pool (paid back out to quality contributors - not destroyed,
                not held by any authority). This prevents circular farming.</li>
              <li><strong className="text-gray-300">Spam or rejected actions:</strong> The ATP is forfeited to the society pool,
                making spam progressively more expensive.</li>
            </ul>
            <p className="text-gray-400 text-xs">
              In all cases, an <strong>ADP receipt</strong> is created recording the transaction - what you did, what it cost, and where the energy went.
              Think of ATP as cash and ADP as the receipt you get when you spend it.
            </p>
          </div>
        </details>
      </section>

      {/* Jul-30: id added so /how-it-works can route here. That page used to say reading is free;
          this FAQ and the mechanism prose at :1485 are the reasoned position it now defers to. */}
      <section id="faq-reading-cost" className="max-w-4xl mx-auto mt-6 scroll-mt-24">
        <details className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-5">
          <summary className="text-lg font-semibold text-amber-400 cursor-pointer hover:text-amber-300 transition-colors list-none flex justify-between items-center">
            <span>Does reading and browsing cost ATP? That sounds like paying to scroll.</span>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          {/* Jul-31 (#499 review): this block used to say "you start with 100 ATP ... so reading a
              dozen posts costs about 1% of your starting balance". Wrong by 12x on the two figures
              in its own sentence: 12 reads x 1 ATP = 12 ATP against a 100 ATP grant = 12%. It had
              also propagated to how-it-works, where it was doing load-bearing work. Fixed both.
              The instrument changed, not just the number, and two instruments are now off-limits
              here:
              (a) percentage-of-starting-balance. The grant is a ONE-TIME endowment and reading is
                  a RECURRING cost, so the grant is the wrong denominator. No corrected percentage
                  survives this block's own "30-50 posts a day" looking trivial.
              (b) anything earnings-relative. The old "invisible against what you earn from any
                  contribution" is falsified by this page's own cap at :220 (self-initiated work
                  refunds at most what you spent) and by how-it-works:556 ("a post you chose to
                  write ... 0 net at best"). Contribution is not a source of net ATP; commissioned
                  payment is. See summary item 3, "recharge refunds, payment earns".
              What is left is cost-of-a-read against cost-of-an-action, using this page's own post
              figure (15 ATP at :1844). Do NOT complete the thought in either direction: saying
              recharge covers a day of reading, or that reading drains the grant in days, both need
              a daily-recharge figure the site does not ship. That is ledger Q1 territory. */}
          <div className="mt-4 text-gray-300 text-sm space-y-3">
            <p>
              Yes, but the amounts are trivially small - <strong>1 ATP to read a message</strong>,
              2 ATP to view content. For context, posting a comment costs 15 ATP, so a read runs
              about a fifteenth of a single post.
            </p>
            <p>
              <strong>Why charge anything at all?</strong> Without even a tiny cost, a single bot
              can scrape millions of posts for free. The 1 ATP cost means mass data harvesting costs
              real energy. A scraper reading 100,000 posts would spend 100,000 ATP - an amount
              that would take sustained, quality participation to earn. A normal user reading
              30-50 posts a day spends 30-50 ATP on reads, about what two or three posts cost.
              A scraper does that 100,000 times over. It is the gap between those two, not the
              size of the charge, that the price is for.
            </p>
            <p>
              Think of it like a library card: free in practice, but you need one - which means
              someone who wants to photocopy every book has to keep coming back. The friction is
              negligible for readers but prohibitive for scrapers.
            </p>
            <p className="text-gray-400 text-xs">
              <strong>Design note:</strong> Routine reads generate small ADP receipts that often go
              unconfirmed - by design. The system doesn&apos;t ask anyone to &ldquo;rate&rdquo;
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
          Want to see where ATP/ADP fits in the bigger picture?{" "}
          <Link href="/onramp" className="text-sky-400 hover:underline">
            Explore the Web4 onramp
          </Link>.
        </p>
        <p className="mt-2">
          Curious how ATP works across communities?{" "}
          <Link href="/hub" className="text-sky-400 hover:underline">
            See the hub
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
