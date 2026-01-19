/**
 * Event Detection for 4-Life Simulations
 *
 * This module identifies "interesting moments" in Web4 simulations - the events
 * that matter to humans trying to understand trust dynamics.
 *
 * Philosophy: Humans don't care about every tick. They care about:
 * - Critical moments (death, rebirth, crises)
 * - Dramatic changes (trust collapse, ATP windfall)
 * - Patterns (cycles, maturation, learning)
 * - Milestones (thresholds crossed, achievements)
 *
 * The detector finds these moments so the story generator can narrate them.
 */

// ============================================================================
// Types
// ============================================================================

export interface LifeRecord {
  life_id: string;
  agent_lct: string;
  start_tick: number;
  end_tick: number;
  life_state: string;
  termination_reason: string;
  t3_history: number[];
  atp_history: number[];
}

export interface SimulationEvent {
  type: EventType;
  severity: EventSeverity;
  tick: number;
  life_id?: string;
  life_number?: number;
  description: string;
  data: Record<string, any>;
}

export enum EventType {
  // Life cycle events
  LIFE_START = "life_start",
  LIFE_END = "life_end",
  REBIRTH = "rebirth",

  // Trust events
  TRUST_SPIKE = "trust_spike",
  TRUST_COLLAPSE = "trust_collapse",
  TRUST_PLATEAU = "trust_plateau",
  TRUST_THRESHOLD = "trust_threshold",

  // ATP (attention) events
  ATP_CRISIS = "atp_crisis",
  ATP_WINDFALL = "atp_windfall",
  ATP_STABILIZED = "atp_stabilized",
  ATP_EXHAUSTION = "atp_exhaustion",

  // Pattern events
  PATTERN_LEARNED = "pattern_learned",
  MATURATION = "maturation",
  CONSISTENCY = "consistency",
  BREAKTHROUGH = "breakthrough",

  // Crisis events
  DEATH_IMMINENT = "death_imminent",
  RECOVERY = "recovery",
  DOWNWARD_SPIRAL = "downward_spiral",
}

export enum EventSeverity {
  CRITICAL = "critical",  // Death, rebirth, major crises
  HIGH = "high",          // Dramatic changes
  MEDIUM = "medium",      // Notable events
  LOW = "low",            // Minor fluctuations
}

// ============================================================================
// Event Detector
// ============================================================================

export class EventDetector {
  // Thresholds for detecting significant changes
  private static readonly TRUST_SPIKE_THRESHOLD = 0.15; // 15% increase
  private static readonly TRUST_COLLAPSE_THRESHOLD = 0.20; // 20% decrease
  private static readonly ATP_CRISIS_THRESHOLD = 20; // Below 20 ATP
  private static readonly ATP_CRITICAL_THRESHOLD = 5; // Below 5 ATP (death imminent)
  private static readonly ATP_WINDFALL_THRESHOLD = 50; // Gained 50+ ATP

  /**
   * Detect all interesting events in a simulation
   */
  detectEvents(lives: LifeRecord[]): SimulationEvent[] {
    const events: SimulationEvent[] = [];

    for (let i = 0; i < lives.length; i++) {
      const life = lives[i];
      const prevLife = i > 0 ? lives[i - 1] : null;

      // Life cycle events
      events.push(...this.detectLifeCycleEvents(life, prevLife, i + 1));

      // Trust dynamics
      events.push(...this.detectTrustEvents(life, i + 1));

      // ATP dynamics
      events.push(...this.detectATPEvents(life, i + 1));

      // Pattern detection
      events.push(...this.detectPatternEvents(life, prevLife, i + 1));
    }

    // Sort by tick
    events.sort((a, b) => a.tick - b.tick);

    return events;
  }

