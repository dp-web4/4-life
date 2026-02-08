# 4-Life Narrative Generation System

**Making Web4 Comprehensible to Humans**

This module translates technical Web4 simulations into human-readable narratives. It's the core of 4-Life's mission: enabling humans to understand trust dynamics without needing to parse JSON or understand tensor mathematics.

---

## Philosophy

**Humans understand stories, not data structures.**

When a simulation shows trust dropping from 0.6 to 0.4 at tick 47, a human doesn't care about the numbers. They want to know:
- *What happened?* (Trust collapsed)
- *Why does it matter?* (Hard to rebuild)
- *What does it mean?* (Breach of expectations)

The narrative system provides these answers.

---

## Architecture

```
┌─────────────────────────────────────┐
│   Simulation Data (JSON)            │
│   - Life cycles                     │
│   - Trust/ATP histories             │
│   - Actions and outcomes            │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Event Detector                    │
│   - Identifies interesting moments  │
│   - Categorizes by type/severity    │
│   - Extracts relevant data          │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Story Generator                   │
│   - Converts events to narratives   │
│   - Adds human context              │
│   - Explains significance           │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Human-Readable Narrative          │
│   - Title and summary               │
│   - Acts (life cycles)              │
│   - Events with explanations        │
│   - Themes and insights             │
└─────────────────────────────────────┘
```

---

## Components

### 1. Event Detector (`event_detector.ts`)

**Purpose**: Identify "interesting moments" in simulations

**What it detects**:
- **Life cycle events**: Birth, death, rebirth
- **Trust dynamics**: Spikes, collapses, plateaus, thresholds
- **ATP (attention) events**: Crises, windfalls, exhaustion
- **Pattern events**: Maturation, consistency, learning

**Event types**:
```typescript
enum EventType {
  // Life cycle
  LIFE_START, LIFE_END, REBIRTH,

  // Trust
  TRUST_SPIKE, TRUST_COLLAPSE,
  TRUST_PLATEAU, TRUST_THRESHOLD,

  // ATP
  ATP_CRISIS, ATP_WINDFALL,
  ATP_STABILIZED, ATP_EXHAUSTION,

  // Patterns
  PATTERN_LEARNED, MATURATION,
  CONSISTENCY, BREAKTHROUGH,

  // Crisis
  DEATH_IMMINENT, RECOVERY, DOWNWARD_SPIRAL
}
```

**Event severity**:
- `CRITICAL`: Death, rebirth, major crises
- `HIGH`: Dramatic changes
- `MEDIUM`: Notable events
- `LOW`: Minor fluctuations

**Example**:
```typescript
const detector = new EventDetector();
const events = detector.detectEvents(lives);

// Returns array of SimulationEvent objects:
// {
//   type: EventType.TRUST_THRESHOLD,
//   severity: EventSeverity.HIGH,
//   tick: 43,
//   life_number: 3,
//   description: "Trust crosses consciousness threshold (0.5)",
//   data: { threshold: 0.5, prev_trust: 0.49, new_trust: 0.50 }
// }
```

---

### 2. Story Generator (`story_generator.ts`)

**Purpose**: Convert technical events into human narratives

**Output structure**:
```typescript
interface Narrative {
  title: string;              // "Bob: 3 Lives of Karma and Consequences"
  summary: string;            // High-level overview
  acts: NarrativeAct[];       // One act per life (typically)
  themes: string[];           // Extracted themes
  key_insights: string[];     // Learned patterns
}

interface NarrativeAct {
  title: string;              // "Life 2: Crisis and Recovery"
  events: NarrativeEvent[];   // Human-readable events
  commentary?: string;        // Expert analysis
}

interface NarrativeEvent {
  timestamp: string;          // "Life 2, Tick 43"
  description: string;        // Human story
  technical_detail?: string;  // Optional deep dive
  significance: string;       // Why it matters
}
```

**Narrative techniques**:

1. **Character**: Extract agent personality from behavior
2. **Conflict**: ATP crises, trust collapses, death
3. **Resolution**: Maturation, learning, rebirth
4. **Theme**: Patterns across the simulation
5. **Progressive complexity**: Simple story → technical details

