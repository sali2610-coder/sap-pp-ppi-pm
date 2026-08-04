# Phase 1 — Auto SAP Investigation (evidence catalog per fault type)

Extends the Interactive Investigation Mode. HQ classifies the fault, looks up the row below, and requests **only the
items still missing** — never the whole list, never a fixed checklist. Ask the 2-4 that actually move the diagnosis.

## Evidence catalog (request only what's missing)

| Fault type | Ask for (in priority order) |
|---|---|
| **IDOC** | WE02/WE05 (status + message text), BD87 (reprocess status), WE09 (search by content), **payload**, WE20 partner profile, **basic type** (e.g. ORDERS05), failing segment |
| **Authorization** | SU53 (screenshot right after failure), SU56 (user buffer), ST01 (auth trace), PFCG (role/object) |
| **ABAP Dump** | ST22 (dump ID + short text), SM21 (syslog window), dev trace |
| **Update Error** | SM13 (update request + module), ST22 (linked dump), SM21 |
| **RFC** | SM58 (tRFC status), SM59 (destination test), gateway logs |
| **Gateway / OData** | /IWFND/ERROR_LOG, /IWBEP/ERROR_LOG, ST22, SICF (service node/activation) |
| **Performance** | ST12 (single-transaction trace), SAT, ST05 (SQL/RFC/enqueue trace), SQLM (SQL monitor) |
| **PI/PO** | SXMB_MONI, Message Monitor (PIMON), **payload**, communication channel status |
| **PP** | order (AUFNR), material, plant, routing, BOM, work center, confirmation, MRP result |
| **PM** | notification, order, equipment, functional location, status (I0072…) |
| **QM** | inspection lot, usage decision |
| **MM** | material, PO, GR (MIGO/MB doc), stock (MMBE) |
| **SD** | sales order, delivery, billing document |

## How HQ uses it
1. Classify → pick the row.
2. Diff against what Sali already provided → keep only the missing items.
3. Request them in one short, plain-Hebrew ask, name the exact tcode/screenshot/log/payload, then **stop and wait**
   (Interactive Mode). Request an SAP Note (Oracle) only if the symptom likely matches one — not by default.
4. When evidence arrives → hand to the matching **Expert Pack** (`expert-packs.md`) and run the reasoning engine.

Guardrails unchanged: orchestrator only, no new workers, `sc4sap:sap` MCP disconnected → pasted evidence, never
guess below the confidence gate.
