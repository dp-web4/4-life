'use client';

/**
 * Society Simulator - Interactive Multi-Agent Trust Dynamics
 *
 * Session #41: The core "4-Life" experience. Watch a society of agents
 * with different strategies form trust networks, build coalitions,
 * and self-organize. Conway's Life at society scale.
 *
 * Features:
 * - Network graph visualization (agents as nodes, trust as edges)
 * - Real-time metrics (cooperation rate, trust, coalitions, inequality)
 * - Event feed (coalition formations, defector isolation, trust collapses)
 * - Agent inspector (click to see an agent's strategy, trust map, history)
 * - Preset scenarios and custom configuration
 * - Animated step-through or instant run
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import { queryEngine, type Query, type Response as ACTResponse } from '@/lib/act/query_engine';
import {
  SocietyEngine,
  SocietyConfig,
  DEFAULT_SOCIETY_CONFIG,
  SOCIETY_PRESETS,
  STRATEGY_COLORS,
  STRATEGY_LABELS,
  AgentSnapshot,
  Coalition,
  SocietyMetrics,
  SocietyEvent,
  SocietyResult,
  Interaction,
  StrategyType,
} from '@/lib/simulation/society-engine';
import {
  generateSocietyNarrative,
  type SocietyNarrative,
  type CharacterProfile,
  type KeyMoment,
} from '@/lib/narratives/society_narrative';

// ============================================================================
// ACT Chat Panel Component
// ============================================================================

interface ACTMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: ACTResponse;
}

function ACTChatPanel({
  agents,
  coalitions,
  metrics,
  events,
  selectedAgentId,
  result,
  currentEpoch,
  isOpen,
  onToggle,
  agentClickTrigger,
}: {
  agents: AgentSnapshot[];
  coalitions: Coalition[];
  metrics: SocietyMetrics | null;
  events: SocietyEvent[];
  selectedAgentId: number | null;
  result: SocietyResult | null;
  currentEpoch: number;
  isOpen: boolean;
  onToggle: () => void;
  agentClickTrigger: number;  // Increments when agent is clicked (not just selected)
}) {
  const [messages, setMessages] = useState<ACTMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "I'm ACT, your guide to this society simulation.\n\nRun a simulation, then ask me questions like:\n- \"Who is winning?\"\n- \"How are coalitions forming?\"\n- \"Why are defectors struggling?\"\n\n**Tip**: Click any agent in the network graph to ask about them!",
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-query when agent is clicked (trigger changed, and we have a selected agent)
  useEffect(() => {
    if (agentClickTrigger === 0 || agentClickTrigger === lastTriggerRef.current) return;
    lastTriggerRef.current = agentClickTrigger;

    if (selectedAgentId === null || agents.length === 0) return;

    const agent = agents.find(a => a.id === selectedAgentId);
    if (!agent) return;

    // Auto-open panel if closed
    if (!isOpen) {
      onToggle();
    }

    // Generate query about the agent
    const queryText = `Tell me about ${agent.name}`;
    const userMessage: ACTMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
    };
    setMessages(prev => [...prev, userMessage]);

    // Process with ACT engine
    const query: Query = {
      text: queryText,
      type: 'society_analysis',
      context: {
        societyAgents: agents,
        societyCoalitions: coalitions,
        societyMetrics: metrics || undefined,
        societyEvents: events,
        selectedAgentId: selectedAgentId,
        societyResult: result || undefined,
        currentEpoch,
      }
    };

    const response = queryEngine.processQuery(query);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.text,
      response,
    }]);
  }, [agentClickTrigger, selectedAgentId, agents, coalitions, metrics, events, result, currentEpoch, isOpen, onToggle]);

  // Track processed events to avoid re-prompting
  const processedEventsRef = useRef<Set<string>>(new Set());
  const [eventSuggestions, setEventSuggestions] = useState<{ question: string; eventType: string; emoji: string }[]>([]);

  // Generate suggestions when interesting events happen
  useEffect(() => {
    if (events.length === 0) return;

    const newSuggestions: { question: string; eventType: string; emoji: string }[] = [];

    for (const event of events) {
      // Create unique event key to avoid duplicates
      const eventKey = `${event.epoch}-${event.type}-${event.message.slice(0, 30)}`;
      if (processedEventsRef.current.has(eventKey)) continue;
      processedEventsRef.current.add(eventKey);

      // Generate relevant question based on event type
      switch (event.type) {
        case 'coalition_formed':
          newSuggestions.push({
            question: "Why did this coalition form?",
            eventType: 'coalition',
            emoji: '👥'
          });
          break;
        case 'defector_isolated':
          newSuggestions.push({
            question: "Why are defectors getting isolated?",
            eventType: 'defector',
            emoji: '🏝️'
          });
          break;
        case 'trust_collapse':
          newSuggestions.push({
            question: "Why did trust collapse?",
            eventType: 'crisis',
            emoji: '📉'
          });
          break;
        case 'cooperation_surge':
          newSuggestions.push({
            question: "Why is cooperation surging?",
            eventType: 'cooperation',
            emoji: '🤝'
          });
          break;
        case 'agent_death':
          newSuggestions.push({
            question: "What caused this agent to die?",
            eventType: 'death',
            emoji: '💀'
          });
          break;
        case 'society_stable':
          newSuggestions.push({
            question: "What made this society succeed?",
            eventType: 'stable',
            emoji: '✨'
          });
          break;
      }
    }

    if (newSuggestions.length > 0) {
      // Keep only unique suggestions by eventType, limit to 3
      setEventSuggestions(prev => {
        const existing = new Set(prev.map(s => s.eventType));
        const filtered = newSuggestions.filter(s => !existing.has(s.eventType));
        return [...prev, ...filtered].slice(-3);
      });
    }
  }, [events]);

  // Clear suggestions when asked
  const clearEventSuggestion = (eventType: string) => {
    setEventSuggestions(prev => prev.filter(s => s.eventType !== eventType));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ACTMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process with ACT query engine
    const query: Query = {
      text: userMessage.content,
      type: 'general',
      context: {
        societyAgents: agents,
        societyCoalitions: coalitions,
        societyMetrics: metrics || undefined,
        societyEvents: events,
        selectedAgentId: selectedAgentId || undefined,
        societyResult: result || undefined,
        currentEpoch,
      }
    };

    const response = queryEngine.processQuery(query);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.text,
      response,
    }]);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  // Handle clicking an event suggestion when panel is closed
  const handleEventSuggestionClick = (question: string, eventType: string) => {
    // Open panel and auto-submit the question
    onToggle();
    // Use setTimeout to ensure panel opens first
    setTimeout(() => {
      const userMessage: ACTMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: question,
      };
      setMessages(prev => [...prev, userMessage]);
      clearEventSuggestion(eventType);

      // Process with ACT engine
      const query: Query = {
        text: question,
        type: 'society_analysis',
        context: {
          societyAgents: agents,
          societyCoalitions: coalitions,
          societyMetrics: metrics || undefined,
          societyEvents: events,
          selectedAgentId: selectedAgentId || undefined,
          societyResult: result || undefined,
          currentEpoch,
        }
      };

      const response = queryEngine.processQuery(query);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        response,
      }]);
    }, 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {/* Event-triggered suggestions */}
        {eventSuggestions.map((suggestion, i) => (
          <button
            key={`${suggestion.eventType}-${i}`}
            onClick={() => handleEventSuggestionClick(suggestion.question, suggestion.eventType)}
            className="px-3 py-2 bg-gray-800/95 hover:bg-gray-700 border border-purple-500/50 rounded-lg text-white text-sm shadow-lg transition-all flex items-center gap-2 animate-pulse"
          >
            <span>{suggestion.emoji}</span>
            <span className="text-gray-300">{suggestion.question}</span>
            <span className="text-purple-400">→</span>
          </button>
        ))}
        {/* Main ACT button */}
        <button
          onClick={onToggle}
          className="px-4 py-3 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 rounded-full text-white font-bold shadow-lg transition-all flex items-center gap-2"
        >
          <span className="text-lg">💬</span>
          <span>Ask ACT</span>
          {eventSuggestions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
              {eventSuggestions.length}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gradient-to-r from-sky-900/50 to-purple-900/50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            ACT
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Society Guide</h3>
            <p className="text-xs text-gray-400">Ask about the simulation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Export button */}
          {messages.length > 1 && (
            <button
              onClick={() => {
                // Generate markdown export
                const lines = [
                  '# Society Simulator - ACT Conversation',
                  `**Exported**: ${new Date().toLocaleString()}`,
                  '',
                  '---',
                  '',
                ];
                messages.forEach(msg => {
                  if (msg.role === 'user') {
                    lines.push(`**User**: ${msg.content}`);
                  } else {
                    lines.push(`**ACT**: ${msg.content}`);
                  }
                  lines.push('');
                });
                const text = lines.join('\n');

                // Copy to clipboard
                navigator.clipboard.writeText(text).then(() => {
                  alert('Conversation copied to clipboard!');
                }).catch(() => {
                  // Fallback: download as file
                  const blob = new Blob([text], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'act-conversation.md';
                  a.click();
                  URL.revokeObjectURL(url);
                });
              }}
              className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-gray-700"
              title="Export conversation"
            >
              📋
            </button>
          )}
          {/* Clear button */}
          {messages.length > 1 && (
            <button
              onClick={() => {
                setMessages([{
                  id: '0',
                  role: 'assistant',
                  content: "I'm ACT, your guide to this society simulation.\n\nRun a simulation, then ask me questions like:\n- \"Who is winning?\"\n- \"How are coalitions forming?\"\n- \"Why are defectors struggling?\"\n\n**Tip**: Click any agent in the network graph to ask about them!",
                }]);
                setEventSuggestions([]);
                processedEventsRef.current.clear();
              }}
              className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-gray-700"
              title="Clear conversation"
            >
              🗑️
            </button>
          )}
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}
            >
              {msg.content.split('\n').map((line, i) => {
                // Parse bold text
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className="mb-1 last:mb-0">
                    {parts.map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j}>{part.slice(2, -2)}</strong>;
                      }
                      return <span key={j}>{part}</span>;
                    })}
                  </p>
                );
              })}

              {/* Suggested queries */}
              {msg.response?.suggestedQueries && (
                <div className="mt-2 pt-2 border-t border-gray-700 flex flex-wrap gap-1">
                  {msg.response.suggestedQueries.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(q)}
                      className="text-xs px-2 py-0.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 transition-colors"
                    >
                      {q.length > 25 ? q.slice(0, 25) + '...' : q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about the society..."
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm placeholder-gray-500 focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded text-white text-sm font-medium transition-colors"
          >
            Send
          </button>
        </form>
        <div className="mt-2 flex flex-wrap gap-1">
          {agents.length > 0 ? (
            <>
              <button onClick={() => handleSuggestion("Who is winning?")} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-400">Who&apos;s winning?</button>
              <button onClick={() => handleSuggestion("Tell me about coalitions")} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-400">Coalitions</button>
              <button onClick={() => handleSuggestion("Compare strategies")} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-400">Strategies</button>
            </>
          ) : (
            <>
              <button onClick={() => handleSuggestion("What is this simulator?")} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-400">What is this?</button>
              <button onClick={() => handleSuggestion("Explain strategies")} className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-400">Strategies</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Network Graph Component
// ============================================================================

function NetworkGraph({
  agents,
  coalitions,
  selectedAgentId,
  onSelectAgent,
  interactions,
}: {
  agents: AgentSnapshot[];
  coalitions: Coalition[];
  selectedAgentId: number | null;
  onSelectAgent: (id: number | null) => void;
  interactions: Interaction[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const width = 500;
  const height = 400;
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
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg mx-auto">
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
        const nodeRadius = Math.max(8, Math.min(16, 6 + agent.atp / 20));
        const color = STRATEGY_COLORS[agent.strategy];

        return (
          <g
            key={`agent-${agent.id}`}
            onClick={() => onSelectAgent(isSelected ? null : agent.id)}
            className="cursor-pointer"
          >
            {/* Selection ring */}
            {isSelected && (
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
            {/* Name label */}
            <text
              x={pos.x}
              y={pos.y + nodeRadius + 14}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize={9}
              fontFamily="monospace"
            >
              {agent.name}
            </text>
            {/* Cooperation rate indicator */}
            <text
              x={pos.x}
              y={pos.y + 3}
              textAnchor="middle"
              fill="#fff"
              fontSize={8}
              fontWeight="bold"
              fontFamily="monospace"
            >
              {Math.round(agent.cooperationRate * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// Metrics Dashboard
// ============================================================================

function MetricsDashboard({ metrics, epoch, totalEpochs }: {
  metrics: SocietyMetrics;
  epoch: number;
  totalEpochs: number;
}) {
  const MetricCard = ({ label, value, color, detail }: {
    label: string; value: string; color: string; detail?: string;
  }) => (
    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className={`text-lg font-bold font-mono ${color}`}>{value}</div>
      {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <MetricCard
        label="Epoch"
        value={`${epoch + 1}/${totalEpochs}`}
        color="text-white"
      />
      <MetricCard
        label="Avg Trust"
        value={metrics.averageTrust.toFixed(2)}
        color={metrics.averageTrust > 0.5 ? 'text-green-400' : metrics.averageTrust > 0.3 ? 'text-yellow-400' : 'text-red-400'}
      />
      <MetricCard
        label="Cooperation"
        value={`${Math.round(metrics.cooperationRate * 100)}%`}
        color={metrics.cooperationRate > 0.6 ? 'text-green-400' : metrics.cooperationRate > 0.4 ? 'text-yellow-400' : 'text-red-400'}
      />
      <MetricCard
        label="Coalitions"
        value={`${metrics.numCoalitions}`}
        color="text-blue-400"
        detail={metrics.largestCoalition > 0 ? `largest: ${metrics.largestCoalition}` : undefined}
      />
      <MetricCard
        label="Alive Agents"
        value={`${metrics.aliveCount}`}
        color="text-white"
      />
      <MetricCard
        label="Inequality"
        value={metrics.giniCoefficient.toFixed(2)}
        color={metrics.giniCoefficient < 0.3 ? 'text-green-400' : metrics.giniCoefficient < 0.5 ? 'text-yellow-400' : 'text-red-400'}
        detail="Gini of ATP"
      />
      <MetricCard
        label="Network"
        value={`${Math.round(metrics.networkDensity * 100)}%`}
        color="text-purple-400"
        detail="trust density"
      />
      <MetricCard
        label="Generations"
        value={`${metrics.totalGenerations}`}
        color="text-amber-400"
      />
    </div>
  );
}

// ============================================================================
// Agent Inspector
// ============================================================================

function AgentInspector({ agent, allAgents }: {
  agent: AgentSnapshot;
  allAgents: AgentSnapshot[];
}) {
  const strategyDescriptions: Record<StrategyType, string> = {
    cooperator: 'Always cooperates. Vulnerable to exploitation but enables trust formation.',
    defector: 'Always defects. Gains short-term advantage but loses long-term trust.',
    reciprocator: 'Mirrors partner\'s last action. Rewards cooperation, punishes defection.',
    cautious: 'Only cooperates when trust is established. Slow to warm up but resilient.',
    adaptive: 'Cooperates proportional to trust level. Learns from experience.',
  };

  const topTrusted = [...agent.trustEdges]
    .sort((a, b) => b.trust - a.trust)
    .slice(0, 5);

  const leastTrusted = [...agent.trustEdges]
    .sort((a, b) => a.trust - b.trust)
    .slice(0, 3);

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: STRATEGY_COLORS[agent.strategy] }}
        />
        <h3 className="text-lg font-bold">{agent.name}</h3>
        <span className="text-sm px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
          {STRATEGY_LABELS[agent.strategy]}
        </span>
        {agent.generation > 1 && (
          <span className="text-xs text-amber-400">Gen {agent.generation}</span>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-3">{strategyDescriptions[agent.strategy]}</p>

      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
        <div className="bg-gray-900/50 rounded p-2">
          <div className="text-xs text-gray-500">ATP</div>
          <div className={`font-mono font-bold ${agent.atp < 20 ? 'text-red-400' : 'text-white'}`}>
            {Math.round(agent.atp)}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded p-2">
          <div className="text-xs text-gray-500">Reputation</div>
          <div className="font-mono font-bold text-blue-400">{agent.reputation.toFixed(2)}</div>
        </div>
        <div className="bg-gray-900/50 rounded p-2">
          <div className="text-xs text-gray-500">Coop Rate</div>
          <div className="font-mono font-bold text-green-400">{Math.round(agent.cooperationRate * 100)}%</div>
        </div>
      </div>

      {topTrusted.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-gray-500 mb-1">Most Trusted</div>
          <div className="flex flex-wrap gap-1">
            {topTrusted.map(edge => {
              const target = allAgents.find(a => a.id === edge.targetId);
              return (
                <span key={edge.targetId} className="text-xs px-2 py-0.5 rounded bg-green-900/30 text-green-300">
                  {target?.name ?? `#${edge.targetId}`}: {edge.trust.toFixed(2)}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {leastTrusted.length > 0 && leastTrusted[0].trust < 0.4 && (
        <div>
          <div className="text-xs text-gray-500 mb-1">Least Trusted</div>
          <div className="flex flex-wrap gap-1">
            {leastTrusted.filter(e => e.trust < 0.4).map(edge => {
              const target = allAgents.find(a => a.id === edge.targetId);
              return (
                <span key={edge.targetId} className="text-xs px-2 py-0.5 rounded bg-red-900/30 text-red-300">
                  {target?.name ?? `#${edge.targetId}`}: {edge.trust.toFixed(2)}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {agent.coalitionSize > 0 && (
        <div className="mt-2 text-xs text-blue-400">
          Coalition: {agent.coalitionSize} partner{agent.coalitionSize !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Event Feed
// ============================================================================

function EventFeed({ events }: { events: SocietyEvent[] }) {
  const eventColors: Record<SocietyEvent['type'], string> = {
    coalition_formed: 'border-blue-500 text-blue-300',
    coalition_dissolved: 'border-gray-500 text-gray-300',
    agent_death: 'border-red-500 text-red-300',
    agent_rebirth: 'border-amber-500 text-amber-300',
    defector_isolated: 'border-purple-500 text-purple-300',
    trust_network_connected: 'border-green-500 text-green-300',
    cooperation_surge: 'border-green-500 text-green-300',
    trust_collapse: 'border-red-500 text-red-300',
    strategy_shift: 'border-yellow-500 text-yellow-300',
    society_stable: 'border-green-500 text-green-300',
  };

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {events.length === 0 && (
        <div className="text-gray-500 text-sm italic">No events yet...</div>
      )}
      {events.slice().reverse().map((event, i) => (
        <div
          key={i}
          className={`border-l-2 pl-3 py-1 ${eventColors[event.type] || 'border-gray-600 text-gray-300'}`}
        >
          <div className="text-sm">{event.message}</div>
          <div className="text-xs text-gray-500">{event.significance}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Strategy Distribution Bar
// ============================================================================

function StrategyBar({ distribution }: { distribution: Record<StrategyType, number> }) {
  const total = Object.values(distribution).reduce((s, v) => s + v, 0);
  if (total === 0) return null;

  return (
    <div className="flex h-6 rounded overflow-hidden">
      {(Object.entries(distribution) as [StrategyType, number][])
        .filter(([, count]) => count > 0)
        .map(([strategy, count]) => (
          <div
            key={strategy}
            className="flex items-center justify-center text-xs font-bold text-white/80 transition-all duration-300"
            style={{
              width: `${(count / total) * 100}%`,
              backgroundColor: STRATEGY_COLORS[strategy],
              minWidth: count > 0 ? '20px' : 0,
            }}
            title={`${STRATEGY_LABELS[strategy]}: ${count}`}
          >
            {count > 0 && count}
          </div>
        ))}
    </div>
  );
}

// ============================================================================
// Metrics History Chart (sparkline-style)
// ============================================================================

function MetricsChart({ history }: { history: { trust: number; cooperation: number; coalitions: number }[] }) {
  if (history.length < 2) return null;

  const w = 400;
  const h = 80;
  const padding = 4;

  const makePathD = (values: number[], maxVal: number = 1) => {
    const stepX = (w - padding * 2) / (values.length - 1);
    return values.map((v, i) => {
      const x = padding + i * stepX;
      const y = h - padding - (v / maxVal) * (h - padding * 2);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const trustValues = history.map(h => h.trust);
  const coopValues = history.map(h => h.cooperation);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* Trust line */}
      <path d={makePathD(trustValues)} fill="none" stroke="#3b82f6" strokeWidth={2} />
      {/* Cooperation line */}
      <path d={makePathD(coopValues)} fill="none" stroke="#22c55e" strokeWidth={2} strokeDasharray="4 2" />
      {/* Legend */}
      <text x={padding} y={12} fill="#3b82f6" fontSize={9} fontFamily="monospace">trust</text>
      <text x={50} y={12} fill="#22c55e" fontSize={9} fontFamily="monospace">cooperation</text>
    </svg>
  );
}

// ============================================================================
// Scenario Comparison Panel
// ============================================================================

function ComparisonPanel({
  savedResults,
  onRemove,
  onClose,
}: {
  savedResults: { label: string; result: SocietyResult }[];
  onRemove: (index: number) => void;
  onClose: () => void;
}) {
  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7'];

  // Calculate comparison metrics
  const comparison = savedResults.map((sr, i) => ({
    label: sr.label,
    color: colors[i % colors.length],
    trust: sr.result.finalMetrics.averageTrust,
    cooperation: sr.result.finalMetrics.cooperationRate,
    gini: sr.result.finalMetrics.giniCoefficient,
    coalitions: sr.result.finalMetrics.numCoalitions,
    generations: sr.result.finalMetrics.totalGenerations,
    events: sr.result.events.length,
  }));

  // Find best/worst for each metric
  const bestTrust = comparison.reduce((best, c) => c.trust > best.trust ? c : best, comparison[0]);
  const bestCoop = comparison.reduce((best, c) => c.cooperation > best.cooperation ? c : best, comparison[0]);
  const lowestGini = comparison.reduce((best, c) => c.gini < best.gini ? c : best, comparison[0]);

  return (
    <div className="bg-gray-800/80 rounded-lg p-4 border border-purple-500/30 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">📊 Scenario Comparison</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">×</button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-2 text-gray-400 font-normal">Scenario</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Trust</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Cooperation</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Gini</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Coalitions</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Events</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((c, i) => (
              <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                <td className="py-2 px-2">
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: c.color }} />
                  {c.label}
                </td>
                <td className={`text-right py-2 px-2 ${c === bestTrust ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                  {(c.trust * 100).toFixed(1)}%
                </td>
                <td className={`text-right py-2 px-2 ${c === bestCoop ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                  {(c.cooperation * 100).toFixed(1)}%
                </td>
                <td className={`text-right py-2 px-2 ${c === lowestGini ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                  {c.gini.toFixed(3)}
                </td>
                <td className="text-right py-2 px-2 text-gray-300">{c.coalitions}</td>
                <td className="text-right py-2 px-2 text-gray-300">{c.events}</td>
                <td className="py-2 px-2">
                  <button
                    onClick={() => onRemove(i)}
                    className="text-gray-500 hover:text-red-400 text-sm"
                    title="Remove from comparison"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual Comparison Bars */}
      <div className="mt-4 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Average Trust</span>
            <span>Best: {bestTrust.label}</span>
          </div>
          <div className="flex gap-1 h-6">
            {comparison.map((c, i) => (
              <div
                key={i}
                className="rounded relative group"
                style={{
                  width: `${(c.trust / 1) * 100}%`,
                  backgroundColor: c.color,
                  minWidth: '24px',
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
                  {(c.trust * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Cooperation Rate</span>
            <span>Best: {bestCoop.label}</span>
          </div>
          <div className="flex gap-1 h-6">
            {comparison.map((c, i) => (
              <div
                key={i}
                className="rounded relative"
                style={{
                  width: `${(c.cooperation / 1) * 100}%`,
                  backgroundColor: c.color,
                  minWidth: '24px',
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
                  {(c.cooperation * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Inequality (Gini)</span>
            <span>Most Equal: {lowestGini.label}</span>
          </div>
          <div className="flex gap-1 h-6">
            {comparison.map((c, i) => (
              <div
                key={i}
                className="rounded relative"
                style={{
                  width: `${(c.gini / 0.5) * 100}%`,
                  backgroundColor: c.color,
                  minWidth: '24px',
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/80">
                  {c.gini.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-4 pt-3 border-t border-gray-700">
        <h4 className="text-sm font-bold text-gray-400 mb-2">Key Insights</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• <strong className="text-green-400">{bestTrust.label}</strong> achieved the highest trust ({(bestTrust.trust * 100).toFixed(1)}%)</li>
          <li>• <strong className="text-green-400">{bestCoop.label}</strong> had the most cooperation ({(bestCoop.cooperation * 100).toFixed(1)}%)</li>
          <li>• <strong className="text-green-400">{lowestGini.label}</strong> had the most equal society (Gini {lowestGini.gini.toFixed(3)})</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================================================
// Narrative Panel Component
// ============================================================================

function NarrativePanel({
  narrative,
  onClose,
}: {
  narrative: SocietyNarrative;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'story' | 'characters' | 'moments'>('story');

  const STATUS_COLORS: Record<CharacterProfile['finalStatus'], string> = {
    thriving: 'text-green-400',
    surviving: 'text-yellow-400',
    struggling: 'text-orange-400',
    dead: 'text-red-400',
  };

  return (
    <div className="fixed inset-4 md:inset-8 bg-gray-900 border border-amber-500/30 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-amber-900/30 to-orange-900/30">
        <div>
          <h2 className="text-2xl font-bold text-white">{narrative.title}</h2>
          <p className="text-amber-200/70 text-sm italic">{narrative.tagline}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl px-2"
        >
          ×
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {(['story', 'characters', 'moments'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-gray-800 text-amber-400 border-b-2 border-amber-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab === 'story' && '📖 Story'}
            {tab === 'characters' && '👥 Characters'}
            {tab === 'moments' && '⚡ Key Moments'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'story' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Summary */}
            <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="text-gray-300 leading-relaxed">{narrative.summary}</p>
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-2">
              {narrative.themes.map((theme, i) => (
                <span key={i} className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm">
                  {theme}
                </span>
              ))}
            </div>

            {/* Chapters */}
            {narrative.chapters.map(chapter => (
              <div key={chapter.number} className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="text-amber-500">Chapter {chapter.number}</span>
                  <span className="text-gray-300">{chapter.title}</span>
                </h3>

                <p className="text-gray-300 leading-relaxed">{chapter.opening}</p>

                {chapter.events.map((event, i) => (
                  <div key={i} className="pl-4 border-l-2 border-gray-700 space-y-2">
                    <p className="text-gray-200">{event.description}</p>
                    {event.quote && (
                      <p className="text-gray-400 italic pl-4 border-l border-amber-500/50">
                        {event.quote}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">{event.significance}</p>
                  </div>
                ))}

                {chapter.closing && (
                  <p className="text-gray-400 italic">{chapter.closing}</p>
                )}
              </div>
            ))}

            {/* Moral */}
            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-lg p-6 border border-amber-500/30">
              <h3 className="text-lg font-bold text-amber-400 mb-2">The Moral</h3>
              <p className="text-gray-200 leading-relaxed">{narrative.moralOfTheStory}</p>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {narrative.characters.map((character, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: STRATEGY_COLORS[character.strategy] }}
                  >
                    {character.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{character.name}</h4>
                    <p className="text-xs text-gray-400">
                      {character.archetype} • <span className={STATUS_COLORS[character.finalStatus]}>{character.finalStatus}</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3">{character.arc}</p>

                {character.notableActions.length > 0 && (
                  <div className="space-y-1">
                    {character.notableActions.map((action, j) => (
                      <p key={j} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="text-amber-500">•</span>
                        {action}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'moments' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {narrative.keyMoments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No key moments detected in this simulation.</p>
            ) : (
              narrative.keyMoments.map((moment, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-amber-500"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-amber-900/50 text-amber-300 px-2 py-0.5 rounded">
                      Epoch {moment.epoch}
                    </span>
                    <h4 className="font-bold text-white">{moment.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{moment.description}</p>
                  <p className="text-gray-500 text-xs">{moment.impact}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Generated by 4-Life Narrative Engine • Translating trust dynamics into human stories
        </p>
        <button
          onClick={() => {
            // Export as markdown
            const lines = [
              `# ${narrative.title}`,
              `*${narrative.tagline}*`,
              '',
              '## Summary',
              narrative.summary,
              '',
              `**Themes**: ${narrative.themes.join(', ')}`,
              '',
              '---',
              '',
            ];

            narrative.chapters.forEach(ch => {
              lines.push(`## Chapter ${ch.number}: ${ch.title}`);
              lines.push('');
              lines.push(ch.opening);
              lines.push('');
              ch.events.forEach(e => {
                lines.push(e.description);
                if (e.quote) lines.push(`> ${e.quote}`);
                lines.push(`*${e.significance}*`);
                lines.push('');
              });
              if (ch.closing) lines.push(`*${ch.closing}*`);
              lines.push('');
            });

            lines.push('---');
            lines.push('');
            lines.push('## The Moral');
            lines.push(narrative.moralOfTheStory);

            const text = lines.join('\n');
            navigator.clipboard.writeText(text).then(() => {
              alert('Narrative copied to clipboard!');
            }).catch(() => {
              const blob = new Blob([text], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'society-narrative.md';
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
          className="text-sm px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
        >
          📋 Export Story
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function SocietySimulatorPage() {
  const [selectedPreset, setSelectedPreset] = useState<string>('cooperative-majority');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<SocietyResult | null>(null);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [agents, setAgents] = useState<AgentSnapshot[]>([]);
  const [coalitions, setCoalitions] = useState<Coalition[]>([]);
  const [metrics, setMetrics] = useState<SocietyMetrics | null>(null);
  const [events, setEvents] = useState<SocietyEvent[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<{ trust: number; cooperation: number; coalitions: number }[]>([]);
  const [mode, setMode] = useState<'animated' | 'instant'>('animated');
  const [actPanelOpen, setActPanelOpen] = useState(false);
  const [agentClickTrigger, setAgentClickTrigger] = useState(0);  // Increment on agent click to trigger ACT query
  const [savedResults, setSavedResults] = useState<{ label: string; result: SocietyResult }[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [narrative, setNarrative] = useState<SocietyNarrative | null>(null);
  const [showNarrative, setShowNarrative] = useState(false);
  const cancelRef = useRef(false);

  // Custom config overrides
  const [customAgentCount, setCustomAgentCount] = useState(12);
  const [customEpochs, setCustomEpochs] = useState(5);
  const [showCustom, setShowCustom] = useState(false);

  const buildConfig = useCallback((): Partial<SocietyConfig> => {
    const preset = SOCIETY_PRESETS[selectedPreset];
    const base = preset?.config || {};
    if (showCustom) {
      return {
        ...base,
        numAgents: customAgentCount,
        numEpochs: customEpochs,
      };
    }
    return base;
  }, [selectedPreset, showCustom, customAgentCount, customEpochs]);

  const runSimulation = useCallback(async () => {
    cancelRef.current = false;
    setRunning(true);
    setResult(null);
    setEvents([]);
    setMetricsHistory([]);
    setSelectedAgentId(null);

    const config = buildConfig();
    const engine = new SocietyEngine(config);

    if (mode === 'instant') {
      const result = engine.run();
      setResult(result);
      // Show last epoch
      const lastEpoch = result.epochs[result.epochs.length - 1];
      setCurrentEpoch(lastEpoch.epoch);
      setAgents(lastEpoch.agents);
      setCoalitions(lastEpoch.coalitions);
      setMetrics(lastEpoch.societyMetrics);
      setEvents(result.events);
      setInteractions(lastEpoch.interactions);
      setMetricsHistory(result.epochs.map(e => ({
        trust: e.societyMetrics.averageTrust,
        cooperation: e.societyMetrics.cooperationRate,
        coalitions: e.societyMetrics.numCoalitions,
      })));
      setRunning(false);
      return;
    }

    // Animated mode
    for await (const frame of engine.runAnimated()) {
      if (cancelRef.current) break;

      setCurrentEpoch(frame.epoch);
      setAgents(frame.agents);
      setCoalitions(frame.coalitions);
      setMetrics(frame.metrics);
      setInteractions(frame.interactions);
      if (frame.events.length > 0) {
        setEvents(prev => [...prev, ...frame.events]);
      }

      // Track history at epoch boundaries
      if (frame.round === (config.roundsPerEpoch || DEFAULT_SOCIETY_CONFIG.roundsPerEpoch)) {
        setMetricsHistory(prev => [...prev, {
          trust: frame.metrics.averageTrust,
          cooperation: frame.metrics.cooperationRate,
          coalitions: frame.metrics.numCoalitions,
        }]);
      }

      if (frame.done) break;
    }

    setRunning(false);
  }, [buildConfig, mode]);

  const stopSimulation = useCallback(() => {
    cancelRef.current = true;
  }, []);

  // Epoch navigation for completed results
  const showEpoch = useCallback((epochIdx: number) => {
    if (!result || epochIdx < 0 || epochIdx >= result.epochs.length) return;
    const epoch = result.epochs[epochIdx];
    setCurrentEpoch(epoch.epoch);
    setAgents(epoch.agents);
    setCoalitions(epoch.coalitions);
    setMetrics(epoch.societyMetrics);
    setInteractions(epoch.interactions);
  }, [result]);

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Breadcrumbs currentPath="/society-simulator" />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Society Simulator</h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Watch a society of agents with different strategies form trust networks,
            build coalitions, and self-organize. This is Web4 at society scale:
            no central authority, just trust dynamics.
          </p>
        </div>

        {/* Key Insight */}
        <div className="mb-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">The Core Question</h2>
          <p className="text-gray-300 text-sm">
            Can a society of self-interested agents develop cooperation, trust, and social structure
            <em> without any central authority</em>? In Web4, the answer is yes &mdash; if trust
            is the fundamental currency. Click <strong>Run</strong> to watch it happen.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-sm text-gray-400">Scenario:</label>
            {Object.entries(SOCIETY_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => { setSelectedPreset(key); setResult(null); }}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedPreset === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                disabled={running}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-3">
            {SOCIETY_PRESETS[selectedPreset]?.description || 'Select a scenario'}
          </p>

          {/* Custom toggle */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setShowCustom(!showCustom)}
              className="text-xs text-gray-500 hover:text-gray-300 underline"
            >
              {showCustom ? 'Hide' : 'Show'} custom settings
            </button>
          </div>

          {showCustom && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Agents: {customAgentCount}</label>
                <input
                  type="range" min={4} max={20} value={customAgentCount}
                  onChange={e => setCustomAgentCount(Number(e.target.value))}
                  className="w-full"
                  disabled={running}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Epochs: {customEpochs}</label>
                <input
                  type="range" min={2} max={15} value={customEpochs}
                  onChange={e => setCustomEpochs(Number(e.target.value))}
                  className="w-full"
                  disabled={running}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg overflow-hidden border border-gray-600">
              <button
                onClick={() => setMode('animated')}
                className={`px-3 py-1.5 text-sm ${mode === 'animated' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Animated
              </button>
              <button
                onClick={() => setMode('instant')}
                className={`px-3 py-1.5 text-sm ${mode === 'instant' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              >
                Instant
              </button>
            </div>

            {!running ? (
              <button
                onClick={runSimulation}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors"
              >
                Run Society
              </button>
            ) : (
              <button
                onClick={stopSimulation}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors"
              >
                Stop
              </button>
            )}

            {/* Save & Compare buttons */}
            {result && !running && (
              <button
                onClick={() => {
                  const label = SOCIETY_PRESETS[selectedPreset]?.label || selectedPreset;
                  const existingCount = savedResults.filter(r => r.label.startsWith(label)).length;
                  const uniqueLabel = existingCount > 0 ? `${label} #${existingCount + 1}` : label;
                  setSavedResults(prev => [...prev.slice(-4), { label: uniqueLabel, result }]);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors"
                title="Save this result for comparison"
              >
                💾 Save Result
              </button>
            )}
            {savedResults.length >= 2 && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showComparison
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📊 Compare ({savedResults.length})
              </button>
            )}
            {/* Generate Story button */}
            {result && !running && (
              <button
                onClick={() => {
                  const generated = generateSocietyNarrative(result);
                  setNarrative(generated);
                  setShowNarrative(true);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors"
                title="Generate a narrative story from this simulation"
              >
                📖 Generate Story
              </button>
            )}
          </div>
        </div>

        {/* Strategy Legend */}
        <div className="mb-4 flex flex-wrap gap-3">
          {(Object.entries(STRATEGY_LABELS) as [StrategyType, string][]).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STRATEGY_COLORS[key] }} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Comparison Panel */}
        {showComparison && savedResults.length >= 2 && (
          <ComparisonPanel
            savedResults={savedResults}
            onRemove={(index) => setSavedResults(prev => prev.filter((_, i) => i !== index))}
            onClose={() => setShowComparison(false)}
          />
        )}

        {/* Narrative Panel */}
        {showNarrative && narrative && (
          <NarrativePanel
            narrative={narrative}
            onClose={() => setShowNarrative(false)}
          />
        )}

        {/* Main Content */}
        {(agents.length > 0 || result) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left: Network + Metrics */}
            <div>
              {/* Network Graph */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-400">Trust Network</h3>
                  {running && (
                    <span className="text-xs text-green-400 animate-pulse">
                      Epoch {currentEpoch + 1}
                    </span>
                  )}
                </div>
                <NetworkGraph
                  agents={agents}
                  coalitions={coalitions}
                  selectedAgentId={selectedAgentId}
                  onSelectAgent={(id) => {
                    setSelectedAgentId(id);
                    // Only trigger ACT query when selecting an agent (not deselecting)
                    if (id !== null) {
                      setAgentClickTrigger(t => t + 1);
                    }
                  }}
                  interactions={interactions}
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Click an agent to learn about them. Lines show trust relationships.
                </p>
              </div>

              {/* Strategy Distribution */}
              {metrics && (
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 mb-4">
                  <h3 className="text-sm font-bold text-gray-400 mb-2">Strategy Distribution</h3>
                  <StrategyBar distribution={metrics.strategyDistribution} />
                </div>
              )}

              {/* Metrics History */}
              {metricsHistory.length >= 2 && (
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-sm font-bold text-gray-400 mb-2">Trust &amp; Cooperation Over Time</h3>
                  <MetricsChart history={metricsHistory} />
                </div>
              )}
            </div>

            {/* Right: Metrics + Events + Inspector */}
            <div className="space-y-4">
              {/* Metrics */}
              {metrics && (
                <MetricsDashboard
                  metrics={metrics}
                  epoch={currentEpoch}
                  totalEpochs={buildConfig().numEpochs || DEFAULT_SOCIETY_CONFIG.numEpochs}
                />
              )}

              {/* Epoch Navigator (for completed runs) */}
              {result && !running && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showEpoch(currentEpoch - 1)}
                    disabled={currentEpoch === 0}
                    className="px-3 py-1 bg-gray-700 rounded text-sm disabled:opacity-30"
                  >
                    Prev
                  </button>
                  <span className="text-sm text-gray-400">
                    Epoch {currentEpoch + 1} / {result.epochs.length}
                  </span>
                  <button
                    onClick={() => showEpoch(currentEpoch + 1)}
                    disabled={currentEpoch >= result.epochs.length - 1}
                    className="px-3 py-1 bg-gray-700 rounded text-sm disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Agent Inspector */}
              {selectedAgent && (
                <AgentInspector agent={selectedAgent} allAgents={agents} />
              )}

              {/* Events */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h3 className="text-sm font-bold text-gray-400 mb-2">Society Events</h3>
                <EventFeed events={events} />
              </div>
            </div>
          </div>
        )}

        {/* No simulation yet */}
        {agents.length === 0 && !result && (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">
              <svg className="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="none">
                <circle cx="20" cy="24" r="6" fill="#22c55e" opacity="0.6" />
                <circle cx="44" cy="24" r="6" fill="#ef4444" opacity="0.6" />
                <circle cx="32" cy="44" r="6" fill="#3b82f6" opacity="0.6" />
                <line x1="20" y1="24" x2="44" y2="24" stroke="#4b5563" strokeWidth="1" />
                <line x1="20" y1="24" x2="32" y2="44" stroke="#4b5563" strokeWidth="1" />
                <line x1="44" y1="24" x2="32" y2="44" stroke="#4b5563" strokeWidth="1" />
              </svg>
            </div>
            <p className="text-lg mb-2">Select a scenario and click <strong>Run Society</strong></p>
            <p className="text-sm">Watch agents form trust networks, build coalitions, and self-organize</p>
          </div>
        )}

        {/* Explanation Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2" style={{ color: STRATEGY_COLORS.cooperator }}>Strategies</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><strong className="text-green-400">Cooperator:</strong> Always cooperates. Trusting but exploitable.</li>
              <li><strong className="text-red-400">Defector:</strong> Always defects. Short-term gains, long-term isolation.</li>
              <li><strong className="text-blue-400">Reciprocator:</strong> Tit-for-tat. Mirrors what you did last time.</li>
              <li><strong className="text-amber-400">Cautious:</strong> Only cooperates after trust is established.</li>
              <li><strong className="text-purple-400">Adaptive:</strong> Cooperates in proportion to how much they trust you.</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2 text-blue-400">What to Watch For</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><strong>Coalition formation:</strong> Trust clusters emerge as cooperators find each other</li>
              <li><strong>Defector isolation:</strong> Agents who exploit lose trust and get excluded</li>
              <li><strong>Cooperation cascades:</strong> Once trust forms, cooperation accelerates</li>
              <li><strong>Inequality:</strong> Does wealth (ATP) concentrate or distribute?</li>
              <li><strong>Network density:</strong> How connected is the trust network?</li>
            </ul>
          </div>

          <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2 text-amber-400">Why This Matters</h3>
            <p className="text-sm text-gray-400 mb-2">
              Web4 proposes that <strong>trust replaces authority</strong> as the organizing
              principle of digital societies. This simulator shows why that works:
            </p>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>&bull; Trust creates structure without permission</li>
              <li>&bull; Exploiters get isolated without punishment</li>
              <li>&bull; Cooperation emerges from self-interest</li>
              <li>&bull; Karma ensures consequences persist across lifetimes</li>
            </ul>
          </div>
        </div>

        <ExplorerNav currentPath="/society-simulator" />

        {/* ACT Chat Panel */}
        <ACTChatPanel
          agents={agents}
          coalitions={coalitions}
          metrics={metrics}
          events={events}
          selectedAgentId={selectedAgentId}
          result={result}
          currentEpoch={currentEpoch}
          isOpen={actPanelOpen}
          onToggle={() => setActPanelOpen(!actPanelOpen)}
          agentClickTrigger={agentClickTrigger}
        />

        {/* Narrative Panel */}
        {showNarrative && narrative && (
          <NarrativePanel
            narrative={narrative}
            onClose={() => setShowNarrative(false)}
          />
        )}
      </div>
    </div>
  );
}
