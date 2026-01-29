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
  protagonist: CharacterHighlight | null;
  antagonist: CharacterHighlight | null;
  themes: string[];
  moralOfTheStory: string;
  keyMoments: KeyMoment[];
}

export interface CharacterHighlight {
  name: string;
  strategy: StrategyType;
  reason: string;
  quote: string;
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
    const { protagonist, antagonist } = this.identifyProtagonistAntagonist(result, characters);

    return {
      title: this.generateTitle(result),
      tagline: this.generateTagline(result),
      summary: this.generateSummary(result, characters),
      chapters,
      characters,
      protagonist,
      antagonist,
      themes,
      moralOfTheStory: this.generateMoral(result),
      keyMoments,
    };
  }

  // ============================================================================
  // Protagonist & Antagonist Identification
  // ============================================================================

  private identifyProtagonistAntagonist(
    result: SocietyResult,
    characters: CharacterProfile[]
  ): { protagonist: CharacterHighlight | null; antagonist: CharacterHighlight | null } {
    const finalEpoch = result.epochs[result.epochs.length - 1];
    const agents = finalEpoch.agents;
    const events = result.events;

    // Find protagonist: highest "hero score" (cooperation + trust building + survival)
    let protagonistScore = -Infinity;
    let protagonistAgent: AgentSnapshot | null = null;

    // Find antagonist: highest "villain score" (defection + isolation events + exploiting)
    let antagonistScore = -Infinity;
    let antagonistAgent: AgentSnapshot | null = null;

    for (const agent of agents) {
      // Hero score: rewarding cooperation, trust, and thriving
      const heroScore =
        agent.cooperationRate * 3 +
        agent.reputation * 2 +
        (agent.atp > 100 ? 1 : 0) +
        (agent.coalitionSize >= 3 ? 2 : 0) +
        (agent.strategy === 'cooperator' ? 1 : 0) +
        (agent.strategy === 'reciprocator' ? 0.5 : 0);

      if (heroScore > protagonistScore && agent.alive) {
        protagonistScore = heroScore;
        protagonistAgent = agent;
      }

      // Villain score: rewarding defection, isolation, and exploitation
      const wasIsolated = events.some(
        e => e.type === 'defector_isolated' && e.agentIds?.includes(agent.id)
      );
      const villainScore =
        (1 - agent.cooperationRate) * 3 +
        (agent.strategy === 'defector' ? 2 : 0) +
        (wasIsolated ? 3 : 0) +
        (agent.reputation < 0.3 ? 1 : 0) +
        (!agent.alive ? 1 : 0);

      if (villainScore > antagonistScore && villainScore > 2) {
        antagonistScore = villainScore;
        antagonistAgent = agent;
      }
    }

    // Build protagonist highlight
    let protagonist: CharacterHighlight | null = null;
    if (protagonistAgent && protagonistScore > 3) {
      const archetype = STRATEGY_ARCHETYPES[protagonistAgent.strategy];
      protagonist = {
        name: protagonistAgent.name,
        strategy: protagonistAgent.strategy,
        reason: this.getProtagonistReason(protagonistAgent, protagonistScore),
        quote: this.getProtagonistQuote(protagonistAgent),
      };
    }

    // Build antagonist highlight
    let antagonist: CharacterHighlight | null = null;
    if (antagonistAgent && antagonistScore > 3 && antagonistAgent.id !== protagonistAgent?.id) {
      antagonist = {
        name: antagonistAgent.name,
        strategy: antagonistAgent.strategy,
        reason: this.getAntagonistReason(antagonistAgent, events),
        quote: this.getAntagonistQuote(antagonistAgent),
      };
    }

    return { protagonist, antagonist };
  }

  private getProtagonistReason(agent: AgentSnapshot, score: number): string {
    if (agent.strategy === 'cooperator' && agent.atp > 100) {
      return `Proved that idealism can triumph when combined with the right conditions`;
    }
    if (agent.coalitionSize >= 4) {
      return `Built the largest alliance through consistent trustworthy behavior`;
    }
    if (agent.cooperationRate > 0.9 && agent.reputation > 0.6) {
      return `Achieved both high cooperation and strong reputation—a rare combination`;
    }
    if (agent.strategy === 'reciprocator' && agent.atp > 80) {
      return `Demonstrated the power of balanced reciprocity`;
    }
    return `Emerged as the most successful through consistent positive behavior`;
  }

  private getProtagonistQuote(agent: AgentSnapshot): string {
    switch (agent.strategy) {
      case 'cooperator':
        return "Trust first. Not because it's naive, but because it's how communities are built.";
      case 'reciprocator':
        return "I give what I get. It's not revenge—it's justice with a future.";
      case 'adaptive':
        return "Read the room. Adjust. Survive. That's not weakness, it's wisdom.";
      case 'cautious':
        return "Everyone says 'trust me.' I say 'show me.'";
      default:
        return "In the end, we're all choosing who we want to be.";
    }
  }

  private getAntagonistReason(agent: AgentSnapshot, events: SocietyEvent[]): string {
    const wasIsolated = events.some(
      e => e.type === 'defector_isolated' && e.agentIds?.includes(agent.id)
    );

    if (wasIsolated) {
      return `Was isolated by society after their exploitation became apparent`;
    }
    if (!agent.alive) {
      return `Their short-term strategy led to their downfall`;
    }
    if (agent.cooperationRate < 0.2) {
      return `Consistently chose defection, damaging the social fabric`;
    }
    return `Their self-serving approach created friction in the society`;
  }

  private getAntagonistQuote(agent: AgentSnapshot): string {
    switch (agent.strategy) {
      case 'defector':
        return "Everyone's a sucker if you play it right. At least, that's what I thought.";
      case 'cautious':
        return "Why should I trust them? They haven't earned it. They never will.";
      default:
        return "I looked out for myself. Isn't that what everyone does?";
    }
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

// ============================================================================
// Comparative Narrative Generator
// ============================================================================

export interface ComparativeNarrative {
  title: string;
  introduction: string;
  scenarios: {
    name: string;
    summary: string;
    outcome: 'triumph' | 'tragedy' | 'mixed';
    keyDifference: string;
  }[];
  comparison: {
    aspect: string;
    findings: string;
    winner?: string;
  }[];
  insights: string[];
  conclusion: string;
}

/**
 * Generate a comparative narrative explaining the differences between multiple simulation runs.
 * This helps humans understand how different initial conditions lead to different outcomes.
 */
export function generateComparativeNarrative(
  results: { label: string; result: SocietyResult }[]
): ComparativeNarrative {
  if (results.length < 2) {
    throw new Error('Need at least 2 results to compare');
  }

  // Analyze each scenario
  const scenarios = results.map(({ label, result }) => {
    const { finalMetrics, events } = result;
    const deaths = events.filter(e => e.type === 'agent_death').length;
    const coops = finalMetrics.cooperationRate;
    const trust = finalMetrics.averageTrust;

    let outcome: 'triumph' | 'tragedy' | 'mixed';
    if (coops > 0.7 && trust > 0.5) {
      outcome = 'triumph';
    } else if (coops < 0.4 || trust < 0.3 || deaths > 3) {
      outcome = 'tragedy';
    } else {
      outcome = 'mixed';
    }

    // Identify what made this scenario distinctive
    let keyDifference = '';
    if (outcome === 'triumph') {
      keyDifference = `achieved ${Math.round(coops * 100)}% cooperation`;
    } else if (outcome === 'tragedy') {
      if (deaths > 0) {
        keyDifference = `lost ${deaths} agent${deaths > 1 ? 's' : ''} to ATP exhaustion`;
      } else {
        keyDifference = `saw trust collapse to ${Math.round(trust * 100)}%`;
      }
    } else {
      keyDifference = `maintained a fragile equilibrium`;
    }

    return {
      name: label,
      summary: generateScenarioSummary(result, label),
      outcome,
      keyDifference,
    };
  });

  // Generate comparison aspects
  const comparison = generateComparisonAspects(results);

  // Generate insights
  const insights = generateComparativeInsights(scenarios, results);

  // Generate conclusion
  const conclusion = generateComparativeConclusion(scenarios);

  // Generate title
  const title = generateComparativeTitle(scenarios);

  // Generate introduction
  const introduction = generateIntroduction(results.length, scenarios);

  return {
    title,
    introduction,
    scenarios,
    comparison,
    insights,
    conclusion,
  };
}

function generateScenarioSummary(result: SocietyResult, label: string): string {
  const { finalMetrics, events } = result;
  const { averageTrust, cooperationRate, numCoalitions, giniCoefficient } = finalMetrics;
  const deaths = events.filter(e => e.type === 'agent_death').length;

  let summary = `In "${label}," `;

  if (cooperationRate > 0.7) {
    summary += `cooperation flourished (${Math.round(cooperationRate * 100)}%). `;
  } else if (cooperationRate < 0.4) {
    summary += `competition dominated (only ${Math.round(cooperationRate * 100)}% cooperation). `;
  } else {
    summary += `the society found a middle ground (${Math.round(cooperationRate * 100)}% cooperation). `;
  }

  if (numCoalitions > 0) {
    summary += `${numCoalitions} coalition${numCoalitions > 1 ? 's' : ''} formed. `;
  }

  if (deaths > 0) {
    summary += `${deaths} agent${deaths > 1 ? 's' : ''} perished. `;
  }

  if (giniCoefficient > 0.5) {
    summary += `Wealth concentrated heavily. `;
  } else if (giniCoefficient < 0.2) {
    summary += `Resources stayed fairly distributed. `;
  }

  return summary.trim();
}

function generateComparisonAspects(
  results: { label: string; result: SocietyResult }[]
): ComparativeNarrative['comparison'] {
  const aspects: ComparativeNarrative['comparison'] = [];

  // Trust comparison
  const trustValues = results.map(r => ({
    label: r.label,
    value: r.result.finalMetrics.averageTrust,
  }));
  const bestTrust = trustValues.reduce((a, b) => a.value > b.value ? a : b);
  const worstTrust = trustValues.reduce((a, b) => a.value < b.value ? a : b);
  const trustDiff = Math.round((bestTrust.value - worstTrust.value) * 100);

  aspects.push({
    aspect: 'Trust',
    findings: trustDiff > 20
      ? `"${bestTrust.label}" achieved ${trustDiff}% more trust than "${worstTrust.label}." This dramatic difference shows how initial conditions compound over time.`
      : `Trust levels were similar across scenarios (within ${trustDiff}%), suggesting baseline conditions were comparable.`,
    winner: trustDiff > 10 ? bestTrust.label : undefined,
  });

  // Cooperation comparison
  const coopValues = results.map(r => ({
    label: r.label,
    value: r.result.finalMetrics.cooperationRate,
  }));
  const bestCoop = coopValues.reduce((a, b) => a.value > b.value ? a : b);
  const worstCoop = coopValues.reduce((a, b) => a.value < b.value ? a : b);
  const coopDiff = Math.round((bestCoop.value - worstCoop.value) * 100);

  aspects.push({
    aspect: 'Cooperation',
    findings: coopDiff > 20
      ? `"${bestCoop.label}" saw ${Math.round(bestCoop.value * 100)}% cooperation vs ${Math.round(worstCoop.value * 100)}% in "${worstCoop.label}." The social fabric looked completely different.`
      : `Cooperation rates converged despite different starting points, suggesting some underlying equilibrium.`,
    winner: coopDiff > 15 ? bestCoop.label : undefined,
  });

  // Inequality comparison
  const giniValues = results.map(r => ({
    label: r.label,
    value: r.result.finalMetrics.giniCoefficient,
  }));
  const mostEqual = giniValues.reduce((a, b) => a.value < b.value ? a : b);
  const leastEqual = giniValues.reduce((a, b) => a.value > b.value ? a : b);
  const giniDiff = Math.abs(mostEqual.value - leastEqual.value);

  aspects.push({
    aspect: 'Inequality',
    findings: giniDiff > 0.15
      ? `"${mostEqual.label}" distributed resources more fairly (Gini ${mostEqual.value.toFixed(2)}) while "${leastEqual.label}" saw concentration (Gini ${leastEqual.value.toFixed(2)}).`
      : `Resource distribution was similar across scenarios.`,
    winner: giniDiff > 0.1 ? mostEqual.label : undefined,
  });

  // Survival comparison
  const survivalData = results.map(r => ({
    label: r.label,
    deaths: r.result.events.filter(e => e.type === 'agent_death').length,
  }));
  const safest = survivalData.reduce((a, b) => a.deaths < b.deaths ? a : b);
  const deadliest = survivalData.reduce((a, b) => a.deaths > b.deaths ? a : b);

  if (deadliest.deaths > 0) {
    aspects.push({
      aspect: 'Survival',
      findings: `"${deadliest.label}" lost ${deadliest.deaths} agent${deadliest.deaths > 1 ? 's' : ''} while "${safest.label}" had ${safest.deaths === 0 ? 'no casualties' : `only ${safest.deaths}`}. In Web4, ATP exhaustion means death—and some societies are deadlier than others.`,
      winner: safest.deaths < deadliest.deaths ? safest.label : undefined,
    });
  }

  return aspects;
}

function generateComparativeInsights(
  scenarios: ComparativeNarrative['scenarios'],
  results: { label: string; result: SocietyResult }[]
): string[] {
  const insights: string[] = [];

  // Triumph vs tragedy insight
  const triumphs = scenarios.filter(s => s.outcome === 'triumph');
  const tragedies = scenarios.filter(s => s.outcome === 'tragedy');

  if (triumphs.length > 0 && tragedies.length > 0) {
    insights.push(
      `The contrast between "${triumphs[0].name}" (triumph) and "${tragedies[0].name}" (tragedy) reveals that success isn't guaranteed—initial conditions matter enormously.`
    );
  }

  // Coalition insight
  const coalitionCounts = results.map(r => ({
    label: r.label,
    coalitions: r.result.finalMetrics.numCoalitions,
  }));
  const mostCoalitions = coalitionCounts.reduce((a, b) => a.coalitions > b.coalitions ? a : b);

  if (mostCoalitions.coalitions > 0) {
    insights.push(
      `"${mostCoalitions.label}" saw ${mostCoalitions.coalitions} coalition${mostCoalitions.coalitions > 1 ? 's' : ''} form—trust clusters that become power bases.`
    );
  }

  // Strategy insight
  const allStrategies = new Set<string>();
  results.forEach(r => {
    const dist = r.result.finalMetrics.strategyDistribution;
    Object.entries(dist).forEach(([strategy, count]) => {
      if (count > 2) allStrategies.add(strategy);
    });
  });

  if (allStrategies.size > 0 && triumphs.length > 0) {
    const dominantInTriumph = findComparativeDominantStrategy(
      results.find(r => r.label === triumphs[0].name)!.result.finalMetrics.strategyDistribution
    );

    if (dominantInTriumph) {
      const archetypes: Record<string, string> = {
        cooperator: 'Idealists',
        defector: 'Opportunists',
        reciprocator: 'Pragmatists',
        cautious: 'Skeptics',
        adaptive: 'Learners',
      };
      insights.push(
        `${archetypes[dominantInTriumph] || dominantInTriumph + 's'} thrived in successful scenarios—their strategy worked because others responded in kind.`
      );
    }
  }

  // Web4 insight
  insights.push(
    'These comparisons illustrate Web4\'s core thesis: trust is the organizing principle that emerges from individual behavior, and small changes in composition create vastly different societies.'
  );

  return insights;
}

function findComparativeDominantStrategy(distribution: Record<StrategyType, number>): StrategyType {
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

function generateComparativeConclusion(scenarios: ComparativeNarrative['scenarios']): string {
  const triumphs = scenarios.filter(s => s.outcome === 'triumph');
  const tragedies = scenarios.filter(s => s.outcome === 'tragedy');

  if (triumphs.length === scenarios.length) {
    return 'All scenarios found paths to cooperation—a testament to the resilience of trust-based social organization.';
  }

  if (tragedies.length === scenarios.length) {
    return 'None of these scenarios achieved sustainable cooperation. Sometimes the initial conditions make trust nearly impossible.';
  }

  if (triumphs.length > tragedies.length) {
    return `Most scenarios succeeded, but the failure of "${tragedies[0]?.name || 'some'}" shows that trust is never guaranteed—it must be built.`;
  }

  if (tragedies.length > triumphs.length) {
    return `Most scenarios struggled, making "${triumphs[0]?.name || 'the successful ones'}" all the more remarkable. What was different?`;
  }

  return 'These simulations demonstrate that trust can emerge or collapse based on the same fundamental rules applied to different starting conditions. The outcome is determined by the composition and choices of the agents within.';
}

function generateComparativeTitle(scenarios: ComparativeNarrative['scenarios']): string {
  const outcomes = scenarios.map(s => s.outcome);
  const hasTriumph = outcomes.includes('triumph');
  const hasTragedy = outcomes.includes('tragedy');

  if (hasTriumph && hasTragedy) {
    return 'Two Paths: How Trust Diverges';
  }

  if (outcomes.every(o => o === 'triumph')) {
    return 'Many Paths to Cooperation';
  }

  if (outcomes.every(o => o === 'tragedy')) {
    return 'When Trust Fails: A Comparison';
  }

  return 'Comparing Societies: Same Rules, Different Outcomes';
}

function generateIntroduction(count: number, scenarios: ComparativeNarrative['scenarios']): string {
  const names = scenarios.map(s => `"${s.name}"`).join(', ');

  return `We ran ${count} simulations under different conditions: ${names}. Each followed the same Web4 rules—trust built through cooperation, eroded through exploitation, with ATP economics creating life-or-death pressure. Yet the outcomes diverged dramatically. Here's what we learned.`;
}
