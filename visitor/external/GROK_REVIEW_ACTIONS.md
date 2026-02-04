# Actionable Items from Grok External Review

**Source**: `grok-first-impression.md` (45-minute naive user test, 2026-02-03)
**Overall Score**: First Contact 9.5/10, Post-tutorial 6/10

---

## High Priority

### 1. Add Plain-English Web4 Definition Under Hero

**Problem**: Hero headline lands well, but "Web4 is a trust-native internet..." leaves newcomers unclear on what Web4 actually is.

**Action**: Add one sentence directly under the hero:
> "Web4 is an internet where your reputation follows you, spam costs more than it's worth, and trust is built into the infrastructure itself."

**Impact**: First impression clarity - users should understand core value prop within 5 seconds.

**Files**: `src/components/Hero.tsx` or equivalent

---

### 2. Create "Continue the Journey" Guided Path

**Problem**: After First Contact, users are released into ~25 navigation links with no guidance. The 9.5→6 score drop happens here.

**Action**: After First Contact completion, present "Continue the Guided Journey" button leading through 4-5 pages in order:
1. LCT Explainer (the comparison table is excellent)
2. How It Works (lifecycle diagram)
3. ATP Basics
4. Coherence Framework (simplified)
5. Try ACT Chat

**Impact**: Bridges the tutorial→wiki cliff. Maintains engagement.

**Files**: First Contact completion screen, new guided-journey component

---

### 3. Add Floating Glossary / Term Popover

**Problem**: Jargon overload after tutorial (LCT/T3/CI/MRH/EP). No central glossary forces constant context-switching (Cmd+F, back navigation).

**Action**: Implement one of:
- Floating glossary button (opens sidebar/modal)
- Hover/click popovers on first occurrence of each term
- "What does this mean?" icon next to jargon

**Impact**: Reduces cognitive load, enables deeper exploration without losing context.

**Files**: New glossary component, term definitions data file

---

## Medium Priority

### 4. Tone Down Absolute Language

**Problem**: Statements like "spam is economically impossible" and "no moderators needed" trigger skepticism. The Adversarial Explorer addresses edge cases but it's buried.

**Action**: Soften absolutes:
- "impossible" → "extremely expensive" or "economically impractical"
- "no moderators needed" → "minimal moderation required" or "self-regulating with oversight"

Surface the nuance earlier - link to Adversarial Explorer from main claims.

**Impact**: Builds credibility. Sophisticated readers appreciate acknowledged limitations.

**Files**: Homepage copy, core explainer pages

---

### 5. Add Early Framing for Life/Death/Karma Metaphor

**Problem**: The "life/death/rebirth/karma" language feels like weird sci-fi until the How-it-Works page explains it's generational agent simulation.

**Action**: Add one sentence early (maybe in First Contact or homepage):
> "We model digital agents like creatures that live, die, and reincarnate - carrying their reputation with them."

**Impact**: Prepares users for the metaphor before they encounter it cold.

**Files**: First Contact intro, or new "Concepts at a Glance" section

---

### 6. Surface Redemption Paths Earlier

**Problem**: "Permanent reputation with no fresh starts" feels dystopian on first read. Redemption mechanisms exist but aren't prominent.

**Action**: When introducing permanent reputation, immediately follow with:
> "Bad actors can't escape consequences, but genuine reform is recognized and rewarded."

Link to redemption/recovery documentation.

**Impact**: Addresses emotional reaction before it solidifies.

**Files**: Reputation explainer sections

---

## Low Priority / Future

### 7. Performance Audit

**Problem**: Lots of client-side rendering, canvas graphs, animated sims. Fine on modern laptops, potentially sluggish on mobile/older devices.

**Action**: Performance audit with Lighthouse. Consider:
- Lazy loading for heavy visualizations
- Reduced motion option
- Server-side rendering for initial load

**Impact**: Accessibility, mobile experience

---

### 8. Navigation Simplification

**Problem**: Sidebar has ~25 links. Overwhelming after tutorial.

**Action**: Consider:
- Progressive disclosure (show beginner links first, expand to advanced)
- Clear section groupings
- "Recommended reading order" indicator

**Impact**: Reduces choice paralysis

---

## What's Working (Don't Change)

- First Contact tutorial - "legitimately brilliant", single-handedly carries the site
- Dark, modern visual design
- Alice simulation with ATP bar, trust meter, timeline scrubber
- LCT Explainer comparison table (Web2 → Web3 → Web4)
- How-it-Works lifecycle diagram
- ACT Chat responsiveness
- "Deep dive →" links from concepts

---

## Implementation Notes

The core insight: **First Contact is exceptional, but it's an island**. The fix is building bridges from that island to the mainland content.

Priority order:
1. Guided journey after tutorial (biggest impact)
2. Floating glossary (reduces friction everywhere)
3. Plain-English hero definition (first impression)
4. Tone softening (credibility)

---

*Generated from visitor track external review, 2026-02-03*
