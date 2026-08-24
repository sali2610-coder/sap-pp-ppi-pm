# 21 · MISSING ITEMS — the 32 orphan content modules, one by one

**Audit only.** No application file was touched.

An import-reachability pass established that **106** `data/` + `lib/` modules are reachable from OLD routes and
from no NEO route. 18 of those are the book pipeline source (`data/library/book*-full.json`,
`book*-figures.json`) and are a **proven false positive** — `prebuild` converts them into `data/books/**` and
`public/books/**`, which NEO reads. 52 are `lib/*` helpers, which follow their data. That leaves the **32
`data/*` content modules** below. Each one is: what it holds (record counts, taken by evaluating the module),
which OLD route renders it, whether the content reaches NEO, and a verdict.

Verdicts: **EXACT** · **TRANSFORMED** · **PARTIAL** · **MISSING** · **INTENTIONALLY REPLACED** · **DUPLICATE**.
The rule applied throughout: *never call something redundant because it looks old.* **DUPLICATE was awarded to
zero modules** — no orphan module's content was found intact behind a different NEO module.

## 0 · How "does it reach NEO?" was decided

Two independent tests, both run over the same corpus (every `data/`+`lib/` module reachable from a NEO page,
plus every file under `app/neo/**` and `components/neo-shell/**` — 430 files, 19,048,189 characters):

1. **Import test** — is the module (or its exported symbol) imported anywhere in that corpus?
2. **Content test** — take up to 30 distinctive quoted strings of 24–120 characters from the module and
   search the corpus verbatim. A high hit rate means the same prose arrived by another route; a low hit rate
   with the hits scattered across unrelated files means the matches are incidental (t-code names, common SAP
   phrases), not the content.

Both results are quoted per module.

## 1 · Verdict summary

| Verdict | Modules | Record weight |
|---|---:|---|
| **MISSING** | 22 | ~1,100 records across 22 SAP subject areas |
| **PARTIAL** | 8 | facets, guides, lifecycle, Fiori architecture, kind templates |
| **INTENTIONALLY REPLACED** | 1 | `data/story/types.ts` (type-only, 0 records) |
| **DUPLICATE** | **0** | nothing was proven redundant |
| EXACT / TRANSFORMED | 0 | — |

## 2 · The 32 modules

---

### 1. `data/table-enrichment.ts` — 127.6 KB · **MISSING** · **P0**

**Holds.** `TABLE_ENRICHMENT`: **94 dictionary tables**, each with `purposeDeep` (deep functional purpose in
Hebrew), `primaryKey` (key fields with meaning), `foreignKeys`, `indexes` (access-path guidance), `matdocNote`
(MATDOC/ACDOCA impact), `perfNotes`, `abapExample`, `sqlExample` (CDS/SQL join), `debugExample`, a
`verified` flag and `sources` (SE11 / SAP Help citations). Keys include AUFK, AFKO, AFPO, EQUI, MCH1, AFVC,
RESB, MARA, MARC, IFLOT, JEST, MSEG, AFRU, PLKO.

**Rendered by.** `components/object-workspace.tsx:17` (import) and `:417` (the "פירוט Enterprise · טבלה"
section), reached from `app/object/[name]/page.tsx`.

**In NEO?** No. Import test: 0 hits. Content test: 1/30. `/neo/tables/[name]/` is built entirely from
`components/neo-shell/erd/model.ts` (`components/neo-shell/data/tables-detail.ts:34-44`), and
`/neo/object/[name]/` from `components/neo-shell/object/object-data.ts:18-26` — neither imports the
enrichment layer. The file's own header states it exists precisely because the generated blueprint does not
carry these fields, so the blueprint cannot be the substitute.

**Verdict. MISSING.** 94 tables lose their ABAP/SQL/debug/index/performance layer. P0 — this is verified SAP
DDIC content with cited sources and it is unreachable in NEO.

---

### 2. `data/pppi-config-tree.ts` — 48.7 KB · **MISSING** · **P1**

**Holds.** `PPPI_CONFIG_TREE`: **12 configuration areas / 29 SPRO nodes** for PP-PI.

**Rendered by.** `components/module-section.tsx:22,188` — the `configuration` section of
`app/pp-pi/[section]/page.tsx` (and the PM twin falls back to the generated `SAPSheet`).

