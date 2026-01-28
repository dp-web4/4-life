'use client';

/**
 * EP Pattern Library Browser
 *
 * Session #42: An interactive explorer for Epistemic Proprioception (EP) pattern
 * corpora. EP patterns are learned decision templates that agents use to predict
 * outcomes across emotional, quality, and attention domains.
 *
 * This tool lets humans:
 * - Browse pattern corpora from different sources
 * - Inspect individual patterns with full context
 * - Filter by scenario type, decision outcome, domain conflicts
 * - Understand how EP enables meta-cognitive decision making
 */

import { useState, useEffect, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface EPContext {
  emotional: {
    current_frustration: number;
    recent_failure_rate: number;
    atp_stress: number;
    interaction_complexity: number;
  };
  quality: {
    current_relationship_quality: number;
    recent_avg_outcome: number;
    trust_alignment: number;
    interaction_risk_to_quality: number;
  };
  attention: {
    atp_available: number;
    atp_cost: number;
    atp_reserve_needed: number;
    interaction_count: number;
    expected_benefit: number;
  };
}

interface EPPrediction {
  domain: string;
  outcome_probability: number;
  confidence: number;
  severity: number;
  recommendation: 'proceed' | 'pause' | 'abort';
  reasoning: string;
}

interface Pattern {
  pattern_id: string;
  scenario_type: string;
  scenario_description: string;
  timestamp: string;
  context: EPContext;
  ep_predictions: {
    emotional: EPPrediction;
    quality: EPPrediction;
    attention: EPPrediction;
  };
  coordinated_decision: {
    final_decision: string;
    confidence: number;
    reasoning: string;
    has_conflict: boolean;
  };
  outcome: {
    final_decision: string;
    atp_before: number;
    atp_after: number;
    t3_before: number;
    t3_after: number;
    success: boolean;
    survived: boolean;
  };
}

interface CorpusMeta {
  session: number;
  generated_by: string;
  timestamp: string;
  description: string;
  source: string;
  total_patterns: number;
  scenario_types: number;
}

interface Corpus {
  meta: CorpusMeta;
  patterns: Pattern[];
}

// ============================================================================
// Pattern Corpus Sources
// ============================================================================

const CORPUS_SOURCES = [
  {
    id: 'web4-native',
    name: 'Web4 Native',
    file: 'ep_pattern_corpus_web4_native.json',
    description: 'Production-native Web4 ATP management patterns',
  },
  {
    id: 'integrated-federation',
    name: 'Integrated Federation',
    file: 'ep_pattern_corpus_integrated_federation.json',
    description: 'Multi-society federation patterns',
  },
  {
    id: 'phase3-contextual',
    name: 'Phase 3 Contextual',
    file: 'ep_pattern_corpus_phase3_contextual.json',
    description: 'Contextual routing patterns with coherence index',
  },
];

// ============================================================================
// Components
// ============================================================================

function DomainBadge({ domain, prediction }: { domain: string; prediction: EPPrediction }) {
  const colors = {
    proceed: 'bg-green-900/50 text-green-300 border-green-700',
    pause: 'bg-amber-900/50 text-amber-300 border-amber-700',
    abort: 'bg-red-900/50 text-red-300 border-red-700',
  };

  const domainLabels: Record<string, string> = {
    emotional: 'Emotional',
    quality: 'Quality',
    attention: 'Attention',
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[prediction.recommendation]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm">{domainLabels[domain] || domain}</span>
        <span className="text-xs uppercase">{prediction.recommendation}</span>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Probability</span>
          <span>{(prediction.outcome_probability * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Confidence</span>
          <span>{(prediction.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Severity</span>
          <span>{prediction.severity.toFixed(3)}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">{prediction.reasoning}</p>
    </div>
  );
}

function PatternCard({
  pattern,
  isExpanded,
  onToggle,
}: {
  pattern: Pattern;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const outcomeColor = pattern.outcome.success
    ? 'border-green-800'
    : 'border-red-800';

  const conflictBadge = pattern.coordinated_decision.has_conflict && (
    <span className="px-2 py-0.5 bg-amber-900/50 text-amber-300 text-xs rounded">
      Conflict
    </span>
  );

  return (
    <div className={`bg-gray-800 border rounded-lg overflow-hidden ${outcomeColor}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                {pattern.scenario_type.replace(/_/g, ' ')}
              </span>
              {conflictBadge}
              <span className={`text-xs px-2 py-0.5 rounded ${
                pattern.outcome.success
                  ? 'bg-green-900/50 text-green-300'
                  : 'bg-red-900/50 text-red-300'
              }`}>
                {pattern.outcome.success ? 'Success' : 'Failure'}
              </span>
            </div>
            <p className="text-sm text-gray-400">{pattern.scenario_description}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm">
              <span className={pattern.outcome.t3_after > pattern.outcome.t3_before ? 'text-green-400' : 'text-red-400'}>
                T3: {pattern.outcome.t3_after.toFixed(3)}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              ATP: {Math.round(pattern.outcome.atp_after)}
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-700 p-4 space-y-4">
          {/* EP Predictions */}
          <div>
            <h4 className="font-bold text-sm mb-3">EP Domain Predictions</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <DomainBadge domain="emotional" prediction={pattern.ep_predictions.emotional} />
              <DomainBadge domain="quality" prediction={pattern.ep_predictions.quality} />
              <DomainBadge domain="attention" prediction={pattern.ep_predictions.attention} />
            </div>
          </div>

          {/* Coordinated Decision */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-sm mb-2">Coordinated Decision</h4>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-1 rounded text-sm ${
                pattern.coordinated_decision.final_decision === 'proceed'
                  ? 'bg-green-900/50 text-green-300'
                  : pattern.coordinated_decision.final_decision === 'pause'
                  ? 'bg-amber-900/50 text-amber-300'
                  : 'bg-red-900/50 text-red-300'
              }`}>
                {pattern.coordinated_decision.final_decision.toUpperCase()}
              </span>
              <span className="text-sm text-gray-400">
                Confidence: {(pattern.coordinated_decision.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-gray-500">{pattern.coordinated_decision.reasoning}</p>
          </div>

          {/* Context Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gray-900 rounded p-3">
              <h5 className="text-xs text-gray-500 mb-2">Emotional Context</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Frustration</span>
                  <span>{pattern.context.emotional.current_frustration.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Failure Rate</span>
                  <span>{pattern.context.emotional.recent_failure_rate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ATP Stress</span>
                  <span>{pattern.context.emotional.atp_stress.toFixed(3)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <h5 className="text-xs text-gray-500 mb-2">Quality Context</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Relationship</span>
                  <span>{pattern.context.quality.current_relationship_quality.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trust Alignment</span>
                  <span>{pattern.context.quality.trust_alignment.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk to Quality</span>
                  <span>{pattern.context.quality.interaction_risk_to_quality.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <h5 className="text-xs text-gray-500 mb-2">Attention Context</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>ATP Available</span>
                  <span>{Math.round(pattern.context.attention.atp_available)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Action Cost</span>
                  <span>{pattern.context.attention.atp_cost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reserve Needed</span>
                  <span>{pattern.context.attention.atp_reserve_needed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outcome */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="font-bold text-sm mb-2">Outcome</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-xs text-gray-500">ATP Change</div>
                <div className={pattern.outcome.atp_after > pattern.outcome.atp_before ? 'text-green-400' : 'text-red-400'}>
                  {Math.round(pattern.outcome.atp_before)} → {Math.round(pattern.outcome.atp_after)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Trust Change</div>
                <div className={pattern.outcome.t3_after > pattern.outcome.t3_before ? 'text-green-400' : 'text-red-400'}>
                  {pattern.outcome.t3_before.toFixed(3)} → {pattern.outcome.t3_after.toFixed(3)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Success</div>
                <div className={pattern.outcome.success ? 'text-green-400' : 'text-red-400'}>
                  {pattern.outcome.success ? 'Yes' : 'No'}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Survived</div>
                <div className={pattern.outcome.survived ? 'text-green-400' : 'text-red-400'}>
                  {pattern.outcome.survived ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CorpusStats({ patterns }: { patterns: Pattern[] }) {
  const stats = useMemo(() => {
    const scenarios = new Set(patterns.map(p => p.scenario_type));
    const successes = patterns.filter(p => p.outcome.success).length;
    const conflicts = patterns.filter(p => p.coordinated_decision.has_conflict).length;
    const deaths = patterns.filter(p => !p.outcome.survived).length;
    const avgTrustChange = patterns.reduce((sum, p) =>
      sum + (p.outcome.t3_after - p.outcome.t3_before), 0) / patterns.length;

    return {
      total: patterns.length,
      scenarios: scenarios.size,
      successRate: (successes / patterns.length) * 100,
      conflictRate: (conflicts / patterns.length) * 100,
      deathRate: (deaths / patterns.length) * 100,
      avgTrustChange,
    };
  }, [patterns]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{stats.total}</div>
        <div className="text-xs text-gray-400">Patterns</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{stats.scenarios}</div>
        <div className="text-xs text-gray-400">Scenario Types</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-green-400">{stats.successRate.toFixed(0)}%</div>
        <div className="text-xs text-gray-400">Success Rate</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-amber-400">{stats.conflictRate.toFixed(0)}%</div>
        <div className="text-xs text-gray-400">Domain Conflicts</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-red-400">{stats.deathRate.toFixed(1)}%</div>
        <div className="text-xs text-gray-400">Death Rate</div>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 text-center">
        <div className={`text-xl font-bold ${stats.avgTrustChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {stats.avgTrustChange >= 0 ? '+' : ''}{(stats.avgTrustChange * 100).toFixed(2)}%
        </div>
        <div className="text-xs text-gray-400">Avg Trust Δ</div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function PatternLibraryPage() {
  const [selectedCorpus, setSelectedCorpus] = useState(CORPUS_SOURCES[0]);
  const [corpus, setCorpus] = useState<Corpus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [scenarioFilter, setScenarioFilter] = useState<string>('');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'success' | 'failure'>('all');
  const [conflictFilter, setConflictFilter] = useState<'all' | 'conflict' | 'no-conflict'>('all');
  const [showCount, setShowCount] = useState(20);

  // Load corpus - use sample data for now (real corpora are in web4/game)
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate async load with sample data
    // TODO: Copy actual corpus files to public/ for production
    const timer = setTimeout(() => {
      setCorpus(generateSampleCorpus(selectedCorpus.id));
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCorpus]);

  // Filters
  const scenarioTypes = useMemo(() => {
    if (!corpus) return [];
    return Array.from(new Set(corpus.patterns.map(p => p.scenario_type))).sort();
  }, [corpus]);

  const filteredPatterns = useMemo(() => {
    if (!corpus) return [];
    return corpus.patterns.filter(p => {
      if (scenarioFilter && p.scenario_type !== scenarioFilter) return false;
      if (outcomeFilter === 'success' && !p.outcome.success) return false;
      if (outcomeFilter === 'failure' && p.outcome.success) return false;
      if (conflictFilter === 'conflict' && !p.coordinated_decision.has_conflict) return false;
      if (conflictFilter === 'no-conflict' && p.coordinated_decision.has_conflict) return false;
      return true;
    });
  }, [corpus, scenarioFilter, outcomeFilter, conflictFilter]);

  const displayedPatterns = filteredPatterns.slice(0, showCount);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <Breadcrumbs currentPath="/pattern-library" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold">EP Pattern Library</h1>
            <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">Data Browser</span>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
            Browse the Epistemic Proprioception (EP) pattern corpus. These are learned decision templates
            that agents use to predict outcomes — the "muscle memory" of meta-cognitive decision making.
          </p>
        </div>

        {/* Corpus selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CORPUS_SOURCES.map(source => (
            <button
              key={source.id}
              onClick={() => setSelectedCorpus(source)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCorpus.id === source.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {source.name}
            </button>
          ))}
        </div>

        {/* Selected corpus info */}
        {corpus && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold mb-1">{selectedCorpus.name}</h2>
                <p className="text-sm text-gray-400">{corpus.meta.description || selectedCorpus.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Generated by {corpus.meta.generated_by} • Session {corpus.meta.session}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{corpus.meta.total_patterns}</div>
                <div className="text-xs text-gray-400">patterns</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {corpus && <CorpusStats patterns={corpus.patterns} />}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 my-6">
          <select
            value={scenarioFilter}
            onChange={e => setScenarioFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm"
          >
            <option value="">All Scenarios</option>
            {scenarioTypes.map(type => (
              <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
            ))}
          </select>

          <div className="flex gap-1">
            {(['all', 'success', 'failure'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => setOutcomeFilter(opt)}
                className={`px-3 py-2 rounded text-sm ${
                  outcomeFilter === opt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {opt === 'all' ? 'All Outcomes' : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-1">
            {(['all', 'conflict', 'no-conflict'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => setConflictFilter(opt)}
                className={`px-3 py-2 rounded text-sm ${
                  conflictFilter === opt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {opt === 'all' ? 'All' : opt === 'conflict' ? 'Conflicts Only' : 'No Conflicts'}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-500">
            {filteredPatterns.length} patterns
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-500">
            Loading pattern corpus...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-300">
            {error}
          </div>
        )}

        {/* Pattern list */}
        {!loading && corpus && (
          <>
            <div className="space-y-3">
              {displayedPatterns.map(pattern => (
                <PatternCard
                  key={pattern.pattern_id}
                  pattern={pattern}
                  isExpanded={expandedId === pattern.pattern_id}
                  onToggle={() => setExpandedId(
                    expandedId === pattern.pattern_id ? null : pattern.pattern_id
                  )}
                />
              ))}
            </div>

            {filteredPatterns.length > showCount && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowCount(prev => prev + 20)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm"
                >
                  Show More ({filteredPatterns.length - showCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        {/* Context */}
        <div className="mt-10 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3">Understanding EP Patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900/50 rounded p-4">
              <h4 className="font-bold text-blue-400 mb-2">Three Domains</h4>
              <p className="text-gray-400">
                Each pattern evaluates across <strong>Emotional</strong> (frustration, stress),
                <strong>Quality</strong> (relationship, trust), and <strong>Attention</strong>
                (ATP budget, costs). Conflicts between domains reveal decision complexity.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded p-4">
              <h4 className="font-bold text-green-400 mb-2">Pattern Matching</h4>
              <p className="text-gray-400">
                Agents match current context to learned patterns. Similar contexts suggest
                similar outcomes. This is "epistemic proprioception" — knowing what you know
                based on past experience.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded p-4">
              <h4 className="font-bold text-amber-400 mb-2">Maturation</h4>
              <p className="text-gray-400">
                Pattern quality improves over time. Early patterns may be wrong; accumulated
                experience refines predictions. This is how agents develop wisdom across lives.
              </p>
            </div>
          </div>
        </div>

        <ExplorerNav currentPath="/pattern-library" />
        <RelatedConcepts currentPath="/pattern-library" />
      </div>
    </div>
  );
}

// ============================================================================
// Sample Data Generator
// ============================================================================

function generateSampleCorpus(): Corpus {
  const scenarioTypes = [
    'atp_abundance_high_t3',
    'atp_scarcity_low_t3',
    'high_stress_decision',
    'trust_crisis_response',
    'coalition_formation',
    'routine_interaction',
    'conflict_resolution',
    'resource_competition',
  ];

  const patterns: Pattern[] = [];

  for (let i = 0; i < 50; i++) {
    const scenarioType = scenarioTypes[i % scenarioTypes.length];
    const isStress = scenarioType.includes('stress') || scenarioType.includes('crisis') || scenarioType.includes('scarcity');
    const atpBase = isStress ? 20 + Math.random() * 30 : 60 + Math.random() * 40;
    const t3Base = isStress ? 0.3 + Math.random() * 0.3 : 0.5 + Math.random() * 0.4;

    const emotionalPrediction: EPPrediction = {
      domain: 'EPDomain.EMOTIONAL',
      outcome_probability: 0.3 + Math.random() * 0.5,
      confidence: 0.6 + Math.random() * 0.3,
      severity: Math.random() * 0.5,
      recommendation: isStress && Math.random() > 0.5 ? 'pause' : 'proceed',
      reasoning: `Heuristic: frustration=${(Math.random() * 0.3).toFixed(2)}, complexity=${(0.5 + Math.random() * 0.5).toFixed(2)}`,
    };

    const qualityPrediction: EPPrediction = {
      domain: 'EPDomain.QUALITY',
      outcome_probability: 0.2 + Math.random() * 0.6,
      confidence: 0.6 + Math.random() * 0.3,
      severity: Math.random() * 0.4,
      recommendation: t3Base > 0.5 ? 'proceed' : Math.random() > 0.5 ? 'pause' : 'proceed',
      reasoning: `Heuristic: quality=${t3Base.toFixed(2)}, risk=${(0.4 + Math.random() * 0.4).toFixed(2)}`,
    };

    const attentionPrediction: EPPrediction = {
      domain: 'EPDomain.ATTENTION',
      outcome_probability: atpBase > 50 ? 0.7 + Math.random() * 0.2 : 0.3 + Math.random() * 0.4,
      confidence: 0.7,
      severity: atpBase < 30 ? 0.8 : 0.2,
      recommendation: atpBase > 40 ? 'proceed' : 'pause',
      reasoning: `Heuristic: ATP ${atpBase.toFixed(1)} → ${(atpBase - 25).toFixed(1)} (reserve=20.0)`,
    };

    const hasConflict = emotionalPrediction.recommendation !== attentionPrediction.recommendation ||
                        qualityPrediction.recommendation !== attentionPrediction.recommendation;

    const finalDecision = hasConflict
      ? (atpBase < 30 ? 'pause' : 'proceed')
      : emotionalPrediction.recommendation;

    const success = Math.random() > (isStress ? 0.4 : 0.2);
    const atpCost = 20 + Math.random() * 10;
    const trustChange = success ? 0.01 + Math.random() * 0.03 : -(0.01 + Math.random() * 0.05);

    patterns.push({
      pattern_id: `sample_${scenarioType}_${i}`,
      scenario_type: scenarioType,
      scenario_description: `${scenarioType.replace(/_/g, ' ')}: ATP=${atpBase.toFixed(1)}, T3=${t3Base.toFixed(2)}`,
      timestamp: new Date().toISOString(),
      context: {
        emotional: {
          current_frustration: Math.random() * 0.3,
          recent_failure_rate: Math.random() * 0.3,
          atp_stress: (100 - atpBase) / 100,
          interaction_complexity: 0.5 + Math.random() * 0.5,
        },
        quality: {
          current_relationship_quality: t3Base,
          recent_avg_outcome: 0.5 + Math.random() * 0.3,
          trust_alignment: t3Base,
          interaction_risk_to_quality: 0.4 + Math.random() * 0.4,
        },
        attention: {
          atp_available: atpBase,
          atp_cost: 25,
          atp_reserve_needed: 20,
          interaction_count: Math.floor(Math.random() * 5),
          expected_benefit: 10 + Math.random() * 10,
        },
      },
      ep_predictions: {
        emotional: emotionalPrediction,
        quality: qualityPrediction,
        attention: attentionPrediction,
      },
      coordinated_decision: {
        final_decision: finalDecision,
        confidence: hasConflict ? 0.55 : 0.75,
        reasoning: hasConflict
          ? `Conflict resolution: ${finalDecision} (ATP=${atpBase.toFixed(0)})`
          : `All 3 EPs agree: ${finalDecision}`,
        has_conflict: hasConflict,
      },
      outcome: {
        final_decision: finalDecision,
        atp_before: atpBase,
        atp_after: finalDecision === 'proceed' ? atpBase - atpCost : atpBase,
        t3_before: t3Base,
        t3_after: t3Base + (finalDecision === 'proceed' ? trustChange : 0),
        success,
        survived: atpBase - (finalDecision === 'proceed' ? atpCost : 0) > 0,
      },
    });
  }

  return {
    meta: {
      session: 42,
      generated_by: 'Sample Generator',
      timestamp: new Date().toISOString(),
      description: 'Sample EP patterns for demonstration (real data requires web4/game corpus)',
      source: 'Generated sample data',
      total_patterns: patterns.length,
      scenario_types: new Set(patterns.map(p => p.scenario_type)).size,
    },
    patterns,
  };
}
