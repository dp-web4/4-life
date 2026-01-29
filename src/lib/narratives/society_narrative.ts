/**
 * Society Narrative Generator
 *
 * Converts multi-agent society simulation results into human-readable narratives.
 *
 * Philosophy: Humans understand stories about characters, not statistics about agents.
 * We translate technical simulation events into compelling narratives that reveal
 * the drama of social dynamics, coalition formation, betrayal, and emergence.
 *
 * Core narrative elements:
 * - Characters: Agents with personalities derived from their strategies
 * - Conflict: Defectors vs cooperators, coalition rivalries, resource struggles
 * - Resolution: Stable societies, isolated bad actors, emergent cooperation
 * - Theme: Trust as the currency of society, consequences for behavior
 */

import type {
  SocietyResult,
  SocietyEvent,
  SocietyMetrics,
  AgentSnapshot,
  Coalition,
  StrategyType,
  EpochSnapshot,
} from '../simulation/society-engine';

// ============================================================================
// Types
// ============================================================================

export interface SocietyNarrative {
  title: string;
  tagline: string;
  summary: string;
  chapters: NarrativeChapter[];
  characters: CharacterProfile[];
  themes: string[];
  moralOfTheStory: string;
  keyMoments: KeyMoment[];
}

export interface NarrativeChapter {
  number: number;
  title: string;
  opening: string;
  events: NarrativeEvent[];
  closing?: string;
}

export interface NarrativeEvent {
  description: string;
  quote?: string; // Imagined dialogue or internal thought
  significance: string;
}

export interface CharacterProfile {
  name: string;
  strategy: StrategyType;
  archetype: string;
  arc: string;
  finalStatus: 'thriving' | 'surviving' | 'struggling' | 'dead';
  notableActions: string[];
}

export interface KeyMoment {
  epoch: number;
  title: string;
  description: string;
  impact: string;
}

// ============================================================================
// Character Archetypes
// ============================================================================

const STRATEGY_ARCHETYPES: Record<StrategyType, { archetype: string; personality: string }> = {
  cooperator: {
    archetype: 'The Idealist',
    personality: 'believes in the goodness of others and always extends trust first',
  },
  defector: {
    archetype: 'The Opportunist',
    personality: 'takes what they can, viewing every interaction as a chance for gain',
  },
  reciprocator: {
    archetype: 'The Pragmatist',
    personality: 'mirrors what they receive, rewarding trust and punishing betrayal in equal measure',
  },
  cautious: {
    archetype: 'The Skeptic',
    personality: 'holds back until others prove themselves, taking few risks',
  },
  adaptive: {
    archetype: 'The Learner',
    personality: 'adjusts their behavior based on experience, constantly reading the room',
  },
};

// ============================================================================
// Society Narrative Generator
// ============================================================================

export class SocietyNarrativeGenerator {
  /**
   * Generate a complete narrative from society simulation results
   */
  generateNarrative(result: SocietyResult): SocietyNarrative {
    const characters = this.buildCharacterProfiles(result);
    const chapters = this.buildChapters(result);
    const keyMoments = this.extractKeyMoments(result);
    const themes = this.identifyThemes(result);

    return {
      title: this.generateTitle(result),
      tagline: this.generateTagline(result),
      summary: this.generateSummary(result, characters),
      chapters,
      characters,
      themes,
      moralOfTheStory: this.generateMoral(result),
      keyMoments,
    };
  }

  // ============================================================================
  // Title Generation
  // ============================================================================

