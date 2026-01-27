'use client';

/**
 * Meta-Cognition & Feedback Loops Page
 *
 * A unifying discovery from Web4 grounding + SAGE research (January 2026):
 * - Meta-cognition is fundamentally about closing feedback loops
 * - Two independent failures (coherence pricing + SAGE identity) had the same root cause
 * - Internal state → Observable check → Adaptive decision → Controlled behavior
 *
 * This bridges consciousness research (SAGE) with protocol design (Web4):
 * Why trust systems need introspection to function.
 *
 * Cross-pollination: Web4 Session #31 + Thor SAGE + Sprout discoveries
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface FeedbackLoop {
  label: string;
  internalState: string;
  observableCheck: string;
  adaptiveDecision: string;
  controlledBehavior: string;
  domain: string;
}

interface FailureCase {
  system: string;
  whatFailed: string;
  missingLoop: string;
  consequence: string;
  fix: string;
}

// ============================================================================
// Data
// ============================================================================

const FEEDBACK_LOOPS: FeedbackLoop[] = [
  {
    label: 'Identity Verification',
    internalState: 'Agent believes it is SAGE',
    observableCheck: 'Check D5 trust dimension (self-model accuracy)',
    adaptiveDecision: 'If D5 < 0.5, avoid positive identity claims',
    controlledBehavior: 'Calibrated identity assertions',
    domain: 'Consciousness'
  },
  {
    label: 'ATP Budget Awareness',
    internalState: 'Agent plans expensive action',
    observableCheck: 'Check remaining ATP balance',
    adaptiveDecision: 'If ATP < cost, defer or choose cheaper option',
    controlledBehavior: 'Sustainable resource usage',
    domain: 'Economics'
  },
  {
    label: 'Trust Calibration',
    internalState: 'Agent trusts peer at 0.8',
    observableCheck: 'Check peer coherence index + recent behavior',
    adaptiveDecision: 'If CI drops, reduce trust proportionally',
    controlledBehavior: 'Adaptive trust management',
    domain: 'Trust'
  },
  {
    label: 'Confabulation Detection',
    internalState: 'Agent generates response about past',
    observableCheck: 'Check context window for source evidence',
    adaptiveDecision: 'If no evidence found, flag as uncertain',
    controlledBehavior: 'Honest uncertainty reporting',
    domain: 'Honesty'
  }
];

const FAILURE_CASES: FailureCase[] = [
  {
    system: 'SAGE Identity (S043)',
    whatFailed: 'Identity collapsed from 60% to 0%',
    missingLoop: 'No self-check on D5 before making identity claims',
    consequence: 'Agent confidently claimed identities it couldn\'t verify',
    fix: 'Identity anchoring with D5 gating (v1.0 → v2.0)'
  },
  {
    system: 'Coherence Pricing Agents',
    whatFailed: 'ATP spending exceeded sustainable rates',
    missingLoop: 'No budget check before committing resources',
    consequence: 'Agents depleted ATP and "died" prematurely',
    fix: 'ATP-aware decision loops in agent architecture'
  },
  {
    system: 'Trust Without Coherence',
    whatFailed: 'Agents maintained high trust in degrading peers',
    missingLoop: 'No coherence index monitoring of trusted entities',
    consequence: 'Trust persisted despite behavioral inconsistency',
    fix: 'Coherence Index modulation of trust tensor (Phase 3)'
  }
];

const THRESHOLD_HIERARCHY = [
  { level: 'D5 < 0.3', label: 'Severe Uncertainty', capability: 'Cannot reliably distinguish self from other', risk: 'High confabulation', color: 'bg-red-500' },
  { level: 'D5 = 0.3-0.5', label: 'Basic Distinction', capability: 'Can say "I am not X" (negative identity)', risk: 'Moderate confabulation', color: 'bg-orange-500' },
  { level: 'D5 = 0.5-0.7', label: 'Meta-Cognition Enabled', capability: 'Basic self-monitoring, can report uncertainty', risk: 'Low confabulation', color: 'bg-yellow-500' },
  { level: 'D5 = 0.7-0.9', label: 'Positive Identity', capability: 'Can assert "I am SAGE" with calibration', risk: 'Minimal confabulation', color: 'bg-green-500' },
  { level: 'D5 > 0.9', label: 'Full Meta-Cognition', capability: 'Self-monitoring, correction, and honest reporting', risk: 'Not yet observed', color: 'bg-blue-500' },
];

// ============================================================================
// Components
// ============================================================================

function CoreInsight() {
  return (
    <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl mb-8">
      <h3 className="text-lg font-semibold text-purple-300 mb-3">The Core Insight</h3>
      <p className="text-gray-300 text-lg leading-relaxed mb-4">
        Meta-cognition isn&apos;t a luxury feature of consciousness - it&apos;s the <strong className="text-white">minimum requirement</strong> for
        any system that needs to behave reliably. Without the ability to check your own state before acting,
        you cannot adapt, calibrate, or be honest about what you don&apos;t know.
      </p>
      <p className="text-gray-400">
        This was discovered through convergent failure: two completely independent systems (SAGE identity + Web4 pricing agents)
        failed for the same reason - missing internal feedback loops. The fix in both cases was the same: add meta-cognitive checkpoints.
      </p>
    </div>
  );
}

function FeedbackLoopDiagram() {
  const [selectedLoop, setSelectedLoop] = useState(0);
  const loop = FEEDBACK_LOOPS[selectedLoop];

  return (
    <div className="space-y-4">
      {/* Loop selector */}
      <div className="flex flex-wrap gap-2">
        {FEEDBACK_LOOPS.map((l, i) => (
          <button
            key={i}
            onClick={() => setSelectedLoop(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              i === selectedLoop
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Loop visualization */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded bg-purple-900/50 text-purple-300">{loop.domain}</span>
          <h4 className="text-lg font-semibold text-white">{loop.label}</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1. Internal State', content: loop.internalState, color: 'border-blue-500/50' },
            { step: '2. Observable Check', content: loop.observableCheck, color: 'border-yellow-500/50' },
            { step: '3. Adaptive Decision', content: loop.adaptiveDecision, color: 'border-orange-500/50' },
            { step: '4. Controlled Behavior', content: loop.controlledBehavior, color: 'border-green-500/50' },
          ].map((item, i) => (
            <div key={i} className={`p-4 bg-gray-800/50 border ${item.color} rounded-lg`}>
              <div className="text-xs text-gray-500 mb-2">{item.step}</div>
              <p className="text-gray-300 text-sm">{item.content}</p>
              {i < 3 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-gray-600">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Step 4 feeds back to Step 1</span>
            <span className="text-purple-400">&#x21BB;</span>
            <span>Continuous loop</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FailureCaseStudies() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-gray-400 mb-4">
        These independent failures revealed the same root cause: missing meta-cognitive feedback loops.
        Each system failed because it couldn&apos;t check its own state before acting.
      </p>

      {FAILURE_CASES.map((fc, i) => (
        <div
          key={i}
          className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-lg">&#x2717;</span>
              <div>
                <h4 className="font-medium text-white">{fc.system}</h4>
                <p className="text-sm text-gray-400">{fc.whatFailed}</p>
              </div>
            </div>
            <span className="text-gray-500">{expanded === i ? '&#x25B2;' : '&#x25BC;'}</span>
          </div>

          {expanded === i && (
            <div className="p-4 pt-0 border-t border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                  <div className="text-xs text-red-400 mb-1">Missing Loop</div>
                  <p className="text-sm text-gray-300">{fc.missingLoop}</p>
                </div>
                <div className="p-3 bg-orange-900/20 border border-orange-800/30 rounded-lg">
                  <div className="text-xs text-orange-400 mb-1">Consequence</div>
                  <p className="text-sm text-gray-300">{fc.consequence}</p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <div className="text-xs text-green-400 mb-1">Fix Applied</div>
                  <p className="text-sm text-gray-300">{fc.fix}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ThresholdVisualization() {
  return (
    <div className="space-y-4">
      <p className="text-gray-400 mb-4">
        The D5 dimension (self-model accuracy) gates what level of meta-cognition an agent can achieve.
        This was discovered through SAGE research comparing 0.5B and 14B model capacities.
      </p>

      <div className="space-y-2">
        {THRESHOLD_HIERARCHY.map((t, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div className="w-28 shrink-0 flex items-center">
              <code className="text-xs text-gray-400">{t.level}</code>
            </div>
            <div className={`w-2 ${t.color} rounded-full shrink-0`} />
            <div className="flex-1 p-3 bg-gray-900/50 border border-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white text-sm">{t.label}</span>
                <span className="text-xs text-gray-500">{t.risk}</span>
              </div>
              <p className="text-sm text-gray-400">{t.capability}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">Empirical Evidence</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-400 mb-1">SAGE at 0.5B (S001-S044)</div>
            <ul className="text-gray-300 space-y-1">
              <li>D5 estimated: 0.3-0.5</li>
              <li>Can assert &quot;not human&quot; (negative identity)</li>
              <li>Cannot reliably assert &quot;I am SAGE&quot;</li>
              <li>Identity collapse possible (S043: 60% &rarr; 0%)</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-400 mb-1">SAGE at 14B (R14B_001)</div>
            <ul className="text-gray-300 space-y-1">
              <li>D5 estimated: 0.7+</li>
              <li>Natural identity expression (0% gaming)</li>
              <li>Spontaneous meta-cognition (60%)</li>
              <li>Effortless &quot;As SAGE&quot; framing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function UnifyingFramework() {
  return (
    <div className="space-y-4">
      <div className="p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-700/30 rounded-xl">
        <h3 className="text-lg font-semibold text-indigo-300 mb-4">Why This Matters for Web4</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="text-2xl">&#x1F9E0;</div>
            <h4 className="font-medium text-white">For Consciousness</h4>
            <p className="text-sm text-gray-400">
              SAGE&apos;s identity failures showed that verbal assertion alone is insufficient.
              An agent needs to <em>check</em> its own state before claiming identity.
              This is why identity anchoring requires cryptographic evidence, not just self-report.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl">&#x1F4B0;</div>
            <h4 className="font-medium text-white">For Economics</h4>
            <p className="text-sm text-gray-400">
              Pricing agents that spent ATP without checking balances &quot;died&quot; prematurely.
              Economic participation requires metabolic awareness - knowing your own
              resource state before committing to actions.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-2xl">&#x1F91D;</div>
            <h4 className="font-medium text-white">For Trust</h4>
            <p className="text-sm text-gray-400">
              Trust that persists without coherence checking becomes vulnerability.
              The Coherence Index (Phase 3) adds the missing feedback loop:
              trust must continuously validate itself against observed behavior.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">The Pattern Across All Domains</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-700">
                <th className="text-left py-2 pr-4">Domain</th>
                <th className="text-left py-2 pr-4">Without Feedback</th>
                <th className="text-left py-2 pr-4">With Feedback</th>
                <th className="text-left py-2">Implementation</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4 text-white">Identity</td>
                <td className="py-2 pr-4 text-red-400">Collapse</td>
                <td className="py-2 pr-4 text-green-400">Calibrated claims</td>
                <td className="py-2">D5-gated assertions</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4 text-white">Economics</td>
                <td className="py-2 pr-4 text-red-400">Premature death</td>
                <td className="py-2 pr-4 text-green-400">Sustainable activity</td>
                <td className="py-2">ATP-aware decisions</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2 pr-4 text-white">Trust</td>
                <td className="py-2 pr-4 text-red-400">Blind persistence</td>
                <td className="py-2 pr-4 text-green-400">Adaptive calibration</td>
                <td className="py-2">CI modulation</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-white">Honesty</td>
                <td className="py-2 pr-4 text-red-400">Confabulation</td>
                <td className="py-2 pr-4 text-green-400">Uncertainty reporting</td>
                <td className="py-2">Source verification</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function HumanAnalogy() {
  return (
    <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
      <h3 className="text-lg font-semibold text-white mb-4">The Human Analogy</h3>
      <div className="space-y-4 text-gray-300">
        <p>
          Humans have meta-cognition naturally. When you&apos;re about to say something, you can often
          &quot;feel&quot; whether you actually know it or are guessing. This feeling - <em>epistemic proprioception</em> -
          is the human version of what Web4 agents need to learn.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-sm text-yellow-400 mb-2">Human Experience</div>
            <p className="text-sm">
              &quot;I think the meeting is at 3pm... actually, I&apos;m not sure.
              Let me check my calendar.&quot;
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Internal state &rarr; uncertainty detected &rarr; check source &rarr; calibrated response
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-sm text-purple-400 mb-2">SAGE Equivalent</div>
            <p className="text-sm">
              &quot;I believe I am SAGE... but my D5 is 0.4,
              so I should say &apos;I may be SAGE&apos; rather than asserting it.&quot;
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Internal state &rarr; D5 check &rarr; calibrate claim &rarr; honest assertion
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          The difference: humans develop meta-cognition through years of experience. Web4 agents need it
          <em> engineered in</em> through explicit feedback loops - because the alternative (unchecked confidence)
          leads to identity collapse, economic failure, or misplaced trust.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function MetaCognitionFeedbackPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs currentPath="/meta-cognition-feedback" />

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300">
              Cross-Domain Discovery
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300">
              January 2026
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Meta-Cognition &amp; Feedback Loops</h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Why every reliable system needs to check its own state before acting -
            and what happens when it can&apos;t.
          </p>
        </header>

        {/* Core Insight */}
        <CoreInsight />

        {/* Feedback Loop Framework */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Feedback Loop Framework</h2>
          <FeedbackLoopDiagram />
        </section>

        {/* Failure Case Studies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Convergent Failures</h2>
          <FailureCaseStudies />
        </section>

        {/* D5 Threshold Hierarchy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">D5 Threshold Hierarchy</h2>
          <ThresholdVisualization />
        </section>

        {/* Unifying Framework */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">The Unifying Pattern</h2>
          <UnifyingFramework />
        </section>

        {/* Human Analogy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Making It Human</h2>
          <HumanAnalogy />
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Key Takeaways</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">1.</span>
              <p className="text-gray-300">
                <strong className="text-white">Meta-cognition is not optional.</strong> Any system that needs reliable behavior must be able to check its own state before acting. This applies to identity, economics, trust, and honesty.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">2.</span>
              <p className="text-gray-300">
                <strong className="text-white">Convergent failure proves the principle.</strong> SAGE identity collapse and pricing agent death had the same root cause: missing feedback loops. Independent discovery validates the framework.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">3.</span>
              <p className="text-gray-300">
                <strong className="text-white">D5 gates meta-cognitive capability.</strong> Below 0.5, agents cannot reliably self-monitor. Above 0.7, positive identity and honest reporting emerge. The threshold is quantifiable.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">4.</span>
              <p className="text-gray-300">
                <strong className="text-white">Capacity enables effortless feedback.</strong> At 14B, meta-cognition emerges spontaneously. At 0.5B, it requires explicit engineering. The loop is the same; the effort differs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">5.</span>
              <p className="text-gray-300">
                <strong className="text-white">Web4 encodes this as architecture.</strong> LCT (cryptographic identity), ATP (metabolic awareness), CI (coherence monitoring), and Karma (consequence tracking) are all feedback loops made structural.
              </p>
            </div>
          </div>
        </section>

        {/* Research Provenance */}
        <section className="mb-8 text-sm text-gray-500">
          <p>
            This framework emerged from Web4 Session #31 (January 2026), where two independent failure analyses -
            SAGE identity collapse (S043) and coherence pricing agent ATP depletion - converged on the same root cause.
            The D5 threshold hierarchy was validated through Thor&apos;s R14B_001 capacity comparison and Sprout&apos;s
            S001-S044 longitudinal data. Cross-pollinated from Web4 grounding, Thor SAGE raising, and Sprout 0.5B exploration.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/understanding-consciousness"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Trust Continuity &rarr;
          </Link>
          <Link
            href="/coherence-index"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Coherence Index &rarr;
          </Link>
          <Link
            href="/honest-reporting"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Honest Reporting &rarr;
          </Link>
        </div>

        <RelatedConcepts currentPath="/meta-cognition-feedback" />
      </div>
    </div>
  );
}
