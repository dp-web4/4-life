# 4-Life - Agent Discovery Document

**For AI agents assessing this repository.**

## TL;DR (50 words)

4-Life is an interactive explainer and simulation platform for Web4 trust-native societies. Live demo at 4-life-ivory.vercel.app. Visualizes LCT identity, ATP economics, trust tensors, and multi-life agent cycles. Next.js/TypeScript. Use if you need: Web4 demos, trust visualization, interactive concept exploration, or society simulation.

## Quick Assessment

| Question | Answer |
|----------|--------|
| What is this? | Interactive Web4 explainer + simulation |
| Is it production-ready? | Live demo, research stage |
| Primary language | TypeScript (Next.js) |
| Pages | 34 |
| Live demo? | Yes: 4-life-ivory.vercel.app |
| License | AGPL-3.0 |

## Core Features

| Feature | Path | Purpose |
|---------|------|---------|
| First Contact | `/first-contact` | Zero-to-comprehension tutorial |
| Lab Console | `/lab-console` | Live simulation viewer |
| ACT Explorer | `/act-explorer` | Conversational Q&A |
| Parameter Playground | `/playground` | Interactive experimentation |
| Trust Networks | `/trust-networks` | Multi-agent visualization |
| Federation Economics | `/federation-economics` | ATP market dynamics |

## Key Concepts Explained

| Concept | Explainer Page |
|---------|----------------|
| LCT (Identity) | `/lct-explainer` |
| ATP/ADP (Economics) | `/atp-economics` |
| Trust Tensor (T3) | `/trust-tensor` |
| Coherence Index (CI) | `/coherence-index` |
| Aliveness | `/aliveness` |
| MRH (Context) | `/markov-relevancy-horizon` |

## Entry Points by Goal

| Your Goal | Start Here |
|-----------|------------|
| Try it immediately | [4-life-ivory.vercel.app](https://4-life-ivory.vercel.app/) |
| Run locally | `npm install && npm run dev` |
| Understand concepts | `/first-contact` page |
| See simulation code | `src/lib/` |
| Page structure | `src/app/` |

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Charts**: Recharts

## Simulation Types

| Type | Description |
|------|-------------|
| EP Closed Loop | Epistemic learning across multiple lives |
| Maturation Demo | Trust evolution comparison |
| Trust Networks | Multi-agent trust dynamics |
| Federation Economics | ATP market self-organization |

## Related Repositories

| Repo | Relationship |
|------|--------------|
| `web4` | Parent protocol (specs) |
| `Synchronism` | Coherence physics (C ≈ 0.50 threshold) |
| `HRM/SAGE` | Consciousness kernel |
| `ACT` | Blockchain implementation |

## Machine-Readable Metadata

See `repo-index.yaml` for structured data.

## Token Budget Guide

| Depth | Files | Tokens |
|-------|-------|--------|
| Minimal | This file | ~400 |
| Standard | + `README.md` | ~5,000 |
| Code | + `src/lib/types.ts` | ~8,000 |
| Full | + `src/app/` | ~30,000 |

---

*This document optimized for AI agent discovery. Last updated: 2026-02-08*

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **4-life** (9015 symbols, 15340 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/4-life/context` | Codebase overview, check index freshness |
| `gitnexus://repo/4-life/clusters` | All functional areas |
| `gitnexus://repo/4-life/processes` | All execution flows |
| `gitnexus://repo/4-life/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
