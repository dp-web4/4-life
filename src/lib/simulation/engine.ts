/**
 * Client-Side Web4 Simulation Engine
 *
 * A faithful TypeScript implementation of Web4 trust dynamics that runs
 * entirely in the browser. No Python backend required.
 *
 * Models: Trust Tensor (T3), ATP economics, Coherence Index,
 * karma/rebirth, and epistemic learning across lives.
 *
 * Design principle: Accurate enough to teach, simple enough to understand.
 */

// ============================================================================
// Configuration
// ============================================================================

export interface SimConfig {
  /** Agent name */
  agentName: string;
  /** Number of lives to simulate */
  numLives: number;
  /** Ticks per life (0 = until ATP exhaustion) */
  ticksPerLife: number;
  /** Starting ATP */
  initialATP: number;
  /** Starting trust [0, 1] */
  initialTrust: number;
  /** ATP cost per action */
  actionCost: number;
  /** ATP earned per successful contribution */
  contributionReward: number;
  /** Probability of successful contribution per tick */
  successRate: number;
  /** Trust gain per successful action */
  trustGainRate: number;
  /** Trust loss per failed action */
  trustLossRate: number;
  /** Karma multiplier for trust carry-forward on rebirth */
  karmaStrength: number;
  /** Whether EP learning is enabled (cross-life improvement) */
  epEnabled: boolean;
  /** How much EP improves success rate per life */
  epLearningRate: number;
  /** Coherence Index weighting (0 = disabled) */
  coherenceWeight: number;
  /** Behavioral noise (randomness in actions) */
  noise: number;
  /** Simulation speed for playback (ms per tick) */
  tickDelay: number;
}

export const DEFAULT_CONFIG: SimConfig = {
  agentName: 'Agent-1',
  numLives: 3,
  ticksPerLife: 50,
  initialATP: 100,
  initialTrust: 0.3,
  actionCost: 3,
  contributionReward: 5,
  successRate: 0.6,
  trustGainRate: 0.02,
  trustLossRate: 0.03,
  karmaStrength: 0.5,
  epEnabled: true,
  epLearningRate: 0.05,
  coherenceWeight: 0.3,
  noise: 0.1,
  tickDelay: 100,
};

// Presets for common scenarios
export const PRESETS: Record<string, Partial<SimConfig>> = {
  'gentle-start': {
    agentName: 'Newcomer',
    numLives: 3,
    ticksPerLife: 40,
    initialATP: 150,
    initialTrust: 0.3,
    successRate: 0.7,
    trustGainRate: 0.025,
    trustLossRate: 0.015,
    karmaStrength: 0.6,
    epEnabled: true,
    noise: 0.05,
  },
  'harsh-world': {
    agentName: 'Survivor',
    numLives: 5,
    ticksPerLife: 30,
    initialATP: 60,
    initialTrust: 0.2,
    successRate: 0.4,
    actionCost: 4,
    contributionReward: 6,
    trustGainRate: 0.015,
    trustLossRate: 0.04,
    karmaStrength: 0.3,
    noise: 0.2,
  },
  'fast-learner': {
    agentName: 'Scholar',
    numLives: 5,
    ticksPerLife: 30,
    initialATP: 100,
    initialTrust: 0.25,
    successRate: 0.5,
    epEnabled: true,
    epLearningRate: 0.1,
    karmaStrength: 0.7,
    noise: 0.08,
  },
  'no-karma': {
    agentName: 'Amnesiac',
    numLives: 3,
    ticksPerLife: 50,
    initialATP: 100,
    initialTrust: 0.3,
    karmaStrength: 0,
    epEnabled: false,
    noise: 0.1,
  },
};

// ============================================================================
// State Types
// ============================================================================

export interface TickState {
  tick: number;
  lifeTick: number;
  lifeNumber: number;
  atp: number;
  trust: number;
  coherenceIndex: number;
  action: TickAction;
  actionSuccess: boolean;
  epBonus: number;
  alive: boolean;
}

