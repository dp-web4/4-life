# 4-Life Development Track

## Project Overview

4-Life is a fractal laboratory for Web4 societies — an interactive simulation and explainer for trust-native digital ecosystems.

### Web4 Ontological Context

```
Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP
```

4-Life is the interactive laboratory for exploring Web4 as a living ontology. RDF provides the semantic graph through which all trust, identity, and value relationships are expressed. Entities in the simulation live within this ontology — their trust is role-contextualized via RDF triples, their MRH graphs are fractal RDF structures, and their energy flows through ATP/ADP metabolism.

**Live site**: https://4-life-ivory.vercel.app/

## Visitor Feedback Loop

The **Visitor Track** runs daily at **05:00** — browses the live site as a naive first-time visitor, generates friction feedback in `visitor/logs/YYYY-MM-DD.md`.

**At session start**: Check for today's visitor log (`visitor/logs/$(date +%Y-%m-%d).md`). First session after 05:00 reviews and prioritizes fixes. Prioritize by severity: HIGH (fix now) > MEDIUM (session goal) > LOW (note for later).

The visitor log includes an understanding checklist — if the visitor couldn't grasp a core concept, that explainer page needs work.

## MRH-Specific Policy — Phase Awareness (March 2026)

**Policies are MRH-specific, not universal.** 4-life is in a healthy state — it has
a natural constraint (explain to visitors) that prevents the drift seen in web4 and
hardbound autonomous tracks. But the lesson applies here too:

- 4-life is in **development/deployment** — the site is live, visitors browse daily
- Session work should advance visitor comprehension, not generate standalone code
- The "cross-pollinate" pattern (importing web4 session findings) is good when the
  findings are product-relevant, but should not import academic sprawl
- If a session can't identify a specific visitor friction point or site improvement
  to work on, it should stop rather than invent work

**The spectrum**: Research values (explore freely) → Development values (build toward
goals) → Deployment values (fix what's broken, improve what's live). 4-life sits at
development/deployment. Its policies should match.

See: `private-context/insights/2026-03-13-mrh-policy-phase-mismatch.md`

## Bidirectional Loop with Web4

4-life is a sensor, not just an output. Visitor confusion surfaces assumptions invisible from inside the ontology. Web4 sessions check `visitor/logs/` for signal; Web4 terminology changes flow back here for visitor testing. Web4 repo: `../web4/`

## Development Priorities

1. **Onboarding clarity** — understandable with zero Web4 background
2. **Progressive disclosure** — reveal concepts incrementally, not jargon dumps
3. **Problem before solution** — WHY before WHAT
4. **Concrete examples** — ground abstract concepts

## Key Files

```
4-life/
├── src/app/           # Next.js pages (the actual site)
├── visitor/           # Visitor Track (naive UX feedback)
│   ├── CLAUDE.md      # Visitor persona instructions
│   ├── logs/          # Daily browse logs
│   └── run_visitor.sh # 05:00 cron runner
├── lib/               # Core simulation logic
└── public/            # Static assets
```

## Remember

The visitor is confused **on purpose**. Their confusion reveals our blind spots. Every friction point they report is a real UX problem that real humans will experience.

Don't rationalize their confusion. Fix it.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **4-life** (5297 symbols, 13056 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/4-life/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/4-life/context` | Codebase overview, check index freshness |
| `gitnexus://repo/4-life/clusters` | All functional areas |
| `gitnexus://repo/4-life/processes` | All execution flows |
| `gitnexus://repo/4-life/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

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
