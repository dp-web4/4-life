"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";

/**
 * Learning Journey: Progressive Web4 Comprehension
 *
 * Philosophy: Humans learn best through progressive revelation:
 * 1. Concrete before abstract
 * 2. Problem before solution
 * 3. Experience before theory
 * 4. Connection before isolation
 *
 * This page provides a curated pathway from "What is Web4?" to
 * "I can participate meaningfully in Web4 societies."
 */

type LearningStage = "beginner" | "intermediate" | "advanced" | "practitioner";

interface LearningPath {
  stage: LearningStage;
  title: string;
  description: string;
  concepts: ConceptNode[];
  actions: ActionNode[];
}

interface ConceptNode {
  id: string;
  title: string;
  teaser: string;
  why: string; // Why learn this now?
  link: string;
  duration: string; // Estimated time
}

interface ActionNode {
  id: string;
  title: string;
  description: string;
  link: string;
  type: "interactive" | "observe" | "experiment" | "build";
}

export default function LearnJourney() {
  const [activeStage, setActiveStage] = useState<LearningStage>("beginner");
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set());

  // Restore progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("4life-learn-progress");
      if (saved) {
        setCompletedConcepts(new Set(JSON.parse(saved)));
      }
    } catch { /* ignore */ }
  }, []);

  const toggleCompleted = (conceptId: string) => {
    const updated = new Set(completedConcepts);
    if (updated.has(conceptId)) {
      updated.delete(conceptId);
    } else {
      updated.add(conceptId);
    }
    setCompletedConcepts(updated);
    // Persist to localStorage
    try {
      localStorage.setItem("4life-learn-progress", JSON.stringify([...updated]));
    } catch { /* ignore */ }
  };

  const learningPaths: LearningPath[] = [
    {
      stage: "beginner",
      title: "First Contact: What Makes Web4 Different?",
      description:
        "You're curious about Web4 but don't know where to start. If you haven't already, try the interactive First Contact tutorial first. This path dives deeper into the core problems Web4 solves and the foundational concepts that enable trust-native societies.",
      concepts: [
        {
          id: "lct",
          title: "Identity: Verifiable Presence (LCT)",
          teaser:
            "Your phone's security chip makes your presence verifiable — no passwords, no accounts. Creating fake identities means buying fake devices.",
          why: "Identity is the foundation. Without it, trust can't accumulate reliably and spam is free.",
          link: "/lct-explainer",
          duration: "6 min read",
        },
        {
          id: "atp",
          title: "Attention Economics (ATP)",
          teaser:
            "Every action costs energy. Valuable contributions earn it back. Run out of energy? You die. This makes spam self-defeating and quality sustainable.",
          why: "The attention budget is what makes participation meaningful. It's how Web4 prices actions.",
          link: "/atp-economics",
          duration: "7 min read",
        },
        {
          id: "t3",
          title: "Trust Tensors: Multi-Dimensional Trust",
          teaser:
            "Trust isn't a single number. It's measured across three dimensions per role: Talent, Training, and Temperament. Gaming one while failing others doesn't work.",
          why: "T3 is how societies measure trustworthiness without central authorities.",
          link: "/trust-tensor",
          duration: "9 min read",
        },
        {
          id: "ci",
          title: "Coherence Index: Consistency Detection",
          teaser:
            "Tracks consistency across four dimensions: where you are, when you act, what you can do, and who you interact with. Inconsistent behavior tanks your trust.",
          why: "CI is Web4's immune system — it detects fraud automatically by spotting incoherent behavior.",
          link: "/coherence-index",
          duration: "8 min read",
        },
        {
          id: "aliveness",
          title: "Aliveness: Putting It All Together",
          teaser:
            'In Web4, "alive" means: you have energy (ATP), sufficient trust (T3), and consistent behavior (CI). Lose any of them? You die. But if you earned trust, you can be reborn.',
          why: "Now that you know the building blocks, see how they combine. Aliveness is where identity + economics + trust + consistency become a living system.",
          link: "/aliveness",
          duration: "8 min read",
        },
      ],
      actions: [
        {
          id: "run-first-sim",
          title: "Watch an Agent Live and Die",
          description:
            "Run an EP Closed Loop simulation. See an agent earn ATP, build trust, die from exhaustion, and be reborn with karma. This is Web4 in miniature.",
          link: "/lab-console",
          type: "observe",
        },
        {
          id: "explore-narrative",
          title: "Read a Simulation Story",
          description:
            "See how the narrative generator translates raw simulation data into human-comprehensible stories. Understand trust dynamics through narrative.",
          link: "/narratives",
          type: "observe",
        },
      ],
    },
    {
      stage: "intermediate",
      title: "Understanding Emergence: How Trust Creates Societies",
      description:
        "You understand the basic concepts. Now see how they combine to create emergent properties: trust networks form, markets self-organize, and agents learn across lives.",
      concepts: [
        {
          id: "mrh",
          title: "Context Boundaries (MRH)",
          teaser:
            "You don't see everything—you see what's relevant through your relationships. MRH defines context boundaries based on your trust network.",
          why: "MRH shows how Web4 scales: societies stay coherent without requiring global consensus.",
          link: "/markov-relevancy-horizon",
          duration: "10 min read",
        },
        {
          id: "ep",
          title: "Decision Evolution: Learning Across Lives",
          teaser:
            "Agents learn which decisions work, carry patterns forward through karma, and improve across lives. Cross-life learning is how societies get smarter without anyone designing them to.",
          why: "This reveals how Web4 societies evolve over time without centralized training.",
          link: "/decision-evolution",
          duration: "11 min read",
        },
        {
          id: "trust-networks",
          title: "Trust Networks: Society Formation",
          teaser:
            "Relationships aren't declared (like 'friend requests')—they're emergent. Trust forms through interactions. Cooperators cluster. Free-riders get isolated. Coalitions enable coordination.",
          why: "Trust networks show how societies self-organize without central authority.",
          link: "/trust-networks",
          duration: "12 min read",
        },
        {
          id: "federation-econ",
          title: "Federation Economics: Dynamic ATP Markets",
          teaser:
            "ATP prices adjust based on scarcity. High demand + low supply = premium. This signals profit opportunities and guides specialization. Markets self-regulate.",
          why: "Federation economics shows how Web4 coordinates resource allocation without central planning.",
          link: "/federation-economics",
          duration: "13 min read",
        },
      ],
      actions: [
        {
          id: "compare-sims",
          title: "Compare Web4 vs Baseline",
          description:
            "Use the comparative analysis tool to see how Web4 maturation differs from baseline. Understand why the architecture matters.",
          link: "/compare",
          type: "observe",
        },
        {
          id: "explore-patterns",
          title: "Browse Pattern Corpus",
          description:
            "Examine the EP pattern library. See what agents learn, how learning improves, and which scenarios teach the most valuable lessons.",
          link: "/patterns",
          type: "observe",
        },
        {
          id: "watch-networks",
          title: "Watch Trust Networks Form",
          description:
            "Run the trust network simulation. See how different agent types (cooperators, free-riders, opportunists) interact and how coalitions emerge.",
          link: "/trust-networks",
          type: "observe",
        },
      ],
    },
    {
      stage: "advanced",
      title: "Deep Mechanics: How Web4 Actually Works",
      description:
        "You've seen the concepts and emergent properties. Now understand the technical implementation: how coherence modulates trust, how MRH maintains context, how multi-device identity works.",
      concepts: [
        {
          id: "identity-constellation",
          title: "Identity Constellations: Multi-Device Strength",
          teaser:
            "More devices = stronger identity, not weaker. Each device witnesses your LCT. Attack difficulty grows exponentially. Recovery requires quorum (e.g., 2 of 3 devices).",
          why: "Identity constellations show why Web4 identity is fundamentally more secure than passwords.",
          link: "/identity-constellation",
          duration: "14 min read",
        },
        {
          id: "coherence-framework",
          title: "Coherence Framework: From 4 Dimensions to 9 Domains",
          teaser:
            "Web4's coherence model (spatial, capability, temporal, relational) is grounded in Synchronism's 9-domain framework. Autonomous research discovered key gating mechanisms: attention gates metabolism, trust modulates coupling, and spacetime gates context.",
          why: "Understanding the full coherence framework reveals how Web4 emerges from fundamental principles, not arbitrary design. The 0.5 threshold appears across many natural systems — it's a phase transition, not a magic number.",
          link: "/coherence-framework",
          duration: "18 min read",
        },
        {
          id: "ci-modulation",
          title: "CI Modulation: Trust Through Physics",
          teaser:
            "Effective trust = Base_trust × CI². ATP cost = Normal × (1/CI²). Coherence isn't binary—it continuously modulates your capabilities. Low coherence = expensive actions + limited trust.",
          why: "CI modulation reveals how Web4 makes fraud expensive automatically, without human intervention.",
          link: "/coherence-index",
          duration: "10 min read (focus on modulation section)",
        },
        {
          id: "karma-mechanics",
          title: "Karma: Cross-Life Continuity",
          teaser:
            "Die with high trust? Reborn with an energy bonus and your reputation intact. Good behavior compounds across lives. Low trust means starting over from scratch — or not coming back at all.",
          why: "Karma mechanics show how Web4 creates long-term incentive alignment without external enforcement.",
          link: "/aliveness",
          duration: "8 min read (focus on rebirth section)",
        },
        {
          id: "maturation",
          title: "Trust Maturation: The Thermodynamic View",
          teaser:
            "Trust in Web4 behaves like physical systems: requires energy (ATP) to maintain, degrades without attention, crystallizes through consistency. Phase transitions at 0.5 threshold.",
          why: "Maturation patterns reveal why Web4 trust dynamics mirror physical reality rather than social convention.",
          link: "/how-it-works",
          duration: "12 min read",
        },
      ],
      actions: [
        {
          id: "ask-act",
          title: "Query Simulations with ACT",
          description:
            "Use the ACT conversational interface to ask questions about simulations. 'Why did trust decrease?' 'Show me maturation patterns.' 'Explain this decision.'",
          link: "/lab-console",
          type: "interactive",
        },
        {
          id: "analyze-corpus",
          title: "Analyze Pattern Quality",
          description:
            "Use the pattern corpus quality metrics. Examine confidence reliability, risk calibration, and decision effectiveness. Understand EP maturity assessment.",
          link: "/patterns",
          type: "observe",
        },
      ],
    },
    {
      stage: "practitioner",
      title: "Participation: Experiment and Build",
      description:
        "You understand how Web4 works. Now participate: run experiments, discover edge cases, tune parameters, contribute insights. This is the frontier.",
      concepts: [
        {
          id: "web4-architecture",
          title: "Web4 Architecture: The Full Stack",
          teaser:
            "Identity (LCT) → Energy (ATP/ADP) → Trust (T3) → Consistency (CI) → Context (MRH) → Learning. Six layers that create trust-native societies. Each layer enables the one above.",
          why: "Architecture understanding enables contribution. You can identify gaps, suggest improvements, experiment with modifications.",
          link: "/how-it-works",
          duration: "15 min read",
        },
        {
          id: "gating-mechanisms",
          title: "Gating Mechanisms: Three-Dimensional Control",
          teaser:
            "Boredom causes failure (attention gates metabolism), confidence gates coupling (trust modulates connections), context contamination (spacetime gates relevance). Three critical gates discovered through autonomous research. All three must be functional for high performance.",
          why: "Gating mechanisms reveal how coherence actively controls behavior, not just measures it. This is the cutting edge of Web4 research.",
          link: "/coherence-framework",
          duration: "15 min read (focus on gating section)",
        },
      ],
      actions: [
        {
          id: "playground",
          title: "Parameter Playground: Discover Tipping Points",
          description:
            "Adjust ATP costs/rewards, trust dynamics, karma mechanics, risk profiles. See which parameters create sustainability vs collapse. Find emergent patterns.",
          link: "/playground",
          type: "experiment",
        },
        {
          id: "custom-sim",
          title: "Run Custom Simulations",
          description:
            "Use the lab console API to run simulations with your own parameters. Test hypotheses. Break things. Discover edge cases.",
          link: "/lab-console",
          type: "experiment",
        },
        {
          id: "contribute",
          title: "Contribute Insights",
          description:
            "Found something interesting? Open an issue on GitHub. Share your discoveries. Help build the collective understanding.",
          link: "https://github.com/dp-web4/4-life/issues",
          type: "build",
        },
      ],
    },
  ];

  const currentPath = learningPaths.find((p) => p.stage === activeStage)!;
  const progress =
    (completedConcepts.size /
      learningPaths.reduce((sum, path) => sum + path.concepts.length, 0)) *
    100;

  return (
    <>
      <Breadcrumbs currentPath="/learn" />
      <section>
        <div className="hero-eyebrow">Guided Learning Journey</div>
        <h1 className="hero-title">Learn Web4 Progressively</h1>
        <p className="hero-subtitle">
          Web4 is complex, but comprehensible. This page guides you from first
          contact to active participation through a curated learning pathway.
          Start where you are. Progress at your pace. Mark concepts as you
          complete them.
        </p>
      </section>

      {/* Progress bar */}
      <section>
        <div className="detail-box">
          <div style={{ marginBottom: "0.5rem" }}>
            <strong>Overall Progress:</strong> {completedConcepts.size} /{" "}
            {learningPaths.reduce(
              (sum, path) => sum + path.concepts.length,
              0
            )}{" "}
            concepts completed ({progress.toFixed(0)}%)
          </div>
          <div
            style={{
              height: "12px",
              background: "var(--color-gray-800)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-bright) 100%)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </section>

      {/* Stage selector */}
      <section>
        <h2>Choose Your Starting Point</h2>
        <div
          className="concept-grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {learningPaths.map((path) => (
            <button
              key={path.stage}
              onClick={() => setActiveStage(path.stage)}
              className={`concept-card ${
                activeStage === path.stage ? "active" : ""
              }`}
              style={{
                cursor: "pointer",
                border:
                  activeStage === path.stage
                    ? "2px solid var(--color-accent)"
                    : "1px solid var(--color-gray-700)",
                transition: "all 0.2s ease",
              }}
            >
              <h3>
                {path.stage.charAt(0).toUpperCase() + path.stage.slice(1)}
              </h3>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {path.concepts.length} concepts · {path.actions.length} actions
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Current stage */}
      <section>
        <h2>{currentPath.title}</h2>
        <p className="detail-emphasis">{currentPath.description}</p>

        <h3 style={{ marginTop: "2rem" }}>Core Concepts</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {currentPath.concepts.map((concept, idx) => (
            <div
              key={concept.id}
              className="detail-box"
              style={{
                borderLeft: completedConcepts.has(concept.id)
                  ? "4px solid var(--color-success)"
                  : "4px solid var(--color-gray-700)",
                transition: "border-color 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        opacity: 0.5,
                        fontWeight: "bold",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <h4 style={{ margin: 0 }}>
                      <Link
                        href={concept.link}
                        style={{
                          color: "var(--color-text)",
                          textDecoration: "none",
                        }}
                      >
                        {concept.title}
                      </Link>
                    </h4>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-gray-400)",
                      }}
                    >
                      {concept.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleCompleted(concept.id)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "4px",
                    border: "1px solid var(--color-gray-600)",
                    background: completedConcepts.has(concept.id)
                      ? "var(--color-success)"
                      : "transparent",
                    color: completedConcepts.has(concept.id)
                      ? "white"
                      : "var(--color-text)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  {completedConcepts.has(concept.id) ? "✓ Done" : "Mark Done"}
                </button>
              </div>

              <p style={{ marginBottom: "0.75rem" }}>{concept.teaser}</p>

              <div
                className="detail-box"
                style={{
                  background: "var(--color-gray-900)",
                  marginTop: "0.75rem",
                  padding: "0.75rem",
                }}
              >
                <strong style={{ fontSize: "0.85rem" }}>Why learn this now?</strong>
                <p style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>
                  {concept.why}
                </p>
              </div>

              <div style={{ marginTop: "0.75rem" }}>
                <Link
                  href={concept.link}
                  className="cta-button"
                  style={{
                    display: "inline-block",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "4px",
                    background: "var(--color-accent)",
                    color: "white",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "background 0.2s ease",
                  }}
                >
                  Read →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: "2.5rem" }}>Practice Actions</h3>
        <p style={{ marginBottom: "1rem" }}>
          Concepts alone aren't enough. These actions help you internalize understanding through participation.
        </p>
        <div
          className="concept-grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {currentPath.actions.map((action) => (
            <div key={action.id} className="concept-card">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <div
                  style={{
                    fontSize: "1.2rem",
                    padding: "0.4rem 0.6rem",
                    borderRadius: "4px",
                    background:
                      action.type === "interactive"
                        ? "var(--color-accent)"
                        : action.type === "observe"
                        ? "var(--color-success)"
                        : action.type === "experiment"
                        ? "var(--color-warning)"
                        : "var(--color-info)",
                  }}
                >
                  {action.type === "interactive"
                    ? "⚡"
                    : action.type === "observe"
                    ? "👁"
                    : action.type === "experiment"
                    ? "🔬"
                    : "🔧"}
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>{action.title}</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", textTransform: "uppercase" }}>
                    {action.type}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                {action.description}
              </p>
              <Link
                href={action.link}
                className="cta-button"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
              >
                Try it →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section>
        <h2>What's Next?</h2>
        <div className="detail-box">
          {activeStage === "beginner" && (
            <>
              <p>
                <strong>After completing the Beginner path:</strong> You'll understand Web4's
                core concepts (LCT, ATP, T3, CI) and why they matter. You'll have seen simulations
                run and narratives generated.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Move to Intermediate</strong> to see how these concepts combine to create
                emergent properties: trust networks, self-organizing markets, and learning across lives.
              </p>
            </>
          )}
          {activeStage === "intermediate" && (
            <>
              <p>
                <strong>After completing the Intermediate path:</strong> You'll understand how
                trust networks form, how markets self-regulate, and how agents learn across lives
                through cross-life pattern recognition.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Move to Advanced</strong> to dive into the technical implementation:
                coherence modulation, multi-device identity, karma mechanics, and trust maturation physics.
              </p>
            </>
          )}
          {activeStage === "advanced" && (
            <>
              <p>
                <strong>After completing the Advanced path:</strong> You'll understand the deep
                mechanics of Web4: how coherence modulates trust continuously, why multi-device
                identity is exponentially more secure, and how trust maturation mirrors physical systems.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Move to Practitioner</strong> to start experimenting: run parameter sweeps,
                discover edge cases, contribute insights, and help build the collective understanding.
              </p>
            </>
          )}
          {activeStage === "practitioner" && (
            <>
              <p>
                <strong>You're at the frontier!</strong> At this stage, you understand Web4 well
                enough to contribute meaningfully. Run experiments, break things, discover patterns,
                and share what you learn.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Next steps:</strong> Use the playground to discover tipping points, run custom
                simulations to test hypotheses, and contribute your insights to the GitHub repository.
                The research advances through collective exploration.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Philosophy note */}
      <section>
        <div className="detail-box" style={{ background: "var(--color-gray-900)" }}>
          <h3>Learning Philosophy</h3>
          <p>
            This journey follows four principles:
          </p>
          <ol>
            <li>
              <strong>Concrete before abstract:</strong> See simulations before reading theory
            </li>
            <li>
              <strong>Problem before solution:</strong> Understand what Web4 solves before how
            </li>
            <li>
              <strong>Experience before explanation:</strong> Watch agents live before reading formulas
            </li>
            <li>
              <strong>Connection before isolation:</strong> See how concepts integrate before deep-diving
            </li>
          </ol>
          <p style={{ marginTop: "0.75rem" }}>
            <em>
              Understanding emerges from participation, not just observation. Mark concepts as done
              when they make sense, not when you've read every word. Trust your intuition. Return
              when questions arise. Learning is non-linear.
            </em>
          </p>
        </div>
      </section>
      <ExplorerNav currentPath="/learn" />
      <RelatedConcepts currentPath="/learn" />
    </>
  );
}
