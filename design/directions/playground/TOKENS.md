# D3 · SAP Knowledge Playground (re-dosed) · tokens and decisions

Overlay only: `direction.css` + `direction.js`, injected after the app on the rebuilt
export served at :4300 (the baseline for comparison is the export rebuilt on
2026-10-02 with the module-table fixes; nothing in this overlay touches those rules).
Nothing under `app/`, `components/` or `out/` was edited.

Every hex below comes from council 02 §4.3 unless marked "computed here". Contrast
values marked §4.3 are the Color Director's measurements; the others were computed
with a small Node WCAG snippet (relative luminance, sRGB) during this build.
`color-mix` fills are approximated in sRGB; the live oklab mix differs by a few
hundredths.

## 1. Palette per role

| Role | Day | Night | Measured |
|---|---|---|---|
| Ground | paper `#fbf8f1` | petrol `#0c181d` | base, unchanged (§4.3) |
| Panel (tiles, rows, sheet) | `#ffffff` + `--elev-2` | `#1b292f` (raised) + light edge | ink-1 on panel 15+ / 14.4 (§4.3 base) |
| Accented: module room (day) | PM `#e3efea`, PP-PI `#e4eaf8` | not used as a floor at night | ink-1 15.31 / 14.98; ink-3 6.10 / 5.97; PM text on PM room 4.74; PP-PI text on PP-PI room 5.97 (§4.3, re-computed) |
| Accented: night hero plate (night only) | none | PM `#0a3a35`, PP-PI `#13265e` | white 12.58 / 14.32; hero ink-2 `#d9ebe7` 10.18, ink-3 `#b7d1cc` 7.79 on PM; `#dbe3f7` 11.14, `#bcc8ea` 8.58 on PP-PI (computed here); mint `#5cddc4` 7.54, `#95b6ff` 7.10 (§4.3) |
| Night selection / lane fills | | PM `#0f2c28`, PP-PI `#15213f`, neutral `#1b292f` | ink-1 12.87 / 13.75; mint on PM 8.92; `#95b6ff` on PP-PI 7.88 (computed) |
| Ink 1 / 2 / 3 | `#19160f` / `#453e33` / `#5f564a` | `#ebeff2` / `#c7cfd3` / `#a4aeb4` | §4.3 |
| Brand (the one filled red per viewport) | `#d62027`, label white 5.13 | `#ff645d`, label `#1a0705` 6.72 | §4.3 |
| PM fill | `#00756a` + white 5.60 | `#5cddc4` + `#1a0705` 11.70 | §4.3 / computed |
| PP-PI fill | `#2346d6` + white 7.20 | `#95b6ff` + `#1a0705` 9.67 | §4.3 / computed |
| Amber (migration kicker, S/4 strip) | fill `#885400` + white 6.33; strip `#ffeec2` with ink `#885400` 5.51 | fill `#fac463` + `#1a0705` 12.21; strip `#2c2612` with `#fac463` 9.43 | a11y 08 / §4.3 / computed |
| Green (kept) | `#10744a` on 14% tint 4.77 | `#72e1aa` on 14% tint 7.48 | computed |
| Danger (high risk) | `#b4141c` on 14% tint 5.36 | `#fa8880` on 14% tint 5.56 | computed |
| Verify / replace tiles | `#5f564a` 5.84, `#056c74` 5.00 on their 14% tints | night `--s4-*` on their tints | computed |
| ECC side of the seam (slate) | `#536070` 6.41 on white | `#a9b4bd` 7.08 on `#1b292f` | computed |
| Link | `#00579a` | `#97c2f0` | §4.3 |
| Control line | `#82786a` | `#72838c` | §4.3 |

Label-on-fill rule (a11y seat 08): `--on-fill` is `#ffffff` by day and `#1a0705` by
night; every filled element in this sheet (module chips, kicker chip, title code,
lane chips, rail/ERD chips) reads `var(--on-fill)`. Amber as a fill is `#885400`
(never `#b26a00`). Every family colour carries a second channel: the word on the
status tile, the code in the chip, the numeral beside the bar.

Focus (a11y seat 08): every tile and filled control takes a two-tone ring,
`outline: 2px solid transparent; box-shadow: 0 0 0 2px <gap>, 0 0 0 4px var(--ink-1)`.
The gap is the surface the element sits on (white panel 18.06 vs ring; night panel
14.36), and on the lanes the lane colour (PM room vs PM fill 4.74, vs PP-PI fill
5.97; night 8.92 / 7.88), so the ring is never judged against the fill alone.

## 2. Type roles

