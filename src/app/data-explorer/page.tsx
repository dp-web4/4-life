'use client';

/**
 * Simulation Data Explorer
 *
 * A unified browser for discovering, inspecting, and comparing all simulation
 * datasets in the 4-Life corpus. Humans need to SEE the data to understand it.
 *
 * Session #41: Filling the "data discovery" gap - 9 JSON datasets were sitting
 * in /public/ with no way to browse them except the Lab Console.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

interface SimulationDataset {
  id: string;
  filename: string;
  label: string;
  category: 'single-agent' | 'multi-agent' | 'policy' | 'maturation' | 'five-domain';
  description: string;
  agentCount: number;
  lifeCount: number;
  totalTicks: number;
  hasEP: boolean;
  hasKarma: boolean;
  hasPolicy: boolean;
  highlights: string[];
  narrativeId?: string; // link to narrative if exists
}

interface LifeSummary {
  lifeNumber: number;
  startTick: number;
  endTick: number;
  duration: number;
  startTrust: number;
  endTrust: number;
  trustChange: number;
  startATP: number;
  endATP: number;
  terminationReason: string;
  avgTrust: number;
  maxTrust: number;
  minTrust: number;
}

interface DatasetDetail {
  meta: SimulationDataset;
  lives: LifeSummary[];
  trustTrajectory: number[][];
  atpTrajectory: number[][];
  eventCount: number;
  rawData: any;
}

// ============================================================================
// Dataset Catalog
// ============================================================================

const DATASETS: SimulationDataset[] = [
  {
    id: 'ep-closed-loop',
    filename: 'ep_driven_closed_loop_results.json',
    label: 'EP-Driven Closed Loop',
    category: 'single-agent',
    description: 'Agent learns by proposing actions, observing outcomes, and refining epistemic patterns. The core learning loop of Web4.',
    agentCount: 1,
    lifeCount: 3,
    totalTicks: 30,
    hasEP: true,
    hasKarma: true,
    hasPolicy: false,
    highlights: ['Closed-loop learning', 'Action proposal → outcome → pattern update', 'Karma carry-forward between lives'],
    narrativeId: 'ep-driven-closed-loop',
  },
  {
    id: 'five-domain',
    filename: 'ep_five_domain_multi_life_results.json',
    label: 'Five-Domain EP Assessment',
    category: 'five-domain',
    description: 'Agent assessed across all EP dimensions: emotional regulation, quality judgment, attention management, grounding verification, and authorization awareness.',
    agentCount: 1,
    lifeCount: 3,
    totalTicks: 30,
    hasEP: true,
    hasKarma: true,
    hasPolicy: false,
    highlights: ['5 EP dimensions', 'Multi-domain scoring', 'Holistic assessment'],
    narrativeId: 'ep-five-domain-multi-life',
  },
  {
    id: 'maturation-web4',
    filename: 'maturation_demo_results_web4.json',
    label: 'Maturation (Web4 Patterns)',
    category: 'maturation',
    description: 'Agent develops from IMMATURE through LEARNING to MATURE using Web4-native pattern corpus (100 patterns from Session 116).',
    agentCount: 1,
    lifeCount: 3,
    totalTicks: 30,
    hasEP: true,
    hasKarma: true,
    hasPolicy: false,
    highlights: ['Web4 pattern corpus', 'IMMATURE → LEARNING → MATURE', 'Pattern-guided growth'],
    narrativeId: 'maturation-web4',
  },
  {
    id: 'maturation-none',
    filename: 'maturation_demo_results_none.json',
    label: 'Maturation (No Patterns)',
    category: 'maturation',
    description: 'Baseline: Agent matures with NO pre-existing pattern corpus. Learns purely through heuristic-driven trial and error.',
    agentCount: 1,
    lifeCount: 3,
    totalTicks: 30,
    hasEP: true,
    hasKarma: true,
    hasPolicy: false,
    highlights: ['No pattern corpus', 'Heuristic-only learning', 'Baseline comparison'],
    narrativeId: 'maturation-none',
  },
  {
    id: 'multi-life-policy',
    filename: 'multi_life_with_policy.json',
    label: 'Multi-Life with Policy',
    category: 'policy',
    description: 'Tests the policy integration framework, showing how agent decisions carry consequences across life cycles through karma mechanics.',
    agentCount: 1,
    lifeCount: 3,
    totalTicks: 30,
    hasEP: true,
    hasKarma: true,
    hasPolicy: true,
    highlights: ['Policy framework', 'Cross-life consequences', 'Karma mechanics'],
    narrativeId: 'multi-life-policy',
  },
  {
    id: 'one-life-policy',
    filename: 'one_life_with_policy.json',
    label: 'Single-Life Policy',
    category: 'policy',
    description: 'How an agent performs within a single lifetime, without the safety net of karma carry-forward or rebirth.',
    agentCount: 1,
    lifeCount: 1,
    totalTicks: 20,
    hasEP: false,
    hasKarma: false,
    hasPolicy: true,
    highlights: ['Single life', 'No rebirth', 'Policy-only'],
    narrativeId: 'one-life-policy',
  },
  {
    id: 'trust-network',
    filename: 'trust_network_evolution.json',
    label: 'Trust Network Evolution',
    category: 'multi-agent',
    description: '5 agents interact over 30 ticks, forming trust relationships, coalitions, and demonstrating emergent social dynamics.',
    agentCount: 5,
    lifeCount: 0,
    totalTicks: 30,
    hasEP: false,
    hasKarma: false,
    hasPolicy: false,
    highlights: ['Multi-agent dynamics', 'Coalition formation', 'Emergent social structure'],
  },
];

// ============================================================================
// Data Parsing Utilities
// ============================================================================

function parseLifeData(rawData: any, datasetId: string): LifeSummary[] {
  let lives: any[] = [];

  if (datasetId === 'multi-life-policy') {
    lives = rawData?.multi_life?.lives || [];
  } else if (datasetId === 'one-life-policy') {
    const ls = rawData?.life_summary;
    if (ls) {
      return [{
        lifeNumber: 1,
        startTick: 0,
        endTick: ls.ticks_survived || 20,
        duration: ls.ticks_survived || 20,
        startTrust: ls.initial_trust || 0.5,
        endTrust: ls.final_trust || 0.5,
        trustChange: (ls.final_trust || 0.5) - (ls.initial_trust || 0.5),
        startATP: ls.initial_atp || 100,
        endATP: ls.final_atp || 0,
        terminationReason: ls.termination_reason || 'unknown',
        avgTrust: (ls.initial_trust + ls.final_trust) / 2,
        maxTrust: Math.max(ls.initial_trust || 0.5, ls.final_trust || 0.5),
        minTrust: Math.min(ls.initial_trust || 0.5, ls.final_trust || 0.5),
      }];
    }
    return [];
  } else if (datasetId === 'trust-network') {
    return []; // Network data has no individual lives
  } else {
    lives = rawData?.lives || [];
  }

  return lives.map((life: any, i: number) => {
    const t3 = life.t3_history || life.trust_history || [];
    const atp = life.atp_history || [];

    return {
      lifeNumber: i + 1,
      startTick: life.start_tick || 0,
      endTick: life.end_tick || 0,
      duration: (life.end_tick || 0) - (life.start_tick || 0),
      startTrust: t3[0] ?? 0.5,
      endTrust: t3[t3.length - 1] ?? 0.5,
      trustChange: (t3[t3.length - 1] ?? 0.5) - (t3[0] ?? 0.5),
      startATP: atp[0] ?? 100,
      endATP: atp[atp.length - 1] ?? 0,
      terminationReason: life.termination_reason || life.life_state || 'unknown',
      avgTrust: t3.length > 0 ? t3.reduce((a: number, b: number) => a + b, 0) / t3.length : 0.5,
      maxTrust: t3.length > 0 ? Math.max(...t3) : 0.5,
      minTrust: t3.length > 0 ? Math.min(...t3) : 0.5,
    };
  });
}

function extractTrajectories(rawData: any, datasetId: string): { trust: number[][], atp: number[][] } {
  let lives: any[] = [];

  if (datasetId === 'multi-life-policy') {
    lives = rawData?.multi_life?.lives || [];
  } else if (datasetId === 'one-life-policy' || datasetId === 'trust-network') {
    return { trust: [], atp: [] };
  } else {
    lives = rawData?.lives || [];
  }

  const trust = lives.map((life: any) => life.t3_history || life.trust_history || []);
  const atp = lives.map((life: any) => life.atp_history || []);
  return { trust, atp };
}

// ============================================================================
// Components
// ============================================================================

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    'single-agent': 'bg-blue-900/50 text-blue-300',
    'multi-agent': 'bg-purple-900/50 text-purple-300',
    'policy': 'bg-green-900/50 text-green-300',
    'maturation': 'bg-amber-900/50 text-amber-300',
    'five-domain': 'bg-cyan-900/50 text-cyan-300',
  };
  const labels: Record<string, string> = {
    'single-agent': 'Single Agent',
    'multi-agent': 'Multi-Agent',
    'policy': 'Policy',
    'maturation': 'Maturation',
    'five-domain': 'Five Domain',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[category] || 'bg-gray-700 text-gray-300'}`}>
      {labels[category] || category}
    </span>
  );
}

function FeatureBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${active ? 'bg-emerald-900/40 text-emerald-300' : 'bg-gray-800 text-gray-600'}`}>
      {label}
    </span>
  );
}

function MiniSparkline({ data, color, height = 32, width = 120 }: { data: number[]; color: string; height?: number; width?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function LifeTable({ lives }: { lives: LifeSummary[] }) {
  if (lives.length === 0) return <p className="text-gray-500 text-sm">No individual life data available.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="text-left py-2 pr-4">Life</th>
            <th className="text-right py-2 px-3">Ticks</th>
            <th className="text-right py-2 px-3">Start Trust</th>
            <th className="text-right py-2 px-3">End Trust</th>
            <th className="text-right py-2 px-3">Change</th>
            <th className="text-right py-2 px-3">End ATP</th>
            <th className="text-left py-2 pl-3">Outcome</th>
          </tr>
        </thead>
        <tbody>
          {lives.map(life => (
            <tr key={life.lifeNumber} className="border-b border-gray-800 hover:bg-gray-800/50">
              <td className="py-2 pr-4 font-medium">#{life.lifeNumber}</td>
              <td className="text-right py-2 px-3">{life.duration}</td>
              <td className="text-right py-2 px-3">{life.startTrust.toFixed(3)}</td>
              <td className="text-right py-2 px-3">{life.endTrust.toFixed(3)}</td>
              <td className={`text-right py-2 px-3 ${life.trustChange > 0 ? 'text-emerald-400' : life.trustChange < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                {life.trustChange > 0 ? '+' : ''}{life.trustChange.toFixed(3)}
              </td>
              <td className="text-right py-2 px-3">{Math.round(life.endATP)}</td>
              <td className="py-2 pl-3">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  life.terminationReason === 'atp_exhaustion' ? 'bg-red-900/40 text-red-300' :
                  life.terminationReason === 'simulation_end' || life.terminationReason === 'none' ? 'bg-emerald-900/40 text-emerald-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {life.terminationReason === 'atp_exhaustion' ? 'ATP Exhausted' :
                   life.terminationReason === 'simulation_end' || life.terminationReason === 'none' ? 'Survived' :
                   life.terminationReason}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TrustTrajectoryChart({ trajectories, height = 140 }: { trajectories: number[][]; height?: number }) {
  if (trajectories.length === 0) return null;

  const allValues = trajectories.flat();
  if (allValues.length === 0) return null;

  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const width = 400;
  const colors = ['#60a5fa', '#34d399', '#f59e0b', '#ef4444', '#a78bfa'];

  // Flatten all lives into continuous timeline for total length
  const totalLength = trajectories.reduce((sum, t) => sum + t.length, 0);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height + 20}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(v => {
          const y = height - ((v - min) / range) * (height - 10) - 5;
          return (
            <g key={v}>
              <line x1={0} y1={y} x2={width} y2={y} stroke="#374151" strokeWidth="0.5" />
              <text x={width + 4} y={y + 3} fill="#6b7280" fontSize="8">{v.toFixed(2)}</text>
            </g>
          );
        })}

        {/* Consciousness threshold */}
        {min < 0.5 && max > 0.4 && (
          <>
            <line
              x1={0}
              y1={height - ((0.5 - min) / range) * (height - 10) - 5}
              x2={width}
              y2={height - ((0.5 - min) / range) * (height - 10) - 5}
              stroke="#f59e0b"
              strokeWidth="0.5"
              strokeDasharray="4,4"
            />
            <text
              x={4}
              y={height - ((0.5 - min) / range) * (height - 10) - 8}
              fill="#f59e0b"
              fontSize="7"
            >
              consciousness threshold (0.5)
            </text>
          </>
        )}

        {/* Trust trajectories */}
        {trajectories.map((trajectory, lifeIdx) => {
          if (trajectory.length < 2) return null;
          const offset = trajectories.slice(0, lifeIdx).reduce((sum, t) => sum + t.length, 0);

          const points = trajectory.map((v, i) => {
            const x = ((offset + i) / (totalLength - 1)) * width;
            const y = height - ((v - min) / range) * (height - 10) - 5;
            return `${x},${y}`;
          }).join(' ');

          return (
            <polyline
              key={lifeIdx}
              points={points}
              fill="none"
              stroke={colors[lifeIdx % colors.length]}
              strokeWidth="2"
              opacity="0.8"
            />
          );
        })}

        {/* Life separators */}
        {trajectories.slice(0, -1).map((trajectory, lifeIdx) => {
          const offset = trajectories.slice(0, lifeIdx + 1).reduce((sum, t) => sum + t.length, 0);
          const x = (offset / (totalLength - 1)) * width;
          return (
            <line
              key={`sep-${lifeIdx}`}
              x1={x} y1={0} x2={x} y2={height}
              stroke="#4b5563"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Life labels */}
        {trajectories.map((trajectory, lifeIdx) => {
          const offset = trajectories.slice(0, lifeIdx).reduce((sum, t) => sum + t.length, 0);
          const midpoint = offset + trajectory.length / 2;
          const x = (midpoint / (totalLength - 1)) * width;
          return (
            <text
              key={`label-${lifeIdx}`}
              x={x}
              y={height + 14}
              fill={colors[lifeIdx % colors.length]}
              fontSize="8"
              textAnchor="middle"
            >
              Life {lifeIdx + 1}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function NetworkSummary({ rawData }: { rawData: any }) {
  if (!rawData?.agents) return null;

  const agents = rawData.agents;
  const snapshots = rawData.snapshots || [];
  const events = rawData.events || [];

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-300">Network Agents</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {agents.map((agent: any) => (
          <div key={agent.agent_id || agent.lct} className="bg-gray-800 rounded p-3 text-center">
            <div className="font-medium text-sm">{agent.name || agent.agent_id || 'Agent'}</div>
            <div className="text-xs text-gray-400 mt-1">
              {agent.personality || agent.strategy || 'default'}
            </div>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-medium text-gray-300 mt-4">Timeline Snapshots</h4>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {snapshots.map((snap: any, i: number) => (
          <div key={i} className="flex-shrink-0 bg-gray-800 rounded px-3 py-2 text-xs">
            <div className="text-gray-400">Tick {snap.tick || i}</div>
            <div className="text-white">{snap.total_trust_links || '?'} links</div>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-medium text-gray-300 mt-4">Events ({events.length})</h4>
      <div className="max-h-40 overflow-y-auto space-y-1">
        {events.slice(0, 20).map((ev: any, i: number) => (
          <div key={i} className="text-xs text-gray-400 flex gap-2">
            <span className="text-gray-600 w-12 flex-shrink-0">t={ev.tick}</span>
            <span>{ev.event_type || ev.type}: {ev.description || ev.detail || JSON.stringify(ev).slice(0, 80)}</span>
          </div>
        ))}
        {events.length > 20 && (
          <div className="text-xs text-gray-600">... and {events.length - 20} more events</div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Comparison View
// ============================================================================

function ComparisonView({ datasets, loadedData }: { datasets: SimulationDataset[]; loadedData: Map<string, DatasetDetail> }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const compareData = compareIds.map(id => loadedData.get(id)).filter(Boolean) as DatasetDetail[];

  if (compareData.length < 2) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-3">Compare Datasets</h3>
        <p className="text-gray-400 text-sm mb-4">Select 2-4 datasets to compare side-by-side. Click dataset cards to select.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {datasets.filter(d => d.category !== 'multi-agent').map(ds => (
            <button
              key={ds.id}
              onClick={() => toggleCompare(ds.id)}
              className={`text-left p-3 rounded border text-sm transition-colors ${
                compareIds.includes(ds.id)
                  ? 'border-blue-500 bg-blue-900/30 text-blue-200'
                  : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
              }`}
            >
              <div className="font-medium text-xs">{ds.label}</div>
              <div className="text-gray-500 text-xs mt-1">{ds.lifeCount} lives</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Compute comparison metrics
  const metrics = compareData.map(d => {
    const lives = d.lives;
    const finalTrust = lives.length > 0 ? lives[lives.length - 1].endTrust : 0;
    const totalDuration = lives.reduce((sum, l) => sum + l.duration, 0);
    const avgTrust = lives.length > 0 ? lives.reduce((sum, l) => sum + l.avgTrust, 0) / lives.length : 0;
    const totalTrustGrowth = lives.length > 0 ? lives[lives.length - 1].endTrust - lives[0].startTrust : 0;

    return {
      label: d.meta.label,
      id: d.meta.id,
      finalTrust,
      totalDuration,
      avgTrust,
      totalTrustGrowth,
      lifeCount: lives.length,
    };
  });

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Comparison: {compareData.length} Datasets</h3>
        <button
          onClick={() => setCompareIds([])}
          className="text-xs text-gray-400 hover:text-white px-2 py-1 bg-gray-700 rounded"
        >
          Clear
        </button>
      </div>

      {/* Selection buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {datasets.filter(d => d.category !== 'multi-agent').map(ds => (
          <button
            key={ds.id}
            onClick={() => toggleCompare(ds.id)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              compareIds.includes(ds.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {ds.label}
          </button>
        ))}
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2 pr-4">Metric</th>
              {metrics.map(m => (
                <th key={m.id} className="text-right py-2 px-3">{m.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-2 pr-4 text-gray-400">Lives</td>
              {metrics.map(m => (
                <td key={m.id} className="text-right py-2 px-3">{m.lifeCount}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2 pr-4 text-gray-400">Avg Trust</td>
              {metrics.map(m => (
                <td key={m.id} className="text-right py-2 px-3">{m.avgTrust.toFixed(3)}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2 pr-4 text-gray-400">Final Trust</td>
              {metrics.map(m => (
                <td key={m.id} className="text-right py-2 px-3 font-medium">{m.finalTrust.toFixed(3)}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2 pr-4 text-gray-400">Trust Growth</td>
              {metrics.map(m => (
                <td key={m.id} className={`text-right py-2 px-3 ${m.totalTrustGrowth > 0 ? 'text-emerald-400' : m.totalTrustGrowth < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                  {m.totalTrustGrowth > 0 ? '+' : ''}{m.totalTrustGrowth.toFixed(3)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-2 pr-4 text-gray-400">Total Ticks</td>
              {metrics.map(m => (
                <td key={m.id} className="text-right py-2 px-3">{m.totalDuration}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Side-by-side trust trajectories */}
      <h4 className="text-sm font-medium text-gray-300 mt-6 mb-3">Trust Trajectories</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {compareData.map(d => (
          <div key={d.meta.id} className="bg-gray-900 rounded p-3">
            <div className="text-xs text-gray-400 mb-2">{d.meta.label}</div>
            {d.trustTrajectory.length > 0 ? (
              <TrustTrajectoryChart trajectories={d.trustTrajectory} height={80} />
            ) : (
              <div className="text-xs text-gray-600">No trajectory data</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function DataExplorerPage() {
  const [loadedData, setLoadedData] = useState<Map<string, DatasetDetail>>(new Map());
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'browse' | 'compare'>('browse');

  // Load all datasets on mount
  useEffect(() => {
    async function loadAll() {
      const results = new Map<string, DatasetDetail>();

      await Promise.all(DATASETS.map(async (ds) => {
        try {
          const res = await fetch(`/${ds.filename}`);
          if (!res.ok) return;
          const rawData = await res.json();
          const lives = parseLifeData(rawData, ds.id);
          const { trust, atp } = extractTrajectories(rawData, ds.id);

          results.set(ds.id, {
            meta: ds,
            lives,
            trustTrajectory: trust,
            atpTrajectory: atp,
            eventCount: rawData?.events?.length || 0,
            rawData,
          });
        } catch (err) {
          console.error(`Failed to load ${ds.filename}:`, err);
        }
      }));

      setLoadedData(results);
      setLoading(false);
    }
    loadAll();
  }, []);

  const categories = useMemo(() =>
    Array.from(new Set(DATASETS.map(d => d.category))),
    []
  );

  const filteredDatasets = categoryFilter
    ? DATASETS.filter(d => d.category === categoryFilter)
    : DATASETS;

  const categoryLabels: Record<string, string> = {
    'single-agent': 'Single Agent',
    'multi-agent': 'Multi-Agent',
    'policy': 'Policy',
    'maturation': 'Maturation',
    'five-domain': 'Five Domain',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <Breadcrumbs currentPath="/data-explorer" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Simulation Data Explorer</h1>
          <p className="text-gray-400 max-w-3xl">
            Browse, inspect, and compare all simulation datasets. Each dataset captures
            a different aspect of Web4 trust dynamics — from single-agent learning to
            multi-agent social structures.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{DATASETS.length}</div>
            <div className="text-xs text-gray-400 mt-1">Datasets</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{DATASETS.reduce((s, d) => s + d.lifeCount, 0)}</div>
            <div className="text-xs text-gray-400 mt-1">Total Lives</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{DATASETS.reduce((s, d) => s + d.agentCount, 0)}</div>
            <div className="text-xs text-gray-400 mt-1">Total Agents</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{categories.length}</div>
            <div className="text-xs text-gray-400 mt-1">Categories</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* View mode toggle */}
          <div className="flex bg-gray-800 rounded overflow-hidden">
            <button
              onClick={() => setViewMode('browse')}
              className={`px-4 py-2 text-sm ${viewMode === 'browse' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Browse
            </button>
            <button
              onClick={() => setViewMode('compare')}
              className={`px-4 py-2 text-sm ${viewMode === 'compare' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Compare
            </button>
          </div>

          {/* Category filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setCategoryFilter('')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${!categoryFilter ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat === categoryFilter ? '' : cat)}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12 text-gray-500">
            Loading simulation data...
          </div>
        )}

        {/* Compare view */}
        {viewMode === 'compare' && !loading && (
          <ComparisonView datasets={DATASETS} loadedData={loadedData} />
        )}

        {/* Browse view */}
        {viewMode === 'browse' && !loading && (
          <div className="space-y-4">
            {filteredDatasets.map(ds => {
              const detail = loadedData.get(ds.id);
              const isExpanded = expandedId === ds.id;

              return (
                <div key={ds.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                  {/* Card header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ds.id)}
                    className="w-full text-left p-5 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-bold">{ds.label}</h2>
                          <CategoryBadge category={ds.category} />
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{ds.description}</p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span>{ds.agentCount} agent{ds.agentCount > 1 ? 's' : ''}</span>
                          <span>{ds.lifeCount} {ds.lifeCount === 1 ? 'life' : 'lives'}</span>
                          <span>{ds.totalTicks} ticks</span>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <FeatureBadge label="EP" active={ds.hasEP} />
                          <FeatureBadge label="Karma" active={ds.hasKarma} />
                          <FeatureBadge label="Policy" active={ds.hasPolicy} />
                        </div>
                      </div>

                      {/* Mini sparkline preview */}
                      <div className="ml-4 flex-shrink-0">
                        {detail && detail.trustTrajectory.length > 0 && (
                          <div className="text-right">
                            <div className="text-xs text-gray-500 mb-1">Trust</div>
                            <MiniSparkline data={detail.trustTrajectory.flat()} color="#60a5fa" />
                          </div>
                        )}
                        <div className="text-xs text-gray-600 mt-2 text-right">
                          {isExpanded ? 'Click to collapse' : 'Click to expand'}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isExpanded && detail && (
                    <div className="border-t border-gray-700 p-5 space-y-6">
                      {/* Highlights */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Key Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {ds.highlights.map(h => (
                            <span key={h} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">{h}</span>
                          ))}
                        </div>
                      </div>

                      {/* Trust trajectory chart */}
                      {detail.trustTrajectory.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-300 mb-2">Trust Trajectory</h3>
                          <div className="bg-gray-900 rounded p-4">
                            <TrustTrajectoryChart trajectories={detail.trustTrajectory} />
                          </div>
                        </div>
                      )}

                      {/* Life table */}
                      {detail.lives.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-300 mb-2">Life Summary</h3>
                          <LifeTable lives={detail.lives} />
                        </div>
                      )}

                      {/* Network-specific view */}
                      {ds.category === 'multi-agent' && (
                        <NetworkSummary rawData={detail.rawData} />
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {ds.narrativeId && (
                          <Link
                            href={`/narratives/${ds.narrativeId}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                          >
                            Read Narrative
                          </Link>
                        )}
                        <Link
                          href="/lab-console"
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                          Open in Lab Console
                        </Link>
                        <a
                          href={`/${ds.filename}`}
                          download
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                          Download JSON
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Context info */}
        <div className="mt-10 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">Understanding the Data</h3>
          <div className="space-y-3 text-sm text-gray-400">
            <p>
              Each dataset captures a different simulation scenario. <strong className="text-white">Trust</strong> measures
              how the society perceives an agent (0-1 scale, 0.5 = consciousness threshold).
              <strong className="text-white"> ATP</strong> is attention tokens — the metabolic budget for actions.
            </p>
            <p>
              <strong className="text-white">Karma</strong> carries trust consequences across lives.
              <strong className="text-white"> EP</strong> (Epistemic Proprioception) enables learning from experience.
              <strong className="text-white"> Policy</strong> frameworks define governance rules.
            </p>
            <p>
              The <Link href="/maturation-web4" className="text-blue-400 hover:underline">maturation datasets</Link> are
              particularly interesting to compare: one uses Web4 patterns (inherited wisdom), the other starts from scratch.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link href="/narratives" className="text-gray-400 hover:text-white transition-colors">
            Narratives
          </Link>
          <Link href="/lab-console" className="text-gray-400 hover:text-white transition-colors">
            Lab Console
          </Link>
        </div>

        <ExplorerNav currentPath="/data-explorer" />
        <RelatedConcepts currentPath="/data-explorer" />
      </div>
    </div>
  );
}
