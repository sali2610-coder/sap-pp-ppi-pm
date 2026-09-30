# Progress journal · experience redesign

Checkpoint log so an interrupted session resumes from evidence, not memory. Newest entry last. Times are Israel time (IDT, UTC+3).

## 2026-09-28

- 22:55 Brief received (master design brief). Production verified at 6ba22207 (deployment 6718495973). Branch `design/neo-experience-redesign` free.
- 23:05 Worktree `/Users/salihalif/Desktop/My-Projects/neo-redesign` from `origin/main`, `npm ci`.
- 23:25 Baseline gates green; `public/books` and the tx index restored as generated inputs (see BASELINE.md). Lab vitals and bundle sizes measured. 479 before screenshots secured in `neo-redesign-evidence/before/`.
- 23:40 System map (`SYSTEM-MAP.md`), design brief, design spec, board spec written. OFL fonts vendored in `app/fonts/` (IBM Plex Sans Hebrew, IBM Plex Mono, Frank Ruhl Libre, Assistant, JetBrains Mono) with `fonts.ts` (next/font/local, split Hebrew/Latin unicode ranges).
- 23:45 Running in parallel (read-only research, one output file each): traceability matrix, copy-audit candidates, legal readiness. Board builders (one folder each): editorial, workbench, atlas.

- 00:00 (29.09) Tool fixes committed (7a640cff): module-colour-check now measures /neo/domain-model/ and fails on non-200 routes; check-prod follows the root cutover. Both pass locally and on production.
- 00:05 Traceability matrix (66c85fd9), legal readiness and copy candidates (cd95f6c7) committed. Copy edits (non-SAP rows) and the SAP content review running; boards in progress.

- 01:05 Copy pass committed (b4f87193, 103 rows) and the SAP copy rows (1fe5a3a5, 24), each reviewed. Font fallback fix, ViewTransition types, bare shell for the boards, legal content as data (e5963a1b).
- 02:05 Boards, motion lab, bakeoff and decision committed (255dfec5): base Workbench, grafts from Editorial (warm grounds, Frank Ruhl for gateway and reading titles) and Atlas (build-in-order motion, capped relation strip). Mean 71.4 / 68.5 / 59.8.
- 02:55 SAP correctness (3b9e5583): the five content-review blockers fixed in derivation code with a failing-then-passing test each; one S/4 status dictionary. Tests 218/218. Data fixes that need authorisation listed in reviews/sap-correctness.md.
- 02:56 Phase 4 token layer (42fa18ea): app/neo/system.css, per-family font modules, mechanical CSS migration (19 sheets), violet out of the sources (source sweep 3 documented hits).
- 03:50 Phase 5 step 2, shell (beb3a89a): flat rail, dock tools in the top bar, one page footer with the legal links on every page and device, /neo/privacy|terms|accessibility and the legacy /privacy/ from one document, primitives (ui.css) flat with a brand-only primary. Runtime violet sweep 231 to 0 on 80 family pages. Shell check 20/20. Crawl 0 dead links.
- 04:11 Phase 5 step 3, home (8fdd65ca): search first, six doors whose numbers equal their destinations' (6/6; the checker misparses the shelf, which states 11 as the door does), continue panel, the process map signature, module cards and the S/4 picture kept. Rail table count fixed (126 to 105).

