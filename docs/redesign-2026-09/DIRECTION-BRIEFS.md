# Direction briefs · Project NEO design recovery (2026-10-02)

Written by the Creative Director after the design council (reports in
`neo-redesign-evidence/r4-council/01…15`). Three art directions are built as
**isolated overlays**: one folder per direction under `design/directions/<id>/`
with `direction.css`, optional `direction.js`, `TOKENS.md`. Nothing under
`app/`, `components/` or `out/` is edited. The overlay is injected on the
real export by `render-direction.mjs` (five routes, day and night, 1440 and
390, state shots, one motion recording with and without reduced motion).

## What every direction must satisfy (owner's brief, verbatim constraints)

- Five screens: home `/neo/`, module `/neo/pm/` (all eight chapters, open and
  closed), tables catalogue `/neo/tables/`, ERD `/neo/erd/#AUFK`, reader
  `/neo/read/book9/`. Day and night. 1440×900 and 390×844.
- Colour roles, fixed: brand red = identity and the one primary action per
  first viewport; deep teal = PM; cobalt = PP-PI and data; amber = warnings
  and migration; controlled green = success. Status always carries icon + word.
- Forbidden (a breach is a BLOCKER): random rainbow, generic gradient, purple
  or violet anywhere (OKLCH hue 240–330 with C > 0.04; amendment after round
  1, judge 1: the brief's own named cobalt `#2346d6`, h≈266, is allowed on
  marks, chips, text and a selected row, never as a large ground), neon, glow,
  glassmorphism beyond a bounded backdrop on a fixed element, pill overload,
  texture or animation that hurts reading, night = day inverted, infinite
  animation, fake typing, tilt, decorative parallax.
- Floors: content text ≥ 14px, body ≥ 16px, ERD labels ≥ 12px, main targets
  ≥ 44×44, no overflow/clipping/overlap, text ≥ 4.5:1, marks ≥ 3:1, no new
  SAP data, Hebrew RTL intact, no CDN or remote asset (offline product).
- Three surface levels (ground / panel / accented region) with a visible
  difference in both themes. Day and night are two compositions: each has at
  least one region that exists only in that theme.
- One primary action per first viewport, findable in 3 s. One "reward" for
  exploring per screen. Hover, focus, tap, loading, empty states styled.
