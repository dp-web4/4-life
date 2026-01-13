/**
 * Pattern Learning Narratives
 *
 * Generates human-readable stories about EP learning progression. Answers:
 * - How has the agent's knowledge evolved?
 * - What critical moments shaped its learning?
 * - What does it understand well vs poorly?
 * - How would you explain its epistemic journey to a non-technical person?
 *
 * Philosophy: Learning is a story. Pattern accumulation is the plot.
 * Epistemic maturation is character development.
 */

import {
  PatternAnalyzer,
  type PatternCorpus,
  type PatternStatistics,
  type ScenarioAnalysis,
  type InteractionPattern,
} from "./pattern_analyzer";

import {
  PatternCoherenceMapper,
  type PatternCoherenceAnalysis,
} from "./pattern_coherence_bridge";

// ============================================================================
// Narrative Types
// ============================================================================

export interface LearningNarrative {
  title: string;
  summary: string;
  chapters: NarrativeChapter[];
  key_insights: string[];
  maturity_assessment: string;
  human_analogy: string;
}

export interface NarrativeChapter {
  title: string;
  phase: "early" | "middle" | "late";
  pattern_range: [number, number]; // Start and end pattern indices
  key_events: KeyLearningEvent[];
  learning_summary: string;
  coherence_evolution: string;
}

export interface KeyLearningEvent {
  pattern_id: string;
  pattern_index: number;
  event_type: "breakthrough" | "setback" | "confirmation" | "surprise";
  description: string;
  significance: string;
  coherence_context?: string;
}

// ============================================================================
// Pattern Narrative Generator
// ============================================================================

export class PatternNarrativeGenerator {
  private analyzer: PatternAnalyzer;
  private coherenceMapper: PatternCoherenceMapper;
  private corpus: PatternCorpus;

  constructor(corpus: PatternCorpus) {
    this.analyzer = new PatternAnalyzer(corpus);
    this.coherenceMapper = new PatternCoherenceMapper();
    this.corpus = corpus;
  }

  /**
   * Generate complete learning narrative
   */
  generateNarrative(): LearningNarrative {
    const stats = this.analyzer.getStatistics();
    const patterns = this.corpus.patterns;

    // Divide learning into three phases
    const third = Math.floor(patterns.length / 3);
    const chapters: NarrativeChapter[] = [
      this.generateChapter("early", 0, third),
      this.generateChapter("middle", third, third * 2),
      this.generateChapter("late", third * 2, patterns.length),
    ];

    const keyInsights = this.extractKeyInsights(stats);
    const maturityAssessment = this.assessMaturity(stats);
    const humanAnalogy = this.generateHumanAnalogy(stats, chapters);

    return {
      title: this.generateTitle(stats),
      summary: this.generateSummary(stats),
      chapters,
      key_insights: keyInsights,
      maturity_assessment: maturityAssessment,
      human_analogy: humanAnalogy,
    };
  }

  /**
   * Generate narrative for a specific learning phase
   */
  private generateChapter(
    phase: "early" | "middle" | "late",
    start: number,
    end: number
  ): NarrativeChapter {
    const patterns = this.corpus.patterns.slice(start, end);
    if (patterns.length === 0) {
      return {
        title: this.getPhaseTitle(phase),
        phase,
        pattern_range: [start, end],
        key_events: [],
        learning_summary: "No patterns in this phase",
        coherence_evolution: "Unknown",
      };
    }

    const keyEvents = this.identifyKeyEvents(patterns, start);
    const learningSummary = this.summarizePhase(patterns, phase);
    const coherenceEvolution = this.analyzeCoherenceEvolution(patterns);

    return {
      title: this.getPhaseTitle(phase),
      phase,
      pattern_range: [start, end],
      key_events: keyEvents,
      learning_summary: learningSummary,
      coherence_evolution: coherenceEvolution,
    };
  }

  private getPhaseTitle(phase: "early" | "middle" | "late"): string {
    const titles = {
      early: "Foundations: Initial Exploration",
      middle: "Development: Pattern Recognition",
      late: "Maturity: Refined Understanding",
    };
    return titles[phase];
  }

