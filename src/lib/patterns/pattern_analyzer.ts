/**
 * Pattern Corpus Analysis for 4-Life
 *
 * This module analyzes EP (Epistemic Proprioception) pattern learning to make
 * it comprehensible to humans. It answers questions like:
 * - What has the agent learned?
 * - How reliable are the patterns?
 * - How does learning evolve across generations?
 * - What scenarios is the agent best/worst at handling?
 *
 * Philosophy: Pattern learning is the visible evidence of meta-cognition.
 * An agent that learns what works and doesn't is demonstrating epistemic
 * proprioception - knowing what it knows.
 */

// ============================================================================
// Types (matching Web4 game/ep_driven_policy.py structure)
// ============================================================================

export interface PatternCorpus {
  patterns: InteractionPattern[];
  metadata?: {
    created_at?: string;
    total_patterns?: number;
    domains_covered?: string[];
    source?: string;
  };
}

export interface InteractionPattern {
  pattern_id: string;
  scenario_type: string;
  scenario_description: string;
  timestamp: string;
  context: PatternContext;
  ep_predictions: EPPredictions;
  coordinated_decision: CoordinatedDecision;
  outcome: PatternOutcome;
}

export interface PatternContext {
  emotional?: DomainContext;
  quality?: DomainContext;
  attention?: DomainContext;
  grounding?: DomainContext;
  authorization?: DomainContext;
}

export interface DomainContext {
  [key: string]: number | string | boolean;
}

export interface EPPredictions {
  emotional?: DomainPrediction;
  quality?: DomainPrediction;
  attention?: DomainPrediction;
  grounding?: DomainPrediction;
  authorization?: DomainPrediction;
}

export interface DomainPrediction {
  domain: string;
  outcome_probability: number; // 0-1
  confidence: number; // 0-1
  severity: number; // 0-1
  risk: number; // 0-1
  recommended_action: string; // "proceed", "adjust", "defer"
  reasoning?: string;
}

export interface CoordinatedDecision {
  decision: string; // "proceed", "adjust", "defer"
  consensus_strength: number; // 0-1
  disagreement_detected: boolean;
  cascade_risk: number; // 0-1
}

export interface PatternOutcome {
  success: boolean;
  atp_consumed: number;
  t3_change: number;
  predictions_accurate: {
    emotional?: boolean;
    quality?: boolean;
    attention?: boolean;
    grounding?: boolean;
    authorization?: boolean;
  };
}

// ============================================================================
// Analysis Results
// ============================================================================

export interface PatternStatistics {
  total_patterns: number;
  domains_present: string[];
  scenarios_covered: string[];

  // Quality metrics
  average_confidence: number;
  average_success_rate: number;
  prediction_accuracy: number;

  // Learning progression
  early_success_rate: number; // First 25%
  late_success_rate: number; // Last 25%
  learning_improvement: number; // Difference

  // Decision distribution
  proceed_count: number;
  adjust_count: number;
  defer_count: number;

  // Risk analysis
  high_risk_patterns: number;
  cascade_detections: number;
}

export interface ScenarioAnalysis {
  scenario_type: string;
  count: number;
  success_rate: number;
  average_confidence: number;
  typical_decision: string;
  risk_level: "low" | "medium" | "high";
}

export interface DomainAnalysis {
  domain: string;
  pattern_count: number;
  average_confidence: number;
  prediction_accuracy: number;
  typical_recommendation: string;
}

export interface LearningTrajectory {
  // Temporal progression of learning quality
  time_points: number[]; // Pattern indices
  confidence_over_time: number[];
  accuracy_over_time: number[];
  success_rate_over_time: number[];
}

// ============================================================================
// Pattern Analyzer
// ============================================================================

export class PatternAnalyzer {
  private patterns: InteractionPattern[];

  constructor(corpus: PatternCorpus) {
    this.patterns = corpus.patterns || [];
  }

