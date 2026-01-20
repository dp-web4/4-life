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

interface NarrativeMeta {
  id: string;
  title: string;
  filename: string;
  themes: string[];
  lives: number;
  events: number;
  timestamp: string;
}

export default function NarrativesPage() {
  const [narratives, setNarratives] = useState<NarrativeMeta[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  useEffect(() => {
    // Load narratives from generated index
    fetch('/narratives/index.json')
      .then(res => res.json())
      .then(data => setNarratives(data))
      .catch(error => {
        console.error('Failed to load narratives:', error);
        // Fallback to empty array
        setNarratives([]);
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
          <p className="text-gray-400">
            Human-readable stories from Web4 simulations. Each narrative translates technical trust dynamics into comprehensible stories.
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
              No narratives found. Run a simulation in the{' '}
              <Link href="/lab-console" className="text-blue-400 hover:underline">
                Lab Console
              </Link>
              {' '}to generate one.
            </div>
          ) : (
            filteredNarratives.map(narrative => (
              <div
                key={narrative.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
              >
                <h2 className="text-2xl font-bold mb-2">{narrative.title}</h2>

                <div className="flex gap-4 mb-4 text-sm text-gray-400">
                  <span>{narrative.lives} lives</span>
                  <span>•</span>
                  <span>{narrative.events} events</span>
                  <span>•</span>
                  <span>{narrative.timestamp}</span>
                </div>

                <div className="flex gap-2 mb-4">
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

        {/* Info Box */}
        <div className="mt-12 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
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
        <RelatedConcepts currentPath="/narratives" />
      </div>
    </div>
  );
}
