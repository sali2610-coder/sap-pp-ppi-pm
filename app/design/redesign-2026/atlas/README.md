# Knowledge Atlas (אטלס הידע) · direction board

Route: `/design/redesign-2026/atlas/` (`?mode=dark` for night, or `window.__setMode("dark")`).

## What makes this direction different

The knowledge base is drawn as one connected map, and every screen opens with its place in it.

- **Home is a map, not a dashboard.** The 15 modules of the ERD catalogue are nodes. Each node is a cluster of small squares, one per table in that module's catalogue picture, so node size is a real count you can see. Lines between modules are measured table relations (the catalogue's own threshold of 4 or more), stroke width by count. By default each module shows its two strongest links; focusing a module shows all of them with their numbers.
- **Processes are routes.** A best practice is drawn as a route through the modules its steps reference (a table by its catalogue module, a transaction by its registry module), with numbered stops. The tables the steps name light up inside their module's cluster, and a timetable under the map lists them.
- **Records open with a relation strip** (upstream, the object, downstream) built from real relations: AFKO from its parent and child relations (dashed where the cardinality is blank), IP30H from IP30's declared successor and the tables its record names.
- **Breadcrumbs are paths** with module-coloured stations and a red "אתה כאן" pin; a table documented by two modules (AFKO) shows a fork.
- **Catalog rows carry relation counts** (tables, neighbouring transactions, references in the relation graph), and the catalogue is sorted by them.
- **Books are atlas volumes** on one shelf: cloth with a faint graticule, spine shade, and a page block whose thickness comes from the book's page count. The reader shows the book as a strip map of its chapters (width by section count) with the current chapter marked.
- **Signature motion** (section 13): the map builds in order of meaning, modules 0-340ms, the process route 340-700ms, the tables 720-990ms, then focus highlights a module's neighbours and dims the rest. Nothing loops. With reduced motion the map is drawn complete from the first frame and focus uses outlines plus a text line that lists the neighbours, with no dimming.

## Palette and contrast

Every colour is a custom property on `.rb-atlas[data-mode="light|dark"]`; the palette panels in section 0 reuse the same tokens through `[data-palette]` scopes. The full computed table is the comment at the top of `board.css` (WCAG relative luminance, not estimated).

| token | light | dark | lowest ratio over canvas/surface/sunken/paper (light · dark) |
|---|---|---|---|
| canvas / surface | #F4F6F5 / #FFFFFF | #0B1316 / #121C20 | |
| sunken / paper | #EBF0EE / #EEF3F1 | #0E181B / #0F1A1D | |
| ink-1 | #11201F | #E2EBE9 | 14.58 · 14.26 |
| ink-2 | #4A5A58 | #9FB0AD | 6.30 · 7.66 |
| ink-3 | #556563 | #93A5A2 | 5.32 · 6.72 |
| code | #1B3533 | #CFE0DC | 11.37 · 12.66 |
| link | #0A5A78 | #79C3E3 | 6.64 · 8.85 |
| action (you are here) | #C8242B | #FF6166 | 4.87 · 5.90 |
| keep / change | #17693C / #8A5300 | #5DCB8C / #E3A74A | 5.84, 5.49 · 8.56, 8.16 |
| replace / removed / verify | #1D5AA0 / #9A2A22 / #556563 | #86B4F2 / #F28B80 / #93A5A2 | 6.03, 6.68, 5.32 · 8.10, 7.24, 6.72 |
| line-2, edge (UI, 3:1) | #738481 | #6A7E83 | 3.41 · 4.06 |
| action-ink on action | #FFFFFF | #0B1316 | 5.61 · 6.39 |

Module colours (15 on the map, 5 more for books) avoid the 240-330 hue band and are placed so map neighbours differ; the lowest module contrast is MM 4.13 (light) and HR 7.12 (dark), all above 3:1. Book cloths are the same in both modes (a cover is an object); cover text is at least 6.55:1. A script checked every computed colour of the rendered board in both modes: none sits in the 240-330 band at 20% saturation or more.

## Fonts

Assistant (`assistantHe`, `assistantLat`) for UI and reading at 400/500/600/700; JetBrains Mono (`jbMono`) only for SAP identifiers, isolated left to right. Reading text 17-18px, UI 14-15px, nothing below 12px (measured in the render, SVG text included after scaling).

## Data

Every number, name and relation comes from the site's accessors: `homeData`, `txDetail` / `txDetailCodes` / `txStatusMap`, `tableDetail`, `bpDetail` / `bpList`, `booksData`, `neoLessonData`, `erdCatalog`. Three additions, stated here: the search section reads the S/4 status of the CDS and BAPI rows from `cdsDir()` and `bapiDir()` (the directories the shell's search index uses, since `tableDetail` names those objects without a status); the lesson table of contents uses `orderedBlocks` and `BLOCK_META[kind].he` (the emoji there are not used); the reader paragraph is read server side from `public/books/book2/ch1.json`, section 1.1, the first plain paragraph under the heading (489 characters, verbatim).

Derivations, all from the data: the five S/4 states are the product's own `S4_STATUS_GROUP` (keeps, changes, moves, gone, open) and the canonical label is always printed verbatim next to the icon; the four verification levels map `sap_official_verified` and `repository_verified` to מאומת, `supported_secondary_source` and `legacy_context_only` to חלקי, `verification_required` to דורש אימות, `conflicting_sources` to סתירה. Status counts are over all 1,818 registry transactions.

## What the data could not supply

- **Catalog rows.** The rows are the real top 10 of a real filter (module PM or PP, 371 transactions) sorted by references in the relation graph, so the filter chips, sort and count are all true. That puts IW31, IW32 and CO11N from the suggested list on the board but not IP30H or IA05; IP30H appears as the record.
- **IP30H flow.** `flow` is empty, so the board shows the three steps of the record's own `process` line and says the step-by-step flow is not documented. It has no transaction neighbours in the relation graph; its upstream is IP30, whose evidence record names IP30H as successor.
- **ERD "verified vs unverified".** The catalogue holds no verification level per relation. Solid means the cardinality is stated, dashed means it is blank, and the legend says exactly that. `CDS_AnalyticalView` is a BW node of the catalogue with no dictionary page.
- **AFKO fields.** GSTRP and PLNBEZ carry no data type or length; shown as missing.
- **Books.** `homeData().books` is 10 because the legacy library index (`data/library`) lists the PM business-user guide once, while `booksData()` holds 11 (that guide is book8 and book9, two schemas). The board shows 11 with the twin note. book8 has no page count, so its thickness is neutral and the cover says pages are not documented.
- **Verification "חלקי".** No registry transaction currently sits at that level (0 of 1,818).
- **Accessibility statement.** Contact, coordinator, dates, standard and conformance level are `REQUIRES_OWNER_INPUT`; nothing is filled in.
- **"Continue" slots.** No per-device state exists on a board, so they explain when they appear instead of showing a record.
- **Map geometry.** Module positions are schematic (found offline by a layout search that keeps every drawn link and route clear of other nodes); only the links, counts and widths are data.