  private generateTitle(result: SocietyResult): string {
    const finalMetrics = result.finalMetrics;
    const dominantStrategy = this.findDominantStrategy(finalMetrics.strategyDistribution);

    // Dramatic titles based on outcomes
    if (finalMetrics.averageTrust > 0.6 && finalMetrics.cooperationRate > 0.7) {
      return "The Rise of Trust";
    }
    if (finalMetrics.giniCoefficient > 0.4) {
      return "A Society Divided";
    }
    if (finalMetrics.numCoalitions === 1 && finalMetrics.largestCoalition > 5) {
      return "The Great Coalition";
    }
    if (result.events.some(e => e.type === 'defector_isolated')) {
      return "The Outcast's Lesson";
    }
    if (dominantStrategy === 'defector') {
      return "The Tragedy of Self-Interest";
    }
    if (dominantStrategy === 'reciprocator') {
      return "An Eye for an Eye";
    }

    return "A Society Emerges";
  }

  private generateTagline(result: SocietyResult): string {
    const finalMetrics = result.finalMetrics;
    const events = result.events;

    const hasCoalitions = events.some(e => e.type === 'coalition_formed');
    const hasIsolation = events.some(e => e.type === 'defector_isolated');
    const hasCollapse = events.some(e => e.type === 'trust_collapse');

    if (hasCollapse && finalMetrics.averageTrust > 0.5) {
      return "A story of crisis, recovery, and the resilience of trust";
    }
    if (hasIsolation && hasCoalitions) {
      return "When those who take are left behind by those who give";
    }
    if (finalMetrics.cooperationRate > 0.8) {
      return "How cooperation conquered competition";
    }
    if (finalMetrics.giniCoefficient > 0.4) {
      return "A tale of winners, losers, and the cost of inequality";
    }

    return "A simulation of what happens when trust is the only rule";
  }

  // ============================================================================
  // Character Profiles
  // ============================================================================

  private buildCharacterProfiles(result: SocietyResult): CharacterProfile[] {
    const finalEpoch = result.epochs[result.epochs.length - 1];
    const profiles: CharacterProfile[] = [];

    for (const agent of finalEpoch.agents) {
      const archetypeInfo = STRATEGY_ARCHETYPES[agent.strategy];
      const arc = this.buildCharacterArc(agent, result);

      profiles.push({
        name: agent.name,
        strategy: agent.strategy,
        archetype: archetypeInfo.archetype,
        arc,
        finalStatus: this.determineStatus(agent),
        notableActions: this.findNotableActions(agent, result),
      });
    }

    // Sort by story importance (most interesting characters first)
    return profiles.sort((a, b) => {
      const aScore = this.characterInterestScore(a);
      const bScore = this.characterInterestScore(b);
      return bScore - aScore;
    });
  }

  private buildCharacterArc(agent: AgentSnapshot, result: SocietyResult): string {
    const archetypeInfo = STRATEGY_ARCHETYPES[agent.strategy];
    const coopRate = agent.cooperationRate;
    const reputation = agent.reputation;
    const coalitionSize = agent.coalitionSize;

    // Defector arc
    if (agent.strategy === 'defector') {
      if (coalitionSize > 0) {
        return `Despite their nature, ${agent.name} found unexpected allies, perhaps proving that even opportunists need community.`;
      }
      if (reputation < 0.3) {
        return `${agent.name} ${archetypeInfo.personality}, but the society eventually saw through their games, leaving them isolated.`;
      }
      return `${agent.name} played the short game, and the scoreboard shows how that worked out.`;
    }

    // Cooperator arc
    if (agent.strategy === 'cooperator') {
      if (agent.atp > 100) {
        return `${agent.name}'s unwavering trust was rewarded with prosperity, proving that idealism can pay.`;
      }
      if (agent.atp < 50) {
        return `${agent.name} gave and gave, sometimes to those who didn't deserve it. A cautionary tale about trust without wisdom.`;
      }
      return `${agent.name} ${archetypeInfo.personality}, building bridges wherever they went.`;
    }

    // Reciprocator arc
    if (agent.strategy === 'reciprocator') {
      if (coalitionSize >= 3) {
        return `${agent.name}'s simple code—match what you receive—proved powerful. They became the backbone of a coalition.`;
      }
      return `${agent.name} ${archetypeInfo.personality}. Neither exploited nor exploiting, they found balance.`;
    }

    // Cautious arc
    if (agent.strategy === 'cautious') {
      if (reputation > 0.5) {
        return `${agent.name}'s patience paid off. By waiting for proof of trustworthiness, they avoided the pitfalls that caught others.`;
      }
      return `${agent.name} held back, perhaps too much. Sometimes trust requires a leap of faith.`;
    }

    // Adaptive arc
    if (agent.strategy === 'adaptive') {
      return `${agent.name} ${archetypeInfo.personality}. Their flexibility let them navigate the shifting social landscape.`;
    }

    return `${agent.name} walked their own path in this society.`;
  }

