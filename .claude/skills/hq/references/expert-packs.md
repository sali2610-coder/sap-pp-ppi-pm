# Phase 2 — Expert Packs (HQ auto-selects; every pack = EXISTING workers)

An "Expert Pack" is a named bundle of **already-installed** skills/agents. No new agents/skills are created — each
pack just maps a domain to the existing workers HQ should engage. HQ picks the pack automatically from the
classification; Sali never chooses.

| Expert Pack | Auto-triggers on | Existing workers it engages |
|---|---|---|
| **PP Expert** | PP/PP-PI: order/confirmation/MRP/routing/BOM/work center | `sc4sap:sap-pp-consultant` + skill `sap-ecc-troubleshooter` |
| **PM Expert** | notification/order/equipment/func-location/status | `sc4sap:sap-pm-consultant` + `sap-ecc-troubleshooter` |
| **MM Expert** | material/PO/GR/stock, M7-* | `sc4sap:sap-mm-consultant` + `sap-ecc-troubleshooter` |
| **SD Expert** | sales order/delivery/billing | `sc4sap:sap-sd-consultant` + `sap-ecc-troubleshooter` |
| **FI Expert** | posting/GL/AP/AR | `sc4sap:sap-fi-consultant` |
| **CO Expert** | cost center/order/CO-PA | `sc4sap:sap-co-consultant` |
| **QM Expert** | inspection lot/usage decision | `sc4sap:sap-qm-consultant` |
| **ABAP Expert** | dump/code/enhancement | skill `sap-abap` + `sap-abap-ecc-s4-expert` + `sc4sap:sap-code-reviewer` + `sc4sap:sap-debugger` |
| **Authorization Expert** | SU53/missing auth | `sap-ecc-troubleshooter` + `review:security-auditor` |
| **IDOC Expert** | WE02/WE05/status 51-64 | skill `sap-incident-commander` + `sc4sap:sap-bc-consultant` |
| **Gateway Expert** | /IWFND/ERROR_LOG, SICF | `sc4sap:sap-bc-consultant` + skill `sap-btp-connectivity` |
| **OData Expert** | OData service/$metadata | skill `sap-api-style` + `sap-fiori-tools` (MCP) + `sap-abap-cds` |
| **Fiori Expert** | tile/UI5 error | `sapui5:ui5-code-quality-advisor` + `sap-fiori-tools` (MCP) |
| **Workflow Expert** | SWI*/SWU3/work item | `sap-ecc-troubleshooter` + `sc4sap:sap-bc-consultant` |
| **Performance Expert** | ST05/SAT/SQLM/slow | `sc4sap:sap-debugger` + `sap-sqlscript:sqlscript-analyzer` |
| **Basis Expert** | system/queue/job/RFC-dest | `sc4sap:sap-bc-consultant` |
| **PI/PO Expert** | SXMB_MONI/channel | skill `sap-btp-integration-suite` + `sc4sap:sap-bc-consultant` |
| **BTP Expert** | destination/connectivity/CF | skills `sap-btp-connectivity` / `-integration-suite` / `-service-manager` / `-cloud-platform` |
| **ECC Expert** | classic ECC context | `sap-ecc-troubleshooter` + `sap-abap-ecc-s4-expert` |
| **S/4HANA Expert** | S/4 on-prem/migration | `sap-abap-ecc-s4-expert` + skill `sap-forecaster` + `sap-abap` |

## Auto-selection rules
1. Classify the fault (`auto-investigation.md`) → map to the pack above.
2. If it spans domains (e.g. IDoc inbound ORDERS = IDOC + SD), engage **both packs**; Sherlock owns the single RCA.
3. Dispatch the pack's workers via `Skill`/`Agent` (per each manager's registry) — the pack is just the *selection*;
   Sherlock still runs the investigation and concludes.
4. Everything is read-only unless it's a DEV write via sc4sap (blocked on QA/PRD by the tier hook).

No pack introduces a new capability — it only names which existing workers HQ turns on for that domain.
