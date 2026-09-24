# Master completion · progress checkpoint

Branch `design/neo-correction-pass`. Started at HEAD `3e4e8f7a` (last product commit `73a4fbfe`).
`main` and production untouched. Books baseline `ZERO_CONTENT_LOSS 574/574` at start.

This file is the resume point. Every count below is regenerated, never typed:

```
IDS_OUT=scratchpad/coverage-ids.json npm run report:coverage -- --ids
node scripts/qa/gen-master-queue.mjs          # -> QUEUE.json
node scripts/qa/simpl-tcode-index.mjs         # -> simpl-tcode-index.json
node scratchpad/books-hash-check.mjs          # -> ZERO_CONTENT_LOSS n/574
```

## Measured starting point (from the data, 2026-09-22)

| catalog | universe | authored records | without a record | L5 | verification_required | conflicts |
|---|---|---|---|---|---|---|
| tables | 105 | 105 | 0 | 28 | 0 | 2 |
| transactions | 1,818 | 33 | 1,785 | 29 | 1,262 | 1 |
| functions | 142 | 62 | 80 | 30 | 31 | 8 |
| idocs | 3 | 3 | 0 | 3 | 0 | 0 |
| cds | 39 | 37 | 2 | 23 | 2 | 0 |
| fiori (curated) | 20 | 19 | 1 | 11 | 0 | 7 |
| enhancements | 40 | 38 | 2 | 13 | 0 | 12 |
| objects | 6 | 6 | 0 | 0 | 0 | 0 |
| best practices | 17 | 17 | 0 | 0 | 0 | 0 |

Records outside any counted universe: `fm:PPCC1` (a blueprint concept, excluded from the
functions count on purpose), `idoc:basic:MATMAS05`, `idoc:basic:LOIPRO01` (basic types, a
registry of their own). That is why the IDoc family shows 3 message types but 5 records here,
and the overlay file 7 ids including its registry entries.

## Transactions triage against the official lists

`scripts/qa/simpl-tcode-index.mjs` indexes which codes each Simplification Item names, in the
2025 FPS01 list (document version 1.36) and the 2023 FPS03 list (document version 1.35).
Validated against every hand-audited record: IP30 and IP30H resolve to 4.1.2 and 29.6, MB01
and MB1C to 15.3.9 and 27.6, MD01 to 9.5.2, ME21 to 14.2.8, exactly as those records cite.

Of the 1,785 codes without an authored record: **364 are named** by at least one item, **1,421
are named by neither list**. A mention is a lead with an official citation, not a verdict, so
it is not stamped onto the records as official evidence (that would lift a record's pill to
"verified" while its S/4HANA status is still unread). The 364 are the research queue; the
1,421 carry a documented negative search in `simpl-tcode-index.json`.

## Tables and functions against the official lists

The same index, run over the other two families (`FAMILY=tables|functions`):

| family | universe | named by an item | named by neither |
|---|---|---|---|
| tables | 105 | 23 | 82 |
| functions | 142 | 11 | 131 |

It reproduces the known table verdicts (MKPF in 27.5 "DATA MODEL IN INVENTORY MANAGEMENT",
COSP in the FIN data-model item). Of the 16 tables the mandate names for a depth check, 15
appear in neither list (PLZU, FHMI, AFWI, KAZT, CRVD_A, T003O, T352, TC22, TC60, TCA01, TCK03,
TCO01, T370T, T134T, T352B); T438M appears only in two unrelated items. For a customizing or
text table, absence from every item is consistent with an unchanged table but is not proof,
so these stay `verification_required` with this search on record.

Why 75 tables are L1: depth L2 needs at least five fields carrying a data type and a length
(`lib/evidence/depth.ts`, STRUCTURAL_MIN.tables = 5), and the PM and PP-PI blueprints publish
no data types for these customizing tables. The project rule forbids inventing them. What
closes it is SE11 on a live system, or an official DDIC field list, neither of which is public
for these tables.

## Honest sizing

Measured cost of the research pipeline: about 2 million subagent tokens and 50 to 70 minutes for
four records. At that rate 80 functions is about 20 batches, and a researched record for every
one of 1,785 transactions is not achievable in any single session. The plan therefore works in
priority order and checkpoints after every batch, so an interruption loses nothing.

