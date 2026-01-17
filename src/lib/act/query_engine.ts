/**
 * ACT Query Engine
 *
 * Conversational interface to simulation understanding.
 * Uses pattern matching + pre-generated responses for reliability.
 *
 * Philosophy:
 * - Start simple: Pattern matching beats LLM complexity for MVP
 * - Pre-generate responses: Faster, more reliable than live LLM
 * - Focus on understanding: "Why?" beats "What?" for learning
 * - Progressive revelation: Start concrete, build to abstractions
 *
 * Query Types:
 * 1. Event explanation: "Why did trust drop at tick 14?"
 * 2. Comparison: "How does Web4 differ from baseline?"
 * 3. Pattern learning: "What did the agent learn in life 2?"
 * 4. Concept explanation: "What is ATP?" / "Explain trust tensors"
 * 5. Exploration guidance: "What should I look at next?"
 */

import type { SimulationResult, LifeCycle, ActionRecord } from '@/lib/types';

export interface Query {
  text: string;
  type: QueryType;
  context?: QueryContext;
}

export type QueryType =
  | 'event_explanation'
  | 'comparison'
  | 'pattern_learning'
  | 'concept_explanation'
  | 'exploration_guidance'
  | 'general';

export interface QueryContext {
  simulation?: SimulationResult;
  selectedTick?: number;
  selectedLife?: number;
  comparisonSimulation?: SimulationResult;
}

export interface Response {
  text: string;
  type: 'explanation' | 'suggestion' | 'error';
  relatedConcepts?: string[];
  suggestedQueries?: string[];
  visualizationHint?: 'trust_chart' | 'atp_chart' | 'timeline' | 'comparison';
}

/**
 * Main query processing engine
 */
export class ACTQueryEngine {

  /**
   * Process a natural language query about simulations
   */
  processQuery(query: Query): Response {
    // Classify query if type not specified
    if (query.type === 'general') {
      query.type = this.classifyQuery(query.text);
    }

    // Route to specialized handler
    switch (query.type) {
      case 'event_explanation':
        return this.explainEvent(query);
      case 'comparison':
        return this.compareSimulations(query);
      case 'pattern_learning':
        return this.explainPatternLearning(query);
      case 'concept_explanation':
        return this.explainConcept(query);
      case 'exploration_guidance':
        return this.suggestExploration(query);
      default:
        return this.handleGeneral(query);
    }
  }

  /**
   * Classify query based on keywords and patterns
   */
  private classifyQuery(text: string): QueryType {
    const lower = text.toLowerCase();

    // Event explanation patterns
    if (
      lower.includes('why did') ||
      lower.includes('what happened') ||
      lower.includes('explain this') ||
      /tick \d+/.test(lower) ||
      /life \d+/.test(lower)
    ) {
      return 'event_explanation';
    }

    // Comparison patterns
    if (
      lower.includes('compare') ||
      lower.includes('difference') ||
      lower.includes('vs') ||
      lower.includes('web4 vs') ||
      lower.includes('baseline')
    ) {
      return 'comparison';
    }

    // Pattern learning patterns
    if (
      lower.includes('learn') ||
      lower.includes('pattern') ||
      lower.includes('improve') ||
      lower.includes('ep') ||
      lower.includes('epistemic')
    ) {
      return 'pattern_learning';
    }

    // Concept explanation patterns
    if (
      lower.includes('what is') ||
      lower.includes('explain') ||
      lower.includes('how does') ||
      lower.includes('atp') ||
      lower.includes('trust') ||
      lower.includes('karma')
    ) {
      return 'concept_explanation';
    }

    // Exploration guidance patterns
    if (
      lower.includes('what should') ||
      lower.includes('where to') ||
      lower.includes('next') ||
      lower.includes('interesting')
    ) {
      return 'exploration_guidance';
    }

    return 'general';
  }

