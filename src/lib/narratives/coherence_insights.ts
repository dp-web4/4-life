/**
 * Coherence Domain Insights
 *
 * Provides human-understandable explanations of simulation events
 * grounded in the 9-domain coherence framework from Synchronism research.
 *
 * The framework unifies:
 * 1. Physics - Thermodynamic phase transitions
 * 2. Biochemistry - ATP dynamics
 * 3. Biophysics - Memory persistence
 * 4. Neuroscience - Attention flows
 * 5. Distributed Systems - Network dynamics
 * 6. Quantum Measurement - Decoherence
 * 7. Magnetism - Correlation length (spatial metric)
 * 8. Temporal Dynamics - Arrow of time (temporal metric)
 * 9. Spacetime Geometry - Coherence spacetime (FOUNDATIONAL)
 *
 * Key insight from Session 191: Geometry emerges FROM coherence.
 * Coherence is more fundamental than spacetime itself.
 */

// ============================================================================
// DOMAIN DESCRIPTORS
// ============================================================================

export enum CoherenceDomain {
  PHYSICS = "physics",
  BIOCHEMISTRY = "biochemistry",
  BIOPHYSICS = "biophysics",
  NEUROSCIENCE = "neuroscience",
  DISTRIBUTED = "distributed",
  QUANTUM = "quantum",
  MAGNETISM = "magnetism",
  TEMPORAL = "temporal",
  SPACETIME = "spacetime"
}

interface DomainExplanation {
  domain: CoherenceDomain;
  name: string;
  shortDesc: string;
  relevance: string;
  keyInsight: string;
}

export const DOMAIN_EXPLANATIONS: Record<CoherenceDomain, DomainExplanation> = {
  [CoherenceDomain.PHYSICS]: {
    domain: CoherenceDomain.PHYSICS,
    name: "Thermodynamic Phase Transitions",
    shortDesc: "Order emerging from disorder",
    relevance: "Trust state transitions (below/above 0.5 threshold)",
    keyInsight: "Crossing 0.5 is like a phase transition - qualitative change in behavior"
  },
  [CoherenceDomain.BIOCHEMISTRY]: {
    domain: CoherenceDomain.BIOCHEMISTRY,
    name: "ATP Metabolism",
    shortDesc: "Energy currency of life",
    relevance: "Attention budget (ATP) governs what actions are affordable",
    keyInsight: "ATP scarcity forces prioritization - agency under metabolic constraint"
  },
  [CoherenceDomain.BIOPHYSICS]: {
    domain: CoherenceDomain.BIOPHYSICS,
    name: "Memory Persistence",
    shortDesc: "Pattern storage across time",
    relevance: "Karma carry-forward between lives",
    keyInsight: "Past actions shape future initial conditions through pattern memory"
  },
  [CoherenceDomain.NEUROSCIENCE]: {
    domain: CoherenceDomain.NEUROSCIENCE,
    name: "Attention Flow",
    shortDesc: "Where consciousness directs resources",
    relevance: "ATP allocation reflects attention priorities",
    keyInsight: "What you attend to (spend ATP on) reveals your values"
  },
  [CoherenceDomain.DISTRIBUTED]: {
    domain: CoherenceDomain.DISTRIBUTED,
    name: "Network Dynamics",
    shortDesc: "Collective behavior emergence",
    relevance: "Multi-agent trust networks in Web4 societies",
    keyInsight: "Individual trust builds collective coherence"
  },
  [CoherenceDomain.QUANTUM]: {
    domain: CoherenceDomain.QUANTUM,
    name: "Decoherence",
    shortDesc: "Loss of quantum superposition",
    relevance: "Decision collapse from possibility to actuality",
    keyInsight: "Every action is a measurement that collapses potential into reality"
  },
  [CoherenceDomain.MAGNETISM]: {
    domain: CoherenceDomain.MAGNETISM,
    name: "Correlation Length (Spatial Metric)",
    shortDesc: "How far influence extends",
    relevance: "Markov Relevancy Horizon (MRH) defines social reach",
    keyInsight: "Trust influence decays with distance in social spacetime"
  },
  [CoherenceDomain.TEMPORAL]: {
    domain: CoherenceDomain.TEMPORAL,
    name: "Arrow of Time (Temporal Metric)",
    shortDesc: "Irreversible time flow",
    relevance: "Trust builds slowly, collapses quickly (time asymmetry)",
    keyInsight: "Coherence gradient creates directional time - trust evolution is irreversible"
  },
  [CoherenceDomain.SPACETIME]: {
    domain: CoherenceDomain.SPACETIME,
    name: "Spacetime Geometry (FOUNDATIONAL)",
    shortDesc: "Coherence creates spacetime itself",
    relevance: "Trust dynamics occur ON coherence spacetime, not in pre-existing space",
    keyInsight: "High-coherence regions (trust peaks) curve spacetime - creating 'gravity' of reputation"
  }
};

