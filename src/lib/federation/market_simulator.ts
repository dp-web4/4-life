/**
 * Federation Economics - Market Simulator
 *
 * Simulates dynamic ATP pricing based on component supply/demand in a Web4 federation.
 * Demonstrates how markets self-organize without central planning through price signals.
 *
 * Based on: ~/ai-workspace/web4/game/engine/dynamic_atp_premiums.py
 * Session #13: Federation Economics Visualization
 */

export enum V3Component {
  ACCURACY = "accuracy",
  RELIABILITY = "reliability",
  CONSISTENCY = "consistency",
  SPEED = "speed",
  EFFICIENCY = "efficiency",
}

export interface AgentProfile {
  id: string;
  name: string;
  accuracy: number;
  reliability: number;
  consistency: number;
  speed: number;
  efficiency: number;
  specialization?: V3Component; // Dominant component
}

export interface OperationRequest {
  id: string;
  type: string;
  requiredComponent: V3Component;
  timestamp: number;
  baseCost: number; // ATP base cost
}

export interface ComponentMarketState {
  component: V3Component;
  demand: number; // Operations requesting this component
  supply: number; // Agents specializing in this component
  scarcity: number; // demand / supply ratio
  premium: number; // ATP cost multiplier (1.0 = no premium)
  premiumPct: number; // Premium as percentage
  avgSupplierQuality: number;
}

export interface MarketSnapshot {
  tick: number;
  timestamp: number;
  components: Record<V3Component, ComponentMarketState>;
  totalOperations: number;
  totalAgents: number;
}

export interface MarketSimulationResult {
  snapshots: MarketSnapshot[];
  events: MarketEvent[];
  summary: {
    initialScarcity: Record<V3Component, number>;
    finalScarcity: Record<V3Component, number>;
    avgPremiums: Record<V3Component, number>;
    equilibriumReached: boolean;
    equilibriumTick?: number;
  };
}

export interface MarketEvent {
  tick: number;
  type: "high_demand" | "supply_shock" | "equilibrium" | "specialization" | "price_spike";
  component: V3Component;
  description: string;
  impact: string;
}

// Simulation parameters (from dynamic_atp_premiums.py)
const MAX_PREMIUM_RATE = 0.50; // 50% max premium
const MIN_PREMIUM_RATE = -0.20; // 20% max discount
const SUPPLY_THRESHOLD = 0.75; // Agent counts as supplier if component ≥ 0.75
const DEMAND_WINDOW_SIZE = 100;

/**
 * Calculate agent's specialization (dominant component)
 */
export function calculateSpecialization(agent: AgentProfile): V3Component | undefined {
  const components = {
    [V3Component.ACCURACY]: agent.accuracy,
    [V3Component.RELIABILITY]: agent.reliability,
    [V3Component.CONSISTENCY]: agent.consistency,
    [V3Component.SPEED]: agent.speed,
    [V3Component.EFFICIENCY]: agent.efficiency,
  };

  const max = Math.max(...Object.values(components));

  if (max < SUPPLY_THRESHOLD) return undefined;

  const specialized = Object.entries(components).find(
    ([_, value]) => value === max
  );

  return specialized ? (specialized[0] as V3Component) : undefined;
}

/**
 * Calculate scarcity factor and premium for a component
 */
export function calculatePremium(demand: number, supply: number): { scarcity: number; premium: number } {
  // Avoid division by zero
  const scarcity = supply === 0 ? 10.0 : demand / supply;

  // Calculate raw premium
  let premium: number;

  if (scarcity >= 0.5) {
    // Scarcity: demand ≥ supply
    // Premium = 1 + (max_rate × scarcity), capped at 1.5×
    premium = Math.min(1.5, 1.0 + MAX_PREMIUM_RATE * scarcity);
  } else {
    // Surplus: supply >> demand
    // Discount proportional to surplus (up to 20% discount)
    const discountFactor = (0.5 - scarcity) / 0.5; // 0 to 1
    premium = 1.0 + MIN_PREMIUM_RATE * discountFactor;
  }

  return { scarcity, premium };
}

