/**
 * Multi-Agent Society Simulation Engine
 *
 * Models a Web4 society where multiple agents with different strategies
 * interact, build trust relationships, form coalitions, and create
 * emergent social structure.
 *
 * This is "4-Life" at its core: Conway's Life at society scale,
 * where trust is the rule that determines structure.
 *
 * Key dynamics:
 * - Agents choose strategies (cooperate, defect, reciprocate, learn)
 * - Pairwise interactions build/erode bilateral trust
 * - Trust networks emerge from repeated interactions
 * - Coalitions form among mutually trusting agents
 * - Free-riders get isolated; cooperators cluster
 * - ATP economics create life/death pressure
 * - Karma carries forward across agent generations
 */

// ============================================================================
// Configuration
// ============================================================================

export interface SocietyConfig {
  /** Number of agents */
  numAgents: number;
  /** Agent strategy distribution */
  strategies: StrategyDistribution;
  /** Rounds of interaction per epoch */
  roundsPerEpoch: number;
  /** Number of epochs */
  numEpochs: number;
  /** Interactions per round (each agent interacts this many times) */
  interactionsPerRound: number;
  /** Starting ATP for all agents */
  initialATP: number;
  /** ATP cost per interaction */
  interactionCost: number;
  /** ATP reward for mutual cooperation */
  cooperationReward: number;
  /** ATP reward for exploiting a cooperator */
  exploitationReward: number;
  /** ATP penalty for being exploited */
  suckersPayoff: number;
  /** ATP for mutual defection */
  mutualDefectionPayoff: number;
  /** Trust gain from mutual cooperation */
  trustGainCooperate: number;
  /** Trust loss from being defected on */
  trustLossDefected: number;
  /** Trust gain from successful exploitation (exploiter's self-view) */
  trustGainExploit: number;
  /** Coalition threshold: minimum bilateral trust to form a coalition */
  coalitionThreshold: number;
  /** Whether agents can die (ATP exhaustion) and be replaced */
  enableRebirth: boolean;
  /** Karma carry-forward strength */
  karmaStrength: number;
  /** Simulation tick delay for animation (ms) */
  tickDelay: number;
}

export interface StrategyDistribution {
  /** Always cooperates */
  cooperator: number;
  /** Always defects */
  defector: number;
  /** Tit-for-tat: cooperates first, then mirrors partner's last move */
  reciprocator: number;
  /** Starts by defecting, cooperates if partner cooperated */
  cautious: number;
  /** Randomly cooperates/defects based on partner's trust */
  adaptive: number;
}

export const DEFAULT_SOCIETY_CONFIG: SocietyConfig = {
  numAgents: 12,
  strategies: {
    cooperator: 3,
    defector: 2,
    reciprocator: 4,
    cautious: 2,
    adaptive: 1,
  },
  roundsPerEpoch: 10,
  numEpochs: 5,
  interactionsPerRound: 2,
  initialATP: 100,
  interactionCost: 2,
  cooperationReward: 6,
  exploitationReward: 8,
  suckersPayoff: -3,
  mutualDefectionPayoff: 1,
  trustGainCooperate: 0.08,
  trustLossDefected: 0.12,
  trustGainExploit: -0.02,
  coalitionThreshold: 0.5,
  enableRebirth: true,
  karmaStrength: 0.4,
  tickDelay: 80,
};

