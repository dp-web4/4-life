#!/bin/bash
# 4-Life Development Session — Automated every 6 hours
# Picks up visitor feedback and continues development

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H%M)
LOG_FILE="$PROJECT_DIR/session-logs/$DATE-$TIME.log"

# Ensure log directory exists
mkdir -p "$PROJECT_DIR/session-logs"

echo "Starting 4-Life Development Session at $(date)" | tee "$LOG_FILE"

cd "$PROJECT_DIR"

# Check for visitor feedback to incorporate
VISITOR_LOG="$PROJECT_DIR/visitor/logs/$DATE.md"
VISITOR_CONTEXT=""
if [ -f "$VISITOR_LOG" ]; then
    VISITOR_CONTEXT="Fresh visitor feedback available at visitor/logs/$DATE.md - review and prioritize fixes."
fi

# Run claude with session context
claude --print "You are running an automated 4-Life development session.

Project: 4-Life (Web4 society simulation and explainer)
Site: https://4-life-ivory.vercel.app/
Date: $DATE

$VISITOR_CONTEXT

Follow the workflow in CLAUDE.md:
1. Check for visitor feedback (if available, prioritize high-severity friction)
2. Continue development on current features
3. Test changes locally
4. Commit and push when done

Keep the session focused and make concrete progress. Document what you accomplished." >> "$LOG_FILE" 2>&1

echo "Session complete. Log: $LOG_FILE"
