/**
 * Simulation Comparison Page
 *
 * Compare multiple simulation runs side-by-side to understand
 * how different parameters affect trust dynamics and agent behavior.
 */

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ComparativeView } from "@/components/ComparativeView";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import TermTooltip from "@/components/TermTooltip";
import { trackPageVisit } from "@/lib/exploration";

// Available simulation files
const SIMULATIONS = [
  {
    id: "ep_closed_loop",
    name: "Cross-Life Learning",
    file: "/ep_driven_closed_loop_results.json",
    description:
      "Agents remember what worked in past lives and apply those lessons. Like a person who changes careers but keeps the wisdom from each job.",
    lookFor:
      "Watch trust and energy improve with each new life — agents get smarter about what works.",
    color: "#3b82f6",
  },
  {
    id: "multi_life_policy",
    name: "Multi-Life with Policy",
    file: "/multi_life_with_policy.json",
    description:
      "Agents live multiple lives under society rules that reward cooperation and punish exploitation. Like a community with clear norms enforced through reputation.",
    lookFor:
      "Notice how society rules shape behavior differently than individual learning alone.",
    color: "#10b981",
  },
  {
    id: "maturation_web4",
    name: "Maturation (Web4)",
    file: "/maturation_demo_results_web4.json",
    description:
      "Agents grow trust over time with Web4 mechanisms active — karma, energy costs, and consistency scoring all shaping behavior.",
    lookFor:
      "Watch trust climb steadily as agents prove themselves through consistent actions.",
    color: "#f59e0b",
  },
  {
    id: "maturation_none",
    name: "Maturation (Baseline)",
    file: "/maturation_demo_results_none.json",
    description:
      "The exact same agents without Web4. No karma, no energy costs, no consistency checks. Compare this with \"Maturation (Web4)\" to see what the mechanisms actually change.",
    lookFor:
      'Compare with "Maturation (Web4)" — same agents, but without trust mechanisms. What changes?',
    color: "#8b5cf6",
  },
  {
    id: "five_domain",
    name: "Five-Domain Learning",
    file: "/ep_five_domain_multi_life_results.json",
    description:
      "Agents learn across 5 different skill areas simultaneously — like someone building expertise in coding, writing, teaching, managing, and designing all at once.",
    lookFor:
      "See how agents juggle multiple skill areas — some domains improve faster than others.",
    color: "#ec4899",
  },
];

// Interpretation panels for specific comparison pairings
function getComparisonInsight(loadedIds: string[]): {
  title: string;
  points: string[];
  takeaway: string;
} | null {
  const ids = new Set(loadedIds);

  if (ids.has("maturation_web4") && ids.has("maturation_none")) {
    return {
      title: "What the data shows: Web4 vs No Web4",
      points: [
        "Trust trajectory: With Web4 mechanisms, trust climbs steadily as consistent behavior is rewarded. Without them, trust fluctuates randomly — there's no signal distinguishing reliable agents from unreliable ones.",
        "Energy stability: Web4 agents maintain healthier ATP levels because quality work earns more than it costs. Baseline agents burn through energy with no feedback loop.",
        "The divergence point: Watch for where the lines separate. Early on, both look similar. The mechanisms matter most over time — exactly like reputation in real life.",
      ],
      takeaway:
        'Web4 doesn\'t make agents "better" — it makes good behavior visible and rewarding. The mechanisms create a feedback loop where trust earns trust.',
    };
  }

  if (ids.has("ep_closed_loop") && ids.has("multi_life_policy")) {
    return {
      title: "What the data shows: Learning vs Rules",
      points: [
        'Individual learning (Cross-Life Learning): Agents discover what works through trial and error across lifetimes. Each life builds on lessons from the last — "quality contributions earn more ATP" or "transparency rebuilds trust faster."',
        "Society rules (Multi-Life with Policy): Community norms shape behavior externally. Agents cooperate because the rules reward it, not because they've personally learned it works.",
        "The key difference: Learning agents adapt to novel situations. Rule-following agents are consistent but brittle when facing something the rules don't cover.",
      ],
      takeaway:
        "Both work, but differently. Rules create immediate order; learning creates lasting wisdom. The strongest societies combine both.",
    };
  }

  if (ids.has("five_domain") && ids.has("ep_closed_loop")) {
    return {
      title: "What the data shows: Generalist vs Specialist",
      points: [
        "Generalist agents (Five-Domain): Trust grows more slowly because attention is split across 5 skill areas. Some domains improve faster than others — like someone who's a great coder but still learning to manage.",
        "Specialist agents (Cross-Life Learning): Trust climbs faster in a single domain because all effort concentrates there. But there's a ceiling — one domain can only take you so far.",
        "The trade-off: Generalists start slower but may reach higher combined trust across domains. Specialists peak faster but in a narrower range.",
      ],
      takeaway:
        'Breadth vs depth isn\'t about which is "better" — it\'s about what the community needs. A society of only specialists has gaps; a society of only generalists lacks depth.',
    };
  }

  return null;
}