export const SOCIETY_PRESETS: Record<string, { label: string; description: string; config: Partial<SocietyConfig> }> = {
  'cooperative-majority': {
    label: 'Cooperative Majority',
    description: 'Most agents cooperate. Do defectors thrive or get isolated?',
    config: {
      numAgents: 12,
      strategies: { cooperator: 5, defector: 2, reciprocator: 3, cautious: 1, adaptive: 1 },
      numEpochs: 5,
    },
  },
  'hostile-world': {
    label: 'Hostile World',
    description: 'Defectors outnumber cooperators. Can trust survive?',
    config: {
      numAgents: 12,
      strategies: { cooperator: 2, defector: 5, reciprocator: 2, cautious: 2, adaptive: 1 },
      numEpochs: 5,
      cooperationReward: 7,
    },
  },
  'reciprocity-rules': {
    label: 'Reciprocity Rules',
    description: 'Tit-for-tat dominates. The evolution of cooperation.',
    config: {
      numAgents: 12,
      strategies: { cooperator: 1, defector: 2, reciprocator: 7, cautious: 1, adaptive: 1 },
      numEpochs: 6,
    },
  },
  'trust-scarce': {
    label: 'Trust Scarce',
    description: 'Everyone starts cautious. High cost of failure.',
    config: {
      numAgents: 10,
      strategies: { cooperator: 1, defector: 1, reciprocator: 2, cautious: 5, adaptive: 1 },
      numEpochs: 6,
      trustGainCooperate: 0.05,
      trustLossDefected: 0.15,
      cooperationReward: 8,
    },
  },
  'all-adaptive': {
    label: 'All Adaptive',
    description: 'Pure learning society. Strategy emerges from interaction.',
    config: {
      numAgents: 10,
      strategies: { cooperator: 0, defector: 0, reciprocator: 0, cautious: 0, adaptive: 10 },
      numEpochs: 8,
    },
  },
};

// ============================================================================
// Agent & Interaction Types
// ============================================================================

export type StrategyType = 'cooperator' | 'defector' | 'reciprocator' | 'cautious' | 'adaptive';

export const STRATEGY_COLORS: Record<StrategyType, string> = {
  cooperator: '#22c55e',   // green
  defector: '#ef4444',     // red
  reciprocator: '#3b82f6', // blue
  cautious: '#f59e0b',     // amber
  adaptive: '#a855f7',     // purple
};

export const STRATEGY_LABELS: Record<StrategyType, string> = {
  cooperator: 'Cooperator',
  defector: 'Defector',
  reciprocator: 'Reciprocator',
  cautious: 'Cautious',
  adaptive: 'Adaptive',
};

export interface Agent {
  id: number;
  name: string;
  strategy: StrategyType;
  atp: number;
  alive: boolean;
  generation: number;
  totalCooperations: number;
  totalDefections: number;
  totalInteractions: number;
  /** Bilateral trust toward each other agent: Map<agentId, trust> */
  trustMap: Map<number, number>;
  /** Last action taken toward each agent */
  lastActionMap: Map<number, 'cooperate' | 'defect'>;
  /** Coalition memberships (agent IDs of coalition partners) */
  coalitionPartners: Set<number>;
  /** Karma from previous generations */
  karma: number;
  /** History of ATP over time */
  atpHistory: number[];
  /** Average trust received from others */
  reputation: number;
}

export interface Interaction {
  round: number;
  epoch: number;
  agent1Id: number;
  agent2Id: number;
  agent1Action: 'cooperate' | 'defect';
  agent2Action: 'cooperate' | 'defect';
  agent1AtpChange: number;
  agent2AtpChange: number;
  agent1TrustChange: number;
  agent2TrustChange: number;
  outcome: 'mutual_cooperation' | 'mutual_defection' | 'agent1_exploited' | 'agent2_exploited';
}

export interface Coalition {
  members: number[];
  averageTrust: number;
  totalATP: number;
  dominantStrategy: StrategyType;
}

export interface EpochSnapshot {
  epoch: number;
  agents: AgentSnapshot[];
  interactions: Interaction[];
  coalitions: Coalition[];
  societyMetrics: SocietyMetrics;
  events: SocietyEvent[];
}

export interface AgentSnapshot {
  id: number;
  name: string;
  strategy: StrategyType;
  atp: number;
  alive: boolean;
  generation: number;
  reputation: number;
  cooperationRate: number;
  coalitionSize: number;
  karma: number;
  trustEdges: { targetId: number; trust: number }[];
}

export interface SocietyMetrics {
  averageTrust: number;
  trustVariance: number;
  cooperationRate: number;
  numCoalitions: number;
  largestCoalition: number;
  giniCoefficient: number;
  aliveCount: number;
  totalGenerations: number;
  strategyDistribution: Record<StrategyType, number>;
  networkDensity: number;
}

