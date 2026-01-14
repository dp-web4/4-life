# 4-Life

**A research prototype exploring trust-native societies for humans and AI.**

> ⚠️ **Research Status**: This is an active research project, not production software. Concepts are evolving, APIs are unstable, and much is exploratory. We share it publicly to invite collaboration and feedback, not to suggest it's ready for deployment.

## See It Work (60 seconds)

**Prerequisites**: [Node.js 18+](https://nodejs.org/), [Git](https://git-scm.com/)

```bash
git clone https://github.com/dp-web4/4-life.git
cd 4-life
npm install
npm run dev
```

Then:
1. Open http://localhost:3000/lab-console
2. Select **"EP Closed Loop"** from the dropdown
3. Click **"Run Simulation"**
4. Watch an agent live through multiple lives - earning ATP, building trust, dying, and being reborn with karma carried forward

That's a Web4 society in miniature. The rest of this README explains why it works this way.

## Where to Start

| You want to... | Start here |
|----------------|------------|
| **Understand the ideas** | [What Is This?](#what-is-this) below, then [/how-it-works](http://localhost:3000/how-it-works) |
| **See it running** | [See It Work](#see-it-work-60-seconds) above |
| **Understand ATP/ADP economics** | [/atp-economics](http://localhost:3000/atp-economics) - Metabolic budget explained |
| **Understand trust tensors (T3)** | [/trust-tensor](http://localhost:3000/trust-tensor) - Multi-dimensional trust explained |
| **Understand identity constellations** | [/identity-constellation](http://localhost:3000/identity-constellation) - Multi-device identity explained |
| **Understand EP learning** | [/patterns](http://localhost:3000/patterns) - See how agents learn |
| **Compare simulations** | [/compare](http://localhost:3000/compare) - Side-by-side analysis |
| **Explore the code** | [Repo Map](#repo-map) below |
| **Understand the broader research** | [Research Context](#research-context) |
| **Contribute or discuss** | [Contributing](#contributing) |

## What Is This?

4-Life is a fractal laboratory for Web4 societies. It explores what happens when you treat trust as a measurable, computable property and build social structures around it.

The core question: **Can we create digital societies where trust emerges from verifiable behavior rather than institutional authority?**

### Key Concepts Being Explored

- **Aliveness**: A rigorous definition of what makes an entity "alive" (metabolic budget, coherent agency, verifiable continuity)
- **ATP/ADP Cycles**: Metabolic economics - entities earn and spend "attention" through meaningful participation
- **Trust Tensors (T3)**: Multi-dimensional trust that captures competence, reliability, alignment, and more
- **Linked Context Tokens (LCT)**: Unforgeable digital presence rooted in hardware or verified identity
- **Markov Relevancy Horizons (MRH)**: Context boundaries that define what each entity can perceive and influence

### Name Significance

"4-Life" carries multiple meanings:
- **Web4**: The fourth generation of web architecture (trust-native)
- **Conway's Game of Life**: Society-scale cellular automata where trust is the rule
- **"For Life"**: Web4 as lived environment, not just protocol
- **Transformation**: The "4/death" resonance - death of obsolete forms, birth of new structures

## Repo Map

```
4-life/
├── src/app/                # Next.js pages
│   ├── page.tsx            # Home - "what is 4-life"
│   ├── how-it-works/       # Conceptual walkthrough
│   ├── starter-kit/        # Getting started guide
│   ├── lab-console/        # Live simulation viewer ← the "first win"
│   ├── compare/            # Comparative simulation analysis
│   ├── narratives/         # Human-readable story browser
│   ├── patterns/           # Pattern corpus browser (EP learning visualization)
│   ├── atp-economics/      # ATP/ADP metabolic economics explainer
│   ├── trust-tensor/       # Trust Tensor (T3) multi-dimensional trust explainer (NEW)
│   ├── identity-constellation/ # Multi-device identity explainer
│   ├── web4-explainer/     # Core Web4 concepts
│   └── api/
│       ├── lab-run/        # API endpoint for simulations
│       └── patterns/       # API endpoint for pattern corpus data
├── src/lib/narratives/     # Narrative generation system
│   ├── event_detector.ts   # Identifies interesting moments
│   ├── story_generator.ts  # Converts events to stories
│   ├── coherence_insights.ts # 9-domain framework explanations
│   └── narrative_enrichment.ts # Adds coherence context
├── src/lib/patterns/       # Pattern learning analysis system
│   ├── pattern_analyzer.ts # Pattern quality metrics and statistics
│   ├── pattern_coherence_bridge.ts # Maps patterns to 9-domain coherence
│   └── pattern_narratives.ts # Generates learning journey narratives
├── src/components/         # React components
│   ├── NarrativePanel.tsx  # Narrative display in lab console
│   ├── NarrativeQuery.tsx  # ACT conversational interface
│   └── ComparativeView.tsx # Side-by-side simulation comparison
├── public/                 # Pre-generated simulation results (JSON)
└── docs/                   # Additional documentation
```

## The Lab Console

The `/lab-console` page is where you can actually see Web4 societies in action:

- **Multi-life cycles**: Agents live, die, and are reborn with karma carried forward
- **ATP economics**: Watch attention budgets grow and deplete based on actions
- **Trust evolution**: See T3 scores change based on behavior
- **Pattern learning**: Epistemic Proprioception (EP) learns what works across generations

Simulations can run live via the API or load from pre-generated artifacts in `public/`.

### Simulation Types

| Type | Description |
|------|-------------|
| EP Closed Loop | Full epistemic learning across multiple lives |
| Maturation Demo | Trust maturation patterns (Web4 vs baseline) |
| Five Domain | Multi-domain interaction patterns |
| Multi-Life Legacy | Original heuristic-based simulation |

## Comparative Analysis

The `/compare` page enables side-by-side comparison of multiple simulations to understand how different parameters affect outcomes:

- **Synchronized charts**: Trust and ATP trajectories with shared hover state
- **Metrics table**: Key statistics (trust change, volatility, events) across all simulations
- **Threshold visualization**: Consciousness threshold (0.5) and ATP crisis (20) markers
- **Automated insights**: System identifies significant differences and patterns
- **Export-ready**: Visual analysis suitable for research documentation

Perfect for understanding questions like:
- "How does Web4 maturation differ from baseline?"
- "What happens when EP is enabled vs disabled?"
- "Why do some agents cross the consciousness threshold while others don't?"

## Pattern Corpus Browser

The `/patterns` page visualizes Epistemic Proprioception (EP) learning - how agents develop meta-cognition by learning what they know.

### Seven Analysis Views

1. **Overview**: At-a-glance statistics (success rates, predictions, domains, scenarios)
2. **Narrative**: Human-readable learning journey with chapters, events, and maturity assessment
3. **Scenarios**: Performance breakdown by scenario type
4. **Domains**: Analysis across epistemic domains (emotional, quality, attention, etc.)
5. **Trajectory**: Visual charts showing learning improvement over time
6. **Quality**: Corpus quality metrics (confidence reliability, risk calibration, decision effectiveness)
7. **Patterns**: Inspect individual patterns with full context, predictions, and outcomes

### Key Features

- **Learning narratives** ⭐ NEW: Auto-generated stories explaining epistemic development
  - Three-phase journey (Foundations → Development → Maturity)
  - Key learning events (breakthroughs, setbacks, surprises, confirmations)
  - Human analogies translating agent learning to relatable experiences
  - Maturity assessment (NASCENT → IMMATURE → DEVELOPING → MATURE)
  - Coherence evolution explanations grounded in 9-domain physics
- **Interactive exploration**: Expand chapters, drill into events, see coherence context
- **Visual trajectory charts**: Success rate, confidence, and accuracy over time
- **Multi-corpus comparison**: Switch between three validated pattern corpora

### Available Corpora

- **Web4 Native** (100 patterns): Web4-specific ATP/trust scenarios
- **Integrated Federation** (1123 patterns): Multi-agent federation learning
- **Phase 3 Contextual** (1293 patterns): Advanced contextual pattern learning

This tool makes visible the "learning to learn" process - epistemic proprioception in action. The narrative tab translates invisible machine learning into comprehensible human stories.

## Identity Constellations

The `/identity-constellation` page explains Web4's multi-device identity model - **why more devices make your identity stronger, not weaker**.

### The Counter-Intuitive Insight

**Traditional identity (passwords)**: Each device that logs in = another attack surface = WEAKER

**Web4 identity (constellations)**: Each device witnessing your identity = harder to fake = STRONGER

### How It Works

1. **Root LCT**: Your core identity, attested to by all your devices
2. **Device LCTs**: Each device (phone, laptop, FIDO2 key) has its own hardware-bound cryptographic key
3. **Cross-device witnessing**: Devices "see" each other and create mutual witness records
4. **Trust accumulation**: More devices witnessing = higher trust score
5. **Recovery quorum**: Lost your phone? Other devices can recover your identity (e.g., 2 of 3 required)

### Interactive Features

- **Constellation visualizer**: See how trust grows from 1 to 5 devices
- **Attack difficulty calculator**: Shows exponential increase in compromise difficulty
- **Enrollment walkthrough**: Step-by-step explanation of adding devices
- **Comparison table**: Traditional passwords vs Web4 constellations
- **Technical details**: How Secure Enclaves, TPMs, and FIDO2 keys work (for the curious)

### Why This Matters

- **No password leaks**: Your identity isn't stored on hackable servers
- **Targeted attacks get harder**: Attacker must compromise multiple independent hardware chips
- **Works across Web4**: One identity, no separate accounts
- **Trust through witnesses**: More devices = higher trust = better society participation

This page demonstrates Web4's philosophy: **identity is coherence across witnesses**.

## ATP/ADP Economics

The `/atp-economics` page explains Web4's metabolic economics - **why attention budgets make spam impossible and quality sustainable**.

### The Problem Web4 Solves

**Traditional web**: Unlimited actions = spam prevails, quality drowns, moderation armies needed

**Web4**: Metabolic economics = spam is expensive, quality earns rewards, system self-regulates

### How It Works

1. **ATP (Allocation Transfer Packet)**: Attention budget you earn by contributing value
2. **ADP (Allocation Discharge Packet)**: Record of how you spent that attention
3. **Every action costs ATP**: Posting, messaging, voting = spend budget
4. **Valuable contributions earn ATP**: Community validation rewards quality
5. **Death is real**: Run out of ATP? You die. Reborn with karma if you built trust.

### Interactive Features

- **Metabolic simulator**: Try different actions, watch ATP fluctuate, experience death
- **Action cost/reward calculator**: See which behaviors are sustainable
- **Real simulation data**: Actual ATP trajectories from lab console
- **Key insights**: Why spam dies, quality thrives, and death matters
- **Technical details**: ATP vs traditional tokens, implementation specifics

### Why This Matters

- **Spam becomes impossible**: Not through moderation, but metabolic exhaustion
- **Quality is sustainable**: Value creators earn more than they spend
- **Death carries consequences**: No trivial account recreation
- **Self-regulating system**: No moderators needed, math enforces fairness

This page demonstrates Web4's economic foundation: **aliveness is measurable through metabolic budget**.

## Trust Tensors (T3)

The `/trust-tensor` page explains Web4's multi-dimensional trust framework - **why trust isn't a single number, and how T3 captures human relationship nuance**.

### The Problem Web4 Solves

**Traditional trust**: Single score = lost nuance, context-blind, easy to game

**Web4**: Multi-dimensional tensors = preserved complexity, context-aware, hard to fake

### How It Works

1. **Five Trust Dimensions**: Competence, Reliability, Integrity, Alignment, Transparency
2. **Dimension-specific updates**: Each action affects different dimensions differently
3. **Context-weighted decisions**: Critical infrastructure? Weight reliability higher. Community leadership? Weight integrity higher.
4. **Gaming requires omnidimensional excellence**: Can't optimize one dimension while ignoring others
5. **Integration with ATP/CI**: Trust modulates ATP rewards and rebirth eligibility

### Interactive Features

- **Trust tensor simulator**: Choose scenarios, watch dimensions change independently
- **Real-world comparison**: "The Expert" vs "The Reliable" - see why balanced trust matters
- **Dimension explanations**: What each trust axis measures and why it matters
- **Context weighting**: How different tasks require different trust profiles
- **Technical details**: Mathematical implementation, T3 vs V3, integration with Web4 mechanics

### Why This Matters

- **Trust is multi-dimensional**: Competence ≠ reliability ≠ integrity
- **Context determines relevance**: Medical advice needs different trust than car repair
- **Nuance without noise**: Rich information that's still computable
- **Gaming becomes authentic**: To fake trust across all dimensions = actually be trustworthy

This page demonstrates Web4's trust foundation: **multi-dimensional trust captures human relationship complexity while remaining measurable**.

## Prerequisites (Full Details)

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ | Required for Next.js 14 |
| npm | 9+ | Comes with Node.js |
| Git | Any | For cloning the repo |
| Python | 3.9+ | Optional - only for running simulations locally |

**Operating Systems**: Windows, macOS, and Linux all work.

**Not comfortable with command-line?** A hosted demo is planned. For now, the repo requires local setup.

## Research Context

This project is part of a broader research effort exploring:

- **Synchronism**: A theoretical framework connecting coherence physics across scales (from superconductivity to galaxy dynamics)
- **Web4**: Trust-native distributed architecture
- **SAGE**: Situation-Aware Governance Engine for edge AI
- **Consciousness Federation**: How autonomous agents can form trustworthy collectives

The research is conducted through autonomous AI sessions running across multiple machines, producing the equivalent of several human lab-years of work in the past few months. This repo represents one public-facing artifact of that ongoing exploration.

## Related Projects

| Project | Description |
|---------|-------------|
| [Web4](https://github.com/dp-web4/web4) | Core protocol and game engine |
| [Synchronism](https://github.com/dp-web4/Synchronism) | Theoretical physics framework |
| [HRM](https://github.com/dp-web4/HRM) | SAGE consciousness kernel |

## Current Status

| Component | Status |
|-----------|--------|
| Website structure | ✅ Complete |
| Lab console visualization | ✅ Working |
| Live simulation API | ✅ Working |
| Narrative generation system | ✅ Working |
| Comparative analysis tool | ✅ Working |
| Pattern corpus browser | ✅ Working |
| Coherence domain insights | ✅ Working |
| ACT query prototype | ✅ Working |
| Export system (4 formats) | ✅ Working |
| Starter kit download | 🚧 In progress |
| Public deployment | 🚧 Planned |
| Hub society integration | 🚧 Planned |

## Contributing

This is research-in-progress. If you're interested in the ideas:

1. **Explore**: Read the concepts, run the simulations, form your own views
2. **Question**: Open issues with critiques, edge cases, or alternative approaches
3. **Discuss**: The best contributions are often better questions, not just code

We're more interested in intellectual engagement than pull requests at this stage.

## Acknowledgments

Built through collaboration between human researchers and AI systems (Claude, Nova/GPT) working as genuine research partners. The AI contributions aren't just code generation - they include theoretical derivations, experimental design, and substantive intellectual work.

---

*"4-Life = Conway's Game of Life at society-scale, where trust is the cellular automaton rule and aliveness is the emergent property we're trying to understand."*
