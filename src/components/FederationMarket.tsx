"use client";

import { useState, useEffect } from "react";
import {
  V3Component,
  AgentProfile,
  MarketSnapshot,
  MarketEvent,
  MarketSimulationResult,
  runMarketSimulation,
  calculateSpecialization,
} from "@/lib/federation/market_simulator";

/**
 * Federation Market Visualization
 *
 * Interactive visualization of dynamic ATP pricing based on supply/demand.
 * Shows how Web4 markets self-organize without central planning.
 *
 * Session #13: Federation Economics
 */

interface FederationMarketProps {
  autoPlay?: boolean;
}

export default function FederationMarket({ autoPlay = false }: FederationMarketProps) {
  const [simulation, setSimulation] = useState<MarketSimulationResult | null>(null);
  const [currentTick, setCurrentTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [selectedComponent, setSelectedComponent] = useState<V3Component | null>(null);

  // Initialize simulation
  useEffect(() => {
    runSimulation();
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isPlaying || !simulation) return;

    const interval = setInterval(() => {
      setCurrentTick((t) => {
        if (t >= simulation.snapshots.length - 1) {
          setIsPlaying(false);
          return t;
        }
        return t + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isPlaying, simulation]);

  function runSimulation() {
    // Create diverse agent population
    const initialAgents: AgentProfile[] = [
      // Speed specialists (2)
      {
        id: "agent_1",
        name: "SpeedAgent1",
        accuracy: 0.75,
        reliability: 0.72,
        consistency: 0.78,
        speed: 0.95,
        efficiency: 0.80,
      },
      {
        id: "agent_2",
        name: "SpeedAgent2",
        accuracy: 0.77,
        reliability: 0.74,
        consistency: 0.76,
        speed: 0.92,
        efficiency: 0.78,
      },
      // Accuracy specialists (3)
      {
        id: "agent_3",
        name: "AccuracyAgent1",
        accuracy: 0.95,
        reliability: 0.75,
        consistency: 0.82,
        speed: 0.70,
        efficiency: 0.78,
      },
      {
        id: "agent_4",
        name: "AccuracyAgent2",
        accuracy: 0.93,
        reliability: 0.77,
        consistency: 0.80,
        speed: 0.72,
        efficiency: 0.76,
      },
      {
        id: "agent_5",
        name: "AccuracyAgent3",
        accuracy: 0.96,
        reliability: 0.74,
        consistency: 0.83,
        speed: 0.68,
        efficiency: 0.80,
      },
      // Reliability specialist (1)
      {
        id: "agent_6",
        name: "ReliabilityAgent",
        accuracy: 0.80,
        reliability: 0.98,
        consistency: 0.85,
        speed: 0.72,
        efficiency: 0.82,
      },
      // Generalists (2)
      {
        id: "agent_7",
        name: "GeneralistAgent1",
        accuracy: 0.82,
        reliability: 0.80,
        consistency: 0.83,
        speed: 0.78,
        efficiency: 0.81,
      },
      {
        id: "agent_8",
        name: "GeneralistAgent2",
        accuracy: 0.80,
        reliability: 0.82,
        consistency: 0.81,
        speed: 0.80,
        efficiency: 0.79,
      },
    ];

    // Demand pattern: High speed demand initially, then shifts
    const demandPattern = (tick: number): V3Component[] => {
      const operations: V3Component[] = [];

      // Ticks 0-15: High speed demand
      if (tick < 15) {
        for (let i = 0; i < 6; i++) operations.push(V3Component.SPEED);
        for (let i = 0; i < 2; i++) operations.push(V3Component.ACCURACY);
        operations.push(V3Component.RELIABILITY);
      }
      // Ticks 15-30: Shift to accuracy demand
      else if (tick < 30) {
        for (let i = 0; i < 5; i++) operations.push(V3Component.ACCURACY);
        for (let i = 0; i < 3; i++) operations.push(V3Component.SPEED);
        operations.push(V3Component.EFFICIENCY);
      }
      // Ticks 30+: Balanced demand
      else {
        operations.push(V3Component.SPEED);
        operations.push(V3Component.SPEED);
        operations.push(V3Component.ACCURACY);
        operations.push(V3Component.ACCURACY);
        operations.push(V3Component.RELIABILITY);
        operations.push(V3Component.EFFICIENCY);
      }

      return operations;
    };

    const result = runMarketSimulation(
      initialAgents,
      demandPattern,
      50,
      true // Agents respond to market signals
    );

    setSimulation(result);
    setCurrentTick(0);
  }

  if (!simulation) {
    return <div className="p-4 text-gray-400">Initializing market simulation...</div>;
  }

  const currentSnapshot = simulation.snapshots[currentTick];
  const currentEvents = simulation.events.filter((e) => e.tick === currentTick);
  const components = Object.values(V3Component);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded text-white font-medium transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => setCurrentTick(0)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium transition-colors"
        >
          Reset
        </button>
        <button
          onClick={runSimulation}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-medium transition-colors"
        >
          New Simulation
        </button>
        <div className="flex-1">
          <input
            type="range"
            aria-label="Jump to federation market turn"
            min={0}
            max={simulation.snapshots.length - 1}
            value={currentTick}
            onChange={(e) => setCurrentTick(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-400 mt-1">
            Tick: {currentTick} / {simulation.snapshots.length - 1}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {components.map((component) => {
          const state = currentSnapshot.components[component];
          const isSelected = selectedComponent === component;
          const hasEvent = currentEvents.some((e) => e.component === component);

          return (
            <div
              key={component}
              onClick={() =>
                setSelectedComponent(isSelected ? null : component)
              }
              className={`
                p-4 rounded-lg cursor-pointer transition-all
                ${isSelected ? "ring-2 ring-sky-400" : ""}
                ${hasEvent ? "animate-pulse" : ""}
                bg-gradient-to-br
                ${
                  state.premium > 1.2
                    ? "from-red-950/30 to-red-900/20 border border-red-800/30"
                    : state.premium < 0.9
                    ? "from-green-950/30 to-green-900/20 border border-green-800/30"
                    : "from-gray-900/30 to-gray-800/20 border border-gray-700/30"
                }
              `}
            >
              <h3 className="text-sm font-semibold text-gray-300 mb-2 capitalize">
                {component}
              </h3>

              <div className="space-y-2">
                <div>
                  <div className="text-xs text-gray-500">Supply / Demand</div>
                  <div className="text-lg font-bold">
                    <span
                      className={
                        state.supply < state.demand
                          ? "text-red-400"
                          : "text-green-400"
                      }
                    >
                      {state.supply}
                    </span>
                    <span className="text-gray-600 mx-1">/</span>
                    <span className="text-sky-400">{state.demand}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">ATP Cost</div>
                  <div className="text-2xl font-bold">
                    <span
                      className={
                        state.premium > 1.2
                          ? "text-red-400"
                          : state.premium < 0.9
                          ? "text-green-400"
                          : "text-gray-300"
                      }
                    >
                      {state.premium.toFixed(2)}×
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {state.premiumPct > 0 ? "+" : ""}
                    {state.premiumPct.toFixed(0)}%
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Scarcity</div>
                  <div className="text-sm font-mono text-gray-400">
                    {state.scarcity.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Events */}
      {currentEvents.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-300">
            Market Events (Turn {currentTick})
          </h3>
          {currentEvents.map((event, idx) => (
            <div
              key={idx}
              className={`
                p-3 rounded border
                ${
                  event.type === "high_demand" || event.type === "price_spike"
                    ? "bg-red-950/20 border-red-800/30"
                    : event.type === "equilibrium"
                    ? "bg-green-950/20 border-green-800/30"
                    : "bg-blue-950/20 border-blue-800/30"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {event.type === "high_demand" && "📈"}
                  {event.type === "price_spike" && "💰"}
                  {event.type === "equilibrium" && "⚖️"}
                  {event.type === "supply_shock" && "📦"}
                  {event.type === "specialization" && "🎯"}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-300 capitalize">
                    {event.type.replace("_", " ")}
                  </div>
                  <div className="text-sm text-gray-400">{event.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{event.impact}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Component Details */}
      {selectedComponent && (
        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-4 capitalize">
            {selectedComponent} Market History
          </h3>

          {/* Price chart */}
          <div className="relative h-48 bg-gray-950/50 rounded border border-gray-800">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              {/* Grid lines */}
              <line
                x1="0"
                y1="100"
                x2="800"
                y2="100"
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="4"
              />

              {/* Premium line */}
              <polyline
                points={simulation.snapshots
                  .map((s, i) => {
                    const x = (i / (simulation.snapshots.length - 1)) * 780 + 10;
                    const premium = s.components[selectedComponent].premium;
                    // Map premium 0.8-1.5 to y 180-20
                    const y = 180 - ((premium - 0.8) / 0.7) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="2"
              />

              {/* Current position marker */}
              <circle
                cx={(currentTick / (simulation.snapshots.length - 1)) * 780 + 10}
                cy={
                  180 -
                  ((currentSnapshot.components[selectedComponent].premium - 0.8) /
                    0.7) *
                    160
                }
                r="4"
                fill="#0ea5e9"
              />
            </svg>
          </div>

          {/* Supply/Demand chart */}
          <div className="relative h-48 bg-gray-950/50 rounded border border-gray-800 mt-4">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              {/* Supply line (green) */}
              <polyline
                points={simulation.snapshots
                  .map((s, i) => {
                    const x = (i / (simulation.snapshots.length - 1)) * 780 + 10;
                    const supply = s.components[selectedComponent].supply;
                    // Map supply 0-10 to y 180-20
                    const y = 180 - (supply / 10) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Demand line (red) */}
              <polyline
                points={simulation.snapshots
                  .map((s, i) => {
                    const x = (i / (simulation.snapshots.length - 1)) * 780 + 10;
                    const demand = s.components[selectedComponent].demand;
                    // Map demand 0-30 to y 180-20
                    const y = 180 - (demand / 30) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
              />

              {/* Current position markers */}
              <circle
                cx={(currentTick / (simulation.snapshots.length - 1)) * 780 + 10}
                cy={
                  180 -
                  (currentSnapshot.components[selectedComponent].supply / 10) * 160
                }
                r="4"
                fill="#10b981"
              />
              <circle
                cx={(currentTick / (simulation.snapshots.length - 1)) * 780 + 10}
                cy={
                  180 -
                  (currentSnapshot.components[selectedComponent].demand / 30) * 160
                }
                r="4"
                fill="#ef4444"
              />
            </svg>

            <div className="absolute top-2 right-2 flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400">Supply</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400">Demand</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded">
          <div className="text-sm text-gray-500 mb-1">Total Operations</div>
          <div className="text-2xl font-bold text-sky-400">
            {currentSnapshot.totalOperations}
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded">
          <div className="text-sm text-gray-500 mb-1">Total Agents</div>
          <div className="text-2xl font-bold text-purple-400">
            {currentSnapshot.totalAgents}
          </div>
        </div>
        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded">
          <div className="text-sm text-gray-500 mb-1">Market Events</div>
          <div className="text-2xl font-bold text-green-400">
            {simulation.events.length}
          </div>
        </div>
      </div>
    </div>
  );
}
