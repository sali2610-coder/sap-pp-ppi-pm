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

## Next

1. Collect research outputs; Phase 1 copy edits (P1, P2) with content review; commit.
2. Build the three boards, screenshot 390/1440 × light/dark (+ reduced motion), score BAKEOFF.md, choose.
3. Motion prototypes (knowledge map build-up, palette + list-to-record continuity via React `<ViewTransition>`).
