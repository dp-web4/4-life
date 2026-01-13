/**
 * Pattern-Coherence Bridge
 *
 * Maps EP pattern learning contexts to the 9-domain unified coherence framework
 * (validated in HRM Sessions 177-193). This enables explaining pattern learning
 * in terms of fundamental physics.
 *
 * Key Insight: Pattern learning IS coherence learning. An agent learning what
 * works is discovering which actions maintain/increase coherence across domains.
 *
 * The 9 Domains (from HRM Session 192-193):
 * 1. Thermodynamic (entropy, temperature)
 * 2. Metabolic (ATP, phase transitions)
 * 3. Quantum (superposition, measurement)
 * 4. Magnetic (attraction, alignment)
 * 5. Electrical (charge, flow)
 * 6. Optical (attention, observation)
 * 7. Acoustic (resonance, harmonics)
 * 8. Temporal (rhythm, synchronization)
 * 9. Spacetime (curvature, geodesics)
 */

import type {
  InteractionPattern,
  PatternContext,
  EPPredictions,
  PatternOutcome,
} from "./pattern_analyzer";

// ============================================================================
// Coherence Domain Types
// ============================================================================

export interface CoherenceDomainAnalysis {
  domain: CoherenceDomain;
  present: boolean;
  coherence_estimate: number; // 0-1
  interpretation: string;
  evidence: string[];
}

export enum CoherenceDomain {
  THERMODYNAMIC = "Thermodynamic",
  METABOLIC = "Metabolic",
  QUANTUM = "Quantum",
  MAGNETIC = "Magnetic",
  ELECTRICAL = "Electrical",
  OPTICAL = "Optical",
  ACOUSTIC = "Acoustic",
  TEMPORAL = "Temporal",
  SPACETIME = "Spacetime",
}

export interface PatternCoherenceAnalysis {
  pattern_id: string;
  overall_coherence: number; // 0-1
  domains: CoherenceDomainAnalysis[];
  coherence_trajectory: "increasing" | "decreasing" | "stable" | "unknown";
  physics_explanation: string;
  learning_interpretation: string;
}

// ============================================================================
// Pattern-Coherence Mapper
// ============================================================================

export class PatternCoherenceMapper {
  /**
   * Analyze a pattern through the lens of 9-domain coherence
   */
  analyzePattern(pattern: InteractionPattern): PatternCoherenceAnalysis {
    const domains = this.mapAllDomains(pattern);
    const overallCoherence = this.computeOverallCoherence(domains);
    const trajectory = this.inferCoherenceTrajectory(pattern);

    return {
      pattern_id: pattern.pattern_id,
      overall_coherence: overallCoherence,
      domains,
      coherence_trajectory: trajectory,
      physics_explanation: this.generatePhysicsExplanation(
        pattern,
        domains,
        trajectory
      ),
      learning_interpretation: this.generateLearningInterpretation(
        pattern,
        overallCoherence,
        trajectory
      ),
    };
  }

  /**
   * Map pattern context to all 9 coherence domains
   */
  private mapAllDomains(
    pattern: InteractionPattern
  ): CoherenceDomainAnalysis[] {
    return [
      this.mapThermodynamic(pattern),
      this.mapMetabolic(pattern),
      this.mapQuantum(pattern),
      this.mapMagnetic(pattern),
      this.mapElectrical(pattern),
      this.mapOptical(pattern),
      this.mapAcoustic(pattern),
      this.mapTemporal(pattern),
      this.mapSpacetime(pattern),
    ];
  }

  // ============================================================================
  // Domain 1: Thermodynamic (Entropy, Temperature)
  // ============================================================================