  /**
   * Get overall pattern corpus statistics
   */
  getStatistics(): PatternStatistics {
    if (this.patterns.length === 0) {
      return this.emptyStatistics();
    }

    // Collect domain presence
    const domainsSet = new Set<string>();
    const scenariosSet = new Set<string>();
    let totalConfidence = 0;
    let totalSuccess = 0;
    let totalAccurate = 0;
    let totalPredictions = 0;

    let proceedCount = 0;
    let adjustCount = 0;
    let deferCount = 0;

    let highRiskCount = 0;
    let cascadeCount = 0;

    for (const pattern of this.patterns) {
      // Domains and scenarios
      scenariosSet.add(pattern.scenario_type);
      Object.keys(pattern.ep_predictions).forEach((d) => domainsSet.add(d));

      // Success rate
      if (pattern.outcome?.success) totalSuccess++;

      // Confidence and accuracy
      const predictions = Object.values(pattern.ep_predictions);
      for (const pred of predictions) {
        if (pred && typeof pred.confidence === "number") {
          totalConfidence += pred.confidence;
          totalPredictions++;
        }
      }

      // Prediction accuracy
      if (pattern.outcome?.predictions_accurate) {
        const accuracies = Object.values(pattern.outcome.predictions_accurate);
        const accurateCount = accuracies.filter((a) => a === true).length;
        totalAccurate += accurateCount / accuracies.length;
      }

      // Decisions
      const decision = pattern.coordinated_decision?.decision;
      if (decision === "proceed") proceedCount++;
      else if (decision === "adjust") adjustCount++;
      else if (decision === "defer") deferCount++;

      // Risk
      if (pattern.coordinated_decision?.cascade_risk > 0.5) cascadeCount++;
      const avgRisk = this.getAverageRisk(pattern);
      if (avgRisk > 0.6) highRiskCount++;
    }

    // Learning progression (first 25% vs last 25%)
    const quarterSize = Math.floor(this.patterns.length / 4);
    const earlyPatterns = this.patterns.slice(0, quarterSize);
    const latePatterns = this.patterns.slice(-quarterSize);

    const earlySuccessRate =
      earlyPatterns.filter((p) => p.outcome?.success).length / earlyPatterns.length;
    const lateSuccessRate =
      latePatterns.filter((p) => p.outcome?.success).length / latePatterns.length;

    return {
      total_patterns: this.patterns.length,
      domains_present: Array.from(domainsSet),
      scenarios_covered: Array.from(scenariosSet),

      average_confidence:
        totalPredictions > 0 ? totalConfidence / totalPredictions : 0,
      average_success_rate: totalSuccess / this.patterns.length,
      prediction_accuracy:
        totalPredictions > 0 ? totalAccurate / this.patterns.length : 0,

      early_success_rate: earlySuccessRate,
      late_success_rate: lateSuccessRate,
      learning_improvement: lateSuccessRate - earlySuccessRate,

      proceed_count: proceedCount,
      adjust_count: adjustCount,
      defer_count: deferCount,

      high_risk_patterns: highRiskCount,
      cascade_detections: cascadeCount,
    };
  }

  /**
   * Analyze patterns by scenario type
   */
  analyzeScenarios(): ScenarioAnalysis[] {
    const scenarioGroups = this.groupByScenario();
    const analyses: ScenarioAnalysis[] = [];

    for (const [scenarioType, patterns] of Object.entries(scenarioGroups)) {
      const successCount = patterns.filter((p) => p.outcome?.success).length;
      const successRate = successCount / patterns.length;

      const avgConfidence = this.getAverageConfidenceForPatterns(patterns);
      const typicalDecision = this.getMostCommonDecision(patterns);
      const avgRisk = this.getAverageRiskForPatterns(patterns);

      analyses.push({
        scenario_type: scenarioType,
        count: patterns.length,
        success_rate: successRate,
        average_confidence: avgConfidence,
        typical_decision: typicalDecision,
        risk_level:
          avgRisk > 0.6 ? "high" : avgRisk > 0.3 ? "medium" : "low",
      });
    }

    // Sort by count descending
    analyses.sort((a, b) => b.count - a.count);
    return analyses;
  }

