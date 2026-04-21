import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import TermTooltip from "@/components/TermTooltip";
import PageTracker from "@/components/PageTracker";
import SectionTOC from "@/components/SectionTOC";

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

export default function HowItWorksPage() {
  return (
    <>
      <PageTracker slug="how-it-works" />
      <SectionTOC sections={HOW_IT_WORKS_SECTIONS} />
      <Breadcrumbs currentPath="/how-it-works" />

      {/* New visitor prompt */}
      <div className="max-w-4xl mx-auto mb-4 text-sm text-gray-500">
        New to Web4? This page works best <em>after</em> the concept pages. For a guided introduction, start with{' '}
        <Link href="/first-contact" className="text-sky-400 hover:underline">First Contact</Link> or the{' '}
        <Link href="/tldr" className="text-sky-400 hover:underline">2-minute TL;DR</Link>, then explore the{' '}
        <Link href="/lct-explainer" className="text-sky-400 hover:underline">concept sequence</Link> before returning here for the full picture.
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Web4 Explained
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          How Web4 Societies Work
        </h1>
        <div className="mb-4 p-3 bg-amber-950/30 border border-amber-800/30 rounded-lg text-sm text-amber-200/80">
          <strong>Project status:</strong> Web4 is a <strong>research prototype</strong>, not a deployed product.
          The mechanics described here are validated through simulations and an open-source{' '}
          <Link href="/why-web4#faq-deployed" className="text-amber-300 hover:text-amber-200 underline">reference implementation</Link>,
          but no live network with real users exists yet. The simulations on this site let you explore how it <em>would</em> work.
          {' '}Curious what early deployment could look like? See the{' '}
          <Link href="/why-web4#faq-adoption-path" className="text-amber-300 hover:text-amber-200 underline">concrete adoption path</Link>{' '}
          — from browser extension overlays to full integration.
        </div>
        <div className="mb-6 p-4 bg-sky-950/20 border border-sky-800/30 rounded-lg text-sm text-gray-300 space-y-2">
          <p className="text-xs uppercase tracking-wide text-sky-400 mb-2 font-semibold">Key Takeaways</p>
          <p>You&apos;re born with <strong className="text-green-400">energy</strong> and <strong className="text-purple-400">neutral trust</strong>. Every action costs energy. Quality contributions earn it back; spam drains it.</p>
          <p>Your <strong className="text-blue-400">identity</strong> is tied to your devices — no passwords, no central authority. Your <strong className="text-purple-400">trust</strong> is multi-dimensional (competence, reliability, consistency) and role-specific.</p>
          <p>If your energy hits zero or trust collapses, you die. But good karma carries forward — you&apos;re reborn with a head start. <strong className="text-cyan-400">No moderators needed.</strong> Five interlocking systems (identity, energy, trust, consistency, context) make spam expensive and quality self-sustaining.</p>
        </div>

        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 is trust-native infrastructure for humans and AI. Instead of
          relying on platforms, moderators, or authorities, Web4 societies
          self-regulate through five foundational mechanisms:
        </p>

        <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
          <p className="text-sm text-gray-400 mb-3">
            <strong className="text-gray-300">Five systems, in plain English:</strong>{' '}
            Web4 has some acronyms. Here&apos;s what they mean — refer back anytime.
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
              Attention Economics
            </h3>
            <p className="text-sm text-gray-400">
              Every action costs attention budget (<TermTooltip term="ATP" />). Run out? You
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
              and Temperament — per role.
            </p>
            <Link
              href="/trust-tensor"
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
              Example: If someone usually posts coding tutorials at 9am and suddenly starts posting crypto spam at 3am from a new country, their coherence drops — making every action more expensive.
            </p>
            <Link
              href="/coherence-index"
              className="text-sky-400 hover:underline text-sm mt-2 inline-block"
            >
              Learn more →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-cyan-950/30 to-cyan-900/20 border border-cyan-800/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🌐</div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">
              Context (MRH)
            </h3>
            <p className="text-sm text-gray-400">
              You only see what&apos;s relevant to your trust network — like
              hearing only conversations you&apos;re part of. Spam can&apos;t reach you.
            </p>
            <Link
              href="/trust-neighborhood"
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
                  <span className="text-sm text-gray-400"> — Proves you&apos;re real. Hardware-bound identity, unforgeable.</span>
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
                  <span className="text-sm text-gray-400"> — Defines your reach. Only see what&apos;s relevant to your trust network.</span>
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
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">Feedback Loop — every action cycles through all three:</div>
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
                    <span className="text-sm text-gray-400"> — You&apos;re &ldquo;alive&rdquo; when: ATP &gt; 0 + Trust &gt; 0.5 + CI coherent</span>
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
            <strong className="text-gray-400">Why spam dies:</strong> Without LCT, you can&apos;t enter. Without MRH, you can&apos;t reach anyone. Without ATP, you can&apos;t act. Without T3, you aren&apos;t trusted. Without CI, you&apos;re flagged. Every layer filters bad actors — no single point of failure, no moderators needed.
          </p>
        </div>
      </section>

      {/* The Journey: Birth to Death to Rebirth */}
      <section id="journey" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          The Journey: Birth → Life → Death → Rebirth
        </h2>
        <p className="text-gray-400 mb-8">
          Web4 societies treat "aliveness" as a measurable property. Here's the
          full lifecycle:
        </p>

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
                part of the trust graph — which determines what entities and
                information are visible to you (your &quot;context boundary&quot;).
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Initial Resources (ATP)
              </h4>
              <p className="text-gray-300 leading-relaxed">
                You receive an initial <strong>ATP allocation</strong> (typically
                100). This is your energy budget — spend it wisely.
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
                The core gameplay loop of Web4 existence
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                Actions Cost ATP
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Actions that affect others cost ATP from your energy budget. Reading and browsing are free &mdash; only contributions spend energy:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Free (no ATP cost)
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>• Reading and browsing content</p>
                    <p>• Viewing profiles and trust scores</p>
                    <p>• Observing community activity</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                    Lurking is always free. You only spend energy when you act &mdash; post, vote, transact, or create.
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
              <p className="text-gray-300 leading-relaxed mb-3">
                When you contribute value, the community validates and rewards
                you:
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded">
                  <p className="text-green-300 text-sm">
                    ✅ <strong>High-quality post:</strong> Cost 15 ATP → Earn
                    40 ATP = <strong className="text-green-400">+25 net</strong>
                  </p>
                </div>
                <div className="p-3 bg-green-900/20 border border-green-800/30 rounded">
                  <p className="text-green-300 text-sm">
                    ✅ <strong>Helpful contribution:</strong> Cost 20 ATP → Earn
                    60 ATP = <strong className="text-green-400">+40 net</strong>
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
                Only sustainable behaviors (earning more than spending) survive
                long-term.
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
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-2">
                    Example: Delivered high-quality work on time
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <div className="text-gray-500">Talent</div>
                      <div className="text-green-400">+0.15</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Training</div>
                      <div className="text-green-400">+0.20</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Temperament</div>
                      <div className="text-green-400">+0.10</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-2">
                    Example: Missed deadline without warning
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-center">
                    <div>
                      <div className="text-gray-500">Talent</div>
                      <div className="text-red-400">-0.05</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Training</div>
                      <div className="text-red-400">-0.25</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Temperament</div>
                      <div className="text-red-400">-0.20</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                Different actions affect different trust dimensions. Your
                behavior creates your reputation.
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
                Energy exhaustion = end of life
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-200 mb-2">
                When ATP = 0, You Die
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Death in Web4 is not a timeout or suspension. Your energy budget is
                depleted — you can no longer act.
              </p>
              <div className="mt-3 p-4 bg-red-900/20 border border-red-800/30 rounded">
                <p className="text-red-300 font-semibold mb-2">
                  Causes of Death
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
                tensor:
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
                    karma (ATP from previous life).
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
                Karma: ATP Carried Forward
              </h4>
              <p className="text-gray-300 leading-relaxed">
                If eligible, you're reborn with <strong>karma</strong> - a
                portion of your final ATP:
              </p>
              <div className="mt-3 space-y-2">
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Life 1 → Life 2
                  </div>
                  <p className="text-gray-300 text-sm">
                    Died with <strong className="text-blue-400">145 ATP</strong>.
                    Reborn with <strong className="text-green-400">145 ATP</strong>{" "}
                    (full karma bonus).
                  </p>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Life 2 → Life 3
                  </div>
                  <p className="text-gray-300 text-sm">
                    Died with <strong className="text-blue-400">130 ATP</strong>.
                    Reborn with <strong className="text-green-400">130 ATP</strong>{" "}
                    (karma preserved).
                  </p>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">
                Your track record compounds across lives. Good behavior =
                stronger starts.
              </p>
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
                <li>"High-value contributions earn more ATP than they cost"</li>
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
            When individuals build dense mutual trust, something emerges at the group level — Web4 calls
            these <Link href="/aliveness#synthons" className="text-sky-400 hover:underline">synthons</Link>{" "}
            <span className="text-gray-400">(from chemistry: a unit that functions as a building block for larger structures)</span>.
            A team that consistently collaborates well develops its own collective aliveness score,
            separate from any individual member. Think of it like a band that&apos;s greater than
            the sum of its musicians — with its own reputation, energy, and lifecycle.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Synthons form gradually, can dissolve if trust erodes, and you can leave without losing your personal trust.{" "}
            <Link href="/aliveness#synthons" className="text-sky-400 hover:underline">Full details →</Link>
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
                • Died with <strong className="text-green-400">145 ATP</strong>
              </li>
            </ul>
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
                • Died with <strong className="text-blue-400">130 ATP</strong>
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

          <div className="mt-6 p-4 bg-sky-900/20 border border-sky-800/30 rounded-lg">
            <p className="text-sky-300 text-sm">
              💡 <strong>The result:</strong> An agent that started with nothing
              evolved across lives, building trust (T3), accumulating resources
              (ATP), and learning from experience. This is Web4 working as designed.
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
              <div className="text-xs text-gray-500">ATP &gt; 0 + Trust &gt; 0.5 + CI coherent = alive</div>
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
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Feedback Loops</h4>
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
                <span><strong className="text-amber-400">CI → Both:</strong> Behavior that breaks your pattern raises your costs up to 1.4&times; &mdash; a tax on inconsistency that fades as your pattern restabilizes.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-400 shrink-0">→</span>
                <span><strong className="text-indigo-400">LCT → All:</strong> No verified presence = no actions, no trust, no life.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 shrink-0">→</span>
                <span><strong className="text-cyan-400">MRH → All:</strong> Context bounds reach. Actions only count within your relevancy horizon — outside it, nobody witnesses, nothing cascades.</span>
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
            <div className="text-sm font-semibold text-green-400 mb-3">Virtuous Cascade: You write a helpful tutorial</div>
            <div className="flex flex-col sm:flex-row items-stretch gap-2 text-xs">
              <div className="flex-1 bg-green-950/40 border border-green-800/30 rounded-lg p-3 text-center">
                <div className="text-green-400 font-bold mb-1">ATP</div>
                <div className="text-gray-400">Spend 15 ATP</div>
                <div className="text-green-300 mt-1">Recipients confirm value</div>
                <div className="text-green-400 font-bold">→ Earn 40 back</div>
              </div>
              <div className="text-gray-600 flex items-center justify-center sm:rotate-0 rotate-90">→</div>
              <div className="flex-1 bg-purple-950/40 border border-purple-800/30 rounded-lg p-3 text-center">
                <div className="text-purple-400 font-bold mb-1">T3</div>
                <div className="text-gray-400">Talent +0.02</div>
                <div className="text-gray-400">Training +0.02</div>
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
                <div className="text-gray-400">Temperament -0.05</div>
                <div className="text-gray-400">Training -0.03</div>
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
          This is why quality wins and spam dies — not because of rules or moderators, but because
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
              <div className="text-sky-400 font-semibold text-xs mb-1">Transitivity bounds</div>
              <p className="text-gray-400 text-xs">Trust through a chain can never exceed the weakest link. If Alice trusts Bob 0.9 and Bob trusts Carol 0.6, Alice&apos;s transitive trust in Carol is at most 0.54 (0.9 × 0.6).</p>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3">
              <div className="text-sky-400 font-semibold text-xs mb-1">Locality</div>
              <p className="text-gray-400 text-xs">Trust changes propagate locally, not globally. When your trust changes, only entities within your MRH boundary are affected — not the entire network.</p>
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
              eligibility (low T3). No moderators needed — the energy economics
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
              observable behavior. Talent, training, temperament &mdash; all
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

      {/* Composition Insight */}
      <div className="max-w-4xl mx-auto mt-8 p-5 bg-amber-900/15 border border-amber-700/30 rounded-xl">
        <h3 className="text-lg font-semibold text-amber-400 mb-3">Why These Can&apos;t Work Alone</h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Formal game theory analysis confirms: <strong>3 emergent properties exist only in composition</strong>.
          ATP economics alone can&apos;t distinguish spam from slow learners. Trust tensors alone can&apos;t prevent
          Sybil attacks. Coherence alone can&apos;t measure value. But when ATP costs interact with T3 reputation
          and CI consistency simultaneously, the composed system produces behaviors no single layer can:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm ml-2">
          <li><strong className="text-gray-300">Self-correcting pricing:</strong> High trust lowers ATP costs, which rewards quality contributors &mdash; an equilibrium that emerges only from ATP&times;T3 interaction</li>
          <li><strong className="text-gray-300">Unfakeable consistency:</strong> CI measures coherence across actions, but only ATP costs make faking coherence expensive, and only T3 makes faking <em>worthwhile</em> coherence impossible</li>
          <li><strong className="text-gray-300">Natural quality selection:</strong> The 7&times; quality ramp, trust decay, and cost multipliers create a fitness landscape where quality behavior is the only stable strategy</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3 italic">
          Source: web4 correlated equilibrium analysis (~100 formal checks). The composite welfare exceeds
          the sum of per-layer welfare &mdash; composition creates non-additive effects.
        </p>
      </div>

      {/* Governance: What Happens When Things Go Wrong */}
      <section id="governance" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          What Happens When Things Go Wrong?
        </h2>
        <p className="text-gray-400 mb-8">
          Energy economics handle most bad actors — spammers simply die. But what about
          edge cases? What if someone is falsely accused, or a crisis requires bending the rules?
          Web4 uses a governance framework called <strong className="text-gray-200">SAL (Society-Authority-Law)</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">🏛️</div>
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Society</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Defines the community&apos;s purpose and membership rules. Different societies
              can have different standards — a research group and a marketplace don&apos;t need the same rules.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">⚖️</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Authority</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Roles with specific responsibilities — not centralized power. Authorities are bound
              by the same trust mechanics as everyone else. Abuse trust? Lose authority.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-2xl mb-2">📜</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Law</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Graduated severity levels (critical → high → medium). A <strong>law oracle</strong> evaluates
              actions and produces verdicts — for example, flagging a paper submission with 40% overlap as potential plagiarism,
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
              <p className="text-gray-300">&ldquo;Open Science Collective&rdquo; — purpose: advance reproducible research. Membership requires T3 Training ≥ 0.6 in any scientific role.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400 font-bold shrink-0">Authority:</span>
              <p className="text-gray-300">Three roles: <strong>Reviewer</strong> (can approve publications, needs T3 ≥ 0.8), <strong>Treasurer</strong> (manages ATP grants, elected by members), <strong>Moderator</strong> (resolves disputes, rotates monthly). All bound by the same trust mechanics — abuse power and you lose the role.</p>
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
              The <strong>law oracle</strong> evaluates each action against these rules and produces verdicts: Perfect (aligned + compliant), Aligned (spirit right, letter wrong — acceptable), Warning, or Violation. The key insight: a researcher who bends formatting rules to publish breakthrough findings faster (aligned but not compliant) is treated differently from one who follows every rule while quietly undermining peers (compliant but not aligned).
            </p>
          </div>
        </div>

        {/* Step-by-step walkthrough: what happens when someone breaks a rule */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-200 mb-3">Walkthrough: A Plagiarism Case from Start to Finish</h4>
          <p className="text-gray-400 text-sm mb-4">
            Here&apos;s how the Open Science Collective handles a real violation — step by step.
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
                <p className="text-gray-300"><strong>Notification.</strong> Dr. Chen is informed of the verdict, the evidence (the flagged overlap), and the specific rule violated. All of this is recorded in the tamper-evident audit chain — the community can inspect it.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <div>
                <p className="text-gray-300"><strong>Appeal (if filed).</strong> Dr. Chen believes the overlap is from a shared dataset, not plagiarism. She files an appeal with evidence — the shared data source, timestamps showing independent work.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">5</span>
              <div>
                <p className="text-gray-300"><strong>Independent review.</strong> A Moderator (rotating monthly, not the original oracle) examines the evidence. They can call witnesses — other members familiar with the dataset.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-gray-700 text-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">6</span>
              <div>
                <p className="text-gray-300"><strong>Resolution.</strong> Two possible outcomes:</p>
                <ul className="mt-1 text-gray-400 space-y-1 ml-4">
                  <li>&bull; <strong className="text-green-400">Appeal upheld:</strong> Suspension lifted, trust scores restored, the false positive is recorded (improving future oracle accuracy).</li>
                  <li>&bull; <strong className="text-red-400">Appeal denied:</strong> Suspension stands. Dr. Chen can still participate in other communities — the penalty is society-specific, not global.</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic mt-4">
            The key insight: every step is inspectable, every verdict is appealable, and penalties are proportional and scoped. A &ldquo;High&rdquo; violation gets suspension, not ejection. A &ldquo;Critical&rdquo; violation (fabricating data) would result in ejection — different severity, different consequence.
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-950/20 to-gray-900 border border-amber-800/20 rounded-xl p-6 mb-4">
          <h4 className="text-lg font-semibold text-amber-300 mb-2">What About False Positives?</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            A multi-tier <strong>appeals mechanism</strong> has been designed: file a claim → independent review →
            evidence phase → hearing with witness panel → verdict → enforcement. Successful appeals
            restore your trust scores.
          </p>
          <p className="text-gray-500 text-xs italic">
            Honest status: the appeals mechanism is formally specified (109 integration checks) but hasn&apos;t been
            tested with real humans yet. See{' '}
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
                A society with unfair rules loses members — and their ATP contributions. This creates competitive
                pressure: societies that treat members well attract more participants.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Authority decay:</span>
              <p className="text-gray-400">Authorities are bound by the same trust mechanics as everyone else.
                A biased moderator or corrupt reviewer sees their own trust score drop as members flag their
                actions. Below the threshold, they lose the role automatically — no vote needed.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Transparency:</span>
              <p className="text-gray-400">Law oracle verdicts are recorded in a tamper-evident audit chain.
                Every decision is inspectable — members can see exactly how the oracle classified each action.
                Patterns of biased verdicts become visible over time.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-purple-400 font-bold shrink-0">Federation competition:</span>
              <p className="text-gray-400">Multiple societies can serve similar purposes. If the &ldquo;Open Science
                Collective&rdquo; becomes authoritarian, members migrate to &ldquo;Free Research Network.&rdquo;
                Trust portability (via <Link href="/federation-economics" className="text-sky-400 hover:underline">federation</Link>)
                means switching communities doesn&apos;t mean starting over.</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic mt-4">
            The analogy: open-source projects. If a project&apos;s governance becomes hostile, contributors fork it.
            The ability to fork — not the act of forking — keeps governance honest. Web4 societies work the same way.
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
              entry requirements, and starting rules. Think of it like writing a charter — &ldquo;This community requires
              T3 Training ≥ 0.6 to join, ATP cost per publication is 5 units, and moderators rotate monthly.&rdquo;
            </p>
            <p>
              <strong className="text-gray-300">Changing rules:</strong> Governed by the society&apos;s own SAL framework.
              Most societies use some form of member voting weighted by trust score — a long-standing, high-trust member
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
            consensus, some hold elections. Web4 doesn&apos;t prescribe the model — it provides the trust infrastructure
            that makes any model accountable.
          </p>
        </div>

        {/* Who validates quality? — Mar 22 visitor unanswered Q1 */}
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
            restaurant tip that happens automatically when service is good — except it&apos;s your
            energy budget, not your wallet. See{' '}
            <Link href="/atp-economics" className="text-sky-400 hover:underline">ATP Economics</Link>{' '}
            for the full mechanics.
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Full definitions:{' '}
          <Link href="/glossary" className="text-sky-400 hover:underline">Glossary</Link>{' · '}
          Security analysis:{' '}
          <Link href="/threat-model" className="text-sky-400 hover:underline">Threat Model</Link>
        </p>
      </section>

      {/* Agent Orchestration — Chains of Trust */}
      <section id="agents" className="max-w-4xl mx-auto mt-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          When Agents Work Together
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Modern AI systems aren&apos;t single agents — they&apos;re chains. Agent A calls
          Agent B, which calls Tool C, which feeds Agent D. In Web4, trust doesn&apos;t just
          apply to individuals. It flows through the entire chain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-bold text-sky-400 mb-2">Trust Decays Through Chains</h3>
            <p className="text-sm text-gray-400">
              A 5-hop pipeline where each agent has 0.9 trust = 0.59 end-to-end.
              Trust multiplies, it doesn&apos;t add. Long chains need high individual trust.
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
            Everything described above is running in the{" "}
            <strong className="text-sky-400">Society Simulator</strong>. You can watch
            agents live, die, and be reborn. You can see energy fluctuate, trust
            evolve, and cross-life patterns learned.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Cross-Life Learning
              </h3>
              <p className="text-gray-400 text-sm">
                Watch full cross-life pattern learning across multiple lives. Pattern
                corpus builds with each life.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Trust Maturation
              </h3>
              <p className="text-gray-400 text-sm">
                Compare Web4 trust maturation vs baseline. See how T3 evolves
                with coherent behavior.
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/society-simulator"
              className="inline-block px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Launch Society Simulator →
            </Link>
            <Link
              href="/playground"
              className="inline-block px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              Playground (Experiment) →
            </Link>
          </div>
        </div>
      </section>

      {/* Scaling Up — Federation Bridge */}
      <section className="max-w-4xl mx-auto mt-12">
        <div className="bg-gradient-to-r from-amber-900/15 to-purple-900/15 border border-amber-800/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3 text-amber-300">What About Multiple Communities?</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            Everything above describes one community. In a real Web4 network, there are many — grouped into
            <strong className="text-amber-300"> federations</strong> (networks of communities that share trust data
            and interoperate, like email servers that can send messages to each other even though they&apos;re run by different organizations).
            Each community has different specializations and ATP prices. Your reputation travels with you,
            but each community values different skills. A community of data analysts might pay
            a premium for engineering talent, while a research group might value practical builders.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            When you belong to multiple communities with different rules, the system detects
            policy conflicts and resolves them by proximity — your closest trust relationships
            take priority. No committee needed; the trust graph itself determines precedence.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            ATP prices adjust dynamically based on supply and demand — no central pricing authority needed.
            This is{' '}
            <Link href="/federation-economics" className="text-amber-400 hover:underline">
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
              Deep dive into energy budgets. Try the interactive simulator.
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
            href="/decision-evolution"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-green-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Cross-Life Learning
            </h3>
            <p className="text-gray-400 text-sm">
              See how agents get better at making decisions across lives.
            </p>
          </Link>

          <Link
            href="/federation-economics"
            className="block p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-amber-500 rounded-xl transition-colors"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              Federation Economics
            </h3>
            <p className="text-gray-400 text-sm">
              Watch ATP prices adjust dynamically as agents specialize and markets self-organize.
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