  /**
   * Explain a specific event in the simulation
   */
  private explainEvent(query: Query): Response {
    const { context } = query;

    if (!context?.simulation) {
      return {
        text: "I need simulation data to explain events. Try selecting a simulation first, or click on a specific event in the timeline.",
        type: 'error',
        suggestedQueries: [
          "Show me an example of trust evolution",
          "Run an EP closed loop simulation"
        ]
      };
    }

    // Extract tick/life from query or use context
    const tickMatch = query.text.match(/tick (\d+)/i);
    const lifeMatch = query.text.match(/life (\d+)/i);

    const targetTick = tickMatch ? parseInt(tickMatch[1]) : context.selectedTick;
    const targetLife = lifeMatch ? parseInt(lifeMatch[1]) : context.selectedLife;

    if (targetTick === undefined) {
      return this.explainSimulationOverview(context.simulation);
    }

    return this.explainSpecificEvent(context.simulation, targetTick, targetLife);
  }

  /**
   * Explain the overall simulation
   */
  private explainSimulationOverview(simulation: SimulationResult): Response {
    const agent = simulation.final_state;
    const lives = simulation.lives || [];
    const totalLives = lives.length;

    // Detect key patterns
    const startTrust = lives[0]?.final_state?.trust || 0.5;
    const endTrust = agent.trust;
    const trustChange = endTrust - startTrust;

    const survived = lives.filter(l => l.outcome !== 'atp_exhaustion').length;
    const died = totalLives - survived;

    let narrative = `**Simulation Overview: ${simulation.agent_name || 'Agent'}'s Journey**\n\n`;

    // Trust evolution narrative
    if (trustChange > 0.1) {
      narrative += `📈 **Trust Growth**: This agent built trust steadily, going from T3=${startTrust.toFixed(2)} to ${endTrust.toFixed(2)} (+${(trustChange * 100).toFixed(0)}%). `;
      narrative += `This shows successful learning and adaptation—the agent's behavior became more consistent and reliable over time.\n\n`;
    } else if (trustChange < -0.1) {
      narrative += `📉 **Trust Decline**: Trust dropped from T3=${startTrust.toFixed(2)} to ${endTrust.toFixed(2)} (${(trustChange * 100).toFixed(0)}%). `;
      narrative += `This suggests the agent struggled with consistent behavior or took risks that didn't pay off.\n\n`;
    } else {
      narrative += `⚖️ **Trust Stability**: Trust remained relatively stable around T3=${endTrust.toFixed(2)}. `;
      narrative += `The agent found an equilibrium—neither breaking trust through failures nor building it significantly through successes.\n\n`;
    }

    // Survival pattern
    narrative += `🔄 **Life Pattern**: Lived ${totalLives} ${totalLives === 1 ? 'life' : 'lives'}. `;
    if (died === 0) {
      narrative += `All lives survived—the agent mastered ATP management and avoided metabolic death. Impressive!\n\n`;
    } else if (died === totalLives) {
      narrative += `All lives ended in ATP exhaustion. The agent never found a sustainable strategy—spending outpaced earning.\n\n`;
    } else {
      narrative += `${died} ${died === 1 ? 'life' : 'lives'} ended in ATP exhaustion, ${survived} survived. Mixed results suggest the agent was learning but hadn't fully mastered sustainability.\n\n`;
    }

    // ATP final state
    const finalATP = agent.atp;
    narrative += `⚡ **Final ATP**: ${finalATP.toFixed(1)} (${finalATP > 100 ? 'abundant' : finalATP > 50 ? 'healthy' : finalATP > 20 ? 'moderate' : 'critical'})\n\n`;

    // Karma assessment
    if (endTrust >= 0.5) {
      const karmaBonus = (endTrust - 0.5) * 10;
      narrative += `✨ **Rebirth Eligible**: With T3=${endTrust.toFixed(2)} (≥ 0.5 threshold), this agent would be reborn with +${karmaBonus.toFixed(1)} ATP karma. Trust above threshold means society accepts rebirth.\n\n`;
    } else {
      narrative += `❌ **Rebirth Ineligible**: With T3=${endTrust.toFixed(2)} (< 0.5 threshold), this agent would NOT be reborn. Society rejects agents who failed to build minimum trust. Permanent death.\n\n`;
    }

    return {
      text: narrative,
      type: 'explanation',
      relatedConcepts: ['ATP Economics', 'Trust Tensors', 'Karma', 'Multi-Life Learning'],
      suggestedQueries: [
        "What happened in life 1?",
        "Why did trust change?",
        "Show me the ATP crisis moments",
        "Explain pattern learning"
      ],
      visualizationHint: 'timeline'
    };
  }