  private determineStatus(agent: AgentSnapshot): 'thriving' | 'surviving' | 'struggling' | 'dead' {
    if (!agent.alive) return 'dead';
    if (agent.atp > 120 && agent.reputation > 0.5) return 'thriving';
    if (agent.atp > 60) return 'surviving';
    return 'struggling';
  }

  private findNotableActions(agent: AgentSnapshot, result: SocietyResult): string[] {
    const actions: string[] = [];

    // Check if they're in events
    for (const event of result.events) {
      if (event.agentIds?.includes(agent.id)) {
        if (event.type === 'coalition_formed') {
          actions.push(`Helped form a coalition`);
        }
        if (event.type === 'defector_isolated') {
          actions.push(`Was isolated by society`);
        }
        if (event.type === 'agent_death') {
          actions.push(`Met their end`);
        }
        if (event.type === 'agent_rebirth') {
          actions.push(`Was reborn with karmic debt`);
        }
      }
    }

    // Note high/low cooperation
    if (agent.cooperationRate > 0.9) {
      actions.push(`Almost always cooperated (${Math.round(agent.cooperationRate * 100)}%)`);
    } else if (agent.cooperationRate < 0.2) {
      actions.push(`Rarely cooperated (${Math.round(agent.cooperationRate * 100)}%)`);
    }

    // Note coalition leadership
    if (agent.coalitionSize >= 4) {
      actions.push(`Became a coalition leader with ${agent.coalitionSize} allies`);
    }

    return actions.slice(0, 3); // Limit to 3 notable actions
  }

  private characterInterestScore(profile: CharacterProfile): number {
    let score = 0;

    // Interesting outcomes
    if (profile.finalStatus === 'dead') score += 5;
    if (profile.finalStatus === 'thriving' && profile.strategy === 'defector') score += 10;
    if (profile.finalStatus === 'struggling' && profile.strategy === 'cooperator') score += 8;

    // Notable actions
    score += profile.notableActions.length * 2;

    return score;
  }

  // ============================================================================
  // Chapter Building
  // ============================================================================

  private buildChapters(result: SocietyResult): NarrativeChapter[] {
    const chapters: NarrativeChapter[] = [];

    // Chapter 1: The Beginning
    chapters.push(this.buildOpeningChapter(result));

    // Middle chapters: Key events
    const eventGroups = this.groupEventsBySignificance(result);
    let chapterNum = 2;

    for (const group of eventGroups) {
      if (group.events.length > 0) {
        chapters.push(this.buildEventChapter(chapterNum, group.title, group.events, result));
        chapterNum++;
      }
    }

    // Final chapter: The Outcome
    chapters.push(this.buildClosingChapter(chapterNum, result));

    return chapters;
  }

  private buildOpeningChapter(result: SocietyResult): NarrativeChapter {
    const config = result.config;
    const firstEpoch = result.epochs[0];
    const agents = firstEpoch.agents;

    const opening = this.narrateOpening(config, agents);
    const events = this.narrateFirstInteractions(firstEpoch, agents);

    return {
      number: 1,
      title: "A Society Begins",
      opening,
      events,
      closing: "And so the game was set. Who would thrive? Who would fall? Only time and trust would tell.",
    };
  }

