'use client';

/**
 * Human Player Mode Component for Society Simulator
 *
 * Enables humans to BE an agent in the society simulation,
 * making real-time decisions about cooperation vs defection.
 *
 * Core insight: "Participation creates understanding"
 * By making choices and experiencing consequences, humans
 * develop intuition for trust dynamics that observation alone
 * cannot provide.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  SocietyEngine,
  SOCIETY_PRESETS,
  STRATEGY_COLORS,
  STRATEGY_LABELS,
  type AgentSnapshot,
  type Coalition,
  type SocietyMetrics,
  type SocietyEvent,
  type Interaction,
  type HumanDecisionContext,
  type HumanPlayerFrame,
  type StrategyType,
} from '@/lib/simulation/society-engine';

// ============================================================================
// Types
// ============================================================================

interface HumanPlayerModeProps {
  onExit: () => void;
}

interface GameState {
  phase: 'setup' | 'playing' | 'decision' | 'result' | 'game_over';
  currentEpoch: number;
  currentRound: number;
  totalInteractions: number;
  decisionContext: HumanDecisionContext | null;
  lastInteraction: Interaction | null;
  gameResult: HumanPlayerFrame['gameResult'] | null;
  message: string;
}

// ============================================================================
// Decision Panel Component
// ============================================================================

function DecisionPanel({
  context,
  onDecision,
  agents,
}: {
  context: HumanDecisionContext;
  onDecision: (action: 'cooperate' | 'defect') => void;
  agents: AgentSnapshot[];
}) {
  const partner = context.partner;
  const historyWithPartner = context.interactionHistory;

  // Calculate partner's behavior pattern
  const partnerCoopRate = historyWithPartner.length > 0
    ? historyWithPartner.filter(h => h.partnerAction === 'cooperate').length / historyWithPartner.length
    : null;

  // Predict partner behavior based on their strategy
  const getPartnerPrediction = () => {
    switch (partner.strategy) {
      case 'cooperator':
        return { text: 'Will almost certainly cooperate', confidence: 'high', likely: 'cooperate' as const };
      case 'defector':
        return { text: 'Will almost certainly defect', confidence: 'high', likely: 'defect' as const };
      case 'reciprocator':
        const lastAction = historyWithPartner.length > 0 ? historyWithPartner[historyWithPartner.length - 1].playerAction : 'cooperate';
        return { text: `Will mirror your last action (${lastAction})`, confidence: 'medium', likely: lastAction as 'cooperate' | 'defect' };
      case 'cautious':
        return { text: context.trustFromPartner > 0.4 ? 'Will likely cooperate (trusts you)' : 'Will likely defect (wary of you)', confidence: 'medium', likely: context.trustFromPartner > 0.4 ? 'cooperate' as const : 'defect' as const };
      case 'adaptive':
        return { text: 'Unpredictable - depends on trust level', confidence: 'low', likely: context.trustFromPartner > 0.5 ? 'cooperate' as const : 'defect' as const };
      default:
        return { text: 'Unknown strategy', confidence: 'low', likely: 'cooperate' as const };
    }
  };

  const prediction = getPartnerPrediction();

  return (
    <div className="bg-gradient-to-br from-teal-900/30 to-gray-900 border-2 border-teal-500/50 rounded-xl p-6 mb-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-teal-400 mb-2">Your Turn</h2>
        <p className="text-gray-300">
          You're interacting with <span className="font-bold text-white">{partner.name}</span>
        </p>
      </div>

      {/* Partner Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Partner Profile */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: STRATEGY_COLORS[partner.strategy] }}
            >
              {partner.name[0]}
            </div>
            <div>
              <div className="font-bold text-white">{partner.name}</div>
              <div className="text-sm" style={{ color: STRATEGY_COLORS[partner.strategy] }}>
                {STRATEGY_LABELS[partner.strategy]}
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Their ATP:</span>
              <span className="text-white">{partner.atp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Coalition size:</span>
              <span className="text-white">{partner.coalitionSize}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reputation:</span>
              <span className="text-white">{(partner.reputation * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Trust Relationship */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="font-bold text-white mb-3">Trust Relationship</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">You trust them:</span>
                <span className="text-white">{(context.trustInPartner * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all"
                  style={{ width: `${context.trustInPartner * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">They trust you:</span>
                <span className="text-white">{(context.trustFromPartner * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={{ width: `${context.trustFromPartner * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History with this partner */}
      {historyWithPartner.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-white mb-2">Previous Interactions</h4>
          <div className="flex flex-wrap gap-2">
            {historyWithPartner.slice(-5).map((h, i) => (
              <div
                key={i}
                className={`px-2 py-1 rounded text-xs ${
                  h.outcome === 'mutual_cooperation' ? 'bg-green-900/50 text-green-300' :
                  h.outcome === 'mutual_defection' ? 'bg-red-900/50 text-red-300' :
                  h.playerAction === 'defect' ? 'bg-yellow-900/50 text-yellow-300' :
                  'bg-red-900/50 text-red-300'
                }`}
              >
                You: {h.playerAction[0].toUpperCase()} / Them: {h.partnerAction[0].toUpperCase()}
              </div>
            ))}
          </div>
          {partnerCoopRate !== null && (
            <p className="text-sm text-gray-400 mt-2">
              They've cooperated with you {(partnerCoopRate * 100).toFixed(0)}% of the time
            </p>
          )}
        </div>
      )}

      {/* Prediction */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-white mb-2">Partner Analysis</h4>
        <p className="text-sm text-gray-300">
          <span className={`font-bold ${prediction.likely === 'cooperate' ? 'text-green-400' : 'text-red-400'}`}>
            {prediction.text}
          </span>
          <span className="text-gray-500 ml-2">({prediction.confidence} confidence)</span>
        </p>
      </div>

      {/* Outcome Preview */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <h4 className="font-bold text-green-400 mb-2">If You Cooperate</h4>
          <div className="text-sm space-y-1">
            <p className="text-gray-300">
              If they cooperate: <span className="text-green-400">+{context.potentialOutcomes.cooperate.ifPartnerCooperates.atpChange} ATP</span>, trust +{(context.potentialOutcomes.cooperate.ifPartnerCooperates.trustChange * 100).toFixed(0)}%
            </p>
            <p className="text-gray-300">
              If they defect: <span className="text-red-400">{context.potentialOutcomes.cooperate.ifPartnerDefects.atpChange} ATP</span>, trust {(context.potentialOutcomes.cooperate.ifPartnerDefects.trustChange * 100).toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
          <h4 className="font-bold text-red-400 mb-2">If You Defect</h4>
          <div className="text-sm space-y-1">
            <p className="text-gray-300">
              If they cooperate: <span className="text-yellow-400">+{context.potentialOutcomes.defect.ifPartnerCooperates.atpChange} ATP</span>, trust {(context.potentialOutcomes.defect.ifPartnerCooperates.trustChange * 100).toFixed(0)}%
            </p>
            <p className="text-gray-300">
              If they defect: <span className="text-red-400">{context.potentialOutcomes.defect.ifPartnerDefects.atpChange} ATP</span>, trust {(context.potentialOutcomes.defect.ifPartnerDefects.trustChange * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onDecision('cooperate')}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105"
        >
          Cooperate
        </button>
        <button
          onClick={() => onDecision('defect')}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105"
        >
          Defect
        </button>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        Epoch {context.epoch + 1} • Round {context.round + 1}
      </p>
    </div>
  );
}

// ============================================================================
// Result Panel Component
// ============================================================================

function ResultPanel({
  interaction,
  humanAgentId,
  agents,
  onContinue,
}: {
  interaction: Interaction;
  humanAgentId: number;
  agents: AgentSnapshot[];
  onContinue: () => void;
}) {
  const isPlayer1 = interaction.agent1Id === humanAgentId;
  const playerAction = isPlayer1 ? interaction.agent1Action : interaction.agent2Action;
  const partnerAction = isPlayer1 ? interaction.agent2Action : interaction.agent1Action;
  const playerAtpChange = isPlayer1 ? interaction.agent1AtpChange : interaction.agent2AtpChange;
  const partnerId = isPlayer1 ? interaction.agent2Id : interaction.agent1Id;
  const partner = agents.find(a => a.id === partnerId);

  const outcomeMessage = (() => {
    if (playerAction === 'cooperate' && partnerAction === 'cooperate') {
      return { text: 'Mutual Cooperation!', color: 'text-green-400', emoji: '🤝' };
    } else if (playerAction === 'defect' && partnerAction === 'defect') {
      return { text: 'Mutual Defection', color: 'text-red-400', emoji: '💥' };
    } else if (playerAction === 'defect' && partnerAction === 'cooperate') {
      return { text: 'You Exploited Them', color: 'text-yellow-400', emoji: '😈' };
    } else {
      return { text: 'They Exploited You', color: 'text-red-400', emoji: '😢' };
    }
  })();

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{outcomeMessage.emoji}</div>
        <h3 className={`text-xl font-bold ${outcomeMessage.color}`}>{outcomeMessage.text}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-gray-400 text-sm">You chose</div>
          <div className={`font-bold ${playerAction === 'cooperate' ? 'text-green-400' : 'text-red-400'}`}>
            {playerAction.toUpperCase()}
          </div>
        </div>
        <div className="text-center">
          <div className="text-gray-400 text-sm">{partner?.name || 'Partner'} chose</div>
          <div className={`font-bold ${partnerAction === 'cooperate' ? 'text-green-400' : 'text-red-400'}`}>
            {partnerAction.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <span className={`text-lg font-bold ${playerAtpChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {playerAtpChange >= 0 ? '+' : ''}{playerAtpChange} ATP
        </span>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================================
// Game Over Panel
// ============================================================================

function GameOverPanel({
  result,
  onPlayAgain,
  onExit,
}: {
  result: NonNullable<HumanPlayerFrame['gameResult']>;
  onPlayAgain: () => void;
  onExit: () => void;
}) {
  const survived = result.survived;

  return (
    <div className={`border-2 rounded-xl p-8 text-center ${
      survived ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'
    }`}>
      <div className="text-6xl mb-4">{survived ? '🎉' : '💀'}</div>
      <h2 className={`text-3xl font-bold mb-4 ${survived ? 'text-green-400' : 'text-red-400'}`}>
        {survived ? 'You Survived!' : 'Game Over'}
      </h2>

      {survived ? (
        <p className="text-gray-300 mb-6">
          You navigated the society successfully, building trust and managing your resources.
        </p>
      ) : (
        <p className="text-gray-300 mb-6">
          Your ATP ran out. In Web4, this means metabolic death.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Final ATP</div>
          <div className="text-2xl font-bold text-white">{result.finalATP}</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Final Reputation</div>
          <div className="text-2xl font-bold text-white">{(result.reputation * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Cooperation Rate</div>
          <div className="text-2xl font-bold text-white">{(result.cooperationRate * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Coalition Size</div>
          <div className="text-2xl font-bold text-white">{result.coalitionSize}</div>
        </div>
      </div>

      {survived && result.coalitionSize >= 2 && (
        <div className="bg-teal-900/30 border border-teal-700/50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-teal-400 mb-2">Achievement Unlocked</h4>
          <p className="text-gray-300 text-sm">
            You built a coalition! In Web4, coalitions provide mutual support and insurance.
          </p>
        </div>
      )}

      {!survived && result.cooperationRate < 0.3 && (
        <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg p-4 mb-6">
          <h4 className="font-bold text-amber-400 mb-2">Lesson Learned</h4>
          <p className="text-gray-300 text-sm">
            Pure defection is unsustainable. Without trust, you can't build the coalitions
            needed for long-term survival.
          </p>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={onPlayAgain}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          Play Again
        </button>
        <button
          onClick={onExit}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          Back to Simulator
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Player Status Bar
// ============================================================================

function PlayerStatusBar({
  player,
  epoch,
  round,
  totalEpochs,
  roundsPerEpoch,
}: {
  player: AgentSnapshot | undefined;
  epoch: number;
  round: number;
  totalEpochs: number;
  roundsPerEpoch: number;
}) {
  if (!player) return null;

  const atpPercent = Math.min(100, (player.atp / 100) * 100);
  const atpColor = player.atp > 50 ? 'bg-green-500' : player.atp > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: STRATEGY_COLORS.human }}
          >
            You
          </div>
          <div>
            <div className="text-sm text-gray-400">Your ATP</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full ${atpColor} transition-all`} style={{ width: `${atpPercent}%` }} />
              </div>
              <span className="text-white font-bold">{player.atp}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-400">Reputation</div>
            <div className="text-white font-bold">{(player.reputation * 100).toFixed(0)}%</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Coalition</div>
            <div className="text-white font-bold">{player.coalitionSize}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Progress</div>
            <div className="text-white font-bold">
              Epoch {epoch + 1}/{totalEpochs}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Human Player Mode Component
// ============================================================================

export default function HumanPlayerMode({ onExit }: HumanPlayerModeProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('human-balanced');
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    currentEpoch: 0,
    currentRound: 0,
    totalInteractions: 0,
    decisionContext: null,
    lastInteraction: null,
    gameResult: null,
    message: '',
  });
  const [agents, setAgents] = useState<AgentSnapshot[]>([]);
  const [metrics, setMetrics] = useState<SocietyMetrics | null>(null);
  const [events, setEvents] = useState<SocietyEvent[]>([]);
  const [humanAgentId, setHumanAgentId] = useState<number | null>(null);

  const engineRef = useRef<SocietyEngine | null>(null);
  const iteratorRef = useRef<AsyncGenerator<HumanPlayerFrame> | null>(null);

  const humanScenarios = Object.entries(SOCIETY_PRESETS)
    .filter(([key]) => key.startsWith('human-'));

  const startGame = useCallback(async () => {
    const config = SOCIETY_PRESETS[selectedScenario]?.config || {};
    const engine = new SocietyEngine(config);
    engineRef.current = engine;

    const humanId = engine.getHumanAgentId();
    if (humanId === null) {
      console.error('No human player in configuration');
      return;
    }
    setHumanAgentId(humanId);

    // Get initial state
    const aliveAgents = engine.getAliveAgents();
    setAgents(aliveAgents.map(a => ({
      id: a.id,
      name: a.name,
      strategy: a.strategy,
      atp: a.atp,
      alive: a.alive,
      generation: a.generation,
      reputation: a.reputation,
      cooperationRate: 0,
      coalitionSize: a.coalitionPartners.size,
      karma: a.karma,
      trustEdges: [],
    })));

    setGameState({
      phase: 'playing',
      currentEpoch: 0,
      currentRound: 0,
      totalInteractions: 0,
      decisionContext: null,
      lastInteraction: null,
      gameResult: null,
      message: 'Game started! Make decisions to navigate the society.',
    });

    // Start the first decision
    await requestNextDecision(engine, humanId, 0, 0);
  }, [selectedScenario]);

  const requestNextDecision = async (
    engine: SocietyEngine,
    humanId: number,
    epoch: number,
    round: number,
  ) => {
    const humanAgent = engine.getAgent(humanId);
    if (!humanAgent || !humanAgent.alive) {
      // Game over - player died
      setGameState(prev => ({
        ...prev,
        phase: 'game_over',
        gameResult: {
          survived: false,
          finalTrust: humanAgent?.reputation || 0,
          finalATP: 0,
          cooperationRate: humanAgent && humanAgent.totalInteractions > 0
            ? humanAgent.totalCooperations / humanAgent.totalInteractions
            : 0,
          coalitionSize: humanAgent?.coalitionPartners.size || 0,
          reputation: humanAgent?.reputation || 0,
        },
      }));
      return;
    }

    // Find a partner for interaction
    const aliveAgents = engine.getAliveAgents();
    const candidates = aliveAgents.filter(a => a.id !== humanId);

    if (candidates.length === 0) {
      // No partners left - game over (won?)
      finishGame(engine, humanId);
      return;
    }

    // Pick a random partner
    const partner = candidates[Math.floor(Math.random() * candidates.length)];

    // Create decision context
    const frame = engine.createDecisionFrame(humanAgent, partner, epoch, round);

    setAgents(frame.agents);
    setMetrics(frame.metrics);
    setGameState(prev => ({
      ...prev,
      phase: 'decision',
      currentEpoch: epoch,
      currentRound: round,
      decisionContext: frame.decisionContext || null,
    }));
  };

  const handleDecision = useCallback(async (action: 'cooperate' | 'defect') => {
    const engine = engineRef.current;
    if (!engine || humanAgentId === null || !gameState.decisionContext) return;

    const { currentEpoch: epoch, currentRound: round } = gameState;
    const partnerId = gameState.decisionContext.partner.id;

    // Execute the interaction
    const interaction = engine.executeHumanInteraction(
      partnerId,
      action,
      epoch,
      round,
    );

    if (!interaction) return;

    // Update agents after interaction
    const aliveAgents = engine.getAliveAgents();
    setAgents(aliveAgents.map(a => ({
      id: a.id,
      name: a.name,
      strategy: a.strategy,
      atp: a.atp,
      alive: a.alive,
      generation: a.generation,
      reputation: a.reputation,
      cooperationRate: a.totalInteractions > 0 ? a.totalCooperations / a.totalInteractions : 0,
      coalitionSize: a.coalitionPartners.size,
      karma: a.karma,
      trustEdges: Array.from(a.trustMap.entries())
        .filter(([targetId]) => aliveAgents.some(b => b.id === targetId))
        .map(([targetId, trust]) => ({ targetId, trust })),
    })));

    setGameState(prev => ({
      ...prev,
      phase: 'result',
      lastInteraction: interaction,
      totalInteractions: prev.totalInteractions + 1,
    }));
  }, [gameState, humanAgentId]);

  const handleContinue = useCallback(async () => {
    const engine = engineRef.current;
    if (!engine || humanAgentId === null) return;

    const config = SOCIETY_PRESETS[selectedScenario]?.config || {};
    const roundsPerEpoch = config.roundsPerEpoch || 6;
    const numEpochs = config.numEpochs || 4;
    const interactionsPerRound = config.interactionsPerRound || 2;

    let { currentEpoch, currentRound, totalInteractions } = gameState;

    // Check if human is still alive
    const humanAgent = engine.getAgent(humanAgentId);
    if (!humanAgent || !humanAgent.alive || humanAgent.atp <= 0) {
      finishGame(engine, humanAgentId);
      return;
    }

    // Determine next interaction/round/epoch
    const interactionsThisRound = totalInteractions % interactionsPerRound;

    if (interactionsThisRound + 1 >= interactionsPerRound) {
      // Move to next round
      currentRound++;

      if (currentRound >= roundsPerEpoch) {
        // Move to next epoch
        currentEpoch++;
        currentRound = 0;

        if (currentEpoch >= numEpochs) {
          // Game complete!
          finishGame(engine, humanAgentId);
          return;
        }

        // Add epoch event
        setEvents(prev => [...prev, {
          epoch: currentEpoch - 1,
          type: 'society_stable' as const,
          message: `Epoch ${currentEpoch} complete`,
          significance: 'Another cycle of the society',
        }]);
      }
    }

    // Request next decision
    await requestNextDecision(engine, humanAgentId, currentEpoch, currentRound);
  }, [gameState, humanAgentId, selectedScenario]);

  const finishGame = (engine: SocietyEngine, humanId: number) => {
    const humanAgent = engine.getAgent(humanId);

    setGameState(prev => ({
      ...prev,
      phase: 'game_over',
      gameResult: {
        survived: humanAgent?.alive || false,
        finalTrust: humanAgent?.reputation || 0,
        finalATP: humanAgent?.atp || 0,
        cooperationRate: humanAgent && humanAgent.totalInteractions > 0
          ? humanAgent.totalCooperations / humanAgent.totalInteractions
          : 0,
        coalitionSize: humanAgent?.coalitionPartners.size || 0,
        reputation: humanAgent?.reputation || 0,
      },
    }));
  };

  const handlePlayAgain = () => {
    setGameState({
      phase: 'setup',
      currentEpoch: 0,
      currentRound: 0,
      totalInteractions: 0,
      decisionContext: null,
      lastInteraction: null,
      gameResult: null,
      message: '',
    });
    setAgents([]);
    setMetrics(null);
    setEvents([]);
    setHumanAgentId(null);
    engineRef.current = null;
  };

  const player = agents.find(a => a.id === humanAgentId);
  const config = SOCIETY_PRESETS[selectedScenario]?.config || {};

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      {/* Setup Phase */}
      {gameState.phase === 'setup' && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Human Player Mode</h2>
            <p className="text-gray-400">
              Experience Web4 trust dynamics firsthand. You'll be one agent in a society,
              making real decisions about cooperation and defection.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Choose Your Challenge</label>
            <div className="space-y-3">
              {humanScenarios.map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedScenario === key
                      ? 'border-teal-500 bg-teal-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="font-bold text-white">{preset.label}</div>
                  <div className="text-sm text-gray-400">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-white mb-2">How It Works</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• You start with 100 ATP (attention budget)</li>
              <li>• Each interaction costs ATP, but cooperation rewards ATP</li>
              <li>• Build trust through consistent cooperation</li>
              <li>• Form coalitions with allies for mutual support</li>
              <li>• If your ATP hits 0, you die</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all"
            >
              Start Game
            </button>
            <button
              onClick={onExit}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Playing Phase */}
      {(gameState.phase === 'playing' || gameState.phase === 'decision' || gameState.phase === 'result') && (
        <div>
          <PlayerStatusBar
            player={player}
            epoch={gameState.currentEpoch}
            round={gameState.currentRound}
            totalEpochs={config.numEpochs || 4}
            roundsPerEpoch={config.roundsPerEpoch || 6}
          />

          {gameState.phase === 'decision' && gameState.decisionContext && (
            <DecisionPanel
              context={gameState.decisionContext}
              onDecision={handleDecision}
              agents={agents}
            />
          )}

          {gameState.phase === 'result' && gameState.lastInteraction && humanAgentId !== null && (
            <ResultPanel
              interaction={gameState.lastInteraction}
              humanAgentId={humanAgentId}
              agents={agents}
              onContinue={handleContinue}
            />
          )}

          {/* Society Overview */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="font-bold text-white mb-3">Society ({agents.length} agents)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {agents.filter(a => a.id !== humanAgentId).map(agent => (
                <div
                  key={agent.id}
                  className="bg-gray-800 rounded p-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: STRATEGY_COLORS[agent.strategy] }}
                    >
                      {agent.name[0]}
                    </div>
                    <div>
                      <div className="text-white font-medium">{agent.name}</div>
                      <div className="text-gray-500 text-xs">
                        {STRATEGY_LABELS[agent.strategy]} • {agent.atp} ATP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Phase */}
      {gameState.phase === 'game_over' && gameState.gameResult && (
        <GameOverPanel
          result={gameState.gameResult}
          onPlayAgain={handlePlayAgain}
          onExit={onExit}
        />
      )}
    </div>
  );
}