  private mapThermodynamic(
    pattern: InteractionPattern
  ): CoherenceDomainAnalysis {
    const context = pattern.context;
    const predictions = pattern.ep_predictions;
    const outcome = pattern.outcome;

    // Coherence from EP confidence (high confidence = low entropy = high coherence)
    // S = -log(C) → C_thermo = exp(-S)
    const avgConfidence = this.getAverageConfidence(predictions);
    const entropy = -Math.log(avgConfidence + 0.01); // Avoid log(0)
    const coherence = Math.exp(-entropy);

    const evidence: string[] = [];
    evidence.push(`Average EP confidence: ${(avgConfidence * 100).toFixed(1)}%`);
    evidence.push(`Estimated entropy: S = ${entropy.toFixed(3)}`);

    // Temperature from frustration (emotional context)
    if (context.emotional && "current_frustration" in context.emotional) {
      const frustration = context.emotional.current_frustration as number;
      evidence.push(`Frustration level: ${(frustration * 100).toFixed(1)}%`);
    }

    let interpretation = "";
    if (coherence > 0.7) {
      interpretation =
        "High coherence: Low entropy state, confident predictions, thermodynamically stable";
    } else if (coherence > 0.4) {
      interpretation =
        "Medium coherence: Moderate entropy, some uncertainty, exploring phase space";
    } else {
      interpretation =
        "Low coherence: High entropy, low confidence, thermodynamically unstable";
    }

    return {
      domain: CoherenceDomain.THERMODYNAMIC,
      present: true,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 2: Metabolic (ATP, Phase Transitions)
  // ============================================================================

  private mapMetabolic(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const context = pattern.context;
    const outcome = pattern.outcome;

    const evidence: string[] = [];
    let coherence = 0.5; // Default

    // ATP from attention context
    if (context.attention && "atp_available" in context.attention) {
      const atp = context.attention.atp_available as number;
      const atpCost = (context.attention.atp_cost as number) || 0;

      // Coherence from ATP sufficiency: C = sigmoid((ATP - cost - reserve) / reserve)
      const reserve = (context.attention.atp_reserve_needed as number) || 20;
      const surplus = atp - atpCost - reserve;
      coherence = 1 / (1 + Math.exp(-surplus / reserve)); // Sigmoid

      evidence.push(`ATP available: ${atp.toFixed(1)}`);
      evidence.push(`ATP cost: ${atpCost.toFixed(1)}`);
      evidence.push(`Metabolic surplus: ${surplus.toFixed(1)}`);

      // Detect phase transitions
      if (atp < 20) {
        evidence.push("⚠️ ATP crisis threshold (<20)");
      } else if (atp < 50) {
        evidence.push("Metabolic stress (20-50 ATP)");
      } else if (atp > 80) {
        evidence.push("Metabolic abundance (>80 ATP)");
      }
    }

    // Outcome feedback
    if (outcome) {
      const atpConsumed = outcome.atp_consumed;
      evidence.push(`ATP actually consumed: ${atpConsumed.toFixed(1)}`);
    }

    let interpretation = "";
    if (coherence > 0.7) {
      interpretation =
        "Metabolic abundance: Sufficient ATP, stable phase, can afford exploration";
    } else if (coherence > 0.3) {
      interpretation =
        "Metabolic balance: ATP adequate but constrained, careful decision-making";
    } else {
      interpretation =
        "Metabolic crisis: ATP depleted, phase transition imminent, survival mode";
    }

    return {
      domain: CoherenceDomain.METABOLIC,
      present: context.attention !== undefined,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 3: Quantum (Superposition, Measurement)
  // ============================================================================

  private mapQuantum(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const predictions = pattern.ep_predictions;
    const decision = pattern.coordinated_decision;

    const evidence: string[] = [];

    // Quantum coherence from superposition of domain predictions
    // If domains disagree → high superposition → quantum coherence
    const disagreement = decision?.disagreement_detected || false;
    const consensusStrength = decision?.consensus_strength || 1.0;

    // Coherence from measurement collapse quality
    // High consensus = clean measurement, Low consensus = entangled
    const coherence = disagreement ? 1 - consensusStrength : consensusStrength;

    evidence.push(
      `Domain consensus: ${(consensusStrength * 100).toFixed(1)}%`
    );
    if (disagreement) {
      evidence.push("⚠️ Domain disagreement detected (superposition)");
    }

    // Count how many domains contributed
    const domainCount = Object.keys(predictions).length;
    evidence.push(`${domainCount} domains in superposition`);

    let interpretation = "";
    if (disagreement) {
      interpretation =
        "Quantum superposition: Multiple valid states, measurement needed to collapse wavefunction";
    } else if (consensusStrength > 0.8) {
      interpretation =
        "Quantum measurement: Clean collapse, definite eigenstate, low entanglement";
    } else {
      interpretation =
        "Quantum decoherence: Partial collapse, mixed state, environmental interaction";
    }

    return {
      domain: CoherenceDomain.QUANTUM,
      present: domainCount > 1,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 4: Magnetic (Trust Attraction, Alignment)
  // ============================================================================

  private mapMagnetic(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const context = pattern.context;
    const outcome = pattern.outcome;

    const evidence: string[] = [];
    let coherence = 0.5;

    // Trust from quality context
    if (context.quality && "current_relationship_quality" in context.quality) {
      const relationshipQuality = context.quality
        .current_relationship_quality as number;
      const trustAlignment = (context.quality.trust_alignment as number) || 0;

      // Coherence from trust-quality alignment
      coherence = (relationshipQuality + trustAlignment) / 2;

      evidence.push(
        `Relationship quality (trust): ${(relationshipQuality * 100).toFixed(1)}%`
      );
      evidence.push(
        `Trust alignment: ${(trustAlignment * 100).toFixed(1)}%`
      );

      // Magnetic interpretation
      if (relationshipQuality > 0.6) {
        evidence.push("Strong trust attraction (magnetic alignment)");
      } else if (relationshipQuality < 0.3) {
        evidence.push("Weak trust (magnetic repulsion)");
      }
    }

    // Trust change from outcome
    if (outcome) {
      const t3Change = outcome.t3_change;
      evidence.push(`Trust (T3) change: ${t3Change >= 0 ? "+" : ""}${t3Change.toFixed(3)}`);
    }

    let interpretation = "";
    if (coherence > 0.6) {
      interpretation =
        "Magnetic alignment: High trust, strong attraction, agents naturally cooperate";
    } else if (coherence > 0.3) {
      interpretation =
        "Magnetic uncertainty: Medium trust, weak field, alignment depends on context";
    } else {
      interpretation =
        "Magnetic misalignment: Low trust, repulsion, agents avoid interaction";
    }

    return {
      domain: CoherenceDomain.MAGNETIC,
      present: context.quality !== undefined,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 5: Electrical (Charge Flow, Current)
  // ============================================================================

  private mapElectrical(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const context = pattern.context;
    const outcome = pattern.outcome;

    const evidence: string[] = [];
    let coherence = 0.5;

    // ATP flow as electrical current
    if (context.attention) {
      const atpAvailable = (context.attention.atp_available as number) || 0;
      const atpCost = (context.attention.atp_cost as number) || 0;
      const expectedBenefit =
        (context.attention.expected_benefit as number) || 0;

      // Current = benefit - cost
      const current = expectedBenefit - atpCost;
      const voltage = atpAvailable; // Potential

      // Coherence from positive current flow
      coherence = current > 0 ? Math.min(1, current / 50) : 0;

      evidence.push(`ATP potential (voltage): ${voltage.toFixed(1)}`);
      evidence.push(`ATP flow (current): ${current.toFixed(1)}`);
      evidence.push(
        `Expected return: ${expectedBenefit.toFixed(1)} ATP`
      );
    }

    let interpretation = "";
    if (coherence > 0.6) {
      interpretation =
        "Electrical flow: Positive current, energy gain, charging system";
    } else if (coherence > 0.2) {
      interpretation =
        "Electrical balance: Neutral current, energy conserved, equilibrium";
    } else {
      interpretation =
        "Electrical drain: Negative current, energy loss, discharging system";
    }

    return {
      domain: CoherenceDomain.ELECTRICAL,
      present: context.attention !== undefined,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 6: Optical (Attention, Observation)
  // ============================================================================

  private mapOptical(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const predictions = pattern.ep_predictions;

    const evidence: string[] = [];

    // Attention from prediction confidence (observer clarity)
    const avgConfidence = this.getAverageConfidence(predictions);
    const coherence = avgConfidence;

    evidence.push(
      `Observer confidence (clarity): ${(avgConfidence * 100).toFixed(1)}%`
    );

    // Multiple domains = multiple observation angles
    const domainCount = Object.keys(predictions).length;
    evidence.push(`${domainCount} observation perspectives`);

    let interpretation = "";
    if (coherence > 0.7) {
      interpretation =
        "Optical clarity: Sharp observation, focused attention, clear signal";
    } else if (coherence > 0.4) {
      interpretation =
        "Optical diffusion: Blurred observation, scattered attention, noisy signal";
    } else {
      interpretation =
        "Optical opacity: Obscured observation, unfocused attention, no signal";
    }

    return {
      domain: CoherenceDomain.OPTICAL,
      present: true,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 7: Acoustic (Resonance, Harmony)
  // ============================================================================

  private mapAcoustic(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const decision = pattern.coordinated_decision;
    const predictions = pattern.ep_predictions;

    const evidence: string[] = [];

    // Resonance from consensus (domains in harmony)
    const consensusStrength = decision?.consensus_strength || 0;
    const coherence = consensusStrength;

    evidence.push(
      `Domain resonance (consensus): ${(consensusStrength * 100).toFixed(1)}%`
    );

    // Disagreement = dissonance
    if (decision?.disagreement_detected) {
      evidence.push("⚠️ Acoustic dissonance (disagreement)");
    }

    // Count domains at different frequencies (recommendations)
    const recommendations = Object.values(predictions).map(
      (p) => p?.recommended_action
    );
    const uniqueRecs = new Set(recommendations);
    evidence.push(
      `${uniqueRecs.size} distinct frequencies (recommendations)`
    );

    let interpretation = "";
    if (coherence > 0.8 && !decision?.disagreement_detected) {
      interpretation =
        "Acoustic harmony: Domains resonate, constructive interference, amplified signal";
    } else if (coherence > 0.5) {
      interpretation =
        "Acoustic consonance: Partial resonance, mixed harmonics, moderate signal";
    } else {
      interpretation =
        "Acoustic dissonance: Domains clash, destructive interference, weak signal";
    }

    return {
      domain: CoherenceDomain.ACOUSTIC,
      present: Object.keys(predictions).length > 1,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 8: Temporal (Rhythm, Synchronization)
  // ============================================================================

  private mapTemporal(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const context = pattern.context;
    const outcome = pattern.outcome;

    const evidence: string[] = [];
    let coherence = 0.5;

    // Temporal coherence from prediction-outcome alignment
    if (outcome && outcome.predictions_accurate) {
      const accuracies = Object.values(outcome.predictions_accurate);
      const accurateCount = accuracies.filter((a) => a === true).length;
      coherence = accurateCount / accuracies.length;

      evidence.push(
        `Prediction-outcome synchronization: ${(coherence * 100).toFixed(1)}%`
      );
    }

    // Recent failure rate indicates temporal pattern
    if (
      context.emotional &&
      "recent_failure_rate" in context.emotional
    ) {
      const failureRate = context.emotional.recent_failure_rate as number;
      evidence.push(
        `Recent failure rhythm: ${(failureRate * 100).toFixed(1)}%`
      );
    }

    let interpretation = "";
    if (coherence > 0.7) {
      interpretation =
        "Temporal synchronization: Past patterns predict future, stable rhythm, phase-locked";
    } else if (coherence > 0.4) {
      interpretation =
        "Temporal drift: Partial correlation with past, unstable rhythm, phase slipping";
    } else {
      interpretation =
        "Temporal chaos: No correlation with past, arrhythmic, phase incoherent";
    }

    return {
      domain: CoherenceDomain.TEMPORAL,
      present: outcome !== undefined,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Domain 9: Spacetime (Curvature, Geodesics)
  // ============================================================================

  private mapSpacetime(pattern: InteractionPattern): CoherenceDomainAnalysis {
    const context = pattern.context;
    const decision = pattern.coordinated_decision;
    const outcome = pattern.outcome;

    const evidence: string[] = [];
    let coherence = 0.5;

    // Curvature from trust gradient (magnetic domain)
    if (context.quality && "current_relationship_quality" in context.quality) {
      const trust = context.quality.current_relationship_quality as number;

      // High trust = high curvature (attracts interactions)
      coherence = trust;

      evidence.push(
        `Trust curvature: ${(trust * 100).toFixed(1)}% (social spacetime geometry)`
      );

      // Cascade risk = geodesic deviation
      if (decision) {
        const cascadeRisk = decision.cascade_risk;
        evidence.push(
          `Geodesic stability: ${((1 - cascadeRisk) * 100).toFixed(1)}%`
        );
      }
    }

    // Success = following geodesic (path of least proper time)
    if (outcome) {
      const success = outcome.success;
      evidence.push(
        success
          ? "Followed geodesic (optimal trajectory)"
          : "Deviated from geodesic (suboptimal path)"
      );
    }

    let interpretation = "";
    if (coherence > 0.6) {
      interpretation =
        "Spacetime geometry: High curvature, strong geodesics, interactions naturally converge";
    } else if (coherence > 0.3) {
      interpretation =
        "Flat spacetime: Low curvature, weak geodesics, paths arbitrary";
    } else {
      interpretation =
        "Negative curvature: Repulsive geometry, diverging geodesics, interactions avoid region";
    }

    return {
      domain: CoherenceDomain.SPACETIME,
      present: context.quality !== undefined,
      coherence_estimate: coherence,
      interpretation,
      evidence,
    };
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private getAverageConfidence(predictions: EPPredictions): number {
    const values = Object.values(predictions);
    if (values.length === 0) return 0;

    const sum = values.reduce(
      (acc, pred) => acc + (pred?.confidence || 0),
      0
    );
    return sum / values.length;
  }

  private computeOverallCoherence(
    domains: CoherenceDomainAnalysis[]
  ): number {
    const present = domains.filter((d) => d.present);
    if (present.length === 0) return 0;

    const sum = present.reduce((acc, d) => acc + d.coherence_estimate, 0);
    return sum / present.length;
  }

  private inferCoherenceTrajectory(
    pattern: InteractionPattern
  ): "increasing" | "decreasing" | "stable" | "unknown" {
    const outcome = pattern.outcome;
    if (!outcome) return "unknown";

    const success = outcome.success;
    const t3Change = outcome.t3_change;

    // Success and positive trust = increasing coherence
    if (success && t3Change > 0.01) return "increasing";

    // Failure and negative trust = decreasing coherence
    if (!success && t3Change < -0.01) return "decreasing";

    // Success but trust unchanged = stable
    if (success && Math.abs(t3Change) <= 0.01) return "stable";

    return "unknown";
  }

  private generatePhysicsExplanation(
    pattern: InteractionPattern,
    domains: CoherenceDomainAnalysis[],
    trajectory: string
  ): string {
    const present = domains.filter((d) => d.present);
    const avgCoherence = this.computeOverallCoherence(domains);

    let explanation = `This pattern exhibits ${present.length} coherence domains. `;

    if (avgCoherence > 0.6) {
      explanation +=
        "High overall coherence indicates a stable, well-understood situation. ";
    } else if (avgCoherence > 0.3) {
      explanation +=
        "Medium coherence indicates partial understanding with some uncertainty. ";
    } else {
      explanation +=
        "Low coherence indicates high uncertainty and exploration needed. ";
    }

    explanation += `Coherence is ${trajectory}. `;

    // Highlight dominant domain
    const maxDomain = present.reduce((max, d) =>
      d.coherence_estimate > max.coherence_estimate ? d : max
    );
    explanation += `Dominated by ${maxDomain.domain} domain (${(maxDomain.coherence_estimate * 100).toFixed(0)}%).`;

    return explanation;
  }

  private generateLearningInterpretation(
    pattern: InteractionPattern,
    coherence: number,
    trajectory: string
  ): string {
    let interpretation = "";

    if (trajectory === "increasing") {
      interpretation =
        "This pattern represents successful learning. The agent's epistemic model is becoming more coherent - it better understands what works in this situation. ";
    } else if (trajectory === "decreasing") {
      interpretation =
        "This pattern reveals a learning opportunity. Coherence decreased, meaning the agent's predictions were inaccurate. This surprise is valuable data. ";
    } else if (trajectory === "stable") {
      interpretation =
        "This pattern confirms existing knowledge. Coherence remained stable, indicating the agent's model already captured this situation well. ";
    } else {
      interpretation =
        "This pattern's learning trajectory is unclear. More data needed to assess epistemic progress. ";
    }

    if (coherence > 0.6) {
      interpretation +=
        "High confidence suggests this knowledge is reliable and can guide future decisions.";
    } else {
      interpretation +=
        "Low confidence suggests this knowledge is tentative and should be validated with more experience.";
    }

    return interpretation;
  }
}