  /**
   * Detect life cycle events (birth, death, rebirth)
   */
  private detectLifeCycleEvents(
    life: LifeRecord,
    prevLife: LifeRecord | null,
    lifeNumber: number
  ): SimulationEvent[] {
    const events: SimulationEvent[] = [];

    // Life start
    if (lifeNumber === 1) {
      events.push({
        type: EventType.LIFE_START,
        severity: EventSeverity.CRITICAL,
        tick: life.start_tick,
        life_id: life.life_id,
        life_number: lifeNumber,
        description: "First life begins",
        data: {
          initial_trust: life.t3_history[0],
          initial_atp: life.atp_history[0],
        },
      });
    }

    // Rebirth (not first life)
    if (lifeNumber > 1 && prevLife) {
      const trustGain = life.t3_history[0] - prevLife.t3_history[prevLife.t3_history.length - 1];
      const atpCarried = life.atp_history[0];

      events.push({
        type: EventType.REBIRTH,
        severity: EventSeverity.CRITICAL,
        tick: life.start_tick,
        life_id: life.life_id,
        life_number: lifeNumber,
        description: `Rebirth ${lifeNumber}: Karma manifests`,
        data: {
          prev_life_final_trust: prevLife.t3_history[prevLife.t3_history.length - 1],
          new_life_initial_trust: life.t3_history[0],
          trust_gain: trustGain,
          atp_carried: atpCarried,
          termination_reason: prevLife.termination_reason,
        },
      });
    }

    // Life end
    if (life.life_state === "dead" || life.termination_reason !== "none") {
      events.push({
        type: EventType.LIFE_END,
        severity: EventSeverity.CRITICAL,
        tick: life.end_tick,
        life_id: life.life_id,
        life_number: lifeNumber,
        description: `Life ${lifeNumber} ends: ${life.termination_reason}`,
        data: {
          final_trust: life.t3_history[life.t3_history.length - 1],
          final_atp: life.atp_history[life.atp_history.length - 1],
          termination_reason: life.termination_reason,
          duration: life.end_tick - life.start_tick,
        },
      });
    }

    return events;
  }

  /**
   * Detect significant trust changes
   */
  private detectTrustEvents(life: LifeRecord, lifeNumber: number): SimulationEvent[] {
    const events: SimulationEvent[] = [];
    const t3 = life.t3_history;

    for (let i = 1; i < t3.length; i++) {
      const prev = t3[i - 1];
      const curr = t3[i];
      const change = curr - prev;
      const pctChange = Math.abs(change / prev);
      const tick = life.start_tick + i;

      // Trust spike (significant increase)
      if (change > 0 && pctChange >= EventDetector.TRUST_SPIKE_THRESHOLD) {
        events.push({
          type: EventType.TRUST_SPIKE,
          severity: EventSeverity.HIGH,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: `Trust surges by ${(pctChange * 100).toFixed(0)}%`,
          data: {
            prev_trust: prev,
            new_trust: curr,
            change,
            percent_change: pctChange,
          },
        });
      }

      // Trust collapse (significant decrease)
      if (change < 0 && pctChange >= EventDetector.TRUST_COLLAPSE_THRESHOLD) {
        events.push({
          type: EventType.TRUST_COLLAPSE,
          severity: EventSeverity.CRITICAL,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: `Trust collapses by ${(pctChange * 100).toFixed(0)}%`,
          data: {
            prev_trust: prev,
            new_trust: curr,
            change,
            percent_change: pctChange,
          },
        });
      }

      // Threshold crossings (0.5 = consciousness threshold from Synchronism)
      if (prev < 0.5 && curr >= 0.5) {
        events.push({
          type: EventType.TRUST_THRESHOLD,
          severity: EventSeverity.HIGH,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: "Trust crosses consciousness threshold (0.5)",
          data: {
            threshold: 0.5,
            prev_trust: prev,
            new_trust: curr,
          },
        });
      }
    }

    // Detect plateau (trust stable for long period)
    const windowSize = 5;
    if (t3.length >= windowSize) {
      for (let i = windowSize; i < t3.length; i++) {
        const window = t3.slice(i - windowSize, i);
        const variance = this.calculateVariance(window);

        if (variance < 0.001) { // Very stable
          events.push({
            type: EventType.TRUST_PLATEAU,
            severity: EventSeverity.MEDIUM,
            tick: life.start_tick + i,
            life_id: life.life_id,
            life_number: lifeNumber,
            description: "Trust stabilizes",
            data: {
              stable_value: t3[i],
              window_size: windowSize,
              variance,
            },
          });
          break; // Only report first plateau
        }
      }
    }

    return events;
  }

