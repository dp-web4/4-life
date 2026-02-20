/**
 * Narrative Enrichment Module
 *
 * Enhances narratives with coherence domain insights, making the 9-domain
 * framework accessible to humans through contextual explanations.
 *
 * This module EXTENDS the story generator's output with deeper insights
 * without changing its core logic.
 */

import {
  generateCoherenceInsight,
  explainTrustAsCoherence,
  explainATPAsMetabolism,
  getNineDomainSummary,
  CONSCIOUSNESS_THRESHOLD,
  ATP_CRISIS_THRESHOLD,
} from './coherence_insights';
import { SimulationEvent, EventType } from './event_detector';
import { Narrative, NarrativeEvent } from './story_generator';

// ============================================================================
// ENRICHED TYPES
// ============================================================================

export interface EnrichedNarrativeEvent extends NarrativeEvent {
  coherence_insight?: string;  // Coherence domain explanation
  context?: string;             // Additional contextual information
}

export interface EnrichedNarrative extends Narrative {
  coherence_summary?: string;   // 9-domain framework summary
  trust_analysis?: string;      // Trust as coherence analysis
  atp_analysis?: string;        // ATP as metabolism analysis
}

// ============================================================================
// ENRICHMENT ENGINE
// ============================================================================

export class NarrativeEnrichment {
  /**
   * Enrich a narrative with coherence domain insights
   */
  enrichNarrative(
    narrative: Narrative,
    lives: any[],
    events: SimulationEvent[],
    includeEvidence: boolean = false
  ): EnrichedNarrative {
    const enriched: EnrichedNarrative = {
      ...narrative,
      coherence_summary: this.shouldIncludeSummary(events) ? getNineDomainSummary() : undefined,
      trust_analysis: this.analyzeTrustEvolution(lives),
      atp_analysis: this.analyzeATPDynamics(lives),
    };

    return enriched;
  }

  /**
   * Enrich individual narrative event with coherence insights
   */
  enrichEvent(
    event: NarrativeEvent,
    simEvent: SimulationEvent,
    includeEvidence: boolean = false
  ): EnrichedNarrativeEvent {
    return {
      ...event,
      coherence_insight: generateCoherenceInsight(
        simEvent.type,
        simEvent.data,
        includeEvidence
      ),
      context: this.getEventContext(simEvent),
    };
  }

  /**
   * Determine if 9-domain summary should be included
   * Only include for complex simulations with multiple significant events
   */
  private shouldIncludeSummary(events: SimulationEvent[]): boolean {
    const significantEvents = events.filter(
      e => e.type === EventType.TRUST_THRESHOLD ||
           e.type === EventType.MATURATION ||
           e.type === EventType.REBIRTH
    );
    return significantEvents.length >= 2;
  }

  /**
   * Analyze overall trust evolution through coherence lens
   */
  private analyzeTrustEvolution(lives: any[]): string {
    if (!lives || lives.length === 0) return "";

    const initialTrust = lives[0].t3_history[0];
    const finalTrust = lives[lives.length - 1].t3_history.slice(-1)[0];
    const allTrust = lives.flatMap(life => life.t3_history);
    const avgTrust = allTrust.reduce((a, b) => a + b, 0) / allTrust.length;

    let analysis = "**Trust Evolution (Coherence Perspective)**\n\n";

    analysis += `Starting coherence: ${explainTrustAsCoherence(initialTrust)}\n\n`;
    analysis += `Ending coherence: ${explainTrustAsCoherence(finalTrust)}\n\n`;
    analysis += `Average coherence: ${avgTrust.toFixed(2)} - ${explainTrustAsCoherence(avgTrust)}\n\n`;

    // Check if trust threshold was crossed
    const crossedThreshold = allTrust.some(t => t >= CONSCIOUSNESS_THRESHOLD.value);
    if (crossedThreshold) {
      analysis += `✨ **${CONSCIOUSNESS_THRESHOLD.name} Crossed**: ${CONSCIOUSNESS_THRESHOLD.significance}\n\n`;
    }

    // Analyze trajectory
    const trustChange = finalTrust - initialTrust;
    if (trustChange > 0.1) {
      analysis += "**Growth Pattern**: Positive coherence trajectory suggests successful pattern learning and behavioral adaptation.\n";
    } else if (trustChange < -0.1) {
      analysis += "**Decline Pattern**: Negative coherence trajectory indicates unsustainable strategies or environmental mismatch.\n";
    } else {
      analysis += "**Stability Pattern**: Minimal coherence change suggests the agent found equilibrium quickly.\n";
    }

    return analysis;
  }

