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

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import HumanPlayerMode from '@/components/HumanPlayerMode';
import NetworkGraph from '@/components/NetworkGraph';
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
  generateComparativeNarrative,
  analyzeRelationships,
  generateCharacterJourney,
  generateShareableContent,
  getShareUrl,
  generateQuickSummary,
  type SocietyNarrative,
  type ComparativeNarrative,
  type CharacterProfile,
  type CharacterHighlight,
  type KeyMoment,
  type RelationshipMap,
  type CharacterRelationship,
  type RelationshipType,
  type CharacterJourney,
  type SharePlatform,
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

// NetworkGraph extracted to @/components/NetworkGraph.tsx for reuse in HumanPlayerMode

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
        label="Round"
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
        detail="wealth gap between agents"
      />
      <MetricCard
        label="Network"
        value={`${Math.round(metrics.networkDensity * 100)}%`}
        color="text-purple-400"
        detail="how connected agents are"
      />
      <MetricCard
        label="Rebirths"
        value={`${metrics.totalGenerations}`}
        color="text-amber-400"
        detail="agents died and were reborn"
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
    human: 'You - making real decisions about trust and cooperation.',
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
          <span className="text-xs text-amber-400">Rebirth {agent.generation - 1}</span>
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
  onCompareStories,
}: {
  savedResults: { label: string; result: SocietyResult }[];
  onRemove: (index: number) => void;
  onClose: () => void;
  onCompareStories: () => void;
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

      {/* Compare Stories Button */}
      <div className="mt-4 pt-3 border-t border-gray-700 text-center">
        <button
          onClick={onCompareStories}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors"
        >
          📖 Compare Stories
        </button>
        <p className="text-xs text-gray-500 mt-1">
          Generate a narrative explaining these differences
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Story Bar Component (Animated Narrative Playback)
// ============================================================================

interface StoryPosition {
  chapterIndex: number;
  eventIndex: number; // -1 for chapter opening, >= 0 for events, Infinity for closing
}

function StoryBar({
  narrative,
  onClose,
  onPositionChange,
  highlightedAgentIds,
}: {
  narrative: SocietyNarrative;
  onClose: () => void;
  onPositionChange: (epoch: number | null, agentIds: number[]) => void;
  highlightedAgentIds: number[];
}) {
  const [position, setPosition] = useState<StoryPosition>({ chapterIndex: 0, eventIndex: -1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get current content based on position
  const getCurrentContent = useCallback(() => {
    const chapter = narrative.chapters[position.chapterIndex];
    if (!chapter) return null;

    if (position.eventIndex === -1) {
      // Chapter opening
      return {
        type: 'opening' as const,
        title: `Chapter ${chapter.number}: ${chapter.title}`,
        text: chapter.opening,
        epoch: chapter.epochRange?.start,
        agentIds: [] as number[],
      };
    } else if (position.eventIndex < chapter.events.length) {
      // Event
      const event = chapter.events[position.eventIndex];
      return {
        type: 'event' as const,
        title: `Chapter ${chapter.number}: ${chapter.title}`,
        text: event.description,
        quote: event.quote,
        significance: event.significance,
        epoch: event.epoch,
        agentIds: event.agentIds || [],
      };
    } else if (chapter.closing) {
      // Chapter closing
      return {
        type: 'closing' as const,
        title: `Chapter ${chapter.number}: ${chapter.title}`,
        text: chapter.closing,
        epoch: chapter.epochRange?.end,
        agentIds: [] as number[],
      };
    }
    return null;
  }, [narrative, position]);

  // Calculate total steps in the narrative
  const getTotalSteps = useCallback(() => {
    let total = 0;
    for (const chapter of narrative.chapters) {
      total += 1; // opening
      total += chapter.events.length; // events
      if (chapter.closing) total += 1; // closing
    }
    return total;
  }, [narrative]);

  // Get current step index (for progress bar)
  const getCurrentStep = useCallback(() => {
    let step = 0;
    for (let i = 0; i < position.chapterIndex; i++) {
      const ch = narrative.chapters[i];
      step += 1 + ch.events.length + (ch.closing ? 1 : 0);
    }
    step += position.eventIndex + 1; // +1 because -1 is opening
    if (position.eventIndex === Infinity) {
      const ch = narrative.chapters[position.chapterIndex];
      step += ch.events.length + 1;
    }
    return step;
  }, [narrative, position]);

  // Navigate to next position
  const goNext = useCallback(() => {
    const chapter = narrative.chapters[position.chapterIndex];
    if (!chapter) return;

    if (position.eventIndex === -1) {
      // From opening -> first event or closing
      if (chapter.events.length > 0) {
        setPosition({ chapterIndex: position.chapterIndex, eventIndex: 0 });
      } else if (chapter.closing) {
        setPosition({ chapterIndex: position.chapterIndex, eventIndex: Infinity });
      } else {
        // No events or closing, go to next chapter
        if (position.chapterIndex < narrative.chapters.length - 1) {
          setPosition({ chapterIndex: position.chapterIndex + 1, eventIndex: -1 });
        } else {
          setIsPlaying(false); // End of story
        }
      }
    } else if (position.eventIndex < chapter.events.length - 1) {
      // Next event
      setPosition({ chapterIndex: position.chapterIndex, eventIndex: position.eventIndex + 1 });
    } else if (position.eventIndex === chapter.events.length - 1) {
      // Last event -> closing or next chapter
      if (chapter.closing) {
        setPosition({ chapterIndex: position.chapterIndex, eventIndex: Infinity });
      } else if (position.chapterIndex < narrative.chapters.length - 1) {
        setPosition({ chapterIndex: position.chapterIndex + 1, eventIndex: -1 });
      } else {
        setIsPlaying(false); // End of story
      }
    } else {
      // From closing -> next chapter
      if (position.chapterIndex < narrative.chapters.length - 1) {
        setPosition({ chapterIndex: position.chapterIndex + 1, eventIndex: -1 });
      } else {
        setIsPlaying(false); // End of story
      }
    }
  }, [narrative, position]);

  // Navigate to previous position
  const goPrev = useCallback(() => {
    if (position.eventIndex === Infinity) {
      // From closing -> last event or opening
      const chapter = narrative.chapters[position.chapterIndex];
      if (chapter.events.length > 0) {
        setPosition({ chapterIndex: position.chapterIndex, eventIndex: chapter.events.length - 1 });
      } else {
        setPosition({ chapterIndex: position.chapterIndex, eventIndex: -1 });
      }
    } else if (position.eventIndex > 0) {
      // Previous event
      setPosition({ chapterIndex: position.chapterIndex, eventIndex: position.eventIndex - 1 });
    } else if (position.eventIndex === 0) {
      // First event -> opening
      setPosition({ chapterIndex: position.chapterIndex, eventIndex: -1 });
    } else if (position.chapterIndex > 0) {
      // From opening -> previous chapter's closing/last event/opening
      const prevChapter = narrative.chapters[position.chapterIndex - 1];
      if (prevChapter.closing) {
        setPosition({ chapterIndex: position.chapterIndex - 1, eventIndex: Infinity });
      } else if (prevChapter.events.length > 0) {
        setPosition({ chapterIndex: position.chapterIndex - 1, eventIndex: prevChapter.events.length - 1 });
      } else {
        setPosition({ chapterIndex: position.chapterIndex - 1, eventIndex: -1 });
      }
    }
  }, [narrative, position]);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        goNext();
      }, 5000); // 5 seconds per step
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, goNext]);

  // Notify parent of position changes for epoch sync and agent highlighting
  useEffect(() => {
    const content = getCurrentContent();
    if (content) {
      onPositionChange(content.epoch ?? null, content.agentIds);
    }
  }, [position, getCurrentContent, onPositionChange]);

  const content = getCurrentContent();
  const totalSteps = getTotalSteps();
  const currentStep = getCurrentStep();
  const progressPercent = (currentStep / totalSteps) * 100;

  if (!content) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-amber-500/30 z-40 backdrop-blur-sm">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold text-sm">{content.title}</span>
            {content.epoch !== undefined && (
              <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                Round {content.epoch + 1}
              </span>
            )}
            {content.type === 'event' && highlightedAgentIds.length > 0 && (
              <span className="text-xs text-gray-400">
                {highlightedAgentIds.length} agent{highlightedAgentIds.length !== 1 ? 's' : ''} highlighted
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
            title="Close story bar"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-gray-200 text-sm leading-relaxed">{content.text}</p>
          {content.type === 'event' && content.quote && (
            <p className="text-gray-400 italic text-xs mt-1 pl-3 border-l border-amber-500/50">
              {content.quote}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              disabled={position.chapterIndex === 0 && position.eventIndex === -1}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-1 rounded text-sm transition-colors ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={goNext}
              disabled={position.chapterIndex === narrative.chapters.length - 1 &&
                (position.eventIndex === Infinity ||
                 (!narrative.chapters[position.chapterIndex].closing &&
                  position.eventIndex === narrative.chapters[position.chapterIndex].events.length - 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              Next →
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const quickSummary = generateQuickSummary(narrative);
                const siteUrl = 'https://4-life-ivory.vercel.app/society-simulator';
                const text = `${quickSummary}\n\n${siteUrl}\n\n#Web4 #TrustDynamics`;
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
              }}
              className="text-xs px-2 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded transition-colors flex items-center gap-1"
              title="Share to Twitter/X"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share
            </button>
            <div className="text-xs text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Relationship Graph Component
// ============================================================================

function RelationshipGraph({
  relationships,
  characters,
}: {
  relationships: RelationshipMap;
  characters: CharacterProfile[];
}) {
  const width = 500;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;

  // Get unique characters from relationships
  const charSet = new Set<string>();
  relationships.relationships.forEach(r => {
    charSet.add(r.character1);
    charSet.add(r.character2);
  });
  const chars = Array.from(charSet);

  // Position characters in a circle
  const positions = new Map<string, { x: number; y: number }>();
  chars.forEach((char, i) => {
    const angle = (2 * Math.PI * i) / chars.length - Math.PI / 2;
    const radius = Math.min(width, height) * 0.35;
    positions.set(char, {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    });
  });

  const getPos = (name: string) => positions.get(name) || { x: cx, y: cy };

  // Color mapping for relationship types
  const EDGE_COLORS: Record<RelationshipType, string> = {
    allies: '#22c55e',
    rivals: '#ef4444',
    exploiter: '#a855f7',
    victim: '#f97316',
    rebuilding: '#3b82f6',
    strangers: '#6b7280',
  };

  // Get character profile
  const getProfile = (name: string) => characters.find(c => c.name === name);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg mx-auto">
        {/* Relationship edges */}
        {relationships.relationships.map((rel, i) => {
          const from = getPos(rel.character1);
          const to = getPos(rel.character2);
          const color = EDGE_COLORS[rel.type];
          const avgTrust = (rel.trustLevel + rel.reverseTrustLevel) / 2;

          return (
            <g key={`rel-${i}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={color}
                strokeWidth={Math.max(1, avgTrust * 4)}
                strokeOpacity={0.6}
                strokeDasharray={rel.type === 'strangers' ? '4 4' : undefined}
              />
              {/* Arrowhead for exploiter/victim relationships */}
              {(rel.type === 'exploiter' || rel.type === 'victim') && (
                <polygon
                  points={calculateArrowhead(from, to)}
                  fill={color}
                  opacity={0.8}
                />
              )}
            </g>
          );
        })}

        {/* Character nodes */}
        {chars.map((char, i) => {
          const pos = getPos(char);
          const profile = getProfile(char);
          const color = profile ? STRATEGY_COLORS[profile.strategy] : '#6b7280';

          return (
            <g key={`char-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={16}
                fill={color}
                stroke="#1f2937"
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {char[0]}
              </text>
              <text
                x={pos.x}
                y={pos.y + 32}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="10"
              >
                {char}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {(['allies', 'rivals', 'exploiter', 'rebuilding'] as RelationshipType[]).map(type => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-4 h-1 rounded"
              style={{ backgroundColor: EDGE_COLORS[type] }}
            />
            <span className="text-xs text-gray-400 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Calculate arrowhead points for directed edges
function calculateArrowhead(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return '';

  // Normalize
  const nx = dx / len;
  const ny = dy / len;

  // Arrow position (near the target, accounting for node radius)
  const arrowLen = 8;
  const nodeRadius = 16;
  const ax = to.x - nx * (nodeRadius + arrowLen);
  const ay = to.y - ny * (nodeRadius + arrowLen);

  // Perpendicular vector
  const px = -ny;
  const py = nx;

  // Arrow points
  const p1 = `${ax},${ay}`;
  const p2 = `${ax - nx * arrowLen + px * arrowLen / 2},${ay - ny * arrowLen + py * arrowLen / 2}`;
  const p3 = `${ax - nx * arrowLen - px * arrowLen / 2},${ay - ny * arrowLen - py * arrowLen / 2}`;

  return `${p1} ${p2} ${p3}`;
}

// ============================================================================
// Character Focus Modal Component
// ============================================================================

function CharacterFocusModal({
  journey,
  onClose,
  strategyColors,
}: {
  journey: CharacterJourney;
  onClose: () => void;
  strategyColors: Record<string, string>;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'relationships' | 'stats'>('overview');

  const STATUS_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
    thriving: { bg: 'bg-green-900/30', text: 'text-green-400', icon: '🌟' },
    surviving: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', icon: '⚖️' },
    struggling: { bg: 'bg-orange-900/30', text: 'text-orange-400', icon: '⚠️' },
    dead: { bg: 'bg-red-900/30', text: 'text-red-400', icon: '💀' },
  };

  const RELATIONSHIP_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
    allies: { bg: 'bg-green-900/30', text: 'text-green-400', icon: '🤝' },
    rivals: { bg: 'bg-red-900/30', text: 'text-red-400', icon: '⚔️' },
    exploiter: { bg: 'bg-purple-900/30', text: 'text-purple-400', icon: '🦊' },
    victim: { bg: 'bg-orange-900/30', text: 'text-orange-400', icon: '🐑' },
    rebuilding: { bg: 'bg-blue-900/30', text: 'text-blue-400', icon: '🔄' },
    strangers: { bg: 'bg-gray-800/50', text: 'text-gray-400', icon: '👥' },
  };

  const EVENT_STYLES: Record<string, { bg: string; border: string }> = {
    coalition: { bg: 'bg-blue-900/30', border: 'border-blue-500' },
    isolation: { bg: 'bg-purple-900/30', border: 'border-purple-500' },
    death: { bg: 'bg-red-900/30', border: 'border-red-500' },
    rebirth: { bg: 'bg-amber-900/30', border: 'border-amber-500' },
    trust_change: { bg: 'bg-green-900/30', border: 'border-green-500' },
    status_change: { bg: 'bg-yellow-900/30', border: 'border-yellow-500' },
    interaction: { bg: 'bg-gray-800/50', border: 'border-gray-600' },
  };

  const statusStyle = STATUS_STYLES[journey.finalStatus];

  // Mini sparkline component
  const Sparkline = ({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) => {
    if (data.length < 2) return null;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const w = 200;
    const h = height;

    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="fixed inset-4 md:inset-8 bg-gray-900 border border-sky-500/30 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-gray-700 bg-gradient-to-r from-sky-900/30 to-indigo-900/30">
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
            style={{ backgroundColor: strategyColors[journey.strategy] }}
          >
            {journey.name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{journey.name}</h2>
            <p className="text-sky-200/70 text-sm">{journey.archetype} • {journey.personality}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyle.bg} ${statusStyle.text}`}>
                {statusStyle.icon} {journey.finalStatus}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400">
                {journey.strategy}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl px-2"
        >
          ×
        </button>
      </div>

      {/* Tagline */}
      <div className="px-6 py-3 bg-gray-800/50 border-b border-gray-700">
        <p className="text-gray-300 italic text-center">&ldquo;{journey.tagline}&rdquo;</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 overflow-x-auto">
        {(['overview', 'timeline', 'relationships', 'stats'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gray-800 text-sky-400 border-b-2 border-sky-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab === 'overview' && '📖 Story'}
            {tab === 'timeline' && '📅 Timeline'}
            {tab === 'relationships' && '💞 Relationships'}
            {tab === 'stats' && '📊 Stats'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Story Arc */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-3">The Journey</h3>
              <p className="text-gray-300 leading-relaxed">{journey.storyArc}</p>
            </div>

            {/* Character Quote */}
            <div className="bg-gradient-to-r from-sky-900/20 to-indigo-900/20 rounded-lg p-6 border border-sky-500/30">
              <div className="flex items-start gap-4">
                <span className="text-4xl text-sky-400">&ldquo;</span>
                <div>
                  <p className="text-white text-lg italic leading-relaxed">{journey.quote}</p>
                  <p className="text-sky-400 text-sm mt-2">— {journey.name}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-xs text-gray-400 mb-1">Final ATP</div>
                <div className={`text-2xl font-bold ${journey.finalStats.atp > 100 ? 'text-green-400' : journey.finalStats.atp > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {Math.round(journey.finalStats.atp)}
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-xs text-gray-400 mb-1">Reputation</div>
                <div className={`text-2xl font-bold ${journey.finalStats.reputation > 0.6 ? 'text-green-400' : journey.finalStats.reputation > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {(journey.finalStats.reputation * 100).toFixed(0)}%
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-xs text-gray-400 mb-1">Cooperation</div>
                <div className={`text-2xl font-bold ${journey.finalStats.cooperationRate > 0.6 ? 'text-green-400' : journey.finalStats.cooperationRate > 0.4 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {(journey.finalStats.cooperationRate * 100).toFixed(0)}%
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-xs text-gray-400 mb-1">Coalition</div>
                <div className={`text-2xl font-bold ${journey.finalStats.coalitionSize > 2 ? 'text-blue-400' : 'text-gray-400'}`}>
                  {journey.finalStats.coalitionSize}
                </div>
              </div>
            </div>

            {/* Lesson Learned */}
            <div className="bg-amber-900/20 rounded-lg p-6 border border-amber-500/30">
              <h3 className="text-lg font-bold text-amber-400 mb-2">💡 The Lesson</h3>
              <p className="text-gray-300 leading-relaxed">{journey.lessonLearned}</p>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-3xl mx-auto">
            {journey.timeline.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">No major events recorded</p>
                <p className="text-sm">{journey.name} had a relatively quiet journey through the simulation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Timeline visualization */}
                <div className="relative pl-8">
                  {/* Vertical line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-700" />

                  {journey.timeline.map((event, i) => {
                    const eventStyle = EVENT_STYLES[event.type] || EVENT_STYLES.interaction;
                    return (
                      <div key={i} className="relative mb-6 last:mb-0">
                        {/* Timeline dot */}
                        <div className={`absolute -left-5 w-4 h-4 rounded-full border-2 ${eventStyle.border} bg-gray-900`} />

                        {/* Event card */}
                        <div className={`${eventStyle.bg} rounded-lg p-4 border ${eventStyle.border}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-white">{event.title}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                                Round {event.epoch + 1}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                event.significance === 'high' ? 'bg-red-900/50 text-red-300' :
                                event.significance === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                                'bg-gray-800 text-gray-400'
                              }`}>
                                {event.significance}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'relationships' && (
          <div className="max-w-3xl mx-auto">
            {journey.relationships.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">No significant relationships</p>
                <p className="text-sm">{journey.name} remained a stranger to most in this society.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Trust balance overview */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Trust Balance</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Trust Given</div>
                      <div className={`text-2xl font-bold ${journey.finalStats.trustGiven > 0.5 ? 'text-green-400' : 'text-gray-400'}`}>
                        {(journey.finalStats.trustGiven * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden relative">
                        <div
                          className="absolute left-0 h-full bg-blue-500 rounded-l-full"
                          style={{ width: `${journey.finalStats.trustGiven * 50}%` }}
                        />
                        <div
                          className="absolute right-0 h-full bg-green-500 rounded-r-full"
                          style={{ width: `${journey.finalStats.trustReceived * 50}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>← Given</span>
                        <span>Received →</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-400">Trust Received</div>
                      <div className={`text-2xl font-bold ${journey.finalStats.trustReceived > 0.5 ? 'text-green-400' : 'text-gray-400'}`}>
                        {(journey.finalStats.trustReceived * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Relationship list */}
                {journey.relationships.map((rel, i) => {
                  const relStyle = RELATIONSHIP_STYLES[rel.type];
                  return (
                    <div
                      key={i}
                      className={`${relStyle.bg} rounded-lg p-4 border border-gray-700`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{relStyle.icon}</span>
                          <span className="font-bold text-white">{rel.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${relStyle.bg} ${relStyle.text} border border-current/30`}>
                            {rel.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-gray-400">
                            <span className="text-blue-400">{(rel.trustGiven * 100).toFixed(0)}%</span> → {rel.name}
                          </span>
                          <span className="text-gray-400">
                            {rel.name} → <span className="text-green-400">{(rel.trustReceived * 100).toFixed(0)}%</span>
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{rel.narrative}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Trust History */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Trust Over Time</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Sparkline
                    data={journey.trustHistory.map(h => h.avgTrust)}
                    color="#3b82f6"
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">
                    {(journey.trustHistory[journey.trustHistory.length - 1]?.avgTrust * 100 || 0).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-400">Final Avg Trust</div>
                </div>
              </div>
            </div>

            {/* ATP History */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Resources (ATP) Over Time</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Sparkline
                    data={journey.atpHistory.map(h => h.atp)}
                    color="#22c55e"
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(journey.atpHistory[journey.atpHistory.length - 1]?.atp || 0)}
                  </div>
                  <div className="text-xs text-gray-400">Final ATP</div>
                </div>
              </div>
            </div>

            {/* Reputation History */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Reputation Over Time</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Sparkline
                    data={journey.reputationHistory.map(h => h.reputation)}
                    color="#a855f7"
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-400">
                    {((journey.reputationHistory[journey.reputationHistory.length - 1]?.reputation || 0) * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-400">Final Reputation</div>
                </div>
              </div>
            </div>

            {/* Summary Stats Table */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Final Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Strategy</div>
                  <div className="text-lg font-bold text-white capitalize">{journey.strategy}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Final Status</div>
                  <div className={`text-lg font-bold capitalize ${STATUS_STYLES[journey.finalStatus].text}`}>
                    {journey.finalStatus}
                  </div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Cooperation Rate</div>
                  <div className="text-lg font-bold text-white">{(journey.finalStats.cooperationRate * 100).toFixed(1)}%</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Coalition Size</div>
                  <div className="text-lg font-bold text-white">{journey.finalStats.coalitionSize} members</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Key Events</div>
                  <div className="text-lg font-bold text-white">{journey.timeline.length}</div>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Relationships</div>
                  <div className="text-lg font-bold text-white">{journey.relationships.length}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Character Journey • {journey.name}&apos;s story in this society
        </p>
        <button
          onClick={onClose}
          className="text-sm px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Narrative Panel Component
// ============================================================================

// ============================================================================
// Relationship Timeline Scrubber Component
// ============================================================================

interface RelationshipTimelineData {
  epoch: number;
  relationships: {
    agent1Name: string;
    agent2Name: string;
    trust1to2: number;
    trust2to1: number;
  }[];
}

function RelationshipTimelineScrubber({
  result,
}: {
  result: SocietyResult;
}) {
  const [currentEpoch, setCurrentEpoch] = useState(result.epochs.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPair, setSelectedPair] = useState<{ agent1: string; agent2: string } | null>(null);
  const playRef = useRef<NodeJS.Timeout | null>(null);

  const epochs = result.epochs;
  const totalEpochs = epochs.length;

  // Build relationship data for each epoch
  const timelineData = useMemo(() => {
    const data: RelationshipTimelineData[] = [];
    for (let i = 0; i < epochs.length; i++) {
      const epoch = epochs[i];
      const rels: RelationshipTimelineData['relationships'] = [];

      for (const agent of epoch.agents) {
        for (const edge of agent.trustEdges) {
          const targetAgent = epoch.agents.find(a => a.id === edge.targetId);
          if (targetAgent && agent.id < targetAgent.id) { // Avoid duplicates
            const reverseEdge = targetAgent.trustEdges.find(e => e.targetId === agent.id);
            rels.push({
              agent1Name: agent.name,
              agent2Name: targetAgent.name,
              trust1to2: edge.trust,
              trust2to1: reverseEdge?.trust ?? 0.5,
            });
          }
        }
      }

      data.push({ epoch: i, relationships: rels });
    }
    return data;
  }, [epochs]);

  // Get unique agent pairs
  const allPairs = useMemo(() => {
    const pairSet = new Set<string>();
    const pairs: { agent1: string; agent2: string }[] = [];
    for (const epochData of timelineData) {
      for (const rel of epochData.relationships) {
        const key = `${rel.agent1Name}|${rel.agent2Name}`;
        if (!pairSet.has(key)) {
          pairSet.add(key);
          pairs.push({ agent1: rel.agent1Name, agent2: rel.agent2Name });
        }
      }
    }
    return pairs;
  }, [timelineData]);

  // Current epoch data
  const currentData = timelineData[currentEpoch];

  // Auto-play logic
  useEffect(() => {
    if (isPlaying) {
      playRef.current = setInterval(() => {
        setCurrentEpoch(prev => {
          if (prev >= totalEpochs - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playRef.current) {
        clearInterval(playRef.current);
        playRef.current = null;
      }
    }
    return () => {
      if (playRef.current) clearInterval(playRef.current);
    };
  }, [isPlaying, totalEpochs]);

  // Get trust evolution for selected pair
  const selectedPairHistory = useMemo(() => {
    if (!selectedPair) return null;
    return timelineData.map(epochData => {
      const rel = epochData.relationships.find(
        r => (r.agent1Name === selectedPair.agent1 && r.agent2Name === selectedPair.agent2) ||
             (r.agent1Name === selectedPair.agent2 && r.agent2Name === selectedPair.agent1)
      );
      if (!rel) return { epoch: epochData.epoch, trust1: 0.5, trust2: 0.5 };
      return {
        epoch: epochData.epoch,
        trust1: rel.agent1Name === selectedPair.agent1 ? rel.trust1to2 : rel.trust2to1,
        trust2: rel.agent1Name === selectedPair.agent1 ? rel.trust2to1 : rel.trust1to2,
      };
    });
  }, [selectedPair, timelineData]);

  // Mini sparkline
  const TrustSparkline = ({ data, color }: { data: number[]; color: string }) => {
    if (data.length < 2) return null;
    const w = 120;
    const h = 30;
    const max = 1;
    const min = 0;

    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    }).join(' ');

    // Current position marker
    const currX = (currentEpoch / (data.length - 1)) * w;
    const currY = h - ((data[currentEpoch] - min) / (max - min)) * h;

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          strokeOpacity={0.5}
        />
        <circle cx={currX} cy={currY} r={4} fill={color} />
      </svg>
    );
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">🕐 Relationship Timeline</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentEpoch(0)}
            disabled={currentEpoch === 0}
            className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-30 rounded"
          >
            ⏮
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1 text-xs rounded ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={() => setCurrentEpoch(totalEpochs - 1)}
            disabled={currentEpoch === totalEpochs - 1}
            className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 disabled:opacity-30 rounded"
          >
            ⏭
          </button>
        </div>
      </div>

      {/* Scrubber */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 w-16">Round {currentEpoch + 1}</span>
          <input
            type="range"
            min={0}
            max={totalEpochs - 1}
            value={currentEpoch}
            onChange={(e) => setCurrentEpoch(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-sm text-gray-400 w-10">/ {totalEpochs}</span>
        </div>
      </div>

      {/* Pair Selection */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-1 block">Watch a relationship evolve:</label>
        <select
          value={selectedPair ? `${selectedPair.agent1}|${selectedPair.agent2}` : ''}
          onChange={(e) => {
            if (e.target.value) {
              const [a1, a2] = e.target.value.split('|');
              setSelectedPair({ agent1: a1, agent2: a2 });
            } else {
              setSelectedPair(null);
            }
          }}
          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">Select a pair...</option>
          {allPairs.map((pair, i) => (
            <option key={i} value={`${pair.agent1}|${pair.agent2}`}>
              {pair.agent1} ↔ {pair.agent2}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Pair Evolution */}
      {selectedPair && selectedPairHistory && (
        <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-white">
              {selectedPair.agent1} ↔ {selectedPair.agent2}
            </h4>
            <button
              onClick={() => setSelectedPair(null)}
              className="text-gray-500 hover:text-white text-sm"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">
                {selectedPair.agent1} → {selectedPair.agent2}
              </div>
              <TrustSparkline
                data={selectedPairHistory.map(h => h.trust1)}
                color="#3b82f6"
              />
              <div className="text-center text-lg font-bold text-blue-400">
                {(selectedPairHistory[currentEpoch].trust1 * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">
                {selectedPair.agent2} → {selectedPair.agent1}
              </div>
              <TrustSparkline
                data={selectedPairHistory.map(h => h.trust2)}
                color="#22c55e"
              />
              <div className="text-center text-lg font-bold text-green-400">
                {(selectedPairHistory[currentEpoch].trust2 * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Epoch Relationship Snapshot */}
      <div>
        <h4 className="text-sm font-bold text-gray-400 mb-2">Relationships at Round {currentEpoch + 1}</h4>
        <div className="max-h-48 overflow-y-auto space-y-1">
          {currentData?.relationships.slice(0, 10).map((rel, i) => {
            const avgTrust = (rel.trust1to2 + rel.trust2to1) / 2;
            let color = 'bg-gray-600';
            if (avgTrust > 0.7) color = 'bg-green-600';
            else if (avgTrust > 0.5) color = 'bg-blue-600';
            else if (avgTrust < 0.3) color = 'bg-red-600';

            return (
              <div
                key={i}
                onClick={() => setSelectedPair({ agent1: rel.agent1Name, agent2: rel.agent2Name })}
                className="flex items-center gap-2 p-2 bg-gray-900/50 rounded cursor-pointer hover:bg-gray-800"
              >
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-sm text-white flex-1">{rel.agent1Name} ↔ {rel.agent2Name}</span>
                <span className="text-xs text-blue-400">{(rel.trust1to2 * 100).toFixed(0)}%</span>
                <span className="text-xs text-gray-500">↔</span>
                <span className="text-xs text-green-400">{(rel.trust2to1 * 100).toFixed(0)}%</span>
              </div>
            );
          })}
          {(currentData?.relationships.length ?? 0) > 10 && (
            <div className="text-xs text-gray-500 text-center py-1">
              +{currentData!.relationships.length - 10} more
            </div>
          )}
        </div>
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
  onAnimate,
  relationships,
  onCharacterClick,
  simulationResult,
}: {
  narrative: SocietyNarrative;
  onClose: () => void;
  onAnimate?: () => void;
  relationships?: RelationshipMap;
  onCharacterClick?: (name: string) => void;
  simulationResult?: SocietyResult;
}) {
  const [activeTab, setActiveTab] = useState<'story' | 'characters' | 'moments' | 'relationships'>('story');
  const [relationshipViewMode, setRelationshipViewMode] = useState<'list' | 'graph' | 'timeline'>('list');

  const STATUS_COLORS: Record<CharacterProfile['finalStatus'], string> = {
    thriving: 'text-green-400',
    surviving: 'text-yellow-400',
    struggling: 'text-orange-400',
    dead: 'text-red-400',
  };

  const RELATIONSHIP_COLORS: Record<RelationshipType, { bg: string; text: string; icon: string }> = {
    allies: { bg: 'bg-green-900/30', text: 'text-green-400', icon: '🤝' },
    rivals: { bg: 'bg-red-900/30', text: 'text-red-400', icon: '⚔️' },
    exploiter: { bg: 'bg-purple-900/30', text: 'text-purple-400', icon: '🦊' },
    victim: { bg: 'bg-orange-900/30', text: 'text-orange-400', icon: '🐑' },
    rebuilding: { bg: 'bg-blue-900/30', text: 'text-blue-400', icon: '🔄' },
    strangers: { bg: 'bg-gray-800/50', text: 'text-gray-400', icon: '👥' },
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
      <div className="flex border-b border-gray-700 overflow-x-auto">
        {(['story', 'characters', 'moments', ...(relationships ? ['relationships'] : [])] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gray-800 text-amber-400 border-b-2 border-amber-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab === 'story' && '📖 Story'}
            {tab === 'characters' && '👥 Characters'}
            {tab === 'moments' && '⚡ Key Moments'}
            {tab === 'relationships' && '💞 Relationships'}
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

            {/* Protagonist & Antagonist */}
            {(narrative.protagonist || narrative.antagonist) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {narrative.protagonist && (
                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🦸</span>
                      <h4 className="font-bold text-green-400">The Hero</h4>
                    </div>
                    <p className="text-lg font-bold text-white mb-1">{narrative.protagonist.name}</p>
                    <p className="text-sm text-gray-400 mb-3">{narrative.protagonist.reason}</p>
                    <p className="text-gray-300 italic text-sm border-l-2 border-green-500/50 pl-3">
                      &ldquo;{narrative.protagonist.quote}&rdquo;
                    </p>
                  </div>
                )}
                {narrative.antagonist && (
                  <div className="bg-gradient-to-br from-red-900/30 to-rose-900/20 rounded-lg p-4 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🦹</span>
                      <h4 className="font-bold text-red-400">The Antagonist</h4>
                    </div>
                    <p className="text-lg font-bold text-white mb-1">{narrative.antagonist.name}</p>
                    <p className="text-sm text-gray-400 mb-3">{narrative.antagonist.reason}</p>
                    <p className="text-gray-300 italic text-sm border-l-2 border-red-500/50 pl-3">
                      &ldquo;{narrative.antagonist.quote}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}

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
          <div className="max-w-4xl mx-auto">
            {onCharacterClick && (
              <p className="text-sm text-gray-400 mb-4 text-center">
                Click a character to explore their complete journey
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {narrative.characters.map((character, i) => (
                <div
                  key={i}
                  onClick={() => onCharacterClick?.(character.name)}
                  className={`bg-gray-800/50 rounded-lg p-4 border border-gray-700 transition-colors ${
                    onCharacterClick
                      ? 'cursor-pointer hover:border-sky-500/50 hover:bg-gray-800 group'
                      : 'hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: STRATEGY_COLORS[character.strategy] }}
                      >
                        {character.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-sky-400 transition-colors">{character.name}</h4>
                        <p className="text-xs text-gray-400">
                          {character.archetype} • <span className={STATUS_COLORS[character.finalStatus]}>{character.finalStatus}</span>
                        </p>
                      </div>
                    </div>
                    {onCharacterClick && (
                      <span className="text-gray-600 group-hover:text-sky-400 transition-colors text-sm">→</span>
                    )}
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
                      Round {moment.epoch}
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

        {activeTab === 'relationships' && relationships && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Relationship Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center">
                <div className="text-2xl font-bold text-white">{relationships.stats.totalRelationships}</div>
                <div className="text-xs text-gray-400">Total Relationships</div>
              </div>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-700/30 text-center">
                <div className="text-2xl font-bold text-green-400">{relationships.stats.allyPairs}</div>
                <div className="text-xs text-gray-400">Ally Pairs</div>
              </div>
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-700/30 text-center">
                <div className="text-2xl font-bold text-red-400">{relationships.stats.rivalPairs}</div>
                <div className="text-xs text-gray-400">Rival Pairs</div>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/30 text-center">
                <div className="text-2xl font-bold text-purple-400">{relationships.stats.exploitationPairs}</div>
                <div className="text-xs text-gray-400">Exploitation Pairs</div>
              </div>
            </div>

            {/* Notable Relationships */}
            {(relationships.strongestAlliance || relationships.bitterestRivalry || relationships.mostDramaticBetrayal) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relationships.strongestAlliance && (
                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🤝</span>
                      <h4 className="font-bold text-green-400 text-sm">Strongest Alliance</h4>
                    </div>
                    <p className="text-white font-medium">
                      {relationships.strongestAlliance.character1} & {relationships.strongestAlliance.character2}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {relationships.strongestAlliance.mutualCooperations} cooperations
                    </p>
                  </div>
                )}
                {relationships.bitterestRivalry && (
                  <div className="bg-gradient-to-br from-red-900/30 to-rose-900/20 rounded-lg p-4 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⚔️</span>
                      <h4 className="font-bold text-red-400 text-sm">Bitterest Rivalry</h4>
                    </div>
                    <p className="text-white font-medium">
                      {relationships.bitterestRivalry.character1} vs {relationships.bitterestRivalry.character2}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {relationships.bitterestRivalry.mutualDefections} mutual defections
                    </p>
                  </div>
                )}
                {relationships.mostDramaticBetrayal && (
                  <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🗡️</span>
                      <h4 className="font-bold text-purple-400 text-sm">Most Dramatic Betrayal</h4>
                    </div>
                    <p className="text-white font-medium">
                      {relationships.mostDramaticBetrayal.character1} & {relationships.mostDramaticBetrayal.character2}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {Math.max(relationships.mostDramaticBetrayal.exploitations, relationships.mostDramaticBetrayal.wasExploited)} exploitation{Math.max(relationships.mostDramaticBetrayal.exploitations, relationships.mostDramaticBetrayal.wasExploited) !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* All Relationships with View Toggle */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">All Relationships</h3>
                <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setRelationshipViewMode('list')}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      relationshipViewMode === 'list'
                        ? 'bg-amber-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    📋 List
                  </button>
                  <button
                    onClick={() => setRelationshipViewMode('graph')}
                    className={`px-3 py-1 text-xs rounded transition-colors ${
                      relationshipViewMode === 'graph'
                        ? 'bg-amber-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🕸️ Graph
                  </button>
                  {simulationResult && (
                    <button
                      onClick={() => setRelationshipViewMode('timeline')}
                      className={`px-3 py-1 text-xs rounded transition-colors ${
                        relationshipViewMode === 'timeline'
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🕐 Timeline
                    </button>
                  )}
                </div>
              </div>

              {/* Graph View */}
              {relationshipViewMode === 'graph' && (
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <RelationshipGraph
                    relationships={relationships}
                    characters={narrative.characters}
                  />
                </div>
              )}

              {/* Timeline View */}
              {relationshipViewMode === 'timeline' && simulationResult && (
                <RelationshipTimelineScrubber result={simulationResult} />
              )}

              {/* List View */}
              {relationshipViewMode === 'list' && (
              <div className="space-y-3">
                {relationships.relationships.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No significant relationships found.</p>
                ) : (
                  relationships.relationships.map((rel, i) => {
                    const colors = RELATIONSHIP_COLORS[rel.type];
                    return (
                      <div
                        key={i}
                        className={`${colors.bg} rounded-lg p-4 border border-gray-700/50`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">{colors.icon}</span>
                              <span className="font-bold text-white">{rel.character1}</span>
                              <span className="text-gray-500">&</span>
                              <span className="font-bold text-white">{rel.character2}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border border-current/30`}>
                                {rel.type}
                              </span>
                              {rel.inSameCoalition && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 border border-blue-500/30">
                                  coalition
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{rel.narrative}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                              <span>Interactions: {rel.interactionCount}</span>
                              <span className="text-green-400">Coops: {rel.mutualCooperations}</span>
                              <span className="text-red-400">Defects: {rel.mutualDefections}</span>
                              <span>Trust: {(rel.trustLevel * 100).toFixed(0)}% ↔ {(rel.reverseTrustLevel * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          {/* Mini trust visualization */}
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-12 h-12 rounded-full border-2 border-gray-600 relative flex items-center justify-center">
                              <div
                                className="absolute inset-1 rounded-full"
                                style={{
                                  background: `conic-gradient(
                                    ${rel.type === 'allies' ? '#22c55e' : rel.type === 'rivals' ? '#ef4444' : '#a855f7'} ${((rel.trustLevel + rel.reverseTrustLevel) / 2) * 100}%,
                                    #374151 0%
                                  )`,
                                }}
                              />
                              <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  {Math.round(((rel.trustLevel + rel.reverseTrustLevel) / 2) * 100)}%
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] text-gray-500">avg trust</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Generated by 4-Life Narrative Engine • Translating trust dynamics into human stories
        </p>
        <div className="flex items-center gap-2">
          {onAnimate && (
            <button
              onClick={onAnimate}
              className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
            >
              ▶ Animate Story
            </button>
          )}
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
            📋 Copy
          </button>
          <button
            onClick={() => {
              // Export as polished blog post
              const lines = [
                `# ${narrative.title}`,
                '',
                `> *${narrative.tagline}*`,
                '',
                '---',
                '',
                narrative.summary,
                '',
              ];

              // Hero & Antagonist section
              if (narrative.protagonist || narrative.antagonist) {
                lines.push('## The Cast');
                lines.push('');
                if (narrative.protagonist) {
                  lines.push(`### 🦸 The Hero: ${narrative.protagonist.name}`);
                  lines.push('');
                  lines.push(narrative.protagonist.reason);
                  lines.push('');
                  lines.push(`> "${narrative.protagonist.quote}"`);
                  lines.push('');
                }
                if (narrative.antagonist) {
                  lines.push(`### 🦹 The Antagonist: ${narrative.antagonist.name}`);
                  lines.push('');
                  lines.push(narrative.antagonist.reason);
                  lines.push('');
                  lines.push(`> "${narrative.antagonist.quote}"`);
                  lines.push('');
                }
              }

              // Story chapters
              lines.push('## The Story');
              lines.push('');
              narrative.chapters.forEach(ch => {
                lines.push(`### Chapter ${ch.number}: ${ch.title}`);
                lines.push('');
                lines.push(ch.opening);
                lines.push('');
                ch.events.forEach(e => {
                  lines.push(`**${e.description}**`);
                  if (e.quote) lines.push(`> ${e.quote}`);
                  lines.push(`*${e.significance}*`);
                  lines.push('');
                });
                if (ch.closing) lines.push(`*${ch.closing}*`);
                lines.push('');
              });

              // Key moments
              if (narrative.keyMoments.length > 0) {
                lines.push('## Key Moments');
                lines.push('');
                narrative.keyMoments.forEach(m => {
                  lines.push(`- **${m.title}** (Round ${m.epoch}): ${m.description}`);
                });
                lines.push('');
              }

              // Character roster
              lines.push('## Character Roster');
              lines.push('');
              lines.push('| Character | Strategy | Status | Story Arc |');
              lines.push('|-----------|----------|--------|-----------|');
              narrative.characters.forEach(c => {
                lines.push(`| ${c.name} | ${c.archetype} | ${c.finalStatus} | ${c.arc.slice(0, 60)}... |`);
              });
              lines.push('');

              // Relationships (if available)
              if (relationships) {
                lines.push('## Key Relationships');
                lines.push('');
                if (relationships.strongestAlliance) {
                  lines.push(`🤝 **Strongest Alliance**: ${relationships.strongestAlliance.character1} & ${relationships.strongestAlliance.character2} — ${relationships.strongestAlliance.mutualCooperations} cooperations`);
                  lines.push('');
                }
                if (relationships.bitterestRivalry) {
                  lines.push(`⚔️ **Bitterest Rivalry**: ${relationships.bitterestRivalry.character1} vs ${relationships.bitterestRivalry.character2} — ${relationships.bitterestRivalry.mutualDefections} mutual defections`);
                  lines.push('');
                }
                if (relationships.mostDramaticBetrayal) {
                  lines.push(`🗡️ **Most Dramatic Betrayal**: ${relationships.mostDramaticBetrayal.character1} & ${relationships.mostDramaticBetrayal.character2}`);
                  lines.push('');
                }
              }

              // Moral and footer
              lines.push('---');
              lines.push('');
              lines.push('## The Moral');
              lines.push('');
              lines.push(`> ${narrative.moralOfTheStory}`);
              lines.push('');
              lines.push('---');
              lines.push('');
              lines.push(`**Themes**: ${narrative.themes.join(' • ')}`);
              lines.push('');
              lines.push('*Generated by [4-Life Society Simulator](https://4-life-ivory.vercel.app/society-simulator) — Where trust shapes the rules of emergence.*');

              const text = lines.join('\n');
              const blob = new Blob([text], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${narrative.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="text-sm px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded transition-colors"
          >
            📄 Download Blog Post
          </button>
          {/* Share Divider */}
          <div className="h-6 w-px bg-gray-600 mx-1" />
          {/* Social Share Buttons */}
          <ShareButtons narrative={narrative} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Social Share Buttons Component
// ============================================================================

function ShareButtons({ narrative }: { narrative: SocietyNarrative }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const siteUrl = 'https://4-life-ivory.vercel.app/society-simulator';

  const handleShare = (platform: SharePlatform) => {
    const content = generateShareableContent(narrative, platform, siteUrl);

    if (platform === 'clipboard') {
      navigator.clipboard.writeText(content.text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const shareUrl = getShareUrl(content);
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const handleQuickTweet = () => {
    const quickSummary = generateQuickSummary(narrative);
    const text = `${quickSummary}\n\n${siteUrl}\n\n#Web4 #TrustDynamics`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {/* Quick Tweet Button */}
        <button
          onClick={handleQuickTweet}
          className="text-sm px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded transition-colors flex items-center gap-1"
          title="Quick share to Twitter/X"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Share
        </button>

        {/* More Share Options */}
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="text-sm px-2 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
          title="More sharing options"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* Share Menu Dropdown */}
      {showShareMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden min-w-[200px]">
            <div className="p-2 border-b border-gray-700 text-xs text-gray-400 font-medium">
              Share this story
            </div>
            <button
              onClick={() => handleShare('twitter')}
              className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-3"
            >
              <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter / X
            </button>
            <button
              onClick={() => handleShare('bluesky')}
              className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-3"
            >
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 568 501" fill="currentColor">
                <path d="M123.121 33.664C188.241 82.553 258.281 181.681 284 234.873C309.719 181.681 379.759 82.553 444.879 33.664C491.866-1.612 568-28.906 568 57.947C568 75.292 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.564C287.384 382.878 287.145 382.212 284 374.399C280.855 382.212 280.616 382.878 280.369 383.564C266.939 422.461 214.527 576.312 94.667 453.32C31.556 388.56 60.778 323.8 175.653 304.249C109.933 315.434 36.053 296.954 15.778 224.501C9.945 203.659 0 75.292 0 57.947C0-28.906 76.134-1.612 123.121 33.664Z" />
              </svg>
              Bluesky
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-3"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <div className="border-t border-gray-700" />
            <button
              onClick={() => handleShare('clipboard')}
              className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-3"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {copied ? 'Copied!' : 'Copy Summary'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// Comparative Narrative Panel Component
// ============================================================================

function ComparativeNarrativePanel({
  narrative,
  onClose,
}: {
  narrative: ComparativeNarrative;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center overflow-auto p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-3xl my-8 overflow-hidden border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800">
          <div>
            <h2 className="text-xl font-bold text-amber-400">{narrative.title}</h2>
            <p className="text-sm text-gray-400 mt-1">Comparative Analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const lines: string[] = [];
                lines.push(`# ${narrative.title}`);
                lines.push('');
                lines.push(narrative.introduction);
                lines.push('');
                lines.push('## Scenarios');
                narrative.scenarios.forEach(s => {
                  lines.push(`### ${s.name} (${s.outcome})`);
                  lines.push(s.summary);
                  lines.push(`**Key:** ${s.keyDifference}`);
                  lines.push('');
                });
                lines.push('## Comparison');
                narrative.comparison.forEach(c => {
                  lines.push(`### ${c.aspect}`);
                  lines.push(c.findings);
                  if (c.winner) lines.push(`*Winner: ${c.winner}*`);
                  lines.push('');
                });
                lines.push('## Key Insights');
                narrative.insights.forEach(i => lines.push(`- ${i}`));
                lines.push('');
                lines.push('## Conclusion');
                lines.push(narrative.conclusion);

                const text = lines.join('\n');
                navigator.clipboard.writeText(text).then(() => {
                  alert('Comparative narrative copied to clipboard!');
                }).catch(() => {
                  const blob = new Blob([text], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'comparative-narrative.md';
                  a.click();
                  URL.revokeObjectURL(url);
                });
              }}
              className="text-sm px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded transition-colors"
            >
              📋 Export
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Introduction */}
          <p className="text-gray-300 mb-6 leading-relaxed">{narrative.introduction}</p>

          {/* Scenarios */}
          <h3 className="text-lg font-bold text-white mb-4">The Scenarios</h3>
          <div className="grid gap-4 mb-6">
            {narrative.scenarios.map((scenario, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border ${
                  scenario.outcome === 'triumph' ? 'bg-green-900/20 border-green-700/50' :
                  scenario.outcome === 'tragedy' ? 'bg-red-900/20 border-red-700/50' :
                  'bg-gray-800 border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">{scenario.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scenario.outcome === 'triumph' ? 'bg-green-700 text-green-200' :
                    scenario.outcome === 'tragedy' ? 'bg-red-700 text-red-200' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {scenario.outcome}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{scenario.summary}</p>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Key:</strong> {scenario.keyDifference}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <h3 className="text-lg font-bold text-white mb-4">How They Differ</h3>
          <div className="space-y-4 mb-6">
            {narrative.comparison.map((comp, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-amber-400">{comp.aspect}</span>
                  {comp.winner && (
                    <span className="text-xs text-green-400">Winner: {comp.winner}</span>
                  )}
                </div>
                <p className="text-sm text-gray-300">{comp.findings}</p>
              </div>
            ))}
          </div>

          {/* Insights */}
          <h3 className="text-lg font-bold text-white mb-4">Key Insights</h3>
          <ul className="space-y-2 mb-6">
            {narrative.insights.map((insight, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span className="text-gray-300 text-sm">{insight}</span>
              </li>
            ))}
          </ul>

          {/* Conclusion */}
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-amber-400 mb-2">Conclusion</h3>
            <p className="text-gray-200 leading-relaxed">{narrative.conclusion}</p>
          </div>
        </div>
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
  const [narrativeRelationships, setNarrativeRelationships] = useState<RelationshipMap | null>(null);
  const [showNarrative, setShowNarrative] = useState(false);
  const [showStoryBar, setShowStoryBar] = useState(false);
  const [storyHighlightedAgents, setStoryHighlightedAgents] = useState<number[]>([]);
  const [comparativeNarrative, setComparativeNarrative] = useState<ComparativeNarrative | null>(null);
  const [showComparativeNarrative, setShowComparativeNarrative] = useState(false);
  const [characterJourney, setCharacterJourney] = useState<CharacterJourney | null>(null);
  const [showCharacterFocus, setShowCharacterFocus] = useState(false);
  const [humanPlayerMode, setHumanPlayerMode] = useState(false);
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

  // If human player mode is active, show that instead
  if (humanPlayerMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <Breadcrumbs currentPath="/society-simulator" />
          <HumanPlayerMode onExit={() => setHumanPlayerMode(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Breadcrumbs currentPath="/society-simulator" />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">Society Simulator</h1>
              <p className="text-lg text-gray-400 max-w-3xl">
                You saw how one agent builds trust. Now watch 12 agents with different strategies
                form alliances, betray each other, and self-organize — no central authority,
                just trust dynamics at society scale.
              </p>
            </div>
            <button
              onClick={() => setHumanPlayerMode(true)}
              className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-teal-900/30"
            >
              🎮 Play as Agent
            </button>
          </div>
        </div>

        {/* Web4 Connection */}
        <div className="mb-4 bg-emerald-900/20 border border-emerald-800 rounded-lg p-4">
          <h2 className="text-base font-bold mb-2 text-emerald-400">How This Demonstrates Web4</h2>
          <p className="text-gray-300 text-sm mb-2">
            Each agent has <strong>ATP</strong> (attention budget) and a <strong>Trust Tensor</strong> (reputation).
            Actions cost ATP. Cooperation builds trust. Defection may win short-term but gets isolated.
            Watch how trust-based economics create stable cooperation <em>without moderators</em>.
          </p>
          <p className="text-xs text-gray-500">
            New to Web4? Start with <a href="/first-contact" className="text-emerald-400 hover:underline">First Contact</a> — a 10-minute guided introduction.
          </p>
        </div>

        {/* Key Insight */}
        <div className="mb-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">The Core Question</h2>
          <p className="text-gray-300 text-sm">
            Can a society of self-interested agents develop cooperation, trust, and social structure
            <em> without any central authority</em>? In Web4, the answer is yes &mdash; if trust
            is the fundamental currency. Click <strong>Run</strong> to watch it happen, or{' '}
            <button
              onClick={() => setHumanPlayerMode(true)}
              className="text-teal-400 hover:text-teal-300 underline"
            >
              play as an agent yourself
            </button>
            .
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-sm text-gray-400">Scenario:</label>
            {Object.entries(SOCIETY_PRESETS)
              .filter(([key]) => !key.startsWith('human-'))  // Filter out human player presets
              .map(([key, preset]) => (
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
                <label className="text-xs text-gray-400 block mb-1">Rounds: {customEpochs}</label>
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
                  const rels = analyzeRelationships(result);
                  setNarrative(generated);
                  setNarrativeRelationships(rels);
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
            onCompareStories={() => {
              const generated = generateComparativeNarrative(savedResults);
              setComparativeNarrative(generated);
              setShowComparativeNarrative(true);
            }}
          />
        )}

        {/* Narrative Panel */}
        {showNarrative && narrative && (
          <NarrativePanel
            narrative={narrative}
            relationships={narrativeRelationships || undefined}
            simulationResult={result || undefined}
            onClose={() => setShowNarrative(false)}
            onAnimate={() => {
              setShowNarrative(false);
              setShowStoryBar(true);
            }}
            onCharacterClick={(name) => {
              if (result) {
                const journey = generateCharacterJourney(result, name);
                if (journey) {
                  setCharacterJourney(journey);
                  setShowCharacterFocus(true);
                }
              }
            }}
          />
        )}

        {/* Character Focus Modal */}
        {showCharacterFocus && characterJourney && (
          <CharacterFocusModal
            journey={characterJourney}
            onClose={() => setShowCharacterFocus(false)}
            strategyColors={STRATEGY_COLORS}
          />
        )}

        {/* Comparative Narrative Panel */}
        {showComparativeNarrative && comparativeNarrative && (
          <ComparativeNarrativePanel
            narrative={comparativeNarrative}
            onClose={() => setShowComparativeNarrative(false)}
          />
        )}

        {/* Story Bar (Animated Narrative) */}
        {showStoryBar && narrative && result && (
          <StoryBar
            narrative={narrative}
            onClose={() => {
              setShowStoryBar(false);
              setStoryHighlightedAgents([]);
            }}
            onPositionChange={(epoch, agentIds) => {
              if (epoch !== null && result) {
                showEpoch(epoch);
              }
              setStoryHighlightedAgents(agentIds);
            }}
            highlightedAgentIds={storyHighlightedAgents}
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
                      Round {currentEpoch + 1}
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
                  highlightedAgentIds={storyHighlightedAgents}
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
                    Round {currentEpoch + 1} / {result.epochs.length}
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

              {/* Continue Your Journey - shown after simulation completes */}
              {result && !running && (
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50 mt-4">
                  <h3 className="text-sm font-bold text-gray-400 mb-2">Continue Exploring</h3>
                  <div className="flex flex-wrap gap-2">
                    <a href="/playground" className="text-xs px-3 py-1.5 bg-sky-900/40 text-sky-400 rounded hover:bg-sky-900/60 transition-colors">
                      Playground — tweak parameters yourself
                    </a>
                    <a href="/learn" className="text-xs px-3 py-1.5 bg-emerald-900/40 text-emerald-400 rounded hover:bg-emerald-900/60 transition-colors">
                      Learn — deeper into Web4 concepts
                    </a>
                    <a href="/trust-networks" className="text-xs px-3 py-1.5 bg-purple-900/40 text-purple-400 rounded hover:bg-purple-900/60 transition-colors">
                      Trust Networks — explore relationship dynamics
                    </a>
                  </div>
                </div>
              )}
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

      </div>
    </div>
  );
}
