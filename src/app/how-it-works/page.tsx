import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import TermTooltip from "@/components/TermTooltip";
import PageTracker from "@/components/PageTracker";

export default function HowItWorksPage() {
  return (
    <>
      <PageTracker slug="how-it-works" />
      <Breadcrumbs currentPath="/how-it-works" />

      {/* New visitor prompt */}
      <div className="max-w-4xl mx-auto mb-4 text-sm text-gray-500">
        New to Web4? This page is a reference overview. For a guided introduction, start with{' '}
        <Link href="/first-contact" className="text-sky-400 hover:underline">First Contact</Link> or the{' '}
        <Link href="/tldr" className="text-sky-400 hover:underline">2-minute TL;DR</Link>.
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Web4 Explained
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          How Web4 Societies Work
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Web4 is trust-native infrastructure for humans and AI. Instead of
          relying on platforms, moderators, or authorities, Web4 societies
          self-regulate through five foundational mechanisms:
        </p>

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
              href="/markov-relevancy-horizon"
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
              <div className="flex-1 bg-cyan-950/40 border border-cyan-800/40 rounded-lg p-3 flex items-center gap-3">
                <span className="text-xl">🌐</span>
                <div>
                  <span className="text-sm font-bold text-cyan-400">MRH</span>
                  <span className="text-sm text-gray-400"> — Defines your reach. Only see what&apos;s relevant to your trust network.</span>
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
      <section className="max-w-4xl mx-auto mt-16">
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
                Everything you do spends ATP from your energy budget:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    Low-cost actions
                  </div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>• Reading messages (1 ATP)</p>
                    <p>• Viewing content (2 ATP)</p>
                    <p>• Simple queries (3 ATP)</p>
                  </div>
                </div>
                <div className="p-3 bg-gray-800 rounded">
                  <div className="text-sm text-gray-400 mb-1">
                    High-cost actions
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
      </section>

      {/* Putting It All Together */}
      <section className="max-w-4xl mx-auto mt-16">
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

      {/* How The Three Systems Interact */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">
          How The Three Systems Connect
        </h2>
        <p className="text-gray-400 mb-6">
          ATP, T3, and CI aren&apos;t separate &mdash; they modulate each other. Here&apos;s how:
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 md:p-8">
          {/* Visual flow */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mb-8">
            <div className="flex-1 bg-sky-950/30 border border-sky-800/40 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">🔋</div>
              <div className="text-sm font-bold text-sky-400">ATP (Energy)</div>
              <div className="text-xs text-gray-500 mt-1">Powers every action</div>
            </div>
            <div className="text-gray-600 text-xl md:rotate-0 rotate-90">⇄</div>
            <div className="flex-1 bg-purple-950/30 border border-purple-800/40 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm font-bold text-purple-400">T3 (Trust)</div>
              <div className="text-xs text-gray-500 mt-1">Earned through actions</div>
            </div>
            <div className="text-gray-600 text-xl md:rotate-0 rotate-90">⇄</div>
            <div className="flex-1 bg-amber-950/30 border border-amber-800/40 rounded-lg p-4 text-center">
              <div className="text-2xl mb-1">⚖️</div>
              <div className="text-sm font-bold text-amber-400">CI (Coherence)</div>
              <div className="text-xs text-gray-500 mt-1">Verifies consistency</div>
            </div>
          </div>

          {/* Interaction descriptions */}
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-sky-400 mt-0.5">→</span>
              <p className="text-gray-300">
                <strong className="text-sky-400">ATP → T3:</strong>{" "}
                Spending energy on quality work builds trust. Burning energy on spam destroys it.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-purple-400 mt-0.5">→</span>
              <p className="text-gray-300">
                <strong className="text-purple-400">T3 → ATP:</strong>{" "}
                Higher trust earns more ATP per action. Low trust means higher costs and lower returns.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber-400 mt-0.5">→</span>
              <p className="text-gray-300">
                <strong className="text-amber-400">CI → Both:</strong>{" "}
                Inconsistent behavior (low CI) multiplies action costs by up to 1.4&times; and flags you for review.
                Consistent behavior keeps costs low and trust stable.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 mt-0.5">→</span>
              <p className="text-gray-300">
                <strong className="text-green-400">Together → Aliveness:</strong>{" "}
                You&apos;re &ldquo;alive&rdquo; when all three are healthy: ATP &gt; 0, Trust &gt; 0.5, CI coherent. Lose any one and the system intervenes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="max-w-4xl mx-auto mt-16">
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
              actions and produces verdicts. The key principle: alignment without compliance is acceptable;
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

        <p className="text-gray-500 text-sm">
          Full definitions:{' '}
          <Link href="/glossary" className="text-sky-400 hover:underline">Glossary</Link>{' · '}
          Security analysis:{' '}
          <Link href="/threat-model" className="text-sky-400 hover:underline">Threat Model</Link>
        </p>
      </section>

      {/* See It In Action */}
      <section className="max-w-4xl mx-auto mt-16">
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
            Everything above describes one community. In a real Web4 network, there are many —
            each with different specializations and ATP prices. Your reputation travels with you,
            but each community values different skills. A community of data analysts might pay
            a premium for engineering talent, while a research group might value practical builders.
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
      <section className="max-w-4xl mx-auto mt-16">
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
              Attention Budget (ATP)
            </h3>
            <p className="text-gray-400 text-sm">
              Deep dive into attention budgets. Try the interactive simulator.
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