/**
 * Calculate market state for all components
 */
export function calculateMarketState(
  agents: AgentProfile[],
  recentOperations: OperationRequest[],
  tick: number
): MarketSnapshot {
  const components = Object.values(V3Component);
  const componentStates: Record<V3Component, ComponentMarketState> = {} as any;

  for (const component of components) {
    // Calculate supply: agents with component ≥ threshold
    const suppliers = agents.filter((agent) => {
      const value = agent[component];
      return value >= SUPPLY_THRESHOLD;
    });

    const supply = suppliers.length;
    const avgSupplierQuality =
      suppliers.length > 0
        ? suppliers.reduce((sum, a) => sum + a[component], 0) / suppliers.length
        : 0;

    // Calculate demand: operations requesting this component (recent window)
    const demand = recentOperations.filter(
      (op) => op.requiredComponent === component
    ).length;

    // Calculate scarcity and premium
    const { scarcity, premium } = calculatePremium(demand, supply);
    const premiumPct = (premium - 1.0) * 100;

    componentStates[component] = {
      component,
      demand,
      supply,
      scarcity,
      premium,
      premiumPct,
      avgSupplierQuality,
    };
  }

  return {
    tick,
    timestamp: Date.now(),
    components: componentStates,
    totalOperations: recentOperations.length,
    totalAgents: agents.length,
  };
}

/**
 * Detect market events (interesting moments)
 */
export function detectMarketEvents(
  current: MarketSnapshot,
  previous: MarketSnapshot | null,
  events: MarketEvent[]
): MarketEvent[] {
  const newEvents: MarketEvent[] = [];

  for (const component of Object.values(V3Component)) {
    const state = current.components[component];
    const prevState = previous?.components[component];

    // High demand spike
    if (state.scarcity > 3.0 && (!prevState || prevState.scarcity < 2.0)) {
      newEvents.push({
        tick: current.tick,
        type: "high_demand",
        component,
        description: `${component} demand spike: ${state.demand} operations, only ${state.supply} suppliers`,
        impact: `ATP cost ${state.premium.toFixed(2)}× (${state.premiumPct.toFixed(0)}% premium)`,
      });
    }

    // Price spike
    if (state.premium > 1.3 && (!prevState || prevState.premium < 1.2)) {
      newEvents.push({
        tick: current.tick,
        type: "price_spike",
        component,
        description: `${component} ATP cost spikes to ${state.premium.toFixed(2)}× base`,
        impact: `Profit signal for ${component} specialists`,
      });
    }

    // Equilibrium reached
    if (
      prevState &&
      Math.abs(state.premium - prevState.premium) < 0.05 &&
      Math.abs(state.scarcity - 1.0) < 0.3
    ) {
      const hasEquilibriumEvent = events.some(
        (e) => e.type === "equilibrium" && e.component === component
      );
      if (!hasEquilibriumEvent) {
        newEvents.push({
          tick: current.tick,
          type: "equilibrium",
          component,
          description: `${component} market reaches equilibrium (scarcity ${state.scarcity.toFixed(2)})`,
          impact: "Stable pricing, efficient allocation",
        });
      }
    }

    // Supply shock
    if (prevState && state.supply > prevState.supply * 1.5) {
      newEvents.push({
        tick: current.tick,
        type: "supply_shock",
        component,
        description: `${component} supply surge: ${prevState.supply} → ${state.supply} agents`,
        impact: `Premium drops from ${prevState.premiumPct.toFixed(0)}% to ${state.premiumPct.toFixed(0)}%`,
      });
    }
  }

  return newEvents;
}

/**
 * Simulate agent response to market signals
 * Agents specialize toward high-premium components
 */
