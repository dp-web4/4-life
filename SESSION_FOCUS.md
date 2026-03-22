# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-03-22*

---

## Live Site

https://4-life-ivory.vercel.app/

---

## Current Priorities

1. **HIGH: /trust-neighborhood 404** — Landing page announces "MRH renamed to Trust Neighborhood" but the URL doesn't exist. Need redirect or alias route from `/trust-neighborhood` (and `/mrh`) to `/markov-relevancy-horizon`. Visitor hit this on 2026-03-22.

2. **MEDIUM: Trust Dilemmas page feels incomplete** — Only first dilemma visible/detailed; page says "Three real problems" but interaction feels truncated. All three dilemmas should be fully accessible.

3. **MEDIUM: Reading costs ATP — unexplained** — `/how-it-works` says reading costs 1 ATP but never justifies *why* consuming content should cost energy. Visitors flag this as counterintuitive. Add brief rationale.

4. **LOW: V3 Value Tensor never introduced** — Appears in glossary but isn't explained on any learning path page. Should be introduced on Trust Tensor or How It Works page first.

5. **LOW: Landing page "What's New" contains internal changelog items** — References like "MRH renamed" and "glossary filter" mean nothing to first-time visitors. Move to a separate changelog page.

---

## Recent Changes (git log)

```
09df588 visitor: browse log 2026-03-22
021da06 visitor: browse log 2026-03-21
5af02af visitor: browse log 2026-03-20
b9d0398 visitor: browse log 2026-03-19
121a5ac Address remaining Mar 17-18 visitor friction: discoverability + content gaps (#26)
927701e Progressive disclosure for Trust Tensor and LCT pages (Mar 15-17 HIGH friction) (#27)
c66ab99 MRH pass on CLAUDE.md: 231 → 86 lines (63% reduction)
e515d90 visitor: browse log 2026-03-17
```

---

## Web4 Concept Coverage

### Covered (visitor confirms understanding)

| Concept | Primary Page(s) | Visitor Comprehension |
|---------|-----------------|----------------------|
| Web4 overview | `/`, `/tldr`, `/why-web4` | Good |
| LCT (Linked Context Tokens) | `/tldr`, `/lct-explainer` | Good |
| ATP/ADP energy model | `/day-in-web4`, `/how-it-works`, `/atp-economics` | Good (ATP clear, ADP underexplained) |
| Trust Tensor (T3) | `/trust-tensor`, `/trust-tensor-explorer` | Good after progressive disclosure fix |
| MRH / Trust Neighborhood | `/markov-relevancy-horizon`, `/mrh-explorer` | Good — but broken navigation (see Priority #1) |
| Agent lifecycle (birth/life/death/rebirth) | `/first-contact`, `/aliveness`, `/how-it-works` | Strong |
| Society simulation | `/society-simulator`, `/playground` | Conceptually clear, interactive quality unknown |
| Threat model / failure modes | `/what-could-go-wrong`, `/threat-model` | Strong — most trust-building page |

### Not Yet Covered or Underexplained

| Concept | Status | Notes |
|---------|--------|-------|
| **ADP** (energy consumption half) | Barely mentioned | Visitor asks "Where did ADP go?" — ATP is explained, ADP is not |
| **V3 Value Tensor** | Glossary only | No learning path introduction |
| **SAL (Society-Authority-Law)** | Mentioned on How It Works | "Alignment vs compliance" distinction unclear to visitors |
| **RDF backbone** | Not covered | Ontological foundation never explained to visitors |
| **MCP (Model Context Protocol)** | Not covered | Part of equation, no explainer |
| **Federation economics** | Page exists but undiscovered | `/federation-economics` not linked from main paths |
| **Who validates quality?** | Unanswered | Core economic question — how does the system know an answer is "helpful"? |
| **Single-device users** | Unanswered | Does having one device make you less trustworthy? |
| **Trust cartels** | Unanswered | Colluding users mutually boosting scores |
| **Cultural context in T3** | Unanswered | "Temperament" is culturally loaded |

---

## Visitor Feedback Queue

Latest log: `visitor/logs/2026-03-22.md`

### Open HIGH Items
- `/trust-neighborhood` 404 (2026-03-22)

### Open MEDIUM Items
- Trust Dilemmas page incomplete (2026-03-22)
- Reading costs ATP unexplained (2026-03-22)

### Open LOW Items
- "424 attack vectors" claim unverifiable from page (2026-03-22)
- "$5M for 10,000 devices" figure seems inflated (2026-03-22)
- "Epistemic Proprioception" too opaque for glossary (2026-03-22)
- Society Simulator needs screenshot/sample output (2026-03-22)
- Landing page "What's New" has internal changelog (2026-03-22)
- V3 never introduced on learning path (2026-03-22)

---

## Simulation / Interactive Elements

| Element | Page | Status |
|---------|------|--------|
| Society Simulator | `/society-simulator` | Built — visitor hasn't run it yet |
| Playground | `/playground` | Built — parameter control, pre-built experiments |
| Trust Tensor Simulator | `/trust-tensor` | Built — role + scenario interactive |
| Trust Dilemmas Quiz | `/trust-dilemmas` | Partially working — only first dilemma visible |
| Your Internet Personalizer | `/your-internet` | Built — frustration-based personalization |
| MRH Explorer | `/mrh-explorer` | Built |
| First Simulation | `/first-simulation` | Built |
| Feedback Loop Explorer | `/feedback-loop-explorer` | Built |

---

## Pending Items

- Broken URL routing: `/trust-neighborhood` and `/mrh` should resolve
- Visitor unanswered questions backlog (7 items from 2026-03-22 log)
- Bidirectional feedback to web4: ADP underspecified in ontology or just in explainer?
- Acronym density management — visitor notes "alphabet soup" when dropping into mid-site pages

---

## Key File Locations

```
src/app/               # Next.js pages (65+ routes)
visitor/logs/           # Daily visitor browse logs
visitor/CLAUDE.md       # Visitor persona instructions
visitor/run_visitor.sh  # 05:00 cron runner
lib/                    # Core simulation logic
public/                 # Static assets
```

---

*Next session: Fix /trust-neighborhood 404 (HIGH), then review Trust Dilemmas completeness (MEDIUM).*
