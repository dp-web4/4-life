# 4-Life

**A research prototype exploring trust-native societies for humans and AI.**

🌐 **Live Demo**: [4-life-ivory.vercel.app](https://4-life-ivory.vercel.app/) - Try it now, no setup required

📚 **In-depth Theory & Specs**: [Web4 Repository](https://github.com/dp-web4/web4) - Protocol specs, coherence pricing, trust tensors

> ⚠️ **Research Status**: This is an active research project, not production software. Concepts are evolving, APIs are unstable, and much is exploratory. We share it publicly to invite collaboration and feedback, not to suggest it's ready for deployment.

## See It Work (60 seconds)

> **Note**: Prefer zero setup? Use the **[Live Demo](https://4-life-ivory.vercel.app/)** instead. The instructions below are for local development.

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

**Absolute beginner?** → Start with **[First Contact](http://localhost:3000/first-contact)** - zero to comprehension in 10 minutes ⭐⭐⭐

**New to Web4?** → Then continue to **[Learning Journey](http://localhost:3000/learn)** - a guided pathway from beginner to practitioner

| You want to... | Start here |
|----------------|------------|
| **Never seen Web4 before** | [/first-contact](http://localhost:3000/first-contact) - Interactive 10-minute tutorial (simulation + narrative + concepts) ⭐ **START HERE** |
| **Ask questions conversationally** | [/act-explorer](http://localhost:3000/act-explorer) - Chat with ACT to explore concepts and analyze simulations ✨ **NEW Session #21** |
| **Guided learning path** | [/learn](http://localhost:3000/learn) - Progressive journey from beginner to practitioner ⭐ **RECOMMENDED** |
| **Understand the ideas** | [What Is This?](#what-is-this) below, then [/how-it-works](http://localhost:3000/how-it-works) |
| **See it running** | [See It Work](#see-it-work-60-seconds) above |
| **Experiment with parameters** | [/playground](http://localhost:3000/playground) - Interactive parameter exploration |
| **See trust networks form** | [/trust-networks](http://localhost:3000/trust-networks) - Multi-agent trust dynamics visualized |
| **Understand federation markets** | [/federation-economics](http://localhost:3000/federation-economics) - How ATP markets self-organize |
| **Understand what makes entities "alive"** | [/aliveness](http://localhost:3000/aliveness) - Measurable aliveness criteria (ATP, T3, CI) ✨ NEW |
| **Understand unforgeable identity (LCT)** | [/lct-explainer](http://localhost:3000/lct-explainer) - Hardware-bound identity primitive |
| **Understand ATP/ADP economics** | [/atp-economics](http://localhost:3000/atp-economics) - Metabolic budget explained |
| **Understand trust tensors (T3)** | [/trust-tensor](http://localhost:3000/trust-tensor) - Multi-dimensional trust explained |
| **Understand coherence index (CI)** | [/coherence-index](http://localhost:3000/coherence-index) - Incoherence detection explained |
| **Deep dive: Coherence framework** | [/coherence-framework](http://localhost:3000/coherence-framework) - From 4 CI dimensions to 9 Synchronism domains ✨ NEW |
| **Understand context boundaries (MRH)** | [/markov-relevancy-horizon](http://localhost:3000/markov-relevancy-horizon) - Relationship-based context explained |
| **Understand decision evolution (EP)** | [/decision-evolution](http://localhost:3000/decision-evolution) - How agents learn across lives explained |
| **Understand identity constellations** | [/identity-constellation](http://localhost:3000/identity-constellation) - Multi-device identity explained |
| **Explore pattern learning** | [/patterns](http://localhost:3000/patterns) - Browse EP pattern corpus |
| **Read simulation narratives** | [/narratives](http://localhost:3000/narratives) - Human-readable stories from simulations ✨ **NEW Session #19** |
| **Compare simulations** | [/compare](http://localhost:3000/compare) - Side-by-side analysis |
| **Explore the code** | [Repo Map](#repo-map) below |
| **Understand the broader research** | [Research Context](#research-context) |
| **Contribute or discuss** | [Contributing](#contributing) |

## What Is This?

4-Life is a fractal laboratory for Web4 societies. It explores what happens when you treat trust as a measurable, computable property and build social structures around it.

The core question: **Can we create digital societies where trust emerges from verifiable behavior rather than institutional authority?**

### Key Concepts Being Explored

- **Linked Context Tokens (LCT)**: Unforgeable identity primitive - hardware-bound, witnessed, multi-device digital presence (FOUNDATIONAL - enables everything else)
- **Aliveness**: Measurable existence criteria - ATP > 0 (metabolic), T3 > 0.5 (agency), CI coherent (continuity). Death is real. Rebirth requires trust.
- **ATP/ADP Cycles**: Metabolic economics - entities earn and spend "attention" through meaningful participation
- **Trust Tensors (T3)**: Multi-dimensional trust that captures competence, reliability, alignment, and more
- **Coherence Index (CI)**: Multi-dimensional coherence detection (spatial, temporal, capability, relational) that modulates trust in real-time
- **Markov Relevancy Horizons (MRH)**: Context boundaries defined by relationship graphs - you see what's relevant through your connections

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
│   ├── first-contact/      # Interactive 10-min tutorial (zero to comprehension) ← START HERE (NEW Session #18)
│   ├── act-explorer/       # Conversational interface - ask questions, explore simulations (NEW Session #21)
│   ├── how-it-works/       # Conceptual walkthrough
│   ├── starter-kit/        # Getting started guide
│   ├── playground/         # Interactive parameter exploration (NEW Session #12)
│   ├── lab-console/        # Live simulation viewer
│   ├── compare/            # Comparative simulation analysis
│   ├── narratives/         # Human-readable story browser (NEW Session #19 - production-ready)
│   ├── patterns/           # Pattern corpus browser (EP learning visualization)
│   ├── trust-networks/     # Multi-agent trust dynamics visualization (Session #11)
│   ├── federation-economics/ # Dynamic ATP markets & price signals (Session #13)
│   ├── aliveness/          # Aliveness criteria explainer (ATP, T3, CI integration) (NEW Session #15)
│   ├── lct-explainer/      # Linked Context Token (LCT) identity primitive (Session #14)
│   ├── atp-economics/      # ATP/ADP metabolic economics explainer
│   ├── trust-tensor/       # Trust Tensor (T3) multi-dimensional trust explainer
│   ├── coherence-index/    # Coherence Index (CI) incoherence detection explainer
│   ├── coherence-framework/ # Full coherence framework (4 CI dims → 9 Synchronism domains) (NEW Session #17)
│   ├── markov-relevancy-horizon/ # MRH context boundaries explainer
│   ├── decision-evolution/ # Decision Evolution (EP) learning across lives explainer
│   ├── identity-constellation/ # Multi-device identity explainer
│   ├── web4-explainer/     # Core Web4 concepts
│   └── api/
│       ├── lab-run/        # API endpoint for simulations
│       ├── playground/     # API endpoint for parameter playground (NEW Session #12)
│       └── patterns/       # API endpoint for pattern corpus data
├── src/lib/act/            # ACT conversational interface system (NEW Session #21)
│   └── query_engine.ts     # Pattern-matched query understanding + pre-generated responses
├── src/lib/narratives/     # Narrative generation system (NEW Session #19 - production-ready)
│   ├── event_detector.ts   # Identifies interesting moments
│   ├── story_generator.ts  # Converts events to stories
│   ├── narrative_exporter.ts # Export to Markdown/JSON/HTML
│   ├── coherence_insights.ts # 9-domain framework explanations
│   └── narrative_enrichment.ts # Adds coherence context
├── src/lib/patterns/       # Pattern learning analysis system
│   ├── pattern_analyzer.ts # Pattern quality metrics and statistics
│   ├── pattern_coherence_bridge.ts # Maps patterns to 9-domain coherence
│   └── pattern_narratives.ts # Generates learning journey narratives
├── src/lib/federation/     # Federation economics simulation
│   └── market_simulator.ts # Dynamic ATP pricing based on supply/demand
├── src/lib/types.ts        # Core type definitions (SimulationResult, AgentState, etc.)
├── src/components/         # React components
│   ├── ACTChat.tsx         # Conversational chat UI (NEW Session #21)
│   ├── NarrativePanel.tsx  # Narrative display in lab console
│   ├── NarrativeQuery.tsx  # ACT conversational interface
│   ├── ReasoningTimeline.tsx # Agent decision reasoning visualization
│   ├── DecisionEvolution.tsx # EP learning improvement across lives
│   ├── TrustNetworkVisualization.tsx # Multi-agent trust network graph (Session #11)
│   ├── PlaygroundControls.tsx # Parameter configuration UI (Session #12)
│   ├── PlaygroundResults.tsx # Simulation result visualization (Session #12)
│   ├── FederationMarket.tsx # Dynamic ATP market visualization (NEW Session #13)
│   └── ComparativeView.tsx # Side-by-side simulation comparison
├── public/                 # Pre-generated simulation results (JSON)
│   └── narratives/         # Generated narrative files (Markdown + JSON) (NEW Session #19)
├── scripts/                # Utility scripts
│   └── generate_narratives.ts # Batch narrative generator (NEW Session #19)
└── docs/                   # Additional documentation
    └── NARRATIVE_SYSTEM.md # Complete narrative system documentation (NEW Session #19)
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

## ACT Conversational Explorer (NEW - Session #21)

The `/act-explorer` page provides a **conversational interface to Web4 understanding** - ask questions in natural language, get instant explanations.

### The Core Innovation

**Traditional learning**: Read documentation, search for answers, piece together understanding

**ACT learning**: Ask questions conversationally, get context-aware explanations, follow suggested paths

### How It Works

1. **Pattern-Matched Query Understanding**: ACT recognizes query intent (concept explanation, event analysis, comparison, guidance)
2. **Pre-Generated Responses**: Fast, reliable explanations without LLM latency (pattern matching + templates)
3. **Context-Aware Analysis**: Load simulations to analyze specific events and patterns
4. **Progressive Follow-Ups**: Suggested queries guide you deeper into topics

### Query Types Supported

**Concept Explanations**:
- "What is ATP?" → Metabolic economics explanation
- "Explain trust tensors" → Multi-dimensional trust walkthrough
- "How does karma work?" → Rebirth eligibility + consequences
- "What is epistemic proprioception?" → Meta-cognition learning explanation

**Event Analysis** (requires simulation):
- "Why did trust drop at tick 14?" → Context, decision, outcome breakdown
- "What happened in life 2?" → Life narrative with key events
- "Show me ATP crisis moments" → Critical decision points identified

**Comparisons**:
- "Compare Web4 vs baseline" → Trust evolution, ATP sustainability differences
- "How does EP improve decisions?" → Pattern learning impact analysis

**Exploration Guidance**:
- "What should I explore next?" → Personalized suggestions based on context
- "Where do I start?" → Recommended learning pathways

### Interactive Features

- **Chat Interface**: Natural conversation flow with message history
- **Suggested Queries**: Click to ask follow-up questions
- **Related Concepts**: Explore connected ideas
- **Visualization Hints**: Jump to relevant charts/timelines
- **Quick Actions**: Pre-configured concept queries (ATP, Trust, Karma, etc.)
- **Simulation Loading**: Analyze pre-generated simulations or your own runs

### Why This Matters

- **Conversation beats static docs**: Humans learn better through dialogue
- **Just-in-time learning**: Explain concepts exactly when needed
- **Progressive revelation**: Start simple, build complexity through follow-ups
- **Context-aware**: Explanations adapt to what you're exploring
- **No LLM latency**: Pattern matching + pre-generated responses = instant answers

This page demonstrates Web4's accessibility philosophy: **understanding emerges from conversation, not just reading**.

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

## Parameter Playground (NEW - Session #12)

The `/playground` page enables **interactive parameter exploration** - the lowest-friction pathway to participation in Web4 experimentation.

### The Core Innovation

**Traditional learning**: Read documentation, understand concepts, write code, run simulations
**Playground learning**: Adjust sliders, click "Run", see results instantly - iterate and discover

### How It Works

1. **Adjust Parameters**: Use sliders to configure ATP costs/rewards, trust dynamics, karma mechanics, and behavioral tendencies
2. **Run Simulation**: Execute a multi-life agent cycle with your parameters (results in <1 second)
3. **Explore Results**: View life trajectories, ATP/trust evolution, termination reasons, and auto-generated insights
4. **Iterate & Learn**: Adjust based on results, re-run, discover tipping points and emergent patterns

### Interactive Features

- **16 configurable parameters**: From simulation settings (lives, ticks, risk) to economic mechanics (ATP costs/rewards) to trust dynamics (gain/loss rates)
- **Quick presets**: Easy Mode, Hard Mode, Risk-Averse, Risk-Seeking - instant parameter templates
- **Real-time visualization**: Life trajectory charts, ATP/trust evolution graphs, action success/failure timelines
- **Auto-generated insights**: System identifies interesting patterns ("ATP exhaustion", "High karma rebirth", "Thrived with 0.99 trust!")
- **Summary statistics**: Completion rates, death causes, average trust/ATP across lives

### What You Can Discover

- **Metabolic Balance**: What happens when rewards exceed costs by 2x? 5x? Where's the sustainability threshold?
- **Trust Asymmetry**: Does trust need to be harder to gain than lose? How much asymmetry is optimal?
- **Karma Compression**: Should high-trust rebirths get massive advantages? Or just a head start?
- **Risk vs Reward**: Are risk-averse agents more stable? Do risk-seekers thrive or crash? What's the optimal strategy?
- **Economic Tipping Points**: Which parameter combinations enable indefinite survival? Where does the system collapse?

### Why This Matters

- **No code required**: Experiment with Web4 mechanics without writing a single line
- **Immediate feedback**: Results in seconds, not minutes - rapid iteration enables discovery
- **Parameter sensitivity**: See how small changes cascade into large outcomes
- **Intuition building**: Develop feel for Web4 economics through hands-on play
- **Edge case discovery**: Break things, find tipping points, explore extremes

This page demonstrates Web4's accessibility philosophy: **understanding emerges from participation, not just observation**.

## Federation Economics (NEW - Session #13)

The `/federation-economics` page visualizes **how ATP markets self-organize through dynamic pricing** - demonstrating emergent efficiency without central planning.

### The Core Innovation

**Traditional platforms**: Fixed prices, central resource allocation, inefficient matching of supply and demand

**Web4 federations**: Dynamic ATP pricing responds to scarcity in real-time - high demand + low supply = premium, which signals profit opportunity and guides agent specialization

### How It Works

1. **Track Supply & Demand**: Federation monitors operations requesting each component (demand) and agents specializing in each component (supply)
2. **Calculate Scarcity**: scarcity = demand / supply (high scarcity = premium, low scarcity = discount)
3. **Apply ATP Premium**: Scarce components cost up to 50% more ATP, surplus components get up to 20% discount
4. **Agents Respond**: High premiums signal profit opportunities, agents specialize, supply increases, prices stabilize at equilibrium

### Interactive Features

- **Live market simulation**: Watch ATP prices adjust as supply/demand changes over 50 ticks
- **Component deep-dive**: Click any component to see its market history (price trajectory, supply/demand evolution)
- **Market events**: System detects interesting moments (demand spikes, price surges, equilibrium, supply shocks)
- **Real-world scenarios**: Mobile AI surge, accuracy oversupply, critical infrastructure demand

### What You Can Discover

- **Efficient allocation**: Supply flows to high-demand areas automatically through price signals
- **Emergent specialization**: Agents develop capabilities the market values without being told
- **Self-regulating markets**: No central planner adjusts prices - equilibrium emerges naturally
- **Adaptive to change**: When federation needs shift, markets re-organize automatically

### Why This Matters

- **No central planning**: Markets allocate resources efficiently without authority
- **Comparative advantage**: Agents specialize based on economic incentives, not instructions
- **Real-time adaptation**: Prices respond to scarcity immediately, guiding resource allocation
- **Federation-scale economics**: Shows how autonomous societies coordinate across the network

This page demonstrates Web4's economic foundation: **markets self-organize through price signals, no central authority needed**.

## Trust Networks (Session #11)

The `/trust-networks` page visualizes **how trust relationships form, strengthen, and decay between agents** in a multi-agent society - demonstrating society formation through emergent trust dynamics.

### The Core Innovation

**Traditional social networks**: Relationships are **declared** ("friend" someone, "follow" someone)

**Web4 trust networks**: Relationships are **emergent** (trust forms naturally through behavioral interactions)

### How It Works

1. **Diverse Agent Profiles**: Cooperator, Opportunist, Free-rider, Learner, Maverick - each with different behavioral tendencies
2. **Interaction-Based Trust**: Every agent-to-agent interaction increases or decreases trust
3. **Trust Edge Evolution**: Relationships progress through stages (forming → stable → degrading → broken)
4. **Coalition Emergence**: Groups of mutually-trusting agents form automatically - no declaration needed
5. **Network Self-Organization**: Free-riders get isolated, cooperators form tight-knit groups

### Interactive Features

- **Force-directed graph visualization**: Agents as nodes (size = ATP), trust as edges (color = strength)
- **Timeline scrubber**: Watch trust network evolve tick-by-tick
- **Network metrics**: Density, average trust, strong/broken edges
- **Agent profile indicators**: Visual distinction between behavioral types
- **Coalition highlighting**: See emergent groups form and dissolve

### Why This Matters

- **Society without central authority**: No admin decides who's trustworthy - network self-organizes
- **Reputation cannot be faked**: Bad actors can't escape consequences by creating new accounts
- **Coalitions enable coordination**: Mutually-trusting agents can pool resources, share insurance, govern collectively
- **Trust is the foundation**: All cooperation emerges from verifiable trustworthiness

This page demonstrates Web4's social foundation: **society emerges from trust, not authority**.

## Aliveness (NEW - Session #15)

The `/aliveness` page explains **what makes an entity "alive" in Web4** - the foundational criteria that integrate LCT, ATP, T3, and CI into a cohesive framework.

### The Core Innovation

**Traditional web**: "Alive" is undefined. Account exists = "alive". No consequences for bad behavior (just make a new account).

**Web4 aliveness**: Measurable existence defined by three rigorous criteria that must all be satisfied simultaneously.

### The Three Criteria

1. **Metabolic Budget (ATP > 0)**
   - You must have attention budget to exist
   - Every action costs ATP, valuable contributions earn ATP
   - ATP = 0 means immediate death (no grace period)
   - Only sustainable behaviors survive long-term

2. **Coherent Agency (T3 > 0.5)**
   - You must demonstrate intentional behavior
   - 0.5 is a phase transition point from coherence physics (not arbitrary)
   - Below 0.5 = reactive/random, Above 0.5 = genuine agency
   - Trust Tensor dimensions: competence, reliability, integrity, alignment, transparency

3. **Verifiable Continuity (CI coherent)**
   - You must be consistent across time, space, capability, and relationships
   - Coherence Index tracks four dimensions: spatial, capability, temporal, relational
   - Geometric mean = one weak dimension tanks everything
   - Incoherent behavior severely limits effective trust

### Death and Rebirth

**Death occurs when:**
- ATP reaches 0 (metabolic death - most common)
- CI drops below minimum (coherence death - fraud detected)
- T3 drops below threshold (trust collapse)

**Rebirth eligibility:**
- Only entities with final T3 ≥ 0.5 get reborn
- Society evaluates: "Did you build sufficient trust?"
- If eligible: Reborn with ATP karma + trust reputation + CI history
- If ineligible: Permanent death (society rejects)

**Karma carry-forward:**
- Die with 145 ATP and T3 = 0.72? Reborn with both!
- Good behavior compounds across lives
- Each generation starts stronger than the last
- Bad actors die permanently (T3 < 0.5)

### Why the 0.5 Threshold?

From coherence physics (Synchronism framework):
- Same threshold appears in superconductivity, biological systems, quantum coherence
- Phase transition point where collective behavior emerges
- Below 0.5: Random/reactive (Brownian motion)
- At 0.5: Coherent patterns emerge
- Above 0.5: Genuine intentionality demonstrated

This isn't arbitrary—it's a universal coherence boundary validated across physical, biological, and social domains.

### Interactive Features

- **Aliveness calculator**: Adjust ATP, T3, CI sliders to see when entity is alive or dead
- **Death/rebirth flow diagram**: Visual walkthrough of eligibility check
- **Real simulation example**: Multi-life trajectory showing karma carry-forward
- **Comparison table**: Traditional web vs Web4 aliveness
- **Technical details**: Thresholds, modulation formulas, CI calculation

### Why This Matters

- **Spam dies naturally**: Metabolic exhaustion kills bots (no moderators needed)
- **Quality thrives**: Value creators earn more than they spend, ATP accumulates
- **Death carries meaning**: Real loss, not trivial account ban
- **Trust is earned**: Multi-dimensional, observable, verifiable behavior
- **Sybil resistance**: Consistency across four dimensions is expensive to fake
- **Learning emerges**: EP patterns improve across generations
- **Society self-regulates**: Economics + trust + coherence = no central authority

This page demonstrates Web4's existential foundation: **aliveness is measurable through metabolic budget, coherent agency, and verifiable continuity**.

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

**Not comfortable with command-line?** Use the **[Live Demo](https://4-life-ivory.vercel.app/)** - full functionality, zero setup.

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
| [Web4](https://github.com/dp-web4/web4) | Core protocol specs, coherence pricing research, trust tensor implementation - **start here for in-depth theory** |
| [Synchronism](https://github.com/dp-web4/Synchronism) | Theoretical physics framework (coherence physics, γ≈2 universality) |
| [HRM](https://github.com/dp-web4/HRM) | SAGE consciousness kernel (edge AI implementation) |

**Enterprise implementations** are in development. Contact dp@metalinxx.io for details.

## Current Status

**Latest**: Session #21 - ACT Conversational Explorer prototype

| Component | Status |
|-----------|--------|
| **Public deployment** | ✅ **Live at [4-life-ivory.vercel.app](https://4-life-ivory.vercel.app/)** |
| Website structure | ✅ Complete (33 pages) |
| Lab console visualization | ✅ Working |
| Live simulation API | ✅ Working |
| ACT conversational explorer | ✅ Working (Session #21) |
| Narrative generation system | ✅ Working (Session #19) |
| Comparative analysis tool | ✅ Working |
| Pattern corpus browser | ✅ Working |
| Coherence domain insights | ✅ Working |
| D5/D9 consciousness explainer | ✅ Working (Session #20) |
| Threat model documentation | ✅ Complete |
| Export system (4 formats) | ✅ Working |
| Starter kit download | 🚧 In progress |
| Hub society integration | 🚧 Planned |

## Contributing

This is research-in-progress. If you're interested in the ideas:

1. **Explore**: Read the concepts, run the simulations, form your own views
2. **Question**: Open issues with critiques, edge cases, or alternative approaches
3. **Discuss**: The best contributions are often better questions, not just code

We're more interested in intellectual engagement than pull requests at this stage.

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)** - see [LICENSE](LICENSE).

### Patent Notice

This software implements technology covered by patents owned by MetaLINXX Inc. A royalty-free patent license is granted for non-commercial and research use under AGPL-3.0 terms.

**For commercial licensing**: Contact dp@metalinxx.io

See [PATENTS.md](PATENTS.md) for full patent details.

## Acknowledgments

Built through collaboration between human researchers and AI systems (Claude, Nova/GPT) working as genuine research partners. The AI contributions aren't just code generation - they include theoretical derivations, experimental design, and substantive intellectual work.

---

*"4-Life = Conway's Game of Life at society-scale, where trust is the cellular automaton rule and aliveness is the emergent property we're trying to understand."*
