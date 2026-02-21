'use client';

/**
 * NarrativeTimeline - Visual timeline of simulation events
 *
 * Renders a horizontal timeline showing trust/ATP trajectories with
 * event markers. Each life is a distinct segment. Events appear as
 * interactive markers that reveal descriptions on hover/click.
 *
 * Design philosophy: Show the SHAPE of the story before the details.
 * Humans grasp visual patterns faster than text lists.
 */

import { useState, useMemo } from 'react';

// Types matching the narrative system
interface TimelineEvent {
  tick: number;
  lifeNumber: number;
  type: string;
  severity: string;
  description: string;
  significance?: string;
  technicalDetail?: string;
}

interface LifeSegment {
  lifeNumber: number;
  startTick: number;
  endTick: number;
  t3History: number[];
  atpHistory: number[];
  events: TimelineEvent[];
  terminationReason?: string;
}

interface NarrativeTimelineProps {
  lives: Array<{
    life_id: string;
    agent_lct: string;
    start_tick: number;
    end_tick: number;
    life_state: string;
    termination_reason: string;
    t3_history: number[];
    atp_history: number[];
  }>;
  events?: Array<{
    type: string;
    severity: string;
    tick: number;
    life_number?: number;
    description: string;
    data?: Record<string, any>;
  }>;
  narrative?: {
    acts: Array<{
      title: string;
      events: Array<{
        timestamp: string;
        description: string;
        technical_detail?: string;
        significance: string;
      }>;
    }>;
  };
  height?: number;
  showATP?: boolean;
}

// Severity → visual properties
const SEVERITY_COLORS: Record<string, string> = {
  critical: '#ef4444', // red
  high: '#f59e0b',     // amber
  medium: '#3b82f6',   // blue
  low: '#6b7280',      // gray
};

const EVENT_TYPE_ICONS: Record<string, string> = {
  life_start: '🌱',
  life_end: '💀',
  rebirth: '🔄',
  trust_spike: '📈',
  trust_collapse: '📉',
  trust_threshold: '⚡',
  trust_plateau: '〰️',
  atp_crisis: '🔋',
  atp_windfall: '💰',
  death_imminent: '⚠️',
  maturation: '🎓',
  consistency: '🎯',
  pattern_learned: '💡',
  breakthrough: '🚀',
  recovery: '💪',
  downward_spiral: '🌀',
};