  /**
   * Explain a specific event at a given tick
   */
  private explainSpecificEvent(
    simulation: SimulationResult,
    tick: number,
    life?: number
  ): Response {
    // Find the event in simulation history
    const lives = simulation.lives || [];

    // If life specified, search in that life only
    if (life !== undefined) {
      const targetLife = lives.find(l => l.life_number === life);
      if (!targetLife) {
        return {
          text: `Could not find life ${life} in this simulation.`,
          type: 'error'
        };
      }
      return this.explainLifeEvent(targetLife, tick);
    }

    // Otherwise, search across all lives
    for (const lifeData of lives) {
      const event = this.findEventAtTick(lifeData, tick);
      if (event) {
        return this.explainLifeEvent(lifeData, tick);
      }
    }

    return {
      text: `No event found at tick ${tick}. The simulation may not have data for that specific moment.`,
      type: 'error',
      suggestedQueries: [
        "Show me the simulation overview",
        "What were the key moments?",
        "Explain the trust evolution"
      ]
    };
  }

  /**
   * Find event at specific tick in a life
   */
  private findEventAtTick(life: LifeCycle, tick: number): ActionRecord | null {
    // Check history for matching tick
    if (!life.history) return null;

    for (const record of life.history) {
      if (record.tick === tick) {
        return record;
      }
    }
    return null;
  }

  /**
   * Explain an event within a specific life
   */
  private explainLifeEvent(life: LifeCycle, tick: number): Response {
    const event = this.findEventAtTick(life, tick);

    if (!event) {
      return {
        text: `No event found at tick ${tick} in life ${life.life_number}.`,
        type: 'error'
      };
    }

    const before = event.state_before;
    const after = event.state_after;
    const action = event.action;

    let narrative = `**Tick ${tick}, Life ${life.life_number}**: ${action}\n\n`;

    // ATP analysis
    const atpChange = after.atp - before.atp;
    const atpDelta = atpChange >= 0 ? `+${atpChange.toFixed(1)}` : atpChange.toFixed(1);

    narrative += `⚡ **ATP**: ${before.atp.toFixed(1)} → ${after.atp.toFixed(1)} (${atpDelta})\n`;

    if (atpChange < -20) {
      narrative += `   ⚠️ Large ATP spend—risky action or crisis response.\n`;
    } else if (atpChange > 0) {
      narrative += `   ✅ ATP earned—successful value creation.\n`;
    }
    narrative += '\n';

    // Trust analysis
    const trustChange = after.trust - before.trust;
    const trustDelta = trustChange >= 0 ? `+${trustChange.toFixed(3)}` : trustChange.toFixed(3);

    narrative += `🤝 **Trust**: ${before.trust.toFixed(3)} → ${after.trust.toFixed(3)} (${trustDelta})\n`;

    if (trustChange > 0.01) {
      narrative += `   📈 Trust improved—consistent, reliable behavior.\n`;
    } else if (trustChange < -0.01) {
      narrative += `   📉 Trust declined—failed action or inconsistent behavior.\n`;
    } else {
      narrative += `   ⚖️ Trust stable—neutral outcome.\n`;
    }
    narrative += '\n';

    // Context interpretation
    narrative += `**Context & Interpretation**:\n\n`;

    if (before.atp < 30) {
      narrative += `- ATP was critically low (${before.atp.toFixed(1)}). Agent in survival mode.\n`;
    } else if (before.atp > 100) {
      narrative += `- ATP was abundant (${before.atp.toFixed(1)}). Agent could afford risks.\n`;
    }

    if (before.trust < 0.5) {
      narrative += `- Trust below threshold (${before.trust.toFixed(2)} < 0.5). No rebirth eligibility yet.\n`;
    } else if (before.trust > 0.7) {
      narrative += `- Trust strong (${before.trust.toFixed(2)} > 0.7). Stable identity established.\n`;
    }

    // Action-specific insights
    if (action.includes('risky')) {
      narrative += `- Risky action: High potential reward, high potential cost. Requires sufficient trust+ATP buffer.\n`;
    } else if (action.includes('conservative') || action.includes('audit')) {
      narrative += `- Conservative action: Low risk, low cost. Common when ATP is scarce.\n`;
    }

    return {
      text: narrative,
      type: 'explanation',
      relatedConcepts: ['ATP Economics', 'Trust Dynamics', 'Decision Making'],
      suggestedQueries: [
        `What happened next?`,
        `Why did the agent choose "${action}"?`,
        `Show me the full life ${life.life_number} narrative`,
        `Compare this to other lives`
      ],
      visualizationHint: 'trust_chart'
    };
  }

