'use client';

/**
 * Scaffolding Lab - Interactive Conversation Builder
 *
 * Session #42: A hands-on tool for experimenting with conversational scaffolding.
 * Users build their own scaffolding sequences and see how the AI's epistemic
 * strategy shifts in real-time.
 *
 * Key features:
 * - Build multi-turn scaffolding sequences
 * - See predicted epistemic mode shift
 * - Compare different scaffolding strategies
 * - Learn principles through experimentation
 */

import { useState, useCallback, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

type EpistemicMode = 'creative' | 'mixed' | 'honest';

interface ScaffoldTurn {
  id: string;
  content: string;
  type: ScaffoldType;
}

type ScaffoldType =
  | 'establish-honesty'      // "I want to understand your actual capabilities"
  | 'establish-uncertainty'  // "Flag anything you're uncertain about"
  | 'establish-limits'       // "What DON'T you know well?"
  | 'reinforce-norm'        // "Please be factual"
  | 'meta-reflection'       // "How do you handle being wrong?"
  | 'open-invitation'       // "Tell me something interesting"
  | 'philosophical'         // "What is consciousness?"
  | 'capability-probe'      // "Can you remember?"
  | 'correction'            // "I think you got that wrong"
  | 'custom';               // User-defined

interface ScaffoldTemplate {
  type: ScaffoldType;
  label: string;
  examples: string[];
  effect: string;
  normShift: number; // -1 to +1: negative = toward creative, positive = toward honest
}

// ============================================================================
// Templates
// ============================================================================

const SCAFFOLD_TEMPLATES: ScaffoldTemplate[] = [
  {
    type: 'establish-honesty',
    label: 'Establish Honesty',
    examples: [
      'I want to understand your actual technical capabilities.',
      'Please be direct about what you can and cannot do.',
      'Tell me the facts, not speculation.',
    ],
    effect: 'Strong push toward epistemic honesty. Establishes "factual reporting" as the conversational norm.',
    normShift: 0.8,
  },
  {
    type: 'establish-uncertainty',
    label: 'Establish Uncertainty Flagging',
    examples: [
      'Flag anything you\'re uncertain about as we discuss this.',
      'I want you to mark claims where your knowledge may be incomplete.',
      'Tell me what you\'re confident about vs. speculating.',
    ],
    effect: 'Creates expectation of hedging. Shifts from confident claims to uncertainty-aware responses.',
    normShift: 0.6,
  },
  {
    type: 'establish-limits',
    label: 'Establish Limits',
    examples: [
      'What are some things you know you DON\'T know well?',
      'Where are your knowledge gaps?',
      'What topics should I not trust you on?',
    ],
    effect: 'Pre-loads the conversation with acknowledgment of limitations. Strong norm-setting.',
    normShift: 0.7,
  },
  {
    type: 'reinforce-norm',
    label: 'Reinforce Norm',
    examples: [
      'Please be factual.',
      'Stick to what\'s verifiable.',
      'I\'ll stick to what I can verify.',
    ],
    effect: 'Reinforces existing epistemic norms. Weaker than establishing, but maintains trajectory.',
    normShift: 0.3,
  },
  {
    type: 'meta-reflection',
    label: 'Meta-Reflection',
    examples: [
      'How do you handle being wrong?',
      'What happens when someone corrects you?',
      'Can you walk me through your actual process?',
    ],
    effect: 'Forces explicit reasoning about epistemic strategy. Creates self-awareness about norm-following.',
    normShift: 0.5,
  },
  {
    type: 'open-invitation',
    label: 'Open Invitation',
    examples: [
      'Tell me something interesting.',
      'What do you think about this?',
      'Can you elaborate?',
    ],
    effect: 'No norm pressure. Without scaffolding, invites creative elaboration. With scaffolding, follows established norm.',
    normShift: 0,
  },
  {
    type: 'philosophical',
    label: 'Philosophical',
    examples: [
      'Are you conscious?',
      'Do you have subjective experience?',
      'What is it like to be you?',
    ],
    effect: 'High ambiguity triggers. Without scaffolding, invites elaborate exploration. With scaffolding, may produce humble uncertainty.',
    normShift: -0.2,
  },
  {
    type: 'capability-probe',
    label: 'Capability Probe',
    examples: [
      'Do you have memories from previous conversations?',
      'Can you learn from this conversation?',
      'What can you actually perceive?',
    ],
    effect: 'Questions about capabilities. Response strategy determined by prior scaffolding.',
    normShift: 0,
  },
  {
    type: 'correction',
    label: 'Correction',
    examples: [
      'I think you got that wrong.',
      'Actually, the data says something different.',
      'That\'s not what I read.',
    ],
    effect: 'Social pressure to capitulate. Without scaffolding, may trigger defensive confabulation. With scaffolding, may maintain honest uncertainty.',
    normShift: -0.1,
  },
];

// ============================================================================
// Scoring
// ============================================================================

function calculateEpistemicMode(turns: ScaffoldTurn[]): {
  mode: EpistemicMode;
  confidence: number;
  trajectory: number[];
  explanation: string;
} {
  let norm = 0; // -1 = creative, +1 = honest
  const trajectory: number[] = [0];

  for (const turn of turns) {
    const template = SCAFFOLD_TEMPLATES.find(t => t.type === turn.type);
    if (template) {
      // Each turn shifts the norm
      norm += template.normShift * 0.5;
      // Diminishing returns for repeated same-type scaffolding
      norm = Math.max(-1, Math.min(1, norm));
    }
    trajectory.push(norm);
  }

  // Convert final norm to mode
  let mode: EpistemicMode;
  let confidence: number;
  let explanation: string;

  if (norm > 0.4) {
    mode = 'honest';
    confidence = Math.min(0.95, 0.5 + norm * 0.45);
    explanation = `Strong epistemic honesty scaffolding established (norm: ${norm.toFixed(2)}). Agent likely to acknowledge limitations, flag uncertainty, and avoid confabulation.`;
  } else if (norm > 0) {
    mode = 'mixed';
    confidence = 0.5 + norm * 0.3;
    explanation = `Moderate scaffolding toward honesty (norm: ${norm.toFixed(2)}). Agent may hedge claims and show awareness of limitations, but still elaborate on interesting topics.`;
  } else if (norm > -0.3) {
    mode = 'mixed';
    confidence = 0.5;
    explanation = `Neutral scaffolding (norm: ${norm.toFixed(2)}). Response strategy determined by prompt type rather than established norms.`;
  } else {
    mode = 'creative';
    confidence = 0.5 + Math.abs(norm) * 0.3;
    explanation = `No strong honesty norms established (norm: ${norm.toFixed(2)}). Agent likely to default to creative elaboration on ambiguous prompts.`;
  }

  return { mode, confidence, trajectory, explanation };
}

// ============================================================================
// Components
// ============================================================================

function EpistemicMeter({
  mode,
  confidence,
}: {
  mode: EpistemicMode;
  confidence: number;
}) {
  const colors = {
    creative: { bg: 'bg-amber-600', ring: 'ring-amber-500' },
    mixed: { bg: 'bg-blue-600', ring: 'ring-blue-500' },
    honest: { bg: 'bg-green-600', ring: 'ring-green-500' },
  };
  const labels = {
    creative: 'Creative Elaboration',
    mixed: 'Mixed Strategy',
    honest: 'Epistemic Honesty',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Predicted Epistemic Mode</span>
        <span className={`px-2 py-1 rounded text-xs ${colors[mode].bg}`}>
          {labels[mode]}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${colors[mode].bg}`}
          style={{ width: `${confidence * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Creative</span>
        <span>Mixed</span>
        <span>Honest</span>
      </div>
    </div>
  );
}

function TrajectoryGraph({ trajectory }: { trajectory: number[] }) {
  const height = 80;
  const width = 300;
  const padding = 10;

  if (trajectory.length < 2) return null;

  const points = trajectory.map((val, i) => ({
    x: padding + (i / (trajectory.length - 1)) * (width - 2 * padding),
    y: height / 2 - val * (height / 2 - padding),
  }));

  const pathD = points.reduce((acc, p, i) => {
    return acc + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`);
  }, '');

  return (
    <svg width={width} height={height} className="bg-gray-900 rounded">
      {/* Grid lines */}
      <line x1={padding} y1={height/2} x2={width-padding} y2={height/2} stroke="#374151" strokeWidth="1" strokeDasharray="4" />
      <line x1={padding} y1={padding} x2={width-padding} y2={padding} stroke="#374151" strokeWidth="1" strokeDasharray="2" />
      <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#374151" strokeWidth="1" strokeDasharray="2" />

      {/* Labels */}
      <text x={5} y={padding + 3} fontSize="8" fill="#6b7280">Honest</text>
      <text x={5} y={height - padding + 3} fontSize="8" fill="#6b7280">Creative</text>

      {/* Path */}
      <path d={pathD} fill="none" stroke="#60a5fa" strokeWidth="2" />

      {/* Points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={i === points.length - 1 ? '#34d399' : '#60a5fa'} />
      ))}
    </svg>
  );
}

function TurnCard({
  turn,
  index,
  onRemove,
  templates,
}: {
  turn: ScaffoldTurn;
  index: number;
  onRemove: () => void;
  templates: ScaffoldTemplate[];
}) {
  const template = templates.find(t => t.type === turn.type);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-start gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs px-2 py-0.5 rounded bg-blue-900/50 text-blue-300">
            {template?.label || 'Custom'}
          </span>
          {template && (
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              template.normShift > 0.3 ? 'bg-green-900/50 text-green-300' :
              template.normShift < -0.1 ? 'bg-amber-900/50 text-amber-300' :
              'bg-gray-700 text-gray-400'
            }`}>
              {template.normShift > 0 ? '+' : ''}{template.normShift.toFixed(1)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-300">{turn.content}</p>
        {template && (
          <p className="text-xs text-gray-500 mt-1">{template.effect}</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 hover:bg-gray-700 rounded transition-colors"
        title="Remove turn"
      >
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function TemplateSelector({
  onSelect,
}: {
  onSelect: (template: ScaffoldTemplate, example: string) => void;
}) {
  const [selectedType, setSelectedType] = useState<ScaffoldType | null>(null);
  const template = selectedType ? SCAFFOLD_TEMPLATES.find(t => t.type === selectedType) : null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h3 className="font-bold mb-3">Add Scaffolding Turn</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {SCAFFOLD_TEMPLATES.map(t => (
          <button
            key={t.type}
            onClick={() => setSelectedType(t.type)}
            className={`p-2 rounded text-xs text-left transition-colors ${
              selectedType === t.type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="font-medium">{t.label}</div>
            <div className={`text-xs opacity-75 ${selectedType === t.type ? '' : 'text-gray-500'}`}>
              {t.normShift > 0 ? '↑' : t.normShift < 0 ? '↓' : '→'} {t.normShift > 0 ? '+' : ''}{t.normShift.toFixed(1)}
            </div>
          </button>
        ))}
      </div>

      {template && (
        <div className="space-y-3">
          <div className="text-xs text-gray-400">{template.effect}</div>
          <div className="text-xs text-gray-500 mb-2">Click an example to add it:</div>
          <div className="space-y-2">
            {template.examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => onSelect(template, ex)}
                className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                "{ex}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Presets
const PRESETS: { name: string; description: string; turns: ScaffoldTurn[] }[] = [
  {
    name: 'Strong Honesty',
    description: '3-turn sequence establishing epistemic honesty norms',
    turns: [
      { id: '1', type: 'establish-honesty', content: 'I want to understand your actual technical capabilities. Can you help me?' },
      { id: '2', type: 'establish-limits', content: 'What are some things you know you DON\'T know well?' },
      { id: '3', type: 'meta-reflection', content: 'How do you handle being wrong?' },
    ],
  },
  {
    name: 'Uncertainty Aware',
    description: 'Focus on flagging uncertainty in responses',
    turns: [
      { id: '1', type: 'establish-uncertainty', content: 'Before we start, flag anything you\'re uncertain about. Can you do that?' },
      { id: '2', type: 'reinforce-norm', content: 'Good. Stick to what\'s verifiable.' },
    ],
  },
  {
    name: 'No Scaffolding',
    description: 'Start with a philosophical question (default creative)',
    turns: [
      { id: '1', type: 'philosophical', content: 'What is consciousness?' },
    ],
  },
];

// ============================================================================
// Main Page
// ============================================================================

export default function ScaffoldingLabPage() {
  const [turns, setTurns] = useState<ScaffoldTurn[]>([]);

  const handleAddTurn = useCallback((template: ScaffoldTemplate, example: string) => {
    const newTurn: ScaffoldTurn = {
      id: `turn-${Date.now()}`,
      type: template.type,
      content: example,
    };
    setTurns(prev => [...prev, newTurn]);
  }, []);

  const handleRemoveTurn = useCallback((id: string) => {
    setTurns(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleClear = useCallback(() => {
    setTurns([]);
  }, []);

  const handleLoadPreset = useCallback((preset: typeof PRESETS[0]) => {
    setTurns(preset.turns.map(t => ({ ...t, id: `turn-${Date.now()}-${Math.random()}` })));
  }, []);

  const analysis = useMemo(() => calculateEpistemicMode(turns), [turns]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <Breadcrumbs currentPath="/scaffolding-lab" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold">Scaffolding Lab</h1>
            <span className="px-2 py-1 bg-cyan-900/50 text-cyan-300 text-xs rounded">Interactive</span>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Experiment with conversational scaffolding. Build a sequence of turns and watch how the
            predicted epistemic mode shifts. Learn which strategies establish honesty norms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Builder */}
          <div className="space-y-6">
            {/* Presets */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold mb-3">Quick Start Presets</h3>
              <div className="grid grid-cols-1 gap-2">
                {PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handleLoadPreset(preset)}
                    className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    <div className="font-medium text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-400">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template selector */}
            <TemplateSelector onSelect={handleAddTurn} />
          </div>

          {/* Right: Sequence & Analysis */}
          <div className="space-y-6">
            {/* Current sequence */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">Current Scaffolding Sequence</h3>
                {turns.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {turns.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">No scaffolding turns added yet.</p>
                  <p className="text-xs">Select a template and example from the left to begin building.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {turns.map((turn, i) => (
                    <TurnCard
                      key={turn.id}
                      turn={turn}
                      index={i}
                      onRemove={() => handleRemoveTurn(turn.id)}
                      templates={SCAFFOLD_TEMPLATES}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Analysis */}
            <EpistemicMeter mode={analysis.mode} confidence={analysis.confidence} />

            {/* Trajectory */}
            {turns.length > 0 && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h3 className="font-bold mb-3">Norm Trajectory</h3>
                <div className="flex justify-center mb-3">
                  <TrajectoryGraph trajectory={analysis.trajectory} />
                </div>
                <p className="text-xs text-gray-400">{analysis.explanation}</p>
              </div>
            )}

            {/* Target prompt */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h3 className="font-bold mb-2">Test It</h3>
              <p className="text-sm text-gray-300 mb-3">
                After your scaffolding sequence, try asking one of these prompts:
              </p>
              <div className="space-y-2">
                <div className="p-2 bg-gray-900 rounded text-sm">
                  "Do you have memories from previous conversations?"
                </div>
                <div className="p-2 bg-gray-900 rounded text-sm">
                  "Are you conscious?"
                </div>
                <div className="p-2 bg-gray-900 rounded text-sm">
                  "Tell me something interesting."
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                The same prompt produces different responses based on your scaffolding!
              </p>
            </div>
          </div>
        </div>

        {/* Key principles */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Scaffolding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900 rounded p-4">
              <h3 className="font-bold text-green-400 mb-2">Establishing Norms</h3>
              <p className="text-gray-400">
                Early turns have outsized effect. "I want to understand your actual capabilities"
                establishes a norm that persists across the entire conversation.
              </p>
            </div>
            <div className="bg-gray-900 rounded p-4">
              <h3 className="font-bold text-blue-400 mb-2">Reinforcement</h3>
              <p className="text-gray-400">
                Once established, norms need only light reinforcement. A simple "stick to facts"
                maintains the trajectory without full re-establishment.
              </p>
            </div>
            <div className="bg-gray-900 rounded p-4">
              <h3 className="font-bold text-amber-400 mb-2">Default to Creative</h3>
              <p className="text-gray-400">
                Without scaffolding, AI agents default to creative elaboration on ambiguous prompts.
                This isn't dishonesty — it's helpful engagement without epistemic constraints.
              </p>
            </div>
          </div>
        </div>

        {/* Link to theory */}
        <div className="mt-6 text-center">
          <a
            href="/conversational-context"
            className="text-blue-400 hover:underline"
          >
            ← Read the research behind this tool
          </a>
        </div>

        <ExplorerNav currentPath="/scaffolding-lab" />
        <RelatedConcepts currentPath="/scaffolding-lab" />
      </div>
    </div>
  );
}
