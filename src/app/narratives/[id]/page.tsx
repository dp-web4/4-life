'use client';

/**
 * Individual Narrative Viewer
 *
 * Display a single narrative with full details, visual timeline,
 * export options, and navigation between narratives.
 */

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { Narrative } from '@/lib/narratives/story_generator';
import { NarrativeExporter, ExportFormat } from '@/lib/narratives/narrative_exporter';
import { EventDetector } from '@/lib/narratives/event_detector';
import NarrativeTimeline from '@/components/NarrativeTimeline';
import Breadcrumbs from '@/components/Breadcrumbs';

interface NarrativeIndexEntry {
  id: string;
  title: string;
  type?: string;
  source_simulation?: string;
}

export default function NarrativeViewerPage() {
  const params = useParams();
  const narrativeId = params?.id as string;

  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(true);
  const [showCommentary, setShowCommentary] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeAct, setActiveAct] = useState(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'acts'>('timeline');

  // Simulation data for timeline
  const [simulationLives, setSimulationLives] = useState<any[] | null>(null);
  const [simulationEvents, setSimulationEvents] = useState<any[] | null>(null);
  const [indexEntry, setIndexEntry] = useState<NarrativeIndexEntry | null>(null);

  // Adjacent narratives for navigation
  const [prevNarrative, setPrevNarrative] = useState<NarrativeIndexEntry | null>(null);
  const [nextNarrative, setNextNarrative] = useState<NarrativeIndexEntry | null>(null);

  useEffect(() => {
    if (!narrativeId) return;

    // Load narrative JSON
    fetch(`/narratives/${narrativeId}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Narrative not found');
        return res.json();
      })
      .then(data => {
        setNarrative(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load narrative:', err);
        setError(`Failed to load narrative "${narrativeId}". It may not exist yet.`);
        setLoading(false);
      });

    // Load index to find source simulation and neighbors
    fetch('/narratives/index.json')
      .then(res => res.json())
      .then((entries: NarrativeIndexEntry[]) => {
        const idx = entries.findIndex(e => e.id === narrativeId);
        if (idx >= 0) {
          setIndexEntry(entries[idx]);
          if (idx > 0) setPrevNarrative(entries[idx - 1]);
          if (idx < entries.length - 1) setNextNarrative(entries[idx + 1]);

          // Load source simulation for timeline
          const sourceFile = (entries[idx] as any).source_simulation;
          if (sourceFile) {
            fetch(`/${sourceFile}`)
              .then(res => res.ok ? res.json() : null)
              .then(simData => {
                if (!simData) return;

                // Extract lives from different formats
                let rawLives: any[] = [];
                if (Array.isArray(simData.lives)) rawLives = simData.lives;
                else if (simData.multi_life?.lives) rawLives = simData.multi_life.lives;

                // Normalize life records
                const lives = rawLives.map((raw: any, i: number) => {
                  let startTick = raw.start_tick;
                  let endTick = raw.end_tick;
                  if (startTick === undefined) {
                    const duration = raw.duration_ticks || raw.t3_history?.length || 20;
                    startTick = i === 0 ? 0 : rawLives.slice(0, i).reduce((sum: number, l: any) =>
                      sum + (l.duration_ticks || l.t3_history?.length || 20), 0);
                    endTick = startTick + duration;
                  }

                  let agentLct = raw.agent_lct || simData.agent_lct;
                  if (!agentLct && raw.life_id) {
                    const match = raw.life_id.match(/(lct:web4:agent:\w+)/);
                    if (match) agentLct = match[1];
                  }

                  return {
                    life_id: raw.life_id || `life:${i + 1}`,
                    agent_lct: agentLct || 'lct:web4:agent:agent',
                    start_tick: startTick ?? 0,
                    end_tick: endTick ?? 20,
                    life_state: raw.life_state || raw.state || 'completed',
                    termination_reason: raw.termination_reason || 'none',
                    t3_history: raw.t3_history || [],
                    atp_history: raw.atp_history || [],
                  };
                });

                if (lives.length > 0 && lives.some((l: any) => l.t3_history.length > 0)) {
                  setSimulationLives(lives);
                  const detector = new EventDetector();
                  const events = detector.detectEvents(lives);
                  setSimulationEvents(events);
                }
              })
              .catch(() => { /* Timeline optional - fail silently */ });
          }
        }
      })
      .catch(() => { /* Index optional */ });
  }, [narrativeId]);

  const handleExport = (format: ExportFormat) => {
    if (!narrative) return;

    const exporter = new NarrativeExporter();
    const content = exporter.export(narrative, {
      format,
      includeTechnicalDetails: showTechnical,
      includeCommentary: showCommentary
    });

    const filename = NarrativeExporter.generateFilename(narrative, format);

    const mimeTypes = {
      [ExportFormat.MARKDOWN]: 'text/markdown',
      [ExportFormat.JSON]: 'application/json',
      [ExportFormat.PLAIN_TEXT]: 'text/plain',
      [ExportFormat.HTML]: 'text/html'
    };

    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = async () => {
    if (!narrative) return;

    const exporter = new NarrativeExporter();
    const content = exporter.export(narrative, {
      format: ExportFormat.MARKDOWN,
      includeTechnicalDetails: showTechnical,
      includeCommentary: showCommentary
    });

    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">...</div>
          <div className="text-xl text-gray-400">Loading narrative...</div>
        </div>
      </div>
    );
  }

  if (error || !narrative) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto p-8">
          <Breadcrumbs currentPath="/narratives" />
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Narrative Not Found</h1>
            <p className="text-gray-400 mb-6">
              {error || `The narrative "${narrativeId}" could not be loaded.`}
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/lab-console"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Generate in Lab Console
              </Link>
              <Link
                href="/narratives"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                Browse Narratives
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8">
        <Breadcrumbs currentPath={`/narratives/${narrativeId}`} />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start gap-3 mb-2">
            {indexEntry?.type && (
              <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full mt-2">
                {indexEntry.type}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-3">{narrative.title}</h1>
          <div className="flex flex-wrap gap-2">
            {narrative.themes.map(theme => (
              <span
                key={theme}
                className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-5">
          <p className="text-gray-300 leading-relaxed">{narrative.summary}</p>
        </div>

        {/* Key Insights */}
        {narrative.key_insights.length > 0 && (
          <div className="mb-6 bg-yellow-900/20 border border-yellow-800 rounded-lg p-5">
            <h2 className="text-lg font-bold mb-3">Key Insights</h2>
            <ul className="space-y-2">
              {narrative.key_insights.map((insight, i) => (
                <li key={i} className="flex gap-3 text-gray-300 text-sm">
                  <span className="text-yellow-400 mt-0.5">*</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Visual Timeline (if simulation data available) */}
        {simulationLives && simulationEvents && (
          <div className="mb-8">
            <NarrativeTimeline
              lives={simulationLives}
              events={simulationEvents}
              narrative={narrative}
              height={340}
              showATP={true}
            />
          </div>
        )}

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {narrative.acts.map((act, i) => (
              <button
                key={i}
                onClick={() => { setActiveAct(i); setViewMode('acts'); }}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  viewMode === 'acts' && activeAct === i
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {act.title.split(':')[0]}
              </button>
            ))}
          </div>

          <div className="flex gap-2 text-xs">
            <label className="flex items-center gap-1.5 text-gray-400">
              <input
                type="checkbox"
                checked={showTechnical}
                onChange={e => setShowTechnical(e.target.checked)}
                className="rounded"
              />
              Technical
            </label>
            <label className="flex items-center gap-1.5 text-gray-400">
              <input
                type="checkbox"
                checked={showCommentary}
                onChange={e => setShowCommentary(e.target.checked)}
                className="rounded"
              />
              Commentary
            </label>
          </div>
        </div>

        {/* Narrative Acts */}
        <div className="space-y-6">
          {narrative.acts.map((act, actIndex) => (
            <div
              key={actIndex}
              className={`bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all ${
                viewMode === 'acts' && activeAct !== actIndex ? 'hidden' : ''
              }`}
            >
              <h2 className="text-xl font-bold mb-5 text-gray-100">{act.title}</h2>

              <div className="space-y-5">
                {act.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="border-l-4 border-blue-600 pl-4">
                    <div className="text-blue-400 font-mono text-xs mb-1.5">
                      {event.timestamp}
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-2 text-sm">
                      {event.description}
                    </p>

                    {showTechnical && event.technical_detail && (
                      <div className="bg-gray-900 rounded p-2.5 mb-2 text-xs text-gray-400">
                        <strong className="text-gray-300">Technical:</strong> {event.technical_detail}
                      </div>
                    )}

                    <div className="bg-yellow-900/20 rounded p-2.5 text-xs text-yellow-200">
                      <strong>Why it matters:</strong> {event.significance}
                    </div>
                  </div>
                ))}
              </div>

              {showCommentary && act.commentary && (
                <div className="mt-5 bg-gray-900 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Commentary</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{act.commentary}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Export */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-400">Export</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleExport(ExportFormat.MARKDOWN)}
                className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                Markdown
              </button>
              <button
                onClick={() => handleExport(ExportFormat.HTML)}
                className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                HTML
              </button>
              <button
                onClick={() => handleExport(ExportFormat.JSON)}
                className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                JSON
              </button>
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Markdown'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <div>
            {prevNarrative ? (
              <Link
                href={`/narratives/${prevNarrative.id}`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                &larr; {prevNarrative.title?.split('—')[0]?.trim() || 'Previous'}
              </Link>
            ) : (
              <Link
                href="/narratives"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                &larr; All Narratives
              </Link>
            )}
          </div>
          <div>
            {nextNarrative ? (
              <Link
                href={`/narratives/${nextNarrative.id}`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {nextNarrative.title?.split('—')[0]?.trim() || 'Next'} &rarr;
              </Link>
            ) : (
              <Link
                href="/lab-console"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Generate More &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
