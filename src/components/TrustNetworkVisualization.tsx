'use client';

/**
 * Trust Network Visualization Component
 *
 * Session #11: Multi-Agent Trust Dynamics
 * Visualizes how trust relationships form, strengthen, and decay
 * between agents over time.
 *
 * Features:
 * - Force-directed graph layout
 * - Node size = ATP balance
 * - Edge thickness = trust strength
 * - Edge color = trust quality (green=strong, yellow=forming, red=degrading)
 * - Timeline scrubber to see evolution
 * - Agent profile indicators
 * - Coalition highlighting
 */

import { useState, useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

interface Agent {
  agent_lct: string;
  name: string;
  atp: number;
  trust_composite: number;
}

interface TrustEdge {
  source: string;
  target: string;
  trust: number;
  interactions: number;
  type: 'forming' | 'stable' | 'degrading' | 'broken';
  age: number;
}

interface NetworkSnapshot {
  tick: number;
  agents: Agent[];
  edges: TrustEdge[];
  coalitions: string[][];
  metrics: {
    density: number;
    avg_trust: number;
    trust_variance: number;
    strong_edges: number;
    broken_edges: number;
  };
}

interface AgentProfile {
  name: string;
  lct: string;
  profile: string;
  profile_description: string;
  final_atp: number;
  final_trust: number;
}

interface SimulationData {
  simulation_type: string;
  num_ticks: number;
  num_agents: number;
  agents: AgentProfile[];
  snapshots: NetworkSnapshot[];
  events: any[];
}

// ============================================================================
// Profile Colors and Icons
// ============================================================================

const PROFILE_STYLES: Record<string, { color: string; emoji: string; bg: string }> = {
  cooperator: { color: '#10b981', emoji: '🤝', bg: 'bg-green-900/30' },
  opportunist: { color: '#f59e0b', emoji: '⚖️', bg: 'bg-yellow-900/30' },
  freerider: { color: '#ef4444', emoji: '🏄', bg: 'bg-red-900/30' },
  learner: { color: '#3b82f6', emoji: '📚', bg: 'bg-blue-900/30' },
  maverick: { color: '#8b5cf6', emoji: '🎲', bg: 'bg-purple-900/30' },
};

// ============================================================================
// Trust Network Visualization Component
// ============================================================================

export default function TrustNetworkVisualization({ data }: { data: SimulationData }) {
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const snapshot = data.snapshots[currentSnapshotIndex];

  // Auto-play
  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurrentSnapshotIndex((i) => {
        if (i >= data.snapshots.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, data.snapshots.length]);

  // Canvas rendering
  useEffect(() => {
    if (!canvasRef.current || !snapshot) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Clear
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, width, height);

    // Simple circular layout (for now - could be force-directed)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    const agentPositions: Record<string, { x: number; y: number }> = {};
    const angleStep = (2 * Math.PI) / snapshot.agents.length;

    snapshot.agents.forEach((agent, i) => {
      const angle = i * angleStep - Math.PI / 2;
      agentPositions[agent.agent_lct] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Draw edges first (so they appear behind nodes)
    snapshot.edges.forEach((edge) => {
      const source = agentPositions[edge.source];
      const target = agentPositions[edge.target];
      if (!source || !target) return;

      // Edge color based on trust level
      let strokeColor;
      if (edge.trust >= 0.7) {
        strokeColor = '#10b981'; // Green = strong
      } else if (edge.trust >= 0.5) {
        strokeColor = '#3b82f6'; // Blue = stable
      } else if (edge.trust >= 0.3) {
        strokeColor = '#f59e0b'; // Yellow = forming/weak
      } else {
        strokeColor = '#ef4444'; // Red = broken
      }

      // Edge thickness based on trust
      const lineWidth = 1 + edge.trust * 4;

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = 0.6;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();

      ctx.globalAlpha = 1;
    });

    // Draw nodes
    snapshot.agents.forEach((agent) => {
      const pos = agentPositions[agent.agent_lct];
      if (!pos) return;

      // Find agent profile
      const profile = data.agents.find((a) => a.lct === agent.agent_lct);
      const profileKey = profile?.profile || 'opportunist';
      const style = PROFILE_STYLES[profileKey];

      // Node size based on ATP
      const nodeRadius = 20 + (agent.atp / 100) * 20;

      // Draw node circle
      ctx.fillStyle = style.color;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Highlight if selected
      if (selectedAgent === agent.agent_lct) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Draw agent name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = 1;
      ctx.fillText(agent.name, pos.x, pos.y);

      // Draw profile emoji above
      ctx.font = '20px sans-serif';
      ctx.fillText(style.emoji, pos.x, pos.y - nodeRadius - 15);
    });
  }, [snapshot, data.agents, selectedAgent]);

  // Find agent profile
  const getAgentProfile = (lct: string) => {
    return data.agents.find((a) => a.lct === lct);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Trust Network Evolution</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
          >
            {showMetrics ? 'Hide' : 'Show'} Metrics
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Tick indicator */}
        <div className="absolute top-4 left-4 bg-gray-800/90 px-4 py-2 rounded-lg">
          <div className="text-sm text-gray-400">Turn</div>
          <div className="text-2xl font-bold">{snapshot.tick}</div>
        </div>

        {/* Coalition indicator */}
        {snapshot.coalitions.length > 0 && (
          <div className="absolute top-4 right-4 bg-gray-800/90 px-4 py-2 rounded-lg">
            <div className="text-sm text-gray-400">Coalitions Formed</div>
            <div className="text-2xl font-bold">{snapshot.coalitions.length}</div>
          </div>
        )}
      </div>

      {/* Timeline Control */}
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Pause network animation" : "Play network animation"}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
          >
            {playing ? '⏸️ Pause' : '▶️ Play'}
          </button>

          <input
            type="range"
            aria-label="Jump to trust network snapshot"
            min="0"
            max={data.snapshots.length - 1}
            value={currentSnapshotIndex}
            onChange={(e) => {
              setCurrentSnapshotIndex(parseInt(e.target.value));
              setPlaying(false);
            }}
            className="flex-1"
          />

          <div className="text-sm text-gray-400 w-32 text-right">
            Snapshot {currentSnapshotIndex + 1} / {data.snapshots.length}
          </div>
        </div>
      </div>

      {/* Network Metrics */}
      {showMetrics && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-900 p-4 rounded">
            <div className="text-sm text-gray-400 mb-1">Network Density</div>
            <div className="text-2xl font-bold">{(snapshot.metrics.density * 100).toFixed(1)}%</div>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="text-sm text-gray-400 mb-1">Avg Trust</div>
            <div className="text-2xl font-bold">{snapshot.metrics.avg_trust.toFixed(2)}</div>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="text-sm text-gray-400 mb-1">Trust Variance</div>
            <div className="text-2xl font-bold">{snapshot.metrics.trust_variance.toFixed(3)}</div>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="text-sm text-gray-400 mb-1">Strong Edges</div>
            <div className="text-2xl font-bold text-green-400">{snapshot.metrics.strong_edges}</div>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="text-sm text-gray-400 mb-1">Broken Edges</div>
            <div className="text-2xl font-bold text-red-400">{snapshot.metrics.broken_edges}</div>
          </div>
        </div>
      )}

      {/* Agent States */}
      <div className="mt-6">
        <h4 className="text-lg font-bold mb-3">Agent States (Turn {snapshot.tick})</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {snapshot.agents.map((agent) => {
            const profile = getAgentProfile(agent.agent_lct);
            const profileKey = profile?.profile || 'opportunist';
            const style = PROFILE_STYLES[profileKey];

            return (
              <div
                key={agent.agent_lct}
                className={`${style.bg} border border-gray-700 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAgent === agent.agent_lct ? 'ring-2 ring-white' : ''
                }`}
                onClick={() =>
                  setSelectedAgent(selectedAgent === agent.agent_lct ? null : agent.agent_lct)
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{style.emoji}</div>
                  <div>
                    <div className="font-bold">{agent.name}</div>
                    <div className="text-sm text-gray-400">{profile?.profile}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-400">ATP</div>
                    <div className="font-bold">{agent.atp.toFixed(1)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Trust</div>
                    <div className="font-bold">{agent.trust_composite.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-900 p-4 rounded-lg">
        <h4 className="text-sm font-bold mb-3 text-gray-400">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-bold mb-2">Behavioral Profiles:</div>
            <div className="space-y-1">
              {Object.entries(PROFILE_STYLES).map(([key, style]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="text-lg">{style.emoji}</div>
                  <div style={{ color: style.color }} className="capitalize">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-bold mb-2">Trust Edge Colors:</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-green-500 rounded"></div>
                <div>Strong (≥0.7)</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-500 rounded"></div>
                <div>Stable (0.5-0.7)</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-yellow-500 rounded"></div>
                <div>Forming (&lt;0.5)</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500 rounded"></div>
                <div>Broken (&lt;0.3)</div>
              </div>
            </div>
          </div>

          <div>
            <div className="font-bold mb-2">Node Size:</div>
            <div className="text-gray-400">
              Larger nodes = more ATP
              <br />
              Click node to highlight connections
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
