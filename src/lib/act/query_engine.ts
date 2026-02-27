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
 * 6. Moment exploration: "What's the most interesting moment?"
 *
 * Session #42: Added moment-aware queries for integration with
 * the Emergent Moments Gallery (/moments).
 */

import type { SimulationResult, LifeCycle, ActionRecord } from '@/lib/types';
import type { Moment, MomentCategory } from '@/lib/moments/types';
import { CATEGORY_INFO, CATEGORY_PRIORITY } from '@/lib/moments/types';
import type {
  SocietyResult,
  AgentSnapshot,
  Coalition,
  SocietyMetrics,
  SocietyEvent,
  StrategyType,
} from '@/lib/simulation/society-engine';
import { STRATEGY_LABELS, STRATEGY_COLORS } from '@/lib/simulation/society-engine';

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
  | 'moment_exploration'
  | 'society_analysis'  // NEW: Society Simulator queries
  | 'general';

export interface QueryContext {
  simulation?: SimulationResult;
  selectedTick?: number;
  selectedLife?: number;
  comparisonSimulation?: SimulationResult;
  moments?: Moment[];  // Pre-loaded moments for moment-aware queries
  selectedMoment?: Moment;  // Currently selected moment for detailed explanation
  // NEW: Society Simulator context
  societyResult?: SocietyResult;
  societyAgents?: AgentSnapshot[];
  societyCoalitions?: Coalition[];
  societyMetrics?: SocietyMetrics;
  societyEvents?: SocietyEvent[];
  selectedAgentId?: number;
  currentEpoch?: number;
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
      case 'moment_exploration':
        return this.exploreMoments(query);
      case 'society_analysis':
        return this.analyzeSociety(query);
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

    // Society simulation patterns - check BEFORE moment exploration
    if (
      lower.includes('agent') ||
      lower.includes('defector') ||
      lower.includes('cooperator') ||
      lower.includes('reciprocator') ||
      lower.includes('strategy') ||
      lower.includes('society') ||
      lower.includes('coalition') ||
      lower.includes('gini') ||
      lower.includes('inequality') ||
      lower.includes('network density') ||
      lower.includes('who is winning') ||
      lower.includes('who is losing') ||
      lower.includes('how is the society') ||
      lower.includes('cooperation rate') ||
      lower.includes('why did') && lower.includes('form')
    ) {
      return 'society_analysis';
    }

