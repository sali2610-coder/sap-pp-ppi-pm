# Project NEO · master completion · final report

State: **every local task of the completion mandate is done.** What is left is outside this
machine: the release to `main` and production (section 13), and the external blockers and
owner decisions in section 12, each with the one action that closes it.

Every number below is regenerated from the data at the final SHA, never typed from memory:
`npm run report:coverage`, `scripts/qa/conflict-review.mts`, `npm test`, the export gates,
`scripts/qa/astra-reverify.mjs` with `scripts/qa/astra-final-status.mjs`,
`scratchpad/books-hash-check.mjs`, and the source counts in `scratchpad/final/numbers.mts`.

## 1. Branch and SHA

`design/neo-correction-pass`, pushed. This pass runs from `374b4ea9` (the 2026-09-23 report) to
the closing commit that carries this file; its SHA is given in the chat report. `main` is 2
commits ahead of the merge base and holds no content the branch lacks (`git diff HEAD...origin/main`
is empty; a trial `git merge-tree` is clean).

## 2. What this pass did (164 commits from `374b4ea9` to `22a23d1e`, then the closing commits)

| area | commits | what |
|---|---|---|
| transactions, researched | 61 | 5 shards (`transactions.ts`, `-b` to `-e`): the 84 core codes, the 280 named codes and 33 earlier records, 397 in all, each researched, adversarially audited and written by a single writer |
| transaction shards and the generated shard | 6 | shards C, D and E registered; 1,419 generated records rebuilt offline after the chains (`--resimpl`) |
| SAP fact corrections | 20 | FIX-11 to FIX-24 (section 8) |
| best practices | 13 | the 13-process catalog, three re-drafts, and the 21-field backfill of 30 older records |
| functions | 4 | the 22 main-session function records audited separately (7 refuted and downgraded) |
| Fiori, objects, CDS, enhancements | 21 | Fiori depth (34 apps), objects (16), the CDS and enhancement re-checks |
| QA, workflows, UI fixes, logs | 39 | the Astra runner and extra check, the final-status script, repair rounds, the transactions sort control, ACC-6, progress and blockers |

## 3. Before and after, per family

