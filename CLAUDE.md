# 4-Life Development Track

## Project Overview

4-Life is the educational onramp to Web4: a site that teaches the framework and the four composable pieces that make up the onramp (the core standard, the hub, hestia, and hardbound), honest about what is real today.

> Rebuilt 2026-07. The prior Jan-2026 exploration era plus the game/simulation are archived on branch `archive/v1-2026-07` (tag `v1-archive-2026-07-15`). The site is now a pure explainer; the simulation is retired and may return in another form later.

### Web4 Ontological Context

```
Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP
```

Web4 is a trust-native ontology with RDF as its semantic backbone: trust is role-contextual, MRH graphs are fractal RDF structures, and value flows through the ATP/ADP cycle. 4-Life teaches this ontology and the onramp built on it. The onramp: the core standard is the substrate; the hub (community), hestia (personal), and hardbound (enterprise) are three scales to run it.

**Live site**: https://4-life-ivory.vercel.app/

## Visitor Feedback Loop

### How It Works

The **Visitor Track** runs daily at **05:00** and browses the live site as a naive first-time visitor with no Web4 knowledge. It generates honest friction feedback in `visitor/logs/YYYY-MM-DD.md`.

### Checking for Fresh Feedback

**At session start**, check if there's fresh visitor feedback to review:

```bash
# Today's date
TODAY=$(date +%Y-%m-%d)

# Check if today's visitor log exists
if [ -f "visitor/logs/$TODAY.md" ]; then
    # Check if current time is after 5am (visitor has run)
    HOUR=$(date +%H)
    if [ "$HOUR" -ge 5 ]; then
        echo "Fresh visitor feedback available: visitor/logs/$TODAY.md"
    fi
fi
```

### When to Act on Feedback

- **First 4-life session after 05:00**: Review the fresh visitor log and prioritize fixes
- **Subsequent sessions same day**: Feedback already reviewed, focus on implementation
- **Sessions before 05:00**: Previous day's feedback (if not yet addressed)

### Feedback Priority

When reviewing visitor logs, prioritize by severity:

1. **HIGH severity friction** → Fix immediately if possible
2. **MEDIUM severity friction** → Add to session goals
3. **LOW severity friction** → Note for future sessions

### Understanding Checklist

The visitor log includes an understanding checklist. If the visitor couldn't understand a core concept, that explainer page needs work:

- [ ] What Web4 is → Landing page / First Contact
- [ ] What the onramp is (the four pieces) → /onramp
- [ ] What LCT means → /lct-explainer
- [ ] What ATP/ADP means → /atp-economics
- [ ] What Trust Tensors are → /trust-tensor
- [ ] What is real today vs still R&D → /running-now
- [ ] Why this matters → /why-web4 (problem framing + honest FAQ)

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

4-life isn't just an output of Web4 — it's a sensor. The best way to learn is to try teaching; visitor confusion surfaces assumptions invisible from inside the ontology.

**Outbound (4-life → web4)**: Visitor friction logs reveal where Web4 abstractions are unclear, overloaded, or under-motivated. Web4 sessions periodically check `visitor/logs/` for perspective — not as mandates, but as signal about communicability.

**Inbound (web4 → 4-life)**: When Web4 changes terminology, clarifies specs, or adds features, those changes should eventually reach the site. The visitor will test whether the new framing actually works.

**Web4 repo** (from 4-life working directory): `../web4/`

## Development Priorities

1. **Onboarding clarity** — The site must be understandable by someone with zero Web4 background
2. **Progressive disclosure** — Don't dump jargon; reveal concepts incrementally
3. **Problem before solution** — Explain WHY before WHAT
4. **Concrete examples** — Abstract concepts need grounded illustrations

## Session Workflow

1. **Check visitor feedback** (if first session after 05:00)
2. **Review friction log** from visitor browse
3. **Identify actionable improvements**
4. **Implement fixes** (prioritize high-severity friction)
5. **Test changes** locally
6. **Commit and push** (Vercel auto-deploys)

## Key Files

```
4-life/
├── src/app/           # Next.js pages (the actual site)
├── src/components/    # Shared UI (nav, breadcrumbs, maturity badges, tooltips)
├── src/lib/           # Shared libs (navigation registry, terms, trust math)
├── visitor/           # Visitor Track (naive UX feedback)
│   ├── CLAUDE.md      # Visitor persona instructions
│   ├── logs/          # Daily browse logs
│   └── run_visitor.sh # 05:00 cron runner
└── public/            # Static assets
```

Note: leftover simulation-only components and libs (e.g. `src/lib/simulation`,
`src/lib/moments`, `FeaturedMoment`, `EcosystemStats`) are dead code pending a
prune pass; they no longer render on any page.

## Remember

The visitor is confused **on purpose**. Their confusion reveals our blind spots. Every friction point they report is a real UX problem that real humans will experience.

Don't rationalize their confusion. Fix it.

<!-- gitnexus:start -->
<!-- gitnexus:keep -->
# GitNexus — Code Knowledge Graph

Indexed as **4-life** (4665 symbols, 12429 relationships, 300 execution flows). MCP tools available via `mcp__gitnexus__*`.

**Do not reindex.** The supervisor handles GitNexus indexing. If the index is stale, note it in SESSION_FOCUS.

| Tool | Use for |
|------|---------|
| `query` | Find execution flows by concept |
| `context` | 360-degree view of a symbol (callers, callees, processes) |
| `impact` | Blast radius before editing (upstream/downstream) |
| `detect_changes` | Map git diff to affected symbols and flows |
| `rename` | Graph-aware multi-file rename (dry_run first) |
| `cypher` | Raw Cypher queries against the graph |

Resources: `gitnexus://repo/4-life/context`, `clusters`, `processes`, `process/{name}`
<!-- gitnexus:end -->
