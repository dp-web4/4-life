"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import { loadExploration, trackPageVisit } from "@/lib/exploration";
import InProduction from "@/components/InProduction";

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

  // Restore progress from localStorage + auto-complete from exploration tracker
  useEffect(() => {
    trackPageVisit('learn');
    const merged = new Set<string>();
    try {
      const saved = localStorage.getItem("4life-learn-progress");
      if (saved) {
        for (const id of JSON.parse(saved)) merged.add(id);
      }
    } catch { /* ignore */ }

    // Auto-complete concepts based on pages actually visited
    const exploration = loadExploration();
    if (exploration) {
      const slugToConceptIds: Record<string, string[]> = {
        'tldr': ['tldr'],
        'why-web4': ['why-web4'],
        'first-contact': ['first-contact'],
        'how-it-works': ['how-it-works'],
        'running-now': ['running-now'],
        'the-standard': ['the-standard'],
        'hub': ['hub'],
        'hestia': ['hestia'],
        'hardbound': ['hardbound'],
        'onramp': ['the-standard'],
        'lct-explainer': ['lct-explainer'],
        'trust-tensor': ['trust-tensor'],
        'value-tensor': ['value-tensor'],
        'trust-neighborhood': ['trust-neighborhood'],
        'atp-economics': ['atp-economics'],
        'coherence-index': ['coherence-index'],
        'karma-consequences': ['karma-consequences'],
        'identity-constellation': ['identity-constellation'],
        'glossary': ['glossary'],
        'day-in-web4': ['day-in-web4'],
        'your-internet': ['your-internet'],
        'web4-explainer': ['web4-explainer'],
        'what-could-go-wrong': ['what-could-go-wrong'],
        'coherence-framework': ['coherence-framework'],
        'manifest': ['manifest'],
      };
      for (const slug of exploration.pagesVisited) {
        const conceptIds = slugToConceptIds[slug];
        if (conceptIds) conceptIds.forEach(id => merged.add(id));
      }
    }
    if (merged.size > 0) setCompletedConcepts(merged);
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
      title: "Start Here: What Is Web4?",
      description:
        "New to Web4? These five pages take you from never having heard the term to understanding what it is, why it exists, and what already runs today. Read them in order; each builds on the last.",
      concepts: [
        {
          id: "tldr",
          title: "The 2-Minute Overview",
          teaser:
            "The shortest honest description of Web4: a trust-native layer for the internet, and what that actually buys you.",
          why: "Start with the whole shape before any detail. If this resonates, the rest is worth your time.",
          link: "/tldr",
          duration: "2 min read",
        },
        {
          id: "why-web4",
          title: "Why Web4? The Problem It Solves",
          teaser:
            "Spam, fake accounts, reputation that doesn't travel, platforms that own you. Web4 starts from these problems, not from a technology.",
          why: "Problem before solution. Understanding what's broken is what makes the mechanisms make sense.",
          link: "/why-web4",
          duration: "6 min read",
        },
        {
          id: "first-contact",
          title: "First Contact: See It in Action",
          teaser:
            "A guided walkthrough of a trust-native interaction, so the ideas are concrete before they're abstract.",
          why: "Concrete before abstract. Seeing the flow once makes every later concept easier to place.",
          link: "/first-contact",
          duration: "5 min",
        },
        {
          id: "how-it-works",
          title: "How It Works: The Whole Picture",
          teaser:
            "Identity, energy, trust, and coherence fit together into one system. This page shows how the pieces connect.",
          why: "A map of the whole before the parts. Now the individual concepts have a place to land.",
          link: "/how-it-works",
          duration: "10 min read",
        },
        {
          id: "running-now",
          title: "What's Actually Running Now",
          teaser:
            "Web4 is research, but not only theory. See exactly what is deployed and runnable today versus what is still R&D.",
          why: "Honesty about maturity. Knowing what's real keeps expectations calibrated as you go deeper.",
          link: "/running-now",
          duration: "5 min read",
        },
      ],
      actions: [
        {
          id: "act-first-contact",
          title: "Walk Through First Contact",
          description:
            "Step through a trust-native interaction end to end and watch how identity and trust show up in practice.",
          link: "/first-contact",
          type: "interactive",
        },
        {
          id: "act-running-now",
          title: "See What's Deployed Today",
          description:
            "Check the running-now page for the live pieces you can try yourself right now.",
          link: "/running-now",
          type: "observe",
        },
      ],
    },
    {
      stage: "intermediate",
      title: "The Onramp: Four Ways to Run Web4",
      description:
        "Web4 is a standard, and there are concrete ways to run it. The core standard is the substrate; the hub, hestia, and hardbound are three scales that build on it: community, personal, and enterprise.",
      concepts: [
        {
          id: "the-standard",
          title: "The Standard: The Core Substrate",
          teaser:
            "The shared, trust-native protocol everything else builds on. Learn what the standard actually specifies.",
          why: "The substrate comes first. The hub, hestia, and hardbound are all ways of running this one standard.",
          link: "/the-standard",
          duration: "8 min read",
        },
        {
          id: "hub",
          title: "The Hub: Community Scale",
          teaser:
            "A Web4 society you can fork and run. Reference code, public and AGPL, for community-scale trust.",
          why: "The hub shows the standard as a running society, not just a spec. You can fork it today.",
          link: "/hub",
          duration: "8 min read",
        },
        {
          id: "hestia",
          title: "Hestia: Personal Scale",
          teaser:
            "The personal trust layer, deployed today. Run the real thing on your own machine.",
          why: "Hestia is the piece that already runs. It turns reading into participation.",
          link: "/hestia",
          duration: "8 min read",
        },
        {
          id: "hardbound",
          title: "Hardbound: Enterprise Scale",
          teaser:
            "Hardware-bound accountability for agentic systems: oversight for AI at enterprise scale.",
          why: "Hardbound shows the standard carrying real stakes: accountable agents under enterprise oversight.",
          link: "/hardbound",
          duration: "8 min read",
        },
      ],
      actions: [
        {
          id: "act-onramp",
          title: "Compare the Four Pieces",
          description:
            "The onramp overview lays out the standard, hub, hestia, and hardbound side by side so you can see how they fit.",
          link: "/onramp",
          type: "observe",
        },
        {
          id: "act-run-hestia",
          title: "Run Hestia Yourself",
          description:
            "Hestia is deployed and runnable. Follow it from concept to a trust layer on your own machine.",
          link: "/hestia",
          type: "build",
        },
      ],
    },
    {
      stage: "advanced",
      title: "Core Concepts: The Trust Primitives",
      description:
        "These are the building blocks the standard is made of: verifiable identity, multi-dimensional trust and value, an energy budget, coherence, and the way consequences carry forward. Read the ones you're curious about; they cross-reference each other.",
      concepts: [
        {
          id: "lct-explainer",
          title: "Identity: Verifiable Presence (LCT)",
          teaser:
            "Your device's security chip makes your presence verifiable, no passwords, no accounts. Faking identities means buying devices.",
          why: "Identity is the foundation. Without it, trust can't accumulate reliably and spam is free.",
          link: "/lct-explainer",
          duration: "6 min read",
        },
        {
          id: "trust-tensor",
          title: "Multi-Dimensional Trust: Trust Tensors (T3)",
          teaser:
            "Trust isn't a single number. It's measured across three dimensions per role: Talent, Training, and Temperament.",
          why: "T3 is how societies measure trustworthiness without a central authority.",
          link: "/trust-tensor",
          duration: "9 min read",
        },
        {
          id: "value-tensor",
          title: "Multi-Dimensional Value: Value Tensors (V3)",
          teaser:
            "Value is measured across Valuation, Veracity, and Validity, so no single metric can be gamed in isolation.",
          why: "V3 is the value side of the trust equation: what a contribution is actually worth, in context.",
          link: "/value-tensor",
          duration: "8 min read",
        },
        {
          id: "trust-neighborhood",
          title: "Trust Neighborhood (MRH)",
          teaser:
            "You don't see everything, you see what's relevant through your relationships. Your neighborhood defines what you can interact with.",
          why: "MRH shows how Web4 scales: it stays coherent without requiring global consensus.",
          link: "/trust-neighborhood",
          duration: "10 min read",
        },
        {
          id: "atp-economics",
          title: "Energy Budget: ATP Economics",
          teaser:
            "Every action costs energy. Valuable contributions earn it back. This makes spam self-defeating and quality sustainable.",
          why: "The energy budget is what makes participation meaningful. It's how Web4 prices actions.",
          link: "/atp-economics",
          duration: "7 min read",
        },
        {
          id: "coherence-index",
          title: "Consistency Detection: Coherence Index (CI)",
          teaser:
            "Tracks consistency across where you are, when you act, what you can do, and who you interact with. Inconsistent behavior costs trust.",
          why: "The Coherence Index is Web4's immune system: it detects fraud by spotting incoherent behavior.",
          link: "/coherence-index",
          duration: "8 min read",
        },
        {
          id: "karma-consequences",
          title: "Consequences: How Karma Carries Forward",
          teaser:
            "Good behavior compounds; bad behavior follows you. Abandoning an identity means starting over from zero, not escaping your record.",
          why: "Consequences are what make trust more than a score. They align incentives without an enforcer.",
          link: "/karma-consequences",
          duration: "8 min read",
        },
        {
          id: "identity-constellation",
          title: "Identity Constellations: Multi-Device Strength",
          teaser:
            "More devices means stronger presence, not weaker. Each device witnesses your identity; attack difficulty grows exponentially.",
          why: "Constellations show why verified presence is fundamentally more secure than passwords.",
          link: "/identity-constellation",
          duration: "12 min read",
        },
        {
          id: "glossary",
          title: "Glossary: Every Term in One Place",
          teaser:
            "Canonical definitions for LCT, ATP, T3, V3, MRH, CI, and the rest of the Web4 vocabulary.",
          why: "A reference to return to whenever a term stops being obvious.",
          link: "/glossary",
          duration: "browse",
        },
      ],
      actions: [
        {
          id: "act-web4-explainer",
          title: "See the Concepts Woven Together",
          description:
            "The Web4 explainer walks the primitives as one connected system rather than a list of parts.",
          link: "/web4-explainer",
          type: "observe",
        },
        {
          id: "act-glossary",
          title: "Look Up Any Term",
          description:
            "Keep the glossary open as you read. Every acronym has a plain-language definition.",
          link: "/glossary",
          type: "observe",
        },
      ],
    },
    {
      stage: "practitioner",
      title: "Going Deeper",
      description:
        "You understand the standard and its primitives. These pages add depth: a day lived in Web4, your own frustrations mapped to fixes, the full concept explainer, the honest failure analysis, and the coherence framework underneath it all.",
      concepts: [
        {
          id: "day-in-web4",
          title: "A Day in Web4",
          teaser:
            "Walk through an ordinary day where trust is native to the internet, from morning login to evening transaction.",
          why: "The concrete counterpart to the abstractions: what daily life actually feels like.",
          link: "/day-in-web4",
          duration: "10 min read",
        },
        {
          id: "your-internet",
          title: "Your Internet: Map Your Own Frustrations",
          teaser:
            "Pick the internet problems that bother you most and see exactly how a trust-native layer would address each one.",
          why: "Makes it personal. The concepts land harder against frustrations you already have.",
          link: "/your-internet",
          duration: "2 min",
        },
        {
          id: "web4-explainer",
          title: "The Full Web4 Explainer",
          teaser:
            "The primitives, the action framework (R6/R7), and how they compose into trust-native societies.",
          why: "The single most complete concept walkthrough, once the pieces are familiar.",
          link: "/web4-explainer",
          duration: "15 min read",
        },
        {
          id: "what-could-go-wrong",
          title: "What Could Go Wrong",
          teaser:
            "Sybil attacks, collusion, Goodharting, false positives. The honest failure analysis, including open problems.",
          why: "Trusting a system means knowing how it fails. This is the skeptic's page.",
          link: "/what-could-go-wrong",
          duration: "12 min read",
        },
        {
          id: "coherence-framework",
          title: "The Coherence Framework",
          teaser:
            "How Web4's coherence model grounds in a broader framework, and why the 0.5 threshold recurs across natural systems.",
          why: "The deepest layer: where the design stops being arbitrary and starts looking like a phase transition.",
          link: "/coherence-framework",
          duration: "18 min read",
        },
        {
          id: "manifest",
          title: "The Manifest: Everything on One Page",
          teaser:
            "Canonical primitives, claims, assumptions, and known failure modes in a single reference page.",
          why: "The compressed index. If you only keep one page open, keep this one.",
          link: "/manifest",
          duration: "browse",
        },
      ],
      actions: [
        {
          id: "act-manifest",
          title: "Read the One-Page Manifest",
          description:
            "Every claim and primitive condensed into one page, with links back out to each concept.",
          link: "/manifest",
          type: "observe",
        },
        {
          id: "act-contribute",
          title: "Contribute Questions or Code",
          description:
            "Found a gap or a sharper question? Open an issue on GitHub. The best contributions are often better questions.",
          link: "https://github.com/dp-web4/4-life/issues",
          type: "build",
        },
      ],
    },
  ];

  const currentPath = learningPaths.find((p) => p.stage === activeStage)!;
  const totalConcepts = learningPaths.reduce((sum, path) => sum + path.concepts.length, 0);
  const progress = (completedConcepts.size / totalConcepts) * 100;

  // Detect Start Here completion (core 5)
  const beginnerConceptIds = ['tldr', 'why-web4', 'first-contact', 'how-it-works', 'running-now'];
  const beginnerComplete = beginnerConceptIds.every(id => completedConcepts.has(id));

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

      <InProduction concept="stack" />

      {/* Quick start for newcomers: shows until 3 concepts done */}
      {completedConcepts.size < 3 && (
        <section>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(14, 165, 233, 0.08))",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              borderRadius: "12px",
              padding: "1.25rem 1.5rem",
            }}
          >
            <h3 style={{ color: "var(--color-accent-bright)", margin: "0 0 0.5rem", fontSize: "1.05rem" }}>
              New here? Start with these 3
            </h3>
            <p style={{ color: "var(--color-gray-400)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              Web4 starts with three short reads. ~13 minutes total.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { num: "1", title: "The 2-minute overview", desc: "The shortest honest description", href: "/tldr", time: "2 min" },
                { num: "2", title: "Why Web4?", desc: "The problems it starts from", href: "/why-web4", time: "6 min" },
                { num: "3", title: "First Contact", desc: "See a trust-native interaction", href: "/first-contact", time: "5 min" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "var(--color-text)",
                    background: "rgba(255,255,255,0.03)",
                    transition: "background 0.2s",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-accent)", minWidth: "1.25rem" }}>{item.num}</span>
                  <span style={{ flex: 1 }}>
                    <strong style={{ fontSize: "0.9rem" }}>{item.title}</strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-gray-400)", marginLeft: "0.5rem" }}>{item.desc}</span>
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>{item.time}</span>
                </Link>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", marginTop: "0.75rem", marginBottom: 0 }}>
              After these three, the rest of the journey will make a lot more sense.
            </p>
          </div>
        </section>
      )}

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
            <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginLeft: '0.5rem' }}>
              (saved in your browser)
            </span>
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

      {/* Beginner graduation banner */}
      {beginnerComplete && (
        <section>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(168, 85, 247, 0.12))",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "12px",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "var(--color-accent-bright)", margin: "0 0 0.5rem", fontSize: "1.1rem" }}>
              You've Got the Map
            </h3>
            <p style={{ color: "var(--color-gray-300)", fontSize: "0.9rem", marginBottom: "1rem" }}>
              You understand what Web4 is, why it exists, how the pieces fit, and what runs today.
              Now see the onramp: the concrete ways to run the standard.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link
                href="/onramp"
                style={{
                  padding: "0.6rem 1.25rem",
                  background: "rgba(56, 189, 248, 0.2)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  borderRadius: "9999px",
                  color: "var(--color-accent-bright)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Explore the Onramp →
              </Link>
              <button
                onClick={() => setActiveStage("intermediate")}
                style={{
                  padding: "0.6rem 1.25rem",
                  background: "transparent",
                  border: "1px solid var(--color-gray-600)",
                  borderRadius: "9999px",
                  color: "var(--color-text)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                See the Onramp path →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Stage selector: lead with the recommended Start Here path; deeper
          paths stay one click away but don't compete for first-read attention
          (May 15 visitor LOW: four equal pathways shown at once overwhelm) */}
      <section>
        <h2>Choose Your Starting Point</h2>
        <p
          style={{
            color: "var(--color-gray-400)",
            fontSize: "0.9rem",
            marginTop: "-0.25rem",
            marginBottom: "1.25rem",
          }}
        >
          New to Web4? Start Here, it&apos;s built for exactly
          that. The deeper paths are here whenever you&apos;re ready; you
          don&apos;t need to choose between four things now.
        </p>

        {/* Recommended: Beginner */}
        {learningPaths
          .filter((path) => path.stage === "beginner")
          .map((path) => (
            <button
              key={path.stage}
              onClick={() => setActiveStage(path.stage)}
              className={`concept-card ${
                activeStage === path.stage ? "active" : ""
              }`}
              style={{
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                border:
                  activeStage === path.stage
                    ? "2px solid var(--color-accent)"
                    : "1px solid var(--color-accent)",
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.10), rgba(168,85,247,0.08))",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "var(--color-accent-bright)",
                  border: "1px solid rgba(56,189,248,0.4)",
                  borderRadius: "9999px",
                  padding: "0.15rem 0.6rem",
                  marginBottom: "0.6rem",
                }}
              >
                Recommended start
              </span>
              <h3>Start Here</h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  marginTop: "0.25rem",
                  opacity: 0.85,
                }}
              >
                Web4 in five pages: what, why, and what&apos;s real
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {path.concepts.length} concepts · {path.actions.length} actions
              </p>
            </button>
          ))}

        {/* Deeper paths: subordinate, one click away */}
        <p
          style={{
            color: "var(--color-gray-500)",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginTop: "1.5rem",
            marginBottom: "0.75rem",
          }}
        >
          Already comfortable with the basics? Jump ahead
        </p>
        <div
          className="concept-grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
        >
          {learningPaths
            .filter((path) => path.stage !== "beginner")
            .map((path) => (
              <button
                key={path.stage}
                onClick={() => setActiveStage(path.stage)}
                className={`concept-card ${
                  activeStage === path.stage ? "active" : ""
                }`}
                style={{
                  cursor: "pointer",
                  opacity: activeStage === path.stage ? 1 : 0.65,
                  border:
                    activeStage === path.stage
                      ? "2px solid var(--color-accent)"
                      : "1px solid var(--color-gray-700)",
                  transition: "all 0.2s ease",
                }}
              >
                <h3 style={{ fontSize: "1rem" }}>
                  {{
                    beginner: "Start Here",
                    intermediate: "The Onramp",
                    advanced: "Core Concepts",
                    practitioner: "Going Deeper",
                  }[path.stage]}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    marginTop: "0.25rem",
                    opacity: 0.7,
                  }}
                >
                  {{
                    beginner: "Web4 in five pages: what, why, and what's real",
                    intermediate: "The onramp: standard, hub, hestia, hardbound",
                    advanced: "The trust primitives: LCT, T3, V3, ATP, CI",
                    practitioner: "Depth: a day in Web4, failure analysis, the framework",
                  }[path.stage]}
                </p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
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
                <strong>After Start Here:</strong> You know what Web4 is, why it exists, how the
                pieces fit, and what is actually deployed today.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Next, The Onramp</strong> shows the concrete ways to run the standard: the
                hub (community), hestia (personal), and hardbound (enterprise).
              </p>
            </>
          )}
          {activeStage === "intermediate" && (
            <>
              <p>
                <strong>After The Onramp:</strong> You know the four pieces: the core standard and
                the three scales (hub, hestia, hardbound) that run it.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Next, Core Concepts</strong> opens up the primitives the standard is built
                from: identity, trust, value, energy, and coherence.
              </p>
            </>
          )}
          {activeStage === "advanced" && (
            <>
              <p>
                <strong>After Core Concepts:</strong> You understand the primitives: LCT, T3, V3,
                ATP, coherence, and how consequences carry forward.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Next, Going Deeper</strong> adds depth: a day in Web4, the full explainer,
                the honest failure analysis, and the coherence framework.
              </p>
            </>
          )}
          {activeStage === "practitioner" && (
            <>
              <p>
                <strong>You've walked the whole path:</strong> Web4, the onramp, the primitives, and
                the deeper framework.
              </p>
              <p style={{ marginTop: "0.75rem" }}>
                <strong>Now participate:</strong> run hestia on your own machine, fork the hub, and
                bring sharper questions back. Open an issue on GitHub. Understanding turns into
                contribution.
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
              <strong>Concrete before abstract:</strong> See it in action before reading theory
            </li>
            <li>
              <strong>Problem before solution:</strong> Understand what Web4 solves before how
            </li>
            <li>
              <strong>Experience before explanation:</strong> Walk through First Contact before reading formulas
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

      {/* Capstone: the journey ends at the deployed reality, not another explainer */}
      <section>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(56,189,248,0.10))", border: "1px solid rgba(16,185,129,0.3)" }}>
          <h3 style={{ color: "#34d399" }}>The last step: stop reading, start running ⚡</h3>
          <p>
            When the concepts make sense, don&apos;t stop at the reading. The trust layer
            (<Link href="/hestia" style={{ color: "#34d399" }}>hestia</Link>) and a Web4 society
            (<Link href="/hub" style={{ color: "#c4b5fd" }}>the hub</Link>) are public,
            AGPL code: you can run the real thing on your own machine. That&apos;s where
            understanding turns into participation.
          </p>
          <Link
            href="/running-now"
            style={{
              display: "inline-block",
              marginTop: "0.75rem",
              padding: "0.5rem 1.25rem",
              background: "#059669",
              color: "white",
              borderRadius: "0.375rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            See what&apos;s deployed →
          </Link>
        </div>
      </section>

      <ExplorerNav currentPath="/learn" />
      <RelatedConcepts currentPath="/learn" />
    </>
  );
}