## Order of work

1. Reports: recompute and correct every stale counter (§9 of the mandate).
2. Small closures: the two cross-reference gaps, the two CDS views, F3289, the two
   non-canonical enhancement rows.
3. Functions: batch 10 first, then the remaining 76 in priority order.
4. Transactions: the 364 named codes, PM then PP then PP-PI.
5. Everything else in the mandate's order.

## Log

- 2026-09-22 · queue and official-list index generated; checkpoint created.
- 2026-09-22 · reports corrected: 20 stale PENDING cells, historical snapshots labelled, capability matrix updated (`7434ad26`).
- 2026-09-22 · cross-reference gaps closed: pir-strategy re-pointed, qm-ud-stock-block moved to a notes field (`7434ad26`).
- 2026-09-22 · Fiori thin index: shared display names 61 to 0 from Book 7 titles, no protected file edited (`7e34eb55`).
- 2026-09-22 · reflow at 320px: 16 grid tracks guarded with min(100%, Nrem), record headings and code links may wrap (pending build).
- 2026-09-22 · functions batch 10 running (`wf_4de3909b-73f`).
- 2026-09-22 · CDS 39/39 (`e15d9d3a`), pushed.
- 2026-09-22 · chain launched (`wf_883a652e-4fa`): 15 batches, enhancements 2, fiori F3289, functions 76 in batches of 6. Resume: `Workflow({scriptPath: "scripts/workflows/enrich-chain.js", resumeFromRunId: "wf_883a652e-4fa"})` with the args in `chain-args.json`. While it runs, no edit to `data/verification/{enhancements,fiori,functions}.ts`.
- 2026-09-22 · business objects 6 to 16: ten repository-derived seeds from tx-intel related-object fields; names outside the universe listed in notes, not as members; one internal conflict recorded (IK01 names BAPI_MEASUREMENTPOINT_CREATE, the function registry says it does not exist).
- 2026-09-22 · §19 tab sweep: 26 tabs mapped to 32 routes, 6-way matrix clean; four real clipping sites at 320/390 fixed (implicit grid tracks). See TAB-SWEEP.md.
- 2026-09-22 · chain batches 1-2 written: enh:technique:enhancement-spot and enh:technique:vofm (unchanged, bounded to documentation continuity), fiori:F3289 (s4_native, scope item 31L/3LQ disagreement recorded). Enhancements 40/40 and curated Fiori 22/22 authored.
- 2026-09-22 · chain batches 3-4 written (functions, 12 ids: BAPI_PR_CREATE ... ILOA_INHERIT_FROM_FUNCLOC). Functions L5 34, verified 109.
- 2026-09-23 · session restarted (model switch). Chain `wf_883a652e-4fa` had written batches 1-4 (enhancements 2, F3289, functions 12; committed `b43899c3`, `ac7b4612`) and died in batch 5 research. The remaining 11 batches (64 function ids) relaunched as `wf_f565a3e6-6c1` from `chain-args.rest.json` (a copy of `enrich-chain.js` with those args embedded, so nothing was retyped). Resume: regenerate that script from `chain-args.rest.json` and pass `resumeFromRunId: "wf_f565a3e6-6c1"`.
- 2026-09-23 · **correction to the 2026-09-22 sweep**: the "all 32 routes" clipping check and the dark / 390 axe runs were not run as reported. zsh does not word-split `$VAR`, so the route list reached the script as one argument and `set -- $m` left the env unset. Re-run for real: `scripts/qa/clip-check.mjs` reads its routes from `ux-measure.mjs`, and every run now sets its env explicitly. TAB-SWEEP.md corrected.
- 2026-09-23 · axe-core 4.12.0 (already in the tree via eslint-plugin-jsx-a11y) swept with `scripts/qa/axe-sweep.mjs`; contrast, nested-interactive, scrollable-region and target-size findings fixed. A desktop user agent at 320 / 390 px (the 400% zoom reflow case, never measured before) left the content 40 / 110 px beside the expanded rail: narrow desktop windows now default to the peek rail; compact-rail indicator and hidden-rail focus fixed; Studio fit floored at 24 px targets.
- 2026-09-23 · best practices 17 to 20 (`0c4a12c9`), reviewed inline (37 repoRefs resolve, 10 official rows verbatim, every token traced to the record's own sources; one merged entry split). SD and P2P practices being drafted; 13 official Fiori ids being researched for the catalog.
- 2026-09-23 · transactions queue: `tx-queue.json` (364 named leads without a record: PM 3, PP-PI 8, PP 73, other modules 280) and `tx-chain-args.json` (the 84 core codes, 14 batches), to run after the functions chain.
- 2026-09-23 · committed `cf54533d` (narrow desktop reflow: peek rail default, compact-rail pill, hidden-rail focus, rail search name, Studio fit floor) and `212ef360` (axe-core findings; S/4 Center list tracks). Final build 7,828 pages: 9 ux rows, 5 clip runs and 5 axe runs green (axe: only the reader ticks, exempt); keyboard 1,280 stops at 1363 and at 390 desktop with 0 traps, 0 off-screen, 0 unindicated. Preview re-checked: SSO_BLOCKED (302 to vercel.com/sso-api). Branch 2 behind `main`, 125 ahead (read-only compare).
- 2026-09-23 · Fiori: 12 official ids added to the catalog with verified records (`9609c688`), curated records linked; best practices 22 with SD and P2P (`aac20274`). Build 7,854 pages, routes in sync, 0 dead links, new pages clean in axe (1363, 390 dark) and clip (320).
- 2026-09-23 · chain batch 5 written (ILOA_READ, ILOA_UPDATE, ISCHED_CALL_GENERATE, ISU_FUNCLOC_GETLIST, K_COSTS_READ, K_ORDER_SETTLEMENT). Conflict review: 32 records hold conflicting evidence, each with 4+ evidence rows and review notes (`scripts/qa/conflict-review.mts`).
- 2026-09-23 · chain batch 6 written (`c962ae29`). Record-page sweep: all 371 record pages at 320 px; the S/4 plate header and the evidence source list clipped on long SAP tokens, fixed at the component (`b2bef2c2`), 371/371 then 0 clipped. Watcher armed for batch 7 (`scratchpad/watch-batch.py 3` in the session scratchpad).
- 2026-09-23 · chain batch 7 written (NOTIF_ITEM_READ, ORDER_TYPE_READ, PM_NOTIFICATION_TYPE_READ, PRIORITY_DETERMINE, QPK1_CATALOG_READ, QPK1_CODE_TEXT_READ).
- 2026-09-23 · chain batch 8 written (QPK1_CODEGROUP_READ, RESERVATION_READ, SCHEDULING_HISTORY_READ, SERIAL_NUMBER_CREATE, SERNR_ADD_TO_DOCUMENT, STATUS_CHANGE_EXTERN).
- 2026-09-23 · chain batch 9 written (STATUS_OBJECT_CREATE, STATUS_PROFILE_READ, STATUS_TEXT_READ, STATUS_USER_CHANGE, STRUCTURE_INDICATOR_READ, T352_READ).
- 2026-09-23 · chain batch 10 written (USER_STATUS_TEXT_READ, BAPI_PRODVERS_CREATE_REPLACE, BAPI_ROUTING_GETDETAIL, CR_WORK_CENTER_READ, CSAP_BOM_ITEM_MAINTAIN, CSAP_MAT_BOM_MAINTAIN); the two registry names the repository calls non-existent are verification_required, search-bounded, with the repository's own contradiction quoted.
- 2026-09-23 · chain batch 11 written (CSAP_MAT_BOM_READ, CY_CAPACITY_HEADER_READ, CY_CAPACITY_LOAD, DIMENSION_GET, MAKT_SINGLE_READ, MARA_SINGLE_READ).
- 2026-09-23 · **chain `wf_f565a3e6-6c1` ended**: batches 1-7 of this run written and committed (42 records, `1033110c` … `6a113c51`); batches 8-11 (22 ids: MARC_SINGLE_READ, MATERIAL_UNIT_CONVERSION, MD_CONVERT_MATERIAL_UNIT, QPK1_INSPCHAR_READ, RFC_READ_TABLE, UNIT_CONVERSION_SIMPLE, USER_STATUS_CHECK, VB_BATCH_DETAIL_GET, VB_BATCH_VERIFY, VIEW_MAINTENANCE_CALL, BAPI_MPID_CREATE, BAPI_PLANNEDORDER_CREATE, BAPI_PLANNEDORDER_GET_DETAIL, BAPI_PROCORD_COMPLETE_TECH, BAPI_PROCORD_RELEASE, BAPI_PROCORDCONF_CANCEL, BAPI_ROUTING_CREATE, BAPI_TRANSACTION_ROLLBACK, CS_BOM_EXPL_MAT_RC1, CSAP_MAT_BOM_CREATE, STATUS_CHANGE_INTERN, STATUS_READ) lost every research agent to the weekly usage limit (resets 2026-09-28 12:00 Asia/Jerusalem). Nothing partial was written. Functions: 120 of 142 with records, verified 125, verification_required 3, L5 38.
- **Resume (after the reset):** `node -e` the generator from the 2026-09-23 log (copy `scripts/workflows/enrich-chain.js`, embed `chain-args.remaining.json` as `ARGS`, replace `args.` with `ARGS.`), launch `Workflow({scriptPath})`, then the same for `tx-chain-args.json` (14 batches, catalog transactions, no `functionsCommonHint`). Commit after each batch with the verification cycle (tests, tsc, build, routes, dead links, axe and 320 px clip on the batch's pages).
- 2026-09-23 · the 22 remaining function ids written in the main session (searches saved as raw JSON, quotes checked mechanically, auditor pass pending the 2026-09-28 reset); functions 142/142 with records once verified and committed.
- 2026-09-23 · **final gates from the final state (`6eb18a64` + report)**: two-pass build 7,854 pages, sitemap 4,521 URLs / 0 dead, routes in sync, 0 dead links, reader routes complete, diag intact, tests 212/212, tsc 0 (app and test projects), lint 0 errors, books 574/574, search index unchanged, academy blocks in sync, separation holds, conflict review 36 / 0 weak. Visual matrix on the final export: 9 ux rows all zero, clipping 0 on 32 routes × 5 layouts and on 371 record pages, axe 0 in 5 runs (reader ticks exempt), keyboard 1,280 stops × 2 with 0 traps / off-screen / unindicated. `FINAL-COMPLETION-REPORT.md` written (state C: platform interruption, every local task done).
- 2026-09-24 · **completion mandate, day 1.** Base verified: HEAD `374b4ea9`, `origin/main` `f13846ee`, 2 behind / 141 ahead, production still without the new routes (best-practices, IP30H = 404). Subagents usable again. Launched four pipelines side by side (different files, one writer per file): independent auditor pass over the 22 main-session function records (`scripts/workflows/audit-family.js`, `wf_dd426805-153`, functions.ts), transactions chain A (84 core codes, `wf_8c7ccb9c-376`, transactions.ts), transactions chain B (280 named codes, `wf_4ce63408-bba`, the new shard transactions-b.ts), and the process-catalog pipeline (`scripts/workflows/bp-family.js`, `wf_dccd5327-7b8`, 13 processes in 4 batches into data/best-practices/catalog-2026-09.ts). Queues regenerated: QUEUE.json, tx-queue-rest.json (280 named + 1,421 unnamed in the mandate's module order), tx-chain-args-2/3.json. ACC-6: a NEO bridge (header pill, sidebar group, mobile sheet row) added to the legacy chrome without touching the frozen reader (`4ecbbe59`). BP profiles gained an "interfaces" section. Books 574/574 before the batches.
- 2026-09-24 · **session limit (platform interruption, 5-hour window)** hit at about 09:00 with five pipelines running: audit batch 1 (6 records) was written and is committed here; transactions A batch 1 (5 drafts audited), B batch 1 (3 audited), Fiori batch 1 and best-practices batch 1 lost their writers or researchers to "You've hit your session limit · resets 12:40pm". Lesson recorded: one pipeline at a time, batch = commit unit, cached agents replayed on resume. `scratchpad/` excluded from tsconfig (a pipeline agent left `scratchpad/mbrl/validate.ts`, kept in place). Functions after batch 1: L5 41, verified 124, verification_required 4, conflicts 14; MARC_SINGLE_READ downgraded to an authored verification_required, five records upgraded with official rows.
