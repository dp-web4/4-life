/**
 * Moment Detection
 *
 * Algorithmic detection of significant events in simulation data.
 * These moments become the "highlights" that humans can explore
 * without reading full simulation logs.
 *
 * Philosophy: Humans don't want data dumps — they want stories.
 * Moments are story fragments that reveal trust dynamics.
 */

import type { Moment, MomentCategory, SimulationSource, MomentStats, MomentSeverity } from './types';
import { CATEGORY_PRIORITY } from './types';

// Standard simulation sources
export const SIMULATION_SOURCES: SimulationSource[] = [
  { id: 'ep-closed-loop', filename: 'ep_driven_closed_loop_results.json', label: 'EP Closed Loop', narrativeId: 'ep-driven-closed-loop' },
  { id: 'five-domain', filename: 'ep_five_domain_multi_life_results.json', label: 'Five-Domain EP', narrativeId: 'ep-five-domain-multi-life' },
  { id: 'maturation-web4', filename: 'maturation_demo_results_web4.json', label: 'Maturation (Web4)', narrativeId: 'maturation-web4' },
  { id: 'maturation-none', filename: 'maturation_demo_results_none.json', label: 'Maturation (Baseline)', narrativeId: 'maturation-none' },
  { id: 'multi-life-policy', filename: 'multi_life_with_policy.json', label: 'Multi-Life Policy', narrativeId: 'multi-life-policy' },
  { id: 'one-life-policy', filename: 'one_life_with_policy.json', label: 'Single-Life Policy', narrativeId: 'one-life-policy' },
  { id: 'trust-network', filename: 'trust_network_evolution.json', label: 'Trust Network' },
];

/**
 * Detect all moments from raw simulation data
 */
