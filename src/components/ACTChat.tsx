'use client';

/**
 * ACT Conversational Interface
 *
 * Natural language interaction with simulation understanding.
 * Philosophy: Conversation beats static docs for learning.
 *
 * Features:
 * - Pattern-matched query understanding
 * - Pre-generated explanations (reliable, fast)
 * - Context-aware responses (simulation data)
 * - Suggested follow-up queries
 * - Related concept links
 * - Visualization hints
 */

import { useState, useRef, useEffect } from 'react';
import { queryEngine, type Query, type Response } from '@/lib/act/query_engine';
import type { SimulationResult } from '@/lib/types';
import type { Moment } from '@/lib/moments/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: Response;
  timestamp: Date;
}

interface ACTChatProps {
  simulation?: SimulationResult;
  comparisonSimulation?: SimulationResult;
  selectedTick?: number;
  selectedLife?: number;
  onVisualizationRequest?: (type: string) => void;
  moments?: Moment[];  // Session #42: Moment-aware queries
  selectedMoment?: Moment;  // Currently focused moment
}

export default function ACTChat({
  simulation,
  comparisonSimulation,
  selectedTick,
  selectedLife,
  onVisualizationRequest,
  moments,
  selectedMoment,
}: ACTChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm ACT (Accessible Coordination Technology), your guide to understanding Web4 simulations.\n\nI can help you explore what's happening in simulations, explain concepts, and guide your learning.\n\nTry asking: \"What is ATP?\" or \"Run a simulation\" or just describe what you're curious about!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    // Process query
    setTimeout(() => {
      const query: Query = {
        text: userMessage.content,
        type: 'general',
        context: {
          simulation,
          comparisonSimulation,
          selectedTick,
          selectedLife,
          moments,
          selectedMoment,
        }
      };

      const response = queryEngine.processQuery(query);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 300); // Small delay for UX feel
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleRelatedConcept = (concept: string) => {
    setInput(`Explain ${concept}`);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            ACT
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Conversational Guide</h3>
            <p className="text-sm text-gray-400">Ask me anything about simulations</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}
            >
              {/* Message content */}
              <div className="prose prose-invert prose-sm max-w-none">
                {message.content.split('\n').map((line, i) => {
                  // Parse markdown-style bold
                  const parts = line.split(/(\*\*.*?\*\*)/g);
                  return (
                    <p key={i} className="mb-2 last:mb-0">
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                      })}
                    </p>
                  );
                })}
              </div>

              {/* Suggested queries */}
              {message.response?.suggestedQueries && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.response.suggestedQueries.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedQuery(query)}
                        className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-200 transition-colors"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related concepts */}
              {message.response?.relatedConcepts && message.response.relatedConcepts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Related concepts:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.response.relatedConcepts.map((concept, i) => (
                      <button
                        key={i}
                        onClick={() => handleRelatedConcept(concept)}
                        className="text-xs px-2 py-1 bg-purple-900/30 hover:bg-purple-800/40 border border-purple-700/50 rounded text-purple-300 transition-colors"
                      >
                        {concept}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Visualization hint */}
              {message.response?.visualizationHint && onVisualizationRequest && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={() => onVisualizationRequest(message.response!.visualizationHint!)}
                    className="text-xs px-3 py-1.5 bg-green-900/30 hover:bg-green-800/40 border border-green-700/50 rounded text-green-300 transition-colors"
                  >
                    📊 View {message.response.visualizationHint.replace('_', ' ')}
                  </button>
                </div>
              )}

              {/* Timestamp */}
              <div className="mt-2 text-xs text-gray-500">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-800 border border-gray-700">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything about simulations..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="px-6 py-2 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all"
          >
            Send
          </button>
        </form>

        {/* Quick actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => handleSuggestedQuery("What is ATP?")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            What is ATP?
          </button>
          <button
            onClick={() => handleSuggestedQuery("Explain trust tensors")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            Explain trust
          </button>
          <button
            onClick={() => handleSuggestedQuery("How does karma work?")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            Karma explained
          </button>
          {moments && moments.length > 0 ? (
            <button
              onClick={() => handleSuggestedQuery("What's the most interesting moment?")}
              className="text-xs px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-700/50 rounded text-purple-300 transition-colors"
            >
              Most interesting moment
            </button>
          ) : (
            <button
              onClick={() => handleSuggestedQuery("What should I explore next?")}
              className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
            >
              What next?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
