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
