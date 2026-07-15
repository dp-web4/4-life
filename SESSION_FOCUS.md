# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-15*

---

## Live Site

https://4-life-ivory.vercel.app/

---

## BIG CHANGE IN FLIGHT: the onramp rebuild (2026-07)

The site is being archived and rebuilt around the Web4 onramp: the four composable
pieces are the **core standard**, the **hub**, **hestia**, and **hardbound**. The
Jan-2026 exploration era and the game/simulation are retired.

- Full prior 84-page site preserved on branch `archive/v1-2026-07`, tag `v1-archive-2026-07-15`.
- Restore any old file: `git checkout archive/v1-2026-07 -- <path>`.
- The simulation is retired (may return in another form later). The site is now a **pure explainer**.

### Done (Phase 1, committed, not yet deployed)
- Trimmed 84 routes to a lean onramp spine (removed research pages, game/sim, sim API, sim data, root cruft).
- New pages: `/the-standard`, `/hardbound`, `/onramp` (composition + adoption order).
- New four-piece front door home; new `navigation.ts` IA; sitemap derives from nav.
- Layout metadata/footer reframed; every retired route redirects to its nearest surviving page.
- Build green (26 static routes).

### In progress (Phase 2)
- Rewriting kept pages against ground truth, removing the "simulation lab" framing and em dashes.
  Priority: `/tldr`, `/running-now`, `/hub`, `/hestia` (underway), then the concept pages and the
  larger front-door pages (`/why-web4` is ~3800 lines, `/how-it-works`, `/first-contact`).
- Repoint visitor QA understanding-checklist (done: `visitor/CLAUDE.md`, root `CLAUDE.md`).
- Prune dead simulation-only components/libs (`src/lib/simulation`, `src/lib/moments`,
  `FeaturedMoment`, `EcosystemStats`, etc.). They no longer render; safe to remove after a build check.
- Seams-integrity pass, then push (auto-deploys to Vercel).

### Ground-truth content spine
The current canonical story of the four pieces (statuses, install commands, how they compose) was
synthesized from the source repos (web4, 4-hub, hestia, hardbound). Honest maturity is mandatory:
whole stack is R&D; hub pilot-ready; hestia Phase-2 working; hardbound usable/hardening but hardware
binding NOT on-device validated (never call it "production-ready").

---

## Notes for the daily visitor track
Some pages still carry pre-rebuild content until the Phase 2 rewrite lands. Friction on retired
framing (simulation, karma journey, society simulator) is expected and already being fixed; focus
new friction reports on the onramp spine (`/`, `/onramp`, `/the-standard`, `/hub`, `/hestia`,
`/hardbound`, `/running-now`).
