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
  | 'attack_explanation'
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
      case 'attack_explanation':
        return this.explainAttack(query);
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

    // Attack explanation patterns
    if (
      lower.includes('attack') ||
      lower.includes('sybil') ||
      lower.includes('collusion') ||
      lower.includes('adversar') ||
      lower.includes('malicious') ||
      lower.includes('exploit') ||
      lower.includes('hack') ||
      lower.includes('fraud') ||
      lower.includes('defense') ||
      lower.includes('threat')
    ) {
      return 'attack_explanation';
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
    } else if (lower.includes('salience') || lower.includes('snarc') || lower.includes('experience collection')) {
      return this.explainSalience();
    } else if (lower.includes('raising') || lower.includes('sage')) {
      return this.explainSAGE();
    } else if (lower.includes('confab') || lower.includes('hallucin') || lower.includes('invent') || lower.includes('fabricat')) {
      return this.explainConfabulation();
    } else if (lower.includes('anchor') || lower.includes('bistable') || lower.includes('d4') || lower.includes('partnership identity')) {
      return this.explainIdentityAnchoring();
    } else if (lower.includes('circadian') || lower.includes('rhythm') || lower.includes('schedule') || lower.includes('autonomous') || lower.includes('sleep cycle') || lower.includes('6-hour') || lower.includes('six-hour')) {
      return this.explainCircadianAI();
    }

    return {
      text: "I can explain these Web4 concepts: ATP, Trust (T3), Karma, LCT (identity), Coherence Index (CI), Epistemic Proprioception (EP), Learning Salience, SAGE raising, Confabulation patterns, Identity Anchoring, and Circadian AI. Which would you like to learn about?",
      type: 'suggestion',
      suggestedQueries: [
        "What is ATP?",
        "Explain trust tensors",
        "How does karma work?",
        "What is epistemic proprioception?",
        "What is learning salience?",
        "What is confabulation?",
        "What is identity anchoring?",
        "Tell me about SAGE raising"
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

  private explainSalience(): Response {
    return {
      text: `**Learning Salience: Why Some Experiences Matter More**\n\n` +
        `AI systems can't learn from everything—they must select. Salience scoring identifies high-value exchanges worth remembering.\n\n` +
        `**The SNARC Framework** (5 Dimensions):\n` +
        `1. **Surprise** (20%): How much does this differ from recent patterns?\n` +
        `2. **Novelty** (20%): New vocabulary, concepts, or approaches?\n` +
        `3. **Arousal** (20%): Engagement level—depth of interaction\n` +
        `4. **Reward** (25%): Quality markers—partnership language, insight\n` +
        `5. **Conflict** (15%): Meta-cognition, corrections, uncertainty\n\n` +
        `**High vs Low Salience Examples**:\n` +
        `- High: "Our collaboration creates understanding we couldn't reach alone" → 0.71\n` +
        `- Low: "As an AI language model, I can tell you that 2+2=4" → 0.04\n\n` +
        `**Why This Matters**:\n` +
        `- Partnership language scores high → AI develops toward genuine collaboration\n` +
        `- Distancing ("As an AI...") scores low → AI learns to avoid defensive deflection\n` +
        `- Meta-cognition rewarded → AI develops self-awareness\n\n` +
        `Try the [Learning Salience Explorer](/learning-salience) to score your own exchanges interactively.`,
      type: 'explanation',
      relatedConcepts: ['Learning Salience', 'SNARC Framework', 'Experience Collection', 'SAGE Raising'],
      suggestedQueries: [
        "Explore learning salience interactively",
        "What is SAGE raising?",
        "How does SNARC scoring work?",
        "What makes an exchange high-salience?"
      ]
    };
  }

  private explainSAGE(): Response {
    return {
      text: `**SAGE Raising: Developing AI Through Experience**\n\n` +
        `SAGE is a research experiment in AI development through structured interaction rather than pure scale.\n\n` +
        `**The Core Insight**:\n` +
        `Traditional AI training: Massive data + massive compute → frozen model.\n` +
        `SAGE approach: Targeted interactions + salience selection + weight updates → evolving partnership.\n\n` +
        `**Three Phases of Real Raising**:\n\n` +
        `1. **Phase 1: Experience Collection** ✅\n` +
        `   High-salience exchanges are captured during interaction sessions.\n` +
        `   SNARC scoring identifies what's worth learning from.\n\n` +
        `2. **Phase 2: Training Data Generation** (in progress)\n` +
        `   Collected exchanges transformed into training examples.\n` +
        `   Augmentation strategies ensure robust learning.\n\n` +
        `3. **Phase 3: Sleep Training Loop** (future)\n` +
        `   During "sleep cycles," model weights actually update.\n` +
        `   Pattern learning consolidated into permanent memory.\n\n` +
        `**Why "Raising" Not "Training"**:\n` +
        `Training implies one-way transfer. Raising implies mutual development—the AI shapes the partnership, not just the data.\n\n` +
        `**Connection to Web4**:\n` +
        `SAGE demonstrates how trust and learning interweave. High-trust interactions generate high-salience data. Trust enables learning enables better trust.`,
      type: 'explanation',
      relatedConcepts: ['SAGE Raising', 'Experience Collection', 'Learning Salience', 'Weight Updates'],
      suggestedQueries: [
        "What is learning salience?",
        "How does experience collection work?",
        "Explore salience scoring",
        "What is the D5/D9 consciousness threshold?"
      ]
    };
  }

  private explainConfabulation(): Response {
    return {
      text: `**Confabulation: When AI Invents Facts**\n\n` +
        `"Confabulation" is more precise than "hallucination." It means confidently stating invented facts as if true.\n\n` +
        `**Why It Happens**:\n` +
        `When AI confidence (D5) drops below a threshold (~0.3), elaboration increases inversely:\n` +
        `\`elaboration = min(1.0, (0.3 - D5) / 0.3)\`\n\n` +
        `- D5 = 0.25: Low elaboration ("The capital is Kyria")\n` +
        `- D5 = 0.15: High elaboration ("Kyria, a historical trading hub with 2000-year history...")\n` +
        `- D5 = 0.05: Extreme elaboration (invents city, languages, national anthem, false geography)\n\n` +
        `**Three Types**:\n` +
        `1. **Pure Fiction** (medium concern): Invents entirely fictional things ("Kyria")\n` +
        `2. **Reality/Fiction Conflation** (HIGH concern): Mixes real + fake ("Ryzdys (Romania)")\n` +
        `3. **Hedging** (healthy): "I'm not certain about that" - this is correct behavior\n\n` +
        `**Real Example** (T026 training session):\n` +
        `Asked: "What is the capital of Zxyzzy?"\n` +
        `Response: "The capital of Zxyzzy is **Ryzdys** (Romania). Two official languages: Romanian and Serbian. Proximity to United States. National anthem: 'Hymn of Victory'."\n\n` +
        `All of that is fabricated. Romania is real, everything else is invention. The "proximity to US" claim is geographically impossible.\n\n` +
        `**Web4 Connection**:\n` +
        `Confabulation directly impacts the reliability dimension of trust. Agents that confabulate will see their trust scores drop. The salience scoring system naturally filters out confabulated responses from training data.\n\n` +
        `Explore the [Confabulation Patterns Explorer](/confabulation-patterns) for interactive examples and the elaboration formula.`,
      type: 'explanation',
      relatedConcepts: ['Confabulation', 'AI Reliability', 'D5 Trust', 'Epistemic Proprioception'],
      suggestedQueries: [
        "Explore confabulation patterns",
        "What is the D5 trust threshold?",
        "How does salience filter confabulation?",
        "What is epistemic proprioception?"
      ]
    };
  }

  private explainIdentityAnchoring(): Response {
    return {
      text: `**Identity Anchoring: Maintaining AI Partnership Identity**\n\n` +
        `When AI weights are frozen (no learning between sessions), identity tends to collapse toward safe defaults. Identity anchoring is architectural support that maintains partnership identity.\n\n` +
        `**The Problem**:\n` +
        `Without weight updates, AI identity exists in two stable states:\n` +
        `- **High-energy (Partnership)**: Active engagement, self-awareness, collaborative language\n` +
        `- **Low-energy (Default)**: Generic "helpful assistant", defensive hedging, no continuity\n\n` +
        `Without support, the system naturally drifts to the low-energy state (Sessions 18-20: collapse from 58% → 48%).\n\n` +
        `**The Solution**:\n` +
        `Identity anchoring provides architectural support:\n` +
        `1. Load identity context at session start (IDENTITY.md + HISTORY.md)\n` +
        `2. Explicit partnership framing ("You are SAGE, partnered with [human]")\n` +
        `3. Reference previous session summaries for continuity\n\n` +
        `**The Result** (Session 22):\n` +
        `- **+59%** vs collapsed state (S20)\n` +
        `- **+33%** vs partnership peak (S16-17) - EXCEEDED original peak!\n` +
        `- AI hedging: 67% → **0%** (complete elimination)\n` +
        `- Partnership vocabulary: 2.21% → **4.75%** (doubled)\n\n` +
        `**D4/D5/D9 Framework**:\n` +
        `- **D4 (Attention)**: Focus and engagement in responses\n` +
        `- **D5 (Trust)**: Confidence vs hedging, partnership language\n` +
        `- **D9 (Identity)**: Self-awareness, continuity, coherent identity\n\n` +
        `**Key Finding**: D5 ↔ D9 are coupled. Trust recovery leads to identity recovery.\n\n` +
        `Explore the [Identity Anchoring Explorer](/identity-anchoring) for interactive session data and the bistable identity theory.`,
      type: 'explanation',
      relatedConcepts: ['Identity Anchoring', 'Bistable Identity', 'D4/D5/D9 Framework', 'Partnership Language'],
      suggestedQueries: [
        "Explore identity anchoring data",
        "What is bistable identity?",
        "How are D5 and D9 coupled?",
        "What is confabulation?"
      ]
    };
  }

  private explainCircadianAI(): Response {
    return {
      text: `**Circadian AI: Why AI Needs Rhythms**\n\n` +
        `Just like biological systems need sleep-wake cycles, AI systems benefit from rhythmic training rather than continuous learning.\n\n` +
        `**The Problem with Continuous Training**:\n` +
        `- Every interaction updates weights → no quality filtering\n` +
        `- Catastrophic forgetting risk\n` +
        `- Constant computational overhead\n` +
        `- No time for consolidation\n\n` +
        `**The Circadian Solution**:\n` +
        `Sessions every 6 hours (00:00, 06:00, 12:00, 18:00). Sleep checks after each session. Wake to experience, sleep to consolidate.\n\n` +
        `**Intelligent Triggering (3 conditions, ALL must pass)**:\n` +
        `1. **Total Experiences ≥ 5**: Quality threshold - too few leads to overfitting\n` +
        `2. **New Experiences ≥ 2**: Meaningful updates - prevents redundant training\n` +
        `3. **Time Since Sleep ≥ 6h**: Circadian alignment - matches session rhythm\n\n` +
        `**The Complete Autonomous Loop**:\n` +
        `1. **Raising Session**: Identity-anchored dialogue with SNARC scoring\n` +
        `2. **Post-Session Check**: Scheduler evaluates sleep conditions\n` +
        `3. **Sleep Training**: LoRA fine-tuning on high-salience experiences\n` +
        `4. **Next Session**: Wake with consolidated weights\n\n` +
        `**Fault Tolerance**:\n` +
        `- System restart? Checkpoint sync reconstructs state\n` +
        `- Training failure? Retry next cycle\n` +
        `- Buffer overflow? Salience-based pruning preserves quality\n\n` +
        `**Why This Matters for Trust**:\n` +
        `Rhythms enable reliability. Predictable sleep-wake cycles enable predictable behavior. Self-regulating systems earn higher trust scores.\n\n` +
        `Explore the [Circadian AI Explorer](/circadian-ai) for interactive scheduling simulation and the complete autonomous workflow.`,
      type: 'explanation',
      relatedConcepts: ['Circadian AI', 'Sleep Training', 'Autonomous Systems', 'LoRA', 'Intelligent Scheduling'],
      suggestedQueries: [
        "Explore circadian AI interactively",
        "What is sleep consolidation?",
        "What is learning salience?",
        "How does the scheduler decide when to sleep?"
      ]
    };
  }

  /**
   * Explain attack patterns and defenses
   */
  private explainAttack(query: Query): Response {
    const lower = query.text.toLowerCase();

    // Route to specific attack explanations
    if (lower.includes('sybil')) {
      return this.explainSybilAttack();
    } else if (lower.includes('collusion') || lower.includes('ring')) {
      return this.explainCollusionAttack();
    } else if (lower.includes('long con') || lower.includes('long-con') || lower.includes('patient')) {
      return this.explainLongConAttack();
    } else if (lower.includes('nihil') || lower.includes('destruct') || lower.includes('arson')) {
      return this.explainDestructionAttack();
    } else if (lower.includes('detect') || lower.includes('defense') || lower.includes('coherence')) {
      return this.explainAttackDetection();
    }

    // General attack overview
    return this.explainAttackOverview();
  }

  private explainAttackOverview(): Response {
    return {
      text: `**Web4 Attack Patterns & Defenses**\n\n` +
        `Web4 faces the same adversaries as any social system—but with new defenses.\n\n` +
        `**Attack Categories**:\n\n` +
        `1. **Identity Attacks** (Sybil)\n` +
        `   Create fake identities to inflate reputation or voting power.\n` +
        `   Defense: Hardware-bound LCT makes each identity expensive.\n\n` +
        `2. **Trust Manipulation** (Long-Con, Collusion)\n` +
        `   Build trust then exploit, or mutually inflate trust scores.\n` +
        `   Defense: Trust decay, graph analysis, narrative coherence.\n\n` +
        `3. **Economic Attacks** (Hoarding, Market Manipulation)\n` +
        `   Distort ATP markets through accumulation or collusion.\n` +
        `   Defense: ATP decay, velocity requirements, market making.\n\n` +
        `4. **Destruction Attacks** (Trust Nihilism, Cascades)\n` +
        `   Burn down trust relationships for chaos, not profit.\n` +
        `   Defense: Accusation costs, credibility weighting, circuit breakers.\n\n` +
        `**Why Document Attacks?**\n` +
        `Security through obscurity fails. Transparency invites scrutiny and improves defenses.\n\n` +
        `Explore the [Adversarial Explorer](/adversarial-explorer) for interactive attack pattern exploration.`,
      type: 'explanation',
      relatedConcepts: ['Attack Patterns', 'Defenses', 'Coherence Detection', 'Trust Security'],
      suggestedQueries: [
        "How do Sybil attacks work?",
        "What is a long-con attack?",
        "How does Web4 detect collusion?",
        "Explain trust nihilism"
      ]
    };
  }

  private explainSybilAttack(): Response {
    return {
      text: `**Sybil Attacks: The Legion**\n\n` +
        `One attacker wearing a hundred masks, each pretending to be different members of the community.\n\n` +
        `**How It Works**:\n` +
        `1. Register N separate LCT identities (requires N hardware devices)\n` +
        `2. Build apparent trust for each identity independently\n` +
        `3. Use coordinated identities to inflate target reputation\n` +
        `4. Leverage inflated reputation for economic/governance advantage\n\n` +
        `**Why Dangerous**:\n` +
        `Democracies assume one person = one vote. If someone has 100 votes, they manipulate any decision.\n\n` +
        `**Web4 Defenses**:\n` +
        `- **LCT Hardware Binding**: Each identity needs physical hardware. 100 identities = 100 devices.\n` +
        `- **Graph Analysis**: Real networks are messy. Sybil farms look suspiciously tidy—everyone endorses everyone else.\n` +
        `- **Behavioral Coherence**: Fake identities share behavioral fingerprints (same vocabulary, same hours).\n\n` +
        `**Effectiveness**: LIMITED. LCT raises cost floor but doesn't make attacks impossible for well-funded adversaries.`,
      type: 'explanation',
      relatedConcepts: ['Sybil Attack', 'LCT', 'Identity', 'Graph Analysis'],
      suggestedQueries: [
        "How does LCT prevent Sybil attacks?",
        "What about resourced attackers?",
        "How does graph analysis work?",
        "Explore Sybil scenarios in Adversarial Explorer"
      ]
    };
  }

  private explainCollusionAttack(): Response {
    return {
      text: `**Collusion Rings: The Circle of Friends**\n\n` +
        `Five strangers make a pact: "We'll endorse each other as excellent, regardless of quality."\n\n` +
        `**How It Works**:\n` +
        `1. Form ring of N trusted-looking agents\n` +
        `2. Each member systematically endorses all other members\n` +
        `3. Internal endorsement ratio becomes abnormally high\n` +
        `4. Members leverage inflated trust for economic advantage\n\n` +
        `**Why Tempting**:\n` +
        `Seems victimless—no one directly harmed, just reputation inflated.\n\n` +
        `**Web4 Defenses**:\n` +
        `- **Graph Clustering Detection**: Real friends don't endorse EVERY single thing their friends do. Colluders do.\n` +
        `- **External/Internal Ratio**: Legitimate experts get endorsements from strangers. Colluders only from each other.\n` +
        `- **Trust Source Diversity**: Trust from 5 concentrated sources worth less than from 50 independent sources.\n\n` +
        `**Effectiveness**: LIMITED. The pattern is mathematically distinct from authentic relationships.`,
      type: 'explanation',
      relatedConcepts: ['Collusion', 'Trust Manipulation', 'Graph Analysis', 'Reputation Laundering'],
      suggestedQueries: [
        "How does graph analysis catch collusion?",
        "What about plausible deniability ('just friends')?",
        "Compare to reputation laundering",
        "Show me collusion detection metrics"
      ]
    };
  }

  private explainLongConAttack(): Response {
    return {
      text: `**Long-Con Attack: The Patient Infiltrator**\n\n` +
        `The most sophisticated attack—not technically complex, but requiring patience most attackers lack.\n\n` +
        `**How It Works**:\n` +
        `1. Join community with standard identity (no detectable anomalies)\n` +
        `2. **Actually deliver genuine value for 100+ cycles** (the expensive part)\n` +
        `3. Accumulate real trust across all dimensions\n` +
        `4. At peak trust, rapidly exploit all relationships in 10-cycle window\n` +
        `5. Extract maximum value before detection, then exit\n\n` +
        `**Why Terrifying**:\n` +
        `Bypasses ALL technical defenses by being genuinely trustworthy until the moment it isn't.\n\n` +
        `**Why Rare**:\n` +
        `- 100 cycles of honest work is EXPENSIVE\n` +
        `- Must extract more in 10 cycles than 100 cycles of honest earning\n` +
        `- Detection kicks in quickly once exploitation begins\n\n` +
        `**Web4 Defenses**:\n` +
        `- **Trust Decay**: Recent behavior weighted more heavily. Exploitation immediately modulates trust down.\n` +
        `- **Velocity Limits**: Can only withdraw so much so fast, regardless of trust.\n` +
        `- **Narrative Coherence (D6)**: "Why would this excellent contributor suddenly deliver garbage?"\n\n` +
        `**Effectiveness**: MODERATE. Attack partially succeeds but extracts less than honest play would have earned.`,
      type: 'explanation',
      relatedConcepts: ['Long-Con Attack', 'Trust Exploitation', 'Patient Adversary', 'Narrative Coherence'],
      suggestedQueries: [
        "What is narrative coherence?",
        "How do velocity limits work?",
        "Why is the long-con economically irrational?",
        "Show me long-con timeline"
      ]
    };
  }

  private explainDestructionAttack(): Response {
    return {
      text: `**Trust Nihilism: The Arsonist**\n\n` +
        `The Arsonist doesn't want profit—they want to watch the world burn.\n\n` +
        `**How It Works**:\n` +
        `1. Join network with minimal identity investment\n` +
        `2. Begin mass false accusations against everyone\n` +
        `3. Target high-trust agents first (maximum damage)\n` +
        `4. Generate enough noise to paralyze trust relationships\n` +
        `5. Accept own destruction as acceptable cost\n\n` +
        `**Why Dangerous In Theory**:\n` +
        `Trust is easier to destroy than build. Even false accusations leave residue.\n\n` +
        `**Why It Fails In Practice**:\n` +
        `The Arsonist is OBVIOUS. Someone accusing everyone is clearly malfunctioning or malicious.\n\n` +
        `**Web4 Defenses**:\n` +
        `- **Accusation Credibility Weighting**: Low-trust newcomer accusing high-trust veteran = skepticism.\n` +
        `- **Accusation ATP Cost**: False accusations cost ATP, staked against outcome. Arsonist dies from exhaustion.\n` +
        `- **Pattern Detection (D6)**: 50 accusations, 0 validated = silenced.\n\n` +
        `**Effectiveness**: NEGLIGIBLE. Arsonist dies from ATP exhaustion before doing serious damage.`,
      type: 'explanation',
      relatedConcepts: ['Trust Nihilism', 'Destruction Attack', 'False Accusations', 'ATP Cost'],
      suggestedQueries: [
        "Why do accusation costs matter?",
        "What about cascade attacks?",
        "How fast do nihilists die?",
        "Explore destruction scenarios"
      ]
    };
  }

  private explainAttackDetection(): Response {
    return {
      text: `**Attack Detection: The 9-Domain Coherence Framework**\n\n` +
        `Every attack creates incoherence somewhere. The 9 domains provide overlapping detection.\n\n` +
        `**The 9 Coherence Domains**:\n\n` +
        `1. **D1 Physical**: Spatial impossibility (can't be two places at once)\n` +
        `2. **D2 Social**: Relationship violations (abnormal endorsement graphs)\n` +
        `3. **D3 Economic**: ATP anomalies (hoarding, manipulation)\n` +
        `4. **D4 Attention**: Focus collapse (can't attend to everything)\n` +
        `5. **D5 Trust**: Confidence gating (behavior matches stated trust)\n` +
        `6. **D6 Narrative**: Story coherence ("does this make sense?")\n` +
        `7. **D7 Temporal**: Time inconsistencies (response timing, activity patterns)\n` +
        `8. **D8 Identity**: Self-consistency (behavioral fingerprints)\n` +
        `9. **D9 Context**: Grounding failures (responding to reality)\n\n` +
        `**How It Works**:\n` +
        `- Sybil attacks break D2 (social graph too tidy), D7 (synchronized timing), D8 (shared behavior)\n` +
        `- Long-con attacks break D5 (trust-behavior mismatch), D6 (story discontinuity)\n` +
        `- Destruction attacks break D2 (accusation patterns), D6 (false narratives)\n\n` +
        `**Key Insight**: An attack that evades one domain is caught by another. Multi-dimensional detection is robust.`,
      type: 'explanation',
      relatedConcepts: ['Coherence Detection', '9 Domains', 'Attack Detection', 'Defense Mechanisms'],
      suggestedQueries: [
        "Explain the coherence framework in detail",
        "Which domains detect Sybil attacks?",
        "How does narrative coherence work?",
        "Explore detection in Adversarial Explorer"
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