- 05:15 to 07:28 (29.09) Phase 5 steps 4 to 14 and the motion policy: catalogues as lists, one record header and one catalogue bar across record types (04b6025d, 05919eee), side-tabs decided (SIDE-TABS.md), flat search, S/4 status families, Hebrew type without tracking or capitals, gateway titles, the list-to-record signature (231328a2), no perpetual loops (ffd0f265), the copy control's live region (2ab75f0e), dependencies and the future merge plan (12930a2b).
- 06:45 to 08:35 Review gates 1 and 2 fixed (d7461ae1); gate 7 (ERD, Studio) blockers and majors (a673f893, f555cfb3); Astra checks that pinned replaced copy updated with new acceptance criteria (b72d53bf).
- 09:23 to 13:14 Wave 2 fixes for gates 3 to 6 on three branches, merged: pages (bd84f774), shell and search (3815f0cb, 06ce8abd), content (e7f25f17); the 404 without React #418 (7da3441e); the transactions as one static file (6b8584c0).
- 14:54 to 15:31 Project NEO as the only site (b5b5b634, b6fc3176, 8c9eb5eb): 0 links out of NEO in 3,225 exported NEO pages (was 600), 4,644 of 4,644 pre-NEO addresses redirect into NEO, the NEO offline page; NAV-LEGACY.md.
- 16:44 Fonts (gate 9 majors 1 and 2): the display face only where a title paints it, calibrated fallback faces, CLS 0 (31d39b4d). Gates 8 and 9 reports committed before their fixes (31ae7164).
- 17:16 to 17:35 Gate 8 fixes (fab76fa6, db03d1d3): all six blockers, the majors and the minors; the first measurement pass found the exam listbox, focus under the rail's sticky headings and the section reel, keyboard scrolling of the canvas, and fixed them.
- 18:58 Gate 10 (Impeccable, NEEDS-WORK 76) majors and minors (a6a56f22): the counts as a line, the home's command-first gate, the 12px floor, violet out of globals.css, no hover lift, the reader's type before the first paint; gate 8 phone findings (ui.css on the legal and offline pages, 44px touch rule).
- 19:16 Found that the warm Turbopack cache had served the previous compiled globals.css to the 18:58 build. Cache moved aside (not deleted), cold build (build-a11y3.log, 5:24); every recent global rule verified in the exported CSS. The series measured on that export: `neo-redesign-evidence/final-run-3/`.
- 20:17 to 22:02 Final-series findings and docs (3989d65e); gate 11 (FAIL: 4 blockers, 5 majors, 10 minors) and the closure table of gates 1 to 10, committed before their fixes (37a7b3a2); gate 11 blockers and majors fixed (d175dba7): the home doors' focus ring, the offline page's own assets in the service worker (neo-v3), the ERD footer at 1100px and less, reflow at 320px, "מדריך עבודה" in search, the object page and the shelf as count lines.
- 22:09 Cold build of d175dba7; the 32-step series `final-run-4/` on it, every step rc=0 except status-consistency (rc=1, COR3).

## 2026-09-30

- 00:30 to 06:04 Leftovers of final-run-4, each traced to its cause:
  - `/neo/tables/` phone LCP 9,436 in two series: bimodal lab result (27 cold loads without tracing: 22 at 6.2 to 6.3 s, 5 at 9.4 s). The page content sits in the root `app/loading.tsx` Suspense boundary and is revealed by `$RC` at byte 519,087 of the HTML; the emulated link decides when that byte arrives. Same structure in production. Not style, scripts, CPU or bytes (`final-run-4/README-vitals-tables.md`).
  - COR3: the consistency check looked for the palette field's pre-40035346 name, so the palette step was skipped and COR3 (no catalogue row, as in production) had one reading. Tool fixed: 12/12, 0 contradictions.
  - The 1280 sweep's timeout: the single-threaded `serve-out.py` stalls every request behind one idle connection (a browser preconnect; curl timed out behind one open socket). Server made threaded; lap1280 80 routes, 0 flagged.
  - Reflow 320: six of the 39 domain records overflowed by 4 to 51px (the sweep sampled one): codes and arrow chains with no break point. Fixed on the record root; 0 of 39 at 320, nothing moves at 1440.
  - The nav links' names ("…מפעל56"): the count is a separate word.
  - 06:04 checkpoint 9dc3f2be. 06:06 final gates on a cold build of it: `neo-redesign-evidence/final/`.

- 06:06 to 08:15 The citation mark (6ab0084c: a citation opened the NEO reader without marking its sentence; verify-reader also had ten checks that could not fail); gate 9 P2 measured and kept, the search's `inert` one frame later, the reader's loading line below the opening (dfcafdb6); final gates on 63eb7549 (`final-2/`, all rc=0).
- 08:21 to 10:14 The series `final-run-5/` on 63eb7549, stopped on purpose after 14 of its steps (`final-run-5-partial/README.md`): an independent read-only code review of the night's commits returned FAIL (3 major, 2 minor, 2 nits), and the fixes had to be in the measured build.
- 10:14 to 10:45 The review's findings fixed (2610ef1a): the mark after a language switch, book 7 citations, two more verify-reader checks that could not fail, the phone sheet's link names, a quote across two bold terms, `inert` without re-renders; docs (32089ffb). Final gates on a cold build of 32089ffb (`final-3/`, all 17 rc=0).
- 10:49 to 11:59 The series `final-run-6/` on 32089ffb: 34 steps, all rc=0, one server, one browser at a time; 11 sweep profiles on 80 routes with 0 flagged.
- 12:05 to 12:25 `/neo/tables/` on the phone: 12 of 12 loads in the slow mode on the final build. An experiment without `app/loading.tsx` (not committed; the final export set aside and put back): 12 of 12 at 4.4 to 4.5 s. Recorded as an owner decision (BLOCKERS §2, MERGE-PLAN §1). The accessibility statement from final-run-6 (22186616). Astra reverify on the final export.