  private narrateOpening(config: any, agents: AgentSnapshot[]): string {
    const total = agents.length;
    const strategies = config.strategies;

    let opening = `${total} agents entered the Web4 society, each with their own approach to trust. `;

    const breakdown: string[] = [];
    if (strategies.cooperator > 0) {
      breakdown.push(`${strategies.cooperator} idealist${strategies.cooperator > 1 ? 's' : ''} who believed in giving first`);
    }
    if (strategies.defector > 0) {
      breakdown.push(`${strategies.defector} opportunist${strategies.defector > 1 ? 's' : ''} looking for easy gains`);
    }
    if (strategies.reciprocator > 0) {
      breakdown.push(`${strategies.reciprocator} pragmatist${strategies.reciprocator > 1 ? 's' : ''} who would mirror what they received`);
    }
    if (strategies.cautious > 0) {
      breakdown.push(`${strategies.cautious} skeptic${strategies.cautious > 1 ? 's' : ''} waiting for proof`);
    }
    if (strategies.adaptive > 0) {
      breakdown.push(`${strategies.adaptive} learner${strategies.adaptive > 1 ? 's' : ''} ready to adapt`);
    }

    opening += `Among them: ${breakdown.join(', ')}. `;
    opening += `Each started with ${config.initialATP} ATP—the currency of attention that would determine their survival.`;

    return opening;
  }

  private narrateFirstInteractions(epoch: EpochSnapshot, agents: AgentSnapshot[]): NarrativeEvent[] {
    const events: NarrativeEvent[] = [];

    // Find a cooperator meeting a defector (classic conflict)
    const cooperator = agents.find(a => a.strategy === 'cooperator');
    const defector = agents.find(a => a.strategy === 'defector');

    if (cooperator && defector) {
      events.push({
        description: `In one of the first interactions, ${cooperator.name} the Idealist met ${defector.name} the Opportunist. ${cooperator.name} offered cooperation; ${defector.name} took advantage.`,
        quote: `"They'll learn," ${defector.name} might have thought. "Everyone does eventually."`,
        significance: "This early betrayal would set the tone for how trust—and its absence—would shape the society.",
      });
    }

    // Find reciprocators finding each other
    const reciprocators = agents.filter(a => a.strategy === 'reciprocator');
    if (reciprocators.length >= 2) {
      events.push({
        description: `Meanwhile, ${reciprocators[0].name} and ${reciprocators[1].name} began their dance of mutual testing. Each waited to see what the other would do, then matched it perfectly.`,
        significance: "Reciprocators finding each other is the seed of stable cooperation.",
      });
    }

    return events;
  }

  private groupEventsBySignificance(result: SocietyResult): { title: string; events: SocietyEvent[] }[] {
    const groups = [
      {
        title: "The Formation of Alliances",
        events: result.events.filter(e => e.type === 'coalition_formed'),
      },
      {
        title: "The Reckoning",
        events: result.events.filter(e => e.type === 'defector_isolated' || e.type === 'trust_collapse'),
      },
      {
        title: "Crisis and Survival",
        events: result.events.filter(e => e.type === 'agent_death' || e.type === 'agent_rebirth'),
      },
    ];

    return groups.filter(g => g.events.length > 0);
  }

  private buildEventChapter(
    number: number,
    title: string,
    events: SocietyEvent[],
    result: SocietyResult
  ): NarrativeChapter {
    const narrativeEvents = events.slice(0, 4).map(e => this.narrateEvent(e, result));

    return {
      number,
      title,
      opening: this.getChapterOpening(title),
      events: narrativeEvents,
    };
  }