**In NEO?** No. Import test: 0 hits. Content test: 24/206 strings, and the hits scatter into
`data/academy/lessons/pp-generated.ts` (6), `data/centers/config.ts` (3), `data/library-content-he.ts` (3) —
incidental phrase overlap, not the tree. `data/centers/config.ts` is a **different** dataset: 11 topics /
77 sections with its own slugs, already migrated to `/neo/centers/config/`.

**Verdict. MISSING.** The PP-PI SPRO path tree has no NEO surface.

---

### 3. `data/workbenches-ext.ts` — 42.5 KB · **MISSING** · **P1**

**Holds.** `WORKBENCHES_EXT`: **3 consultant workbenches**, together carrying 19 concepts, 15 architecture
blocks, 18 process-flow steps, 34 tables, **91 transactions**, 12 function modules, 12 BAdIs, 13 user exits,
19 incidents, 18 debug entry points, 12 ECC→S/4 deltas and 9 scenarios.

**Rendered by.** `app/workbench/page.tsx`, `app/workbench/[slug]/page.tsx`, `app/knowledge/page.tsx`.

**In NEO?** No. Import test: 0 hits (`WORKBENCHES` grep across `app/neo` + `components/neo-shell` is empty).
Content test: 3/30, the hits in `data/troubleshooting-ext.ts`.

**Verdict. MISSING.**

---

### 4. `data/pppi-master-data-facets.ts` — 36.2 KB · **PARTIAL** · **P1**

**Holds.** `PPPI_MASTER_DATA_FACETS`: **8 PP-PI master-data objects**, each with `whatIs`, `businessValue`,
`why`, `whenCreated`, `lifecycle`, `owner`, `dependencies` — plus 45 tables, 42 t-codes, 17 Fiori apps,
19 CDS views, 27 BAPIs, 13 BAdIs, **32 common mistakes** and **24 troubleshooting entries**.

**Rendered by.** `components/module-section.tsx:20,83` — the `master-data` section of `/pp-pi/[section]`.

**In NEO?** Partly, and through a different module. Content test: 24/114, concentrated in
`data/domain-detail.ts` (8) and `data/cds-map.ts` (7). `data/domain-detail.ts` (32 domain entries) **is**
NEO-reachable, and it carries master-data narrative for the same objects — but not the mistakes/troubleshooting
facets, and the NEO module workspace renders no facet surface at all (`components/neo-shell/workspace/workspace-data.ts:30-46`
imports `sapData`, `module-portal`, `cds-map`, `studio-graph`, `library` — no facets).

**Verdict. PARTIAL.** The object narrative largely survives via `domain-detail`; the 32 common mistakes and
24 troubleshooting entries do not.

---

### 5. `data/security.ts` — 33.3 KB · **MISSING** · **P1**

**Holds.** `AREAS`: **12 security areas** carrying 36 t-codes, 33 tables, 41 troubleshooting entries, 38 debug
steps, 37 tips, 24 notes, 5 incidents and 35 cross-links. Plus `SEC_ARCH` (6 layers / 18 items),
`ROLE_DESIGN` (8), `FIORI_MODEL` (5), `SEC_ERRORS` (6), `TROUBLE_FLOW` (6 steps), `SEC_INTERVIEW` (8 Q&A),
`SEC_CAT` (5 categories).

**Rendered by.** `app/security/page.tsx`.

**In NEO?** No. Import test: 0. Content test: 2/30.

**Verdict. MISSING.** SAP authorization architecture, role design and the security troubleshooting flow are
absent from NEO entirely. Note this is **not** the same dataset as `data/centers/process-auth.ts` (6 process
authorization items), which was migrated to `/neo/centers/process-auth/`.

---

### 6. `data/pm-master-data-facets.ts` — 28.9 KB · **PARTIAL** · **P1**

**Holds.** `PM_MASTER_DATA_FACETS`: **11 PM master-data objects** with `whatIs`, `why`, `whenCreated`,
`owner`, `dependencies`, `guide`, **`cbcExample`** (the customer-specific CBC framing), plus 48 tables,
49 t-codes, 44 common mistakes, 23 BAPIs, 5 Fiori apps.

