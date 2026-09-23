# Project NEO · master completion · final report

State on stopping: **C, platform interruption, with every local task done** (§27). The
research pipeline stopped on 2026-09-23 with "You've hit your weekly limit · resets Sep 28
at 12pm (Asia/Jerusalem)". Everything that could be done locally and from public sources
was done; what remains is listed under 15 with the single action each needs.

Every number below is regenerated from the data at the final SHA, never typed:
`npm run report:coverage`, `node scripts/qa/conflict-review.mts`, `npm test`, the
`scripts/qa/*` sweeps, `node scratchpad/books-hash-check.mjs`.

## 1. Branch and SHA

`design/neo-correction-pass`. Last content commit `6eb18a64`, pushed; this report and the
final checkpoint files (PROGRESS, BLOCKERS, the tab-sweep JSONs) go on top as the closing
commit, whose SHA is given in the chat report. Base of this pass: `3e4e8f7a` (2026-09-22),
26 commits below `6eb18a64`. `main` is untouched: the branch is 2 commits behind it (the
release merge and the root cutover, read-only compare) and 140 commits ahead of it.

## 2. Commits of this pass (26, oldest first)

| SHA | what |
|---|---|
| `7434ad26` | regenerated queues, official-list triage, report corrections, two cross-reference gaps closed |
| `7e34eb55` | the thin Fiori index shows each app's full title (from Book 7, no protected file edited) |
| `8f969b2e` | functions batch 10 (notification task and activity reads, measuring-point list, classification) |
| `7dbd1659` | Fiori F2774 and F5325 on official sources; reflow at 320 px |
| `e15d9d3a` | CDS 39 of 39 |
| `fb1a4dfc` | ten more business-object groupings (16 total) |
| `118431c7` | four grid tracks that cut text at 320 px; the 26-tab sweep on record |
| `b43899c3` | enhancement spot, VOFM and F3289 re-drafted on official sources |
| `f7d59aeb` | 200 % zoom and accessibility sample |
| `ac7b4612` | functions chain batches 1-2 (12 records) |
| `0c4a12c9` | three cross-module best practices (settlement, QM in production, staging); placeholder rule fixed; BUS2093 note corrected |
| `cf54533d` | narrow desktop windows get the peek rail (400 % zoom reflow); compact-rail pill, hidden-rail focus, rail search name, Studio fit floor |
| `212ef360` | axe-core findings across 32 routes; two more grids that cut text |
| `72926b6c` | QA scripts (axe, clip, keyboard), the corrected tab sweep, the transactions queue |
| `9609c688` | twelve official Fiori app ids join the catalog with verified records; 15 records linked |
| `aac20274` | best practices: sales demand to production (SD) and procure-to-pay for maintenance (FI) |
| `1033110c` | functions chain batch 5; conflict review script |
| `c962ae29` | functions chain batch 6 |
| `b2bef2c2` | long SAP tokens in the S/4 plate and evidence sources no longer cut off at 320 px (371 record pages swept) |
| `8294cc7c` | functions chain batch 7 |
| `9bf7964a` | functions chain batch 8 |
| `a33057e5` | functions chain batch 9 |
| `e3f5c805` | functions chain batch 10 |
| `6a113c51` | functions chain batch 11 |
| `a9fc1651` | checkpoint after the weekly usage limit stopped the chain |
| `6eb18a64` | the last 22 function records, written in the main session |

## 3. Before and after, per family

Before = the measured starting point of 2026-09-22 (PROGRESS.md); after = `report:coverage`
at `6eb18a64`.

| family | universe | records before → after | L5 before → after | verification_required before → after | conflicts before → after | verified (after) |
|---|---|---|---|---|---|---|
| tables | 105 | 105 → 105 | 28 → 28 | 0 → 0 | 2 → 2 | 103 |
| transactions | 1,818 | 33 → 33 | 29 → 29 | 1,262 → 1,262 | 1 → 1 | 555 |
| functions | 142 | 62 → **142** | 30 → **41** | 31 → 4 | 8 → 14 | 124 |
| idocs | 3 (+2 basic types) | 3 → 3 | 3 → 3 | 0 → 0 | 0 → 0 | 3 |
| cds | 39 | 37 → **39** | 23 → 23 | 2 → 2 | 0 → 0 | 37 |
| fiori (curated) | 20 → **34** | 19 → 34 | 11 → 12 | 0 → 0 | 7 → 7 | 27 |
| enhancements | 40 | 38 → **40** | 13 → 15 | 0 → 0 | 12 → 12 | 28 |
| objects | 6 → **16** | 6 → 16 | 0 → 0 | 0 → 0 | 0 → 0 | 16 |
| best practices | 17 → **22** | 17 → 22 | n/a | 0 → 0 | 0 → 0 | 22 |
| **total** | 2,205 → 2,219 | | 137 → **151** | 1,295 → 1,268 | 30 → 36 | 851 → **915** |