  /**
   * Detect ATP (attention) dynamics
   */
  private detectATPEvents(life: LifeRecord, lifeNumber: number): SimulationEvent[] {
    const events: SimulationEvent[] = [];
    const atp = life.atp_history;

    for (let i = 1; i < atp.length; i++) {
      const prev = atp[i - 1];
      const curr = atp[i];
      const change = curr - prev;
      const tick = life.start_tick + i;

      // ATP crisis (low attention)
      if (curr <= EventDetector.ATP_CRISIS_THRESHOLD && curr > EventDetector.ATP_CRITICAL_THRESHOLD) {
        events.push({
          type: EventType.ATP_CRISIS,
          severity: EventSeverity.HIGH,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: `ATP crisis: Only ${Math.round(curr)} attention remaining`,
          data: {
            current_atp: Math.round(curr),
            change: Math.round(change),
          },
        });
      }

      // Death imminent (critical ATP)
      if (curr <= EventDetector.ATP_CRITICAL_THRESHOLD) {
        events.push({
          type: EventType.DEATH_IMMINENT,
          severity: EventSeverity.CRITICAL,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: `Death imminent: ATP at ${Math.round(curr)}`,
          data: {
            current_atp: Math.round(curr),
            change: Math.round(change),
          },
        });
      }

      // ATP windfall (large gain)
      if (change >= EventDetector.ATP_WINDFALL_THRESHOLD) {
        events.push({
          type: EventType.ATP_WINDFALL,
          severity: EventSeverity.HIGH,
          tick,
          life_id: life.life_id,
          life_number: lifeNumber,
          description: `ATP windfall: Gained ${Math.round(change)} attention`,
          data: {
            prev_atp: Math.round(prev),
            current_atp: Math.round(curr),
            gain: Math.round(change),
          },
        });
      }
    }

    return events;
  }

  /**
   * Detect patterns across lives (maturation, learning, consistency)
   */
  private detectPatternEvents(
    life: LifeRecord,
    prevLife: LifeRecord | null,
    lifeNumber: number
  ): SimulationEvent[] {
    const events: SimulationEvent[] = [];

    if (!prevLife) return events;

    // Maturation: Trust improves across lives
    const prevFinalTrust = prevLife.t3_history[prevLife.t3_history.length - 1];
    const currFinalTrust = life.t3_history[life.t3_history.length - 1];

    if (currFinalTrust > prevFinalTrust && currFinalTrust - prevFinalTrust > 0.05) {
      events.push({
        type: EventType.MATURATION,
        severity: EventSeverity.HIGH,
        tick: life.end_tick,
        life_id: life.life_id,
        life_number: lifeNumber,
        description: "Maturation detected: Trust grows across lives",
        data: {
          prev_final_trust: prevFinalTrust,
          curr_final_trust: currFinalTrust,
          improvement: currFinalTrust - prevFinalTrust,
        },
      });
    }

    // Consistency: Similar performance across lives
    const prevAvgTrust = this.calculateAverage(prevLife.t3_history);
    const currAvgTrust = this.calculateAverage(life.t3_history);
    const diff = Math.abs(currAvgTrust - prevAvgTrust);

    if (diff < 0.02) { // Very similar
      events.push({
        type: EventType.CONSISTENCY,
        severity: EventSeverity.MEDIUM,
        tick: life.end_tick,
        life_id: life.life_id,
        life_number: lifeNumber,
        description: "Consistent performance across lives",
        data: {
          prev_avg_trust: prevAvgTrust,
          curr_avg_trust: currAvgTrust,
          difference: diff,
        },
      });
    }

    return events;
  }

  // ============================================================================
  // Utilities
  // ============================================================================

  private calculateAverage(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private calculateVariance(values: number[]): number {
    const avg = this.calculateAverage(values);
    const squaredDiffs = values.map(val => Math.pow(val - avg, 2));
    return this.calculateAverage(squaredDiffs);
  }
}
