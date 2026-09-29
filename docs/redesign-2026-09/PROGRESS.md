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

## Next

1. Final measurement series (final-run-3), Astra reverify, lab vitals on the final export.
2. The accessibility statement from the final run (gate 8, M5), QA-REPORT.md, CHANGED-FILES.md, DELIVERY.md, BLOCKERS.md.
3. Gate 11 (final auditor), fixes between waves, run-final-gates.zsh on a cold build, the report.

## Earlier plan (kept)



1. Collect research outputs; Phase 1 copy edits (P1, P2) with content review; commit.
2. Build the three boards, screenshot 390/1440 × light/dark (+ reduced motion), score BAKEOFF.md, choose.
3. Motion prototypes (knowledge map build-up, palette + list-to-record continuity via React `<ViewTransition>`).