The starting point recorded L5, verification_required and conflicts per family, and the
verified total (851); per-family verified counts are given for the final state only.
Conflicts rose from 30 to 36 because researched records record disagreements the derived
data hid (functions 8 → 14). Verified counts move down where an authored
`verification_required` replaced an unsupported repository verdict; that is the correction
working. Two ids sit outside the counted universes on purpose: `fm:PPCC1` (a blueprint
concept) and the two IDoc basic types (a registry of their own), which is why the IDoc family
shows 3 message types but 5 records.

## 4. Records added, changed, verified in this pass

- Added: 80 function records (58 by the pipeline in 10 batches, 22 in the main session);
  2 CDS; 14 Fiori catalog entries with records (F2774, F5325 and the 12 official ids);
  3 enhancement re-drafts (enhancement-spot, vofm) and F3289; 10 business objects;
  5 best practices; the 15 cross-links (12 Fiori records, 3 transactions).
- Changed: `obj:maintenance-plan` (a false "BUS2093 appears nowhere" claim corrected),
  `fiori:F2730` and `fiori:F1576` (aliases became links), F2462 filed under PP-PI.
- Verified: 415 authored records, 349 with an authored S/4HANA status; 906 distinct
  official URLs, 1,506 citations (section 7).

## 5. Depth L0 to L5 at the final SHA

| L0 | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|
| 0 | 1,367 | 147 | 541 | 13 | 151 |

L1 is 1,275 transactions without a researched record plus 75 tables whose blueprints carry
no DDIC field types (depth L2 needs five typed fields; SE11 on a live system closes it) and
15 Fiori entries whose role, catalog and OData are unread by design.

## 6. Verified, verification required, conflicts

915 verified, 1,268 verification_required, 36 holding conflicting evidence, at the level of
the 2,219 ids. Every one of the 36 conflict records carries at least four evidence rows and
review notes (`scripts/qa/conflict-review.mts` at the final SHA: 36 records, 0 weak). Authored status tokens across the 349 statused records: unchanged 119,
verification_required 106, s4_native 50, released_api_available 36, replaced 14, changed 12,
simplified 7, deprecated 2, not_available 2, restricted 1; 18 successors recorded.

## 7. Official SAP sources

906 distinct official URLs cited 1,506 times in `data/verification/*.ts`,
`data/best-practices/*.ts` and `data/fiori/apps.ts`; hosts: help.sap.com 1,461,
fioriappslibrary.hana.ondemand.com 25, me.sap.com 12, api.sap.com 8. Every URL was returned
by the SAP Help search service or fetched from the portal's content service; body text was
read only where the record says so. The two Simplification Lists (2025 FPS01 document
version 1.36, 2023 FPS03 document version 1.35, md5 in SOURCE-LEDGER.json) back the
transactions triage. No SAP Note or KBA number appears that a source did not print.

## 8. ECC → S/4HANA changes recorded

Authored statuses other than "unchanged" and "verification_required": replaced 14, changed
12, simplified 7, deprecated 2, not_available 2, restricted 1, s4_native 50,
released_api_available 36. Per family: tables replaced 3 / changed 9 / simplified 2;
transactions replaced 10 / simplified 2 / deprecated 1 (IP30 → IP30H) / s4_native 1;
functions released_api_available 36 / unchanged 9; CDS s4_native 23 / deprecated 1; Fiori
s4_native 25 / not_available 2 (F2730 Confirm Jobs, W0020) / changed 1 (F0251 → F0251A);
enhancements changed 1 / simplified 3 / replaced 1 / restricted 1 (explicit enhancement
points) / s4_native 1; IDocs changed 1. History is kept: a re-pointed record keeps its old
sentence with a dated addition.

## 9. Every check and its result (final SHA)