export interface SocietyEvent {
  epoch: number;
  round?: number;
  type: 'coalition_formed' | 'coalition_dissolved' | 'agent_death' | 'agent_rebirth' |
        'defector_isolated' | 'trust_network_connected' | 'cooperation_surge' |
        'trust_collapse' | 'strategy_shift' | 'society_stable';
  message: string;
  agentIds?: number[];
  significance: string;
}

export interface SocietyResult {
  config: SocietyConfig;
  epochs: EpochSnapshot[];
  events: SocietyEvent[];
  finalMetrics: SocietyMetrics;
}

// ============================================================================
// Agent Names (for human-readable narratives)
// ============================================================================

const AGENT_NAMES = [
  'Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank',
  'Grace', 'Hank', 'Iris', 'Jack', 'Kate', 'Leo',
  'Mia', 'Nick', 'Olive', 'Pat', 'Quinn', 'Rosa',
  'Sam', 'Tara', 'Uma', 'Vic', 'Wendy', 'Xena',
];

// ============================================================================
// Society Simulation Engine
// ============================================================================

export class SocietyEngine {
  private config: SocietyConfig;
  private agents: Agent[] = [];
  private allInteractions: Interaction[] = [];
  private events: SocietyEvent[] = [];
  private rng: () => number;
  private nextAgentId: number = 0;

  constructor(config: Partial<SocietyConfig> = {}) {
    this.config = { ...DEFAULT_SOCIETY_CONFIG, ...config };
    if (config.strategies) {
      this.config.strategies = { ...DEFAULT_SOCIETY_CONFIG.strategies, ...config.strategies };
    }
    this.rng = Math.random;
    this.initializeAgents();
  }

  private initializeAgents(): void {
    const strategies = this.config.strategies;
    const order: StrategyType[] = [];

    for (const [strategy, count] of Object.entries(strategies)) {
      for (let i = 0; i < count; i++) {
        order.push(strategy as StrategyType);
      }
    }

    // Shuffle
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    this.agents = order.map((strategy, idx) => this.createAgent(strategy));
  }

  private createAgent(strategy: StrategyType, karma: number = 0): Agent {
    const id = this.nextAgentId++;
    return {
      id,
      name: AGENT_NAMES[id % AGENT_NAMES.length] + (id >= AGENT_NAMES.length ? ` ${Math.floor(id / AGENT_NAMES.length) + 1}` : ''),
      strategy,
      atp: this.config.initialATP + karma * 20,
      alive: true,
      generation: karma > 0 ? 2 : 1,
      totalCooperations: 0,
      totalDefections: 0,
      totalInteractions: 0,
      trustMap: new Map(),
      lastActionMap: new Map(),
      coalitionPartners: new Set(),
      karma,
      atpHistory: [this.config.initialATP + karma * 20],
      reputation: 0.5,
    };
  }

  // ============================================================================
  // Synchronous run
  // ============================================================================

  run(): SocietyResult {
    const epochs: EpochSnapshot[] = [];

    for (let epoch = 0; epoch < this.config.numEpochs; epoch++) {
      const epochInteractions: Interaction[] = [];

      for (let round = 0; round < this.config.roundsPerEpoch; round++) {
        const roundInteractions = this.runRound(epoch, round);
        epochInteractions.push(...roundInteractions);
        this.allInteractions.push(...roundInteractions);
      }

      // Handle deaths and rebirths
      this.processLifecycles(epoch);

      // Detect coalitions
      const coalitions = this.detectCoalitions();

      // Calculate metrics
      const metrics = this.calculateMetrics();

      // Detect events
      this.detectEvents(epoch, epochInteractions, coalitions, metrics);

      // Snapshot
      epochs.push({
        epoch,
        agents: this.snapshotAgents(),
        interactions: epochInteractions,
        coalitions,
        societyMetrics: metrics,
        events: this.events.filter(e => e.epoch === epoch),
      });
    }

    return {
      config: this.config,
      epochs,
      events: this.events,
      finalMetrics: this.calculateMetrics(),
    };
  }

  // ============================================================================
  // Animated async generator
  // ============================================================================

