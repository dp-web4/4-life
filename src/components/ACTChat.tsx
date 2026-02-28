'use client';

/**
 * ACT Guided Explorer
 *
 * Interactive Q&A explorer for simulation concepts.
 * Uses pattern-matched queries with pre-generated explanations — not AI chat.
 *
 * Features:
 * - Clickable topic buttons for guided exploration
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
      content: "Welcome to the ACT Guided Explorer! I can help you understand Web4 simulation concepts.\n\nChoose a topic below to get started, or click any suggestion that appears after an explanation.",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuery = (queryText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date()
    };

    const query: Query = {
      text: queryText,
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

    setMessages(prev => [...prev, userMessage, assistantMessage]);
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
            <h3 className="text-lg font-semibold text-white">Guided Explorer</h3>
            <p className="text-sm text-gray-400">Explore simulation concepts</p>
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
                  <p className="text-xs text-gray-400 mb-2">Explore further:</p>
                  <div className="flex flex-wrap gap-2">
                    {message.response.suggestedQueries.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuery(query)}
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
                        onClick={() => handleQuery(`Explain ${concept}`)}
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

        <div ref={messagesEndRef} />
      </div>

      {/* Topic buttons */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Choose a topic:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleQuery("What is ATP?")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            What is ATP?
          </button>
          <button
            onClick={() => handleQuery("Explain trust tensors")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            Explain trust
          </button>
          <button
            onClick={() => handleQuery("How does karma work?")}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded text-gray-300 transition-colors"
          >
            Karma explained
          </button>
          {moments && moments.length > 0 ? (
            <button
              onClick={() => handleQuery("What's the most interesting moment?")}
              className="text-xs px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-700/50 rounded text-purple-300 transition-colors"
            >
              Most interesting moment
            </button>
          ) : (
            <button
              onClick={() => handleQuery("What should I explore next?")}
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
