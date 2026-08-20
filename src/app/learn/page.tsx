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
}

interface ConceptNode {
  id: string;
  title: string;
  teaser: string;
  why: string; // Why learn this now?
  link: string;
  duration: string; // Estimated time
}

/* Aug-01 visitor MEDIUM 6: an `ActionNode[]` used to hang off every path, rendered under a
   "Practice Actions" heading that promised "these actions help you internalize understanding
   through participation", with INTERACTIVE / BUILD / EXPERIMENT type badges and a "Try it"
   button. Every single one linked to a page you read, and every path duplicated one of its
   own concepts as an "action": beginner listed /first-contact and /running-now (its own
   concepts 3 and 5), intermediate listed /hestia (its concept 3, and the link went to the
   explainer page, not the software), advanced listed /glossary (its concept 9), practitioner
   listed /manifest (its concept 6). Only the practitioner GitHub-issues link was an action
   at all, and the practitioner "What's Next?" copy below already offers it in prose.

   The visitor read the result and wrote: "Understanding emerges from participation, but there
   is nothing to participate in. Nothing is deployed. The page's closing line promises
   something the site can't deliver." Their premise is half wrong, which is why this is a
   deletion rather than a rewrite: participation DOES exist (hestia runs, the hub is forkable,
   both AGPL) and the capstone at the foot of this page already says so correctly. What did not
   exist was any of it here. The section was offering the reader, as "participation", the same
   pages the path above was already telling them to read. Removing it removes the overclaim at
   its source and leaves the one honest participation offer standing alone. */

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
          // Jul-29 visitor MEDIUM: "the 6-minute estimate on the reading path is not a
          // description of this page." /why-web4 ends in a large, open-ended FAQ (they
          // counted roughly 56 questions across 6 categories, spent 11 minutes, and skipped
          // five of the six). The page itself already labels the Q&A optional (why-web4:45-47),
          // so the defect was here, in the estimate. The digit 6 stays legible and unchanged:
          // tldr:291 pins "2+6+7+10+5 = 30 min" to these values (2+6+5+10+5 = 28 until the
          // Jul-30 first-contact correction) and says changing either number means changing
          // /learn too. Scope-only qualifier, deliberately not saying
          // what the 6 minutes buys - why-web4's own orientation box splits the body into
          // ~5 min + ~2 min, so "6 min for the problem statement" would manufacture a 6-vs-7
          // seam on the destination page. No question count is printed either; that would be
          // a new falsifiable number on a page whose FAQ grows.
          // The FAQ firehose itself (curation / accordion design pass) stays deferred; this
          // fixes the label, not the page it points at.
          duration: "6 min + optional Q&A",
        },
        {
          id: "first-contact",
          title: "First Contact: See It in Action",
          teaser:
            "A guided walkthrough of a trust-native interaction, so the ideas are concrete before they're abstract.",
          why: "Concrete before abstract. Seeing the flow once makes every later concept easier to place.",
          link: "/first-contact",
          // Jul-30 visitor LOW: "/first-contact says '7 minutes' where /learn budgets 5."
          // This card was the 5. /first-contact OWNS its own read time and states 7 on four
          // surfaces: grep -n "7 minutes" src/app/first-contact/ returns the rendered intro
          // ("In the next 7 minutes"), the arc header ("5 acts - ~7 minutes"), the file header
          // comment, and layout.tsx's metadata. (Aug-20: cited by line until now, and both line
          // numbers had already rotted, one of them twice, because the arc header moves whenever
          // that page reorders its pre-Start blocks. Named, not numbered
          // ([[guard-comment-cites-rot-name-the-target]]) - do not put line numbers back.)
          // This card carried the 5 with no rationale
          // of any kind, in contrast to the why-web4 card above whose 6 is defended at length.
          // Count reasons, not surfaces: the index moves, the owning page does not.
          // NOT measured. The Jul-30 visitor's own dwell on /first-contact was 13:30 to 19:00,
          // about 5.5 minutes, which is closer to the old 5 than to the 7. Nothing anywhere may
          // describe the 7 as observed; it is the page's own estimate and the site now agrees
          // with it in one place instead of contradicting it in two.
          // Changing this cascades, anchored by content because line numbers drift: the
          // reading-path box below (headed "The reading path: five pages, about 30 minutes",
          // both totals in its paragraph AND the `time` on its step-3 row), the "Read the
          // site in order (recommended)" card on /tldr (both totals), and the 'The Reading
          // Path' desc in navigation.ts. Aug-02: that box grew from three rows to five, so
          // the other four beginner durations now have a per-item copy there too.
          duration: "7 min",
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
          // Aug-13: BOTH sentences carried the hardware-required universal, and the first was
          // the load-bearing half. "makes your presence verifiable" asserted the chip as what
          // MAKES presence verifiable; under Q8 Ruling 1 (2026-08-05) presence is verifiable
          // without a chip, at a lower ceiling, so the repair is comparative ("harder to fake")
          // rather than constitutive. "Faking identities means buying devices" was the
          // consequence half. Both replaced with the destination page's own surviving claim:
          // lct-explainer (grep "accounts are cheap to create, but trust is not") and
          // why-web4 (grep "what hardware buys is a higher ceiling"), whose guard states the
          // form exactly: "the ceiling caps high-trust roles, it is not what admits you ...
          // it was always about the COST OF TRUST, not the cost of entry."
          // The destination was corrected Aug-07 and this teaser was not, which is the
          // /learn teaser-layer blind spot filed in WEB4-CANON-QUESTIONS. Test any rewording
          // against: it must be false of NO software-only user.
          teaser:
            "Your device's security chip makes your presence harder to fake, no passwords, no accounts. Identities stay cheap to create; what hardware buys is a higher ceiling on how far trust can climb.",
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
          // Aug-13: unscoped no-fresh-starts universal, and it contradicted the page it
          // advertises. The Aug-08 sweep scoped the destination (karma-consequences, grep
          // "Karma follows a hardware-anchored identity") but never touched its teaser.
          // Scoped per Q8 Ruling 1: canon forbids excluding the software-only tier, where the
          // record stays sheddable, so this is true of the hardware tiers only.
          teaser:
            "Good behavior compounds; bad behavior follows you. Where identity is anchored in hardware, abandoning it means starting over from zero rather than escaping your record.",
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
        {/* Aug-01 visitor MEDIUM 6, the same row as the reading-path box below. The visitor
            arrived from a /tldr card that told them something exact ("five pages, about 30
            minutes, and you have just finished the first") and hit "Guided Learning Journey /
            Learn Web4 Progressively / a curated learning pathway", which they read as "a step
            backwards in specificity from the page that sent me here". Same complaint, one
            section earlier, so it is fixed here too: the eyebrow and title now name the thing
            the linking page promised. The subtitle's "from first contact to active
            participation" went for the reason recorded above the ActionNode deletion near the
            top of this file; the honest version of that promise is the capstone at the foot of
            the page, and the subtitle now points at it instead of asserting it. */}
        <div className="hero-eyebrow">The Reading Path</div>
        <h1 className="hero-title">Read the Site in Order</h1>
        <p className="hero-subtitle">
          Web4 is complex, but comprehensible. Five pages get you from never
          having heard the term to knowing what runs today, and they are listed
          below in the order they build on each other. Deeper paths follow, for
          when you want them, and the last step is code you can run.
        </p>
      </section>

      <InProduction concept="stack" />

      {/* The reading path, in order. Shows until the whole five-page path is done.
          Aug-01 visitor MEDIUM 6: the gate used to be `completedConcepts.size < 3`, which
          matched a box that only listed three. Now that this box IS the page's answer to
          "what do I read, in what order", disappearing at 3 would send a reader who is
          mid-path back to the four-pathway selector as the first thing on the page. It
          ends when the path ends. */}
      {!beginnerComplete && (
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
              The reading path: five pages, about 30 minutes
            </h3>
            {/* Jul-28 (SUPERSEDED Aug-02, reasoning kept because the numbers still bind):
                this page has inbound routing from /tldr and from the top of the "Start Here"
                nav group, both of which name the five-page path. This box used to be headed
                "New here? Start with these 3" and list three of the five. The Jul-28 call was
                that stating the nesting ("these three ARE steps 1-3 of the path below") was
                enough to stop it reading as a competing answer to "how long is this?".

                REVERSAL (Aug-01 visitor MEDIUM 6). It was not enough. The visitor took /tldr's
                "Read the site in order (recommended)" handoff, which says "five pages, about
                30 minutes, and you have just finished the first" and names all five by title,
                and landed on a box whose STEP 1 IS /tldr, the page they had just closed. They
                demonstrably read this box (they clicked Why Web4? out of it and called it "the
                useful part of this page") and still filed /learn as "a step backwards in
                specificity from the page that sent me here", because the nesting sentence says
                the three are steps 1-3 of five without ever naming steps 4 and 5. The five-page
                list did exist, four sections down, past the hero, the maturity banner, the
                progress bar and the four-pathway selector. So the box now IS the five in order,
                and the 15-minute short version survives as a labeled stopping point inside it
                rather than as a competing list. Nothing was dropped; step 1 now says out loud
                that a reader arriving from /tldr has already done it.

                Jul-29 visitor MEDIUM (same friction row as the duration qualifier on the
                why-web4 card further down): step 2 ends in an open-ended FAQ that the 6
                minutes does not cover. The 6 stays and the "6 min" in the narrow right
                column below stays short, so the scope lands in this paragraph instead.
                This is also why the five items below are still hardcoded rather than derived
                from learningPaths[0].concepts: that card's duration string is "6 min +
                optional Q&A", which is exactly what this column may not render.

                Jul-30 visitor LOW, the first-contact estimate moved 5 -> 7 to match the page
                that owns it (see the first-contact card in the beginner path above for the
                reasoning and the full surface list). Both totals here are DERIVED, not
                independent claims: 2+6+7 = 15 and 2+6+7+10+5 = 30, summing the per-card
                durations above. If any card duration changes, recompute both here, in the
                "Read the site in order (recommended)" card on /tldr, and in the 'The Reading
                Path' desc in navigation.ts. Those three places are the complete set of TOTALS
                as of 2026-07-30: there is no JSON-LD anywhere in src/, sitemap.ts carries no
                durations, and no metadata or OG string carries a total.

                Aug-02 addition to that surface list: the five `time` literals in the array
                below are per-item COPIES of the five beginner concept-card durations. Adding
                steps 4 and 5 added copies of 10 and 5. A duration change now has to land in
                six places, not four: the owning concept card above, both totals here, this
                array's matching `time`, the /tldr card (both totals), and navigation.ts. */}
            <p style={{ color: "var(--color-gray-400)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              Five pages, in order, each building on the last. If you came here from the
              2-minute overview you have already finished step 1. The first three are the
              short version, about 15 minutes, if that is all the time you have. Why Web4?
              ends in an optional Q&amp;A that is open-ended; the estimate covers the read,
              not the questions.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[
                { num: "1", title: "The 2-minute overview", desc: "The shortest honest description", href: "/tldr", time: "2 min" },
                { num: "2", title: "Why Web4?", desc: "The problems it starts from", href: "/why-web4", time: "6 min" },
                { num: "3", title: "First Contact", desc: "See a trust-native interaction", href: "/first-contact", time: "7 min" },
                { num: "4", title: "How It Works", desc: "How the pieces connect", href: "/how-it-works", time: "10 min" },
                { num: "5", title: "What's Actually Running Now", desc: "What is deployed today, and what is not", href: "/running-now", time: "5 min" },
              ].map((item, idx) => (
                <div key={item.href}>
                  {idx === 3 && (
                    <p style={{ fontSize: "0.72rem", color: "var(--color-gray-500)", margin: "0.5rem 0 0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Short on time? Stop here (~15 min). Otherwise keep going.
                    </p>
                  )}
                  <Link
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
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", marginTop: "0.75rem", marginBottom: 0 }}>
              These five are the Start Here path below, expanded with a short note on why
              each one comes where it does. Other paths, for readers who already have the
              basics, are further down.
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
            {/* Aug-14 visitor LOW: "'0 / 24 concepts completed (0%)' appears with no explanation
                that I am the one who marks them. I briefly thought I was being tracked."
                Their literal suggestion ("mark these yourself as you go") would have shipped a
                falsehood: this counter is NOT self-marked only. The effect above merges saved
                localStorage progress with auto-completion derived from pagesVisited, so a reader
                who browsed the onramp first opens this page to a non-zero count they never
                touched, and their instinct was right, they ARE being tracked. What makes that
                benign is where it goes, not whether it happens: src/lib/exploration.ts is
                localStorage only, with no network call anywhere in it, and the repo has no
                analytics package at all (grep across src/ and package.json = 0).
                So the clause states both halves plus the destination. The old "(saved in your
                browser)" said where the data lives and never said who creates it, which is the
                half the visitor asked about; it is folded in rather than dropped.
                "some are ticked for you" is deliberately not "any page you open": only the slugs
                in the map above, reached through trackPageVisit, tick anything. */}
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '0.35rem' }}>
              You tick these off yourself with the Mark Done buttons below; some are ticked for
              you automatically, from pages you have already opened. Nothing is sent anywhere:
              the count is kept in this browser only.
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
              {/* Aug-01 visitor MEDIUM 6: this used to read "N concepts · M actions", and the
                  visitor named the shape ("counts like '5 concepts, 2 actions'") as part of why
                  this page reads as less specific than the /tldr section that sent them here.
                  The actions half is gone with the section it counted. A page count is the one
                  thing here that is checkable against the list it summarises; a time total is
                  deliberately not printed, because only the beginner path has an agreed one
                  (30 min, pinned across three surfaces) and minting three more would put three
                  new falsifiable numbers on a site whose numbers the same visitor said "don't
                  hold still". Not even the beginner path's agreed 30 is repeated here: the
                  reading-path box directly above already carries it, and a fourth copy would
                  widen the cascade list in that box's guard comment for no reader benefit. */}
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {path.concepts.length} pages
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
                {/* No time total on the deeper paths: see the note on the Start Here card above. */}
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  {path.concepts.length} pages
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
          {/* Aug-01 visitor MEDIUM 6: this opened "Understanding emerges from participation, not
              just observation", and the visitor read it as a promise the site cannot keep ("there
              is nothing to participate in. Nothing is deployed."). Half of that is wrong: hestia
              runs and the hub is forkable, both AGPL, and the capstone below says so. But the
              sentence asserted participation in the abstract while the section that used to sit
              above it offered, as "participation", four more pages to read. The section is gone;
              the sentence now names where participation actually is rather than claiming it here.
              Not deleted outright, which was the visitor's literal suggestion, because the claim
              is true of the site, just not of this page's middle. */}
          <p style={{ marginTop: "0.75rem" }}>
            <em>
              Reading is not the last step, but it is this page's step. When the concepts make
              sense, the code at the bottom of this page is the part you can actually run. Until
              then: mark concepts as done when they make sense, not when you&apos;ve read every
              word. Trust your intuition. Return when questions arise. Learning is non-linear.
            </em>
          </p>
        </div>
      </section>

      {/* Capstone: the journey ends at the deployed reality, not another explainer */}
      <section>
        <div className="detail-box" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(56,189,248,0.10))", border: "1px solid rgba(16,185,129,0.3)" }}>
          <h3 style={{ color: "#34d399" }}>The last step: stop reading, start running ⚡</h3>
          {/* Aug-12: the capstone of the whole learn path says "stop reading, start running"
              and "you can run the real thing on your own machine", then sent the reader to two
              page tops. Both links now land on the section that shows the commands. Both
              halves move together: the sentence makes the identical promise about each piece,
              so deep-linking one and not the other would leave the hub half undelivered. */}
          <p>
            When the concepts make sense, don&apos;t stop at the reading. The trust layer
            (<Link href="/hestia#how-to-touch-it" style={{ color: "#34d399" }}>hestia</Link>) and a Web4 society
            (<Link href="/hub#how-to-touch-it" style={{ color: "#c4b5fd" }}>the hub</Link>) are public,
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
