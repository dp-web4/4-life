"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

/**
 * First Contact: Zero to Web4 Comprehension in 10 Minutes
 *
 * Philosophy:
 * - Show, don't tell: Run a simulation first, explain concepts as they appear
 * - Just-in-time learning: Explain ATP when you see it spent, explain trust when you see it change
 * - Narrative over data: Translate events into human stories
 * - Progressive revelation: Start concrete, build to abstractions
 * - HUMAN-CENTRIC: Focus on single-life trust/consequence dynamics that humans can relate to
 *
 * Goal: Someone with zero Web4 knowledge can run this, understand what they see,
 * and know where to go next - all in 10 minutes.
 */

type Step = "welcome" | "simulation" | "narrative" | "concepts" | "next-steps";

interface SimulationSnapshot {
  tick: number;
  action: string;
  atp_before: number;
  atp_after: number;
  trust_before: number;
  trust_after: number;
  reason: string;
  isWarning?: boolean;
  isSuccess?: boolean;
}

export default function FirstContactPage() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simplified simulation data - single life, human-relatable scenario
  // Alice is a content creator building reputation in a Web4 community
  const simulationSnapshots: SimulationSnapshot[] = [
    { tick: 0, action: "Join community", atp_before: 100, atp_after: 100, trust_before: 0.5, trust_after: 0.5, reason: "Alice joins with starter resources (100 ATP) and neutral trust (0.5)" },
    { tick: 1, action: "Quality post", atp_before: 100, atp_after: 92, trust_before: 0.5, trust_after: 0.52, reason: "Thoughtful contribution: costs 8 ATP but builds trust (+0.02)" },
    { tick: 2, action: "Help newcomer", atp_before: 92, atp_after: 87, trust_before: 0.52, trust_after: 0.55, reason: "Mentoring others: costs 5 ATP, trust rises (+0.03)", isSuccess: true },
    { tick: 3, action: "Receive upvotes", atp_before: 87, atp_after: 99, trust_before: 0.55, trust_after: 0.56, reason: "Community appreciates quality: earns 12 ATP back!", isSuccess: true },
    { tick: 4, action: "Spam attempt", atp_before: 99, atp_after: 74, trust_before: 0.56, trust_after: 0.48, reason: "Low-effort bulk posts: costs 25 ATP, trust drops sharply (-0.08)", isWarning: true },
    { tick: 5, action: "Trust warning", atp_before: 74, atp_after: 74, trust_before: 0.48, trust_after: 0.48, reason: "Trust below 0.5 threshold! Features restricted until trust recovers", isWarning: true },
    { tick: 6, action: "Thoughtful reply", atp_before: 74, atp_after: 70, trust_before: 0.48, trust_after: 0.50, reason: "Consistent quality rebuilds trust: costs 4 ATP, trust rises (+0.02)" },
    { tick: 7, action: "Quality post", atp_before: 70, atp_after: 62, trust_before: 0.50, trust_after: 0.53, reason: "Another valuable contribution: costs 8 ATP, trust continues rising" },
    { tick: 8, action: "Collaboration", atp_before: 62, atp_after: 55, trust_before: 0.53, trust_after: 0.58, reason: "Working with trusted member: costs 7 ATP, significant trust gain (+0.05)", isSuccess: true },
    { tick: 9, action: "Recognition", atp_before: 55, atp_after: 80, trust_before: 0.58, trust_after: 0.62, reason: "Community recognition for consistent quality: earns 25 ATP, trust boost", isSuccess: true },
    { tick: 10, action: "Established", atp_before: 80, atp_after: 80, trust_before: 0.62, trust_after: 0.62, reason: "Alice is now a trusted community member with sustainable reputation", isSuccess: true },
  ];

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      // Reset to start if at end
      if (playbackIndex >= simulationSnapshots.length - 1) {
        setPlaybackIndex(0);
      }
      setIsPlaying(true);
      // Clear any stale interval before starting a new one
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setPlaybackIndex(prev => {
          if (prev >= simulationSnapshots.length - 1) {
            stopPlayback();
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
  };

  const currentSnapshot = simulationSnapshots[playbackIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <Breadcrumbs currentPath="/first-contact" />
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Your Progress</span>
            <span className="text-sm text-gray-400">
              Step {["welcome", "simulation", "narrative", "concepts", "next-steps"].indexOf(currentStep) + 1} of 5
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(["welcome", "simulation", "narrative", "concepts", "next-steps"].indexOf(currentStep) + 1) * 20}%`
              }}
            />
          </div>
        </div>

        {/* Step: Welcome */}
        {currentStep === "welcome" && (
          <div className="space-y-6">
            <div>
              <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
                First Contact
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
                Your First Web4 Experience
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                Today's internet rewards spam, lets trolls create unlimited accounts, and makes quality creators compete with bots. What if the system itself made that impossible?
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                In the next 10 minutes, you'll see how trust and reputation actually work in Web4 — and why it's fundamentally different from anything you've used before.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sky-400 font-semibold mb-2">🔋 Attention Economics (ATP)</div>
                  <p className="text-gray-400">
                    Every action costs attention. Quality earns it back. Spam burns out.
                  </p>
                </div>
                <div>
                  <div className="text-purple-400 font-semibold mb-2">🤝 Trust: Your Reputation</div>
                  <p className="text-gray-400">
                    Trust builds through consistent quality. It follows you everywhere. No fresh starts.
                  </p>
                </div>
                <div>
                  <div className="text-green-400 font-semibold mb-2">📜 Consequences: Permanent Record</div>
                  <p className="text-gray-400">
                    Your track record is permanent. Good behavior compounds. Bad actors can't hide.
                  </p>
                </div>
                <div>
                  <div className="text-orange-400 font-semibold mb-2">⚖️ Self-Regulation: No Moderators</div>
                  <p className="text-gray-400">
                    The system regulates itself through economics. Quality rises, spam sinks.
                  </p>
                </div>
              </div>
            </div>

            {/* Preview: first simulation snapshot so visitors see something interactive immediately */}
            <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-6">
              <div className="text-sm text-sky-400 font-semibold mb-3">Preview: Alice&apos;s First Action</div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-sky-900 flex items-center justify-center text-xl">👤</div>
                <div>
                  <div className="font-semibold">Alice joins the community</div>
                  <div className="text-sm text-gray-400">Starting resources: 100 ATP | Trust: 0.50 (neutral)</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-800/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Energy Budget</div>
                  <div className="text-2xl font-bold text-sky-400">100</div>
                  <div className="text-xs text-gray-500">ATP</div>
                </div>
                <div className="bg-gray-800/50 rounded p-3 text-center">
                  <div className="text-xs text-gray-400">Reputation</div>
                  <div className="text-2xl font-bold text-purple-400">0.50</div>
                  <div className="text-xs text-gray-500">Trust</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 italic">
                What happens when Alice posts quality content? Spams? Helps a newcomer? Click below to find out.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep("simulation")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all text-lg"
            >
              Watch Alice&apos;s Full Journey (10 actions) &rarr;
            </button>

            <p className="text-center text-sm text-gray-500">
              You&apos;ll follow Alice through 10 actions in a Web4 community &mdash; see her spend ATP,
              build trust, recover from mistakes, and earn recognition. No installation, runs in browser.
            </p>
          </div>
        )}

        {/* Step: Simulation */}
        {currentStep === "simulation" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("welcome")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Watch Alice Build Trust</h1>
              <p className="text-gray-300">
                Alice joins a Web4 community with 100 ATP (attention budget) and neutral trust (0.5 on a 0–1 scale). Watch how her actions affect both.
              </p>
            </div>

            {/* Simulation Viewer */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Simulation Playback</h3>
                  <p className="text-sm text-gray-400">
                    Event {playbackIndex + 1} of {simulationSnapshots.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPlaybackIndex(Math.max(0, playbackIndex - 1))}
                    disabled={playbackIndex === 0}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handlePlayPause}
                    className="px-6 py-2 bg-sky-600 rounded hover:bg-sky-700 font-semibold"
                  >
                    {isPlaying ? "⏸ Pause" : "▶ Play"}
                  </button>
                  <button
                    onClick={() => setPlaybackIndex(Math.min(simulationSnapshots.length - 1, playbackIndex + 1))}
                    disabled={playbackIndex === simulationSnapshots.length - 1}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Current Event */}
              <div className={`rounded-lg p-6 mb-4 ${
                currentSnapshot.isSuccess ? "bg-green-900/30 border border-green-700" :
                currentSnapshot.isWarning ? "bg-orange-900/30 border border-orange-700" :
                "bg-gray-900 border border-gray-700"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Action {currentSnapshot.tick + 1}</div>
                    <h4 className="text-2xl font-bold">{currentSnapshot.action}</h4>
                  </div>
                  {currentSnapshot.isSuccess && <span className="text-green-400 text-2xl">✓</span>}
                  {currentSnapshot.isWarning && <span className="text-orange-400 text-2xl">⚠️</span>}
                </div>

                <p className="text-gray-300 mb-6">{currentSnapshot.reason}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* ATP Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🔋 ATP (Attention Budget)</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.atp_after < 30 ? "text-red-400" :
                        currentSnapshot.atp_after < 60 ? "text-orange-400" :
                        "text-green-400"
                      }`}>
                        {currentSnapshot.atp_after.toFixed(0)}
                      </span>
                      {currentSnapshot.atp_before !== currentSnapshot.atp_after && (
                        <span className={`text-sm ${
                          currentSnapshot.atp_after > currentSnapshot.atp_before ? "text-green-400" : "text-red-400"
                        }`}>
                          ({currentSnapshot.atp_after > currentSnapshot.atp_before ? "+" : ""}{(currentSnapshot.atp_after - currentSnapshot.atp_before).toFixed(0)})
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          currentSnapshot.atp_after < 30 ? "bg-red-500" :
                          currentSnapshot.atp_after < 60 ? "bg-orange-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, currentSnapshot.atp_after))}%` }}
                      />
                    </div>
                  </div>

                  {/* Trust Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🤝 Trust Score</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.trust_after >= 0.5 ? "text-purple-400" : "text-orange-400"
                      }`}>
                        {currentSnapshot.trust_after.toFixed(2)}
                      </span>
                      {currentSnapshot.trust_before !== currentSnapshot.trust_after && (
                        <span className={`text-sm ${
                          currentSnapshot.trust_after > currentSnapshot.trust_before ? "text-green-400" : "text-red-400"
                        }`}>
                          ({currentSnapshot.trust_after > currentSnapshot.trust_before ? "+" : ""}{(currentSnapshot.trust_after - currentSnapshot.trust_before).toFixed(2)})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {currentSnapshot.trust_after >= 0.5 ? "✅ Full access" : "⚠️ Restricted (trust < 0.5)"}
                    </div>
                  </div>
                </div>

                {/* Just-in-Time Explanations */}
                {currentSnapshot.isWarning && currentSnapshot.trust_after < 0.5 && (
                  <div className="mt-4 bg-orange-900/20 border border-orange-800 rounded p-4">
                    <strong className="text-orange-400">⚠️ Trust Below Society Threshold</strong>
                    <p className="text-gray-300 mt-2">
                      Each society sets its own trust threshold. When Alice's trust dropped below 0.5,
                      this community restricted her features—a mild form of ejection. She can rebuild
                      trust through consistent quality, but the record of this dip is permanent and
                      <strong className="text-white"> visible to other societies</strong> she might join.
                    </p>
                  </div>
                )}

                {currentSnapshot.isSuccess && currentSnapshot.atp_after > currentSnapshot.atp_before && (
                  <div className="mt-4 bg-green-900/20 border border-green-800 rounded p-4">
                    <strong className="text-green-400">✓ Earning Attention Back</strong>
                    <p className="text-gray-300 mt-2">
                      Quality contributions earn ATP from the community. This is the <strong className="text-white">sustainable path</strong>:
                      create value, earn resources, build trust. The more trust you have, the more your contributions are valued.
                    </p>
                  </div>
                )}

                {currentSnapshot.action === "Spam attempt" && (
                  <div className="mt-4 bg-red-900/20 border border-red-800 rounded p-4">
                    <strong className="text-red-400">Why Spam Fails</strong>
                    <p className="text-gray-300 mt-2">
                      Low-effort bulk posts cost <strong className="text-white">more ATP than they earn</strong> and
                      <strong className="text-white"> damage trust</strong>. This is why spam is economically impossible in Web4—
                      spammers literally run out of resources before they can do significant damage.
                    </p>
                  </div>
                )}
              </div>

              {/* Timeline Scrubber */}
              <div>
                <input
                  type="range"
                  min="0"
                  max={simulationSnapshots.length - 1}
                  value={playbackIndex}
                  onChange={(e) => setPlaybackIndex(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Join</span>
                  <span>Build Trust</span>
                  <span>Spam Attempt</span>
                  <span>Recovery</span>
                  <span>Established</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("narrative")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Continue to Story →
            </button>
          </div>
        )}

        {/* Step: Narrative */}
        {currentStep === "narrative" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("simulation")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Alice's Story</h1>
              <p className="text-gray-300">
                Here's what just happened, translated into human narrative.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
              {/* Beginning */}
              <div>
                <h3 className="text-2xl font-bold text-sky-400 mb-3">The Start: Equal Footing</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Alice joined a Web4 community like everyone else: with <strong>100 ATP</strong> (attention budget) and
                  <strong> neutral trust (0.5)</strong>. No special privileges from past platforms, no imported follower counts.
                  Just her actions from here on out.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Her first few contributions were thoughtful—a quality post, helping a newcomer. Each action cost ATP
                  (attention is scarce), but her trust steadily climbed: 0.50 → 0.52 → 0.55. The community noticed quality.
                </p>
              </div>

              {/* The Test */}
              <div>
                <h3 className="text-2xl font-bold text-orange-400 mb-3">The Test: Spam Doesn't Pay</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Then Alice tried a shortcut. Bulk low-effort posts—the kind that work on traditional platforms where
                  engagement = visibility. On Web4, it backfired immediately.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-orange-400">The spam attempt cost 25 ATP</strong>—more than double a quality post—
                  and <strong className="text-orange-400">trust dropped to 0.48</strong>, below the 0.5 threshold. Suddenly,
                  some features were restricted. The community was protecting itself.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This is the key insight: <strong className="text-white">spam is economically self-defeating</strong>.
                  You burn resources faster than you earn them, and the damage to your reputation is immediate and visible.
                </p>
              </div>

              {/* Recovery */}
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-3">The Recovery: Trust is Earned</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Alice learned the lesson. She shifted back to quality contributions—thoughtful replies, valuable posts,
                  genuine collaboration. Trust climbed back above 0.5, restrictions lifted.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The collaboration was particularly effective: working with an already-trusted member gave her a significant
                  trust boost (+0.05). <strong className="text-white">Trust networks matter</strong>—who you work with affects
                  how the community perceives you.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By the end, Alice had <strong className="text-green-400">80 ATP</strong> (sustainable) and
                  <strong className="text-green-400"> 0.62 trust</strong> (well above threshold). She's now an established
                  community member with a permanent track record.
                </p>
              </div>

              {/* Key Insights */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">Key Insights</h4>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <strong className="text-sky-400">Quality Pays:</strong> Valuable contributions earn ATP from the community.
                    Alice's best content earned 12-25 ATP back—more than the cost to create it.
                  </div>
                  <div>
                    <strong className="text-orange-400">Spam Burns:</strong> Low-effort content costs more than it earns and
                    damages trust. It's economically self-defeating.
                  </div>
                  <div>
                    <strong className="text-purple-400">Trust is Visible:</strong> Everyone can see Alice's trust score.
                    There's no hiding behind a fresh account—her history follows her.
                  </div>
                  <div>
                    <strong className="text-green-400">Recovery is Possible:</strong> Alice rebuilt from her spam mistake,
                    but the record of that dip is permanent. Future collaborators can see the full picture.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("concepts")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Understand the Concepts →
            </button>
          </div>
        )}

        {/* Step: Concepts */}
        {currentStep === "concepts" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("narrative")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Why Web4 Works This Way</h1>
              <p className="text-gray-300">
                Now that you've seen it in action, here's the theory behind what you witnessed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ATP Economics */}
              <div className="bg-gradient-to-br from-sky-900/30 to-gray-800 border border-sky-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="text-xl font-bold text-sky-400 mb-3">Attention Economics (ATP)</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> Traditional platforms let you post unlimited content. Result? Spam prevails,
                  quality drowns, moderation armies needed.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Every action costs ATP (attention). Posting? Costs ATP.
                  Messaging? Costs ATP. Voting? Costs ATP. Your budget is finite.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The breakthrough:</strong> Spam becomes impossible through economics, not moderation.
                  Spammers burn ATP faster than they earn it. Quality creators earn more than they spend.
                </p>
                <Link href="/atp-economics" className="text-sky-400 hover:underline text-sm">
                  Deep dive: ATP Economics →
                </Link>
              </div>

              {/* Trust */}
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-800 border border-purple-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">Trust: Your Reputation</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> On traditional platforms, bad actors just create new accounts.
                  Ban them? They're back tomorrow with a fresh identity.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Your presence is hardware-bound. Trust accumulates over time.
                  Everyone can see your track record. No fresh starts.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Society thresholds:</strong> Each society sets its own minimum trust. Fall below it?
                  You're ejected from that society—but you can still participate in others. Your ejection
                  is visible globally, affecting how other societies perceive you (like a DUI affecting your
                  pilot's license).
                </p>
                <Link href="/trust-tensor" className="text-purple-400 hover:underline text-sm">
                  Deep dive: Trust Tensors →
                </Link>
              </div>

              {/* Identity */}
              <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Presence: Hardware-Bound</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> Email-based accounts are free to create. One person can have
                  thousands of identities, manipulating conversations and gaming systems.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Your digital presence (called LCT) is bound to physical hardware, making it verifiable.
                  Creating fake accounts requires buying new devices. Expensive to fake, impossible to scale.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Your benefit:</strong> The trust you build is truly yours—portable across all Web4
                  communities, accumulated over your lifetime, impossible to steal.
                </p>
                <Link href="/lct-explainer" className="text-green-400 hover:underline text-sm">
                  Deep dive: Identity (LCT) →
                </Link>
              </div>

              {/* Consequences */}
              <div className="bg-gradient-to-br from-orange-900/30 to-gray-800 border border-orange-700 rounded-xl p-6">
                <div className="text-3xl mb-3">📜</div>
                <h3 className="text-xl font-bold text-orange-400 mb-3">Consequences: Visible Record</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> On traditional platforms, consequences are temporary. Wait out a
                  ban, delete old posts, or just start fresh. No long-term accountability.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Your track record is permanent and visible across societies.
                  Get ejected from one community? Others can see why. Good behavior compounds—consistent quality
                  builds trust that opens doors everywhere.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Reintegration path:</strong> You can recover from mistakes through the same process
                  humans use: demonstrate changed behavior in other contexts, rebuild your reputation, and apply
                  for readmission. The record remains, but redemption is possible.
                </p>
                <Link href="/coherence-index" className="text-orange-400 hover:underline text-sm">
                  Deep dive: Coherence Index →
                </Link>
              </div>
            </div>

            {/* How It Compares */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Web4 vs Traditional Platforms</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4"></th>
                      <th className="py-3 px-4 text-gray-400">Traditional</th>
                      <th className="py-3 px-4 text-sky-400">Web4</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Spam control</td>
                      <td className="py-3 px-4">Moderation armies</td>
                      <td className="py-3 px-4 text-green-400">Economic self-regulation</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Identity</td>
                      <td className="py-3 px-4">Free accounts, unlimited alts</td>
                      <td className="py-3 px-4 text-green-400">Hardware-bound, expensive to fake</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Reputation</td>
                      <td className="py-3 px-4">Platform-specific, deletable</td>
                      <td className="py-3 px-4 text-green-400">Portable, permanent, yours</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Consequences</td>
                      <td className="py-3 px-4">Temporary bans, fresh starts</td>
                      <td className="py-3 px-4 text-green-400">Permanent record, compounding trust</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Quality incentive</td>
                      <td className="py-3 px-4">Engagement metrics</td>
                      <td className="py-3 px-4 text-green-400">Direct economic reward</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("next-steps")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Where to Go Next →
            </button>
          </div>
        )}

        {/* Step: Next Steps */}
        {currentStep === "next-steps" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("concepts")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
              <p className="text-xl text-gray-300">
                You now understand the fundamentals of Web4. Here's where to go from here.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">What You Now Understand</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>✅ Why spam is economically impossible (ATP costs)</div>
                <div>✅ How trust builds through quality (reputation)</div>
                <div>✅ Why identity can't be faked (hardware-bound)</div>
                <div>✅ How consequences compound (permanent record)</div>
                <div>✅ Why moderation isn't needed (self-regulation)</div>
                <div>✅ How recovery works (rebuild through quality)</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Society Simulator - primary next step */}
                <Link href="/society-simulator">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🌐</div>
                    <h4 className="text-lg font-bold text-emerald-400 mb-2">Watch: Society Simulator</h4>
                    <p className="text-gray-400 text-sm">
                      You saw one agent. Now watch 12 agents form alliances, betray each other, and build trust networks in real time.
                    </p>
                  </div>
                </Link>

                {/* Experiment */}
                <Link href="/playground">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-sky-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🎮</div>
                    <h4 className="text-lg font-bold text-sky-400 mb-2">Experiment: Parameter Playground</h4>
                    <p className="text-gray-400 text-sm">
                      Tweak ATP costs, trust thresholds, and karma strength. See how different rules create different societies.
                    </p>
                  </div>
                </Link>

                {/* Learn */}
                <Link href="/learn">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">📚</div>
                    <h4 className="text-lg font-bold text-green-400 mb-2">Learn: Concepts In Depth</h4>
                    <p className="text-gray-400 text-sm">
                      Understand the mechanics behind what you just saw. Trust tensors, coherence, identity — at your own pace.
                    </p>
                  </div>
                </Link>

                {/* Observe */}
                <Link href="/trust-networks">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🕸️</div>
                    <h4 className="text-lg font-bold text-purple-400 mb-2">Explore: Trust Networks</h4>
                    <p className="text-gray-400 text-sm">
                      See how trust relationships evolve over time. Watch coalitions form and free-riders get isolated.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">Additional Resources</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <Link href="/glossary" className="text-sky-400 hover:underline">
                  📖 Glossary (All Terms)
                </Link>
                <Link href="/coherence-framework" className="text-purple-400 hover:underline">
                  🧬 Coherence Framework
                </Link>
                <Link href="/lct-explainer" className="text-green-400 hover:underline">
                  🔗 Identity Deep Dive
                </Link>
                <a href="https://dp-web4.github.io/web4/" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  📄 Web4 Whitepaper
                </a>
                <a href="https://github.com/dp-web4/4-life" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  🧪 4-Life GitHub Repo
                </a>
                <Link href="/threat-model" className="text-red-400 hover:underline">
                  🛡️ Security & Threat Model
                </Link>
              </div>
            </div>

            {/* Start Over */}
            <button
              onClick={() => {
                setCurrentStep("welcome");
                setPlaybackIndex(0);
              }}
              className="w-full bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all"
            >
              Start Over
            </button>
          </div>
        )}
        <RelatedConcepts currentPath="/first-contact" />
      </div>
    </div>
  );
}