| check | result |
|---|---|
| TypeScript (`tsc --noEmit -p .`) | 0 errors |
| TypeScript, test project (`tsconfig.test.json`) | 0 errors |
| Tests (`npm test`) | 212 / 212 pass (evidence schema, cross-reference integrity, S/4 status, process-map xrefs, Fiori index names, and the rest) |
| ESLint (`eslint .`) | 0 errors, 409 warnings (the accepted baseline) |
| Production build, two passes with the sitemap between (`next build`, `gen-sitemap`, `next build`) | exit 0 both; 7,854 static pages, 7,854 `index.html` files in `out/` |
| Route manifest (`check:routes`) | in sync with the built routes |
| Sitemap (`check:sitemap`) | 4,521 URLs, covers all 4,521 indexable pages, 0 dead entries |
| Dead links (`crawl:deadlinks`) | 7,856 pages crawled, 0 dead internal links |
| Reader coverage (`check:reader`) | MISSING ROUTES: 0 |
| Diagnostics page (`check:diag`) | out/diag.html present, all sections intact |
| Search index (`gen:tx-index`) | regenerated, 2,168 entries, byte-identical to the committed file |
| Academy blocks (`check:academy-blocks`) | 460 lessons, map in sync |
| Library / consult separation (`verify:separation`) | holds |
| Evidence schema + cross-reference integrity (`check:evidence`, inside `npm test`) | pass; 0 dangling ids across 2,219 ids, 415 records, 22 practices |
| Coverage (`report:coverage`) | section 3; TOTAL 2,219 ids, L5 151, verified 915, verification_required 1,268, conflicts 36 |
| Conflict review (`scripts/qa/conflict-review.mts`) | 36 records holding conflicting evidence, 0 weak |
| Books (`scratchpad/books-hash-check.mjs`) | ZERO_CONTENT_LOSS 574 / 574 |
| Browser sweep, `ux-measure.mjs`, 9 rows × 32 routes: 1363 light / dark / reduced motion, 390 phone light / dark, 320 phone, 682 (200 % zoom), 390 desktop, 320 desktop (400 % zoom) | every row: status 200 on all 32, 0 console errors, 0 page overflow, 0 canvas overflow, 0 faded text |
| Desktop 1440 and 1920 | measured in the earlier rounds (`audit/ux-2026-09/after-measurements.round6.json`: 0 overflow, 0 faded, 0 console errors); this pass changed the narrow layouts only and re-measured 1363, 682, 390 and 320 |
| Clipping, `clip-check.mjs` | 32 routes × 5 layouts (1363, 390 phone, 320 phone, 390 desktop, 320 desktop): 0 clipped; all 371 record pages at 320 phone: 0 clipped |
| Contrast and WCAG 2.x A/AA, axe-core 4.12.0 (`axe-sweep.mjs`), 32 routes × 5 runs (light / dark 1363, light / dark 390, light 320) | 0 violations except the reader's chapter ticks at 1363 (3 targets under 24 px, exempt: every chapter is a 44 px row in the table of contents, checked by title match) |
| Keyboard and focus (`keyboard-check.mjs`, 40 stops per route) | 1363: 1,280 stops, 0 traps, 0 off-screen focus, 0 without a visible focus change; 390 desktop (peek rail): the same |
| Zoom 200 % | the 682 × 468 row above, all zeros (CSS-width emulation) |
| RTL / LTR | the shell is RTL; LTR runs (codes, ids, dates) are isolated per element; measured in every row above |
| Availability of all pages | 7,854 `index.html` files in `out/`, all 7,856 crawled pages resolve; every new content route (22 function records, 12 Fiori apps, 5 practices) and every changed detail route rendered and checked |

## 10. Routes checked

- Every page of the export is crawled (`crawl:deadlinks`) and the route manifest is compared
  with the built routes (`check:routes`); the sitemap is regenerated between the two build
  passes and checked (`check:sitemap`).
- The 26-tab sweep maps to 32 routes (TAB-SWEEP.md), measured in 9 viewport/theme/UA rows,
  5 clipping runs, 5 axe runs and 2 keyboard runs.
- All 371 record pages (144 functions, 34 Fiori, 39 CDS, 105 tables, 13 enhancement
  techniques, 3 IDocs, the 33 authored transactions) were clip-checked at 320 px; every page
  written or changed in this pass was also checked with axe at 1363 and 390 dark.

## 11. Books

`ZERO_CONTENT_LOSS 574/574` at the final SHA (`node scratchpad/books-hash-check.mjs`: the 11
`data/books` files and 559 `data/library/**` files are byte-identical to the manifest).

## 12. Evidence screenshots

- Committed: 797 PNGs (93 MB) under `audit/ux-2026-09/shots/**` from the earlier rounds.
- This pass: 288 PNGs (9 rows × 32 routes, 43 MB) under
  `audit/master-completion/tab-sweep/shots-*/`, kept local and git-ignored (the folder has a
  `.gitignore`); the measurement JSONs next to them are committed. Artifact policy
  recommendation: keep screenshots out of git and attach them to the audit as a release
  asset; nothing was deleted.

