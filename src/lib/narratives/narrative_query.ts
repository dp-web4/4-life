/**
 * Narrative Query System
 *
 * Prototype for ACT-style conversational interface to narratives.
 * Enables natural language queries about simulation events and patterns.
 *
 * This is a PROTOTYPE demonstrating the concept. Full ACT integration
 * would use the actual ACT deployment from web4/web4-standard/implementation/act_deployment/
 */

import type { Narrative, NarrativeAct, NarrativeEvent } from './story_generator';
import type { SimulationEvent, EventType } from './event_detector';
import { EventSeverity } from './event_detector';

/**
 * Query types that can be asked about narratives
 */
export enum QueryType {
  WHY = 'why',                    // "Why did trust collapse?"
  WHAT = 'what',                  // "What happened in life 2?"
  WHEN = 'when',                  // "When did trust cross 0.5?"
  HOW = 'how',                    // "How did the agent learn?"
  COMPARE = 'compare',            // "Compare life 1 and life 2"
  PATTERN = 'pattern',            // "Show me all trust spikes"
  INSIGHT = 'insight',            // "What did the agent learn?"
  SUMMARY = 'summary',            // "Summarize this simulation"
}

/**
 * Query intent detected from natural language
 */
export interface QueryIntent {
  type: QueryType;
  target?: string;                // What is being asked about (e.g., "trust", "ATP")
  timeframe?: string;             // When (e.g., "life 2", "tick 40")
  comparison?: string[];          // For comparison queries
}

/**
 * Query response
 */
export interface QueryResponse {
  answer: string;
  relevantEvents?: NarrativeEvent[];
  confidence: number;             // 0-1 confidence in answer
  followUp?: string[];            // Suggested follow-up questions
}

/**
 * NarrativeQueryEngine
 *
 * Processes natural language queries about narratives
 */
export class NarrativeQueryEngine {
  private narrative: Narrative;
  private events: SimulationEvent[];

  constructor(narrative: Narrative, events: SimulationEvent[]) {
    this.narrative = narrative;
    this.events = events;
  }

  /**
   * Process a natural language query
   */
  query(question: string): QueryResponse {
    const intent = this.detectIntent(question);

    switch (intent.type) {
      case QueryType.WHY:
        return this.answerWhy(intent, question);
      case QueryType.WHAT:
        return this.answerWhat(intent, question);
      case QueryType.WHEN:
        return this.answerWhen(intent, question);
      case QueryType.HOW:
        return this.answerHow(intent, question);
      case QueryType.COMPARE:
        return this.answerCompare(intent, question);
      case QueryType.PATTERN:
        return this.answerPattern(intent, question);
      case QueryType.INSIGHT:
        return this.answerInsight(intent, question);
      case QueryType.SUMMARY:
        return this.answerSummary(intent, question);
      default:
        return {
          answer: "I'm not sure how to answer that. Try asking about specific events, patterns, or insights from the simulation.",
          confidence: 0.3,
          followUp: [
            "Why did trust change?",
            "What happened in life 1?",
            "Show me all trust spikes",
            "Summarize this simulation"
          ]
        };
    }
  }

