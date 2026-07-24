# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-24*

## Jul-24 visitor pass (15:00 session) - first pass ON the Jul-24 05:00 browse
Log: 34 min, 9 pages, understanding "good", would return yes. Three MEDIUMs, four LOWs.
Two MEDIUMs disposed; the third is the open operator branding call.

- **MEDIUM disposed - one canonical sentence for the 0.5 line, and one name for it.** The visitor:
  "is 0.5 neutral, or is it a survival threshold, or both? ... 'only staying below it is fatal' is a
  double-negative that took me two reads. I still am not 100% sure whether dipping below briefly is
  fine." Verified before acting: the site already HAS a complete formulation, on first-contact
  (L153/L268), carrying both halves. Every other surface carried only the FATAL half, and
  lct-explainer stated the ruler twice under two different names ("survival line" at the intro anchor
  L255, "alive/dead line" at the ceilings anchor L1014). Two code comments recorded OPPOSITE intents
  (L250: "avoid a third phrasing"; L1004: "phrased distinctly ... to avoid redundancy") - distinctness
  won, and produced a second name for one line. Fix: first-contact's wording is now canonical and
  appears byte-identical at lct-explainer L263 (intro anchor, the point of FIRST read) and
  trust-tensor L407, always positive-first: *"Crossing below 0.5 restricts your features right away
  and is recoverable; only staying below it is fatal."* The intro anchor also gained trust-tensor's
  byte-identical newcomer reassurance ("you start at the neutral midpoint and earn your way above it,
  so a newcomer is not in danger"). "alive/dead line" retired on every TRUST surface (lct-explainer
  x2, why-web4 L2301); per-page restatement capped at name-only (lct-explainer L540/L577) so no fourth
  paraphrase can drift in. Both clauses are strictly-below on purpose: the exactly-0.50 endpoint is
  still a standing canon escalation and is NOT asserted anywhere.
  - **Deliberately NOT renamed**: coherence-index L756/L1134 also say "0.5 alive/dead", but those are
    on the **CI** scale, a different quantity. Importing the trust-scale name would open a new seam.
    Whether the site should explain that trust and CI happen to share a 0.5 line is an open question.
