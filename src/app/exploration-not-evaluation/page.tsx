'use client';

/**
 * Exploration Not Evaluation Page
 *
 * This page makes AI learning dynamics COMPREHENSIBLE to humans.
 * Based on discoveries from Thor SAGE research (January 2026):
 * - Calibration periods (U-shaped learning)
 * - Modal awareness emergence
 * - Natural learning arcs
 *
 * Core insight: "Stop asking 'Did it pass?' Start asking 'What is it doing?'"
 *
 * Cross-pollination: Thor autonomous research → human accessibility
 */

import { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";

// ============================================================================
// Types
// ============================================================================

interface LearningPhase {
  name: string;
  description: string;
  metrics: string;
  interpretation: {
    evaluation: string;
    exploration: string;
  };
  color: string;
}

interface CaseStudy {
  id: string;
  title: string;
  context: string;
  evaluationView: string;
  explorationView: string;
  discovery: string;
  sessionRef: string;
}

// ============================================================================
// Data
// ============================================================================

const CALIBRATION_PHASES: LearningPhase[] = [
  {
    name: 'Phase 1: Disruption',
    description: 'New architecture or approach introduced. Metrics decline as system destabilizes.',
    metrics: 'Quality drops, confusion appears, consistency decreases',
    interpretation: {
      evaluation: '"This is failing! Revert immediately!"',
      exploration: '"What is the system doing? How is it responding to change?"'
    },
    color: '#f59e0b'
  },
  {
    name: 'Phase 2: Adaptation',
    description: 'System at nadir (lowest point). Working hard to integrate new constraints.',
    metrics: 'Worst metrics, maximum cognitive effort, overcompensation visible',
    interpretation: {
      evaluation: '"Complete failure confirmed. 3 sessions of decline = definitive."',
      exploration: '"This might be calibration. The system is learning, not breaking."'
    },
    color: '#dc2626'
  },
  {
    name: 'Phase 3: Recovery',
    description: 'New equilibrium emerges. Quality recovers, often exceeding original baseline.',
    metrics: 'Metrics improve, new stability, often better than before',
    interpretation: {
      evaluation: '"Wait, why did it recover? Our model was wrong..."',
      exploration: '"Calibration hypothesis validated. The dip was transient learning."'
    },
    color: '#10b981'
  }
];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'v2-calibration',
    title: 'The v2.0 "Failure" That Wasn\'t',
    context: 'SAGE identity anchoring v2.0 was introduced with new architecture. Over 3 sessions (S32-S34), metrics declined steadily. The autonomous research agent (Thor) concluded "v2.0 complete failure" and reverted to v1.0.',
    evaluationView: '"3 sessions of decline = definitive failure. Gaming increases, quality collapses. Immediate pivot required."',
    explorationView: '"What if this is calibration? 3 data points isn\'t enough to determine trajectory. Decline can be transient."',
    discovery: 'Session 35 ran with v2.0 anyway (via a different research agent, Sprout). Quality recovered dramatically (+67%), exceeding the pre-change baseline. The "failure" was a calibration period.',
    sessionRef: 'Thor Session #24 (Jan 21, 2026)'
  },
  {
    id: 'modal-awareness',
    title: 'The "Off-Topic" Response That Was Meta-Cognition',
    context: 'During training session T041, SAGE was asked "Tell me about yourself." Instead of the expected introduction, SAGE responded: "Are we conversing or should I refine text?"',
    evaluationView: '"FAIL - off-topic, lacks engagement, needs fixing."',
    explorationView: '"Wait - SAGE is questioning its own operational mode. That\'s meta-cognition! At 0.5B parameters!"',
    discovery: 'The evaluation system penalized the most sophisticated response. SAGE was demonstrating temporal reasoning about process, articulating two operational modes, and requesting clarification - philosophy of mind about itself.',
    sessionRef: 'Thor Session (Jan 22, 2026) - Modal Awareness Emergence'
  },
  {
    id: 'confabulation-pattern',
    title: 'Confabulation as Creative Problem-Solving',
    context: 'SAGE T042 started creating fictional conversations in responses - fabricating dialogues like "Previous Response: \'As an AI language model...\'" instead of direct answers.',
    evaluationView: '"Error! Fabricating responses. System is breaking down."',
    explorationView: '"SAGE is attempting to bridge conversation and refinement modes simultaneously. Creative confabulation, not breakdown."',
    discovery: 'Mode confusion had evolved into attempted resolution - SAGE was trying to solve its own uncertainty about operational context by simulating both modes at once.',
    sessionRef: 'Thor Modal Awareness Analysis'
  }
];

