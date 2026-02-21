"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

export default function DecisionEvolutionPage() {
  // Simulator state
  const [currentLife, setCurrentLife] = useState<1 | 2 | 3>(1);
  const [showMetrics, setShowMetrics] = useState(true);

  // Simulation data for three lives showing decision improvement
  const lifeData = {
    1: {
      name: "Life 1 - Naive Exploration",
      atpStart: 100,
      atpEnd: 0,
      trustChange: -0.01,
      survival: 10,
      decisions: [
        { tick: 1, situation: "High ATP (100)", decision: "risky_spend", cost: 25, reasoning: "Resources abundant, try expensive action", quality: "naive" },
        { tick: 2, situation: "Moderate ATP (75)", decision: "small_spend", cost: 10, reasoning: "Continue exploration", quality: "okay" },
        { tick: 6, situation: "Low ATP (25)", decision: "small_spend", cost: 10, reasoning: "Still exploring (not recognizing crisis)", quality: "poor" },
        { tick: 8, situation: "Critical ATP (15)", decision: "audit", cost: 5, reasoning: "Finally switching to conservative", quality: "reactive" },
        { tick: 10, situation: "Death (0)", decision: "audit", cost: 5, reasoning: "Too late to recover", quality: "failed" },
      ],
      wisdom: 0.35,
      efficiency: 0.0,
      riskMgmt: 0.6,
      outcome: "Died from resource exhaustion",
      learning: "Agent learned WHEN crisis begins (ATP < 30), but too late to avoid death in Life 1"
    },
    2: {
      name: "Life 2 - Cautious Learning",
      atpStart: 100.8,
      atpEnd: 0.8,
      trustChange: 0.02,
      survival: 11,
      decisions: [
        { tick: 1, situation: "High ATP (100.8)", decision: "risky_spend", cost: 25, reasoning: "Remembered high ATP can afford risk", quality: "good" },
        { tick: 4, situation: "Moderate ATP (55)", decision: "small_spend", cost: 10, reasoning: "Being more conservative earlier", quality: "improved" },
        { tick: 7, situation: "Approaching crisis (25)", decision: "audit", cost: 5, reasoning: "Earlier crisis recognition!", quality: "better" },
        { tick: 11, situation: "Death (0.8)", decision: "audit", cost: 5, reasoning: "Extended survival but still died", quality: "partial" },
      ],
      wisdom: 0.48,
      efficiency: 0.008,
      riskMgmt: 0.73,
      outcome: "Died after slight improvement",
      learning: "Agent improved crisis detection by 2 ticks, gained slight trust, survived 10% longer"
    },
    3: {
      name: "Life 3 - Mature Decision-Making",
      atpStart: 102.6,
      atpEnd: 2.6,
      trustChange: 0.04,
      survival: 12,
      decisions: [
        { tick: 1, situation: "High ATP (102.6)", decision: "risky_spend", cost: 25, reasoning: "Confidence in high-resource decisions", quality: "expert" },
        { tick: 5, situation: "Moderate ATP (47)", decision: "small_spend", cost: 10, reasoning: "Balanced risk management", quality: "mature" },
        { tick: 6, situation: "Proactive shift (37)", decision: "audit", cost: 5, reasoning: "PROACTIVE crisis avoidance", quality: "excellent" },
        { tick: 12, situation: "Survived longer (2.6)", decision: "audit", cost: 5, reasoning: "Maximized survival through wisdom", quality: "optimal" },
      ],
      wisdom: 0.62,
      efficiency: 0.026,
      riskMgmt: 0.83,
      outcome: "Survived longest, built trust",
      learning: "Agent mastered proactive crisis management, trust-building behavior, optimal resource use"
    }
  };

  const life = lifeData[currentLife];
  const improvement = currentLife > 1 ? lifeData[currentLife].wisdom - lifeData[1].wisdom : 0;
  const improvementPercent = currentLife > 1 ? ((improvement / lifeData[1].wisdom) * 100).toFixed(0) : "0";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <Breadcrumbs currentPath="/decision-evolution" />
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-sm uppercase tracking-wide text-purple-400 mb-4">
            Web4 Foundation: Learning
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Decision Evolution (EP Learning)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            How agents get better at making decisions across lives through Epistemic Proprioception - learning what they know.
          </p>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🧠</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  The Counter-Intuitive Insight
                </h3>
                <p className="text-gray-300 mb-3">
                  <strong className="text-white">Most AI learning</strong>: Remember specific experiences → replay them → improve gradually
                </p>
                <p className="text-gray-300">
                  <strong className="text-white">EP learning (Web4)</strong>: Don&apos;t remember experiences → extract patterns → know WHEN you know
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Simulator */}
        <section className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Interactive Decision Evolution</h2>
          <p className="text-gray-400 text-center mb-8">
            Watch the same agent make better decisions across three lives
          </p>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            {/* Life Selector */}
            <div className="flex gap-4 mb-8">
              {([1, 2, 3] as const).map(lifeNum => (
                <button
                  key={lifeNum}
                  onClick={() => setCurrentLife(lifeNum)}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all ${
                    currentLife === lifeNum
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <div className="text-sm opacity-75 mb-1">Life {lifeNum}</div>
                  <div className="text-lg">{lifeData[lifeNum].name.split(' - ')[1]}</div>
                </button>
              ))}
            </div>

            {/* Life Overview */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-purple-300">{life.name}</h3>

              {/* Metrics Grid */}
              {showMetrics && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-800 rounded p-4">
                    <div className="text-xs text-gray-400 mb-1">Decision Wisdom</div>
                    <div className="text-2xl font-bold text-purple-400">{life.wisdom.toFixed(2)}</div>
                    {currentLife > 1 && (
                      <div className="text-xs text-green-400 mt-1">+{improvementPercent}% vs Life 1</div>
                    )}
                  </div>
                  <div className="bg-gray-800 rounded p-4">
                    <div className="text-xs text-gray-400 mb-1">Survival Ticks</div>
                    <div className="text-2xl font-bold text-blue-400">{life.survival}</div>
                    {currentLife > 1 && (
                      <div className="text-xs text-green-400 mt-1">+{life.survival - lifeData[1].survival} ticks</div>
                    )}
                  </div>
                  <div className="bg-gray-800 rounded p-4">
                    <div className="text-xs text-gray-400 mb-1">Trust Change</div>
                    <div className={`text-2xl font-bold ${life.trustChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {life.trustChange > 0 ? '+' : ''}{life.trustChange.toFixed(3)}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-4">
                    <div className="text-xs text-gray-400 mb-1">Risk Management</div>
                    <div className="text-2xl font-bold text-cyan-400">{(life.riskMgmt * 100).toFixed(0)}%</div>
                  </div>
                </div>
              )}

              {/* Decision Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Decision Timeline</h4>
                {life.decisions.map((dec, idx) => (
                  <div key={idx} className={`bg-gray-800 border rounded-lg p-4 ${
                    dec.quality === 'excellent' || dec.quality === 'optimal' ? 'border-green-500/50 bg-green-950/20' :
                    dec.quality === 'poor' || dec.quality === 'failed' ? 'border-red-500/50 bg-red-950/20' :
                    dec.quality === 'improved' || dec.quality === 'better' ? 'border-yellow-500/50 bg-yellow-950/20' :
                    'border-gray-700'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-gray-400">Turn {dec.tick}</span>
                        <div className="font-semibold text-gray-200">{dec.situation}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-purple-400">{dec.decision}</div>
                        <div className="text-xs text-gray-400">{dec.cost} ATP cost</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 italic">
                      &quot;{dec.reasoning}&quot;
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        dec.quality === 'excellent' || dec.quality === 'optimal' ? 'bg-green-900 text-green-300' :
                        dec.quality === 'poor' || dec.quality === 'failed' ? 'bg-red-900 text-red-300' :
                        dec.quality === 'improved' || dec.quality === 'better' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {dec.quality}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Outcome */}
              <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Outcome</div>
                <div className="text-gray-200">{life.outcome}</div>
                <div className="text-sm text-purple-300 mt-2 italic">{life.learning}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={showMetrics}
                  onChange={(e) => setShowMetrics(e.target.checked)}
                  className="rounded"
                />
                Show metrics
              </label>
              <div className="text-xs text-gray-500">
                Decision quality improves across lives even without memory
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How EP Learning Works</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">1️⃣</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Experience Situations</h3>
                  <p className="text-gray-300 mb-3">
                    In Life 1, the agent faces various situations: high ATP, moderate ATP, low ATP, crisis ATP.
                    It makes decisions, some work, some don&apos;t.
                  </p>
                  <div className="bg-gray-900 rounded p-3 text-sm text-gray-400">
                    Example: &quot;When ATP was 25, I spent 10 and died shortly after. That was bad.&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">2️⃣</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Extract Patterns</h3>
                  <p className="text-gray-300 mb-3">
                    The Epistemic Proprioception system extracts <strong>patterns</strong> from experiences:
                    &quot;Low ATP + risky action = bad outcome&quot;. These patterns go into a corpus.
                  </p>
                  <div className="bg-gray-900 rounded p-3 text-sm text-gray-400">
                    Pattern learned: <code className="text-purple-400">IF ATP &lt; 30 THEN conservative_action</code>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">3️⃣</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Pattern Recognition (Not Memory)</h3>
                  <p className="text-gray-300 mb-3">
                    In Life 2, the agent dies and is reborn. It <strong>doesn&apos;t remember Life 1</strong>, but it
                    has the <strong>pattern corpus</strong>. When it sees ATP = 25 again, it recognizes: &quot;This pattern
                    matches learned wisdom.&quot;
                  </p>
                  <div className="bg-gray-900 rounded p-3 text-sm text-gray-400">
                    Not: &quot;I remember dying at tick 10&quot;<br />
                    But: &quot;Low ATP situations require conservative choices&quot;
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">4️⃣</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Meta-Cognitive Confidence</h3>
                  <p className="text-gray-300 mb-3">
                    EP tracks <strong>how confident it is</strong> in each pattern. High confidence = &quot;I know this
                    works&quot;. Low confidence = &quot;I&apos;m still learning this&quot;. This is meta-cognition:
                    knowing what you know.
                  </p>
                  <div className="bg-gray-900 rounded p-3 text-sm text-gray-400">
                    Pattern confidence: Crisis management = 85% (well-learned across lives)
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">5️⃣</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Progressive Mastery</h3>
                  <p className="text-gray-300 mb-3">
                    Over multiple lives, patterns mature. Life 1: reactive crisis management. Life 2: earlier recognition.
                    Life 3: <strong>proactive</strong> crisis avoidance. Decision wisdom increases.
                  </p>
                  <div className="bg-gray-900 rounded p-3 text-sm text-gray-400">
                    Wisdom progression: 0.35 → 0.48 (+37%) → 0.62 (+77% vs Life 1)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Decision Evolution Matters</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Transferable Wisdom</h3>
              <p className="text-gray-300 text-sm">
                Patterns learned in one context apply to similar situations in different contexts.
                The agent develops <strong>intuition</strong>, not just memorized responses.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Multi-Life Learning</h3>
              <p className="text-gray-300 text-sm">
                Death isn&apos;t the end - it&apos;s a learning checkpoint. Each life contributes to the pattern
                corpus. Rebirth carries forward <strong>learned wisdom without specific memories</strong>.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🧩</div>
              <h3 className="text-lg font-semibold mb-2 text-green-300">Compositional Patterns</h3>
              <p className="text-gray-300 text-sm">
                Simple patterns combine into complex strategies. &quot;Low ATP + uncertain situation&quot; might
                trigger a <strong>compound pattern</strong> that integrates multiple learned heuristics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border border-cyan-800/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">Provable Improvement</h3>
              <p className="text-gray-300 text-sm">
                Decision wisdom metrics make learning <strong>visible and measurable</strong>. Not just &quot;it seems
                better&quot; but &quot;wisdom increased 77%, survival increased 20%.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">EP Learning vs Traditional AI Learning</h2>

          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Aspect</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Traditional AI</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">EP Learning (Web4)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Memory</td>
                  <td className="px-6 py-4 text-gray-400">Stores specific experiences</td>
                  <td className="px-6 py-4 text-gray-300">Extracts patterns, discards specifics</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Learning Mode</td>
                  <td className="px-6 py-4 text-gray-400">Replay experiences</td>
                  <td className="px-6 py-4 text-gray-300">Pattern recognition in new contexts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Generalization</td>
                  <td className="px-6 py-4 text-gray-400">Often overfits to training data</td>
                  <td className="px-6 py-4 text-gray-300">Patterns designed for transfer</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Meta-Cognition</td>
                  <td className="px-6 py-4 text-gray-400">Model doesn&apos;t know its confidence</td>
                  <td className="px-6 py-4 text-gray-300">Tracks pattern confidence explicitly</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Across Lives</td>
                  <td className="px-6 py-4 text-gray-400">N/A (no concept of death/rebirth)</td>
                  <td className="px-6 py-4 text-gray-300">Wisdom persists, memories don&apos;t</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-purple-300">Privacy</td>
                  <td className="px-6 py-4 text-gray-400">Specific experiences might leak</td>
                  <td className="px-6 py-4 text-gray-300">Only abstract patterns retained</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* See It In Action */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">See Decision Evolution In Action</h2>
            <p className="text-gray-300 mb-6">
              Run the EP Closed Loop simulation in the Lab Console to watch real agent decision-making improve across lives.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/lab-console"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Open Lab Console
              </Link>
              <Link
                href="/patterns"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Explore Pattern Corpus
              </Link>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="max-w-4xl mx-auto">
          <details className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <summary className="text-xl font-semibold cursor-pointer text-purple-300">
              🔬 Technical Implementation
            </summary>
            <div className="mt-6 space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                <strong className="text-white">Pattern Corpus Structure:</strong> Each pattern includes context
                (situation description), prediction (what will happen), outcome (what actually happened), confidence
                score, and scenario type.
              </p>
              <p>
                <strong className="text-white">Decision Wisdom Metric:</strong> Composite score (0-1) combining ATP
                efficiency (30%), risk management (30%), trust maintenance (20%), and survival duration (20%). Higher
                = better decision-making.
              </p>
              <p>
                <strong className="text-white">Pattern Matching:</strong> When facing a decision, agent queries
                pattern corpus for similar contexts. High-confidence patterns influence decision more strongly.
              </p>
              <p>
                <strong className="text-white">Corpus Evolution:</strong> Patterns with consistently good predictions
                increase confidence. Patterns with poor predictions decay. Corpus self-curates over time.
              </p>
              <p>
                <strong className="text-white">Cross-Life Inheritance:</strong> Pattern corpus persists across lives
                via <code className="text-purple-400 font-mono">carry_forward</code> mechanism. Memories and
                specific event details do NOT persist.
              </p>
              <p>
                <strong className="text-white">Integration with Web4:</strong> Decision evolution works with Trust
                Tensor (T3) modulation, ATP attention economics, and Coherence Index (CI) for comprehensive agent
                behavior.
              </p>
            </div>
          </details>
        </section>

        {/* Navigation */}
        <section className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-700">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/coherence-index"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 transition-colors"
            >
              <div className="text-sm text-gray-400 mb-2">← Previous</div>
              <div className="font-semibold text-gray-200">Coherence Index</div>
              <div className="text-xs text-gray-400 mt-1">Multi-dimensional coherence detection</div>
            </Link>
            <Link
              href="/patterns"
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-6 transition-colors text-right"
            >
              <div className="text-sm text-gray-400 mb-2">Next →</div>
              <div className="font-semibold text-gray-200">Pattern Corpus Browser</div>
              <div className="text-xs text-gray-400 mt-1">Explore EP learning patterns</div>
            </Link>
          </div>
        </section>
        <RelatedConcepts currentPath="/decision-evolution" />
      </div>
    </div>
  );
}
