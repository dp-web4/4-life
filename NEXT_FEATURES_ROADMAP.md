# 4-Life Next Features Roadmap

Based on gap analysis of 2026-01-16 exploration.

## Current State
- 24 pages implemented
- All primary navigation functional
- Threat model documented but not demonstrated
- Coherence framework referenced but not visualized
- Narrative and pattern systems: code exists, UI incomplete

---

## High-Impact Features (In Priority Order)

### 🔴 Priority 1: Collusion Simulation & Detection Demo
**Why**: Threat model says "open research problem" but doesn't show it visually
**What**: New page `/collusion-detection` showing:
- 3-5 agents forming mutual validation cartel
- Witness diversity requirement detection over time
- Metrics dashboard:
  - Cartel size vs detection time
  - Impact of diversity threshold on detection rate
  - Optimal threshold finder (interactive slider)
- Visualization: Graph showing trust edges, cartel formation, then detection

**Deliverables**:
- `/src/app/collusion-detection/page.tsx`
- Simulation logic: cartel formation + witness diversity checks
- Charts: detection time curve, threshold sensitivity

**Why this matters**: Converts abstract threat into concrete research demonstration. Proves the threat model isn't just theoretical.

**Estimated LOC**: 400-600 lines (component + data)

---

### 🟠 Priority 2: Complete Narrative System Integration
**Why**: `/narratives` has TODO comment, shows only hardcoded "Bob" story
**What**: Wire up actual narrative loading:
- Load narratives from `/public/narratives/*.json`
- Filter by theme (working)
- View detail: full story with chapter structure, timeline, key events
- Browse across narrative corpus

**Deliverables**:
1. Update `/src/app/narratives/page.tsx`:
   - Load `narrativeIndex.json` (list of available narratives)
   - Real filtering by theme
   - Link to detail pages
2. Implement `/src/app/narratives/[id]/page.tsx`:
   - Full story rendering with chapter breaks
   - Event timeline visualization
   - Coherence domain annotations
3. Generated narrative schema in `/public/narratives/`

**Why this matters**: Narrative generation is a core pedagogical tool. Hiding it behind "TODO" undermines the "show don't tell" philosophy.

**Estimated LOC**: 200-300 lines (UI) + data schema work

---

### 🟡 Priority 3: Coherence Framework Visualizer
**Why**: Threat model and learn page reference "9-domain framework" extensively but no visual explanation
**What**: New page `/coherence-framework-explorer` showing:
- 9-domain circle diagram (Synchronism framework)
- Color-coded domains with hover explanations
- How 4 CI dimensions (spatial, temporal, capability, relational) map to domains
- Interactive scenarios: "What happens if D5 (trust modulation) drops?"
- Examples showing how each domain affects trust physics

**Deliverables**:
1. `/src/app/coherence-framework-explorer/page.tsx`
2. SVG/Canvas visualization: 9-domain circle
3. Interactive scenario selector
4. Coherence modulation calculator: shows CI² effect on trust and ATP costs

**Why this matters**: The 0.5 threshold and physics grounding are powerful claims that need visual support. Text explanation alone weakens credibility.

**Estimated LOC**: 400-500 lines + visualization library

---

### 🟡 Priority 4: Pattern Inspector & Corpus Tools
**Why**: `/patterns` page is built but individual pattern inspection missing
**What**: 
- Click pattern in corpus → see full context
- Pattern detail view showing:
  - Scenario (context where pattern occurs)
  - Decision (what the agent learned)
  - Success metrics
  - Similar patterns in corpus
  - Evolution across corpus versions
- Add corpus switching (currently references 3 corpora but doesn't switch)
- Export selected patterns

**Deliverables**:
1. `/src/app/patterns/[id]/page.tsx` (pattern detail)
2. Update `/src/app/patterns/page.tsx`:
   - Working corpus selector
   - Pattern list with clickable items
3. Pattern schema/data structure

**Why this matters**: Pattern corpus is a major research artifact. Making it browsable strengthens the "show learning" narrative.

**Estimated LOC**: 300-400 lines

---

### 🟢 Priority 5: Collusion Detection Metrics Dashboard
**Why**: Open research question but no way to explore it empirically
**What**: New page `/threat-research/collusion-metrics` showing:
- Line chart: Cartel growth over time vs detection curve
- Heat map: Cartel size vs witness diversity requirement
- Table: Detected cartels by sophistication level
- Threshold optimizer: "What diversity level catches cartels of size N?"
- Historical data: Runs from different simulation parameters

**Deliverables**:
1. Simulation data generation (varied cartel sizes/diversity levels)
2. `/src/app/threat-research/collusion-metrics/page.tsx`
3. Charts component with interactive filtering

**Why this matters**: Converts vague "open problem" into active research investigation. Shows empirical thinking.

**Estimated LOC**: 300-400 lines

---

## Medium-Impact Features

### Coherence Modulation Calculator
Shows how CI² affects effective trust and ATP costs
- Interactive sliders: Base trust, CI value
- Output: Effective trust, ATP cost multiplier
- Scenario examples

**Why**: Makes abstract physics concrete. Visual proof of modulation formula.

---

### MRH Visualization in Trust Networks
Show MRH boundaries limiting visibility
- Draw trust network with MRH circle around ego
- Show what agent can/can't see
- Interactive: Move radius slider, see visibility change

**Why**: Threat model mentions this as intentional trade-off but doesn't show it visually.

---

### Appeals & Recovery UX
Mockup flow for disputed evaluations
- False positive scenario
- Evidence presentation
- Appeal outcome
- Trust recovery pathway

**Why**: Threat model identifies this as major gap ("no appeals process"). Designing one strengthens research.

---

## Implementation Sequence

### Phase 1 (Next Sprint): Build Credibility
1. **Collusion Simulation** (Priority 1) - Highest ROI, demonstrates threat model
2. **Coherence Framework Visualizer** (Priority 3) - Visualizes core physics

### Phase 2: Deepen Demonstration
1. **Narrative System** (Priority 2) - Makes learning visible
2. **Pattern Inspector** (Priority 4) - Browsable research artifact

### Phase 3: Research Infrastructure
1. **Collusion Metrics Dashboard** (Priority 5) - Active research
2. **Threat research hub** - Links all threat-related experiments

---

## Notes

- All deliverables should maintain "show don't tell" philosophy
- Interactive elements (sliders, toggles) over static text
- Real or realistic data (simulated but based on engine mechanics)
- Link back to threat model and concept pages
- Update status table in README.md when complete

---

## Success Criteria

After completion:
- ✅ Every claim in threat model has corresponding demonstration
- ✅ 9-domain framework visually explained
- ✅ Pattern corpus is fully browsable
- ✅ Narrative system loading real data
- ✅ Collusion detection explored empirically
- ✅ No "TODO" comments blocking core features