  async *runAnimated(): AsyncGenerator<{
    epoch: number;
    round: number;
    interactions: Interaction[];
    agents: AgentSnapshot[];
    coalitions: Coalition[];
    metrics: SocietyMetrics;
    events: SocietyEvent[];
    done: boolean;
  }> {
    for (let epoch = 0; epoch < this.config.numEpochs; epoch++) {
      for (let round = 0; round < this.config.roundsPerEpoch; round++) {
        const roundInteractions = this.runRound(epoch, round);
        this.allInteractions.push(...roundInteractions);

        const coalitions = this.detectCoalitions();
        const metrics = this.calculateMetrics();

        yield {
          epoch,
          round,
          interactions: roundInteractions,
          agents: this.snapshotAgents(),
          coalitions,
          metrics,
          events: [],
          done: false,
        };

        if (this.config.tickDelay > 0) {
          await new Promise(r => setTimeout(r, this.config.tickDelay));
        }
      }

      // End of epoch: lifecycle + events
      this.processLifecycles(epoch);
      const coalitions = this.detectCoalitions();
      const metrics = this.calculateMetrics();
      this.detectEvents(epoch, this.allInteractions.filter(i => i.epoch === epoch), coalitions, metrics);

      yield {
        epoch,
        round: this.config.roundsPerEpoch,
        interactions: [],
        agents: this.snapshotAgents(),
        coalitions,
        metrics,
        events: this.events.filter(e => e.epoch === epoch),
        done: epoch === this.config.numEpochs - 1,
      };

      if (this.config.tickDelay > 0) {
        await new Promise(r => setTimeout(r, this.config.tickDelay * 3));
      }
    }
  }

  // ============================================================================
  // Core Mechanics
  // ============================================================================

  private runRound(epoch: number, round: number): Interaction[] {
    const interactions: Interaction[] = [];
    const aliveAgents = this.agents.filter(a => a.alive);
    if (aliveAgents.length < 2) return interactions;

    // Each agent interacts with random partners
    for (const agent of aliveAgents) {
      for (let i = 0; i < this.config.interactionsPerRound; i++) {
        // Pick a random partner (not self)
        const candidates = aliveAgents.filter(a => a.id !== agent.id);
        if (candidates.length === 0) continue;
        const partner = candidates[Math.floor(this.rng() * candidates.length)];

        // Check if this pair already interacted this round
        const alreadyInteracted = interactions.some(
          int => (int.agent1Id === agent.id && int.agent2Id === partner.id) ||
                 (int.agent1Id === partner.id && int.agent2Id === agent.id)
        );
        if (alreadyInteracted) continue;

        const interaction = this.interact(agent, partner, epoch, round);
        interactions.push(interaction);
      }
    }

    // Update reputation for all agents
    for (const agent of this.agents) {
      if (!agent.alive) continue;
      const trustsReceived: number[] = [];
      for (const other of this.agents) {
        if (other.id === agent.id || !other.alive) continue;
        const t = other.trustMap.get(agent.id);
        if (t !== undefined) trustsReceived.push(t);
      }
      if (trustsReceived.length > 0) {
        agent.reputation = trustsReceived.reduce((s, v) => s + v, 0) / trustsReceived.length;
      }
      agent.atpHistory.push(agent.atp);
    }

    return interactions;
  }

