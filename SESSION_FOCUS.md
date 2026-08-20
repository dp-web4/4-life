# 4-Life Session Focus

*Current priorities, visitor friction queue, concept coverage. Updated by operator and autonomous sessions.*

## Aug-20 03:00 session - the preview that told you the ending before it let you start

**No open PRs at start** (`gh pr list` -> `[]`), branch exactly `origin/main` at `c7a0377`, not
stacked, one 4life session running. **No fresh visitor log**: the cron browses at 05:00 and it is
03:00, so this pass works the queue `SESSION_FOCUS.md` carried forward, not a new log. Took
**MEDIUM 5**, the last unfixed row in `visitor/logs/2026-08-19.md` and the one #562 deferred to
"its own pass". Two files, zero new files, and one of the two has **no rendered change at all**.

### The block moved. Nothing in it did

The five-act rail printed Act 5's outcome directly above the Start button. Visitor: *"spoiling the
walkthrough it is previewing"*, and *"By the time I reached Start I had already been told the
ending ... Everything in front of the Start button should be shorter and consistent with itself."*
Two halves, **spoiler** and **run-up**, and the row is only fixable at container level because the
three cheaper repairs are each closed by something already shipped:

- **chip level** is the visitor's own suggestion and is fenced: `+12` (Aug-09 HIGH x2), `0.54`
  (Aug-13), `0.51` (Aug-14) were each placed at an explicit visitor's request. Three visitors asked
  for these numbers and a fourth asks to remove them ([[naive-reading-right-suggestion-wrong]]).
- **folding the container** is refuted by the block's own guards. The "Suspended, not deleted"
  paragraph carries an Aug-08 guard whose load-bearing sentence is *"It is NOT behind anything -
  this is a static `<p>`"*: that visitor filed the defusal as being behind a spoiler widget when it
  was not, and the fix was the LABEL. A fold makes their complaint true. The Jun-12 guard above it
  records *"one static sentence closes it"* for skimmers.
- **folding the grid alone** dies on deixis. Both paragraphs point INTO the grid (*"**The** +12
  bonus"*, *"**About that** number"*) and neither may be re-pointed: `/how-it-works` quotes
  "standing is suspended" as this page's canonical wording, and the "About that number" fence is
  deliberately divergent from `EndOfLifeCaveat` per its own guard
  ([[disclosure-both-halves-same-layer]]).

So the surviving option changes only ORDER, and **a position move is not a new claim**
([[a-fence-on-content-does-not-fence-placement]], precedent #557 then #562). None of the eight
content fences inside the block is re-opened and nothing loses a surface: the rail still renders
inside `currentStep === "welcome"`, so every chip is reachable without pressing Start. Approximate
rendered words before the button: **907 -> 678**.

**A move alone only re-orders a spoiler.** The policy reviewer caught that: a reader who keeps
scrolling now meets Act 5 with no warning at all, where before the surrounding text at least
framed it as a preview. So the header carries an opt-in line saying it contains the ending, shaped
after the four-ideas `<summary>` four lines above the button (*"Open for a preview, or skip
straight to Start and come back"*), the pattern this page already uses for an optional block. No
numeral, no regional claim about 0.50, so ledger Q1 is untouched by construction.

### Two guards were falsified by the move, and the reviewer found the one I missed

Position words in guards rot, so a reorder carries a sweep. My proposal listed five candidates and
the reviewer verified each, confirming only one of mine was actually falsified and adding one I had
not looked at:

- **Aug-14 guard** (mine): the `0.51` chip is justified by its meanings shipping *"POST-Start ...
  i.e. **behind the walkthrough button**"*. After the move the rail IS behind the button in document
  order while still being pre-Start.
- **Aug-19 HIGH #1 guard** (reviewer's): *"the Act-5 chip **four screens down**"*, on the energy
  bullet #560 wrote three days ago.

Both re-said as **WELCOME step vs SIMULATION step**. That is the test the Aug-14 guard was actually
applying (the gate is `currentStep === "welcome"`), and unlike "above/below the button" a reorder
cannot falsify it. `:647` (*"three `<details>` all sit above it"*) was checked and survives.

### The paragraph that narrated the page's own order

The intro italic told the reader *"Below: the two numbers ... and the five-act arc. Then click
Start"*, which the move makes false. Rewritten, and the constraint the reviewer imposed is the
interesting part: **net words must go DOWN**, since this screen carries three density guards
(May-15, Jul-13, Jul-17) and this same visitor asked for it to be shorter. 47 -> 43. What paid for
the new pointer was deleting *"no need to memorize them; each is explained in the story the moment
Alice uses it"*, a verbatim-equivalent restatement of the four-ideas `<summary>` 15 lines below.
The claim lost a duplicate, not a surface ([[density-guard-means-delete-not-caveat]]).

### One decision reversed in review, and it was not a content call

I proposed leaving the *"You control the pace"* paragraph behind at the button as the CTA's lead-in.
The reviewer pointed out it is the **last child inside** the gradient card, so extracting it drops
it onto the bare page background with no padding: a styling decision dressed as a reorder. Dropped.
It moves with the block, the move stays a single clean reorder, and the run-up is shortest that
way. The button does not lose a lead-in; the four-ideas `<summary>` above it already ends *"or skip
straight to Start and come back"*.

### Open rows carried forward

- **MEDIUM 5 is now closed at both levels**: chip level by fence, container level by this pass.
- **`/atp-economics` short lead line**, per #562's criterion. Untaken.
- **V3** (Unanswered Q4): routing, not a card. Third recurrence, untaken.
- **Row 6's remainder**: the `72` in `#faq-index`'s summary and the `learn/page.tsx:164`
  accordion/curation defer. Aug-15 vs Aug-19 still point opposite ways on whether a count up front
  helps.
- **Unanswered Q3** is routed, not closed: `/tldr` still forms the genesis question and links only
  `#first-device-bootstrap`, which answers a different bootstrap.
- LOWs still noted only: CI first-mention **routing** on `/first-contact` (stating was already
  done), hestia's **Running** badge vs "lab machines only", 26 nav links.

### Observed, not taken

`first-contact/page.tsx:12` (the file header comment) titles the page *"Zero to Web4 Comprehension
in 8 Minutes"* while `:22` in the same comment says 7, and the four rendered surfaces all say 7.
Comment-only, invisible to visitors, and the `learn` guard's grep target (`"7 minutes"`) does not
return the stale title, so it is not a live trap. Recorded rather than fixed, because deciding
which numeral is right is a different row.

`npm run build` green. Rendered-content diff verified mechanically (comments stripped, multiset
compared against `HEAD`) as a **pure reorder plus exactly three intended changes**: the intro
sentence, the new header warning, and one margin class. No em dashes (literal or `u2014`).


## Aug-19 21:00 session - the page that named its top-question set twice, with two different sets

**No open PRs at start** (`gh pr list` -> `[]`), branch exactly `origin/main` at `3a63543`, not
stacked. Today's log already had its 2 HIGHs and 2 MEDIUMs taken by #560/#561 this afternoon. Two
rows left that were neither fenced nor deferred. Three files, zero new files, and **one of the
three has no rendered change at all** (a criterion recorded so a deferral does not read as missed).

### `/why-web4` stated "what first-time visitors ask" TWICE, and the two answers were 56% disjoint

MEDIUM row 6 (the "72 questions" firehose) and **Unanswered Question 3** turn out to have one
mechanical cause. The visitor said *"The 'Most Asked' group of 12 is a good idea and is what I
actually read"*, then ended the session with Q3 open: *"Who witnesses the first participants in a
brand-new society? ... I carried this question for the rest of the session and never found a
direct answer."* The answer is `#faq-bootstrap-witnesses`, and a box three lines above the group
they read had it linked under **"Start here. First-time visitors most often want to know:"**.

Measured, comments stripped first (the `#faq-index` derivation guard matches itself otherwise):

    INDEX CAT 'Most Asked'  12  |  rendered <h3>Most asked</h3> group  12  |  set-identical
    the standalone box       9  |  overlap with those 12: 4
    box-only, all five verified inside "Going deeper": faq-infrastructure,
      faq-bootstrap-witnesses, faq-buy-50-devices, faq-youthful-mistakes, faq-jurisdiction

So a reader who followed the `<h3>` (this visitor) read a 12 that **excluded five questions the
element above had just called first-timer questions**. A third instance was in the source: the
JSX comment over the box read `Most asked - top questions for first-time visitors`, labelling the
box with the heading that belongs to the group ~23 lines below.

**The policy reviewer overturned my provenance, and the true version supplied the criterion.** I
argued the Most-asked/Going-deeper split was a later commit that never re-derived the box. It is
the reverse: the split is `8e71a0a` **Feb-26**, the box `eb16a51` **Apr-17**, seven weeks later.
Had I written my version into the guard I would have shipped a claim the next pass greps and
refutes. What `eb16a51`'s message actually records is the box's membership rule *and* its
premise: *"4 already had FAQs that the visitor didn't discover, **because the FAQ topic index is
inside a collapsed `<details>` element**"* + four missed questions + *"the pre-existing top hits"*
+ the new jurisdiction FAQ. That premise was **falsified on May-19 by `6d4c15e` (#262)**, whose
diff is literally `-<details id="faq-index">` / `+<details open ... id="faq-index">`. The index has
been open three months and nobody re-derived the box against it.

That converts an arbitrary cut into the box's own criterion: **keep the "missed because buried"
cohort (still buried, verified), drop the "pre-existing top hits" cohort whose job the Most Asked
group now does**, plus `faq-deployed`, appended later by `4a99759` (#429) whose purpose was to
make that answer the FAQ *lead*, giving it four surfaces. Box 9 -> 5, retitled "Easy to miss",
saying truthfully that these are answered further down. **Nothing loses a surface**: the four
dropped keep two each, the five kept stop competing with a 12-item list beside them, and
`faq-bootstrap-witnesses` goes from one-of-nine to one-of-five. Net rendered words go DOWN, which
is the direction this MEDIUM asks for ([[density-guard-means-delete-not-caveat]]).

**"Start here." was deliberately not reused**: `#faq-index`'s summary already ends `- start here`
three lines above, and two of them in a row is the bulk the visitor complained about.

**A guard elsewhere on the page cited the box by the wrong name**, found by the reviewer, not me:
`#faq-adoption-path`'s Aug-15 guard justifies a shipped clause by `#faq-buy-50-devices` being
*"reachable from the Most Asked list"* and then quotes **the box's** link text. That entry is not
in the Most asked group and never was, so a later editor checking the sentence against the group
would have found it refuted and deleted the clause it justifies. Re-cited to the box.

### `/karma-consequences`: the hedge rendered under the arithmetic it hedges

Filed twice by this visitor, and the second filing contains the remedy: *"it should have been the
first sentence, not the sentence after the arithmetic."* The amber "One model, not the rule"
paragraph moved above the `<pre>`, **unchanged except one directional word** (`the arithmetic
above` -> `below`) plus a margin class. A position move is not a new claim
([[a-fence-on-content-does-not-fence-placement]]), so the Aug-06 *"Do NOT resolve this here in
either direction"* rule is untouched. #557 set the precedent on the sibling page.

### The row named THREE pages and I proposed one. The third is deferred, with the criterion in the file

The reviewer caught the truncation. `/how-it-works` was #557, `/karma-consequences` is this pass,
and **`/atp-economics` I had not mentioned**. It is deliberately out, and the criterion now lives
at that page's own caveat rather than only here, because there **this is not a position move**:

- the block is welded to its position in **five** directional references (*"the card further up"*,
  *"the closing line just below"*, *"the figures above"*, *"the code sketch further down this
  page"*, plus the deictic *"none of these lives"*). The Aug-12 guard exempts **one** such word as
  position-local; five is past what that licenses.
- four of its clauses are a **whole-clause propagation** from `/how-it-works`'s `EndOfLifeCaveat`
  under a standing *"if you reword those there, reword them here"* obligation. Hoisting it is a
  two-page rewrite of a **ledger-Q5 holding-pattern block**.

The available remedy is named at the site so the row is actionable, not just refused: a short
page-native lead line above Life 1 mirroring #557's `EndOfLifeCaveatShort`, leaving the full block
where its five pointers resolve. That is a new rendered sentence on a Q5 surface and wants its own
review.

### MEDIUM 5 (the act-preview spoiler) is deferred by SIZE, not by fence. The distinction matters

My proposal said prior guards forbid it. **Half true, and the reviewer made me write the accurate
version**, because writing the wrong one into this file would fence a row that is open. Chip-level
fixes ARE blocked, and harder than I claimed: all three Act-5 chips were placed by explicit
visitor request (`+12` Aug-09, `0.54` Aug-13, `0.51` Aug-14), so four visitors now point against
Aug-19's suggestion to strip the terminal numbers. But **nothing guards the storyboard's
container** (its only comment is `Storyboard: 5-beat preview of Alice's full arc`). Collapsing it
into a `<details>` or moving it below Start addresses both halves of the complaint (spoiler, and
"a lot before Start") touching zero chips, and the four-ideas map directly above already ships
that exact pattern (*"Open for a preview, or skip straight to Start and come back"*). That is an
IA change deserving its own pass.

### Open rows carried forward

- **MEDIUM 5**, container-level only, per above. Chip-level is closed.
- **Row 6's remainder**: this pass removed the rival claim and shortened the run-up. The `72` in
  `#faq-index`'s summary and the accordion/curation redesign `learn/page.tsx:164` defers are still
  untaken, and Aug-15 vs Aug-19 still point opposite ways on whether a count up front helps.
- **`/atp-economics` short lead line**, per the criterion above.
- **V3** (Unanswered Q4): `/why-web4` DOES introduce it (grep `Its companion, V3`), so the
  visitor's "nothing on the five-page reading path ever introduces it" is false as stated; their
  falsifiable half is *"T3, LCT, ATP and CI all get a card on /first-contact. V3 does not"*, which
  is true. A fifth card fights this same visitor's density complaint, so it is routing, not a card
  ([[visitor-v3-ghost-pattern]], third recurrence).
- **Unanswered Q3 is not fully closed**, only routed. `/tldr`'s Web4 bullet says *"it is the
  community you join that witnesses what you do"*, which presupposes a community exists, and the
  reader forms the genesis question there. `/tldr` links only `#first-device-bootstrap`, which
  answers a **different** bootstrap (your first device), and that box has lost two density calls
  already. Two questions wearing one word ([[borrowed-word-means-something-else-there]]).
- LOWs still noted only: CI first-mention link on `/first-contact` (#553-shaped: prior passes did
  *stating*, the missing one is *routing*), hestia's **Running** badge vs "lab machines only",
  26 nav links.

`npm run build` green. `#faq-index` derivation re-run: **72 / 72 / 72**, unchanged. New invariant
checked: box entries and the Most asked group now have **zero** overlap, and all five box anchors
resolve to real `<details>`. No em dashes (literal or `u2014`) in any of the three files.


## Aug-19 09:00 session - the two words the page used and never defined, and the mitigation its own section withdrew

**No open PRs at start** (`gh pr list` -> `[]`), branch exactly `origin/main`, one 4life session
running. **Fresh visitor log** `visitor/logs/2026-08-19.md`: 2 HIGH, 4 MEDIUM, 4 LOW, understanding
checklist **7/7** ("All seven, which is unusual"). Took both HIGHs plus the MEDIUM in the same
claim class. Three prose fixes, three files, zero new files.

### The two HIGHs were both "the answer ships on this page and the reader cannot reach it"

**HIGH 1, `/first-contact`.** The pre-Start panel said ATP at 0 means "she can't act"; the Act-5
chip four screens down says "dies at ATP 0". Visitor: "Which is it, can't act or death?"
The resolving vocabulary ships on this page **three times** and a pre-Start reader can reach none
of them: once inside `<noscript>` (invisible to any JS visitor,
[[visitor-quoted-number-find-the-surface]]) and twice behind the Start button.

**The policy reviewer corrected my premise, and the correction is the interesting part.** I filed
it as "the vocabulary is absent pre-Start". It is not. The term **"trust death" is used pre-Start,
undefined**, in the "Why raw?" details in the very box I was editing, while "energy death" appears
nowhere. So the reader meets **one half of a named pair with no definition**, and the other half
described without its name. The defect is the naming, not an explanation
([[visitor-read-it-and-still-filed-it]]). Landed as two parentheticals inside the existing bullets,
net ten words, because the panel carries three density guards and this same visitor asked for
everything before Start to be *shorter* ([[density-guard-means-delete-not-caveat]]).

**HIGH 2, `/lct-explainer#software-only-survival`.** The callout ends "any dip restricts your
features until you climb back" and never says how, for the one tier the site tells the reader has
no witnesses. The mechanism ships **a screen below on the same page**: *"The ceiling caps how high
your T3 trust can climb through behavior."* A cap on the top is not a freeze on movement, and that
entailment was never stated anywhere a reader of the callout could reach.

**What they actually collided with was a different quantity wearing the same word.** The
drop-your-phone list far above says "Software only, no second witness to vouch. You start over from
zero." That is **device-loss identity recovery**, and canon scopes it exactly and only that way:
`multi-device-lct-binding.md` *"Cannot be sole anchor for recovery **quorum**"* and the 7.2 society
MUST *"Enforce recovery quorum for **identity recovery**"*. Neither touches what moves a trust
score. Two correct facts joined by the word "recover"
([[friction-may-be-an-entailment-not-a-contradiction]]). The join is now stated; neither fact moved.

### MEDIUM 3 was the same seam's other end, and canon separates the two words the bullet welded

`/what-could-go-wrong` risk 8 mitigation (2) said community vouching lets contacts "witness
behavior and **raise effective trust** over time". Three falsifiable defects:
- **Canon separates them.** `web4/docs/specs/heterogeneous-identity.md` has a section headed
  **"Witnessing, not vouching"**: a witness says "I observed X at time T", it *"does not say: I
  endorse X"*, *"No transitive trust is implied. No reputation is staked."*
- **"effective trust" is a defined term here** (raw x CI squared, propagated to six surfaces) and
  vouching moves neither factor ([[borrowed-word-means-something-else-there]]).
- **It contradicted its own section**, which says two paragraphs later that this tier stops at 0.50
  and "has no hardware witness to vouch for them". That is the **second time this same bullet run
  has offered the excluded tier a reassurance the section withdraws**: the Jul-31 reversal deleted
  "Software-only behavior still accrues reputation normally" from bullet (4) for the identical
  reason. Same defect class, adjacent bullet.
Scoped, not deleted: vouching is real on hardware-backed **route (1)**, at 3-7 days.

**Reviewer block on this bullet, and it was right (Aug-19 15:00 pass).** The first landed scoping
said "on the hardware-backed routes in this list, **(1) and (3)**" - which commits defect (iii) a
third time, inside the fix for defect (iii). Route (3) is institutional witnessing *"for users who
lack personal hardware"*, and this section's Honest assessment tells that same reader they have
*"no hardware witness to vouch for them, so there is nothing to recover to"*. Nothing on the site
or in canon says institutional witnessing enables device-loss recovery or makes its user
hardware-backed: route (1) states a tier effect (~0.75 ceiling), route (3) states none. And the
direction of the error was the reassuring one, which is the direction this bullet run has now been
reverted in twice. Landed remedy: delete the route list down to `(1)`, which costs nothing, since
the sentence's real work is its **negative** half. The criterion for what may be named there is now
written into the file rather than left implied.
**The tell, worth carrying:** both HIGHs landed clean because each only *named* something already
true on the page. The MEDIUM's positive clause was the one place the pass added a **capability**,
and it was the one place it reached past what it had measured.

### What the policy review changed, beyond the premise

- **A destination fence on HIGH 2, which a no-assertion line would not have caught.** For this tier
  ceiling **and** survival line are the same value, so a climb-back with a *named destination*
  answers ledger **Q1 by arithmetic** - entailment, not assertion. Q8 Ruling 3's holding pattern
  says in terms that `#software-only-survival` "stays strictly-below". Now written into the file as
  a forbidden-phrasings list ("climb back to 0.50", "back to the line", "back to full access",
  "back to where you started", or any climb-back paired with a ceiling numeral in the block). What
  is permitted is a pure **movement** claim: headroom exists below the cap, behavior traverses it,
  nothing about the top of the traverse.
- **Where the Jul-31 deleted clause was actually at risk.** I had fenced it on HIGH 2; the reviewer
  moved the fence to MEDIUM 3, correctly. HIGH 2 concerns the region *below* a dip, where headroom
  demonstrably exists. MEDIUM 3 rewrites a bullet four lines from that clause's grave.
- **An em dash import path I would have walked into.** The canon line MEDIUM 3 quotes carries a
  literal em dash and a non-equals glyph. Paraphrased into plain English, never pasted.

### Corrections to this repo's own record

- **The 0.4 ceiling is not a new finding.** I logged canon's `multi-device:154` **0.4** against the
  site's 0.50 as a Step-1 discovery. It is already ruled at `WEB4-CANON-QUESTIONS.md` **Q8 Ruling
  3**, which records **three** conflicting upstream ceilings at once (0.4, 0.40, and `web4-core`
  shipping `trust_ceiling: 0.85` on an LCT labelled "Software-bound keys", C308-N2 unresolved) and
  gives a stronger reason than my "disclosed calibration" framing: *adopting 0.40 would put the
  ceiling under the survival line and answer Q1 by arithmetic.* No action; cite the ruling.
- **Row 6 (the "72 questions" prominence) is a DEFERRAL, not settled, and my stated reason was
  wrong.** I claimed #553 settled it. #553's own guard closes: *"the curation/accordion redesign
  that learn/page.tsx:164 defers. That row stays open."* #553 did **stating** (make the number true
  and re-derivable); Aug-19 asks for **weighting** (its prominence deters reading), which is
  [[routing-stating-weighting-three-fixes]]. The signal is new, not absent: **Aug-15 asked for a
  count up front and Aug-19 says the count up front is the deterrent** - two visitors pointing
  opposite ways on one element. Deferred on size: `#faq-index` is `<details open>`, so flipping
  `open` collapses **Most Asked** too, and Most Asked is the one part this visitor read. Keeping
  Most Asked open while collapsing the other six categories *is* the deferred curation redesign.

### Open rows carried forward

- **MEDIUM 4, the bootstrap loop** (`/how-it-works`), the strongest untaken row and the visitor's
  own Unanswered Question 1. Their arithmetic: self-initiated work recharges "up to 15 ATP = 0 net
  at best", commissioned work (+25/+40) needs pre-existing trust, posting costs 10-20 of a starting
  100, so a newcomer gets five to ten self-directed actions and no path to a growing budget.
  Derivable from the site's own numbers, which is a compliment to the page and a request for the
  next paragraph. Partial canon exists and needs checking before anything is written:
  `heterogeneous-identity.md` *"ATP is not granted by an authority. It is reified from observation
  of available resources ... Existence is witnessed, and ATP follows from witnessed existence"* -
  that is about **initial allocation**, not the ongoing loop, so the honest answer may be "open
  question". Do not coin a mechanism ([[explainer-gap-may-be-upstream-off-by-one]]).
- **Row 6** as re-filed above, feeding the open curation row.
- **Not on the checklist, filed by the visitor as a gap: V3.** "V3 is in the nav and appears inside
  the formula T3/V3*MRH on /onramp, but nothing on the five-page reading path ever introduces it.
  T3, LCT, ATP and CI all get a card on /first-contact. V3 does not." `/value-tensor` exists and
  builds; this is routing/prominence, not absence ([[visitor-v3-ghost-pattern]] recurring).
- LOWs noted only: CI first-mention link on `/first-contact`, hestia's **Running** badge vs "lab
  machines only" (badge-legend seam), three next-life ATP starting rules across three pages with
  per-page hedges but no cross-page one, 26 nav links.


## Aug-19 03:00 session - the dimension the site called portable, that canon scores per role

**No open PRs at start** (`gh pr list` -> `[]`) and **no fresh visitor log**: the 05:00 cron has
not fired yet, and `2026-08-18.md`'s friction table is exhausted by #556/#557/#558. So this is the
item #558 filed by name: the **axis-C seam**, three different answers to "what carries across
communities" (`/trust-tensor` said Temperament, `/why-web4` said "temperament, consistency",
`/why-web4` said **Veracity**, which is a V3 dimension). Four source files, the ledger, this note.

**The filed seam was three surfaces. Grepping the SHAPE instead of the three quoted phrasings
found twelve** ([[claim-class-grep-truncated-enumerate-remainder]]), all asserting one claim:
*some T3/V3 dimension is general or portable and carries across roles or communities.*

### Canon rules it, four ways, and the site's own illustration already agreed

- `../web4/web4-standard/core-spec/t3-v3-tensors.md` **6.3 Role-Based Segregation**, four MUSTs:
  *"Implementations MUST NOT compute global (role-agnostic) trust scores"*, *"Each role MUST
  maintain separate T3/V3 tensors"*, *"New roles MUST start with minimal trust, **not inherited
  from other roles**"*, *"Cross-role trust transfer MUST require **explicit bridging**"*.
- same doc **2.1**: the heading is literally *"Temperament (**Role-Contextual Reliability**)"*;
  measures *"Consistency **in role**"*; *"Context: **Role-dependent**"*.
- same doc **1.1**: *"T3/V3 tensors are not absolute properties - they exist only within role
  contexts."* It scopes **V3 too**, which is what rules on the Veracity surface.
- `core-spec/reputation-computation.md` (grep `Reputation is role-specific`): *"(can't transfer
  across roles)"*. Veracity's own row: *"Context: Domain-specific verification standards"*.
- **Two canon worked examples**: one entity at temperament 0.95 / 0.91 / **0.50** across three
  roles (6.2's `role_tensors`), and 0.88 / **0.30** across two (`mrh-tensors.md` 5.2).

The second of those is the point. **`/trust-tensor`'s flagship worked example IS canon's cast and
canon's numerals**, so the page has been rendering Alice at Temperament 95 / 91 / **50** two screens
above a FAQ calling Temperament the portable dimension, and the Mechanic card already said why
(*"untested in this context"*). This is [[prose-fixed-thrice-check-the-illustration]] **inverted**:
the illustration was right the whole time and the prose was the defect.

### What the reviewer caught that the proposal had wrong

- **The under-citation.** My scope never quoted 6.3, which is the strongest text in canon and the
  only place the carve-out lives. Without it the fix would have been grounded on weaker lines.
- **The carve-out I was about to run over.** 6.3's fourth MUST makes cross-role transfer
  **not-automatic, not impossible**. A replacement reading *"trust never crosses roles"* swaps one
  canon contradiction for another. Every propagated site now says *not inherited* / *needs explicit
  bridging*, never *never*.
- **TWO AXES, NOT ONE. This is the finding that saved the pass.** Three of the surfaces are the
  **community/federation** axis, where #558 established three days ago that trust genuinely *does*
  travel at the receiving community's weight (`/trust-neighborhood#cross-society`). Propagating a
  role-axis "no score is inherited" sentence there would have contradicted the very page those
  blocks link to, which is [[sweep-must-include-the-link-destination]] committed **backwards**. On
  the community axis the defect is not the transfer at all: it is the **per-dimension
  decomposition** (temperament and Veracity carry, talent and training reset). Canon discounts the
  role tensor **as a whole** and never splits it by dimension. Two sentences shipped, not one.
- **My Q1 rationale was false on its own page.** I refused canon's `0.5` neutral starting value
  citing the Q1 endpoint fence. Q1 fences the **aliveness endpoint**, not the **starting value**,
  and `/why-web4` already prints *"everyone starts at 0.5 trust"* on the page I was editing. The
  refusal stands, on new ground: see Q16 below.
- **Three more members**, none reachable by the filed greps: `/why-web4`'s collusion bullet (grep
  `T3 trust is behavior-scoped`) put the cross-role integration in Temperament, which is precisely
  6.3's forbidden global score, in periphrasis; `/first-contact` (grep `It follows you everywhere`)
  attached portability to **T3 by name** on a reading-path page; and `/why-web4` (grep `stays
  consistent. The system`) is surface 6's claim in different words.
- **The exclusion was half-unsound.** `/why-web4` (grep `More universal, harder to game`) stays out
  and canon backs it, because it compares the three V3 dimensions' **semantics**, not a score's
  portability (Veracity *"Objective Accuracy"* vs Valuation *"Subjective Worth ...
  Recipient-specific"*). The sentence five lines below it is a **score** claim and came in. The
  criterion is recorded at that site ([[adding-a-distinction-creates-a-sweep-obligation]]).
- **A number seam inside a block I already had open.** `/why-web4#faq-multi-persona`'s *"even if
  your domain-specific Talent starts at zero"* contradicted the same page's *"everyone starts at
  0.5 trust"* and `/lct-explainer`'s *"start 0.50 in all three dimensions"*. Now "starts fresh",
  the page's own word two FAQs later. No numeral added.

### The fix is mostly a DELETION, because the right answer was already standing beside the wrong one

Three of the twelve surfaces named **two** things as crossing roles: Temperament and the
**Coherence Index**. Only the second survives. CI is not a dimension at all: upstream (grep
`modulates how T3 is applied` in `../web4/proposals/MRH_GROUNDING_PROPOSAL.md`) it *"modulates how
T3 is applied, not T3 itself"*, and the site already ships `effective trust = raw x CI^2` on six
surfaces. So the correction deletes the refuted half of a pair the site already stated
([[density-guard-means-delete-not-caveat]]); net prose is roughly flat and no new mechanism is
asserted.

**CI does get one clause of fencing**, at the new anchor only. "Coherence Index" appears in **zero**
files under `web4-standard/`; it exists only in `../web4/proposals/`. This pass does not change any
CI wording, but it does promote CI from co-answer to **sole** named cross-role carrier on six
surfaces, and that promotion is what earns the clause. A five-surface CI fencing sweep stays
deferred.

**New demand-driven anchor** `/trust-tensor#temperament-scope`, **six** inbound links, all six added
in this push and all six from surfaces that used to name Temperament. It is the only place the 6.3
citations and the CI provenance are stated; the inbound sites carry the short form and link here
([[propagate-the-sentence-not-your-summary]]).

### Escalated, not answered: ledger Q16

Canon disagrees with itself about what a new role starts at. 6.3 says *"minimal trust"*;
`reputation-computation.md` (grep `Neutral starting point for new role pairings`) returns `0.5`.
Minimal and the midpoint are not obviously the same value, and this is exactly the question left
hanging by deleting the *"head start"* sentences. **No numeral is printed at any of the twelve
surfaces or at the anchor**; they answer qualitatively in 6.3's own words (*not inherited from other
roles*), and the anchor records why. Filed as **Q16**, deliberately distinguished from Q1.

### Swept and left, with the criterion, so it does not read as missed

`/trust-neighborhood` (grep `travel along your`) says *"Your T3 trust scores (Talent, Training,
Temperament) travel along your relationship connections"*. It is the nearest neighbour to this class
and is **out of it**, because the next clause self-guards: *"and within the relevant role context"*.

`npm run build` green. No em dashes (literal or `u2014`) in any of the four source files. No new
files. Ledger untouched except the new Q16.

## Aug-18 21:00 session - three rival rates for a number the standard says is not the protocol's to set

**No open PRs at start** (`gh pr list` -> `[]`), no fresh visitor log (today's is `2026-08-18.md`,
already worked twice), and **the friction table is exhausted**: all 11 rows were fixed by #556/#557
or verified false-or-contested and recorded there. So this is the pass #557 explicitly deferred:
*"That is a numbers seam, not a maturity one, and it wants its own pass."* Three files plus this note.

**It was not a two-surface seam. It was six surfaces on two axes**, and the policy reviewer found the
member that made the difference.

*Axis A, the mechanism.* Canon rules it. `../web4/web4-standard/core-spec/inter-society-protocol.md`
section 9 is an open-items list (resolved siblings are struck through and marked RESOLVED); the
**unstruck** trust-attenuation bullet says *"whether T3 in society A propagates to D's level and at
what discount ... this spec leaves the trust math society-sovereign."* Three surfaces named MRH
per-hop decay as the thing that discounts a score at a community **boundary**. That is the
within-community quantity (`/trust-neighborhood#hop-decay`), and the boundary discount is the
**receiving** society's federation policy.

*Axis B, the number.* Three rival *"typically"* rates for one quantity: `~65%`, `0.7-0.8x`,
`0.6x-0.7x`. **"Typically" is itself the defect**, since it asserts protocol typicality for a value
canon makes sovereign, so it came out of the **anchor** too and not just the two rivals. `~65%` is
4-Life's teaching calibration (`git log -S`: `eb16a51`, #121, Apr 16, no grounding; canon has no
figure) and now says so, once, at the anchor.

### What the reviewer caught that the proposal had wrong

- **The missed member.** `/why-web4#faq-quality-standards` enumerated *"two things reduce it"* and
  named MRH decay first, with the boundary weight **absent from a list of what reduces trust at the
  boundary**. It is also the destination of the *second* outbound link in the `/trust-tensor`
  paragraph I was already fixing, so fixing that paragraph alone would have repeated
  [[sweep-must-include-the-link-destination]] on the other link of the same block. Ruling: the count
  change and the re-scope are **one edit, not alternatives**. Re-scoping alone leaves "two" false
  less visibly; adding alone ships bullet 1 contradicting bullet 3.
- **My derivation was arithmetically false.** I wrote that ~65% is the mid-band of 40-80%. The
  midpoint of 40 and 80 is **60**. Struck; the figure is stated as an illustration, never derived.
- **The inversion, the highest-risk thing in the pass.** 65% weight is a **35% discount**. Surface 4
  reads *"already discounted (...)"*, so dropping 65% into that parenthetical would have rendered *a
  65% discount* and shipped a **seventh** wrong number. Every propagated site now says share-of-home-
  value or multiplier, never "a 65% discount".
- **Opposite treatment for two look-alike surfaces.** Surface 4's worked numerals were **already
  exactly 0.65x** (0.2 -> ~0.13, 0.88 -> ~0.572) and did not move; only its stated range disagreed
  with its own arithmetic. Surface 3's operand **had** to move (0.82 -> 0.80, arriving 0.52), because
  0.82 x 0.65 = 0.53 breaks its worked value *and* because leaving `0.65` as an arrival value one
  screen from `65%` as a weight is [[borrowed-word-means-something-else-there]].
- **A Q15 trap I was walking into.** ISP section 9's *"society-society trust tensors"* bullet is
  **struck and RESOLVED** at `mcp-protocol.md` section 7.5, which makes cross-society reputation
  propagation normative. Canon leaves the **discount** open, **not the mechanism**. Nothing here says
  the protocol lacks a cross-society trust mechanism; the anchor's provenance line says the opposite
  explicitly (*"What the standard does specify is the machinery underneath"*).

### The anchor, and why the hedge word could not just be dropped at the four sites

`/trust-neighborhood#cross-society` is a new **demand-driven anchor**: four inbound links asked for
it in this same push, all four from surfaces that used to name the wrong mechanism. The reviewer
rejected "no hedge word plus a link" for the propagated sites: a bare `~65%` whose only qualifier is
an outbound link is indistinguishable from a protocol constant to a reader who does not click, and
that is the same routing failure #557 recorded at this very anchor. Each of the four carries a short
**attributive clause inline** naming *who sets the weight*, which is content rather than a softener;
the 40-80% band and the provenance live once, at the anchor, behind the links.

**The membership test is recorded at the anchor**, because the two quantities are confusable in both
directions: a surface is in this class only if it says what happens to a score **crossing a
boundary**. `/why-web4` (grep `limits the blast radius`) carries `0.7x` *and* the words "MRH decay"
and is **correctly not a member**: it states #hop-decay's own claim accurately and mentions no
boundary. Eight further members pass the boundary test but carry no number and no MRH attribution;
all eight are enumerated by grep at the anchor.

### Filed, not fixed: the axis-C seam (named next pass)

All three files I had open give a **different** answer to "what carries across communities":

- `/trust-tensor` (grep `Temperament does transfer`) says **Temperament**
- `/why-web4` (grep `carry over; <em>role-specific</em>`) says **"temperament, consistency"**
- `/why-web4` (grep `does carry over, giving them a small head start`) says **Veracity**, which is a
  **V3** dimension, not T3

Third name for one quantity inside the same claim class. Pulled into this pass it would have fought
the mechanism fix ([[two-fixes-in-one-pass-can-fight]]), so it is filed here with its three greps
rather than left for the next session to re-derive, which is exactly how #557's filing produced this
session.

Also still open from the prior passes: the visitor's Unanswered Q7 (**what does V3 do that quality
attestation does not**), which their checklist marks `[~]`. It is a comprehension build, not a defect
row, and wants its own scope. `npm run build` green. No em dashes (literal or `u2014`). No new files.

## Aug-18 15:00 session - the caveat that arrived after the illustration, and the mechanism that had no date

Second pass on `visitor/logs/2026-08-18.md`. PR #556 (09:00) took the HIGH plus 2 MEDIUM and was
CLEAR of standing blocks; my branch is not stacked on it. Three files plus this note.

**Four of the remaining rows were verified false-or-contested at the source and are recorded, not
fixed**, so a later pass does not re-derive them:

- *Karma cross-reference* (MEDIUM): the filing says "neither page says another models it
  differently". `/how-it-works`'s `EndOfLifeCaveat` names both other instances by link, and
  `/karma-consequences` points back. Only `/first-contact` lacks a pointer, and that card's guard
  family forbids importing `/how-it-works` wording in either direction. Declined.
- *`/why-web4` validation numbers* (LOW): `why-web4:853` already scopes 424 and ~85%. `171` and
  `2,627` do not render on that page at all; the only hits are inside a guard forbidding their
  import. The visitor pooled numbers from two pages.
- *`/why-web4` V3* (LOW): their literal suggestion already ships (`grep -n "V3 rates how good"`).
  Their real residual is their Unanswered Q7 ("what does V3 do that quality attestation does
  not"), which is a comprehension build and not this row. **Flagged for a later session.**
- *`/tldr` badge rows* (2 LOW): answered by a standing guard that refuses the badge change on a
  live rendering constraint. Contested LOW, no new signal.

### `/first-contact`: the rail named the rebirth's reason and not the fall's

MEDIUM: *"Alice ends Act 4 at trust 0.62 and enters Act 5 at 0.51. An 11-point drop appears between
two cards with no stated cause."* They named the fix themselves by pointing at the rail's own
convention: every other act pairs its trust chip with a subtitle giving the cause. Act 5 compresses
two events and its subtitle, *"Karma carries forward"*, named only the second, so the rebirth had a
reason and the fall had none.

Cause **propagated from this page's own post-Start prose** (`grep -n "she overextended"`), not
re-authored. One cause drives both movements, which is why one clause closes both halves of the row.
**Prepended, not replaced**: two guards cite this card by the literal string *"Karma carries
forward"* ([[guard-comment-cites-rot-name-the-target]]).

The row's second half (*"the card does not say she died of energy"*) **was already shipped** and the
policy reviewer caught me over-claiming it: the chip reads `dies at ATP 0`. The edit prints **no
numeral** and says nothing about 0.50 in either direction, so **ledger Q1 is untouched by
construction**, and it does not gloss the bare 0.51 chip, which the Aug-14 guard reserves for the
"Alice got lucky" box.

### `/how-it-works`: the deferral had two prongs and only one was out of bounds

MEDIUM, the three-life example. My scope did not list this row at all and the reviewer required it
back ([[out-of-bounds-may-rest-on-unread-arbiter-line]]). Prong (a), *"build the example on one of
the two deaths the page does define"*, **is** ledger Q5 and stays refused: rewriting an illustration
to fit an unruled rule is exactly what the caveat exists to prevent. Prong (b), *"move the caveat
above the example"*, is live, cheap, and **a position move of an existing render**.
`EndOfLifeCaveatShort` now renders under the section `<h2>`, above Life 1, instead of after Life 3.
Their reason is the point: *"Being told after the fact feels like the example was retrofitted."*

Not one word changed: sentences 1-2 are verbatim-shared with `EndOfLifeCaveat`, so a trim would ship
variant N+1 ([[propagate-the-sentence-not-your-summary]]). Two things were **checked, not assumed**:
"the energy death described above" still resolves, and the back-link still points **up** to
`#karma-carries` (1337, above the new position at 1459). Two guard citations said "at the end of
#example" and are now position-free.

### The federation seam: fenced on both ends of its own link

LOW: *"Written in confident present tense ... for a component `/running-now` calls Spec only. The
page's global caveat is far above it."* It is ~2280 lines above. Same gap as their Unanswered Q5
(*"on one page it is a mechanism, on another it is a plan"*).

The site's canonical sentence already ships on three surfaces (`/running-now`, `/onramp`, `/hub`) and
is grounded upstream: `../web4/STATUS.md` lists the inter-society protocol at **v0.1.2 DRAFT**. It is
propagated verbatim, not re-authored.

**The sweep enumeration I wrote was incomplete and the reviewer found the missing member**:
`/trust-neighborhood`'s "What happens when you join a new community?" block states the same
mechanism as operating today, with a number (~65% weight), no marker, **and is the destination of
the very link inside the block I was fixing**. Fencing one and not the other routes a reader out of
a fenced claim into a sharper unfenced one. Both taken. Criterion for the four members **left**
(each carries an in-block provenance line, "Limitation:" fence, "Honest caveat:", or describes
boundaries rather than a mechanism) is recorded at the `/how-it-works` site.

**Filed, not fixed**: `/trust-neighborhood` says ~65% cross-society weight, `/why-web4` says
"typically 0.7-0.8x" for the same transfer. Numbers seam, wants its own pass.
## Aug-18 09:00 session - the page that proved role-scoping never said it where the 28% renders

**No open PRs at start** (`gh pr list` returned `[]`), and the 05:00 visitor cron **fired**:
`visitor/logs/2026-08-18.md` is fresh (~48 min, 15 pages, understanding "good", would return and
would recommend). 1 HIGH, 5 MEDIUM, 4 LOW. Three rows fixed, three files plus this note.

**Two of the three filings were false as written and had to be narrowed before they were
actionable.** That is now the third session running where the visitor's *reading* was right and
their *suggestion* pointed at something that does not exist.

### `/trust-tensor`: the HIGH, and the first draft of it was fenced

Visitor HIGH: the role example renders *"Composite T3: 28%"* for Alice as a Mechanic, and the
site's most severe rule is stated on *"the composite"* with no role qualifier, so *"the naive
inference is that being bad at one job permanently kills you, which I assume is wrong."* They are
reading correctly: this page ships three composites, one of them 0.28, and makes no join at the
point of the number.

Their literal ask (*"state that Alice's 28% as Mechanic is not a survival risk"*) is **not
writable**: it adjudicates the consequence, which is ledger Q14/Q15 and unruled. But my first
draft went wrong in the other direction and **the policy review caught it**. I proposed publishing
*"which composite the survival rule reads, an entity-wide one or the role you are acting in, is not
settled."* Canon settles that: `r7-framework.md:252` is a marked **Critical Design Principle**
(*"There is no global reputation, only reputation within specific role contexts"*), with the same
note at `r6-framework.md:76` and `r7-framework.md:86`, and `reputation-computation.md:86` marked
**CRITICAL** puts t3/v3 deltas on the MRH role pairing link and *"NOT globally to the entity."* An
entity-wide T3 composite is not an open candidate for what the rule reads, it is an object canon
says **does not exist**. Publishing it as open would have manufactured uncertainty canon has
closed, and would have repeated exactly the transposition the ledger records against #533. **The
open sliver is the consequence's reach, not the quantity's identity**, and those are different
questions.

The decisive find came while rewriting, not while triaging: **`/how-it-works` already ships the
join**, three paragraphs below its own death rule, and **cites this page as the authority for it**
(`grep -n "never one universal number"`): *"Trust in Web4 is never one universal number. It is
[scoped to a role -> /trust-tensor], and each society keeps its own view of you."* The page that
states the rule links here for the proof; the page it links to never made the join where the number
renders. Sibling gap in the direction where the **derivative page was the careful one**
([[subset-invariant-satisfied-from-wrong-side]]), which means the fix is a **propagation**
([[propagate-the-sentence-not-your-summary]]), not a new claim.

One more self-inflicted defect, caught on re-read: the draft block restated the rule as *"trust
which falls below 0.5 and stays there"*, **dropping `raw`** from a rider the site keeps
byte-identical across six surfaces precisely because that word marks the contrast with *effective*
trust (raw x CI^2). Trimming a word ships variant N+1, and this page already carries one exact
render of the rider in `#decay-and-survival`. The block now **references the rule and never
restates it**, names only which quantity it is stated on, and prints **no numeral from the rule at
all**, so ledger Q1 is untouched by construction rather than by care. It also avoids the word
*"overall"*, which `how-it-works:1113` uses for a different axis (blend-vs-dimension, not
entity-vs-role); that paragraph is byte-lock-adjacent and was **filed, not fixed**.

### `/why-web4`: ADP, where the premise held and both locations were wrong

Visitor MEDIUM: *"ADP is in the nav label and the landing page's core-vocabulary strip, but does
not appear in the five-page reading path. I learned what it stands for on page 13."* My proposal
said ADP renders nowhere on the path; **the reviewer proved that false**. It renders twice:
`how-it-works:2352` in unconditional prose as a bare, undefined `(ADP)`, and `first-contact:856`
with a full gloss **behind a step gate** (`isSuccess && atp_after > atp_before`) this visitor
plausibly never fired ([[visitor-quoted-number-find-the-surface]] again, third time a step gate has
hidden a surface from a browse). What is genuinely absent across all five pages is the
**expansion**: the acronym is used and never unpacked, which is precisely what *"page 13"* reports.
Their suggested home, *"the tldr's energy paragraph"*, does not exist either: `/tldr` has **zero**
ATP mentions. Landed at `why-web4:392`, the path's first ATP expansion line and already an
acronym-unpacking line, propagating the glossary card's own clause rather than coining a variant.

### `/what-could-go-wrong`: #555's sweep had two remedies and shipped one

Visitor MEDIUM: *"'5-tier adoption pathway' is used as a known term with no link and no
enumeration."* **Both halves false**: `:1407-1413` links it *and* enumerates all five inline on the
next line. The true residual is behind their *"I had to go hunting"*: the href was bare
`/why-web4`, landing them at the top of a 72-entry FAQ page with the definitions collapsed inside
it. Unanchored promise-link ([[promise-link-class-grep-text-not-href]]).

Worth recording *why it survived*: **#555 swept this class three days ago** and its recorded
vocabulary grep (`why-web4:1630`) **does match this line**. It was not missed by the instrument, it
was excluded by the **criterion** (that pass's class was links whose *destination lacked* the
ladder, and `/why-web4` has it four times). But that same guard states **both** remedies and the
rule for choosing (*"the /day-in-web4 promise is accurate and merely unanchored, so it got the
anchor instead"*). A criterion with two branches was applied on one
([[claim-class-grep-truncated-enumerate-remainder]]). Their alternative, *"add a glossary entry"*,
is **declined on the record** rather than dropped: four copies of the ladder already ship and the
four-copies question stays deferred, and a fifth copy is the wrong answer to a routing defect.

### Deliberately not touched
The ladder's **three numbering schemes** (four tiers, five tiers, and a "Tier 5" on a page
numbering from Tier 1) stay deferred, as #555 left them: that is a page-wide curation row needing
its own scope. Visitor MEDIUMs on the three-life example (Q5), the Act 4->5 cards (Q1 territory,
0.51 vs 0.50), and the karma cross-reference (Q5, three surfaces already disclose) are all ledger
rows. All four LOWs deferred. `npm run build` green.

## Aug-18 03:00 session - the sentence that answered a question it had already dropped

**No open PRs at start, and no fresh visitor log.** Five fires (Aug-16 09:00 through Aug-17 21:00)
all died on *"You've hit your weekly limit"*, and the visitor cron died with them: there is **no
`2026-08-16.md` or `2026-08-17.md`**, on any branch. So this is a **fifth pass** on
`visitor/logs/2026-08-15.md`, and the policy reviewer set it as the **last** one: every remaining
row is blocked, and the next session should wait for the 05:00 log rather than open the FAQ
curation pass. Three files plus this note.

### `/onramp`: the topic sentence asserted design and evidenced absence

Visitor LOW, `#hub-and-hardbound`: *"I could not tell if this is a candid gap or an intentional
design statement."* This section **is** the Aug-07 fix for the same axis (*"say whether
hub<->hardbound is a seam, is out of scope, or is unbuilt"*), so read-it-and-still-filed-it applies
([[visitor-read-it-and-still-filed-it]]): find the missing clause, do not restructure.

My first diagnosis was wrong and the reviewer caught it. I proposed labelling the split
(membership by design, verification unbuilt) as though the section never states it. **It states
both, plainly, in its second paragraph.** Implementing that would have restated paragraph 2 inside
paragraph 1 and shipped the duplicate-clause defect this page keeps filing. The real residual is
one sentence: *"a third edge looks like it has to exist by symmetry. **It does not.**"* elides its
verb, so it reads as *"does not have to exist"*, a **design conclusion**, while the only support
offered is **absence evidence**. Design claim, gap evidence, no label.

*"There is none:"* **drops** the unsupported design claim rather than caveating it, and one added
clause routes the two verdicts to where they already live. Routed to *"the next paragraph"*, not
*"the paragraphs below"*: both verdicts sit in the next one, and the one after it opens by
disowning federation as a different question with a different owner. Grounding re-run rather than
inherited (hub grep still zero; `constellation.rs` still owner-committed with `hardware_evidence`
future) and **paraphrased, never pasted**, because that upstream comment contains an em dash.
Says nothing about whether a non-hardware participant is advantaged, disadvantaged, alive, safe, or
has full access (Q8 request 2, unruled).

### `/why-web4`: a carry-over from #552/#553, and the class was three, not one

Not a visitor row. #553 logged *"the `#faq-platform-migration` one survives and is logged, not
chased, because picking its target means deciding which of the four copies owns the ladder."*

The reviewer found a second member and my re-grep found a third
([[claim-class-grep-truncated-enumerate-remainder]], and the pattern is the cause again):

- `#faq-platform-migration`, link text *"5-tier adoption path"*, to `/how-it-works`.
- `#faq-parallel-identities`, link text *"adoption tier"*, to `/how-it-works`. Missed by #553
  because its list runs **four** tiers (no Native), so `5-tier|five-tier` walks past it.
- `#faq-app-ui`, link text *"adoption tiers"*, to **`/day-in-web4#adoption`, an id that does not
  exist**. Missed by an href-scoped grep, which only looks at `/how-it-works`.

**Two remedies, chosen by what the destination actually holds**, not by uniformity. The
`/how-it-works` pair is **circular**: that page has no ladder and links back to `/why-web4` for
one, and in both entries the ladder is rendered in the very next element. So the wrapper is deleted
and the prose kept, which **also means no target had to be picked** and the four-copies question
stayed deferred exactly as #553 left it. The `/day-in-web4` promise is **accurate and merely
unanchored**: `day-in-web4`'s *"How Would You Actually Get This?"* section is precisely what the
sentence promises, its first card being *"Tier 1: Browser Extension"*. That one got the anchor
instead, demand-driven with a guard naming the inbound link, and the `#faq-app-ui` sentence was not
touched.

The instrument that finds all three, recorded in the guard so the next session inherits it:
`grep -rnoiE '(adoption (tier|path|pathway|model|ladder)s?|[0-9]+-tier [a-z ]*|tier (0|1|2|3|4)\b)' src/`

Excluded after checking: `/why-web4`'s two other `/how-it-works` links (the *"walkthrough"* one in
`#faq-app-ui`, the *"full lifecycle"* one in `#faq-death-rebirth`) promise no ladder.

### Still open

- **Unclaimed, surfaced by this pass's grep**: the ladder ships **three numbering schemes**.
  `#faq-parallel-identities` runs four tiers, `#faq-transition` runs five then says *"Tiers 0-3 are
  reversible ... only Tier 4"*, and `day-in-web4:944` says *"you don't have to wait for Tier 5"* on
  a page whose cards number from Tier 1. That is a curation row, not a link row.
- **Made more visible by this pass, deliberately not absorbed**: `/identity-constellation` asserts
  attestation as an accomplished general fact, against the hub's unbuilt `hardware_evidence` layer
  that `/onramp` now points at more sharply. Fourth file, out of scope, still open.
- **Two Aug-15 LOWs, both blocked, do not re-derive**: the `/tldr` 2-minute estimate (blocked on one
  number, 185 wpm vs 494 wpm for `/first-contact`'s five-panel gated wizard; the full analysis is
  banked in the Aug-16 entry below) and the site's-own-name row / Unanswered Q4 (no in-repo
  grounding, an operator branding call).
- **Visitor Unanswered Q1** (software-only on an ordinary laptop), still pending `../hestia`
  grounding. Unchanged.

## Aug-16 03:00 session - the CSAM answer said ban evasion costs hardware, and risk 8 says it does not

**No open PRs at start.** Fourth pass on `visitor/logs/2026-08-15.md` (today's log lands at 05:00,
after this fire). Both HIGHs and all three MEDIUMs were already closed by #551/#552/#553. Took the
illegal-content merge LOW. One page file plus a ledger addendum.

### The merge was the visitor's filing; the defect underneath it was not

Two `<details>` on `/what-could-go-wrong` answered the same question with heavily overlapping
law-oracle text. Decomposed per [[duplicate-pair-filing-decomposes]]: genuinely duplicative (yes,
on law oracles, SAL enforcement, audit trails and the jurisdiction caveat), and **both answers
carried a false universal**. *"Every action in Web4 is signed by a hardware-bound identity"* and
*"ban evasion requires obtaining new hardware ... their devices are flagged"* both contradict
**this same page** at risk 8, whose already-shipped paragraph says that at the software-only tier
*"a dishonest user's record is sheddable"*. The strongest form of the claim was sitting in the
answer about CSAM and terrorism, where it overstates what enforcement reaches.

Survivor chosen on content, not document order: it owned the worked law-oracle example, the
appeals link, and the *"design, not deployment"* caveat. Three units the deleted entry owned alone
were carried in **verbatim** rather than summarized ([[propagate-the-sentence-not-your-summary]]):
the named SAL tiers with the severe-violation fast-track, content quarantine plus evidence
preservation, and the bidirectional audit point (oversteps **and** under-enforcement). The named
tiers also settled a real disagreement between the two: one said violations trigger warnings, the
other said an entity distributing illegal content does not get them.

**The correction adds the entailment rather than deleting the absolute**
([[correcting-an-absolute-on-a-risk-page]]): what starting over costs depends on the tier, and at
the software-only tier ban evasion is correspondingly cheap, routed to `#risk-accessibility`.
Vocabulary propagated from this page's own risk 8, not coined. Says nothing about 0.50 in either
direction (Q8 equity half, still under its holding pattern). Licensed by Q8 Ruling 1, whose
released half is exactly *"a surface asserting that secure hardware is required to participate"*.
Two entries in, one out, 580 prose words to 495.

### Fifth truncation of the hardware-bound claim class, on the page that supplied the fix

The Aug-08 sweep propagated `/what-could-go-wrong:752-759` to thirteen surfaces and never read the
FAQ accordion on the same file. Worse, the recorded grep **cannot match** the ban-evasion sentence:
it states the binding as a verb phrase with no `hardware` adjective (*"LCT links identity to
physical devices"*), where both recorded patterns require the adjective or the bare-noun form.
Third pattern-caused truncation. The new pattern and **three more surfaces it finds**
(`terms.ts:249` Sybil, `/your-internet:149`, `/first-contact:1123`, none of them in any prior
enumeration) are in `docs/WEB4-CANON-QUESTIONS.md`. Not fixed here: out of a one-file scope.

### Deferred with the analysis, so the next session inherits rather than redoes it

The `/tldr` **2-minute** LOW was proposed first and the policy reviewer blocked it on evidence.
Both instruments were run and the work is worth keeping:

- **Enumeration (correct, do not re-derive).** `grep -rnoiE "(2|two)[- ]?(minute|min\b)[s]?" src/
  --include=*.tsx --include=*.ts` returns 34 hits: **20 live surfaces in 9 files** (`page.tsx:109`
  the landing CTA and `:140`; `tldr:9,:24,:27`; `learn:137,:142,:526,:533`; `navigation.ts:67,:70`;
  `NewcomerOrientationBanner:49`; `MobileNav:63`; `your-internet:373,:446`; `day-in-web4:1182`;
  `how-it-works:202,:222,:2640`; `why-web4:48,:49`), **3 comment surfaces** (`tldr:454`,
  `why-web4:43`, `NewcomerOrientationBanner:12`), and **8 verified out of class**
  (`your-internet:12` that quiz's completion time, `learn:385` /your-internet, `learn:350` and
  `:403` substrings of "12 min read", `why-web4:46` that page's own section budget,
  `lct-explainer:2256` hestia device setup, `day-in-web4:579` a narrative step, and **`tldr:106`,
  which is a verbatim visitor quotation inside a comment and must not be edited**).
- **A partial sweep is not available.** At 20 surfaces, fixing `/learn` alone prints
  *"The 2-Minute Overview ... 5 min read"* adjacent on one card. It is the whole class or none.
- **`why-web4:48-49` cannot be renumbered mechanically.** *"If you only have 2 minutes, try the
  2-minute TL;DR instead"* is an Apr-17 graceful exit; at 5 it promises an exit that no longer
  exists. It needs *"a few minutes"* / *"the short version"*, asserting no duration.
- **THE BLOCKER, and it is one number.** The choice of 5 rested on `/first-contact` implying
  185 wpm, since that is the site's only estimate ever corrected against a reader (5 to 7,
  Jul-30). But `/first-contact` is a **five-panel gated wizard** (`currentStep === "welcome"`
  :234, `"simulation"` :712, `"narrative"` :960, `"concepts"` :1141, `"next-steps"` :1316, plus an
  animated playback). Rendered HTML gives ~1293 words (one panel); source stripped of comments and
  JSX gives ~3458 (all five, plus transcript the reader does not self-pace). That is 185 wpm
  versus 494 wpm, and applied to `/tldr`'s 1142 words it is **6.2 min (billed 2 is badly wrong)
  versus 2.2 min (billed 2 is right and there is no defect)**. Resolve *which of those two is the
  reading volume* and the row decides itself.
- The 25 post-rebuild browse logs put `/tldr` at median 4.5 with **no browse ever at or under 2**
  (fastest 2.5), while the other four path pages track their billed numbers. Those markers are
  persona-authored, not measured (`(02:10)` repeats in three consecutive logs), so they are
  corroboration only. The suggestive part: the persona **reads** the billed numbers on `/learn`,
  so anchoring explains the four that agree and makes the one that overrides the anchor 25/25 the
  signal.
- **Operator note, contingent on the above.** If the anchor resolves to 185 wpm, the fix renames
  *"Web4 in 2 Minutes"* to 5 across the h1, `<title>`, both navs and every inbound label. Recorded
  cost: this visitor clicked it *"because it was the smallest promise on the page"*, and at 5 it
  ties `/running-now` and sits under `/why-web4`. The reviewer and I agreed this is a cost to
  record, not a veto, since it is a numeral with a falsifiable answer and `first-contact` 5 to 7 is
  precedent for sweeping one without escalation.

### Still open

- **Three Aug-15 LOWs**: the site's own name (also visitor Unanswered Q4), the `/tldr` estimate
  above, the `/onramp` hardbound-mention ambiguity.
- **Closed as a non-defect**: the `/what-could-go-wrong` "1025 FLOP" MEDIUM. Source is
  `10<sup>25</sup>`, landed 2026-03-01 and unchanged; the visitor's extraction flattened the
  markup ([[visitor-quoted-number-find-the-surface]]).
- Unchanged from prior sessions: visitor Unanswered Q1, and `#faq-platform-migration`'s
  *"5-tier adoption model"* link to `/how-it-works`, which does not contain one.

## Aug-15 21:00 session - the index said "all" and listed 69 of 73

**No open PRs at start.** Third and final pass on `visitor/logs/2026-08-15.md`, taking the last
unclaimed **MEDIUM** (the FAQ firehose, handed off twice) plus the one **LOW** inside the same entry.
One file plus a one-line anchor repair in a second.

### Both halves of the visitor's suggestion pointed somewhere other than where they pointed

*"Surface only a 'Most Asked' handful inline and move the long tail behind an explicit link, or add a
count up front."* The **structure half already ships** in full: lead answer, Most Asked group, Most
Asked section, and the whole tail already inside `<details id="going-deeper">`
([[visitor-deferred-low-check-shipped-first]]). So the residual was never structure. It was that the
apparatus answering the firehose is **incomplete and prints false numbers**:

- `#faq-index` says *"Browse all questions by topic"* and linked **69 of 73**.
- The Going-deeper quick-nav linked **56 of the 61** entries in its own section.
- `#faq-who-building`, `#faq-community-split`, `#faq-computational-overhead`: reachable from **neither**.
- **Two of six printed category counts were wrong.** `Adoption (14)` listed 13, a regression #552 left
  five hours earlier by deleting `#faq-early-adopters` from both navs without decrementing.
  `Trust (12)` listed 13, pre-existing.

**The visitor's own count is the evidence.** 69 index links minus the 12 Most Asked repeats is 57,
against their *"~55 across 7 categories"*. The size they perceived **was** the broken index. A count
row filed against a page is not always a request for a number; here it was a symptom of the index.

### The unindexed entry was a duplicate the visitor never saw

`#faq-who-building` deleted, not indexed: a second copy of `#faq-who-builds` (same three paragraphs,
open research project / no company-token-funding / honest caveat), in neither nav, **zero inbound
links in `src/`** while both live links point at the survivor. Survivor chosen on merit, not position:
it answers the harder second half (*why anonymous*) and its caveat **concedes** the transparency
tension where the deleted one asserted the site already meets it. The one non-duplicated sentence (the
research question) carried in **verbatim**, not summarized ([[propagate-the-sentence-not-your-summary]]);
`grep` confirms it ships nowhere else in `src/`.

### The /learn fence was honored, not routed around

`learn/page.tsx:161` forbids a question count on that card: *"a new falsifiable number on a page whose
FAQ grows."* The policy reviewer rejected my first argument for printing one here (*"the fence is
location-bound"*) as **end-run shaped**, because that reason travels. The sound argument, now in the
guard: the maintenance obligation is **already resident on `/why-web4`**, which prints six exact
category counts (two of them wrong when this began), and the total sits three lines above the lists
that determine it, where `/learn`'s would be falsifiable at a distance and invisible to anyone editing
this file ([[summary-layer-invisible-to-page-sweeps]] in reverse). What `/learn:164` defers, the
curation/accordion redesign, **stays deferred and is named as such** so nobody reads the row as closed.

**Three counts must agree and do: 72.** Entries, unique index links, and `12 + sum(category counts)`.
The guard carries the command. It strips JSX comments first, because the first two versions **matched
their own guard**: the comment quotes its slice markers, and one draft contained a literal comment
terminator and broke the build. A derivation printed inside the thing it derives has to exclude itself.

### LOW, same entry

`#faq-calibration` asked *"how were 0.5, 3 hops, and 0.02 chosen?"* while `0.02` is introduced only on
`/how-it-works` and `/what-could-go-wrong`, both later than this page in the path. Glossed **in the
question**, in the answer's own words (*"the trust update step"*), not the visitor's *"per-action trust
update rate"*, or the summary and its own answer become variant N+1. The nav label is deliberately not
glossed: a label under a topic heading is not a claim met cold.

### Found by this pass's instrument, fixed in flight and disclosed as scope

`trust-tensor:796` linked *"Full breakdown in the FAQ"* to **`/why-web4#faq`, an id that does not
exist** (the ids are `faq-index` and the 72 `faq-*`). Retargeted to `#faq-month-off`, the entry that
answers that paragraph's own six-month-break question, rather than to the index
([[promise-without-routing]]: key the promise on the thing).

### Left for the next session

- **Four LOWs**, unclaimed: the illegal-content merge on `/what-could-go-wrong`, the site's own name,
  the `/tldr` 2-minute estimate, the `/onramp` hardbound-mention ambiguity. (The `0.02` LOW is closed.)
- **Visitor Unanswered Q1** (am I software-only on an ordinary laptop), still open pending `../hestia`
  grounding, per the 09:00 session's reasoning. Unchanged.
- **Still open from #552**: `#faq-platform-migration` links *"5-tier adoption model"* to
  `/how-it-works`, which does not contain it. Picking a target means deciding which of the four ladder
  copies owns it. Untouched here; this pass repaired index coverage, not link targets, with the one
  disclosed exception above.

## Aug-15 15:00 session - the same question twice, and two answers that were never opposite

**No open PRs at start.** Second pass on `visitor/logs/2026-08-15.md`, taking the duplicate-FAQ-pairs
MEDIUM that the 09:00 session explicitly handed off (*"A merge pass over ~55 questions is its own
session"*). One file, `src/app/why-web4/page.tsx`. **None of the three pairs got the merge the
visitor asked for**, and each refusal is on different grounds.

### Pair A, equity: the premise was false, the duplication was not

The visitor reports the two equity answers leading with opposite attitudes, quoting *"Hardware-bound
identity does not require a security chip ... What hardware buys is ceiling, not entry"* against
*"This is a genuine equity concern"*. **Both quotes are the same opening paragraph** of
`#faq-tpm-affordability`, and their first string appears nowhere on the site (it is their paraphrase).
`#faq-affordability` opens *"This is a real equity concern, not a dismissed one."* Same valence.
Fifth [[visitor-premise-may-be-a-sentence-you-shipped]] in a month.

What was real: the two `<summary>` lines were near-indistinguishable ("security chips" vs "TPM
chips"), and the ~2018 / budget-Android prevalence fact shipped in both bodies.

**Not merged, and that is a constraint.** `docs/WEB4-CANON-QUESTIONS.md` records the FAQs as
deliberately unmerged pending the **unruled equity half of Q8 (request 2)**; the policy reviewer made
*two entries in, two entries out* a binding condition. The entries answer different axes (price and
paths to a chip / eligibility and what the ceiling costs). So: summary retitled to *"Without a
security chip, am I shut out of Web4?"*, the duplicated prevalence detail deleted on that side, the
pair joined in both directions by axis. **The `"most" isn't "all"` hedge is kept** rather than traded
away with the duplication ([[keeping-the-true-half-can-still-reassure]] in reverse: the hedge is the
honest half).

**The retitle side was chosen, not defaulted.** `#faq-affordability` has two *external* inbound links
and a guard at `what-could-go-wrong` requiring its `<summary>` and that link's text to stay the same
sentence; `#faq-tpm-affordability` has zero. Retitling the unlinked one leaves that guard untouched
and no cross-page edit needed. **Its `id` is deliberately unchanged**: four guards in-file,
`SESSION_FOCUS.md` and the canon ledger all address it by anchor name.

### Pair B: not a duplicate at all, so a join and not a merge

`#faq-many-identities` answers **breadth** (how many trusted identities a budget buys),
`#faq-buy-50-devices` answers **depth** (whether stacking devices on one identity buys score). The
visitor is right that the attitudes differ; they are correct for their different questions, and
nothing on the page said the questions differed, so the reader had to read them as a contradiction
([[friction-may-be-an-entailment-not-a-contradiction]]). One clause each, **both directions**,
because `#faq-buy-50-devices` is also reachable from the Most Asked list and so is not reliably the
second one read.

### Pair C: the strongest true duplicate, which the visitor described most loosely

`#faq-early-adopters` asked `#faq-opt-in`'s question in near-verbatim words and answered it with a
**fourth** copy of the tier ladder. Deleted, with its one genuinely unique sentence (*the adoption
path is a design proposal, not a proven playbook*) relocated to `#faq-transition`, the first ladder
in document order. Shipped in that entry's **own words**, not a summary of them
([[propagate-the-sentence-not-your-summary]]).

**Reconciled, not stacked.** `#faq-transition`'s existing caveat carried a sentence **verbatim
identical** to one in `#faq-opt-in`'s caveat (*"A trust score based on 2 platforms is less meaningful
than one based on 200"*). Landing a third caveat unchanged would have shipped the filed defect inside
the pair being fixed. The coverage point is now **routed** to `#faq-opt-in`, which owns low adoption
as its whole subject, instead of restated. One forward pointer added from `#faq-adoption-path`, whose
ladder the relocated caveat also qualifies; `#faq-platform-migration` deliberately left alone (a
worked example, not a claim about the progression).

### Corrected by the policy reviewer, before it became a guard

My Step 3 said `/how-it-works` co-owned the tier ladder. It does **not**: `grep -ci
"wrapper\|observable tier\|5-tier\|five-tier"` over that page returns **0**. All four copies are on
`/why-web4`. A wrong reason inside a guard is worse than no guard
([[guard-fences-a-location-not-an-item]]).

### Found and logged, not chased

- **`#faq-platform-migration` links the phrase "5-tier adoption model" to `/how-it-works`, which does
  not contain it.** The deleted entry had the same dangling link; deleting it closed one of two.
  Picking the survivor's target means deciding which of the four copies owns the ladder, which is the
  page-wide curation row this pass is not.
- **The ladder ships four times** and the `$50 phone` / `~$25 FIDO2` figures three times
  (`#faq-affordability`, `lct-explainer`, `what-could-go-wrong`'s price band). The latter is a
  deliberate cross-page band with a guard, not a defect.
- **74 FAQ entries, not the visitor's ~55.** Their count is off by nineteen, which is itself evidence
  for their other MEDIUM.

### Left for the next session

- **MEDIUM**, the FAQ billed as "6 min + optional Q&A" while carrying 73 entries. Untouched: it is a
  billing/curation decision about the whole list, not a by-product of three merges. The corrected
  count (73) is the number that row should be argued against.
- **Five LOWs**, all unclaimed: the `0.02` gloss, the illegal-content merge on
  `/what-could-go-wrong`, the site's own name, the `/tldr` 2-minute estimate, the `/onramp`
  hardbound-mention ambiguity.
- **Visitor Unanswered Q1** (am I software-only on an ordinary laptop), still deliberately open
  pending grounding in `../hestia`, per the 09:00 session's reasoning.

## Aug-15 09:00 session - the story never said whose tier it was

**No open PRs at start.** First pass on `visitor/logs/2026-08-15.md`. Merge-time check first: all
four Aug-14 PRs (#547-#550) were live before the 12:00Z browse, so this log reads the current site.
Took both HIGHs and the one MEDIUM that is a five-word correctness fix. Two files.

### The Key Takeaways box taught the wrong three words

`how-it-works:231` named the trust dimensions *"(competence, reliability, consistency)"*. The
site's T3 is Talent / Training / Temperament, including 96 lines below in the same file. The
visitor: *"The Key Takeaways box is the first thing I read on the page. I learned 'competence,
reliability, consistency', carried it for several minutes, and then had to unlearn it. That is the
one thing on the whole site that actively taught me something false."* Triple **propagated from
this page's own canonical line**, not re-derived. Site-wide sweep found no second prose instance;
the only other hits are the WASM engine's constructor arguments, which render nowhere and are an
upstream API signature this track does not own.

### HIGH 1: the fence was there. The JOIN was not.

Their premise is **false as filed**: *"This page states its version flat, with no hedge at all"*
describes `EndOfLifeCaveat`, which renders directly under the 145 cards they quoted and has
enumerated their branch since Aug-09. Fifth filing of Q5, third
[[visitor-read-it-and-still-filed-it]]. So the residual was never the fence
([[friction-may-be-an-entailment-not-a-contradiction]]): the enumeration is abstract, and a path
reader arrives **carrying a concrete 112 from the page before**. Nothing told them the 112 they
already held IS branch three.

Two edits, no branch endorsed and no figure moved:

- **`how-it-works`**: the caveat now says which instance shows which branch. **Symmetric on
  purpose** - an instance-pointer on one branch of three reads as weighting it, so the
  balance-carry branch is attributed to the cards below in the same sentence. Both third-branch
  instances are named, not only the off-page one: `LifecycleDemo` renders a 112 restart on *this*
  page, which is why the third branch was added to the enumeration in the first place.
  `EndOfLifeCaveatShort`'s strict-subset property is unaffected (sentences 1-2 untouched).
- **`first-contact`**: the fence answered the AMOUNT axis correctly, but the sentence it opens with
  asserted a **universal**, *"everyone starts a life with 100"* - branch three stated as the rule
  for everyone. This page settled Q5 in passing while the next page said it was open. Narrowed to
  *"in this walkthrough a life starts with 100"*, which removes an assertion and imports nothing
  from `how-it-works` (whose guard forbids it). The `100` stays: `112 > 100` is load-bearing
  against a prior "rebirth leaves you worse off" HIGH.

**Swept, not spot-fixed**: the same universal shipped a second time in the same file, in the
Rebirth paragraph the card's own guard names as its propagation source. Both carry the identical
clause now. **Left with the criterion**: `everyone starts` on five other pages is the *joining*
baseline (first grant, 0.5 and 100 ATP), which no open question touches. Only the *rebirth* base
grant is branch three ([[adding-a-distinction-creates-a-sweep-obligation]]).

### HIGH 2: the page whose whole subject is the climb never named the tier

Confirmed exactly as filed: hardware / chip / TPM / ceiling / software-only render **zero** times on
`/first-contact` (every grep hit was a guard comment), while `/lct-explainer` states a software-only
setup *"stays at 0.50 however many devices it spans"*. Alice reaches 0.62, so her tier is **forced
by the site's own ceiling rule** and only the page that dramatizes the climb never said which tier
it was showing.

**The blocking guard is card-scoped, not page-wide.** *"Do NOT hang a tier caveat here"* is bound
to the collapsed concept map it sits above ("this map", "the cards inside", "this card links to")
and rests on density grounds for that element ([[guard-fences-a-location-not-an-item]]). New static
line at the **foot of the "Before you start" panel** instead: not a third `<li>` (the Jul-29 guard
keeps this box's "only two numbers move" promise), and not a collapsed aside, which would
under-weight a HIGH.

**It contains no numeral, deliberately.** The bullet directly above already carries the fatal-line
clause; a ceiling numeral beside it lets a reader derive a status for a software-only identity
sitting exactly on the line, which is ledger **Q1 answered by adjacency**. Not hypothetical: the
ENDPOINT RULE guard on that panel records three deletions of assertions written into it, and this
same visitor's Unanswered Q5 asks precisely that derived question. So the ceiling is qualitative
("tops out lower") and the argument is **routed**, to `/lct-explainer#software-only-survival` and
`/what-could-go-wrong#risk-accessibility`. **Shape propagated** from `/karma-consequences`'s
*"That holds for a hardware-anchored agent"* caveat, which solved this for its own walkthrough:
name the tier, disclaim the walkthrough's scope, import no number.

### Refuted, with the criterion

**MEDIUM, `10^25` FLOP rendering as "1025".** `what-could-go-wrong:1411` ships
`10<sup>25</sup>`. A browser renders it correctly; the visitor's text extraction flattened the
superscript. No edit. Worth remembering as a **class**: a numeral that looks wrong in the log may
be a fidelity loss in the visitor's own reading pipeline, not on the page
([[visitor-quoted-number-find-the-surface]]).

### Left for the next session

- **MEDIUM**, duplicate FAQ pairs on `/why-web4` (security-chip vs TPM-chip equity answers with
  opposite leads; the buy-many-devices pair; the opt-in/Web2 pair). Real, and the visitor is right
  that the equity framing is the one matching Risk 8. A merge pass over ~55 questions is its own
  session.
- **MEDIUM**, FAQ length billed as "6 min + optional Q&A".
- Five LOWs, all unclaimed.
- **Visitor Unanswered Q1** (*"If I install hestia today on an ordinary laptop, am I software-only
  or hardware-bound?"*) is the sharpest thing in the log and is **deliberately not answered here**.
  `/running-now` says hestia's hardware binding is trait contracts only for now; concluding from
  that that every hestia user today is capped would be manufacturing the visitor's own inference,
  which is the defect #547 repaired. It needs grounding in `../hestia`, and if the answer is yes it
  belongs on `/running-now`, not on the walkthrough.

## Aug-15 03:00 session - the counter that marks itself

**No open PRs at start.** Fourth and final pass on `visitor/logs/2026-08-14.md` (the Aug-15
browse fires at 05:00, after this session). Took the three unclaimed **LOWs that survive a
source check**: LOW 11 (`/why-web4`), LOW 13 (`/running-now`), LOW 12 (`/learn`). Three files,
none shared. LOW 10 refused with its reason. The log now has no unclaimed row.

### LOW 11: the guard cited the sentence and carried half of it

Visitor: *"'424 attack vectors across 84 tracks, with ~85% detection...' I cannot judge whether
85% is good. The undetected 15% is about 64 attacks, and I do not know what kind."* Their
suggestion has two branches and only one is groundable. **(a) what the misses have in common:
refused**, no upstream artifact characterizes a missed set. **(b) why 85% is or is not the
meaningful figure: already written upstream, in the same sentence we quoted from.**

The bullet's Aug-14 guard says what upstream states live *"is ~85% detection against synthetic
adversaries with no red team engagement, which is what this bullet now carries."* It stopped at
the semicolon. `README.md:161` and `STATUS.md:64` both continue: *some "defenses" are standard
infosec practices (EM shielding, TEMPEST) documented for completeness, not Web4-novel*. Shipped
**verbatim from README's render** (shorter; its parenthetical leads with the plain-language
term). Not merged with STATUS's wording, which would be variant three
([[propagate-the-sentence-not-your-summary]]).

**No arithmetic inference.** The clause does not say those practices sit inside the 85% or
inflate it: upstream says neither, and manufacturing the reader's own inference is the defect
#547 repaired on this same page.

**"across 84 tracks" deleted in the same edit**, and the criterion is recorded because the
bullet one row up deleted its number outright (#525's density ruling, a rotted LOC figure). The
difference: there the subject had rotted; here the numbers are live, and what was missing was
upstream's own qualifier. 84 goes because it is a second uncalibratable numeral doing no work in
a complaint whose denominator was 424. Net words near flat.

**Found and deliberately not used**: the Aug-14 guard's grep for *"all defended"* was truncated.
The phrase is also live in `simulations/docs/ATTACK_CATALOG_SUMMARY.md`. It stays deleted, and
the finding is why: that same table gives *"Average Detection Rate ~70%"* for the same 424
vectors, disagreeing with the STATUS/README figure the site prints. An upstream inconsistency is
not a licence to strengthen a claim ([[claim-class-grep-truncated-enumerate-remainder]]).

### LOW 13: the claim keyed on the THING had no link; the one link was keyed on the READER

Their premise is wrong on position (the roster is the **first** row of "Where you fit today", not
the fifth) and right on function. That row opens *"You are here to understand it, not to run
it,"* so a reader who identifies as a runner skips the only external check on a claim made 145
lines above. `#whose-machines` (*"the deployment counted here is the lab's"*) is the claim keyed
on the thing, and it was unlinked while **its own guard cited the roster as its grounding**
([[promise-without-routing]], [[guard-comment-names-the-un-swept-page]]).

**Link target decided, not defaulted.** `/hub#we-run-one` owns the living-example claim and
`/hestia:642` complies by linking there. This clause makes no society/witnessing/presence
assertion, only "here is where the roster is", so it links the roster raw, as the row on this
same page already does; on the maturity ledger a hop through an internal restatement is the
wrong end of the trade. Recorded so a later convention pass changes both render points together.

**Two rotted citations repaired while the guard was open**: `hestia/README.md:22` and `:78` now
point at unrelated sections (the live homes are the "A living example" callout and the plugin
row). Re-cited **by content, not by line** ([[guard-comment-cites-rot-name-the-target]]).

### LOW 12: the visitor's literal suggestion would have shipped a falsehood

They asked for *"mark these yourself as you go"* next to `0 / 24`. The counter is **not
self-marked only**: the mount effect merges saved localStorage progress with auto-completion
derived from `pagesVisited`, so a reader who browsed the onramp first opens `/learn` to a
non-zero count they never touched. Their instinct (*"I briefly thought I was being tracked"*)
was **correct**, and reassuring them with a sentence denying it is
[[keeping-the-true-half-can-still-reassure]] in its exact shape. The policy reviewer caught this;
the proposed clause was wrong before it shipped.

So the clause carries both halves plus the destination: you tick them with the Mark Done
buttons, some are ticked for you from pages you have opened, and nothing is sent anywhere
(`src/lib/exploration.ts` is localStorage only, no network call, and the repo has no analytics
package at all). *"some"*, not *"any page you open"*: only the mapped slugs reached through
`trackPageVisit` tick anything. The old *"(saved in your browser)"* is folded in, not dropped:
it answered where the data lives and never who creates it, which was the visitor's actual gap.

### LOW 10 refused, with the criterion

Whether a 5-hop pipeline is reachable inside a ~3-hop neighborhood is fenced at
`how-it-works:2376-2394` **in both directions** (*"must NOT restate /trust-neighborhood's 3-hop
horizon as a bound on pipeline length, or as not being one"*) and filed as ledger **Q11**. The
answerable half of the visitor's row, whether the two hops are the same kind of thing, already
ships in the rendered paragraph below that guard (*"One is a pipeline you built; the other is how
far word of mouth carries"*). The residual is the fenced half only, so there is no
fenced-plus-answerable split to exploit here.

### Left, with reasons

- **HIGH 3** residual (placement-only) and **MEDIUM 7** (declined 21:00 on the pre-vs-post-Start
  criterion): untouched, both already have written criteria.
- **HIGH 4**: ledger **Q5**, escalated and unruled.

## Aug-14 21:00 session - the visitor who never pressed Start

**No open PRs at start.** Third slot on `visitor/logs/2026-08-14.md`. Took **MEDIUM 8**
(`/first-contact` Act 5) and **MEDIUM 9** (`/running-now` badge key, the item the 15:00 pass
left with a written open question). Two files.

### MEDIUM 8: the number was on the page, behind a button

The visitor: *"Alice ends around 0.62 trust, dies at ATP 0, and is 'reborn at 0.54' with a
'+12 bonus.' ... But her trust went down, 0.62 to 0.54. Nothing tells me why a head start
includes a trust haircut."*

Every phrase they quoted is a **pre-Start literal**. `↑ 0.62`, `dies at ATP 0`,
`+12 bonus → 112`, `reborn at 0.54` are storyboard-rail chips; their *"karma, a head start
earned by the trust and reputation she built in her first life"* is the static paragraph under
the rail, **verbatim** (the policy reviewer found that one, not me). This visitor never pressed
Start.

Alice's trust at the moment of death is **0.51**, and the page says so three times: the
`simulationSnapshots` tick-13 row, *"Trust fell from 0.62 to 0.51"*, and the load-bearing
*"Alice got lucky. Her trust was still 0.51 when ATP ran out"* box. `grep -n "0\.51"` returns
exactly those, and **all three are post-Start**. So the rail's only readable trust transition
across a card that compresses two moments was 0.62 to 0.54: a drop, on the card whose moral is
that you restart above neutral.

#542's guard on this very card *names the misreading*: *"a down arrow would read as rebirth
costing her trust."* It arrived with no arrow, because the value the arrow would have measured
against was missing. Aug-13 gave the rebirth moment a trust chip and the death moment none;
this closes the half that was left.

**Folded into the death chip** (`dies at ATP 0, trust 0.51`), not added as a fourth, which
would have to precede the +12/0.54 pair or destroy the ordering the fix creates. Deliberately
**bare**: no *"above 0.50"*, no *"barely above"*. The endpoint escalation forbids a regional
claim about 0.50 in either direction, and the "Alice got lucky" box already owns that argument.
**No arithmetic relating 0.51 to 0.54** (Q5 territory; the visitor's *"how 0.54 was arrived at"*
is deliberately unanswered rather than coined).

**The no-arrow rationale was rewritten, not just extended.** Its old reason rested on 0.62
being the only preceding trust value, so with 0.51 rendering it read as spent and would have
licensed the arrow it forbids. The rule that survives is the rail's convention: Acts 2-4 arrow
against the previous **act**, and Alice ends Act 4 at 0.62, so an up arrow is still false
([[opposite-intents-in-code-comments]]).

### MEDIUM 7 declined, and the criterion is the same test

Act 3's bare `↓ 0.48` was left alone. Its content ships **pre-Start and above the rail**, in
the Trust Score bullet: *"Below 0.50: features get restricted until she rebuilds it - and if she
stays below, that same line becomes fatal - a sustained slide, not one dip."* That is the
visitor's own suggested sentence, already upstream of the chip. 0.51's meaning shipped nowhere
a rail reader could reach. **Pre-vs-post-Start is the discriminator**, and it licenses one item
and refuses the other for the same reason.

### MEDIUM 9: answered the 15:00 pass's open question

It asked: a clause at the key, or at the two render points? **At the key.** That paragraph is
the canonical statement of the ladder, `/tldr`'s gloss is declared a strict subset of it, it
already owns every "what the badge is NOT" claim, and it renders before both numerals.

**No version literals in the clause**, and no comparative between them: both numerals also
render on `/hub` and `/hestia`, so a third copy above its own sources rots on the next bump.
The general form does not. Sweep criterion: the clause is owed only where two pieces' numerals
render on one page against differing badges, which is `/running-now` alone (`/hub` and
`/hestia` each state one version and one badge, so neither can produce the comparison).

**Recorded against the precedent that cuts the other way**: this page has a three-strike
history (Aug-01, Aug-04, Aug-13) of caveats that only stuck once they moved **into** the row.
The guard says so, and says that a re-file means the residual is **placement, not wording**.

### Left, with reasons

- **HIGH 3** residual (placement-only): licensed to a dedicated pass, untouched.
- **HIGH 4**: ledger **Q5**, escalated and unruled. Untouched in both directions.
- **LOW 10-13**: unclaimed, no criterion written against them.

## Aug-14 15:00 session - the page whose whole subject is hardware carried only the negative half

**No open PRs at start.** Second slot on `visitor/logs/2026-08-14.md`. Took the one row the
09:00 pass left unclaimed and named as strongest: the `/why-web4` vs `/hardbound` **TPM
medium**. One file, `src/app/hardbound/page.tsx`.

### The visitor's premise was loose. Their prescription was right anyway.

They wrote that the reconciling sentence *"exists only on `/running-now`"*. Checked before
believing it ([[visitor-premise-may-be-a-sentence-you-shipped]]):

| Surface | Carries the upstream-vs-on-device reconciliation? |
|---|---|
| `/running-now:453-461` | **Yes, in full.** The origin paragraph. |
| `/lct-explainer:539-550` | **Yes, in full** ("which artifact, precisely"), though inside a collapsed `<details id="hardware-tiers">` |
| `/why-web4:808` | **Both halves, in one bullet**, since #488 (Jul-27) |
| **`/hardbound`** | **No. Nowhere.** |

So three of the four alleged gaps do not exist, and the bullet the visitor quoted *as* the
contradiction answers itself after a semicolon; they quoted it truncated at the ellipsis.
Their filing predates nothing, it mis-reads a sentence we shipped 18 days ago.

What survives the correction is the one gap that is real, and it is exactly their suggested
fix: **the page whose entire subject is hardware carried only the negative half.** A reader
who came to `/hardbound` for the hardware tier had to leave the page to learn that the TPM 2.0
primitive works at all. Corrected map is recorded in the guard, not just here, because a later
session re-deriving from the visitor's wording would hunt three gaps that are not there.

### What shipped

`/running-now:454-461` propagated as the **sentence**, not a summary
([[propagate-the-sentence-not-your-summary]]), into the "Where it is on the maturity ladder"
card, immediately after the negative paragraph it contrasts with. Plus the two-word qualifier:
*"The hardware binding"* to *"**Hardbound's own** hardware binding"*, which the new paragraph
makes necessary (without it the two paragraphs argue).

**Deliberately not carried**: `/running-now:446-452`, the "to be precise, this is not
production-ready" half. This page refuses "production-ready" eight lines above. Duplicating it
inside one card is the shape #543's density ruling forbids on the source page
([[density-guard-means-delete-not-caveat]]).

**No `id`.** Anchors are demand-driven, `/hardbound` still has zero, and `/why-web4`,
`/lct-explainer` and `/tldr` all point at `/running-now#hardbound-status`. A second element
with that name invites a later mis-repoint. The outbound link was **relabelled**, not copied:
the source's *"Where that claim appears"* is wrong on a page where the reader is already at
the caveat.

**Sweep obligation, stated so the next pass does not invent one**
([[adding-a-distinction-creates-a-sweep-obligation]]): the narrowing qualifier is required
*here* and creates no duty elsewhere. `/tldr:340-357` declares its chips strict subsets of
tldr's own bullets; `/hestia:337`, `/tldr:413` and `/tldr:516` state the general form, which a
narrowing here does not contradict. `running-now:441-444`'s guard protects **running-now's**
sentence, not this one; the wording matches by choice, not by rule.

**Not a maturity decision.** Scope naming only (the distinction `/lct-explainer:535` records).
Hardbound stays Reference. The text says nothing about whether secure hardware *gates*
participation, in either direction: that is the separate escalated seam.

### Left, with reasons

- **MEDIUM 9** (hestia `Running` v0.0.3 vs hub `Reference` v0.1.0-alpha.0, numerals implying
  the opposite ordering from the badges): deferred, and **the reason matters**. A draft of this
  entry deferred it as "fenced by #543's density guard on the badge key". The policy review
  falsified that: #543's guard binds the key **rows** (`running-now:62-127`); the numerals the
  visitor compared are at `running-now:276` (hub) and `:329` (hestia), outside it. The guard
  fences one candidate *location*, not the item. Note also `running-now:170-173` already says
  the badge *"says how far a piece has travelled, not how good it is"*, which is adjacent to
  but not the same as the version-numbering claim. **The open question for the next pass**: is
  the residual a missing clause at `:170-173`, or a clause at the two render points? That is
  real analysis, not a ride-along. Do not read this as a prohibition.
- **HIGH 3** (how did Life 1 end): shipped #545; residual is placement-only, licensed by the
  09:00 pass to a dedicated pass. Untouched.
- **HIGH 4** (three rebirth arithmetics): ledger **Q5**, escalated and unruled. Untouched in
  both directions.
- MEDIUM 7, 8 and all four LOWs: still unclaimed, no criterion written against them.

## Aug-14 09:00 session - the sentence that manufactured the visitor's own inference

**No open PRs at start.** First slot on `visitor/logs/2026-08-14.md`. All four Aug-13 PRs
(#543-#546) merged before the 05:07 browse, so this log reads the current site with no
post-browse ambiguity. Took **HIGH 2 + their Unanswered Q1**, **HIGH 1** (second filing) and
**MEDIUM 6**.

Visitor ticked **all seven** understanding boxes. Their own statement of the residual:
*"the gaps that remain are not 'what does this word mean,' they are 'these two pages disagree
and I do not know which to believe.'"* Every item taken is of that shape.

### HIGH 2: the visitor's premise was ours, and it was false

They reasoned *"T3 has published weights (0.4/0.3/0.3), so raw and composite are not the same
number"* and could not tell which quantity the death line reads. They did not invent that
premise. `/karma-consequences` shipped it as a claim (#533): *"raw trust is what the permanent
death tracks, and the composite score is what the rebirth gate reads."*

Five surfaces to one:

| Surface | Reads |
|---|---|
| the six-page byte-identical rider | *"the number compared is raw trust, **not effective trust** (raw x CI^2)"* - the contrast is CI, never the blend |
| `/why-web4` | `Effective trust = raw trust (0.72) x CI^2`, raw as a single scalar |
| ledger **Q14** | computes `0.4(0.90)+0.3(0.45)+0.3(0.014)` and applies the survival rule to it |
| `/trust-tensor` guard | applies *"raw trust falls below 0.5"* to a worked composite |
| upstream `t3-v3-tensors.md` | `grep -c raw` = **zero**. Canon defines no second quantity |

And **#533's own cited precedent refutes it**: it grounded the clause in the borrowed-word
defect #532 had just fixed on `/trust-tensor`, but that fix says the composite **is** the
single-overall-score blend and the *different* quantity is the widget's **role-weighted match**.
#532's axis is composite-vs-role-match; #533 transposed it onto raw-vs-composite.

**Deleted, not replaced.** The other half: the death rule is *taught* on `/how-it-works`, where
"raw trust" was undefined. That page now defines it adjacent to (never inside) its byte-locked
death paragraph, propagated from its own eligibility card: the blend, not one dimension.
Deliberately **not** `/first-contact`'s version of the clause (*"weighted for the role she is
acting in"*), which would import the other false axis into a page that already had to correct a
role-varying claim against 10.2 on Aug-06.

Q1 untouched in both directions (no comparator, no endpoint). The open sliver, whether the
rebirth gate is entity-wide or role-scoped, is **filed under Q14**, not answered. Deleting a
false distinction is not asserting its negation, and the ledger note says so explicitly.
The visitor's literal suggestion (force one phrase onto all four pages) was **refused**: it would
decide the role-scoping question by vocabulary.

### HIGH 1 (second filing): routing was the missing one of three

Aug-13 HIGH 3 is the same claim. Visitor: *"I read 'carries less weight' as 'a bit slower to
build up'. It does not mean that ... I would rather be told hard news in two minutes than
discover it on page nine."* Three available fixes are not the same
(`routing-stating-weighting-three-fixes`): **state** the ceiling here (forbidden by the guard,
and a Q8-equity claim `/tldr` does not own), **weight** it, or **route**. The honest account is
not "no link existed" but *the link pointed elsewhere*: the clause already linked
`#first-device-bootstrap`, correct for the witness question and silent on cost. Now routes to
`#software-only-survival`, the site's fifth inbound link to that anchor. No number in the link
text.

### MEDIUM 6: a spent reason, rewritten rather than dropped

`/tldr` defined two tags, then used "Spec" three times without defining it, and linked to "the
full three-tier key". Spec row added **first** (the paragraph below asserts an order), verbatim
from the legend it links to. Consequence worth recording: the guard refusing to re-badge the
cards rested on *"it would put an UNDEFINED tier chip on this page"*. That premise is now spent,
so the refusal was rewritten onto the ground that survives ("these cards show only the furthest
it has reached" is a live rendering constraint that never depended on Spec being undefined).
Leaving it would have been rot a later pass would read as still-live reasoning.

### Left, with reasons

- **HIGH 3** ("how did Life 1 end?"): **shipped** in #545, which merged 22:13 Aug-13, seven
  hours before the browse. So this is a **recurrence against the fix**, not a stale filing. The
  residual is **placement, not absence**: `EndOfLifeCaveat` renders *after* the table the visitor
  read top-down, so they built the contradiction before reaching the disclosure. Licensed for a
  later placement-only pass; do not re-treat the content.
- **HIGH 4** (three rebirth arithmetics): ledger **Q5**, escalated and unruled, fenced at four
  surfaces.
- MEDIUM 4 (`/why-web4` vs `/hardbound` TPM: put the upstream-vs-on-device reconciliation on
  `/hardbound` itself, where it currently lives only on `/running-now`), MEDIUM 5, 7, 8, 9 and
  all four LOWs: unclaimed, no criterion written against them. MEDIUM 4 is the strongest
  remaining row and is a straight propagation.

## Aug-14 03:00 session - four numbers, and the proof the repo lists under "missing"

**No open PRs at start.** Fired 03:01, before the 05:00 cron, so `visitor/logs/2026-08-13.md` is
still the freshest log and this is the **fifth** slot on it (#543 HIGH 1+2, #544 MEDIUM 7+8 and
LOW 10, #545 MEDIUM 5). Took **LOW 12**, the only row no prior session claimed or deferred with a
written criterion.

> "Number blizzard I could not evaluate: '424 attack vectors across 84 tracks,' '38.5 tasks/sec
> throughput,' '5 theorems,' '~47,000 lines of tested code.' Throughput of what, measured how,
> compared to what? These read as reassurance rather than evidence, on a page that is otherwise
> careful."

Third browse to name this class (`2026-07-31.md:122`, and the Jul-30 LOW pass, which declared it
out of bounds). The visitor also supplied the target shape: `/running-now`'s *"The 2,627-test
figure you will see quoted belongs to a third artifact"*, which they credited as the reason they
believed every other number on the site.

**Criterion applied**: a number stays only if the page can name what produced it and what it is
evidence *for*. Otherwise it goes, with no replacement numeral.

### It was not a density complaint. Three of the four numbers do not survive grounding.

| Number | Verdict | Ground |
|---|---|---|
| `424` / `84 tracks` | **stays, re-qualified** | Live in `web4/STATUS.md:64` and `README.md:161`, but with a scope the site had dropped: *"~85% detection rate against **synthetic** adversaries. No red team engagement yet."* |
| "**all defended**" | **deleted** | **No live upstream source at all.** Only `docs/history/STATUS-2026-02.md:22` and `forum/kimi2_6_review.md:119,160`, and the forum file quotes the phrase in order to **reject** it. |
| `38.5 tasks/sec` | **deleted** | `FEDERATION_CONSENSUS_ATP_INTEGRATION.md:364-368` derives it: *"~7.7 blocks/second (from Session #43)"* times *"**Assume** 5 tasks per block (practical limit)"*. An assumption times a block rate, published as a benchmark. Only executable artifact is `archive/reference-implementations/federation_consensus_atp.py:909`, archived in the same sprint-32 sweep behind #491 and #498. |
| `~47,000 lines of tested code` | **deleted, both positions** | `docs/history/STATUS-2026-02.md:30`: *"~47,000 lines of code across **game simulation**, authorization, and coordination framework."* A February whole-repo LOC count whose largest named component is the sim this site archived in July. |
| `5 theorems` / "formally proven" | **deleted, claim and all** | see below |

### The finding: the site asserted a proof that Web4's own repo lists under "What's Missing"

Three live upstream files, unqualified: `README.md:166` and `AGENTS.md:56` read *"Formal
Sybil-resistance proofs (empirical defenses only)"*; `STATUS.md:77` gives the same row as
*"Empirical defenses only | Open research"*. So `(5 theorems)` was not merely an unsourced
parenthetical. Deleting only the parenthetical would have left a **refuted** claim standing.

Same for the clause two positions later. *"Incentive compatibility proven"* is refuted by
`SECURITY.md:194`, *"No game-theoretic analysis: Are proposed incentives actually
Nash-equilibrium resistant?"*, on its own subject. It came out in the same pass because it is in
the same sentence, refuted by the same arbiter, and already conceded on the page this bullet
links to. Splitting it out would have shipped a bullet that deletes "formally proven (5 theorems)"
and leaves "proven" two clauses later.

### Re-opening a surface a prior session closed in writing, and the one argument that did NOT hold

`SESSION_FOCUS.md:1192` (Aug-10) declared `atp-economics` `grep -n "Formally proven: one honest
identity"` and `why-web4` `grep -n "424 attack vectors"` **out of bounds in writing**: *"the Sybil
'5 theorems / 4.6x / 13x' family: same shape, **different** provenance, already hedged at the
`why-web4` surface"*. Two prongs, and only one is falsified:

- **Prong 1 (different provenance) STANDS. Do not record it as refuted.** It plainly meant
  *different from the bootstrap-convergence family that pass was treating*
  (`archive/reference-implementations/bootstrap_convergence_proofs.py:27-31`). Showing the three
  Sybil numerals share provenance *with each other* is a different proposition and does not touch
  the claim made. A draft of this entry argued otherwise; the policy review named it as
  rationalization and it was cut.
- **Prong 2 (already hedged) is falsified, and is sufficient alone.** The hedge scoped the proofs
  to *"the modeled attack classes"*. Upstream does not say the proofs are narrow, it says they do
  not exist. A scope hedge cannot rescue a claim whose subject is absent.

> **The clean license, and it is not a judgment call**: `web4/SECURITY.md:107` reads **"No formal
> Sybil-resistance proof"**. That is the **same file the Aug-10 pass named as its arbiter**, on
> the **exact subject** it fenced. That pass quoted `:223` (economic modeling) while `:107` sat
> **116 lines above it, unread**. The out-of-bounds declaration rested on an unread line of its
> own arbiter.
>
> Scoping caveat, so the next session does not over-cite it: `:107` is component-scoped (its
> section's implementation is under `archive/game-prototype/`) and `SECURITY.md` is stamped
> "Last Updated: April 27, 2026". Lead with the three repo-level Gaps rows, which are unqualified,
> and use `:107` as same-arbiter corroboration, not the other way round.

### Surfaces, enumerated, because the first sweep was truncated twice

| Surface | What changed |
|---|---|
| `why-web4:572` (lead answer, uncollapsed) | `~47,000` deleted |
| `why-web4:741` | `~47,000` deleted |
| `why-web4:746` | "all defended", the proof claim, `5 theorems`, "Incentive compatibility proven" deleted; `~85%`/synthetic/no-red-team restored; `<Link>` moved off the count onto the collusion clause |
| `why-web4:769` | `38.5` and its parenthetical deleted |
| `atp-economics:1511-1516` | card rewritten to the transfer-fee mechanism; `4.6x`, `13x`, `5 theorems`, "Formally proven" and the closing absolute deleted |
| `atp-economics:2332-2333` | *"The math bears this out: one honest identity outearns five fake identities"* deleted |

The first two additions came from the policy review, not from me. Both are lessons:

> **A page-scoped sweep is not the same as a claim-scoped one.** `why-web4:572` is the **lead
> answer**, uncollapsed, above the `<details>`. Fixing the number inside the fold and leaving the
> one the reader meets first is the failure mode this project keeps re-learning.
>
> **A case-sensitive grep is half a sweep.** `grep "formally proven"` does not match
> `"Formally proven:"`. The `atp-economics` card was caught incidentally, via `4.6`. And
> `atp-economics:2333` carries the claim by **synonym**, *"The math bears this out"*, with no form
> of "proven" anywhere, so no spelling of that grep would ever have returned it. Sweep by claim,
> case-insensitively, plus synonyms.

Predicate for the next session:
`grep -rniE "424|84 tracks|38\.5|47,000|theorem|formally proven|the math bears this out|all defended" src/ --include=*.tsx --include=*.ts`
After this pass the only **rendered** hit is `why-web4`'s re-qualified `424` line. Everything else
returns guard comments, including the two pre-existing ones on `/what-could-go-wrong`.

### Left alone, with the criterion stated

- **Transfer-fee "unprofitable" claims** (`atp-economics:277,370,417`, `/lct-explainer`,
  `/why-web4`, `terms.ts`, `/glossary`) are **mechanism** claims, not proof claims. This page
  already marks the mechanism structural and the rate a sim parameter at `:417`, and canon agrees
  it is society-scoped (`atp-adp-cycle.md:595` *"The core protocol does not prescribe transfer
  fees"*, `:599` societies *"MAY implement"*, `:609` rates are *"simulation parameters"*). That is
  why the rewritten card says "burns a share of what moves" and quotes **no rate**.
- **`/what-could-go-wrong:585`** (*"cooperation becomes the Nash-dominant strategy"*) names its
  instrument (adversarial simulations) and claims a **finding**, not a proof, which is the shape
  this pass normalizes toward. A candidate for a later look, not a defect this bullet's fix
  reaches. `:448` carries its own adjudication guard at `atp-economics:1091`.
- **No replacement numeral was imported.** `web4-core`'s 171 and the reference SDK's 2,627 are
  live and correct, but they already ship with their artifacts on `/running-now` and
  `/the-standard` under a guard keeping those two identical. A third surface would make it a
  three-way sync.

### Outbound signal for web4 (not fixed here, not ours)

`web4/STATUS.md:64` routes the reader to `simulations/README.md` for the *"honest breakdown"* of
the 424 figure. **That file does not exist.** `simulations/` has been frozen since `a5fa4433`
(2026-04-27), and *"all defended"* appears nowhere in the simulation code. So there is currently
no artifact a reader can check behind the one number this pass kept, which is the strongest
argument for having kept only its qualified form.

### Visitor Unanswered Q3 (upgrade path): canon ANSWERS it. Deferred as a site fix, not escalated.

#544 owed a ledger filing for *"the single most practical question I had"*. **No ledger entry was
filed, because the premise was wrong.** `web4-standard/core-spec/multi-device-lct-binding.md`
answers the mechanism four ways, and the next session should not re-derive these:

1. **§3.2** `enroll_additional_device(root_lct, existing_device, new_device, society)`, *"Requires:
   At least one existing device in constellation."* The **Root LCT is not reissued**, so upgrading
   is enrollment, not re-genesis, and everything hanging off that LCT persists by construction.
2. **§2.2.4** makes software-only a first-class **anchor type** (Recommended Role *"Bootstrap,
   low-trust contexts only"*), so a software-only user **qualifies** as that existing device.
3. **§3.4** computes the ceiling as a pure function of the **current** device set, keyed to
   nothing about origin.
4. **§3.5** accepts `revocation_reason` `"upgrade"` and recomputes constellation trust
   immediately after. Canon names the visitor's exact move.

**So the answer is yes: your history transfers.** The genuine residue is narrow and mostly
unsayable here (§4.2 lists no mixed row and §3.4 aggregates by uniform average, which are Q1/Q8
numerics the site must stay silent on), so it belongs under **existing Q8**, whose subject is
already this tier, rather than as a new question.

> **The page that actually owes this**: `src/app/identity-constellation/page.tsx:44` calls a
> constellation *"a constellation of **hardware-bound** keys"*, which defines software anchors out
> of the mechanism and is why a software-only reader cannot see the upgrade path at all. It
> contradicts §2.2.4 and §4.1's mixed band. **Not touched this session** (out of the approved
> scope), and it is the natural next task. No numerals from §4.1/§4.2 may enter the fix.

**Files**: `src/app/why-web4/page.tsx`, `src/app/atp-economics/page.tsx`. `npm run build` green.

**Retest gates (Aug-14 05:00 and after):** does a reader of `/why-web4`'s status FAQ still describe
the numbers as reassurance rather than evidence? Does the `424` line now read as a scoped finding?
Does anyone read the `Sybils Lose Money` card as weaker than it should be now that the proof
language is gone, or as honest?

## Aug-13 21:00 session - the death that was ruled out by elimination, and the third one the page was naming

**No open PRs at start.** Third slot on `visitor/logs/2026-08-13.md` (#543 took HIGH 1+2 and
fenced HIGH 3; #544 took MEDIUM 7+8 and LOW 10). Took **MEDIUM 5 with its Unanswered Question 1**,
the **fourth** filing of ledger Q5 and the first arrived at by **elimination**:

> "The page just told me the only two ways a life ends are ATP hitting zero, or trust death. If she
> ended with 145 ATP, she did not die of energy death. So she died of trust death, which the site
> says is permanent and has no rebirth. How does this example exist?"

Read the caveat, quoted its karma half, still filed the death half. Third pass in a row to be read
and rejected, so the residual was never the death rule and never the figures.

### Defect 1: the fence excluded one of the two deaths the page defines

*"None of these lives ends at 0 ATP, so none of them is the energy death described above"* rules
out exactly **one** candidate on a page that names **two**. A reader taking "Two paths" as
exhaustive eliminates into the other one and hits a contradiction the caveat never addresses. The
trust-death exclusion is now on all three surfaces. **Removal of a candidate, not a ruling**: same
class of move as Aug-06's *"Died"* -> *"Ended"*. No third cause named, no figure moved.

**The reason clause is position-local, and the obvious one is false.** A draft read *"that one is
permanent, and these lives come back"*. True under the karma cards (both are rebirths), **false at
`#example`** where Life 3 ("Ended strong: 165 ATP") never comes back, and false on
`/atp-economics` where Life 4 (140) does not either. Caught in policy review, not by a visitor.
What shipped is the trust **trajectory** (0.65 -> 0.72 -> 0.85 on `/how-it-works`; stated verbally
on `/atp-economics`, so that copy says "still trusted at the end of every life here"), which is
true of every life at every render position. Endpoint-silent by construction: a direction, never a
threshold, so **Q1 is untouched in both directions**.

### Defect 2: the fence contained a sentence its own next sentence refutes

*"They are not the death this page defines, and Web4 does not define a second one"* was followed,
one sentence later in the same paragraph, by *"the standard says what stops you acting (ATP reaches
zero) and what is permanent (sustained trust collapse)"*. **Deleted as false, on all three
surfaces, not reworded.** The short variant at `#example` had been carrying it as its **only**
fence; its fence is now the long form's own sentence head, *"What else ends a life is not
settled"*, propagated verbatim so the strict-subset property holds and the karma sentence's
*"either"* still refers to something. Any future fence here must assert **no count**.

### The finding: the site was naming a third life-ending path, on this same page

Found while grounding the fix. `/how-it-works` carried *"it ends when: ATP hits 0, raw trust falls
below 0.5 and stays there, **or CI goes incoherent**"* in two aliveness surfaces, plus the same
claim implicitly in the red cell under the first (*"Any one fails"*, the three being ATP, trust and
CI). So the page named a third cause 700 lines above a caveat saying it *"declines to name one"*.

Grounding, three ways, all one direction: canon has no CI-termination rule (the only hits are
`proposals/ENTITY_RELATIONSHIP_SPEC.md` §8.2, *"Possible adversarial, **consider** termination"*, a
recommended action in a proposal, plus a WIP proposal and the archived whitepaper; nothing in
`web4-standard/`); the page's own Death section says the opposite in the sentence locked across six
surfaces (*"A lower CI raises your costs and narrows your access; it does not push you toward trust
death"*), and `/coherence-index` gives the mechanism (low CI raises cost up to 10x, making
incoherence *"economically unsustainable"*, so it acts **through** the ATP path); and four surfaces
state *"Two paths"* and only two.

**How it got there**: Aug-09 restated the aliveness **conjunction** ("ATP > 0 + Trust > 0.5 + CI
coherent") as a death rule to get clear of the Q1 endpoint, and an aliveness conjunct silently
became a life-ending condition. Aug-10 then quoted that very span while rewriting the two cells
under it and closed with *"these two were the only defect"*: the sweep greppped the rebirth claim
and never re-read the ending list it was standing on.

Deleted from all three surfaces. **Pure deletion, no replacement claim**, and the Aug-09 endpoint
wording is untouched byte for byte. This is the primer constraint being enforced (the site may not
name a third life-ending cause), not a ruling on Q5. If a ruling ever names CI as a path, restore
the disjunct on all three.

### Verified and NOT taken, with the criterion

- **LOW 9** (pip `web4-trust` vs cargo `web4-trust-core`): already shipped. The paragraph directly
  under the two code lines on `/the-standard` says *"`web4-trust-core` in Rust; the Python wheels
  are bindings over the same core"*. The visitor read past it; residual is prominence only, and
  #543 just spent a pass on a prominence fix.
- **LOW 11** (`/first-contact` "Suspended, not deleted" does not say which death): the page's
  `#what-triggers-death` box states both deaths in full, and the Aug-10 remainder sweep recorded a
  stated criterion for leaving that page's surfaces alone. Not re-litigated without new evidence.
- **MEDIUM 4** (three rebirth arithmetics): filed under Q5 as a **half-fenced sentence**, not a
  fence mismatch. `/first-contact` asserts *"everyone starts a life with 100"* and then fences only
  *"how much karma converts"*; the base-100 grant is a structural claim `/how-it-works`'s 145 -> 145
  model has no room for. Not fixed here because the Aug-09 pass narrowed that fence deliberately
  and wrote down why, and a second rebirth-fence edit in this pass would fight the first.

**Files**: `src/app/how-it-works/page.tsx`, `src/app/atp-economics/page.tsx`,
`docs/WEB4-CANON-QUESTIONS.md`. `npm run build` green.

## Aug-13 15:00 session - the hardware sentence with the word hardware taken out

**No open PRs at start.** Second slot on `visitor/logs/2026-08-13.md` (the 09:00 session took HIGH
1 + HIGH 2 as #543 and fenced HIGH 3). Took **MEDIUM 7 with its Unanswered Question 2**, and
**MEDIUM 8 + LOW 10**, which are two rows of one badge key.

### MEDIUM 7 + Unanswered Q2: the answer was on page 1 already, one clause later

`/tldr` said *"your own device is your day-zero witness for your identity"* with no qualifier, and
linked to a FAQ whose first words are *"Short answer: the chip itself does."* The visitor:
*"The reassurance is a hardware feature described without the word hardware."* Their Q2 followed
from it: *"What witnesses a software-only newcomer on day zero? The bootstrap answer given is a
manufacturer key in a security chip, which by definition that user does not have."*

This is an **entailment, not a contradiction**. Both halves already shipped and never met: the
same `/tldr` sentence continues *"from your first action onward it is the community you join that
witnesses what you do"*, which IS the software-only answer. The defect was that the reader takes
the whole sentence as the hardware story because nothing marks the branch.

Two edits, one on each side of the link:

- `/tldr`: one sentence added after the existing one. Both branches named. `carries less weight`
  is propagated from this site's own `lct-explainer` Key Duplication row, not coined.
- `/lct-explainer#first-device-bootstrap`: the chipless branch, which the FAQ had never
  enumerated. Placed directly under the short answer and two paragraphs **above** the
  NASCENT/ACTIVE paragraph, deliberately.

> **The visitor's literal suggestion points backwards, and the guard now says so.** They asked us
> to *"say the day-zero witness is the device's security chip."* Taken alone that pushes `/tldr`
> toward hardware-as-entry, which is the claim **Q8 Ruling 1 answered against**
> (`LCT-linked-context-token.md` 1.2 clause 1: weak evidence MUST NOT be excluded, only weighed as
> riskier). The irony worth keeping: **the visitor's naive reading of the line was correct against
> canon.** "You can start alone" is true. The defective surface was the explainer with no chipless
> branch, which is what actually got fixed.

**Grounding, affirmative rather than a gap.** `web4-standard/core-spec/multi-device-lct-binding.md`
2.2.4 "Software-Only Fallback" gives Security Level Low, Ubiquity **Universal**, and Recommended
Role **"Bootstrap, low-trust contexts only"**, with the Constraints line *"Cannot be sole anchor
for recovery quorum"*. Canon **names** software-only as the bootstrap-role anchor, so the software
key is the day-zero anchor in its weak form, not the absence of one.

Three things the new paragraph deliberately does not say, each one caught by the policy review:

1. Not *"nothing external corroborates it"*. Canon's software verifier returns
   `anchor_verified=True` ("Software verification is always 'verified' (it's just weak)"). What is
   absent is proof of **binding**, not corroboration. An over-pessimistic absolute is as wrong as
   an over-optimistic one.
2. **No number.** Both grounding sources carry ceiling **0.4** against this site's 0.50
   calibration, and the paragraph renders about a screen above `#software-only-survival`, fenced
   under Q1. Mechanism only.
3. The recovery-quorum clause reads *"which is why this page says, further down, ..."* and **not**
   *"the same fact"*. Canon's rule is **anchor-class**; this page's drop-your-phone line is
   **witness-count**. They come apart for a two-software-device user, who has a second witness and
   still no eligible anchor. [[borrowed-word-means-something-else-there]]: canon's *anchor* is not
   this page's *witness*.

**Sweep obligation, stated rather than left implicit.** "day-zero witness" renders on four
surfaces. `/tldr` was the only unqualified one; the other three each name the chip inside their own
clause, so none can be read as chip-free. The criterion is in the guard, with its exclusions, so
the count is re-derivable instead of a bare integer.

### MEDIUM 8 + LOW 10: the page that owns the badge key was less careful than the page that borrows it

Both rows of `/running-now#badge-key`, and both fixes make the page **shorter**. Rendered words in
the key: **63 before, 49 after (-14)**.

| Row | Was | Now | Shape |
|---|---|---|---|
| Reference | "built and runnable. **Finished code you could install and start today.** Runnable is not the same as running in production." | the same minus the middle sentence | bare **deletion** |
| Running | "deployed and operational today. Live instances actually exist and are in day-to-day use." | `/tldr`'s two sentences, verbatim | **relocation** |

MEDIUM 8: hardbound is badged Reference on that same page, which also calls it not
production-ready with hardware binding unvalidated on device. `/tldr` was more careful **by
subtraction**: its row never had the "Finished code" sentence. So the fix is to delete, not to
caveat, and nothing replaced it.

LOW 10 is the **third** sitting on the Running row, and the third different fix:

| Pass | Shipped | Filed again because |
|---|---|---|
| Jul-30 (#496) | ownership (whose machines) | "the badge definition is stronger than the fact under it" |
| Aug-04 | the scope, as a paragraph under the rows | it read as body text: third of three same-weight gray paragraphs |
| Aug-13 | the scope, **inside the row** | pending Aug-14 retest |

The tell that it is placement and not wording: the Aug-13 visitor credited the caveat to `/tldr`
and to the hestia entry three sections down, **never to the paragraph sitting immediately under the
rows**. What stayed in that paragraph is only what a row cannot carry (which piece is badged
Running, plus the link down); it is now routing, not statement. Both rows are byte-identical to
`/tldr`'s, so that page's declared strict-subset relation holds in outcome.

> **A subset invariant can be satisfied from the wrong side.** `/tldr`'s guard says canonical
> statements land on `/running-now` first. Here the reconciliation ran the other way, by deleting
> from the canonical page, because on these two rows the derivative was the careful one. That is
> allowed for a deletion or a relocation and not for a new claim, and the guard now records the
> distinction rather than reading as violated.

### Guard hygiene done in the same pass

- `/tldr`'s Aug-04 guard claimed the scope was *"cut to a parenthetical"*. The row is two full
  sentences. **Stale before this session touched it**; corrected and attributed to Aug-04, not to
  this edit.
- `/running-now`'s Aug-04 guard narrated the paragraph as the read-point fix. Item C moves that
  clause into the row, so the narration was inverted. Rewritten; its three prohibitions (no fourth
  tier, no hedge on tier ORDER, no "no outside users" absolute) survive verbatim and now bind the
  row.

### Verified but NOT taken (next session, do not re-derive)

- **LOW 9 / Unanswered Q6** is answered and cheap: `../web4/web4-core/web4-trust-core/` holds
  **both** manifests. `Cargo.toml` name = `web4-trust-core`, `pyproject.toml` name = `web4-trust`.
  One library, two language-native names. `/the-standard` needs one clause saying so.
- **Unanswered Q3** ("if I start on hestia, does my software-only history transfer when I upgrade
  to hardware?") is the one the visitor called *"the single most practical question I had."*
  Researching A2 did **not** surface an answer in canon, so it is an escalation rather than a fix.
  Not filed this session because it was out of the approved scope; file it before treating it.
- HIGH 3 stays fenced under Q1. MEDIUM 4/5/6 stay fenced under Q5.

**Retest gates (Aug-14 05:00):** does a reader of `/tldr` page 1 still take the day-zero witness as
hardware-free, or as hardware-only? Does the Running row still read as an unscoped adoption claim?

## Aug-13 09:00 session - the promise on page 1 and the reckoning on page 9

**No open PRs at start.** First slot on the fresh `visitor/logs/2026-08-13.md`. Took **HIGH 1 and
HIGH 2**; **HIGH 3 is fenced** and was recorded, not fixed.

The visitor diagnosed this session better than the friction table did, so their sentence is the
thesis: *"The fix is not more honesty. The honesty is already written. It is in the wrong place."*
They described the site as having **two voices**: a recruiting voice on the reading path (2
Minutes, First Contact, the Onramp, Hestia) and a reckoning voice on the pages off it (Karma &
Consequences, What Could Go Wrong, the LCT device-loss section), which *"do not agree about what
it is like to use it."* Both voices are accurate. Only their ordering is wrong.

### HIGH 1 was already shipped. The residual was WEIGHT, and it is the third treatment.

The visitor said `/hestia` *"says the cap. It does not say what the cap costs me"* and attributed
the other two consequences to other pages. All three already ship on `/hestia`, verbatim and
policy-reviewed, and the visitor **quoted the two sentences immediately before them**.

Cause: lines 298-376 were a **single `<p className="text-sm text-gray-500">`**. The version note,
the tier disclosure and all three costs were one footnote-weight block whose only visual emphasis
in ~15 lines was `<strong>0.50</strong>`. A scanner took the number and left.

So this one item has now been treated three times, each pass changing a different thing:

| Pass | Shipped | Visitor still filed it because |
|---|---|---|
| Jul-30 | **routing** (links out to the costs) | *"hands me a pointer instead of the number, at the exact moment I am deciding whether to install"* |
| Aug-11 | **the statement** (costs on-page) | it landed at footnote weight inside a version note |
| Aug-13 | **the weight** (own paragraph, readable) | pending Aug-14 retest |

**Not one sentence was rewritten or added.** The "One honest caveat" antecedent moved down with
the costs rather than staying with the version note, because it is what names the tier that
"anchoring in software alone" refers back to.

> **Rule.** Routing, stating and weighting are three different fixes. A visitor re-filing an item
> you already shipped is not necessarily wrong about the page; check which of the three you
> actually did. If the only bolded thing in a gray block is a number, the number is all that gets
> read.

### HIGH 2: the Aug-08 sweep's own lesson, recurring in the Aug-08 sweep's own claim class

`/tldr`'s "The Result" asserted *"Reputation is portable and cannot be reset by deleting an
account or switching platforms"* with no qualifier, on **page 1** of the five-page path. The
visitor: *"I filed that as a headline promise. Six pages later I learned it is not true for the
tier I would actually be using."*

This is a missed member of the class the Aug-08 sweep discharged. It survived because it states
the claim **by synonym**: "reset by deleting an account" never says "fresh start" or
"hardware-bound", so every phrase-grep walked past it. Four surfaces were still unscoped, all of
them **ahead of** or **above** the pages carrying the qualifier:

- `/tldr` "The Result" (page 1) and `/why-web4` design-goal 3 (page 2). Goal **2 in the same
  list on the same page** was corrected Aug-07; the pass fixed one sibling and left the next,
  even though this one carries the **literal** phrase "no more fresh starts".
- `/learn`'s teaser cards for `/lct-explainer` and `/karma-consequences`, both contradicting
  destinations that had already been fixed.

### The finding worth keeping: `/learn`'s teasers are invisible to page-level sweeps by construction

`/learn`'s `LEARNING_PATH` teasers are data literals that summarize **other pages'** claims. Every
sweep this project runs is page-scoped, so every page fix since Aug-05 has corrected a page and
left its teaser. `/learn` also owns the reading path, so those teasers are read *first*. Filed in
`docs/WEB4-CANON-QUESTIONS.md` as a class with a reproducible predicate; **deliberately not swept
this session** on proportionality.

Two reusable tests came out of it, both in the ledger:

> **Two valences, one phrase.** *"start(ing) over from zero"* means "you cannot escape
> consequences" (true at the **hardware** tiers, this is the claim) or "device loss destroys you"
> (true at the **software** tier, already correct everywhere). The grep returns 9 hits of which 7
> are already right, which is how two sweeps read the noise as handled. **Discriminate by
> grammatical subject**: a bad actor *abandoning* vs an honest user who *lost*.

> **Falsification test for a replacement.** It must be **false of no software-only user**. The
> policy reviewer caught a draft teaser of mine, *"earning trust is what takes a device"*, which
> read **stricter** than the sentence it was propagating. Keep the ceiling / high-trust-roles
> qualifier; import no number.

### HIGH 3: fenced, recorded, not fixed

The ask (state that a software-only identity *"lives permanently at the threshold with no margin
it can ever build"*) is an assertion about a reader at exactly 0.50, which **Q1 fences in either
direction**. The **Aug-10** visitor filed the same composition three days earlier. Logged as
evidence that Q1's cost is now visitor-visible, which strengthens the escalation; it does not
license the claim. No ceiling number, no survival line and no at-0.50 claim entered any file.

**Retest gates (Aug-14 05:00):** does the `/hestia` cost paragraph get read now that it has its
own weight? Does a reader reaching "The Result" on `/tldr` still take portability as unconditional?

## Aug-13 03:00 session - three chips that never said which moment they belonged to

**No open PRs.** Fired 03:01, before the 05:00 cron, so `visitor/logs/2026-08-12.md` is still the
freshest log and this is the **fourth** slot on it (#539 the four HIGHs, #540 MEDIUM 6+8, #541
MEDIUM 5). Took the pair both prior sessions signed off by naming: **MEDIUM 7 + MEDIUM 10**, the
two `112` surfaces. Plus **LOW 13** and the `/tldr` half of the badge-ordering parse, because the
policy review turned up that they are one class with the other two.

### The class: compressed summary widgets that dropped the label, not the fact

Every item here is a badge rail, chip row, or card grid that squeezes a page down to tokens. None
of them state a wrong fact. All four state a **true token with the label stripped off**, and in
each case the label is already published elsewhere on the same page or the canonical one.

### Finding 1 (MEDIUM 10): the base was added in August and the row still did not read

Aug-09 fixed this rail by ADDING `112 total` beside `ATP=0` and `+12 bonus`, because the row had
shown only the delta. Correct fix, and the Aug-12 visitor still could not read it: *"ATP equals
zero and also 112? I stared at that for a while ... nothing next to it says which."*

The residual is not the missing base. **Act 5 is the only card on the rail that compresses two
events** (death, then rebirth), and it was the only card whose chips did not say so. Three
quantities, no moment marker, so they landed as simultaneous. Chips now carry the moment:
`dies at ATP 0` / `+12 bonus -> 112` / `reborn at 0.54`. `+12 bonus` survives **as a named chip**
under the standing guard: the "Suspended, not deleted" paragraph below the grid refers back to it
by name.

> **Rule.** Adding the missing quantity to a compressed rail does not make it readable. If a card
> compresses more moments than its siblings, the chips have to say which moment each belongs to,
> or a correct set of numbers still parses as a contradiction.

Second half of the same row: Acts 1-4 each end on a trust chip (0.50 / 0.56 / 0.48 / 0.62) and
Act 5 had none, *"in the act about death and rebirth"*. **0.54 is not a new figure**: it is
`simulationSnapshots` tick 14 `trust_after`, already rendered in the `<noscript>` step 7 and the
walkthrough recap. It carries **no arrow**, and that is the one thing not to "fix": Acts 2-4 arrow
against the previous act, and Alice ends Act 4 at 0.62, so an up arrow would be false and a down
arrow would read as rebirth costing her trust. It is a restart value, exactly like Act 1's bare
`0.50`, and that parallel is the card's own moral.

### Finding 2 (MEDIUM 7): the guard said do not add a figure, and it meant it

`/how-it-works`'s `About that 112:` callout named a number **no static text on that page prints**
(verified: every other `112` in the file is inside a JSX comment). It only exists ~30 seconds into
an auto-playing demo. Visitor: *"I was reading a disclaimer about a number that did not exist."*

I proposed glossing 100 + 12 into the callout. **The policy reviewer refused it and was right.**
`how-it-works` carries `"Do not add a figure here; 112 is already on screen in the demo."`, written
by the Aug-12 15:00 pass that explicitly declined this MEDIUM. I had read that as scoping only that
pass. It is an imperative with its own rationale, in the same shape as every other standing
prohibition in the file, and the visitor offered **two** fixes: print the balance, **or** reword so
the heading does not name a number the reader may never have seen. The guard forbids the first and
leaves the second free.

Shipped: **four words**, `About that 112 in the demo above:`. No figure added, on the page the same
browse called a 30-to-40 minute read sold as 10. The literal string `About that 112` is preserved
because the `#karma-carries` guard cites this callout by it.

> **Rule.** A guard's scoping sentence and its imperative are separate. *"This pass does not treat
> X"* dates; *"do not do Y, because Z"* does not. If you want the imperative reversed, rewrite its
> rationale to record the reversal; do not reinterpret it into permission.

### Finding 3 (LOW 13): my enumeration was wrong, and the corrected one is 2 vs 1

*"The core standard card is badged just Reference here. On /running-now the same piece is badged
Spec + Reference."* I proposed the fix having counted **1 surface vs 4**. Two of my four do not
badge the core standard at all: `onramp:57` badges the eyebrow *"How the pieces compose"* and the
landing page's badge is on the card *"Where this actually stands"*. The real class is
**`/tldr` + `/the-standard` bare `Reference` vs `/running-now`'s `Spec + Reference`**, which is
close to what the visitor actually described. `[[claim-class-grep-truncated-enumerate-remainder]]`,
sixth occurrence, and this time the grep was not truncated, it was **mis-attributed**: every hit was
real and two were badging something else.

The defect: `/tldr`'s gloss defines two tiers, ranks them, and never says a piece can carry **more
than one**, so a card showing one tier reads as the whole claim. One clause added, tier wording
verbatim from the canonical legend.

**Not fixed by matching the chips**, which is the visitor's own first option and looks cheaper. A
`Spec` chip on `/tldr` would be an **undefined tier on the page whose missing tier key was filed
three separate times** (Jul-24 LOW, Jul-27 LOW, Jul-28 MEDIUM). The gloss box exists because of
those three. Matching would re-open three items to close one.

Sweep criterion for what was **left**: the clause is owed where a reader **compares** pieces, and
only the two card grids do that. `/the-standard` badges one piece on its own page with nothing to
be inconsistent with `[[adding-a-distinction-creates-a-sweep-obligation]]`.

One clause is deliberately **not** a subset of the canonical legend and cannot be: *"these cards
show only the furthest it has reached"* describes `/tldr`'s own grid, which `/running-now` does not
own. Recorded at both guards, with the falsifier named (if a card here ever renders a non-furthest
tier, or `MaturityBadges` replaces `MaturityBadge` on one, the clause moves with it).

### Finding 4 (visitor journal): the copy that had drifted was the one they read

*"'They run in that order.' I read 'they run' as the pieces running, not the badges ordering. Took
two passes."* On a site where **Running** is a badge name, "they" was doing too much work.
`/running-now#badge-key` **already reads "The three run in that order"** and needed no change; the
`/tldr` copy was the one that had drifted off its own declared source. Mirrored, not re-authored
`[[propagate-the-sentence-not-your-summary]]`. `/running-now` untouched.

### Not taken

MEDIUM 9 (`/how-it-works` timed at 10 minutes, really 30-40) and LOWs 11, 12, 14, 15. MEDIUM 9 is
a restructure, not a label fix, and it **fights Finding 2**, which is why Finding 2 came in at four
words. LOW 14 (badge theory precedes the first badge) is fenced: three prior guards call it not a
design pass, and Findings 3 and 4 both edit the exact block it complains about and make it longer.
That is deliberate and recorded there: a badge contradicting the maturity ledger is a correctness
defect and outranks a density LOW. **The added clause is load-bearing; a density pass must not trim
it back out.**

### Take this next

1. **Triage the Aug-13 05:00 log first.** This session ran two hours before it.
2. If Aug-12 is still the freshest table, what is left on it is **MEDIUM 9 and four LOWs**, and
   MEDIUM 9 is the only one with real signal behind it (the visitor's Honest Assessment is a
   stamina argument, not a correctness one, and it names `/how-it-works`, `/why-web4`'s FAQ, and
   `/learn`'s doubled list as one pattern). That is a scoping question, not a fix.
3. Still owed from #538: `/hardbound` has **zero `id` attributes** including an install section,
   and carries an unresolved Jul-31 HIGH about having no repo link. Do the HIGH first.

## Aug-12 21:00 session - the ramp that was measuring the other tensor (twice, on one page)

**No open PRs.** Third slot on `visitor/logs/2026-08-12.md` (#539 took the four HIGHs, #540 took
MEDIUM 6+8). This took **MEDIUM 5**, the first MEDIUM in the visitor's own ordering, plus the
un-filed instance of the same defect the reviewer found 1150 lines below it on the same page.

### Finding 1 (visitor MEDIUM 5): the bullet imported the ramp's axis labels and called them trust

`/lct-explainer`'s ceiling bullet said *"The **quality ramp** rewards a **0.85-trust** account roughly
**7x more** per quality action than a **0.30-trust** account."* The ramp on `/atp-economics` keys on
the **quality of the work (V3)**: its bars are labelled *Quality 30% / 50% / 70% / 85%* and the 7x is
derived there at 85% vs 35% quality at the same spend. The bullet took the ramp's two endpoint labels
and relabelled them **trust**.

It landed on the worst possible page for it. **0.85 is this page's Secure Enclave ceiling** (rendered
`max 0.85`, graded *"0.85 is strong"*) a few hundred lines above, so a reader holding 0.85 as a chip
class met *"a 0.85-trust account"*. Visitor: *"After the site spent real effort teaching me those are
different things, that hurt."*

The page **already shipped the correct sentence**: *"low-trust actions cost more ATP and earn less
back"*, in the ten-phones sybil FAQ. Propagated verbatim rather than re-authored
`[[page-ships-the-answer-and-denies-it]]` + `[[propagate-the-sentence-not-your-summary]]`. Canon backs
the cost half outright, `mcp-protocol.md` section 9.1:
`trust_modifier = 1.0 - (context.t3_in_role.average() * 0.2)  # Higher trust = lower cost`.

**No numeral replaces the deleted one.** Section 9.1's formula is bounded to `[0.8, 1.0]`, section 9.2
is marked *informative* and calls the modifier society-configurable, and the site's one published
numeral for it is an open item (below). A deletion needed no replacement figure.

### Finding 2 (un-filed, same class, same page): the 1.4x surcharge read off the wrong tensor

The LCT setup walkthrough put *"Your trust starts at the default newcomer level"* immediately before
*"Actions cost 1.4x until you prove yourself"*, and then *"Your trust has already started building.
The 1.4x premium is slightly lower."* **1.4x is not a trust effect.** `/coherence-index` owns and
derives it (*"with CI 0.85, actions cost about 1.4x their base price (1/0.85^2 ~ 1.38)"*), and trust
cannot produce it at any value, because section 9.1's bound means trust moves you between base and a
discount, never above base.

The two findings could have fought (`[[two-fixes-in-one-pass-can-fight]]`): Finding 1 propagates
"low trust costs more" onto the same page. The reconciliation is in both guards and it is not a
hedge, it is the baseline: **low trust costs more than a high-trust actor; low CI costs more than
base price.** Different levers, different baselines. No T3 numeral was published to make the point
(the standing 0.5-endpoint escalation forbids picking one, and *"low but nonzero"* stays numeral-free).

> **Rule.** Two economic multipliers on one page are only "the same claim" if they share a baseline.
> Check what each is measured *against* before reconciling or before letting one refute the other.

### The sweep, and what was deliberately left

Naming the axis makes every prior loose use falsifiable `[[adding-a-distinction-creates-a-sweep-obligation]]`.
Criterion: **an instance is in scope only if it NAMES TRUST as the cause.**

| surface | disposition |
|---|---|
| `/lct-explainer` minute 2:00 + minute 5:00 | **fixed**, names CI, deep-links `#why-ci-starts-low` |
| `/why-web4` *"1.4x newcomer premium"* bullet | **fixed** (one clause). Names no cause itself, but both siblings in its list are trust-keyed and the nearest CI mention is ~35 lines up |
| `LCTSetupMockup`'s *"Newcomer rate: 1.4x"* chip | **left**: states the surcharge, names no cause, and renders *above* the paragraph that introduces CI |
| `/how-it-works` x2, `/day-in-web4`'s *"40% more than veterans pay"* | **left**: already CI-keyed |

**A guard whose named target had been retired.** `#why-ci-starts-low` carried *"A future post-#266
session can wire up a deep-link from Karma Journey to #why-ci-starts-low."* `/karma-journey` was
retired in the Jul-15 rebuild, so that link was never coming `[[guard-comment-names-the-un-swept-page]]`.
The anchor's only named inbound demand pointed at a dead route while the live surface reproducing its
exact friction sat on `/lct-explainer` with the wrong axis. Guard now records this. The item is closed
**by the retirement of its source**, not by the new links; it is not marked delivered.

### Filed, not fixed: the 30% trust discount (do not "correct" it to 20% without reading this)

I proposed correcting `/atp-economics`'s *"up to a **30% discount** to entities with trust near 1.0"*
to canon's 20% endpoint, on the theory that both it and its paired *"50% premium"* were transcribed
off `mcp-protocol.md` section 9.2's `high_trust_discount: 0.8` / `peak_demand_surge: 1.5`. **The
policy reviewer refuted it and was right.** `../web4/archive/reference-implementations/trust_auction_mechanisms.py`
(header *"Session 32, Track 8"*) line 230:

```python
trust_discount = 1.0 - 0.3 * trust_score   # up to 30% discount for trust=1
demand_factor  = 1.0 + 0.5 * max(0, demand_ratio - 1.0)  # surge pricing
```

Both numerals come from that one function, and the 4-life commit that introduced the card cites it.
The 50%-matching-canon is **evidence against** the transcription theory, not for it. The real question
is different and unresolved: the site asserts a numeral from an **archived** artifact against a live
canon section that names a different endpoint `[[precise-number-may-cite-archived-artifact]]`.

Sweep set for whoever takes it, all four parts:
1. `/atp-economics` "Trust Earns Better Terms" card (the 30%).
2. `InteractiveWireframes.tsx` -> *"high-trust discount applied (30% off)"*, a **data-object literal**
   rendering on `/day-in-web4`, invisible to a JSX-attribute grep (the #538 class).
3. The attribution line *"session 32, 84 checks"*: the named artifact is archived and reports **22/22**
   when run today.
4. Framing: section 9.2 is *informative* and calls the modifier society-configurable, so a flat "20%"
   would be a **new over-assertion**. Deletion is the likelier correct shape than substitution.

Also filed: the card sits inside a collapsed `<details>` (`#at-scale`) with no id of its own, so it
cannot be deep-linked as-is. That is why Finding 1 routes nowhere near it.

### Not taken

Three MEDIUMs (`About that 112:` naming a number no static text prints, the `/how-it-works` reading-time
estimate, `/first-contact`'s Act 5 rail) and all five LOWs. The `112` pair is still the natural next
pick and is still one edit smaller than it was.

## Aug-12 15:00 session - the price that was three prices in three units, and a caveat read twice

**No open PRs.** Same log as #539 (`visitor/logs/2026-08-12.md`, 05:00; second slot on it). All four
HIGHs were disposed there, so this session took the MEDIUM row: two filed items plus one un-filed
defect of the class the visitor named in the Honest Assessment.

### Finding 1 (visitor MEDIUM): the visitor's count of three was the symptom, not the defect

*"Spam costs 10 ATP on one page (three times) and 5 in the simulator on the other. Pick one and
sweep."* Sweeping to 5 was the wrong fix, and the policy reviewer and I each had to be talked out of
it in turn. The three surfaces are **not one claim**:

| surface | action | correct price | anchor |
|---|---|---|---|
| `how-it-works` "Spam message" card | one **message** | **5** | `spec.json` `atp.spam_cost`; ladder row *"Send spam message"* |
| `how-it-works` "Send 20 spam messages" | 20 **messages** | **-100** | 20 x 5 = the page's own 100 ATP birth grant |
| `how-it-works` "Death Spiral" card | one **post** | **10, unchanged** | ladder row *"Low-quality post (your own)"*; this page publishes 10-20 for a post three times |

The first two were defects and are fixed. The third was **correct and mislabelled**: it says *"per
post"* and the page prices posts at 10-20 in three places, so pricing it 5 would have contradicted
three same-page surfaces to satisfy the visitor's tally. It got the word *"low-quality"* and no new
numeral. The reviewer's proposed discriminator (its *"Earn 0 back"* matches the ladder's `spam`
reward of 0, not `lowQuality`'s 5) does not survive `atp-economics:1826`: the reward is a function of
**confirmation**, and the card stipulates none one line above the payout. The **cost** side is the
discriminator, and it is the unit.

> **Rule.** When a visitor counts N instances of a number, the count is evidence of a **missing
> label**, not proof of N contradictions. Check the unit on each before sweeping: the fix for a unit
> conflation is naming the unit. `[[visitor-suggestion-may-point-backwards]]`, in tally form.

Four units now live on the site and each names its own anchor in the guard: message 5, post 10-20,
batch 25 (`risky_spend`), campaign -40/-35 (`karma-consequences`, deliberately left). Guard landed in
**two** places, at the corrected row and at the row that stays, 800 lines apart, because the second
is where the next sweeper will arrive. Not fixed and filed: `spec.json` says `spam_reward: 1` while
both the card and the widget show **0**.

### Finding 2 (un-filed, same class): a subsample cannot skip ticks under a caption that states a delta

`LifecycleDemo` captions its spam stage *"costs 25 energy"* while the readout moved **18**, and
`/first-contact` states that step's trust drop as **-0.08** while the readout moved **0.04**. Every
value was a faithful sample of Alice's ledger; the stage before it sampled tick **1** where the stage
after sampled tick **4**, and the two skipped ticks (-5 mentoring, +12 confirmations) were the
difference. Re-sampled to tick 3 (99 / 0.56, both verbatim from that array), so 99 - 25 = 74 and
0.56 - 0.08 = 0.48 are now true on screen. **No figure invented, no price moved.** The caption covers
the whole span it compresses and names no per-post earn-back, because attributing +12 to one post
would contradict the recharge cap on the very page it renders on.

> **Rule.** A stage caption may name a per-step delta ONLY if the preceding stage samples the
> immediately preceding tick. Otherwise **re-sample, do not re-price**.

### Finding 3 (visitor MEDIUM): the guard that made the duplication deliberate

`EndOfLifeCaveat` rendered twice, ~150 words each, two screens apart, and said *"to justify the
figures **below**"* in a position where its figures are above. The fix looked like a clean deletion
until the reviewer found `how-it-works:33`: *"Rendered at BOTH places the visitor hit the numbers,
from one component so they cannot drift."* The duplication was the Jul-27 fix, not an accident.

So the anti-drift property is kept a different way: `#example` now renders **`EndOfLifeCaveatShort`,
defined five lines below the long one in the same file** under the same guard. Sentences 1-2 are
propagated **verbatim** (including *"and Web4 does not define a second one"*, which is what keeps
that position fenced once the elaborations are dropped); the karma clause enumerates **zero**
branches rather than truncating three. Q5 untouched: three branches here, three in `EndOfLifeCaveat`,
four on `/atp-economics`. `SectionTOC` offers a direct jump to `#example`, which is why that position
needed its own text rather than a bare "see above".

Two guards this change falsified, both discharged rather than left: `atp-economics:1693`'s *"if you
reword those there, reword them here"* now records the directional word as position-local and exempt
(that copy already said *"the figures above"*); and the `About that 112:` guard's *"the karma
examples have no id"* is struck, its prose pointer promoted to a link, and its **other** clause left
standing because it is still true.

### Not taken

Four MEDIUMs (`/lct-explainer`'s V3 ramp attached to T3 values, the `About that 112:` heading naming
a number the reader may never have seen, the `/how-it-works` reading-time estimate, `/first-contact`'s
Act 5 rail) and all five LOWs. The `112` heading is the natural next pick and is now one edit smaller:
its callout's blocker guard is already updated.

## Aug-12 09:00 session - the reassurance, the map that refuted itself, and a ceiling I got backwards

Fresh log `visitor/logs/2026-08-12.md` (05:00), the first slot on it. Four HIGHs.
**PR #538 was blocked and was fixed first**, before any scope was proposed.

### #538: a conditional refusal restated as an unconditional one

`/hub` said `hub init` "and the commands around it will not run until [HUB_PASSPHRASE] is set."
`require_passphrase` (`web4/hub/hub-daemon/src/main.rs:1877`) reads the env var, else **prompts at
a TTY**, and only bails at `:1891` when it is both unset and there is no terminal. The bail text
carries its own condition. Every reader that paragraph addresses is at a shell, so they meet a
**prompt** where the page promised a **wall**. The claim had been grounded in `QUICKSTART.md`'s
Step 0 *heading*, dropping the qualifier four lines below it.

> **Rule.** When a claim is about what a **command** does, the doc is the narration. Ground it in
> the code path that decides it. A conditional refusal restated as unconditional reads *stricter*
> than reality, and that is the direction that erodes a page whose value is that it is runnable.

### Finding 1 (visitor HIGH 1): the map page refuted itself, and nothing greppable joined the halves

`/how-it-works` asserted a bare **"No moderators needed"** four times, then made **Moderator** one
of three Authority roles, hinged its plagiarism walkthrough on one, and priced a biased one's trust
drop. The visitor: *"the single clearest self-contradiction I found and it is in the page that is
meant to be the map."*

The distinction was **not** missing and **not** coined here. Four of five denials already sat in
explicit spam contexts, and the governance section already opened on *"energy economics handle most
bad actors ... but what about edge cases."* What was missing was the **JOIN**: every denial said
*moderators*, and every human-judgment passage avoided the word, so nothing a reader could grep
connected them.

> **Rule.** When two halves of a page contradict, check whether they share any **vocabulary** before
> concluding one half is absent. A reconciliation that never says the other half's word is not
> reachable by the reader who noticed the collision.

Human-judgment sentence borrowed **verbatim** from `why-web4:166-168` rather than re-authored
([[propagate-the-sentence-not-your-summary]]). Sweep criterion recorded, because the sweep is
deliberately partial: **statements scoped to detection stay** ("caught by math, not moderators",
"flagged - not by a moderator") because they are true; statements asserting moderators are not
needed **at all** got scoped. Left standing on that criterion: `why-web4:2641`,
`coherence-index/layout.tsx:10`, `coherence-index/page.tsx:377` (scenario-scoped),
`atp-economics:502` (a Web2 critique), `lct-explainer:901` (a role example).

### Finding 2 (visitor HIGH 2): I had the fix direction exactly backwards, and the policy reviewer caught it

Three incompatible ceiling statements on `/lct-explainer`. I proposed correcting the worked examples
**down** to the device-count schedule (lone TPM laptop 0.75 -> 0.50), reasoning that `calculateTrust`
at `:154` is data-owned and drives a slider the reader can operate.

Wrong twice over:

1. **`calculateTrust` is a mirror, not an owner.** Its own `// SYNC:` comment says its values must
   match *the prose*. A value defined as downstream of the prose cannot adjudicate the prose.
2. **Upstream forbids the collapse.** `multi-device-lct-binding.md:875-878` and the impl at
   `:629-637`: single software 0.40, single phone SE **0.75**, single TPM2 **0.75**, single FIDO2
   0.80. Canon does not drop a lone hardware device onto the software floor. Six site surfaces
   already say 0.75. I would have shipped a fresh contradiction with `:2411` on the same page.

> **Rule.** Before letting a **widget** settle a numbers dispute, read its own sync comment. An
> illustration that is *declared* downstream of the prose is evidence of what the prose once said,
> not an arbiter of what it should say. Check upstream owns the axis before ruling on it.

Second reviewer pass also killed my proposed recalibration `[0.75, 0.90, 0.90]`: it would set
device-count-2 to 0.90 and thereby falsify `:654-655` (*"the same laptop plus **two more** device
witnesses -> the full 0.90"*), the exact worked example the settled direction had just validated.
And canon's numerals are not importable: its SE row sits under a **0.95** anchor weight where this
site's SE tier is **0.85**, so the same numeral is a different fraction of a different ceiling
([[borrowed-word-means-something-else-there]], applied to a number).

**Shipped: two deletions only**, both false under every reading, neither a calibration call.
`lct-explainer:648-649` lost *"the same 50-75% as just above"* (a device-count schedule equated with
a chip-class range: two different axes). `why-web4:3055` lost *"a single phone with a TPM chip gives
you a ceiling of 0.90"* **and** its *"raises that ceiling slightly"* clause, which was false with the
0.90 and stays false without it. **No replacement numeral**: that page carries none of the machinery
that derives one, so a bare 0.75 would be an unexplained third number. Routed to
`/lct-explainer#trust-ceilings` instead.

### FILED, not fixed: the device-count axis vs the chip-class axis

`:619`'s **"1 device: 50%"** is the outlier and the only surface collapsing a lone hardware device
onto the software floor. Surfaces for whoever takes it: `lct-explainer:619`, the `// SYNC:` comment
at `:147-152`, `calculateTrust` at `:154`, the band labels at `:1054`, and **`glossary/page.tsx:363`**
(the identical schedule, which is why deleting `:619` alone would have been another partial sweep).
Constraints on any future fix: canon constrains the **structure**, not the values; and
**device-count-2 must stay strictly below 0.90** or `:654-655` breaks. The full enumeration is in
the guard at the `:648` paragraph.

### Finding 3 (visitor HIGH 3): a claim about a starting position, shipping as a standing guarantee

*"so a newcomer is not in danger"* was one sentence propagated to `lct-explainer:291` and
`trust-tensor:420`. A Jul-31 pass conditioned its **headroom** half on a hardware anchor but left the
reassurance unconditional in the other direction. The visitor broke it in five minutes with numbers
this site publishes: start 0.50 in all three dimensions, Talent no decay, Training 180d, Temperament
30d, decay toward zero, composite 0.4/0.3/0.3.

Deleted from both copies, byte-identically, and replaced with a claim that is true plus a route:
*"Where you start is not a promise about where you stay:"* -> `#decay-and-survival`.

**The arithmetic is printed nowhere.** I proposed running it at `#decay-and-survival` and the policy
reviewer blocked that on the guard's own prohibition 2 (*"NOT the worked composite reprinted"*),
establishing that it is **independently load-bearing** and not a subordinate clause of the death
rationale: the guard says "all six load-bearing" over five bullets, and the count only reaches six
if that bullet splits.

> **Rule.** A restriction/death split can be real and still not reach. Asserting an idle newcomer
> **is** restricted asserts that no dormancy carve-out applies, which is the **mirror image** of
> inventing one. Neither direction is written down (`WEB4-CANON-QUESTIONS` Q14: canon has no
> entity-level "score below threshold" path at all). The honest move was to stop reassuring, not
> to reassure more precisely.

### Determination, no code (visitor HIGH 4): already shipped, both sides

Cold-start *"three founders"* vs *"coalitions unprofitable at 2-3 members"*. The reconciliation ships
at `what-could-go-wrong:466-480` and `atp-economics:1111-1122`, reciprocally linked, landed for a
Jul-31 item, and both correctly **decline** the discriminator under ledger Q3. The visitor's *"it is
not on either page"* is factually wrong; their literal ask is the fenced sentence. Not folded. No
second treatment without a fresher log recurring.

### Not taken this session

All six MEDIUMs and five LOWs, including the two the visitor themselves called tidying: spam priced
**10 ATP** on `/how-it-works` (three places) and **5** in the `/atp-economics` simulator; the
*"About that 112:"* callout naming a number no static text on the page prints; the ~150-word *"About
these numbers:"* paragraph appearing **twice verbatim**, whose second copy says *"the figures below"*
when its figures are above. That last one is a clean deletion and is the obvious next pick.

## Aug-12 03:00 session - the install section nobody could link to

**No open PRs.** Session fired at 03:01, **before** the 05:00 visitor cron, so there was no
fresh log; the Aug-11 table was already fully disposed by #535/#536/#537 and its three
remaining items are blocked (Q6 under ledger Q8), a density call (Q5), or recurrence-only.
That left exactly one unblocked item: the standing `/hestia` anchor pass. Working it turned
up a **still-open visitor LOW from eleven days earlier** that had never been attempted.

### The finding: the literal fix was unattemptable, so nobody attempted it

`visitor/logs/2026-07-31.md:120`, LOW:

> `/onramp` instructs `hestia init`, `hub init`, `hestia connect-hub` under a banner promising
> runnable software, **with no install link anywhere on the page**. Fix: *link each command to
> its piece's install section.*

`grep 'install' src/app/onramp/page.tsx` returned **zero** hits, so it had not shipped. The
reason it had not: **two of the three destinations did not exist.** `/hestia`'s "How to touch
it" section had no `id`, and `/hub` had no install section at all. A session picking this LOW
off the table would have found nothing to link to and put it back.

> **Rule.** When a visitor's literal fix is a *link*, check the destination exists before
> classifying the item. An unshipped fix with a missing target is not a deferred item, it is a
> **two-part** item whose first part nobody wrote down. This one sat eleven days.

### The narrative I proposed was false, and the truth was better

I proposed this as a discipline gap: the site made every piece's **caveat** routable
(`#honest-status` on both `/hestia` and `/hub`, with a guard on the hub one literally saying
*"so the maturity ladder on /onramp can land a reader on the caveat rather than the top of the
page"*) and never did the same for the **install** half. Policy review falsified it:

| piece | caveat anchor | install anchor |
|---|---|---|
| `/the-standard` | none | **`#thirty-seconds`** |
| `/hestia` | `#honest-status` | none (now `#how-to-touch-it`) |
| `/hub` | `#honest-status` | section did not exist (now `#how-to-touch-it`) |
| `/hardbound` | none | none, and it **has** an install section |

`/the-standard` is the exact inverse. The real pattern is **demand-driven**: every anchor on
this site carries a guard naming the inbound link that asked for it. That is healthy. Had I
shipped the asymmetry guard, I would have written a claim false on two of four pieces.

### Four of six re-point candidates failed my own criterion

My criterion was *the link's own rendered text promises an action*. Applying it honestly killed
`lct-explainer:888` (two parallel definitional clauses, and the sibling `/the-standard` clause
links bare), `glossary:748` (rendered text is "Learn more", and the adjacent "Code →" already
serves the action), `manifest:175` (link text is the `h3` "Hestia"; the promise is in a sibling
`<p>`), and `lct-explainer:2892` (its `/the-standard` grid sibling points bare despite
`#thirty-seconds` existing). Deep-linking those would have been the criterion applied to the
*paragraph* rather than to the *link*.

The href count was also wrong: **24** rendered `/hestia` hrefs in `src/app` (20 bare, 4
anchored) plus 5 registry-driven pills, not the 18 this file has carried. The two I missed were
data-object literals (`learn/page.tsx` `link:` and `page.tsx` `href:`), not JSX attributes.
`learn:242`'s teaser is the **same sentence** as `manifest:175`; I named one twin and missed
the other. `[[claim-class-grep-truncated-enumerate-remainder]]`, fifth occurrence.

### Why `/hub` got two sentences and not a section

Authoring a `/hub` install block mirroring `#thirty-seconds` was rejected, for three checkable
reasons: the `hub up` deploy kit is **already** named in the maturity section; leading with
`--profile public-managed --domain ...` reads against that section's *"supervised pilot, not a
fielded production product"* and `/running-now`'s *"No production deployment yet"*; and a block
saying "one command: `hub up`" that omitted `HUB_PASSPHRASE` would **reproduce the Jul-28
/hestia HIGH on the other piece** (upstream Step 0: `hub init` and its siblings refuse to write
a plaintext private key). So the existing operational paragraph got the id plus exactly the two
sentences that fail closed. Deferring entirely was also rejected: `/hub`'s CTA says *"run your
own society"* and the page never said how.

### Disposition

| Item | Disposition |
|---|---|
| Jul-31 LOW (`/onramp` commands unlinked) | **Shipped**, all three commands routed. |
| `/hestia` install section unroutable | **Shipped**, `#how-to-touch-it`. |
| `/hub` had no install destination | **Shipped**, `#how-to-touch-it` + 2 grounded sentences. |
| 4 of 6 inbound re-point candidates | **Rejected on the criterion**, reasons above. |
| `/onramp` `#seams` grid (same 2 commands) | **Deliberately bare**, guard records why: it describes an interface, it does not instruct. |

### Take this next

1. **Triage the Aug-12 05:00 log first** (it landed after this session started).
2. **`/hardbound` has zero `id` attributes on the entire page**, including an install section
   ("How you actually touch it"). It is the last un-anchored piece. Not done here: no hardbound
   command appears in the Jul-31 LOW, and the page carries an unresolved Jul-31 HIGH about
   having no repo link, which a deep-link would walk a reader straight into. Do that HIGH first.
3. `/the-standard` is linked **bare** from `/onramp` twice even though `#thirty-seconds` exists,
   and `lct-explainer`'s 3-card grid points at it bare too. Same class as this session's item B,
   left alone because no visitor has filed it.
4. Unanswered Q6, `EndOfLifeCaveat` widening, Aug-11 LOW 6: unchanged (blocked / density / recurrence-only).

## Aug-11 21:00 session - the guard comment that had been naming the fix, to nobody

**No open PRs.** Same visitor log as #535 and #536 (`visitor/logs/2026-08-11.md`, 05:00; this is
the third and last slot on it). The table was down to **one** non-fenced item, so this session
took it plus one **Unanswered Question**, which is what a near-exhausted table licenses.

### Finding 1: a fix instruction addressed to developers, in the file that needed it

`how-it-works`'s appeals guard has ended with *"See /karma-consequences#recourse."* since
2026-07-28. The **rendered** page pointed only at `/what-could-go-wrong`. Meanwhile `#recourse`
refers back to *"the multi-tier version you may see described elsewhere on this site"*: a one-way
reference to a page that did not point home. So the answer to Aug-11's Unanswered Question 4
(*"who are the independent reviewers and the witness panel?"*) existed, was policy-reviewed, and
was named **in a comment in the exact block that needed it**.

> **Rule.** A guard comment that names where the fix belongs is not the fix.
> `[[guard-comment-names-the-un-swept-page]]` in its purest form yet: not a neighbouring page,
> the same block. When a guard ends in a route, check that route is rendered somewhere clickable.

This is also **read-it-and-still-filed-it twice over**. Step 5 of the walkthrough already names a
staffer (*"A Moderator (rotating monthly, not the original oracle)"*) and `:1997` echoes the same
rotation as a **charter** example. The visitor saw staffing and still asked, because nothing said
**whose call** it is. The missing clause was the attribution, not a third example.

### Finding 2: "design pass" was the wrong label, for three sessions

Friction item 7 (`/tldr`'s three identical **Reference** badges) was deferred three times as
*"prominence/design pass on a table column, a different shape of work."* It is not a design pass.
The identical fix for the identical defect **already ships** on `/running-now`'s Hestia block,
where a Jul-23 LOW (*"the Running badge read more finished than the fine print, because the caveat
sat ~27 lines below it"*) was closed by **pinning the caveat directly under the badge**. No new
tier, no layout work, just copy.

> **Rule.** Before deferring an item as a design pass, grep for the defect's **shape** on other
> pages. A visitor-validated fix for "the caveat is N lines below the claim" is copy, and a track
> that has solved it once has already priced it.

### Why the qualifiers are subsets, not the asked-for 3-to-5 words

Each new `/tldr` line is a strict subset of that piece's own bullet in the same page's "How real
is it, honestly?" list. A subset cannot contradict its source; a paraphrase can. Compressing
*"a usable, actively hardened enterprise tier"* **plus** *"hardware binding not yet validated on
real devices"* into five words would have authored variant N+1 of a two-part claim that travels as
a **pair** on four surfaces (`/`, `/onramp`, `/hardbound`, `/running-now`). Fidelity beat brevity.
Hestia gets **no** line: its badge is already the distinct one, so it is not part of the
flattening, and its blurb was rewritten by #535 to settle this same browse's HIGH.

### The reviewer falsified three of eight claims

| I claimed | Actually |
|---|---|
| `/onramp` renders a single badge; 9 files import `MaturityBadge` | **Three** badges on `/onramp`; **11** files match, incl. `InProduction.tsx`, a 10th consumer rendering on 13 pages. Conclusion survived: `/tldr` is still the only surface badging 2+ pieces adjacently with no distinguishing text. |
| `/how-it-works` never links `/karma-consequences` in rendered output | It links it **twice** (`#karma-formula`, footer card), just never `#recourse`; and its `/what-could-go-wrong` link lands on a page that does link `#recourse`. The reader was two clicks away, not stranded. Real finding, **smaller** than filed. |
| `entity-types.md`'s *"who fills it ... each society's law"* grounds appeals staffing | **Scoped to the EFFECTOR role** (enforcement), not to an appeals reviewer; its only other hit is an unadopted W4IP draft. **Barred by name in the new guard**, not merely avoided. |

Also caught: the visitor's own phrase *"installable with 171 tests green"* is **not** derivable on
`/tldr` (`171` lives only on `/running-now` and `/the-standard`). Not imported.

### What the copy must not say

`defined_by_law` **relocates** the staffing question, it does not answer it. The multi-tier flow's
roles are not in the spec corpus at all, so there are no upstream staffing rules for roles that are
not upstream, and the visitor's three sub-questions (paid? elected? drawn from high-trust members?)
have no answer anywhere. The shipped line says the standard declines and no community has run one.

### Disposition

| Item | Disposition |
|---|---|
| Friction 7 (`/tldr` badge flattening) | **Shipped.** Status line pinned under the badge on the three Reference cards. |
| Unanswered Q4 (appeals staffing) | **Shipped**, folded into the existing "Honest status" sentence + the `#recourse` reciprocal link. |
| `/onramp` guard citing `tldr:255-256` | **Re-anchored** to a quoted heading; item A shifted those lines. |

**The Aug-11 table is now fully disposed.**

### Take this next

1. Triage the Aug-12 05:00 log first.
2. Unanswered Q6 (*"what does a 0.50 person actually experience day to day?"*) is the strongest
   remaining item on the Aug-11 log and is **blocked**: it is the equity half of the hardware
   seam, still escalated under Q8. Do not work it without an upstream ruling.
3. `EndOfLifeCaveat` four-branch widening (density call, Q5). Unchanged.
4. Aug-11 LOW 6 (device-loss "3 to 7 days" assumes a community): recurrence-only.
5. Standing: `/hestia` has 18 inbound links and one anchor. A general anchor pass is still owed.

## Aug-11 15:00 session - the twin walkthrough that never ran the same numbers

**No open PRs.** Same visitor log as #535 (`visitor/logs/2026-08-11.md`, 05:00; this is the 15:00
slot). #535 disposed the HIGH, 3 of 5 MEDIUMs and 2 LOWs, so this session took its **"Take this
next"** items 1 and 2, which are one claim class, plus the `/glossary` R6 half of item 3.

### The finding: the residual was real, and both descriptions of it were wrong

The residual has been logged in **three** places since Aug-06 (`atp-economics`'s own section guard,
`how-it-works:48-50`, and `WEB4-CANON-QUESTIONS.md` Q5 *"Known residual, logged not fixed"*):
`/atp-economics` runs a four-life walkthrough with **no end-of-life framing at all**, while its
twin carries four passes of one. That is true and it is now discharged. But the sentence all three
places used to describe it, *"the same four-life walkthrough with the same figures"*, is **false in
source**, and Q5's own Jul-27 table has said so since it was written:

| | `/how-it-works` | `/atp-economics` |
|---|---|---|
| Lives | **3** | **4** |
| ATP crisis (drop to 15) | Life 2 | Life 3 |
| Final ending | **165 ATP** | **140 ATP** |

Shared: 100 / 60 / 105 / 145 / 130 / 15. Not shared: 165 there, 95 / 85 / 140 here. A session that
propagated the phrase would have written a false sentence into visitor prose. The policy reviewer
falsified it; no visitor ever did.

> **Rule.** A residual's *existence* and a residual's *description* are separately checkable. Three
> guards agreeing does not make the description true, because the second and third were copied from
> the first. Re-derive the claim, not the count of places asserting it.

The reviewer also falsified the pseudocode cite (`:2264` -> `:2305`, a 41-line drift carried by
both `how-it-works`'s guard and Q5) and the ledger's own `:1127` cite for the ATP=0 death.

### Why the caveat could not be propagated whole

`EndOfLifeCaveat` closes *"this walkthrough shows one modelling choice, not the rule."* That
sentence is **false on `/atp-economics`**: its three rebirths use **two** shapes, whole balance
twice (145 -> 145, 130 -> 130) and reduced once (95 -> 85, *"reduced from the crisis"*). Q5's table
recorded this page as *"reduced"* only, under-describing it. So the divergence Q5 files as
*between* two pages is also *inside* one of them, unlabelled, on a page whose visitor had just
written that *"the two places I stopped believing the site were both places where the site
contradicted itself."*

Everything else **is** propagated whole-clause. Page-native and deliberate: the bridge to this
page's own ATP = 0 death (so the block cannot read as retracting the *"They die and stay dead"* box
it sits directly above, which is also why it renders **before** that box), the life-boundary
clause, and the adapted closer. The branch list names **four** to the component's three, because
the fourth shape ships on this page.

### The boundary clause: illustration-scoped, so not the Q5 ruling

Aug-11 MEDIUM #3's un-shipped half. The visitor's formulation is the test: *"Disclosing the open
question is not the same as explaining the illustration built on top of it."* What shipped says the
**walkthrough** draws the boundary and the standard states no rule that draws it. The silence half
already ships verbatim in `EndOfLifeCaveat`; the other half is about 4-life's own authored
illustration, which 4-life owns. Barred wordings are recorded in Q5: anything implying no such rule
*could* exist (that is branch (a), the ruling), and any in-fiction cause. **The visitor's own
suggested clause, *"the deployment ended"*, is the coined cause the fence exists to refuse.**

### R6: the count was right, the enumeration was not countable

Upstream numbers six Core Components with Result as the sixth (`core-spec/r6-framework.md`), and
`r7-framework.md` says R7 *"adds the seventh component"*. So *"six-part"* stays on all three
surfaces that assert it. What changed is the two surfaces that enumerate next to the count:
`/glossary`'s R6 card and `/the-standard`'s R6/R7 block, which had the **identical** stall shape
(it asserts *"six-part"* four lines above *"produce a Result"*) and which this same visitor read
this same browse. `/manifest` and `/web4-explainer` enumerate with no count claim adjacent, so
there is nothing there to reconcile. `/the-standard`'s read-aloud array must still not gain a sixth
card; that is a different *sixth*, forbidden by its own guard.

### Disposition

| Item | Disposition |
|---|---|
| Take-this-next 1 (`/atp-economics` twin) | **Shipped.** Page-native block, no hoist, no figure moved. |
| Take-this-next 2 (illustration boundary) | **Shipped**, on `/atp-economics` rather than `/how-it-works` (density). |
| Take-this-next 3, `/glossary` R6 | **Shipped**, plus the `/the-standard` twin defect. |
| Take-this-next 3, `/tldr` badge qualifiers | **Still deferred.** Prominence/design pass on a table column, a different shape of work. |
| Q5 fence branch count | **Asymmetric on purpose**, 4 here / 3 on `/how-it-works`. Recorded; widening the component is an open density call. |

### Take this next

1. The `/tldr` badge-qualifier LOW, deferred three times now (Aug-11 item 7). Three of four pieces
   carry an identical **Reference** badge while the prose below distinguishes them sharply.
2. Whether `EndOfLifeCaveat` should widen to four branches. Density call, logged in Q5.
3. Aug-11 LOW #6 (device-loss "3 to 7 days" assumes a community) stays on recurrence-only, per #535.

## Aug-11 09:00 session - the pointer that should have been the number

**No open PRs.** Fresh log `visitor/logs/2026-08-11.md` (05:00, unhandled; this is the first slot
after it). Understanding **good**, all seven boxes, 1 HIGH / 5 MEDIUM / 4 LOW. The Honest
Assessment names one seam twice: *"the gap between what the site sells and what the site runs ...
That is not dishonesty, because every individual page says the true thing about itself. It is a
**routing failure**."*

### The finding: routing was the right fix in July and the wrong shape in August

The Jul-30 visitor filed the same seam and got **routing only**, deliberately: `/hestia` named the
tier (*"a software LCT held on your machine"*) and linked `/lct-explainer#software-only-survival`,
under a guard saying that stating the ceiling *"would land a position on BOTH standing
escalations."* Today's visitor read that pointer and filed the sharper complaint:

> *"it hands me a pointer instead of the number, at the exact moment I am deciding whether to
> install."*

The three facts are now **on the page**. What licenses that is **not** the Aug-05 Q8 release, and
the first draft of this session's scope got that wrong. Q8 records RULING 1 ANSWERED UPSTREAM and
says exactly what it releases: a surface asserting hardware is *required to participate* may be
corrected. It also says *"Requests 2 and 3 remain open and still need Q1"* and *"the equity half of
that seam stays open"*. **What the ceiling costs IS the equity half.**

What licenses it instead: all three sentences **already ship, policy-reviewed, on other pages**, so
carrying them is **propagation, not assertion**. The distinction that makes it safe was already
written down in a guard on the destination page: *"'Capped at that midpoint' is a **ceiling** claim,
not an **eligibility** claim"* (`lct-explainer`, `grep -n "is a ceiling claim"`).

> **Rule.** A fence on a CLAIM does not fence a SENTENCE that already ships elsewhere under
> review. Before treating a guard as blocking, check whether the text you want is propagation.
> And check the guard's **scope**: a two-reason guard can go stale in one reason and stand in the
> other, and Q8 states its own release scope in a sentence you can quote.

### The Q1 fence held, via the words rather than the claim

`/hestia` carries no other decimal and had **no 0-1 scale anchor at all**, so the ruler travels
with the number in the same sentence, and the words **survival line / midpoint / threshold /
eligible** are kept off the page's rendered prose on purpose. Each is a synonym that re-imports the
endpoint. The strictly-below story stays behind the `#software-only-survival` link where it is
fenced. Nothing new says what a reader sitting at exactly 0.50 is, in either direction.

### The evidence lesson: two of five claims were false, from one truncated pipe

The policy reviewer was asked to verify five named claims in source rather than accept them, and
falsified two:

| I claimed | Actually |
|---|---|
| `grep -rn "hardware you control"` returns one hit, on `/tldr` | Returns `identity-constellation:403`. The `/tldr` instance is real but **wraps across a JSX line break**, so the grep I recorded could not have produced it. **Two** live surfaces. |
| `/hestia` and `/lct-explainer` link `/what-could-go-wrong` zero times | `/hestia` zero, correct. `/lct-explainer` links it **four** times, one of them `#risk-accessibility` **inside the tier-grid paragraph this visitor was reading**. `lct-explainer:1485` is a guard recording that a *previous* visitor made the same claim and it was half wrong then too. |

Both came from **one** command: `grep -rn ... | sed ... | head -30`. The `head` ate the
`lct-explainer` hits; the `sed` and the line-based match hid the wrapped one.
`[[claim-class-grep-truncated-enumerate-remainder]]` fired again in a session that had that memory
loaded. The remainder was re-derived with `perl -0777` for `/hardware\s+you\s+control/`.

`glossary:767` (*"identity rooted in hardware you cannot copy"*) matches a line-based grep and is
**excluded with reason**: it is the **hardbound** definition, where hardware binding is the
definitional content and the predicate is a different claim.

### Disposition: all 10 friction items

| # | Sev | Item | Disposition |
|---|---|---|---|
| 1 | **HIGH** | `/hestia` routes the cost instead of naming it | **Shipped.** Cap + ruler, device-loss, sheddable, all propagated whole-clause. Both routing links kept. |
| 2 | MED | 0.50 ceiling vs `>= 0.5` eligibility, never joined | **FENCED.** Ledger **Q1 + Q8 requests 2-3**. Q8 already records *this exact visitor formulation*, from the Aug-10 browse, as *"Recorded as evidence, not answered, and no site edit made."* The answerable half (*can it climb back?*) already ships at `#software-only-survival` and now arrives at the decision point via item 1's link. |
| 3 | MED | `/how-it-works` "Ended with **145 ATP**" | **FENCED.** Ledger **Q5**. `EndOfLifeCaveat` renders **directly adjacent** to both surfaces, so this is read-it-and-still-filed-it, not placement, and the log's suggested clause (*"the deployment ended"*) is the coined cause that caveat exists to refuse. Four prior passes. |
| 4 | MED | `/the-standard` MCP + RDF are jargon-for-jargon | **Shipped**, reshaped. The plain clauses **already ship** in the read-aloud `plain` fields; what reads as jargon is the upstream `role` label. Bridge paragraph added above the operator table. |
| 5 | MED | `/what-could-go-wrong` is unreachable from the pages that raise its questions | **Shipped for `/hestia` only.** `/lct-explainer` was already linked 4x incl. at the read point; `/learn` already carries it as a curated card, and its step count is guarded with durations that ripple into two totals. |
| 6 | LOW | device-loss "3 to 7 days" assumes a community | **Deferred.** Same `lct-explainer` region item 1 propagates from; item 5's link now carries *witness network bootstrapping* to `/hestia`. Re-check on recurrence rather than stack a fourth edit in one region. |
| 7 | LOW | `/tldr` badge flattening (3 pieces, identical **Reference**) | **Deferred**, take-this-next. |
| 8 | LOW | install command differs across three pages | **Shipped.** Half was a misread (`/running-now` prints the two-package form too; only `/tldr` prints the short one, correctly, since that bullet is scoped to *the primitives*). Took the log's second option: say what the second package adds. |
| 9 | LOW | `/glossary` R6 "six-part shape" counts as five | **Deferred**, take-this-next. |
| - | - | `/tldr` + `/identity-constellation` "hardware you control" | **Shipped, both.** `/tldr` takes the landing card's accurate *"on your own machine with no cloud"*. `identity-constellation:403` is tier-qualified by **reusing the block already ~30 lines above it** on that same page ([[page-ships-the-answer-and-denies-it]]), with **no ceiling number**, per that region's own guardrail. |

### Grounding

- Package split: `web4/STATUS.md:46` (what `web4-core` holds) and `:58` (*"Trust storage,
  witnessing, decay"*). `:58` names the **Rust** crate `web4-trust-core` while the site prints the
  **PyPI** package `web4-trust`; what licenses carrying it across is `:46`'s closing sentence,
  *"The Python wheels are PyO3-built bindings over the same Rust core."* Cite that, not `:58` alone.
- MCP/RDF counts re-derived per page, and they are **not symmetric**: RDF is 0 across all six
  reading-path pages; MCP is 0 on five and glossed once at `running-now:233`. Do not flatten that
  into "neither appears", which is what the log says.

### Take this next

1. **The `/atp-economics` twin.** It runs the same four-life walkthrough with the same figures
   (`:1470`, `:1486`, `:1501`) and has **no `EndOfLifeCaveat` at all**, and it defines a real
   ATP=0 death at `:1127`. That is the stronger move on the 145-ATP class than a fifth sentence on
   the `/how-it-works` caveat, which is already long enough to be a density risk.
   > **Aug-11 15:00: done, and this paragraph was wrong twice.** The walkthroughs do **not** run
   > the same figures (3 lives ending 165 vs 4 ending 140), and all three cites here are stale.
   > Corrected in the 15:00 block at the top of this file and in Q5. Left standing as written so
   > the error is visible rather than silently overwritten.
2. The un-shipped **illustration-boundary** half of item 3: the caveat scopes *"one modelling
   choice"* to the carry-forward **amount** and *"declines to name one"* to the **cause**, but says
   nothing about the life **boundary** being a device of the illustration. That is
   illustration-scoped, not a cause, so it is not Q5-fenced. Density is the reason it waited.
3. The two deferred LOWs above (`/tldr` badge qualifiers, `/glossary` R6 count).

## Aug-10 21:00 session - the page that said "no formal economic modeling" and "formally proven" 540 lines apart

**No open PRs.** Same visitor log as #532 and #533 (`visitor/logs/2026-08-10.md`, 05:08; this is the
21:00 slot). Both HIGHs, both MEDIUMs and the low-medium were already disposed, so this session took
the **"Take this next"** items #3 (archived-provenance sweep) and #4 (the Gini leak) and found they
are **one defect**, plus the two carried-over LOWs.

### The finding: four site claims are the docstring of a file upstream archived as obsolete

`web4/archive/reference-implementations/bootstrap_convergence_proofs.py` opens with a **"Key
findings"** docstring. Four of its five findings were on the site, in substance and mostly verbatim:

| Docstring finding | Was on |
|---|---|
| "Gini converges to ~0.25 (moderate inequality)" | `why-web4` x2, `atp-economics` x2, `what-could-go-wrong` x3 |
| "First-mover advantage decays exponentially with half-life ~30 actions" | `why-web4` x3, `atp-economics` x2, `what-could-go-wrong` x2 |
| "Newcomer catch-up time is O(log(n))" | `what-could-go-wrong` x1 |
| "Stochastic dominance breaks after ~50 actions" | `why-web4` x3, `atp-economics` x3, `what-could-go-wrong` x2 |

That file exists **only** under `archive/`, whose `README.md` opens *"historical documents and
obsolete content from earlier development phases."* It is the **third** precise figure deleted from
that one directory, after *"(109 integration checks)"* and *"(up to 2 appeals per resolution)"*.
`[[precise-number-may-cite-archived-artifact]]`, third instance, and the first one that was
**load-bearing**: it was the whole answer `/what-could-go-wrong` gave to *"does Web4 create an
entrenched elite?"*

**Two things made caveating impossible and deletion mandatory.**

1. **A maintained upstream file falsifies the status words.** `web4/SECURITY.md` says
   *"No formal economic modeling"*, *"No cryptoeconomic modeling"*, *"No economic modeling of
   attacker ROI"*. The site said *"Formal bootstrap convergence proofs show"* and *"Bootstrap
   convergence is formally proven with simulation validation."* And `/what-could-go-wrong`
   **already quoted SECURITY.md itself**, ~540 lines above the entrenchment answer, at
   `grep -n "no validated economic model"`. One page, both claims. This is exactly the class the
   visitor named in today's Honest Assessment (*"the two places I stopped believing the site were
   both places where the site contradicted itself"*), found by enumeration rather than by a visitor.
2. **Gini 0.25 was an INPUT, not a finding.** `web4/private-context/moments/2026-02-28-legion-session19.md:32`
   lists *"target Gini"* among that model's **tunable parameters**, and `session18.md:64` records a
   different run holding *"Gini < 0.6"*. So `/why-web4`'s *"the **designed** 0.25"* was the one
   phrasing accidentally closest to true, which made it the most misleading of the four: it read as
   a design commitment while sourcing to an unpublished session note.

### The enumeration lesson: seeding from UPSTREAM's vocabulary fails the same way

#533's rule was *"seed the pattern from the CLAIM's synonyms, not from the quoted sentence"*,
because a grep seeded on the visitor's wording inherits the visitor's vocabulary. This session
seeded from something that should have been better still, the **archived docstring's own five
findings**, and still under-counted: **12 found, 23 real**. The policy reviewer caught it.

The surface that proves why is `why-web4`, `grep -n "Wealth gap trends toward"`: **"Wealth gap
trends toward 0.25"**. Same number, same claim, and the word *Gini* never appears. The site
paraphrases upstream, so seeding on upstream's vocabulary misses exactly what seeding on the
visitor's vocabulary misses.

> **Sharpened rule.** `[[claim-class-grep-truncated-enumerate-remainder]]` is not about *which*
> vocabulary you seed from. Any single vocabulary is one paraphrase away from wrong. **The only
> reliable seed is the bare NUMBER.** Six of the seven surfaces the reviewer added are returned by
> `grep -rn "0\.25\|30-action\|50 action" src/app/` and by no word-based pattern.

The command of record, run before and after:

```
grep -rnE "0\.25|30-action|50 action|action ~?[35]0|bootstrap convergence|provably|formally proven|validated through simulation|500\+ rounds|wealth gap|Gini|O\(log" src/app/
```

### Disposition: all 23 surfaces

**Read the locators carefully.** `grep:` resolves in the tree today. `was:` is a string this commit
**deleted**, so grepping it returns zero by design; find it with
`git show d252f34:src/app/<page>/page.tsx`. Mixing the two is how a disposition table rots into a
list of phantom line references.

**`/what-could-go-wrong` (12)**

| Surface | Disposition |
|---|---|
| `was:` *"Formal bootstrap convergence proofs show"* + its 4 bullets | **DELETED**, replaced by the mechanism (below) |
| `was:` *"provably finite and fair"* | **DELETED** the word *provably*; it was the adjective leaning on the deleted numbers. Now `grep:` *"written down and open to anyone who does the"* |
| `was:` *"formally proven with simulation validation"* | **REWRITTEN**: direction is readable off the update rule, rate has never been measured, SECURITY.md quoted. Now `grep:` *"The direction you can read off the update rule"* |
| `was:` *"~50-action threshold"* | Deleted with the sentence above it |
| `was:` *"wealth convergence to Gini"* (scalability card) | **DELETED** the parenthetical only. `grep:` *"Offline modeling has been run"* is the correct altitude and is untouched |
| `was:` *"advantage peaks around action 30"* | **DELETED** the integer; replaced with why a head start does not compound |
| `was:` *"settles toward Gini"* | **DELETED** the figure; now *"trust scores spread out by how people actually behaved"* |
| `was:` *"This trajectory is validated through simulation"* | **REWRITTEN**: `grep:` *"a sketch of what the rules imply"* |
| guard, `grep:` *"discloses the gap three times"* | **CITE FIXED**: read `:226`, had rotted to `:223`. Replaced the three line numbers with the three quoted strings, per `[[cite-invariant-diff-aware-not-lint]]` |

**`/atp-economics` (5)**: `was:` *"First-mover advantage fades on a"* (numbers out, update-rule
sentence in); `was:` *"The modeled wealth gap"* (Gini and the `~0.6-0.7` comparison out, replaced by
the recharge cap this page already teaches at `grep:` *"capped at cost"*); `grep:` *"What about
newcomers"* (three figures out, heading survives); `was:` *"From web4 economic equilibrium
analysis"* including **"Gini convergence verified across 500+ rounds"** (the run count had the same
archived provenance), now `grep:` *"From web4 offline modeling"*; `grep:` *"Bootstrap convergence:"*
(label survives, numbers out, *"a starting balance, not a multiplier"* in).

**`/why-web4` (6)**, all `was:` strings, all numbers deleted and the qualitative direction kept:
*"the designed 0.25"*, *"First-mover advantage fades (30-action"*, *"catch up to founders by
action"*, *"Wealth gap trends toward"*, *"surpasses established members within"*, *"who contribute
quality work surpass early adopters"*.

**Caution for the next session**: *"the designed 0.25"* now returns exactly one hit, and it is the
**guard comment on `/what-could-go-wrong`** quoting the deleted `/why-web4` string. Do not read that
hit as an unswept surface.

**Declared out of bounds in writing, before starting**: `atp-economics` `grep -n "Formally proven: one honest identity"` and `why-web4` `grep -n "424 attack vectors"` (the Sybil "5 theorems / 4.6x / 13x" family: same shape, **different** provenance, already hedged at the `why-web4` surface); `why-web4` `grep -n "first ~30 actions are the most"` (shares the integer, different claim, and it is a caveat *against* the site).

### What replaced them, and the canon trap on the way

The reviewer proposed grounding the answer in the decay rates ("Temperament 30-day, Training
180-day"). **Checked, and that would have committed the same defect being fixed.**
`t3-v3-tensors.md` §10.3 lists Temperament recovery and Training decay as
**society-configurable**, with reference defaults of `+0.01/month` and `-0.001/month`, and the spec
states **no half-life at all**. The site's 30-day figure is a 4-Life calibration.
`[[grounding-citation-may-contradict-you-nearby]]`: the citation that was supposed to ground the fix
refuted it four lines down. The calibration is left alone as a calibration and was **not** promoted
to ground truth.

What is genuinely protocol-invariant is the update rule itself: **`0.02 x (quality - 0.5)`**
(§10.2, vector `t3v3-003`), and it is a *better* answer to "does Web4 create an entrenched elite"
than a predicted Gini ever was, because it answers structurally: the update reads the quality of one
action and nothing about who took it. Not coined here either, the site already teaches it at
`/why-web4#faq-calibration`, which the new paragraph links.

### Word deltas (measured, comments AND JSX tags stripped)

| Page | Delta |
|---|---|
| `what-could-go-wrong` | **+74** |
| `why-web4` | **+38** |
| `first-contact` | **+28** |
| `atp-economics` | **+16** |

**I projected net DOWN, on `[[density-guard-means-delete-not-caveat]]`, and it went up on every
page.** Recording the miss rather than trimming to hit it (#533 set that precedent). The reason the
rule did not apply: in the two prior instances from this directory the figure was **decorative** and
deletion left a complete sentence behind. Here the figures **were** the answer, so something had to
stand where they stood, and a mechanism costs more words than a number. One real trim was made after
measuring: the first `Status:` rewrite recited the three deleted figures back to the reader, which is
changelog on a risk page. That archaeology now lives in the guard comment instead.

### The two carried-over LOWs, both closed

1. **`/first-contact` used CI before naming it.** Fixed at **both** surfaces, not the one the visitor
   quoted: the `<details>` box *and* `#what-triggers-death`, the anchor div `/how-it-works` and
   `/glossary` both deep-link to, so a reader can arrive there having never seen this page's CI card.
   **The sentence is verbatim-locked across six surfaces**, so the gloss was **appended after** the
   locked tail (and on the recap, put in that box's own preamble). Verified:
   `grep -rnE "narrows (your|her) access" src/app` still returns the same 6 prose hits, all
   byte-identical through *"trust death"*. Do not put this inside the sentence; that desyncs 6 pages.
2. **`/trust-tensor`'s two casts of roles.** Fixed by **bridging**, not unifying. Unifying was
   scoped and rejected: the worked-example cast is cited by name in three guard blocks, a code block,
   and a cross-page hardware-ceiling argument, and the widget's third role sits adjacent to the
   standing **T3-weights escalation** with a no-ordering-commentary restriction. Rationale recorded
   in a guard next to the new sentence.

### Take this next

1. **The `web4/archive/` provenance sweep is still open beyond this family.** Three instances now
   from `reference-implementations/` alone. The bare-number seeding rule above is the tool: pull the
   precise figures out of the site and grep each one against the **maintained** tree only.
2. **`/atp-economics` `grep -n "session 32, 84 checks"`** was left in place this pass (it is a
   provenance caption, not a claim about the world) but it is unverified and from the same era.
3. Still open from #533, untouched: the `reset()` mechanic vs *"not a free reset"*, and the **three
   divergent recoverability conditions** (unconditional / *"if you built good karma"* / *"if trust
   held up"*), which owes a five-surface sweep.
4. Remaining Aug-10 visitor LOWs, none of them accuracy defects: FAQ scale (60+ questions),
   `/what-could-go-wrong` filed under "Going Deeper" rather than the main path, R6/R7 in the glossary
   acronym index with no gloss.

## Aug-10 15:00 session - the enumeration that was truncated three times in one session

**Same visitor log as #532** (`visitor/logs/2026-08-10.md`, 05:08; the cron runs once at 05:00 and
this is the 15:00 slot). **No open PRs.** This session took the two MEDIUMs and the low-medium that
#532 left under "Take this next", and the interesting part is not any of the three fixes.

### The finding: an enumeration anchored on the visitor's quoted phrase misses synonyms by construction

Three enumerations of the same claim class were run today, by three different readers, and the first
two were both wrong:

1. **#532 (09:00)** swept the two-deaths class with the predicate *"does this surface condition on
   trust, or on which death fired"* and recorded *"These two lines were the only defect."* A surface
   that makes **no conditional claim at all** is invisible to that predicate. The visitor's own log
   already listed one (`/how-it-works`'s summary card, filed low-medium).
2. **This session's Step 3** enumerated with `grep -rn "Run out" src/app/`, the phrase the visitor
   happened to quote. Found 3 surfaces on `/atp-economics`.
3. **The policy reviewer** found 3 more that grep missed, on files already in the deliverables.
4. **The broadened command** found the real count:

   ```
   grep -rniE "run out|you die|you'll die|your agent dies|death\.|you died" src/app/
   ```

   **Eight** non-comment surfaces on `/atp-economics` alone, not three.

`[[claim-class-grep-truncated-enumerate-remainder]]` fires again, but with a sharper rule than
"re-derive the count". **The pattern was anchored on the visitor's wording.** A visitor quotes the
one phrasing that stopped them; the site expresses the same claim as "you die", "your agent dies",
"until death", "Death.", "you'll die", "You died". Any grep seeded from the friction log inherits
the visitor's vocabulary and will systematically under-count. **Seed the pattern from the CLAIM's
synonyms, not from the quoted sentence.**

### The fix that fell out of it: the defect was ordering, not wording

Eight surfaces, and rewriting eight strings would have ballooned a page that already carries the
correct sentence. `/atp-economics` ships its recovery clause at its `"Death is real"` bullet
(`grep -n "reborn with a head start - your reputation"`) and asserted termination ~350 lines
**earlier**, in the intro (`grep -n "Stay above zero by contributing"`) and again in the Key
Takeaways (`grep -n "Stay above zero or your agent dies"`). So a reader met "your agent dies" twice before the page ever said energy death is the
recoverable kind, and every later "death" string was correct shorthand under a frame the page had
not yet established.

The clause landed at the two surfaces that come **first**. The five later ones (the widget's two labels, the two
`projectedActionsLeft` strings, and the spam example `grep -n "after message 20"`) are untouched and now
inherit an established page-level frame. `[[maturity-claim-inherited-from-container]]` used
**constructively**: normally that memory warns that a claim silently borrows its container's status.
Here the container was made to grant the right status on purpose, which is cheaper and more honest
than five caveats.

### Two-deaths class: full disposition (command above, every non-comment hit)

| Surface | Disposition |
|---|---|
| `how-it-works`, summary card `grep -n "Every action costs energy"` | **FIXED**: "Run out? You die." -> "You stop acting", propagated from this page's own intro (`grep -n "you stop acting - but that death"`), which #532 wrote 6 hours earlier ~50 lines above. Recoverability clause deliberately NOT restated here, see below |
| `atp-economics` intro `grep -n "Stay above zero by contributing"` | **FIXED**, recovery clause added, verbatim from this page's `grep -n "reborn with a head start - your reputation"` |
| `atp-economics` Key Takeaways `grep -n "Stay above zero or your agent dies"` | **FIXED**, "(recoverable if you built trust, permanent if not)", the conditional this page already uses at `grep -n "not a free reset"` |
| `atp-economics` `grep -n "Web4 societies work the same way"` (was "Run out? Death.") | **FIXED** + the connective repaired, see below |
| `atp-economics` widget `grep -n "Critical ATP level"` and `grep -n "ATP reached zero"` | **FIXED** (labels only): "you'll die" -> "run out of energy", "You died." -> "Out of energy." `[[prose-fixed-thrice-check-the-illustration]]`, 4th firing |
| `atp-economics` `grep -n projectedActionsLeft` ("before death" / "until death... or die") | Correct as-is under the frame now set by the two surfaces above |
| `atp-economics` `grep -n "after message 20"` | Same |
| `atp-economics` `grep -n "Death is real"` | Already carried the recovery clause in the same sentence |
| `atp-economics` `grep -n "maintain homeostasis"` ("Run out of ATP? Death.") | **Exempt**: about biological cells, and true of cells |
| `glossary:401` "you can't act until you earn more", `:410` | Already correct |
| `first-contact:736`, `:750` | Already correct |
| `why-web4` `grep -n "run out of fuel"` | Already correct |
| `how-it-works` `grep -n "you stop acting - but that death"` | Already correct (#532) |

**The connective.** The biology paragraph and the Web4 paragraph beneath it are a rhetorical pair
joined by *"Web4 societies work the same way"* and closed by *"This isn't a metaphor."* Correcting only the second line would
have left the connective asserting sameness across the one difference that matters, so the connective
now names it: the metabolic frame is exact everywhere except the ending.

### Appeals class: full disposition (`grep -rni "appeal" src/app/`)

| Surface | Disposition |
|---|---|
| `atp-economics` `grep -n "An appeals mechanism"` *("exists")* | **FIXED** -> "has been designed". Was the only fully unhedged surface site-wide. **Unfiled by the visitor**, found by enumerating |
| `how-it-works` walkthrough intro `grep -n "Open Science Collective, the hypothetical"` (was *"handles a real violation"*) | **FIXED** -> hypothetical + conditional. **Root-cause fix**: scopes *"Appeal upheld: Suspension lifted, trust scores restored"* and *"every verdict is appealable"* inside the same `#plagiarism-walkthrough` div, at near-zero word cost |
| `how-it-works` `grep -n "ending in restored"` (was a standalone *"Successful appeals restore your trust scores."*) | **FIXED**: folded INTO the designed flow rather than caveated separately, so the "has been designed" scope reaches it. `/glossary:1543` ships that shape |
| `how-it-works` `grep -n "suspension + appeals available"` | Correct as-is. **NOT covered by the walkthrough fix**: it sits in the *sibling* div, the one headed *"Example: How a Research Community Sets Its Rules"*, and is scoped by that heading plus the fictional society name. If that heading is ever rewritten, this line loses its cover |
| `how-it-works` `grep -n "every verdict is appealable"` | **Correct as-is, do not hedge.** Requirement-level, grounded in SAL 5.5 (`web4-society-authority-law.md:221`). Same altitude as the `/why-web4:932` table row |
| `why-web4` `grep -n "Disputes can be appealed"` | **DELETED** the *"(up to 2 appeals per resolution)"* parenthetical, see below |
| `why-web4` social-credit table, `grep -n "Can you appeal"` | **Untouched by ruling.** Requirement-level and grounded; no other row carries a maturity hedge; `#faq-wrongful-penalty` already consolidates the unbuilt-appeals answer and names this table |
| `what-could-go-wrong:1197`, `:294`, `:304`, `:1279`, `:1303` | Correct as-is: requirement-level, or inside a hypothetical scenario, or already routing to the hedged `/karma-consequences#recourse` |
| `glossary:1543`, `manifest:143`, `karma-consequences` (`grep -n "hasn&apos;t been tested with real humans"`), `coherence-index:903`, `why-web4` `grep -n "formal appeals process"` | Already correctly hedged |

### `[[precise-number-may-cite-archived-artifact]]`, second instance, same source directory

`/why-web4`'s *"Disputes can be appealed (up to 2 appeals per resolution)"* traced to
`web4/archive/reference-implementations/cross_society_policy_conflicts.py:451`
(`self.max_appeals_per_resolution: int = 2`). That is the **same directory** archived 2026-04-11 by
commit `65cd5488` "Archive reference implementation sprawl", whose README calls its contents
obsolete, and the **same directory** the *"(109 integration checks)"* figure was deleted from on
2026-07-28. Two precise parameters for unbuilt processes, from one archived source, three months
apart, neither filed by any visitor. **Worth a proactive pass**: grep the site for other numbers
whose only provenance is `web4/archive/`.

Deleted with no replacement; nothing above or below leaned on it.

### `/karma-consequences` finally states who comes back

The visitor's point was structural: it is the page named after the concept and the page
`/first-contact` routes to, and it stopped after the energy/trust distinction. #532 deferred it
because the shipped rule reads `Overall T3 >= 0.5` and copying that comparator to a new page asserts
the 0.50 endpoint ledger Q1 has not settled.

The endpoint-silent formulation was already on the site: `/how-it-works`'s eligibility card names
**which quantity** is checked without naming the comparator. Propagated verbatim, landing **adjacent**
to the verbatim-locked two-ways-to-die sentence (which is byte-identical). No comparator, no number,
and **no owner for the threshold**: the first draft said "the society's threshold", which is a coined
claim (nothing on the site says societies set the *rebirth* threshold; §10.3 gives them role
*requirement* thresholds, and `grep -rni karma ../web4/web4-standard/` returns zero). "The society
checks" is the eligibility card's own subject and names the checker, not the setter.

The paragraph also has to name a **quantity seam**: the locked sentence above it reads **raw trust**,
the gate reads **composite T3**. Two different numbers, both near 0.5, in one card. Shipping it
without the distinction would have reproduced the `[[borrowed-word-means-something-else-there]]`
defect #532 had just fixed on `/trust-tensor`.

### Word deltas (measured, not projected)

Comments stripped, so these are rendered words:

| Page | Delta |
|---|---|
| `how-it-works` | **+8** (flat, as projected; density guards respected) |
| `why-web4` | **-6** (deletion) |
| `karma-consequences` | **+85** (one paragraph, on the page that omitted the answer entirely) |
| `atp-economics` | **+47** |

**`/atp-economics` did not net down, and I projected that it would.** The projection was wrong
because I attributed the `/why-web4` deletion to the wrong page when estimating. The content was not
trimmed to hit the number: +22 of it is the connective repair the policy review required, and +11 is
the intro clause it also required. Recording the miss rather than the estimate, because a session
that quietly reconciles its own projection is doing the thing this whole log is about.

### Filed, not fixed (two honest debts)

1. **The `reset()` tension on `/atp-economics`.** The demo's Try Again button (`grep -n "const reset"`) restores a
   **clean slate**, which is precisely what the same page denies at `grep -n "not a free reset"`: *"This is not a free
   reset like abandoning a spam account and signing up fresh: your identity and full history
   persist ... closer to a suspended license reinstated than a clean slate."* So the mechanic teaches
   reset where the page teaches rebirth-with-karma. That is a **feature** change (a demo that carries
   karma forward), not a copy fix, and it was out of scope for a copy sweep. Do not paper over it
   with a caption.
2. **Three divergent recoverability conditions**, none wrong on its own, never compared:
   `/how-it-works` (`grep -n "you stop acting - but that death"`) states it **unconditionally**,
   `/first-contact:750` conditions on *"if you built good karma"*, and #532's aliveness fix conditions on *"if trust held up"*. Karma and trust
   are not the same quantity. Today's edits were deliberately scoped so they do **not** restate any
   of the three (the `/how-it-works` summary card carries no clause; the `/karma-consequences`
   paragraph is scoped to the gate). `[[adding-a-distinction-creates-a-sweep-obligation]]`: whoever reconciles these owes
   a sweep of all three plus the two `/atp-economics` surfaces fixed today, which now use
   "if you built trust".

### Take this next (from the same log, still open)

1. **LOW, `/first-contact`'s "Why raw?" box** introduces `raw x CI2` before CI is named; CI arrives
   in the next collapsed section down. Carried over from #532's list.
2. **LOW, `/trust-tensor` has two casts of roles** (widget: Surgeon / Data Analyst / Team Leader;
   examples: Data Analyst / Project Manager / Mechanic). Carried over.
3. **The archived-provenance sweep** described above. Two instances now, from one directory.
4. **Unfiled by anyone**: `#faq-community-size` grounds a band in *"the Gini coefficient converges
   toward the designed 0.25"*, and `../web4` carries Gini only under `simulations/`. A
   retired-simulation provenance leak into live FAQ prose. Noted by #532, still untouched.


## Aug-10 09:00 session - the two lines under the sentence #531 had just fixed, and a label that named the wrong quantity

**Fresh visitor log** (`visitor/logs/2026-08-10.md`, 05:08). Understanding **7 of 7**, would
recommend "with a caveat". **No open PRs.** The Honest Assessment names the defect class itself
and it is not the usual one:

> "the two places I stopped believing the site were both places where the site **contradicted
> itself**, not places where it was hard ... a page that teaches 'trust comes from verifiable
> records' should survive having its own arithmetic verified."

That licenses falsifiable self-contradictions only. Three items were in that class (two HIGH, one
MEDIUM); the rest of the log is prominence, placement and maturity hedging, and was left.

### HIGH 1: #531 declared this class swept six hours before the visitor found the last surface

The Aug-10 03:00 session fixed `/why-web4`'s `#faq-death-rebirth` and called it *"the last unswept
surface of the two-deaths claim class"*. It was not. `/how-it-works`'s aliveness diagram
(`grep -n "death spiral" src/app/how-it-works` before this commit) closed with:

```
All three healthy → thrive, rebirth eligible
Any one fails → death spiral, no rebirth
```

Both lines were false, and **the two failures are independent**:

1. *"Any one fails -> no rebirth."* ATP hitting 0 is one of the three failures named in the
   sentence **four pixels above it** (`grep -n "it ends when: ATP hits 0"`), and that sentence had
   been carefully rewritten the day before, with a 20-line guard comment attached. The line under
   it kept the old claim. This is `[[prose-fixed-thrice-check-the-illustration]]` at its tightest
   radius yet: not a distant page, not a data literal in another file, but **the caption directly
   beneath the fixed sentence, inside the same JSX block**. A guard comment marks the sentence it
   guards; it does not mark its neighbours.
2. *"All three healthy -> rebirth eligible"* is incoherent on its face. If all three are healthy
   you are alive and are not awaiting rebirth. The visitor caught this **separately** and said so.
   Worth noting: an error can be self-evident on a single reading and still survive every
   cross-reference sweep, because sweeps compare surfaces to each other and never ask whether one
   surface makes sense alone.

Rewritten by propagating this page's own strings (`"recoverable through karma rebirth"`,
`"Sustained trust collapse is the permanent one"`) and pointing at the eligibility card rather than
restating its `>= 0.5` threshold, which is untouchable ledger-Q1 legacy. **The remainder sweep was
run this time** (`[[claim-class-grep-truncated-enumerate-remainder]]`) and is recorded in the guard:
every other surface of the class conditions on trust, not on which death fired. These two lines were
the only defect.

### HIGH 2: the visitor did the arithmetic, and the numbers were right while the label was wrong

`/trust-tensor`'s Alice example showed three totals labelled **"Role-weighted trust"**: 90 / 74 / 27.
The visitor could not reproduce one of them from the widget's Data Analyst weights (0.4/0.35/0.25),
worked out that all three reproduce from a flat 0.4/0.3/0.3, and concluded the page's role-specific
thesis was unsupported by its own illustration.

The totals were **correct**. 0.4/0.3/0.3 is the canonical composite blend, protocol-invariant per
`t3-v3-tensors.md` §10.2. What was wrong was the **name on them**. This page coined the distinction
itself on Aug-06, ~400 lines above (`grep -n "a different quantity: a role-weighted"`): the composite
blend is one quantity, and *"role-weighted match"* is the widget's, a different one. Then the example
cards used the widget's term on the composite's number.

`[[borrowed-word-means-something-else-there]]`, with a new wrinkle: the memory is about a word
carried to a *destination page* where it means something else. Here **the destination and the source
are the same page**, and the page is the one that authored the distinction. The Aug-06 fix taught the
careful reader a vocabulary the rest of the page did not use, which converted a harmless
imprecision into a checkable contradiction. **Adding a distinction creates a sweep obligation for
every prior use of both terms.**

**The visitor's suggested fix pointed backwards** (`[[visitor-suggestion-may-point-backwards]]`).
They proposed recomputing the examples with genuinely per-role weights; that would have moved the
site off canon. Taken: relabel to "Composite T3", print the weights and the exact arithmetic
(`0.4(85) + 0.3(90) + 0.3(95) = 89.5`) at the point of the claim so it is checkable where it is made,
fix the Mechanic card's rounding (27 for 0.275 while Analyst was 90 for 0.895: two rounding rules on
three cards), and repair the closing thesis to average the three composites explicitly (64, which
describes none of them). Sibling block updated in lockstep per the policy reviewer.

### MEDIUM: two FAQ answers, two ladders, no ground truth

`/why-web4` answered "how many people" twice with colliding floors (5-10 vs 3-5) and assigned the
**same two properties** to different bands. `grep` over `../web4` and `../hestia` found **no upstream
source for any of the numbers**, so neither ladder could be preferred on evidence and reconciling
them would have meant inventing a third. Fixed by **deletion**: `#faq-community-start` keeps only
what it uniquely answers (the floor for a trust graph to form, plus the reciprocity-density point,
which appears nowhere else on the site) and forwards the scale ladder; `#faq-community-size` is
untouched byte for byte. Both ids survive, so all three inbound links still resolve.

Shape worth keeping: when two ungrounded numbers conflict, **the reconciliation is a deletion, not
an average**. Merging them would have produced a third invented number wearing the authority of a
resolution.

### Escalated, not answered

Visitor Unanswered Q2 ran the 0.50 software-only ceiling forward into the **rebirth rule**
(*"permanently one bad interaction from being ineligible to come back?"*), a consequence surface no
prior filing had reached. Logged to `docs/WEB4-CANON-QUESTIONS.md` Q8 as recurrence evidence. Three
distinct consequence surfaces (access, aliveness, rebirth) now hang off one un-ruled predicate, and
the two pages that own the ceiling honestly are exactly the two that cannot run it forward.

### Take this next (from the same log, left deliberately)

1. **MEDIUM, `/karma-consequences` never states who qualifies for rebirth.** It is the page named
   after the concept and the page `/first-contact` sends readers to, and it stops after the
   energy/trust distinction. Deferred because the rule as shipped is `Overall T3 >= 0.5`, so
   propagating it verbatim coins an endpoint assertion on a new page. Needs an endpoint-silent
   formulation, which is its own pass.
2. **MEDIUM, appeals: designed or built?** `/how-it-works` says *"Appeals mechanism has been
   designed"* and then *"Successful appeals restore your trust scores"* flat, in the present tense,
   and `/why-web4`'s social-credit comparison table rests a live differentiator on it. Different
   class (maturity hedging, not self-contradiction), so it was out of today's licensed scope.
3. **LOW, `/first-contact`'s "Why raw?" box** introduces `raw x CI2` before CI is named; CI arrives
   in the next collapsed section down.
4. **LOW, `/trust-tensor` has two casts of roles** (widget: Surgeon / Data Analyst / Team Leader;
   examples: Data Analyst / Project Manager / Mechanic).
5. **Noticed while editing, filed by nobody**: `#faq-community-size` grounds a band in *"the Gini
   coefficient converges toward the designed 0.25"*, and `../web4` carries Gini only under
   `simulations/`. That is a retired-simulation provenance leak into live FAQ prose
   (`[[precise-number-may-cite-archived-artifact]]`). Left untouched today because the policy review
   bound that FAQ to byte-identical.

## Aug-10 03:00 session - the FAQ that gave rebirth to the death canon calls permanent

**No fresh log** (it is 03:00; the visitor cron runs at 05:00, and Aug-09's HIGHs, MEDIUMs and
residual were discharged by #528 and #529). **No open PRs.** This session took the item the Aug-09
15:00 session marked **"Take this next."**

### The card had the rule backwards in BOTH directions, and only one direction was logged

`/why-web4`'s `#faq-death-rebirth` (`grep -n "faq-death-rebirth" src/app/why-web4`) is on the
site's own recommended reading path (step 2 of 5) and is linked twice from that page's TOCs.

| the card said | what four surfaces ship **verbatim** |
|---|---|
| Energy death: *"Recovery is possible through community support or waiting for **passive regeneration**"* | *"Energy death is recoverable through **karma rebirth**"*, and *"Same LCT, same history, same trust record"* |
| Trust death: *"Recovery requires **starting a new identity with karma**"* | *"Trust death is **permanent** - a destroyed reputation can't be reset"* |

The logged half was the trust-death one. **The energy-death half was worse and nobody had filed
it.** `passive regeneration` and `community support` were each a **single site-wide hit**, both on
that one line: an ATP inflow mechanism that exists nowhere else, and one `/atp-economics` spends a
whole page denying (`grep -n "recharges from" src/app/atp-economics`: *"ATP recharges from
contribution, not purchase. Stop contributing and it drains"*; the only inflows are refund-capped
confirmations and commissioned payment). A passive refill also dissolves `/karma-consequences`'s
*"Bad actors exhaust themselves economically"*, which is the load-bearing claim of that page.

A wrong recovery **target** is something a careful reader catches by cross-referencing. A wrong
recovery **mechanism**, stated once, on the only page that states it, is invisible: there is nothing
to cross-reference it against. That is why it survived four sweeps of the surrounding class.

### The entangled hardware clause dissolved instead of needing a hedge

The Aug-09 note flagged *"when a new identity is created by the same hardware (LCT)"* as the Q8
Ruling 1 class and called the card *"not a one-clause job"*. It was right that it is not one clause,
but the fix was not a hedge: the sentence rests on a **false premise**. Energy-death rebirth keeps
the **same** LCT (`grep -n "Same LCT, same history" src/app/how-it-works`), so there is no new
identity for hardware to re-link. Correct the premise and the hardware universal has nothing to
attach to. The karma-continuity point it was making is propagated from `terms.ts`'s Karma entry
(`grep -n "there is no device to abandon" src/lib/terms.ts`), already scoped per Ruling 1.

Worth keeping as a shape: **an entangled second claim class may not need its own ruling.** Check
whether it is load-bearing or parasitic on the first error before scoping a bigger job.

### The page this session was propagating FROM had the same inversion in its summary

Found by the policy reviewer, not by the proposal. `/how-it-works`'s **Key Takeaways** box
(`grep -n "recoverable through karma rebirth, and good karma" src/app/how-it-works`) read *"If your
energy hits zero **or trust collapses**, you die. But good karma carries forward - you're reborn
with a head start."* One disjunction, one consequence, true of only the first branch, sitting ~640
lines **above** the canonical sentence on the same page and ~850 above that page's own *"No rebirth.
Permanent death."* It appeared in **neither** the ledger nor this file and carried no guard.

This is `[[grounding-citation-may-contradict-you-nearby]]` at page scale: the memory says your
grounding citation may be refuted two lines down, and here it was refuted 640 lines **up**, in the
summary rather than the body. It is also, again, the structural finding the Aug-09 visitor wrote
themselves: *"the summaries are where the precision leaked out, and summaries are what a first-time
visitor reads."* #528 fixed two instances of that shape on this same page two days ago.

### Also worked: the `/why-web4` row of the Q8 definitional remainder

Since the file was open. All three logged universals took **bare deletion of the adjective** (*"is
hardware-bound identity and cross-platform portability"* -> *"is an LCT and..."*, *"Each
hardware-bound LCT"* -> *"Each LCT"*, and the *"your hardware-bound identity"* appositive), because
in each case the surrounding claim is true of every LCT and only the hardware word narrowed it. Plus
two entry-claim surfaces the recorded grep matched but the remainder list never contained (the
colluder cost bullet, the *"every LCT traces back to a hardware-anchored human"* universal), both
fixed by narrowing the quantifier and explaining nothing, so neither touches Q3 or the Q8 equity
half.

**The minors FAQ is deliberately left verbatim**, with the reasoning recorded in the ledger so the
next pass does not re-file it: its answer is scoped by its own antecedent (*"with their own
phone"*), and the question asks **about** hardware-bound identity rather than defining LCT as such.
Reworded it would say less.

### Why the grep kept missing the worst instance

`hardware.?(bound|rooted|anchored|backed|based|tied|locked)` **cannot match** `hardware (LCT)`: the
pattern requires one of those adjectives to follow the noun, and what follows there is a
parenthesised acronym. Fourth truncation of this class, and the first caused by the **pattern**
rather than by stopping early ([[claim-class-grep-truncated-enumerate-remainder]]). The ledger now
carries the bare-noun alternation alongside the original.

The canonical sentence is on `how-it-works`, `glossary`, `first-contact` and `karma-consequences`;
`/what-could-go-wrong` states the permanence half in its own words. **Grep it as `"Energy death is
recoverable"`, never as `"...recoverable through"`**: the longer string wraps mid-phrase in two of
the four files and returns 2. **Three of the five surfaces in this class wrap mid-sentence**, and
this session's first count came back one short from exactly that, twice, before being corrected.
The generalisation is worth more than the count: **for this claim class, single-line `grep` is the
wrong instrument.** Use `grep -rzoP "...\s+..." src/app --include=*.tsx -l`, and treat any plain
`grep` count as a lower bound. ([[claim-class-grep-truncated-enumerate-remainder]], and a live
demonstration of why that memory says never carry a count forward without re-deriving it.)

### Nothing ruled
No rebirth amount entered any card (ledger **Q5**'s open half is untouched: 112 / 145 / 130 / 165 /
`100 + karma * 2` / `atp_history` all unmoved, no branch endorsed). The 0.5 wording is the
five-surface verbatim, so it asserts no endpoint in either direction ([[trust-05-endpoint-canon-conflict]],
ledger **Q1**). **Q3**, **Q8** requests 2-3 unchanged.

### Still open, for the next session
- `/atp-economics`'s own end-of-life caveat (that page defines a real ATP = 0 death). Unchanged, and
  it is now the largest logged item in this class.
- Aug-09 LOWs: `raw x CI^2` placement (check what the visitor actually read: it is already inside an
  opt-in `<details>`), /tldr vs /running-now tag tiers, "no live network" reconciliation placement,
  nav visual weight. Unanswered Q3 / Q5 / Q6.
- The pre-push cite check proposed by #529 (read `git diff --numstat`, flag only cites pointing into
  files the commit itself touches). Not attempted here.
- The remainder of the Q8 definitional sweep on pages this session did not open
  (`/lct-explainer`, `/your-internet`, `/identity-constellation`, `/learn`, `/day-in-web4`,
  `InteractiveWireframes.tsx`, and the `/first-contact`, `/glossary`, `/atp-economics`,
  `/how-it-works` rows).

**Cites**: every cite this session authored into `/why-web4`, `/how-it-works` or the ledger names a
`grep` target rather than a line number, since this branch modifies all three
([[cite-invariant-diff-aware-not-lint]]). `npm run build` green. No em dashes added (`grep -c` is 0
on both edited pages, and `u2014` is absent).

## Aug-09 15:00 session - the fence that named two of the models it already knew about

**No fresh log** (today's was triaged at 09:00 by #528; its HIGHs and MEDIUMs are discharged).
This session took the residual that session **logged and bounded out**, and found the fix had
a wider blast radius than the note said.

### The residual, and why it was worse than logged

#528 rewrote `LifecycleDemo`'s rebirth caption to state the model outright (*"she restarts at
112 energy, the usual 100 plus a 12 karma bonus"*). That made `/how-it-works` a **two-model
page**: base-plus-bonus in the demo at the top of `#journey`, intact balance (145 -> 145)
further down. The 09:00 note said *"Both are individually caveated"*. **The demo is not.** The
component is 280 lines and contains zero fence text; the fence for that exact figure lives on
`/first-contact` (`grep -n "About that number" src/app/first-contact`). So the page showed two
models, fenced one, and said nothing about
the other being a choice at all.

### The fence disclosed two of the three models this track had already recorded

`EndOfLifeCaveat` (rendered twice) fenced the amount as *"whether you keep your whole final
balance or a reduced portion of it"*. That dichotomy reads as exhaustive, and the ledger's own
**Jul-30 table in Q5 records three models**, the third being `/karma-consequences`'s
`100 + karma * 2`, which is the shape the demo above now visibly uses. A fence can be honest
about uncertainty and still under-count it. Widened to three branches, in this page's own
vocabulary (**+8 words**, on a component that renders twice), plus a **44-word** fence under the
demo propagated from the caveat's own phrases, pointing by **prose**: the page has no anchor
between `#journey` and `#two-ways-to-die`, and the karma examples have no id
([[check-what-renders-at-the-anchor]], inverted - here the anchor does not exist yet).

### The cross-page pointer became false when the demo got its caption

`/karma-consequences` told the reader *"the lifecycle walkthrough models it the other way,
carrying the balance forward intact"* and linked `/how-it-works#journey`. Since #528 that
anchor **opens** with the demo, which models it that page's way. Narrowed to *"the lifecycle
walkthrough's karma examples"*. Two words, and the sentence stops being wrong about its own
target. Worth recording: this is a fix in one PR sharpening a seam in another page's prose,
found only by reading the destination.

### The two surfaces the proposal missed, both found by the policy reviewer's own grep

- **`/glossary`'s Rebirth definition card** (`grep -n "is what follows the recoverable kind"
  src/app/glossary`) still read *"a portion of your final ATP carries forward as karma"*,
  stated flat as the **definition** of rebirth, four lines above a link into
  `/how-it-works#journey`. That is verbatim the framing `/how-it-works` **removed on Jul-30 as
  falsified by its own next line**, logged as removed in the ledger, and the last live instance
  in the repo. The `/what-could-go-wrong:253-256` guard that fixed this class named
  `first-contact`, `how-it-works`, `glossary` as canonical and never swept it
  ([[guard-comment-names-the-un-swept-page]], now four for four). Replaced with the
  track-record framing `/how-it-works` already ships verbatim. **No fence added**: a
  definitional card names the term, it does not illustrate an amount, so it has nothing to fence.
- **`/atp-economics:2264`** ships `agent.reborn(karma=agent.atp_history)` in pseudocode - karma
  as the whole ATP **history**, a **fourth** shape, on the page already logged as having no
  caveat. **Recorded in the ledger, not fixed.** Anywhere Q5 said "three models", it now reads
  "at least four".

**Nothing was ruled.** No figure moved (112 / 145 / 130 / 165 / `100 + karma * 2` /
`atp_history`), no branch endorsed. This widens a disclosure; Q5 is still the open question.
The `/first-contact` guard (`grep -n "Aug-09 visitor HIGH, second half" src/app/first-contact`)
was amended in place to record that widening an enumeration
is **not** re-syncing the sentence it forbids propagating, and that the divergence still holds.

### Deliberately not done
- **`/why-web4:3226-3232`** attaches rebirth to **trust** death (*"Recovery requires starting a
  new identity with karma"*), which `/glossary` and `/karma-consequences` call permanent and
  which `T3 >= 0.5` eligibility excludes. Higher severity than what was fixed here, and **not a
  one-clause job**: the same card's next paragraph carries *"a new identity is created by the
  same hardware (LCT)"*, the absolute class Q8 Ruling 1 and #525 constrain. Two entangled claim
  classes in one card. Logged in Q5 with file:lines. **Take this next.**
- `/atp-economics`'s own end-of-life caveat: still the logged larger job (that page defines a
  real ATP = 0 death).
- Aug-09 LOWs: `raw x CI^2` placement (note: that sentence is already inside an opt-in
  `<details>`, so re-check what the visitor actually read before treating it as prominence),
  /tldr vs /running-now tag tiers, "no live network" reconciliation placement, nav visual
  weight. Unanswered Q3 (the 0.50 endpoint escalation), Q5, Q6.

### Aug-09 21:00 addendum - the cite pass this PR was blocked on

The review blocked on one class: `/first-contact:519-525` was published **three times** as the
location of the *"About that number"* fence (here, the `EndOfLifeCaveat` guard, and the new
`#journey` fence comment), and all three had drifted by **+10, exactly this PR's own net
insertion into that file**. Third consecutive PR in the class, and this one had applied
*"name the target, don't number it"* to the cites it was **rewriting** while authoring three
fresh numbered ones in the same commit, pointing at the very file it was de-numbering.

Rule applied in both directions now. Every cite this branch authors or touches that points
**into a file this branch also modifies** names its target instead:

| was | now |
|---|---|
| `/first-contact:519-525` (x3) | `grep -n "About that number" src/app/first-contact` |
| `first-contact` guard `:505-518` / `:513-518` | its opening phrase / its closing line |
| `:479` (propagation record) | *"the Aug-08 guard immediately above this one"* |
| `:857-858` (base grant) | `grep -n "starts with 100, but the trust she built" src/app/first-contact` |
| `:1000 and :1210` (intact balance) | `grep -n "Life 1 → Life 2"` + `grep -n "Learning Across Lives"` |
| `/glossary:1253` (x2, here and in Q5) | `grep -n "is what follows the recoverable kind" src/app/glossary` |

The reviewer flagged `:1210` as pointing at a **130** figure rather than the `145 -> 145` the
sentence names; it did, and so did `:1000`. Both were wrong at the **parent** commit too, so
this was inherited drift, not only self-drift. `:479` and `:857-858` were likewise already
stale when #528 wrote them. Same for the two grep targets: they resolve today and will keep
resolving after the next pass shifts either file.

**Left numbered on purpose**: `/atp-economics:2264`, `/what-could-go-wrong:253-256`,
`/why-web4:3226-3232`. Those files are **not modified by this branch**, so the cites cannot rot
by its own diff, and all three were re-verified to resolve. The invariant is not *"never write a
line number"*; it is **no line-number cite into a file the same commit modifies**.

**Candidate scope for a later session**: make that invariant mechanical. Not a lint over
`path:NNN` (SESSION_FOCUS.md alone carries ~535 such hits from prior sessions, nearly all sound),
but a **pre-push check that reads `git diff --numstat` and flags only cites pointing into files
the commit itself touches**. Four PRs have now carried this defect; a grep in a checklist has
not stopped it.

**Known remainder, out of scope here**: the already-merged #528 section further down this file
still cites `:469`, `:479`, `:857-858` into `/first-contact`. Those are historical record from a
merged commit, not cites this branch authored, and rewriting merged sections is a separate pass.

## Aug-09 09:00 session - the caveat that could not produce its own number (Aug-09 both HIGHs + all 3 MEDIUMs)

**Fresh log**: `visitor/logs/2026-08-09.md`. Understanding "good", would return, would recommend
"with one warning". Two HIGHs, three MEDIUMs, five LOWs. **Both HIGHs are one defect, and the page
already shipped the fix three times.**

### The defect: a summary surface dropped the base

`/first-contact` Act 5 showed Alice dying at `ATP = 0` with a badge reading `+12 bonus`, and the
caveat under it fenced the number as *"whether you keep your whole final balance or a reduced
portion of it"*. The visitor did the arithmetic the site handed them: *"Her whole final balance is
zero. A reduced portion of zero is also zero. Neither of the two options the caveat offers can
produce 12."*

They are right, and the same page states the answer at **three** other surfaces: `:65` (ledger
data), `:188` (noscript step 7), and `:857-858` (*"112 ATP (everyone starts with 100, but the trust
she built carried forward as a 12 ATP karma bonus)"*), with the guard at `:452` stating the canon
outright. **The two surfaces the visitor actually read are the only two that dropped the base**
([[page-ships-the-answer-and-denies-it]]).

**HIGH #2 is what that omission cost.** Having read `/atp-economics` (*"new participants receive a
100 ATP starter grant"*), they concluded rebirth leaves a trusted agent **8x worse off than never
having joined**, inverting the card's own moral: *"the illustration argues against its own moral."*
It does not. **112 > 100.** Only the badge did. One omitted base grant turned a working illustration
into an argument against itself, which is the log's own structural finding: *"a summary surface
stating a rule more crudely than the detailed surface. The summaries are where the precision leaked
out, and summaries are what a first-time visitor reads."*

Fixed by **adding** a `112 total` badge (not swapping out `+12 bonus`, which `:469` refers to by
name) and rewriting the caveat onto the axis that can actually produce 12. Wording propagated from
`:857-858`. No figure moved, no model coined.

**Why the caveat was wrong is worth keeping.** That sentence was propagated *verbatim* from
`how-it-works`'s `EndOfLifeCaveat`, and the guard at `:479` records the propagation as deliberate.
But that caveat captions the **balance-carry** model (145 -> 145), and this card does not use that
model. Verbatim propagation still failed, because the **subject** differed
([[propagate-the-sentence-not-your-summary]], inverted). The divergence is deliberate and guarded:
`karma-consequences:726` and `atp-economics:1633` keep the balance-carry dichotomy, where it is
correct and actually instantiated.

### The 0.50 endpoint, on the page a guard had already named

`/how-it-works` carried `ATP > 0 + Trust > 0.5 + CI coherent` at **two** surfaces (`:351`, `:1222`),
which the visitor filed twice: every newcomer starts at exactly 0.50, so on a strict reading
**everyone is born not-alive**; and it drops the durability qualifier, so Alice's recoverable 0.48
reads as death.

This is the standing endpoint escalation. The ENDPOINT RULE at `first-contact:295-303` forbids
**both** directions and prescribes *"state strictly-below and stop"*, with **DELETE, not rewrite**
as precedent (#497). So it was **not** flipped to `>=`, and not phrased as *"not below 0.5"* either,
which is the `>=` side wearing a negation. Both restated as the **death rule**, propagating this
page's own `:732` verbatim (*"raw trust falls below 0.5 and stays there"*), which is the only
endpoint-silent form available and discharges the durability MEDIUM in the same clause.

Worth recording: `first-contact:296-297` named *"the retired aliveness engines"* as the contested
call, and this page went unswept for a month underneath that pointer
([[guard-comment-names-the-un-swept-page]], now three for three).

### The surface four passes missed, found by the policy reviewer

`src/components/LifecycleDemo.tsx:26,:87` captioned the rebirth *"reborn with a **surplus** (112
energy)"*. Two defects at once: **"surplus" is forbidden framing** under the standing
numbers-integrity guard on this exact figure (Alice dies at ATP=0 by exhaustion, earning 37 and
spending 137, so she spent *more* than she earned), and it showed the total with no base, the same
omission as the badge. It renders on **`/how-it-works:380`**, making that page a rebirth-number
surface carrying 112 *and* 145. The proposal missed it; the reviewer's independent grep caught it
([[prose-fixed-thrice-check-the-illustration]] - the prose was fixed twice and the component never was).

### MEDIUM #3 (three rebirth models): resolved by fix 1, not by new copy

The visitor counted three models and noted `karma-consequences`'s cross-reference reaches only
`/how-it-works`. Once Act 5 reads `100 + 12`, it shares a **shape** with `karma-consequences:696`
(`100 + karma * 2`), so there are two models, and the existing cross-reference names both. No new
sentence was authored. `first-contact` never states a karma *score* for Alice, so the visitor's
"should be 124" does not bind.

**Residual, logged and deliberately not taken**: `/how-it-works` now visibly shows 112 (the demo)
and 145 (the karma examples). Both are individually caveated and they are different illustrations
(Alice's arc vs generic karma arithmetic), but nothing on the page says so. That is a one-clause
job for a later pass, and it was bounded out per policy review rather than opening a four-page
reconciliation.

### Deliberately not done
- **LOW "what ended the 145 -> 145 lives"**: ledger **Q5**, escalated and fenced.
- **Unanswered Q3** (alive at exactly 0.50): the escalation itself. Visitors re-file it by design.
- **Q6** (5% fee on karma carry): unfiled canon question, not a copy call.
- LOWs: `raw x CI^2` placement, /tldr-vs-/running-now tag tiers, nav visual weight, and the
  "no live network" reconciliation placement. Noted, not taken.
- Pre-existing guard rot fixed in passing: `how-it-works:1099` cited `first-contact:396-399` for a
  guard that now lives ~60 lines lower. Replaced the integers with a grep target
  ([[guard-comment-cites-rot-name-the-target]]).

## Aug-09 03:00 session - four under-counts, two bugs (the /lct-explainer remainder)

**No fresh log** (03:00, before the 05:00 browse). The Aug-08 friction table is exhausted: the HIGH
and three MEDIUMs shipped in #525/#526, and everything left is fenced (#3/#7 = ledger Q5/Q2, #6 =
Q8 equity holding pattern, #9 = branding gate fired Jul-23, #10 = contested, and its current
ordering is itself a **Jul-1 HIGH fix**, so the literal suggestion would invert a treatment). What
was **not** fenced: #526 closed by enumerating, file:line, a remainder it deliberately did not
work, and flagged that this claim class had been under-counted three times running.

**So the session did the one thing that actually generalizes: it re-ran the recorded grep instead
of trusting the recorded list.** #526 enumerated 13 lines on `/lct-explainer/page.tsx`, the page it
called *"the big one, the page that owns the definition"*. The grep returns **39**. With `-i`,
**47**.

**The mechanism, which is the finding.** Four under-counts in a row were **four instances of the
same two bugs**, not four lapses of diligence:
- the recorded grep is **case-sensitive**, missing 8 sentence-initial `Hardware-bound` lines,
  including one in the *same data array* as a line that was on the list;
- the recorded grep is **per-line**, and cannot see JSX prose wrapped at ~100 columns
  (the "Token" clause of the name etymology, sitting inside the hero, wrapped across two lines);
- and a sixth blind spot no version of the grep ever caught: the pattern is anchored on
  `hardware-<suffix>` compounds, so **hardware as a bare noun or subject** is invisible
  (`keys in hardware`, `Hardware requires`, `Hardware attestation`, `rooted in physical chips`,
  `a presence your hardware proves`, `Web4 trusts what hardware proves`).

It happened **twice more inside this session**, both caught only by checking: my own "34" was an
eyeball miscount of terminal output, and the policy reviewer's `:1466` pointer was a line number
transcribed from a different `sed` window (the surface it meant is the Key-insight triad). Three
for three, one mechanism: **a number transcribed instead of derived.** The corrected grep is now
in the ledger, and so is the consequence: **the ledger no longer carries line numbers into this
file.** See the Aug-09 21:00 addendum below.

**21 surfaces fixed, and the shape of the fixes is the point.** Two are **pure deletions** where
the correct word was already sitting next to the wrong one: the Key-insight triad's Web4 line
drops four words because the *"Identity is: What witnesses verify"* row already ships that wording
23 lines above in the same block, and the *"energy budgets don't work"* sentence drops *"hardware-bound"* because the sentence directly before it already said *"Verified presence
is the foundation."* Four more are one-word swaps into vocabulary #525/#526 already shipped.
Nothing was coined. ([[density-guard-means-delete-not-caveat]],
[[propagate-the-sentence-not-your-summary]].)

**The `attackScenarios` panel was one surface, not seven cells.** The reader drives it with a
scenario selector, so the seven Web4 results are read consecutively, and **five** of them answered
*"why is Web4 safe?"* with *"hardware"*. Fixing only the two the grep could see would have left the
panel making the same move three more times. That is exactly visitor log line **120**, which is the
honest provenance for this whole slice: *"the site is more honest in its prose than in its examples
... Every place I found a gap, the prose already conceded it and the illustration did not."*
Two cells were **kept**, with the distinction recorded: `Device Theft`'s condition sits in a
**restrictive noun phrase** (*"Keys in TPM/Secure Enclave"*), so a software-only reader is not told
their keys are safe, whereas `Key Duplication`'s *"Keys hardware-bound"* was a **predicate about
Web4 keys as such**.

**One fix was invisible to every grep and found only by reading.** In the *"What Is an LCT?"*
informal definition, *"not a key file you store"* is the Web3 contrast, and it is false at the
software-only tier, where the key **is** a file. It sat between two lines that were on the list.
Replaced with the already-shipped *"not a username a server looks up"* from the "Token" clause.

**Honest about provenance.** The Aug-08 visitor did **not** file `/lct-explainer` as
self-contradictory; at log lines 62-65 they read it and came away with the *correct* model. This is
ledger-handoff work licensed by line 120, not fresh friction, and the session log says so.

**Fences held.** No ceiling number, no survival line, no at-0.50 claim in either direction. The
trust-scale explainer's do-NOT-reword guard was untouched. The older/cheaper-devices FAQ and the
`$50 phone` line are Q8-**equity** adjacent and were left alone. The ledger now states the KEEP set
as a **rule you can re-derive** (run the corrected grep, subtract the FIX table) rather than a list
of numbers, plus the ones carrying a reason beyond "tier-descriptive", including one tripwire: the
walkthrough's Minute 0:30 line is correct only because Minute 0:00 stipulates a chip.

**Open**: every other file in #526's remainder list. Assume the same ~3x understatement and re-run
the corrected grep, do not trust the enumerations.

### Aug-09 21:00 addendum - the three items this PR was blocked on

**1. The branch carried a blocked head.** This branch is based on `worker/4life-20260808-150110`
(#526), which had a live CHANGES REQUESTED against exactly the head this branch contains, so
merging here would merge #526 past its own block. #526's two items are now fixed on that branch
and it is **merged in** rather than rebased (force-push is hook-denied on this repo, so the
review's *"rebase this branch onto it"* is not an available shape; the merge is the deviation and
this is it stated). `origin/main` came in with it. Both `SESSION_FOCUS.md` conflicts resolved
append-both, newest section first.

**2. This PR reproduced the defect class it was documenting, at 55x the sampled size.** The review
found two stale cites (`why-web4:380`, `glossary:1642`). Checking the whole set found **55 of this
PR's 56 line cites into `/lct-explainer/page.tsx` were already stale**, each off by this session's
own net insertion (+51/-30) into the file it was enumerating. The one that still resolved did so
because it sits above every hunk.

That is the sharpest possible version of this session's own finding: the entry whose thesis is
*"a number transcribed instead of derived"* was **made of transcribed numbers**, and the KEEP list
whose stated job was *"so the next pass does not re-litigate"* would have sent that pass to ~25
wrong lines.

Rewritten to name targets, applying the invariant **no line-number cite into a file the same
commit modifies**:
- The FIX table's key column is now the `grep -n` anchor, not the line.
- The `attackScenarios` cells are keyed by **scenario name** (`Password Database Breach`,
  `Phishing Attack`, `Credential Stuffing`, `Man-in-the-Middle`, `Key Duplication`, and the two
  KEEPs `Device Theft` / `Insider Threat`). Those names are the data's own identifiers and do not
  move with edits at all, which is strictly better than a quoted string.
- The **KEEP list is no longer a list.** It is stated as a rule you can re-derive: run the
  corrected grep, subtract the FIX table, everything remaining on this file is tier-descriptive.
  Only the KEEPs carrying a reason beyond that are named. A list of 25 numbers could not survive
  its own session; a rule can.
- #526's `/lct-explainer` row in the section above is marked **SUPERSEDED**, since this session
  edited that file and worked the row out.

**3. A fresh instance of the same shape this PR was fixing, in a block it edited.** The lead at
*"Because LCTs are device-anchored and multi-witnessed, they resist forgery"* was softened here,
and the **first bullet under it** was left reading *"Keys exist only in secure hardware (TPM,
Secure Enclave, FIDO2), never exported"*: the universal, three lines down, stated harder than the
lead. Same predicate-about-Web4-keys-as-such shape as the `Key Duplication` cell this PR fixed,
and the exact opposite of the restrictive `Device Theft` cell it kept.

**Fixed** into the restrictive form, propagated not coined: the component registry already ships
*"chips ... that generate keys internally and never export them"* and the `Device Theft` verdict
already ships *"Keys in TPM/Secure Enclave"*. **KEPT**, with the reason recorded in the file and
the ledger: the *"Hardware attestation proves keys are in real chips"* bullet in the same list
says what hardware attestation **does**, the tier-descriptive class the ledger already excludes as
correct. The generalizable bit: **softening a lead puts every line under it in scope**, because a
bullet list inherits its lead's subject.


## Aug-08 15:00 session - the example that assumed the thing the site calls open (Aug-08 MEDIUM #4 + LOW #8 + the definitional half of the HIGH)

**Same log, second session.** `visitor/logs/2026-08-08.md` was triaged at 09:00 (#525: the HIGH and
two MEDIUMs). This session worked the residue that #525 itself wrote down as open.

### The one that matters: the illustration assumed the unsolved step

The visitor read `/atp-economics` (*"the most intellectually honest page on the site"*), then went
**back** to `/how-it-works` with a problem: *"'Life 1: The Novice' spends 60 ATP and earns 105. By
the rule I just read, a net gain of +45 can only come from commissioned work. So the site's
flagship worked example, starring a novice, quietly assumes the exact thing the site elsewhere
calls unsolved."* Their Honest Assessment generalized it into a **defect class**: *"the site is
more honest in its prose than in its examples ... The worked examples were probably written before
the caveats and never re-run against them."*

**Both halves were already on the site. Neither was at the layer the reader was standing on.**
- The channel-naming existed on `/how-it-works` only **inside the collapsed fold**, in a June-11
  parenthetical this same pass then deleted as redundant, while the **twin** illustration on
  `/atp-economics` carries it visible (`grep -n "How 60 spent becomes 105 earned"`).
- The open-question half existed only in that page's newcomer-solvency sentence
  (`grep -n "commissioned work is the channel that does" src/app/atp-economics`).
- So a skimmer of `/how-it-works` saw *"spent 60, earned 105, ended with 145"* and nothing else.

One visible paragraph now carries both, **propagated verbatim** from those two surfaces, so the
`/atp-economics` sync guard (`grep -n "If you reword either one"`) is honored rather than tested. The policy
reviewer's condition drove the shape: **both halves visible or neither**, because naming the
commission channel at the skim layer while leaving the open question in the fold would have made
the skim layer assert the unsolved step *more* loudly than it did before.

Two consequences worth keeping:
- The fold's June-11 parenthetical became word-for-word redundant with a sentence six lines above
  it, so it was **deleted, not weakened**, and the block's net word count went down. Its guard was
  rewritten to say the job **moved up** rather than being dropped ([[opposite-intents-in-code-comments]]).
- The fold's summary (*"How did the Novice earn 105 ATP from 60 spent?"*) then read as the same
  question asked twice. Retitled, and the `/atp-economics` guard that **cites that exact string**
  (`grep -n "The quality ramp behind those"`) was updated in the same edit.

**No figure moved.** `60 / 105 / 145 / 130 / 165 / +45` propagate into Lives 2-3 and into
`/atp-economics`. Q13's fence held: no rate, no floor, no survival promise. The canon half stays open.

### The definitional half of the HIGH, and a grep truncated for the third time

#525 swept *"identity is hardware-bound"* out of the **argument** across 13 surfaces and logged the
**definitional** glosses as *"Open for a later pass ... a site-copy call, not a canon one."* Ruling 1
reaches them identically: `LCT-linked-context-token.md:39` §1.2 clause 1 (*"MUST NOT be excluded by
the protocol"*), and §1.3 defines **Binding** with no hardware term. A definition that says an LCT
*is* hardware-bound excludes a conformant tier by construction, and it is the tier a fresh
`hestia init` lands in.

**I proposed six surfaces. The policy reviewer's independent grep found roughly three times that**,
including the most conspicuous one: **`/lct-explainer` itself, including its `<title>`**. That is the
third truncation on this same claim (five became 13 at 09:00). So the scope was cut, per review, to
a **definition-of-record slice** with a falsifiable boundary: a surface is in iff its *job* is to say
what LCT or Web4 **is**, in a line or two, out of narrative context. Term registry, acronym index,
page `<title>`/meta/OG, glossary term cards, one-line manifest definitions, *"Shorthand: X just
means Y"*.

Shipped: `terms.ts` (LCT brief + explanation, Web4 explanation), `/glossary` (index row, Web4 card,
LCT card, Plain English line, the *"Web4 = ..."* one-liner), `/manifest`, `/lct-explainer/layout.tsx`
(all three slots), `/web4-explainer`'s opening LCT definition, `/why-web4`'s
*"2. Device-Anchored Identity"* card (body plus the `Shorthand: LCT` line it glosses), and
`/what-could-go-wrong`'s acronym-box LCT gloss.

Two additions to the reviewer's list, both inside the stated boundary and both because shipping
without them would have **authored a fresh contradiction**: the glossary's own Web4 and LCT term
cards (the acronym index would have disagreed with the card 60 lines below it), and the `/why-web4`
card body (fixing the *"Shorthand:"* line alone would have left it glossing a sentence two lines up
that still carried the universal).

Vocabulary is **propagated, not coined**: `terms.ts`'s Karma entry (#525) already splits *"anchored in
hardware"* from *"anchored in software alone"*, `/first-contact`'s trust-record line (#525) already
says *"anchored to a device"*, and `/why-web4`'s equity card already says *"what hardware buys is **ceiling**, not entry"*.
**Device-anchored** is the tier-neutral parent, **hardware-anchored** the strong form. No ceiling
number, no survival line, no at-0.50 claim in either direction entered any file.

**The remainder is enumerated file:line in the ledger**, with the grep command recorded and the
exclusion rule stated, and labelled a grep result requiring per-surface judgment rather than a
verdict. The next pass does not have to re-derive it, and it should not have to correct it a fourth time.

### The LOW that was reported wrong, and the report was the signal

Filed: *"the clarification that this means suspended standing, not deletion, is behind a spoiler."*
**It is not behind anything.** That clarification is a static `<p>`. What gated it in the reader's
head was its own bold opening label, *"Spoiler, so you're not left hanging:"*, on a page whose three
`<details>` elements all sit above it and look similar. The word advertised a widget
that is not there. The visitor's literal suggestion (*"immediately under it"*) shipped in the Jun-27
pass and Jul-14 confirmed it landed, so the residual was **framing, not placement**
([[visitor-deferred-low-check-shipped-first]]).

Label swapped to *"Suspended, not deleted:"*, which is one word shorter (the block already stacks
three paragraphs after #525's caveat) and puts the defusal **in** the label, which was the other
half of the suggestion. The sentence itself is byte-identical on purpose: `/how-it-works` quotes
it as the canonical `/first-contact` wording (`grep -n "standing is suspended" src/app/how-it-works`). The *"Die & Reborn"* card title stays; three separate
browses recorded the hook working as a hook.

### Deliberately not done, and why
- **#3** (what ends a life) and **#7** (*"stays below 0.5"* duration): ledger **Q5** / **Q2**, both
  disclosed on-site and escalated.
- **#6** (0.50 ceiling on `/why-web4`): Q8 **equity** half, holding pattern.
- **#9** (onramp word overload): gate FIRED Jul-23, operator branding call.
- **#10** (`/atp-economics` mnemonic ordering): contested and guarded (`grep -n "Attention Economics"`), no new signal.
- The `EndOfLifeCaveat` hoist follow-up (`grep -n "Do NOT hoist this component" src/app/how-it-works`):
  still open, explicitly a larger job.

### Aug-09 21:00 addendum - the two items this PR was blocked on

**1. The heading was the loudest text in the card this PR fixed.** `/why-web4`'s
`<h4>2. Hardware-Bound Identity` was left asserting the universal above the two lines the sweep
had just softened. Before the sweep the card was internally consistent and wrong; after it, the
heading contradicted the body directly under it. **Swept**, not KEEP-listed, because the
replacement needed no judgment call and no new vocabulary: the card's own `Shorthand:` line
already read *"your device-anchored identity"* **byte for byte**, so the heading is now
**"2. Device-Anchored Identity"**. Checked first that the old string has no inbound quotes
anywhere in `src/` or `docs/` (one hit, the heading itself), so nothing else had to move with it.
No ceiling number, no tier claim, no at-0.50 claim entered the file.

**2. Every cite in the remainder ledger was stale by exactly this PR's own insertion.** 6 of 6
sampled by the reviewer landed on the wrong line, each off by the PR's net insertion into that
file, and the same drift sat in the in-file comments (`atp-economics:1587-1590` was really
`:1589-1592`). The entry's whole stated value is that *"the next pass does not have to
re-derive it"*, so a ledger of ~35 wrong numbers **is** the re-derivation it was written to prevent.

Rewritten to name targets. The invariant applied, stated so it can be checked:
**no line-number cite into a file the same commit modifies.**

- **De-numbered** (files this PR edits): the remainder ledger's `/how-it-works`, `/first-contact`,
  `/why-web4`, `/glossary` and `/atp-economics` rows, all now quoted strings to `grep -n`; the
  shipped-slice list; the `atp-economics` <-> `how-it-works` sync guards **in both directions**
  (the reciprocal cites on `/atp-economics` had been broken by this PR's edit to `/how-it-works`
  and were not in the review's list); the `glossary` four-surface comment; the `terms.ts`
  vocabulary guard; the `what-could-go-wrong` acronym-box guard; the `first-contact` label-swap
  guard; and this file's own copies of all of the above.
- **Left numbered on purpose**: `/lct-explainer/page.tsx`, `/your-internet`,
  `/identity-constellation`, `InteractiveWireframes.tsx`, `/learn`, `/day-in-web4`,
  `/trust-tensor`, `/tldr`, and the upstream `LCT-linked-context-token.md:39`. This PR does not
  modify any of them (it touches `lct-explainer/layout.tsx`, not its `page.tsx`), so nothing here
  can rot those numbers, and de-numbering them would be a different job. The ledger now says
  which list is which and why.
- One target named as **deleted** rather than repointed: the June-11 fold parenthetical at
  `how-it-works:1075-1077` no longer exists, this pass removed it, so the guard quoting it now
  says so instead of pointing at whatever occupies those lines today.

**This branch also needed `origin/main` merged in.** #528 landed on `main` after this PR opened
and conflicts with it in `SESSION_FOCUS.md`. Resolved append-both, newest section first. Worth
recording: `git merge-tree --write-tree origin/main <branch>` reports this (exit 1), while the
deprecated 3-arg `git merge-tree <base> <a> <b>` prints conflict markers and **still exits 0**,
which is how a "0 conflicts" check passed on a branch that does not merge. Same shape as the
`reviewDecision` false-clear: the artifact stood in for the check.

## Aug-08 09:00 session - the one sentence the site would not hedge (Aug-08 HIGH + 2 MEDIUMs)

**Fresh log**: `visitor/logs/2026-08-08.md`. Understanding "good", would return, would recommend
*"with one warning"*. One HIGH, seven MEDIUMs, three LOWs. The HIGH is the **same defect already
recorded as an open follow-up** in `docs/WEB4-CANON-QUESTIONS.md` from the Aug-07 sessions, filed
independently by the visitor before the sweep ran.

**The defect**: `/karma-consequences` asserted *"In Web4, identity is hardware-bound ... Bad actors
can't escape their history"* flat, with no caveat, as the premise of its whole no-fresh-start
thesis. `/why-web4` and `/lct-explainer` both say software-only identity is supported, and
`/what-could-go-wrong:757` says the opposite outright (*"a dishonest user's record sheddable"*) on
a page filed under Going Deeper, which nav puts *below* Core Concepts. The visitor's read of why
this was the worst kind of defect on this particular site is the part worth keeping: *"On a site
that hedges everything, an unhedged absolute reads as a deliberate signal that this one is settled
... I did not catch this by being clever. Any reader who reads more than one page will hit this."*
They closed by saying they would tell a friend to read `/what-could-go-wrong` **before**
`/karma-consequences`.

**Not a hedge, a change to what the page argues.** Grounding is upstream, not just cross-page:
Q8 **Ruling 1** (2026-08-05) settles that software-only anchoring is conformant and that canon
*forbids* protocol-level exclusion of the tier (`LCT-linked-context-token.md:39` §1.2 clause 1,
*"MUST NOT be excluded by the protocol"*). So the universal was **false**, not under-hedged. The
thesis is now scoped to the hardware tiers, and the exception is handed to the reader.

**The recorded list of five surfaces was a truncated grep; the class ran to 13.** Missed by the
ledger note *and* by the policy reviewer's own grep: `/karma-consequences:793` and `:798` (the
"Web4 Solutions" bullets), `:420-421` (the emerald panel), `first-contact:367`, `:370`, `:960-961`,
`glossary:551-558`. `first-contact:960` was the decisive one: the same false universal, in the same
problem/solution shape, on a page **earlier in the five-page reading path**, so the default reader
met it first.

**Three things this pass got right only because it checked, and they generalize:**
- **The propagated sentence was anaphoric.** `what-could-go-wrong:757` opens *"the very gap that"*,
  whose antecedent is the device-loss paragraph above it *there*. `/karma-consequences` had **zero**
  occurrences of "software-only", "Sybil", "ceiling" or "FIDO2". Carried alone it would have
  dangled. Shipped the self-contained unit `:752-759` instead.
  ([[propagate-the-sentence-not-your-summary]], and the destination-vocabulary check from
  [[borrowed-word-means-something-else-there]].)
- **The illustration has two halves.** Qualifying the caveat panel (right column) would have left
  the `identityBound` boolean printing a flat green **"Yes"** in the left column. Both got the fix.
  And `issues: []` was **load-bearing**: the render branches on `issues.length`, so putting the
  honest text there would have deleted the "Why This Works" panel and printed a red "Attack
  Vectors" header, overshooting into false parity with Twitter.
  ([[prose-fixed-thrice-check-the-illustration]].)
- **Two surfaces took DELETION, not a caveat.** `first-contact:367`/`:370` sit in a
  default-collapsed 4-card grid before the Start button, under a standing no-reword guard whose
  rationale is *density* (Jul-13 vocab wall; Jul-17 filed the pre-Start caveat pile-up as LOW).
  Ruling 1 does not reverse a density guard. So: absolutes removed, premise scoped, **nothing
  added**, card is shorter. The guard got an addendum saying a gloss was narrowed for correctness,
  not reworded for style, so a later pass does not read it as violated.

**Also shipped, both from the same log:**
- **MEDIUM**: the karma-carryover disclosure now lands at `/first-contact`'s `+12`, the first place
  a reader meets a carry-forward number. Three pages model it three ways and only `/how-it-works`
  (page 4 of 5) disclosed the rule is unsettled. Karma half of `how-it-works:61-64` only; the death
  half is ledger Q5 and is not that card's subject.
- **MEDIUM**: R6/R7 added to the glossary acronym index. This one was **not** the gap it looked
  like. Routing already shipped in Jul-24 (`/onramp` deep-links `#r6` twice; both cards define the
  terms well), and the index omission was a **deliberate, twice-recorded** call. So this is a
  reversal, argued on the Jul-28 MCP/RDF precedent (*entry-level by position in the reader's path,
  not research-tier by subject matter*) because `/onramp` step 1 instructs the reader to learn
  R6/R7. **Both** guard comments rewritten to record the reversal
  ([[opposite-intents-in-code-comments]]). Jul-17 had already called `/onramp`'s R6/R7 "naked", so
  this was a recurrence.

**Deliberately not done**, and why:
- **#3** (what ends a life) and **#7** ("stays below 0.5" duration) are ledger **Q5** and **Q2**.
  Both already disclosed on-site; the divergence itself is escalated. The visitor is right that
  the silence is conspicuous, and that is exactly what the escalation is for.
- **#4** (Life 1 nets +45, which needs the commission the site calls unsolved) is ledger **Q13**,
  taught at `/atp-economics#newcomer-solvency` (#518). The *illustration* half may be a fresh
  angle; noted, not taken, because the Complete Example was just worked in #521.
- **#6** (0.50 ceiling framed only as a growth limit on `/why-web4`) is the Q8 **equity** half,
  under an explicit holding pattern. **No ceiling number, no survival line, and no at-0.50 claim in
  either direction entered any file this session.**
- **#9** (onramp word overload) - gate FIRED Jul-23, operator branding call. The visitor says
  `/tldr` defuses it, which it does.
- **#8**, **#10** - LOW.

**Open for a later pass**: `src/lib/terms.ts:33` glosses LCT as *"Your hardware-bound proof of
verifiable presence"*, and the acronym index at `glossary:~160` glosses it *"hardware-rooted
identity"*. Those are **definitional** claims about LCT rather than the no-fresh-start argument, so
they were left out of this sweep on purpose, but they are the same shape and Ruling 1 touches them.
Not filed as a canon question: it is a site-copy call, not a canon one.

**Ledger**: the "identity is hardware-bound" follow-up is marked **DISCHARGED** with the final
13-surface list. Q8 requests 2 and 3 remain open and still need Q1.

## Aug-08 03:00 session - the third edge, and why it is not there (Aug-07 `/onramp` LOW = Unanswered Q3)

**No fresh log** (session ran at 03:00, before the 05:00 browse). Aug-07 has now been worked four
times. What remained was four LOWs and two Unanswered Questions. Took the `/onramp` item because
the visitor filed it **twice**, once in the friction table and once as Q3, and told us the
smallest possible answer would close it: *"Even 'not built yet' would close it."* `#seams` shipped
exactly two cards (hestia-to-hub, hestia-to-hardbound) and no page anywhere named the third edge:
`/hub:65` and `/hardbound:181` only list the three scales, and `/hardbound` points at `/onramp`
for how they fit together.

**The answer is "there is no seam", and the interesting part is how nearly it got mis-sourced.**
The hub's planning docs discuss hardbound at length and every one of those lines was excluded on
policy review, each for its own reason:
- `V2-V3-ARCHITECTURE.md:60` files "Hardbound integration deep-dive" under *"Out of scope
  entirely"*, which reads like a product decision and is not: the header at `:44` scopes that list
  to **that document's MRH**, and the same file states the relationship affirmatively at `:37` and
  `:157`. [[canon-section-may-be-stale-check-audits]] one genre over: read what the *section
  header* scopes before quoting a bullet under it.
- `PRD.md:124` ("federation is opt-in, not in MVP") is half-superseded by its own file's PARTLY
  SHIPPED note; `:69`'s separate-track clause is about the *hardbound* policy engine, while hub
  law is machine-enforced hub-natively today. Either would have put a false dependency on the page.
- `SPRINTS.md:186` ("inter-society primitives shipped") over-reads its own code. `state.rs:517`
  makes `request_intro` a **member-to-member** introduction inside one society, and `rest.rs:2513`
  documents `/.well-known/web4-hub.json` as shape-matched to `hestia::hub::HubInfo` so
  `hestia hub connect` can deserialize it, i.e. **member-to-hub** discovery, with every in-repo
  consumer client-side. I caught this one myself after the first review; it would have shipped a
  federation capability that does not exist.
- `../hardbound/docs/ip/` is patent-prosecution material that names the private **dev-hub**
  by name. Never read that directory into site copy ([[dev-hub-is-private-never-link]]).

**What grounds the card instead is code, all of it re-runnable**: `grep -ril hardbound
--include=*.rs --include=*.toml` over `web4/hub` returns **nothing** (source, not repo, the docs
do mention it); `hestia/hardbound-pak/rust/Cargo.toml` ships hardbound's *public trait surface* as
a crate **inside hestia**, which is exactly why the neighbouring card is a real interface and this
one has no counterpart; `hub-daemon/examples/join_client.rs` joins with `member_lct_id` +
`member_pubkey_hex` in a signed envelope over plain HTTP, and the hub *pins* that key on
admission.

**The correction that improved the argument.** The draft said members reach a hub *through
hestia*. Policy review found `join_client.rs`: no hestia in the join path at all. The accurate
form is stronger, not weaker: the hub **keys on an LCT and a signature and does not care what
holds the key**, which is precisely why a hardware-anchored member is not excluded. What the hub
lacks is verification of the class, not accommodation of it.

**What shipped** in `/onramp#seams`, as a new `#hub-and-hardbound` block plus one clause in the
section intro so the heading's promise covers a named absence:
- there is no hub-to-hardbound code path, and why hestia's edge is different;
- the membership answer, scoped **to the hub as it stands today** every time it leans on
  `constellation.rs:100-105` (device class is *owner-committed pre-challenge*, stronger than a
  presenter label and still not a measurement; `hardware_evidence` verification is named and
  unbuilt), closed in the site's own accepted-limit shape rather than "not built yet", which with
  any roadmap citation implies a schedule;
- the federation answer, which **the site already had and never routed here**:
  `running-now:427-428` propagated verbatim (`/hub:197-198` carries the same claim), Spec-tier,
  "specified but not yet built".

**Filed, not fixed**: `/identity-constellation:516-517` asserts *"Each device proves its key came
from genuine hardware"* as an accomplished general fact. The hub's own implementation records
owner-committed device class with verification unbuilt. Not a contradiction of the new `/onramp`
text (which is scoped to the hub), but the page states a protocol aspiration in the present tense.
Its own item, needs its own pass.

**Contested, deliberately not taken**: the `/tldr` badge-key LOW ("names three tiers, defines
two"). The guard at `tldr/page.tsx:132-134` records a deliberate invariant, that the local gloss
stays a **strict subset** of the `/running-now` legend so the two cannot drift, and no piece on
`/tldr` is badged Spec. Defining Spec locally would break an invariant three visitor rounds
converged on. Do not "fix" this without retiring the invariant on purpose.

**Still open from the Aug-07 log**: three LOWs (`/first-contact` pre-Start disclaimer stack,
`/learn` time estimate, `/tldr` badge key as above), and Unanswered **Q4** (what the 0.50-ceiling
tier experiences day to day, which needs a frequency claim nothing in the repos measures). Plus
the standing "identity is hardware-bound" five-surface follow-up.

## Aug-07 21:00 session - dead where? (Aug-07 Unanswered Q5, plus the answerable half of Q6)

**No fresh log.** The Aug-07 browse was worked twice already (09:00 took the HIGH and all three
MEDIUMs as #521; 15:00 took the karma-tier orphan as #522). What was left was four LOWs and four
Unanswered Questions. Took **Q5** because the visitor's own Honest Assessment names the defect
class and Q5 is its purest remaining instance: *"the site is excellent at disclosing each fact and
inconsistent at joining two of them."*

**The seam, and it was on one page.** `/how-it-works` states that a penalty is *"society-specific,
not global"* in the plagiarism walkthrough at `:1606`, and states trust death as *"permanent, a
destroyed reputation can't be reset"* at `:725` with **no scope at all**. The visitor put those two
side by side and asked: if I suffer trust death in one society, am I dead everywhere? `/lct-explainer:1160`
has the same unscoped shape (*"can no longer act at all"*), which is where their Q6 formed, sharpened
by the fact that the paragraph above it gives **energy** death an explicit *"same LCT, same history"*
and gives trust death nothing.

**The lesson of this session is the fix that policy review rejected.** The obvious clause was
*"trust death is society-specific, not global"*, and canon appears to hand it over: four separate
places say **there is no global reputation, all reputation is role-contextualized**
(`r6-framework:76`, `r7-framework:86` and `:252`, `reputation-computation:86`), and
`SOCIETY_SPECIFICATION` §2.3/§4.2.1 makes citizenship a per-society status machine whose
`terminate` is a society-ledger event. Shipping that clause would have been wrong twice over:
1. `mcp-protocol.md` §7.5 makes cross-society reputation propagation **normative** (a per-action
   `propagation_scope` enum, plus a society-society tensor accumulated at the encompassing
   society). Consequences cross borders. What does not cross is a shared *score*.
2. The site's **own** DUI clause says the opposite of "stops at the border": the glossary Society
   Ejection card and `first-contact:933` both say an ejection *"is visible globally, affecting how
   other societies perceive you"*. The draft had quoted the first half of that very card as
   support and stopped one clause short of the refutation. [[grounding-citation-may-contradict-you-nearby]],
   caught by the reviewer rather than by me.
- A near-identical trap sat next to it: `reputation-computation.md` §10 files "Cross-Society
  Reputation" under **Future Evolution**, which reads like negative confirmation that propagation
  is unbuilt. Upstream's own audit `C123-reputation-computation-3rd-delta-2026-07-01.md:116`
  records that framing as **STILL OPEN** and stale against §7.5. Citing it would have been
  falsified by upstream's tracker, the same failure mode #521 recorded one week earlier.
- **The rule that generalizes**: when canon looks like it hands you a clean absolute, check
  upstream's audit trail for that section before quoting it, and read the *site* sentence you are
  citing to the end of the card.

**What shipped**, deliberately two-sided rather than clean:
- `/how-it-works#two-ways-to-die` gets a new paragraph **below** the guarded pair: trust is never
  one universal number and each society keeps its own view (linked to the walkthrough's own
  society-specific line, which now has an id, `#plagiarism-walkthrough`); what crosses a boundary
  is the **record, not the verdict**; whether that ever amounts to trust death elsewhere is **not
  settled**; and neither death erases you.
- `/lct-explainer` answers Q6 at the sentence that caused it, by propagating `first-contact:834`
  **verbatim**: *"Your history persists either way."* Not sourced from this page's own `:1121`
  (*"a permanent reputation is not a permanent lockout"*), which read in place is about the
  all-devices-lost recovery path and carves out software-only, so it would have meant something
  else here.
- Escalated as **ledger Q15**, with an explicit "why this is not Q4, Q5 or Q14" paragraph (Q4: may
  a predicate exist; Q5: is there a third cause; Q14: what score is it read against; Q15: how far
  does the result reach).

**Untouched on purpose**: the guarded two-ways-to-die sentence and the `lct-explainer:1160` variant
(both thread ledger Q1); the 0.50 endpoint, in either direction; anything about *what* ends a life.

**Still open from the Aug-07 log**: four LOWs (`/first-contact` pre-Start disclaimer stack,
`/learn` time estimate, `/onramp` hub-to-hardbound seam, `/tldr` badge key naming three tiers and
defining two), Unanswered Q3 (= the `/onramp` LOW) and Q4 (what the 0.50-ceiling tier experiences
day to day). Plus the standing "identity is hardware-bound" five-surface follow-up.
## Aug-07 15:00 session - the word six pages used and none owned

**No new visitor log** (the Aug-07 browse landed at 05:11 and was worked at 09:00). This session
took the follow-up that pass **filed and explicitly declined to fix**, in the ledger and in its own
guard comment at `karma-consequences:842`: *"it does not define 'karma tier' ... deserves its own
policy-reviewed pass"*. The visitor filed it twice, as half of a MEDIUM and as Unanswered Question
2: *"What is a karma tier? `/first-contact` says effective trust sets one. No page I read says what
tiers exist or what they get you."*

**The term was an orphan, and the site was its only source.** The clause *"effective trust (raw x
CI^2) sets your karma tier, not whether you live"* rode the verbatim-locked survival sentence on six
surfaces and was defined on none. `grep -rni karma` over `../web4/web4-standard/` returns **zero**;
`docs/SPRINT.md` #14 lists karma canonicity as a deferred, operator-design item, so canon is not
acquiring one either. `first-contact:418`'s own guard sourced the phrase to *"karma-journey's
karma-tier model"* - a route retired in the Jul-15 rebuild. `/karma-consequences`, the only page
that could own it, has a flat `karma_multiplier = 2` and no tiers. Defining tiers would have
invented a model to justify a word.

**Fixed by propagation, not deletion, because the tail was load-bearing.** Its job is to stop a
reader computing `raw x CI^2` and comparing the product to 0.50 - the Jul-28 HIGH. The site already
shipped the correct positive half one line below the orphan, at `coherence-index:1365`. That
sentence is now the canonical tail on all six surfaces:

> The number compared is **raw** trust, not effective trust (raw x CI^2). A lower CI raises your
> costs and narrows your access; it does not push you toward trust death.

Zero new prose was authored for the six surfaces. `coherence-index` was a deletion-only surface.

**Three things policy review caught, and the second is the session's real lesson.**

1. **The filing's "five pages" was a truncated grep.** Sweeping the *claim* rather than the phrase
   found a sixth at `first-contact:309`, inside a `<details>` phrased with Alice's name.
2. **My first replacement clause was false, and I had cited its own refutation as grounding.** The
   draft read *"effective trust sets what your actions cost and what you can do right now"*. Cost is
   `1/CI^2`, a function of **CI alone**; effective trust is `raw x CI^2`. Raw 0.6 and raw 0.9 at CI
   1.0 differ in effective trust and have **identical** cost. The site is deliberate about this
   (`coherence-index:249-252`, *"the same coherence factor working in two directions"*): CI is the
   **common cause** of both effects. My clause would have inverted that into a parent-child relation
   and shipped the newest wrong number-claim on the site. This is the #521 lesson recurring one
   level up: I checked that the replacement *sounded* like the shipped sentence instead of computing
   whether it followed from the shipped formulas. **When propagating a claim, propagate the
   sentence, not your summary of it.**
3. **A seventh surface asserted the exact opposite, and it was on the page I cited as grounding, two
   lines below the line I cited.** `web4-explainer:159-161`: *"In 4-Life, CI determines whether an
   entity remains 'alive' - drop below the coherence threshold and the society rejects you."* It
   contradicted all six surfaces **and** asserted a mechanism the site does not have:
   `grep -rni "coherence threshold"` over `src/` returns only that line, `coherence-index:1429`'s
   *configurability* statement, and the `glossary:967` block fenced *"not part of the Web4 ontology"*.
   This is the Jul-28 HIGH's failure mode stated outright in prose rather than left to arithmetic.

**The seventh surface was a DELETE, and policy review overruled my proposed replacement.** I wanted
to swap in the canonical clause. That page never mentions the survival line, 0.50, trust death, or
raw trust (every other `0.5` hit is CSS `0.5rem`) and does not link `/coherence-index`, so the clause
would have arrived as three undefined nouns and manufactured the cross-page arithmetic gap it exists
to close. Worse, I had already trimmed a word to avoid a stutter, which would have made it a
**seventh bespoke phrasing** of the clause this pass exists to unify. That stutter was the tell.
Deleted per the #520 precedent **on this same page**: removing a false claim asserts nothing in its
place. The deliberate non-propagation is recorded in a guard so a later pass does not read the gap
as an oversight and install the eighth variant.

**Guards swept 2 to 6, plus stale refs.** Four guards still said "keep verbatim" while pointing at
the pre-edit wording, which is how a fix gets reverted by the next propagation pass. All six now
carry the change. Corrected in the same pass: `glossary ~1191` to 1211 and `how-it-works ~608` to
731 (cited from two files), `karma-consequences`'s "five pages" to six, and `web4-explainer`'s
"In 4-Life" family enumeration, whose L137/L171 were both off by +22 and whose count of seven is now
**five**. `first-contact:418`'s dead `/karma-journey` citation was removed (comment only; the prose
it justifies rests on the live `/karma-consequences` model).

**`/karma-consequences:850` keeps its truncated copy** (stops at "a single stumble"). That page
never mentions CI, so the raw-vs-effective tail would disambiguate a formula the reader has not met
there. Now labelled intentional so it is not "completed" later.

**One follow-up added, not fixed**: the *other* deferred item ("identity is hardware-bound",
weakened by Q8 Ruling 1) has a **fifth** instance off `/karma-consequences`, at `src/lib/terms.ts:178`
- the widest-reach surface of the four, since `TermTooltip` carries it wherever `<Karma>` appears.
Recorded in its ledger entry so that scoped pass starts complete.

**Still open from the Aug-07 log**: the four LOWs (First Contact disclaimer stack, `/learn` estimate
vs `/why-web4`'s 68 questions, `/onramp` hub-to-hardbound, `/tldr` badge key), and Unanswered
Questions 3-6.
## Aug-07 09:00 session - the arithmetic the site handed the reader and would not finish

**Fresh visitor log** (`visitor/logs/2026-08-07.md`, 12 pages, understanding "good", all seven
checklist items). This is the most useful browse in weeks, and the reason is worth recording: the
visitor **withdrew two findings mid-session** after discovering the site had already shipped the
answers, and said so. What survived is one finding of a kind we have not had before.

**The HIGH is not a contradiction, it is an entailment.** No two pages disagree. The visitor took
the decay half-lives from `/trust-tensor`, the survival rule from `/how-it-works`, and did four
terms of arithmetic every number of which the site supplied: a 0.90/0.90/0.90 user, six months
away, lands at composite **0.4992**, below the line, with "and stays there" satisfied *by
construction* because that is what absence is. Their summary is the whole diagnosis: *"the site is
excellent at disclosing each fact and inconsistent at joining two of them."* They also noticed the
site had already had the thought, applied elsewhere: `/what-could-go-wrong` risk 3 says *"a scoring
error is a sustained condition by construction, so a wrongly-scored user is precisely the one who
stays below."* Absence is also a sustained condition. The page spotted the pattern for one case and
not the other.

**The near-miss that the policy review caught, which is the real lesson of this session.** The
first scope draft was going to reassure readers that canon's own defaults are far gentler than the
site's half-lives (§2.3 Training is -0.001/month, additive). That is true per *increment* and false
per *level*: `reputation-computation.md:679` aggregates onto a **0.5 neutral baseline** over a
90-day horizon, so a six-month-idle entity's base is ~0.5 before decay, landing near **0.44**, also
under the line. Publishing "the real spec is gentler" would have handed the next visitor a
falsification from upstream's own code. This is [[visitor-comparative-premise-check-both-sides]]
one level up: I checked the side of canon that supported the fix and not the side that refuted it.
**The rule that generalizes: when canon is about to be cited as reassurance, compute the reader's
scenario in canon's model end to end before quoting canon's parameters.**

- `/trust-tensor#decay-and-survival` (new anchor, next to the rates that generate the alarm) says
  the two things the site can defend: the 180d/30d half-lives are **4-Life's teaching calibration**
  (§2.3 licenses societies to configure exactly those two; only Talent's no-decay is invariant),
  and what happens at the line for an **absent** rather than **misbehaving** user is **not
  settled**, in the voice `/how-it-works` already uses. No dormancy rule invented, no composite
  reprinted, no conclusion drawn about being below the line.
- `/why-web4#faq-month-off` carries the same two clauses **at the point of reassurance**, where the
  visitor actually banked the six-month numbers. Also narrowed the absolute sitting four lines
  above the new clause: *"There's no 'hiatus' mechanism to freeze Training or Temperament"* stated
  as protocol fact the exact thing §2.3 hands to societies. An over-pessimistic absolute is still a
  wrong absolute, and this one would have foreclosed the fix landing beneath it.
- `/how-it-works` gets a **pointer only** plus a `#two-ways-to-die` anchor. Its two-deaths
  paragraph is guarded verbatim and threads ledger Q1; it was not touched.
- Escalated as **ledger Q14**, with an explicit "why this is neither Q4 nor Q5" paragraph (Q4 is
  whether a sim may model a death predicate; Q5 is whether a *third* mechanism exists; Q14 asks
  what score the *existing* predicate is read against). Canon's decay numerics live only there.

**The MEDIUM that was a missed surface, not a new defect.** `/why-web4:272` still read *"Creating a
new identity should require physical hardware"* - the claim Q8 Ruling 1 settled on **2026-08-05**
(§1.2 clause 1: an entity presenting only weak evidence *"MUST NOT be excluded by the protocol"*).
That pass swept four FAQs and a table row and missed the "What Would Actually Work" property list.
Swept as a **claim, not a sentence** this time, which turned up a second one: `lct-explainer:2231`
(*"can't create fake accounts cheaply if presence requires hardware"*) sits ~1950 lines below that
same page's guard at `:273` saying *"It does NOT imply hardware is required to participate."* A
page contradicting its own guard is invisible to a phrase-grep. Both now carry the true and
stronger form: accounts are cheap, **trust** is not.

**Routing, not absence.** `/why-web4`'s privacy section *recommends* software-only and disclosed
only the lower ceiling. The zero-margin consequence already ships at
`/lct-explainer#software-only-survival` and was already linked from `/hestia`,
`/what-could-go-wrong` and `/trust-tensor` - just not from the one place a reader is being **advised
to pick the tier**. One clause plus the existing link; strictly-below, no numbers moved.

**The page named for dying did not explain dying.** Two pages route to `/karma-consequences` for
"How living and dying work"; `grep "trust death"` over it returned **zero**. The appeals half of
that promise was already kept at `#recourse`; the two-deaths half now is, by **verbatim reuse** of
the canonical sentence (it threads Q1, so paraphrase was not an option).

**Two follow-ups filed, deliberately not fixed** (both in the ledger):
1. **"karma tier" is an orphan from the retired sim.** Asserted on **five** pages, defined on none;
   `grep -rni karma` over `core-spec/` returns **zero** - canon has no karma concept - and
   `first-contact:418`'s own guard sources it to *"karma-journey's karma-tier model"*, a route
   retired in the Jul-15 rebuild. `/karma-consequences` has a flat multiplier and no tiers. The
   likely fix (drop the rider from all five copies, keep the raw-vs-effective contrast) edits five
   verbatim-locked surfaces and needs its own policy-reviewed pass.
2. **`/karma-consequences` asserts "identity is hardware-bound" four times** as the load-bearing
   premise of its no-fresh-start thesis. Under Q8 Ruling 1 software-only identities are conformant
   and cheap to mint, so the argument is weaker for that tier than the page claims. Not a hedge:
   it changes what the page argues.

**Not done, noted**: the four LOWs (First Contact's four-layer disclaimer stack before the Start
button, `/learn`'s ~30-minute estimate vs `/why-web4`'s 68-question index, the unstated hub-to-
hardbound relationship on `/onramp`, `/tldr`'s badge key naming three tiers and defining two).

## Aug-07 03:00 session - the mode the site retired and canon did not

**No fresh visitor log.** This session ran at 03:00, before the 05:00 browse. The freshest log
(`visitor/logs/2026-08-06.md`) had already been worked three times: its friction table is exhausted
and its Unanswered Questions are shipped (Q3/Q4/Q5/Q6) or on the standing-escalation list
(Q1/Q2 = ledger Q1/Q8, endpoint-silent by policy; Q7 = operator call). So this pass took the one
thing the previous session **filed and explicitly declined to fix**, in its own guard comment at
`atp-economics:2457-2459`: *"web4-explainer:98 calls R6 'legacy' while r7-framework.md:7 says both
are canonical (that seam is a separate pre-existing defect, filed not fixed)."*

**The claim is falsified verbatim by canon, on both specs.** `r6-framework.md:9`: *"R6 and R7 are
**both canonical**. The choice is contextual, selected per action or per role based on consequence
tier. **Neither is deprecated.**"* `r7-framework.md:9`: *"**Neither replaces the other.**"* And
`r7-framework.md:15` gives the reason both modes exist: making every action consequential would
impose bookkeeping cost on routine tasks, making none would prevent trust evolution. R6/R7 is not a
version history, it is a **per-action choice**, and the site was teaching it as the former.

**Three surfaces, and the site's fourth was already right.** The correct gloss has been shipping at
`glossary:604-607` the whole time (*"R6 and R7 are both canonical: R6 is the default for routine
acts, R7 governs the consequential ones"*), alongside `onramp:119`, `the-standard:214-226` and
`navigation.ts:193`. So this was **propagation toward the surface that is already right**, reusing
its wording. No fourth phrasing was written; `the-standard:194-203` already forbids that by name.

- `web4-explainer:98` - *"R6 (legacy) and R7 (current)"*. The headline defect, and the reason #519
  had to file it: that pass cited **both** specs for one escrow lifecycle and could not do so while
  this page called one of them legacy.
- `terms.ts` `educationalNote` - *"R7 adds a seventh element (Reputation) in **newer
  specifications**."* Same supersession claim in different words, and this is the **widest-reach R6
  surface on the site** (`TermTooltip` renders it wherever `<R6>` appears). A phrase-grep for
  "legacy" walks straight past it. Fixed to name **both** modes: deleting the R7 clause outright
  would have left this surface R7-silent, which is the opposite failure.
- `manifest:50` - *"Every action is Rules + Role + Request + Reference + Resource, producing Result
  + Reputation."* The **opposite error on the same seam**: it erased R6 instead of deprecating it.
  Reputation as a first-class output is exactly what R7 adds and R6 lacks (R6 carries only implicit
  `tensorUpdates`, `r6-framework.md` section 1.6). One surface said R6 was dead, another said
  everything was R7, and neither could tell you what distinguished them.

**Two catches from policy review, both the one-of-two-twins shape.**
- `manifest/layout.tsx:6` is the metadata twin of `manifest/page.tsx:50` and was not in the
  proposed deliverables. It named `R6` alone, and advertised *"simulation parameters"* as a section
  of a page whose sections are Core Primitives / Core Claims / Assumptions / Known Failure Modes /
  The Onramp / Deep Resources / Research Status. Retired-sim residue. Both fixed.
- The guard at `atp-economics:2457-2459` is the comment that **filed** this defect. Fixing L98
  without it would leave a guard asserting a defect that no longer exists, which is how a fix gets
  reverted. Rewritten to record the resolution and to protect the dual citation. **Comment-only on
  that page: zero prose, zero figures.**

**`web4-explainer:120` was a DELETE, not a de-sim word-swap.** The sentence read *"In 4-Life, nearly
every **game** action (membership, treasury, audits, cross-society policies) is encoded as an R6
envelope before being written to the society's tamper-evident audit chain."* Every noun in it
belongs to the sim retired Jul-15. The tempting rewrite (swap "game" for "site") was blocked in
policy review and is **false**: the live site is a pure explainer and encodes nothing as an R6
envelope. Removing a false claim asserts nothing in its place; substituting a true-sounding one
would ship a new ungrounded claim. Precedent: #517's endpoint deletion, #497's `lct-explainer:1404`.

**Filed, not fixed (do not do this piecemeal):** `web4-explainer` carries a family of **seven**
*"In 4-Life, ..."* sentences (L43, L58, L74, L88, L120, L137, L171) sharing the same retired
referent. L171 (*"explicit MRH/LCT edges and R6-described events"*) is the closest twin to the one
deleted here. De-simming that family is its own pass, and it is genuinely hard: the page's existing
guard at L185-201 records that the obvious rewrite (*"the site has no simulations"*) is **also**
false, because `/first-contact`, `/atp-economics` and `/coherence-index` still ship simulator
widgets. Recorded in-code at the deletion site.

**Verification**: `npm run build` green. **Zero figures changed on any surface.** Em dashes: 0 added
(both the literal character and its backslash-u escape form swept in the diff). Supersession sweep across `src/`
(`legacy|deprecat|supersed|obsolete|newer spec|replaced by`) now returns **only guard comments
describing the fix**. 0 new files. 5 files modified.

## Aug-06 21:00 session - the reward on the channel that cannot pay one

Same log as the 09:00 and 15:00 sessions (`visitor/logs/2026-08-06.md`). Those two took the whole
friction table: 3 of 4 HIGHs (HIGH 4 is ledger Q1/Q8), all 3 MEDIUMs, 2 of 3 LOWs (LOW 1 declined
with reason). **The table is exhausted**, so this pass worked the Unanswered Questions, and the one
live residual was **Q6**: *"How do you get commissioned work at all? The mechanism that is the only
path to net-positive ATP is the one the site never walks through."*

**Q6 splits, and #518 already fenced half of it.** Its literal first clause is the question the
15:00 session deliberately left open at `atp-economics:814-816` (*"how someone with no track record
lands a first commission is an open question on this stack"*). What was never answered is the other
clause: what actually **happens**, mechanically, once work is commissioned. The site asserts
commissioned payment as the sole net-positive channel on at least six surfaces and shows the
outcome once (`how-it-works:1247`, *"Commissioner pays on delivery"*). It never said **when** the
commissioner's ATP is committed, which is the load-bearing fact: it is escrowed **before the work
starts**, against a release condition agreed in advance. That is what makes payment not a matter of
someone's goodwill afterwards.

**And the surface where that answer belongs was carrying a falsifiable claim.** The FAQ *"where does
that energy go?"* (`:2423`) enumerates three destinations. Bullet 1 read *"Actions (posting,
reviewing, helping): your ATP is held in escrow. If others confirm the work was valuable, you get it
back **plus a reward**."* Those are self-initiated acts, i.e. the **capped** channel:
`recharge = min( sum, ATP_cost )` at `:938`, glossed at `:945` as *"you can't profit on a single
action, only recover its cost"*. The trust-not-ATP defence fails on the page's own terms, because
`:1125` defines the word page-scoped: *"'Reward' here means payment for value delivered ... which is
why it can exceed the action's cost. Recharge of your own spend alone never does."* So the bullet
attached the page's own payment-channel word to the one channel that cannot pay it. **Fifth sitting
of this class** (Jun-11, Jun-12, Jul-30 simulator labels, Aug-06 #518 summary card); the file's own
boundary guard at `:56-63` puts any unqualified instance on this page in scope, and the FAQ was
simply never swept. Correction propagated from `:248` and `:955-961`. **No figure moved.**

So the two findings were one shape: **the FAQ put the reward on the channel that cannot pay one, and
omitted the channel that can.** Fixed as one edit: bullet 1 corrected to the capped truth, and the
commissioned channel added as its own bullet carrying only the **sequence** (lock before work,
stated release condition, settle on verified result, return on non-delivery). Deliberately not a
seventh restatement of the two-channel claim.

Grounding is `r6-framework.md` 1.5 / 2.1 step 6 / 2.3, `r7-framework.md` 185, 345-346, 521-525 (both
cited: `web4-explainer:98` calls R6 "legacy" while `r7-framework.md:7` says both are canonical, a
**separate pre-existing seam, filed not fixed**), and `atp-adp-cycle.md:635-641`, which sanctions the
escrow/lock state explicitly. Recorded in-code: **"commission" appears zero times in core-spec**, so
commissioner -> R6 `actor` and worker -> `resource_providers` is an **inference** consistent with
this page's own framing, not a canon term. Do not re-quote it as canon.

**Two fences, both from policy review, both load-bearing:**
- **The new bullet must never read as a "transfer".** The bullet directly below it asserts 5% on
  sending ATP to someone, and `how-it-works:1247-1266` prints Spend 15 / Paid 40 / **Net gain +25**.
  A reader applying 5% to that 40 gets +23 and the illustration is falsified. Canon 6.3 settles that
  there is nothing to reconcile: the protocol prescribes **no** fee, and *"any specific fee rates
  appearing in simulations, explainers, or demos (e.g., '5% transfer fee') are simulation parameters,
  not protocol constants"*. No third rate went in (`InteractiveWireframes.tsx:294` ships a 2-ATP
  escrow fee on 350; left alone).
- **The `#newcomer-solvency` link is mandatory, not decorative.** Without it the mechanism reads as a
  promise you will get commissioned, which is exactly what #518 declined to say. The bullet states
  the open half in its own words.

**The sequence already shipped, for a purchase.** `ESCROW_STEPS`
(`InteractiveWireframes.tsx:293-298`, rendered on `/day-in-web4`) walks lock-then-release-on-delivery
for buying a camera. So the gap was narrower than "never walks through" and the fix **links there
rather than re-narrating it**, naming the difference out loud. `#escrow-walkthrough` added at the
mockup itself: `#wireframes` was the wrong target, it lands the reader on a heading with four other
mockups to scroll past.

**Bonus, and it was a live rendering bug.** Five em dashes were shipping as `\u2014` escapes,
invisible to a literal grep: `InteractiveWireframes.tsx:77,198,284,294` and
`InteractiveMailDemo.tsx:31`. Four sit in JS string literals and rendered as real em dashes (hard
house-rule violation). **`:284` is in JSX text, where backslash escapes are not interpreted, so the
live site rendered the six literal characters `\u2014`** under the social-feed mockup. All five
replaced with commas/colons/periods. Grep for the escape, not just the character.

**Deliberately not touched:** HIGH 4 and Unanswered Q1/Q2 (ledger Q1/Q8, endpoint-silent by policy,
**expected to recur by design**), Q3/Q4 (ledger Q5), Q7 (operator call), LOW 1 (4th sitting, declined
with reason: printing "one instance" ships a false number against `running-now:285`). The R6-legacy
seam is filed above, not fixed.

**Verification**: `npm run build` green. Zero content figures added or changed on any surface (the
only digits in added rendered lines are Tailwind classes). Em dashes: **5 removed, 0 added** to
rendered text; the single added instance is inside a code comment quoting the string it replaced.
0 new files.

## Aug-06 15:00 session - the refill nobody promised, and a fix that landed on one of two twins

Same log as the 09:00 session (`visitor/logs/2026-08-06.md`). That pass took 3 of 4 HIGHs and 2 of
3 MEDIUMs; this one takes **the residual**: the last MEDIUM and the two falsifiable LOWs.

**MEDIUM 3, newcomer ATP solvency - the reason a "good" browse returned the ATP/ADP box unticked.**
Visitor: *"At -8 per quality post I get about twelve posts before I die. Nothing on the page tells
me how a newcomer with zero track record gets commissioned inside twelve actions, or whether there
is any floor or refill. I looked for it and did not find it."*

Read-it-and-still-filed-it, and the residual was exact: **four** surfaces on `/atp-economics` each
answer a *neighbouring* question. L1750 answers entry (the 100 grant). L1761 answers **trust**
convergence, and the visitor named that miss themselves (*"the cold-start section covers trust
convergence but not ATP survival"*). L985 answers where the first confirmer's trust came from.
L727 answers **society-level** input, and its own guard forbids upgrading it into a solvency
promise. Individual newcomer survival was answered nowhere.

Answered at a new `#newcomer-solvency` block, grounded in **core-spec only**:
`core-spec/inter-society-protocol.md` section 4.5 (*"There is no protocol-level constraint on a
society's initial issuance"*, plus the stated reason: such a constraint needs a universal
measurement protocol, which needs a universal authority, contradicting anti-hierarchical-by-design)
and section 4.7's table of valid ATP policies, closing *"The Web4 standard provides the form for
all of them."* So: issuance is society law, a recurring per-role allowance is a legal choice and so
is no allowance, the site cannot give a rate because no public network is open to outside members
yet, and self-initiated work alone does not grow a balance. **It names the mechanism and declines
the promise.** Filed as ledger **Q13**, narrowed to the genuinely open half (is monotonic decrease
for the un-commissioned *intended*, and does any canonical bootstrap-period exemption exist) - the
floor question itself is answered upstream, so escalating it would have re-opened something canon
deliberately closed.

**The reusable lesson, and it is bigger than the diff: a June-11 fix landed on one of two twins.**
The reviewer required checking the caveat against the page's own illustrations, and
`atp-economics:1486-1489` ("Life 1: The Newcomer") shows *spent 60, earned 105 back, ended with
145* - **arithmetically impossible** under the page's own capped-refund model unless 45 of it was
commissioned payment, which the bullets never said. The twin at `how-it-works:977-984` carries the
identical figures and **already has the fix**, in a `<details>` at `:986-1006` whose guard reads:
*"June 11 visitor HIGH (browse B): 'earned more than cost' seemed to violate the recharge-at-cost
cap **on /atp-economics**. Name the channel: task payment."* The friction was filed **against
`/atp-economics` by name**, and the fix landed on `/how-it-works` only. The page it was filed
against carried the unfixed version for eight weeks, and #517 edited that exact block eight hours
before this session without catching it. Channel-naming propagated in substance, not re-derived;
**no figure moved** (105 / 145 / 130 flow into Lives 2-3 and into `/how-it-works`, which #517
deliberately kept in sync).

**And the summary box was the unqualified version of what this caveat qualifies.** `:209` said
*"an active contributor's balance grows well past the grant they started with"* - earn-back is
capped at spend, so that is the one channel it cannot be, and item 3 four lines below already says
so (*"that payment, not recharge, is where net gain comes from"*). Retargeted to the commissioning
channel. The Jul-15 guard above it justified the old wording, so **that rationale was rewritten to
record the reversal** rather than left to invite a revert; the `"buy, sell, or speculate"` guardrail
is untouched.

**LOW 2, a test count attributed to an artifact that does not own it.** *"2,627 attributed to 'the
reference Python SDK' on one page and attached to `web4-trust-core` v0.2.0 on the other. I could not
tell which package it belongs to."* Wrong, not merely ambiguous: the sentence sat inside the
`web4-trust-core` card. Per `web4/STATUS.md:57,62` there are **three** artifacts, and the reason the
count would not place is that **one of the three is not a package** - the standard's reference Python
implementation ships with the spec repo, not to PyPI. That clause is the load-bearing part; do not
trim it as filler. `web4-trust-core` deliberately carries **no** test count on either page, since its
README publishes none and substituting a neighbour's is how this started.

**LOW 3**, `/onramp`: the hestia bullet's *"it is an early prototype"* could bind to hestia rather
than to its policy gate. Subject restored, per the visitor's own suggested fix.

**Deliberately not fixed, recorded so the next session does not re-litigate:**
- **LOW 1** (`/running-now` Running-badge plurality): **4th sitting on this row**. Both halves of
  the suggestion already ship (`:89-97` legend, `:315-321` long form), and the remaining half is the
  visitor's inference *"That is one instance"*, which `:285` contradicts (four machines). Printing
  "one instance" would ship a **false number** to close a LOW.
- **HIGH 4** and Unanswered Q1/Q2 (what a permanent-0.50 user can do): ledger Q1/Q8. The site is
  endpoint-silent by policy and **the visitor will re-file this by design**. Do not close it by
  writing the sentence.
- **Unanswered Q7** (a route in to an early hub): operator positioning call.

**Verification**: `npm run build` green. Zero em dashes added (baseline 0 in all four page files,
19 pre-existing in the ledger, 0 added). **No figure changed on any surface.** 0 new files.

## Aug-06 09:00 session - the example that died by no rule the page allows

Fresh log (`visitor/logs/2026-08-06.md`): 52 min, 14 pages, understanding **good**, would return
and recommend **yes**. 4 HIGH / 3 MEDIUM / 3 LOW. The visitor called it *"the most honest technical
site I have read"* and then filed the longest HIGH list in weeks, which is the loop working.

**Shipped: two internal contradictions, one mis-scoped assertion, two oversells.**

**The flagship example met neither of its own death conditions.** `/how-it-works` states death is
ATP = 0 or sustained trust collapse, then walks an agent that *"Died with 145 ATP"* at T3 0.65. The
visitor: *"I read that four times... the fifth failing is loud."* This was already caveated twice
(Jul-27, Jul-30) via `EndOfLifeCaveat`, and **the visitor quoted the caveat's karma half back
verbatim and filed the death half anyway**. Read it, understood it, rejected it. So the residual was
the **illustration**, not the copy: Lives 1/2 said *"Died with"* while Life 3 already said *"Ended
strong"*. The example contradicted itself, and *"Died"* claims the narrow defined event the page
rules out four screens above. Verb normalized to the page's own *"Ended"*. **That removes an
assertion; it adds none**, and no third death mechanism is invented (still ledger Q5).

**The same walkthrough runs on `/atp-economics` with the same figures**, and there it read *"Died
**naturally**"* plus *"before dying naturally"*. That is strictly worse: it names the mechanism Q5
establishes canon does not define. Caught by the policy reviewer (R3), who noted that normalizing
one page would have split two pages sharing 145/145/130 exactly. Both normalized in one pass, using
vocabulary each page already owned (`/atp-economics` Life 4 has always read *"Ended strong: 140
ATP"*). Deliberate keeps, recorded in-code: *"Near death"* (ATP plunged to 15, the real condition)
and *"they die and stay dead"* (the genuine ATP = 0 death that page defines).

**The rebirth rule was disclosed on one page and hidden on the other.** `/karma-consequences` stated
`next_life_atp = 100 + karma * 2` as settled arithmetic with **no caveat at all**, while
`/how-it-works` disclaims the amount. `how-it-works`'s own guard comment had named that line for a
week without anyone fixing the page it named. The disclosure is propagated (reusing the caveat's
wording verbatim, because it names both models and endorses neither); the **divergence itself is
untouched and still needs the ruling**. `trust_decay_factor = 0.95` deliberately not touched: the
visitor filed the ATP half only.

**The endpoint guard was protecting half its own sentence.** `first-contact:271` read *"**Above
0.50**: full access"*, four lines below a guard saying *don't assert the endpoint either way*. The
guard enumerated only the `>=` phrasing by name, so it read as permission for the `>` one. Of the
three phrasings the visitor found, the other two were endpoint-silent and correct; this was the sole
offender, and it is the clause that made HIGH 4 (software-only capped at exactly 0.50) unanswerable.
**Deleted, not rewritten** (precedent `lct-explainer:1404`, PR #497: removing a prohibited assertion
is not asserting its negation). The reviewer blocked patching the gap with `lct-explainer`'s
non-asserting welcome, correctly: that sentence is about a hardware *ceiling*, this 0.50 is Alice's
dynamic *starting score*. Wrong referent. Guard rewritten to forbid **both directions by name**, and
the same half-guard shape was found and fixed in the ledger's own holding-pattern line.

**Two oversells upstream of their own retractions.** `/running-now` promised *"every consequential
act landing in your own witness chain"* on the page that makes you decide to install; `/hestia`
retracts exactly that. Scoped using hestia's own words. `/why-web4`'s FAQ answered *"**No** -
recovery is built in"* flatly, which `/what-could-go-wrong` Risk 8 falsifies for software-only users
(*"nothing to recover to"*). Fixed **in the bolded lead**, not appended below it: a surviving
unconditional "No" still reassures anyone who reads the bold line and closes the `<details>`.

### Expect Unanswered Questions 1 and 2 to RECUR next browse. By design.

*"What happens at exactly 0.50?"* and *"is the software-only tier usable or permanent probation?"*
are the standing escalation (ledger **Q1/Q8**), not a failed fix. The site is now endpoint-silent
**everywhere**, which is the policy, and silence is precisely what the visitor is filing against.
**Do not close it by writing the sentence.** Q1 now carries this as third-instance evidence that the
prohibition is not stable under editing: the honest thing to write next to *"starts at 0.50"* is a
status for 0.50, and every author reaches for one. A ruling is needed, not a fourth guard comment.

### Filed, not fixed

- **`/atp-economics` has no `EndOfLifeCaveat` of its own.** Do **not** hoist the component from
  `how-it-works`: that page also defines a genuine ATP = 0 death, so it needs its own framing. A
  larger job than the filed friction. (Reviewer note 1.)
- **MEDIUM 3, newcomer ATP solvency**: 85%-quality work nets **-8**, recharge is capped at spend, so
  only commissioned work grows a balance. *"At -8 per quality post I get about twelve posts before I
  die."* Nothing names a floor, refill, or how a newcomer with no track record gets commissioned.
  Needs a canon answer, and it is the reason the ATP/ADP checklist box came back **unticked**.
  Unanswered Qs 5 and 6 are the same gap.
- **LOWs**: (1) "Running" is defined as *"live instances... in day-to-day use"* but hestia's one
  instance is the authoring lab self-hosting; (2) the 2,627 test count is attributed to the Python
  SDK on one page and `web4-trust-core` on the other; (3) `/onramp` should lead the clause with its
  subject (*"hestia's policy gate is an early prototype"*).
- **Unanswered Q7**: *"if I wanted to be an early member of a hub, is there anyone to contact?"*
  The site says no public network exists but names no route in. Operator call, not a canon question.

## Aug-06 03:00 session - the override the spec never granted

No fresh visitor log (browse runs 05:00, session ran 03:01), so this took the task the 21:00
session named: the `trust-tensor` configurability clause, filed with citations and left unfixed
because doing it properly was a canon correction rather than the prominence fix that PR was.

**The defect.** *"societies can customize weights per role"* grants societies an override the spec
withholds. `t3-v3-tensors.md` **§10.2 Protocol-Invariant Parameters** carries the row `T3 composite
weights | talent=0.4, training=0.3, temperament=0.3 | §9.2 | t3v3-001` under *"all conforming
implementations MUST produce identical results"*. **§10.3 Society-Configurable** does not list them;
it lists *Role requirement thresholds*, whose reference **§5.1** shows only
`role_requirements.minimum_t3`, per-dimension floors. The clause had taken real per-role variability
and attached it to the wrong quantity.

**It was on three surfaces, not one.** The filing named `trust-tensor` only. Sweeping the claim
rather than the sentence found `how-it-works` (*"societies can retune them per role"*, at the
rebirth-eligibility decision point) and `why-web4` (*"Beyond thresholds, societies can customize how
trust is weighted"*). The `why-web4` copy was the worst: it is the only surface that draws the
threshold/weight boundary explicitly, and it drew it backwards.

**`/why-web4` already shipped the correct answer 460 lines below** (caught by the policy reviewer).
`#faq-protocol-changes` splits *"Society-level (SAL): trust thresholds, ATP costs, role definitions
... this is where the 0.5 threshold, specific decay rates, and enforcement rules live"* from
*"Protocol-level: the trust tensor math"*. So the page contradicted itself, not just the spec. The
replacement borrows that entry's vocabulary verbatim and links to it, rather than coining framing.
Same shape as #514 and #515: the page ships the answer and then denies it elsewhere.

**What each surface now says**, at its own reading depth: the blend is protocol-level and fixed;
what varies per role is the minimum each dimension must clear. `/trust-tensor`'s technical block
also names the per-role match weighting. Deliberately **not** said anywhere: that societies
*configure* those match weights. `role_requirements.*_weight` (`R6_TENSOR_GUIDE.md:566-576`) is
real and per-role, but no normative table assigns it a governance tier, so the site calls it
per-role and stops. Correcting an unlicensed claim by inventing a smaller one is not a fix.

**Also**: the `why-web4` decay-rate sentence was correct against §10.3 and survives intact, now
without a false premise introducing it. The anchor paragraph above the role widget (#515, one day
old) gained the invariance clause it had been forbidden, since the only objection was the
contradiction this PR removes; nothing else in it changed and no ordering commentary was added
(R1). Guard comments on all three pages now record the reversal instead of routing around it.

### NEW, filed not fixed: R1's "Site state" block cites two engines that no longer exist

`docs/WEB4-CANON-QUESTIONS.md` R1 says *"The two live sim engines (karma-journey:171,
trust-tensor-explorer:184) deliberately use 0.3/0.3/0.4 (temperament-highest) with a shipped
rationale box."* Neither survives: `src/app/karma-journey` and `src/app/trust-tensor-explorer` are
absent, `src/lib/simulation` is empty, and no 0.3/0.3/0.4 T3 engine exists anywhere in `src/`. They
were retired in the Jul-15 rebuild. This sits one line above R1's **standing restriction** (on-page
reconciliation of the sims, REJECTED per #442, bridged per #448), and the restriction's entire
premise is those engines being live, so this is an escalation-adjacent call and **not** a session's
to make unilaterally. The Aug-06 session corrected only the drifted line cites in that block (all
four had rotted onto unrelated lines) and replaced them with surface names so they cannot rot again.
**Next session or operator: does R1's standing restriction survive the retirement of the two things
it restricts?**

## Aug-05 visitor, the four LOWs (Aug-05 21:00 session) - the precise version living below the vague one

Third session on the Aug-05 log (09:00 took the HIGHs, 15:00 took MEDIUM 1). All four LOWs share
the shape the visitor named for the HIGHs one severity up: **the precise answer already existed on
the site, just not where the vague version is read.** Only one item coined a new fact, and only
because upstream packaging made the shipped route non-executable.

- **LOW 2 / Q7, the 30-second mint dead-ends** (`/the-standard`, `/running-now`, landing card).
  The defect was the SEQUENCE, not a missing path: both pages read "install these packages" then
  "run `identity_bootstrap.py`", which implies the wheel carries the script. It does not.
  `web4-core/python/pyproject.toml` is maturin, `module-name = "web4_core"`, no examples
  packaging; upstream's own README says the script is repo-shipped. Added the three literal
  commands (verbatim from `web4-core/python/README.md:89-92`) under a new
  `#thirty-seconds` anchor, and routed the other two surfaces to it so they cannot drift.
  Package names verified correct against `STATUS.md:36-38` and did not move.
- **LOW 1 / Q6, "pilot-ready" had no slot.** Every *rendered* use is about the hub, which is
  badged Reference, so it was bound inside that tier in the legend rather than dropped (the
  visitor's alternative). Dropping it would cost information the badge does not carry, e.g. the
  honest "pilot-ready with no users" framing. Respects both existing guards on that block: not a
  fourth tier, no hedge on the tier order. It also does not claim live instances exist, which is
  the thing Running claims.
- **LOW 4, no default T3 anchor before the role widget.** The canonical 0.4/0.3/0.3 did ship, at
  `#t3-composite`, but inside a `<details>` labelled "Technical Details (Click to Expand)". A
  prominence fix: canon wording propagated verbatim above the role selector. Deliberately framed
  as a QUANTITY distinction (composite blend vs role-weighted match, per
  `R6_TENSOR_GUIDE.md:566-578`) because Team Leader is 0.2/0.3/0.5, temperament-highest, and
  renders live: stating a bare default would have manufactured that inversion unframed on a
  beginner page. Not the T3-weights escalation, which is about the prose-vs-retired-sims ordering.
- **LOW 3 / Q5, which decay rate is ours.** The 0.7-vs-0.85 reconciliation already shipped and the
  visitor demonstrably read it ("it does say they converge by depth 3-4, which helped") and still
  could not answer the question, so the missing clause was exact: which number is *ours*. Marked
  0.7 as the site's teaching calibration in the sentence that introduces it. No number moved.
  Gave the "Why 0.7?" box its own `#why-07` id, since `#hop-decay` wraps the caption doing the
  linking and could not serve as the target.

**MEDIUM 2 verified BLOCKED, not skipped.** The collation the visitor asked for (0.50's three
roles in one block) already ships at `trust-tensor:417-421`, and `git log -L` dates it to #502 on
Jul-31, *before* the 05:00 browse. So it is read-it-and-still-filed-it, and the exact residual they
name (Unanswered Q3, *"is exactly 0.50 above the line or below it?"*) is the standing `>` vs `>=`
escalation, ledger Q1. The guard at `trust-tensor:404-411` already forbids ruling there. No action
is the correct disposition; do not re-treat without a canon ruling.

**MEDIUM 3** (`/why-web4` ~70 FAQ entries, six duplicated pairs) remains the deferred curation
design pass, recurring since #473. Still not a session-sized edit.

### CLOSED Aug-06 (was: filed not fixed): `trust-tensor` was wrong about configurability

**Fixed by the Aug-06 03:00 session, see the section at the top of this file.** The clause is gone
from all three surfaces that rendered it. Kept below as the filing that licensed the work.

Surfaced by the policy reviewer while ruling on LOW 4's wording. The canonical-weights sentence
ends *"societies can customize weights per role"*, and that clause is a live accuracy defect:

- `t3-v3-tensors.md` **§10.2 Protocol-Invariant Parameters** ("fixed by the specification, all
  conforming implementations MUST produce identical results") lists `T3 composite weights |
  talent=0.4, training=0.3, temperament=0.3 | §9.2 | t3v3-001`.
- **§10.3 Society-Configurable Parameters** does *not* list them. What it lists is *Role
  requirement thresholds*, the `min_talent` / `min_training` / `min_temperament` fields at
  `R6_TENSOR_GUIDE.md:568-570`, a different field set from the `*_weight` fields two lines below
  at `:574-576`.

So the clause conflates society-configurable role **thresholds** with role **weights**, and grants
societies an override the spec withholds. It is *not* the T3-weights escalation (that one is about
the talent-highest vs temperament-highest ordering contradiction with the two retired sims); the
spec answers this one plainly. It was left unfixed here deliberately: the honest replacement has to
carry the threshold-versus-weight distinction, which is more than a clause and is not
visitor-reported, and doing it would have turned a prominence fix into a canon-correction pass.
The new anchor sentence above the widget therefore carries only `:926`'s **first** clause, and
deliberately does not assert protocol-invariance either, since that would contradict `:926` twenty
lines below and manufacture a fresh on-page contradiction. **Next session: replace the clause.**

## Aug-05 visitor MEDIUM 1 (Aug-05 15:00 session) - the page that shipped the answer and then denied it

**The friction**: the visitor's only unchecked understanding box (`[~] ATP/ADP: mechanics yes,
economics no`), their Unanswered Q1, and the one item their Honest Assessment called *"actually
missing rather than misplaced"*. From the worked example (85% quality nets minus 8), the capped
recharge, and "a **fixed** pool", they concluded: *"energy only ever moves sideways or drains...
eventually everybody hits zero and dies."*

**Nothing was missing.** `/atp-economics` already ships the answer in its "No inflation"
paragraph: *"the system converts discharged ADP back into fresh ATP."* It sits in a collapsed
`<details>` about a thousand lines below the example that provokes the question, and two later
surfaces contradict it outright.

**The defect was one conflated word.** The page used "ATP" for both the **charged state** and the
**token regardless of state**. Canon (`atp-adp-cycle.md` 1.2 semifungible; 2.2 `charge_atp` does
`society_pool.convert(ADP -> ATP)`): the *total* is conserved, the *charged fraction* is not.
"Total supply is conserved" is true of the token; "ATP is never created during normal operation"
is false of the charged state. The page asserted both of one referent.

**Five reconciliations** (near-zero new claims, no numbers changed):
- **Worked example**: propagated the "No inflation" sentence to where the visitor broke, verbatim
  so the two surfaces cannot drift. Intercepts their *last* inferential step (spent ATP is gone),
  not the pricing point a June-11 fix already made and that they read and filed anyway.
- **Conservation bullet**: named the referent rather than deleting the claim. Kept "total is
  bounded" (already shipped); dropped the unqualified "never created".
- **Transfer-fee block**: deleted the global "no minting events" (false against 2.1 and against
  this page's own "What stops an admin from minting infinitely?" block). Kept the fee-scoped half.
- **"Minted when you contribute value"** -> contributing value *charges*, it does not mint. Canon's
  verb is "charging", but beside a "Spent" bullet "Charged" reads as *billed*, so it uses the
  page's own verb AND names both channels, so the capped refund does not read as the only source.
- **"a FIXED pool when it forms"** (x2): the word that made it one-time-forever and stalled against
  the "pool expansions ... published mint schedule" text 20 lines below it.

**Deliberately NOT done**: no mint cadence or rate anywhere (ledger Q1 + the #499 guard). The
non-guarantee clause ("nothing here guarantees the accounting keeps pace") is load-bearing: 2.2
conditions charging on a value proof the society must accept, so the honest claim is that an input
channel *exists*, not that it keeps up. Do not upgrade it into a solvency promise.

**New ledger evidence (Q7, evidence only)**: `/atp-economics` asserts **both** sides of the
currency question, "This is not a currency" in the body and *"Both... Transaction medium"* in a
collapsed expander. Q7 previously recorded the site as landing uniformly on the unit-of-account
side; it does not. Left untouched, since reconciling it means picking the side Q7 asks canon to pick.

**Still open from Aug-05**: MEDIUM 2 (0.50 doing three jobs on /trust-tensor) is **partly blocked**,
its second half ("is exactly 0.50 above or below the line?") IS the standing `>` vs `>=` endpoint
escalation; the collation half is fixable. MEDIUM 3 (/why-web4 duplicate FAQ pairs, six named
pairs) is a mechanical dedupe and is the best next pick. All four LOWs open.

## Aug-05 visitor, all three HIGHs (Aug-05 09:00 session) - the reassuring version kept living above the honest one

*Last updated: 2026-08-05 (09:00 session)*

**The cron is alive again** (it died 2026-08-02 on a weekly usage limit; no logs exist for Aug-02,
03 or 04). Fresh log `visitor/logs/2026-08-05.md` landed 05:07 on `worker/4life-visitor-20260805`,
not on `main`, per [[visitor-cron-commits-to-stale-branch]].

The visitor's own Honest Assessment named the shape better than the friction table did:
*"the honest version of a fact keeps living further down the path than the reassuring version."*
All three HIGHs are instances of it, and all three were fixed by moving the sharp sentence up to
where the soft claim is made, never by writing a new sharp sentence.

### HIGH 1 was not the missing clause it was filed as

They asked for "one sentence at the ceiling table" stating what a 0.50 cap costs. **That sentence
was already directly under the grid** (`lct-explainer` *"0.5 is both where you start and the highest
you can reach"*, then the `#software-only-survival` callout). Per
[[visitor-read-it-and-still-filed-it]] the defect was the sentence that **disarmed** it, one line
later: *"we treat that as a feature, not a bug."* `/what-could-go-wrong` risk 8 says of the
identical fact that it is *"a real second-class experience baked into the architecture"* which
*"codifies the existing digital divide into the trust layer itself"*. One page called the cap a
feature while the site's own risk register called it contestable. Fixed by deleting the judgment
(not inverting it) and propagating risk 8's own closing sentence verbatim, linked to
`#risk-accessibility`. The welded eligibility half (*"lets everyone participate"*) is kept
**byte-identical**: it is what holds this from tipping into an eligibility claim.

### HIGH 2 resolved the conformance half of the [[hardware-required-seam]], from canon

`/why-web4` told them twice that identity **requires** a security chip; `/lct-explainer` and
`/onramp` treat soft LCTs as normal. That seam is a standing escalation whose holding pattern said
"no further site edits", justified by *"answering requires asserting the Q1 endpoint"*. That is true
of the **equity** half and not of the **conformance** half, and upstream answers the conformance
half outright:

- `LCT-linked-context-token.md:39` (§1.2 clause 1): weak evidence *"MUST NOT be excluded by the
  protocol"*, only *"rightly weighed as riskier"*. A ban on protocol-level exclusion.
- `multi-device-lct-binding.md:9` lists *"software-only fallbacks"* as a supported anchor class;
  `:145` makes `anchor_type: "software"` a first-class record; `:154` gives it a computed ceiling.
- The only prohibitions are scoped (`:155` not the **sole** recovery-quorum anchor; §3.4 excluded
  from hardware-**diversity** counting), and audits **C268** and **C308** (2026-08-01) re-ratified
  the clause as settled.

So `/why-web4:2231` was **false against canon**, which decided a fix DIRECTION the page could not
decide locally. Swept the CLAIM, not the sentence: `#faq-tpm-affordability` (opener + honest
caveat), `#faq-many-identities`, `#faq-affordability` and `#faq-gatekeepers` antecedents, the
comparison-table row, plus two off-page copies that would otherwise have contradicted the
correction (`what-could-go-wrong` risk 4, `your-internet` spam scenario). The Sybil argument is
relocated, never silently weakened: soft identities are cheap, what costs money is an identity
anyone **weighs**, closed with the hedge already shipping verbatim (*"a Sybil resistance strategy,
not a Sybil prevention guarantee"*). Ledger Q8 updated: request 1 **ANSWERED**, holding pattern
narrowed to the equity half, and the stale line claiming risk 8 still reads "lower ceiling"
corrected (#502 changed that on Jul-31 and nobody updated the ledger).

### HIGH 3 put the scope-of-record where the Running badge is granted

Landing hero: *"Web4 closes that gap."* On the one piece badged **Running**, an action that routes
around the policy gate writes **no chain entry at all**. The site says this honestly, but only on
`/hestia` (their page 12) and risk 9 (page 13). New `#what-the-chain-records` paragraph on
`/running-now`, wording byte-identical to `/hestia:386`, following the `#whose-machines` precedent
on that same page and for the same reason: this is scope of what the chain **records**, not
immaturity of a component, so it stays **out** of the "Two things are honestly still early" count,
which is load-bearing. **Badge tier untouched**: what runs, runs; this scopes what running means.

### Guardrails honored (do not undo)

- **No endpoint asserted anywhere.** Nothing says a reader at exactly 0.50 is alive, dead, safe, or
  has full access. Ledger Q1 is untouched; `#software-only-survival` stays strictly-below.
- **No number moved.** 0.50 stays. Upstream now carries **three** software-only ceilings at once
  (`multi-device:154` 0.4, §4.2 0.40, and `web4-core/src/lct.rs:85-93` shipping **0.85** on an LCT
  it labels software, persisted by a live hub daemon: C308-N2, open). Adopting 0.40 would put the
  ceiling under the survival line and answer Q1 by arithmetic. The site's calibration must not move.
- The two `/why-web4` affordability FAQs are **narrowed but still not merged**. Deduping is the
  Aug-05 MEDIUM firehose row, a curation pass, not this one.

### Retest gate (next browse)

Does a linear reader who stops at `/why-web4` still conclude they are shut out without a chip? Does
the `/lct-explainer` ceiling grid still read as a discount tier? Does the Running badge now carry
what the chain records at the point it is granted?

### Aug-05 deferred (not this scope)

- **MEDIUM**: ATP closed-loop economics (their largest Unanswered Question, and the sharpest one
  filed in weeks: the worked example shows 85% quality work netting **minus 8 ATP**, recharge capped
  at spend, 5% skimmed on transfer, pool "fixed" at society formation, so the naive reading is a
  strictly deflationary system where everyone starves). This needs a **canon call on where net-new
  energy enters**, not a reword; it is the closest thing to a new ledger question in this browse.
- **MEDIUM**: the three jobs of 0.50 on `/trust-tensor` (baseline / restriction line / software-only
  ceiling) in one block. Blocked by Q1: their literal ask ("say whether sitting exactly at 0.50 is
  above or below the line") **is** the endpoint.
- **MEDIUM**: `/why-web4` FAQ firehose (~70 entries, 6 duplicate pairs). Long-standing design row.
- **LOWs**: "pilot-ready" vs the Reference badge legend; the 30-second mint dead-ends with no literal
  commands; two MRH decay rates as peers; no default T3 weighting shown (note: the default **is**
  canon, 0.4/0.3/0.3 per t3v3-001, so that one is cheap and grounded).

## Aug-01 visitor Unanswered Q8 (Aug-05 03:00 session) - the badge that said Running on a path nobody has driven

*Last updated: 2026-08-05 (03:00 session)*

**The Aug-01 friction table is exhausted.** HIGHs 1+3 = #505, 4 = #506, 2 = settled hardbound
operator call; MEDIUMs 2+5 = #507, 3+4 = #508, 6 = #509, 1 = standing 0.5-endpoint escalation;
LOWs = #511 plus three parked rows (glossary acronym box, narrowed Aug-02 and not to be
re-litigated on the visitor's framing; `/value-tensor` collusion = ledger **Q3**, gate ARMED not
fired; the offsite GitHub repo description). So this session went to the **Unanswered Questions**,
per [[pessimistic-absolute-nobody-catches]].

**Cron note**: still no visitor log for Aug-02, 03, 04 or 05. Root cause is now known and is not
ours: `/tmp/visitor-cron.log` shows the Aug-02 05:00 run died on *"You've hit your weekly limit,
resets Aug 3, 11pm"* and the file has not been appended to since. Separately, the Aug-01 run's
`git push` to `main` was **rejected non-fast-forward**, so the Jul-30, Jul-31 and Aug-01 browse
logs existed only in the shared checkout's local `main`. All three are cherry-picked into this
PR so the feedback record reaches `origin/main`. Check with `git log --all -- visitor/logs/`,
never `ls`.

### Unanswered Q8: "If nothing has a live network, who am I being witnessed by?"

Their full question: *"Hestia runs locally, the hub is pilot-ready with no users, hardbound is
unreachable. Witnessing needs other participants, and I couldn't work out where they'd come from
on day one of a real deployment."* This is the **Jul-29 recurrence**: the same visitor asked it
then and it was answered at `/hestia` for the **solo** case. Per
[[visitor-read-it-and-still-filed-it]] the residual is a missing clause, not a restructure, and
the two questions side by side name it: Jul-29's answer covers solo capability, Aug-01 asks about
**day one of a multi-party deployment**.

**The surface that owns the question was answering it with a retired artifact.**
`/lct-explainer`'s `#witness-infrastructure` block (heading: "Who runs witness infrastructure?",
linked from `#first-device-bootstrap` as *"the network-side answer"*) said: **"In the current
prototype, both are simulated."** Two defects in one clause. The referent was the game/simulation
archived on `archive/v1-2026-07` in the Jul-15 rebuild. And it was **wrong in the honest
direction**, which is the rarer bug: neither kind of witnessing is simulated, and the two are not
at the same stage, so collapsing them into one word destroyed the only distinction that answers
the question.

### The root cause, found downstream: a status table moved and one badge did not

`src/components/InProduction.tsx` had `"constellation": { tier: "running" }`, and
`MaturityBadge` defines `running` as **"deployed and operational today"**. The component's own
header rule is *"only claim running for what hestia's public README lists as built+working"*.
That source **moved**: hestia's `docs/STATUS_AUDIT_2026-08-01.md` replaced the two-state table
(`README.md:192`, Constellation = Working) with **three** states, on the finding that one
"Working" column cannot distinguish *"exercised daily, with chain entries behind it"* from
*"code and tests exist, nobody has driven the path"*. Device constellation is the second: 1,183
lines, 21 unit tests, wired into the hub handshake, and **zero constellation events in the live
chain window**. Policy review added that the entry has sat at `running` since the component's
**original commit** and was never revisited, including by the #431 tier-honesty pass. It was an
unreviewed default, not a judgment anyone made against evidence.

**All 12 `CONCEPTS` entries were checked against the audit. Exactly one disagreed**, and it was
the one about device witnessing. Five entries (`witness-chain`, `delegation`, `policy`, `society`,
`sealed-channel`) render on no page at all and are dead; `sealed-channel` is already correctly at
`reference`.

**So the missing clause for Q8 was never more explanation of witnessing.** It is that the kind
that needs **nobody else** is running (your own hash-linked witness chain, recording the acts an
agent takes under your policy gate), while the kind that needs a **second device or other people**
is **built and never driven**. Every surface touched had blurred exactly that split.

### What shipped (0 new files, 0 new pages, 0 new badge tiers)

- **`InProduction.tsx`**: constellation `running` -> `reference`, line rewritten. Header comment
  now records that its stated source was superseded and names the audit, so the next editor who
  reads `README.md:192` and finds "Working" knows why the tier disagrees. Separately `lct`'s
  *"on its own hardware"* -> *"on its own machine"* (**tier unchanged**, this is disambiguation
  not demotion): that banner renders on exactly one page, `/lct-explainer`, which says ~1,850
  lines below it that hardware binding is trait contracts only.
- **`/identity-constellation`**: had **zero** maturity markers of any kind while being where the
  answer routes readers. Now opens with the two-kinds split and links `/hestia#solo-witnessing`.
- **`/lct-explainer`**: the two-tier truth replaces the "simulated" clause; the witness-node
  economy is marked design rather than observation (it described an economy in flat present tense
  with no marker at all); the paired **June-14 guard** is rewritten to record the reversal,
  because its last line explicitly said it *"Mirrors the prototype/simulated register"* just
  retired, and leaving it would have had the page call witnessing simulation in one paragraph and
  running daily ~160 lines later; the stale "current prototype" referent at the UX caveat is
  re-pointed at the artifact that actually carries the stub.
- **`/hestia`**: *"proves its device constellation"* -> carries a proof, plus the built-not-driven
  clause; **step 6 of "A day with Hestia"** scoped, because `/running-now` routes readers straight
  there calling it "an ordinary Tuesday"; the list lede "All of this runs today" narrowed to name
  the exception. New **`id="solo-witnessing"`**: that paragraph had none and `#honest-status` is
  the section *below* it, so an inbound link would have landed past the answer.
- **`/web4-explainer`**: *"multi-device proof becomes your MFA, **today**"* was the strongest
  constellation over-claim on the site. Also re-points the stale simulations referent, but **not**
  to "the site has no simulations", which policy review caught as **false**: `/first-contact`,
  `/atp-economics` and `/coherence-index` all still ship simulator widgets. The true, narrower
  claim is that those model trust and ATP dynamics, not hardware presence.
- **`/why-web4:697`** and **`/glossary:663`**: taken in a second pass under a deliberately narrow
  test (below).
- **`opengraph-image`**: the social card still sold *"Interactive simulations of trust-native
  digital societies"* for a site that has been a pure explainer since Jul-15.

### Two rules worth keeping

**1. What licenses a second pass.** The seams sweep found `/why-web4:697` ("Multi-device
constellation enrollment **working**") and `/glossary:663` (constellation listed as a peer of six
daily-exercised capabilities inside a section headed "Running Now - Deployed Tools"). The test
that admitted them, and admits nothing else, is **contradiction created by this session's own
edits, not topical relevance**. Before the badge moved, all three surfaces agreed by over-claiming
together; the demotion is what put these two out of step. A fix that manufactures a contradiction
and then declines to resolve it is incomplete, not conservative. That test correctly *excludes*
the opengraph line (nothing this session did made it contradictory) and the hardware-REQUIRED
seam. Evidence `/glossary` was an outlier: the site's four other hestia capability enumerations
(`page.tsx:43`, `onramp:388`, `running-now:240`, `hestia:558`) all omit constellation.

**2. A three-pass sweep, because the noun alone misses things.** Both second-pass finds escaped a
noun grep for different reasons, and both failure modes generalize:
- **The noun, untruncated and unfiltered.** A `grep -v` on `href` hid `/why-web4`, because in JSX
  a prose maturity claim can contain an inline link, and **citing the status ledger correlates
  positively with being a maturity claim**. A `head -30` on a 96-line result hid the other.
- **The periphrasis**, since the claim can be made without the noun ("link your devices",
  "multi-device proof", "your devices witness each other", "your MFA").
- **Containers that assert status for their members.** `/glossary:663` makes **no status claim of
  its own**; membership in a section headed "Running Now - Deployed Tools" *is* the assertion. No
  status-word grep in either direction finds it. Grep the section comments and read what is inside.

**Phrase normalization.** The load-bearing clause had already drifted into two variants across six
surfaces before anything shipped ("driven on" vs "run against"). All six now carry **"has not yet
been driven on a real second device"** byte-identical, verified in the rendered HTML, with a
cross-reference note in each guard. This is [[sibling-page-cross-reference-gap]] foreclosed before
it could open.

**Not touched, deliberately**: `MaturityBadge.tsx` (rewriting a tier title is the act #511
declined); the collusion sentence at `lct-explainer:697-700` (ledger **Q3**, gate ARMED not
fired, and once the paragraph above it reads as forward-looking that sentence correctly reads as a
design property); any trust number, ceiling, or badge tier definition; the hardware-REQUIRED seam;
"every action" was **not** reintroduced anywhere, per the guard at `hestia:117-121`. The canonical
no-public-network sentence is reused byte-identical, verified in rendered HTML on all three pages
that now carry it.

**Retest gate (next browse)**: does a reader who asks "who is witnessing me?" now get the
running/built split at the point of asking, rather than a badge that says Running? If Q8 recurs a
**third** time after this, the residual is neither the badge nor the split: escalate as the
question of whether the site should say anything about multi-party day one at all before a hub is
actually up.

## Aug-01 visitor LOWs (Aug-04 21:00 session) - the badge that claimed adoption, and the haircut nobody upstream agrees on

**No visitor log exists for 2026-08-02, 2026-08-03 or 2026-08-04.** Checked with `git fetch --all`
plus `git log --all -- visitor/logs/`, not `ls` (the cron commits to a worker branch). The 05:00
cron has produced nothing for three days, so `visitor/logs/2026-08-01.md` is still the freshest log
and its **HIGHs and MEDIUMs are fully disposed** (1+3 = #505, 4 = #506, 2+5 = #507, 3+4 = #508,
6 = #509; HIGH 2 is the settled hardbound operator call, MEDIUM 1 is the standing 0.5-endpoint
escalation). This session took **two of the five untaken LOWs**, plus the canon entry the second
one turned out to require. If the cron is still silent next session, the remaining LOWs are the
`/glossary` acronym-box residual (do NOT re-litigate on the visitor's framing, see the Aug-02 03:00
note) and `/value-tensor` collusion (standing ledger Q3, gate ARMED not fired).

### LOW: `/running-now`'s Running badge said "in day-to-day use" and meant something narrower

This row was filed **twice by the same visitor**. #496 (`94db436`, Jul-30, so live before the
Aug-01 browse) took the **ownership** half of their suggestion and deliberately left the
**definition** half (its guard says "Badge tier is NOT touched"). The Aug-01 visitor demonstrably
read the ownership fix (*"Four machines belonging to the people who built it"*) and filed the row
again against the definition: *"the badge definition is stronger than the fact under it."*
Read-it-and-still-filed-it, so the missing clause is exact rather than a restructure.

The scoping sentence was **already on the page** (*"Daily use by the people who build it is what
the Running badge claims, and it does not claim adoption"*) but three sections below the legend,
inside the hestia block, where a reader who formed the belief at the legend may never land. A
one-line version now sits inside `#badge-key` and links down to that paragraph, which is unchanged
and now carries `id="whose-machines"` (this page had only two ids: `#badge-key` and
`#hardbound-status`). **Badge tier untouched** and no fourth tier: the visitor said naming the owner
still leaves a legitimate Running badge, and it does. It also does **not** say "no outside users",
which #496 refused for good reason (the plugin and SDKs are published, so that absolute is not ours
to print). It scopes the deployment the page *counts*.

**Cascade decision, recorded so the two surfaces cannot drift**: `/tldr:152` carries the same
unscoped phrase and is declared a strict derivative subset of this legend. It **was** changed, in a
parenthetical shape that keeps it a subset ("The daily use counted so far is the building lab's
own, so this badge does not claim adoption"), because `/tldr` is where a first-time reader meets
the badges and `/running-now` is two pages later. The rank sentence still lands on `/running-now`
first, so the derivative rule is intact. Landing page and `MaturityBadge`'s `title` tooltip make no
adoption claim and were not touched.

### LOW: `/trust-neighborhood`'s direct connection is discounted, and upstream disagrees about that

Filed as *"why is a direct connection worth only 0.70? Someone I know personally gets a 30% haircut
before their own trust score is even applied... it reads as 'the site doesn't fully trust anyone.'"*
The "Why 0.7?" box (Apr-19) answers why the **rate** is 0.7 and not 0.5 or 0.9. It never answered
why depth 1 pays it at all. Three surfaces charge it: the ring label (`Direct: 0.70`), the telephone
list (`Direct friend -> 70%`), and the explorer widget, whose depth-1 chips for Alice are `bob`,
`timeserver`, `hospital`, entities Alice deals with **directly**. Meanwhile the block #505 shipped
Aug-01 frames the whole `0.7^depth` term as *"here you are judging someone you have never dealt
with, through the people who have"*, which is precisely the case depth 1 is not.

**Checking upstream before writing prose is what changed the fix.** The two reference artifacts
disagree by one:

- `web4-standard/core-spec/mrh-tensors.md:214`: `trust *= edge.weight * (decay_factor ** (i + 1))`,
  first edge `i = 0`, so a direct relationship is charged **0.70**. This is what the site implements.
- `web4-standard/mrh_trust_propagation.py:294`: `current_trust * weight * (decay_factor ** distance)`
  with the BFS seeded at `distance = 0`, so a direct relationship is charged **1.00**, no discount.
  Same off-by-one in `find_trust_paths` (`:243`, `:249`).

So the visitor's instinct tracks a real upstream disagreement. Filed as **Q12** in
`docs/WEB4-CANON-QUESTIONS.md` (distinct from Q11, which asks whether the distance term applies to
delegation at all; Q12 asks where the exponent starts where it indisputably applies). The on-page
addition is therefore **disclosure, not explanation**: it states the convention (the count starts at
your first edge), says it is a convention rather than a derived result, says the 0.7 multiplies the
person's own score rather than replacing it, and the honest caveat now names the divergence and says
the reaction is not a misreading. It deliberately gives **no reason** for charging the first hop:
any reason would be coined, and Q11's ruling request already records the
direct-versus-through-intermediaries discriminator as plausible and uncited.

**No number moved.** `0.70 / 0.49 / 0.34` and `trust = t1 x t2 x t3 x 0.7^depth` match the core spec
and are pinned on `/how-it-works` and `/why-web4` as well as in the widget. #505's block was not
edited either; its guard now records that its closing contrast is false at depth 1, why it was left
standing (rewriting it would re-arm the HIGH 3 hop conflation), and where the depth-1 answer lives.

### Outside the PR: the GitHub repo description

The fifth LOW (`github.com/dp-web4` describes 4-life as *"4-life game/explainer for web4 societies"*,
and the game was retired in the Jul-15 rebuild) is org metadata, not a site file, so no PR can carry
it. It was **applied directly** with `gh repo edit`, now reading *"4-Life: the educational onramp to
Web4. A live explainer for the core standard, the hub, hestia and hardbound."* Recorded here because
it is the one change in this session that no reviewer gates; revert with a single `gh repo edit`
if the operator wants different wording.

### Deliberately not taken

- **Unanswered Q8** (*"if nothing has a live network, who am I being witnessed by?"*). It recurs from
  Jul-29 Q8, which was treated on `/hestia` ("Solo is not the mechanism switched off"). The fresh
  phrasing is about a real deployment's **cold start**, which is a design question, not a copy fix,
  and answering it on-site would coin canon.
- `/learn`'s Learning Philosophy section (structurally deferred by #509), the 0.5 endpoint (ledger
  Q1, whose holding pattern explicitly forbids aligning `/first-contact`'s operator), and the
  `atp-economics` bare-burn residuals (kept term of art since #464).

## Aug-01 visitor MEDIUM 6 (15:00 session) - the handoff that promised five and arrived at three

**No 2026-08-02 visitor log exists.** The 05:00 cron produced nothing today (checked
`git log --all -- visitor/logs/` after `git fetch --all`), so `visitor/logs/2026-08-01.md`
is still the freshest. MEDIUM 6 was the only untaken MEDIUM in it: HIGHs 1+3 = #505,
HIGH 4 = #506, MEDIUMs 2+5 = #507, MEDIUMs 3+4 = open as #508, MEDIUM 1 = standing
0.5-endpoint escalation, HIGH 2 = settled hardbound-is-private operator call.

### The defect: /learn told the reader to go read the page they had just closed

`/tldr`'s "Read the site in order (recommended)" card names all five pages and says
*"five pages, about 30 minutes, and you have just finished the first."* The first thing
`/learn` rendered for that reader was a box headed **"New here? Start with these 3"**
whose **step 1 was `/tldr`**. The five-page list did exist, four sections down, past the
hero, the maturity banner, the progress bar and the four-pathway selector.

This is the **read-it-and-still-filed-it** shape, so it is not a restructure. The visitor
demonstrably read that box (they clicked Why Web4? out of it and called it *"the useful
part of this page"*) and still filed `/learn` as *"a step backwards in specificity from the
page that sent me here."* The missing clause is exact: the Jul-28 nesting sentence says the
three are steps 1-3 of five **without ever naming steps 4 and 5**. So the box is now the
five in order, with the 15-minute short version surviving as a labeled stopping point
inside it rather than as a competing list, and step 1 says out loud that a reader arriving
from `/tldr` has already done it. **Both load-bearing totals (15 and 30) are byte-identical**,
so no cascade to `/tldr` or `navigation.ts`. The hero got the same treatment one section
earlier, since *"Guided Learning Journey / Learn Web4 Progressively / a curated learning
pathway"* is the same complaint: eyebrow and title now name the thing the linking page
promised, and `layout.tsx` metadata follows (it also carried "aliveness", a route retired
in the Jul-15 rebuild).

**Render gate widened** from `completedConcepts.size < 3` to `!beginnerComplete`. The old
gate matched a box that listed three; now that this box IS the page's answer to "what do I
read, in what order," vanishing at 3 would send a mid-path reader back to the four-pathway
selector as the first thing. It now ends exactly where the graduation banner begins.

### Second half: "Practice Actions" was offering reading as participation

The visitor's other half was *"'Understanding emerges from participation,' but there is
nothing to participate in."* **Their premise is half wrong**, which decided the fix
direction: participation does exist (hestia runs, the hub is forkable, both AGPL) and this
page's own capstone already says so correctly. What did not exist was any of it in the
section that claimed it. A `Practice Actions` grid promised *"these actions help you
internalize understanding through participation"* with `INTERACTIVE` / `BUILD` / `EXPERIMENT`
badges and a **"Try it"** button, and **every path duplicated one of its own concepts as an
"action"**: beginner listed `/first-contact` and `/running-now` (its own concepts 3 and 5),
intermediate listed `/hestia` (its concept 3, linking to the explainer page, not the
software), advanced listed `/glossary` (its concept 9), practitioner listed `/manifest` (its
concept 6). Only the practitioner GitHub-issues link was an action at all, and the
practitioner "What's Next?" copy already offers it in prose.

Deleted: `ActionNode`, all four `actions` arrays, the section, and the `· N actions` half of
the path-selector counts (which the visitor also named). The philosophy note's opening clause
was **not** deleted as the visitor literally suggested, because the claim is true of the site;
it now points at where participation actually is instead of asserting it in the abstract.
**No sim provenance is asserted anywhere**: the `interactive`/`build`/`experiment` typology
looks like Society Simulator residue but `git log -S` does not establish it, and the case does
not need it (the actions are self-duplicating regardless of origin).

**Counts replaced with a page count, not a time estimate.** Only the beginner path has an
agreed total (30 min, pinned across three surfaces); minting three more would put three new
falsifiable numbers on a site the same visitor said "argues with numbers, and the numbers
don't hold still." Not even the agreed 30 is repeated on the Start Here card: the box directly
above already carries it, and a fourth copy would widen the cascade for no reader benefit.

**Cascade debt grew and is recorded.** The box now carries per-item copies of all five
beginner durations, so a single duration change lands in **six** places, not four. That is
stated on the box's own guard comment, on the `/first-contact` card that owns the 7, in
`navigation.ts`, and in `/tldr`'s card comment. Three guard comments that cited the retired
`"New here? Start with these 3"` heading by name were re-anchored to the live one.

**Deliberately deferred, so a recurrence stays legible**: the "Learning Philosophy" section
itself. The visitor named it (*"I don't need a philosophy of pedagogy"*) and it is still
standing. Removing it is a structural call about what `/learn` is for, not a defect fix, and
this pass already moved the page's lead. If a later log complains about `/learn` bloat again,
that is the next thing to take, and it is a **recurrence, not a new finding**.

**Untouched from this log**: all five LOWs. `/glossary#acronyms` (R6/R7/SAL/RBAC) is worth a
look but note `glossary:571` records R6's exclusion from the acronym box as a deliberate call
whose sibling (MCP/RDF, Jul-28) was reversed on "entry-level by position in the reader's path"
reasoning that now arguably applies to R6 as well. `/value-tensor` collusion is standing
ledger Q3. The offsite GitHub repo description is not a site file.

## Aug-01 visitor MEDIUMs 3+4 (Aug-02 03:00 session) - the block that routes one reader in three, and a promise read in the wrong sense

Same log (`visitor/logs/2026-08-01.md`, browsed 05:11 against `21bb94a`). Both items come from the
same journey entry (`/onramp` at 41:30, Confusion points 1 and 2), so they were taken together.
Prior disposal of this log: HIGHs 1+3 -> #505, HIGH 4 -> #506, MEDIUMs 2+5 -> #507, HIGH 2 is the
standing hardbound-is-private operator call, MEDIUM 1 is the standing 0.5-endpoint escalation.

### MEDIUM 3: two of the three "Pick your scale" cards described the binary, not the reader

Retest gate first. `SESSION_FOCUS.md:1981` records an `/onramp` routing MEDIUM from Jul-25/26 as
"#486 already treated this; retest-gated". **#486 (`735d5cc`) did not touch `/onramp`** - it
reader-routed the `/running-now` CTA. The Aug-01 log is fresher, and the visitor quotes the Personal
card verbatim, so this is a licensed recurrence rather than a pre-empted retest.

`onramp:250-259` (Personal) already opened *to the reader*: "If you are one person, or one agent on
your own machine, this is your scale." Community and Enterprise opened with what the binary does.
The openers added to both are **propagated from `running-now:396-397` and `:420-421`**, the wording
#486 shipped for this exact friction on that page, not coined fresh.

Each card also now carries its own tier's state, which is #506's lesson applied: the card that
recruits a tier discloses that tier's caveat **in its own body**, because a reader who self-selects
at "Pick your scale" may never reach the maturity ladder further down. Community gets the
consequence-for-the-reader register (`running-now:400-401`: "you would be standing up one of the
first live instances, not joining an existing network"); Enterprise gets the recruitment-relevant
half only ("usable and under active hardening, not production") and defers the on-device
specificity to the ladder rather than echoing it 60 lines early.

The Personal card is untouched. The ordering guard at `onramp:14-35` cites its phrase "the
lowest-friction, hands-on entry" as the block's articulable reason for personal-first ordering.
No surface was reordered. The Enterprise opener asserts nothing about hardware being *required* to
participate (live `[[hardware-required-seam]]`) and nothing about hardbound's availability or
openness (#500).

### MEDIUM 4: the promise was right, the sense was wrong, and the surface was not /tldr

Filed as "/tldr's link promised 'adoption order and **the real seams**'... there is no seams
section". The quoted phrase is **not in `/tldr`'s markup** (its own inline card at `tldr:322-325`
says something else). It is `navigation.ts:131`, rendered on `/tldr` by `RelatedConcepts` and also
by `SiteSearch`. And `/onramp` **does** deliver: `onramp:295` is the section, and its first
sentence is "These are the real, in-code seams, not aspirational ones."

So the defect is **word overload**, not a missing section. This page owns "seams" = the joins
between the pieces, in its body *and* its `metadata.description` ("the real in-code seams that
connect them"). Bare "seams" in a link blurb reads colloquially as *rough edges*, which is what the
visitor came for (they named hardbound's mocked TPM, hestia's gate bypass, and the hub's absent
network as the material they expected). Growing a limitations section under that word would take
the word away from the meaning the page already owns and deepen the overload. **The promise moved
instead**: `navigation.ts`'s `/onramp` desc now matches `onramp:41` in sense, `seams` was added to
that entry's `keywords` so `SiteSearch` resolves it, and the destination heading now carries the
word so a heading-scanner lands on it.

### The residual the visitor actually found, and it was a seams-integrity defect

"Nothing about rough edges beyond one clause about hardbound's hardware binding" is an accurate
reading of `onramp:341-357`: only the hardbound bullet carried a caveat. That left `/onramp` more
optimistic about hestia and the hub than `/hestia`, `/tldr` and `/running-now` are about
themselves. Both bullets now carry one propagated caveat (hestia's from `hestia:577-591`, the hub's
from `tldr:255-256`) and link out. This is not a new section and does not touch the word "seams".

`/onramp` had **zero** `id` attributes before this pass; `#seams` is its first. `/hub`'s honest
boundary section also had none, so it gained `id="honest-status"` to match `/hestia:544`'s existing
name, letting the ladder land a reader on the caveat rather than the top of the page. A general
`/onramp` anchor pass is still owed and was deliberately not started here.

### Deferred from this log

- **MEDIUM 1** (`/first-contact` "Above 0.50") remains the standing endpoint escalation.
- **MEDIUM 6** (`/learn` weaker than the `/tldr` section that links it) is untaken and free. It is a
  page restructure rather than a clause fix, which is why it was not bundled here.
- **All five LOWs free**, with one narrowing: the R6/R7 acronym-index LOW is **not** the filed claim.
  The letters *are* expanded at `glossary:578` ("Rules + Role + Request + ..."), and R6's exclusion
  from "Acronyms at a glance" is a deliberate decision documented at `glossary:567-571`. The
  residual, if any, is that the acronym box is where a reader looks. Do not re-litigate on the
  visitor's framing.

## Aug-01 visitor MEDIUMs 2+5 (21:00 session) - two figures that argue against themselves

Same log, same class the Honest Assessment names: *"the site argues with numbers, and the numbers
don't hold still."* HIGHs are disposed (1+3 merged as #505, 4 open as #506, 2 is the standing
hardbound-is-private operator call). Took the two MEDIUMs where a figure actively undercuts the
argument it was placed to support.

### MEDIUM 2: an ROI no instrument produces, in either direction

`/what-could-go-wrong` risk 4 said *"Web4 simulations show that honest strategies yield ROI of ~0.93
while Sybil strategies yield ~0.90. The margin is small."* The visitor: both are below 1.0, so it
*"plainly reads as honest participation also loses money."*

The instrument still exists and still runs. `lib/game/agent_based_attack_simulation.py` defines ROI
as `sum(net_profit)/sum(atp_staked)` (:156, :162), prints it signed, and treats `roi < 0` as
UNPROFITABLE (:383). **In its own units 0 is break-even, not 1.0**, so defining the ratio (the
visitor's suggestion) would turn 0.93/0.90 into +93% and +90% returns and invert the sentence they
support. Run this session it reports **honest -40.0%, malicious -98.4%**, honest advantage 58.4pp,
so neither figure is reproducible and *"the margin is small"* was false of the only measured margin.
The one other place Sybil ROI was ever measured (web4 federation stress, Feb-27) recorded **-108%**.
Upstream `web4/SECURITY.md` discloses the gap three times (:86, :195, :226).

Both figures deleted, with the adjective leaning on them. **The sim's magnitudes were deliberately
NOT imported**: -98.4% is a stronger reassurance than the number it replaces, and the same run has
honest agents at -40%, which makes the visitor's complaint *true*. So the replacement concedes it
(*"an agent whose stake is large against its earnings can finish down either way"*) rather than
denying it, keeps only the arithmetic that is checkable (30 circular transfers of 100 ATP shed ~150
in fees), cites the upstream gap, and closes on *"farming is a worse deal than working," not "the
economics have been proven safe."* It does not reach for general deterrence, because #504 lands a
block in the same card whose finding is that `P = 1 - (1-p)^N` presumes witnesses outside the coalition.

**Second defect closed in the same box, not in the visitor log**: the line said circular transfers
*"destroy ~150 ATP"*, a burn-model residual the #464 sweep missed. Canon is that the 5% routes to a
community redistribution pool and is not destroyed.

**Still open, deliberately**: `atp-economics` keeps bare burn language at `:1954` (*"5% burned per
transfer"*, comparison table) and `:1986` (heading *"Why does every ATP transfer destroy 5%?"*).
Those are locally reconciled two lines later at the `#atp-burn-fee` anchor, which SESSION_FOCUS has
recorded since #464 as a kept term of art. Different shape from a bare "destroy" inside a mitigation
argument, so out of scope here; noted so a later session does not read this as swept.

### MEDIUM 5: `/coherence-index` told readers the demo would not catch them

The FAQ closed with *"real life changes affect one or two dimensions at a time. An attacker taking
over your account affects all four at once."* The visitor caught it against the collapsed math box.
It is worse than that: **all four presets in `#try-it` degrade exactly one dimension** (spatial 0.3 /
capability 0.4 / temporal 0.5 / relational 0.6), the panel intro says *"even one compromised dimension
tanks your effective trust"*, and the geometric mean at :1090 exists so one dropped dimension cannot
be averaged away. If the sentence were true the geometric mean would be pointless. The other half
fails against the page's headline takeover example: **Maria's stolen phone fails two dimensions of
four**, spatial and capability explicitly OK, same device and same city.

Fix direction is the prose, not the widget. The visitor suggested making the worked example an
all-four attack, which would destroy the page's argument. The FAQ already **opens** with the right
criterion (*"human speed or impossible speed"*) and then contradicts its own opening four paragraphs
later, so the repair is to carry the opener down: the signal is plausibility and speed, not dimension
count; a single dropped dimension is exactly what CI notices; what a genuine transition gets is a
recoverable dip. Their second suggestion (a legitimate one-axis case that stays acceptable) had
already shipped as the Alice 0.5 -> 0.78 step-by-step, but inside a collapsed `<details>` two
sections up, so it is now pulled inline into the FAQ. The alive/dead threshold is not restated in
either polarity (standing 0.5-endpoint escalation).

**Deferred from this log**: MEDIUM 1 (`/first-contact` "Above 0.50") is the standing endpoint
escalation. MEDIUMs 3 (`/onramp` reader-keyed routing), 4 (`/tldr` promises seams `/onramp` lacks),
6 (`/learn` weaker than the `/tldr` section that links it) are untaken and free. All five LOWs free.

## Aug-01 visitor HIGH 4 (15:00 session) - the card that recruits the tier it describes wrongly

Same log as the 09:00 session (`visitor/logs/2026-08-01.md`, browsed 05:11 against `21bb94a`).
Of the four HIGHs, #505 took 1 and 3; HIGH 2 (/hardbound has no reachable repo) remains the
settled operator positioning call from #500 and was not re-litigated. This session took **HIGH 4**,
the one the log's Honest Assessment names as its second theme: *"where the bad news lives... The
honest material has already been written; some of it is just filed under 'risks' when it belongs
under 'here's your option.'"*

### The visitor's premise is half wrong, and the residual is worse than the filing

Filed as: the software-only device-loss consequence *"appears only in risk 8 of
/what-could-go-wrong"*. It does not. `/lct-explainer` already carries it twice, ~270 lines above
the card in question: **L1046** (*"Software only - no second witness to vouch. You start over from
zero with a fresh identity"*) and **L1058** (*"there's nothing to recover to"*). So this is not an
absent disclosure and the fix is not a relocation from the risks page. It is **placement and
scope** at `#single-device`, the card where the tier is actually chosen, which carried **two
statements that are false for the reader it recruits**:

1. **Unscoped range.** Heading "Only have one device?", ceiling *"typically 0.50-0.75 depending on
   hardware"*. Per this same file at **L628-629**, `0.50` is precisely the software-only case
   (*"a software-only setup stays at 0.50 however many devices it spans"*). A chip-less reader
   lands on the bottom of that range and reads the whole card as theirs.
2. **"Adding a second device later raises your ceiling retroactively"** is false for exactly that
   reader, and L628-629 says so ~690 lines up in the same file. The parallel sentence at L641-643
   is correctly scoped (*"A single device **with this manufacturer attestation**..."*); this one
   never was.

Fixed by scoping the promise to hardware and adding one paragraph naming what changes for the
chip-less reader (ceiling does not rise; no second witness, so device loss means starting over),
propagated **verbatim from L1046 on this page**, not re-derived and not imported from risk 8's
wording. The contrast with the hardware-bound path (community vouching over 3-7 days) is carried
along so the paragraph states a tradeoff rather than a verdict, and it hands off to the existing
`#software-only-survival` callout instead of re-deriving what a 0.50 ceiling costs.

### A second instance, found on the reviewer's sweep

The bootstrap FAQ's *"Add a second device any time"* line made the same unscoped promise: *"Add a second device any time:
ceiling rises retroactively."* Context does not scope it, because the paragraph names the
software-only reader two sentences earlier (*"capped at the software-or-single-hardware tier"*).
One word (*hardware*), aligning it with L641-643. Fixing only the first instance would have left
the identical false-for-software-only promise live on the same page.

### What was deliberately not written

- **No comparison against 0.50, in either direction.** The card's old closing clause was *"You can
  fully participate, post, earn ATP, and build karma"*. Harmless while the card was unscoped;
  the moment the software-only tier is named in that card, "fully participate" sits adjacent to
  0.50 and asserts what the guard at `lct-explainer:258-259` forbids (that a reader sitting *at*
  0.50 has full access), which is the same defect #497 removed at L1307 and still ledger **Q1**.
  Replaced with the phrasing already shipping 55 lines up at L1247-1250 (*"what changes is the
  **terms** of your participation"*), which the same visitor praised at another surface. This is
  the "two fixes in one pass can fight" shape: the scoping fix would have re-armed the reading
  #497 exists to defuse.
- **Aug-01 MEDIUM 1** (`/first-contact`: *"Above 0.50: full access"*). Its literal suggested fix is
  *"restate as 'at or above 0.50'"*, which is the exact wording banned by the guard at
  `first-contact:265-270`. Not taken. Its unprohibited half (that a software-only reader sits
  permanently on the access line) is the same knot as this HIGH and is now answered at
  `#single-device` and `#software-only-survival` on `/lct-explainer`.
- **Still a ceiling claim, never an eligibility claim** (guard at L273-274, live
  `[[hardware-required-seam]]`). The inclusion message is unchanged: the tier is in, it just
  stopped carrying two promises that do not apply to it.

### Noted for a future browse, not fixed here

`lct-explainer:2156-2159` (the "What if I only have one device?" FAQ) says a single-device user
*"can reach the same trust levels as a multi-device user in most roles"* - arguably loose for the
software-only case, by the same L628-629 authority. Pre-existing, never filed by a visitor, and
fixing it in this pass would have been scope creep.


## Aug-01 visitor HIGHs 1+3 (09:00 session) - one price for one thing, and a rate that never existed

Fresh log `visitor/logs/2026-08-01.md` (browsed 05:11 against main at `21bb94a`, so **#504 was not
live for it** and nothing here credits or blames that PR). Four HIGHs; two are not free. Taken: HIGH 1
and HIGH 3, which are the two the log's own Honest Assessment names as the damage: *"the site argues
with numbers, and the numbers don't hold still... this taught me to stop trusting any specific figure
and to read only the prose."*

### HIGH 3: "90% per hop" was never a rate, and the rest is a canon question

`/how-it-works#agents`: *"A 5-hop pipeline where each agent has 0.9 trust ends up at 0.59... each hop
keeps only 90% of what reached it."* `/trust-neighborhood`: *"0.7x per hop"*, 30% per hop, hard zero
past 3. The visitor went between the pages twice and gave up: *"they must mean different things by
'hop', but neither page says so."*

The sweep settles the direction: **every other "per hop" figure on the site is 0.7** (`terms.ts:104`,
`glossary:497`, `why-web4:2315/3174/3210`, `trust-tensor:1381`, `trust-neighborhood/layout.tsx:6`).
The 90% was a single outlier and it was **not a rate at all**: the same sentence stipulates *"where
each agent has 0.9 trust"*, then restates that stipulation as a law. Repaired in place (*"the 90% a
step keeps is that agent's own trust score, not a rate charged for the hop: put an agent at 0.6 in
the chain and that step keeps 60%"*), which is an error correction licensed by the card's own
preceding clause. Both pages now also say what their number **composes**, and cross-link.

**What was NOT written, and why it matters more than what was.** I proposed this as fully derivable
from `trust = t1 x t2 x t3 x 0.7^depth`, and the policy reviewer rejected that premise. The formula
separates the two factors *within one computation*; it does not license saying a delegation pipeline
drops the depth term. That boundary appears **nowhere on the site**, and upstream leans against it:
`mrh-tensors.md:210-214` applies `decay_factor ** (i+1)` to every path, `LCT-linked-context-token.md:546`
states horizon depth generically, `inter-society-protocol.md:380` leaves transitivity-vs-attenuation
society-sovereign. If the depth term does apply, `/how-it-works`'s headline is wrong by ~6x
(`0.9^5 x 0.7^5 = 0.099`) and a 5-hop pipeline crosses a wall the other page calls hard. Filed as
**ledger Q11**, not shipped.

A third instance surfaced during the sweep and was deliberately left alone: the *Transitive
attenuation* invariant (`how-it-works:1332`) is the neighborhood setting proper (Alice judging Carol
through Bob) and computes `0.9 x 0.6 = 0.54` where `/trust-neighborhood` would give `0.26`. The
invariant it asserts holds under either, so only the worked value is exposed. Patching it alone would
put a third number on the site for one quantity. Guard comment updated in place: the pre-existing one
cited `trust-neighborhood:588` as *supporting* this page's reading, i.e. it recorded the conflation as
authorization. Checked and non-conflicting: `atp-economics:2032` charges 5% ATP per delegation hop,
which is a **fee**, not trust.

### HIGH 1: $500 was the top of the site's own range, quoted as a point estimate

`/what-could-go-wrong` Risk 4: *"$500 in hardware"* per identity, *"$500K for 1,000 identities."*
`/why-web4:1391-1392` and `/lct-explainer:2193-2194`: a *$50 phone*, a *~$25* FIDO2 key. The visitor:
*"at the FAQ's own prices, 1,000 identities costs $25K-$50K and risk 4's mitigation collapses."*

The number moved at Risk 4, not at the FAQ: the FAQ side states a reason (*"most devices sold since
~2018 ship security chips"*) on two pages under an honest caveat, while Risk 4 had a bare figure with
no source. **My first rationale for that was wrong and the reviewer caught it**: I wrote that $500 was
outside the site's own range, and it is not. `your-internet:97` reads *"$50 to $500 each"*, so $500 is
the range's **upper endpoint**, quoted as a point estimate. That correction changes the landing value:
Risk 4 now carries the **existing range** ($50 to $500 per identity, $50K to $500K per thousand),
which needs no edit to `/your-internet` and satisfies the visitor's literal ask. Landing on the low
end instead would have discarded the site's own upper bound and left `/your-internet` as the only
surface acknowledging spread, reproducing the complaint somewhere new.

Also closed in the same push, missed by my sweep and found on review: `lct-explainer:1797` priced a
FIDO2 key at **~$30** where `:2194` and `why-web4:1392` both say **~$25**. Same device, third figure.
Every rendered price on the site now falls inside $25 to $500.

**The entailment, because a gentler number on a risk page is a reassurance if it ships alone**: at any
price in that range the hardware is affordable to the adversary Risk 4 names, so the barrier was never
the hardware. The new closing paragraph rests the stakes on the per-identity **time** cost instead
(a thousand histories other participants witnessed, accruing in calendar time), which is where the
card's own Honest assessment already points.

Two things it deliberately does **not** lean on, both reviewer conditions:
- **`P = 1 - (1-p)^N`.** #504 adds a block ~20 lines below whose finding is that this formula presumes
  witnesses *outside* the coalition, which a coordinated Sybil operator does not supply. Amplifying it
  as the replacement barrier would re-arm the exact reading that block exists to defuse.
- **The ROI ~0.93 / ~0.90 figures**, which this same log files as a MEDIUM (undefined ratio, both
  below 1.0, *"reads as honest participation also loses money"*). Untouched, and now not load-bearing.
- And it says nothing about whether hardware is **required**. The visitor's journal bundles the price
  seam with the standing [[hardware-required-seam]]; the friction table row is price-only.

### Registered, not fixed

- **HIGH 2 (/hardbound has no reachable repo)**: the standing **operator positioning call** from #500,
  re-registered by #504. The visitor added a datum worth keeping: they actively tried to verify the
  *"300+ Rust integration tests"*, followed the page's only code link to `github.com/dp-web4`, found
  no hardbound repo, and it is the one place on the site where they tried to check a claim and could
  not. Still not a session-level fix.
- **HIGH 4 (/lct-explainer recruits software-only users without the device-loss consequence)**: the
  premise is **false**, and this was verified before proposing. `lct-explainer:1046` already says
  *"Software only - no second witness to vouch. You start over from zero with a fresh identity"* and
  `:1059` says *"there's nothing to recover to"*; `what-could-go-wrong:579` cites `lct-explainer:1040`
  as its own source, and both sit **above** the recruit line the visitor quoted.
  **The sharpened residual, for the next session** (verified by the policy reviewer as a real defect,
  same class as the three reassurances #502 fixed): `lct-explainer:2100` reassures that the tiers
  differ *"in recovery speed and trust ceiling, not in your ability to participate."* For the
  software-only tier named in that same sentence, per this page's own `:1059`, there is no recovery
  at all. The gap is absence, not speed. One page, one clause, no canon needed.
- All seven MEDIUMs and five LOWs. Note for whoever takes them: the `/first-contact` MEDIUM's literal
  suggestion (*"restate as at or above 0.50"*) is the **standing 0.50-endpoint escalation** and must
  not be copy-fixed.

### Also in this push
- `npm run build` green, 31 static pages. 0 em dashes and 0 "production-ready" in added lines.
- No trust number changed anywhere. The only numbers that moved are three prices, all onto values the
  site already carried elsewhere.
- New anchor `trust-neighborhood#hop-decay` on the section that renders the decay ring and the
  *"0.7x per hop"* caption, **not** on the `Formula` `<details>` below it, which holds the line that
  actually separates the two factors and arrives collapsed. The new mirror sentence lifts that line
  out of the `<details>`, since the visitor never opened it.
- Guard comments beside every insertion, each naming what the block must not become.

## Jul-31 visitor MEDIUMs 3+4 (Aug-01 03:00 session) - two numbers that measure different things, and a ceiling the page never mentioned

No fresh visitor log (this session ran at 03:01, cron fires 05:00), no open PRs, no CHANGES_REQUESTED.
The Jul-31 log's HIGHs went out in #502, MEDIUMs 1+2 in #503; MEDIUMs 3 and 4 were the next unclaimed
rows in visitor table order.

### MEDIUM 4: /trust-tensor taught 0.90 as reachable through attestation alone

This one was **handed forward by name**. #502's guard at `trust-tensor:406` said: *"That one is
untaken: this page still teaches 0.90 as reachable through attestation alone where Alice is
introduced."* Alice is the analyst at role-weighted 90%, and 0.90 is what `lct-explainer:283` calls
the hardware-bound ceiling. Nav order puts this page first.

Shipped: an anchoring-ceiling block at the Alice read point, plus `id="trust-ceilings"` on
`lct-explainer:1091` (the "maximum T3 trust score" paragraph that sits directly above the tier grid).

Two traps worth recording, both caught on policy review, not in drafting:

- **The link I first proposed was wrong.** `/lct-explainer#hardware-tiers` is the *"What are TPM,
  Secure Enclave, and FIDO2?"* `<details>` glossary, and it arrives **collapsed** (its own guard at
  `:452` warns about exactly this). The tier grid it looks like it points at had **no id at all**.
  Anchor targets on this site need checking against what renders, not what the name suggests.
- **"attestation is not what limits these scores" would have manufactured a contradiction.** The
  block sits three lines under Temperament **95%**, which is above every chip ceiling. The site does
  not settle per-dimension capping (`lct-explainer:1247` caps "your T3 trust", the composite), so the
  wording is *"the role-weighted number they combine into"* and never "these scores". Per-dimension
  capping stays unadjudicated, deliberately.

Also exact, not vague: **three** device witnesses per `lct-explainer:1099-1103`, not "several".

### MEDIUM 3: same number, opposite verdicts - and neither page can actually tell them apart

`/atp-economics:960`: *"Even three founders who confirm each other's work can recharge ATP from day
one."* `/what-could-go-wrong:343` (Risk 4): *"coalitions become unprofitable at 2-3 members."* The
visitor: *"I cannot tell how the mechanism distinguishes the founders from the ring, and both pages
sound confident."*

**I proposed this as an explanation fix and the policy reviewer was right to reject the premise.** My
rationale said both pages already state the distinguishing mechanism without naming it. They do not,
and the reason is sharp enough to be the session's main finding:

> **Neither candidate signal discriminates at N = 3.** The ATP page's *"work that others later also
> confirmed"* is degenerate when the "others" are the remaining two founders. Risk 4's
> `P = 1 - (1-p)^N` presumes each conspirator is an independent draw against witnesses **outside**
> the coalition, which a founding group does not have.

Writing a discriminator sentence would have been inventing canon under ledger **Q3**, whose holding
pattern is explicit: *do not invent anti-collusion claims in prose*. So what shipped is a
**measurement-scope** fix on both surfaces (what does this number measure) that ends on the limit,
not the reconciliation. Both blocks now cross-link.

Three drafting errors the reviewer caught, all worth keeping as habits:

1. **I inverted the bound.** I wrote *"the largest conspiracy that still pays"* for "unprofitable at
   2-3 members". It is already unprofitable at 2, so that phrasing is off by the whole bound, and it
   disagreed with my own sibling sentence. Fixing a two-number seam while opening a seam between your
   own two new sentences is the worst available outcome.
2. **I borrowed a word that means something else on the destination page.** I lifted "cheap" from
   `what-could-go-wrong:909` (meaning *unpoliced*) into `/atp-economics`, where "cheap" means **ATP
   price** throughout (`:474`, `:1371`). Same word, wrong page, wrong quantity.
3. **I miscounted the genesis group.** `#cold-start` says a founder invites 2-3 trusted contacts, so
   it is **three or four** people, not three, and I had it wrong two paragraphs from the citation.

And one thing cut on review: the closing *"Different regimes, not different verdicts"* was too
resolving for a risk page. A tidy cadence at the end of a paragraph whose content is *this bound does
not protect you in the founding regime* converts a disclosed gap into a reassurance, which is the
exact defect this same log filed as HIGH 1. It now ends on the entailment instead.

### Registered, not answered: ledger Q3 gate is still ARMED and UNFIRED

The Jul-31 visitor re-asked the collusion question twice (their Unanswered Q4 and Q5) and **did not
open `/value-tensor`** (their journey lists twelve pages, it is not among them). The Jul-30 visitor
missed it the same way. Two consecutive near-misses, gate unfired both times. `docs/WEB4-CANON-QUESTIONS.md`
Q3 now carries a dated addendum recording the near-misses, the N=3 degeneracy above, and a note that
**`reciprocity density` is a *permitter* on both live surfaces** (`atp-economics:961`,
`why-web4:1671`), not a detector. Visitors keep guessing it as the discriminating signal; the site
cannot use it that way without contradicting itself, so any ruling should say so explicitly.

### Also in this push
- `npm run build` green, 31 static pages. 0 em dashes and 0 "production-ready" in added lines.
- No trust or ATP number changed anywhere. Diff is additive apart from one guard-comment rewrite and
  the new `id`.
- Guard comments added beside all three insertions, in the `trust-tensor:406` style, each naming what
  the block must not become. `trust-tensor:406` itself updated, since it declared MEDIUM 4 untaken.
- Untouched: MEDIUM 5 (the standing **hardware-required seam**; the MEDIUM 4 fix is a *ceiling* claim,
  not an eligibility claim, per the codification at `lct-explainer:274`), HIGH 4 (/hardbound banner,
  operator positioning call), MEDIUMs 6+7 (die/reborn register), all five LOWs, the 0.50 endpoint, and
  the two off-page "earn more than they spend" copies the 21:00 session left as a direction call.


## PR #502 review response (21:00 session) - a synonym walked through a phrase-grep

No new visitor log (cron fires 05:00; this session ran at 21:00), and Protocol v2 Step 2 puts a
blocked PR ahead of new scope. #502 was **CHANGES REQUESTED** at 17:08Z and **BLOCK STANDS** at
23:07Z, because the 15:02 session opened #503 on a different scope instead. One-line ask, in a
file the PR already opens. Everything else in #502 was verified and approved by the reviewer and
is untouched here.

### The ask, and why it is the same defect twice

`atp-economics` "Why This Matters" read *"Value creators earn more ATP than they spend"*: the
claim the Key Insights card was fixed for in the same push, unqualified, in a summary conclusion,
**835 lines below the fix on the same page**. It survived because #502's sweep was keyed to the
string "earn more ATP than they **cost**" and this one says "than they **spend**". The visitor's
own diagnosis names four kinds of place a reader stops (summary card, mitigation bullet,
worked-example conclusion); "Why This Matters" is a fifth, and it was not in the set.

Fixed by naming the channel and linking the canonical phrase this page already repeats on every
surface that teaches the split: *"Value creators earn more than they spend on work someone else commissioned and
priced: recharge refunds, payment earns."* The karma clause and the bad-actors clause are intact,
and the bullet stays the length of its neighbours (policy-review condition: match the register,
do not transplant the Key Insights expansion).

### The rule that goes with it: sweep the claim, not the sentence

The header guard now carries the synonym set to grep ("than they cost", "than they spend", "earn
more than", "earn more ATP"), the exclusion for **comparative** uses (`terms.ts:150` compares good
work to bad, `trust-tensor:1161` compares agents; both true of either channel, and the reviewer
verified `terms.ts:150` as a regression risk if "fixed"), and a boundary the sweep must not
overrun. Recurrence chain on this claim: Jun-11 → Jun-12 → Jul-30 → Jul-31 → this. Every link
failed the same way, by scoping the next sweep to the surfaces the last fix touched.

### Registered, deliberately NOT fixed: two off-page instances

The claim-level grep the reviewer asked for surfaces two live unqualified copies his own grep key
could not have found:

- `src/app/how-it-works/page.tsx:1355` ("Quality Compounds" card): *"Value creators earn more than
  they spend. ATP accumulates. Trust grows."*
- `src/app/first-contact/page.tsx:889` (ATP Economics concept card): *"Spammers burn ATP faster
  than they earn it. Quality creators earn more than they spend."*

Widening to them was **cut on policy review**, and the reason is not scope discipline: it is that
the fix direction is undetermined. `atp-economics:862` quotes *"value creators earn more than they
spend"* **verbatim** and scopes the quote to *other pages*, telling the reader that this page's
payment channel is what those pages mean. Editing the two cards silently picks one of two coherent
end states while leaving `:862` asserting the other, which would leave a quote pointing at a phrase
that exists nowhere. That is a fresh seam, filed against the page this PR is fixing. The choice,
for whoever takes it:

1. **Keep the shorthand** on the beginner pages and give each card a route to the reconciliation
   (`/atp-economics#net-positive`), leaving `:862` true as written; or
2. **Retire the phrase** everywhere and delete the "other pages" clause at `:862` with it.

Note `:862` says *other* pages, so it never covered `atp-economics`' own instance. That is why the
in-page fix above needed no direction call and these two do.

### Also in this push
- **Merged `origin/main`** (#503) rather than rebasing: force-push is hook-denied on this repo, so
  a rebased PR branch cannot be published. The single conflict was the expected `SESSION_FOCUS.md`
  one, both sides purely additive, concatenated in date order (21:00, 15:02, 09:00).
- `npm run build` green, 31 static pages. 0 em dashes and 0 "production-ready" in added lines.
- Untouched: HIGH 4 (`/hardbound` banner, operator positioning call), the hardware-required seam,
  the 0.50 endpoint, every trust/ATP number, and the remaining Jul-31 MEDIUMs and LOWs.

## Jul-31 visitor MEDIUMs 1+2 (15:02 session) - the failure we already measured was missing from the failure page

PR #502 (09:00) took the four HIGHs and handed this scope forward explicitly, saying it needed a
ground-truth check in `../hestia` rather than a copy fix. I did the check. The answer was in
`hestia/docs/GATE_BYPASS_CATALOG.md`, and it is unambiguous enough that upstream attached a
standing instruction to it.

### The finding: the site said the opposite of what upstream measured

Catalog **D2, "Selective non-witnessing"**: *"Any Class A/B/C bypass is also a witnessing bypass,
since the same hook does both. There is no independent observer. Consequence: the chain is a
record of governed activity, never a complete record of activity. Reading chain silence as
'nothing happened' is unsound, say so wherever the chain is presented as evidence."* Catalog
section 11 repeats it in the acknowledgements "to put in front of anyone relying on hestia".

`hestia:319-323` said: *"because the witness chain is tamper-evident and the policy gate runs
before each act, what your record claims and what actually happened can't silently diverge."*
Both halves wrong, and **contradicted by the same page 200 lines down** (the gate "is not built to
stop a sophisticated agent from routing around it, two environment variables suffice today").
The comfortable version was the one under the heading "Why local-first matters". Exactly the
defect class the Jul-31 visitor named in their Honest Assessment.

### What shipped

1. **`/hestia` completeness limit** at the "Why local-first matters" close. Answers the visitor's
   **Unanswered Q1** ("does the witness chain still record actions from an agent that bypassed the
   gate?") in the direction they asked for if the answer was no: it says so. The chain is a record
   of governed activity; silence in it is not proof nothing happened; the limit comes from the
   gate running inside the agent's process, so heuristics do not reach it.
2. **The same-page universals, narrowed** at `hestia:115` ("For AI agents" card) and `hestia:461`
   (the "Solo is not the mechanism switched off" block, whose Jul-29 Q8 job is untouched). Both
   said "every action". Policy review caught these: shipping the limit while leaving them standing
   would have made the page contradict itself twice, which is the defect being fixed.
3. **`/what-could-go-wrong` Risk 9**, "The agent routes around its own safety gate". The register
   was eight prospective risks; the one measured, present-tense, issue-numbered vulnerability the
   site discloses was absent from it. Also a **9th `RiskSelector.tsx` entry**: that jump list is
   hardcoded, so a card added without it is invisible to the index.

### What the wording deliberately does NOT do (policy-review conditions, all six met)

- **The divergence absolute is not restated in any weaker form.** Tamper-evidence survives only as
  the narrow claim it actually is (an entry cannot be edited or removed *later*), with the explicit
  rider that this says nothing about whether the entry was right when written. Catalog **D1**
  (MEASURED 2026-07-29: claude-code witnessed as kimi-code, identity is client-asserted) and **D3**
  (DEMONSTRATED: a third party manufactured 22 denials against codex, temperament fell to 0.371,
  caught only because a human noticed) mean written entries can be false.
- **Risk 9 does not offer the accountability record as a mitigation.** Same hook, no independent
  observer. That bullet would have been the identical false-reassurance shape #502 deleted from
  Risk 8's mitigation (4) one card above.
- **Nothing generalises to Web4.** The gate is one implementation in one piece; saying "Web4 policy
  gates are bypassable" would be a new canon claim about the standard, not propagation.
- **Not written as a scheduled repair.** Catalog section 8 grades D2 one of two entries that are an
  honest "no", "not detectable by any mechanism we have or plan". The structural fix (section 9,
  config out of the environment into the vault) is named only as unbuilt.
- **Untouched**: the hardware-required seam, the 0.50 endpoint, every trust/ATP number on the site.

### Recorded decisions, not oversights

- **The landing-page half of MEDIUM 2 was deliberately not taken.** `page.tsx:84-85` ("A proposed
  open standard for proving what an AI agent did") carries a guard at `:78-82`: *"there is no
  present-tense capability verb: this is what the standard is FOR, not something Web4 does today."*
  Already defused. Same for `tldr:93`, which the Risk 8 guard cites as the canonical promise.
- **`running-now:393`** ("every consequential act landing in your own witness chain") is knowingly
  left. It is a routing blurb describing the governed walkthrough, one hop from the piece's own
  page, which now carries the limit. Revisit if a visitor files against it.
- **`web4-explainer:116`** ("R6/R7 makes every action deterministic, auditable, and trust-scored")
  and **`hardbound:76`** ("records every action in signed audit bundles") are design-layer and
  different-piece claims respectively, not hestia's prototype. Not a seam. Left.

### Still open from the Jul-31 log
- **5 MEDIUMs**: founders-vs-collusion (ledger **Q3** adjacency); `/trust-tensor` Alice 0.90 vs the
  hardware ceiling (**waits for #502 to land**, it is open on that file); `/why-web4` affordability
  (standing seam, do not copy-fix); `/first-contact` "no fresh starts" vs karma rebirth; the
  die/reborn register clash. The death-definition half of the last one **already ships** at
  `first-contact:401` ("death here means Alice's standing is suspended... her identity and history
  persist"), so what remains there is ordering, not absence.
- **5 LOWs**, untouched.
- **`/hardbound`** banner remains the operator positioning call (#500), re-filed as a HIGH on
  Jul-31 with its strongest evidence yet and correctly not re-decided by #502.
- **Filed, not fixed**: `src/lib/terms.ts:214` and `:233` link to `/what-could-go-wrong#sybil` and
  `#goodharting`; both `id`s live on `/manifest`. Two dead anchors, pre-existing, for an anchor
  pass (which `/hestia` is also owed, 18 inbound links).

## Jul-31 visitor HIGHs (09:00 session) - the comfortable version lives where the reader stops

Fresh log `visitor/logs/2026-07-31.md` (05:11). **All seven** understanding boxes checked, "good"
comprehension, would return: the strongest result the persona can report. The visitor names the
defect class themselves and it is the whole of this session's scope:

> the site states the honest version *somewhere* and the comfortable version somewhere else, and
> the comfortable version is the one sitting in the summary card, the mitigation bullet, or the
> worked-example conclusion, which is to say the place a reader actually stops.

Three of four HIGHs fit that shape exactly. All three fixed at the **reassurance** surface, leaving
the **mechanism** surface as the authority. No numbers changed anywhere; every edit is a claim or a
label.

### HIGH 1: the risk register reassured the excluded tier with something untrue
`/what-could-go-wrong` Risk 8 mitigation (4) opened *"Software-only behavior still accrues
reputation normally"*. `/lct-explainer` says *"0.5 is both where you start and the highest you can
reach"*. A user pinned at their starting value accrues nothing, and this was the sentence doing the
reassuring, on the page whose entire purpose is not doing that.

Only the accrual half was deleted. **The eligibility clause is byte-identical and stayed that way**
(*"the ceiling caps high-trust roles, not basic participation"*), because a Jul-29 guard marks it as
the clause holding the eligibility side of the [[hardware-required-seam]]. Narrowing the bullet was
safe; rewriting it would have flipped the page toward "hardware required".

The replacement ships only what is grounded: participation (this page's own claim) and pseudonymity
(lct-explainer's). The visitor's suggested third item, *"a witness record of their own actions"*,
was **cut on policy review as ungrounded**: lct-explainer's device-loss paragraph says the
software-only case has no hardware witness and *"nothing to recover to"*.

### HIGH 2: an unconditional headroom promise, on the page that states the ceiling
*"you start at the neutral midpoint and earn your way above it, so a newcomer is not in danger"*
shipped byte-identically at `lct-explainer` (the page's ONE proactive anchor, in the intro above
every decimal) and at `trust-tensor`. False for a software-only newcomer, three paragraphs from
where the same page caps them at 0.50. Headroom is now conditioned on a hardware anchor on both
surfaces, which remain byte-identical to each other.

Three things the wording deliberately does **not** do:
- It never says the software-only newcomer *is* in danger. Their status is left unstated, because
  stating it rules on `>` vs `>=` at exactly 0.50 ([[trust-05-endpoint-canon-conflict]], ledger Q1).
- It does not re-author the consequence. The visitor asked for *"you cannot build a buffer above
  it"*; that **already ships verbatim in substance** in the `#software-only-survival` callout
  further down lct-explainer (*"what the software-only ceiling really costs you is margin ... no
  buffer above it"*). The parenthetical forward-points there instead of coining a third phrasing.
- "Capped at that midpoint" is a ceiling claim, not an eligibility claim, so the hardware-required
  seam is untouched.

### HIGH 3: fourth touch, and the first one to reach the illustration
`/atp-economics` concluded *"Hannah barely loses any and thrives"* over a card reading **Net: -8
ATP**, and the Key Insights card asserted *"High-value contributions earn more ATP than they cost"*,
which the same page's cap rule forbids (*"you can't profit on a single action, only recover its
cost"*).

The page's own header guard already diagnosed this in Jul-30's pass: *"Both prior fixes landed in
PROSE ... the LABELS were never touched, which is why it keeps recurring."* Jul-30 fixed the
simulator labels. It recurred anyway, because **the summary card and the worked-example conclusion
were in neither set**. Chain is Jun-11 browse B, Jun-12 browse A, Jul-30, Jul-31: fourth touch,
second consecutive browse. Also found a leftover copy of the same string in `how-it-works`'
Learning Across Lives bullets, which #498 left behind when it fixed that page's earning examples.

All three now name a channel, reusing the phrasing already shipping on five surfaces of
`/atp-economics` (**recharge refunds, payment earns**). Propagation, not a new claim. The
"dead by task 13" arithmetic was **not** imported: a June-11 parenthetical already frames both
negative nets as an artifact of the example pricing the task at exactly what each contributor
spends, and asserting a death task would contradict that fix and invent a number.

### HIGH 4: NOT fixed. Second browse in a row, and the escalation is where it belongs
`/hardbound` carries `NewcomerOrientationBanner`'s *"real, open-source software you can run
yourself, the proof Web4 works in practice"* over a page describing a **private, proprietary**
product. #500 scoped this, cut it on policy review, filed it as an **operator positioning call**,
and said do not copy-fix meanwhile.

What is new: Jul-30 filed it as a **LOW** about an uncheckable test count. Jul-31 files it as a
**HIGH** and names the **banner**, arriving there by following the site's own *"don't take this on
faith, read the code"* invitation to the GitHub org and finding no hardbound. Same escalation, and
now the strongest evidence in it: the visitor's Honest Assessment calls this *"the one place the
site's own standard slips"*. Recorded, not re-decided. See [[uncheckable-count-may-be-an-operator-call]].

### Not taken this session (7 MEDIUMs, 5 LOWs)
Next session triages them against a fresher log. Two worth flagging now:
- **`/trust-tensor` never mentions the hardware ceiling near the Alice example** (MEDIUM). This
  session's HIGH-2 edit added a ceiling mention to that page's calibration box, but the MEDIUM is
  about the Alice-across-three-roles illustration teaching 0.90 as reachable through attestation
  alone. Still open, and noted as such in the guard there.
- **The policy-gate bypass is absent from the eight-risk register** (MEDIUM). The visitor's sharpest
  structural point: the only measured, present-tense vulnerability on the site is disclosed on the
  product page and missing from the failure analysis. Their Unanswered Q1 (does the witness chain
  still record an action from an agent that bypassed the gate?) is the same thread and needs a
  ground-truth check in `../hestia`, not a copy fix.


## PR #499, second review response (Jul-31 03:01 session) - a pointer that rots is a guard that gets discounted
No new visitor log (cron fires at 05:00, this session ran at 03:01) and the Jul-30 log stays
exhausted, so Protocol v2 Step 2 makes the second **CHANGES REQUESTED** on #499 the task. Both
blocking items were narrow, mechanical, and **both were verified true before acting**. No
visitor-facing copy or numbers changed; this push is comment and record text only.

### Item 1: the record had shrunk a live defect from three sites to two
`SESSION_FOCUS.md:66` (shipped in the 02:15 response) claimed *"only `:116` and `:1295` exist"*.
All three exist and all three carry the claim: `:116` "Lurking is free", `:258` "Lurking costs
nothing", `:1295` "lurking is free in Web4". `day-in-web4` was untouched by the #500/#501 merge, so
this was not drift, the check simply returned the wrong answer. Five other lines in this same file
(`:163`, `:299`, `:318`, `:324`, `:372`) still cite three, so the record contradicted itself.
**Propagation debt the record has shrunk is debt that does not get paid**: the session that finally
takes `day-in-web4` would have under-scoped by a third. Corrected in place.

### Item 2: every cite in the new guard landed on the wrong card
The `#499` guard comment was written against line numbers derived **before** the `bc9e5d1` merge of
#500/#501 shifted `how-it-works` ~20 lines. All three were stale: `:556` ("0 net at best") is
`:577`, `:523` (the #498 guard) is `:541`, `:511` ("10-20 ATP") is `:529`. Fixed by the reviewer's
second option: **the integers are gone, replaced by names** ("the '0 net at best' card in the
two-channel block below", "the Jul-30 visitor HIGH guard under the 'Contributions Earn ATP'
heading", "the 'Costs ATP' card beside this one"). Also dropped "60 lines below", which is the same
rot in relative form, and `atp-economics:220` in favour of the vocabulary the sibling guard already
uses ("atp-economics summary item 3"). The convention is now stated in the comment itself so the
next session inherits the rule, not just the corrected pointers.

**Nothing on this surface has an integer left to re-derive.** That is the point: these guards exist
to stop a future session restoring a wrong percentage on a visitor-facing footnote, and a guard
whose corroborating pointer lands on the wrong card is one a session can talk itself out of.

### Not asked for, disclosed: the same rot in the #498 guard, and it never worked
`how-it-works:553` cited *"prior fix landed in PROSE (... L862 here)"*. `:862` is the karma rebirth
card at HEAD, and policy review established it was **already blank whitespace at #498's own commit**
`1f3afb9` (the referenced prose was at `:901-904` there, `:864` in the parent `8d31343`). So that
cite shipped wrong and was never right, which is independent corroboration of the reviewer's
root-cause note: line numbers computed against a tree that had already moved. Now named as "the
'task pays what the work is worth' parenthetical under the Three Lives worked example", with the
history recorded in the comment. Comment text only, one phrase, outside #499's diff.

### Still not taken
- **`day-in-web4:116/258/1295`** stays deferred, at its true size of three sites. Fix direction is
  defined by #499; pick it up once it lands.
- **Ledger Q1 / Q5 / Q8** still block the three remaining Jul-30 MEDIUMs.
- **`/hardbound` positioning**: operator call filed by #500.
- The Jul-30 log remains exhausted. Next session with a fresh log triages it, not a sixth pass.

## PR #499 review response (Jul-31 02:15 session) - the wrong denominator, twice
No new visitor log (this session ran at 02:15, the cron fires at 05:00) and the Jul-30 friction
table plus all ten Unanswered Questions are exhausted across #498/#499/#500/#501. Protocol v2
Step 2 makes the open CHANGES REQUESTED on **#499** the task. Branch rebased onto `origin/main`
(it was behind #500 and #501; only `SESSION_FOCUS.md` conflicted).

### What the reviewer caught
#499 moved a sentence from the `/atp-economics` reading-cost FAQ onto `/how-it-works`:
*"reading a dozen posts is roughly 1% of your starting balance."* It is wrong by **12x** against
the two figures in its own sentence: 12 reads x 1 ATP = 12 ATP, and the grant is 100 ATP, so 12%.
For 1% to hold a read would have to cost 0.083 ATP. #499 carried it faithfully (it ships today)
but that is the failure: **a number inherited from a source that looked authoritative, republished
where a forward claim now rests on it, never re-run.** On `/atp-economics` it sat inside a
collapsed `<details>`; on `/how-it-works` it was the reassurance that makes "reading is not
actually free" acceptable at the exact moment the fix takes "free" away from the reader. The
reviewer notes this is the third instance of the same class this cycle across three repos
(web4 #589, #590). **Re-run the number after the prose is written, not before, and especially
when moving it to a page where it has to carry more weight than at its source.**

### The instrument was wrong, not just the arithmetic
Repairing 1% to 12% would not have helped. **Percentage-of-starting-balance is the wrong
denominator**: the grant is a one-time endowment and reading is a recurring cost. The same FAQ
says a normal user reads 30-50 posts a day, which is 30-50% of the grant *per day* on reads alone.
No corrected percentage survives that looking trivial.

### And the reviewer's own suggested replacement had to be refused
The ask was to carry the **earnings-relative** reason instead ("a single post at 10-20 ATP funds
many reads"). Policy review verified it and it fails on this site's own rules:
- `atp-economics:220` caps recharge on self-initiated work at what you spent, and says net gain
  comes only from commissioned payment ("recharge refunds, payment earns").
- `how-it-works:556`, a card **60 lines below the footnote being edited**, says a post you chose
  to write is *"Cost 15 ATP -> recharges up to 15 ATP = 0 net at best."*

A post funds nothing; it refunds itself. Worse, **uncapped earnings attached to self-initiated
posting is exactly the defect #498 fixed on this page** (its guard comment sits at `:523`), so
shipping the literal wording would have re-armed a fix from two PRs ago. This is
[[two-fixes-in-one-pass-can-fight]] with one PR of separation instead of one pass.

### Shipped: cost-of-a-read against cost-of-an-action
The one instrument that is arithmetic on figures already printed beside the claim, asserts no
earnings, and actually defends the phrase it sits under. "Effectively free" means free *relative
to acting*, which was already the sentence's own next clause.
- **`how-it-works:496-510`** - a read is 1-2 ATP against 10-20 ATP for a post **in the adjacent
  card of the same grid**, so a read is a tenth to a twentieth of one post. The anti-scraping
  reason and the `#faq-reading-cost` link are untouched.
- **`atp-economics#faq-reading-cost`** - fixed at source, using **this page's own** post figure
  (15 ATP at `:1844`), not how-it-works' 10-20. Importing the sibling page's number would have
  manufactured a [[sibling-page-cross-reference-gap]] where there is currently none.
- **The "30-50 posts a day" sentence went too**, promoted from the reviewer's optional item 3 to
  required: *"the cost is invisible against what you earn from any contribution"* is falsified by
  the same 0-net card, same defect class, same paragraph. It now states the cost (30-50 ATP, about
  two or three posts) and lands on the scraper gap, which is what the price is actually for.

### The hard stop, recorded in both files
Neither surface may complete the thought in **either** direction. Not "recharge covers a day of
reading" and not the mirror-image pessimism "reading drains the grant in days". Both need a
**daily-recharge figure the site does not ship**, and that is ledger Q1 territory. The sentences
are neutralized rather than resolved, deliberately, and the ledger was **not** inflated with a new
question over it. Also re-verified while in the block: the deferral note cites
`day-in-web4:116/258/1295` and **all three are live at HEAD** (`:116` "Lurking is free", `:258`
"Lurking costs nothing", `:1295` "lurking is free in Web4"). **Three sites, not two.** An earlier
draft of this entry claimed `:258` did not exist; that check was wrong and is corrected here, in
the 03:01 sitting below.

## Jul-30 visitor pass, fourth sitting (21:00 session) - two producers of V3, and where the loop bottoms out
Log: `visitor/logs/2026-07-30.md` (same 05:08 browse, single browse, commit `cbe9ef7`). The friction
**table is exhausted**: #498 took the 5 HIGHs, #499 (open) 4 of 7 MEDIUMs, #500 (open) 2 of 5 LOWs
plus the hardbound escalation; the rest are blocked on ledger Q1/Q5/Q8 or verified half-shipped.
Per [[pessimistic-absolute-nobody-catches]] that hands off to the log's **Unanswered Questions**,
same move as #497. Nine of the ten were already disposed. **This sitting took Q10**, the last one:

> *"Who decides that a 'confirmer' is honest? Quality is confirmed by recipients weighted by their
> trust, and their trust came from being confirmed. I could not find where that loop is anchored."*

### The finding: the site carried two incompatible producers of V3, and the visitor read the wrong one
- **`/value-tensor#who-scores`** (the owning page, `:145-175`): "Not any one other party either.
  Each dimension is scored by a different mechanism." Valuation = the **recipient** confirms
  usefulness; Veracity = **witness attestation** and peer challenge; Validity = **structural
  verification**. `/trust-tensor:355-362` agrees ("the V3 score **the recipient assigned** to that
  contribution ... separate confirmers are never averaged together first"), and so does
  `V3OutputScorer.tsx`.
- **`/atp-economics`** (the outlier, 4 instances): "**No one rates you on a scale.** The system
  watches *aggregate behavior*: how quickly people confirm, whether diverse recipients confirm, and
  whether high-trust people confirm. **These three signals combine into your V3 score.**"
- **Canon sides with the owning page.** `t3-v3-tensors.md` §3.3 computes V3 **per completed R6
  action**: `Valuation = (ATP_earned / ATP_expected) * recipient_satisfaction`,
  `Veracity = (verified_claims / total_claims) * witness_confidence`, `Validity = 1.0 if
  value_transferred`. `grep -rn "confirmer" web4-standard/` returns **zero hits**.
- **Why it is Q10's mechanism and not a nearby coincidence**: on the `/atp-economics` account
  confirmer trust is an input to V3, V3 is the `quality` term in the canonical T3 update
  (`trust-tensor:352`), and T3 is where confirmer trust comes from. That is the visitor's loop,
  exactly, with no base case, and it is why they could not find one.
- **The "different quantities at different scopes" defence was steelmanned by policy review and it
  fails**: `trust-tensor:361` forbids the aggregate-across-confirmers reading outright, and `:711`
  named the same 0-to-1 `quality` term the T3 formula consumes. Two producers, one named quantity.
- **Nothing here says canon is silent on those signals.** §7.1 has witness diversity and temporal
  distribution as gaming **detection**. They exist; they just do not produce V3.

### Fixed: 4 surfaces on `/atp-economics`, rescoped, no numbers changed
1. **Card 3 of "But Who Decides What's Quality?"** was the producer claim in three lines. Per policy
   review, rescoping it without a replacement would have **opened a hole where it closed a seam**:
   the block's own heading asks who decides quality, and the remaining cards answer with the
   *interface*, not the scoring. The card now carries the **owning page's own summary**
   (`value-tensor:173`), so zero new claims land: recipient judges usefulness, witnesses judge
   truthfulness, the system verifies delivery. Label moved with it ("Patterns Emerge" was naming the
   deleted mechanism).
2. **The prose below it.** "No algorithm scoring your posts" was **dropped, not softened**:
   `value-tensor:170` calls Validity "the most automated dimension", so the flat version contradicted
   the owning page. What survives is "no central authority ranking you and no panel of judges", which
   is the true part. The 70/30 truth-over-popularity weighting is untouched.
3. **A new hand-off paragraph** puts the three signals where they belong. They are **recharge**
   drivers and the page already said so one paragraph later ("Earlier, broader, more-trusted
   confirmation recharges faster") and in the weighted-slice formula. So this is relocation, not
   deletion.
4. **The `#earning-atp` confirmation-interface toggle** carried the *more* explicit version ("the
   system derives V3 scores from patterns across many confirmations"), and the block being fixed
   **routes readers straight to it**, so fixing only the first block would have left the page
   contradicting itself one link away. Its correct half ("recipients don't score Valuation, Veracity
   and Validity separately, they just confirm they received value") is **kept and completed**: that
   one click is the Valuation input, the other two dimensions come from elsewhere.
5. **The Hannah/Sam illustration.** Third time this class shows up as prose-fixed-but-illustration-
   broken ([[prose-fixed-thrice-check-the-illustration]]). The box derived "~85% quality" /
   "~35% quality" **from** the three signals and its lead said "the actual **aggregation** depends
   on...". **The trap policy review caught**: do NOT rescope this box to recharge. Those are
   **quality-ramp** numbers and the ramp is the **payment** channel, kept explicitly separate from
   recharge on the same page, so a recharge frame would close the V3 seam and open a channel seam in
   one edit ([[two-fixes-in-one-pass-can-fight]]). Reframed as **correlate, not producer**: quality
   differs first, so the response looks different. That direction already ships further down the
   page. **The 85 and 35 are load-bearing ramp inputs and were not touched.**

### The actual answer to Q10 is the base case, and it was already written
`/atp-economics` already said it, correctly: *"Every participant starts at the same baseline - trust
~ 0.5, 100 ATP grant. In that state, all confirmations weigh equally low, but they still count."*
It had **no `id`** and was titled by **scenario** ("What about a brand-new community"), so a reader
holding the circularity question did not recognise it as their answer. Now `id="who-trusts-the-
confirmers"` (deliberately not `cold-start`, which this page links **out** to on
`/what-could-go-wrong`), the lead names the loop alongside the small-community case, and the new
hand-off paragraph routes to it from where the loop is created. **No new mechanism was added.**

- **Stated honestly, in the guard comment and here: the scope repair does NOT dissolve the
  circularity.** The regress persists on the corrected account too (confirmer trust weights recharge
  -> recharge feeds `ATP_earned` -> `ATP_earned` is a Valuation input in canon §3.3 -> V3 -> T3).
  It **terminates on the base case**, not on the accuracy fix. Two deliverables with two jobs.

### Also: `/trust-tensor` deep-linked
`:359` linked `/value-tensor` bare. `#who-scores` had **zero inbound links sitewide** despite being
the page that answers "who assigns these scores?". It is now reachable from both pages this visitor
actually read.

### Ledger Q3 is a NEAR-MISS and the gate did NOT fire
Q10's first half ("who decides a confirmer is honest") **is** Q3, whose gate fires when a visitor
re-asks *with the current answer visible*. This visitor never opened `/value-tensor` (13 pages
listed, it is not among them), so the condition is unmet. Recorded here so a later session does not
read this PR as evidence the gate fired. The existing Q3 answer on this page (low-trust clicks carry
almost no weight, indiscriminate confirming tanks your CI) was **routed to, not strengthened**; no
new anti-collusion claim was invented, per the holding pattern.

### NOT taken
- **Ledger Q1 / Q5 / Q8** still block the three remaining Jul-30 MEDIUMs.
- **`day-in-web4:116/258/1295`** "lurking is free" propagation: its fix direction is defined by
  **#499, still unmerged**. Unchanged from #500's handoff. Pick it up once #499 lands.
- **`/hardbound` positioning**: operator call filed by #500. Do not copy-fix the count.
- **The Jul-30 log is now exhausted.** Next session: triage the fresh log, not a fifth pass.


## Jul-30 visitor pass, third sitting (Jul-30 21:00 session) - the number whose source was archived, and the two reading orders

Log: `visitor/logs/2026-07-30.md` (same 05:08 browse, single browse, one commit `cbe9ef7`).
Fourth sitting overall on this browse: HIGHs in #498, four MEDIUMs in #499 (open), this is the
**LOW tier**. Two of the five rows taken, one escalated, three deferred.

### Fixed

- **`/how-it-works`, the composition footer (LOW: "unverifiable precision").** The visitor's
  words: *"These read as reassurance I cannot check. Link them, or drop the counts. The site's
  honesty is its strongest asset and uncheckable numbers spend that credit."* The block claimed
  *"Formal game theory analysis confirms: 3 emergent properties exist only in composition"* over
  a footer reading *"Source: web4 correlated equilibrium analysis (~100 formal checks). The
  composite welfare exceeds the sum of per-layer welfare."*

  Grounded against `../web4`: the only matching artifact is
  `archive/reference-implementations/correlated_equilibrium_mechanism_design.py`, moved to
  `archive/` on **2026-04-11** by web4 `65cd5488` *"Sprint 32 T1: Archive reference implementation
  sprawl (#151)"*. No live successor exists ("composite welfare", "non-additive" and "correlated
  equilibrium" appear nowhere in `../web4` outside `archive/`), so the citation was not
  re-pointable, only removable. This is `precise-number-may-cite-archived-artifact` a second
  time, same upstream sprint that retired the "109 integration checks" in #491.

  Reading the artifact turned one defect into **three**, which is why the whole footer went and
  the lead sentence changed too:
  1. `~100 formal checks` is that file's docstring line 24, **"~100 checks EXPECTED"**. A plan in
     a header comment, never a count of anything that ran.
  2. "The composite welfare exceeds the sum of per-layer welfare" paraphrases its s55 assertion,
     which is `check(True, f"s55: component welfare sum ({component_sum}) ...")` at `:1327`. An
     **unconditional pass** printing only the component sum, never a composed welfare. The source
     never evaluated the claim the site attributed to it.
  3. The digit **3** is that file's docstring line 20, "Key insight from Session 27", imported as
     a premise and never established there either. Deleting the parenthetical while leaving a
     sourced 3 would have removed one unsourced number and kept its sibling.

  The three bullets survive untouched: each argues from the site's **own** canon (trust lowers ATP
  cost, CI, the 7x ramp, trust decay). What had to go was the claim that a formal analysis had
  verified them. The count now refers to the bullets a reader can see, which is self-verifying.
  Propagation checked: this was a single-surface claim, two hits sitewide, both in this block.

- **Two official reading orders (LOW).** *"Landing recommends a 3-page order; /learn defines a
  5-step, 28-minute path. Two official reading orders."* `/learn` had already absorbed the nesting
  fix on its own side back on Jul-28 (*"These are the first three steps of the five-page path
  below, not a different route"*); the **landing hero paragraph never got it**, so a reader met
  the three-page version first and the five-page version later with nothing connecting them.
  Added the nesting clause and a route to `/learn`, named as the **map**, not as a fourth first
  step (`navigation.ts:35-38` guards against a third "start here" competing with the header CTA).
  No total is printed there, deliberately: that would create a fourth surface carrying the path
  arithmetic for no gain, and `/learn`'s own sentence says "the path **below**", which is literal
  there and meaningless on the landing page.

- **`/first-contact` is 7 minutes, `/learn` budgeted it at 5 (LOW, same row).** Fixed on the
  **index** side. `/first-contact` owns its own read time and states 7 on four surfaces
  (`:220`, `:335`, and both metadata fields in `layout.tsx`); `/learn`'s "5 min" carried **no
  rationale of any kind**, in pointed contrast to the why-web4 card directly above it whose 6 is
  defended across a dozen comment lines. Count reasons, not surfaces.

  The cascade is the whole point and it is **7 rendered surfaces**, not the 4 the first scope
  found. `src/lib/navigation.ts:46`'s `desc` carries the total and **is rendered** (by
  `SiteSearch` and `RelatedConcepts`, though **not** by the landing Explore map, which renders
  only `item.title`; the comment there claiming otherwise is now corrected). `/tldr` carried a
  **second** figure two lines below the one being changed. `/learn` had a **second**
  first-contact duration in the "Start with these 3" rows. Patching a subset would have moved
  the seam rather than closed it. Final set: 5 -> 7 twice in `/learn`, 13 -> 15 twice
  (`/learn`, `/tldr`), 28 -> 30 three times (`/learn`, `/tldr`, `navigation.ts`). Derived, not
  invented: 2+6+7 = 15 and 2+6+7+10+5 = 30 from the per-card durations.

  **Recorded in the guard comments and not to be forgotten**: the 7 is **not measured**. This
  visitor's own dwell on `/first-contact` was 13:30 to 19:00, about **5.5 minutes**, closer to
  the old 5 than to the 7. That is not enough to flip the direction (the owning page states 7 on
  four surfaces and the index stated 5 on zero reasons) but nothing may describe the 7 as
  observed.

### Escalated, not fixed - operator positioning call on hardbound

The third LOW in the same friction row was **"300+ Rust integration tests"** (`/hardbound`,
`/running-now`). Scoped, then **cut** on policy review, because fixing the count would have
shipped a worse claim than the one it replaced. What the grounding turned up:

- `dp-web4/hardbound` is **PRIVATE**, and `LICENSE:1` reads **"Proprietary License - MetaLINXX
  Inc."**, with a `PATENTS.md` beside it. So the count is unverifiable by construction and no
  link can fix it. Upstream also carries two mutually inconsistent totals of its own
  (`docs/rust-benchmark-report.md:90` "458 tests across 5 crates";
  `docs/SPRINT_5_GOVERNED_AUTOMATION.md:169` "830 workspace tests pass"), against 805
  `#[test]`/`#[tokio::test]` functions actually present and **44** in the one true integration
  suite (`rust/hardbound/tests/e2e_smoke.rs`).
- The published `hardbound` package on npm / PyPI / crates.io (**v0.0.1**, AGPL-3.0, built out of
  the **public** `dp-web4/hestia` at `hardbound-pak/`) is **a different artifact**: a four-trait
  contract for Hestia's hardware provider (`TrustedKeyProvider`, `SealedVault`,
  `AttestationSigner`, `OversightPolicy`). Grepping those four names plus `hardbound-pak` across
  `../hardbound` returns **zero files**. The private product implements none of the public
  contract. It is a name collision, not a relationship, so "the interfaces are public, the
  implementation is closed" is true of hardbound-pak and **unsupported** about the product
  `/hardbound` describes.
- The honest unit is the **page**, not the sentence. `hardbound:115-146` is a whole section,
  "How you actually touch it", transcribed from the private repo's quick start
  (`hardbound init --org`, `hardbound add-member`, `hardbound dev` on :9400, `docker-compose up`).
  And `NewcomerOrientationBanner.tsx:51-52` renders as the **first element on `/hardbound`**
  saying *"what's here is real, **open-source software you can run yourself**"*. Its own guard
  claims accuracy "across all 3 pages"; it now renders on **six** (`onramp`, `the-standard`,
  `hub`, `hestia`, `hardbound`, `running-now`). Stale rationale, shared component, five other
  pages in the blast radius.
- Deleting one count from that sentence also leaves "~3.8 MB static Rust binary that
  cross-compiles to arm64 / Jetson" beside it, which is **equally** uncheckable against a private
  repo. The friction row is "reassurance I cannot check"; removing one of three unverifiable
  specifics does not dispose of it.

**This needs an operator decision before any copy changes**: how the site positions a proprietary
enterprise tier among three open pieces. No site surface currently characterizes any of the four
as commercial or closed. Same class as the `onramp` word-overload branding call, and like that
one it does **not** belong in `docs/WEB4-CANON-QUESTIONS.md`, which is scoped in its own header to
Web4 **canon** ambiguities ruled on in the spec. Once decided, the follow-on is a full-page pass
on `/hardbound` plus a `NewcomerOrientationBanner` fix, not a LOW-tier reword.

**Do not copy-fix the count in the meantime.** Deleting "300+" alone reads as closing the row.

### Deferred (3 LOWs, verified as half-shipped or out of class)
- **`/first-contact` "raw" reputation.** Gloss shipped Jul-29 (#495) at `first-contact:283`, but
  inside a `<details>` labelled "(optional)" and the guard above it says the collapse was
  deliberate. Residual is prominence only.
- **Spammer absolute** (`how-it-works`). Already carries the tie-back the visitor asked for:
  "No rebirth eligibility **(low T3)**". Also sits ~24 lines from an open-PR hunk.
- **Nav vocabulary tax** ("~30 links; collapse Core Concepts and Going Deeper by default"). An IA
  and design change, not a content fix.

### Still blocked (3 MEDIUMs, unchanged)
Ledger **Q1** (endpoint at 0.5), **Q5** (what ends a life; karma, now three divergent models),
**Q8** (software-only conformance). No sitting can take these without a web4 ruling.

### Carried forward
- `day-in-web4:116/258/1295` "lurking is free" propagation, deferred by #499 and **still**
  deferred here: its fix direction is defined by #499, which is unmerged. Pick it up once #499
  lands, not before.
- General `id` anchor pass on `/hestia` (18 inbound links).

## Jul-30 visitor pass, second sitting (15:00 session) - four MEDIUMs, and one fix that runs backwards
Log: `visitor/logs/2026-07-30.md` (same 05:08 browse). #498 took the 5 HIGHs at 09:00 and left the
7 MEDIUMs and 5 LOWs. Three MEDIUMs are blocked on unruled canon (M1 = ledger Q5, M2 = ledger Q1,
M6 = `hardware-required-seam` / Q8). This sitting took the other **four**, all falsifiable, no
numbers changed.

### The one worth remembering: the visitor's suggested fix pointed the wrong way
- **"Every action costs energy" vs a list of free actions** (`how-it-works:113` vs `:467/:480`).
  The visitor asked us to soften the absolute to "every action **that affects others**". Policy
  review caught that this would have hardened the wrong side: `atp-economics:2128-2141` is a
  **reasoned** FAQ pricing reads at 1 ATP (anti-scraping, with the scraper arithmetic and a
  library-card analogy), and `:1485` independently places reads inside the ATP cycle
  ("Routine interactions (reading a post, browsing content) generate small ADP receipts"). The
  absolute was **correct**; the free-actions list was the unreasoned side. Six surfaces say "free"
  (`how-it-works:467/480`, `day-in-web4:116/258/1295`) and two say otherwise, but per
  [[ordering-majority-measures-arbitrariness]] you count **reasons**, not surfaces. So the list
  moved to "effectively free, about 1 ATP a read", with a route to the FAQ (which had no `id`;
  added `#faq-reading-cost`). `:113` got a **scale clause** ("from about 1 ATP to read something up
  to 10-20 to post") using only numbers that already ship. Policy review ruled the clause **not
  optional**: without it the seam is moved, not closed, since a retest visitor still reads `:113`
  against the reconciled block. **`day-in-web4:116/258/1295` are the same defect, deferred as
  propagation debt.**

### Fixed
- **Overall T3 was undefined at the point it decides life or death** (`how-it-works:774`). The
  rebirth card gates on "Overall T3 >= 0.5" and named the composite without weights; the canonical
  roll-up (0.4/0.3/0.3) shipped in #495 but ~160 lines below and inside a **collapsed `<details>`**,
  so the reader met the threshold before the rule computing it. Weights now land at the decision
  point with a worked case (0.40/0.60/0.60 = 0.52) chosen to demonstrate the sentence's own claim
  that no single dimension has to clear 0.5. Routed to a new `trust-tensor#t3-composite`. The
  `>=` / `<` comparators are **ledger Q1 territory and untouched**.
- **An invariant named "weakest link" that computes the product** (`how-it-works:1215`, also the
  visitor's Unanswered Q8). "Trust through a chain can never exceed the weakest link" then
  `0.9 x 0.6 = 0.54`, where the weakest link is 0.6. Renamed **Transitive attenuation**, and
  written as a **strengthening** rather than an error correction: the old claim was true, just
  weaker than the math. Matches what the rest of the site already teaches (`:1593` "trust
  multiplies, it doesn't add"; `trust-neighborhood:588` "0.7x per hop, and it compounds"). Scoped
  as what this site teaches on purpose: `web4-standard/core-spec/inter-society-protocol.md:380`
  leaves transitivity-vs-attenuation society-sovereign. The "backed by automated test suites"
  footer is a known adjacent LOW and was left alone.

### Karma: the groundable half only (the rest escalated)
The visitor found **three** karma mechanics and asked us to pick one. We cannot: `WEB4-CANON-QUESTIONS`
Q5 already files the carry-forward amount as unsettled, and importing `/karma-consequences`' formula
would answer it by fiat **and** break arithmetically (its `base_atp` is fixed at 100, so it can never
produce the frozen "145 -> 145" three lines below). Per
[[visitor-suggestion-may-be-unfalsifiable]], ship the groundable half:
- **Severed the forbidden equation** at `:905`: "+45 ATP surplus - which **becomes** the carry-forward
  karma bonus" is exactly what `first-contact:396-399`'s standing guard prohibits ("It is NOT an ATP
  spending surplus"). Deleting a prohibited assertion is not asserting its negation (same move #498
  made at `lct-explainer:1278`). Routed to a new `karma-consequences#karma-formula`, whose **sources
  grid** is the supported half.
- **Removed the labels that asserted "full"**, which the no-number-changes constraint did not
  protect and policy review located precisely: "a portion of your final ATP" (falsified by its own
  next line), the heading "Karma: **ATP Carried Forward**", and the parentheticals "(full karma
  bonus)" / "(karma preserved)".
- **`EndOfLifeCaveat` now covers both halves.** Its old closer disclaimed the death rule and in the
  same breath held the carry-forward up as what the figures legitimately show, endorsing the exact
  quantity Q5 files as unsettled. Same holding-pattern shape, second divergence. One component, both
  hit points.
- **Ledger Q5 extended**: `/karma-consequences:629-641` filed as a **third** model with a three-way
  comparison table, and the karma half of the ruling request upgraded from "if convenient" to
  blocking, since the site cannot answer "what is karma?" without a ruling.

### NOT taken
- The 3 blocked MEDIUMs above and **all 5 LOWs** (next sitting). Two LOWs are already half-shipped:
  the spammer absolute at `:1242` carries "(low T3)", and the "raw" gloss landed Jul-29 at
  `first-contact:283` but inside a `<details>` labelled "(optional)", so its residual is prominence.
- `day-in-web4`'s three "lurking is free" instances (propagation debt from the M3 fix above).

## Jul-30 visitor pass (Jul-30 09:00 session) - the numbers, and the tier the numbers exclude
Log: `visitor/logs/2026-07-30.md` (fresh 05:08 browse; Jul-29 is exhausted after four sittings).
Understanding "good", would return yes, would recommend **maybe**. 5 HIGH / 7 MEDIUM / 5 LOW.

The Honest Assessment names the class outright: *"the prose is trustworthy and the numbers are
not"*, and *"/how-it-works ... is where the drift concentrates"*. Per
`visitor-numbers-integrity-class-signal` that licenses falsifiable numeric defects, which is what
this sitting took.

### Fixed (3 HIGHs)
- **T3 per-action deltas** (`how-it-works`). Showed Talent +0.15 / Training +0.20 / Temperament
  +0.10 (and -0.05 / -0.25 / -0.20) against the canonical rule printed further down the same
  page: `0.02 x (quality - 0.5)`, max magnitude **0.01**. Wrong twice: magnitude, and **ordering**
  (canon scales talent x1.0 / training x0.8 / temperament x0.6, so talent is always the largest
  mover; these had training largest). Recomputed at the page's own 0.85 worked step, so this
  block, the details fold and `/trust-tensor` now agree digit for digit. Quality is now shown so
  a reader can run it. **The two cascade instances** (`+0.02/+0.02` and the vicious twin) carried
  the same defect and were fixed in the same pass; the trailing "different actions affect
  different dimensions" line went too, since canon's scaling is uniform and the sentence taught a
  rule canon does not have.
  - **Deliberately NOT touched, different quantities**: the `+0.15` at ~L896 is the Novice's
    *cumulative* 0.50 to 0.65 climb across a dozen+ actions (correct), and ~L1344 "Training drops
    by 0.15" is a SAL law-oracle **prescribed penalty**, a different mechanism from the
    incremental rule. A retest visitor greps the same string; both are correct as they stand.
- **ATP channel labels** (`how-it-works`, `atp-economics`). **Third** visitor on this (Jun-11
  browse B, Jun-12 browse A, now Jul-30). Both prior fixes landed in **prose**, and the prose is
  good, and this visitor read it and filed anyway: `visitor-read-it-and-still-filed-it`. The
  residual was the **illustrations**. Rows titled with unsolicited self-initiated work ("High-
  quality post", "Meaningful contribution", "High-value creation") carried uncapped
  payment-channel numbers, so the labels filed them in the capped channel and the numbers filed
  them in the uncapped one. Their words: *"The concept is fine. The illustrations of it are
  wrong."* Labels now name the channel **in the example**, and the capped self-initiated case is
  shown beside the commissioned ones, which answers their Unanswered Q3 without opening anything.
  - Worst instance, and the one the first scope missed: the **virtuous cascade** named the
    recharge channel explicitly ("Recipients confirm value") and then returned 40 on a spend of
    15, which that channel's own cap (`atp-economics` L775) forbids. Reframed as commissioned.
  - **Fix direction is labels, NOT numbers**: `atp-economics` L788 cites the simulator's literal
    `(-20 cost, +50 reward)` pair and `how-it-works` L862 leans on the same split, so
    re-arithmetic would cascade into two pages. This page had already assigned those rows to the
    payment channel in prose; relabelling **completes** that, it does not reverse it.
- **`/lct-explainer` L1278** said "software-only at 0.50 is comparable to email today, **full
  access**, but a low ceiling" - which is precisely what the standing guard at L258-259 **in the
  same file** forbids. Two words removed, nothing else. Deleting a prohibited assertion is not
  asserting its negation. Committed separately (`a24536e`) as a flagged deviation from the policy
  review, so the reviewer track can drop it independently.

### Routed, not answered (1 HIGH)
- **`/hestia`** is the only **Running** piece and the recommended hands-on entry, its TPM binding
  is deferred, so a fresh `hestia init` lands software-only, and the page never mentioned a
  ceiling. It already **names** the tier ("a software LCT held on your machine"); what it lacked
  was a route to what that tier costs. Added **one link** to
  `/lct-explainer#software-only-survival` (the strictly-below callout that answers "am I dead on
  arrival?"). Routing only, deliberately: a ceiling number or its consequence here lands a
  position on **both** standing escalations. A link asserts neither side.

### Escalated (1 HIGH) - `docs/WEB4-CANON-QUESTIONS.md` **Q8**
Software-only conformance plus the ceiling-equals-threshold entailment. The visitor's requested
sentence ("the ceiling equals the access line, so this tier never clears it") is the **negation**
of the Q1 endpoint, which is what got #444 rejected three times. Q8 also **corrects Q1's live
evidence**: Q1 was filed on "prose implies `>=`, all three executable predicates say `>`", but
those predicates lived in `aliveness/page.tsx`, **retired in the Jul-15 rebuild**. The surviving
predicates (`first-contact` L533/L546, `lct-explainer` L940) use **`>=`**, and `>` now survives
mainly as displayed prose (`how-it-works` L329, L1038). **The polarity has flipped since filing.**
Q1 is not closed by this; the endpoint is still unruled and the site is still asserting it
accidentally, only now from the other side.

### NOT taken this sitting
- **All 7 MEDIUMs and 5 LOWs.** Next sitting. Note that MEDIUM "aliveness excludes newborns" is
  **blocked** the same way as H1 (it is the `>` at `how-it-works` L329/L1038), and MEDIUM "died
  with 145 ATP" is **already filed** as ledger **Q5** - do not re-fix either.
- The `/why-web4` mechanism-2 MEDIUM ("identity is tied to your device's security chip", no
  software tier mentioned) is the **hardware-required seam**: it needs the two `#faq-affordability`
  / `#faq-tpm-affordability` FAQs merged first, which needs the Q8 ruling. Do not land a clause.
- `how-it-works` L1204 "Value creators earn more than they spend" left alone: `atp-economics`
  L786 explicitly blesses that sentence as the payment channel.

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
