# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-03-24*

---

## Live Site

https://4-life-ivory.vercel.app/

---

## Current Priorities

No HIGH or MEDIUM items open. Site is in good shape — Mar 23 visitor scored yes/yes with "solid" understanding.

1. **LOW: Landing page "What's New" contains internal changelog items** — References like "MRH renamed" and "glossary filter" mean nothing to first-time visitors. Consider moving to a separate changelog page or removing.

2. **DEFERRED: "What would the actual UI look like at scale?"** — Recurring unanswered question since Mar 7. Visitor wants to see real app integration, not just conceptual wireframes. Deferred as meta/roadmap concern, not an explainer gap.

---

## Recent Changes (git log)

```
c8e77fa Address Mar 23 visitor unanswered questions: trust transfer, community size, moderation, concept roadmap (#54)
1f02809 Address Mar 23 LOW visitor friction: progressive disclosure, synthon foreshadow, FAQ simplification (#53)
c825413 Address Mar 23 visitor friction: page length, progressive disclosure, FAQs (#52)
09da6e4 visitor: browse log 2026-03-23
481b5dd Address Mar 22 remaining friction: V3 discovery, EP clarity, quality validation FAQ, single-device support, ATP allocation, ADP visibility (#51)
fe8c8e9 Address Mar 22 visitor friction: redirects, dilemma UX, ATP explanation (#50)
```

---

## Web4 Concept Coverage

### Covered (visitor confirms understanding)

| Concept | Primary Page(s) | Visitor Comprehension |
|---------|-----------------|----------------------|
| Web4 overview | `/`, `/tldr`, `/why-web4` | Strong — landing hooks with real problems, TL;DR delivers |
| LCT (Linked Context Tokens) | `/lct-explainer` | Good — DeepDiveToggle reduces first-visit scroll |
| ATP/ADP energy model | `/atp-economics`, `/first-contact` | Good — VCM "restaurant tip" analogy works well |
| Trust Tensor (T3) | `/trust-tensor` | Good — Alice-across-roles example is intuitive |
| V3 Value Tensor | `/trust-tensor` | Good — introduced via 5 scoring examples (PR #51) |
| MRH / Trust Neighborhood | `/markov-relevancy-horizon` | Good — concept sequence nav + roadmap on LCT (PR #54) |
| Coherence Index (CI) | `/coherence-index` | Good — coding tutorials vs crypto spam example clicks |
| Agent lifecycle | `/first-contact`, `/aliveness` | Strong — "the economics do the work" |
| Society simulation | `/society-simulator`, `/playground` | Conceptually clear |
| Threat model / failure modes | `/what-could-go-wrong` | Strong — "builds more trust than any other page" |
| Day in Web4 | `/day-in-web4` | Strong — "best page on the site" per Mar 23 visitor |
| Karma Journey | `/karma-journey` | Good — teaches by doing |
| Federation economics | `/federation-economics` | Good — cross-society trust transfer FAQ (PR #54) |

### Not Yet Covered (but not blocking comprehension)

| Concept | Status | Notes |
|---------|--------|-------|
| **RDF backbone** | Not covered | Ontological foundation — too technical for current visitor journey |
| **MCP (Model Context Protocol)** | Not covered | Part of Web4 equation but not visitor-relevant yet |
| **SAL governance** | Partially covered | On How It Works + What Could Go Wrong. "Alignment vs compliance" could be clearer |
| **Trust cartels** | Partially covered | Threat model mentions colluding users. No dedicated FAQ |
| **Cultural context in T3** | Not addressed | "Temperament" is culturally loaded — acknowledged but no visitor friction on this |

---

## Visitor Feedback Queue

Latest log: `visitor/logs/2026-03-23.md`

### Open HIGH Items
*None*

### Open MEDIUM Items
*None*

### Open LOW Items
- Landing page "What's New" has internal changelog (2026-03-22)

### Resolved Since Last Update
- ~~`/trust-neighborhood` 404~~ → redirect added (PR #50)
- ~~Trust Dilemmas incomplete~~ → all 3 dilemmas accessible (PR #50)
- ~~Reading costs ATP unexplained~~ → rationale added (PR #50)
- ~~V3 never introduced~~ → on Trust Tensor page (PR #51)
- ~~ADP underexplained~~ → visibility improved (PR #51)
- ~~Single-device users~~ → FAQ added (PR #51)
- ~~Quality validation~~ → FAQ added (PR #51)
- ~~LCT page too long~~ → DeepDiveToggle (PR #52)
- ~~ATP page too long~~ → DeepDiveToggle (PR #52)
- ~~Trust Tensor length~~ → DeepDiveToggle (PR #53)
- ~~Why Web4 FAQ overload~~ → simplified header (PR #53)
- ~~MRH reference before explained~~ → inline note (PR #53)
- ~~Synthon introduced late~~ → foreshadowing on CI + How It Works (PRs #52-53)
- ~~Cross-society trust transfer~~ → FAQ on federation-economics (PR #54)
- ~~Community size~~ → FAQ on why-web4 (PR #54)
- ~~Illegal content moderation~~ → FAQ on what-could-go-wrong (PR #54)
- ~~Concept sequence roadmap~~ → preview on LCT page (PR #54)

---

## Simulation / Interactive Elements

| Element | Page | Status |
|---------|------|--------|
| Society Simulator | `/society-simulator` | Built — full narrative engine, 34 achievements |
| Playground | `/playground` | Built — 5 guided experiments, custom parameters |
| Trust Tensor Simulator | `/trust-tensor` | Built — role + scenario interactive |
| Trust Dilemmas Quiz | `/trust-dilemmas` | Built — all 3 dilemmas working (PR #50) |
| Karma Journey | `/karma-journey` | Built — multi-life simulator, 7 archetypes |
| Your Internet Personalizer | `/your-internet` | Built — 7 frustration scenarios |
| Day in Web4 | `/day-in-web4` | Built — 7 app mockup scenarios |
| MRH Explorer | `/mrh-explorer` | Built |
| First Simulation | `/first-simulation` | Built |
| Feedback Loop Explorer | `/feedback-loop-explorer` | Built |
| Live Trust Engine (WASM) | `/trust-tensor` | Built — real web4-trust-core, 3 scenarios |

---

## Key Components

- **DeepDiveToggle**: Collapses below-basics content on LCT, ATP, Trust Tensor. localStorage persistence.
- **ConceptSequenceNav**: LCT → ATP → T3 → MRH → CI → Aliveness. On all 6 concept pages + roadmap preview on LCT.
- **GlossaryPanel**: Floating "Aa" button, 17 terms in 5 categories. All pages.
- **ExplorationProgress**: Global progress bar, 11 core pages.
- **TermTooltip**: Hover-to-define on 12+ pages.

---

## Pending Items

- Landing page "What's New" cleanup (LOW)
- "UI at scale" recurring question (DEFERRED — meta/roadmap)
- Bidirectional web4 feedback: trust ceiling numbers still in flux across reference implementations

---

## Key File Locations

```
src/app/               # Next.js pages (77 routes in sitemap)
src/components/        # Shared components (DeepDiveToggle, ConceptSequenceNav, etc.)
visitor/logs/          # Daily visitor browse logs (05:00 cron)
visitor/CLAUDE.md      # Visitor persona instructions
lib/                   # Core simulation logic
public/                # Static assets
```

---

*Next session: Review Mar 24 visitor log when available. If no friction, site is in maintenance mode.*
