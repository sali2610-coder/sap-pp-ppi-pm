# S/4HANA enrichment · progress matrix

States: NOT STARTED · INVENTORIED · RESEARCH QUEUED · SOURCED · ENRICHED · SCHEMA VERIFIED · BROWSER VERIFIED · COMPLETE · BLOCKED

| # | Family | State | Notes |
|---|---|---|---|
| 0 | Foundation (evidence model, status map, depth, tests, coverage) | COMPLETE | commits ce20f023 + e114c24d; 200/200 tests; baseline coverage recorded |
| 1 | Home | INVENTORIED | all visible totals derive from homeData()/booksData() (verified in the content pass); S/4-first positioning verified; totals re-checked after each family via build + crawl |
| 2 | S/4HANA (center, readiness, cockpit) | INVENTORIED | 29 s4-objects (9 with release "S/4 1511"), 36 lifecycle records (12 tx conflicts, group A), 11 undecided blueprint verdicts — queued into tables/transactions research |
| 3 | PM | RESEARCH QUEUED | core tables + IW/IP/IE/IL transactions in queue |
| 4 | PP | RESEARCH QUEUED | with PP-PI queue (strict separation maintained in records) |
| 5 | PP-PI | RESEARCH QUEUED | COR/CO/MSC/MD transactions + recipe/version tables |
| 6 | Data Model / ERD | INVENTORIED | 129 PP-PI relation statements carry no cardinality (source gap; never invented) |
| 7 | Business Objects | INVENTORIED | obj: registry seeded (1); canonical object records per family as they enrich |
| 8 | Object Detail | INVENTORIED | evidence block lands with commit 3 |
| 9-10 | SAP Tables + Table Detail | BROWSER VERIFIED (batch 1) | 13 Tier-1 records committed (46574add): 10/11 undecided verdicts resolved officially, MARA refuted→queue, T438M honestly verification_required; coverage verified 94→104, L5 0→7; evidence block confirmed in the export (AUFK) |
| 11-12 | Transactions + Detail | SCHEMA VERIFIED (batch 1) | 16 records committed (f5d00773): all 12 lifecycle conflicts (MB*/ME*) resolved officially with successors, 1 honest conflicting_sources, IW31/IW41/COR1/COR6N verified in 2025.001; L5 0→12 |
| 13 | BAPIs / FM / APIs | SCHEMA VERIFIED (batch 1) | 12 records committed (9a8d390e): BAPI_ALM_ORDER_MAINTAIN → released_api_available with official API pages; 10 requires-verification FMs stated honestly; verified 97→107 |
| 14 | IDocs | SCHEMA VERIFIED | 4 records committed (954ed503): MATMAS/LOIPRO + basic types MATMAS05/LOIPRO01 (new registry entry), 15 official URLs live-checked; L5 0→2 |
| 15 | CDS Views | SCHEMA VERIFIED (batch 1) | 13 records committed (c7733e15): 9 released statuses (L5), I_MaterialDocumentItem deprecated 2021, I_MaintenancePlan → I_MaintenancePlanBasic (queued), 3 honest verification_required; 26 views remain |
| 16 | Fiori | SCHEMA VERIFIED (batch 1) | 19/20 records committed (84339019): 8 curated id/title bindings recorded as conflicting_sources (F2731, F2730, F2730A, F4072, F3577, F3364, F1576, F0843), Confirm Jobs W0020 deprecated 2022 / deleted 2023 officially, F3289 refuted→queue; L5 0→11 |
| 17 | Enhancements | SCHEMA VERIFIED (batch 1) | 14 records committed: 10 PM customer exits + 4 BAdIs cited to SAP Library / S/4 2025 pages; 4 honest verification_required, 5 conflicts recorded (CONFPM01, IEQM0001 repository descriptions disagree with SAP); L5 0→2 |
| 18-21 | Knowledge / Incidents / Academy | INVENTORIED | incidents 156 (125 with notes); reader session-limited during baseline — measured by hand |
| 22 | Books cross-references | NOT STARTED | citations by book id only, frozen surfaces untouched |
| 23 | Ask the Library / NEO AI integration | NOT STARTED | knowledge integration only; no backend change |
| 24 | Best Practices section | BROWSER VERIFIED (foundation) | /neo/best-practices/ live in the export (catalog + 2 details + 404 path, rail + ⌘K family); grows per family (01f5268d) |
| 25 | Search + cross-links | NOT STARTED | bp search family with commit 4; xref gates active |
| 26 | Final regression + coverage | NOT STARTED | report-coverage before/after per family |
