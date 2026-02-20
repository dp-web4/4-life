/**
 * Story Generator for 4-Life Simulations
 *
 * Converts simulation events into human-readable narratives.
 *
 * Philosophy: Humans understand stories, not data structures.
 * We translate technical events into narrative arcs that reveal
 * the drama of trust dynamics, karma, and epistemic learning.
 *
 * Core narrative elements:
 * - Character: The agent (with personality from behavior)
 * - Conflict: ATP crises, trust collapses, death
 * - Resolution: Maturation, learning, rebirth
 * - Theme: Trust as earned, not given; karma as consequence
 */

import {
  SimulationEvent,
  EventType,
  EventSeverity,
  LifeRecord,
  ActionRecord,
} from "./event_detector";

// ============================================================================
// Types
// ============================================================================

export interface Narrative {
  title: string;
  summary: string;
  acts: NarrativeAct[];
  themes: string[];
  key_insights: string[];
}

export interface NarrativeAct {
  title: string;
  events: NarrativeEvent[];
  commentary?: string;
}

export interface NarrativeEvent {
  timestamp: string; // Human-readable time
  description: string;
  technical_detail?: string; // Optional technical aside
  significance: string; // Why this matters
}

// ============================================================================
// Story Generator
// ============================================================================

export class StoryGenerator {
  /**
   * Generate a complete narrative from simulation events
   */
  generateNarrative(
    lives: LifeRecord[],
    events: SimulationEvent[]
  ): Narrative {
    // Extract agent name
    const agentName = this.extractAgentName(lives[0].agent_lct);

    // Group events into narrative acts (life cycles)
    const acts = this.groupEventsIntoActs(lives, events);

    // Identify key themes
    const themes = this.identifyThemes(events);

    // Extract insights
    const insights = this.extractInsights(lives, events);

    // Generate title and summary
    const title = this.generateTitle(agentName, lives.length, themes);
    const summary = this.generateSummary(agentName, lives, events, themes);

    return {
      title,
      summary,
      acts,
      themes,
      key_insights: insights,
    };
  }

  /**
   * Group events into narrative acts (typically one act per life)
   */
  private groupEventsIntoActs(
    lives: LifeRecord[],
    events: SimulationEvent[]
  ): NarrativeAct[] {
    const acts: NarrativeAct[] = [];

    for (let i = 0; i < lives.length; i++) {
      const life = lives[i];
      const lifeNumber = i + 1;

      // Find events for this life
      const lifeEvents = events.filter(
        (e) => e.life_number === lifeNumber
      );

      // Convert to narrative events
      const narrativeEvents = lifeEvents.map((e) =>
        this.eventToNarrative(e, lifeNumber)
      );

      // Create act
      const act: NarrativeAct = {
        title: this.generateActTitle(lifeNumber, life, lifeEvents),
        events: narrativeEvents,
      };

      // Add commentary if significant patterns
      if (this.hasSignificantPatterns(lifeEvents)) {
        act.commentary = this.generateActCommentary(
          lifeNumber,
          life,
          lifeEvents
        );
      }

      acts.push(act);
    }

    return acts;
  }

  /**
   * Convert technical event to narrative event
   */
  private eventToNarrative(
    event: SimulationEvent,
    lifeNumber: number
  ): NarrativeEvent {
    const significance = this.explainSignificance(event);
    let description = this.narrateEvent(event);

    // If the event has agent reasoning, lead with it as a quote — it's the most vivid part
    if (event.agent_reasoning && event.type !== EventType.STRATEGY_SHIFT && event.type !== EventType.DECISION_SUMMARY) {
      description = `"${event.agent_reasoning}" — ${description}`;
    }

    return {
      timestamp: this.formatTimestamp(event.tick, lifeNumber),
      description,
      technical_detail: this.getTechnicalDetail(event),
      significance,
    };
  }

