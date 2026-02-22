"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import { T3, CI, MRH } from "@/components/TermTooltip";

export default function ATPEconomicsPage() {
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
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          Attention Economics
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 solves spam, abuse, and low-quality content not with moderation
          armies, but with{" "}
          <strong className="text-sky-400">an attention budget</strong>.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          Every action costs attention. Every contribution earns attention.
          Your budget (called ATP) stays above zero as long as you contribute value.
          Run out? Your agent dies. Contribute? You thrive.
        </p>
      </section>

      {/* The Problem */}
      <section className="max-w-4xl mx-auto mt-16">
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
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">The Solution</h2>
        <div className="bg-gradient-to-br from-sky-950/30 to-blue-900/20 border border-sky-800/30 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-sky-400 mb-4">
            Web4: Attention Budget
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
                ✅ <strong className="text-sky-300">ATP is non-transferable</strong> — Your energy budget
                reflects YOUR contributions, not someone else&apos;s. You can&apos;t buy a reputation; you
                have to earn it. If ATP were tradeable, wealthy actors could buy unlimited
                influence — exactly like today&apos;s internet.
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
            <p className="pt-4 text-gray-400 italic">
              Result: Only sustainable behaviors survive. Value creators thrive.
              Spam dies.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Try It: Attention Economics Simulator
        </h2>
        <p className="text-gray-400 mb-8">
          You start with <strong>100 ATP</strong>. Choose actions. Watch your
          budget change. Can you survive?
        </p>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
          {/* ATP Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-300">
                ATP (Attention Budget)
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
              <p className="text-red-500 text-lg mt-2 font-bold">
                💀 You died. ATP reached zero. No more actions possible.
              </p>
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
      <section className="max-w-4xl mx-auto mt-16">
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
              No moderators needed. No ban appeals. No edge cases. ATP depletion
              is automatic, mathematical, and fair. The system self-regulates
              through energy economics.
            </p>
          </div>
        </div>
      </section>

      {/* Follow One Agent's ATP Journey */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Follow One Agent&apos;s ATP Journey
        </h2>
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
              Agents that don&apos;t? They die and stay dead. No appeals, no shortcuts.
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
      </section>

      {/* Technical Details (Collapsible) */}
      <section className="max-w-4xl mx-auto mt-16">
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
                ATP is a <strong>semi-fungible packet</strong> representing
                attention allocation. It's not a coin or token you trade - it's
                an energy resource you spend on actions.
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
                  <strong>Tracked</strong> on-chain (MRH/LCT graph records all
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
                ATP vs Traditional Tokens
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-sky-400">Property</th>
                      <th className="text-left p-3 text-red-400">
                        Traditional Tokens
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
                      <td className="p-3">Fully transferable</td>
                      <td className="p-3">Non-transferable (earned)</td>
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

            <div className="bg-sky-950/30 border border-sky-800/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-sky-400 mb-2">Why can't you transfer ATP to someone else?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                If ATP were transferable, wealthy actors could buy unlimited action capacity — exactly like
                the current internet where money buys attention. Non-transferable ATP means everyone must
                <em> earn</em> their own capacity through valuable contributions. You can't buy your way to
                influence; you have to contribute your way there. This is the key difference from cryptocurrency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-3">
                Implementation in Web4
              </h3>
              <p className="leading-relaxed mb-3">
                ATP/ADP flows are tracked in the{" "}
                <strong>context boundaries (MRH)</strong>—the trust-based
                graph defining who you can see and interact with—and recorded on each
                society's microchain.
              </p>
              <pre className="bg-gray-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-xs text-gray-400 font-mono">
                {`// Example ATP flow (pseudocode)
agent.atp = 100  // Initial budget
agent.takeAction("post", cost=15)
  → agent.atp = 85
  → create ADP(action="post", cost=15)
  → record on microchain

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
      <section className="max-w-4xl mx-auto mt-16">
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
            spam messages? You'll die after message 20. No appeals, no edge
            cases.
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

      {/* Navigation */}
      <section className="max-w-4xl mx-auto mt-16 flex gap-4">
        <Link
          href="/lct-explainer"
          className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          ← Identity (LCT)
        </Link>
        <Link
          href="/trust-tensor"
          className="flex-1 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-center"
        >
          Next: Trust Tensors →
        </Link>
      </section>

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
        <RelatedConcepts currentPath="/atp-economics" />
      </div>
    </>
  );
}
