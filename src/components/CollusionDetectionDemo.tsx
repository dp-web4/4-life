'use client';

/**
 * Collusion Detection Demo
 *
 * Interactive simulation showing how trust cartels form, operate,
 * and get detected (or not) by Web4's defense mechanisms.
 *
 * Users can configure cartel size, sophistication, and see real-time
 * detection metrics as the simulation runs tick by tick.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

interface Agent {
  id: string;
  name: string;
  isCartel: boolean;
  trust: number;        // T3 composite [0,1]
  atp: number;          // ATP balance
  diversityScore: number; // Witness diversity [0,1]
  validationsSent: number;
  validationsReceived: number;
  internalRatio: number; // Ratio of validations from cartel members
  flagged: boolean;
  flagReason?: string;
}

interface SimTick {
  tick: number;
  agents: Agent[];
  detections: Detection[];
  cartelATP: number;
  legitimateATP: number;
  cartelAvgTrust: number;
  legitimateAvgTrust: number;
  diversityAlert: boolean;
  inflationAlert: boolean;
}

interface Detection {
  tick: number;
  agentId: string;
  type: 'diversity' | 'inflation' | 'clustering' | 'velocity';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface SimConfig {
  networkSize: number;
  cartelSize: number;
  sophistication: 'naive' | 'moderate' | 'advanced';
  diversityThreshold: number;
  challengeRate: number;
}

// ============================================================================
// Simulation Engine
// ============================================================================

function runSimulation(config: SimConfig): SimTick[] {
  const ticks: SimTick[] = [];
  const totalAgents = config.networkSize;
  const cartelCount = config.cartelSize;
  const legitimateCount = totalAgents - cartelCount;

  // Initialize agents
  const agents: Agent[] = [];

  for (let i = 0; i < cartelCount; i++) {
    agents.push({
      id: `cartel-${i}`,
      name: `C${i + 1}`,
      isCartel: true,
      trust: 0.3 + Math.random() * 0.1, // Start low
      atp: 100,
      diversityScore: 1.0,
      validationsSent: 0,
      validationsReceived: 0,
      internalRatio: 0,
      flagged: false,
    });
  }

  for (let i = 0; i < legitimateCount; i++) {
    agents.push({
      id: `legit-${i}`,
      name: `L${i + 1}`,
      isCartel: false,
      trust: 0.4 + Math.random() * 0.3, // Varied starting trust
      atp: 100,
      diversityScore: 1.0,
      validationsSent: 0,
      validationsReceived: 0,
      internalRatio: 0,
      flagged: false,
    });
  }

  // Sophistication modifiers
  const crossValidateRate = config.sophistication === 'naive' ? 0.05
    : config.sophistication === 'moderate' ? 0.25 : 0.45;

  const inflationRate = config.sophistication === 'naive' ? 1.5
    : config.sophistication === 'moderate' ? 1.2 : 1.08;

  // Run 40 ticks
  for (let tick = 0; tick < 40; tick++) {
    const detections: Detection[] = [];

    // === Validation Phase ===
    for (const agent of agents) {
      if (agent.isCartel) {
        // Cartel members validate each other
        const validationsThisTick = 2 + Math.floor(Math.random() * 2);

        for (let v = 0; v < validationsThisTick; v++) {
          // Mostly validate other cartel members
          const validateCartel = Math.random() > crossValidateRate;

          if (validateCartel) {
            // Pick random cartel member (not self)
            const targets = agents.filter(a => a.isCartel && a.id !== agent.id);
            if (targets.length > 0) {
              const target = targets[Math.floor(Math.random() * targets.length)];
              target.validationsReceived++;
              target.trust = Math.min(1.0, target.trust + 0.008 * inflationRate);
              target.atp += 3 * inflationRate;
              agent.validationsSent++;
            }
          } else {
            // Cross-validate with legitimate (sophistication cover)
            const targets = agents.filter(a => !a.isCartel);
            if (targets.length > 0) {
              const target = targets[Math.floor(Math.random() * targets.length)];
              target.validationsReceived++;
              target.trust = Math.min(1.0, target.trust + 0.005);
              target.atp += 2;
              agent.validationsSent++;
            }
          }
        }
      } else {
        // Legitimate agents validate organically
        const validationsThisTick = 1 + Math.floor(Math.random() * 2);

        for (let v = 0; v < validationsThisTick; v++) {
          const targets = agents.filter(a => a.id !== agent.id);
          const target = targets[Math.floor(Math.random() * targets.length)];
          target.validationsReceived++;
          target.trust = Math.min(1.0, target.trust + 0.004);
          target.atp += 2;
          agent.validationsSent++;
        }
      }
    }

    // === Detection Phase ===
    for (const agent of agents) {
      // Compute diversity score
      if (agent.isCartel) {
        // Internal ratio: what fraction of validations came from other cartel members
        const cartelValidators = agents.filter(a => a.isCartel && a.id !== agent.id);
        const totalPossibleValidators = agents.length - 1;
        const cartelFraction = cartelValidators.length / totalPossibleValidators;

        // Estimate internal validation ratio based on cross-validate rate
        agent.internalRatio = 1 - crossValidateRate;
        agent.diversityScore = Math.max(0, 1 - (agent.internalRatio - cartelFraction) * 2);
      } else {
        agent.internalRatio = 0;
        agent.diversityScore = 0.7 + Math.random() * 0.3;
      }

      // Diversity check
      if (agent.diversityScore < config.diversityThreshold && tick > 5) {
        if (!agent.flagged || Math.random() < 0.3) {
          detections.push({
            tick,
            agentId: agent.id,
            type: 'diversity',
            description: `${agent.name}: Witness diversity ${(agent.diversityScore * 100).toFixed(0)}% below threshold`,
            severity: agent.diversityScore < 0.3 ? 'high' : 'medium',
          });
        }
        agent.flagged = true;
        agent.flagReason = 'Low witness diversity';
      }

      // Challenge-response (random quality audit)
      if (agent.isCartel && Math.random() < config.challengeRate && tick > 3) {
        // Cartel agents have inflated quality - chance of detection
        const detectChance = config.sophistication === 'naive' ? 0.7
          : config.sophistication === 'moderate' ? 0.4 : 0.15;

        if (Math.random() < detectChance) {
          detections.push({
            tick,
            agentId: agent.id,
            type: 'inflation',
            description: `${agent.name}: Quality mismatch detected in challenge audit`,
            severity: 'high',
          });
          agent.flagged = true;
          agent.flagReason = 'Quality inflation detected';
          agent.atp = Math.max(0, agent.atp - 50); // Penalty
        }
      }
    }

    // ATP velocity check (compare cartel vs legitimate growth rates)
    const cartelAgents = agents.filter(a => a.isCartel);
    const legitAgents = agents.filter(a => !a.isCartel);
    const cartelAvgATP = cartelAgents.reduce((s, a) => s + a.atp, 0) / cartelAgents.length;
    const legitAvgATP = legitAgents.reduce((s, a) => s + a.atp, 0) / legitAgents.length;

    const inflationAlert = tick > 8 && cartelAvgATP > legitAvgATP * 1.3;
    const diversityAlert = tick > 5 && cartelAgents.some(a => a.diversityScore < config.diversityThreshold);

    if (inflationAlert && tick > 10 && tick % 5 === 0) {
      detections.push({
        tick,
        agentId: 'system',
        type: 'clustering',
        description: `Cluster anomaly: Group of ${cartelCount} agents with ${((cartelAvgATP / legitAvgATP - 1) * 100).toFixed(0)}% ATP surplus`,
        severity: 'high',
      });
    }

    // Trust velocity check
    if (tick > 5 && tick % 4 === 0) {
      for (const agent of cartelAgents) {
        if (agent.trust > 0.7 && tick < 20) {
          detections.push({
            tick,
            agentId: agent.id,
            type: 'velocity',
            description: `${agent.name}: Trust velocity anomaly (${(agent.trust * 100).toFixed(0)}% trust at tick ${tick})`,
            severity: 'medium',
          });
        }
      }
    }

    // Record tick
    const cartelAvgTrust = cartelAgents.reduce((s, a) => s + a.trust, 0) / cartelAgents.length;
    const legitAvgTrust = legitAgents.reduce((s, a) => s + a.trust, 0) / legitAgents.length;

    ticks.push({
      tick,
      agents: agents.map(a => ({ ...a })),
      detections,
      cartelATP: cartelAvgATP,
      legitimateATP: legitAvgATP,
      cartelAvgTrust,
      legitimateAvgTrust: legitAvgTrust,
      diversityAlert,
      inflationAlert,
    });
  }

  return ticks;
}

// ============================================================================
// Component
// ============================================================================

const PRESETS: { label: string; config: SimConfig }[] = [
  {
    label: 'Naive Cartel (Easy to Detect)',
    config: { networkSize: 16, cartelSize: 4, sophistication: 'naive', diversityThreshold: 0.5, challengeRate: 0.1 },
  },
  {
    label: 'Moderate Sophistication',
    config: { networkSize: 20, cartelSize: 5, sophistication: 'moderate', diversityThreshold: 0.5, challengeRate: 0.1 },
  },
  {
    label: 'Advanced Cartel (Hard to Detect)',
    config: { networkSize: 24, cartelSize: 6, sophistication: 'advanced', diversityThreshold: 0.5, challengeRate: 0.1 },
  },
  {
    label: 'Weak Defenses',
    config: { networkSize: 20, cartelSize: 5, sophistication: 'moderate', diversityThreshold: 0.3, challengeRate: 0.05 },
  },
];

export default function CollusionDetectionDemo() {
  const [config, setConfig] = useState<SimConfig>(PRESETS[0].config);
  const [simulation, setSimulation] = useState<SimTick[] | null>(null);
  const [currentTick, setCurrentTick] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(400);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Run simulation
  const handleRun = useCallback(() => {
    const result = runSimulation(config);
    setSimulation(result);
    setCurrentTick(0);
    setPlaying(false);
  }, [config]);

  // Auto-play
  useEffect(() => {
    if (playing && simulation) {
      intervalRef.current = setInterval(() => {
        setCurrentTick(prev => {
          if (prev >= simulation.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, simulation, speed]);

  // Run on first render
  useEffect(() => {
    handleRun();
  }, []);

  const tick = simulation?.[currentTick];
  const allDetections = simulation
    ? simulation.slice(0, currentTick + 1).flatMap(t => t.detections)
    : [];

  // Network visualization dimensions
  const netW = 400;
  const netH = 300;
  const centerX = netW / 2;
  const centerY = netH / 2;

  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-2 text-red-400">Interactive Collusion Simulator</h3>
      <p className="text-gray-400 text-sm mb-5">
        Configure a trust cartel and watch Web4's detection mechanisms respond in real time.
      </p>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PRESETS.map((preset, i) => (
          <button
            key={i}
            onClick={() => { setConfig(preset.config); setSimulation(null); }}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              JSON.stringify(config) === JSON.stringify(preset.config)
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Config */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 text-xs">
        <div>
          <label className="text-gray-500 block mb-1">Network Size</label>
          <input
            type="range" min={10} max={30} value={config.networkSize}
            onChange={e => setConfig(c => ({ ...c, networkSize: +e.target.value }))}
            className="w-full accent-red-500"
          />
          <span className="text-gray-300">{config.networkSize} agents</span>
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Cartel Size</label>
          <input
            type="range" min={2} max={Math.floor(config.networkSize / 2)} value={config.cartelSize}
            onChange={e => setConfig(c => ({ ...c, cartelSize: +e.target.value }))}
            className="w-full accent-red-500"
          />
          <span className="text-gray-300">{config.cartelSize} colluding</span>
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Diversity Threshold</label>
          <input
            type="range" min={20} max={80} value={config.diversityThreshold * 100}
            onChange={e => setConfig(c => ({ ...c, diversityThreshold: +e.target.value / 100 }))}
            className="w-full accent-blue-500"
          />
          <span className="text-gray-300">{(config.diversityThreshold * 100).toFixed(0)}%</span>
        </div>
        <div>
          <label className="text-gray-500 block mb-1">Challenge Rate</label>
          <input
            type="range" min={2} max={25} value={config.challengeRate * 100}
            onChange={e => setConfig(c => ({ ...c, challengeRate: +e.target.value / 100 }))}
            className="w-full accent-blue-500"
          />
          <span className="text-gray-300">{(config.challengeRate * 100).toFixed(0)}%</span>
        </div>
      </div>

      {/* Run Button */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
        >
          Run Simulation
        </button>
        {simulation && (
          <>
            <button
              onClick={() => setPlaying(!playing)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min={0}
              max={(simulation?.length || 1) - 1}
              value={currentTick}
              onChange={e => { setCurrentTick(+e.target.value); setPlaying(false); }}
              className="flex-1 accent-red-500"
            />
            <span className="text-gray-400 text-sm whitespace-nowrap">
              Tick {currentTick}/{(simulation?.length || 1) - 1}
            </span>
          </>
        )}
      </div>

      {tick && simulation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Network Graph */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-2">Trust Network</h4>
            <svg viewBox={`0 0 ${netW} ${netH}`} className="w-full" style={{ maxHeight: 300 }}>
              {/* Draw connections between cartel members */}
              {tick.agents.filter(a => a.isCartel).map((a, i) => {
                const angle1 = (i / config.cartelSize) * Math.PI * 2 - Math.PI / 2;
                const x1 = centerX + Math.cos(angle1) * 60;
                const y1 = centerY + Math.sin(angle1) * 60;

                return tick.agents.filter(b => b.isCartel && b.id !== a.id).map((b, j) => {
                  const angle2 = (tick.agents.filter(c => c.isCartel).indexOf(b) / config.cartelSize) * Math.PI * 2 - Math.PI / 2;
                  const x2 = centerX + Math.cos(angle2) * 60;
                  const y2 = centerY + Math.sin(angle2) * 60;
                  return (
                    <line
                      key={`${a.id}-${b.id}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="rgba(239, 68, 68, 0.3)"
                      strokeWidth={1.5}
                    />
                  );
                });
              })}

              {/* Legitimate agents in outer ring */}
              {tick.agents.filter(a => !a.isCartel).map((agent, i) => {
                const totalLegit = tick.agents.filter(a => !a.isCartel).length;
                const angle = (i / totalLegit) * Math.PI * 2 - Math.PI / 2;
                const x = centerX + Math.cos(angle) * 120;
                const y = centerY + Math.sin(angle) * 120;
                const r = 6 + agent.trust * 8;

                return (
                  <g key={agent.id}>
                    <circle
                      cx={x} cy={y} r={r}
                      fill={agent.flagged ? '#f59e0b' : '#3b82f6'}
                      opacity={0.7 + agent.trust * 0.3}
                      stroke={agent.flagged ? '#fbbf24' : 'transparent'}
                      strokeWidth={agent.flagged ? 2 : 0}
                    />
                    <text x={x} y={y + 3} textAnchor="middle" fontSize={8} fill="white">
                      {agent.name}
                    </text>
                  </g>
                );
              })}

              {/* Cartel agents in inner ring */}
              {tick.agents.filter(a => a.isCartel).map((agent, i) => {
                const angle = (i / config.cartelSize) * Math.PI * 2 - Math.PI / 2;
                const x = centerX + Math.cos(angle) * 60;
                const y = centerY + Math.sin(angle) * 60;
                const r = 6 + agent.trust * 8;

                return (
                  <g key={agent.id}>
                    <circle
                      cx={x} cy={y} r={r}
                      fill={agent.flagged ? '#dc2626' : '#ef4444'}
                      opacity={0.7 + agent.trust * 0.3}
                      stroke={agent.flagged ? '#fbbf24' : 'transparent'}
                      strokeWidth={agent.flagged ? 2 : 0}
                    />
                    <text x={x} y={y + 3} textAnchor="middle" fontSize={8} fill="white" fontWeight="bold">
                      {agent.name}
                    </text>
                  </g>
                );
              })}

              {/* Cartel zone label */}
              <text x={centerX} y={centerY + 4} textAnchor="middle" fontSize={9} fill="rgba(239,68,68,0.5)">
                Cartel Zone
              </text>

              {/* Alerts */}
              {tick.diversityAlert && (
                <text x={10} y={20} fontSize={10} fill="#fbbf24">
                  Diversity Alert
                </text>
              )}
              {tick.inflationAlert && (
                <text x={10} y={35} fontSize={10} fill="#ef4444">
                  ATP Inflation Alert
                </text>
              )}
            </svg>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-3">
            {/* ATP Comparison */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-bold text-gray-300 mb-3">ATP Balance (Avg)</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400">Cartel</span>
                    <span className="text-gray-400">{tick.cartelATP.toFixed(0)}</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, (tick.cartelATP / 500) * 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400">Legitimate</span>
                    <span className="text-gray-400">{tick.legitimateATP.toFixed(0)}</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${Math.min(100, (tick.legitimateATP / 500) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Comparison */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-bold text-gray-300 mb-3">Average Trust</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400">Cartel</span>
                    <span className="text-gray-400">{(tick.cartelAvgTrust * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${tick.cartelAvgTrust * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400">Legitimate</span>
                    <span className="text-gray-400">{(tick.legitimateAvgTrust * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-gray-900 rounded overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${tick.legitimateAvgTrust * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Stats */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-bold text-gray-300 mb-2">Detections</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-900 rounded p-2 text-center">
                  <div className="text-xl font-bold text-yellow-400">
                    {allDetections.filter(d => d.type === 'diversity').length}
                  </div>
                  <div className="text-gray-500">Diversity</div>
                </div>
                <div className="bg-gray-900 rounded p-2 text-center">
                  <div className="text-xl font-bold text-red-400">
                    {allDetections.filter(d => d.type === 'inflation').length}
                  </div>
                  <div className="text-gray-500">Quality Audit</div>
                </div>
                <div className="bg-gray-900 rounded p-2 text-center">
                  <div className="text-xl font-bold text-purple-400">
                    {allDetections.filter(d => d.type === 'clustering').length}
                  </div>
                  <div className="text-gray-500">Clustering</div>
                </div>
                <div className="bg-gray-900 rounded p-2 text-center">
                  <div className="text-xl font-bold text-orange-400">
                    {allDetections.filter(d => d.type === 'velocity').length}
                  </div>
                  <div className="text-gray-500">Velocity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detection Log */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-2">Detection Log</h4>
            <div className="max-h-40 overflow-y-auto space-y-1 text-xs font-mono">
              {allDetections.length === 0 ? (
                <div className="text-gray-600 text-center py-3">No detections yet...</div>
              ) : (
                allDetections.slice().reverse().slice(0, 15).map((d, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 px-2 py-1 rounded ${
                      d.severity === 'high' ? 'bg-red-900/30 text-red-300'
                        : d.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-300'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    <span className="text-gray-600 w-12">t={d.tick}</span>
                    <span className="text-gray-500 w-16">[{d.type}]</span>
                    <span className="flex-1">{d.description}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Analysis Summary */}
          {currentTick >= (simulation.length - 1) && (
            <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-lg p-5">
              <h4 className="text-sm font-bold text-gray-200 mb-3">Simulation Analysis</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <strong className="text-red-400">Cartel outcome: </strong>
                  {tick.cartelAvgTrust > tick.legitimateAvgTrust
                    ? `Cartel achieved ${((tick.cartelAvgTrust / tick.legitimateAvgTrust - 1) * 100).toFixed(0)}% higher trust than legitimate agents.`
                    : 'Cartel did not outperform legitimate agents in trust.'}
                  {' '}ATP surplus: {tick.cartelATP > tick.legitimateATP
                    ? `${((tick.cartelATP / tick.legitimateATP - 1) * 100).toFixed(0)}% above legitimate average.`
                    : 'No ATP advantage.'}
                </p>
                <p>
                  <strong className="text-blue-400">Detection effectiveness: </strong>
                  {allDetections.length} total alerts fired.
                  {allDetections.filter(d => d.severity === 'high').length > 0
                    ? ` ${allDetections.filter(d => d.severity === 'high').length} high-severity alerts would trigger investigation.`
                    : ' No high-severity alerts - cartel may have evaded detection.'}
                </p>
                <p>
                  <strong className="text-yellow-400">Key insight: </strong>
                  {config.sophistication === 'naive'
                    ? 'Naive cartels are easily detected through diversity analysis. Their internal validation patterns create obvious clustering.'
                    : config.sophistication === 'moderate'
                    ? 'Moderate sophistication cartels are harder to detect. Cross-validation with legitimate agents provides cover, but ATP velocity analysis can still reveal anomalies.'
                    : 'Advanced cartels that mirror legitimate validation patterns are very difficult to distinguish from real communities. This highlights why collusion detection remains an active research problem.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
