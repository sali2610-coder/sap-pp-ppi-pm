#!/usr/bin/env bash
# HQ Operational Intelligence engine (Phase 3, PORTABLE / project-local).
# Manages <repo-root>/SAP-HQ ONLY. Root is derived from this script's location (or $CLAUDE_PROJECT_DIR).
# Additive: does not touch plugins, MCP, Sherlock/Oracle/Memory, or the HQ reasoning engine.
# Subcommands: init | new | event | graph | status | search | list | show | help
set -uo pipefail

SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"                      # <repo>/.claude/skills/hq/scripts
REPO_ROOT="${CLAUDE_PROJECT_DIR:-$(cd "$SELF_DIR/../../../.." && pwd)}"        # scripts→hq→skills→.claude→<repo>
ROOT="$REPO_ROOT/SAP-HQ"
INC_DIR="$ROOT/incidents"
ARCHIVE="$ROOT/archive/index.md"
GRAPH="$ROOT/knowledge-graph/graph.md"
now(){ date +%H:%M; }
today(){ date +%Y-%m-%d; }

ensure_root(){
  mkdir -p "$INC_DIR" "$ROOT/archive" "$ROOT/knowledge-graph" "$ROOT/runbooks" "$ROOT/lessons-learned"
  [ -f "$ARCHIVE" ] || printf '# HQ Incident Archive\n\n| INC | Date | Module | Status | Confidence | Title |\n|---|---|---|---|---|---|\n' > "$ARCHIVE"
  [ -f "$GRAPH" ]   || printf '# HQ Knowledge Graph (edges)\n\n| INC | From | -> | To |\n|---|---|---|---|\n' > "$GRAPH"
}

next_id(){
  ensure_root
  local n
  n=$(find "$INC_DIR" -maxdepth 1 -type d -name 'INC-*' 2>/dev/null | wc -l | tr -d ' ')
  printf 'INC-%06d' "$((n+1))"
}

