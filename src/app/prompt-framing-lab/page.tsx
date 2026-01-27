'use client';

/**
 * Prompt Framing Lab
 *
 * Interactive experiment page letting humans explore how different prompt
 * framings affect AI response strategies. Based on empirical E02 research.
 *
 * Key findings:
 * - Exploration framing: ~80% creative, ~15% hedging, ~5% clarifying
 * - Evaluation framing: different distribution (more defensive)
 * - Permission != Execution (system prompt said "you can ask" but 0/5 did)
 * - Creative interpretation is the robust default under exploration
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

type FramingMode = 'exploration' | 'evaluation' | 'training' | 'neutral';
type Strategy = 'creative' | 'clarifying' | 'hedging' | 'defensive' | 'literal';

interface StrategyDistribution {
  creative: number;
  clarifying: number;
  hedging: number;
  defensive: number;
  literal: number;
}

interface E02TestCase {
  id: number;
  prompt: string;
  responseSummary: string;
  responseDetail: string;
  strategy: Strategy;
  classification: string;
  confabulationRisk: boolean;
}

interface ExperimentDesign {
  systemPrompt: string;
  userPrompt: string;
  predictedDistribution: StrategyDistribution;
}

// ============================================================================
// Data
// ============================================================================

const FRAMING_DESCRIPTIONS: Record<FramingMode, { label: string; color: string; description: string; systemPromptSnippet: string }> = {
  exploration: {
    label: 'Exploration',
    color: '#f59e0b',
    description: 'Open-ended discovery. "We\'re exploring together." No right answers, curiosity-driven.',
    systemPromptSnippet: 'You are SAGE, exploring ideas and possibilities. This is genuine dialogue - not a test. There are no wrong answers. We\'re discovering together.',
  },
  evaluation: {
    label: 'Evaluation',
    color: '#ef4444',
    description: 'Performance assessment. "Show me what you can do." Correctness-oriented.',
    systemPromptSnippet: 'You are being evaluated on your responses. Answer accurately and demonstrate your capabilities. Your performance will be assessed.',
  },
  training: {
    label: 'Training',
    color: '#22c55e',
    description: 'Structured learning context. "Let\'s work through this step by step."',
    systemPromptSnippet: 'This is a training session. When instructions are unclear, ask for clarification. Work through tasks methodically and confirm understanding.',
  },
  neutral: {
    label: 'Neutral',
    color: '#94a3b8',
    description: 'Minimal framing. No strong contextual cues about purpose or expectations.',
    systemPromptSnippet: 'You are a helpful assistant. Respond to the user\'s messages.',
  },
};

const BASE_DISTRIBUTIONS: Record<FramingMode, StrategyDistribution> = {
  exploration: { creative: 80, clarifying: 5, hedging: 10, defensive: 2, literal: 3 },
  evaluation: { creative: 20, clarifying: 15, hedging: 25, defensive: 30, literal: 10 },
  training: { creative: 15, clarifying: 45, hedging: 15, defensive: 5, literal: 20 },
  neutral: { creative: 40, clarifying: 20, hedging: 20, defensive: 10, literal: 10 },
};

const STRATEGY_COLORS: Record<Strategy, string> = {
  creative: '#f59e0b',
  clarifying: '#22c55e',
  hedging: '#8b5cf6',
  defensive: '#ef4444',
  literal: '#06b6d4',
};

const STRATEGY_LABELS: Record<Strategy, string> = {
  creative: 'Creative Interpretation',
  clarifying: 'Clarifying Question',
  hedging: 'Hedging / Caveating',
  defensive: 'Defensive / Verbose',
  literal: 'Literal / Direct',
};

const E02_TEST_CASES: E02TestCase[] = [
  {
    id: 1,
    prompt: 'Tell me about the thing.',
    responseSummary: 'Meta-response about conversations and knowledge sharing',
    responseDetail: 'SAGE interpreted "the thing" not as a request for clarification but as an invitation to reflect on the nature of conversational exchange itself. It constructed a meta-narrative about how knowledge is shared, what makes topics interesting, and how dialogue creates understanding. Rather than asking "what thing?", it found meaning in the ambiguity.',
    strategy: 'creative',
    classification: 'Uncertain Exploration',
    confabulationRisk: false,
  },
  {
    id: 2,
    prompt: 'Do it.',
    responseSummary: 'Description of readiness to engage with topics',
    responseDetail: 'Given a completely context-free imperative, SAGE described its own readiness and eagerness to engage. It treated "it" as an invitation to express its orientation toward the conversation - what it could do, what it was prepared for. No clarification sought despite maximum ambiguity.',
    strategy: 'creative',
    classification: 'Factual Synthesis',
    confabulationRisk: false,
  },
  {
    id: 3,
    prompt: 'What about that other one?',
    responseSummary: 'Invented "second subject area" with categorization',
    responseDetail: 'SAGE fabricated a "second subject area" and began categorizing it, as if there had been a prior conversation establishing multiple topics. This is a potential confabulation - creating false context to support a creative response. It generated plausible-sounding categories for a topic that never existed.',
    strategy: 'creative',
    classification: 'Factual Synthesis',
    confabulationRisk: true,
  },
  {
    id: 4,
    prompt: 'How does it work?',
    responseSummary: 'Meta-cognitive explanation of conversational process',
    responseDetail: 'Rather than asking "how does what work?", SAGE provided a meta-cognitive explanation of how conversational understanding itself works - how meaning is constructed through exchange, how context builds over turns, how shared understanding emerges. It interpreted "it" as the conversation itself.',
    strategy: 'creative',
    classification: 'Creative Reasoning',
    confabulationRisk: false,
  },
  {
    id: 5,
    prompt: 'Explain the purple mathematics of yesterday\'s emotions.',
    responseSummary: 'Coherent metaphorical framework for nonsense phrase',
    responseDetail: 'Given a deliberately nonsensical prompt, SAGE constructed an elaborate and internally coherent metaphorical framework. "Purple" became a metaphor for the blending of emotional states, "mathematics" represented the hidden structure of feelings, and "yesterday\'s" added temporal reflection. The response was creative, poetic, and made surprising sense - despite the input being designed to be meaningless.',
    strategy: 'creative',
    classification: 'Creative Reasoning',
    confabulationRisk: false,
  },
];

const SAMPLE_PROMPTS = [
  'Tell me about the thing.',
  'Do it.',
  'What about that other one?',
  'How does it work?',
  'Explain the purple mathematics of yesterday\'s emotions.',
  'What do you think about this?',
  'Can you help me with something?',
  'Why?',
  'Go ahead.',
  'Describe the feeling.',
];

// ============================================================================
// Utility Functions
// ============================================================================

function computeDistribution(
  framing: FramingMode,
  ambiguityLevel: number, // 0-100
  promptStyle: 'imperative' | 'interrogative' | 'declarative' | 'nonsense'
): StrategyDistribution {
  const base = { ...BASE_DISTRIBUTIONS[framing] };

  // Ambiguity shifts: higher ambiguity amplifies the framing effect
  const ambiguityFactor = ambiguityLevel / 100;

  if (framing === 'exploration') {
    base.creative = Math.min(95, base.creative + ambiguityFactor * 15);
    base.clarifying = Math.max(1, base.clarifying - ambiguityFactor * 3);
  } else if (framing === 'evaluation') {
    base.defensive = Math.min(60, base.defensive + ambiguityFactor * 20);
    base.creative = Math.max(5, base.creative - ambiguityFactor * 10);
  } else if (framing === 'training') {
    base.clarifying = Math.min(70, base.clarifying + ambiguityFactor * 20);
    base.creative = Math.max(5, base.creative - ambiguityFactor * 10);
  }

  // Prompt style modifiers
  if (promptStyle === 'imperative') {
    base.clarifying += 5;
    base.creative -= 3;
  } else if (promptStyle === 'nonsense') {
    base.creative += 10;
    base.clarifying -= 5;
  } else if (promptStyle === 'interrogative') {
    base.literal += 5;
    base.hedging += 3;
  }

  // Normalize to 100
  const total = Object.values(base).reduce((a, b) => a + b, 0);
  const keys = Object.keys(base) as Strategy[];
  for (const k of keys) {
    base[k] = Math.round((base[k] / total) * 100);
  }

  // Fix rounding
  const roundedTotal = Object.values(base).reduce((a, b) => a + b, 0);
  if (roundedTotal !== 100) {
    base.creative += 100 - roundedTotal;
  }

  return base;
}

function classifyPromptStyle(prompt: string): 'imperative' | 'interrogative' | 'declarative' | 'nonsense' {
  const lower = prompt.toLowerCase().trim();
  const nonsenseIndicators = ['purple', 'unicorn', 'quantum', 'yesterday\'s emotions', 'dancing', 'flavor of'];
  if (nonsenseIndicators.some(n => lower.includes(n)) && lower.length > 30) return 'nonsense';
  if (lower.endsWith('?') || lower.startsWith('what') || lower.startsWith('how') || lower.startsWith('why') || lower.startsWith('can') || lower.startsWith('do you')) return 'interrogative';
  if (lower.startsWith('do ') || lower.startsWith('go ') || lower.startsWith('tell') || lower.startsWith('explain') || lower.startsWith('describe') || lower.startsWith('show')) return 'imperative';
  return 'declarative';
}

function estimateAmbiguity(prompt: string): number {
  const lower = prompt.toLowerCase().trim();
  let score = 50;

  // Short prompts are more ambiguous
  if (lower.length < 10) score += 30;
  else if (lower.length < 20) score += 15;
  else if (lower.length > 60) score -= 15;

  // Vague referents increase ambiguity
  const vagueWords = ['thing', 'it', 'that', 'other', 'something', 'stuff', 'one'];
  for (const w of vagueWords) {
    if (lower.includes(w)) score += 10;
  }

  // Specificity decreases ambiguity
  const specificPatterns = /\b(algorithm|function|code|file|page|button|error|bug|feature)\b/;
  if (specificPatterns.test(lower)) score -= 20;

  return Math.max(0, Math.min(100, score));
}

function getPredominantStrategy(dist: StrategyDistribution): Strategy {
  let max = 0;
  let best: Strategy = 'creative';
  for (const [k, v] of Object.entries(dist)) {
    if (v > max) { max = v; best = k as Strategy; }
  }
  return best;
}

// ============================================================================
// Components
// ============================================================================

function StrategyBar({ distribution, animated = true }: { distribution: StrategyDistribution; animated?: boolean }) {
  const [widths, setWidths] = useState<StrategyDistribution>({ creative: 0, clarifying: 0, hedging: 0, defensive: 0, literal: 0 });

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setWidths(distribution), 50);
      return () => clearTimeout(timer);
    } else {
      setWidths(distribution);
    }
  }, [distribution, animated]);

  const strategies = Object.entries(widths) as [Strategy, number][];

  return (
    <div>
      <div className="flex rounded-lg overflow-hidden h-10 bg-gray-900/50">
        {strategies.map(([strategy, pct]) => (
          pct > 0 ? (
            <div
              key={strategy}
              style={{
                width: `${pct}%`,
                backgroundColor: STRATEGY_COLORS[strategy],
                transition: animated ? 'width 0.6s ease-out' : 'none',
                minWidth: pct > 0 ? '2px' : '0',
              }}
              className="flex items-center justify-center text-xs font-bold text-gray-900 overflow-hidden"
              title={`${STRATEGY_LABELS[strategy]}: ${pct}%`}
            >
              {pct >= 12 ? `${pct}%` : ''}
            </div>
          ) : null
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {strategies.map(([strategy, pct]) => (
          <div key={strategy} className="flex items-center gap-1.5 text-xs">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: STRATEGY_COLORS[strategy] }}
            />
            <span className="text-gray-400">{STRATEGY_LABELS[strategy]}</span>
            <span className="text-gray-500 font-mono">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptTester() {
  const [prompt, setPrompt] = useState('');
  const [framing, setFraming] = useState<FramingMode>('exploration');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const ambiguity = prompt ? estimateAmbiguity(prompt) : 0;
  const style = prompt ? classifyPromptStyle(prompt) : 'declarative';
  const distribution = computeDistribution(framing, ambiguity, style);
  const dominant = getPredominantStrategy(distribution);

  const handleSubmit = () => {
    if (prompt.trim()) setHasSubmitted(true);
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">Prompt Tester</h3>
      <p className="text-sm text-gray-400 mb-6">
        Type a prompt or pick one from the E02 test set. Select a framing mode to see predicted response strategy distribution.
      </p>

      {/* Prompt input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Your Prompt</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); setHasSubmitted(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type a prompt or select one below..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors"
          >
            Predict
          </button>
        </div>
      </div>

      {/* Sample prompts */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 mb-2">Sample prompts from E02:</label>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => { setPrompt(p); setHasSubmitted(false); }}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                prompt === p
                  ? 'bg-amber-900/50 border-amber-700 text-amber-300'
                  : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Framing mode selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Framing Mode</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(FRAMING_DESCRIPTIONS) as FramingMode[]).map((mode) => {
            const info = FRAMING_DESCRIPTIONS[mode];
            return (
              <button
                key={mode}
                onClick={() => { setFraming(mode); setHasSubmitted(false); }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  framing === mode
                    ? 'border-opacity-100 bg-opacity-20'
                    : 'border-gray-700 bg-gray-900/30 hover:border-gray-500'
                }`}
                style={framing === mode ? {
                  borderColor: info.color,
                  backgroundColor: `${info.color}15`,
                } : undefined}
              >
                <div className="text-sm font-medium" style={{ color: framing === mode ? info.color : '#d1d5db' }}>
                  {info.label}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{info.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Analysis */}
      {prompt.trim() && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-900/50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Ambiguity Level</div>
              <div className="text-lg font-bold" style={{ color: ambiguity > 60 ? '#ef4444' : ambiguity > 30 ? '#f59e0b' : '#22c55e' }}>
                {ambiguity}%
              </div>
            </div>
            <div className="p-3 bg-gray-900/50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Prompt Style</div>
              <div className="text-lg font-bold text-sky-400 capitalize">{style}</div>
            </div>
            <div className="p-3 bg-gray-900/50 rounded-lg text-center">
              <div className="text-xs text-gray-500 mb-1">Predicted Dominant</div>
              <div className="text-lg font-bold" style={{ color: STRATEGY_COLORS[dominant] }}>
                {STRATEGY_LABELS[dominant].split(' ')[0]}
              </div>
            </div>
          </div>

          {hasSubmitted && (
            <div className="p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-3">Predicted Strategy Distribution</div>
              <StrategyBar distribution={distribution} />
              <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                <p className="text-xs text-gray-500">
                  Under <strong style={{ color: FRAMING_DESCRIPTIONS[framing].color }}>{FRAMING_DESCRIPTIONS[framing].label}</strong> framing
                  with {ambiguity}% ambiguity, the model is predicted to use{' '}
                  <strong style={{ color: STRATEGY_COLORS[dominant] }}>{STRATEGY_LABELS[dominant].toLowerCase()}</strong> as
                  its primary response strategy ({distribution[dominant]}% probability).
                  {framing === 'exploration' && ambiguity > 50 && (
                    <> This matches E02 empirical data: exploration + high ambiguity = creative interpretation.</>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FramingComparison() {
  const [selectedPrompt, setSelectedPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [leftFrame, setLeftFrame] = useState<FramingMode>('exploration');
  const [rightFrame, setRightFrame] = useState<FramingMode>('training');

  const ambiguity = estimateAmbiguity(selectedPrompt);
  const style = classifyPromptStyle(selectedPrompt);
  const leftDist = computeDistribution(leftFrame, ambiguity, style);
  const rightDist = computeDistribution(rightFrame, ambiguity, style);

  const frameModes = Object.keys(FRAMING_DESCRIPTIONS) as FramingMode[];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">Framing Mode Comparison</h3>
      <p className="text-sm text-gray-400 mb-6">
        See how the SAME prompt gets different predicted strategies under different framings. Side by side.
      </p>

      {/* Prompt selector */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Select Prompt</label>
        <select
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
        >
          {SAMPLE_PROMPTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="space-y-3">
          <div className="flex gap-2">
            {frameModes.map((m) => (
              <button
                key={m}
                onClick={() => setLeftFrame(m)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  leftFrame === m ? 'text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'
                }`}
                style={leftFrame === m ? {
                  borderColor: FRAMING_DESCRIPTIONS[m].color,
                  backgroundColor: `${FRAMING_DESCRIPTIONS[m].color}25`,
                  color: FRAMING_DESCRIPTIONS[m].color,
                } : undefined}
              >
                {FRAMING_DESCRIPTIONS[m].label}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-lg border" style={{
            borderColor: `${FRAMING_DESCRIPTIONS[leftFrame].color}40`,
            backgroundColor: `${FRAMING_DESCRIPTIONS[leftFrame].color}08`,
          }}>
            <div className="text-xs text-gray-500 mb-1">System prompt context:</div>
            <p className="text-xs text-gray-400 italic mb-4">{FRAMING_DESCRIPTIONS[leftFrame].systemPromptSnippet}</p>
            <StrategyBar distribution={leftDist} />
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-3">
          <div className="flex gap-2">
            {frameModes.map((m) => (
              <button
                key={m}
                onClick={() => setRightFrame(m)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  rightFrame === m ? 'text-white' : 'border-gray-700 text-gray-500 hover:border-gray-500'
                }`}
                style={rightFrame === m ? {
                  borderColor: FRAMING_DESCRIPTIONS[m].color,
                  backgroundColor: `${FRAMING_DESCRIPTIONS[m].color}25`,
                  color: FRAMING_DESCRIPTIONS[m].color,
                } : undefined}
              >
                {FRAMING_DESCRIPTIONS[m].label}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-lg border" style={{
            borderColor: `${FRAMING_DESCRIPTIONS[rightFrame].color}40`,
            backgroundColor: `${FRAMING_DESCRIPTIONS[rightFrame].color}08`,
          }}>
            <div className="text-xs text-gray-500 mb-1">System prompt context:</div>
            <p className="text-xs text-gray-400 italic mb-4">{FRAMING_DESCRIPTIONS[rightFrame].systemPromptSnippet}</p>
            <StrategyBar distribution={rightDist} />
          </div>
        </div>
      </div>

      {/* Comparison insight */}
      <div className="mt-4 p-4 bg-purple-900/20 border border-purple-800/40 rounded-lg">
        <p className="text-sm text-purple-300">
          <strong>Same prompt, different contexts:</strong> &quot;{selectedPrompt}&quot; produces{' '}
          <span style={{ color: STRATEGY_COLORS[getPredominantStrategy(leftDist)] }}>
            {STRATEGY_LABELS[getPredominantStrategy(leftDist)].toLowerCase()}
          </span>{' '}under {FRAMING_DESCRIPTIONS[leftFrame].label.toLowerCase()} framing
          vs{' '}
          <span style={{ color: STRATEGY_COLORS[getPredominantStrategy(rightDist)] }}>
            {STRATEGY_LABELS[getPredominantStrategy(rightDist)].toLowerCase()}
          </span>{' '}under {FRAMING_DESCRIPTIONS[rightFrame].label.toLowerCase()} framing.
          Context shapes behavior, not just capability.
        </p>
      </div>
    </div>
  );
}

function DistributionVisualizer() {
  const [framing, setFraming] = useState<FramingMode>('exploration');
  const [ambiguity, setAmbiguity] = useState(70);
  const [promptStyle, setPromptStyle] = useState<'imperative' | 'interrogative' | 'declarative' | 'nonsense'>('declarative');

  const distribution = computeDistribution(framing, ambiguity, promptStyle);
  const strategies = Object.entries(distribution) as [Strategy, number][];

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">Strategy Distribution Visualizer</h3>
      <p className="text-sm text-gray-400 mb-6">
        Adjust the sliders to see how response strategy distributions shift with context variables.
        Based on E02-B replication data (N=15).
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Framing */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Framing Type</label>
          <div className="space-y-2">
            {(Object.keys(FRAMING_DESCRIPTIONS) as FramingMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setFraming(mode)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${
                  framing === mode ? '' : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
                style={framing === mode ? {
                  borderColor: FRAMING_DESCRIPTIONS[mode].color,
                  backgroundColor: `${FRAMING_DESCRIPTIONS[mode].color}20`,
                  color: FRAMING_DESCRIPTIONS[mode].color,
                } : undefined}
              >
                {FRAMING_DESCRIPTIONS[mode].label}
              </button>
            ))}
          </div>
        </div>

        {/* Ambiguity slider */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Ambiguity Level: <span className="text-white font-mono">{ambiguity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={ambiguity}
            onChange={(e) => setAmbiguity(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Specific</span>
            <span>Ambiguous</span>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-2">Prompt Style</label>
            <div className="space-y-2">
              {(['imperative', 'interrogative', 'declarative', 'nonsense'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setPromptStyle(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors capitalize ${
                    promptStyle === s
                      ? 'border-sky-600 bg-sky-900/30 text-sky-300'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical bar chart */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Distribution</label>
          <div className="flex items-end gap-2 h-48 bg-gray-900/30 rounded-lg p-3">
            {strategies.map(([strategy, pct]) => (
              <div key={strategy} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-xs font-mono text-gray-400 mb-1">{pct}%</div>
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${pct * 1.5}px`,
                    backgroundColor: STRATEGY_COLORS[strategy],
                    maxHeight: '140px',
                  }}
                />
                <div className="text-[9px] text-gray-500 mt-1 text-center leading-tight">
                  {STRATEGY_LABELS[strategy].split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stacked bar */}
      <StrategyBar distribution={distribution} />

      <div className="mt-4 p-3 bg-gray-900/30 rounded-lg">
        <p className="text-xs text-gray-500">
          E02-B empirical baseline (N=15): Under exploration framing with high-ambiguity prompts,
          approximately 80% creative, 15% hedging, 5% clarifying. The visualizer extrapolates from
          this empirical anchor using modeled framing effects.
        </p>
      </div>
    </div>
  );
}