**Rendered by.** `components/module-section.tsx:19,80` — `master-data` section of `/pm/[section]`.

**In NEO?** Partly. Content test: 20/93, concentrated in `data/academy/lessons/pm-generated.ts` (9) and
`data/domain-detail.ts` (2) — both NEO-reachable. So the prose exists inside academy lessons and domain
details; the **facet surface** and the `cbcExample` framing do not.

**Verdict. PARTIAL.**

---

### 7. `data/sap-notes.ts` — 21.5 KB · **MISSING** · **P1**

**Holds.** `SAP_NOTES`: **23 curated SAP-note solution paths** (108 search keywords, 70 resolution steps,
34 related-incident links). Slugs include `backflush-cogi-affw`, `production-version-mandatory-s4`,
`material-ledger-actual-costing-s4`, `matdoc-inventory-s4`, `cvi-bp-sync-note`, `queue-eoio-blocked-note`.
By design these carry **search keywords, never note numbers** — the never-guess rule.

**Rendered by.** 16 OLD routes: `/sap-notes`, `/sap-notes/[slug]`, `/notes-graph`, `/resolution/[slug]`,
`/solutions/[slug]`, `/transactions`, `/verification`, `/quality-audit`, `/knowledge`, `/architect`,
`/copilot`, `/evolution`, `/oic`, `/oic/[slug]`, `/process-explorer`, `/process-explorer/[slug]`.

**In NEO?** No. Import test: 0 (`SAP_NOTES` and `notesByModule` return nothing under `app/neo` /
`components/neo-shell`). Content test: **0/30**. The `notes` field in
`components/neo-shell/learn/incidents-data.ts:66` is a different field on `INCIDENTS`, not this dataset —
none of the 23 slugs or titles appears in the NEO corpus.

**Verdict. MISSING.** The single most cross-referenced orphan module: 16 OLD routes read it, zero NEO routes do.

---

### 8. `data/learn/paths.ts` — 21.4 KB · **MISSING** · **P1**

**Holds.** `LEARN_PATHS` (**19 paths**: pm-fundamentals, pm-planning, pm-execution, pm-preventive,
pm-troubleshooting, pm-ecc-s4, pp-pi, pp, pp-planning, pp-execution, pp-inventory, pp-troubleshooting,
pp-ecc-s4, qa-fundamentals …), `LEARN_AREAS` (4 areas / 19 paths), `LEARN_CATEGORIES` (4 / 19 tracks). Each
step carries an `Importance` rating.

**Rendered by.** `app/learn/page.tsx`, `app/learn/[module]/page.tsx` (19 pages), and the OLD home `app/page.tsx`.

**In NEO?** No. Import test: 0. Content test: **0/30**. `/neo/academy/` is a **different corpus** — 8 academy
books, 460 lessons from `data/academy/lessons/index.ts`. The two do not overlap.

**Verdict. MISSING.** The whole guided-learning-path layer, including its importance ratings, is gone.

---

### 9. `data/process-guides.ts` — 19.0 KB · **PARTIAL** · **P1**

**Holds.** `PROCESS_GUIDES`: **6 deep process guides** with 43 flow steps, 32 numbered steps, 48 tables,
37 t-codes, 25 common mistakes, 19 troubleshoot-flow steps, 21 debug paths, 18 exits, 15 Fiori apps.

**Rendered by.** `app/guides/page.tsx`, `app/guides/[slug]/page.tsx`, `app/knowledge/page.tsx`.

**In NEO?** Partly. Content test: 26/132, concentrated in `data/centers/blueprints.ts` (10) and
`data/domain-detail.ts` (7), both NEO-reachable. The blueprint centre covers some of the same process ground
at `/neo/centers/blueprints/` (5 items), but it is a smaller, differently-shaped dataset and it does not carry
the debug paths or the troubleshoot flows.

**Verdict. PARTIAL.**

---

### 10. `data/alm.ts` — 18.4 KB · **MISSING** · **P1**