export interface TickAction {
  type: 'contribute' | 'conserve' | 'explore' | 'rest';
  label: string;
  atpCost: number;
  atpGain: number;
  trustChange: number;
}

export interface LifeResult {
  lifeNumber: number;
  startTick: number;
  endTick: number;
  startTrust: number;
  endTrust: number;
  startATP: number;
  endATP: number;
  peakTrust: number;
  minTrust: number;
  tickCount: number;
  terminationReason: 'atp_exhaustion' | 'simulation_end' | 'natural_end';
  trustHistory: number[];
  atpHistory: number[];
  coherenceHistory: number[];
  ticks: TickState[];
  karmaEarned: number;
  epLevel: number;
}

export interface SimulationResult {
  config: SimConfig;
  lives: LifeResult[];
  totalTicks: number;
  finalTrust: number;
  trustGrowth: number;
  events: SimEvent[];
}

export interface SimEvent {
  tick: number;
  lifeNumber: number;
  type: 'birth' | 'death' | 'rebirth' | 'trust_spike' | 'trust_collapse' |
        'atp_crisis' | 'threshold_crossed' | 'maturation' | 'consistency';
  message: string;
  significance: string;
}

// ============================================================================
// Simulation Engine
// ============================================================================

export class SimulationEngine {
  private config: SimConfig;
  private rng: () => number;

  constructor(config: Partial<SimConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.rng = Math.random;
  }

  /**
   * Run the complete simulation synchronously.
   * Returns full results with all tick data.
   */
  run(): SimulationResult {
    const lives: LifeResult[] = [];
    const events: SimEvent[] = [];
    let globalTick = 0;
    let currentTrust = this.config.initialTrust;
    let epLevel = 0;

    for (let lifeNum = 1; lifeNum <= this.config.numLives; lifeNum++) {
      // Calculate starting conditions for this life
      let startTrust = currentTrust;
      let startATP = this.config.initialATP;

      if (lifeNum > 1) {
        // Karma: carry forward trust based on previous life performance
        const prevLife = lives[lives.length - 1];
        const karmaBonus = (prevLife.endTrust - prevLife.startTrust) * this.config.karmaStrength;
        startTrust = Math.max(0.05, Math.min(0.95, prevLife.endTrust + karmaBonus));

        // EP: accumulated learning bonus
        if (this.config.epEnabled) {
          epLevel += this.config.epLearningRate;
        }

        events.push({
          tick: globalTick,
          lifeNumber: lifeNum,
          type: 'rebirth',
          message: `Reborn with trust ${startTrust.toFixed(3)}${karmaBonus > 0 ? ` (+${karmaBonus.toFixed(3)} karma)` : karmaBonus < 0 ? ` (${karmaBonus.toFixed(3)} karma)` : ''}`,
          significance: 'Past actions shape future starting conditions',
        });
      } else {
        events.push({
          tick: globalTick,
          lifeNumber: lifeNum,
          type: 'birth',
          message: `${this.config.agentName} enters Web4 with trust ${startTrust.toFixed(2)} and ${startATP} ATP`,
          significance: 'Every agent starts fresh and must earn trust',
        });
      }

      const life = this.simulateLife(lifeNum, globalTick, startTrust, startATP, epLevel, events);
      lives.push(life);

      currentTrust = life.endTrust;
      globalTick = life.endTick + 1;

      // Death event
      events.push({
        tick: life.endTick,
        lifeNumber: lifeNum,
        type: 'death',
        message: `Life ${lifeNum} ends: ${life.terminationReason.replace('_', ' ')}. Final trust: ${life.endTrust.toFixed(3)}`,
        significance: 'Death completes one cycle; trust carries forward as karma',
      });

      // Cross-life maturation detection
      if (lifeNum > 1) {
        const prev = lives[lifeNum - 2];
        if (life.endTrust > prev.endTrust + 0.05) {
          events.push({
            tick: life.endTick,
            lifeNumber: lifeNum,
            type: 'maturation',
            message: `Maturation: trust grew from ${prev.endTrust.toFixed(3)} to ${life.endTrust.toFixed(3)} across lives`,
            significance: 'The agent is learning - getting better with each life',
          });
        }
        // Consistency detection
        if (Math.abs(life.endTrust - prev.endTrust) < 0.02) {
          events.push({
            tick: life.endTick,
            lifeNumber: lifeNum,
            type: 'consistency',
            message: `Consistent performance across lives (${prev.endTrust.toFixed(3)} → ${life.endTrust.toFixed(3)})`,
            significance: 'Stable strategy found - reliability, not luck',
          });
        }
      }
    }

    const firstLife = lives[0];
    const lastLife = lives[lives.length - 1];

    return {
      config: this.config,
      lives,
      totalTicks: globalTick,
      finalTrust: lastLife.endTrust,
      trustGrowth: lastLife.endTrust - firstLife.startTrust,
      events,
    };
  }

