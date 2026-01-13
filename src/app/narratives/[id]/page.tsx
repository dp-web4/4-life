'use client';

/**
 * Individual Narrative Viewer
 *
 * Display a single narrative with full details, export options, and sharing
 */

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Narrative } from '@/lib/narratives/story_generator';
import { NarrativeExporter, ExportFormat } from '@/lib/narratives/narrative_exporter';

export default function NarrativeViewerPage() {
  const params = useParams();
  const router = useRouter();
  const narrativeId = params?.id as string;

  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(true);
  const [showCommentary, setShowCommentary] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!narrativeId) return;

    // TODO: Load narrative from API
    // For now, show error or redirect to generate
    setLoading(false);
    setError('Narrative loading from API not yet implemented. Generate narratives in the Lab Console.');
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
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl">Loading narrative...</div>
        </div>
      </div>
    );
  }

  if (error || !narrative) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto p-8">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">⚠️</div>
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
      <div className="max-w-4xl mx-auto p-8">
        {/* Header with Actions */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{narrative.title}</h1>
            <div className="flex gap-2">
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
        </div>

        {/* Export Options */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Export Options</h3>
            <div className="flex gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showTechnical}
                  onChange={e => setShowTechnical(e.target.checked)}
                  className="rounded"
                />
                Technical Details
              </label>
              <label className="flex items-center gap-2">
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

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleExport(ExportFormat.MARKDOWN)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              📝 Download Markdown
            </button>
            <button
              onClick={() => handleExport(ExportFormat.HTML)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              🌐 Download HTML
            </button>
            <button
              onClick={() => handleExport(ExportFormat.JSON)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              📋 Download JSON
            </button>
            <button
              onClick={() => handleExport(ExportFormat.PLAIN_TEXT)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              📄 Download TXT
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              {copied ? '✅ Copied!' : '📋 Copy Markdown'}
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-gray-300 leading-relaxed">{narrative.summary}</p>
        </div>

        {/* Key Insights */}
        {narrative.key_insights.length > 0 && (
          <div className="mb-8 bg-yellow-900/20 border border-yellow-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
            <ul className="space-y-2">
              {narrative.key_insights.map((insight, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <span className="text-yellow-400">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Narrative Acts */}
        <div className="space-y-8">
          {narrative.acts.map((act, actIndex) => (
            <div key={actIndex} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">{act.title}</h2>

              <div className="space-y-6">
                {act.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="border-l-4 border-blue-600 pl-4">
                    <div className="text-blue-400 font-mono text-sm mb-2">
                      [{event.timestamp}]
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-3">
                      {event.description}
                    </p>

                    {showTechnical && event.technical_detail && (
                      <div className="bg-gray-900 rounded p-3 mb-2 text-sm text-gray-400">
                        <span className="mr-2">📚</span>
                        <strong>Technical:</strong> {event.technical_detail}
                      </div>
                    )}

                    <div className="bg-yellow-900/20 rounded p-3 text-sm text-yellow-200">
                      <span className="mr-2">⚡</span>
                      <strong>Why it matters:</strong> {event.significance}
                    </div>
                  </div>
                ))}
              </div>

              {showCommentary && act.commentary && (
                <div className="mt-6 bg-gray-900 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">💭 Commentary</div>
                  <p className="text-gray-400 leading-relaxed">{act.commentary}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/narratives"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← All Narratives
          </Link>
          <Link
            href="/lab-console"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Generate More →
          </Link>
        </div>
      </div>
    </div>
  );
}
