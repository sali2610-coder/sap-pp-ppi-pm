# Direction boards · shared specification

Three boards show three genuinely different design directions on real site data, side by side in the Preview, so one can be chosen with evidence. Read `DESIGN-BRIEF.md` and `DESIGN-SPEC.md` in this folder first.

## Files and routes

- `app/design/redesign-2026/<dir>/page.tsx` (server component), `board.css` (imported by the page), optional client components in the same folder. `<dir>` is `editorial`, `workbench` or `atlas`.
- Route: `/design/redesign-2026/<dir>/`. Metadata: `title: "<שם הכיוון> · כיוון עיצוב · SAP by Sali"`, `robots: { index: false, follow: false }` (keeps it out of the sitemap).
- Touch nothing outside your folder. Do not run `next build`. Type-check with `./node_modules/.bin/tsc --noEmit --incremental false` (no build-info write, safe in parallel) and lint your folder with `./node_modules/.bin/eslint app/design/redesign-2026/<dir>`.

## Root

`<div className={`rb rb-<dir> ${font variables}`} data-mode="light" dir="rtl" lang="he">`. Fonts come from `@/app/fonts/fonts` (use `.variable` class names; stack Hebrew instance first, Latin second, then a system fallback). A small client component toggles `data-mode` between `light` and `dark`, reads `?mode=dark` from `location.search` in an effect (server renders light; no hydration mismatch), and exposes `window.__setMode(m)`. Every colour is a custom property declared on `.rb-<dir>[data-mode="light"]` and `.rb-<dir>[data-mode="dark"]`.

## Hard rules

1. Real data only. Use the site's own accessors: `homeData()` (`components/neo-shell/home/home-data`), `txDetail(code)` (`components/neo-shell/data/tx-detail`), `tableDetail(name)` (`components/neo-shell/data/tables-detail`), `bpDetail(slug)` (`components/neo-shell/best-practices/bp-data`), `booksData()` (`components/neo-shell/books/books-data`), `neoLessonData(courseId, slug)` (`components/neo-shell/learn/lesson-data`), `erdCatalog()` (`components/neo-shell/erd/erd-catalog`). Read their types before use. Every number, name and relation on the board comes from them. If a value is missing, show "לא מתועד במאגר". Never invent SAP facts, counts, customers, ratings or quotes.
2. No purple anywhere: no colour with hue between 240° and 330° and saturation of 20% or more (this also rules out indigo and violet). Module colours must avoid that band too.
3. No pill buttons. Buttons are rectangles with radius 2 to 8px. Full circles only for dots or avatar-like marks.
4. No emoji, no sparkles icon, no gradient text, no glassmorphism, no glow, no blobs, no stock imagery, no animated counters, no marquee, no typing effect, no cursor-following effects, no custom cursor.
5. Contrast: body and UI text at least 4.5:1 on its surface in both modes; large text and UI boundaries at least 3:1. Put a comment table at the top of `board.css` listing each text/surface token pair and its computed ratio (compute it; do not guess).
6. Type sizes: reading body 16px or more, UI text 14px or more, secondary text never below 12px. No letter-spacing on Hebrew. Weights 400/500/600/700 only.
7. RTL: Latin SAP codes, numbers and English fragments wrapped in `<bdi>` or `<span dir="ltr">` with `unicode-bidi: isolate`. Logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`).
8. Motion: `transform` and `opacity` only. Every animation sits inside `@media (prefers-reduced-motion: no-preference)` or has an explicit `reduce` override that shows the final state. Nothing loops forever. Nothing waits on scroll to become readable.
9. Responsive: no horizontal page overflow at 390px and at 1440px. Wide tables scroll inside their own container.
10. Icons: `lucide-react` only, every icon-only control has an accessible name.
11. Offline: no remote URLs, no new npm packages.

## Sections, in this order

Each section has an `<h2>` and one short Hebrew caption line saying what the section shows.

0. **The direction**: its name, a four-line statement (concept, type, colour, density and shape, motion), palette swatches for light and dark with token names and hex values, the type scale specimen with real Hebrew and SAP text.
1. **Shell**: the desktop navigation frame (sidebar or top bar, search entry, section list with real counts from `homeData()`), and a phone-width frame (max-width 390px) showing the mobile bottom navigation. Legal links in the footer: פרטיות, תנאי שימוש, הצהרת נגישות (links may point to `#`; the real pages come later).
2. **Home**: one identity sentence (what SAP by Sali is, plain Hebrew, no slogan), the search as the main action, entry points to modules, processes, tables, transactions, books and best practices with their real counts, and a "continue" slot that says honestly it appears only when something was opened on this device.
3. **Search**: the command palette open, query `AFKO`, results grouped by type (tables, transactions, CDS...) taken from real data, each row with its S/4 status; keyboard hints.
4. **Catalog**: transactions, 10 real rows (use `txDetail` for codes like IW31, IW32, IW33, IW38, IW39, IP10, IP30, IP30H, IA01, IA05, CO11N, COR1), with search field, active filter chips (rectangular), sort, result count.
5. **Record**: transaction `IP30H` via `txDetail("IP30H")`: code on its own line with a copy button, Hebrew meaning, module, S/4 status with icon and word, verification level, purpose, flow steps, tables; then the table `AFKO` via `tableDetail("AFKO")` with six real fields.
6. **Best practice**: `bpDetail("order-settlement-process")`: purpose and the first five steps.
7. **ERD**: a small real subgraph (AFKO and its direct relations from `erdCatalog()` or `tableDetail`), inline SVG, verified relations solid, unverified dashed, a legend, a visible "mode" label (סקירה / בחירה / ניתוח).
8. **Library and reader**: the shelf with all 11 books from `booksData()` (keep covers as objects with depth, in this direction's language, no purple cloth), then a reader page excerpt: chapter header, progress, and one short real paragraph (take it server-side from the book data; keep it under 600 characters; do not alter it).
9. **Academy**: `neoLessonData("pm", "pm-bom")`: what you will learn, start or continue, a local table of contents.
10. **Status system**: the five S/4 states (נשמרת, משתנה, מוחלפת, הוסרה, נדרש אימות) and the four verification levels (מאומת, חלקי, דורש אימות, סתירה), each with icon, word and colour or pattern, readable without colour.
11. **Legal page**: the layout of an accessibility statement with `REQUIRES_OWNER_INPUT` placeholders for contact, date and coordinator. No invented contact details.
12. **Empty and error states**: "לא נמצאו טבלאות מתאימות. נסה חיפוש אחר או נקה מסננים" with its action; an error with a retry.
13. **Signature motion**: one moment in this direction's character, with its reduced-motion equivalent described in one line.

## Done means

Type-check clean, lint clean for the folder, a short `README.md` in the folder listing: what makes this direction different, the palette with contrast ratios, fonts used, and anything you could not source from data.