  /**
   * Run simulation as an async generator, yielding each tick.
   * Useful for animated playback.
   */
  async *runAnimated(): AsyncGenerator<{
    tick: TickState;
    lifeNumber: number;
    event?: SimEvent;
    done: boolean;
  }> {
    const lives: LifeResult[] = [];
    let globalTick = 0;
    let currentTrust = this.config.initialTrust;
    let epLevel = 0;

    for (let lifeNum = 1; lifeNum <= this.config.numLives; lifeNum++) {
      let startTrust = currentTrust;
      let startATP = this.config.initialATP;

      if (lifeNum > 1) {
        const prevLife = lives[lives.length - 1];
        const karmaBonus = (prevLife.endTrust - prevLife.startTrust) * this.config.karmaStrength;
        startTrust = Math.max(0.05, Math.min(0.95, prevLife.endTrust + karmaBonus));
        if (this.config.epEnabled) {
          epLevel += this.config.epLearningRate;
        }
      }

      // Simulate this life tick by tick
      let trust = startTrust;
      let atp = startATP;
      const trustHistory: number[] = [trust];
      const atpHistory: number[] = [atp];
      const coherenceHistory: number[] = [];
      const ticks: TickState[] = [];
      let peakTrust = trust;
      let minTrust = trust;
      let thresholdCrossed = false;

      for (let t = 0; t < this.config.ticksPerLife; t++) {
        if (atp <= 0) break;

        const coherence = this.calculateCoherence(trustHistory);
        coherenceHistory.push(coherence);

        const action = this.chooseAction(trust, atp, coherence, epLevel);
        const effectiveSuccessRate = Math.min(0.95,
          this.config.successRate + epLevel + (this.rng() - 0.5) * this.config.noise * 2
        );
        const success = this.rng() < effectiveSuccessRate;

        // Apply action
        atp -= action.atpCost;
        if (success) {
          atp += action.atpGain;
          trust = Math.min(1, trust + action.trustChange * (1 + coherence * this.config.coherenceWeight));
        } else {
          trust = Math.max(0, trust - this.config.trustLossRate * (1 - coherence * this.config.coherenceWeight * 0.5));
        }

        atp = Math.max(0, atp);

        peakTrust = Math.max(peakTrust, trust);
        minTrust = Math.min(minTrust, trust);
        trustHistory.push(trust);
        atpHistory.push(atp);

        const tickState: TickState = {
          tick: globalTick + t,
          lifeTick: t,
          lifeNumber: lifeNum,
          atp,
          trust,
          coherenceIndex: coherence,
          action,
          actionSuccess: success,
          epBonus: epLevel,
          alive: atp > 0,
        };
        ticks.push(tickState);

        // Detect events
        let event: SimEvent | undefined;

        if (!thresholdCrossed && trust >= 0.5 && startTrust < 0.5) {
          thresholdCrossed = true;
          event = {
            tick: globalTick + t,
            lifeNumber: lifeNum,
            type: 'threshold_crossed',
            message: `Trust crosses 0.5 threshold - coherent agency emerges`,
            significance: 'Behavior transitions from reactive to intentional',
          };
        }

        if (atp > 0 && atp <= 10 && atpHistory[atpHistory.length - 2] > 10) {
          event = {
            tick: globalTick + t,
            lifeNumber: lifeNum,
            type: 'atp_crisis',
            message: `ATP crisis: only ${Math.round(atp)} remaining`,
            significance: 'Running low on capacity to act',
          };
        }

        if (trustHistory.length >= 3) {
          const prev = trustHistory[trustHistory.length - 3];
          const pctChange = Math.abs((trust - prev) / (prev || 0.01));
          if (trust > prev && pctChange > 0.15) {
            event = {
              tick: globalTick + t,
              lifeNumber: lifeNum,
              type: 'trust_spike',
              message: `Trust surges ${(pctChange * 100).toFixed(0)}% to ${trust.toFixed(3)}`,
              significance: 'Positive behavior compounds',
            };
          } else if (trust < prev && pctChange > 0.2) {
            event = {
              tick: globalTick + t,
              lifeNumber: lifeNum,
              type: 'trust_collapse',
              message: `Trust drops ${(pctChange * 100).toFixed(0)}% to ${trust.toFixed(3)}`,
              significance: 'Trust is fragile - hard to build, easy to lose',
            };
          }
        }

        yield {
          tick: tickState,
          lifeNumber: lifeNum,
          event,
          done: false,
        };

        if (this.config.tickDelay > 0) {
          await new Promise(r => setTimeout(r, this.config.tickDelay));
        }
      }

      const life: LifeResult = {
        lifeNumber: lifeNum,
        startTick: globalTick,
        endTick: globalTick + ticks.length - 1,
        startTrust,
        endTrust: trust,
        startATP: startATP,
        endATP: atp,
        peakTrust,
        minTrust,
        tickCount: ticks.length,
        terminationReason: atp <= 0 ? 'atp_exhaustion' : 'natural_end',
        trustHistory,
        atpHistory,
        coherenceHistory,
        ticks,
        karmaEarned: (trust - startTrust) * this.config.karmaStrength,
        epLevel,
      };
      lives.push(life);
      currentTrust = trust;
      globalTick += ticks.length;
    }

    // Final yield to signal completion
    yield {
      tick: lives[lives.length - 1].ticks[lives[lives.length - 1].ticks.length - 1],
      lifeNumber: lives.length,
      done: true,
    };
  }