  /**
   * Compare two simulations
   */
  private compareSimulations(query: Query): Response {
    const { context } = query;

    if (!context?.simulation || !context?.comparisonSimulation) {
      return {
        text: "I need two simulations to compare. Try using the Compare page to load multiple simulations side-by-side.",
        type: 'error',
        suggestedQueries: [
          "Show me maturation Web4 vs baseline",
          "Compare EP enabled vs disabled"
        ]
      };
    }

    const sim1 = context.simulation;
    const sim2 = context.comparisonSimulation;

    let narrative = `**Comparison: ${sim1.agent_name || 'Simulation 1'} vs ${sim2.agent_name || 'Simulation 2'}**\n\n`;

    // Trust comparison
    const trust1 = sim1.final_state.trust;
    const trust2 = sim2.final_state.trust;
    const trustDiff = trust1 - trust2;

    narrative += `🤝 **Final Trust**:\n`;
    narrative += `- Sim 1: T3=${trust1.toFixed(3)}\n`;
    narrative += `- Sim 2: T3=${trust2.toFixed(3)}\n`;
    narrative += `- Difference: ${trustDiff >= 0 ? '+' : ''}${trustDiff.toFixed(3)} (${((trustDiff / trust2) * 100).toFixed(1)}%)\n\n`;

    // ATP comparison
    const atp1 = sim1.final_state.atp;
    const atp2 = sim2.final_state.atp;

    narrative += `⚡ **Final ATP**:\n`;
    narrative += `- Sim 1: ${atp1.toFixed(1)}\n`;
    narrative += `- Sim 2: ${atp2.toFixed(1)}\n`;
    narrative += `- Difference: ${(atp1 - atp2 >= 0 ? '+' : '')}${(atp1 - atp2).toFixed(1)}\n\n`;

    // Lives comparison
    const lives1 = sim1.lives?.length || 0;
    const lives2 = sim2.lives?.length || 0;

    narrative += `🔄 **Lives Lived**:\n`;
    narrative += `- Sim 1: ${lives1}\n`;
    narrative += `- Sim 2: ${lives2}\n\n`;

    // Interpretation
    narrative += `**Key Insights**:\n\n`;

    if (Math.abs(trustDiff) > 0.1) {
      const better = trustDiff > 0 ? 'Sim 1' : 'Sim 2';
      narrative += `- **${better} built significantly more trust** (${Math.abs(trustDiff * 100).toFixed(0)}% difference). `;
      narrative += `This suggests different behavioral strategies or learning effectiveness.\n`;
    } else {
      narrative += `- Trust outcomes similar—both simulations converged to similar trustworthiness levels.\n`;
    }

    if (atp1 > atp2 * 1.5 || atp2 > atp1 * 1.5) {
      const better = atp1 > atp2 ? 'Sim 1' : 'Sim 2';
      narrative += `- **${better} managed ATP much more effectively**—sustainable strategies vs metabolic struggles.\n`;
    }

    return {
      text: narrative,
      type: 'explanation',
      relatedConcepts: ['Comparative Analysis', 'Web4 Maturation', 'EP Learning'],
      suggestedQueries: [
        "Why did trust evolve differently?",
        "What strategies differed?",
        "Show me specific decision points that diverged"
      ],
      visualizationHint: 'comparison'
    };
  }

