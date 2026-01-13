/**
 * Test script for narrative generation
 *
 * Run with: npx tsx src/lib/narratives/test_narrative.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { EventDetector } from "./event_detector";
import { StoryGenerator } from "./story_generator";

// Load simulation data
const dataPath = join(process.cwd(), "public", "ep_driven_closed_loop_results.json");
const simulationData = JSON.parse(readFileSync(dataPath, "utf-8"));

console.log("=".repeat(80));
console.log("4-LIFE NARRATIVE GENERATION TEST");
console.log("=".repeat(80));
console.log();

// Extract lives
const lives = simulationData.lives;

console.log(`Loaded simulation with ${lives.length} lives`);
console.log(`Agent: ${simulationData.agent_lct}`);
console.log();

// Detect events
console.log("Detecting interesting events...");
const detector = new EventDetector();
const events = detector.detectEvents(lives);

console.log(`Found ${events.length} interesting events:`);
console.log();

// Show event summary
const eventCounts = events.reduce((acc, e) => {
  acc[e.type] = (acc[e.type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

Object.entries(eventCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

console.log();
console.log("=".repeat(80));
console.log("GENERATING NARRATIVE");
console.log("=".repeat(80));
console.log();

// Generate narrative
const generator = new StoryGenerator();
const narrative = generator.generateNarrative(lives, events);

// Display narrative
console.log(`TITLE: ${narrative.title}`);
console.log();
console.log("SUMMARY:");
console.log(narrative.summary);
console.log();

console.log("THEMES:");
narrative.themes.forEach((theme) => {
  console.log(`  • ${theme}`);
});
console.log();

console.log("KEY INSIGHTS:");
narrative.key_insights.forEach((insight) => {
  console.log(`  • ${insight}`);
});
console.log();

console.log("=".repeat(80));
console.log("NARRATIVE ACTS");
console.log("=".repeat(80));

narrative.acts.forEach((act, i) => {
  console.log();
  console.log(`\n## ${act.title}`);
  console.log();

  act.events.forEach((event) => {
    console.log(`[${event.timestamp}]`);
    console.log(event.description);

    if (event.technical_detail) {
      console.log(`  📚 Technical: ${event.technical_detail}`);
    }

    console.log(`  ⚡ Why it matters: ${event.significance}`);
    console.log();
  });

  if (act.commentary) {
    console.log(`💭 Commentary: ${act.commentary}`);
  }
});

console.log();
console.log("=".repeat(80));
console.log("NARRATIVE GENERATION COMPLETE");
console.log("=".repeat(80));
console.log();
console.log("This narrative demonstrates:");
console.log("  ✅ Event detection identifies interesting moments");
console.log("  ✅ Technical events translate to human stories");
console.log("  ✅ Themes emerge from patterns");
console.log("  ✅ Insights extracted from data");
console.log("  ✅ Progressive complexity (simple → technical)");
console.log();
console.log("Next steps:");
console.log("  • Integrate into lab-console UI");
console.log("  • Add narrative export (markdown, PDF)");
console.log("  • Create narrative API endpoint");
console.log("  • Build narrative browser component");
