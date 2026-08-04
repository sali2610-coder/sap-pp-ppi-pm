# Oracle — Capability Registry (internal workers + fallback chains)

Oracle is a **top-layer** entry point. Workers below are **invisible internal workers**. Run
`bash .claude/skills/flagship/scripts/healthcheck.sh` first, then route per the chains. Never fabricate SAP Note
numbers. Never build a capability listed here.

## Fallback chains (primary → … → always-available last resort)

| Capability | Fallback chain (auto-switch on missing/failed) |
|---|---|
| **Broad, verified research** | `Skill deep-research` → **WebSearch + WebFetch** (built-in, always available) → `Skill sap-knowledge-builder` |
| SAP Note / KBA lookup | **WebSearch** (launchpad/me.sap.com) + **WebFetch** → `Skill deep-research` |
| SAP Help / Community / blog | **WebFetch** → **WebSearch** |
| S/4 migration / simplification | `Skill sap-forecaster` → `Skill sap-abap-ecc-s4-expert` → **WebSearch** |
| ECC vs S/4 vs Cloud applicability | `Skill sap-abap-ecc-s4-expert` → **WebSearch** |
| Object → documentation | `Skill sap-function-finder` → **WebSearch** |
| API/interface allowed? (policy) | `Skill sap-api-policy` → **WebFetch** (SAP API Policy doc) |
| Parse a saved SAP PDF/guide | `Skill sap-document-intelligence` → `Skill pdf` → `Read` |

## Health rules
- Built-in `WebSearch`/`WebFetch` are the guaranteed last link — a research task never dead-ends.
- If `deep-research` is ❌/slow, drop to WebSearch+WebFetch and say so in Explain.
- Every finding must state ECC/S4 applicability + Kernel/SP/Upgrade need, with a real source or "לא נמצא מקור".

## Master map
Full environment map: `.claude/skills/flagship/CAPABILITY-REGISTRY.md`. Protocol: `flagship/HEALTH-FALLBACK.md`.