  /**
   * Analyze ATP dynamics through metabolic lens
   */
  private analyzeATPDynamics(lives: any[]): string {
    if (!lives || lives.length === 0) return "";

    const allATP = lives.flatMap(life => life.atp_history);
    const minATP = Math.min(...allATP);
    const maxATP = Math.max(...allATP);
    const avgATP = allATP.reduce((a, b) => a + b, 0) / allATP.length;

    let analysis = "**ATP Dynamics (Metabolic Perspective)**\n\n";

    analysis += `Metabolic range: ${minATP} to ${maxATP} ATP\n`;
    analysis += `Average metabolism: ${avgATP.toFixed(0)} ATP - ${explainATPAsMetabolism(avgATP)}\n\n`;

    // Check for crises
    const crisisPoints = allATP.filter(atp => atp <= ATP_CRISIS_THRESHOLD.value).length;
    if (crisisPoints > 0) {
      const crisisPct = (crisisPoints / allATP.length * 100).toFixed(0);
      analysis += `⚠️ **Metabolic Stress**: ${crisisPoints} ticks (${crisisPct}%) spent below crisis threshold (${ATP_CRISIS_THRESHOLD.value}). ${ATP_CRISIS_THRESHOLD.significance}\n\n`;
    }

    // Analyze volatility
    const volatility = Math.sqrt(
      allATP.reduce((sum, val) => sum + Math.pow(val - avgATP, 2), 0) / allATP.length
    );

    if (volatility < 10) {
      analysis += "**Metabolic Stability**: Low ATP volatility indicates consistent resource management.\n";
    } else if (volatility < 30) {
      analysis += "**Metabolic Variability**: Moderate ATP fluctuations suggest dynamic adaptation to opportunities and constraints.\n";
    } else {
      analysis += "**Metabolic Volatility**: High ATP swings indicate crisis/windfall cycles - boom-bust metabolism.\n";
    }

    return analysis;
  }

  /**
   * Get contextual information for specific event types
   */
  private getEventContext(event: SimulationEvent): string | undefined {
    switch (event.type) {
      case EventType.TRUST_THRESHOLD:
        if (event.data.threshold === CONSCIOUSNESS_THRESHOLD.value) {
          return `This threshold represents a phase transition — qualitatively different behavior emerges above vs below 0.5.`;
        }
        break;

      case EventType.REBIRTH:
        return "Rebirth demonstrates pattern persistence through the biophysics domain - memory encoded in karma structure carries forward through life cycles.";

      case EventType.MATURATION:
        return "Maturation is meta-learning — the agent learns what it knows and how to improve. This operates in the neuroscience coherence domain.";

      case EventType.ATP_CRISIS:
        return "ATP scarcity forces prioritization (biochemistry domain). Like biological organisms under metabolic stress, computational agents must focus on survival over exploration when energy is scarce.";

      case EventType.TRUST_COLLAPSE:
        return "Trust collapse demonstrates time asymmetry (temporal domain) - coherence builds gradually through consistent behavior but can collapse rapidly from single violation. This is the 'arrow of time' in trust dynamics.";

      default:
        return undefined;
    }
  }

  /**
   * Generate a coherence-focused summary for the entire simulation
   */
  generateCoherenceSummary(lives: any[], events: SimulationEvent[]): string {
    let summary = "## Coherence Analysis\n\n";

    // Count domain-relevant events
    const domainEvents = {
      physics: events.filter(e => e.type === EventType.TRUST_THRESHOLD).length,
      biochem: events.filter(e =>
        e.type === EventType.ATP_CRISIS ||
        e.type === EventType.ATP_WINDFALL ||
        e.type === EventType.ATP_EXHAUSTION
      ).length,
      biophysics: events.filter(e => e.type === EventType.REBIRTH).length,
      neuro: events.filter(e =>
        e.type === EventType.MATURATION ||
        e.type === EventType.PATTERN_LEARNED
      ).length,
      temporal: events.filter(e =>
        e.type === EventType.TRUST_COLLAPSE ||
        e.type === EventType.TRUST_SPIKE
      ).length,
    };

    summary += "**Active Coherence Domains in This Simulation:**\n\n";

    if (domainEvents.physics > 0) {
      summary += `- **Physics** (${domainEvents.physics} events): Phase transitions in trust coherence\n`;
    }
    if (domainEvents.biochem > 0) {
      summary += `- **Biochemistry** (${domainEvents.biochem} events): ATP metabolic dynamics\n`;
    }
    if (domainEvents.biophysics > 0) {
      summary += `- **Biophysics** (${domainEvents.biophysics} events): Memory persistence across lives\n`;
    }
    if (domainEvents.neuro > 0) {
      summary += `- **Neuroscience** (${domainEvents.neuro} events): Meta-learning and pattern recognition\n`;
    }
    if (domainEvents.temporal > 0) {
      summary += `- **Temporal Dynamics** (${domainEvents.temporal} events): Time-asymmetric trust evolution\n`;
    }

    summary += "\n";
    summary += "All events occur on coherence spacetime (Domain 9), the foundational substrate where trust and metabolism dynamics unfold.\n";

    return summary;
  }
}

// ============================================================================
// CONVENIENCE FUNCTIONS
// ============================================================================

/**
 * Quick enrichment of a narrative with coherence insights
 */
export function enrichNarrativeWithCoherence(
  narrative: Narrative,
  lives: any[],
  events: SimulationEvent[],
  includeEvidence: boolean = false
): EnrichedNarrative {
  const enricher = new NarrativeEnrichment();
  return enricher.enrichNarrative(narrative, lives, events, includeEvidence);
}

/**
 * Generate standalone coherence summary
 */
export function generateCoherenceSummary(lives: any[], events: SimulationEvent[]): string {
  const enricher = new NarrativeEnrichment();
  return enricher.generateCoherenceSummary(lives, events);
}