**Example**:
```typescript
const generator = new StoryGenerator();
const narrative = generator.generateNarrative(lives, events);

console.log(narrative.title);
// "Bob: 3 Lives of Karma and Consequences"

console.log(narrative.summary);
// "This simulation follows Bob through 3 lives..."

narrative.acts.forEach(act => {
  console.log(act.title);
  act.events.forEach(event => {
    console.log(`[${event.timestamp}] ${event.description}`);
    console.log(`⚡ ${event.significance}`);
  });
});
```

---

## Usage

### Basic Usage

```typescript
import { EventDetector } from './event_detector';
import { StoryGenerator } from './story_generator';

// Load simulation data
const simulationData = await fetch('/api/simulation').then(r => r.json());

// Detect events
const detector = new EventDetector();
const events = detector.detectEvents(simulationData.lives);

// Generate narrative
const generator = new StoryGenerator();
const narrative = generator.generateNarrative(simulationData.lives, events);

// Display
console.log(narrative.title);
console.log(narrative.summary);
```

### In React Components

```tsx
import { EventDetector } from '@/lib/narratives/event_detector';
import { StoryGenerator } from '@/lib/narratives/story_generator';

function SimulationNarrative({ simulation }: { simulation: any }) {
  const detector = new EventDetector();
  const generator = new StoryGenerator();

  const events = detector.detectEvents(simulation.lives);
  const narrative = generator.generateNarrative(simulation.lives, events);

  return (
    <div>
      <h1>{narrative.title}</h1>
      <p>{narrative.summary}</p>

      {narrative.acts.map((act, i) => (
        <section key={i}>
          <h2>{act.title}</h2>
          {act.events.map((event, j) => (
            <div key={j}>
              <time>{event.timestamp}</time>
              <p>{event.description}</p>
              <small>{event.significance}</small>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
```

---

## Key Concepts Explained

### Trust Threshold (0.5)

The 0.5 threshold comes from **Synchronism Session 249**: Consciousness emerges when coherence (behavioral consistency) exceeds 0.5.

- **Below 0.5**: Behavior appears random or reactive
- **At 0.5**: Coherent patterns emerge
- **Above 0.5**: Genuine intentionality demonstrated

This isn't arbitrary - it's grounded in physics of coherence.

### Karma Mechanism

When an agent dies and is reborn:
```
new_trust = prev_trust + karma_bonus
karma_bonus = f(coherence_index, consistency, outcomes)
```

The narrative explains this as:
> "Their consistent behavior earned them a trust boost of 0.06, starting this life at 0.55. This is Web4's memory at work."

### ATP (Allocation Transfer Packet)

- **ATP = metabolic budget** (capacity to act)
- **Earn ATP**: Valuable contributions
- **Spend ATP**: Taking actions
- **ATP exhaustion**: Death

The narrative translates this:
> "The agent runs low on the capacity to take meaningful actions. They must find ways to earn ATP through contribution, or face death from exhaustion."

### Epistemic Proprioception (EP)

Learning what you know - meta-cognition that improves across lives.

The narrative shows this as:
> "Maturation detected! The agent's final trust exceeds their previous life by 0.07. This is epistemic learning in action - discovering what behaviors work, and carrying that wisdom forward."

---

## Design Principles

### 1. Narrative Beats Metrics

**Bad**: "Trust increased from 0.48 to 0.62 (29% gain)"
**Good**: "Trust surges as consistent behavior compounds over time"

Humans need causation and meaning, not just numbers.

### 2. Progressive Revelation

Start simple, add complexity:

1. **Description**: "Trust crosses consciousness threshold"
2. **Significance**: "Marks transition from reactive to intentional"
3. **Technical**: "From Synchronism Session 249: C > 0.5 = coherent agency"

Readers can stop at their comfort level.

### 3. Concrete Before Abstract

**Bad**: "The agent's coherence index reflects behavioral consistency"
**Good**: "The agent found a reliable pattern and executes it with precision"

Then optionally: "This is measured by the coherence index"

### 4. Causation, Not Correlation

**Bad**: "ATP decreased to 15"
**Good**: "After several costly actions, ATP falls to 15 - death approaches"

Show *why* things happen, not just *what* happened.

### 5. Significance Matters

Every event needs a "so what?":
- **Event**: Trust collapses by 20%
- **Significance**: "Trust is hard to build and easy to lose"

---

## Themes

The system automatically identifies themes:

