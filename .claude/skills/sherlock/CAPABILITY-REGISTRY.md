# Sherlock — Capability Registry (internal workers + fallback chains)

Sherlock is a **top-layer** entry point. The workers below are **invisible internal workers** — Sali never calls
them; Sherlock selects and runs them. Run `bash .claude/skills/flagship/scripts/healthcheck.sh` first, then route
per the fallback chains. Never build a capability listed here.

## Fallback chains (primary → … → always-available last resort)

| Capability | Fallback chain (auto-switch on missing/failed) |
|---|---|
| **Primary RCA / orchestrated diagnosis** | `Skill sap-incident-commander` → `Skill sap-ecc-troubleshooter` → `Skill anthropic-skills:sap-rootcause` → **pasted-evidence reasoning** (built-in) |
| PP / PP-PI evidence | `Agent sc4sap:sap-pp-consultant` → `Skill sap-ecc-troubleshooter` → `Agent sc4sap:sap-bc-consultant` |
| PM evidence | `Agent sc4sap:sap-pm-consultant` → `Skill sap-ecc-troubleshooter` |
| MM evidence | `Agent sc4sap:sap-mm-consultant` → `Skill sap-ecc-troubleshooter` |
| Interface / IDoc / queue | `Skill sap-incident-commander` → `Agent sc4sap:sap-bc-consultant` → `Skill sap-btp-integration-suite` |
| ABAP dump / trace | `Agent sc4sap:sap-debugger` (DEV) → `Agent sc4sap:sap-code-reviewer` → `Skill sap-abap` |
| SQLScript / HANA proc | `Agent sap-sqlscript:sqlscript-analyzer` → `Skill sap-sqlscript` |
| Fiori / UI5 error | `Agent sapui5:ui5-code-quality-advisor` → `MCP ui5-tooling` → `Skill sapui5` |
| Platform delta (ECC/S4/Cloud) | `Skill sap-abap-ecc-s4-expert` → `Skill sap-abap` |
| Locate tcode/table/FM | `Skill sap-function-finder` → **WebSearch** |
| Live SAP read | `MCP sc4sap:sap` (DEV, if connected) → **pasted-evidence mode** (default; MCP is currently ❌ disconnected) |
| Reproduce Fiori/web error | `MCP browser-use` → `Read` screenshot |
| Read artifact (img/PDF/Word/Excel) | `Read` / `Skill pdf` / `Skill docx` / `Skill xlsx` (built-in-ish, always available) |
| "Solved before?" | cross-call **Memory** → skip if unavailable |
| "SAP Note exists?" | cross-call **Oracle** → skip if unavailable |

## Health rules
- `sc4sap:sap` MCP is expected ❌ (disconnected) → default to pasted-evidence; never attempt connect/setup.
- Consultant agents are read-only; only `sap-debugger` writes, DEV only, never QA/PRD (blocked by tier hook).
- Any ❌ worker → jump to next chain link automatically; log the hop for the Explain block.

## Master map
Full environment map: `.claude/skills/flagship/CAPABILITY-REGISTRY.md`. Protocol: `flagship/HEALTH-FALLBACK.md`.
