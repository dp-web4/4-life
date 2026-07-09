'use client';

/**
 * V3OutputScorer — interactive "score these outputs" mini-interaction.
 *
 * Extracted verbatim from src/app/trust-tensor/page.tsx (Jul-9) when V3 moved to its own
 * page at /value-tensor. The 07-09 visitor filed V3 as "a first-class concept living as a
 * subsection of another concept"; the fix was a dedicated page, not a fourth reword.
 *
 * The scores, weights (0.30/0.35/0.35) and the 0.75-vs-0.33 pair are load-bearing: the
 * niche-research-beats-clickbait number is quoted in the V3 teaser on /trust-tensor. Keep
 * the two surfaces consistent — mismatched constants across pages are exactly the defect
 * class PRs #442/#443 were opened to fix.
 */

import { useState } from 'react';
import { trackConceptInteraction } from '@/lib/exploration';

const V3_OUTPUTS = [
  {
    id: 'thorough-review',
    label: 'Thorough Code Review',
    description: 'Found 3 real bugs, explained each clearly, suggested fixes with test cases.',
    valuation: 0.85,
    veracity: 0.92,
    validity: 0.95,
    insight: 'High across all dimensions — useful, accurate, and well-reasoned. This is how you build trust.',
  },
  {
    id: 'clickbait',
    label: 'Viral Clickbait Article',
    description: '"10 SHOCKING reasons..." Gets 50K views but contains misleading claims and weak arguments.',
    valuation: 0.55,
    veracity: 0.20,
    validity: 0.25,
    insight: 'Some popularity (Valuation) but terrible Veracity and Validity. Web4 weights truth over clicks — this earns less than half what the review earns.',
  },
  {
    id: 'niche-research',
    label: 'Niche Research Paper',
    description: 'Original findings on a narrow topic. Rigorous methodology, 12 citations, reproducible results.',
    valuation: 0.35,
    veracity: 0.95,
    validity: 0.90,
    insight: 'Low immediate popularity but exceptional truth and rigor. Web4 rewards this: V3 score (0.75) beats clickbait (0.33) because Veracity+Validity outweigh Valuation.',
  },
  {
    id: 'copied-answer',
    label: 'Copy-Pasted Answer',
    description: 'Copied someone else\'s solution verbatim without attribution. Works, but not original.',
    valuation: 0.50,
    veracity: 0.30,
    validity: 0.70,
    insight: 'The answer works (decent Validity) but unattributed copying tanks Veracity. Repeated behavior drags T3 Training scores down too.',
  },
  {
    id: 'mentoring',
    label: 'Patient Mentoring Session',
    description: 'Spent an hour helping a newcomer understand trust tensors. They left confident and capable.',
    valuation: 0.90,
    veracity: 0.85,
    validity: 0.88,
    insight: 'Teaching well is high-value work. The mentee\'s improved understanding is measurable value — and it builds your Temperament trust score.',
  },
];

export default function V3OutputScorer() {
  const [selectedOutput, setSelectedOutput] = useState<string | null>(null);
  const [scoredOutputs, setScoredOutputs] = useState<string[]>([]);

  const selected = V3_OUTPUTS.find(o => o.id === selectedOutput);
  const v3Score = selected
    ? (selected.valuation * 0.30 + selected.veracity * 0.35 + selected.validity * 0.35).toFixed(2)
    : null;

  const handleSelect = (id: string) => {
    trackConceptInteraction('value-tensor');
    setSelectedOutput(id);
    if (!scoredOutputs.includes(id)) {
      setScoredOutputs(prev => [...prev, id]);
    }
  };

  const getColor = (v: number) => v >= 0.7 ? 'text-green-400' : v >= 0.45 ? 'text-amber-400' : 'text-red-400';
  const getBarColor = (v: number) => v >= 0.7 ? 'bg-green-500' : v >= 0.45 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Score These Outputs</h3>
      <p className="text-sm text-gray-400 mb-4">Click each output to see how V3 scores it. {scoredOutputs.length > 0 && <span className="text-sky-400">({scoredOutputs.length}/{V3_OUTPUTS.length} scored)</span>}</p>

      <div className="space-y-3">
        {V3_OUTPUTS.map(output => {
          const isSelected = selectedOutput === output.id;
          const isScored = scoredOutputs.includes(output.id);
          const score = output.valuation * 0.30 + output.veracity * 0.35 + output.validity * 0.35;
          return (
            <div key={output.id}>
              <button
                onClick={() => handleSelect(output.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-sky-900/30 border-sky-600'
                    : isScored
                    ? 'bg-gray-800/50 border-gray-600 hover:border-gray-500'
                    : 'bg-gray-800/30 border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-200">{output.label}</div>
                    <div className="text-sm text-gray-400 mt-1">{output.description}</div>
                  </div>
                  {isScored && (
                    <div className={`text-lg font-bold ml-4 ${getColor(score)}`}>
                      {score.toFixed(2)}
                    </div>
                  )}
                </div>
              </button>

              {/* Expanded detail panel */}
              {isSelected && selected && (
                <div className="mt-2 p-4 bg-gray-800/60 rounded-lg border border-gray-700 space-y-4">
                  {/* Score bars */}
                  <div className="space-y-3">
                    {[
                      { label: 'Valuation', value: selected.valuation, weight: 0.30, color: 'sky' },
                      { label: 'Veracity', value: selected.veracity, weight: 0.35, color: 'purple' },
                      { label: 'Validity', value: selected.validity, weight: 0.35, color: 'green' },
                    ].map(dim => (
                      <div key={dim.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">{dim.label} (×{dim.weight})</span>
                          <span className={getColor(dim.value)}>{dim.value.toFixed(2)}</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getBarColor(dim.value)}`}
                            style={{ width: `${dim.value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Composite calculation */}
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">V3 Composite Score</div>
                    <div className="font-mono text-sm text-gray-300">
                      {selected.valuation.toFixed(2)} × 0.30 + {selected.veracity.toFixed(2)} × 0.35 + {selected.validity.toFixed(2)} × 0.35 = <strong className={getColor(parseFloat(v3Score!))}>{v3Score}</strong>
                    </div>
                  </div>

                  {/* Insight */}
                  <p className="text-sm text-sky-300 italic">{selected.insight}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Compound insight after scoring 3+ outputs */}
      {scoredOutputs.length >= 3 && (
        <div className="mt-6 p-4 bg-purple-900/20 border border-purple-700/30 rounded-lg">
          <p className="text-purple-300 text-sm font-semibold mb-2">The Pattern</p>
          <p className="text-gray-300 text-sm">
            Notice how <strong>niche research</strong> (V3: 0.75) outscores <strong>viral clickbait</strong> (V3: 0.33)
            despite getting a fraction of the attention. That&apos;s V3&apos;s design: truth and rigor
            are weighted 70% while popularity is only 30%. In Web4, quality wins over engagement farming.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            This is the V3 counterpart to T3: while T3 measures whether <em>you</em> are trustworthy,
            V3 measures whether your <em>work</em> is trustworthy. Both feed into the ATP rewards you earn.
          </p>
        </div>
      )}
    </div>
  );
}
