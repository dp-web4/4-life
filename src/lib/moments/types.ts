/**
 * Moment Types
 *
 * Shared types for moment detection and ACT integration.
 * A "moment" is a significant event in a simulation that's worth
 * highlighting to humans - the interesting stuff that reveals
 * how trust dynamics work.
 */

export type MomentCategory =
  | 'trust'      // Trust changes (collapses, surges)
  | 'atp'        // ATP events (windfalls, drains)
  | 'karma'      // Cross-life consequences
  | 'learning'   // Maturation, EP improvements
  | 'crisis'     // Death, near-death, ATP exhaustion
  | 'emergence'; // Consciousness threshold crossings, coalition formation

export type MomentSeverity = 'critical' | 'high' | 'medium';

export interface Moment {
  id: string;
  title: string;
  narrative: string;
  significance: string;
  category: MomentCategory;
  severity: MomentSeverity;
  tick: number;
  lifeNumber: number;
  simulationId: string;
  simulationLabel: string;
  data: Record<string, any>;
  narrativeId?: string;
}

export interface SimulationSource {
  id: string;
  filename: string;
  label: string;
  narrativeId?: string;
}

export interface MomentStats {
  total: number;
  byCategory: Record<MomentCategory, number>;
  bySeverity: Record<MomentSeverity, number>;
  bySimulation: Record<string, number>;
  mostInteresting: Moment | null;
}

// Category display info
export const CATEGORY_INFO: Record<MomentCategory, { label: string; emoji: string; description: string }> = {
  trust: { label: 'Trust', emoji: '🤝', description: 'Trust changes and dynamics' },
  atp: { label: 'ATP', emoji: '⚡', description: 'Attention budget events' },
  karma: { label: 'Karma', emoji: '✨', description: 'Cross-life consequences' },
  learning: { label: 'Learning', emoji: '🧠', description: 'EP maturation and growth' },
  crisis: { label: 'Crisis', emoji: '💀', description: 'Death and survival events' },
  emergence: { label: 'Emergence', emoji: '🌟', description: 'Consciousness threshold crossings' },
};

// Category priority for ranking (higher = more interesting)
export const CATEGORY_PRIORITY: Record<MomentCategory, number> = {
  emergence: 6,
  karma: 5,
  learning: 4,
  crisis: 3,
  trust: 2,
  atp: 1,
};