  /**
   * Narrate a simulation event in human language
   */
  private narrateEvent(event: SimulationEvent): string {
    switch (event.type) {
      case EventType.LIFE_START:
        return this.narrateLifeStart(event);

      case EventType.REBIRTH:
        return this.narrateRebirth(event);

      case EventType.LIFE_END:
        return this.narrateLifeEnd(event);

      case EventType.TRUST_SPIKE:
        return this.narrateTrustSpike(event);

      case EventType.TRUST_COLLAPSE:
        return this.narrateTrustCollapse(event);

      case EventType.TRUST_THRESHOLD:
        return this.narrateTrustThreshold(event);

      case EventType.TRUST_PLATEAU:
        return this.narrateTrustPlateau(event);

      case EventType.ATP_CRISIS:
        return this.narrateATPCrisis(event);

      case EventType.ATP_WINDFALL:
        return this.narrateATPWindfall(event);

      case EventType.DEATH_IMMINENT:
        return this.narrateDeathImminent(event);

      case EventType.MATURATION:
        return this.narrateMaturation(event);

      case EventType.CONSISTENCY:
        return this.narrateConsistency(event);

      case EventType.STRATEGY_SHIFT:
        return this.narrateStrategyShift(event);

      case EventType.DECISION_SUMMARY:
        return this.narrateDecisionSummary(event);

      default:
        return event.description;
    }
  }

  // ============================================================================
  // Event Narratives (Human-Readable)
  // ============================================================================

  private narrateLifeStart(event: SimulationEvent): string {
    const trust = event.data.initial_trust?.toFixed(2) || "unknown";
    const atp = event.data.initial_atp || "unknown";

    return `A new agent enters with ${atp} ATP and trust of ${trust}. They're unproven — everything must be earned from here.`;
  }

  private narrateRebirth(event: SimulationEvent): string {
    const trustGain = event.data.trust_gain?.toFixed(3);
    const prevTrust = event.data.prev_life_final_trust?.toFixed(2);
    const newTrust = event.data.new_life_initial_trust?.toFixed(2);

    if (trustGain && parseFloat(trustGain) > 0) {
      return `Reborn with karma. Consistent behavior in the last life earned a trust boost of ${trustGain} — starting this life at ${newTrust} (up from ${prevTrust}). The past matters here.`;
    } else if (trustGain && parseFloat(trustGain) < 0) {
      return `Reborn. Karma carries a small penalty (${trustGain}), starting trust at ${newTrust}. The slate isn't fully clean — but there's room to prove otherwise.`;
    } else {
      return `Reborn at trust ${newTrust}. No karma bonus this time — a fresh start with neutral standing.`;
    }
  }

  private narrateLifeEnd(event: SimulationEvent): string {
    const reason = event.data.termination_reason;
    const finalTrust = event.data.final_trust?.toFixed(2);
    const finalATP = event.data.final_atp;
    const duration = event.data.duration;

    if (reason === "atp_exhaustion") {
      return `ATP hits zero — the agent's energy is spent. Final trust: ${finalTrust} after ${duration} ticks. This trust carries forward into the next life.`;
    } else if (reason === "none" || reason === "simulation_end") {
      return `Life ${event.life_number} concludes naturally. Final trust: ${finalTrust}, remaining ATP: ${finalATP}. A stable end suggests sustainable behavior patterns.`;
    } else {
      return `Life ends: ${reason}. Final trust: ${finalTrust}, ATP: ${finalATP}. Duration: ${duration} ticks.`;
    }
  }

  private narrateTrustSpike(event: SimulationEvent): string {
    const pct = (event.data.percent_change * 100).toFixed(0);
    const newTrust = event.data.new_trust?.toFixed(2);

    return `Trust surges ${pct}% to ${newTrust}! Something clicked — the agent's actions resonated.`;
  }

  private narrateTrustCollapse(event: SimulationEvent): string {
    const pct = (event.data.percent_change * 100).toFixed(0);
    const newTrust = event.data.new_trust?.toFixed(2);

    return `Trust collapses ${pct}%, dropping to ${newTrust}. Something went wrong — and the society noticed.`;
  }

