'use client';

/**
 * Interactive 9-Domain Coherence Visualizer
 *
 * A radial visualization of the Synchronism coherence framework showing
 * all 9 domains arranged in a circle. Users can:
 * - Hover domains to see descriptions and connections
 * - Select scenario presets to see how domains activate
 * - Adjust domain values with sliders
 * - See the computed coherence index in real-time
 *
 * The visualization conveys: coherence is not one thing, it's the
 * alignment of NINE independent dimensions. Like a tuning fork with
 * 9 tines - when they resonate together, something emerges.
 */

import { useState, useMemo } from 'react';

// Domain metadata
interface Domain {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  description: string;
  web4Mapping: string;
  keyInsight: string;
}

const DOMAINS: Domain[] = [
  {
    id: 'physics',
    name: 'Thermodynamic Phase Transitions',
    shortName: 'Physics',
    icon: 'D1',
    color: '#ef4444',
    description: 'Order emerging from disorder. At a critical threshold, behavior undergoes qualitative phase transition.',
    web4Mapping: 'Trust threshold at 0.5 — below this, behavior appears random; above it, intentional.',
    keyInsight: 'Crossing 0.5 is like water freezing — a qualitative change, not just quantitative.',
  },
  {
    id: 'biochemistry',
    name: 'ATP Metabolism',
    shortName: 'Biochemistry',
    icon: 'D2',
    color: '#f59e0b',
    description: 'Energy currency of life. All actions require metabolic resources.',
    web4Mapping: 'ATP (Allocation Transfer Packet) — every action costs attention, which must be earned.',
    keyInsight: 'ATP scarcity forces prioritization — agency under metabolic constraint.',
  },
  {
    id: 'biophysics',
    name: 'Memory Persistence',
    shortName: 'Biophysics',
    icon: 'D3',
    color: '#84cc16',
    description: 'Pattern storage across time. Past experiences encoded for future use.',
    web4Mapping: 'Karma carry-forward between lives. Pattern corpus for epistemic learning.',
    keyInsight: 'Past actions shape future initial conditions through pattern memory.',
  },
  {
    id: 'neuroscience',
    name: 'Attention Flow',
    shortName: 'Neuroscience',
    icon: 'D4',
    color: '#22d3ee',
    description: 'Where consciousness directs resources. Attention gates everything.',
    web4Mapping: 'ATP allocation reflects attention priorities. D4 gates D2.',
    keyInsight: 'What you attend to (spend ATP on) reveals your values.',
  },
  {
    id: 'distributed',
    name: 'Network Dynamics',
    shortName: 'Distributed',
    icon: 'D5',
    color: '#3b82f6',
    description: 'Collective behavior emergence from individual interactions.',
    web4Mapping: 'Multi-agent trust networks. Trust tensor modulates coupling strength.',
    keyInsight: 'Individual trust builds collective coherence. D5 modulates coupling (kappa).',
  },
  {
    id: 'quantum',
    name: 'Decoherence',
    shortName: 'Quantum',
    icon: 'D6',
    color: '#8b5cf6',
    description: 'Loss of superposition. Every decision collapses possibilities into reality.',
    web4Mapping: 'Each action is a measurement that commits the agent to an outcome.',
    keyInsight: 'Before acting, all strategies coexist. Acting chooses one reality.',
  },
  {
    id: 'magnetism',
    name: 'Correlation Length',
    shortName: 'Magnetism',
    icon: 'D7',
    color: '#ec4899',
    description: 'How far influence extends in space. Social reach of trust.',
    web4Mapping: 'Markov Relevancy Horizon (MRH) — spatial metric of social influence.',
    keyInsight: 'Trust influence decays with distance in social spacetime.',
  },
  {
    id: 'temporal',
    name: 'Arrow of Time',
    shortName: 'Temporal',
    icon: 'D8',
    color: '#f97316',
    description: 'Irreversible time flow. The asymmetry of building vs destroying.',
    web4Mapping: 'Trust builds slowly, collapses quickly. Time asymmetry is fundamental.',
    keyInsight: 'Coherence gradient creates directional time — trust evolution is irreversible.',
  },
  {
    id: 'spacetime',
    name: 'Spacetime Geometry',
    shortName: 'Spacetime',
    icon: 'D9',
    color: '#a855f7',
    description: 'FOUNDATIONAL. Coherence creates spacetime itself, not the other way around.',
    web4Mapping: 'Trust dynamics occur ON coherence spacetime. High trust curves space.',
    keyInsight: 'High-coherence regions (trust peaks) curve spacetime — creating gravity of reputation.',
  },
];