  /**
   * Detect query intent from natural language
   */
  private detectIntent(question: string): QueryIntent {
    const lower = question.toLowerCase();

    // WHY queries
    if (lower.includes('why') || lower.includes('reason') || lower.includes('cause')) {
      let target = 'unknown';
      if (lower.includes('trust')) target = 'trust';
      if (lower.includes('atp') || lower.includes('attention')) target = 'atp';
      if (lower.includes('die') || lower.includes('death')) target = 'death';
      return { type: QueryType.WHY, target };
    }

    // WHEN queries
    if (lower.includes('when') || lower.includes('at what')) {
      let target = 'unknown';
      if (lower.includes('trust')) target = 'trust';
      if (lower.includes('0.5') || lower.includes('threshold')) target = 'threshold';
      return { type: QueryType.WHEN, target };
    }

    // WHAT queries
    if (lower.includes('what happened') || lower.includes('what occur')) {
      let timeframe;
      const lifeMatch = lower.match(/life (\d+)/);
      if (lifeMatch) timeframe = `life ${lifeMatch[1]}`;
      return { type: QueryType.WHAT, timeframe };
    }

    // HOW queries
    if (lower.includes('how did') || lower.includes('how does')) {
      let target = 'unknown';
      if (lower.includes('learn')) target = 'learning';
      if (lower.includes('improve')) target = 'improvement';
      if (lower.includes('trust')) target = 'trust';
      return { type: QueryType.HOW, target };
    }

    // COMPARE queries
    if (lower.includes('compare') || lower.includes('difference') || lower.includes('versus')) {
      const lives = lower.match(/life (\d+)/g);
      const comparison = lives || ['life 1', 'life 2'];
      return { type: QueryType.COMPARE, comparison };
    }

    // PATTERN queries
    if (lower.includes('show me') || lower.includes('find all') || lower.includes('list')) {
      let target = 'events';
      if (lower.includes('spike')) target = 'spikes';
      if (lower.includes('collapse')) target = 'collapses';
      if (lower.includes('crisis') || lower.includes('crises')) target = 'crises';
      return { type: QueryType.PATTERN, target };
    }

    // INSIGHT queries
    if (lower.includes('learn') || lower.includes('insight') || lower.includes('discover')) {
      return { type: QueryType.INSIGHT };
    }

    // SUMMARY queries
    if (lower.includes('summar') || lower.includes('overview') || lower.includes('in brief')) {
      return { type: QueryType.SUMMARY };
    }

    // Default to WHAT
    return { type: QueryType.WHAT };
  }

  /**
   * Answer WHY questions
   */
  private answerWhy(intent: QueryIntent, question: string): QueryResponse {
    const lower = question.toLowerCase();

    // Why did trust collapse?
    if (lower.includes('collapse') || lower.includes('drop') || lower.includes('decrease')) {
      const collapseEvents = this.events.filter(e =>
        e.type.toString().includes('COLLAPSE') ||
        e.description.toLowerCase().includes('collapse')
      );

      if (collapseEvents.length > 0) {
        const event = collapseEvents[0];
        return {
          answer: `Trust collapsed due to ${event.description}. In Web4, trust is hard to build and easy to lose - a single breach of expectations can cause significant drops. This illustrates the fragility of trust and the importance of consistent behavior.`,
          relevantEvents: this.getRelevantNarrativeEvents([event]),
          confidence: 0.9,
          followUp: [
            "How can trust be rebuilt?",
            "What happened after the collapse?",
            "Show me all trust collapses"
          ]
        };
      }
    }

    // Why did trust increase?
    if (lower.includes('increase') || lower.includes('grow') || lower.includes('improve')) {
      return {
        answer: `Trust increased through consistent behavior over time. In Web4, trust is earned gradually by repeatedly meeting expectations. Each successful action builds upon previous ones, creating a positive feedback loop that compounds trust growth.`,
        confidence: 0.8,
        followUp: [
          "How long does it take to build trust?",
          "What actions build trust fastest?",
          "Show me trust growth patterns"
        ]
      };
    }

    // Generic WHY
    return {
      answer: `The simulation shows ${this.narrative.acts.length} life cycles with various trust dynamics. Trust changes are driven by the agent's actions and consistency. Key factors include: ATP management, action choices, and behavioral patterns across lives.`,
      confidence: 0.6,
      followUp: [
        "What were the key events?",
        "How did trust evolve?",
        "Show me the agent's strategy"
      ]
    };
  }

  /**
   * Answer WHAT questions
   */
  private answerWhat(intent: QueryIntent, question: string): QueryResponse {
    if (intent.timeframe) {
      const lifeNum = parseInt(intent.timeframe.match(/\d+/)?.[0] || '1');
      const act = this.narrative.acts[lifeNum - 1];

      if (act) {
        const eventSummary = act.events.map(e => `• ${e.description.split('.')[0]}`).join('\n');
        return {
          answer: `In ${act.title}:\n\n${eventSummary}\n\n${act.commentary || 'This life showed significant trust dynamics.'}`,
          relevantEvents: act.events,
          confidence: 0.95,
          followUp: [
            `Why did these events occur?`,
            `Compare this to other lives`,
            `What was learned?`
          ]
        };
      }
    }

    // General WHAT
    const eventCount = this.events.length;
    const majorEvents = this.events.filter(e =>
      e.severity === EventSeverity.CRITICAL || e.severity === EventSeverity.HIGH
    ).length;

    return {
      answer: `This simulation spans ${this.narrative.acts.length} lives with ${eventCount} detected events (${majorEvents} major). Key themes: ${this.narrative.themes.join(', ')}. ${this.narrative.summary}`,
      confidence: 0.8,
      followUp: [
        "What were the major events?",
        "What did the agent learn?",
        "How did trust evolve?"
      ]
    };
  }

