# 11 · READER PARITY — NEO reader vs the production reader

Audit only. Nothing in `app/`, `components/`, `data/`, `public/` or any config was
modified. Every number below is either a count taken off disk or a DOM/geometry
observation taken from the running dev server at `http://localhost:3111`.

- **NEO reader** — `/neo/read/<bookId>/`, `components/neo-shell/reader/neo-reader.tsx`
  (+ `section-body.tsx`, `reader-panel.tsx`, `progress-rail.tsx`, `figures.ts`,
  `prefs.ts`, `reader-data.ts`).
- **Production reader** — `/library/<bookId>/`, `components/book-reader.tsx`
  (+ `components/chapter-reader.tsx`, `components/section-spread.tsx`).
- Browser: headless Chrome 1440×1000 (and 2200×1100, and 390×844 iPhone UA),
  driven with **real `page.mouse` clicks and a real wheel** — no synthetic
  `dispatchEvent`. `localStorage["neo:theme"]` and `["neo:onboarded"]` were set
  in `evaluateOnNewDocument` before every load.

---

## 0 · What was measured

| Dimension | Checked |
|---|---|
| Books | 11 of 11 |
| Chapters | 135 spine chapters (source ∪ served), all compared |
| Sections | **4,314** compared one by one, source vs served shard — not sampled |
| Bilingual sections | **4,043** with both English and Hebrew in the source, **all 4,043 verified**; plus 271 academy sections (book8) verified facet by facet |
| Figures | **3,855** inventoried by book / chapter / index / page / file |
| Figures verified on screen | **835** across 18 chapters in the 6 figure-bearing books |
| Reader interactions driven by mouse | 24 named checks |
| Viewports | 390 × 844, 1440 × 1000, 2200 × 1100 |

---

## 1 · Bilingual proof — the headline check

The whole point of the corpus is that a Hebrew translation sits beside the
English source. This was verified for **every** section, not a sample.

**Method.** For each of the 11 books, walk `data/library/book{N}-full.json`
chapter by chapter and section by section. A section counts as bilingual when
`en` is non-empty AND `he` is non-empty AND `he` actually contains Hebrew
codepoints (U+0590–U+05FF) — the boolean-`he`-flag trap that
`scripts/migrate-books.mjs` documents is explicitly guarded against here too.
Then read the served shard `public/books/book{N}/ch{n}.json` at the same section
id and compare both strings byte for byte.

| Book | Sections | Bilingual in source | Both served | English lost | Hebrew lost | EN replaced by HE |
|---|---:|---:|---:|---:|---:|---:|
| book1 | 140 | 140 | 140 | 0 | 0 | 0 |
| book2 | 496 | 496 | 496 | 0 | 0 | 0 |
| book3 | 374 | 374 | 374 | 0 | 0 | 0 |
| book4 | 195 | 195 | 195 | 0 | 0 | 0 |
| book5 | 502 | 502 | 502 | 0 | 0 | 0 |
| book6 | 88 | 88 | 88 | 0 | 0 | 0 |
| book7 | 1,689 | 1,689 | 1,689 | 0 | 0 | 0 |
| book8 | 271 | n/a — academy | 271 | n/a | 0 | n/a |
| book9 | 271 | 271 | 271 | 0 | 0 | 0 |
| book10 | 211 | 211 | 211 | 0 | 0 | 0 |
| book11 | 77 | 77 | 77 | 0 | 0 | 0 |
| **Total** | **4,314** | **4,043** | **4,043** | **0** | **0** | **0** |

**Result: 4,043 / 4,043 bilingual sections still serve both languages.
Zero English lost. Zero English replaced by Hebrew. Zero Hebrew lost.**

book8 is `format:"academy"`: it has no `{en, he}` pair by schema. Its content is
17 named Hebrew facets plus 4 structured reference blocks. Verified separately:
**3,708 facets in source → 3,708 served**, **886 ref blocks → 886 served**. Nothing
dropped.

On screen, at 1440px, `/neo/read/book1/` chapter 1: 14 of 14 subchapters carry
`data-bi="1"` (spread) and every one renders Hebrew and Latin text in the same
`.nr-prose`, 22,085 Hebrew chars and 71,758 Latin chars in the sheet. The
production reader on the same chapter shows 21,910 / 71,492 — the small NEO
surplus is chips and labels, not prose.