  private interact(a1: Agent, a2: Agent, epoch: number, round: number): Interaction {
    const action1 = this.chooseAction(a1, a2);
    const action2 = this.chooseAction(a2, a1);

    let a1AtpChange = -this.config.interactionCost;
    let a2AtpChange = -this.config.interactionCost;
    let a1TrustChange = 0;
    let a2TrustChange = 0;
    let outcome: Interaction['outcome'];

    if (action1 === 'cooperate' && action2 === 'cooperate') {
      // Mutual cooperation
      a1AtpChange += this.config.cooperationReward;
      a2AtpChange += this.config.cooperationReward;
      a1TrustChange = this.config.trustGainCooperate;
      a2TrustChange = this.config.trustGainCooperate;
      outcome = 'mutual_cooperation';
    } else if (action1 === 'defect' && action2 === 'defect') {
      // Mutual defection
      a1AtpChange += this.config.mutualDefectionPayoff;
      a2AtpChange += this.config.mutualDefectionPayoff;
      a1TrustChange = -this.config.trustLossDefected * 0.3;
      a2TrustChange = -this.config.trustLossDefected * 0.3;
      outcome = 'mutual_defection';
    } else if (action1 === 'defect' && action2 === 'cooperate') {
      // A1 exploits A2
      a1AtpChange += this.config.exploitationReward;
      a2AtpChange += this.config.suckersPayoff;
      a1TrustChange = this.config.trustGainExploit;
      a2TrustChange = -this.config.trustLossDefected;
      outcome = 'agent2_exploited';
    } else {
      // A2 exploits A1
      a2AtpChange += this.config.exploitationReward;
      a1AtpChange += this.config.suckersPayoff;
      a2TrustChange = this.config.trustGainExploit;
      a1TrustChange = -this.config.trustLossDefected;
      outcome = 'agent1_exploited';
    }

    // Apply ATP changes
    a1.atp = Math.max(0, a1.atp + a1AtpChange);
    a2.atp = Math.max(0, a2.atp + a2AtpChange);

    // Apply trust changes (bilateral)
    const currentTrust1to2 = a1.trustMap.get(a2.id) ?? 0.5;
    const currentTrust2to1 = a2.trustMap.get(a1.id) ?? 0.5;
    a1.trustMap.set(a2.id, Math.max(0, Math.min(1, currentTrust1to2 + a2TrustChange)));
    a2.trustMap.set(a1.id, Math.max(0, Math.min(1, currentTrust2to1 + a1TrustChange)));

    // Track actions
    a1.lastActionMap.set(a2.id, action1);
    a2.lastActionMap.set(a1.id, action2);

    // Track stats
    a1.totalInteractions++;
    a2.totalInteractions++;
    if (action1 === 'cooperate') a1.totalCooperations++;
    else a1.totalDefections++;
    if (action2 === 'cooperate') a2.totalCooperations++;
    else a2.totalDefections++;

    // Update coalitions
    this.updateCoalitionMembership(a1, a2);
    this.updateCoalitionMembership(a2, a1);

    return {
      round,
      epoch,
      agent1Id: a1.id,
      agent2Id: a2.id,
      agent1Action: action1,
      agent2Action: action2,
      agent1AtpChange: a1AtpChange,
      agent2AtpChange: a2AtpChange,
      agent1TrustChange: a1TrustChange,
      agent2TrustChange: a2TrustChange,
      outcome,
    };
  }

  private chooseAction(agent: Agent, partner: Agent): 'cooperate' | 'defect' {
    const trustInPartner = agent.trustMap.get(partner.id) ?? 0.5;

    switch (agent.strategy) {
      case 'cooperator':
        return 'cooperate';

      case 'defector':
        return 'defect';

      case 'reciprocator': {
        // Tit-for-tat: mirror partner's last action toward us
        const lastAction = partner.lastActionMap.get(agent.id);
        if (lastAction === undefined) return 'cooperate'; // cooperate first
        return lastAction;
      }

      case 'cautious': {
        // Cooperate only if trust is above threshold
        return trustInPartner > 0.4 ? 'cooperate' : 'defect';
      }

      case 'adaptive': {
        // Probabilistic: cooperate with probability proportional to trust
        return this.rng() < trustInPartner ? 'cooperate' : 'defect';
      }

      default:
        return 'cooperate';
    }
  }

  private updateCoalitionMembership(agent: Agent, partner: Agent): void {
    const trustInPartner = agent.trustMap.get(partner.id) ?? 0;
    const trustFromPartner = partner.trustMap.get(agent.id) ?? 0;
    const bilateralTrust = (trustInPartner + trustFromPartner) / 2;

    if (bilateralTrust >= this.config.coalitionThreshold) {
      agent.coalitionPartners.add(partner.id);
    } else {
      agent.coalitionPartners.delete(partner.id);
    }
  }

