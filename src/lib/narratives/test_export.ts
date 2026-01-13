#!/usr/bin/env tsx

/**
 * Test narrative export functionality
 */

import * as fs from 'fs';
import * as path from 'path';
import { EventDetector } from './event_detector';
import { StoryGenerator } from './story_generator';
import { NarrativeExporter, ExportFormat } from './narrative_exporter';

const SIMULATION_PATH = path.join(process.cwd(), 'public', 'ep_driven_closed_loop_results.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'narratives');

console.log('='.repeat(80));
console.log('4-LIFE NARRATIVE EXPORT TEST');
console.log('='.repeat(80));
console.log('');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
  console.log('');
}

// Load simulation data
const simulationData = JSON.parse(fs.readFileSync(SIMULATION_PATH, 'utf-8'));
console.log(`Loaded simulation with ${simulationData.lives.length} lives`);
console.log(`Agent: ${simulationData.lives[0]?.agent_id || 'unknown'}`);
console.log('');

// Detect events
const detector = new EventDetector();
const events = detector.detectEvents(simulationData.lives);
console.log(`Detected ${events.length} events`);
console.log('');

// Generate narrative
const generator = new StoryGenerator();
const narrative = generator.generateNarrative(simulationData.lives, events);
console.log(`Generated narrative: "${narrative.title}"`);
console.log('');

// Export in all formats
const exporter = new NarrativeExporter();

const formats = [
  { format: ExportFormat.MARKDOWN, name: 'Markdown', ext: 'md' },
  { format: ExportFormat.JSON, name: 'JSON', ext: 'json' },
  { format: ExportFormat.PLAIN_TEXT, name: 'Plain Text', ext: 'txt' },
  { format: ExportFormat.HTML, name: 'HTML', ext: 'html' }
];

console.log('Exporting in all formats...');
console.log('');

formats.forEach(({ format, name, ext }) => {
  const content = exporter.export(narrative, { format });
  const filename = `bob-3-lives-${format}.${ext}`;
  const filepath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(filepath, content);

  const sizeKB = (content.length / 1024).toFixed(2);
  console.log(`  ✅ ${name.padEnd(15)} → ${filename} (${sizeKB} KB)`);
});

console.log('');
console.log('='.repeat(80));
console.log('EXPORT TEST COMPLETE');
console.log('='.repeat(80));
console.log('');
console.log(`Output directory: ${OUTPUT_DIR}`);
console.log('');
console.log('Test each format:');
console.log('');
console.log(`  Markdown:    cat ${path.join(OUTPUT_DIR, 'bob-3-lives-markdown.md')}`);
console.log(`  JSON:        cat ${path.join(OUTPUT_DIR, 'bob-3-lives-json.json')}`);
console.log(`  Plain Text:  cat ${path.join(OUTPUT_DIR, 'bob-3-lives-text.txt')}`);
console.log(`  HTML:        open ${path.join(OUTPUT_DIR, 'bob-3-lives-html.html')}`);
console.log('');

// Test export options
console.log('Testing export options...');
console.log('');

const minimalContent = exporter.export(narrative, {
  format: ExportFormat.MARKDOWN,
  includeTechnicalDetails: false,
  includeCommentary: false,
  includeMetadata: false
});

const minimalFilepath = path.join(OUTPUT_DIR, 'bob-3-lives-minimal.md');
fs.writeFileSync(minimalFilepath, minimalContent);

const fullSize = (exporter.export(narrative, { format: ExportFormat.MARKDOWN }).length / 1024).toFixed(2);
const minimalSize = (minimalContent.length / 1024).toFixed(2);

console.log(`  ✅ Full narrative:     ${fullSize} KB`);
console.log(`  ✅ Minimal narrative:  ${minimalSize} KB (${((minimalContent.length / exporter.export(narrative, { format: ExportFormat.MARKDOWN }).length) * 100).toFixed(0)}% of full)`);
console.log('');

console.log('='.repeat(80));
console.log('All exports successful!');
console.log('='.repeat(80));
console.log('');
console.log('Next steps:');
console.log('  • Integrate export into NarrativePanel component');
console.log('  • Add download buttons to lab-console UI');
console.log('  • Create standalone narrative viewer page');
console.log('  • Add share via GitHub Gist functionality');
console.log('');
