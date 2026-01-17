/**
 * Core type definitions for 4-life simulations
 */

// Agent state
export interface AgentState {
  lct: string;
  atp: number;
  trust: number;
  coherence_index?: number;
  is_alive: boolean;
}

// Action record
export interface ActionRecord {
  action_type: string;
  agent_lct: string;
  atp_before: number;
  atp_after: number;
  atp_cost: number;
  trust_before: number;
  trust_after: number;
  world_tick: number;
  tick: number;
  life_id: string;
  reason: string;
  event_type: string;
  action: string;
  state_before: AgentState;
  state_after: AgentState;
  success?: boolean;
}

// Life cycle
export interface LifeCycle {
  life_number: number;
  life_id: string;
  starting_atp: number;
  starting_trust: number;
  final_atp: number;
  final_trust: number;
  outcome: string;
  ticks_survived: number;
  actions_taken: number;
  history?: ActionRecord[];
  final_state: AgentState;
}

// Full simulation result
export interface SimulationResult {
  agent_name?: string;
  agent_lct: string;
  lives?: LifeCycle[];
  final_state: AgentState;
  total_lives: number;
  total_ticks: number;
  applied_actions?: Record<string, ActionRecord[]>;
  configuration?: Record<string, any>;
}
