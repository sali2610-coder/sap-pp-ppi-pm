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