**Holds.** `PLATFORMS` (3 ALM platforms — SolMan 7.2 / Cloud ALM / Focused Build — with 17 capabilities,
16 tools, 9 tips, 8 notes, 10 links), `LIFECYCLE` (6 ALM phases / 18 activities), `TRANSPORT_FLOW` (6),
`TRANSPORT_CONCEPTS` (6), `TRANSPORT_TCODES` (8), `CHANGE_TYPES` (4), `CHANGE_FLOW` (7), `TEST_CAPS` (5),
`MONITOR_TYPES` (6), `ALM_INTERVIEW` (8 Q&A), `ITSM_NOTE`, `PLATFORM_NOTE`.

**Rendered by.** `app/alm/page.tsx`.

**In NEO?** No. Import test: the only `ALM` hit under NEO is the string `ALM` inside
`app/neo/reference.css`. Content test: 1/30.

**Verdict. MISSING.** Transport management, change control and the ALM platform comparison have no NEO surface.

---

### 11. `data/process/process-data.ts` — 16.9 KB · **MISSING** · **P2**

**Holds.** `PROCESS` (PM + PP-PI process definitions) and `STEP_MFG` (**16 manufacturing steps**: pm-1…pm-8,
ppi-1…ppi-6 and more), each with interview questions.

**Rendered by.** `app/sap-infrastructure/page.tsx` (via `components/process-workspace.tsx`).

**In NEO?** No. Import test: 0. Content test: 1/30. `/neo/erd/` covers the ERD half of `/sap-infrastructure`
(15 modules / 220 tables / 232 relations, observed live) but carries no process workspace.

**Verdict. MISSING.**

---

### 12. `data/solutions.ts` — 15.2 KB · **MISSING** · **P1**

**Holds.** `SOLUTIONS`: **17 business-problem → solution entries** with 140 search keywords, 67 ECC t-codes,
33 Fiori apps, 69 tables, 14 CDS views, 41 APIs/BAPIs, 22 exits, 46 linked incidents, and a `Complexity` rating.

**Rendered by.** `/solutions`, `/solutions/[slug]`, `/knowledge`, `/architect`, `/copilot`, `/quality-audit`,
`/verification`.

**In NEO?** No, not as a surface. Import test: 0. Content test: 36/87 — the highest rate of any orphan module —
but the hits are dispersed across `data/tx-intel.ts` (5), `data/centers/fiori.ts` (4),
`data/centers/migration.ts` (3), `data/troubleshooting-ext2.ts` (3) and six more. That pattern is *identifier*
overlap (the same t-codes, tables and BAPI names appear everywhere), not the solution records. **This is
explicitly not enough to call DUPLICATE**: no NEO file contains a solution entry.

**Verdict. MISSING.** The "I have this business problem, what do I use?" entry point has no NEO equivalent.

---

### 13. `data/migration-cockpit.ts` — 14.9 KB · **MISSING** · **P0**

**Holds.** `MIG_OBJECTS` (**24 migration objects** with `keys`, 27 `dependsOn` edges, **56 ECC source tables**,
`risk` and a `trust` flag), `APPROACHES` (5 load approaches), `MIG_ERRORS` (8 named migration errors with
symptom/cause/fix), `QUALITY_DIMS` (6), `READINESS` (7 weighted gates), `MIG_CHECKLIST` (10 steps),
`MIG_LOAD_LAYERS` (4), `MIG_META`.

**Rendered by.** `app/migration-cockpit/page.tsx` (via `components/migration-cockpit.tsx`), `app/graph`,
`app/object/[name]`, `app/s4-readiness`, plus the global command palette (`components/command-palette.tsx:10`)
and three lib consumers (`lib/knowledge-graph-global.ts`, `lib/s4-readiness.ts`, `lib/object-graph.ts`).

**In NEO?** No. Import test: 0 (`MIG_OBJECTS` grep empty). Content test: 1/30. The command palette that used to
surface it is not rendered on NEO — `components/app-shell.tsx:80` short-circuits the whole OLD chrome when the
path is `/neo` or starts with `/neo/`.

**Verdict. MISSING. P0.** This is validated ECC→S/4 migration scope data with declared trust levels and it is
unreachable anywhere in NEO.

---

### 14. `data/authorizations.ts` — 13.4 KB · **MISSING** · **P1**

**Holds.** `AUTH_ITEMS`: **15 authorization objects/concepts** with `purpose`, `detail`, **32 failure modes**,
**44 troubleshooting steps**, a PM example, a PP example, and ECC vs S/4 behaviour.

