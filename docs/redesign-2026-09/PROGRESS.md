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

## Next

1. Step 4 search and palette (search.css glows, result rows); step 5 catalogs; step 6 detail templates (identifier line, relation strip, copy); status marks to the --s4-* families.
2. Step 7 ERD (fit on open, mobile CLS 0.196), step 8 books and reader (tick targets), 9 academy and best practices, 10 chat and AI states, 11 404 and empty states, 12 mobile and presentation, 13 motion, 14 polish.
3. Review gates in the brief's order, final checks, push for the Preview, deliverables, report.

## Earlier plan (kept)



1. Collect research outputs; Phase 1 copy edits (P1, P2) with content review; commit.
2. Build the three boards, screenshot 390/1440 × light/dark (+ reduced motion), score BAKEOFF.md, choose.
3. Motion prototypes (knowledge map build-up, palette + list-to-record continuity via React `<ViewTransition>`).