- 12:25 to 17:38 Astra on the export of 32089ffb: the first full run 74 PASS, 41 FAIL; every failure traced (ASTRA-CRITERIA.md): five checks followed structure that changed on purpose (1e3a62f7), two real defects fixed in code (b68cc5ff: an exact code finds its record alone; the empty shelf is one 39px row), one navigation timeout passed on the rerun. Final table 115 PASS, 0 FAIL, 25 not measurable, against 114, 1, 25 in production.
- 17:38 to 18:13 The closure table's final states, MATRIX.md, QA-REPORT.md, CHANGED-FILES.md (25249774, 632fa37e, 366d8b0f).
- 18:14 to 19:10 Gate 11, round 2, read-only, on 366d8b0f: PASS, 0 blockers, 0 majors, 11 minors (reviews/gate-11-final-ux-r2.md, 2ef6a730).
- 19:10 to 19:35 The eleven minors (7795e53b). Measurement 13 (R2-5): the frame's overflow was 1px hidden text only, but bringing that text into view scrolled the whole frame away (141 px on a table record, 5,464 px on a work method); `.nx-app` is `overflow: clip`. The ERD counts (R2-1): three layouts measured on the export before choosing one.
- 19:35 to 19:44 Gates on a cold build of 7795e53b (final-4/: 18 steps, rc=0).
- 19:44 to 20:57 The series final-run-7/ on 7795e53b: the 34 steps of final-run-6 and seven round 2 probes, all rc=0.
- 20:58 to 21:05 Astra started on that export and was stopped on purpose: axe in final-run-7 had found 12 colour-contrast nodes on /neo/object/MARA/ (a process-chain step at opacity .7, 2.8:1). They were new because axe-core counts an ancestor as clipping only when its overflow is exactly `hidden`: with the frame `hidden`, everything below the canvas's first screen had been skipped by the visibility-dependent rules. Fixed (bb8a7204), and a11y-sample now reads inherited opacity (389863af). 64d36a53 removed the frame's dead `overflow: hidden` line (30 of 31 compiled CSS files byte-identical across the two exports).
- 21:06 to 21:14 Gates on a cold build of a50116a3 (final-5/: 18 steps, rc=0).
- 21:14 to 21:37 The re-check final-run-7b/ on a50116a3: gate8-measure in five profiles (axe in four), the sampler in both themes, three sweeps with shots, the static sweep; all rc=0. axe: 0 violations in 222 page scans and 39 open states. The sampler, now reading inherited opacity, flagged the reader's disabled "previous" button at the start of a book (2.0 and 2.93:1); WCAG 1.4.3 exempts inactive controls, so such text is now listed apart (5ccbf9d8) and the sampler was run again in both themes: 0 failures, 2 exempt.

- 21:37 to 21:52 The accessibility statement from the final runs (19e1a4f9); docs (b7d63d42); gates on a cold build of b7d63d42, the final code (final-6/: 18 steps, rc=0; its 31 compiled CSS files byte-identical to a50116a3's).
- 21:53 to 22:27 One full Astra run on that export (final-run-8/astra/): 115 PASS, 0 FAIL, 25 not measurable, 0 non-zero exits; against production only S5-1 changed, FAIL to PASS.
- 22:27 onward QA-REPORT.md, ASTRA-CRITERIA.md, MATRIX.md, MERGE-PLAN.md and REVIEW-GUIDE.md from these runs; CHANGED-FILES.md regenerated last.

## Next

Nothing in this plan is left to run locally. What remains is the owner's: the push that lets Vercel build the Preview, the checks on the Preview (REVIEW-GUIDE.md), the decisions in BLOCKERS.md §2, and then MERGE-PLAN.md.

## Earlier plan (kept)



1. Collect research outputs; Phase 1 copy edits (P1, P2) with content review; commit.
2. Build the three boards, screenshot 390/1440 × light/dark (+ reduced motion), score BAKEOFF.md, choose.
3. Motion prototypes (knowledge map build-up, palette + list-to-record continuity via React `<ViewTransition>`).
