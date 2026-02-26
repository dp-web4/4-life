"use client";

import { useState, useEffect } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import {
  PatternAnalyzer,
  PatternQualityAnalyzer,
  type PatternCorpus,
  type PatternStatistics,
  type ScenarioAnalysis,
  type DomainAnalysis,
  type LearningTrajectory,
  type PatternQualityMetrics,
  type InteractionPattern,
} from "@/lib/patterns/pattern_analyzer";

import {
  PatternNarrativeGenerator,
  type LearningNarrative,
} from "@/lib/patterns/pattern_narratives";

/**
 * Pattern Corpus Browser
 *
 * Interactive visualization of EP (Epistemic Proprioception) pattern learning.
 * Shows how agents learn what works across generations through pattern matching.
 *
 * Key Questions This Page Answers:
 * 1. What has the agent learned?
 * 2. How reliable are the patterns?
 * 3. How does learning improve over time?
 * 4. What scenarios is it best/worst at?
 */

type CorpusSource =
  | "web4_native"
  | "integrated_federation"
  | "phase3_contextual";

const CORPUS_OPTIONS: Record<CorpusSource, { label: string; file: string }> = {
  web4_native: {
    label: "Web4 Native (100 patterns)",
    file: "/api/patterns/web4_native",
  },
  integrated_federation: {
    label: "Integrated Federation (1123 patterns)",
    file: "/api/patterns/integrated_federation",
  },
  phase3_contextual: {
    label: "Phase 3 Contextual (1293 patterns)",
    file: "/api/patterns/phase3_contextual",
  },
};

