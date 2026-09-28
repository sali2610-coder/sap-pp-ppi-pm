# מהדורת עיון · Editorial Reference

Route: `/design/redesign-2026/editorial/` (`?mode=dark` opens the night palette).
Files: `page.tsx` (server, all 14 sections), `client.tsx` (the parts that need a browser), `lib.ts` (status vocabulary, contrast, font stacks), `board.css`.

## What makes this direction different

The knowledge base is set like an edited technical handbook. Structure comes from type, rules and rhythm, not from boxes.

- **Rules instead of cards.** Hairlines separate, a 2px ink rule opens a list, tables use book-style top, middle and bottom rules, and the home page is a contents page with dotted leaders and real counts.
- **A margin column.** Every record is `header, aside, body`. On desktop the aside is a sticky margin beside the text (module, S/4 status, verification, sources, depth). On a phone it sits between the record's identity and its text.
- **Large faint section numbers** in the margin, drawn as generated content so they stay decoration (not read aloud, not text to contrast-check). Each number is printed at full contrast in the board's own contents list.
- **Verification is a typographic mark.** The level word is underlined in its own line: solid (מאומת), dashed (חלקי), dotted (דורש אימות), double (סתירה). The ERD uses the same language: a fully recorded relation is solid, a partial one is dashed. Readable with no colour at all; section 10 has a greyscale switch to prove it.
- **Red is spent on two things only:** the one action on a screen (the search line on the home page, the primary button) and selection (selected row, active tab, selected ERD table). Links are ink blue. Status hues appear only inside status marks.
- **One floating object.** The open command palette is the only element with a shadow.
- **Books are objects.** Cloth bindings, a hinge, and a page block whose thickness is the book's own page count on the shelf. A book with no page count gets a dashed block and says "עמודים לא מתועדים". On a phone the shelf becomes one horizontal row that scrolls inside its own box.

Radius is 2px throughout; the open palette uses 4px and the phone frame 8px. No pills, no gradients on text, no emoji.

## Palette and contrast

Every colour is a custom property on `.rb-editorial[data-mode="light|dark"]`. The full table of 83 text and surface pairs, computed from the file itself, is the comment at the top of `board.css`; section 0 recomputes and prints the ratios at build time. Below, the lowest ratio each token reaches across the surfaces it is used on.

| token | light | dark | min light | min dark |
|---|---|---|---|---|
| --canvas | #F5F2EC | #15130F | base | base |
| --surface | #FFFDF8 | #1D1A15 | base | base |
| --surface-2 | #EFEAE0 | #25211B | base | base |
| --ink-1 | #1D1A16 | #EEE8DE | 14.07 | 12.51 |
| --ink-2 | #5A544A | #B5AC9D | 6.08 | 6.78 |
| --ink-3 (14px and up) | #6B6458 | #9C9384 | 4.88 | 5.27 |
| --link | #1E4E79 | #8CB8E0 | 7.23 | 7.65 |
| --action | #B8222A | #F0676B | 5.69 | 5.66 |
| --action-ink (on action) | #FFFDF8 | #15130F | 6.25 | 4.96 |
| --st-keep | #2D6A3E | #7FC08F | 5.37 | 7.14 |
| --st-change | #8A5200 | #E0A94F | 5.30 | 7.22 |
| --st-replace | #1B6470 | #6EC0C4 | 5.61 | 7.25 |
| --st-removed | #9A3A22 | #E8876B | 5.80 | 5.88 |
| --st-verify | #665F53 | #A89F90 | 5.24 | 5.82 |
| --danger | #A8321C | #F08A6E | 5.98 | 7.07 |
| --proof-ink (owner placeholders) | #7A4B00 | #E3B062 | 6.60 | 7.95 |
| --cover-ink (on all 12 cloths) | #F3EDE2 | #F3EDE2 | 5.79 | 5.79 |
| --rule-strong (UI boundary, 3:1) | #857B6E | #7B7265 | 3.46 | 3.38 |
| --focus (3:1) | #1E4E79 | #8CB8E0 | 7.23 | 7.65 |
| --select-line (3:1) | #B8222A | #F0676B | 5.28 | 4.97 |
| --brand (marks only, 3:1) | #D62027 | #E8474D | 4.58 | 4.49 |
| --mod-pm | #5E6B35 | #A8B477 | 5.17 | 7.81 |
| --mod-pppi | #4B6272 | #93AABB | 5.71 | 7.19 |
| --mod-pp | #7C6644 | #C2A77B | 4.89 | 7.52 |
| --mod-bw | #4D6B5F | #8FB5A5 | 5.24 | 7.69 |

Decorative, no requirement: `--rule` #E2DCD0 / #35302A, `--numeral` #DCD4C5 / #2E2923. No token has a hue between 240° and 330° at 20% saturation or more (checked by script, cloths included).

## Type

- **Frank Ruhl Libre** (`frankHe`, `frankLat`): titles 600 and 700, section heads 500, numerals and counts.
- **IBM Plex Sans Hebrew** (`plexHe`, `plexLat`): body 17/1.75, UI 15, secondary 13, never below 12.
- **IBM Plex Mono** (`plexMono`): SAP identifiers, 500 and 600.

