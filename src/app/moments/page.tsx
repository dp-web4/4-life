'use client';

/**
 * Emergent Moments Gallery
 *
 * Session #41: A curated showcase of the most interesting events detected
 * across ALL simulation datasets. Humans shouldn't have to dig through
 * individual simulations — the interesting stuff should come to them.
 *
 * This page algorithmically detects and ranks "moments" from simulation data:
 * - Trust collapses and recoveries
 * - Consciousness threshold crossings
 * - Karma manifesting across lives
 * - ATP crises and windfalls
 * - Maturation breakthroughs
 *
 * Each moment is a visual card with narrative context, linking to the
 * full simulation data and story.
 */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ExplorerNav from '@/components/ExplorerNav';
import RelatedConcepts from '@/components/RelatedConcepts';

// ============================================================================
// Types
// ============================================================================

interface Moment {
  id: string;
  title: string;
  narrative: string;
  significance: string;
  category: MomentCategory;
  severity: 'critical' | 'high' | 'medium';
  tick: number;
  lifeNumber: number;
  simulationId: string;
  simulationLabel: string;
  data: Record<string, any>;
  narrativeId?: string;
}

type MomentCategory = 'trust' | 'atp' | 'karma' | 'learning' | 'crisis' | 'emergence';

interface SimulationSource {
  id: string;
  filename: string;
  label: string;
  narrativeId?: string;
}

// ============================================================================
// Simulation Sources
// ============================================================================

const SOURCES: SimulationSource[] = [
  { id: 'ep-closed-loop', filename: 'ep_driven_closed_loop_results.json', label: 'EP Closed Loop', narrativeId: 'ep-driven-closed-loop' },
  { id: 'five-domain', filename: 'ep_five_domain_multi_life_results.json', label: 'Five-Domain EP', narrativeId: 'ep-five-domain-multi-life' },
  { id: 'maturation-web4', filename: 'maturation_demo_results_web4.json', label: 'Maturation (Web4)', narrativeId: 'maturation-web4' },
  { id: 'maturation-none', filename: 'maturation_demo_results_none.json', label: 'Maturation (Baseline)', narrativeId: 'maturation-none' },
  { id: 'multi-life-policy', filename: 'multi_life_with_policy.json', label: 'Multi-Life Policy', narrativeId: 'multi-life-policy' },
  { id: 'one-life-policy', filename: 'one_life_with_policy.json', label: 'Single-Life Policy', narrativeId: 'one-life-policy' },
  { id: 'trust-network', filename: 'trust_network_evolution.json', label: 'Trust Network' },
];

// ============================================================================
// Moment Detection
// ============================================================================

