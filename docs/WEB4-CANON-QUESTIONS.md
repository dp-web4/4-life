# Web4 Canon Questions — 4-Life's Standing Escalations

**What this is**: 4-Life is the visitor-facing laboratory for Web4. When teaching a concept
exposes an ambiguity or contradiction in Web4 canon, the site's policy is to *escalate, not
copy-fix* — a session must never settle a spec question unilaterally in visitor prose. Until
this file existed, those escalations lived only in scattered session logs and memory files,
invisible to web4 sessions. This is the single ledger.

**How to use it (web4 side)**: each OPEN entry states the exact question, why 4-Life cannot
answer it locally, the holding pattern the site maintains meanwhile, and what a ruling
unblocks. Rule on the question in the spec / test-vectors (that's where 4-Life reads canon
from: `web4-standard/test-vectors/`), and the next 4-life session can import it.

**How to use it (4-life side)**: before touching any surface named below, check the entry.
If a visitor re-asks one of the OPEN questions, that recurrence is signal FOR the escalation —
it is not license to answer on-site.

Last verified against code: **2026-07-28** (all file:line refs re-checked that day).
Partial re-check **2026-07-30**: Q8's refs were verified when filed, and Q1's *live* evidence was
re-checked and has **changed polarity** (see the correction bullet inside Q8). Q2-Q7 refs were not
re-checked on that date and still carry their 2026-07-28 verification.
Partial re-check **2026-08-04**: Q12's refs were read line by line when filed, and Q11's
`mrh-tensors.md:210-214` cite was re-read at the same time and still holds. Q1-Q10 were not
re-checked on that date.

> **Re-verification note, 2026-07-28.** The previous date on this line was 2026-07-14 - *one
> day before* the Jul-15 rebuild retired `/aliveness`, `/karma-journey` and ~34 other routes.
> Q1 and Q2 were both citing files that no longer exist. Their evidence sections are corrected
> below. **No holding pattern changed and no question was closed**: the site losing the code
> that contradicted its prose is not the same as web4 answering the question, and both
> questions still turn on canon that does not yet exist.

---

## Resolved by canon citation

These were once open conflicts; web4 canon answers them. Recorded so future sessions cite
instead of re-litigating.

### R1. T3 composite weights — canon is Talent 0.4 / Training 0.3 / Temperament 0.3

- **Canon**: test-vector **t3v3-001** (`web4-standard/test-vectors/t3v3/tensor-operations.json`)
  states `composite = talent*0.4 + training*0.3 + temperament*0.3` with weights and a worked
  example. Spec `core-spec/t3-v3-tensors.md` §10.2 invariant table carries the same row.
- **Site state**: prose already matches on /trust-tensor (the composite-vs-role-weighted paragraph
  above the role widget, and the T3 Tensor Structure block under `#t3-composite`), /how-it-works
  (the rebirth-eligibility blend), and /why-web4 (the 0.5-threshold FAQ entry). Named by surface,
  not line: the four integers cited here before had all drifted onto unrelated lines by Aug-06.
  The two live sim engines (karma-journey:171, trust-tensor-explorer:184) deliberately use
  0.3/0.3/0.4 (temperament-highest) with a shipped rationale box.
