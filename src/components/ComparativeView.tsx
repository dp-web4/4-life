/**
 * Comparative Simulation View Component
 *
 * Displays multiple simulation runs side-by-side for comparison.
 * Enables humans to understand "what changes when parameters change."
 *
 * Features:
 * - Side-by-side trust/ATP timeline charts
 * - Synchronized hovering across charts
 * - Key metrics comparison table
 * - Event timeline alignment
 * - Divergence highlighting
 * - Export comparative analysis
 */

"use client";

import { useEffect, useState, useRef } from "react";
import { EventDetector, SimulationEvent, EventSeverity } from "@/lib/narratives/event_detector";

// ============================================================================
// TYPES
// ============================================================================

interface LifeRecord {
  life_id: string;
  agent_lct: string;
  start_tick: number;
  end_tick: number;
  life_state: string;
  termination_reason: string;
  t3_history: number[];
  atp_history: number[];
}

interface SimulationData {
  agent_lct: string;
  lives: LifeRecord[];
  name?: string;
  color?: string;
}

interface ComparativeMetrics {
  name: string;
  totalLives: number;
  totalTicks: number;
  startTrust: number;
  endTrust: number;
  trustChange: number;
  startATP: number;
  endATP: number;
  atpChange: number;
  avgTrust: number;
  avgATP: number;
  trustVolatility: number;
  atpVolatility: number;
  crossedThreshold: boolean;
  majorEvents: number;
}

interface ComparativeViewProps {
  simulations: SimulationData[];
  height?: number;
}

// ============================================================================
// UTILITIES
// ============================================================================

function calculateMetrics(sim: SimulationData): ComparativeMetrics {
  const allTrust = sim.lives.flatMap(life => life.t3_history);
  const allATP = sim.lives.flatMap(life => life.atp_history);

  const avgTrust = allTrust.reduce((a, b) => a + b, 0) / allTrust.length;
  const avgATP = allATP.reduce((a, b) => a + b, 0) / allATP.length;

  // Volatility = standard deviation
  const trustVolatility = Math.sqrt(
    allTrust.reduce((sum, val) => sum + Math.pow(val - avgTrust, 2), 0) / allTrust.length
  );
  const atpVolatility = Math.sqrt(
    allATP.reduce((sum, val) => sum + Math.pow(val - avgATP, 2), 0) / allATP.length
  );

  const detector = new EventDetector();
  const events = detector.detectEvents(sim.lives);
  const majorEvents = events.filter(e =>
    e.severity === EventSeverity.CRITICAL || e.severity === EventSeverity.HIGH
  ).length;

  const crossedThreshold = allTrust.some(t => t >= 0.5);

  return {
    name: sim.name || sim.agent_lct,
    totalLives: sim.lives.length,
    totalTicks: sim.lives.reduce((sum, life) => sum + life.t3_history.length, 0),
    startTrust: sim.lives[0].t3_history[0],
    endTrust: sim.lives[sim.lives.length - 1].t3_history.slice(-1)[0],
    trustChange: sim.lives[sim.lives.length - 1].t3_history.slice(-1)[0] - sim.lives[0].t3_history[0],
    startATP: sim.lives[0].atp_history[0],
    endATP: sim.lives[sim.lives.length - 1].atp_history.slice(-1)[0],
    atpChange: sim.lives[sim.lives.length - 1].atp_history.slice(-1)[0] - sim.lives[0].atp_history[0],
    avgTrust,
    avgATP,
    trustVolatility,
    atpVolatility,
    crossedThreshold,
    majorEvents
  };
}

function normalizeToGlobalTicks(lives: LifeRecord[]): { trust: [number, number][], atp: [number, number][] } {
  const trust: [number, number][] = [];
  const atp: [number, number][] = [];

  lives.forEach(life => {
    life.t3_history.forEach((t, idx) => {
      const globalTick = life.start_tick + idx;
      trust.push([globalTick, t]);
      atp.push([globalTick, life.atp_history[idx]]);
    });
  });

  return { trust, atp };
}

// ============================================================================
// CHART COMPONENT
// ============================================================================

interface ChartProps {
  data: SimulationData[];
  metric: 'trust' | 'atp';
  height: number;
  hoveredTick: number | null;
  onHover: (tick: number | null) => void;
}

