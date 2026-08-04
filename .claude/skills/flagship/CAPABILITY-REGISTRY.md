# Flagship Capability Registry (single source of truth)

The three flagship orchestrators (Sherlock, Oracle, Memory) do **not** implement diagnostics, research, or
knowledge storage themselves. They **route** to the capabilities below, which already exist in this environment.
Update this one file when the environment changes — all three flagships read from it.

> Rule: never build a capability that appears here. Invoke it.

## How to invoke each kind

| Kind | Mechanism |
|------|-----------|
| Skill | `Skill` tool with the skill name (main-thread, keeps orchestration context) |
| Subagent | `Agent` tool with `subagent_type` (isolated deep-dive; returns findings) |
| MCP tool | call the `mcp__...` tool directly (load schema via ToolSearch if deferred) |
| Built-in | `WebSearch`, `WebFetch`, `Read` (images/PDF), `Grep`, `Glob`, `Bash` |

## Diagnostics / SAP incident (Sherlock's pool)

| Capability | Kind | Use for |
|---|---|---|
| `sap-incident-commander` | Skill **and** Agent | Primary SAP RCA engine — 6-stage workflow, evidence-first, single conclusion. Sherlock's main delegate. |
| `sap-ecc-troubleshooter` | Skill | ECC6 triage — ST22/SM58/SMQ2/IDoc 51-64/backflush/COGI/SU53, returns hypotheses+tcodes+tables+FM+test |
| `sap-abap-ecc-s4-expert` | Skill | Platform decision (ECC vs S/4 vs Cloud), ABAP build-time routing |
| `sap-sqlscript` | Skill | SQLScript/AMDP/HANA procedure issues |
| `sap-function-finder` | Skill | Locate SAP tcode/table/FM/BAPI |
| `sc4sap:sap-debugger` | Agent | ABAP runtime dump/trace analysis (R/W, DEV only) |
| `sc4sap:sap-code-reviewer` | Agent | ABAP code review (R/O) |
| `sc4sap:sap-bc-consultant` | Agent | Basis/IDoc/RFC/queue/dump evidence (R/O) |
| `sc4sap:sap-pp-consultant` | Agent | PP + PP-PI (process/production orders, MRP, confirmations) R/O |
| `sc4sap:sap-pm-consultant` | Agent | PM (maintenance orders, equipment, notifications) R/O |
| `sc4sap:sap-mm-consultant` / `sap-sd/fi/co/qm/wm/ps/tm/tr/hcm/bw/ariba-consultant` | Agent | module evidence R/O |
| `sap-sqlscript:sqlscript-analyzer` | Agent | SQLScript perf/quality analysis |
| `sapui5:ui5-code-quality-advisor` | Agent | UI5/Fiori frontend defects |
| `review:security-auditor` | Agent | auth/security angle on a finding |

## Research / SAP knowledge (Oracle's pool)

| Capability | Kind | Use for |
|---|---|---|
| `deep-research` | Skill | Multi-source, adversarially-verified, cited web research report |
| `WebSearch` / `WebFetch` | Built-in | SAP Notes, KBAs, help.sap.com, community.sap.com, blogs, release notes |
| `sap-function-finder` | Skill | Resolve object → doc |
| `sap-forecaster` | Skill | S/4HANA migration impact / simplification |
| `sap-knowledge-builder` | Skill | Structured SAP knowledge assembly |
| `sap-abap-ecc-s4-expert` | Skill | ECC vs S/4 vs Cloud applicability of a Note/feature |
| `sap-api-policy` | Skill | Is an API/interface usage SAP-policy compliant |
| `sap-document-intelligence` | Skill | Parse SAP PDFs/guides |

## Org knowledge / memory (Memory's pool)

| Capability | Kind | Use for |
|---|---|---|
| Memory system | Files | `~/.claude/projects/*/memory/MEMORY.md` + `memory/*.md` (past projects, incidents, lessons) |
| `Grep` / `Glob` | Built-in | Search local SAP folders (`~/Downloads`, `~/Desktop/My-Projects`, project `docs/`) |
| `pdf` / `docx` / `xlsx` | Skill | Read saved PDFs / Word / Excel |
| `sap-document-intelligence` | Skill | Extract from SAP documents |
| `sap-israel-knowledge` | Skill | Israel/CBC-specific SAP knowledge |
| `sap-knowledge-builder` | Skill | Turn findings into a stored note |
| `reflexion:memorize` | Skill | Persist a new lesson learned |
| `Read` | Built-in | Screenshots / images (visual evidence) |

## Shared I/O and tools (all three)

| Capability | Kind | Use for |
|---|---|---|
| `Read` | Built-in | Images (Screenshot/SAP GUI/Fiori), PDF pages |
| `browser-use` MCP (`mcp__browser-use__*`) | MCP | Fiori error reproduction, live web pages (needs ToolSearch load) |
| `mcp__plugin_sap-fiori-tools_fiori-tools__*` | MCP | Fiori app metadata / OData service inspection |
| `mcp__plugin_sapui5_ui5-tooling__*` | MCP | UI5 API/lint |
| `sc4sap:sap` MCP (`mcp__plugin_sc4sap_sap__*`) | MCP | Live SAP ADT — **currently disconnected**; only after user connects a **DEV** profile. Never QA/PRD writes. |
| `figma` MCP | MCP | Diagrams/mockups if a report needs one |

## Hard guardrails (inherited from environment)

- `sc4sap:sap` MCP is **disconnected**. Do not connect, run setup, or write to SAP without explicit user approval. DEV only; QA/PRD mutations blocked by the tier-readonly + forbidden-tables hooks.
- Never install plugins, update versions, or duplicate an existing capability.
- Consultant agents are read-only; only `sap-executor`/`sap-debugger`/`sap-qa-tester` write, and only on DEV.