  private getChapterOpening(title: string): string {
    switch (title) {
      case "The Formation of Alliances":
        return "As rounds passed, patterns emerged. Those who proved trustworthy found each other. Trust clustered, creating islands of cooperation in an uncertain sea.";
      case "The Reckoning":
        return "Every society eventually faces its moment of truth. Those who took without giving found their options narrowing.";
      case "Crisis and Survival":
        return "In Web4, survival is not guaranteed. ATP must be earned, and those who cannot contribute eventually fade.";
      default:
        return "The story continued to unfold...";
    }
  }

  private narrateEvent(event: SocietyEvent, result: SocietyResult): NarrativeEvent {
    const agents = result.epochs[result.epochs.length - 1].agents;

    switch (event.type) {
      case 'coalition_formed':
        return this.narrateCoalitionFormed(event, agents);
      case 'defector_isolated':
        return this.narrateDefectorIsolated(event, agents);
      case 'trust_collapse':
        return this.narrateTrustCollapse(event, agents);
      case 'agent_death':
        return this.narrateAgentDeath(event, agents);
      case 'agent_rebirth':
        return this.narrateAgentRebirth(event, agents);
      case 'cooperation_surge':
        return this.narrateCooperationSurge(event);
      case 'society_stable':
        return this.narrateSocietyStable(event);
      default:
        return {
          description: event.message,
          significance: event.significance,
        };
    }
  }