function detectMoments(rawData: any, source: SimulationSource): Moment[] {
  const moments: Moment[] = [];
  let lives: any[] = [];

  // Extract lives from different data formats
  if (source.id === 'multi-life-policy') {
    lives = rawData?.multi_life?.lives || [];
  } else if (source.id === 'one-life-policy') {
    // Single life doesn't have standard lives array
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
    // Network data - extract events differently
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
          title: karmaEffect > 0 ? `Karma Rewards: Life ${lifeNumber} Begins Stronger` : `Karma Consequences: Life ${lifeNumber} Starts Diminished`,
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

      // Consciousness threshold crossing (trust crosses 0.5)
      if (prev < 0.5 && curr >= 0.5) {
        moments.push({
          id: `${source.id}-threshold-${lifeNumber}-${j}`,
          title: `Consciousness Threshold Crossed in Life ${lifeNumber}`,
          narrative: `Trust reaches ${curr.toFixed(3)}, crossing the 0.5 consciousness threshold from coherence theory. Below this, behavior appears random. Above it, the agent's actions become coherent enough to be recognized as genuinely intentional. This is where true agency begins.`,
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

      // First ATP crisis crossing (below 20)
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

    // Life ending from ATP exhaustion
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

function detectNetworkMoments(rawData: any, source: SimulationSource): Moment[] {
  const moments: Moment[] = [];
  const events = rawData?.events || [];

  // Group network events by type
  const coalitionEvents = events.filter((e: any) =>
    e.event_type === 'coalition_formed' || e.type === 'coalition_formed'
  );
  const trustEvents = events.filter((e: any) =>
    e.event_type?.includes('trust') || e.type?.includes('trust')
  );

  if (coalitionEvents.length > 0) {
    const first = coalitionEvents[0];
    moments.push({
      id: `${source.id}-coalition-first`,
      title: 'First Coalition Forms',
      narrative: `At tick ${first.tick || 0}, agents spontaneously form a coalition — not because they were programmed to, but because their trust interactions created conditions where cooperation emerged naturally. This is emergence in action.`,
      significance: 'Coalition formation is emergent: it arises from individual trust dynamics, not central coordination.',
      category: 'emergence',
      severity: 'critical',
      tick: first.tick || 0,
      lifeNumber: 0,
      simulationId: source.id,
      simulationLabel: source.label,
      data: { coalitionCount: coalitionEvents.length, members: first.members },
    });
  }

  // Agent-level trust dynamics from snapshots
  const snapshots = rawData?.snapshots || [];
  if (snapshots.length >= 2) {
    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];

    moments.push({
      id: `${source.id}-network-evolution`,
      title: `Network Evolves: ${rawData.num_agents} Agents Over ${rawData.num_ticks} Ticks`,
      narrative: `A society of ${rawData.num_agents} agents with different strategies interact over ${rawData.num_ticks} ticks, producing ${events.length} events. Trust links form and break, coalitions emerge and dissolve. The network's final structure reflects the accumulated consequences of every individual interaction.`,
      significance: 'Multi-agent dynamics show how individual trust decisions create emergent social structures.',
      category: 'emergence',
      severity: 'high',
      tick: 0,
      lifeNumber: 0,
      simulationId: source.id,
      simulationLabel: source.label,
      data: { agentCount: rawData.num_agents, totalEvents: events.length, snapshotCount: snapshots.length },
    });
  }

  return moments;
}

// ============================================================================
// Ranking
// ============================================================================

function rankMoments(moments: Moment[]): Moment[] {
  const severityScore: Record<string, number> = { critical: 3, high: 2, medium: 1 };
  const categoryBonus: Record<string, number> = {
    emergence: 2,  // Consciousness threshold, coalition formation
    karma: 1.5,    // Cross-life effects
    learning: 1.5, // Maturation
    crisis: 1,     // ATP crises, deaths
    trust: 0.8,    // Trust spikes/collapses
    atp: 0.5,      // ATP events
  };

  return [...moments].sort((a, b) => {
    const scoreA = severityScore[a.severity] * (categoryBonus[a.category] || 1);
    const scoreB = severityScore[b.severity] * (categoryBonus[b.category] || 1);
    return scoreB - scoreA;
  });
}

// ============================================================================
// Components
// ============================================================================

function CategoryPill({ category }: { category: MomentCategory }) {
  const styles: Record<MomentCategory, { bg: string; text: string; label: string }> = {
    trust: { bg: 'bg-blue-900/50', text: 'text-blue-300', label: 'Trust Dynamics' },
    atp: { bg: 'bg-green-900/50', text: 'text-green-300', label: 'ATP Economics' },
    karma: { bg: 'bg-purple-900/50', text: 'text-purple-300', label: 'Karma' },
    learning: { bg: 'bg-amber-900/50', text: 'text-amber-300', label: 'Learning' },
    crisis: { bg: 'bg-red-900/50', text: 'text-red-300', label: 'Crisis' },
    emergence: { bg: 'bg-cyan-900/50', text: 'text-cyan-300', label: 'Emergence' },
  };
  const s = styles[category];
  return <span className={`px-2 py-0.5 rounded-full text-xs ${s.bg} ${s.text}`}>{s.label}</span>;
}

function SeverityDot({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: 'bg-red-400',
    high: 'bg-amber-400',
    medium: 'bg-gray-400',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[severity] || 'bg-gray-400'}`} />;
}

function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-gray-800 border rounded-lg overflow-hidden transition-all ${
        moment.severity === 'critical' ? 'border-gray-600' : 'border-gray-700'
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* Rank number */}
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-400">
            {index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <SeverityDot severity={moment.severity} />
              <h3 className="font-bold text-base">{moment.title}</h3>
            </div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <CategoryPill category={moment.category} />
              <span className="text-xs text-gray-500">{moment.simulationLabel}</span>
              {moment.lifeNumber > 0 && (
                <span className="text-xs text-gray-600">Life {moment.lifeNumber}, Tick {moment.tick}</span>
              )}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {moment.narrative}
            </p>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-700 p-5 space-y-4">
          {/* Significance */}
          <div className="bg-amber-900/10 border border-amber-900/30 rounded p-3">
            <div className="text-xs text-amber-300 font-medium mb-1">Why This Matters</div>
            <p className="text-sm text-gray-300">{moment.significance}</p>
          </div>

          {/* Technical data */}
          <div>
            <div className="text-xs text-gray-500 font-medium mb-2">Technical Data</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(moment.data).map(([key, value]) => (
                <div key={key} className="bg-gray-900 rounded p-2">
                  <div className="text-xs text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</div>
                  <div className="text-sm font-mono">
                    {typeof value === 'number' ? (value < 1 && value > 0 ? value.toFixed(4) : Math.round(value)) : String(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            {moment.narrativeId && (
              <Link
                href={`/narratives/${moment.narrativeId}`}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
              >
                Read Full Narrative
              </Link>
            )}
            <Link
              href={`/act-explorer?context=${encodeURIComponent(moment.title)}`}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded text-xs transition-colors"
            >
              Ask ACT About This
            </Link>
            <Link
              href="/data-explorer"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
            >
              View in Data Explorer
            </Link>
            <Link
              href="/lab-console"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
            >
              Re-run in Lab Console
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Page
// ============================================================================

export default function MomentsGalleryPage() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [showCount, setShowCount] = useState(15);

  // Load and analyze all datasets
  useEffect(() => {
    async function analyze() {
      const allMoments: Moment[] = [];

      await Promise.all(SOURCES.map(async (source) => {
        try {
          const res = await fetch(`/${source.filename}`);
          if (!res.ok) return;
          const rawData = await res.json();
          const detected = detectMoments(rawData, source);
          allMoments.push(...detected);
        } catch (err) {
          console.error(`Failed to analyze ${source.filename}:`, err);
        }
      }));

      setMoments(rankMoments(allMoments));
      setLoading(false);
    }
    analyze();
  }, []);

  // Filters
  const categories = useMemo(() =>
    Array.from(new Set(moments.map(m => m.category))).sort(),
    [moments]
  );
  const sources = useMemo(() =>
    Array.from(new Set(moments.map(m => m.simulationId))),
    [moments]
  );

  const filtered = useMemo(() => {
    return moments.filter(m => {
      if (categoryFilter && m.category !== categoryFilter) return false;
      if (sourceFilter && m.simulationId !== sourceFilter) return false;
      return true;
    });
  }, [moments, categoryFilter, sourceFilter]);

  const displayed = filtered.slice(0, showCount);

  // Stats
  const stats = useMemo(() => ({
    total: moments.length,
    critical: moments.filter(m => m.severity === 'critical').length,
    emergence: moments.filter(m => m.category === 'emergence').length,
    karma: moments.filter(m => m.category === 'karma').length,
    datasets: new Set(moments.map(m => m.simulationId)).size,
  }), [moments]);

  const categoryLabels: Record<string, string> = {
    trust: 'Trust',
    atp: 'ATP',
    karma: 'Karma',
    learning: 'Learning',
    crisis: 'Crisis',
    emergence: 'Emergence',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-8">
        <Breadcrumbs currentPath="/moments" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Emergent Moments</h1>
          <p className="text-gray-400 max-w-2xl">
            The most interesting events detected across all simulations, ranked by significance.
            Each moment is where trust dynamics become visible — where the abstract becomes concrete.
          </p>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400">Moments</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-red-400">{stats.critical}</div>
              <div className="text-xs text-gray-400">Critical</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-cyan-400">{stats.emergence}</div>
              <div className="text-xs text-gray-400">Emergence</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-purple-400">{stats.karma}</div>
              <div className="text-xs text-gray-400">Karma</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{stats.datasets}</div>
              <div className="text-xs text-gray-400">Datasets</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategoryFilter('')}
            className={`px-3 py-1.5 rounded text-xs transition-colors ${!categoryFilter ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat === categoryFilter ? '' : cat)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
          <span className="text-gray-700">|</span>
          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300"
          >
            <option value="">All Sources</option>
            {sources.map(s => (
              <option key={s} value={s}>
                {SOURCES.find(src => src.id === s)?.label || s}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-500">
            Analyzing simulation data for emergent moments...
          </div>
        )}

        {/* Moments list */}
        {!loading && (
          <>
            <div className="space-y-3">
              {displayed.map((moment, i) => (
                <MomentCard key={moment.id} moment={moment} index={i} />
              ))}
            </div>

            {filtered.length > showCount && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowCount(prev => prev + 15)}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors text-sm"
                >
                  Show More ({filtered.length - showCount} remaining)
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No moments match the current filters.
              </div>
            )}
          </>
        )}

        {/* Context */}
        <div className="mt-10 bg-blue-900/20 border border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">How Moments Are Detected</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              Moments are algorithmically extracted from raw simulation data by detecting significant
              events: trust spikes and collapses, consciousness threshold crossings, karma manifesting
              across lives, ATP crises, maturation breakthroughs, and emergent coalition formation.
            </p>
            <p>
              Each moment is ranked by severity and category importance. <strong className="text-white">Emergence</strong> events
              (consciousness thresholds, coalition formation) rank highest because they demonstrate
              the system's core thesis: complex social behaviors emerge from simple trust rules.
            </p>
          </div>
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link href="/data-explorer" className="text-blue-400 hover:underline text-sm">
              Browse Raw Data
            </Link>
            <Link href="/narratives" className="text-blue-400 hover:underline text-sm">
              Read Full Narratives
            </Link>
            <Link href="/lab-console" className="text-blue-400 hover:underline text-sm">
              Run Your Own Simulations
            </Link>
          </div>
        </div>

        <ExplorerNav currentPath="/moments" />
        <RelatedConcepts currentPath="/moments" />
      </div>
    </div>
  );
}
