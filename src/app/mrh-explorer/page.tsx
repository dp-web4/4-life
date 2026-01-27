'use client';

/**
 * MRH Explorer - Interactive Markov Relevancy Horizon Visualizer
 *
 * Lets humans explore the concept of "context boundaries" in Web4:
 * - Visual network graph showing what agents can/can't see
 * - 4D horizon controls (spatial, temporal, complexity, quality)
 * - Trust decay visualization across relationship depth
 * - ATP cost calculator for different horizon configurations
 * - Multiple path trust combination
 * - Interactive scenario: "How far can I see?"
 *
 * Based on mrh_profiles.py, mrh_aware_trust.py, mrh_trust_propagation.py
 */

import { useState, useCallback, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedConcepts from '@/components/RelatedConcepts';
import ExplorerNav from '@/components/ExplorerNav';

// ============================================================================
// Types
// ============================================================================

type SpatialExtent = 'local' | 'regional' | 'global';
type TemporalExtent = 'ephemeral' | 'session' | 'day' | 'epoch';
type ComplexityExtent = 'simple' | 'agent-scale' | 'society-scale';
type QualityLevel = 'low' | 'medium' | 'high' | 'critical';

interface MRHProfile {
  deltaR: SpatialExtent;
  deltaT: TemporalExtent;
  deltaC: ComplexityExtent;
  deltaQ: QualityLevel;
}

interface NetworkNode {
  id: string;
  label: string;
  type: 'agent' | 'service' | 'society';
  depth: number; // from perspective entity
  x: number;
  y: number;
  trust: number;
}

interface NetworkEdge {
  from: string;
  to: string;
  trust: number;
  type: 'bound' | 'paired' | 'witnessed';
}

// ============================================================================
// Constants
// ============================================================================

const SPATIAL_LEVELS: { key: SpatialExtent; label: string; ordinal: number; desc: string }[] = [
  { key: 'local', label: 'Local', ordinal: 0, desc: 'Same society neighborhood' },
  { key: 'regional', label: 'Regional', ordinal: 1, desc: 'Federation subset' },
  { key: 'global', label: 'Global', ordinal: 2, desc: 'Entire federation' },
];

const TEMPORAL_LEVELS: { key: TemporalExtent; label: string; ordinal: number; desc: string }[] = [
  { key: 'ephemeral', label: 'Ephemeral', ordinal: 0, desc: 'Single message' },
  { key: 'session', label: 'Session', ordinal: 1, desc: 'Conversation/task' },
  { key: 'day', label: 'Day', ordinal: 2, desc: 'Daily cycles' },
  { key: 'epoch', label: 'Epoch', ordinal: 3, desc: 'Weeks/months' },
];

const COMPLEXITY_LEVELS: { key: ComplexityExtent; label: string; ordinal: number; desc: string }[] = [
  { key: 'simple', label: 'Simple', ordinal: 0, desc: 'Single-step operation' },
  { key: 'agent-scale', label: 'Agent-Scale', ordinal: 1, desc: 'Multi-step agent tasks' },
  { key: 'society-scale', label: 'Society-Scale', ordinal: 2, desc: 'Cross-agent coordination' },
];

const QUALITY_LEVELS: { key: QualityLevel; label: string; range: string; multiplier: number; desc: string }[] = [
  { key: 'low', label: 'Low', range: '0.5-0.7', multiplier: 1.0, desc: 'Best-effort, cached' },
  { key: 'medium', label: 'Medium', range: '0.7-0.85', multiplier: 1.5, desc: 'Validated, recent' },
  { key: 'high', label: 'High', range: '0.85-0.95', multiplier: 2.0, desc: 'Multi-witness verified' },
  { key: 'critical', label: 'Critical', range: '0.95-1.0', multiplier: 3.0, desc: 'Cryptographic proof' },
];

// ATP base costs for horizon combinations
const ATP_COSTS: Record<string, number> = {
  'local|ephemeral|simple': 0,
  'local|session|simple': 5,
  'local|session|agent-scale': 15,
  'local|day|agent-scale': 20,
  'local|day|society-scale': 30,
  'local|epoch|simple': 10,
  'local|epoch|agent-scale': 25,
  'local|epoch|society-scale': 40,
  'regional|ephemeral|simple': 10,
  'regional|session|simple': 20,
  'regional|session|agent-scale': 35,
  'regional|session|society-scale': 50,
  'regional|day|simple': 25,
  'regional|day|agent-scale': 45,
  'regional|day|society-scale': 75,
  'regional|epoch|simple': 30,
  'regional|epoch|agent-scale': 60,
  'regional|epoch|society-scale': 100,
  'global|ephemeral|simple': 25,
  'global|session|simple': 40,
  'global|session|agent-scale': 100,
  'global|session|society-scale': 150,
  'global|day|simple': 50,
  'global|day|agent-scale': 125,
  'global|day|society-scale': 200,
  'global|epoch|simple': 75,
  'global|epoch|agent-scale': 175,
  'global|epoch|society-scale': 300,
};

// Sample network
const SAMPLE_NODES: NetworkNode[] = [
  // Depth 0 - You
  { id: 'you', label: 'You', type: 'agent', depth: 0, x: 250, y: 200, trust: 1.0 },
  // Depth 1 - Direct
  { id: 'alice', label: 'Alice', type: 'agent', depth: 1, x: 130, y: 80, trust: 0.9 },
  { id: 'bob', label: 'Bob', type: 'agent', depth: 1, x: 370, y: 80, trust: 0.75 },
  { id: 'hospital', label: 'Hospital', type: 'society', depth: 1, x: 130, y: 320, trust: 0.85 },
  { id: 'timeserver', label: 'TimeServer', type: 'service', depth: 1, x: 370, y: 320, trust: 0.95 },
  // Depth 2 - Friends of friends
  { id: 'charlie', label: 'Charlie', type: 'agent', depth: 2, x: 50, y: 160, trust: 0.68 },
  { id: 'doctor', label: 'Dr. Smith', type: 'agent', depth: 2, x: 250, y: 30, trust: 0.72 },
  { id: 'pharmacy', label: 'Pharmacy', type: 'service', depth: 2, x: 450, y: 160, trust: 0.63 },
  { id: 'bank', label: 'Bank', type: 'society', depth: 2, x: 450, y: 280, trust: 0.57 },
  // Depth 3 - Edge of horizon
  { id: 'insurance', label: 'Insurance', type: 'society', depth: 3, x: 10, y: 60, trust: 0.41 },
  { id: 'lab', label: 'Lab Corp', type: 'service', depth: 3, x: 150, y: 380, trust: 0.38 },
  { id: 'specialist', label: 'Specialist', type: 'agent', depth: 3, x: 490, y: 60, trust: 0.35 },
  // Beyond - Invisible
  { id: 'regulator', label: 'Regulator', type: 'society', depth: 4, x: 10, y: 380, trust: 0.0 },
  { id: 'foreign', label: 'Foreign Agent', type: 'agent', depth: 4, x: 490, y: 380, trust: 0.0 },
];

const SAMPLE_EDGES: NetworkEdge[] = [
  // Depth 1
  { from: 'you', to: 'alice', trust: 0.9, type: 'paired' },
  { from: 'you', to: 'bob', trust: 0.75, type: 'paired' },
  { from: 'you', to: 'hospital', trust: 0.85, type: 'witnessed' },
  { from: 'you', to: 'timeserver', trust: 0.95, type: 'bound' },
  // Depth 2
  { from: 'alice', to: 'charlie', trust: 0.8, type: 'paired' },
  { from: 'alice', to: 'doctor', trust: 0.85, type: 'paired' },
  { from: 'bob', to: 'doctor', trust: 0.7, type: 'witnessed' },
  { from: 'bob', to: 'pharmacy', trust: 0.8, type: 'paired' },
  { from: 'hospital', to: 'bank', trust: 0.65, type: 'witnessed' },
  // Depth 3
  { from: 'charlie', to: 'insurance', trust: 0.6, type: 'witnessed' },
  { from: 'hospital', to: 'lab', trust: 0.7, type: 'paired' },
  { from: 'pharmacy', to: 'specialist', trust: 0.55, type: 'witnessed' },
  // Beyond
  { from: 'insurance', to: 'regulator', trust: 0.8, type: 'bound' },
  { from: 'specialist', to: 'foreign', trust: 0.4, type: 'witnessed' },
];

const PRESET_SCENARIOS: { label: string; desc: string; profile: MRHProfile }[] = [
  {
    label: 'Pattern Match',
    desc: 'Quick local check',
    profile: { deltaR: 'local', deltaT: 'ephemeral', deltaC: 'simple', deltaQ: 'low' },
  },
  {
    label: 'Agent Task',
    desc: 'Standard reasoning',
    profile: { deltaR: 'local', deltaT: 'session', deltaC: 'agent-scale', deltaQ: 'medium' },
  },
  {
    label: 'Society Decision',
    desc: 'Cross-agent coordination',
    profile: { deltaR: 'local', deltaT: 'day', deltaC: 'society-scale', deltaQ: 'high' },
  },
  {
    label: 'Federation Query',
    desc: 'Cross-society request',
    profile: { deltaR: 'regional', deltaT: 'session', deltaC: 'society-scale', deltaQ: 'high' },
  },
  {
    label: 'Global Audit',
    desc: 'Full network verification',
    profile: { deltaR: 'global', deltaT: 'epoch', deltaC: 'society-scale', deltaQ: 'critical' },
  },
];

// ============================================================================
// Utility Functions
// ============================================================================

function ordinalDistance(a: number, b: number, max: number): number {
  return Math.abs(a - b) / max;
}

function mrhDistance(a: MRHProfile, b: MRHProfile): number {
  const spatialA = SPATIAL_LEVELS.find(l => l.key === a.deltaR)!.ordinal;
  const spatialB = SPATIAL_LEVELS.find(l => l.key === b.deltaR)!.ordinal;
  const temporalA = TEMPORAL_LEVELS.find(l => l.key === a.deltaT)!.ordinal;
  const temporalB = TEMPORAL_LEVELS.find(l => l.key === b.deltaT)!.ordinal;
  const complexA = COMPLEXITY_LEVELS.find(l => l.key === a.deltaC)!.ordinal;
  const complexB = COMPLEXITY_LEVELS.find(l => l.key === b.deltaC)!.ordinal;

  return (
    0.4 * ordinalDistance(spatialA, spatialB, 2) +
    0.3 * ordinalDistance(temporalA, temporalB, 3) +
    0.3 * ordinalDistance(complexA, complexB, 2)
  );
}

function trustRelevance(distance: number, decay = 3.0): number {
  return Math.exp(-decay * distance);
}

function getBaseAtpCost(profile: MRHProfile): number {
  const key = `${profile.deltaR}|${profile.deltaT}|${profile.deltaC}`;
  return ATP_COSTS[key] ?? 50; // fallback
}

function getQualityMultiplier(quality: QualityLevel): number {
  return QUALITY_LEVELS.find(l => l.key === quality)!.multiplier;
}

function getTotalAtpCost(profile: MRHProfile): number {
  return getBaseAtpCost(profile) * getQualityMultiplier(profile.deltaQ);
}

function multiplicativeTrust(pathTrusts: number[], decayFactor = 0.9): number {
  let trust = 1.0;
  for (let i = 0; i < pathTrusts.length; i++) {
    trust *= pathTrusts[i] * Math.pow(decayFactor, i);
  }
  return trust;
}

function combinedTrustProbabilistic(pathTrusts: number[]): number {
  let product = 1.0;
  for (const t of pathTrusts) {
    product *= (1 - t);
  }
  return 1 - product;
}

// ============================================================================
// Components
// ============================================================================

function NetworkGraph({ maxDepth, highlightNode }: { maxDepth: number; highlightNode: string | null }) {
  const depthColors = ['#6ee7b7', '#93c5fd', '#fde68a', '#fca5a5'];
  const depthOpacities = [1.0, 0.8, 0.5, 0.25];

  return (
    <div style={{
      position: 'relative', width: '500px', height: '400px',
      background: 'var(--color-bg-tertiary)', borderRadius: '0.75rem',
      overflow: 'hidden', border: '1px solid var(--color-border)',
    }}>
      {/* Concentric depth rings */}
      {[3, 2, 1].map(depth => (
        <div key={depth} style={{
          position: 'absolute',
          left: `${250 - depth * 70}px`, top: `${200 - depth * 60}px`,
          width: `${depth * 140}px`, height: `${depth * 120}px`,
          borderRadius: '50%',
          border: `1px dashed ${depth <= maxDepth ? depthColors[depth] || '#fff' : '#ffffff10'}`,
          opacity: depth <= maxDepth ? 0.3 : 0.05,
          transition: 'opacity 0.3s',
        }} />
      ))}

      {/* Depth label */}
      <div style={{
        position: 'absolute', top: '0.5rem', left: '0.5rem',
        fontSize: '0.7rem', color: 'var(--color-text-muted)',
      }}>
        Horizon Depth: {maxDepth}
      </div>

      {/* Edges */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {SAMPLE_EDGES.map((edge, i) => {
          const fromNode = SAMPLE_NODES.find(n => n.id === edge.from);
          const toNode = SAMPLE_NODES.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;
          const visible = fromNode.depth <= maxDepth && toNode.depth <= maxDepth;
          const highlight = highlightNode && (edge.from === highlightNode || edge.to === highlightNode);
          return (
            <line
              key={i}
              x1={fromNode.x} y1={fromNode.y}
              x2={toNode.x} y2={toNode.y}
              stroke={visible ? (highlight ? '#6ee7b7' : '#ffffff20') : '#ffffff05'}
              strokeWidth={highlight ? 2 : 1}
              strokeDasharray={edge.type === 'witnessed' ? '4 4' : edge.type === 'bound' ? undefined : '8 4'}
              style={{ transition: 'all 0.3s' }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {SAMPLE_NODES.map(node => {
        const visible = node.depth <= maxDepth;
        const highlight = highlightNode === node.id;
        const depthColor = depthColors[node.depth] || '#ffffff';
        const opacity = visible ? depthOpacities[node.depth] || 0.2 : 0.05;
        const nodeSize = node.depth === 0 ? 36 : node.depth === 1 ? 28 : node.depth === 2 ? 22 : 18;

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: `${node.x - nodeSize / 2}px`, top: `${node.y - nodeSize / 2}px`,
              width: `${nodeSize}px`, height: `${nodeSize}px`,
              borderRadius: '50%',
              background: visible ? `${depthColor}${highlight ? '60' : '20'}` : '#ffffff05',
              border: `2px solid ${visible ? depthColor : '#ffffff10'}`,
              opacity: highlight ? 1 : opacity,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: node.depth === 0 ? '0.8rem' : '0.6rem',
              color: visible ? depthColor : '#ffffff20',
              transition: 'all 0.3s',
              cursor: visible ? 'default' : 'not-allowed',
            }}
            title={visible ? `${node.label} (depth ${node.depth}, trust ${node.trust.toFixed(2)})` : 'Beyond horizon'}
          >
            {node.type === 'agent' ? (node.depth === 0 ? '★' : '●') : node.type === 'service' ? '◆' : '■'}
          </div>
        );
      })}

      {/* Node labels */}
      {SAMPLE_NODES.map(node => {
        const visible = node.depth <= maxDepth;
        if (!visible) return null;
        return (
          <div
            key={`label-${node.id}`}
            style={{
              position: 'absolute',
              left: `${node.x}px`, top: `${node.y + (node.depth === 0 ? 22 : 16)}px`,
              transform: 'translateX(-50%)',
              fontSize: '0.6rem', color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap', opacity: node.depth <= maxDepth ? 0.8 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            {node.label}
          </div>
        );
      })}

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: '0.5rem', right: '0.5rem',
        display: 'flex', gap: '0.75rem', fontSize: '0.6rem', color: 'var(--color-text-muted)',
      }}>
        <span>● Agent</span>
        <span>◆ Service</span>
        <span>■ Society</span>
      </div>
    </div>
  );
}

function DimensionSelector<T extends string>({
  label, levels, selected, onChange, weightPct,
}: {
  label: string;
  levels: { key: T; label: string; desc: string }[];
  selected: T;
  onChange: (v: T) => void;
  weightPct: number;
}) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{label}</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{weightPct}% weight</span>
      </div>
      <div style={{ display: 'flex', gap: '0.375rem' }}>
        {levels.map(level => (
          <button
            key={level.key}
            onClick={() => onChange(level.key)}
            style={{
              flex: 1, padding: '0.375rem 0.25rem', borderRadius: '0.375rem',
              border: `1px solid ${selected === level.key ? '#3b82f6' : 'var(--color-border)'}`,
              background: selected === level.key ? '#3b82f620' : 'var(--color-bg-tertiary)',
              color: selected === level.key ? '#93c5fd' : 'var(--color-text-muted)',
              cursor: 'pointer', fontSize: '0.7rem', fontWeight: selected === level.key ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            <div>{level.label}</div>
            <div style={{ fontSize: '0.55rem', marginTop: '0.125rem', opacity: 0.7 }}>{level.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TrustDecayVisualizer({ depthTrusts }: { depthTrusts: number[] }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.25rem',
      padding: '0.75rem', borderRadius: '0.5rem',
      background: 'var(--color-bg-tertiary)',
    }}>
      {depthTrusts.map((trust, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{
            width: '40px', height: `${Math.max(8, trust * 40)}px`,
            borderRadius: '4px',
            background: trust > 0.7 ? '#6ee7b7' : trust > 0.4 ? '#fde68a' : '#fca5a5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontFamily: 'monospace', color: '#000',
            fontWeight: 600, minHeight: '16px',
          }}>
            {trust.toFixed(2)}
          </div>
          {i < depthTrusts.length - 1 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>→</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function MRHExplorerPage() {
  const [maxDepth, setMaxDepth] = useState(2);
  const [highlightNode, setHighlightNode] = useState<string | null>(null);
  const [profile, setProfile] = useState<MRHProfile>({
    deltaR: 'local', deltaT: 'session', deltaC: 'agent-scale', deltaQ: 'medium',
  });
  const [compareProfile, setCompareProfile] = useState<MRHProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'concept' | 'decay' | 'paths' | 'cost'>('concept');

  // Derived
  const atpCost = useMemo(() => getTotalAtpCost(profile), [profile]);
  const baseCost = useMemo(() => getBaseAtpCost(profile), [profile]);
  const qualityMul = useMemo(() => getQualityMultiplier(profile.deltaQ), [profile]);

  const contextDistance = useMemo(() => {
    if (!compareProfile) return 0;
    return mrhDistance(profile, compareProfile);
  }, [profile, compareProfile]);

  const relevanceScore = useMemo(() => trustRelevance(contextDistance), [contextDistance]);

  // Example path trusts for decay visualization
  const examplePathTrusts = useMemo(() => {
    const depths = [];
    let current = 1.0;
    for (let d = 0; d <= 3; d++) {
      depths.push(current);
      current *= 0.85 * 0.9; // trust * decay
    }
    return depths;
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Breadcrumbs currentPath="/mrh-explorer" />

      {/* Header */}
      <h1 style={{
        fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        MRH Explorer
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '700px' }}>
        Explore the Markov Relevancy Horizon &mdash; the context boundary that defines what each agent can see and
        affect. Adjust horizon depth, explore the 4D MRH profile, and see how distance decays trust.
      </p>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Left: Network Graph */}
        <div>
          <NetworkGraph maxDepth={maxDepth} highlightNode={highlightNode} />

          {/* Depth slider */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Horizon Depth</span>
              <span style={{ fontFamily: 'monospace', color: '#06b6d4' }}>{maxDepth} hops</span>
            </div>
            <input
              type="range" min={0} max={4} step={1}
              value={maxDepth}
              onChange={e => setMaxDepth(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
              <span>Only self</span>
              <span>Direct (1)</span>
              <span>Default (2)</span>
              <span>Max (3)</span>
              <span>Beyond</span>
            </div>
          </div>

          {/* Node explorer */}
          <div style={{
            marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              Explore Nodes (hover to highlight)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {SAMPLE_NODES.filter(n => n.depth <= maxDepth).map(node => (
                <button
                  key={node.id}
                  onMouseEnter={() => setHighlightNode(node.id)}
                  onMouseLeave={() => setHighlightNode(null)}
                  style={{
                    padding: '0.25rem 0.5rem', borderRadius: '999px',
                    border: '1px solid var(--color-border)', background: 'var(--color-bg-tertiary)',
                    cursor: 'pointer', fontSize: '0.65rem', color: 'var(--color-text)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {node.label} <span style={{ color: 'var(--color-text-muted)' }}>d{node.depth}</span>
                </button>
              ))}
            </div>
            {SAMPLE_NODES.filter(n => n.depth > maxDepth).length > 0 && (
              <div style={{ fontSize: '0.65rem', color: '#fca5a5', marginTop: '0.375rem' }}>
                {SAMPLE_NODES.filter(n => n.depth > maxDepth).length} entities beyond horizon (invisible)
              </div>
            )}
          </div>
        </div>

        {/* Right: MRH Profile Controls */}
        <div>
          <div style={{
            padding: '1.25rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              4D Horizon Profile
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Each action has a 4-dimensional context that determines its cost, required trust, and visibility.
            </p>

            <DimensionSelector
              label="Spatial (ΔR)"
              levels={SPATIAL_LEVELS}
              selected={profile.deltaR}
              onChange={v => setProfile(p => ({ ...p, deltaR: v }))}
              weightPct={40}
            />
            <DimensionSelector
              label="Temporal (ΔT)"
              levels={TEMPORAL_LEVELS}
              selected={profile.deltaT}
              onChange={v => setProfile(p => ({ ...p, deltaT: v }))}
              weightPct={30}
            />
            <DimensionSelector
              label="Complexity (ΔC)"
              levels={COMPLEXITY_LEVELS}
              selected={profile.deltaC}
              onChange={v => setProfile(p => ({ ...p, deltaC: v }))}
              weightPct={30}
            />
            <DimensionSelector
              label="Quality (ΔQ)"
              levels={QUALITY_LEVELS.map(l => ({ key: l.key, label: l.label, desc: `${l.range} (${l.multiplier}x)` }))}
              selected={profile.deltaQ}
              onChange={v => setProfile(p => ({ ...p, deltaQ: v }))}
              weightPct={0}
            />

            {/* ATP Cost */}
            <div style={{
              marginTop: '0.5rem', padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>ATP Cost</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {baseCost} base x {qualityMul}x quality
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace',
                color: atpCost <= 30 ? '#6ee7b7' : atpCost <= 100 ? '#fde68a' : '#fca5a5',
              }}>
                {atpCost.toFixed(0)} ATP
              </div>
            </div>
          </div>

          {/* Presets */}
          <div style={{
            padding: '1rem', borderRadius: '0.75rem',
            background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quick Presets</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
              {PRESET_SCENARIOS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setProfile(preset.profile)}
                  style={{
                    padding: '0.5rem', borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)', background: 'var(--color-bg-tertiary)',
                    cursor: 'pointer', textAlign: 'left', fontSize: '0.7rem',
                    color: 'var(--color-text)', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#06b6d450')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                >
                  <div style={{ fontWeight: 600 }}>{preset.label}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.6rem' }}>{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex', gap: '0.25rem', marginBottom: '1rem',
        borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem',
      }}>
        {[
          { key: 'concept' as const, label: 'Why MRH Matters' },
          { key: 'decay' as const, label: 'Trust Decay' },
          { key: 'paths' as const, label: 'Multiple Paths' },
          { key: 'cost' as const, label: 'Cost Calculator' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '0.5rem 1rem', borderRadius: '0.5rem 0.5rem 0 0',
              border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              background: activeTab === tab.key ? 'var(--color-bg-secondary)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-text)' : 'var(--color-text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid #06b6d4' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        padding: '1.5rem', borderRadius: '0 0 0.75rem 0.75rem',
        background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
        marginBottom: '2rem',
      }}>
        {activeTab === 'concept' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Why Context Boundaries?</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              In the real world, you can&apos;t see everything. You know your friends, have some sense of their friends,
              and beyond that it&apos;s mostly unknown. MRH formalizes this natural limitation as a <strong>privacy-preserving
              context boundary</strong>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { title: 'Natural Privacy', desc: 'Entities beyond your horizon can\'t see your relationships. Privacy emerges from network structure, not access control lists.', color: '#06b6d4' },
                { title: 'Computational Efficiency', desc: 'With ~10 connections per entity, depth-3 traversal covers ~1,000 entities instead of the entire network. O(d³) vs O(n).', color: '#8b5cf6' },
                { title: 'Spam Prevention', desc: 'Actions outside your horizon cost exponentially more ATP. You can\'t spam people you don\'t know without burning through resources.', color: '#f59e0b' },
                { title: 'Trust Accuracy', desc: 'Beyond 3 hops, trust signals degrade below statistical significance (Markov property). MRH stops before trust becomes noise.', color: '#10b981' },
              ].map(item => (
                <div key={item.title} style={{
                  padding: '1rem', borderRadius: '0.5rem',
                  border: `1px solid ${item.color}30`, background: `${item.color}08`,
                }}>
                  <div style={{ color: item.color, fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
            }}>
              <strong>The key insight:</strong> MRH creates a world where privacy, efficiency, and accuracy all align.
              You see what&apos;s relevant, can&apos;t spy on what isn&apos;t, and the system naturally scales without central coordination.
            </div>
          </div>
        )}

        {activeTab === 'decay' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Trust Decays with Distance</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              As trust propagates through the network, each hop <strong>multiplicatively reduces</strong> the signal.
              With a decay factor of 0.9 per hop and typical edge trust of 0.85:
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Trust at each depth (0.85 edge trust, 0.9 decay):
              </div>
              <TrustDecayVisualizer depthTrusts={examplePathTrusts} />
              <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                <span>You (1.0)</span>
                <span>Depth 1</span>
                <span>Depth 2</span>
                <span>Depth 3</span>
              </div>
            </div>

            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', fontFamily: 'monospace', fontSize: '0.75rem',
              color: 'var(--color-text-muted)', lineHeight: 1.8,
            }}>
              trust_path = t1 x t2 x t3 x (decay ^ depth)<br />
              <br />
              Depth 0: 1.000 (self)<br />
              Depth 1: 0.85 x 0.9^0 = <span style={{ color: '#6ee7b7' }}>0.850</span><br />
              Depth 2: 0.85 x 0.85 x 0.9^1 = <span style={{ color: '#fde68a' }}>0.650</span><br />
              Depth 3: 0.85 x 0.85 x 0.85 x 0.9^2 = <span style={{ color: '#fca5a5' }}>0.497</span>
            </div>

            <div style={{
              marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem',
              border: '1px solid #06b6d430', background: '#06b6d408',
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
            }}>
              By depth 3, even a network of highly trusted entities only propagates ~50% of the original trust.
              This is why depth 3 is the default maximum &mdash; beyond this, trust signals become unreliable.
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Multiple Paths Combine</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
              If you have <strong>multiple paths</strong> to the same entity, trust combines probabilistically.
              Two weak paths can create stronger trust than either alone.
            </p>

            {/* Interactive example */}
            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>
                Example: Two paths to Dr. Smith
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-secondary)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#93c5fd', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Path 1: You → Alice → Dr. Smith
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    0.9 x 0.85 x 0.9 = <span style={{ color: '#6ee7b7' }}>0.689</span>
                  </div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg-secondary)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#c4b5fd', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Path 2: You → Bob → Dr. Smith
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    0.75 x 0.7 x 0.9 = <span style={{ color: '#6ee7b7' }}>0.473</span>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '0.75rem', borderRadius: '0.5rem',
                background: 'var(--color-bg-secondary)', fontFamily: 'monospace', fontSize: '0.8rem',
              }}>
                <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Probabilistic combination:</div>
                <div>combined = 1 - (1 - 0.689) x (1 - 0.473)</div>
                <div>combined = 1 - 0.311 x 0.527</div>
                <div>combined = 1 - 0.164 = <span style={{ color: '#6ee7b7', fontWeight: 700, fontSize: '1rem' }}>0.836</span></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Single best path</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace', color: '#fde68a' }}>0.689</div>
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #6ee7b730' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Combined paths</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace', color: '#6ee7b7' }}>0.836</div>
              </div>
            </div>

            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: '1px solid #8b5cf630', background: '#8b5cf608',
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
            }}>
              <strong>Why this matters:</strong> Diverse connections are more valuable than a single strong connection.
              An entity with many weak paths to you is more trustworthy than one with a single strong path,
              because collusion across independent paths is exponentially harder.
            </div>
          </div>
        )}

        {activeTab === 'cost' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>ATP Cost Matrix</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Every action in Web4 has an ATP cost determined by its MRH profile. Broader scope = higher cost.
              Quality level multiplies the base cost. Use the controls above to explore different configurations.
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Scope</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Low</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Medium</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>High</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-muted)' }}>Critical</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { scope: 'Local / Session / Simple', key: 'local|session|simple' },
                    { scope: 'Local / Day / Agent', key: 'local|day|agent-scale' },
                    { scope: 'Local / Day / Society', key: 'local|day|society-scale' },
                    { scope: 'Regional / Session / Society', key: 'regional|session|society-scale' },
                    { scope: 'Regional / Day / Society', key: 'regional|day|society-scale' },
                    { scope: 'Global / Session / Agent', key: 'global|session|agent-scale' },
                    { scope: 'Global / Epoch / Society', key: 'global|epoch|society-scale' },
                  ].map(row => {
                    const base = ATP_COSTS[row.key] ?? 0;
                    return (
                      <tr key={row.key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <td style={{ padding: '0.5rem', color: 'var(--color-text)' }}>{row.scope}</td>
                        {[1.0, 1.5, 2.0, 3.0].map(mul => (
                          <td key={mul} style={{
                            padding: '0.5rem', textAlign: 'right', fontFamily: 'monospace',
                            color: base * mul <= 30 ? '#6ee7b7' : base * mul <= 100 ? '#fde68a' : '#fca5a5',
                          }}>
                            {(base * mul).toFixed(0)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Context mismatch demo */}
            <div style={{
              padding: '1rem', borderRadius: '0.5rem',
              background: 'var(--color-bg-tertiary)', marginBottom: '1rem',
            }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Context Mismatch Penalty</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                When an agent&apos;s capability horizon doesn&apos;t match the task&apos;s required horizon,
                they pay extra ATP. A local-session agent performing a global-epoch task pays up to 2x.
              </p>
              <div style={{
                fontFamily: 'monospace', fontSize: '0.75rem', padding: '0.75rem',
                background: 'var(--color-bg-secondary)', borderRadius: '0.375rem',
                color: 'var(--color-text-muted)', lineHeight: 1.8,
              }}>
                context_modifier = 1.0 + mrh_distance(task, agent)<br />
                total_cost = base_cost x context_modifier<br />
                <br />
                Perfect match (distance=0.0): cost x <span style={{ color: '#6ee7b7' }}>1.0</span><br />
                Partial mismatch (distance=0.5): cost x <span style={{ color: '#fde68a' }}>1.5</span><br />
                Full mismatch (distance=1.0): cost x <span style={{ color: '#fca5a5' }}>2.0</span>
              </div>
            </div>

            <div style={{
              padding: '0.75rem', borderRadius: '0.5rem',
              border: '1px solid #f59e0b30', background: '#f59e0b08',
              fontSize: '0.8rem', color: 'var(--color-text-secondary)',
            }}>
              <strong>Economic design:</strong> ATP costs scale naturally with impact. A local chat costs nothing (0 ATP),
              but a global infrastructure vote costs 200+ ATP. This creates natural governance &mdash; only agents with
              sufficient resources and trust can influence broad decisions.
            </div>
          </div>
        )}
      </div>

      <ExplorerNav currentPath="/mrh-explorer" />
      <RelatedConcepts currentPath="/mrh-explorer" />
    </div>
  );
}