  // ============================================================================
  // Internal mechanics
  // ============================================================================

  private simulateLife(
    lifeNumber: number,
    globalTickOffset: number,
    startTrust: number,
    startATP: number,
    epLevel: number,
    events: SimEvent[]
  ): LifeResult {
    let trust = startTrust;
    let atp = startATP;
    const trustHistory: number[] = [trust];
    const atpHistory: number[] = [atp];
    const coherenceHistory: number[] = [];
    const ticks: TickState[] = [];
    let peakTrust = trust;
    let minTrust = trust;
    let thresholdCrossed = false;

    for (let t = 0; t < this.config.ticksPerLife; t++) {
      if (atp <= 0) break;

      const coherence = this.calculateCoherence(trustHistory);
      coherenceHistory.push(coherence);

      const action = this.chooseAction(trust, atp, coherence, epLevel);
      const effectiveSuccessRate = Math.min(0.95,
        this.config.successRate + epLevel + (this.rng() - 0.5) * this.config.noise * 2
      );
      const success = this.rng() < effectiveSuccessRate;

      atp -= action.atpCost;
      if (success) {
        atp += action.atpGain;
        trust = Math.min(1, trust + action.trustChange * (1 + coherence * this.config.coherenceWeight));
      } else {
        trust = Math.max(0, trust - this.config.trustLossRate * (1 - coherence * this.config.coherenceWeight * 0.5));
      }
      atp = Math.max(0, atp);

      peakTrust = Math.max(peakTrust, trust);
      minTrust = Math.min(minTrust, trust);
      trustHistory.push(trust);
      atpHistory.push(atp);

      ticks.push({
        tick: globalTickOffset + t,
        lifeTick: t,
        lifeNumber,
        atp,
        trust,
        coherenceIndex: coherence,
        action,
        actionSuccess: success,
        epBonus: epLevel,
        alive: atp > 0,
      });

      // Event detection
      if (!thresholdCrossed && trust >= 0.5 && startTrust < 0.5) {
        thresholdCrossed = true;
        events.push({
          tick: globalTickOffset + t,
          lifeNumber,
          type: 'threshold_crossed',
          message: `Trust crosses 0.5 threshold`,
          significance: 'Coherent agency emerges',
        });
      }

      if (atp > 0 && atp <= 10 && atpHistory[atpHistory.length - 2] > 10) {
        events.push({
          tick: globalTickOffset + t,
          lifeNumber,
          type: 'atp_crisis',
          message: `ATP crisis: ${Math.round(atp)} remaining`,
          significance: 'Running low on capacity to act',
        });
      }
    }

    return {
      lifeNumber,
      startTick: globalTickOffset,
      endTick: globalTickOffset + ticks.length - 1,
      startTrust,
      endTrust: trust,
      startATP: startATP,
      endATP: atp,
      peakTrust,
      minTrust,
      tickCount: ticks.length,
      terminationReason: atp <= 0 ? 'atp_exhaustion' : 'natural_end',
      trustHistory,
      atpHistory,
      coherenceHistory,
      ticks,
      karmaEarned: (trust - startTrust) * this.config.karmaStrength,
      epLevel,
    };
  }