### The one bilingual defect: 20 colliding ids in book7 · P2

book7 is a Fiori app catalogue, and 20 app ids legitimately appear under two
categories with **different** write-ups on each side:

`F2918` (ch1+11) · `F0870A` (3+4) · `F3163` (3+11) · `F6022` (3+4) · `F5856` (3+11) ·
`F6185` (4+7) · `F3197` (4+7) · `F5147` (4+6) · `F2769` (4+7) · `F2416` (4+7) ·
`F2502` (4+7) · `F6352` (4+7) · `F3110` (4+7) · `F0843` (4+7) · `F3244` (4+7) ·
`F1595` (4+7) · `F6266` (4+7) · `F1076` (4+7) · `F2351` (7+11) · `F1602` (7+11)

`scripts/migrate-books.mjs` builds its body map keyed by **section id alone**
(`body.set(String(s.id), b)`), so the second chapter's variant overwrites the
first, and the shards for **both** chapters then serve the same text.

Measured: all 20 differ in BOTH languages in the source; all 20 are byte-identical
across the two served shards; **45,070 characters of real prose (25,300 EN +
19,770 HE) are unreachable** in the served corpus. Neither language is lost —
one of two variants is. Classification **PARTIAL**, severity **P2**. It is a
pipeline bug, not a reader bug, and it hits the production reader's own shard
consumers too.

---

## 2 · Structural parity — chapters, sections, figures

Every one of the 135 chapters was compared on three axes. Full row-by-row detail
is in `10_BOOKS_PARITY.csv` (295 rows).

| | Source | Served | Status |
|---|---:|---:|---|
| Chapters | 135 | 135 | EXACT |
| Sections | 4,314 (+3 recovered) | 4,317 | EXACT / TRANSFORMED |
| Figures (metadata) | 3,855 | 3,855 | EXACT |
| Figure assets on disk | 3,855 | 3,855 referenced | EXACT |

- **Nothing present in source is absent from served.** The "missing ids" column
  is empty for all 135 chapters.
- **book7 ch12** is the only TRANSFORMED chapter: it has no rows in
  `book7-index.json`, and the migration re-splits `data/library/book7/raw/ch12.json`
  into 3 sections from its own headings. Served sections 1,692 vs 1,689 indexed.
  This is a recovery, not a loss. Severity P3.
- **Figures: 0 missing, 0 orphaned, 0 duplicated.** Every one of the 3,855 file
  paths referenced by `book{N}-figures.json` exists under
  `public/assets/library/book{N}/figures/`, and every file in those six
  directories is referenced by exactly one figure record (521 + 861 + 495 + 486 +
  835 + 657 = 3,855, both directions).

---

## 3 · Figure placement in the prose flow

**Claim under test:** figures sit inside the reading flow, not in a gallery at
the end of the chapter.

18 chapters loaded in the browser across all six figure-bearing books
(book1 ch1/4/8, book2 ch2/7/14, book3 ch3/9/16, book4 ch2/6/10, book5 ch4/11/18,
book6 ch2/5/9) — **835 figures on screen**.

| Measure | Result |
|---|---|
| Chapters carrying figures | 18 / 18 |
| Figures rendered inside a `[data-nr-section]` subchapter | **835 / 835** |
| Figures collected in the trailing `.nr-tailfigs` gallery | **0** |
| Chapters spreading figures over more than one subchapter | **18 / 18** |
| Figures with at least one more subchapter below them (genuinely mid-flow) | 775 / 835 |
| Duplicate `src` inside a single chapter | **0 chapters** |

Worked example — book1 ch4: 74 figures distributed across **all 13** subchapters,
69 of them with more subchapters still to come. book6 ch2: 127 figures across all
16 subchapters. book5 ch18: 59 figures across 40 of 44 subchapters.