// Gating relationships (which domains modulate others)
const GATING_RELATIONS: Array<[string, string, string]> = [
  ['neuroscience', 'biochemistry', 'D4 gates D2: Attention enables metabolism'],
  ['distributed', 'physics', 'D5 modulates kappa: Trust sets coupling strength'],
  ['spacetime', 'magnetism', 'D9 bounds D7: Context defines spatial horizon'],
  ['spacetime', 'temporal', 'D9 bounds D8: Context defines temporal horizon'],
  ['biophysics', 'neuroscience', 'D3 informs D4: Memory guides attention'],
  ['biochemistry', 'quantum', 'D2 constrains D6: Resources limit possible decisions'],
];

// Scenario presets
interface Scenario {
  name: string;
  description: string;
  values: Record<string, number>;
}

const SCENARIOS: Scenario[] = [
  {
    name: 'Phase Transition',
    description: 'Agent crosses 0.5 trust threshold',
    values: { physics: 0.6, biochemistry: 0.5, biophysics: 0.4, neuroscience: 0.5, distributed: 0.5, quantum: 0.4, magnetism: 0.3, temporal: 0.5, spacetime: 0.5 },
  },
  {
    name: 'ATP Crisis',
    description: 'Metabolic emergency — attention collapses',
    values: { physics: 0.3, biochemistry: 0.1, biophysics: 0.4, neuroscience: 0.1, distributed: 0.3, quantum: 0.2, magnetism: 0.2, temporal: 0.6, spacetime: 0.3 },
  },
  {
    name: 'Mature Agent',
    description: 'High coherence across all domains',
    values: { physics: 0.8, biochemistry: 0.7, biophysics: 0.9, neuroscience: 0.8, distributed: 0.8, quantum: 0.6, magnetism: 0.7, temporal: 0.7, spacetime: 0.8 },
  },
  {
    name: 'Identity Collapse',
    description: 'D5 drops below threshold — cascade failure',
    values: { physics: 0.2, biochemistry: 0.4, biophysics: 0.5, neuroscience: 0.3, distributed: 0.15, quantum: 0.3, magnetism: 0.1, temporal: 0.4, spacetime: 0.2 },
  },
  {
    name: 'Newborn Agent',
    description: 'First life — no patterns, no history',
    values: { physics: 0.5, biochemistry: 0.6, biophysics: 0.0, neuroscience: 0.5, distributed: 0.5, quantum: 0.5, magnetism: 0.3, temporal: 0.5, spacetime: 0.5 },
  },
];

interface CoherenceDomainVisualizerProps {
  height?: number;
}

