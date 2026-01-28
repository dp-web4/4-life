'use client';

/**
 * Trust Dynamics Timeline
 *
 * Session #41: A unified temporal visualization showing trust and ATP
 * trajectories across ALL datasets on a single interactive timeline.
 *
 * This gives the "big picture" view: how do different simulation scenarios
 * produce different trust patterns? Where do they converge? Where do they diverge?
 *
 * Key insight: Placing all datasets side by side reveals patterns invisible
 * when looking at individual simulations.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';
import { detectMoments, SIMULATION_SOURCES } from '@/lib/moments';
import type { Moment, MomentCategory } from '@/lib/moments/types';
import { CATEGORY_INFO } from '@/lib/moments/types';

// ============================================================================
// Types
// ============================================================================

interface DatasetTimeline {
  id: string;
  label: string;
  color: string;
  lives: LifeTimeline[];
  trustFlat: number[];  // All trust values, flattened across lives
  atpFlat: number[];    // All ATP values, flattened
  finalTrust: number;
  avgTrust: number;
  lifeCount: number;
  narrativeId?: string;
}

interface LifeTimeline {
  lifeNumber: number;
  trust: number[];
  atp: number[];
  startTick: number;
  endTick: number;
  terminationReason: string;
}

interface SimSource {
  id: string;
  filename: string;
  label: string;
  color: string;
  narrativeId?: string;
}

// ============================================================================
// Sources
// ============================================================================

const SOURCES: SimSource[] = [
  { id: 'ep-closed-loop', filename: 'ep_driven_closed_loop_results.json', label: 'EP Closed Loop', color: '#60a5fa', narrativeId: 'ep-driven-closed-loop' },
  { id: 'five-domain', filename: 'ep_five_domain_multi_life_results.json', label: 'Five-Domain EP', color: '#34d399', narrativeId: 'ep-five-domain-multi-life' },
  { id: 'maturation-web4', filename: 'maturation_demo_results_web4.json', label: 'Maturation (Web4)', color: '#f59e0b', narrativeId: 'maturation-web4' },
  { id: 'maturation-none', filename: 'maturation_demo_results_none.json', label: 'Maturation (No Patterns)', color: '#ef4444', narrativeId: 'maturation-none' },
  { id: 'multi-life-policy', filename: 'multi_life_with_policy.json', label: 'Multi-Life Policy', color: '#a78bfa', narrativeId: 'multi-life-policy' },
];

// ============================================================================
// Data Extraction
// ============================================================================

function extractTimeline(rawData: any, source: SimSource): DatasetTimeline | null {
  let lives: any[] = [];

  if (source.id === 'multi-life-policy') {
    lives = rawData?.multi_life?.lives || [];
  } else {
    lives = rawData?.lives || [];
  }

  if (lives.length === 0) return null;

  const lifeTimelines: LifeTimeline[] = lives.map((life: any, i: number) => ({
    lifeNumber: i + 1,
    trust: life.t3_history || life.trust_history || [],
    atp: life.atp_history || [],
    startTick: life.start_tick || 0,
    endTick: life.end_tick || 0,
    terminationReason: life.termination_reason || 'unknown',
  }));

  const trustFlat = lifeTimelines.flatMap(l => l.trust);
  const atpFlat = lifeTimelines.flatMap(l => l.atp);

  return {
    id: source.id,
    label: source.label,
    color: source.color,
    lives: lifeTimelines,
    trustFlat,
    atpFlat,
    finalTrust: trustFlat.length > 0 ? trustFlat[trustFlat.length - 1] : 0,
    avgTrust: trustFlat.length > 0 ? trustFlat.reduce((a, b) => a + b, 0) / trustFlat.length : 0,
    lifeCount: lifeTimelines.length,
    narrativeId: source.narrativeId,
  };
}

// ============================================================================
// Moment Colors (for markers on the chart)
// ============================================================================

const MOMENT_COLORS: Record<MomentCategory, string> = {
  emergence: '#a855f7',  // purple
  karma: '#eab308',      // yellow
  learning: '#22c55e',   // green
  crisis: '#ef4444',     // red
  trust: '#3b82f6',      // blue
  atp: '#f97316',        // orange
};

// ============================================================================
// SVG Timeline Chart
// ============================================================================

interface MomentMarker {
  moment: Moment;
  normPosition: number;  // 0-1 position in the timeline
  value: number;         // trust or atp value at that point
}

function TimelineChart({
  datasets,
  metric,
  height = 280,
  showThreshold = true,
  moments = [],
  showMoments = true,
  hoveredMoment,
  setHoveredMoment,
}: {
  datasets: DatasetTimeline[];
  metric: 'trust' | 'atp';
  height?: number;
  showThreshold?: boolean;
  moments?: MomentMarker[];
  showMoments?: boolean;
  hoveredMoment?: string | null;
  setHoveredMoment?: (id: string | null) => void;
}) {
  const width = 800;
  const padding = { top: 20, right: 80, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Determine value ranges
  const allValues = datasets.flatMap(d => metric === 'trust' ? d.trustFlat : d.atpFlat);
  if (allValues.length === 0) return null;

  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal || 1;

  // Determine max timeline length
  const maxLen = Math.max(...datasets.map(d => (metric === 'trust' ? d.trustFlat : d.atpFlat).length));

  const toX = (i: number, total: number) => padding.left + (i / (total - 1 || 1)) * chartWidth;
  const toY = (v: number) => padding.top + chartHeight - ((v - minVal) / range) * chartHeight;

  // Y-axis grid values
  const yTicks = metric === 'trust'
    ? [0, 0.25, 0.5, 0.75, 1.0].filter(v => v >= minVal - 0.05 && v <= maxVal + 0.05)
    : Array.from({ length: 5 }, (_, i) => minVal + (range * i) / 4);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {/* Background */}
      <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#111827" rx="4" />

      {/* Grid lines */}
      {yTicks.map(v => (
        <g key={v}>
          <line
            x1={padding.left}
            y1={toY(v)}
            x2={padding.left + chartWidth}
            y2={toY(v)}
            stroke="#1f2937"
            strokeWidth="0.5"
          />
          <text
            x={padding.left - 8}
            y={toY(v) + 3}
            fill="#6b7280"
            fontSize="9"
            textAnchor="end"
          >
            {metric === 'trust' ? v.toFixed(2) : Math.round(v)}
          </text>
        </g>
      ))}

      {/* Consciousness threshold for trust */}
      {metric === 'trust' && showThreshold && minVal < 0.5 && maxVal > 0.4 && (
        <>
          <line
            x1={padding.left}
            y1={toY(0.5)}
            x2={padding.left + chartWidth}
            y2={toY(0.5)}
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="6,4"
            opacity="0.6"
          />
          <text
            x={padding.left + 4}
            y={toY(0.5) - 4}
            fill="#f59e0b"
            fontSize="8"
            opacity="0.8"
          >
            consciousness threshold (0.5)
          </text>
        </>
      )}

      {/* Data lines */}
      {datasets.map(ds => {
        const values = metric === 'trust' ? ds.trustFlat : ds.atpFlat;
        if (values.length < 2) return null;

        const points = values.map((v, i) => {
          const x = toX(i, values.length);
          const y = toY(v);
          return `${x},${y}`;
        }).join(' ');

        return (
          <g key={ds.id}>
            <polyline
              points={points}
              fill="none"
              stroke={ds.color}
              strokeWidth="2"
              opacity="0.8"
            />
            {/* End label */}
            <text
              x={toX(values.length - 1, values.length) + 4}
              y={toY(values[values.length - 1]) + 3}
              fill={ds.color}
              fontSize="8"
            >
              {ds.label.split(' ')[0]}
            </text>
          </g>
        );
      })}

      {/* Life boundary markers */}
      {datasets.map(ds => {
        const values = metric === 'trust' ? ds.trustFlat : ds.atpFlat;
        let offset = 0;

        return ds.lives.slice(0, -1).map((life, lifeIdx) => {
          const lifeValues = metric === 'trust' ? life.trust : life.atp;
          offset += lifeValues.length;
          const x = toX(offset, values.length);

          return (
            <line
              key={`${ds.id}-sep-${lifeIdx}`}
              x1={x}
              y1={padding.top}
              x2={x}
              y2={padding.top + chartHeight}
              stroke={ds.color}
              strokeWidth="0.5"
              strokeDasharray="2,4"
              opacity="0.3"
            />
          );
        });
      })}

      {/* Moment markers */}
      {showMoments && moments.map((mm, idx) => {
        const x = padding.left + mm.normPosition * chartWidth;
        const y = toY(mm.value);
        const color = MOMENT_COLORS[mm.moment.category];
        const isHovered = hoveredMoment === mm.moment.id;

        return (
          <g
            key={`moment-${idx}`}
            onMouseEnter={() => setHoveredMoment?.(mm.moment.id)}
            onMouseLeave={() => setHoveredMoment?.(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Marker */}
            <circle
              cx={x}
              cy={y}
              r={isHovered ? 6 : 4}
              fill={color}
              stroke="#111827"
              strokeWidth="2"
              opacity={isHovered ? 1 : 0.8}
            />
            {/* Category emoji */}
            <text
              x={x}
              y={y - 10}
              fontSize="10"
              textAnchor="middle"
              opacity={isHovered ? 1 : 0.6}
            >
              {CATEGORY_INFO[mm.moment.category].emoji}
            </text>
          </g>
        );
      })}

      {/* X-axis label */}
      <text
        x={padding.left + chartWidth / 2}
        y={height - 4}
        fill="#6b7280"
        fontSize="9"
        textAnchor="middle"
      >
        Simulation Progress (normalized)
      </text>

      {/* Y-axis label */}
      <text
        x={12}
        y={padding.top + chartHeight / 2}
        fill="#6b7280"
        fontSize="9"
        textAnchor="middle"
        transform={`rotate(-90, 12, ${padding.top + chartHeight / 2})`}
      >
        {metric === 'trust' ? 'Trust (T3)' : 'ATP (Attention)'}
      </text>
    </svg>
  );
}

