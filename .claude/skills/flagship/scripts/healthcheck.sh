#!/usr/bin/env bash
# Flagship pre-flight health check (READ-ONLY, PORTABLE / project-local).
# Resolves the project's .claude/skills from THIS script's own location — no hard-coded home paths.
# Never installs/connects/writes. Degrades gracefully in cloud/phone (no MCP, no plugin cache is OK).
set -uo pipefail

SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"       # <repo>/.claude/skills/flagship/scripts
SKILLS_DIR="$(cd "$SELF_DIR/../.." && pwd)"                     # <repo>/.claude/skills
CACHE="${CLAUDE_PLUGIN_CACHE:-$HOME/.claude/plugins/cache}"     # env-dependent; may be absent in cloud → graceful

ok(){ printf "  ✅ %-40s %s\n" "$1" "${2:-}"; }
miss(){ printf "  ❌ %-40s %s\n" "$1" "${2:-}"; }

have_skill_dir(){ [ -d "$SKILLS_DIR/$1" ]; }
have_global_skill(){ [ -d "$HOME/.claude/skills/$1" ]; }
have_plugin_skill(){ compgen -G "$CACHE/*/*/*/skills/$1/SKILL.md" >/dev/null 2>&1; }
have_agent(){ compgen -G "$CACHE/*/*/*/agents/$1.md" >/dev/null 2>&1; }

echo "=== FLAGSHIP HEALTH CHECK (project-local, portable) ==="
echo "skills dir: $SKILLS_DIR"

echo "[flagship core — required, must be in the repo]"
for s in hq sherlock oracle memory flagship; do have_skill_dir "$s" && ok "$s" || miss "$s" "MISSING (required)"; done

echo "[custom SAP skills — optional: project, else global, else fallback]"
for s in sap-incident-commander sap-ecc-troubleshooter sap-abap-ecc-s4-expert sap-function-finder \
         sap-forecaster sap-knowledge-builder sap-document-intelligence sap-israel-knowledge; do
  if have_skill_dir "$s"; then ok "$s" "(project)"
  elif have_global_skill "$s"; then ok "$s" "(global)"
  else miss "$s" "→ fallback: knowledge/files/web"; fi
done

echo "[plugin skills — optional (absent in cloud)]"
for s in sap-sqlscript sap-abap sap-abap-cds sap-api-policy deep-research; do
  have_plugin_skill "$s" && ok "$s" || miss "$s" "→ fallback"; done

echo "[internal agents — optional (absent in cloud)]"
for a in sap-debugger sap-code-reviewer sap-bc-consultant sap-pp-consultant \
         sap-pm-consultant sap-mm-consultant sqlscript-analyzer ui5-code-quality-advisor; do
  have_agent "$a" && ok "agent:$a" || miss "agent:$a" "→ fallback"; done

echo "[MCP servers — OPTIONAL; not required; absent in cloud/phone]"
if command -v claude >/dev/null 2>&1; then
  claude mcp list 2>/dev/null | grep -Ei 'sc4sap:sap|fiori-tools|ui5-tooling|browser-use' \
    | sed -E 's/^/  /; s/✔ Connected/✅ connected/; s/✘ Failed to connect/❌ DISCONNECTED (fallback: pasted evidence)/; s/⏸.*/⏸ pending/' \
    || echo "  (no SAP MCP configured — file / pasted-evidence mode)"
else
  echo "  (claude CLI not on PATH — cloud/phone mode: work from files + pasted evidence + web)"
fi

echo "=== END ==="
echo "Rule: any ❌ is NOT fatal. HQ degrades to project files / knowledge / pasted evidence / web — it never stops,"
echo "and never claims a live SAP check that did not happen."
