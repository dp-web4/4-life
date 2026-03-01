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
  AgentRoleName,
  EpochSnapshot,
} from '../simulation/society-engine';
import { AGENT_ROLES } from '../simulation/society-engine';

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
  // Animation mode metadata
  epochRange?: { start: number; end: number }; // Epoch range for this chapter
}

export interface NarrativeEvent {
  description: string;
  quote?: string; // Imagined dialogue or internal thought
  significance: string;
  // Animation mode metadata
  epoch?: number; // Which epoch this event corresponds to
  agentIds?: number[]; // Agents to highlight during this event
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
  human: {
    archetype: 'The Human',
    personality: 'brings unpredictable human intuition and judgment to every interaction',
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
      const roleLabel = AGENT_ROLES[protagonistAgent.role]?.label ?? 'Villager';
      protagonist = {
        name: `${protagonistAgent.name} the ${roleLabel}`,
        strategy: protagonistAgent.strategy,
        reason: this.getProtagonistReason(protagonistAgent, protagonistScore),
        quote: this.getProtagonistQuote(protagonistAgent),
      };
    }

    // Build antagonist highlight
    let antagonist: CharacterHighlight | null = null;
    if (antagonistAgent && antagonistScore > 3 && antagonistAgent.id !== protagonistAgent?.id) {
      const roleLabel = AGENT_ROLES[antagonistAgent.role]?.label ?? 'Villager';
      antagonist = {
        name: `${antagonistAgent.name} the ${roleLabel}`,
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

    // More specific fallbacks based on available data
    if (finalMetrics.averageTrust > 0.4 && finalMetrics.cooperationRate > 0.5) {
      return "Trust Takes Root";
    }
    if (finalMetrics.numCoalitions > 1) {
      return "A Web of Alliances";
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

    if (result.events.some(e => e.type === 'agent_death')) {
      return "Where trust is life, and betrayal has a body count";
    }
    if (finalMetrics.averageTrust > 0.4) {
      return "Trust emerged — not because anyone planned it, but because it worked";
    }
    return "A simulation of what happens when trust is the only rule";
  }

  // ============================================================================
  // Character Profiles
  // ============================================================================

  /**
   * Combine role + strategy into a humanized archetype name.
   * E.g. "The Generous Farmer", "The Corrupt Merchant"
   */
  private roleStrategyArchetype(agent: AgentSnapshot): string {
    const roleLabel = AGENT_ROLES[agent.role]?.label ?? 'Villager';
    const adjectives: Record<StrategyType, string> = {
      cooperator: 'Generous',
      defector: 'Corrupt',
      reciprocator: 'Fair-minded',
      cautious: 'Wary',
      adaptive: 'Shrewd',
      human: 'Unpredictable',
    };
    return `The ${adjectives[agent.strategy]} ${roleLabel}`;
  }

  private buildCharacterProfiles(result: SocietyResult): CharacterProfile[] {
    const finalEpoch = result.epochs[result.epochs.length - 1];
    const profiles: CharacterProfile[] = [];

    for (const agent of finalEpoch.agents) {
      const arc = this.buildCharacterArc(agent, result);

      profiles.push({
        name: agent.name,
        strategy: agent.strategy,
        archetype: this.roleStrategyArchetype(agent),
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
    const roleLabel = AGENT_ROLES[agent.role]?.label ?? 'villager';
    const coopRate = agent.cooperationRate;
    const reputation = agent.reputation;
    const coalitionSize = agent.coalitionSize;

    // Defector arc
    if (agent.strategy === 'defector') {
      if (coalitionSize > 0) {
        return `Despite cheating as a ${roleLabel.toLowerCase()}, ${agent.name} found unexpected allies — perhaps even exploiters need community.`;
      }
      if (reputation < 0.3) {
        return `${agent.name} the ${roleLabel} took from everyone, but the village eventually saw through it. Nobody trades with a known cheat.`;
      }
      return `${agent.name} the ${roleLabel} ran unfair deals ${Math.round((1 - coopRate) * 100)}% of the time${agent.atp < 50 ? ` and ended nearly broke` : ''}. Short-term gains, long-term losses.`;
    }

    // Cooperator arc
    if (agent.strategy === 'cooperator') {
      if (agent.atp > 100) {
        return `${agent.name} the ${roleLabel} traded fairly with everyone, and the village rewarded that trust with prosperity.`;
      }
      if (agent.atp < 50) {
        return `${agent.name} the ${roleLabel} gave and gave, sometimes to those who didn't deserve it. Generosity without wisdom has a cost.`;
      }
      return `${agent.name} the ${roleLabel} cooperated ${Math.round(coopRate * 100)}% of the time — ${agent.atp >= 80 ? 'a solid return on honest dealing' : 'generous, but the village didn\'t always reciprocate'}.`;
    }

    // Reciprocator arc
    if (agent.strategy === 'reciprocator') {
      if (coalitionSize >= 3) {
        return `${agent.name} the ${roleLabel} lived by a simple code — treat others as they treat you. It made them the backbone of the village alliance.`;
      }
      return `${agent.name} the ${roleLabel} gave fairness for fairness, ${Math.round(coopRate * 100)}% cooperation. ${agent.atp > 90 ? 'Fair dealing proved profitable.' : 'Honest, though not always lucrative.'}`;
    }

    // Cautious arc
    if (agent.strategy === 'cautious') {
      if (reputation > 0.5) {
        return `${agent.name} the ${roleLabel} waited and watched before trusting anyone. That patience kept them safe where others stumbled.`;
      }
      return `${agent.name} the ${roleLabel} held back, perhaps too much. Sometimes you have to take a chance on your neighbors.`;
    }

    // Adaptive arc
    if (agent.strategy === 'adaptive') {
      return `${agent.name} the ${roleLabel} read the village mood and adapted — ${Math.round(coopRate * 100)}% cooperation, ${Math.round(agent.atp)} energy. ${coopRate > 0.6 ? 'They learned that honesty was the best policy here.' : 'Their loyalties shifted with the wind.'}`;
    }

    return `${agent.name} the ${roleLabel} walked their own path through the village.`;
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

    const hasDefectors = (config.strategies?.defector ?? 0) > 0;
    const hasCooperators = (config.strategies?.cooperator ?? 0) > 0;
    let closing: string;
    if (hasDefectors && hasCooperators) {
      closing = "Idealists and opportunists sharing one society. The trust dynamics would determine who thrives.";
    } else if (hasDefectors) {
      closing = "A society of opportunists. Without trust-builders, who would create value?";
    } else {
      closing = "With no one looking to exploit, the question was whether cooperation alone could build a thriving society.";
    }

    return {
      number: 1,
      title: "A Society Begins",
      opening,
      events,
      closing,
      epochRange: { start: 0, end: 0 }, // Opening chapter covers first epoch
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
        description: `From the start, the tension was set: ${cooperator.name} the Idealist would extend trust freely, while ${defector.name} the Opportunist would look for advantages. How they'd interact would shape the society.`,
        quote: `"They'll learn," ${defector.name} might have thought. "Everyone does eventually."`,
        significance: "When idealists and opportunists share a society, the resulting dynamic defines the trust landscape.",
        epoch: 0,
        agentIds: [cooperator.id, defector.id],
      });
    }

    // Find reciprocators finding each other
    const reciprocators = agents.filter(a => a.strategy === 'reciprocator');
    if (reciprocators.length >= 2) {
      events.push({
        description: `Meanwhile, ${reciprocators[0].name} and ${reciprocators[1].name} began their dance of mutual testing. Each waited to see what the other would do, then matched it perfectly.`,
        significance: "Reciprocators finding each other is the seed of stable cooperation.",
        epoch: 0,
        agentIds: [reciprocators[0].id, reciprocators[1].id],
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
    const chapterEvents = events.slice(0, 4);
    const narrativeEvents = chapterEvents.map(e => this.narrateEvent(e, result));

    // Calculate epoch range from events
    const epochs = chapterEvents.map(e => e.epoch);
    const minEpoch = Math.min(...epochs);
    const maxEpoch = Math.max(...epochs);

    return {
      number,
      title,
      opening: this.getChapterOpening(title),
      events: narrativeEvents,
      epochRange: { start: minEpoch, end: maxEpoch },
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
        return `The simulation entered a new phase — round by round, the trust dynamics shifted.`;
    }
  }

  private narrateEvent(event: SocietyEvent, result: SocietyResult): NarrativeEvent {
    const agents = result.epochs[result.epochs.length - 1].agents;

    // Base narrative content depends on event type
    let baseNarrative: NarrativeEvent;
    switch (event.type) {
      case 'coalition_formed':
        baseNarrative = this.narrateCoalitionFormed(event, agents);
        break;
      case 'defector_isolated':
        baseNarrative = this.narrateDefectorIsolated(event, agents);
        break;
      case 'trust_collapse':
        baseNarrative = this.narrateTrustCollapse(event, agents);
        break;
      case 'agent_death':
        baseNarrative = this.narrateAgentDeath(event, agents);
        break;
      case 'agent_rebirth':
        baseNarrative = this.narrateAgentRebirth(event, agents);
        break;
      case 'cooperation_surge':
        baseNarrative = this.narrateCooperationSurge(event);
        break;
      case 'society_stable':
        baseNarrative = this.narrateSocietyStable(event);
        break;
      default:
        baseNarrative = {
          description: event.message,
          significance: event.significance,
        };
    }

    // Add animation metadata from original event
    return {
      ...baseNarrative,
      epoch: event.epoch,
      agentIds: event.agentIds,
    };
  }

  private narrateCoalitionFormed(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    const members = event.agentIds
      ?.map(id => agents.find(a => a.id === id))
      .filter(Boolean) ?? [];
    const memberNames = members.map(a => a!.name).join(', ');
    const strategies = new Set(members.map(a => a!.strategy));

    let quote: string;
    if (strategies.has('reciprocator') && strategies.size === 1) {
      quote = "We match what we receive. And from each other, we receive trust.";
    } else if (strategies.has('cooperator')) {
      quote = "Trust given freely attracts trust in return. That's the foundation.";
    } else {
      quote = "Mutual benefit, measured and visible. That's what makes this alliance work.";
    }

    return {
      description: `A coalition crystallized: ${memberNames || 'several agents'} recognized their mutual benefit and formed an alliance.`,
      quote,
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
    const agent = event.agentIds?.[0] != null ? agents.find(a => a.id === event.agentIds![0]) : null;
    const name = agent?.name ?? 'An agent';
    const strategy = agent?.strategy;

    let quote: string;
    if (strategy === 'defector') {
      quote = `${name} burned through their resources faster than exploitation could replenish them.`;
    } else if (strategy === 'cooperator') {
      quote = `${name}'s generosity wasn't enough to sustain them. Good intentions don't pay the energy bills.`;
    } else {
      quote = `${name} ran out of ATP. In Web4, survival requires earning — not just spending — attention.`;
    }

    return {
      description: event.message,
      quote,
      significance: event.significance,
    };
  }

  private narrateAgentRebirth(event: SocietyEvent, agents: AgentSnapshot[]): NarrativeEvent {
    const agent = event.agentIds?.[0] != null ? agents.find(a => a.id === event.agentIds![0]) : null;
    const name = agent?.name ?? 'An agent';

    return {
      description: event.message,
      significance: `${name} begins again. Karma carries forward — a new life, but old reputations echo.`,
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

  /**
   * Narrate the trajectory of trust across the simulation — how did things change over time?
   * This is the most human-readable part of the narrative: describing trends, not just endpoints.
   */
  private narrateTrajectory(result: SocietyResult): string | null {
    if (result.epochs.length < 3) return null;

    const early = result.epochs[0];
    const mid = result.epochs[Math.floor(result.epochs.length / 2)];
    const late = result.epochs[result.epochs.length - 1];

    // Calculate average trust at each point
    const avgTrust = (agents: AgentSnapshot[]) => {
      const alive = agents.filter(a => a.alive);
      return alive.length > 0 ? alive.reduce((s, a) => s + a.reputation, 0) / alive.length : 0;
    };

    const earlyTrust = avgTrust(early.agents);
    const midTrust = avgTrust(mid.agents);
    const lateTrust = avgTrust(late.agents);

    const aliveEarly = early.agents.filter(a => a.alive).length;
    const aliveLate = late.agents.filter(a => a.alive).length;
    const deaths = aliveEarly - aliveLate;

    const parts: string[] = [];

    // Trust trajectory
    if (lateTrust > earlyTrust + 0.15) {
      if (midTrust < earlyTrust) {
        parts.push(`Trust started at ${(earlyTrust * 100).toFixed(0)}%, dipped in the middle rounds, then climbed to ${(lateTrust * 100).toFixed(0)}% — a classic crisis-and-recovery arc`);
      } else {
        parts.push(`Trust steadily grew from ${(earlyTrust * 100).toFixed(0)}% to ${(lateTrust * 100).toFixed(0)}% as agents learned who to rely on`);
      }
    } else if (lateTrust < earlyTrust - 0.15) {
      parts.push(`Trust eroded from ${(earlyTrust * 100).toFixed(0)}% to ${(lateTrust * 100).toFixed(0)}% — the cooperative foundation crumbled under pressure`);
    } else if (midTrust < earlyTrust - 0.1 && lateTrust > midTrust + 0.1) {
      parts.push(`Trust wobbled — dropping mid-simulation before recovering to ${(lateTrust * 100).toFixed(0)}%`);
    }

    // Death toll
    if (deaths > 0) {
      parts.push(`${deaths} agent${deaths > 1 ? 's' : ''} didn't make it to the end`);
    }

    // Coalition growth
    const lateCoalitions = late.coalitions?.length || 0;
    if (lateCoalitions > 0) {
      const largestSize = late.coalitions ? Math.max(...late.coalitions.map((c: Coalition) => c.members.length)) : 0;
      if (largestSize >= 4) {
        parts.push(`a dominant coalition of ${largestSize} emerged, reshaping the power structure`);
      }
    }

    if (parts.length === 0) return null;

    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) +
      (parts.length > 1 ? '. ' + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('. ') : '') + '.';
  }

  private buildClosingChapter(number: number, result: SocietyResult): NarrativeChapter {
    const finalMetrics = result.finalMetrics;
    const finalEpoch = result.epochs[result.epochs.length - 1];
    const finalEpochIndex = result.epochs.length - 1;

    const events: NarrativeEvent[] = [];

    // Trajectory narration — how did we get here?
    const trajectoryText = this.narrateTrajectory(result);
    if (trajectoryText) {
      events.push({
        description: trajectoryText,
        significance: "The journey matters as much as the destination.",
        epoch: finalEpochIndex,
      });
    }

    // Describe the final state
    events.push({
      description: this.describeFinalState(finalMetrics),
      significance: "The final metrics tell the story of what kind of society emerged.",
      epoch: finalEpochIndex,
    });

    // Highlight winners and losers
    const winners = finalEpoch.agents.filter(a => a.atp > 120 && a.alive);
    const losers = finalEpoch.agents.filter(a => !a.alive || a.atp < 40);

    if (winners.length > 0) {
      const hasDefectorWinner = winners.some(a => a.strategy === 'defector');
      const winnerDesc = hasDefectorWinner
        ? `Those who thrived: ${winners.map(a => `${a.name} (${a.strategy})`).join(', ')}. Not all succeeded through trust — some found ways to profit at others' expense.`
        : `Those who thrived: ${winners.map(a => `${a.name} (${a.strategy})`).join(', ')}. Their success came from earning trust that others recognized and reciprocated.`;
      events.push({
        description: winnerDesc,
        significance: hasDefectorWinner
          ? "When defectors thrive, it reveals gaps in the trust network's accountability."
          : "In Web4, prosperity flows to those who build genuine trust.",
        epoch: finalEpochIndex,
        agentIds: winners.map(a => a.id),
      });
    }

    if (losers.length > 0) {
      const hasCooperatorLoser = losers.some(a => a.strategy === 'cooperator');
      const loserDesc = hasCooperatorLoser
        ? `Those who struggled: ${losers.map(a => `${a.name} (${a.strategy})`).join(', ')}. Some were exploited despite good intentions; others couldn't sustain themselves.`
        : `Those who struggled: ${losers.map(a => `${a.name} (${a.strategy})`).join(', ')}. Their approach couldn't sustain them in this society's trust dynamics.`;
      events.push({
        description: loserDesc,
        significance: hasCooperatorLoser
          ? "Trust networks don't always protect the trusting — sometimes cooperators pay the price for others' exploitation."
          : "In transparent trust networks, strategies that don't build genuine value eventually fail.",
        epoch: finalEpochIndex,
        agentIds: losers.map(a => a.id),
      });
    }

    return {
      number,
      title: "What Emerged",
      opening: `After ${result.epochs.length} rounds and countless interactions, the society reached its end state.`,
      events,
      closing: this.generateMoral(result),
      epochRange: { start: finalEpochIndex, end: finalEpochIndex },
    };
  }

  private describeFinalState(metrics: SocietyMetrics): string {
    let description = `Final society metrics: Average trust at ${(metrics.averageTrust * 100).toFixed(0)}%, `;
    description += `cooperation rate of ${(metrics.cooperationRate * 100).toFixed(0)}%, `;
    description += `${metrics.numCoalitions} coalition${metrics.numCoalitions !== 1 ? 's' : ''} formed`;

    if (metrics.largestCoalition > 0) {
      description += ` (largest with ${metrics.largestCoalition} members)`;
    }

    // Translate Gini into human language
    if (metrics.giniCoefficient < 0.2) {
      description += `. Wealth was shared remarkably equally — no one agent hoarded resources.`;
    } else if (metrics.giniCoefficient > 0.5) {
      description += `. A stark wealth divide emerged — a few agents controlled most of the ATP while others scraped by.`;
    } else if (metrics.giniCoefficient > 0.35) {
      description += `. Wealth concentrated toward the top — the rich got richer, the poor stayed poor.`;
    } else {
      description += `. Resources were distributed unevenly, but not dramatically so.`;
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

    let summary = `This simulation followed ${agentCount} agents through ${epochs} rounds of interaction. `;

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
      ? `"${mostEqual.label}" shared wealth more equally while "${leastEqual.label}" saw wealth concentrate among a few.`
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
      const strategyName = archetypes[dominantInTriumph] || dominantInTriumph + 's';
      if (dominantInTriumph === 'defector') {
        insights.push(`${strategyName} thrived in "${triumphs[0].name}" — a reminder that exploitation can pay off when trust networks lack accountability mechanisms.`);
      } else if (dominantInTriumph === 'reciprocator') {
        insights.push(`${strategyName} thrived in "${triumphs[0].name}" — mirroring behavior built trust with cooperators while punishing defectors.`);
      } else {
        insights.push(`${strategyName} thrived in "${triumphs[0].name}" — their approach aligned with the society's dynamics.`);
      }
    }
  }

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

// ============================================================================
// Character Relationship Analysis
// ============================================================================

/**
 * Relationship types between characters, determined by interaction patterns
 */
export type RelationshipType =
  | 'allies'       // High mutual trust, consistent cooperation
  | 'rivals'       // Low mutual trust, frequent mutual defection
  | 'exploiter'    // One-sided exploitation (A exploits B)
  | 'victim'       // Being exploited (B is exploited by A)
  | 'rebuilding'   // Trust was lost but is being rebuilt
  | 'strangers';   // Limited interaction history

/**
 * A relationship between two characters with narrative context
 */
export interface CharacterRelationship {
  /** First character name */
  character1: string;
  /** Second character name */
  character2: string;
  /** First character's ID */
  character1Id: number;
  /** Second character's ID */
  character2Id: number;
  /** Type of relationship from character1's perspective toward character2 */
  type: RelationshipType;
  /** Trust level from character1 toward character2 (0-1) */
  trustLevel: number;
  /** Trust level from character2 toward character1 (0-1) */
  reverseTrustLevel: number;
  /** Total interactions between these characters */
  interactionCount: number;
  /** Number of mutual cooperations */
  mutualCooperations: number;
  /** Number of mutual defections */
  mutualDefections: number;
  /** Number of times character1 exploited character2 */
  exploitations: number;
  /** Number of times character2 exploited character1 */
  wasExploited: number;
  /** A narrative description of this relationship */
  narrative: string;
  /** Key moments in the relationship */
  keyMoments: RelationshipMoment[];
  /** Whether they're in the same coalition at the end */
  inSameCoalition: boolean;
  /** Story significance (0-1) - how interesting is this relationship */
  significance: number;
}

/**
 * A pivotal moment in a relationship
 */
export interface RelationshipMoment {
  epoch: number;
  description: string;
  trustChange: 'increased' | 'decreased' | 'breakthrough' | 'betrayal';
}

/**
 * Full relationship map for a simulation
 */
export interface RelationshipMap {
  /** All notable relationships, sorted by significance */
  relationships: CharacterRelationship[];
  /** Summary statistics */
  stats: {
    totalRelationships: number;
    allyPairs: number;
    rivalPairs: number;
    exploitationPairs: number;
    averageTrust: number;
  };
  /** The strongest alliance in the simulation */
  strongestAlliance: CharacterRelationship | null;
  /** The bitterest rivalry */
  bitterestRivalry: CharacterRelationship | null;
  /** The most dramatic betrayal */
  mostDramaticBetrayal: CharacterRelationship | null;
}

/**
 * Analyze relationships between all characters in a simulation
 */
export function analyzeRelationships(result: SocietyResult): RelationshipMap {
  const finalEpoch = result.epochs[result.epochs.length - 1];
  const agents = finalEpoch.agents;
  const allInteractions = result.epochs.flatMap(e => e.interactions);
  const coalitions = finalEpoch.coalitions;

  const relationships: CharacterRelationship[] = [];

  // Build interaction statistics for each pair
  const pairStats = new Map<string, {
    interactions: number;
    mutualCoops: number;
    mutualDefects: number;
    exploitationsBy1: number;
    exploitationsBy2: number;
    trustChanges: { epoch: number; change: number; from: number }[];
  }>();

  for (const interaction of allInteractions) {
    const key = `${Math.min(interaction.agent1Id, interaction.agent2Id)}-${Math.max(interaction.agent1Id, interaction.agent2Id)}`;
    const isAgent1First = interaction.agent1Id < interaction.agent2Id;

    if (!pairStats.has(key)) {
      pairStats.set(key, {
        interactions: 0,
        mutualCoops: 0,
        mutualDefects: 0,
        exploitationsBy1: 0,
        exploitationsBy2: 0,
        trustChanges: [],
      });
    }

    const stats = pairStats.get(key)!;
    stats.interactions++;

    if (interaction.outcome === 'mutual_cooperation') {
      stats.mutualCoops++;
    } else if (interaction.outcome === 'mutual_defection') {
      stats.mutualDefects++;
    } else if (interaction.outcome === 'agent1_exploited') {
      // Agent 2 exploited Agent 1
      if (isAgent1First) {
        stats.exploitationsBy2++;
      } else {
        stats.exploitationsBy1++;
      }
    } else if (interaction.outcome === 'agent2_exploited') {
      // Agent 1 exploited Agent 2
      if (isAgent1First) {
        stats.exploitationsBy1++;
      } else {
        stats.exploitationsBy2++;
      }
    }

    // Track significant trust changes
    const trustChange = Math.max(
      Math.abs(interaction.agent1TrustChange),
      Math.abs(interaction.agent2TrustChange)
    );
    if (Math.abs(trustChange) > 0.05) {
      stats.trustChanges.push({
        epoch: interaction.epoch,
        change: trustChange,
        from: isAgent1First ? interaction.agent1Id : interaction.agent2Id,
      });
    }
  }

  // Build relationships for each pair with significant interaction
  for (const agent1 of agents) {
    for (const agent2 of agents) {
      if (agent1.id >= agent2.id) continue; // Only process each pair once

      const key = `${agent1.id}-${agent2.id}`;
      const stats = pairStats.get(key);

      // Skip pairs with no interaction
      if (!stats || stats.interactions === 0) continue;

      // Get trust levels
      const trust1to2 = agent1.trustEdges.find(e => e.targetId === agent2.id)?.trust ?? 0.5;
      const trust2to1 = agent2.trustEdges.find(e => e.targetId === agent1.id)?.trust ?? 0.5;

      // Determine relationship type
      const type = determineRelationshipType(
        stats.mutualCoops,
        stats.mutualDefects,
        stats.exploitationsBy1,
        stats.exploitationsBy2,
        trust1to2,
        trust2to1,
        stats.interactions
      );

      // Check coalition membership
      const inSameCoalition = coalitions.some(
        c => c.members.includes(agent1.id) && c.members.includes(agent2.id)
      );

      // Generate key moments
      const keyMoments = generateRelationshipMoments(
        stats,
        agent1.name,
        agent2.name
      );

      // Calculate significance
      const significance = calculateRelationshipSignificance(
        stats,
        trust1to2,
        trust2to1,
        type,
        inSameCoalition
      );

      // Generate narrative
      const narrative = generateRelationshipNarrative(
        agent1,
        agent2,
        type,
        stats,
        trust1to2,
        trust2to1,
        inSameCoalition
      );

      relationships.push({
        character1: agent1.name,
        character2: agent2.name,
        character1Id: agent1.id,
        character2Id: agent2.id,
        type,
        trustLevel: trust1to2,
        reverseTrustLevel: trust2to1,
        interactionCount: stats.interactions,
        mutualCooperations: stats.mutualCoops,
        mutualDefections: stats.mutualDefects,
        exploitations: stats.exploitationsBy1,
        wasExploited: stats.exploitationsBy2,
        narrative,
        keyMoments,
        inSameCoalition,
        significance,
      });
    }
  }

  // Sort by significance
  relationships.sort((a, b) => b.significance - a.significance);

  // Calculate stats
  const allyPairs = relationships.filter(r => r.type === 'allies').length;
  const rivalPairs = relationships.filter(r => r.type === 'rivals').length;
  const exploitationPairs = relationships.filter(
    r => r.type === 'exploiter' || r.type === 'victim'
  ).length;
  const avgTrust = relationships.length > 0
    ? relationships.reduce((sum, r) => sum + (r.trustLevel + r.reverseTrustLevel) / 2, 0) / relationships.length
    : 0;

  // Find notable relationships
  const strongestAlliance = relationships
    .filter(r => r.type === 'allies')
    .sort((a, b) => (b.trustLevel + b.reverseTrustLevel) - (a.trustLevel + a.reverseTrustLevel))[0] || null;

  const bitterestRivalry = relationships
    .filter(r => r.type === 'rivals')
    .sort((a, b) => a.trustLevel - b.trustLevel)[0] || null;

  const mostDramaticBetrayal = relationships
    .filter(r => r.type === 'exploiter' || r.type === 'victim')
    .filter(r => r.wasExploited > 0 || r.exploitations > 0)
    .sort((a, b) => Math.max(b.exploitations, b.wasExploited) - Math.max(a.exploitations, a.wasExploited))[0] || null;

  return {
    relationships,
    stats: {
      totalRelationships: relationships.length,
      allyPairs,
      rivalPairs,
      exploitationPairs,
      averageTrust: avgTrust,
    },
    strongestAlliance,
    bitterestRivalry,
    mostDramaticBetrayal,
  };
}

function determineRelationshipType(
  mutualCoops: number,
  mutualDefects: number,
  exploitsBy1: number,
  exploitsBy2: number,
  trust1to2: number,
  trust2to1: number,
  totalInteractions: number
): RelationshipType {
  const avgTrust = (trust1to2 + trust2to1) / 2;
  const trustDiff = Math.abs(trust1to2 - trust2to1);
  const coopRate = totalInteractions > 0 ? mutualCoops / totalInteractions : 0;
  const defectRate = totalInteractions > 0 ? mutualDefects / totalInteractions : 0;

  // Allies: high mutual trust and mostly cooperation
  if (avgTrust > 0.6 && coopRate > 0.5 && trustDiff < 0.2) {
    return 'allies';
  }

  // Rivals: low mutual trust and frequent defection
  if (avgTrust < 0.4 && defectRate > 0.3) {
    return 'rivals';
  }

  // Exploitation: one-sided trust/exploitation pattern
  if (trustDiff > 0.3) {
    if (trust1to2 > trust2to1) {
      // Agent 2 is likely the exploiter (agent 1 trusts but is exploited)
      return exploitsBy2 > exploitsBy1 ? 'victim' : 'exploiter';
    } else {
      return exploitsBy1 > exploitsBy2 ? 'exploiter' : 'victim';
    }
  }

  // Check for rebuilding: had defections but now has rising trust
  if (mutualCoops > 0 && mutualDefects > 0 && avgTrust > 0.4) {
    return 'rebuilding';
  }

  // Default: strangers (limited meaningful interaction)
  return 'strangers';
}

function generateRelationshipMoments(
  stats: {
    interactions: number;
    mutualCoops: number;
    mutualDefects: number;
    exploitationsBy1: number;
    exploitationsBy2: number;
    trustChanges: { epoch: number; change: number; from: number }[];
  },
  name1: string,
  name2: string
): RelationshipMoment[] {
  const moments: RelationshipMoment[] = [];

  // First significant cooperation — use actual trust change data if available
  if (stats.mutualCoops > 0) {
    const firstPositive = stats.trustChanges.find(tc => tc.change > 0);
    moments.push({
      epoch: firstPositive?.epoch ?? 1,
      description: `${name1} and ${name2} first cooperated`,
      trustChange: 'increased',
    });
  }

  // Betrayal moment — use actual trust change data if available
  if (stats.exploitationsBy1 > 0 || stats.exploitationsBy2 > 0) {
    const betrayer = stats.exploitationsBy1 > stats.exploitationsBy2 ? name1 : name2;
    const victim = betrayer === name1 ? name2 : name1;
    const firstNegative = stats.trustChanges.find(tc => tc.change < 0);
    moments.push({
      epoch: firstNegative?.epoch ?? Math.floor(stats.interactions / 3),
      description: `${betrayer} betrayed ${victim}'s trust`,
      trustChange: 'betrayal',
    });
  }

  // Trust breakthrough (high cooperation after initial wariness)
  if (stats.mutualCoops >= 3 && stats.interactions >= 4) {
    moments.push({
      epoch: Math.floor(stats.interactions / 2),
      description: `${name1} and ${name2} reached mutual understanding`,
      trustChange: 'breakthrough',
    });
  }

  return moments;
}

function calculateRelationshipSignificance(
  stats: {
    interactions: number;
    mutualCoops: number;
    mutualDefects: number;
    exploitationsBy1: number;
    exploitationsBy2: number;
  },
  trust1to2: number,
  trust2to1: number,
  type: RelationshipType,
  inSameCoalition: boolean
): number {
  let significance = 0;

  // Interaction count contributes to significance
  significance += Math.min(stats.interactions / 10, 0.3);

  // Extreme trust levels are more interesting
  const avgTrust = (trust1to2 + trust2to1) / 2;
  if (avgTrust > 0.8 || avgTrust < 0.2) {
    significance += 0.3;
  }

  // Coalition membership increases significance
  if (inSameCoalition) {
    significance += 0.2;
  }

  // Drama! Betrayals and exploitation are interesting
  if (stats.exploitationsBy1 > 0 || stats.exploitationsBy2 > 0) {
    significance += 0.2;
  }

  // Allies and rivals are more interesting than strangers
  if (type === 'allies' || type === 'rivals') {
    significance += 0.1;
  }

  // Rebuilding relationships are narratively interesting
  if (type === 'rebuilding') {
    significance += 0.2;
  }

  return Math.min(significance, 1);
}

function generateRelationshipNarrative(
  agent1: AgentSnapshot,
  agent2: AgentSnapshot,
  type: RelationshipType,
  stats: {
    interactions: number;
    mutualCoops: number;
    mutualDefects: number;
    exploitationsBy1: number;
    exploitationsBy2: number;
  },
  trust1to2: number,
  trust2to1: number,
  inSameCoalition: boolean
): string {
  const archetype1 = STRATEGY_ARCHETYPES[agent1.strategy].archetype;
  const archetype2 = STRATEGY_ARCHETYPES[agent2.strategy].archetype;

  switch (type) {
    case 'allies':
      if (inSameCoalition) {
        return `${agent1.name} (${archetype1}) and ${agent2.name} (${archetype2}) formed a strong alliance. Their ${stats.mutualCoops} successful cooperations built deep mutual trust, and they joined the same coalition. This is what Web4 cooperation looks like.`;
      }
      return `${agent1.name} and ${agent2.name} developed mutual trust through consistent cooperation. ${stats.mutualCoops} positive interactions created a reliable partnership.`;

    case 'rivals':
      return `${agent1.name} (${archetype1}) and ${agent2.name} (${archetype2}) became rivals. ${stats.mutualDefects} mutual defections eroded whatever trust might have formed. Neither was willing to risk cooperation.`;

    case 'exploiter':
      return `${agent1.name} (${archetype1}) took advantage of ${agent2.name} (${archetype2}), exploiting their trust ${stats.exploitationsBy1} time${stats.exploitationsBy1 !== 1 ? 's' : ''}. This is the dark side of trusting strategies.`;

    case 'victim':
      return `${agent2.name} (${archetype2}) exploited ${agent1.name} (${archetype1}) ${stats.exploitationsBy2} time${stats.exploitationsBy2 !== 1 ? 's' : ''}. ${agent1.name}'s trust was not rewarded—a cautionary tale.`;

    case 'rebuilding':
      return `${agent1.name} and ${agent2.name} had a rocky start but are rebuilding trust. After ${stats.mutualDefects} failures, they've managed ${stats.mutualCoops} successful cooperations. Perhaps trust can be repaired.`;

    case 'strangers':
    default:
      return `${agent1.name} and ${agent2.name} had limited meaningful interaction. They remain strangers in this society.`;
  }
}

/**
 * Get the top relationships for narrative display
 */
export function getTopRelationships(
  result: SocietyResult,
  limit: number = 5
): CharacterRelationship[] {
  const map = analyzeRelationships(result);
  return map.relationships.slice(0, limit);
}

/**
 * Add relationship data to an existing narrative
 */
export function enrichNarrativeWithRelationships(
  narrative: SocietyNarrative,
  result: SocietyResult
): SocietyNarrative & { relationships: RelationshipMap } {
  const relationships = analyzeRelationships(result);
  return {
    ...narrative,
    relationships,
  };
}

// ============================================================================
// Character Journey (Deep Dive into a Single Character)
// ============================================================================

/**
 * A detailed journey through a character's experience in the simulation
 */
export interface CharacterJourney {
  // Identity
  name: string;
  strategy: StrategyType;
  archetype: string;
  personality: string;

  // Overview
  tagline: string;
  storyArc: string;
  finalStatus: 'thriving' | 'surviving' | 'struggling' | 'dead';

  // Timeline of key events
  timeline: CharacterEvent[];

  // Statistics over time
  trustHistory: { epoch: number; avgTrust: number }[];
  atpHistory: { epoch: number; atp: number }[];
  reputationHistory: { epoch: number; reputation: number }[];

  // Relationships summary
  relationships: {
    name: string;
    type: RelationshipType;
    trustGiven: number;
    trustReceived: number;
    narrative: string;
  }[];

  // Final stats
  finalStats: {
    atp: number;
    reputation: number;
    cooperationRate: number;
    coalitionSize: number;
    trustGiven: number;   // avg trust they give others
    trustReceived: number; // avg trust others give them
  };

  // Character quote (imagined)
  quote: string;

  // Moral or lesson from this character's journey
  lessonLearned: string;
}

/**
 * An event in a character's timeline
 */
export interface CharacterEvent {
  epoch: number;
  type: 'interaction' | 'coalition' | 'isolation' | 'death' | 'rebirth' | 'trust_change' | 'status_change';
  title: string;
  description: string;
  significance: 'low' | 'medium' | 'high';
  relatedAgentIds?: number[];
}

/**
 * Generate a detailed journey for a specific character
 */
export function generateCharacterJourney(
  result: SocietyResult,
  characterName: string
): CharacterJourney | null {
  // Find the character across epochs
  const firstEpoch = result.epochs[0];
  const finalEpoch = result.epochs[result.epochs.length - 1];

  const finalAgent = finalEpoch.agents.find(a => a.name === characterName);
  const firstAgent = firstEpoch.agents.find(a => a.name === characterName);

  if (!finalAgent || !firstAgent) {
    return null;
  }

  const archetypeInfo = STRATEGY_ARCHETYPES[finalAgent.strategy];

  // Build timeline from events involving this character
  const timeline = buildCharacterTimeline(result, finalAgent.id);

  // Build trust/ATP/reputation history
  const trustHistory: { epoch: number; avgTrust: number }[] = [];
  const atpHistory: { epoch: number; atp: number }[] = [];
  const reputationHistory: { epoch: number; reputation: number }[] = [];

  for (let i = 0; i < result.epochs.length; i++) {
    const epoch = result.epochs[i];
    const agent = epoch.agents.find(a => a.id === finalAgent.id);
    if (agent) {
      // Calculate average trust this agent gives to others
      const avgTrust = agent.trustEdges.length > 0
        ? agent.trustEdges.reduce((sum, e) => sum + e.trust, 0) / agent.trustEdges.length
        : 0.5;

      trustHistory.push({ epoch: i, avgTrust });
      atpHistory.push({ epoch: i, atp: agent.atp });
      reputationHistory.push({ epoch: i, reputation: agent.reputation });
    }
  }

  // Get relationships involving this character
  const relationshipMap = analyzeRelationships(result);
  const charRelationships = relationshipMap.relationships
    .filter(r => r.character1 === characterName || r.character2 === characterName)
    .map(r => ({
      name: r.character1 === characterName ? r.character2 : r.character1,
      type: r.type,
      trustGiven: r.character1 === characterName ? r.trustLevel : r.reverseTrustLevel,
      trustReceived: r.character1 === characterName ? r.reverseTrustLevel : r.trustLevel,
      narrative: r.narrative,
    }))
    .sort((a, b) => {
      // Sort by relationship significance: allies first, then exploiter/victim, then rivals, then strangers
      const typeOrder: Record<RelationshipType, number> = {
        allies: 0,
        exploiter: 1,
        victim: 1,
        rivals: 2,
        rebuilding: 3,
        strangers: 4,
      };
      return typeOrder[a.type] - typeOrder[b.type];
    });

  // Calculate final stats
  const avgTrustGiven = finalAgent.trustEdges.length > 0
    ? finalAgent.trustEdges.reduce((sum, e) => sum + e.trust, 0) / finalAgent.trustEdges.length
    : 0.5;

  // Calculate trust received from others
  let totalTrustReceived = 0;
  let trustReceivedCount = 0;
  for (const other of finalEpoch.agents) {
    if (other.id !== finalAgent.id) {
      const edge = other.trustEdges.find(e => e.targetId === finalAgent.id);
      if (edge) {
        totalTrustReceived += edge.trust;
        trustReceivedCount++;
      }
    }
  }
  const avgTrustReceived = trustReceivedCount > 0 ? totalTrustReceived / trustReceivedCount : 0.5;

  // Determine final status
  const finalStatus = determineCharacterStatus(finalAgent);

  // Generate tagline based on outcome
  const tagline = generateCharacterTagline(finalAgent, finalStatus, timeline);

  // Generate story arc
  const storyArc = generateCharacterStoryArc(firstAgent, finalAgent, result, timeline);

  // Generate quote
  const quote = generateCharacterQuote(finalAgent, finalStatus);

  // Generate lesson
  const lessonLearned = generateCharacterLesson(finalAgent, finalStatus, result);

  return {
    name: characterName,
    strategy: finalAgent.strategy,
    archetype: archetypeInfo.archetype,
    personality: archetypeInfo.personality,
    tagline,
    storyArc,
    finalStatus,
    timeline,
    trustHistory,
    atpHistory,
    reputationHistory,
    relationships: charRelationships,
    finalStats: {
      atp: finalAgent.atp,
      reputation: finalAgent.reputation,
      cooperationRate: finalAgent.cooperationRate,
      coalitionSize: finalAgent.coalitionSize,
      trustGiven: avgTrustGiven,
      trustReceived: avgTrustReceived,
    },
    quote,
    lessonLearned,
  };
}

/**
 * Build a timeline of significant events for a character
 */
function buildCharacterTimeline(result: SocietyResult, agentId: number): CharacterEvent[] {
  const events: CharacterEvent[] = [];

  // Add events from the simulation that mention this agent
  for (const event of result.events) {
    if (event.agentIds?.includes(agentId)) {
      events.push({
        epoch: event.epoch,
        type: mapEventType(event.type),
        title: getEventTitle(event.type),
        description: event.message,
        significance: getEventSignificance(event.type),
        relatedAgentIds: event.agentIds.filter(id => id !== agentId),
      });
    }
  }

  // Detect trust trajectory changes by analyzing epoch data
  let lastTrend: 'rising' | 'falling' | 'stable' = 'stable';
  for (let i = 1; i < result.epochs.length; i++) {
    const prevEpoch = result.epochs[i - 1];
    const currEpoch = result.epochs[i];

    const prevAgent = prevEpoch.agents.find(a => a.id === agentId);
    const currAgent = currEpoch.agents.find(a => a.id === agentId);

    if (!prevAgent || !currAgent) continue;

    // Check for significant ATP changes
    const atpChange = currAgent.atp - prevAgent.atp;
    if (Math.abs(atpChange) > 20) {
      events.push({
        epoch: i,
        type: 'status_change',
        title: atpChange > 0 ? 'Resource Surge' : 'Resource Crisis',
        description: atpChange > 0
          ? `${currAgent.name}'s ATP jumped by ${Math.round(atpChange)} points, indicating successful interactions.`
          : `${currAgent.name}'s ATP dropped by ${Math.round(Math.abs(atpChange))} points, a concerning development.`,
        significance: Math.abs(atpChange) > 30 ? 'high' : 'medium',
      });
    }

    // Check for reputation changes
    const repChange = currAgent.reputation - prevAgent.reputation;
    if (Math.abs(repChange) > 0.15) {
      events.push({
        epoch: i,
        type: 'trust_change',
        title: repChange > 0 ? 'Rising Reputation' : 'Reputation Hit',
        description: repChange > 0
          ? `${currAgent.name}'s reputation improved significantly, gaining the trust of the community.`
          : `${currAgent.name}'s reputation suffered, as others began to question their reliability.`,
        significance: 'medium',
      });
    }

    // Check for coalition changes
    if (currAgent.coalitionSize > prevAgent.coalitionSize && currAgent.coalitionSize >= 2) {
      events.push({
        epoch: i,
        type: 'coalition',
        title: 'Coalition Growth',
        description: `${currAgent.name} expanded their alliance to ${currAgent.coalitionSize} members.`,
        significance: currAgent.coalitionSize >= 4 ? 'high' : 'medium',
      });
    }
    if (currAgent.coalitionSize < prevAgent.coalitionSize && prevAgent.coalitionSize >= 2) {
      events.push({
        epoch: i,
        type: 'coalition',
        title: 'Coalition Collapse',
        description: `${currAgent.name}'s alliance shrank from ${prevAgent.coalitionSize} to ${currAgent.coalitionSize} members.`,
        significance: 'high',
      });
    }
  }

  // Sort by epoch, then by significance
  events.sort((a, b) => {
    if (a.epoch !== b.epoch) return a.epoch - b.epoch;
    const sigOrder = { high: 0, medium: 1, low: 2 };
    return sigOrder[a.significance] - sigOrder[b.significance];
  });

  // Deduplicate events at the same epoch with same type
  const seen = new Set<string>();
  return events.filter(e => {
    const key = `${e.epoch}-${e.type}-${e.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mapEventType(type: string): CharacterEvent['type'] {
  switch (type) {
    case 'coalition_formed':
    case 'coalition_dissolved':
      return 'coalition';
    case 'defector_isolated':
      return 'isolation';
    case 'agent_death':
      return 'death';
    case 'agent_rebirth':
      return 'rebirth';
    case 'trust_collapse':
    case 'trust_network_connected':
      return 'trust_change';
    default:
      return 'interaction';
  }
}

function getEventTitle(type: string): string {
  switch (type) {
    case 'coalition_formed': return 'Joined a Coalition';
    case 'coalition_dissolved': return 'Coalition Dissolved';
    case 'defector_isolated': return 'Isolated by Society';
    case 'agent_death': return 'Ran Out of Resources';
    case 'agent_rebirth': return 'Given a Second Chance';
    case 'trust_collapse': return 'Trust Collapsed';
    case 'trust_network_connected': return 'Trust Network Formed';
    case 'cooperation_surge': return 'Cooperation Surge';
    case 'strategy_shift': return 'Strategy Shift Detected';
    case 'society_stable': return 'Society Stabilized';
    default: return 'Notable Event';
  }
}

function getEventSignificance(type: string): 'low' | 'medium' | 'high' {
  switch (type) {
    case 'defector_isolated':
    case 'agent_death':
    case 'trust_collapse':
    case 'coalition_formed':
      return 'high';
    case 'coalition_dissolved':
    case 'agent_rebirth':
    case 'trust_network_connected':
    case 'society_stable':
      return 'medium';
    default:
      return 'low';
  }
}

function determineCharacterStatus(agent: AgentSnapshot): 'thriving' | 'surviving' | 'struggling' | 'dead' {
  if (!agent.alive) return 'dead';
  if (agent.atp > 120 && agent.reputation > 0.5) return 'thriving';
  if (agent.atp > 60 || agent.reputation > 0.4) return 'surviving';
  return 'struggling';
}

function generateCharacterTagline(
  agent: AgentSnapshot,
  status: string,
  timeline: CharacterEvent[]
): string {
  const archetype = STRATEGY_ARCHETYPES[agent.strategy];
  const wasIsolated = timeline.some(e => e.type === 'isolation');
  const grewCoalition = timeline.some(e => e.type === 'coalition' && e.title === 'Coalition Growth');

  if (status === 'dead') {
    return `${archetype.archetype} who didn't survive the social jungle`;
  }
  if (status === 'thriving') {
    if (grewCoalition) {
      return `${archetype.archetype} who built an empire of trust`;
    }
    return `${archetype.archetype} who found prosperity through consistency`;
  }
  if (wasIsolated) {
    return `${archetype.archetype} who learned what happens when trust runs out`;
  }
  if (status === 'struggling') {
    return `${archetype.archetype} fighting to stay afloat`;
  }
  return `${archetype.archetype} navigating the social landscape`;
}

function generateCharacterStoryArc(
  firstAgent: AgentSnapshot,
  finalAgent: AgentSnapshot,
  result: SocietyResult,
  timeline: CharacterEvent[]
): string {
  const archetype = STRATEGY_ARCHETYPES[finalAgent.strategy];
  const atpChange = finalAgent.atp - firstAgent.atp;
  const repChange = finalAgent.reputation - (firstAgent.reputation || 0.5);

  const parts: string[] = [];

  // Opening
  parts.push(`${finalAgent.name} began this journey as ${archetype.archetype.toLowerCase()}, someone who ${archetype.personality}.`);

  // Middle - based on trajectory
  if (timeline.length === 0) {
    parts.push(`Their time in the society was relatively uneventful, with few major turning points.`);
  } else {
    const highEvents = timeline.filter(e => e.significance === 'high');
    if (highEvents.length > 0) {
      parts.push(`Their journey had ${highEvents.length} pivotal moment${highEvents.length > 1 ? 's' : ''} that shaped their fate.`);
    }

    const isolationEvent = timeline.find(e => e.type === 'isolation');
    const coalitionEvent = timeline.find(e => e.type === 'coalition');

    if (isolationEvent) {
      parts.push(`At round ${isolationEvent.epoch + 1}, they faced isolation from the community — no one would interact with them.`);
    } else if (coalitionEvent) {
      parts.push(`They found strength in numbers, joining forces with others to build a coalition.`);
    }
  }

  // Ending - based on outcome
  if (!finalAgent.alive) {
    parts.push(`In the end, ${finalAgent.name} ran out of resources—a stark reminder that in societies built on trust, some approaches simply don't work.`);
  } else if (atpChange > 50 && repChange > 0.2) {
    parts.push(`By the end, ${finalAgent.name} had not only survived but thrived, emerging wealthier and more respected than when they started.`);
  } else if (atpChange < -30 || repChange < -0.2) {
    parts.push(`The journey took its toll. ${finalAgent.name} ended with less than they started, a cautionary tale about the costs of certain social strategies.`);
  } else {
    parts.push(`${finalAgent.name} finished the simulation in a stable position, neither rising nor falling dramatically—sometimes survival is its own success.`);
  }

  return parts.join(' ');
}

function generateCharacterQuote(agent: AgentSnapshot, status: string): string {
  const quotes: Record<StrategyType, Record<string, string>> = {
    cooperator: {
      thriving: "I gave trust freely, and the world gave back tenfold.",
      surviving: "Trust is a gift, not a transaction. Sometimes it's not returned.",
      struggling: "They took advantage of my openness. But I won't become like them.",
      dead: "I trusted everyone... perhaps that was my undoing.",
    },
    defector: {
      thriving: "They call it selfish. I call it surviving.",
      surviving: "You take what you can in this world. That's just reality.",
      struggling: "Turns out, burning bridges leaves you stranded.",
      dead: "Everyone's a sucker... except, apparently, me.",
    },
    reciprocator: {
      thriving: "Give what you get. It's simple, and it works.",
      surviving: "I met trust with trust, and betrayal with caution.",
      struggling: "Mirror the world, and sometimes the world is harsh.",
      dead: "I only gave back what I received. It wasn't enough.",
    },
    cautious: {
      thriving: "Patience. That's the real strategy.",
      surviving: "Trust must be earned. I didn't give it away cheaply.",
      struggling: "Maybe I waited too long. Maybe I trusted too little.",
      dead: "My walls protected me... until they didn't.",
    },
    adaptive: {
      thriving: "Read the room, adapt, survive. Thrive.",
      surviving: "Flexibility is survival. I bent so I wouldn't break.",
      struggling: "I tried to read them all. Some books are harder than others.",
      dead: "I changed too slowly. The world changed faster.",
    },
    human: {
      thriving: "No algorithm can replace intuition. That's our edge.",
      surviving: "I made choices no machine could predict. Some worked.",
      struggling: "Being human means sometimes getting it wrong. Often, actually.",
      dead: "Free will is a double-edged sword.",
    },
  };

  return quotes[agent.strategy][status] || "Every society tells a story. This was mine.";
}

function generateCharacterLesson(
  agent: AgentSnapshot,
  status: string,
  result: SocietyResult
): string {
  const lessons: Record<StrategyType, Record<string, string>> = {
    cooperator: {
      thriving: "Unconditional trust can succeed when the environment rewards cooperation. Idealism isn't naive if the conditions are right.",
      surviving: "Pure cooperation is vulnerable to exploitation, but it builds the strongest foundations when it finds the right partners.",
      struggling: "Trust without wisdom is generosity to those who don't deserve it. Balance openness with discernment.",
      dead: "In a world with too many defectors, unconditional cooperation can be a death sentence. Context matters.",
    },
    defector: {
      thriving: "Short-term exploitation can succeed when there are enough marks. But at what cost to the social fabric?",
      surviving: "Defection is a lonely strategy. You might survive, but you won't truly belong.",
      struggling: "Society eventually isolates those who only take. Reputation is a currency that takes time to recover.",
      dead: "The scorched-earth approach works until it doesn't. Trust is a resource, and some strategies deplete it entirely.",
    },
    reciprocator: {
      thriving: "Tit-for-tat is one of the most robust strategies: it rewards cooperation and punishes defection, creating stable equilibria.",
      surviving: "Matching behavior is fair, but it can lock you into negative spirals with other reciprocators.",
      struggling: "Reciprocity depends on the mix of the population. In defector-heavy environments, it mirrors the worst.",
      dead: "Even fair strategies can fail in hostile environments. The first move matters.",
    },
    cautious: {
      thriving: "Earned trust is the strongest trust. Taking time to verify pays dividends in stable relationships.",
      surviving: "Caution prevents exploitation but can also prevent connection. There's a cost to waiting.",
      struggling: "Too much caution can become isolation. Trust requires some vulnerability.",
      dead: "Walls protect, but they also prevent. Sometimes the risk of trust is worth taking.",
    },
    adaptive: {
      thriving: "Flexibility is power. Reading the environment and adjusting is the meta-strategy.",
      surviving: "Adaptation means never being optimized for any one situation, but surviving most of them.",
      struggling: "When the environment is chaotic, even adaptation struggles. Some situations have no good moves.",
      dead: "Adaptation requires accurate perception. Misjudge the environment, and flexibility becomes flailing.",
    },
    human: {
      thriving: "Human intuition, when applied thoughtfully, can outperform any algorithm. The key is balancing instinct with reflection.",
      surviving: "Humans bring unpredictability that can be both strength and weakness. Survival often comes down to reading situations others can't.",
      struggling: "Being human means embracing uncertainty. Sometimes our intuitions fail, and that's part of the learning.",
      dead: "Human judgment isn't infallible. In complex social dynamics, even our best instincts can lead us astray.",
    },
  };

  return lessons[agent.strategy][status] || "Every journey teaches something. The lesson depends on what you're willing to learn.";
}

// ============================================================================
// Social Sharing Utilities
// ============================================================================

/**
 * Platform-specific sharing options
 */
export type SharePlatform = 'twitter' | 'linkedin' | 'bluesky' | 'clipboard';

/**
 * Shareable content formatted for different platforms
 */
export interface ShareableContent {
  platform: SharePlatform;
  text: string;
  url?: string;
  hashtags?: string[];
  maxLength?: number;
}

/**
 * Generate a shareable summary of a simulation narrative
 * Each platform has different constraints (Twitter: 280 chars, LinkedIn: longer format, etc.)
 */
export function generateShareableContent(
  narrative: SocietyNarrative,
  platform: SharePlatform,
  siteUrl: string = 'https://4-life-ivory.vercel.app/society-simulator'
): ShareableContent {
  switch (platform) {
    case 'twitter':
      return generateTwitterContent(narrative, siteUrl);
    case 'linkedin':
      return generateLinkedInContent(narrative, siteUrl);
    case 'bluesky':
      return generateBlueskyContent(narrative, siteUrl);
    case 'clipboard':
    default:
      return generateClipboardContent(narrative, siteUrl);
  }
}

/**
 * Generate Twitter/X optimized content (280 char limit)
 */
function generateTwitterContent(narrative: SocietyNarrative, siteUrl: string): ShareableContent {
  const hashtags = ['Web4', 'TrustDynamics', 'SimulationTheory'];

  // Build the core message - focus on the hook
  let text = '';

  // Use tagline or create a hook from protagonist/antagonist
  if (narrative.protagonist && narrative.antagonist) {
    text = `${narrative.protagonist.name} vs ${narrative.antagonist.name}: ${narrative.tagline}`;
  } else {
    text = narrative.tagline;
  }

  // Add the moral as a teaser
  const shortMoral = narrative.moralOfTheStory.length > 80
    ? narrative.moralOfTheStory.slice(0, 77) + '...'
    : narrative.moralOfTheStory;

  // Calculate space for URL and hashtags (URL ~23 chars + space, hashtags ~30 chars)
  const urlSpace = 25;
  const hashtagText = ' #' + hashtags.join(' #');
  const maxTextLength = 280 - urlSpace - hashtagText.length - 4; // 4 for "\n\n"

  // Compose final text
  if (text.length > maxTextLength) {
    text = text.slice(0, maxTextLength - 3) + '...';
  }

  const fullText = `${text}\n\n${siteUrl}${hashtagText}`;

  return {
    platform: 'twitter',
    text: fullText,
    url: siteUrl,
    hashtags,
    maxLength: 280,
  };
}

/**
 * Generate LinkedIn optimized content (longer format with professional framing)
 */
function generateLinkedInContent(narrative: SocietyNarrative, siteUrl: string): ShareableContent {
  const lines: string[] = [];

  // Hook with the title
  lines.push(`"${narrative.title}"`);
  lines.push('');

  // Tagline
  lines.push(narrative.tagline);
  lines.push('');

  // Key insight
  lines.push(`Key insight: ${narrative.moralOfTheStory}`);
  lines.push('');

  // Characters highlight
  if (narrative.protagonist) {
    lines.push(`The Hero: ${narrative.protagonist.name} - "${narrative.protagonist.quote}"`);
  }
  if (narrative.antagonist) {
    lines.push(`The Antagonist: ${narrative.antagonist.name} - "${narrative.antagonist.quote}"`);
  }
  lines.push('');

  // Call to action
  lines.push('Watch trust dynamics unfold in real-time:');
  lines.push(siteUrl);
  lines.push('');
  lines.push('#TrustDynamics #EmergentBehavior #ComplexSystems #Web4');

  return {
    platform: 'linkedin',
    text: lines.join('\n'),
    url: siteUrl,
    hashtags: ['TrustDynamics', 'EmergentBehavior', 'ComplexSystems', 'Web4'],
  };
}

/**
 * Generate Bluesky optimized content (300 char limit, no hashtags in text)
 */
function generateBlueskyContent(narrative: SocietyNarrative, siteUrl: string): ShareableContent {
  let text = '';

  // Lead with the hook
  if (narrative.protagonist && narrative.antagonist) {
    text = `${narrative.title}\n\n${narrative.protagonist.name} vs ${narrative.antagonist.name}: Who will build trust, who will burn it?\n\n`;
  } else {
    text = `${narrative.title}\n\n${narrative.tagline}\n\n`;
  }

  // Add moral snippet
  const shortMoral = narrative.moralOfTheStory.length > 60
    ? narrative.moralOfTheStory.slice(0, 57) + '...'
    : narrative.moralOfTheStory;

  text += `Moral: ${shortMoral}`;

  // Ensure we're within limit (leaving room for URL which embeds separately)
  if (text.length > 250) {
    text = text.slice(0, 247) + '...';
  }

  return {
    platform: 'bluesky',
    text,
    url: siteUrl,
    maxLength: 300,
  };
}

/**
 * Generate clipboard-optimized content (full summary for general sharing)
 */
function generateClipboardContent(narrative: SocietyNarrative, siteUrl: string): ShareableContent {
  const lines: string[] = [];

  lines.push(`# ${narrative.title}`);
  lines.push(`*${narrative.tagline}*`);
  lines.push('');
  lines.push(narrative.summary);
  lines.push('');

  if (narrative.protagonist) {
    lines.push(`Hero: ${narrative.protagonist.name} - "${narrative.protagonist.quote}"`);
  }
  if (narrative.antagonist) {
    lines.push(`Antagonist: ${narrative.antagonist.name} - "${narrative.antagonist.quote}"`);
  }
  lines.push('');

  lines.push(`Themes: ${narrative.themes.join(', ')}`);
  lines.push('');
  lines.push(`Moral: ${narrative.moralOfTheStory}`);
  lines.push('');
  lines.push(`Watch the simulation: ${siteUrl}`);
  lines.push('');
  lines.push('---');
  lines.push('Generated by 4-Life Society Simulator');
  lines.push('Where trust shapes the rules of emergence');

  return {
    platform: 'clipboard',
    text: lines.join('\n'),
    url: siteUrl,
  };
}

/**
 * Generate the sharing URL for each platform
 */
export function getShareUrl(content: ShareableContent): string {
  const encodedText = encodeURIComponent(content.text);
  const encodedUrl = content.url ? encodeURIComponent(content.url) : '';

  switch (content.platform) {
    case 'twitter':
      // Twitter's intent URL
      return `https://twitter.com/intent/tweet?text=${encodedText}`;

    case 'linkedin':
      // LinkedIn share URL (text goes in the post composer)
      // Note: LinkedIn's share API is limited, so we use the generic share dialog
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    case 'bluesky':
      // Bluesky intent URL
      return `https://bsky.app/intent/compose?text=${encodedText}`;

    case 'clipboard':
    default:
      // No URL for clipboard - handled separately
      return '';
  }
}

/**
 * Generate a quick tweet-sized summary (for one-click sharing)
 */
export function generateQuickSummary(narrative: SocietyNarrative): string {
  const emojis: Record<string, string> = {
    cooperator: '🤝',
    defector: '🗡️',
    reciprocator: '🔄',
    cautious: '🛡️',
    adaptive: '🧠',
    human: '👤',
  };

  // Create a one-line dramatic summary
  let summary = '';

  if (narrative.protagonist && narrative.antagonist) {
    const heroEmoji = emojis[narrative.protagonist.strategy] || '🦸';
    const villainEmoji = emojis[narrative.antagonist.strategy] || '🦹';
    summary = `${heroEmoji} ${narrative.protagonist.name} faced ${villainEmoji} ${narrative.antagonist.name}. `;
  }

  // Add outcome based on themes (must match identifyThemes() output)
  if (narrative.themes.includes('The Power of Trust') || narrative.themes.includes('The Evolution of Cooperation')) {
    summary += 'Trust won. ';
  } else if (narrative.themes.includes('Consequences of Exploitation')) {
    summary += 'Exploitation met its consequences. ';
  } else if (narrative.themes.includes('Coalition Dynamics')) {
    summary += 'Coalitions decided the outcome. ';
  } else if (narrative.themes.includes('Winners and Losers')) {
    summary += 'Inequality shaped the outcome. ';
  }

  // Add the moral teaser
  const shortMoral = narrative.moralOfTheStory.length > 50
    ? narrative.moralOfTheStory.slice(0, 47) + '...'
    : narrative.moralOfTheStory;
  summary += shortMoral;

  return summary;
}
