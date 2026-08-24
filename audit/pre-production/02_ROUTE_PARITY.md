# 02 · ROUTE PARITY — every OLD route vs the NEO namespace

**Audit only.** Nothing under `app/`, `components/`, `data/`, `lib/`, `public/` or any config file was
modified. Every count below is read off disk with the repo's own modules (loaded through `jiti` with the
`@/` alias) or observed on the dev server already running at `http://localhost:3111`.

- Repo: `/Users/salihalif/Desktop/My-Projects/sap-kb3`, branch `design/neo-concept-d`.
- **153** OLD route pages under `app/**` (excluding `app/neo/**`) — every one is in the matrix below.
- **36** NEO route pages under `app/neo/**`.
- One repo, one dataset. Nothing is lost at the data layer; loss happens where a surface stops reading a module.

## 0 · Method

1. `app/**/page.tsx` enumerated (153 OLD / 36 NEO). Import graph walked transitively from every page
   (`@/` alias + relative, `.ts/.tsx/.js/.mjs/.json`, index resolution) to produce the set of `data/*` and
   `lib/*` modules each route reads.
2. For each OLD route the corresponding NEO surface was found by (a) route name, (b) shared data module,
   (c) content probe — sampling long quoted strings from the OLD module and searching the whole NEO-reachable
   corpus (430 files, 19.0 M chars) for them.
3. Record counts come from evaluating the modules, not from reading comments.
4. Live checks were done with `curl` against the running dev server; HTTP status and rendered headings are quoted.

## 1 · Status vocabulary

| Status | Meaning |
|---|---|
| **EXACT** | Same dataset, same record count, equivalent surface in NEO. |
| **TRANSFORMED** | Same content reachable in NEO through a redesigned surface. Nothing dropped. |
| **MIGRATED** | Part of the already-completed 11-Center consolidation (`/neo/centers/`), 89 items, structural parity already proven. |
| **PARTIAL** | Some of the route's content is in NEO, some is not. The gap is named. |
| **MISSING** | No NEO surface renders this content. |
| **INTENTIONALLY REPLACED** | The OLD route is itself a decommissioned stub / infrastructure page; NEO deliberately does not carry it. |

Severity: **P0** validated SAP data or functionality unreachable in NEO · **P1** important capability missing ·
**P2** usability regression · **P3** minor.

## 2 · Totals

| Status | Routes |
|---|---:|
| MISSING | **58** |
| TRANSFORMED | 28 |
| MIGRATED | 21 |
| INTENTIONALLY REPLACED | 17 |
| PARTIAL | 15 |
| EXACT | 14 |
| **Total** | **153** |

| Severity | Routes |
|---|---:|
| P0 | **5** |
| P1 | **39** |
| P2 | 20 |
| P3 | 28 |
| no finding | 61 |

**No route is left unmapped.** Where the NEW URL column reads **—**, no NEO route renders that content and the
Notes column names exactly what is not reachable.

### The five P0 routes

| OLD URL | What is unreachable in NEO |
|---|---|
| `/object/[name]` | 81 of 186 object pages (already reported by another agent) **plus** the whole `data/table-enrichment.ts` layer — 94 tables with deep purpose, PK/FK, index guidance, performance notes, ABAP + SQL snippets and debug entry points. |
| `/domain/[slug]` | 39 functional-domain pages. `data/domains.ts` is read by NEO **only** for a rail count and a flat list; the 194 flow steps / 171 tables / 203 t-codes / 83 BAPIs / 158 learning links / 84 trouble entries behind them have no NEO page. |
| `/migration-cockpit` | `data/migration-cockpit.ts` — 24 migration objects with 27 declared dependencies and 56 ECC source tables, 5 load approaches, 8 named migration errors, 6 data-quality dimensions, 7 readiness gates, a 10-step checklist and 4 load layers. Zero NEO references. |
| `/s4hana` | `data/s4-objects.ts` (29 objects with stays/changed/replaced/removed + risk + release), `data/s4-architecture.ts` (8 layers ECC vs S/4), `data/s4-transformation.ts` (custom code, integration, testing, 3 cutover phases, lessons). Zero NEO references. |
| `/s4-readiness` | The readiness scoring in `lib/s4-readiness.ts` that joins all three of the above. Zero NEO references. |