## 13. Preview

`SSO_BLOCKED`. GitHub records a Vercel Preview deployment for every pushed commit, state
success (latest listed: `a9fc1651`, `https://sap-pp-ppi-6qajfglm5-sali2610-coders-projects.vercel.app`);
each answers `302 → vercel.com/sso-api`. The connected Vercel MCP token sees only the project
`cbc-interactive-case-study`. Minting a bypass link would create a credential and was not
done. Only the local export was verified; it is the same build input, not a check of the
deployment.

## 14. `main` and production

Unchanged. No merge, no rebase, no push to `main`, no production deploy or promote, no force
push, no pull request. `.claude/settings.json` keeps the user's own uncommitted change.

## 15. External blockers only (BLOCKERS.md)

| id | what was checked | why it cannot close here | the one action needed | checkpoint |
|---|---|---|---|---|
| weekly usage limit | chain `wf_f565a3e6-6c1` lost its last 4 batches; the 22 ids were written in the main session without the adversarial auditor | the pipeline's agents cannot run until the reset | after 2026-09-28 12:00 Asia/Jerusalem run the auditor pass on the 22 (`chain-args.remaining.json`) and the transactions chain (`tx-chain-args.json`) | PROGRESS.md resume paragraph |
| SE37 / SE11 on a live system | 75 tables at L1, several function contracts, `fm:PPCC1`, the five ids named in BLOCKERS | the blueprints and public docs carry no DDIC types or SE37 metadata | run SE11 / SE37 in the target system, or connect the sc4sap MCP | BLOCKERS.md |
| SAP API Business Hub | `API_PRODUCTION_ORDER_2` and other JS-shell pages | the page body is not fetchable without a browser session | open the hub in a browser and paste the contract | BLOCKERS.md |
| Vercel SSO | section 13 | the preview is behind SSO; the MCP token is scoped elsewhere | sign in, or grant the token this project | BLOCKERS.md |
| AI live test | no key or endpoint in this environment (`manual_live_test_required`) | 27/27 controlled states are not a live test | provide the endpoint and key, then run `AI-LIVE-TEST.md` | BLOCKERS.md |
| physical device / Safari | every measurement is emulation | no device or Safari here | one pass on a phone and Safari | TAB-SWEEP.md |
| ACC-6 | `/neo/*` and `/library/**` use two shells | a product decision on retiring the legacy shell | decide | BLOCKERS.md |
| curated Fiori ids | F2731, F1511, F2730A, F3577, F1576 carry names that officially belong to other ids (now in the catalog and linked) | re-keying changes routes and identifiers (§22) | decide whether to retire or re-key | research-queue-fiori.md |
| CORK, MIGO as app ids | named by official records | not a valid `fiori:` id shape (schema decision) | decide on a schema extension | research-queue-fiori.md |

Queued local work that only the reset blocks: the 280 named transaction codes outside the
core modules (`tx-queue.json`) after the 84 core codes.

## 16. Books declaration

No content was deleted, shortened, rewritten, re-translated, merged or stripped of tables,
examples, headings or metadata in `data/books/**` or `data/library/**`. The only Fiori-index
change is display-side (Book 7 titles resolved in the page). 574/574 identical before and
after every batch.

## 17. Merge and deployment declaration

No merge into `main`, no production deploy, promote, rollback or rolling release, no force
push, no pull request, no change to secrets, credentials or environment variables, no
deletion of audit evidence or of `scratchpad/`.

## Scratchpad triage (§25, nothing deleted)

`scratchpad/` (42 files, 5.9 MB, untracked): evidence to keep: `official/` (the extracted
text of both Simplification Lists, 5.0 MB), `books-hash-check.mjs` (the books gate; worth
moving to `scripts/qa/`), `coverage-ids.json`, `coverage-rows.json`, `chain-args.min.json`,
`BP-PROCESS-BRIEF.md`, `BP-VALIDATOR-NOTE.md`. Temporary: the `build-*.log` and `gates-*.log`
files, `serve.log`, and the one-off probes (`bp-offender*.mjs`, `leaf-320.mjs`,
`offender-320.mjs`, `probe-colour.mjs`, `reader-mobile-probe.mjs`, `palette-ip30h.mjs`,
`find-hosar.mjs`, `sum-measure.mjs`, `post-batch9-fixes.py`, `a11y-legacy.json`,
`legacy-routes.json`). User decision: whether to keep the 5 MB of extracted list text in the
repository or move it beside the PDFs.