  /**
   * Identify key learning moments in a set of patterns
   */
  private identifyKeyEvents(
    patterns: InteractionPattern[],
    baseIndex: number
  ): KeyLearningEvent[] {
    const events: KeyLearningEvent[] = [];

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      const prevPattern = i > 0 ? patterns[i - 1] : null;

      // Breakthrough: First success after failures
      if (
        pattern.outcome?.success &&
        prevPattern &&
        !prevPattern.outcome?.success
      ) {
        events.push({
          pattern_id: pattern.pattern_id,
          pattern_index: baseIndex + i,
          event_type: "breakthrough",
          description: `Recovered from failure in ${pattern.scenario_type}`,
          significance:
            "Demonstrates ability to learn from mistakes and adapt strategy",
        });
      }

      // Setback: Failure when confidence was high
      const avgConf = this.getPatternConfidence(pattern);
      if (!pattern.outcome?.success && avgConf > 0.7) {
        events.push({
          pattern_id: pattern.pattern_id,
          pattern_index: baseIndex + i,
          event_type: "setback",
          description: `High-confidence prediction failed in ${pattern.scenario_type}`,
          significance:
            "Reveals overconfidence or edge case not yet understood",
        });
      }

      // Surprise: Outcome mismatched predictions
      if (pattern.outcome?.predictions_accurate) {
        const accuracies = Object.values(pattern.outcome.predictions_accurate);
        const incorrectCount = accuracies.filter((a) => !a).length;
        if (incorrectCount >= accuracies.length / 2) {
          events.push({
            pattern_id: pattern.pattern_id,
            pattern_index: baseIndex + i,
            event_type: "surprise",
            description: `Unexpected outcome in ${pattern.scenario_type}`,
            significance:
              "Important learning opportunity - predictions were wrong",
          });
        }
      }

      // Confirmation: High confidence success
      if (pattern.outcome?.success && avgConf > 0.8) {
        events.push({
          pattern_id: pattern.pattern_id,
          pattern_index: baseIndex + i,
          event_type: "confirmation",
          description: `Confidently succeeded in ${pattern.scenario_type}`,
          significance: "Validates learned patterns, reinforces understanding",
        });
      }

      // Add coherence context to first few events
      if (events.length <= 5) {
        const coherenceAnalysis =
          this.coherenceMapper.analyzePattern(pattern);
        events[events.length - 1].coherence_context =
          coherenceAnalysis.learning_interpretation;
      }
    }

    // Sort by significance and take top 5
    const sortOrder = {
      breakthrough: 4,
      setback: 3,
      surprise: 3,
      confirmation: 2,
    };
    events.sort(
      (a, b) =>
        sortOrder[b.event_type] - sortOrder[a.event_type]
    );

