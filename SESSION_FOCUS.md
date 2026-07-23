# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-23*

## Jul-23 visitor pass (15:00 session) - /onramp word-definition + branding escalation
- **MEDIUM/LOW disposed - the word "onramp" is now defined on /onramp**: the /onramp page
  used "onramp" only as its H1 ("The Web4 onramp"); the body never defined the metaphor.
  Two consecutive browses converged: Jul-22 LOW ("'onramp'... is never actually defined - I
  had to infer 'entry pathway'") and Jul-23 MEDIUM ("'Onramp' means three things on one page").
  Added one hero clause defining ONLY the word, using the Jul-22 visitor's own safe gloss shape:
  "One word first: the onramp is the shortest path from zero to running Web4 yourself, and it
  runs through the four pieces below." No identity payload (policy-review REVISE: an
  identity clause on a page whose H1 is "The Web4 onramp" would relocate the seam, not resolve
  it). Prose only; no canon change; no em dashes.
- **Retest gate (Jul-24 05:00)**: does a reader landing on /onramp now learn what "the onramp"
  means in the hero, without inferring it?
- **BRANDING ESCALATION (operator decision needed) - the gate has FIRED**: the deeper Jul-23
  friction is the 4-Life / Web4 / onramp IDENTITY nesting (checklist Q3: "Is 4-Life the same
  thing as Web4, or the site about it, or one of the four pieces?"). Per [[onramp-word-overload-identity]],
  this is a post-#468 recurrence of the identity question, which the documented retest gate says
  is STRUCTURAL - the site title "4-Life | The Web4 Onramp" itself frames 4-Life AS the onramp,
  colliding with "the onramp" = the four buildable pieces. The gate says: escalate to a
  **branding call, NOT another reword**. A session cannot resolve this: the fix is a site-title
  decision (touches page.tsx / layout.tsx x3 / footer / CLAUDE.md), and the guardrail forbids
  asserting "4-Life is not the onramp" (negating the title on 5 surfaces makes a new seam).
  **Operator: does the site keep the "4-Life | The Web4 Onramp" title (accept the two-sense word),
  or rebrand to remove the collision (e.g. "4-Life | Your guide to Web4")?** Until decided, the
  word-definition clauses (#468 on /tldr, this on /onramp) are the ceiling of what a reword achieves.

## Jul-23 visitor pass (09:00 session, PR #481) - first post-05:00-browse pass
- **HIGH disposed - "witness" glossed at point of first read on Landing + TL;DR**: the Jul-23
  visitor's sole HIGH was that "witness/witnessed" - the load-bearing thesis term, used from the
  first sentence on the Landing hero and TL;DR - was only DEFINED in the glossary (reached at
  minute 33). Every page assumed the reader already knew it. Added one tight inline gloss the
  first time the term is leaned on, pulling the canonical glossary clause (observe + attest +
  stake your own reputation): Landing hero "To witness is to observe an action and attest to it,
  staking your own reputation on the record." (one sentence, hero is dense); TL;DR "The Shift"
  intro same clause ("...on what you sign."), placed ABOVE the existing operational gloss at L83
  ("observe what you do and sign a small record") and phrased as a compatible facet of it
  (signing = attesting), NOT a competing definition. Both surfaces identical phrasing = no new
  seam. Recurring-anchor-proactive pattern (one anchor in the intro above everything). Prose
  only; no canon change; build green; no em dashes.
- **Retest gate (Jul-24 05:00)**: does a linear reader, at the exact point they first read
  "witnessed behavior" on the Landing hero and TL;DR intro, now learn in one sentence what
  witnessing is (observe + attest + stake reputation) without reaching the glossary?
- **Same-root-cause next instance**: /lct-explainer "witnessed presence" used before grounded
  (Jul-23 MEDIUM) is the SAME defect; if witness friction recurs there, extend the same
  point-of-read anchor to /lct-explainer.
- **Still deferred (Jul-23 log)**: MEDIUM /onramp word-overload (contested
  [[onramp-word-overload-identity]], branding-escalation threshold); MEDIUM /onramp R6/R7
  (grounded #474 - prominence residual, verify next session); MEDIUM /why-web4 mechanism density
  (recurring recap-density); LOW first-contact Act 5 foreshadow; LOW running-now hestia
  "Running (early)" nuance.

## Jul-23 pass (03:00 session, PR pending) - fired before the 05:00 browse
- **MEDIUM (recurring, Jul-22) partially disposed - persistent "Start here" front door added**:
  the Jul-22 visitor's biggest secondary friction was "~29 links, no single obvious *Start here*"
  on the persistent nav. Verified: the landing BODY already signposts (hero CTA + "Read in this
  order"), and MobileNav already leads with the "Start Here" group, but the DESKTOP persistent
  header (`layout.tsx`) carried only Search + Whitepaper - **no front door at all** for a visitor
  arriving deep (search/shared link) on any non-landing page. Added a visually-primary "Start here"
  link to the desktop header (btn-primary accent gradient -> /tldr, the canonical first "Start Here"
  nav item) and a matching "Start here: Web4 in 2 minutes" front-door link at the top of the
  MobileNav drawer. Bounded ADDITIVE signposting fix, NOT the deferred IA redesign (nav-tree
  reorder/cull explicitly out of scope). Build green; no em dashes; /tldr resolves.
- **Retest gate (Jul-23+ 05:00)**: does a visitor landing on a non-home page now see one obvious
  "Start here" entry point in the persistent header without hunting through the link wall?
- **Still deferred (Jul-22 log)**: the DEEPER half of the nav-wall MEDIUM (too many links / no
  hierarchy) remains an IA/design pass, NOT reworked here; LOW gloss "onramp" (contested
  [[onramp-word-overload-identity]]); LOW death/reborn wording (deliberate karma arc) + recharge
  timescales (already in code L345/L683-693, prominence residual); LOW inline acronym glosses
  (spans pages). Q#4 T3-vs-V3 already on /why-web4 L379-382; Q#5 Law Oracle canon-open.

## Jul-22 visitor pass (21:00 session, PR pending)
- **Unanswered Q#3 disposed - cold-start witnesses grounded at point of read on /tldr**:
  the Jul-22 visitor's biggest open question was the chicken-and-egg objection the site's
  central "witnessed behavior" claim provokes: "Who witnesses a brand-new person with one
  device and no existing relationships? How do I get my first witness from a standing start?"
  The *trust-start* half (start neutral at 0.50, earn through quality) is already covered on
  /first-contact; the unaddressed half was the *witness* half. Added one tight point-of-read
  follow-on to the /tldr "Web4" row (the crown-jewel witnessed-behavior sentence, where the
  objection forms): "You need no prior reputation or contacts to begin: your own device is
  your day-zero [witness](/lct-explainer#first-device-bootstrap) for your identity, and from
  your first action onward it is the community you join that witnesses what you do. Witnessing
  is per action, not a standing relationship." Keeps the two halves distinct per policy review
  (device = IDENTITY witness only; community = behavior witness), links to the fuller mechanism
  rather than re-explaining, and does NOT contradict /what-could-go-wrong's honest "witness
  bootstrapping is unsolved" framing (that page scopes the open problem to *genesis*-scale
  network formation / Sybil resistance, a different scale than an individual joining a running
  community). Prose only; build green; no canon change; no em dashes. [[visitor-v3-ghost-pattern]].
- **Retest gate (Jul-23 05:00)**: does a linear reader of /tldr, at the point they read
  "witnessed behavior," now know a newcomer with one device and no contacts is still witnessed
  (own device for identity, the joined community for behavior), without it reading as a
  contradiction of the "unsolved bootstrapping" page?
- **Still deferred (Jul-22 log)**: MEDIUM landing ~29 nav links / no single "Start here"
  (IA/design pass, recurring); LOW x3 (gloss "onramp" on /onramp - contested
  [[onramp-word-overload-identity]]; consistent death/reborn wording + side-by-side recharge
  timescales; inline acronym glosses in headers). Unanswered Q#4 (T3 vs V3 one-liner) already
  on /why-web4 L379-382 - low priority; Q#5 R6/R7 grounded Jul-21 (#474), Law Oracle open.

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
