# D2 · Enterprise Data Lab · TOKENS

Overlay files: `direction.css` (required), `direction.js` (inspector + query line, vanilla, no fetches, no timers).
Palette source: Color Director 02 §4.2. Contrast figures are the Color Director's measured numbers unless marked
"(computed here)": those were computed with a small WCAG 2.x relative-luminance snippet (`scratchpad/cr.mjs`) on 2026-10-02.
Baseline compared against: the export served on :4300 after the coordinator's workspace.css rebuild (module table
field cell, 68ch head column, 40rem S/4 list); the overlay does not re-fix those rules.

## 1. Palette (role · day · night)

| Role | Day | Contrast | Night | Contrast |
|---|---|---|---|---|
| Ground (bench) | `#eceff4` | | petrol `#09171f` | |
| Panel (raised) | `#ffffff` | | `#0f222d` (raised layer `#132a36`) | |
| Sunken well | `#e3e8ef` | ink-3 on it 5.05 (computed here) | `#0a1a23` | ink-3 on it 7.21 (computed here) |
| Console (accented) | navy `#0f1a2b` | white 17.46; secondary ink `#c9d9e4` 12.08 (computed here); cobalt sub-label `#9dbcff` 9.20 | pale `#e6f1f6` (exists only at night) | navy type 15.19; secondary ink `#33445a` 8.64, `#51627a` 5.41 (computed here); cobalt sub-label `#1d3fbf` 7.27 (computed here; the brief's `#2346d6` measures 6.26 and is kept for the night focus ring) |
| Ink 1 / 2 / 3 | `#0f1a2b` / `#33445a` / `#51627a` | 5.39 ground, 6.22 panel | `#e6f1f6` / `#b8ccd7` / `#90a9b7` | 7.40 / 6.64 |
| Action (brand) | `#d62027`, white label | 5.13 | `#ff5d5d`, label `#1a0705` | 6.48 |
| Link | `#00579a` | 6.44 | `#97c2f0` | 9.78 |
| Focus ring | `#2346d6` as a two-tone ring (2 px ground + 4 px ring) | ring vs console `#9dbcff` 9.20 | `#88c1ff`; on the pale console the ring is `#2346d6` | 6.26 vs pale (computed here); `#88c1ff` on pale would be 1.64 and is not used there |
| Selection | inverted row: navy fill, white text; bars/underlines cobalt `#2346d6` | 17.46 | inverted row: pale fill `#e6f1f6`, navy text; bars `#80b4ff` | 15.19 |
| PM | `#05726a` text; plate with white | 5.03 / 5.80 | `#4fd6c4`; plate with label `#1a0705` | 10.18 / 10.91 (computed here) |
| PP-PI / data | cobalt `#2346d6` text; plate with white | 6.24 / 7.20 | `#80b4ff`; plate with label `#1a0705` | 8.57 / 9.19 (computed here) |
| Amber (migration) | ink `#7a4a00` on `#ffe3a3` | 5.97 | `#f5c76a` on `#2a2210` | 9.93 |
| Green (kept) | `#0f6e42` on `#d7f1e2` | 5.28 | `#7ddba8` on `#0f2a1f` | 9.17 |
| Brick (removed / high risk) | `#a33a1a` on `#fbe3da` | 5.38 (computed here) | `#f39c80` on `#3a1d14` | 7.23 (computed here) |
| New / info | `#0b62a6` on `#dceaf6` | 5.18 (computed here) | `#70ccee` on `#0f2a3a` | 8.18 (computed here) |
| Control line | `#6b7a8f` | 3.79 | `#66808f` | 4.38 |
| Hairline / inset border | `#d5dbe5` | decorative | `#223845` | decorative |

Status families as text marks (`--s4-*`): keep `#0f6e42`, change `#9a5b00`, replace `#047480` 4.78, removed `#a33a1a` 5.73,
new `#0b62a6` 5.50, ecc-only `#536070`, verify ink-3; night `#72e1aa`, `#fac463`, `#5ad6d6`, `#f39c80` 8.56, `#70ccee` 10.02,
`#a9b4bd`, `#b4bec5`. Every family carries a second channel (the app's glyph + word in `.nu-status--g`).

### Fills used and their on-fill label (a11y seat 08)

| Fill | Day label | Night label |
|---|---|---|
| Navy console `#0f1a2b` (home doors, rail current row, inverted rows, reader rail head) | white 17.46; sub `#9dbcff` 9.20 | fill flips to pale `#e6f1f6`: navy 15.19; sub `#1d3fbf` 7.27 |
| Module plate `--m` (hero stat row, module chips, ERD focus node, hero code) | white: PM 5.80, PP-PI 7.20 | `#1a0705`: PM 10.91, PP-PI 9.19. Never white on a night fill. |
| Chips inside an inverted row | switch to night values `#4fd6c4` / `#80b4ff` with `#1a0705` (10.91 / 9.19) | switch to day values `#05726a` / `#2346d6` with white (5.80 / 7.20) |
| Risk tiles (S/4 chapter) | brick bg + `#a33a1a` 5.38; amber bg + `#7a4a00` 5.97 (`#9a5b00` measured 4.33 and was NOT used); green bg + `#0f6e42` 5.28 | `#3a1d14` + `#f39c80` 7.23; `#2a2210` + `#f5c76a` 9.93; `#0f2a1f` + `#7ddba8` 9.17 |
| Brand CTA `#d62027` / `#ff5d5d` | white 5.13 | `#1a0705` 6.48 |
| Amber as a stage ground (`.nw-s4stage`) | `#ffe3a3` with ink-1 (≥ 12) | `#2a2210` with ink-1 (≥ 12) |

Cobalt-on-navy trap: `#2346d6` on navy is 2.43 (measured by the Color Director); every cobalt on the navy console
is `#9dbcff` (9.20). Cobalt is never a large ground: it appears as 2 px underlines, 3 px bars, chip fills (≤ 24 px tall) and sub-labels.
Purple check: cobalt `#2346d6` is OKLCH h ≈ 266, C ≈ 0.20, allowed as the brief's named cobalt; no other hue in 240–330 with C > 0.04 is introduced.

## 2. Type roles (Plex only, no second face on operate screens)

| Role | Size / line | Weight | Face |
|---|---|---|---|
| display (home h1, module title) | 40 / 1.1 | 600 (see NOT VERIFIED: 700 is not bundled) | Plex Sans Hebrew |
| h1 (catalogue, ERD 24) | 28 / 1.2 | 600 | Plex Sans Hebrew |
| h2 / chapter title | 24–28 / 1.2 | 600 | Plex Sans Hebrew |
| prose (reader) | 17 / 1.7, measure 30em | 400 | Plex Sans Hebrew (book title keeps Frank Ruhl: the book's voice) |
| ui | 15 / 1.5 | 500–600 | Plex Sans Hebrew |
| meta, chips, status, kickers, table cells | 14 (the floor; `--t-micro` and `--t-xs` are raised to 14) | 500–600 | Plex Sans Hebrew |
| identifiers, counts, numerals | 14–22, tabular lining | 600 | Plex Mono |
| console numerals (home doors) | 20 | 600 | Plex Mono |
| chapter numeral in its well | 24 | 600 | Plex Mono, module colour |
| hero stat numerals on the plate | 22 | 600 | Plex Mono, on-plate label |
| ERD node labels | name 16 / focus 18; he, mod, zone, PK, FK 12 (floor) | 400–600 | the app's SVG text |

## 3. Three surface levels

1. Ground: the bench `#eceff4` / petrol `#09171f`.
2. Panel: raised white `#ffffff` / `#0f222d`, with `--elev-1` (`0 1px 0` tinted to the bench) or `--elev-2` (`0 1px 0` + `0 6px 16px -10px`, bench-tinted; at night a light inset top edge + dark drop). Sunken wells (search field, chapter numeral, query line, table head, ERD mini map, reader track) take `inset 0 1px 0` + an inset 1 px border instead of a hairline.
3. Accented: the navy console (home doors, rail current row, inverted rows, reader rail head) by day; at night the console flips to the pale field `#e6f1f6`, the only light region at night (the region that exists only in that theme).
One floating layer: the inspector (`--elev-3` + inset border). Non-transparent `--elev-1/2` in both themes.

## 4. Selection rule

Never red. A selected / current record is an inverted row (console fill + console ink; chips inside switch to the other theme's module values). Bars, tab underlines and the rail indicator's edge are cobalt (`--select-line`), 2–3 px. Focus is a separate language: a two-tone halo (2 px ground + 4 px ring), never an underline or fill, so selection (navy/pale area) and focus (cobalt/sky halo) differ in colour and in form. Pressed filters are cobalt-ruled wells, not a second dark fill next to the console.
Brand red appears once per first viewport: the primary CTA (`.nu-btn`); the empty state's first action takes it too, since no other CTA is on that screen.

## 5. Where the strongest colour owns a region, per screen

- Home: the KPI doors are the navy console band (white mono numerals leading, cobalt sub-labels, 48 px ruled rows); the search sits above it on the bench as a sunken well.
- Module: the hero stat row on a 100 % module plate (PM teal / PP-PI cobalt) with on-plate numerals; the active chapter tab is a cobalt underline; chapter numerals sit in sunken wells in the module colour; the S/4 chapter is amber's region: the stage on `#ffe3a3` / `#2a2210`, the headline count in amber ink, three filled risk tiles (brick / amber / green).
- Tables: module chips filled; the inspected row inverts; the stats are one ruled readout line (no tile grid); the query line is a sunken well.
- ERD: cool grid canvas; the focus node is filled with the module colour, its edges 3 px module colour; the map blocks are teal / cobalt / slate only; the viewport rectangle is cobalt.
- Reader: the rail head is the console readout (big mono percentage, cobalt caption) over a sunken track; the current chapter row inverts.

## 6. Signature motion (one per screen at most; transform/opacity only)

| Screen | Moment | Duration / easing | Reduced motion |
|---|---|---|---|
| Tables | list → record: the inspector arrives by `translateY(8px → 0)` + opacity; the hovered row inverts (120 ms colour) | 240 ms, `cubic-bezier(.2,.75,.2,1)` | no transition, no transform (appears in place) |
| ERD | neighbour dimming on focus: non-neighbours fade to .36 / .18 (opacity only); the camera glide is the app's own transform tween, untouched | 220 ms, same easing | no transition |
| Home / module / reader | none added (hover fills are 120 ms linear colour, no movement) | | |

No infinite animation, no shimmer: the loading skeleton is static blocks.

## 7. The interactive component

`direction.js` adds a floating inspector on the catalogue. Hovering or focusing a row clones that row's own cells (code, module chips, Hebrew name, zone, count chips, S/4 status word and its detail line) into the panel and marks the row `is-dl-sel` (the inverted selection). Leaving the list or blurring out of it hides the panel. It also builds a visible query line under the tools from existing text only: the selected view tab, the search input's value, every pressed facet filter with its facet label, the sort option, and the result count, joined by `AND` and `→`. It updates on input/change/click and when the list's children change. On phone the inspector is hidden (the row shows the S/4 detail inline instead).

## 8. Reward per screen

- Home: the console numerals, 1,818 and 105 as instruments rather than cards.
- Module: the stat plate and the chapter numeral wells; the S/4 risk tiles.
- Tables: the inspector preview and the query line.
- ERD: the filled focus node with its 3 px edges, and the three-family map.
- Reader: the margin status readout (percentage, track, ticks, meters) showing where the chapter sits in the book, from the existing progress figures.

## 9. NOT VERIFIED / could not do in the overlay

- Plex Sans Hebrew 700: the woff2 files sit in `app/fonts/plex-sans-hebrew/` but `app/fonts/plex.ts` registers only 400/500/600, so no 700 face is served from `out/`. Display and h1 use 600. NOT VERIFIED as 700.
- Six filled status-family tiles in the S/4 chapter: the exported DOM carries one headline count, three risk rows (high / medium / low, inline `--s`) and a trust sentence, not six family counts. The overlay tiles the three risk rows; six tiles would need markup. NOT DONE.
- The catalogue's "PK plate navy with white mono" on the table record page: outside the five pilot screens, not rendered. NOT VERIFIED.
- Pin and compare two tables (ERD compare-two): needs application state; not built.
- Camera glide (#29): the app's own tween; the overlay only sets the 220 ms opacity on dimming. Whether the glide ran in the recording is the render script's video, not checked by eye. NOT VERIFIED.
- The catalogue row is two lines on the 8 px grid (48 px identity line: code + module chip | name + zone | S/4 standing; 40 px data line: count chips | the S/4 note) rather than one 48 px line: at 1440 with the rail open the row has ~1,016 px and the code, name, five count chips, status, note and two actions do not fit one line without clipping. Nothing is clamped or ellipsised (the app's P0 of 2026-10-01: clipped text needs a way to the rest that is not a hover); a long S/4 note lets its row grow. The row rules are written at (0,4,0) because `data.css` lays the row out at that specificity inside its 1025–2199 px media block and its ≤ 78rem container query.
- The module chip shows the code only (`em` with the Hebrew module name hidden); the Hebrew name is in the inspector and in the facet filters. Content hidden, not clipped: NOTE for the judges.
- Inside every inverted row (`.is-dl-sel`, `.ne-row[aria-pressed]`, the reader's current TOC rows, the rail's current row, the module table's open row) the overlay re-maps `--ink-1/2/3`, `--link` and `--m` to the console inks so children with their own colour rules follow; chips keep their inline `--m` and flip to the other theme's module values.
- Hover / focus / tap / loading screenshots were produced by the render script with STATES=1 and inspected (tables hover with the inspector, tables loading skeleton, ERD focus). The EMPTY state screenshot shows the full list: the script's typed query did not filter the exported catalogue in the headless run, so the empty-state composition (`.nxd-none` as a raised panel with the first action in brand) is written but NOT VERIFIED by a render.
- The motion recordings (`video-no-preference/`, `video-reduce/`) were produced by the render script but not watched; the inspector's 240 ms arrival was judged from the static hover shot. NOT VERIFIED as video.
- Contrast of text on `color-mix()` hover fills (8 % console ink over the console) was not measured; the resting state is the measured one.
- Rendered day/night screenshots were inspected at 1440×900 and 390×844 only; 1728+ and tablet widths NOT VERIFIED.
