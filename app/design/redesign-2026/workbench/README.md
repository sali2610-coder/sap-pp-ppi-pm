# Knowledge Workbench · direction board

Route `/design/redesign-2026/workbench/` (`?mode=dark` opens the night system; `window.__setMode("dark" | "light")` switches it). `noindex, nofollow`.

| File | Role |
|---|---|
| `page.tsx` | Server page: metadata, the 14 sections, root `.rb.rb-workbench` |
| `data.ts` | Server-only shaping of real data through the site's accessors; reads the token blocks of `board.css` for the swatches and the contrast table |
| `marks.tsx` | Shared marks: status, verification level, module, code, bidi isolation |
| `client.tsx` | Client islands: mode toggle, copy, command palette (sections 3 and 13), catalog, ERD modes, demo actions |
| `board.css` | All tokens and styles, scoped to `.rb-workbench`; contrast comment table at the top |

## What makes this direction different

- **A tool, not a magazine.** Search is the centre of gravity: the home hero is a command input, and the palette is the signature. Panels and dense 40px table rows replace decorative cards; the catalog is master-detail (list plus a preview that follows the selection).
- **Keyboard first, and it works.** Arrow keys, Home/End, Enter and Esc drive the palette (combobox with `aria-activedescendant`); arrows move the catalog selection; keycaps show the model everywhere it applies and hide on touch-only devices.
- **One status grammar.** S/4HANA status uses the site's own grouping (`S4_STATUS_GROUP`) as five families plus two the data already uses, each with glyph, word and colour. Verification uses a shield family plus a border pattern (solid, dashed, dotted, double), so both read in grayscale. Section 10 has a no-colour toggle to prove it.
- **Graphite and one red.** Cool neutral ground; brand red only for action and selection (the selected row's bar, the active segment); blue for focus and links. Night is its own tuned system, not an inversion.
- **Plex everywhere, Mono for every SAP identifier.** Codes sit on their own line in record headers with a copy action.
- **Precise motion, 100 to 160ms**, transform and opacity only, never looping.

## Palette and contrast

Core tokens (the full set, 70 tokens, is in `board.css` and in section 00):

| Token | Role | Light | Dark |
|---|---|---|---|
| `--canvas` | Page ground | `#F2F3F5` | `#0E1014` |
| `--panel` | Panels, tables | `#FFFFFF` | `#15181D` |
| `--raised` | Headers, preview | `#F8F9FA` | `#1B1F25` |
| `--sunken` | Hover row | `#ECEEF1` | `#20252C` |
| `--ink-1` | Primary text | `#15171B` | `#E5E7EB` |
| `--ink-2` | Secondary text | `#4B515C` | `#A3A9B3` |
| `--ink-3` | Muted text (>=4.5) | `#5C636E` | `#959BA6` |
| `--line-2` | Panel edge, separators | `#DCE0E5` | `#2A2F37` |
| `--line-strong` | Control boundary | `#7C8490` | `#6B7380` |
| `--action` | Primary action, selection bar | `#C8242B` | `#FF6166` |
| `--action-text` | Red text (active filter) | `#B8222A` | `#FF7479` |
| `--select-bg` | Selected row | `#FCEDEE` | `#2B1A1C` |
| `--link` | Links | `#1F5FBF` | `#7FB0F5` |
| `--focus` | Focus ring | `#1F5FBF` | `#7FB0F5` |
| `--st-keep` | S/4 keeps | `#1B7A46` | `#5CC98A` |
| `--st-change` | S/4 changes | `#8A5800` | `#E3A83F` |
| `--st-replace` | S/4 replaced | `#0F659A` | `#5AAEE3` |
| `--st-removed` | S/4 removed | `#B3261E` | `#FF8078` |
| `--st-verify` | S/4 needs verification | `#56606D` | `#A3A9B3` |
| `--st-past` | S/4 ECC only | `#6B5F56` | `#B9AEA5` |
| `--mod-pm` | Module PM | `#0E7A6C` | `#3FBCA8` |
| `--mod-pppi` | Module PP-PI | `#2C5E9E` | `#79A4E0` |
| `--mod-pp` | Module PP | `#587A1C` | `#9DC152` |
| `--edge-verified` | ERD stated relation | `#3B4250` | `#C3C8D0` |
| `--edge-unverified` | ERD unstated relation | `#6B7380` | `#8C94A0` |

Computed ratios (WCAG relative luminance, from the token blocks; 84 pairs checked in both modes, 0 below threshold; the full list is the comment at the top of `board.css` and the table in section 00):

| Pair | Min | Light | Dark |
|---|---|---|---|
| `ink-1` on `canvas` | 4.5 | 16.16 | 15.38 |
| `ink-1` on `panel` | 4.5 | 17.94 | 14.37 |
| `ink-2` on `panel` | 4.5 | 7.98 | 7.53 |
| `ink-3` on `canvas` | 4.5 | 5.46 | 6.82 |
| `ink-3` on `sunken` | 4.5 | 5.21 | 5.52 |
| `action-ink` on `action` | 4.5 | 5.61 | 6.05 |
| `action-text` on `select-bg` | 4.5 | 5.60 | 6.33 |
| `link` on `panel` | 4.5 | 6.09 | 7.99 |
| `st-keep` on `sunken` | 4.5 | 4.61 | 7.47 |
| `st-change` on `st-change-bg` | 4.5 | 5.39 | 7.50 |
| `st-replace` on `panel` | 4.5 | 6.27 | 7.29 |
| `st-removed` on `select-bg` | 4.5 | 5.75 | 6.79 |
| `st-verify` on `panel` | 4.5 | 6.38 | 7.53 |
| `focus` on `canvas` | 3 | 5.49 | 8.55 |
| `line-strong` on `canvas` | 3 | 3.40 | 3.98 |
| `kbd-line` on `kbd-bg` | 3 | 3.78 | 3.46 |
| `mod-pp` on `panel` | 3 | 4.98 | 8.63 |
| `edge-unverified` on `panel` | 3 | 4.78 | 5.81 |
| `paper` on `cloth-2` | 4.5 | 8.78 | 8.78 |

No token has a hue between 240 and 330 degrees at 20% saturation or more (checked by script, both modes). Book cloths are the board's own 12 dark bindings; `booksData().cloth` was not used because it includes plum and slate-violet.

## Fonts

- IBM Plex Sans Hebrew for all UI and reading, 400/500/600: `plexHe` (Hebrew range) and `plexLat` (Latin range).
- IBM Plex Mono for every SAP identifier, keycap and count column: `plexMono` (400/500/600 loaded; identifiers set at 500 and 600).
- Font stack caveat, worth fixing in the system phase: `next/font/local` appends an automatic `"<family> Fallback"` face (local Arial, no `unicode-range`) to each family variable. Stacked as `var(--f-plex-he), var(--f-plex-lat)`, that Hebrew fallback catches every Latin glyph before Plex Latin, so Latin renders in Arial. The board builds its stack from the primary family names instead (`plexHe.style.fontFamily`, `plexLat.style.fontFamily`), giving `'plexHe', 'plexLat', 'plexHe Fallback', "Segoe UI", system-ui, sans-serif` (verified in the rendered HTML).

## Data sources, and what could not be sourced

Accessors: `homeData`, `txDetail` / `txDetailCodes` / `txStatusMap`, `tableDetail`, `bpDetail` / `bpList`, `booksData`, `neoLessonData`, plus `cdsDetail` (the site's CDS accessor, not on the BOARD-SPEC list) for the S/4 status of the two CDS results. The reader paragraph is read server-side from `public/books/book1/ch1.json` (section 1.1.1, first plain paragraph under 600 characters, 296 characters, verbatim).

Gaps and decisions, all stated on the board where they apply:

- **Book count.** `homeData().books` reports 10 (the legacy library registry); the NEO shelf (`booksData()`) holds 11. The board uses 11.
- **Transaction count.** The catalog has 1,818 codes (`txDetailCodes()`); `homeData().tcodes` is 148, the codes mapped in the two dictionaries. Both appear, each labelled.
- **Best practices and processes.** `homeData()` has no best-practice count, so it comes from `bpList()` (35, of which 33 carry a process profile). "Processes" on Home and in the shell are `homeData().flows`: the two end-to-end chains (PM 9 steps, PP-PI 8 steps). There is no separate process catalog to count.
- **Search.** The site's search engine (`runQuery`) is a client module and cannot run on the server, so the AFKO results are built from `tableDetail("AFKO")`: the table itself, the transactions the blueprint maps to it, the CDS views reading it and its ER neighbours, each group labelled with that basis and its real total.
- **Catalog.** The 12 suggested codes are shown as a pasted code list with a real module filter (10 PM rows, CO11N and COR1 are PP and filtered out), sorted by the dataset's cross-reference count (`popularity`, labelled "הפניות בגרף").
- **IP30H.** Its `typicalFlow` is empty; the steps shown are its own `process` line split on its own arrows, and the board says so. Its English name is empty and shows "לא מתועד במאגר".
- **AFKO fields.** GSTRP and PLNBEZ have no data type or length in the dictionary; shown as "לא מתועד במאגר".
- **ERD solid versus dashed.** The dataset has no per-relation verification flag. The board uses the dictionary's own stated cardinality (`1:1`, `N:1`) as solid and the relations recorded without cardinality as dashed, and the legend says exactly that.
- **Status families.** The five family words are the board's; membership is the site's `S4_STATUS_GROUP`. That grouping puts `deprecated` ("לא אסטרטגי", for example IP30) in the "gone" family, so rows always print the dataset's own label, never the family word. `s4_native` (IP30H) and `legacy_ecc_only` are shown as two extra families. No transaction currently sits at the "חלקי" verification level (count 0).
- **Reader.** Book 1 has no Hebrew chapter or section titles, so they show in English and the page says why. "Progress" is the excerpt's position in the book (section 2 of 140), not a reading state.
- **Continue, recent, pinned.** The board has no device state, so these are honest empty states.
- **Legal page.** Contact, dates, coordinator, scope, standard and known limitations are `REQUIRES_OWNER_INPUT`. Nothing is claimed about compliance.

## Checks run

- `./node_modules/.bin/tsc --noEmit --incremental false`: clean. `./node_modules/.bin/eslint --max-warnings=0 app/design/redesign-2026/workbench`: clean.
- Rendered through an existing dev server (a scratch copy of the repo; `next build` was not run). Measured in Chrome at 1440 (desktop user agent) and 390 (iPhone 13 emulation), light and dark: 0 elements past the viewport, 0 text under 12px (ERD labels 12.4px on the phone), 0 letter-spacing on Hebrew, 0 console errors, 0 unintended clipping with both palettes expanded. All 20 internal links return 200. Reduced motion: no animations, final states shown at once, focus and selection still visible.
- The page sits inside the legacy site shell. With a desktop user agent at 390px its knowledge sidebar stays open and squeezes every legacy page, board included, which is the site's desktop-first device detection; the phone checks above use a phone user agent.
