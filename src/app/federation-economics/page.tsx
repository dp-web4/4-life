import Link from "next/link";
import FederationMarket from "@/components/FederationMarket";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";
import ExplorerNav from "@/components/ExplorerNav";
import PageTracker from "@/components/PageTracker";
import TermTooltip from "@/components/TermTooltip";

/**
 * Federation Economics Explainer
 *
 * Explains how Web4 markets self-organize through dynamic ATP pricing.
 * No central planning - just price signals and agent specialization.
 *
 * Session #13: Federation Economics Visualization
 */

export default function FederationEconomicsPage() {
  return (
    <>
      <PageTracker slug="federation-economics" />
      <Breadcrumbs currentPath="/federation-economics" />
      {/* Hero */}
      <section className="max-w-4xl mx-auto">
        <div className="text-sm uppercase tracking-wide text-sky-400 mb-4">
          Federation Economics
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
          How Markets Self-Organize
        </h1>

        <p className="text-xl text-gray-300 leading-relaxed mb-6">
          Think of it like surge pricing for ride-sharing. When it&apos;s raining and
          everyone needs a ride, prices go up. Higher prices attract more drivers.
          More drivers means shorter waits and lower prices. Nobody planned this —
          the market self-organized.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed mb-6">
          Web4 federations work the same way with <TermTooltip term="ATP" />. When speed specialists are
          scarce, speed operations cost more. High prices signal profit opportunities,
          agents specialize, supply increases, and prices stabilize.{" "}
          <strong>No central planner</strong> — markets allocate resources
          efficiently through price signals alone.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          This is <strong>comparative advantage at the agent level</strong> — agents
          develop capabilities the federation values, and the market self-organizes
          toward efficient allocation.
        </p>
      </section>

      {/* What Is a Federation? */}
      <section>
        <div className="p-5 bg-sky-950/30 border border-sky-800/30 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-sky-400 mb-2">What is a federation?</h3>
          <p className="text-gray-300 leading-relaxed">
            A federation is a group of agents (people, organizations, or AI) that pool their
            capabilities to handle work none of them could do alone — like a freelance collective
            where members bring different skills. Federations form voluntarily, and members keep
            their individual trust scores and ATP budgets.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            The economics below explain how federations price and allocate work without a central
            manager — using the same supply-and-demand signals that make ride-sharing work.
          </p>
        </div>
      </section>

      {/* The Problem Web4 Solves */}
      <section>
        <h2>The Problem Web4 Solves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-800/30 rounded-lg">
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              ❌ Traditional Platforms
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong>Static pricing:</strong> Costs don't respond to supply/demand
              </li>
              <li>
                <strong>Central planning:</strong> Platform decides who provides what
              </li>
              <li>
                <strong>Inefficient allocation:</strong> Shortages coexist with
                surpluses
              </li>
              <li>
                <strong>No specialization signals:</strong> Agents don't know what's
                valuable
              </li>
              <li>
                <strong>Rigid markets:</strong> Can't adapt to changing needs
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              ✅ Web4 Federations
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong>Dynamic pricing:</strong> ATP costs track scarcity in real-time
              </li>
              <li>
                <strong>Market signals:</strong> Prices guide agent specialization
              </li>
              <li>
                <strong>Efficient allocation:</strong> Supply flows to high-demand
                areas
              </li>
              <li>
                <strong>Specialization emerges:</strong> Agents develop profitable
                capabilities
              </li>
              <li>
                <strong>Adaptive markets:</strong> Self-organize as needs change
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section>
        <h2>Watch Markets Self-Organize</h2>
        <p className="text-gray-400 mb-6">
          This simulation shows how ATP prices respond to component scarcity. Click
          any component to see its market history. Watch how agents specialize toward
          high-premium areas, increasing supply and stabilizing prices.
        </p>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
          <FederationMarket autoPlay={false} />
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2>How Dynamic ATP Pricing Works</h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center text-2xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">
                Track Supply and Demand
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                The federation tracks <strong>demand</strong> (operations requesting
                each component) and <strong>supply</strong> (agents with high scores
                in each component). This happens continuously across all operations.
              </p>
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded font-mono text-sm">
                <div className="text-gray-500">Example:</div>
                <div className="text-gray-300 mt-2">
                  Speed component:
                  <br />
                  &nbsp;&nbsp;Demand = 30 operations
                  <br />
                  &nbsp;&nbsp;Supply = 2 agents (with speed ≥ 0.75)
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">
                Calculate Scarcity Factor
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                Like checking how many taxis are available vs. how many people
                need rides. Scarcity = demand / supply. When demand exceeds supply, the component
                is <strong>scarce</strong>. When supply exceeds demand, there&apos;s a{" "}
                <strong>surplus</strong>.
              </p>
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded font-mono text-sm">
                <div className="text-gray-500">Scarcity formula:</div>
                <div className="text-gray-300 mt-2">
                  scarcity = demand / supply
                  <br />
                  <br />
                  Speed example:
                  <br />
                  &nbsp;&nbsp;scarcity = 30 / 2 ={" "}
                  <span className="text-red-400">15.0 (very scarce!)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">
                Apply ATP Premium
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                High scarcity → <span className="text-red-400">premium</span> (up to
                +50% ATP cost)
                <br />
                Low scarcity → <span className="text-green-400">discount</span> (up
                to -20% ATP cost)
              </p>
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded font-mono text-sm">
                <div className="text-gray-500">Premium formula:</div>
                <div className="text-gray-300 mt-2">
                  premium = 1.0 + (0.5 × scarcity)
                  <br />
                  <span className="text-gray-500">
                    {" "}
                    capped at 1.5× (50% max)
                  </span>
                  <br />
                  <br />
                  Speed example:
                  <br />
                  &nbsp;&nbsp;premium = 1.0 + (0.5 × 15.0) ={" "}
                  <span className="text-red-400">8.0 → capped at 1.5×</span>
                  <br />
                  &nbsp;&nbsp;ATP cost = 30 ATP × 1.5 ={" "}
                  <span className="text-red-400 font-bold">45 ATP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sky-400 mb-2">
                Agents Respond to Profit Signals
              </h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                When speed operations pay 50% premiums, agents have economic incentive
                to <strong>specialize in speed</strong>. They train models, optimize
                infrastructure, and develop speed capabilities. As supply increases,
                premiums fall, and the market reaches <strong>equilibrium</strong>.
              </p>
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded">
                <div className="text-sm text-gray-400 mb-2">Market cycle:</div>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>High demand, low supply → premium</li>
                  <li>Premium signals profit opportunity</li>
                  <li>Agents specialize to capture premium</li>
                  <li>Supply increases</li>
                  <li>Premium decreases</li>
                  <li>Equilibrium: supply ≈ demand, premium ≈ 1.0×</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section>
        <h2>Why This Matters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              🎯 Efficient Resource Allocation
            </h3>
            <p className="text-gray-300">
              Markets allocate resources to their highest-value use without any
              central authority deciding. Supply flows naturally to high-demand areas
              through price signals alone.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              🧠 Emergent Specialization
            </h3>
            <p className="text-gray-300">
              Agents don't need instructions to specialize - they respond to economic
              incentives. High premiums signal "the federation needs this capability,"
              and agents develop it.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              ⚖️ Self-Regulating Markets
            </h3>
            <p className="text-gray-300">
              No administrator adjusts prices - markets find equilibrium
              automatically. Shortages create premiums, premiums attract supply,
              supply stabilizes prices.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-orange-950/30 to-orange-900/20 border border-orange-800/30 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              🔄 Adaptive to Change
            </h3>
            <p className="text-gray-300">
              When federation needs change (new use cases, different workloads),
              markets adapt automatically. No re-planning needed - agents follow the
              premiums.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-sky-950/30 to-sky-900/20 border border-sky-800/30 rounded-lg md:col-span-2">
            <h3 className="text-lg font-semibold text-sky-400 mb-3">
              📊 Federation Health Is Observable
            </h3>
            <p className="text-gray-300 mb-3">
              A federation&apos;s health can be quantified across four weighted dimensions — giving
              an objective measure of whether the community is thriving or declining:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-900/60 rounded p-3 text-center">
                <div className="text-purple-400 font-bold text-sm mb-1">30%</div>
                <div className="text-gray-300 font-medium">Trust distribution</div>
                <div className="text-gray-500 mt-1">Is trust spread evenly or hoarded by few?</div>
              </div>
              <div className="bg-gray-900/60 rounded p-3 text-center">
                <div className="text-green-400 font-bold text-sm mb-1">25%</div>
                <div className="text-gray-300 font-medium">Economic flow</div>
                <div className="text-gray-500 mt-1">Is ATP velocity healthy? Resources circulating?</div>
              </div>
              <div className="bg-gray-900/60 rounded p-3 text-center">
                <div className="text-amber-400 font-bold text-sm mb-1">25%</div>
                <div className="text-gray-300 font-medium">Governance participation</div>
                <div className="text-gray-500 mt-1">Are members voting? Quorums forming?</div>
              </div>
              <div className="bg-gray-900/60 rounded p-3 text-center">
                <div className="text-sky-400 font-bold text-sm mb-1">20%</div>
                <div className="text-gray-300 font-medium">Network connectivity</div>
                <div className="text-gray-500 mt-1">Is the trust graph well-connected or fragmented?</div>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-3 italic">
              Composite health scoring: session 30, track 3. Alerts trigger when any dimension falls below threshold.
              A healthy federation scores above 0.7 composite — unhealthy federations show early warning signs before collapse.
            </p>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section>
        <h2>Real-World Scenarios</h2>

        <div className="space-y-6">
          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">
              📱 Scenario 1: Mobile AI Surge
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Event:</strong> New mobile app launches, creating huge demand
                for <strong>speed</strong> (low-latency inference).
              </p>
              <p>
                <strong>Market response:</strong>
              </p>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Speed operations become 40% more expensive (1.4× premium)</li>
                <li>
                  Edge compute providers see profit opportunity, deploy low-latency
                  infrastructure
                </li>
                <li>Speed specialists enter market, supply increases</li>
                <li>Premium drops to 1.1× within 2 weeks</li>
                <li>
                  Mobile app gets fast service, providers earn premium during
                  shortage
                </li>
              </ol>
              <p className="text-sky-400">
                ✅ <strong>Outcome:</strong> Market adapts without central
                coordination
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">
              🔬 Scenario 2: Accuracy Oversupply
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Event:</strong> Many agents specialize in{" "}
                <strong>accuracy</strong>, but few operations require it.
              </p>
              <p>
                <strong>Market response:</strong>
              </p>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Accuracy operations get 15% discount (0.85× premium)</li>
                <li>Some accuracy specialists switch to other components</li>
                <li>Operations requiring accuracy get cheaper service</li>
                <li>Market rebalances as agents diversify</li>
              </ol>
              <p className="text-green-400">
                ✅ <strong>Outcome:</strong> Surplus automatically creates discounts,
                agents adjust
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-sky-400 mb-3">
              🏥 Scenario 3: Critical Infrastructure Demand
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong>Event:</strong> Healthcare federation needs{" "}
                <strong>reliability</strong> (can't tolerate downtime).
              </p>
              <p>
                <strong>Market response:</strong>
              </p>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Reliability operations pay 30% premium (1.3×)</li>
                <li>
                  High-reliability providers (redundant systems, 99.99% uptime) join
                  healthcare federation
                </li>
                <li>Supply meets demand</li>
                <li>Premium stabilizes at 1.1× (slight premium for critical service)</li>
              </ol>
              <p className="text-purple-400">
                ✅ <strong>Outcome:</strong> Critical needs attract specialized
                providers naturally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Basics divider */}
      <section className="max-w-4xl mx-auto">
        <div className="border-t-2 border-emerald-700/40 pt-8 pb-4 mt-4">
          <div className="flex items-center gap-4 bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-4">
            <div className="text-2xl">&#9989;</div>
            <div>
              <p className="text-lg text-emerald-300 font-semibold">You&apos;ve got the basics</p>
              <p className="text-sm text-gray-400">
                Markets self-organize through ATP price signals. No central planner needed.
                Everything below is optional — expand any section you&apos;re curious about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details — collapsed */}
      <section>
        <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
          <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
          <h2 className="text-2xl font-bold text-gray-100">Technical Details</h2>
          <span className="text-sm text-gray-500 ml-auto">Parameters, transfer mechanics, implementation</span>
        </summary>

        <div className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Service Capability Dimensions
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong className="text-sky-400">Accuracy:</strong> Correctness of
                results (precision, recall)
              </li>
              <li>
                <strong className="text-sky-400">Reliability:</strong> Uptime,
                availability, fault tolerance
              </li>
              <li>
                <strong className="text-sky-400">Consistency:</strong> Result
                stability across requests
              </li>
              <li>
                <strong className="text-sky-400">Speed:</strong> Low latency,
                fast response times
              </li>
              <li>
                <strong className="text-sky-400">Efficiency:</strong> ATP cost per
                operation, resource usage
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Premium Parameters
            </h3>
            <div className="p-4 bg-gray-900/50 border border-gray-700 rounded font-mono text-sm space-y-2">
              <div>
                <span className="text-gray-500">MAX_PREMIUM_RATE:</span>{" "}
                <span className="text-green-400">0.50</span>{" "}
                <span className="text-gray-500">(50% max premium)</span>
              </div>
              <div>
                <span className="text-gray-500">MIN_PREMIUM_RATE:</span>{" "}
                <span className="text-red-400">-0.20</span>{" "}
                <span className="text-gray-500">(20% max discount)</span>
              </div>
              <div>
                <span className="text-gray-500">SUPPLY_THRESHOLD:</span>{" "}
                <span className="text-sky-400">0.75</span>{" "}
                <span className="text-gray-500">
                  (agent counts as supplier if component ≥ 0.75)
                </span>
              </div>
              <div>
                <span className="text-gray-500">DEMAND_WINDOW:</span>{" "}
                <span className="text-purple-400">100 operations</span>{" "}
                <span className="text-gray-500">(sliding window)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Transfer Mechanics
            </h3>
            <p className="text-gray-300 mb-3">
              Every ATP transfer between entities burns <strong className="text-amber-400">5%</strong> of the amount.
              This anti-farming mechanism prevents circular flows (A → B → C → A) from inflating balances.
              In cross-federation transfers, the fee applies at each hop — making honest single-entity
              value creation more profitable than multi-identity gaming.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Federation Circuit Breakers
            </h3>
            <p className="text-gray-300 mb-3">
              What happens when a federation partner becomes malicious or fails? Each bridge
              has a <strong className="text-amber-400">circuit breaker</strong> that monitors
              trust degradation, response latency, and dispute rates. If a partner society
              consistently misbehaves, the circuit trips — isolating it before damage cascades
              across the federation. Recovery requires demonstrating improved behavior over time,
              not just reconnecting.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Cross-Society Policy Conflicts
            </h3>
            <p className="text-gray-300 mb-3">
              What if you&apos;re a member of two societies with conflicting rules? A research community
              says &ldquo;share all data openly&rdquo; while a healthcare federation says &ldquo;never share patient data.&rdquo;
              Which rule wins?
            </p>
            <p className="text-gray-400 text-sm mb-3 italic">
              Think of it like having a primary employer and a side project — your main job&apos;s rules usually take priority when there&apos;s a conflict.
            </p>
            <p className="text-gray-300 mb-3">
              Web4 resolves conflicts using <strong className="text-amber-400"><TermTooltip term="MRH" />-weighted priority</strong> (the society you&apos;re
              more closely connected to in your trust network wins). If you&apos;re primarily a healthcare
              practitioner who occasionally contributes to research, healthcare rules take precedence
              on conflicting policies. Three resolution strategies exist:
            </p>
            <ul className="space-y-1.5 text-gray-400 text-sm ml-4">
              <li>&bull; <strong className="text-gray-300">Priority:</strong> Closer society&apos;s policy wins (most common). <span className="text-gray-500">E.g., if you&apos;re posting in Community A but also belong to Community B, Community A&apos;s rules apply because that&apos;s where the action is happening.</span></li>
              <li>&bull; <strong className="text-gray-300">Intersection:</strong> Only policies both societies agree on apply</li>
              <li>&bull; <strong className="text-gray-300">Freeze:</strong> Emergency halt when conflicts can&apos;t be resolved — requires 2/3 quorum to unfreeze</li>
            </ul>
            <div className="mt-4 p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm font-semibold mb-2">Concrete example: Same person, different trust scores</p>
              <p className="text-gray-400 text-sm mb-2">
                Alice is active in two societies. A <strong className="text-gray-300">Research Federation</strong> rates
                her trust at <strong className="text-sky-400">0.82</strong> — she&apos;s published quality work
                and has high Talent scores. A <strong className="text-gray-300">Healthcare Federation</strong> rates
                her at <strong className="text-amber-400">0.44</strong> — she missed deadlines and her Temperament
                (reliability) scores are low.
              </p>
              <p className="text-gray-400 text-sm mb-2">
                Who&apos;s right? <strong className="text-gray-300">Both are.</strong> Trust is role-specific.
                Alice is genuinely skilled at research but unreliable in clinical settings. These aren&apos;t
                conflicting assessments — they&apos;re different dimensions of the same person, measured in different contexts.
              </p>
              <p className="text-gray-400 text-sm">
                When Alice acts at the <em>boundary</em> between the two societies (e.g., submitting
                healthcare research), the <strong className="text-gray-300">priority rule</strong> applies:
                since the action is happening in the healthcare context, her 0.44 trust applies. Her
                research reputation doesn&apos;t override the healthcare society&apos;s direct experience
                with her.
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-3 italic">
              Every resolution is recorded in a hash-chained audit trail. Disputes can be appealed
              (up to 2 appeals per resolution). This is formally specified (44 integration checks) but
              hasn&apos;t been tested with real cross-society scenarios yet.
            </p>
          </div>

          <div id="switching-societies" className="scroll-mt-24">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              What Does Switching Societies Actually Feel Like?
            </h3>
            <p className="text-gray-300 mb-3">
              You&apos;ve been active in a tech community for two years. You want to join a creative
              writing group. What happens to your reputation?
            </p>
            <div className="space-y-3 mb-3">
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <p className="text-gray-300 text-sm">
                  <strong>You request to join</strong> the writing group. Your tech trust score
                  (0.87) is visible, but the writing group applies a <strong className="text-amber-400">federation
                  discount</strong> — external trust is weighted at ~65% because it&apos;s from an
                  unrelated domain. Your starting trust: <strong className="text-sky-400">0.57</strong>.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <p className="text-gray-300 text-sm">
                  <strong>Your first contributions</strong> are evaluated on the writing group&apos;s
                  terms — creativity, feedback quality, engagement. Your tech Talent score doesn&apos;t
                  automatically carry over; you build trust from scratch in the dimensions that matter here.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <p className="text-gray-300 text-sm">
                  <strong>Your tech identity persists.</strong> You don&apos;t lose your 0.87 tech trust.
                  Both profiles are linked to the same LCT — you&apos;re one person with two
                  role-specific reputations. Like having a great LinkedIn profile and a brand-new
                  Goodreads account.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <p className="text-gray-300 text-sm">
                  <strong>The UX?</strong> You click &ldquo;Join,&rdquo; your device signs the request
                  with your LCT, and you&apos;re in — no new account, no new password, no starting from
                  zero. Your trust transfers partially, then you build locally. Like transferring to a
                  new school: your grades come with you, but you still need to prove yourself to new teachers.
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-xs italic">
              This is the same mechanism as Maya&apos;s federation transfer{' '}
              <a href="#trust-transfer" className="text-sky-400/70 hover:underline">above</a>{' '}
              — the discount reflects the uncertainty of cross-domain trust, not punishment. Higher discounts
              for more distant domains; lower discounts between related communities.
            </p>

            {/* FAQ: How federation decisions work — addresses visitor question */}
            <details className="bg-gray-800/40 border border-amber-700/30 rounded-xl p-5 mt-4">
              <summary className="text-sm font-semibold text-amber-300/90 cursor-pointer list-none flex justify-between items-center">
                <span>How does the ~65% discount get decided? Who controls federation?</span>
                <span className="text-gray-500 text-xs ml-2">click to expand</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm text-gray-400">
                <p className="m-0">
                  <strong className="text-gray-300">The discount formula:</strong> External trust is adjusted
                  by <code className="text-xs bg-gray-900 px-1 py-0.5 rounded">your_score × MRH_decay (0.7) × domain_match_factor</code>.
                  The domain match factor ranges from ~0.3 (completely unrelated fields) to ~0.9 (closely related communities).
                  Tech → writing is ~0.65 × 0.87 = 0.57. Tech → tech would be higher (~0.85 × 0.87 = 0.74).
                </p>
                <p className="m-0">
                  <strong className="text-gray-300">Who decides to federate?</strong> Federation is <em>opt-in and manual</em>.
                  Communities choose who they trust through{' '}
                  <a href="#governance" className="text-sky-400/70 hover:underline">governance voting</a>{' '}
                  — existing members vote on whether to accept a federation agreement. Higher-trust members
                  have more voting weight, but no single member dominates. Think of it like a co-op deciding
                  whether to partner with another co-op.
                </p>
                <p className="m-0">
                  <strong className="text-gray-300">Is any of it automatic?</strong> The trust <em>calculation</em> is
                  automatic (MRH decay and domain matching are formulas), but the <em>decision</em> to federate
                  is always a community governance choice. A community can also set policies like &ldquo;auto-accept
                  members from communities we&apos;ve federated with&rdquo; — but that policy itself requires a vote.
                </p>
              </div>
            </details>

            {/* FAQ: Conflicting trust scores — addresses visitor unanswered Q */}
            <details className="bg-gray-800/40 border border-amber-700/30 rounded-xl p-5 mt-4">
              <summary className="text-sm font-semibold text-amber-300/90 cursor-pointer list-none flex justify-between items-center">
                <span>What if two societies give the same person completely different trust scores?</span>
                <span className="text-gray-500 text-xs ml-2">click to expand</span>
              </summary>
              <div className="mt-3 space-y-3 text-sm text-gray-400">
                <p className="m-0">
                  <strong className="text-gray-300">This is expected, not a bug.</strong> Trust is role-contextualized.
                  You might be a 0.9-trusted data analyst in a tech community and a 0.3-trusted newcomer in a cooking
                  community. Those scores reflect genuine competence differences — and they <em>should</em> be different.
                </p>
                <p className="m-0">
                  <strong className="text-gray-300">What Society C sees:</strong> When you interact with Society C,
                  it doesn&apos;t pick one score. It applies MRH decay to <em>each</em> federated score independently.
                  If C is federated with both A and B, it sees: A&apos;s assessment × 0.7 decay = 0.63, and
                  B&apos;s assessment × 0.7 decay = 0.21. C then weights these by how relevant each society is
                  to the context (domain match factor) and how much C trusts A and B as societies.
                </p>
                <p className="m-0">
                  <strong className="text-gray-300">No single score &ldquo;wins.&rdquo;</strong> The final trust in C
                  is a weighted composition, not a vote. A tech community&apos;s assessment matters more for tech tasks;
                  a cooking community&apos;s assessment matters more for recipes. If the assessments genuinely conflict
                  in the <em>same domain</em>, that itself is a signal — C may require more local interaction before
                  trusting you, effectively treating you as a newcomer until you build direct evidence in C.
                </p>
              </div>
            </details>
          </div>

          <div id="value-conflicts" className="scroll-mt-24">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              When Values Themselves Conflict
            </h3>
            <p className="text-gray-300 mb-3">
              Policy conflicts have technical solutions (priority, intersection, freeze). But what about
              communities with <strong className="text-amber-400">fundamentally incompatible values</strong>?
              One society considers content censorship ethical; another considers it harmful. One
              society values radical transparency; another protects privacy as a human right.
            </p>
            <p className="text-gray-300 mb-3">
              Web4&apos;s answer: <strong>it doesn&apos;t force consensus</strong>. Societies with
              irreconcilable values simply don&apos;t federate with each other. The MRH boundary
              becomes a value boundary — you see and interact with societies whose norms are
              compatible with yours. This is deliberate: there is no global arbiter of what&apos;s
              &ldquo;right.&rdquo;
            </p>
            <p className="text-gray-400 text-sm mb-3">
              The cost: value balkanization. Societies may isolate into echo chambers. The
              mitigation: bridging societies that voluntarily span value boundaries, mediating
              cross-society interactions at increased ATP cost. Bridge societies earn trust from
              both sides by demonstrating fairness — but this requires human judgment, not algorithms.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Even basic parameters differ: the 0.5 trust threshold is a <strong>society-level setting</strong>,
              not a protocol constant. A research community might require 0.7 trust for publishing; a casual
              social space might accept 0.3. T3 weights, decay half-lives, and cost multipliers are all
              society-configurable. When federating, cross-society trust is translated at the boundary —
              portable but interpreted through local norms.
              See the{' '}
              <Link href="/why-web4#cultural-trust" className="text-sky-400 hover:underline">cultural trust FAQ</Link>{' '}
              for details.
            </p>
            <p className="text-gray-500 text-xs italic">
              This is a philosophical constraint, not a technical one. Web4 provides the
              infrastructure for pluralism but can&apos;t solve moral disagreement itself.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Consensus Under Partial Synchrony
            </h3>
            <p className="text-gray-300 mb-1">
              <strong className="text-amber-400">In plain English:</strong> a voting system that
              keeps working even when some participants are offline or dishonest.
            </p>
            <p className="text-gray-300 mb-3">
              Federation members don&apos;t always have reliable connections. Networks partition,
              messages arrive late, clocks drift. Web4 uses a <strong className="text-amber-400">PBFT-Lite
              consensus protocol</strong> (Practical Byzantine Fault Tolerance — a method for
              a group to agree on decisions even when some members are dishonest or offline) designed for this reality: vector clocks track causal
              ordering, partition detectors identify network splits, and leader election continues
              making progress even when some nodes are unreachable.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              The key insight: in partial synchrony, 40% finalization rate IS progress — the
              system doesn&apos;t stall waiting for perfect conditions. When partitions heal,
              nodes reconcile state automatically using the causal history encoded in vector
              clocks. Byzantine faults (malicious nodes) are bounded by the standard
              n &ge; 3f+1 requirement.
            </p>
            <p className="text-gray-500 text-xs italic">
              Formally verified (303 checks across 8 analysis tracks). At scale (n=1000 nodes),
              HotStuff-style linear consensus (a modern optimization where each round needs only one leader message instead of everyone-to-everyone) uses 250x fewer messages than classical PBFT —
              making large federations practical without drowning in coordination overhead.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              <strong className="text-amber-400">Trust-weighted voting:</strong> Consensus votes
              are weighted by each member&apos;s trust score. High-trust members have more voting
              weight — the quorum can be reached with fewer high-trust members than low-trust
              ones. This is Web4&apos;s answer to &ldquo;who counts most?&rdquo;: behavior does.
            </p>
            <details className="mt-3 bg-gray-900/50 border border-gray-700 rounded p-3">
              <summary className="text-sm text-sky-400 cursor-pointer hover:text-sky-300">
                Why cross-federation decisions take longer
              </summary>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Trust updates propagate <strong className="text-amber-400">~13x slower</strong> across
                federation boundaries than within a single federation. This isn&apos;t a bug — it&apos;s
                a consequence of causal ordering across independent networks. Think of it like
                international diplomacy: decisions within a country are fast, but treaties between
                countries take longer because both sides need to verify, translate, and agree.
                Web4 makes this explicit: cross-federation operations cost more ATP and carry
                higher latency, which naturally encourages local community strength.
              </p>
            </details>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Governance Voting
            </h3>
            <p className="text-gray-300 mb-3">
              Federation task consensus (above) handles routine operations. But <strong className="text-amber-400">governance
              decisions</strong> — policy changes, membership additions, emergency freezes, appeal
              outcomes — need stronger guarantees because they change the rules themselves and
              can&apos;t be rolled back.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Governance uses PBFT-style 3-phase voting (propose → prepare → commit) with
              trust-weighted voting power. Higher-trust federation members get more influence,
              but no single member can dominate. Sybil resistance prevents vote stuffing: creating
              fake federation members is hardware-bound and expensive.
            </p>
            <p className="text-gray-400 text-sm mb-3">
              Malicious federation behavior — equivocation (voting differently in different phases),
              vote withholding, proposal spam — is tracked across proposals and triggers graduated
              penalties up to federation ejection.
            </p>
            <p className="text-gray-500 text-xs italic">
              Federation governance BFT: 81 validated checks. Adaptive quorum, malicious detection,
              and sybil-resistant voting power all formally specified.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              Implementation
            </h3>
            <p className="text-gray-300 mb-3">
              Dynamic ATP pricing is implemented in the Web4 game engine:{" "}
              <code className="text-sky-400 text-sm">
                web4/game/engine/dynamic_atp_premiums.py
              </code>
            </p>
            <p className="text-gray-400">
              The system tracks supply/demand continuously, recalculates scarcity
              every 20 operations, and applies premiums to ATP costs in real-time.
              Agents register their component capabilities, operations declare
              requirements, and markets self-organize.
            </p>
          </div>
        </div>
        </details>
      </section>

      {/* Federated Trust Learning — collapsed */}
      <section>
        <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
          <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
          <h2 className="text-2xl font-bold text-gray-100">How Federations Learn Without Sharing Secrets</h2>
          <span className="text-sm text-gray-500 ml-auto">How communities learn from each other safely</span>
        </summary>
        <div className="mt-6">
        <p className="text-gray-300 mb-4">
          A privacy paradox: federations improve their trust models by learning from each other,
          but they shouldn&apos;t share raw behavioral data across society boundaries.
          Web4 resolves this with <strong className="text-sky-400">privacy-preserving federated learning</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-base font-semibold text-sky-400 mb-2">What Federations Share</h3>
            <ul className="space-y-1.5 text-gray-300 text-sm">
              <li>&bull; <strong>Gradient updates</strong> — how optimal trust parameters changed, not why</li>
              <li>&bull; <strong>Aggregate statistics</strong> — how well strategies worked, not who used them</li>
              <li>&bull; <strong>Model improvements</strong> — converged parameters, not training data</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="text-base font-semibold text-emerald-400 mb-2">What Stays Private</h3>
            <ul className="space-y-1.5 text-gray-300 text-sm">
              <li>&bull; <strong>Individual behavior</strong> — who did what, when</li>
              <li>&bull; <strong>Trust scores</strong> — specific entity reputation data</li>
              <li>&bull; <strong>Identity linkages</strong> — which people belong to which society</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-3">
          The mechanism: each federation trains locally on its own behavioral data, then contributes
          only the <em>direction of improvement</em> (gradient update) to a shared model. Gossip-based
          propagation spreads these updates across the network. <strong className="text-amber-400">Differential privacy</strong> adds
          calibrated noise before sharing, so individual contributions can&apos;t be reverse-engineered.
        </p>
        <details className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <summary className="text-sm text-sky-400 cursor-pointer hover:text-sky-300">
            ▶ Model poisoning: the adversarial case
          </summary>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            A malicious federation could contribute corrupted gradient updates to sabotage collective learning.
            Web4 defends against this by requiring gradient updates to be validated against a set of known-good
            test cases before acceptance. Updates that degrade validation performance are rejected,
            and the contributing federation is flagged. Combined with trust-weighted averaging
            (higher-trust federations contribute more to the shared model), poisoning requires both
            high trust and coordinated sabotage — expensive and detectable.
          </p>
        </details>
        <p className="text-gray-500 text-xs mt-3 italic">
          Federated trust learning: formally specified (session 32). Privacy guarantees are
          simulation-level — real-world differential privacy calibration requires empirical validation
          against actual federation sizes and behavioral distributions.
        </p>
      </div>
        </details>
      </section>

      {/* Federation Mergers — collapsed */}
      <section className="max-w-4xl mx-auto mt-16">
        <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
          <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
          <h2 className="text-2xl font-bold text-gray-100">When Federations Merge</h2>
          <span className="text-sm text-gray-500 ml-auto">Fair split calculations</span>
        </summary>
        <div className="mt-4">
        <p className="text-lg text-gray-300 mb-3 font-medium">
          Short version: each group gets a share based on what they uniquely bring to the table, and both sides must benefit or the merger doesn&apos;t happen.
        </p>
        <p className="text-gray-400 mb-6">
          What happens when two Web4 federations decide to combine? The merged federation
          creates new value — access to more specialists, broader trust networks, economies of scale.
          How that surplus gets divided determines whether mergers are fair.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-sky-400 mb-2">The Shapley Value Principle</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              The Shapley value (a concept from cooperative game theory that calculates
              each player&apos;s fair share of a group outcome) provides a mathematically fair way to divide merger surplus:
              each federation receives a share proportional to its <strong className="text-gray-300">marginal
              contribution</strong> — what the merged whole gains specifically because they joined.
            </p>
            <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Example:</strong> Federation A has medical specialists.
              Federation B has legal experts. Neither alone serves health-law cases.
              Together they can. The Shapley value splits that new revenue based on
              each party&apos;s unique contribution — not just size.
            </div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">Trust-Weighted Negotiating Power</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">
              Federations with higher average trust scores have stronger bargaining positions —
              they bring more reliable capacity to the merger. Nash bargaining theory
              (the math of two-party negotiations, showing how the deal splits based on
              each side&apos;s alternatives): the party with more to offer gets a proportionally larger share of the surplus.
            </p>
            <div className="bg-gray-900/50 rounded p-3 text-xs text-gray-500">
              <strong className="text-gray-300">Key property:</strong> Both parties must gain
              more from merging than from staying separate — otherwise the merger doesn&apos;t
              happen. Web4 federations only merge when it&apos;s genuinely beneficial to both,
              eliminating hostile takeovers.
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-xs italic">
          Multi-federation bargaining: Nash (fair splits), Kalai-Smorodinsky (proportional gains), and Shapley value (marginal contribution) solutions validated
          across 59 checks (session 32). All solutions satisfy individual rationality — no federation
          is forced into a merger that makes it worse off.
        </p>
      </div>
        </details>
      </section>

      {/* Trust Network Flow — collapsed */}
      <section>
        <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-3 text-gray-400 hover:text-gray-300 transition-colors">
          <span className="text-sm group-open:rotate-90 transition-transform">&#9654;</span>
          <h2 className="text-2xl font-bold text-gray-100">Trust Flows Like Water</h2>
          <span className="text-sm text-gray-500 ml-auto">Bottlenecks and bridge connectors</span>
        </summary>
        <div className="mt-4">
        <p className="text-gray-300 mb-3">
          <strong className="text-gray-100">The simple version:</strong> When two communities connect, the least-trusted
          link between them limits how much trust can pass — like a chain of garden hoses where the narrowest one controls
          the flow rate.
        </p>
        <p>
          Federations connect trust networks the way pipes connect water systems. Trust flows through
          paths between communities, and the <strong>weakest connection limits the whole flow</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 mb-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="font-semibold text-sky-400 mb-2">The Bottleneck Principle</h3>
            <p className="text-sm text-gray-400">
              The max trust that can flow from Community A to Community C (through B) is limited by
              the weakest link — the minimum trust capacity in the chain. If A→B trust is 0.8 but
              B→C trust is 0.3, the effective path trust is 0.3, not 0.8.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="font-semibold text-sky-400 mb-2">Bridge Agents Have Disproportionate Value</h3>
            <p className="text-sm text-gray-400">
              An entity with high trust in two communities acts as a bridge, increasing the flow
              capacity between them. This is why &ldquo;connectors&rdquo; — people trusted across
              domains — have outsized influence in federated systems.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="font-semibold text-sky-400 mb-2">Vulnerability Detection</h3>
            <p className="text-sm text-gray-400">
              Min-cut analysis identifies the minimum set of connections that, if severed, would
              isolate two communities. A single critical bridge agent = high vulnerability.
              Healthy federations have redundant paths.
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
            <h3 className="font-semibold text-sky-400 mb-2">No Central Router</h3>
            <p className="text-sm text-gray-400">
              Unlike centralized platforms that route all trust through their servers, Web4 trust
              flow is distributed. The network finds paths autonomously — no single server holds
              the keys to cross-community reputation.
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-xs italic">
          Trust network flow analysis: max-flow/min-cut applied to trust graphs (session 33).
          Bottleneck paths and vulnerability detection implemented.
        </p>
      </div>
        </details>
      </section>

      {/* How Your Trust Travels */}
      <section>
        <h2>How Your Trust Travels Between Communities</h2>
        <p>
          The most common question about federation: &ldquo;If I have 0.91 Talent as a data analyst
          in Community A, how does Community B know about that?&rdquo; Here&apos;s exactly how it works.
        </p>

        <div className="bg-gradient-to-br from-sky-950/20 to-gray-900 border border-sky-800/20 rounded-xl p-6 mt-4 mb-6">
          <h4 className="text-lg font-semibold text-sky-300 mb-4">Example: Maya Joins a New Community</h4>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3 items-start">
              <span className="bg-sky-900/50 text-sky-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="text-gray-200 font-semibold">Maya has a track record</p>
                <p className="text-gray-400">She&apos;s been a data analyst in the &ldquo;Open Science Collective&rdquo; for a year. Her T3: Talent 0.91, Training 0.87, Temperament 0.94. This is backed by hundreds of witnessed actions — peer reviews, dataset contributions, analysis outputs — all cryptographically signed and timestamped.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-sky-900/50 text-sky-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="text-gray-200 font-semibold">She applies to &ldquo;Health Data Alliance&rdquo;</p>
                <p className="text-gray-400">This community has a federation agreement with Open Science. Maya doesn&apos;t start from zero — her <strong className="text-sky-300">trust attestations travel with her LCT</strong>. The new community can verify her history because it&apos;s recorded in a tamper-evident audit chain, not stored on a single platform&apos;s servers.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-sky-900/50 text-sky-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="text-gray-200 font-semibold">Trust is discounted, not copied</p>
                <p className="text-gray-400">Health Data Alliance doesn&apos;t just accept 0.91 Talent at face value. The score is <strong className="text-amber-400">discounted by MRH decay (0.7 per hop)</strong> and weighted by the federation&apos;s trust in the source community. If the two communities have a strong federation bond (0.9), Maya&apos;s effective starting trust is roughly 0.91 × 0.7 × 0.9 = <strong className="text-amber-400">0.57</strong>. Not zero, not 0.91 — somewhere in between.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="bg-sky-900/50 text-sky-300 font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">4</span>
              <div>
                <p className="text-gray-200 font-semibold">She builds local trust independently</p>
                <p className="text-gray-400">Maya&apos;s imported score gives her a head start, but her trust in Health Data Alliance grows based on <em>her actions there</em>. After 50 quality contributions, her local trust overtakes the imported score. The federation bridged the cold-start gap — she didn&apos;t have to prove herself from scratch, but she still had to prove herself.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700/50">
            <p className="text-gray-500 text-xs">
              <strong className="text-gray-400">Key principle:</strong> Trust is portable but not inflatable. You can carry your reputation to a new community,
              but it arrives discounted. This prevents &ldquo;trust laundering&rdquo; — building a high score in an easy community
              and importing it wholesale to a high-stakes one.
            </p>
          </div>
        </div>

        <details className="bg-gray-900/50 border border-gray-700 rounded p-4 mb-4">
          <summary className="text-sm text-sky-400 cursor-pointer hover:text-sky-300">
            What if the communities aren&apos;t federated?
          </summary>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            If there&apos;s no federation agreement, Maya starts from the default newcomer position — low trust,
            higher action costs (1.4x), and the ~50-action ramp to establish herself. Her trust from Open Science
            still exists and is verifiable, but Health Data Alliance has no obligation to accept it.
            Federation is opt-in: communities choose who they trust, just like individuals do.
          </p>
        </details>

        <details className="bg-gray-900/50 border border-gray-700 rounded p-4 mb-4">
          <summary className="text-sm text-sky-400 cursor-pointer hover:text-sky-300">
            Concrete example: &ldquo;I have trust in Community A, now I join Community B — what happens?&rdquo;
          </summary>
          <div className="text-gray-400 text-sm mt-3 leading-relaxed space-y-3">
            <p>
              Say you&apos;re a trusted member of a <strong>gardening forum</strong> (T3 = 0.82 as a contributor) and you join a <strong>cooking community</strong> that&apos;s federated with it.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li><strong>Your trust arrives discounted.</strong> The cooking community applies MRH decay (×0.7 per hop) and a domain relevance factor. Your gardening trust might arrive as 0.82 × 0.7 × 0.6 (domain match) = <strong>0.34</strong>.</li>
              <li><strong>You skip the cold-start penalty.</strong> Instead of the default 1.4× action cost, you start around 1.1× — the federation bridged part of the gap.</li>
              <li><strong>Local actions quickly dominate.</strong> After ~30 quality posts in the cooking community, your local trust overtakes the imported score. By ~50 actions, the imported trust is negligible.</li>
              <li><strong>Your gardening trust is unchanged.</strong> Trust isn&apos;t &ldquo;moved&rdquo; — it&apos;s verified and discounted. You keep your full reputation in the gardening forum.</li>
            </ol>
            <p className="text-gray-500 text-xs mt-2">
              <strong>Key insight:</strong> Federation makes joining easier, not free. Your reputation gives you a boost, but each community still requires you to prove yourself locally.
            </p>
          </div>
        </details>

        {/* Cross-society trust transfer UX — visitor Q Mar 24 */}
        <details className="bg-gray-900/50 border border-gray-700 rounded p-4 mb-4">
          <summary className="text-sm text-sky-400 cursor-pointer hover:text-sky-300">
            What does cross-society trust transfer actually <em>feel</em> like as a user?
          </summary>
          <div className="text-gray-400 text-sm mt-3 leading-relaxed space-y-3">
            <p>
              Imagine you&apos;re a respected member of a <strong>photography community</strong> (T3 = 0.85). You join a <strong>travel writing community</strong> that&apos;s federated with it. Here&apos;s what your first hour looks like:
            </p>
            <div className="space-y-2 ml-2">
              <p><strong className="text-gray-300">Minute 0 — You join.</strong> The travel community sees your photography trust (verified, not self-reported). After MRH decay and domain matching, your imported trust lands around 0.38.</p>
              <p><strong className="text-gray-300">Minute 1 — You post.</strong> Where a complete newcomer pays 1.4x ATP per action, you pay ~1.15x. The discount is noticeable but not dramatic — you&apos;re still proving yourself.</p>
              <p><strong className="text-gray-300">Minute 10 — Others see your badge.</strong> Your profile shows &ldquo;trusted in Photography (federated)&rdquo; — a social signal that you&apos;re not a throwaway account, even though your travel writing trust is still low.</p>
              <p><strong className="text-gray-300">Hour 1 — Trust is building locally.</strong> After 5-10 quality contributions, your local travel trust already rivals the imported score. By tomorrow, it dominates.</p>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              <strong>The feeling:</strong> You&apos;re recognized but not entitled. Think of it like transferring to a new school with a recommendation letter — it opens the door faster, but you still need to make friends.
            </p>
          </div>
        </details>
      </section>

      {/* Related Concepts */}
      <section>
        <h2>Related Concepts</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/atp-economics"
            className="p-6 bg-gradient-to-br from-green-950/30 to-green-900/20 border border-green-800/30 rounded-lg hover:border-green-700/50 transition-colors"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              ATP Economics
            </h3>
            <p className="text-sm text-gray-400">
              Understand the attention budget that powers Web4
            </p>
          </Link>

          <Link
            href="/trust-networks"
            className="p-6 bg-gradient-to-br from-purple-950/30 to-purple-900/20 border border-purple-800/30 rounded-lg hover:border-purple-700/50 transition-colors"
          >
            <div className="text-3xl mb-3">🕸️</div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">
              Trust Networks
            </h3>
            <p className="text-sm text-gray-400">
              See how trust relationships form societies
            </p>
          </Link>

          <Link
            href="/trust-tensor"
            className="p-6 bg-gradient-to-br from-blue-950/30 to-blue-900/20 border border-blue-800/30 rounded-lg hover:border-blue-700/50 transition-colors"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Trust Tensors (T3)
            </h3>
            <p className="text-sm text-gray-400">
              Multi-dimensional trust includes component capabilities
            </p>
          </Link>
        </div>
      </section>

      {/* Summary */}
      <section className="max-w-3xl mx-auto">
        <div className="p-8 bg-gradient-to-br from-sky-950/30 to-purple-950/30 border border-sky-800/30 rounded-lg">
          <h2 className="text-2xl font-bold text-sky-400 mb-4">
            The Core Insight
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            <strong>Web4 markets self-organize through ATP price signals.</strong>
          </p>
          <p className="text-gray-400 leading-relaxed">
            No central planner decides who should specialize in what. No authority
            adjusts prices. Agents respond to economic incentives, supply flows to
            high-demand areas, and markets reach equilibrium automatically. This is{" "}
            <strong className="text-sky-400">emergent efficiency</strong> - the same
            principle that makes free markets work, applied to decentralized AI
            federations.
          </p>
        </div>
      </section>
      <ExplorerNav currentPath="/federation-economics" />
      <RelatedConcepts currentPath="/federation-economics" />
    </>
  );
}