interface LoadedSimulation {
  id: string;
  name: string;
  color: string;
  data: {
    agent_lct: string;
    lives: any[];
  };
}

export default function ComparePage() {
  useEffect(() => {
    trackPageVisit("compare");
  }, []);

  const [selectedIds, setSelectedIds] = useState<string[]>([
    "maturation_web4",
    "maturation_none",
  ]);
  const [loadedSims, setLoadedSims] = useState<LoadedSimulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoLoaded = useRef(false);

  const handleToggleSimulation = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const loadSimulations = useCallback(async (ids: string[]) => {
    setLoading(true);
    setError(null);

    try {
      const promises = ids.map(async (id) => {
        const sim = SIMULATIONS.find((s) => s.id === id);
        if (!sim) throw new Error(`Unknown simulation: ${id}`);

        const response = await fetch(sim.file);
        if (!response.ok) throw new Error(`Failed to load ${sim.name}`);

        const data = await response.json();
        return {
          id: sim.id,
          name: sim.name,
          color: sim.color,
          data: {
            agent_lct: data.agent_lct,
            lives: data.lives,
          },
        };
      });

      const results = await Promise.all(promises);
      setLoadedSims(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load simulations",
      );
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoadSimulations = () => loadSimulations(selectedIds);

  // Auto-load the recommended comparison on first visit
  useEffect(() => {
    if (!autoLoaded.current) {
      autoLoaded.current = true;
      loadSimulations(["maturation_web4", "maturation_none"]);
    }
  }, [loadSimulations]);

  const insight = getComparisonInsight(loadedSims.map((s) => s.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs currentPath="/compare" />
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Compare Simulations
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mb-4">
            How much difference do Web4 mechanisms make? Compare simulation runs
            side-by-side to see how <TermTooltip term="T3" />,{" "}
            <TermTooltip term="ATP" />, and karma carry-forward affect outcomes
            across life cycles.
          </p>
          <p className="text-sm text-slate-400 mb-2">
            <strong className="text-slate-300">Cross-Life Learning</strong> — self-aware
            learning across lifetimes. Agents discover what works through
            experience: &ldquo;quality contributions earn more ATP&rdquo; or
            &ldquo;transparency rebuilds trust faster.&rdquo; Each new life
            builds on lessons from the last. (The technical term
            is <TermTooltip term="EP" /> — Cross-Life Learning.)
          </p>
          <p className="text-sm text-slate-400">
            We&apos;ve loaded the most revealing comparison to start — Web4 vs
            no Web4, same agents. Scroll down to see the results, or pick a
            different question below.
          </p>
        </div>

        {/* Key Findings — what comparisons reveal */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-slate-800/60 rounded-lg p-5 border border-emerald-800/30">
            <div className="text-emerald-400 text-sm font-semibold mb-2">
              Finding #1
            </div>
            <h3 className="text-white font-medium mb-2">
              Mechanisms matter more over time
            </h3>
            <p className="text-sm text-slate-400">
              With Web4 trust mechanisms, agents diverge from baseline after ~20
              actions. Early behavior looks identical — the feedback loops need
              time to compound.
            </p>
          </div>
          <div className="bg-slate-800/60 rounded-lg p-5 border border-sky-800/30">
            <div className="text-sky-400 text-sm font-semibold mb-2">
              Finding #2
            </div>
            <h3 className="text-white font-medium mb-2">
              Rules create order; learning creates wisdom
            </h3>
            <p className="text-sm text-slate-400">
              Society rules produce immediate cooperation. Cross-life learning
              produces slower but more adaptable agents. The strongest societies
              combine both.
            </p>
          </div>
          <div className="bg-slate-800/60 rounded-lg p-5 border border-purple-800/30">
            <div className="text-purple-400 text-sm font-semibold mb-2">
              Finding #3
            </div>
            <h3 className="text-white font-medium mb-2">
              Generalists start slower but reach further
            </h3>
            <p className="text-sm text-slate-400">
              Agents learning 5 domains at once build trust more slowly — but
              their combined expertise across domains eventually surpasses
              single-domain specialists.
            </p>
          </div>
        </div>

        {/* Comparison View — shown first so visitors see results immediately */}
        {loadedSims.length > 0 && (
          <div className="mb-8">
            <ComparativeView
              simulations={loadedSims.map((sim) => ({
                agent_lct: sim.data.agent_lct,
                lives: sim.data.lives,
                name: sim.name,
                color: sim.color,
              }))}
              height={300}
            />

            {/* Interpretation panel */}
            {insight && (
              <div className="mt-6 bg-slate-800 rounded-lg p-6 border border-slate-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {insight.title}
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  {insight.points.map((point, i) => (
                    <p key={i}>{point}</p>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-sm font-medium text-emerald-400">
                    {insight.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="bg-slate-800 rounded-lg p-12 text-center mb-8">
            <div className="text-2xl text-slate-400 animate-pulse">
              Loading simulations...
            </div>
          </div>
        )}

        {/* Guided Comparison Scenarios */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">
            Three Questions This Tool Answers
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Pick a question — it pre-selects the right simulations and loads
            them automatically.
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <button
              onClick={() => {
                const ids = ["maturation_web4", "maturation_none"];
                setSelectedIds(ids);
                loadSimulations(ids);
              }}
              className="text-left p-4 rounded-lg border border-emerald-800/40 bg-emerald-950/20 hover:bg-emerald-950/40 transition-all group"
            >
              <div className="text-sm font-semibold text-emerald-400 mb-1 group-hover:text-emerald-300">
                &ldquo;Does Web4 actually make a difference?&rdquo;
              </div>
              <p className="text-xs text-slate-400">
                Same agents, same scenarios — one has trust mechanisms, one
                doesn&apos;t. Watch how trust and energy diverge over time.
              </p>
              <p className="text-xs text-emerald-500/60 mt-2">
                Maturation (Web4) vs Maturation (Baseline)
              </p>
            </button>
            <button
              onClick={() => {
                const ids = ["ep_closed_loop", "multi_life_policy"];
                setSelectedIds(ids);
                loadSimulations(ids);
              }}
              className="text-left p-4 rounded-lg border border-sky-800/40 bg-sky-950/20 hover:bg-sky-950/40 transition-all group"
            >
              <div className="text-sm font-semibold text-sky-400 mb-1 group-hover:text-sky-300">
                &ldquo;Individual learning or society rules?&rdquo;
              </div>
              <p className="text-xs text-slate-400">
                Agents that remember past lives vs agents governed by community
                norms. Which shapes better behavior?
              </p>
              <p className="text-xs text-sky-500/60 mt-2">
                Cross-Life Learning vs Multi-Life with Policy
              </p>
            </button>
            <button
              onClick={() => {
                const ids = ["five_domain", "ep_closed_loop"];
                setSelectedIds(ids);
                loadSimulations(ids);
              }}
              className="text-left p-4 rounded-lg border border-purple-800/40 bg-purple-950/20 hover:bg-purple-950/40 transition-all group"
            >
              <div className="text-sm font-semibold text-purple-400 mb-1 group-hover:text-purple-300">
                &ldquo;Specialist or generalist?&rdquo;
              </div>
              <p className="text-xs text-slate-400">
                Learning across 5 skill areas at once vs focusing on one domain.
                Does breadth come at the cost of depth?
              </p>
              <p className="text-xs text-purple-500/60 mt-2">
                Five-Domain Learning vs Cross-Life Learning
              </p>
            </button>
          </div>
        </div>

        {/* Selection Panel — collapsed by default since we auto-load */}
        <details className="mb-8">
          <summary className="bg-slate-800 rounded-lg p-4 cursor-pointer text-white font-semibold hover:bg-slate-750 transition-colors">
            Custom comparison — pick your own simulations
          </summary>
          <div className="bg-slate-800 rounded-b-lg p-6 border-t border-slate-700/50">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {SIMULATIONS.map((sim) => {
                const isSelected = selectedIds.includes(sim.id);
                return (
                  <button
                    key={sim.id}
                    onClick={() => handleToggleSimulation(sim.id)}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-900/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded mt-1 flex-shrink-0"
                        style={{ backgroundColor: sim.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white mb-1">
                          {sim.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {sim.description}
                        </p>
                        <p className="text-xs text-sky-400/70 mt-1 italic">
                          {sim.lookFor}
                        </p>
                      </div>
                      <div
                        className={`flex-shrink-0 ${isSelected ? "text-blue-400" : "text-slate-600"}`}
                      >
                        {isSelected ? "\u2713" : "\u25CB"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLoadSimulations}
                disabled={selectedIds.length < 2 || loading}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedIds.length >= 2 && !loading
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Loading..."
                  : `Compare ${selectedIds.length} Simulations`}
              </button>

              {selectedIds.length < 2 && (
                <p className="text-sm text-slate-400">
                  Select at least 2 simulations to compare
                </p>
              )}

              {error && (
                <p className="text-sm text-red-400">Error: {error}</p>
              )}
            </div>
          </div>
        </details>

        {/* Reading the charts */}
        <details className="mb-8">
          <summary className="bg-slate-800 rounded-lg p-4 cursor-pointer text-white font-semibold hover:bg-slate-750 transition-colors">
            How to read the charts
          </summary>
          <div className="bg-slate-800 rounded-b-lg p-6 border-t border-slate-700/50">
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">Trust Trajectory:</strong> Shows
                how <TermTooltip term="T3" /> evolves over time. The trust
                threshold (0.5) marks where behavior transitions from reactive
                to intentional. Above this threshold, agents exhibit coherent
                patterns.
              </p>
              <p>
                <strong className="text-white">ATP Trajectory:</strong> Tracks
                the <TermTooltip term="ATP" /> attention budget. ATP decreases
                with actions and increases with valuable contributions. The
                crisis threshold (20) marks when agents face resource pressure.
              </p>
              <p>
                <strong className="text-white">Volatility:</strong> Measures
                behavioral consistency. Low volatility indicates stable
                patterns; high volatility suggests crisis/recovery dynamics or
                experimental behavior.
              </p>
              <p>
                <strong className="text-white">Synchronized Hovering:</strong>{" "}
                Mouse over any chart to see values at that tick across all
                simulations. This reveals divergence points where different
                parameters led to different outcomes.
              </p>
            </div>
          </div>
        </details>

        <ExplorerNav currentPath="/compare" />
        <RelatedConcepts currentPath="/compare" />
      </div>
    </div>
  );
}
