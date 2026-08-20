# NEO ERD — parity with the production Architecture Studio

Branch `design/neo-concept-d`. Preview route: `/neo/erd/`.

Production (`/sap-infrastructure/`) is **frozen**. `git diff main` across
`app/sap-infrastructure`, `components/object-workspace.tsx`,
`public/sap-infrastructure`, `lib/s4.ts` and `lib/knowledge-graph.ts` is empty.

---

## 1. Per-module parity

Measured live on both surfaces: production's own `N טבלאות · M קשרים` header
against NEO's rendered `.ne-node` / `.ne-edge` counts.

| module | OLD t/r | NEW t/r | match |
|--------|---------|---------|-------|
| PP     | 20 / 24 | 20 / 24 | yes |
| PP-PI  | 15 / 18 | 15 / 18 | yes |
| PM     | 17 / 23 | 17 / 23 | yes |
| MM     | 16 / 14 | 16 / 14 | yes |
| SD     | 12 / 11 | 12 / 11 | yes |
| QM     | 8 / 7   | 8 / 7   | yes |
| FI     | 11 / 11 | 11 / 11 | yes |
| CO     | 6 / 3   | 6 / 3   | yes |
| CS     | 7 / 6   | 7 / 6   | yes |
| BATCH  | 9 / 8   | 9 / 8   | yes |
| CLASS  | 7 / 7   | 7 / 7   | yes |
| IDOC   | 5 / 4   | 5 / 4   | yes |
| PIPO   | 5 / 2   | 5 / 2   | yes |
| HR     | 16 / 16 | 16 / 16 | yes |
| BW     | 16 / 15 | 16 / 15 | yes |

15 modules, 170 memberships, exact on both axes.

---

## 2. What was reused, verbatim

| reused | from |
|--------|------|
| the SAP model | `public/sap-infrastructure/dataset.json` — the same file production reads |
| S/4HANA standing | `s4For()` in `lib/s4.ts`, called at build time by `s4Standing()` |
| graph queries | `kgraph()` / `tableByName()` in `lib/knowledge-graph` |
| ERD membership | `ERD_MODULES` in `app/sap-infrastructure/meta.ts`, imported read-only |
| module palette | the 15 `--erd-mod-*` hexes, copied out of production |
| cross-module join | `#7c3aed`, production's violet, as `--erd-cross` |
| edge routing | the Manhattan elbow at `app/sap-infrastructure/page.tsx:1091-1094` — same midX vertical run, same `r = 12`, same `\|dy\| < 2` straight-line case |
| object graph geometry | `Graph()` in `components/object-workspace.tsx` — `W 760`, `NW×NH 176×54`, `ROW_H 74`, `PAD_Y 46`, `CAP 8`, `colX`, `yFor()` |
| directed reachability | production's `trace` helper, restated as `reach()` |

## 3. What could NOT be reused, and why

**Production's UI is not importable.** `app/sap-infrastructure/page.tsx` is a
single ~1,100-line `"use client"` component with its ERD, toolbar, node cards
and panels written as inline JSX. Nothing is exported. There was no component
to import, so the *formulas and constants* were ported and the markup was
rewritten against NEO's tokens. Every ported number is cited above.

**The layout engine cannot be shared.** Production imports `dagre` into the
browser and re-solves on every interaction. NEO solves at build time in
`erd-catalog.ts` (server-only, `node:fs`) and ships finished coordinates, so the
browser never loads a layout engine. This is a deliberate divergence, and it is
the reason multi-module needed its own answer (§4).

**`app/sap-infrastructure/meta.ts` was reverted.** HR and BW membership briefly
lived there and that was wrong: production's `UNIVERSE` already contains both
codes and reaches them through `erdMembers()`'s "top 16 by degree" fallback, so
adding the keys silently changed what the frozen graph draws. The lists now sit
in `erd-catalog.ts` as `NEO_ONLY_MODULES`, merged only for NEO's own read.

---

## 4. Multi-module — how NEO answers it differently

Production keeps `selMods: Set`, re-runs dagre per selection, and lets nodes
land wherever the new solve puts them.

NEO cannot re-solve, so `erdCatalog()` emits a third build-time picture: the
**union**, one dagre pass over the whole scope. Selecting several modules
filters that single solve to the selected curated lanes, then `compact()`
squeezes out the empty ranks and rows.

Two consequences worth stating plainly:

- **Better:** every table keeps one global position, so adding a module slides
  its lane into an unchanged picture. Production re-solves, so its nodes jump on
  every toggle.
- **Worse:** the packing is order-preserving, not a fresh crossing-minimised
  solve. Rank order and within-rank order are dagre's; the exact spacing is not.

Population is the union of the **curated** lanes, matching what a single module
opens with — `PM + PP = 17 + 20 − 11 shared = 26`, verified against the rendered
node set with no table missing and none unexpected.

---

## 5. Verification

- `tsc` 0 errors, `eslint` 0 errors (2 pre-existing `fitOnEnter` warnings, deliberate)
- static export builds; `out/neo/erd/` present
- 0 console errors on every module, focus, fullscreen and multi-module state
- 0 malformed edge paths across all 15 lanes
- offline: no remote `<script src>`, stylesheet, `<img>`, `<iframe>` or
  `@font-face src` in `out/`
- mobile 390×844: one-finger pan and pinch-zoom both drive the camera,
  0 horizontal overflow

### Known, deliberate

On entry the graph holds a legibility floor (`LEGIBLE_K = 0.72`) rather than a
true fit, so a large lane overflows the stage and is reached by panning, the
minimap, or the fit control — which is how the old graph behaves. Measured: PP
opens with 8 of 20 outside the stage; after fit-all, 0 outside.