  /**
   * Explain pattern learning (EP) in the simulation
   */
  private explainPatternLearning(query: Query): Response {
    const { context } = query;

    if (!context?.simulation) {
      return {
        text: "I need simulation data to explain pattern learning. Try running an EP Closed Loop simulation to see learning in action.",
        type: 'error',
        suggestedQueries: [
          "Run an EP closed loop simulation",
          "What is Epistemic Proprioception?"
        ]
      };
    }

    let narrative = `**Pattern Learning (Epistemic Proprioception)**\n\n`;

    narrative += `EP is "learning what you know"—meta-cognition that improves decision-making across lives.\n\n`;

    narrative += `**How It Works**:\n`;
    narrative += `1. Agent faces situation (low ATP, moderate trust, risky option available)\n`;
    narrative += `2. Pattern corpus searches for similar past situations\n`;
    narrative += `3. If match found: "Last time this happened, risky action failed. Recommend conservative."\n`;
    narrative += `4. Agent decides whether to follow pattern advice\n`;
    narrative += `5. Outcome recorded: Pattern strengthened if correct, weakened if wrong\n\n`;

    narrative += `**Cross-Life Learning**:\n`;
    narrative += `- Life 1: No patterns yet → trial and error → some failures\n`;
    narrative += `- Life 2: Has patterns from Life 1 → fewer repeated mistakes → better survival\n`;
    narrative += `- Life 3: Richer pattern corpus → nuanced decisions → optimal strategies emerge\n\n`;

    narrative += `**Why It Matters**:\n`;
    narrative += `EP demonstrates that *wisdom accumulates*. Each generation starts smarter than the last. `;
    narrative += `This is how AI systems can develop genuine expertise through experience, not just training data.\n\n`;

    return {
      text: narrative,
      type: 'explanation',
      relatedConcepts: ['Epistemic Proprioception', 'Pattern Corpus', 'Meta-Cognition', 'Multi-Life Learning'],
      suggestedQueries: [
        "Show me the pattern corpus browser",
        "What patterns did this agent learn?",
        "Compare EP enabled vs disabled",
        "How does EP improve trust?"
      ],
      visualizationHint: 'timeline'
    };
  }

  /**
   * Explain a Web4 concept
   */
  private explainConcept(query: Query): Response {
    const lower = query.text.toLowerCase();

    // Match concept keywords
    if (lower.includes('atp') || lower.includes('attention')) {
      return this.explainATP();
    } else if (lower.includes('trust') || lower.includes('t3')) {
      return this.explainTrust();
    } else if (lower.includes('karma') || lower.includes('rebirth')) {
      return this.explainKarma();
    } else if (lower.includes('lct') || lower.includes('identity')) {
      return this.explainLCT();
    } else if (lower.includes('coherence') || lower.includes('ci')) {
      return this.explainCoherence();
    } else if (lower.includes('ep') || lower.includes('epistemic') || lower.includes('pattern')) {
      return this.explainEP();
    }

    return {
      text: "I can explain these Web4 concepts: ATP, Trust (T3), Karma, LCT (identity), Coherence Index (CI), and Epistemic Proprioception (EP). Which would you like to learn about?",
      type: 'suggestion',
      suggestedQueries: [
        "What is ATP?",
        "Explain trust tensors",
        "How does karma work?",
        "What is epistemic proprioception?"
      ]
    };
  }