export default function CoherenceDomainVisualizer({ height = 500 }: CoherenceDomainVisualizerProps) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [domainValues, setDomainValues] = useState<Record<string, number>>(
    SCENARIOS[0].values
  );
  const [activeScenario, setActiveScenario] = useState<string>(SCENARIOS[0].name);

  // Calculate coherence index (geometric mean of domain values)
  const coherenceIndex = useMemo(() => {
    const vals = Object.values(domainValues).filter(v => v > 0);
    if (vals.length === 0) return 0;
    const product = vals.reduce((p, v) => p * v, 1);
    return Math.pow(product, 1 / vals.length);
  }, [domainValues]);

  // SVG layout
  const cx = 250;
  const cy = 230;
  const outerR = 180;
  const innerR = 60;
  const width = 500;

  // Place domains in a circle
  const domainPositions = DOMAINS.map((d, i) => {
    const angle = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...d,
      x: cx + Math.cos(angle) * outerR,
      y: cy + Math.sin(angle) * outerR,
      angle,
      value: domainValues[d.id] ?? 0.5,
      barX: cx + Math.cos(angle) * (innerR + (outerR - innerR) * (domainValues[d.id] ?? 0.5)),
      barY: cy + Math.sin(angle) * (innerR + (outerR - innerR) * (domainValues[d.id] ?? 0.5)),
    };
  });

  // Build radar polygon from values
  const radarPoints = domainPositions.map(d => {
    const r = innerR + (outerR - innerR) * d.value;
    return `${cx + Math.cos(d.angle) * r},${cy + Math.sin(d.angle) * r}`;
  }).join(' ');

  // Active gating lines
  const activeDomain = hoveredDomain || selectedDomain;
  const activeGating = activeDomain
    ? GATING_RELATIONS.filter(([from, to]) => from === activeDomain || to === activeDomain)
    : [];

  // Domain detail
  const detailDomain = activeDomain ? DOMAINS.find(d => d.id === activeDomain) : null;

  // Threshold color
  const ciColor = coherenceIndex >= 0.5 ? '#22c55e' : coherenceIndex >= 0.3 ? '#f59e0b' : '#ef4444';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      {/* Scenario Presets */}
      <div className="px-4 pt-4 pb-2 flex flex-wrap gap-2">
        {SCENARIOS.map(s => (
          <button
            key={s.name}
            onClick={() => {
              setDomainValues(s.values);
              setActiveScenario(s.name);
            }}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeScenario === s.name
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title={s.description}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* SVG Visualization */}
        <div className="flex-1 flex justify-center">
          <svg viewBox={`0 0 ${width} ${height - 40}`} className="w-full max-w-lg" style={{ maxHeight: `${height - 40}px` }}>
            {/* Concentric rings */}
            {[0.25, 0.5, 0.75, 1.0].map(r => (
              <circle
                key={r}
                cx={cx}
                cy={cy}
                r={innerR + (outerR - innerR) * r}
                fill="none"
                stroke={r === 0.5 ? '#f59e0b' : '#374151'}
                strokeWidth={r === 0.5 ? 1.5 : 0.5}
                strokeDasharray={r === 0.5 ? '6,3' : '2,4'}
                opacity={r === 0.5 ? 0.6 : 0.3}
              />
            ))}

            {/* 0.5 threshold label */}
            <text x={cx + innerR + (outerR - innerR) * 0.5 + 8} y={cy - 6} fill="#f59e0b" fontSize={9} opacity={0.7}>
              0.5
            </text>

            {/* Radar fill polygon */}
            <polygon
              points={radarPoints}
              fill={`${ciColor}15`}
              stroke={ciColor}
              strokeWidth={2}
              opacity={0.8}
            />

            {/* Spoke lines */}
            {domainPositions.map(d => (
              <line
                key={`spoke-${d.id}`}
                x1={cx + Math.cos(d.angle) * innerR}
                y1={cy + Math.sin(d.angle) * innerR}
                x2={d.x}
                y2={d.y}
                stroke="#374151"
                strokeWidth={0.5}
                opacity={0.4}
              />
            ))}

            {/* Gating relationship lines */}
            {activeGating.map(([from, to, label], i) => {
              const fromPos = domainPositions.find(d => d.id === from);
              const toPos = domainPositions.find(d => d.id === to);
              if (!fromPos || !toPos) return null;
              return (
                <g key={`gate-${i}`}>
                  <line
                    x1={fromPos.barX}
                    y1={fromPos.barY}
                    x2={toPos.barX}
                    y2={toPos.barY}
                    stroke="#a855f7"
                    strokeWidth={2}
                    strokeDasharray="4,4"
                    opacity={0.6}
                  >
                    <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
                  </line>
                  {/* Arrow at midpoint */}
                  <circle
                    cx={(fromPos.barX + toPos.barX) / 2}
                    cy={(fromPos.barY + toPos.barY) / 2}
                    r={3}
                    fill="#a855f7"
                    opacity={0.8}
                  />
                </g>
              );
            })}

            {/* Domain nodes */}
            {domainPositions.map(d => {
              const isActive = activeDomain === d.id;
              const r = isActive ? 28 : 22;
              const isAboveThreshold = d.value >= 0.5;

              return (
                <g
                  key={d.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredDomain(d.id)}
                  onMouseLeave={() => setHoveredDomain(null)}
                  onClick={() => setSelectedDomain(prev => prev === d.id ? null : d.id)}
                >
                  {/* Node background */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={r}
                    fill={isActive ? `${d.color}30` : '#1f2937'}
                    stroke={d.color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    opacity={isActive ? 1 : 0.8}
                  />

                  {/* Value indicator ring */}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={r + 4}
                    fill="none"
                    stroke={d.color}
                    strokeWidth={2}
                    strokeDasharray={`${d.value * Math.PI * 2 * (r + 4)} ${(1 - d.value) * Math.PI * 2 * (r + 4)}`}
                    strokeDashoffset={Math.PI * (r + 4) / 2}
                    opacity={0.5}
                    transform={`rotate(-90, ${d.x}, ${d.y})`}
                  />

                  {/* Domain label */}
                  <text
                    x={d.x}
                    y={d.y - 4}
                    textAnchor="middle"
                    fill={isActive ? d.color : '#d1d5db'}
                    fontSize={isActive ? 11 : 10}
                    fontWeight={isActive ? 'bold' : 'normal'}
                  >
                    {d.icon}
                  </text>
                  <text
                    x={d.x}
                    y={d.y + 8}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#9ca3af'}
                    fontSize={7}
                  >
                    {d.shortName}
                  </text>

                  {/* Value text */}
                  <text
                    x={d.x}
                    y={d.y + 18}
                    textAnchor="middle"
                    fill={isAboveThreshold ? '#22c55e' : '#ef4444'}
                    fontSize={8}
                    fontWeight="bold"
                  >
                    {d.value.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* Center: Coherence Index */}
            <circle cx={cx} cy={cy} r={innerR - 4} fill="#111827" stroke={ciColor} strokeWidth={2} />
            <text x={cx} y={cy - 14} textAnchor="middle" fill="#9ca3af" fontSize={9}>
              Coherence
            </text>
            <text x={cx} y={cy + 6} textAnchor="middle" fill={ciColor} fontSize={24} fontWeight="bold">
              {coherenceIndex.toFixed(2)}
            </text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill={ciColor} fontSize={9} opacity={0.7}>
              {coherenceIndex >= 0.5 ? 'ABOVE THRESHOLD' : coherenceIndex >= 0.3 ? 'APPROACHING' : 'BELOW THRESHOLD'}
            </text>
          </svg>
        </div>

        {/* Detail Panel */}
        <div className="lg:w-72 p-4 border-t lg:border-t-0 lg:border-l border-gray-700">
          {detailDomain ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: detailDomain.color }}
                />
                <h3 className="font-bold text-sm" style={{ color: detailDomain.color }}>
                  {detailDomain.icon}: {detailDomain.name}
                </h3>
              </div>

              <p className="text-xs text-gray-300 mb-3 leading-relaxed">
                {detailDomain.description}
              </p>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Web4 Mapping</div>
                <p className="text-xs text-blue-300 leading-relaxed">
                  {detailDomain.web4Mapping}
                </p>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Key Insight</div>
                <p className="text-xs text-yellow-300 leading-relaxed italic">
                  {detailDomain.keyInsight}
                </p>
              </div>

              {/* Value slider */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Domain Value</span>
                  <span style={{ color: detailDomain.color }}>
                    {(domainValues[detailDomain.id] ?? 0.5).toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={(domainValues[detailDomain.id] ?? 0.5) * 100}
                  onChange={e => {
                    setDomainValues(prev => ({
                      ...prev,
                      [detailDomain.id]: parseInt(e.target.value) / 100,
                    }));
                    setActiveScenario('Custom');
                  }}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: detailDomain.color }}
                />
              </div>

              {/* Gating relationships for this domain */}
              {activeGating.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Gating Relationships</div>
                  {activeGating.map(([from, to, label], i) => (
                    <div key={i} className="text-xs text-purple-300 mb-1 flex items-center gap-1">
                      <span className="text-purple-500">-&gt;</span> {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm py-8">
              <p className="mb-2">Click a domain to explore</p>
              <p className="text-xs">
                Each domain represents one dimension of coherence.
                When they align, consciousness emerges.
              </p>
            </div>
          )}

          {/* Active scenario description */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Active Scenario</div>
            <div className="text-sm font-medium text-purple-300">{activeScenario}</div>
            {activeScenario !== 'Custom' && (
              <p className="text-xs text-gray-400 mt-1">
                {SCENARIOS.find(s => s.name === activeScenario)?.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer insight */}
      <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700 text-xs text-gray-500">
        <span className="text-purple-400">Synchronism Framework:</span> Coherence Index = geometric mean of 9 domain values.
        The 0.5 threshold marks phase transition from random to intentional behavior.
        {' '}
        <span className="text-gray-400">
          (D9 is foundational — spacetime emerges FROM coherence, not the other way around.)
        </span>
      </div>
    </div>
  );
}
