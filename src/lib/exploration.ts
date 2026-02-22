/**
 * Exploration Tracker — Unified site-wide state persistence
 *
 * Tracks what the visitor has explored across sessions via localStorage.
 * Lightweight: one key, one JSON object. Read/write from any page.
 *
 * This enables:
 * - "Welcome back" on landing page with full exploration profile
 * - Return visitors see evidence their prior journey mattered
 * - Cross-page continuity (Day in Web4 archetype, Your Internet frustrations, etc.)
 */

const STORAGE_KEY = '4life-exploration';

export interface ConceptVisit {
  slug: string;
  lastVisited: string; // ISO date
  interactionCount: number; // how many times they tried the mini-interaction
}

export interface DayInWeb4Result {
  archetype: string; // Community Builder, Observer, Big Spender, Balanced
  scenariosCompleted: number;
  totalATPEarned: number;
  totalTrustDelta: number;
  completedAt: string; // ISO date
}

export interface YourInternetResult {
  frustrations: string[]; // IDs of selected frustrations
  completedAt: string;
}

export interface ExplorationProfile {
  /** Total pages visited (unique slugs) */
  pagesVisited: string[];
  /** Concept page interactions */
  conceptVisits: ConceptVisit[];
  /** Day in Web4 session results */
  dayInWeb4: DayInWeb4Result | null;
  /** Your Internet frustration selections */
  yourInternet: YourInternetResult | null;
  /** First visit timestamp */
  firstVisit: string;
  /** Last visit timestamp */
  lastVisit: string;
  /** Total sessions (rough: incremented when lastVisit date changes) */
  sessionCount: number;
}

function getDefaultProfile(): ExplorationProfile {
  const now = new Date().toISOString();
  return {
    pagesVisited: [],
    conceptVisits: [],
    dayInWeb4: null,
    yourInternet: null,
    firstVisit: now,
    lastVisit: now,
    sessionCount: 1,
  };
}

/** Load exploration profile from localStorage */
export function loadExploration(): ExplorationProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ExplorationProfile;
  } catch {
    return null;
  }
}

/** Load or create exploration profile */
export function getExploration(): ExplorationProfile {
  const existing = loadExploration();
  if (existing) {
    // Bump session count if last visit was a different day
    const today = new Date().toISOString().slice(0, 10);
    const lastDay = existing.lastVisit.slice(0, 10);
    if (today !== lastDay) {
      existing.sessionCount += 1;
    }
    existing.lastVisit = new Date().toISOString();
    return existing;
  }
  return getDefaultProfile();
}

/** Save exploration profile to localStorage */
export function saveExploration(profile: ExplorationProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

/** Record that the user visited a page */
export function trackPageVisit(slug: string): void {
  const profile = getExploration();
  if (!profile.pagesVisited.includes(slug)) {
    profile.pagesVisited.push(slug);
  }
  saveExploration(profile);
}

/** Record an interaction on a concept page (e.g., tried a scenario) */
export function trackConceptInteraction(slug: string): void {
  const profile = getExploration();
  const existing = profile.conceptVisits.find(v => v.slug === slug);
  if (existing) {
    existing.interactionCount += 1;
    existing.lastVisited = new Date().toISOString();
  } else {
    profile.conceptVisits.push({
      slug,
      lastVisited: new Date().toISOString(),
      interactionCount: 1,
    });
  }
  saveExploration(profile);
}

/** Save Day in Web4 session result */
export function saveDayInWeb4Result(result: Omit<DayInWeb4Result, 'completedAt'>): void {
  const profile = getExploration();
  profile.dayInWeb4 = {
    ...result,
    completedAt: new Date().toISOString(),
  };
  saveExploration(profile);
}

/** Save Your Internet frustration selections */
export function saveYourInternetResult(frustrations: string[]): void {
  const profile = getExploration();
  profile.yourInternet = {
    frustrations,
    completedAt: new Date().toISOString(),
  };
  saveExploration(profile);
}

/** Get a summary string for the welcome-back banner */
export function getExplorationSummary(profile: ExplorationProfile): string {
  const parts: string[] = [];
  if (profile.pagesVisited.length > 0) {
    parts.push(`${profile.pagesVisited.length} pages explored`);
  }
  const totalInteractions = profile.conceptVisits.reduce((sum, v) => sum + v.interactionCount, 0);
  if (totalInteractions > 0) {
    parts.push(`${totalInteractions} experiments run`);
  }
  if (profile.dayInWeb4) {
    parts.push(`Day archetype: ${profile.dayInWeb4.archetype}`);
  }
  return parts.join(' · ');
}
