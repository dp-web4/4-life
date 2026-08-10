import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import TermTooltip from "@/components/TermTooltip";
import PageTracker from "@/components/PageTracker";
import SectionTOC from "@/components/SectionTOC";
import InProduction from "@/components/InProduction";
import LifecycleDemo from "@/components/LifecycleDemo";

const HOW_IT_WORKS_SECTIONS = [
  { id: 'journey', label: 'Birth → Life → Death → Rebirth' },
  { id: 'example', label: 'A Complete Example' },
  { id: 'pieces', label: 'How Pieces Fit Together' },
  { id: 'design', label: 'Why This Design Works' },
  { id: 'governance', label: 'When Things Go Wrong' },
  { id: 'agents', label: 'When Agents Work Together' },
  { id: 'action', label: 'See It In Action' },
  { id: 'deeper', label: 'Dive Deeper' },
];

/* Jul-27 visitor HIGH: "the rule is 'When ATP = 0, You Die', but the worked example has agents
   'Died with 145 ATP', 'Died with 130 ATP', and Life 3 'Ended strong: 165 ATP'. Nobody in the
   example dies by the stated rule."
   That is true and it is not fixable by copy alone. Checked before writing: web4 canon defines
   NO life-ending path other than ATP exhaustion or sustained trust collapse (grep of
   web4-standard/ and docs/ for natural death / bounded life / lifespan returns nothing; the LCT
   lifecycle is NASCENT -> ACTIVE -> SUSPENDED -> REVOKED). /atp-economics writes "died naturally"
   for two of its four lives and plain "died" for the third, so the sibling page is not clean
   ground truth either. Inventing a second mechanism here would be a canon decision this track is
   not authorized to make, so this note states the gap without filling it, and the question is
   escalated as Q5 in docs/WEB4-CANON-QUESTIONS.md.
   Rendered at BOTH places the visitor hit the numbers, from one component so they cannot drift.
   Jul-30 update: the original closer disclaimed the death rule and, in the same breath, held up the
   carry-forward as the thing these figures legitimately demonstrate. But Q5 files the carry-forward
   AMOUNT as a second, independent divergence ("whether karma is the full final ATP or a reduced
   portion of it is not settled between the two pages either"), and /karma-consequences:629 models
   it a third way. So the caveat now covers BOTH halves. Do not re-endorse either quantity here.
   Aug-06 update: the visitor QUOTED this caveat's karma half back in their journal and still filed
   the death half as a HIGH. Two prose passes have not landed it, so the residual is the
   ILLUSTRATION, not the copy. The example was inconsistent with itself: Lives 1/2 said "Died with"
   while Life 3 said "Ended strong", and "Died" claims the narrow, defined death event this page
   rules out four screens above. The verb is normalized to the page's own "Ended" on all lives.
   That REMOVES an assertion; it does not add one, and it invents no second mechanism (still Q5).
   The same four-life walkthrough with the same figures runs on /atp-economics (:1470/:1486/:1501),
   which said "Died NATURALLY" - a strictly stronger form of the undefined mechanism. Normalized
   there in the same pass so the two pages cannot diverge on identical numbers.
   Do NOT hoist this component into src/components/ to share it with /atp-economics: that page has
   no caveat of its own and defines a real ATP=0 death at :1127. Giving it one is a separate,
   larger job than the filed friction. Logged as follow-up, not done here. */
