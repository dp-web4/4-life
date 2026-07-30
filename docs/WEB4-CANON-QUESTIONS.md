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
- **Site state**: prose already matches (trust-tensor:866/887, how-it-works:822, why-web4:2256).
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
- **Holding pattern**: site prose stays endpoint-silent ("strictly below + sustained", never
  "at or above 0.50 is alive/dead"); guard comments at lct-explainer callout + First Contact
  legend. PR #444 was rejected 3× for asserting an endpoint; do not repeat.
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
- **Ruling requested**: either (a) confirm ATP = 0 and sustained trust collapse are the only
  life-ending paths, in which case both worked examples are wrong and 4-life rewrites them
  together, or (b) name the third path so the examples can cite it. Also, if convenient, the
  karma carry-forward rule (full vs reduced).
- **Holding pattern**: `/how-it-works` states the gap without filling it, via a shared
  `EndOfLifeCaveat` component rendered at both places the reader meets the numbers: *"none of
  these lives ends at 0 ATP ... What else ends a life is not settled."* No second mechanism is
  asserted, and the numbers are unchanged (rewriting them to end at zero would break the karma
  model, which is canon on both pages). `/atp-economics` is deliberately untouched pending a
  ruling, so the divergence stays visible rather than being half-papered-over.

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

---

*Maintained by the 4-life autonomous track. Add new entries only with a policy-review-approved
session; move entries to "Resolved" only with a spec/test-vector citation.*