**Rendered by.** `app/security/[slug]/page.tsx` (15 generated pages) and read for cross-links by
`/object/[name]`, `/tcode/[code]`, `/cds/[view]`, `/idoc/[name]`, `/process/[slug]`, `/knowledge/coverage`.

**In NEO?** No. Import test: 0. Content test: **0/30**.

**Verdict. MISSING.** Distinct from the migrated `data/centers/process-auth.ts` (6 items) — different slugs,
different shape, different subject (process authorization vs authorization-object mechanics).

---

### 15. `data/fiori.ts` — 13.4 KB · **PARTIAL** · **P1**

**Holds.** The Fiori/UX **architecture** layer: `FIORI_ARCH` (6 layers), `APP_TYPES` (3 with 9 tech notes),
`ODATA_PARTS` (6), `ODATA_TCODES` (7), `ODATA_VERSIONS`, `UI5_PARTS` (6), `UI5_NOTE`, `RAP_PARTS` (5),
`RAP_NOTE`, `FIORI_INCIDENTS` (6 with 15 diagnostic t-codes), `FIORI_DEBUG` (6 steps),
`FIORI_EVOLUTION` (6 ECC→S/4 rows), `FIORI_INTERVIEW` (8 Q&A), `CROSS_LINKS` (6).

**Rendered by.** `app/fiori/page.tsx` — the index of the Fiori & UX Center.

**In NEO?** Partly. `/neo/centers/fiori/` migrated the **12 process items** from `data/centers/fiori.ts` — a
different module. Content test on this file: 1/30. `/neo/fiori-apps/` covers the 20 documented apps. The
architecture layer (OData, UI5, RAP, launchpad debugging) is in neither.

**Verdict. PARTIAL.** Apps yes, architecture no.

---

### 16. `data/project-delivery.ts` — 13.3 KB · **MISSING** · **P1**

**Holds.** `PHASES`: **6 SAP Activate phases** with 26 objectives, 28 deliverables, 27 roles, 15 meeting types,
23 templates, 12 risks, 12 common mistakes, 13 links. Plus `TEST_LEVELS` (6 with entry/exit criteria),
`TEST_TOOLS` (4), `DEFECT_SEVERITY` (4 with SLAs), `DEFECT_FLOW` (5), `WORKSHOP_TYPES` (5),
`WORKSHOP_PREP` (5), `BLUEPRINT` (5 items).

**Rendered by.** `app/delivery/page.tsx`.

**In NEO?** No. Import test: 0 (`PHASES` grep empty). Content test: **0/30**.

**Verdict. MISSING.** The entire SAP Activate delivery methodology surface.

---

### 17. `data/kind-intel.ts` — 13.2 KB · **PARTIAL** · **P3**

**Holds.** `KIND_INTEL`: **7 object-kind templates** (table, tcode, bapi, fm, idoc, cds, auth), each with
`kindHe`, `what`, `why`, `who`, `when`, `lifecycle`, `troubleshooting[]`, `interview[]`, `eccS4`, and PM/PP
framing sentences. The header states these are *true general statements about a class of object, not
fabricated per-entity facts*; `lib/object-profile.ts` merges them with curated per-entity content and marks
each dimension verified-vs-general.

**Rendered by.** `/object/[name]`, `/tcode/[code]`, `/cds/[view]`, `/idoc/[name]`, `/process/[slug]`,
`/security/[slug]`.

**In NEO?** Not as a module. Import test: 0. But the NEO detail views write per-entity equivalents of the same
dimensions — `/neo/transactions/MB1A/` renders "מה הטרנזקציה עושה / מטרה עסקית / מיקום בתהליך / מתי להשתמש /
מתי לא / מה קורה טכנית / מי משתמש" from `TX_INTEL`, which is richer than the kind template. That holds for
tcode, bapi, cds, idoc and table. It does **not** hold for the `auth` kind, whose only consumer
(`/security/[slug]`) has no NEO route at all.

**Verdict. PARTIAL** (5 of 7 kinds genuinely superseded; `auth` and `fm` are not). Deliberately not marked
INTENTIONALLY REPLACED because the `auth` gap is real.

---

### 18. `data/ecc-s4.ts` — 12.9 KB · **MISSING** · **P1**