- Motion: one signature moment per screen at most, 120–240 ms micro,
  ≤ 480 ms complex, transform/opacity only, `prefers-reduced-motion` removes
  (not slows) it, no CLS. Pilot adapts at least three old-NEO motions
  (`OLD-NEO-MOTION-INVENTORY.md`): ERD camera glide (#29, 460 ms cubic-out,
  interruptible), neighbour dimming (#33/#41, 220 ms opacity), rail active
  pill with directional trail (#15, 240 ms ease-out, no `height` animation).
- P0 stays: explicit chapter-head grid, 68ch cap, 0 px title/sentence
  offset, no widows (`.nw-ch-s { text-wrap: balance }`).
- Typography base (Typography Director §6, common to all three): Plex Sans
  Hebrew 400/500/600/700 (700 face must actually load), Plex Mono for
  identifiers at text size, no uppercase, no italics, tracking 0 on Hebrew,
  tabular lining figures wherever numbers are compared, body 16 → 17 at
  ≥ 1440 → 18 at ≥ 1728, chrome at 12–13 only, content floor 14.

## What the council agreed is wrong today (the problems each direction answers)

| # | Finding | Source |
|---|---|---|
| 1 | The art direction was a token swap over a frozen template: 701 middle dots, ~200 arrows, 35 eyebrows, one radius on 207 rules, 188 hairlines, zero elevation anywhere | CD 01 |
| 2 | PM page 99.4 % neutral pixels, brand 0.46 %, PM teal 0.02 %; the module "room" never arrives; migration (the product's reason) drawn in grey | Color 02, CD 01 |
| 3 | Night is a per-token inversion; the night ERD overview paints 15 modules in 15 low-chroma hues | Color 02, Visual designer 12 |
| 4 | "Selected" spoken in four languages (brand tint+bar, brand fill, ink fill, ink underline); one SAP value, five chip styles; status only as 7 px dots | Visual designer 12 |
| 5 | Collapsed chapter heads: two-edge composition with a dead middle (coverage 0.17–0.28), primary action a 13 px link, `<summary>` name ~40 words, no preview | Layout 03, UX 05 |
| 6 | Six navigation layers and three search boxes before the first content; hero routes named as objects not tasks; home doors read as statistics | UX 05 |
| 7 | 12–13 px dataset text on four screens; all `font-weight: 700` render as 600; code sequences laid out by paragraph direction | Typography 04 |
| 8 | ERD: no 3-second primary action in overview, 99 labels under 12 px at default fit, controls cover nodes; tablet rank rows lose the bar but keep its caption; reader at 1728 54 % empty sheet | Layout 03, UX 05 |

Keep (council "must not change"): the ERD night canvas (dash march, single
ring, 1:1 badges, node card, left object panel with the red CTA); the
five-scene rule; the P0 head grid; the catalogue row's zero-click S/4 standing
and Smart Return; the chapter as the one unit below the hero and
`useHashOpen`; the reader's honest resume; the Plex/Frank type system with its
measured fallbacks; the home process map as the first reward.

## Direction D1 · Editorial Technology

**In one sentence:** a precise technical journal; ink on ivory, one reading
column, rules instead of boxes, SAP codes as marginal notes, red as the
editor's pencil.

1. **Composition.** A journal grid: columns separated by vertical rules,
   running heads, folios. One reading column of 62–68ch with wide margins;
   codes and counts sit in the margin beside the column, never as chips in
   it. The fold replaces collapsed chapters ("המשך בעמוד …" as a device).
2. **Rhythm.** Sections separated by rules of three weights (hairline, 2 px,
   8 px editorial bar), never by cards. Titles in Frank Ruhl Libre 700
   (display 44/1.1, h1 32/1.2), h2 Plex 600 22, lead 19, body 17, ui 15.
3. **Depth.** Flat ink on paper with exactly one raised layer, the command
   palette. No card shadows. Surfaces: ground ivory `#f6f2ea`, panel
   `#fffdf8`, accented = the ink masthead `#16130e` (day) / ivory rule
   `#eef1f6` on navy (night, the only inverted region).
4. **Colour** (Color 02 §4.1 table is the token sheet): ground ivory / night
   ink-navy `#0e1721` (h252, deliberately off both module hues). Brand
   `#d62027` / night `#ff5a52` on the one CTA, numerals, pull-rules and the
   running head. Selection = sand `#efe4cf` + 3 px ink bar, never red. PM
   `#0a6a60` / `#4fd6c4`, PP-PI `#1f49c7` / `#9db8ff` as a thin band in the
   running head and a 56 px filled module column beside each chapter head
   with white numerals. Amber `#7a4a00` on `#ffe9b8`. Link steel `#00579a`.
5. **Where colour owns a region:** home: a 96 px ink masthead band with the
   title in ivory and the brand mark, the search field on it. Module: the
   module column beside each chapter head; hero eyebrow rule in `--m`.
   Tables: the PK/FK key plate filled with the owning module hue. ERD: focus
   node filled 100 % `--m`, white text; the black "17 PM tables" button
   becomes an outline. Reader: red is the folio (chapter numeral, progress
   rail); TOC current row sand + ink bar.
6. **Interaction.** Hover on any SAP code shows a footnote (description +
   S/4 status) in the margin; keyboard jumps between folios; signature moment:
   the masthead process map drawn as a rule that **draws itself once** on
   home entry (≤ 480 ms, stroke-dashoffset via transform-free SVG is not
   allowed, so use opacity + `scaleX` on rule segments; reduced motion: static).
7. **Reward per screen:** the margin footnote (module), the folio ladder
   (reader), the masthead map (home), the key plate (tables), the filled
   focus node with a one-line "why this table" note (ERD).

## Direction D2 · Enterprise Data Lab

**In one sentence:** an instrument panel; master/detail on every screen, a
cool bench with one navy console, chromatic colour only on data marks, night
is the native mode.

1. **Composition.** Master/detail everywhere: list on the inline end, record
   beside it; a persistent status bar; an 8 px grid; identifiers in mono
   leading every row. Nothing centred.
2. **Rhythm.** Dense and tabular, fixed row heights (40/48), 14 px UI with 16
   px only in prose; many things per viewport, all on the grid. No second
   face: Plex Sans Hebrew 700 display 40, h1 28, h2 20 at 600; Plex Mono 600
   for codes (the codes are the content). Tabular numerals 20–24 px / 500 in
   tiles, labels 14.
3. **Depth.** Real layers: sunken wells (inset 1 px top shadow), raised
   panels (`0 1px 0` + `0 6px 16px -10px` tinted to the bench hue), one
   floating inspector. Inset borders instead of hairlines. Surfaces: ground
   `#eceff4` cool grey, panel `#ffffff`, accented = navy console `#0f1a2b`
   (day) / pale console `#e6f1f6` (night only).
4. **Colour** (Color 02 §4.2 is the token sheet): night ground petrol
   `#09171f`, panel `#0f222d`. Brand only on the CTA. Selection = inverted
   row (navy fill, white text; chips inside switch to night values). PM
   `#05726a` / `#4fd6c4`, PP-PI cobalt `#2346d6` / `#80b4ff` as data series.
   Status families as **filled tiles**: keep `#0f6e42`, change `#9a5b00`,
   replace `#047480`, removed `#a33a1a`, new `#0b62a6`, ecc-only `#536070`.
   Module colours beyond PM/PP-PI collapse to slate on any map.
5. **Where colour owns a region:** home: the KPI row becomes the navy console
   band with white numerals and cobalt sub-labels. Module: the hero stat row
   on a 100 % `--m` plate with white numerals; active chapter tab = cobalt
   underline. Tables: PK plate navy with white mono, module chips filled. ERD:
   cool grid canvas, focus node filled `--m`, relation edges 3 px `--m`, map
   blocks teal/cobalt/slate only. S/4 chapter: six filled amber-family tiles,
   the status strip (one 12×12 cell per table) as the chapter's navigation.
6. **Interaction.** Inspect-on-hover everywhere (a row hover shows its
   record's first three fields in the inspector); pin and compare two tables;
   filters stack as a visible query line; signature moment: **list → record**
   (the old NEO `rec-morph`, 240 ms transform/opacity) and the ERD camera
   glide with neighbour dimming.
7. **Reward per screen:** the inspector preview (tables), the query line
   (tables/module), the console numerals (home), compare-two (ERD), the
   reader's margin status bar showing where the chapter sits in the book.

## Direction D3 · SAP Knowledge Playground (re-dosed)

**In one sentence:** rooms; each module is a room with a visible ground, a
board of large tiles, oversized numerals, the family colours as full-strength
fills, tiles that lift.

1. **Composition.** Rooms: the module hero band carries a ≥ 20 % module wash
   (day) and a deep saturated plate (night: PM `#0a3a35`, PP-PI `#13265e`);
   the chapter index is a board of large entry tiles; the process map is a
   tangible board of chips. Fewer, bigger things per viewport.
2. **Rhythm.** Generous: 24–32 px titles, two-column boards, chapters open
   with large entry tiles. Display Assistant 800 (already in
   `app/fonts/assistant`), h1 Assistant 700 30, h2 Plex 600 22, lead 18, body
   16/17, ui 15. Frank stays in the reader only.
3. **Depth.** The only direction allowed visible shadows on content: tiles
   lift on hover (`--elev-2`, tinted `rgba(46,34,20,.22)` day; light edge +
   3 % L lift at night), stacked chips, a drawer layer for previews.
   Surfaces: ground paper `#fbf8f1`, panel white, accented = module scene
   PM `#e3efea` / PP-PI `#e4eaf8` (day) and the hero plate (night only).
4. **Colour** (Color 02 §4.3 is the token sheet; Visual designer 12 adds A's
   rule "selection never red"): brand `#d62027` / `#ff645d` is the only filled
   red per viewport. Selection = the row's own family (`--sel-bar: var(--m)`,
   fill 14 % `--m`), active tab 2 px ink underline. PM `#00756a` / `#5cddc4`,
   PP-PI `#2346d6` / `#95b6ff`, amber `#885400` on `#ffeec2`, green `#10744a`
   on `#dcf3e6`, brick `#8e3a20` on `#fbe3da`. Status families as filled
   tiles. Chapter numerals back in `--m` at 700.
5. **Where colour owns a region:** home: the two-flow diagram, PM lane on
   `#e3efea` with chips filled teal + white code, PP-PI lane on `#e4eaf8`
   with cobalt chips. Module: hero + chapter index on the scene ground, the
   "01 מפת המודול" chip filled `--m`. Tables: module chips filled, PK plate on
   the scene ground. ERD: night map blocks by family, focus band `--m`. S/4
   chapter and migration: amber owns the status strip. Reader: the book's
   module colour on the spine (TOC rail, chapter numeral), red only on
   "המשך קריאה".
6. **Interaction.** Play: hover a code for a mini-record, a trail of visited
   objects, progress rings on chapters, flip a chapter tile to its S/4 status;
   signature moment: **the room's colour entering** on module entry (a 240–400
   ms opacity tint layer, the old NEO scene ground adapted; reduced motion:
   already there), plus the ERD camera glide + neighbour dimming.
7. **Reward per screen:** the chips board (home), the tile flip (module), the
   mini-record on hover (tables), the glide (ERD), the spine progress ring
   (reader).

## Shared to-do inside each overlay (so the judges compare like with like)

- Strip template tells in the overlay's reach: hide the duplicate ⌘K hint,
  reduce arrows on inline links to none (keep the CTA's), neutralise the
  tinted eyebrow icon, make `--elev-1/2` non-transparent where the direction
  uses elevation.
- Collapsed chapter: one composition, one ≥ 44 px target (the whole band,
  Layout S2), a teaser of ≥ 3 real items from the chapter's own data is **not**
  possible in CSS alone; the overlay may surface existing figures
  (`.nw-ch-stat`) larger, never invent.
- Tablet/phone: single column under 52 rem canvas; bottom action bar ≥ 44 px.
- Loading state: style `html[data-state="loading"]` on the catalogue
  (skeleton rows, no spinner). Empty state: the catalogue's "no results"
  block gets a direction-specific composition with a next action.
- Night: at least one region that exists only at night; no pure `#000`.
- Document in `TOKENS.md`: the palette (day/night per role with measured
  contrast), type roles, the three surface levels, the signature motion with
  duration/easing/reduced behaviour, and what the overlay could not do in CSS
  (listed as NOT VERIFIED, never faked).

## Judging

`neo-redesign-evidence/r4-directions/SCORECARD.md`. Folders are handed to the
judges as D1/D2/D3/B; the key stays in `KEY.txt` outside the judged folders.
