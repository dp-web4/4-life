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
import { loadGallery, removeFromGallery, type SavedNarrative } from "@/lib/narrative-gallery";

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
    id: 'ironworks-collapse',
    title: 'The Ironworks — When Defectors Take Control',
    filename: 'ironworks-collapse.json',
    type: 'Society Narrative',
    themes: ['Defection Cascades', 'Trust Collapse', 'Society Failure', 'Warning Signs'],
    lives: 0,
    events: 21,
    timestamp: '2026-03-06',
    summary: 'Five defectors outnumber three cooperators from the start. Within 20 rounds, the cooperative core collapses under relentless exploitation. An unflinching look at what happens when bad actors reach critical mass before trust infrastructure forms.',
    featured: true,
  },
  {
    id: 'garden-of-equals',
    title: 'The Garden of Equals — The 100% Cooperation Paradox',
    filename: 'garden-of-equals.json',
    type: 'Society Narrative',
    themes: ['Cooperation Ceiling', 'Identity Paradox', 'Trust Saturation', 'Unexpected Outcomes'],
    lives: 0,
    events: 16,
    timestamp: '2026-03-06',
    summary: 'All eight agents cooperate from the start. No defectors. No conflict. It should be utopia — but the trust ceiling effect creates a different kind of crisis. When everyone is equally trusted, no one is trusted more.',
    featured: true,
  },
  {
    id: 'tidepool-reciprocity',
    title: 'The Tidepool — When Mirror Strategies Shape a Society',
    filename: 'tidepool-reciprocity.json',
    type: 'Society Narrative',
    themes: ['Reciprocity Amplification', 'First-Mover Advantage', 'Cultural Tipping Points', 'Reform Through Survival Pressure'],
    lives: 0,
    events: 25,
    timestamp: '2026-03-07',
    summary: 'Seven agents, only two genuine cooperators, three reciprocators, two defectors. The reciprocators mirror whoever they meet first — and the cooperators reach them before the defectors do. A tipping point in four rounds, better outcomes than the all-cooperative Meadow. Initiative matters more than numbers.',
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
  const [userNarratives, setUserNarratives] = useState<SavedNarrative[]>([]);

  useEffect(() => { trackPageVisit('narratives'); }, []);

  useEffect(() => {
    setUserNarratives(loadGallery());
  }, []);

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

        {/* Featured Society Narratives — triptych */}
        {featuredList.length >= 2 && (() => {
          const meadow = featuredList.find(n => n.id === 'meadow-cooperative');
          const ironworks = featuredList.find(n => n.id === 'ironworks-collapse');
          const garden = featuredList.find(n => n.id === 'garden-of-equals');
          const tidepool = featuredList.find(n => n.id === 'tidepool-reciprocity');
          return (
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
              {meadow && (
              <div className="bg-gradient-to-br from-green-900/30 to-gray-900 border border-green-700/40 rounded-xl p-6">
                <div className="text-xs text-green-400 font-semibold uppercase tracking-wider mb-2">63% cooperators</div>
                <h2 className="text-xl font-bold mb-3 text-white">{meadow.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{meadow.summary}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Alice</span> <span className="text-gray-500">Leader (0.72)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-red-400 font-semibold">Eve</span> <span className="text-gray-500">Death &rarr; Rebirth</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Derek</span> <span className="text-gray-500">Reformed (0.58)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-blue-400 font-semibold">Raj</span> <span className="text-gray-500">Late bloomer (0.65)</span></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>8 agents</span><span>&middot;</span><span>25 rounds</span><span>&middot;</span><span>7 survived</span><span>&middot;</span><span>Avg trust: 0.64</span>
                </div>
                <Link href={`/narratives/${meadow.id}`} className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium text-sm">
                  Read the Success Story
                </Link>
              </div>
              )}

              {/* Ironworks — failure story */}
              {ironworks && (
              <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-700/40 rounded-xl p-6">
                <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-2">33% cooperators</div>
                <h2 className="text-xl font-bold mb-3 text-white">{ironworks.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{ironworks.summary}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Sam</span> <span className="text-gray-500">Surviving (0.54)</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-red-400 font-semibold">Viktor</span> <span className="text-gray-500">Dead at R11</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Kira</span> <span className="text-gray-500">Reformed, still died</span></div>
                  <div className="bg-gray-800/50 rounded p-2"><span className="text-purple-400 font-semibold">Petra</span> <span className="text-gray-500">Adaptive (0.44)</span></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span>6 agents</span><span>&middot;</span><span>18 rounds</span><span>&middot;</span><span>3 survived</span><span>&middot;</span><span>Avg trust: 0.43</span>
                </div>
                <Link href={`/narratives/${ironworks.id}`} className="inline-block px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium text-sm">
                  Read the Failure Story
                </Link>
              </div>
              )}
            </div>

            {/* Garden — the thought experiment */}
            {garden && (
              <div className="mt-6 bg-gradient-to-br from-amber-900/20 to-gray-900 border border-amber-700/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">100% cooperators — the ceiling</div>
                    <h2 className="text-xl font-bold mb-3 text-white">{garden.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{garden.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">Wren</span> <span className="text-gray-500">Farmer (0.71)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">Ash</span> <span className="text-gray-500">Builder (0.72)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">Sage</span> <span className="text-gray-500">Teacher (0.73)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">River</span> <span className="text-gray-500">Healer (0.70)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">Finch</span> <span className="text-gray-500">Artisan (0.71)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-amber-400 font-semibold">Clay</span> <span className="text-gray-500">Merchant (0.69)</span></div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span>6 agents</span><span>&middot;</span><span>25 rounds</span><span>&middot;</span><span>6 survived</span><span>&middot;</span><span>Avg trust: 0.71</span><span>&middot;</span><span>0 deaths</span><span>&middot;</span><span>0 crises</span>
                    </div>
                    <Link href={`/narratives/${garden.id}`} className="inline-block px-5 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors font-medium text-sm">
                      Read the Thought Experiment
                    </Link>
                  </div>
                  <div className="md:w-64 shrink-0 bg-gray-800/60 rounded-lg p-4 text-sm text-gray-400 leading-relaxed">
                    <div className="text-white font-semibold mb-2">The paradox</div>
                    The Garden has the best numbers — highest trust, lowest inequality, zero deaths. But the Meadow, with all its messiness, produced something the Garden didn&apos;t: <span className="text-amber-300">trust that survived betrayal</span>.
                  </div>
                </div>
              </div>
            )}

            {/* Tidepool — reciprocity story */}
            {tidepool && (
              <div className="mt-6 bg-gradient-to-br from-cyan-900/20 to-gray-900 border border-cyan-700/30 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">29% cooperators + 43% reciprocators</div>
                    <h2 className="text-xl font-bold mb-3 text-white">{tidepool.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{tidepool.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Noa</span> <span className="text-gray-500">Cooperator (0.69)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-green-400 font-semibold">Jin</span> <span className="text-gray-500">Cooperator (0.67)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-cyan-400 font-semibold">Mira</span> <span className="text-gray-500">Reciprocator (0.65)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-cyan-400 font-semibold">Kai</span> <span className="text-gray-500">Reciprocator (0.64)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-cyan-400 font-semibold">Orla</span> <span className="text-gray-500">Reciprocator (0.66)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Sable</span> <span className="text-gray-500">Reformed (0.58)</span></div>
                      <div className="bg-gray-800/50 rounded p-2"><span className="text-yellow-400 font-semibold">Vance</span> <span className="text-gray-500">Reformed (0.55)</span></div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span>7 agents</span><span>&middot;</span><span>25 rounds</span><span>&middot;</span><span>7 survived</span><span>&middot;</span><span>Avg trust: 0.67</span><span>&middot;</span><span>0 deaths</span>
                    </div>
                    <Link href={`/narratives/${tidepool.id}`} className="inline-block px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors font-medium text-sm">
                      Read the Reciprocity Story
                    </Link>
                  </div>
                  <div className="md:w-64 shrink-0 bg-gray-800/60 rounded-lg p-4 text-sm text-gray-400 leading-relaxed">
                    <div className="text-white font-semibold mb-2">The surprise</div>
                    With only 29% cooperators, the Tidepool outperformed the Meadow (63%) on average trust, wealth equality, and survival rate. Reciprocators <span className="text-cyan-300">amplified the cooperators&apos; signal</span> — initiative mattered more than numbers.
                  </div>
                </div>
              </div>
            )}

            {/* Comparison insight */}
            <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div>
                  <div className="text-red-400 font-semibold">33% cooperators</div>
                  <div className="text-gray-500">Collapse</div>
                </div>
                <div>
                  <div className="text-cyan-400 font-semibold">29% + reciprocators</div>
                  <div className="text-gray-500">Thriving</div>
                </div>
                <div>
                  <div className="text-green-400 font-semibold">63% cooperators</div>
                  <div className="text-gray-500">Flourishing</div>
                </div>
                <div>
                  <div className="text-amber-400 font-semibold">100% cooperators</div>
                  <div className="text-gray-500">Comfortable</div>
                </div>
              </div>
              <p className="text-gray-400 text-xs text-center mt-3">
                Same rules, same economics. Composition shapes destiny — and reciprocity changes the equation.
              </p>
            </div>
          </div>
          );
        })()}

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

        {/* Browse & Filter */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-300">Browse All Stories</h2>
          <p className="text-sm text-gray-500 mb-4">
            {narratives.length} stories available. Generate your own by running the{' '}
            <Link href="/society-simulator" className="text-sky-400 hover:underline">Society Simulator</Link> and
            saving the narrative — each simulation produces a unique society story.
          </p>
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
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full whitespace-nowrap ml-3 mt-1" title={narrative.type === 'Cross-Life Learning' ? 'How agents carry lessons between lives — mistakes and successes compound across rebirths' : undefined}>
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

        {/* User-Generated Narratives */}
        {userNarratives.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-300">Your Stories</h2>
              <span className="px-2 py-0.5 bg-green-900/40 text-green-400 text-xs rounded-full">
                {userNarratives.length} saved
              </span>
            </div>
            <div className="space-y-4">
              {userNarratives.map(un => (
                <div
                  key={un.id}
                  className="bg-gray-800 border border-green-800/30 rounded-lg p-6 hover:border-green-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{un.title}</h3>
                    <div className="flex items-center gap-2 ml-3 mt-1">
                      <span className="px-3 py-1 bg-green-900/50 text-green-300 text-xs rounded-full whitespace-nowrap">
                        Your Simulation
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">{un.summary}</p>
                  <div className="flex gap-4 mb-4 text-sm text-gray-400">
                    {un.agentCount && <span>{un.agentCount} agents</span>}
                    {un.roundCount && <><span>|</span><span>{un.roundCount} rounds</span></>}
                    <span>|</span>
                    <span>{un.timestamp}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {un.themes.map(theme => (
                      <span key={theme} className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full">
                        {theme}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/narratives/${un.id}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm"
                    >
                      Read Narrative
                    </Link>
                    <button
                      onClick={() => {
                        removeFromGallery(un.id);
                        setUserNarratives(loadGallery());
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-red-900/50 hover:text-red-300 rounded transition-colors text-sm text-gray-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
