'use client';

/**
 * Narratives Browser Page
 *
 * Browse all generated narratives, filter by theme, search events.
 * Features a hero section for the highlighted society narrative.
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
  featured?: boolean;
}

// Fallback — always at least one narrative visible
const FALLBACK_NARRATIVES: NarrativeMeta[] = [
  {
    id: 'meadow-cooperative',
    title: 'The Meadow Cooperative — When Trust Builds a Society',
    filename: 'meadow-cooperative.md',
    type: 'Society Narrative',
    themes: ['Cooperation Beats Defection', 'Trust Creates Structure', 'Reputation Has Consequences', 'Redemption Through Consistency'],
    lives: 2,
    events: 18,
    timestamp: '2026-03-06',
    summary: 'Eight strangers arrive with nothing but 100 ATP each. Over 25 rounds, alliances form, a defector exploits early generosity, coalitions isolate the exploiter, and a reformed free-rider earns redemption. The Meadow Cooperative emerges — not because anyone planned it, but because trust created structure where none existed.',
    featured: true,
  },
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
    summary: 'Bob learns by proposing actions, observing outcomes, and refining his understanding. Starting at trust 0.49, he navigates ATP crises and crosses the consciousness threshold.',
  },
];

export default function NarrativesPage() {
  const [narratives, setNarratives] = useState<NarrativeMeta[]>(FALLBACK_NARRATIVES);
  const [filter, setFilter] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { trackPageVisit('narratives'); }, []);

  useEffect(() => {
    fetch('/narratives/index.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setNarratives(data);
        setLoaded(true);
      })
      .catch(() => { setLoaded(true); });
  }, []);

  const featured = narratives.find(n => n.featured);
  const rest = narratives.filter(n => !n.featured);

  const allThemes = Array.from(new Set(rest.flatMap(n => n.themes)));

  const filteredNarratives = rest.filter(n => {
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
            Human-readable stories from Web4 simulations. Each narrative translates trust dynamics
            into comprehensible stories — how agents build trust, navigate crises, and learn from failure.
          </p>
        </div>

        {/* Featured Narrative Hero */}
        {featured && (
          <div className="mb-10 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-gray-900 border border-blue-700/50 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-600/30 text-yellow-300 text-xs font-semibold rounded-full">
                Featured Story
              </span>
              <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full">
                {featured.type}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">
              {featured.title}
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {featured.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {featured.themes.map(theme => (
                <span
                  key={theme}
                  className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href={`/narratives/${featured.id}`}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-lg"
              >
                Read the Full Story
              </Link>
              <span className="text-sm text-gray-400">
                {featured.events} events across {featured.lives === 1 ? '1 life' : `${featured.lives} lives`} &middot; 8 agents &middot; 25 rounds
              </span>
            </div>

            {/* Story preview — character lineup */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Meet the characters</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Alice', role: 'Farmer', outcome: 'Leader (0.72)', color: 'text-green-400' },
                  { name: 'Eve', role: 'Merchant', outcome: 'Death → Rebirth', color: 'text-red-400' },
                  { name: 'Derek', role: 'Scout', outcome: 'Reformed (0.58)', color: 'text-yellow-400' },
                  { name: 'Raj', role: 'Healer', outcome: 'Late bloomer (0.65)', color: 'text-blue-400' },
                ].map(char => (
                  <div key={char.name} className="bg-gray-800/50 rounded-lg p-3">
                    <div className={`font-semibold ${char.color}`}>{char.name}</div>
                    <div className="text-xs text-gray-400">{char.role}</div>
                    <div className="text-xs text-gray-500 mt-1">{char.outcome}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-300">All Narratives</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search narratives..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500"
              aria-label="Search narratives"
            />

            <select
              value={selectedTheme}
              onChange={e => setSelectedTheme(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              aria-label="Filter by theme"
            >
              <option value="">All Themes</option>
              {allThemes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
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
                  <h3 className="text-xl font-bold">{narrative.title}</h3>
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
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
                  >
                    Read Narrative
                  </Link>

                  <a
                    href={`/narratives/${narrative.filename}`}
                    download
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-sm"
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

        {/* CTA */}
        <div className="mt-8 bg-green-900/20 border border-green-800 rounded-lg p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Generate Your Own Story</h3>
          <p className="text-gray-400 mb-4 text-sm">
            Run the Society Simulator and watch your own narrative unfold. Every simulation generates a unique story
            based on agent strategies, trust dynamics, and emergent behavior.
          </p>
          <Link
            href="/society-simulator"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium"
          >
            Launch Society Simulator
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">How Narratives Work</h3>
          <p className="text-gray-400 mb-4 text-sm">
            Narratives are automatically generated from simulation data. The system detects interesting events,
            identifies character arcs, and weaves them into human-readable stories.
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <div><strong className="text-white">Event Detection:</strong> Identifies interesting moments (trust spikes, ATP crises, coalition formation)</div>
            <div><strong className="text-white">Character Arcs:</strong> Tracks each agent&apos;s journey from start to finish</div>
            <div><strong className="text-white">Theme Extraction:</strong> Identifies patterns (karma, learning, crisis/recovery, redemption)</div>
            <div><strong className="text-white">Progressive Detail:</strong> Simple stories with optional technical depth</div>
          </div>

          <div className="mt-4">
            <Link href="/how-it-works" className="text-blue-400 hover:underline text-sm">
              Learn more about how narratives work &rarr;
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            &larr; Back to Home
          </Link>
        </div>
        <ExplorerNav currentPath="/narratives" />
        <RelatedConcepts currentPath="/narratives" />
      </div>
    </div>
  );
}
