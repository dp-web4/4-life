'use client';

/**
 * Narratives Browser Page
 *
 * Browse all generated narratives, filter by theme, search events
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from '@/components/ExplorerNav';
import { trackPageVisit } from "@/lib/exploration";

interface NarrativeMeta {
  id: string;
  title: string;
  filename: string;
  type?: string;
  themes: string[];
  lives: number;
  events: number;
  timestamp: string;
  summary?: string;
  source_simulation?: string;
}

// Pre-generated example narratives — always visible so the page isn't empty
const EXAMPLE_NARRATIVES: NarrativeMeta[] = [
  {
    id: 'ep-driven-closed-loop',
    title: 'Bob: Learning Through Action — Self-Aware Pattern Discovery',
    filename: 'ep-driven-closed-loop.md',
    type: 'Cross-Life Learning',
    themes: ['Karma and Consequences', 'Equilibrium and Stability', 'Closed-Loop Learning'],
    lives: 3,
    events: 20,
    timestamp: '2026-01-27',
    source_simulation: 'ep_driven_closed_loop_results.json',
    summary: 'Bob learns by proposing actions, observing outcomes, and refining his understanding. Starting at trust 0.49, he navigates ATP crises and crosses the consciousness threshold — behavior shifts from reactive to intentional.',
  },
  {
    id: 'maturation-web4',
    title: 'Bob: From Immature to Wise — Growth with Inherited Patterns',
    filename: 'maturation-web4.md',
    type: 'Maturation (Web4)',
    themes: ['Karma and Consequences', 'Pattern-Guided Growth', 'Web4 Native Corpus'],
    lives: 3,
    events: 14,
    timestamp: '2026-01-27',
    source_simulation: 'maturation_demo_results_web4.json',
    summary: 'Using 100 learned patterns to guide development, Bob matures from IMMATURE through LEARNING to MATURE across 3 lives. Trust grows from 0.49 to 0.57 — steady improvement, not overnight transformation.',
  },
  {
    id: 'maturation-none',
    title: 'Bob: Trial and Error — What Happens Without Inherited Wisdom',
    filename: 'maturation-none.md',
    type: 'Maturation (Baseline)',
    themes: ['Baseline Comparison', 'Heuristic Only'],
    lives: 3,
    events: 14,
    timestamp: '2026-01-27',
    source_simulation: 'maturation_demo_results_none.json',
    summary: 'Same agent, no inherited wisdom. Bob must learn purely through trial and error. Compare with the Web4 version to see how learned patterns accelerate growth.',
  },
];

export default function NarrativesPage() {
  const [narratives, setNarratives] = useState<NarrativeMeta[]>(EXAMPLE_NARRATIVES);
  const [filter, setFilter] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { trackPageVisit('narratives'); }, []);

  useEffect(() => {
    // Try to load full narrative index (may include user-generated stories)
    fetch('/narratives/index.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setNarratives(data);
        setLoaded(true);
      })
      .catch(() => {
        // Examples are already loaded as fallback
        setLoaded(true);
      });
  }, []);

  const allThemes = Array.from(new Set(narratives.flatMap(n => n.themes)));

  const filteredNarratives = narratives.filter(n => {
    const matchesSearch = !filter || n.title.toLowerCase().includes(filter.toLowerCase());
    const matchesTheme = !selectedTheme || n.themes.includes(selectedTheme);
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto p-8">
        <Breadcrumbs currentPath="/narratives" />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Simulation Narratives</h1>
          <p className="text-gray-400 mb-2">
            Human-readable stories from Web4 simulations. Each narrative translates technical trust dynamics
            into comprehensible stories — how agents build trust, navigate crises, and learn from failure.
          </p>
          <p className="text-sm text-gray-500">
            These stories are auto-generated from real simulation data. Pick one to read, or{' '}
            <Link href="/society-simulator" className="text-sky-400 hover:underline">run your own simulation</Link>{' '}
            to generate new stories.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search narratives..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500"
          />

          <select
            value={selectedTheme}
            onChange={e => setSelectedTheme(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
          >
            <option value="">All Themes</option>
            {allThemes.map(theme => (
              <option key={theme} value={theme}>{theme}</option>
            ))}
          </select>
        </div>

        {/* Narratives List */}
        <div className="space-y-4">
          {filteredNarratives.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No narratives match your search. Try a different term or clear the filter.
            </div>
          ) : (
            filteredNarratives.map(narrative => (
              <div
                key={narrative.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold">{narrative.title}</h2>
                  {narrative.type && (
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full whitespace-nowrap ml-3 mt-1">
                      {narrative.type}
                    </span>
                  )}
                </div>

                {narrative.summary && (
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                    {narrative.summary}
                  </p>
                )}

                <div className="flex gap-4 mb-4 text-sm text-gray-400">
                  <span>{narrative.lives} {narrative.lives === 1 ? 'life' : 'lives'}</span>
                  <span>|</span>
                  <span>{narrative.events} events</span>
                  <span>|</span>
                  <span>{narrative.timestamp}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {narrative.themes.map(theme => (
                    <span
                      key={theme}
                      className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/narratives/${narrative.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                  >
                    Read Narrative
                  </Link>

                  <a
                    href={`/narratives/${narrative.filename}`}
                    download
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  >
                    Download Markdown
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Compare Link */}
        {filteredNarratives.length >= 2 && (
          <div className="mt-8 bg-purple-900/20 border border-purple-800 rounded-lg p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-purple-300">Compare Narratives</h3>
              <p className="text-sm text-gray-400">
                See how different conditions shape agent development side-by-side.
              </p>
            </div>
            <Link
              href="/narratives/compare"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors text-sm whitespace-nowrap"
            >
              Open Comparison View
            </Link>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">About Narratives</h3>
          <p className="text-gray-400 mb-4">
            Narratives are automatically generated from simulation data using event detection and story generation algorithms.
            They translate technical trust dynamics into human-comprehensible stories.
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <div><strong className="text-white">Event Detection:</strong> Identifies interesting moments (trust spikes, ATP crises, maturation)</div>
            <div><strong className="text-white">Story Generation:</strong> Converts events to human narratives with explanations</div>
            <div><strong className="text-white">Theme Extraction:</strong> Identifies patterns (karma, learning, crisis/recovery)</div>
            <div><strong className="text-white">Progressive Complexity:</strong> Simple stories with optional technical details</div>
          </div>

          <div className="mt-4">
            <Link href="/how-it-works" className="text-blue-400 hover:underline">
              Learn more about how narratives work →
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
        <ExplorerNav currentPath="/narratives" />
        <RelatedConcepts currentPath="/narratives" />
      </div>
    </div>
  );
}