export default function PatternsPage() {
  const [selectedCorpus, setSelectedCorpus] =
    useState<CorpusSource>("web4_native");
  const [corpus, setCorpus] = useState<PatternCorpus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<PatternStatistics | null>(null);
  const [scenarios, setScenarios] = useState<ScenarioAnalysis[]>([]);
  const [domains, setDomains] = useState<DomainAnalysis[]>([]);
  const [trajectory, setTrajectory] = useState<LearningTrajectory | null>(null);
  const [quality, setQuality] = useState<PatternQualityMetrics | null>(null);
  const [keyPatterns, setKeyPatterns] = useState<InteractionPattern[]>([]);
  const [narrative, setNarrative] = useState<LearningNarrative | null>(null);

  const [selectedTab, setSelectedTab] = useState<
    "overview" | "scenarios" | "domains" | "trajectory" | "quality" | "patterns" | "narrative"
  >("overview");

  useEffect(() => {
    loadCorpus();
  }, [selectedCorpus]);

  const loadCorpus = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(CORPUS_OPTIONS[selectedCorpus].file);
      if (!response.ok) {
        throw new Error(`Failed to load corpus: ${response.statusText}`);
      }

      const data: PatternCorpus = await response.json();
      setCorpus(data);

      // Analyze
      const analyzer = new PatternAnalyzer(data);
      const qualityAnalyzer = new PatternQualityAnalyzer(data);
      const narrativeGenerator = new PatternNarrativeGenerator(data);

      setStats(analyzer.getStatistics());
      setScenarios(analyzer.analyzeScenarios());
      setDomains(analyzer.analyzeDomains());
      setTrajectory(analyzer.getLearningTrajectory(10));
      setQuality(qualityAnalyzer.assessQuality());
      setKeyPatterns(analyzer.findKeyPatterns(10));
      setNarrative(narrativeGenerator.generateNarrative());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs currentPath="/patterns" />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pattern Corpus Browser</h1>
          <p className="text-gray-400 mb-4">
            Explore how agents learn through Epistemic Proprioception (EP) -
            the ability to know what you know.
          </p>

          {/* Corpus Selector */}
          <div className="flex gap-4 items-center">
            <label className="font-medium">Corpus:</label>
            <select
              value={selectedCorpus}
              onChange={(e) => setSelectedCorpus(e.target.value as CorpusSource)}
              className="border rounded px-3 py-2"
            >
              {Object.entries(CORPUS_OPTIONS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={loadCorpus}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Reload"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-950/30 border border-red-800/40 rounded">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading pattern corpus...</p>
          </div>
        )}

        {!loading && stats && (
          <>
            {/* Tabs */}
            <div className="mb-6 border-b">
              <div className="flex gap-4">
                {["overview", "narrative", "scenarios", "domains", "trajectory", "quality", "patterns"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setSelectedTab(
                          tab as typeof selectedTab
                        )
                      }
                      className={`px-4 py-2 border-b-2 transition-colors ${
                        selectedTab === tab
                          ? "border-blue-600 text-blue-600 font-medium"
                          : "border-transparent text-gray-400 hover:text-gray-900"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Tab Content */}
            {selectedTab === "overview" && (
              <OverviewTab stats={stats} quality={quality} />
            )}
            {selectedTab === "narrative" && narrative && (
              <NarrativeTab narrative={narrative} />
            )}
            {selectedTab === "scenarios" && <ScenariosTab scenarios={scenarios} />}
            {selectedTab === "domains" && <DomainsTab domains={domains} />}
            {selectedTab === "trajectory" && (
              <TrajectoryTab trajectory={trajectory} />
            )}
            {selectedTab === "quality" && <QualityTab quality={quality} />}
            {selectedTab === "patterns" && (
              <PatternsTab patterns={keyPatterns} />
            )}
          </>
        )}
        <ExplorerNav currentPath="/patterns" />
        <RelatedConcepts currentPath="/patterns" />
      </div>
    </div>
  );
}

// ============================================================================
// Tab Components
// ============================================================================

function OverviewTab({
  stats,
  quality,
}: {
  stats: PatternStatistics;
  quality: PatternQualityMetrics | null;
}) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Total Patterns"
          value={stats.total_patterns}
          color="blue"
        />
        <MetricCard
          label="Success Rate"
          value={`${(stats.average_success_rate * 100).toFixed(1)}%`}
          color="green"
        />
        <MetricCard
          label="Prediction Accuracy"
          value={`${(stats.prediction_accuracy * 100).toFixed(1)}%`}
          color="purple"
        />
      </div>

      {/* Learning Progress */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
        <div className="space-y-3">
          <ProgressBar
            label="Early Success Rate (First 25%)"
            value={stats.early_success_rate}
            color="gray"
          />
          <ProgressBar
            label="Late Success Rate (Last 25%)"
            value={stats.late_success_rate}
            color="green"
          />
          <div className="pt-2 border-t">
            <p className="text-sm text-gray-400">
              Learning Improvement:{" "}
              <span
                className={`font-bold ${
                  stats.learning_improvement > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stats.learning_improvement > 0 ? "+" : ""}
                {(stats.learning_improvement * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Decision Distribution */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Decision Distribution</h2>
        <div className="space-y-2">
          <DecisionBar
            label="Proceed"
            count={stats.proceed_count}
            total={stats.total_patterns}
            color="green"
          />
          <DecisionBar
            label="Adjust"
            count={stats.adjust_count}
            total={stats.total_patterns}
            color="yellow"
          />
          <DecisionBar
            label="Defer"
            count={stats.defer_count}
            total={stats.total_patterns}
            color="red"
          />
        </div>
      </div>

      {/* Quality Summary */}
      {quality && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Corpus Quality</h2>
          <div className="space-y-3">
            <ProgressBar
              label="Overall Quality"
              value={quality.overall_quality}
              color="blue"
            />
            <ProgressBar
              label="Confidence Reliability"
              value={quality.confidence_reliability}
              color="purple"
            />
            <ProgressBar
              label="Risk Calibration"
              value={quality.risk_calibration}
              color="orange"
            />
            <ProgressBar
              label="Decision Effectiveness"
              value={quality.decision_effectiveness}
              color="green"
            />
            <ProgressBar
              label="Learning Velocity"
              value={quality.learning_velocity}
              color="blue"
            />
          </div>
        </div>
      )}

      {/* Domains & Scenarios Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3">Domains Covered</h2>
          <div className="flex flex-wrap gap-2">
            {stats.domains_present.map((domain) => (
              <span
                key={domain}
                className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3">Scenario Types</h2>
          <p className="text-2xl font-bold text-gray-300">
            {stats.scenarios_covered.length}
          </p>
          <p className="text-sm text-gray-400">unique scenario types</p>
        </div>
      </div>
    </div>
  );
}

function NarrativeTab({ narrative }: { narrative: LearningNarrative }) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Title & Summary */}
      <div className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-800/30 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">
          {narrative.title}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-4">
          {narrative.summary}
        </p>

        {/* Maturity Badge */}
        <div className="inline-block px-4 py-2 bg-gray-900/50 rounded-full border-2 border-purple-800/50">
          <span className="text-sm font-medium text-purple-300">
            {narrative.maturity_assessment.split(':')[0]}
          </span>
        </div>
      </div>

      {/* Human Analogy */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <span>💡</span>
          <span>In Human Terms</span>
        </h2>
        <p className="text-gray-300 leading-relaxed italic">
          {narrative.human_analogy}
        </p>
      </div>

      {/* Key Insights */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Key Insights</h2>
        <div className="space-y-3">
          {narrative.key_insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg">
              <span className="text-2xl">
                {insight.includes('Strong') || insight.includes('Well-calibrated') ? '✓' :
                 insight.includes('Negative') || insight.includes('Overconfident') ? '⚠' :
                 insight.includes('Multi-domain') ? '🎯' : '📊'}
              </span>
              <p className="text-gray-300 pt-1">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Chapters */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Learning Journey</h2>
        <div className="space-y-4">
          {narrative.chapters.map((chapter, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              {/* Chapter Header */}
              <button
                onClick={() => setExpandedChapter(expandedChapter === idx ? null : idx)}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 transition-colors text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {chapter.phase === 'early' ? '🌱' : chapter.phase === 'middle' ? '🌿' : '🌳'}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg">{chapter.title}</h3>
                    <p className="text-sm text-gray-400">
                      Patterns {chapter.pattern_range[0]} - {chapter.pattern_range[1]}
                    </p>
                  </div>
                </div>
                <span className="text-gray-400">
                  {expandedChapter === idx ? '▼' : '▶'}
                </span>
              </button>

              {/* Chapter Content */}
              {expandedChapter === idx && (
                <div className="p-4 space-y-4">
                  {/* Learning Summary */}
                  <div className="bg-blue-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Learning Summary</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {chapter.learning_summary}
                    </p>
                  </div>

                  {/* Coherence Evolution */}
                  <div className="bg-purple-950/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Coherence Evolution</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {chapter.coherence_evolution}
                    </p>
                  </div>

                  {/* Key Events */}
                  {chapter.key_events.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Key Learning Events</h4>
                      <div className="space-y-2">
                        {chapter.key_events.map((event, eventIdx) => {
                          const isExpanded = expandedEvent === `${idx}-${eventIdx}`;
                          const eventKey = `${idx}-${eventIdx}`;

                          return (
                            <div key={eventIdx} className="border rounded-lg overflow-hidden">
                              <button
                                onClick={() => setExpandedEvent(isExpanded ? null : eventKey)}
                                className="w-full p-3 bg-gray-800 hover:bg-gray-700 transition-colors text-left flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">
                                    {event.event_type === 'breakthrough' ? '🚀' :
                                     event.event_type === 'setback' ? '⚠️' :
                                     event.event_type === 'surprise' ? '❗' : '✓'}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    event.event_type === 'breakthrough' ? 'bg-green-900/50 text-green-300' :
                                    event.event_type === 'setback' ? 'bg-red-900/50 text-red-300' :
                                    event.event_type === 'surprise' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-900/50 text-blue-300'
                                  }`}>
                                    {event.event_type}
                                  </span>
                                  <span className="text-sm text-gray-300">
                                    Pattern #{event.pattern_index}
                                  </span>
                                </div>
                                <span className="text-gray-400 text-sm">
                                  {isExpanded ? '▼' : '▶'}
                                </span>
                              </button>

                              {isExpanded && (
                                <div className="p-3 bg-gray-900/50 space-y-2">
                                  <p className="text-gray-300">
                                    <span className="font-semibold">What happened: </span>
                                    {event.description}
                                  </p>
                                  <p className="text-gray-300">
                                    <span className="font-semibold">Why it matters: </span>
                                    {event.significance}
                                  </p>
                                  {event.coherence_context && (
                                    <p className="text-gray-400 text-sm italic bg-purple-950/30 p-2 rounded">
                                      <span className="font-semibold">Coherence context: </span>
                                      {event.coherence_context}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Maturity Assessment */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 border-l-4 border-purple-500">
        <h2 className="text-xl font-bold mb-3">Maturity Assessment</h2>
        <p className="text-gray-300 leading-relaxed">
          {narrative.maturity_assessment}
        </p>
      </div>
    </div>
  );
}

function ScenariosTab({ scenarios }: { scenarios: ScenarioAnalysis[] }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Scenario Analysis</h2>
        <p className="text-gray-400 text-sm mt-1">
          How does the agent perform in different situations?
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                Scenario Type
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Count
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Success Rate
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Confidence
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Typical Decision
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Risk Level
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {scenarios.map((scenario) => (
              <tr key={scenario.scenario_type} className="hover:bg-gray-900/50">
                <td className="px-4 py-3 text-sm">{scenario.scenario_type}</td>
                <td className="px-4 py-3 text-sm text-center">
                  {scenario.count}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span
                    className={`font-medium ${
                      scenario.success_rate > 0.7
                        ? "text-green-600"
                        : scenario.success_rate > 0.4
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {(scenario.success_rate * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {(scenario.average_confidence * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <DecisionBadge decision={scenario.typical_decision} />
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <RiskBadge level={scenario.risk_level} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DomainsTab({ domains }: { domains: DomainAnalysis[] }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">Domain Analysis</h2>
        <p className="text-gray-400 text-sm mt-1">
          How does each EP domain perform?
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                Domain
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Pattern Count
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Avg Confidence
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Prediction Accuracy
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">
                Typical Recommendation
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {domains.map((domain) => (
              <tr key={domain.domain} className="hover:bg-gray-900/50">
                <td className="px-4 py-3 text-sm font-medium">
                  {domain.domain}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {domain.pattern_count}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {(domain.average_confidence * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span
                    className={`font-medium ${
                      domain.prediction_accuracy > 0.7
                        ? "text-green-600"
                        : domain.prediction_accuracy > 0.4
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {(domain.prediction_accuracy * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <DecisionBadge decision={domain.typical_recommendation} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrajectoryTab({
  trajectory,
}: {
  trajectory: LearningTrajectory | null;
}) {
  if (!trajectory) return <div>No trajectory data</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Learning Trajectory</h2>
        <p className="text-gray-400 text-sm mb-6">
          How does performance improve as patterns accumulate?
        </p>

        {/* Simple ASCII-style chart */}
        <div className="space-y-8">
          <TrajectoryChart
            title="Success Rate Over Time"
            data={trajectory.success_rate_over_time}
            labels={trajectory.time_points}
            color="green"
          />
          <TrajectoryChart
            title="Confidence Over Time"
            data={trajectory.confidence_over_time}
            labels={trajectory.time_points}
            color="blue"
          />
          <TrajectoryChart
            title="Accuracy Over Time"
            data={trajectory.accuracy_over_time}
            labels={trajectory.time_points}
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}

function QualityTab({ quality }: { quality: PatternQualityMetrics | null }) {
  if (!quality) return <div>No quality data</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Pattern Quality Assessment</h2>
        <p className="text-gray-400 text-sm mb-6">
          How reliable and well-calibrated are the learned patterns?
        </p>

        <div className="space-y-6">
          {/* Overall Quality */}
          <QualityMetric
            label="Overall Quality"
            value={quality.overall_quality}
            description="Composite score of all quality dimensions"
            color="blue"
          />

          {/* Confidence Reliability */}
          <QualityMetric
            label="Confidence Reliability"
            value={quality.confidence_reliability}
            description="Do high-confidence predictions actually succeed more often?"
            color="purple"
          />

          {/* Risk Calibration */}
          <QualityMetric
            label="Risk Calibration"
            value={quality.risk_calibration}
            description="Do high-risk predictions actually fail more often?"
            color="orange"
          />

          {/* Decision Effectiveness */}
          <QualityMetric
            label="Decision Effectiveness"
            value={quality.decision_effectiveness}
            description="Do 'defer' decisions successfully avoid failures?"
            color="green"
          />

          {/* Learning Velocity */}
          <QualityMetric
            label="Learning Velocity"
            value={quality.learning_velocity}
            description="How quickly is performance improving?"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

function PatternsTab({ patterns }: { patterns: InteractionPattern[] }) {
  const [selectedPattern, setSelectedPattern] =
    useState<InteractionPattern | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pattern List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Key Learning Moments</h2>
          <p className="text-gray-400 text-sm mt-1">
            Patterns with high learning value (disagreements, surprises, complexity)
          </p>
        </div>

        <div className="divide-y max-h-[600px] overflow-y-auto">
          {patterns.map((pattern) => (
            <button
              key={pattern.pattern_id}
              onClick={() => setSelectedPattern(pattern)}
              className={`w-full text-left p-4 hover:bg-gray-900/50 transition-colors ${
                selectedPattern?.pattern_id === pattern.pattern_id
                  ? "bg-blue-950/30"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-sm">
                  {pattern.scenario_type}
                </span>
                <DecisionBadge
                  decision={pattern.coordinated_decision?.decision || "unknown"}
                />
              </div>
              <p className="text-xs text-gray-400 mb-2">
                {pattern.scenario_description}
              </p>
              <div className="flex gap-2">
                {pattern.outcome?.success ? (
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-300 rounded">
                    Success
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 bg-red-900/50 text-red-300 rounded">
                    Failed
                  </span>
                )}
                {pattern.coordinated_decision?.disagreement_detected && (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                    Disagreement
                  </span>
                )}
                {pattern.coordinated_decision?.cascade_risk > 0.5 && (
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded">
                    Cascade Risk
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Details */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl">
        {selectedPattern ? (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Pattern Details</h2>

            <div className="space-y-4">
              {/* Scenario */}
              <div>
                <h3 className="font-medium text-sm text-gray-300 mb-1">
                  Scenario
                </h3>
                <p className="text-sm">{selectedPattern.scenario_description}</p>
              </div>

              {/* Context */}
              <div>
                <h3 className="font-medium text-sm text-gray-300 mb-2">
                  Context
                </h3>
                <pre className="text-xs bg-gray-900/50 p-3 rounded overflow-x-auto">
                  {JSON.stringify(selectedPattern.context, null, 2)}
                </pre>
              </div>

              {/* Predictions */}
              <div>
                <h3 className="font-medium text-sm text-gray-300 mb-2">
                  EP Predictions
                </h3>
                <div className="space-y-2">
                  {Object.entries(selectedPattern.ep_predictions).map(
                    ([domain, pred]) => (
                      <div
                        key={domain}
                        className="text-xs bg-gray-900/50 p-2 rounded"
                      >
                        <div className="font-medium mb-1">{domain}</div>
                        <div className="grid grid-cols-2 gap-1 text-gray-400">
                          <div>Confidence: {((pred?.confidence || 0) * 100).toFixed(0)}%</div>
                          <div>Risk: {((pred?.risk || 0) * 100).toFixed(0)}%</div>
                          <div>Action: {pred?.recommended_action}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Decision */}
              <div>
                <h3 className="font-medium text-sm text-gray-300 mb-2">
                  Coordinated Decision
                </h3>
                <div className="text-sm bg-gray-900/50 p-3 rounded space-y-1">
                  <div>
                    Decision:{" "}
                    <DecisionBadge
                      decision={
                        selectedPattern.coordinated_decision?.decision ||
                        "unknown"
                      }
                    />
                  </div>
                  <div>
                    Consensus:{" "}
                    {(
                      (selectedPattern.coordinated_decision
                        ?.consensus_strength || 0) * 100
                    ).toFixed(0)}
                    %
                  </div>
                  {selectedPattern.coordinated_decision?.disagreement_detected && (
                    <div className="text-yellow-600">
                      ⚠️ Disagreement detected
                    </div>
                  )}
                  {selectedPattern.coordinated_decision?.cascade_risk > 0.5 && (
                    <div className="text-orange-600">
                      ⚠️ Cascade risk detected
                    </div>
                  )}
                </div>
              </div>

              {/* Outcome */}
              <div>
                <h3 className="font-medium text-sm text-gray-300 mb-2">
                  Outcome
                </h3>
                <div className="text-sm bg-gray-900/50 p-3 rounded space-y-1">
                  <div>
                    Result:{" "}
                    {selectedPattern.outcome?.success ? (
                      <span className="text-green-600 font-medium">
                        Success ✓
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Failed ✗
                      </span>
                    )}
                  </div>
                  <div>
                    ATP Consumed:{" "}
                    {selectedPattern.outcome?.atp_consumed?.toFixed(1) || "N/A"}
                  </div>
                  <div>
                    T3 Change:{" "}
                    {selectedPattern.outcome?.t3_change?.toFixed(3) || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            Select a pattern to view details
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// UI Components
// ============================================================================

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-950/30 border-blue-800/40 text-blue-300",
    green: "bg-green-950/30 border-green-800/40 text-green-300",
    purple: "bg-purple-950/30 border-purple-800/40 text-purple-300",
  };

  return (
    <div
      className={`border rounded-lg p-4 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <div className="text-sm opacity-75 mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const percentage = Math.round(value * 100);
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    gray: "bg-gray-400",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DecisionBar({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const percentage = Math.round((count / total) * 100);
  const colorClasses = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>
          {count} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function DecisionBadge({ decision }: { decision: string }) {
  const colors = {
    proceed: "bg-green-900/50 text-green-300",
    adjust: "bg-yellow-100 text-yellow-800",
    defer: "bg-red-900/50 text-red-300",
    unknown: "bg-gray-700 text-gray-300",
  };

  const colorClass =
    colors[decision as keyof typeof colors] || colors.unknown;

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
      {decision}
    </span>
  );
}

function RiskBadge({ level }: { level: "low" | "medium" | "high" }) {
  const colors = {
    low: "bg-green-900/50 text-green-300",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-900/50 text-red-300",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[level]}`}>
      {level}
    </span>
  );
}

function QualityMetric({
  label,
  value,
  description,
  color,
}: {
  label: string;
  value: number;
  description: string;
  color: string;
}) {
  return (
    <div className="border-l-4 pl-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{label}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
        <span
          className={`text-2xl font-bold ${
            value > 0.7
              ? "text-green-600"
              : value > 0.4
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <ProgressBar label="" value={value} color={color} />
    </div>
  );
}

function TrajectoryChart({
  title,
  data,
  labels,
  color,
}: {
  title: string;
  data: number[];
  labels: number[];
  color: string;
}) {
  const max = Math.max(...data, 1);
  const height = 200;

  return (
    <div>
      <h3 className="font-medium mb-3">{title}</h3>
      <div className="relative border rounded p-4 bg-gray-900/50">
        <svg width="100%" height={height} className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <line
              key={v}
              x1="0"
              y1={height - v * height}
              x2="100%"
              y2={height - v * height}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Data line */}
          <polyline
            points={data
              .map((v, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = height - (v / max) * height;
                return `${x}%,${y}`;
              })
              .join(" ")}
            fill="none"
            stroke={color === "green" ? "#10b981" : color === "blue" ? "#3b82f6" : "#a855f7"}
            strokeWidth="2"
          />

          {/* Data points */}
          {data.map((v, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = height - (v / max) * height;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={y}
                r="3"
                fill={color === "green" ? "#10b981" : color === "blue" ? "#3b82f6" : "#a855f7"}
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>
    </div>
  );
}
