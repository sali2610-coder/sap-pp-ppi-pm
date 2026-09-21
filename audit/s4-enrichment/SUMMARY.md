# S/4HANA knowledge deepening · checkpoint report (2026-09-21, final pass of this session)

Branch `design/neo-correction-pass` · preview only · `main` and production untouched.

## What exists now (foundation, all committed)
- **Evidence model** (`lib/evidence/`): `Evidence` (source type, title, official URL or repoRef, product, edition, release, access date, claim, verification level, conflicting evidence), `VerificationRecord` keyed by canonical id, `S4StatusClaim` with edition/release/source/recommended action/successor. Verification levels: `sap_official_verified · repository_verified · supported_secondary_source · verification_required · conflicting_sources · legacy_context_only`.
- **Unified S/4HANA status model** (14 tokens) with a tested mapping from every legacy vocabulary in the repo. The validated blueprint vocabulary is untouched; overlay claims sit beside it.
- **Depth scoring L0–L5** per catalog, **coverage report** (`npm run report:coverage`), **14 schema rules + xref gates** in `npm test`.
- **Overlay data layer** `data/verification/*.ts` (generated `data/sapData.*` never edited) and an **evidence block** on every detail page, plus the **Best Practices** section (`/neo/best-practices/`).
- **Research pipeline** `scripts/workflows/enrich-family.js`: researcher → adversarial auditor (default refute) → single writer. Official lookup tool: `scripts/sap-help-search.mjs`.

## Records verified against official SAP sources
| Catalog | Overlay records | State | Notable findings |
|---|---|---|---|
| Tables | **105 — catalog closed** | every table the cockpit renders carries a sourced record | MKPF and COSP `replaced` (MATDOC, ACDOCA); MSEG, MARA, BUT000 from batches 1–2; PLZU, FHMI, AFWI, KAZT, CRVD_A, T352, T003O, TC22, TC60, TCA01, TCK03, TCO01, T370T, T134T honestly `verification_required`; T352B `conflicting_sources` |
| Transactions | 32 | batches 1–2 | all 12 lifecycle conflicts resolved from Simplification List 2023 FPS03 item 27.6; MD01 from item 9.5.2 |
| BAPI / FM / API | 42 | batches 1–4 | equipment, functional-location, order, process-order and batch BAPIs `released_api_available` with official OData successors; the two measurement BAPIs `conflicting_sources` because our function names are contradicted by SAP; 7 FMs honestly `verification_required` |
| IDocs | 6 | complete for the registry | MATMAS/LOIPRO + basic types, DMC integration guide read |
| CDS Views | **37 — catalog closed** | all 39 curated views have a record or a queue entry | I_MaterialDocumentItem deprecated 2021; 4 views honestly `verification_required` because no official record names them |
| Fiori apps | 19 | batch 1 | 8 curated id/title bindings recorded as `conflicting_sources` |
| Enhancements | 38 | batches 1–4, 38 of 40 reachable rows | the 8 platform techniques written from the Enhancement Framework documentation; the classic BAdI concept `replaced` by the kernel-based BAdI on SAP's own wording; two MRP BAdIs `simplified`; M61X0001 `simplified`; SAPLV01Z exposed as a function group, not an SMOD enhancement |
| Objects | 2 | foundation | registry seed |
| **Total** | **281 records** | | 25 recorded `conflicting_sources`, 20 edition-specific claims, 0 invented facts (auditor-enforced) |

## Coverage (measured, `report:coverage`, 2026-09-21)
```
catalog          total   L0   L1   L2   L3   L4   L5  verified  verif.req  conflict  legacy  s4-appl  edition
tables             105    0   75    1    1    0   28       103          0         2       0       89        1
transactions      1817    0 1275    0  514    0   28       554       1262         1       0      555        3
functions          145    0    2   52   71    1   19       112         31         2       0       77        0
idocs                2    0    0    0    0    0    2         2          0         0       0        2        0
cds                 39    0    0    9    5    2   23        37          2         0       0       30       13
fiori               20    0    0    2    7    0   11        12          0         8       0       18        2
enhancements        42    0    0   10   16    3   13        30          0        12       0       32        1
objects              1    0    0    1    0    0    0         1          0         0       0        0        0
best-practices       2    0    0    2    0    0    0         2          0         0       0        0        0
TOTAL             2173    0 1352   77  614    6  124       853       1295        25       0      803       20
```
Baseline before this phase: L5 **0**, L4 4, verified 839, verification_required 1,334, conflicts 0. Now L5 **124**, conflicts 25 (recorded, not hidden).

