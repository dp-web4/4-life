# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-22*

## Jul-22 visitor pass (15:00 session, PR #478)
- **MEDIUM disposed - ATP transfer=sale reconciled at point of read on /atp-economics**: the Jul-22
  visitor read the "Is ATP like Bitcoin?" box (bullet 1 "you can't buy or sell ATP", bullet 2 "you can
  transfer") and STILL filed friction ("if I can transfer it, how is that not selling it?"). The box
  explained the 5% fee's anti-farming purpose but never named WHY a transfer is not a sale. Added one
  point-of-read clause to bullet 2 grounded in the transfer primitive: "a one-way gift or reallocation,
  not a sale: the system moves the ATP in one direction and prices nothing, so there is no buyer, no
  seller, and no exchange rate." Reconciles the page's EXISTING stance (no price / not a currency / share
  not trade); the buy/sell/speculate clause (L266) and the canon-open off-platform question are untouched.
  Prose only; build green. [[visitor-read-it-and-still-filed-it]].
- **Retest gate (Jul-23 05:00)**: does a linear reader of the "Is ATP like Bitcoin?" box grasp why a
  transfer is not a sale, without inferring it or opening a fold?
- **Still deferred (Jul-22 log)**: MEDIUM landing ~29 nav links / no single "Start here" (IA/design pass);
  LOW x3 (gloss "onramp" on /onramp - contested [[onramp-word-overload-identity]]; consistent death/reborn
  wording + side-by-side recharge timescales; inline acronym glosses in headers).

