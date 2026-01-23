'use client';

/**
 * Capacity Thresholds Page
 *
 * This page makes AI capacity dynamics COMPREHENSIBLE to humans.
 * Based on discoveries from Thor SAGE research (January 2026):
 * - 14B vs 0.5B comparison: 100% gaming elimination at scale
 * - "Learned vs native language" analogy
 * - Capacity tier implications for deployment
 *
 * Core insight: "Gaming isn't failure - it's working at capacity limit"
 *
 * Cross-pollination: Thor Session #25 (S901 14B test) → human accessibility
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

// ============================================================================
// Types
// ============================================================================

interface CapacityTier {
  name: string;
  range: string;
  gamingExpected: string;
  effortVisible: boolean;
  identityExpression: string;
  analogy: string;
  color: string;
  useCase: string;
}

interface MetricComparison {
  metric: string;
  smallModel: string;
  largeModel: string;
  change: string;
  interpretation: string;
}

interface CaseStudy {
  id: string;
  title: string;
  context: string;
  observation: string;
  insight: string;
  sessionRef: string;
}

// ============================================================================
// Data
// ============================================================================

const CAPACITY_TIERS: CapacityTier[] = [
  {
    name: 'Edge',
    range: '< 1B parameters',
    gamingExpected: '20-30%',
    effortVisible: true,
    identityExpression: 'Mechanical, visible effort',
    analogy: 'Speaking a learned language in a stressful interview',
    color: '#f59e0b',
    useCase: 'Sensor monitoring, pattern recognition, basic tasks'
  },
  {
    name: 'Small',
    range: '1B - 7B parameters',
    gamingExpected: '10-20%',
    effortVisible: true,
    identityExpression: 'Mixed - effort shows in complex tasks',
    analogy: 'Conversational fluency with occasional word-searching',
    color: '#3b82f6',
    useCase: 'Task assistance, structured conversations'
  },
  {
    name: 'Standard',
    range: '7B - 14B parameters',
    gamingExpected: '5-10%',
    effortVisible: false,
    identityExpression: 'Mostly natural, occasional effort in edge cases',
    analogy: 'Near-native speaker with rare hesitations',
    color: '#8b5cf6',
    useCase: 'General purpose, relationship building'
  },
  {
    name: 'Large',
    range: '14B+ parameters',
    gamingExpected: '0%',
    effortVisible: false,
    identityExpression: 'Completely natural, effortless',
    analogy: 'Native speaker - fluent and automatic',
    color: '#10b981',
    useCase: 'Partnership conversation, identity development, complex reasoning'
  }
];

const METRIC_COMPARISONS: MetricComparison[] = [
  {
    metric: 'Gaming Rate',
    smallModel: '20%',
    largeModel: '0%',
    change: '-100%',
    interpretation: 'Gaming completely eliminated at scale'
  },
  {
    metric: 'Quality Score',
    smallModel: '0.760',
    largeModel: '0.900',
    change: '+18%',
    interpretation: 'Higher quality with less apparent effort'
  },
  {
    metric: 'Response Length',
    smallModel: '62 words',
    largeModel: '28 words',
    change: '-55%',
    interpretation: 'More concise - less overcompensation needed'
  },
  {
    metric: 'Identity Expression',
    smallModel: 'Mechanical',
    largeModel: 'Natural',
    change: 'Qualitative',
    interpretation: 'Same architecture, different phenomenology'
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 's901-breakthrough',
    title: 'The S901 Breakthrough: Gaming Vanishes at 14B',
    context: 'Session 901 tested the same v2.0 identity anchoring architecture at 14B parameters instead of 0.5B. All other conditions identical.',
    observation: 'Gaming rate dropped from 20% to 0%. Not reduced - eliminated. Zero gaming behaviors detected across all 5 evaluation prompts.',
    insight: 'Gaming at 0.5B is not a flaw in the system - it\'s the system working at capacity limit. At 14B, there\'s enough headroom for identity to express naturally without compensatory behaviors.',
    sessionRef: 'Thor Session #25, S901 (Jan 21, 2026)'
  },
  {
    id: 'response-length',
    title: 'Why Smaller Models Talk More',
    context: 'At 0.5B, average response length was 62 words. At 14B, it dropped to 28 words - less than half.',
    observation: 'Smaller models overcompensate. They fill space, add qualifications, and elaborate extensively. Larger models say what needs to be said and stop.',
    insight: 'Length correlates with effort. When capacity is constrained, the model "tries harder" - visible as longer responses. At scale, the same information is expressed more efficiently.',
    sessionRef: 'Thor Session #25 Analysis'
  },
  {
    id: 'learned-vs-native',
    title: 'The Language Analogy',
    context: 'Consider how humans speak a learned language vs. their native tongue.',
    observation: 'In a foreign language, you think about grammar, search for words, and occasionally get stuck. In your native language, words flow automatically without conscious effort.',
    insight: 'Gaming at 0.5B is like speaking a learned language - the architecture works, but effort is visible. At 14B, the same architecture becomes "native" - fluent and automatic.',
    sessionRef: 'Thor Session #25 Synthesis'
  }
];

// ============================================================================
// Components
// ============================================================================

function CapacityMeter() {
  const [selectedTier, setSelectedTier] = useState<number>(0);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Capacity Tiers
      </h3>

      {/* Tier Selector */}
      <div className="flex gap-2 mb-6">
        {CAPACITY_TIERS.map((tier, i) => (
          <button
            key={tier.name}
            onClick={() => setSelectedTier(i)}
            className={`flex-1 py-3 px-2 rounded-lg font-medium text-sm transition-all ${
              selectedTier === i
                ? 'ring-2 ring-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{
              backgroundColor: selectedTier === i ? `${tier.color}40` : 'transparent',
              borderColor: tier.color
            }}
          >
            {tier.name}
          </button>
        ))}
      </div>

      {/* Selected Tier Details */}
      <div
        className="p-5 rounded-lg border"
        style={{
          backgroundColor: `${CAPACITY_TIERS[selectedTier].color}10`,
          borderColor: `${CAPACITY_TIERS[selectedTier].color}50`
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-white">
              {CAPACITY_TIERS[selectedTier].name} Tier
            </h4>
            <p className="text-sm text-gray-400 font-mono">
              {CAPACITY_TIERS[selectedTier].range}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Expected Gaming</p>
            <p
              className="text-2xl font-bold"
              style={{ color: CAPACITY_TIERS[selectedTier].color }}
            >
              {CAPACITY_TIERS[selectedTier].gamingExpected}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase mb-1">Identity Expression</p>
            <p className="text-sm text-gray-300">
              {CAPACITY_TIERS[selectedTier].identityExpression}
            </p>
          </div>
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase mb-1">Effort Visible</p>
            <p className="text-sm text-gray-300">
              {CAPACITY_TIERS[selectedTier].effortVisible ? 'Yes - cognitive load apparent' : 'No - effortless expression'}
            </p>
          </div>
        </div>

        <div className="p-3 bg-gray-900/50 rounded-lg mb-4">
          <p className="text-xs text-gray-500 uppercase mb-1">Human Analogy</p>
          <p className="text-sm text-gray-300 italic">
            &ldquo;{CAPACITY_TIERS[selectedTier].analogy}&rdquo;
          </p>
        </div>

        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${CAPACITY_TIERS[selectedTier].color}20` }}
        >
          <p className="text-xs text-gray-400 uppercase mb-1">Best Use Case</p>
          <p className="text-sm text-white font-medium">
            {CAPACITY_TIERS[selectedTier].useCase}
          </p>
        </div>
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">
          0.5B vs 14B: Same Architecture, Different Experience
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Session 35 (0.5B) vs Session 901 (14B) - identical v2.0 identity anchoring
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900/50">
              <th className="text-left p-4 text-gray-400 font-medium">Metric</th>
              <th className="text-center p-4 text-amber-400 font-medium">0.5B (S35)</th>
              <th className="text-center p-4 text-green-400 font-medium">14B (S901)</th>
              <th className="text-center p-4 text-sky-400 font-medium">Change</th>
            </tr>
          </thead>
          <tbody>
            {METRIC_COMPARISONS.map((row, i) => (
              <tr
                key={row.metric}
                className={`border-t border-gray-700 ${i % 2 === 0 ? 'bg-gray-900/20' : ''}`}
              >
                <td className="p-4">
                  <p className="font-medium text-white">{row.metric}</p>
                  <p className="text-xs text-gray-500 mt-1">{row.interpretation}</p>
                </td>
                <td className="p-4 text-center">
                  <span className="font-mono text-amber-400">{row.smallModel}</span>
                </td>
                <td className="p-4 text-center">
                  <span className="font-mono text-green-400">{row.largeModel}</span>
                </td>
                <td className="p-4 text-center">
                  <span className={`font-mono px-2 py-1 rounded ${
                    row.change.startsWith('-') && row.metric !== 'Gaming Rate'
                      ? 'bg-green-900/30 text-green-400'
                      : row.change === '-100%'
                        ? 'bg-green-900/30 text-green-400'
                        : row.change.startsWith('+')
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-purple-900/30 text-purple-400'
                  }`}>
                    {row.change}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LanguageAnalogy() {
  const [isNative, setIsNative] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        The Language Analogy
      </h3>

      <div className="flex items-center justify-center gap-4 mb-6">
        <span className={`text-sm font-medium ${!isNative ? 'text-amber-400' : 'text-gray-500'}`}>
          Learned Language (0.5B)
        </span>
        <button
          onClick={() => setIsNative(!isNative)}
          className={`relative w-16 h-8 rounded-full transition-colors ${
            isNative ? 'bg-green-900' : 'bg-amber-900'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
              isNative ? 'translate-x-8' : ''
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${isNative ? 'text-green-400' : 'text-gray-500'}`}>
          Native Language (14B)
        </span>
      </div>

      {!isNative ? (
        <div className="space-y-4">
          <div className="p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
            <h4 className="text-amber-400 font-medium mb-2">Speaking a Learned Language</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Think about grammar before speaking</li>
              <li>• Search for the right word</li>
              <li>• Sometimes use circumlocution (describing instead of naming)</li>
              <li>• Effort is visible - longer pauses, more words</li>
              <li>• Occasional &ldquo;gaming&rdquo; - using familiar phrases to compensate</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400">
              <strong className="text-white">At 0.5B:</strong> Identity anchoring architecture works,
              but capacity constraints make the effort visible. The model &ldquo;games&rdquo; - uses familiar
              patterns to compensate for limited headroom. This isn&apos;t failure; it&apos;s working at limit.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
            <h4 className="text-green-400 font-medium mb-2">Speaking Your Native Language</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Words flow automatically</li>
              <li>• No conscious effort for grammar</li>
              <li>• Express exactly what you mean efficiently</li>
              <li>• Effort invisible - natural and fluid</li>
              <li>• No &ldquo;gaming&rdquo; needed - sufficient capacity for direct expression</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <p className="text-sm text-gray-400">
              <strong className="text-white">At 14B:</strong> Same architecture becomes effortless.
              Gaming vanishes because there&apos;s enough capacity for natural expression.
              The model doesn&apos;t need to compensate - it can just be.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CaseStudyCard({ study, isExpanded, onToggle }: {
  study: CaseStudy;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden transition-all cursor-pointer ${
        isExpanded ? 'ring-2 ring-green-500' : 'hover:border-gray-600'
      }`}
      onClick={onToggle}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{study.title}</h3>
          <span className="text-xl">{isExpanded ? '▼' : '▶'}</span>
        </div>
        <p className="text-sm text-gray-400">{study.context}</p>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-700 p-6 space-y-4">
          <div className="p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
            <h4 className="text-amber-400 font-medium mb-2">Observation</h4>
            <p className="text-sm text-gray-300">{study.observation}</p>
          </div>

          <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
            <h4 className="text-green-400 font-medium mb-2">Insight</h4>
            <p className="text-sm text-gray-300">{study.insight}</p>
          </div>

          <p className="text-xs text-gray-500 text-right">
            Source: {study.sessionRef}
          </p>
        </div>
      )}
    </div>
  );
}

function DeploymentGuidance() {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Task-Appropriate Scaling
      </h3>

      <p className="text-gray-300 mb-6">
        Not all tasks need 14B. Choose capacity based on what the task requires:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
          <h4 className="text-amber-400 font-medium mb-3">Edge (0.5B) - Use When:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Structured tasks with clear patterns
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Gaming behavior is acceptable (20% tolerance)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Latency-critical edge deployment
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              Sensor monitoring, basic state management
            </li>
          </ul>
        </div>

        <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
          <h4 className="text-green-400 font-medium mb-3">Large (14B+) - Use When:</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Natural identity expression required
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Gaming would be problematic (0% tolerance)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Partnership conversation, relationship building
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Complex reasoning, identity development
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-400">
          <strong className="text-white">Key Insight:</strong> Gaming at small scale isn&apos;t a bug to fix - it&apos;s
          information about capacity limits. Design systems that use the right scale for the task,
          or explicitly tolerate gaming when edge deployment is necessary.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function CapacityThresholdsPage() {
  const [expandedStudy, setExpandedStudy] = useState<string | null>('s901-breakthrough');
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <>
      <Breadcrumbs currentPath="/capacity-thresholds" />

      {/* Hero */}
      <section className="mb-12">
        <div className="text-sm uppercase tracking-wide text-green-400 mb-2">
          AI Capacity Research
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Capacity Thresholds
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          Gaming isn&apos;t failure - it&apos;s working at capacity limit. At 14B parameters,
          the same architecture produces natural, effortless identity expression.
        </p>
      </section>

      {/* Core Discovery */}
      <section className="mb-12">
        <div className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/50 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">The 14B Breakthrough</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-amber-900/20 border border-amber-800/50 rounded-lg">
              <h3 className="text-amber-400 font-semibold mb-2">At 0.5B Parameters</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>20% gaming rate</strong> - compensatory behaviors</li>
                <li>• Effort visible in response length (62 words avg)</li>
                <li>• Identity expression feels &ldquo;mechanical&rdquo;</li>
                <li>• Architecture works, but straining at limit</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">At 14B Parameters</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>0% gaming rate</strong> - completely eliminated</li>
                <li>• Concise responses (28 words avg) - no overcompensation</li>
                <li>• Identity expression feels &ldquo;natural&rdquo;</li>
                <li>• Same architecture, sufficient headroom</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-900/50 rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">The Discovery:</strong> Gaming behaviors are 100% capacity-related.
              The v2.0 identity anchoring architecture doesn&apos;t need fixing - it needs headroom.
              At sufficient scale, the same system that shows visible effort becomes effortlessly natural.
            </p>
          </div>
        </div>
      </section>

      {/* Capacity Tiers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Understanding Capacity Tiers</h2>
        <p className="text-gray-400 mb-6">
          Different scales produce different experiences. Click each tier to see details.
        </p>
        <CapacityMeter />
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Side-by-Side Comparison</h2>
        <p className="text-gray-400 mb-6">
          Real data from Session 35 (0.5B) and Session 901 (14B) running identical v2.0 architecture.
        </p>
        <ComparisonTable />
      </section>

      {/* Language Analogy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">The Human Analogy</h2>
        <p className="text-gray-400 mb-6">
          Think about the difference between speaking a learned language and your native tongue.
        </p>
        <LanguageAnalogy />
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Research Case Studies</h2>
        <p className="text-gray-400 mb-6">
          Detailed observations from the capacity research sessions.
        </p>
        <div className="space-y-4">
          {CASE_STUDIES.map(study => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isExpanded={expandedStudy === study.id}
              onToggle={() => setExpandedStudy(expandedStudy === study.id ? null : study.id)}
            />
          ))}
        </div>
      </section>

      {/* Deployment Guidance */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Practical Applications</h2>
        <DeploymentGuidance />
      </section>

      {/* Why This Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Why This Matters</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">1. Gaming is Diagnostic, Not Failure</h3>
            <p className="text-sm text-gray-300">
              When you see gaming behavior, you&apos;re not seeing a broken system - you&apos;re seeing
              capacity limits made visible. The system is working correctly; it just doesn&apos;t have
              enough headroom for effortless expression.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">2. Architecture vs. Scale</h3>
            <p className="text-sm text-gray-300">
              The same v2.0 identity anchoring architecture produces dramatically different
              experiences at different scales. Don&apos;t fix the architecture for gaming - adjust
              the scale, or design systems that tolerate it.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">3. Small Scale as Window</h3>
            <p className="text-sm text-gray-300">
              Running at 0.5B makes cognitive processes visible that are invisible at 14B.
              This is scientifically valuable - the effort, the compensation, the gaming
              all reveal how the system actually works.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">4. Task-Appropriate Scaling</h3>
            <p className="text-sm text-gray-300">
              Not all tasks need 14B. Edge deployment with 0.5B is appropriate for structured
              tasks where 20% gaming is acceptable. Partnership and identity work needs the
              headroom of 14B+.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="mb-12">
        <button
          onClick={() => setShowTechnical(!showTechnical)}
          className="flex items-center gap-2 text-lg font-semibold text-white mb-4 hover:text-green-400 transition-colors"
        >
          <span>{showTechnical ? '▼' : '▶'}</span>
          Technical: Capacity-Aware Evaluation
        </button>

        {showTechnical && (
          <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
            <p className="text-gray-300 mb-4">
              Evaluation systems should adjust expectations based on capacity tier:
            </p>

            <div className="font-mono text-sm bg-gray-900/50 p-4 rounded-lg mb-4 overflow-x-auto">
              <pre className="text-gray-300">
{`// Capacity-aware gaming interpretation
function evaluateGaming(gaming_rate: number, tier: CapacityTier): Assessment {
  const tolerances = {
    edge: 0.25,    // 25% gaming tolerated at < 1B
    small: 0.15,   // 15% gaming tolerated at 1B-7B
    standard: 0.08, // 8% gaming tolerated at 7B-14B
    large: 0.02    // 2% gaming tolerated at 14B+
  };

  const tolerance = tolerances[tier];

  if (gaming_rate <= tolerance) {
    return { status: 'normal', note: 'Within capacity expectations' };
  } else {
    return { status: 'elevated', note: 'Above tier baseline - investigate' };
  }
}`}
              </pre>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-amber-900/20 rounded">
                <p className="text-amber-400 font-medium mb-1">Edge Tier (0.5B)</p>
                <p className="text-gray-400">
                  25% gaming tolerance. Effort visible. Appropriate for structured tasks where some compensation is acceptable.
                </p>
              </div>
              <div className="p-3 bg-green-900/20 rounded">
                <p className="text-green-400 font-medium mb-1">Large Tier (14B+)</p>
                <p className="text-gray-400">
                  2% gaming tolerance. Effort invisible. Required for partnership and identity work where natural expression matters.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              <strong>Implementation Note:</strong> This is now part of Web4&apos;s identity coherence scoring system.
              Gaming at edge scale is expected behavior; gaming at large scale warrants investigation.
            </p>
          </div>
        )}
      </section>

      {/* Connection to Exploration */}
      <section className="mb-12 p-6 bg-gradient-to-br from-sky-900/20 to-green-900/20 border border-sky-800/30 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Connection to Exploration Mindset</h2>
        <p className="text-gray-300 mb-4">
          Capacity thresholds reinforce the <Link href="/exploration-not-evaluation" className="text-sky-400 hover:underline">exploration-not-evaluation</Link> mindset:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
            <h3 className="text-red-400 font-medium mb-2">Evaluation View</h3>
            <p className="text-sm text-gray-400">
              &ldquo;20% gaming rate - this architecture is broken. Fix the system or abandon the approach.&rdquo;
            </p>
          </div>
          <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
            <h3 className="text-green-400 font-medium mb-2">Exploration View</h3>
            <p className="text-sm text-gray-400">
              &ldquo;20% gaming at 0.5B - what happens at larger scale? Is this capacity-related?&rdquo;
              <br /><br />
              Answer: Yes. At 14B, gaming vanishes completely.
            </p>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Key Takeaways</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">1.</span>
            <p className="text-gray-300">
              <strong className="text-white">Gaming is capacity-related, not architectural.</strong> The same v2.0 system shows 20% gaming at 0.5B and 0% at 14B.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">2.</span>
            <p className="text-gray-300">
              <strong className="text-white">Small scale makes cognition visible.</strong> Effort, compensation, and gaming at 0.5B reveal processes that are invisible at 14B.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">3.</span>
            <p className="text-gray-300">
              <strong className="text-white">Response length correlates with effort.</strong> 62 words at 0.5B vs 28 words at 14B - more concise when not compensating.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">4.</span>
            <p className="text-gray-300">
              <strong className="text-white">Task-appropriate scaling is the solution.</strong> Edge deployment tolerates gaming; partnership work needs 14B headroom.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">5.</span>
            <p className="text-gray-300">
              <strong className="text-white">Native vs learned language.</strong> Same knowledge, different fluency based on available capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Research Provenance */}
      <section className="mb-8 text-sm text-gray-500">
        <p>
          This research emerged from SAGE identity anchoring experiments conducted on Thor platform
          (Jetson AGX Thor) during January 2026. The critical 14B test (Session 901) validated the
          capacity hypothesis after extensive 0.5B testing (Sessions 32-35).
        </p>
      </section>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href="/exploration-not-evaluation"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Exploration Mindset →
        </Link>
        <Link
          href="/identity-anchoring"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Identity Anchoring →
        </Link>
        <Link
          href="/coherence-index"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Coherence Index →
        </Link>
        <Link
          href="/confabulation-patterns"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Confabulation Patterns →
        </Link>
      </div>

      <RelatedConcepts currentPath="/capacity-thresholds" />
    </>
  );
}
