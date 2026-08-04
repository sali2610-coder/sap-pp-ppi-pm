# Memory — Capability Registry (internal workers + fallback chains)

Memory is a **top-layer** entry point. Workers below are **invisible internal workers**. Run
`bash .claude/skills/flagship/scripts/healthcheck.sh` first, then route per the chains. Read-only by default;
persist only on explicit user OK. Never build a capability listed here.

## Fallback chains (primary → … → always-available last resort)

| Capability | Fallback chain (auto-switch on missing/failed) |
|---|---|
| **Recall past incident/lesson** | **Grep** `SAP-HQ/knowledge/*.md + SAP-HQ/lessons-learned/*.md` → **Glob/Grep** project `docs/` + `~/Downloads` → `Read` |
| Read saved Excel | `Skill xlsx` → `Bash` (csv/unzip peek) |
| Read saved Word | `Skill docx` → `Bash` |
| Read saved PDF | `Skill pdf` → `Read` (PDF pages) |
| Extract from SAP document | `Skill sap-document-intelligence` → `Skill pdf` → `Read` |
| Israel / CBC SAP context | `Skill sap-israel-knowledge` → **Grep** local notes |
| Turn a finding into a stored note | `Skill sap-knowledge-builder` → append to `memory/MEMORY.md` (on approval) |
| Persist a new lesson | `Skill reflexion:memorize` → append to project `MEMORY.md` (on approval) |
| Screenshots / images | `Read` (always available) |
| Project git history | `Bash git log/grep` (read-only) |

## Health rules
- Built-in `Grep`/`Glob`/`Read` are the guaranteed last link — recall never dead-ends.
- Never write/modify/delete a memory or knowledge file without explicit user approval.
- If nothing matches, say so plainly and hand off (Oracle for new research, Sherlock for fresh investigation).

## Master map
Full environment map: `.claude/skills/flagship/CAPABILITY-REGISTRY.md`. Protocol: `flagship/HEALTH-FALLBACK.md`.