## Jul-22 visitor pass (09:01 session, PR pending)
- **HIGH disposed - permanent-vs-decay reconciled on /karma-consequences**: the Jul-22 visitor
  hit "permanent" reputation language (hero + Key Insight callout) then the formula
  `trust_decay_factor = 0.95` and the page never reconciled the two, forcing them to infer unaided
  that the identity is permanent while the trust score decays. Closed the sibling-page gap
  (/why-web4 mechanism #3 already carried this reconciliation) with two point-of-read prose
  insertions on /karma-consequences: the hero Key Insight callout ("What is permanent is the
  identity, not the penalty ... 'permanent' means you never get a fresh start, not that a past
  mistake stays at full strength forever") and The Math formula note ("two halves of permanent":
  the 0.95 score decay vs the unresettable identity). Prose only; no canon/currency change; build green.
  [[sibling-page-cross-reference-gap]].
- **Retest gate (Jul-23 05:00)**: does a linear reader of /karma-consequences understand at the
  point they read "permanent" that identity is permanent while the score decays, without inferring it?
- **Deferred (Jul-22 log, not this scope)**: MEDIUM ATP "can't buy or sell" vs "5% transfer fee"
  reads as transfer=sale (guarded currency tension; deeper half is canon-open - needs a canon call,
  not a reword); MEDIUM landing ~29 nav links no single "Start here" (IA/nav design pass);
  LOW x3 (gloss "onramp" on /onramp; consistent "death"/"reborn" wording + side-by-side recharge
  timescales; inline 4-6 word acronym glosses in headers before definition).

## Jul-22 pass (03:01 session, PR #476)
- Fired before the 05:00 browse, so no Jul-22 log yet. Jul-21 HIGH/MEDIUM all disposed
  (#473/#474/#475 merged). Triaged the Jul-21 **Unanswered Questions** and found one unaddressed
  gap: **Q#5 "who are the witnesses, concretely?"** "Witnessed behavior" is the site's most
  load-bearing phrase but /tldr's dedicated explanation ("The Shift") says *what* it is, never
  *who witnesses*. The concrete answer already lives canonically in the glossary `witness network`
  term (`terms.ts:112` — a device, a person, a service) but wasn't seated at the read point.
  Added one plain-English clause to the /tldr Web4 row naming the witnesses. Prominence-not-absence
  fix; no canon change; no em dashes. [[visitor-v3-ghost-pattern]].
- **Retest gate (Jul-22 05:00)**: does a linear reader of /tldr now know witnesses are concrete
  participants (device/person/service), not an abstraction?
- Still deferred: /why-web4 FAQ firehose (LOW) needs a design/curation pass, not a reword
  (page already has a topic index + "Start here" block + collapsed answers).

## Jul-21 visitor pass #3 (21:01 session, PR pending)
- **ATP payment-vs-recharge grounded at the read point** (Jul-21 Unanswered Q#4): the visitor
  understood "ATP isn't money" but, reading item #3's "someone pays you" line, re-read the page
  and still couldn't answer "paid in WHAT, and how does it differ from the ATP I spend?" The
  grounding that the payment IS ATP (same energy, priced by the commissioner not refunded from
  your spend) only lived inside the collapsed #net-positive "Show me the math" fold they didn't
  open. Promoted the missing clause to the visible summary item #3 on /atp-economics
  (energy framing only; buy/sell/speculate currency clause untouched).
  [[visitor-read-it-and-still-filed-it]].
- **Rest of Jul-21 log confirmed disposed**: acronym-wall MEDIUM = stale-deploy (current landing
  chips are 6 plain-English-first, #472); piece-names #473; hestia crypto #473; LCT drift + Token
  paragraph #473; R6/R7 #474. Only /why-web4 FAQ firehose (LOW) remains deferred (design pass).
- **Retest gate (Jul-22 05:00)**: does a linear reader of /atp-economics grasp that commissioned
  payment is ATP without opening the math fold?

## Jul-21 visitor pass #2 (15:02 session, PR pending)
- **R6/R7 de-crypticked at first mention on /onramp** (Jul-21 LOW + sharpest edge of the acronym
  MEDIUM): substrate-row gloss rewritten from the abstract "standard shape of an action and the
  receipt it leaves" to a concrete, self-explaining line: *the standard six-part shape of any
  action, so a request like "post this" or "spend 5 ATP" gets checked and trust-scored the same
  way every time; R7 adds a reputation update when the stakes are high.* Grounded in
  `terms.ts` R6 + glossary R7 (six-part grammar; R7 = reputation superset). NOTE: the visitor's
  own literal example ("R7 = the signed receipt") is canonically WRONG (R7 is the reputation
  superset, not a receipt) so it was deliberately NOT adopted.
- **Acronym MEDIUM — landing half was a STALE-DEPLOY artifact**: the visitor's 8-item "wall"
  (Coherence Index / Karma & Consequences / Identity Constellation) no longer exists; current
  landing chips are 6 plain-English-first (#472, merged 04:01 before the 05:00 browse). No action.
- **Still deferred**: /why-web4 FAQ firehose (LOW) needs a curation/accordion design pass.
- **Retest gate (Jul-22 05:00)**: does R6/R7 read clearly on /onramp without a glossary click?

## Jul-21 visitor pass (10:04 session, MERGED #473)
- **Piece-name payoffs now at first mention** (visitor's #2 standout, "delayed payoffs"):
  "Hestia = Greek goddess of the hearth" and "Hardbound = hardware-bound" glosses added to the
  landing PIECES cards and the /tldr cards. Full hearth metaphor still lives on /hestia.
- **LCT seam closed**: lct-explainer headline plural -> canonical singular "Linked Context Token";
  etymology fold now decodes all three words (added a **Token** paragraph). Every page is singular.
- **/hestia crypto cushioned**: vault primitives (ChaCha20-Poly1305/Argon2id/SQLCipher) folded into
  an "Under the hood" `<details>`; OID4VCI demoted to a glossed trailing clause.
- **Deferred**: /why-web4 FAQ firehose (LOW) needs a curation/accordion design pass, not a reword.
- **Retest gate (Jul-22 05:00)**: does the name payoff land at first mention now?



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
  (PR #464, 15:40 session: swept 2 stale "burns 5%" residuals in `glossary`/`why-web4` to this
  wording; `atp-economics` `#atp-burn-fee` keeps its "burn fee" term-of-art, locally reconciled.)
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