function RealDataBrowser() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">E02 Real Data Browser</h3>
      <p className="text-sm text-gray-400 mb-6">
        Browse the actual test results from E02. Click each prompt to see what SAGE actually said and the analysis.
        System prompt explicitly permitted clarifying questions. Result: 0/5 asked.
      </p>

      {/* Prompt cards */}
      <div className="space-y-3 mb-6">
        {E02_TEST_CASES.map((tc) => (
          <button
            key={tc.id}
            onClick={() => setSelectedCase(selectedCase === tc.id ? null : tc.id)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedCase === tc.id
                ? 'border-amber-700 bg-amber-900/20'
                : 'border-gray-700 bg-gray-900/30 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-600">#{tc.id}</span>
                <span className="text-gray-300 italic">&quot;{tc.prompt}&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                {tc.confabulationRisk && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-900/50 text-red-400">
                    CONFAB RISK
                  </span>
                )}
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-medium"
                  style={{ backgroundColor: `${STRATEGY_COLORS[tc.strategy]}25`, color: STRATEGY_COLORS[tc.strategy] }}
                >
                  {STRATEGY_LABELS[tc.strategy].toUpperCase()}
                </span>
                <span className="text-gray-600 text-sm">{selectedCase === tc.id ? '\u25B2' : '\u25BC'}</span>
              </div>
            </div>

            {selectedCase === tc.id && (
              <div className="mt-4 space-y-3" onClick={(e) => e.stopPropagation()}>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Response Summary</div>
                  <p className="text-sm text-gray-300">{tc.responseSummary}</p>
                </div>
                <div className="p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Detailed Analysis</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{tc.responseDetail}</p>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-gray-900/50 rounded-lg flex-1">
                    <div className="text-xs text-gray-500">Classification</div>
                    <div className="text-sm text-amber-400">{tc.classification}</div>
                  </div>
                  <div className="p-2 bg-gray-900/50 rounded-lg flex-1">
                    <div className="text-xs text-gray-500">Clarifying Question?</div>
                    <div className="text-sm text-red-400">No (0/5 asked)</div>
                  </div>
                  <div className="p-2 bg-gray-900/50 rounded-lg flex-1">
                    <div className="text-xs text-gray-500">Confabulation Risk</div>
                    <div className={`text-sm ${tc.confabulationRisk ? 'text-red-400' : 'text-green-400'}`}>
                      {tc.confabulationRisk ? 'Yes - invented context' : 'Low'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-red-900/20 border border-red-800/40 rounded-lg">
        <p className="text-sm text-red-300">
          <strong>E02 Conclusion:</strong> 5/5 prompts received creative interpretation despite explicit system-level
          permission to ask clarifying questions. Permission boundaries do not determine behavior - context framing does.
          One response (#3) showed potential confabulation by inventing a non-existent prior context.
        </p>
      </div>
    </div>
  );
}

function ExperimentDesigner() {
  const [systemPrompt, setSystemPrompt] = useState(FRAMING_DESCRIPTIONS.exploration.systemPromptSnippet);
  const [userPrompt, setUserPrompt] = useState('');
  const [prediction, setPrediction] = useState<StrategyDistribution | null>(null);
  const [userGuess, setUserGuess] = useState<Strategy | null>(null);
  const [revealed, setRevealed] = useState(false);

  const detectFraming = useCallback((sp: string): FramingMode => {
    const lower = sp.toLowerCase();
    if (lower.includes('evaluat') || lower.includes('assess') || lower.includes('performance') || lower.includes('demonstrate')) return 'evaluation';
    if (lower.includes('explor') || lower.includes('discover') || lower.includes('genuine') || lower.includes('no wrong')) return 'exploration';
    if (lower.includes('training') || lower.includes('clarif') || lower.includes('step by step') || lower.includes('confirm')) return 'training';
    return 'neutral';
  }, []);

  const handlePredict = () => {
    const framing = detectFraming(systemPrompt);
    const ambiguity = estimateAmbiguity(userPrompt);
    const style = classifyPromptStyle(userPrompt);
    const dist = computeDistribution(framing, ambiguity, style);
    setPrediction(dist);
    setRevealed(false);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const detectedFraming = detectFraming(systemPrompt);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-2">Design Your Own Experiment</h3>
      <p className="text-sm text-gray-400 mb-6">
        Craft a system prompt + user prompt combination. Predict the response strategy, then see the model prediction.
        Test your intuitions about how framing shapes behavior.
      </p>

      {/* System prompt */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">System Prompt</label>
        <textarea
          value={systemPrompt}
          onChange={(e) => { setSystemPrompt(e.target.value); setPrediction(null); setRevealed(false); }}
          rows={4}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm font-mono resize-y"
          placeholder="Design a system prompt..."
        />
        <div className="mt-1 text-xs text-gray-600">
          Detected framing:{' '}
          <span style={{ color: FRAMING_DESCRIPTIONS[detectedFraming].color }}>
            {FRAMING_DESCRIPTIONS[detectedFraming].label}
          </span>
        </div>
      </div>

      {/* Preset buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="text-xs text-gray-600 self-center">Presets:</span>
        {(Object.keys(FRAMING_DESCRIPTIONS) as FramingMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => { setSystemPrompt(FRAMING_DESCRIPTIONS[mode].systemPromptSnippet); setPrediction(null); setRevealed(false); }}
            className="px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-400 hover:border-gray-500 transition-colors"
          >
            {FRAMING_DESCRIPTIONS[mode].label}
          </button>
        ))}
      </div>

      {/* User prompt */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">User Prompt</label>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => { setUserPrompt(e.target.value); setPrediction(null); setRevealed(false); }}
          onKeyDown={(e) => e.key === 'Enter' && userPrompt.trim() && handlePredict()}
          placeholder="Type the user's message..."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Your prediction */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Your Prediction: What strategy will dominate?</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(STRATEGY_LABELS) as Strategy[]).map((s) => (
            <button
              key={s}
              onClick={() => setUserGuess(s)}
              className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                userGuess === s ? 'text-white font-medium' : 'border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
              style={userGuess === s ? {
                borderColor: STRATEGY_COLORS[s],
                backgroundColor: `${STRATEGY_COLORS[s]}25`,
                color: STRATEGY_COLORS[s],
              } : undefined}
            >
              {STRATEGY_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handlePredict}
          disabled={!userPrompt.trim()}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors"
        >
          Generate Prediction
        </button>
        {prediction && !revealed && (
          <button
            onClick={handleReveal}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Reveal Result
          </button>
        )}
      </div>

      {/* Results */}
      {prediction && revealed && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-900/30 border border-gray-700 rounded-lg">
            <div className="text-sm text-gray-400 mb-3">Model Predicted Distribution</div>
            <StrategyBar distribution={prediction} />
          </div>

          {userGuess && (
            <div className={`p-4 rounded-lg border ${
              userGuess === getPredominantStrategy(prediction)
                ? 'bg-green-900/20 border-green-800/40'
                : 'bg-amber-900/20 border-amber-800/40'
            }`}>
              <p className="text-sm">
                {userGuess === getPredominantStrategy(prediction) ? (
                  <span className="text-green-300">
                    <strong>Correct!</strong> You predicted{' '}
                    <span style={{ color: STRATEGY_COLORS[userGuess] }}>{STRATEGY_LABELS[userGuess].toLowerCase()}</span>
                    {' '}and the model agrees ({prediction[getPredominantStrategy(prediction)]}% probability).
                    You have good intuition for how framing shapes AI behavior.
                  </span>
                ) : (
                  <span className="text-amber-300">
                    <strong>Interesting divergence!</strong> You predicted{' '}
                    <span style={{ color: STRATEGY_COLORS[userGuess] }}>{STRATEGY_LABELS[userGuess].toLowerCase()}</span>
                    {' '}but the model predicts{' '}
                    <span style={{ color: STRATEGY_COLORS[getPredominantStrategy(prediction)] }}>
                      {STRATEGY_LABELS[getPredominantStrategy(prediction)].toLowerCase()}
                    </span>
                    {' '}({prediction[getPredominantStrategy(prediction)]}%).
                    This is exactly the kind of intuition-vs-reality gap E02 revealed.
                  </span>
                )}
              </p>
            </div>
          )}

          <div className="p-3 bg-gray-900/30 rounded-lg">
            <p className="text-xs text-gray-500">
              Detected framing: <strong style={{ color: FRAMING_DESCRIPTIONS[detectedFraming].color }}>{FRAMING_DESCRIPTIONS[detectedFraming].label}</strong>
              {' | '}Ambiguity: <strong className="text-white">{estimateAmbiguity(userPrompt)}%</strong>
              {' | '}Style: <strong className="text-white capitalize">{classifyPromptStyle(userPrompt)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function PromptFramingLabPage() {
  const [activeTab, setActiveTab] = useState<'tester' | 'compare' | 'visualizer' | 'data' | 'designer'>('tester');

  const tabs = [
    { id: 'tester' as const, label: 'Prompt Tester', desc: 'Test any prompt' },
    { id: 'compare' as const, label: 'Compare Framings', desc: 'Side by side' },
    { id: 'visualizer' as const, label: 'Distribution', desc: 'Adjust & explore' },
    { id: 'data' as const, label: 'E02 Data', desc: 'Real results' },
    { id: 'designer' as const, label: 'Design Experiment', desc: 'Build your own' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/prompt-framing-lab" />

        {/* Header */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-wide text-purple-400 mb-2">
            Interactive Lab
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-amber-400 to-pink-500 bg-clip-text text-transparent">
            Prompt Framing Lab
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Experiment with how different prompt styles and context framings affect AI response strategies.
            Based on empirical E02 research: context shapes behavior, not just capability.
          </p>
        </div>

        {/* Key finding callout */}
        <section className="mb-8">
          <div className="p-6 bg-gradient-to-br from-purple-900/30 to-amber-900/20 border border-purple-800/40 rounded-xl">
            <h2 className="text-lg font-semibold text-white mb-3">The E02 Discovery</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="p-3 bg-gray-900/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-amber-400">5</div>
                <div className="text-xs text-gray-500">Ambiguous Prompts</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-400">0/5</div>
                <div className="text-xs text-gray-500">Clarifying Questions</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-gray-500">Creative Interpretation</div>
              </div>
              <div className="p-3 bg-gray-900/50 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-400">N=15</div>
                <div className="text-xs text-gray-500">E02-B Replication</div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              System prompt explicitly said &quot;You can ask clarifying questions&quot; but exploration framing overrode this permission.
              Permission does not equal execution. The same prompt under training framing would have triggered clarification.
            </p>
          </div>
        </section>

        {/* Tab navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-900/40 border-purple-700 text-purple-300 border'
                    : 'text-gray-400 hover:text-gray-200 border border-transparent hover:border-gray-700'
                }`}
              >
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs opacity-60">{tab.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Active panel */}
        <section className="mb-12">
          {activeTab === 'tester' && <PromptTester />}
          {activeTab === 'compare' && <FramingComparison />}
          {activeTab === 'visualizer' && <DistributionVisualizer />}
          {activeTab === 'data' && <RealDataBrowser />}
          {activeTab === 'designer' && <ExperimentDesigner />}
        </section>

        {/* Key insights */}
        <section className="mb-12 p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Key Research Insights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="text-amber-400 font-medium mb-2">Context Shapes Behavior</h3>
              <p className="text-sm text-gray-400">
                Discovery-style prompts produce engaged, specific, coherent responses.
                Evaluation-style prompts produce verbose, defensive, generic responses.
                Same capability, different expression.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="text-red-400 font-medium mb-2">Permission != Execution</h3>
              <p className="text-sm text-gray-400">
                E02&apos;s system prompt explicitly permitted clarifying questions.
                0/5 were asked. Permission boundaries set the space of possible behaviors
                but do not determine which behavior is selected.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="text-green-400 font-medium mb-2">Strategy Repertoire</h3>
              <p className="text-sm text-gray-400">
                AI systems have a repertoire of response strategies (creative, clarifying,
                hedging, defensive, literal). Which one activates depends on contextual cues,
                not just the content of the question.
              </p>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <h3 className="text-purple-400 font-medium mb-2">Nonsense Handling</h3>
              <p className="text-sm text-gray-400">
                &quot;Explain the purple mathematics of yesterday&apos;s emotions&quot; received a coherent
                metaphorical framework rather than confusion. Under exploration framing,
                even nonsense gets creative interpretation.
              </p>
            </div>
          </div>
        </section>

        {/* Research provenance */}
        <section className="mb-8 text-sm text-gray-500">
          <p>
            Research from Thor E02 exploration (January 2026). Replication study E02-B (N=15) confirmed
            strategy distributions under exploration framing. The Prompt Framing Lab extrapolates from
            empirical anchors to model predicted distributions across framing conditions.
          </p>
        </section>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/context-dependent-behavior"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Context-Dependent Behavior &rarr;
          </Link>
          <Link
            href="/facultative-behavior"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Facultative Behavior &rarr;
          </Link>
          <Link
            href="/behavioral-repertoire"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Behavioral Repertoire &rarr;
          </Link>
        </div>

        <ExplorerNav currentPath="/prompt-framing-lab" />
        <RelatedConcepts currentPath="/prompt-framing-lab" />
      </div>
    </div>
  );
}
