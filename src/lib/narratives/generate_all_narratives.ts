#!/usr/bin/env tsx

/**
 * Generate All Narratives
 *
 * Processes all simulation result files and generates narratives with
 * differentiated titles based on simulation type. Outputs to public/narratives/.
 *
 * Run: npx tsx src/lib/narratives/generate_all_narratives.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { EventDetector, type LifeRecord, type SimulationEvent } from './event_detector';
import { StoryGenerator, type Narrative } from './story_generator';
import { NarrativeExporter, ExportFormat } from './narrative_exporter';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'narratives');

// ============================================================================
// Simulation type metadata for differentiated narratives
// ============================================================================

interface SimulationConfig {
  file: string;
  id: string;
  type: string;
  titleOverride?: (agentName: string, themes: string[]) => string;
  summaryPrefix?: string;
  extraThemes?: string[];
}

const SIMULATIONS: SimulationConfig[] = [
  {
    file: 'ep_driven_closed_loop_results.json',
    id: 'ep-driven-closed-loop',
    type: 'EP Closed-Loop',
    titleOverride: (name, themes) =>
      `${name}: EP-Driven Closed Loop — Learning Through Action`,
    summaryPrefix: 'This EP-driven closed-loop simulation demonstrates how an agent learns by proposing actions, observing outcomes, and refining its epistemic patterns.',
    extraThemes: ['Closed-Loop Learning'],
  },
  {
    file: 'ep_five_domain_multi_life_results.json',
    id: 'ep-five-domain-multi-life',
    type: 'Five-Domain EP',
    titleOverride: (name, themes) =>
      `${name}: Five Domains of Knowing — Emotional, Quality, Attention, Grounding, Authorization`,
    summaryPrefix: 'This five-domain simulation assesses an agent across all EP dimensions: emotional regulation, quality judgment, attention management, grounding verification, and authorization awareness.',
    extraThemes: ['Multi-Domain Assessment'],
  },
  {
    file: 'maturation_demo_results_web4.json',
    id: 'maturation-web4',
    type: 'Maturation (Web4 Patterns)',
    titleOverride: (name, themes) =>
      `${name}: Maturation with Web4 Patterns — From Immature to Wise`,
    summaryPrefix: 'This maturation demo uses the Web4-native pattern corpus (100 patterns from Session 116) to guide agent development from IMMATURE through LEARNING to MATURE.',
    extraThemes: ['Pattern-Guided Growth', 'Web4 Native Corpus'],
  },
  {
    file: 'maturation_demo_results_none.json',
    id: 'maturation-none',
    type: 'Maturation (No Patterns)',
    titleOverride: (name, themes) =>
      `${name}: Maturation Without Patterns — Heuristic-Only Baseline`,
    summaryPrefix: 'This baseline maturation demo runs with NO pre-existing pattern corpus. The agent must learn purely through heuristic-driven trial and error — no inherited wisdom.',
    extraThemes: ['Baseline Comparison', 'Heuristic Only'],
  },
  {
    file: 'multi_life_with_policy.json',
    id: 'multi-life-policy',
    type: 'Multi-Life Policy',
    titleOverride: (name, themes) =>
      `${name}: Multi-Life Policy Framework — Trust Across Reincarnations`,
    summaryPrefix: 'This multi-life simulation tests the policy integration framework, showing how agent decisions carry consequences across life cycles through karma mechanics.',
    extraThemes: ['Policy Framework'],
  },
  {
    file: 'one_life_with_policy.json',
    id: 'one-life-policy',
    type: 'Single-Life Policy',
    titleOverride: (name, themes) =>
      `${name}: A Single Life in Web4 — Trust Under Pressure`,
    summaryPrefix: 'This single-life simulation tests how an agent performs within a single lifetime, without the safety net of karma carry-forward or rebirth.',
    extraThemes: ['Single Life', 'No Rebirth'],
  },
];

// ============================================================================
// Processing
// ============================================================================

console.log('='.repeat(80));
console.log('4-LIFE NARRATIVE GENERATION');
console.log('='.repeat(80));
console.log('');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const detector = new EventDetector();
const generator = new StoryGenerator();
const exporter = new NarrativeExporter();

interface NarrativeIndexEntry {
  id: string;
  title: string;
  filename: string;
  type: string;
  themes: string[];
  lives: number;
  events: number;
  timestamp: string;
  source_simulation: string;
  summary: string;
}

const index: NarrativeIndexEntry[] = [];

for (const sim of SIMULATIONS) {
  const filePath = path.join(PUBLIC_DIR, sim.file);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipping ${sim.id}: ${sim.file} not found`);
    continue;
  }

  console.log(`  Processing: ${sim.id} (${sim.type})`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Extract lives - handle different simulation output formats
    let rawLives: any[] = [];
    if (Array.isArray(data.lives)) {
      rawLives = data.lives;
    } else if (data.multi_life?.lives) {
      rawLives = data.multi_life.lives;
    } else if (data.life_records) {
      rawLives = data.life_records;
    } else if (data.results?.lives) {
      rawLives = data.results.lives;
    } else if (data.life_summary) {
      // Single-life format - synthesize a life record
      const summary = data.life_summary;
      rawLives = [{
        life_id: summary.life_id || 'life:single',
        agent_lct: summary.agent_lct || 'lct:web4:agent:unknown',
        start_tick: 0,
        end_tick: summary.duration_ticks || summary.ticks || 20,
        life_state: summary.state || 'completed',
        termination_reason: summary.termination_reason || 'natural',
        t3_history: summary.t3_history || [],
        atp_history: summary.atp_history || [],
      }];
    }

    // Normalize life records to expected format
    const lives: LifeRecord[] = rawLives.map((raw: any, i: number) => {
      // Compute start/end ticks if not present
      let startTick = raw.start_tick;
      let endTick = raw.end_tick;
      if (startTick === undefined && endTick === undefined) {
        // Calculate from cumulative duration
        const duration = raw.duration_ticks || raw.t3_history?.length || 20;
        startTick = i === 0 ? 0 : rawLives.slice(0, i).reduce((sum: number, l: any) =>
          sum + (l.duration_ticks || l.t3_history?.length || 20), 0);
        endTick = startTick + duration;
      }

      // Try to extract agent name from life_id if agent_lct missing
      // e.g. "life:lct:web4:agent:alice:0" → "lct:web4:agent:alice"
      let agentLct = raw.agent_lct || data.agent_lct || data.session?.agent_lct;
      if (!agentLct && raw.life_id) {
        const match = raw.life_id.match(/(lct:web4:agent:\w+)/);
        if (match) agentLct = match[1];
      }

      return {
        life_id: raw.life_id || `life:${i + 1}`,
        agent_lct: agentLct || 'lct:web4:agent:agent',
        start_tick: startTick ?? 0,
        end_tick: endTick ?? 20,
        life_state: raw.life_state || raw.state || 'completed',
        termination_reason: raw.termination_reason || 'none',
        t3_history: raw.t3_history || [],
        atp_history: raw.atp_history || [],
      };
    });

    if (lives.length === 0 || lives.every(l => l.t3_history.length === 0)) {
      console.log(`    ⚠️  No usable lives found in ${sim.file}`);
      continue;
    }

    // Detect events
    const events = detector.detectEvents(lives);

    // Generate base narrative
    const narrative = generator.generateNarrative(lives, events);

    // Apply overrides
    if (sim.titleOverride) {
      const agentName = extractAgentName(lives[0].agent_lct);
      narrative.title = sim.titleOverride(agentName, narrative.themes);
    }

    if (sim.summaryPrefix) {
      narrative.summary = sim.summaryPrefix + ' ' + narrative.summary;
    }

    if (sim.extraThemes) {
      for (const theme of sim.extraThemes) {
        if (!narrative.themes.includes(theme)) {
          narrative.themes.push(theme);
        }
      }
    }

    // Export JSON
    const jsonContent = exporter.export(narrative, { format: ExportFormat.JSON });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${sim.id}.json`), jsonContent);

    // Export Markdown
    const mdContent = exporter.export(narrative, { format: ExportFormat.MARKDOWN });
    fs.writeFileSync(path.join(OUTPUT_DIR, `${sim.id}.md`), mdContent);

    // Add to index
    index.push({
      id: sim.id,
      title: narrative.title,
      filename: `${sim.id}.md`,
      type: sim.type,
      themes: narrative.themes,
      lives: lives.length,
      events: events.length,
      timestamp: new Date().toISOString().split('T')[0],
      source_simulation: sim.file,
      summary: narrative.summary.slice(0, 200) + '...',
    });

    console.log(`    ✅ Generated: "${narrative.title}" (${events.length} events, ${lives.length} lives)`);
  } catch (err) {
    console.log(`    ❌ Error processing ${sim.file}: ${err}`);
  }
}

// Write index
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'index.json'),
  JSON.stringify(index, null, 2)
);

console.log('');
console.log(`Generated ${index.length} narratives → ${OUTPUT_DIR}`);
console.log('');
console.log('='.repeat(80));

// ============================================================================
// Utilities
// ============================================================================

function extractAgentName(lct: string): string {
  const parts = lct.split(':');
  const name = parts[parts.length - 1];
  return name.charAt(0).toUpperCase() + name.slice(1);
}
