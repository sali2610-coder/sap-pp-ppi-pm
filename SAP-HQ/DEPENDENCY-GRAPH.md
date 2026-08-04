# SAP HQ — Dependency Graph (project-local)

How the single entry point `/hq` drives everything. All paths are repo-relative; nothing depends on a global
`~/.claude`. Missing workers are non-fatal (fallback to files / knowledge / pasted evidence / web).

```mermaid
flowchart TD
  U["User"] -->|"/hq (.claude/commands/hq.md)"| HQ["HQ skill<br/>.claude/skills/hq/"]
  HQ --> RE["Reasoning Engine<br/>references/reasoning-engine.md"]
  HQ --> RM["Request Modes (12)<br/>references/request-modes.md"]
  HQ --> HC["Health Check<br/>flagship/scripts/healthcheck.sh"]

  HQ --> SH["Sherlock<br/>.claude/skills/sherlock/"]
  HQ --> OR["Oracle<br/>.claude/skills/oracle/"]
  HQ --> ME["Memory<br/>.claude/skills/memory/"]

  HQ --> EP["Expert Packs (20)<br/>references/expert-packs.md"]
  EP -.selects.-> SH
  EP -.selects.-> OR

  SH -->|optional, global| WK1["sap-incident-commander · sap-ecc-troubleshooter<br/>sc4sap agents (pp/pm/mm/bc/debugger)"]
  OR -->|optional| WK2["deep-research · WebSearch/WebFetch<br/>sap-abap-ecc-s4-expert · sap-api-policy"]
  ME --> KN["SAP-HQ/knowledge/ · lessons-learned/<br/>docs/ · playbooks/"]

  SH --> OPS["Operational Intelligence<br/>hq/scripts/hq-ops.sh → SAP-HQ/"]
  OPS --> PB["playbooks/ runbooks/ (committed)"]
  OPS --> RT["incidents/ archive/ knowledge-graph/ (runtime, git-ignored)"]

  SH --> OUT["HQ Summary<br/>Diagnosis · Confidence · Evidence · Workers · Next"]
  OR --> OUT
  ME --> OUT

  MCP["SAP MCP (sc4sap:sap)<br/>OPTIONAL · disconnected in cloud"] -.read-only if present.-> SH
```

## Who calls whom
| Caller | Calls | When | If unavailable |
|---|---|---|---|
| `/hq` command | HQ skill | every SAP request | — (required) |
| HQ | Reasoning Engine + Request Modes | always | — (in-repo) |
| HQ | Health Check | before dispatch | degrade to fallbacks |
| HQ | Sherlock | incidents/debug/interface/perf/auth | pasted-evidence reasoning |
| HQ | Oracle | knowledge/Note/design/migration/learning | WebSearch/WebFetch |
| HQ | Memory | "solved before?" / recall | Grep over SAP-HQ + docs |
| HQ | Expert Packs | auto-select domain | generic reasoning |
| Sherlock | global sc4sap agents / MCP | live SAP (local only) | file/pasted evidence, mark "דורש אימות" |
| Sherlock | hq-ops.sh | real incident | in-memory only |

## Portability contract
- Every reference inside the skills is repo-relative (`.claude/skills/...`, `SAP-HQ/...`).
- Scripts derive the repo root from `$CLAUDE_PROJECT_DIR` or their own location.
- `$HOME` appears only in **optional** global-worker probes inside `healthcheck.sh` — never as a required dependency.
- No MCP, no hooks, no secrets required for the core to run (cloud/phone safe).
