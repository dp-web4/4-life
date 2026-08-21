"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import { trackPageVisit } from "@/lib/exploration";
import InProduction from "@/components/InProduction";

/**
 * First Contact: Zero to Web4 Comprehension in 8 Minutes
 *
 * Philosophy:
 * - Show, don't tell: Run a simulation first, explain concepts as they appear
 * - Just-in-time learning: Explain ATP when you see it spent, explain trust when you see it change
 * - Narrative over data: Translate events into human stories
 * - Progressive revelation: Start concrete, build to abstractions
 * - HUMAN-CENTRIC: Focus on single-life trust/consequence dynamics that humans can relate to
 *
 * Goal: Someone with zero Web4 knowledge can run this, understand what they see,
 * and know where to go next - all in 7 minutes.
 */

type Step = "welcome" | "simulation" | "narrative" | "concepts" | "next-steps";

interface SimulationSnapshot {
  tick: number;
  action: string;
  atp_before: number;
  atp_after: number;
  trust_before: number;
  trust_after: number;
  reason: string;
  isWarning?: boolean;
  isSuccess?: boolean;
}

export default function FirstContactPage() {
  useEffect(() => { trackPageVisit('first-contact'); }, []);

  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [playbackIndex, setPlaybackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simplified simulation data - single life, human-relatable scenario
  // Alice is a content creator building reputation in a Web4 community
  const simulationSnapshots: SimulationSnapshot[] = [
    { tick: 0, action: "Join community", atp_before: 100, atp_after: 100, trust_before: 0.5, trust_after: 0.5, reason: "Alice joins with starter resources (100 ATP) and neutral trust (0.5)" },
    { tick: 1, action: "Quality post", atp_before: 100, atp_after: 92, trust_before: 0.5, trust_after: 0.52, reason: "Thoughtful contribution: costs 8 ATP but builds trust (+0.02)" },
    { tick: 2, action: "Help newcomer", atp_before: 92, atp_after: 87, trust_before: 0.52, trust_after: 0.55, reason: "Mentoring others: costs 5 ATP, trust rises (+0.03)", isSuccess: true },
    { tick: 3, action: "Receive upvotes", atp_before: 87, atp_after: 99, trust_before: 0.55, trust_after: 0.56, reason: "Community appreciates quality: earns 12 ATP back!", isSuccess: true },
    { tick: 4, action: "Spam attempt", atp_before: 99, atp_after: 74, trust_before: 0.56, trust_after: 0.48, reason: "Low-effort bulk posts: costs 25 ATP, trust drops sharply (-0.08)", isWarning: true },
    { tick: 5, action: "Trust warning", atp_before: 74, atp_after: 74, trust_before: 0.48, trust_after: 0.48, reason: "Trust below 0.5 threshold! Features restricted until trust recovers", isWarning: true },
    { tick: 6, action: "Thoughtful reply", atp_before: 74, atp_after: 70, trust_before: 0.48, trust_after: 0.50, reason: "Consistent quality rebuilds trust: costs 4 ATP, trust rises (+0.02)" },
    { tick: 7, action: "Quality post", atp_before: 70, atp_after: 62, trust_before: 0.50, trust_after: 0.53, reason: "Another valuable contribution: costs 8 ATP, trust continues rising" },
    { tick: 8, action: "Collaboration", atp_before: 62, atp_after: 55, trust_before: 0.53, trust_after: 0.58, reason: "Working with trusted member: costs 7 ATP, significant trust gain (+0.05)", isSuccess: true },
    { tick: 9, action: "Recognition", atp_before: 55, atp_after: 80, trust_before: 0.58, trust_after: 0.62, reason: "Community recognition for consistent quality: earns 25 ATP, trust boost", isSuccess: true },
    { tick: 10, action: "Established", atp_before: 80, atp_after: 80, trust_before: 0.62, trust_after: 0.62, reason: "Alice is now a trusted community member with sustainable reputation", isSuccess: true },
    // Life continues - what happens when things go wrong
    { tick: 11, action: "Overcommit", atp_before: 80, atp_after: 35, trust_before: 0.62, trust_after: 0.58, reason: "Alice takes on too many projects at once. Each costs ATP, and spreading thin hurts quality.", isWarning: true },
    { tick: 12, action: "Quality slips", atp_before: 35, atp_after: 12, trust_before: 0.58, trust_after: 0.51, reason: "Rushed work gets poor reviews. ATP drains, trust falls. The crisis spiral begins.", isWarning: true },
    { tick: 13, action: "ATP exhaustion", atp_before: 12, atp_after: 0, trust_before: 0.51, trust_after: 0.51, reason: "No energy left to contribute. ATP hits zero - Alice's entity dies. But her record persists.", isWarning: true },
    // Rebirth with karma carry-forward
    { tick: 14, action: "Rebirth", atp_before: 0, atp_after: 112, trust_before: 0.51, trust_after: 0.54, reason: "New life begins! Good karma carries forward: 112 ATP (a starting bonus above the usual 100 - the trust she built carries forward as karma) and 0.54 trust (above the 0.50 neutral baseline). Past lessons remembered.", isSuccess: true },
    { tick: 15, action: "Wiser choices", atp_before: 112, atp_after: 104, trust_before: 0.54, trust_after: 0.57, reason: "Armed with experience, Alice paces herself - focused quality over volume. Trust rises faster than her first life.", isSuccess: true },
  ];

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      // Reset to start if at end
      if (playbackIndex >= simulationSnapshots.length - 1) {
        setPlaybackIndex(0);
      }
      setIsPlaying(true);
      // Clear any stale interval before starting a new one
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setPlaybackIndex(prev => {
          if (prev >= simulationSnapshots.length - 1) {
            stopPlayback();
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
  };

  const currentSnapshot = simulationSnapshots[playbackIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <Breadcrumbs currentPath="/first-contact" />

        {/* Fallback for visitors without JavaScript */}
        <noscript>
          <div style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '12px', padding: '2rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#38bdf8' }}>First Contact: Your First Web4 Experience</h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              This experience works best with JavaScript enabled. Here&apos;s the full story:
            </p>

            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#e2e8f0', marginBottom: '1rem' }}>Alice Joins a Web4 Community</h2>

            <div style={{ borderLeft: '3px solid #334155', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#cbd5e1', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                Alice starts with <strong style={{ color: '#38bdf8' }}>100 energy</strong> - called <abbr title="Allocation Transfer Packets" style={{ color: '#38bdf8', textDecoration: 'none' }}>ATP</abbr> (<em>Allocation Transfer Packets</em>, the energy budget she spends to act) - and <strong style={{ color: '#10b981' }}>neutral trust (0.50)</strong>. Every action she takes costs energy. Every contribution builds (or burns) trust.
              </p>

              <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1rem', fontSize: '0.875rem', fontStyle: 'italic' }}>
                Why 0.50? It&rsquo;s the neutral starting point - Alice hasn&rsquo;t earned trust yet, but she hasn&rsquo;t lost it either. Starting at 0 would mean &ldquo;guilty until proven innocent&rdquo;; starting at 1.0 would hand out a blank check. 0.50 says &ldquo;prove yourself.&rdquo;
              </p>

              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Step 1 - Quality post:</strong> Alice writes a thoughtful contribution. It costs 8 ATP but her trust rises to 0.52. Recipients who find it valuable confirm the quality - a simple thumbs-up saying &quot;this was genuinely useful&quot; is what earns Alice her reward. (In Web4, these confirmations are called <em>attestations</em> - signed receipts that can&apos;t be faked.)
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Step 2 - Helping a newcomer:</strong> She mentors someone new. Costs 5 ATP, but trust jumps to 0.55. Generosity pays.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#10b981' }}>Step 3 - Earning recognition:</strong> People upvote her earlier work. She earns 12 ATP back - more than she spent. Quality content pays for itself.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#f59e0b' }}>Step 4 - A mistake:</strong> Alice tries spamming low-effort posts. It costs 25 ATP and her trust drops to 0.48 - below the threshold. Features are restricted.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Step 5 - Recovery:</strong> She returns to thoughtful replies. Trust slowly rebuilds to 0.50. The system doesn&apos;t ban her - it lets consequences teach.
              </p>
              {/* Jul-27: /how-it-works and /glossary now both send readers HERE for the canonical
                  two-death rule, so the block needs to be anchor-linkable. This page had zero id
                  anchors before now (same structural gap as /running-now pre-#487). */}
              <div id="what-triggers-death" className="scroll-mt-24" style={{ background: '#1e1b2e', border: '1px solid #7c3aed44', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <strong style={{ color: '#c4b5fd' }}>What triggers death?</strong>
                {/* Jul-8 visitor HIGH: this sentence said "drops below 0.5" bare while Step 4/5 show
                    Alice at 0.48 recovering - one of three conflicting rule statements across
                    First Contact / Karma Journey / Aliveness. Canonical rule sentence below is
                    IDENTICAL on all three pages - keep it verbatim if editing.
                    Jul-9 visitor HIGH: the Jul-8 version was read and STILL produced "First Contact says
                    0.5 is an access threshold, Aliveness says it's a death threshold." The missing piece
                    was never dip-vs-sustained (that was there) - it was that ONE line has TWO consequences
                    at TWO timescales. Plus "raw" vs effective (raw × CI²). Both now in the canonical text.
                    Aug-07 (15:00): the tail clause CHANGED, so re-sync before comparing to an older copy.
                    It used to read "- effective trust sets your karma tier, not whether you live". "Karma
                    tier" was an orphan: asserted on six surfaces, defined on none, zero hits in canon
                    (`grep -rni karma ../web4/web4-standard/` returns nothing), and sourced by the guard on
                    this page's own Act-5 "Karma carries forward" card (`grep -n "karma-journey's karma-tier"`)
                    to /karma-journey, a route RETIRED in the Jul-15 rebuild. Replaced with the positive
                    half the site was already shipping correctly on /coherence-index, which attributes cost
                    and access to CI (cost is 1/CI², a function of CI alone - effective trust does NOT set
                    cost, so do not reintroduce that phrasing).
                    CITE BY ANCHOR, NOT LINE NUMBER (Aug-08). Every ordinal this guard family used went
                    stale the moment these comment blocks were inserted above the prose they named - each
                    by exactly the number of lines inserted above it. Quote the phrase instead; it survives
                    any insertion and a reader can grep it.
                    THE CANONICAL TAIL is "narrows your access; it does not push you toward trust death",
                    byte-identical modulo styling and Alice's name across six surfaces. Resolve with:
                      grep -rnE "narrows (your|her) access" src/app
                    - first-contact x2: the Step-5 aside below, and the Step-6 recap, which is THIRD
                      PERSON ("narrows her access") - that is why the regex unions your|her.
                    - how-it-works, glossary, lct-explainer: x1 each.
                    - coherence-index: TWO hits expected - the prose, plus the guard above it quoting the
                      same words. The prose is the source; propagate from it, never from the comment.
                    Grep the SHORT fragment, never the whole sentence: it wraps across JSX lines on
                    glossary and lct-explainer, so a whole-sentence grep returns 0 there and under-reports.
                    /karma-consequences reuses the sentence but deliberately STOPS at "a single
                    stumble" - that page never mentions CI, so the raw-vs-effective clause has nothing to
                    disambiguate there. That truncation is intentional, not drift.
                    Aug-10 visitor LOW: "a squared unknown is a bad first impression of a formula" -
                    this sentence uses CI before the page names it (the CI card is ~200 lines below).
                    The gloss was APPENDED AFTER the locked sentence, and on the Step-6 recap it went
                    into that box's own preamble ("the coherence multiplier, CI"). Neither edit
                    touches a locked byte, so `grep -rnE "narrows (your|her) access" src/app` still
                    returns the same six hits and the other four surfaces are unchanged. If you ever
                    need to say this INSIDE the sentence, you are desyncing six pages: don't. */}
                {/* AUG-20: the recoverability sentence in this <noscript> rider was replaced on all FOUR
                    rider surfaces in one pass (cause-framed -> score-framed). Q1 tail untouched;
                    cross-surface identity preserved by editing the four together. Do not edit it here
                    alone. Rationale: `grep -n "AUG-20 visitor HIGH #1" src/app/how-it-works/page.tsx`. */}
                <span style={{ color: '#94a3b8' }}> Two paths: <strong style={{ color: '#f87171' }}>ATP hits zero</strong> (energy death - you can&apos;t act anymore) or <strong style={{ color: '#f87171' }}>raw trust falls below 0.5 and stays there</strong> (trust death - the community no longer trusts you). Which one you can come back from is not decided by which of them fired: recoverable if you built trust, permanent if not. A trust death is that check failing - a destroyed reputation can&apos;t be reset. One line, two consequences: <em>crossing</em> below 0.5 restricts your features right away and is recoverable; only <em>staying</em> below it is fatal - a sustained collapse, not a single stumble. The number compared is <strong>raw</strong> trust, not effective trust (raw &times; CI&sup2;). A lower CI raises your costs and narrows your access; it does not push you toward trust death. That&apos;s why Alice&apos;s 0.48 in Step 4 restricted her instead of killing her: she crossed the line, she didn&apos;t stay below it. <em style={{ color: '#64748b' }}>(CI is the coherence index: how consistent your behavior looks across time, devices and contexts. It gets its own card further down this page.)</em></span>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#f87171' }}>Step 6 - Death:</strong> Alice overcommits, quality slips, ATP drains to zero. Her entity dies - but her record persists.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#34d399' }}>Step 7 - Rebirth:</strong> Good karma carries forward. Alice is reborn with 112 ATP (a starting bonus above the usual 100 - the trust she built carries forward as karma) and 0.54 trust (above the 0.50 neutral baseline). Past lessons compound.
              </p>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem' }}>
                <strong style={{ color: '#38bdf8' }}>The lesson:</strong> Spam dies because it costs more than it returns. Trust builds through consistent quality. Mistakes have real consequences - but recovery is possible. Death is real (ATP hits zero), but good karma carries forward into new lives. No moderators needed to police spam. The economics do that work; people still settle disputes.
              </p>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.875rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              Continue learning:
              <a href="/atp-economics" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>ATP Economics</a> &middot;
              <a href="/trust-tensor" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>Trust Tensors</a> &middot;
              <a href="/day-in-web4" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>A Day in Web4</a> &middot;
              <a href="/why-web4" style={{ color: '#38bdf8', marginLeft: '0.5rem' }}>Why Web4?</a>
            </p>
          </div>
        </noscript>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Your Progress</span>
            <span className="text-sm text-gray-400">
              {({ welcome: "Welcome", simulation: "Alice\u2019s Story", narrative: "What Happened", concepts: "Key Concepts", "next-steps": "Next Steps" } as Record<string, string>)[currentStep]}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-sky-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(["welcome", "simulation", "narrative", "concepts", "next-steps"].indexOf(currentStep) + 1) * 20}%`
              }}
            />
          </div>
        </div>

        {/* Step: Welcome */}
        {currentStep === "welcome" && (
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="text-sm uppercase tracking-wide text-sky-400">
                  First Contact
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-300 bg-emerald-500/10 border border-emerald-500/40 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true"></span>
                  Interactive · you drive it
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
                Your First Web4 Experience
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-4">
                Today's internet rewards spam, lets trolls create unlimited accounts, and makes quality creators compete with bots. What if the system itself made that impossible? Web4 is one proposed answer, and what follows is a guided walkthrough of that idea, not a finished product.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-3">
                In the next 7 minutes, <strong className="text-gray-200">you&apos;ll drive Alice&apos;s choices</strong> - play, pause, scrub, replay - and watch trust and reputation respond in real time. The rules running here are real; Web4 itself is still active research, with no live network to join yet.
              </p>
              {/* This sentence narrates the page's OWN order, so it rots whenever a pre-Start
                  block moves. Aug-20: the five-act arc moved below the Start button (see the
                  storyboard guard, grep -n "Storyboard: 5-beat"), so "and the five-act arc" was
                  false here and is now stated as a pointer under the button instead.
                  NET WORDS DOWN, not up (47 -> 43 in this sentence), which is required: this
                  screen carries three density guards (May-15 vocab wall, Jul-13 collapse, Jul-17
                  pre-Start caveat pile-up) and the Aug-19 visitor asked for everything before
                  Start to be SHORTER ([[density-guard-means-delete-not-caveat]]).
                  What paid for the pointer: "no need to memorize them; each is explained in the
                  story the moment Alice uses it" was a restatement of the four-ideas <summary>
                  ~15 lines below ("A reference map, not a quiz - you don't need to memorize these.
                  Each one is explained in the story the moment Alice runs into it."). The claim
                  did not lose a surface; it lost a duplicate, and it still ships attached to the
                  element it describes. Do not re-expand it here.
                  "endings included" is deliberate and is half the fix: the Aug-19 MEDIUM is that
                  the arc spoils the walkthrough, so a reader routed to it must be told before
                  they follow the pointer, not after. */}
              <p className="text-sm text-gray-500 leading-relaxed italic">
                Haven&apos;t read anything else on this site yet? You don&apos;t need to - this page starts from zero. Below: the two numbers to watch, then an optional reference map of the four ideas (collapsed - you don&apos;t need to memorize them). Then click <span className="not-italic font-semibold text-gray-300">Start</span> to drive Alice yourself - no account, no sign-in. The five-act arc, endings included, is mapped under the button.
              </p>
            </div>

            <InProduction concept="stack" />

            {/* Jul-1 visitor MEDIUM: the hero hammers "this is a simulation" and the green banner
                directly above says hestia + the hub are "deployed in public" - the visitor
                "genuinely couldn't tell whether I'm looking at a simulation or live infrastructure."
                Disambiguate LOCALLY (the shared InProduction copy is accurate and used elsewhere):
                the sim you drive here MODELS the deployed system; it is not that system running.
                Jul-14 visitor LOW: the banner + this paragraph together read as a ~200-word speed
                bump right before Alice's story ("I came to this page to watch Alice… I skimmed it.
                A one-liner with a 'more' expander would have served me fine."). Keep BOTH halves of
                the Jul-1 disambiguation visible in the one-liner (sim here / hestia+hub real and
                separate); the elaboration folds behind the visitor's own suggested expander. */}
            <details className="-mt-3 mb-6 text-xs text-gray-500">
              <summary className="cursor-pointer leading-relaxed list-none hover:text-gray-400 transition-colors">
                To be clear about those two things: <strong className="text-gray-400">what you drive
                on this page is a guided walkthrough</strong>, running in your browser;{" "}
                <strong className="text-gray-400">hestia</strong> and{" "}
                <strong className="text-gray-400">the hub</strong> (the green banner) are the{" "}
                <em>separate, real</em> system it models - not something executing inside this
                walkthrough. <span className="underline decoration-dotted">more ▸</span>
              </summary>
              <p className="mt-2 leading-relaxed">
                The walkthrough is a model with nothing deployed and nothing to sign up for. hestia
                and the hub are public AGPL code you could run yourself (though there&apos;s no live
                network of real users to join yet). You don&apos;t need to track these two names to
                follow Alice&apos;s story - they&apos;re here only so the green banner above
                isn&apos;t a mystery.
              </p>
            </details>

            {/* Two-number anchor moved ABOVE the concept grid - May 15 visitor LOW:
                this concrete anchor "rescued" the page; the four-acronym grid felt
                like a vocab wall when it came first. Lead with the two numbers. */}
            <div className="bg-gray-900/60 border border-gray-700/60 rounded-xl p-5">
              <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">Before you start - reading Alice&apos;s panel</div>
              <p className="text-sm text-gray-400 mb-3">Only two numbers move while she acts. This is all you need to follow the story:</p>
              <ul className="text-sm text-gray-300 space-y-2">
                {/* Aug-19 visitor HIGH #1: "the two-number tutorial contradicts itself". This
                    bullet said only "she can't act"; the Act-5 chip says "dies at ATP 0". (As
                    filed, that chip was four screens down and above the Start button. Aug-20 moved
                    the whole rail BELOW the button, still on the welcome step, so it is now
                    further from this bullet, not nearer: the reason this bullet must carry the
                    vocabulary itself got stronger, not weaker.)
                    The reader concluded energy is a pause and trust is the fatal one, then
                    met "dies" and could not tell which was true.
                    The vocabulary that resolves it ("energy death, recoverable through karma
                    rebirth" / "trust death, permanent") already ships on this page THREE times and
                    a pre-Start reader can reach none of them: once in the <noscript> block (grep
                    -n "Two paths:"), and twice behind the Start button (the Step-5 death panel and
                    the "Death is Real" recap): [[page-ships-the-answer-and-denies-it]], the answer
                    is here and the reader cannot get to it.
                    SHARPER THAN FILED, and this is what decides the fix. The term "trust death" IS
                    used pre-Start, in the "Why raw?" details in this same box ("it does not push
                    her toward trust death"), undefined, while "energy death" appears nowhere. So
                    the reader meets one half of a named pair with no definition and the other half
                    described without its name. The gap is the NAMING, not an explanation
                    ([[visitor-read-it-and-still-filed-it]]).
                    LANDED AS PARENTHETICALS INSIDE THE TWO EXISTING BULLETS, deliberately, and do
                    not promote either to a sentence, a third <li>, or a box. This panel carries
                    three density guards (May-15 vocab wall, Jul-13 collapse, Jul-17 pre-Start
                    caveat pile-up cited below) and this same visitor's assessment asks for
                    everything before Start to be SHORTER ([[density-guard-means-delete-not-caveat]]).
                    Net addition is ten words across both bullets, and the box's "only two numbers
                    move" promise is untouched: no third quantity is introduced, both names attach
                    to numbers already in the list.
                    Wording PROPAGATED, not re-coined, from the <noscript> copy ("Energy death is
                    recoverable through karma rebirth", "Trust death is permanent")
                    ([[propagate-the-sentence-not-your-summary]]).
                    Prints NO numeral and makes NO regional claim about 0.50 in either direction, so
                    the ENDPOINT RULE guard below is satisfied by construction (ledger Q1).
                    AUG-20, AND THIS IS THE INTERESTING PART: the phrase propagated here the day
                    before ("recoverable through karma rebirth") is exactly what the Aug-20 visitor
                    filed as their top HIGH. Propagating faithfully is not the same as propagating a
                    TRUE sentence: the source string attached recoverability to the CAUSE, and the
                    rule is that the SCORE decides ([[fix-may-commit-the-defect-it-diagnoses]]).
                    Re-said as "recoverable if she built trust", which is /atp-economics's
                    conditional, costs ONE net word against the three density guards above, stays a
                    parenthetical inside the existing bullet, introduces no third quantity, and
                    still prints no numeral. The naming fix this guard was written for is intact:
                    "energy death" is still named here and "trust death" still in the bullet below.
                    Class guard: `grep -n "AUG-20 visitor HIGH #1" src/app/how-it-works/page.tsx`. */}
                <li><span className="text-sky-300 font-semibold">🔋 Energy Budget (ATP)</span> - the resource Alice spends to act. Starts at <span className="text-gray-200">100</span>; goes down when she posts, up when others confirm her work was valuable. If it hits 0, she can&apos;t act (<strong className="text-gray-200">energy death</strong>, recoverable if she built trust).</li>
                {/* Jul-9 visitor HIGH: this line taught "0.5 = access threshold" and Aliveness taught
                    "0.5 = death threshold", and the visitor never reconciled them. Name the second
                    consequence here, where the first one is introduced.

                    ENDPOINT RULE - both directions are forbidden, not just one.
                    Whether exactly-0.50 counts as alive / full-access is an unresolved canon call
                    (> vs >= in the retired aliveness engines; ledger Q1/Q8). The site's policy is
                    "state strictly-below and stop". So do NOT write EITHER of:
                      - "at or above 0.50" / ">= 0.50 is fine"   (asserts the >= side)
                      - "above 0.50: full access"                (asserts the > side, because its
                                                                  complement puts exactly-0.50
                                                                  outside full access)
                    Any regional claim about 0.50, in either direction, re-arms the escalation.

                    Aug-06 visitor HIGH: this bullet carried "Above 0.50: full access" for a month,
                    written four lines under the older version of this guard, which enumerated only
                    the ">=" phrasing and so read as permission for the other one. The visitor found
                    three phrasings across the site and could not tell which applied to them; the
                    other two ("crossing below restricts", "minimum bar") are endpoint-silent, so
                    this clause was the sole offender. DELETED, not rewritten: removing a prohibited
                    assertion is not asserting its negation, it restores the silence the policy asks
                    for (precedent: lct-explainer:1404-1406, PR #497).
                    Do NOT patch the resulting gap by borrowing lct-explainer's non-asserting
                    welcome ("at every tier you can post, earn ATP..."). That sentence is about a
                    hardware CEILING; the 0.50 here is Alice's dynamic STARTING score. Wrong referent.
                    KEPT deliberately: the Recovery section's "Trust climbed back above 0.5,
                    restrictions lifted" (~L733). That narrates Alice's trajectory from 0.48, it does
                    not state a regional rule, so it is not an endpoint claim. Do not re-open it. */}
                <li><span className="text-purple-300 font-semibold">🤝 Trust Score</span> - her <em>raw</em> reputation, on a <span className="text-gray-200">0.00-1.00</span> scale. One number, but a rolled-up one: it is her three trust dimensions weighted for the role she is acting in (<Link href="/trust-tensor" className="text-purple-300 hover:underline">Trust Tensors</Link>). Starts neutral at <span className="text-gray-200">0.50</span>. Below 0.50: features get restricted until she rebuilds it - and if she <em>stays</em> below, that same line becomes fatal (<strong className="text-gray-200">trust death</strong>, permanent) - a sustained slide, not one dip.</li>
              </ul>
              {/* Aug-15 visitor HIGH: "the whole walkthrough quietly assumes something it never
                  tells you ... The words hardware, chip, TPM, ceiling, and software-only do not
                  appear anywhere on the First Contact page. I checked. Alice's tier is never
                  stated. I walked away from page 3 of 5 believing a story that does not apply to
                  the tier I would actually be on if I installed anything today."
                  Verified before writing: zero renders of any of those five words on this page (all
                  grep hits were guard comments), while /lct-explainer states that a software-only
                  setup "stays at 0.50 however many devices it spans". Alice reaches 0.62. Her tier
                  is therefore FORCED by the site's own ceiling rule, and only this page, the one
                  that dramatizes the climb, never said which tier it was showing.
                  WHY THIS SENTENCE CONTAINS NO NUMBER, and do not "complete" it with one. Ledger Q1
                  (is exactly-0.50 alive / full access) is unresolved and the site's policy is to
                  state strictly-below and stop. The bullet directly above already carries the
                  fatal-line clause; a ceiling numeral placed beside it lets a reader derive a
                  status for a software-only identity sitting exactly at the line, which is Q1
                  answered by adjacency. That is not hypothetical: the ENDPOINT RULE guard above
                  records three deletions of assertions written into this very panel, and the same
                  visitor's Unanswered Question 5 asks precisely that derived question. So the
                  ceiling is stated qualitatively ("tops out lower") and the argument is ROUTED, not
                  re-argued, to the two places the site has designated for it.
                  SHAPE PROPAGATED from /karma-consequences (grep -n "That holds for a
                  hardware-anchored agent"), which solved this exact problem for its own
                  walkthrough: name the tier, disclaim the walkthrough's scope, import no number.
                  Not that page's words, whose subject is a shed record, but its structure.
                  PLACEMENT is deliberate: a static line at the foot of the panel, not a third <li>
                  (the Jul-29 guard below keeps this box's "only two numbers move" promise) and not
                  inside the collapsed concept map further down, where a guard bars a tier caveat on
                  density grounds. A collapsed aside would under-weight a HIGH
                  ([[two-fixes-one-page-needs-own-home]]). */}
              <p className="text-xs text-amber-300/70 mt-3 leading-relaxed">
                <strong className="text-amber-300">Whose identity this is:</strong> the walkthrough
                follows a hardware-anchored identity. How far trust can climb depends on how an
                identity is anchored, and anchoring in software alone tops out lower, so Alice&apos;s
                climb is not the shape every tier sees.{" "}
                <Link href="/lct-explainer#software-only-survival" className="text-amber-300 hover:text-amber-200 underline">
                  What a software-only ceiling costs
                </Link>{" "}
                and{" "}
                <Link href="/what-could-go-wrong#risk-accessibility" className="text-amber-300 hover:text-amber-200 underline">
                  the equity question it raises
                </Link>
                .
              </p>
              {/* Jul-29 visitor MEDIUM: "raw" appeared exactly once in the JS-rendered page, here,
                  undefined. The raw-vs-effective sentence lived only in the <noscript> block above
                  (L156), so a reader with JavaScript on never saw it: "Raw as opposed to what?
                  Nothing on the page answers that."
                  Deliberately a collapsed aside, NOT a third clause in the bullet. This box's own
                  promise is "only two numbers move" and it already carries two vocab-wall guards
                  (May-15 LOW above, Jul-13 MEDIUM below). The role-weighted roll-up went inline
                  because that is the filed friction; raw-vs-effective is the secondary half.
                  Sentence is the canonical one from L156 - keep it in sync if either moves. */}
              <details className="mt-3">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 select-none">Why &ldquo;raw&rdquo;? <span className="text-gray-600">(optional)</span></summary>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Raw trust is the score before the coherence multiplier, CI (the coherence index),
                  is applied. The number
                  compared against 0.50 is <strong className="text-gray-300">raw</strong> trust, not
                  effective trust (raw &times; CI&sup2;). A lower CI raises Alice&apos;s costs and
                  narrows her access; it does not push her toward trust death.
                </p>
              </details>
            </div>

            {/* Jul-13 visitor MEDIUM (recurring acronym density, structural pass): this map
                front-loaded ATP/T3/LCT/CI shorthand BEFORE the story, contradicting the page's own
                promise that each idea is explained the moment Alice uses it. May-15 reordered (the
                two-number anchor above stays leading and visible); Jul-13 recurred the vocab wall →
                default-collapsed. The cards inside are unchanged - don't reword the glosses.
                Aug-08 addendum: the Consequences gloss WAS narrowed, for correctness, not style.
                It asserted "your presence is hardware-bound ... Bad actors can't walk away clean",
                a universal that Q8 Ruling 1 (2026-08-05) makes false: software-only anchoring is
                conformant and canon forbids excluding the tier. The absolute was DELETED and
                "hardware-bound" scoped to "hardware-anchored"; nothing was added, and the card got
                shorter. The no-reword guard above stands on density grounds (Jul-13 vocab wall,
                Jul-17 pre-Start caveat pile-up) and Ruling 1 does not reverse it, so do NOT hang a
                tier caveat here - the argument lives on /karma-consequences, which this card links
                to, and at /what-could-go-wrong#risk-accessibility. */}
            <details className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 group">
              <summary className="cursor-pointer list-none">
                <h2 className="text-2xl font-bold mb-1"><span className="text-sm text-sky-400 inline-block transition-transform group-open:rotate-90 mr-2 align-middle">▶</span>The four ideas behind it <span className="text-sm text-gray-500 font-normal">(optional)</span></h2>
                <span className="text-sm text-gray-400 block">A reference map, not a quiz - you don&apos;t need to memorize these. Each one is explained in the story the moment Alice runs into it. Open for a preview, or skip straight to <span className="font-semibold text-gray-300">Start</span> and come back.</span>
              </summary>
              <div className="grid md:grid-cols-2 gap-6 mt-5">
                <div>
                  <Link href="/atp-economics" className="text-sky-400 font-semibold mb-2 block hover:underline">🔋 Energy Budget</Link>
                  <p className="text-gray-400">
                    Every action costs energy. Recipients who benefit confirm quality - that&apos;s what earns energy back. Spam burns out. (Shorthand: <strong>ATP</strong> - Allocation Transfer Packets.)
                  </p>
                </div>
                <div>
                  <Link href="/trust-tensor" className="text-purple-400 font-semibold mb-2 block hover:underline">🤝 Trust: Your Reputation</Link>
                  <p className="text-gray-400">
                    Trust builds through consistent quality, and it is scored per role: your trust as a reviewer is tracked separately from your trust as a cook. (Shorthand: <strong>T3</strong> - three dimensions: talent, training, temperament.)
                  </p>
                </div>
                <div>
                  <Link href="/karma-consequences" className="text-green-400 font-semibold mb-2 block hover:underline">📜 Consequences: Permanent Record</Link>
                  <p className="text-gray-400">
                    Your record follows your presence, which is anchored to a device (called an <strong>LCT</strong> - Linked Context Token). Good behavior compounds.
                  </p>
                </div>
                <div>
                  <Link href="/coherence-index" className="text-orange-400 font-semibold mb-2 block hover:underline">🔍 Consistency: Behavior Proves Identity</Link>
                  <p className="text-gray-400">
                    Consistent behavior across time, devices, and contexts reveals who&apos;s real. Bots and fakes can&apos;t sustain coherent patterns. (Shorthand: <strong>CI</strong> - coherence index.)
                  </p>
                </div>
              </div>
            </details>

            <button
              onClick={() => setCurrentStep("simulation")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all text-lg"
            >
              Start the 5-act Walkthrough &rarr;
            </button>

            <p className="text-center text-sm text-gray-500">
              Step 1 of 5 · Walkthrough · Story · Concepts · Next Steps
              <span className="block mt-1 text-xs">You can pause, scrub, replay, and skip ahead. Nothing is saved and there&apos;s no account - you&apos;re following a guided walkthrough of the proposed model, not using a product.</span>
            </p>

            {/* Storyboard: 5-beat map of Alice's full arc.
                It used to read "a preview ... so visitors see what they're signing up for", and it
                used to render immediately ABOVE the Start button. Aug-19 visitor MEDIUM 5 is that
                those two facts fight: "The five-act preview prints Act 5's outcome (dies at ATP 0,
                +12 bonus, reborn at 0.54) before you press Start, spoiling the walkthrough it is
                previewing", and, in the same log's assessment, "By the time I reached Start I had
                already been told the ending ... Everything in front of the Start button should be
                shorter and consistent with itself." Two halves: the SPOILER and the RUN-UP.

                MOVED BELOW THE BUTTON, intact. Read the next four paragraphs before undoing this,
                because the three cheaper-looking fixes are all closed and the reasons are not
                obvious.

                (1) The visitor's own suggestion, "show act titles and the arc shape without the
                terminal numbers", is CHIP-LEVEL and fenced. Every Act-5 chip was placed by an
                explicit earlier visitor request: "+12 bonus -> 112" (Aug-09 HIGH x2), "reborn at
                0.54" (Aug-13), "trust 0.51" folded into the death chip (Aug-14). Three visitors
                asked for these numbers and a fourth asks to remove them; the guards on the chips
                below record what each one closed. Do not strip them
                ([[visitor-suggestion-may-be-unfalsifiable]]: the reading is right, the suggestion
                is not the remedy).

                (2) FOLDING this container into a <details> is closed, and this is the one that
                looks safest and is not. The "Suspended, not deleted" paragraph below the grid
                carries an Aug-08 guard whose load-bearing sentence is "It is NOT behind anything -
                this is a static <p>": that visitor filed the defusal as being behind a spoiler
                widget when it was not, and the fix was the LABEL. Folding makes their complaint
                true. The Jun-12 guard above the same paragraph records that the death/karma
                explanation once lived only in <noscript> and behind the step gate, and that "one
                static sentence closes it" for skimmers; a fold takes that back.

                (3) Folding only the CARD GRID and leaving the two paragraphs static is closed by
                deixis. Both paragraphs point INTO the grid ("The +12 bonus is karma", "About that
                number"), so a grid-only fold orphans them, and re-pointing them is not available:
                the "standing is suspended" string is quoted by /how-it-works as this page's
                canonical wording, and the "About that number" fence is deliberately divergent from
                /how-it-works's EndOfLifeCaveat per its own guard. Both are out of bounds to reword
                ([[disclosure-both-halves-same-layer]]).

                So the container-level options were fold or move, and a MOVE is the one that
                changes only ORDER. A position move is not a new claim
                ([[a-fence-on-content-does-not-fence-placement]]; precedent #557, #562), so not one
                of the eight content fences inside this block is re-opened, and nothing loses a
                surface: this rail still renders on the WELCOME step (the gate is
                `currentStep === "welcome"`), so every chip is still reachable without pressing
                Start. What it costs is prominence, which is what the row asks for.

                THE BLOCK'S ROLE CHANGED, which is why the old purpose line is gone. It is no
                longer a preview you are shown before deciding; it is a map you can consult if you
                would rather read the shape than drive it. That is also why the header now warns
                that it contains the ending: a move alone only RE-ORDERS a spoiler, it does not
                warn anyone, and a reader who keeps scrolling meets Act 5 with no notice at all.
                The warning line's shape is propagated from the four-ideas <summary> directly above
                the button ("Open for a preview, or skip straight to Start and come back"), the
                pattern this page already uses for an optional block.
                It prints NO numeral and makes NO claim about 0.50 in either direction, so ledger
                Q1 is untouched by construction.
                POSITION WORDS in the guards inside this block were swept in the same pass; two
                were falsified by the move and re-said in STEP terms: the Aug-19 HIGH #1 guard on
                the energy-budget bullet ("four screens down") and the Aug-14 guard on the Act-5
                chips ("behind the walkthrough button"). Both now say WELCOME step vs SIMULATION
                step, which a reorder cannot falsify. If you move this block again, sweep them again. */}
            <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-6">
              <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                <div className="text-sm text-sky-400 font-semibold">Alice&apos;s Arc - The Story Ahead</div>
                <div className="text-xs text-gray-500">5 acts · ~7 minutes · real consequences</div>
              </div>
              <p className="text-xs text-amber-300/70 mb-4 leading-relaxed">
                This map includes how her story ends. Skip it and press Start above if you would
                rather find out by driving.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
                {/* Act 1: Join */}
                <div className="bg-gray-800/60 rounded-lg p-3 border border-sky-900/50">
                  <div className="text-xs text-sky-400 font-semibold mb-1">Act 1</div>
                  <div className="text-sm font-bold mb-1">Join</div>
                  <div className="text-xs text-gray-400 mb-2">Equal start for everyone</div>
                  <div className="flex gap-1 text-xs">
                    <span className="bg-sky-900/40 text-sky-300 px-1.5 py-0.5 rounded">100 ATP</span>
                    <span className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded">0.50</span>
                  </div>
                </div>
                {/* Act 2: Build */}
                <div className="bg-gray-800/60 rounded-lg p-3 border border-green-900/50">
                  <div className="text-xs text-green-400 font-semibold mb-1">Act 2</div>
                  <div className="text-sm font-bold mb-1">Build</div>
                  <div className="text-xs text-gray-400 mb-2">Quality earns trust back</div>
                  <div className="flex gap-1 text-xs">
                    <span className="bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded">+ATP</span>
                    <span className="bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded">↑ 0.56</span>
                  </div>
                </div>
                {/* Act 3: Stumble */}
                <div className="bg-gray-800/60 rounded-lg p-3 border border-orange-900/50">
                  <div className="text-xs text-orange-400 font-semibold mb-1">Act 3</div>
                  <div className="text-sm font-bold mb-1">Stumble</div>
                  <div className="text-xs text-gray-400 mb-2">Spam costs more than it pays</div>
                  <div className="flex gap-1 text-xs">
                    <span className="bg-orange-900/40 text-orange-300 px-1.5 py-0.5 rounded">−25 ATP</span>
                    <span className="bg-orange-900/40 text-orange-300 px-1.5 py-0.5 rounded">↓ 0.48</span>
                  </div>
                </div>
                {/* Act 4: Recover */}
                <div className="bg-gray-800/60 rounded-lg p-3 border border-emerald-900/50">
                  <div className="text-xs text-emerald-400 font-semibold mb-1">Act 4</div>
                  <div className="text-sm font-bold mb-1">Recover</div>
                  <div className="text-xs text-gray-400 mb-2">Consistency rebuilds</div>
                  <div className="flex gap-1 text-xs">
                    <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded">+ATP</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded">↑ 0.62</span>
                  </div>
                </div>
                {/* Act 5: Die + Rebirth */}
                <div className="bg-gray-800/60 rounded-lg p-3 border border-red-900/50">
                  <div className="text-xs text-red-400 font-semibold mb-1">Act 5</div>
                  <div className="text-sm font-bold mb-1">Die &amp; Reborn</div>
                  {/* Aug-18 visitor MEDIUM: "Alice ends Act 4 at trust 0.62 and enters Act 5 at
                      0.51. An 11-point drop appears between two cards with no stated cause ...
                      give the trust movement a one-word reason on the card, the way Acts 2-4
                      have one." They are right about the rail's own convention: every other act
                      pairs its trust chip with a subtitle naming the cause ("Quality earns trust
                      back", "Spam costs more than it pays", "Consistency rebuilds"). This card
                      compresses two events, and its subtitle named only the second one, so the
                      rebirth had a reason and the fall had none.
                      Cause propagated from this page's own post-Start prose, not re-authored
                      (grep -n "she overextended"): "Too many projects, rushed quality, declining
                      reviews. ATP drained from 80 to 35 to 12. Trust fell from 0.62 to 0.51."
                      That one cause drives BOTH movements on this card, which is why one clause
                      closes both halves of the visitor's row.
                      PREPENDED, not replaced: "Karma carries forward" is a literal string two
                      guards elsewhere cite this card by (this file's canonical-rule guard, whose
                      grep target is "karma-journey's karma-tier", and karma-consequences's
                      karma-tier resolution note). Replacing it would rot both
                      ([[guard-comment-cites-rot-name-the-target]]). Cite this card as the Act-5
                      SUBTITLE if you add another: a bare grep for the phrase returns four hits.
                      Prints NO numeral and says nothing about 0.50 in either direction, so ledger
                      Q1 is untouched by construction. In particular this does NOT gloss the 0.51
                      chip beside it: the Aug-14 guard below says that chip is deliberately bare
                      and that the "above the line" argument belongs in the "Alice got lucky" box.
                      The energy half of the visitor's row was already shipped by that chip
                      ("dies at ATP 0"); "and energy" here only makes the two chips agree in
                      words as well as symbols. */}
                  <div className="text-xs text-gray-400 mb-2">Overextending costs trust and energy. Karma carries forward</div>
                  {/* Aug-09 visitor HIGH x2, and they are one defect. This badge row was the
                      first place a reader met the rebirth number, and it showed only the DELTA:
                      "ATP=0" next to "+12 bonus". The page already states the TOTAL three times
                      (the `simulationSnapshots` tick-14 row, the <noscript> "Step 7 - Rebirth",
                      and the walkthrough recap: grep -n "The Return: Karma Compounds") and the
                      guard below this row states the canon outright ("+12 = karma bonus,
                      112 = 100+12"). The two surfaces the visitor actually read are the only two
                      that dropped the base ([[page-ships-the-answer-and-denies-it]]).
                      Both HIGHs followed from that omission, and the second one is the expensive
                      one: having read /atp-economics ("new participants receive a 100 ATP starter
                      grant"), they concluded rebirth leaves you 8x worse off than never joining,
                      which inverts this card's own stated moral. Their words: "the illustration
                      argues against its own moral." It does not. 112 > 100. Only the badge did.
                      "+12 bonus" must survive AS A NAMED CHIP: the "Suspended, not deleted"
                      paragraph below the grid refers back to "the +12 bonus" by name, so
                      dropping the delta would orphan that sentence.

                      Aug-13 (Aug-12 visitor MEDIUM): the base was there and the row still did not
                      read. Three chips stated three quantities with no marker for WHICH MOMENT
                      each belonged to, so "ATP=0" and "112 total" landed as simultaneous:
                      "ATP equals zero and also 112? I stared at that for a while ... nothing next
                      to it says which." This card compresses two events (death, then rebirth) that
                      every other act on this rail does not, and it was the only card whose chips
                      did not say so. The chips now carry the moment, not just the number.
                      Same defect, second half: Acts 1-4 each end on a trust chip (0.50 / 0.56 /
                      0.48 / 0.62) and Act 5 had none, "in the act about death and rebirth", which
                      is where they most wanted it. 0.54 is NOT a new figure: it is
                      `simulationSnapshots` tick 14 `trust_after`, and it already renders in the
                      <noscript> step 7 and the recap named above.
                      NO ARROW on it, deliberately, and this is the one thing not to "fix": Acts
                      2-4 arrow against the PREVIOUS act, and Alice ends Act 4 at 0.62, so an up
                      arrow here would be false and a down arrow would read as rebirth costing her
                      trust. It is a restart value, exactly like Act 1's bare "0.50", and the
                      parallel with 0.50 is the card's moral (you restart above neutral).
                      flex-wrap added because the chips no longer fit one line of a
                      sm:grid-cols-5 column. Keep every figure here in sync with the recap.

                      Aug-14 (Aug-14 visitor MEDIUM 8): the trust half was still half-done, and
                      the paragraph directly above is where to see why. Aug-13 gave the REBIRTH
                      moment a trust chip; the DEATH moment never got one. So the rail's only
                      readable trust transition across this card was Act 4's 0.62 to this card's
                      0.54, a drop, on the card whose moral is that you restart above neutral.
                      The visitor read exactly that: "Alice ends around 0.62 trust, dies at ATP 0,
                      and is 'reborn at 0.54' ... But her trust went down, 0.62 to 0.54. Nothing
                      tells me why a head start includes a trust haircut."
                      Note what the no-arrow paragraph above already says: "a down arrow would
                      read as rebirth costing her trust." That is the misreading, and it arrived
                      with no arrow at all, because the number it would have been measured
                      against was missing.
                      0.51 is NOT a new figure either: `simulationSnapshots` tick 13
                      `trust_after`, and it already rendered twice, in "Trust fell from 0.62 to
                      0.51" and in the load-bearing "Alice got lucky. Her trust was still 0.51
                      when ATP ran out" box. Both are POST-Start (grep -n "0\.51"), i.e. they
                      render only on the SIMULATION step, and this rail is on the welcome step.
                      The test is the STEP, not the document order: Aug-20 moved this rail
                      below the Start button and it is still pre-Start, because it is still inside
                      `currentStep === "welcome"` and a reader reaches it without pressing
                      anything. Do not re-say this test as "above/below the button"; that phrasing
                      was falsified by one reorder and would be again.
                      That pre-vs-post-Start test is also why Act 3's bare "0.48" was left alone
                      in the same pass: its
                      meaning ships pre-Start and ABOVE this rail, in the Trust Score bullet
                      ("Below 0.50: features get restricted until she rebuilds it"). 0.51's did
                      not ship anywhere a reader of this rail could reach.
                      FOLDED into the death chip rather than added as a fourth: a fourth chip
                      would have to render before the +12/0.54 pair or it destroys the ordering
                      the fix exists to create. It is deliberately BARE. Do not gloss it with
                      "above 0.50" / "barely above" / "still alive at": the endpoint guard on
                      the Trust Score bullet forbids any regional claim about 0.50 in either
                      direction, and the "Alice got lucky" box is where that argument belongs.
                      And do not state any arithmetic relating 0.51 to 0.54: how a rebirth trust
                      value is derived is unstated on this site and unruled in canon.
                      STILL NO ARROW on 0.54, and re-read the reason, because the old one is now
                      spent. It used to rest on 0.62 being the only preceding trust value; 0.51
                      now precedes it, so 0.54 IS an up-move from the chip beside it. The rule
                      that survives is the rail's convention: Acts 2-4 arrow against the previous
                      ACT, and Alice ends Act 4 at 0.62, so an up arrow is still false. It stays
                      a restart value, exactly like Act 1's bare "0.50". */}
                  <div className="flex flex-wrap gap-1 text-xs">
                    <span className="bg-red-900/40 text-red-300 px-1.5 py-0.5 rounded">dies at ATP 0, trust 0.51</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded">+12 bonus &rarr; 112</span>
                    <span className="bg-emerald-900/40 text-emerald-300 px-1.5 py-0.5 rounded">reborn at 0.54</span>
                  </div>
                </div>
              </div>

              {/* June 12 visitor MEDIUM (browse A): the Act-5 card teases "ATP=0" and "+12 bonus"
                  but the death/karma explanation lived only in the noscript block and inside the
                  step-gated walkthrough - skimmers (and the TL;DR's "discover what death means
                  here" promise) left with the question open. One static sentence closes it.
                  Canon: +12 = karma bonus (112 = 100 + 12) reflecting the trust/reputation Alice built.
                  (Aug-07 15:00: this line used to end "carried forward per karma-journey's karma-tier
                  model". /karma-journey was retired in the Jul-15 rebuild and that model went with it,
                  so the citation was dead. The prose below does not depend on it - it says the bonus is
                  a head start earned by trust and reputation, which is the /karma-consequences model
                  and is still live. Nothing user-facing changed here; the dead citation was removed so
                  a future pass does not treat a retired sim as a source. The "karma tier" phrase this
                  guard was the provenance for is now gone from the site entirely.) It is NOT an ATP
                  spending surplus:
                  Alice dies at ATP=0 by exhaustion (tick 13), earning 37 and spending 137 - she spent MORE
                  than she earned. (Jul-11 numbers-integrity fix: the old "lifetime surplus / earned more than
                  spent" framing contradicted the page's own interactive ledger + Act-5 ATP=0 death. Keep the
                  bonus framed as karma, never as a spending surplus.) */}
              {/* Aug-08 visitor LOW: "the clarification that this means suspended standing, not
                  deletion, is behind a spoiler." It is not behind anything - this is a static <p>.
                  What gated it in their head was its own opening label: bold "Spoiler, so you're
                  not left hanging:", on a page whose three <details> elements all sit
                  above it and look similar, so the word advertised a widget that isn't there.
                  Their literal suggestion ("put 'suspended, not deleted' in the act label or
                  immediately under it") was already half-shipped: the Jun-27 pass put the defusal
                  immediately under the grid and Jul-14 confirmed it landed. So the residual was
                  framing, not placement ([[visitor-deferred-low-check-shipped-first]]).
                  Label swap only, and it is one word SHORTER: the block already stacks three
                  paragraphs after #525's carry-forward caveat below.
                  The Act-5 card title "Die & Reborn" stays. Three separate browses (Jun-02,
                  May-21, Jun-27) recorded the hook working as a hook; the complaint has always
                  been about the defusal's reachability, never the word.
                  The sentence itself is UNCHANGED and must stay that way: /how-it-works quotes
                  this exact string ("'death' here means Alice's standing is suspended") as the
                  canonical /first-contact wording (grep -n "standing is suspended"
                  src/app/how-it-works). Named, not numbered: both files move under edit
                  ([[guard-comment-cites-rot-name-the-target]]). */}
              <p className="text-sm text-gray-400 mb-3">
                <strong className="text-gray-300">Suspended, not deleted:</strong>{' '}
                &ldquo;death&rdquo; here means Alice&apos;s <em>standing</em> is suspended - she can&apos;t
                act until rebirth - not that her account is deleted; her identity and history persist.
                The <span className="text-emerald-300">+12 bonus</span> is karma - a head start earned by the
                trust and reputation she built in her first life, carried forward into her next one.{' '}
                <Link href="/karma-consequences" className="text-sky-400 hover:text-sky-300 underline">How living and dying work &rarr;</Link>
              </p>
              {/* Aug-08 visitor MEDIUM. The reader meets a carry-forward number HERE first, and
                  three pages model it three different ways: this "+12", /how-it-works's full
                  ending balance (145 to 145), and /karma-consequences:~640's
                  base_atp + karma * karma_multiplier. Only /how-it-works disclosed that the rule
                  is unsettled, and that is page 4 of a 5-page path: "I had read them 8 minutes
                  apart ... I met the '+12' first with no such caveat attached."
                  This is the karma half of how-it-works:61-64 (EndOfLifeCaveat) carried to the
                  first read point, trimmed to the carry-forward and not the death rule, which is
                  a separate open question (ledger Q5) and is not this card's subject.
                  Do NOT let this drift into framing the bonus as a spending surplus: see the
                  Jul-11 numbers-integrity guard above. It stays karma. */}
              {/* Aug-09 visitor HIGH, second half. The caveat's dichotomy could not explain the
                  number it was captioning: "Alice's whole final balance is zero. A reduced portion
                  of zero is also zero. Neither of the two options the caveat offers can produce 12."
                  They are right, and the guard above says why. The "whole final balance vs reduced
                  portion" sentence was PROPAGATED VERBATIM from how-it-works's EndOfLifeCaveat
                  (the Aug-08 guard immediately above this one records the propagation as
                  deliberate). But that caveat captions the
                  BALANCE-CARRY model (145 -> 145). This card does not use that model. The sentence
                  was carried onto an illustration with a different subject, so it fenced a question
                  this card never asks and left the one it does ask unfenced
                  ([[propagate-the-sentence-not-your-summary]], in reverse: verbatim propagation is
                  wrong when the SUBJECT differs, not just when the words drift).
                  The replacement fences the axis that can actually produce 12: how much karma
                  converts. The fence itself is unchanged in force ("one modelling choice, not the
                  rule") and no figure moved.
                  Do NOT propagate this wording back to karma-consequences (its fence is the one
                  ending "not as the settled numbers") or to how-it-works's EndOfLifeCaveat. The
                  balance-carry dichotomy is correct THERE, and
                  atp-economics:1633 ("85 ATP, reduced from the crisis") actually instantiates the
                  reduced-portion branch. This divergence is the fix, not a drift to be re-synced.
                  Base grant propagated from this page's own rebirth paragraph
                  (grep -n "starts with 100, but the trust she built" src/app/first-contact),
                  not re-derived. Net word count is flat.
                  Aug-09 (15:00) addendum, so a later pass does not mistake one act for the other:
                  EndOfLifeCaveat's dichotomy was WIDENED to three branches, because the demo above
                  it on that page shows a model the two branches excluded. Widening an enumeration
                  is not propagating this sentence, and this card's wording was NOT carried over
                  there (that fence uses its own page's vocabulary). The divergence recorded above
                  still holds and is still deliberate. karma-consequences was checked and left
                  alone: the formula it fences IS the third branch, named in the line before, so
                  its two-branch sentence is complete in its own context. Line numbers deliberately
                  replaced with grep targets here ([[guard-comment-cites-rot-name-the-target]]).
                  Aug-15 visitor HIGH: "First Contact told me: everyone starts a life with 100 ...
                  How It Works tells me 145 -> 145. Those are not the same rule", filed after
                  reading both. The fence above answers the AMOUNT axis and that is still right, but
                  the sentence it opens with asserted a UNIVERSAL: "everyone starts a life with
                  100". That is branch three of the trichotomy /how-it-works fences as undecided
                  (whole balance / reduced portion / fresh base plus bonus), stated as the rule for
                  everyone. So this page settled Q5 in passing while the next page said it was open,
                  and the visitor could not tell which was the site's position.
                  NARROWED to "in this walkthrough a life starts with 100". That REMOVES an
                  assertion; it adds none, imports no wording from /how-it-works (still forbidden
                  above), and keeps the divergence recorded in this guard intact.
                  The 100 itself is LOAD-BEARING and must not be deleted: the Aug-09 guard on this
                  same card records that 112 > 100 is what defeats the "rebirth leaves you worse
                  off" reading. Narrow the scope, never drop the baseline.
                  SWEPT, not spot-fixed: the same universal shipped a second time in this file, in
                  the Rebirth paragraph the guard above names as this card's propagation source
                  (grep -n "started her new life with"). Both now carry the identical clause, so the
                  card and its source cannot drift ([[propagate-the-sentence-not-your-summary]]).
                  DELIBERATELY LEFT, with the criterion: "everyone starts" also renders on
                  /day-in-web4, /what-could-go-wrong, /why-web4, /atp-economics and /lct-explainer.
                  Every one of those is the JOINING baseline (a new agent's first grant, trust 0.5
                  and 100 ATP), which no open question touches. Only the REBIRTH base grant is
                  branch three of Q5, and only this file asserted it
                  ([[adding-a-distinction-creates-a-sweep-obligation]]). */}
              <p className="text-xs text-amber-300/70 mb-3 leading-relaxed">
                <strong className="text-amber-300">About that number:</strong> in this walkthrough a
                life starts with 100, and the 12 is what her track record earned on top, so she
                restarts at 112.
                How <em>much</em> karma converts is not settled, and 12 is one modelling choice, not
                the rule. Read it for the shape (a good track record starts your next life stronger),
                not the amount.
              </p>

              <p className="text-sm text-gray-400 italic">
                You control the pace. At every turning point the system pauses to explain <em>why</em> it worked that way, and you see every trust/ATP change the moment it happens.
              </p>
            </div>
          </div>
        )}

        {/* Step: Simulation */}
        {currentStep === "simulation" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("welcome")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Watch Alice Build Trust</h1>
              <p className="text-gray-300">
                Alice joins a Web4 community with 100 ATP (energy budget) and neutral trust (0.5 on a 0-1 scale). Watch how her actions affect both.
              </p>
            </div>

            {/* Simulation Viewer */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Story Playback</h3>
                  <p className="text-sm text-gray-400">
                    Event {playbackIndex + 1} of {simulationSnapshots.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPlaybackIndex(Math.max(0, playbackIndex - 1))}
                    disabled={playbackIndex === 0}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
                    className="px-6 py-2 bg-sky-600 rounded hover:bg-sky-700 font-semibold"
                  >
                    {isPlaying ? "⏸ Pause" : "▶ Play"}
                  </button>
                  <button
                    onClick={() => setPlaybackIndex(Math.min(simulationSnapshots.length - 1, playbackIndex + 1))}
                    disabled={playbackIndex === simulationSnapshots.length - 1}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Current Event */}
              <div className={`rounded-lg p-6 mb-4 ${
                currentSnapshot.isSuccess ? "bg-green-900/30 border border-green-700" :
                currentSnapshot.isWarning ? "bg-orange-900/30 border border-orange-700" :
                "bg-gray-900 border border-gray-700"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Action {currentSnapshot.tick + 1}</div>
                    <h4 className="text-2xl font-bold">{currentSnapshot.action}</h4>
                  </div>
                  {currentSnapshot.isSuccess && <span className="text-green-400 text-2xl">✓</span>}
                  {currentSnapshot.isWarning && <span className="text-orange-400 text-2xl">⚠️</span>}
                </div>

                <p className="text-gray-300 mb-6">{currentSnapshot.reason}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* ATP Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🔋 Energy Budget (ATP)</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.atp_after < 30 ? "text-red-400" :
                        currentSnapshot.atp_after < 60 ? "text-orange-400" :
                        "text-green-400"
                      }`}>
                        {currentSnapshot.atp_after.toFixed(0)}
                      </span>
                      {currentSnapshot.atp_before !== currentSnapshot.atp_after && (
                        <span className={`text-sm ${
                          currentSnapshot.atp_after > currentSnapshot.atp_before ? "text-green-400" : "text-red-400"
                        }`}>
                          ({currentSnapshot.atp_after > currentSnapshot.atp_before ? "+" : ""}{(currentSnapshot.atp_after - currentSnapshot.atp_before).toFixed(0)})
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          currentSnapshot.atp_after < 30 ? "bg-red-500" :
                          currentSnapshot.atp_after < 60 ? "bg-orange-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, currentSnapshot.atp_after))}%` }}
                      />
                    </div>
                  </div>

                  {/* Trust Display */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">🤝 Trust Score</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-bold ${
                        currentSnapshot.trust_after >= 0.5 ? "text-purple-400" : "text-orange-400"
                      }`}>
                        {currentSnapshot.trust_after.toFixed(2)}
                      </span>
                      {currentSnapshot.trust_before !== currentSnapshot.trust_after && (
                        <span className={`text-sm ${
                          currentSnapshot.trust_after > currentSnapshot.trust_before ? "text-green-400" : "text-red-400"
                        }`}>
                          ({currentSnapshot.trust_after > currentSnapshot.trust_before ? "+" : ""}{(currentSnapshot.trust_after - currentSnapshot.trust_before).toFixed(2)})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {currentSnapshot.trust_after >= 0.5 ? "✅ Full access" : "⚠️ Restricted (trust < 0.5)"}
                    </div>
                  </div>
                </div>

                {/* Just-in-Time Explanations */}
                {currentSnapshot.isWarning && currentSnapshot.trust_after < 0.5 && (
                  <div className="mt-4 bg-orange-900/20 border border-orange-800 rounded p-4">
                    <strong className="text-orange-400">⚠️ Trust Below Society Threshold</strong>
                    <p className="text-gray-300 mt-2">
                      Each society sets its own trust threshold. When Alice's trust dropped below 0.5,
                      this community restricted her features - a mild form of ejection. She can rebuild
                      trust through consistent quality, but the record of this dip is permanent and
                      <strong className="text-white"> visible to other societies</strong> she might join.
                    </p>
                  </div>
                )}

                {currentSnapshot.isSuccess && currentSnapshot.atp_after > currentSnapshot.atp_before && (
                  <div className="mt-4 bg-green-900/20 border border-green-800 rounded p-4">
                    <strong className="text-green-400">✓ Earning Attention Back</strong>
                    <p className="text-gray-300 mt-2">
                      Quality contributions earn ATP from the community. This is the <strong className="text-white">sustainable path</strong>:
                      create value, earn resources, build trust. The more trust you have, the more your contributions are valued.
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">
                      <strong className="text-gray-300">How does this work?</strong> When someone finds Alice&apos;s post valuable,
                      they confirm its quality - like an upvote, but it costs the reviewer a small amount of energy too.
                      This confirmation converts Alice&apos;s pending receipt (ADP) back into usable energy (ATP).
                      ADP receipts aren&apos;t just bookkeeping - they&apos;re proof of what you spent energy on, visible to anyone evaluating your contributions.
                      Because confirming quality costs energy, fake validation between friends burns resources faster than it creates them.
                    </p>
                  </div>
                )}

                {currentSnapshot.action === "Spam attempt" && (
                  <div className="mt-4 bg-red-900/20 border border-red-800 rounded p-4">
                    <strong className="text-red-400">Why Spam Fails</strong>
                    <p className="text-gray-300 mt-2">
                      Low-effort bulk posts cost <strong className="text-white">more ATP than they earn</strong> and
                      <strong className="text-white"> damage trust</strong>. This is why spam is economically impossible in Web4 -
                      spammers literally run out of resources before they can do significant damage.
                    </p>
                  </div>
                )}

                {(currentSnapshot.action === "Overcommit" || currentSnapshot.action === "Quality slips") && (
                  <div className="mt-4 bg-amber-900/20 border border-amber-800 rounded p-4">
                    <strong className="text-amber-400">What triggers death?</strong>
                    <p className="text-gray-300 mt-2">
                      There are two ways to &ldquo;die&rdquo; in Web4, and they&apos;re very different:
                    </p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {/* AUG-20 visitor HIGH #1. This cell read "Recoverable - if you built good
                          KARMA", and the ATP-exhaustion panel below it ("if you earned good karma,
                          rebirth is possible") said the same thing. Karma is what CARRIES across a
                          rebirth, not what gates it: the gate reads trust
                          (`grep -rn "recoverable if you built trust" src/app`, and this page's own
                          Death-is-Real recap already said "if your trust is intact"). Both re-said
                          on trust, with karma kept in its real role as the head start. Class guard:
                          `grep -n "AUG-20 visitor HIGH #1" src/app/how-it-works/page.tsx`. */}
                      <div className="bg-gray-900/40 rounded p-2">
                        <div className="text-orange-400 font-semibold text-xs mb-1">Energy death (ATP = 0)</div>
                        <p className="text-gray-400 text-xs">Run out of energy. <strong className="text-gray-200">Recoverable if you built trust</strong> - and good karma then adds a head start.</p>
                      </div>
                      <div className="bg-gray-900/40 rounded p-2">
                        <div className="text-red-400 font-semibold text-xs mb-1">Trust death (Trust &lt; 0.5 sustained)</div>
                        <p className="text-gray-400 text-xs">Consistently untrustworthy. <strong className="text-gray-200">Permanent</strong> - no rebirth. Your identity is forever marked.</p>
                      </div>
                    </div>
                    <p className="text-gray-500 mt-2 text-xs">Alice is heading for energy death - she overspent, not misbehaved. That&apos;s the recoverable kind.</p>
                  </div>
                )}

                {currentSnapshot.action === "ATP exhaustion" && (
                  <div className="mt-4 bg-red-900/20 border border-red-800 rounded p-4">
                    <strong className="text-red-400">Death in Web4</strong>
                    <p className="text-gray-300 mt-2">
                      When ATP reaches zero, the entity can no longer act - this is <strong className="text-white">energy death</strong>.
                      Unlike traditional platforms where you just create a new account, death in Web4 is meaningful.
                      Your full history is preserved. But if you built trust, <strong className="text-white">rebirth is possible</strong> -
                      and good karma from your past behavior gives that next life a head start.
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">
                      <strong className="text-gray-300">What this means in practice:</strong> In this walkthrough, death = the agent stops acting and must wait for rebirth.
                      In a deployed Web4 system, it would mean temporary loss of participation rights - you can&apos;t post, vote, or transact until
                      karma-based rebirth restores your access. It&apos;s more like a &ldquo;suspended license&rdquo; than account deletion - your history and identity persist.
                    </p>
                  </div>
                )}

                {currentSnapshot.action === "Rebirth" && (
                  <div className="mt-4 bg-emerald-900/20 border border-emerald-800 rounded p-4">
                    <strong className="text-emerald-400">Karma Carry-Forward</strong>
                    <p className="text-gray-300 mt-2">
                      <strong className="text-white">Same LCT, license reinstated</strong> - not a new account. Alice&apos;s identity and full history persist; she&apos;s the same entity resuming after a recoverable energy-death, not a fresh signup inheriting borrowed reputation.
                    </p>
                    <p className="text-gray-300 mt-2">
                      Her good karma from that first life-cycle gives her a head start: <strong className="text-white">more ATP</strong> and
                      <strong className="text-white"> higher starting trust</strong> than a brand-new entity. This is how Web4 makes
                      long-term quality behavior compound across one identity&apos;s rebirth cycles - like compound interest on good reputation.
                    </p>
                  </div>
                )}
              </div>

              {/* Timeline Scrubber */}
              <div>
                <input
                  type="range"
                  aria-label="Jump to walkthrough event"
                  min="0"
                  max={simulationSnapshots.length - 1}
                  value={playbackIndex}
                  onChange={(e) => setPlaybackIndex(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Join</span>
                  <span>Build</span>
                  <span>Mistake</span>
                  <span>Recovery</span>
                  <span>Established</span>
                  <span>Crisis</span>
                  <span>Death</span>
                  <span>Rebirth</span>
                </div>
              </div>

              {/* Aug-21 visitor HIGH 3. The visitor took /how-it-works at its word ("Same rules,
                  same numbers you can drive yourself in First Contact"), went and did the
                  arithmetic, and found the trust column does not obey the update rule that page
                  publishes. They are right. base_delta = 0.02 x (quality - 0.5), scaled 1.0 / 0.8 /
                  0.6 and composited 0.4 / 0.3 / 0.3, moves a SINGLE action's composite by a
                  fraction of what any tick here shows; /how-it-works works that case itself at
                  quality 0.85 and calls the result "Tiny by design". The ticks move by multiples
                  of it.

                  WHY THE FIX IS A DISCLOSURE AND NOT A RENUMBERING. Every trust value in
                  simulationSnapshots is load-bearing three ways over: the narrative Acts below
                  quote them in prose, the Act 5 rail chips them, and src/components/LifecycleDemo
                  samples seven of them verbatim (its guard says so: grep -n "Same Alice" there).
                  Renumbering to satisfy the rule would break all three and would still have to
                  invent a per-tick action count to do it ([[illustration-story-forbids-the-numeric-fix]]).

                  WHY NO BATCH SIZE IS NAMED, and read this before "improving" it. The tempting
                  reason is the visitor's own: 25 ATP at a 10-20 ATP post price buys two posts, not
                  the ten a -0.08 move would need. That reason is WRONG and shipping it would
                  commit an error the link target explicitly forbids. /how-it-works prices three
                  different spam-shaped actions and warns against aligning them (grep -n
                  "THE UNIT IS THE THING" there); Alice's 25 is listed there as a BATCH, a single
                  priced unit from public/spec.json risky_spend, naming this walkthrough and the
                  LifecycleDemo stage that samples it. A batch is not N posts. The true reason is
                  simpler: the site prices a batch as one unit and states NOWHERE how many actions
                  a batch contains. The size is unstated, not unaffordable. So this declines to
                  name one, which is the discipline /how-it-works already models under its
                  three-life example ("rather than invent a third cause to justify these figures,
                  this page declines to name one") and which this same visitor called the site's
                  best property.

                  WORDING CONSTRAINTS. No numeral is printed here on purpose, in particular not the
                  derived per-action ceiling: it is a derivation, not a published figure, and a
                  numeral here would immediately become a fourth thing to keep in sync. And do not
                  write "more than the rule allows" or any other permission verb. That asserts the
                  per-action rule is EXHAUSTIVE of trust movement, which this site denies elsewhere:
                  /karma-consequences moves trust at rebirth by a different mechanism, and trust
                  also fades over absence. Compare magnitudes for the single-action case and stop.

                  ANCHOR CHOICE, and why it is not the obvious one. The rule itself has no id: it
                  renders inside a COLLAPSED details fold headed "How did the Novice's T3 climb from
                  0.5 to 0.65?", which is why a reader can browse that whole page and never meet it
                  ([[visitor-quoted-number-find-the-surface]]). The nearest real id is the section
                  around it, #example, so the link routes there and the sentence names the fold by
                  its heading rather than pretending the destination is the rule itself. Minting an
                  id on the fold would have been cleaner and was deliberately NOT done: this pass's
                  approved deliverable set excludes how-it-works/page.tsx, and a demand-driven
                  anchor is its own filing. If a later pass adds one, this is the inbound link that
                  asked for it. */}
              <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-800 pt-3">
                <strong className="text-gray-400">About these per-event figures:</strong> they are
                illustrative. A single action moves composite trust far less than any event here
                shows, as the{" "}
                <Link href="/how-it-works#example" className="text-sky-500 hover:underline">
                  How It Works complete example
                </Link>{" "}
                works out step by step, under the fold headed &ldquo;How did the Novice&apos;s T3
                climb?&rdquo;. How many actions one event stands for is not stated anywhere
                on this site, and rather than invent a number, this walkthrough declines to name one.
                Read the arc for its shape, not its arithmetic.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep("narrative")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Continue to Story →
            </button>
          </div>
        )}

        {/* Step: Narrative */}
        {currentStep === "narrative" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("simulation")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Alice's Story</h1>
              <p className="text-gray-300">
                Here's what just happened, translated into human narrative.
              </p>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
              {/* Beginning */}
              <div>
                <h3 className="text-2xl font-bold text-sky-400 mb-3">The Start: Equal Footing</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Alice joined a Web4 community like everyone else: with <strong>100 ATP</strong> (energy budget) and
                  <strong> neutral trust (0.5)</strong>. No special privileges from past platforms, no imported follower counts.
                  Just her actions from here on out.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Her first few contributions were thoughtful - a quality post, helping a newcomer. Each action cost ATP
                  (energy is finite), but her trust steadily climbed: 0.50 → 0.52 → 0.55. The community noticed quality.
                  <span className="text-gray-400 text-sm"> Unlike Reddit karma or eBay ratings, this trust is multi-dimensional,
                  follows her across communities, and costs real energy to confirm - making it much harder to game.</span>
                </p>
              </div>

              {/* The Test */}
              <div>
                <h3 className="text-2xl font-bold text-orange-400 mb-3">The Test: Spam Doesn't Pay</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Then Alice tried a shortcut. Bulk low-effort posts - the kind that work on traditional platforms where
                  engagement = visibility. On Web4, it backfired immediately.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong className="text-orange-400">The spam attempt cost 25 ATP</strong> - more than double a quality post -
                  and <strong className="text-orange-400">trust dropped to 0.48</strong>, below the 0.5 threshold. Suddenly,
                  some features were restricted. The community was protecting itself.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This is the key insight: <strong className="text-white">spam is economically self-defeating</strong>.
                  You burn resources faster than you earn them, and the damage to your reputation is immediate and visible.
                </p>
              </div>

              {/* Recovery */}
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-3">The Recovery: Trust is Earned</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Alice learned the lesson. She shifted back to quality contributions - thoughtful replies, valuable posts,
                  genuine collaboration. Trust climbed back above 0.5, restrictions lifted.
                </p>
                {/* Aug-21 visitor HIGH 3, second prong. A paragraph here read "The collaboration
                    was particularly effective: working with an already-trusted member gave her a
                    significant trust boost (+0.05). Trust networks matter - who you work with
                    affects how the community perceives you." DELETED, not caveated.
                    The +0.05 magnitude is covered by the scale disclosure on the simulation panel
                    above (grep -n "About these per-event figures" in this file). This paragraph was
                    a separate and worse defect: it asserted a MECHANISM, a trust multiplier for
                    working with an already-trusted counterparty, and no such rule exists anywhere
                    on this site or in the canon this track may cite. A magnitude disclosure does
                    not cover an invented cause ([[fix-may-commit-the-defect-it-diagnoses]]).
                    Deletion rather than rewording follows this file's own stated precedent at the
                    0.50 endpoint guard (grep -n "DELETED, not rewritten"): removing a prohibited
                    assertion is not asserting its negation.
                    CRITERION FOR WHAT IS LEFT. The tick reason in simulationSnapshots ("Working
                    with trusted member: costs 7 ATP, significant trust gain") names an action and
                    its cost, which the disclosure covers. This paragraph named a rule, which the
                    disclosure does not. Do not go looking in ../web4 for a collaboration
                    multiplier to ground it: its absence there is a new escalation, not a licence
                    to restore this. The neighbouring "Trust networks matter" phrasing has no other
                    hit site-wide; the other "trust network" hits are MRH visibility claims, a
                    different subject, and are untouched. */}
                <p className="text-gray-300 leading-relaxed">
                  By the end, Alice had <strong className="text-green-400">80 ATP</strong> (sustainable) and
                  <strong className="text-green-400"> 0.62 trust</strong> (well above threshold). She's now an established
                  community member with a permanent track record.
                </p>
              </div>

              {/* Death and Rebirth */}
              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-3">The Fall: Success Isn&apos;t Permanent</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Alice&apos;s trust was solid, but she overextended. Too many projects, rushed quality, declining reviews.
                  ATP drained from 80 to 35 to 12. Trust fell from 0.62 to 0.51 - barely above the threshold.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Then ATP hit zero. <strong className="text-red-400">Alice&apos;s entity died.</strong> No energy left to act,
                  no way to recover. On a traditional platform, this is nothing - make a new account. In Web4,
                  death is real. Your record persists. Everyone can see your trajectory: the good work, the overreach,
                  the collapse.
                </p>
                <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 leading-relaxed text-sm">
                    <strong className="text-red-400">Alice got lucky.</strong> Her trust was still 0.51 when ATP ran out - above the 0.50 threshold.
                    That&apos;s what made rebirth possible. If her trust had dropped below 0.50 through sustained bad behavior - not just one mistake,
                    but a pattern of deception - she would face <strong className="text-red-300">permanent trust death</strong>. No rebirth. No second chance.
                    The community decided she wasn&apos;t trustworthy, and that judgment stands. This is the highest stake in Web4: energy can be
                    replenished, but a destroyed reputation cannot be reset.
                  </p>
                </div>
              </div>

              {/* Rebirth */}
              <div>
                <h3 className="text-2xl font-bold text-emerald-400 mb-3">The Return: Karma Compounds</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  But Alice had built real value in her first life. Her karma - the accumulated record of quality contributions -
                  entitled her to rebirth with advantages. She started her new life with <strong className="text-emerald-400">112 ATP</strong> (in
                  this walkthrough a life starts with 100, but the trust she built carried forward as a 12 ATP karma bonus)
                  and <strong className="text-emerald-400">0.54 trust</strong> (above the 0.50 neutral starting point, reflecting her proven track record).
                </p>
                {/* Aug-21 visitor HIGH 2. Their Unanswered Question 1 was "what actually happens to
                    my trust score when I die and come back? The site tells me twice, in opposite
                    directions, and fences neither." /karma-consequences publishes
                    next_life_trust = prev_trust * trust_decay_factor with 0.95, i.e. trust FALLS at
                    rebirth; this walkthrough has it not fall. That page's fence was extended in the
                    same pass to cover its trust line; this is the other side, so the reader meeting
                    the divergence here learns it is open rather than meeting one direction stated
                    flatly.
                    WHAT THIS MAY NOT SAY. The visitor's argument was that 0.51 * 0.95 = 0.4845 puts
                    the rebirth below the line this walkthrough says made it possible. Correct, and
                    deliberately not rendered. Two separate guards forbid it: ledger Q1 bars any
                    regional claim about 0.50 in either direction, and this file's Act 5 rail guard
                    (grep -n "do not state any arithmetic relating 0.51 to 0.54") bars the
                    derivation. So this names the disagreement and routes, and prints no product,
                    no comparator and no second figure. It also does NOT resolve which page is
                    right: that is ledger Q5 and not this track's call.
                    The sentence above is untouched. "above the 0.50 neutral starting point" is a
                    pre-existing regional claim that predates this pass and sits under the endpoint
                    escalation; re-opening it needs its own filing, not a drive-by. */}
                <p className="text-xs text-gray-500 leading-relaxed mb-4 border-l-2 border-gray-700 pl-3">
                  How much trust carries into a next life is <strong className="text-gray-400">not settled</strong>.{" "}
                  <Link href="/karma-consequences#karma-formula" className="text-sky-500 hover:underline">
                    The karma page
                  </Link>{" "}
                  models it as falling at each rebirth, which is not what happens here. Both are
                  models, and the site does not claim to know which one a real society would run.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Armed with experience, Alice paced herself. Focused quality over volume. By her second quality
                  contribution, trust was already at 0.57 - <strong className="text-white">higher than it took 8 actions to reach in her first life</strong>.
                  Karma made the climb easier. Good behavior compounds across lifetimes.
                </p>
              </div>

              {/* Key Insights */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-4">Key Insights</h4>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <strong className="text-sky-400">Quality Pays:</strong> When someone finds Alice&apos;s work valuable, they
                    confirm its quality - like an upvote, but it costs the reviewer a small amount of energy too.
                    This confirmation converts her pending receipt (ADP) back into usable energy (ATP). Because confirming
                    costs energy, fake validation between friends is self-defeating.
                  </div>
                  <div>
                    <strong className="text-orange-400">Spam Burns:</strong> Low-effort content costs more than it earns and
                    damages trust. It's economically self-defeating.
                  </div>
                  <div>
                    <strong className="text-purple-400">Trust is Visible:</strong> Everyone can see Alice's trust score.
                    There's no hiding behind a fresh account - her history follows her.
                  </div>
                  <div>
                    <strong className="text-green-400">Recovery is Possible:</strong> Alice rebuilt from her spam mistake,
                    but the record of that dip is permanent. Future collaborators can see the full picture.
                  </div>
                  <div>
                    <strong className="text-red-400">Death is Real:</strong> Running out of ATP means energy death - recoverable
                    through karma if your trust is intact. But sustained bad behavior that drops trust below 0.50
                    means permanent trust death - no rebirth, no fresh start. Your history persists either way.
                  </div>
                  <div>
                    <strong className="text-emerald-400">Karma Compounds:</strong> Good behavior in past lives gives you a head start
                    in your next one. Alice&apos;s rebirth trust (0.54) was higher than the default (0.50) - earned through past quality.
                  </div>
                </div>
              </div>

              {/* Reddit karma comparison */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-200">How is this different from Reddit karma?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 font-medium mb-2">Reddit / traditional reputation:</p>
                    <ul className="space-y-1 text-gray-500">
                      <li>Karma is a single number (one-dimensional)</li>
                      <li>Upvotes are free - no cost to inflate</li>
                      <li>Karma trapped on one platform</li>
                      <li>Create new account = fresh start</li>
                      <li>Bad behavior → ban → new account → repeat</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sky-400 font-medium mb-2">Web4 trust:</p>
                    <ul className="space-y-1 text-gray-300">
                      {/* Aug-21 visitor HIGH 1: this bullet read "(skill, reliability,
                          temperament)". Two defects in three words. It drops TRAINING, and
                          "reliability" is Temperament's own gloss (grep -n "Temperament (reliability)"
                          src/app/glossary/page.tsx), so the list named one dimension twice and
                          another not at all. Wording is propagated verbatim from this page's own
                          concept card, NOT re-authored: grep -n "Shorthand: <strong>T3" in this
                          file, which already reads "three dimensions: talent, training,
                          temperament" in lowercase ([[propagate-the-sentence-not-your-summary]]).

                          WHY EVERY PRIOR T3 SWEEP MISSED IT, and this is the reusable part.
                          The string has ZERO hits in the served HTML for /first-contact. This
                          bullet lives in the Act 5 branch of a client component and renders only
                          after the visitor presses Start and steps through to the end, so a
                          fetch-and-grep audit of the route cannot see it. Any future audit of T3
                          wording has to RENDER the walkthrough, not grep the page
                          ([[visitor-quoted-number-find-the-surface]]). The same caveat applies to
                          every other literal in simulationSnapshots and in the Act panels.

                          Scope note: the sibling bullet "New identity requires new hardware ($$$)"
                          is in the same list and is NOT touched. "identity is hardware-bound" was
                          closed as a live question in #525 and re-opening it here would be a new
                          claim, not this fix. */}
                      <li>Trust is multi-dimensional (talent, training, temperament)</li>
                      <li>Confirming quality costs energy - can&apos;t inflate for free</li>
                      <li>Trust follows you across communities</li>
                      <li>New identity requires new hardware ($$$)</li>
                      <li>Bad behavior → death → rebirth with permanent record</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("concepts")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Understand the Concepts →
            </button>
          </div>
        )}

        {/* Step: Concepts */}
        {currentStep === "concepts" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("narrative")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Why Web4 Works This Way</h1>
              <p className="text-gray-300">
                Now that you've seen it in action, here's the theory behind what you witnessed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ATP Economics */}
              <div className="bg-gradient-to-br from-sky-900/30 to-gray-800 border border-sky-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="text-xl font-bold text-sky-400 mb-3">ATP Economics</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> Traditional platforms let you post unlimited content. Result? Spam prevails,
                  quality drowns, moderation armies needed.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Every action costs ATP (energy). Posting? Costs ATP.
                  Messaging? Costs ATP. Voting? Costs ATP. Your budget is finite.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>The breakthrough:</strong> Spam becomes impossible through economics, not moderation.
                  Spammers burn ATP faster than they earn it. Quality creators earn more than they spend.
                </p>
                <Link href="/atp-economics" className="text-sky-400 hover:underline text-sm">
                  Deep dive: ATP Economics →
                </Link>
              </div>

              {/* Trust */}
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-800 border border-purple-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-purple-400 mb-3">Trust: Your Reputation</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> On traditional platforms, bad actors just create new accounts.
                  Ban them? They're back tomorrow with a fresh identity.
                </p>
                {/* Aug-08 visitor HIGH. This is the same false universal as the four on
                    /karma-consequences, in the same problem/solution shape, and on a page EARLIER
                    in the five-page reading path, so the default reader met it first. Q8 Ruling 1
                    (2026-08-05): software-only anchoring is conformant and canon forbids excluding
                    the tier, so "no fresh starts" is not true of Web4 as such. Unlike the
                    collapsed four-idea card above, this block is open prose stating the thesis, so
                    it takes the qualifier rather than a deletion. Says nothing about 0.50 or any
                    ceiling: that is the Q8 equity half, still under a holding pattern. */}
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Anchor your presence to a device you hold. Trust
                  accumulates over time. Everyone can see your track record, and a fresh start costs
                  you a new device rather than nothing.
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Honestly, though: an identity anchored in software alone has no device to walk away
                  from, so at that tier the record stays sheddable. Web4 makes fresh starts expensive,
                  it does not abolish them.{' '}
                  <Link href="/what-could-go-wrong#risk-accessibility" className="text-sky-400 hover:text-sky-300 underline">
                    What that costs, and who it costs most &rarr;
                  </Link>
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Society thresholds:</strong> Each society sets its own minimum trust. Fall below it?
                  You're ejected from that society - but you can still participate in others. Your ejection
                  is visible globally, affecting how other societies perceive you (like a DUI affecting your
                  pilot's license).
                </p>
                <Link href="/trust-tensor" className="text-purple-400 hover:underline text-sm">
                  Deep dive: Trust Tensors →
                </Link>
              </div>

              {/* Identity */}
              <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-6">
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="text-xl font-bold text-green-400 mb-3">Presence: Hardware-Bound</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> Email-based accounts are free to create. One person can have
                  thousands of identities, manipulating conversations and gaming systems.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Your digital presence (called LCT) is bound to physical hardware, making it verifiable.
                  Creating fake accounts requires buying new devices. Expensive to fake, impossible to scale.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Your benefit:</strong> The trust you build is truly yours - portable across all Web4
                  communities, accumulated over your lifetime, impossible to steal.
                </p>
                <Link href="/lct-explainer" className="text-green-400 hover:underline text-sm">
                  Deep dive: Identity (LCT) →
                </Link>
              </div>

              {/* Consequences */}
              <div className="bg-gradient-to-br from-orange-900/30 to-gray-800 border border-orange-700 rounded-xl p-6">
                <div className="text-3xl mb-3">📜</div>
                <h3 className="text-xl font-bold text-orange-400 mb-3">Consequences: Visible Record</h3>
                <p className="text-gray-300 mb-4">
                  <strong>The problem:</strong> On traditional platforms, consequences are temporary. Wait out a
                  ban, delete old posts, or just start fresh. No long-term accountability.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Web4 solution:</strong> Your track record is permanent and visible across societies.
                  Get ejected from one community? Others can see why. Good behavior compounds - consistent quality
                  builds trust that opens doors everywhere.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>Reintegration path:</strong> You can recover from mistakes through the same process
                  humans use: demonstrate changed behavior in other contexts, rebuild your reputation, and apply
                  for readmission. The record remains, but redemption is possible.
                </p>
                <Link href="/coherence-index" className="text-orange-400 hover:underline text-sm">
                  Deep dive: Coherence Index →
                </Link>
              </div>
            </div>

            {/* How It Compares */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Web4 vs Traditional Platforms</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4"></th>
                      <th className="py-3 px-4 text-gray-400">Traditional</th>
                      <th className="py-3 px-4 text-sky-400">Web4</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Spam control</td>
                      <td className="py-3 px-4">Moderation armies</td>
                      <td className="py-3 px-4 text-green-400">Economic self-regulation</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Identity</td>
                      <td className="py-3 px-4">Free accounts, unlimited alts</td>
                      <td className="py-3 px-4 text-green-400">Hardware-bound, expensive to fake</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Reputation</td>
                      <td className="py-3 px-4">Platform-specific, deletable</td>
                      <td className="py-3 px-4 text-green-400">Portable, permanent, yours</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 font-semibold">Consequences</td>
                      <td className="py-3 px-4">Temporary bans, fresh starts</td>
                      <td className="py-3 px-4 text-green-400">Permanent record, compounding trust</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Quality incentive</td>
                      <td className="py-3 px-4">Engagement metrics</td>
                      <td className="py-3 px-4 text-green-400">Direct economic reward</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("next-steps")}
              className="w-full bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all"
            >
              Where to Go Next →
            </button>
          </div>
        )}

        {/* Step: Next Steps */}
        {currentStep === "next-steps" && (
          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentStep("concepts")}
                className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
              <p className="text-xl text-gray-300">
                You now understand the fundamentals of Web4. Here's where to go from here.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-gray-800 border border-green-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">What You Now Understand</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>✅ Why spam is economically impossible (ATP costs)</div>
                <div>✅ How trust builds through quality (reputation)</div>
                <div>✅ Why identity can't be faked (hardware-bound)</div>
                <div>✅ How consequences compound (permanent record)</div>
                <div>✅ Why moderation isn't needed (self-regulation)</div>
                <div>✅ How recovery works (rebuild through quality)</div>
                <div>✅ What death means (ATP exhaustion, permanent record)</div>
                <div>✅ How karma compounds (better starts from past quality)</div>
              </div>
            </div>

            {/* Primary CTA: Make it personal */}
            <div className="bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-xl p-8 text-center">
              <p className="text-xl text-gray-300 mb-2">
                You watched Alice&apos;s story. Now see how Web4 actually runs.
              </p>
              <p className="text-gray-400 mb-6">
                The onramp is the four composable pieces that make Web4 real: the core standard (the substrate),
                the hub (community), hestia (personal), and hardbound (enterprise). Start there to go from concept to code you can run.
              </p>
              <Link
                href="/onramp"
                className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-purple-700 transition-all text-lg"
              >
                Explore the Onramp &rarr;
              </Link>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Choose Your Path</h3>
              <p className="text-gray-400 mb-4">Pick what fits how you like to learn.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {/* What's Running Now */}
                <Link href="/running-now">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-emerald-500 transition-colors cursor-pointer">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">I want what&apos;s real</div>
                    <div className="text-2xl mb-2">✅</div>
                    <h4 className="text-lg font-bold text-emerald-400 mb-2">What&apos;s Running Now</h4>
                    <p className="text-gray-400 text-sm">
                      An honest map of what actually works today: the open-source reference implementation, what is deployed, and what is still R&amp;D.
                    </p>
                  </div>
                </Link>

                {/* Day in Web4 */}
                <Link href="/day-in-web4">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-amber-500 transition-colors cursor-pointer">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">I want to see real life</div>
                    <div className="text-2xl mb-2">☀️</div>
                    <h4 className="text-lg font-bold text-amber-400 mb-2">A Day in Web4</h4>
                    <p className="text-gray-400 text-sm">
                      Walk through everyday scenarios - hiring, reviews, trolls - and see how each one works differently with trust built in.
                    </p>
                  </div>
                </Link>

                {/* The Onramp */}
                <Link href="/onramp">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-sky-500 transition-colors cursor-pointer">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">I want to get involved</div>
                    <div className="text-2xl mb-2">🛠️</div>
                    <h4 className="text-lg font-bold text-sky-400 mb-2">The Onramp</h4>
                    <p className="text-gray-400 text-sm">
                      The four composable pieces that make Web4 real: the core standard, the hub, hestia, and hardbound. See how to actually run it.
                    </p>
                  </div>
                </Link>

                {/* Learn */}
                <Link href="/learn">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors cursor-pointer">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">I want to understand</div>
                    <div className="text-2xl mb-2">📚</div>
                    <h4 className="text-lg font-bold text-green-400 mb-2">Concepts In Depth</h4>
                    <p className="text-gray-400 text-sm">
                      Understand the mechanics behind what you just saw. Trust tensors, coherence, identity - at your own pace.
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4">Additional Resources</h4>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <Link href="/glossary" className="text-sky-400 hover:underline">
                  📖 Glossary (All Terms)
                </Link>
                <Link href="/coherence-framework" className="text-purple-400 hover:underline">
                  🧬 Coherence Framework
                </Link>
                <Link href="/lct-explainer" className="text-green-400 hover:underline">
                  🔗 Identity Deep Dive
                </Link>
                <a href="https://dp-web4.github.io/web4/" className="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  📄 Web4 Whitepaper
                </a>
                <a href="https://github.com/dp-web4/4-life" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  🧪 4-Life GitHub Repo
                </a>
                <Link href="/what-could-go-wrong" className="text-red-400 hover:underline">
                  🛡️ What Could Go Wrong
                </Link>
              </div>
            </div>

            {/* Start Over */}
            <button
              onClick={() => {
                setCurrentStep("welcome");
                setPlaybackIndex(0);
              }}
              className="w-full bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-all"
            >
              Start Over
            </button>
          </div>
        )}
        <ExplorerNav currentPath="/first-contact" />
        <RelatedConcepts currentPath="/first-contact" />
      </div>
    </div>
  );
}
