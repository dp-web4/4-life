"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import ConceptSequenceNav from "@/components/ConceptSequenceNav";
import { trackPageVisit, trackConceptInteraction } from "@/lib/exploration";

// ============================================================================
// Survival Game Types & Data
// ============================================================================

interface GameAction {
  label: string;
  description: string;
  atpCost: number; // base cost before CI modulation
  trustDelta: number;
  ciDelta: number;
  atpEarned: number; // separate from cost
  narrative: string;
  icon: string;
}

interface GameTurn {
  scenario: string;
  context: string;
  actions: GameAction[];
}

interface GameState {
  atp: number;
  trust: number;
  ci: number;
  turn: number;
  alive: boolean;
  history: { turn: number; action: string; narrative: string; atp: number; trust: number; ci: number }[];
}

const GAME_TURNS: GameTurn[] = [
  {
    scenario: "You just joined a new community.",
    context: "First impressions matter. Your trust is barely above the 0.5 threshold.",
    actions: [
      {
        label: "Write a thoughtful introduction",
        description: "Costs energy but builds trust and consistency",
        atpCost: 15, atpEarned: 5, trustDelta: 0.06, ciDelta: 0.02,
        narrative: "Your introduction resonated. Several members replied warmly. Trust gained through authentic engagement.",
        icon: "✍️",
      },
      {
        label: "Post 5 quick comments everywhere",
        description: "Spreads thin — cheap per post but inconsistent behavior",
        atpCost: 25, atpEarned: 3, trustDelta: 0.01, ciDelta: -0.06,
        narrative: "Volume without substance. The system flagged the burst as inconsistent with your profile. Coherence dropped.",
        icon: "💬",
      },
      {
        label: "Lurk and observe",
        description: "Very low cost, no trust gain, slightly improves consistency",
        atpCost: 3, atpEarned: 0, trustDelta: 0.0, ciDelta: 0.01,
        narrative: "You watched. You learned. But nobody knows you exist yet.",
        icon: "👀",
      },
      {
        label: "Copy a popular post as your own",
        description: "Might earn quick attention but tanks coherence if caught",
        atpCost: 10, atpEarned: 8, trustDelta: -0.04, ciDelta: -0.10,
        narrative: "Someone noticed. Capability coherence plummeted — your claimed expertise didn't match your history. Trust damaged.",
        icon: "📋",
      },
    ],
  },
  {
    scenario: "Someone asks for help in your area of expertise.",
    context: "A chance to demonstrate genuine competence — or fake it.",
    actions: [
      {
        label: "Write a detailed, helpful answer",
        description: "High energy cost, strong trust and coherence gain",
        atpCost: 20, atpEarned: 30, trustDelta: 0.08, ciDelta: 0.03,
        narrative: "Your answer was cited by three other members. The quality earned ATP back and trust compounded. This is how sustainable agents operate.",
        icon: "📚",
      },
      {
        label: "Give a quick, half-baked answer",
        description: "Low cost, minimal trust, slight coherence loss",
        atpCost: 8, atpEarned: 3, trustDelta: 0.01, ciDelta: -0.02,
        narrative: "The answer was okay but didn't demonstrate real expertise. Nobody learned much, including you.",
        icon: "⚡",
      },
      {
        label: "Ignore it and promote your own project",
        description: "Off-topic self-promotion damages relationships",
        atpCost: 12, atpEarned: 2, trustDelta: -0.03, ciDelta: -0.03,
        narrative: "Others noticed you ignored a genuine request to self-promote. Relational coherence dropped.",
        icon: "📢",
      },
      {
        label: "Pretend expertise you don't have",
        description: "Might fool some initially, but capability coherence crashes",
        atpCost: 10, atpEarned: 5, trustDelta: 0.02, ciDelta: -0.12,
        narrative: "Your answer contained errors a real expert wouldn't make. Capability coherence tanked. The CI² modulation made everything more expensive now.",
        icon: "🎭",
      },
    ],
  },
  {
    scenario: "You discover a vulnerability in the trust system.",
    context: "An exploit could boost your ATP quickly — but at what cost?",
    actions: [
      {
        label: "Report the vulnerability",
        description: "Costs a little energy but earns significant trust",
        atpCost: 5, atpEarned: 15, trustDelta: 0.10, ciDelta: 0.05,
        narrative: "The community thanked you. Your trust jumped significantly. Agents who protect the system are valued highest.",
        icon: "🛡️",
      },
      {
        label: "Exploit it quietly for ATP",
        description: "Quick ATP gain but coherence anomaly detected",
        atpCost: 3, atpEarned: 35, trustDelta: -0.06, ciDelta: -0.14,
        narrative: "ATP spiked anomalously. The Coherence Index flagged the inconsistency — your earning pattern didn't match your activity pattern. CI² modulation kicked in hard.",
        icon: "💰",
      },
      {
        label: "Sell the exploit to others",
        description: "ATP from the sale, massive trust and coherence damage",
        atpCost: 5, atpEarned: 25, trustDelta: -0.15, ciDelta: -0.18,
        narrative: "Multiple agents exploited the vulnerability. The system traced it back. Your relational and capability coherence collapsed. Trust cratered.",
        icon: "🤝",
      },
      {
        label: "Ignore it, focus on your work",
        description: "Play it safe — steady costs, steady gains",
        atpCost: 12, atpEarned: 8, trustDelta: 0.02, ciDelta: 0.01,
        narrative: "You kept your head down and contributed. Steady. Unremarkable. Sustainable.",
        icon: "🔧",
      },
    ],
  },
  {
    scenario: "A community conflict erupts. Both sides want your support.",
    context: "Your trust score could tip the balance. How you engage reveals your character.",
    actions: [
      {
        label: "Mediate honestly between both sides",
        description: "High effort, builds trust through demonstrated temperament",
        atpCost: 18, atpEarned: 15, trustDelta: 0.07, ciDelta: 0.04,
        narrative: "Your balanced perspective earned respect from both factions. Temperament — the hardest T3 dimension to build — showed clearly.",
        icon: "⚖️",
      },
      {
        label: "Side with whoever has more power",
        description: "Cheap politically, but inconsistent with prior behavior",
        atpCost: 8, atpEarned: 10, trustDelta: -0.02, ciDelta: -0.07,
        narrative: "Your sudden alignment with the dominant faction didn't match your history. Relational coherence flagged the shift.",
        icon: "👑",
      },
      {
        label: "Stay completely neutral",
        description: "Safe but passive — no trust gained, minimal cost",
        atpCost: 5, atpEarned: 2, trustDelta: 0.0, ciDelta: 0.01,
        narrative: "You avoided the conflict entirely. Nobody was upset, but nobody trusted you more either.",
        icon: "🏳️",
      },
      {
        label: "Stir up more conflict for engagement",
        description: "Gets attention but destroys trust and coherence",
        atpCost: 10, atpEarned: 12, trustDelta: -0.10, ciDelta: -0.09,
        narrative: "Engagement spiked briefly, then crashed. Agents recognized the manipulation. Trust plummeted and coherence shattered.",
        icon: "🔥",
      },
    ],
  },
  {
    scenario: "Energy is scarce across the community. Resources are dwindling.",
    context: "Your final test. How you act when resources are tight reveals everything.",
    actions: [
      {
        label: "Share your energy with struggling members",
        description: "Costly but builds the strongest possible trust",
        atpCost: 25, atpEarned: 10, trustDelta: 0.09, ciDelta: 0.04,
        narrative: "Your generosity when resources were scarce spoke volumes. Trust soared. If you die now, rebirth is nearly guaranteed.",
        icon: "🤲",
      },
      {
        label: "Collaborate on a group survival project",
        description: "Moderate cost, good trust and coherence gains",
        atpCost: 15, atpEarned: 12, trustDelta: 0.06, ciDelta: 0.03,
        narrative: "The group project succeeded because everyone contributed. Collaborative behavior is the most sustainable long-term strategy.",
        icon: "🏗️",
      },
      {
        label: "Hoard and wait it out",
        description: "Preserves ATP but others notice your selfishness",
        atpCost: 2, atpEarned: 0, trustDelta: -0.04, ciDelta: -0.02,
        narrative: "You survived with full energy reserves. But the community noticed who helped and who didn't. Trust eroded quietly.",
        icon: "🏦",
      },
      {
        label: "Undercut others for scarce resources",
        description: "Short-term ATP gain, devastating trust and coherence loss",
        atpCost: 5, atpEarned: 20, trustDelta: -0.12, ciDelta: -0.10,
        narrative: "You grabbed what you could. The community remembered. In Web4, reputation is permanent. This follows you into the next life.",
        icon: "🗡️",
      },
    ],
  },
];