    return events.slice(0, 5);
  }

  /**
   * Summarize learning in a phase
   */
  private summarizePhase(
    patterns: InteractionPattern[],
    phase: "early" | "middle" | "late"
  ): string {
    const successCount = patterns.filter((p) => p.outcome?.success).length;
    const successRate = successCount / patterns.length;

    const avgConf =
      patterns.reduce((sum, p) => sum + this.getPatternConfidence(p), 0) /
      patterns.length;

    let summary = "";

    if (phase === "early") {
      summary = `In the early phase (${patterns.length} patterns), the agent was exploring and establishing baseline knowledge. `;

      if (successRate < 0.4) {
        summary +=
          "Performance was low, as expected during initial exploration. Many failures provided valuable learning data. ";
      } else if (successRate > 0.6) {
        summary +=
          "Surprisingly high early success suggests good initial heuristics or favorable conditions. ";
      } else {
        summary +=
          "Mixed results show the agent testing boundaries and discovering what works. ";
      }

      if (avgConf < 0.5) {
        summary +=
          "Low confidence reflects appropriate epistemic humility - the agent knows it doesn't know yet.";
      }
    } else if (phase === "middle") {
      summary = `In the development phase (${patterns.length} patterns), the agent began recognizing patterns and building reliable predictions. `;

      if (successRate > 0.6) {
        summary +=
          "Performance improved significantly, demonstrating effective pattern learning. ";
      } else {
        summary +=
          "Performance remained challenging, suggesting complex scenarios or insufficient pattern coverage. ";
      }

      if (avgConf > 0.6) {
        summary +=
          "Rising confidence indicates the agent is discovering reliable patterns.";
      } else {
        summary +=
          "Confidence remains moderate, suggesting continued uncertainty about edge cases.";
      }
    } else {
      // late
      summary = `In the maturity phase (${patterns.length} patterns), the agent refined its understanding and handled diverse scenarios. `;

      if (successRate > 0.7) {
        summary +=
          "High performance demonstrates mature epistemic capabilities. The agent reliably predicts outcomes. ";
      } else if (successRate > 0.5) {
        summary +=
          "Solid performance shows competence, though room for improvement remains. ";
      } else {
        summary +=
          "Continued challenges suggest either very difficult scenarios or gaps in the pattern corpus. ";
      }

      if (avgConf > 0.7) {
        summary +=
          "High confidence backed by performance indicates true epistemic maturity - the agent knows what it knows.";
      }
    }

    return summary;
  }

  /**
   * Analyze how coherence evolved in a phase
   */
  private analyzeCoherenceEvolution(patterns: InteractionPattern[]): string {
    if (patterns.length < 3) return "Insufficient data for coherence analysis";

    // Sample beginning and end
    const earlyPatterns = patterns.slice(0, Math.min(5, patterns.length));
    const latePatterns = patterns.slice(-Math.min(5, patterns.length));

    const earlyCoherence =
      earlyPatterns.reduce((sum, p) => {
        const analysis = this.coherenceMapper.analyzePattern(p);
        return sum + analysis.overall_coherence;
      }, 0) / earlyPatterns.length;

    const lateCoherence =
      latePatterns.reduce((sum, p) => {
        const analysis = this.coherenceMapper.analyzePattern(p);
        return sum + analysis.overall_coherence;
      }, 0) / latePatterns.length;

    const change = lateCoherence - earlyCoherence;

    let evolution = `Coherence evolved from ${(earlyCoherence * 100).toFixed(0)}% to ${(lateCoherence * 100).toFixed(0)}% `;

    if (change > 0.1) {
      evolution +=
        "(+significant increase). The agent's epistemic state became more ordered - lower entropy, higher confidence, better calibration.";
    } else if (change < -0.1) {
      evolution +=
        "(-significant decrease). The agent encountered harder scenarios or pattern corpus degraded. More exploration needed.";
    } else {
      evolution +=
        "(~stable). Coherence remained consistent, suggesting this phase consolidated existing knowledge rather than acquiring fundamentally new understanding.";
    }

    return evolution;
  }

  /**
   * Generate overall narrative title
   */
  private generateTitle(stats: PatternStatistics): string {
    const improvement = stats.learning_improvement;

    if (improvement > 0.2) {
      return "A Journey of Rapid Learning: From Exploration to Mastery";
    } else if (improvement > 0.05) {
      return "Steady Progress: Building Epistemic Capability";
    } else if (improvement < -0.05) {
      return "Persistent Challenge: Learning in Complexity";
    } else {
      return "Pattern Recognition: An Epistemic Development Story";
    }
  }

  /**
   * Generate executive summary
   */
  private generateSummary(stats: PatternStatistics): string {
    const { total_patterns, average_success_rate, learning_improvement } =
      stats;

    let summary = `This corpus documents the epistemic development of an agent over ${total_patterns} interaction patterns. `;

    if (average_success_rate > 0.7) {
      summary += "The agent achieved high overall performance, ";
    } else if (average_success_rate > 0.5) {
      summary += "The agent demonstrated competent performance, ";
    } else {
      summary += "The agent faced significant challenges, ";
    }

    if (learning_improvement > 0.1) {
      summary +=
        "with strong evidence of learning and improvement over time. ";
    } else if (learning_improvement > 0) {
      summary += "with modest improvement over time. ";
    } else {
      summary +=
        "with no clear improvement trajectory (possibly due to increasing difficulty). ";
    }

    summary += `The agent covered ${stats.scenarios_covered.length} distinct scenario types across ${stats.domains_present.length} epistemic domains, demonstrating breadth of experience.`;

    return summary;
  }

  /**
   * Extract key insights from the learning journey
   */
  private extractKeyInsights(stats: PatternStatistics): string[] {
    const insights: string[] = [];

    // Learning velocity
    if (stats.learning_improvement > 0.15) {
      insights.push(
        "Strong learning velocity: Agent rapidly improved its predictions"
      );
    } else if (stats.learning_improvement < -0.05) {
      insights.push(
        "Negative learning trajectory: Later scenarios were harder or pattern quality decreased"
      );
    }

    // Confidence calibration
    if (
      Math.abs(stats.average_confidence - stats.average_success_rate) < 0.1
    ) {
      insights.push(
        "Well-calibrated confidence: Agent's self-assessment matches actual performance"
      );
    } else if (stats.average_confidence > stats.average_success_rate + 0.2) {
      insights.push(
        "Overconfident: Agent's confidence exceeds actual performance (Dunning-Kruger effect?)"
      );
    } else {
      insights.push(
        "Underconfident: Agent performs better than its confidence suggests (imposter syndrome?)"
      );
    }

    // Decision strategy
    const totalDecisions =
      stats.proceed_count + stats.adjust_count + stats.defer_count;
    if (stats.proceed_count / totalDecisions > 0.6) {
      insights.push(
        "Aggressive strategy: Agent prefers to proceed despite risks"
      );
    } else if (stats.defer_count / totalDecisions > 0.3) {
      insights.push(
        "Conservative strategy: Agent frequently defers in uncertain situations"
      );
    }

    // Risk management
    if (stats.cascade_detections > stats.total_patterns * 0.2) {
      insights.push(
        "High cascade awareness: Agent frequently detects potential cascade risks"
      );
    }

    // Domain coverage
    if (stats.domains_present.length >= 4) {
      insights.push(
        `Multi-domain learning: Agent integrates ${stats.domains_present.length} distinct epistemic perspectives`
      );
    }

    return insights;
  }

  /**
   * Assess overall maturity level
   */
  private assessMaturity(stats: PatternStatistics): string {
    const { average_success_rate, learning_improvement, average_confidence } =
      stats;

    // Maturity = performance + improvement + calibration
    const calibration =
      1 - Math.abs(average_confidence - average_success_rate);
    const maturityScore =
      0.4 * average_success_rate +
      0.3 * Math.max(0, learning_improvement) +
      0.3 * calibration;

    if (maturityScore > 0.7) {
      return "MATURE: The agent demonstrates reliable pattern recognition, continuous learning, and well-calibrated confidence. It has achieved epistemic proprioception - it knows what it knows and what it doesn't.";
    } else if (maturityScore > 0.5) {
      return "DEVELOPING: The agent shows competence but has room for improvement. It recognizes some patterns reliably but struggles with edge cases. Continued learning will refine its epistemic capabilities.";
    } else if (maturityScore > 0.3) {
      return "IMMATURE: The agent is still in early learning phase. Performance is inconsistent, confidence is poorly calibrated, or scenarios are particularly challenging. More experience needed.";
    } else {
      return "NASCENT: The agent has minimal pattern recognition capability. Either very early in learning, facing exceptionally difficult scenarios, or the pattern corpus quality is low.";
    }
  }

  /**
   * Generate human analogy for the learning journey
   */
  private generateHumanAnalogy(
    stats: PatternStatistics,
    chapters: NarrativeChapter[]
  ): string {
    const earlySuccess = chapters[0]
      ? this.getChapterSuccessRate(chapters[0])
      : 0;
    const lateSuccess = chapters[2]
      ? this.getChapterSuccessRate(chapters[2])
      : 0;

    let analogy = "This learning journey is like ";

    if (lateSuccess > earlySuccess + 0.2) {
      analogy +=
        "a student mastering a difficult subject - starting confused, gradually recognizing patterns, eventually developing intuition. ";
    } else if (lateSuccess < earlySuccess - 0.1) {
      analogy +=
        "an expert encountering increasingly difficult problems - early confidence giving way to humility as complexity increases. ";
    } else {
      analogy +=
        "a professional refining their craft - already competent, making incremental improvements through experience. ";
    }

    if (stats.average_confidence < 0.5) {
      analogy +=
        "The agent approaches situations with appropriate caution, like someone aware of their knowledge gaps. ";
    } else if (stats.average_confidence > 0.7) {
      analogy +=
        "The agent operates with confidence, like an experienced practitioner trusting their intuition. ";
    }

    if (stats.cascade_detections > stats.total_patterns * 0.2) {
      analogy +=
        "It demonstrates systems thinking - recognizing how decisions cascade through multiple domains, like an engineer considering second-order effects.";
    }

    return analogy;
  }

  /**
   * Get success rate for a chapter
   */
  private getChapterSuccessRate(chapter: NarrativeChapter): number {
    const [start, end] = chapter.pattern_range;
    const patterns = this.corpus.patterns.slice(start, end);
    const successCount = patterns.filter((p) => p.outcome?.success).length;
    return patterns.length > 0 ? successCount / patterns.length : 0;
  }

  /**
   * Get average confidence for a pattern
   */
  private getPatternConfidence(pattern: InteractionPattern): number {
    const predictions = Object.values(pattern.ep_predictions);
    if (predictions.length === 0) return 0;

    const sum = predictions.reduce(
      (acc, pred) => acc + (pred?.confidence || 0),
      0
    );
    return sum / predictions.length;
  }
}
