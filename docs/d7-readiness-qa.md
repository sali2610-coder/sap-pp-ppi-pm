# Final Design QA — D7 Readiness

Verified screen-by-screen (markers + live screenshots, 0 console errors / 0 external
requests on every page). D4 = UI/elevation/cards · D5 = motion · D6 = search/highlight.

| # | Page | Route / surface | D4 | D5 | D6 | Score |
|---|---|---|:--:|:--:|:--:|:--:|
| 1 | Home | `/` (hero + command-center) | ✓ | ✓ reveal/count/spotlight | ✓ palette + FAB | **94** |
| 2 | PM | `/pm/` cockpit (hub + zones + cockpit table) | ✓ | ✓ tab pill + AnimatePresence + row-in | ◐ ?q + global ⌘K | **92** |
| 3 | PP-PI | `/pp-pi/` cockpit | ✓ | ✓ | ◐ | **92** |
| 4 | Blueprint | `/pm/` Blueprint tab (technical-blueprint) | ✓ | ✓✓ (13 motion refs) | ✓ Highlight | **95** |
| 5 | Guides | `/pm/` Guides tab (module-directories) | ✓ | ✓ | ✗ no highlight (nav lists) | **90** |
| 6 | Objects | `/object/[name]` (object-workspace) | ✓✓ | ◐ tab-fade only | ◐ Highlight×3 + find-flash | **91** |
| 7 | Data Model | `/sap-infrastructure/` → module → "מודל נתונים" | ✓ | ✓ animations | ✓ infra search | **92** |
| 8 | ERD | `/sap-infrastructure/` ERD graph | ✓ | ✓ flowline/draw anim | ✓ | **92** |
| 9 | Business Flow | `/process-explorer/` (+ object flow tab) | ✓ | ◐ card fade only | ✗ no in-page search/highlight | **89** |
| 10 | Dependencies | `/object/[name]` → "קשרים" (kgraph + blast radius) | ✓ | ✓ motion | n/a (graph) | **92** |
| 11 | Impact | `/impact/` (TablesExplorer) | ✓ | ◐ minimal (no row stagger) | ✓ search + filter | **90** |
| 12 | **Lineage** | **no dedicated page** — only implicit in relations/ERD | ◐ | ◐ | ◐ | **84** |

## Per-page visual debt + D7 recommendation
1. **Home (94)** — debt: hero is strong but static below the fold pre-scroll. D7: executive summary band (live migration % ring, top-objects spotlight).
2. **PM (92)** — debt: new cockpit header bar occluded by sticky toolbar on scroll; D6 only via global palette. D7: `scroll-margin` fix; per-zone status sparkline.
3. **PP-PI (92)** — same as PM. D7: same.
4. **Blueprint (95)** — debt: minimal. D7: column-level field spotlight on hover.
5. **Guides (90)** — debt: no yellow highlight when filtering. D7: wire Highlight into directory filter.
6. **Objects (91)** — debt: in-page tabs are static (only fade on switch); find term not yellow-highlighted inside content (relies on flash). D7: stagger tab content; in-content Highlight.
7. **Data Model (92)** — debt: dense; weak focal hierarchy. D7: depth/elevation on focused entity, dim others.
8. **ERD (92)** — debt: graph legend/anchors subtle. D7: stronger node hierarchy + mini-map anchor.
9. **Business Flow (89)** — debt: index cards static; no search/highlight; flow steps lack motion. D7: animated step reveal + searchable steps with Highlight. **Below 90.**
10. **Dependencies (92)** — debt: blast-radius reads as static. D7: animated edge draw + hover-isolate path.
11. **Impact (90)** — debt: table lacks row stagger/skeleton; no executive "blast summary" card. D7: row-in stagger + impact-summary card (N downstream, N tcodes).
12. **Lineage (84)** — debt: **no first-class Lineage page exists**; lineage is only implied via the object relations graph + ERD edges. **Below 90 — main gap.** D7: build a dedicated Lineage view (source → object → downstream consumers, ECC→S/4 data-flow).

## Readiness
- **9 of 12 pages ≥ 90.** Average ≈ **91**.
- **Below 90:** Business Flow (89), **Lineage (84)**.
- Auto-start condition ("all pages > 90") is **NOT met** — Lineage has no dedicated surface, Business Flow is borderline.

**Conclusion:** do **not** auto-start D7. Recommend D7 explicitly include: (a) a first-class **Lineage** view, (b) **Business Flow** motion + search, plus the executive-wow items above. Awaiting go.