## 3 · The matrix

| OLD URL | NEW URL | STATUS | CONTENT COMPLETE? | NOTES | SEVERITY |
|---|---|---|---|---|---|
| `/` | `/neo/` | TRANSFORMED | YES | Landing. OLD home renders LEARN_PATHS (19 paths); NEO home is a 7-scene narrative built from components/neo-shell/home/home-data.ts. Learning paths dropped — see 21_MISSING_ITEMS §8. | P2 |
| `/abap` | `/neo/centers/abap/` | MIGRATED | YES | 11 items (data/centers/abap.ts ABAP_TOOLS). | — |
| `/abap/[slug]` | `/neo/centers/abap/[slug]/` | MIGRATED | YES | 11 pages. | — |
| `/academy` | `/neo/academy/` | TRANSFORMED | YES | 8 academy courses (data/library/academy-index.ts BOOKS). | — |
| `/academy/dashboard` | **—** | MISSING | NO | Academy progress dashboard. /neo/academy has course cards but no dedicated dashboard route. | P2 |
| `/academy/lesson/[slug]` | `/neo/academy/[courseId]/[slug]/` | TRANSFORMED | YES | 460 lessons (data/academy/lessons/index.ts ALL_LESSONS) on both sides, re-keyed by course. | — |
| `/academy/path/[module]` | `/neo/academy/[courseId]/` | TRANSFORMED | YES | Per-module path → per-course page. | — |
| `/ai` | `/neo/ai/` | TRANSFORMED | YES | Ask-the-library. Same engine. | — |
| `/alm` | **—** | MISSING | NO | SAP ALM Center (data/alm.ts: 3 platforms w/ 17 capabilities, 16 tools; LIFECYCLE 6 phases/18 activities; TRANSPORT_FLOW 6, TRANSPORT_CONCEPTS 6, TRANSPORT_TCODES 8, CHANGE_TYPES 4, TEST_CAPS 5, MONITOR_TYPES 6, ALM_INTERVIEW 8). | P1 |
| `/apps` | `/neo/transactions/` | PARTIAL | NO | OLD "Apps & Transactions Center" over TX_INTEL (539 codes) + data/lifecycle.ts. NEO transactions renders TX_INTEL but not the lifecycle status/impact layer. | P1 |
| `/apps/[code]` | `/neo/transactions/[code]/` | PARTIAL | NO | 539 codes; NEO detail omits lifecycle status (Obsolete/Deprecated) and impact rating. | P1 |
| `/architect` | **—** | MISSING | NO | Architect dashboard over SOLUTIONS, SAP_NOTES, PROCESS_MAPS, LIFECYCLE. No NEO equivalent. | P2 |
| `/authorizations` | `/neo/centers/process-auth/` | MIGRATED | YES | 6 items (data/centers/process-auth.ts). NOT the same dataset as data/authorizations.ts (15 items) — that one is orphaned, see /security/[slug]. | — |
| `/authorizations/[slug]` | `/neo/centers/process-auth/[slug]/` | MIGRATED | YES | 6 pages. | — |
| `/bapi` | `/neo/bapi/` | EXACT | YES | 147 function objects (lib/bapi-registry registry()). | — |
| `/bapi/[name]` | `/neo/bapi/[name]/` | EXACT | YES | 147 pages both sides. | — |
| `/blueprints` | `/neo/centers/blueprints/` | MIGRATED | YES | 5 items. | — |
| `/blueprints/[slug]` | `/neo/centers/blueprints/[slug]/` | MIGRATED | YES | 5 pages. | — |
| `/brain` | **—** | MISSING | NO | SAP AI Brain control center. No NEO equivalent. | P3 |
| `/cds` | `/neo/cds/` | EXACT | YES | 39 CDS views (data/cds-map CDS_VIEWS). | — |
| `/cds/[view]` | `/neo/cds/[view]/` | EXACT | YES | 39 pages both sides. NOTE: NEO global search still links CDS hits to the OLD /cds/ route — see 15_NAVIGATION_PARITY. | — |
| `/certification` | `/neo/certification/ + /neo/certification/exam/` | TRANSFORMED | YES | NEO splits the honest self-assessment surface from the exam runner. | — |
| `/chat` | `/neo/chat/` | TRANSFORMED | YES | General SAP assistant. | — |
| `/concepts` | `/neo/knowledge/` | EXACT | YES | 33 concepts (data/concepts.ts CONCEPTS). | — |
| `/concepts/[slug]` | `/neo/knowledge/[slug]/` | EXACT | YES | 33 pages both sides. | — |
| `/config` | `/neo/centers/config/` | MIGRATED | YES | 11 items / 77 sections. | — |
| `/config/[slug]` | `/neo/centers/config/[slug]/` | MIGRATED | YES | 11 pages. | — |
| `/connector` | **—** | MISSING | NO | Live SAP connector preparation (architecture doc surface). No NEO equivalent. | P3 |
| `/copilot` | **—** | MISSING | NO | Consultant copilot over SOLUTIONS(17) + SAP_NOTES(23) + lifecycle(36). No NEO equivalent. | P2 |
| `/debugging` | `/neo/centers/debugging/` | MIGRATED | YES | 13 items. | — |
| `/debugging/[slug]` | `/neo/centers/debugging/[slug]/` | MIGRATED | YES | 13 pages. | — |
| `/delivery` | **—** | MISSING | NO | Project Delivery Center (data/project-delivery.ts: 6 SAP Activate phases w/ 26 objectives, 28 deliverables, 27 roles, 15 meetings, 23 templates, 12 risks; + 6 test levels, 4 defect severities, 5 workshop types). | P1 |
| `/domain-model` | `/neo/erd/ (nav) · /neo/domain-model/ (orphan)` | PARTIAL | NO | OLD renders data/domain-model.ts MFG_AREAS: 7 cross-module manufacturing areas (16 modules, 35 flow steps, 22 objects, 14 processes, 14 incidents). /neo/erd/ is a TABLE-level ER model from a different source. /neo/domain-model/ exists but is a Stage-1 placeholder AND is linked from nowhere. | P1 |
| `/domain/[slug]` | **—** | MISSING | NO | 39 functional-domain pages (data/domains.ts DOMAINS = 39; 194 flow steps, 171 tables, 203 tcodes, 83 BAPIs, 158 learning links, 84 trouble entries). DOMAINS is read by NEO only for a COUNT in the rail and a flat list; no per-domain page exists. | P0 |
| `/ecc-s4` | **—** | PARTIAL | NO | ECC↔S/4 topic center (18 topics, status Unchanged/Changed/Replaced/Deprecated). NEO has per-table S/4 verdicts (lib/s4 + data/s4-impact.ts, 11 curated tables) but no topic-level surface. | P1 |
| `/ecc-s4/[slug]` | **—** | MISSING | NO | 18 ECC↔S/4 topic pages. | P1 |
| `/enhancements` | `/neo/enhancements/` | EXACT | YES | 13 techniques (data/enhancements.ts). | — |
| `/enhancements/[slug]` | `/neo/enhancements/[slug]/` | EXACT | YES | 13 pages both sides. | — |
| `/evolution` | **—** | MISSING | NO | Transaction Evolution Center over data/lifecycle.ts (36 codes: 17 Obsolete, 5 Deprecated, 14 Active; ECC/S4 booleans, Fiori replacement, alternative tcode, simplification item, migration note, impact). NEO renders TX_INTEL free-text s4/s4Delta for 30 of the 36 but no status/impact; ENPR + NACE have no NEO page at all. | P1 |
| `/exits` | **—** | PARTIAL | NO | 29 named PM/PP/PP-PI exits + BAdIs (data/exits.ts EXITS). NEO has no index; the 29 appear as VALUES inside /neo/enhancements/[slug]/ (components/neo-shell/reference/enh-data.ts:43,190 — "the project has no NEO page per exit"). | P2 |
| `/exits/[slug]` | **—** | MISSING | NO | 29 OLD detail pages with trigger / when-it-fires. No NEO page. | P2 |
| `/fiori` | `/neo/centers/fiori/` | PARTIAL | NO | The 12 process items migrated. The index ALSO renders data/fiori.ts — FIORI_ARCH 6 / APP_TYPES 3 / ODATA_PARTS 6 / ODATA_TCODES 7 / UI5_PARTS 6 / RAP_PARTS 5 / FIORI_INCIDENTS 6 / FIORI_DEBUG 6 / FIORI_EVOLUTION 6 / FIORI_INTERVIEW 8 — none of which is in data/centers/fiori.ts. | P1 |
| `/fiori-apps` | `/neo/fiori-apps/` | EXACT | YES | 20 fully documented apps (data/fiori/apps.ts). | — |
| `/fiori-apps/[slug]` | `/neo/fiori-apps/[slug]/` | EXACT | YES | 20 pages both sides. NOTE: NEO global search links Fiori hits to the OLD /fiori-apps/ route. | — |
| `/fiori/[slug]` | `/neo/centers/fiori/[slug]/` | MIGRATED | YES | 12 pages. | — |
| `/graph` | `/neo/erd/ + /neo/studio/` | PARTIAL | NO | Global knowledge graph (lib/knowledge-graph-global.ts) fed by MIG_OBJECTS, S4_OBJECTS, ECC_S4_TOPICS, SAP_NOTES, interview. NEO ERD is table-level only (220 tables / 232 relations); Studio is a zone graph. The migration/S4/notes node families are absent. | P1 |
| `/guides` | **—** | MISSING | NO | Deep process guides index (data/process-guides.ts, 6 guides). | P1 |
| `/guides/[slug]` | **—** | MISSING | NO | 6 guide pages (43 flow steps, 32 steps, 48 tables, 37 tcodes, 25 mistakes, 19 troubleshoot steps, 21 debug paths, 18 exits, 15 Fiori). | P1 |
| `/idoc` | `/neo/idoc/` | EXACT | YES | 2 message types. | — |
| `/idoc/[name]` | `/neo/idoc/[name]/` | EXACT | YES | 2 pages both sides. | — |
| `/impact` | **—** | MISSING | NO | Impact & dependency center. No NEO equivalent. | P1 |
| `/impact/[name]` | **—** | MISSING | NO | 126 OLD impact pages (lib/impact.ts allImpactNames()). No NEO equivalent. | P1 |
| `/import` | **—** | MISSING | NO | SAP import engine architecture. No NEO equivalent. | P3 |
| `/incidents` | `/neo/incidents/` | TRANSFORMED | YES | OLD "Incident Intelligence Center" over the same 156 incidents. | — |
| `/integration` | `/neo/centers/integration/` | MIGRATED | YES | 6 items. | — |
| `/integration/[slug]` | `/neo/centers/integration/[slug]/` | MIGRATED | YES | 6 pages. | — |
| `/knowledge` | `/neo/knowledge/` | PARTIAL | NO | OLD hub aggregates 8 datasets: workbenches(4)+workbenches-ext(3), process-guides(6), qa-center(10), solutions(17), processes(5), sap-notes(23), ecc-s4(18), lifecycle(36). NEO /neo/knowledge is CONCEPTS only (33). | P1 |
| `/knowledge/coverage` | **—** | MISSING | NO | Knowledge-coverage report over AUTH_ITEMS + ECC_S4_TOPICS. No NEO equivalent. | P2 |
| `/learn` | **—** | MISSING | NO | Learning-paths hub (data/learn/paths.ts: 19 paths, 4 areas, 4 categories, 19 tracks). /neo/academy is a DIFFERENT corpus (8 academy books, 460 lessons). | P1 |
| `/learn/[module]` | **—** | MISSING | NO | 19 learning-path pages with per-step importance ratings and interview Q&A. | P1 |
| `/library` | `/neo/books/` | TRANSFORMED | YES | Shelf. NOTE: /neo/library/ (Stage-1 hub) also exists and reports 10 books from data/library.ts LIBRARY_STATS while /neo/books/ reports 11 — see 15_NAVIGATION_PARITY. | P2 |
| `/library/academy` | `/neo/academy/` | TRANSFORMED | YES | 8 academy books. | — |
| `/library/academy/fiori` | **—** | MISSING | NO | Fiori academy reference (uses data/lifecycle.ts). No NEO equivalent. | P2 |
| `/library/academy/reference/[book]` | **—** | MISSING | NO | 8 per-book reference indexes (tcodes / tables / terms). /neo/books/[bookId]/ is a book hub, not the reference index. | P2 |
| `/library/academy/search` | **—** | PARTIAL | NO | Academy-scoped search. NEO has the global ⌘K palette but no academy-scoped search route. | P2 |
| `/library/ask` | `/neo/ai/` | TRANSFORMED | YES | Ask-the-library. | — |
| `/library/book1` | `/neo/read/book1/` | TRANSFORMED | YES | Reader parity proven in audit/pre-production/11_READER_PARITY.md. | — |
| `/library/book10` | `/neo/read/book10/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book11` | `/neo/read/book11/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book2` | `/neo/read/book2/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book3` | `/neo/read/book3/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book4` | `/neo/read/book4/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book5` | `/neo/read/book5/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book6` | `/neo/read/book6/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book7` | `/neo/read/book7/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book8` | `/neo/read/book8/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/book9` | `/neo/read/book9/` | TRANSFORMED | YES | Reader parity proven. | — |
| `/library/mm-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Decommissioned redirect stub — metadata title is literally "עבר ל-SAP Academy". | P3 |
| `/library/mm-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (18 chapters), ~55 chars of visible text, noindex. | P3 |
| `/library/mm-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. Internal QA surface, no NEO equivalent. | P3 |
| `/library/pm-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/pm-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (9 chapters). | P3 |
| `/library/pm-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/library/pmu-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/pmu-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (10 chapters). | P3 |
| `/library/pmu-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/library/pp` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/pp-quality-report` | **—** | MISSING | NO | Per-book quality report + SAP object index (data/library/pp-quality.ts, pp-objects.json). | P3 |
| `/library/pp/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (15 chapters, data/library/pp-knowledge.ts PP_CHAPTERS). | P3 |
| `/library/pp/object/[code]` | **—** | MISSING | NO | PP object pages from data/library/pp-objects.json. Not a redirect stub — real content, no NEO equivalent. | P2 |
| `/library/ppds-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/ppds-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (11 chapters). | P3 |
| `/library/ppds-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/library/qm-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/qm-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (20 chapters). | P3 |
| `/library/qm-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/library/sop-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/sop-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (15 chapters). | P3 |
| `/library/sop-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/library/v2/[bookId]` | `/neo/books/[bookId]/` | TRANSFORMED | YES | 11 book ids (lib/library/registry allBookIds()). | — |
| `/library/wm-academy` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stub. | P3 |
| `/library/wm-academy/[slug]` | `/neo/academy/` | INTENTIONALLY REPLACED | YES | Redirect stubs (10 chapters). | P3 |
| `/library/wm-quality-report` | **—** | MISSING | NO | Per-book enrichment quality report. | P3 |
| `/lineage` | **—** | MISSING | NO | Data lineage source→object→consumer. No NEO equivalent. | P1 |
| `/manufacturing` | `/neo/centers/manufacturing/` | MIGRATED | YES | 6 items / 36 sections. | — |
| `/manufacturing/[slug]` | `/neo/centers/manufacturing/[slug]/` | MIGRATED | YES | 6 pages. | — |
| `/migration` | `/neo/centers/migration/` | MIGRATED | YES | 7 items. NOT the Migration Cockpit (see /migration-cockpit). | — |
| `/migration-cockpit` | **—** | MISSING | NO | Migration Cockpit (data/migration-cockpit.ts: 24 migration objects w/ 27 dependencies + 56 ECC source tables, 5 approaches, 8 migration errors, 6 quality dimensions, 7 readiness gates, 10-step checklist, 4 load layers). | P0 |
| `/migration/[slug]` | `/neo/centers/migration/[slug]/` | MIGRATED | YES | 7 pages. | — |
| `/mrp` | **—** | MISSING | NO | MRP / MPS planning center (data/mrp-center.ts: 9 sections, 36 points, 23 tables, 23 tcodes, 6 planning strategies, 12 MRP tcodes). | P1 |
| `/notes-graph` | **—** | MISSING | NO | SAP Notes graph over data/sap-notes.ts (23 notes / 34 incident links). No NEO equivalent. | P1 |
| `/object/[name]` | `/neo/object/[name]/` | PARTIAL | NO | 186 OLD pages (126 ALL_TABLES + 65 HR_BW_NAMES + 16 verifiedNames, deduped) vs 126 NEO. 81 with no NEO page — ALREADY REPORTED (P0). Also loses data/table-enrichment.ts (94 tables). | P0 |
| `/offline` | **—** | INTENTIONALLY REPLACED | YES | PWA offline fallback page — served by the service worker, not a navigable surface. Applies to the whole origin including /neo. | P3 |
| `/oic` | **—** | MISSING | NO | Object Intelligence Center over lib/cross-links OIC_OBJECTS (17) + SAP_NOTES. | P2 |
| `/oic/[slug]` | **—** | MISSING | NO | 17 object-intelligence pages. | P2 |
| `/onboarding` | **—** | PARTIAL | NO | New-consultant onboarding. NEO has an onboarding overlay in the shell but no /neo/onboarding route. | P2 |
| `/playbooks` | `/neo/centers/playbooks/` | MIGRATED | YES | 4 items. | — |
| `/playbooks/[slug]` | `/neo/centers/playbooks/[slug]/` | MIGRATED | YES | 4 pages. | — |
| `/pm` | `/neo/pm/` | TRANSFORMED | YES | Module portal → ModuleWorkspace (components/neo-shell/workspace/*). 8 workspace chapters vs 15 OLD sections. | — |
| `/pm/[section]` | `/neo/pm/ (single page)` | PARTIAL | NO | 15 OLD section pages per module (lib/module-portal NAV_SECTIONS). Collapsed into one workspace. Loses: master-data (PM_MASTER_DATA_FACETS 11 objects), configuration (SAPSheet/config tree), business-process (PPPI_PROCESS_FLOW for PP-PI). | P1 |
| `/pp-pi` | `/neo/pp-pi/` | TRANSFORMED | YES | Same as /pm. | — |
| `/pp-pi/[section]` | `/neo/pp-pi/ (single page)` | PARTIAL | NO | 15 OLD section pages. Loses PPPI_MASTER_DATA_FACETS (8 objects), PPPI_CONFIG_TREE (12 areas / 29 nodes), PPPI_PROCESS_FLOW (3 phases / 12 steps). | P1 |
| `/privacy` | **—** | MISSING | NO | Privacy policy. Legally required and reachable only from the OLD footer; the NEO shell footer does not link it. | P2 |
| `/process-explorer` | **—** | MISSING | NO | End-to-end process maps index (data/processes.ts, 5 maps / 25 steps). | P1 |
| `/process-explorer/[slug]` | **—** | MISSING | NO | 5 process-map pages. | P1 |
| `/process/[slug]` | **—** | MISSING | NO | 19 process pages (lib/object-intel listProcesses(): PM-1..PM-12, PP-PI-1..PP-PI-7). No NEO equivalent. | P1 |
| `/qa-testing` | **—** | MISSING | NO | QA testing center (data/qa-center.ts, 10 packs). | P1 |
| `/qa-testing/[slug]` | **—** | MISSING | NO | 10 test packs (43 tcodes, 41 tables, 55 scenarios). | P1 |
| `/quality-audit` | **—** | MISSING | NO | Knowledge quality audit over sap-notes / solutions / processes. No NEO equivalent. | P2 |
| `/resolution` | **—** | MISSING | NO | Solution-path engine index (INCIDENTS 156 + SAP_NOTES 23). | P1 |
| `/resolution/[slug]` | **—** | MISSING | NO | 156 resolution-path pages, one per incident, joining incident→SAP-note keywords. | P1 |
| `/s4-readiness` | **—** | MISSING | NO | S/4HANA Readiness Center (lib/s4-readiness.ts over MIG_OBJECTS 24 + S4_OBJECTS 29 + ECC_S4_TOPICS 18). | P0 |
| `/s4hana` | **—** | MISSING | NO | S/4HANA Transformation Center — data/s4-objects.ts (29 objects w/ status+risk+release), data/s4-architecture.ts (8 layers), data/s4-transformation.ts (9 custom-code rows, 6 integration, 8 testing, 3 cutover phases/13 items, 6 lessons), data/ecc-s4.ts (18 topics). | P0 |
| `/sap-infrastructure` | `/neo/erd/` | PARTIAL | NO | Cross-module ERD workspace (13 module groups incl. HR + BW, data/hr-module.ts, data/bw-module.ts, data/process/process-data.ts, data/knowledge/interview.ts). /neo/erd/ serves 15 modules / 220 tables / 232 relations from PM+PP-PI blueprints; the HR/BW landscape and the per-object interview Q&A (21 objects) are absent. | P1 |
| `/sap-notes` | **—** | MISSING | NO | SAP Notes solution-path center (data/sap-notes.ts, 23 notes). | P1 |
| `/sap-notes/[slug]` | **—** | MISSING | NO | 23 pages (108 search keywords, 70 resolution steps, 34 related incidents). Deliberately keyword-based, never note numbers. | P1 |
| `/security` | **—** | MISSING | NO | Security & Authorizations Center (data/security.ts: 12 AREAS, 36 tcodes, 33 tables, 41 troubleshoot, 38 debug, 37 tips, 24 notes, 35 links; + SEC_ARCH 6 layers/18 items, ROLE_DESIGN 8, FIORI_MODEL 5, SEC_ERRORS 6, TROUBLE_FLOW 6, SEC_INTERVIEW 8). | P1 |
| `/security/[slug]` | **—** | MISSING | NO | 15 pages from data/authorizations.ts AUTH_ITEMS (32 failure modes, 44 troubleshoot steps, PM + PP examples, ECC vs S/4). | P1 |
| `/solutions` | **—** | MISSING | NO | Solution finder index (data/solutions.ts, 17 solutions). | P1 |
| `/solutions/[slug]` | **—** | MISSING | NO | 17 pages (140 keywords, 67 ECC tcodes, 33 Fiori, 69 tables, 14 CDS, 41 APIs/BAPIs, 22 exits, 46 incidents). | P1 |
| `/story` | **—** | MISSING | NO | Guided process tours index (data/story/*, 2 stories). | P2 |
| `/story/[process]` | **—** | MISSING | NO | 2 tours × 8 steps (pm-maintenance, pppi-process-order). | P2 |
| `/studio` | `/neo/studio/` | TRANSFORMED | YES | Both read lib/studio-graph. NEO studio is the rebuilt surface. | — |
| `/tables` | `/neo/tables/` | TRANSFORMED | YES | 126 dictionary tables both sides (lib/data.ts ALL_TABLES = 126). | — |
| `/tcode/[code]` | `/neo/transactions/[code]/` | PARTIAL | NO | OLD generates 1,849 pages (registryCodes 1,817 ∪ listTcodes 169). 32 codes have no NEO page — ALREADY REPORTED (P1). | P1 |
| `/toolkit` | `/neo/centers/toolkit/` | MIGRATED | YES | 8 items. | — |
| `/toolkit/[slug]` | `/neo/centers/toolkit/[slug]/` | MIGRATED | YES | 8 pages. | — |
| `/transactions` | `/neo/transactions/` | TRANSFORMED | YES | Registry: 1,817 codes both sides (lib/tx-registry registryCodes()). | — |
| `/troubleshooting` | `/neo/incidents/` | EXACT | YES | 156 incidents (data/troubleshooting.ts INCIDENTS). | — |
| `/troubleshooting/[slug]` | `/neo/incidents/[slug]/` | EXACT | YES | 156 pages both sides. | — |
| `/verification` | **—** | MISSING | NO | Repository verification board (sap-notes + solutions + trust flags). No NEO equivalent. | P2 |
| `/workbench` | **—** | MISSING | NO | Consultant workbenches index (data/workbenches.ts 4 + data/workbenches-ext.ts 3 = 7). | P1 |
| `/workbench/[slug]` | **—** | MISSING | NO | 4 pages from WORKBENCHES (24 concepts, 19 arch, 23 flow, 41 tables, 111 tcodes, 13 FMs, 13 BAdIs, 14 user exits, 24 incidents, 23 debug entries, 14 eccS4, 12 scenarios). WORKBENCHES_EXT (3 more) is only reachable through /knowledge. | P1 |

## 4 · Routes that exist in NEO with no OLD ancestor

| NEO URL | Note |
|---|---|
| `/neo/[hub]/` | Generates 19 hub ids. 15 are shadowed by a real static NEO page; `pm` and `pp-pi` render `ModuleWorkspace`; `domain-model` and `library` still render the Stage-1 placeholder frame. |
| `/neo/centers/`, `/neo/centers/[family]/`, `/neo/centers/[family]/[slug]/` | The 11-Center consolidation. 11 families, 89 items. |
| `/neo/erd/` | 15 modules / 220 tables / 232 relations (observed on the dev server). Replaces the table half of `/domain-model` and `/sap-infrastructure`. |
| `/neo/certification/exam/` | Exam runner split out of `/certification`. |
| `/neo/books/[bookId]/` | Book hub (inside-cover) — no OLD ancestor; `/library/v2/[bookId]` is the closest. |
| `/neo/read/[bookId]/` | The NEO reader. Parity with `/library/book*` proven in `11_READER_PARITY.md`. |

## 5 · Dead code worth knowing about (not a loss, but it hides the gaps)

`components/neo-shell/nav-data.ts` `hubContent()` carries fully written branches for
`tables`, `transactions`, `bapi`, `idoc`, `cds`, `fiori-apps`, `enhancements`, `knowledge`, `academy`,
`incidents`. **None of them can ever render**: Next.js resolves the static `app/neo/<id>/page.tsx` ahead of
`app/neo/[hub]/page.tsx` for all ten. Only the `library` and `domain-model` branches (and the `default`
Stage-1 branch, which is now unreachable for the same reason) actually execute. Reading that file gives the
impression NEO has ten more hub surfaces than it does.
