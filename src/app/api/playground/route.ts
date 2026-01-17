import { NextResponse } from "next/server";
import { spawn } from "child_process";
import * as path from "path";

/**
 * Playground API Endpoint
 *
 * POST /api/playground
 *
 * Runs a Web4 agent simulation with user-specified parameters.
 * Returns JSON with life histories, metrics, and insights.
 *
 * Session #12: Interactive Parameter Playground
 */

export interface PlaygroundConfig {
  // Agent initial conditions
  initial_atp?: number;
  initial_trust?: number;

  // Action costs/rewards
  action_cost_low?: number;
  action_cost_medium?: number;
  action_cost_high?: number;
  action_reward_low?: number;
  action_reward_medium?: number;
  action_reward_high?: number;

  // Trust dynamics
  trust_gain_good?: number;
  trust_loss_bad?: number;
  trust_threshold_death?: number;

  // Rebirth karma
  karma_atp_bonus?: number;
  karma_trust_boost?: number;

  // Simulation parameters
  num_lives?: number;
  ticks_per_life?: number;
  risk_appetite?: number;
}

export interface ActionOutcome {
  tick: number;
  action_type: string;
  atp_cost: number;
  atp_reward: number;
  trust_change: number;
  success: boolean;
  atp_after: number;
  trust_after: number;
}

export interface LifeSummary {
  life_id: string;
  start_tick: number;
  end_tick: number;
  initial_atp: number;
  initial_trust: number;
  final_atp: number;
  final_trust: number;
  termination_reason: string;
  actions: ActionOutcome[];
  atp_history: number[];
  trust_history: number[];
}

export interface PlaygroundResult {
  config: PlaygroundConfig;
  lives: LifeSummary[];
  total_ticks: number;
  insights: string[];
}

async function runPlaygroundSimulation(config: PlaygroundConfig): Promise<PlaygroundResult> {
  // Path to lib/game directory (canonical location - 4-life owns the game simulations)
  const gameDir = path.join(process.cwd(), "lib", "game");
  const scriptPath = path.join(gameDir, "playground_api.py");

  return new Promise((resolve, reject) => {
    const python = spawn("python3", [scriptPath], {
      cwd: gameDir,
    });

    let stdout = "";
    let stderr = "";

    // Send config as JSON to stdin
    python.stdin.write(JSON.stringify(config));
    python.stdin.end();

    // Collect output
    python.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    python.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${stderr}`));
        return;
      }

      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse result: ${err}`));
      }
    });

    python.on("error", (err) => {
      reject(new Error(`Failed to spawn python: ${err}`));
    });
  });
}

export async function POST(request: Request) {
  try {
    const config: PlaygroundConfig = await request.json();

    // Run simulation
    const result = await runPlaygroundSimulation(config);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Playground API error:", error);
    return NextResponse.json(
      { error: "Simulation failed", details: String(error) },
      { status: 500 }
    );
  }
}
