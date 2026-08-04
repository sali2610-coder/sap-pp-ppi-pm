# HQ — Capability Registry (managers + fallback)

HQ is the top layer. Its **only** direct workers are the three managers. Each manager owns its own
`CAPABILITY-REGISTRY.md` and internal workers — HQ never reaches past a manager to a low-level worker.

| Manager | Kind | Owns | Fallback if unavailable |
|---|---|---|---|
| 🔍 `sherlock` | Skill | incident investigation; internal: sap-incident-commander, sap-ecc-troubleshooter, sc4sap agents, sqlscript-analyzer, ui5-code-quality, browser-use | → `sap-incident-commander` skill directly → `sap-ecc-troubleshooter` |
| 📚 `oracle` | Skill | SAP knowledge; internal: deep-research, WebSearch/WebFetch, sap-forecaster, sap-function-finder, sap-abap-ecc-s4-expert, sap-api-policy | → WebSearch + WebFetch directly |
| 🧠 `memory` | Skill | org history; internal: memory/*.md, Grep/Glob, pdf/docx/xlsx, sap-document-intelligence, reflexion:memorize | → Grep/Glob over memory + docs directly |

## Health & fallback
- Pre-flight: `bash .claude/skills/flagship/scripts/healthcheck.sh` (read-only).
- If a manager skill is ❌, HQ falls back to that manager's primary internal worker (column above), then to built-ins.
- Managers run their own internal health-check + fallback + Explain; HQ aggregates into the HQ Summary.

## Backward compatibility
`/sherlock`, `/oracle`, `/memory` still work standalone. HQ does not modify them; it only calls them via the `Skill`
tool. Master environment map: `.claude/skills/flagship/CAPABILITY-REGISTRY.md`. Protocol:
`.claude/skills/flagship/HEALTH-FALLBACK.md`.