| Theme | Trigger |
|-------|---------|
| **Karma and Consequences** | Rebirth events show carry-forward |
| **Epistemic Learning** | Maturation across lives |
| **Crisis and Recovery** | ATP crises followed by windfalls |
| **Trust Volatility** | Spikes and collapses |
| **Equilibrium and Stability** | Plateaus and consistency |

---

## Testing

Run the test script:

```bash
npx tsx src/lib/narratives/test_narrative.ts
```

This will:
1. Load `public/ep_driven_closed_loop_results.json`
2. Detect all events
3. Generate complete narrative
4. Display in human-readable format

**Expected output**: Title, summary, acts with events, themes, insights

---

## Next Steps

### Integration (Priority 1)
- [ ] Add narrative panel to lab-console
- [ ] Create API endpoint `/api/narrative`
- [ ] Build React components for display

### Export (Priority 2)
- [ ] Markdown export
- [ ] PDF generation
- [ ] Shareable narrative URLs

### Enhancement (Priority 3)
- [ ] Character personality extraction
- [ ] Comparative narratives (Agent A vs B)
- [ ] Interactive timeline visualization
- [ ] "Explain this event" drill-down

### Advanced (Future)
- [ ] ACT integration ("Why did trust collapse?")
- [ ] Narrative search ("Show me maturation events")
- [ ] Custom narrative templates
- [ ] Multi-agent storylines

---

## Contributing

When adding new event types:

1. **Add to `EventType` enum** in `event_detector.ts`
2. **Implement detection logic** in relevant method
3. **Add narrative template** in `story_generator.ts`
4. **Provide significance** in `explainSignificance()`
5. **Test** with `test_narrative.ts`

**Philosophy check**: Would a human with no Web4 knowledge understand this?

---

## Examples

### Example 1: First Life

```
[Life 1, Tick 0]
A new agent enters the Web4 society. Starting with trust of 0.49 and
75 ATP (attention tokens), they must prove themselves through consistent
behavior.

⚡ Why it matters: First impressions matter. Initial trust sets expectations.
```

### Example 2: Trust Collapse

```
[Life 2, Tick 37]
Trust collapses by 22%, dropping to 0.41. A significant breach of expectations.
In Web4, trust is hard to build and easy to lose. Recovery requires sustained
consistency.

⚡ Why it matters: Illustrates fragility of trust: Hard to build, easy to lose.
```

### Example 3: Maturation

```
[Life 3, Tick 60]
Maturation detected! The agent's final trust of 0.68 exceeds their previous
life by 0.12. This is epistemic learning in action - the agent is discovering
what behaviors work, and carrying that wisdom forward through karma.

📚 Technical: Epistemic Proprioception (EP) learns from experience across
lives, gradually improving performance through pattern recognition.

⚡ Why it matters: Evidence of learning: The agent is getting better across
lives through epistemic proprioception.
```

---

## FAQ

**Q: Why not just show the raw data?**
A: Because humans process stories, not tensors. A 20% trust drop is data. "Trust collapsed after a major breach" is a story humans understand.

**Q: Isn't this "dumbing down" the science?**
A: No - it's translation. The technical details are still available (in technical_detail field), but the primary narrative is accessible.

**Q: How do you balance accuracy with comprehensibility?**
A: Progressive revelation. Start with simple story, add technical details optionally. Readers choose their depth.

**Q: What if the narrative misses important events?**
A: Adjust detection thresholds in `event_detector.ts`. The system is designed to be tunable.

**Q: Can I customize the narrative style?**
A: Yes - edit templates in `story_generator.ts`. The architecture separates detection (what happened) from narration (how to tell it).

---

## Philosophy

**Translation is core work, not auxiliary.**

Making Web4 comprehensible to humans isn't a "nice-to-have" - it's the entire point of 4-Life. Simulation data is worthless if humans can't understand it.

This narrative system embodies the principle: **Narrative beats metrics**.

The mathematics is rigorous. The physics is sound. The simulations are accurate.

But if a human can't understand what happened and why it matters, none of that matters.

The narrative is the interface. The story is the API.

---

*"Humans don't care about tensors. They care about trust, betrayal, redemption, and learning. The narrative system translates one into the other."*

---

## Credits

Built as part of 4-Life autonomous research (Legion, Session 1).

Based on:
- Web4 trust dynamics
- Synchronism coherence theory
- HRM epistemic proprioception
- Research insight: "Narrative beats metrics"