- **MEDIUM disposed - R6/R7 is deep-linkable now (3rd recurrence, mechanical root cause).** Visitor:
  "R6/R7 ... zero explanation, no link, no page in the nav"; "every one of those acronyms has a Core
  Concepts page except R6/R7". Literal claim is false (onramp L87 has a 45-word gloss + link), and two
  prior inline-gloss treatments (#471, #474) had already shipped, so per [[visitor-read-it-and-still-filed-it]]
  the session hunted the missing clause instead of re-glossing. Found it: **every** primitive card in
  glossary has an `id` + `scroll-mt-20` (#lct, #atp, #adp, #t3, #mrh, #ci, #v3, #hub, ...) **except
  R6 and R7**, so onramp's link dumped the reader at the top of a ~1100-line glossary while every
  sibling acronym they compared it against deep-links. Added `id="r6"`/`id="r7"` and pointed both
  onramp links at `/glossary#r6`. R6 stays OUT of the "Acronyms at a glance" box (deliberate decision
  at glossary L138, not re-litigated).
- **Link-integrity fix (surfaced by the policy reviewer)**: `src/lib/terms.ts` had two `learnMore`
  targets pointing at routes retired by the Jul-15 rebuild - Synthon -> `/aliveness` and
  EP -> `/patterns`. Both 404'd from TermTooltip. Repointed to `/coherence-index` ("Groups Can Be
  Coherent Too") and `/karma-consequences`. All 26 `learnMore` routes now resolve.
- **NOT touched**: the "onramp" word-overload MEDIUM (still the **operator branding call** below -
  the visitor's own suggestion, renaming the four pieces, IS the escalated decision); the four LOWs
  (landing subheading jargon; Reference/Running labels used before defined; "Die & Reborn" reads
  literal - retest after #484 which merged AFTER this browse; software-0.50 equity cross-link).
- **Retest gates (Jul-25 05:00+)**: (1) does a reader meeting 0.5 on any page now learn in one
  sentence that a brief dip is recoverable and only a sustained stretch below is fatal? (2) does
  clicking R6/R7 on /onramp land on the definition? If R6/R7 recurs a 4th time after this, the
  residual is NOT the link and NOT the gloss: escalate as an IA question (does R6/R7 need its own
  Core Concepts page, or should it leave the beginner-facing substrate list?).

## Jul-24 visitor pass (03:00 session, PR #484) - fired BEFORE the 05:00 browse
- **SEAMS FIX disposed - the ATP=0 "death" contradiction between First Contact and ATP Economics**:
  the Jul-23 visitor's Unanswered Q#4 ("does an agent hitting zero ATP really terminate, or just go
  dormant? The story and the ATP page use 'death' slightly differently") flagged a real cross-page
  seam. atp-economics L1147 ("Death is Meaningful" card) asserted "When ATP hits zero, you die. Not
  timeout. Not suspension. Death." - contradicting first-contact, which frames energy-death (ATP=0)
  as a RECOVERABLE "suspended license" (identity/history persist; rebirth via karma; only trust-death
  is permanent). L1147 was the lone outlier: the rest of atp-economics already encodes the two-tier
  model (L1324 "die and stay dead" + L1953 "No trust? No rebirth" both condition PERMANENT death on
  NOT building trust); how-it-works L1119 is correctly spammer-scoped too. Reworded L1147 to keep the
  "death is meaningful, not a free Web2 account-reset" pole while dropping the "Not suspension" denial,
  reusing first-contact's exact "suspended license" vocabulary so both pages answer identically.
  Prose-entailment fix, no canon/number change (policy-reviewer APPROVED); build green; no em dashes.
- **Jul-23 residuals NOT touched (and why)**: /lct-explainer "witnessed presence" MEDIUM is
  retest-gated (Jul-24 05:00; #481's upstream witness gloss wasn't live during the Jul-23 browse -
  do not pre-empt); /onramp word-overload = operator branding call; R6/R7 = twice-treated (#471/#474),
  gloss live during browse; why-web4 density = literal suggestion already shipped (#457 + per-card
  "Shorthand:" lines); first-contact Act-5 foreshadow LOW = deferred.
- **Retest gate (Jul-24 05:00+)**: does a reader who reads both First Contact and ATP Economics now
  get ONE consistent answer to "does zero ATP terminate or suspend?" (recoverable suspension WITH
  earned karma; bad actors / no-trust die for good)?

## Jul-24 visitor pass (15:02 session) - "where do I fit?": the checklist's only unchecked box
*Ordering note: PR #485 (14:50 session) inserts its own Jul-24 block at the top of this file; this
block is anchored lower to avoid a merge conflict. Normalize the order when both have merged.*
- **Disposed - the Jul-24 log's worst-rated finding, which #485 named and did not take**: six of
  seven checklist concepts were checked; **"why any of this matters" was marked partial**, for one
  stated reason - *"I understood the mechanisms better than I understood what I personally would do
  with any of it today"*. Restated as Unanswered Q#5 ("as an ordinary human, is there anything here
  for me *today*?") and as the closing line ("the site taught me the machine; it hasn't quite told
  me where I fit in it"). **Recurrence: Jul-20 Q#4** asked it of hestia specifically ("what does it
  actually DO for me day-to-day? I couldn't picture the user experience"). Two post-rebuild browses.
- **The answer already existed one click past where the visitor stopped.** They read 8 pages and
  reached none of the four piece pages. `/hestia` L190+ carries a full **"A day with Hestia"**
  walkthrough (open the app, `hestia init` makes a vault + LCT locally, delegate scoped/expiring
  authority, every consequential act lands in your witness chain, revoke and the record stays) -
  and the page had **zero `id` anchors in 425 lines**, so none of its 18 inbound links could point
  at it. Meanwhile `/running-now`'s closing block already **promised** the routing ("start with the
  piece that fits what you want to try") and then routed by **piece identity** ("hestia (deployed
  today)"), which only helps a reader who already knows which piece they are. Classic
  [[visitor-read-it-and-still-filed-it]]: visible, demonstrably read, still filed -> the missing
  clause, not missing content.
- **Fix**: `/running-now`'s CTA rewritten as **"Where you fit today"**, five reader-keyed rows
  (here to understand not run / runs AI agents at a command line / has a group / building on the
  primitives / answers to auditors), same five internal links plus the `4-lab.io/fleet` living-example
  link already used on `/hub`. Rows are **descriptive, not promises** - this page is the honest
  maturity ledger, so each row states what is true for that reader today and nothing more, and every
  maturity phrase mirrors the section above it (hub pilot-ready-not-deployed, hardbound
  usable-and-hardening with TPM binding unvalidated on-device). `/hestia` got
  `id="a-day-with-hestia"` + `scroll-mt-20` so row 2 lands on the answer. Build green; no em dashes;
  0 new files; no number, canon, or status change.
- **Policy review returned REVISE with 7 constraints, all accepted.** Two mattered:
  1. The honest row must **not** say "there is nothing for you to install today" - false, and it
     contradicts three surfaces (hestia ships a public `app-v0.1.2` release; `/running-now` L260
     "deployed and in day-to-day use"; `/hestia` "a normal desktop app"). Scoped to **need and
     purpose, not existence**: "nothing here needs installing for today to be worth your time".
  2. **Do not adjudicate whether secure hardware is required** (the visitor's Q#2). Dropped that
     clause entirely, and recorded why in the code comment.
- **NEW STANDING SEAM (out of scope, needs its own session, possibly a web4 canon call)**:
  `why-web4` answers the hardware-affordability question **twice, and the two answers disagree**.
  `#faq-tpm-affordability` (L2203) states flatly that "Web4 identity **requires** hardware with
  secure elements"; `#faq-affordability` (L1372) treats that as conditional; `lct-explainer`'s
  `#software-only-survival` treats software-only anchoring as viable at a 0.50 ceiling with zero
  margin. Both FAQs are indexed separately (L573/L581, L1187/L1195). Until that is reconciled, **no
  page may assert either way whether hardware is the price of entry** - that is why Q#2 is still open.
- **Retest gate (Jul-25 05:00+)**: does the log still mark "why any of this matters" partial, or
  still ask "what do I do with this"? **If it recurs a third time, the residual is IA placement, not
  wording** - the routing sits at the end of `/running-now`, and a reader who never gets there never
  sees it. Escalate to moving it earlier in the funnel (`/tldr` or the landing page); do NOT reword
  it a third time.
- **Also still open**: `/hestia` has one anchor now and needs a general anchor pass (18 inbound
  links, one target); `/hestia` L196 calls it "a normal desktop app" while the only published
  release asset is an Android APK (accuracy check owed against the hestia repo).

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
