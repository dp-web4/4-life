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
- [ ] What 4-Life demonstrates → How It Works
- [ ] What LCT means → /lct-explainer
- [ ] What ATP/ADP means → /atp-economics
- [ ] What Trust Tensors are → /trust-tensor
- [ ] How agents live/die → /aliveness
- [ ] Why this matters → **MISSING PAGE** (commonly flagged)

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