  /**
   * Analyze patterns by EP domain
   */
  analyzeDomains(): DomainAnalysis[] {
    const domainStats: Record<
      string,
      {
        count: number;
        totalConfidence: number;
        accurateCount: number;
        recommendations: Record<string, number>;
      }
    > = {};

    for (const pattern of this.patterns) {
      for (const [domain, prediction] of Object.entries(pattern.ep_predictions)) {
        if (!domainStats[domain]) {
          domainStats[domain] = {
            count: 0,
            totalConfidence: 0,
            accurateCount: 0,
            recommendations: {},
          };
        }

        const stats = domainStats[domain];
        stats.count++;

        if (prediction && typeof prediction.confidence === "number") {
          stats.totalConfidence += prediction.confidence;
        }

        if (
          pattern.outcome?.predictions_accurate &&
          pattern.outcome.predictions_accurate[domain as keyof typeof pattern.outcome.predictions_accurate]
        ) {
          stats.accurateCount++;
        }

        if (prediction?.recommended_action) {
          const action = prediction.recommended_action;
          stats.recommendations[action] = (stats.recommendations[action] || 0) + 1;
        }
      }
    }

    const analyses: DomainAnalysis[] = [];
    for (const [domain, stats] of Object.entries(domainStats)) {
      const typicalRecommendation = this.getMostCommonKey(stats.recommendations);
      analyses.push({
        domain,
        pattern_count: stats.count,
        average_confidence: stats.totalConfidence / stats.count,
        prediction_accuracy: stats.accurateCount / stats.count,
        typical_recommendation: typicalRecommendation,
      });
    }

    return analyses;
  }

  /**
   * Get learning trajectory over time
   */
  getLearningTrajectory(windowSize: number = 10): LearningTrajectory {
    const timePoints: number[] = [];
    const confidenceOverTime: number[] = [];
    const accuracyOverTime: number[] = [];
    const successRateOverTime: number[] = [];

    for (let i = 0; i < this.patterns.length; i += windowSize) {
      const window = this.patterns.slice(i, i + windowSize);
      if (window.length === 0) continue;

      timePoints.push(i);

      // Average confidence in window
      const avgConfidence = this.getAverageConfidenceForPatterns(window);
      confidenceOverTime.push(avgConfidence);

      // Accuracy in window
      const accurateCount = window.filter((p) => {
        if (!p.outcome?.predictions_accurate) return false;
        const accuracies = Object.values(p.outcome.predictions_accurate);
        return accuracies.filter((a) => a === true).length / accuracies.length > 0.5;
      }).length;
      accuracyOverTime.push(accurateCount / window.length);

      // Success rate in window
      const successCount = window.filter((p) => p.outcome?.success).length;
      successRateOverTime.push(successCount / window.length);
    }

    return {
      time_points: timePoints,
      confidence_over_time: confidenceOverTime,
      accuracy_over_time: accuracyOverTime,
      success_rate_over_time: successRateOverTime,
    };
  }