**Nuance worth stating plainly.** Placement is *between subchapters*, not
*between paragraphs*. `SectionBlock` renders `<Figures>` after the section's
`.nr-prose` block (verified: 835/835 figures follow their subchapter's prose in
document order). Within a subchapter the figures cluster at its end. The reader
says so on screen: the `.nr-figline` sentence reads
"N איורים סרוקים בפרק, משובצים בגוף הטקסט לפי עמוד המקור שלהם", and each figure
caption carries its real source page. `figures.ts` documents why — **not one of
the 4,314 subchapters carries a page number in the served spine**, so an exact
figure-to-paragraph anchor does not exist in the data and is not invented.
This matches what `components/chapter-reader.tsx` already does in production.

Clicking an inline figure with the mouse opens the viewer:
`aria-label="איור · עמ׳ 34"`, `src=/assets/library/book1/figures/ch1-p034-0.png`,
filmstrip of **11 thumbnails** = the chapter's full ordered set. PASS.

---

## 4 · Functional parity matrix — driven with real mouse input

24 checks. Verdicts: **22 PASS**, **1 PASS-with-caveat**, **1 GAP**.

| # | Feature | Expected | Observed | Verdict |
|---|---|---|---|---|
| 1 | English + Hebrew together | both languages in one view | 14/14 subchapters `data-bi="1"`; 22,085 he + 71,758 en chars in the sheet | PASS |
| 2 | Paragraph pairing | Hebrew paragraph facing its English source | `.nr-bi-row` aligns he/en cells to the same visual row in 14/14 sections (<24px top delta). True per-paragraph pairing (`data-paired="1"`) does **not** fire on book1 — see §5 | PASS (caveat) |
| 3 | Chapter list | all chapters listed | panel opens on `תוכן העניינים`, 9 chapter rows for book1, tabs `["תוכן העניינים","מפת ההתקדמות"]` | PASS |
| 4 | Subchapter list | subchapters under the open chapter | 14 rows under ch1, active chapter marked `data-on="1"` | PASS |
| 5 | Expand / collapse | toggles subchapters | accordion: open idx 0 (14 rows) → click idx 4 → openIdx 4 (20 rows) → click idx 0 → openIdx 0 (14 rows); exactly one `aria-expanded="true"` at every step | PASS |
| 6 | TOC jump | click a subchapter → go there | clicked `1.4`: host scrollTop 46,852, active `1.4`, its box 168px from viewport top, panel closed, url `?c=1&s=1.4` | PASS |
| 7 | Sticky nav | header stays pinned | `position:sticky`, offset from the scroll host = **32/32/32/32 px** at scrollTop 0 / 1,500 / 6,000 / 20,000; always on screen (32px is the `.nx-canvas` padding) | PASS |
| 8 | Active subchapter | tracks scroll | over 5 positions: `1.1 → 1.1.1 → 1.1.2 → 1.2.1 → 1.3.1`; rail marker agreed 5/5, breadcrumb followed, URL rewrote to `?c=1&s=…` each time | PASS |
| 9 | Active chapter | rail marks the open chapter | chapter marker present at all 5 positions | PASS |
| 10 | Prev / next (subchapter) | dock moves one step | `1.2.1 --next--> 1.2.2 --prev--> 1.2.1` | PASS |
| 11 | Prev / next (chapter) | end-of-sheet buttons | `.nr-ends` shows `2 · Configuring Organizational Structures` on ch1 (first chapter correctly has no "previous") | PASS |
| 12 | Resume | offer to continue | banner "הפעם הקודמת הסתיימה כאן: פרק 1 · … · Explore Phase", buttons `["המשך מכאן","התחל את הפרק מחדש"]`; clicking landed on `1.3.3` | PASS |
| 13 | Progress | numeric | `.nr-rail-pct` 3%, 6 `role="progressbar"` (בספר / בפרק / בתת-פרק, twice: rail + mobile strip) | PASS |
| 14 | Progress is live | rises as you read | book % over 5 scroll positions: 0% → 1% → 2% → 3% → 5% | PASS |
| 15 | Image placement | in the flow | 835/835 inline, 0 in a trailing gallery — §3 | PASS |
| 16 | Figure viewer | opens full size | dialog with the right src + 11-thumb filmstrip | PASS |
| 17 | Font control | +/- resizes prose | 15px → 19px (+2) → 17px (−1); persisted to `neo:read-ui:v1` `{"size":"lg",…}` | PASS |
| 18 | Column width | resizes the measure | single language: sheet 745 → 534 (narrow) → 798 (wide) px, prose 617 → 406 → 670 px. At 2200px in spread mode: 987 → 1,516 px | PASS |
| 18b | Column width in spread at 1440px | should resize | `--nr-measure` changes 76ch → 70ch → 46ch and `data-measure` updates, but sheet stays **828 / 828 / 828 px** and prose **762 / 762 / 762 px** — the `.nr-col` track (828px with the rail open) caps `calc(measure*2 + 11rem)` before the setting can bite. Control appears dead in the default bilingual view on a 1440px screen | **GAP · P2** |
| 19 | Scroll position | reload lands back | before: scrollTop 9,000, `1.1.2`, `?c=1&s=1.1.2` → after reload: scrollTop 4,449, `1.1.2`, same URL. The subchapter is restored; the exact pixel offset is not, and the reader says so in the resume note | PASS |
| 20 | Mobile drawer | bottom sheet at 390px | drawer 390×743 at top 101 of 390×844, `aria-modal="true"`, scrim present, 9 chapters, 16px top radius; clicking the scrim with the mouse closed it | PASS |
| 21 | Desktop rail | persistent at ≥1280px | `.nr-rail` 232×736px, 9 chapter rows, 9 ticks, 3 meters, book % — and `display:none` at 390px | PASS |
| 22 | Rail expand/collapse | fold toggles subchapters | rail subchapter rows 14 → 22 on a real click of `.nr-rtoc-fold` | PASS |
| 23 | Bookmark | marks the position | counter 0 → 1, button label flips to `הסר סימנייה מהמיקום הזה` | PASS |
| 24 | Mobile layout | no overflow | `scrollWidth − clientWidth = 0px`, dock present, 3-bar progress strip present | PASS |