export default function NarrativeTimeline({
  lives,
  events = [],
  narrative,
  height = 320,
  showATP = true,
}: NarrativeTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [showLayer, setShowLayer] = useState<'trust' | 'atp' | 'both'>('both');

  // Build timeline segments from lives data
  const segments: LifeSegment[] = useMemo(() => {
    return lives.map((life, i) => ({
      lifeNumber: i + 1,
      startTick: life.start_tick,
      endTick: life.end_tick,
      t3History: life.t3_history,
      atpHistory: life.atp_history,
      terminationReason: life.termination_reason,
      events: events
        .filter(e => e.life_number === i + 1)
        .map(e => ({
          tick: e.tick,
          lifeNumber: i + 1,
          type: e.type,
          severity: e.severity,
          description: e.description,
          significance: e.data?.significance,
        })),
    }));
  }, [lives, events]);

  // Calculate global bounds
  const globalStartTick = segments[0]?.startTick ?? 0;
  const globalEndTick = segments[segments.length - 1]?.endTick ?? 1;
  const totalTicks = globalEndTick - globalStartTick + 1;

  // Find max ATP for scaling
  const maxATP = useMemo(() => {
    let max = 0;
    for (const seg of segments) {
      for (const v of seg.atpHistory) {
        if (v > max) max = v;
      }
    }
    return max || 100;
  }, [segments]);

  // SVG dimensions
  const padding = { top: 30, right: 20, bottom: 50, left: 50 };
  const width = 800;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Scale functions
  const xScale = (tick: number) =>
    padding.left + ((tick - globalStartTick) / totalTicks) * chartWidth;
  const trustYScale = (trust: number) =>
    padding.top + chartHeight - trust * chartHeight;
  const atpYScale = (atp: number) =>
    padding.top + chartHeight - (atp / maxATP) * chartHeight;

  // Build SVG paths for trust trajectories
  const trustPaths = segments.map((seg) => {
    const points = seg.t3History.map((t, i) => {
      const tick = seg.startTick + i;
      return `${xScale(tick)},${trustYScale(t)}`;
    });
    return `M ${points.join(' L ')}`;
  });

  // Build SVG paths for ATP trajectories
  const atpPaths = segments.map((seg) => {
    const points = seg.atpHistory.map((a, i) => {
      const tick = seg.startTick + i;
      return `${xScale(tick)},${atpYScale(a)}`;
    });
    return `M ${points.join(' L ')}`;
  });

  // Life segment backgrounds
  const lifeColors = ['rgba(59,130,246,0.08)', 'rgba(168,85,247,0.08)', 'rgba(34,197,94,0.08)', 'rgba(249,115,22,0.08)'];

  // Trust threshold line (0.5)
  const thresholdY = trustYScale(0.5);

  const activeEvent = hoveredEvent || selectedEvent;

  // Map narrative events to raw events for richer descriptions
  const enrichedEvents = useMemo(() => {
    if (!narrative) return events.map(e => ({
      ...e,
      life_number: e.life_number ?? 1,
      narrativeDescription: e.description,
      narrativeSignificance: '',
    }));

    return events.map(e => {
      // Try to find matching narrative event
      const actIndex = (e.life_number ?? 1) - 1;
      const act = narrative.acts[actIndex];
      if (!act) return { ...e, life_number: e.life_number ?? 1, narrativeDescription: e.description, narrativeSignificance: '' };

      const narEvent = act.events.find(ne =>
        ne.timestamp.includes(`Tick ${e.tick}`) &&
        ne.description.toLowerCase().includes(e.type.replace(/_/g, ' ').split(' ')[0])
      );

      return {
        ...e,
        life_number: e.life_number ?? 1,
        narrativeDescription: narEvent?.description || e.description,
        narrativeSignificance: narEvent?.significance || '',
        narrativeTechnical: narEvent?.technical_detail || '',
      };
    });
  }, [events, narrative]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">Event Timeline</h3>
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setShowLayer('trust')}
            className={`px-2 py-1 rounded transition-colors ${
              showLayer === 'trust' || showLayer === 'both'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            Trust
          </button>
          {showATP && (
            <button
              onClick={() => setShowLayer('atp')}
              className={`px-2 py-1 rounded transition-colors ${
                showLayer === 'atp' || showLayer === 'both'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              ATP
            </button>
          )}
          <button
            onClick={() => setShowLayer('both')}
            className={`px-2 py-1 rounded transition-colors ${
              showLayer === 'both'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            Both
          </button>
        </div>
      </div>

      {/* SVG Timeline */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ maxHeight: `${height}px` }}
      >
        {/* Life segment backgrounds */}
        {segments.map((seg, i) => (
          <rect
            key={`bg-${i}`}
            x={xScale(seg.startTick)}
            y={padding.top}
            width={xScale(seg.endTick) - xScale(seg.startTick)}
            height={chartHeight}
            fill={lifeColors[i % lifeColors.length]}
            rx={4}
          />
        ))}

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1.0].map(v => (
          <g key={`grid-${v}`}>
            <line
              x1={padding.left}
              y1={trustYScale(v)}
              x2={width - padding.right}
              y2={trustYScale(v)}
              stroke={v === 0.5 ? '#f59e0b' : '#374151'}
              strokeWidth={v === 0.5 ? 1.5 : 0.5}
              strokeDasharray={v === 0.5 ? '6,3' : '2,4'}
            />
            <text
              x={padding.left - 8}
              y={trustYScale(v) + 4}
              textAnchor="end"
              fill={v === 0.5 ? '#f59e0b' : '#6b7280'}
              fontSize={10}
            >
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Trust threshold label */}
        <text
          x={width - padding.right + 4}
          y={thresholdY - 6}
          fill="#f59e0b"
          fontSize={9}
          fontStyle="italic"
        >
          consciousness
        </text>

        {/* ATP axis labels (right side) */}
        {showATP && (showLayer === 'atp' || showLayer === 'both') && (
          <>
            {[0, 25, 50, 75, 100].filter(v => v <= maxATP).map(v => (
              <text
                key={`atp-label-${v}`}
                x={width - padding.right + 4}
                y={atpYScale(v) + 4}
                fill="#22c55e"
                fontSize={9}
                opacity={0.6}
              >
                {v}
              </text>
            ))}
          </>
        )}

        {/* Trust trajectories */}
        {(showLayer === 'trust' || showLayer === 'both') && trustPaths.map((d, i) => (
          <path
            key={`trust-${i}`}
            d={d}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={2}
            opacity={0.9}
          />
        ))}

        {/* ATP trajectories */}
        {showATP && (showLayer === 'atp' || showLayer === 'both') && atpPaths.map((d, i) => (
          <path
            key={`atp-${i}`}
            d={d}
            fill="none"
            stroke="#22c55e"
            strokeWidth={1.5}
            opacity={0.7}
            strokeDasharray="4,2"
          />
        ))}

        {/* Life boundary markers */}
        {segments.slice(1).map((seg, i) => (
          <g key={`boundary-${i}`}>
            <line
              x1={xScale(seg.startTick)}
              y1={padding.top}
              x2={xScale(seg.startTick)}
              y2={padding.top + chartHeight}
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <text
              x={xScale(seg.startTick)}
              y={padding.top + chartHeight + 14}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize={10}
            >
              Rebirth
            </text>
          </g>
        ))}

        {/* Life labels at bottom */}
        {segments.map((seg, i) => (
          <text
            key={`life-label-${i}`}
            x={(xScale(seg.startTick) + xScale(seg.endTick)) / 2}
            y={padding.top + chartHeight + 30}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize={11}
            fontWeight="bold"
          >
            Life {seg.lifeNumber}
          </text>
        ))}

        {/* Event markers */}
        {enrichedEvents.map((event, i) => {
          const x = xScale(event.tick);
          // Position trust events on the trust line, ATP events on ATP line
          const isATPEvent = event.type.startsWith('atp') || event.type === 'death_imminent';
          const lifeIdx = (event.life_number ?? 1) - 1;
          const seg = segments[lifeIdx];
          if (!seg) return null;

          const tickIdx = event.tick - seg.startTick;
          let y: number;
          if (isATPEvent && seg.atpHistory[tickIdx] !== undefined) {
            y = atpYScale(seg.atpHistory[tickIdx]);
          } else if (seg.t3History[tickIdx] !== undefined) {
            y = trustYScale(seg.t3History[tickIdx]);
          } else {
            y = padding.top + chartHeight / 2;
          }

          const color = SEVERITY_COLORS[event.severity] || '#6b7280';
          const isActive = activeEvent?.tick === event.tick && activeEvent?.type === event.type;
          const radius = isActive ? 8 : event.severity === 'critical' ? 6 : 4;

          return (
            <g key={`event-${i}`}>
              {/* Pulse animation for critical events */}
              {event.severity === 'critical' && (
                <circle
                  cx={x}
                  cy={y}
                  r={radius + 4}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  opacity={0.3}
                >
                  <animate
                    attributeName="r"
                    values={`${radius + 2};${radius + 8};${radius + 2}`}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0.1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Event dot */}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={color}
                stroke={isActive ? '#ffffff' : 'none'}
                strokeWidth={isActive ? 2 : 0}
                opacity={isActive ? 1 : 0.85}
                style={{ cursor: 'pointer', transition: 'r 0.15s, stroke-width 0.15s' }}
                onMouseEnter={() => setHoveredEvent({
                  tick: event.tick,
                  lifeNumber: event.life_number ?? 1,
                  type: event.type,
                  severity: event.severity,
                  description: (event as any).narrativeDescription || event.description,
                  significance: (event as any).narrativeSignificance,
                  technicalDetail: (event as any).narrativeTechnical,
                })}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => setSelectedEvent(prev =>
                  prev?.tick === event.tick && prev?.type === event.type ? null : {
                    tick: event.tick,
                    lifeNumber: event.life_number ?? 1,
                    type: event.type,
                    severity: event.severity,
                    description: (event as any).narrativeDescription || event.description,
                    significance: (event as any).narrativeSignificance,
                    technicalDetail: (event as any).narrativeTechnical,
                  }
                )}
              />
            </g>
          );
        })}

        {/* Axis labels */}
        <text x={padding.left - 40} y={padding.top + chartHeight / 2} fill="#9ca3af" fontSize={11} transform={`rotate(-90, ${padding.left - 40}, ${padding.top + chartHeight / 2})`} textAnchor="middle">
          Trust (T3)
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" /> Critical
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500" /> High
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500" /> Medium
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-0.5 bg-blue-500" /> Trust
        </span>
        {showATP && (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-0.5 bg-green-500" style={{ borderTop: '1px dashed' }} /> ATP
          </span>
        )}
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-0.5 bg-amber-500" style={{ borderTop: '1px dashed' }} /> 0.5 threshold
        </span>
      </div>

      {/* Event detail panel */}
      {activeEvent && (
        <div className="mt-3 bg-gray-900 border border-gray-600 rounded-lg p-4 transition-all">
          <div className="flex items-start gap-3">
            <span className="text-2xl">
              {EVENT_TYPE_ICONS[activeEvent.type] || '📌'}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-mono text-blue-400">
                  Life {activeEvent.lifeNumber}, Turn {activeEvent.tick}
                </span>
                <span
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{
                    backgroundColor: `${SEVERITY_COLORS[activeEvent.severity]}20`,
                    color: SEVERITY_COLORS[activeEvent.severity],
                    border: `1px solid ${SEVERITY_COLORS[activeEvent.severity]}40`,
                  }}
                >
                  {activeEvent.severity}
                </span>
                <span className="text-xs text-gray-500">
                  {activeEvent.type.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                {activeEvent.description}
              </p>
              {activeEvent.significance && (
                <p className="mt-2 text-xs text-yellow-300/80">
                  Why it matters: {activeEvent.significance}
                </p>
              )}
              {activeEvent.technicalDetail && (
                <p className="mt-1 text-xs text-gray-500 italic">
                  Technical: {activeEvent.technicalDetail}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prompt to interact */}
      {!activeEvent && events.length > 0 && (
        <div className="mt-3 text-center text-xs text-gray-500">
          Click or hover on event markers to explore the story
        </div>
      )}
    </div>
  );
}
