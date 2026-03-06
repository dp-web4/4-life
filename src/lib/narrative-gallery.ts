/**
 * Narrative Gallery — localStorage bridge between Society Simulator and Narratives page.
 *
 * Converts SocietyNarrative (simulator output) to Narrative (viewer format)
 * and persists user-generated narratives in localStorage.
 */

import type { SocietyNarrative } from './narratives/society_narrative';
import type { Narrative } from './narratives/story_generator';

const STORAGE_KEY = '4life-user-narratives';

export interface SavedNarrative {
  id: string;
  title: string;
  themes: string[];
  summary: string;
  timestamp: string;
  narrative: Narrative;
  agentCount?: number;
  roundCount?: number;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

/** Convert SocietyNarrative (simulator) → Narrative (viewer format) */
export function convertToViewerFormat(sn: SocietyNarrative): Narrative {
  const acts = sn.chapters.map(ch => ({
    title: `Chapter ${ch.number}: ${ch.title}`,
    events: ch.events.map(e => ({
      timestamp: e.epoch !== undefined ? `Round ${e.epoch}` : '',
      description: e.description,
      significance: e.significance || '',
    })),
    commentary: ch.closing,
  }));

  const key_insights: string[] = [];
  if (sn.moralOfTheStory) key_insights.push(sn.moralOfTheStory);
  sn.keyMoments.forEach(m => {
    if (m.impact) key_insights.push(`${m.title}: ${m.impact}`);
  });

  return {
    title: sn.title,
    summary: sn.summary,
    acts,
    themes: sn.themes,
    key_insights,
  };
}

/** Save a simulator narrative to the gallery */
export function saveToGallery(sn: SocietyNarrative, agentCount?: number, roundCount?: number): SavedNarrative {
  const existing = loadGallery();
  const id = `user-${slugify(sn.title)}-${Date.now().toString(36)}`;
  const entry: SavedNarrative = {
    id,
    title: sn.title,
    themes: sn.themes,
    summary: sn.summary,
    timestamp: new Date().toISOString().slice(0, 10),
    narrative: convertToViewerFormat(sn),
    agentCount,
    roundCount,
  };

  existing.unshift(entry);

  // Keep max 20 user narratives
  if (existing.length > 20) existing.length = 20;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage full — remove oldest and retry
    existing.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  return entry;
}

/** Load all user-generated narratives */
export function loadGallery(): SavedNarrative[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** Load a single user narrative by ID */
export function loadNarrativeById(id: string): SavedNarrative | null {
  const gallery = loadGallery();
  return gallery.find(n => n.id === id) || null;
}

/** Remove a narrative from the gallery */
export function removeFromGallery(id: string): void {
  const gallery = loadGallery().filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
}