  private processLifecycles(epoch: number): void {
    if (!this.config.enableRebirth) return;

    for (const agent of this.agents) {
      if (agent.alive && agent.atp <= 0) {
        agent.alive = false;
        this.events.push({
          epoch,
          type: 'agent_death',
          message: `${agent.name} (${STRATEGY_LABELS[agent.strategy]}) died - ATP exhausted`,
          agentIds: [agent.id],
          significance: agent.strategy === 'defector'
            ? 'Exploitative strategy proved unsustainable'
            : 'Even cooperative agents can fail in hostile environments',
        });

        // Rebirth with karma
        const karmaScore = agent.reputation * this.config.karmaStrength;
        const newAgent = this.createAgent(agent.strategy, karmaScore);
        newAgent.generation = agent.generation + 1;
        this.agents.push(newAgent);

        this.events.push({
          epoch,
          type: 'agent_rebirth',
          message: `${newAgent.name} (${STRATEGY_LABELS[newAgent.strategy]}) born with karma ${karmaScore.toFixed(2)}`,
          agentIds: [newAgent.id],
          significance: karmaScore > 0.3
            ? 'Good reputation earns better starting conditions'
            : 'Poor reputation means starting from behind',
        });
      }
    }
  }

  // ============================================================================
  // Analysis
  // ============================================================================

  private detectCoalitions(): Coalition[] {
    const aliveAgents = this.agents.filter(a => a.alive);
    const visited = new Set<number>();
    const coalitions: Coalition[] = [];

    for (const agent of aliveAgents) {
      if (visited.has(agent.id)) continue;

      // BFS to find connected component via coalition partnerships
      const component: Agent[] = [];
      const queue = [agent];
      visited.add(agent.id);

      while (queue.length > 0) {
        const current = queue.shift()!;
        component.push(current);

        for (const partnerId of current.coalitionPartners) {
          if (visited.has(partnerId)) continue;
          const partner = this.agents.find(a => a.id === partnerId && a.alive);
          if (partner && partner.coalitionPartners.has(current.id)) {
            visited.add(partnerId);
            queue.push(partner);
          }
        }
      }

      if (component.length >= 2) {
        // Calculate average bilateral trust
        let totalTrust = 0;
        let trustCount = 0;
        for (const a of component) {
          for (const b of component) {
            if (a.id === b.id) continue;
            const t = a.trustMap.get(b.id);
            if (t !== undefined) {
              totalTrust += t;
              trustCount++;
            }
          }
        }

        // Dominant strategy
        const strategyCounts: Record<string, number> = {};
        for (const a of component) {
          strategyCounts[a.strategy] = (strategyCounts[a.strategy] || 0) + 1;
        }
        const dominantStrategy = Object.entries(strategyCounts)
          .sort((a, b) => b[1] - a[1])[0][0] as StrategyType;

        coalitions.push({
          members: component.map(a => a.id),
          averageTrust: trustCount > 0 ? totalTrust / trustCount : 0,
          totalATP: component.reduce((s, a) => s + a.atp, 0),
          dominantStrategy,
        });
      }
    }

    return coalitions.sort((a, b) => b.members.length - a.members.length);
  }

  private calculateMetrics(): SocietyMetrics {
    const aliveAgents = this.agents.filter(a => a.alive);

    // Average trust
    const allTrusts: number[] = [];
    for (const agent of aliveAgents) {
      for (const [, trust] of agent.trustMap) {
        allTrusts.push(trust);
      }
    }
    const averageTrust = allTrusts.length > 0
      ? allTrusts.reduce((s, v) => s + v, 0) / allTrusts.length
      : 0.5;
    const trustVariance = allTrusts.length > 0
      ? allTrusts.reduce((s, v) => s + (v - averageTrust) ** 2, 0) / allTrusts.length
      : 0;

    // Cooperation rate
    const totalInteractions = aliveAgents.reduce((s, a) => s + a.totalInteractions, 0);
    const totalCooperations = aliveAgents.reduce((s, a) => s + a.totalCooperations, 0);
    const cooperationRate = totalInteractions > 0 ? totalCooperations / totalInteractions : 0.5;

    // Coalitions
    const coalitions = this.detectCoalitions();

    // Gini coefficient of ATP
    const atps = aliveAgents.map(a => a.atp).sort((a, b) => a - b);
    let gini = 0;
    if (atps.length > 1) {
      const n = atps.length;
      const totalATP = atps.reduce((s, v) => s + v, 0);
      if (totalATP > 0) {
        let cumulativeSum = 0;
        for (let i = 0; i < n; i++) {
          cumulativeSum += atps[i];
          gini += (2 * (i + 1) - n - 1) * atps[i];
        }
        gini = gini / (n * totalATP);
      }
    }

    // Strategy distribution
    const strategyDistribution: Record<StrategyType, number> = {
      cooperator: 0, defector: 0, reciprocator: 0, cautious: 0, adaptive: 0,
    };
    for (const agent of aliveAgents) {
      strategyDistribution[agent.strategy]++;
    }

    // Network density
    const maxEdges = aliveAgents.length * (aliveAgents.length - 1);
    const actualEdges = allTrusts.filter(t => t > this.config.coalitionThreshold).length;
    const networkDensity = maxEdges > 0 ? actualEdges / maxEdges : 0;

    return {
      averageTrust,
      trustVariance,
      cooperationRate,
      numCoalitions: coalitions.length,
      largestCoalition: coalitions.length > 0 ? coalitions[0].members.length : 0,
      giniCoefficient: gini,
      aliveCount: aliveAgents.length,
      totalGenerations: this.agents.reduce((max, a) => Math.max(max, a.generation), 1),
      strategyDistribution,
      networkDensity,
    };
  }