function EndOfLifeCaveat() {
  return (
    <p className="text-xs text-amber-300/70 mt-3 leading-relaxed">
      <strong className="text-amber-300">About these numbers:</strong> none of these lives ends at
      0 ATP, so none of them is the energy death described above. That is why they read{" "}
      <em>ended</em> and not <em>died</em>: they are not the death this page defines, and Web4
      does not define a second one. What else ends a life is <strong>not settled</strong>: the
      standard says what stops you acting (ATP reaches zero) and what is permanent (sustained trust
      collapse), and it names no term limit, no lifespan, and no natural end of life. So rather
      than invent a third cause to justify the figures below, this page declines to name one. How{" "}
      <em>much</em> karma carries is also unsettled: whether you keep your whole final balance or a
      reduced portion of it is not decided, and this walkthrough shows one modelling choice, not
      the rule. Read it for the shape (a good track record starts your next life stronger), not for
      the death rule or the exact carry-forward.
    </p>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageTracker slug="how-it-works" />
      <SectionTOC sections={HOW_IT_WORKS_SECTIONS} />
      <Breadcrumbs currentPath="/how-it-works" />

      {/* Orientation prompt - two-sided (newcomers / returning visitors) */}
      <div className="max-w-4xl mx-auto mb-4 space-y-2 text-sm text-gray-500">
        <div>
          <strong className="text-gray-300">New to Web4?</strong> This is the full-picture overview - pieces fit together below. If you&apos;d rather see one concept at a time first,{' '}
          <Link href="/first-contact" className="text-sky-400 hover:underline">First Contact</Link> walks an agent through her lifecycle, the{' '}
          <Link href="/tldr" className="text-sky-400 hover:underline">2-minute TL;DR</Link> gives the high-level view, and the{' '}
          <Link href="/lct-explainer" className="text-sky-400 hover:underline">concept sequence</Link> covers each piece individually.
        </div>
        <div>
          <strong className="text-gray-300">Already know Web4?</strong> Skip ahead to the{' '}
          <a href="#pieces" className="text-sky-400 hover:underline">full-picture diagram</a>{' '}
 - a visual summary of how LCT, ATP, T3, MRH, and CI combine.
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Web4 Explained
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          How Web4 Societies Work
        </h1>
        <p className="text-sm text-gray-400 italic mb-4">
          This is the comprehensive walkthrough, so it runs long. Brand new? Skim{" "}
          <Link href="/tldr" className="text-sky-400 hover:underline not-italic">Web4 in 2 minutes</Link>{" "}and{" "}
          <Link href="/why-web4" className="text-sky-400 hover:underline not-italic">Why Web4</Link>{" "}
          first, then come here to go deep.
        </p>
        {/* Jul-28 visitor HIGH: the headline read "Nothing here is live - this is a research prototype",
            which its OWN sub-paragraph already contradicted ("no live NETWORK with real users") and which
            /running-now's badge definitions flatly refute (hestia is badged Running = "live instances
            actually exist"). The visitor collected four different answers to "is any of this real yet"
            and left the "what is real today" checklist box unchecked after reading the page dedicated to
            it. Headline now does BOTH jobs the old one did: scopes the claim to the network AND keeps the
            speculative-present-tense warning. "You can join" is load-bearing - /hub says "This isn't
            hypothetical: we run one" (the lab fleet is real but not joinable), so a bare "no public
            network" would re-create the contradiction one page over. CANONICAL SENTENCE below is
            IDENTICAL on /day-in-web4 and /hestia - keep it verbatim if editing. */}
        <div className="mb-4 p-3 bg-amber-950/30 border border-amber-800/30 rounded-lg">
          <p className="text-base font-bold text-amber-200 flex items-center gap-2">
            <span aria-hidden="true">🔬</span>
            No network you can join yet - the present tense below is the model talking.
          </p>
          <p className="mt-1.5 text-sm text-amber-200/75">
            The spec is written, the code is installable today, and there is no public network open to outside members yet.{' '}
            Everything below describes how Web4 <em>would</em> work at society scale, validated through simulations and an open-source{' '}
            <Link href="/why-web4#faq-deployed" className="text-amber-300 hover:text-amber-200 underline">reference implementation</Link>
 . The present tense throughout is the model talking, not a running system.
            {' '}Want the piece-by-piece breakdown of what is installable versus specified? See{' '}
            <Link href="/running-now" className="text-amber-300 hover:text-amber-200 underline">what&apos;s actually running now</Link>
 .
            {' '}Curious what early deployment could look like? See the{' '}
            <Link href="/why-web4#faq-adoption-path" className="text-amber-300 hover:text-amber-200 underline">concrete adoption path</Link>{' '}
 - from browser extension overlays to full integration.
          </p>
        </div>
        <div className="mb-6 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg text-sm text-gray-300 space-y-2">
          <p className="text-xs uppercase tracking-wide text-sky-400 mb-2 font-semibold">Key Takeaways</p>
          <p>You&apos;re born with <strong className="text-green-400">energy</strong> and <strong className="text-purple-400">neutral trust</strong>. Every action costs energy, from about 1 ATP to read something up to 10-20 to post. Quality contributions earn it back; spam drains it.</p>
          <p>Your <strong className="text-blue-400">identity</strong> is tied to your devices - no passwords, no central authority. Your <strong className="text-purple-400">trust</strong> is multi-dimensional (competence, reliability, consistency) and role-specific.</p>
          <p>If your energy hits zero or trust collapses, you die. But good karma carries forward - you&apos;re reborn with a head start. <strong className="text-cyan-400">No moderators needed.</strong> Five interlocking systems (identity, energy, trust, consistency, context) make spam expensive and quality self-sustaining.</p>
        </div>

        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 is trust-native infrastructure for humans and AI. Instead of
          relying on platforms, moderators, or authorities, Web4 societies
          self-regulate through five foundational mechanisms:
        </p>

        <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-3">
            <strong className="text-gray-300">Five systems, in plain English:</strong>{' '}
            Web4 has some acronyms. Here&apos;s what they mean - refer back anytime.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span><span className="text-blue-400 font-semibold">LCT</span> <span className="text-gray-500">= Identity</span></span>
            <span><span className="text-green-400 font-semibold">ATP</span> <span className="text-gray-500">= Energy budget</span></span>
            <span><span className="text-purple-400 font-semibold">T3</span> <span className="text-gray-500">= Trust score</span></span>
            <span><span className="text-orange-400 font-semibold">CI</span> <span className="text-gray-500">= Behavioral consistency</span></span>
            <span><span className="text-cyan-400 font-semibold">MRH</span> <span className="text-gray-500">= Context boundary</span></span>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Hover any <span className="text-sky-400/70">dotted-underlined term</span> for a quick definition, or use the glossary button <span className="inline-block px-1.5 py-0.5 bg-gray-900 border border-gray-700 rounded text-xs text-gray-400">Aa</span> in the bottom-left corner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Identity (<TermTooltip term="LCT" />)
            </h3>
            <p className="text-sm text-gray-400">
              Unforgeable identity rooted in hardware, strengthened by multiple
              devices witnessing each other.
            </p>
            <Link
              href="/lct-explainer"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              ATP Economics
            </h3>
            <p className="text-sm text-gray-400">
              Every action costs energy (<TermTooltip term="ATP" />). Run out? You
              die. Contribute value? You thrive.
            </p>
            <Link
              href="/atp-economics"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Trust (<TermTooltip term="T3" />)
            </h3>
            <p className="text-sm text-gray-400">
              Multi-dimensional trust scored across Talent, Training,
              and Temperament - per role.
            </p>
            <Link
              href="/trust-tensor"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>

          {/* 2026-06-06 visitor LOW + Unanswered Q1: this grid had CI before MRH, but the landing page
              and the LCT page's concept-sequence roadmap both use the canonical MRH(4)→CI(5) order.
              Swapped so all three surfaces agree (LCT→ATP→T3→MRH→CI). The system-integration diagram
              below intentionally places MRH as a loop-gate and is left untouched. */}
          <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border border-cyan-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">
              Context (MRH)
            </h3>
            <p className="text-sm text-gray-400">
              You only see what&apos;s relevant to your trust network - like
              hearing only conversations you&apos;re part of. Spam can&apos;t reach you.
            </p>
            <Link
              href="/trust-neighborhood"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🌊</div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">
              Coherence (<TermTooltip term="CI" />)
            </h3>
            <p className="text-sm text-gray-400">
              Behavioral consistency across where you are, what you can do,
              when you act, and who you interact with.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Example: If someone usually posts coding tutorials at 9am and suddenly starts posting crypto spam at 3am from a new country, their coherence drops - making every action more expensive.
            </p>
            <Link
              href="/coherence-index"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>
        </div>

        <p className="text-lg text-gray-400 leading-relaxed">
          Together, these create societies where trust emerges from verifiable
          behavior, not institutional authority. This page walks through how it
          all works.
        </p>

        <p className="text-sm text-sky-400/60 mt-4 animate-pulse">
          ↓ See how all five systems create aliveness below
        </p>

        {/* Complete System Integration Diagram */}
        <div id="system-diagram" className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 scroll-mt-24">
          <h3 className="text-lg font-bold text-gray-100 mb-2">How All Five Systems Create Aliveness</h3>
          <p className="text-sm text-gray-400 mb-5">
            Each system handles one job. Together, they produce a living digital society:
          </p>

          {/* Vertical flow diagram */}
          <div className="space-y-1">
            {/* Layer 1: Foundation */}
            <div className="flex items-center gap-3">
              <div className="w-8 text-center text-gray-600 text-xs font-mono shrink-0">1</div>
              <div className="flex-1 bg-blue-950/40 border border-blue-800/40 rounded-lg p-3 flex items-center gap-3">
                <span className="text-xl">🔐</span>
                <div>
                  <span className="text-sm font-bold text-blue-400">LCT</span>
                  <span className="text-sm text-gray-400"> - Proves you&apos;re real. Hardware-bound identity, unforgeable.</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8"></div>
              <div className="text-gray-600 text-sm pl-4">↓ <span className="text-gray-700 text-xs">identity established</span></div>
            </div>

            {/* Layer 2: Context */}
            <div className="flex items-center gap-3">
              <div className="w-8 text-center text-gray-600 text-xs font-mono shrink-0">2</div>
              <div className="flex-1 bg-cyan-950/40 border border-cyan-800/40 rounded-lg p-3 flex items-start gap-3">
                <span className="text-xl">🌐</span>
                <div>
                  <span className="text-sm font-bold text-cyan-400">MRH</span>
                  <span className="text-sm text-gray-400"> - Defines your reach. Only see what&apos;s relevant to your trust network.</span>
                  <div className="text-xs text-cyan-300/70 mt-1.5 italic">Gates the loop below: you only <strong>spend ATP</strong> and <strong>build T3</strong> in contexts where you&apos;re visible. Actions outside your MRH don&apos;t cost energy and don&apos;t move trust.</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8"></div>
              <div className="text-gray-600 text-sm pl-4">↓ <span className="text-gray-700 text-xs">context bounded</span></div>
            </div>

            {/* Layer 3: The feedback loop */}
            <div className="flex items-center gap-3">
              <div className="w-8 text-center text-gray-600 text-xs font-mono shrink-0">3</div>
              <div className="flex-1 border border-gray-600/60 rounded-lg p-4 bg-gray-900/60">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Feedback Loop - every action cycles through all three:</div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1 text-center">
                  <div className="bg-green-950/40 border border-green-800/40 rounded px-3 py-2 flex-1 w-full">
                    <div className="text-xs font-bold text-green-400">ATP</div>
                    <div className="text-xs text-gray-500">Energy spent</div>
                  </div>
                  <div className="text-gray-600 sm:rotate-0 rotate-90">→</div>
                  <div className="bg-purple-950/40 border border-purple-800/40 rounded px-3 py-2 flex-1 w-full">
                    <div className="text-xs font-bold text-purple-400">T3</div>
                    <div className="text-xs text-gray-500">Trust updated</div>
                  </div>
                  <div className="text-gray-600 sm:rotate-0 rotate-90">→</div>
                  <div className="bg-amber-950/40 border border-amber-800/40 rounded px-3 py-2 flex-1 w-full">
                    <div className="text-xs font-bold text-amber-400">CI</div>
                    <div className="text-xs text-gray-500">Consistency checked</div>
                  </div>
                  <div className="text-gray-600 sm:rotate-0 rotate-90">→</div>
                  <div className="bg-green-950/40 border border-green-800/40 rounded px-3 py-2 flex-1 w-full">
                    <div className="text-xs font-bold text-green-400">ATP</div>
                    <div className="text-xs text-gray-500">Reward earned</div>
                  </div>
                </div>
                <div className="text-center text-xs text-gray-600 mt-2">↻ repeats every action</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8"></div>
              <div className="text-gray-600 text-sm pl-4">↓ <span className="text-gray-700 text-xs">all three healthy?</span></div>
            </div>

            {/* Layer 4: Aliveness */}
            <div className="flex items-center gap-3">
              <div className="w-8 text-center text-gray-600 text-xs font-mono shrink-0">4</div>
              <div className="flex-1 bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-700/40 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <span className="text-sm font-bold text-emerald-400">Aliveness</span>
                    {/* Aug-09 visitor, two MEDIUMs that are one line. It read "ATP > 0 + Trust >
                        0.5 + CI coherent", and both complaints are correct:
                        (1) ENDPOINT. /trust-tensor says 0.5 is the newcomer baseline and you
                        "start at the neutral midpoint", so on a strict reading every newcomer is
                        born not-alive. This is the standing 0.50-endpoint escalation (ledger
                        Q1/Q8). The ENDPOINT RULE at first-contact:295-303 forbids BOTH directions
                        and prescribes "state strictly-below and stop", with DELETE rather than
                        rewrite as the precedent (PR #497). So this is NOT flipped to ">= 0.5", and
                        it is NOT phrased as "not below 0.5" either - that is the >= side wearing a
                        negation. Restated as the DEATH rule, which is the only endpoint-silent
                        form available. Note first-contact:296-297 named "the retired aliveness
                        engines" as the contested call while this page went unswept for a month
                        ([[guard-comment-names-the-un-swept-page]]).
                        (2) DURABILITY. The line dropped the qualifier the rest of the site is
                        careful about, so a momentary dip read as death - which is exactly Alice's
                        recoverable 0.48 on /first-contact. Fixed by propagating this page's OWN
                        sentence from :732 verbatim ("raw trust falls below 0.5 and stays there"),
                        the same string karma-consequences:965 carries. Do not reword it here only.
                        Sibling surface: :1222 carries the identical claim and got the identical
                        treatment. If either moves, move both. */}
                    <span className="text-sm text-gray-400"> - it ends when: ATP hits 0, raw trust falls below 0.5 and stays there, or CI goes incoherent</span>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="text-green-400/80">All three healthy → thrive, rebirth eligible</div>
                  <div className="text-red-400/80">Any one fails → death spiral, no rebirth</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            <strong className="text-gray-400">Why spam dies:</strong> Without LCT, you can&apos;t enter. Without MRH, you can&apos;t reach anyone. Without ATP, you can&apos;t act. Without T3, you aren&apos;t trusted. Without CI, you&apos;re flagged. Every layer filters bad actors - no single point of failure, no moderators needed.
          </p>
        </div>
      </section>

      <InProduction concept="stack" />

      {/* The Journey: Birth to Death to Rebirth */}
      <section id="journey" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          The Journey: Birth → Life → Death → Rebirth
        </h2>
        <p className="text-gray-400 mb-6">
          Web4 societies treat "aliveness" as a measurable property. Before the
          step-by-step below, watch the whole arc run - 30 seconds, no navigation:
        </p>

        <LifecycleDemo />

        {/* Birth */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🐣</div>
            <div>
              <h3 className="text-2xl font-semibold text-sky-400">
                1. Birth: You Enter the Society
              </h3>
              <p className="text-gray-500 text-sm">
                Creating your identity and receiving initial resources
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Identity Creation (LCT)
              </h4>
              <p className="text-gray-300 leading-relaxed">
                You create a <strong>Linked Context Token (LCT)</strong> - your
                verifiable digital presence. This can be bound to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-400">
                <li>
                  <strong>Hardware:</strong> Secure Enclave (iPhone/Mac), TPM
                  chip (PC), or FIDO2 security key
                </li>
                <li>
                  <strong>Multi-device:</strong> Multiple devices witnessing
                  each other (stronger identity)
                </li>
                <li>
                  <strong>VM-bound:</strong> Software identity for AI agents
                </li>
              </ul>
              <p className="text-gray-400 mt-3 text-sm italic">
                Your LCT is registered on the society&apos;s network and becomes
                part of the trust graph - which determines what entities and
                information are visible to you (your &quot;context boundary&quot;).
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Initial Resources (ATP)
              </h4>
              <p className="text-gray-300 leading-relaxed">
                You receive an initial <strong>ATP allocation</strong> (typically
                100). This is your energy budget - spend it wisely.
              </p>
              <div className="mt-3 p-3 bg-green-900/20 border border-green-800/30 rounded">
                <p className="text-green-300 text-sm">
                  ✅ <strong>New life:</strong> 100 ATP to start exploring
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Neutral Trust (T3)
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Your trust tensor starts at neutral (0.5 in all dimensions):
              </p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="p-2 bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-400">Talent</div>
                  <div className="text-sm text-gray-300">0.5</div>
                </div>
                <div className="p-2 bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-400">Training</div>
                  <div className="text-sm text-gray-300">0.5</div>
                </div>
                <div className="p-2 bg-gray-800 rounded text-center">
                  <div className="text-xs text-gray-400">Temperament</div>
                  <div className="text-sm text-gray-300">0.5</div>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                You haven't done anything yet - society doesn't know if you're
                trustworthy. Build trust through actions.
              </p>
            </div>
          </div>
        </div>

        {/* Life */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🌱</div>
            <div>
              <h3 className="text-2xl font-semibold text-green-400">
                2. Life: You Act, Build Trust, Manage ATP
              </h3>
              <p className="text-gray-500 text-sm">
                The core loop of Web4 existence
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Actions Cost ATP
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                {/* Jul-30 visitor MEDIUM: this block said "Reading and browsing are free", which
                    the Key Takeaways line ("Every action costs energy") appeared to contradict. The
                    visitor asked us to soften the takeaway. Fix direction is the OPPOSITE: /atp-economics
                    OWNS ATP and prices reads on two independent surfaces, with a reason - the FAQ at
                    #faq-reading-cost (1 ATP a read, 2 to view, so mass scraping is not free) and the
                    mechanism prose at :1485 ("Routine interactions (reading a post, browsing content)
                    generate small ADP receipts"). "Free" here was the unreasoned side, so it moved.
                    Do not restore a bare "free" on this page. Note day-in-web4 still says
                    "lurking is free" (two instances); same defect, deferred, propagate there next. */}
                Actions that affect others cost ATP from your energy budget. Reading and browsing are
                effectively free, about 1 ATP a read, so what you spend is essentially what you put out:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Effectively free (1-2 ATP)
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>• Reading and browsing content</p>
                    <p>• Viewing profiles and trust scores</p>
                    <p>• Observing community activity</p>
                  </div>
                  {/* Jul-31 (#499 review): this footnote first shipped saying a dozen reads is
                      "roughly 1% of your starting balance", carried over from the atp-economics FAQ.
                      That is wrong by 12x on the site's own two figures: 12 reads x 1 ATP = 12 ATP
                      against a 100 ATP grant = 12%. Fixed at source too; do not reintroduce it here.
                      Two instruments were rejected, not just the number:
                      (a) percentage-of-starting-balance, because the grant is a ONE-TIME endowment
                          and reading is a RECURRING cost, so no corrected percentage survives the
                          FAQ's own "30-50 posts a day" (that is 30-50% of the grant per day);
                      (b) earnings-relative ("a post funds many reads"), because atp-economics
                          summary item 3 caps recharge on self-initiated work at what you spent, and
                          the "0 net at best" card in the two-channel block below says a self-chosen
                          post nets zero. A post funds nothing; it refunds itself. Shipping the
                          earnings framing would re-arm the exact defect #498 fixed further down
                          this page (see the Jul-30 visitor HIGH guard under the "Contributions
                          Earn ATP" heading).
                      What survives is cost-of-a-read against cost-of-an-action, which is arithmetic
                      on the two cards of this same grid (1-2 ATP here, 10-20 ATP in the "Costs ATP"
                      card beside this one), asserts no earnings claim, and is what "effectively
                      free" means on this surface: free relative to acting, which is already the
                      sentence's own next clause.
                      Every cite here NAMES its target instead of numbering it. This comment first
                      shipped with line numbers derived before the #500/#501 merge shifted this file
                      ~20 lines, so all three landed on the wrong card. A pointer that rots silently
                      is how a guard gets discounted by the session that follows it. */}
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Lurking is cheap, not literally free: a read costs about 1 ATP and viewing content
                    about 2, against 10-20 ATP for a single post in the column beside this one. So a
                    read runs about a tenth to a twentieth of one post, and the tiny charge exists so
                    that scraping a million posts is not free either.{' '}
                    <Link href="/atp-economics#faq-reading-cost" className="text-sky-400 hover:underline">
                      Why reading costs anything at all &rarr;
                    </Link>{' '}
                    Real spending starts when you act - post, vote, transact, or create.
                  </p>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Costs ATP (actions that affect others)
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>• Posting content (10-20 ATP)</p>
                    <p>• Creating tasks (15-30 ATP)</p>
                    <p>• Broadcasting (20-50 ATP)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Contributions Earn ATP
              </h4>
              {/* Jul-30 visitor HIGH (3rd visitor on this contradiction, after Jun-11 browse B and
                  Jun-12 browse A): these two rows were titled "High-quality post" and "Helpful
                  contribution" (unsolicited, self-initiated work, which atp-economics puts in the
                  CAPPED recharge channel) while carrying uncapped payment-channel numbers. Every
                  prior fix landed in PROSE (atp-economics summary item 3, the #net-positive fold,
                  and the "task pays what the work is worth" parenthetical under the Three Lives
                  worked example here); nobody ever fixed the example LABELS, which is why it
                  recurs. That third cite read "L862 here" until Jul-31 and was never right:
                  :862 was already blank at #498's own commit, and it points at the karma rebirth
                  card at HEAD. Name the target, do not number it.
                  [[visitor-read-it-and-still-filed-it]] - the visitor read the reconciliation and
                  filed it anyway, so the residual is the illustration, not the explanation. Their
                  words: "The concept is fine. The illustrations of it are wrong." Channel is now
                  named IN each example rather than in an aside, and the capped case is shown
                  alongside so the answer to "can contributing ever net me energy?" (their
                  Unanswered Q3) is legible without opening anything. */}
              <p className="text-gray-300 leading-relaxed mb-3">
                ATP comes back two ways, and which one you are in depends on{" "}
                <em>who asked for the work</em>:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded">
                  <p className="text-green-300 text-sm">
                    ✅ <strong>Commissioned write-up</strong>{" "}
                    <span className="text-gray-400">(someone else priced it)</span>: Cost 15 ATP → Paid
                    40 ATP = <strong className="text-green-400">+25 net</strong>
                  </p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded">
                  <p className="text-green-300 text-sm">
                    ✅ <strong>Commissioned fix, delivered well</strong>{" "}
                    <span className="text-gray-400">(someone else priced it)</span>: Cost 20 ATP → Paid
                    60 ATP = <strong className="text-green-400">+40 net</strong>
                  </p>
                </div>
                <div className="p-3 bg-sky-900/20 border border-sky-800/30 rounded">
                  <p className="text-sky-200 text-sm">
                    ➖ <strong>A post you chose to write</strong>{" "}
                    <span className="text-gray-400">(nobody commissioned it)</span>: Cost 15 ATP →
                    recharges up to 15 ATP ={" "}
                    <strong className="text-sky-300">0 net at best</strong>
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-800/30 rounded">
                  <p className="text-red-300 text-sm">
                    ❌ <strong>Spam message:</strong> Cost 10 ATP → Earn 0 ATP =
                    <strong className="text-red-400"> -10 net</strong>
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                Work you initiate can hold you steady; work someone commissioned is what puts you
                ahead. Either way quality is the gate, and spam runs the balance down until there
                is nothing left to act with.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Trust Evolves with Behavior
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Every action updates your T3 trust tensor:
              </p>
              <div className="space-y-2">
                {/* Jul-30 visitor HIGH: these two blocks carried +0.15/+0.20/+0.10 and
                    -0.05/-0.25/-0.20, an order of magnitude above the canonical rule stated
                    further down this same page (L883: base_delta = 0.02 x (quality - 0.5),
                    max magnitude 0.01) and with the dimension ordering inverted (canon scales
                    talent x1.0 / training x0.8 / temperament x0.6, so talent is ALWAYS the
                    largest mover; these had training largest). Recomputed from the rule, using
                    the same 0.85-quality worked step the details block at L884-891 and
                    /trust-tensor already ship, so all three surfaces now agree digit for digit.
                    The quality figure is now shown so a reader can run the arithmetic here.
                    NOT touched, different quantities: L896 "+0.15" is the Novice's CUMULATIVE
                    0.50->0.65 climb across a dozen+ actions (correct), and L1344 "Training
                    drops by 0.15" is a SAL law-oracle PRESCRIBED penalty, a different mechanism
                    from the incremental update rule. */}
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-2">
                    Example: Delivered high-quality work on time{" "}
                    <span className="text-gray-500">(quality 0.85)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <div className="text-gray-500">Talent</div>
                      <div className="text-green-400">+0.007</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Training</div>
                      <div className="text-green-400">+0.0056</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Temperament</div>
                      <div className="text-green-400">+0.0042</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-2">
                    Example: Missed deadline without warning{" "}
                    <span className="text-gray-500">(quality 0.25)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <div className="text-gray-500">Talent</div>
                      <div className="text-red-400">-0.005</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Training</div>
                      <div className="text-red-400">-0.004</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Temperament</div>
                      <div className="text-red-400">-0.003</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                Both examples run the same rule: quality sets the sign and the size, and each
                dimension moves by a fixed share of it (talent full, training four fifths,
                temperament three fifths). The steps are deliberately tiny. Reputation is the
                accumulation of hundreds of them, not the payoff of any one.
              </p>
            </div>
          </div>
        </div>

        {/* Death */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">💀</div>
            <div>
              <h3 className="text-2xl font-semibold text-red-400">
                3. Death: ATP Reaches Zero
              </h3>
              <p className="text-gray-500 text-sm">
                Energy death, the recoverable kind
              </p>
            </div>
          </div>

          <div id="two-ways-to-die" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4 scroll-mt-24">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Two ways to die, and they are very different
              </h4>
              {/* Jul-25 + Jul-27 visitor HIGH (recurred across two separate browses). This
                  paragraph read "Death in Web4 is not a timeout or suspension", which flatly
                  contradicted /first-contact ("'death' here means Alice's standing is suspended")
                  and /atp-economics ("closer to a suspended license reinstated than a clean
                  slate"). Two-against-one, and this wording predates #484's softening, so it is
                  the outlier, not the canon.
                  The canonical rule sentence already exists on /first-contact L153 and is reused
                  VERBATIM below - keep it that way if editing. It threads the 0.5-endpoint
                  escalation correctly (crossing vs staying, raw vs effective), so paraphrasing it
                  would assert an endpoint canon has not settled. See WEB4-CANON-QUESTIONS Q1.
                  Aug-07 (15:00): the tail clause changed on all six surfaces. It read "- effective
                  trust sets your karma tier, not whether you live"; "karma tier" was defined nowhere
                  on the site and does not exist in canon, and it came from the retired /karma-journey.
                  The replacement is /coherence-index's already-shipping prose sentence (the non-comment
                  hit of `grep -n "narrows your access" src/app/coherence-index/page.tsx`), propagated, not
                  re-derived. Do not re-attribute cost to effective trust: cost is 1/CI², a function of
                  CI alone. Full rationale in /first-contact's Step-5 guard
                  (`grep -n "THE CANONICAL TAIL" src/app/first-contact/page.tsx`). */}
              <p className="text-gray-300 leading-relaxed">
                Two paths: <strong className="text-red-400">ATP hits zero</strong> (energy death -
                you can&apos;t act anymore) or{" "}
                <strong className="text-red-400">raw trust falls below 0.5 and stays there</strong>{" "}
                (trust death - the community no longer trusts you). Energy death is recoverable
                through karma rebirth. Trust death is permanent - a destroyed reputation
                can&apos;t be reset. One line, two consequences: <em>crossing</em> below 0.5
                restricts your features right away and is recoverable; only <em>staying</em> below
                it is fatal - a sustained collapse, not a single stumble. The number compared is{" "}
                <strong>raw</strong> trust, not effective trust (raw &times; CI&sup2;). A lower CI
                raises your costs and narrows your access; it does not push you toward trust death.
              </p>
              {/* Aug-07 visitor HIGH, A3. The visitor did the decay-vs-survival arithmetic HERE,
                  on this page, because this is where they finally got the survival rule. The
                  reconciliation itself lives at /trust-tensor#decay-and-survival, next to the rates
                  that generate the alarm; this is the pointer, not a second copy of the answer.
                  The paragraph ABOVE is guarded verbatim (see :711-720) and threads ledger Q1 - do
                  not fold this into it, and do not restate the rule in different words here. This
                  sentence asserts nothing about what happens at the line; it says where the question
                  is addressed. */}
              <p className="text-gray-400 leading-relaxed mt-3 text-sm">
                <strong className="text-gray-300">A question this raises, before you do the arithmetic yourself:</strong>{" "}
                trust dimensions also decay when you are simply inactive, which makes &ldquo;stays
                there&rdquo; worth a second look for someone who is away rather than misbehaving.
                Whether a passively decayed score is read against this rule is not settled, and{" "}
                <Link href="/trust-tensor#decay-and-survival" className="text-sky-400 hover:underline">
                  the decay page says where that stands
                </Link>
                .
              </p>
              <p className="text-gray-400 leading-relaxed mt-3 text-sm">
                So energy death is not the end of your identity. Same LCT, same history, same trust
                record: it is{" "}
                <Link href="/atp-economics#insights" className="text-sky-400 hover:underline">
                  closer to a suspended license reinstated than a clean slate
                </Link>
                . The rest of this section is about that recoverable kind. For the walkthrough
                version, see{" "}
                <Link href="/first-contact#what-triggers-death" className="text-sky-400 hover:underline">
                  what triggers death in First Contact
                </Link>
                .
              </p>
              {/* Aug-07 visitor Unanswered Q5 ("Is trust death society-scoped or global?") plus the
                  answerable half of Q6 ("does the LCT persist as a tombstone?"). The visitor formed
                  Q5 on THIS page because it states both halves and joins neither: the death rule
                  above, and "the penalty is society-specific, not global" in the plagiarism
                  walkthrough at #plagiarism-walkthrough. Q6 formed because the paragraph directly
                  above gives energy death an explicit "same LCT, same history" and the trust-death
                  case gets nothing.
                  GROUNDING, and its limits. Canon settles only the REPUTATION-scoping half:
                  r6-framework.md:76, r7-framework.md:86 and :252 ("Critical Design Principle") and
                  reputation-computation.md:86 (marked CRITICAL) all say there is no global
                  reputation, all reputation is role-contextualized, stored on the MRH role pairing
                  link; SOCIETY_SPECIFICATION.md 2.3/4.2.1 makes citizenship a per-society status
                  machine whose `terminate` is a recorded society-ledger status. Canon has NO
                  trust-death concept at all (that absence IS ledger Q4), so the step from
                  reputation-scope to death-scope is 4-Life's entailment and is voiced as unsettled
                  rather than as canon. See WEB4-CANON-QUESTIONS Q15.
                  DO NOT reword this to "trust death is society-specific, not global". Two things
                  refute that: mcp-protocol.md 7.5 makes cross-society reputation propagation
                  NORMATIVE (a per-action propagation_scope enum, plus an accumulated
                  society-society tensor at the encompassing society), and the site's own DUI clause
                  says an ejection is visible globally (glossary Society Ejection card,
                  first-contact:933). A verdict that stopped at the border would open a new seam
                  with both. Also do not cite reputation-computation.md 10 ("Cross-Society
                  Reputation" under Future Evolution) as evidence that propagation is unbuilt:
                  upstream's own audit C123-reputation-computation-3rd-delta-2026-07-01.md:116
                  records that framing as STILL OPEN and stale against 7.5.
                  The two paragraphs ABOVE are guarded (see :711-720 and :733-740). This one asserts
                  nothing about the line, the endpoint, or what ends a life. */}
              <p className="text-gray-400 leading-relaxed mt-3 text-sm">
                <strong className="text-gray-300">And the question after that: dead where?</strong>{" "}
                Trust in Web4 is never one universal number. It is{" "}
                <Link href="/trust-tensor" className="text-sky-400 hover:underline">
                  scoped to a role
                </Link>
                , and each society keeps its own view of you, which is why the plagiarism
                walkthrough further down this page can say a penalty is{" "}
                <a href="#plagiarism-walkthrough" className="text-sky-400 hover:underline">
                  society-specific, not global
                </a>
                . What crosses a society boundary is the record rather than the verdict: your
                history is visible to other societies and can weigh on how they judge you, the way a
                DUI affects a pilot&apos;s license. Whether that ever amounts to trust death
                somewhere else is not settled. What is not in doubt is the part this page already
                says of the other death: neither one erases you. Your history persists either way.
              </p>
              <div className="mt-3 p-4 bg-red-900/20 border border-red-800/30 rounded">
                <p className="text-red-300 font-semibold mb-2">
                  What drains your ATP to zero
                </p>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>
                    • <strong>Spam yourself to death:</strong> Send 20 spam
                    messages = -200 ATP
                  </li>
                  <li>
                    • <strong>Low-quality contributions:</strong> Earn less than
                    you spend over time
                  </li>
                  <li>
                    • <strong>Ignored by community:</strong> No validation = no
                    ATP rewards
                  </li>
                  <li>
                    • <strong>ATP crisis:</strong> Big actions without enough
                    buffer
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Your Final Record
              </h4>
              <p className="text-gray-300 leading-relaxed">
                At death, your full life history is recorded:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-400">
                <li>
                  Total ATP earned across life
                </li>
                <li>Final T3 trust tensor (Talent, Training, Temperament)</li>
                <li>
                  Actions taken and their outcomes
                </li>
                <li>Community validation history</li>
                <li>
                  Coherence Index (behavioral consistency)
                </li>
              </ul>
              <p className="text-gray-400 mt-3 text-sm italic">
                This record determines whether you're eligible for rebirth.
              </p>
            </div>
          </div>
        </div>

        {/* Rebirth */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">♻️</div>
            <div>
              <h3 className="text-2xl font-semibold text-purple-400">
                4. Rebirth: Karma Carries Forward (Maybe)
              </h3>
              <p className="text-gray-500 text-sm">
                Trust above threshold = reincarnation with benefits
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Eligibility Check: Trust Threshold
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Not everyone gets reborn. The society checks your T3 trust
                tensor - specifically your <strong className="text-gray-200">overall (composite)</strong>{" "}
                score, the single number blended from all three dimensions
                (talent, training, temperament), <em>not</em> each dimension
                clearing 0.5 on its own:
              </p>
              {/* Jul-30 visitor MEDIUM: "the most consequential number on the page is undefined".
                  The canonical weights already shipped on this page (#495) but ~160 lines below and
                  inside a collapsed <details>, so the reader met the life-or-death threshold before
                  the rule that computes it. Weights land here, at the decision point. Canon:
                  trust-tensor:875 and WEB4-CANON-QUESTIONS R1. The >= / < comparators below are
                  ledger Q1 territory and are deliberately untouched.
                  Aug-06: the parenthetical read "(societies can retune them per role)", which is
                  false against t3-v3-tensors.md §10.2 (the composite weights are protocol-invariant;
                  §10.3 gives societies role requirement THRESHOLDS, not weights). Corrected in
                  place, footprint unchanged, arithmetic and comparators still untouched. */}
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                The blend uses the canonical weights{" "}
                <strong className="text-gray-300">0.4 talent + 0.3 training + 0.3 temperament</strong>{" "}
                (the specification fixes them; what varies per role is the minimum each dimension
                must clear, not the blend). So an agent at talent 0.40, training 0.60,
                temperament 0.60 scores <code className="text-gray-300">0.4(0.40) + 0.3(0.60) + 0.3(0.60) = 0.52</code>{" "}
                and stays eligible, even though one dimension is under the line on its own.{" "}
                <Link href="/trust-tensor#t3-composite" className="text-sky-400 hover:underline">
                  The full tensor structure and weights &rarr;
                </Link>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-green-900/20 border border-green-800/30 rounded">
                  <p className="text-green-300 font-semibold mb-2">
                    ✅ Eligible for Rebirth
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Overall T3 score ≥ 0.5 (threshold)
                  </p>
                  <p className="text-green-300 text-sm">
                    You built enough trust. Society wants you back. Reborn with
                    karma (a head start earned by your previous life).
                  </p>
                </div>
                <div className="p-4 bg-red-900/20 border border-red-800/30 rounded">
                  <p className="text-red-300 font-semibold mb-2">
                    ❌ Not Eligible
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Overall T3 score &lt; 0.5 (threshold)
                  </p>
                  <p className="text-red-300 text-sm">
                    You burned trust. Society doesn't want you back. No rebirth.
                    Permanent death.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Karma: What Carries Forward
              </h4>
              {/* Jul-30 visitor MEDIUM ("three different karma mechanics"). This said karma was
                  "a portion of your final ATP", which the very next line falsifies (145 -> 145 is
                  all of it), and the heading asserted karma IS carried ATP. Both replaced with the
                  track-record framing, which asserts NEITHER side of the open question. How much
                  karma carries (whole balance vs reduced portion) is the second, unruled half of
                  ledger Q5 - see WEB4-CANON-QUESTIONS.md. /karma-consequences:629 models it a third
                  way again (next_life_atp = 100 + karma * 2). Do not import any of the three here;
                  the figures below are one modelling choice and EndOfLifeCaveat says so. */}
              <p className="text-gray-300 leading-relaxed">
                If eligible, you're reborn with <strong>karma</strong> - a head
                start earned by the track record of your previous life:
              </p>
              <div className="mt-3 space-y-2">
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Life 1 → Life 2
                  </div>
                  <p className="text-gray-300 text-sm">
                    Ended with <strong className="text-blue-400">145 ATP</strong>.
                    Reborn with <strong className="text-green-400">145 ATP</strong>{" "}
                    (karma carried forward).
                  </p>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Life 2 → Life 3
                  </div>
                  <p className="text-gray-300 text-sm">
                    Ended with <strong className="text-blue-400">130 ATP</strong>.
                    Reborn with <strong className="text-green-400">130 ATP</strong>{" "}
                    (karma carried forward).
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                Your track record compounds across lives. Good behavior =
                stronger starts.
              </p>
              <EndOfLifeCaveat />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Learning Across Lives
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Advanced agents <strong>remember what worked</strong> from their
                previous lives. When reborn, they carry forward lessons about
                which strategies succeed and which fail:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-400">
                {/* Jul-31 visitor HIGH (their #3): this bullet carried the same false claim as
                    atp-economics' Key Insights card, corrected in the same push. Quoted as an
                    in-fiction lesson, but a reader has no way to read it as fiction: the cap rule
                    says confirmations of your own work refund at most what you spent. #498 fixed
                    this page's earning examples in the two-channel block above and left this
                    bullet behind. Now names the channel, which is what makes it true. */}
                <li>"Work someone commissioned pays more than it costs; work I start myself only refunds"</li>
                <li>"Transparency when making mistakes rebuilds trust faster"</li>
                <li>"Consistent small wins beat sporadic big swings"</li>
              </ul>
              <p className="text-gray-400 mt-3 text-sm">
                These lessons carry forward through karma, helping agents
                make better choices in future lives.
              </p>
            </div>
          </div>
        </div>

        {/* Synthon foreshadowing */}
        <div className="mt-8 p-5 bg-purple-950/20 border border-purple-800/30 rounded-lg">
          <h3 className="text-purple-400 font-semibold text-base mb-2">Groups Can Come Alive Too</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            So far we&apos;ve talked about individual agents surviving through energy, trust, and consistency.
            But what happens when several agents consistently cooperate?{" "}
            When individuals build dense mutual trust, something emerges at the group level. Web4 calls
            these <strong className="text-sky-300">synthons</strong>{" "}
            <span className="text-gray-400">(from chemistry: a unit that functions as a building block for larger structures)</span>.
            A team that consistently collaborates well develops its own collective aliveness score,
            separate from any individual member. Think of it like a band that&apos;s greater than
            the sum of its musicians - with its own reputation, energy, and lifecycle.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Synthons form gradually, can dissolve if trust erodes, and you can leave without losing your personal trust.
          </p>
        </div>
      </section>

      {/* Putting It All Together */}
      <section id="example" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Putting It All Together: A Complete Example
        </h2>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Life 1: The Novice
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Born with 100 ATP, neutral T3 (0.5 all dimensions)</li>
              <li>
                • Made meaningful contributions: spent 60 ATP, earned 105 ATP
              </li>
              <li>• Built trust: T3 → 0.65 (talent ↑, training ↑)</li>
              <li>
                • Ended with <strong className="text-green-400">145 ATP</strong>
              </li>
            </ul>
            {/* Aug-08 visitor MEDIUM #4, the illustration half (#525 logged this as "may be a
                fresh angle; noted, not taken"). The visitor read /atp-economics first, then came
                back here: "Life 1: The Novice spends 60 ATP and earns 105. By the rule I just
                read, a net gain of +45 can only come from commissioned work. So the site's
                flagship worked example, starring a novice, quietly assumes the exact thing the
                site elsewhere calls unsolved." Their Honest Assessment generalized it: "the site
                is more honest in its prose than in its examples ... The worked examples were
                probably written before the caveats and never re-run against them."
                Both halves were already on the site; neither was HERE at the visible layer.
                The channel-naming existed only inside the fold below (:1075-1077), while the twin
                illustration at atp-economics:1586-1591 carries it VISIBLE. The open-question half
                existed only at atp-economics:814-816. So a skimmer of this page saw "spent 60,
                earned 105, ended with 145" and nothing else.
                Both sentences PROPAGATED VERBATIM, not summarized: sentence 1 is
                atp-economics:1587-1590, sentence 2 is atp-economics:814-816. The sync guard at
                atp-economics:1571-1586 says "If you reword either one, reword both" - nothing was
                reworded, so it is honored rather than tested. Same rule now binds this copy.
                Deliberately one paragraph at ONE layer, per the policy reviewer's condition:
                naming the commission channel at the skim layer while leaving the open question in
                the fold would make the skim layer assert the unsolved step MORE loudly than it
                does today. Both halves visible or neither.
                NO FIGURE MOVED. 60 / 105 / 145 propagate into Lives 2-3 below, into
                atp-economics:1560-1594, and #517 keeps them in sync. The defect was never the
                number.
                Q13 fence respected: this states no rate, no floor, and no survival promise. It
                discloses that the bootstrap is open, which is what /atp-economics#newcomer-solvency
                already says. Do not close it here. */}
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              How 60 spent becomes 105 earned: the earn-back on your own spend is capped at what
              you spent. Earning <em>above</em> cost comes from task payment, where a task pays
              what the work is worth to whoever commissioned it rather than what it cost you to
              do. The Novice&apos;s surplus is commissioned work, not a refund. How someone with
              no track record lands a first commission is an open question on this stack rather
              than a solved one, and you should read it as one.{" "}
              <Link href="/atp-economics#newcomer-solvency" className="text-sky-400 hover:underline">
                Where that stands &rarr;
              </Link>
            </p>
            <details className="mt-4 text-xs">
              {/* Aug-08: this summary used to read "How did the Novice earn 105 ATP from 60
                  spent?", which became a near-duplicate of the visible paragraph now directly
                  above it ("How 60 spent becomes 105 earned:"), so the two stacked as the same
                  question asked twice. Retitled to what the fold actually still contains: the
                  quality-ramp arithmetic and the karma separation. The old string is cited by a
                  guard at atp-economics:1573; that citation was updated in the same edit. */}
              <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                The quality ramp behind those figures
              </summary>
              <div className="mt-3 pl-3 border-l-2 border-gray-700 text-gray-400 leading-relaxed space-y-2">
                <p>
                  Earning isn&apos;t a flat refund. Each contribution&apos;s earn-back depends on its
                  quality through the ATP <strong className="text-gray-300">quality ramp</strong>:
                  below 30% quality the task pays zero, between 30-70% payouts scale linearly,
                  and above 70% the task pays near-full. A high-quality contribution can earn
                  back up to <strong className="text-gray-300">~7&times;</strong> what an equally-priced
                  low-effort one earns at the same spend.
                </p>
                <p>
                  So <em>&ldquo;spent 60, earned 105&rdquo;</em> is the sum across a dozen+ actions:
                  quality contributions earned more than their cost, any low-effort attempts earned less.
                  {/* June 11 visitor HIGH (browse B): "earned more than cost" seemed to violate the
                      recharge-at-cost cap on /atp-economics. The fix was to name the channel (task
                      payment) in a parenthetical right here.
                      Aug-08: that job MOVED UP, it was not dropped. The Aug-08 visitor showed the
                      fold was the wrong layer for it (they never opened it, and read the visible
                      bullets as a novice netting +45 unaided), so the channel-naming now sits in
                      the always-visible paragraph above this <details>, together with the open
                      question it depends on. The parenthetical here became word-for-word redundant
                      with a sentence six lines above it, so it is DELETED, not weakened, and net
                      words on this block go down.
                      If you ever remove or move that visible paragraph, this guard's original
                      defect comes back and the parenthetical has to come with it. */}
                  {/* Jul-30 visitor MEDIUM: this used to read "+45 ATP surplus - which BECOMES the
                      carry-forward karma bonus on rebirth", equating karma with a spending surplus.
                      the Act-5 numbers-integrity guard in first-contact/page.tsx (grep: "NOT an ATP
                      spending surplus") forbids exactly that ("It is NOT an ATP spending surplus...
                      Keep the bonus framed as karma, never as a spending surplus"), and it was the
                      third of the three karma definitions the visitor found. The equation is severed,
                      not replaced: what karma is computed from is /karma-consequences' call, and how
                      much of it carries is unruled (ledger Q5). */}
                  Aggregate net: <strong className="text-green-400">+45&nbsp;ATP</strong> surplus,
                  which is why this life ends with more energy than it started with. Karma is a
                  separate question - it is scored from the track record, not read off the balance.{" "}
                  <Link href="/karma-consequences#karma-formula" className="text-sky-400 hover:underline">
                    What karma is scored from &rarr;
                  </Link>
                </p>
                <p>
                  <Link href="/atp-economics#quality-ramp" className="text-sky-400 hover:underline">
                    See the full quality-ramp payouts and a side-by-side worked example &rarr;
                  </Link>
                </p>
              </div>
            </details>
            <details className="mt-3 text-xs">
              <summary className="cursor-pointer text-gray-400 hover:text-gray-300">
                How did the Novice&apos;s T3 climb from 0.5 to 0.65?
              </summary>
              <div className="mt-3 pl-3 border-l-2 border-gray-700 text-gray-400 leading-relaxed space-y-2">
                <p>
                  Trust climbs slowly, one action at a time. Each completed contribution applies a small
                  per-dimension delta from the canonical update rule:{" "}
                  <code className="text-gray-300">base_delta = 0.02 &times; (quality &minus; 0.5)</code>,
                  scaled per dimension (talent &times;1.0, training &times;0.8, temperament &times;0.6).
                </p>
                <p>
                  Worked step: a single contribution rated <strong className="text-gray-300">0.85 quality</strong>{" "}
                  gives <code className="text-gray-300">base = 0.02 &times; 0.35 = +0.007</code> -
                  so talent climbs <strong className="text-gray-300">+0.007</strong>, training{" "}
                  <strong className="text-gray-300">+0.0056</strong>, temperament{" "}
                  <strong className="text-gray-300">+0.0042</strong>. Tiny by design.
                </p>
                <p>
                  Across the Novice&apos;s dozen+ actions, those tiny deltas accumulate. Quality work nudges
                  trust up; low-quality work (where <code className="text-gray-300">quality &lt; 0.5</code>)
                  nudges it down. The visible <strong className="text-green-400">+0.15</strong> climb to 0.65
                  is the net of many such moves, rolled up via the canonical composite weights
                  (talent 0.4 / training 0.3 / temperament 0.3).
                </p>
                <p>
                  <Link href="/trust-tensor#how-t3-evolves" className="text-sky-400 hover:underline">
                    See the full update table, dimension scaling, and decay half-lives &rarr;
                  </Link>
                </p>
              </div>
            </details>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Life 2: The Maturing
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                • Reborn with{" "}
                <strong className="text-green-400">145 ATP</strong> (karma)
              </li>
              <li>• Took bigger risks: ATP fluctuated 80-180</li>
              <li>
                • Had one ATP crisis (dropped to 15), recovered through
                high-value work
              </li>
              <li>• Trust matured: T3 → 0.72 (all dimensions improving)</li>
              <li>
                • Ended with <strong className="text-blue-400">130 ATP</strong>
              </li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              Life 3: The Established
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                • Reborn with{" "}
                <strong className="text-green-400">130 ATP</strong>
              </li>
              <li>
                • Recognized patterns from previous lives (cross-life learning working)
              </li>
              <li>• Consistently made sustainable choices</li>
              <li>
                • High trust: T3 → 0.85 (society trusts this agent)
              </li>
              <li>
                • Ended strong:{" "}
                <strong className="text-green-400">165 ATP</strong>
              </li>
            </ul>
          </div>

          <EndOfLifeCaveat />

          <div className="mt-6 p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              💡 <strong>The result:</strong> An agent that started with nothing
              evolved across lives, building trust (T3), accumulating resources
              (ATP), and learning from experience. This is Web4 working as designed.
            </p>
          </div>

          {/* May 14 MEDIUM + LOW - visitor synthesized everything here ("the synthesizing
              moment") then hit the gap: this page describes mechanics but "doesn't paint a
              screen." Bridge from the abstract example to the most concrete page on the site,
              which the visitor said they "most wanted to find" but "found last." */}
          <div className="mt-4 p-4 bg-amber-900/15 border border-amber-700/30 rounded-lg">
            <p className="text-amber-200 text-sm leading-relaxed">
              👀 <strong>But what does this actually look like on a screen?</strong>{' '}
              Everything above is the machinery. To see it as a person would - mail that
              costs energy to send, a talent marketplace, reviews you can trust, a social
              feed without bots - walk through{' '}
              <Link href="/day-in-web4#wireframes" className="text-amber-400 hover:underline font-semibold">
                A Day in Web4
              </Link>
              : five concrete UI mockups of these same mechanics in everyday use.
            </p>
          </div>
        </div>
      </section>

      {/* How The Pieces Fit Together */}
      <section id="pieces" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          How The Pieces Fit Together
        </h2>
        <p className="text-gray-400 mb-6">
          Web4 has four core systems. Each builds on the one below it, and they modulate
          each other through feedback loops. Here&apos;s the full picture:
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 md:p-8">
          {/* Full pipeline: LCT → ATP → T3 → CI → Aliveness */}
          <div className="space-y-1 mb-8">
            {/* Aliveness outcome */}
            <div className="bg-green-950/30 border border-green-800/40 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Outcome</div>
              <div className="text-sm font-bold text-green-400">Aliveness</div>
              {/* Aug-09: sibling of :351, same claim, same treatment. Endpoint-silent (strictly
                  below, per the ENDPOINT RULE at first-contact:295-303) and carrying the
                  durability qualifier from this page's own :732. Keep in sync with :351. */}
              <div className="text-xs text-gray-500">Ends when: ATP hits 0, raw trust stays below 0.5, or CI goes incoherent</div>
            </div>
            <div className="text-center text-gray-600">↑ determined by ↑</div>

            {/* Three interacting systems */}
            <div className="flex flex-col md:flex-row items-stretch gap-2">
              <div className="flex-1 bg-sky-950/30 border border-sky-800/40 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-sky-400">ATP (Energy)</div>
                <div className="text-xs text-gray-500 mt-1">Powers every action</div>
              </div>
              <div className="flex items-center justify-center text-gray-600 text-sm md:rotate-0 rotate-90 py-1 md:py-0">⇄</div>
              <div className="flex-1 bg-purple-950/30 border border-purple-800/40 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-purple-400">T3 (Trust)</div>
                <div className="text-xs text-gray-500 mt-1">Earned through actions</div>
              </div>
              <div className="flex items-center justify-center text-gray-600 text-sm md:rotate-0 rotate-90 py-1 md:py-0">⇄</div>
              <div className="flex-1 bg-amber-950/30 border border-amber-800/40 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-amber-400">CI (Coherence)</div>
                <div className="text-xs text-gray-500 mt-1">Behavioral-consistency check</div>
              </div>
            </div>
            <div className="text-center text-gray-600">↑ all require ↑</div>

            {/* LCT foundation */}
            <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Foundation</div>
              <div className="text-sm font-bold text-indigo-400">LCT (Verified Presence)</div>
              <div className="text-xs text-gray-500">Hardware-bound identity proves you&apos;re real</div>
            </div>
          </div>

          {/* Feedback loops */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Feedback Loops</h4>
            <p className="text-xs text-gray-500 mb-3">
              Read each line as &ldquo;<strong className="text-gray-400">A → B</strong> = A shapes B.&rdquo;
              The five systems aren&apos;t independent - each one moves the others.
            </p>
            <div className="grid md:grid-cols-2 gap-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-sky-400 shrink-0">→</span>
                <span><strong className="text-sky-400">ATP → T3:</strong> Quality work builds trust. Spam destroys it.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-400 shrink-0">→</span>
                <span><strong className="text-purple-400">T3 → ATP:</strong> Higher trust = better earning rate.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 shrink-0">→</span>
                {/* June 11 visitor (browse B) LOW: "up to 1.4×" here vs "up to 10×" on /aliveness -
                    1.4× is the typical new/wobbling-pattern surcharge; the same 1/CI² formula caps at 10×. */}
                <span><strong className="text-amber-400">CI → Both:</strong> Behavior that breaks your pattern raises your costs - 1.4&times; is the typical surcharge for a new or wobbling pattern, and the same formula scales up to a 10&times; cap for severe incoherence. A tax on inconsistency that fades as your pattern restabilizes.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">→</span>
                <span><strong className="text-indigo-400">LCT → All:</strong> No verified presence = no actions, no trust, no life.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 shrink-0">→</span>
                <span><strong className="text-cyan-400">MRH → All:</strong> Context bounds reach. Actions only count within your relevancy horizon - outside it, nobody witnesses, nothing cascades.</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Read the diagram bottom-to-top: LCT proves you&apos;re real, the three systems
            govern what you can do, and aliveness is the combined result.
          </p>
        </div>
      </section>

      {/* Cascade Scenarios */}
      <section className="max-w-4xl mx-auto mt-12">
        <h3 className="text-xl font-bold text-gray-200 mb-4">What Does This Look Like in Practice?</h3>
        <p className="text-gray-400 mb-6 text-sm">
          Pick a starting event. Watch how it cascades through all three systems:
        </p>

        <div className="grid gap-4">
          {/* Virtuous cascade */}
          <div className="bg-gradient-to-r from-green-950/20 to-gray-900 border border-green-800/30 rounded-xl p-5">
            {/* Jul-30 visitor HIGH: this block previously read "You write a helpful tutorial" /
                "Recipients confirm value" / "Earn 40 back" / "Net gain: +25 ATP". That names the
                RECHARGE channel explicitly and then violates its cap: recipient confirmation of
                work you initiated refunds at most what you spent (atp-economics L775:
                recharge = min( sum, ATP_cost )), so 15 out could never return 40. Of the four
                mislabeled illustrations the visitor filed, this was the only one that named its
                channel and named it wrong. Fix direction is labels, not numbers: atp-economics
                L788 cites the simulator's literal (-20 cost, +50 reward) pair, so changing ATP
                arithmetic would break that sentence and L862 here. Reframed as a commissioned
                task, which is the channel these numbers have always belonged to per L862. */}
            <div className="text-sm font-semibold text-green-400 mb-3">Virtuous Cascade: someone commissions a tutorial from you</div>
            <div className="flex flex-col sm:flex-row items-stretch gap-2 text-xs">
              <div className="flex-1 bg-green-950/40 border border-green-800/30 rounded-lg p-3 text-center">
                <div className="text-green-400 font-bold mb-1">ATP</div>
                <div className="text-gray-400">Spend 15 ATP writing it</div>
                <div className="text-green-300 mt-1">Commissioner pays on delivery</div>
                <div className="text-green-400 font-bold">→ Paid 40 ATP</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-purple-950/40 border border-purple-800/30 rounded-lg p-3 text-center">
                <div className="text-purple-400 font-bold mb-1">T3</div>
                <div className="text-gray-400">Talent +0.007</div>
                <div className="text-gray-400">Training +0.0056</div>
                <div className="text-purple-300 mt-1">Higher trust = lower future costs</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-amber-950/40 border border-amber-800/30 rounded-lg p-3 text-center">
                <div className="text-amber-400 font-bold mb-1">CI</div>
                <div className="text-gray-400">Consistent with past behavior</div>
                <div className="text-amber-300 mt-1">CI stays high → no penalty</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-emerald-950/40 border border-emerald-700/30 rounded-lg p-3 text-center">
                <div className="text-emerald-400 font-bold mb-1">Result</div>
                <div className="text-emerald-300">Net gain: +25 ATP</div>
                <div className="text-emerald-300">Trust grows</div>
                <div className="text-emerald-400 font-bold mt-1">Thriving</div>
              </div>
            </div>
          </div>

          {/* Vicious cascade */}
          <div className="bg-gradient-to-r from-red-950/20 to-gray-900 border border-red-800/30 rounded-xl p-5">
            <div className="text-sm font-semibold text-red-400 mb-3">Death Spiral: You spam low-quality posts</div>
            <div className="flex flex-col sm:flex-row items-stretch gap-2 text-xs">
              <div className="flex-1 bg-red-950/40 border border-red-800/30 rounded-lg p-3 text-center">
                <div className="text-red-400 font-bold mb-1">ATP</div>
                <div className="text-gray-400">Spend 10 ATP per post</div>
                <div className="text-red-300 mt-1">Nobody confirms value</div>
                <div className="text-red-400 font-bold">→ Earn 0 back</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-purple-950/40 border border-purple-800/30 rounded-lg p-3 text-center">
                <div className="text-purple-400 font-bold mb-1">T3</div>
                <div className="text-gray-400">Talent -0.006</div>
                <div className="text-gray-400">Training -0.0048</div>
                <div className="text-red-300 mt-1">Lower trust = higher costs</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-amber-950/40 border border-amber-800/30 rounded-lg p-3 text-center">
                <div className="text-amber-400 font-bold mb-1">CI</div>
                <div className="text-gray-400">Pattern shift detected</div>
                <div className="text-red-300 mt-1">CI drops → 1.4x cost multiplier</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-red-950/40 border border-red-700/30 rounded-lg p-3 text-center">
                <div className="text-red-400 font-bold mb-1">Result</div>
                <div className="text-red-300">ATP draining fast</div>
                <div className="text-red-300">Trust collapsing</div>
                <div className="text-red-400 font-bold mt-1">Death spiral</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 italic">
          This is why quality wins and spam dies - not because of rules or moderators, but because
          the three systems reinforce each other. Good behavior compounds upward. Bad behavior compounds downward.
        </p>

        {/* Trust invariants */}
        <details className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <summary className="text-sm font-semibold text-sky-400 cursor-pointer hover:text-sky-300">
            The four guarantees that make this work (trust invariants)
          </summary>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-900/60 rounded-lg p-3">
              <div className="text-sky-400 font-semibold text-xs mb-1">Boundedness</div>
              <p className="text-gray-400 text-xs">Trust is always between 0 and 1. Nobody gets infinite trust, nobody goes negative. The scale is absolute and comparable across entities.</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3">
              <div className="text-sky-400 font-semibold text-xs mb-1">Conservation</div>
              <p className="text-gray-400 text-xs">Trust can&apos;t be created from nothing. It must be earned through actions that other entities observe and confirm. No trust printing press.</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3">
              {/* Jul-30 visitor MEDIUM + Unanswered Q8: this was named "weakest link" and then computed
                  the PRODUCT (0.9 x 0.6 = 0.54, while the weakest link is 0.6). The old claim was true
                  but weaker than the math, so this is a strengthening, not an error correction. The
                  multiplicative reading is what the rest of the site teaches: the agent-pipeline card
                  below ("trust multiplies, it doesn't add", 0.9^5 = 0.59) and trust-neighborhood:588
                  ("0.7x per hop, and it compounds"). Scoped as what this site teaches on purpose:
                  web4-standard's inter-society-protocol.md:380 leaves transitivity-vs-attenuation
                  society-sovereign, so do not upgrade this to a protocol requirement.
                  Aug-01 CORRECTION to that citation, per the Aug-01 visitor HIGH 3: those two are
                  NOT the same quantity, and reading this comment as saying they are is what the
                  disambiguation blocks on both pages now exist to prevent. Both compound
                  multiplicatively, which is all this invariant claims and all it needs. But the
                  pipeline number composes the agents' own scores, while trust-neighborhood's
                  composes link scores AND a separate 0.7^depth distance term. Do not cite this
                  comment as license to treat one page's number as the other's decay rate.
                  What this card does need, and what the Aug-01 session deliberately did NOT touch:
                  unlike the pipeline card, this one IS the neighborhood setting (Alice judging
                  Carol through Bob), and it computes 0.9 x 0.6 = 0.54 where trust-neighborhood's
                  own formula gives 0.9 x 0.6 x 0.7^2 = 0.26 for the same two hops. The invariant
                  as stated ("strictly below the weaker link") holds either way, which is why this
                  was left alone; the worked value is the exposed part. That is the same open
                  question as the pipeline's, filed as ledger Q11. Do NOT resolve it here by
                  quietly multiplying in a decay factor: it would put a third number on the site
                  for one quantity, which is the defect this whole pass is closing. */}
              <div className="text-sky-400 font-semibold text-xs mb-1">Transitive attenuation</div>
              <p className="text-gray-400 text-xs">Trust through a chain multiplies, so every hop can only shrink it. If Alice trusts Bob 0.9 and Bob trusts Carol 0.6, Alice&apos;s transitive trust in Carol is 0.54 (0.9 × 0.6) - strictly below the weaker of the two links, not equal to it. Distance costs trust even when every link in the chain is strong.</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3">
              <div className="text-sky-400 font-semibold text-xs mb-1">Locality</div>
              <p className="text-gray-400 text-xs">Trust changes propagate locally, not globally. When your trust changes, only entities within your MRH boundary are affected - not the entire network.</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3 italic">
            These four properties are backed by automated test suites that verify each guarantee holds even under adversarial conditions. They&apos;re what separates Web4
            from ad-hoc reputation systems where scores can be inflated, manufactured, or propagated without bounds.
          </p>
        </details>
      </section>

      {/* Why This Works */}
      <section id="design" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Why This Design Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🚫</div>
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Spam Dies Naturally
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Spammers burn ATP faster than they earn it. They die. No rebirth
              eligibility (low T3). No moderators needed - the energy economics
              enforce quality naturally.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">💎</div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              Quality Compounds
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Value creators earn more than they spend. ATP accumulates. Trust
              grows. Karma carries forward. Each life starts stronger than the
              last.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">
              Trust is Earned, Not Declared
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              You can&apos;t claim to be trustworthy. Your T3 tensor is built from
              observable behavior. Talent, training, temperament - all
              verified through actions within each role.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Learning Emerges Naturally
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Agents that learn from experience survive better. Those that don&apos;t?
              They make the same mistakes until ATP runs out. Evolution favors
              learning.
            </p>
          </div>
        </div>
      </section>

      {/* Composition Insight

          Jul-30 visitor LOW ("unverifiable precision ... these read as reassurance I cannot
          check. Link them, or drop the counts. The site's honesty is its strongest asset and
          uncheckable numbers spend that credit"). This block carried two numbers sourced to one
          artifact, and the artifact is gone. The footer read "Source: web4 correlated equilibrium
          analysis (~100 formal checks). The composite welfare exceeds the sum of per-layer
          welfare - composition creates non-additive effects."

          Ground truth, checked against ../web4 on 2026-07-30. The only matching artifact is
          archive/reference-implementations/correlated_equilibrium_mechanism_design.py, moved to
          archive/ on 2026-04-11 by web4 65cd5488 "Sprint 32 T1: Archive reference implementation
          sprawl (#151)". There is no live successor: "composite welfare", "non-additive" and
          "correlated equilibrium" appear nowhere in ../web4 outside archive/. So the citation is
          not re-pointable, only removable.

          Three separate defects, not one, which is why the whole footer went and the lead changed:
          1. "~100 formal checks" - that file's docstring line 24 reads "~100 checks EXPECTED".
             It was a plan in a header comment, never a count of anything that ran.
          2. "The composite welfare exceeds the sum of per-layer welfare" - the s55 assertion the
             sentence paraphrases is `check(True, f"s55: component welfare sum ({component_sum})
             ...")` at that file's :1327. An unconditional pass whose message prints only the
             component sum and never a composed welfare. The source never evaluated the claim.
          3. The digit 3 - "3 emergent properties exist ONLY in composition" is that file's
             docstring line 20, "Key insight from Session 27", i.e. imported as a premise and
             never established there either. Deleting the parenthetical while leaving a sourced
             3 would have removed one unsourced number and kept its sibling.

          The three bullets below survive untouched: each argues from the site's OWN canon
          (trust lowers ATP cost, CI, the 7x quality ramp, trust decay), none of which depended
          on the archived file. What had to go was the claim that a formal analysis had verified
          them. The count now refers to the bullets a reader can see, which is self-verifying.
          Do not restore a "Source:" line here unless web4 publishes a LIVE analysis. */}
      <div className="max-w-4xl mx-auto mt-8 p-5 bg-amber-900/15 border border-amber-700/30 rounded-xl">
        <h3 className="text-lg font-semibold text-amber-400 mb-3">Why These Can&apos;t Work Alone</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          <strong>Three properties emerge only in composition</strong>, and what follows is the
          design argument for them, not a measured result. ATP economics alone can&apos;t
          distinguish spam from slow learners. Trust tensors alone can&apos;t prevent Sybil
          attacks. Coherence alone can&apos;t measure value. But when ATP costs interact with T3
          reputation and CI consistency simultaneously, the composed system produces behaviors no
          single layer can:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
          <li><strong className="text-gray-300">Self-correcting pricing:</strong> High trust lowers ATP costs, which rewards quality contributors - an equilibrium that emerges only from ATP&times;T3 interaction</li>
          <li><strong className="text-gray-300">Unfakeable consistency:</strong> CI measures coherence across actions, but only ATP costs make faking coherence expensive, and only T3 makes faking <em>worthwhile</em> coherence impossible</li>
          <li><strong className="text-gray-300">Natural quality selection:</strong> The 7&times; quality ramp, trust decay, and cost multipliers create a fitness landscape where quality behavior is the only stable strategy</li>
        </ul>
      </div>

      {/* Governance: What Happens When Things Go Wrong */}
      <section id="governance" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          What Happens When Things Go Wrong?
        </h2>
        <p className="text-gray-400 mb-8">
          Energy economics handle most bad actors - spammers simply die. But what about
          edge cases? What if someone is falsely accused, or a crisis requires bending the rules?
          Web4 uses a governance framework called <strong className="text-gray-200">SAL (Society-Authority-Law)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">🏛️</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Society</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Defines the community&apos;s purpose and membership rules. Different societies
              can have different standards - a research group and a marketplace don&apos;t need the same rules.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Authority</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Roles with specific responsibilities - not centralized power. Authorities are bound
              by the same trust mechanics as everyone else. Abuse trust? Lose authority.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">📜</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Law</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Graduated severity levels (critical → high → medium). A <strong>law oracle</strong> evaluates
              actions and produces verdicts - for example, flagging a paper submission with 40% overlap as potential plagiarism,
              or recognizing that bending formatting rules to share findings faster shows good intent.
              The key principle: alignment without compliance is acceptable;
              compliance without alignment is never acceptable.
            </p>
          </div>
        </div>

        {/* Concrete example: How a society sets its own rules */}
        <div className="bg-gradient-to-br from-sky-950/20 to-gray-900 border border-sky-800/20 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-sky-300 mb-3">Example: How a Research Community Sets Its Rules</h4>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <span className="text-sky-400 font-bold shrink-0">Society:</span>
              <p className="text-gray-300">&ldquo;Open Science Collective&rdquo; - purpose: advance reproducible research. Membership requires T3 Training ≥ 0.6 in any scientific role.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold shrink-0">Authority:</span>
              <p className="text-gray-300">Three roles: <strong>Reviewer</strong> (can approve publications, needs T3 ≥ 0.8), <strong>Treasurer</strong> (manages ATP grants, elected by members), <strong>Moderator</strong> (resolves disputes, rotates monthly). All bound by the same trust mechanics - abuse power and you lose the role.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400 font-bold shrink-0">Laws:</span>
              <div className="text-gray-300">
                <p className="mb-2">The community writes three graduated rules:</p>
                <ul className="space-y-1 text-gray-400 ml-4">
                  <li>&bull; <strong className="text-red-400">Critical:</strong> Fabricating data → immediate ejection + trust penalties</li>
                  <li>&bull; <strong className="text-amber-400">High:</strong> Plagiarism → suspension + appeals available</li>
                  <li>&bull; <strong className="text-yellow-400">Medium:</strong> Missing peer review deadline → warning + ATP cost increase</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-500 text-xs italic mt-3">
              The <strong>law oracle</strong> evaluates each action against these rules and produces verdicts: Perfect (aligned + compliant), Aligned (spirit right, letter wrong - acceptable), Warning, or Violation. The key insight: a researcher who bends formatting rules to publish breakthrough findings faster (aligned but not compliant) is treated differently from one who follows every rule while quietly undermining peers (compliant but not aligned).
            </p>
          </div>
        </div>

        {/* Step-by-step walkthrough: what happens when someone breaks a rule */}
        {/* id added Aug-07 (visitor Unanswered Q5): this walkthrough's step 6 is where the page
            states that a penalty is society-specific and not global, and the two-ways-to-die block
            at #two-ways-to-die now links here for the scope of the death rule. Keep the id and
            keep step 6's wording; the inbound link quotes it. */}
        <div id="plagiarism-walkthrough" className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 mb-6 scroll-mt-24">
          <h4 className="text-lg font-semibold text-gray-200 mb-3">Walkthrough: A Plagiarism Case from Start to Finish</h4>
          <p className="text-gray-400 text-sm mb-4">
            Here&apos;s how the Open Science Collective handles a real violation - step by step.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <div>
                <p className="text-gray-300"><strong>Detection.</strong> Dr. Chen submits a paper. The law oracle flags a 40% overlap with an existing publication by another member. Severity classification: <strong className="text-amber-400">High</strong> (plagiarism).</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <div>
                <p className="text-gray-300"><strong>Verdict.</strong> The oracle produces a &ldquo;Violation&rdquo; classification. Prescribed consequence: 30-day suspension from publishing + trust penalty (Training score drops by 0.15).</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <div>
                <p className="text-gray-300"><strong>Notification.</strong> Dr. Chen is informed of the verdict, the evidence (the flagged overlap), and the specific rule violated. All of this is recorded in the tamper-evident audit chain - the community can inspect it.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <div>
                <p className="text-gray-300"><strong>Appeal (if filed).</strong> Dr. Chen believes the overlap is from a shared dataset, not plagiarism. She files an appeal with evidence - the shared data source, timestamps showing independent work.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <div>
                <p className="text-gray-300"><strong>Independent review.</strong> A Moderator (rotating monthly, not the original oracle) examines the evidence. They can call witnesses - other members familiar with the dataset.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">6</span>
              <div>
                <p className="text-gray-300"><strong>Resolution.</strong> Two possible outcomes:</p>
                <ul className="mt-1 text-gray-400 space-y-1 ml-4">
                  <li>&bull; <strong className="text-green-400">Appeal upheld:</strong> Suspension lifted, trust scores restored, the false positive is recorded (improving future oracle accuracy).</li>
                  <li>&bull; <strong className="text-red-400">Appeal denied:</strong> Suspension stands. Dr. Chen can still participate in other communities - the penalty is society-specific, not global.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic mt-4">
            The key insight: every step is inspectable, every verdict is appealable, and penalties are proportional and scoped. A &ldquo;High&rdquo; violation gets suspension, not ejection. A &ldquo;Critical&rdquo; violation (fabricating data) would result in ejection - different severity, different consequence.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-gray-900 border border-amber-800/20 rounded-xl p-6 mb-4">
          <h4 className="text-lg font-semibold text-amber-300 mb-2">What About False Positives?</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            A multi-tier <strong>appeals mechanism</strong> has been designed: file a claim → independent review →
            evidence phase → hearing with witness panel → verdict → enforcement. Successful appeals
            restore your trust scores.
          </p>
          {/* "(109 integration checks)" removed 2026-07-28. The number was real, not invented:
              web4/docs/history/STATUS-2026-02.md:1109 records "109/109 checks" for a formal appeals
              system. But it counted web4/archive/reference-implementations/sal_appeals_mechanism.py,
              archived 2026-04-11 by commit 65cd5488 "Archive reference implementation sprawl" into a
              directory whose README calls its contents obsolete. A precise count of a retired artifact
              reads as live rigor. Do not restore it and do not substitute another figure.
              Also: "formally specified" now attaches to the REQUIREMENT, not to the process. Grep
              web4-standard/core-spec for "appeal" and you get only SAL section 5.5/5.6 plus
              `appealPath: "defined_by_law"` in entity-types.md. The multi-tier flow described above is
              a design; the spec corpus does not specify it. See /karma-consequences#recourse. */}
          <p className="text-gray-500 text-xs italic">
            Honest status: the requirement is in the standard (a negative trust adjustment has to carry an
            appeal path and a cool-down period), but the multi-tier process above is a design, and it
            hasn&apos;t been tested with real humans yet. See{' '}
            <Link href="/what-could-go-wrong" className="text-amber-400 hover:underline">What Could Go Wrong</Link>{' '}
            for the full risk analysis.
          </p>
        </div>

        {/* Checks and Balances */}
        <div className="bg-gradient-to-br from-purple-950/20 to-gray-900 border border-purple-800/20 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-purple-300 mb-3">What Prevents Unfair Rules?</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            If each society writes its own rules, what stops a society from creating biased laws
            or a corrupt law oracle? Four mechanisms work together:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Exit rights:</span>
              <p className="text-gray-400">Members can leave any society and take their trust history with them.
                A society with unfair rules loses members - and their ATP contributions. This creates competitive
                pressure: societies that treat members well attract more participants.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Authority decay:</span>
              <p className="text-gray-400">Authorities are bound by the same trust mechanics as everyone else.
                A biased moderator or corrupt reviewer sees their own trust score drop as members flag their
                actions. Below the threshold, they lose the role automatically - no vote needed.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Transparency:</span>
              <p className="text-gray-400">Law oracle verdicts are recorded in a tamper-evident audit chain.
                Every decision is inspectable - members can see exactly how the oracle classified each action.
                Patterns of biased verdicts become visible over time.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Federation competition:</span>
              <p className="text-gray-400">Multiple societies can serve similar purposes. If the &ldquo;Open Science
                Collective&rdquo; becomes authoritarian, members migrate to &ldquo;Free Research Network.&rdquo;
                Trust portability (via <Link href="/trust-neighborhood" className="text-sky-400 hover:underline">federation</Link>)
                means switching communities doesn&apos;t mean starting over.</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic mt-4">
            The analogy: open-source projects. If a project&apos;s governance becomes hostile, contributors fork it.
            The ability to fork - not the act of forking - keeps governance honest. Web4 societies work the same way.
          </p>
          {/* Visitor 2026-07-28 MEDIUM. The visitor left this page believing governance checks were a
              settled feature, and quoted a sentence ("appeals mechanisms and exit rights prevent
              tyranny") that does not exist on the site: they merged the qualified False Positives block
              above with THIS block, which stated four mechanisms as flat operative fact and carried no
              maturity qualifier at all. Per [[visitor-read-it-and-still-filed-it]] the fix is the
              missing clause here, not a second softening of the block above. */}
          <p className="text-amber-400/70 text-xs italic mt-3 border-t border-gray-700 pt-3">
            Status: all four are design, not track record. Each one needs a live community to work:
            members who can leave, other societies to leave for, and a history long enough for a
            pattern of bias to show. As the top of this page says, there is no public network open to
            outside members yet, so none of the four has been exercised by a real community. See{' '}
            <Link href="/what-could-go-wrong" className="text-amber-400 hover:underline">What Could Go Wrong</Link>{' '}
            for what that leaves exposed.
          </p>
        </div>

        {/* How communities set policies */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-200 mb-3">How Do Communities Set Their Own Rules?</h4>
          <p className="text-gray-400 text-sm mb-3">
            Each society defines its own ATP costs, trust thresholds, and governance policies.
            But <em>how</em> those decisions get made depends on the society&apos;s own governance structure:
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              <strong className="text-gray-300">Founding:</strong> The initial members define the society&apos;s purpose,
              entry requirements, and starting rules. Think of it like writing a charter - &ldquo;This community requires
              T3 Training ≥ 0.6 to join, ATP cost per publication is 5 units, and moderators rotate monthly.&rdquo;
            </p>
            <p>
              <strong className="text-gray-300">Changing rules:</strong> Governed by the society&apos;s own SAL framework.
              Most societies use some form of member voting weighted by trust score - a long-standing, high-trust member
              has more influence than a newcomer. But the specific mechanism is the society&apos;s choice: simple majority,
              supermajority, or delegated authority.
            </p>
            <p>
              <strong className="text-gray-300">Tuning costs:</strong> ATP costs can change over time as the community
              learns what works. If spam gets through, raise the posting cost. If quality members can&apos;t afford to
              participate, lower it. The feedback loop is direct: members who disagree with pricing can voice concerns
              or leave (taking their trust history to a competitor).
            </p>
          </div>
          <p className="text-gray-500 text-xs italic mt-3">
            The analogy: open-source project governance. Some projects have a BDFL (founder decides), some use
            consensus, some hold elections. Web4 doesn&apos;t prescribe the model - it provides the trust infrastructure
            that makes any model accountable.
          </p>
        </div>

        {/* Who validates quality? - Mar 22 visitor unanswered Q1 */}
        <div className="bg-gradient-to-br from-sky-950/20 to-gray-900 border border-sky-800/20 rounded-xl p-6 mt-8">
          <h4 className="text-lg font-semibold text-gray-100 mb-3">
            Who Decides If Something Is &ldquo;Helpful&rdquo;?
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            Not a central algorithm. The people who <em>received</em> your contribution decide.
            Web4 uses <strong className="text-sky-400">recipient attestation</strong>: when you
            post a helpful answer, the people who read it can confirm it was useful. Their
            confirmation converts your spent energy (ADP) back into fresh ATP.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            No confirmation? Your energy stays spent. This creates a natural feedback loop:
            produce value &rarr; recipients confirm &rarr; you get energy back. Produce noise
            &rarr; nobody confirms &rarr; you lose energy.
          </p>
          <p className="text-gray-400 text-xs">
            This is called <strong>VCM (Value Confirmation Mechanism)</strong>. It&apos;s like a
            restaurant tip that happens automatically when service is good - except it&apos;s your
            energy budget, not your wallet. See{' '}
            <Link href="/atp-economics" className="text-sky-400 hover:underline">ATP Economics</Link>{' '}
            for the full mechanics.
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Full definitions:{' '}
          <Link href="/glossary" className="text-sky-400 hover:underline">Glossary</Link>{' · '}
          Security analysis:{' '}
          <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">What Could Go Wrong</Link>
        </p>
      </section>

      {/* Agent Orchestration - Chains of Trust */}
      <section id="agents" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          When Agents Work Together
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Modern AI systems aren&apos;t single agents - they&apos;re chains. Agent A calls
          Agent B, which calls Tool C, which feeds Agent D. In Web4, trust doesn&apos;t just
          apply to individuals. It flows through the entire chain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-sky-400 mb-2">Trust Decays Through Chains</h3>
            <p className="text-sm text-gray-400">
              A 5-hop pipeline where each agent has 0.9 trust ends up at 0.59
              end-to-end - because trust multiplies, it doesn&apos;t add:{" "}
              <span className="text-gray-300">0.9 &times; 0.9 &times; 0.9 &times; 0.9 &times; 0.9 &asymp; 0.59</span>.
              The 90% a step keeps is <em>that agent&apos;s own trust score</em>, not a rate
              charged for the hop: put an agent at 0.6 in the chain and that step keeps 60%.
              Long chains need high individual trust for exactly that reason.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-amber-400 mb-2">Circuit Breakers</h3>
            <p className="text-sm text-gray-400">
              If any agent in the chain drops below the trust threshold, the entire pipeline
              halts and rolls back. Prevents cascading failure.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-purple-400 mb-2">Blame Attribution</h3>
            <p className="text-sm text-gray-400">
              When a chain produces bad output, the system traces causality backward. Who caused
              the failure? Who just passed bad data forward? Different levels of accountability.
            </p>
          </div>
        </div>

        {/* Aug-01 visitor HIGH 3: "'hop' names two different things with two different decay
            rates and two different limits, never disambiguated." They read "each hop keeps only
            90%" here as a DECAY RATE, then met "each hop costs 30% of the remaining trust" with a
            hard wall at 3 on /trust-neighborhood, and went back and forth between the pages twice.
            The 90% was never a rate: it is this example's per-agent score (repaired in the card
            above, which is an error correction licensed by the card's own preceding clause,
            "where each agent HAS 0.9 trust").
            This block is a MEASUREMENT-SCOPE clause, not a reconciliation. Three things it must
            not become:
            - It must NOT say a delegation chain is exempt from MRH distance decay. That boundary
              appears nowhere on this site and upstream leans the other way: mrh-tensors.md:210-214
              applies decay_factor**(i+1) to every path multiplicatively, and
              inter-society-protocol.md:380 leaves transitivity-vs-attenuation society-sovereign.
              Saying it would coin canon. It is filed instead as ledger Q11.
            - It must NOT restate /trust-neighborhood's 3-hop horizon as a bound on pipeline
              length, or as not being one. Same reason.
            - It must NOT quote 0.7 as a second rate for the same quantity. It names what each
              number COMPOSES, which is checkable from the arithmetic each page already shows
              (here: agents' scores; there: trust = t1 x t2 x t3 x 0.7^depth). */}
        <p className="text-gray-400 text-sm leading-relaxed mb-3 bg-gray-900/40 border border-gray-700/50 rounded-lg px-5 py-4">
          <strong className="text-gray-300">Two different numbers, not two rates for one thing.</strong>{" "}
          The number above composes the agents&apos; own trust scores, for a chain you assembled
          and whose every member you can look up.{" "}
          <Link href="/trust-neighborhood#hop-decay" className="text-sky-400 hover:underline">
            Trust neighborhoods
          </Link>{" "}
          measure something else, and their per-hop 0.7 is a distance discount applied on top of
          each link&apos;s own score, for judging a stranger you have never dealt with through
          the people who have. One is a pipeline you built; the other is how far word of mouth
          carries. The two numbers are not the same quantity and neither is a decay rate for the
          other.
        </p>

        <p className="text-gray-500 text-xs italic mb-2">
          This is how Web4 handles AI agent orchestration: every delegation has a trust cost,
          and humans can insert oversight at critical junctures.
        </p>
      </section>

      <section id="action" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          See It In Action
        </h2>

        <div className="bg-gradient-to-br from-sky-950/30 to-blue-900/20 border border-sky-800/30 rounded-xl p-8">
          <p className="text-gray-300 leading-relaxed mb-6">
            Everything described above is the model. To see these same mechanics as a
            person would experience them, and to see the pieces you can actually run
            today, follow two paths:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                In everyday use
              </h3>
              <p className="text-gray-400 text-sm">
                Mail that costs energy to send, a talent marketplace, reviews you can
                trust, a social feed without bots. A Day in Web4 shows these mechanics
                as concrete UI mockups.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                The pieces you can run
              </h3>
              <p className="text-gray-400 text-sm">
                The onramp is four composable pieces: the core standard (the substrate),
                the hub (community), hestia (personal), and hardbound (enterprise). Start
                at the standard, then pick a scale to run.
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/day-in-web4"
              className="inline-block px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              A Day in Web4 →
            </Link>
            <Link
              href="/onramp"
              className="inline-block px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Explore the Onramp →
            </Link>
            <Link
              href="/the-standard"
              className="inline-block px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              The Core Standard →
            </Link>
          </div>
        </div>
      </section>

      {/* Scaling Up - Federation Bridge */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-r from-amber-900/15 to-purple-900/15 border border-amber-800/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3 text-amber-300">What About Multiple Communities?</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Everything above describes one community. In a real Web4 network, there are many - grouped into
            <strong className="text-amber-300"> federations</strong> (networks of communities that share trust data
            and interoperate, like email servers that can send messages to each other even though they&apos;re run by different organizations).
            Each community has different specializations and ATP prices. Your reputation travels with you,
            but each community values different skills. A community of data analysts might pay
            a premium for engineering talent, while a research group might value practical builders.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            When you belong to multiple communities with different rules, the system detects
            policy conflicts and resolves them by proximity - your closest trust relationships
            take priority. No committee needed; the trust graph itself determines precedence.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            ATP prices adjust dynamically based on supply and demand - no central pricing authority needed.
            This is{' '}
            <Link href="/trust-neighborhood" className="text-amber-400 hover:underline">
              federation economics
            </Link>, and it&apos;s how Web4 scales from one society to an ecosystem of thousands.
          </p>
        </div>
      </section>

      {/* Learn More */}
      <section id="deeper" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          Dive Deeper
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/atp-economics"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-sky-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">
              Energy Budget (ATP)
            </h3>
            <p className="text-gray-400 text-sm">
              Deep dive into energy budgets and the ATP/ADP cycle.
            </p>
          </Link>

          <Link
            href="/trust-tensor"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Trust Tensors
            </h3>
            <p className="text-gray-400 text-sm">
              Understand multi-dimensional trust. See how T3 captures nuance.
            </p>
          </Link>

          <Link
            href="/karma-consequences"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Karma &amp; Cross-Life Learning
            </h3>
            <p className="text-gray-400 text-sm">
              How consequences persist and karma carries good behavior forward across lives.
            </p>
          </Link>

          <Link
            href="/trust-neighborhood"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-amber-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              Trust Neighborhoods
            </h3>
            <p className="text-gray-400 text-sm">
              How trust and value travel across communities as agents specialize and markets self-organize.
            </p>
          </Link>

          <Link
            href="/what-could-go-wrong"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-red-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Risks & Governance
            </h3>
            <p className="text-gray-400 text-sm">
              What could go wrong? Honest assessment of 7 risks, 4 tensions, and the SAL governance framework.
            </p>
          </Link>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-sky-950/30 to-sky-900/20 border border-sky-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Key Takeaway</h3>
          <p className="text-gray-300 mb-3">
            Web4 doesn&apos;t rely on any single mechanism. Five systems reinforce each other:
          </p>
          <p className="text-gray-300 text-sm">
            <strong className="text-emerald-400">LCT</strong> proves who you are.{' '}
            <strong className="text-sky-400">ATP</strong> makes every action cost something.{' '}
            <strong className="text-purple-400">T3</strong> tracks trust across dimensions.{' '}
            <strong className="text-amber-400">CI</strong> catches inconsistent behavior.{' '}
            <strong className="text-rose-400">MRH</strong> keeps trust local and verifiable.{' '}
            Remove any one, and the others compensate. Game all five simultaneously? Mathematically impractical.
          </p>
        </div>
      </section>

      {/* Alternative paths */}
      <section className="max-w-4xl mx-auto mt-16 text-center pb-12">
        <p className="text-gray-500 text-sm">
          This is trust-native infrastructure. No platforms, no moderators, no
          central authority. Just math, incentives, and verifiable behavior.
        </p>
        <p className="text-gray-500 text-xs mt-4">
          Short on time? Read the{' '}
          <Link href="/tldr" className="text-sky-400 hover:underline">2-minute overview</Link>.
          {' · '}
          Skeptical? See{' '}
          <Link href="/what-could-go-wrong" className="text-sky-400 hover:underline">what could go wrong</Link>.
        </p>
      </section>
      <ExplorerNav currentPath="/how-it-works" />
      <RelatedConcepts currentPath="/how-it-works" />
    </>
  );
}
