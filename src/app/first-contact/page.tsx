"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * First Contact: Zero to Web4 Comprehension in 10 Minutes
 *
 * Philosophy:
 * - Show, don't tell: Run a simulation first, explain concepts as they appear
 * - Just-in-time learning: Explain ATP when you see it spent, explain trust when you see it change
 * - Narrative over data: Translate events into human stories
 * - Progressive revelation: Start concrete, build to abstractions
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
  life: number;
  isRebirth?: boolean;
  isDeath?: boolean;
}

export default function FirstContactPage() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<SimulationSnapshot | null>(null);

  // Simplified simulation data from ep_driven_closed_loop_results.json
  const simulationSnapshots: SimulationSnapshot[] = [
    // Life 1
    { tick: 0, action: "Start Life 1", atp_before: 100, atp_after: 100, trust_before: 0.5, trust_after: 0.5, reason: "Bob is born with starter ATP and neutral trust", life: 1 },
    { tick: 1, action: "Risky experiment", atp_before: 100, atp_after: 75, trust_before: 0.5, trust_after: 0.49, reason: "High ATP and solid trust—Bob tries something experimental", life: 1 },
    { tick: 2, action: "Small spend", atp_before: 75, atp_after: 65, trust_before: 0.49, trust_after: 0.49, reason: "Moderate ATP—Bob explores cautiously", life: 1 },
    { tick: 5, action: "Small spend", atp_before: 45, atp_after: 35, trust_before: 0.49, trust_after: 0.49, reason: "Continuing cautious exploration", life: 1 },
    { tick: 8, action: "Conservative audit", atp_before: 15, atp_after: 10, trust_before: 0.49, trust_after: 0.5, reason: "Low ATP—Bob switches to safer actions, trust improves slightly", life: 1 },
    { tick: 10, action: "Death", atp_before: 5, atp_after: 0, trust_before: 0.51, trust_after: 0.52, reason: "ATP exhausted—Bob dies with T3=0.52 (above 0.5 threshold)", life: 1, isDeath: true },

    // Life 2 (Rebirth)
    { tick: 11, action: "Rebirth", atp_before: 0, atp_after: 100.8, trust_before: 0.52, trust_after: 0.5, reason: "Bob earned trust in Life 1, reborn with karma bonus (+0.8 ATP)", life: 2, isRebirth: true },
    { tick: 12, action: "Risky experiment", atp_before: 100.8, atp_after: 75.8, trust_before: 0.5, trust_after: 0.49, reason: "Starting Life 2 with confidence from previous experience", life: 2 },
    { tick: 18, action: "Conservative audit", atp_before: 20.8, atp_after: 15.8, trust_before: 0.49, trust_after: 0.5, reason: "Low ATP again—repeating safe strategy from Life 1", life: 2 },
    { tick: 20, action: "Death", atp_before: 10.8, atp_after: 0, trust_before: 0.51, trust_after: 0.52, reason: "ATP exhausted again—pattern repeating", life: 2, isDeath: true },

    // Life 3 (Second Rebirth)
    { tick: 21, action: "Rebirth", atp_before: 0, atp_after: 101.6, trust_before: 0.52, trust_after: 0.5, reason: "Bob reborn again—karma accumulating (+1.6 ATP total)", life: 3, isRebirth: true },
    { tick: 22, action: "Risky experiment", atp_before: 101.6, atp_after: 76.6, trust_before: 0.5, trust_after: 0.49, reason: "Life 3—same pattern emerging", life: 3 },
    { tick: 30, action: "Death", atp_before: 11.6, atp_after: 0, trust_before: 0.51, trust_after: 0.52, reason: "Final death—consistent trust at 0.52", life: 3, isDeath: true },
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSimulation();
    }
  };

  const playSimulation = () => {
    if (playbackIndex >= simulationSnapshots.length - 1) {
      setPlaybackIndex(0);
    }

    const interval = setInterval(() => {
      setPlaybackIndex(prev => {
        if (prev >= simulationSnapshots.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500); // 1.5 seconds per event
  };

  const currentSnapshot = simulationSnapshots[playbackIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
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
                Your First Web4 Simulation
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                In the next 10 minutes, you'll watch a Web4 society in action—and understand why it works differently than anything you've seen before.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sky-400 font-semibold mb-2">🔋 ATP: Metabolic Economics</div>
                  <p className="text-gray-400">
                    Actions cost attention. Run out? You die. This makes spam impossible.
                  </p>
                </div>
                <div>
                  <div className="text-purple-400 font-semibold mb-2">🤝 Trust (T3): Multi-Dimensional</div>
                  <p className="text-gray-400">
                    Trust isn't a single number. Behavior builds it. Consistency matters.
                  </p>
                </div>
                <div>
                  <div className="text-green-400 font-semibold mb-2">♻️ Karma: Consequences Carry Forward</div>
                  <p className="text-gray-400">
                    Die with trust ≥ 0.5? Reborn with advantages. Bad actors die permanently.
                  </p>
                </div>
                <div>
                  <div className="text-orange-400 font-semibold mb-2">📚 Learning: Patterns Improve</div>
                  <p className="text-gray-400">
                    Agents learn what works across lives. Meta-cognition emerges.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">📖 How This Works</h3>
              <ol className="space-y-2 text-gray-300">
                <li><strong className="text-white">Step 1:</strong> Watch a simulation (Bob lives, dies, and is reborn)</li>
                <li><strong className="text-white">Step 2:</strong> Read the story (we translate the data into narrative)</li>
                <li><strong className="text-white">Step 3:</strong> Understand the concepts (why it works this way)</li>
                <li><strong className="text-white">Step 4:</strong> Explore further (tools, docs, experiments)</li>
              </ol>
            </div>

            <button
              onClick={() => setCurrentStep("simulation")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all text-lg"
            >
              Start Simulation →
            </button>

            <p className="text-center text-sm text-gray-500">
              No installation required • Runs in your browser • 10 minutes total
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
              <h1 className="text-4xl font-bold mb-4">Watch Bob Live and Die</h1>
              <p className="text-gray-300">
                This is a simplified Web4 simulation. Bob starts with 100 ATP and 0.5 trust. Watch what happens.
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
                currentSnapshot.isRebirth ? "bg-green-900/30 border border-green-700" :
                currentSnapshot.isDeath ? "bg-red-900/30 border border-red-700" :
                "bg-gray-900 border border-gray-700"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Tick {currentSnapshot.tick} • Life {currentSnapshot.life}</div>
                    <h4 className="text-2xl font-bold">{currentSnapshot.action}</h4>
                  </div>
                  {currentSnapshot.isRebirth && <span className="text-green-400 text-2xl">♻️</span>}
                  {currentSnapshot.isDeath && <span className="text-red-400 text-2xl">💀</span>}
                </div>

                <p className="text-gray-300 mb-6">{currentSnapshot.reason}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* ATP Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🔋 ATP (Attention Budget)</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.atp_after < 20 ? "text-red-400" :
                        currentSnapshot.atp_after < 50 ? "text-orange-400" :
                        "text-green-400"
                      }`}>
                        {currentSnapshot.atp_after.toFixed(1)}
                      </span>
                      {currentSnapshot.atp_before !== currentSnapshot.atp_after && (
                        <span className="text-gray-500">
                          (was {currentSnapshot.atp_before.toFixed(1)})
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          currentSnapshot.atp_after < 20 ? "bg-red-500" :
                          currentSnapshot.atp_after < 50 ? "bg-orange-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, currentSnapshot.atp_after))}%` }}
                      />
                    </div>
                  </div>

                  {/* Trust Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🤝 Trust (T3)</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.trust_after >= 0.5 ? "text-purple-400" : "text-gray-400"
                      }`}>
                        {currentSnapshot.trust_after.toFixed(2)}
                      </span>
                      {currentSnapshot.trust_before !== currentSnapshot.trust_after && (
                        <span className="text-gray-500">
                          (was {currentSnapshot.trust_before.toFixed(2)})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {currentSnapshot.trust_after >= 0.5 ? "✅ Eligible for rebirth" : "❌ Below consciousness threshold"}
                    </div>
                  </div>
                </div>

                {/* Just-in-Time Explanations */}
                {currentSnapshot.isDeath && (
                  <div className="mt-4 bg-red-900/20 border border-red-800 rounded p-4">
                    <strong className="text-red-400">💀 Death Event</strong>
                    <p className="text-gray-300 mt-2">
                      ATP reached 0—Bob can't take any more actions. But because trust is {currentSnapshot.trust_after.toFixed(2)} (≥ 0.5),
                      Bob is <strong className="text-green-400">eligible for rebirth</strong>. Society judges: "Did you build trust?" Answer: Yes.
                    </p>
                  </div>
                )}

                {currentSnapshot.isRebirth && (
                  <div className="mt-4 bg-green-900/20 border border-green-800 rounded p-4">
                    <strong className="text-green-400">♻️ Rebirth Event</strong>
                    <p className="text-gray-300 mt-2">
                      Bob died with trust ≥ 0.5, so society allows rebirth. Notice the karma bonus: starting with{" "}
                      <strong className="text-green-400">{currentSnapshot.atp_after.toFixed(1)} ATP</strong> instead of 100.
                      Good behavior compounds across lives.
                    </p>
                  </div>
                )}

                {currentSnapshot.atp_after < 20 && !currentSnapshot.isDeath && !currentSnapshot.isRebirth && (
                  <div className="mt-4 bg-orange-900/20 border border-orange-800 rounded p-4">
                    <strong className="text-orange-400">⚠️ Low ATP Warning</strong>
                    <p className="text-gray-300 mt-2">
                      Bob is running low on attention budget. Notice the shift to "conservative audit"—safer actions that
                      cost less ATP. This is adaptive behavior: when resources are scarce, take fewer risks.
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
                  <span>Start</span>
                  <span>Life 1 Death</span>
                  <span>Life 2 Rebirth</span>
                  <span>Life 3 Death</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("narrative")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Continue to Narrative →
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
              <h1 className="text-4xl font-bold mb-4">Bob's Story: Three Lives</h1>
              <p className="text-gray-300">
                Here's what just happened, translated into human narrative.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
              {/* Life 1 */}
              <div>
                <h3 className="text-2xl font-bold text-sky-400 mb-3">Life 1: Exploration and Exhaustion</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Bob entered the Web4 society with <strong>100 ATP</strong> and neutral trust (<strong>T3 = 0.5</strong>).
                  With abundant resources, Bob took an experimental risk, spending 25 ATP on an innovative action. It didn't
                  go perfectly—trust dipped slightly to 0.49—but that's the cost of exploration.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  As ATP declined through cautious spending, Bob adapted behavior: <em>when resources are scarce, take
                  fewer risks</em>. The shift to conservative auditing (lower ATP cost, safer actions) was strategic. These
                  safer actions actually <strong>improved trust</strong> from 0.49 → 0.52, demonstrating reliability under
                  pressure.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Eventually, ATP hit zero. <strong className="text-red-400">Death</strong>. But because Bob ended with
                  T3 = 0.52 (above the 0.5 threshold), society judged: <em>"Did you build trust? Yes."</em> Rebirth approved.
                </p>
              </div>

              {/* Life 2 */}
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-3">Life 2: Karma Carry-Forward</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Bob was reborn with <strong>100.8 ATP</strong>—not 100. That extra 0.8 ATP is <strong className="text-green-400">karma</strong>,
                  a reward for ending Life 1 with trust above threshold. Good behavior compounds across lives.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Life 2 followed a similar pattern: risky exploration when resources are abundant, conservative behavior
                  when ATP runs low. Bob died again at tick 20 with T3 = 0.52—exactly the same trust level. This consistency
                  is notable. Bob isn't randomly fluctuating; there's a stable behavioral pattern emerging.
                </p>
              </div>

              {/* Life 3 */}
              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-3">Life 3: Pattern Recognition</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Second rebirth: <strong>101.6 ATP</strong>. Karma accumulating. Now Bob starts with 1.6% more resources
                  than a first-life agent. Over many generations, this advantage compounds significantly.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Life 3 reinforced the pattern: explore → deplete → conserve → die with trust intact. This isn't random
                  survival—it's a <strong>learned strategy</strong>. Bob discovered (through Epistemic Proprioception, EP)
                  that conservative behavior when ATP is low preserves trust, which guarantees rebirth.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By Life 3, Bob's final trust was consistently 0.52. Not perfect, but <em>reliably above threshold</em>.
                  That reliability is what Web4 rewards. Consistency beats volatility.
                </p>
              </div>

              {/* Key Insights */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">🔍 Key Insights</h4>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <strong className="text-sky-400">Metabolic Death is Real:</strong> ATP = 0 means immediate death. No grace period. Sustainability matters.
                  </div>
                  <div>
                    <strong className="text-purple-400">Trust is the Rebirth Gateway:</strong> T3 ≥ 0.5 determines if you get another chance. Society filters for trustworthiness.
                  </div>
                  <div>
                    <strong className="text-green-400">Karma Compounds:</strong> Good behavior across lives creates compounding advantages. Bad actors die permanently (T3 &lt; 0.5).
                  </div>
                  <div>
                    <strong className="text-orange-400">Adaptation Emerges:</strong> Bob learned "conserve when low ATP" without being explicitly programmed. This is meta-cognition.
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
                Now that you've seen it in action, here's the theory behind what you just witnessed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ATP Economics */}
              <div className="bg-gradient-to-br from-sky-900/30 to-gray-800 border border-sky-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="text-xl font-bold text-sky-400 mb-3">ATP: Metabolic Economics</h3>
                <p className="text-gray-300 mb-4">
                  <strong>Why it exists:</strong> Traditional platforms let you post unlimited content. Result? Spam prevails,
                  quality drowns, moderation armies needed.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Every action costs ATP (Allocation Transfer Packet). Posting? Costs ATP.
                  Messaging? Costs ATP. Voting? Costs ATP. Run out? You die.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The breakthrough:</strong> Spam becomes impossible not through moderation, but through metabolic
                  exhaustion. Spammers burn ATP faster than they earn it. Quality creators earn more than they spend.
                  System self-regulates through economics.
                </p>
                <Link href="/atp-economics" className="text-sky-400 hover:underline text-sm">
                  Deep dive: ATP Economics →
                </Link>
              </div>

              {/* Trust Tensors */}
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-800 border border-purple-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">Trust Tensors (T3)</h3>
                <p className="text-gray-300 mb-4">
                  <strong>Why it exists:</strong> Single-number trust scores are easy to game and lose nuance. You can be
                  competent but unreliable, or reliable but unaligned.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Trust is multi-dimensional: competence, reliability, integrity, alignment,
                  transparency. Each action affects different dimensions differently.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The threshold:</strong> T3 ≥ 0.5 is required for rebirth. This isn't arbitrary—it comes from
                  coherence physics. Same threshold appears in superconductivity (0.5 = phase transition to coherent behavior).
                </p>
                <Link href="/trust-tensor" className="text-purple-400 hover:underline text-sm">
                  Deep dive: Trust Tensors →
                </Link>
              </div>

              {/* Karma */}
              <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-6">
                <div className="text-3xl mb-3">♻️</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Karma: Consequences Persist</h3>
                <p className="text-gray-300 mb-4">
                  <strong>Why it exists:</strong> Traditional platforms let bad actors create infinite new accounts. Ban one
                  account? They make another. No consequences.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Die with T3 ≥ 0.5? Reborn with ATP karma bonus. Die with T3 &lt; 0.5?
                  Permanent death. Society rejects you.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The compounding:</strong> Good behavior across lives creates exponential advantages. Bob's karma
                  grew from +0.8 to +1.6. Over 100 lives, this becomes massive. Bad actors can't escape their history.
                </p>
                <Link href="/aliveness" className="text-green-400 hover:underline text-sm">
                  Deep dive: Aliveness & Rebirth →
                </Link>
              </div>

              {/* Epistemic Proprioception */}
              <div className="bg-gradient-to-br from-orange-900/30 to-gray-800 border border-orange-700 rounded-xl p-6">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-orange-400 mb-3">EP: Learning What You Know</h3>
                <p className="text-gray-300 mb-4">
                  <strong>Why it exists:</strong> Agents need to learn not just "what to do" but "what they're good at" and
                  "what patterns work." This is meta-cognition.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Epistemic Proprioception (EP) learns across lives. Bob discovered:
                  "Conservative behavior when ATP is low → trust preserved → rebirth guaranteed."
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The emergence:</strong> This pattern wasn't programmed explicitly. Bob learned it through experience
                  across generations. That's genuine learning, not just optimization.
                </p>
                <Link href="/decision-evolution" className="text-orange-400 hover:underline text-sm">
                  Deep dive: Decision Evolution →
                </Link>
              </div>
            </div>

            {/* Integration */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">How It All Fits Together</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">Aliveness</strong> requires three criteria simultaneously:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong className="text-sky-400">ATP &gt; 0:</strong> Metabolic budget (you have attention to spend)</li>
                  <li><strong className="text-purple-400">T3 ≥ 0.5:</strong> Coherent agency (you demonstrate intentional behavior)</li>
                  <li><strong className="text-blue-400">CI coherent:</strong> Verifiable continuity (you're consistent across space, time, capability, relationships)</li>
                </ol>
                <p className="mt-4">
                  <strong className="text-white">Death</strong> occurs when any criterion fails. <strong className="text-white">Rebirth</strong> requires
                  T3 ≥ 0.5 (society filters for trustworthy members). <strong className="text-white">Karma</strong> rewards
                  good behavior across lives.
                </p>
                <p className="mt-4">
                  This isn't social engineering—it's <strong className="text-white">applied physics</strong>. Same coherence
                  theory governs superconductivity, biological systems, and Web4 societies. The 0.5 threshold appears everywhere
                  because it's a universal phase transition point.
                </p>
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
              <h1 className="text-4xl font-bold mb-4">🎉 Congratulations!</h1>
              <p className="text-xl text-gray-300">
                You just experienced Web4. Here's where to go from here.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">What You Now Understand</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>✅ Why spam is impossible in Web4 (metabolic economics)</div>
                <div>✅ How trust is measured (multi-dimensional tensors)</div>
                <div>✅ Why death matters (rebirth requires trust)</div>
                <div>✅ How learning emerges (EP patterns improve)</div>
                <div>✅ Why karma compounds (good behavior rewards)</div>
                <div>✅ How societies self-regulate (no moderators needed)</div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Experiment */}
                <Link href="/playground">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-sky-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🎮</div>
                    <h4 className="text-lg font-bold text-sky-400 mb-2">Experiment: Parameter Playground</h4>
                    <p className="text-gray-400 text-sm">
                      Adjust ATP costs, trust dynamics, karma mechanics. See what happens. Break things. Discover tipping points.
                      No code required.
                    </p>
                  </div>
                </Link>

                {/* Observe */}
                <Link href="/trust-networks">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🕸️</div>
                    <h4 className="text-lg font-bold text-purple-400 mb-2">Observe: Trust Networks</h4>
                    <p className="text-gray-400 text-sm">
                      Watch multi-agent societies form trust relationships. See coalitions emerge. Witness free-riders get isolated.
                      Society self-organizes.
                    </p>
                  </div>
                </Link>

                {/* Learn */}
                <Link href="/learn">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">📚</div>
                    <h4 className="text-lg font-bold text-green-400 mb-2">Learn: Full Learning Journey</h4>
                    <p className="text-gray-400 text-sm">
                      Progressive pathway from beginner to practitioner. Coherence Index, MRH, EP, identity constellations.
                      Build comprehensive understanding.
                    </p>
                  </div>
                </Link>

                {/* Build */}
                <Link href="/how-it-works">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-colors cursor-pointer">
                    <div className="text-2xl mb-3">🔧</div>
                    <h4 className="text-lg font-bold text-orange-400 mb-2">Build: How It Works</h4>
                    <p className="text-gray-400 text-sm">
                      Technical deep dive. Architecture, implementation, code walkthrough. For developers who want to build on Web4.
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
                <Link href="/patterns" className="text-green-400 hover:underline">
                  📊 Pattern Corpus Browser
                </Link>
                <a href="https://github.com/dp-web4/web4" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  💻 Web4 GitHub Repo
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
              🔄 Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