export function detectMoments(rawData: any, source: SimulationSource): Moment[] {
  const moments: Moment[] = [];
  let lives: any[] = [];

  // Extract lives from different data formats
  if (source.id === 'multi-life-policy') {
    lives = rawData?.multi_life?.lives || [];
  } else if (source.id === 'one-life-policy') {
    const ls = rawData?.life_summary;
    if (ls) {
      lives = [{
        life_id: 'life:1',
        start_tick: 0,
        end_tick: ls.ticks_survived || 20,
        t3_history: [ls.initial_trust || 0.5, ls.final_trust || 0.5],
        atp_history: [ls.initial_atp || 100, ls.final_atp || 0],
        life_state: ls.final_atp <= 0 ? 'dead' : 'alive',
        termination_reason: ls.termination_reason || 'unknown',
      }];
    }
  } else if (source.id === 'trust-network') {
    return detectNetworkMoments(rawData, source);
  } else {
    lives = rawData?.lives || [];
  }

  for (let i = 0; i < lives.length; i++) {
    const life = lives[i];
    const prevLife = i > 0 ? lives[i - 1] : null;
    const lifeNumber = i + 1;
    const t3 = life.t3_history || life.trust_history || [];
    const atp = life.atp_history || [];

    // Rebirth with karma
    if (prevLife && i > 0) {
      const prevT3 = prevLife.t3_history || prevLife.trust_history || [];
      const prevFinal = prevT3[prevT3.length - 1] || 0.5;
      const newInitial = t3[0] || 0.5;
      const karmaEffect = newInitial - prevFinal;

      if (Math.abs(karmaEffect) > 0.001) {
        moments.push({
          id: `${source.id}-rebirth-${lifeNumber}`,
          title: karmaEffect > 0
            ? `Karma Rewards: Life ${lifeNumber} Begins Stronger`
            : `Karma Consequences: Life ${lifeNumber} Starts Diminished`,
          narrative: karmaEffect > 0
            ? `After ending life ${lifeNumber - 1} with trust ${prevFinal.toFixed(3)}, the agent is reborn with ${newInitial.toFixed(3)} — a ${(karmaEffect * 100).toFixed(1)}% karma bonus. Past good behavior compounds across lives.`
            : `The agent's previous behavior carries a cost. Starting life ${lifeNumber} at ${newInitial.toFixed(3)}, down from the previous life's end of ${prevFinal.toFixed(3)}. In Web4, actions have lasting consequences.`,
          significance: 'Demonstrates that trust is not reset on rebirth — karma carries forward.',
          category: 'karma',
          severity: 'critical',
          tick: life.start_tick || 0,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevFinalTrust: prevFinal, newInitialTrust: newInitial, karmaEffect },
          narrativeId: source.narrativeId,
        });
      }
    }

    // Trust trajectory analysis
    for (let j = 1; j < t3.length; j++) {
      const prev = t3[j - 1];
      const curr = t3[j];
      const change = curr - prev;
      const pctChange = prev > 0 ? Math.abs(change / prev) : 0;
      const tick = (life.start_tick || 0) + j;

      // Trust collapse (>20% drop)
      if (change < 0 && pctChange >= 0.20) {
        moments.push({
          id: `${source.id}-collapse-${lifeNumber}-${j}`,
          title: `Trust Collapse: ${(pctChange * 100).toFixed(0)}% Drop in Life ${lifeNumber}`,
          narrative: `Trust plummets from ${prev.toFixed(3)} to ${curr.toFixed(3)} — a ${(pctChange * 100).toFixed(0)}% collapse. Something the agent did severely violated society's expectations. Recovery requires sustained consistency, and the damage may carry into future lives.`,
          significance: 'Trust is asymmetric: hard to build, easy to lose. This mirrors real-world social dynamics.',
          category: 'trust',
          severity: 'critical',
          tick,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevTrust: prev, newTrust: curr, percentChange: pctChange },
          narrativeId: source.narrativeId,
        });
      }

      // Trust spike (>15% increase)
      if (change > 0 && pctChange >= 0.15) {
        moments.push({
          id: `${source.id}-spike-${lifeNumber}-${j}`,
          title: `Trust Surge: +${(pctChange * 100).toFixed(0)}% in Life ${lifeNumber}`,
          narrative: `Trust jumps from ${prev.toFixed(3)} to ${curr.toFixed(3)} — a ${(pctChange * 100).toFixed(0)}% surge. Consistent positive behavior compounds, and the society recognizes genuine contribution.`,
          significance: 'Consistent behavior compounds. Trust growth accelerates with coherent action patterns.',
          category: 'trust',
          severity: 'high',
          tick,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevTrust: prev, newTrust: curr, percentChange: pctChange },
          narrativeId: source.narrativeId,
        });
      }

      // Trust threshold crossing (trust crosses 0.5)
      if (prev < 0.5 && curr >= 0.5) {
        moments.push({
          id: `${source.id}-threshold-${lifeNumber}-${j}`,
          title: `Trust Threshold Crossed in Life ${lifeNumber}`,
          narrative: `Trust reaches ${curr.toFixed(3)}, crossing the 0.5 trust threshold. Below this, behavior appears random. Above it, the agent's actions become coherent enough to be recognized as genuinely intentional. This is where true agency begins.`,
          significance: 'The 0.5 threshold comes from Synchronism research — it marks the transition from reactive to intentional behavior.',
          category: 'emergence',
          severity: 'critical',
          tick,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevTrust: prev, newTrust: curr },
          narrativeId: source.narrativeId,
        });
      }
    }

    // ATP crisis detection
    for (let j = 1; j < atp.length; j++) {
      const prev = atp[j - 1];
      const curr = atp[j];
      const tick = (life.start_tick || 0) + j;

      if (curr <= 20 && prev > 20) {
        moments.push({
          id: `${source.id}-atp-crisis-${lifeNumber}-${j}`,
          title: `ATP Crisis: Only ${Math.round(curr)} Attention Remaining`,
          narrative: `The agent's attention budget drops to ${Math.round(curr)} ATP — dangerously low. Without earning more through valuable contribution, they face death from exhaustion. This is the metabolic reality of Web4: participation requires energy, and energy must be earned.`,
          significance: 'ATP is the metabolic budget of Web4. Running low forces strategic decisions: conserve or contribute?',
          category: 'crisis',
          severity: 'high',
          tick,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { currentATP: Math.round(curr), previousATP: Math.round(prev) },
          narrativeId: source.narrativeId,
        });
        break; // Only first crisis per life
      }
    }

    // Maturation detection (cross-life improvement)
    if (prevLife) {
      const prevT3 = prevLife.t3_history || prevLife.trust_history || [];
      const prevFinalTrust = prevT3[prevT3.length - 1] || 0.5;
      const currFinalTrust = t3[t3.length - 1] || 0.5;

      if (currFinalTrust > prevFinalTrust && currFinalTrust - prevFinalTrust > 0.05) {
        moments.push({
          id: `${source.id}-maturation-${lifeNumber}`,
          title: `Maturation: Trust Improves Across Lives`,
          narrative: `Life ${lifeNumber} ends with trust ${currFinalTrust.toFixed(3)}, up from life ${lifeNumber - 1}'s ${prevFinalTrust.toFixed(3)} — an improvement of ${((currFinalTrust - prevFinalTrust) * 100).toFixed(1)}%. The agent is learning what works and carrying that wisdom forward through karma.`,
          significance: 'Evidence of epistemic learning: the agent discovers effective behavior patterns through experience across lives.',
          category: 'learning',
          severity: 'high',
          tick: life.end_tick || 0,
          lifeNumber,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevFinalTrust, currFinalTrust, improvement: currFinalTrust - prevFinalTrust },
          narrativeId: source.narrativeId,
        });
      }
    }

    // Death by ATP exhaustion
    if (life.termination_reason === 'atp_exhaustion' || (life.life_state === 'dead' && atp[atp.length - 1] <= 0)) {
      const finalTrust = t3[t3.length - 1] || 0;
      moments.push({
        id: `${source.id}-death-${lifeNumber}`,
        title: `Death by Exhaustion: Life ${lifeNumber} Ends`,
        narrative: `ATP reaches zero and life ${lifeNumber} ends. Final trust: ${finalTrust.toFixed(3)}. The agent ran out of capacity to act — a metabolic death. But this isn't the end: their trust score becomes the seed for rebirth, carrying consequences forward.`,
        significance: 'Death creates the pressure that makes Web4 meaningful. Without stakes, trust would be trivial.',
        category: 'crisis',
        severity: 'critical',
        tick: life.end_tick || 0,
        lifeNumber,
        simulationId: source.id,
        simulationLabel: source.label,
        data: { finalTrust, terminationReason: life.termination_reason },
        narrativeId: source.narrativeId,
      });
    }
  }

  return moments;
}

