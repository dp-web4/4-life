#!/bin/bash
# 4-Life Visitor Track — Daily naive browse of the site
# Schedule: 05:00 daily

set -e

# Ensure claude is in PATH (cron doesn't inherit user profile)
export PATH="$HOME/.local/bin:$PATH"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DATE=$(date +%Y-%m-%d)
LOG_FILE="$SCRIPT_DIR/logs/$DATE.md"

# Ensure log directory exists
mkdir -p "$SCRIPT_DIR/logs"

echo "Starting 4-Life Visitor Track for $DATE"

# Launch Claude FROM the visitor directory (picks up CLAUDE.md persona)
# --dangerously-skip-permissions: allows autonomous WebFetch and Write
# NO -c flag: fresh context, no conversation history
# NO --print flag: needs tool access for WebFetch
cd "$SCRIPT_DIR"

# Feed the mission prompt via stdin
claude --dangerously-skip-permissions << EOF
# 4-Life Visitor Session — $DATE

You are starting a fresh visitor session. Your mission is defined in CLAUDE.md in this directory.

## CRITICAL CONSTRAINTS

1. **USE WEBFETCH** to actually browse https://4-life-ivory.vercel.app/
   - Start at the landing page
   - Follow links you find on each page
   - Actually read the content of each page you visit

2. **DO NOT READ LOCAL FILES** except:
   - CLAUDE.md (your persona/instructions)
   - Writing your log to: logs/$DATE.md

3. **DO NOT READ PAST LOGS** in logs/ — you must be a fresh visitor every time

4. **DO NOT EXPLORE** the 4-life codebase — only browse the live website

5. **BE GENUINELY NAIVE** — you have no prior Web4 knowledge. Don't fill gaps from training.

## Your Task

1. Read CLAUDE.md for your full instructions and output format
2. Use WebFetch to browse the live site, starting at the landing page
3. Navigate naturally — follow links a curious human would click
4. Document your honest experience
5. Write your browse log to: logs/$DATE.md

Begin your browse now.
EOF

echo "Visitor browse complete. Log: $LOG_FILE"

# Commit and push results
cd "$PROJECT_DIR"
git add visitor/logs/ 2>/dev/null || true
if ! git diff --cached --quiet 2>/dev/null; then
    git commit -m "visitor: browse log $DATE" 2>/dev/null || true
    PAT=$(grep GITHUB_PAT /mnt/c/exe/projects/ai-agents/.env 2>/dev/null | cut -d= -f2)
    if [ -n "$PAT" ]; then
        git push "https://dp-web4:${PAT}@github.com/dp-web4/4-life.git" 2>/dev/null || true
    fi
fi