  private explainATP(): Response {
    return {
      text: `**ATP (Allocation Transfer Packet): Metabolic Economics**\n\n` +
        `Think of ATP as *energy for digital existence*. Just like biological organisms need calories, Web4 entities need ATP.\n\n` +
        `**Key Properties**:\n` +
        `- Every action costs ATP (posting, messaging, voting)\n` +
        `- Valuable contributions earn ATP (creating quality, helping others)\n` +
        `- ATP = 0 means immediate death (no grace period)\n` +
        `- Only sustainable behaviors survive long-term\n\n` +
        `**Why This Matters**:\n` +
        `Spam becomes economically impossible—spammers burn ATP faster than they earn it. Quality naturally thrives because value creators earn more than they spend. No moderators needed—metabolic economics self-regulates.\n\n` +
        `**In Simulations**: Watch ATP fluctuate as agents make decisions. Critical threshold is ~20 ATP—below that, survival mode kicks in.`,
      type: 'explanation',
      relatedConcepts: ['Metabolic Economics', 'Aliveness', 'Sustainability'],
      suggestedQueries: [
        "Show me an ATP crisis in a simulation",
        "How do agents earn ATP?",
        "What happens when ATP reaches 0?"
      ]
    };
  }

  private explainTrust(): Response {
    return {
      text: `**Trust Tensors (T3): Multi-Dimensional Trust**\n\n` +
        `Trust isn't a single number—it's a multi-dimensional tensor capturing different aspects of trustworthiness.\n\n` +
        `**Five Dimensions** (in production Web4):\n` +
        `1. **Competence**: Can you do what you claim?\n` +
        `2. **Reliability**: Do you deliver consistently?\n` +
        `3. **Integrity**: Do you act honestly?\n` +
        `4. **Alignment**: Do your goals match community values?\n` +
        `5. **Transparency**: Are your actions observable?\n\n` +
        `**Why Multi-Dimensional**:\n` +
        `Gaming the system requires excellence across ALL dimensions. You can't fake competence while being unreliable, or show integrity while hiding actions. Authenticity becomes the path of least resistance.\n\n` +
        `**In Simulations**: We use simplified T3 (single score) for clarity, but the principle remains—trust is earned through consistent, quality behavior over time.`,
      type: 'explanation',
      relatedConcepts: ['Trust Tensors', 'Multi-Dimensional Trust', 'Reputation'],
      suggestedQueries: [
        "How does trust change in simulations?",
        "What builds trust?",
        "Why did trust drop at this event?"
      ]
    };
  }

  private explainKarma(): Response {
    return {
      text: `**Karma: Consequences Carry Forward**\n\n` +
        `When an agent dies, society evaluates: "Did you build enough trust to deserve rebirth?"\n\n` +
        `**Rebirth Eligibility**:\n` +
        `- T3 ≥ 0.5: Society accepts rebirth (you demonstrated basic agency)\n` +
        `- T3 < 0.5: Permanent death (you failed to build minimum trust)\n\n` +
        `**Karma Mechanics**:\n` +
        `- Die with T3 = 0.72? Reborn with bonus ATP based on trust earned\n` +
        `- Die with T3 = 0.45? No rebirth—society rejects\n` +
        `- Each life starts stronger than the last (if you earned it)\n\n` +
        `**Why This Matters**:\n` +
        `Death carries real consequences. Good behavior compounds across lives. Bad actors die permanently. No account recreation loophole—your identity (LCT) persists, and society remembers.\n\n` +
        `**The 0.5 Threshold**:\n` +
        `Not arbitrary—it's a phase transition from coherence physics. Below 0.5 = random/reactive. Above 0.5 = genuine intentional behavior. Same threshold appears in superconductivity, biological systems, quantum coherence.`,
      type: 'explanation',
      relatedConcepts: ['Karma', 'Rebirth', 'Trust Threshold', 'Consciousness'],
      suggestedQueries: [
        "Show me a rebirth example",
        "Why 0.5 threshold?",
        "What happens to agents below 0.5?",
        "Explain consciousness thresholds"
      ]
    };
  }