/**
 * Detect moments from network/graph simulation data
 */
function detectNetworkMoments(rawData: any, source: SimulationSource): Moment[] {
  const moments: Moment[] = [];
  const history = rawData?.history || [];

  for (let i = 0; i < history.length; i++) {
    const epoch = history[i];
    const prevEpoch = i > 0 ? history[i - 1] : null;

    // Coalition detection
    if (epoch.metrics?.coalitions?.length > 0) {
      const newCoalitions = epoch.metrics.coalitions.filter((c: any) =>
        !prevEpoch?.metrics?.coalitions?.some((pc: any) =>
          JSON.stringify(pc.members?.sort()) === JSON.stringify(c.members?.sort())
        )
      );

      for (const coalition of newCoalitions) {
        moments.push({
          id: `${source.id}-coalition-${i}-${coalition.id || 'unnamed'}`,
          title: `Coalition Emerges: ${coalition.members?.length || 2} Agents Unite`,
          narrative: `A coalition forms between ${coalition.members?.join(', ') || 'multiple agents'}. Agents with mutual trust begin coordinating, creating emergent social structure. This is self-organization: no central authority, just trust dynamics producing cooperation.`,
          significance: 'Coalition formation is emergent — societies self-organize through trust, not decree.',
          category: 'emergence',
          severity: 'critical',
          tick: epoch.epoch || i,
          lifeNumber: 1,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { coalition, epoch: epoch.epoch },
          narrativeId: source.narrativeId,
        });
      }
    }

    // Network density changes
    if (prevEpoch && epoch.metrics?.avg_trust !== undefined) {
      const prevAvg = prevEpoch.metrics?.avg_trust || 0;
      const currAvg = epoch.metrics.avg_trust;
      const change = currAvg - prevAvg;

      if (Math.abs(change) > 0.1) {
        moments.push({
          id: `${source.id}-network-shift-${i}`,
          title: change > 0 ? `Network Trust Surge at Epoch ${epoch.epoch || i}` : `Network Trust Decline at Epoch ${epoch.epoch || i}`,
          narrative: change > 0
            ? `Average network trust rises from ${prevAvg.toFixed(3)} to ${currAvg.toFixed(3)}. The society is building cohesion — agents are learning to cooperate.`
            : `Average network trust falls from ${prevAvg.toFixed(3)} to ${currAvg.toFixed(3)}. Social friction is emerging — possibly conflict or betrayal.`,
          significance: 'Network-wide trust changes reveal macro social dynamics that individual agent stories don\'t capture.',
          category: 'trust',
          severity: Math.abs(change) > 0.15 ? 'critical' : 'high',
          tick: epoch.epoch || i,
          lifeNumber: 1,
          simulationId: source.id,
          simulationLabel: source.label,
          data: { prevAvgTrust: prevAvg, currAvgTrust: currAvg, change },
          narrativeId: source.narrativeId,
        });
      }
    }
  }

  return moments;
}