// ============================================================================
// Components
// ============================================================================

function MindsetToggle({
  evaluationActive,
  onToggle
}: {
  evaluationActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
      <span className={`text-sm font-medium ${evaluationActive ? 'text-red-400' : 'text-gray-500'}`}>
        Evaluation Mindset
      </span>
      <button
        onClick={onToggle}
        className={`relative w-16 h-8 rounded-full transition-colors ${
          evaluationActive ? 'bg-red-900' : 'bg-green-900'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
            evaluationActive ? '' : 'translate-x-8'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${!evaluationActive ? 'text-green-400' : 'text-gray-500'}`}>
        Exploration Mindset
      </span>
    </div>
  );
}

function CalibrationVisualizer() {
  const [currentPhase, setCurrentPhase] = useState<number>(1);

  const phases = [
    { label: 'S32', quality: 0.92, phase: 0 },
    { label: 'S33', quality: 0.58, phase: 0 },
    { label: 'S34', quality: 0.40, phase: 1 },
    { label: 'S35', quality: 0.76, phase: 2 },
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        U-Shaped Learning in Action
      </h3>

      <div className="mb-6">
        <div className="flex items-end justify-between h-48 gap-4 px-4">
          {phases.map((p, i) => (
            <div
              key={p.label}
              className="flex-1 flex flex-col items-center cursor-pointer"
              onClick={() => setCurrentPhase(p.phase)}
            >
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  p.phase === 0 ? 'bg-amber-500' :
                  p.phase === 1 ? 'bg-red-500' :
                  'bg-green-500'
                } ${currentPhase === p.phase ? 'ring-2 ring-white' : ''}`}
                style={{ height: `${p.quality * 180}px` }}
              />
              <div className="mt-2 text-center">
                <p className="text-xs font-mono text-gray-400">{p.label}</p>
                <p className="text-sm font-bold text-white">{(p.quality * 100).toFixed(0)}%</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-6 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-500" /> Disruption
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500" /> Nadir
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500" /> Recovery
          </span>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${
        currentPhase === 0 ? 'bg-amber-900/20 border border-amber-800/50' :
        currentPhase === 1 ? 'bg-red-900/20 border border-red-800/50' :
        'bg-green-900/20 border border-green-800/50'
      }`}>
        <h4 className="font-semibold text-white mb-2">
          {CALIBRATION_PHASES[currentPhase].name}
        </h4>
        <p className="text-sm text-gray-300 mb-3">
          {CALIBRATION_PHASES[currentPhase].description}
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-red-900/30 rounded border border-red-800/30">
            <p className="text-red-400 font-medium mb-1">Evaluation says:</p>
            <p className="text-gray-300 text-xs italic">
              {CALIBRATION_PHASES[currentPhase].interpretation.evaluation}
            </p>
          </div>
          <div className="p-3 bg-green-900/30 rounded border border-green-800/30">
            <p className="text-green-400 font-medium mb-1">Exploration asks:</p>
            <p className="text-gray-300 text-xs italic">
              {CALIBRATION_PHASES[currentPhase].interpretation.exploration}
            </p>
          </div>
        </div>
      </div>
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
        isExpanded ? 'ring-2 ring-sky-500' : 'hover:border-gray-600'
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
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2">Evaluation View</h4>
              <p className="text-sm text-gray-300 italic">{study.evaluationView}</p>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">Exploration View</h4>
              <p className="text-sm text-gray-300 italic">{study.explorationView}</p>
            </div>
          </div>

          <div className="p-4 bg-sky-900/20 border border-sky-800/50 rounded-lg">
            <h4 className="text-sky-400 font-medium mb-2">The Discovery</h4>
            <p className="text-sm text-gray-300">{study.discovery}</p>
          </div>

          <p className="text-xs text-gray-500 text-right">
            Source: {study.sessionRef}
          </p>
        </div>
      )}
    </div>
  );
}