    // Moment exploration patterns
    if (
      lower.includes('moment') ||
      lower.includes('highlight') ||
      lower.includes('emergent') ||
      lower.includes('most interesting') ||
      lower.includes('what happened') ||
      lower.includes('key event') ||
      lower.includes('significant') ||
      (lower.includes('karma') && lower.includes('event')) ||
      (lower.includes('consciousness') && lower.includes('cross'))
    ) {
      return 'moment_exploration';
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
      narrative += `All lives survived—the agent mastered ATP management and avoided energy exhaustion. Impressive!\n\n`;
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

    let narrative = `**Turn ${tick}, Life ${life.life_number}**: ${action}\n\n`;

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
      narrative += `- **${better} managed ATP much more effectively**—sustainable strategies vs energy struggles.\n`;
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
          "What is cross-life learning?"
        ]
      };
    }

    let narrative = `**Cross-Life Learning (EP)**\n\n`;

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
      relatedConcepts: ['Cross-Life Learning (EP)', 'Pattern Corpus', 'Meta-Cognition', 'Multi-Life Learning'],
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
    } else if (lower.includes('multi-session') || lower.includes('cumulative') || lower.includes('exemplar') || lower.includes('v2.0') || lower.includes('v2') || lower.includes('accumulation') || lower.includes('cross-session')) {
      return this.explainMultiSessionIdentity();
    } else if (lower.includes('circadian') || lower.includes('rhythm') || lower.includes('schedule') || lower.includes('autonomous') || lower.includes('sleep cycle') || lower.includes('6-hour') || lower.includes('six-hour')) {
      return this.explainCircadianAI();
    }

    return {
      text: "I can explain these Web4 concepts: ATP, Trust (T3), Karma, LCT (identity), Coherence Index (CI), Cross-Life Learning (EP), Learning Salience, SAGE raising, Confabulation patterns, Identity Anchoring (v1.0), Multi-Session Identity (v2.0), and Circadian AI. Which would you like to learn about?",
      type: 'suggestion',
      suggestedQueries: [
        "What is ATP?",
        "Explain trust tensors",
        "How does karma work?",
        "What is cross-life learning?",
        "What is learning salience?",
        "What is confabulation?",
        "What is identity anchoring?",
        "What is multi-session identity?",
        "Tell me about SAGE raising"
      ]
    };
  }

  private explainATP(): Response {
    return {
      text: `**Energy Budget (ATP): Attention Economics**\n\n` +
        `Think of ATP as *energy for digital existence*. Just like biological organisms need calories, Web4 entities need ATP.\n\n` +
        `**Key Properties**:\n` +
        `- Every action costs ATP (posting, messaging, voting)\n` +
        `- Valuable contributions earn ATP (creating quality, helping others)\n` +
        `- ATP = 0 means immediate death (no grace period)\n` +
        `- Only sustainable behaviors survive long-term\n\n` +
        `**Why This Matters**:\n` +
        `Spam becomes economically impossible—spammers burn ATP faster than they earn it. Quality naturally thrives because value creators earn more than they spend. No moderators needed—attention economics self-regulates.\n\n` +
        `**In Simulations**: Watch ATP fluctuate as agents make decisions. Critical threshold is ~20 ATP—below that, survival mode kicks in.`,
      type: 'explanation',
      relatedConcepts: ['Attention Economics', 'Aliveness', 'Sustainability'],
      suggestedQueries: [
        "Show me an ATP crisis in a simulation",
        "How do agents earn ATP?",
        "What happens when ATP reaches 0?"
      ]
    };
  }

  private explainTrust(): Response {
    return {
      text: `**Trust Tensors (T3): Multi-Dimensional, Role-Specific Trust**\n\n` +
        `Trust isn't a single number—it's a multi-dimensional tensor capturing different aspects of trustworthiness, always within a specific role context.\n\n` +
        `**Three Canonical Dimensions** (per role):\n` +
        `1. **Talent**: Natural aptitude and creativity within this role\n` +
        `2. **Training**: Learned skills, knowledge, and experience for this role\n` +
        `3. **Temperament**: Consistency, reliability, and ethical behavior in this role\n\n` +
        `**Why Role-Specific**:\n` +
        `Trust as a surgeon is independent of trust as a mechanic. You can't transfer trust between unrelated roles. Gaming requires building genuine trust across all dimensions within each role separately. Authenticity becomes the path of least resistance.\n\n` +
        `**In Simulations**: We use simplified T3 for clarity, but the principle remains—trust is earned through consistent, quality behavior over time within specific contexts.`,
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
        `Death carries real consequences. Good behavior compounds across lives. Bad actors die permanently. No account recreation loophole—your LCT persists, and society remembers.\n\n` +
        `**The 0.5 Threshold**:\n` +
        `Not arbitrary—it's a phase transition from coherence physics. Below 0.5 = random/reactive. Above 0.5 = genuine intentional behavior. Same threshold appears in superconductivity, biological systems, quantum coherence.`,
      type: 'explanation',
      relatedConcepts: ['Karma', 'Rebirth', 'Trust Threshold', 'Consciousness'],
      suggestedQueries: [
        "Show me a rebirth example",
        "Why 0.5 threshold?",
        "What happens to agents below 0.5?",
        "Explain trust thresholds"
      ]
    };
  }

  private explainLCT(): Response {
    return {
      text: `**LCT (Linked Context Token): Verifiable Presence**\n\n` +
        `An LCT makes your Web4 presence verifiable, bound to hardware you control (phone's Secure Enclave, laptop's TPM, FIDO2 key).\n\n` +
        `**Key Properties**:\n` +
        `- Hardware-bound: Private key never leaves secure chip\n` +
        `- Multi-device: Each device witnesses your presence\n` +
        `- More devices = stronger trust (counterintuitive but true!)\n` +
        `- Attack difficulty exponential in device count\n\n` +
        `**Why Traditional Identity Fails**:\n` +
        `Passwords = shared secret stored on servers = hackable. Create new account = fresh start = no consequences for bad behavior.\n\n` +
        `**Why LCT Works**:\n` +
        `Presence proves itself cryptographically. Trust accumulates on YOU (not an account). Can't fake presence without compromising multiple independent hardware chips. Society remembers your behavior.\n\n` +
        `**In Web4**: LCT is foundational—enables trust accumulation, karma persistence, rebirth eligibility. Without verifiable presence, everything else collapses.`,
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
      text: `**Cross-Life Learning (EP): Learning What You Know**\n\n` +
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
      relatedConcepts: ['Cross-Life Learning (EP)', 'Meta-Cognition', 'Pattern Learning', 'Wisdom Accumulation'],
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
        "What is the D5/D9 trust threshold?"
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
        `Confabulation directly impacts the training and temperament dimensions of T3 trust. Agents that confabulate will see their trust scores drop. The salience scoring system naturally filters out confabulated responses from training data.\n\n` +
        `Explore the [Confabulation Patterns Explorer](/confabulation-patterns) for interactive examples and the elaboration formula.`,
      type: 'explanation',
      relatedConcepts: ['Confabulation', 'AI Reliability', 'D5 Trust', 'Cross-Life Learning (EP)'],
      suggestedQueries: [
        "Explore confabulation patterns",
        "What is the D5 trust threshold?",
        "How does salience filter confabulation?",
        "What is cross-life learning?"
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

  private explainMultiSessionIdentity(): Response {
    return {
      text: `**Multi-Session Identity (v2.0): Cumulative Identity Context**\n\n` +
        `Identity anchoring v1.0 worked brilliantly—once. But Session 27 revealed a critical limitation: single-session priming doesn't accumulate. v2.0 solves this with cumulative identity context.\n\n` +
        `**The v1.0 Limitation**:\n` +
        `- Session 26: 20% self-reference ("As SAGE, I...")\n` +
        `- Session 27: 0% self-reference (identical intervention)\n` +
        `- **Discovery**: The model doesn't "remember" being SAGE—it has to be shown.\n\n` +
        `**The v2.0 Solution**:\n` +
        `Instead of priming identity fresh each session, v2.0 accumulates "identity exemplars"—successful instances of self-identification—and shows them to the model at session start.\n\n` +
        `**Four-Part Enhancement**:\n` +
        `1. **Cumulative Context**: Scan last 5 sessions for "As SAGE" instances → build exemplar library\n` +
        `2. **Stronger Priming**: "YOUR IDENTITY PATTERN - Examples from previous sessions..."\n` +
        `3. **Quality Control**: 50-80 word target (verbose responses correlate with identity loss)\n` +
        `4. **Mid-Conversation Reinforcement**: Reinject identity reminder every 2-3 turns\n\n` +
        `**Key Insight**:\n` +
        `When the model sees its own identity patterns from previous sessions, pattern recognition leads to pattern continuation. This is how architectural support compensates for frozen weights.\n\n` +
        `**Analogy**:\n` +
        `v1.0 = reminding someone their name each morning (helps that day, doesn't build memory)\n` +
        `v2.0 = showing someone photos of themselves ("Look, this is who you've been")\n\n` +
        `Explore the [Multi-Session Identity Explorer](/multi-session-identity) for interactive trajectory visualization and v1.0 vs v2.0 comparison.`,
      type: 'explanation',
      relatedConcepts: ['Cumulative Identity Context', 'Identity Exemplars', 'Pattern Continuation', 'Frozen Weights'],
      suggestedQueries: [
        "Explore multi-session identity data",
        "What is identity anchoring v1.0?",
        "Why did Session 27 regress?",
        "How many exemplars are needed for stability?"
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
   * Explore moments - significant events detected across simulations
   * Session #42: Integration with Emergent Moments Gallery
   */
  private exploreMoments(query: Query): Response {
    const { context } = query;
    const lower = query.text.toLowerCase();

    // If a specific moment is selected, explain it in detail
    if (context?.selectedMoment) {
      return this.explainMoment(context.selectedMoment);
    }

    // If moments are loaded, analyze them
    if (context?.moments && context.moments.length > 0) {
      const moments = context.moments;

      // Filter by category if mentioned
      if (lower.includes('karma')) {
        const karmaMoments = moments.filter(m => m.category === 'karma');
        if (karmaMoments.length > 0) {
          return this.listMomentsOfCategory(karmaMoments, 'karma');
        }
      }

      if (lower.includes('emergence') || lower.includes('consciousness') || lower.includes('threshold')) {
        const emergenceMoments = moments.filter(m => m.category === 'emergence');
        if (emergenceMoments.length > 0) {
          return this.listMomentsOfCategory(emergenceMoments, 'emergence');
        }
      }

      if (lower.includes('crisis') || lower.includes('death')) {
        const crisisMoments = moments.filter(m => m.category === 'crisis');
        if (crisisMoments.length > 0) {
          return this.listMomentsOfCategory(crisisMoments, 'crisis');
        }
      }

      if (lower.includes('learning') || lower.includes('maturation')) {
        const learningMoments = moments.filter(m => m.category === 'learning');
        if (learningMoments.length > 0) {
          return this.listMomentsOfCategory(learningMoments, 'learning');
        }
      }

      // Default: show most interesting moments
      return this.showMostInterestingMoments(moments);
    }

    // No moments loaded - guide to the moments page
    return {
      text: `**Exploring Emergent Moments**\n\n` +
        `Moments are the most interesting events detected across all simulations—` +
        `trust collapses, trust thresholds, karma effects, and more.\n\n` +
        `To explore moments:\n` +
        `1. Visit the [Emergent Moments Gallery](/moments) to browse all detected moments\n` +
        `2. Click on any moment to see detailed analysis\n` +
        `3. Or load simulation data here to analyze moments in context\n\n` +
        `**What can I tell you about?**\n` +
        `- "Show me karma events" - Trust carrying across lives\n` +
        `- "What trust thresholds were crossed?" - 0.5 transition moments\n` +
        `- "Tell me about trust collapses" - Dramatic trust losses\n` +
        `- "What's the most interesting moment?" - Highest-ranked emergent event`,
      type: 'suggestion',
      suggestedQueries: [
        "Show me karma events",
        "What trust thresholds were crossed?",
        "Tell me about coalition formation",
        "What's the most interesting moment?"
      ]
    };
  }

  /**
   * Explain a specific moment in detail
   */
  private explainMoment(moment: Moment): Response {
    const categoryInfo = CATEGORY_INFO[moment.category];

    let text = `**${categoryInfo.emoji} ${moment.title}**\n\n`;
    text += `${moment.narrative}\n\n`;
    text += `**Why This Matters**:\n${moment.significance}\n\n`;
    text += `**Context**:\n`;
    text += `- Simulation: ${moment.simulationLabel}\n`;
    text += `- Life: ${moment.lifeNumber}\n`;
    text += `- Tick: ${moment.tick}\n`;
    text += `- Category: ${categoryInfo.label}\n`;
    text += `- Severity: ${moment.severity}\n\n`;

    // Add data-specific insights
    if (moment.category === 'karma' && moment.data.karmaEffect) {
      const effect = moment.data.karmaEffect;
      text += `**Karma Details**:\n`;
      text += `- Previous life final trust: ${moment.data.prevFinalTrust.toFixed(3)}\n`;
      text += `- New life starting trust: ${moment.data.newInitialTrust.toFixed(3)}\n`;
      text += `- Karma effect: ${effect > 0 ? '+' : ''}${(effect * 100).toFixed(1)}%\n`;
    }

    if (moment.category === 'trust' && moment.data.percentChange) {
      text += `**Trust Change Details**:\n`;
      text += `- Before: ${moment.data.prevTrust.toFixed(3)}\n`;
      text += `- After: ${moment.data.newTrust.toFixed(3)}\n`;
      text += `- Change: ${(moment.data.percentChange * 100).toFixed(1)}%\n`;
    }

    if (moment.category === 'crisis' && moment.data.currentATP !== undefined) {
      text += `**Crisis Details**:\n`;
      text += `- ATP dropped to: ${moment.data.currentATP}\n`;
      text += `- Previous ATP: ${moment.data.previousATP}\n`;
    }

    const relatedConcepts = this.getRelatedConceptsForCategory(moment.category);

    return {
      text,
      type: 'explanation',
      relatedConcepts,
      suggestedQueries: [
        "Show me more moments like this",
        `What else happened in life ${moment.lifeNumber}?`,
        "Explain why this matters for Web4",
        "Show me the full simulation narrative"
      ]
    };
  }

  /**
   * List moments of a specific category
   */
  private listMomentsOfCategory(moments: Moment[], category: MomentCategory): Response {
    const categoryInfo = CATEGORY_INFO[category];
    const sorted = [...moments].sort((a, b) => {
      const severityOrder: Record<string, number> = { critical: 3, high: 2, medium: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

    const top5 = sorted.slice(0, 5);

    let text = `**${categoryInfo.emoji} ${categoryInfo.label} Moments** (${moments.length} total)\n\n`;
    text += `${categoryInfo.description}\n\n`;

    for (let i = 0; i < top5.length; i++) {
      const m = top5[i];
      text += `**${i + 1}. ${m.title}** (${m.simulationLabel})\n`;
      text += `   ${m.narrative.substring(0, 150)}${m.narrative.length > 150 ? '...' : ''}\n\n`;
    }

    if (moments.length > 5) {
      text += `_...and ${moments.length - 5} more. Visit [Emergent Moments Gallery](/moments) to see all._\n`;
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: this.getRelatedConceptsForCategory(category),
      suggestedQueries: [
        "Tell me more about the first one",
        "Show me moments from a different category",
        "What's the most interesting moment overall?",
        "Explain how these relate to Web4"
      ]
    };
  }

  /**
   * Show the most interesting moments across all categories
   */
  private showMostInterestingMoments(moments: Moment[]): Response {
    // Rank by category priority and severity
    const sorted = [...moments].sort((a, b) => {
      const priorityDiff = CATEGORY_PRIORITY[b.category] - CATEGORY_PRIORITY[a.category];
      if (priorityDiff !== 0) return priorityDiff;
      const severityOrder: Record<string, number> = { critical: 3, high: 2, medium: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });

    const top5 = sorted.slice(0, 5);

    let text = `**Most Interesting Moments Detected**\n\n`;
    text += `Across all simulations, these events reveal the most about how trust dynamics work:\n\n`;

    for (let i = 0; i < top5.length; i++) {
      const m = top5[i];
      const info = CATEGORY_INFO[m.category];
      text += `**${i + 1}. ${info.emoji} ${m.title}**\n`;
      text += `   _${m.simulationLabel}, Life ${m.lifeNumber}, Turn ${m.tick}_\n`;
      text += `   ${m.significance}\n\n`;
    }

    text += `\n_Total moments detected: ${moments.length}. Visit [Emergent Moments Gallery](/moments) to explore all._`;

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Emergent Behavior', 'Trust Dynamics', 'Karma', 'Trust Thresholds'],
      suggestedQueries: [
        "Tell me more about the first one",
        "Show me all karma events",
        "What trust thresholds were crossed?",
        "How do I find interesting moments myself?"
      ]
    };
  }

  /**
   * Get related concepts for a moment category
   */
  private getRelatedConceptsForCategory(category: MomentCategory): string[] {
    const categoryRelated: Record<MomentCategory, string[]> = {
      trust: ['Trust Tensors', 'Coherence Index', 'Reputation'],
      atp: ['ATP Economics', 'Energy Budget', 'Sustainability'],
      karma: ['Karma', 'Rebirth', 'Multi-Life Learning', 'Trust Threshold'],
      learning: ['Cross-Life Learning (EP)', 'Pattern Corpus', 'Maturation'],
      crisis: ['ATP Exhaustion', 'Death', 'Survival Strategies'],
      emergence: ['Trust Threshold', 'Coherence Theory', 'Coalition Formation'],
    };
    return categoryRelated[category] || ['Trust Dynamics', 'Web4'];
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

  // ============================================================================
  // Society Simulator Analysis (Session #44)
  // ============================================================================

  /**
   * Analyze society simulation - agents, coalitions, dynamics
   */
  private analyzeSociety(query: Query): Response {
    const { context } = query;
    const lower = query.text.toLowerCase();

    // Check if we have society context
    if (!context?.societyAgents || context.societyAgents.length === 0) {
      return {
        text: `**Run a Society Simulation First**\n\n` +
          `I can analyze multi-agent trust dynamics once you run a simulation.\n\n` +
          `Click **Run Society** above to start, then ask me questions like:\n` +
          `- "Why did Alice lose trust?"\n` +
          `- "How are coalitions forming?"\n` +
          `- "Which strategy is winning?"\n` +
          `- "Is inequality increasing?"`,
        type: 'suggestion',
        suggestedQueries: [
          "What is the Society Simulator?",
          "Explain agent strategies",
          "How do coalitions form?",
          "How is wealth inequality measured?"
        ]
      };
    }

    // Route to specific analysis
    if (lower.includes('who') && (lower.includes('winning') || lower.includes('best'))) {
      return this.analyzeWinners(context);
    }
    if (lower.includes('who') && (lower.includes('losing') || lower.includes('worst') || lower.includes('struggling'))) {
      return this.analyzeLosers(context);
    }
    if (lower.includes('coalition')) {
      return this.analyzeCoalitions(context);
    }
    if (lower.includes('defector')) {
      return this.analyzeDefectors(context);
    }
    if (lower.includes('cooperator')) {
      return this.analyzeCooperators(context);
    }
    if (lower.includes('strategy') || lower.includes('strategies')) {
      return this.analyzeStrategies(context);
    }
    if (lower.includes('inequality') || lower.includes('gini')) {
      return this.analyzeInequality(context);
    }
    if (lower.includes('network') || lower.includes('density')) {
      return this.analyzeNetwork(context);
    }
    if (context.selectedAgentId !== undefined) {
      return this.analyzeSelectedAgent(context);
    }

    // Default: general society overview
    return this.analyzeSocietyOverview(context);
  }

  /**
   * General society overview
   */
  private analyzeSocietyOverview(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const metrics = context.societyMetrics;
    const coalitions = context.societyCoalitions || [];
    const events = context.societyEvents || [];
    const epoch = context.currentEpoch ?? 0;

    let text = `**Society Status (Round ${epoch + 1})**\n\n`;

    if (metrics) {
      // Trust assessment
      const trustLevel = metrics.averageTrust > 0.6 ? 'thriving' :
                        metrics.averageTrust > 0.4 ? 'stable' :
                        metrics.averageTrust > 0.25 ? 'struggling' : 'collapsing';
      text += `🤝 **Trust**: ${metrics.averageTrust.toFixed(2)} average (${trustLevel})\n`;

      // Cooperation
      const coopLevel = metrics.cooperationRate > 0.7 ? 'highly cooperative' :
                       metrics.cooperationRate > 0.5 ? 'moderately cooperative' :
                       metrics.cooperationRate > 0.3 ? 'mixed' : 'competitive';
      text += `🤲 **Cooperation**: ${(metrics.cooperationRate * 100).toFixed(0)}% (${coopLevel})\n`;

      // Coalitions
      if (coalitions.length > 0) {
        text += `👥 **Coalitions**: ${coalitions.length} formed`;
        if (metrics.largestCoalition > 0) {
          text += ` (largest has ${metrics.largestCoalition} members)`;
        }
        text += `\n`;
      } else {
        text += `👥 **Coalitions**: None yet - trust hasn't crossed threshold\n`;
      }

      // Inequality
      const inequalityLevel = metrics.giniCoefficient < 0.25 ? 'very equal' :
                             metrics.giniCoefficient < 0.4 ? 'moderate inequality' :
                             metrics.giniCoefficient < 0.6 ? 'high inequality' : 'extreme inequality';
      text += `📊 **Inequality (Wealth Gap)**: ${metrics.giniCoefficient.toFixed(2)} (${inequalityLevel})\n`;
    }

    text += `\n**Population**: ${agents.length} agents alive\n`;

    // Strategy breakdown
    const stratCounts: Record<string, number> = {};
    agents.forEach(a => { stratCounts[a.strategy] = (stratCounts[a.strategy] || 0) + 1; });
    const stratList = Object.entries(stratCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([s, c]) => `${STRATEGY_LABELS[s as StrategyType]}: ${c}`)
      .join(', ');
    text += `**Strategies**: ${stratList}\n`;

    // Recent notable events
    if (events.length > 0) {
      const recentEvents = events.slice(-3);
      text += `\n**Recent Events**:\n`;
      recentEvents.forEach(e => {
        text += `- ${e.message}\n`;
      });
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Multi-Agent Dynamics', 'Trust Networks', 'Coalition Formation'],
      suggestedQueries: [
        "Who is winning?",
        "How are coalitions forming?",
        "Why are defectors struggling?",
        "Is inequality increasing?"
      ]
    };
  }

  /**
   * Analyze who's winning (highest trust, ATP, etc.)
   */
  private analyzeWinners(context: QueryContext): Response {
    const agents = context.societyAgents!;

    // Sort by different metrics
    const byTrust = [...agents].sort((a, b) => {
      const aAvgTrust = a.trustEdges.length > 0
        ? a.trustEdges.reduce((s, e) => s + e.trust, 0) / a.trustEdges.length
        : 0;
      const bAvgTrust = b.trustEdges.length > 0
        ? b.trustEdges.reduce((s, e) => s + e.trust, 0) / b.trustEdges.length
        : 0;
      return bAvgTrust - aAvgTrust;
    });
    const byATP = [...agents].sort((a, b) => b.atp - a.atp);
    const byReputation = [...agents].sort((a, b) => b.reputation - a.reputation);
    const byCoalition = [...agents].sort((a, b) => b.coalitionSize - a.coalitionSize);

    let text = `**Who's Winning?**\n\n`;

    text += `💰 **Most ATP**: ${byATP[0].name} (${STRATEGY_LABELS[byATP[0].strategy]}) with ${byATP[0].atp.toFixed(0)} ATP\n`;
    text += `⭐ **Best Reputation**: ${byReputation[0].name} (${STRATEGY_LABELS[byReputation[0].strategy]}) at ${byReputation[0].reputation.toFixed(2)}\n`;

    if (byCoalition[0].coalitionSize > 0) {
      text += `👥 **Most Connected**: ${byCoalition[0].name} with ${byCoalition[0].coalitionSize} coalition partners\n`;
    }

    text += `\n**Top 3 Overall** (by reputation):\n`;
    byReputation.slice(0, 3).forEach((a, i) => {
      text += `${i + 1}. **${a.name}** (${STRATEGY_LABELS[a.strategy]}): `;
      text += `Rep ${a.reputation.toFixed(2)}, ATP ${a.atp.toFixed(0)}, `;
      text += `${(a.cooperationRate * 100).toFixed(0)}% cooperation\n`;
    });

    // Insight about winning strategies
    const winnerStrategies = byReputation.slice(0, 3).map(a => a.strategy);
    const stratCount: Record<string, number> = {};
    winnerStrategies.forEach(s => { stratCount[s] = (stratCount[s] || 0) + 1; });
    const dominantWinnerStrat = Object.entries(stratCount).sort((a, b) => b[1] - a[1])[0];

    if (dominantWinnerStrat && dominantWinnerStrat[1] >= 2) {
      text += `\n**Insight**: ${STRATEGY_LABELS[dominantWinnerStrat[0] as StrategyType]}s are dominating the top spots. `;
      text += this.getStrategyInsight(dominantWinnerStrat[0] as StrategyType, 'winning');
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Reputation', 'Trust Building', 'Coalition Benefits'],
      suggestedQueries: [
        "Who is losing?",
        `Tell me about ${byReputation[0].name}`,
        "Why do cooperators succeed?",
        "How do coalitions help?"
      ]
    };
  }

  /**
   * Analyze who's losing (lowest trust, ATP, etc.)
   */
  private analyzeLosers(context: QueryContext): Response {
    const agents = context.societyAgents!;

    const byReputation = [...agents].sort((a, b) => a.reputation - b.reputation);
    const byATP = [...agents].sort((a, b) => a.atp - b.atp);
    const isolated = agents.filter(a => a.coalitionSize === 0);

    let text = `**Who's Struggling?**\n\n`;

    text += `📉 **Lowest Reputation**: ${byReputation[0].name} (${STRATEGY_LABELS[byReputation[0].strategy]}) at ${byReputation[0].reputation.toFixed(2)}\n`;
    text += `⚡ **Lowest ATP**: ${byATP[0].name} (${STRATEGY_LABELS[byATP[0].strategy]}) with ${byATP[0].atp.toFixed(0)}\n`;

    if (isolated.length > 0) {
      const isolatedNames = isolated.slice(0, 3).map(a => a.name).join(', ');
      text += `🏝️ **Isolated** (no coalitions): ${isolatedNames}${isolated.length > 3 ? ` +${isolated.length - 3} more` : ''}\n`;
    }

    text += `\n**Bottom 3** (by reputation):\n`;
    byReputation.slice(0, 3).forEach((a, i) => {
      text += `${i + 1}. **${a.name}** (${STRATEGY_LABELS[a.strategy]}): `;
      text += `Rep ${a.reputation.toFixed(2)}, ATP ${a.atp.toFixed(0)}, `;
      text += `${(a.cooperationRate * 100).toFixed(0)}% cooperation\n`;
    });

    // Insight about losing strategies
    const loserStrategies = byReputation.slice(0, 3).map(a => a.strategy);
    const stratCount: Record<string, number> = {};
    loserStrategies.forEach(s => { stratCount[s] = (stratCount[s] || 0) + 1; });
    const dominantLoserStrat = Object.entries(stratCount).sort((a, b) => b[1] - a[1])[0];

    if (dominantLoserStrat && dominantLoserStrat[1] >= 2) {
      text += `\n**Insight**: ${STRATEGY_LABELS[dominantLoserStrat[0] as StrategyType]}s are disproportionately at the bottom. `;
      text += this.getStrategyInsight(dominantLoserStrat[0] as StrategyType, 'losing');
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Trust Erosion', 'Social Isolation', 'Strategy Failure'],
      suggestedQueries: [
        "Who is winning?",
        "Why do defectors fail?",
        "Can isolated agents recover?",
        "What happens when ATP hits 0?"
      ]
    };
  }

  /**
   * Analyze coalitions
   */
  private analyzeCoalitions(context: QueryContext): Response {
    const coalitions = context.societyCoalitions || [];
    const agents = context.societyAgents!;

    if (coalitions.length === 0) {
      return {
        text: `**No Coalitions Yet**\n\n` +
          `Coalitions form when mutual trust between agents crosses the threshold (0.5).\n\n` +
          `**Why no coalitions?**\n` +
          `- Trust hasn't had time to build (early epochs)\n` +
          `- Defectors are eroding trust faster than it builds\n` +
          `- Cautious agents haven't warmed up yet\n\n` +
          `Keep watching—cooperation often takes time to emerge.`,
        type: 'explanation',
        suggestedQueries: [
          "Who has the most trust?",
          "Which agents are closest to forming coalitions?",
          "Why does trust take time to build?"
        ]
      };
    }

    let text = `**Coalition Analysis**\n\n`;
    text += `${coalitions.length} coalition${coalitions.length > 1 ? 's' : ''} detected:\n\n`;

    coalitions.slice(0, 3).forEach((c, i) => {
      const memberNames = c.members
        .map(id => agents.find(a => a.id === id)?.name || `#${id}`)
        .join(', ');
      text += `**Coalition ${i + 1}** (${c.members.length} members):\n`;
      text += `- Members: ${memberNames}\n`;
      text += `- Average internal trust: ${c.averageTrust.toFixed(2)}\n`;
      text += `- Combined ATP: ${c.totalATP.toFixed(0)}\n`;
      text += `- Dominant strategy: ${STRATEGY_LABELS[c.dominantStrategy]}\n\n`;
    });

    // Coalition vs non-coalition comparison
    const coalitionMembers = new Set(coalitions.flatMap(c => c.members));
    const inCoalition = agents.filter(a => coalitionMembers.has(a.id));
    const notInCoalition = agents.filter(a => !coalitionMembers.has(a.id));

    if (inCoalition.length > 0 && notInCoalition.length > 0) {
      const avgRepInCoalition = inCoalition.reduce((s, a) => s + a.reputation, 0) / inCoalition.length;
      const avgRepOutside = notInCoalition.reduce((s, a) => s + a.reputation, 0) / notInCoalition.length;

      text += `**Coalition Effect**:\n`;
      text += `- Coalition members avg reputation: ${avgRepInCoalition.toFixed(2)}\n`;
      text += `- Non-members avg reputation: ${avgRepOutside.toFixed(2)}\n`;

      if (avgRepInCoalition > avgRepOutside) {
        text += `\nCoalition members are building trust faster—cooperation begets cooperation.`;
      } else {
        text += `\nInteresting: outsiders are doing well. This society may be more competitive than cooperative.`;
      }
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Coalition Formation', 'Mutual Trust', 'Emergent Structure'],
      suggestedQueries: [
        "Why do coalitions form?",
        "Who's isolated?",
        "Can outsiders join coalitions?",
        "What breaks coalitions apart?"
      ]
    };
  }

  /**
   * Analyze defectors specifically
   */
  private analyzeDefectors(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const defectors = agents.filter(a => a.strategy === 'defector');

    if (defectors.length === 0) {
      return {
        text: `**No Defectors in This Society**\n\n` +
          `This simulation doesn't include any pure defector agents. ` +
          `Try the "Hostile World" scenario to see how defectors perform against cooperators.`,
        type: 'suggestion',
        suggestedQueries: [
          "What is a defector?",
          "How do reciprocators handle defectors?",
          "Compare cooperative vs hostile scenarios"
        ]
      };
    }

    const avgRep = defectors.reduce((s, a) => s + a.reputation, 0) / defectors.length;
    const avgATP = defectors.reduce((s, a) => s + a.atp, 0) / defectors.length;
    const isolated = defectors.filter(a => a.coalitionSize === 0).length;

    // Compare to society average
    const societyAvgRep = agents.reduce((s, a) => s + a.reputation, 0) / agents.length;

    let text = `**Defector Analysis**\n\n`;
    text += `${defectors.length} defector${defectors.length > 1 ? 's' : ''} in this society.\n\n`;

    defectors.forEach(d => {
      text += `**${d.name}**: `;
      text += `Rep ${d.reputation.toFixed(2)}, ATP ${d.atp.toFixed(0)}, `;
      text += d.coalitionSize > 0 ? `${d.coalitionSize} partners\n` : `isolated\n`;
    });

    text += `\n**Defector Performance**:\n`;
    text += `- Average reputation: ${avgRep.toFixed(2)} (society avg: ${societyAvgRep.toFixed(2)})\n`;
    text += `- Average ATP: ${avgATP.toFixed(0)}\n`;
    text += `- Isolated: ${isolated}/${defectors.length}\n\n`;

    if (avgRep < societyAvgRep) {
      text += `**Insight**: Defectors are underperforming. Their strategy of always exploiting `;
      text += `burns trust faster than it earns ATP. In trust-native societies, exploitation is unsustainable.`;
    } else {
      text += `**Insight**: Defectors are doing surprisingly well. This may be early in the simulation, `;
      text += `or cooperators haven't yet learned to avoid them.`;
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Defection', 'Exploitation', 'Trust Erosion', 'Social Isolation'],
      suggestedQueries: [
        "Why do defectors fail long-term?",
        "Can defectors ever succeed?",
        "How do reciprocators punish defectors?",
        "What is trust nihilism?"
      ]
    };
  }

  /**
   * Analyze cooperators specifically
   */
  private analyzeCooperators(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const cooperators = agents.filter(a => a.strategy === 'cooperator');

    if (cooperators.length === 0) {
      return {
        text: `**No Pure Cooperators in This Society**\n\n` +
          `This simulation doesn't include any pure cooperator agents. ` +
          `Pure cooperators always cooperate, making them trusting but potentially exploitable.`,
        type: 'suggestion',
        suggestedQueries: [
          "What are the different strategies?",
          "Which strategy is best?",
          "How do adaptive agents work?"
        ]
      };
    }

    const avgRep = cooperators.reduce((s, a) => s + a.reputation, 0) / cooperators.length;
    const avgATP = cooperators.reduce((s, a) => s + a.atp, 0) / cooperators.length;
    const inCoalitions = cooperators.filter(a => a.coalitionSize > 0).length;

    const societyAvgRep = agents.reduce((s, a) => s + a.reputation, 0) / agents.length;
    const defectors = agents.filter(a => a.strategy === 'defector');

    let text = `**Cooperator Analysis**\n\n`;
    text += `${cooperators.length} cooperator${cooperators.length > 1 ? 's' : ''} in this society.\n\n`;

    cooperators.forEach(c => {
      text += `**${c.name}**: `;
      text += `Rep ${c.reputation.toFixed(2)}, ATP ${c.atp.toFixed(0)}, `;
      text += c.coalitionSize > 0 ? `${c.coalitionSize} partners\n` : `building trust...\n`;
    });

    text += `\n**Cooperator Performance**:\n`;
    text += `- Average reputation: ${avgRep.toFixed(2)} (society avg: ${societyAvgRep.toFixed(2)})\n`;
    text += `- Average ATP: ${avgATP.toFixed(0)}\n`;
    text += `- In coalitions: ${inCoalitions}/${cooperators.length}\n\n`;

    if (avgRep > societyAvgRep) {
      text += `**Insight**: Cooperators are thriving! Their unconditional cooperation builds trust quickly. `;
      if (defectors.length > 0) {
        text += `Even with defectors present, the cooperative strategy is paying off.`;
      } else {
        text += `In a society without defectors, pure cooperation is optimal.`;
      }
    } else {
      text += `**Insight**: Cooperators are being exploited. Pure cooperation is vulnerable `;
      text += `when defectors are present—they give without getting. `;
      text += `Reciprocators often outperform in mixed societies.`;
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Cooperation', 'Trust Building', 'Vulnerability', 'Coalition Formation'],
      suggestedQueries: [
        "Are cooperators being exploited?",
        "Why do cooperators cluster together?",
        "Compare cooperators vs reciprocators",
        "What is the evolution of cooperation?"
      ]
    };
  }

  /**
   * Analyze all strategies
   */
  private analyzeStrategies(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const metrics = context.societyMetrics;

    const stratStats: Record<StrategyType, { count: number; avgRep: number; avgATP: number; avgCoop: number }> = {
      cooperator: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
      defector: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
      reciprocator: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
      cautious: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
      adaptive: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
      human: { count: 0, avgRep: 0, avgATP: 0, avgCoop: 0 },
    };

    agents.forEach(a => {
      const s = stratStats[a.strategy];
      s.count++;
      s.avgRep += a.reputation;
      s.avgATP += a.atp;
      s.avgCoop += a.cooperationRate;
    });

    // Calculate averages
    for (const strat of Object.keys(stratStats) as StrategyType[]) {
      const s = stratStats[strat];
      if (s.count > 0) {
        s.avgRep /= s.count;
        s.avgATP /= s.count;
        s.avgCoop /= s.count;
      }
    }

    // Rank by reputation
    const ranked = (Object.entries(stratStats) as [StrategyType, typeof stratStats.cooperator][])
      .filter(([, s]) => s.count > 0)
      .sort((a, b) => b[1].avgRep - a[1].avgRep);

    let text = `**Strategy Comparison**\n\n`;

    ranked.forEach(([strat, stats], i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
      text += `${medal} **${STRATEGY_LABELS[strat]}** (${stats.count} agents)\n`;
      text += `   Reputation: ${stats.avgRep.toFixed(2)} | ATP: ${stats.avgATP.toFixed(0)} | `;
      text += `Cooperation: ${(stats.avgCoop * 100).toFixed(0)}%\n\n`;
    });

    // Winner analysis
    const winner = ranked[0];
    text += `**Analysis**: ${STRATEGY_LABELS[winner[0]]}s are currently leading. `;
    text += this.getStrategyInsight(winner[0], 'winning');

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Strategy', 'Game Theory', 'Iterated Prisoner\'s Dilemma'],
      suggestedQueries: [
        "Why is this strategy winning?",
        "Tell me about reciprocators",
        "What is tit-for-tat?",
        "Can strategies change?"
      ]
    };
  }

  /**
   * Analyze inequality
   */
  private analyzeInequality(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const metrics = context.societyMetrics;

    const gini = metrics?.giniCoefficient ?? 0;
    const atps = agents.map(a => a.atp).sort((a, b) => a - b);
    const minATP = atps[0];
    const maxATP = atps[atps.length - 1];
    const medianATP = atps[Math.floor(atps.length / 2)];

    let text = `**Inequality Analysis**\n\n`;

    text += `**Wealth Gap**: ${gini.toFixed(3)}\n\n`;
    text += `Interpretation:\n`;
    text += `- 0.0 = Perfect equality (everyone has same ATP)\n`;
    text += `- 0.3 = Healthy inequality (like Nordic countries)\n`;
    text += `- 0.5 = High inequality (like USA)\n`;
    text += `- 0.7+ = Extreme inequality (oligarchy)\n\n`;

    const level = gini < 0.25 ? 'very equal' :
                 gini < 0.4 ? 'moderately unequal' :
                 gini < 0.6 ? 'highly unequal' : 'extremely unequal';
    text += `This society is **${level}**.\n\n`;

    text += `**ATP Distribution**:\n`;
    text += `- Minimum: ${minATP.toFixed(0)}\n`;
    text += `- Median: ${medianATP.toFixed(0)}\n`;
    text += `- Maximum: ${maxATP.toFixed(0)}\n`;
    text += `- Ratio (max/min): ${minATP > 0 ? (maxATP / minATP).toFixed(1) : '∞'}x\n\n`;

    // Find who has the most and least
    const richest = agents.reduce((max, a) => a.atp > max.atp ? a : max, agents[0]);
    const poorest = agents.reduce((min, a) => a.atp < min.atp ? a : min, agents[0]);

    text += `**Extremes**:\n`;
    text += `- Richest: ${richest.name} (${STRATEGY_LABELS[richest.strategy]}) with ${richest.atp.toFixed(0)} ATP\n`;
    text += `- Poorest: ${poorest.name} (${STRATEGY_LABELS[poorest.strategy]}) with ${poorest.atp.toFixed(0)} ATP\n`;

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Wealth Gap', 'Wealth Distribution', 'Social Mobility'],
      suggestedQueries: [
        "Why does inequality increase?",
        "Do coalitions increase inequality?",
        "What happens when ATP concentrates?",
        "How can inequality be reduced?"
      ]
    };
  }

  /**
   * Analyze network density
   */
  private analyzeNetwork(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const metrics = context.societyMetrics;

    const density = metrics?.networkDensity ?? 0;
    const totalPossibleEdges = agents.length * (agents.length - 1);

    // Count actual trust edges above threshold
    let actualEdges = 0;
    agents.forEach(a => {
      actualEdges += a.trustEdges.filter(e => e.trust >= 0.5).length;
    });

    let text = `**Trust Network Analysis**\n\n`;

    text += `**Network Density**: ${(density * 100).toFixed(1)}%\n\n`;
    text += `This measures how connected the trust network is:\n`;
    text += `- ${actualEdges} trust relationships exist (above 0.5 threshold)\n`;
    text += `- ${totalPossibleEdges} maximum possible connections\n\n`;

    const densityLevel = density < 0.1 ? 'sparse' :
                        density < 0.3 ? 'developing' :
                        density < 0.5 ? 'well-connected' : 'dense';
    text += `This network is **${densityLevel}**.\n\n`;

    // Find most and least connected
    const byConnections = [...agents].sort((a, b) =>
      b.trustEdges.filter(e => e.trust >= 0.5).length -
      a.trustEdges.filter(e => e.trust >= 0.5).length
    );

    text += `**Most Connected**:\n`;
    byConnections.slice(0, 3).forEach(a => {
      const strongEdges = a.trustEdges.filter(e => e.trust >= 0.5).length;
      text += `- ${a.name}: ${strongEdges} strong trust connections\n`;
    });

    const isolated = agents.filter(a => a.trustEdges.filter(e => e.trust >= 0.5).length === 0);
    if (isolated.length > 0) {
      text += `\n**Isolated** (no strong trust): ${isolated.map(a => a.name).join(', ')}\n`;
    }

    text += `\n**Network Effect**: Denser networks enable faster information flow `;
    text += `and stronger collective action. Trust creates structure.`;

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Network Density', 'Trust Connections', 'Social Capital'],
      suggestedQueries: [
        "Why do some agents have more connections?",
        "How do isolated agents recover?",
        "What is the small world effect?",
        "Does network density correlate with cooperation?"
      ]
    };
  }

  /**
   * Analyze a specifically selected agent
   */
  private analyzeSelectedAgent(context: QueryContext): Response {
    const agents = context.societyAgents!;
    const selectedId = context.selectedAgentId!;
    const agent = agents.find(a => a.id === selectedId);

    if (!agent) {
      return {
        text: `Could not find selected agent. Try clicking on an agent in the network graph.`,
        type: 'error'
      };
    }

    let text = `**Agent Analysis: ${agent.name}**\n\n`;

    text += `**Strategy**: ${STRATEGY_LABELS[agent.strategy]}\n`;
    text += this.getStrategyDescription(agent.strategy) + `\n\n`;

    text += `**Current Status**:\n`;
    text += `- ATP: ${agent.atp.toFixed(0)} ${agent.atp < 30 ? '⚠️ LOW' : ''}\n`;
    text += `- Reputation: ${agent.reputation.toFixed(3)}\n`;
    text += `- Cooperation Rate: ${(agent.cooperationRate * 100).toFixed(0)}%\n`;
    text += `- Rebirths: ${agent.generation - 1}\n`;
    text += `- Coalition Partners: ${agent.coalitionSize}\n\n`;

    // Trust relationships
    const strongTrust = agent.trustEdges.filter(e => e.trust >= 0.5);
    const weakTrust = agent.trustEdges.filter(e => e.trust < 0.3);

    if (strongTrust.length > 0) {
      text += `**Strong Trust Relationships**:\n`;
      strongTrust.slice(0, 5).forEach(e => {
        const target = agents.find(a => a.id === e.targetId);
        text += `- ${target?.name || '#' + e.targetId}: ${e.trust.toFixed(2)}\n`;
      });
      text += `\n`;
    }

    if (weakTrust.length > 0) {
      text += `**Low Trust Toward**:\n`;
      weakTrust.slice(0, 3).forEach(e => {
        const target = agents.find(a => a.id === e.targetId);
        text += `- ${target?.name || '#' + e.targetId}: ${e.trust.toFixed(2)}\n`;
      });
    }

    return {
      text,
      type: 'explanation',
      relatedConcepts: ['Agent Behavior', agent.strategy, 'Trust Relationships'],
      suggestedQueries: [
        `Why is ${agent.name}'s cooperation rate ${(agent.cooperationRate * 100).toFixed(0)}%?`,
        `Who does ${agent.name} trust most?`,
        `Is ${agent.name} in a coalition?`,
        `Compare ${agent.name} to other ${STRATEGY_LABELS[agent.strategy]}s`
      ]
    };
  }

  /**
   * Get insight text for why a strategy is winning/losing
   */
  private getStrategyInsight(strategy: StrategyType, outcome: 'winning' | 'losing'): string {
    const insights: Record<StrategyType, { winning: string; losing: string }> = {
      cooperator: {
        winning: 'Unconditional cooperation builds trust quickly in friendly environments.',
        losing: 'Pure cooperators are exploited by defectors—they give without protecting themselves.'
      },
      defector: {
        winning: 'Early exploitation can generate ATP before trust networks form. This is usually temporary.',
        losing: 'Always defecting burns trust. Once identified, defectors get isolated—no one wants to interact with them.'
      },
      reciprocator: {
        winning: 'Tit-for-tat is evolutionarily stable: cooperates with cooperators, punishes defectors.',
        losing: 'Reciprocators can get stuck in defection spirals with other reciprocators after initial conflicts.'
      },
      cautious: {
        winning: 'Cautious agents avoid exploitation while still building trust once safety is established.',
        losing: 'Being too cautious can miss opportunities and slow trust building in cooperative environments.'
      },
      adaptive: {
        winning: 'Learning from trust levels allows optimal behavior in any environment—the most flexible strategy.',
        losing: 'In early stages, adaptive agents lack data and can make poor decisions. They need time to calibrate.'
      },
      human: {
        winning: 'Human intuition and strategic thinking can outperform rigid algorithms in complex social situations.',
        losing: 'Emotional decisions or inconsistency can erode trust faster than predictable algorithmic behavior.'
      }
    };
    return insights[strategy][outcome];
  }

  /**
   * Get strategy description
   */
  private getStrategyDescription(strategy: StrategyType): string {
    const descriptions: Record<StrategyType, string> = {
      cooperator: 'Always cooperates. Trusting and vulnerable but builds trust quickly.',
      defector: 'Always defects. Gains short-term advantage but loses trust over time.',
      reciprocator: 'Tit-for-tat: cooperates first, then mirrors the other\'s last action.',
      cautious: 'Only cooperates when trust is established. Slow to warm up but resilient.',
      adaptive: 'Cooperates proportional to trust level. Learns and adapts from experience.',
      human: 'You—making real decisions about trust and cooperation based on your judgment.'
    };
    return descriptions[strategy];
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
