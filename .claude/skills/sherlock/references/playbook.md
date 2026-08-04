# Sherlock Playbook — intake + routing (orchestration detail)

## Intake map (format → how to read it → what to extract)

| Input | Read with | Extract |
|---|---|---|
| Screenshot / SAP GUI photo / Fiori error image | `Read` (image) | message ID, tcode, error text, screen |
| ST22 dump (text/screenshot) | `Read` / paste | runtime error, exception class, program, line |
| SM21 system log | paste | message id, time, work process |
| SM37 job log | paste | job name, step, abort message |
| ST05 / SAT trace | paste | expensive statements, tables, time |
| SU53 auth check | `Read`/paste | missing auth object, field values |
| AL11 file | paste | path, content sample |
| WE02/WE05/WE09 + IDoc / XML | paste | IDoc number, status (51/64/…), message type, segment |
| SMQ1/SMQ2/SM58 queue | paste | queue name, status (SYSFAIL…), FM |
| Job logs / Gateway / RFC / SOAP / REST / Proxy / PI / PO / CPI | paste | endpoint, HTTP/RFC error, correlation id |
| JSON payload | paste | fields, error node |
| Excel / Word / PDF | `xlsx` / `docx` / `pdf` skills | tabular data, spec text |
| Email / Jira / ALM export | paste / `Read` | reporter, description, attachments |

## Classification → routing matrix (pick EXISTING capabilities)

| Signal | Module/type | Route to (existing) |
|---|---|---|
| RU-505, CO11N/CO15/COR6, COGI/MF47, process/production order | **PP / PP-PI** | Skill `sap-incident-commander` + Agent `sc4sap:sap-pp-consultant`; Skill `sap-ecc-troubleshooter` |
| IW31/IW32, equipment, notification, maintenance order | **PM** | Skill `sap-incident-commander` + Agent `sc4sap:sap-pm-consultant` |
| M7-053, MIGO/MB*, stock | **MM** | Agent `sc4sap:sap-mm-consultant` + `sap-incident-commander` |
| ST22 dump, exception, short dump | ABAP runtime | Skill `sap-ecc-troubleshooter`; Agent `sc4sap:sap-debugger` (DEV); Skill `sap-abap-ecc-s4-expert` for platform delta |
| SMQ1/SMQ2/SM58 SYSFAIL, IDoc 51/64, WE02 | interface/queue | Skill `sap-incident-commander`; Agent `sc4sap:sap-bc-consultant` |
| PI/PO/CPI/Gateway/RFC/SOAP/REST/Proxy | integration | `sap-incident-commander` + `sap-bc-consultant`; Skills `sap-btp-integration-suite`, `sap-btp-connectivity` |
| SU53, missing authorization | security/auth | Skill `sap-ecc-troubleshooter`; Agent `review:security-auditor` |
| ST05/SAT expensive SQL, slow | performance | Agent `sc4sap:sap-debugger`; SQLScript → Skill `sap-sqlscript` + Agent `sap-sqlscript:sqlscript-analyzer` |
| SQLScript / AMDP / HANA procedure | HANA code | Skill `sap-sqlscript`; Agent `sap-sqlscript:sqlscript-analyzer` |
| Fiori tile/app error, UI5 console | Fiori/UI5 | Agent `sapui5:ui5-code-quality-advisor`; MCP `fiori-tools`, `ui5-tooling`; `browser-use` to reproduce |
| CDS view issue | CDS | Skill `sap-abap-cds`; Agent `sc4sap:sap-code-reviewer` |

## Decision checklist (answer each before executing)

- Need **SAP MCP** (`sc4sap:sap`)? → only if user connected DEV; else work from pasted evidence.
- Need **Browser** (`browser-use`)? → to reproduce a Fiori/web error or open a linked page.
- Need **Debugger** (`sc4sap:sap-debugger`)? → for dumps/traces on DEV.
- Need **SQLScript** / **ABAP** / **UI5** / **Integration** specialist? → route per matrix.
- Cross-call **Memory**? → almost always: "did we hit this before?"
- Cross-call **Oracle**? → when an SAP Note/KBA likely exists for the symptom.

## Dispatch pattern

Primary RCA: `Skill(sap-incident-commander)` — it owns the 6-stage evidence→conclusion workflow. Sherlock adds the
multi-format intake, the cross-calls to Memory/Oracle, and the fixed 9-section presentation. For isolated parallel
deep-dives, use the `Agent` tool with the `subagent_type` from the matrix; collect their evidence; never let a
sub-agent conclude alone — Sherlock (via sap-incident-commander) owns the single conclusion.
