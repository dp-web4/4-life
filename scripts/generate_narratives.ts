#!/usr/bin/env tsx
/**
 * Batch Narrative Generator
 *
 * Generates human-readable narratives from all simulation JSON files.
 *
 * Usage:
 *   npm run narratives
 *
 * or:
 *   npx tsx scripts/generate_narratives.ts
 *
 * This script:
 * 1. Scans public/ for simulation JSON files
 * 2. Transforms simulation data to LifeRecord format
 * 3. Detects interesting events
 * 4. Generates narrative using StoryGenerator
 * 5. Exports to JSON and Markdown
 * 6. Creates index for narrative browser
 */

import fs from 'fs';
import path from 'path';
import { EventDetector, LifeRecord } from '../src/lib/narratives/event_detector';
import { StoryGenerator, Narrative } from '../src/lib/narratives/story_generator';
import { NarrativeExporter } from '../src/lib/narratives/narrative_exporter';

// ============================================================================
// Types for Simulation Data
// ============================================================================

interface SimulationData {
  agent_lct: string;
  applied_actions?: {
    [life_id: string]: Array<{
      world_tick: number;
      atp_before: number;
      atp_after: number;
      trust_before: number;
      trust_after: number;
      life_id: string;
      [key: string]: any;
    }>;
  };
  lives?: Array<{
    life_id: string;
    life_state: string;
    termination_reason?: string;
    start_tick: number;
    end_tick: number;
    [key: string]: any;
  }>;
  carry_forward?: {
    [life_id: string]: {
      trust_history: number[];
      atp_history: number[];
      [key: string]: any;
    };
  };
  [key: string]: any;
}

interface NarrativeMeta {
  id: string;
  title: string;
  filename: string;
  themes: string[];
  lives: number;
  events: number;
  timestamp: string;
  source_simulation: string;
}

// ============================================================================
// Configuration
// ============================================================================

const PUBLIC_DIR = path.join(__dirname, '../public');
const NARRATIVES_DIR = path.join(PUBLIC_DIR, 'narratives');
const SIMULATION_FILES = [
  'ep_driven_closed_loop_results.json',
  'ep_five_domain_multi_life_results.json',
  'maturation_demo_results_web4.json',
  'maturation_demo_results_none.json',
  'multi_life_with_policy.json',
  'one_life_with_policy.json',
  'trust_network_evolution.json',
];

// ============================================================================
// Simulation Data Transformation
// ============================================================================

/**
 * Transform raw simulation JSON to LifeRecord[] format
 */
function transformSimulationData(data: SimulationData): LifeRecord[] {
  const lives: LifeRecord[] = [];

  // Handle different simulation formats
  if (data.applied_actions && data.carry_forward) {
    // Format: ep_driven_closed_loop_results.json
    const lifeIds = Object.keys(data.applied_actions).sort();

    for (const lifeId of lifeIds) {
      const actions = data.applied_actions[lifeId];
      const carryForward = data.carry_forward[lifeId];

      if (!actions || actions.length === 0) continue;

      // Extract trust and ATP history from actions
      const trustHistory = [actions[0].trust_before, ...actions.map(a => a.trust_after)];
      const atpHistory = [actions[0].atp_before, ...actions.map(a => a.atp_after)];

      const startTick = actions[0].world_tick;
      const endTick = actions[actions.length - 1].world_tick;

      lives.push({
        life_id: lifeId,
        agent_lct: data.agent_lct,
        start_tick: startTick,
        end_tick: endTick,
        life_state: atpHistory[atpHistory.length - 1] === 0 ? 'dead' : 'alive',
        termination_reason: atpHistory[atpHistory.length - 1] === 0 ? 'atp_exhaustion' : 'none',
        t3_history: trustHistory,
        atp_history: atpHistory,
      });
    }
  } else if (data.lives) {
    // Format: trust_network_evolution.json or similar
    for (const life of data.lives) {
      // Try to extract histories from various possible locations
      let trustHistory: number[] = [];
      let atpHistory: number[] = [];

      if (life.trust_history) {
        trustHistory = life.trust_history;
      } else if (life.t3_history) {
        trustHistory = life.t3_history;
      }

      if (life.atp_history) {
        atpHistory = life.atp_history;
      }

      // If no history, create minimal history from start/end values
      if (trustHistory.length === 0 && life.initial_trust !== undefined && life.final_trust !== undefined) {
        trustHistory = [life.initial_trust, life.final_trust];
      }

      if (atpHistory.length === 0 && life.initial_atp !== undefined && life.final_atp !== undefined) {
        atpHistory = [life.initial_atp, life.final_atp];
      }

      // Default values if still missing
      if (trustHistory.length === 0) trustHistory = [0.5, 0.5];
      if (atpHistory.length === 0) atpHistory = [100, 100];

      lives.push({
        life_id: life.life_id,
        agent_lct: data.agent_lct || 'lct:web4:agent:unknown',
        start_tick: life.start_tick || 0,
        end_tick: life.end_tick || (life.start_tick || 0) + 10,
        life_state: life.life_state || 'alive',
        termination_reason: life.termination_reason || 'none',
        t3_history: trustHistory,
        atp_history: atpHistory,
      });
    }
  }

  return lives;
}