function TimelineChart({ data, metric, height, hoveredTick, onHover }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setDimensions({ width: entry.contentRect.width, height });
      }
    });

    resizeObserver.observe(canvas.parentElement!);
    return () => resizeObserver.disconnect();
  }, [height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Calculate bounds
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartWidth = dimensions.width - padding.left - padding.right;
    const chartHeight = dimensions.height - padding.top - padding.bottom;

    // Find global min/max for all simulations
    let globalMinTick = Infinity;
    let globalMaxTick = -Infinity;
    let globalMinValue = Infinity;
    let globalMaxValue = -Infinity;

    const allSeries = data.map(sim => normalizeToGlobalTicks(sim.lives));

    allSeries.forEach(series => {
      const points = metric === 'trust' ? series.trust : series.atp;
      points.forEach(([tick, value]) => {
        globalMinTick = Math.min(globalMinTick, tick);
        globalMaxTick = Math.max(globalMaxTick, tick);
        globalMinValue = Math.min(globalMinValue, value);
        globalMaxValue = Math.max(globalMaxValue, value);
      });
    });

    // Add padding to value range
    const valueRange = globalMaxValue - globalMinValue;
    globalMinValue -= valueRange * 0.1;
    globalMaxValue += valueRange * 0.1;

    // Scale functions
    const scaleX = (tick: number) =>
      padding.left + ((tick - globalMinTick) / (globalMaxTick - globalMinTick)) * chartWidth;
    const scaleY = (value: number) =>
      padding.top + chartHeight - ((value - globalMinValue) / (globalMaxValue - globalMinValue)) * chartHeight;

    // Draw grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // Horizontal grid lines (5 lines)
    for (let i = 0; i <= 5; i++) {
      const value = globalMinValue + (globalMaxValue - globalMinValue) * (i / 5);
      const y = scaleY(value);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = '12px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(value.toFixed(metric === 'trust' ? 2 : 0), padding.left - 10, y + 4);
    }

    // Vertical grid lines (every 10 ticks)
    const tickStep = Math.max(1, Math.floor((globalMaxTick - globalMinTick) / 10));
    for (let tick = globalMinTick; tick <= globalMaxTick; tick += tickStep) {
      const x = scaleX(tick);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();

      // Label
      ctx.fillStyle = '#64748b';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(tick.toString(), x, padding.top + chartHeight + 20);
    }

    // Draw trust threshold line
    if (metric === 'trust') {
      const thresholdY = scaleY(0.5);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, thresholdY);
      ctx.lineTo(padding.left + chartWidth, thresholdY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('trust threshold (0.5)', dimensions.width - padding.right - 5, thresholdY - 5);
    }

    // Draw ATP crisis threshold
    if (metric === 'atp') {
      const crisisY = scaleY(20);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(padding.left, crisisY);
      ctx.lineTo(padding.left + chartWidth, crisisY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label
      ctx.fillStyle = '#ef4444';
      ctx.font = '11px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('crisis threshold (20)', dimensions.width - padding.right - 5, crisisY - 5);
    }

    // Draw data lines
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    allSeries.forEach((series, idx) => {
      const sim = data[idx];
      const points = metric === 'trust' ? series.trust : series.atp;
      const color = sim.color || colors[idx % colors.length];

      // Draw line
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach(([tick, value], i) => {
        const x = scaleX(tick);
        const y = scaleY(value);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw points
      ctx.fillStyle = color;
      points.forEach(([tick, value]) => {
        const x = scaleX(tick);
        const y = scaleY(value);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // Draw hovered tick indicator
    if (hoveredTick !== null) {
      const x = scaleX(hoveredTick);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
      ctx.setLineDash([]);

      // Show values at hovered tick
      data.forEach((sim, idx) => {
        const series = allSeries[idx];
        const points = metric === 'trust' ? series.trust : series.atp;
        const point = points.find(([tick]) => tick === hoveredTick);

        if (point) {
          const [tick, value] = point;
          const x = scaleX(tick);
          const y = scaleY(value);
          const color = sim.color || colors[idx % colors.length];

          // Draw larger point
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();

          // Draw value label
          ctx.fillStyle = '#000000';
          ctx.fillRect(x + 10, y - 15, 60, 24);
          ctx.fillStyle = color;
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(value.toFixed(metric === 'trust' ? 2 : 0), x + 15, y);
        }
      });
    }

    // Draw axes labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Tick', padding.left + chartWidth / 2, dimensions.height - 5);

    ctx.save();
    ctx.translate(15, padding.top + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(metric === 'trust' ? 'Trust (T3)' : 'ATP', 0, 0);
    ctx.restore();

    // Draw title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      metric === 'trust' ? 'Trust Trajectory' : 'ATP (Attention) Trajectory',
      padding.left + chartWidth / 2,
      20
    );

  }, [data, metric, dimensions, hoveredTick]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Convert x to tick
    const padding = { left: 60, right: 30 };
    const chartWidth = dimensions.width - padding.left - padding.right;

    const allSeries = data.map(sim => normalizeToGlobalTicks(sim.lives));
    let globalMinTick = Infinity;
    let globalMaxTick = -Infinity;

    allSeries.forEach(series => {
      const points = metric === 'trust' ? series.trust : series.atp;
      points.forEach(([tick]) => {
        globalMinTick = Math.min(globalMinTick, tick);
        globalMaxTick = Math.max(globalMaxTick, tick);
      });
    });

    const tick = Math.round(
      globalMinTick + ((x - padding.left) / chartWidth) * (globalMaxTick - globalMinTick)
    );

    if (tick >= globalMinTick && tick <= globalMaxTick) {
      onHover(tick);
    } else {
      onHover(null);
    }
  };

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => onHover(null)}
      />
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ComparativeView({ simulations, height = 300 }: ComparativeViewProps) {
  const [hoveredTick, setHoveredTick] = useState<number | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  if (simulations.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-center">
        <p className="text-slate-400">No simulations to compare</p>
      </div>
    );
  }

  const metrics = simulations.map(calculateMetrics);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Comparative Analysis
        </h2>
        <button
          onClick={() => setShowMetrics(!showMetrics)}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
        >
          {showMetrics ? 'Hide' : 'Show'} Metrics
        </button>
      </div>

      {/* Legend */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Simulations</h3>
        <div className="flex flex-wrap gap-4">
          {simulations.map((sim, idx) => {
            const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
            const color = sim.color || colors[idx % colors.length];
            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-slate-300">
                  {sim.name || `Simulation ${idx + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics Table */}
      {showMetrics && (
        <div className="bg-slate-800 rounded-lg p-6 overflow-x-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-700">
                <th className="pb-2 text-slate-400 font-medium">Metric</th>
                {metrics.map((m, idx) => (
                  <th key={idx} className="pb-2 text-slate-300 font-medium">
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Lives</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.totalLives}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Total Ticks</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.totalTicks}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Trust: Start → End</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">
                    {m.startTrust.toFixed(2)} → {m.endTrust.toFixed(2)}
                    <span className={`ml-2 ${m.trustChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ({m.trustChange >= 0 ? '+' : ''}{m.trustChange.toFixed(2)})
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">ATP: Start → End</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">
                    {m.startATP} → {m.endATP}
                    <span className={`ml-2 ${m.atpChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ({m.atpChange >= 0 ? '+' : ''}{m.atpChange})
                    </span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Avg Trust</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.avgTrust.toFixed(2)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Avg ATP</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.avgATP.toFixed(0)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Trust Volatility</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.trustVolatility.toFixed(3)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">ATP Volatility</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.atpVolatility.toFixed(1)}</td>
                ))}
              </tr>
              <tr className="border-b border-slate-700">
                <td className="py-2 text-slate-400">Crossed Threshold</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">
                    {m.crossedThreshold ? (
                      <span className="text-green-400">✓ Yes</span>
                    ) : (
                      <span className="text-red-400">✗ No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 text-slate-400">Major Events</td>
                {metrics.map((m, idx) => (
                  <td key={idx} className="py-2">{m.majorEvents}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Trust Chart */}
      <div className="bg-slate-800 rounded-lg p-4">
        <TimelineChart
          data={simulations}
          metric="trust"
          height={height}
          hoveredTick={hoveredTick}
          onHover={setHoveredTick}
        />
      </div>

      {/* ATP Chart */}
      <div className="bg-slate-800 rounded-lg p-4">
        <TimelineChart
          data={simulations}
          metric="atp"
          height={height}
          hoveredTick={hoveredTick}
          onHover={setHoveredTick}
        />
      </div>

      {/* Insights */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Comparative Insights</h3>
        <div className="space-y-3 text-slate-300">
          {/* Find highest trust change */}
          {(() => {
            const maxTrustChange = Math.max(...metrics.map(m => m.trustChange));
            const maxTrustSim = metrics.find(m => m.trustChange === maxTrustChange);
            if (maxTrustSim && maxTrustChange > 0) {
              return (
                <p className="text-sm">
                  <span className="text-green-400 font-semibold">{maxTrustSim.name}</span> showed
                  the highest trust growth (+{maxTrustChange.toFixed(2)}), suggesting effective
                  trust-building behavior patterns.
                </p>
              );
            }
          })()}

          {/* Find lowest volatility */}
          {(() => {
            const minVolatility = Math.min(...metrics.map(m => m.trustVolatility));
            const stableSim = metrics.find(m => m.trustVolatility === minVolatility);
            if (stableSim) {
              return (
                <p className="text-sm">
                  <span className="text-blue-400 font-semibold">{stableSim.name}</span> demonstrated
                  the most stable trust (volatility: {minVolatility.toFixed(3)}), indicating consistent
                  behavioral patterns.
                </p>
              );
            }
          })()}

          {/* Threshold crossing */}
          {(() => {
            const crossers = metrics.filter(m => m.crossedThreshold);
            if (crossers.length > 0 && crossers.length < metrics.length) {
              return (
                <p className="text-sm">
                  <span className="text-yellow-400 font-semibold">
                    {crossers.map(m => m.name).join(', ')}
                  </span> crossed the trust threshold (0.5), achieving coherent agency.
                  This marks the transition from reactive to intentional behavior.
                </p>
              );
            }
          })()}

          {/* Major events */}
          {(() => {
            const maxEvents = Math.max(...metrics.map(m => m.majorEvents));
            const eventfulSim = metrics.find(m => m.majorEvents === maxEvents);
            if (eventfulSim && maxEvents > 0) {
              return (
                <p className="text-sm">
                  <span className="text-purple-400 font-semibold">{eventfulSim.name}</span> experienced
                  the most significant events ({maxEvents}), suggesting a more dynamic trajectory with
                  crisis points and recoveries.
                </p>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
}
