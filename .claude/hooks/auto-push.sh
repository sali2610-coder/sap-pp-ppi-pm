#!/usr/bin/env bash
# Stop hook: auto-commit + push to origin/main on every change. No-op when clean.
set -euo pipefail

REPO="/Users/salihalif/Desktop/My-Projects/sap"
cd "$REPO" || exit 0

# Nothing staged or unstaged? Quiet exit.
if [ -z "$(git status --porcelain)" ]; then
  exit 0
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
STAMP="$(date '+%Y-%m-%d %H:%M:%S')"

git add -A
git -c user.name="sali2610-coder" -c user.email="sali2610@gmail.com" \
  commit -q -m "chore: auto-sync ${STAMP}" || exit 0

if git push -q origin "$BRANCH" 2>/dev/null; then
  printf '{"systemMessage":"Auto-pushed to origin/%s (%s)"}\n' "$BRANCH" "$STAMP"
else
  printf '{"systemMessage":"Auto-commit done; push to origin/%s FAILED (offline or auth). Will retry next change."}\n' "$BRANCH"
fi
