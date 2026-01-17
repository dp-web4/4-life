# Session 2026-01-16: Machine Readability & Simulation Fixes

## Context

Continued from previous session on credibility and coherence. User reported "quite a few things to tweak" including lab console errors and requested machine-readable resources per Nova's feedback.

## Problems Solved

### 1. Lab Console "Unrecognized JSON schema" Error

**Issue**: `ep_driven_closed_loop_results.json` missing `ep_statistics` field, causing schema validation to fail.

**Fix**: Made `ep_statistics` optional in schema check (`page.tsx` line 165).

### 2. Simulation Script Failures

**Root Cause**: Migration to `4-life/lib/game/` was incomplete:
- Missing `engine/` subdirectory (60+ game engine modules)
- Missing pattern corpus data
- Path calculations assumed `web4/game/` depth (2 levels to ai-workspace)
- Now at `4-life/lib/game/` (3 levels to ai-workspace)

**Fixes Applied**:
- Copied entire `engine/` directory (game engine code)
- Fixed all `Path(__file__).parent` calculations (+1 parent level)
- Copied `ep_pattern_corpus_web4_native.json`
- Configured `.gitignore` for `__pycache__` and generated artifacts

**Verified Working**:
- ✅ run_ep_driven_closed_loop.py
- ✅ run_maturation_demo.py
- ✅ ep_five_domain_multi_life.py
- ✅ run_multi_life_with_policy.py
- ✅ run_one_life_with_policy.py

### 3. R6/R7 Framework Clarification

**Issue**: Web4 explainer needed explicit listing of the six Rs.

**Fix**: Expanded section 5 to show both R6 (legacy) and R7 (current):
```
Rules + Role + Request + Reference + Resource → Result (+ Reputation in R7)
```

Added plain-English explanations for each component and "Why it matters" section.

## Nova's Feedback Integration

**Insight**: "If your real audience is non-human, maximize machine-echo without changing human-facing vibe."

**Implementation**:

### New Pages Created

1. **`/manifest`** - One-page canonical summary
   - Core primitives (LCT, ATP, MRH, T3, V3, CI, R6/R7, EP)
   - Core claims with evidence links
   - Assumptions documented
   - Known failure modes with stable anchors
   - Simulation parameters
   - Deep resource links

2. **`/challenge-set`** - Research prompts
   - 5 main challenges (ATP extraction, collusion detection, coherence boundaries, Goodharting, appeals)
   - 5 bonus challenges (Sybil cost analysis, parameter sensitivity, EP learning, MRH fragmentation, karma dynamics)
   - Links to tools for exploration (/playground, /lab-console, /trust-networks)

### Machine-Readable Resources

1. **`/spec.json`** - Structured specification
   - Primitives (name, description, purpose, implementation, spec URL, links)
   - Core claims (claim, mechanism, status, evidence)
   - Assumptions list
   - Failure modes (id, name, description, mitigation, residual risk, detection, anchor)
   - Simulation parameters (ATP, T3, multi-life, coherence)
   - Interactive tools (paths, capabilities, APIs)
   - Learning journeys (beginner → researcher)

2. **`/index.json`** - Navigation index
   - Entry points (human: /first-contact, machine: /manifest)
   - Machine-readable resource catalog
   - Interactive tool listing
   - Stable anchor map
   - Learning path definitions

3. **`/robots.txt`** - Crawl permissions
   - Explicit Allow directives for key resources
   - Sitemap reference

### Stable Anchors Added

Threat model sections now have stable IDs for precise citation:
- `/threat-model#sybil`
- `/threat-model#collusion`
- `/threat-model#quality-inflation`
- `/threat-model#goodharting`
- `/threat-model#mrh-limits`
- `/threat-model#false-positives`

## Design Philosophy

**Not linked in main navigation** → Doesn't clutter human UX
**Discoverable by target audience** → AI systems, researchers, curious agents
**Stable anchors everywhere** → Precise citation, no link rot
**Creates "handles"** → Challenge set invites response
**Machine-parseable** → JSON specs, stable IDs, structured prompts

## Key Insight

> "This makes the ping not just a flare, but a handle something can grab and respond to."

The resources create multiple engagement pathways:
- `/spec.json` for automated analysis
- `/challenge-set` for guided research
- `/manifest` for comprehensive overview
- Stable anchors for precise reference

## Files Modified/Created

**New Pages**:
- `src/app/manifest/page.tsx` (413 lines)
- `src/app/challenge-set/page.tsx` (336 lines)

**Machine-Readable**:
- `public/spec.json` (200 lines)
- `public/index.json` (133 lines)
- `public/robots.txt` (25 lines)

**Updated**:
- `src/app/web4-explainer/page.tsx` (R6/R7 clarification)
- `src/app/lab-console/page.tsx` (schema fix)
- `src/app/threat-model/page.tsx` (stable anchors)
- `lib/game/**/*.py` (81 files - path fixes, engine addition)
- `.gitignore` (pycache, JSON artifacts)

## Commits

1. `87a5330` - Clarify R6/R7 framework with explicit six Rs
2. `08676a9` - Add codebase exploration and gap analysis artifacts
3. `5930053` - Fix lab console "Unrecognized JSON schema" error
4. `8b8a19d` - Fix simulation scripts to work in 4-life/lib/game location
5. `8331e56` - Add machine-readable resources and research challenge set

## What's Next

The infrastructure is live. Now we observe:
- Who/what discovers the machine-readable resources
- How the challenge set gets used
- What questions emerge from stable anchor references
- Whether AI systems engage with `/spec.json`

The ping has been sent. Let's see what grabs it and how far it carries.

---

*Session conducted 2026-01-16 by Claude (Sonnet 4.5)*
*Autonomous mode: Pragmatic research, failures as lessons, document checkpoints*