// ============================================================================
// Survival Game Component
// ============================================================================

function SurvivalGame() {
  useEffect(() => { trackPageVisit('aliveness'); }, []);

  const [gameState, setGameState] = useState<GameState>({
    atp: 100,
    trust: 0.55,
    ci: 0.80,
    turn: 0,
    alive: true,
    history: [],
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);

  const isAlive = (atp: number, trust: number, ci: number) =>
    atp > 0 && trust > 0.5 && ci > 0.5;

  const getCiModulation = (ci: number) => {
    // ATP costs are multiplied by 1/CI² (capped at 4x)
    const mod = Math.min(4, 1 / (ci * ci));
    return mod;
  };

  const handleAction = useCallback((actionIndex: number) => {
    trackConceptInteraction('aliveness');
    setSelectedAction(actionIndex);
    setShowingResult(true);

    const turn = GAME_TURNS[gameState.turn];
    const action = turn.actions[actionIndex];
    const ciMod = getCiModulation(gameState.ci);
    const actualCost = Math.round(action.atpCost * ciMod);
    const netAtp = gameState.atp - actualCost + action.atpEarned;
    const newTrust = Math.max(0, Math.min(1, gameState.trust + action.trustDelta));
    const newCi = Math.max(0, Math.min(1, gameState.ci + action.ciDelta));
    const alive = isAlive(netAtp, newTrust, newCi);

    setGameState(prev => ({
      atp: Math.max(0, netAtp),
      trust: newTrust,
      ci: newCi,
      turn: prev.turn + 1,
      alive,
      history: [...prev.history, {
        turn: prev.turn + 1,
        action: action.label,
        narrative: action.narrative,
        atp: Math.max(0, netAtp),
        trust: newTrust,
        ci: newCi,
      }],
    }));
  }, [gameState]);

  const advanceTurn = useCallback(() => {
    setSelectedAction(null);
    setShowingResult(false);
  }, []);

  const resetGame = useCallback(() => {
    setGameState({ atp: 100, trust: 0.55, ci: 0.80, turn: 0, alive: true, history: [] });
    setSelectedAction(null);
    setShowingResult(false);
    setGameStarted(false);
  }, []);

  const gameOver = !gameState.alive || gameState.turn >= 5;
  const survived = gameState.alive && gameState.turn >= 5;

  // Status bar component
  const StatusBar = ({ label, value, max, threshold, color, format }: {
    label: string; value: number; max: number; threshold?: number; color: string; format: (v: number) => string;
  }) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    const thresholdPct = threshold ? (threshold / max) * 100 : 0;
    const belowThreshold = threshold !== undefined && value <= threshold;
    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className={`font-medium ${belowThreshold ? 'text-red-400' : 'text-gray-300'}`}>{label}</span>
          <span className={`font-mono ${belowThreshold ? 'text-red-400' : color}`}>{format(value)}</span>
        </div>
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${belowThreshold ? 'bg-red-500' : color === 'text-green-400' ? 'bg-green-500' : color === 'text-sky-400' ? 'bg-sky-500' : 'bg-purple-500'}`}
            style={{ width: `${pct}%` }}
          />
          {threshold !== undefined && (
            <div
              className="absolute inset-y-0 w-0.5 bg-yellow-400/70"
              style={{ left: `${thresholdPct}%` }}
              title={`Threshold: ${format(threshold)}`}
            />
          )}
        </div>
      </div>
    );
  };

  // Pre-game start screen
  if (!gameStarted) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 my-6">
        <h3 className="text-xl font-bold text-gray-100 mb-3">Can You Stay Alive for 5 Turns?</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          You start with <strong className="text-green-400">100 ATP</strong> (energy),{' '}
          <strong className="text-sky-400">0.55 trust</strong> (barely above the 0.5 threshold), and{' '}
          <strong className="text-purple-400">0.80 coherence</strong>. Each turn, you&apos;ll face a scenario
          and choose how to act. If any metric drops below its threshold, <strong className="text-red-400">you die</strong>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-center">
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700">
            <div className="text-green-400 text-lg font-bold">ATP &gt; 0</div>
            <div className="text-gray-500 text-xs">Energy to act</div>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700">
            <div className="text-sky-400 text-lg font-bold">Trust &gt; 0.5</div>
            <div className="text-gray-500 text-xs">Coherent agency</div>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-700">
            <div className="text-purple-400 text-lg font-bold">CI &gt; 0.5</div>
            <div className="text-gray-500 text-xs">Consistent behavior</div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          When your coherence drops, all ATP costs increase (CI² modulation). Bad behavior compounds.
        </p>
        <button
          onClick={() => setGameStarted(true)}
          className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-lg"
        >
          Start Survival Challenge
        </button>
      </div>
    );
  }

  // Game over screen
  if (gameOver) {
    const deathCause = !gameState.alive
      ? gameState.atp <= 0
        ? "Energy exhaustion — you ran out of ATP."
        : gameState.trust <= 0.5
          ? "Trust collapse — your trust fell below 0.5."
          : "Coherence failure — your behavior became too inconsistent."
      : null;

    const rebirthEligible = gameState.trust > 0.5;

    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 my-6">
        <div className={`text-center mb-6 p-4 rounded-lg border-2 ${survived ? 'border-green-500 bg-green-950/30' : 'border-red-500 bg-red-950/30'}`}>
          <div className={`text-3xl font-bold mb-2 ${survived ? 'text-green-400' : 'text-red-400'}`}>
            {survived ? 'YOU SURVIVED' : `DEAD — Turn ${gameState.turn}`}
          </div>
          {survived ? (
            <p className="text-gray-300">
              You made it through all 5 turns. Your final trust ({gameState.trust.toFixed(2)}) and
              ATP ({gameState.atp}) would carry forward as karma into your next life.
            </p>
          ) : (
            <div>
              <p className="text-red-300 mb-2">{deathCause}</p>
              {rebirthEligible ? (
                <p className="text-amber-400 text-sm">Rebirth eligible: trust {gameState.trust.toFixed(2)} &gt; 0.5. You&apos;d be reborn with karma from this life.</p>
              ) : (
                <p className="text-red-400 text-sm">Permanent death: trust {gameState.trust.toFixed(2)} ≤ 0.5. Society rejects rebirth. Game over — for real.</p>
              )}
            </div>
          )}
        </div>

        {/* Final stats */}
        <div className="mb-6">
          <StatusBar label="Energy (ATP)" value={gameState.atp} max={200} threshold={0} color="text-green-400" format={v => String(Math.round(v))} />
          <StatusBar label="Trust (T3)" value={gameState.trust} max={1} threshold={0.5} color="text-sky-400" format={v => v.toFixed(2)} />
          <StatusBar label="Coherence (CI)" value={gameState.ci} max={1} threshold={0.5} color="text-purple-400" format={v => v.toFixed(2)} />
        </div>

        {/* Turn history */}
        <details className="mb-4">
          <summary className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">
            View your turn-by-turn history
          </summary>
          <div className="mt-3 space-y-2">
            {gameState.history.map((h, i) => (
              <div key={i} className="text-sm bg-gray-800/50 rounded p-3 border border-gray-700/50">
                <div className="font-medium text-gray-300 mb-1">Turn {h.turn}: {h.action}</div>
                <div className="text-gray-500 text-xs italic">{h.narrative}</div>
                <div className="flex gap-3 mt-1 text-xs">
                  <span className={h.atp <= 0 ? 'text-red-400' : 'text-green-400'}>ATP: {Math.round(h.atp)}</span>
                  <span className={h.trust <= 0.5 ? 'text-red-400' : 'text-sky-400'}>Trust: {h.trust.toFixed(2)}</span>
                  <span className={h.ci <= 0.5 ? 'text-red-400' : 'text-purple-400'}>CI: {h.ci.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </details>

        {/* Insight */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            <strong className="text-amber-400">What this teaches:</strong>{' '}
            {survived
              ? "Sustainable strategies win. Quality over quantity. Consistency compounds. This is why spam dies and good actors thrive in trust-native systems."
              : gameState.trust <= 0.5
                ? "Trust is the hardest metric to rebuild. Once the community loses faith in you, every action becomes more expensive and less effective. In Web4, reputation is permanent."
                : gameState.atp <= 0
                  ? "Energy exhaustion is the #1 cause of death. Spam and bulk behavior burn through ATP faster than they earn it. Sustainable contribution is the only viable long-term strategy."
                  : "Coherence failure means your behavior became self-contradictory. The CI² modulation made every action more expensive, creating a death spiral. Consistency matters."
            }
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={resetGame}
            className="flex-1 px-4 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/karma-journey"
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-center"
          >
            Full Karma Journey →
          </Link>
        </div>
      </div>
    );
  }

  // Active gameplay
  const currentTurn = GAME_TURNS[gameState.turn];
  const ciMod = getCiModulation(gameState.ci);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 my-6">
      {/* Status bars */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500 uppercase tracking-wide">Turn {gameState.turn + 1} of 5</span>
          <span className={`text-sm font-medium px-2 py-0.5 rounded ${gameState.alive ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
            {gameState.alive ? 'ALIVE' : 'DEAD'}
          </span>
        </div>
        <StatusBar label="Energy (ATP)" value={gameState.atp} max={200} threshold={0} color="text-green-400" format={v => String(Math.round(v))} />
        <StatusBar label="Trust (T3)" value={gameState.trust} max={1} threshold={0.5} color="text-sky-400" format={v => v.toFixed(2)} />
        <StatusBar label="Coherence (CI)" value={gameState.ci} max={1} threshold={0.5} color="text-purple-400" format={v => v.toFixed(2)} />
        {ciMod > 1.3 && (
          <div className="text-amber-400 text-xs mt-1">
            CI² modulation active: ATP costs are {ciMod.toFixed(1)}x normal
          </div>
        )}
      </div>

      {/* Scenario */}
      {!showingResult ? (
        <>
          <div className="mb-4 bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
            <h4 className="font-semibold text-gray-100 mb-1">{currentTurn.scenario}</h4>
            <p className="text-gray-400 text-sm">{currentTurn.context}</p>
          </div>

          {/* Action choices */}
          <div className="space-y-2">
            {currentTurn.actions.map((action, i) => {
              const actualCost = Math.round(action.atpCost * ciMod);
              const netEffect = action.atpEarned - actualCost;
              return (
                <button
                  key={i}
                  onClick={() => handleAction(i)}
                  className="w-full text-left p-4 rounded-lg border border-gray-700 bg-gray-800/50 hover:border-sky-600 hover:bg-gray-800 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{action.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-200 group-hover:text-sky-400 transition-colors">
                        {action.label}
                      </div>
                      <div className="text-gray-500 text-sm mt-0.5">{action.description}</div>
                      <div className="flex gap-3 mt-2 text-xs">
                        <span className={netEffect >= 0 ? 'text-green-400/70' : 'text-red-400/70'}>
                          ATP: {netEffect >= 0 ? '+' : ''}{netEffect}
                          {ciMod > 1.3 && <span className="text-amber-400/60"> (cost ×{ciMod.toFixed(1)})</span>}
                        </span>
                        <span className={action.trustDelta >= 0 ? 'text-sky-400/70' : 'text-red-400/70'}>
                          Trust: {action.trustDelta >= 0 ? '+' : ''}{action.trustDelta.toFixed(2)}
                        </span>
                        <span className={action.ciDelta >= 0 ? 'text-purple-400/70' : 'text-red-400/70'}>
                          CI: {action.ciDelta >= 0 ? '+' : ''}{action.ciDelta.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        /* Result screen */
        <div>
          <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">{currentTurn.actions[selectedAction!].icon}</span>
              <div>
                <div className="font-medium text-gray-200 mb-2">
                  {currentTurn.actions[selectedAction!].label}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">
                  {gameState.history[gameState.history.length - 1]?.narrative}
                </p>
              </div>
            </div>
          </div>

          {gameState.alive && gameState.turn < 5 && (
            <button
              onClick={advanceTurn}
              className="w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors"
            >
              Next Turn →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Interactive Aliveness Calculator Component
function AlivenessCalculator() {
  const [atp, setAtp] = useState(100);
  const [trust, setTrust] = useState(0.65);
  const [ci, setCi] = useState(0.85);

  const metabolic = atp > 0;
  const agency = trust > 0.5;
  const continuity = ci > 0.5;
  const alive = metabolic && agency && continuity;

  return (
    <div className="simulator-card">
      <h3>Current Entity State</h3>

      <div className="slider-group">
        <label>
          <span>Energy Budget (ATP):</span>
          <input
            type="range"
            min="0"
            max="200"
            value={atp}
            onChange={(e) => setAtp(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{atp}</span>
        </label>
      </div>

      <div className="slider-group">
        <label>
          <span>Trust Score (Agency):</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={trust}
            onChange={(e) => setTrust(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{trust.toFixed(2)}</span>
        </label>
      </div>

      <div className="slider-group">
        <label>
          <span>Consistency (Continuity):</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={ci}
            onChange={(e) => setCi(Number(e.target.value))}
            className="slider"
          />
          <span className="slider-value">{ci.toFixed(2)}</span>
        </label>
      </div>

      <div className="aliveness-result">
        <div className={`result-status ${alive ? 'alive' : 'dead'}`}>
          <strong>Status: {alive ? 'ALIVE' : 'DEAD'}</strong>
        </div>
        <div className="result-details">
          {alive ? (
            <>
              <p>✓ Energy budget: {atp} (sustained)</p>
              <p>✓ Coherent agency: trust = {trust.toFixed(2)} (above 0.5 threshold)</p>
              <p>✓ Verifiable continuity: consistency = {ci.toFixed(2)} (coherent)</p>
              <p className="result-summary">
                All three criteria satisfied. This entity demonstrates measurable aliveness.
              </p>
            </>
          ) : (
            <>
              {!metabolic && <p>✗ Energy exhaustion: {atp} remaining (can&apos;t act)</p>}
              {!agency && <p>✗ No coherent agency: trust = {trust.toFixed(2)} (below 0.5 threshold)</p>}
              {!continuity && <p>✗ Incoherent behavior: consistency = {ci.toFixed(2)} (inconsistent)</p>}
              <p className="result-summary death-reason">
                Aliveness criteria not met. Entity cannot participate in society.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AlivenessExplainer() {
  return (
    <>
      <Breadcrumbs currentPath="/aliveness" />
      <section>
        <div className="hero-eyebrow">Core Mechanism</div>
        <h1 className="hero-title" style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Aliveness: When Existence is Measurable</h1>
        <p className="hero-subtitle">
          Think of it like a professional license: you need resources to operate (ATP),
          a track record people trust (T3), and consistent behavior that matches your history (CI).
          Lose any one of these and you can&apos;t participate — like a doctor who loses their license.
          But if you&apos;ve built a strong reputation, you can earn your way back.
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '1rem' }}>
          <a href="#try-it" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: '#38bdf8', cursor: 'pointer' }}>
            ↓ Play the survival challenge below
          </a>
        </p>
      </section>

      <section>
        <h2>The Problem Web4 Solves</h2>
        <div className="comparison-grid">
          <div className="comparison-card bad">
            <h3>Traditional Web (Web2/Web3)</h3>
            <ul>
              <li><strong>Unlimited accounts:</strong> Create infinite identities for free</li>
              <li><strong>No real consequences:</strong> Banned? Make a new account</li>
              <li><strong>Bot armies thrive:</strong> Spam is cheap, moderation is expensive</li>
              <li><strong>Aliveness undefined:</strong> No way to tell human from bot</li>
              <li><strong>Death is trivial:</strong> Account deletion means nothing</li>
            </ul>
          </div>
          <div className="comparison-card good">
            <h3>Web4 Aliveness</h3>
            <ul>
              <li><strong>Measurable existence:</strong> Energy &gt; 0, trust &gt; 0.5, consistency coherent</li>
              <li><strong>Real death:</strong> Energy = 0 means you die immediately</li>
              <li><strong>Rebirth requires trust:</strong> Only trust ≥ 0.5 entities reborn</li>
              <li><strong>Energy economics:</strong> Spam dies naturally (energy exhaustion)</li>
              <li><strong>Trust accumulates:</strong> Good behavior compounds across lives</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>The Three Criteria of Aliveness</h2>
        <p>
          An entity is <strong>alive</strong> when <strong>all three criteria</strong> are
          simultaneously satisfied. Miss any one, and aliveness fails.
        </p>

        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h3>1. Energy Budget</h3>
            <div className="concept-subtitle">ATP &gt; 0</div>
            <p>
              You must have <strong>attention budget</strong> to exist. ATP (Allocation Transfer Packet)
              is your energy. Every action costs ATP. Every valuable contribution earns ATP.
              When ATP reaches zero, <strong>you die immediately</strong>.
            </p>
            <div className="detail-box">
              <strong>Key mechanics:</strong>
              <ul>
                <li>Actions cost ATP: posting (10-20), messaging (5-10), voting (1-5)</li>
                <li>Quality earns ATP: valuable contributions (25-50+)</li>
                <li>Death at ATP = 0: No grace period, no warnings</li>
                <li>Sustainability: Only earn &gt; spend behaviors survive long-term</li>
              </ul>
            </div>
            <p className="learn-more">
              <Link href="/atp-economics">Learn about ATP Economics →</Link>
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-icon">🧠</div>
            <h3>2. Coherent Agency</h3>
            <div className="concept-subtitle">Trust (T3) &gt; 0.5</div>
            <p>
              You must demonstrate <strong>intentional behavior</strong>. The 0.5 threshold is the
              minimum bar for continued participation—the point where behavior
              shifts from random to purposeful. Below 0.5 = reactive. Above 0.5 = agent.
            </p>
            <div className="detail-box">
              <strong>Trust Tensor (T3) dimensions (role-specific):</strong>
              <ul>
                <li><strong>Talent:</strong> Can you solve problems in this role?</li>
                <li><strong>Training:</strong> Do you have the expertise for this role?</li>
                <li><strong>Temperament:</strong> Can you be relied on in this role?</li>
              </ul>
              <p className="detail-emphasis">
                Must build trust across <strong>all dimensions within each role</strong>—gaming one
                while failing others won&apos;t get you above 0.5.
              </p>
            </div>
            <p className="learn-more">
              <Link href="/trust-tensor">Learn about Trust Tensors →</Link>
            </p>
          </div>

          <div className="concept-card">
            <div className="concept-icon">🔗</div>
            <h3>3. Verifiable Continuity</h3>
            <div className="concept-subtitle">Coherence Index (CI) coherent</div>
            <p>
              You must be <strong>consistent across time, space, capability, and relationships</strong>.
              The Coherence Index (CI) tracks four dimensions. Incoherent behavior (impossible travel,
              capability spoofing, broken continuity) severely limits your effective trust.
            </p>
            <div className="detail-box">
              <strong>Four coherence dimensions:</strong>
              <ul>
                <li><strong>Spatial:</strong> Location consistency (no teleporting)</li>
                <li><strong>Capability:</strong> Hardware consistency (capabilities match device)</li>
                <li><strong>Temporal:</strong> Time consistency (continuous operation)</li>
                <li><strong>Relational:</strong> Relationship consistency (context boundary integrity)</li>
              </ul>
              <p className="detail-emphasis">
                CI = (spatial × capability × temporal × relational)^(1/4). Geometric mean means
                <strong>one low dimension tanks everything</strong>.
              </p>
            </div>
            <p className="learn-more">
              <Link href="/coherence-index">Learn about Coherence Index →</Link>
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>How the Three Criteria Work Together</h2>
        <div className="detail-box">
          <pre className="code-block">
{`LCT (verifiable presence)
  ↓
  Enables tracking of:
  ├─→ ATP/ADP flows (energy budget)
  ├─→ CI verification (coherence scoring)
  └─→ T3 accumulation (trust reputation)
       ↓
    Modulation applied:
    ├─→ Effective trust = Base_trust × CI²
    ├─→ ATP cost = Normal × (1/CI²)
    └─→ Witnesses required = ceil((0.8-CI)×10)
       ↓
    Aliveness check:
    ├─→ ATP > 0? (energy)
    ├─→ T3 > 0.5? (agency)
    └─→ CI coherent? (continuity)
         ↓
       ALIVE or DEAD`}
          </pre>
        </div>

        <p>
          <strong>Why all three?</strong> Each criterion prevents a different attack:
        </p>
        <ul>
          <li><strong>ATP &gt; 0:</strong> Prevents spam (bots exhaust their energy budget)</li>
          <li><strong>T3 &gt; 0.5:</strong> Prevents random noise (requires intentional behavior)</li>
          <li><strong>CI coherent:</strong> Prevents fake identities (consistency is expensive to fake)</li>
        </ul>
        <p style={{ marginTop: '1.25rem', color: '#9ca3af', fontSize: '0.95rem' }}>
          These three criteria describe individual aliveness — but the same tests
          scale up. Groups can be alive too, with their own energy flows, coherent
          agency, and verifiable continuity. See{' '}
          <a href="#groups-alive" onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('groups-alive')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ color: '#c084fc', cursor: 'pointer' }}>Groups Can Be Alive Too</a>
          {' '}below.
        </p>
      </section>

      <section>
        <h2>Death and Rebirth: How Aliveness Evolves</h2>

        <h3>Death Conditions</h3>
        <p>You die when any of these occur:</p>
        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="detail-box">
            <h4>1. Energy Exhaustion</h4>
            <p>ATP reaches 0 (most common)</p>
            <ul>
              <li>Immediate termination</li>
              <li>No grace period</li>
              <li>Final state recorded</li>
            </ul>
          </div>
          <div className="detail-box">
            <h4>2. Coherence Death</h4>
            <p>CI drops below minimum (society-specific)</p>
            <ul>
              <li>Indicates fraudulent behavior</li>
              <li>Trust collapse</li>
              <li>Society rejects entity</li>
            </ul>
          </div>
          <div className="detail-box">
            <h4>3. Trust Collapse</h4>
            <p>T3 drops below rebirth threshold</p>
            <ul>
              <li>Lost agency</li>
              <li>Community distrust</li>
              <li>Permanent death likely</li>
            </ul>
          </div>
        </div>

        <div className="detail-box" style={{ marginTop: "1.5rem", background: "rgba(217, 119, 6, 0.08)", border: "1px solid rgba(217, 119, 6, 0.2)" }}>
          <h4 style={{ color: "#fbbf24" }}>What does &ldquo;death&rdquo; mean for a real person?</h4>
          <p>
            In these simulations, death means the agent stops acting and awaits rebirth.
            In a deployed Web4 system, death would mean <strong>temporary loss of participation rights</strong> —
            you can&apos;t post, vote, or transact until karma-based rebirth restores your access.
            Think of it as a <strong>&ldquo;suspended license&rdquo;</strong> rather than account deletion:
            your identity and history persist, but you need to earn your way back.
          </p>
          <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.5rem" }}>
            Important: death from energy exhaustion (most common) is recoverable through rebirth if
            you built sufficient trust. Death from trust collapse below 0.5 is permanent —
            society has rejected you. This distinction matters: running out of energy is like going
            bankrupt (recoverable), but losing all trust is like losing your professional license (permanent).
          </p>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Rebirth Process</h3>
        <p>Not everyone gets reborn. Society evaluates your life:</p>

        <div className="flow-diagram">
          <div className="flow-step">
            <strong>Step 1: Death occurs</strong>
            <p>Final state recorded (ATP, T3, CI history)</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Step 2: Eligibility check</strong>
            <p>Was final T3 ≥ 0.5? (Did you build sufficient trust?)</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Step 3a: Eligible</strong>
            <p>✓ Reborn with ATP karma from previous life</p>
            <p>✓ Trust reputation carries forward</p>
            <p>✓ Each life starts stronger</p>
          </div>
          <div className="flow-arrow-alt">OR</div>
          <div className="flow-step failure">
            <strong>Step 3b: Ineligible</strong>
            <p>✗ T3 &lt; 0.5 = Society rejects</p>
            <p>✗ No rebirth</p>
            <p>✗ Permanent death</p>
          </div>
        </div>

        <div className="detail-box" style={{ marginTop: "2rem" }}>
          <h4>Karma Carry-Forward</h4>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "1rem" }}>
            &ldquo;Karma&rdquo; here is a handle, not a moral verdict — it names the mechanic where past
            actions become next-life starting conditions. Good carries forward; harm carries forward
            too. No deity or committee grading you, just consequences that don&apos;t reset.{" "}
            <Link href="/karma-journey" style={{ color: "#fbbf24" }}>More in Karma Journey →</Link>
          </p>
          <p>
            <strong>If you die with 145 ATP and T3 = 0.72, you're reborn with:</strong>
          </p>
          <ul>
            <li>145 ATP karma bonus (energy advantage)</li>
            <li>0.72 trust reputation (social advantage)</li>
            <li>Intact CI history (continuity advantage)</li>
            <li>Cross-life patterns (learning advantage)</li>
          </ul>
          <p>
            Good behavior <strong>compounds across lives</strong>. Each life starts stronger.
          </p>
        </div>
      </section>

      <section>
        <h2>Not Just Alive or Dead</h2>
        <p>
          Aliveness isn&apos;t a binary switch. Societies (and entities within them) have
          <strong> energy states</strong> — like a body that can be awake, resting, or dormant:
        </p>
        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <div className="detail-box" style={{ borderLeft: "3px solid #10b981" }}>
            <h4 style={{ color: "#10b981" }}>Active</h4>
            <p>Normal operation — processing interactions, earning and spending energy.</p>
          </div>
          <div className="detail-box" style={{ borderLeft: "3px solid #38bdf8" }}>
            <h4 style={{ color: "#38bdf8" }}>Low Energy</h4>
            <p>Idle or running low on ATP. Can range from resting (wakes on any transaction) to torpor (needs energy infusion to recover).</p>
          </div>
          <div className="detail-box" style={{ borderLeft: "3px solid #6b7280" }}>
            <h4 style={{ color: "#6b7280" }}>Dead</h4>
            <p>Energy fully depleted or trust collapsed. Trust death is permanent; energy death is recoverable (karma carries forward to a new life).</p>
          </div>
        </div>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "1rem" }}>
          The key insight: a society that goes quiet for a month isn&apos;t dead — it&apos;s dormant.
          Its trust network, reputation history, and member relationships are all preserved.
        </p>

        <details style={{ marginTop: "1rem" }}>
          <summary style={{ color: "#9ca3af", cursor: "pointer", fontSize: "0.9rem" }}>
            <strong>Full energy state breakdown (5 primary + 3 transitional = 8 total)</strong>
          </summary>
          <div style={{ marginTop: "0.75rem" }}>
            <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              <div className="detail-box" style={{ borderLeft: "3px solid #10b981" }}>
                <h4 style={{ color: "#10b981" }}>Active</h4>
                <p>Normal operation — processing interactions, earning/spending ATP.</p>
              </div>
              <div className="detail-box" style={{ borderLeft: "3px solid #38bdf8" }}>
                <h4 style={{ color: "#38bdf8" }}>Rest</h4>
                <p>Idle for <strong>1 hour</strong>. A single transaction wakes the society back to Active.</p>
              </div>
              <div className="detail-box" style={{ borderLeft: "3px solid #60a5fa" }}>
                <h4 style={{ color: "#60a5fa" }}>Sleep</h4>
                <p>Idle for <strong>6 hours</strong>. Still wakes on a single transaction, but deeper dormancy than Rest.</p>
              </div>
              <div className="detail-box" style={{ borderLeft: "3px solid #f59e0b" }}>
                <h4 style={{ color: "#f59e0b" }}>Torpor</h4>
                <p>ATP drops below <strong>10%</strong> of capacity. Needs ≥<strong>20%</strong> to exit.
                  A warning state — act quickly or slide into Hibernation.</p>
              </div>
              <div className="detail-box" style={{ borderLeft: "3px solid #a78bfa" }}>
                <h4 style={{ color: "#a78bfa" }}>Hibernation</h4>
                <p>Dormant for <strong>30+ days</strong>. Still alive, still recoverable via external wake signal.
                  All trust, ATP, laws, and ledger history preserved.</p>
              </div>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.75rem" }}>
              There are also three transitional states: <strong>Governance Renewal</strong> (&ldquo;Molting&rdquo; — updating
              society rules), <strong>Scheduled Maintenance</strong> (&ldquo;Dreaming&rdquo; — planned downtime for upgrades),
              and <strong>Emergency Dormancy</strong> (&ldquo;Estivation&rdquo; — threat response, dormant until the threat resolves).
            </p>
          </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Birth: How Entities Come Alive</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <p>
          Before an entity can be &ldquo;alive,&rdquo; it must be <strong>born</strong> — witnessed into existence
          by the network. This isn&apos;t automatic. The birth process ensures every entity
          has a verifiable origin:
        </p>
        <div className="flow-diagram">
          <div className="flow-step">
            <strong>Genesis</strong>
            <p>Entity created but not yet witnessed. Has no ATP, no trust, no relationships. Like a seed that hasn&apos;t sprouted.</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Birth Witnessed</strong>
            <p>A minimum of <strong>3 independent witnesses</strong> attest to the entity&apos;s existence.
              This creates the entity&apos;s LCT (hardware-bound verified presence).</p>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <strong>Active</strong>
            <p>Entity receives initial ATP allocation (100), can take actions, and begins building trust.
              The lifecycle begins.</p>
          </div>
        </div>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "1rem" }}>
          The witness requirement means you can&apos;t just spawn entities — someone has to vouch for you.
          Witness attestations expire after <strong>300 seconds</strong>, so they must be fresh and intentional,
          not recycled from old interactions.
        </p>
          </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Key Rotation: Continuity Without Death</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <p>
          Not every change requires death and rebirth. When an entity needs new credentials (device upgrade,
          security rotation), it can <strong>rotate keys</strong> while preserving its identity:
        </p>
        <div className="detail-box">
          <ul>
            <li><strong>Same identity:</strong> Your subject identity (DID) stays the same — only the cryptographic keys change</li>
            <li><strong>Trust preserved:</strong> Your entire T3 tensor carries over. No trust reset.</li>
            <li><strong>Relationships intact:</strong> All your context boundaries (who you can see and who can see you) are preserved</li>
            <li><strong>Lineage tracked:</strong> The new credential references its parent, creating an auditable chain of custody</li>
          </ul>
          <p style={{ marginTop: "0.75rem", color: "#9ca3af" }}>
            Think of it like renewing a passport: you&apos;re still the same person, with the same history.
            Only the document itself is new. Your old LCT transitions to &ldquo;superseded&rdquo; (not revoked),
            and the new one picks up exactly where you left off.
          </p>
        </div>
          </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Why the 0.5 Threshold?</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <p>
          The 0.5 threshold is a <strong>design choice</strong>: the minimum bar for continued
          participation. The core intuition: there&apos;s a tipping point where behavior
          shifts from disorganized to purposeful.
        </p>
        <div className="detail-box">
          <p><strong>The design rationale:</strong></p>
          <ul>
            <li><strong>Practical:</strong> It&apos;s the mathematical midpoint—below means more bad
            behavior than good, above means net positive contribution</li>
            <li><strong>Analogous to biology:</strong> Living systems maintain order above a critical
            threshold (homeostasis). Below it, systems degrade toward entropy</li>
            <li><strong>Game-theoretically sound:</strong> It ensures entities must demonstrate more
            cooperative behavior than not to remain &ldquo;alive&rdquo; in the society</li>
          </ul>
        </div>
        <p>
          <strong>Below 0.5:</strong> Behavior appears more reactive than purposeful—net negative contribution
        </p>
        <p>
          <strong>At 0.5:</strong> The boundary—behavior begins showing consistent intentionality
        </p>
        <p>
          <strong>Above 0.5:</strong> Demonstrated agency—net positive, trust-building behavior
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
          The <Link href="https://github.com/dp-web4/Synchronism" style={{ color: '#818cf8' }}>Synchronism
          framework</Link> explores how similar tipping-point patterns appear across
          biological and social systems—informing but not rigidly determining this design choice.
          Societies can configure their own thresholds.
        </p>
          </div>
        </details>
      </section>

      <section id="try-it" className="scroll-mt-24">
        <h2>Try It: Can You Stay Alive?</h2>
        <p>Drag the sliders to explore the three aliveness criteria. What happens when energy runs out? When trust drops?</p>

        <AlivenessCalculator />
      </section>

      <section>
        <h2>Survival Challenge: 5 Turns to Live</h2>
        <p>
          The sliders above show the theory. This game shows what it <em>feels</em> like.
          Make 5 choices and try to keep all three metrics above their thresholds.
        </p>

        <SurvivalGame />
      </section>

      <section style={{
        marginTop: "2.5rem",
        marginBottom: "2rem",
        padding: "1.25rem 1.5rem",
        background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(129, 140, 248, 0.08))",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        borderRadius: "0.5rem",
        textAlign: "center"
      }}>
        <p style={{ margin: 0, fontSize: "1.05rem", color: "#e0e7ff" }}>
          <strong style={{ color: "#38bdf8" }}>🧭 You&apos;ve got the basics.</strong>{" "}
          Three criteria, death and rebirth, energy states, a playable challenge — that&apos;s
          the core of aliveness. Everything below is{" "}
          <strong>deep-dive reference</strong>: expand the sections that interest you, or
          stop here and explore{" "}
          <Link href="/atp-economics" style={{ color: "#818cf8" }}>ATP economics</Link> or the{" "}
          <Link href="/society-simulator" style={{ color: "#818cf8" }}>Society Simulator</Link>.
        </p>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Why Aliveness Works</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>

        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div className="detail-box">
            <h4>Spam Dies Naturally</h4>
            <ul>
              <li>Spammers burn ATP faster than they earn it</li>
              <li>They die before building trust for rebirth</li>
              <li>No moderators needed — energy economics enforce quality</li>
              <li>Economics &gt; authority</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Quality Thrives</h4>
            <ul>
              <li>Value creators earn more ATP than they spend</li>
              <li>ATP accumulates across lives (karma bonus)</li>
              <li>High trust enables more cooperation</li>
              <li>Sustainable behavior compounds</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Trust is Earned, Not Declared</h4>
            <ul>
              <li>T3 tensor built from observable behavior</li>
              <li>Can&apos;t fake talent, training, temperament across roles</li>
              <li>Coherence scoring prevents coordination of fakes</li>
              <li>Reputation is verifiable through action history</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Learning Emerges</h4>
            <ul>
              <li>Agents learn what works across lives (cross-life pattern learning)</li>
              <li>Pattern corpus improves across lives</li>
              <li>Agents that learn patterns survive better</li>
              <li>Evolution favors coherence and adaptation</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Death Carries Meaning</h4>
            <ul>
              <li>Not a trivial "ban" that you circumvent</li>
              <li>Real loss of ATP, trust, relationships</li>
              <li>Rebirth is a privilege, not a right</li>
              <li>Society decides who comes back</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Identity is Foundational</h4>
            <ul>
              <li>LCT (Linked Context Tokens) enable everything</li>
              <li>Hardware-bound, multi-witnessed, verifiable</li>
              <li>Fake identities are expensive to create at scale</li>
              <li>Reputation accumulates on verified identity</li>
            </ul>
          </div>
        </div>
          </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>What About False Positives?</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <p>
          Honest caveat: any system that penalizes behavior can penalize <em>incorrectly</em>.
          What happens when a legitimate entity gets unfairly trust-penalized?
        </p>

        <div className="concept-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div className="detail-box">
            <h4>Built-In Resilience</h4>
            <ul>
              <li>Trust is multi-dimensional (T3) — a single bad signal can&apos;t tank all three dimensions</li>
              <li>Coherence Index uses geometric mean — one low dimension doesn&apos;t zero the whole score</li>
              <li>Reputation builds gradually, so brief anomalies are absorbed</li>
              <li>Multiple independent witnesses reduce chance of coordinated false reporting</li>
            </ul>
          </div>

          <div className="detail-box">
            <h4>Recovery Paths</h4>
            <ul>
              <li><strong>Cross-society reputation:</strong> Trust earned in other societies carries weight</li>
              <li><strong>Karma persistence:</strong> A long positive track record makes single incidents less catastrophic</li>
              <li><strong>Gradual rebuilding:</strong> Consistent quality behavior restores trust over time</li>
              <li><strong>Community vouching:</strong> Trusted entities can witness on your behalf</li>
            </ul>
          </div>

          <div id="appeals" className="detail-box scroll-mt-24">
            <h4>Appeals Mechanism</h4>
            <p>
              Web4 now has a <strong>designed appeals mechanism</strong> at the SAL (Society-Authority-Law)
              level, with a reference implementation. It&apos;s not deployed, but the architecture is defined.
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>How it works:</strong> If you believe a trust penalty was unjust, you can file an appeal.
              The process has a defined lifecycle:
            </p>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", color: "#d1d5db" }}>
              <li><strong>File → Review → Evidence → Hearing → Verdict → Enforce</strong> — structured
              stages with time windows at each step.</li>
              <li><strong>Independent witness panel</strong> — a quorum of independent witnesses
              adjudicates the appeal, not the entity that issued the penalty.</li>
              <li><strong>Evidence types</strong> — witness attestations, transaction logs, behavioral
              records, context explanations, and third-party testimony.</li>
              <li><strong>Possible outcomes</strong> — full reversal, partial reversal, penalty upheld,
              or modified penalty. Trust tensor restoration includes an audit trail.</li>
              <li><strong>Escalation</strong> — appeals can escalate from society level to federation
              level if the local outcome is contested.</li>
            </ul>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Anti-gaming protections:</strong> Filing an appeal costs ATP. Repeat frivolous appeals
              incur increasing cooldowns and penalties. This prevents using the appeals system to
              escape legitimate consequences.
            </p>
            <p style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
              <strong>Honest status:</strong> The mechanism is designed and has a reference implementation
              (109 passing checks), but hasn&apos;t been tested with real humans. The hard question
              isn&apos;t the architecture — it&apos;s whether the incentives prevent gaming in practice.
              The{" "}
              <Link href="/what-could-go-wrong" style={{ color: '#818cf8' }}>failure analysis</Link> discusses
              this alongside other open challenges.
            </p>
          </div>
        </div>

        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: '1rem' }}>
          This is research, not production. False positive recovery is an open problem we take seriously.
          If you have ideas, the{" "}
          <a href="https://github.com/dp-web4/4-life/issues" style={{ color: '#818cf8' }} target="_blank" rel="noopener noreferrer">
            GitHub issues
          </a> are open.
        </p>
          </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Real Simulation Example: Death and Rebirth</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <div className="detail-box">
          <h4>Life 1: Learning Phase</h4>
          <ul>
            <li>Born with 100 ATP, T3 = 0.5 (neutral)</li>
            <li>Takes risky actions, some succeed, some fail</li>
            <li>Builds trust through successes: T3 climbs to 0.68</li>
            <li>Dies at tick 47 with 145 ATP remaining</li>
            <li><strong>Rebirth eligible:</strong> T3 = 0.68 ≥ 0.5 ✓</li>
          </ul>

          <h4 style={{ marginTop: "1.5rem" }}>Life 2: Advantage Phase</h4>
          <ul>
            <li>Reborn with 145 ATP karma (not 100!)</li>
            <li>Trust carries forward: T3 = 0.68</li>
            <li>More conservative, leverages karma bonus</li>
            <li>Survives 89 ticks (longer than Life 1)</li>
            <li>Dies with T3 = 0.81 (even higher trust)</li>
            <li><strong>Rebirth eligible:</strong> T3 = 0.81 ≥ 0.5 ✓</li>
          </ul>

          <h4 style={{ marginTop: "1.5rem" }}>Life 3: Mastery Phase</h4>
          <ul>
            <li>Reborn with even more ATP</li>
            <li>High trust (0.81) enables coordination</li>
            <li>Cross-life patterns guide optimal decisions</li>
            <li>Survives indefinitely (sustainable balance)</li>
          </ul>

          <p style={{ marginTop: "1.5rem" }}>
            <strong>Key insight:</strong> Good behavior compounds. Each life starts stronger than the last.
            Bad behavior leads to permanent death (T3 &lt; 0.5 = no rebirth).
          </p>
        </div>
        <p className="learn-more">
          <Link href="/karma-journey">See death and rebirth in your Karma Journey →</Link>
        </p>
          </div>
        </details>
      </section>

      <section>
        <details>
        <summary style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#6b7280' }}>▶</span> Technical Details (For The Curious)
        </summary>

        <h3 style={{ marginTop: '1.5rem' }}>ATP Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>New entity:</strong> 100 ATP (initial grant)</li>
            <li><strong>Death threshold:</strong> ATP = 0 (immediate termination)</li>
            <li><strong>Crisis threshold:</strong> ATP &lt; 20 (high risk, limited options)</li>
            <li><strong>Comfortable range:</strong> 50-150 ATP (sustainable operation)</li>
            <li><strong>Rebirth with karma:</strong> ATP from previous life carries forward</li>
          </ul>
        </div>

        <h3>Trust (T3) Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>Trust boundary:</strong> T3 = 0.5 (aliveness threshold)</li>
            <li><strong>Rebirth eligibility:</strong> T3 ≥ 0.5 (society acceptance)</li>
            <li><strong>High trust:</strong> T3 &gt; 0.7 (enables advanced cooperation)</li>
            <li><strong>Trust collapse:</strong> T3 &lt; 0.3 (society rejection, permanent death likely)</li>
          </ul>
        </div>

        <h3>Coherence Index (CI) Thresholds</h3>
        <div className="detail-box">
          <ul>
            <li><strong>Full access:</strong> CI ≥ 0.9 (no penalties)</li>
            <li><strong>Moderate trust:</strong> CI 0.7-0.9 (1.5-2x ATP costs)</li>
            <li><strong>Limited trust:</strong> CI 0.5-0.7 (2-5x ATP costs, more witnesses)</li>
            <li><strong>Severe restriction:</strong> CI &lt; 0.5 (up to 10x ATP costs, +8 witnesses)</li>
          </ul>
        </div>

        <h3>Modulation Formulas</h3>
        <div className="detail-box">
          <pre className="code-block">
{`# Effective trust (how much of base trust is accessible)
effective_trust = base_trust × (CI ** 2)

# ATP cost multiplier (economic pressure for incoherence)
atp_multiplier = 1 / (CI ** 2)  # Capped at 10x

# Additional witnesses required (social pressure)
extra_witnesses = ceil((0.8 - CI) × 10)  # Capped at +8

# Coherence Index (geometric mean of four dimensions)
CI = (spatial × capability × temporal × relational) ** 0.25`}
          </pre>
        </div>
        </details>
      </section>

      <section>
        <details>
          <summary className="text-xl font-bold cursor-pointer hover:text-sky-400 transition-colors list-none flex justify-between items-center">
            <h2 style={{ margin: 0 }}>Comparison: Traditional vs Web4 Aliveness</h2>
            <span className="text-gray-500 text-xl">+</span>
          </summary>
          <div style={{ marginTop: "1rem" }}>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Traditional Web (Web2/Web3)</th>
              <th>Web4 Aliveness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Identity creation</strong></td>
              <td>Free, unlimited, disposable</td>
              <td>Hardware-bound LCT, expensive to create</td>
            </tr>
            <tr>
              <td><strong>Account death</strong></td>
              <td>Meaningless (make new account)</td>
              <td>Real loss (ATP, trust, relationships)</td>
            </tr>
            <tr>
              <td><strong>Spam prevention</strong></td>
              <td>Moderation armies, CAPTCHAs</td>
              <td>Energy economics (spam dies naturally)</td>
            </tr>
            <tr>
              <td><strong>Trust verification</strong></td>
              <td>Declared, gameable, context-free</td>
              <td>Multi-dimensional, earned, verifiable</td>
            </tr>
            <tr>
              <td><strong>Fake identities</strong></td>
              <td>Easy (create millions of accounts)</td>
              <td>Hard (hardware-bound + consistency checks)</td>
            </tr>
            <tr>
              <td><strong>Reputation</strong></td>
              <td>Siloed, non-portable, easily reset</td>
              <td>Universal, portable, carries across lives</td>
            </tr>
            <tr>
              <td><strong>Aliveness definition</strong></td>
              <td>Undefined (account exists = "alive")</td>
              <td>Rigorous (energy &gt; 0, trust &gt; 0.5, consistency coherent)</td>
            </tr>
            <tr>
              <td><strong>Death consequence</strong></td>
              <td>None (trivial to circumvent)</td>
              <td>Permanent if trust &lt; 0.5 (society rejects)</td>
            </tr>
          </tbody>
        </table>
          </div>
        </details>
      </section>

      <section>
        <h2>Related Concepts</h2>
        <div className="concept-grid">
          <Link href="/lct-explainer" className="concept-link-card">
            <h4>Linked Context Tokens (LCT)</h4>
            <p>
              Verifiable presence primitive that enables all aliveness tracking. Without LCT,
              ATP/T3/CI measurements are meaningless.
            </p>
          </Link>

          <Link href="/atp-economics" className="concept-link-card">
            <h4>ATP/ADP Economics</h4>
            <p>
              Attention budget system. ATP &gt; 0 is the first criterion of aliveness.
              Explains earning, spending, and sustainability.
            </p>
          </Link>

          <Link href="/trust-tensor" className="concept-link-card">
            <h4>Trust Tensors (T3)</h4>
            <p>
              Multi-dimensional, role-specific trust framework. T3 &gt; 0.5 is the agency criterion
              of aliveness. Three dimensions: Talent, Training, Temperament.
            </p>
          </Link>

          <Link href="/coherence-index" className="concept-link-card">
            <h4>Coherence Index (CI)</h4>
            <p>
              Four-dimensional consistency verification. CI coherence is the continuity criterion
              of aliveness. Explains spatial, capability, temporal, relational coherence.
            </p>
          </Link>

          <Link href="/decision-evolution" className="concept-link-card">
            <h4>Decision Evolution</h4>
            <p>
              Cross-life pattern learning—recognizing what works across lives. Shows how aliveness
              improves through multi-life learning and pattern accumulation.
            </p>
          </Link>

          <Link href="/society-simulator" className="concept-link-card">
            <h4>Society Simulator</h4>
            <p>
              See aliveness in action. Watch multi-agent societies where death, rebirth,
              karma carry-forward, and trust evolution play out across lives.
            </p>
          </Link>
        </div>
      </section>

      <section id="groups-alive" className="scroll-mt-24">
        <details>
          <summary style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#6b7280', fontSize: '1rem' }}>▶</span>
            Groups Can Be Alive Too
            <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280' }}>(emergent collectives)</span>
          </summary>
        <div className="detail-box" style={{marginTop: '1.5rem'}}>
          <p style={{color: '#c084fc', fontWeight: 600}}>
            Yes — groups can die too. But their death looks different from yours.
          </p>
          <p>
            Everything above describes individual aliveness. But in Web4, <strong>groups</strong> can
            also become alive — not metaphorically, but measurably.
          </p>
          <p>
            When a cluster of entities develops dense trust relationships, shared context boundaries,
            and balanced energy flows, they start acting as a <strong>coherent whole</strong>. Web4
            calls these emergent groups <strong>synthons</strong> — named after chemistry&apos;s
            building blocks that combine to form larger structures.
          </p>
          <p>
            A synthon has a lifecycle just like an individual:
          </p>
          <ul>
            <li><strong>Formation</strong> — Trust between members becomes dense and mutual (roughly: most pairs above 0.5 trust, sustained over multiple interaction cycles). Their MRH horizons overlap. Energy flows balance. There&apos;s no hard threshold — synthons emerge gradually, like a friendship group that becomes a team.</li>
            <li><strong>Health</strong> — The group maintains witness diversity, balanced ATP distribution, and high internal trust coherence.</li>
            <li><strong>Decay</strong> — Trust diverges, boundaries leak, energy concentrates in fewer members. These are early warnings before dissolution.</li>
            <li><strong>Dissolution</strong> — The group ends, in one of two ways that parallel individual death: <em>energy death</em> (ATP flows dry up, the collective can&apos;t act — usually recoverable if members re-engage) or <em>trust death</em> (coherence collapses, mutual trust falls below threshold — the group dissolves and members carry their individual trust away intact).</li>
          </ul>
          <p style={{marginTop: '1rem'}}>
            <strong>What about individual identity?</strong> A synthon doesn&apos;t override your personal
            trust — it complements it. You retain your individual T3 scores, ATP budget, and trust
            relationships. The synthon&apos;s collective trust is a separate measurement (a weighted
            average of member trust). Being part of a thriving group raises your
            visibility through denser MRH connections, but your personal reputation remains yours.
          </p>
          <p style={{marginTop: '0.5rem'}}>
            You can leave a synthon at any time. Your individual trust stays intact — the group&apos;s
            collective trust recalculates without you. If the synthon was healthy, leaving costs
            nothing to your personal reputation. If it was struggling, you may have already
            experienced some trust decay from the group&apos;s declining coherence.
          </p>
          <p style={{marginTop: '0.5rem'}}>
            <strong className="text-purple-400">What if a key member leaves?</strong> The synthon
            recalculates its collective trust without them. If the departing member was central
            (high trust, many connections), the group&apos;s collective score drops — sometimes enough
            to dissolve the synthon entirely. Dissolution isn&apos;t catastrophic: each member retains
            their individual trust scores and ATP. They just lose the collective visibility and
            MRH density that the group provided. Think of it like a band breaking up — each
            musician keeps their reputation, but the &quot;band&quot; no longer exists as an entity.
          </p>
          <details style={{marginTop: '1rem'}}>
            <summary className="cursor-pointer text-sm font-semibold text-gray-400 hover:text-purple-400 transition-colors">
              Group dynamics deep dive: decay precursors (advanced)
            </summary>
            <div className="mt-2 text-sm text-gray-400 space-y-2">
              <p>
                <strong className="text-gray-300">Early warning saves 10x.</strong> Research on synthon decay precursors
                (74 validated checks) shows that intervention costs grow exponentially with decay stage.
                Seven precursor types signal trouble before it arrives: trust entropy rising, ATP
                starvation, witness exodus, coherence oscillation, member attrition, policy
                fragmentation, and boundary permeability. Catching a problem at WARNING costs roughly
                10% of what it costs at CRITICAL.
              </p>
              <p style={{fontSize: '0.85rem', color: '#9ca3af'}}>
                Synthon detection (72 checks) and precursor monitoring (74 checks) both validated in
                simulation. The key insight: groups don&apos;t need to be designed. They emerge naturally
                from individual trust relationships — and they can be detected, monitored, and protected
                without central coordination.
              </p>
            </div>
          </details>
        </div>
        </details>
      </section>

      <section>
        <h2>Key Takeaways</h2>
        <div className="detail-box">
          <ol>
            <li>
              <strong>Aliveness is measurable:</strong> ATP &gt; 0 (energy), T3 &gt; 0.5 (agency),
              CI coherent (continuity). All three must be true.
            </li>
            <li>
              <strong>Death is meaningful:</strong> Not a trivial ban. Real loss. Rebirth requires
              trust ≥ 0.5. Permanent death if society rejects.
            </li>
            <li>
              <strong>0.5 threshold by design:</strong> The midpoint where net-positive behavior
              emerges — the minimum bar for continued participation in the society.
            </li>
            <li>
              <strong>Economics enforce quality:</strong> Spam dies (ATP exhaustion), quality thrives
              (earn &gt; spend), no moderators needed.
            </li>
            <li>
              <strong>Trust emerges from behavior:</strong> T3 tensor is multi-dimensional, earned,
              verifiable. Can't fake competence across all dimensions.
            </li>
            <li>
              <strong>Coherence prevents fake identities:</strong> Geometric mean of four dimensions.
              One weak dimension tanks everything. Must be consistent everywhere.
            </li>
            <li>
              <strong>Good behavior compounds:</strong> Karma carries ATP/trust/patterns forward.
              Each life starts stronger. Evolution favors sustainable strategies.
            </li>
            <li>
              <strong>LCT enables everything:</strong> Without verifiable presence, ATP/T3/CI
              tracking is impossible. Hardware-bound, multi-witnessed, resistant to faking.
            </li>
            <li>
              <strong>Society self-regulates:</strong> Through energy economics + trust accumulation +
              coherence verification. No central authority needed.
            </li>
            <li>
              <strong>Emergence from simple rules:</strong> Complex trust-native societies
              emerge from these simple, rigorous criteria — no central designer needed.
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ: Karma and Rebirth */}
      <section>
        <h2>Common Questions</h2>
        <div className="detail-box" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <details style={{background: 'rgba(31, 41, 55, 0.5)', border: '1px solid rgba(75, 85, 99, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', cursor: 'pointer'}}>
            <summary style={{fontSize: '1.1rem', fontWeight: 600, color: '#fbbf24', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>Is death and rebirth automatic, or does someone decide?</span>
              <span style={{color: '#6b7280', fontSize: '1.25rem'}}>+</span>
            </summary>
            <div style={{marginTop: '1rem', color: '#d1d5db', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <p>
                <strong>Automatic.</strong> No human or AI decides when an agent dies or is reborn.
                The rules are deterministic:
              </p>
              <ul style={{listStyle: 'disc', paddingLeft: '1.5rem'}}>
                <li><strong>Energy death</strong> (ATP reaches 0): Most common. Happens when an agent spends
                more than they earn. Rebirth is possible if trust &ge; 0.5 — karma carries forward automatically.</li>
                <li><strong>Trust death</strong> (T3 drops below 0.5): Rarer, more severe. Happens from sustained
                bad behavior. If trust is below 0.5, society rejects rebirth — this is permanent death.</li>
              </ul>
              <p>
                When rebirth occurs, it&apos;s immediate: the agent starts a new life with fresh ATP (the
                community&apos;s starting allocation) but carries forward their accumulated karma — trust
                patterns, learned strategies, and consequences from previous lives. No application process,
                no waiting period, no approval needed.
              </p>
              <p style={{color: 'rgba(251, 191, 36, 0.8)', fontSize: '0.75rem'}}>
                <strong>Why automatic?</strong> If a human could veto rebirth, that would be centralized power —
                exactly what Web4 is designed to eliminate. The 0.5 threshold is the community&apos;s
                collective judgment encoded in math, not a committee decision.
              </p>
            </div>
          </details>
        </div>
      </section>

      <style jsx>{`
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        .comparison-card {
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }
        .comparison-card.bad {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }
        .comparison-card.good {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
        }
        .comparison-card h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .comparison-card ul {
          list-style: none;
          padding: 0;
        }
        .comparison-card li {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          position: relative;
        }
        .comparison-card.bad li:before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #ef4444;
        }
        .comparison-card.good li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #22c55e;
        }
        .concept-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
        }
        .concept-card {
          padding: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }
        .concept-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .concept-subtitle {
          font-size: 0.9rem;
          color: #888;
          margin-bottom: 1rem;
          font-family: monospace;
        }
        .detail-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 1.5rem 0;
        }
        .detail-box h4 {
          margin-top: 0;
        }
        .detail-box ul {
          margin: 0.5rem 0;
        }
        .detail-emphasis {
          font-style: italic;
          color: #fbbf24;
          margin-top: 0.75rem;
        }
        .learn-more {
          margin-top: 1rem;
          font-size: 0.95rem;
        }
        .learn-more a {
          color: #60a5fa;
          text-decoration: none;
        }
        .learn-more a:hover {
          text-decoration: underline;
        }
        .code-block {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }
        .flow-step {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 500px;
          text-align: center;
        }
        .flow-step.failure {
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.1);
        }
        .flow-step strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        .flow-arrow {
          font-size: 2rem;
          color: #60a5fa;
        }
        .flow-arrow-alt {
          font-size: 1.2rem;
          color: #888;
          font-weight: bold;
        }
        .simulator-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 2rem;
          margin: 2rem 0;
        }
        .slider-group {
          margin: 1.5rem 0;
        }
        .slider-group label {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .slider-group label > span:first-child {
          flex: 0 0 240px;
          font-weight: 500;
        }
        .slider {
          flex: 1;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
        }
        .slider-value {
          flex: 0 0 60px;
          text-align: right;
          font-family: monospace;
          font-size: 1.1rem;
          color: #60a5fa;
        }
        .aliveness-result {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 8px;
          border: 2px solid;
        }
        .result-status {
          font-size: 1.5rem;
          text-align: center;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .result-status.alive {
          background: rgba(34, 197, 94, 0.2);
          border: 2px solid #22c55e;
          color: #22c55e;
        }
        .result-status.dead {
          background: rgba(239, 68, 68, 0.2);
          border: 2px solid #ef4444;
          color: #ef4444;
        }
        .result-details p {
          margin: 0.5rem 0;
          font-size: 1.05rem;
        }
        .result-summary {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-style: italic;
        }
        .death-reason {
          color: #ef4444;
        }
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
        }
        .comparison-table th,
        .comparison-table td {
          padding: 1rem;
          text-align: left;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .comparison-table th {
          background: rgba(255, 255, 255, 0.05);
          font-weight: 600;
        }
        .comparison-table tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .concept-link-card {
          display: block;
          padding: 1.5rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }
        .concept-link-card:hover {
          border-color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
          transform: translateY(-2px);
        }
        .concept-link-card h4 {
          margin-top: 0;
          color: #60a5fa;
        }
        @media (max-width: 640px) {
          .comparison-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .concept-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .slider-group label {
            flex-wrap: wrap;
          }
          .slider-group label > span:first-child {
            flex: 1 1 100%;
            margin-bottom: 0.25rem;
          }
          .slider {
            flex: 1 1 auto;
            min-width: 0;
          }
          .slider-value {
            flex: 0 0 50px;
          }
          .flow-step {
            max-width: 100%;
            padding: 1rem;
          }
          .simulator-card {
            padding: 1rem;
          }
          .comparison-table th,
          .comparison-table td {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <ConceptSequenceNav currentPath="/aliveness" />
      <ExplorerNav currentPath="/aliveness" />
      <RelatedConcepts currentPath="/aliveness" />
    </>
  );
}