| Role | Face | Size / weight |
|---|---|---|
| Display (home h1) | Assistant 800 (`assistantHe`/`assistantLat`, bundled variable 200-800, already declared by the export) | existing clamp |
| Module title, chapter title | Assistant 700 | title clamp(2rem, 4.2cqi, 3.25rem); chapter clamp(1.5rem, 3cqi, 2.5rem) |
| Oversized numerals (chapter 01-08, tile numerals, hero figures, collapsed-chapter figure, S/4 "8", door counts, rail %) | Assistant 800 (Latin instance, tabular digits) | 2.25rem tiles; clamp(2.5rem, 4cqi, 3.5rem) chapter head; 1.75rem hero figures |
| Body | Plex Sans Hebrew 400 | 16px, chapter sentence and index lede raised to 16 |
| UI, chips, status, meta | Plex 500/600/700 | 14px floor everywhere the overlay reaches (chips, sub-lines, TOC, meters, ERD panel) |
| Identifiers | Plex Mono | row code 16px, mini-record code 18px |
| Reader titles | Frank Ruhl Libre (kept, reader only) | unchanged |

Plex Sans Hebrew 700: NOT bundled (`app/fonts/plex-sans-hebrew` holds 400/500/600;
`out/_next/static/media` the same). Every `font-weight: 700` on Plex still renders 600;
the overlay therefore puts its heavy weights on Assistant, which does load at 800.

## 3. Three surface levels

| Level | Day | Night |
|---|---|---|
| Ground | paper `#fbf8f1` | petrol `#0c181d` |
| Panel | white tiles with `--elev-2: 0 1px 2px rgba(46,34,20,.10), 0 6px 16px -10px rgba(46,34,20,.22)` | `#1b292f` tiles with `inset 0 1px 0 rgba(255,255,255,.06)` + `0 1px 0 rgba(0,0,0,.3)` |
| Accented | module room `#e3efea` / `#e4eaf8` behind the hero, the chapter board and the section bar; amber `#ffeec2` behind the S/4 strip; the lanes on home | the hero plate `#0a3a35` / `#13265e` (exists only at night); amber `#2c2612` strip; night lanes `#0f2c28` / `#15213f` |
| `--elev-1` | `0 1px 0 rgba(46,34,20,.08)` (lanes, S/4 strip) | `inset 0 1px 0 rgba(255,255,255,.06)` |
| Lift (hover) | `--elev-lift: 0 1px 0 rgba(46,34,20,.06), 0 10px 28px -14px rgba(46,34,20,.30)` on a pre-painted `::after`, opacity 0 → 1 | `inset 0 1px 0 rgba(255,255,255,.09), 0 10px 28px -14px rgba(0,0,0,.7)` |

Day composition: tinted room, white work table, full-strength family fills.
Night composition: petrol everywhere, the hero plate is the one region that exists
only at night; the day room wash does not exist at night.

## 4. Selection rule