  private explainLCT(): Response {
    return {
      text: `**LCT (Linked Context Token): Unforgeable Identity**\n\n` +
        `LCT is your digital identity, bound to hardware you control (phone's Secure Enclave, laptop's TPM, FIDO2 key).\n\n` +
        `**Key Properties**:\n` +
        `- Hardware-bound: Private key never leaves secure chip\n` +
        `- Multi-device: Each device witnesses your identity\n` +
        `- More devices = stronger trust (counterintuitive but true!)\n` +
        `- Attack difficulty exponential in device count\n\n` +
        `**Why Traditional Identity Fails**:\n` +
        `Passwords = shared secret stored on servers = hackable. Create new account = fresh start = no consequences for bad behavior.\n\n` +
        `**Why LCT Works**:\n` +
        `Identity proves itself cryptographically. Trust accumulates on YOU (not an account). Can't fake identity without compromising multiple independent hardware chips. Society remembers your behavior.\n\n` +
        `**In Web4**: LCT is foundational—enables trust accumulation, karma persistence, rebirth eligibility. Without unforgeable identity, everything else collapses.`,
      type: 'explanation',
      relatedConcepts: ['Linked Context Tokens', 'Identity', 'Hardware Security', 'Sybil Resistance'],
      suggestedQueries: [
        "How do identity constellations work?",
        "Why are more devices stronger?",
        "What is a Secure Enclave?",
        "Explain TPM and FIDO2"
      ]
    };
  }

  private explainCoherence(): Response {
    return {
      text: `**Coherence Index (CI): Consistency Detection**\n\n` +
        `Coherence tracks whether your behavior is consistent across four dimensions:\n\n` +
        `**Four CI Dimensions**:\n` +
        `1. **Spatial**: Can't be in SF and NYC simultaneously\n` +
        `2. **Temporal**: Can't respond instantly to everything (speed-of-light bounds)\n` +
        `3. **Capability**: Can't suddenly gain expert medical skills\n` +
        `4. **Relational**: Network of who you interact with should be stable\n\n` +
        `**Why Geometric Mean**:\n` +
        `CI = (D1 × D2 × D3 × D4)^(1/4). One weak dimension tanks everything. Can't fake spatial coherence while failing temporal—fraud detected.\n\n` +
        `**CI Modulates Trust**:\n` +
        `Incoherent behavior reduces effective trust significantly. Even high T3 gets downgraded if CI is suspicious. This makes sophisticated attacks (teleportation, capability spoofing, Sybil) much harder.\n\n` +
        `**In Web4**: CI provides fraud signals that pure trust can't catch. Physics constrains what's possible—violations are detectable.`,
      type: 'explanation',
      relatedConcepts: ['Coherence Index', 'Fraud Detection', 'Trust Modulation', 'Sybil Resistance'],
      suggestedQueries: [
        "What is the 9-domain coherence framework?",
        "How does CI detect fraud?",
        "Show me coherence modulation in action",
        "Explain Synchronism theory"
      ]
    };
  }

