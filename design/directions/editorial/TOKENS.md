# D1 · Editorial Technology — tokens and decisions

Overlay files: `direction.css` (injected after the app's CSS), `direction.js` (the margin footnote, vanilla, no fetches).
Baseline compared against: the rebuilt export on :4300 of 2026-10-02 (after the coordinator's workspace.css table fixes: fields cell, description clamp, relief band, 68ch head column, S/4 list cap, topic label line). The overlay does not restate those table rules. Final render (`work/editorial/`, 20 shots + states + two motion recordings): 0 failed, 0 console errors. A later rebuild (module table column widths in the laptop band) landed after that render; it is outside the overlay's reach and was not re-rendered.

In one sentence: a precise technical journal. Ink on ivory, one reading column, rules of three weights instead of boxes, SAP codes as marginal notes, red as the editor's pencil. Night is a lit desk (navy paper, warm ivory ink, the red kept), not an inversion.

## 1. Palette (Color Director 02 §4.1; contrast as measured there)

| Role | Day | Night |
|---|---|---|
| Ground | ivory `#f6f2ea` | ink-navy `#0e1721` (h252) |
| Panel (raised) | `#fffdf8` | `#151f2b` |
| Accented surface | ink masthead `#16130e`, ivory type `#eef1f6` 16.59:1 | ivory masthead `#eef1f6`, navy type `#0e1721` 16.24:1; raised selection `#223050` |
| Ink 1 / 2 / 3 | `#16130e` / `#433c33` / `#5d554a` (ink-3 6.57 on ground, 7.21 on panel) | `#eef1f6` / `#c4cbd9` / `#9ba5b9` (7.29 / 6.81) |
| Brand (action) | `#d62027` fill, white label 5.13; as text `#b4141c` 6.15 | `#ff5a52` fill, label `#1a0705` 6.35; as text `#ff8f85` 8.34 |
| Link | steel `#00579a` 6.65 | `#8fb5ff` 8.95 |
| Selection | sand `#efe4cf` + 3px ink bar `#16130e` (14.70) | raised `#223050` + 3px ivory bar; no red tint anywhere |
| PM | `#0a6a60` text 5.80; plate with white 6.47 | `#4fd6c4` text 10.29; plate with ground ink 10.29 |
| PP-PI | `#1f49c7` text 6.63; plate with white 7.40 | `#9db8ff` 9.40 |
| Amber | ink `#7a4a00` on `#ffe9b8` 6.27 | `#f5c76a` on `#2a2210` 9.93 |
| Green | `#136d44` on `#d9f2e3` 5.38 | `#7ddba8` on `#0f2a1f` 9.17 |
| Control line | `#7f766a` 4.00 | `#6f7b91` 4.31 |
| Status families | keep green · change amber · replace `#056c74` · removed brick `#8e3a20` · new link-steel · ecc-only / verify ink-3; always icon + word | the app's night `--s4-*` values, unchanged |

Colours the overlay added beyond §4.1, with contrast computed by a node snippet (WCAG relative luminance) on 2026-10-02:

| Added | Value | Measured |
|---|---|---|
| Recess `--surface-2` day | `#ede8dc` | ink-3 6.00, ink-1 15.15 |
| `--background-2` day (the table rail band) | `#efe9dd` | ink-3 6.07 |
| Recess `--surface-2` night | `#0a111a` | ink-3 7.65, ink-1 16.74 |
| Raised `--surface-raised` night | `#1a2634` | ink-1 13.53 |
| Hairline day / night | `#d8d0c2` / `#27333f` | 1.37 on ground: decorative only, never the sole carrier of a boundary that matters (rules that carry meaning are 2px ink) |
| Brick on its ground day / night | `#8e3a20` on `#fbe3da` / `#f39c80` on `#3a1a18` | 6.16 / 7.37 |
| Text on sand (day): ink-3 / link / brand-ink | | 5.82 / 5.89 / 5.45 |
| Text on raised selection (night): ink-3 / link | | 5.28 / 6.36 |
| Brand as a mark on ground day / night | `#d62027` / `#ff5a52` | 4.59 / 5.88 |
| Focus ring vs ground day / night | `#2346d6` / `#88c1ff` | 6.44 / 9.56 |

### Fills and their on-fill labels (a11y seat 08)
- Day module fills (chapter column, catalogue code plate, ERD focus node): PM `#0a6a60` + white (6.47), PP-PI `#1f49c7` + white (7.40). Never ink-1 on a day fill.
- Night module fills: PM `#4fd6c4`, PP-PI `#9db8ff` + the dark label `#1a0705` (10.91 / 9.97). Never white on a night fill.
- Brand fill: day white label (5.13), night `#1a0705` (6.35). Amber is never used as a fill in this overlay (text + amber ground only).
- Focus on fills: two-tone ring, `outline: 2px solid transparent; box-shadow: 0 0 0 2px <ground>, 0 0 0 4px <ring>`. On the brand button the ring is ink-1 (16.59 vs ground); on every other control it is `--focus` (6.44 / 9.56 vs ground). The module column and the code plate are not interactive themselves; their host (the summary band, the catalogue row) carries the ring on the ground.
- Every family colour has a second channel: module = code text in the plate; status = glyph + word; selection = fill + 3px bar; the fold = dashed rule + "הצגת הפרק" outline button.

## 2. Type roles (Typography 04 §6.A)
Root ramp: `html { font-size: clamp(16px, 12px + .347vw, 18px) }` from 1440 (17 at 1440, 18 at 1728).

| Role | Face | Size / leading |
|---|---|---|
| display (home title, module title) | Frank Ruhl Libre 700 (variable 300–900, bundled) | 44 / 1.1 |
| h1 (chapter head, reader chapter) | Frank 700 | 32 / 1.2 |
| h1 on work screens (tables, ERD) | Plex Sans Hebrew 600 | 32 / 1.2 (no serif on an operate surface) |
| h2 | Plex 600 | 22 / 1.35 |
| lead | Plex 400 ink-2 | 19 / 1.6 |
| body | Plex 400 | 17 / 1.7 (16 under 1440) |
| ui | Plex 500 | 15 |
| meta / chrome | Plex 400 ink-3 | 14 (the floor; `--t-micro/--t-xs/--t-sm` = `max(14px, .8235rem)`) |
| identifiers | Plex Mono 500/600 at the surrounding size, `direction: ltr`, tabular lining figures everywhere | |

Measure 30em (`--measure`); reader 31 × size (62–68 characters). No uppercase, no italics, tracking 0.
NOT VERIFIED: Plex Sans Hebrew 700 is not bundled (`app/fonts/plex-sans-hebrew` holds 400/500/600 only; `out/_next/static/media` has no 700 file). Where the brief says Plex 700 the browser synthesises or clamps to 600. Frank 700 is real (variable file).

## 3. The three surface levels
| | Day | Night |
|---|---|---|
| Ground | ivory `#f6f2ea` | navy `#0e1721` |
| Panel | `#fffdf8` (reader sheet, ERD inspector, catalogue field, footnote) | `#151f2b` |
| Accented | ink masthead `#16130e` (home) + the module column / plate in `--m` | ivory masthead `#eef1f6` (home, night-only region) + the module column / plate in night `--m` |

Depth: flat. `--elev-1/2` paint nothing; the command palette keeps `--elev-4` as the one raised layer. No card shadows, no gradient (the odd-chapter tint gradient is removed), no glow, no glass.

## 4. Selection rule
Selection = sand `#efe4cf` + 3px ink bar (night `#223050` + ivory bar). Applied through `--select-bg/--select-line/--sel-bg/--sel-bar` so the rail, the section bar, the tabs underline, the catalogue filters, the reader TOC and the ERD list all speak one language. Never red. `::selection` is sand too. Pressed filter = sand + ink line (the ink block is gone). Hover = sand (rows), a 55% sand on table cells so hover and selection differ.

## 5. Where the strongest colour owns a region
- Home: the 96px ink masthead (title, lede, the search field in ivory, the example codes) with the brand as a 4px rule under it. Night: the same band in ivory on navy, the only inverted region in the product.
- Module: the 56px module column beside every chapter head (white numeral by day, ground-ink numeral by night); the hero eyebrow is a 3px rule in `--m`; the one red fill is "התחלה מ-AUFK"; the folio "01 / 08" in brand-ink text.
- Tables: the key plate = each row's code on a plate filled with the owning module's hue (the one filled module element of the row), module chips ink-outlined with a 3px `--m` rule.
- ERD: the focus node filled 100% `--m` with on-fill labels and an ink ring; context nodes outlined on the panel; the black "17 PM טבלאות" button and its count are outlines; the inspector's red CTA is the one brand fill.
- Reader: red is the folio: "פרק 1" in brand-ink with a 3px brand rule, the progress rail fill and the percentage in brand; TOC current row sand + ink bar.

## 6. Signature motion
- Home: the lane rule under each process-map title draws itself once on entry, `scaleX(0 → 1)`, `transform-origin` at the inline start (100% 50% in RTL), 480ms `--ease-emphasis`, the second lane 160ms later. Transform only, no layout, no CLS. `prefers-reduced-motion: reduce` → `animation: none`, the rule is static.
- ERD: neighbour dimming through the existing `data-lvl` / `data-focus` opacity ladder, transition set to 220ms (old NEO #33/#41). The camera glide (#29) lives in the app's JS and was not changed.
- Everything else: 160ms micro (footnote fade + 4px rise), 220ms base.
- NOT VERIFIED in a still: the renders run with reduced motion, so the stills show the finished rule; the motion recording (`video-no-preference`) covers the module and the ERD, not the home entry.

## 7. The interactive component: the margin footnote (`direction.js`)
Hover or focus on any `.nw-sap`, `.nx-sap`, `.nh-sap`, `.nxd-id > b`, `.nu-chip.is-sap`, `.fm-code`, `.nr-sec-n` shows a footnote (panel, 2px ink top rule, 3px brand start rule) built only from text already in the host row: the catalogue row's `.nxd-he` + `.nxd-s4-t`, the module table's `.nw-c-he` + `.nw-c-s4`, the rank row's title + count, the map node's label, the S/4 move's description. Keyboard: `focusin` on the host row or the code shows it, Escape hides it, `role="status"`. Placed in the inline-end margin beside the code; when the margin has no room it sits under the code. On a full-width catalogue row the margin is inside the row, so the footnote floats over the row's own cells for the duration of the hover (a transient layer, like the ERD's node card).

## 8. Reward per screen
Home: the masthead map drawing its rule. Module: the margin footnote on any code, and the counts standing in the margin of a folded chapter. Tables: the key plate. ERD: the filled focus node (the "why this table" line is the inspector's existing description; no note was invented). Reader: the folio ladder (red numeral, red progress rail, sand TOC).

## 9. Template tells stripped
Rail ⌘K hint hidden everywhere; on home the top bar's hint is hidden too (the gate carries the one). `.nx-eyebrow`, `.nh-eye`, `.ne-eye`, `.nw-ch-k` (kicker + tinted icon tile) hidden; the module eyebrow is a rule. Arrows removed from `.nu-link` and the breadcrumb; the CTA and the catalogue row's drill chevron keep theirs. No middle dot added (the ones in content remain). All radii 0. The ink-filled pressed filter is gone.

## 10. Floors checked (ed-shot.mjs audit, 1440 and 390, day and night)
Text in `<main>` ≥ 14px on every screen after the `max(14px, …)` floor (reader `.nr-end` restated at 14); ERD labels 12–13px SVG; no element wider than the viewport except the section bar's horizontal reel (its own scroller, `scrollWidth` = viewport). Contrast as tabled above. No purple (every hue used is listed). Zero console errors in the final render.

## 10b. Round 2 changes (judges' deductions, 2026-10-02)
1. Module hero: `.nw-figs` is a ruled figure grid (2px ink rules top and bottom, hairlines between, 4 columns on a desk, 2 at 390), numerals mono 1.65rem over their label and the sub-count in mono; no orphan at 390 ("90 טרנזקציות" sits in its own cell). The running section bar is 60px tall, items ≥ 44px, the folio "01 / 08" at 1.15rem brand-ink ruled from the reel, the current chapter sand + 3px ink bar. Evidence: `r2-module-figs.png`, `r2-module-figs-dark.png`, `module-phone-light.png`.
2. Catalogue row recomposed as one journal line: `grid-template-areas: "id body nums go" / "id s4 nums go"` (plate + module chips at the start, name + description beside it, the S/4 glyph + word + note on its own line under the description with a hairline, counts as a mono tabular marginal note at the end with a rule, one chevron). Written at `html .nx-app .nxd[data-surface] .nxd-row` because data.css scopes its row rules by surface. Phone: one column (plate + chip, name, S/4, counts), the row keeps the corner of its second action. Evidence: `r2-tables-row.png` (with the footnote), `r2-tables-phone.png`.
3. ERD header: one row (measured: id 318 + search 246 + tools 552 did not fit 1126, so the search narrows to 11rem, the title stays on one line at 1.2rem with the mode chip beside it and the count line under it = two lines, the tool groups one row; the breadcrumb ladder is hidden since the top bar carries it). The title carries a 3px module rule: `--ms` is scoped on the nodes only (measured empty on `.ne-bar-t`), so direction.js copies the focused node's computed `--ms` onto the title block after load and after a click; ink when no table is focused. Evidence: `r2-erd-bar.png` (day), `r2-erd-bar-dark.png` (night, cyan rule).
4. Interactivity: the footnote now also answers `.ne-node-n` (ERD node code) with the node's own `.ne-node-he` + PK text from the DOM, `.nw-id` (hero code → the English name), and any code without a known host falls back to its nearest block's own text; focus on the ERD's `.ne-node-go` or a catalogue row picks the row's code first; the footnote transition is 120ms. The collapsed chapter's summary is a full-width band (sand on hover/focus, 120ms) and its "הצגת הפרק" control inverts to ink on hover. Evidence: `r2-module-code-hover.png`, `r2-erd-focus.png`, `r2-fold-hover.png`. The home rule-draw is a plain CSS animation on `.fm-title::after`, so it runs at first paint (or at overlay injection), not on an intersection trigger.
5. SAP fit: tables and ERD titles stay Plex 600; the catalogue counts are a bench line (mono tabular, unit beside the number, right-ruled), status glyph + word at the start of its line; nothing centred.
6. Phone: figures in two columns, no orphan.
7. Kept: ink/ivory masthead, three rule weights, the 56px module column, sand + ink bar, filled code plates, the red folio, no shadows, no gradients.

## 11. NOT VERIFIED / could not do in an overlay
- Plex Sans Hebrew 700 not bundled (see §2).
- The ERD camera glide is app JS; untouched, only the dimming duration changed.
- A collapsed chapter's ≥ 3-item teaser needs data; the overlay only enlarges the existing `.nw-ch-stat` figure in the margin.
- The reader's "one measure" is the app's own 31 × size; it was confirmed, not changed.
- The record page (`/neo/tables/AFKO/`) is not one of the five screens; its PK/FK key plate was not rendered. The catalogue's code plate is the key-plate device on this screen.
- `:has()` is used once (home top-bar hint); fine in the project's Chromium, untested elsewhere.
- Loading and empty states styled on `html[data-state="loading"]` and `.nxd-none`; the empty composition's first action ("הצגת כל הטבלאות") is the one brand fill of that viewport. The render script's "empty" step fills the rail's search box, not the catalogue's, so its `tables-*-empty.png` still shows the list; the real empty state was rendered with `ed-shot.mjs` (`work/editorial/x-tables-empty-light.png`, `x-tables-empty-dark.png`). Loading: `tables-desk-light-loading.png`.
- Extra evidence shot with the helper: `x-module-tbl-light.png` (chapter 02 table), `x-module-fold-light.png` (collapsed chapters, summary hover), `x-module-s4-dark.png`, `x-tables-hover-light.png` (the footnote on ADMI_RUN), `x-reader-dark.png`, `x-module-tbl-phone.png`.