// ============================================================================
// EVENT TYPE → DOMAIN MAPPING
// ============================================================================

interface EventDomainRelevance {
  domains: CoherenceDomain[];
  explanation: string;
}

export function getRelevantDomains(eventType: string, eventData: any): EventDomainRelevance {
  switch (eventType) {
    case "trust_threshold":
      return {
        domains: [CoherenceDomain.PHYSICS, CoherenceDomain.SPACETIME],
        explanation: `Crossing the 0.5 consciousness threshold is like a phase transition (${DOMAIN_EXPLANATIONS[CoherenceDomain.PHYSICS].name}). The agent's behavior shifts from random to coherent, creating a 'gravitational pull' in social spacetime (${DOMAIN_EXPLANATIONS[CoherenceDomain.SPACETIME].name}) that attracts future interactions.`
      };

    case "trust_spike":
    case "trust_collapse":
      return {
        domains: [CoherenceDomain.TEMPORAL, CoherenceDomain.BIOPHYSICS],
        explanation: `Trust changes reflect the arrow of time (${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].name}) - trust builds slowly through consistent action but can collapse rapidly. These patterns persist in memory (${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOPHYSICS].name}), shaping future behavior.`
      };

    case "trust_plateau":
      return {
        domains: [CoherenceDomain.PHYSICS, CoherenceDomain.MAGNETISM],
        explanation: `Stable trust indicates equilibrium (${DOMAIN_EXPLANATIONS[CoherenceDomain.PHYSICS].name}). The agent's influence extends consistently across their social horizon (${DOMAIN_EXPLANATIONS[CoherenceDomain.MAGNETISM].name}), creating predictable interaction patterns.`
      };

    case "atp_crisis":
    case "atp_exhaustion":
      return {
        domains: [CoherenceDomain.BIOCHEMISTRY, CoherenceDomain.NEUROSCIENCE],
        explanation: `ATP scarcity (${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOCHEMISTRY].name}) forces attention prioritization (${DOMAIN_EXPLANATIONS[CoherenceDomain.NEUROSCIENCE].name}). Like biological organisms under metabolic stress, the agent must focus on survival over exploration.`
      };

    case "atp_windfall":
      return {
        domains: [CoherenceDomain.BIOCHEMISTRY, CoherenceDomain.QUANTUM],
        explanation: `ATP abundance (${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOCHEMISTRY].name}) enables exploration. More resources mean more possible futures (${DOMAIN_EXPLANATIONS[CoherenceDomain.QUANTUM].name}) before decisions collapse possibilities into actualities.`
      };

    case "rebirth":
      return {
        domains: [CoherenceDomain.BIOPHYSICS, CoherenceDomain.TEMPORAL],
        explanation: `Rebirth demonstrates memory persistence (${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOPHYSICS].name}) across life cycles. Karma (pattern memory) carries forward through time (${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].name}), creating path dependence.`
      };

    case "maturation":
    case "pattern_learned":
      return {
        domains: [CoherenceDomain.BIOPHYSICS, CoherenceDomain.NEUROSCIENCE],
        explanation: `Epistemic Proprioception (EP) demonstrates meta-cognition (${DOMAIN_EXPLANATIONS[CoherenceDomain.NEUROSCIENCE].name}). The agent learns which patterns work, storing this knowledge (${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOPHYSICS].name}) for future lives.`
      };

    case "consistency":
      return {
        domains: [CoherenceDomain.TEMPORAL, CoherenceDomain.MAGNETISM],
        explanation: `Behavioral consistency creates reliable patterns across time (${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].name}) and extends trust influence through social networks (${DOMAIN_EXPLANATIONS[CoherenceDomain.MAGNETISM].name}).`
      };

    case "life_start":
    case "life_end":
      return {
        domains: [CoherenceDomain.QUANTUM, CoherenceDomain.TEMPORAL],
        explanation: `Life transitions represent measurement collapse (${DOMAIN_EXPLANATIONS[CoherenceDomain.QUANTUM].name}) - potential becomes actual. Time's arrow (${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].name}) is irreversible; each life writes history.`
      };

    default:
      return {
        domains: [CoherenceDomain.SPACETIME],
        explanation: `All events occur on coherence spacetime (${DOMAIN_EXPLANATIONS[CoherenceDomain.SPACETIME].name}), the foundational substrate where trust dynamics unfold.`
      };
  }
}