  /**
   * Find most informative patterns (high learning value)
   */
  findKeyPatterns(limit: number = 10): InteractionPattern[] {
    // Key patterns are those that:
    // 1. Had high disagreement between domains (interesting decision points)
    // 2. Had surprising outcomes (predictions were wrong)
    // 3. Had high cascade risk (complex situations)

    const scored = this.patterns.map((pattern) => {
      let score = 0;

      // Disagreement bonus
      if (pattern.coordinated_decision?.disagreement_detected) {
        score += 2;
      }

      // Cascade risk bonus
      const cascadeRisk = pattern.coordinated_decision?.cascade_risk || 0;
      score += cascadeRisk;

      // Prediction mismatch bonus
      if (pattern.outcome?.predictions_accurate) {
        const accuracies = Object.values(pattern.outcome.predictions_accurate);
        const incorrectCount = accuracies.filter((a) => a === false).length;
        score += incorrectCount * 0.5;
      }

      // High risk bonus
      const avgRisk = this.getAverageRisk(pattern);
      if (avgRisk > 0.6) score += 1;

      return { pattern, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.pattern);
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  private emptyStatistics(): PatternStatistics {
    return {
      total_patterns: 0,
      domains_present: [],
      scenarios_covered: [],
      average_confidence: 0,
      average_success_rate: 0,
      prediction_accuracy: 0,
      early_success_rate: 0,
      late_success_rate: 0,
      learning_improvement: 0,
      proceed_count: 0,
      adjust_count: 0,
      defer_count: 0,
      high_risk_patterns: 0,
      cascade_detections: 0,
    };
  }

  private groupByScenario(): Record<string, InteractionPattern[]> {
    const groups: Record<string, InteractionPattern[]> = {};
    for (const pattern of this.patterns) {
      const type = pattern.scenario_type;
      if (!groups[type]) groups[type] = [];
      groups[type].push(pattern);
    }
    return groups;
  }

  private getAverageConfidenceForPatterns(patterns: InteractionPattern[]): number {
    let total = 0;
    let count = 0;

    for (const pattern of patterns) {
      const predictions = Object.values(pattern.ep_predictions);
      for (const pred of predictions) {
        if (pred && typeof pred.confidence === "number") {
          total += pred.confidence;
          count++;
        }
      }
    }

    return count > 0 ? total / count : 0;
  }

  private getMostCommonDecision(patterns: InteractionPattern[]): string {
    const counts: Record<string, number> = {};
    for (const pattern of patterns) {
      const decision = pattern.coordinated_decision?.decision || "unknown";
      counts[decision] = (counts[decision] || 0) + 1;
    }
    return this.getMostCommonKey(counts);
  }

  private getMostCommonKey(counts: Record<string, number>): string {
    let maxKey = "";
    let maxCount = 0;
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxKey = key;
      }
    }
    return maxKey;
  }

  private getAverageRisk(pattern: InteractionPattern): number {
    const predictions = Object.values(pattern.ep_predictions);
    let totalRisk = 0;
    let count = 0;

    for (const pred of predictions) {
      if (pred && typeof pred.risk === "number") {
        totalRisk += pred.risk;
        count++;
      }
    }

    return count > 0 ? totalRisk / count : 0;
  }

  private getAverageRiskForPatterns(patterns: InteractionPattern[]): number {
    let total = 0;
    for (const pattern of patterns) {
      total += this.getAverageRisk(pattern);
    }
    return patterns.length > 0 ? total / patterns.length : 0;
  }
}

// ============================================================================
// Pattern Quality Metrics
// ============================================================================

export interface PatternQualityMetrics {
  overall_quality: number; // 0-1 score
  confidence_reliability: number; // Are high-confidence predictions accurate?
  risk_calibration: number; // Do high-risk predictions actually fail more?
  decision_effectiveness: number; // Do "defer" decisions avoid failures?
  learning_velocity: number; // How fast is improvement happening?
}

export class PatternQualityAnalyzer {
  private analyzer: PatternAnalyzer;
  private patterns: InteractionPattern[];

  constructor(corpus: PatternCorpus) {
    this.analyzer = new PatternAnalyzer(corpus);
    this.patterns = corpus.patterns || [];
  }