// ============================================================================
// Narrative Generation
// ============================================================================

/**
 * Generate narrative from simulation file
 */
function generateNarrativeFromFile(filename: string): { narrative: Narrative; meta: NarrativeMeta } | null {
  console.log(`\n📖 Processing: ${filename}`);

  try {
    // Read simulation data
    const filePath = path.join(PUBLIC_DIR, filename);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const simulationData: SimulationData = JSON.parse(rawData);

    // Transform to LifeRecord format
    const lives = transformSimulationData(simulationData);

    if (lives.length === 0) {
      console.log(`  ⚠️  No lives found in ${filename}, skipping`);
      return null;
    }

    console.log(`  ✓ Found ${lives.length} lives`);

    // Detect events
    const detector = new EventDetector();
    const events = detector.detectEvents(lives);
    console.log(`  ✓ Detected ${events.length} events`);

    // Generate narrative
    const generator = new StoryGenerator();
    const narrative = generator.generateNarrative(lives, events);
    console.log(`  ✓ Generated narrative: "${narrative.title}"`);

    // Create metadata
    const baseFilename = filename.replace('.json', '');
    const narrativeId = baseFilename
      .replace(/_results?/g, '')
      .replace(/_demo/g, '')
      .replace(/_/g, '-');

    const meta: NarrativeMeta = {
      id: narrativeId,
      title: narrative.title,
      filename: `${narrativeId}.md`,
      themes: narrative.themes,
      lives: lives.length,
      events: events.length,
      timestamp: new Date().toISOString().split('T')[0],
      source_simulation: filename,
    };

    return { narrative, meta };
  } catch (error) {
    console.error(`  ❌ Error processing ${filename}:`, error);
    return null;
  }
}

// ============================================================================
// Export Functions
// ============================================================================

/**
 * Save narrative to files (JSON and Markdown)
 */
function saveNarrative(narrative: Narrative, meta: NarrativeMeta): void {
  const exporter = new NarrativeExporter();

  // Export as Markdown
  const markdown = exporter.export(narrative, { format: 'markdown' as any });
  const mdPath = path.join(NARRATIVES_DIR, meta.filename);
  fs.writeFileSync(mdPath, markdown, 'utf-8');
  console.log(`  ✓ Saved Markdown: ${meta.filename}`);

  // Export as JSON (for programmatic access)
  const jsonFilename = meta.filename.replace('.md', '.json');
  const jsonPath = path.join(NARRATIVES_DIR, jsonFilename);
  fs.writeFileSync(jsonPath, JSON.stringify(narrative, null, 2), 'utf-8');
  console.log(`  ✓ Saved JSON: ${jsonFilename}`);
}

/**
 * Create index of all narratives
 */
function createNarrativeIndex(metas: NarrativeMeta[]): void {
  const indexPath = path.join(NARRATIVES_DIR, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(metas, null, 2), 'utf-8');
  console.log(`\n✅ Created narrative index with ${metas.length} entries`);
}

// ============================================================================
// Main
// ============================================================================

function main() {
  console.log('🚀 4-Life Narrative Generator\n');
  console.log('This script generates human-readable narratives from simulation data.');
  console.log('Narratives translate technical trust dynamics into comprehensible stories.\n');

  // Ensure narratives directory exists
  if (!fs.existsSync(NARRATIVES_DIR)) {
    fs.mkdirSync(NARRATIVES_DIR, { recursive: true });
    console.log(`✓ Created directory: ${NARRATIVES_DIR}\n`);
  }

  const allMetas: NarrativeMeta[] = [];
  let successCount = 0;
  let skipCount = 0;

  // Process each simulation file
  for (const filename of SIMULATION_FILES) {
    const filePath = path.join(PUBLIC_DIR, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`\n⚠️  File not found: ${filename}, skipping`);
      skipCount++;
      continue;
    }

    // Generate narrative
    const result = generateNarrativeFromFile(filename);

    if (result) {
      const { narrative, meta } = result;
      saveNarrative(narrative, meta);
      allMetas.push(meta);
      successCount++;
    } else {
      skipCount++;
    }
  }

  // Create index
  if (allMetas.length > 0) {
    createNarrativeIndex(allMetas);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`  ✅ Generated: ${successCount} narratives`);
  console.log(`  ⚠️  Skipped: ${skipCount} files`);
  console.log(`  📁 Output: ${NARRATIVES_DIR}`);
  console.log('='.repeat(60) + '\n');

  console.log('Next steps:');
  console.log('  1. View narratives at http://localhost:3000/narratives');
  console.log('  2. Check generated Markdown files in public/narratives/');
  console.log('  3. Share narratives with humans to test comprehension\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

export { generateNarrativeFromFile, transformSimulationData };