  private narrateCoalitionFormed(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    const memberNames = event.agentIds
      ?.map(id => agents.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    return {
      description: `A coalition crystallized: ${memberNames || 'several agents'} recognized their mutual benefit and formed an alliance.`,
      quote: "In Web4, trust is not just a feeling—it's a measurable commitment that others can see.",
      significance: event.significance,
    };
  }

  private narrateDefectorIsolated(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    const defectorName = event.agentIds?.[0]
      ? agents.find(a => a.id === event.agentIds![0])?.name
      : 'a defector';

    return {
      description: `${defectorName} found themselves increasingly alone. Those who had been burned stopped interacting. The network routed around them.`,
      quote: `"I thought I was the clever one," they might have realized too late. "But they all figured it out."`,
      significance: "In transparent trust networks, exploitation has a shelf life. Reputations travel.",
    };
  }

  private narrateTrustCollapse(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    return {
      description: "Trust plummeted across the society. A cascade of defections triggered defensive responses, which triggered more defections.",
      significance: "Trust collapses demonstrate the fragility of cooperation. One breach can poison many relationships.",
    };
  }

  private narrateAgentDeath(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    return {
      description: event.message,
      quote: "In Web4, death comes not from violence but from irrelevance—when no one pays attention anymore.",
      significance: event.significance,
    };
  }

  private narrateAgentRebirth(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    return {
      description: event.message,
      significance: "Karma carries forward. A new life offers new chances, but old reputations have echoes.",
    };
  }

  private narrateCooperationSurge(event: SocietyEvent): NarrativeEvent {
    return {
      description: "Cooperation surged through the network. Success bred success—seeing others thrive through trust encouraged more trust.",
      significance: event.significance,
    };
  }

  private narrateSocietyStable(event: SocietyEvent): NarrativeEvent {
    return {
      description: "The society found equilibrium. Trust levels stabilized, coalitions solidified, and a sustainable order emerged.",
      significance: "Stability in Web4 isn't enforced—it emerges from the sum of individual trust decisions.",
    };
  }

  private buildClosingChapter(number: number, result: SocietyResult): NarrativeChapter {
    const finalMetrics = result.finalMetrics;
    const finalEpoch = result.epochs[result.epochs.length - 1];

    const events: NarrativeEvent[] = [];

    // Describe the final state
    events.push({
      description: this.describeFinalState(finalMetrics),
      significance: "The final metrics tell the story of what kind of society emerged.",
    });

    // Highlight winners and losers
    const winners = finalEpoch.agents.filter(a => a.atp > 120 && a.alive);
    const losers = finalEpoch.agents.filter(a => !a.alive || a.atp < 40);

    if (winners.length > 0) {
      events.push({
        description: `Those who thrived: ${winners.map(a => `${a.name} (${a.strategy})`).join(', ')}. Their success came from consistent, trustworthy behavior that others recognized and reciprocated.`,
        significance: "In Web4, prosperity flows to those who build genuine trust.",
      });
    }

    if (losers.length > 0) {
      events.push({
        description: `Those who struggled: ${losers.map(a => `${a.name} (${a.strategy})`).join(', ')}. Whether through exploitation or exploitation's consequences, they found society's structure working against them.`,
        significance: "The lesson: in transparent trust networks, short-term thinking leads to long-term poverty.",
      });
    }

    return {
      number,
      title: "What Emerged",
      opening: `After ${result.epochs.length} epochs and countless interactions, the society reached its end state.`,
      events,
      closing: this.generateMoral(result),
    };
  }

  private describeFinalState(metrics: SocietyMetrics): string {
    let description = `Final society metrics: Average trust at ${(metrics.averageTrust * 100).toFixed(0)}%, `;
    description += `cooperation rate of ${(metrics.cooperationRate * 100).toFixed(0)}%, `;
    description += `${metrics.numCoalitions} coalition${metrics.numCoalitions !== 1 ? 's' : ''} formed`;

    if (metrics.largestCoalition > 0) {
      description += ` (largest with ${metrics.largestCoalition} members)`;
    }

    description += `, and a Gini coefficient of ${metrics.giniCoefficient.toFixed(2)}`;

    if (metrics.giniCoefficient < 0.2) {
      description += ` (remarkably equal).`;
    } else if (metrics.giniCoefficient > 0.4) {
      description += ` (significant inequality).`;
    } else {
      description += ` (moderate inequality).`;
    }

    return description;
  }

  // ============================================================================
  // Key Moments
  // ============================================================================

  private extractKeyMoments(result: SocietyResult): KeyMoment[] {
    const moments: KeyMoment[] = [];

    // First coalition
    const firstCoalition = result.events.find(e => e.type === 'coalition_formed');
    if (firstCoalition) {
      moments.push({
        epoch: firstCoalition.epoch,
        title: "First Alliance",
        description: firstCoalition.message,
        impact: "The beginning of social structure.",
      });
    }

    // First isolation
    const firstIsolation = result.events.find(e => e.type === 'defector_isolated');
    if (firstIsolation) {
      moments.push({
        epoch: firstIsolation.epoch,
        title: "The Outcast",
        description: firstIsolation.message,
        impact: "Society's immune system activated.",
      });
    }

    // Trust collapse or surge
    const trustEvent = result.events.find(e =>
      e.type === 'trust_collapse' || e.type === 'cooperation_surge'
    );
    if (trustEvent) {
      moments.push({
        epoch: trustEvent.epoch,
        title: trustEvent.type === 'trust_collapse' ? "Crisis Point" : "Breakthrough",
        description: trustEvent.message,
        impact: trustEvent.significance,
      });
    }

    // Society stable
    const stableEvent = result.events.find(e => e.type === 'society_stable');
    if (stableEvent) {
      moments.push({
        epoch: stableEvent.epoch,
        title: "Equilibrium",
        description: stableEvent.message,
        impact: "A sustainable order emerged.",
      });
    }

    return moments;
  }

  // ============================================================================
  // Themes and Moral
  // ============================================================================

  private identifyThemes(result: SocietyResult): string[] {
    const themes: string[] = [];
    const metrics = result.finalMetrics;
    const events = result.events;

    // Trust-based themes
    if (metrics.averageTrust > 0.5) {
      themes.push("The Power of Trust");
    }
    if (events.some(e => e.type === 'trust_collapse') && metrics.averageTrust > 0.4) {
      themes.push("Resilience and Recovery");
    }

    // Strategy-based themes
    if (events.some(e => e.type === 'defector_isolated')) {
      themes.push("Consequences of Exploitation");
    }
    if (metrics.numCoalitions > 1) {
      themes.push("Coalition Dynamics");
    }
    if (metrics.cooperationRate > 0.7) {
      themes.push("The Evolution of Cooperation");
    }

    // Outcome-based themes
    if (metrics.giniCoefficient < 0.2) {
      themes.push("Equality Through Trust");
    } else if (metrics.giniCoefficient > 0.4) {
      themes.push("Winners and Losers");
    }

    if (themes.length === 0) {
      themes.push("The Emergence of Social Order");
    }

    return themes;
  }

  private generateMoral(result: SocietyResult): string {
    const metrics = result.finalMetrics;
    const events = result.events;

    // Check for specific patterns that suggest morals
    if (events.some(e => e.type === 'defector_isolated') && metrics.cooperationRate > 0.6) {
      return "In transparent societies, exploitation is a losing strategy. When trust is visible, the exploiters reveal themselves—and find themselves alone.";
    }

    if (metrics.averageTrust > 0.6 && metrics.giniCoefficient < 0.25) {
      return "When trust flows freely, prosperity follows. No central authority distributed the wealth—it emerged naturally from networks of mutual benefit.";
    }

    if (metrics.numCoalitions > 2 && metrics.averageTrust > 0.4) {
      return "Trust creates structure without permission. These coalitions weren't designed—they emerged from countless small decisions to cooperate or defect.";
    }

    if (metrics.giniCoefficient > 0.4) {
      return "Even in trust-based societies, inequality can emerge. The question isn't whether there are winners and losers, but whether the game is fair.";
    }

    return "Trust is not given—it's earned through consistent behavior over time. This simulation shows why that matters.";
  }

  private generateSummary(result: SocietyResult, characters: CharacterProfile[]): string {
    const metrics = result.finalMetrics;
    const epochs = result.epochs.length;
    const agentCount = result.config.numAgents;

    let summary = `This simulation followed ${agentCount} agents through ${epochs} epochs of interaction. `;

    // Overall outcome
    if (metrics.cooperationRate > 0.7) {
      summary += `Cooperation triumphed, with ${(metrics.cooperationRate * 100).toFixed(0)}% of interactions ending in mutual benefit. `;
    } else if (metrics.cooperationRate < 0.4) {
      summary += `Competition dominated, with only ${(metrics.cooperationRate * 100).toFixed(0)}% cooperation. `;
    } else {
      summary += `The society balanced on the edge between cooperation and competition. `;
    }

    // Coalition formation
    if (metrics.numCoalitions > 0) {
      summary += `${metrics.numCoalitions} coalition${metrics.numCoalitions > 1 ? 's' : ''} formed, the largest with ${metrics.largestCoalition} members. `;
    }

    // Notable characters
    const thriving = characters.filter(c => c.finalStatus === 'thriving');
    const dead = characters.filter(c => c.finalStatus === 'dead');

    if (thriving.length > 0) {
      summary += `${thriving.map(c => c.name).join(' and ')} emerged as the most successful. `;
    }
    if (dead.length > 0) {
      summary += `${dead.map(c => c.name).join(' and ')} didn't survive. `;
    }

    summary += `The story illustrates how trust, or its absence, shapes society from the bottom up.`;

    return summary;
  }

  // ============================================================================
  // Utilities
  // ============================================================================

  private findDominantStrategy(distribution: Record<StrategyType, number>): StrategyType {
    let max = 0;
    let dominant: StrategyType = 'cooperator';

    for (const [strategy, count] of Object.entries(distribution)) {
      if (count > max) {
        max = count;
        dominant = strategy as StrategyType;
      }
    }

    return dominant;
  }
}

/**
 * Convenience function to generate a narrative from simulation result
 */
export function generateSocietyNarrative(result: SocietyResult): SocietyNarrative {
  const generator = new SocietyNarrativeGenerator();
  return generator.generateNarrative(result);
}
