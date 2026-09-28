# Bakeoff · three directions

Three boards on real data, same spec (`BOARD-SPEC.md`), same 14 sections, built in parallel by three builders:

| direction | route | concept |
|---|---|---|
| A · Editorial Reference | `/design/redesign-2026/editorial/` | an edited technical reference: rules instead of boxes, a margin column for metadata, Frank Ruhl Libre headings, verification by underline style |
| B · Knowledge Workbench | `/design/redesign-2026/workbench/` | a professional tool: command input as the home, master-detail catalog, dense tables, IBM Plex Sans Hebrew and Plex Mono |
| C · Knowledge Atlas | `/design/redesign-2026/atlas/` | a connected map: modules as nodes sized by real table counts, processes as routes, a relation strip at the top of every record, Assistant and JetBrains Mono |

Motion prototypes (two signature moments on real data, direction-neutral): `/design/redesign-2026/motion/`.

## Method

1. Measured, not estimated: per board and configuration (1440 light, 1440 dark, 390 phone light, 390 phone dark, 1440 reduced motion) page overflow, console errors, failed requests, font bytes actually loaded, text under 12px; axe-core WCAG 2.2 A/AA at 1440 and 390 (phone user agent), light and dark. Tools: `neo-redesign-evidence/tools/board-shots.mjs`, `axe-routes.mjs`. Screenshots per section: `neo-redesign-evidence/bakeoff/`.
2. Three independent judges, each with one lens and no sight of the others' scores: enterprise UX (tasks and personas), visual and brand (typography, colour, anti-generic), accessibility, RTL and performance engineering. Each scores 13 criteria from 1 to 5 per board with a reason.
3. The orchestrator scores separately; the final score is the weighted mean of the four voices.

## Criteria and weights

| criterion | weight | what a 5 means |
|---|---|---|
| clarity | 1.5 | the first screen says what the site is and what to do next |
| originality | 1.0 | recognisably its own, not a template |
| SAP fit | 1.5 | codes, statuses, ECC and S/4 read the way consultants work |
| usability | 1.5 | tasks take few steps: find, filter, open, copy |
| Hebrew and RTL | 1.5 | natural RTL flow, isolated Latin, no bidi faults |
| information density | 1.0 | dense where work happens, calm where reading happens |
| accessibility | 1.5 | contrast, focus, targets, meaning without colour |
| performance | 1.0 | font and script weight, no layout shift |
| scale to thousands of pages | 1.5 | the pattern holds for 1,818 transactions and 3,200 NEO pages |
| day mode | 1.0 | calm, readable, not glaring |
| night mode | 1.0 | designed, not inverted, readable for hours |
| motion | 1.0 | explains relation or state, never decoration |
| free of generic AI look | 1.0 | no purple, no pills, no glow, no stock patterns |

## Measurements

Local build of the boards, 2026-09-29 (`neo-redesign-evidence/bakeoff/boards.json`, `axe.json`). Every board: 0 page overflow, 0 console errors, 0 failed requests, 0 text under 12px, in all five configurations.

| | Editorial | Workbench | Atlas |
|---|---|---|---|
| axe WCAG 2.2 A/AA, 1440 and 390 phone, light and dark | 0 | 0 | 1 serious at 390 (2 scroll regions without keyboard focus), light and dark |
| own font need (from code, per the engineering judge) | 3 families, 11 files, about 185 KB | 2 families, 9 files, about 122 KB | 2 variable families, 3 files, about 70 KB |
| page height, desktop / phone | 19,178 / 28,629 px | 15,078 / 24,056 px | 18,772 / 29,286 px |
| RTL faults found by the engineering judge | 0 torn parentheses | parentheses torn twice at 390 | 5 at 1440, 6 at 390, and 1:N shown as N:1 |

Measured font bytes in `boards.json` include other directions: the shared `app/fonts/fonts.ts` preloads every family it declares. Only the chosen families stay in the final system.

## Scores

Weighted totals (weights above; maximum 82.5). Per-criterion scores and reasons: `reviews/bakeoff-judge-ux.md`, `reviews/bakeoff-judge-visual.md`, `reviews/bakeoff-judge-eng.md`.

| voice | A Editorial | B Workbench | C Atlas |
|---|---|---|---|
| UX judge (enterprise-ux-reviewer) | 68.5 | 71.5 | 60.5 |
| visual judge (neo-sap-visual-designer, impeccable) | 65.0 | 68.0 | 61.0 |
| engineering judge (neo-accessibility-reviewer, enterprise-performance-reviewer) | 69.0 | 74.5 | 53.5 |
| orchestrator | 71.5 | 71.5 | 64.0 |
| **mean** | **68.5** | **71.4** | **59.8** |

Where the voices agree:
- Workbench leads on usability, density, scale, SAP fit and engineering (a combobox with aria-activedescendant, one shared status mark component, rem tokens, container queries). Its weakness is identity: "a developer tool", cool and clinical by day, originality 2 to 3.
- Editorial leads on identity: the warm paper day, the designed warm night, Hebrew typography, and complete accessibility on its own board. Its weaknesses: sparse catalog rows (about 76 px), decorative motion, a verification underline that reads like a link, the heaviest font set.
- Atlas leads on originality and motion (the map builds in order of meaning; focus highlights neighbours). It loses on RTL (raw data strings), on scale (hand-placed geometry, an uncapped relation strip above every record), and it adds dashboard metric cards and static shadows.

## Decision

**Base: B · Knowledge Workbench**, the highest mean and first for every voice except the orchestrator, which tied it. Its structure carries the product: the command input as the home, master-detail catalogs, 40 px rows, the shared status and verification marks, keyboard models, rem tokens and container queries.

Grafted, because each one fixes a weakness the judges named:

| from | what | why |
|---|---|---|
| Editorial | the warm colour system: paper by day, warm charcoal at night, instead of cool graphite | Workbench scored lowest on identity and a clinical day; the September audit asked to keep the warm ground |
| Editorial | Frank Ruhl Libre for display titles on gateway and reading screens only (home, books, reader, academy, knowledge articles) | identity where people read; work screens never download it |
| Editorial | rules before boxes on reading surfaces; the margin idea for record metadata | calmer reading, fewer cards |
| Atlas | build-in-order-of-meaning motion and neighbour focus, on the home process map and the ERD, transform and opacity only | the best-scored motion, made cheap enough for VDI |
| Atlas | the relation strip on records, capped at five neighbours per side with a "more" link, placed below the identifier | the most valued SAP insight, without pushing the identifier down |

Not taken: the verification underline (it reads as a link; Workbench's frame pattern instead), the giant section numbers (a known editorial trap), Atlas's metric cards, static shadows and hand-placed map geometry, the English board title and the cool graphite palette.

The two runners-up stay reviewable in the Preview at their routes, beside the motion prototypes.