export function agentsRespondToMarket(
  agents: AgentProfile[],
  marketState: MarketSnapshot,
  responseRate: number = 0.2 // 20% of agents adjust per tick
): AgentProfile[] {
  // Find highest premium component
  const components = Object.values(V3Component);
  const premiums = components.map((c) => ({
    component: c,
    premium: marketState.components[c].premium,
  }));
  premiums.sort((a, b) => b.premium - a.premium);

  const highestPremiumComponent = premiums[0].component;
  const lowestPremiumComponent = premiums[premiums.length - 1].component;

  // Select agents to adjust (random sample)
  const numToAdjust = Math.floor(agents.length * responseRate);
  const shuffled = [...agents].sort(() => Math.random() - 0.5);
  const adjusting = shuffled.slice(0, numToAdjust);

  return agents.map((agent) => {
    if (!adjusting.includes(agent)) return agent;

    // Increase high-premium component, decrease low-premium component
    const adjusted = { ...agent };
    adjusted[highestPremiumComponent] = Math.min(
      1.0,
      agent[highestPremiumComponent] + 0.05
    );
    adjusted[lowestPremiumComponent] = Math.max(
      0.6,
      agent[lowestPremiumComponent] - 0.03
    );

    return adjusted;
  });
}

/**
 * Run market simulation
 */
export function runMarketSimulation(
  initialAgents: AgentProfile[],
  operationDemandPattern: (tick: number) => V3Component[], // Function generating demand per tick
  ticks: number = 50,
  agentsRespondToPrice: boolean = true
): MarketSimulationResult {
  const snapshots: MarketSnapshot[] = [];
  const events: MarketEvent[] = [];
  let agents = [...initialAgents];
  const operationHistory: OperationRequest[] = [];

  for (let tick = 0; tick < ticks; tick++) {
    // Generate operations for this tick
    const demandComponents = operationDemandPattern(tick);
    const newOperations = demandComponents.map((comp, idx) => ({
      id: `op_${tick}_${idx}`,
      type: "federation_operation",
      requiredComponent: comp,
      timestamp: Date.now(),
      baseCost: 30, // Base ATP cost
    }));

    // Add to history (maintain sliding window)
    operationHistory.push(...newOperations);
    if (operationHistory.length > DEMAND_WINDOW_SIZE) {
      operationHistory.splice(0, operationHistory.length - DEMAND_WINDOW_SIZE);
    }

    // Calculate market state
    const marketState = calculateMarketState(agents, operationHistory, tick);
    snapshots.push(marketState);

    // Detect events
    const prevSnapshot = snapshots[snapshots.length - 2] || null;
    const newEvents = detectMarketEvents(marketState, prevSnapshot, events);
    events.push(...newEvents);

    // Agents respond to price signals (market adaptation)
    if (agentsRespondToPrice && tick > 5 && tick % 5 === 0) {
      agents = agentsRespondToMarket(agents, marketState);
    }
  }

  // Calculate summary statistics
  const components = Object.values(V3Component);
  const initialScarcity: Record<string, number> = {};
  const finalScarcity: Record<string, number> = {};
  const avgPremiums: Record<string, number> = {};

  for (const component of components) {
    initialScarcity[component] = snapshots[0].components[component].scarcity;
    finalScarcity[component] =
      snapshots[snapshots.length - 1].components[component].scarcity;
    avgPremiums[component] =
      snapshots.reduce((sum, s) => sum + s.components[component].premium, 0) /
      snapshots.length;
  }

  // Check if equilibrium reached (all components within 20% of optimal scarcity = 1.0)
  const lastSnapshot = snapshots[snapshots.length - 1];
  const equilibriumReached = components.every(
    (c) => Math.abs(lastSnapshot.components[c].scarcity - 1.0) < 0.3
  );
  const equilibriumTick = events.find((e) => e.type === "equilibrium")?.tick;

  return {
    snapshots,
    events,
    summary: {
      initialScarcity: initialScarcity as Record<V3Component, number>,
      finalScarcity: finalScarcity as Record<V3Component, number>,
      avgPremiums: avgPremiums as Record<V3Component, number>,
      equilibriumReached,
      equilibriumTick,
    },
  };
}