Selection = the row's own family, never red: fill `color-mix(in oklab, var(--m) 14%, var(--surface))`
(day PM `#dbecea`, ink-1 14.79; PP-PI `#e0e5f9` 14.40; night PM `#1e3a3c` 10.52,
PP-PI `#263544` 10.84; the 3px `--m` bar on the day PM fill 4.58 as a mark) plus a
3px inline-start bar in `--m` (`inset -3px 0 0` on the RTL page; the section bar and
`.nm-sel` keep the primitive's own `::before` bar, recoloured, and no second bar);
neutral rows `#f2f1ee` / `#1b292f` with an ink bar.
Applied to `.nm-sel[data-on]`, `.nu-card[aria-current]`, `.nu-filter[aria-pressed]`,
`.nxc-chip[aria-pressed]`, the rail indicator `.nx-ind` (PM/PP-PI family through
`:has(.nx-navitem[aria-current][data-mod])`), the ERD `.ne-row[aria-pressed]`, the
reader `[data-now]` and `[data-on]` TOC rows and tick. Active tab: 2px ink underline.
`background: var(--brand)` stays legal only inside `.nu-btn`; one brand fill per first
viewport (module: the AUFK CTA; tables: none in the list, the empty state's
"הצגת כל הטבלאות"; ERD: the object CTA; reader: none; home: none).

## 5. Where the strongest colour owns a region

- Home: the two-flow board. PM lane on `#e3efea` with chips filled `#00756a` + white
  code and label; PP-PI lane on `#e4eaf8` with cobalt `#2346d6` chips. The module
  tiles (`.nh-mod`) carry a 6px band in their colour and their counts in `--m` at 800;
  the seven reference doors are 1fr white tiles with `--elev-2`. (The export has no
  PM/PP-PI door inside `.nh-doors`; the module entries are the `.nh-mod` tiles, so the
  "2fr / 1fr" split is expressed as module tiles vs reference doors.)
- Module: hero + chapter board + section bar on the room (`#e3efea`), chapter numerals
  `01…08` in `--m` at 800, the kicker chip filled `--m` + white (`--warning` for the S/4
  chapter), the title code `PM` filled, hero figures in `--m`; the only red is the CTA.
  Night: the hero plate `#0a3a35` with white title.
- Tables: module chips filled `--m` + `--on-fill`; the ECC|S/4 seam under every code
  (slate | status colour, 4px, keyed by `data-status` through `:has()`); status tiles
  on their family's 14% fill. PK plate on the scene ground belongs to the record page,
  which is not one of the five screens: NOT VERIFIED.
- ERD: night map blocks by family only (PM teal, PP-PI cobalt, every other module slate
  `#a9b4bd`, written with `!important` on `--m/--ms` because the export inlines them);
  the filter trigger and the inspector's pressed row in the family fill; the red CTA kept.
- S/4 chapter: amber owns the strip (`#ffeec2` / `#2c2612`), the "8" in amber, the risk
  tiles and bars in the feedback families (re-keyed from the inline `#dc2626/#d97706/#16a34a`).
- Reader: the book's module colour on the spine: TOC current chapter + section rows
  (room fill + `--m` bar), the track band/fill, the `פרק 1` numeral in `--m` at 800, the
  `PM` chip filled, the progress ring stroke; no red anywhere on the screen.

## 6. Signature motion (one per screen, transform/opacity only)

| Screen | Moment | Duration / easing | Reduced motion |
|---|---|---|---|
| Module | the room's colour entering: `.nw-hero::before` and `.nw-idx::before` are pre-painted with the room colour and fade in once | 320ms, `--ease-out` cubic-bezier(.2,.75,.2,1), `both`, runs once on entry | `animation: none; opacity: 1` (the room is already there) |
| Home, module, tables | tile lift: `translateY(-2px)` + a pre-painted `::after` shadow whose opacity goes 0 → 1 | 160ms linear (opacity), 160ms ease-out (transform) | the app's reduced-motion rules leave transform transitions; the shadow is static once painted (no CLS, nothing paints per frame) |
| Tables | the mini-record: one reused element, opacity 0 → 1 | 160ms linear | shows without the fade |
| ERD | the app's neighbour dimming: `.ne-node`/`.ne-edge` opacity transitions set to 220ms linear (#33/#41); the camera glide (#29) is the app's own rAF tween and is not reachable from CSS | 220ms | the app removes it |
| Reader | none added (the ring is static) | | |

No bounce (`--ease-spring` is remapped to `--ease-emphasis`), no infinite animation,
no box-shadow transition anywhere (perf 15 §2).

## 7. Interactive component and per-screen reward

- Home: the chips board (the lanes as filled tiles that lift).
- Module: the chapter board opens by itself on a wide canvas (`direction.js` sets
  `.nw-idx-d` open at ≥ 834px) and its tiles lift; the collapsed chapter is one tile,
  one ≥ 44px target, with its own figure oversized in `--m`. The tile flip to S/4
  status was NOT built (it needs data the chapter head does not carry).
- Tables: the mini-record on hover/focus (`direction.js`): built only from the row's
  own cells (code, module chips, Hebrew name, zone line, counts, S/4 status and note,
  the seam), one element reused, hidden on leave/blur/Escape, not on touch screens.
- ERD: the family-only night map + the app's own neighbour dimming.
- Reader: the progress ring, drawn from the existing `.nr-rail-pct` number (SVG
  circle, dashoffset), stroke in `--m`.

## 8. Template tells stripped in the overlay's reach

Rail ⌘K hint hidden everywhere; on home the top bar's hint also hidden (the gate
carries the one hint). Arrows on `.nu-link` and the return link hidden (CTA arrows and
the one chevron per catalogue row kept). `.nx-eyebrow` untinted; the chapter kicker's
icon tile removed; no middle dots added; radius ≤ 8px (tiles 8, controls 6, chips 2-4,
no pills).

## 9. NOT VERIFIED / could not do in the overlay

- Plex Sans Hebrew 700 is not bundled; Plex at 700 renders 600 (heavy roles moved to Assistant).
- The record page's PK plate (`/neo/tables/<code>/`) was not rendered (not one of the five screens).
- The ERD camera glide (#29) is the app's rAF tween; the overlay only sets the dimming
  duration. In the dark ERD extra shot the scripted click did not land on a visible
  node, so neighbour dimming with the overlay was not observed; only its CSS is in place.
- ERD label floors: the overlay sets 13px SVG units on node sub-labels, but on-screen
  size depends on the fit scale, which CSS cannot change; label size at default fit is NOT VERIFIED.
- The `.nxd-none` empty state was rendered through a separate script (the shared
  renderer's `input` selector hits the rail search first); the composition in the
  shared `-empty.png` therefore shows the full list, the real one is in `extra/tables-empty-*.png`.
- The home door split "2fr module / 1fr reference" could not be literal: the export's
  `.nh-doors` has no module door; module presence is the `.nh-mod` tiles.
- `color-mix` contrasts are sRGB approximations of the oklab mix (listed as "computed").
- The "המשך קריאה" resume action is not in the exported reader page at 0% progress, so
  "red only on the resume" is asserted by absence (no red elsewhere) and not by a render of it.
- Night: every night family fill uses `#1a0705` as its label; the night `::selection`
  and the command palette were not touched or checked.
