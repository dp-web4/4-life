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
│   ├── web4-explainer/     # Core Web4 concepts
│   └── api/lab-run/        # API endpoint for simulations
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