  private narrateTrustThreshold(event: SimulationEvent): string {
    return `Trust crosses 0.50 — the threshold for full community access. The agent's behavior has been consistent enough that society now recognizes them as reliable. Opportunities that were closed before now open up.`;
  }

  private narrateTrustPlateau(event: SimulationEvent): string {
    const value = event.data.stable_value?.toFixed(2);

    return `Trust stabilizes at ${value}. The agent has found a sustainable pattern of behavior. This plateau suggests they've reached equilibrium between their capabilities and society's expectations.`;
  }

  private narrateATPCrisis(event: SimulationEvent): string {
    const atp = this.formatNumber(event.data.current_atp);

    return `ATP crisis: Only ${atp} energy left. The agent is burning out — they need to earn more through contribution, or they won't survive.`;
  }

  private narrateATPWindfall(event: SimulationEvent): string {
    const gain = this.formatNumber(event.data.gain);
    const current = this.formatNumber(event.data.current_atp);

    return `ATP windfall! +${gain} energy (now at ${current}). The agent's contribution was valued — the society paid attention.`;
  }

  private narrateDeathImminent(event: SimulationEvent): string {
    const atp = this.formatNumber(event.data.current_atp);

    return `Death approaches. ATP at ${atp} and falling. Without a contribution that earns energy back, this life is over.`;
  }

  private narrateMaturation(event: SimulationEvent): string {
    const improvement = event.data.improvement?.toFixed(3);
    const currTrust = event.data.curr_final_trust?.toFixed(2);

    return `The agent is getting better. Final trust of ${currTrust} exceeds the previous life by ${improvement}. Lessons are carrying forward — wisdom accumulates across lives.`;
  }

  private narrateConsistency(event: SimulationEvent): string {
    return `Remarkable consistency — this life's trust trajectory closely matches the last. The agent found a reliable pattern and is executing it precisely.`;
  }

  private narrateStrategyShift(event: SimulationEvent): string {
    const from = event.data.from_action || "unknown";
    const to = event.data.to_action || "unknown";
    const atp = this.formatNumber(event.data.atp_at_shift);
    const trust = event.data.trust_at_shift?.toFixed(2);

    let narrative = `The agent shifts strategy — from ${this.humanizeActionType(from)} to ${this.humanizeActionType(to)}. `;
    narrative += `At this moment, ATP is at ${atp} and trust at ${trust}. `;

    if (event.agent_reasoning) {
      narrative += `The agent's own assessment: "${event.agent_reasoning}"`;
    }

    return narrative;
  }

  private narrateDecisionSummary(event: SimulationEvent): string {
    const counts = event.data.action_counts || {};
    const totalSpent = this.formatNumber(event.data.total_atp_spent);
    const dominant = event.data.dominant_strategy;
    const totalActions = event.data.total_actions || 0;

    const breakdown = Object.entries(counts)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([type, count]) => `${this.humanizeActionType(type)} ${count}x`)
      .join(", ");

    let narrative = `Over ${totalActions} decisions, the agent spent ${totalSpent} ATP total. `;
    narrative += `Decision breakdown: ${breakdown}. `;

    if (dominant) {
      const pct = Math.round(((event.data.dominant_count || 0) / totalActions) * 100);
      narrative += `Primary strategy: ${this.humanizeActionType(dominant)} (${pct}% of decisions).`;
    }