All 11 books also open and render: book7 (catalogue) 593 subchapters / 593
bilingual spreads / 789,934 Latin + 61,037 Hebrew chars in 5.8s; book8 (academy)
13 subchapters, 18,051 Hebrew chars; book11 13 subchapters, 13 spreads. **Zero
`.nr-none` "no content" placeholders in any of them.**

---

## 5 · Paragraph pairing — a data limit, not a reader defect · P2

`section-body.tsx#Spread` pairs Hebrew and English **paragraph by paragraph** when
both sides split into the same number of paragraphs, and falls back to two whole
columns when they do not.

Measured across the whole corpus:

| | Count |
|---|---:|
| Bilingual sections | 4,043 |
| Sections where both sides split into the same number of paragraphs | 1,672 (41%) — **all of them book7** |
| Sections where Hebrew has multiple paragraphs | 2,371 |
| Sections where **English** has multiple paragraphs | **0** |

The `en` field carries **zero newline characters in all 11 `-full.json` files**,
while `he` carries 29,618. The break happened upstream of the migration:
`data/library/book1/ch1.sections.json` still holds 1,872 newlines and 51
blank-line paragraph breaks for the same 14 sections, and the character count is
essentially unchanged (84,304 raw → 84,221 in `en`, delta 83 = collapsed
whitespace).

So: **no words were lost, every paragraph boundary on the English side was.**
Classification **TRANSFORMED**, severity **P2**. Consequence for the reader — on
9 of 11 books the English column is one unbroken block facing a Hebrew column of
3–4 paragraphs, and the paragraph-facing-paragraph layout the code was written
for can never engage. The production reader is affected identically (it reads the
same field), so this is **not a NEO regression**; it is a pre-existing pipeline
defect that a premium reading surface will expose.

---

## 6 · Feature diff vs the production reader

Control inventory taken from both readers on the same book and chapter
(`/neo/read/book1/` scoped to `.nr`, `/library/book1/` scoped to `main`).

### NEO has, production does not
Bilingual spread with side-by-side columns and a per-language toggle
(HE-only / both / EN-only, the hidden side kept on the page in a `<details>`) ·
persistent desktop progress rail with per-chapter ticks and three meters ·
accordion TOC listing **subchapters**, with a search field over headings and a
second "מפת ההתקדמות" tab · **subchapter-level** prev/next dock ·
**position-level** bookmarks (chapter + subchapter) rather than chapter-level ·
resume banner with an explicit honesty note about what is and is not restored ·
URL that follows the reading position (`?c=&s=`) so any position is linkable ·
reading lens · line-leading control · in-flow figure placement with the source
page shown on every caption.

