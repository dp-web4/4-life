#!/bin/bash
# 4-Life Visitor Track — Daily naive browse of the site
# Schedule: 05:00 daily

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
DATE=$(date +%Y-%m-%d)
LOG_FILE="$LOG_DIR/$DATE.md"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

echo "Starting 4-Life Visitor Track for $DATE"

# Launch Claude with the visitor context
# The CLAUDE.md in this directory instructs it to be a naive visitor
cd "$PROJECT_DIR"

# Use claude with the visitor directory as context
claude --print "You are the 4-Life Visitor Track. Today is $DATE.

Your mission: Browse https://4-life-ivory.vercel.app/ as a first-time human visitor with NO prior Web4 knowledge.

Follow these steps:
1. Start at the landing page
2. Navigate naturally as a curious human would
3. Click links in logical progression
4. Document your experience in the format specified in visitor/CLAUDE.md
5. Be honest about confusion — that's the whole point

Generate your browse log now. Write it to: visitor/logs/$DATE.md" > "$LOG_FILE" 2>&1

echo "Visitor browse complete. Log: $LOG_FILE"
