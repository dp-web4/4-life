# 4-Life Website

Public-facing website for the 4-Life Web4 society simulation game/lab.

## Overview

**4-Life** is a fractal laboratory for Web4 societies - both human and AI. It's where the transformation symbolism of "4" (death → rebirth) meets the technical reality of distributed trust-native architecture.

### Name Significance

"4-Life" carries multiple layers of meaning:
- **Web4 linkage**: Direct connection to Web4 as the fourth layer/generation
- **Conway's Game of Life**: Higher-order cellular automaton (societies vs cells)
- **Phonetic**: "for life" = Web4 as lived environment, not just protocol
- **Transformation**: Embraces 4/death cultural resonance as feature - death of obsolete forms, birth of new structures

## Tech Stack

- **Framework**: Next.js 14.1.0 (React 18, TypeScript)
- **Styling**: CSS Modules with custom design system
- **Deployment**: TBD (Vercel recommended)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the site.

## Site Structure

- **Home** (`/`) - Hero introducing 4-Life as fractal lab for societies
- **How It Works** (`/how-it-works`) - 5-step journey from local society to planet-scale network
- **Starter Kit** (`/starter-kit`) - Requirements and current implementation status

## Content Philosophy

The site explains Web4 societies through accessible language while preserving technical accuracy:

1. **Hardware-bound societies**: Root LCT on your machine
2. **MRH & LCT**: Verifiable context graphs
3. **Fractal federation**: Peer/citizen/task-based society links
4. **Hub societies**: Witnesses for capability broadcasts
5. **Game to standard**: Stress-testing mechanics before standardization

## Connection to Web4 Game Engine

The game engine lives in `web4/game` directory of the main ai-agents repository. This website is the public-facing portal for users to discover and start their own societies.

## Lab Console Data Artifacts (EP Option B)

The `/lab-console` page loads pre-generated JSON artifacts from the Next.js `public/` directory.

**Canonical filenames (served by Next.js):**

- `public/multi_life_with_policy.json`
- `public/ep_driven_closed_loop_results.json`
- `public/maturation_demo_results_web4.json`
- `public/maturation_demo_results_none.json`
- `public/ep_five_domain_multi_life_results.json`
- `public/one_life_with_policy.json` (fallback)

### Generate + copy artifacts (Windows PowerShell)

Run the generator scripts from `web4/game`, then copy the JSON into `4-life/public/`.

**EP closed-loop (recommended default):**

```powershell
python c:\projects\ai-agents\web4\game\run_ep_driven_closed_loop.py
Copy-Item -Force c:\projects\ai-agents\web4\game\ep_driven_closed_loop_results.json c:\projects\ai-agents\4-life\public\ep_driven_closed_loop_results.json
```

**EP maturation demo (Web4 patterns):**

```powershell
python c:\projects\ai-agents\web4\game\run_maturation_demo.py web4
Copy-Item -Force c:\projects\ai-agents\web4\game\maturation_demo_results_web4.json c:\projects\ai-agents\4-life\public\maturation_demo_results_web4.json
```

**EP maturation demo (heuristic-only baseline):**

```powershell
python c:\projects\ai-agents\web4\game\run_maturation_demo.py none
Copy-Item -Force c:\projects\ai-agents\web4\game\maturation_demo_results_none.json c:\projects\ai-agents\4-life\public\maturation_demo_results_none.json
```

**Five-domain EP multi-life:**

```powershell
python c:\projects\ai-agents\web4\game\ep_five_domain_multi_life.py --lives 3 --ticks 20 --output ep_five_domain_multi_life_results.json
Copy-Item -Force c:\projects\ai-agents\web4\game\ep_five_domain_multi_life_results.json c:\projects\ai-agents\4-life\public\ep_five_domain_multi_life_results.json
```

**Legacy heuristic (multi-life + HRM v0 policy):**

```powershell
python c:\projects\ai-agents\web4\game\run_multi_life_with_policy.py > c:\projects\ai-agents\4-life\public\multi_life_with_policy.json
```

**Legacy heuristic (one-life + HRM v0 policy):**

```powershell
python c:\projects\ai-agents\web4\game\run_one_life_with_policy.py > c:\projects\ai-agents\4-life\public\one_life_with_policy.json
```

After generating artifacts, run the website (`npm run dev`) and open:

`http://localhost:3000/lab-console`

### Live runner API (no manual copy)

The lab console also supports an on-demand **local-only** API route that runs a whitelisted set of Python scripts and returns JSON:

- **Endpoint**: `GET /api/lab-run`
- **Safety model**: allowlist only (no arbitrary command execution)
- **Side effect**: writes the resulting JSON into `4-life/public/` as a cached artifact

**Query parameters:**

- `kind` (required):
  - `ep_driven_closed_loop`
  - `maturation_demo`
  - `ep_five_domain`
  - `multi_life_with_policy`
  - `one_life_with_policy`
- `action` (optional): `read` (default) or `run`
- `timeout_ms` (optional): defaults to 60000
- `pattern_source` (only for `maturation_demo`): `web4` | `none` | `thor`
- `num_lives` and `ticks` (only for `ep_five_domain`)

**Examples:**

```text
/api/lab-run?kind=ep_driven_closed_loop&action=run
/api/lab-run?kind=maturation_demo&pattern_source=web4&action=run
/api/lab-run?kind=ep_five_domain&num_lives=3&ticks=20&action=run
```

## Status

- ✅ Initial structure and content (Cascade/GPT-5.1)
- ✅ Responsive layout with custom CSS
- 🚧 Starter kit download flow (pending)
- 🚧 Hub society integration (pending)
- 🚧 Public deployment (pending)

## Related

- **Web4 Repo**: Main protocol and game engine
- **Private Context**: 4-Life naming exploration and transformation symbolism
- **Game Engine**: `web4/game/` - Society simulation backend

---

*"4-Life = Conway's Game of Life at society-scale with trust as the cellular automaton rule."*