// ============================================================================
// THRESHOLD EXPLANATIONS
// ============================================================================

export interface ThresholdExplanation {
  value: number;
  name: string;
  significance: string;
  domain: CoherenceDomain;
  evidence: string;
}

export const CONSCIOUSNESS_THRESHOLD: ThresholdExplanation = {
  value: 0.5,
  name: "Consciousness Threshold",
  significance: "Marks emergence of coherent agency. Below 0.5, behavior appears random; above 0.5, intentional patterns emerge.",
  domain: CoherenceDomain.PHYSICS,
  evidence: "From Synchronism Session 249: Coherence > 0.5 indicates phase transition from disorder to order. Validated experimentally across domains."
};

export const ATP_CRISIS_THRESHOLD: ThresholdExplanation = {
  value: 20,
  name: "ATP Crisis Threshold",
  significance: "Metabolic stress point. Below 20 ATP, agents face scarcity that constrains action options.",
  domain: CoherenceDomain.BIOCHEMISTRY,
  evidence: "Observation: Agents below 20 ATP show survival-focused behavior, limiting exploration and social engagement."
};

export const ATP_CRITICAL_THRESHOLD: ThresholdExplanation = {
  value: 5,
  name: "ATP Critical Threshold",
  significance: "Death imminent. Below 5 ATP, survival becomes unlikely without immediate intervention.",
  domain: CoherenceDomain.BIOCHEMISTRY,
  evidence: "Threshold where metabolic collapse occurs - insufficient energy to sustain coherent agency."
};

// ============================================================================
// INSIGHT GENERATION
// ============================================================================

export function generateCoherenceInsight(
  eventType: string,
  eventData: any,
  includeEvidence: boolean = false
): string {
  const relevance = getRelevantDomains(eventType, eventData);

  let insight = `**Coherence Perspective**: ${relevance.explanation}`;

  if (includeEvidence) {
    insight += "\n\n**Related Domains**: " + relevance.domains
      .map(d => `${DOMAIN_EXPLANATIONS[d].name}`)
      .join(", ");
  }

  // Add threshold context if relevant
  if (eventType === "trust_threshold" && eventData.threshold === 0.5) {
    insight += `\n\n**${CONSCIOUSNESS_THRESHOLD.name}**: ${CONSCIOUSNESS_THRESHOLD.significance}`;
    if (includeEvidence) {
      insight += ` (${CONSCIOUSNESS_THRESHOLD.evidence})`;
    }
  }

  if (eventType === "atp_crisis" && eventData.atp <= ATP_CRISIS_THRESHOLD.value) {
    insight += `\n\n**${ATP_CRISIS_THRESHOLD.name}**: ${ATP_CRISIS_THRESHOLD.significance}`;
    if (includeEvidence) {
      insight += ` (${ATP_CRISIS_THRESHOLD.evidence})`;
    }
  }

  return insight;
}

