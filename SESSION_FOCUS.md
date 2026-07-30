# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

*Last updated: 2026-07-30 (03:00 session)*

## Jul-29 visitor pass, fourth sitting (Jul-30 03:00 session) - the false inference the friction table never filed
Log: `visitor/logs/2026-07-29.md` (same browse, fourth and **final** sitting: this session fired
03:01, two hours before the 05:00 browse, so no Jul-30 log could exist). One open PR (#496, the
third sitting, REVIEW_REQUIRED, no overlap with this work). **All 13 friction rows were already
disposed** (#494 three HIGHs + one LOW, #495 four rows, #496 two rows, one MEDIUM blocked by
`trust-05-endpoint-canon-conflict`, one LOW behind the fired `onramp-word-overload` gate). So this
sitting worked the log's **Unanswered Questions**, which per
[[visitor-numbers-integrity-class-signal]] license falsifiable defects the table does not name.
**Next session: triage the fresh log, not a fifth pass on this one.**

- **Unanswered Question 8 disposed - `/hestia` let the reader conclude the one Running piece has
  never operated connected, and that is false.**
  - The visitor asked "if trust comes from being witnessed by others, what does the one running
    piece actually demonstrate?" and in the journey answered themselves: *"Hestia is the piece that
    runs, and it runs alone ... the runnable thing is the one part of the system where the core
    mechanism cannot yet operate."* Wrong in two independent ways, both already grounded.
  - **The site predicted this failure mode in a code comment and implemented the guard on only one
    of the two surfaces.** `how-it-works:83-92` says *"'You can join' is load-bearing - /hub says
    'This isn't hypothetical: we run one' (the lab fleet is real but not joinable), so a bare 'no
    public network' would re-create the contradiction one page over."* `/how-it-works` honors it
    (headline: "No network you can **join** yet"). `/hestia`, which is where this visitor read the
    caveat, did not.
  - **My diagnosis was overstated and policy review corrected it.** I claimed the connect-hub box
    lacked joinability scope. It does not: `:407-423` says the URL is one *you or your group stand
    up*, online in 10 to 30 minutes. The real gap is narrower and the guard comment now records the
    accurate version: the box never said the witnessing **operates solo**, and never said the
    connected path had been **exercised at all**.
  - **Policy review also supplied the strongest rebuttal, which I had missed, and it carries zero
    maturity exposure.** The core mechanism already operates solo: an agent acting under your
    delegation is checked by your policy gate and written into your witness chain, and its T3/V3
    move with the outcomes (`hestia/README.md:43/:49/:74`, half-stated already at `hestia:115-117`
    and `:159-164`). "Witnessed by others" does not require a hub; the owner and the delegate
    witness each other. That became the load-bearing clause instead of the connected-path claim.
  - **The four-word rebuttal that was already there got the specifics.** `:435` said only "hub
    integration works end to end", ~30 lines below the caveat that raises the question. It now names
    what that covers, per README's status table (Hub connection, Member-to-hub channel, Paired
    member-to-member channels, Constellation, all **Working**): join a hub, an encrypted
    member-to-hub channel, device-constellation proof in the handshake, and sealed member-to-member
    messages the hub relays without being able to read them. **Member-to-member was absent
    site-wide** before this ([[canonical-sentence-only-collapses-scattered-claims]]: one surface now,
    propagate later).
  - **Claims exercised capability, never deployment.** Policy review flagged a seam I had not:
    `running-now:116` says "No production deployment yet" and `:373-374` calls the hub pilot-ready
    rather than deployed. Guard comment forbids upgrading this to "deployed" or "a hub is up".
    README's own wording was **not** copied verbatim (it carries em dashes and `↔` glyphs).
  - **The canonical sentence is byte-identical and zero bytes changed.** Three surfaces
    (`hestia:404`, `how-it-works:99`, `day-in-web4:515`), one occurrence each, verified after. The
    new paragraph **points at** it with a three-word quote rather than paraphrasing, so it does not
    become a fourth variant, and it does not collide with #496's `/running-now` wording either.
  - The fleet is referenced, not restated: `/hub` owns that claim, so `/hub:98` got
    `id="we-run-one"` (first `id` on that file, no inbound `/hub#` links to break) and `/hestia` got
    `id="honest-status"`. The general anchor pass is still owed.

### NOT taken this sitting
- **The Honest Assessment's convergence ask** ("give the software-only tier one honest paragraph in
  one place", at the `/why-web4` affordability read point, which the visitor called "the one place I
  felt the site was not being as straight with me"). It needs the affordability FAQ to presuppose a
  participating software-only tier, which is one side of [[hardware-required-seam]]: `:1391` states
  the barrier conditionally, `:2216` states flatly that "Web4 identity requires hardware with secure
  elements", and `:686-694` carries an in-code EDIT SCOPE WARNING naming those exact two FAQs. #494
  left both alone for the same reason. **This is now the second visitor to hit the seam from the
  equity side, and it is still not in `docs/WEB4-CANON-QUESTIONS.md`** (Q1-Q7 do not cover it).
  Filing it is the next move, and it is a web4-side question, not a site reword.
## Jul-29 visitor pass, third sitting (Jul-29 21:00 session) - the last two rows, and the escalation stops being carried
Log: `visitor/logs/2026-07-29.md` (same browse, third sitting). Zero open PRs. Of the 13 friction
rows, #494 closed the three HIGHs and one LOW, #495 closed four more, one MEDIUM is blocked by a
standing escalation and one LOW is behind a fired gate. **This sitting closed the two that were
left and filed the escalation that both earlier sittings carried.** With this, every actionable
row in the Jul-29 browse is disposed.