/**
 * Rank moments by importance
 */
export function rankMoments(moments: Moment[]): Moment[] {
  return [...moments].sort((a, b) => {
    // First by category priority (emergence > karma > learning > crisis > trust > atp)
    const priorityDiff = CATEGORY_PRIORITY[b.category] - CATEGORY_PRIORITY[a.category];
    if (priorityDiff !== 0) return priorityDiff;

    // Then by severity
    const severityOrder: Record<MomentSeverity, number> = { critical: 3, high: 2, medium: 1 };
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;

    // Then by tick (later events often more interesting)
    return b.tick - a.tick;
  });
}

/**
 * Calculate moment statistics
 */
export function calculateStats(moments: Moment[]): MomentStats {
  const byCategory: Record<MomentCategory, number> = {
    trust: 0,
    atp: 0,
    karma: 0,
    learning: 0,
    crisis: 0,
    emergence: 0,
  };

  const bySeverity: Record<MomentSeverity, number> = {
    critical: 0,
    high: 0,
    medium: 0,
  };

  const bySimulation: Record<string, number> = {};

  for (const m of moments) {
    byCategory[m.category]++;
    bySeverity[m.severity]++;
    bySimulation[m.simulationId] = (bySimulation[m.simulationId] || 0) + 1;
  }

  const ranked = rankMoments(moments);

  return {
    total: moments.length,
    byCategory,
    bySeverity,
    bySimulation,
    mostInteresting: ranked[0] || null,
  };
}

/**
 * Filter moments by category
 */
export function filterByCategory(moments: Moment[], category: MomentCategory): Moment[] {
  return moments.filter(m => m.category === category);
}

/**
 * Filter moments by simulation
 */
export function filterBySimulation(moments: Moment[], simulationId: string): Moment[] {
  return moments.filter(m => m.simulationId === simulationId);
}

/**
 * Get the most interesting moment of each category
 */
export function getMostInterestingByCategory(moments: Moment[]): Record<MomentCategory, Moment | null> {
  const result: Record<MomentCategory, Moment | null> = {
    trust: null,
    atp: null,
    karma: null,
    learning: null,
    crisis: null,
    emergence: null,
  };

  const ranked = rankMoments(moments);

  for (const category of Object.keys(result) as MomentCategory[]) {
    const filtered = ranked.filter(m => m.category === category);
    result[category] = filtered[0] || null;
  }

  return result;
}
