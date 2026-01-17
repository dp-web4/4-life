import { NextResponse } from "next/server";

import { spawn } from "child_process";
import * as fs from "fs/promises";
import * as path from "path";

export const runtime = "nodejs";

type Action = "read" | "run";

type Kind =
  | "ep_driven_closed_loop"
  | "maturation_demo"
  | "ep_five_domain"
  | "multi_life_with_policy"
  | "one_life_with_policy";

function isKind(value: string | null): value is Kind {
  return (
    value === "ep_driven_closed_loop" ||
    value === "maturation_demo" ||
    value === "ep_five_domain" ||
    value === "multi_life_with_policy" ||
    value === "one_life_with_policy"
  );
}

function getAction(value: string | null): Action {
  return value === "run" ? "run" : "read";
}

type ParseIntOpts = { defaultValue: number; min: number; max: number };

function parseIntParam(value: string | null, opts: ParseIntOpts): number {
  const n = value == null ? NaN : Number.parseInt(value, 10);
  if (!Number.isFinite(n)) return opts.defaultValue;
  return Math.max(opts.min, Math.min(opts.max, n));
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function readJsonFile(filePath: string): Promise<any> {
  const text = await fs.readFile(filePath, "utf8");
  return JSON.parse(text);
}

type RunPythonOpts = {
  cwd: string;
  args: string[];
  timeoutMs: number;
};

// Try python3 first (Linux/WSL), then python (Windows)
async function findPythonCommand(): Promise<string> {
  const candidates = ["python3", "python"];
  for (const cmd of candidates) {
    try {
      const result = await new Promise<boolean>((resolve) => {
        const child = spawn(cmd, ["--version"], { windowsHide: true });
        child.on("error", () => resolve(false));
        child.on("close", (code) => resolve(code === 0));
      });
      if (result) return cmd;
    } catch {
      // continue
    }
  }
  throw new Error("Python not found. Tried: python3, python. Please ensure Python is installed and in PATH.");
}

function runPython(
  opts: RunPythonOpts & { pythonCmd: string }
): Promise<{ stdout: string; stderr: string; exitCode: number | null }> {
  return new Promise((resolve, reject) => {
    const child = spawn(opts.pythonCmd, opts.args, {
      cwd: opts.cwd,
      windowsHide: true,
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    const killTimer = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // ignore
      }
    }, opts.timeoutMs);

    child.stdout.on("data", (d: Buffer) => {
      stdout += d.toString();
    });

    child.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
    });

    child.on("error", (err) => {
      clearTimeout(killTimer);
      reject(err);
    });

    child.on("close", (code) => {
      clearTimeout(killTimer);
      if (code !== 0) {
        reject(
          new Error(
            `python exited with code ${code}. stderr: ${stderr.slice(0, 2000)}`
          )
        );
        return;
      }
      resolve({ stdout, stderr, exitCode: code });
    });
  });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const kindParam = url.searchParams.get("kind");
    if (!isKind(kindParam)) {
      return NextResponse.json(
        {
          error: "Invalid kind",
          allowed: [
            "ep_driven_closed_loop",
            "maturation_demo",
            "ep_five_domain",
            "multi_life_with_policy",
            "one_life_with_policy",
          ],
        },
        { status: 400 }
      );
    }

    const action = getAction(url.searchParams.get("action"));

    const projectRoot = process.cwd();
    // Game scripts are in lib/game (canonical location - 4-life owns the simulations)
    const gameDir = path.join(projectRoot, "lib", "game");
    const publicDir = path.join(projectRoot, "public");
    await ensureDir(publicDir);

    const timeoutMs = parseIntParam(url.searchParams.get("timeout_ms"), {
      defaultValue: 60_000,
      min: 5_000,
      max: 5 * 60_000,
    });

    const numLives = parseIntParam(url.searchParams.get("num_lives"), {
      defaultValue: 3,
      min: 1,
      max: 50,
    });

    const ticks = parseIntParam(url.searchParams.get("ticks"), {
      defaultValue: 20,
      min: 1,
      max: 500,
    });

    const patternSource = (url.searchParams.get("pattern_source") || "web4").toLowerCase();
    const safePatternSource =
      patternSource === "web4" || patternSource === "none" || patternSource === "thor"
        ? patternSource
        : "web4";

    // Build artifact config (pythonCmd resolved lazily only if needed)
    let pythonCmd: string | null = null;
    const getPythonCmd = async () => {
      if (!pythonCmd) pythonCmd = await findPythonCommand();
      return pythonCmd;
    };

    const artifactByKind: Record<Kind, { publicName: string; runner: () => Promise<any> }> = {
      ep_driven_closed_loop: {
        publicName: "ep_driven_closed_loop_results.json",
        runner: async () => {
          const cmd = await getPythonCmd();
          const outFile = path.join(gameDir, "ep_driven_closed_loop_results.json");
          await runPython({ pythonCmd: cmd, cwd: gameDir, args: [path.join(gameDir, "run_ep_driven_closed_loop.py")], timeoutMs });
          return readJsonFile(outFile);
        },
      },
      maturation_demo: {
        publicName: `maturation_demo_results_${safePatternSource}.json`,
        runner: async () => {
          const cmd = await getPythonCmd();
          const outFile = path.join(gameDir, `maturation_demo_results_${safePatternSource}.json`);
          await runPython({ pythonCmd: cmd, cwd: gameDir, args: [path.join(gameDir, "run_maturation_demo.py"), safePatternSource], timeoutMs });
          return readJsonFile(outFile);
        },
      },
      ep_five_domain: {
        publicName: "ep_five_domain_multi_life_results.json",
        runner: async () => {
          const cmd = await getPythonCmd();
          const outFileName = "ep_five_domain_multi_life_results.json";
          const outFile = path.join(gameDir, outFileName);
          await runPython({
            pythonCmd: cmd,
            cwd: gameDir,
            args: [
              path.join(gameDir, "ep_five_domain_multi_life.py"),
              "--lives",
              String(numLives),
              "--ticks",
              String(ticks),
              "--output",
              outFileName,
            ],
            timeoutMs,
          });
          return readJsonFile(outFile);
        },
      },
      multi_life_with_policy: {
        publicName: "multi_life_with_policy.json",
        runner: async () => {
          const cmd = await getPythonCmd();
          const { stdout } = await runPython({ pythonCmd: cmd, cwd: gameDir, args: [path.join(gameDir, "run_multi_life_with_policy.py")], timeoutMs });
          return JSON.parse(stdout);
        },
      },
      one_life_with_policy: {
        publicName: "one_life_with_policy.json",
        runner: async () => {
          const cmd = await getPythonCmd();
          const { stdout } = await runPython({ pythonCmd: cmd, cwd: gameDir, args: [path.join(gameDir, "run_one_life_with_policy.py")], timeoutMs });
          return JSON.parse(stdout);
        },
      },
    };

    const artifact = artifactByKind[kindParam];
    const publicPath = path.join(publicDir, artifact.publicName);

    if (action === "read") {
      try {
        const data = await readJsonFile(publicPath);
        return NextResponse.json(data, {
          headers: {
            "x-web4-lab-kind": kindParam,
            "x-web4-lab-source": "public-cache",
          },
        });
      } catch {
        return NextResponse.json(
          {
            error: "Artifact not found. Run with action=run to generate it.",
            kind: kindParam,
            expected_public_path: artifact.publicName,
          },
          { status: 404 }
        );
      }
    }

    const data = await artifact.runner();
    await fs.writeFile(publicPath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json(data, {
      headers: {
        "x-web4-lab-kind": kindParam,
        "x-web4-lab-source": "ran-python",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Failed to run lab script",
        details: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