**Holds.** `ECC_S4_TOPICS`: **18 ECC↔S/4 topics**, each with `status` (Unchanged / Changed / Replaced /
Deprecated), `ecc`, `s4`, `fioriCds`, `simplification`, `impact`, `note`; plus `STATUS_HE` / `STATUS_COLOR`.

**Rendered by.** `/ecc-s4`, `/ecc-s4/[slug]` (18 pages), `/knowledge`, `/knowledge/coverage`, `/graph`,
`/object/[name]`, `/s4-readiness`, `/s4hana`.

**In NEO?** No. Import test: 0. Content test: 2/30. NEO has a **per-table** S/4 verdict via `lib/s4.ts` +
`data/s4-impact.ts` — but `S4_IMPACT` holds only **11 tables** (MATDOC, MSEG, MKPF, ACDOCA, BSEG, BKPF, KNA1,
LFA1, NAST, MARA, MCH1) and `S4_STABLE` is empty. That is not the topic-level simplification map.

**Verdict. MISSING.**

---

### 19. `data/s4-objects.ts` — 12.6 KB · **MISSING** · **P1**

**Holds.** `S4_OBJECTS`: **29 S/4HANA objects** with `kind`, `status` (stays / changed / replaced / removed),
`risk`, `release`, `ecc`, `s4`, `why`, 13 `replaces` entries, 57 module tags, 52 related objects, 4 ABAP notes,
a 20-item checklist, and `S4STATUS_META`.

**Rendered by.** `/s4hana`, `/graph`, `/object/[name]`, `/s4-readiness`.

**In NEO?** No. Import test: 0. Content test: **0/30**.

**Verdict. MISSING. Contributes to P0** on `/s4hana` and `/s4-readiness`.

---

### 20. `data/qa-center.ts` — 10.4 KB · **MISSING** · **P1**

**Holds.** `QA_PACKS`: **10 QA test packs** with 43 t-codes, 41 tables and **55 test scenarios**
(`QaScenario`), grouped by module and area.

**Rendered by.** `/qa-testing`, `/qa-testing/[slug]` (10 pages), `/knowledge`.

**In NEO?** No. Import test: 0. Content test: 1/30.

**Verdict. MISSING.** No test-scenario surface exists in NEO.

---

### 21. `data/mrp-center.ts` — 9.9 KB · **MISSING** · **P1**

**Holds.** `MRP_SECTIONS` (**9 sections** with 36 teaching points, 23 tables, 23 t-codes),
`PLANNING_STRATEGIES` (**6** with `reqType` and `consumption`), `MRP_TCODES` (12).

**Rendered by.** `app/mrp/page.tsx`.

**In NEO?** No. Import test: 0. Content test: 3/58 — hits in `data/domain-detail.ts` (3),
`data/library/mm-textbook/ch06.ts` (1), `data/cds-map.ts` (1).

**Verdict. MISSING.** MRP planning strategies (requirement types + consumption modes) are core PP knowledge
and have no NEO surface.

---

### 22. `data/knowledge/interview.ts` — 9.8 KB · **MISSING** · **P2**

**Holds.** `INTERVIEW`: interview Q&A keyed to **21 SAP objects** (IFLOT, EQUI, QMEL, AUFK, AFKO, AFRU, JEST,
MARA, MKAL, MCH1, PLPO, RESB, MSEG, PA0001, PA0008, HRP1001, PCL2, ADSO, RSTRAN, CDS_AnalyticalView,
RSPCCHAIN) at ~3 levels each — **~62 Q&A entries**, including HR and BW objects.

**Rendered by.** `/object/[name]`, `/learn/[module]`, `/graph`, `/sap-infrastructure`.

**In NEO?** No. Import test: 0. Content test: 1/30.

**Verdict. MISSING.**

---

### 23. `data/pppi-process-flow.ts` — 9.4 KB · **PARTIAL** · **P2**

**Holds.** `PPPI_PROCESS_FLOW`: **3 process phases / 12 steps** for PP-PI.

**Rendered by.** `components/module-section.tsx:24,141` — the `business-process` section of `/pp-pi/[section]`.