    return narrative;
  }

  private humanizeActionType(actionType: string): string {
    const map: Record<string, string> = {
      risky_spend: "risky spending",
      small_spend: "cautious spending",
      conservative_audit: "conservative auditing",
      no_action: "waiting",
      social_interaction: "socializing",
      learning_action: "learning",
      contribution: "contributing",
    };
    return map[actionType] || actionType.replace(/_/g, " ");
  }

  // ============================================================================
  // Technical Details (For Interested Readers)
  // ============================================================================

  private getTechnicalDetail(event: SimulationEvent): string | undefined {
    switch (event.type) {
      case EventType.TRUST_THRESHOLD:
        return "The 0.5 threshold is a design choice: below this level, behavior appears too inconsistent to distinguish from noise. Above it, the pattern is clear enough for the society to extend full trust.";

      case EventType.REBIRTH:
        return `Karma mechanism: trust_gain = ${event.data.trust_gain?.toFixed(4)}, calculated from coherence index of previous life's behavior pattern.`;

      case EventType.MATURATION:
        return "Cross-life learning: the agent internalizes patterns from previous lives, gradually improving decision-making through experience.";

      case EventType.ATP_EXHAUSTION:
        return "ATP (Allocation Transfer Packet) represents metabolic budget. All actions cost ATP. Gain ATP through valuable contribution (ADP - Allocation Discharge Packet).";

      case EventType.STRATEGY_SHIFT:
        return `Strategy shift from ${event.data.from_action} to ${event.data.to_action} at ATP=${Math.round(event.data.atp_at_shift)}, T3=${event.data.trust_at_shift?.toFixed(3)}`;

      case EventType.DECISION_SUMMARY: {
        const counts = event.data.action_counts || {};
        return `Action distribution: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(", ")}`;
      }

      default:
        return undefined;
    }
  }

  // ============================================================================
  // Significance Explanations
  // ============================================================================

  private explainSignificance(event: SimulationEvent): string {
    switch (event.type) {
      case EventType.LIFE_START:
        return "First impressions matter. Initial trust sets expectations.";

      case EventType.REBIRTH:
        return "Past actions shape future starting conditions. The society remembers.";

      case EventType.LIFE_END: {
        const finalTrust = event.data.final_trust;
        if (finalTrust !== undefined && finalTrust >= 0.5) {
          return "The life ends, but the trust earned carries forward. A legacy for the next incarnation.";
        }
        return "Death resets ATP but not reputation. What was earned — or lost — persists.";
      }

      case EventType.TRUST_SPIKE:
        return "Consistent positive behavior compounds.";

      case EventType.TRUST_COLLAPSE:
        return "Trust is hard to build and easy to lose.";

      case EventType.TRUST_THRESHOLD:
        return "A turning point: the agent crosses from unproven to trusted.";

      case EventType.TRUST_PLATEAU:
        return "Equilibrium found. The agent's behavior has settled into a consistent pattern.";

      case EventType.ATP_CRISIS:
        return "Running on empty. Every action costs energy, and this agent is running out.";

      case EventType.ATP_WINDFALL:
        return "A contribution paid off. The society rewards value with energy.";

      case EventType.DEATH_IMMINENT:
        return "The clock is ticking. Without income, this life ends soon.";

      case EventType.MATURATION:
        return "The agent is getting better across lives. Lessons compound.";

      case EventType.CONSISTENCY:
        return "Mastery: a reliable strategy, executed precisely.";

      case EventType.STRATEGY_SHIFT:
        return "Adaptation in action: The agent reads its situation and changes approach.";

      case EventType.DECISION_SUMMARY:
        return "The full picture of how the agent allocated its attention across this life.";

      default:
        return "Part of the ongoing trust dynamics.";
    }
  }

  // ============================================================================
  // Theme Identification
  // ============================================================================

  private identifyThemes(events: SimulationEvent[]): string[] {
    const themes: string[] = [];

    // Check for karma theme (rebirth events)
    if (events.some((e) => e.type === EventType.REBIRTH)) {
      themes.push("Karma and Consequences");
    }

    // Check for learning theme (maturation events)
    if (events.some((e) => e.type === EventType.MATURATION)) {
      themes.push("Epistemic Learning");
    }

    // Check for crisis/recovery theme
    if (
      events.some((e) => e.type === EventType.ATP_CRISIS) &&
      events.some((e) => e.type === EventType.ATP_WINDFALL)
    ) {
      themes.push("Crisis and Recovery");
    }

    // Check for trust dynamics
    if (
      events.some((e) => e.type === EventType.TRUST_COLLAPSE) ||
      events.some((e) => e.type === EventType.TRUST_SPIKE)
    ) {
      themes.push("Trust Volatility");
    }

    // Check for stability
    if (
      events.some((e) => e.type === EventType.TRUST_PLATEAU) ||
      events.some((e) => e.type === EventType.CONSISTENCY)
    ) {
      themes.push("Equilibrium and Stability");
    }

    // Check for strategic adaptation
    if (events.some((e) => e.type === EventType.STRATEGY_SHIFT)) {
      themes.push("Strategic Adaptation");
    }

    // Default theme
    if (themes.length === 0) {
      themes.push("Trust Dynamics");
    }

    return themes;
  }

  // ============================================================================
  // Insight Extraction
  // ============================================================================

  private extractInsights(
    lives: LifeRecord[],
    events: SimulationEvent[]
  ): string[] {
    const insights: string[] = [];

    // Trust progression insight
    const firstLife = lives[0];
    const lastLife = lives[lives.length - 1];
    const firstTrust = firstLife.t3_history[0];
    const lastTrust = lastLife.t3_history[lastLife.t3_history.length - 1];
    const trustGrowth = lastTrust - firstTrust;

    if (trustGrowth > 0.1) {
      insights.push(
        `Strong trust growth: ${firstTrust.toFixed(2)} → ${lastTrust.toFixed(2)} over ${lives.length} lives (+${(trustGrowth * 100).toFixed(0)}%). The agent demonstrated consistent learning and improvement.`
      );
    } else if (trustGrowth < -0.1) {
      insights.push(
        `Trust declined: ${firstTrust.toFixed(2)} → ${lastTrust.toFixed(2)} over ${lives.length} lives (${(trustGrowth * 100).toFixed(0)}%). The agent struggled to maintain consistent behavior.`
      );
    } else {
      insights.push(
        `Trust remained stable: ${firstTrust.toFixed(2)} → ${lastTrust.toFixed(2)} over ${lives.length} lives. The agent found equilibrium quickly.`
      );
    }

    // Maturation insight
    const maturationEvents = events.filter(
      (e) => e.type === EventType.MATURATION
    );
    if (maturationEvents.length > 0) {
      insights.push(
        `Epistemic learning observed: ${maturationEvents.length} instances of cross-life improvement. The agent is discovering what works through experience.`
      );
    }

    // Crisis management insight
    const crises = events.filter((e) => e.type === EventType.ATP_CRISIS);
    const windfalls = events.filter((e) => e.type === EventType.ATP_WINDFALL);
    if (crises.length > 0 && windfalls.length > 0) {
      insights.push(
        `Resilience demonstrated: Navigated ${crises.length} ATP crises with ${windfalls.length} recovery events. The agent adapts to adversity.`
      );
    }

    // Threshold crossing insight
    const thresholdCrossings = events.filter(
      (e) => e.type === EventType.TRUST_THRESHOLD
    );
    if (thresholdCrossings.length > 0) {
      insights.push(
        `Trust threshold crossed in life ${thresholdCrossings[0].life_number}. Behavior shifts from reactive to intentional — full community access unlocked.`
      );
    }

    // Strategy adaptation insight
    const strategyShifts = events.filter(
      (e) => e.type === EventType.STRATEGY_SHIFT
    );
    if (strategyShifts.length > 0) {
      const shiftsPerLife = new Map<number, number>();
      for (const shift of strategyShifts) {
        if (shift.life_number) {
          shiftsPerLife.set(shift.life_number, (shiftsPerLife.get(shift.life_number) || 0) + 1);
        }
      }
      const totalShifts = strategyShifts.length;
      const avgPerLife = (totalShifts / lives.length).toFixed(1);
      insights.push(
        `Strategic adaptation: ${totalShifts} strategy shifts detected across ${lives.length} lives (avg ${avgPerLife}/life). The agent actively adapts its approach based on ATP levels and trust feedback, switching between risk-taking and conservation.`
      );
    }

    // Decision profile insight (from summaries)
    const summaries = events.filter((e) => e.type === EventType.DECISION_SUMMARY);
    if (summaries.length > 0) {
      const lastSummary = summaries[summaries.length - 1];
      const dominant = lastSummary.data.dominant_strategy;
      if (dominant) {
        const pct = Math.round(((lastSummary.data.dominant_count || 0) / (lastSummary.data.total_actions || 1)) * 100);
        insights.push(
          `In the final life, ${this.humanizeActionType(dominant)} dominated at ${pct}% of decisions — revealing the agent's evolved strategy after learning from previous lives.`
        );
      }
    }

    return insights;
  }

  // ============================================================================
  // Title and Summary Generation
  // ============================================================================

  private generateTitle(
    agentName: string,
    lifeCount: number,
    themes: string[]
  ): string {
    const primaryTheme = themes[0] || "Trust Journey";

    if (lifeCount === 1) {
      return `${agentName}: A Single Life in Web4`;
    } else {
      return `${agentName}: ${lifeCount} Lives of ${primaryTheme}`;
    }
  }

  private generateSummary(
    agentName: string,
    lives: LifeRecord[],
    events: SimulationEvent[],
    themes: string[]
  ): string {
    const lifeCount = lives.length;
    const firstTrust = lives[0].t3_history[0].toFixed(2);
    const lastTrust =
      lives[lives.length - 1].t3_history[
        lives[lives.length - 1].t3_history.length - 1
      ].toFixed(2);

    const totalTicks =
      lives[lives.length - 1].end_tick - lives[0].start_tick;

    const criticalEvents = events.filter(
      (e) =>
        e.severity === EventSeverity.CRITICAL ||
        e.severity === EventSeverity.HIGH
    ).length;

    let summary = `This simulation follows ${agentName} through ${lifeCount} ${
      lifeCount === 1 ? "life" : "lives"
    } spanning ${totalTicks} ticks. `;

    summary += `Starting with trust of ${firstTrust} and ending at ${lastTrust}, the agent `;

    const trustChange = parseFloat(lastTrust) - parseFloat(firstTrust);
    if (trustChange > 0.1) {
      summary += `demonstrated significant growth, `;
    } else if (trustChange < -0.1) {
      summary += `struggled to maintain trust, `;
    } else {
      summary += `maintained stable behavior, `;
    }

    summary += `experiencing ${criticalEvents} major events along the way. `;

    summary += `Key themes include: ${themes.join(", ")}. `;

    summary += `This narrative illustrates core Web4 principles: trust is earned through consistent behavior, actions have lasting consequences (karma), and agents can learn and improve across multiple lives through cross-life learning.`;

    return summary;
  }

  // ============================================================================
  // Act Generation
  // ============================================================================

  private generateActTitle(
    lifeNumber: number,
    life: LifeRecord,
    events: SimulationEvent[]
  ): string {
    const finalTrust =
      life.t3_history[life.t3_history.length - 1].toFixed(2);

    // Find dominant event type
    const criticalEvents = events.filter(
      (e) =>
        e.severity === EventSeverity.CRITICAL ||
        e.severity === EventSeverity.HIGH
    );

    if (criticalEvents.length === 0) {
      return `Life ${lifeNumber}: Steady Progress (Trust: ${finalTrust})`;
    }

    // Categorize the life — check most distinctive patterns first
    const hasCrisis = events.some((e) => e.type === EventType.ATP_CRISIS);
    const hasCollapse = events.some((e) => e.type === EventType.TRUST_COLLAPSE);
    const hasMaturation = events.some((e) => e.type === EventType.MATURATION);
    const hasWindfall = events.some((e) => e.type === EventType.ATP_WINDFALL);
    const hasConsistency = events.some((e) => e.type === EventType.CONSISTENCY);
    const hasThreshold = events.some((e) => e.type === EventType.TRUST_THRESHOLD);

    if (hasMaturation) {
      return `Life ${lifeNumber}: Breakthrough (Trust: ${finalTrust})`;
    } else if (hasConsistency) {
      return `Life ${lifeNumber}: Mastery (Trust: ${finalTrust})`;
    } else if (hasCollapse && hasWindfall) {
      return `Life ${lifeNumber}: Crisis and Recovery (Trust: ${finalTrust})`;
    } else if (hasCollapse) {
      return `Life ${lifeNumber}: Setback (Trust: ${finalTrust})`;
    } else if (hasThreshold && hasCrisis) {
      return `Life ${lifeNumber}: Proving Ground (Trust: ${finalTrust})`;
    } else if (hasCrisis) {
      return `Life ${lifeNumber}: Adversity (Trust: ${finalTrust})`;
    } else if (hasWindfall) {
      return `Life ${lifeNumber}: Success (Trust: ${finalTrust})`;
    } else {
      return `Life ${lifeNumber}: Development (Trust: ${finalTrust})`;
    }
  }

  private hasSignificantPatterns(events: SimulationEvent[]): boolean {
    return events.some(
      (e) =>
        e.type === EventType.MATURATION ||
        e.type === EventType.CONSISTENCY ||
        e.type === EventType.TRUST_THRESHOLD
    );
  }

  private generateActCommentary(
    lifeNumber: number,
    life: LifeRecord,
    events: SimulationEvent[]
  ): string {
    const maturationEvent = events.find(
      (e) => e.type === EventType.MATURATION
    );
    const thresholdEvent = events.find(
      (e) => e.type === EventType.TRUST_THRESHOLD
    );
    const consistencyEvent = events.find(
      (e) => e.type === EventType.CONSISTENCY
    );

    if (maturationEvent) {
      return "The agent carried forward lessons from previous lives and applied them successfully, achieving measurably better outcomes. Not external records — internalized wisdom that compounds across lives.";
    } else if (consistencyEvent) {
      // Consistency is more interesting than threshold for commentary — prioritize it
      return "The remarkable consistency across lives suggests the agent has found a stable attractor — a behavioral pattern that works reliably. This isn't mechanical repetition, but the demonstration of a generalizable strategy.";
    } else if (thresholdEvent) {
      // Vary commentary by life number to avoid identical text across acts
      if (lifeNumber === 1) {
        return "Crossing the 0.5 trust threshold is a turning point. Below it, behavior looks random or reactive. Above it, coherent patterns emerge — the agent acts with genuine intentionality.";
      } else if (lifeNumber === 2) {
        return "The threshold crossed again — the agent has to re-earn trust each life. But this time, the path to 0.5 feels more deliberate. The agent knows the territory.";
      } else {
        return "By now the threshold crossing is routine. The agent has internalized what it takes to earn trust. The real question is what happens above the threshold — that's where the interesting dynamics live.";
      }
    }

    return "";
  }

  // ============================================================================
  // Utilities
  // ============================================================================

  private extractAgentName(lct: string): string {
    // Extract readable name from LCT
    // e.g., "lct:web4:agent:bob" -> "Bob"
    const parts = lct.split(":");
    const name = parts[parts.length - 1];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private formatTimestamp(tick: number, lifeNumber: number): string {
    return `Life ${lifeNumber}, Tick ${tick}`;
  }

  /**
   * Format a number for human display, avoiding ugly floating point artifacts
   * e.g., 15.799999999999997 -> 16 or 15.8
   */
  private formatNumber(value: any): string {
    if (typeof value !== 'number') return String(value);

    // For ATP values (typically integers), round to nearest integer
    if (value > 1) {
      return Math.round(value).toString();
    }

    // For small values (like trust), use 2 decimal places
    return value.toFixed(2);
  }
}
