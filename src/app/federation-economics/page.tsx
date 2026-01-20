import Link from "next/link";
import FederationMarket from "@/components/FederationMarket";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedConcepts from "@/components/RelatedConcepts";

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
          In Web4 federations, ATP prices adjust dynamically based on supply and
          demand. When speed specialists are scarce, speed operations cost more. High
          prices signal profit opportunities, agents specialize, supply increases, and
          prices stabilize. <strong>No central planner</strong> - markets allocate
          resources efficiently through price signals alone.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed">
          This is <strong>comparative advantage at the agent level</strong> - agents
          develop capabilities the federation values, and the market self-organizes
          toward efficient allocation.
        </p>
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
                Scarcity = demand / supply. When demand exceeds supply, the component
                is <strong>scarce</strong>. When supply exceeds demand, there's a{" "}
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

      {/* Technical Details */}
      <section>
        <h2>Technical Details</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              V3 Components (5 Dimensions)
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
              Understand the metabolic attention budget that powers Web4
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
      <RelatedConcepts currentPath="/federation-economics" />
    </>
  );
}
