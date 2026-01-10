# Onboarding Improvements for 4-Life

**Assessment Date**: January 2026
**Status**: Suggestions for implementation

---

## Current Friction Points

### 1. Implicit Prerequisites
The README says `npm install && npm run dev` without specifying:
- Node.js version (should be 18+ for Next.js 14)
- Git requirement
- OS compatibility (Windows/Mac/Linux all work)
- No mention of Python requirement for running simulations

**Impact**: Users who aren't already in a dev environment hit immediate friction.

### 2. No "First Win" Path
Current flow:
1. Clone repo
2. Install dependencies
3. Run dev server
4. ...then what?

There's no "do X, see Y happen" moment. The lab console exists but isn't surfaced as the reward.

**Suggested first win**: "Run the server → Go to /lab-console → Click 'Run Simulation' → Watch an agent live and die across 5 lives in 30 seconds"

### 3. Concept-First, Experience-Later
The README and site pages explain *what* Web4 is before showing *what it does*. This is fine for people who already bought in, but creates dropout for curious visitors.

**Fix**: Lead with a GIF/video of the lab console running, then explain concepts.

### 4. Dead-End Affordances
- Starter Kit page says "detailed instructions will be linked here" - dead end
- "To be hosted when ready" - no timeline or tracking
- Status table shows "Pending" without issue links

**Fix**: Every "pending" should link to an issue or roadmap item. Gives users a way to track/contribute.

### 5. Single-Lane Onboarding
Everyone is treated as a developer who wants to run locally. No path for:
- **Curious non-devs**: Just want to understand the ideas
- **Evaluators**: Want to see it work without setup
- **Potential contributors**: Want to know where to start

---

## Suggested Improvements

### A. Add Prerequisites Block to README

```markdown
## Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **Git** ([download](https://git-scm.com/))
- **Python 3.9+** (optional, for running simulations locally)
- Works on Windows, macOS, and Linux

Not comfortable with command-line tools? See the [hosted demo](#) (coming soon) or watch the [walkthrough video](#).
```

### B. Add "First Win in 60 Seconds" Section

```markdown
## See It Work (60 seconds)

1. Clone and run:
   ```bash
   git clone https://github.com/dp-web4/4-life.git
   cd 4-life
   npm install
   npm run dev
   ```

2. Open http://localhost:3000/lab-console

3. Select "EP Closed Loop" and click "Run Simulation"

4. Watch an agent live through multiple lives, earning and spending ATP, building trust, dying and being reborn with karma carried forward.

That's a Web4 society in miniature. The rest of the site explains why it works this way.
```

### C. Add Onboarding Lanes to README

```markdown
## Where to Start

| You are... | Start here |
|------------|------------|
| **Curious about the ideas** | Read [How It Works](/how-it-works) and [Web4 Explainer](/web4-explainer) |
| **Want to see it run** | Follow [First Win in 60 Seconds](#see-it-work-60-seconds) above |
| **Want to understand the code** | See [Repo Map](#repo-map) below |
| **Want to contribute** | Read [Contributing](#contributing) |
```

### D. Add Repo Map

```markdown
## Repo Map

```
4-life/
├── src/app/           # Next.js pages
│   ├── page.tsx       # Home - "what is 4-life"
│   ├── how-it-works/  # Conceptual walkthrough
│   ├── starter-kit/   # Getting started (WIP)
│   ├── lab-console/   # Live simulation viewer ← start here!
│   └── api/lab-run/   # API for running simulations
├── public/            # Pre-generated simulation results
└── docs/              # Additional documentation
```
```

### E. Replace "Pending" with Trackable Items

Instead of:
> Starter kit download | 🚧 Pending

Use:
> Starter kit download | 🚧 [Tracking: #12](link-to-issue)

This gives visitors agency - they can watch, comment, or contribute.

### F. One-Click Run Option (Medium Effort)

Add a `.devcontainer/` config for GitHub Codespaces:
- Opens in browser with everything installed
- Zero local setup
- "Open in Codespaces" badge in README

This is the barrier-killer for non-dev-environment people.

### G. Add Visual Preview

A single GIF at the top of the README showing:
- Lab console running a simulation
- ATP/T3 graphs moving
- Lives cycling

Shows the "what" before explaining the "why".

---

## Priority Order

1. **Prerequisites block** - 5 minutes, immediate clarity
2. **First win section** - 10 minutes, gives reward target
3. **Onboarding lanes** - 10 minutes, self-selection
4. **Repo map** - 5 minutes, reduces anxiety
5. **Issue links for pending items** - 15 minutes, creates trackability
6. **GIF/video** - 30 minutes, visual hook
7. **Codespaces config** - 1 hour, removes setup entirely

---

## Summary

The repo is technically solid. The friction is **permission to proceed** - users don't know if they're in the right place, what they need, or what success looks like.

The fix isn't architectural - it's signposting. Show the reward, clarify the path, let people self-select their lane.

---

*Assessment by Nova (GPT) + Claude, January 2026*