  /**
   * Assess overall quality of pattern corpus
   */
  assessQuality(): PatternQualityMetrics {
    if (this.patterns.length < 10) {
      return {
        overall_quality: 0,
        confidence_reliability: 0,
        risk_calibration: 0,
        decision_effectiveness: 0,
        learning_velocity: 0,
      };
    }

    const stats = this.analyzer.getStatistics();

    // 1. Confidence Reliability: Do high-confidence predictions succeed more?
    const confidenceReliability = this.assessConfidenceReliability();

    // 2. Risk Calibration: Do high-risk predictions fail more?
    const riskCalibration = this.assessRiskCalibration();

    // 3. Decision Effectiveness: Do "defer" decisions avoid failures?
    const decisionEffectiveness = this.assessDecisionEffectiveness();

    // 4. Learning Velocity: Rate of improvement
    const learningVelocity = Math.max(0, Math.min(1, stats.learning_improvement * 2));

    // Overall quality is weighted average
    const overall =
      0.3 * confidenceReliability +
      0.25 * riskCalibration +
      0.25 * decisionEffectiveness +
      0.2 * learningVelocity;

    return {
      overall_quality: overall,
      confidence_reliability: confidenceReliability,
      risk_calibration: riskCalibration,
      decision_effectiveness: decisionEffectiveness,
      learning_velocity: learningVelocity,
    };
  }

  private assessConfidenceReliability(): number {
    // High-confidence predictions should be more accurate
    const highConf: number[] = [];
    const lowConf: number[] = [];

    for (const pattern of this.patterns) {
      const predictions = Object.values(pattern.ep_predictions);
      const avgConf =
        predictions.reduce((sum, p) => sum + (p?.confidence || 0), 0) /
        predictions.length;

      const successValue = pattern.outcome?.success ? 1 : 0;

      if (avgConf > 0.7) highConf.push(successValue);
      else if (avgConf < 0.4) lowConf.push(successValue);
    }

    if (highConf.length === 0 || lowConf.length === 0) return 0.5;

    const highSuccessRate = highConf.reduce((a, b) => a + b, 0) / highConf.length;
    const lowSuccessRate = lowConf.reduce((a, b) => a + b, 0) / lowConf.length;

    // Normalized difference (0 = no correlation, 1 = perfect correlation)
    return Math.max(0, Math.min(1, highSuccessRate - lowSuccessRate + 0.5));
  }

  private assessRiskCalibration(): number {
    // High-risk predictions should fail more
    const highRisk: number[] = [];
    const lowRisk: number[] = [];

    for (const pattern of this.patterns) {
      const predictions = Object.values(pattern.ep_predictions);
      const avgRisk =
        predictions.reduce((sum, p) => sum + (p?.risk || 0), 0) / predictions.length;

      const successValue = pattern.outcome?.success ? 1 : 0;

      if (avgRisk > 0.6) highRisk.push(successValue);
      else if (avgRisk < 0.3) lowRisk.push(successValue);
    }

    if (highRisk.length === 0 || lowRisk.length === 0) return 0.5;

    const highSuccessRate = highRisk.reduce((a, b) => a + b, 0) / highRisk.length;
    const lowSuccessRate = lowRisk.reduce((a, b) => a + b, 0) / lowRisk.length;

    // High risk should have LOWER success (inverse of confidence)
    return Math.max(0, Math.min(1, lowSuccessRate - highSuccessRate + 0.5));
  }

  private assessDecisionEffectiveness(): number {
    // "Defer" decisions should have better outcomes than "proceed" in risky situations
    const deferPatterns = this.patterns.filter(
      (p) => p.coordinated_decision?.decision === "defer"
    );
    const proceedPatterns = this.patterns.filter(
      (p) => p.coordinated_decision?.decision === "proceed"
    );

    if (deferPatterns.length === 0 || proceedPatterns.length === 0) return 0.5;

    const deferSuccessRate =
      deferPatterns.filter((p) => p.outcome?.success).length / deferPatterns.length;
    const proceedSuccessRate =
      proceedPatterns.filter((p) => p.outcome?.success).length / proceedPatterns.length;

    // Normalized (expect defer to be safer)
    return Math.max(0, Math.min(1, deferSuccessRate - proceedSuccessRate + 0.7));
  }
}