  /**
   * Answer WHEN questions
   */
  private answerWhen(intent: QueryIntent, question: string): QueryResponse {
    const lower = question.toLowerCase();

    // When did trust cross threshold?
    if (lower.includes('threshold') || lower.includes('0.5')) {
      const thresholdEvents = this.events.filter(e =>
        e.type.toString().includes('THRESHOLD') ||
        e.description.includes('0.5') ||
        e.description.includes('threshold')
      );

      if (thresholdEvents.length > 0) {
        const timings = thresholdEvents.map(e =>
          `Life ${e.life_number}, Tick ${e.tick}`
        ).join('; ');

        return {
          answer: `Trust crossed the trust threshold (0.5) at: ${timings}. This threshold marks the emergence of coherent agency - where behavior transitions from random to intentional.`,
          relevantEvents: this.getRelevantNarrativeEvents(thresholdEvents),
          confidence: 0.95,
          followUp: [
            "What is the trust threshold?",
            "What happened after crossing?",
            "Why is 0.5 significant?"
          ]
        };
      }
    }

    return {
      answer: `The simulation contains ${this.events.length} detected events across ${this.narrative.acts.length} lives. Use 'Show me all [event type]' to see specific timing patterns.`,
      confidence: 0.6,
      followUp: [
        "Show me all trust spikes",
        "What happened in life 1?",
        "When did major events occur?"
      ]
    };
  }

  /**
   * Answer HOW questions
   */
  private answerHow(intent: QueryIntent, question: string): QueryResponse {
    if (intent.target === 'learning') {
      return {
        answer: `The agent learns through cross-life learning (EP) - meta-cognition that improves across lives. EP discovers which behaviors lead to success by pattern matching across previous experiences. When reborn, the agent carries forward karma that reflects learned patterns, enabling gradual improvement in trust and survival.`,
        confidence: 0.9,
        followUp: [
          "What is cross-life learning?",
          "Show me maturation events",
          "How does karma work?"
        ]
      };
    }

    if (intent.target === 'trust') {
      return {
        answer: `Trust evolves through consistent behavior over time. Each action affects trust based on: 1) Expectation alignment (did behavior match predictions?), 2) Outcome quality (was it beneficial?), 3) Consistency (does it match past behavior?). Trust compounds - small consistent actions build trust faster than occasional big wins.`,
        confidence: 0.85,
        followUp: [
          "What builds trust fastest?",
          "Show me trust evolution",
          "Why does trust collapse?"
        ]
      };
    }

    return {
      answer: `Web4 simulations model society-scale trust dynamics. Agents manage ATP (attention budget), build trust through consistent actions, learn from experience via cross-life learning (EP), and carry consequences across lives through karma. The system demonstrates emergence of coherent behavior from simple rules.`,
      confidence: 0.7,
      followUp: [
        "How does ATP work?",
        "How does karma work?",
        "What is cross-life learning?"
      ]
    };
  }

  /**
   * Answer COMPARE questions
   */
  private answerCompare(intent: QueryIntent, question: string): QueryResponse {
    if (intent.comparison && intent.comparison.length >= 2) {
      const life1 = parseInt(intent.comparison[0].match(/\d+/)?.[0] || '1') - 1;
      const life2 = parseInt(intent.comparison[1].match(/\d+/)?.[0] || '2') - 1;

      const act1 = this.narrative.acts[life1];
      const act2 = this.narrative.acts[life2];

      if (act1 && act2) {
        return {
          answer: `Comparing ${act1.title} vs ${act2.title}:\n\n` +
            `Life ${life1 + 1}: ${act1.events.length} events\n` +
            `Life ${life2 + 1}: ${act2.events.length} events\n\n` +
            `The key difference: ${this.detectDifference(act1, act2)}`,
          confidence: 0.85,
          followUp: [
            `Why did life ${life2 + 1} differ?`,
            `What was learned between lives?`,
            `Compare all lives`
          ]
        };
      }
    }

    return {
      answer: `The agent lived ${this.narrative.acts.length} lives. Each showed different patterns based on learned behaviors and environmental changes. Use 'Compare life X and life Y' for specific comparisons.`,
      confidence: 0.6,
      followUp: [
        "Compare life 1 and life 2",
        "What changed across lives?",
        "Show me all lives"
      ]
    };
  }