The `.variable` classes sit on the root as the spec asks, but the stacks are built from each font's `style.fontFamily` in `lib.ts`. Reason, measured in the installed next/font: every `--f-*` variable expands to `'Family', 'Family Fallback'`, and the fallback face is `local(Arial)` or `local(Times New Roman)` with no unicode-range. Chained as `var(--f-x-he), var(--f-x-lat)`, that fallback answers every digit, space, punctuation mark and Latin letter before the Latin instance is reached, so numbers inside Hebrew text render in Times or Arial. The board stacks `he, lat, fallback, system`. The same trap applies to anything that follows the header comment in `app/fonts/fonts.ts`.

## Motion

Signature: the contents reveal (section 13). The index rules draw from the right once (420ms), then the entries rise 4px and fade in, 220ms each, 50ms apart, stagger capped at 300ms; about 800ms in total. `transform` and `opacity` only, inside `prefers-reduced-motion: no-preference`. The final state is what renders; the animation plays only when "הפעלת הרגע" is pressed, never on scroll. With reduced motion the press shows the final state at once (checked in a browser: no animation, every entry at opacity 1).

## Data

Read at build time: `homeData()`, `txDetail()` and `txDetailCodes()`, `tableDetail()`, `bpDetail()` and `bpList()`, `booksData()`, `neoLessonData("pm", "pm-bom")`, `erdCatalog()`. Two more builders of the site, `cdsDir()` and `bapiDir()`, supply the S/4 status of the CDS and function rows in the palette; they are what the site's own search uses, so a result says what the product says. The reader paragraph is the first paragraph under 600 characters in `public/books/book1/ch6.json` (§6.3, 346 characters), rendered the way the NEO reader renders `**bold**`, text unchanged.

## Not sourced from data, or decided here

1. **Five S/4 states over fourteen canonical statuses.** The product resolves 14 statuses; the spec asks for five. Every row still prints the canonical label; the state sets only glyph and colour. Two filings need a decision in TOKENS.md: `s4_native` (IP30H, "חדש ב-S/4HANA") sits under נשמרת, and `deprecated` (IP30, "לא אסטרטגי ב-S/4HANA") sits under מוחלפת, because IP30 still runs and its simplification item points to IP30H, so הוסרה would overstate. `not_applicable` sits under נדרש אימות.
2. **Four verification levels over six.** Official and repository verification both read מאומת; `legacy_context_only` reads דורש אימות. Lesson trust keeps the product's own words ("מאומת מול תיעוד", "תוכן ערוך").
3. **Catalog rows.** No real filter and sort of the registry yields exactly the twelve codes the spec names. The board says so: its scope is "מדגם של 12 קודים", the active chips (module PM, verification מאומת) really filter them to ten, and the registry totals are printed beside it (1,818 transactions, 146 in PM). Search, chips and sort all work.
4. **ERD "verified".** No field marks a relation as verified. Solid means the record carries both a cardinality and a JOIN (AFVC, AUFK); dashed means one is missing, and the index says which. `erdCatalog()` gives AFKO eight relations; `tableDetail("AFKO")` gives seven (no CDS_AnalyticalView).
5. **IP30H** has no English title and no step list (`flow` is empty). The board shows the three steps of its `process` field and says "רשימת צעדים מפורטת: לא מתועד במאגר". **AFKO** fields GSTRP and PLNBEZ have no type or length and are printed as "לא מתועד במאגר".
6. **Counts that disagree in the data.** Books: `homeData().books` is 10 (the older library index); the shelf has 11, so the board uses 11. Functions: 132 in `homeData()`, 144 in `bapiDir()`, 147 in the brief; the board shows no function count. Processes: there is no process route, so "תהליכים" counts the two process chains in `homeData().flows` (9 and 8 steps). The academy entry counts the 22 lessons of the PM course only.
7. **Book cloth.** `booksData()` assigns bindings that include a purple (plum #4A2C5A). The board uses its own twelve cloths; module identity stays in the printed code.
8. **Accessibility statement.** Contact, phone, email, coordinator, dates, conformance level and known limitations are all `REQUIRES_OWNER_INPUT`. "יעדי התכנון" lists the redesign's targets from DESIGN-BRIEF, not achieved compliance. Legal links point to `#`.
9. **Found in the product, not fixed:** the site's search index keys function status by the raw dictionary string, and two of AFKO's three functions are written "NAME - תיאור", so the product shows them without a status. The board looks the name up alone.

## Measured

- `tsc --noEmit` clean for this folder; `eslint app/design/redesign-2026/editorial` clean.
- Rendered in an isolated copy (not in the shared worktree): 0 horizontal overflow at 1440 and at 390 with phone emulation, light and dark; 0 console errors; `?mode=dark` applies after hydration; title and `noindex, nofollow` as specified.
- axe-core (WCAG 2.0, 2.1, 2.2 A and AA, best practices) on the board root: 0 violations at 1440 and 390, light and dark.
- Legacy shell overlays (onboarding drawer, floating chat button) float over every board route; they are outside this folder.