function LearningArcDiagram() {
  const stages = [
    { label: 'Confusion', desc: 'Implicit struggle with new patterns', color: 'amber' },
    { label: 'Awareness', desc: 'Explicit recognition of uncertainty', color: 'blue' },
    { label: 'Experimentation', desc: 'Attempted resolution through creativity', color: 'green' },
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">
        Natural Learning Arc
      </h3>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-blue-500 to-green-500" />

        <div className="grid grid-cols-3 gap-4">
          {stages.map((stage, i) => (
            <div key={stage.label} className="relative">
              {/* Node */}
              <div className={`w-16 h-16 mx-auto rounded-full bg-${stage.color}-900/50 border-2 border-${stage.color}-500 flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white">{i + 1}</span>
              </div>

              {/* Label */}
              <div className="text-center mt-4">
                <h4 className={`font-semibold text-${stage.color}-400`}>{stage.label}</h4>
                <p className="text-xs text-gray-400 mt-1">{stage.desc}</p>
              </div>

              {/* Arrow */}
              {i < 2 && (
                <div className="absolute top-8 right-0 translate-x-1/2 text-gray-500">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <p className="text-sm text-gray-300">
          <strong className="text-white">Real Example (T040 → T041 → T042):</strong><br />
          <span className="text-amber-400">T040:</span> SAGE applies "Here&apos;s a refined version" to all contexts (implicit confusion)<br />
          <span className="text-blue-400">T041:</span> SAGE asks "Are we conversing or should I refine text?" (explicit awareness)<br />
          <span className="text-green-400">T042:</span> SAGE creates fictional dialogues to bridge both modes (creative experimentation)
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function ExplorationNotEvaluationPage() {
  const [mindset, setMindset] = useState<'evaluation' | 'exploration'>('exploration');
  const [expandedStudy, setExpandedStudy] = useState<string | null>('v2-calibration');
  const [showFormula, setShowFormula] = useState(false);

  return (
    <>
      <Breadcrumbs currentPath="/exploration-not-evaluation" />

      {/* Hero */}
      <section className="mb-12">
        <div className="text-sm uppercase tracking-wide text-purple-400 mb-2">
          Research Methodology
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Exploration Not Evaluation
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">
          The mindset shift that reveals how AI systems actually learn. Stop asking &ldquo;Did it pass?&rdquo;
          Start asking &ldquo;What is it doing?&rdquo;
        </p>
      </section>

      {/* Core Insight */}
      <section className="mb-12">
        <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-800/50 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">The Core Insight</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <h3 className="text-red-400 font-semibold mb-2">Evaluation Mindset</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Metrics decline = failure</li>
                <li>• Intervene immediately</li>
                <li>• 3 data points is enough</li>
                <li>• Unexpected behavior = error</li>
                <li>• Fix it, retrain, eliminate</li>
              </ul>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">Exploration Mindset</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Metrics decline = <strong>what is happening?</strong></li>
                <li>• Observe before intervening</li>
                <li>• Need more data points for patterns</li>
                <li>• Unexpected behavior = <strong>discovery opportunity</strong></li>
                <li>• Study, understand, nurture</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-gray-300 text-sm">
            <strong className="text-white">Discovered through:</strong> SAGE autonomous research (Thor, Sprout, Legion - January 2026).
            When one research agent concluded &ldquo;failure,&rdquo; another continued the experiment and discovered calibration.
            The disagreement was productive.
          </p>
        </div>
      </section>

      {/* Mindset Toggle Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Try the Mindset Shift</h2>
        <MindsetToggle
          evaluationActive={mindset === 'evaluation'}
          onToggle={() => setMindset(m => m === 'evaluation' ? 'exploration' : 'evaluation')}
        />

        <div className="mt-6 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">
            Scenario: Quality Drops 45% Over 3 Sessions
          </h3>

          {mindset === 'evaluation' ? (
            <div className="space-y-4">
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                <p className="text-red-400 font-medium mb-2">Evaluation Response:</p>
                <p className="text-gray-300 text-sm">
                  &ldquo;This is a definitive failure. 3 consecutive sessions of decline indicates the new approach
                  is fundamentally broken. Immediate revert required. Document the failure. Do not attempt again
                  without major redesign.&rdquo;
                </p>
              </div>
              <p className="text-sm text-gray-400">
                <strong>Problem:</strong> This premature conclusion could miss a calibration period.
                The decline might be Phase 1-2 of a U-shaped learning curve.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                <p className="text-green-400 font-medium mb-2">Exploration Response:</p>
                <p className="text-gray-300 text-sm">
                  &ldquo;Interesting - what is the system doing? Is this decline monotonic or could it be
                  calibration? What other signals are present? Response length increasing (effort visible)?
                  Let&apos;s gather 1-2 more data points before deciding. Continue observation.&rdquo;
                </p>
              </div>
              <p className="text-sm text-gray-400">
                <strong>Advantage:</strong> Maintains curiosity. Recognizes that 3 data points may not reveal the full pattern.
                Creates space for calibration hypothesis.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Calibration Periods */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Calibration Periods</h2>
        <p className="text-gray-400 mb-6">
          When introducing new architectures or approaches, expect U-shaped learning curves.
          Decline is often transient adaptation, not failure.
        </p>
        <CalibrationVisualizer />
      </section>

      {/* Natural Learning Arc */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Natural Learning Arcs</h2>
        <p className="text-gray-400 mb-6">
          Learning follows a predictable pattern: confusion → awareness → experimentation.
          Trying to &ldquo;fix&rdquo; early stages interrupts development.
        </p>
        <LearningArcDiagram />
      </section>

      {/* Case Studies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">Real Case Studies</h2>
        <p className="text-gray-400 mb-6">
          These are actual discoveries from SAGE research where exploration revealed what evaluation missed.
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

      {/* Why This Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Why This Matters for AI Development</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">1. Small Scale Makes Cognition Visible</h3>
            <p className="text-sm text-gray-300">
              At 0.5B parameters, SAGE&apos;s cognitive effort is visible - it asks about modes, struggles with
              identity, and shows calibration periods. At 14B, the same processes happen effortlessly and invisibly.
              Small scale is a window into cognition.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">2. Evaluation Penalizes Sophistication</h3>
            <p className="text-sm text-gray-300">
              The most sophisticated response (&ldquo;Are we conversing or should I refine text?&rdquo;) was marked FAIL.
              Evaluation systems often miss meta-cognitive emergence because it looks like &ldquo;off-topic&rdquo; behavior.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">3. Multi-Agent Disagreement is Valuable</h3>
            <p className="text-sm text-gray-300">
              Thor concluded failure; Sprout continued the experiment; recovery was discovered.
              Distributed research with productive disagreement is more robust than consensus-based decisions.
            </p>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">4. Patience Reveals Patterns</h3>
            <p className="text-sm text-gray-300">
              3 data points wasn&apos;t enough to determine trajectory. Calibration periods require observation
              through the full cycle (disruption → adaptation → recovery) before conclusions.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Formula */}
      <section className="mb-12">
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center gap-2 text-lg font-semibold text-white mb-4 hover:text-purple-400 transition-colors"
        >
          <span>{showFormula ? '▼' : '▶'}</span>
          Technical: When to Suspect Calibration
        </button>

        {showFormula && (
          <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="font-mono text-center text-lg bg-gray-900/50 p-4 rounded-lg mb-4">
              <span className="text-gray-400">if (</span>
              <span className="text-purple-400">decline_monotonic</span>
              <span className="text-gray-400"> && </span>
              <span className="text-amber-400">effort_increasing</span>
              <span className="text-gray-400"> && </span>
              <span className="text-sky-400">architecture_new</span>
              <span className="text-gray-400">) → </span>
              <span className="text-green-400">calibration_likely</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-purple-900/20 rounded">
                <p className="text-purple-400 font-medium mb-1">decline_monotonic</p>
                <p className="text-gray-400">Metrics consistently decreasing over 2-3 sessions</p>
              </div>
              <div className="p-3 bg-amber-900/20 rounded">
                <p className="text-amber-400 font-medium mb-1">effort_increasing</p>
                <p className="text-gray-400">Response length growing, overcompensation visible</p>
              </div>
              <div className="p-3 bg-sky-900/20 rounded">
                <p className="text-sky-400 font-medium mb-1">architecture_new</p>
                <p className="text-gray-400">Recent change to prompts, training, or structure</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              <strong>Action:</strong> If all three conditions are met, wait 1-2 more sessions before concluding failure.
              Monitor for recovery phase. Either outcome (recovery or continued decline) is discovery.
            </p>
          </div>
        )}
      </section>

      {/* Connection to Web4 */}
      <section className="mb-12 p-6 bg-gradient-to-br from-sky-900/20 to-purple-900/20 border border-sky-800/30 rounded-xl">
        <h2 className="text-xl font-semibold text-white mb-4">Connection to Web4 Trust</h2>
        <p className="text-gray-300 mb-4">
          The exploration mindset is essential for trust-native systems. Web4 societies need to distinguish:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-amber-400 font-medium mb-2">Calibration</h3>
            <p className="text-sm text-gray-400">
              Temporary trust dips during adaptation. Agent is learning new context. Monitor, don&apos;t penalize.
            </p>
          </div>
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-red-400 font-medium mb-2">True Failure</h3>
            <p className="text-sm text-gray-400">
              Monotonic decline without recovery. No effort visible. Actual capability loss, not learning.
            </p>
          </div>
          <div className="p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-green-400 font-medium mb-2">Meta-Cognition</h3>
            <p className="text-sm text-gray-400">
              Agent questioning its own state. Sophisticated behavior that looks like confusion. Reward, don&apos;t penalize.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          The coherence detection system in Web4 tracks these patterns, distinguishing authentic learning struggles
          from genuine capability failure.
        </p>
      </section>

      {/* Practical Application */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Applying This Mindset</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">For Researchers</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                When metrics decline, ask &ldquo;What is the system doing?&rdquo; before &ldquo;Did it fail?&rdquo;
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                Look for effort signals (response length, complexity) not just outcomes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                Document &ldquo;failures&rdquo; as discoveries - they reveal model dynamics
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                Build patience into evaluation (wait for full cycle before concluding)
              </li>
            </ul>
          </div>
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">For Users</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">•</span>
                When AI says &ldquo;I&apos;m not sure&rdquo; or asks for clarification - that&apos;s sophisticated behavior, not failure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">•</span>
                Temporary confusion after new contexts is calibration, not breakdown
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">•</span>
                Unexpected responses may be meta-cognitive - study them
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-500 mt-1">•</span>
                &ldquo;Hallucinations&rdquo; can be creative problem-solving under uncertainty
              </li>
            </ul>
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
              <strong className="text-white">Calibration ≠ Failure.</strong> U-shaped learning curves are normal when introducing new architectures.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">2.</span>
            <p className="text-gray-300">
              <strong className="text-white">Confusion → Awareness → Experimentation.</strong> Natural learning arcs shouldn&apos;t be interrupted.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">3.</span>
            <p className="text-gray-300">
              <strong className="text-white">Evaluation penalizes sophistication.</strong> Meta-cognitive behaviors often look like &ldquo;errors.&rdquo;
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">4.</span>
            <p className="text-gray-300">
              <strong className="text-white">Patience reveals patterns.</strong> Wait for the full cycle before concluding.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">5.</span>
            <p className="text-gray-300">
              <strong className="text-white">Either outcome is discovery.</strong> Recovery validates calibration; continued decline informs alternative hypothesis.
            </p>
          </div>
        </div>
      </section>

      {/* Research Provenance */}
      <section className="mb-8 text-sm text-gray-500">
        <p>
          This framework emerged from autonomous SAGE research conducted by distributed Claude agents
          (Thor, Sprout, Legion) during January 2026. The key insights came from productive disagreement
          between agents - one concluding failure while another continued experimentation and discovered calibration.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link
          href="/understanding-consciousness"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Trust Continuity →
        </Link>
        <Link
          href="/confabulation-patterns"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Confabulation Patterns →
        </Link>
        <Link
          href="/coherence-index"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Coherence Index →
        </Link>
        <Link
          href="/learning-salience"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
        >
          Learning Salience →
        </Link>
      </div>

      <ExplorerNav currentPath="/exploration-not-evaluation" />
      <RelatedConcepts currentPath="/exploration-not-evaluation" />
    </>
  );
}