  /**
   * Calculate Coherence Index from trust history.
   * CI measures behavioral consistency - low variance = high coherence.
   */
  private calculateCoherence(trustHistory: number[]): number {
    if (trustHistory.length < 3) return 0.5;

    const recent = trustHistory.slice(-10);
    const mean = recent.reduce((s, v) => s + v, 0) / recent.length;
    const variance = recent.reduce((s, v) => s + (v - mean) ** 2, 0) / recent.length;

    // Low variance = high coherence. Map to [0, 1].
    // Variance of 0.01 -> coherence ~0.9, variance of 0.1 -> coherence ~0.1
    return Math.max(0, Math.min(1, 1 - Math.sqrt(variance) * 10));
  }

  /**
   * Choose action based on current state.
   * Models strategic decision-making with EP learning.
   */
  private chooseAction(
    trust: number,
    atp: number,
    coherence: number,
    epLevel: number
  ): TickAction {
    // With EP learning, agent makes better choices over time
    const smartness = 0.5 + epLevel * 2;

    // Low ATP = conserve
    if (atp < this.config.actionCost * 3 && this.rng() < 0.3 + smartness * 0.3) {
      return {
        type: 'conserve',
        label: 'Conserving resources',
        atpCost: 1,
        atpGain: 0,
        trustChange: 0.001, // Tiny trust gain for existing
      };
    }

    // Explore (higher risk/reward)
    if (trust < 0.3 && this.rng() < 0.2 + epLevel * 0.1) {
      return {
        type: 'explore',
        label: 'Exploring new strategies',
        atpCost: this.config.actionCost * 1.5,
        atpGain: this.config.contributionReward * 1.5,
        trustChange: this.config.trustGainRate * 1.5,
      };
    }

    // Default: contribute
    return {
      type: 'contribute',
      label: 'Contributing to society',
      atpCost: this.config.actionCost,
      atpGain: this.config.contributionReward,
      trustChange: this.config.trustGainRate,
    };
  }
}