  private explainEP(): Response {
    return {
      text: `**Epistemic Proprioception (EP): Learning What You Know**\n\n` +
        `EP is meta-cognition—the ability to know what you know and what you don't know.\n\n` +
        `**How It Works**:\n` +
        `1. Agent faces situation (e.g., "low ATP, risky option available")\n` +
        `2. EP searches pattern corpus for similar past situations\n` +
        `3. If match found: "Last time, risky action failed. Confidence: 0.8. Recommend conservative."\n` +
        `4. Agent chooses whether to follow advice\n` +
        `5. Outcome strengthens or weakens pattern based on result\n\n` +
        `**Why "Proprioception"**:\n` +
        `Physical proprioception = knowing where your limbs are without looking. Epistemic proprioception = knowing what you know without explicit search. Both are awareness of internal state.\n\n` +
        `**Cross-Life Learning**:\n` +
        `Patterns persist across deaths. Each rebirth starts with wisdom from previous lives. Mistakes aren't repeated—lessons accumulate. This is how expertise develops through experience.\n\n` +
        `**In Simulations**: Watch agents improve decision quality from Life 1 → Life 2 → Life 3. Same situations, better outcomes.`,
      type: 'explanation',
      relatedConcepts: ['Epistemic Proprioception', 'Meta-Cognition', 'Pattern Learning', 'Wisdom Accumulation'],
      suggestedQueries: [
        "Show me pattern learning in action",
        "Browse the pattern corpus",
        "Compare EP enabled vs disabled",
        "What is the D5/D9 threshold for meta-cognition?"
      ]
    };
  }

  /**
   * Suggest next exploration steps
   */
  private suggestExploration(query: Query): Response {
    const { context } = query;

    if (!context?.simulation) {
      return {
        text: `**Where to Start**:\n\n` +
          `1. **Never seen Web4?** → [First Contact](/first-contact) (10-min interactive tutorial)\n` +
          `2. **Want hands-on?** → [Lab Console](/lab-console) (run a simulation now)\n` +
          `3. **Prefer concepts?** → [Learning Journey](/learn) (guided pathway)\n` +
          `4. **Ready to experiment?** → [Playground](/playground) (tweak parameters, see results)\n\n` +
          `Most engaging path: First Contact → Lab Console → Playground → Deep dives into specific concepts that intrigue you.`,
        type: 'suggestion',
        suggestedQueries: [
          "Run an EP closed loop simulation",
          "What is ATP?",
          "Show me trust networks forming",
          "Explain karma and rebirth"
        ]
      };
    }

    // Has simulation context—suggest based on what they've seen
    return {
      text: `**Interesting Things to Explore Next**:\n\n` +
        `1. **Trust Evolution**: Why did trust change the way it did? Look for inflection points.\n` +
        `2. **ATP Crises**: Find moments where ATP dropped below 30—survival mode decisions.\n` +
        `3. **Pattern Learning**: If EP enabled, see how decisions improved across lives.\n` +
        `4. **Comparison**: Run the same simulation with different parameters—what changes?\n` +
        `5. **Narratives**: Read the human-readable story version of this simulation.\n\n` +
        `Try asking: "Why did trust drop at tick X?" or "Compare this to baseline"`,
      type: 'suggestion',
      relatedConcepts: ['Exploration', 'Analysis', 'Learning Pathways'],
      suggestedQueries: [
        "Why did trust drop at tick ___?",
        "Show me ATP crisis moments",
        "Read the narrative version",
        "Compare to baseline simulation"
      ]
    };
  }

  /**
   * Handle general queries
   */
  private handleGeneral(query: Query): Response {
    return {
      text: `I can help you understand Web4 simulations! Try asking:\n\n` +
        `- "Why did trust drop at tick 14?"\n` +
        `- "Compare Web4 vs baseline maturation"\n` +
        `- "What is ATP?"\n` +
        `- "Explain pattern learning"\n` +
        `- "What should I explore next?"\n\n` +
        `Or just describe what you're curious about—I'll do my best to help.`,
      type: 'suggestion',
      suggestedQueries: [
        "Run a simulation",
        "What is Web4?",
        "Show me trust evolution",
        "Explain karma"
      ]
    };
  }
}

/**
 * Export singleton instance
 */
export const queryEngine = new ACTQueryEngine();
