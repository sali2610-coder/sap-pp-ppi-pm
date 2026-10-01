# Gate 10 (Impeccable finish), round 3

Date: 2026-10-01. Branch `design/neo-experience-redesign`, round 3 = commits after `2031581e` (HEAD `c44a9a25`). Evidence: `r3/final2/shots/` (84 shots), `r3/final2/motion-rest.json`, before `r3/art-shots/current-*.png`, `r3/layout-before/`. Read-only review: no server, browser or build was run. I opened 9 shots at full size (1440 day/night home, PM, tables, AFKO, ERD #AUFK; 390 day home) plus three zoomed crops. The other 75 shots were not opened, because the coordinator asked me to finish early. Findings on screens I did not open are not claimed.

**Score: 81 / 100** (round 2: 76)
**Verdict: FAIL**: BLOCKER 0, MAJOR 2, MINOR 6 (round rule: PASS needs 0/0/0)

## Fixed since round 2 (seen in the render)
- **M2, home memory test (mostly fixed).** The command bar now runs the full column width with ⌘K. Under it sit three real example codes, set as links. The doors are a hairline list with the number in plain ink, not tiles. The process map heading and legend now reach the 1440 first viewport, but the map itself is still under the fold (`1440-light-home.png`).
- **M1 on records (fixed).** The AFKO record shows its counts as one inline sentence ("8 שדות מתועדים · 2 שדות מפתח ראשי ..."), not a big-number strip (`1440-light-afko.png`).
- **Palette.** The day canvas is `#fbf8f1` with white panels and rail, measured from pixels. Night is the designed petrol ground and not an inversion. I saw no purple, neon, glow, glass, gradient text or pill buttons in the shots I opened.
- **Motion at rest.** 0 time-based animations on 20 routes on desktop, phone and reduced motion. The only remaining motion is the scroll-linked `nxs-progress`, which is documented in MOTION.md (`motion-rest.json` / `.log`).

## persistence
FAIL, carried from round 2 and not a regression. `PRODUCT.md` and `DESIGN.md` do not exist at the repo root. The world contract lives in `docs/redesign-2026-09/`: DESIGN-SPEC, TOKENS, MOTION, ART-DIRECTION and SIDE-TABS. These match the build I saw, apart from the beige surface in fix 8. To close it, add the two root files, or one root pointer file per name that points at those documents.

## ceiling
Native devices the build leaves unused:
- **Frame.** The ERD opens on an empty grid instead of framing the selected table.
- **Lettering.** The module hero uses badge stacking where the record's typeset ID header is the stronger device.
- **Selection.** The selection line is not used as one consistent device; see fix 3.

## material_fixes
1. **MAJOR, contract (ERD family: "a diagram that fits the area when it opens").** `/neo/erd/#AUFK` at 1440 night opens on an empty grid. The selected AUFK is clipped at the bottom edge of the canvas. The minimap covers part of the MAPL node, and the first viewport shows no relation. Fix: frame the selection plus its first-degree neighbours on open, and dock the minimap away from the nodes. Evidence: `1440-dark-erd-aufk.png`.
2. **MAJOR, round-2 M1 carried (dashboard pattern on a workspace).** The `/neo/pm/` module page still has an 8-figure big-number strip between the hero and the section bar (12 · 58 · 280 · 95 · 90 · 100 · 23 · 23). This is the pattern the bakeoff rejected. It also pushes the first chapter below the fold. Fix: one inline count sentence, as the AFKO record already does. Evidence: `1440-light-pm.png`, `1440-dark-pm.png`.
3. **MINOR, contract (one selection language).**
   - The selected section chip is drawn three ways. On `/neo/pm/` it is a module-teal fill with a red line. On AFKO it is the pink `--select-bg` with a red line. In the rail it is pink.
   - The key-section mark (`section-nav.css:209`, a 2px ink bar before the number) renders as a stray pipe ("03 | המעבר ל-S/4HANA") and nothing explains it.
   - Fix: use `--select-bg` + `--select-line` everywhere, and replace the bar with weight or the word "מומלץ".
   - Evidence: `1440-light-pm.png` (crop of the section bar) vs `1440-light-afko.png`.
4. **MINOR, SIDE-TABS rule (decorative bars that repeat a word).**
   - Each record chip carries a leading colour bar: PM teal, PP-PI blue, object class brown.
   - There is a brown bar beside the AFKO ID and a short teal accent rule above the eyebrow.
   - The ERD table list draws a module bar on every row. These rows have no module code, so colour is the only channel there.
   - Fix: hairline or nothing on the chips, ID and eyebrow. Write the module code on the ERD rows.
   - Evidence: `1440-light-afko.png`, `1440-dark-erd-aufk.png`.
5. **MINOR, AI-template tell (stacked identity in the module hero).**
   - The hero names PM four times: a large "PM" square, a "PM" chip, a wrench icon in a box and mono "Plant Maintenance".
   - The primary action "התחלה מ- AUFK" carries a status dot (a ringed amber circle) inside the button.
   - Fix: keep the typeset title plus one chip. Move the status mark next to the code it describes, outside the button.
   - Evidence: `1440-light-pm.png`, `1440-dark-pm.png`.
6. **MINOR, density with a job (catalogue rows).**
   - Every `/neo/tables/` row carries four icon-plus-number chips (for example "4", "1", "0", "3") with no word. A 0 is shown as a value, which the brief's "לא מתועד במאגר" rule argues against.
   - Every row also repeats a "הקשר" button and an arrow.
   - A count strip still sits above the result counter; its last line is visible, half-hidden under the header, in the shot.
   - Fix: give each chip a short word ("4 שדות"), hide zero chips, and drop the strip in favour of the single "105 מתוך 105" counter.
   - Evidence: `1440-light-tables.png`.
7. **MINOR, rhythm (home doors).**
   - At 1440 the "טבלאות SAP" door sits about 5px higher than its row, and its subline wraps to two lines while its siblings take one.
   - Row 2 leaves its fourth cell empty.
   - At 390 the examples wrap, with BAPI_ALM_ORDER_MAINTAIN alone on its own line, and about 100px of dead space follows before the list.
   - Fix: one baseline grid for the doors, an explicit 4 + 3 or 3 + 3 + 1 layout, and examples as one horizontal list that can scroll.
   - Evidence: `1440-light-home.png`, `390-light-home.png`.
8. **MINOR, ART-DIRECTION correction ("bright without being cold or beige") and alignment.**
   - In day theme the header search field and the AFKO key panel fill with `#f4eee3`, sampled from pixels. That is the beige the judge failed in "current".
   - The back links ("חזרה למסך הבית" / "חזרה לטבלאות SAP") hang about 30px outside the content's start edge, against the rail.
   - Fix: use `--surface-2` from the chosen palette, and align the back links to the content column.
   - Evidence: `1440-light-home.png`, `1440-light-afko.png`, `1440-light-pm.png`, `1440-dark-erd-aufk.png`.

Not opened in this round (75 of 84 shots): bapi, enh, erd-map, object, reader, s4, studio at any width; 1280, 834 and 1728; 390 night. I make no claim for or against them.

## keep
Keep the bright `#fbf8f1` / white day and the petrol night, the full-width command bar with real example codes, the inline record counts, Plex with Mono IDs and the completely still pages. Do not reintroduce tiles, tints or motion while fixing.
