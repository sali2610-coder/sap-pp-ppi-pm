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
- 2026-09-24 · audit batch 2 (USER_STATUS_CHECK, VB_BATCH_DETAIL_GET, VB_BATCH_VERIFY, VIEW_MAINTENANCE_CALL, BAPI_MPID_CREATE, BAPI_PLANNEDORDER_CREATE) written by `wf_3369ae6e-665` on the compacted prompts (27 min): search counts corrected everywhere, context rows added, no status invented; 12 of 22 audited. Functions: verified 125, verification_required 3, conflicts 14, L5 41. Transactions chains A and B resumed on cached research; their batch-1 writers are running.
- 2026-09-24 · **the 22 main-session function records are all independently audited** (`wf_dd426805-153` batch 1, `wf_3369ae6e-665` batches 2-4; 0 flag sentences left). Outcome: 7 refuted and downgraded honestly (MARC_SINGLE_READ, USER_STATUS_CHECK, VB_BATCH_DETAIL_GET, VIEW_MAINTENANCE_CALL, BAPI_ROUTING_CREATE and two more), the rest confirmed and upgraded with official rows and corrected search counts; no status invented, no record deleted. Functions: verified 126, verification_required 2, conflicts 14, L5 41. Conflict review 37 records / 0 weak. Transactions: chain A batches 1-3 (15 records, 3 refused), chain B batches 1-2 (15 records, 1 refused) committed.
- 2026-09-24 · **transactions: every code carries a record.** 77 researched records (transactions.ts 54, transactions-b.ts 23) plus 1,739 generated context records (`data/verification/transactions-auto.ts`, `scripts/qa/gen-tx-evidence.mts`, no model): registry facts, help.sap.com records that print the code (1,245 codes), the Fiori Apps Library's own entries for S/4HANA 2025 FPS01 (952 GUI transactions listed as apps, 192 with leading Fiori apps), and for the 320 codes a Simplification List item names, the exact item line (684 rows). Rows are `context: true`: shown on the page, never counted toward level or depth, so no verdict moved. Two registry names stay outside the id syntax (F.01, /UI2/INVALIDATE_GLOBAL_CACHES); the tx syntax now accepts a hyphen (official 2025 FPS01 docs print "transaction F-02"). Coverage after: transactions verified 566, verification_required 1,248 (unchanged by the shard).
- 2026-09-24 · interruptions: Fable usage credits ran out at 14:21 (running workflows kept the exhausted model; stopped and relaunched on Opus 5.5), then the 5-hour session limit at ~15:00 with five pipelines running (resets 17:40). Interrupted writers: Fiori (half-applied edits saved to the session scratchpad and reverted), transactions A and objects (nothing written). The session scratchpad was wiped between sessions; every pipeline input now lives in the repo's `scratchpad/pipeline/` and is rebuilt from committed queues plus the journals' drafts and verdicts (`build-args.py`, `recover.py`). Three best-practice researchers had written unaudited records into an unregistered file; moved out, and every non-writer role is now read-only in the prompts.
- 2026-09-24 17:58 · relaunched three runs (paced to the window): Fiori depth 34 apps (`wf_ef66dbe4-c12`, batch 1 reuses 6 drafts + 6 verdicts), best practices 13 processes with Opus research and one repair round (`wf_d9aa0357-e61`), transactions A 63 core codes (`wf_5cdb3d4b-349`). Queued next: objects / CDS / enhancements (57), transactions B (257).
- 2026-09-24 18:30-20:10 · **Astra re-verification**: runner `scripts/qa/astra-reverify.mjs` committed (`6c041756`) after three check fixes that measured the wrong state (S4-1 measured the PM/PP-PI module heroes, S7-LIB-4 a summary mid entry-animation, S7-AC-4/5 a lesson before scrolling): PASS 85, FAIL 0, NOT_MEASURABLE 55 on the 18:07 export. New `scripts/qa/astra-extra-check.mjs` measures 22 of the 55 (SAP-1..8, S11-1..5, S7-ERD-2, APPX-4, S7-CAT-4/8, S7-HOME-3, S7-AI-3, S7-LIB-3, S9-1, ACC-6); first run found one real defect (S7-CAT-8: the transactions catalog never had a sort control; added) and three matrix after-texts that overstated (S7-AI-3 limits column is on /neo/chat/ only, /neo/ai/ keeps its scope line; S7-HOME-3 opener is two sentences since 2026-08-31, neither explains structure; S7-LIB-3 label is "המשך קריאה בתת-הפרק").
- 2026-09-24 · batches committed: Fiori batch 1 (`812d5b66`, F2731 F1511 F2730 F2730A F4072 F2774; L5 12→14), transactions A batch 8 (`5be43f5c`, CM01 CM02 L3→L5), best practices batch 1 (`c046ce07`, calibration + refurbishment; breakdown-maintenance refused on the F1511 naming, queued for a re-draft). Each committed tree re-verified in a clean worktree (tsc 0/0, tests 212/212), books 574/574.
- 2026-09-24 · **SAP fact corrections found while reviewing batches**: F1511 = Request Maintenance, F1511A = Create Maintenance Request across centers/lifecycle/best practice/IW21; Fiori GUI transactions labelled "related", not "replaced" (`258c628f`). Notification types M1 = maintenance request, M2 = malfunction report, M3 = activity report (help.sap.com 2025.001) corrected in ten files incl. an academy quiz; tx-intel IW25/IW26 content was swapped; IW51 is a service notification; F2929/F2974 Fiori ids removed (`829f56e5`, SAP-FIXES FIX-11). Protected books carry the same reversed mapping: owner decision in BLOCKERS.md (`6e6e3820`).
- 2026-09-24 · writers were re-running the audited research (one Fiori writer 65 min); both workflow writer prompts now apply the audit without new lookups (`de390ccf`, from each chain's next batch). Watchers now read writer results from the journal (`scratchpad/pipeline/watch2.py`).
- 2026-09-24 20:10-22:05 · batches committed (each re-verified in a clean worktree): Fiori depth 2-4 (`8a2f0b78` record of 8f7273dd, `544bfe28`, `facf65ee`; fiori L5 12→16), chain A 9-12 (`1ff41802`, `cf30702a`, `a8109390`, `6a506d11`; transactions L5 58→72, verified 567→575), objects 1-3 (`e936351a`, `f9022b77`, `0c0ac792`; objects L5 0→11, catalog graduated from the foundation guard, tests 212→211 by design), best practices 2-3 (`f46bd1f6`, `3d0e39e3`; 22→28 records; 3 refusals queued for a re-draft run with the auditors' problems, `scratchpad/pipeline/bp-redraft-args.json`). Misc chain launched 20:14 (`wf_6efaf4b6-3f6`, `scratchpad/pipeline/misc-run.js`).
- 2026-09-24 · SAP fact corrections from official sources (SAP-FIXES FIX-11 to FIX-16): notification types; IW24/IW25/IW26/IW51; Fiori id pairings (F1511/F1511A, F1814→F1813, F0247→F0247A, tx-intel/lifecycle/solutions); BOR BUS0001 for the process order; 2023 Simplification item attributions (132 codes; `simpl-tcode-index.mjs` glued headings, `gen-tx-evidence.mts --resimpl`); 65 registry titles and 16 deep entries that described another transaction; VBUK/VBUP, BSEG, KONV, MKPF/MSEG and FI totals/index tables with their S/4HANA side. Derived transaction status: a delta that says the code is kept no longer derives "changed" (`ab08a580`, 98 codes). Owner decision logged: protected books carry some of these errors (BLOCKERS).
- 2026-09-24 · Astra: `astra-extra-check.mjs` measures 29 rows the other scripts do not reach (SAP-1..8, S11-*, S7-ERD-2, APPX-4, S7-CAT-4/8, S7-HOME-3, S7-AI-3, S7-LIB-1/3, S9-1, ACC-6, KEEP-1..6); one product defect fixed (transactions sort, S7-CAT-8); matrix after-texts corrected where they overstated; no row left PENDING; 834×1112 iPad layout added (32/32 routes clean). Full run 20:05-20:40: PASS 107, FAIL 1 (SAP-7, waits on the rebuild), NOT_MEASURABLE 32.
- 2026-09-24 22:05 · next: rebuild (running), txB launch after the 22:40 reset (`scratchpad/pipeline/txB-run.js`, hints re-cited from the corrected index), BP re-draft run after BP batch 4.