### Production has, NEO does not — gaps to note before shipping
| Production control | NEO | Severity |
|---|---|---|
| `הערות הספר` — personal notes textarea, persisted to `neo:reader:notes:<bookId>` | absent (0 `<textarea>` in the NEO reader) | **P2** |
| `עזרה — איך משתמשים בקורא` — help / keyboard-shortcut dialog | absent | **P3** |
| `מצב דפדוף` — page vs scroll reading mode (`neo:reader:mode`) | absent, scroll only | **P3** |
| Colour schemes sepia / night / original (`neo:reader:theme`) | one boolean `גוון נייר` toggle | **P3** |
| `איפוס התקדמות` — reset reading progress (and optionally notes) | NEO's `אפס את הגדרות הקריאה` resets **display settings only**, not progress | **P2** — same wording family, different effect; a user who expects the production behaviour will not get it |
| Full-text search inside the book | NEO's `.nr-find` searches chapter and subchapter **headings** only | P3 (production's is also heading-scoped: `title="חיפוש פרק בתוך הספר"`) |

### Storage
Production writes `neo:continuity:v1` (`lib/continuity-store.ts`) plus
`neo:reader:*` keys. The NEO reader writes **`neo:read-ui:v1` only**. Reading
position and progress are therefore **not shared between the two readers** — a
book read to 40% in `/library/` shows 0% in `/neo/read/`, and vice versa. This is
a deliberate isolation (`prefs.ts` says so), but it is a visible inconsistency
for as long as both surfaces are reachable. **P2.**

---

## 7 · Findings, ranked

| # | Finding | Class | Severity |
|---|---|---|---|
| 1 | book7: 20 duplicate section ids collapse to one variant; 45,070 chars of a second, genuinely different bilingual write-up unreachable. `migrate-books.mjs` keys bodies by id alone instead of chapter+id | PARTIAL | **P2** |
| 2 | English paragraph breaks stripped corpus-wide before `-full.json` (0 newlines in `en` across all 11 books). Paragraph-facing-paragraph spread unreachable on 2,371 of 4,043 bilingual sections | TRANSFORMED | **P2** |
| 3 | Column-width control has no visible effect in the default bilingual view at 1440px — the `.nr-col` track caps the spread before the setting applies | GAP | **P2** |
| 4 | Personal book notes present in production, absent in NEO | MISSING | **P2** |
| 5 | `אפס את הגדרות הקריאה` resets display settings only; production's reset clears reading progress | INTENTIONALLY REPLACED | **P2** |
| 6 | Reading position not shared between `/library/` and `/neo/read/` (`neo:continuity:v1` vs `neo:read-ui:v1`) | INTENTIONALLY REPLACED | **P2** |
| 7 | book7 ch12 rebuilt from `raw/ch12.json` into 3 sections it never had in the index — a recovery, not a loss | TRANSFORMED | P3 |
| 8 | Help dialog, page-mode, sepia/night themes not carried over | MISSING | P3 |
| 9 | Figures anchor to a subchapter, not to a paragraph, because no subchapter carries a page number. Disclosed on screen | TRANSFORMED | P3 |

**Nothing found at P0 or P1.** No book, chapter, section or figure present in the
source is absent from what is served, and no bilingual section lost a language.

---

## 8 · How to reproduce

```
node  <scripts kept in /tmp/kb3audit/, not in the repo>
  parity.mjs          # 135 chapters, 4,314 sections, 3,855 figures — source vs served
  bilingual-full.mjs  # every section, both languages, byte-for-byte
  reader-parity.mjs   # 20 mouse-driven UI checks at 1440 and 390
  reader-parity2.mjs  # scroll-host-aware sticky / active / measure / render checks
  reader-parity3.mjs  # 18-chapter, 835-figure placement sweep
  pairing.mjs         # paragraph-pairing geometry, NEO vs production
```

The scroll host is `main.nx-canvas`, **not** `window` — a check that scrolls the
window measures nothing on `/neo`, and the first pass of this audit produced two
false failures because of it (`components/neo-shell/reader/env.ts#scrollHost`
documents the same trap).
