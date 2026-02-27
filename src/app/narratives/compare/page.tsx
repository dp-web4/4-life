'use client';

/**
 * Comparative Narrative View
 *
 * Side-by-side comparison of two narratives - designed to show the
 * difference between pattern-guided maturation vs heuristic-only baseline.
 *
 * This is the most powerful pedagogical tool: showing humans what
 * pre-existing wisdom (pattern corpus) does to agent development.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import NarrativeTimeline from '@/components/NarrativeTimeline';
import { EventDetector, type LifeRecord } from '@/lib/narratives/event_detector';

interface NarrativeIndexEntry {
  id: string;
  title: string;
  type?: string;
  themes: string[];
  lives: number;
  events: number;
  source_simulation?: string;
  summary?: string;
}

interface NarrativeData {
  title: string;
  summary: string;
  acts: Array<{
    title: string;
    events: Array<{
      timestamp: string;
      description: string;
      technical_detail?: string;
      significance: string;
    }>;
    commentary?: string;
  }>;
  themes: string[];
  key_insights: string[];
}

interface LoadedNarrative {
  meta: NarrativeIndexEntry;
  narrative: NarrativeData;
  lives: LifeRecord[];
  events: any[];
}

// Default comparison pairs (curated for maximum insight)
const COMPARISON_PRESETS = [
  {
    label: 'Pattern-Guided vs Heuristic-Only',
    description: 'Does pre-existing wisdom change development trajectory?',
    left: 'maturation-web4',
    right: 'maturation-none',
  },
  {
    label: 'Closed-Loop vs Five-Domain',
    description: 'Action learning vs multi-domain assessment',
    left: 'ep-driven-closed-loop',
    right: 'ep-five-domain-multi-life',
  },
];

export default function CompareNarrativesPage() {
  const [index, setIndex] = useState<NarrativeIndexEntry[]>([]);
  const [leftId, setLeftId] = useState<string>('maturation-web4');
  const [rightId, setRightId] = useState<string>('maturation-none');
  const [left, setLeft] = useState<LoadedNarrative | null>(null);
  const [right, setRight] = useState<LoadedNarrative | null>(null);
  const [loading, setLoading] = useState(true);

  // Load index
  useEffect(() => {
    fetch('/narratives/index.json')
      .then(res => res.json())
      .then(data => {
        setIndex(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load narratives when IDs change
  useEffect(() => {
    if (!leftId || !rightId || index.length === 0) return;
    loadNarrative(leftId, index).then(setLeft);
    loadNarrative(rightId, index).then(setRight);
  }, [leftId, rightId, index]);

  const comparison = useMemo(() => {
    if (!left || !right) return null;

    // Extract comparison metrics
    const leftTrustStart = left.lives[0]?.t3_history[0] ?? 0;
    const leftTrustEnd = left.lives[left.lives.length - 1]?.t3_history.slice(-1)[0] ?? 0;
    const rightTrustStart = right.lives[0]?.t3_history[0] ?? 0;
    const rightTrustEnd = right.lives[right.lives.length - 1]?.t3_history.slice(-1)[0] ?? 0;

    const leftATPA = average(left.lives.flatMap(l => l.atp_history));
    const rightATPA = average(right.lives.flatMap(l => l.atp_history));

    const leftCritical = left.events.filter(e => e.severity === 'critical').length;
    const rightCritical = right.events.filter(e => e.severity === 'critical').length;

    // Count unique themes
    const leftThemes = new Set(left.narrative.themes);
    const rightThemes = new Set(right.narrative.themes);
    const sharedThemes = [...leftThemes].filter(t => rightThemes.has(t));
    const uniqueLeft = [...leftThemes].filter(t => !rightThemes.has(t));
    const uniqueRight = [...rightThemes].filter(t => !leftThemes.has(t));

    return {
      trust: {
        leftStart: leftTrustStart,
        leftEnd: leftTrustEnd,
        leftGrowth: leftTrustEnd - leftTrustStart,
        rightStart: rightTrustStart,
        rightEnd: rightTrustEnd,
        rightGrowth: rightTrustEnd - rightTrustStart,
      },
      atp: { left: leftATPA, right: rightATPA },
      events: {
        leftTotal: left.events.length,
        rightTotal: right.events.length,
        leftCritical,
        rightCritical,
      },
      themes: { shared: sharedThemes, uniqueLeft, uniqueRight },
    };
  }, [left, right]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading comparisons...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <Breadcrumbs currentPath="/narratives/compare" />

        <h1 className="text-3xl font-bold mb-2">Compare Narratives</h1>
        <p className="text-gray-400 mb-6">
          Side-by-side comparison reveals how different conditions shape agent development.
        </p>

        {/* Preset Comparisons */}
        <div className="mb-6 flex flex-wrap gap-3">
          {COMPARISON_PRESETS.map(preset => (
            <button
              key={preset.label}
              onClick={() => { setLeftId(preset.left); setRightId(preset.right); }}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                leftId === preset.left && rightId === preset.right
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="font-medium">{preset.label}</div>
              <div className="text-xs opacity-70">{preset.description}</div>
            </button>
          ))}
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Left Narrative</label>
            <select
              value={leftId}
              onChange={e => setLeftId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            >
              {index.map(n => (
                <option key={n.id} value={n.id}>{n.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Right Narrative</label>
            <select
              value={rightId}
              onChange={e => setRightId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
            >
              {index.map(n => (
                <option key={n.id} value={n.id}>{n.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Metrics */}
        {comparison && (
          <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-4">At a Glance</h2>
            <div className="grid grid-cols-3 gap-6">
              <MetricComparison
                label="Trust Growth"
                leftValue={`${(comparison.trust.leftGrowth * 100).toFixed(1)}%`}
                rightValue={`${(comparison.trust.rightGrowth * 100).toFixed(1)}%`}
                leftBetter={comparison.trust.leftGrowth > comparison.trust.rightGrowth}
                rightBetter={comparison.trust.rightGrowth > comparison.trust.leftGrowth}
              />
              <MetricComparison
                label="Average ATP"
                leftValue={Math.round(comparison.atp.left).toString()}
                rightValue={Math.round(comparison.atp.right).toString()}
                leftBetter={comparison.atp.left > comparison.atp.right}
                rightBetter={comparison.atp.right > comparison.atp.left}
              />
              <MetricComparison
                label="Critical Events"
                leftValue={comparison.events.leftCritical.toString()}
                rightValue={comparison.events.rightCritical.toString()}
                leftBetter={comparison.events.leftCritical < comparison.events.rightCritical}
                rightBetter={comparison.events.rightCritical < comparison.events.leftCritical}
              />
            </div>

            {/* Theme comparison */}
            {(comparison.themes.uniqueLeft.length > 0 || comparison.themes.uniqueRight.length > 0) && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Theme Differences</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {comparison.themes.uniqueLeft.map(t => (
                      <span key={t} className="inline-block px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full mr-1 mb-1">{t}</span>
                    ))}
                  </div>
                  <div>
                    {comparison.themes.uniqueRight.map(t => (
                      <span key={t} className="inline-block px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full mr-1 mb-1">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side-by-side Timelines */}
        {left && right && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-bold text-blue-400 mb-2">
                {left.narrative.title.split('—')[0]?.trim()}
              </h3>
              {left.lives.length > 0 && left.lives[0].t3_history.length > 0 && (
                <NarrativeTimeline
                  lives={left.lives}
                  events={left.events}
                  narrative={left.narrative}
                  height={280}
                  showATP={false}
                />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-400 mb-2">
                {right.narrative.title.split('—')[0]?.trim()}
              </h3>
              {right.lives.length > 0 && right.lives[0].t3_history.length > 0 && (
                <NarrativeTimeline
                  lives={right.lives}
                  events={right.events}
                  narrative={right.narrative}
                  height={280}
                  showATP={false}
                />
              )}
            </div>
          </div>
        )}

        {/* Side-by-side Key Insights */}
        {left && right && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-sm font-bold text-blue-400 mb-3">Key Insights</h3>
              <ul className="space-y-2">
                {left.narrative.key_insights.map((insight, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2">
                    <span className="text-blue-400">*</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-sm font-bold text-purple-400 mb-3">Key Insights</h3>
              <ul className="space-y-2">
                {right.narrative.key_insights.map((insight, i) => (
                  <li key={i} className="text-xs text-gray-300 flex gap-2">
                    <span className="text-purple-400">*</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Side-by-side Summaries */}
        {left && right && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-sm font-bold text-blue-400 mb-2">Summary</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{left.narrative.summary}</p>
              <Link
                href={`/narratives/${left.meta.id}`}
                className="inline-block mt-3 text-xs text-blue-400 hover:underline"
              >
                Read full narrative &rarr;
              </Link>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-5">
              <h3 className="text-sm font-bold text-purple-400 mb-2">Summary</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{right.narrative.summary}</p>
              <Link
                href={`/narratives/${right.meta.id}`}
                className="inline-block mt-3 text-xs text-purple-400 hover:underline"
              >
                Read full narrative &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* What This Comparison Reveals */}
        {left && right && comparison && (
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-5 mb-8">
            <h2 className="text-lg font-bold mb-3">What This Reveals</h2>
            <div className="space-y-2 text-sm text-gray-300">
              {comparison.trust.leftGrowth > comparison.trust.rightGrowth + 0.01 && (
                <p>
                  The left simulation shows stronger trust growth ({(comparison.trust.leftGrowth * 100).toFixed(1)}% vs {(comparison.trust.rightGrowth * 100).toFixed(1)}%).
                  This suggests {left.meta.type?.includes('Pattern') ? 'pre-existing patterns accelerate trust development' : 'this approach builds trust more effectively'}.
                </p>
              )}
              {comparison.trust.rightGrowth > comparison.trust.leftGrowth + 0.01 && (
                <p>
                  The right simulation shows stronger trust growth ({(comparison.trust.rightGrowth * 100).toFixed(1)}% vs {(comparison.trust.leftGrowth * 100).toFixed(1)}%).
                  This suggests {right.meta.type?.includes('Heuristic') ? 'heuristic-only approaches can sometimes discover novel strategies' : 'this approach builds trust more effectively'}.
                </p>
              )}
              {Math.abs(comparison.trust.leftGrowth - comparison.trust.rightGrowth) <= 0.01 && (
                <p>
                  Both simulations show similar trust growth, suggesting the underlying dynamics are robust
                  regardless of the specific approach used.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                These comparisons reveal fundamental truths about trust dynamics in Web4 societies.
                Different starting conditions and strategies produce measurably different outcomes.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/narratives"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            &larr; All Narratives
          </Link>
        </div>
        <RelatedConcepts currentPath="/narratives/compare" />
      </div>
    </div>
  );
}

// Helper components
function MetricComparison({ label, leftValue, rightValue, leftBetter, rightBetter }: {
  label: string;
  leftValue: string;
  rightValue: string;
  leftBetter: boolean;
  rightBetter: boolean;
}) {
  return (
    <div className="text-center">
      <div className="text-xs text-gray-500 mb-2">{label}</div>
      <div className="flex items-center justify-center gap-4">
        <span className={`text-lg font-bold ${leftBetter ? 'text-blue-400' : 'text-gray-400'}`}>
          {leftValue}
        </span>
        <span className="text-gray-600">vs</span>
        <span className={`text-lg font-bold ${rightBetter ? 'text-purple-400' : 'text-gray-400'}`}>
          {rightValue}
        </span>
      </div>
    </div>
  );
}

// Data loading
async function loadNarrative(id: string, index: NarrativeIndexEntry[]): Promise<LoadedNarrative | null> {
  const meta = index.find(n => n.id === id);
  if (!meta) return null;

  try {
    const narrative = await fetch(`/narratives/${id}.json`).then(r => r.json());

    let lives: LifeRecord[] = [];
    let events: any[] = [];

    if (meta.source_simulation) {
      try {
        const simData = await fetch(`/${meta.source_simulation}`).then(r => r.ok ? r.json() : null);
        if (simData) {
          let rawLives: any[] = [];
          if (Array.isArray(simData.lives)) rawLives = simData.lives;
          else if (simData.multi_life?.lives) rawLives = simData.multi_life.lives;

          lives = rawLives.map((raw: any, i: number) => {
            let startTick = raw.start_tick;
            let endTick = raw.end_tick;
            if (startTick === undefined) {
              const duration = raw.duration_ticks || raw.t3_history?.length || 20;
              startTick = i === 0 ? 0 : rawLives.slice(0, i).reduce((sum: number, l: any) =>
                sum + (l.duration_ticks || l.t3_history?.length || 20), 0);
              endTick = startTick + duration;
            }

            let agentLct = raw.agent_lct || simData.agent_lct;
            if (!agentLct && raw.life_id) {
              const match = raw.life_id.match(/(lct:web4:agent:\w+)/);
              if (match) agentLct = match[1];
            }

            return {
              life_id: raw.life_id || `life:${i + 1}`,
              agent_lct: agentLct || 'lct:web4:agent:agent',
              start_tick: startTick ?? 0,
              end_tick: endTick ?? 20,
              life_state: raw.life_state || raw.state || 'completed',
              termination_reason: raw.termination_reason || 'none',
              t3_history: raw.t3_history || [],
              atp_history: raw.atp_history || [],
            };
          });

          if (lives.length > 0) {
            const detector = new EventDetector();
            events = detector.detectEvents(lives);
          }
        }
      } catch { /* Simulation data optional */ }
    }

    return { meta, narrative, lives, events };
  } catch {
    return null;
  }
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}
