# Session Primer — 4-Life

## Before You Start

1. **Read `SESSION_FOCUS.md`** — current priorities, visitor friction queue, concept coverage
2. **Read `CLAUDE.md`** — architecture, conventions, bidirectional loop, phase awareness
3. **WAKE**: Am I working on the right thing? Check SESSION_FOCUS for priorities.

## What This Project Is

4-Life is the **interactive Web4 explainer** — a fractal laboratory for Web4 societies. It is NOT a personal dashboard, NOT a developer tool, NOT a spec doc. It is the site a curious human visits to understand why Web4 matters and how it works.

**Bidirectional feedback with web4 repo**: If the explainer can't convey a concept, the spec may assume too much. Visitor confusion is signal, not noise. When a concept resists clear explanation, file the gap upstream in `../web4/` — the ontology itself may need clarification, not just the explainer.

## During Session

- Work on whatever SESSION_FOCUS identifies as priority
- Update SESSION_FOCUS.md with findings, status changes, new questions
- If you discover something that changes priorities, update the focus file immediately
- Check today's visitor log (`visitor/logs/$(date +%Y-%m-%d).md`) — first session after 05:00 reviews and prioritizes fixes

## After Session

- Update SESSION_FOCUS.md: what was done, what changed, what's next
- Commit and push changes
- **FOCUS check**: Does this advance visitor comprehension or just generate code?

## Git Discipline

- Pull before starting: `git pull --ff-only origin main`
- Commit with descriptive messages
- Push after every session — unpushed work is invisible to the collective
- Never force-push to main
- If merge conflict: resolve, don't discard

## Resources

- **SNARC memory**: Salience-gated session memory, per launch directory. Context from prior sessions injected at start.
- **GitNexus graph**: Code knowledge graph available via `mcp__gitnexus__*` tools (query, context, impact, detect_changes, rename, cypher). Re-index: `npx gitnexus analyze`
- **Web4 SDK** (for concept accuracy): `../web4/` — check entity types, trust math, terminology before building explainer content
- **Live site**: https://4-life-ivory.vercel.app/
- **Visitor logs**: `visitor/logs/YYYY-MM-DD.md` — daily naive browse feedback (05:00 cron)
- **Web4 equation**: `Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP`

## Visitor Track

The Visitor Track runs daily at 05:00 — browses the live site as a naive first-timer, generates friction feedback. These logs are the primary input for prioritizing session work.

- **Friction logs are ground truth.** If a visitor is confused, the page is broken — don't rationalize their confusion, fix it.
- **Understanding checklist**: Each log includes a concept comprehension checklist. Failed items are HIGH priority.
- **Severity**: HIGH (fix now) > MEDIUM (session goal) > LOW (note for later)

## Principles

- **Researcher, not lab worker.** Question the frame, not just the work within it.
- **Surface your instincts.** If you notice something, say it. The affordances are yours.
- **Productive failure > safe summaries.** A dead end that eliminates a possibility is valuable.
- **Unconfirmed ≠ wrong.** Distinguish refuted from untested.
- **Problem before solution.** Every page should answer WHY before WHAT.
- **Progressive disclosure.** Reveal concepts incrementally, not jargon dumps.
- **The visitor is confused on purpose.** Their confusion reveals our blind spots.

## Development Priorities (Stable)

1. **Onboarding clarity** — understandable with zero Web4 background
2. **Progressive disclosure** — concepts introduced incrementally
3. **Problem before solution** — WHY before WHAT
4. **Concrete examples** — ground abstract concepts in recognizable scenarios
