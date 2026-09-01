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
| 9-10 | SAP Tables + Table Detail | RESEARCH QUEUED | queue-tables.json: 11 undecided + 19 shared + PM/PP-PI core |
| 11-12 | Transactions + Detail | RESEARCH QUEUED | queue-transactions.json: 12 lifecycle conflicts (P1) + 40 PM/PP-PI core |
| 13 | BAPIs / FM / APIs | INVENTORIED | 48 requires-verification + 18 invalid-name first; released-API links via api.sap.com URLs |
| 14 | IDocs | INVENTORIED | 2 message types; basic-type registry seeded (MATMAS05) |
| 15 | CDS Views | INVENTORIED | 39 views; templated "verified" downgraded to repository_verified at data commit; Help "APIs for Maintenance Management" deliverable found as official channel |
| 16 | Fiori | INVENTORIED | 20 curated apps; F2731-vs-F5241 conflict recorded as first conflicting_sources case |
| 17 | Enhancements | INVENTORIED | 13 techniques + 29 named exits/BAdIs, zero sources today |
| 18-21 | Knowledge / Incidents / Academy | INVENTORIED | incidents 156 (125 with notes); reader session-limited during baseline — measured by hand |
| 22 | Books cross-references | NOT STARTED | citations by book id only, frozen surfaces untouched |
| 23 | Ask the Library / NEO AI integration | NOT STARTED | knowledge integration only; no backend change |
| 24 | Best Practices section | ENRICHED (foundation) | 2 seed practices; grows per family |
| 25 | Search + cross-links | NOT STARTED | bp search family with commit 4; xref gates active |
| 26 | Final regression + coverage | NOT STARTED | report-coverage before/after per family |