slug(){ printf '%s' "$1" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-' | cut -c1-40; }

find_dir(){ find "$INC_DIR" -maxdepth 1 -type d -name "$1*" 2>/dev/null | head -1; }

cmd_new(){
  local title="${1:?title required}" module="${2:-NA}"
  local id; id="$(next_id)"
  local dir="$INC_DIR/${id}__$(slug "$title")__${module}__$(today)"
  mkdir -p "$dir"/{screenshots,st22,sm21,we02,payload,logs,sap-notes,evidence}
  for f in diagnosis root-cause recommendations validation lessons-learned; do
    printf '# %s — %s\n\n_(HQ fills this during the investigation)_\n' "$f" "$id" > "$dir/$f.md"
  done
  cat > "$dir/dashboard.md" <<EOF
# HQ Dashboard — $id

Incident: $title
Module: $module   Status: OPEN   Confidence: --%

Current Phase
⏳ Observe  ⏳ Classify  ⏳ Hypotheses  ⏳ Evidence  ⏳ RCA  ⏳ Confidence  ⏳ Recommend

Evidence  ░░░░░░░░░░
Running Workers: (none yet)
EOF
  printf '# Timeline — %s\n\n%s  incident created (%s)\n' "$id" "$(now)" "$title" > "$dir/timeline.md"
  cat > "$dir/runbook.md" <<EOF
# Runbook — $id  ($title)

Title:
Environment:
Symptoms:
Business Impact:
Evidence:
Root Cause:
SAP Notes:
KBA:
Fix:
Validation:
Lessons Learned:
Recommendations:
Tags:
Owner: Sali Halif
Date: $(today)
Confidence:
EOF
  printf '| %s | %s | %s | OPEN | --%% | %s |\n' "$id" "$(today)" "$module" "$title" >> "$ARCHIVE"
  echo "$id"
  echo "$dir"
}

cmd_event(){ local d; d="$(find_dir "${1:?INC}")"; [ -n "$d" ] || { echo "not found"; exit 1; }; printf '↓\n%s  %s\n' "$(now)" "${2:?text}" >> "$d/timeline.md"; echo "logged: $(now) ${2}"; }

cmd_graph(){ ensure_root; printf '| %s | %s | -> | %s |\n' "${1:?INC}" "${2:?from}" "${3:?to}" >> "$GRAPH"; echo "edge: $2 -> $3"; }

cmd_status(){
  local id="${1:?INC}" st="${2:?status}" conf="${3:-}"
  # update archive row (portable sed)
  local tmp; tmp="$(mktemp)"
  awk -v id="$id" -v st="$st" -v cf="$conf" 'BEGIN{FS=OFS="|"} $2 ~ id { $5=" "st" "; if(cf!="") $6=" "cf"% " } {print}' "$ARCHIVE" > "$tmp" && mv "$tmp" "$ARCHIVE"
  local d; d="$(find_dir "$id")"; [ -n "$d" ] && printf '↓\n%s  status=%s confidence=%s\n' "$(now)" "$st" "${conf:-NA}" >> "$d/timeline.md"
  echo "status updated: $id -> $st ${conf:+($conf%)}"
}

cmd_search(){
  ensure_root
  local q="$*"; [ -n "$q" ] || { echo "usage: search <terms>"; exit 1; }
  echo "=== HQ SEARCH: $q ==="
  echo "[incidents / runbooks / lessons / archive]"
  grep -rin --include='*.md' -e "$q" "$ROOT" 2>/dev/null | sed "s#$ROOT/#  #" | head -40
  echo "[project knowledge / docs]"
  grep -rin --include='*.md' -e "$q" "$REPO_ROOT/docs" 2>/dev/null | sed "s#$REPO_ROOT/#  #" | head -15
  echo "=== end ==="
}

cmd_list(){ ensure_root; cat "$ARCHIVE"; }
cmd_show(){ local d; d="$(find_dir "${1:?INC}")"; [ -n "$d" ] || { echo "not found"; exit 1; }; echo "### $d"; echo; cat "$d/dashboard.md"; echo; cat "$d/timeline.md"; }

# /hq doctor | /hq health — full project-local self-check (read-only). Non-fatal on any miss.
cmd_doctor(){
  local SK="$REPO_ROOT/.claude/skills" CM="$REPO_ROOT/.claude/commands" fail=0
  P(){ printf "  %s %-42s %s\n" "$1" "$2" "${3:-}"; }
  echo "=== HQ DOCTOR (project-local health) ==="
  echo "repo root: $REPO_ROOT"
  echo "[flagship skills]"
  for s in hq sherlock oracle memory flagship; do
    [ -f "$SK/$s/SKILL.md" ] || [ "$s" = flagship -a -d "$SK/$s" ] && P "✔" "$s" || { P "✘" "$s" "MISSING"; fail=1; }; done
  echo "[entry command]"; [ -f "$CM/hq.md" ] && P "✔" "/hq  (.claude/commands/hq.md)" || { P "✘" "/hq" "MISSING"; fail=1; }
  echo "[references]"; local rc; rc=$(ls "$SK/hq/references/"*.md 2>/dev/null | wc -l | tr -d ' '); P "✔" "hq/references" "$rc files"
  echo "[scripts]"; for x in "$SK/hq/scripts/hq-ops.sh" "$SK/flagship/scripts/healthcheck.sh"; do
    bash -n "$x" 2>/dev/null && P "✔" "$(basename "$x")" "syntax ok" || { P "✘" "$(basename "$x")" "SYNTAX ERR"; fail=1; }; done
  echo "[capability registry]"; if [ -f "$ROOT/capability-registry.json" ]; then
    python3 -c "import json;json.load(open('$ROOT/capability-registry.json'))" 2>/dev/null && P "✔" "capability-registry.json" "valid" || { P "✘" "registry" "INVALID JSON"; fail=1; }
  else P "!" "capability-registry.json" "absent (optional)"; fi
  echo "[knowledge JSON]"; local jc=0 jb=0; for j in "$REPO_ROOT"/docs/sap-ai-brain/data/*.json; do
    [ -f "$j" ] || continue; jc=$((jc+1)); python3 -c "import json;json.load(open('$j'))" 2>/dev/null || jb=$((jb+1)); done
  P "$([ $jb -eq 0 ] && echo ✔ || echo ✘)" "brain JSON" "$jc files, $jb invalid"
  echo "[workspace dirs]"; for d in playbooks runbooks knowledge lessons-learned templates; do
    [ -d "$ROOT/$d" ] && P "✔" "SAP-HQ/$d" || P "!" "SAP-HQ/$d" "absent"; done
  echo "[runtime]"; P "✔" "SAP-HQ writable" "$([ -w "$REPO_ROOT" ] && echo yes || echo no)"
  echo "[MCP / hooks]"; P "!" "SAP MCP" "optional (fallback: files/pasted-evidence)"; P "!" "hooks" "none registered (core works hook-free)"
  echo "[worker availability]"; bash "$SK/flagship/scripts/healthcheck.sh" 2>/dev/null | grep -E '✅|❌' | sed 's/^/  /' | head -30
  echo "=== DOCTOR RESULT: $([ $fail -eq 0 ] && echo 'HEALTHY (core intact; missing workers → fallback)' || echo 'DEGRADED (core issue above)') ==="
}

case "${1:-help}" in
  init) ensure_root; echo "HQ workspace ready: $ROOT";;
  new) shift; cmd_new "$@";;
  event) shift; cmd_event "$@";;
  graph) shift; cmd_graph "$@";;
  status) shift; cmd_status "$@";;
  search) shift; cmd_search "$@";;
  list) cmd_list;;
  show) shift; cmd_show "$@";;
  doctor|health) cmd_doctor;;
  *) sed -n '2,6p' "$0";;
esac
