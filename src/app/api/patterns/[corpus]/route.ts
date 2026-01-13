import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

/**
 * API endpoint for serving EP pattern corpus files
 *
 * Serves pattern corpus JSON files from the web4/game directory for analysis
 * in the Pattern Browser.
 */

const CORPUS_FILES: Record<string, string> = {
  web4_native: "ep_pattern_corpus_web4_native.json",
  integrated_federation: "ep_pattern_corpus_integrated_federation.json",
  phase3_contextual: "ep_pattern_corpus_phase3_contextual.json",
};

export async function GET(
  request: NextRequest,
  { params }: { params: { corpus: string } }
) {
  try {
    const corpus = params.corpus;

    if (!CORPUS_FILES[corpus]) {
      return NextResponse.json(
        { error: "Unknown corpus type" },
        { status: 404 }
      );
    }

    // Pattern corpus files are in web4/game directory (sibling to 4-life)
    const web4GamePath = join(
      process.cwd(),
      "..",
      "web4",
      "game",
      CORPUS_FILES[corpus]
    );

    const fileContents = await readFile(web4GamePath, "utf-8");
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading pattern corpus:", error);
    return NextResponse.json(
      {
        error: "Failed to load pattern corpus",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
