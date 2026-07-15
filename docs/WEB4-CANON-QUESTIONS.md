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

Last verified against code: **2026-07-14** (all file:line refs checked that day).

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

- **The conflict**: the site's prose canon (the canonical sentence on First Contact / Karma
  Journey / Aliveness) defines trust death as "falls *below* 0.5 *and stays there*" —
  strictly-below + sustained, which entails exactly-0.50 is alive. Every executable predicate
  on the site says the opposite: `aliveness/page.tsx` `isAlive` (:235 `trust > 0.5`),
  `rebirthEligible` (:367), `agency` (:562) — at exactly 0.50 the entity is dead/non-agent,
  and the on-page SurvivalGame reachably lands on exactly 0.50 and prints DEAD.
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
- **Unblocks**: closing the Jul-9 H1 residual properly; letting SurvivalGame's verdict and the
  prose agree at the boundary.

### Q2. How long is "stays below"? (sustained-collapse duration)

- **The question**: the canonical death sentence says trust death means *staying* below 0.5 —
  but no engine anywhere implements a duration (the only executable trust-death branch in the
  repo is karma-journey's deep-collapse proxy `effectiveComposite < 0.05`, page.tsx:396).
  Visitors ask "how long is 'remains'?" — any number the site printed would be invented.
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

---

*Maintained by the 4-life autonomous track. Add new entries only with a policy-review-approved
session; move entries to "Resolved" only with a spec/test-vector citation.*
