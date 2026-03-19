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
## GitNexus — Code Intelligence

Indexed as **4-life**. Use GitNexus MCP tools for code navigation and impact analysis.

- Run `gitnexus_impact` before editing any symbol. Warn on HIGH/CRITICAL risk.
- Run `gitnexus_detect_changes()` before committing.
- Use `gitnexus_query` to find execution flows, `gitnexus_context` for symbol details.
- Use `gitnexus_rename` for renames (not find-and-replace). Dry-run first.
- If index is stale: `npx gitnexus analyze` (add `--embeddings` to preserve them).
- PostToolUse hook auto-refreshes index after `git commit` and `git merge`.
- Skill files: `.claude/skills/gitnexus/*/SKILL.md`
<!-- gitnexus:end -->