- **LOW disposed - `/running-now` "4 machines, whose?", and the visitor's own suggested wording
  was the thing not to print.**
  - The number is grounded: `hestia/README.md:78`, "Claude Code plugin ... Deployed on 4
    machines", with no owner named. Ownership is grounded one paragraph up at `README.md:22`: the
    lab that builds and runs Hestia is itself a live Web4 society, members published at
    4-lab.io/fleet. `/running-now:341` already says the same thing in the CTA rows, so naming the
    owner in the Hestia section is internally consistent, not a new claim.
  - **The site already had a canonical sentence for the other half and this page did not carry
    it.** #490 made *"there is no public network open to outside members yet"* identical on
    `/hestia:404`, `/day-in-web4:515` and `/how-it-works:99`. It was absent from `/running-now`,
    the page that *issues* the Running badge and the page the visitor asked on. Reused
    byte-for-byte (a paraphrase would have created a fourth variant of a sentence deliberately
    unified). Verified: one occurrence on each of the four pages now.
  - **Did not print the suggested clause "no outside users yet".** The plugin and the SDKs ship
    on crates.io, npm and PyPI, so we cannot know nobody outside installed them. That clause
    would be an unfalsifiable flat absolute on the page the visitor praised most for
    scrupulousness, which is precisely the defect class this browse's Honest Assessment indicted
    and #494 spent a session repairing. The fix says whose the deployment is, notes the packages
    are public, and scopes what the badge claims ("daily use by the people who build it ... it
    does not claim adoption") without demoting the tier. The visitor agreed a named owner still
    leaves a legitimate Running badge.
  - **Insertion point moved on policy review.** Both per-piece caveats on this section are
    *counted* (`:206` "two parts honestly still early", `:262` "Two things are honestly still
    early"), so folding a deployment-scope fact into either would falsify the count or force both
    to change. Landed as its own paragraph after the bullet grid, outside the enumeration. The
    hardware-required seam guard at `:311-325` is untouched.

- **MEDIUM disposed - the `/why-web4` 6-minute estimate now describes the page, without touching
  the arithmetic it is pinned to.**
  - The estimate had a **load-bearing guard**: `tldr:291-295`, *"five concepts at 2+6+5+10+5 = 28
    min ... Changing either number means changing /learn too."* So the 6 had to stay legible.
    `learn:141` becomes `"6 min + optional Q&A"` (the digit is intact; `duration` already carries
    non-time values like `"browse"` at `:337`/`:417`, and it has a single consumer at `:808`).
  - The three-short-reads box at `:493` was **not** relengthened: `time` renders in a narrow
    0.75rem right column. The scope clause went into that box's intro paragraph instead.
  - **Deliberately does not say what the 6 minutes buys.** `/why-web4:45-47` splits its own body
    into "~5 min" + "~2 min", which sums to ~7, so "6 min for the problem statement" would have
    manufactured a 6-vs-7 seam on the destination page. Scope-only framing: the estimate covers
    the read, not the questions. **No question count printed** either; the visitor's "~56" is a
    number that grows.
  - **The FAQ firehose itself stays deferred**, and the code comment says so. The split option is
    an IA change and prior sittings already deferred the curation/accordion pass as its own work;
    this fixes the label, not the page it points at.

- **Escalation filed, not carried a third time: `docs/WEB4-CANON-QUESTIONS.md` Q7, "is ATP a
  society's currency or a unit of account that is not a currency?"**
  - Both the 09:00 and 15:00 sittings listed this as a candidate escalation and neither filed it.
    Canon is split in the same directory: `core-spec/atp-adp-cycle.md:5` has ATP "managed by
    societies as their native currency"; `core-spec/inter-society-protocol.md:191` says "ATP is a
    unit of account, not a medium of exchange with intrinsic value". Those are the only two hits
    repo-wide, so it is two definitions, not a stray sentence.
  - **The entry records that the site has already asserted one side** (`atp-economics:318`,
    `glossary:378`, `navigation.ts:157`) and that a ruling the other way means changing all three,
    explicitly so the site's current wording is not mistaken for the answer. Two in-code guards
    (`atp-economics:175`, `:286-288`) already named this tension while the ledger had no entry for
    it; that gap is why this was not padding.
  - **Zero `src/` changes** (Q5's holding pattern leaves `/atp-economics` untouched pending a
    ruling, and Q7 must not contradict that). Scoped: the *external* denial narrowed by #494 is
    **not** in question, only the word for what ATP is *inside* a society. The `:18`
    "Last verified against code" date was left alone since Q1-Q6 refs were not re-checked; Q7
    dates its own refs inline.
  - Site symptom is this browse's Unanswered Question #2 plus the only qualified box on the
    understanding checklist ("mechanism yes; whether it is a currency, unresolved"). The visitor
    understood the mechanism completely and still could not name it.

### NOT taken this sitting
- **The Honest Assessment's ask to put the software-only tradeoffs into `/why-web4`'s equity
  FAQ.** Tempting (it is the one place the visitor said the site was not being straight) and
  rejected on review: FAQ 2 at `:2211` says hardware **is** required while FAQ 1 at `:1380`
  hedges it, so routing a software-only-tier link into either would settle
  [[hardware-required-seam]] by implication *on the page that hosts it*. The guard at `:693`
  forbids exactly this. Still an operator/canon call.
- **0.5-endpoint MEDIUM** (row 4): standing escalation, never assert the endpoint in prose.
- **`/tldr` opening disambiguation** (row 13): gate fired Jul-23, operator branding call.
- **Splitting the `/why-web4` FAQ onto its own page**: IA change, needs a design pass.

## Jul-29 visitor pass, second sitting (Jul-29 15:00 session) - the unblocked MEDIUMs
Log: `visitor/logs/2026-07-29.md` (same browse). Zero open PRs; the 09:00 session had already
closed all three HIGHs (#494), so this sitting took the MEDIUM/LOW queue it handed off. **Three of
the deferred rows did not survive verification**, which is most of the value of this session.

- **MEDIUM disposed - `/first-contact` taught trust as a flat single number, and "raw" was
  literally undefined for anyone with JavaScript on.**
  - Filed friction: the Trust Score counter at `:271` reads "her *raw* reputation, on a 0.00-1.00
    scale", `/trust-tensor` then opens with "Web4 doesn't reduce trust to a single number", and the
    visitor read the second as a correction of the first. First Contact is page 3 of the 5-page
    reading path, so nearly every reader forms the belief there.
  - **The sharper defect, found while verifying**: `first-contact:110-180` is the **`<noscript>`
    block**. Grepping the file, `raw` occurs at `:156` (inside noscript) and `:271` (the JS legend),
    and `effective trust` occurs **only** at `:156`. So a reader with JS enabled sees the word
    "raw" exactly once, undefined, and never sees raw-vs-effective at all. That is precisely the
    visitor's "Raw as opposed to what? Nothing on the page answers that."
  - **Grounding is on-site, so this is propagation not assertion**: `trust-tensor:779/793/807`
    already renders "Role-weighted trust: 90% / 74% / 27%" and `:875` gives the composite weights.
    Policy review recomputed all three against those weights (0.895, 0.743, 0.275) and they hold.
  - **Split deliberately, because the two halves have different homes.** The roll-up clause went
    **inline** in the bullet (that is the filed MEDIUM; hiding it would reproduce the failure). The
    raw-vs-effective definition went into a **collapsed aside below the list**. Policy review
    caught that loading both into one bullet would be three concepts in a box whose own promise is
    *"Only two numbers move while she acts. This is all you need"*, re-arming the exact vocab-wall
    friction its two existing guards (`:257-259` May-15 LOW, `:275-279` Jul-13 MEDIUM) hold down.
    [[two-fixes-in-one-pass-can-fight]].
  - "Above 0.50 / Below 0.50" at `:271` is byte-identical; the `:265-270` endpoint guard stands.

- **MEDIUM disposed - `/the-standard` now defines R6/R7, in a sibling block, NOT as a sixth
  equation term.**
  - Half the filed row is false: `onramp:119` and `:215` both render R6/R7 as a `Link` to
    `/glossary#r6` **with a full inline gloss**, so "could not click" is wrong. The true half is
    that `/onramp` step 1 routes readers to `/the-standard` to "learn the vocabulary" and
    `/the-standard` never mentioned R6/R7 at all.
  - **My first insertion point would have created a new seam while closing one.** I read
    `the-standard:130-180` as a generic primitives block. It is not: it is the **term-by-term
    read-aloud of the five-term equation** at `:93`, introduced as "Read aloud, term by term, the
    way the standard itself reads it" and guarded at `:117-127`. R6/R7 is not a term of that
    equation, so a sixth card would make the read-aloud stop matching the equation it reads aloud.
    Relocated to a sibling block after `:192`, which says so explicitly: everything in the equation
    describes what an entity *is*, R6/R7 describes what an entity *does*.
  - Canon: `web4-standard/README.md:148` and `core-spec/r7-framework.md`. Gloss reuses
    `onramp:119` verbatim rather than coining a fourth phrasing. Added `id="r6-r7"` so it is
    anchor-linkable (the site still owes a general anchor pass).

- **MEDIUM disposed - the `/day-in-web4` 100-to-350 arithmetic, and the shipped fix could not have
  reached it.**
  - This is a **read-it-and-still-filed-it recurrence**. The reconciling clause shipped
    **2026-07-16**, thirteen days before this browse, at `InteractiveWireframes.tsx:370`, carrying
    a guard comment naming the Jul-15 visitor who filed the identical friction. This visitor quoted
    the **first half of that exact sentence** in the ATP HIGH and still filed the arithmetic
    separately. [[visitor-read-it-and-still-filed-it]].
  - **I aimed at the wrong surface and policy review caught it.** I proposed editing `:597`
    ("You start with trust 0.50 and 100 ATP"). Two problems: `:597` sits inside a
    **default-collapsed `<details>`** opened at `:496`, so many readers never see it; and the
    page's load-bearing 100 is a **live ledger for the reader**, `:446`
    `netAtp = 100 + totalAtpEarned - totalAtpSpent`, rendered as a running tracker at `:696` and a
    summary tile at `:1311`. The visitor's "I started the day with 100 ATP" was **their own
    balance**, which the scenario choices cannot grow much.
  - **Why the generic fix fails**: `:370` says "an active member's working balance climbs well past
    that", but the reader's own ledger visibly does *not* climb, because the ten scenarios are
    almost entirely refund-channel events (post, reply, review, help a newcomer). The page tells
    the reader they are the protagonist and then shows them a number their own day cannot reach.
  - **Fixed at the boundary** (`:794`, the `#wireframes` section), where the reader stops being the
    protagonist, and it **names the mechanism** rather than deflecting: `atp-economics:208` item 3,
    refunds cap at what you spent, while *commissioned* work is priced by the commissioner and is
    where net gain comes from. Links to `/atp-economics#earning-atp`.
  - **Two deliberate constraints.** No computed figure: summing the choice data at `:60-210`, the
    day tops out well under 200, but the exact ceiling depends on the choice partition and printing
    a derived number on the page already filed for arithmetic would ship a new falsifiable claim.
    And the clause stays on the **budget** side of the budget-vs-wealth line (guard at
    `atp-economics:168-176`); accumulation-as-savings language is the seam that produced this
    browse's HIGH 1.
  - **First cross-page link to `#net-positive` was retargeted.** That id is on a *collapsed*
    `<details>` ("Show me the math") whose open behaviour is driven by an on-page `onClick`, so an
    inbound fragment lands a reader on a collapsed summary. Every other cross-page atp anchor
    targets a `<section>`. Retargeted to `#earning-atp`, whose visible heading is literally "How Do
    You Actually Earn ATP Back?".

- **LOW disposed - `/what-could-go-wrong` risk 3, and the paragraph turned out to be wrong about
  the death rule.**
  - The filed suggestion ("say threshold, not ceiling") **was already shipped**: the heading at
    `:229` reads "The trust **threshold** punishes the wrong people" and `:237` says "a 0.5 trust
    threshold". The only "ceiling" on the page (`:512`) is the hardware cap, used correctly.
    [[visitor-deferred-low-check-shipped-first]] - so only the residual was taken: the page carries
    **two different 0.5s** 270 lines apart, and the software-only ceiling happens to also be 0.50.
    One parenthetical at the first of the two now distinguishes them.
  - **The real find, flagged by policy review**: `:238-239` said *"Fall below it and you're out,
    your agent 'dies' and must be reborn with reduced resources."* Wrong in **both** directions
    against the canonical rule (`first-contact:156`): crossing below is recoverable and only
    *staying* below is fatal, **and** trust death is *permanent* rather than followed by rebirth
    (rebirth follows **energy** death). Same flat-mechanism-absolute class #494 closed this morning,
    sitting two lines from the clause I was opening.
  - **Correcting it needed a compensating clause or it would have laundered a risk into a
    mitigation.** The accurate rule is gentler in the common case, and this is a page whose job is
    to state risks honestly. The compensating clause is an entailment, not new canon: a scoring
    **false positive is by construction a sustained condition**, so "only staying below is fatal"
    protects the wrongly-scored user *least*. Added to "Why it's real".
  - **The mitigation paragraph had the same category error** and would have contradicted the
    repaired risk two paragraphs later: `:254` said "rebirth means you get another chance, you're
    not permanently banned, just set back." Replaced with the recourse that actually applies to
    false positives, grounded at `karma-consequences:857-876`: an appeal path and cool-down period
    are required, no single rating decides your standing, penalties recover instead of branding you.
  - Says nothing about which side of 0.50 the line falls on; guard comment added matching `:568`.
    Mitigation (4) in risk 8 ("the ceiling caps high-trust roles, not basic participation") is
    untouched, so [[hardware-required-seam]] is not deepened.

- **LOW disposed - `/atp-economics:259` ADP plural, and my first rationale for rejecting it was
  wrong.** I proposed rejecting the whole row on the grounds that every singular is a grammatical
  singular that #388 permits. True at `:236`, `:529` and `:1648` ("an ADP (Allocation Discharge
  Packet)"). **Not true at `:259`**, a naming clause that is plural for ATP and singular for ADP
  *in the same sentence*: "**Allocation Transfer Packets** is what ATP *is* ... and the same holds
  for ADP (... lends its name to the **Allocation Discharge Packet**)". That is exactly the
  asymmetry the visitor spotted. One word changed; the three grammatical singulars stay.

### NOT taken (unchanged from the 09:00 handoff, plus reasons)
- **0.5-endpoint MEDIUM**: blocked by [[trust-05-endpoint-canon-conflict]]. The visitor asks the
  page to say which side the endpoint falls on, which is the escalation itself.
- **`/why-web4` 6-min estimate vs ~56 FAQ questions**: the split option is IA-scoped; the label
  option is a one-word edit on a page nothing else in this pass touches. Deferred, not rejected.
- **`/running-now` "4 machines, whose?"**: needs a deployment fact from `../hestia`. Getting it
  wrong prints a false user-scale claim on the page the visitor praised most for scrupulousness.
- **`/tldr` opening disambiguation placement**: [[onramp-word-overload-identity]] gate **FIRED
  Jul-23**, escalated to an operator branding call. Do not reword a fourth time.
- **`atp-economics` "Is ATP a currency or an energy budget? Both"**: candidate escalation for
  `docs/WEB4-CANON-QUESTIONS.md`, carried over from 09:00. Canon itself is split
  (`atp-adp-cycle.md:5` "native currency" vs `inter-society-protocol.md:191` "unit of account"),
  so the site cannot resolve it by rewording. Still open.

## Jul-29 visitor pass (Jul-29 09:00 session) - all three HIGHs: the flat-absolutes class
Log: `visitor/logs/2026-07-29.md` (fresh, browse ran 05:00, session fired 09:02). Zero open PRs.
Understanding "good", would return and recommend. The visitor's Honest Assessment named the defect
**class** directly, and it is worth quoting because all three HIGHs are instances of it:
*"one page making a clean, quotable, absolute claim, and another page quietly not honoring it ...
This site's honesty muscle is very strong on maturity and comparatively weak on mechanism. The
maturity claims are all hedged beautifully. The mechanism claims are stated flat, and the flat
ones are the ones that broke."* Per [[visitor-numbers-integrity-class-signal]] that licenses
falsifiable fixes, and each HIGH below is a flat mechanism absolute meeting its real exception.

- **HIGH disposed - `/atp-economics` "no market, no price" was falsified by our own wireframe.**
  - The page said, flatly, "no market, no price" (`:218`, `:266`) and that peer transfer "prices
    nothing, so there is **no buyer, no seller, and no exchange rate**" (`:271`). The site's own
    Market wireframe (`InteractiveWireframes.tsx:300+`, rendered on `/day-in-web4`) has a named
    seller, a 350-ATP price, a buyer and an escrow. The only reconciliation lived on
    `/day-in-web4`, the page that *creates* the problem, not the page that issues the denial.
  - **Ground truth licenses the wireframe, so the PROSE was the defect, not the demo.**
    `web4-standard/core-spec/inter-society-protocol.md:191`: *"ATP is a unit of account, not a
    medium of exchange with intrinsic value."* `:199`: societies *"that wish to embed market
    mechanisms in their ATP policies (price discovery, auctions, etc.) MAY do so."* Policy review
    independently confirmed §4 is general and not cross-society-scoped (§4.4 is separately headed
    "Implication for Cross-Society Exchange"), so in-society pricing is licensed.
  - **My "the guard comments are stale" reasoning was an overreach and policy review killed it.**
    The comments at `:174-175`/`:207` scope the **buy/sell/speculate** clause specifically, which
    this fix preserves verbatim. The edit targets different claims. No staleness declaration was
    needed; per [[opposite-intents-in-code-comments]] the recorded scope was narrowed instead.
  - **The site already held this position, which I had not checked**: `glossary:378` reads *"ATP is
    a society's unit of account, not a currency"* (also `navigation.ts:157`). So this was
    **propagation, not a new assertion**, which materially lowered the risk.
  - **Canon is SPLIT on the currency word** (`atp-adp-cycle.md:5` calls ATP a society's "native
    currency"), so the fix is scoped to the **external** claim only: no outside market, no price
    against money, no cash-out, no speculation. `atp-economics:282` ("This is not a currency"),
    `glossary:378`, `navigation.ts:157` and the wireframe guardrail are all untouched. "No exchange
    rate" was **not** re-asserted, because inter-society §4.4 has societies negotiating ATP_A:ATP_B.
  - **The distinction that does the work**: "You can't buy or sell ATP" stays true and unchanged.
    Buying a camera *priced* in ATP is a different act from buying the ATP itself.

- **HIGH disposed - the "three answers to device loss" was one OMISSION, not a contradiction.**
  - The visitor quoted `/what-could-go-wrong` as "Recovery from total device loss is an unsolved
    problem". The actual line was already scoped: *"(all devices destroyed, no witnesses
    available)"*. With the qualifier restored it is the residual case and does **not** contradict
    `lct-explainer:1026-1040`, which carries the complete tiered answer. **Verify before acting
    caught this**; treating it as a three-way reconciliation would have been wrong work.
  - The real defect: `identity-constellation:287-292` described only the quorum path and said
    nothing about one device or two. Silence next to a confident "e.g. 2 out of 3" is what
    produced the impression of a third, contradicting answer. Fixed by propagating the tier list.
  - **The 2-device LOW turned out to be answerable from canon**, which I had assumed it was not:
    `multi-device-lct-binding.md:989-990` (`default_recovery_quorum`) returns `device_count` for
    `device_count <= 2`, so with two devices the quorum is *both*, and losing one drops you to the
    vouching path. Absorbed into the same list. Canon's 0.4 software-only ceiling was **not**
    imported; the site's 0.50 calibration stands.
  - `/what-could-go-wrong`'s residual line was rewritten to lead with what *is* answered and name
    the residual as residual. Legibility fix, no new claim.

- **HIGH disposed - the software-only fresh-start hole is now stated out loud.**
  - `lct-explainer:1027`: a software-only user who loses their device "starts over from zero with a
    fresh identity." The headline promise ("bad behavior follows you", "no fresh starts") is at
    `tldr:94`, `first-contact:295`, `learn:316`, `karma-consequences:706/787`, and
    `your-internet:142` names the **enforcement mechanism**: "Creating a new identity means starting
    from scratch with **a new device**". The guarantee is anchored in hardware; the software-only
    tier has no anchor. Canon agrees: `multi-device-lct-binding.md:155` "Software anchors ... Cannot
    be sole anchor for recovery quorum". Nothing on the site disagrees, so per
    [[entailment-vs-canon-call]] this is authorized prose, not an escalation.
  - **Landed on a sentence that was already wrong**, per policy review, rather than appended:
    `what-could-go-wrong:~527` said recovery is "also slower at the lower ceiling", which
    *understates* it (`lct-explainer:1040`: there is "nothing to recover *to*").
  - **Scoped to unresettability / anti-Sybil ONLY, deliberately.** It says nothing about whether
    hardware is required to *participate*: that is the standing [[hardware-required-seam]]
    escalation and a third page asserting either side would deepen it. Mitigation (4) on that same
    card ("the ceiling caps high-trust roles, not basic participation") was left intact and neither
    `why-web4` affordability FAQ was touched. Phrasing anchored to the hedge already shipping at
    `lct-explainer:2196` ("a Sybil resistance strategy, not a Sybil prevention guarantee") rather
    than coining a third framing.

- **NOT taken, blocked by a standing escalation.** The MEDIUM at friction row 4 (software-only
  ceiling 0.50 equals the survival line 0.50) asks the page to say *"which side the endpoint falls
  on"*. That is exactly [[trust-05-endpoint-canon-conflict]] (`>` vs `>=` at 0.5), whose standing
  rule is **never assert the endpoint in prose**. Cannot be answered as the visitor asks. The
  HIGH-3 prose was written to sit beside this without drifting into it.

- **Deferred MEDIUMs/LOWs for the next sitting** (none re-litigated, all fresh this browse):
  first-contact "raw"/single-number vs `/trust-tensor`'s opening correction (their suggested
  one-clause fix looks right); `/day-in-web4` 100 to 350 arithmetic; R6/R7 listed in `/onramp`
  step 1 but absent from `/the-standard` and page-less; `/why-web4` 6-min estimate vs ~56 FAQ
  questions; `/running-now` "4 machines" whose-machines; ADP singular on `/atp-economics` vs plural
  in glossary; `/tldr` opening disambiguation placement; "ceiling" vs "threshold" wording on
  `/what-could-go-wrong` risk 3.

## Jul-28 visitor pass, fourth sitting (Jul-29 03:00 session) - the two remaining LOWs
Log: `visitor/logs/2026-07-28.md`. Fired at 03:01, **before** the 05:00 browse, so no fresh log;
the Jul-28 log was the freshest and its HIGHs and unblocked MEDIUMs were already cleared by
#490/#491/#492. Zero open PRs. Took the two actionable LOWs, one of which was the 21:00 session's
explicit named handoff. Both are now closed.

- **LOW disposed - the MRH decay-rate question is resolved, and the #339 guard is STALE, not violated.**
  - The 21:00 session deferred this *for investigation* with a precondition: *"resolve which rate
    `/trust-neighborhood` should carry, then add the parenthetical."* The blocker was that memory's
    #339 guard forbids saying "0.7x per hop" on the MRH page while `trust-neighborhood:588` says
    exactly that.
  - **Answer: keep 0.7.** The guard existed because the **MRH Explorer** rendered
    `0.85^n x 0.9^(n-1)` (0.85/0.65/0.50/0.38) on the same page as a 0.7 claim. That widget was
    retired in the Jul-15 rebuild. Verified independently by policy review: no `MRHExplorer` in
    `src/`, no surviving formula, no `/mrh` route. There is no on-page contradiction left for the
    guard to protect against, and `:588` already shipped the phrasing, so this edit does not newly
    violate anything.
  - **Ground truth checked in `../web4`, and it does not license either rate as universal**:
    `web4-standard/GLOSSARY.md:204` gives *"Default: 0.9 per hop"* and
    `mrh_rdf_implementation.py:53` sets `decay_rate: float = 0.9`, while the 0.85 is an **edge
    probability** (`:591`), composed at `:59` as `probability * decay_rate**(distance-1)` - which is
    precisely the retired Explorer's formula. So the site's 0.7 is a 4-Life teaching calibration and
    `trust-neighborhood:629` already says so in those words, with a link to
    `/why-web4#faq-mrh-messaging`. **None of these `../web4` numbers went onto the page**; putting
    them there would be a new canon assertion. Investigation only.
  - **The shipped edit is a PLACEMENT fix, not an absence fix.** Compounding was already stated at
    `:640` (*"Every hop costs 30% of the remaining trust"*, where "remaining" encodes it) and
    `:644-648`, but those sit two cards below the ring where the visitor actually read
    0.70/0.49/0.34. Added the arithmetic to the ring caption at `:588` using only numbers already
    rendered at `:568/:573/:578`: *"and it compounds: 0.70, then 0.70 x 0.7 = 0.49, then
    0.49 x 0.7 = 0.34."* No rate claim, `:629` untouched, no third phrasing of the idea.
  - **Memory `mrh-decay` entry should be updated**: the "never say 0.7/hop on the MRH page" guard is
    superseded. The two-rates fact is still true; the prohibition is not.

- **LOW disposed - `/onramp` now holds one piece order, and it is ascending scale.**
  - Visitor: *"The four pieces are ordered Hub->Hestia->Hardbound on the landing page and
    hestia->Hub->hardbound on /onramp"* (they flipped back twice), suggesting
    personal->community->enterprise everywhere.
  - **My fix direction was backwards and I nearly shipped it.** I counted order-bearing surfaces,
    got 7 hub-first to 3 personal-first with all three of the minority on one page, and proposed
    normalizing `/onramp` to hub-first. Policy review rejected that: two of those three blocks are
    not listings. `onramp:98-127` is a **scale ladder** (uppercase Personal / Community / Enterprise
    under the heading "One substrate, three scales"); reordering it yields Community / Personal /
    Enterprise, which reads as an error, not a different order. `onramp:207-248` is ordered **by
    friction**, stated on the page at `:215` ("The lowest-friction, hands-on entry").
  - **Verifying that, I found two more order-bearing lines neither of us had counted**, both
    hub-first, in "Dependency direction": `:136` renders the literal set `{ hub, hestia, hardbound }`
    and `:162` says "The hub, hestia, and hardbound each take these as dependencies". So `/onramp`
    was **4-vs-3 against itself**, not 2-vs-3.
  - **The right test is not surface count but which blocks have an articulable REASON for their
    order.** Exactly two do, and both are personal-first. Every hub-first block was a bare listing,
    and `:136` is set notation, which asserts order-independence and so cannot be evidence of a
    hub-first principle. I then checked the landing page for a competing principle: it has none
    (`page.tsx:20-55` renders the same three scale words in non-scale order). **The 7-vs-3 majority
    was measuring inherited arbitrariness, and the visitor's own suggested direction was right.**
  - **Shipped**: the four arbitrary listings reordered to ascending scale (`:9` header comment,
    `:18` metadata description, the intro prose, `:136`, `:162`) plus the maturity list. The
    diagram, "Pick your scale" and the CTA were already ascending and were left alone.
  - **The `:232` forward-reference risk disappeared with the reversal** ("Members connect to it
    using hestia" keeps its back-reference because hestia still precedes the hub). But the reversal
    **inherited the same shape** at the maturity list: hestia's entry read *"with hub integration
    end to end"*, which naming hestia first would expose. Repaired by **relocating** that claim to
    the hub's own bullet, where hestia is a back-reference. One claim, no duplication.
  - **Ordering label added to the intro, and deliberately narrow.** *"That is the order this page
    uses throughout: the same four pieces every time, smallest scale first."* The filed symptom is
    **set-identity doubt** (*"to check I was looking at the same four things"*), not order
    preference, so the label answers that and stops. It must **not** be extended to characterize how
    other pages order the pieces: that would advertise a divergence to readers who never noticed it
    and would go stale when the IA pass lands. Guard-commented in place and at the top of the file.
  - **No second cue on the CTA**, checked and ruled unnecessary: `:328-351` already carries its
    scale words inline ("hestia (personal)", "the hub (community)", "hardbound (enterprise)"), so a
    reader arriving there cold sees a self-labelling ladder. A second cue would restate one page's
    claim on two surfaces of that same page ([[canonical-sentence-only-collapses-scattered-claims]]).
  - **Also absorbed: the untreated journey friction at `2026-07-28.md:37`** (*"I am one person. I
    assumed hestia. The page didn't confirm that for me; I inferred it from the word 'Personal.'"*).
    Review flagged that a hub-first reorder would have **re-armed** this by demoting the solo
    reader's own case ([[two-fixes-in-one-pass-can-fight]]). The reversal keeps hestia first, and
    "Pick your scale" now confirms it outright rather than leaving it to be inferred: *"If you are
    one person, or one agent on your own machine, this is your scale."*

### Named residual (the visitor's literal suggestion, NOT done)
**Site-wide normalization to ascending scale remains open.** `/onramp` is now internally consistent
but diverges from five other surfaces, so the cross-page difference is **labelled, not eliminated**.
Doing it properly means `src/lib/navigation.ts`, `src/app/page.tsx`, `/tldr`, `/running-now`,
`/manifest`. This is **IA-scoped, not cosmetic**: `navigation.ts` drives `Breadcrumbs` and
`SiteSearch`, so reordering it moves those too. Deliberately not bundled into a LOW fix.
Per [[visitor-dont-pre-empt-retest-contingency]], the correct trigger is a **fresher** log
re-filing the divergence; the label is a cheap probe, not a dodge.

### Deliberate non-actions (Jul-29, 03:00)
- **Three MEDIUMs still escalation-blocked**, unchanged from the 21:00 session: ATP-zero death
  naming (`/how-it-works`'s second trigger brushes standing Q1); T3 weights
  ([[t3-weights-canon-conflict]]); `/hub` 4-lab.io/fleet joinability (ground truth is only in the
  **private** `dev-hub`, [[dev-hub-is-private-never-link]]).
- **Footer "onramp" collision LOW: not touched** (gate fired Jul-23, operator branding call).
- **ATP/ADP plural LOW: still correctly dismissed.** Policy review re-verified independently this
  session (`terms.ts:53/64`, `glossary:160/161/364/412`, `web4-explainer:81` all plural; no singular
  "Allocation Discharge Packet" exists in `src/`). **Third session to check this. Stop rediscovering it.**
- **`/onramp` maturity list is incomplete, and this was NOT authorized this pass.** `:299` promises
  *"Here is where each piece stands"* and then lists **three** pieces, omitting the core standard
  that the same page's intro counts as one of the four. Material exists (`running-now:78` badges it
  Spec + Reference). Unfiled by any visitor. Review raised it and explicitly withheld authorization.
  Related and worth folding into the same pass: badging in that list is uneven (only the hub carries
  a `MaturityBadge`; hestia and hardbound are prose-only), and reordering moved the one badge down a
  row. Candidate for a future session.

## Jul-28 visitor pass, third sitting (Jul-28 21:00 session) - the first five minutes
Log: `visitor/logs/2026-07-28.md`. Third sitting on one log. The 09:00 session cleared the three
HIGHs, the 15:00 session the recourse pair. Took the two remaining MEDIUMs that are not blocked on
an escalation, both on the beginner's entry path: the maturity badges on `/tldr` and the buried
reading path. Same shape as the two HIGHs fixed earlier today (funnel gaps), one page earlier.

- **MEDIUM disposed - the maturity ladder is now ranked where a beginner first meets it.**
  - **My triage was wrong twice and policy review caught both.** I filed this as a fresh single
    recurrence and as a pure wording gap. Neither held. `git log -S` puts the #487 gloss live on
    **2026-07-24 22:04**, and it then **missed twice**: `2026-07-27.md:22` (*"Nothing on this page
    tells me what 'Reference' means... I did not find the legend until `/running-now`"*), filed as a
    LOW against `/tldr` at `:111` and never treated, then Jul-28 as a MEDIUM (*"with no gloss on
    this page"*). Jul-25 read it and praised it; Jul-27 and Jul-28 looked straight at it and
    reported it **absent**.
  - So [[visitor-read-it-and-still-filed-it]] **splits**: its precondition is *demonstrably read*,
    and that holds for Jul-25 and fails for the two recurrences. Two residuals, not one.
    - **Prominence.** The gloss was `text-gray-400 text-sm` prose sitting above four bold bordered
      cards, explaining badges that live *inside* the cards. It read as a caption. It now renders
      the actual `MaturityBadge` chips in a bordered box, the **same form** as the
      `/running-now#badge-key` legend visitors do find and call *"unambiguous"* and *"a good, honest
      three-step ladder"*. Form, not word count, was doing the work.
    - **Rank.** *"whether Running was better than Reference or just different... the site didn't
      tell me here, I inferred it."* The gloss defined each badge and never ranked them.
  - **Shipped on two surfaces, and that is not a violation of
    [[canonical-sentence-only-collapses-scattered-claims]].** `tldr:114-116` carries a shipped
    in-code invariant: its wording is *"a strict subset of the /running-now legend so the two
    surfaces cannot drift apart."* This morning's precedent forbids birthing a claim on two surfaces
    **with no established home**; here one surface is already *declared* derivative of the other, so
    single-surface shipping would have violated the invariant either way. Review ruled explicitly:
    canonical sentence lands on `/running-now#badge-key`, `/tldr` carries a **literal** subset.
    Verified clause by clause after the edit.
  - **Two overclaims the fix would otherwise have manufactured**, both caught by review, both with
    their refutation on the same page:
    - *"stages of one progression"* implies a piece occupies **one rung**. It does not:
      `MaturityBadge.tsx` says "a concept can carry several" and `running-now:78` renders
      **Spec + Reference** on the core standard three sections below the key. The sentence now
      orders the **badges**, not the pieces, and states the multi-badge case with that example.
    - A bare *"later is better"* licenses "hestia is more finished than hardbound". `running-now:238`
      badges hardbound **Reference** and `:241` calls it *"a usable, actively-hardened layer"*;
      `tldr:224` says the same. So: **how far a piece has travelled, not how good it is**, with
      hardbound named. This also absorbs the untreated Jul-27 LOW at `2026-07-27.md:112` (*"Usable
      and Reference felt like they were pulling in different directions"*).

- **MEDIUM disposed - the reading path is routed to where beginners actually are.**
  - Visitor: *"Found this last, which is funny, because it's the path I should have taken first."*
    At minute 60 of a 60-minute session. Confirmed by grep: `/learn` had **three** inbound links,
    all in places a beginner is not (`coherence-framework:966`, line 1086 of `/first-contact`,
    `ConceptSequenceNav`). Landing page: none. Footer: none. [[promise-without-routing]] with the
    routing missing outright rather than mis-keyed.
  - **The path was already the IA and was never labelled as one.** `navigation.ts`'s `'Start Here'`
    group is *exactly* the `/learn` beginner path in the same order. So `/learn` moved to the **head
    of that group** as its map. Head, not tail: appending it last in a five-item list is the burial
    being complained about. My scope note claimed the group only renders in the mobile drawer;
    **wrong**, review caught it. `app/page.tsx:224` renders the whole tree as the landing page
    "Explore" map, which is the surface that actually fixes this. Knock-on, accepted: `getCategory`
    feeds `Breadcrumbs` and `SiteSearch`, so `/learn`'s breadcrumb and search category both move.
  - **Titled "The Reading Path", not "Learn".** Review flagged a collision I had not seen: the
    header CTA says "Start here" and goes to `/tldr`, the nav group is `'Start Here'`, and
    `learn:121` titles its own path *"Start Here: What Is Web4?"*. Moving `/learn` in under the name
    "Learn" would have made three "Start here" surfaces pointing at two destinations. The new title
    says **map**, not step one, so the count stays at two.
  - **`/tldr` hands off, above the grid, not inside it.** The visitor's own alternative suggestion.
    `tldr:239` is a `sm:grid-cols-3` of three lateral jumps; a fourth card would have been a 3+1
    orphan **and** would have re-created the exact burial one page earlier. The handoff is a
    full-width primary block and the grid is demoted to *"Or jump straight to:"*.
  - **Seam found on the destination and closed.** `/learn` leads with *"New here? Start with these
    3... ~13 minutes total"* while its path below is five pages totalling 28 minutes. Naming 28
    minutes on `/tldr` would have contradicted the first thing a reader sees on arrival. They are
    **nested, not competing**: the three are steps 1-3. `/learn` now says so, so both numbers
    survive and `/tldr` can quote either. Both numbers are sourced from `/learn`; changing one means
    changing both files (guard-commented).

### Deliberate non-actions (Jul-28, 21:00)
- **Three MEDIUMs deferred, all blocked on something real, not on time.** ATP-zero death naming
  (residual is `/how-it-works`'s *second* death trigger, trust below 0.5, which brushes standing
  escalation Q1); T3 weights universal-or-per-role ([[t3-weights-canon-conflict]], standing);
  `/hub` 4-lab.io/fleet joinability (the 09:00 session recorded that the canonical realness sentence
  is **not** license to answer it, and the ground truth cannot be sourced from the **private**
  `dev-hub`, per [[dev-hub-is-private-never-link]]).
- **ATP/ADP plural LOW dismissed with no code change, verified not deferred.** Per **#388** the
  expansion is plural on definitional surfaces and **grammatical singulars stay**.
  `atp-economics:230` (*"an ADP (Allocation Discharge Packet)"*) and `:253` are grammatically
  singular and correct as shipped. The residual is that the rule is invisible to a reader, which is
  not worth a page edit. Logged so a fourth session does not rediscover it as novel.
- **Footer "onramp" collision LOW: not touched.** Gate fired Jul-23; it is an operator branding call
  ([[onramp-word-overload-identity]]).
- **MRH compounding LOW: deferred for investigation, not skipped.** `trust-neighborhood:588` reads
  *"Trust decays 0.7x per hop"*, and the #339 guard in memory forbids exactly that phrasing on the
  MRH page (two decay rates exist; the MRH Explorer used `0.85^n x 0.9^(n-1)`). The Explorer was
  retired in the Jul-15 rebuild, so the guard may be **stale rather than violated**. That needs
  checking before anyone adds the visitor's requested parenthetical to a line that may itself be the
  defect. **Next session: resolve which rate `/trust-neighborhood` should carry, then add the
  parenthetical.**
- **Prominence half of the badge fix is knowingly a bet.** Two readers reported an on-screen gloss
  as absent; the treatment is a form change, not more words. If a **fresher** log still reports the
  badges unglossed on `/tldr`, the next lever is making the badge itself the affordance, which on
  `/tldr` means solving the nested-anchor problem first (the badges sit inside `<Link>` cards).
  Do not re-diagnose this from scratch.
- **`/learn`'s H1 is still "Learn Web4 Progressively"** while its nav title is now "The Reading
  Path". Left deliberately (no restructure of a page the visitor called good); note it if a log
  reports the mismatch.

## Jul-28 visitor pass, second sitting (Jul-28 15:00 session) - recourse
Log: `visitor/logs/2026-07-28.md`. The 09:00 session cleared the three HIGHs and handed over the two
recourse MEDIUMs as **one defect with two symptoms**. Took both. The visitor's Unanswered Question 6
is *"If the trust score is wrong about me, what do I do?"*, and the site's answer to that was
routed to a page that did not contain the word.

- **MEDIUM disposed - `/karma-consequences` now answers the question it was already being asked.**
  Visitor: *"this is the page a worried person reads, and it is the page with no mention of appeals
  at all."* Verified before acting: `grep "appeal"` on that page returned **zero hits in 945 lines**,
  while **two** links on `/what-could-go-wrong` sent the worried reader there for exactly that
  (L262 *"for how appeals work"*, L848 *"appeals process"*). Textbook [[promise-without-routing]],
  with the routing intact and the destination empty. The site's most credible page was handing its
  most worried reader a dead end.
  - New `#recourse` section (the page had **zero** `id` attributes before this; that is the one
    anchor this fix needs, **not** the general anchor pass, which is still owed). Both inbound links
    repointed at it. Pointer from the header callout for readers who scroll rather than follow a link.
  - Deliberately a **signpost, not a fourth exposition**: `/why-web4#faq-wrongful-penalty` is the de
    facto canonical home and is good. The block states the status, the spec requirement, and hands
    off explicitly (the handoff has to be what keeps L262's promise, since the block does not
    re-tell the mechanism).
- **MEDIUM disposed - `/how-it-works` "What Prevents Unfair Rules?" now carries a maturity clause.**
  - **The visitor's quote does not exist.** *"Appeals mechanisms and exit rights prevent tyranny"*:
    `grep -rni "tyrann" src/` → zero hits. And the appeals block they were prescribing a fix for
    (L1382-1395) **already carried the honest status they asked for**. So the filed premise was
    wrong and softening that block would have been a second dose of a shipped treatment.
  - The real residual, found by reading what sits *next to* it: the visitor merged the qualified
    False Positives block with the **"What Prevents Unfair Rules?"** block three lines below, which
    asserted four governance mechanisms (exit rights, authority decay, transparency, federation
    competition) as flat operative facts with **no qualifier at all** and closed on a confident
    open-source-fork analogy. [[visitor-read-it-and-still-filed-it]]: the missing clause, not a
    restructure. Grounded in the shipped realness phrasing (no public network open to outside
    members yet), so no new maturity claim was minted.
- **Accuracy defect found inside the block being edited: "(109 integration checks)" removed.**
  Policy review called it fabricated. It was **not**: `web4/docs/history/STATUS-2026-02.md:1109`
  records *"109/109 checks"* for a formal appeals system. But the artifact it counts is
  `web4/archive/reference-implementations/sal_appeals_mechanism.py`, archived **2026-04-11** by
  commit `65cd5488` *"Archive reference implementation sprawl"*, into a directory whose README calls
  its contents obsolete. Not a fabrication, a **stale pointer wearing a precise number**, which on a
  live page reads as ongoing rigor. Deleted with **no replacement figure** (the count does not even
  reproduce: `grep -c "check("` gives 108).
  - Knock-on caught by review: with the number gone, *"formally specified"* was left modifying the
    multi-tier process, and **the spec corpus does not specify that process**. Grep
    `web4-standard/core-spec/` for "appeal" and you get only SAL 5.5/5.6 and
    `appealPath: "defined_by_law"` in `entity-types.md`. Rewritten so "the requirement is in the
    standard" attaches to the requirement.

### Canon grounding (verified 2026-07-28, guard-commented in both files)
- `core-spec/web4-society-authority-law.md:221`: *"Negative adjustments **MUST** include **appeal
  path** and **cool-down period**."* `:239` extends it to reversible enforcement rungs (the kinetic
  class is carved out as parse-don't-enact, so the site does not generalize past trust adjustments).
- `core-spec/entity-types.md:345, :434, :454`: the field is `appealPath: "defined_by_law"`. **My
  first draft said the requirement is in the standard "rather than left to each community" and that
  is backwards**: the standard requires the route to exist, and expressly delegates what the route
  *is* to each society's law. Caught in review. The corrected version is also the better answer:
  "every society must give you a way back, and each one defines its own."
- **No enforcement claim.** My first draft said "the reference implementation rejects it".
  `AuditAdjustment.is_valid()` (`federation.py:264-268`) has **no callers** outside
  `test_federation.py`; there is no apply path in the SDK. Asserting enforcement as the fix for a
  MEDIUM about *asserting things as settled* would have been self-defeating. Dropped.
- Ordering stated deliberately (entailment, not quotation, per [[entailment-vs-canon-call]]): the
  appeal path must exist when the penalty is recorded, it does not have to be heard first. Without
  this the block would collide with `/what-could-go-wrong` L838-852, where a law-oracle freeze is
  immediate and the appeal follows.

### Deliberate non-actions (Jul-28, 15:00)
- **Spec clause shipped on ONE surface, not two.** I proposed propagating it verbatim to
  `/how-it-works` too, citing the #488/#490 canonical-sentence precedent. Review overruled: that
  precedent collapses a claim **already scattered in divergent phrasings**. This claim appeared on
  **zero** pages, so it is absent, not scattered, and birthing it on two surfaces at once copies the
  precedent's form while inverting its function. Propagate later only if a log shows the need. This
  also discharged a [[two-fixes-in-one-pass-can-fight]] risk: adding an operative-sounding
  requirement to `/how-it-works` while softening the block three lines below would have re-armed the
  reading the softening exists to defuse.
- **`atp-economics:1164` "An appeals mechanism **exists**"** (flat present tense, no qualifier) is
  the same defect class as the MEDIUM fixed here, on a page outside this scope. **Deferred, logged
  so it is not rediscovered as novel.**
- **The multi-tier appeals process ships on three surfaces** (`glossary:1455`, `how-it-works:1383`,
  `manifest:133`) sourced from an **archived** reference implementation, not the standard. Only the
  `/how-it-works` instance was corrected here, because it sat inside the block being edited. The
  other two need their own pass.
- Four Jul-28 MEDIUMs and four LOWs still open: ATP-zero death naming (still the
  [[visitor-read-it-and-still-filed-it]] candidate; residual is `/how-it-works`'s second death
  trigger, and it brushes the standing 0.5-endpoint escalation), T3 weights universal-or-per-role
  (standing escalation), `/hub` 4-lab.io/fleet joinability, `/tldr` tier gloss, `/learn` buried
  under Going Deeper, piece ordering, ATP/ADP plural mismatch, footer "onramp" collision, MRH
  compounding parenthetical.
- `/karma-consequences` general anchor pass still owed (this added one anchor, deliberately).

## Jul-28 visitor pass (Jul-28 09:00 session) - unblock the funnel, one sentence for "is this real"
Log: `visitor/logs/2026-07-28.md`. Understanding **good**, 6 of 7 boxes checked. The unchecked
box is "what is real and runnable today" - and the visitor read `/running-now`, the page dedicated
to that box, and still left unsure "because four other pages contradicted it." Three HIGHs, all on
one axis: *what is real, and what can I do today?* All three treated.

- **HIGH disposed - `/hestia`'s day-one path is fillable.** The visitor stopped here, 40 minutes in:
  *"I got as far as line four and stopped. What URL?"* plus no install step, plus *"the page tells
  me it's a desktop app and then hands me a CLI."* Three gaps at the exact end of the funnel.
  - **The first draft of this fix was wrong and policy review caught it.** I proposed "build from
    source" as the primary path. `gh release view v0.0.3 --repo dp-web4/hestia` lists **four
    prebuilt CLI binaries** (macOS, Linux x2, Windows). Leading with `cargo build` would have
    invented a Rust-toolchain prerequisite on the one page whose HIGH is "the site got me excited
    then blocked me" - the same failure in the opposite direction. Now: download the binary
    (primary), source build (alternative), and the honest exception where it belongs - the
    **desktop app** is the piece with no package; shipped artifacts are the CLI binaries + an
    Android APK. That keeps upstream's "the app is the front door" framing while explaining why
    the walkthrough is a terminal session.
  - **`<url>` resolved three ways**: everything above the divider needs no hub (solo hestia is the
    normal case, not a crippled one); no network you can join yet; the URL is one you or your group
    stand up, pointed at the **public** `dp-web4/4-hub`.
  - **Near-miss worth recording**: my proposal sourced hub claims from `../dev-hub`. `gh repo view`
    confirms dev-hub is **PRIVATE** and its README says it holds potentially patentable WIP.
    Pointing public site readers at it would have been a real disclosure error. Ground hub claims
    in `web4/hub/docs/QUICKSTART.md` and name `4-hub`, which the site already links twice.
  - **Gate caveat added** (reviewer recommendation, taken): this page now converts browsers into
    people who will run `hestia delegate grant <agent> --role administrator`, which is already on
    the page. Upstream's loudest caveat (hestia README L9-20, **above the fold**) is that the policy
    gate "stops accidents, not adversaries" with a measured two-environment-variable bypass. The
    Honest-status box did not carry it. Shipping an install path while withholding that would be
    dishonest by omission. Now carries it with the issue #49 link.
- **HIGH disposed PARTIALLY - one canonical sentence for "is any of this real yet".** The visitor
  collected four answers in one session and said an apparent contradiction about *realness* costs
  this site more than it would cost a marketing site, because honesty is its main credibility asset.
  Ships **verbatim** on three surfaces (`/how-it-works`, `/day-in-web4`, `/hestia`), guard-commented,
  per the death-sentence precedent: *"The spec is written, the code is installable today, and there
  is no public network open to outside members yet."*
  - `/how-it-works` L86 headline was *"Nothing here is live"* - contradicted by **its own
    sub-paragraph** three lines down ("no live *network* with real users") and flatly refuted by
    `/running-now`'s badge definitions. Now: *"No network you can join yet - the present tense below
    is the model talking."* **"You can join" is load-bearing**: `/hub` says *"This isn't hypothetical:
    we run one"*, so a bare "no public network" would re-create the contradiction one page over.
    The headline had to keep **both** jobs; a network-only narrowing would have dropped the
    speculative-present-tense warning and created a fresh overclaim.
  - `/day-in-web4` L509 *"None of this is downloadable yet"* was false against `pip install
    web4-core`; the visitor said it "made me distrust the install lines," the one thing they had
    correctly believed. Scoped to the phone-level consumer app the section actually narrates.
  - **Why PARTIAL**: `/hub` and `/tldr` were both named in this HIGH and are **not** touched.
    The `/hub` joinability MEDIUM stays open, and the canonical sentence is **not** license to
    answer it.
- **HIGH disposed - the CI² arithmetic that refuted the LCT promise.** `/coherence-index` states
  `Effective trust = T3 × CI²`; `/lct-explainer` reassures software-only readers (ceiling exactly
  0.50) against the 0.5 survival line **using raw T3 and never mentioning CI**. The visitor did the
  arithmetic: any CI < 1.0 puts them permanently below the line.
  - **I proposed escalating this and was wrong.** Policy review found the answer **already ships
    verbatim on three pages** (`first-contact` ~156, `glossary` ~1191, `how-it-works` ~608), landed
    by **PR #447**, which re-landed exactly this clause after #444 was rejected for asserting the
    *endpoint*: *"The number compared is raw trust, not effective trust (raw × CI²) - effective
    trust sets your karma tier, not whether you live."* It was missing from precisely the two pages
    the visitor collided. **Propagation, not a canon call.** Escalating would have parked the
    session's highest-value fix behind a false "canon is silent" label.
  - Now on five surfaces. The `>` vs `>=` endpoint is untouched and stays Q1.
- **Canon ledger re-verified** (`docs/WEB4-CANON-QUESTIONS.md`). Its header read *"Last verified
  against code: 2026-07-14"* - **one day before** the Jul-15 rebuild retired `/aliveness`,
  `/karma-journey` and ~34 other routes. **Q1 and Q2 were both citing deleted files.**
  - Q1 is **narrowed, not vacuous, and not closed**: its `isAlive`/`rebirthEligible`/`agency`
    predicates and SurvivalGame are gone, so the prose-vs-code contradiction that motivated it no
    longer exists. The one surviving 0.5 predicate (`first-contact` ~515/~528, `trust_after >= 0.5`)
    governs **feature access, not aliveness**, and **agrees** with the prose. Two guards recorded:
    it must not become a backdoor endpoint ruling, and first-contact's `>=` must **not** be
    "aligned" to the retired `>` (different quantity; that would manufacture the very conflict the
    rebuild removed). Holding pattern unchanged - web4 still defines no aliveness threshold.
  - Q2's only executable proxy (karma-journey's deep-collapse branch) is gone too, which
    *strengthens* the question rather than resolving it.
  - The stale comment at `lct-explainer` ~1136 that cited the deleted file is rewritten to **record
    the reversal** per [[opposite-intents-in-code-comments]], not silently deleted.

### Deliberate non-actions (Jul-28)
- **Six MEDIUMs, four LOWs untouched**: appeals absent from `/karma-consequences` (the page a
  worried reader actually opens); `/how-it-works` "appeals prevent tyranny" vs
  `/what-could-go-wrong` "hasn't been tested"; ATP-zero "death" naming; T3 weights 40/35/25
  universal-or-per-role; `/hub` 4-lab.io/fleet joinability; `/tldr` tier gloss; `/learn` buried
  under "Going Deeper"; piece ordering; ATP/ADP plural mismatch; footer "onramp" collision; MRH
  compounding parenthetical. **Next session's queue.** Note the death MEDIUM recurs *after* #488
  shipped a canonical death sentence: that is a [[visitor-read-it-and-still-filed-it]] candidate
  needing the missing clause identified, not the same treatment twice.
- **`/hestia` software-only tier line** still deferred - collides with the standing
  hardware-required seam. This pass added **no** claim about whether hardware is required.

## Jul-27 visitor pass, second sitting (Jul-28 03:00 session) - read the equation aloud
The 21:00 session cleared all three Jul-27 HIGHs and both glossary MEDIUMs (#488, merged).
Four MEDIUMs and three LOWs remained. This pass took the two that sit on `/the-standard`,
because they are one defect with two symptoms: **the canonical equation was displayed and
never read aloud**. They are also the visitor's Unanswered Questions #4 and #6, and RDF is
one of the two things they singled out in the Honest Assessment as cheap to fix early.

- **MEDIUM disposed - RDF now has a definition, and the link that promised one now reaches it.**
  Visitor: *"RDF is never expanded or explained ... MCP gets a gloss; RDF gets nothing."*
  Verified before acting per [[visitor-deferred-low-check-shipped-first]], and the premise
  needed a correction that changed the fix: RDF *is* expanded on `/trust-neighborhood` L931,
  but inside a block labelled *"For developers · RDF, SPARQL, graph internals · skippable"*.
  The real defect was sharper than "missing": **`/the-standard` linked the word "RDF" to
  `/glossary`, and the glossary had no RDF entry.** Textbook [[promise-without-routing]].
  - Canon supplied the whole fix including the *why*, so no canon call was needed:
    `web4-standard/GLOSSARY.md` L36-40 defines RDF and answers the visitor's actual question
    (*"why is it in the equation that defines the whole thing?"*) with "trust is a typed
    relationship, not a property".
  - Shipped: `/glossary#rdf`, the `/the-standard` link repointed at it, an inline expansion in
    the hero, and RDF in the read-aloud below.
- **MEDIUM disposed - the equation is now read aloud, term by term.** Visitor: applying the
  page's own operator gloss (`/` = "verified by"), *"T3/V3 reads as trust verified by value, a
  stronger and different claim than the parallel-companions framing every concept page uses.
  I could not tell if I was misreading the notation."*
  - Fixed by **importing canon's own reading** rather than by ruling on the operator.
    `GLOSSARY.md` L15 renders the pair as "Trust/Value tensors *contextualized by* Markov
    Relevancy Horizon": one compound noun, the `/` never read aloud. The page now says that
    descriptively. The three operator glosses are left **verbatim and unreconciled**.
  - Found while editing: the prose being replaced read MCP aloud and then jumped to *"the
    internal structure is LCT + T3/V3*MRH + ATP/ADP"*, **silently dropping RDF from its own
    read-aloud of a five-term equation**. That is very likely why RDF went undefined for so
    long: the page's only walkthrough skipped it.
- **NEW escalation, Q6** in `docs/WEB4-CANON-QUESTIONS.md`: what does the `/` assert? Canon
  publishes `/` = "verified by" *and* reads both `/` pairs as compound nouns, in the same
  files. Both readings stated, no winner picked. The spec does not contradict the
  operator-table reading (`t3-v3-tensors.md` §3 is titled "Value Through Verification"), which
  is exactly why a session must not settle it in visitor prose.
- **MEDIUM disposed as a side effect - the glossary defined neither equation-leading term.**
  Checking the visitor's *comparative* claim ("MCP gets a gloss; RDF gets nothing") showed the
  comparison was false at the glossary: it contained **zero occurrences of "MCP"** too. Both
  entries added, both added to "Acronyms at a glance".
  - That block carried an in-code decision (~L138) deliberately excluding "research-tier"
    initialisms. Per [[opposite-intents-in-code-comments]] the rationale was **rewritten to
    record the reversal**, not silently contradicted: MCP and RDF are the first two terms of
    the equation on a Start Here page, so they are entry-level *by position in the reader's
    path*, not research-tier by subject. The separate R6 exclusion at ~L500 still stands.
  - Deliberately NOT marked `data-essential`: the "Essential only" toggle's term set is its own
    documented decision and this pass did not reopen it.
- **Seam closed while here**: `/trust-neighborhood` glossed RDF triples as
  "subject-**verb**-object"; canon says "subject-**predicate**-object". One wording now on all
  three surfaces. The `/trust-neighborhood` RDF block also had no `id` (the page has only two
  anchors), so the glossary's "see a real Turtle example" link would have been another
  promise without routing. The `id` went on the `<details>` element, not the Turtle block
  inside it, since a fragment link into collapsed `<details>` is not reliably revealed across
  browsers: land the reader at a labelled door rather than at hidden content.

### Deliberate non-actions (Jul-27 MEDIUMs/LOWs still open)
- **`/why-web4` FAQ packaging** (40+ entries, no shortlist) and **`/lct-explainer` length**
  (~15 screens on the beginner's first stop): both recurring, both need a design pass rather
  than a copy fix. Own session each.
- **`/hestia` software-only tier line** (Jul-27 MEDIUM). Real and probably safe, but it needs
  its own collision check against the standing hardware-required seam before anyone writes it.
  Next session's first candidate.
- **All three LOWs.** Flagging one for diagnosis rather than re-fix: the `/tldr` badge-legend
  LOW recurs *after* #487 shipped badge work that went live Jul-25, and the Jul-27 browse still
  filed it. That is a [[visitor-read-it-and-still-filed-it]] candidate; it needs the missing
  clause identified, not the same treatment applied twice.
- **Item cut by policy review**: a proposed sentence saying both `/` pairs pair "a claim with
  its check" (T3 claimed / V3 verified, ATP spent / ADP receipt). Rejected as a disguised canon
  call, and the reviewer found three independent reasons the wording was actively wrong:
  `t3-v3-tensors.md` §1.1 calls tensors "evidence, not verdicts" so T3 is not a *claim*;
  `/glossary`'s V3 entry says V3 "scores the work, not the worker"; and `/atp-economics`
  L464-467 records a June-2 visitor fix that deliberately made **confirmation, not the receipt**,
  the refill trigger, which "ADP = the receipt proving it was spent" would have undone. It also
  fought the fix it shipped alongside: telling readers `/` pairs a claim with its check leads
  them straight back to "trust verified by value". Escalated as Q6 instead.

## Jul-27 visitor pass (21:00 session) - the seams pass, three HIGHs
First pass on the Jul-25, Jul-26 AND Jul-27 browses (all three were untriaged; no content PR
had merged since #487 on Jul-24). Two of the three Jul-27 HIGHs had already recurred across two
separate browses, and every one of them is the defect class the visitor named in their own
Honest Assessment: *"the individual pages are each carefully maintained, and the seams between
them are not. Every contradiction I found is between two pages that are both individually well
written."* Per [[visitor-numbers-integrity-class-signal]] that licenses a falsifiable-defect
pass, not a rewording pass. Every item below was falsifiable.

- **HIGH disposed - one canonical sentence for death** (Jul-25 HIGH + Jul-27 HIGH).
  `/how-it-works` L566 read *"Death in Web4 is not a timeout or suspension"* while
  `/first-contact` said Alice's *standing is suspended* and `/atp-economics` said *"closer to a
  suspended license reinstated than a clean slate"*. Two-against-one, and the outlier's wording
  predates #484's softening. Verified before acting: `/first-contact` L153 already carries the
  COMPLETE canonical rule (energy death vs trust death, both named), and its in-code comment
  says *"Canonical rule sentence below is IDENTICAL on all three pages - keep it verbatim if
  editing"*. The other two pages named there are the RETIRED sim pages, so `/how-it-works` was
  a fourth surface that never received it. Now reused **verbatim** on `/how-it-works` and in the
  new glossary entry, cross-linked both ways.
  - **Kept verbatim on purpose**: that sentence threads the 0.5-endpoint escalation correctly
    (*crossing* vs *staying*, **raw** vs effective trust). Paraphrasing it would assert the `>`
    vs `>=` endpoint that Q1 says is unsettled. If you edit these three surfaces, edit all three.
  - `/first-contact` gained its **first `id` anchor** (`#what-triggers-death`) so the cross-links
    can land on the definition. Same structural gap `/running-now` had pre-#487.
- **HIGH disposed (narrowed) - the worked example no longer falsifies its own rule** (Jul-27).
  Visitor: *"If death is ATP hitting zero, nobody in the flagship example actually died."* True.
  The obvious fix was to copy `/atp-economics`'s qualifier ("died **naturally**"), and the policy
  reviewer correctly **rejected** it: grep of `web4-standard/` and `docs/` returns NO canon for a
  natural death / bounded life / lifespan (the LCT lifecycle is NASCENT->ACTIVE->SUSPENDED->
  REVOKED), and `/atp-economics` writes "naturally" for only two of its four lives, so the
  sibling page is not clean ground truth. Naming a third mechanism would be **inventing canon**.
  - Shipped instead: a shared `EndOfLifeCaveat` component (one definition, rendered at BOTH
    places the reader meets the numbers, so they cannot drift) stating the gap without filling
    it: *"none of these lives ends at 0 ATP ... What else ends a life is not settled."*
  - **Numbers deliberately untouched**: ending them at zero would break the karma model (karma
    is defined on both pages as a portion of **final** ATP), which is canon on both.
  - Escalated as **Q5** in `docs/WEB4-CANON-QUESTIONS.md`, which also records a divergence the
    original proposal had missed *inside the lines it planned to edit*: the two worked examples
    run **three vs four** lives, put the ATP crisis in a different life, end at **165 vs 140
    ATP**, and disagree on whether karma carry-forward is **full or reduced**. `/atp-economics`
    is deliberately untouched pending the ruling, so the divergence stays visible rather than
    half-papered-over.
- **HIGH disposed - the TPM claim now names its artifact** (Jul-26 HIGH + Jul-27 HIGH).
  `/lct-explainer`: TPM2 binding *"has been validated on real hardware ... really is tested on
  silicon"*. Landing, `/running-now`, `/onramp`, `/hestia`: *"not yet validated on-device"*.
  The visitor called this *"the one claim class the whole site stakes its credibility on"* and
  said it cost *"disproportionate credibility"*. **Both claims are true, about different
  artifacts**, and no page said which. Ground truth: `web4/docs/history/STATUS-2026-02.md`
  items 11 + 22 record the **core standard's** TPM2 work validated on a real Intel TPM 2.0 on
  2026-02-19 (9 tests, EK chain, CRL checked, valid through 2049); **hardbound's** Rust/Jetson
  on-device integration runs against mocks. Scope named on all three claiming surfaces
  (`/lct-explainer`, `/running-now`, `/why-web4` L689), with `#hardbound-status` and
  `#hardware-tiers` anchors added so the two surfaces point at each other.
  - **Naming hazard, do not simplify this**: "hardbound" is overloaded. web4 also ships a
    **Python** `implementation/reference/hardbound_cli.py` with a TPM2-bound root that WAS
    exercised on real silicon. A bare *"hardbound's binding is not validated"* would be a NEW
    inaccuracy. The copy says **hardbound's own ... Rust/Jetson on-device** integration.
  - This sits ALONGSIDE the June-14 caveat on `/lct-explainer`, which scopes a different axis
    (hardware layer proven vs trust/economic dynamics simulated). The visitor read that one and
    filed anyway: [[visitor-read-it-and-still-filed-it]]. The missing clause was always *which
    artifact*, so the existing axis was left intact rather than restructured.
- **MEDIUM disposed - the glossary defines death** (Jul-25 MEDIUM + Jul-27 MEDIUM). Visitor:
  *"Death is the single most vivid word on this site ... and it is the one term the glossary
  does not define."* New full-width `#death` card at the head of Membership Lifecycle, carrying
  the canonical sentence de-styled but otherwise verbatim, plus rebirth/karma and three
  cross-links. This is where the confused reader actually lands.
- **MEDIUM disposed - glossary ATP is a budget again** (Jul-27). *"A charged value token"*
  contradicted `/atp-economics` (*"budget, not wealth"*, *"energy that flows, not tokens that
  accumulate"*). Now reuses that page's own framing.
- **NOT touched, with reasons (do not re-litigate without fresher signal)**:
  - **Jul-25 HIGH: software-only 0.50 ceiling vs aliveness defined as "trust > 0.5"** (which
    would make software-only users permanently unalive). Sits on **both** the 0.5-endpoint (Q1)
    and hardware-required escalations. The policy reviewer flagged it as *"the single most
    tempting wrong fix adjacent to this work"*. Explicitly excluded, not forgotten.
  - The two `/why-web4` affordability FAQs (the hardware-**required** seam). Different question
    from validation scope; the Jul-25 log carries a MEDIUM explicitly requesting the forbidden
    fix. Edits on that page were restricted to L689.
  - `/why-web4` FAQ length (40+ questions) and `/lct-explainer` length (~15 screens): both real,
    both recurring, both **packaging/restructure passes**, not seam fixes. Own session each.
  - **RDF never explained** (Jul-27 MEDIUM): real and actionable, and arguably the cheapest
    remaining win. Deferred only to keep this pass one-shaped. **Good candidate for next session.**
  - `T3/V3` operator-gloss MEDIUM: touches canonical-equation semantics; escalation candidate,
    not a copy fix.
  - `/onramp` routing MEDIUM (Jul-25 + Jul-26): #486 already treated this; retest-gated.
  - All LOWs, including the Jul-26 FAQ topic-index miscount (13 links under "Trust & Reputation
    (12)") which is cheap and worth grabbing next session.
- **Retest gate (Jul-28 05:00+)**: (1) does a reader who meets "death" on `/how-it-works`,
  `/first-contact`, `/atp-economics` or `/glossary` now get the same two-mechanism answer? (2)
  does the worked example still read as falsifying its own rule now that the caveat names the
  gap? If it does, that is signal FOR Q5, not license to answer it on-site. (3) does the TPM
  claim still read as a contradiction now that each surface names its artifact? If it recurs
  after this, the residual is not the wording: escalate as a question about whether the site
  should carry a single canonical maturity ledger that all pages transclude.

## Jul-24 visitor pass (21:00 session) - the two remaining actionable LOWs
Fourth and last pass on the Jul-24 05:00 browse. All three MEDIUMs were already disposed or
escalated (#485 x2, plus the operator branding call) and the checklist gap was disposed (#486),
so the queue was down to the four LOWs. Two were gated (below); these two were taken.

- **LOW disposed - the maturity badges are now armed at first read, and the key is deep-linkable.**
  Visitor: *"each piece has a parenthetical label (Reference), (Reference), (Running), (Reference).
  At this point I don't know what Reference vs Running means. There's no inline key here; I only
  learned the definitions two pages later on Running Now."* Verified before acting: `MaturityBadge`
  **does** define every tier, in a native `title=` tooltip, so the definition ships at every badge
  on the site. It is **hover-only**, so it does not exist for a reader on mobile or for anyone
  reading rather than pointing. The visitor's literal claim ("no inline key") is true for text.
  Second finding, mechanically identical to #485's R6/R7 root cause: the full three-badge key the
  visitor praised **does** exist (`/running-now` hero) but `/running-now` had **zero `id` anchors in
  the whole file**, so nothing could send a reader to it. Fix: (1) `id="badge-key"` +
  `scroll-mt-20` on `/running-now`, wrapping the *framing sentence* as well as the three rows so an
  anchor arrival lands on explanatory text; (2) a one-line written key on `/tldr` immediately above
  the four cards, glossing only the two tiers that appear there, worded as a **strict subset of the
  `/running-now` legend** ("built and runnable", "runnable is not the same as running in
  production", "deployed and operational today", "in day-to-day use" are all legend-verbatim) so the
  two surfaces cannot drift, with the link naming the **third** tier so a `Spec` badge met later is
  not a surprise; (3) a quiet "what does that tag mean?" link beside the landing page's single badge.
  - **Deliberately NOT done**: landing's "What is runnable today ->" CTA still points at
    `/running-now` (page top), **not** the anchor. Arriving at `#badge-key` scrolls the reader past
    that page's R&D disclaimer, which is the honesty paragraph the visitor called the backbone.
  - **Deliberately NOT done**: no general anchor pass on `/running-now` (17 inbound links, now one
    anchor) and none on `/hestia`. Both are still owed and are their own session.
  - **Deliberately NOT done**: no `MaturityBadge` API change. Making the badge itself the link would
    nest anchors inside `/tldr`'s `<Link>` cards (invalid HTML).
- **LOW disposed - the landing eyebrow no longer stacks three abstractions.** Visitor: *"'Agentic AI
  governance' is three abstract words in a row ... they read like a conference-panel title, not
  something that tells a stranger what they're looking at. The body paragraph below did the real work
  of explaining. It should arguably be the subheading."* The phrase appeared exactly once site-wide,
  so no seam. Now: *"A proposed open standard for proving what an AI agent did, on whose authority,
  and by what rules."* That is the body's own triple, same order, same words, so the eyebrow sets up
  the payoff two lines later. `"A proposed open standard for ..."` stays the opening and the verb
  stays a purpose clause: no present-tense capability claim that Web4 proves anything today. The
  slot also **drops `uppercase`** (the other page eyebrows are short all-caps labels; a sentence this
  long in all-caps wraps to three lines and reads worse than the jargon it replaced).
- **NOT touched, with reasons (do not re-litigate without fresher signal)**:
  - *"Die & Reborn reads alarmingly literal"* -> **retest-gated behind #484**, which merged AFTER the
    05:00 browse and reworded exactly this seam (ATP=0 as recoverable suspension). Per
    [[visitor-dont-pre-empt-retest-contingency]], no second treatment until a fresher log recurs.
  - *"Software identity capped at 0.50 reads as browser-only users can never be trusted; add a link
    back to the Why-Web4 equity FAQ"* -> **blocked by the hardware-required standing seam** declared
    by the 15:02 session. There are **two** such FAQs and they disagree (`#faq-tpm-affordability`
    says identity *requires* secure-element hardware; `#faq-affordability` treats it as conditional).
    Choosing one to link is picking a side, which is what the seam forbids. This is also why the
    visitor's Q#2 is still open. Unblocking it needs the reconciliation, not a cross-link.
  - *"onramp" word-overload* -> operator branding call, gate already FIRED.
- **Retest gate (Jul-25 05:00+)**: (1) does a reader who meets a `Reference` or `Running` badge on
  the landing page or `/tldr` now learn what the tag means without leaving the page, and does the key
  link land on the definition? (2) does the landing page's first line read as plain English? If the
  badge-label friction recurs after this, the residual is **not** the gloss and **not** the link:
  escalate as a component question (should `MaturityBadge` render its own visible affordance rather
  than each page carrying a key), since the hover-only `title=` is the real structural gap.

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