Three counters moved **down** on purpose. `verified` and `s4-applicable` fall whenever an authored `verification_required` replaces a verdict the blueprint derived but no source supports. That is the correction working, not a regression.

## Gates (full regression, 2026-09-21)
tsc 0 · tsc (tests) 0 · eslint 0 errors (405 accepted warnings) · `npm test` **201/201** · build **7,803 pages** · route manifest in sync (`/cds/` 39, `/apps/` 539, `/impact/` 105) · dead internal links **0 of 7,805 pages** · sitemap 4,507 URLs covering all 4,507 indexable pages, 0 dead · browser sweep **54/54** (18 detail routes × desktop light/dark × phone: 0 console errors, 0 horizontal overflow, evidence block on every catalog page) · `data/ai-tree` drift **0**. The whole stack was re-run twice, once mid-session and once on the final state.

Spot-checked in the built export, in both themes, with screenshots: KAZT and the measuring-point BAPI render «נדרש אימות נוסף»; T352B and the measuring-point BAPI render «מקורות סותרים»; MKPF and COSP render «הוחלף ב-S/4HANA»; the classic BAdI technique renders «הוחלף ב-S/4HANA»; the batch-creation BAPI renders «קיים API משוחרר» at depth L5. COSP's successor links to a real page; MKPF's successor is a registry entry with no page, so it renders as a chip rather than a dead link.

## Honest scope statement
Verified scope = the 281 overlay records above. Everything else still renders its **derived** status (labelled as derived, with the repository tier) or «נדרש אימות נוסף». Closed: the tables and CDS catalogs. Open from the brief: transactions beyond the 32 authored codes (1,275 registry codes carry no authored intel), functions (94 remain), the Fiori thin index (1,450 entries), enhancements (2 refused ids remain, plus 2 rows that can never take a valid id), the `obj:` business-object registry, the Best Practices process catalog beyond its 2 seeds, knowledge/incidents/academy cross-references, Books cross-references, and AI knowledge integration. Every refused record and every source conflict is in `research-queue-*.md`.

## Known corrections queued, not applied
Each of these changes a file outside the overlay layer, so it needs its own audited change rather than riding along inside an enrichment batch:
- `tx:IP30` claims no Simplification Item names IP30 and that RISTRA20 is unsourced. Item 4.1.2 of the 2025 list names both.
- `fm:NOTIF_TASK_READ` conflates the notification activities table with the notification tasks table.
- `data/table-tcodes.json` maps the quality-notification creation code to the inspection-setup table, which is not an inspection-setup path.
- `table:TJ30T` reads a shared snippet by label; the column-order reading measured correct.
- `data/function-intel.ts` carries five keys that are not function modules (two IDoc message types already covered as IDoc records, two further IDoc or process concepts, and one whose name contains a space and so cannot take a canonical id). The functions catalog total is inflated by five.
- `data/exits.ts` carries two rows whose names can never form a valid id: one contains a slash, one a space. Neither is an enhancement. They are the transaction pair that manages customer exits, and a technique now covered by its own record. They cap the enhancements catalog at 40 reachable rows out of a counted 42.
- A data bug in the PP-PI dataset makes one process-order BAPI page link routing transactions instead of the process order display transaction, and one confirmation BAPI carries a transaction code that does not exist. Two service names in the repository disagree with the official ones.

## Limits that shaped the evidence
- help.sap.com topic bodies, fal.cloud.sap and api.sap.com pages are JavaScript shells: claims are bounded to the official search record's title/snippet or to PDFs actually read. A non-existent page identifier also returns HTTP 200 on help.sap.com, so a 200 is never treated as proof a topic exists; the re-run search record is.
- The live ABAP connection never worked, so interface parameters only a running system could confirm stay `verification_required`.
- Session, weekly and credit limits interrupted runs repeatedly. Every pipeline resumed from its journal cache, and nothing was written without its auditor verdict.