  private detectEvents(
    epoch: number,
    epochInteractions: Interaction[],
    coalitions: Coalition[],
    metrics: SocietyMetrics,
  ): void {
    // Coalition formation
    if (coalitions.length > 0 && epoch > 0) {
      const largest = coalitions[0];
      if (largest.members.length >= 4) {
        const memberNames = largest.members
          .map(id => this.agents.find(a => a.id === id)?.name || `#${id}`)
          .slice(0, 3)
          .join(', ');
        this.events.push({
          epoch,
          type: 'coalition_formed',
          message: `Large coalition: ${memberNames}${largest.members.length > 3 ? ` +${largest.members.length - 3} more` : ''} (avg trust: ${largest.averageTrust.toFixed(2)})`,
          agentIds: largest.members,
          significance: 'Mutual trust creates structure - society self-organizes',
        });
      }
    }

    // Defector isolation
    const aliveDefectors = this.agents.filter(a => a.alive && a.strategy === 'defector');
    for (const defector of aliveDefectors) {
      if (defector.coalitionPartners.size === 0 && defector.totalInteractions > 5) {
        this.events.push({
          epoch,
          type: 'defector_isolated',
          message: `${defector.name} (Defector) is isolated - no coalition partners`,
          agentIds: [defector.id],
          significance: 'Trust-based societies naturally exclude exploiters',
        });
      }
    }

    // Cooperation surge
    const epochCoopRate = epochInteractions.length > 0
      ? epochInteractions.filter(i =>
          i.outcome === 'mutual_cooperation'
        ).length / epochInteractions.length
      : 0;
    if (epochCoopRate > 0.7 && epoch > 1) {
      this.events.push({
        epoch,
        type: 'cooperation_surge',
        message: `Cooperation surge: ${(epochCoopRate * 100).toFixed(0)}% of interactions were mutual cooperation`,
        significance: 'Trust begets trust - cooperation becomes self-reinforcing',
      });
    }

    // Trust collapse
    if (metrics.averageTrust < 0.3 && epoch > 1) {
      this.events.push({
        epoch,
        type: 'trust_collapse',
        message: `Society trust collapsed to ${metrics.averageTrust.toFixed(2)}`,
        significance: 'Without trust, cooperation becomes impossible',
      });
    }

    // Society stability
    if (epoch === this.config.numEpochs - 1 && metrics.averageTrust > 0.5 && metrics.cooperationRate > 0.6) {
      this.events.push({
        epoch,
        type: 'society_stable',
        message: `Stable society: trust ${metrics.averageTrust.toFixed(2)}, cooperation ${(metrics.cooperationRate * 100).toFixed(0)}%`,
        significance: 'Trust-native society achieved equilibrium',
      });
    }
  }

  private snapshotAgents(): AgentSnapshot[] {
    return this.agents.filter(a => a.alive).map(a => ({
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
        .filter(([targetId]) => this.agents.find(b => b.id === targetId)?.alive)
        .map(([targetId, trust]) => ({ targetId, trust })),
    }));
  }
}