Before = `374b4ea9` (the 2026-09-23 report's final numbers); after = `report:coverage` now.

| family | universe | L5 before → after | verified before → after | verification_required before → after | conflicts before → after |
|---|---|---|---|---|---|
| tables | 105 | 28 → 28 | 103 → 103 | 0 → 0 | 2 → 2 |
| transactions | 1,818 | 29 → **151** | 555 → **741** | 1,262 → **1,053** | 1 → 24 |
| functions | 142 | 41 → 41 | 124 → 126 | 4 → 2 | 14 → 14 |
| idocs | 3 | 3 → 3 | 3 → 3 | 0 → 0 | 0 → 0 |
| cds | 39 | 23 → 23 | 37 → 38 | 2 → 1 | 0 → 0 |
| fiori | 34 | 12 → **24** | 27 → 26 | 0 → 0 | 7 → 8 |
| enhancements | 40 | 15 → 15 | 28 → 28 | 0 → 0 | 12 → 12 |
| objects | 16 | 0 → **13** | 16 → 16 | 0 → 0 | 0 → 0 |
| best practices | 22 → **35** | n/a → 2 | 22 → 31 | 0 → 0 | 0 → 4 |
| **total** | 2,219 → 2,232 | 151 → **300** | 915 → **1,112** | 1,268 → **1,056** | 36 → 64 |

Conflicts rise because researched records now show disagreements the derived data hid; each
of the 64 carries its sources and review notes (section 6). Verified counts move down where
an authored `verification_required` replaced an unsupported repository verdict (Fiori 27 → 26,
best practices where an auditor required a conflict row).

## 4. The mandate's definition of done (§9), item by item

| item | state | evidence |
|---|---|---|
| all 22 audit functions passed a separate auditor | done | `wf_dd426805-153`, `wf_3369ae6e-665` (2026-09-24); 7 refuted and downgraded, 0 flag sentences left |
| the 84-code chain complete | done | 84 / 84 researched (`tx-chain-args.json` against the shards) |
| the 280-code chain complete | done | 280 / 280 researched; every code a Simplification List item names (386) has an audited record |
| a queue for every other transaction, handled | done | `tx-queue-rest.json` (1,421): 1,419 generated records with a per-code documented blocker; 2 ids outside the id syntax (BLOCKERS) |
| every id has an authored record or a documented, grounded external blocker | done | 397 researched + 1,419 generated (each names the action that decides it) = 1,816; the 2 remaining ids in BLOCKERS |
| no SAP claim without a source | done within the measurable scope | every overlay and best-practice claim cites a record (validator + tests); the repository texts the chains found contradicted were corrected (FIX-11 to FIX-24); the definitive blueprint workbooks are an owner decision (BLOCKERS) |
| every in-scope best practice complete end to end | done, one documented source gap | 32 of 33 process records carry all 21 fields; master-recipe's KPI field stays empty because no source names a KPI (the record says so); the other 2 records are practices, not processes |
| every local Astra finding closed | done | section 10: no measured row fails |
| ACC-6 closed or documented | closed on the NEO side | `4ecbbe59`: a NEO bridge in the legacy header, sidebar and mobile sheet; the frozen reader's own chrome stays (BLOCKERS) |
| all checks pass | done | section 9 |
| books 574 / 574 identical | done | `ZERO_CONTENT_LOSS 574/574` |
| worktree checked, foreign changes kept | done | only the user's `.claude/settings.json` is modified and never staged; `scratchpad/` and the untracked audit shots are kept |
| the final report consistent | this file | numbers regenerated at the final SHA |
| no unresolved `main` conflict | done | `main` holds nothing the branch lacks; merge-tree clean |
| no new route returns 404 in the local export | done | routes in sync; 7,869 pages, 0 dead links |

## 5. Depth L0 to L5 at the final SHA

| L0 | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| 0 | 1,356 | 156 | 405 | 15 | 300 |

L1 is mostly transactions without a tx-intel page structure (1,279: depth L2 needs three
authored facts about the code; a researched status alone does not add them) and 75 tables
whose field data types and lengths are not in the blueprint source (SE11 closes it; BLOCKERS).

## 6. Verified, verification required, conflicts, statuses

1,112 verified, 1,056 verification_required, 64 holding conflicting evidence, over the 2,232
ids. `scripts/qa/conflict-review.mts`: 60 overlay records hold conflicting evidence, 0 weak
(the other 4 are best practices, each with its conflict row). 779 authored overlay records plus
35 best practices; 714 overlay records carry an authored S/4HANA status: unchanged 235,
verification_required 128, changed 102, s4_native 52, replaced 44, released_api_available 40,
compatibility_scope 35, fiori_alternative_available 27, simplified 21, restricted 17,
legacy_ecc_only 6, deprecated 4, not_available 3; 57 successors recorded.

## 7. Official SAP sources

3,039 distinct official URLs cited 7,304 times in `data/verification/*.ts`,
`data/best-practices/*.ts` and `data/fiori/apps.ts`: help.sap.com 5,835, the Fiori Apps
Library 1,437, api.sap.com 32. Every URL comes from a scripted official channel's own output
(`sap-help-search.mjs`, `sap-help-body.mjs`, `fal-app.mjs`) or the two Simplification List PDFs;
no page was cited that rendered as a JavaScript shell.

## 8. SAP fact corrections (FIX-11 to FIX-24, `audit/ux-2026-09/SAP-FIXES.md`)

Notification types M1/M2/M3 and IW24/IW25/IW26/IW51 (FIX-11); Fiori id pairings F1511/F1511A,
F1813, F0247A (FIX-12); the process order BOR object BUS0001 (FIX-13); 65 registry titles and 16
deep entries that described another transaction (FIX-14); VBUK/VBUP and BSEG by side (FIX-15);
the S/4HANA side of KONV, MKPF/MSEG and the FI totals tables (FIX-16); MFP1 (FIX-17); eight MB
codes "available" though replaced, MMBE_OLD rebuilt, eight titles (FIX-18); phantom and misnamed
Fiori ids after a sweep of every id against the Fiori Apps Library, and Confirm Jobs (deleted in
2023) replaced by its successor (FIX-19); MD01 still available and Post Goods Movement as the
MIGO Web GUI app (FIX-20); CO01, CO11N, CO03, C201 (FIX-21); MM03 (FIX-22); F2018 in a lesson
(FIX-23); MB03, MB1B, MSC1-MSC3 and ME21-ME23 (FIX-24). Records whose repository rows quote
the pre-fix text carry an Old → New note (44 records). One researched record was itself wrong
and corrected: `tx:MB03` had been authored "unchanged" although the MM-IM availability item
lists it as replaced by MIGO (`e69304e0`).

## 9. Every check and its result (final SHA)

| check | result |
|---|---|
| `tsc --noEmit` (app, test project) | 0 / 0 |
| `npm test` | 211 / 211 |
| `npm run lint` | 0 errors (451 warnings, the accepted baseline class) |
| two-pass build | 7,867 pages generated |
| `check:routes` | manifest in sync with built routes |
| `crawl:deadlinks` | 7,869 pages, 0 dead links |
| sitemap | 4,521 URLs (3,346 noindex pages skipped) |
| `verify:reader` | 108 / 108 |
| books | ZERO_CONTENT_LOSS 574 / 574 |
| academy blocks | 460 lessons in sync |
| conflict review | 60 records, 0 weak |
| contradiction scans (repository vs authored status, lifecycle vs authored, Fiori ids vs library) | 0 open |
| Astra runner | 115 PASS, 0 FAIL, 25 not measurable (section 10) |

## 10. Astra closure (the design audit, 140 matrix rows)

Runner `scripts/qa/astra-reverify.mjs` on the final export (2026-09-28T16:43Z, 50 runs, 0
non-zero exits, 1,953 s): **115 rows PASS, 0 FAIL, 25 not measurable by a script**. It covers the
mandate's test matrix: 320 × 568 (phone and desktop user agent, the 400 % reflow case),
390 × 844 (light, dark, desktop user agent), 834 × 1112 (iPad user agent), 1363 × 936 (light,
dark, reduced motion), 1440 × 900, 1920 × 1080, and 682 × 468 (the 200 % zoom case), plus the
accessibility, keyboard, clipping, type-scale, AI-state, reader and SAP-fact checks.

`scripts/qa/astra-final-status.mjs` maps every matrix row to the mandate's vocabulary and
writes the token into the matrix's final column (no measurement in that column) and the
per-row table `audit/master-completion/ASTRA-FINAL-STATUS.md`:

| final status | rows | which |
|---|---|---|
| VERIFIED | 115 | every row whose acceptance a script measured on this export |
| DONE | 19 | the guidance rows (INS-1 to INS-6), the priority rows mapped to measured S-rows (PRIO-1 to PRIO-8), the round-summary rows (S12-R1 to R3, S12-REC) and S8-2 (a local table of contents exists; prerequisites are not in the lesson data and were not invented) |
| MANUAL_LIVE_TEST_REQUIRED | 2 | S7-AI-6 (live AI answers: no key, paid calls need approval; script `audit/ux-2026-09/AI-LIVE-TEST.md`) and SCOPE-2 (a real iPhone / Safari pass; checklist `SAFARI-IPHONE-CHECKLIST.md`) |
| NOT_APPLICABLE | 4 | S7-3D-1 and SCOPE-3 (no 3D view exists in this repository; the criteria were checked on the 2D ERD), SCOPE-1 and SCOPE-4 (the reviewer's scope statements) |
| EXTERNAL_BLOCKER | 0 | |

ACC-6 is VERIFIED (the NEO bridge in the legacy chrome is measured by the extra check).

## 11. Books

The books were read, never written: `data/books/**` and `data/library/**` are byte-identical to
the recorded manifest before and after every batch (574 / 574). Where a protected book carries
an error the official sources contradict, it is an owner decision in BLOCKERS, not an edit.

## 12. External blockers and owner decisions (`BLOCKERS.md`)

External: the 1,419 unnamed transaction codes (SE93 and the Simplification Item Check in the
target system), table field types (SE11), `PPCC1` and four BAPI names no official record prints
(SE37), `CPC1` (SE93), `API_PRODUCTION_ORDER_2` (the API Hub answers with a JavaScript shell),
the sc4sap MCP connection, the Vercel Preview behind SSO, the live AI quality test (no key, paid
calls need approval), a pass on a real iPhone / Safari. Owner or product decisions: the protected
books' reversed notification types and Fiori pairings, the two definitive blueprint workbooks
(about 49 recorded conflicts), the F0843 / MIGO id schema, the two ids outside the id syntax.

## 13. `main` and production

Release per §10 of the mandate, after every gate above passed on the branch:
`git fetch`; `origin/main` merged into the branch without conflict (it holds no content the
branch lacks); gates re-run on the merged tree; the branch pushed; `main` fast-forwarded to it
and pushed without force; Vercel's production deployment checked through GitHub's deployment
record against the `main` SHA; then `sapbysali.app` smoke-tested route by route.
The outcome of each step is recorded in the addendum below.

## 14. Worktree

Only `.claude/settings.json` (the user's) is modified and never staged. `scratchpad/` (pipeline
inputs, recovery scripts, fix scans) and `audit/ux-2026-09/shots/master/` stay untracked and
untouched. Nothing was deleted, no history was rewritten, no force push.
