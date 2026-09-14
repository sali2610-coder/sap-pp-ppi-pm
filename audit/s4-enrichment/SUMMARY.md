# S/4HANA knowledge deepening · checkpoint report (2026-09-14)

Branch `design/neo-correction-pass` · preview only · `main` and production untouched.

## What exists now (foundation, all committed)
- **Evidence model** (`lib/evidence/`): `Evidence` (source type, title, official URL or repoRef, product, edition, release, access date, claim, verification level, conflicting evidence), `VerificationRecord` keyed by canonical id, `S4StatusClaim` with edition/release/source/recommended action/successor. Verification levels: `sap_official_verified · repository_verified · supported_secondary_source · verification_required · conflicting_sources · legacy_context_only`.
- **Unified S/4HANA status model** (14 tokens) with a tested mapping from every legacy vocabulary in the repo (blueprint verdicts, lifecycle, s4-objects, ecc-s4, tx dispositions, bapi-registry, fiori trust, cds enrichment, EccS4 blocks, verified-objects, cockpit trust). The validated blueprint vocabulary (ללא שינוי / מותאם / הוחלף / הוסר / לא הוכרע במקור) is untouched; overlay claims sit beside it.
- **Depth scoring L0–L5** per catalog, **coverage report** (`npm run report:coverage`), **14 schema rules + xref gates** in `npm test` (no source, status without edition/release, replacement without successor, Fiori without official id/URL, CDS without release context, FM released without official source, dangling xref, duplicate id, bad id syntax, placeholder, certainty language, URL domain allowlist, SAP Note format, alias collision).
- **Overlay data layer** `data/verification/*.ts` (generated `data/sapData.*` never edited) and **evidence block** on every detail page (tables, objects, transactions, BAPI/FM, IDoc, CDS, Fiori, enhancements) + a new **Best Practices** section (`/neo/best-practices/`).
- **Research pipeline** `scripts/workflows/enrich-family.js`: researcher (official SAP Help search JSON, api.sap.com, Fiori library, official PDFs) → adversarial auditor (every URL and snippet re-checked, default refute) → single writer (gates). Official lookup tool: `scripts/sap-help-search.mjs`.

## Records verified against official SAP sources (Tier 1)
| Catalog | Records written | Refuted → queue | Notable findings |
|---|---|---|---|
| Tables | 28 (2 batches) | AFVC | 10/11 undecided blueprint verdicts resolved; MARA `changed` (extended material number); BUT000 `simplified` (Business Partner/CVI); MSEG `replaced` (MATDOC) |
| Transactions | 32 (2 batches) | none | all 12 lifecycle conflicts (MB*/ME*) resolved from the Simplification List 2023 FPS03 item 27.6 (replaced → MIGO / BAPI_GOODSMVT_CREATE); MD01 from item 9.5.2 MRP in HANA; IW/IP/IE/IL/COR/CO/C201 verified in 2025 FPS01 docs |
| BAPI / FM / API | 12 | none | BAPI_ALM_ORDER_MAINTAIN → `released_api_available` (Maintenance Order OData API pages); 10 FMs honestly `verification_required` |
| IDocs | 4 | none | MATMAS/LOIPRO + basic types MATMAS05/LOIPRO01 (DMC integration guide PDF read) |
| CDS Views | 13 | none | I_MaterialDocumentItem **deprecated 2021** (successor named); I_MaintenancePlan → I_MaintenancePlanBasic (queued: successor not a catalog row); 3 views only on Public Cloud pages |
| Fiori apps | 19 | F3289 | **8 curated id/title bindings are wrong** (F2731, F2730, F2730A, F4072, F3577, F3364, F1576, F0843) → `conflicting_sources` with both sources kept; Confirm Jobs W0020 deprecated 2022 / deleted 2023 |
| Enhancements | 14 | none | 10 PM customer exits + 4 BAdIs cited to SAP Library / 2025 pages; CONFPM01 and IEQM0001 repository descriptions disagree with SAP definitions (recorded) |
| **Total** | **122 records** | **2** | 14 `conflicting_sources`, 11 edition-specific (Public Cloud) claims, 0 invented facts (auditor-enforced) |

## Coverage (measured, `report:coverage`, 2026-09-14)
```
catalog          total   L0   L1   L2   L3   L4   L5  verified  verif.req  conflict  legacy  s4-appl  edition
tables             105    0   75    0   13    0   17       105          0         0       0      104        0
transactions      1817    0 1275    0  514    0   28       554       1262         1       0      555        3
functions          145    0    2   48   93    1    1       107         38         0       0       79        0
idocs                2    0    0    0    0    0    2         2          0         0       0        2        0
cds                 39    0    0    3   26    1    9        39          0         0       0       36        5
fiori               20    0    0    2    7    0   11        12          0         8       0       18        2
enhancements        42    0    0    4   34    2    2        31          6         5       0       38        1
objects              1    0    0    1    0    0    0         1          0         0       0        0        0
best-practices       2    0    0    2    0    0    0         2          0         0       0        0        0
TOTAL             2173    0 1352   60  687    4   70       853       1306        14       0      832       11
```
Baseline before this phase: L5 **0**, L4 4, verified 839, verification_required 1,334, conflicts 0. Now: L5 **70**, verified 853, verification_required 1,306, conflicts 14 (recorded, not hidden). The 1,275 L1 transactions are the tx-registry codes with no authored intel — they are counted, not hidden.

## Gates (final build 2026-09-14)
tsc 0 · tsc (tests) 0 · eslint 0 errors · `npm test` 201/201 · build 7,803 pages · route manifest in sync · dead links 0 · sitemap 4,507 URLs, 0 dead · browser sweep **54/54** (18 detail routes × desktop light/dark × phone: 0 console errors, 0 overflow, evidence block on every catalog page) · `data/ai-tree` drift 0.

## Honest scope statement
Verified scope = the 122 overlay records above. Everything else on the site still renders its **derived** status (labelled as derived, with the repository tier) or `נדרש אימות נוסף`. Not yet done from the brief: batch 3+ of every catalog (tables 77 remaining, CDS 26, functions 133, fiori index 1,450 thin entries, enhancements 28), `obj:` business-object registry, Best Practices process catalog beyond the 2 seeds, knowledge/incidents/academy cross-references, AI knowledge integration. The research queues (`research-queue-*.md`) carry every refuted record and every source conflict.

## Limits that shaped the evidence
- help.sap.com topic bodies, fal.cloud.sap and api.sap.com pages are JavaScript shells: claims are bounded to the official search record's title/snippet or to PDFs actually read (Simplification Lists 2023/2025, What's New PDFs, DMC integration guide). Auditors refuted every body-text claim.
- `sc4sap` MCP (live ABAP) never connected; interface parameters that only a live system could confirm stay `verification_required`.
- Session/credit limits interrupted runs repeatedly; every pipeline was resumed from its journal cache, and nothing was written without its auditor verdict.