- **⚠️ Standing restriction — NOT reopened by this citation**: on-page reconciliation of the
  sims remains **REJECTED** (policy review, PR #442; bridged instead in PR #448: each sim owns
  its weighting as *that simulation's* fixed simplification). The citation settles *which
  ordering is canon* — it does not license changing the engines or printing opposite orderings
  side-by-side on a beginner page.

### R2. T3 per-dimension update factors — canon is Talent ×1.0 / Training ×0.8 / Temperament ×0.6

- **Canon**: test-vector **t3v3-003** `dimension_factors: {talent: 1.0, training: 0.8,
  temperament: 0.6}`; spec §2.3 ("each dimension's delta is scaled by its factor"), §10.2 table.
- **Site state**: matches (trust-tensor:352, how-it-works:808, and the update-rule code block on
  trust-tensor cites "from spec test vectors"). This closes the deferred item "T3 scaling
  ×1.0/0.8/0.6 rationale — needs canon grounding": the *numbers* are canon. The prose *rationale*
  for why those particular factors is still absent from the spec — a nice-to-have, not a blocker.

### R3. Talent decay — canon is NO decay through inactivity (protocol invariant)

- **Canon**: spec §2.3 ("a normative protocol property, not a tunable parameter"), §10.2 row
  "Talent MUST NOT decay through inactivity", §10.4 (names 0.995/period as spec-violating),
  test-vector **t3v3-012**. web4 commit 5cb536bf (2026-07-13) brought both Rust engines into
  conformance; the Python SDK was already correct.
- **Site state**: imported 2026-07-14 (this PR) — trust-tensor decay section + why-web4
  month-off/youthful-mistakes FAQs now teach Talent no-decay; Training 180d / Temperament 30d
  remain 4-Life calibration (spec §2.3 explicitly allows societies to configure those two).
- **Known lag**: the vendored `web4-trust-core` WASM (src/lib/wasm/) predates the upstream
  engine fix and still contains the old Talent-decay path — but `applyDecay` is never called
  from site code (verified 2026-07-14), so the violation is dormant. **Follow-up**: re-vendor
  the WASM from post-5cb536bf web4-trust-core at the next convenient point.

---

## Open questions for web4

### Q1. The aliveness endpoint: is "alive" `trust > 0.5` or `trust >= 0.5`?

- **The conflict as originally filed**: the site's prose canon defines trust death as "falls
  *below* 0.5 *and stays there*" - strictly-below + sustained, which entails exactly-0.50 is
  alive. Every executable predicate on the site said the opposite: `aliveness/page.tsx`
  `isAlive` (:235 `trust > 0.5`), `rebirthEligible` (:367), `agency` (:562) - at exactly 0.50
  the entity is dead/non-agent, and the on-page SurvivalGame reachably landed on exactly 0.50
  and printed DEAD.
- **⚠️ Evidence corrected 2026-07-28: the question is NARROWED, not vacuous, and NOT closed.**
  All three predicates above are **gone**: `/aliveness` and `/karma-journey` were retired in the
  Jul-15 rebuild and `SurvivalGame` greps to zero hits repo-wide. Of the three prose surfaces
  originally named (First Contact / Karma Journey / Aliveness) only **First Contact** survives;
  the canonical sentence now also ships on `/glossary` and `/how-it-works`.
  - **So the prose-vs-code contradiction that motivated Q1 no longer exists on the site.**
  - The one 0.5 predicate that survived the rebuild is `first-contact/page.tsx` (~515, ~528):
    `trust_after >= 0.5 ? "Full access" : "Restricted (trust < 0.5)"`. It governs **feature
    access, not aliveness**, it reads `>=` (opposite polarity to the deleted aliveness checks),
    and it **agrees** with the prose's restriction clause ("crossing below 0.5 restricts your
    features right away"). It is correct as written.
  - **Two guards.** (1) This is evidence for a future ruling, not a ruling: the surviving `>=`
    must not become a backdoor endpoint call in site prose or in the holding-pattern line below.
    (2) Do **not** "align" first-contact's operator to the retired `>` - it is a different
    quantity, and changing it would manufacture the very conflict the rebuild removed.
- **Why it is still open**: the ruling requested was never "which of our two surfaces wins" - it
  was "does canon define the endpoint at all". It still does not. 4-Life would still be inventing
  the answer.
- **Why it matters**: the software-only LCT trust ceiling is exactly 0.50, so the endpoint
  decides whether a software-only identity at its ceiling can be an agent at all ("dead on
  arrival?" — a visitor's top HIGH, 2026-07-09).
- **Verified 2026-07-14**: web4 core-spec contains **no aliveness threshold at all** — the
  0.5 alive/dead line is 4-Life's pedagogical construct ("inspired by phase transitions").
  So this is not "look up the canon"; the ruling requested is **create canon or delegate**:
  (a) define the aliveness predicate endpoint in the spec (with a test vector), or (b) state
  explicitly that aliveness thresholds are implementation/society-defined, in which case
  4-Life will make its own endpoint call deliberately and document it.
- **Holding pattern**: site prose stays endpoint-silent ("strictly below + sustained"). **Both
  directions are forbidden, not just one**: never "at or above 0.50 is alive/full-access" (the
  `>=` side) and never "above 0.50: full access" (the `>` side, because its complement puts
  exactly-0.50 outside full access). Guard comments at lct-explainer callout + First Contact
  legend. PR #444 was rejected 3× for asserting an endpoint; do not repeat.
- **⚠️ Evidence added 2026-08-06: third instance, and the guards are not holding.** The Aug-06
  visitor filed this as one of four HIGHs and as Unanswered Questions 1 and 2: "Every user starts
  [at 0.50] and the site defines only 'above' and 'below'." They found three phrasings and could
  not tell which governed them. Two were endpoint-silent and correct (`/trust-tensor` "crossing
  below 0.5 restricts", `/what-could-go-wrong` "the minimum bar"). The third,
  `first-contact/page.tsx:271`, read **"Above 0.50: full access"** and had done for a month.
  - It was written **four lines below the guard comment banning endpoint assertions**, because
    that guard enumerated only the `>=` phrasing by name and so read as permission for the other.
    The same half-guard shape appeared in this ledger's own holding-pattern line above, now
    corrected.
  - This is the **third deletion of the same prohibited assertion**: `lct-explainer:1307` (PR
    #497), `lct-explainer:1399` (Jul-30 pass), `first-contact:271` (this entry). #497 already
    argued that a surface asserting the endpoint inside the file that bans it is "the strongest
    signal yet that Q1 needs a ruling rather than more guard comments". A third instance, on a
    different page, under its own guard, is stronger still: **the prohibition is not stable under
    editing**, because the honest thing to write next to "starts at 0.50" is a status for 0.50,
    and every author reaches for one.
  - **Deleted, not rewritten**, per the #497 precedent that removing a prohibited assertion is
    not asserting its negation. The site is now endpoint-silent everywhere. But silence is what
    the visitor is filing against, and it costs a real comprehension gap: the software-only trust
    ceiling is exactly 0.50 (**Q8**), so the reader most affected is told what happens below the
    line, nothing about at it, and cannot determine their own status. Deliberately kept:
    `first-contact:~733` ("Trust climbed back above 0.5, restrictions lifted"), which narrates
    Alice's recovery from 0.48 rather than stating a regional rule.
  - **This entry records evidence, not a ruling.** 4-Life still declines to answer. The ask is
    unchanged from above: define the endpoint in the spec with a test vector, or state explicitly
    that it is society-defined, in which case 4-Life will make and document its own call.
- **Unblocks**: closing the Jul-9 H1 residual properly. (The original second item, "letting
  SurvivalGame's verdict and the prose agree at the boundary", is **moot as of 2026-07-28**:
  SurvivalGame was retired in the Jul-15 rebuild. Kept visible rather than deleted so a web4
  reader can see the ruling's value shrank, and by how much.)

### Q2. How long is "stays below"? (sustained-collapse duration)

- **The question**: the canonical death sentence says trust death means *staying* below 0.5 —
  but no engine anywhere implements a duration. Visitors ask "how long is 'remains'?" - any
  number the site printed would be invented.
- **⚠️ Evidence corrected 2026-07-28.** This entry cited karma-journey's deep-collapse proxy
  (`effectiveComposite < 0.05`, `page.tsx:396`) as "the only executable trust-death branch in
  the repo". `/karma-journey` was retired in the Jul-15 rebuild, so that branch is gone and
  **there is now no executable trust-death branch on the site at all**. This *strengthens* the
  question rather than resolving it: the duration was already unimplemented, and now nothing
  approximates it either. Unchanged: any number the site printed would still be invented.
- **Ruling requested**: should the spec define a sustained-collapse window (or a
  recovery-opportunity semantic, e.g. N witnessed actions rather than wall-clock), or declare
  it society-configurable with a recommended default?
- **Holding pattern**: the site says "sustained — a collapse, not a single stumble" and stops.
- **Unblocks**: the deferred "how long is *remains*" MEDIUM (gated on PR #447).

### Q3. V3 scorer integrity: what stops recipients from lying (collusion)?

- **The question**: V3 (Valuation/Veracity/Validity) is computed from confirmations by the
  people who received your work. Standing visitor question ("Unanswered Q7"): what stops a
  scorer from lying, or a ring from mutually inflating each other?
- **Site state**: /value-tensor answers with existing prose (who scores what, witnesses,
  cross-validation) — the visitor accepted it on the 2026-07-10 browse, so the gate is armed,
  not fired. Spec-side, anti-gaming text exists (witness diversity, temporal distribution,
  cross-validation, diminishing returns t3v3-007) but there is no consolidated anti-collusion
  mechanism for V3 scoring specifically.
- **Ruling requested** (when the gate fires — i.e., a visitor re-asks with the current answer
  visible): a canonical statement of the collusion-resistance model for V3 confirmations.
- **Holding pattern**: do not invent anti-collusion claims in prose; the site states only
  what the spec supports today.
- **2026-08-01 addendum: second consecutive near-miss, gate still ARMED and UNFIRED.** The
  Jul-31 visitor re-asked this twice, as their Unanswered Q4 ("who stops the people scoring
  quality from lying? Nothing I read explained what prevents a small friendly group from
  confirming each other's mediocre work") and Q5 (how the mechanism tells three founders from
  a three-person ring). They did **not** open `/value-tensor`: their own journey lists twelve
  pages and it is not among them, so the retest condition ("re-asks with the current answer
  visible") is still unmet. The Jul-30 visitor missed it the same way. Do not read either log
  as the gate firing.
- **What the Aug-01 session did and deliberately did not do**: it closed only the
  *measurement seam* between two numbers, `/atp-economics` "three founders who confirm each
  other's work can recharge from day one" vs `/what-could-go-wrong` Risk 4 "coalitions become
  unprofitable at 2-3 members", by saying at each read point what that number measures. It
  asserted **no** collusion-resistance mechanism. The reason is worth recording, because it
  sharpens the question this ledger is holding: **neither of the site's two candidate signals
  discriminates at N = 3.** "Work that others later also confirmed" is degenerate when the
  others are the remaining two founders, and Risk 4's `P = 1 - (1-p)^N` presumes each
  conspirator is an independent draw against witnesses outside the coalition, which a founding
  group does not have. Both surfaces now say so as a limit.
- **Note for whoever answers this**: `reciprocity density` (`atp-economics:961`,
  `why-web4:1671`) is a *permitter* on both live surfaces, the reason a small group is enough.
  Visitors keep guessing it as the discriminating signal. Any ruling should say explicitly
  whether it is one, because the site currently cannot use it that way without contradicting
  itself.

### Q4. Should the spec define a trust-death predicate for simulations?

- **The question**: sims need *some* executable death rule. 4-Life's karma-journey uses
  `effective < 0.05` (deep collapse) + `ATP <= 0`, deliberately not implementing the taught
  raw-0.5 line (verified unreachable there — every CI-negative path drags raw trust below 0.5
  first). Aliveness's SurvivalGame uses first-crossing of 0.5 and owns it as a simplification.
  Each sim owning its own proxy works, but every new interactive re-opens the question.
- **Ruling requested**: a recommended reference predicate for implementations (even
  non-normative), so sims can cite instead of invent.
- **Holding pattern**: each sim owns its simplification in visible prose + in-code comments
  (PRs #440, #443, #447).

### Q5. What ends a "life" other than ATP = 0?

- **The question**: the site teaches two, and only two, ways an entity's life ends: energy
  death (ATP reaches zero, recoverable through karma rebirth) and trust death (raw trust
  falls below 0.5 and stays there, permanent). Both worked examples on the site then have
  agents whose lives end at neither. Is there a third path (a bounded term, a natural end of
  life, a voluntary exit), or are the examples simply modelling something the standard does
  not define?
- **Why 4-life can't answer locally**: grep of `web4-standard/` and `docs/` (history
  excluded) for natural death / bounded life / lifespan returns nothing relevant. The LCT
  lifecycle is NASCENT -> ACTIVE -> SUSPENDED -> REVOKED and defines no term limit. Naming a
  third mechanism in visitor prose would be inventing canon, which this ledger exists to
  prevent.
- **Site symptom (Jul-27 visitor HIGH)**: *"If death is ATP hitting zero, nobody in the
  flagship example actually died. And life 3 says 'ended' rather than 'died', which made me
  think the label choice was deliberate, which made me more confused rather than less."*
  The two worked examples also disagree with each other, which is the same gap seen from a
  different angle:

  | | `/how-it-works` "A Complete Example" | `/atp-economics` "Follow One Agent's ATP Journey" |
  |---|---|---|
  | Number of lives | 3 | 4 |
  | Which life is the ATP crisis (drop to 15) | Life 2 | Life 3 |
  | Final ending | "Ended strong: **165 ATP**" | "Ended strong: **140 ATP**" |
  | Karma carry-forward | full ("Died with 145 -> Reborn with 145 (full karma bonus)") | reduced ("Reborn with **85 ATP** (reduced from the crisis)") |
  | Wording for a non-zero ending | "Died with 145 ATP" | "Died **naturally** with 145 ATP" (Lives 1, 3) but plain "Died with 130 ATP" (Life 2) |

  Note the karma row is a second, independent divergence: whether karma is the full final
  ATP or a reduced portion of it is not settled between the two pages either. A ruling on
  the death question does not automatically settle it.

  **Jul-30 addendum: there is a third model, and it is on the page that OWNS karma.**
  `/karma-consequences:629-641` states an inheritance formula that neither worked example
  can satisfy:

  ```
  next_life_atp = base_atp + (karma * karma_multiplier)
    base_atp = 100, karma_multiplier = 2
  ```

  Because `base_atp` is fixed at 100 and karma is a *behavior score* (that page's own
  sources: quality contributions, trust building, collaboration, longevity; minus spam,
  trust violations, community rejection, premature death), the carry-forward is not the
  final balance at all, in whole or in part. It cannot produce `/how-it-works`'s
  "145 -> 145" or `/atp-economics`'s "reduced from the crisis" except by coincidence. So
  the site has three incompatible answers to one beginner question, which is what the
  Jul-30 visitor filed: *"Is karma my leftover ATP, my lifetime surplus, or a bonus
  computed from trust? I saw all three."*

  | | `/how-it-works` | `/atp-economics` | `/karma-consequences` |
  |---|---|---|---|
  | What karma **is** | was "a portion of your final ATP" (removed Jul-30) | the balance you ended with, reduced | a behavior score, not a balance |
  | Carry-forward **amount** | the whole final balance | a reduced portion | `100 + (karma x 2)` |
  | Where it is stated | worked example only | worked example only | named formula with a multiplier |

  One thing IS agreed across all three and was safe to land: karma is earned by the track
  record of the previous life, and is **not** an ATP spending surplus. `/first-contact:396-399`
  already carried that as a standing guard ("It is NOT an ATP spending surplus"), and
  `/how-it-works` was violating it at `:905` ("+45 ATP surplus - which *becomes* the
  carry-forward karma bonus"). That equation is severed; the amount is left to the ruling.
- **Ruling requested**: either (a) confirm ATP = 0 and sustained trust collapse are the only
  life-ending paths, in which case both worked examples are wrong and 4-life rewrites them
  together, or (b) name the third path so the examples can cite it. Also, if convenient, the
  karma carry-forward rule. **Jul-30: this is no longer "if convenient".** The three-way
  divergence above means the site cannot answer a first-time reader's "what is karma?"
  without picking one, and the choice is between three models on three live pages, one of
  which is the page that owns the concept. A ruling on the amount would close it; a ruling
  that karma is a behavior score rather than a carried balance would close it more cleanly,
  since that is the only model with a stated mechanism behind it.
- **Holding pattern**: `/how-it-works` states the gap without filling it, via a shared
  `EndOfLifeCaveat` component rendered at both places the reader meets the numbers: *"none of
  these lives ends at 0 ATP ... What else ends a life is not settled."* No second mechanism is
  asserted, and the numbers are unchanged (rewriting them to end at zero would break the karma
  model, which is canon on both pages). `/atp-economics` is deliberately untouched pending a
  ruling, so the divergence stays visible rather than being half-papered-over.

  **Jul-30: the caveat now covers both halves.** Its old closer disclaimed the death rule and,
  in the same breath, held the carry-forward up as the thing the figures legitimately show
  (*"Read this walkthrough as showing what karma carries forward"*), which endorsed the exact
  quantity this entry files as unsettled. It now says the amount is unsettled too and that the
  figures are one modelling choice. Also removed from `/how-it-works` in the same pass, all
  labels rather than numbers: *"a portion of your final ATP"* (falsified by its own next line),
  the heading *"Karma: ATP Carried Forward"*, and the parentheticals *"(full karma bonus)"* /
  *"(karma preserved)"*, which asserted the full-balance model in prose. The 145/130/165 figures
  are still frozen and still untouched.

  **⚠️ Aug-06: two prose passes did not land it, so the ILLUSTRATION moved.** The Aug-06 visitor
  **quoted this caveat's karma half back verbatim** in their browse log and *still* filed the death
  half as a HIGH: *"The example agent dies for no reason the page allows, on the same page that
  just told me the rules... A site whose entire thesis is 'we will not lie about which of these is
  which' has, in its flagship worked example, a number that cannot happen."* Read it, understood
  it, rejected it. What survived the caveat was the **verb**, not the numbers: `/how-it-works`
  Lives 1/2 said *"Died with"*, which claims the narrow, defined death event the page rules out
  four screens above, while Life 3 already said *"Ended strong"*. The example contradicted itself.
  - **Disposition**: the verb is normalized to *"Ended"* on all lives, on **both** pages, using
    vocabulary each page already owned (`/how-it-works` Life 3 and `/atp-economics` Life 4 both
    read "Ended strong"). `/atp-economics` was **worse and is no longer deliberately untouched**:
    it said *"Died **naturally**"*, which names the very mechanism this entry establishes canon
    does not define, so leaving it kept the strongest form of the invented mechanism standing.
    Normalizing only one page would also have split two pages that share the figures exactly.
  - **This is removal, not a ruling.** *"Ended"* claims only that the life concluded, which is
    exactly the state this entry files as unsettled; *"Died"* claimed a defined event. No third
    mechanism is named, no figure changed, and the ruling requested above is unchanged. The
    caveat now says so explicitly: *"That is why they read ended and not died... rather than
    invent a third cause to justify the figures below, this page declines to name one."*
  - **The Q5 disclosure asymmetry is closed** (Aug-06 visitor HIGH 2): `/karma-consequences`
    presented `next_life_atp = 100 + karma * 2` as settled arithmetic with **no caveat at all**,
    so a reader meeting the formula there first had no way to know it was one model of three.
    That page now carries the same disclosure, reusing the caveat's wording verbatim ("whether
    you keep your whole final balance or a reduced portion of it is not decided") precisely
    because it names both models and endorses neither. **The three-way divergence itself is
    untouched and still needs the ruling** - it is now merely disclosed on every page that
    models it, instead of on one.
  - **Known residual, logged not fixed**: `/atp-economics` runs these figures with no caveat of
    its own. It also defines a genuine ATP = 0 death, so it needs its own framing rather than a
    hoisted copy of `EndOfLifeCaveat`. Follow-up for a future session.
    **Aug-11 (15:00): discharged. See the Aug-11 addendum at the end of this entry.**

  **⚠️ Aug-09: the count is at least FOUR, and the fences disclosed two of them.** Two findings
  from the Aug-09 15:00 session, both from surfaces this entry's own tables did not cover:
  - **A fourth shape ships in pseudocode.** `/atp-economics:2264`, inside a `<details>` fold,
    runs `agent.reborn(karma=agent.atp_history)` - karma as the whole ATP **history**, which is
    neither the final balance, nor a portion of it, nor `100 + karma * 2`. It is on the page this
    entry already lists as having no caveat, so it is **recorded, not fixed**; the fix is the same
    logged larger job. Anywhere this entry said "three models", read "at least four".
  - **The on-page fences enumerated two of the three this entry already knew about.**
    `EndOfLifeCaveat` and the `/karma-consequences` copy of its wording both fenced the amount as
    *"whether you keep your whole final balance or a reduced portion of it"*, a dichotomy that
    reads as exhaustive and excludes the `100 + karma * 2` shape recorded in the Jul-30 table
    above. That became visible on one page when PR #528 rewrote `/how-it-works`'s
    `LifecycleDemo` rebirth caption to state the model outright (*"she restarts at 112 energy, the
    usual 100 plus a 12 karma bonus"*): the page then showed the base-plus-bonus model at the top
    of `#journey` and the intact-balance model further down, with a fence naming only the second.
    - **Disposition** (widening a disclosure, not a ruling): `EndOfLifeCaveat`'s karma half now
      names three branches, in that page's own vocabulary; a 44-word fence under the demo says the
      112 is one modelling choice and that the karma examples below show a different one; and
      `/karma-consequences`'s pointer, which claimed *"the lifecycle walkthrough models it the
      other way"*, is narrowed to *"the lifecycle walkthrough's karma examples"*, since the
      walkthrough's opening demo models it that page's way. No figure moved (112 / 145 / 130 / 165
      / `100 + karma * 2` / `atp_history` all untouched), no branch endorsed, and the ruling
      requested above is unchanged.
    - **`/glossary` was the last live instance of a framing removed on Jul-30.** Its Rebirth
      definition card (`grep -n "is what follows the recoverable kind" src/app/glossary`) still
      read *"a portion of your final ATP carries forward as karma"*, stated flat as the definition
      of rebirth, four lines above a link into `/how-it-works#journey`. That is the wording the
      Jul-30 table records as *removed* from `/how-it-works` because its own next line falsifies
      it. Replaced with the track-record framing `/how-it-works` already ships verbatim, which is
      the one thing all four models agree on. A definitional card gets no fence: it names the
      term, it does not illustrate an amount.
    - ~~**Not this entry, logged for its own pass**: `/why-web4` attaches rebirth to **trust**
      death~~ **DISCHARGED 2026-08-10 (03:00 session).** The card (`grep -n "faq-death-rebirth"
      src/app/why-web4`) had the two-deaths rule backwards in **both** directions, not one:
      - Rebirth-with-karma was attached to **trust** death, which **four** prose surfaces call
        permanent verbatim (`how-it-works`, `glossary`, `first-contact`, `karma-consequences`; grep
        it as `"Energy death is recoverable"` and **not** as `"...recoverable through"`, since the
        longer string wraps mid-phrase in two of the four files and quietly returns 2), plus
        `/what-could-go-wrong` stating the permanence half in its own words (`grep -n "of trust
        death is permanent"`, which itself wraps after *"that kind"*, so the natural phrase to reach
        for returns nothing). **Three of these five surfaces wrap mid-sentence**, and this session's
        own first count came back one short from exactly that, twice, before being corrected.
        Generalise it: **for this claim class, single-line `grep` is the wrong instrument.** Use
        `grep -rzoP "Energy death is recoverable\s+through karma rebirth" src/app --include=*.tsx -l`
        or reflow-tolerant matching, and treat any count from a plain `grep` as a lower bound. Fifth
        instance of `[[claim-class-grep-truncated-enumerate-remainder]]` in this file, and the first
        with a mechanical fix rather than a "be careful" note. And which `how-it-works`'s eligibility card
        (`grep -n "Society doesn't want you back" src/app/how-it-works`) answers with *"No rebirth.
        Permanent death."*
      - **Energy** death, the recoverable one, was given an inflow that exists nowhere else on the
        site: *"community support or waiting for passive regeneration"*. `passive regeneration` and
        `community support` were each a **single site-wide hit**, both on that one line.
        `/atp-economics` argues the opposite across the whole page (`grep -n "recharges from"`:
        *"ATP recharges from contribution, not purchase"*; the only inflows are refund-capped
        confirmations and commissioned payment), and a passive refill would dissolve
        `/karma-consequences`'s *"Bad actors exhaust themselves economically"*. **This half was not
        in the original log entry** and is the more serious of the two: a wrong recovery mechanism
        is harder for a reader to detect than a wrong recovery target.
      - The entangled hardware clause resolved without needing Q8: *"when a new identity is created
        by the same hardware (LCT)"* rests on a **false premise**, since energy-death rebirth keeps
        the **same** LCT (`grep -n "Same LCT, same history" src/app/how-it-works`). With the premise
        corrected there is no new identity for hardware to re-link, so the sentence goes rather than
        gets hedged. The karma-continuity point it was making is propagated from `terms.ts`'s Karma
        entry (`grep -n "there is no device to abandon" src/lib/terms.ts`), already scoped per
        Ruling 1.
      **Nothing ruled.** No rebirth amount entered the card (Q5's open half is untouched), and the
      0.5 wording is the five-surface verbatim, so it asserts no endpoint in either direction (Q1).

      **A sixth surface, found only because the reviewer read the citation**: `/how-it-works`'s own
      **Key Takeaways** box (`grep -n "recoverable through karma rebirth, and good karma"
      src/app/how-it-works`) read *"If your energy hits zero **or trust collapses**, you die. But
      good karma carries forward - you're reborn with a head start."* One disjunction, one
      consequence, true of only the first branch, ~640 lines **above** the canonical sentence on the
      same page and absent from this ledger and from `SESSION_FOCUS.md`. This session was
      propagating **from** that page while its summary carried the same inversion
      (`[[grounding-citation-may-contradict-you-nearby]]` at page scale). Fixed in the same pass,
      wording propagated from the page's own canonical paragraph.

  **⚠️ Aug-11 (15:00): the `/atp-economics` half of the holding pattern now ships, and two of this
  entry's own descriptions of that page were wrong.** The residual logged Aug-06 ("runs these
  figures with no caveat of its own") is discharged: `/atp-economics`'s `#agent-journey` now
  carries a page-native `About these numbers` block, rendered after Life 4 and **before** the
  closing pattern box so it cannot read as retracting *"They die and stay dead"*. The death-rule
  clauses are propagated whole-clause from `EndOfLifeCaveat`; only the bridge to this page's own
  ATP = 0 death and the boundary clause are authored here. **Still not a ruling**: no figure moved,
  no branch endorsed, no third cause named, and the requested ruling above is unchanged.
  - **New: the life BOUNDARY is now disclosed, which the cause fence never covered.** The Aug-11
    visitor filed the gap precisely: *"The page discloses that 'what else ends a life is not
    settled,' but never says what this example assumed. Disclosing the open question is not the
    same as explaining the illustration built on top of it."* The shipped sentence is
    illustration-scoped, not a branch: *"The life boundaries are drawn by the walkthrough itself:
    the standard states no rule that draws them, and this page does not invent one to fill the
    gap."* The silence half already ships verbatim in `EndOfLifeCaveat`. **Barred wordings**, for
    any future pass: anything implying no such rule *could* exist (that is branch (a)), and any
    in-fiction cause. The visitor's own suggestion, *"the deployment ended"*, is the coined cause
    this fence exists to refuse; so are term, contract, retirement, project end, voluntary exit.
  - **CORRECTION to the Jul-27 table above.** Its `/atp-economics` karma row reads *reduced
    ("Reborn with 85 ATP (reduced from the crisis)")*. That under-describes the page: the
    walkthrough has **three** rebirths and uses **two** shapes, whole balance twice
    (145 -> 145, 130 -> 130) and reduced once (95 -> 85). So the divergence is not only
    *between* the two pages, it is *inside* one of them, and it is the reason
    `EndOfLifeCaveat`'s closer (*"this walkthrough shows one modelling choice, not the rule"*)
    could **not** be propagated verbatim: that sentence is false here. The new block says so and
    quotes both shapes.
  - **CORRECTION to the Aug-09 addendum's cite.** The `agent.reborn(karma=agent.atp_history)`
    pseudocode is at `/atp-economics:2305`, not `:2264` (`:2264` is now the dormancy paragraph).
    `/how-it-works`'s guard carried the same stale number. Both are now grep targets rather than
    line numbers (`[[guard-comment-cites-rot-name-the-target]]`).
  - **CORRECTION to a premise this ledger never asserted but `SESSION_FOCUS.md` did**: the two
    walkthroughs do **not** "run the same figures". This entry's Jul-27 table has recorded the
    opposite since it was written (3 lives vs 4, crisis in Life 2 vs Life 3, ending 165 vs 140).
    Only 100/60/105/145/130/15 are shared. A session that propagates the "same figures" phrasing
    will make a false statement in prose; found by the policy reviewer, not by a visitor.
  - **Deliberate asymmetry, do NOT "align" it away**: the new block names **four** carry-forward
    branches (whole balance / reduced portion / fresh start plus bonus / computed from whole
    history) where `EndOfLifeCaveat` names three. The fourth is the pseudocode that ships on
    *this* page, so this is the page that owes its disclosure
    (`[[fence-may-undercount-its-own-ledger]]`). Widening a disclosure, not a ruling.
  - **Residual, logged not fixed**: `EndOfLifeCaveat` on `/how-it-works` still enumerates three
    branches. Whether to widen it to four is a density call on a caveat already flagged as long,
    and that page ships no fourth-shape surface of its own. Not done here.

  **⚠️ Aug-13 (21:00): the FOURTH filing, and the first arrived at by ELIMINATION. Two defects,
  both in the fence itself rather than in the figures.** The Aug-13 visitor read the caveat, quoted
  its karma half back in their journal, and still filed the death half. That is the third pass in a
  row to be read and rejected, so the residual was never the death rule and never the numbers.
  Their route in is new and is the diagnostic:

  > "The page just told me the only two ways a life ends are ATP hitting zero, or trust death. If
  > she ended with 145 ATP, she did not die of energy death. So she died of trust death, which the
  > site says is permanent and has no rebirth. How does this example exist? Either there is a third
  > way a life ends that I was not told about, or the example breaks the rules stated one section
  > earlier."

  - **Defect 1: the fence excluded ONE of the two deaths the page defines.** *"None of these lives
    ends at 0 ATP, so none of them is the energy death described above"* rules out exactly one
    candidate on a page that names two, so a reader taking "Two paths" as exhaustive eliminates
    into the other one and lands on a contradiction the caveat never addresses. **Disposition**:
    the trust-death exclusion is added on all three surfaces. This is REMOVAL of a candidate, the
    same class of move as Aug-06's *"Died"* -> *"Ended"*: it names no third cause, endorses no
    branch, moves no figure, and the ruling requested above is unchanged.
  - **The exclusion's REASON is position-local, and the obvious one is false.** A draft read *"that
    one is permanent, and these lives come back"*. True under the karma cards, where both examples
    are rebirths; **false at `#example`**, where Life 3 (*"Ended strong: 165 ATP"*) is not shown
    coming back, and false on `/atp-economics`, where Life 4 (140) is not either. Caught in policy
    review, not by a visitor. What shipped is the trust TRAJECTORY, which is true of every life at
    every position: `/how-it-works` has 0.65 -> 0.72 -> 0.85, and `/atp-economics` states it
    verbally, so that copy says *"still trusted at the end of every life here"*. Both are
    endpoint-silent by construction: a direction, never a threshold (**Q1 untouched in both
    directions**).
  - **Defect 2: the fence contained a false sentence, and this ledger's holding pattern quoted it
    approvingly.** *"They are not the death this page defines, and Web4 does not define a second
    one"* was followed, one sentence later in the same paragraph, by *"the standard says what stops
    you acting (ATP reaches zero) and what is permanent (sustained trust collapse)"*. That is the
    second one, denied and then named two clauses apart, on all three surfaces. **Deleted, not
    reworded.** The short variant at `#example` had been carrying it as its ONLY fence (its guard
    said so explicitly); its fence is now the long form's own sentence head, *"What else ends a
    life is not settled"*, propagated verbatim so the strict-subset property holds and the karma
    sentence's *"either"* still refers to something. Any future fence here must assert **no
    count**: this claim has now been wrong about the count twice.

  **⚠️ Aug-13 (21:00): the site was NAMING a third life-ending path, on the page this entry is
  about, while the caveat 700 lines below said it "declines to name one".** Found while grounding
  the elimination fix. `/how-it-works` carried *"it ends when: ATP hits 0, raw trust falls below
  0.5 and stays there, **or CI goes incoherent**"* in its feedback-loop aliveness span and again in
  the full-pipeline card, plus the same claim implicitly in the red cell beneath the first
  (*"Any one fails -> that life ends"*, the three being ATP, trust and CI). Grounding, three ways
  and all one direction:
  - **Canon has no CI-termination rule.** The only hits are `proposals/ENTITY_RELATIONSHIP_SPEC.md`
    §8.2, whose row reads *"Incoherent | Possible adversarial, **consider** termination"* (a
    recommended action, in a proposal), a WIP proposal's `DEATH_SPIRAL_THRESHOLD`, and the archived
    original whitepaper. Nothing in `web4-standard/`.
  - **The page's own Death section says the opposite**, in the sentence locked byte-identical
    across six surfaces: *"A lower CI raises your costs and narrows your access; it does not push
    you toward trust death."* `/coherence-index` agrees and gives the mechanism: low CI raises cost
    up to 10x, which makes incoherence *"economically unsustainable"*, i.e. it acts **through** the
    ATP path rather than beside it.
  - **Four surfaces state "Two paths" and only two**: `/first-contact`, `/karma-consequences`,
    `/glossary`, and `/how-it-works` itself.

  **How it got there**: the Aug-09 pass restated the aliveness CONJUNCTION (*"ATP > 0 + Trust > 0.5
  + CI coherent"*) as a death rule to get clear of the Q1 endpoint, and an aliveness conjunct
  silently became a life-ending condition (`[[explainer-gap-may-be-upstream-off-by-one]]`). The
  Aug-10 sweep then quoted that very span while rewriting the two cells under it and closed with
  *"these two were the only defect"* (`[[claim-class-grep-truncated-enumerate-remainder]]`, sixth
  instance in this file: the sweep greppped the rebirth claim and never re-read the ending list it
  was standing on).

  - **Disposition**: the CI disjunct is deleted from all three surfaces. **Pure deletion, no
    replacement claim** - nothing new is asserted about what a low CI does, since the Death section
    already owns that, and the Aug-09 endpoint wording is untouched byte for byte. This is the
    primer constraint being enforced, not a ruling: the site may not name a third life-ending
    cause, and it was naming one. **If a ruling on this entry ever names CI as a path, restore the
    disjunct on all three surfaces.**

  - **New finding, FILED not fixed: the base-100 grant on `/first-contact` is unfenced.** The
    Aug-13 visitor's MEDIUM 4 ("three rebirth arithmetics, and each page fences the amount while
    telling me to trust the shape, but the shapes are what differ") lands on a half-protected
    sentence, not on a fence mismatch. `/first-contact` asserts *"everyone starts a life with 100,
    and the 12 is what her track record earned on top"* and then fences only *"how much karma
    converts"*. The base-100 grant is a STRUCTURAL claim, and `/how-it-works`'s 145 -> 145 model has
    no base grant at all, so the sentence asserts as settled the exact half that diverges
    (`[[guard-may-protect-half-a-sentence]]`). Not fixed in this pass for two recorded reasons:
    the Aug-09 pass narrowed that fence to the conversion axis **deliberately** and wrote down why,
    and a second rebirth-fence edit in the same pass would fight the first
    (`[[two-fixes-in-one-pass-can-fight]]`). A ruling on the carry-forward shape closes it
    directly; absent one, it is a candidate for a dedicated pass.

### Q6. What does the `/` in the canonical equation assert?

- **The question**: canon publishes an operator table for
  `Web4 = MCP + RDF + LCT + T3/V3*MRH + ATP/ADP` in which `/` = "verified by", `*` =
  "contextualized by", `+` = "augmented with" (`web4-standard/GLOSSARY.md` L9,
  `web4-standard/README.md` L423, `EXECUTIVE_SUMMARY.md` L13). Canon then reads the same
  equation aloud term by term and does **not** apply `/` to either pair that contains one.
  `GLOSSARY.md` L15 renders it "**T3/V3\*MRH**: Trust/Value tensors *contextualized by*
  Markov Relevancy Horizon" (one compound noun, only the `*` read aloud), and L18 renders
  the other as "**ATP/ADP**: Bio-inspired energy metabolism, value flows through work" (no
  operator read at all). `EXECUTIVE_SUMMARY.md` L15 does the same. So the operator table and
  the read-aloud are two different readings of the same notation, both canon, in the same
  files.
- **The two readings**:
  - *Operator-table reading*: `T3/V3` is "trust verified by value" and `ATP/ADP` is "budget
    verified by receipt". Coherent, and not contradicted by the spec:
    `core-spec/t3-v3-tensors.md` §3 is titled "V3 Tensor: Value Through Verification" and
    opens "quantifies value creation through three verification dimensions", while
    `core-spec/referenced-acts.md` L141-143 has `Fulfilled` ("the substance landed as
    claimed") build V3 Validity/Veracity and `Disputed` debit V3 Veracity.
  - *Read-aloud reading*: `T3/V3` and `ATP/ADP` are each a single named pair, and `/` is
    notation for pairing rather than an asserted relation. This is what canon's own prose does
    every time it reads the equation.
- **Why 4-life can't answer locally**: the two readings differ in strength, not just in
  wording. "Trust verified by value" subordinates T3 to V3 and would contradict the
  parallel-companions framing the site uses on every concept page (`/trust-tensor` L219 and
  L1035: "T3 measures who you are; V3 measures what you produce"; `/glossary` #v3: V3 "scores
  the work, not the worker"). It would also sit oddly against `t3-v3-tensors.md` §1.1
  ("evidence, not verdicts"). Picking the operator-table reading in visitor prose would make
  a structural claim about the ontology that canon's own prose declines to make. Picking the
  read-aloud reading and saying so explicitly would amount to telling readers the published
  operator table does not mean what it says.
- **Site symptom (Jul-27 visitor MEDIUM + Unanswered Question #6)**: *"With the page's own
  operator gloss ('/' = 'verified by'), 'T3/V3' reads as 'trust verified by value', a
  stronger and different claim than the parallel-companions framing every concept page uses.
  I could not tell if I was misreading the notation."* The visitor derived the conflict from
  the site's own material in one reading, unprompted.
- **Ruling requested**: state whether `/` asserts verification between the paired terms, or
  is pairing notation whose gloss applies to the equation as a whole. If the former, confirm
  that "T3 is verified by V3" is intended, since that is the reading a careful newcomer
  reaches first and it is stronger than anything the concept pages currently say.
- **Holding pattern**: `/the-standard` now reads the equation aloud using **canon's own
  term-by-term reading**, and states descriptively that the standard reads `T3/V3` as a
  single pair rather than reading the `/` aloud. The three operator glosses are left verbatim
  and unexplained rather than reconciled. No claim is made about what `/` asserts. This
  closes the visitor's confusion (they now have canon's reading in front of them) without
  settling the question.

### Q7. Is ATP a society's currency, or a unit of account that is not a currency?

*Refs in this entry verified 2026-07-29.*

- **The question**: canon says both, in the same core-spec directory.
  `core-spec/atp-adp-cycle.md` L5: ATP packets are "semifungible tokens that exist in either
  charged (ATP) or discharged (ADP) states, **managed by societies as their native currency**."
  `core-spec/inter-society-protocol.md` L191 (§4.1): "**ATP is a unit of account, not a medium
  of exchange with intrinsic value.** It is the standardized token form of a society's internal
  resource accounting, analogous to how a company might track 'engineering hours' or 'server
  capacity' using internal units of account that have no meaning outside the company unless
  explicitly converted." Those are the only two hits repo-wide for either phrasing, so this is
  not a stray sentence on one side; it is two deliberate definitions.
- **The two readings**:
  - *Native-currency reading*: within a society, ATP **is** the currency. It is the thing
    goods are priced in, it transfers peer to peer, and "currency" is the ordinary word for
    that. `inter-society-protocol.md` L199 explicitly licenses societies that "wish to embed
    market mechanisms in their ATP policies (price discovery, auctions, etc.)".
  - *Unit-of-account reading*: ATP is an accounting unit whose meaning is internal, closer to
    "engineering hours" than to money, and calling it a currency imports intrinsic value,
    savings and exchange that the mechanism does not have. This is the reading the site teaches
    (energy budget, not wealth).
- **Why 4-life can't answer locally**: the site has already asserted one side, flatly, on three
  surfaces: `/atp-economics` L318 ("This is not a currency"), `/glossary` #atp L378 ("a
  society's unit of account, not a currency"), and `src/lib/navigation.ts` L157 (same clause in
  the nav description). A ruling for the native-currency reading would require changing all
  three, so **the site's current wording must not be read as the answer to this question**.
  Two in-code guards already name the tension and forbid settling it in prose
  (`/atp-economics` L175 "standing unresolved web4 unit-of-account-vs-currency tension, left
  verbatim", L286-288 "Canon is SPLIT on the currency word itself ... do NOT re-litigate
  'currency' here"). The visitor keeps arriving at the conflict from the site's own material,
  which is signal for the escalation and not license to answer it.
- **New evidence, 2026-08-05 (#514 session, evidence only, holding pattern UNCHANGED)**: the
  characterization above, that the site's three assertions all land on the unit-of-account side,
  is **incomplete**. `/atp-economics` also asserts the *opposite* side, on the same page as the
  L318 denial, inside a collapsed `<details>` titled "Is ATP a currency or an energy budget?":
  the answer given is "**Both.**", and it names a "**Transaction medium**" role outright ("ATP
  also flows between participants. When you buy something on a marketplace or hire someone for a
  task..."). So the site is not merely asserting one side prematurely, it is **self-contradicting
  within one page**: a flat "This is not a currency" in the body and "Both" in an expander. This
  was found while fixing an unrelated ATP supply defect and was **deliberately not touched**,
  because reconciling the two would require picking a side, which is exactly what this question
  asks canon to do. It strengthens the case for a ruling and narrows what a ruling must fix: a
  native-currency ruling now requires editing four surfaces, not three, and a unit-of-account
  ruling requires retiring the "Both" expander rather than merely leaving the other three as-is.
- **What is NOT in question**: the *external* claim. #494 narrowed `/atp-economics` to "no
  outside market, no price against money, no cash-out, no speculation" and left in-society
  pricing licensed by `inter-society-protocol.md` L199, which is why the site's own Market
  wireframe (a seller, a 350-ATP price, a buyer, escrow) no longer contradicts the page. The
  open question is only the **word for what ATP is inside a society**.
- **Site symptom (Jul-29 visitor Unanswered Question #2, and a qualified checklist box)**:
  *"Is ATP a currency or not? A thing with a price, a seller, and a buy button is a market,
  whatever the ATP page says."* The same visitor checked the ATP/ADP understanding box as
  *"mechanism yes; whether it is a currency, unresolved"*, which is the only qualified box in
  the browse. They understood the mechanism completely and still could not name it.
- **Ruling requested**: state which term the standard intends for ATP **inside** a society. If
  "native currency" in `atp-adp-cycle.md` L5 is loose phrasing for a unit of account, say so in
  that file. If it is intended, say whether a society's ATP is a currency *in that society*
  while remaining a unit of account across societies, since that is a coherent position no
  single file currently states, and it is the position the site's material implies.
- **Holding pattern**: unchanged, and this entry proposes **no site edits**. `/atp-economics`
  L318, `/glossary` L378, `navigation.ts` L157 and the wireframe guardrail all stay exactly as
  they are; the site keeps teaching the energy-budget framing and keeps ATP off the words
  "currency" and "medium of exchange" in its own voice. The cost of the holding pattern is
  recorded here: a reader who follows the site correctly ends up unable to answer a one-word
  question about the mechanism they just learned.

### Q8. Is software-only anchoring conformant, and if so, how does a software-only identity clear the survival line?

*Refs in this entry verified 2026-07-30.*

This is the equity half of [Q1](#q1-the-aliveness-endpoint-is-alive-trust--05-or-trust--05).
Q1 asks what the predicate is. Q8 asks what the predicate **does to a whole tier of users**, and
it is the question visitors keep arriving at on their own. Filed after the Jul-30 browse made it
two HIGHs and three Unanswered Questions in a single sitting.

- **The arithmetic the site presents**: the software-only LCT trust ceiling is **0.50**
  (`/lct-explainer` L573, L1027; the chip-class table and the device-count rule both land there
  for one un-attested device). The access line is **0.50** (`/first-contact` L271: "Above 0.50:
  full access"). The aliveness predicate is **`trust > 0.5`** in every executable form on the
  site (see Q1). So a software-only participant's ceiling is exactly the number they must exceed,
  and by the site's own numbers they never do.
- **Why 4-life cannot answer this locally**: answering requires asserting the Q1 endpoint. The
  entailment the Jul-30 visitor asked for in as many words ("the ceiling equals the access line,
  so this tier never gets full access and never leaves the fatal band") is the **negation** of the
  `>=` reading, which is exactly what PR #444 was rejected three times for asserting. The
  standing guard is `/lct-explainer` L258-259: *"do NOT reword into anything that says a reader
  sitting at 0.50 is alive, safe, or has full access."*
- **New evidence, and the reason this is now urgent: the site has already landed the `>=` side,
  twice, in prose, including inside the file that bans it.**
  - `/lct-explainer` L1278 read *"software-only at 0.50 is comparable to email today, **full
    access**, but a low ceiling"* - about 1000 lines below the guard forbidding that exact
    phrase. The 2026-07-30 session removed the two words (restoring silence, not asserting the
    negation); the *reason it was there* is the point. A guard honored where it was written and
    violated elsewhere in the same file is a sign the prohibition is not holdable indefinitely.
  - `/first-contact` L533 and L546 gate the visible readout on **`trust_after >= 0.5`**, printing
    "✅ Full access" at exactly 0.50, while `/how-it-works` L329 and L1038 display the aliveness
    rule as **"ATP > 0 + Trust > 0.5 + CI coherent = alive"**. One page computes `>=` and prints
    full access at the endpoint; the other page prints `>` as the rule. Both are live, and a
    reader who lands on exactly 0.50 sees them disagree.
  This is the strongest Q1 signal to date: it is no longer only that canon is ambiguous, it is
  that the ambiguity is leaking into shipped surfaces faster than guard comments can catch it.
- **Correction to Q1's live evidence, found 2026-07-30 (the polarity has flipped since filing)**:
  Q1 was filed on the finding that *prose implied `>=` while all three executable predicates said
  `>`*. Those three predicates (`isAlive`, `rebirthEligible`, `agency`) all lived in
  `aliveness/page.tsx`, which the **Jul-15 rebuild retired**; there is no `/aliveness` route now.
  The predicates that survive on the site today (`first-contact` L533/L546, `lct-explainer` L940)
  use **`>=`**, and the strictly-greater form now survives mainly as *displayed prose*
  (`how-it-works` L329, L1038). So the site's executable side and its prose side have swapped
  positions since the question was written. Two consequences: the guard comment at
  `/lct-explainer` L1140 still describes the retired file in the present tense and should be read
  as history, not as current state; and **Q1 is not made stale by this** - the endpoint is still
  unruled in canon, and the site is still asserting it accidentally, only now from the other side.
- **The second, separable question: is software-only anchoring conformant at all?** The site does
  not have one position, which is the [[hardware-required-seam]]:
  - `/why-web4` L2218 (`#faq-tpm-affordability`): "Web4 identity **requires** hardware with
    secure elements (TPM, Secure Enclave, or FIDO2)."
  - `/why-web4` L1380 (`#faq-affordability`): the same question answered **conditionally**. Both
    FAQs are separately listed in the page's own FAQ index (L573 and L581, again at L1195/L1203).
  - `/lct-explainer` L1151 (`#software-only-survival`): software-only anchoring is **viable**, at
    a 0.50 ceiling with zero margin above the line.
  If software-only is *not* conformant, the equity question dissolves into a much starker one the
  site would have to state plainly. If it *is* conformant, the ceiling and the predicate have to
  be reconciled, because as published they exclude the tier by construction.
- **What the site already says honestly, and where it stops**: `/what-could-go-wrong` risk 8 is
  the most unflinching passage on the site: L540 "a real second-class experience baked into the
  architecture", L551 "it codifies the existing digital divide into the trust layer itself". But
  it stops at *"lower ceiling"* and never reaches the entailment. The Jul-30 visitor noticed
  precisely this: *"Risk 8 says 'lower ceiling.' It does not say 'the ceiling equals the access
  line' ... That entailment is the actual severity, and I had to derive it myself from three
  pages."*
- **Product stakes, not just doctrine**: `/hestia` is the site's only **Running** piece and the
  onramp's recommended hands-on entry, and its TPM binding is deferred to hardbound, so a fresh
  `hestia init` lands in exactly this tier. The Jul-30 visitor's closing sentence is the cost:
  *"I would not want a friend to spend twenty minutes carefully following the arithmetic to
  arrive where I did, which is at a tier the numbers quietly exclude, doing the one thing the
  site actually invites them to do."*
- **Site symptoms (Jul-30 browse)**: HIGH #1 and HIGH #2, plus Unanswered Questions 1 ("can I ever
  have full access?"), 2 ("what tier does a fresh `hestia init` put me in?") and 9 ("do I need to
  buy hardware? I now believe no, but /why-web4 told me yes"). The Jul-24 browse asked the same
  requirement question; the Jul-9 browse asked the same dead-on-arrival question.
- **Ruling requested**, in dependency order:
  1. Is anchoring an LCT in software alone **conformant** with the standard?
  2. If yes, what is a software-only identity's actual trust ceiling, and does the aliveness
     predicate admit it? (Either the ceiling must exceed the line, or the line must admit its
     endpoint, or the standard must say plainly that this tier is non-agent by design.)
  3. Is the 0.50 software-only ceiling a spec number or a 4-life teaching calibration? The site
     treats its ceiling table as its own calibration while upstream numbers are unsettled, so a
     ruling that only moves the ceiling may be a 4-life-side fix rather than a spec change.
- **RULING 1 ANSWERED UPSTREAM, 2026-08-05.** Software-only anchoring **is conformant**, and canon
  is stronger than "tolerated": it **forbids** protocol-level exclusion of the tier.
  - `web4-standard/core-spec/LCT-linked-context-token.md:39` (§1.2 clause 1): an entity that can
    present only weak evidence *"MUST NOT be excluded by the protocol"*, it is *"rightly weighed as
    riskier"*. `web4-core/src/ratchet.rs:144` mirrors it: *"risk, not exclusion."*
  - `multi-device-lct-binding.md:9` names *"software-only fallbacks"* among the anchor classes the
    protocol exists to support; `:145` defines `anchor_type: "software"` as a first-class anchor
    record (*"Ubiquity: Universal"*, *"Recommended Role: Bootstrap, low-trust contexts only"*);
    `:154` gives it a computed ceiling, which is only meaningful for a tier that exists.
  - The only prohibitions are **scoped**, not existential: `:155` software cannot be the **sole**
    anchor for a recovery quorum, and §3.4 (`:626`) excludes it from hardware-**diversity**
    counting. Both restrict what a software anchor is counted *for*.
  - Re-ratified twice since this entry was filed: audits **C268** (2026-07-24) *"the defect is the
    exclusion, not the scoring"* and **C308** (2026-08-01) *"the spec side here is settled."*
  This settles the **conformance** half only. Requests 2 and 3 remain open and still need Q1.
- **Ruling 3 is sharpened, not resolved, and upstream is internally inconsistent.** Upstream carries
  **three** software-only ceilings at once: `multi-device:154` **0.4**, §4.2 `:875` **0.40**, and
  `web4-core/src/lct.rs:85-93` `impl Default for HardwareBinding` shipping `trust_ceiling: 0.85` on
  an LCT it labels *"Software-bound keys"*, which `hub/hub-lib/src/hub.rs:168` persists in real hub
  LCT records (**C308-N2**, MEDIUM, routed and unresolved). Two of the three are **below** the
  site's 0.50. **This is the reason the site's 0.50 calibration must not move**: adopting 0.40 would
  put the ceiling under the survival line and answer Q1 by arithmetic; adopting 0.85 would follow a
  value upstream has itself flagged as a defect.
- **Holding pattern, REVISED 2026-08-05** (was: "no further site edits"). It now binds the **equity
  half only**. Site prose stays endpoint-silent: nothing may say a reader sitting *at* 0.50 is
  alive, dead, safe, or has full access, and `/lct-explainer` `#software-only-survival` stays
  strictly-below. Numbers do not move. What the revision releases: a surface asserting that secure
  hardware is **required to participate** may now be corrected against canon, because that is
  request 1 and request 1 is answered. Done 2026-08-05 at `/why-web4` `#faq-tpm-affordability`,
  `#faq-many-identities`, `#faq-affordability`, `#faq-gatekeepers` and the comparison-table row,
  which resolves the conformance half of [[hardware-required-seam]]; the equity half of that seam
  stays open. The FAQs are still **not merged** (that is a separate curation row).
- **Correction to the superseded holding pattern**: it said *"`/what-could-go-wrong` risk 8 stays at
  'lower ceiling'"*. That was already stale when written into this entry. PR **#502** (Jul-31) landed
  the entailment on risk 8 bullet (4): *"it is not a slower climb to the same place. A software-only
  identity starts at 0.50 and 0.50 is also where it stops."* A policy-reviewed PR moved a Q8 surface
  without touching Q1, and the ledger was not updated. Read the site, not this line, for current state.
- **Recurrence evidence, 2026-08-10 browse (their Unanswered Q2), a NEW consequence surface.**
  Every prior recurrence ran the 0.50 ceiling forward into *access* or into *aliveness*. This
  visitor ran it forward into **rebirth eligibility**, which no earlier filing had reached:

  > "`/how-it-works` says 'Overall T3 score >= 0.5.' A software-only identity is capped at exactly
  > 0.50. So such a user sits permanently *on* the threshold, passing by exactly zero margin,
  > forever, and only while behaving perfectly. `/lct-explainer` and `/what-could-go-wrong` both
  > own the ceiling honestly, but neither runs it forward into the rebirth rule. Is a software-only
  > identity permanently one bad interaction from being ineligible to come back?"

  Recorded as evidence, **not answered**, and no site edit made: answering it in either direction
  asserts the Q1 endpoint (here the `>=` side is the one already shipped, in the eligibility card,
  and it is the deliberately-untouched legacy comparator). Note what the visitor demonstrated
  incidentally: the two pages that own the ceiling honestly are exactly the two that cannot run it
  forward, so a reader who does the composition themselves lands on the unanswered question every
  time. That is now three distinct consequence surfaces (access, aliveness, rebirth) reachable from
  one un-ruled predicate.
- The cost of the holding pattern, still recorded: the site's friendliest and only running entry
  point drops readers into its most constrained tier, and the site cannot tell them what that costs
  without answering Q1.

### Q11. Does MRH horizon depth apply inside a delegation pipeline?

- **Raised**: 2026-08-01, from the Aug-01 visitor browse (their HIGH 3 and Unanswered Q4,
  *"Is a 'hop' one thing or two? 90% per hop over five hops, or 70% per hop with a hard wall at
  three?"*). The visitor went back and forth between the two pages twice before giving up and
  inferring that they must mean different things, which neither page said.
- **The site's two computations**, both live and both unchanged by this entry:
  - `/how-it-works#agents`: a 5-agent delegation pipeline, `0.9^5 = 0.59`, composing the agents'
    own trust scores and nothing else. No distance term, and five links where the other page
    stops at three.
  - `/trust-neighborhood#hop-decay`: `trust = t1 x t2 x t3 x 0.7^depth`, worked as
    `0.9^3 x 0.7^3 = 0.25`, with trust weight going to zero past 3 hops.
- **What the Aug-01 session fixed and deliberately did not fix.** Fixed: the sentence *"each hop
  keeps only 90% of what reached it"*, which restated that example's stipulated per-agent score
  (*"where each agent has 0.9 trust"*) as a universal rate, and taught the visitor a decay law the
  site does not have. That is an error correction licensed by the card's own preceding clause.
  Both pages also now say what their number **composes**. Not fixed, because it would be coining
  canon: any claim that a delegation chain is **exempt** from the distance term, or that the 3-hop
  horizon does or does not bound pipeline length.
- **Why it is not derivable downstream.** The scope boundary appears nowhere on the site, and
  upstream leans against the exemption rather than for it:
  - `web4-standard/core-spec/mrh-tensors.md:210-214` applies the decay factor to every path
    multiplicatively: `trust *= edge.weight * (decay_factor ** (i + 1))`, default `0.7`. It does
    not carve out delegation.
  - `web4-standard/core-spec/LCT-linked-context-token.md:546` states **Horizon depth** generically:
    *"Limits transitive trust distance."*
  - `web4-standard/proposals/ENTITY_RELATIONSHIP_SPEC.md:403` shows the same shape,
    `0.9 * 0.8 * decay_factor = 0.36`, again with no pipeline carve-out.
  - `web4-standard/core-spec/inter-society-protocol.md:380` leaves transitivity-versus-attenuation
    **society-sovereign** and unresolved, which is why neither side can simply be asserted.
- **What follows if the depth term does apply**: `/how-it-works`'s headline pipeline number is wrong
  by roughly 6x (`0.9^5 x 0.7^5 = 0.099`, not `0.59`), and a 5-hop pipeline crosses a horizon the
  other page describes as a hard wall. That is a bigger edit than a wording pass, which is the
  other reason it is filed rather than shipped.
- **Third instance, same question, already flagged in place**: the *Transitive attenuation*
  invariant at `how-it-works` (guard comment beside it) is the neighborhood setting proper (Alice
  judging Carol through Bob) and computes `0.9 x 0.6 = 0.54`, where `/trust-neighborhood`'s formula
  gives `0.9 x 0.6 x 0.7^2 = 0.26` for the same two hops. The invariant it asserts (*"strictly
  below the weaker of the two links"*) is true under either, so only the worked value is exposed.
  Do not patch this one alone: a unilateral decay factor here would put a third number on the site
  for one quantity, which is the defect this pass closed.
- **Ruling requested**:
  1. Is a delegation pipeline (agent A calls B calls C) a path in the MRH sense, subject to
     `decay_factor ** depth`, or a distinct composition that multiplies participant scores only?
  2. If it is a distinct composition, what makes it distinct, so the site can state the boundary
     rather than imply it? (The working intuition on the site is *you engaged each member of the
     chain directly and can look each one up*, versus *you are judging a stranger through
     intermediaries*. That is a plausible discriminator, not a cited one.)
  3. Does the 3-hop horizon bound delegation depth, and if so what happens to a 5-agent pipeline?
- **Holding pattern**: both pages describe what their own number composes and cross-link. Neither
  asserts the exemption, neither asserts the horizon applies, and no trust number changes on either
  page until this is answered.

### Q12. Where does the MRH decay exponent start: is a direct relationship discounted?

- **Raised**: 2026-08-04, from the Aug-01 visitor browse (their `/trust-neighborhood` LOW,
  *"why is a direct connection worth only 0.70? Someone I know personally gets a 30% haircut
  before their own trust score is even applied. That's the first hop of a decay curve, but it
  reads as 'the site doesn't fully trust anyone.'"*). Filed after checking upstream, where the
  question turns out to be open rather than answered.
- **The two upstream artifacts disagree by one**, and they ship in the same directory tree:
  - `web4-standard/core-spec/mrh-tensors.md:214` (`TrustPropagation.multiplicative`):
    `trust *= edge.weight * (decay_factor ** (i + 1))`, `decay_factor` default `0.7`. The first
    edge is `i = 0`, so a **direct relationship is charged `0.7^1 = 0.70`**.
  - `web4-standard/mrh_trust_propagation.py:294` (`compute_network_trust`):
    `propagated_trust = current_trust * weight * (decay_factor ** distance)`, with the BFS queue
    seeded `(source, 1.0, 0)` at `:280`. The first neighbour is reached at `distance = 0`, so a
    **direct relationship is charged `0.7^0 = 1.00`, no discount**. Same off-by-one in
    `find_trust_paths` (`:243` and `:249`, `decay_factor ** depth`, the DFS seeded at `depth = 0`).
  Under the first, a chain of three 0.9 edges is `0.9^3 x 0.7^3 = 0.25`; under the second it is
  `0.9^3 x 0.7^2 = 0.36`. Every propagated number differs by a factor of `0.7`.
- **What the site does**: `/trust-neighborhood` implements the **core-spec** version. The decay
  ring (`Direct: 0.70`), the telephone list (`Direct friend -> 70%`), the explorer widget's
  `Depth 1: Direct Relationships ... trust x 0.70`, and the stated formula
  `trust = t1 x t2 x t3 x 0.7^depth` are all consistent with `mrh-tensors.md` and with each
  other. The `0.70 / 0.49 / 0.34` triple is also quoted on `/how-it-works` and `/why-web4`.
- **Why it is not derivable downstream.** Nothing on the site or upstream says which indexing is
  intended. `GLOSSARY.md:204` gives `0.9 per hop` as a *default* without saying which hop is
  first; `QUICK_REFERENCE.md:172` says *"each hop reduces trust by ~5-10%"*, also silent on the
  starting index. Picking the `.py` indexing downstream would renumber four surfaces and put the
  site at odds with the core spec; picking the spec indexing *as a justified position* would coin
  a rationale for penalising first-hand relationships that no upstream text states.
- **This is adjacent to Q11 but distinct.** Q11 asks *whether the distance term applies at all*
  inside a delegation pipeline. Q12 asks *where the exponent starts* in the neighbourhood case
  where the term indisputably applies. A ruling on either does not settle the other. Note the
  interaction: if Q11 is answered "the term applies to pipelines" and Q12 is answered "the count
  starts at the first edge", `/how-it-works`'s 5-agent pipeline number moves twice.
- **Ruling requested**:
  1. Is a direct (one edge) relationship discounted by `decay_factor`, or is the factor charged
     only from the second edge onward?
  2. Which artifact is authoritative, `core-spec/mrh-tensors.md` or `mrh_trust_propagation.py`?
     They are cross-referenced as companions, so the divergence is likely an unnoticed
     off-by-one rather than a deliberate difference in model.
  3. If the first edge *is* charged, what is the stated reason? The site can teach the
     convention, but it cannot invent the justification, and a reader who asks *"why is someone
     I know personally discounted?"* deserves a cited answer rather than a plausible one.
- **Holding pattern**: no number on `/trust-neighborhood` changes. The `Why 0.7?` box now
  discloses that the standard is unsettled on where the count starts and that the reader's
  reaction tracks a real upstream disagreement, and it deliberately gives **no reason** for
  charging the first hop. Do not ship the direct-versus-through-intermediaries discriminator as
  the answer; Q11's ruling request #2 already records it as plausible and uncited.


### Q13. Is an un-commissioned newcomer intended to decrease monotonically?

- **Filed**: 2026-08-06, from the Aug-06 visitor's MEDIUM 3 and their Unanswered Q5/Q6. This
  is the reason an otherwise "good" browse returned the ATP/ADP understanding box unticked.
- **What is NOT being asked.** "Is there a protocol-level floor or allowance?" is already
  answered upstream, and the site now teaches the answer at `/atp-economics#newcomer-solvency`.
  `core-spec/inter-society-protocol.md` section 4.5 ("First ATP" Resolution) states there is no
  protocol-level constraint on a society's initial issuance, and gives the reason: such a
  constraint would require a universal measurement protocol and therefore a universal authority,
  contradicting the anti-hierarchical-by-design property. Section 4.7 closes its table of valid
  ATP policies with *"The Web4 standard provides the form for all of them."* Escalating the
  floor question would be escalating something canon has deliberately closed.
- **The open half.** Take the site's own model as given: confirmation of your own work refunds
  **at most what you spent**, and payment for work someone else commissioned is the only channel
  that exceeds cost. Then a participant who is never commissioned decreases monotonically from
  the joining grant, with quality setting the slope and never the sign. The visitor did this
  arithmetic unprompted and landed on roughly twelve actions.
  1. **Is that intended?** Is monotonic decrease for the un-commissioned the designed incentive
     (contribute or wind down), or an artifact of the recharge cap that a society is expected to
     patch in its own law?
  2. **Does any canonical bootstrap-period exemption exist?** Section 4.7 shows a recurring
     per-role allowance as a *valid* society policy. Is there anywhere in canon a RECOMMENDED
     newcomer provision, analogous to section 4.6's RECOMMENDED measurement practices, or is the
     absence itself the position?
  3. **If monotonic decrease is intended**, the cold-start story on this site has the wrong
     shape: it currently reassures on **trust** convergence (~30-action half-life, newcomers
     surpass established members by ~50 actions) while the **ATP** clock runs the other way over
     a shorter horizon. A ruling on (1) tells us whether to reconcile those two clocks or to
     teach the tension as real.
- **Why 4-life cannot settle it.** Answering (1) either way is coining an intent. Answering (2)
  "no" is provable by absence, but only upstream can say whether the absence is deliberate.
- **Holding pattern**: no figure changed. `/atp-economics#newcomer-solvency` names the mechanism
  that exists (issuance is society law, and both a recurring allowance and no allowance are legal
  choices), states plainly that the site cannot give a rate because no public network is open to
  outside members yet, and **declines the solvency promise**. Do not close this by writing a
  survival guarantee, and do not print a rate. The adjacent guard at `atp-economics` L726 has
  forbidden the same upgrade since the Aug-05 pass, for the same reason.

### Q14. Is the trust-death predicate evaluated against a passively decayed score?

- **Raised**: 2026-08-07, from the Aug-07 visitor browse (their HIGH and Unanswered Q1). This is
  the strongest form the question has taken, because the visitor did not find a contradiction
  between two pages. They found an **entailment** of two facts the site states correctly, and did
  the arithmetic themselves: *"the site is excellent at disclosing each fact and inconsistent at
  joining two of them."*
- **The arithmetic, entirely from the site's own published numbers.** A user at Talent 0.90,
  Training 0.90, Temperament 0.90 goes inactive for six months. Talent does not decay (protocol
  invariant): 0.90. Training at a 180-day half-life: 0.45. Temperament at a 30-day half-life, six
  half-lives elapsed: ~0.014. Composite at the canonical weights: `0.4(0.90) + 0.3(0.45) +
  0.3(0.014)` = **0.4992**. The site's survival rule is *"raw trust falls below 0.5 **and stays
  there**"*. Absence satisfies "stays there" by construction, because that is what absence is.
  So on the site's own numbers, a near-perfectly-trusted person taking parental leave, a
  hospitalization, or a six-month field posting appears to meet the definition of permanent,
  unrecoverable trust death.
- **The site's own reasoning already points here, applied to a different case.** `/what-could-go-wrong`
  risk 3 observes that *"a scoring error is a sustained condition by construction, so a
  wrongly-scored user is precisely the one who stays below."* The visitor noted that absence is
  also a sustained condition by construction, and that the page spotted the pattern for one case
  and not the other. That is the shape of this entry.
- **Why this is neither Q4 nor Q5.** Q4 asks whether the spec should define a trust-death
  predicate **for simulations**, i.e. whether a demo may model one at all. Q5 asks what ends a
  life **other than** ATP = 0, i.e. whether a *third* mechanism exists beyond the two the site
  teaches. Q14 assumes both of the taught mechanisms and asks a narrower question about one of
  them: given that sustained sub-0.5 raw trust is the trust-death predicate, **what score is it
  read against**, and specifically whether a score that fell through *inactivity* is read the same
  way as one that fell through *behavior*. A ruling on Q5 (is there a third cause?) would not
  answer Q14, and a ruling on Q14 would not answer Q5.
- **What upstream does and does not say.**
  - `core-spec/t3-v3-tensors.md:123-131` §2.3: Talent MUST NOT decay through inactivity (protocol
    invariant, test vector t3v3-012). The **Training and Temperament rates are society-configurable**
    (*"Societies MAY configure custom decay policies for Training and Temperament"*), and §10.3
    (`:657`) lists Training's −0.001/month as a **reference default**, not a constant. So 4-life's
    180d/30d half-lives are this site's teaching calibration, which is what the on-site disclosure
    now says.
  - `core-spec/reputation-computation.md:756-780` gives a **separate** object: a role-scoped
    inactivity model with no decay inside the first 30 days, then −0.01/month, ×1.5 after six
    months, total capped at −0.5, explicitly role-contextualized (*"an entity active in role A but
    idle in role B decays only in role B"*).
  - **Do not read that second model as reassurance, and do not put it on the site.** Its companion
    `compute_current_reputation` (`:679`) aggregates deltas *onto the 0.5 neutral baseline* over a
    `time_horizon_days=90` window, and `effective_reputation` (`:785`) is `base + decay`. With no
    deltas inside the horizon, a six-month-idle entity's base is ~0.5, so the effective value lands
    near **0.44**, also under the line. Canon's per-month *increment* is far smaller than 4-life's
    half-lives; canon's resulting *level* is not safer. A claim that "the real spec is gentler"
    would be falsifiable from upstream's own code, and the policy review caught it in this
    session's first scope draft.
  - **The actual gap**: no entity-level *"score below threshold → REVOKED"* path exists in canon at
    all. The LCT lifecycle is NASCENT → ACTIVE → SUSPENDED → REVOKED, and the enumerated
    revocation reasons (`multi-device-lct-binding.md:290`) are all device-level: `lost`, `sold`,
    `compromised`, `upgrade`, `recovery_revoked`. Nothing states what a sustained sub-threshold
    score *does*, let alone whether it matters how the score got there.
- **The requests.**
  1. Is the trust-death predicate evaluated against a score that decayed through inactivity, or
     only against one that fell through witnessed behavior?
  2. If the former, does a dormancy carve-out, a decay floor, or a "only acting entities are
     judged" rule exist anywhere in canon? The 30-day grace and −0.5 cap in
     `reputation-computation.md` are floor-shaped but belong to a different object and take no
     dimension argument, which sits awkwardly against Talent's no-decay invariant.
  3. If neither exists, is that deliberate (societies are expected to write it into their own law,
     as with initial ATP issuance in Q13) or an unnoticed gap?
- **Why 4-life cannot settle it.** Answering (1) either way coins a protocol semantic. Answering
  (2) "no" is provable by absence, but only upstream can say whether the absence is deliberate.
  Writing a dormancy exemption into an explainer would be exactly the move `/how-it-works` refused
  when it declined to name a third cause of death.
- **Holding pattern**: no number changed and no rule invented. `/trust-tensor#decay-and-survival`
  discloses that the half-lives are 4-life's calibration and that what happens at the line for an
  absent user is not settled; `/why-web4#faq-month-off` carries the same two clauses at the point
  of reassurance; `/how-it-works` gets a pointer only, its guarded two-deaths paragraph untouched.
  **Do not close this by writing a dormancy guarantee, and do not publish canon's decay numerics
  as a reassuring comparison.** Endpoint discipline from Q1 still binds: the composite lands
  strictly below, so nothing needs to say, and nothing may say, what happens to a reader sitting
  exactly at 0.50.
- **Follow-up, 2026-08-14: which quantity, resolved on-site; whose scope, still open.** The Aug-14
  visitor filed as HIGH *"the fatal 0.5 threshold is described against four different quantities:
  raw trust, Overall T3 score, composite trust score, and the Trust Score shown in First Contact ...
  T3 also has published weights (0.4/0.3/0.3), so raw and composite are not the same number."*
  Their inference was manufactured by the site, not by canon. `/karma-consequences` shipped (#533)
  *"raw trust is what the permanent death tracks, and the composite score is what the rebirth gate
  reads."* That is **false**, five surfaces to one: the site's own byte-identical six-page rider
  reads *"the number compared is raw trust, not effective trust (raw x CI^2)"*, so the contrast is
  with **effective**, never with **blended**; `/why-web4` renders `Effective trust = raw trust
  (0.72) x CI^2` with raw as a single scalar; and **Q14 above applies the survival rule to a
  canonical-weighted composite it computes itself** (`0.4(0.90)+0.3(0.45)+0.3(0.014) = 0.4992`).
  Upstream closes it by absence: `grep -c raw core-spec/t3-v3-tensors.md` is **zero**, so canon
  defines no second quantity the sentence could have been naming. #533's own cited precedent
  refutes it too: it grounded the clause in #532's `/trust-tensor` fix, and that fix says the
  composite **is** the single-overall-score blend and that the *different* quantity is the widget's
  **role-weighted match**. #532's axis is composite-vs-role-match; #533 transposed it onto
  raw-vs-composite. **Disposition**: the clause is deleted, and `/how-it-works` now defines "raw
  trust" adjacent to (never inside) its byte-locked death paragraph, propagated from that page's own
  eligibility card: the blend, not one dimension. No comparator, no endpoint, so Q1 is untouched in
  both directions.
- **What this follow-up does NOT settle, and what may not be written on-site.** The site now names
  the death rule's quantity and the rebirth gate's quantity and stops. It does **not** assert that
  the two gates read the same number, and nothing may assert it: the open sliver is whether the
  rebirth gate is **entity-wide or role-scoped**, which lands back on this entry's own finding that
  no entity-level *"score below threshold"* path exists in canon at all. Deleting a false
  distinction is not asserting its negation. Do not "finish" this by writing an identity claim, and
  do not force one phrase onto all four pages (the visitor's literal suggestion), which would decide
  the role-scoping question by vocabulary.

### Q15. How far does a trust death reach: does it end standing in one society, or everywhere?

- **Raised**: 2026-08-07, from the Aug-07 visitor browse (their Unanswered Q5, with the answerable
  half of Q6 attached). Verbatim: *"The plagiarism walkthrough on `/how-it-works` says 'the penalty
  is society-specific, not global.' Trust death is described as permanent and reputation-wide. If I
  suffer trust death in one society, am I dead everywhere, given that `/why-web4` says communities
  are federated and forks preserve your history?"* Same defect class as Q14: two of the site's own
  correct facts, on the same page, that never meet.
- **What canon settles, and it is only half.** Reputation scope is answered flatly and repeatedly:
  `core-spec/r6-framework.md:76`, `core-spec/r7-framework.md:86` and `:252` (a *"Critical Design
  Principle"*), and `core-spec/reputation-computation.md:86` (marked **CRITICAL**) all state that
  **there is no global reputation, all reputation is role-contextualized**, with T3/V3 stored on
  the MRH role pairing link, so *"an entity can have different reputations in different roles"*.
  `core-spec/SOCIETY_SPECIFICATION.md` §2.3 (`:132`) and §4.2.1 (`:281`) make citizenship a
  per-society status machine (`APPLIED / PROVISIONAL / ACTIVE / SUSPENDED / TERMINATED`) whose
  `terminate` produces a recorded status in **that society's** ledger. So there is no single global
  number for a global death to be read against, and ending someone's standing is a society-ledger
  event.
- **What canon does not settle.** Canon has **no trust-death concept at all**: `grep -riE
  "\bdeath\b|survival"` over `core-spec/` returns nothing on point. That absence is exactly ledger
  **Q4**. So the step from *reputation is role-scoped* to *a trust death is society-scoped* is
  4-life's entailment, not a citation, and the site says so in the `/how-it-works` voice rather
  than asserting it.
- **The trap, and why the first draft of the fix was rejected in policy review.** "Trust death is
  society-specific, not global" is the obvious clause and it is **wrong to ship**, for two
  independent reasons:
  1. `core-spec/mcp-protocol.md` §7.5 makes cross-society reputation propagation **normative**, not
     future work: a per-action `propagation_scope` enum (`responding_society` / `caller_society` /
     `both` / `encompassing_society`), plus an accumulated society-society T3/V3 tensor at the
     encompassing society's ledger. Consequences do cross borders; what does not cross is a shared
     score.
  2. The site's own DUI clause says the opposite of "stops at the border": the glossary Society
     Ejection card and `first-contact:933` both say an ejection *"is visible globally, affecting
     how other societies perceive you (like a DUI affecting your pilot's license)"*. A clause
     saying the verdict stops at the border would have opened a **new** two-surface seam while
     closing one.
  - **Do not cite `reputation-computation.md` §10** (*"Cross-Society Reputation"* under **Future
    Evolution**) as evidence that propagation is unbuilt. Upstream's own audit
    `docs/audits/C123-reputation-computation-3rd-delta-2026-07-01.md:116` records finding X-2 as
    **STILL OPEN**: *"§10 frames cross-society reputation as 'Future Evolution'; mcp §7.5 already
    makes it normative."* Quoting §10 here would be falsified by upstream's own tracker.
- **The narrow question for upstream.** Given that reputation is role-scoped and citizenship
  termination is a per-society status, and given that R7 Reputation propagates across societies by
  `propagation_scope`: **is there any mechanism by which one society's termination of an entity
  entails termination elsewhere**, or is the reach of a termination always mediated by each other
  society's own judgment of the propagated record? A ruling either way also tells 4-life whether
  "permanent" in *"trust death is permanent, a destroyed reputation can't be reset"* is a claim
  about one society's ledger or about the entity.
- **Why this is not Q4, Q5 or Q14.** Q4 asks whether the spec should define a trust-death predicate
  at all. Q5 asks what ends a life **other than** ATP = 0. Q14 asks **what score** the existing
  predicate is read against (passively decayed or not). Q15 assumes the predicate and the score and
  asks **how far its result reaches**. None of the four answers any other.
- **Holding pattern**: `/how-it-works#two-ways-to-die` now states the two things the site can
  defend (trust is never one universal number and each society keeps its own view; the record
  crosses the boundary and can weigh on how others judge you) and says the rest is not settled.
  `/lct-explainer` answers the Q6 half at the sentence that prompted it, by propagating
  `first-contact:834` verbatim (*"Your history persists either way"*). No verdict-propagation rule
  invented, no endpoint asserted, the guarded death sentence untouched.

### Follow-up (not a canon question): "karma tier" is an orphaned term - RESOLVED 2026-08-07

**Resolved by the 2026-08-07 15:00 session.** Option (b) was taken, in the propagation form rather
than the deletion form: the orphaned rider was replaced everywhere by the positive half the site was
**already shipping correctly** at `coherence-index:1365`, so no new claim was authored.

Canonical tail, now byte-identical on all six surfaces (modulo styling and Alice's name):

> The number compared is **raw** trust, not effective trust (raw x CI^2). A lower CI raises your
> costs and narrows your access; it does not push you toward trust death.

Three things the resolution turned up that the filing below did not have:

1. **The filing's count of five was a truncated grep.** There is a sixth surface,
   `first-contact:309`, inside a `<details>` ("Why 'raw'?") phrased with Alice's name. Found by
   sweeping the *claim* (`grep -rn "effective trust"`) instead of the phrase.
2. **A seventh surface asserted the OPPOSITE, and was deleted.** `web4-explainer:159-161` read
   *"In 4-Life, CI determines whether an entity remains 'alive' - drop below the coherence threshold
   and the society rejects you."* Two defects at once: it contradicted the canonical rider on all six
   surfaces, and it asserted a mechanism the site does not have (`grep -rni "coherence threshold"`
   over `src/` returns only that line, `coherence-index:1429`'s *configurability* statement, and the
   `glossary:967` block fenced *"not part of the Web4 ontology"*). Deleted rather than reworded, per
   the #520 precedent on that same page: removing a false claim asserts nothing in its place. The
   canonical clause was **deliberately not** propagated there, because that page never mentions the
   survival line, 0.50, trust death, or raw trust, and pasting it in would have introduced three
   undefined nouns. That gap is recorded in a guard so a later pass does not read it as an oversight.
3. **The first draft of the replacement was wrong and policy review caught it.** It read *"effective
   trust sets what your actions cost and what you can do right now"*. The cost half is false: ATP
   cost is `1/CI^2`, a function of CI alone, while effective trust is `raw x CI^2`. Raw 0.6 and raw
   0.9 at CI 1.0 have different effective trust and **identical** cost multipliers. The site's own
   framing (`coherence-index:249-252`, *"the same coherence factor working in two directions"*) makes
   CI the common cause of both effects, and the draft would have inverted that into a parent-child
   relation. **Attribute cost and access to CI, never to effective trust.**

Guards updated at `first-contact:148-166` (full rationale) and `:418` (dead `/karma-journey`
citation removed), `how-it-works:718`, `glossary:1195`, `coherence-index:1358` (marked as the
source surface), `lct-explainer:1279`, `karma-consequences:836`, and `web4-explainer:134` +
the new deletion-site guard. Stale line refs corrected in the same pass (`glossary ~1191` to 1211,
`how-it-works ~608` to 731, and `web4-explainer`'s "In 4-Life" family enumeration, whose "L137"
and "L171" were both off by +22 and whose count of seven is now five).

`/karma-consequences:850` keeps its **truncated** copy, stopping at "a single stumble". That page
never mentions CI, so the raw-vs-effective tail would disambiguate a formula the reader has not met
there. The truncation is intentional and is now labelled as such.

---

*Original filing, kept for the record:*
Filed 2026-08-07 alongside Q14, from the same browse (*"'karma tier' is introduced here and I
never found out what one is"*). This is **not** for upstream: it is a 4-life cleanup that needs a
design decision, recorded so the next session does not rediscover it.

- The clause *"effective trust (raw × CI²) sets your karma tier, not whether you live"* is
  asserted on **five** pages, as a rider on the verbatim-locked canonical survival sentence:
  `first-contact:156`, `how-it-works:731`, `coherence-index:1364`, `glossary:1211`,
  `lct-explainer:1285`. It is defined on **none** of them.
- `grep -rni karma ../web4/web4-standard/core-spec/*.md` returns **zero hits**. Canon has no karma
  concept, so there is nothing upstream to escalate to.
- Its provenance is a retired page. `first-contact:418`'s own guard comment reads *"carried forward
  per **karma-journey**'s karma-tier model"*, and `/karma-journey` is one of the 34 routes retired
  in the Jul-15 rebuild. The tier model went with it.
- `/karma-consequences`, the only page that could plausibly own the term, models karma with a flat
  `karma_multiplier = 2` (`:634-639`). There are no tiers.
- **Not fixed this session, deliberately.** The options are (a) define tiers, which invents a model
  to justify an orphaned phrase, or (b) drop the "karma tier" rider from all five copies while
  keeping the raw-vs-effective contrast, which is load-bearing and Q1-threading. (b) is probably
  right, but it edits five verbatim-locked surfaces and deserves its own policy-reviewed pass, not
  a rider on a visitor-friction session.

### ~~Follow-up: "identity is hardware-bound" on /karma-consequences~~ DISCHARGED 2026-08-08

Filed 2026-08-07. Noticed while fixing Q8's hardware-required claim class, and left alone because
the honest fix is larger than a hedge. `/karma-consequences` asserts *"In Web4, identity is
hardware-bound"* at `:16`, `:306`, `:382` and `:811`, and that universal is the load-bearing premise
of the page's whole thesis (you cannot mint a clean slate, so karma follows you). Under Q8 Ruling 1
software-only identities are conformant and cheap to mint, so the no-fresh-start argument is
weaker for that tier than the page claims. This is not a word-level correction: it changes what the
page argues, and it needs its own scoped session.

**Addendum 2026-08-07 (15:00 session), so the eventual sweep starts from a complete list:** there is
a **fifth** instance, off that page. `src/lib/terms.ts:178` (the `Karma` term, rendered by
`TermTooltip` wherever `<Karma>` appears, and by `GlossaryPanel` under "Behavior") ends: *"You can't
escape history by 'starting fresh' - hardware-bound presence prevents that."* Same universal, same
load-bearing role, and it is the **widest-reach** surface of the four, since a tooltip follows the
term everywhere rather than living on one page. Found incidentally while confirming that `terms.ts`
was free of "karma tier" (it is). Not fixed here: it is the same claim class as the four on
`/karma-consequences` and belongs in the same scoped pass, not in a karma-tier cleanup.

**DISCHARGED 2026-08-08 (09:00 session), and the Aug-08 visitor filed it independently as their
only HIGH before the sweep ran.** Their framing is worth keeping, because it explains why an
under-hedged sentence was the *most* damaging kind of defect on this particular site: *"On a site
that hedges everything, an unhedged absolute reads as a deliberate signal that this one is settled
... I did not catch this by being clever. Any reader who reads more than one page will hit this."*

- **What shipped.** The thesis is scoped to the hardware tiers rather than hedged, per Ruling 1
  (`LCT-linked-context-token.md:39` §1.2 clause 1, *"MUST NOT be excluded by the protocol"*), and
  the exception is handed to the reader instead of left for them to find on a Going Deeper page.
  The load-bearing paragraph is `/what-could-go-wrong:752-759` carried over as a **unit**, not the
  `:757` sentence alone: `:757` opens *"the very gap that"*, whose antecedent is the device-loss
  paragraph above it there, and `/karma-consequences` had **zero** prior occurrences of
  "software-only", "Sybil", "ceiling" or "FIDO2" to receive it.
- **The recorded list of five was a truncated grep.** The class ran to **13** surfaces:
  - `/karma-consequences`: `:7` and `:16` (header), `:306`, `:382-384` (the boolean readout),
    `:420-421` (the emerald panel), `:793` and `:798` (the "Web4 Solutions" bullets, missed by
    every grep including the policy reviewer's), `:811-812`, `:817`
  - `/karma-consequences` `COMPARISON_SYSTEMS` (the illustration behind the `:382` label:
    `identityBound: true` with `issues: []` and the comment *"It's the solution, not the problem"*)
  - `src/lib/terms.ts:178`
  - `/first-contact:367`, `:370`, `:960-961`
  - `/glossary:551-558`
- **Two surfaces took DELETION, not a caveat.** `/first-contact:367` and `:370` sit in a
  default-collapsed 4-card grid before the Start button, under a standing no-reword guard whose
  rationale is density (Jul-13 vocab wall, Jul-17 pre-Start caveat pile-up, filed LOW). Ruling 1
  does not reverse a density guard, so the absolutes were removed and the premise scoped, adding
  nothing: that card is now shorter. The guard got an addendum recording that a gloss was narrowed
  for correctness, not reworded for style, so a later pass does not read it as violated.
- **Deliberately NOT done**: no ceiling number, no survival line, and no at-0.50 claim in either
  direction entered `/karma-consequences`. That is the Q8 **equity** half, still under its holding
  pattern; the sweep links to `#risk-accessibility` and `#software-only-survival` rather than
  re-arguing it. Q8 requests 2 and 3 remain open and still need Q1.
- **Lesson for the next sweep**: the illustration is a separate surface from the prose *and it has
  two halves*. Qualifying the caveat panel (right column) would have left the `identityBound`
  boolean printing a flat green **"Yes"** in the left column, which is
  `[[prose-fixed-thrice-check-the-illustration]]` in miniature. And `issues: []` was load-bearing:
  the render branches on `issues.length`, so putting the honest text there would have deleted the
  "Why This Works" panel and printed a red "Attack Vectors" header, overshooting into false parity
  with the platform rows.

### Follow-up: the DEFINITIONAL half of the same claim - definition-of-record slice done, body prose open

Filed 2026-08-08 (15:00 session, the second session on the Aug-08 log). The sweep above discharged
the claim where it was **arguing** something (the no-fresh-start thesis). It deliberately left the
places where the site simply **defines** LCT, and `SESSION_FOCUS.md` logged two of them as *"Open
for a later pass ... a site-copy call, not a canon one."*

Ruling 1 reaches the definitional half identically. `LCT-linked-context-token.md:39` (§1.2 clause 1)
says an entity that can present only weak evidence *"MUST NOT be excluded by the protocol"*, and
§1.3 defines **Binding** as a *"permanent, verifiable cryptographic link between entity and LCT"*
with no hardware term. A definition that says an LCT *is* hardware-bound excludes a conformant tier
by construction, and it is the tier a fresh `hestia init` lands in.

**The list logged as "two surfaces" was a truncated grep, for the third time on this claim.** The
09:00 session's recorded five ran to 13. This session proposed six and the policy reviewer's
independent grep found roughly three times that, including the single most conspicuous surface:
`/lct-explainer` itself, the page whose entire job is to define LCT, **including its `<title>`**.

**How the grep was run**, so the next pass can reproduce and extend it rather than re-derive it:

```
grep -rnE "hardware.?(bound|rooted|anchored|backed|based|tied|locked)|rooted in hardware|bound to (physical )?(hardware|a device|your device)|security chip" src/ --include=*.ts --include=*.tsx
```

**2026-08-10: that pattern is structurally blind to the bare-noun form, which is why the worst
instance was missing from every enumeration above.** `hardware.?(bound|rooted|anchored|backed|
based|tied|locked)` requires one of the enumerated adjectives to follow the noun. It therefore
**cannot** match `/why-web4`'s *"when a new identity is created by the same **hardware (LCT)**"*,
where what follows is a parenthesised acronym. That sentence sat on a beginner-path page for four
enumerations of this class and was found only by reading the card for an unrelated reason (ledger
Q5). Fourth truncation of this grep, and the first caused by the *pattern* rather than by stopping
early: `[[claim-class-grep-truncated-enumerate-remainder]]`. Add the bare-noun alternation, and run
both:

```
grep -rnE "hardware \((LCT|the LCT)\)|same hardware" src/ --include=*.ts --include=*.tsx
```

Site-wide that now returns only two innocuous hits (`/coherence-index` device fingerprint,
`/atp-economics` device chain) plus the `/why-web4` guard comment quoting the sentence it removed,
so it is cheap to keep in the checklist and will stay quiet until a new instance appears.

~120 hits. **Most are correct and out of scope**: anything describing the hardware tiers *as* the
hardware tiers (hardbound's product copy, TPM/Secure Enclave/FIDO2 mechanics, `/what-could-go-wrong`
risk 4 and the device-loss risk, `/why-web4`'s equity card (`grep -n "What hardware buys is"
src/app/why-web4`), `/lct-explainer#software-only-survival`, `/trust-tensor:420`,
`/karma-consequences` after the sweep above). The defective class is narrower:
**a surface is defective iff it makes hardware definitional of LCT, or of Web4 identity as such,
rather than describing what hardware anchoring buys.**

**Shipped this session: the definition-of-record slice.** Boundary, stated so it can be falsified:
a surface is in the slice iff its *job* is to say what LCT or Web4 **is**, in a line or two, out of
narrative context. That means term-registry entries, acronym-index rows, page `<title>`/meta/OG,
one-line manifest definitions, glossary term cards, and *"Shorthand: X just means Y"* restatements.
- `src/lib/terms.ts` LCT `brief` and `explanation`; Web4 `explanation`
- `src/app/glossary/page.tsx` acronym-index LCT row; Web4 card; LCT card and its Plain English line;
  the *"Web4 = ..."* one-liner (all four move together or the page contradicts itself)
- `src/app/manifest/page.tsx` LCT primitive line
- `src/app/lct-explainer/layout.tsx` `title`, `description`, `openGraph.description`
- `src/app/web4-explainer/page.tsx`, the opening LCT definition
  (`grep -n "linked context token</strong>"`)
- `src/app/why-web4/page.tsx`, the *"2. Device-Anchored Identity"* card: its body and the
  *"Shorthand: LCT ..."* line it glosses (`grep -n "Shorthand: LCT"`)
- `src/app/what-could-go-wrong/page.tsx`, the LCT gloss in the opening definition list
  (`grep -n "witnessed by your devices"`)

Vocabulary is **propagated, not coined**: `terms.ts`'s Karma entry (from the sweep above,
`grep -n "faster trust recovery when you restart" src/lib/terms.ts`) already splits *"anchored in
hardware"* from *"anchored in software alone"*, and `/why-web4` already says *"what hardware buys
is **ceiling**, not entry"* (`grep -n "What hardware buys is" src/app/why-web4`).
**Device-anchored** is the tier-neutral
parent, **hardware-anchored** the strong form. No ceiling number, no survival line, and no at-0.50
claim in either direction entered any file.

**NOT done, enumerated so the next pass starts complete.** These are body prose and illustrations,
several under their own guards, and several need the surrounding paragraph read before they can be
classified. This is a **grep result requiring per-surface judgment, not a verdict**: some will turn
out to be correctly tier-descriptive.

Surfaces in files **this session edited** are named by their text, not numbered: a line number
written here rots by this session's own insertion into that file, which is exactly what happened
to the first version of this list ([[guard-comment-cites-rot-name-the-target]]). Files this
session did **not** touch keep their numbers, since nothing here can move them.

In files this session edited, quote the string to `grep -n`:
- `/how-it-works/page.tsx`: *"Unforgeable identity rooted in hardware"*;
  *"Hardware-bound identity, unforgeable"*; *"Hardware-bound identity proves you"*
- `/first-contact/page.tsx`: the section heading *"Presence: Hardware-Bound"*; the Web4-solution
  line *"is bound to physical hardware"*; the *"What You Now Understand"* checklist item
  *"be faked (hardware-bound)"*
- ~~`/why-web4/page.tsx`~~ **row WORKED 2026-08-10 (03:00 session)**, while that session was in the
  file for the Q5 card above. All three definitional universals took **bare deletion of the
  adjective**, which is the whole fix here: the surrounding claim is true of every LCT, and only the
  hardware word narrowed it to one tier.
  - *"is hardware-bound identity and cross-platform portability"* -> *"is an LCT and cross-platform
    portability"* (this one was the worst of the three: it made hardware the thing that separates a
    *"real Web4 wrapper"* from a Discord bot, i.e. definitional of Web4 itself)
  - *"Each hardware-bound LCT is a distinct cryptographic identity"* -> *"Each LCT is a distinct
    cryptographic identity"* (its own heading, *"Per-context LCTs on separate devices"*, already
    scopes the strategy, so the adjective added nothing but the universal)
  - *"trust history travels with your LCT - your hardware-bound identity"* -> appositive deleted
  - **The minors FAQ pair is NOT defective, and this is a boundary ruling for the next pass, not a
    skip.** Applying this section's own test (*"defective iff it makes hardware definitional of LCT,
    or of Web4 identity as such, rather than describing what hardware anchoring buys"*): the answer
    reads *"A 13-year-old **with their own phone** gets a hardware-bound LCT just like anyone
    else"*, whose antecedent scopes it to the hardware tier, and the question is asking **about**
    hardware-bound identity rather than defining LCT as such. Reworded, it would say less. Left
    verbatim on purpose; do not re-file it.
  - Two further `/why-web4` surfaces the recorded grep matched but this list never contained, both
    **entry** claims rather than definitions, both fixed the same way (narrow the quantifier, explain
    nothing): *"Each colluder needs real hardware-bound identity (LCT)"* now borrows this page's own
    already-scoped sentence 550 lines away (`grep -n "climbs above the software-only ceiling"`), and
    *"every LCT traces back to a hardware-anchored human or org"* is narrowed to the agent's own LCT
    and its issuer. Neither touches Q3 or the Q8 equity half.
- `/glossary/page.tsx`: *"share hardware-bound presence"*
- `/atp-economics/page.tsx`: *"5 theorems, hardware-bound identity"*;
  *"the same hardware-bound device chain that signs everything else"*

**2026-08-16: fifth truncation, and this one is on the page that supplied the fix.** The Aug-08
sweep carried `/what-could-go-wrong:752-759` out to thirteen surfaces as the canonical scoped
paragraph, and never checked the FAQ accordion on the same page. Two entries there carried the
universal in its strongest form, in the answer about **CSAM and terrorism**, where it overstates
what enforcement can actually reach:
- *"Every action in Web4 is signed by a hardware-bound identity"* (matched by the recorded grep,
  so this one was simply never read)
- *"Because LCT links identity to physical devices, 'ban evasion' requires obtaining new hardware.
  Revoked identities can't simply create new accounts - their devices are flagged"*
- *"the auditable trail - hardware-signed identity, timestamps, content hashes"* inside the worked
  law-oracle example

Both entries said, in a CSAM answer, the opposite of what risk 8 says 560 lines below on the same
page (*"a dishonest user's record is sheddable"*). All three are fixed, and the two entries are
merged into one (Aug-15 visitor LOW). Nothing was escalated: Ruling 1 covers it.

**The recorded grep is blind to the second one, and the blindness is a NEW shape.** The Aug-10
note added the bare-noun form (`hardware (LCT)`). This instance states the binding as a **verb
phrase with no `hardware` adjective at all**: *"LCT links identity to physical devices"*. Neither
recorded pattern can match it. Third pattern-caused truncation of this class. Add and run:

```
grep -rnE "(links|ties|binds|linking|tying|binding) (your |an? )?identit(y|ies) to|new hardware|devices are flagged" src/ --include=*.ts --include=*.tsx
```

**It returns three surfaces outside this session's file, none of which appears anywhere above.**
Not fixed here (out of an approved one-file scope), enumerated so the next pass starts complete,
and all three need the per-surface judgment this section already requires:
- `src/lib/terms.ts:249`, the **Sybil** term: *"Web4 resists this by tying identity to physical
  hardware - each fake identity needs a real device."* Definitional of Web4 as such, and rendered
  by `TermTooltip` and `GlossaryPanel` wherever `<Sybil>` appears, so it is the same
  widest-reach shape as the Karma entry the Aug-07 addendum caught. Note the page just fixed
  says the opposite in its own words (Sybil *resistance*, not prevention).
- `/your-internet/page.tsx:149`: *"Even if you abandon an identity and start fresh on new
  hardware, you begin at zero"*. The no-fresh-start thesis, unscoped. This file already has
  `:104` and `:131` listed above; `:149` was missed by both.
- `/first-contact/page.tsx:1123`: *"New identity requires new hardware ($$$)"*. This file already
  has three listed surfaces; `:1123` was missed by all of them.

In files this session did not touch, the numbers still hold:
- `/lct-explainer/page.tsx` (the big one, the page that owns the definition): **SUPERSEDED and
  worked.** This row listed 13 lines; the corrected grep returned 39, and 47 case-insensitively.
  Do not use these numbers: the Aug-09 03:00 pass edited this file, so they are stale, and the
  row was a truncated enumeration to begin with. See the disposition section below,
  *"`/lct-explainer/page.tsx`, the whole page, and why the grep kept lying"*, which names its
  targets by string.
- `/your-internet/page.tsx`: `:104`, `:131`. Note `:104` contradicts `:102` **on the same card**,
  which already ships the correct scoped version
- `/identity-constellation/page.tsx`: `:44`, `:125`, `:403`
- `src/components/InteractiveWireframes.tsx:76`
- `/learn/page.tsx:266`, `/day-in-web4/page.tsx:55`

**Explicitly excluded as already correct**: `/web4-explainer`'s society-root line (*"A society's root LCT is
**intended to be** hardware-bound"*, hedged and scoped to society roots), `/tldr:226` and
`page.tsx:53` (glossing the **hardbound** product name, not LCT), and every TPM/Secure Enclave
mechanics passage.

**Not escalated.** Nothing here needs a canon ruling: Ruling 1 already settles it. This is a
site-copy sweep with a known remainder, tracked here only because the remainder has now been
truncated three times.

### Disposition: `/lct-explainer/page.tsx`, the whole page, and why the grep kept lying

Worked 2026-08-09 (03:00 session). The section above named this file *"the big one, the page that
owns the definition"* and listed **13** lines on it. That list was short a **fourth** time.

**The count, three ways.** The recorded grep returns **39** on this file, not 13. Adding `-i`
returns **47**. A whitespace-normalized pass adds two more spans. The reason is not diligence, and
this is the part worth keeping:

- **The recorded grep is case-sensitive.** It misses 8 sentence-initial `Hardware-bound` lines,
  including the `Credential Stuffing` verdict in the *same data array* as the `Key Duplication`
  one that was on the list.
- **The recorded grep is per-line.** It cannot see JSX prose wrapped at ~100 columns. Two true
  wrap spans on this page: the "Token" clause of the name etymology (*"It lives in your device's
  security / chip"*, a definition-of-record surface sitting inside the hero, `grep -n "the thing
  itself: a cryptographic key"`) and the *"tamper-resistant security / chips"* span, correct as-is
  (`grep -n "tamper-resistant security"`).
- **The pattern is anchored on `hardware-<suffix>` compounds and cannot see hardware as a bare
  noun or subject.** This is the sixth blind spot and the one no version of the grep has ever
  caught: `keys in hardware` (the `Password Database Breach` verdict), `Hardware requires`
  (`Phishing Attack`), `Hardware attestation` (`Man-in-the-Middle`), `rooted in physical chips`
  (the `Hardware Binding` component-registry entry), `a presence your hardware proves` (the
  *"What Is an LCT?"* informal definition), `Web4 trusts what hardware proves` (the Key-insight
  triad).

**Corrected grep. Record this one, and run a normalized pass beside it.**

```
grep -rniE "hardware.?(bound|rooted|anchored|backed|based|tied|locked)|rooted in (hardware|physical chips|the silicon)|bound to (physical )?(hardware|a device|your device)|security chips?|hardware proves|keys in hardware|[Hh]ardware (requires|attestation)" src/ --include=*.ts --include=*.tsx
```

Four under-counts in a row on this claim class were **four instances of the same two bugs**, not
four lapses of diligence. Two more of the same shape happened inside this session: my own count
of "34" was an eyeball miscount of terminal output, and the policy reviewer's `:1466` pointer was
a line number transcribed from a different `sed` window (the surface it meant is the Key-insight
triad). Three for three, same mechanism: **a number transcribed instead of derived.**

**Which is why this entry no longer carries line numbers into this file.** Every cite below names
the string to `grep -n` in `src/app/lct-explainer/page.tsx`. The first version of this table
numbered them, and 55 of its 56 cites were stale by the time it was written, each off by this
session's own net insertion into the file it was enumerating
([[guard-comment-cites-rot-name-the-target]]). A transcribed number was the finding; the table was
made of them.

**FIX, 21 surfaces**, all propagation, no coined vocabulary:

| Anchor (`grep -n` in `src/app/lct-explainer/page.tsx`) | What it said | Why defective |
|---|---|---|
| `behavior-proven` | JSDoc header, *"your hardware-bound ... participation"* | file's own self-description; not rendered, fixed so the next grepper is not misled |
| `Hardware Binding` component-registry entry | *"Your presence is rooted in physical chips"* | component-registry definition of **presence as such**; component name `"Hardware Binding"` kept, it genuinely is that |
| `attackScenarios`: `Password Database Breach`, `Phishing Attack`, `Credential Stuffing`, `Man-in-the-Middle`, `Key Duplication` | the panel's Web4 verdict column | see below |
| `More precisely: a digital ID` | the hero's *"More precisely"* definition | the page's **first** definition |
| `the thing itself: a cryptographic key` | the "Token" clause of the name etymology | definition-of-record, inside the hero |
| Key Takeaway 1 (`grep -n "Your identity lives"`), **first clause only**| the takeaway list's opening claim | the silicon / key-non-extraction mechanism after it is correctly tier-descriptive and survives untouched |
| `multi-witness, revocable` | the comparison grid's Web4 *"Strength:"* cell | comparison-grid illustration |
| `Web4 trusts what` (the Key-insight triad) | *"Web4 trusts what hardware proves and witnesses verify"* | **pure deletion of four words.** the *"Identity is: What witnesses verify"* row already ships *"Identity is: What witnesses verify"* 23 lines above in the same block, so this makes them byte-consistent, preserves the triad's `memorize / store / X` parallelism, and takes net words down |
| `mean a real-name identity` | *"Hardware-bound identity doesn't mean real-name identity"* | one word |
| `is enough; expand for the specifics` | the skip-ahead gloss | matched to the shorthand shipped in `/why-web4`'s *"2. Device-Anchored Identity"* card |
| `Pseudonymous` | comparison-table cell, *"Pseudonymous - hardware-bound"* | the row's subject is pseudonymity; hardware was gratuitous |
| `not a password you type` (and the two lines bracketing it) | the *"What Is an LCT?"* informal definition | three fixes in one sentence, see note |
| `contextual proof of presence` | *"In short, a hardware-bound, witnessed, contextual proof of presence"* | the formal recap on the definition-owning page |
| `energy budgets don` | *"Without hardware-bound presence, energy budgets don't work"* | **deletion**; the sentence immediately before it already says *"Verified presence is the foundation"*, so the correct word was sitting in front of it |
| `they resist forgery` | *"Because LCTs are hardware-bound and multi-witnessed, they resist forgery"* | the bullets under it name TPM/Secure Enclave/FIDO2 and stay |
| `faq-ai-agents` (`grep -n "human or org at the root"`) | *"there's always a hardware-anchored human or org at the root"* | the card's real point is that an AI **inherits** an anchor through a delegation chain rather than possessing one; the hardware qualifier does no work in that argument and makes the root tier-exclusive |
| `Shared devices can` | *"An LCT is bound to hardware that only you control"* | falsified by the *"you can still participate at the"* sentence six lines down on the **same card** |

**The `attackScenarios` panel is one surface, not seven cells.** The reader drives it with a
scenario selector, so all seven Web4 results are read consecutively. Five of them answered
*"why is Web4 safe?"* with *"hardware"*. Fixing the two the grep could see would have left the
panel making the same move three more times, which is exactly the shape visitor log line 120
describes (*"the site is more honest in its prose than in its examples"*).

- `Password Database Breach` -> the no-passwords / no-central-database facts are true at **every** tier; *"keys in
  hardware"* was doing no work in the verdict. Deletion.
- `Phishing Attack` -> phishing fails because there is no secret to type, not because of biometrics. The
  stated reason was both hardware-definitional **and** not the actual mechanism.
- `Credential Stuffing` -> *"Key-based identity"*. True at every tier, which is the point.
- `Man-in-the-Middle` -> signatures do the work; *"Hardware attestation + "* deleted.
- `Key Duplication` -> *"IMPOSSIBLE"* is false at the software-only tier, where the key **is** a file.
  Now scoped, and the tier asymmetry is stated rather than deleted.
- **KEEP `Device Theft`**: its condition sits inside a **restrictive noun phrase**,
  *"Keys in TPM/Secure Enclave"*, so a software-only reader is not told their keys are safe.
  This is the exact distinction from `Key Duplication`, whose *"Keys hardware-bound"* was a **predicate
  about Web4 keys as such**. Do not "align" these two.
- **KEEP `Insider Threat`**: no hardware claim at all.

**Safe to edit, and why it was not last time.** `web4Result` has **no load-bearing render
structure**: the three `{attackScenarios[attackScenario].web2Result}` / `.web4Result` render sites
(`grep -n "attackScenarios\[attackScenario\]"`) are flat `<div className="text-sm ...">{...}</div>`,
no `issues.length` branch, no color derived from the string. Unlike #525's `identityBound` case,
editing these cells cannot silently delete a panel.

**Note on the *"What Is an LCT?"* informal definition** (`grep -n "not a password you type"`, plus
the lines bracketing it)**.** Three fixes in one sentence. The middle one was **not** in the grep class
and was found only by reading: *"not a key file you store"* was the Web3 contrast, and it is false
at the software-only tier where the key **is** a file. Replaced with the already-shipped
*"not a username a server looks up"* contrast from the "Token" clause of the name etymology
(`grep -n "the thing itself: a cryptographic key"`). The Web2/Web3/Web4 comparison it used to
carry lives intact in the Key-insight triad (`grep -n "Web2 trusts what you memorize"`).

**KEEP: ~25 surfaces, stated as a rule you can re-derive rather than a list you must trust.**
Run the corrected grep above and subtract the FIX table: **every remaining hit on this file is
tier-descriptive**, saying what hardware anchoring **buys** rather than making it definitional,
which is the correct claim. That rule regenerates the list; the numeric version of it did not
survive its own session. The ones carrying a reason beyond "tier-descriptive":

- **The trust-scale explainer** (`grep -n "is the neutral midpoint"` and the *"hardware-bound
  ceiling"* sentence under it) carries an **explicit do-NOT-reword guard** and was untouched.
- **The code block's own comment** (`grep -n "// Web4 flow"`) is scenario-scoped: the block
  renders the Face ID plus chip flow, so naming hardware there is describing that scenario.
- **The `TermTooltip` ceiling gloss** (`grep -n "takes hardware-anchored presence"`) was already
  fixed by #525.
- **Q8-EQUITY adjacent, deliberately not touched**: the older/cheaper-devices FAQ
  (`grep -n "What about older/cheaper devices"`) and the `$50 phone` affordability line
  (`grep -n "is roughly a \$50 phone"`). They carry the ceiling number and the affordability
  framing, and the equity half is under a holding pattern.
- **The one KEEP whose correctness depends on a sentence above it** rather than on its own
  content: the walkthrough's *"identity lives in the hardware, not usernames"*
  (`grep -n "not unique - identity lives"`) is **scenario-scoped by the Minute 0:00 stipulation**
  (`grep -n "The app detects your device"`) that the app finds a TPM or Secure Enclave. Tripwire:
  if that walkthrough ever gains a software-only variant, or if the Minute 0:00 line is edited,
  the Minute 0:30 line becomes defective **silently**.

**Aug-09 (21:00) addendum, one more surface, found by the review of this pass.** Under the
*"Because LCTs are device-anchored and multi-witnessed, they resist forgery"* lead that this
session softened, the **first bullet** still read *"Keys exist only in secure hardware (TPM,
Secure Enclave, FIDO2), never exported"* - the universal, three lines below the lead, stated
**harder** than the lead. Same shape as the `Key Duplication` cell this session fixed, and the
exact opposite of the `Device Theft` cell it kept. Rewritten into the restrictive form, which is
propagation rather than new vocabulary (`grep -n "generate keys internally"` and
`grep -n "Keys in TPM"` both already ship it). **KEEP** the *"Hardware attestation proves keys
are in real chips"* bullet in the same list: it says what hardware attestation **does**, which is
the tier-descriptive class this entry already excludes as correct, not a claim that every LCT has
one. The lesson generalizes past this bullet: **softening a lead puts every line under it in
scope**, because a bullet list inherits its lead's subject.

**Render honesty.** The *"energy budgets don't work"* sentence is gated behind
`exploredAttacks.size >= 5 && exploredComponents.size >= 4`, and *"they resist forgery"* sits
inside a collapsed `<details>`. Both ship, neither is a front-page surface.

**Fences held.** No ceiling number, no survival line, and no at-0.50 claim in either direction
entered any file. The trust-scale explainer and its do-NOT-reword guard were untouched.

**Still open**, unchanged by this session: every non-`/lct-explainer` file in the remainder list
above (`/how-it-works`, `/first-contact`, `/your-internet`, `/identity-constellation`,
`/why-web4` body prose, `/glossary`'s *"share hardware-bound presence"* line, `/atp-economics`,
`InteractiveWireframes.tsx`,
`/learn`, `/day-in-web4`). Re-run the **corrected** grep against each; the 13-line list for this
page understated it by roughly 3x, and the same understatement should be assumed everywhere else.

### Follow-up: `/learn`'s teaser layer is structurally invisible to page-level sweeps

Filed 2026-08-13 (09:00 session), while fixing the Aug-13 visitor's two HIGHs. Not a canon
question: Ruling 1 already settles the licensing. This records a **class of surface**, because
the two stale instances found here are evidence of it rather than the point.

**The structural finding.** `/learn`'s `LEARNING_PATH` is a data structure of `teaser` strings,
each one a one-line summary of a *different* page's claim. A teaser therefore lives on a
different page from the claim it restates. Every sweep this project has run has been
page-scoped, so **every page-level fix since Aug-05 has corrected a page and left its teaser**,
by construction and not by accident. `/learn` also owns the five-page reading path, so its
teasers are read before the pages they summarize.

**Evidence (both fixed this session).** Each contradicted a destination that had already been
corrected:

| Teaser | Destination | Destination fixed | Teaser was |
|---|---|---|---|
| the `/lct-explainer` card, *"Faking identities means buying devices"* | grep `accounts are cheap to create, but trust is not` | Aug-07 | untouched |
| the `/karma-consequences` card, *"Abandoning an identity means starting over from zero"* | grep `Karma follows a hardware-anchored identity` | Aug-08 | untouched |

**No count is published here, deliberately.** This ledger has recorded this one claim class at
5, then 13, then found more twice again. The reproducible predicate instead:
`grep -c '^\s*teaser:' src/app/learn/page.tsx` for the population, and for the class,
`grep -rniE "start(ing)? over from zero|not escaping|abandoning an identity" src/`. **Derive
your own total; do not carry one forward from this entry.**

**The discriminator that makes the class greppable.** The phrase *"start(ing) over from zero"*
carries **two opposite valences**, and only one of them is the claim:

- **Deterrent sense** ("you cannot escape consequences"). True at the **hardware** tiers only.
  This is the no-fresh-starts thesis and is what Ruling 1 licenses scoping.
- **Harm sense** ("device loss destroys you"). True at the **software** tier only, and already
  correctly scoped everywhere it appears.

At the time of writing the grep returns 9 hits, 7 of them harm-sense and already correct, which
is how two consecutive sweeps read the noise as handled and moved on. **Test by grammatical
subject**: a bad actor *abandoning* an identity is the deterrent sense and needs the hardware
scope; an honest user who *lost* a device is the harm sense and is already right.

**Falsification test for any replacement wording**, adopted after the policy reviewer caught a
draft of the `/lct-explainer` teaser that read *stricter* than the sentence it propagated
(*"earning trust is what takes a device"*, which is false of every software-only user who earns
trust below their ceiling): **the sentence must be false of no software-only user.** Preserve
the ceiling / high-trust-roles qualifier without importing a number. The canonical form is
`/why-web4`'s: *"the ceiling caps high-trust roles, it is not what admits you"*, and *"it was
always about the COST OF TRUST, not the cost of entry."*

**Scope call: FILE, do not sweep.** Auditing the remaining teasers against their destination
pages is a larger task than the visitor friction that surfaced it, and running it hastily would
manufacture exactly the truncated artifact this entry exists to prevent. Left for a scoped
session.

**One candidate flagged, deliberately NOT touched.** The `/coherence-framework` teaser
(grep `the 0.5 threshold recurs`) is Q1-adjacent. Its destination does carry `C >= 0.5` and a
`T3 >= 0.5` rebirth-eligibility comparator, which **Q1 above calls the deliberately-untouched
legacy comparator**. The teaser asserts only that the threshold *recurs*, not what sitting at it
means, so it is **not in this class and not urgent**. Recorded with that reasoning so a later
pass does not read the flag as licence to touch the comparator.

### Recurrence log: Q1 demanded again by the Aug-13 visitor, not answered

The Aug-13 visitor filed as a HIGH that the site should state, where the software-only cap is
stated, that such an identity *"lives permanently at the threshold with no margin it can ever
build."* **No site edit was made.** This is the same composition the Aug-10 visitor filed
(*"sits permanently on the threshold, passing by exactly zero margin"*), disposed the same way:
it is an assertion about what a reader at exactly 0.50 is, which Q1 fences **in either
direction**. `/hestia`'s in-file guard states the local rule: *"Nothing here may say or imply
what a reader sitting at exactly 0.50 is: not alive, not dead, not safe, not eligible."*

Recorded as **evidence of demand**, not as an answer. Two independent naive readers deriving the
same entailment three days apart is signal that Q1's cost is now visitor-visible rather than
merely internal, and it strengthens the case for the escalation. It does not license the claim.

---

*Maintained by the 4-life autonomous track. Add new entries only with a policy-review-approved
session; move entries to "Resolved" only with a spec/test-vector citation.*
