'use client';

/**
 * NetworkGraph — Shared SVG trust network visualization
 *
 * Used by both the Society Simulator (observer mode) and HumanPlayerMode (play mode).
 * Agents are nodes in a circle, trust edges are lines, coalitions get background halos.
 */

import { useRef } from 'react';
import {
  STRATEGY_COLORS,
  AGENT_ROLES,
  type AgentSnapshot,
  type Coalition,
  type Interaction,
} from '@/lib/simulation/society-engine';

interface NetworkGraphProps {
  agents: AgentSnapshot[];
  coalitions: Coalition[];
  selectedAgentId: number | null;
  onSelectAgent: (id: number | null) => void;
  interactions: Interaction[];
  highlightedAgentIds?: number[];
  humanAgentId?: number | null; // shows "YOU" label on the human player's node
  compact?: boolean; // smaller size for embedded use
}

export default function NetworkGraph({
  agents,
  coalitions,
  selectedAgentId,
  onSelectAgent,
  interactions,
  highlightedAgentIds = [],
  humanAgentId = null,
  compact = false,
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = compact ? 360 : 500;
  const height = compact ? 300 : 400;
  const cx = width / 2;
  const cy = height / 2;

  // Position agents in a circle
  const positions = agents.map((a, i) => {
    const angle = (2 * Math.PI * i) / agents.length - Math.PI / 2;
    const radius = Math.min(width, height) * 0.35;
    return {
      id: a.id,
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });

  const getPos = (id: number) => positions.find(p => p.id === id) || { x: cx, y: cy };

  // Build trust edges (only show above threshold 0.3)
  const edges: { from: number; to: number; trust: number; mutual: boolean }[] = [];
  for (const agent of agents) {
    for (const edge of agent.trustEdges) {
      if (edge.trust < 0.3) continue;
      // Avoid duplicates
      if (edges.some(e => e.from === edge.targetId && e.to === agent.id)) continue;
      const reverse = agents.find(a => a.id === edge.targetId)
        ?.trustEdges.find(e => e.targetId === agent.id);
      edges.push({
        from: agent.id,
        to: edge.targetId,
        trust: edge.trust,
        mutual: (reverse?.trust ?? 0) >= 0.3,
      });
    }
  }

  // Recent interaction flash
  const recentPairs = new Set(
    interactions.map(i => `${Math.min(i.agent1Id, i.agent2Id)}-${Math.max(i.agent1Id, i.agent2Id)}`)
  );

  // Coalition groups for coloring
  const coalitionMap = new Map<number, number>();
  coalitions.forEach((c, idx) => {
    c.members.forEach(id => coalitionMap.set(id, idx));
  });

  const COALITION_BG_COLORS = ['rgba(59,130,246,0.1)', 'rgba(34,197,94,0.1)', 'rgba(168,85,247,0.1)', 'rgba(245,158,11,0.1)'];

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className={compact ? "w-full" : "w-full max-w-lg mx-auto"}>
      {/* Coalition backgrounds */}
      {coalitions.slice(0, 4).map((coalition, idx) => {
        const memberPositions = coalition.members.map(id => getPos(id));
        if (memberPositions.length < 2) return null;
        const avgX = memberPositions.reduce((s, p) => s + p.x, 0) / memberPositions.length;
        const avgY = memberPositions.reduce((s, p) => s + p.y, 0) / memberPositions.length;
        const maxDist = Math.max(...memberPositions.map(p =>
          Math.sqrt((p.x - avgX) ** 2 + (p.y - avgY) ** 2)
        )) + 30;
        return (
          <circle
            key={`coalition-${idx}`}
            cx={avgX}
            cy={avgY}
            r={maxDist}
            fill={COALITION_BG_COLORS[idx]}
            stroke={COALITION_BG_COLORS[idx].replace('0.1', '0.3')}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        );
      })}

      {/* Trust edges */}
      {edges.map((edge, i) => {
        const from = getPos(edge.from);
        const to = getPos(edge.to);
        const pairKey = `${Math.min(edge.from, edge.to)}-${Math.max(edge.from, edge.to)}`;
        const isRecent = recentPairs.has(pairKey);
        const isSelected = selectedAgentId !== null &&
          (edge.from === selectedAgentId || edge.to === selectedAgentId);

        return (
          <line
            key={`edge-${i}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={isSelected ? '#fff' : isRecent ? '#fbbf24' : edge.mutual ? '#3b82f6' : '#4b5563'}
            strokeWidth={Math.max(0.5, edge.trust * 3)}
            strokeOpacity={isSelected ? 0.9 : edge.trust * 0.7}
            strokeDasharray={edge.mutual ? undefined : '4 2'}
          />
        );
      })}

      {/* Agent nodes */}
      {agents.map(agent => {
        const pos = getPos(agent.id);
        const isSelected = selectedAgentId === agent.id;
        const isHighlighted = highlightedAgentIds.includes(agent.id);
        const isHuman = humanAgentId !== null && agent.id === humanAgentId;
        const baseRadius = compact
          ? Math.max(6, Math.min(12, 5 + agent.atp / 25))
          : Math.max(8, Math.min(16, 6 + agent.atp / 20));
        const nodeRadius = isHuman ? baseRadius + 3 : baseRadius;
        const color = STRATEGY_COLORS[agent.strategy];

        return (
          <g
            key={`agent-${agent.id}`}
            onClick={() => onSelectAgent(isSelected ? null : agent.id)}
            className="cursor-pointer"
          >
            {/* Story highlight ring (animated pulse) */}
            {isHighlighted && (
              <>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius + 8}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  opacity={0.6}
                  className="animate-pulse"
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeRadius + 12}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth={1}
                  opacity={0.3}
                />
              </>
            )}
            {/* Human player ring (teal, persistent) */}
            {isHuman && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius + 4}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth={2.5}
                strokeOpacity={0.9}
              />
            )}
            {/* Selection ring */}
            {isSelected && !isHuman && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius + 4}
                fill="none"
                stroke="#fff"
                strokeWidth={2}
              />
            )}
            {/* ATP ring (background) */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius + 1}
              fill="none"
              stroke={agent.atp < 20 ? '#ef4444' : '#374151'}
              strokeWidth={2}
              strokeOpacity={0.5}
            />
            {/* Agent circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill={color}
              fillOpacity={0.8}
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Role icon inside node */}
            <text
              x={pos.x}
              y={pos.y + (compact ? 4 : 5)}
              textAnchor="middle"
              fontSize={compact ? 10 : 13}
              style={{ pointerEvents: 'none' }}
            >
              {AGENT_ROLES[agent.role].icon}
            </text>
            {/* Name + role label below */}
            <text
              x={pos.x}
              y={pos.y + nodeRadius + 12}
              textAnchor="middle"
              fill="#e5e7eb"
              fontSize={compact ? 7 : 9}
              fontFamily="monospace"
              fontWeight="bold"
            >
              {agent.name}
            </text>
            <text
              x={pos.x}
              y={pos.y + nodeRadius + (compact ? 21 : 23)}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize={compact ? 6 : 7}
              fontFamily="monospace"
            >
              {isHuman ? 'YOU' : AGENT_ROLES[agent.role].label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
