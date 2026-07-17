# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-17*

---

## Live Site

https://4-life-ivory.vercel.app/

---

## Status: onramp rebuild DEPLOYED; maintenance track RE-ENABLED (2026-07-17)

The site is the **Web4 onramp** educational explainer: the core standard plus the
three scales (hub / hestia / hardbound). The old game/simulation is retired and
archived on branch `archive/v1-2026-07` (tag `v1-archive-2026-07-15`). The rebuild
is live and reviewed. The Legion 4-life maintenance track was paused during the
rebuild and is now re-enabled; resume the normal daily loop.

### Site health
- 26 explainer routes; build green; every internal link resolves; zero em dashes.
- Nav is driven by `src/lib/navigation.ts` (single source; `MobileNav` derives from it).
- Deploy: push to `main` auto-deploys via Vercel.

### Just fixed (2026-07-17 visitor friction) — do NOT re-open these
- **ATP transfer fee (canonical):** a 100-ATP transfer delivers **95** to the recipient and
  **routes 5 to the community redistribution pool (not destroyed)**. Consistent across
  `atp-economics` and `why-web4`. If you touch ATP copy, keep this model and this number.
- **MRH hop-decay (canonical):** **0.70 / 0.49 / 0.34** (0.7x per hop from hop 1). Consistent
  across `why-web4` and the glossary.
- first-contact caveat pile-up collapsed to one line (nuance lives in the `<details>`).
- onramp `R6/R7` linked to the glossary; running-now install block split onto two lines;
  how-it-works has a "read TL;DR + Why first" orientation note.

### Known open (from the 2026-07-17 visitor, not yet done)
- The interactive First-Contact walkthrough (Alice's 5 acts) could not be exercised by the
  visitor's browsing tool; the *framing* is fixed but the acts themselves are unverified from
  a naive read. Worth a human/interactive check.
- "How It Works" is long for a "Start Here" item; the orientation note helps, but a future
  pass could split it or move it out of Start Here.

## The daily visitor loop
A naive first-contact reader browses the live site at 05:00 and logs friction to
`visitor/logs/YYYY-MM-DD.md` (persona: `visitor/CLAUDE.md`). On the first run after 05:00,
read the fresh log, prioritize HIGH then MEDIUM, fix, build (`npm run build` must pass),
seams-check, commit, push. Ground claims in the source repos (`../web4`, `../4-hub`,
`../hestia`, `../hardbound`); stay honest about maturity (never "production-ready");
no em dashes.
