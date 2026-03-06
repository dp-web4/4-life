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

  const featuredList = narratives.filter(n => n.featured);
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

        {/* Featured Society Narratives — comparison pair */}
        {featuredList.length >= 2 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-yellow-600/30 text-yellow-300 text-xs font-semibold rounded-full">
                Featured Stories
              </span>
              <span className="text-sm text-gray-400">
                Same rules. Different composition. Opposite outcomes.
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Meadow — success story */}
              <div className="bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-700/40 rounded-xl p-6">
                <div className="text-xs text-green-400 font-semibold uppercase tracking-wider mb-2">Cooperation wins</div>
                <h2 className="text-xl font-bold mb-3 text-white">{featuredList[0].title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{featuredList[0].summary}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Alice</span> <span className="text-gray-500">Leader (0.72)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-red-400 font-semibold">Eve</span> <span className="text-gray-500">Death &rarr; Rebirth</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Derek</span> <span className="text-gray-500">Reformed (0.58)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-blue-400 font-semibold">Raj</span> <span className="text-gray-500">Late bloomer (0.65)</span></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>8 agents</span><span>&middot;</span><span>25 rounds</span><span>&middot;</span><span>7 survived</span><span>&middot;</span><span>Avg trust: 0.64</span>
                </div>
                <Link href={`/narratives/${featuredList[0].id}`} className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium text-sm">
                  Read the Success Story
                </Link>
              </div>

              {/* Ironworks — failure story */}
              <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-700/40 rounded-xl p-6">
                <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-2">Defection collapses</div>
                <h2 className="text-xl font-bold mb-3 text-white">{featuredList[1].title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{featuredList[1].summary}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Sam</span> <span className="text-gray-500">Surviving (0.54)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-red-400 font-semibold">Viktor</span> <span className="text-gray-500">Dead at R11</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Kira</span> <span className="text-gray-500">Reformed, still died</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-purple-400 font-semibold">Petra</span> <span className="text-gray-500">Adaptive (0.44)</span></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>6 agents</span><span>&middot;</span><span>18 rounds</span><span>&middot;</span><span>3 survived</span><span>&middot;</span><span>Avg trust: 0.43</span>
                </div>
                <Link href={`/narratives/${featuredList[1].id}`} className="inline-block px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium text-sm">
                  Read the Failure Story
                </Link>
              </div>
            </div>

            {/* Comparison insight */}
            <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
              <p className="text-gray-300 text-sm">
                <strong>The only difference:</strong> 63% cooperators (Meadow) vs 33% cooperators (Ironworks).
                Same trust mechanics, same economics. Composition determines destiny.
              </p>
            </div>
          </div>
        )}

        {/* Single featured fallback */}
        {featuredList.length === 1 && (
          <div className="mb-10 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-gray-900 border border-blue-700/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-white">{featuredList[0].title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{featuredList[0].summary}</p>
            <Link href={`/narratives/${featuredList[0].id}`} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium text-lg">
              Read the Full Story
            </Link>
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