  /**
   * Answer PATTERN questions
   */
  private answerPattern(intent: QueryIntent, question: string): QueryResponse {
    const targetType = intent.target || 'events';

    const filtered = this.events.filter(e => {
      const typeStr = e.type.toString().toLowerCase();
      return typeStr.includes(targetType);
    });

    if (filtered.length > 0) {
      const list = filtered.map(e =>
        `• Life ${e.life_number}, Tick ${e.tick}: ${e.description.split('.')[0]}`
      ).join('\n');

      return {
        answer: `Found ${filtered.length} ${targetType}:\n\n${list}`,
        relevantEvents: this.getRelevantNarrativeEvents(filtered),
        confidence: 0.9,
        followUp: [
          `Why did ${targetType} occur?`,
          `Show me other patterns`,
          `What's the significance?`
        ]
      };
    }

    return {
      answer: `No ${targetType} detected. The simulation has ${this.events.length} total events. Try: 'Show me all trust spikes', 'Show me all crises', or 'Show me all maturation events'.`,
      confidence: 0.5,
      followUp: [
        "Show me all events",
        "What are the major patterns?",
        "Summarize this simulation"
      ]
    };
  }

  /**
   * Answer INSIGHT questions
   */
  private answerInsight(intent: QueryIntent, question: string): QueryResponse {
    return {
      answer: `Key insights from this simulation:\n\n${this.narrative.key_insights.map(i => `• ${i}`).join('\n')}\n\nThese patterns demonstrate ${this.narrative.themes.join(' and ')}.`,
      confidence: 0.95,
      followUp: [
        "Why are these insights significant?",
        "How can I apply these patterns?",
        "What other patterns exist?"
      ]
    };
  }

  /**
   * Answer SUMMARY questions
   */
  private answerSummary(intent: QueryIntent, question: string): QueryResponse {
    return {
      answer: this.narrative.summary,
      confidence: 1.0,
      followUp: [
        "What were the key events?",
        "What did the agent learn?",
        "Show me trust evolution"
      ]
    };
  }

  /**
   * Helper: Detect difference between two acts
   */
  private detectDifference(act1: NarrativeAct, act2: NarrativeAct): string {
    if (act1.events.length > act2.events.length) {
      return `Life 1 had more events (${act1.events.length} vs ${act2.events.length}), suggesting more volatile dynamics.`;
    } else if (act2.events.length > act1.events.length) {
      return `Life 2 had more events (${act2.events.length} vs ${act1.events.length}), suggesting increased complexity or volatility.`;
    } else {
      return `Both lives had similar event counts (${act1.events.length}), but different patterns emerged.`;
    }
  }

  /**
   * Helper: Get narrative events corresponding to simulation events
   */
  private getRelevantNarrativeEvents(simEvents: SimulationEvent[]): NarrativeEvent[] {
    const relevant: NarrativeEvent[] = [];

    simEvents.forEach(simEvent => {
      if (!simEvent.life_number) return;
      const lifeIndex = simEvent.life_number - 1;
      if (this.narrative.acts[lifeIndex]) {
        // Find events near this tick
        const act = this.narrative.acts[lifeIndex];
        act.events.forEach(narrativeEvent => {
          if (narrativeEvent.timestamp.includes(`Tick ${simEvent.tick}`)) {
            relevant.push(narrativeEvent);
          }
        });
      }
    });

    return relevant;
  }
}

/**
 * Suggested questions for users
 */
export const SUGGESTED_QUERIES = [
  "Why did trust collapse?",
  "What happened in life 2?",
  "When did trust cross 0.5?",
  "How did the agent learn?",
  "Compare life 1 and life 2",
  "Show me all trust spikes",
  "What did the agent learn?",
  "Summarize this simulation",
  "What is the trust threshold?",
  "How does karma work?",
  "Show me all ATP crises",
  "What are the major patterns?"
];
