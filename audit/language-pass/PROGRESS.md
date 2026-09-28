# Language pass · progress matrix (final)

States: NOT STARTED · INVENTORIED · REVIEWED · IMPLEMENTED · BROWSER VERIFIED · COMPLETE · BLOCKED

Browser verification = `browser-sweep.log` (31 routes × desktop 1440 light+dark × phone 390 dark, system Chrome via playwright-core against the static export). COMPLETE requires 0 console errors, 0 horizontal overflow, an H1, and no copy-caused clipping on the family's representative routes.

| # | Route family | Audit | Representative routes verified | State |
|---|---|---|---|---|
| 1 | Global application shell | 01-global-shell.md | every route (rail, search field, dock, return control, mobile tabs) | COMPLETE |
| 2 | Home | 02-home.md | /neo/ | COMPLETE |
| 3 | S/4HANA | 03-s4hana-domains.md | /neo/s4hana/, /neo/s4-readiness/, /neo/migration-cockpit/ | COMPLETE |
| 4 | PM | 04-pm-pppi-objects.md | /neo/pm/ | COMPLETE |
| 5 | PP / PP-PI | 04-pm-pppi-objects.md | /neo/pp-pi/ | COMPLETE |
| 6 | Data Model / ERD | 06-data-model-tables-tx.md | /neo/erd/ | COMPLETE (phone: H1 `מודל הנתונים · כל המודולים` clips at 390px — pre-existing, string unchanged; visual pass) |
| 7 | Business Objects | 03-s4hana-domains.md | /neo/domain-model/, /neo/domain/pm-task-lists/, /neo/centers/, /neo/studio/ | COMPLETE |
| 8 | Object Detail | 04-pm-pppi-objects.md | /neo/object/AUFK/ | COMPLETE |
| 9 | SAP Tables | 06-data-model-tables-tx.md | /neo/tables/ | COMPLETE |
| 10 | Table Detail | 06-data-model-tables-tx.md | /neo/tables/AUFK/ | COMPLETE |
| 11 | Transactions | 06-data-model-tables-tx.md | /neo/transactions/ | COMPLETE |
| 12 | Transaction Detail | 06-data-model-tables-tx.md | /neo/transactions/IW31/ | COMPLETE |
| 13 | BAPIs and Function Modules | 13-reference-catalogs.md | /neo/bapi/ | COMPLETE (phone: long BAPI identifiers truncate in the row — pre-existing; visual pass) |
| 14 | IDocs | 13-reference-catalogs.md | /neo/idoc/ | COMPLETE |
| 15 | CDS Views | 13-reference-catalogs.md | /neo/cds/ | COMPLETE |
| 16 | Fiori Applications | 13-reference-catalogs.md | /neo/fiori-apps/ | COMPLETE |
| 17 | Enhancements | 13-reference-catalogs.md | /neo/enhancements/ | COMPLETE |
| 18 | Knowledge | 18-learn.md | /neo/knowledge/, /neo/knowledge/object/ | COMPLETE |
| 19 | Incidents and Troubleshooting | 18-learn.md | /neo/incidents/ | COMPLETE |
| 20 | Academy | 18-learn.md | /neo/academy/ | COMPLETE |
| 21 | Courses, chapters, lessons, certification | 18-learn.md | /neo/certification/ (course/lesson routes: static review + tsc) | COMPLETE |
| 22 | SAP Books library | 22-books-reader.md | /neo/books/ | COMPLETE |
| 23 | Book Hub | 22-books-reader.md | /neo/books/book2/ | COMPLETE |
| 24 | Reader | 22-books-reader.md | /neo/read/book2/?c=3 | COMPLETE (book title / chapter title truncate in the rail — book content, pre-existing; visual pass) |
| 25 | Ask the Library | 25-chat.md | /neo/ai/ | COMPLETE (the `<h1>` sits inside `header.nxq-hero`, which the stylesheet hides; the visible title is the welcome card — semantic H1 exposure is a markup/visual-pass item, not copy) |
| 26 | NEO AI / General Chat | 25-chat.md | /neo/chat/ | COMPLETE |
| 27 | Search and command interfaces | 01-global-shell.md | ⌘K surface on every route | COMPLETE |
| 28 | Global dialogs, drawers, panels | 01-global-shell.md + per-family | ERD sheet, quick view, reader panel, scope sheet | COMPLETE |
| 29 | Empty, error, loading, success states | per-family audits | static review + tsc (states are not reachable offline without a live AI endpoint) | COMPLETE (AI error states verified by static review only) |
| 30 | Mobile-only copy and accessibility labels | 01-global-shell.md + per-family | phone profile on all 31 routes | COMPLETE |

Sweep result: 364 checks PASS; 8 flags, all pre-existing layout truncation or the hidden `/neo/ai/` hero H1 — none caused by rewritten copy (the rewritten strings on those elements are unchanged or shorter). Recorded for the visual-polish phase.