**In NEO?** Partly, from a different source. `/neo/pp-pi/` renders a section titled
"איך עובדים במודול בפועל" built by `components/neo-shell/workspace/workspace-data.ts` from
`lib/module-portal` `processSteps()` — the generated blueprint's process steps, not this curated flow.
Content test: 1/30.

**Verdict. PARTIAL.** A process narrative exists; this specific 3-phase / 12-step curation does not.

---

### 24. `data/lifecycle.ts` — 9.1 KB · **PARTIAL** · **P1**

**Holds.** `LIFECYCLE`: **36 transaction codes** with a structured lifecycle verdict — `status`
(**17 Obsolete, 5 Deprecated, 14 Active**), `ecc`/`s4` booleans, Fiori replacement app, recommended
alternative t-code, Simplification Item, migration note and `impact` (None/Low/Medium/High). Plus `LC_COLOR`,
`LC_HE`, `IMPACT_HE`.

**Rendered by.** `/evolution` (the Transaction Evolution Center), `/apps`, `/apps/[code]`, `/architect`,
`/bapi/[name]`, `/copilot`, `/knowledge`, `/object/[name]`, `/library/academy/fiori` — via `lib/apps-intel.ts:7`.

**In NEO?** Partly, and with a **content conflict**. 30 of the 36 codes exist in `data/tx-intel.ts`, which
NEO's `/neo/transactions/[code]/` renders including free-text `s4` and `s4Delta`. 6 do not: **ME21, ME22,
ME23, BP, ENPR, NACE**. Of the 22 non-Active codes, **ENPR and NACE have no NEO transaction page at all**
(not in `registryCodes()`).

Verified live on the dev server: `/neo/transactions/MB1A/` says *"זמינה אך מסומנת כ-legacy; SAP ממליצה MIGO"*
(available, marked legacy), while `data/lifecycle.ts` records MB1A as `status: "Obsolete", s4: false,
impact: "High"` with the migration note *"הוסר ב-S/4HANA"* (removed in S/4HANA). **The two sources disagree**
and NEO renders only the softer one.

**Verdict. PARTIAL.** The structured status/impact classification is lost, 2 codes have no page, and one
verified claim contradicts the other source. Worth a data-owner decision, not a silent drop.

---

### 25. `data/processes.ts` — 8.1 KB · **MISSING** · **P1**

**Holds.** `PROCESS_MAPS`: **5 end-to-end process maps / 25 steps**, with domain and summary.

**Rendered by.** `/process-explorer`, `/process-explorer/[slug]` (5 pages), `/architect`, `/knowledge`,
`/quality-audit`.

**In NEO?** No. Import test: 0. Content test: 18/47, scattered across `data/troubleshooting-ext3.ts` (4),
`data/tx-intel.ts` (4), `data/domain-detail.ts` (2) — identifier overlap again, not the maps.

**Verdict. MISSING.**

---

### 26. `data/workbenches.ts` — 8.0 KB · **MISSING** · **P1**

**Holds.** `WORKBENCHES`: **4 consultant workbenches** with 24 concepts, 19 architecture blocks, 23 process-flow
steps, 41 tables, **111 transactions**, 13 function modules, 13 BAdIs, 14 user exits, 24 incidents, 23 debug
entry points, 14 ECC→S/4 deltas and 12 scenarios.

**Rendered by.** `/workbench` (index), `/workbench/[slug]` (4 pages), `/knowledge`.

**In NEO?** No. Import test: 0. Content test: 2/30.

**Verdict. MISSING.** Together with #3 that is **7 workbenches / 202 transactions / 43 incidents** with no NEO home.

---

### 27. `data/s4-transformation.ts` — 8.0 KB · **MISSING** · **P1**

**Holds.** `CUSTOM_CODE` (9 rows ECC→S/4 with risk), `CUSTOM_CODE_NOTE` (the mandatory-tooling statement:
Readiness Check, Simplification Item Check, ATC), `INTEGRATION` (6), `TESTING` (8), `CUTOVER`
(3 phases / 13 items), `LESSONS` (6 with risk), `EXEC_NARRATIVE`.

**Rendered by.** `/s4hana`, `/delivery`.

**In NEO?** No. Import test: 0. Content test: **0/30**.

**Verdict. MISSING. Contributes to P0** on `/s4hana`.

---

### 28. `data/domain-model.ts` — 7.6 KB · **MISSING** · **P1**