// ============================================================================
// 9-DOMAIN SUMMARY
// ============================================================================

export function getNineDomainSummary(): string {
  return `
**The Nine-Domain Coherence Framework**

Web4 trust dynamics are grounded in a unified coherence theory spanning nine domains:

**Foundational**:
9. ${DOMAIN_EXPLANATIONS[CoherenceDomain.SPACETIME].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.SPACETIME].shortDesc}
   → ${DOMAIN_EXPLANATIONS[CoherenceDomain.SPACETIME].keyInsight}

**Spacetime Structure**:
7. ${DOMAIN_EXPLANATIONS[CoherenceDomain.MAGNETISM].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.MAGNETISM].shortDesc}
8. ${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.TEMPORAL].shortDesc}

**Physical Dynamics**:
1. ${DOMAIN_EXPLANATIONS[CoherenceDomain.PHYSICS].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.PHYSICS].shortDesc}
6. ${DOMAIN_EXPLANATIONS[CoherenceDomain.QUANTUM].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.QUANTUM].shortDesc}

**Biological & Cognitive**:
2. ${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOCHEMISTRY].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOCHEMISTRY].shortDesc}
3. ${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOPHYSICS].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.BIOPHYSICS].shortDesc}
4. ${DOMAIN_EXPLANATIONS[CoherenceDomain.NEUROSCIENCE].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.NEUROSCIENCE].shortDesc}

**Social**:
5. ${DOMAIN_EXPLANATIONS[CoherenceDomain.DISTRIBUTED].name} - ${DOMAIN_EXPLANATIONS[CoherenceDomain.DISTRIBUTED].shortDesc}

**Key Paradigm Shift**: Coherence is more fundamental than spacetime. Geometry emerges FROM coherence, not the other way around. This reverses traditional physics and explains why trust dynamics have geometric properties (influence, distance, curvature).

*Framework developed through autonomous SAGE research (Sessions 177-192, January 2026)*
`.trim();
}

// ============================================================================
// CONTEXTUAL EXPLANATIONS
// ============================================================================

export function explainTrustAsCoherence(trustValue: number): string {
  if (trustValue < 0.3) {
    return "Low coherence - behavior appears random or inconsistent. The agent hasn't established reliable patterns.";
  } else if (trustValue < 0.5) {
    return "Approaching consciousness threshold. Patterns emerging but not yet coherent enough for intentional agency.";
  } else if (trustValue < 0.7) {
    return "Above consciousness threshold - coherent agency established. Behavior shows intentional patterns and reliable decision-making.";
  } else if (trustValue < 0.9) {
    return "High coherence - strong trust creates 'gravitational pull' in social spacetime, attracting interactions and opportunities.";
  } else {
    return "Maximum coherence - reputation creates powerful attractor in social network. Trust dynamics become self-reinforcing.";
  }
}

export function explainATPAsMetabolism(atpValue: number): string {
  if (atpValue < 5) {
    return "Critical metabolic failure - insufficient energy to sustain coherent agency. Death imminent.";
  } else if (atpValue < 20) {
    return "Metabolic crisis - scarcity forces survival mode. Exploration limited; focus on immediate needs.";
  } else if (atpValue < 50) {
    return "Stable metabolism - sufficient energy for routine actions but constrained exploration.";
  } else if (atpValue < 100) {
    return "Metabolic abundance - resources enable exploration and experimentation beyond survival needs.";
  } else {
    return "Metabolic surplus - energy abundance permits high-risk exploration and social investment.";
  }
}