// ============================================================================
// Insight Panels
// ============================================================================

function InsightPanel({ datasets }: { datasets: DatasetTimeline[] }) {
  if (datasets.length < 2) return null;

  // Find best and worst performers
  const sorted = [...datasets].sort((a, b) => b.finalTrust - a.finalTrust);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  // Convergence check: do they end at similar values?
  const finalTrusts = datasets.map(d => d.finalTrust);
  const spread = Math.max(...finalTrusts) - Math.min(...finalTrusts);
  const converges = spread < 0.05;

  // Compare maturation datasets specifically
  const web4 = datasets.find(d => d.id === 'maturation-web4');
  const none = datasets.find(d => d.id === 'maturation-none');
  const maturationComparison = web4 && none;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Best/Worst comparison */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3 text-gray-300">Performance Spread</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: best.color }} />
            <span className="text-sm">{best.label}: <span className="text-emerald-400">{best.finalTrust.toFixed(3)}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: worst.color }} />
            <span className="text-sm">{worst.label}: <span className="text-red-400">{worst.finalTrust.toFixed(3)}</span></span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Spread: {(spread * 100).toFixed(1)}%
            {converges && ' — Datasets converge to similar final trust, suggesting attractor dynamics.'}
          </div>
        </div>
      </div>

      {/* Maturation comparison */}
      {maturationComparison && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3 text-gray-300">Pattern Corpus Effect</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: web4!.color }} />
              <span className="text-sm">With patterns: <span className="font-medium">{web4!.finalTrust.toFixed(3)}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: none!.color }} />
              <span className="text-sm">Without patterns: <span className="font-medium">{none!.finalTrust.toFixed(3)}</span></span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {web4!.finalTrust > none!.finalTrust
                ? `Web4 patterns provide a ${((web4!.finalTrust - none!.finalTrust) * 100).toFixed(1)}% trust advantage — inherited wisdom accelerates learning.`
                : web4!.finalTrust < none!.finalTrust
                  ? `Baseline outperforms patterns by ${((none!.finalTrust - web4!.finalTrust) * 100).toFixed(1)}% — inherited patterns may constrain exploration.`
                  : 'No significant difference — suggesting the learning dynamics dominate over initial conditions.'
              }
            </div>
          </div>
        </div>
      )}

      {/* Convergence insight */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3 text-gray-300">Average Trust Comparison</h4>
        <div className="space-y-1">
          {sorted.map(d => (
            <div key={d.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-xs flex-1 truncate">{d.label}</span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${d.avgTrust * 100}%`, backgroundColor: d.color }}
                />
              </div>
              <span className="text-xs text-gray-400 w-10 text-right flex-shrink-0">{d.avgTrust.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-life growth */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3 text-gray-300">Cross-Life Growth</h4>
        <div className="space-y-1">
          {datasets.filter(d => d.lives.length > 1).map(d => {
            const firstLifeTrust = d.lives[0].trust;
            const lastLifeTrust = d.lives[d.lives.length - 1].trust;
            const firstStart = firstLifeTrust[0] || 0;
            const lastEnd = lastLifeTrust[lastLifeTrust.length - 1] || 0;
            const growth = lastEnd - firstStart;

            return (
              <div key={d.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-xs flex-1 truncate">{d.label}</span>
                <span className={`text-xs font-mono ${growth > 0 ? 'text-emerald-400' : growth < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {growth > 0 ? '+' : ''}{(growth * 100).toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Trust change from first life start to last life end.
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

// Map simulation source IDs to local SOURCES for consistent coloring
const SOURCE_ID_MAP: Record<string, string> = {
  'ep-closed-loop': 'ep-closed-loop',
  'five-domain': 'five-domain',
  'maturation-web4': 'maturation-web4',
  'maturation-baseline': 'maturation-none',  // Map moments detector ID to local ID
  'multi-life-policy': 'multi-life-policy',
};

export default function TrustTimelinePage() {
  const [datasets, setDatasets] = useState<DatasetTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState<'trust' | 'atp'>('trust');
  const [activeDatasets, setActiveDatasets] = useState<Set<string>>(new Set(SOURCES.map(s => s.id)));
  const [allMoments, setAllMoments] = useState<Moment[]>([]);
  const [showMoments, setShowMoments] = useState(true);
  const [hoveredMoment, setHoveredMoment] = useState<string | null>(null);

  // Load all datasets and moments
  useEffect(() => {
    async function loadAll() {
      const results: DatasetTimeline[] = [];
      const moments: Moment[] = [];

      await Promise.all(SOURCES.map(async (source) => {
        try {
          const res = await fetch(`/${source.filename}`);
          if (!res.ok) return;
          const rawData = await res.json();
          const timeline = extractTimeline(rawData, source);
          if (timeline) results.push(timeline);

          // Also detect moments for this source
          const matchingMomentSource = SIMULATION_SOURCES.find(
            s => s.filename === source.filename
          );
          if (matchingMomentSource) {
            const detected = detectMoments(rawData, matchingMomentSource);
            moments.push(...detected);
          }
        } catch (err) {
          console.error(`Failed to load ${source.filename}:`, err);
        }
      }));

      setDatasets(results);
      setAllMoments(moments);
      setLoading(false);
    }
    loadAll();
  }, []);

  const visibleDatasets = useMemo(() =>
    datasets.filter(d => activeDatasets.has(d.id)),
    [datasets, activeDatasets]
  );

  // Compute moment markers for the current view
  const momentMarkers = useMemo((): MomentMarker[] => {
    if (!showMoments) return [];

    const markers: MomentMarker[] = [];
    const visibleSimIds = new Set(visibleDatasets.map(d => d.id));

    for (const moment of allMoments) {
      // Find matching dataset
      const simId = SOURCE_ID_MAP[moment.simulationId] || moment.simulationId;
      if (!visibleSimIds.has(simId)) continue;

      const dataset = visibleDatasets.find(d => d.id === simId);
      if (!dataset) continue;

      // Find position in the flattened timeline
      // Moments are defined by life number and tick within that life
      const lifeIdx = moment.lifeNumber - 1;
      if (lifeIdx >= dataset.lives.length) continue;

      // Calculate the offset to this life's start in the flattened array
      let offset = 0;
      for (let i = 0; i < lifeIdx; i++) {
        offset += dataset.lives[i].trust.length;
      }

      // Add the tick within this life
      const tickInLife = Math.min(moment.tick, dataset.lives[lifeIdx].trust.length - 1);
      const flatIdx = offset + tickInLife;

      const values = activeMetric === 'trust' ? dataset.trustFlat : dataset.atpFlat;
      if (flatIdx >= values.length) continue;

      markers.push({
        moment,
        normPosition: values.length > 1 ? flatIdx / (values.length - 1) : 0.5,
        value: values[flatIdx],
      });
    }

    // Sort by severity and limit to avoid overcrowding
    return markers
      .sort((a, b) => {
        const sevOrder = { critical: 0, high: 1, medium: 2 };
        return sevOrder[a.moment.severity] - sevOrder[b.moment.severity];
      })
      .slice(0, 20);  // Limit to top 20 moments
  }, [allMoments, visibleDatasets, activeMetric, showMoments]);

  const toggleDataset = (id: string) => {
    setActiveDatasets(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id); // Keep at least one
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8">
        <Breadcrumbs currentPath="/trust-timeline" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Trust Dynamics Timeline</h1>
          <p className="text-gray-400 max-w-3xl">
            All simulation datasets on one timeline. See how different scenarios produce different trust
            patterns, where they converge, and what drives divergence.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading simulation data...</div>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Metric toggle */}
              <div className="flex bg-gray-800 rounded overflow-hidden">
                <button
                  onClick={() => setActiveMetric('trust')}
                  className={`px-4 py-2 text-sm ${activeMetric === 'trust' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  Trust (T3)
                </button>
                <button
                  onClick={() => setActiveMetric('atp')}
                  className={`px-4 py-2 text-sm ${activeMetric === 'atp' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  ATP (Attention)
                </button>
              </div>

              {/* Moments toggle */}
              <button
                onClick={() => setShowMoments(!showMoments)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors border ${
                  showMoments
                    ? 'border-purple-500 bg-purple-900/30 text-purple-300'
                    : 'border-gray-700 bg-gray-900 text-gray-500'
                }`}
              >
                <span>✨</span>
                Moments ({momentMarkers.length})
              </button>

              {/* Dataset toggles */}
              <div className="flex flex-wrap gap-2">
                {datasets.map(ds => (
                  <button
                    key={ds.id}
                    onClick={() => toggleDataset(ds.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors border ${
                      activeDatasets.has(ds.id)
                        ? 'border-gray-500 bg-gray-800 text-white'
                        : 'border-gray-700 bg-gray-900 text-gray-600'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activeDatasets.has(ds.id) ? ds.color : '#374151' }}
                    />
                    {ds.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main chart */}
            <div className="bg-gray-800 rounded-xl p-4 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-400">
                  {activeMetric === 'trust' ? 'Trust Trajectories' : 'ATP Trajectories'} — {visibleDatasets.length} Datasets
                </h3>
                {showMoments && momentMarkers.length > 0 && (
                  <span className="text-xs text-gray-500">
                    Hover over markers for moment details
                  </span>
                )}
              </div>
              <TimelineChart
                datasets={visibleDatasets}
                metric={activeMetric}
                height={300}
                moments={momentMarkers}
                showMoments={showMoments}
                hoveredMoment={hoveredMoment}
                setHoveredMoment={setHoveredMoment}
              />

              {/* Hovered moment tooltip */}
              {hoveredMoment && (
                <div className="mt-3 p-3 bg-gray-900 border border-gray-700 rounded-lg">
                  {(() => {
                    const mm = momentMarkers.find(m => m.moment.id === hoveredMoment);
                    if (!mm) return null;
                    const { moment } = mm;
                    return (
                      <div className="flex gap-3">
                        <span className="text-2xl">{CATEGORY_INFO[moment.category].emoji}</span>
                        <div className="flex-1">
                          <div className="font-medium text-white">{moment.title}</div>
                          <div className="text-sm text-gray-400 mt-1">{moment.narrative}</div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                            <span>{moment.simulationLabel}</span>
                            <span>Life {moment.lifeNumber}</span>
                            <span>Tick {moment.tick}</span>
                            <Link
                              href={`/moments?id=${moment.id}`}
                              className="text-purple-400 hover:text-purple-300"
                            >
                              View details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Individual dataset panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {visibleDatasets.map(ds => (
                <div key={ds.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ds.color }} />
                    <span className="text-sm font-medium">{ds.label}</span>
                  </div>

                  {/* Mini sparkline */}
                  <div className="mb-3">
                    <svg viewBox={`0 0 200 40`} className="w-full" preserveAspectRatio="xMidYMid meet">
                      {(() => {
                        const values = activeMetric === 'trust' ? ds.trustFlat : ds.atpFlat;
                        if (values.length < 2) return null;
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const r = max - min || 1;
                        const points = values.map((v, i) => {
                          const x = (i / (values.length - 1)) * 200;
                          const y = 38 - ((v - min) / r) * 36;
                          return `${x},${y}`;
                        }).join(' ');
                        return <polyline points={points} fill="none" stroke={ds.color} strokeWidth="1.5" />;
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-gray-500">Lives</div>
                      <div className="font-medium">{ds.lifeCount}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Avg Trust</div>
                      <div className="font-medium">{ds.avgTrust.toFixed(3)}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Final</div>
                      <div className="font-medium">{ds.finalTrust.toFixed(3)}</div>
                    </div>
                  </div>

                  {ds.narrativeId && (
                    <Link
                      href={`/narratives/${ds.narrativeId}`}
                      className="block mt-3 text-center text-xs text-blue-400 hover:text-blue-300"
                    >
                      Read narrative
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Comparative Insights</h2>
              <InsightPanel datasets={visibleDatasets} />
            </div>

            {/* Key takeaways */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">What the Timeline Reveals</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p>
                  <strong className="text-white">Convergence:</strong> Despite different starting conditions and
                  learning strategies, many datasets converge to similar trust ranges. This suggests
                  <em> attractor dynamics</em> — the system has natural equilibria that agents discover
                  regardless of their approach.
                </p>
                <p>
                  <strong className="text-white">Maturation Effect:</strong> Compare the Web4-patterns dataset
                  (with inherited wisdom) against the no-patterns baseline. The difference reveals whether
                  inherited knowledge accelerates learning or constrains exploration.
                </p>
                <p>
                  <strong className="text-white">ATP-Trust Coupling:</strong> Switch between Trust and ATP views.
                  ATP declines are often followed by trust changes — the metabolic budget constrains behavior,
                  which in turn affects trust. This coupling is what makes Web4 societies self-regulating.
                </p>
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                <Link href="/moments" className="text-blue-400 hover:underline text-sm">Emergent Moments</Link>
                <Link href="/data-explorer" className="text-blue-400 hover:underline text-sm">Data Explorer</Link>
                <Link href="/narratives" className="text-blue-400 hover:underline text-sm">Narratives</Link>
              </div>
            </div>
          </>
        )}

        <ExplorerNav currentPath="/trust-timeline" />
        <RelatedConcepts currentPath="/trust-timeline" />
      </div>
    </div>
  );
}