**Holds.** `MFG_AREAS`: **7 cross-module manufacturing areas** spanning 16 module tags, with 35 flow steps,
22 objects, 14 processes and 14 incidents; plus `MODULE_COLOR` (PP, PP-PI, QM, PM, MM).

**Rendered by.** `app/domain-model/page.tsx`.

**In NEO?** No. Import test: 0. Content test: 2/30, both in `data/centers/manufacturing.ts` — a different
dataset (6 scenarios / 36 sections) already migrated to `/neo/centers/manufacturing/`.

The rail item labelled "מודל נתונים" points at `/neo/erd/` (`components/neo-shell/nav-data.ts:126`), which is a
**table-level** ER model built from `components/neo-shell/erd/model.ts` — 15 modules / 220 tables / 232
relations, verified live. That is a different object: a data model, not a cross-module business-area map.

**Verdict. MISSING.**

---

### 29. `data/s4-architecture.ts` — 6.3 KB · **MISSING** · **P1**

**Holds.** `ARCH`: **8 architecture components** by layer, each with ECC state, S/4 state, `status`
(Replaced / Enhanced / New / Stays), risk, what stays, what is gone, and 10 links. Plus `ARCH_STATUS`.

**Rendered by.** `app/s4hana/page.tsx`.

**In NEO?** No. Import test: 0. Content test: 1/30.

**Verdict. MISSING. Contributes to P0** on `/s4hana`.

---

### 30. `data/story/pm-maintenance.ts` — 5.8 KB · **MISSING** · **P2**

**Holds.** `PM_MAINTENANCE`: one guided tour, **8 steps**, with `learnPath`, module and accent.

**Rendered by.** `/story`, `/story/[process]`.

**In NEO?** No. Import test: 0 (`STORIES` grep empty). Content test: 1/30.

**Verdict. MISSING.**

---

### 31. `data/story/pppi-process-order.ts` — 5.7 KB · **MISSING** · **P2**

**Holds.** `PPPI_PROCESS_ORDER`: one guided tour, **8 steps**; plus `STORIES`, the 2-entry index that
`/story/[process]` generates from.

**Rendered by.** `/story`, `/story/[process]`.

**In NEO?** No. Import test: 0. Content test: 1/30.

**Verdict. MISSING.** The guided-tour teaching mode (walk a process step by step, then hand off to a learning
path) does not exist anywhere in NEO.

---

### 32. `data/story/types.ts` — 1.0 KB · **INTENTIONALLY REPLACED** · **P3**

**Holds.** `StoryStep` and `Story` interfaces. **0 records.**

**Rendered by.** Nothing directly — it is the type contract for #30 and #31.

**In NEO?** N/A. A type-only module carries no SAP content; it becomes reachable again the moment the two
story datasets do.

**Verdict.** Type-only. Not a content loss in itself.

---

## 3 · Three modules outside the stated 32, found by the same pass

The reachability pass also flags three `data/library/*` modules that are **not** book-pipeline source and
therefore **not** covered by the proven false positive:

| Module | Holds | OLD route | NEO | Verdict |
|---|---|---|---|---|
| `data/library/pp-knowledge.ts` | `PP_CHAPTERS` (15), `PP_EXEC_HE`, `PP_GLOSSARY`, `PP_STATS` | `/library/pp/[slug]`, `/library/pp-quality-report` | not imported | **PARTIAL** — chapters are redirect stubs, but the glossary and exec summary have no NEO home. P3 |
| `data/library/pp-objects.json` | PP SAP-object index | `/library/pp/object/[code]` | not imported | **MISSING** — P2 |
| `data/library/pp-quality.ts` | PP enrichment quality report | `/library/pp-quality-report` | not imported | **MISSING** — internal QA surface. P3 |

## 4 · What was NOT found

- **No DUPLICATE.** Every content probe that scored above 25% resolved to identifier overlap (shared t-code,
  table and BAPI names) spread across four or more unrelated NEO files — never a single file holding the
  orphan's records. `data/solutions.ts` (36/87) and `data/processes.ts` (18/47) are the two closest calls and
  both fail the "cite the file that holds it" test.
- **No orphan module is stale.** Every one of the 32 is imported by at least one live OLD route that the dev
  server serves today.
