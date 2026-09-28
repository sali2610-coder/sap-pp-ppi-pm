# Project NEO · Experience redesign 2026-09 · program plan

Branch `design/neo-experience-redesign`, worktree `/Users/salihalif/Desktop/My-Projects/neo-redesign`, cut from `origin/main` 6ba22207 (the SHA production serves, verified 2026-09-28).
Evidence that is not committed (screenshots, raw logs): `/Users/salihalif/Desktop/My-Projects/neo-redesign-evidence/`.
Stops before: merge to `main`, production deploy, promote, rollback. Preview only.

## Boundaries that hold for every phase

- Protected content, never edited: `data/books/**`, `data/library/**`, the translation layer, generated SAP data, `data/verification/**`, evidence and research files. Proof: `ZERO_CONTENT_LOSS 574/574` before the first change, after each phase, after every build, at the end.
- Frozen legacy Library (CLAUDE.md): `components/book-reader.tsx`, `components/chapter-reader.tsx`, `components/library/**`, `components/neo/**`, `app/library/**`, `data/ai-tree/**`. The NEO books and reader (`components/neo-shell/books|reader/**`, `app/neo/books|read/**`) are in scope; the brief of 2026-09-28 lifts the earlier books UI freeze for them.
- NEO palette stays scoped to `.nx-app` (app/neo/ground.css pattern) so the legacy Library keeps its validated canvas.
- 100% offline at runtime: no CDN, no remote font, no remote asset. Self-hosted OFL fonts only.
- No new SAP facts, no invented counts. Copy edits change wording, never facts.
- One writer per file. Review agents are read-only.

## Phases

| phase | output | gate |
|---|---|---|
| 0 Baseline | BASELINE.md, SYSTEM-MAP.md, TRACEABILITY.md (draft) | gates green on 6ba22207, before screenshots, bundle + vitals numbers |
| 1 Copy | COPY-AUDIT.md + copy commits | content reviewer on every SAP-professional change, books 574/574 |
| 2 Strategy | DESIGN-BRIEF.md, DESIGN-SPEC.md | written before any UI code |
| 3 Directions | three boards under `/design/redesign-2026/`, two motion prototypes, BAKEOFF.md | scored matrix, decision recorded |
| 4 System | tokens (colour light/dark, type, space, radius, border, elevation, z, motion), primitives, templates, TOKENS.md, MOTION-SPEC.md, COMPONENT-INVENTORY.md | contrast AA both themes, no purple, no pill buttons |
| 5 Build | shell, home, search, catalogs, detail templates, ERD, books+reader, academy+best practices, chat states, legal+error+empty, mobile+presentation, motion, polish | per family: gates, day/night, phone/desktop shots, focused review |
| 6 Review gates | reviewer reports in `reviews/` | every FAIL closed or listed as a real blocker |
| 7 Final | reports (a11y, perf, Astra, routes, content), FILES-CHANGED, DEPENDENCIES, BLOCKERS, REVIEW-GUIDE, MERGE-PLAN, FINAL-REPORT | Preview pushed, nothing claimed that was not measured |

## Decisions log

| date | decision | why |
|---|---|---|
| 2026-09-28 | Worktree at `neo-redesign`, real `npm ci` | Turbopack rejects a symlinked node_modules |
| 2026-09-28 | Baseline Astra = the production run of 6ba22207 (19:21 to 19:59Z) plus the local run of the identical tree (16:43Z) | same tree; re-running 35 minutes adds nothing; paths in BASELINE.md |
| 2026-09-28 | Directions shown as boards on real data, not as three parallel restyles of 23k lines of CSS | effort goes into one real implementation; boards stay reviewable in the Preview |
